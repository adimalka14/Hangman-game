export default class GameLogic {
    #word;
    #guessedLetters;
    #maxMistakes;
    #mistakes;

    constructor() {
        this.#word = undefined;
        this.#guessedLetters = undefined;
        this.#maxMistakes = 10;
        this.#mistakes = 0;
    }

    get word() {
        return this.#word;
    }
    getGuessedLetters() {
        return Array.from(this.#guessedLetters);
    }

    getMaxMistakes() {
        return this.#maxMistakes;
    }

    getMistakes() {
        return this.#mistakes;
    }

    startNewGame(word) {
        this.#word = word;
        this.#guessedLetters = new Set(['-']);
        this.#mistakes = 0;
    }

    guessLetter(letter) {
        letter = letter.toLowerCase();
        if (this.#guessedLetters.has(letter)) {
            throw new Error('Letter already guessed');
        }

        this.#guessedLetters.add(letter);
        if (!this.#word.includes(letter)) {
            this.#mistakes++;
            return false;
        }

        return true;
    }

    getMaskedWord() {
        let maskedWord = '';
        for (const letter of this.word) {
            if (this.#guessedLetters.has(letter)) {
                maskedWord += letter;
            } else {
                maskedWord += '_';
            }
        }

        return maskedWord;
    }

    isWin() {
        return this.#word.replaceAll(' ', '-') === this.getMaskedWord();
    }

    isLose() {
        return this.#mistakes >= this.#maxMistakes;
    }
}
