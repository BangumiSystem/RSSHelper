const rssPrefix = 'https://rsshub.app/bilibili/user/dynamic/';
const config = require('../../config/config');

const rssElem = $('<a/>');
rssElem.addClass('h-f-btn');
rssElem.attr('id', 'feed');
rssElem.attr('target', '_blank');
rssElem.text(config.language.feed);

module.exports = async (args) => {
    rssElem.attr('href', `${rssPrefix}${args[1]}`);
    let task = setInterval(() => {
        let elem = $('.h-action .h-message');
        if (elem.length) {
            elem.after(rssElem);
            clearInterval(task);
        }
    }, 500);
};
