import { UILogic } from './UI/UILogic.js';
import GameManager from './gameLogic/gameManager.js';
import { LANGUAGE_SETUP, DEFAULT_LANGUAGE, DEFAULT_TOPIC } from './gameLogic/languageSetups.js';

let gameManager;
let direction;

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
    const { characters } = LANGUAGE_SETUP[selectedLanguage];
    direction = LANGUAGE_SETUP[selectedLanguage].direction;
    UILogic.startGame(gameState, characters, direction);
});

$(document).on('click', '.char-btn', function () {
    if ($(this).attr('data-clickable') === 'false') {
        return;
    }

    console.log('clicked');
    const letter = $(this).text();
    console.log(`Clicked letter: ${letter}`);
    try {
        const gameState = gameManager.guess(letter);
        if (gameState.status === 'win' || gameState.status === 'lose') {
            UILogic.gameFinished(gameState, this);
        } else {
            UILogic.gameInProgress(gameState, this);
        }
    } catch (error) {
        console.log(error);
    }
});
