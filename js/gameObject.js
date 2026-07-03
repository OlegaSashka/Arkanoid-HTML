export class GameObject {
    constructor(x, y, width, height, vx = 0, vy = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.vx = vx;
        this.vy = vy;

        this.isAlive = true;
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx) {}

    get left() { return this.x;}
    get right() { return this.x + this.width;}
    get top() { return this.y;}
    get bottom() { return this.y + this.height;}

    _isDead() {
        if(this.isAlive == false)
            console.log('Object is dead');
    }
}