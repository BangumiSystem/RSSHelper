const config = require('../../config/config');
const rssPrefix = `${config.rsshub}/bilibili/live/room/`;

const rssElem = $('<a/>');
rssElem.addClass('p-absolute');
rssElem.attr('title', config.language.feed);
rssElem.attr('id', 'feed');
rssElem.attr('target', '_blank');
rssElem.text(config.language.feed);

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
