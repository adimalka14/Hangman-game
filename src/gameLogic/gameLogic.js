import { LANGUAGE_SETUP } from './languageSetups.js';

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
    get guessedLetters() {
        return Array.from(this.#guessedLetters);
    }

    get maxMistakes() {
        return this.#maxMistakes;
    }

    get mistakes() {
        return this.#mistakes;
    }

    startNewGame(word) {
        this.#word = word;
        this.#guessedLetters = new Set(['-']);
        this.#mistakes = 0;
    }

    guessLetter(letter, language) {
        letter = letter.toLowerCase();
        if (this.#guessedLetters.has(letter)) {
            throw new Error('Letter already guessed');
        }

        this.#guessedLetters.add(letter);

        const specialCharacter = LANGUAGE_SETUP[language]?.specialCharacters?.[letter] ?? null;
        if (specialCharacter) {
            this.#guessedLetters.add(specialCharacter);
        }

        if (!this.#word.includes(letter) && (!specialCharacter || !this.#word.includes(specialCharacter))) {
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
