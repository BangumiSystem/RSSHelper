const variable = require('../../config/variable');
const { language, rsshub } = variable;
const rssPrefix = `${rsshub}/weibo/user/`;

const rssElem = $('<a\>').feedInit();

module.exports = async () => {
    window.onload = () => {
        if ($('.opt_box.clearfix').length) {
            rssElem.addClass('W_btn_d');
            rssElem.addClass('btn_34px');

            rssElem.attr('title', language.feed);
            rssElem.text(language.feed);
            rssElem.href(rssPrefix + $oid);

            $('div.pf_opt > .opt_box').append(rssElem);
        }
    };
};
