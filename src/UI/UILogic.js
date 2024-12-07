import {
    renderTopicOptions,
    renderLanguageOptions,
    renderRandomWord,
    renderCharactersOptions,
    renderResult,
    renderMistakesState,
} from './components.js';
import { bindEvents } from './eventHandlers.js';

export const UILogic = (function () {
    function init(languageSetup, defaultLanguage) {
        renderLanguageOptions(languageSetup);
        renderTopicOptions(languageSetup, defaultLanguage);
        bindEvents(languageSetup);
    }

    function startGame(gameState, charactersOptions) {
        const { word, mistakes, maxMistakes, result } = gameState;
        renderRandomWord(word);
        renderCharactersOptions(charactersOptions);
        renderMistakesState(mistakes, maxMistakes);
        renderResult(result.wins, result.losses);
    }

    function gameInProgress(gameState) {
        const { isCorrect, word, mistakes, maxMistakes, result } = gameState;
        renderRandomWord(word);
        renderMistakesState(mistakes, maxMistakes);
    }

    function gameFinished(gameState) {
        const { status, isCorrect, word, mistakes, maxMistakes, result } = gameState;
        renderRandomWord(word);
        renderMistakesState(mistakes, maxMistakes);
        renderResult(result.wins, result.losses);
    }

    return {
        init,
        startGame,
        gameInProgress,
        gameFinished,
    };
})();
