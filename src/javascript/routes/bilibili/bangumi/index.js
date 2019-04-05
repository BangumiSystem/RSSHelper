const Route = require('../../../include/route');

const Router = require('../../../include/router');
const router = new Router();

router.push(new Route(/media\/md(\d+)/, require('./page')));
router.push(new Route(/play\/ep\d+/, require('./video')));

module.exports = async (args) => {
    router.load(args);
};
