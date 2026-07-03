import { BaseLevel } from './baseLevel.js';
import { Ball } from './ball.js';

export class Level extends BaseLevel {
    init(){
        this.balls[0] = new Ball(400, 590, 5, 3, -1);
    }
}