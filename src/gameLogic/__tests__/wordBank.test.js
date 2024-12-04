import  WordBank  from '../WordBank.js';
import { getWordBank } from '../languageSetups.js';

jest.mock('../languageSetups.js', () => ({
    getWordBank: jest.fn(),
}));

describe('WordBank', () => {
    let wordBank;

    beforeEach(async () => {
        getWordBank.mockResolvedValue(
            new Map([
                [
                    'hebrew',
                    new Map([
                        ['animals', ['כלב', 'חתול', 'אריה']],
                        ['emotions', ['שמח', 'עצוב', 'כועס']],
                    ]),
                ],
                [
                    'english',
                    new Map([
                        ['animals', ['Dog', 'Cat', 'Lion']],
                    ]),
                ],
            ])
        );

        wordBank = new WordBank();
        await wordBank.initialize();
    });

    test('should load words and return a random word', () => {
        const randomWord = wordBank.getRandomWord('hebrew', 'animals');
        expect(['כלב', 'חתול', 'אריה']).toContain(randomWord);
    });

    test('should remove the word after it is returned', () => {
        const firstWord = wordBank.getRandomWord('hebrew', 'animals');
        const secondWord = wordBank.getRandomWord('hebrew', 'animals');

        expect(['כלב', 'חתול', 'אריה']).toContain(firstWord);
        expect(['כלב', 'חתול', 'אריה']).toContain(secondWord);
        expect(firstWord).not.toBe(secondWord);
    });

    test('should return null if no words are left', () => {
        wordBank.getRandomWord('hebrew', 'animals');
        wordBank.getRandomWord('hebrew', 'animals');
        wordBank.getRandomWord('hebrew', 'animals');

        const noWordLeft = wordBank.getRandomWord('hebrew', 'animals');
        expect(noWordLeft).toBeNull();
    });

    test('should return null if language does not exist', () => {
        const randomWord = wordBank.getRandomWord('spanish', 'animals');
        expect(randomWord).toBeNull();
    });

    test('should return null if topic does not exist', () => {
        const randomWord = wordBank.getRandomWord('hebrew', 'sports');
        expect(randomWord).toBeNull();
    });
});
