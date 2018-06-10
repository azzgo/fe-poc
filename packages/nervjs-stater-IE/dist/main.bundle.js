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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(12);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Children", function() { return Children; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PureComponent", function() { return PureComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement$2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nextTick", function() { return nextTick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findDOMNode", function() { return findDOMNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidElement", function() { return isValidElement$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unmountComponentAtNode", function() { return unmountComponentAtNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPortal", function() { return createPortal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unstable_renderSubtreeIntoContainer", function() { return unstable_renderSubtreeIntoContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hydrate", function() { return hydrate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFactory", function() { return createFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unstable_batchedUpdates", function() { return unstable_batchedUpdates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropTypes", function() { return PropTypes; });
// tslint:disable-next-line
var global = function () {
    var local;
    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('global object is unavailable in this environment');
        }
    }
    return local;
}();
var isBrowser = typeof window !== 'undefined';
// tslint:disable-next-line:no-empty
function noop() {}
var fakeDoc = {
    createElement: noop,
    createElementNS: noop,
    createTextNode: noop
};
var doc = isBrowser ? document : fakeDoc;

function isNumber(arg) {
    return typeof arg === 'number';
}
var isSupportSVG = isFunction(doc.createAttributeNS);
function isString(arg) {
    return typeof arg === 'string';
}
function isFunction(arg) {
    return typeof arg === 'function';
}
function isBoolean(arg) {
    return arg === true || arg === false;
}
var isArray = Array.isArray;
function isUndefined(o) {
    return o === undefined;
}

var canUsePromise = 'Promise' in global;
var resolved;
if (canUsePromise) {
    resolved = Promise.resolve();
}
var nextTick = function (fn) {
    var args = [],
        len = arguments.length - 1;
    while (len-- > 0) args[len] = arguments[len + 1];

    fn = isFunction(fn) ? fn.bind.apply(fn, [null].concat(args)) : fn;
    if (canUsePromise) {
        return resolved.then(fn);
    }
    var timerFunc = 'requestAnimationFrame' in global ? requestAnimationFrame : setTimeout;
    timerFunc(fn);
};

/* istanbul ignore next */
// tslint:disable-next-line
Object.is = Object.is || function (x, y) {
    if (x === y) {
        return x !== 0 || 1 / x === 1 / y;
    }
    return x !== x && y !== y;
};
function shallowEqual(obj1, obj2) {
    if (obj1 === null || obj2 === null) {
        return false;
    }
    if (Object.is(obj1, obj2)) {
        return true;
    }
    var obj1Keys = obj1 ? Object.keys(obj1) : [];
    var obj2Keys = obj2 ? Object.keys(obj2) : [];
    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }
    for (var i = 0; i < obj1Keys.length; i++) {
        var obj1KeyItem = obj1Keys[i];
        if (!obj2.hasOwnProperty(obj1KeyItem) || !Object.is(obj1[obj1KeyItem], obj2[obj1KeyItem])) {
            return false;
        }
    }
    return true;
}

var SimpleMap = function SimpleMap() {
    this.cache = [];
    this.size = 0;
};
SimpleMap.prototype.set = function set(k, v) {
    var this$1 = this;

    var len = this.cache.length;
    if (!len) {
        this.cache.push({ k: k, v: v });
        this.size += 1;
        return;
    }
    for (var i = 0; i < len; i++) {
        var item = this$1.cache[i];
        if (item.k === k) {
            item.v = v;
            return;
        }
    }
    this.cache.push({ k: k, v: v });
    this.size += 1;
};
SimpleMap.prototype.get = function get(k) {
    var this$1 = this;

    var len = this.cache.length;
    if (!len) {
        return;
    }
    for (var i = 0; i < len; i++) {
        var item = this$1.cache[i];
        if (item.k === k) {
            return item.v;
        }
    }
};
SimpleMap.prototype.has = function has(k) {
    var this$1 = this;

    var len = this.cache.length;
    if (!len) {
        return false;
    }
    for (var i = 0; i < len; i++) {
        var item = this$1.cache[i];
        if (item.k === k) {
            return true;
        }
    }
    return false;
};
SimpleMap.prototype['delete'] = function delete$1(k) {
    var this$1 = this;

    var len = this.cache.length;
    for (var i = 0; i < len; i++) {
        var item = this$1.cache[i];
        if (item.k === k) {
            this$1.cache.splice(i, 1);
            this$1.size -= 1;
            return true;
        }
    }
    return false;
};
SimpleMap.prototype.clear = function clear() {
    var this$1 = this;

    var len = this.cache.length;
    this.size = 0;
    if (!len) {
        return;
    }
    while (len) {
        this$1.cache.pop();
        len--;
    }
};
var MapClass = 'Map' in global ? Map : SimpleMap;

function isAttrAnEvent(attr) {
    return attr[0] === 'o' && attr[1] === 'n';
}
function extend(source, from) {
    if (!from) {
        return source;
    }
    for (var key in from) {
        if (from.hasOwnProperty(key)) {
            source[key] = from[key];
        }
    }
    return source;
}
function clone(obj) {
    return extend({}, obj);
}

var Current = {
    current: null
};

var EMPTY_CHILDREN = [];
var EMPTY_OBJ = {};
function isNullOrUndef(o) {
    return o === undefined || o === null;
}
function isInvalid(o) {
    return isNullOrUndef(o) || o === true || o === false;
}
function isVNode(node) {
    return !isNullOrUndef(node) && node.vtype === 2 /* Node */;
}
function isVText(node) {
    return !isNullOrUndef(node) && node.vtype === 1 /* Text */;
}
function isComponent(instance) {
    return !isInvalid(instance) && instance.isReactComponent === EMPTY_OBJ;
}
function isPortal(vtype, node) {
    return (vtype & 32 /* Portal */) > 0;
}
function isComposite(node) {
    return !isNullOrUndef(node) && node.vtype === 4 /* Composite */;
}
function isValidElement(node) {
    return !isNullOrUndef(node) && node.vtype;
}
// tslint:disable-next-line:no-empty
function noop$1() {}
// typescript will compile the enum's value for us.
// eg.
// Composite = 1 << 2  => Composite = 4
var VType;
(function (VType) {
    VType[VType["Text"] = 1] = "Text";
    VType[VType["Node"] = 2] = "Node";
    VType[VType["Composite"] = 4] = "Composite";
    VType[VType["Stateless"] = 8] = "Stateless";
    VType[VType["Void"] = 16] = "Void";
    VType[VType["Portal"] = 32] = "Portal";
})(VType || (VType = {}));

var Ref = {
    update: function update(lastVnode, nextVnode, domNode) {
        var prevRef = lastVnode != null && lastVnode.ref;
        var nextRef = nextVnode != null && nextVnode.ref;
        if (prevRef !== nextRef) {
            this.detach(lastVnode, prevRef, lastVnode.dom);
            this.attach(nextVnode, nextRef, domNode);
        }
    },
    attach: function attach(vnode, ref, domNode) {
        var node = isComposite(vnode) ? vnode.component : domNode;
        if (isFunction(ref)) {
            ref(node);
        } else if (isString(ref)) {
            var inst = vnode._owner;
            if (inst && isFunction(inst.render)) {
                inst.refs[ref] = node;
            }
        }
    },
    detach: function detach(vnode, ref, domNode) {
        var node = isComposite(vnode) ? vnode.component : domNode;
        if (isFunction(ref)) {
            ref(null);
        } else if (isString(ref)) {
            var inst = vnode._owner;
            if (inst.refs[ref] === node && isFunction(inst.render)) {
                delete inst.refs[ref];
            }
        }
    }
};

var ONINPUT = 'oninput';
var ONPROPERTYCHANGE = 'onpropertychange';
var isiOS = isBrowser && !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var delegatedEvents = new MapClass();
var unbubbleEvents = {
    onmousemove: 1,
    ontouchmove: 1,
    onmouseleave: 1,
    onmouseenter: 1,
    onload: 1,
    onunload: 1,
    onscroll: 1,
    onfocus: 1,
    onblur: 1,
    onrowexit: 1,
    onbeforeunload: 1,
    onstop: 1,
    ondragdrop: 1,
    ondragenter: 1,
    ondragexit: 1,
    ondraggesture: 1,
    ondragover: 1,
    oncontextmenu: 1,
    onerror: 1,
    onabort: 1,
    oncanplay: 1,
    oncanplaythrough: 1,
    ondurationchange: 1,
    onemptied: 1,
    onended: 1,
    onloadeddata: 1,
    onloadedmetadata: 1,
    onloadstart: 1,
    onencrypted: 1,
    onpause: 1,
    onplay: 1,
    onplaying: 1,
    onprogress: 1,
    onratechange: 1,
    onseeking: 1,
    onseeked: 1,
    onstalled: 1,
    onsuspend: 1,
    ontimeupdate: 1,
    onvolumechange: 1,
    onwaiting: 1
};
unbubbleEvents[ONPROPERTYCHANGE] = 1;
var bindFocus = false;
/* istanbul ignore next */
if (isBrowser && navigator.userAgent.indexOf('MSIE 9') >= 0) {
    var elements = [];
    var values = [];
    doc.addEventListener('selectionchange', function () {
        var el = doc.activeElement;
        if (detectCanUseOnInputNode(el)) {
            var index = elements.indexOf(el);
            var element = elements[index] || elements.push(el);
            if (element.value !== values[index]) {
                var ev = doc.createEvent('CustomEvent');
                ev.initCustomEvent('input', true, true, undefined);
                values[index] = element.value;
                el.dispatchEvent(ev);
            }
        }
    });
}
if (typeof Event !== 'undefined' && !Event.prototype.persist) {
    // tslint:disable-next-line:no-empty
    Event.prototype.persist = noop$1;
}
function attachEvent(domNode, eventName, handler) {
    eventName = fixEvent(domNode, eventName);
    /* istanbul ignore next */
    if (eventName === ONPROPERTYCHANGE) {
        processOnPropertyChangeEvent(domNode, handler);
        return;
    }
    var delegatedRoots = delegatedEvents.get(eventName);
    if (unbubbleEvents[eventName] === 1) {
        if (!delegatedRoots) {
            delegatedRoots = new MapClass();
        }
        var event = attachEventToNode(domNode, eventName, delegatedRoots);
        delegatedEvents.set(eventName, delegatedRoots);
        if (isFunction(handler)) {
            delegatedRoots.set(domNode, {
                eventHandler: handler,
                event: event
            });
        }
    } else {
        if (!delegatedRoots) {
            delegatedRoots = {
                items: new MapClass()
            };
            delegatedRoots.event = attachEventToDocument(doc, eventName, delegatedRoots);
            delegatedEvents.set(eventName, delegatedRoots);
        }
        if (isFunction(handler)) {
            if (isiOS) {
                domNode.onclick = noop$1;
            }
            delegatedRoots.items.set(domNode, handler);
        }
    }
}
function detachEvent(domNode, eventName, handler) {
    eventName = fixEvent(domNode, eventName);
    if (eventName === ONPROPERTYCHANGE) {
        return;
    }
    var delegatedRoots = delegatedEvents.get(eventName);
    if (unbubbleEvents[eventName] === 1 && delegatedRoots) {
        var event = delegatedRoots.get(domNode);
        if (event) {
            domNode.removeEventListener(parseEventName(eventName), event.event, false);
            /* istanbul ignore next */
            var delegatedRootsSize = delegatedRoots.size;
            if (delegatedRoots['delete'](domNode) && delegatedRootsSize === 0) {
                delegatedEvents['delete'](eventName);
            }
        }
    } else if (delegatedRoots && delegatedRoots.items) {
        var items = delegatedRoots.items;
        if (items['delete'](domNode) && items.size === 0) {
            doc.removeEventListener(parseEventName(eventName), delegatedRoots.event, false);
            delegatedEvents['delete'](eventName);
        }
    }
}
var propertyChangeActiveElement;
var propertyChangeActiveElementValue;
var propertyChangeActiveElementValueProp;
var propertyChangeActiveHandlers = {};
/* istanbul ignore next */
function propertyChangeHandler(event) {
    if (event.propertyName !== 'value') {
        return;
    }
    var target = event.target || event.srcElement;
    var val = target.value;
    if (val === propertyChangeActiveElementValue) {
        return;
    }
    propertyChangeActiveElementValue = val;
    var handler = propertyChangeActiveHandlers[target.name];
    if (isFunction(handler)) {
        handler.call(target, event);
    }
}
/* istanbul ignore next */
function processOnPropertyChangeEvent(node, handler) {
    propertyChangeActiveHandlers[node.name] = handler;
    if (!bindFocus) {
        // bindFocus = true
        node.addEventListener('focusin', function () {
            unbindOnPropertyChange();
            bindOnPropertyChange(node);
        }, false);
        node.addEventListener('focusout', unbindOnPropertyChange, false);
    }
}
/* istanbul ignore next */
function bindOnPropertyChange(node) {
    propertyChangeActiveElement = node;
    propertyChangeActiveElementValue = node.value;
    propertyChangeActiveElementValueProp = Object.getOwnPropertyDescriptor(node.constructor.prototype, 'value');
    Object.defineProperty(propertyChangeActiveElement, 'value', {
        get: function get() {
            return propertyChangeActiveElementValueProp.get.call(this);
        },
        set: function set(val) {
            propertyChangeActiveElementValue = val;
            propertyChangeActiveElementValueProp.set.call(this, val);
        }
    });
    propertyChangeActiveElement.addEventListener('propertychange', propertyChangeHandler, false);
}
/* istanbul ignore next */
function unbindOnPropertyChange() {
    if (!propertyChangeActiveElement) {
        return;
    }
    delete propertyChangeActiveElement.value;
    propertyChangeActiveElement.removeEventListener('propertychange', propertyChangeHandler, false);
    propertyChangeActiveElement = null;
    propertyChangeActiveElementValue = null;
    propertyChangeActiveElementValueProp = null;
}
function detectCanUseOnInputNode(node) {
    var nodeName = node.nodeName && node.nodeName.toLowerCase();
    var type = node.type;
    return nodeName === 'input' && /text|password/.test(type) || nodeName === 'textarea';
}
function fixEvent(node, eventName) {
    if (eventName === 'onDoubleClick') {
        eventName = 'ondblclick';
    } else if (eventName === 'onTouchTap') {
        eventName = 'onclick';
        // tslint:disable-next-line:prefer-conditional-expression
    } else if (eventName === 'onChange' && detectCanUseOnInputNode(node)) {
        eventName = ONINPUT in window ? ONINPUT : ONPROPERTYCHANGE;
    } else {
        eventName = eventName.toLowerCase();
    }
    return eventName;
}
function parseEventName(name) {
    return name.substr(2);
}
/* istanbul ignore next */
function stopPropagation() {
    this.cancelBubble = true;
    this.stopImmediatePropagation();
}
function dispatchEvent(event, target, items, count, eventData) {
    var eventsToTrigger = items.get(target);
    if (eventsToTrigger) {
        count--;
        eventData.currentTarget = target;
        // for React synthetic event compatibility
        Object.defineProperties(event, {
            nativeEvent: {
                value: event
            }
        });
        eventsToTrigger(event);
        if (event.cancelBubble) {
            return;
        }
    }
    if (count > 0) {
        var parentDom = target.parentNode;
        if (parentDom === null || event.type === 'click' && parentDom.nodeType === 1 && parentDom.disabled) {
            return;
        }
        dispatchEvent(event, parentDom, items, count, eventData);
    }
}
function attachEventToDocument(d, eventName, delegatedRoots) {
    var eventHandler = function (event) {
        var items = delegatedRoots.items;
        var count = items.size;
        if (count > 0) {
            var eventData = {
                currentTarget: event.target
            };
            /* istanbul ignore next */
            try {
                Object.defineProperties(event, {
                    currentTarget: {
                        configurable: true,
                        get: function get() {
                            return eventData.currentTarget;
                        }
                    },
                    stopPropagation: {
                        value: stopPropagation
                    }
                });
            } catch (error) {
                // some browsers crashed
                // see: https://stackoverflow.com/questions/44052813/why-cannot-redefine-property
            }
            dispatchEvent(event, event.target, delegatedRoots.items, count, eventData);
        }
    };
    d.addEventListener(parseEventName(eventName), eventHandler, false);
    return eventHandler;
}
function attachEventToNode(node, eventName, delegatedRoots) {
    var eventHandler = function (event) {
        var eventToTrigger = delegatedRoots.get(node);
        if (eventToTrigger && eventToTrigger.eventHandler) {
            var eventData = {
                currentTarget: node
            };
            /* istanbul ignore next */
            Object.defineProperties(event, {
                currentTarget: {
                    configurable: true,
                    get: function get() {
                        return eventData.currentTarget;
                    }
                }
            });
            eventToTrigger.eventHandler(event);
        }
    };
    node.addEventListener(parseEventName(eventName), eventHandler, false);
    return eventHandler;
}

var options = {
    afterMount: noop$1,
    afterUpdate: noop$1,
    beforeUnmount: noop$1,
    roots: [],
    debug: false
};

function unmountChildren(children, parentDom) {
    if (isArray(children)) {
        for (var i = 0, len = children.length; i < len; i++) {
            unmount(children[i], parentDom);
        }
    } else {
        unmount(children, parentDom);
    }
}
function unmount(vnode, parentDom) {
    if (isInvalid(vnode)) {
        return;
    }
    var vtype = vnode.vtype;
    // Bitwise operators for better performance
    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
    var dom = vnode.dom;
    if ((vtype & (4 /* Composite */ | 8 /* Stateless */)) > 0) {
        options.beforeUnmount(vnode);
        vnode.destroy();
    } else if ((vtype & 2 /* Node */) > 0) {
        var props = vnode.props;
        var children = vnode.children;
        var ref = vnode.ref;
        unmountChildren(children);
        for (var propName in props) {
            if (isAttrAnEvent(propName)) {
                detachEvent(dom, propName, props[propName]);
            }
        }
        if (ref !== null) {
            Ref.detach(vnode, ref, dom);
        }
    } else if (vtype & 32 /* Portal */) {
            unmountChildren(vnode.children, vnode.type);
        }
    if (!isNullOrUndef(parentDom) && !isNullOrUndef(dom)) {
        parentDom.removeChild(dom);
    }
    // vnode.dom = null
}

var NS = {
    ev: 'http://www.w3.org/2001/xml-events',
    xlink: 'http://www.w3.org/1999/xlink',
    xml: 'http://www.w3.org/XML/1998/namespace'
};
var ATTRS = {
    accentHeight: 'accent-height',
    accumulate: 0,
    additive: 0,
    alignmentBaseline: 'alignment-baseline',
    allowReorder: 'allowReorder',
    alphabetic: 0,
    amplitude: 0,
    arabicForm: 'arabic-form',
    ascent: 0,
    attributeName: 'attributeName',
    attributeType: 'attributeType',
    autoReverse: 'autoReverse',
    azimuth: 0,
    baseFrequency: 'baseFrequency',
    baseProfile: 'baseProfile',
    baselineShift: 'baseline-shift',
    bbox: 0,
    begin: 0,
    bias: 0,
    by: 0,
    calcMode: 'calcMode',
    capHeight: 'cap-height',
    clip: 0,
    clipPath: 'clip-path',
    clipRule: 'clip-rule',
    clipPathUnits: 'clipPathUnits',
    colorInterpolation: 'color-interpolation',
    colorInterpolationFilters: 'color-interpolation-filters',
    colorProfile: 'color-profile',
    colorRendering: 'color-rendering',
    contentScriptType: 'contentScriptType',
    contentStyleType: 'contentStyleType',
    cursor: 0,
    cx: 0,
    cy: 0,
    d: 0,
    decelerate: 0,
    descent: 0,
    diffuseConstant: 'diffuseConstant',
    direction: 0,
    display: 0,
    divisor: 0,
    dominantBaseline: 'dominant-baseline',
    dur: 0,
    dx: 0,
    dy: 0,
    edgeMode: 'edgeMode',
    elevation: 0,
    enableBackground: 'enable-background',
    end: 0,
    evEvent: 'ev:event',
    exponent: 0,
    externalResourcesRequired: 'externalResourcesRequired',
    fill: 0,
    fillOpacity: 'fill-opacity',
    fillRule: 'fill-rule',
    filter: 0,
    filterRes: 'filterRes',
    filterUnits: 'filterUnits',
    floodColor: 'flood-color',
    floodOpacity: 'flood-opacity',
    focusable: 0,
    fontFamily: 'font-family',
    fontSize: 'font-size',
    fontSizeAdjust: 'font-size-adjust',
    fontStretch: 'font-stretch',
    fontStyle: 'font-style',
    fontVariant: 'font-variant',
    fontWeight: 'font-weight',
    format: 0,
    from: 0,
    fx: 0,
    fy: 0,
    g1: 0,
    g2: 0,
    glyphName: 'glyph-name',
    glyphOrientationHorizontal: 'glyph-orientation-horizontal',
    glyphOrientationVertical: 'glyph-orientation-vertical',
    glyphRef: 'glyphRef',
    gradientTransform: 'gradientTransform',
    gradientUnits: 'gradientUnits',
    hanging: 0,
    horizAdvX: 'horiz-adv-x',
    horizOriginX: 'horiz-origin-x',
    ideographic: 0,
    imageRendering: 'image-rendering',
    'in': 0,
    in2: 0,
    intercept: 0,
    k: 0,
    k1: 0,
    k2: 0,
    k3: 0,
    k4: 0,
    kernelMatrix: 'kernelMatrix',
    kernelUnitLength: 'kernelUnitLength',
    kerning: 0,
    keyPoints: 'keyPoints',
    keySplines: 'keySplines',
    keyTimes: 'keyTimes',
    lengthAdjust: 'lengthAdjust',
    letterSpacing: 'letter-spacing',
    lightingColor: 'lighting-color',
    limitingConeAngle: 'limitingConeAngle',
    local: 0,
    markerEnd: 'marker-end',
    markerMid: 'marker-mid',
    markerStart: 'marker-start',
    markerHeight: 'markerHeight',
    markerUnits: 'markerUnits',
    markerWidth: 'markerWidth',
    mask: 0,
    maskContentUnits: 'maskContentUnits',
    maskUnits: 'maskUnits',
    mathematical: 0,
    mode: 0,
    numOctaves: 'numOctaves',
    offset: 0,
    opacity: 0,
    operator: 0,
    order: 0,
    orient: 0,
    orientation: 0,
    origin: 0,
    overflow: 0,
    overlinePosition: 'overline-position',
    overlineThickness: 'overline-thickness',
    paintOrder: 'paint-order',
    panose1: 'panose-1',
    pathLength: 'pathLength',
    patternContentUnits: 'patternContentUnits',
    patternTransform: 'patternTransform',
    patternUnits: 'patternUnits',
    pointerEvents: 'pointer-events',
    points: 0,
    pointsAtX: 'pointsAtX',
    pointsAtY: 'pointsAtY',
    pointsAtZ: 'pointsAtZ',
    preserveAlpha: 'preserveAlpha',
    preserveAspectRatio: 'preserveAspectRatio',
    primitiveUnits: 'primitiveUnits',
    r: 0,
    radius: 0,
    refX: 'refX',
    refY: 'refY',
    renderingIntent: 'rendering-intent',
    repeatCount: 'repeatCount',
    repeatDur: 'repeatDur',
    requiredExtensions: 'requiredExtensions',
    requiredFeatures: 'requiredFeatures',
    restart: 0,
    result: 0,
    rotate: 0,
    rx: 0,
    ry: 0,
    scale: 0,
    seed: 0,
    shapeRendering: 'shape-rendering',
    slope: 0,
    spacing: 0,
    specularConstant: 'specularConstant',
    specularExponent: 'specularExponent',
    speed: 0,
    spreadMethod: 'spreadMethod',
    startOffset: 'startOffset',
    stdDeviation: 'stdDeviation',
    stemh: 0,
    stemv: 0,
    stitchTiles: 'stitchTiles',
    stopColor: 'stop-color',
    stopOpacity: 'stop-opacity',
    strikethroughPosition: 'strikethrough-position',
    strikethroughThickness: 'strikethrough-thickness',
    string: 0,
    stroke: 0,
    strokeDasharray: 'stroke-dasharray',
    strokeDashoffset: 'stroke-dashoffset',
    strokeLinecap: 'stroke-linecap',
    strokeLinejoin: 'stroke-linejoin',
    strokeMiterlimit: 'stroke-miterlimit',
    strokeOpacity: 'stroke-opacity',
    strokeWidth: 'stroke-width',
    surfaceScale: 'surfaceScale',
    systemLanguage: 'systemLanguage',
    tableValues: 'tableValues',
    targetX: 'targetX',
    targetY: 'targetY',
    textAnchor: 'text-anchor',
    textDecoration: 'text-decoration',
    textRendering: 'text-rendering',
    textLength: 'textLength',
    to: 0,
    transform: 0,
    u1: 0,
    u2: 0,
    underlinePosition: 'underline-position',
    underlineThickness: 'underline-thickness',
    unicode: 0,
    unicodeBidi: 'unicode-bidi',
    unicodeRange: 'unicode-range',
    unitsPerEm: 'units-per-em',
    vAlphabetic: 'v-alphabetic',
    vHanging: 'v-hanging',
    vIdeographic: 'v-ideographic',
    vMathematical: 'v-mathematical',
    values: 0,
    vectorEffect: 'vector-effect',
    version: 0,
    vertAdvY: 'vert-adv-y',
    vertOriginX: 'vert-origin-x',
    vertOriginY: 'vert-origin-y',
    viewBox: 'viewBox',
    viewTarget: 'viewTarget',
    visibility: 0,
    widths: 0,
    wordSpacing: 'word-spacing',
    writingMode: 'writing-mode',
    x: 0,
    xHeight: 'x-height',
    x1: 0,
    x2: 0,
    xChannelSelector: 'xChannelSelector',
    xlinkActuate: 'xlink:actuate',
    xlinkArcrole: 'xlink:arcrole',
    xlinkHref: 'xlink:href',
    xlinkRole: 'xlink:role',
    xlinkShow: 'xlink:show',
    xlinkTitle: 'xlink:title',
    xlinkType: 'xlink:type',
    xmlBase: 'xml:base',
    xmlId: 'xml:id',
    xmlns: 0,
    xmlnsXlink: 'xmlns:xlink',
    xmlLang: 'xml:lang',
    xmlSpace: 'xml:space',
    y: 0,
    y1: 0,
    y2: 0,
    yChannelSelector: 'yChannelSelector',
    z: 0,
    zoomAndPan: 'zoomAndPan'
};
var SVGPropertyConfig = {
    Properties: {},
    DOMAttributeNamespaces: {
        'ev:event': NS.ev,
        'xlink:actuate': NS.xlink,
        'xlink:arcrole': NS.xlink,
        'xlink:href': NS.xlink,
        'xlink:role': NS.xlink,
        'xlink:show': NS.xlink,
        'xlink:title': NS.xlink,
        'xlink:type': NS.xlink,
        'xml:base': NS.xml,
        'xml:id': NS.xml,
        'xml:lang': NS.xml,
        'xml:space': NS.xml
    },
    DOMAttributeNames: {}
};
Object.keys(ATTRS).forEach(function (key) {
    SVGPropertyConfig.Properties[key] = 0;
    if (ATTRS[key]) {
        SVGPropertyConfig.DOMAttributeNames[key] = ATTRS[key];
    }
});

/* tslint:disable: no-empty*/
function patch(lastVnode, nextVnode, parentNode, context, isSvg) {
    var lastDom = lastVnode.dom;
    var newDom;
    if (isSameVNode(lastVnode, nextVnode)) {
        var vtype = nextVnode.vtype;
        if (vtype & 2 /* Node */) {
                isSvg = isNullOrUndef(isSvg) ? lastVnode.isSvg : isSvg;
                if (isSvg) {
                    nextVnode.isSvg = isSvg;
                }
                patchProps(lastDom, nextVnode.props, lastVnode.props, lastVnode, isSvg);
                patchChildren(lastDom, lastVnode.children, nextVnode.children, context, isSvg);
                if (nextVnode.ref !== null) {
                    Ref.update(lastVnode, nextVnode, lastDom);
                }
                newDom = lastDom;
            } else if ((vtype & (4 /* Composite */ | 8 /* Stateless */)) > 0) {
            newDom = nextVnode.update(lastVnode, nextVnode, context);
            options.afterUpdate(nextVnode);
        } else if (vtype & 1 /* Text */) {
                return patchVText(lastVnode, nextVnode);
            } else if (vtype & 32 /* Portal */) {
                patchChildren(lastVnode.type, lastVnode.children, nextVnode.children, context, isSvg);
            }
        // @TODO: test case
        nextVnode.dom = newDom || lastDom;
    } else {
        unmount(lastVnode);
        newDom = createElement(nextVnode, isSvg, context);
        if (nextVnode !== null) {
            nextVnode.dom = newDom;
        }
        if (parentNode !== null) {
            parentNode.replaceChild(newDom, lastDom);
        }
    }
    return newDom;
}
function patchArrayChildren(parentDom, lastChildren, nextChildren, context, isSvg) {
    var lastLength = lastChildren.length;
    var nextLength = nextChildren.length;
    if (lastLength === 0) {
        if (nextLength > 0) {
            for (var i = 0; i < nextLength; i++) {
                mountChild(nextChildren[i], parentDom, context, isSvg);
            }
        }
    } else if (nextLength === 0) {
        unmountChildren(lastChildren);
        parentDom.textContent = '';
    } else {
        if (isKeyed(lastChildren, nextChildren)) {
            patchKeyedChildren(lastChildren, nextChildren, parentDom, context, isSvg, lastLength, nextLength);
        } else {
            patchNonKeyedChildren(parentDom, lastChildren, nextChildren, context, isSvg, lastLength, nextLength);
        }
    }
}
function patchChildren(parentDom, lastChildren, nextChildren, context, isSvg) {
    // @TODO: is a better way to compatible with react-router?
    // if (lastChildren === nextChildren) {
    //   return
    // }
    var lastChildrenIsArray = isArray(lastChildren);
    var nextChildrenIsArray = isArray(nextChildren);
    if (lastChildrenIsArray && nextChildrenIsArray) {
        patchArrayChildren(parentDom, lastChildren, nextChildren, context, isSvg);
    } else if (!lastChildrenIsArray && !nextChildrenIsArray) {
        patch(lastChildren, nextChildren, parentDom, context, isSvg);
    } else if (lastChildrenIsArray && !nextChildrenIsArray) {
        patchArrayChildren(parentDom, lastChildren, [nextChildren], context, isSvg);
    } else if (!lastChildrenIsArray && nextChildrenIsArray) {
        patchArrayChildren(parentDom, [lastChildren], nextChildren, context, isSvg);
    }
}
function patchNonKeyedChildren(parentDom, lastChildren, nextChildren, context, isSvg, lastLength, nextLength) {
    var minLength = Math.min(lastLength, nextLength);
    var i = 0;
    while (i < minLength) {
        patch(lastChildren[i], nextChildren[i], parentDom, context, isSvg);
        i++;
    }
    if (lastLength < nextLength) {
        for (i = minLength; i < nextLength; i++) {
            if (parentDom !== null) {
                parentDom.appendChild(createElement(nextChildren[i], isSvg, context));
            }
        }
    } else if (lastLength > nextLength) {
        for (i = minLength; i < lastLength; i++) {
            unmount(lastChildren[i], parentDom);
        }
    }
}
/**
 *
 * Virtual DOM patching algorithm based on ivi by
 * Boris Kaul (@localvoid)
 * Licensed under the MIT License
 * https://github.com/ivijs/ivi/blob/master/LICENSE
 *
 */
function patchKeyedChildren(a, b, dom, context, isSvg, aLength, bLength) {
    var aEnd = aLength - 1;
    var bEnd = bLength - 1;
    var aStart = 0;
    var bStart = 0;
    var i;
    var j;
    var aNode;
    var bNode;
    var nextNode;
    var nextPos;
    var node;
    var aStartNode = a[aStart];
    var bStartNode = b[bStart];
    var aEndNode = a[aEnd];
    var bEndNode = b[bEnd];
    // Step 1
    // tslint:disable-next-line
    outer: {
        // Sync nodes with the same key at the beginning.
        while (aStartNode.key === bStartNode.key) {
            patch(aStartNode, bStartNode, dom, context, isSvg);
            aStart++;
            bStart++;
            if (aStart > aEnd || bStart > bEnd) {
                break outer;
            }
            aStartNode = a[aStart];
            bStartNode = b[bStart];
        }
        // Sync nodes with the same key at the end.
        while (aEndNode.key === bEndNode.key) {
            patch(aEndNode, bEndNode, dom, context, isSvg);
            aEnd--;
            bEnd--;
            if (aStart > aEnd || bStart > bEnd) {
                break outer;
            }
            aEndNode = a[aEnd];
            bEndNode = b[bEnd];
        }
    }
    if (aStart > aEnd) {
        if (bStart <= bEnd) {
            nextPos = bEnd + 1;
            nextNode = nextPos < bLength ? b[nextPos].dom : null;
            while (bStart <= bEnd) {
                node = b[bStart];
                bStart++;
                attachNewNode(dom, createElement(node, isSvg, context), nextNode);
            }
        }
    } else if (bStart > bEnd) {
        while (aStart <= aEnd) {
            unmount(a[aStart++], dom);
        }
    } else {
        var aLeft = aEnd - aStart + 1;
        var bLeft = bEnd - bStart + 1;
        var sources = new Array(bLeft);
        // Mark all nodes as inserted.
        for (i = 0; i < bLeft; i++) {
            sources[i] = -1;
        }
        var moved = false;
        var pos = 0;
        var patched = 0;
        // When sizes are small, just loop them through
        if (bLeft <= 4 || aLeft * bLeft <= 16) {
            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];
                if (patched < bLeft) {
                    for (j = bStart; j <= bEnd; j++) {
                        bNode = b[j];
                        if (aNode.key === bNode.key) {
                            sources[j - bStart] = i;
                            if (pos > j) {
                                moved = true;
                            } else {
                                pos = j;
                            }
                            patch(aNode, bNode, dom, context, isSvg);
                            patched++;
                            a[i] = null;
                            break;
                        }
                    }
                }
            }
        } else {
            var keyIndex = new MapClass();
            for (i = bStart; i <= bEnd; i++) {
                keyIndex.set(b[i].key, i);
            }
            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];
                if (patched < bLeft) {
                    j = keyIndex.get(aNode.key);
                    if (j !== undefined) {
                        bNode = b[j];
                        sources[j - bStart] = i;
                        if (pos > j) {
                            moved = true;
                        } else {
                            pos = j;
                        }
                        patch(aNode, bNode, dom, context, isSvg);
                        patched++;
                        a[i] = null;
                    }
                }
            }
        }
        if (aLeft === aLength && patched === 0) {
            unmountChildren(a);
            dom.textContent = '';
            while (bStart < bLeft) {
                node = b[bStart];
                bStart++;
                attachNewNode(dom, createElement(node, isSvg, context), null);
            }
        } else {
            i = aLeft - patched;
            while (i > 0) {
                aNode = a[aStart++];
                if (aNode !== null) {
                    unmount(aNode, dom);
                    i--;
                }
            }
            if (moved) {
                var seq = lis(sources);
                j = seq.length - 1;
                for (i = bLeft - 1; i >= 0; i--) {
                    if (sources[i] === -1) {
                        pos = i + bStart;
                        node = b[pos];
                        nextPos = pos + 1;
                        attachNewNode(dom, createElement(node, isSvg, context), nextPos < bLength ? b[nextPos].dom : null);
                    } else {
                        if (j < 0 || i !== seq[j]) {
                            pos = i + bStart;
                            node = b[pos];
                            nextPos = pos + 1;
                            attachNewNode(dom, node.dom, nextPos < bLength ? b[nextPos].dom : null);
                        } else {
                            j--;
                        }
                    }
                }
            } else if (patched !== bLeft) {
                for (i = bLeft - 1; i >= 0; i--) {
                    if (sources[i] === -1) {
                        pos = i + bStart;
                        node = b[pos];
                        nextPos = pos + 1;
                        attachNewNode(dom, createElement(node, isSvg, context), nextPos < bLength ? b[nextPos].dom : null);
                    }
                }
            }
        }
    }
}
function attachNewNode(parentDom, newNode, nextNode) {
    if (isNullOrUndef(nextNode)) {
        parentDom.appendChild(newNode);
    } else {
        parentDom.insertBefore(newNode, nextNode);
    }
}
/**
 * Slightly modified Longest Increased Subsequence algorithm, it ignores items that have -1 value, they're representing
 * new items.
 *
 * http://en.wikipedia.org/wiki/Longest_increasing_subsequence
 *
 * @param a Array of numbers.
 * @returns Longest increasing subsequence.
 */
