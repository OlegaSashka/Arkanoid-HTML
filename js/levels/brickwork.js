import { Brick } from "../entities/brick.js";

export class BrickWork {
    constructor(startX, startY, totalWidth, totalHeight, cols = 10, rows = 4, HP = 1, color = null){
        const generatedBricks = [];

        const brickWidth = totalWidth / cols;
        const brickHeight = totalHeight / rows;
        this.color = color;
        let oneColor = this.color == null;
        this.HP = HP;

        for (let row = 0; row < rows; row++) {
            const y = startY + row * brickHeight;

            if(oneColor)
                this.color = this._getRandomColor();
            for (let col = 0; col < cols; col++) {
                const x = startX + col * brickWidth;

                const brick = new Brick(x,y,brickWidth - 2, brickHeight - 2, this.HP, this.color, false);

                generatedBricks.push(brick);
            }
        }

        return generatedBricks;
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