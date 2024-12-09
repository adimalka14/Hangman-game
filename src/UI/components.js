export function renderRandomWord(word, direction) {
    const wordDom = word
        .split('')
        .map((char) => `<span class="word-char">${char !== '_' ? char : '&nbsp;'}</span>`)
        .join('');
    $('.word').attr('class', `word ${direction}`).html(wordDom);
}

export function renderLanguageOptions(languageSetup) {
    const languageDom = `
        <label for="language-select">בחר שפה:</label>
        <select id="language-select" class="language-select">
            ${Object.keys(languageSetup)
                .map((key) => `<option value="${key}">${languageSetup[key].language}</option>`)
                .join('')}
        </select>
    `;
    $('.languages').html(languageDom);
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
    $('.topics').html(topicDom);
}

export function renderCharactersOptions(options, direction) {
    const charactersDom = options
        .split('')
        .map((char) => `<button class="char-btn">${char}</button>`)
        .join('');
    $('.keyboard').attr('class', `keyboard ${direction}`).html(charactersDom);
}

export function renderMistakesState(mistakes, maxMistakes) {
    const imagePath = `../../public/images/hangman-${'welcome'}.png`;
    const mistakesDom = `
        <img class="hangman-image" src="${imagePath}" alt="Hangman" />
        <div>טעויות: ${mistakes}/${maxMistakes}</div>
    `;
    $('.status').html(mistakesDom);
}

export function renderResult(wins, losses) {
    const resultDom = `
        <div>ניצחונות: ${wins}</div>
        <div>הפסדים: ${losses}</div>
    `;
    $('.result').html(resultDom);
}

export function renderCharBtnStatus(letterBtn, isCorrect) {
    const $letterBtn = $(letterBtn);
    $letterBtn.attr('data-color', isCorrect ? 'correct' : 'wrong').attr('disabled', true);
}

export function lockAllButtons() {
    $('.char-btn').attr('disabled', true);
}

export function renderEndGameMessage(status) {
    const endGameMessage = status === 'win' ? 'ניצחת!' : 'הפסדת!';
    $('.end-message').text(endGameMessage).attr('data-status', status);
}
