import { GameScore } from "../managers/gameScore.js";
import { eventScore } from "../core/eventScore.js";
import { CollisionInfo, CollisionType } from "../core/collisionType.js";
import { Vector2D } from "../core/vector2D.js";
import { SaveManager } from "../managers/saveManager.js";
import { audioManager } from "../managers/audioManager.js";
import { AudioManifest } from "../../assets/audioManifest.js";

export class BaseLevel {
    constructor(worldWidth, worldHeight) {
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;

        this.balls = [];
        this.walls = [];
        this.bricks = [];

        this.paddle = null;

        this.score = new GameScore();
        
        this.currentLevel = 1;
        this.highLevel = 0;

        this.elementHighLevel = null
        this.elementLevel = null

        eventScore.on('brick:destroyed', (points) => 
        {
            this.score.resizeScore(points);
            audioManager.playSound(AudioManifest.BRICK_HIT.key);
        });

        this.init();
    }

    init(){
        this.score.resetScore();
        this.score.resetLives();
        this.currentLevel = 1;

        const savedState = SaveManager.load();
        this.score.highScore = savedState?.highScore ?? 0;
        this.highLevel = savedState?.highLevel ?? 0;

        const scoreElement = document.getElementById('game-score');
        const highScoreElement = document.getElementById('game-highScore');
        const livesElement = document.getElementById('game-lives');

        this.score.setElementsId(scoreElement, highScoreElement, livesElement);

        this.elementLevel = document.getElementById('game-level');
        this.elementHighLevel = document.getElementById('game-highLevel');

        this.restartLevel();
    }

    restartLevel(){
        if(this.elementHighLevel){
            this.elementHighLevel.innerText = this.highLevel;
        }
        if(this.elementLevel){
            this.elementLevel.innerText = this.currentLevel;
        }
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

                const paddleEvent = new CollisionInfo({
                    type: CollisionType.SURFACE,
                    normal: normal,
                    target: ball 
                });

                this.paddle.onCollision(paddleEvent);
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
                        rectTop: brick.top
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

        const relVx = ball.vx - (rect.vx || 0);
        const relVy = ball.vy - (rect.vy || 0);

        let minOverlap = Infinity;
        let normal = new Vector2D(0, 0);

        if (relVx > 0 && overlapLeft < minOverlap) {
            minOverlap = overlapLeft;
            normal = new Vector2D(-1, 0);
        }

        if (relVx < 0 && overlapRight < minOverlap) {
            minOverlap = overlapRight;
            normal = new Vector2D(1, 0);
        }

        if (relVy > 0 && overlapTop < minOverlap) {
            minOverlap = overlapTop;
            normal = new Vector2D(0, -1);
        }

        if (relVy < 0 && overlapBottom < minOverlap) {
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

        if(this.balls.length === 0){
            this.score.damagePlayer(1);
            if(this.score.lives > 0){
                this.score.changeScore(this.score.scoreOnStartLevel);
                this.restartLevel();
            }else if(this.score.lives <= 0){
                this.init();
            }

        }

        if(this.bricks.length === 0){
            this.currentLevel += 1;
            if(this.currentLevel > this.highLevel){
                this.highLevel = this.currentLevel;
                SaveManager.save({highLevel: this.highLevel});
                if(this.elementHighLevel){
                    this.elementHighLevel.innerText = this.highLevel;
                }
            }
            this.score.scoreOnStartLevel = this.score.currentScore;
            this.restartLevel();
        }  
    }
}