module.exports = class Router {
    constructor() {
        this._routes = [];
    }

    push(item) {
        this.routes.push(item);
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
