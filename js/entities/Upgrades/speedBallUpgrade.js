import { UpgradeBrick } from './UpgradeBrick.js';

export class SpeedBallUpgrade extends GameObject {
    constructor(x,y){super(x,y,15,15,3,"#FF5722");}

    applyEffect(entity, level){
        if(level.balls.length > 0){
            level.balls.forEach(ball => {
                ball.speed += 2;
            });
            console.log("Все шары ускорены!"); 
        }
    }
}