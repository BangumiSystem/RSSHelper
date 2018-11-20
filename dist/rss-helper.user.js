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

!function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.r = function(exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, __webpack_require__.t = function(value, mode) {
        if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module.default;
        } : function() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 0);
}([ function(module, exports, __webpack_require__) {
    const Route = __webpack_require__(1), router = new (__webpack_require__(2))();
    router.push(new Route(/yande\.re\/.*/, __webpack_require__(3))), router.push(new Route(/www\.bilibili\.com\/.*/, __webpack_require__(8))), 
    console.debug("[RSSHelper]", router), router.load(location.href);
}, function(module, exports) {
    module.exports = class {
        constructor(url, route) {
            this._url = url, this._route = route;
        }
        get url() {
            return this._url;
        }
        get route() {
            return this._route;
        }
        test(link) {
            return new RegExp(this.url).test(link);
        }
        match(link) {
            return new RegExp(this.url).exec(link);
        }
        call(args) {
            this.route(args);
        }
    };
}, function(module, exports) {
    module.exports = class {
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
            this.routes.forEach(route => {
                route.test(href) && (console.debug("[RSSHelper]", route.match(href)), route.call(route.match(href)));
            });
        }
    };
}, function(module, exports, __webpack_require__) {
    const Route = __webpack_require__(1), router = new (__webpack_require__(2))();
    router.push(new Route(/tags=(?:(.*))?/, __webpack_require__(4))), router.push(new Route(/(post)\?(?!tags=.+)/, __webpack_require__(5))), 
    module.exports = (async args => {
        router.load(args), GM_addStyle(__webpack_require__(6).toString());
    });
}, function(module, exports) {
    const rssElem = $("<a/>");
    rssElem.attr("title", "Feed"), rssElem.attr("target", "_blank"), rssElem.text("Feed"), 
    module.exports = (async args => {
        rssElem.attr("href", `https://yande.re/post/piclens?tags=${args[1]}`), $("#post-list > div.sidebar > div:nth-child(1) > form > div").append(rssElem);
    });
}, function(module, exports) {
    const rssElem = $("<a/>");
    rssElem.attr("title", "Feed"), rssElem.attr("target", "_blank"), rssElem.text("Feed"), 
    module.exports = (async () => {
        rssElem.attr("href", "https://yande.re/post/piclens"), $("#post-list > div.sidebar > div:nth-child(1) > form > div").append(rssElem);
    });
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(7)(!1)).push([ module.i, "#post-list>div.sidebar>div:first-child>form>div{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}", "" ]);
}, function(module, exports) {
    module.exports = function(useSourceMap) {
        var list = [];
        return list.toString = function() {
            return this.map(function(item) {
                var content = function(item, useSourceMap) {
                    var content = item[1] || "", cssMapping = item[3];
                    if (!cssMapping) return content;
                    if (useSourceMap && "function" == typeof btoa) {
                        var sourceMapping = (sourceMap = cssMapping, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */"), sourceURLs = cssMapping.sources.map(function(source) {
                            return "/*# sourceURL=" + cssMapping.sourceRoot + source + " */";
                        });
                        return [ content ].concat(sourceURLs).concat([ sourceMapping ]).join("\n");
                    }
                    var sourceMap;
                    return [ content ].join("\n");
                }(item, useSourceMap);
                return item[2] ? "@media " + item[2] + "{" + content + "}" : content;
            }).join("");
        }, list.i = function(modules, mediaQuery) {
            "string" == typeof modules && (modules = [ [ null, modules, "" ] ]);
            for (var alreadyImportedModules = {}, i = 0; i < this.length; i++) {
                var id = this[i][0];
                "number" == typeof id && (alreadyImportedModules[id] = !0);
            }
            for (i = 0; i < modules.length; i++) {
                var item = modules[i];
                "number" == typeof item[0] && alreadyImportedModules[item[0]] || (mediaQuery && !item[2] ? item[2] = mediaQuery : mediaQuery && (item[2] = "(" + item[2] + ") and (" + mediaQuery + ")"), 
                list.push(item));
            }
        }, list;
    };
}, function(module, exports, __webpack_require__) {
    const Route = __webpack_require__(1), router = new (__webpack_require__(2))();
    router.push(new Route(/video\/av\d+/, __webpack_require__(9))), module.exports = (async args => {
        router.load(args), GM_addStyle(__webpack_require__(10).toString()), console.debug("[RSSHelper]", __webpack_require__(10).toString());
    });
}, function(module, exports) {
    const rssElem = $("<a/>");
    rssElem.addClass("btn"), rssElem.addClass("bi-btn"), rssElem.attr("id", "feed"), 
    rssElem.attr("target", "_blank"), rssElem.text("Feed"), module.exports = (async () => {
        let mid = $("#v_upinfo .u-face>a").attr("href").match(/\d+/)[0];
        rssElem.attr("href", `https://rsshub.app/bilibili/user/video/${mid}`);
        let task = setInterval(() => {
            $(".b-cd .cd").length && ($("#v_upinfo .btn").prepend(rssElem), clearInterval(task));
        }, 500);
    });
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(7)(!1)).push([ module.i, "#v_upinfo #feed{padding-left:16px;padding-right:16px;margin-left:12px;margin-top:0}", "" ]);
} ]);