const variable = require('../../../../config/variable');
const { language, rsshub } = variable;
const rssPrefix = `${rsshub}/bilibili/bangumi/media/`;

const rssElem = $('<a\>').feedInit();
rssElem.addClass('bangumi-btn');
rssElem.attr('title', language.feed);
rssElem.text(language.feed);

module.exports = async (ctx) => {
    rssElem.href(`${rssPrefix}${ctx[1]}`);
    $('.bangumi-btn').after(rssElem);
    GM_addStyle(require('./style.css').toString());
};
