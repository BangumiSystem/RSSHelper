const logger = require('../../include/logger');
const config = require('../../config/config');
const rssPrefix = `${config.rsshub}/weibo/user/`;

const rssElem = $('<a\>').feedInit();

module.exports = async () => {
    window.onload = () => {
        if ($('.opt_box.clearfix').length) {
            rssElem.addClass('W_btn_d');
            rssElem.addClass('btn_34px');

            rssElem.attr('title', config.language.feed);
            rssElem.text(config.language.feed);
            rssElem.href(rssPrefix + $CONFIG.oid);

            $('div.pf_opt > .opt_box').append(rssElem);
        }
    };
};