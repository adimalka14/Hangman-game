import WordBank from '../WordBank.js';

jest.mock(
    '../data/words/animals.hebrew.js',
    () => ({
        words: ['כלב', 'חתול', 'אריה'],
    }),
    { virtual: true }
);

jest.mock(
    '../data/words/animals.english.js',
    () => ({
        words: ['Dog', 'Cat', 'Lion'],
    }),
    { virtual: true }
);

jest.mock(
    '../data/words/empty.hebrew.js',
    () => ({
        words: [],
    }),
    { virtual: true }
);

jest.mock(
    '../data/words/missing.hebrew.js',
    () => {
        throw new Error('File not found');
    },
    { virtual: true }
);

describe('WordBank', () => {
    let wordBank;

    beforeEach(async () => {
        wordBank = new WordBank();
        await wordBank.initialize('hebrew', 'animals');
    });

    test('should initialize word bank with given language and topic', async () => {
        await wordBank.initialize('english', 'animals');
        const randomWord = wordBank.getRandomWord('english', 'animals');
        expect(['dog', 'cat', 'lion']).toContain(randomWord);
    });

    test('should load words and return a formatted random word', () => {
        const randomWord = wordBank.getRandomWord('hebrew', 'animals');

        const expectedWords = ['כלב', 'חתול', 'אריה'];
        expect(expectedWords).toContain(randomWord);
    });

    test('should mark a word as chosen after it is returned', () => {
        const firstWord = wordBank.getRandomWord('hebrew', 'animals');
        const secondWord = wordBank.getRandomWord('hebrew', 'animals');

        expect(firstWord).not.toEqual(secondWord);
    });

    test('should reset chosen status after all words are used', () => {
        wordBank.getRandomWord('hebrew', 'animals');
        wordBank.getRandomWord('hebrew', 'animals');
        wordBank.getRandomWord('hebrew', 'animals');

        const resetWord = wordBank.getRandomWord('hebrew', 'animals');
        expect(['כלב', 'חתול', 'אריה']).toContain(resetWord);
    });

    test('should reset chosen status after all words are used and continue returning words', () => {
        const usedWords = new Set();

        for (let i = 0; i < 3; i++) {
            {
                usedWords.add(wordBank.getRandomWord('hebrew', 'animals'));
            }
        }

        expect(usedWords.size).toBe(3);
        const resetWord = wordBank.getRandomWord('hebrew', 'animals');
        expect(usedWords).toContain(resetWord);
    });

    test('should return null if language does not exist', () => {
        const randomWord = wordBank.getRandomWord('spanish', 'animals');
        expect(randomWord).toBeNull();
    });

    test('should return null if topic does not exist', () => {
        const randomWord = wordBank.getRandomWord('hebrew', 'sports');
        expect(randomWord).toBeNull();
    });

    test('should return null if topic has no words', async () => {
        await wordBank.initialize('hebrew', 'empty');
        const randomWord = wordBank.getRandomWord('hebrew', 'empty');
        expect(randomWord).toBeNull();
    });

    test('should handle error when loading words from non-existing file', async () => {
        await wordBank.initialize('hebrew', 'missing');
        const randomWord = wordBank.getRandomWord('hebrew', 'missing');
        expect(randomWord).toBeNull();
    });
});
