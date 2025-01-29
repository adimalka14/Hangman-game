export default class Settings {
    #language;
    #topic;

    constructor(language, topic) {
        this.#language = language;
        this.#topic = topic;
    }

    get language() {
        return this.#language;
    }

    get topic() {
        return this.#topic;
    }

    set language(language) {
        this.#language = language;
    }

    set topic(topic) {
        this.#topic = topic;
    }
}
