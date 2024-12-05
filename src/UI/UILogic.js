import {
    renderTopicOptions,
    renderLanguageOptions,
    renderRandomWord,
    renderCharactersOptions,
    renderHangmanPicture,
    renderResult,
} from './components.js';
import { bindEvents } from './eventHandlers.js';

export const UILogic = (function () {
    function init(languageSetup, defaultLanguage) {
        renderLanguageOptions(languageSetup);
        renderTopicOptions(languageSetup, defaultLanguage);
        bindEvents(languageSetup);
    }

    function startGame(word, charactersOptions, wins = 0, losses = 0) {
        renderRandomWord(word);
        renderCharactersOptions(charactersOptions);
        renderHangmanPicture(0);
        renderResult(wins, losses);
    }

    function gameInProgress(word, mistakes) {}

    function gameFinished(status, word, mistakes) {}

    return {
        init,
        startGame,
        gameInProgress,
        gameFinished,
    };
})();
