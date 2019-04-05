const variable = require('../../../config/variable');
const { language, rsshub } = variable;
const rssPrefix = `${rsshub}/bilibili/live/room/`;

const rssElem = $('<a\>').feedInit();
rssElem.addClass('p-absolute');
rssElem.attr('title', language.feed);
rssElem.text(language.feed);

module.exports = async (args) => {
    rssElem.href(`${rssPrefix}${args[1]}`);
    let task = setInterval(() => {
        let elem = $('.room-info-down-row .attention-btn-ctnr');
        if (elem.length) {
            elem.after(rssElem);
            clearInterval(task);
        }
    }, 500);
    GM_addStyle(require('./style.css').toString());
};
