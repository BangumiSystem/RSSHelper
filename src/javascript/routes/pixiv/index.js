const Route = require('../../include/route');

const Router = require('../../include/router');
const router = new Router();

router.push(new Route(/member\.php\?id=\d+/, require('./member')));
router.push(new Route(/member_illust\.php\?.*illust_id=\d+/, require('./illust')));

module.exports = async (args) => {
    router.load(args);
    GM_addStyle(require('./style.css').toString());
    console.debug('[RSSHelper]', require('./style.css').toString());
};
