import { GameObject } from './gameObject.js';

export class Brick extends GameObject {
    constructor(x, y, width, height, maxHp = 1, color = null, randomColor = false) {
        super(x,y, width, height);
        
        this.color = color;
        this.randomColor = randomColor;
        this.maxHp = maxHp;
        this.hp = maxHp;

        if(this.randomColor){
            this.color = this._getRandomColor();
        }

        if(!this.color || !this._isColor(this.color)){
            this.color = "green";
        }
    }

    update(){
        super.update();
        if(this.hp <= 0){
            this.isAlive = false;
        }
    }

    onCollision(other){
        if(other.type === 'surface'){
            this._damage(1);
            if(this.hp <= 0){
                this.isAlive = false;
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
        this.color = this._getRandomColor();
    }

    _damage(count){
        this.hp -= count; 
        
        if(this.hp <= 0) {
            this.hp = 0;
        };
        
    }

    _isColor(color){
        var reg=/^#([0-9a-f]{3}){1,2}$/i;
        return (reg.test(color));
    }

    _getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}
