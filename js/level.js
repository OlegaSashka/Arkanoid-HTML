import { BaseLevel } from './baseLevel.js';
import { Ball } from './ball.js';
import { Paddle } from './paddle.js';

export class Level extends BaseLevel {
    init(){
        this.balls[0] = new Ball(100, 450, 5, 4, 2);
        this.paddle = new Paddle(220, 500, 200, 20);

        this.paddle.init();
    }
}