import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Server } from '@colyseus/core';
import { WebSocketTransport } from '@colyseus/ws-transport';
import express from 'express';
import { TacticalRoom } from './rooms/TacticalRoom.js';

const port = Number(process.env.PORT ?? 2567);
const host = process.env.HOST ?? '0.0.0.0';
const app = express();
const httpServer = http.createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, '../../dist');
const movementTraceDebugDir = path.resolve(__dirname, '../../debug/movement-traces');

function getSafeTraceFileName(payload) {
  const recordedAt = Number(payload?.recordedAt ?? Date.now());
  const isoStamp = new Date(recordedAt).toISOString().replace(/[:.]/g, '-');
  const mapId = String(payload?.mapId ?? payload?.samples?.[0]?.mapId ?? 'unknown-map')
    .replace(/[^a-z0-9_-]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    || 'unknown-map';
  return `movement-trace-${isoStamp}-${mapId}.json`;
}

app.get('/health', (_request, response) => {
  response.status(200).json({ ok: true });
});

app.use('/debug/movement-trace', (request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    response.status(204).end();
    return;
  }

  next();
});

app.use(express.json({ limit: '5mb' }));

app.post('/debug/movement-trace', async (request, response) => {
  const payload = request.body;
  if (!payload || !Array.isArray(payload.samples)) {
    response.status(400).json({ ok: false, error: 'Invalid movement trace payload.' });
    return;
  }

  try {
    await fs.mkdir(movementTraceDebugDir, { recursive: true });
    const fileName = getSafeTraceFileName(payload);
    const filePath = path.join(movementTraceDebugDir, fileName);
    await fs.writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
    response.status(200).json({ ok: true, filePath });
  } catch (error) {
    console.error('[server] Failed to write movement trace.', error);
    response.status(500).json({ ok: false, error: 'Failed to write movement trace.' });
  }
});

app.use(express.static(clientDistPath));

app.get('/{*splat}', (request, response, next) => {
  if (request.path.startsWith('/matchmake')) {
    next();
    return;
  }

  response.sendFile(path.join(clientDistPath, 'index.html'));
});

const gameServer = new Server({
  transport: new WebSocketTransport({ server: httpServer }),
});

gameServer.define('TacticalRoom', TacticalRoom);

try {
  await gameServer.listen(port, host);
  console.log(`[server] Colyseus listening on ws://${host}:${port}`);
} catch (error) {
  console.error('[server] Failed to start Colyseus server.', error);
  process.exitCode = 1;
}
