export class GameScore {
    constructor(startScore = 0){
        this.startScore = startScore;
        this.currentScore = startScore;

        this.dateScore = null;

        this.resetScore();
    }

    resizeScore(score){
        this.currentScore += score;
    }
    
    resetScore(){
        this.currentScore = this.startScore;
    }

    get countScore(){
        return this.currentScore;
    }
}