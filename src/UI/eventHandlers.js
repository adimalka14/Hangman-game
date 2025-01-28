import { renderTopicOptions } from './components.js';

export function bindEvents(languageSetup) {
    $('.language-select').on('change', function () {
        const selectedLanguage = $(this).val();
        renderTopicOptions(languageSetup, selectedLanguage);
    });

    $('.start-button').on('click', function () {
        $('.end-message').addClass('hidden').text('');
        $('h1').addClass('hidden');
        $('.attempts').removeClass('hidden');
    });
}
