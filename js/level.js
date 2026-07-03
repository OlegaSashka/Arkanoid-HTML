import { BaseLevel } from './baseLevel.js';
import { Ball } from './ball.js';
import { Paddle } from './paddle.js';

export class Level extends BaseLevel {
    init(){
        this.balls[0] = new Ball(400, 590, 5, 3, -1);
        this.paddle = new Paddle(0, 500, 100, 10);

        this.paddle.init();
    }
}