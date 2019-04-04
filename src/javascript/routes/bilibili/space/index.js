const config = require('../../../config/config');
const rssPrefix = `${config.rsshub}/bilibili/user/dynamic/`;

const rssElem = $('<a\>').feedInit();
rssElem.addClass('h-f-btn');
rssElem.attr('title', config.language.feed);
rssElem.text(config.language.feed);

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
