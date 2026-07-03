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

        this.ball = new Ball(100, 100, 10, 0, -1);
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
            this.ball.update();

            if(this.ball.left < 0 || this.ball.right > this.canvas.width) {
                this.ball.vx = -this.ball.vx;
            }

            if(this.ball.top < 0) {
                this.ball.vy = -this.ball.vy;
            }
        }
    }

    _draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.ball) {
            this.ball.draw(this.ctx);
        }
    }
}