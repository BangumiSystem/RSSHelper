const rssPrefix = 'https://yande.re/post/piclens?tags=';
const config = require('../../config/config');

const rssElem = $('<a\>').feedInit();
rssElem.attr('title', config.language.feed);
rssElem.text(config.language.feed);

module.exports = async (args) => {
    rssElem.href(`${rssPrefix}${args[1]}`);
    $('#post-list > div.sidebar > div:nth-child(1) > form > div').append(rssElem);
};
