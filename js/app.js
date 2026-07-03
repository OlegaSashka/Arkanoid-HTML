import {GameObject} from './gameObject.js';

export class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
    }

    init(){
        console.log('Game initialized');

        _this._startLoop();
    }

    _startLoop() {
        const loop = () => {
            this._update();
            this._draw();

            requestAnimationFrame(loop);
        }

        requestAnimationFrame(loop);
    }

    _update() {}

    _draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}