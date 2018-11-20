const Router = require('./include/router');
const router = new Router();

router.push('http?://yande.re/.*', './routes/yandere/index');
router.push('http?://www.bilibili.com/.*', './routes/bilibili/index');

router.load(location.href);