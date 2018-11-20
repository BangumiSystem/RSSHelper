const Router = require('../../include/router');
const router = new Router();

router.push('tags=(.{1,})', './posts');

module.exports = async (args) => {
    router.load(args);
    GM_addStyle(require('./style.css'));
};
