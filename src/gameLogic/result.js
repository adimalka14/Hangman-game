export default class Result{
    constructor(){
        this.score = 0;
        this.losses = 0;
    }

    addScore(){
        this.score++;
    }

    addLoss(){
        this.losses++;
    }
}