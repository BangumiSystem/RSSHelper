module.exports = class Router {
    constructor() {
        this._routes = [];
    }

    push(url, route) {
        new Route(url, require(route));
    }

    get routes() {
        return this._routes;
    }

    load(href) {
        this.routes.forEach((route) => {
            if (route.match(href)) {
                route.call(route.match(href));
            }
        });
    }
};
