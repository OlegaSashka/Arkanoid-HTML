import { Vector2D } from "./vector2D.js";

export class GameObject {
    constructor(x, y, width, height, vx = 0, vy = 0) {
        this.position = new Vector2D(x, y);
        this.size = new Vector2D(width, height);
        this.velocity = new Vector2D(vx, vy);

        this.isAlive = true;
    }

    update(){
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    draw(ctx) {}

    get x() { return this.position.x; }
    set x(value) { this.position.x = value; }

    get y() { return this.position.y; }
    set y(value) { this.position.y = value; }

    // Переходники для размеров
    get width() { return this.size.x; }
    set width(value) { this.size.size.x = value; }

    get height() { return this.size.y; }
    set height(value) { this.size.y = value; }

    // Переходники для скоростей
    get vx() { return this.velocity.x; }
    set vx(value) { this.velocity.x = value; }

    get vy() { return this.velocity.y; }
    set vy(value) { this.velocity.y = value; }

    get left() { return this.position.x;}
    get right() { return this.position.x + this.size.x;}
    get top() { return this.position.y;}
    get bottom() { return this.position.y + this.size.y;}

    get centerX() {return this.position.x / this.size.x / 2;}
    get centerY() {return this.position.y / this.size.y / 2;}

    intersects(other) {
        return this.right > other.left &&
               this.left < other.right &&
               this.bottom > other.top &&
               this.top < other.bottom;
    }

    onCollision(other){}

    _isDead() {
        if(this.isAlive == false)
            console.log('Object is dead');
    }
}