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
        this.routes.forEach((route) => {
            if (route.test(href)) {
                route.call(route.match(href));
            }
        });
    }
};
