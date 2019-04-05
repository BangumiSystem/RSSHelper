const variable = require('../../../config/variable');
const { language, rsshub } = variable;
const rssPrefix = `${rsshub}/bilibili/user/dynamic/`;

const rssElem = $('<a\>').feedInit();
rssElem.addClass('h-f-btn');
rssElem.attr('title', language.feed);
rssElem.text(language.feed);

module.exports = async (args) => {
    rssElem.href(`${rssPrefix}${args[1]}`);
    let task = setInterval(() => {
        let elem = $('.h-action .h-message');
        if (elem.length) {
            elem.after(rssElem);
            clearInterval(task);
        }
    }, 500);
};
