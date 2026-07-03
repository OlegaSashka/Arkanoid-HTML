import { GameObject } from "./gameObject.js"
import { InputManager } from "./input.js"

export class Paddle extends GameObject {
    constructor(x, y, width, height, vx = 0, vy = 0) {
        super(x,y, width, height);

        this.input = null;

        this.init();
    }

    init(){
        this.input = new InputManager();

        this.input.bindKey('ArrowLeft', 'left');
        this.input.bindKey('KeyA', 'left');

        this.input.bindKey('ArrowRight', 'right');
        this.input.bindKey('KeyD', 'right');
    }

    update(worldWidth) {
        this._tryMove(5);
        super.update();
    }

    onCollision(other) {
        if (other.type === 'wall_left' && this.vx < 0) {
            this.vx = 0;
            this.x = other.x;
        }

        if (other.type === 'wall_right' && this.vx > 0) {
            this.vx = 0;
            this.x = other.x - this.width;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = '#2196F3';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath();
    }

    _tryMove(dx){
        if(this.input.actions['left'] || this.input.actions['right']){
            this._moveX(dx);
        }
        else {
            this.vx = 0;
        }
    }

    _moveX(dx) {
        if(this.input.actions['left'] && this.input.actions['right']) {
            this.vx = 0;
            return;
        }

        if(this.input.actions['left']) {
            this.vx = -dx;
        } else if(this.input.actions['right']) {
            this.vx = dx;
        } else {
            this.vx = 0;
        }
    }
}