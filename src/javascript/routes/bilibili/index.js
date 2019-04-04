const Route = require('../../include/route');

const Router = require('../../include/router');
const router = new Router();

router.push(new Route(/video\/av\d+/, require('./video')));
router.push(new Route(/space\.bilibili\.com\/(\d+)/, require('./space')));
router.push(new Route(/live\.bilibili\.com\/(\d+)/, require('./live')));

module.exports = async (args) => {
    router.load(args);
    GM_addStyle(require('./style.css').toString());
};
