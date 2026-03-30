import './styles/main.css';
import { GameApp } from './app/GameApp.js';

const root = document.querySelector('#app');
const game = new GameApp(root);

game.start();