function lis(a) {
    var p = a.slice();
    var result = [];
    result.push(0);
    var u;
    var v;
    for (var i = 0, il = a.length; i < il; ++i) {
        if (a[i] === -1) {
            continue;
        }
        var j = result[result.length - 1];
        if (a[j] < a[i]) {
            p[i] = j;
            result.push(i);
            continue;
        }
        u = 0;
        v = result.length - 1;
        while (u < v) {
            var c = (u + v) / 2 | 0;
            if (a[result[c]] < a[i]) {
                u = c + 1;
            } else {
                v = c;
            }
        }
        if (a[i] < a[result[u]]) {
            if (u > 0) {
                p[i] = result[u - 1];
            }
            result[u] = i;
        }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
        result[u] = v;
        v = p[v];
    }
    return result;
}
function isKeyed(lastChildren, nextChildren) {
    return nextChildren.length > 0 && !isNullOrUndef(nextChildren[0]) && !isNullOrUndef(nextChildren[0].key) && lastChildren.length > 0 && !isNullOrUndef(lastChildren[0]) && !isNullOrUndef(lastChildren[0].key);
}
function isSameVNode(a, b) {
    if (isInvalid(a) || isInvalid(b) || isArray(a) || isArray(b)) {
        return false;
    }
    return a.type === b.type && a.vtype === b.vtype && a.key === b.key;
}
function patchVText(lastVNode, nextVNode) {
    var dom = lastVNode.dom;
    if (dom === null) {
        return;
    }
    var nextText = nextVNode.text;
    nextVNode.dom = dom;
    if (lastVNode.text !== nextText) {
        dom.nodeValue = nextText;
    }
    return dom;
}
var skipProps = {
    children: 1,
    key: 1,
    ref: 1,
    owner: 1
};
var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
function setStyle(domStyle, style, value) {
    if (isNullOrUndef(value) || isNumber(value) && isNaN(value)) {
        domStyle[style] = '';
        return;
    }
    if (style === 'float') {
        domStyle['cssFloat'] = value;
        domStyle['styleFloat'] = value;
        return;
    }
    domStyle[style] = !isNumber(value) || IS_NON_DIMENSIONAL.test(style) ? value : value + 'px';
}
function patchEvent(eventName, lastEvent, nextEvent, domNode) {
    if (lastEvent !== nextEvent) {
        if (isFunction(lastEvent)) {
            detachEvent(domNode, eventName, lastEvent);
        }
        attachEvent(domNode, eventName, nextEvent);
    }
}
function patchStyle(lastAttrValue, nextAttrValue, dom) {
    var domStyle = dom.style;
    var style;
    var value;
    if (isString(nextAttrValue)) {
        domStyle.cssText = nextAttrValue;
        return;
    }
    if (!isNullOrUndef(lastAttrValue) && !isString(lastAttrValue)) {
        for (style in nextAttrValue) {
            value = nextAttrValue[style];
            if (value !== lastAttrValue[style]) {
                setStyle(domStyle, style, value);
            }
        }
    } else {
        for (style in nextAttrValue) {
            value = nextAttrValue[style];
            setStyle(domStyle, style, value);
        }
    }
}
function patchProp(domNode, prop, lastValue, nextValue, lastVnode, isSvg) {
    // fix the value update for textarea/input
    if (lastValue !== nextValue || prop === 'value') {
        if (prop === 'className') {
            prop = 'class';
        }
        if (skipProps[prop] === 1) {
            return;
        } else if (prop === 'class' && !isSvg) {
            domNode.className = nextValue;
        } else if (prop === 'dangerouslySetInnerHTML') {
            var lastHtml = lastValue && lastValue.__html;
            var nextHtml = nextValue && nextValue.__html;
            if (lastHtml !== nextHtml) {
                if (!isNullOrUndef(nextHtml)) {
                    if (isValidElement(lastVnode) && lastVnode.children !== EMPTY_CHILDREN) {
                        unmountChildren(lastVnode.children);
                        lastVnode.children = [];
                    }
                    domNode.innerHTML = nextHtml;
                }
            }
        } else if (isAttrAnEvent(prop)) {
            patchEvent(prop, lastValue, nextValue, domNode);
        } else if (prop === 'style') {
            patchStyle(lastValue, nextValue, domNode);
        } else if (prop !== 'list' && prop !== 'type' && !isSvg && prop in domNode) {
            setProperty(domNode, prop, nextValue == null ? '' : nextValue);
            if (nextValue == null || nextValue === false) {
                domNode.removeAttribute(prop);
            }
        } else if (isNullOrUndef(nextValue) || nextValue === false) {
            domNode.removeAttribute(prop);
        } else {
            var namespace = SVGPropertyConfig.DOMAttributeNamespaces[prop];
            if (isSvg && namespace) {
                if (nextValue) {
                    domNode.setAttributeNS(namespace, prop, nextValue);
                } else {
                    var colonPosition = prop.indexOf(':');
                    var localName = colonPosition > -1 ? prop.substr(colonPosition + 1) : prop;
                    domNode.removeAttributeNS(namespace, localName);
                }
            } else {
                if (!isFunction(nextValue)) {
                    domNode.setAttribute(prop, nextValue);
                }
                // WARNING: Non-event attributes with function values:
                // https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html#changes-in-detail
            }
        }
    }
}
function setProperty(node, name, value) {
    try {
        node[name] = value;
    } catch (e) {}
}
function patchProps(domNode, nextProps, previousProps, lastVnode, isSvg) {
    for (var propName in previousProps) {
        var value = previousProps[propName];
        if (isNullOrUndef(nextProps[propName]) && !isNullOrUndef(value)) {
            if (isAttrAnEvent(propName)) {
                detachEvent(domNode, propName, value);
            } else if (propName === 'dangerouslySetInnerHTML') {
                domNode.textContent = '';
            } else if (propName === 'className') {
                domNode.removeAttribute('class');
            } else {
                domNode.removeAttribute(propName);
            }
        }
    }
    for (var propName$1 in nextProps) {
        patchProp(domNode, propName$1, previousProps[propName$1], nextProps[propName$1], lastVnode, isSvg);
    }
}

