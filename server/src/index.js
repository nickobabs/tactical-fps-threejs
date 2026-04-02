import http from 'node:http';
import { Server } from '@colyseus/core';
import { WebSocketTransport } from '@colyseus/ws-transport';
import express from 'express';
import { TacticalRoom } from './rooms/TacticalRoom.js';

const port = Number(process.env.PORT ?? 2567);
const host = process.env.HOST ?? '0.0.0.0';
const app = express();
const httpServer = http.createServer(app);

app.get('/', (_request, response) => {
  response.status(200).json({
    ok: true,
    service: 'tactical-fps-threejs-server',
    transport: 'websocket',
  });
});

app.get('/health', (_request, response) => {
  response.status(200).json({ ok: true });
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
