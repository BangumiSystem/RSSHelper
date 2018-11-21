const rssElem = $('<a/>');
const config = require('../../config/config');
const rssPrefix = `${config.rsshub}/weibo/user/`;

rssElem.addClass('W_btn_d');
rssElem.addClass('btn_34px');

rssElem.attr('title', 'Feed');
rssElem.addClass('W_btn_d');

rssElem.attr('target', '_blank');
rssElem.text(config.language.feed);

module.exports = async () => {
    rssElem.attr('href', rssPrefix + $CONFIG.oid);
    $('div.pf_opt > div').append(rssElem);
    console.debug('[RSSHelper]', '111');
};
