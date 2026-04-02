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

app.get('/health', (_request, response) => {
  response.status(200).json({ ok: true });
});

app.use(express.static(clientDistPath));

app.get('*', (request, response, next) => {
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
