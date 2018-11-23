// ==UserScript==
// @name         RSSHelper
// @version      0.0.1
// @description  A way too add a rss feed button on webpage
// @author       SettingDust
//
// @include      http*://*
// @license      MIT
//
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
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
    router.push(new Route(/yande\.re\/.*/, __webpack_require__(6))), router.push(new Route(/\/?.*\.?bilibili\.com\/.*/, __webpack_require__(15))), 
    router.push(new Route(/\/?.*\.?weibo\.com\/.*/, __webpack_require__(20))), router.push(new Route(/\/?.*\.?pixiv\.net\/.*/, __webpack_require__(22))), 
    router.push(new Route(/.+/, __webpack_require__(26))), router.load(location.href);
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
}, function(module, exports, __webpack_require__) {
    const logger = __webpack_require__(4);
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
            logger.debug(this.routes), this.routes.some(route => {
                if (route.test(href)) return route.call(route.match(href)), !0;
            });
        }
    };
}, function(module, exports, __webpack_require__) {
    const monkey = __webpack_require__(5);
    module.exports = {
        info: message => {
            console.info(`[${monkey.header.name}]`, message);
        },
        debug: message => {
            console.debug(`[${monkey.header.name}]`, message);
        },
        warn: message => {
            console.warn(`[${monkey.header.name}]`, message);
        }
    };
}, function(module, exports) {
    const header = {
        name: "RSSHelper",
        version: "0.0.1",
        description: "A way too add a rss feed button on webpage",
        author: "SettingDust",
        include: [ "http*://*" ],
        license: "MIT",
        require: [ "https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js" ],
        grant: [ "GM_addStyle" ]
    };
    module.exports.config = {
        entry: "./src/javascript/index.js"
    }, module.exports.header = header, module.exports.buildedHeader = (() => {
        let headerString = [];
        headerString.push("// ==UserScript==");
        for (let headerKey in header) if (Array.isArray(header[headerKey])) {
            header[headerKey].length > 0 && headerString.push("//");
            for (let p in header[headerKey]) headerString.push("// @" + headerKey.padEnd(13) + header[headerKey][p]);
        } else headerString.push("// @" + headerKey.padEnd(13) + header[headerKey]);
        return headerString.push("// ==/UserScript=="), headerString.push(""), headerString.join("\n");
    });
}, function(module, exports, __webpack_require__) {
    const Route = __webpack_require__(1), router = new (__webpack_require__(3))();
    router.push(new Route(/tags=(?:(.+))?/, __webpack_require__(7))), router.push(new Route(/post/, __webpack_require__(12))), 
    module.exports = (async args => {
        router.load(args), GM_addStyle(__webpack_require__(13).toString()), console.debug("[RSSHelper]", __webpack_require__(13).toString());
    });
}, function(module, exports, __webpack_require__) {
    const rssElem = $("<a/>"), config = __webpack_require__(8);
    rssElem.attr("id", "feed"), rssElem.attr("title", config.language.feed), rssElem.attr("target", "_blank"), 
    rssElem.text(config.language.feed), module.exports = (async args => {
        rssElem.attr("href", `https://yande.re/post/piclens?tags=${args[1]}`), $("#post-list > div.sidebar > div:nth-child(1) > form > div").append(rssElem);
    });
}, function(module, exports, __webpack_require__) {
    __webpack_require__(4).debug(__webpack_require__(9)("./en_US")), module.exports = {
        language: __webpack_require__(9)("./en_US"),
        rsshub: "https://rsshub.app"
    };
}, function(module, exports, __webpack_require__) {
    var map = {
        "./config": 8,
        "./config.js": 8,
        "./en_US": 10,
        "./en_US.json": 10,
        "./zh_CN": 11,
        "./zh_CN.json": 11
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
    webpackContext.id = 9;
}, function(module) {
    module.exports = {
        feed: "RSS Feed"
    };
}, function(module) {
    module.exports = {
        feed: "RSS订阅"
    };
}, function(module, exports, __webpack_require__) {
    const rssElem = $("<a/>"), config = __webpack_require__(8);
    rssElem.attr("id", "feed"), rssElem.attr("title", config.language.feed), rssElem.attr("target", "_blank"), 
    rssElem.text(config.language.feed), module.exports = (async () => {
        rssElem.attr("href", "https://yande.re/post/piclens"), $("#post-list > div.sidebar > div:nth-child(1) > form > div").append(rssElem);
    });
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(14)(!1)).push([ module.i, "#post-list>div.sidebar>div:first-child>form>div{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;line-height:20px}#post-list>div.sidebar>div:first-child>form>div #feed{margin-left:4px}", "" ]);
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
    router.push(new Route(/video\/av\d+/, __webpack_require__(16))), router.push(new Route(/space\.bilibili\.com\/(\d+)/, __webpack_require__(17))), 
    router.push(new Route(/live\.bilibili\.com\/(\d+)/, __webpack_require__(18))), module.exports = (async args => {
        router.load(args), GM_addStyle(__webpack_require__(19).toString()), console.debug("[RSSHelper]", __webpack_require__(19).toString());
    });
}, function(module, exports, __webpack_require__) {
    const config = __webpack_require__(8), rssPrefix = `${config.rsshub}/bilibili/user/video/`, rssElem = $("<a/>");
    rssElem.addClass("btn"), rssElem.addClass("bi-btn"), rssElem.attr("title", config.language.feed), 
    rssElem.attr("id", "feed"), rssElem.attr("target", "_blank"), rssElem.text(config.language.feed), 
    module.exports = (async () => {
        let mid = $("#v_upinfo .u-face>a").attr("href").match(/\d+/)[0];
        rssElem.attr("href", `${rssPrefix}${mid}`);
        let task = setInterval(() => {
            $(".more-ops-list").length && ($("#v_upinfo .btn").prepend(rssElem), clearInterval(task));
        }, 500);
    });
}, function(module, exports, __webpack_require__) {
    const config = __webpack_require__(8), rssPrefix = `${config.rsshub}/bilibili/user/dynamic/`, rssElem = $("<a/>");
    rssElem.addClass("h-f-btn"), rssElem.attr("title", config.language.feed), rssElem.attr("id", "feed"), 
    rssElem.attr("target", "_blank"), rssElem.text(config.language.feed), module.exports = (async args => {
        rssElem.attr("href", `${rssPrefix}${args[1]}`);
        let task = setInterval(() => {
            let elem = $(".h-action .h-message");
            elem.length && (elem.after(rssElem), clearInterval(task));
        }, 500);
    });
}, function(module, exports, __webpack_require__) {
    const config = __webpack_require__(8), rssPrefix = `${config.rsshub}/bilibili/live/room/`, rssElem = $("<a/>");
    rssElem.addClass("p-absolute"), rssElem.attr("title", config.language.feed), rssElem.attr("id", "feed"), 
    rssElem.attr("target", "_blank"), rssElem.text(config.language.feed), module.exports = (async args => {
        rssElem.attr("href", `${rssPrefix}${args[1]}`);
        let task = setInterval(() => {
            let elem = $(".room-info-down-row .attention-btn-ctnr");
            elem.length && (elem.after(rssElem), clearInterval(task));
        }, 500);
    });
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(14)(!1)).push([ module.i, "#v_upinfo #feed{padding-left:16px;padding-right:16px;margin-left:12px;margin-top:0}.room-info-down-row #feed{height:22px;line-height:22px;padding-left:16px;padding-right:16px;background-color:#23ade5;color:#fff!important;border-radius:4px;right:130px;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);-webkit-transition:125ms ease-in-out;transition:125ms ease-in-out}.room-info-down-row #feed:hover{background-color:#23b9f1}", "" ]);
}, function(module, exports, __webpack_require__) {
    const Route = __webpack_require__(1), router = new (__webpack_require__(3))();
    router.push(new Route(/\/(?!\d+\/)\d+/, __webpack_require__(21))), module.exports = (async args => {
        router.load(args);
    });
}, function(module, exports, __webpack_require__) {
    const rssElem = $("<a/>"), config = __webpack_require__(8), rssPrefix = `${config.rsshub}/weibo/user/`;
    rssElem.addClass("W_btn_d"), rssElem.addClass("btn_34px"), rssElem.attr("title", config.language.feed), 
    rssElem.addClass("W_btn_d"), rssElem.attr("target", "_blank"), rssElem.text(config.language.feed), 
    module.exports = (async () => {
        rssElem.attr("href", rssPrefix + $CONFIG.oid), $("div.pf_opt > div").append(rssElem);
    });
}, function(module, exports, __webpack_require__) {
    const Route = __webpack_require__(1), router = new (__webpack_require__(3))();
    router.push(new Route(/member\.php\?id=\d+/, __webpack_require__(23))), router.push(new Route(/member_illust\.php\?.*illust_id=\d+/, __webpack_require__(24))), 
    module.exports = (async args => {
        router.load(args), GM_addStyle(__webpack_require__(25).toString()), console.debug("[RSSHelper]", __webpack_require__(25).toString());
    });
}, function(module, exports, __webpack_require__) {
    const rssElem = $("<a/>"), config = __webpack_require__(8), rssPrefix = `${config.rsshub}/pixiv/user/`;
    rssElem.addClass("YryPnZn _30SjOFD"), rssElem.attr("title", config.language.feed), 
    rssElem.attr("id", "feed"), rssElem.attr("target", "_blank"), rssElem.text(config.language.feed), 
    module.exports = (async () => {
        rssElem.attr("href", rssPrefix + Object.keys(globalInitData.preload.user)[0]);
        let task = setInterval(() => {
            let elem = $("div._3yalhqB");
            elem.length && (elem.append(rssElem), clearInterval(task));
        }, 500);
    });
}, function(module, exports, __webpack_require__) {
    const rssElem = $("<a/>"), config = __webpack_require__(8), rssPrefix = `${config.rsshub}/pixiv/user/`;
    rssElem.addClass("YryPnZn"), rssElem.attr("title", config.language.feed), rssElem.attr("id", "feed"), 
    rssElem.attr("target", "_blank"), rssElem.text(config.language.feed), module.exports = (async () => {
        rssElem.attr("href", rssPrefix + Object.keys(globalInitData.preload.user)[0]);
        let task = setInterval(() => {
            let elem = $(".sc-dRCTWM.cRuxjo");
            elem.length && (elem.append(rssElem), clearInterval(task));
        }, 500);
    });
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(14)(!1)).push([ module.i, "#feed{text-decoration:none}._3yalhqB{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;width:auto}._3yalhqB #feed{margin-left:12px}.sc-dRCTWM.cRuxjo #feed{margin-top:12px}", "" ]);
}, function(module, exports, __webpack_require__) {
    const config = __webpack_require__(8), logger = __webpack_require__(4), rssElem = $("<a>");
    rssElem.attr("id", "user-feed"), rssElem.attr("target", "_blank"), rssElem.append('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><circle cx="6.18" cy="17.82" r="2.18"/><path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z"/></svg>');
    const rssElemText = $("<span>");
    rssElemText.text(config.language.feed), rssElem.append(rssElemText), module.exports = (async () => {
        const types = [ "application/rss+xml", "application/atom+xml", "application/rdf+xml", "application/rss", "application/atom", "application/rdf", "text/rss+xml", "text/atom+xml", "text/rdf+xml", "text/rss", "text/atom", "text/rdf" ];
        let feeds = [];
        $(() => {
            $("link[type]").each(function() {
                if (types.includes($(this).attr("type"))) {
                    let feed = {
                        href: $(this).attr("href"),
                        name: $(this).attr("title")
                    };
                    feeds.push(feed);
                }
            }), logger.debug(feeds), rssElem.attr("href", feeds[0].href), rssElemText.text(feeds[0].name), 
            $("body").append(rssElem), rssElem.mouseenter(() => {
                rssElem.css("width", rssElemText.width() + 24 + 8);
            }), rssElem.mouseleave(() => {
                rssElem.css("width", 24);
            });
        }), GM_addStyle(__webpack_require__(27).toString());
    });
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(14)(!1)).push([ module.i, "#user-feed{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:fixed;top:24px;right:0;font-size:14px;border-bottom-left-radius:4px;border-top-left-radius:4px;background-color:#f8f8f8;padding:3px 4px;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);-webkit-transition:125ms ease-in-out;transition:125ms ease-in-out;color:#212121!important;overflow:hidden;line-height:24px;width:24px}#user-feed svg{min-width:24px}#user-feed span{margin-left:4px;white-space:nowrap;opacity:0;-webkit-transition:125ms ease-in-out;transition:125ms ease-in-out}#user-feed:hover{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}#user-feed:hover span{opacity:1}", "" ]);
} ]);