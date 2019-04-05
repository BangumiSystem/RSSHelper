const Route = require('../../include/route');

const Router = require('../../include/router');
const router = new Router();

router.push(new Route(/video\/av\d+/, require('./video')));
router.push(new Route(/space\.bilibili\.com\/\d+/, require('./space')));
router.push(new Route(/live\.bilibili\.com\/\d+/, require('./live')));
router.push(new Route(/bangumi\/media\/md(\d+)/, require('./bangumi/page')));
router.push(new Route(/bangumi\/play\/ep\d+/, require('./bangumi/video')));

module.exports = async (args) => {
    router.load(args);
};
