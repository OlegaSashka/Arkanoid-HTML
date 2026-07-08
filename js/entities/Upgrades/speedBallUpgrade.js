import { UpgradeBrick } from './upgradeBrick.js';


export class SpeedBallUpgrade extends UpgradeBrick {
    constructor(x,y, width, height, speed = 3){super(x,y,width,height,speed,"#FF5722");}

    applyEffect(entity, level){
        if(level.balls.length > 0){
            level.balls.forEach(ball => {
                const curBallSpeed = ball.speed;
                level.resetAllSetings();
                ball.speed = curBallSpeed + 2.5;
                console.log("ball.baseSettingsCache.speed " + ball.baseSettingsCache.speed);
                if(ball.speed >= ball.baseSettingsCache.speed * 4){
                    ball.speed = ball.baseSettingsCache.speed * 4;
                }
                    
            });
            console.log("Все шары ускорены!"); 
        }
    }
}