var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
function createElement(vnode, isSvg, parentContext, parentComponent) {
    var domNode;
    if (isValidElement(vnode)) {
        var vtype = vnode.vtype;
        if (vtype & (4 /* Composite */ | 8 /* Stateless */)) {
            domNode = vnode.init(parentContext, parentComponent);
            options.afterMount(vnode);
        } else if (vtype & 1 /* Text */) {
                domNode = doc.createTextNode(vnode.text);
                vnode.dom = domNode;
            } else if (vtype & 2 /* Node */) {
                domNode = mountVNode$1(vnode, isSvg, parentContext, parentComponent);
            } else if (vtype & 16 /* Void */) {
                domNode = vnode.dom = doc.createTextNode('');
            } else if (isPortal(vtype, vnode)) {
            vnode.type.appendChild(createElement(vnode.children, isSvg, parentContext, parentComponent));
            domNode = doc.createTextNode('');
        }
    } else if (isString(vnode) || isNumber(vnode)) {
        domNode = doc.createTextNode(vnode);
    } else if (isNullOrUndef(vnode) || isBoolean(vnode)) {
        domNode = doc.createTextNode('');
    } else if (isArray(vnode)) {
        domNode = doc.createDocumentFragment();
        vnode.forEach(function (child) {
            if (!isInvalid(child)) {
                var childNode = createElement(child, isSvg, parentContext, parentComponent);
                if (childNode) {
                    domNode.appendChild(childNode);
                }
            }
        });
    } else {
        throw new Error('Unsupported VNode.');
    }
    return domNode;
}
function mountVNode$1(vnode, isSvg, parentContext, parentComponent) {
    if (vnode.isSvg) {
        isSvg = true;
    } else if (vnode.type === 'svg') {
        isSvg = true;
        /* istanbul ignore next */
    } else if (!isSupportSVG) {
        isSvg = false;
    }
    if (isSvg) {
        vnode.namespace = SVG_NAMESPACE;
        vnode.isSvg = isSvg;
    }
    var domNode = !isSvg ? doc.createElement(vnode.type) : doc.createElementNS(vnode.namespace, vnode.type);
    setProps(domNode, vnode, isSvg);
    if (vnode.type === 'foreignObject') {
        isSvg = false;
    }
    var children = vnode.children;
    if (isArray(children)) {
        for (var i = 0, len = children.length; i < len; i++) {
            mountChild(children[i], domNode, parentContext, isSvg, parentComponent);
        }
    } else {
        mountChild(children, domNode, parentContext, isSvg, parentComponent);
    }
    vnode.dom = domNode;
    if (vnode.ref !== null) {
        Ref.attach(vnode, vnode.ref, domNode);
    }
    return domNode;
}
function mountChild(child, domNode, parentContext, isSvg, parentComponent) {
    child.parentContext = parentContext || EMPTY_OBJ;
    var childNode = createElement(child, isSvg, parentContext, parentComponent);
    if (childNode !== null) {
        domNode.appendChild(childNode);
    }
}
function setProps(domNode, vnode, isSvg) {
    var props = vnode.props;
    for (var p in props) {
        patchProp(domNode, p, null, props[p], null, isSvg);
    }
}

