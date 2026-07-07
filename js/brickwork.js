import { Brick } from "./brick.js";

export class BrickWork {
    constructor(startX, startY, totalWidth, totalHeight, cols = 10, rows = 4){
        const generatedBricks = [];

        const brickWidth = totalWidth / cols;
        const brickHeight = totalHeight / rows;
        let color = null;
        for (let row = 0; row < rows; row++) {
            const y = startY + row * brickHeight;

            color = this._getRandomColor();
            for (let col = 0; col < cols; col++) {
                const x = startX + col * brickWidth;

                const brick = new Brick(x,y,brickWidth - 2, brickHeight - 2, 1, color, false);

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