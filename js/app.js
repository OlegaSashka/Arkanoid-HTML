import {Ball} from './ball.js';

export class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        this.balls = [];
        this.walls = [];
        this.bricks = [];
    }

    init(){
        console.log('Game initialized');

        this.balls[0] = new Ball(400, 590, 5, 2, -1);
        this._startLoop();
    }

    _restartLevel() {
        console.log('Restart game');
        this.balls[0] = new Ball(400, 590, 5, 2, -1);
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
        this.balls.forEach(ball => {
            ball.update(this.canvas.width, this.canvas.height);
        });

        this.balls = this.balls.filter(ball => ball.isAlive);

        if(this.balls.length === 0) {
            this._restartLevel();
        }
    }

    _draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.balls[0]) {
            this.balls[0].draw(this.ctx);
        }
    }
}