function createVText(text) {
    return {
        text: text,
        vtype: 1 /* Text */
        , dom: null
    };
}

function createVoid() {
    return {
        dom: null,
        vtype: 16 /* Void */
    };
}

var readyComponents = [];
function errorCatcher(fn, component) {
    try {
        return fn();
    } catch (error) {
        errorHandler(component, error);
    }
}
function errorHandler(component, error) {
    var boundary;
    while (true) {
        if (isFunction(component.componentDidCatch)) {
            boundary = component;
            break;
        } else if (component._parentComponent) {
            component = component._parentComponent;
        } else {
            break;
        }
    }
    if (boundary) {
        var _disable = boundary._disable;
        boundary._disable = false;
        boundary.componentDidCatch(error);
        boundary._disable = _disable;
    } else {
        throw error;
    }
}
function ensureVirtualNode(rendered) {
    if (isNumber(rendered) || isString(rendered)) {
        return createVText(rendered);
    } else if (isInvalid(rendered)) {
        return createVoid();
    }
    return rendered;
}
function mountVNode(vnode, parentContext, parentComponent) {
    return createElement(vnode, false, parentContext, parentComponent);
}
function mountComponent(vnode, parentContext, parentComponent) {
    var ref = vnode.ref;
    vnode.component = new vnode.type(vnode.props, parentContext);
    var component = vnode.component;
    component.vnode = vnode;
    if (isComponent(parentComponent)) {
        component._parentComponent = parentComponent;
    }
    if (isFunction(component.componentWillMount)) {
        errorCatcher(function () {
            component.componentWillMount();
        }, component);
        component.state = component.getState();
    }
    component._dirty = false;
    var rendered = renderComponent(component);
    rendered.parentVNode = vnode;
    component._rendered = rendered;
    if (isFunction(component.componentDidMount)) {
        readyComponents.push(component);
    }
    if (!isNullOrUndef(ref)) {
        Ref.attach(vnode, ref, vnode.dom);
    }
    var dom = vnode.dom = mountVNode(rendered, getChildContext(component, parentContext), component);
    component._disable = false;
    return dom;
}
function mountStatelessComponent(vnode, parentContext) {
    var rendered = vnode.type(vnode.props, parentContext);
    vnode._rendered = ensureVirtualNode(rendered);
    vnode._rendered.parentVNode = vnode;
    return vnode.dom = mountVNode(vnode._rendered, parentContext);
}
function getChildContext(component, context) {
    if (component.getChildContext) {
        return extend(context, component.getChildContext());
    }
    return context;
}
function renderComponent(component) {
    Current.current = component;
    var rendered;
    errorCatcher(function () {
        rendered = component.render();
    }, component);
    rendered = ensureVirtualNode(rendered);
    Current.current = null;
    return rendered;
}
function flushMount() {
    if (!readyComponents.length) {
        return;
    }
    // @TODO: perf
    var queue = readyComponents.slice(0);
    readyComponents.length = 0;
    queue.forEach(function (item) {
        if (isFunction(item)) {
            item();
        } else if (item.componentDidMount) {
            errorCatcher(function () {
                item.componentDidMount();
            }, item);
        }
    });
}
function reRenderComponent(prev, current) {
    var component = current.component = prev.component;
    var nextProps = current.props;
    var nextContext = component.context;
    component._disable = true;
    if (isFunction(component.componentWillReceiveProps)) {
        errorCatcher(function () {
            component.componentWillReceiveProps(nextProps, nextContext);
        }, component);
    }
    component._disable = false;
    component.prevProps = component.props;
    component.prevState = component.state;
    component.prevContext = component.context;
    component.props = nextProps;
    component.context = nextContext;
    if (!isNullOrUndef(current.ref)) {
        Ref.update(prev, current);
    }
    return updateComponent(component);
}
function reRenderStatelessComponent(prev, current, parentContext, domNode) {
    var lastRendered = prev._rendered;
    var rendered = current.type(current.props, parentContext);
    rendered.parentVNode = current;
    current._rendered = rendered;
    return current.dom = patch(lastRendered, rendered, lastRendered && lastRendered.dom || domNode, parentContext);
}
function updateComponent(component, isForce) {
    if (isForce === void 0) isForce = false;

    var vnode = component.vnode;
    var dom = vnode.dom;
    var props = component.props;
    var state = component.getState();
    var context = component.context;
    var prevProps = component.prevProps || props;
    var prevState = component.prevState || component.state;
    var prevContext = component.prevContext || context;
    component.props = prevProps;
    component.context = prevContext;
    var skip = false;
    if (!isForce && isFunction(component.shouldComponentUpdate) && component.shouldComponentUpdate(props, state, context) === false) {
        skip = true;
    } else if (isFunction(component.componentWillUpdate)) {
        errorCatcher(function () {
            component.componentWillUpdate(props, state, context);
        }, component);
    }
    component.props = props;
    component.state = state;
    component.context = context;
    component._dirty = false;
    if (!skip) {
        var lastRendered = component._rendered;
        var rendered = renderComponent(component);
        rendered.parentVNode = vnode;
        var childContext = getChildContext(component, context);
        var parentDom = lastRendered.dom && lastRendered.dom.parentNode;
        dom = vnode.dom = patch(lastRendered, rendered, parentDom || null, childContext);
        component._rendered = rendered;
        if (isFunction(component.componentDidUpdate)) {
            errorCatcher(function () {
                component.componentDidUpdate(prevProps, prevState, context);
            }, component);
        }
        while (vnode = vnode.parentVNode) {
            if ((vnode.vtype & (4 /* Composite */ | 8 /* Stateless */)) > 0) {
                vnode.dom = dom;
            }
        }
    }
    component.prevProps = component.props;
    component.prevState = component.state;
    component.prevContext = component.context;
    if (component._pendingCallbacks) {
        while (component._pendingCallbacks.length) {
            component._pendingCallbacks.pop().call(component);
        }
    }
    flushMount();
    return dom;
}
function unmountComponent(vnode) {
    var component = vnode.component;
    if (isFunction(component.componentWillUnmount)) {
        errorCatcher(function () {
            component.componentWillUnmount();
        }, component);
    }
    component._disable = true;
    unmount(component._rendered);
    if (!isNullOrUndef(vnode.ref)) {
        Ref.detach(vnode, vnode.ref, vnode.dom);
    }
}
function unmountStatelessComponent(vnode) {
    unmount(vnode._rendered);
}

var items = [];
function enqueueRender(component) {
    // tslint:disable-next-line:no-conditional-assignment
    if (!component._dirty && (component._dirty = true) && items.push(component) === 1) {
        nextTick(rerender);
    }
}
function rerender() {
    var p;
    var list = items;
    items = [];
    // tslint:disable-next-line:no-conditional-assignment
    while (p = list.pop()) {
        if (p._dirty) {
            updateComponent(p);
        }
    }
}

var Component = function Component(props, context) {
    this._dirty = true;
    this._disable = true;
    this._pendingStates = [];
    // Is a React Component.
    // tslint:disable-next-line:max-line-length
    // see: https://github.com/facebook/react/blob/3c977dea6b96f6a9bb39f09886848da870748441/packages/react/src/ReactBaseClasses.js#L26
    this.isReactComponent = EMPTY_OBJ;
    if (!this.state) {
        this.state = {};
    }
    this.props = props || {};
    this.context = context || EMPTY_OBJ;
    this.refs = {};
};
Component.prototype.setState = function setState(state, callback) {
    if (state) {
        (this._pendingStates = this._pendingStates || []).push(state);
    }
    if (isFunction(callback)) {
        (this._pendingCallbacks = this._pendingCallbacks || []).push(callback);
    }
    if (!this._disable) {
        enqueueRender(this);
    }
};
Component.prototype.getState = function getState() {
    var this$1 = this;

    // tslint:disable-next-line:no-this-assignment
    var ref = this;
    var _pendingStates = ref._pendingStates;
    var state = ref.state;
    var props = ref.props;
    if (!_pendingStates.length) {
        return state;
    }
    var stateClone = clone(state);
    var queue = _pendingStates.concat();
    this._pendingStates.length = 0;
    queue.forEach(function (nextState) {
        if (isFunction(nextState)) {
            nextState = nextState.call(this$1, state, props);
        }
        extend(stateClone, nextState);
    });
    return stateClone;
};
Component.prototype.forceUpdate = function forceUpdate(callback) {
    if (isFunction(callback)) {
        (this._pendingCallbacks = this._pendingCallbacks || []).push(callback);
    }
    updateComponent(this, true);
};
// tslint:disable-next-line
Component.prototype.render = function render(nextProps, nextState, nextContext) {};

var PureComponent = function (Component$$1) {
    function PureComponent() {
        Component$$1.apply(this, arguments);
        this.isPureComponent = true;
    }

    if (Component$$1) PureComponent.__proto__ = Component$$1;
    PureComponent.prototype = Object.create(Component$$1 && Component$$1.prototype);
    PureComponent.prototype.constructor = PureComponent;
    PureComponent.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    };

    return PureComponent;
}(Component);

function render(vnode, container, callback) {
    if (!container) {
        throw new Error(container + " should be a DOM Element");
    }
    var lastVnode = container._component;
    var dom;
    options.roots.push(vnode);
    if (lastVnode !== undefined) {
        options.roots = options.roots.filter(function (item) {
            return item !== lastVnode;
        });
        dom = patch(lastVnode, vnode, container, {});
    } else {
        dom = mountVNode(vnode, {});
        container.appendChild(dom);
    }
    if (container) {
        container._component = vnode;
    }
    flushMount();
    if (callback) {
        callback();
    }
    return isComposite(vnode) ? vnode.component : dom;
}

function createVNode(type, props, children, key, namespace, owner, ref) {
    return {
        type: type,
        key: key || null,
        vtype: 2 /* Node */
        , props: props || EMPTY_OBJ,
        children: children,
        namespace: namespace || null,
        _owner: owner,
        dom: null,
        ref: ref || null
    };
}

function h(type, props, children) {
    var childNodes;
    if (props.children) {
        if (!children) {
            children = props.children;
        }
    }
    if (isArray(children)) {
        childNodes = [];
        addChildren(childNodes, children, type);
    } else if (isString(children) || isNumber(children)) {
        children = createVText(String(children));
    } else if (!isValidElement(children)) {
        children = EMPTY_CHILDREN;
    }
    props.children = childNodes !== undefined ? childNodes : children;
    return createVNode(type, props, props.children, props.key, props.namespace, props.owner, props.ref);
}
function addChildren(childNodes, children, type) {
    if (isString(children) || isNumber(children)) {
        childNodes.push(createVText(String(children)));
    } else if (isValidElement(children)) {
        childNodes.push(children);
    } else if (isArray(children)) {
        for (var i = 0; i < children.length; i++) {
            addChildren(childNodes, children[i], type);
        }
    } else {
        childNodes.push(createVoid());
    }
}

