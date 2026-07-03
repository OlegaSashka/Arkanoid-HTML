
import { Level } from "./level.js";

export class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        this.currentLevel = null;
    }

    init(){
        console.log('Game initialized');

        this.currentLevel = new Level(this.canvas.width, this.canvas.height);

        this._startGame();
    }

    _startGame(){
        const gameLoop = () => {
            if(this.currentLevel) {
                this.currentLevel.update();
                this.currentLevel.draw(this.ctx);
            }
            requestAnimationFrame(gameLoop);
        }
        requestAnimationFrame(gameLoop);
    }
}