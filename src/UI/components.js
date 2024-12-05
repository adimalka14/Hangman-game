export function renderRandomWord(word) {
    const wordDom = `
        <div class="random-word">
            ${word
                .split('')
                .map((char) => `<span class="random-word-char">${char !== '_' ? char : '&nbsp;'}</span>`)
                .join('')}
        </div>
        `;

    $('.word-container').html(wordDom);
}

export function renderLanguageOptions(languageSetup) {
    const languageDom = `
            <label for="language-select">בחר שפה:</label>
            <select class="language-select">
                ${Object.keys(languageSetup)
                    .map((key) => `<option value="${key}">${languageSetup[key].language}</option>`)
                    .join('')}
            </select>
        `;
    $('.language-container').html(languageDom);
}

export function renderTopicOptions(languageSetup, selectedLanguage) {
    const topics = languageSetup[selectedLanguage].topics;
    const topicDom = `
            <label for="topic-select">בחר תוכן:</label>
            <select class="topic-select">
                ${Object.keys(topics)
                    .map((key) => `<option value="${key}">${topics[key]}</option>`)
                    .join('')}
            </select>
        `;
    $('.topics-container').html(topicDom);
}

export function renderCharactersOptions(options) {
    const charactersDom = `
            <div class="characters-options">
                ${options
                    .split('')
                    .map((char) => `<div class="char-btn">${char}</div>`)
                    .join('')}
            </div>
        `;
    $('.characters-container').html(charactersDom);
}

export function renderHangmanPicture(status) {
    const imagePath = `../../public/images/hangman-${'welcome'}.png`;
    $('.hangman-picture').attr('src', imagePath);
}

export function renderResult(wins, losses) {
    const resultDom = `
        <div class="result">
            <span>ניצחונות: ${wins}</span>
            <span>הפסדים: ${losses}</span>
        </div>
    `;
    $('.result-container').html(resultDom);
}
