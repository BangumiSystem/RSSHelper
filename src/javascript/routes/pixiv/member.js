const config = require('../../config/config');
const rssPrefix = `${config.rsshub}/pixiv/user/`;

const rssElem = $('<a\>').feedInit();
rssElem.addClass('YryPnZn _30SjOFD');
rssElem.attr('title', config.language.feed);
rssElem.text(config.language.feed);

module.exports = async () => {
    rssElem.href(rssPrefix + Object.keys(globalInitData.preload.user)[0]);
    let task = setInterval(() => {
        let elem = $('div._3yalhqB');
        if (elem.length) {
            elem.append(rssElem);
            clearInterval(task);
        }
    }, 500);
};