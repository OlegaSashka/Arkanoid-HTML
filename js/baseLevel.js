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
        this.balls.forEach(ball =>{
            if(!ball.isAlive) return;

            if(this.paddle && ball.intersects(this.paddle)){
                const normal = this._getCollisionNormal(ball, this.paddle);

                ball.onCollision({
                    type: 'surface',
                    nx: normal.nx,
                    ny: normal.ny,
                    rectTop: this.paddle.top
                });
            }
        });
    }

    _getCollisionNormal(ball, rect){
        const overlapLeft = ball.right - rect.left;
        const overlapRight = rect.right - ball.left;
        const overlapTop = ball.bottom - rect.top;
        const overlapBottom = rect.right - ball.left;

        const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

        if(minOverlap == overlapLeft) return {nx: -1, ny: 0};
        if(minOverlap == overlapLeft) return {nx: 1, ny: 0};
        if(minOverlap == overlapLeft) return {nx: 0, ny: -1};
        return {nx: 0, ny: 1}
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