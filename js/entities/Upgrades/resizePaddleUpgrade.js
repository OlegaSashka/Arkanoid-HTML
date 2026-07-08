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
                console.log("this.reduce 1" + this.reduce);
                level.paddle.reduceWidth(60);
            }else{
                console.log("this.reduce 2" + this.reduce);
                level.paddle.addWidth(60);
            }
        }
    }
}