require('./include/jquery.feed');

const router = require('./router');
router();

new ClipboardJS('#rss-helper');
