export const LANGUAGE_SETUP = {
    hebrew: {
        language: 'עברית',
        characters: 'אבגדהוזחטיכלמנסעפצקרשת',
        topics: {
            emotions: 'רגשות',
            animals: 'חיות',
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

export async function getWordBank() {
    const wordBank = new Map();

    for (const [languageKey, languageData] of Object.entries(LANGUAGE_SETUP)) {
        const topicsMap = new Map();

        for (const topicKey of Object.keys(languageData.topics)) {
            const fileName = `${topicKey}.${languageKey}.js`;
            try {
                const {words} = await import(`./data/words/${fileName}`);
                topicsMap.set(topicKey, words);
            } catch (error) {
                console.error(`Error loading file ${fileName}:`, error);
            }
        }

        wordBank.set(languageKey, topicsMap);
    }

    return wordBank;
}


