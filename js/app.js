
import { Level } from "./levels/level.js";
import { InputManager } from "./core/input.js"

export class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.pauseGame = false;
        this.currentLevel = null;

        this.input = null;
    }

    init(){
        console.log('Game initialized');
        
        this.input = new InputManager();
        this.input.bindKey('Escape', 'Pause');

        this.currentLevel = new Level(this.canvas.width, this.canvas.height);

        this._startGame();
    }

    _startGame() {
        const gameLoop = () => {
            if(this.currentLevel) {
                if(this.input.actions['Pause']){
                    this.pauseGame = !this.pauseGame;
                    this.input.actions['Pause'] = false;
                }
                if(!this.pauseGame){
                    this.currentLevel.update();
                }
                this.currentLevel.draw(this.ctx);
                if(this.pauseGame){
                    this.ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
                    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                    
                    this.ctx.fillStyle = "white";
                    this.ctx.font = "bold 32px sans-serif";
                    this.ctx.textAlign = "center";
                    this.ctx.fillText("ПАУЗА", this.canvas.width / 2, this.canvas.height / 2);

                    this.ctx.fillStyle = "white";
                    this.ctx.font = "16px monospace";
                    this.ctx.fillText("Нажмите ESC для продолжения", this.canvas.width / 2, this.canvas.height / 2 + 30);
                }
            }
            requestAnimationFrame(gameLoop);
        }
        requestAnimationFrame(gameLoop);
    }
}