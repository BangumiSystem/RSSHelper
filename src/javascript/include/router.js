const logger = require('./logger');
module.exports = class Router {
    constructor() {
        this._routes = [];
    }

    push(router) {
        this.routes.push(router);
    }

    get routes() {
        return this._routes;
    }

    load(href) {
        logger.debug(this.routes);
        this.routes.some((route) => {
            if (route.test(href)) {
                route.call(route.match(href));
                return true;
            }
        });
    }
};
