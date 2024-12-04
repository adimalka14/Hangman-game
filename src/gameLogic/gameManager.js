import GameLogic from "./gameLogic.js";
import WordBank from "./wordBank.js";
import Settings from "./settings.js";
import Result from "./result.js";

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
        await this.#wordBank.initialize();

        const word = this.#wordBank.getRandomWord(
            this.#settings.getLanguage(),
            this.#settings.getTopic()
        );

        if (!word) {
            throw new Error('No words available for the selected language and topic.');
        }

        this.#currentGame.startNewGame(word);
    }

    guess(letter) {
        this.#currentGame.guessLetter(letter);

        if (this.#currentGame.isWin()) {
            this.#result.addScore();
            return { status: 'win', word: this.#currentGame.getMaskedWord() };
        }

        if (this.#currentGame.isLose()) {
            this.#result.addLoss();
            return { status: 'lose', word: this.#currentGame.getMaskedWord() };
        }

        return {
            status: 'in-progress',
            word: this.#currentGame.getMaskedWord(),
            mistakes: this.#currentGame.getMistakes(),
            maxMistakes: this.#currentGame.getMaxMistakes(),
        };
    }

    getCurrentGameState() {
        return {
            word: this.#currentGame.getMaskedWord(),
            mistakes: this.#currentGame.getMistakes(),
            maxMistakes: this.#currentGame.getMaxMistakes(),
        };
    }

    startNewGame() {
        const word = this.#wordBank.getRandomWord(
            this.#settings.getLanguage(),
            this.#settings.getTopic()
        );

        if (!word) {
            throw new Error('No words available for the selected language and topic.');
        }

        this.#currentGame.startNewGame(word);
    }
}
