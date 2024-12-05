import { renderTopicOptions } from './components.js';

export function bindEvents(languageSetup) {
    $('.language-select').on('change', function () {
        const selectedLanguage = $(this).val();
        renderTopicOptions(languageSetup, selectedLanguage);
    });

    $('.random-word-char').on('click', function () {});
}
