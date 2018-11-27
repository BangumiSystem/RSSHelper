const config = require('../../config/config');
const logger = require('../../include/logger');

const rssElem = $('<a\>').feedInit();
rssElem.attr('target', '_blank');
rssElem.append('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><circle cx="6.18" cy="17.82" r="2.18"/><path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z"/></svg>');

const rssElemText = $('<span\>');
rssElemText.text(config.language.feed);
rssElem.append(rssElemText);

module.exports = async () => {
    const types = [
        'application/rss+xml',
        'application/atom+xml',
        'application/rdf+xml',
        'application/rss',
        'application/atom',
        'application/rdf',
        'text/rss+xml',
        'text/atom+xml',
        'text/rdf+xml',
        'text/rss',
        'text/atom',
        'text/rdf'
    ];
    let feeds = [];
    $(() => {
        $('link[type]').each(function() {
            if (types.includes($(this).attr('type'))) {
                let feed = {
                    href: $(this).attr('href'),
                    name: $(this).attr('title')
                };
                feeds.push(feed);
            }
        });
        logger.debug(feeds);
        rssElem.href(feeds[0].href);
        rssElemText.text(feeds[0].name);
        $('body').append(rssElem);
        rssElem.mouseenter(() => {
            rssElem.css('width', rssElemText.width() + 30 + 8);
        });
        rssElem.mouseleave(() => {
            rssElem.css('width', 30);
        });
    });
    GM_addStyle(require('./style.css').toString());
};
