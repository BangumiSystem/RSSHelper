// ==UserScript==
// @name         Rss Helper
// @version      0.0.1
// @description  This is a good monkey
// @author       SettingDust
//
// @include      http*://*
//
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.js
//
// @grant        GM_addStyle
// ==/UserScript==

!(function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = (installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        });
        return (
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__),
            (module.l = !0),
            module.exports
        );
    }
    (__webpack_require__.m = modules),
        (__webpack_require__.c = installedModules),
        (__webpack_require__.d = function(exports, name, getter) {
            __webpack_require__.o(exports, name) ||
                Object.defineProperty(exports, name, {
                    enumerable: !0,
                    get: getter
                });
        }),
        (__webpack_require__.r = function(exports) {
            'undefined' != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(exports, Symbol.toStringTag, {
                    value: 'Module'
                }),
                Object.defineProperty(exports, '__esModule', {
                    value: !0
                });
        }),
        (__webpack_require__.t = function(value, mode) {
            if ((1 & mode && (value = __webpack_require__(value)), 8 & mode)) return value;
            if (4 & mode && 'object' == typeof value && value && value.__esModule) return value;
            var ns = Object.create(null);
            if (
                (__webpack_require__.r(ns),
                Object.defineProperty(ns, 'default', {
                    enumerable: !0,
                    value: value
                }),
                2 & mode && 'string' != typeof value)
            )
                for (var key in value)
                    __webpack_require__.d(
                        ns,
                        key,
                        function(key) {
                            return value[key];
                        }.bind(null, key)
                    );
            return ns;
        }),
        (__webpack_require__.n = function(module) {
            var getter =
                module && module.__esModule
                    ? function() {
                          return module.default;
                      }
                    : function() {
                          return module;
                      };
            return __webpack_require__.d(getter, 'a', getter), getter;
        }),
        (__webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        }),
        (__webpack_require__.p = ''),
        __webpack_require__((__webpack_require__.s = 0));
})([
    function(module, exports, __webpack_require__) {
        const router = new (__webpack_require__(1))();
        router.push('http?://yande.re/.*', './routes/yandere/index'),
            router.push('http?://www.bilibili.com/.*', './routes/bilibili/index'),
            router.load(location.href);
    },
    function(module, exports, __webpack_require__) {
        const Route = __webpack_require__(
            !(function() {
                var e = new Error("Cannot find module 'route'");
                throw ((e.code = 'MODULE_NOT_FOUND'), e);
            })()
        );
        module.exports = class {
            constructor() {
                this._routes = [];
            }
            push(url, route) {
                new Route(url, __webpack_require__(2)(route));
            }
            get routes() {
                return this._routes;
            }
            load(href) {
                this.routes.forEach((route) => {
                    route.match(href) && route.call(route.match(href));
                });
            }
        };
    },
    function(module, exports) {
        function webpackEmptyContext(req) {
            var e = new Error("Cannot find module '" + req + "'");
            throw ((e.code = 'MODULE_NOT_FOUND'), e);
        }
        (webpackEmptyContext.keys = function() {
            return [];
        }),
            (webpackEmptyContext.resolve = webpackEmptyContext),
            (module.exports = webpackEmptyContext),
            (webpackEmptyContext.id = 2);
    }
]);
