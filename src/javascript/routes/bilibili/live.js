const rssPrefix = 'https://rsshub.app/bilibili/live/room/';
const language = require('../../language/language');

const rssElem = $('<a/>');
rssElem.addClass('p-absolute');
rssElem.attr('id', 'feed');
rssElem.attr('target', '_blank');
rssElem.text(language.feed);

module.exports = async (args) => {
    rssElem.attr('href', `${rssPrefix}${args[1]}`);
    let task = setInterval(() => {
        let elem = $('.room-info-down-row .attention-btn-ctnr');
        if (elem.length) {
            elem.after(rssElem);
            clearInterval(task);
        }
    }, 500);
};
