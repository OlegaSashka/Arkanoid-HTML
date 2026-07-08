import { UpgradeBrick } from './upgradeBrick.js';
import { Ball } from '../ball.js';

export class MultiBallUpgrade extends UpgradeBrick {
    constructor(x,y){super(x,y,15,15,3,"#bbff00ff");}

    applyEffect(entity, level){
        if(level.balls.length > 0){
            const currentBall = level.balls[0];

            const newBall = new Ball(
                currentBall.x,
                currentBall.y,
                currentBall.radius,
                -currentBall.direction.x,
                currentBall.direction.y,
                currentBall.speed
            );

            level.balls.push(newBall);
        }
    }
}