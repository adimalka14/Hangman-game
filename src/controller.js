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
    await gameManager.init(selectedLanguage, selectedTopic);
    const result = gameManager.getCurrentGameState();
    console.log(result.word);
    UILogic.startGame(result.word, LANGUAGE_SETUP[selectedLanguage].characters);
});

window.$(document).on('click', '.char-btn', function () {
    console.log('clicked');
    const letter = $(this).text();
    console.log(`Clicked letter: ${letter}`);

    const result = gameManager.guess(letter);

    if (result.status === 'win' || result.status === 'lose') {
        UILogic.gameFinished(result.status, result.word, result.mistakes);
    } else {
        UILogic.gameInProgress(result.word, result.mistakes);
    }
});
