import { GameScore } from "./gameScore.js";
import { eventScore } from "./eventScore.js";

export class BaseLevel {
    constructor(worldWidth, worldHeight) {
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;

        this.balls = [];
        this.walls = [];
        this.bricks = null;

        this.paddle = null;

        this.score = new GameScore();

        eventScore.on('brick:destroyed', (points) => 
            {
                this.score.resizeScore(points);
                
                const scoreElement = document.getElementById('game-score');
                if(scoreElement){
                    scoreElement.innerText = this.score.currentScore;
                }
            });

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

            this.walls.forEach(wall => {
                if(ball.intersects(wall)) {
                    const normal = this._getCollisionNormal(ball, wall);
                    ball.onCollision({
                        type: 'surface',
                        nx: normal.nx,
                        ny: normal.ny,
                        rectTop: wall.top
                    });
                }
            });

            this.bricks.forEach(brick => {
                if(ball.intersects(brick)) {
                    const normal = this._getCollisionNormal(ball, brick);
                    brick.onCollision({
                        type: 'surface',
                        nx: normal.nx,
                        ny: normal.ny,
                        rectTop: brick.top
                    });

                    ball.onCollision({
                        type: 'surface',
                        nx: normal.nx,
                        ny: normal.ny,
                        rectTop: brick.top
                    });
                }
            });

            if(this.paddle) {
                this.walls.forEach(wall => {
                    if(this.paddle.intersects(wall)){
                        if (wall.x < this.worldWidth / 2) {
                            this.paddle.onCollision({ type: 'wall_left', x: wall.right });
                        } else {
                            this.paddle.onCollision({ type: 'wall_right', x: wall.left });
                        }
                    }
                })
            }
        });
    }

    _getCollisionNormal(ball, rect){
        const overlapLeft = ball.right - rect.left;
        const overlapRight = rect.right - ball.left;
        const overlapTop = ball.bottom - rect.top;
        const overlapBottom = rect.bottom - ball.top;

        const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

        if(minOverlap == overlapLeft) return {nx: -1, ny: 0};
        if(minOverlap == overlapRight) return {nx: 1, ny: 0};
        if(minOverlap == overlapTop) return {nx: 0, ny: -1};
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

        this.walls.forEach(wall => {
            wall.draw(ctx);
        })

        this.bricks.forEach(brick => {
            brick.draw(ctx);
        })
    }

    _cleanup() {
        this.balls = this.balls.filter(ball => ball.isAlive);
        this.bricks = this.bricks.filter(brick => brick.isAlive);

        if(this.balls.length === 0)
            this.init();
    }
}