export function renderRandomWord(word, direction) {
    const wordDom = `
        <div class="random-word ${direction}">
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

export function renderCharactersOptions(options, direction) {
    const charactersDom = `
            <div class="characters-options ${direction}">
                ${options
                    .split('')
                    .map((char) => `<div class="char-btn">${char}</div>`)
                    .join('')}
            </div>
        `;
    $('.characters-container').html(charactersDom);
}

export function renderMistakesState(mistakes, maxMistakes) {
    const imagePath = `../../public/images/hangman-${'welcome'}.png`;

    const mistakesDom = `
        <img class="hangman-picture" src=${imagePath} alt="hangman" />
        <div class="mistakes">
            <span>טעויות : ${mistakes}/${maxMistakes}</span>
        </div>
    `;

    $('.number-of-attempts-container').html(mistakesDom);
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

export function renderCharBtnStatus(letterBtn, isCorrect) {
    const $letterBtn = $(letterBtn);

    if (isCorrect) {
        $letterBtn.attr('data-color', 'correct');
    } else {
        $letterBtn.attr('data-color', 'wrong');
    }

    $letterBtn.attr('data-clickable', 'false');
}

export function lockAllButtons() {
    $('.char-btn').attr('data-clickable', 'false');
}

export function renderEndGameMessage(status) {
    const endGameMessage = status === 'win' ? 'ניצחת' : 'הפסדת';
    const resultDom = `
            <span data-status="${status}">${endGameMessage}</span>
    `;
    $('.result-container').append(resultDom);
}
