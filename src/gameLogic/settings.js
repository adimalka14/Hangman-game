export default class Settings{
    #language;
    #topic;

    constructor(language, topic){
        this.#language = language;
        this.#topic = topic;
    }

    getLanguage(){
        return this.#language;
    }

    getTopic(){
        return this.#topic;
    }

    setLanguage(language){
        this.#language = language;
    }

    setTopic(topic){
        this.#topic = topic;
    }

}