// ==UserScript==
// @name         RSSHelper
// @version      0.0.5
// @description  A way to add a rss feed button on webpage
// @author       SettingDust
//
// @include      http*://*
// @license      MIT
//
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @require      https://cdn.bootcss.com/clipboard.js/2.0.1/clipboard.min.js
//
// @grant        GM_addStyle
// ==/UserScript==

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
const logger = __webpack_require__(2);
const Route = __webpack_require__(4);

const Router = __webpack_require__(6);
const router = new Router();

router.push(new Route(/yande\.re\/.*/, __webpack_require__(7)));
router.push(new Route(/\/?.*\.?bilibili\.com\/.*/, __webpack_require__(16)));
router.push(new Route(/\/?.*\.?weibo\.com\/.*/, __webpack_require__(21)));
router.push(new Route(/\/?.*\.?pixiv\.net\/.*/, __webpack_require__(23)));

router.push(new Route(/.+/, __webpack_require__(27)));

router.load(location.href);

new ClipboardJS('#rss-helper');


/***/ }),
/* 1 */
/***/ (function(module, exports) {

$.fn.feedInit = function() {
    this.attr('target', '_blank');
    this.attr('id', 'rss-helper');
    return this;
};

$.fn.href = function(href) {
    this.attr('href', href);
    this.attr('data-clipboard-text', href);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const monkey = __webpack_require__(3);
module.exports = {
    info: (message) => {
        console.info(`[${monkey.header.name}]`, message);
    },
    debug: (message) => {
        console.debug(`[${monkey.header.name}]`, message);
    },
    warn: (message) => {
        console.warn(`[${monkey.header.name}]`, message);
    }
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

let name = 'RSSHelper';
let version = '0.0.5';
let description = 'A way to add a rss feed button on webpage';

const config = {
    entry: './src/javascript/index.js'
};

const header = {
    name: name,
    version: version,
    description: description,
    author: 'SettingDust',
    include: ['http*://*'],
    license: 'MIT',
    require: [
        'https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js',
        'https://cdn.bootcss.com/clipboard.js/2.0.1/clipboard.min.js'
    ],
    grant: [
        //https://tampermonkey.net/documentation.php#GM_addStyle
        'GM_addStyle' //GM_addStyle(require('file').toString())
    ]
};

module.exports.config = config;
module.exports.header = header;
module.exports.buildedHeader = () => {
    let headerString = [];
    headerString.push('// ==UserScript==');
    for (let headerKey in header) {
        if (Array.isArray(header[headerKey])) {
            if (header[headerKey].length > 0) headerString.push('//');
            for (let p in header[headerKey]) {
                headerString.push('// @' + headerKey.padEnd(13) + header[headerKey][p]);
            }
        } else {
            headerString.push('// @' + headerKey.padEnd(13) + header[headerKey]);
        }
    }
    headerString.push('// ==/UserScript==');
    headerString.push('');
    return headerString.join('\n');
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const pathToRegexp = __webpack_require__(5);

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
        let regex = pathToRegexp(this.url);
        if (link.input) return regex.test(link.input);
        else return regex.test(link);
    }

    match(link) {
        let regex = pathToRegexp(this.url);
        if (link.input) return regex.exec(link.input);
        else return regex.exec(link);
    }

    call(args) {
        this.route(args);
    }
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * Default configs.
 */
var DEFAULT_DELIMITER = '/'
var DEFAULT_DELIMITERS = './'

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // ":test(\\d+)?" => ["test", "\d+", undefined, "?"]
  // "(\\d+)"  => [undefined, undefined, "\d+", undefined]
  '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER
  var delimiters = (options && options.delimiters) || DEFAULT_DELIMITERS
  var pathEscaped = false
  var res

  while ((res = PATH_REGEXP.exec(str)) !== null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      pathEscaped = true
      continue
    }

    var prev = ''
    var next = str[index]
    var name = res[2]
    var capture = res[3]
    var group = res[4]
    var modifier = res[5]

    if (!pathEscaped && path.length) {
      var k = path.length - 1

      if (delimiters.indexOf(path[k]) > -1) {
        prev = path[k]
        path = path.slice(0, k)
      }
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
      pathEscaped = false
    }

    var partial = prev !== '' && next !== undefined && next !== prev
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = prev || defaultDelimiter
    var pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prev,
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'
    })
  }

  // Push any remaining characters.
  if (path || index < str.length) {
    tokens.push(path + str.substr(index))
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
    }
  }

  return function (data, options) {
    var path = ''
    var encode = (options && options.encode) || encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token
        continue
      }

      var value = data ? data[token.name] : undefined
      var segment

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but got array')
        }

        if (value.length === 0) {
          if (token.optional) continue

          throw new TypeError('Expected "' + token.name + '" to not be empty')
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j], token)

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        segment = encode(String(value), token)

        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"')
        }

        path += token.prefix + segment
        continue
      }

      if (token.optional) {
        // Prepend partial segment prefixes.
        if (token.partial) path += token.prefix

        continue
      }

      throw new TypeError('Expected "' + token.name + '" to be ' + (token.repeat ? 'an array' : 'a string'))
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$/()])/g, '\\$1')
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {Array=}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  if (!keys) return path

  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        pattern: null
      })
    }
  }

  return path
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  return new RegExp('(?:' + parts.join('|') + ')', flags(options))
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}  tokens
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  options = options || {}

  var strict = options.strict
  var start = options.start !== false
  var end = options.end !== false
  var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER)
  var delimiters = options.delimiters || DEFAULT_DELIMITERS
  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|')
  var route = start ? '^' : ''
  var isEndDelimited = tokens.length === 0

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
      isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1
    } else {
      var capture = token.repeat
        ? '(?:' + token.pattern + ')(?:' + escapeString(token.delimiter) + '(?:' + token.pattern + '))*'
        : token.pattern

      if (keys) keys.push(token)

      if (token.optional) {
        if (token.partial) {
          route += escapeString(token.prefix) + '(' + capture + ')?'
        } else {
          route += '(?:' + escapeString(token.prefix) + '(' + capture + '))?'
        }
      } else {
        route += escapeString(token.prefix) + '(' + capture + ')'
      }
    }
  }

  if (end) {
    if (!strict) route += '(?:' + delimiter + ')?'

    route += endsWith === '$' ? '$' : '(?=' + endsWith + ')'
  } else {
    if (!strict) route += '(?:' + delimiter + '(?=' + endsWith + '))?'
    if (!isEndDelimited) route += '(?=' + delimiter + '|' + endsWith + ')'
  }

  return new RegExp(route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {Array=}                keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys)
  }

  if (Array.isArray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), keys, options)
  }

  return stringToRegexp(/** @type {string} */ (path), keys, options)
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const logger = __webpack_require__(2);
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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Route = __webpack_require__(4);
const logger = __webpack_require__(2);

