const rssElem = $('<a/>');
const rssPrefix = 'https://rsshub.app/weibo/user/';
const language = require('../../language/language');

rssElem.addClass('W_btn_d');
rssElem.addClass('btn_34px');

rssElem.attr('title', 'Feed');
rssElem.addClass('W_btn_d');

rssElem.attr('target', '_blank');
rssElem.text(language.feed);

module.exports = async () => {
    rssElem.attr('href', rssPrefix + $CONFIG.oid);
    $('div.pf_opt > div').append(rssElem);
};
