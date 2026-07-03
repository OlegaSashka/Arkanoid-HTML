export class BaseLevel {
    constructor(worldWidth, worldHeight) {
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;

        this.balls = [];
        this.walls = [];
        this.bricks = [];

        this.paddle = null;

        this.init();
    }

    init(){}

    update() {
        this.balls.forEach(ball => {
            if(ball)
                ball.update(this.worldWidth);
        });

        if (this.paddle) {
            this.paddle.update(this.worldWidth);
        }

        this._cleanup();
    }

    draw(ctx) {
        ctx.clearRect(0, 0, this.worldWidth, this.worldHeight);

        this.balls.forEach(ball => {
            if(ball)
                ball.draw(ctx);
        });

        if (this.paddle) {
            this.paddle.draw(ctx);
        }
    }

    _cleanup() {
        this.balls = this.balls.filter(ball => ball.isAlive);

        if(this.balls.length === 0)
            this.init();
    }
}