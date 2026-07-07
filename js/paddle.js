import { GameObject } from "./gameObject.js"
import { InputManager } from "./input.js"
import { Vector2D } from "./vector2D.js";
import { CollisionType } from "./collisionType.js";

export class Paddle extends GameObject {
    constructor(x, y, width, height, vx = 0, vy = 0, speed = 5, ballRider = null, xRide = 50) {
        super(x,y, width, height, vx, vy);

        this.speed = speed;
        this.ballRider = ballRider;
        this.input = null;

        this.xRide = xRide;

        this.init();
    }

    init(){
        this.input = new InputManager();

        this.input.bindKey('ArrowLeft', 'left');
        this.input.bindKey('KeyA', 'left');

        this.input.bindKey('ArrowRight', 'right');
        this.input.bindKey('KeyD', 'right');

        this.input.bindKey('Space', 'launch');
    }

    update() {
        this._tryMove(this.speed);
        if(this.ballRider){
            if(this.input.actions['launch']){
                this.ballRider.speed = 5;
                this.ballRider.direction = new Vector2D(this.vx/5,-1).normalize();

                this.ballRider = null;
            }else{
                this._glueBall(this.xRide);
            }
        }
        super.update();
    }

    onCollision(info) {
        if (info.type === CollisionType.WALL_LEFT && this.vx < 0) {
            this.vx = 0;
            this.x = info.x;
        }

        if (info.type === CollisionType.WALL_RIGHT  && this.vx > 0) {
            this.vx = 0;
            this.x = info.x - this.width;
        }

        if (info.type === CollisionType.SURFACE) {
            const normal = info.normal;

            if (normal.x !== 0 && info.target) {
                if (normal.x === 1) {
                    this.x = info.target.left - this.width;
                } else if (normal.x === -1) {
                    this.x = info.target.right;
                }
                
                this.vx = 0;
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#2196F3';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    setRideBall(ball, xRide){
        this.ballRider = ball;
        this.xRide = xRide;
    }

    _glueBall(x = this.centerX - this.ballRider.width / 2, y = this.top - this.ballRider.height){   
        let currentX = x + this.position.x - this.ballRider.width / 2;
                
        if(currentX < this.left){
            currentX = this.left - this.ballRider.width / 2;
        }
        if(currentX > this.right){
            currentX = this.right - this.ballRider.width / 2;
        }

        y = this.top - this.ballRider.height;

        this.ballRider.x = currentX;
        this.ballRider.y = y;
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