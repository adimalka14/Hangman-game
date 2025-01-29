import {
    renderTopicOptions,
    renderLanguageOptions,
    renderRandomWord,
    renderCharactersOptions,
    renderResult,
    renderMistakesState,
    renderCharBtnStatus,
    lockAllButtons,
    renderEndGameMessage,
    clearEndGameMessage,
} from './renders.js';
import { bindEvents } from './eventHandlers.js';

export const UILogic = (function () {
    let dir;

    function init(languageSetup, defaultLanguage) {
        renderLanguageOptions(languageSetup);
        renderTopicOptions(languageSetup, defaultLanguage);
        bindEvents(languageSetup);
    }

    function startGame(gameState, charactersOptions, direction) {
        const { word, mistakes, maxMistakes, result } = gameState;
        dir = direction;
        renderRandomWord(word, dir);
        renderCharactersOptions(charactersOptions, dir);
        renderMistakesState(mistakes, maxMistakes, mistakes);
        renderResult(result.wins, result.losses);
        clearEndGameMessage();
    }

    function gameInProgress(gameState, clickedLetter) {
        const { isCorrect, word, mistakes, maxMistakes, result } = gameState;
        renderRandomWord(word, dir);
        renderMistakesState(mistakes, maxMistakes, mistakes);
        renderCharBtnStatus(clickedLetter, isCorrect);
    }

    function gameFinished(gameState, clickedLetter) {
        const { status, isCorrect, word, wordStatus, mistakes, maxMistakes, result } = gameState;
        renderRandomWord(word, dir, wordStatus);
        renderMistakesState(mistakes, maxMistakes, status);
        renderResult(result.wins, result.losses);
        renderCharBtnStatus(clickedLetter, isCorrect);
        lockAllButtons();
        renderEndGameMessage(status);
    }

    return {
        init,
        startGame,
        gameInProgress,
        gameFinished,
    };
})();