var ComponentWrapper = function ComponentWrapper(type, props) {
    this.vtype = 4 /* Composite */;
    this.type = type;
    this.name = type.name || type.toString().match(/^function\s*([^\s(]+)/)[1];
    type.displayName = this.name;
    this._owner = props.owner;
    delete props.owner;
    if (this.ref = props.ref) {
        delete props.ref;
    }
    this.props = props;
    this.key = props.key || null;
    this.dom = null;
};
ComponentWrapper.prototype.init = function init(parentContext, parentComponent) {
    return mountComponent(this, parentContext, parentComponent);
};
ComponentWrapper.prototype.update = function update(previous, current, parentContext, domNode) {
    return reRenderComponent(previous, this);
};
ComponentWrapper.prototype.destroy = function destroy() {
    unmountComponent(this);
};

var StateLessComponent = function StateLessComponent(type, props) {
    this.vtype = 8 /* Stateless */;
    this.type = type;
    this._owner = props.owner;
    delete props.owner;
    this.props = props;
    this.key = props.key;
};
StateLessComponent.prototype.init = function init(parentContext) {
    return mountStatelessComponent(this, parentContext);
};
StateLessComponent.prototype.update = function update(previous, current, parentContext) {
    var props = current.props;
    var context = current.context;
    var shouldComponentUpdate = props.onShouldComponentUpdate;
    if (isFunction(shouldComponentUpdate) && !shouldComponentUpdate(previous.props, props, context)) {
        current._rendered = previous._rendered;
        return previous.dom;
    }
    return reRenderStatelessComponent(previous, this, parentContext, previous.dom);
};
StateLessComponent.prototype.destroy = function destroy() {
    unmountStatelessComponent(this);
};

function transformPropsForRealTag(type, props) {
    var newProps = {};
    for (var propName in props) {
        var propValue = props[propName];
        if (propName === 'defaultValue') {
            newProps.value = props.value || props.defaultValue;
            continue;
        }
        var svgPropName = SVGPropertyConfig.DOMAttributeNames[propName];
        if (svgPropName && svgPropName !== propName) {
            newProps[svgPropName] = propValue;
            continue;
        }
        newProps[propName] = propValue;
    }
    return newProps;
}
/**
 *
 * @param props
 * @param defaultProps
 * defaultProps should respect null but ignore undefined
 * @see: https://facebook.github.io/react/docs/react-component.html#defaultprops
 */
function transformPropsForComponent(props, defaultProps) {
    var newProps = {};
    for (var propName in props) {
        var propValue = props[propName];
        newProps[propName] = propValue;
    }
    if (defaultProps) {
        for (var propName$1 in defaultProps) {
            if (isUndefined(newProps[propName$1])) {
                newProps[propName$1] = defaultProps[propName$1];
            }
        }
    }
    return newProps;
}
function createElement$2(type, properties) {
    var _children = [],
        len = arguments.length - 2;
    while (len-- > 0) _children[len] = arguments[len + 2];

    var children = _children;
    if (_children) {
        if (_children.length === 1) {
            children = _children[0];
        } else if (_children.length === 0) {
            children = undefined;
        }
    }
    var props;
    if (isString(type)) {
        props = transformPropsForRealTag(type, properties);
        props.owner = Current.current;
        return h(type, props, children);
    } else if (isFunction(type)) {
        props = transformPropsForComponent(properties, type.defaultProps);
        if (!props.children || props.children === EMPTY_CHILDREN) {
            props.children = isInvalid(children) ? EMPTY_CHILDREN : children;
        }
        props.owner = Current.current;
        return type.prototype && type.prototype.render ? new ComponentWrapper(type, props) : new StateLessComponent(type, props);
    }
    return type;
}

function cloneElement(vnode, props) {
    var children = [],
        len = arguments.length - 2;
    while (len-- > 0) children[len] = arguments[len + 2];

    if (isVText(vnode)) {
        return createVText(vnode.text);
    }
    if (isString(vnode)) {
        return createVText(vnode);
    }
    if (!isInvalid(vnode) && isPortal(vnode.vtype, vnode) || vnode && vnode.vtype & 16 /* Void */) {
        return createVoid();
    }
    var properties = clone(extend(clone(vnode.props), props));
    if (vnode.namespace) {
        properties.namespace = vnode.namespace;
    }
    if (vnode.vtype & 4 /* Composite */ && !isNullOrUndef(vnode.ref)) {
        properties.ref = vnode.ref;
    }
    var childrenTmp = (arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children || properties.children) || [];
    if (childrenTmp.length) {
        if (childrenTmp.length === 1) {
            childrenTmp = children[0];
        }
    }
    if (isArray(vnode)) {
        return vnode.map(function (item) {
            return cloneElement(item);
        });
    }
    var newVNode = createElement$2(vnode.type, properties);
    if (isArray(childrenTmp)) {
        var _children = childrenTmp.map(function (child) {
            return cloneElement(child, child.props);
        });
        if (_children.length === 0) {
            _children = EMPTY_CHILDREN;
        }
        if (isVNode(newVNode)) {
            newVNode.children = _children;
        }
        newVNode.props.children = _children;
    } else if (childrenTmp) {
        if (isVNode(newVNode)) {
            newVNode.children = cloneElement(childrenTmp);
        }
        newVNode.props.children = cloneElement(childrenTmp, childrenTmp.props);
    }
    return newVNode;
}

var Children = {
    map: function map(children, fn, ctx) {
        if (isNullOrUndef(children)) {
            return children;
        }
        children = Children.toArray(children);
        if (ctx && ctx !== children) {
            fn = fn.bind(ctx);
        }
        return children.map(fn);
    },
    forEach: function forEach(children, fn, ctx) {
        if (isNullOrUndef(children)) {
            return;
        }
        children = Children.toArray(children);
        if (ctx && ctx !== children) {
            fn = fn.bind(ctx);
        }
        for (var i = 0, len = children.length; i < len; i++) {
            var child = isInvalid(children[i]) ? null : children[i];
            fn(child, i, children);
        }
    },
    count: function count(children) {
        children = Children.toArray(children);
        return children.length;
    },
    only: function only(children) {
        children = Children.toArray(children);
        if (children.length !== 1) {
            throw new Error('Children.only() expects only one child.');
        }
        return children[0];
    },
    toArray: function toArray(children) {
        if (isNullOrUndef(children)) {
            return [];
        }
        if (isArray(children)) {
            var result = [];
            flatten(children, result);
            return result;
        }
        return EMPTY_CHILDREN.concat(children);
    }
};
function flatten(arr, result) {
    for (var i = 0, len = arr.length; i < len; i++) {
        var value = arr[i];
        if (isArray(value)) {
            flatten(value, result);
        } else {
            result.push(value);
        }
    }
    return result;
}

// tslint:disable:no-conditional-assignment
function hydrate(vnode, container, callback) {
    if (container !== null) {
        // lastChild causes less reflow than firstChild
        var dom = container.lastChild;
        // there should be only a single entry for the root
        while (dom) {
            var next = dom.previousSibling;
            container.removeChild(dom);
            dom = next;
        }
        return render(vnode, container, callback);
    }
}

function createPortal(children, container) {
    return {
        type: container,
        vtype: 32 /* Portal */
        , children: children,
        dom: null
    };
}

// some library check React version
// see: https://github.com/NervJS/nerv/issues/46
var version = '15.4.2';

function unmountComponentAtNode(dom) {
    var component = dom._component;
    if (isValidElement(component)) {
        unmount(component, dom);
        delete dom._component;
        return true;
    }
    return false;
}
function findDOMNode(component) {
    if (isInvalid(component)) {
        return null;
    }
    return isComponent(component) ? component.vnode.dom : isValidElement(component) ? component.dom : component;
}
function createFactory(type) {
    return createElement$2.bind(null, type);
}
var WrapperComponent = function (Component$$1) {
    function WrapperComponent() {
        Component$$1.apply(this, arguments);
    }

    if (Component$$1) WrapperComponent.__proto__ = Component$$1;
    WrapperComponent.prototype = Object.create(Component$$1 && Component$$1.prototype);
    WrapperComponent.prototype.constructor = WrapperComponent;

    WrapperComponent.prototype.getChildContext = function getChildContext() {
        // tslint:disable-next-line
        return this.props.context;
    };
    WrapperComponent.prototype.render = function render$$1() {
        return this.props.children;
    };

    return WrapperComponent;
}(Component);
function unstable_renderSubtreeIntoContainer(parentComponent, vnode, container, callback) {
    // @TODO: should handle props.context?
    var wrapper = createElement$2(WrapperComponent, { context: parentComponent.context }, vnode);
    var rendered = render(wrapper, container);
    if (callback) {
        callback.call(rendered);
    }
    return rendered;
}
function isValidElement$1(element) {
    return isValidElement(element) && (element.vtype & (4 /* Composite */ | 2 /* Node */)) > 0;
}
var unstable_batchedUpdates = nextTick;

var PropTypes = {
    array: noop$1,
    bool: noop$1,
    func: noop$1,
    number: noop$1,
    object: noop$1,
    string: noop$1,
    any: noop$1,
    arrayOf: noop$1,
    element: noop$1,
    instanceOf: noop$1,
    node: noop$1,
    objectOf: noop$1,
    oneOf: noop$1,
    oneOfType: noop$1,
    shape: noop$1
};

var index = {
    Children: Children,
    Component: Component,
    PureComponent: PureComponent,
    createElement: createElement$2,
    cloneElement: cloneElement,
    render: render,
    nextTick: nextTick,
    options: options,
    findDOMNode: findDOMNode,
    isValidElement: isValidElement$1,
    unmountComponentAtNode: unmountComponentAtNode,
    createPortal: createPortal,
    unstable_renderSubtreeIntoContainer: unstable_renderSubtreeIntoContainer,
    hydrate: hydrate,
    createFactory: createFactory,
    unstable_batchedUpdates: unstable_batchedUpdates,
    version: version,
    PropTypes: PropTypes
};


/* harmony default export */ __webpack_exports__["default"] = (index);
//# sourceMappingURL=index.esm.js.map


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
module.exports = __webpack_require__(6);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// require('babel-polyfill')
__webpack_require__(5);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * polyfill for Function
 */

// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== 'function') {
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }
    var args = Array.prototype.slice.call(arguments, 1);
    var fToBind = this;
    var fNOP = function () {};
    var fBound = function () {
      return fToBind.apply(this instanceof fNOP ? this : oThis, args.concat(Array.prototype.slice.call(arguments)));
    };

    if (this.prototype) {
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();
    return fBound;
  };
}
/**
 * polyfill for Object
 */

// from https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
(function () {
  var prototypeOfObject = Object.prototype;
  var call = Function.call;
  var owns = call.bind(prototypeOfObject.hasOwnProperty);
  var isEnumerable = call.bind(prototypeOfObject.propertyIsEnumerable);
  var toStr = call.bind(prototypeOfObject.toString);

  var defineGetter;
  var defineSetter;
  var lookupGetter;
  var lookupSetter;
  var supportsAccessors = owns(prototypeOfObject, '__defineGetter__');
  if (supportsAccessors) {
    /* eslint-disable no-underscore-dangle, no-restricted-properties */
    defineGetter = call.bind(prototypeOfObject.__defineGetter__);
    defineSetter = call.bind(prototypeOfObject.__defineSetter__);
    lookupGetter = call.bind(prototypeOfObject.__lookupGetter__);
    lookupSetter = call.bind(prototypeOfObject.__lookupSetter__);
    /* eslint-enable no-underscore-dangle, no-restricted-properties */
  }

  var isPrimitive = function isPrimitive(o) {
    return o == null || (typeof o !== 'object' && typeof o !== 'function');
  };

  if (!Object.getPrototypeOf) {
    Object.getPrototypeOf = function getPrototypeOf(object) {
      var proto = object.__proto__;
      if (proto || proto === null) {
        return proto;
      }
      if (toStr(object.constructor) === '[object Function]') {
        return object.constructor.prototype;
      }
      if (object instanceof Object) {
        return prototypeOfObject;
      }
      return null;
    };
  }

  if (!Object.keys) {
    Object.keys = (function() {
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString');
      var dontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
      ];
      var dontEnumsLength = dontEnums.length;

      return function (obj) {
        if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
          throw new TypeError('Object.keys called on non-object');
        }
        var result = [], prop, i;

        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }
        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }
        return result;
      };
    }());
  }

  if (!Object.getOwnPropertyNames) {
    Object.getOwnPropertyNames = function getOwnPropertyNames(object) {
      if (object !== Object(object)) {
        throw TypeError('Object.getOwnPropertyNames called on non-object: ' + object);
      }
      return Object.keys(object);
    };
  }

  var doesGetOwnPropertyDescriptorWork = function doesGetOwnPropertyDescriptorWork(object) {
    try {
      object.sentinel = 0;
      return Object.getOwnPropertyDescriptor(object, 'sentinel').value === 0;
    } catch (err) {
      return false;
    }
  };
  var getOwnPropertyDescriptorFallback;
  if (Object.defineProperty) {
    var getOwnPropertyDescriptorWorksOnObject = doesGetOwnPropertyDescriptorWork({});
    var getOwnPropertyDescriptorWorksOnDom = typeof document === 'undefined' ||
      doesGetOwnPropertyDescriptorWork(document.createElement('div'));
    if (!getOwnPropertyDescriptorWorksOnDom || !getOwnPropertyDescriptorWorksOnObject) {
      getOwnPropertyDescriptorFallback = Object.getOwnPropertyDescriptor;
    }
  }
  if (!Object.getOwnPropertyDescriptor || getOwnPropertyDescriptorFallback) {
    var ERR_NON_OBJECT = 'Object.getOwnPropertyDescriptor called on a non-object: ';
    Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
      if (isPrimitive(object)) {
        throw new TypeError(ERR_NON_OBJECT + object);
      }
      if (getOwnPropertyDescriptorFallback) {
        try {
          return getOwnPropertyDescriptorFallback.call(Object, object, property);
        } catch (err) {

        }
      }
      var descriptor;
      if (!owns(object, property)) {
        return descriptor;
      }
      descriptor = {
        enumerable: isEnumerable(object, property),
        configurable: true
      };
      if (supportsAccessors) {
        var prototype = object.__proto__;
        var notPrototypeOfObject = object !== prototypeOfObject;
        if (notPrototypeOfObject) {
          object.__proto__ = prototypeOfObject;
        }
        var getter = lookupGetter(object, property);
        var setter = lookupSetter(object, property);
        if (notPrototypeOfObject) {
          object.__proto__ = prototype;
        }
        if (getter || setter) {
          if (getter) {
            descriptor.get = getter;
          }
          if (setter) {
            descriptor.set = setter;
          }
          return descriptor;
        }
      }
      descriptor.value = object[property];
      descriptor.writable = true;
      return descriptor;
    };
  }

  var doesDefinePropertyWork = function doesDefinePropertyWork(object) {
    try {
      Object.defineProperty(object, 'sentinel', {});
      return 'sentinel' in object;
    } catch (exception) {
      return false;
    }
  };

  if (Object.defineProperty) {
    var definePropertyWorksOnObject = doesDefinePropertyWork({});
    var definePropertyWorksOnDom = typeof document === 'undefined' ||
      doesDefinePropertyWork(document.createElement('div'));
    if (!definePropertyWorksOnObject || !definePropertyWorksOnDom) {
      var definePropertyFallback = Object.defineProperty;
      var definePropertiesFallback = Object.defineProperties;
    }
  }

  if (!Object.defineProperty || definePropertyFallback) {
    var ERR_NON_OBJECT_DESCRIPTOR = 'Property description must be an object: ';
    var ERR_NON_OBJECT_TARGET = 'Object.defineProperty called on non-object: ';
    var ERR_ACCESSORS_NOT_SUPPORTED = 'getters & setters can not be defined on this javascript engine';
    Object.defineProperty = function defineProperty(object, property, descriptor) {
      if (isPrimitive(object)) {
        throw new TypeError(ERR_NON_OBJECT_TARGET + object);
      }
      if (isPrimitive(descriptor)) {
        throw new TypeError(ERR_NON_OBJECT_DESCRIPTOR + descriptor);
      }
      if (definePropertyFallback) {
        try {
          return definePropertyFallback.call(Object, object, property, descriptor);
        } catch (exception) {
        }
      }
      if ('value' in descriptor) {
        if (supportsAccessors && (lookupGetter(object, property) || lookupSetter(object, property))) {
          var prototype = object.__proto__;
          object.__proto__ = prototypeOfObject;
          delete object[property];
          object[property] = descriptor.value;
          object.__proto__ = prototype;
        } else {
          object[property] = descriptor.value;
        }
      } else {
        var hasGetter = 'get' in descriptor;
        var hasSetter = 'set' in descriptor;
        if (!supportsAccessors && (hasGetter || hasSetter)) {
          return object;
        }
        // If we got that far then getters and setters can be defined !!
        if (hasGetter) {
          defineGetter(object, property, descriptor.get);
        }
        if (hasSetter) {
          defineSetter(object, property, descriptor.set);
        }
      }
      return object;
    };
  }

  if (!Object.defineProperties || definePropertiesFallback) {
    Object.defineProperties = function defineProperties(object, properties) {
      if (definePropertiesFallback) {
        try {
          return definePropertiesFallback.call(Object, object, properties);
        } catch (exception) {
        }
      }
      var keys = Object.keys(properties);
      for (var i = 0; i < keys.length; i++) {
        var property = keys[i];
        if (property !== '__proto__') {
          Object.defineProperty(object, property, properties[property]);
        }
      }
      return object;
    };
  }

  if (!Object.create) {
    var createEmpty;
    var supportsProto = !({ __proto__: null } instanceof Object);
    /* global ActiveXObject */
    var shouldUseActiveX = function () {
      if (!document.domain) {
        return false;
      }
      try {
        return !!new ActiveXObject('htmlfile');
      } catch (exception) {
        return false;
      }
    };

    var getEmptyViaActiveX = function () {
      var empty;
      var xDoc;
      xDoc = new ActiveXObject('htmlfile');
      var script = 'script';
      xDoc.write('<' + script + '></' + script + '>');
      xDoc.close();

      empty = xDoc.parentWindow.Object.prototype;
      xDoc = null;

      return empty;
    };

    var getEmptyViaIFrame = function () {
      var iframe = document.createElement('iframe');
      var parent = document.body || document.documentElement;
      var empty;

      iframe.style.display = 'none';
      parent.appendChild(iframe);
      // eslint-disable-next-line no-script-url
      iframe.src = 'javascript:';

      empty = iframe.contentWindow.Object.prototype;
      parent.removeChild(iframe);
      iframe = null;

      return empty;
    };

    /* global document */
    if (supportsProto || typeof document === 'undefined') {
      createEmpty = function () {
        return { __proto__: null };
      };
    } else {
      createEmpty = function () {
        var empty = shouldUseActiveX() ? getEmptyViaActiveX() : getEmptyViaIFrame();

        delete empty.constructor;
        delete empty.hasOwnProperty;
        delete empty.propertyIsEnumerable;
        delete empty.isPrototypeOf;
        delete empty.toLocaleString;
        delete empty.toString;
        delete empty.valueOf;

        var Empty = function Empty() { };
        Empty.prototype = empty;
        // short-circuit future calls
        createEmpty = function () {
          return new Empty();
        };
        return new Empty();
      };
    }

    Object.create = function create (prototype, properties) {
      var object;
      var Type = function () { };
      if (prototype === null) {
        object = createEmpty();
      } else {
        if (prototype !== null && isPrimitive(prototype)) {
          throw new TypeError('Object prototype may only be an Object or null');
        }
        Type.prototype = prototype;
        object = new Type();
        object.__proto__ = prototype;
      }

      if (properties !== void 0) {
        Object.defineProperties(object, properties);
      }

      return object;
    };
  }

  if (!Object.seal) {
    Object.seal = function seal(object) {
      if (Object(object) !== object) {
        throw new TypeError('Object.seal can only be called on Objects.');
      }
      return object;
    };
  }

  if (!Object.freeze) {
    Object.freeze = function freeze(object) {
      if (Object(object) !== object) {
        throw new TypeError('Object.freeze can only be called on Objects.');
      }
      return object;
    };
  }

  try {
    Object.freeze(function () { });
  } catch (exception) {
    Object.freeze = (function (freezeObject) {
      return function freeze(object) {
        if (typeof object === 'function') {
          return object;
        }
        return freezeObject(object);
      };
    })(Object.freeze);
  }

  if (!Object.preventExtensions) {
    Object.preventExtensions = function preventExtensions(object) {
      if (Object(object) !== object) {
        throw new TypeError('Object.preventExtensions can only be called on Objects.');
      }
      return object;
    };
  }

  if (!Object.isSealed) {
    Object.isSealed = function isSealed(object) {
      if (Object(object) !== object) {
        throw new TypeError('Object.isSealed can only be called on Objects.');
      }
      return false;
    };
  }

  if (!Object.isFrozen) {
    Object.isFrozen = function isFrozen(object) {
      if (Object(object) !== object) {
        throw new TypeError('Object.isFrozen can only be called on Objects.');
      }
      return false;
    };
  }

  if (!Object.isExtensible) {
    Object.isExtensible = function isExtensible(object) {
      if (Object(object) !== object) {
        throw new TypeError('Object.isExtensible can only be called on Objects.');
      }
      var name = '';
      while (owns(object, name)) {
        name += '?';
      }
      object[name] = true;
      var returnValue = owns(object, name);
      delete object[name];
      return returnValue;
    };
  }
})();

