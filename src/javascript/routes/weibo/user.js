const logger = require('../../include/logger');
const config = require('../../config/config');
const rssPrefix = `${config.rsshub}/weibo/user/`;

const rssElem = $('<a\>').feedInit();
rssElem.addClass('W_btn_d');
rssElem.addClass('btn_34px');

rssElem.attr('title', config.language.feed);
rssElem.text(config.language.feed);

module.exports = async () => {
    rssElem.href(rssPrefix + $CONFIG.oid);
    let task = setInterval(() => {
        let elem = $('div.pf_opt > .opt_box');
        if (elem.length) {
            elem.append(rssElem);
            clearInterval(task);
        }
    }, 500);
};
