const rssElem = require('../../include/feed').rssElem.clone();
const rssPrefix = 'https://yande.re/post/piclens?tags=';

module.exports = async (args) => {
    rssElem.attr('href', `${rssPrefix}${args[1]}`);
    $('#post-list > div.sidebar > div:nth-child(1) > form > div').append(
        rssElem
    );
};