/**
 * polyfill for Array
 */

// from https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

// from https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (callback, thisArg) {
    var T, k;
    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.forEach called on null or undefined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (Object.prototype.toString.call(callback) != '[object Function]') {
      throw new TypeError(callback + ' is not a function');
    }
    if (arguments.length > 1) {
      T = thisArg;
    }
    k = 0;
    while (k < len) {
      var kValue;
      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };
}

// form https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every
if (!Array.prototype.every) {
  Array.prototype.every = function (callback) {
    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.every called on null or undefined');
    }

    var O = Object(this);
    var len = O.length >>> 0;
    if (Object.prototype.toString.call(callback) != '[object Function]') {
      throw new TypeError(callback + ' is not a function');
    }
    var ctx = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in O && !callback.call(ctx, O[i], i, O)) {
        return false;
      }
    }

    return true;
  };
}

// from https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
if (!Array.prototype.fill) {
  Array.prototype.fill = function (value) {
    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.fill called on null or undefined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    var start = arguments[1];
    var relativeStart = start >> 0;
    var k = relativeStart < 0 ?
      Math.max(len + relativeStart, 0) :
      Math.min(relativeStart, len);

    var end = arguments[2];
    var relativeEnd = end === undefined ? len : end >> 0;
    var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
    while (k < final) {
      O[k] = value;
      k++;
    }

    return O;
  };
}

// from https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
if (!Array.prototype.filter) {
  Array.prototype.filter = function (callback) {
    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.filter called on null or undefined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (Object.prototype.toString.call(callback) != '[object Function]') {
      throw new TypeError(callback + ' is not a function');
    }
    var res = [];
    var ctx = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in O) {
        var val = O[i];
        if (callback.call(ctx, val, i, O)) {
          res.push(val);
        }
      }
    }
    return res;
  };
}

// from https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement, fromIndex) {
    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.indexOf called on null or undefined');
    }
    var k;
    var O = Object(this);
    var len = O.length >>> 0;
    if (len === 0) {
      return -1;
    }
    var n = fromIndex | 0;
    if (n >= len) {
      return -1;
    }
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
    while (k < len) {
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}

// from https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf
if (!Array.prototype.lastIndexOf) {
  Array.prototype.lastIndexOf = function(searchElement) {
    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.lastIndexOf called on null or undefined');
    }
    var n, k;
    var t = Object(this);
    var len = t.length >>> 0;
    if (len === 0) {
      return -1;
    }
    n = len - 1;
    if (arguments.length > 1) {
      n = Number(arguments[1]);
      if (n !== n) {
        n = 0;
      } else if (n != 0 && n != (1 / 0) && n != -(1 / 0)) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
    }
    k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n);
    for (;k >= 0; k--) {
      if (k in t && t[k] === searchElement) {
        return k;
      }
    }
    return -1;
  };
}

// from https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map
if (!Array.prototype.map) {
  Array.prototype.map = function (callback, thisArg) {
    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.map called on null or undefined');
    }
    var T, A, k;
    var O = Object(this);
    var len = O.length >>> 0;
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
      throw new TypeError(callback + ' is not a function');
    }
    if (thisArg) {
      T = thisArg;
    }
    A = new Array(len);
    k = 0;
    while (k < len) {
      var kValue, mappedValue;
      if (k in O) {
        kValue = O[k];
        mappedValue = callback.call(T, kValue, k, O);
        A[ k ] = mappedValue;
      }
      k++;
    }
    return A;
  };
}

// from https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
if (!Array.prototype.reduce) {
  Array.prototype.reduce = function (callback) {
    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
    }
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
      throw new TypeError(callback + ' is not a function');
    }
    var t = Object(this), len = t.length >>> 0, k = 0, value;
    if (arguments.length >= 2) {
      value = arguments[1];
    } else {
      while (k < len && !(k in t)) {
        k++;
      }
      if (k >= len) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      value = t[k++];
    }
    for (; k < len; k++) {
      if (k in t) {
        value = callback(value, t[k], k, t);
      }
    }
    return value;
  };
}

// from https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight
if (!Array.prototype.reduceRight) {
  Array.prototype.reduceRight = function (callback) {
    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.reduceRight called on null or undefined');
    }
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
      throw new TypeError(callback + ' is not a function');
    }
    var t = Object(this), len = t.length >>> 0, k = len - 1, value;
    if (arguments.length >= 2) {
      value = arguments[1];
    } else {
      while (k >= 0 && !(k in t)) {
        k--;
      }
      if (k < 0) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      value = t[k--];
    }
    for (; k >= 0; k--) {
      if (k in t) {
        value = callback(value, t[k], k, t);
      }
    }
    return value;
  };
}

// from https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some
if (!Array.prototype.some) {
  Array.prototype.some = function (callback) {
    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.reduceRight called on null or undefined');
    }
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
      throw new TypeError(callback + ' is not a function');
    }
    var t = Object(this);
    var len = t.length >>> 0;
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t && callback.call(thisArg, t[i], i, t)) {
        return true;
      }
    }
    return false;
  };
}

//----------------------------------------------------------------------
//
// CSSOM View Module
// https://dev.w3.org/csswg/cssom-view/
//
//----------------------------------------------------------------------

// Fix for IE8-'s Element.getBoundingClientRect()
(function (global) {
  if ('TextRectangle' in global && !('width' in global.TextRectangle.prototype)) {
    Object.defineProperties(global.TextRectangle.prototype, {
      'width': { get: function () { return this.right - this.left; } },
      'height': { get: function () { return this.bottom - this.top; } }
    });
  }
})(window);
/**
 * polyfill for Date
 */

// from https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Date/now
if (!Date.now) {
  Date.now = function now () {
    return new Date().getTime();
  };
}

// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
if (!Date.prototype.toISOString) {
  (function() {
    function pad(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }
    Date.prototype.toISOString = function () {
      return this.getUTCFullYear() +
        '-' + pad(this.getUTCMonth() + 1) +
        '-' + pad(this.getUTCDate()) +
        'T' + pad(this.getUTCHours()) +
        ':' + pad(this.getUTCMinutes()) +
        ':' + pad(this.getUTCSeconds()) +
        '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
        'Z';
    };
  }());
}
/**
 * polyfill for DOM
 */

(function (global) {
  if (!('document' in global)) {
    return;
  }
  var document = global.document;

  // IE8- document.getElementsByClassName
  if (!document.getElementsByClassName && document.querySelectorAll) {
    var getElementsByClassName = function (classNames) {
      classNames = String(classNames).replace(/^|\s+/g, '.');
      return this.querySelectorAll(classNames);
    };
    void [HTMLDocument, Element].forEach(function (o) {
      o.prototype.getElementsByClassName = getElementsByClassName;
    });
  }

  // IE CustomEvent
  if (!('CustomEvent' in global) || typeof global.CustomEvent !== 'function') {
    var CustomEvent = function (event, params) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };
    CustomEvent.prototype = global.Event.prototype;
    global.CustomEvent = CustomEvent;
  }

  // Element.matches
  // from https://developer.mozilla.org/en/docs/Web/API/Element/matches
  (function () {
    if (!('Element' in global) || Element.prototype.matches) {
      return;
    }
    var matchesVenders = ['ms', 'o', 'moz', 'webkit'];
    var matchesSelectorSuffix = 'MatchesSelector';
    for (var i = 0; i < matchesVenders.length; i++) {
      var matchesSelector = matchesVenders[i] + matchesSelectorSuffix;
      if (matchesSelector in Element.prototype) {
        Element.prototype.matches = Element.prototype[matchesSelector];
        return;
      }
    }
    if (document.querySelectorAll) {
      Element.prototype.matches = function matches (selector) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(selector);
        var i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1;
      };
    }
  })();

  // Node.textContent
  if (Object.defineProperty
    && Object.getOwnPropertyDescriptor
    && Object.getOwnPropertyDescriptor(Element.prototype, 'textContent')
    && !Object.getOwnPropertyDescriptor(Element.prototype, 'textContent').get) {
    (function() {
      var innerText = Object.getOwnPropertyDescriptor(Element.prototype, 'innerText');
      Object.defineProperty(Element.prototype, 'textContent', {
        get: function() {
          return innerText.get.call(this);
        },
        set: function(s) {
          return innerText.set.call(this, s);
        }
      });
    })();
  }
})(window);

/**
 * polyfill for DOM Event
 */

// from https://github.com/Financial-Times/polyfill-service/blob/master/polyfills/Event/polyfill.js
(function (global) {
  if (('Event' in global) && typeof global.Event === 'function') {
    return;
  }
  var unlistenableWindowEvents = {
    click: 1,
    dblclick: 1,
    keyup: 1,
    keypress: 1,
    keydown: 1,
    mousedown: 1,
    mouseup: 1,
    mousemove: 1,
    mouseover: 1,
    mouseenter: 1,
    mouseleave: 1,
    mouseout: 1,
    storage: 1,
    storagecommit: 1,
    textinput: 1
  };
  var existingProto = (global.Event && global.Event.prototype) || null;
  global.Event = Window.prototype.Event = function Event (type, eventInitDict) {
    if (!type) {
      throw new Error('Not enough arguments');
    }
    var event;
    if ('createEvent' in document) {
      event = document.createEvent('Event');
      var bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
      var cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
      event.initEvent(type, bubbles, cancelable);
      return event;
    }
    event = document.createEventObject();
    event.type = type;
    event.bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
    event.cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
    return event;
  };
  if (existingProto) {
    Object.defineProperty(global.Event, 'prototype', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: existingProto
    });
  }
  if (!('createEvent' in document)) {
    var addEventListener = function (type, listener) {
      var element = this;
      if (element === global && type in unlistenableWindowEvents) {
        throw new Error('In IE8 the event: ' + type + ' is not available on the window object.');
      }
      if (!element._events) {
        element._events = {};
      }
      if (!element._events[type]) {
        element._events[type] = function (event) {
          var list = element._events[event.type].list;
          var events = list.slice();
          var index = -1;
          var length = events.length;
          var eventElement;
          event.preventDefault = function preventDefault () {
            if (event.cancelable !== false) {
              event.returnValue = false;
            }
          };
          event.stopPropagation = function stopPropagation () {
            event.cancelBubble = true;
          };
          event.stopImmediatePropagation = function stopImmediatePropagation () {
            event.cancelBubble = true;
            event.cancelImmediate = true;
          };
          event.currentTarget = element;
          event.target = event.target || event.srcElement || element;
          event.relatedTarget = event.fromElement ? (event.fromElement === event.target) ? event.toElement : event.fromElement : null;
          event.timeStamp = new Date().getTime();
          if (event.clientX) {
            event.pageX = event.clientX + document.documentElement.scrollLeft;
            event.pageY = event.clientY + document.documentElement.scrollTop;
          }
          while (++index < length && !event.cancelImmediate) {
            if (index in events) {
              eventElement = events[index];
              if (list.indexOf(eventElement) !== -1 && typeof eventElement === 'function') {
                eventElement.call(element, event);
              }
            }
          }
        };
        element._events[type].list = [];
        if (element.attachEvent) {
          element.attachEvent('on' + type, element._events[type]);
        }
      }
      element._events[type].list.push(listener);
    };

    var removeEventListener = function (type, listener) {
      var element = this;
      var index;
      if (element._events && element._events[type] && element._events[type].list) {
        index = element._events[type].list.indexOf(listener);
        if (index !== -1) {
          element._events[type].list.splice(index, 1);
          if (!element._events[type].list.length) {
            if (element.detachEvent) {
              element.detachEvent('on' + type, element._events[type]);
            }
            delete element._events[type];
          }
        }
      }
    };

    var dispatchEvent = function (event) {
      if (!arguments.length) {
        throw new Error('Not enough arguments');
      }
      if (!event || typeof event.type !== 'string') {
        throw new Error('DOM Events Exception 0');
      }
      var element = this, type = event.type;
      try {
        if (!event.bubbles) {
          event.cancelBubble = true;
          var cancelBubbleEvent = function (event) {
            event.cancelBubble = true;
            (element || window).detachEvent('on' + type, cancelBubbleEvent);
          };
          this.attachEvent('on' + type, cancelBubbleEvent);
        }
        this.fireEvent('on' + type, event);
      } catch (error) {
        event.target = element;
        do {
          event.currentTarget = element;
          if ('_events' in element && typeof element._events[type] === 'function') {
            element._events[type].call(element, event);
          }
          if (typeof element['on' + type] === 'function') {
            element['on' + type].call(element, event);
          }
          element = element.nodeType === 9 ? element.parentWindow : element.parentNode;
        } while (element && !event.cancelBubble);
      }
      return true;
    };

    void [Window, HTMLDocument, Element].forEach(function (o) {
      o.prototype.addEventListener = addEventListener;
      o.prototype.removeEventListener = removeEventListener;
      o.prototype.dispatchEvent = dispatchEvent;
    });

    // 添加DOMContentLoaded事件
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState === 'complete') {
        document.dispatchEvent(new Event('DOMContentLoaded', {
          bubbles: true
        }));
      }
    });
  }
})(window);

