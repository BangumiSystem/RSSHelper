// ==UserScript==
// @name         Rss Helper
// @version      0.0.1
// @description  This is a good monkey
// @author       SettingDust
//
// @include      http*://*
// @license      MIT
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
    const Route = __webpack_require__(1), router = new (__webpack_require__(3))();
    router.push(new Route(/yande\.re\/.*/, __webpack_require__(4))), router.push(new Route(/\/?.*\.?bilibili\.com\/.*/, __webpack_require__(13))), 
    router.push(new Route(/\/?.*\.?weibo\.com\/.*/, __webpack_require__(18))), router.load(location.href);
}, function(module, exports, __webpack_require__) {
    const pathToRegexp = __webpack_require__(2);
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
            let regex = pathToRegexp(this.url);
            return link.input ? regex.test(link.input) : regex.test(link);
        }
        match(link) {
            let regex = pathToRegexp(this.url);
            return link.input ? regex.exec(link.input) : regex.exec(link);
        }
        call(args) {
            this.route(args);
        }
    };
}, function(module, exports) {
    module.exports = pathToRegexp, module.exports.parse = parse, module.exports.compile = function(str, options) {
        return tokensToFunction(parse(str, options));
    }, module.exports.tokensToFunction = tokensToFunction, module.exports.tokensToRegExp = tokensToRegExp;
    var DEFAULT_DELIMITER = "/", DEFAULT_DELIMITERS = "./", PATH_REGEXP = new RegExp([ "(\\\\.)", "(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?" ].join("|"), "g");
    function parse(str, options) {
        for (var res, tokens = [], key = 0, index = 0, path = "", defaultDelimiter = options && options.delimiter || DEFAULT_DELIMITER, delimiters = options && options.delimiters || DEFAULT_DELIMITERS, pathEscaped = !1; null !== (res = PATH_REGEXP.exec(str)); ) {
            var m = res[0], escaped = res[1], offset = res.index;
            if (path += str.slice(index, offset), index = offset + m.length, escaped) path += escaped[1], 
            pathEscaped = !0; else {
                var prev = "", next = str[index], name = res[2], capture = res[3], group = res[4], modifier = res[5];
                if (!pathEscaped && path.length) {
                    var k = path.length - 1;
                    delimiters.indexOf(path[k]) > -1 && (prev = path[k], path = path.slice(0, k));
                }
                path && (tokens.push(path), path = "", pathEscaped = !1);
                var partial = "" !== prev && void 0 !== next && next !== prev, repeat = "+" === modifier || "*" === modifier, optional = "?" === modifier || "*" === modifier, delimiter = prev || defaultDelimiter, pattern = capture || group;
                tokens.push({
                    name: name || key++,
                    prefix: prev,
                    delimiter: delimiter,
                    optional: optional,
                    repeat: repeat,
                    partial: partial,
                    pattern: pattern ? escapeGroup(pattern) : "[^" + escapeString(delimiter) + "]+?"
                });
            }
        }
        return (path || index < str.length) && tokens.push(path + str.substr(index)), tokens;
    }
    function tokensToFunction(tokens) {
        for (var matches = new Array(tokens.length), i = 0; i < tokens.length; i++) "object" == typeof tokens[i] && (matches[i] = new RegExp("^(?:" + tokens[i].pattern + ")$"));
        return function(data, options) {
            for (var path = "", encode = options && options.encode || encodeURIComponent, i = 0; i < tokens.length; i++) {
                var token = tokens[i];
                if ("string" != typeof token) {
                    var segment, value = data ? data[token.name] : void 0;
                    if (Array.isArray(value)) {
                        if (!token.repeat) throw new TypeError('Expected "' + token.name + '" to not repeat, but got array');
                        if (0 === value.length) {
                            if (token.optional) continue;
                            throw new TypeError('Expected "' + token.name + '" to not be empty');
                        }
                        for (var j = 0; j < value.length; j++) {
                            if (segment = encode(value[j], token), !matches[i].test(segment)) throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"');
                            path += (0 === j ? token.prefix : token.delimiter) + segment;
                        }
                    } else if ("string" != typeof value && "number" != typeof value && "boolean" != typeof value) {
                        if (!token.optional) throw new TypeError('Expected "' + token.name + '" to be ' + (token.repeat ? "an array" : "a string"));
                        token.partial && (path += token.prefix);
                    } else {
                        if (segment = encode(String(value), token), !matches[i].test(segment)) throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"');
                        path += token.prefix + segment;
                    }
                } else path += token;
            }
            return path;
        };
    }
    function escapeString(str) {
        return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
    }
    function escapeGroup(group) {
        return group.replace(/([=!:$\/()])/g, "\\$1");
    }
    function flags(options) {
        return options && options.sensitive ? "" : "i";
    }
    function tokensToRegExp(tokens, keys, options) {
        for (var strict = (options = options || {}).strict, start = !1 !== options.start, end = !1 !== options.end, delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER), delimiters = options.delimiters || DEFAULT_DELIMITERS, endsWith = [].concat(options.endsWith || []).map(escapeString).concat("$").join("|"), route = start ? "^" : "", isEndDelimited = 0 === tokens.length, i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if ("string" == typeof token) route += escapeString(token), isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1; else {
                var capture = token.repeat ? "(?:" + token.pattern + ")(?:" + escapeString(token.delimiter) + "(?:" + token.pattern + "))*" : token.pattern;
                keys && keys.push(token), token.optional ? token.partial ? route += escapeString(token.prefix) + "(" + capture + ")?" : route += "(?:" + escapeString(token.prefix) + "(" + capture + "))?" : route += escapeString(token.prefix) + "(" + capture + ")";
            }
        }
        return end ? (strict || (route += "(?:" + delimiter + ")?"), route += "$" === endsWith ? "$" : "(?=" + endsWith + ")") : (strict || (route += "(?:" + delimiter + "(?=" + endsWith + "))?"), 
        isEndDelimited || (route += "(?=" + delimiter + "|" + endsWith + ")")), new RegExp(route, flags(options));
    }
    function pathToRegexp(path, keys, options) {
        return path instanceof RegExp ? function(path, keys) {
            if (!keys) return path;
            var groups = path.source.match(/\((?!\?)/g);
            if (groups) for (var i = 0; i < groups.length; i++) keys.push({
                name: i,
                prefix: null,
                delimiter: null,
                optional: !1,
                repeat: !1,
                partial: !1,
                pattern: null
            });
            return path;
        }(path, keys) : Array.isArray(path) ? function(path, keys, options) {
            for (var parts = [], i = 0; i < path.length; i++) parts.push(pathToRegexp(path[i], keys, options).source);
            return new RegExp("(?:" + parts.join("|") + ")", flags(options));
        }(path, keys, options) : function(path, keys, options) {
            return tokensToRegExp(parse(path, options), keys, options);
        }(path, keys, options);
    }
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
            console.debug("[RSSHelper]", this.routes), this.routes.forEach(route => {
                route.test(href) && route.call(route.match(href));
            });
        }
    };
}, function(module, exports, __webpack_require__) {
    const Route = __webpack_require__(1), router = new (__webpack_require__(3))();
    router.push(new Route(/tags=(?:(.*))?/, __webpack_require__(5))), router.push(new Route(/post\??(?!tags=.+)/, __webpack_require__(10))), 
    module.exports = (async args => {
        router.load(args), GM_addStyle(__webpack_require__(11).toString()), console.debug("[RSSHelper]", __webpack_require__(11).toString());
    });
}, function(module, exports, __webpack_require__) {
    const rssElem = $("<a/>"), config = __webpack_require__(6);
    rssElem.attr("id", "feed"), rssElem.attr("title", "Feed"), rssElem.attr("target", "_blank"), 
    rssElem.text(config.language.feed), module.exports = (async args => {
        rssElem.attr("href", `https://yande.re/post/piclens?tags=${args[1]}`), $("#post-list > div.sidebar > div:nth-child(1) > form > div").append(rssElem);
    });
}, function(module, exports, __webpack_require__) {
    console.debug("[RSSHelper]", __webpack_require__(7)("./en_US")), module.exports = {
        language: __webpack_require__(7)("./en_US")
    };
}, function(module, exports, __webpack_require__) {
    var map = {
        "./config": 6,
        "./config.js": 6,
        "./en_US": 8,
        "./en_US.json": 8,
        "./zh_CN": 9,
        "./zh_CN.json": 9
    };
    function webpackContext(req) {
        var id = webpackContextResolve(req);
        return __webpack_require__(id);
    }
    function webpackContextResolve(req) {
        var id = map[req];
        if (!(id + 1)) {
            var e = new Error("Cannot find module '" + req + "'");
            throw e.code = "MODULE_NOT_FOUND", e;
        }
        return id;
    }
    webpackContext.keys = function() {
        return Object.keys(map);
    }, webpackContext.resolve = webpackContextResolve, module.exports = webpackContext, 
    webpackContext.id = 7;
}, function(module) {
    module.exports = {
        feed: "Rss Feed"
    };
}, function(module) {
    module.exports = {
        feed: "Rss订阅"
    };
}, function(module, exports, __webpack_require__) {
    const rssElem = $("<a/>"), config = __webpack_require__(6);
    rssElem.attr("id", "feed"), rssElem.attr("title", "Feed"), rssElem.attr("target", "_blank"), 
    rssElem.text(config.language.feed), module.exports = (async () => {
        rssElem.attr("href", "https://yande.re/post/piclens"), $("#post-list > div.sidebar > div:nth-child(1) > form > div").append(rssElem);
    });
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(12)(!1)).push([ module.i, "#post-list>div.sidebar>div:first-child>form>div{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;line-height:20px}#post-list>div.sidebar>div:first-child>form>div #feed{margin-left:4px}", "" ]);
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
    const Route = __webpack_require__(1), router = new (__webpack_require__(3))();
    router.push(new Route(/video\/av\d+/, __webpack_require__(14))), router.push(new Route(/space\.bilibili\.com\/(\d+)/, __webpack_require__(15))), 
    router.push(new Route(/live\.bilibili\.com\/(\d+)/, __webpack_require__(16))), module.exports = (async args => {
        router.load(args), GM_addStyle(__webpack_require__(17).toString()), console.debug("[RSSHelper]", __webpack_require__(17).toString());
    });
}, function(module, exports, __webpack_require__) {
    const config = __webpack_require__(6), rssElem = $("<a/>");
    rssElem.addClass("btn"), rssElem.addClass("bi-btn"), rssElem.attr("id", "feed"), 
    rssElem.attr("target", "_blank"), rssElem.text(config.language.feed), module.exports = (async () => {
        let mid = $("#v_upinfo .u-face>a").attr("href").match(/\d+/)[0];
        rssElem.attr("href", `https://rsshub.app/bilibili/user/video/${mid}`);
        let task = setInterval(() => {
            $(".more-ops-list").length && ($("#v_upinfo .btn").prepend(rssElem), clearInterval(task));
        }, 500);
    });
}, function(module, exports, __webpack_require__) {
    const config = __webpack_require__(6), rssElem = $("<a/>");
    rssElem.addClass("h-f-btn"), rssElem.attr("id", "feed"), rssElem.attr("target", "_blank"), 
    rssElem.text(config.language.feed), module.exports = (async args => {
        rssElem.attr("href", `https://rsshub.app/bilibili/user/dynamic/${args[1]}`);
        let task = setInterval(() => {
            let elem = $(".h-action .h-message");
            elem.length && (elem.after(rssElem), clearInterval(task));
        }, 500);
    });
}, function(module, exports, __webpack_require__) {
    const config = __webpack_require__(6), rssElem = $("<a/>");
    rssElem.addClass("p-absolute"), rssElem.attr("id", "feed"), rssElem.attr("target", "_blank"), 
    rssElem.text(config.language.feed), module.exports = (async args => {
        rssElem.attr("href", `https://rsshub.app/bilibili/live/room/${args[1]}`);
        let task = setInterval(() => {
            let elem = $(".room-info-down-row .attention-btn-ctnr");
            elem.length && (elem.after(rssElem), clearInterval(task));
        }, 500);
    });
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(12)(!1)).push([ module.i, "#v_upinfo #feed{padding-left:16px;padding-right:16px;margin-left:12px;margin-top:0}.room-info-down-row #feed{height:22px;line-height:22px;padding-left:16px;padding-right:16px;background-color:#23ade5;color:#fff!important;border-radius:4px;right:130px;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);-webkit-transition:125ms ease-in-out;transition:125ms ease-in-out}.room-info-down-row #feed:hover{background-color:#23b9f1}", "" ]);
}, function(module, exports, __webpack_require__) {
    const Route = __webpack_require__(1), router = new (__webpack_require__(3))();
    router.push(new Route(/\/(?!\d+\/)\d+/, __webpack_require__(19))), module.exports = (async args => {
        router.load(args), GM_addStyle(__webpack_require__(20).toString()), console.debug("[RSSHelper]", __webpack_require__(20).toString());
    });
}, function(module, exports, __webpack_require__) {
    const rssElem = $("<a/>"), config = __webpack_require__(6);
    rssElem.addClass("W_btn_d"), rssElem.addClass("btn_34px"), rssElem.attr("title", "Feed"), 
    rssElem.addClass("W_btn_d"), rssElem.attr("target", "_blank"), rssElem.text(config.language.feed), 
    module.exports = (async () => {
        rssElem.attr("href", "https://rsshub.app/weibo/user/" + $CONFIG.oid), $("div.pf_opt > div").append(rssElem);
    });
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(12)(!1)).push([ module.i, "", "" ]);
} ]);