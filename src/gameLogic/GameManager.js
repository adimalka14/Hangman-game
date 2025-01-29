import GameLogic from './GameLogic.js';
import WordBank from './WordBank.js';
import Settings from './Settings.js';
import Result from './Result.js';
import { GAME_STATUS } from './consts.js';

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
        if (this.#currentGame !== null && !this.#currentGame.isWin() && !this.#currentGame.isLose()) {
            this.#result.addLoss();
        }

        this.#settings = new Settings(language, topic);
        this.#currentGame = new GameLogic();
        await this.#wordBank.initialize(language, topic);

        const word = this.#wordBank.getRandomWord(language, topic);

        if (!word) {
            throw new Error('No words available for the selected language and topic.');
        }

        this.#currentGame.startNewGame(word);
        return this.getCurrentGameState(undefined, GAME_STATUS.IN_PROGRESS);
    }

    guess(letter) {
        const isCorrect = this.#currentGame.guessLetter(letter, this.#settings.language);

        if (this.#currentGame.isWin()) {
            this.#result.addWin();
            return this.getCurrentGameState(isCorrect, GAME_STATUS.WIN);
        }

        if (this.#currentGame.isLose()) {
            this.#result.addLoss();
            return this.getCurrentGameState(isCorrect, GAME_STATUS.LOSE);
        }

        return this.getCurrentGameState(isCorrect, GAME_STATUS.IN_PROGRESS);
    }

    getCurrentGameState(isCorrect, status) {
        return {
            status,
            isCorrect,
            word: status === GAME_STATUS.IN_PROGRESS ? this.#currentGame.getMaskedWord() : this.#currentGame.word,
            wordStatus: this.#currentGame
                .getMaskedWord()
                .split('-')
                .map((w) => w.split('').map((char) => char !== '_')),
            mistakes: this.#currentGame.mistakes,
            maxMistakes: this.#currentGame.maxMistakes,
            result: this.#result,
        };
    }
}
