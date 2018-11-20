const Route = require('./include/route');

const Router = require('./include/router');
const router = new Router();

router.push(
    new Route('https?://yande.re/.*', require('./routes/yandere/index')),
    new Route('https?://www.bilibili.com/.*', require('./routes/bilibili/index'))
);

router.load(location.href);
