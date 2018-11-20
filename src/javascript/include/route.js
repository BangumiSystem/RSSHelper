module.exports = class Route {
    constructor(url, route) {
        this._url = url;
        this._route = route;
    }

    get url() {
        return this._url;
    }

    get route() {
        return this._route;
    }

    test(link) {
        let regex = new RegExp(this.url);
        return regex.test(link);
    }

    match(link) {
        let regex = new RegExp(this.url);
        return regex.exec(link);
    }

    call(args) {
        this.route(args);
    }
};
