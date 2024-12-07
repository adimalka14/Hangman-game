import { UILogic } from './UI/UILogic.js';
import GameManager from './gameLogic/gameManager.js';
import { LANGUAGE_SETUP, DEFAULT_LANGUAGE, DEFAULT_TOPIC } from './gameLogic/languageSetups.js';

let gameManager;

$(document).ready(() => {
    gameManager = new GameManager();

    UILogic.init(LANGUAGE_SETUP, DEFAULT_LANGUAGE);
});

$(document).on('click', '.start-button', async () => {
    const selectedLanguage = $('.language-select').val();
    const selectedTopic = $('.topic-select').val();

    console.log(`Selected Language: ${selectedLanguage}`);
    console.log('Selected Topic:', selectedTopic);
    const gameState = await gameManager.init(selectedLanguage, selectedTopic);
    console.log(gameState.word);
    UILogic.startGame(gameState, LANGUAGE_SETUP[selectedLanguage].characters);
});

$(document).on('click', '.char-btn', function () {
    console.log('clicked');
    const letter = $(this).text();
    console.log(`Clicked letter: ${letter}`);

    const gameState = gameManager.guess(letter);

    if (gameState.status === 'win' || gameState.status === 'lose') {
        UILogic.gameFinished(gameState);
    } else {
        UILogic.gameInProgress(gameState);
    }
});
