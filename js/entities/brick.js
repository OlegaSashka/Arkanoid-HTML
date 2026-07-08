import { GameObject } from './gameObject.js';
import { eventScore } from '../core/eventScore.js';
import { CollisionType } from '../core/collisionType.js';

import { MultiBallUpgrade } from './Upgrades/multiBallUpgrade.js';
import { SpeedBallUpgrade } from './Upgrades/speedBallUpgrade.js';
import { ResizePaddleUpgrade } from './Upgrades/resizePaddleUpgrade.js';

export class Brick extends GameObject {
    constructor(x, y, width, height, maxHp = 1, color = null, randomColor = false, score=10) {
        super(x,y, width, height);
        
        this.color = color;
        this.randomColor = randomColor;
        this.maxHp = maxHp;
        this.hp = maxHp;

        this.score = score;

        this.init();
    }

    init(){
        if(this.randomColor){
            this.color = this.#getRandomColor();
        }

        if(!this.color || !this.#isColor(this.color)){
            this.color = "green";
        }
    }

    update(){
        super.update();
        if(this.hp <= 0){
            this.isAlive = false;
        }
    }

    onCollision(other, level){
        if(other.type === CollisionType.SURFACE){
            this.#damage(1);
            if(this.hp <= 0){
                this.isAlive = false;
                eventScore.emit('brick:destroyed', this.score);
                const sizeX = this.width > 50 ? 50 : this.width;
                const sizeY = this.height > 15 ? 15 : this.height;
                if(this.#getRandomInt(0,100) > 89){
                    const block = new MultiBallUpgrade(this.left, 
                                        this.top, sizeX, sizeY, 2);
                    level.upgradeBricks.push(block);
                    return;
                }
                if(this.#getRandomInt(0,100) > 84){
                    const block = new SpeedBallUpgrade(this.left, 
                                this.top, sizeX, sizeY, 2);
                    level.upgradeBricks.push(block);
                    return;
                }
 
                if(this.#getRandomInt(0,100) > 87){
                    const block = new ResizePaddleUpgrade(
                        this.left, this.top, sizeX, sizeY, 2, this.#getRandomInt(0,100) > 45);
                    level.upgradeBricks.push(block);
                    return;
                }
            }
        }
    }

    draw(ctx) {
        const alpha = this.hp / this.maxHp;

        ctx.save();
        ctx.globalAlpha = alpha;

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.restore();
    }

    setRandomColor(){
        this.color = this.#getRandomColor();
    }

    #damage(count){
        this.hp -= count; 
        
        if(this.hp <= 0) {
            this.hp = 0;
        };
        
    }

    #isColor(color){
        var reg = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
        return (reg.test(color));
    }

    #getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    #getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
