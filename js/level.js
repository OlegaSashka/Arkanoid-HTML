import { BaseLevel } from './baseLevel.js';
import { Ball } from './ball.js';
import { Paddle } from './paddle.js';
import { Wall } from './wall.js';

export class Level extends BaseLevel {
    init(){
        this.balls[0] = new Ball(100, 450, 5, 4, -2);

        this.paddle = new Paddle(220, 500, 200, 20);

        this.walls = [
            new Wall(0, 0, 20, 600),     // Левая вертикальная стена
            new Wall(780, 0, 20, 600),   // Правая вертикальная стена
            new Wall(0, 0, 800, 20)    // Верхняя горизонтальная стена (крыша)
        ];
    }
}