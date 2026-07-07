export class GameScore {
    constructor(startScore = 0){
        this.startScore = startScore;
        this.currentScore = startScore;

        this.elementId = null;

        this.resetScore();
    }

    resizeScore(score){
        this.currentScore += score;

        if(this.elementId){
            this.elementId.innerText = this.currentScore;
        }
    }
    
    resetScore(){
        this.currentScore = this.startScore;

        if(this.elementId){
            this.elementId.innerText = this.currentScore;
        }
    }

    setElementId(elementId){
        this.elementId = elementId;

        if(this.elementId){
            this.elementId.innerText = this.currentScore;
        }
    }
}