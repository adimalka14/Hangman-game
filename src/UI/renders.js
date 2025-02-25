export function renderRandomWord(word, direction, wordStatus = undefined) {
    const wordDom = `
    <div class="random-word">
        <div class="word-area">
            ${word
                .split('-')
                .map(
                    (w, i) => `
                    <div class="word ${direction}">
                        ${w
                            .split('')
                            .map((char, j) => {
                                const isMissing = wordStatus ? !wordStatus[i][j] : false;
                                return `<span class="word-char" ${isMissing ? 'data-missing="true"' : ''}>
                                    ${char !== '_' ? char : '&nbsp;'}
                                </span>`;
                            })
                            .join('')}
                    </div>
                `
                )
                .join('')}
        </div>
    </div>`;

    $('.random-word').remove();
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

    $('.hangman-image img').attr('src', imagePath);
    $('.attempts').html(`טעויות: <div>${mistakes}/${maxMistakes} </div>`);
}

export function renderResult(wins, losses) {
    const resultDom = `
<div class="result-container">
    <div class="result">
        <div>תוצאה:</div>
        <div>${wins}/${wins + losses}</div>
    </div>
    <button class="reset-button btn">אפס תוצאה</button>
</div>
    `;
    $('.result-container').remove();
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

    $('body').addClass(`${status}-background`);

    $endgameMessage.addClass(status);

    setTimeout(() => {
        $endgameMessage.addClass('loop');
        $('body').removeClass(`${status}-background`);
    }, 1500);
}

export function clearEndGameMessage() {
    $('.endgame-message').remove();
}
