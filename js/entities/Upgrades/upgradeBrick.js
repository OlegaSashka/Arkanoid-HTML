import { eventScore } from '../../core/eventScore.js';
import { CollisionType } from '../../core/collisionType.js';
import { GameObject } from '../gameObject.js';

export class UpgradeBrick extends GameObject {
    constructor(x, y, width, height, speed = 2, color = "gold") {
        super(x,y, width, height, 0, speed);

        this.color = color;
    }

    update(worldWidth, worldHeight){
        super.update();
        if(this.top > worldHeight){
            this.isAlive = false;
        }
    }

    onCollision(info, level){
        if(info.type === CollisionType.SURFACE && info.target.constructor.name === 'Paddle'){
            this.applyEffect(info.target, level);
            this.isAlive = false;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }

    applyEffect(entity, level) {}

    _isColor(color){
        var reg = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
        return (reg.test(color));
    }

    _getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}
