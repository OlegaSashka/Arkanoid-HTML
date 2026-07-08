import {Game} from './app.js';
import { audioManager } from './managers/audioManager.js';
import { Preloader } from './preloader.js';

async function startGame() {
    try{
        await Preloader.loadAudio(audioManager);

        const arkanoid = new Game('gameCanvas');
        arkanoid.init();
    }catch (error){
        console.error('Критическая ошибка при старте игры. Загрузка прервана:', error);
    }
}

document.addEventListener('DOMContentLoaded', startGame);