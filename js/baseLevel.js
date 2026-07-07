import { GameScore } from "./gameScore.js";
import { eventScore } from "./eventScore.js";
import { CollisionInfo, CollisionType } from "./collisionType.js";
import { Vector2D } from "./vector2D.js";

export class BaseLevel {
    constructor(worldWidth, worldHeight) {
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;

        this.balls = [];
        this.walls = [];
        this.bricks = [];

        this.paddle = null;

        this.score = new GameScore();
        
        eventScore.on('brick:destroyed', (points) => 
            {
                this.score.resizeScore(points);
            });

        this.init();
    }

    init(){
        this.score.resetScore();

        const scoreElement = document.getElementById('game-score');
        this.score.setElementId(scoreElement);
    }

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

                const collisionEvent = new CollisionInfo({
                    type: CollisionType.SURFACE,
                    normal: normal,
                    target: this.paddle,
                    rectTop: this.paddle.top
                });

                ball.onCollision(collisionEvent);
            }

            this.walls.forEach(wall => {
                if(ball.intersects(wall)) {
                    const normal = this._getCollisionNormal(ball, wall);

                    const collisionEvent = new CollisionInfo({
                        type: CollisionType.SURFACE,
                        normal: normal,
                        target: wall,
                        rectTop: wall.top
                    });

                    ball.onCollision(collisionEvent);
                }
            });

            this.bricks.forEach(brick => {
                if(ball.intersects(brick)) {
                    const normal = this._getCollisionNormal(ball, brick);

                    const collisionEvent = new CollisionInfo({
                        type: CollisionType.SURFACE,
                        normal: normal,
                        target: brick,
                        rectTop: bri.top
                    });

                    brick.onCollision(collisionEvent);
                    ball.onCollision(collisionEvent);
                }
            });

            if(this.paddle) {
                this.walls.forEach(wall => {
                    if(this.paddle.intersects(wall)){
                        if (wall.x < this.worldWidth / 2) {
                            this.paddle.onCollision({ type: CollisionType.WALL_LEFT, x: wall.right });
                        } else {
                            this.paddle.onCollision({ type: CollisionType.WALL_RIGHT, x: wall.left });
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

        let minOverlap = Infinity;
        let normal = new Vector2D(0, 0);

        if (ball.vx > 0 && overlapLeft < minOverlap) {
            minOverlap = overlapLeft;
            normal = new Vector2D(-1, 0);
        }

        if (ball.vx < 0 && overlapRight < minOverlap) {
            minOverlap = overlapRight;
            normal = new Vector2D(1, 0);
        }

        if (ball.vy > 0 && overlapTop < minOverlap) {
            minOverlap = overlapTop;
            normal = new Vector2D(0, -1);
        }

        if (ball.vy < 0 && overlapBottom < minOverlap) {
            minOverlap = overlapBottom;
            normal = new Vector2D(0, 1);
        }
        return normal;
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