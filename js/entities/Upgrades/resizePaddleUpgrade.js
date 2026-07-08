import { UpgradeBrick } from './upgradeBrick.js';

export class ResizePaddleUpgrade extends UpgradeBrick {
    constructor(x, y, width, height, speed = 3, reduce = false){
        super(x, y, width,height, speed,"#00c72bff");
        this.reduce = reduce;
    }

    applyEffect(entity, level){
        if(level.balls.length > 0){
            level.resetAllSetings();
            if(this.reduce == true){
                level.paddle.reduceWidth(60);
            }else{
                level.paddle.addWidth(60);
            }
        }
    }
}