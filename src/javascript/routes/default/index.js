const variable = require('../../config/variable');
const { language } = variable;
const logger = require('../../include/logger');

const rssContainer = $('<div\>').feedInit();

const rssElem = $('<a\>');
rssElem.attr('target', '_blank');
rssElem.addClass('rss-item');
rssElem.append('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><circle cx="6.18" cy="17.82" r="2.18"/><path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z"/></svg>');

const rssElemText = $('<span\>');
rssElemText.text(language.feed);
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
    const links = [
        '/feed',
        '/rss',
        '/rss.xml',
        '/atom.xml',
        '/feed.xml'
    ];
    let feeds = [];
    $(async () => {
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
        if (feeds.length) {
            for (const feed of feeds) {
                const rssElemClone = rssElem.clone();
                rssElemClone.href(feed.href.startsWith('/') ? `${location.protocol}//${location.host}${feed.href}` : feed.href);
                rssElemClone.find('span').text(feed.name);
                rssContainer.append(rssElemClone);
                rssElemClone.mouseenter(() => {
                    rssElemClone.css('width', rssElemClone.find('span').width() + 30 + 8);
                });
                rssElemClone.mouseleave(() => {
                    rssElemClone.css('width', 30);
                });
            }
            $('body').append(rssContainer);
        } else {
            for (const link of links) {
                fetch(link, {
                    headers: {
                        'User-Agent': 'curl/7.19.7 (x86_64-redhat-linux-gnu) libcurl/7.19.7 NSS/3.14.0.0 zlib/1.2.3'
                    }
                }).then(async (data) => {
                    if (data.ok) {
                        const html = await data.text();
                        logger.debug(link);
                        if (html.startsWith('<rss') || html.includes('\n<feed xmlns=')) {
                            const rssElemClone = rssElem.clone();
                            rssElemClone.href(data.url);
                            rssElemClone.find('span').text(html.match(/title>(.+)<\/title/)[1]);
                            rssContainer.append(rssElemClone);
                            rssElemClone.mouseenter(() => {
                                rssElemClone.css('width', rssElemClone.find('span').width() + 30 + 8);
                            });
                            rssElemClone.mouseleave(() => {
                                rssElemClone.css('width', 30);
                            });
                        }
                    }
                }).catch((data) => {
                    logger.debug(data);
                });
                $('body').append(rssContainer);
            }
        }
    });
    GM_addStyle(require('./style.css').toString());
};
