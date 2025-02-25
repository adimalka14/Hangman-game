export const LANGUAGE_SETUP = {
    hebrew: {
        language: 'עברית',
        characters: 'אבגדהוזחטיכלמנסעפצקרשת',
        specialCharacters: {
            כ: 'ך',
            נ: 'ן',
            מ: 'ם',
            צ: 'ץ',
            פ: 'ף',
        },
        topics: {
            animals: 'חיות',
            emotions: 'רגשות',
        },
        direction: 'rtl',
    },
    english: {
        language: 'English',
        characters: 'abcdefghijklmnopqrstuvwxyz',
        topics: {
            animals: 'Animals',
        },
        direction: 'ltr',
    },
};

export const DEFAULT_LANGUAGE = Object.keys(LANGUAGE_SETUP)[0];

export const DEFAULT_TOPIC = Object.keys(LANGUAGE_SETUP[DEFAULT_LANGUAGE].topics)[0];
