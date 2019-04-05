const rssPrefix = 'https://yande.re/post/piclens?tags=';
const variable = require('../../config/variable');
const { language } = variable;

const rssElem = $('<a\>').feedInit();
rssElem.attr('title', language.feed);
rssElem.text(language.feed);

module.exports = async (args) => {
    rssElem.href(`${rssPrefix}${args[1]}`);
    $('#post-list > div.sidebar > div:nth-child(1) > form > div').append(rssElem);
};
