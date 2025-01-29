import GameManager from '../GameManager.js';
import WordBank from '../WordBank.js';
import { GAME_STATUS } from '../consts.js';

jest.mock('../WordBank.js');

describe('GameManager', () => {
    let gameManager;

    beforeEach(() => {
        WordBank.mockImplementation(() => ({
            initialize: jest.fn(),
            getRandomWord: jest.fn(() => 'cat'),
        }));

        gameManager = new GameManager();
        gameManager.init('english', 'animals');
    });

    test('should initialize the game correctly', () => {
        const state = gameManager.getCurrentGameState();

        expect(state.word).toBeDefined();
        expect(state.mistakes).toBe(0);
        expect(state.maxMistakes).toBe(10);
    });

    test('should handle a correct guess', () => {
        const state = gameManager.getCurrentGameState();
        const firstLetter = 'c';

        gameManager.guess(firstLetter);
        const updatedState = gameManager.getCurrentGameState();

        expect(updatedState.word).toContain(firstLetter);
    });

    test('should handle an incorrect guess', () => {
        gameManager.guess('z');
        const state = gameManager.getCurrentGameState();

        expect(state.mistakes).toBe(1);
    });

    test('should detect a win', () => {
        for (const letter of 'cat') {
            gameManager.guess(letter);
        }

        const result = gameManager.guess('dummy');
        expect(result.status).toBe(GAME_STATUS.WIN);
    });

    test('should detect a loss', () => {
        const guesses = 'bdefghijk';
        for (let i = 0; i < 9; i++) {
            const result = gameManager.guess(guesses[i]);
            expect(result.status).toBe(GAME_STATUS.IN_PROGRESS);
            expect(result.mistakes).toBe(i + 1);
        }

        const result = gameManager.guess('l');
        expect(result.status).toBe(GAME_STATUS.LOSE);
    });
});
