import  GameLogic  from '../gameLogic.js';

describe('GameLogic Class', () => {
    let game;

    beforeEach(() => {
        game = new GameLogic();
        game.startNewGame('hangman');
    });

    test('should initialize mistakes to zero', () => {
        expect(game.getMistakes()).toBe(0);
    });

    test('should initialize with correct max mistakes', () => {
        expect(game.getMaxMistakes()).toBe(10);
    });

    test('should return masked word with underscores', () => {
        expect(game.getMaskedWord()).toBe('_______');
    });

    test('should reveal letters correctly when guessed', () => {
        game.guessLetter('a');
        expect(game.getMaskedWord()).toBe('_a___a_');
    });

    test('should increment mistakes when wrong letter is guessed', () => {
        game.guessLetter('z');
        expect(game.getMistakes()).toBe(1);
    });

    test('should not increment mistakes when correct letter is guessed', () => {
        game.guessLetter('h');
        expect(game.getMistakes()).toBe(0);
    });

    test('should not increment mistakes when same wrong letter is guessed again', () => {
        game.guessLetter('z');
        game.guessLetter('z');
        expect(game.getMistakes()).toBe(1);
    });

    test('should win the game when all letters are guessed', () => {
        const letters = ['h', 'a', 'n', 'g', 'm'];
        letters.forEach(letter => game.guessLetter(letter));
        expect(game.isWin()).toBe(true);
        expect(game.isLose()).toBe(false);
    });

    test('should lose the game when max mistakes are reached', () => {
        const wrongLetters = ['b', 'c', 'd', 'e', 'f', 'i', 'j', 'k', 'l', 'o'];
        wrongLetters.forEach(letter => game.guessLetter(letter));
        expect(game.isLose()).toBe(true);
        expect(game.isWin()).toBe(false);
    });

    test('getGuessedLetters should return array of guessed letters', () => {
        game.guessLetter('a');
        game.guessLetter('b');
        expect(game.getGuessedLetters()).toEqual(['a', 'b']);
    });

    test('should handle uppercase letters correctly', () => {
        game.guessLetter('A');
        expect(game.getMaskedWord()).toBe('_a___a_');
    });

    test('should not increment mistakes when same correct letter is guessed again', () => {
        game.guessLetter('a');
        game.guessLetter('a');
        expect(game.getMistakes()).toBe(0);
    });
});
