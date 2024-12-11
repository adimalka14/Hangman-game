export function renderRandomWord(word, direction) {
    const wordDom = `
        <div class="word-area">
            <div class="word ${direction}">
                ${word
                    .split('')
                    .map((char) => `<span class="word-char">${char !== '_' ? char : '&nbsp;'}</span>`)
                    .join('')} 
            </div>
        </div>`;

    $('.word-area').remove();
    $('.game-board div:first').after(wordDom);
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
            <select id="topic-select" class="topic-select">
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

export function renderMistakesState(mistakes, maxMistakes, picture) {
    const imagePath = `public/images/hangman-${picture}.png`;

    const mistakesDom = `
        <img class="hangman-image" src="${imagePath}" alt="Hangman" />
        <div class="attempts">
            <div>טעויות: ${mistakes}/${maxMistakes}</div>
        </div>
    `;

    $('.status').html(mistakesDom);
}

export function renderResult(wins, losses) {
    const resultDom = `
    <div class="result">
        <div>ניצחונות: ${wins}</div>
        <div>הפסדים: ${losses}</div>
    </div>
    `;
    $('.result').remove();
    $('.info').append(resultDom);
}

export function renderCharBtnStatus(letterBtn, isCorrect) {
    const $letterBtn = $(letterBtn);
    $letterBtn.attr('data-color', isCorrect ? 'correct' : 'wrong').attr('data-clickable', false);
}

export function lockAllButtons() {
    $('.char-btn').attr('data-clickable', false);
}

export function renderEndGameMessage(status) {
    const endGameMessage = status === 'win' ? 'ניצחת!' : 'הפסדת!';
    const $status = $('.status');
    const $endgameMessage = $(`<div class="endgame-message">${endGameMessage}</div>`);

    $status.append($endgameMessage);

    $endgameMessage.addClass(status);

    setTimeout(() => {
        $endgameMessage.addClass('loop');
    }, 3000);
}
