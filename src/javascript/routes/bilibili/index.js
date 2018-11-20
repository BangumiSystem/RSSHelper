const Route = require('../../include/route');

const Router = require('../../include/router');
const router = new Router();

router.push(new Route('video/av(?:(d{1,}))', require('./video')));

module.exports = async (args) => {
    router.load(args);
    GM_addStyle(require('./style.css'));
};
