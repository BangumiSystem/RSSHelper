const config = require('../../config/config');
const rssPrefix = `${config.rsshub}/bilibili/user/video/`;

const rssElem = $('<a\>').feedInit();
rssElem.addClass('btn');
rssElem.addClass('bi-btn');
rssElem.attr('title', config.language.feed);
rssElem.text(config.language.feed);

module.exports = async () => {
    let mid = $('#v_upinfo .u-face>a')
        .attr('href')
        .match(/\d+/)[0];
    rssElem.href(`${rssPrefix}${mid}`);
    let task = setInterval(() => {
        if ($('.more-ops-list').length) {
            $('#v_upinfo .btn').prepend(rssElem);
            clearInterval(task);
        }
    }, 500);
};
