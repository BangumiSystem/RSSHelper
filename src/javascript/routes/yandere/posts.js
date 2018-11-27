const rssPrefix = 'https://yande.re/post/piclens';
const config = require('../../config/config');

const rssElem = $('<a\>').feedInit();
rssElem.attr('title', config.language.feed);
rssElem.text(config.language.feed);

module.exports = async () => {
    rssElem.href(rssPrefix);
    $('#post-list > div.sidebar > div:nth-child(1) > form > div').append(rssElem);
};
