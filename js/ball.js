import { GameObject } from './gameObject.js';
import { Paddle } from './paddle.js';

export class Ball extends GameObject {
    constructor(x, y, radius, vx = 0, vy = 0) {
        super(x,y, radius * 2, radius * 2, vx, vy);
        this.radius = radius;
    }

    update(worldWidth, worldHeight){
        super.update();
        this._isDead(worldHeight);
    }

    onCollision(other){
        if(other.type === 'surface') {
            const dot = this.vx * other.nx + this.vy * other.ny;

            this.vx = this.vx - 2 * dot * other.nx;
            this.vy = this.vy - 2 * dot * other.ny;

            if(other.ny === -1) {
                this.y = other.rectTop - this.height;
            }
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }

    _isDead(worldHeight) {
        //пол и потолок
        if(this.bottom < 0 || this.top > worldHeight) {
            console.log('Ball is dead');
            this.isAlive = false;
        }
        super._isDead();
    }
}


