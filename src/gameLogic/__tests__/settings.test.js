import Settings from '../Settings.js';

describe('Settings Class', () => {
    let settings;

    beforeEach(() => {
        settings = new Settings('english', 'animals');
    });

    test('should initialize with given language and topic', () => {
        expect(settings.language).toBe('english');
        expect(settings.topic).toBe('animals');
    });

    test('should update language using setLanguage', () => {
        settings.language = 'hebrew';
        expect(settings.language).toBe('hebrew');
    });

    test('should update topic using setTopic', () => {
        settings.topic = 'emotions';
        expect(settings.topic).toBe('emotions');
    });

    test('should allow updating both language and topic', () => {
        settings.language = 'hebrew';
        settings.topic = 'emotions';
        expect(settings.language).toBe('hebrew');
        expect(settings.topic).toBe('emotions');
    });
});
