import { GameObject } from './gameObject.js';

export class Wall extends GameObject {
    constructor(x, y, width, height, vx = 0, vy = 0, orientation) {
        super(x,y, width, height, vx, vy);
        this.orientation = orientation;
    }

    update(){
        super.update();
    }

    draw(ctx) {
        ctx.fillStyle = '#424242';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}