import { getWordBank } from "./languageSetups.js";

export default class WordBank {
    #bank;

    constructor() {
        this.#bank = null;
    }

    async initialize() {
        this.#bank = await this.#loadWords();
    }

    async #loadWords() {
        return getWordBank();
    }

    getRandomWord(language, topic) {
        if (!this.#bank.has(language)) {
            return null;
        }
        const languageMap = this.#bank.get(language);
        if (!languageMap.has(topic)) {
            return null;
        }

        const words = languageMap.get(topic);

        if (words.length === 0) {
            return null;
        }

        const randomIndex = Math.floor(Math.random() * words.length);
        const [randomWord] = words.splice(randomIndex, 1);

        return randomWord;
    }
}
