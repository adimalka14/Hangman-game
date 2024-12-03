export class WordBank {
    constructor() {
        this.bank = new Map();
        this.usedWords = new Set();
    }

    getRandomWord(language, topic) {
        if (!this.bank.has(language)) {
            return null;
        }
        const languageMap = this.bank.get(language);
        if (!languageMap.has(topic)) {
            return null;
        }

        const words = languageMap.get(topic);

        if (words.length === this.usedWords.size) {
            this.usedWords.clear();
        }

        do{
            const randomWord = words[Math.floor(Math.random() * words.length)];
            if (!this.usedWords.has(randomWord)) {
                this.usedWords.add(randomWord);
                return randomWord;
            }
        }while (true);
    }
}