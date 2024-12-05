export const LANGUAGE_SETUP = {
    hebrew: {
        language: 'עברית',
        characters: 'אבגדהוזחטיכלמנסעפצקרשת',
        topics: {
            animals: 'חיות',
            emotions: 'רגשות',
        },
    },
    english: {
        language: 'English',
        characters: 'abcdefghijklmnopqrstuvwxyz',
        topics: {
            animals: 'Animals',
        },
    },
};

export const DEFAULT_LANGUAGE = Object.keys(LANGUAGE_SETUP)[0];

export const DEFAULT_TOPIC = Object.keys(LANGUAGE_SETUP[DEFAULT_LANGUAGE].topics)[0];

export async function getWordBank() {
    const wordBank = new Map();

    for (const [languageKey, languageData] of Object.entries(LANGUAGE_SETUP)) {
        const topicsMap = new Map();

        for (const topicKey of Object.keys(languageData.topics)) {
            const fileName = `${topicKey}.${languageKey}.js`;
            try {
                const { words } = await import(`./data/words/${fileName}`);
                topicsMap.set(topicKey, words);
            } catch (error) {
                console.error(`Error loading file ${fileName}:`, error);
            }
        }

        wordBank.set(languageKey, topicsMap);
    }

    return wordBank;
}
