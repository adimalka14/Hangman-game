import { UILogic } from './UI/UILogic.js';
import GameManager from './gameLogic/GameManager.js';
import { LANGUAGE_SETUP, DEFAULT_LANGUAGE } from './gameLogic/languageSetups.js';
import { GAME_STATUS } from './gameLogic/consts.js';

let gameManager;
let direction;

function initEnvironment(languageSetup = LANGUAGE_SETUP, defaultLanguage = DEFAULT_LANGUAGE) {
    gameManager = new GameManager();
    UILogic.init(languageSetup, defaultLanguage);
}

async function startGame() {
    const selectedLanguage = $('.language-select').val();
    const selectedTopic = $('.topic-select').val();
    const gameState = await gameManager.init(selectedLanguage, selectedTopic);
    const { characters } = LANGUAGE_SETUP[selectedLanguage];

    direction = LANGUAGE_SETUP[selectedLanguage].direction;
    UILogic.startGame(gameState, characters, direction);
}

$(document).ready(() => {
    initEnvironment();
});

$(document).on('click', '.start-button', startGame);

$(document).on('click', '.reset-button', async () => {
    initEnvironment();
    await startGame();
});

$(document).on('click', '.char-btn', function () {
    if ($(this).attr('data-clickable') === 'false') {
        return;
    }

    try {
        const letter = $(this).text();
        const gameState = gameManager.guess(letter);

        if (gameState.status === GAME_STATUS.WIN || gameState.status === GAME_STATUS.LOSE) {
            UILogic.gameFinished(gameState, this);
        } else {
            UILogic.gameInProgress(gameState, this);
        }
    } catch (error) {
        console.log(error);
    }
});