/**
 * polyfill for getComputedStyle
 */

// from https://github.com/Financial-Times/polyfill-service/blob/master/polyfills/getComputedStyle/polyfill.js
(function (global) {
  if ('getComputedStyle' in global && typeof global.getComputedStyle === 'function') {
    return;
  }
  function getPixelSize (element, style, property, fontSize) {
    var sizeWithSuffix = style[property];
    var size = parseFloat(sizeWithSuffix);
    var suffix = sizeWithSuffix.split(/\d/)[0];
    var rootSize;
    fontSize = (fontSize !== null) ? fontSize :
      (/%|em/.test(suffix) && element.parentElement) ?
        getPixelSize(element.parentElement, element.parentElement.currentStyle, 'fontSize', null) : 16;
    rootSize = property === 'fontSize' ? fontSize :
      /width/i.test(property) ? element.clientWidth : element.clientHeight;
    return (suffix ==='em') ? size * fontSize :
      (suffix === 'in') ? size * 96 :
        (suffix === 'pt') ? size * 96 / 72 :
          (suffix === '%') ? size / 100 * rootSize : size;
  }

  function setShortStyleProperty (style, property) {
    var borderSuffix = property === 'border' ? 'Width' : '';
    var t = property + 'Top' + borderSuffix;
    var r = property + 'Right' + borderSuffix;
    var b = property + 'Bottom' + borderSuffix;
    var l = property + 'Left' + borderSuffix;
    style[property] = (style[t] == style[r] == style[b] == style[l] ? [style[t]]
      : style[t] == style[b] && style[l] == style[r] ? [style[t], style[r]]
      : style[l] == style[r] ? [style[t], style[r], style[b]]
      : [style[t], style[r], style[b], style[l]]).join(' ');
  }

  function CSSStyleDeclaration (element) {
    var currentStyle = element.currentStyle || {};
    var style = this;
    var fontSize = getPixelSize(element, currentStyle, 'fontSize', null);
    for (var property in currentStyle) {
      if (/width|height|margin.|padding.|border.+W/.test(property) && style[property] !== 'auto') {
        style[property] = getPixelSize(element, currentStyle, property, fontSize) + 'px';
      } else if (property === 'styleFloat') {
        style['float'] = currentStyle[property];
      } else {
        style[property] = currentStyle[property];
      }
    }
    setShortStyleProperty(style, 'margin');
    setShortStyleProperty(style, 'padding');
    setShortStyleProperty(style, 'border');
    style.fontSize = fontSize + 'px';
    return style;
  }

  CSSStyleDeclaration.prototype = {
    constructor: CSSStyleDeclaration,
    getPropertyPriority: function () { },
    getPropertyValue: function (prop) {
      return this[prop] || '';
    },
    item: function () { },
    removeProperty: function () { },
    setProperty: function () { },
    getPropertyCSSValue: function () { }
  };
  global.getComputedStyle = function (node) {
    return new CSSStyleDeclaration(node);
  };
})(window);
/**
 * polyfill for IE8 in HTML
 * https://html.spec.whatwg.org
 */

// document.head
document.head = document.head || document.getElementsByTagName('head')[0];

// HTML Tag shiv
void [
  'abbr', 'article', 'aside', 'audio', 'bdi', 'canvas', 'data', 'datalist',
  'details', 'dialog', 'figcaption', 'figure', 'footer', 'header', 'hgroup',
  'main', 'mark', 'meter', 'nav', 'output', 'picture', 'progress', 'section',
  'summary', 'template', 'time', 'video'
].forEach(function (tag) {
  document.createElement(tag);
});
/**
 * polyfill for String
 */

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return String(this).replace(/^\s+/, '').replace(/\s+$/, '');
  };
}
/**
 * Polyfill for Viewport
 */

(function (global) {
  if ('innerWidth' in global && 'innerHeight' in global && 'pageXOffset' in global && 'pageYOffset' in global) {
    return;
  }
  var doc = global.document;
  var docEl = doc.documentElement;
  var body = doc.body || doc.createElement('body');

  function scrollX () {
    return (docEl.scrollLeft || body.scrollLeft || 0) - (docEl.clientLeft || body.clientLeft || 0);
  }

  function scrollY () {
    return (docEl.scrollTop || body.scrollTop || 0) - (docEl.clientTop || body.clientTop || 0);
  }

  Object.defineProperties(global, {
    innerWidth: {
      get: function () {
        return docEl.clientWidth;
      }
    },
    innerHeight: {
      get: function () {
        return docEl.clientHeight;
      }
    },
    pageXOffset: {
      get: scrollX
    },
    pageYOffset: {
      get: scrollY
    },
    scrollX: {
      get: scrollX
    },
    scrollY: {
      get: scrollY
    }
  });
})(window);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _nervjs = __webpack_require__(2);

var _nervjs2 = _interopRequireDefault(_nervjs);

var _MasterLayout = __webpack_require__(7);

__webpack_require__(13);

__webpack_require__(15);

__webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  App.prototype.render = function render() {
    return _nervjs2['default'].createElement(
      'div',
      null,
      'hello'
    );
  };

  return App;
}(_nervjs2['default'].Component);

_nervjs2['default'].render(_nervjs2['default'].createElement(App, null), document.getElementById('app'));

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.MasterLayout = undefined;

var _nervjs = __webpack_require__(2);

var _nervjs2 = _interopRequireDefault(_nervjs);

