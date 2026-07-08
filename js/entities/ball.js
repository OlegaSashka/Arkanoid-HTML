import { GameObject } from './gameObject.js';
import { Vector2D } from './vector2D.js';
import { CollisionType } from './collisionType.js';
import { audioManager } from './managers/audioManager.js';
import { AudioManifest } from "../assets/audioManifest.js";

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

    onCollision(info){
        if(info.type === CollisionType.SURFACE) {
            if(info.target.hp && info.target.hp === 0) {
                audioManager.playSoundOnce(AudioManifest.BRICK_HIT.key, 0.1)
            }else if (info.target.hp > 0 || !info.target.hp){
                audioManager.playSoundOnce(AudioManifest.BOUNCE_WALL.key, 0.1)
            }

            const normal = info.normal;
            const dot = this.direction.dot(normal);
            
            if (dot >= 0) return;

            this.direction.x = this.direction.x - 2 * dot * normal.x;
            this.direction.y = this.direction.y - 2 * dot * normal.y;

            if(info.target && info.target.vx !== 0){
                this.direction.x += info.target.vx * 0.05;
            }

            this.direction = this.direction.normalize();
            
            if (normal.y === -1 && info.target) {
                const maxAngleRad = 45 * Math.PI / 180;
                const maxSin = Math.sin(maxAngleRad);

            if (Math.abs(this.direction.x) > maxSin) {
                    this.direction.x = Math.sign(this.direction.x) * maxSin;
                    this.direction.y = -Math.sqrt(1 - this.direction.x * this.direction.x);
                }
                
                this.y = info.target.top - this.height;
            }

            const minAngleXRad = 15 * Math.PI/180;
            const minSinX = Math.sin(minAngleXRad)

            if(Math.abs(this.direction.y) < minSinX){
                this.direction.y = Math.sign(this.direction.y) * minSinX;

                if (this.direction.y === 0) this.direction.y = -minSinX;

                this.direction.x = Math.sign(this.direction.x) * Math.sqrt(1 - this.direction.y * this.direction.y);

                this.direction = this.direction.normalize();
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


