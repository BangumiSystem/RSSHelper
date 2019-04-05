const variable = require('../../config/variable');
const { language, rsshub } = variable;
const rssPrefix = `${rsshub}/pixiv/user/`;

const rssElem = $('<a\>').feedInit();
rssElem.addClass('YryPnZn _30SjOFD');
rssElem.attr('title', language.feed);
rssElem.text(language.feed);

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
