import {GameObject} from './gameObject.js';
import {Ball} from './ball.js';

export class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        this.ball = null;
        this.walls = [];
        this.bricks = [];
    }

    init(){
        console.log('Game initialized');

        this.ball = new Ball(150, 150, 10, -2, -1);
        this._startLoop();
    }

    _startLoop() {
        const loop = () => {
            this._update();
            this._draw();

            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    }

    _update() {
        if(this.ball) {
            this.ball.update(this.canvas.width, this.canvas.height);
        }
    }

    _draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.ball) {
            this.ball.draw(this.ctx);
        }
    }
}