var _AppBar = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MasterLayout = exports.MasterLayout = function (_React$PureComponent) {
  _inherits(MasterLayout, _React$PureComponent);

  function MasterLayout() {
    _classCallCheck(this, MasterLayout);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  MasterLayout.prototype.render = function render() {
    var match = this.props.match;

    return _nervjs2['default'].createElement(
      'div',
      null,
      _nervjs2['default'].createElement(_AppBar.AppBar, null)
    );
  };

  return MasterLayout;
}(_nervjs2['default'].PureComponent);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.AppBar = undefined;

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _nervjs = __webpack_require__(2);

var _nervjs2 = _interopRequireDefault(_nervjs);

var _AppBar = __webpack_require__(10);

var _AppBar2 = _interopRequireDefault(_AppBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppBar = exports.AppBar = function (_React$PureComponent) {
  _inherits(AppBar, _React$PureComponent);

  function AppBar() {
    _classCallCheck(this, AppBar);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  AppBar.prototype.render = function render() {
    return _nervjs2['default'].createElement(
      'header',
      { className: (0, _classnames2['default'])(_AppBar2['default'].appBar, 'row', 'middle-xs') },
      _nervjs2['default'].createElement(
        'a',
        { href: '/app', className: (0, _classnames2['default'])(_AppBar2['default'].logo, 'col-xs-10') },
        'Retain'
      ),
      _nervjs2['default'].createElement(
        'nav',
        { className: 'col-xs-2' },
        _nervjs2['default'].createElement(
          'div',
          { className: 'row middle-xs between-xs' },
          _nervjs2['default'].createElement(
            'a',
            { className: _AppBar2['default'].link, href: '/app/about' },
            'About'
          ),
          _nervjs2['default'].createElement(
            'span',
            { className: _AppBar2['default'].link },
            'SignOut'
          )
        )
      )
    );
  };

  return AppBar;
}(_nervjs2['default'].PureComponent);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(11);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--2-1!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/less-loader/dist/cjs.js!./AppBar.less", function() {
		var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--2-1!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/less-loader/dist/cjs.js!./AppBar.less");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "._2uDlZ95da8g5S_alJlc-ej {\n  height: 65px;\n  padding: 5px 30px;\n  background-color: #00BCD4;\n}\n._32uB_VqCSz_k2F5-PIXuTN {\n  color: white;\n  font-size: 30px;\n  font-weight: 300;\n  cursor: pointer;\n}\n._2BEPgRmMDabiBNMtNoeTm0 {\n  color: white;\n  font-size: 24px;\n  font-weight: 400;\n  cursor: pointer;\n}\n", ""]);

// exports
exports.locals = {
	"app-bar": "_2uDlZ95da8g5S_alJlc-ej",
	"appBar": "_2uDlZ95da8g5S_alJlc-ej",
	"logo": "_32uB_VqCSz_k2F5-PIXuTN",
	"link": "_2BEPgRmMDabiBNMtNoeTm0"
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(14);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!./flexboxgrid.min.css", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!./flexboxgrid.min.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".container,.container-fluid{margin-right:auto;margin-left:auto}.container-fluid{padding-right:2rem;padding-left:2rem}.row{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:-moz-box;display:flex;-webkit-box-flex:0;-webkit-flex:0 1 auto;-ms-flex:0 1 auto;-moz-box-flex:0;flex:0 1 auto;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;-moz-box-orient:horizontal;-moz-box-direction:normal;flex-direction:row;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-right:-.5rem;margin-left:-.5rem}.row.reverse{-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-webkit-flex-direction:row-reverse;-ms-flex-direction:row-reverse;-moz-box-orient:horizontal;-moz-box-direction:reverse;flex-direction:row-reverse}.col.reverse{-webkit-box-orient:vertical;-webkit-box-direction:reverse;-webkit-flex-direction:column-reverse;-ms-flex-direction:column-reverse;-moz-box-orient:vertical;-moz-box-direction:reverse;flex-direction:column-reverse}.col-xs,.col-xs-1,.col-xs-10,.col-xs-11,.col-xs-12,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9,.col-xs-offset-1,.col-xs-offset-10,.col-xs-offset-11,.col-xs-offset-12,.col-xs-offset-2,.col-xs-offset-3,.col-xs-offset-4,.col-xs-offset-5,.col-xs-offset-6,.col-xs-offset-7,.col-xs-offset-8,.col-xs-offset-9{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-box-flex:0;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;-moz-box-flex:0;flex:0 0 auto;padding-right:.5rem;padding-left:.5rem}.col-xs{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;-moz-box-flex:1;flex-grow:1;-webkit-flex-basis:0;-ms-flex-preferred-size:0;flex-basis:0;max-width:100%}.col-xs-1{-webkit-flex-basis:8.333%;-ms-flex-preferred-size:8.333%;flex-basis:8.333%;max-width:8.333%}.col-xs-2{-webkit-flex-basis:16.667%;-ms-flex-preferred-size:16.667%;flex-basis:16.667%;max-width:16.667%}.col-xs-3{-webkit-flex-basis:25%;-ms-flex-preferred-size:25%;flex-basis:25%;max-width:25%}.col-xs-4{-webkit-flex-basis:33.333%;-ms-flex-preferred-size:33.333%;flex-basis:33.333%;max-width:33.333%}.col-xs-5{-webkit-flex-basis:41.667%;-ms-flex-preferred-size:41.667%;flex-basis:41.667%;max-width:41.667%}.col-xs-6{-webkit-flex-basis:50%;-ms-flex-preferred-size:50%;flex-basis:50%;max-width:50%}.col-xs-7{-webkit-flex-basis:58.333%;-ms-flex-preferred-size:58.333%;flex-basis:58.333%;max-width:58.333%}.col-xs-8{-webkit-flex-basis:66.667%;-ms-flex-preferred-size:66.667%;flex-basis:66.667%;max-width:66.667%}.col-xs-9{-webkit-flex-basis:75%;-ms-flex-preferred-size:75%;flex-basis:75%;max-width:75%}.col-xs-10{-webkit-flex-basis:83.333%;-ms-flex-preferred-size:83.333%;flex-basis:83.333%;max-width:83.333%}.col-xs-11{-webkit-flex-basis:91.667%;-ms-flex-preferred-size:91.667%;flex-basis:91.667%;max-width:91.667%}.col-xs-12{-webkit-flex-basis:100%;-ms-flex-preferred-size:100%;flex-basis:100%;max-width:100%}.col-xs-offset-1{margin-left:8.333%}.col-xs-offset-2{margin-left:16.667%}.col-xs-offset-3{margin-left:25%}.col-xs-offset-4{margin-left:33.333%}.col-xs-offset-5{margin-left:41.667%}.col-xs-offset-6{margin-left:50%}.col-xs-offset-7{margin-left:58.333%}.col-xs-offset-8{margin-left:66.667%}.col-xs-offset-9{margin-left:75%}.col-xs-offset-10{margin-left:83.333%}.col-xs-offset-11{margin-left:91.667%}.start-xs{-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;-moz-box-pack:start;justify-content:flex-start;text-align:start}.center-xs{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;-moz-box-pack:center;justify-content:center;text-align:center}.end-xs{-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;-moz-box-pack:end;justify-content:flex-end;text-align:end}.top-xs{-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;-moz-box-align:start;align-items:flex-start}.middle-xs{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;-moz-box-align:center;align-items:center}.bottom-xs{-webkit-box-align:end;-webkit-align-items:flex-end;-ms-flex-align:end;-moz-box-align:end;align-items:flex-end}.around-xs{-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around}.between-xs{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;-moz-box-pack:justify;justify-content:space-between}.first-xs{-webkit-box-ordinal-group:0;-webkit-order:-1;-ms-flex-order:-1;-moz-box-ordinal-group:0;order:-1}.last-xs{-webkit-box-ordinal-group:2;-webkit-order:1;-ms-flex-order:1;-moz-box-ordinal-group:2;order:1}@media only screen and (min-width:48em){.container{width:49rem}.col-sm,.col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-sm-offset-1,.col-sm-offset-10,.col-sm-offset-11,.col-sm-offset-12,.col-sm-offset-2,.col-sm-offset-3,.col-sm-offset-4,.col-sm-offset-5,.col-sm-offset-6,.col-sm-offset-7,.col-sm-offset-8,.col-sm-offset-9{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-box-flex:0;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;-moz-box-flex:0;flex:0 0 auto;padding-right:.5rem;padding-left:.5rem}.col-sm{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;-moz-box-flex:1;flex-grow:1;-webkit-flex-basis:0;-ms-flex-preferred-size:0;flex-basis:0;max-width:100%}.col-sm-1{-webkit-flex-basis:8.333%;-ms-flex-preferred-size:8.333%;flex-basis:8.333%;max-width:8.333%}.col-sm-2{-webkit-flex-basis:16.667%;-ms-flex-preferred-size:16.667%;flex-basis:16.667%;max-width:16.667%}.col-sm-3{-webkit-flex-basis:25%;-ms-flex-preferred-size:25%;flex-basis:25%;max-width:25%}.col-sm-4{-webkit-flex-basis:33.333%;-ms-flex-preferred-size:33.333%;flex-basis:33.333%;max-width:33.333%}.col-sm-5{-webkit-flex-basis:41.667%;-ms-flex-preferred-size:41.667%;flex-basis:41.667%;max-width:41.667%}.col-sm-6{-webkit-flex-basis:50%;-ms-flex-preferred-size:50%;flex-basis:50%;max-width:50%}.col-sm-7{-webkit-flex-basis:58.333%;-ms-flex-preferred-size:58.333%;flex-basis:58.333%;max-width:58.333%}.col-sm-8{-webkit-flex-basis:66.667%;-ms-flex-preferred-size:66.667%;flex-basis:66.667%;max-width:66.667%}.col-sm-9{-webkit-flex-basis:75%;-ms-flex-preferred-size:75%;flex-basis:75%;max-width:75%}.col-sm-10{-webkit-flex-basis:83.333%;-ms-flex-preferred-size:83.333%;flex-basis:83.333%;max-width:83.333%}.col-sm-11{-webkit-flex-basis:91.667%;-ms-flex-preferred-size:91.667%;flex-basis:91.667%;max-width:91.667%}.col-sm-12{-webkit-flex-basis:100%;-ms-flex-preferred-size:100%;flex-basis:100%;max-width:100%}.col-sm-offset-1{margin-left:8.333%}.col-sm-offset-2{margin-left:16.667%}.col-sm-offset-3{margin-left:25%}.col-sm-offset-4{margin-left:33.333%}.col-sm-offset-5{margin-left:41.667%}.col-sm-offset-6{margin-left:50%}.col-sm-offset-7{margin-left:58.333%}.col-sm-offset-8{margin-left:66.667%}.col-sm-offset-9{margin-left:75%}.col-sm-offset-10{margin-left:83.333%}.col-sm-offset-11{margin-left:91.667%}.start-sm{-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;-moz-box-pack:start;justify-content:flex-start;text-align:start}.center-sm{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;-moz-box-pack:center;justify-content:center;text-align:center}.end-sm{-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;-moz-box-pack:end;justify-content:flex-end;text-align:end}.top-sm{-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;-moz-box-align:start;align-items:flex-start}.middle-sm{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;-moz-box-align:center;align-items:center}.bottom-sm{-webkit-box-align:end;-webkit-align-items:flex-end;-ms-flex-align:end;-moz-box-align:end;align-items:flex-end}.around-sm{-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around}.between-sm{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;-moz-box-pack:justify;justify-content:space-between}.first-sm{-webkit-box-ordinal-group:0;-webkit-order:-1;-ms-flex-order:-1;-moz-box-ordinal-group:0;order:-1}.last-sm{-webkit-box-ordinal-group:2;-webkit-order:1;-ms-flex-order:1;-moz-box-ordinal-group:2;order:1}}@media only screen and (min-width:64em){.container{width:65rem}.col-md,.col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-md-offset-1,.col-md-offset-10,.col-md-offset-11,.col-md-offset-12,.col-md-offset-2,.col-md-offset-3,.col-md-offset-4,.col-md-offset-5,.col-md-offset-6,.col-md-offset-7,.col-md-offset-8,.col-md-offset-9{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-box-flex:0;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;-moz-box-flex:0;flex:0 0 auto;padding-right:.5rem;padding-left:.5rem}.col-md{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;-moz-box-flex:1;flex-grow:1;-webkit-flex-basis:0;-ms-flex-preferred-size:0;flex-basis:0;max-width:100%}.col-md-1{-webkit-flex-basis:8.333%;-ms-flex-preferred-size:8.333%;flex-basis:8.333%;max-width:8.333%}.col-md-2{-webkit-flex-basis:16.667%;-ms-flex-preferred-size:16.667%;flex-basis:16.667%;max-width:16.667%}.col-md-3{-webkit-flex-basis:25%;-ms-flex-preferred-size:25%;flex-basis:25%;max-width:25%}.col-md-4{-webkit-flex-basis:33.333%;-ms-flex-preferred-size:33.333%;flex-basis:33.333%;max-width:33.333%}.col-md-5{-webkit-flex-basis:41.667%;-ms-flex-preferred-size:41.667%;flex-basis:41.667%;max-width:41.667%}.col-md-6{-webkit-flex-basis:50%;-ms-flex-preferred-size:50%;flex-basis:50%;max-width:50%}.col-md-7{-webkit-flex-basis:58.333%;-ms-flex-preferred-size:58.333%;flex-basis:58.333%;max-width:58.333%}.col-md-8{-webkit-flex-basis:66.667%;-ms-flex-preferred-size:66.667%;flex-basis:66.667%;max-width:66.667%}.col-md-9{-webkit-flex-basis:75%;-ms-flex-preferred-size:75%;flex-basis:75%;max-width:75%}.col-md-10{-webkit-flex-basis:83.333%;-ms-flex-preferred-size:83.333%;flex-basis:83.333%;max-width:83.333%}.col-md-11{-webkit-flex-basis:91.667%;-ms-flex-preferred-size:91.667%;flex-basis:91.667%;max-width:91.667%}.col-md-12{-webkit-flex-basis:100%;-ms-flex-preferred-size:100%;flex-basis:100%;max-width:100%}.col-md-offset-1{margin-left:8.333%}.col-md-offset-2{margin-left:16.667%}.col-md-offset-3{margin-left:25%}.col-md-offset-4{margin-left:33.333%}.col-md-offset-5{margin-left:41.667%}.col-md-offset-6{margin-left:50%}.col-md-offset-7{margin-left:58.333%}.col-md-offset-8{margin-left:66.667%}.col-md-offset-9{margin-left:75%}.col-md-offset-10{margin-left:83.333%}.col-md-offset-11{margin-left:91.667%}.start-md{-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;-moz-box-pack:start;justify-content:flex-start;text-align:start}.center-md{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;-moz-box-pack:center;justify-content:center;text-align:center}.end-md{-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;-moz-box-pack:end;justify-content:flex-end;text-align:end}.top-md{-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;-moz-box-align:start;align-items:flex-start}.middle-md{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;-moz-box-align:center;align-items:center}.bottom-md{-webkit-box-align:end;-webkit-align-items:flex-end;-ms-flex-align:end;-moz-box-align:end;align-items:flex-end}.around-md{-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around}.between-md{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;-moz-box-pack:justify;justify-content:space-between}.first-md{-webkit-box-ordinal-group:0;-webkit-order:-1;-ms-flex-order:-1;-moz-box-ordinal-group:0;order:-1}.last-md{-webkit-box-ordinal-group:2;-webkit-order:1;-ms-flex-order:1;-moz-box-ordinal-group:2;order:1}}@media only screen and (min-width:75em){.container{width:76rem}.col-lg,.col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-lg-offset-1,.col-lg-offset-10,.col-lg-offset-11,.col-lg-offset-12,.col-lg-offset-2,.col-lg-offset-3,.col-lg-offset-4,.col-lg-offset-5,.col-lg-offset-6,.col-lg-offset-7,.col-lg-offset-8,.col-lg-offset-9{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-box-flex:0;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;-moz-box-flex:0;flex:0 0 auto;padding-right:.5rem;padding-left:.5rem}.col-lg{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;-moz-box-flex:1;flex-grow:1;-webkit-flex-basis:0;-ms-flex-preferred-size:0;flex-basis:0;max-width:100%}.col-lg-1{-webkit-flex-basis:8.333%;-ms-flex-preferred-size:8.333%;flex-basis:8.333%;max-width:8.333%}.col-lg-2{-webkit-flex-basis:16.667%;-ms-flex-preferred-size:16.667%;flex-basis:16.667%;max-width:16.667%}.col-lg-3{-webkit-flex-basis:25%;-ms-flex-preferred-size:25%;flex-basis:25%;max-width:25%}.col-lg-4{-webkit-flex-basis:33.333%;-ms-flex-preferred-size:33.333%;flex-basis:33.333%;max-width:33.333%}.col-lg-5{-webkit-flex-basis:41.667%;-ms-flex-preferred-size:41.667%;flex-basis:41.667%;max-width:41.667%}.col-lg-6{-webkit-flex-basis:50%;-ms-flex-preferred-size:50%;flex-basis:50%;max-width:50%}.col-lg-7{-webkit-flex-basis:58.333%;-ms-flex-preferred-size:58.333%;flex-basis:58.333%;max-width:58.333%}.col-lg-8{-webkit-flex-basis:66.667%;-ms-flex-preferred-size:66.667%;flex-basis:66.667%;max-width:66.667%}.col-lg-9{-webkit-flex-basis:75%;-ms-flex-preferred-size:75%;flex-basis:75%;max-width:75%}.col-lg-10{-webkit-flex-basis:83.333%;-ms-flex-preferred-size:83.333%;flex-basis:83.333%;max-width:83.333%}.col-lg-11{-webkit-flex-basis:91.667%;-ms-flex-preferred-size:91.667%;flex-basis:91.667%;max-width:91.667%}.col-lg-12{-webkit-flex-basis:100%;-ms-flex-preferred-size:100%;flex-basis:100%;max-width:100%}.col-lg-offset-1{margin-left:8.333%}.col-lg-offset-2{margin-left:16.667%}.col-lg-offset-3{margin-left:25%}.col-lg-offset-4{margin-left:33.333%}.col-lg-offset-5{margin-left:41.667%}.col-lg-offset-6{margin-left:50%}.col-lg-offset-7{margin-left:58.333%}.col-lg-offset-8{margin-left:66.667%}.col-lg-offset-9{margin-left:75%}.col-lg-offset-10{margin-left:83.333%}.col-lg-offset-11{margin-left:91.667%}.start-lg{-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;-moz-box-pack:start;justify-content:flex-start;text-align:start}.center-lg{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;-moz-box-pack:center;justify-content:center;text-align:center}.end-lg{-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;-moz-box-pack:end;justify-content:flex-end;text-align:end}.top-lg{-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;-moz-box-align:start;align-items:flex-start}.middle-lg{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;-moz-box-align:center;align-items:center}.bottom-lg{-webkit-box-align:end;-webkit-align-items:flex-end;-ms-flex-align:end;-moz-box-align:end;align-items:flex-end}.around-lg{-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around}.between-lg{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;-moz-box-pack:justify;justify-content:space-between}.first-lg{-webkit-box-ordinal-group:0;-webkit-order:-1;-ms-flex-order:-1;-moz-box-ordinal-group:0;order:-1}.last-lg{-webkit-box-ordinal-group:2;-webkit-order:1;-ms-flex-order:1;-moz-box-ordinal-group:2;order:1}}\n", ""]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(16);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!./global.css", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!./global.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports
exports.i(__webpack_require__(17), "");

// module
exports.push([module.i, "* {\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\nbody, html, main, .main, .app, app {\n  min-height: 100%;\n  height: 100%;\n  background-color: #efefef;\n}\n\nbody {\n  font-family: 'Roboto', sans-serif;\n}\n\n.btn-light {\n  border: none;\n  outline: none;\n  -moz-border-radius: 2px;\n       border-radius: 2px;\n  min-width: 60px;\n  color: rgba(0,0,0, 0.6);\n  text-transform: uppercase;\n  line-spacing: 1px;\n  padding: 5px;\n  text-align: center;\n  background-color: transparent;\n  cursor: pointer;\n}\n\n.btn-light:hover {\n  background-color: rgba(0,0,0, 0.2);\n}\n\n.btn-light:disabled, .btn-light[disabled], .btn-light.disabled {\n  cursor: not-allowed;\n  background-color: rgba(0,0,0,.12);\n  color: rgba(0,0,0,.26);\n}\n\ninput {\n  border: none;\n  background-color: transparent;\n  outline: none;\n  color: rgba(0,0,0,0.6);\n  margin-bottom: 15px;\n}\n\n.shadow-1 {\n  -webkit-box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);\n     -moz-box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);\n          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);\n  -webkit-transition: all 0.3s cubic-bezier(.25,.8,.25,1);\n  -o-transition: all 0.3s cubic-bezier(.25,.8,.25,1);\n  -moz-transition: all 0.3s cubic-bezier(.25,.8,.25,1);\n  transition: all 0.3s cubic-bezier(.25,.8,.25,1);\n}\n\n.shadow-1:hover {\n  -webkit-box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);\n     -moz-box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);\n          box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);\n}\n\n.shadow-2 {\n  -webkit-box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\n     -moz-box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\n          box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\n}\n\n.shadow-3 {\n  -webkit-box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);\n     -moz-box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);\n          box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);\n}\n\n.shadow-4 {\n  -webkit-box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);\n     -moz-box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);\n          box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);\n}\n\n.shadow-5 {\n  -webkit-box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);\n     -moz-box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);\n          box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);\n}\n", ""]);

// exports


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "progress,sub,sup{vertical-align:baseline}button,hr,input{overflow:visible}html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0} figcaption, menu,article,aside,details,figure,footer,header,main,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block}audio:not([controls]){display:none;height:0} [hidden],template{display:none}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}svg:not(:root){overflow:hidden}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}figure{margin:1em 40px}hr{box-sizing:content-box;height:0}button,input,select,textarea{font:inherit;margin:0}optgroup{font-weight:700}button,input{}button,select{text-transform:none}[type=submit], [type=reset],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:ButtonText dotted 1px}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}\n", ""]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(19);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!./icons.css", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/lib/index.js!./icons.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(20);
exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "/* fallback */\n@font-face {\n  font-family: 'Material Icons';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Material Icons'), local('MaterialIcons-Regular'), url(" + escape(__webpack_require__(21)) + ") format('woff2');\n}\n\n.material-icons {\n  font-family: 'Material Icons';\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-feature-settings: 'liga';\n  -moz-font-feature-settings: 'liga';\n       font-feature-settings: 'liga';\n  -webkit-font-smoothing: antialiased;\n}\n", ""]);

// exports


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "cdf5969b7a910edf90bbf822a3cbc797.woff2";

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map