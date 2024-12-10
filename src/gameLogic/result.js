export default class Result {
    constructor() {
        this.wins = 0;
        this.losses = 0;
    }

    addWin() {
        this.wins++;
    }

    addLoss() {
        this.losses++;
    }
}
