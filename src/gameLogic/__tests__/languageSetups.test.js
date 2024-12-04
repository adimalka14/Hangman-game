import { getWordBank, LANGUAGE_SETUP } from '../languageSetups.js';

jest.mock('../data/words/animals.hebrew.js', () => ({ words: ['כלב', 'חתול', 'אריה'] }), { virtual: true });
jest.mock('../data/words/emotions.hebrew.js', () => ({ words: ['שמח', 'עצוב', 'כועס'] }), { virtual: true });
jest.mock('../data/words/animals.english.js', () => ({ words: ['Dog', 'Cat', 'Lion'] }), { virtual: true });

describe('getWordBank', () => {
    test('should return a valid word bank with correct structure', async () => {
        const wordBank = await getWordBank();

        expect(wordBank).toBeInstanceOf(Map);

        for (const languageKey of Object.keys(LANGUAGE_SETUP)) {
            expect(wordBank.has(languageKey)).toBe(true);
        }
    });

    test('should load words for hebrew animals topic', async () => {
        const wordBank = await  getWordBank();
        const hebrewData = wordBank.get('hebrew');

        expect(hebrewData).toBeInstanceOf(Object);
        const animalsWords = hebrewData.get('animals');
        expect(animalsWords).toEqual(['כלב', 'חתול', 'אריה']);
    });

    test('should handle missing files gracefully', async () => {
        const wordBank = await getWordBank();
        const hebrewData = wordBank.get('hebrew');

        const missingWords = hebrewData.get('missingTopic');
        expect(missingWords).toBeUndefined();
    });
});
