const rssPrefix = 'https://yande.re/post/piclens';
const variable = require('../../config/variable');
const { language } = variable;

const rssElem = $('<a\>').feedInit();
rssElem.attr('title', language.feed);
rssElem.text(language.feed);

module.exports = async () => {
    rssElem.href(rssPrefix);
    $('#post-list > div.sidebar > div:nth-child(1) > form > div').append(rssElem);
};
