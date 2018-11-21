const rssElem = $('<a/>');
const config = require('../../config/config');
const rssPrefix = `${config.rsshub}/pixiv/user/`;

rssElem.addClass('YryPnZn _30SjOFD');
rssElem.attr('title', config.language.feed);
rssElem.attr('id', 'feed');
rssElem.attr('target', '_blank');
rssElem.text(config.language.feed);

module.exports = async () => {
    rssElem.attr('href', rssPrefix + Object.keys(globalInitData.preload.user)[0]);
    let task = setInterval(() => {
        let elem = $('div._3yalhqB');
        if (elem.length) {
            elem.append(rssElem);
            clearInterval(task);
        }
    }, 500);
};
