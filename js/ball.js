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
        if(other.type === 'wall'){
            this.vx = -this.vx;
        }

        if(other.type === 'roof'){
            this.vy = -this.vy;
        }

        if(other instanceof Paddle) {
            console.log('Сработал ивент');

            this.vy = -this.vy;

            this.y = other.top - this.height;
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


