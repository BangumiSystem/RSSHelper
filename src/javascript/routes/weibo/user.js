const logger = require('../../include/logger');
const rssElem = $('<a/>');
const config = require('../../config/config');
const rssPrefix = `${config.rsshub}/weibo/user/`;

rssElem.addClass('W_btn_d');
rssElem.addClass('btn_34px');

rssElem.attr('title', config.language.feed);
rssElem.addClass('W_btn_d');

rssElem.attr('target', '_blank');
rssElem.text(config.language.feed);

module.exports = async () => {
    rssElem.attr('href', rssPrefix + $CONFIG.oid);
    let task = setInterval(() => {
        let elem = $('div.pf_opt > .opt_box');
        if (elem.length) {
            elem.append(rssElem);
            clearInterval(task);
        }
    }, 500);
};
