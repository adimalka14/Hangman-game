import  Settings  from '../Settings.js';

describe('Settings Class', () => {
    let settings;

    beforeEach(() => {
        settings = new Settings('english', 'animals');
    });

    test('should initialize with given language and topic', () => {
        expect(settings.getLanguage()).toBe('english');
        expect(settings.getTopic()).toBe('animals');
    });

    test('should update language using setLanguage', () => {
        settings.setLanguage('hebrew');
        expect(settings.getLanguage()).toBe('hebrew');
    });

    test('should update topic using setTopic', () => {
        settings.setTopic('emotions');
        expect(settings.getTopic()).toBe('emotions');
    });

    test('should allow updating both language and topic', () => {
        settings.setLanguage('hebrew');
        settings.setTopic('emotions');
        expect(settings.getLanguage()).toBe('hebrew');
        expect(settings.getTopic()).toBe('emotions');
    });
});
