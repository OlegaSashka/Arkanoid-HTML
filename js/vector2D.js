export class Vector2D{
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }

    getLength(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }


    normalize(){
        const length = this.getLength();
        if(length === 0){
            return new Vector2D(0, 0);
        }

        return new Vector2D(this.x / length, this.y / length);
    }

    dot(other){
        return this.x * other.x + this.y * other.y;
    }
}