import { Server } from '@colyseus/core';
import { WebSocketTransport } from '@colyseus/ws-transport';
import { TacticalRoom } from './rooms/TacticalRoom.js';

const port = Number(process.env.PORT ?? 2567);
const gameServer = new Server({
  transport: new WebSocketTransport(),
});

gameServer.define('TacticalRoom', TacticalRoom);

try {
  await gameServer.listen(port);
  console.log(`[server] Colyseus listening on ws://localhost:${port}`);
} catch (error) {
  console.error('[server] Failed to start Colyseus server.', error);
  process.exitCode = 1;
}
