const rssElem = $('<a/>');
const rssPrefix = 'https://yande.re/post/piclens?tags=';
const config = require('../../config/config');

rssElem.attr('id', 'feed');
rssElem.attr('title', 'Feed');
rssElem.attr('target', '_blank');
rssElem.text(config.language.feed);

module.exports = async (args) => {
    rssElem.attr('href', `${rssPrefix}${args[1]}`);
    $('#post-list > div.sidebar > div:nth-child(1) > form > div').append(rssElem);
};