const Router = __webpack_require__(6);
const router = new Router();

router.push(new Route(/tags=(?:(.+))?/, __webpack_require__(8)));
router.push(new Route(/post/, __webpack_require__(13)));

module.exports = async (args) => {
    router.load(args);
    GM_addStyle(__webpack_require__(14).toString());
    logger.debug(__webpack_require__(14).toString());
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const rssPrefix = 'https://yande.re/post/piclens?tags=';
const config = __webpack_require__(9);

const rssElem = $('<a\>').feedInit();
rssElem.attr('title', config.language.feed);
rssElem.text(config.language.feed);

module.exports = async (args) => {
    rssElem.href(`${rssPrefix}${args[1]}`);
    $('#post-list > div.sidebar > div:nth-child(1) > form > div').append(rssElem);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const logger = __webpack_require__(2);
const lang = 'en_US';

// TODO add gui to edit config
logger.debug(__webpack_require__(10)(`./${lang}`));

module.exports = {
    language: __webpack_require__(10)(`./${lang}`),
    rsshub: 'https://rsshub.app'
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./config": 9,
	"./config.js": 9,
	"./en_US": 11,
	"./en_US.json": 11,
	"./zh_CN": 12,
	"./zh_CN.json": 12
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 10;

/***/ }),
/* 11 */
/***/ (function(module) {

module.exports = {"feed":"RSS Feed"};

/***/ }),
/* 12 */
/***/ (function(module) {

module.exports = {"feed":"RSS订阅"};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

const rssPrefix = 'https://yande.re/post/piclens';
const config = __webpack_require__(9);

const rssElem = $('<a\>').feedInit();
rssElem.attr('title', config.language.feed);
rssElem.text(config.language.feed);

module.exports = async () => {
    rssElem.href(rssPrefix);
    $('#post-list > div.sidebar > div:nth-child(1) > form > div').append(rssElem);
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "#post-list>div.sidebar>div:first-child>form>div{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;line-height:20px}#post-list>div.sidebar>div:first-child>form>div #rss-helper{margin-left:4px}", ""]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

const Route = __webpack_require__(4);
const logger = __webpack_require__(2);

const Router = __webpack_require__(6);
const router = new Router();

router.push(new Route(/video\/av\d+/, __webpack_require__(17)));
router.push(new Route(/space\.bilibili\.com\/(\d+)/, __webpack_require__(18)));
router.push(new Route(/live\.bilibili\.com\/(\d+)/, __webpack_require__(19)));

module.exports = async (args) => {
    router.load(args);
    GM_addStyle(__webpack_require__(20).toString());
    logger.debug(__webpack_require__(20).toString());
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

const config = __webpack_require__(9);
const rssPrefix = `${config.rsshub}/bilibili/user/video/`;

const rssElem = $('<a\>').feedInit();
rssElem.addClass('btn');
rssElem.addClass('bi-btn');
rssElem.attr('title', config.language.feed);
rssElem.text(config.language.feed);

module.exports = async () => {
    let mid = $('#v_upinfo .u-face>a')
        .attr('href')
        .match(/\d+/)[0];
    rssElem.href(`${rssPrefix}${mid}`);
    let task = setInterval(() => {
        if ($('.more-ops-list').length) {
            $('#v_upinfo .btn').prepend(rssElem);
            clearInterval(task);
        }
    }, 500);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

const config = __webpack_require__(9);
const rssPrefix = `${config.rsshub}/bilibili/user/dynamic/`;

const rssElem = $('<a\>').feedInit();
rssElem.addClass('h-f-btn');
rssElem.attr('title', config.language.feed);
rssElem.text(config.language.feed);

module.exports = async (args) => {
    rssElem.href(`${rssPrefix}${args[1]}`);
    let task = setInterval(() => {
        let elem = $('.h-action .h-message');
        if (elem.length) {
            elem.after(rssElem);
            clearInterval(task);
        }
    }, 500);
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

const config = __webpack_require__(9);
const rssPrefix = `${config.rsshub}/bilibili/live/room/`;

const rssElem = $('<a\>').feedInit();
rssElem.addClass('p-absolute');
rssElem.attr('title', config.language.feed);
rssElem.text(config.language.feed);

module.exports = async (args) => {
    rssElem.href(`${rssPrefix}${args[1]}`);
    let task = setInterval(() => {
        let elem = $('.room-info-down-row .attention-btn-ctnr');
        if (elem.length) {
            elem.after(rssElem);
            clearInterval(task);
        }
    }, 500);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "#v_upinfo #rss-helper{padding-left:16px;padding-right:16px;margin-left:12px;margin-top:0}.room-info-down-row #rss-helper{height:22px;line-height:22px;padding-left:16px;padding-right:16px;background-color:#23ade5;color:#fff!important;border-radius:4px;right:130px;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);-webkit-transition:125ms ease-in-out;transition:125ms ease-in-out}.room-info-down-row #rss-helper:hover{background-color:#23b9f1}", ""]);

// exports


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

const Route = __webpack_require__(4);

const Router = __webpack_require__(6);
const router = new Router();

router.push(new Route(/\/(?!\d+\/)\d+/, __webpack_require__(22)));

module.exports = async (args) => {
    router.load(args);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

const logger = __webpack_require__(2);
const config = __webpack_require__(9);
const rssPrefix = `${config.rsshub}/weibo/user/`;

const rssElem = $('<a\>').feedInit();
rssElem.addClass('W_btn_d');
rssElem.addClass('btn_34px');

rssElem.attr('title', config.language.feed);
rssElem.text(config.language.feed);

module.exports = async () => {
    rssElem.href(rssPrefix + $CONFIG.oid);
    let task = setInterval(() => {
        let elem = $('div.pf_opt > .opt_box');
        if (elem.length) {
            elem.append(rssElem);
            clearInterval(task);
        }
    }, 500);
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

const Route = __webpack_require__(4);
const logger = __webpack_require__(2);

const Router = __webpack_require__(6);
const router = new Router();

router.push(new Route(/member\.php\?id=\d+/, __webpack_require__(24)));
router.push(new Route(/member_illust\.php\?.*illust_id=\d+/, __webpack_require__(25)));

module.exports = async (args) => {
    router.load(args);
    GM_addStyle(__webpack_require__(26).toString());
    logger.debug(__webpack_require__(26).toString());
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

const config = __webpack_require__(9);
const rssPrefix = `${config.rsshub}/pixiv/user/`;

const rssElem = $('<a\>').feedInit();
rssElem.addClass('YryPnZn _30SjOFD');
rssElem.attr('title', config.language.feed);
rssElem.text(config.language.feed);

module.exports = async () => {
    rssElem.href(rssPrefix + Object.keys(globalInitData.preload.user)[0]);
    let task = setInterval(() => {
        let elem = $('div._3yalhqB');
        if (elem.length) {
            elem.append(rssElem);
            clearInterval(task);
        }
    }, 500);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

const config = __webpack_require__(9);
const rssPrefix = `${config.rsshub}/pixiv/user/`;

const rssElem = $('<a\>').feedInit();
rssElem.addClass('YryPnZn');
rssElem.attr('title', config.language.feed);
rssElem.text(config.language.feed);

module.exports = async () => {
    rssElem.href(rssPrefix + Object.keys(globalInitData.preload.user)[0]);
    let task = setInterval(() => {
        let elem = $('.sc-dRCTWM.cRuxjo');
        if (elem.length) {
            elem.append(rssElem);
            clearInterval(task);
        }
    }, 500);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "#rss-helper{text-decoration:none}._3yalhqB{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;width:auto}._3yalhqB #rss-helper{margin-left:12px}.sc-dRCTWM.cRuxjo #rss-helper{margin-top:12px}", ""]);

// exports


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

const config = __webpack_require__(9);
const logger = __webpack_require__(2);

const rssElem = $('<a\>').feedInit();
rssElem.attr('target', '_blank');
rssElem.append('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><circle cx="6.18" cy="17.82" r="2.18"/><path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z"/></svg>');

const rssElemText = $('<span\>');
rssElemText.text(config.language.feed);
rssElem.append(rssElemText);

module.exports = async () => {
    const types = [
        'application/rss+xml',
        'application/atom+xml',
        'application/rdf+xml',
        'application/rss',
        'application/atom',
        'application/rdf',
        'text/rss+xml',
        'text/atom+xml',
        'text/rdf+xml',
        'text/rss',
        'text/atom',
        'text/rdf'
    ];
    let feeds = [];
    $(() => {
        $('link[type]').each(function() {
            if (types.includes($(this).attr('type'))) {
                let feed = {
                    href: $(this).attr('href'),
                    name: $(this).attr('title')
                };
                feeds.push(feed);
            }
        });
        logger.debug(feeds);
        rssElem.href(feeds[0].href);
        rssElemText.text(feeds[0].name);
        $('body').append(rssElem);
        rssElem.mouseenter(() => {
            rssElem.css('width', rssElemText.width() + 30 + 8);
        });
        rssElem.mouseleave(() => {
            rssElem.css('width', 30);
        });
    });
    GM_addStyle(__webpack_require__(28).toString());
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "#user-feed{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:fixed;top:72px;z-index:12000;right:0;font-size:14px;border-bottom-left-radius:4px;border-top-left-radius:4px;background-color:#f8f8f8;padding:3px 4px;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);-webkit-transition:125ms ease-in-out;transition:125ms ease-in-out;color:#212121!important;overflow:hidden;line-height:24px;width:30px;box-sizing:border-box}#user-feed svg{min-width:24px}#user-feed span{margin-left:4px;white-space:nowrap;opacity:0;-webkit-transition:125ms ease-in-out;transition:125ms ease-in-out}#user-feed:hover{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}#user-feed:hover span{opacity:1}", ""]);

// exports


/***/ })
/******/ ]);