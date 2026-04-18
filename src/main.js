import './styles/main.css';
import { GameApp } from './app/GameApp.js';

const root = document.querySelector('#app');
const existingGame = globalThis.__TACTICAL_FPS_GAME__ ?? null;
existingGame?.destroy?.();

const game = new GameApp(root);
globalThis.__TACTICAL_FPS_GAME__ = game;

game.start();

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    game.destroy();
    if (globalThis.__TACTICAL_FPS_GAME__ === game) {
      globalThis.__TACTICAL_FPS_GAME__ = null;
    }
  });
}
