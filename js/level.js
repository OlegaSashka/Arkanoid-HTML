import { BaseLevel } from './baseLevel.js';
import { Ball } from './ball.js';
import { Paddle } from './paddle.js';
import { Wall } from './wall.js';
import { BrickWork } from './brickwork.js';

export class Level extends BaseLevel {
    init(){
        super.init();
    }

    restartLevel(){
        super.restartLevel();

        const startingBall = new Ball(400, 400, 10, 0, 0, 0);
        this.balls[0] = startingBall;

        this.paddle = new Paddle(this.getRandomInt(0, this.worldWidth - 170), 500, 170, 15, 0, 0, 5, startingBall, this.getRandomInt(30,140));

        this.walls = [
            new Wall(0, 0, 20, 600, 0, 0,'vertical'),     // Левая вертикальная стена
            new Wall(780, 0, 20, 600, 0, 0, 'vertical'),   // Правая вертикальная стена
            new Wall(0, 0, 800, 10, 0, 0, 'horizontal')    // Верхняя горизонтальная стена (крыша)
        ];

        this.bricks = new BrickWork(20, 50, this.worldWidth - 38, 140, this.getRandomInt(5,20), this.getRandomInt(5,20));
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}