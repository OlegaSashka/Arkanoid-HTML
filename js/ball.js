import { GameObject } from './gameObject.js';
import { Vector2D } from './vector2D.js';

export class Ball extends GameObject {
    constructor(x, y, radius, dirX = 0, dirY = 0, speed = 0) {
        super(x,y, radius * 2, radius * 2, 0, 0);

        this.radius = radius;
        this.speed = speed;

        this.direction = new Vector2D(dirX, dirY).normalize();
    }

    update(worldWidth, worldHeight){
        this.vx = this.direction.x * this.speed;
        this.vy = this.direction.y * this.speed;

        super.update();
        
        this._isDead(worldWidth, worldHeight);
    }

    onCollision(other){
        if(other.type === 'surface') {
            const normal = new Vector2D(other.nx, other.ny)

            const dot = this.direction.dot(normal);
            
            if (dot >= 0) return;

            this.direction.x = this.direction.x - 2 * dot * normal.x;
            this.direction.y = this.direction.y - 2 * dot * normal.y;

            this.direction = this.direction.normalize();

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

    _isDead(worldWidth, worldHeight) {
        //пол и потолок
        if(this.bottom < 0 || this.top > worldHeight || 
            this.right < 0 || this.left > worldWidth) {
            this.isAlive = false;
        }
        super._isDead();
    }
}


