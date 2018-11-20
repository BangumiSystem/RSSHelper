const Route = require('./include/route');

const Router = require('./include/router');
const router = new Router();

router.push(new Route(/yande\.re\/.*/, require('./routes/yandere/index')));
router.push(new Route(/www\.bilibili\.com\/.*/, require('./routes/bilibili/index')));

console.debug('[RSSHelper]', router);

router.load(location.href);
