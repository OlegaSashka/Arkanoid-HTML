import { SaveManager } from "./saveManager.js";

export class GameScore {
    constructor(startScore = 0){
        this.startScore = startScore;
        this.currentScore = startScore;

        this.highScore = 0;
        this.lives = 3;

        this.elementScoreId = null;
        this.elementHighScoreId = null;
        this.elementLivesId = null;

        this.resetScore();
    }

    resizeScore(score){
        this.currentScore += score;

        if(this.elementScoreId){
            this.elementScoreId.innerText = this.currentScore;
        }
                 
        if(this.currentScore > this.highScore){
            this.highScore = this.currentScore;
            SaveManager.save({ highScore: this.highScore });
        }

        if(this.elementHighScoreId){
            this.elementHighScoreId.innerText = this.highScore;
        }
    }
    
    resetScore(){
        this.currentScore = this.startScore;

        if(this.elementScoreId){
            this.elementScoreId.innerText = this.currentScore;
        }
    }

    setElementsId(elementScoreId, elementHighScoreId, elementLivesId){
        this.elementScoreId = elementScoreId;
        this.elementHighScoreId = elementHighScoreId;
        this.elementLivesId = elementLivesId;
        
        if(this.elementScoreId){
            this.elementScoreId.innerText = this.currentScore;
        }
        if(this.elementHighScoreId){
            this.elementHighScoreId.innerText = this.highScore;
        }
        if(this.elementLivesId){
            this.elementLivesId.innerText = this.lives;
        }
    }
}