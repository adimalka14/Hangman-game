import GameLogic from './gameLogic.js';
import WordBank from './wordBank.js';
import Settings from './settings.js';
import Result from './result.js';

export default class GameManager {
    #result;
    #wordBank;
    #settings;
    #currentGame;

    constructor() {
        this.#result = new Result();
        this.#wordBank = new WordBank();
        this.#settings = null;
        this.#currentGame = null;
    }

    async init(language = 'hebrew', topic = 'animals') {
        this.#settings = new Settings(language, topic);
        this.#currentGame = new GameLogic();
        await this.#wordBank.initialize(language, topic);

        const word = this.#wordBank.getRandomWord(language, topic);

        if (!word) {
            throw new Error('No words available for the selected language and topic.');
        }

        this.#currentGame.startNewGame(word);
        return this.getCurrentGameState(undefined, 'in-progress');
    }

    guess(letter) {
        const isCorrect = this.#currentGame.guessLetter(letter);

        if (this.#currentGame.isWin()) {
            this.#result.addScore();
            return this.getCurrentGameState(isCorrect, 'win');
        }

        if (this.#currentGame.isLose()) {
            this.#result.addLoss();
            return this.getCurrentGameState(isCorrect, 'lose');
        }

        return this.getCurrentGameState(isCorrect, 'in-progress');
    }

    getCurrentGameState(isCorrect, status) {
        return {
            status,
            isCorrect,
            word: status === 'in-progress' ? this.#currentGame.getMaskedWord() : this.#currentGame.word,
            mistakes: this.#currentGame.getMistakes(),
            maxMistakes: this.#currentGame.getMaxMistakes(),
            result: this.#result,
        };
    }

    startNewGame() {
        const word = this.#wordBank.getRandomWord(this.#settings.getLanguage(), this.#settings.getTopic());

        if (!word) {
            throw new Error('No words available for the selected language and topic.');
        }

        this.#currentGame.startNewGame(word);
    }
}
