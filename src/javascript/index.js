const Route = require('./include/route');

const Router = require('./include/router');
const router = new Router();

router.push(new Route(/yande\.re\/.*/, require('./routes/yandere/index')));
router.push(new Route(/\/?.*\.?bilibili\.com\/.*/, require('./routes/bilibili/index')));
router.push(new Route(/\/?.*\.?weibo\.com\/.*/, require('./routes/weibo/index')));

router.load(location.href);
