import { UpgradeBrick } from './upgradeBrick.js';
import { Ball } from '../ball.js';

export class MultiBallUpgrade extends UpgradeBrick {
    constructor(x,y, width, height, speed = 3){super(x,y,width,height,speed,"#bbff00ff");}

    applyEffect(entity, level){
        if(level.balls.length > 0){
            level.resetAllSetings();

            const currentBall = level.balls[0];

            const newBall = new Ball(
                currentBall.x,
                currentBall.y,
                currentBall.radius,
                Math.random(),
                Math.random(),
                currentBall.speed
            );

            level.balls.push(newBall);
        }
    }
}