import {Game} from './app.js';

document.addEventListener('DOMContentLoaded', () => {
    const arkanoid = new Game('gameCanvas');
    arkanoid.init();
});