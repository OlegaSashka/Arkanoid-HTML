import { BaseLevel } from './baseLevel.js';
import { Ball } from './ball.js';
import { Paddle } from './paddle.js';
import { Wall } from './wall.js';
import { BrickWork } from './brickwork.js';

export class Level extends BaseLevel {
    init(){
        super.init();

        const startingBall = new Ball(400, 400, 10, 0, 0, 0);
        this.balls[0] = startingBall;

        this.paddle = new Paddle(220, 500, 200, 20, 0, 0, 5, startingBall);

        this.walls = [
            new Wall(0, 0, 20, 600, 'vertical'),     // Левая вертикальная стена
            new Wall(780, 0, 20, 600, 'vertical'),   // Правая вертикальная стена
            new Wall(0, 0, 800, 10, 'horizontal')    // Верхняя горизонтальная стена (крыша)
        ];

        this.bricks = new BrickWork(20, 50, this.worldWidth - 38, 140, 15, 5);
    }
}