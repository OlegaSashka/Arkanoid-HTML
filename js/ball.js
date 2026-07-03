import { GameObject } from './gameObject.js';

export class Ball extends GameObject {
    constructor(x, y, radius, vx = 0, vy = 0) {
        super(x,y, radius * 2, radius * 2, vx, vy);
        this.radius = radius;
    }

    update(worldWidth, worldHeight){
        super.update();
        this._handleBoundsCollision(worldWidth, worldHeight);
        this._isDead(worldHeight);
    }

    _handleBoundsCollision(worldWidth) {
        //стены
        if(this.left < 0 || this.right > worldWidth) {
            this.vx = -this.vx;
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


