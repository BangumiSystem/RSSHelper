const rssElem = $('<a/>');
const rssPrefix = 'https://yande.re/post/piclens';

rssElem.attr('title', 'Feed');
rssElem.attr('target', '_blank');
rssElem.text('Feed');

module.exports = async () => {
    rssElem.attr('href', rssPrefix);
    $('#post-list > div.sidebar > div:nth-child(1) > form > div').append(rssElem);
};
