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
            ball.update(this.worldWidth, this.worldHeight);
        });

        if (this.paddle) {
            this.paddle.update(this.worldWidth, this.worldHeight);
        }

        this._checkCollision();

        this._cleanup();
    }

    _checkCollision() {
        this.balls.forEach(ball => {
            if(!ball.isAlive) return;

            if(ball.left < 0 || ball.right > this.worldWidth) {
                ball.onCollision({type: 'wall' });
            }
            if(ball.top < 0) {
                ball.onCollision({type: 'roof' });
            }

            if(this.paddle && ball.intersects(this.paddle)) {
                ball.onCollision(this.paddle);
                this.paddle.onCollision(ball);
            }

            if (this.paddle) {
                if (this.paddle.left < 0) 
                    this.paddle.onCollision({ type: 'wall_left' });
                if (this.paddle.right > this.worldWidth) 
                    this.paddle.onCollision({ type: 'wall_right' });
            }
        });
    }

    draw(ctx) {
        ctx.clearRect(0, 0, this.worldWidth, this.worldHeight);

        this.balls.forEach(ball => {
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