export default class WordBank {
    #bank;

    constructor() {
        this.#bank = new Map();
    }

    async initialize(language, topic) {
        if (!this.#bank.has(language)) {
            this.#bank.set(language, new Map());
        }

        const languageMap = this.#bank.get(language);

        if (!languageMap.has(topic)) {
            languageMap.set(topic, await this.#loadWords(language, topic));
        }
    }

    async #loadWords(language, topic) {
        const fileName = `${topic}.${language}.js`;

        try {
            const { words } = await import(`../../public/data/words/${fileName}`);
            return words.map((word) => ({ value: word.toLowerCase(), chosen: false }));
        } catch (error) {
            console.error(`Error loading file ${fileName}:`, error);
            return [];
        }
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

        let validWords = words.filter((word) => !word.chosen);

        if (validWords.length === 0) {
            words.forEach((word) => (word.chosen = false));
            validWords = words;
        }

        const randomIndex = Math.floor(Math.random() * validWords.length);
        validWords[randomIndex].chosen = true;
        return validWords[randomIndex].value.trimStart().trimEnd().replaceAll(' ', '-');
    }
}
