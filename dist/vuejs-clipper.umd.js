(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vuejs-clipper"] = factory();
	else
		root["vuejs-clipper"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "0511":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "0bd0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules//.cache//vue-loader","cacheIdentifier":"47426207-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/clipper-preview.vue?vue&type=template&id=2a70d6c1&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"preview"},[_c('div',{staticClass:"wrap",style:(_vm.wrapStyle)},[_c('canvas',{staticClass:"shim",attrs:{"width":_vm.outerWidth,"height":_vm.outerHeight}}),_c('div',{staticClass:"img-pos",style:(_vm.styleObj)},[_c('div',{staticClass:"img-rotate",style:(_vm.rotateStyle)},[_c('img',{staticClass:"img",attrs:{"src":_vm.src},on:{"load":_vm.imgLoaded}})])])]),_c('div',{staticClass:"placeholder",style:(_vm.eptStyle)},[_vm._t("placeholder")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/clipper-preview.vue?vue&type=template&id=2a70d6c1&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./src/namespace.js
var namespace = __webpack_require__("0f53");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/clipper-preview.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var clipper_previewvue_type_script_lang_js_ = ({
  mounted: function mounted() {
    this.imgEl = this.$el.querySelector(".img");
    this.initListener();
  },
  data: function data() {
    return {
      src: '',
      imgEl: null,
      imgWidth: 1,
      imgHeight: 1,
      outerWidth: 1,
      outerHeight: 1,
      bgColor: 'white',
      pos: {},
      rotate: 0
    };
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    initListener: function initListener() {
      //set listener on parent
      var parent = this.$parent;
      var parentPropName = namespace["a" /* default */].parentPropName;
      if (!parent[parentPropName]) parent[parentPropName] = {};
      if (!parent[parentPropName][this.name]) parent[parentPropName][this.name] = [];
      var listeners = parent[parentPropName][this.name];
      listeners.push(this);
    },
    setData: function setData(datasets) {
      for (var k in datasets) {
        this[k] = datasets[k];
      }
    },
    imgLoaded: function imgLoaded() {
      this.imgWidth = this.imgEl.naturalWidth;
      this.imgHeight = this.imgEl.naturalHeight;
    },
    locateImage: function locateImage(pos, rotate) {
      this.rotate = rotate;
      this.outerWidth = pos.swidth;
      this.outerHeight = pos.sheight;
      this.pos = pos;
    }
  },
  computed: {
    styleObj: function styleObj() {
      var left = this.pos.sx / this.imgWidth;
      var top = this.pos.sy / this.imgHeight;
      var width = this.imgWidth / this.pos.swidth;
      return {
        transform: "scale(".concat(width, ") translate(").concat(left * -100, "% ,").concat(top * -100, "%)")
      };
    },
    rotateStyle: function rotateStyle() {
      return {
        transform: "rotate(".concat(this.rotate, "deg)")
      };
    },
    wrapStyle: function wrapStyle() {
      var display = this.src ? 'block' : 'none';
      return {
        backgroundColor: this.bgColor,
        display: display
      };
    },
    eptStyle: function eptStyle() {
      return {
        display: this.src ? 'none' : 'block'
      };
    }
  }
});
// CONCATENATED MODULE: ./src/components/clipper-preview.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_clipper_previewvue_type_script_lang_js_ = (clipper_previewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/clipper-preview.vue?vue&type=style&index=0&id=2a70d6c1&lang=scss&scoped=true&
var clipper_previewvue_type_style_index_0_id_2a70d6c1_lang_scss_scoped_true_ = __webpack_require__("1cf3");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/clipper-preview.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_clipper_previewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "2a70d6c1",
  null
  
)

component.options.__file = "clipper-preview.vue"
/* harmony default export */ var clipper_preview = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "0ca4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hostReportError; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function hostReportError(err) {
    setTimeout(function () { throw err; });
}
//# sourceMappingURL=hostReportError.js.map


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "0f53":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var namespace = {
  globMethodName: '$' + 'imageClipper',
  parentPropName: '_imgPreviewLists',
  parentDataName: '_imagePreviewData' // const globMethodName = namespace.globMethodName;
  // const parentPropName = namespace.parentPropName;

};
/* harmony default export */ __webpack_exports__["a"] = (namespace);

/***/ }),

/***/ "1169":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("2d95");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "127f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getSymbolIterator */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return iterator; });
/* unused harmony export $$iterator */
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator = /*@__PURE__*/ getSymbolIterator();
var $$iterator = iterator;
//# sourceMappingURL=iterator.js.map


/***/ }),

/***/ "1453":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subscriber; });
/* unused harmony export SafeSubscriber */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9ab4");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("d817");
/* harmony import */ var _Observer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("e9a8");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("a6e8");
/* harmony import */ var _internal_symbol_rxSubscriber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("2ff5");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("88bc");
/* harmony import */ var _util_hostReportError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("0ca4");
/** PURE_IMPORTS_START tslib,_util_isFunction,_Observer,_Subscription,_internal_symbol_rxSubscriber,_config,_util_hostReportError PURE_IMPORTS_END */







var Subscriber = /*@__PURE__*/ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](Subscriber, _super);
    function Subscriber(destinationOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this.syncErrorValue = null;
        _this.syncErrorThrown = false;
        _this.syncErrorThrowable = false;
        _this.isStopped = false;
        _this._parentSubscription = null;
        switch (arguments.length) {
            case 0:
                _this.destination = _Observer__WEBPACK_IMPORTED_MODULE_2__[/* empty */ "a"];
                break;
            case 1:
                if (!destinationOrNext) {
                    _this.destination = _Observer__WEBPACK_IMPORTED_MODULE_2__[/* empty */ "a"];
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (isTrustedSubscriber(destinationOrNext)) {
                        var trustedSubscriber = destinationOrNext[_internal_symbol_rxSubscriber__WEBPACK_IMPORTED_MODULE_4__[/* rxSubscriber */ "a"]]();
                        _this.syncErrorThrowable = trustedSubscriber.syncErrorThrowable;
                        _this.destination = trustedSubscriber;
                        trustedSubscriber._addParentTeardownLogic(_this);
                    }
                    else {
                        _this.syncErrorThrowable = true;
                        _this.destination = new SafeSubscriber(_this, destinationOrNext);
                    }
                    break;
                }
            default:
                _this.syncErrorThrowable = true;
                _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
                break;
        }
        return _this;
    }
    Subscriber.prototype[_internal_symbol_rxSubscriber__WEBPACK_IMPORTED_MODULE_4__[/* rxSubscriber */ "a"]] = function () { return this; };
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
            this._unsubscribeParentSubscription();
        }
    };
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
            this._unsubscribeParentSubscription();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._addParentTeardownLogic = function (parentTeardownLogic) {
        if (parentTeardownLogic !== this) {
            this._parentSubscription = this.add(parentTeardownLogic);
        }
    };
    Subscriber.prototype._unsubscribeParentSubscription = function () {
        if (this._parentSubscription !== null) {
            this._parentSubscription.unsubscribe();
        }
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        this._parentSubscription = null;
        return this;
    };
    return Subscriber;
}(_Subscription__WEBPACK_IMPORTED_MODULE_3__[/* Subscription */ "a"]));

var SafeSubscriber = /*@__PURE__*/ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this._parentSubscriber = _parentSubscriber;
        var next;
        var context = _this;
        if (Object(_util_isFunction__WEBPACK_IMPORTED_MODULE_1__[/* isFunction */ "a"])(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== _Observer__WEBPACK_IMPORTED_MODULE_2__[/* empty */ "a"]) {
                context = Object.create(observerOrNext);
                if (Object(_util_isFunction__WEBPACK_IMPORTED_MODULE_1__[/* isFunction */ "a"])(context.unsubscribe)) {
                    _this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = _this.unsubscribe.bind(_this);
            }
        }
        _this._context = context;
        _this._next = next;
        _this._error = error;
        _this._complete = complete;
        return _this;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!_config__WEBPACK_IMPORTED_MODULE_5__[/* config */ "a"].useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            var useDeprecatedSynchronousErrorHandling = _config__WEBPACK_IMPORTED_MODULE_5__[/* config */ "a"].useDeprecatedSynchronousErrorHandling;
            if (this._error) {
                if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                if (useDeprecatedSynchronousErrorHandling) {
                    throw err;
                }
                Object(_util_hostReportError__WEBPACK_IMPORTED_MODULE_6__[/* hostReportError */ "a"])(err);
            }
            else {
                if (useDeprecatedSynchronousErrorHandling) {
                    _parentSubscriber.syncErrorValue = err;
                    _parentSubscriber.syncErrorThrown = true;
                }
                else {
                    Object(_util_hostReportError__WEBPACK_IMPORTED_MODULE_6__[/* hostReportError */ "a"])(err);
                }
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!_config__WEBPACK_IMPORTED_MODULE_5__[/* config */ "a"].useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            if (_config__WEBPACK_IMPORTED_MODULE_5__[/* config */ "a"].useDeprecatedSynchronousErrorHandling) {
                throw err;
            }
            else {
                Object(_util_hostReportError__WEBPACK_IMPORTED_MODULE_6__[/* hostReportError */ "a"])(err);
            }
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        if (!_config__WEBPACK_IMPORTED_MODULE_5__[/* config */ "a"].useDeprecatedSynchronousErrorHandling) {
            throw new Error('bad call');
        }
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            if (_config__WEBPACK_IMPORTED_MODULE_5__[/* config */ "a"].useDeprecatedSynchronousErrorHandling) {
                parent.syncErrorValue = err;
                parent.syncErrorThrown = true;
                return true;
            }
            else {
                Object(_util_hostReportError__WEBPACK_IMPORTED_MODULE_6__[/* hostReportError */ "a"])(err);
                return true;
            }
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));

function isTrustedSubscriber(obj) {
    return obj instanceof Subscriber || ('_addParentTeardownLogic' in obj && obj[_internal_symbol_rxSubscriber__WEBPACK_IMPORTED_MODULE_4__[/* rxSubscriber */ "a"]]);
}
//# sourceMappingURL=Subscriber.js.map


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "1716":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return subscribeTo; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e9b9");
/* harmony import */ var _subscribeToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("fad2");
/* harmony import */ var _subscribeToPromise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("4b95");
/* harmony import */ var _subscribeToIterable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("bbae");
/* harmony import */ var _subscribeToObservable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("25c4");
/* harmony import */ var _isArrayLike__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("d9e3");
/* harmony import */ var _isPromise__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("fd66");
/* harmony import */ var _isObject__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("31c4");
/* harmony import */ var _symbol_iterator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("127f");
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("c539");
/** PURE_IMPORTS_START _Observable,_subscribeToArray,_subscribeToPromise,_subscribeToIterable,_subscribeToObservable,_isArrayLike,_isPromise,_isObject,_symbol_iterator,_symbol_observable PURE_IMPORTS_END */










var subscribeTo = function (result) {
    if (result instanceof _Observable__WEBPACK_IMPORTED_MODULE_0__[/* Observable */ "a"]) {
        return function (subscriber) {
            if (result._isScalar) {
                subscriber.next(result.value);
                subscriber.complete();
                return undefined;
            }
            else {
                return result.subscribe(subscriber);
            }
        };
    }
    else if (result && typeof result[_symbol_observable__WEBPACK_IMPORTED_MODULE_9__[/* observable */ "a"]] === 'function') {
        return Object(_subscribeToObservable__WEBPACK_IMPORTED_MODULE_4__[/* subscribeToObservable */ "a"])(result);
    }
    else if (Object(_isArrayLike__WEBPACK_IMPORTED_MODULE_5__[/* isArrayLike */ "a"])(result)) {
        return Object(_subscribeToArray__WEBPACK_IMPORTED_MODULE_1__[/* subscribeToArray */ "a"])(result);
    }
    else if (Object(_isPromise__WEBPACK_IMPORTED_MODULE_6__[/* isPromise */ "a"])(result)) {
        return Object(_subscribeToPromise__WEBPACK_IMPORTED_MODULE_2__[/* subscribeToPromise */ "a"])(result);
    }
    else if (result && typeof result[_symbol_iterator__WEBPACK_IMPORTED_MODULE_8__[/* iterator */ "a"]] === 'function') {
        return Object(_subscribeToIterable__WEBPACK_IMPORTED_MODULE_3__[/* subscribeToIterable */ "a"])(result);
    }
    else {
        var value = Object(_isObject__WEBPACK_IMPORTED_MODULE_7__[/* isObject */ "a"])(result) ? 'an invalid object' : "'" + result + "'";
        var msg = "You provided " + value + " where a stream was expected."
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        throw new TypeError(msg);
    }
};
//# sourceMappingURL=subscribeTo.js.map


/***/ }),

/***/ "1cf3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_clipper_preview_vue_vue_type_style_index_0_id_2a70d6c1_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d24b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_clipper_preview_vue_vue_type_style_index_0_id_2a70d6c1_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_clipper_preview_vue_vue_type_style_index_0_id_2a70d6c1_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_clipper_preview_vue_vue_type_style_index_0_id_2a70d6c1_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "1eb2":
/***/ (function(module, exports, __webpack_require__) {

// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}


/***/ }),

/***/ "2144":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fromArray; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e9b9");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("a6e8");
/* harmony import */ var _util_subscribeToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("fad2");
/** PURE_IMPORTS_START _Observable,_Subscription,_util_subscribeToArray PURE_IMPORTS_END */



function fromArray(input, scheduler) {
    if (!scheduler) {
        return new _Observable__WEBPACK_IMPORTED_MODULE_0__[/* Observable */ "a"](Object(_util_subscribeToArray__WEBPACK_IMPORTED_MODULE_2__[/* subscribeToArray */ "a"])(input));
    }
    else {
        return new _Observable__WEBPACK_IMPORTED_MODULE_0__[/* Observable */ "a"](function (subscriber) {
            var sub = new _Subscription__WEBPACK_IMPORTED_MODULE_1__[/* Subscription */ "a"]();
            var i = 0;
            sub.add(scheduler.schedule(function () {
                if (i === input.length) {
                    subscriber.complete();
                    return;
                }
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    sub.add(this.schedule());
                }
            }));
            return sub;
        });
    }
}
//# sourceMappingURL=fromArray.js.map


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "25c4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return subscribeToObservable; });
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c539");
/** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */

var subscribeToObservable = function (obj) {
    return function (subscriber) {
        var obs = obj[_symbol_observable__WEBPACK_IMPORTED_MODULE_0__[/* observable */ "a"]]();
        if (typeof obs.subscribe !== 'function') {
            throw new TypeError('Provided object does not correctly implement Symbol.observable');
        }
        else {
            return obs.subscribe(subscriber);
        }
    };
};
//# sourceMappingURL=subscribeToObservable.js.map


/***/ }),

/***/ "2621":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "2877":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2bd2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__("9ab4");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Observable.js + 2 modules
var Observable = __webpack_require__("e9b9");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Subscriber.js
var Subscriber = __webpack_require__("1453");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Subscription.js + 3 modules
var Subscription = __webpack_require__("a6e8");

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function ObjectUnsubscribedErrorImpl() {
    Error.call(this);
    this.message = 'object unsubscribed';
    this.name = 'ObjectUnsubscribedError';
    return this;
}
ObjectUnsubscribedErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;
//# sourceMappingURL=ObjectUnsubscribedError.js.map

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/SubjectSubscription.js
/** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */


var SubjectSubscription_SubjectSubscription = /*@__PURE__*/ (function (_super) {
    tslib_es6["a" /* __extends */](SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        var _this = _super.call(this) || this;
        _this.subject = subject;
        _this.subscriber = subscriber;
        _this.closed = false;
        return _this;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(Subscription["a" /* Subscription */]));

//# sourceMappingURL=SubjectSubscription.js.map

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js
var rxSubscriber = __webpack_require__("2ff5");

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/Subject.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Subject_SubjectSubscriber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subject_Subject; });
/* unused harmony export AnonymousSubject */
/** PURE_IMPORTS_START tslib,_Observable,_Subscriber,_Subscription,_util_ObjectUnsubscribedError,_SubjectSubscription,_internal_symbol_rxSubscriber PURE_IMPORTS_END */







var Subject_SubjectSubscriber = /*@__PURE__*/ (function (_super) {
    tslib_es6["a" /* __extends */](SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        return _this;
    }
    return SubjectSubscriber;
}(Subscriber["a" /* Subscriber */]));

var Subject_Subject = /*@__PURE__*/ (function (_super) {
    tslib_es6["a" /* __extends */](Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.observers = [];
        _this.closed = false;
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype[rxSubscriber["a" /* rxSubscriber */]] = function () {
        return new Subject_SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new Subject_AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        else {
            return _super.prototype._trySubscribe.call(this, subscriber);
        }
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription["a" /* Subscription */].EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return Subscription["a" /* Subscription */].EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new SubjectSubscription_SubjectSubscription(this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable["a" /* Observable */]();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new Subject_AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable["a" /* Observable */]));

var Subject_AnonymousSubject = /*@__PURE__*/ (function (_super) {
    tslib_es6["a" /* __extends */](AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return Subscription["a" /* Subscription */].EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject_Subject));

//# sourceMappingURL=Subject.js.map


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2ff5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return rxSubscriber; });
/* unused harmony export $$rxSubscriber */
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function')
    ? /*@__PURE__*/ Symbol.for('rxSubscriber')
    : '@@rxSubscriber';
var $$rxSubscriber = rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map


/***/ }),

/***/ "3060":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OuterSubscriber; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9ab4");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("1453");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


var OuterSubscriber = /*@__PURE__*/ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](OuterSubscriber, _super);
    function OuterSubscriber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
    };
    return OuterSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__[/* Subscriber */ "a"]));

//# sourceMappingURL=OuterSubscriber.js.map


/***/ }),

/***/ "31c4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isObject; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isObject(x) {
    return x != null && typeof x === 'object';
}
//# sourceMappingURL=isObject.js.map


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "37c8":
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__("2b4c");


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "3a72":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var LIBRARY = __webpack_require__("2d00");
var wksExt = __webpack_require__("37c8");
var defineProperty = __webpack_require__("86cc").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "3e18":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return concatMap; });
/* harmony import */ var _mergeMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a6c5");
/** PURE_IMPORTS_START _mergeMap PURE_IMPORTS_END */

function concatMap(project, resultSelector) {
    return Object(_mergeMap__WEBPACK_IMPORTED_MODULE_0__[/* mergeMap */ "a"])(project, resultSelector, 1);
}
//# sourceMappingURL=concatMap.js.map


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4b95":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return subscribeToPromise; });
/* harmony import */ var _hostReportError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0ca4");
/** PURE_IMPORTS_START _hostReportError PURE_IMPORTS_END */

var subscribeToPromise = function (promise) {
    return function (subscriber) {
        promise.then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, _hostReportError__WEBPACK_IMPORTED_MODULE_0__[/* hostReportError */ "a"]);
        return subscriber;
    };
};
//# sourceMappingURL=subscribeToPromise.js.map


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "4d82":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Observable.js + 2 modules
var Observable = __webpack_require__("e9b9");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/isScheduler.js
var isScheduler = __webpack_require__("9e46");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/mergeAll.js + 1 modules
var mergeAll = __webpack_require__("667f");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/fromArray.js
var fromArray = __webpack_require__("2144");

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/merge.js
/** PURE_IMPORTS_START _Observable,_util_isScheduler,_operators_mergeAll,_fromArray PURE_IMPORTS_END */




function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    var concurrent = Number.POSITIVE_INFINITY;
    var scheduler = null;
    var last = observables[observables.length - 1];
    if (Object(isScheduler["a" /* isScheduler */])(last)) {
        scheduler = observables.pop();
        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
            concurrent = observables.pop();
        }
    }
    else if (typeof last === 'number') {
        concurrent = observables.pop();
    }
    if (scheduler === null && observables.length === 1 && observables[0] instanceof Observable["a" /* Observable */]) {
        return observables[0];
    }
    return Object(mergeAll["a" /* mergeAll */])(concurrent)(Object(fromArray["a" /* fromArray */])(observables, scheduler));
}
//# sourceMappingURL=merge.js.map

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/merge.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return merge_merge; });
/** PURE_IMPORTS_START _observable_merge PURE_IMPORTS_END */

function merge_merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    return function (source) { return source.lift.call(merge.apply(void 0, [source].concat(observables))); };
}
//# sourceMappingURL=merge.js.map


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "5438":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5670":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return filter; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9ab4");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("1453");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function filter(predicate, thisArg) {
    return function filterOperatorFunction(source) {
        return source.lift(new FilterOperator(predicate, thisArg));
    };
}
var FilterOperator = /*@__PURE__*/ (function () {
    function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
}());
var FilterSubscriber = /*@__PURE__*/ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.thisArg = thisArg;
        _this.count = 0;
        return _this;
    }
    FilterSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    };
    return FilterSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__[/* Subscriber */ "a"]));
//# sourceMappingURL=filter.js.map


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "5e26":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules//.cache//vue-loader","cacheIdentifier":"47426207-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/clipper-range.vue?vue&type=template&id=1f0da112&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"clipper-range"},[_c('div',{directives:[{name:"stream",rawName:"v-stream:mousedown",value:(_vm.mousedown$),expression:"mousedown$",arg:"mousedown"},{name:"stream",rawName:"v-stream:touchstart",value:(_vm.touchstart$),expression:"touchstart$",arg:"touchstart"}],staticClass:"wrap"},[_c('div',{staticClass:"stick"}),_c('div',{staticClass:"bar",style:(_vm.barStyle)})])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/clipper-range.vue?vue&type=template&id=1f0da112&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/map.js
var map = __webpack_require__("ebb6");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/concatMap.js
var concatMap = __webpack_require__("3e18");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/takeUntil.js
var takeUntil = __webpack_require__("9f2d");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/merge.js + 1 modules
var merge = __webpack_require__("4d82");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/startWith.js + 5 modules
var startWith = __webpack_require__("a744");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Subject.js + 2 modules
var Subject = __webpack_require__("2bd2");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/fromEvent.js
var fromEvent = __webpack_require__("6e77");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/clipper-range.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var clipper_rangevue_type_script_lang_js_ = ({
  domStreams: ["mousedown$", "touchstart$"],
  subscriptions: function subscriptions() {
    var _this = this;

    this.init$ = new Subject["a" /* Subject */]();
    this.mouseup$ = Object(fromEvent["a" /* fromEvent */])(window, "mouseup");
    this.mousemove$ = Object(fromEvent["a" /* fromEvent */])(window, "mousemove");
    this.touchmove$ = Object(fromEvent["a" /* fromEvent */])(window, "touchmove", {
      passive: false
    });
    this.touchend$ = Object(fromEvent["a" /* fromEvent */])(window, "touchend", {
      passive: false
    });
    this.mouseEvent$ = this.mousedown$.pipe(Object(map["a" /* map */])(function (e) {
      e.event.preventDefault();
      return e.event;
    }), Object(concatMap["a" /* concatMap */])(function (e) {
      return _this.mousemove$.pipe(Object(takeUntil["a" /* takeUntil */])(_this.mouseup$), Object(map["a" /* map */])(function (e) {
        return e.clientX;
      }));
    }), Object(merge["a" /* merge */])(this.mousedown$.pipe(Object(map["a" /* map */])(function (e) {
      return e.event.clientX;
    }))));
    this.touchEvent$ = this.touchstart$.pipe(Object(map["a" /* map */])(function (e) {
      e.event.preventDefault();
      return e.event;
    }), Object(concatMap["a" /* concatMap */])(function (e) {
      return _this.touchmove$.pipe(Object(takeUntil["a" /* takeUntil */])(_this.touchend$), Object(map["a" /* map */])(function (e) {
        return e.touches[0].clientX;
      }));
    }), Object(merge["a" /* merge */])(this.touchstart$.pipe(Object(map["a" /* map */])(function (e) {
      return e.event.touches[0].clientX;
    }))));
    this.dragSubject$ = new Subject["a" /* Subject */]().pipe(Object(merge["a" /* merge */])(this.mouseEvent$), Object(merge["a" /* merge */])(this.touchEvent$), Object(map["a" /* map */])(this.getLeftPercent), Object(startWith["a" /* startWith */])(0), Object(merge["a" /* merge */])(this.init$));
    return {
      x$: this.dragSubject$
    };
  },
  mounted: function mounted() {
    var _this2 = this;

    this.initVal();
    this.$subscribeTo(this.dragSubject$, function (val) {
      _this2.$emit("input", _this2.val);
    });
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 10
    },
    min: {
      type: Number,
      default: 0
    }
  },
  computed: {
    barStyle: function barStyle() {
      return {
        left: "".concat(this.x$ * 100, "%")
      };
    },
    val: function val() {
      var range = this.max - this.min;
      var pos = this.getPos();
      var stickPos = pos.stickPos,
          maxLeft = pos.maxLeft;
      return this.x$ * stickPos.width / maxLeft * range + this.min;
    }
  },
  methods: {
    getPos: function getPos() {
      var stickPos = this.$el.querySelector(".stick").getBoundingClientRect();
      var barPos = this.$el.querySelector(".bar").getBoundingClientRect();
      return {
        maxLeft: stickPos.width - barPos.width,
        stickPos: stickPos,
        barPos: barPos
      };
    },
    getLeftPercent: function getLeftPercent(x) {
      var stickPos = this.$el.querySelector(".stick").getBoundingClientRect();
      var barPos = this.$el.querySelector(".bar").getBoundingClientRect();
      var maxLeft = stickPos.width - barPos.width;
      var left = Math.max(Math.min(x - stickPos.left, maxLeft), 0);
      return left / stickPos.width;
    },
    initVal: function initVal() {
      var range = this.max - this.min;
      var percent = (this.value - this.min) / range;
      var pos = this.getPos();
      this.init$.next(percent * pos.maxLeft / pos.stickPos.width);
    }
  }
});
// CONCATENATED MODULE: ./src/components/clipper-range.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_clipper_rangevue_type_script_lang_js_ = (clipper_rangevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/clipper-range.vue?vue&type=style&index=0&id=1f0da112&lang=scss&scoped=true&
var clipper_rangevue_type_style_index_0_id_1f0da112_lang_scss_scoped_true_ = __webpack_require__("f298");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/clipper-range.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_clipper_rangevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "1f0da112",
  null
  
)

component.options.__file = "clipper-range.vue"
/* harmony default export */ var clipper_range = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "667f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/mergeMap.js
var mergeMap = __webpack_require__("a6c5");

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/identity.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function identity(x) {
    return x;
}
//# sourceMappingURL=identity.js.map

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/mergeAll.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mergeAll; });
/** PURE_IMPORTS_START _mergeMap,_util_identity PURE_IMPORTS_END */


function mergeAll(concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    return Object(mergeMap["a" /* mergeMap */])(identity, concurrent);
}
//# sourceMappingURL=mergeAll.js.map


/***/ }),

/***/ "67ab":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("ca5a")('meta');
var isObject = __webpack_require__("d3f4");
var has = __webpack_require__("69a8");
var setDesc = __webpack_require__("86cc").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("79e5")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "6888":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7f7f");
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_clipper_preview_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("0bd0");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _components_clipper_preview_vue__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony import */ var _components_clipper_range_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("5e26");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "d", function() { return _components_clipper_range_vue__WEBPACK_IMPORTED_MODULE_2__["a"]; });

/* harmony import */ var _components_clipper_basic_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("7650");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _components_clipper_basic_vue__WEBPACK_IMPORTED_MODULE_3__["a"]; });

/* harmony import */ var _components_clipper_fixed_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("f04f");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _components_clipper_fixed_vue__WEBPACK_IMPORTED_MODULE_4__["a"]; });

/* harmony import */ var vue_rx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("ce19");
/* harmony import */ var _namespace__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("0f53");








var install = function install(Vue, options) {
  //vue-rx
  Vue.use(vue_rx__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]);
  var components = {
    clipperBasic: {
      component: _components_clipper_basic_vue__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"],
      name: 'clipper-basic'
    },
    clipperPreview: {
      component: _components_clipper_preview_vue__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"],
      name: 'clipper-preview'
    },
    clipperRange: {
      component: _components_clipper_range_vue__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"],
      name: 'clipper-range'
    },
    clipperFixed: {
      component: _components_clipper_fixed_vue__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"],
      name: 'clipper-fixed'
    }
  };

  var registerComponent = function registerComponent(name) {
    Vue.component(components[name].name, components[name].component);
  };

  options = options || {};
  _namespace__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].parentPropName = options.parentPropName || _namespace__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].parentPropName;
  _namespace__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].globMethodName = options.globMethodName || _namespace__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].globMethodName;
  options.components = options.components === undefined ? components : options.components; //if no components property, register all component

  for (var k in options.components) {
    if (!components[k]) throw "Invalid components \"".concat(k, "\" in vurjs-clipper plugin");
    components[k].name = typeof options.components[k] === 'string' ? options.components[k] : components[k].name;
    registerComponent(k);
  }
};

var plugin = {
  install: install
};
/* harmony default export */ __webpack_exports__["e"] = (plugin); //script include auto plugin

var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6e77":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fromEvent; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e9b9");
/* harmony import */ var _util_isArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("8ac6");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("d817");
/* harmony import */ var _operators_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("ebb6");
/** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */




var toString = Object.prototype.toString;
function fromEvent(target, eventName, options, resultSelector) {
    if (Object(_util_isFunction__WEBPACK_IMPORTED_MODULE_2__[/* isFunction */ "a"])(options)) {
        resultSelector = options;
        options = undefined;
    }
    if (resultSelector) {
        return fromEvent(target, eventName, options).pipe(Object(_operators_map__WEBPACK_IMPORTED_MODULE_3__[/* map */ "a"])(function (args) { return Object(_util_isArray__WEBPACK_IMPORTED_MODULE_1__[/* isArray */ "a"])(args) ? resultSelector.apply(void 0, args) : resultSelector(args); }));
    }
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__[/* Observable */ "a"](function (subscriber) {
        function handler(e) {
            if (arguments.length > 1) {
                subscriber.next(Array.prototype.slice.call(arguments));
            }
            else {
                subscriber.next(e);
            }
        }
        setupSubscription(target, eventName, handler, subscriber, options);
    });
}
function setupSubscription(sourceObj, eventName, handler, subscriber, options) {
    var unsubscribe;
    if (isEventTarget(sourceObj)) {
        var source_1 = sourceObj;
        sourceObj.addEventListener(eventName, handler, options);
        unsubscribe = function () { return source_1.removeEventListener(eventName, handler, options); };
    }
    else if (isJQueryStyleEventEmitter(sourceObj)) {
        var source_2 = sourceObj;
        sourceObj.on(eventName, handler);
        unsubscribe = function () { return source_2.off(eventName, handler); };
    }
    else if (isNodeStyleEventEmitter(sourceObj)) {
        var source_3 = sourceObj;
        sourceObj.addListener(eventName, handler);
        unsubscribe = function () { return source_3.removeListener(eventName, handler); };
    }
    else if (sourceObj && sourceObj.length) {
        for (var i = 0, len = sourceObj.length; i < len; i++) {
            setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
        }
    }
    else {
        throw new TypeError('Invalid event target');
    }
    subscriber.add(unsubscribe);
}
function isNodeStyleEventEmitter(sourceObj) {
    return sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
}
function isJQueryStyleEventEmitter(sourceObj) {
    return sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
}
function isEventTarget(sourceObj) {
    return sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
}
//# sourceMappingURL=fromEvent.js.map


/***/ }),

/***/ "7333":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__("0d58");
var gOPS = __webpack_require__("2621");
var pIE = __webpack_require__("52a7");
var toObject = __webpack_require__("4bf8");
var IObject = __webpack_require__("626a");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("79e5")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "7650":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules//.cache//vue-loader","cacheIdentifier":"47426207-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/clipper-basic.vue?vue&type=template&id=7a87f694&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"clipper-basic"},[_c('canvas',{staticClass:"hidden-canvas"}),_c('div',{staticClass:"clip-area",style:(_vm.areaStyle)},[_c('div',{staticClass:"img-scale",style:(_vm.scaleStyle)},[_c('img',{staticClass:"img",style:(_vm.rotateStyle),attrs:{"src":_vm.src},on:{"load":_vm.imgLoaded}})]),_c('div',{staticClass:"zoom-area shadow",style:(_vm.posObj)},[_c('div',{staticClass:"extend outer",style:(_vm.exOuterStyle)}),_c('div',{staticClass:"extend inner",style:(_vm.exInnerStyle)},[_c('div',{staticClass:"drag-inset"})]),_vm._l((4),function(index){return (_vm.corner)?_c('div',{key:'corner'+index,staticClass:"corner",class:("corner" + index)}):_vm._e()}),(_vm.grid)?_c('div',{staticClass:"grid"},_vm._l((4),function(index){return _c('div',{key:'gridItem'+index,staticClass:"grid-item"})})):_vm._e(),_vm._t("area")],2)]),_c('div',{staticClass:"placeholder",style:(_vm.eptStyle)},[_vm._t("placeholder")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/clipper-basic.vue?vue&type=template&id=7a87f694&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// EXTERNAL MODULE: ./src/components/extends/clippo.js + 4 modules
var clippo = __webpack_require__("bc00");

// EXTERNAL MODULE: ./src/namespace.js
var namespace = __webpack_require__("0f53");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Subject.js + 2 modules
var Subject = __webpack_require__("2bd2");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/map.js
var map = __webpack_require__("ebb6");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/merge.js + 1 modules
var merge = __webpack_require__("4d82");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/filter.js
var filter = __webpack_require__("5670");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/concatMap.js
var concatMap = __webpack_require__("3e18");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/takeUntil.js
var takeUntil = __webpack_require__("9f2d");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/startWith.js + 5 modules
var startWith = __webpack_require__("a744");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/clipper-basic.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var clipper_basicvue_type_script_lang_js_ = ({
  extends: {
    methods: clippo["a" /* basicMethods */],
    mixins: [clippo["d" /* rxEventListeners */], clippo["c" /* pluginMethods */]] //mousedown$,mousemove$...

  },
  subscriptions: function subscriptions() {
    var _this = this;

    this.onchange$ = new Subject["a" /* Subject */](); //set value

    this.setTL$ = new Subject["a" /* Subject */]();
    this.initWHTL$ = new Subject["a" /* Subject */]().pipe(Object(map["a" /* map */])(this.$set_initWHTL)); //interupter

    this.stop$ = new Subject["a" /* Subject */]();
    /* events */

    this.mousedownDrag$ = new Subject["a" /* Subject */]().pipe( //moving left, top
    Object(merge["a" /* merge */])(this.mousedown$), Object(filter["a" /* filter */])(this.isDragElement), Object(map["a" /* map */])(function (e) {
      e.preventDefault();
      return e;
    }), //deal with down, we want to calc down just for once.
    Object(map["a" /* map */])(function (e) {
      return _this.eInZoom(e);
    }), //點擊時zoom的position,rect
    Object(concatMap["a" /* concatMap */])( //將down (zoom rect), move交給後續
    function (e) {
      return _this.mousemove$.pipe(Object(takeUntil["a" /* takeUntil */])(_this.mouseup$));
    }, function (down, move) {
      return {
        down: down,
        move: move
      };
    }));
    this.touchdownDrag$ = this.touchstart$.pipe(Object(filter["a" /* filter */])(this.isDragElement), Object(filter["a" /* filter */])(function (e) {
      return e.touches.length === 1;
    }), //單指
    Object(map["a" /* map */])(function (e) {
      e.preventDefault();
      return e;
    }), //deal with down, we want to calc down just for once.
    Object(map["a" /* map */])(function (e) {
      return _this.eInZoom(e.touches[0]);
    }), Object(concatMap["a" /* concatMap */])(function (e) {
      return _this.touchmove$.pipe(Object(takeUntil["a" /* takeUntil */])(_this.touchend$), Object(filter["a" /* filter */])(function (e) {
        return e.touches.length === 1;
      }), //單指
      Object(map["a" /* map */])(function (e) {
        return e.touches[0];
      }));
    }, function (down, move) {
      return {
        down: down,
        move: move
      };
    }));
    this.mousedownZoom$ = new Subject["a" /* Subject */]().pipe(Object(merge["a" /* merge */])(this.mousedown$), Object(filter["a" /* filter */])(this.isZoomElement), Object(map["a" /* map */])(function (e) {
      e.preventDefault();
      return e;
    }), Object(map["a" /* map */])(this.setDownPosition), Object(concatMap["a" /* concatMap */])(function (e) {
      return _this.mousemove$.pipe(Object(takeUntil["a" /* takeUntil */])(_this.mouseup$));
    }, function (down, move) {
      return {
        down: down,
        move: move
      };
    }));
    this.touchdownZoom$ = this.touchstart$.pipe(Object(filter["a" /* filter */])(this.isZoomElement), Object(filter["a" /* filter */])(function (e) {
      return e.touches.length === 1;
    }), Object(map["a" /* map */])(function (e) {
      e.preventDefault();
      return e.touches[0];
    }), Object(map["a" /* map */])(this.setDownPosition), Object(concatMap["a" /* concatMap */])(function (e) {
      return _this.touchmove$.pipe(Object(takeUntil["a" /* takeUntil */])(_this.touchend$), Object(filter["a" /* filter */])(function (e) {
        return e.touches.length === 1;
      }), Object(map["a" /* map */])(function (e) {
        return e.touches[0];
      }));
    }, function (down, move) {
      return {
        down: down,
        move: move
      };
    }));
    this.touchTwoFingersZoom$ = this.touchstart$.pipe(Object(filter["a" /* filter */])(function (e) {
      return e.touches.length === 2;
    }), Object(filter["a" /* filter */])(this.isTwoPointZoomElement), Object(map["a" /* map */])(this.prevent), Object(map["a" /* map */])(function (e) {
      _this.stop$.next(0); //stop drag create event


      var freezeZoom = _this.zoomPos(); //get zoom position at down


      return {
        event: event,
        zoom: freezeZoom
      };
    }), Object(concatMap["a" /* concatMap */])(function (e) {
      return _this.touchmove$.pipe(Object(filter["a" /* filter */])(function (e) {
        return e.touches.length === 2;
      }), Object(map["a" /* map */])(_this.prevent), Object(takeUntil["a" /* takeUntil */])(_this.touchend$));
    }, function (down, move) {
      return _this.getTwoTouchesPos(down.event, move, down.zoom);
    }));
    this.mousedownCreate$ = this.mousedown$.pipe(Object(filter["a" /* filter */])(this.isCreateElement), Object(map["a" /* map */])(this.prevent), Object(map["a" /* map */])(this.getFakeDown), Object(concatMap["a" /* concatMap */])(function (down) {
      return _this.mousemove$.pipe(Object(takeUntil["a" /* takeUntil */])(_this.mouseup$));
    }, function (down, move) {
      return {
        down: down,
        move: move
      };
    }));
    this.touchstartCreate$ = this.touchstart$.pipe(Object(filter["a" /* filter */])(this.isCreateElement), Object(map["a" /* map */])(this.prevent), Object(map["a" /* map */])(function (e) {
      return e.touches[0];
    }), Object(map["a" /* map */])(this.getFakeDown), Object(concatMap["a" /* concatMap */])(function (down) {
      return _this.touchmove$.pipe(Object(takeUntil["a" /* takeUntil */])(_this.touchend$), Object(takeUntil["a" /* takeUntil */])(_this.stop$), //兩指事件觸發時停止
      Object(filter["a" /* filter */])(function (e) {
        return e.touches.length === 1;
      }), //單指
      Object(filter["a" /* filter */])(function (e) {
        return _this.touchCreate;
      }));
    }, function (down, move) {
      //down is fake
      return {
        down: down,
        move: move.touches[0]
      };
    }));
    /***************MAIN SUBJECT (1)************
     position: left, top, right, bottom (2 of 4)*/

    this.dragSubject$ = new Subject["a" /* Subject */]().pipe(Object(merge["a" /* merge */])(this.mousedownDrag$), Object(merge["a" /* merge */])(this.touchdownDrag$), Object(map["a" /* map */])(this.dragMoving)
    /* @down: eInZoom. @move: mouse/touch move event*/
    , Object(map["a" /* map */])(this.repositionDrag), //validate & reposition @down
    Object(merge["a" /* merge */])(this.setTL$), //this must be validate pos!!!! (in range)
    Object(startWith["a" /* startWith */])({
      left: 0,
      top: 0
    }) //vm view not init yet (this.zoomEl===null). To prevent "cannot read 'left' of undefined"
    );
    /***************MAIN SUBJECT (3)************
    Subject 3, 起始event不同，處理後傳給zoomSubject$ 
    直接subscribe() 
    */

    this.dragCreateSubject$ = this.mousedownCreate$.pipe(Object(merge["a" /* merge */])(this.touchstartCreate$), Object(map["a" /* map */])(function (_ref) {
      var down = _ref.down,
          move = _ref.move;
      return {
        down: down,
        move: move
      };
    })); //.subscribe(); //直接subscribe

    /***************MAIN SUBJECT (2)************
     width, height*/

    this.zoomSubject$ = new Subject["a" /* Subject */]().pipe(Object(merge["a" /* merge */])(this.mousedownZoom$), //mouse event
    Object(merge["a" /* merge */])(this.touchdownZoom$), // touch event 1 finger
    Object(merge["a" /* merge */])(this.dragCreateSubject$), //dragCreateSubject$
    Object(map["a" /* map */])(this.reverseDownPos), Object(map["a" /* map */])(function (_ref2) {
      var down = _ref2.down,
          move = _ref2.move;

      var fakeDown = _this.getCreatePos(down, move); //根據down, move,創造一個zoom rect (不限於一開始狀態))


      return _this.zoomingPosition(fakeDown, move); //用創造的zoom rect去計算拖拉後的位置
    }), Object(merge["a" /* merge */])(this.touchTwoFingersZoom$)
    /* touch event 2 fingers(兩指縮放)*  和上面事件分開，算法不同*/
    , Object(map["a" /* map */])(this.splitPos), Object(map["a" /* map */])(function (pos) {
      //set position
      _this.setTL$.next(_this.toPercentage(pos.tl));

      return pos.wh;
    }), Object(map["a" /* map */])(this.$set_ratioWH), Object(map["a" /* map */])(this.toPercentage), Object(startWith["a" /* startWith */])({
      width: 0,
      height: 0
    }), Object(merge["a" /* merge */])(this.initWHTL$), Object(map["a" /* map */])(function (wh) {
      return _this.$set_minWH(wh);
    }) //width,height -> 1%
    );
    return {
      //subscriptions
      zoomTL$: this.dragSubject$,
      zoomWH$: this.zoomSubject$
    };
  },
  props: {
    preview: {
      type: String
    },
    src: {
      type: String,
      default: ""
    },
    border: {
      type: Number,
      default: 1
    },
    outline: {
      type: Number,
      default: 6
    },
    corner: {
      type: Boolean,
      default: true
    },
    grid: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: "normal"
    },
    ratio: {
      type: Number
    },
    touchCreate: {
      //enable/disable create new zoom area in touch device;
      type: Boolean,
      default: true
    },
    rotate: {
      type: Number,
      default: 0
    },
    bgColor: {
      type: String,
      default: 'white'
    },
    shadow: {
      type: String,
      default: 'rgba(0, 0, 0, 0.4)'
    },
    scale: {
      type: Number,
      default: 1
    }
  },
  data: function data() {
    return {
      imgRatio: 1
    };
  },
  mounted: function mounted() {
    var _this2 = this;

    this.imgEl = this.$el.querySelector(".clipper-basic .img");
    this.canvasEl = this.$el.querySelector(".clipper-basic .hidden-canvas");
    this.areaEl = this.$el.querySelector(".clipper-basic .clip-area");
    this.zoomEl = this.$el.querySelector(".clipper-basic .zoom-area");
    this.scaleEl = this.$el.querySelector('.img-scale');

    if (this.preview) {
      this.$subscribeTo(this.dragSubject$.pipe(Object(merge["a" /* merge */])(this.onchange$)), function () {
        _this2.$nextTick(function () {
          //wait for vue render dom.
          var result = _this2.getDrawPos().pos;

          var rotate = _this2.rotate;
          if (_this2.invalidDrawPos(result)) return;

          _this2.callPreview("locateImage", result, rotate);
        });
      });
    }
  },
  methods: {
    imgLoaded: function imgLoaded() {
      //reset
      this.callPreview('setData', {
        src: this.src,
        bgColor: this.bgColor
      });
      var area = this.areaPos();
      this.imgRatio = this.imgEl.naturalWidth / this.imgEl.naturalHeight;
      this.initWHTL$.next(0);
    }
  },
  computed: {
    posObj: function posObj() {
      var style = {
        borderWidth: this.border + 'px',
        width: this.zoomWH$.width + "%",
        height: this.zoomWH$.height + "%",
        color: this.shadow,
        boxShadow: "0 0 0 " + this._shadow
      };

      for (var k in this.zoomTL$) {
        if (typeof this.zoomTL$[k] === "number") style[k] = this.zoomTL$[k] + "%";
      }

      return style;
    },
    scaleStyle: function scaleStyle() {
      this.onchange$.next(0);
      return {
        transform: "scale(".concat(this.scale, ")")
      };
    },
    rotateStyle: function rotateStyle() {
      this.onchange$.next(0);
      return {
        transform: "rotate(".concat(this.rotate, "deg)")
      };
    },
    areaStyle: function areaStyle() {
      var _border = this.border + 'px';

      var display = this.src ? 'block' : 'none';
      var backgroundColor = this.watchPreData.bgColor;
      return {
        padding: _border,
        display: display,
        backgroundColor: backgroundColor
      };
    },
    eptStyle: function eptStyle() {
      var display = this.src ? 'none' : 'block';
      return {
        display: display
      };
    },
    exOuterStyle: function exOuterStyle() {
      var _outline = this.outline + this.border + 'px';

      return {
        borderWidth: _outline,
        transform: "translate(-".concat(_outline, ",-").concat(_outline, ")")
      };
    },
    exInnerStyle: function exInnerStyle() {
      var _inline = this.outline + 'px';

      return {
        padding: _inline
      };
    },
    _shadow: function _shadow() {
      return (this.imgRatio >= 1 ? 100 : 100 / this.imgRatio) + "vw";
    },
    watchPreData: function watchPreData() {
      this.callPreview('setData', {
        bgColor: this.bgColor
      });
      return {
        bgColor: this.bgColor
      };
    }
  }
});
// CONCATENATED MODULE: ./src/components/clipper-basic.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_clipper_basicvue_type_script_lang_js_ = (clipper_basicvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/clipper-basic.vue?vue&type=style&index=0&id=7a87f694&lang=scss&scoped=true&
var clipper_basicvue_type_style_index_0_id_7a87f694_lang_scss_scoped_true_ = __webpack_require__("e581");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/clipper-basic.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_clipper_basicvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "7a87f694",
  null
  
)

component.options.__file = "clipper-basic.vue"
/* harmony default export */ var clipper_basic = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7bbc":
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__("6821");
var gOPN = __webpack_require__("9093").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "88bc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return config; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var _enable_super_gross_mode_that_will_cause_bad_things = false;
var config = {
    Promise: undefined,
    set useDeprecatedSynchronousErrorHandling(value) {
        if (value) {
            var error = /*@__PURE__*/ new Error();
            /*@__PURE__*/ console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
        }
        else if (_enable_super_gross_mode_that_will_cause_bad_things) {
            /*@__PURE__*/ console.log('RxJS: Back to a better error behavior. Thank you. <3');
        }
        _enable_super_gross_mode_that_will_cause_bad_things = value;
    },
    get useDeprecatedSynchronousErrorHandling() {
        return _enable_super_gross_mode_that_will_cause_bad_things;
    },
};
//# sourceMappingURL=config.js.map


/***/ }),

/***/ "8a81":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var DESCRIPTORS = __webpack_require__("9e1e");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var META = __webpack_require__("67ab").KEY;
var $fails = __webpack_require__("79e5");
var shared = __webpack_require__("5537");
var setToStringTag = __webpack_require__("7f20");
var uid = __webpack_require__("ca5a");
var wks = __webpack_require__("2b4c");
var wksExt = __webpack_require__("37c8");
var wksDefine = __webpack_require__("3a72");
var enumKeys = __webpack_require__("d4c0");
var isArray = __webpack_require__("1169");
var anObject = __webpack_require__("cb7c");
var isObject = __webpack_require__("d3f4");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var createDesc = __webpack_require__("4630");
var _create = __webpack_require__("2aeb");
var gOPNExt = __webpack_require__("7bbc");
var $GOPD = __webpack_require__("11e9");
var $DP = __webpack_require__("86cc");
var $keys = __webpack_require__("0d58");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__("9093").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__("52a7").f = $propertyIsEnumerable;
  __webpack_require__("2621").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__("2d00")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__("32e9")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "8ac6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isArray; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArray.js.map


/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "96cf":
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),

/***/ "9ab4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __extends; });
/* unused harmony export __assign */
/* unused harmony export __rest */
/* unused harmony export __decorate */
/* unused harmony export __param */
/* unused harmony export __metadata */
/* unused harmony export __awaiter */
/* unused harmony export __generator */
/* unused harmony export __exportStar */
/* unused harmony export __values */
/* unused harmony export __read */
/* unused harmony export __spread */
/* unused harmony export __await */
/* unused harmony export __asyncGenerator */
/* unused harmony export __asyncDelegator */
/* unused harmony export __asyncValues */
/* unused harmony export __makeTemplateObject */
/* unused harmony export __importStar */
/* unused harmony export __importDefault */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "9e46":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isScheduler; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}
//# sourceMappingURL=isScheduler.js.map


/***/ }),

/***/ "9f2d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return takeUntil; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9ab4");
/* harmony import */ var _OuterSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("3060");
/* harmony import */ var _util_subscribeToResult__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("ce8b");
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */



function takeUntil(notifier) {
    return function (source) { return source.lift(new TakeUntilOperator(notifier)); };
}
var TakeUntilOperator = /*@__PURE__*/ (function () {
    function TakeUntilOperator(notifier) {
        this.notifier = notifier;
    }
    TakeUntilOperator.prototype.call = function (subscriber, source) {
        var takeUntilSubscriber = new TakeUntilSubscriber(subscriber);
        var notifierSubscription = Object(_util_subscribeToResult__WEBPACK_IMPORTED_MODULE_2__[/* subscribeToResult */ "a"])(takeUntilSubscriber, this.notifier);
        if (notifierSubscription && !takeUntilSubscriber.seenValue) {
            takeUntilSubscriber.add(notifierSubscription);
            return source.subscribe(takeUntilSubscriber);
        }
        return takeUntilSubscriber;
    };
    return TakeUntilOperator;
}());
var TakeUntilSubscriber = /*@__PURE__*/ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](TakeUntilSubscriber, _super);
    function TakeUntilSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.seenValue = false;
        return _this;
    }
    TakeUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.seenValue = true;
        this.complete();
    };
    TakeUntilSubscriber.prototype.notifyComplete = function () {
    };
    return TakeUntilSubscriber;
}(_OuterSubscriber__WEBPACK_IMPORTED_MODULE_1__[/* OuterSubscriber */ "a"]));
//# sourceMappingURL=takeUntil.js.map


/***/ }),

/***/ "a6c5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mergeMap; });
/* unused harmony export MergeMapOperator */
/* unused harmony export MergeMapSubscriber */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9ab4");
/* harmony import */ var _util_subscribeToResult__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ce8b");
/* harmony import */ var _OuterSubscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("3060");
/* harmony import */ var _InnerSubscriber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("acf8");
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("ebb6");
/* harmony import */ var _observable_from__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("d3fb");
/** PURE_IMPORTS_START tslib,_util_subscribeToResult,_OuterSubscriber,_InnerSubscriber,_map,_observable_from PURE_IMPORTS_END */






function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    if (typeof resultSelector === 'function') {
        return function (source) { return source.pipe(mergeMap(function (a, i) { return Object(_observable_from__WEBPACK_IMPORTED_MODULE_5__[/* from */ "a"])(project(a, i)).pipe(Object(_map__WEBPACK_IMPORTED_MODULE_4__[/* map */ "a"])(function (b, ii) { return resultSelector(a, b, i, ii); })); }, concurrent)); };
    }
    else if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return function (source) { return source.lift(new MergeMapOperator(project, concurrent)); };
}
var MergeMapOperator = /*@__PURE__*/ (function () {
    function MergeMapOperator(project, concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        this.project = project;
        this.concurrent = concurrent;
    }
    MergeMapOperator.prototype.call = function (observer, source) {
        return source.subscribe(new MergeMapSubscriber(observer, this.project, this.concurrent));
    };
    return MergeMapOperator;
}());

var MergeMapSubscriber = /*@__PURE__*/ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](MergeMapSubscriber, _super);
    function MergeMapSubscriber(destination, project, concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.concurrent = concurrent;
        _this.hasCompleted = false;
        _this.buffer = [];
        _this.active = 0;
        _this.index = 0;
        return _this;
    }
    MergeMapSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            this._tryNext(value);
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeMapSubscriber.prototype._tryNext = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.active++;
        this._innerSub(result, value, index);
    };
    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
        var innerSubscriber = new _InnerSubscriber__WEBPACK_IMPORTED_MODULE_3__[/* InnerSubscriber */ "a"](this, undefined, undefined);
        this.add(innerSubscriber);
        Object(_util_subscribeToResult__WEBPACK_IMPORTED_MODULE_1__[/* subscribeToResult */ "a"])(this, ish, value, index, innerSubscriber);
    };
    MergeMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeMapSubscriber;
}(_OuterSubscriber__WEBPACK_IMPORTED_MODULE_2__[/* OuterSubscriber */ "a"]));

//# sourceMappingURL=mergeMap.js.map


/***/ }),

/***/ "a6e8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/isArray.js
var isArray = __webpack_require__("8ac6");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/isObject.js
var isObject = __webpack_require__("31c4");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/isFunction.js
var isFunction = __webpack_require__("d817");

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/errorObject.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var errorObject = { e: {} };
//# sourceMappingURL=errorObject.js.map

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/tryCatch.js
/** PURE_IMPORTS_START _errorObject PURE_IMPORTS_END */

var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject.e = e;
        return errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
//# sourceMappingURL=tryCatch.js.map

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function UnsubscriptionErrorImpl(errors) {
    Error.call(this);
    this.message = errors ?
        errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '';
    this.name = 'UnsubscriptionError';
    this.errors = errors;
    return this;
}
UnsubscriptionErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
var UnsubscriptionError = UnsubscriptionErrorImpl;
//# sourceMappingURL=UnsubscriptionError.js.map

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/Subscription.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subscription_Subscription; });
/** PURE_IMPORTS_START _util_isArray,_util_isObject,_util_isFunction,_util_tryCatch,_util_errorObject,_util_UnsubscriptionError PURE_IMPORTS_END */






var Subscription_Subscription = /*@__PURE__*/ (function () {
    function Subscription(unsubscribe) {
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        while (_parent) {
            _parent.remove(this);
            _parent = ++index < len && _parents[index] || null;
        }
        if (Object(isFunction["a" /* isFunction */])(_unsubscribe)) {
            var trial = tryCatch(_unsubscribe).call(this);
            if (trial === errorObject) {
                hasErrors = true;
                errors = errors || (errorObject.e instanceof UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject.e.errors) : [errorObject.e]);
            }
        }
        if (Object(isArray["a" /* isArray */])(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (Object(isObject["a" /* isObject */])(sub)) {
                    var trial = tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject.e;
                        if (err instanceof UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError(errors);
        }
    };
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function') {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            this._parent = parent;
        }
        else if (!_parents) {
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());

function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError) ? err.errors : err); }, []);
}
//# sourceMappingURL=Subscription.js.map


/***/ }),

/***/ "a744":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/fromArray.js
var fromArray = __webpack_require__("2144");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Observable.js + 2 modules
var Observable = __webpack_require__("e9b9");

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/scalar.js
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

function scalar(value) {
    var result = new Observable["a" /* Observable */](function (subscriber) {
        subscriber.next(value);
        subscriber.complete();
    });
    result._isScalar = true;
    result.value = value;
    return result;
}
//# sourceMappingURL=scalar.js.map

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/empty.js
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

var EMPTY = /*@__PURE__*/ new Observable["a" /* Observable */](function (subscriber) { return subscriber.complete(); });
function empty(scheduler) {
    return scheduler ? emptyScheduled(scheduler) : EMPTY;
}
function emptyScheduled(scheduler) {
    return new Observable["a" /* Observable */](function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
}
//# sourceMappingURL=empty.js.map

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/isScheduler.js
var isScheduler = __webpack_require__("9e46");

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/of.js
/** PURE_IMPORTS_START _util_isScheduler,_fromArray,_empty,_scalar PURE_IMPORTS_END */




function of() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args[args.length - 1];
    if (Object(isScheduler["a" /* isScheduler */])(scheduler)) {
        args.pop();
    }
    else {
        scheduler = undefined;
    }
    switch (args.length) {
        case 0:
            return empty(scheduler);
        case 1:
            return scheduler ? Object(fromArray["a" /* fromArray */])(args, scheduler) : scalar(args[0]);
        default:
            return Object(fromArray["a" /* fromArray */])(args, scheduler);
    }
}
//# sourceMappingURL=of.js.map

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/from.js + 5 modules
var from = __webpack_require__("d3fb");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/mergeAll.js + 1 modules
var mergeAll = __webpack_require__("667f");

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/concatAll.js
/** PURE_IMPORTS_START _mergeAll PURE_IMPORTS_END */

function concatAll() {
    return Object(mergeAll["a" /* mergeAll */])(1);
}
//# sourceMappingURL=concatAll.js.map

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/concat.js
/** PURE_IMPORTS_START _util_isScheduler,_of,_from,_operators_concatAll PURE_IMPORTS_END */




function concat() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    if (observables.length === 1 || (observables.length === 2 && Object(isScheduler["a" /* isScheduler */])(observables[1]))) {
        return Object(from["a" /* from */])(observables[0]);
    }
    return concatAll()(of.apply(void 0, observables));
}
//# sourceMappingURL=concat.js.map

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/startWith.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return startWith; });
/** PURE_IMPORTS_START _observable_fromArray,_observable_scalar,_observable_empty,_observable_concat,_util_isScheduler PURE_IMPORTS_END */





function startWith() {
    var array = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        array[_i] = arguments[_i];
    }
    return function (source) {
        var scheduler = array[array.length - 1];
        if (Object(isScheduler["a" /* isScheduler */])(scheduler)) {
            array.pop();
        }
        else {
            scheduler = null;
        }
        var len = array.length;
        if (len === 1 && !scheduler) {
            return concat(scalar(array[0]), source);
        }
        else if (len > 0) {
            return concat(Object(fromArray["a" /* fromArray */])(array, scheduler), source);
        }
        else {
            return concat(empty(scheduler), source);
        }
    };
}
//# sourceMappingURL=startWith.js.map


/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "ac4d":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("3a72")('asyncIterator');


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "acf8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InnerSubscriber; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9ab4");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("1453");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


var InnerSubscriber = /*@__PURE__*/ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.outerValue = outerValue;
        _this.outerIndex = outerIndex;
        _this.index = 0;
        return _this;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__[/* Subscriber */ "a"]));

//# sourceMappingURL=InnerSubscriber.js.map


/***/ }),

/***/ "bbae":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return subscribeToIterable; });
/* harmony import */ var _symbol_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("127f");
/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */

var subscribeToIterable = function (iterable) {
    return function (subscriber) {
        var iterator = iterable[_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__[/* iterator */ "a"]]();
        do {
            var item = iterator.next();
            if (item.done) {
                subscriber.complete();
                break;
            }
            subscriber.next(item.value);
            if (subscriber.closed) {
                break;
            }
        } while (true);
        if (typeof iterator.return === 'function') {
            subscriber.add(function () {
                if (iterator.return) {
                    iterator.return();
                }
            });
        }
        return subscriber;
    };
};
//# sourceMappingURL=subscribeToIterable.js.map


/***/ }),

/***/ "bc00":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// CONCATENATED MODULE: ./src/components/extends/common/method.js
var commonMethods = {
  /* 通用 common */
  prevent: function prevent(e) {
    e.preventDefault();
    return e;
  },
  eTo: function eTo(e, direction, element) {
    var area = this[element + 'Pos']();
    var length = 0;

    switch (direction) {
      case 'top':
        length = e.clientY - area.top;
        break;

      case 'left':
        length = e.clientX - area.left;
        break;

      case 'right':
        length = area.right - e.clientX;
        break;

      case 'bottom':
        length = area.bottom - e.clientY;
        break;
    }

    return length;
  },
  toPercentage: function toPercentage(pos) {
    var result = {};
    var table = {
      left: 'toX',
      right: 'toX',
      top: 'toY',
      bottom: 'toY',
      width: 'toX',
      height: 'toY'
    };

    for (var k in pos) {
      var fn = table[k];
      if (!fn || pos[k] === undefined) continue;
      result[k] = this[fn](pos[k]);
    }

    return result;
  },
  invalidDrawPos: function invalidDrawPos(pos) {
    //true if invalid
    return pos.swidth === 0 || pos.sheight === 0;
  }
};
/* harmony default export */ var common_method = (commonMethods);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.symbol.async-iterator.js
var es7_symbol_async_iterator = __webpack_require__("ac4d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.symbol.js
var es6_symbol = __webpack_require__("8a81");

// CONCATENATED MODULE: ./src/components/extends/basic/method.js






var clipperMethods = {
  eToArea: function eToArea(e, direction) {
    return this.eTo(e, direction, 'area');
  },
  areaPos: function areaPos() {
    var rect = this.areaEl.getBoundingClientRect();
    return rect;
  },
  zoomPos: function zoomPos() {
    var rect = this.zoomEl.getBoundingClientRect();
    return rect;
  },
  eInZoom: function eInZoom(e) {
    var zoomPos = this.zoomEl.getBoundingClientRect();
    return {
      width: zoomPos.width,
      height: zoomPos.height,
      left: e.clientX - zoomPos.left,
      top: e.clientY - zoomPos.top
    };
  },
  zoomInArea: function zoomInArea() {
    //zoom rect & zoom pos related to area
    var areaPos = this.areaEl.getBoundingClientRect();
    var zoomPos = this.zoomEl.getBoundingClientRect();
    return Object.assign(zoomPos, {
      offsetLeft: zoomPos.left - areaPos.left,
      offsetTop: zoomPos.top - areaPos.top,
      maxLeft: areaPos.width - zoomPos.width,
      maxTop: areaPos.height - zoomPos.height
    });
  },
  toX: function toX(value) {
    //to X axis percentage 0~100 !
    var area = this.areaPos();
    return Math.min(Math.max(value / area.width * 100, 0), 100);
  },
  toY: function toY(value) {
    // to Y axis percentage 0~100 !
    var area = this.areaPos();
    return Math.min(Math.max(value / area.height * 100, 0), 100);
  },

  /* 拖曳drag */
  isDragElement: function isDragElement(e) {
    return e.target === this.$el.querySelector('.drag-inset');
  },
  dragMoving: function dragMoving(_ref) {
    var down = _ref.down,
        move = _ref.move;
    var left = this.toX(this.eToArea(move, "left") - down.left),
        top = this.toY(this.eToArea(move, "top") - down.top); //set max position

    return {
      left: left,
      top: top,
      down: down,
      move: move
    };
  },
  repositionDrag: function repositionDrag(_ref2) {
    var left = _ref2.left,
        top = _ref2.top,
        down = _ref2.down,
        move = _ref2.move;
    //validate @left, @top, and reposition @down if nedded.
    var zoom = this.zoomInArea();
    var maxLeft = this.toX(zoom.maxLeft);
    var maxTop = this.toY(zoom.maxTop);
    left = Math.min(left, maxLeft);
    top = Math.min(top, maxTop);

    if (left === maxLeft || left === 0) {
      //轉換拖曳點X
      var eInZoom = this.eInZoom(move);
      down.left = Math.max(Math.min(eInZoom.left, eInZoom.width), 0);
    }

    if (top === maxTop || top === 0) {
      //轉換拖曳點Y
      var _eInZoom = this.eInZoom(move);

      down.top = Math.max(Math.min(_eInZoom.top, _eInZoom.height), 0);
    }

    return {
      left: left,
      top: top
    };
  },

  /* 縮放計算*/
  ratioPos: function ratioPos(newRect) {
    /**
     * @argument e - moving event
     */
    var zoom = this.zoomPos();
    var xGrow = newRect.width - zoom.width,
        yGrow = newRect.height - zoom.height,
        horizon = xGrow > yGrow;
    return {
      x: horizon,
      y: !horizon
    };
  },
  zoomingPosition: function zoomingPosition(down, move) {
    /**
     * @augments down: zoomPos when click down,
     * @argument move: moving event
     */
    var area = this.areaPos();
    var left, top, right, bottom, width, height;
    var maxWidth, maxHeight;

    if (down.r === true) {
      left = down.offsetLeft;
      maxWidth = area.width - left;
      width = move.clientX - down.left;
    }

    if (down.l === true) {
      right = area.right - down.right;
      maxWidth = area.width - right;
      width = down.right - move.clientX;
    }

    if (down.b === true) {
      // zoom right&bottom
      top = down.offsetTop; //calc new pos

      maxHeight = area.height - top;
      height = move.clientY - down.top;
    }

    if (down.t === true) {
      bottom = area.bottom - down.bottom;
      maxHeight = area.height - bottom;
      height = down.bottom - move.clientY;
    }

    width = Math.min(width, maxWidth);
    height = Math.min(height, maxHeight);
    return {
      width: width,
      height: height,
      top: top,
      left: left,
      right: right,
      bottom: bottom,
      maxWidth: maxWidth,
      maxHeight: maxHeight
    };
  },
  $set_minWH: function $set_minWH(wh) {
    /**
     * @argument wh percentage {width, height}
     */
    return {
      width: Math.max(wh.width, 1),
      height: Math.max(wh.height, 1)
    };
  },
  $set_ratioWH: function $set_ratioWH(_ref3) {
    var width = _ref3.width,
        height = _ref3.height,
        maxWidth = _ref3.maxWidth,
        maxHeight = _ref3.maxHeight;
    if (!this.ratio) return {
      width: width,
      height: height
    }; //有設定比例的話進行調整

    var ratioPos = this.ratioPos({
      width: width,
      height: height
    });

    if (ratioPos.x) {
      height = Math.min(width / this.ratio, maxHeight);
      width = height === maxHeight ? height * this.ratio : width;
    } else {
      width = Math.min(height * this.ratio, maxWidth);
      height = width === maxWidth ? width / this.ratio : height;
    }

    return {
      width: width,
      height: height
    };
  },
  $set_initWHTL: function $set_initWHTL() {
    var width = 50,
        height = 50,
        left,
        top;

    if (this.ratio >= 1) {
      height = width / this.ratio * this.imgRatio;
    } else if (this.ratio < 1 && this.ratio > 0) {
      width = height * this.ratio / this.imgRatio;
    }

    width = Math.min(width, 100);
    height = Math.min(height, 100);
    left = (100 - width) / 2;
    top = (100 - height) / 2;
    this.setTL$.next({
      left: left,
      top: top
    });
    return {
      width: width,
      height: height
    };
  },
  splitPos: function splitPos(_ref4) {
    var top = _ref4.top,
        left = _ref4.left,
        right = _ref4.right,
        bottom = _ref4.bottom,
        width = _ref4.width,
        height = _ref4.height,
        maxWidth = _ref4.maxWidth,
        maxHeight = _ref4.maxHeight;

    /* @pos: {
        left || right,  top || bottom, width, height
      } */
    return {
      tl: {
        left: left,
        top: top,
        right: right,
        bottom: bottom
      },
      wh: {
        width: width,
        height: height,
        maxWidth: maxWidth,
        maxHeight: maxHeight
      }
    };
  },

  /* 拖曳縮放 */
  isZoomElement: function isZoomElement(e) {
    return this.zoomEl.contains(e.target) && e.target != this.$el.querySelector('.drag-inset'); //return e.target === this.$el.querySelector(".extend.inner") || e.target === this.$el.querySelector(".extend.outer") || e.target === this.$el.querySelector(".corner")
  },
  judgeArea: function judgeArea(e) {
    var zoom = this.zoomPos();
    var md = zoom.left + zoom.width / 2,
        vh = zoom.top + zoom.height / 2,
        mouseX = e.clientX,
        mouseY = e.clientY;
    return {
      l: mouseX < md,
      r: mouseX > md,
      t: mouseY < vh,
      b: mouseY > vh
    };
  },
  setDownPosition: function setDownPosition(e) {
    //use in zoomWH$
    var judge = this.judgeArea(e);
    var zoom = this.zoomPos();
    var clientY = judge.t ? zoom.bottom : zoom.top;
    var clientX = judge.l ? zoom.right : zoom.left;
    return {
      target: null,
      clientX: clientX,
      clientY: clientY
    };
  },

  /* 兩指縮放 */
  isTwoPointZoomElement: function isTwoPointZoomElement(e) {
    //in .area
    return this.areaEl.contains(e.touches[0].target) && this.areaEl.contains(e.touches[1].target);
  },
  getTwoTouchesPos: function getTwoTouchesPos(start, move, originZoom) {
    /* p[0]----| 
        |---- p[1]
    */
    var area = this.areaPos();
    var normalX = move.touches[0].clientX < move.touches[1].clientX;
    var normalY = move.touches[0].clientY < move.touches[1].clientY;
    var normalSX = start.touches[0].clientX < start.touches[1].clientX;
    var normalSY = start.touches[0].clientY < start.touches[1].clientY; // const originWRange = Math.abs(start.touches[0].clientX - start.touches[1].clientX),
    //     originHRange = Math.abs(start.touches[0].clientY - start.touches[1].clientY);

    var point = {
      left: normalX ? 0 : 1,
      right: normalX ? 1 : 0,
      top: normalY ? 0 : 1,
      bottom: normalY ? 1 : 0
    };
    var pointStart = {
      left: normalSX ? 0 : 1,
      right: normalSX ? 1 : 0,
      top: normalSY ? 0 : 1,
      bottom: normalSY ? 1 : 0
    };
    var LMove = start.touches[pointStart.left].clientX - move.touches[point.left].clientX;
    var TMove = start.touches[pointStart.top].clientY - move.touches[point.top].clientY; //這裡的left,top要先validate否則maxWidth,maxHeight會算錯

    var left = Math.max(originZoom.left - area.left - LMove, 0);
    var top = Math.max(originZoom.top - area.top - TMove, 0);
    var maxWidth = area.width - left;
    var maxHeight = area.height - top;
    var overRight = start.touches[pointStart.right].clientX - originZoom.right;
    var overTop = start.touches[pointStart.bottom].clientY - originZoom.bottom;
    var width = Math.min(move.touches[point.right].clientX - area.left - left - overRight, maxWidth);
    var height = Math.min(move.touches[point.bottom].clientY - top - area.top - overTop, maxHeight);
    return {
      width: width,
      height: height,
      top: top,
      left: left,
      maxWidth: maxWidth,
      maxHeight: maxHeight
    };
  },

  /* 拖曳重新劃定區域 */
  isCreateElement: function isCreateElement(e) {
    return e.target === this.$el.querySelector(".clip-area") || e.target === this.$el.querySelector(".img");
  },
  getFakeDown: function getFakeDown(e) {
    return {
      target: e.target,
      clientX: e.clientX,
      clientY: e.clientY
    };
  },
  reverseDownPos: function reverseDownPos(_ref5) {
    var down = _ref5.down,
        move = _ref5.move;
    if (this.mode === 'normal') return {
      down: down,
      move: move
    };

    if (down.target !== null && down.target === this.$el.querySelector(".img")) {
      //this is dragCreate, first time dont count
      down.target = null;
      return {
        down: down,
        move: move
      };
    } //處理反向


    var judge = this.judgeArea(down);
    var zoom = this.zoomPos(); //左右反向

    if (judge.l && move.clientX < down.clientX) {
      down.clientX = zoom.right;
    } else if (judge.r && move.clientX > down.clientX) {
      down.clientX = zoom.left;
    } //上下反向


    if (judge.t && move.clientY < down.clientY) {
      down.clientY = zoom.bottom;
    } else if (judge.b && move.clientY > down.clientY) {
      down.clientY = zoom.top;
    }

    return {
      down: down,
      move: move
    };
  },
  getCreatePos: function getCreatePos(down, move) {
    //判斷移動方向
    var x = move.clientX > down.clientX ? 'r' : 'l';
    var y = move.clientY > down.clientY ? 'b' : 't';
    var pos = {
      top: down.clientY,
      right: down.clientX,
      bottom: down.clientY,
      left: down.clientX,
      offsetTop: this.eToArea(down, 'top'),
      offsetLeft: this.eToArea(down, 'left')
    };
    pos[x] = true;
    pos[y] = true;
    return pos;
  },
  //DRAW
  getDrawPos: function getDrawPos() {
    var zoom = this.zoomPos(),
        img = this.scaleEl.getBoundingClientRect();
    var imgW = this.imgEl.naturalWidth;
    var viewW = img.width,
        viewL = zoom.left - img.left + this.border,
        viewT = zoom.top - img.top + this.border,
        zWidth = zoom.width - this.border * 2,
        zHeight = zoom.height - this.border * 2;
    var rate = imgW / viewW;
    var translate = {
      rotateX: (img.left + img.width / 2 - (zoom.left + this.border)) * rate,
      rotateY: (img.top + img.height / 2 - (zoom.top + this.border)) * rate,
      drawX: (img.left - (zoom.left + this.border)) * rate,
      drawY: (img.top - (zoom.top + this.border)) * rate // const translate = {
      //     x: (img.left - (zoom.left+this.border))*rate,
      //     y: (img.top - (zoom.top+this.border))*rate
      // }

    };
    var pos = {
      sx: viewL * rate,
      //sx
      sy: viewT * rate,
      //sy
      swidth: zWidth * rate,
      //sWidth
      sheight: zHeight * rate,
      //sHeight
      dx: 0,
      //dx
      dy: 0,
      //dy
      dwidth: zWidth * rate,
      //dWidth
      dheight: zHeight * rate //dHeight

    };
    pos[Symbol.iterator] =
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var k;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = regeneratorRuntime.keys(pos);

            case 1:
              if ((_context.t1 = _context.t0()).done) {
                _context.next = 7;
                break;
              }

              k = _context.t1.value;
              _context.next = 5;
              return pos[k];

            case 5:
              _context.next = 1;
              break;

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    });
    return {
      pos: pos,
      translate: translate
    };
  }
};
/* harmony default export */ var basic_method = (clipperMethods);
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// CONCATENATED MODULE: ./src/components/extends/fixed/method.js







var _fixedMethods;

var fixedMethods = (_fixedMethods = {
  translatePos: function translatePos() {
    return this.imgEl.getBoundingClientRect();
  },
  wrapPos: function wrapPos() {
    return this.wrapEl.getBoundingClientRect();
  },
  scalePos: function scalePos() {
    return this.scaleEl.getBoundingClientRect();
  }
}, _defineProperty(_fixedMethods, "translatePos", function translatePos() {
  return this.translateEl.getBoundingClientRect();
}), _defineProperty(_fixedMethods, "toX", function toX(value) {
  //to X axis percentage 0~100 !
  var scale = this.scalePos();
  return value / scale.width * 100;
}), _defineProperty(_fixedMethods, "toY", function toY(value) {
  // to Y axis percentage 0~100 !
  var scale = this.scalePos();
  return value / scale.height * 100;
}), _defineProperty(_fixedMethods, "isDragElement", function isDragElement(e) {
  return this.wrapEl.contains(e.target);
}), _defineProperty(_fixedMethods, "dragDownPos", function dragDownPos(e) {
  var translatePos = this.translatePos();
  var scalePos = this.scalePos();
  var offset = {
    left: translatePos.left - scalePos.left,
    top: translatePos.top - scalePos.top,
    clientX: e.clientX,
    clientY: e.clientY
  };
  return offset;
}), _defineProperty(_fixedMethods, "delta", function delta(_ref) {
  var down = _ref.down,
      move = _ref.move;
  var left = move.clientX - down.clientX + down.left;
  var top = move.clientY - down.clientY + down.top;
  return {
    left: left,
    top: top
  };
}), _defineProperty(_fixedMethods, "towPointsTouches", function towPointsTouches(e) {
  return e.touches;
}), _defineProperty(_fixedMethods, "setOrigin", function setOrigin(down) {
  return {
    down: [down[0], down[1]],
    origin: this.scalePos().width
  };
}), _defineProperty(_fixedMethods, "twoPointsDelta", function twoPointsDelta(_ref2) {
  var down = _ref2.down,
      move = _ref2.move;
  var x = Math.abs(move[0].clientX - move[1].clientX) - Math.abs(down[0].clientX - down[1].clientX);
  var y = Math.abs(move[0].clientY - move[1].clientY) - Math.abs(down[0].clientY - down[1].clientY);
  down[0] = move[0];
  down[1] = move[1];
  var wrapPos = this.wrapPos();

  if (Math.abs(x) >= Math.abs(y)) {
    return x / wrapPos.width;
  } else {
    return y / wrapPos.height;
  }
}), _defineProperty(_fixedMethods, "getDrawPos", function getDrawPos() {
  var areaPos = this.areaEl.getBoundingClientRect(),
      translatePos = this.translatePos();
  var imgW = this.imgEl.naturalWidth;
  var viewL = areaPos.left - translatePos.left + this.border,
      viewT = areaPos.top - translatePos.top + this.border;
  var rate = imgW / translatePos.width;
  var translate = {
    rotateX: (translatePos.left + translatePos.width / 2 - (areaPos.left + this.border)) * rate,
    rotateY: (translatePos.top + translatePos.height / 2 - (areaPos.top + this.border)) * rate,
    drawX: (translatePos.left - (areaPos.left + this.border)) * rate,
    drawY: (translatePos.top - (areaPos.top + this.border)) * rate
  };
  var pos = {
    sx: viewL * rate,
    //sx
    sy: viewT * rate,
    //sy
    swidth: (areaPos.width - this.border * 2) * rate,
    //sWidth
    sheight: (areaPos.height - this.border * 2) * rate,
    //sHeight
    dx: 0,
    //dx
    dy: 0,
    //dy
    dwidth: (areaPos.width - this.border * 2) * rate,
    //dWidth
    dheight: (areaPos.height - this.border * 2) * rate //dHeight

  };
  pos[Symbol.iterator] =
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var k;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = regeneratorRuntime.keys(pos);

          case 1:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 7;
              break;
            }

            k = _context.t1.value;
            _context.next = 5;
            return pos[k];

          case 5:
            _context.next = 1;
            break;

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  });
  return {
    pos: pos,
    translate: translate
  };
}), _fixedMethods);
/* harmony default export */ var fixed_method = (fixedMethods);
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/fromEvent.js
var fromEvent = __webpack_require__("6e77");

// EXTERNAL MODULE: ./src/namespace.js
var namespace = __webpack_require__("0f53");

// CONCATENATED MODULE: ./src/components/extends/clippo.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return basicMethods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return clippo_fixedMethods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return rxEventListeners; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return rxWheelListeners; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return pluginMethods; });



/* 
    * methods for calculating position layout,
    * extended by clipper-basic-component
*/



var basicMethods = Object.assign(basic_method, common_method);
var clippo_fixedMethods = Object.assign(fixed_method, common_method);



/**  Listeners */

var rxEventListeners = {
  beforeCreate: function beforeCreate() {
    this.mousedown$ = Object(fromEvent["a" /* fromEvent */])(window, 'mousedown');
    this.mousemove$ = Object(fromEvent["a" /* fromEvent */])(window, 'mousemove');
    this.mouseup$ = Object(fromEvent["a" /* fromEvent */])(window, 'mouseup');
    this.touchstart$ = Object(fromEvent["a" /* fromEvent */])(window, 'touchstart', {
      passive: false
    });
    this.touchmove$ = Object(fromEvent["a" /* fromEvent */])(window, 'touchmove', {
      passive: false
    });
    this.touchend$ = Object(fromEvent["a" /* fromEvent */])(window, 'touchend', {
      passive: false
    });
  }
};
var rxWheelListeners = {
  beforeCreate: function beforeCreate() {
    this.wheel$ = Object(fromEvent["a" /* fromEvent */])(window, 'wheel');
  }
};



var pluginMethods = {
  methods: {
    clip: function clip() {
      var drawPos = this.getDrawPos();
      var ctx = this.canvasEl.getContext('2d');
      var width = drawPos.pos.swidth; //sw

      var height = drawPos.pos.sheight; //sh

      this.canvasEl.width = width;
      this.canvasEl.height = height;
      ctx.fillStyle = this.bgColor;
      ctx.fillRect(0, 0, width, height);
      ctx.translate(drawPos.translate.rotateX, drawPos.translate.rotateY);
      ctx.rotate(this.rotate * Math.PI / 180);
      ctx.translate(drawPos.translate.drawX - drawPos.translate.rotateX, drawPos.translate.drawY - drawPos.translate.rotateY);
      ctx.drawImage(this.imgEl, 0, 0);
      return this.canvasEl;
    },
    callPreview: function callPreview(method) {
      for (var _len = arguments.length, arg = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        arg[_key - 1] = arguments[_key];
      }

      var parentPropName = namespace["a" /* default */].parentPropName;
      if (!this.preview) return;
      if (!this.$parent[parentPropName]) return; //"You register to use clipper-preview But No clipper-view Component detected.";

      var previews = this.$parent[parentPropName][this.preview];
      if (!previews) return; //`preview with name "${this.preview}" not found`;

      previews.forEach(function (p) {
        p[method].apply(p, arg);
      });
    }
  }
};


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c539":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return observable; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var observable = typeof Symbol === 'function' && Symbol.observable || '@@observable';
//# sourceMappingURL=observable.js.map


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "ce19":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Subject.js + 2 modules
var Subject = __webpack_require__("2bd2");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Subscription.js + 3 modules
var Subscription = __webpack_require__("a6e8");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/fromEvent.js
var fromEvent = __webpack_require__("6e77");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Observable.js + 2 modules
var Observable = __webpack_require__("e9b9");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/noop.js
var noop = __webpack_require__("fae9");

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/never.js
/** PURE_IMPORTS_START _Observable,_util_noop PURE_IMPORTS_END */


var NEVER = /*@__PURE__*/ new Observable["a" /* Observable */](noop["a" /* noop */]);
function never() {
    return NEVER;
}
//# sourceMappingURL=never.js.map

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__("9ab4");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Subscriber.js
var Subscriber = __webpack_require__("1453");

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/refCount.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function refCount() {
    return function refCountOperatorFunction(source) {
        return source.lift(new RefCountOperator(source));
    };
}
var RefCountOperator = /*@__PURE__*/ (function () {
    function RefCountOperator(connectable) {
        this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new refCount_RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountOperator;
}());
var refCount_RefCountSubscriber = /*@__PURE__*/ (function (_super) {
    tslib_es6["a" /* __extends */](RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
            this.connection = null;
            return;
        }
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(Subscriber["a" /* Subscriber */]));
//# sourceMappingURL=refCount.js.map

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/ConnectableObservable.js
/** PURE_IMPORTS_START tslib,_Subject,_Observable,_Subscriber,_Subscription,_operators_refCount PURE_IMPORTS_END */






var ConnectableObservable_ConnectableObservable = /*@__PURE__*/ (function (_super) {
    tslib_es6["a" /* __extends */](ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.subjectFactory = subjectFactory;
        _this._refCount = 0;
        _this._isComplete = false;
        return _this;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    };
    ConnectableObservable.prototype.connect = function () {
        var connection = this._connection;
        if (!connection) {
            this._isComplete = false;
            connection = this._connection = new Subscription["a" /* Subscription */]();
            connection.add(this.source
                .subscribe(new ConnectableObservable_ConnectableSubscriber(this.getSubject(), this)));
            if (connection.closed) {
                this._connection = null;
                connection = Subscription["a" /* Subscription */].EMPTY;
            }
            else {
                this._connection = connection;
            }
        }
        return connection;
    };
    ConnectableObservable.prototype.refCount = function () {
        return refCount()(this);
    };
    return ConnectableObservable;
}(Observable["a" /* Observable */]));

var connectableProto = ConnectableObservable_ConnectableObservable.prototype;
var connectableObservableDescriptor = {
    operator: { value: null },
    _refCount: { value: 0, writable: true },
    _subject: { value: null, writable: true },
    _connection: { value: null, writable: true },
    _subscribe: { value: connectableProto._subscribe },
    _isComplete: { value: connectableProto._isComplete, writable: true },
    getSubject: { value: connectableProto.getSubject },
    connect: { value: connectableProto.connect },
    refCount: { value: connectableProto.refCount }
};
var ConnectableObservable_ConnectableSubscriber = /*@__PURE__*/ (function (_super) {
    tslib_es6["a" /* __extends */](ConnectableSubscriber, _super);
    function ConnectableSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
    }
    ConnectableSubscriber.prototype._error = function (err) {
        this._unsubscribe();
        _super.prototype._error.call(this, err);
    };
    ConnectableSubscriber.prototype._complete = function () {
        this.connectable._isComplete = true;
        this._unsubscribe();
        _super.prototype._complete.call(this);
    };
    ConnectableSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (connectable) {
            this.connectable = null;
            var connection = connectable._connection;
            connectable._refCount = 0;
            connectable._subject = null;
            connectable._connection = null;
            if (connection) {
                connection.unsubscribe();
            }
        }
    };
    return ConnectableSubscriber;
}(Subject["b" /* SubjectSubscriber */]));
var ConnectableObservable_RefCountOperator = /*@__PURE__*/ (function () {
    function RefCountOperator(connectable) {
        this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new ConnectableObservable_RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountOperator;
}());
var ConnectableObservable_RefCountSubscriber = /*@__PURE__*/ (function (_super) {
    tslib_es6["a" /* __extends */](RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
            this.connection = null;
            return;
        }
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(Subscriber["a" /* Subscriber */]));
//# sourceMappingURL=ConnectableObservable.js.map

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/multicast.js
/** PURE_IMPORTS_START _observable_ConnectableObservable PURE_IMPORTS_END */

function multicast(subjectOrSubjectFactory, selector) {
    return function multicastOperatorFunction(source) {
        var subjectFactory;
        if (typeof subjectOrSubjectFactory === 'function') {
            subjectFactory = subjectOrSubjectFactory;
        }
        else {
            subjectFactory = function subjectFactory() {
                return subjectOrSubjectFactory;
            };
        }
        if (typeof selector === 'function') {
            return source.lift(new MulticastOperator(subjectFactory, selector));
        }
        var connectable = Object.create(source, connectableObservableDescriptor);
        connectable.source = source;
        connectable.subjectFactory = subjectFactory;
        return connectable;
    };
}
var MulticastOperator = /*@__PURE__*/ (function () {
    function MulticastOperator(subjectFactory, selector) {
        this.subjectFactory = subjectFactory;
        this.selector = selector;
    }
    MulticastOperator.prototype.call = function (subscriber, source) {
        var selector = this.selector;
        var subject = this.subjectFactory();
        var subscription = selector(subject).subscribe(subscriber);
        subscription.add(source.subscribe(subject));
        return subscription;
    };
    return MulticastOperator;
}());

//# sourceMappingURL=multicast.js.map

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/share.js
/** PURE_IMPORTS_START _multicast,_refCount,_Subject PURE_IMPORTS_END */



function shareSubjectFactory() {
    return new Subject["a" /* Subject */]();
}
function share() {
    return function (source) { return refCount()(multicast(shareSubjectFactory)(source)); };
}
//# sourceMappingURL=share.js.map

// CONCATENATED MODULE: ./node_modules/vue-rx/dist/vue-rx.esm.js



var Vue$1;
var warn = function () {};

// NOTE(benlesh): the value of this method seems dubious now, but I'm not sure
// if this is a Vue convention I'm just not familiar with. Perhaps it would
// be better to just import and use Vue directly?
function install (_Vue) {
  Vue$1 = _Vue;
  warn = Vue$1.util.warn || warn;
}

// TODO(benlesh): as time passes, this should be updated to use RxJS 6.1's
// `isObservable` method. But wait until you're ready to drop support for Rx 5
function isObservable (ob) {
  return ob && typeof ob.subscribe === 'function'
}

function isObserver (subject) {
  return subject && (
    typeof subject.next === 'function'
  )
}

function defineReactive (vm, key, val) {
  if (key in vm) {
    vm[key] = val;
  } else {
    Vue$1.util.defineReactive(vm, key, val);
  }
}

function getKey (binding) {
  return [binding.arg].concat(Object.keys(binding.modifiers)).join(':')
}

var rxMixin = {
  created: function created () {
    var vm = this;
    var domStreams = vm.$options.domStreams;
    if (domStreams) {
      domStreams.forEach(function (key) {
        vm[key] = new Subject["a" /* Subject */]();
      });
    }

    var observableMethods = vm.$options.observableMethods;
    if (observableMethods) {
      if (Array.isArray(observableMethods)) {
        observableMethods.forEach(function (methodName) {
          vm[ methodName + '$' ] = vm.$createObservableMethod(methodName);
        });
      } else {
        Object.keys(observableMethods).forEach(function (methodName) {
          vm[observableMethods[methodName]] = vm.$createObservableMethod(methodName);
        });
      }
    }

    var obs = vm.$options.subscriptions;
    if (typeof obs === 'function') {
      obs = obs.call(vm);
    }
    if (obs) {
      vm.$observables = {};
      vm._subscription = new Subscription["a" /* Subscription */]();
      Object.keys(obs).forEach(function (key) {
        defineReactive(vm, key, undefined);
        var ob = vm.$observables[key] = obs[key];
        if (!isObservable(ob)) {
          warn(
            'Invalid Observable found in subscriptions option with key "' + key + '".',
            vm
          );
          return
        }
        vm._subscription.add(obs[key].subscribe(function (value) {
          vm[key] = value;
        }, function (error) { throw error }));
      });
    }
  },

  beforeDestroy: function beforeDestroy () {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}

var streamDirective = {
  // Example ./example/counter_dir.html
  bind: function bind (el, binding, vnode) {
    var handle = binding.value;
    var event = binding.arg;
    var streamName = binding.expression;
    var modifiers = binding.modifiers;

    if (isObserver(handle)) {
      handle = { subject: handle };
    } else if (!handle || !isObserver(handle.subject)) {
      warn(
        'Invalid Subject found in directive with key "' + streamName + '".' +
        streamName + ' should be an instance of Subject or have the ' +
        'type { subject: Subject, data: any }.',
        vnode.context
      );
      return
    }

    var modifiersFuncs = {
      stop: function (e) { return e.stopPropagation(); },
      prevent: function (e) { return e.preventDefault(); }
    };

    var modifiersExists = Object.keys(modifiersFuncs).filter(
      function (key) { return modifiers[key]; }
    );

    var subject = handle.subject;
    var next = (subject.next || subject.onNext).bind(subject);

    if (!modifiers.native && vnode.componentInstance) {
      handle.subscription = vnode.componentInstance.$eventToObservable(event).subscribe(function (e) {
        modifiersExists.forEach(function (mod) { return modifiersFuncs[mod](e); });
        next({
          event: e,
          data: handle.data
        });
      });
    } else {
      var fromEventArgs = handle.options ? [el, event, handle.options] : [el, event];
      handle.subscription = fromEvent["a" /* fromEvent */].apply(void 0, fromEventArgs).subscribe(function (e) {
        modifiersExists.forEach(function (mod) { return modifiersFuncs[mod](e); });
        next({
          event: e,
          data: handle.data
        });
      })

      // store handle on element with a unique key for identifying
      // multiple v-stream directives on the same node
      ;(el._rxHandles || (el._rxHandles = {}))[getKey(binding)] = handle;
    }
  },

  update: function update (el, binding) {
    var handle = binding.value;
    var _handle = el._rxHandles && el._rxHandles[getKey(binding)];
    if (_handle && handle && isObserver(handle.subject)) {
      _handle.data = handle.data;
    }
  },

  unbind: function unbind (el, binding) {
    var key = getKey(binding);
    var handle = el._rxHandles && el._rxHandles[key];
    if (handle) {
      if (handle.subscription) {
        handle.subscription.unsubscribe();
      }
      el._rxHandles[key] = null;
    }
  }
}

function watchAsObservable (expOrFn, options) {
  var vm = this;
  var obs$ = new Observable["a" /* Observable */](function (observer) {
    var _unwatch;
    var watch = function () {
      _unwatch = vm.$watch(expOrFn, function (newValue, oldValue) {
        observer.next({ oldValue: oldValue, newValue: newValue });
      }, options);
    };

    // if $watchAsObservable is called inside the subscriptions function,
    // because data hasn't been observed yet, the watcher will not work.
    // in that case, wait until created hook to watch.
    if (vm._data) {
      watch();
    } else {
      vm.$once('hook:created', watch);
    }

    // Returns function which disconnects the $watch expression
    return new Subscription["a" /* Subscription */](function () {
      _unwatch && _unwatch();
    })
  });

  return obs$
}

function fromDOMEvent (selector, event) {
  if (typeof window === 'undefined') {
    // TODO(benlesh): I'm not sure if this is really what you want here,
    // but it's equivalent to what you were doing. You might want EMPTY
    return NEVER
  }

  var vm = this;
  var doc = document.documentElement;
  var obs$ = new Observable["a" /* Observable */](function (observer) {
    function listener (e) {
      if (!vm.$el) { return }
      if (selector === null && vm.$el === e.target) { return observer.next(e) }
      var els = vm.$el.querySelectorAll(selector);
      var el = e.target;
      for (var i = 0, len = els.length; i < len; i++) {
        if (els[i] === el) { return observer.next(e) }
      }
    }
    doc.addEventListener(event, listener);
    // Returns function which disconnects the $watch expression
    return new Subscription["a" /* Subscription */](function () {
      doc.removeEventListener(event, listener);
    })
  });

  return obs$
}

function subscribeTo (observable, next, error, complete) {
  var subscription = observable.subscribe(next, error, complete)
  ;(this._subscription || (this._subscription = new Subscription["a" /* Subscription */]())).add(subscription);
  return subscription
}

/**
 * @see {@link https://vuejs.org/v2/api/#vm-on}
 * @param {String||Array} evtName Event name
 * @return {Observable} Event stream
 */
function eventToObservable (evtName) {
  var vm = this;
  var evtNames = Array.isArray(evtName) ? evtName : [evtName];
  var obs$ = new Observable["a" /* Observable */](function (observer) {
    var eventPairs = evtNames.map(function (name) {
      var callback = function (msg) { return observer.next({ name: name, msg: msg }); };
      vm.$on(name, callback);
      return { name: name, callback: callback }
    });
    return function () {
      // Only remove the specific callback
      eventPairs.forEach(function (pair) { return vm.$off(pair.name, pair.callback); });
    }
  });

  return obs$
}

/**
 * @name Vue.prototype.$createObservableMethod
 * @description Creates an observable from a given function name.
 * @param {String} methodName Function name
 * @param {Boolean} [passContext] Append the call context at the end of emit data?
 * @return {Observable} Hot stream
 */
function createObservableMethod (methodName, passContext) {
  var vm = this;

  if (vm[methodName] !== undefined) {
    warn(
      'Potential bug: ' +
      "Method " + methodName + " already defined on vm and has been overwritten by $createObservableMethod." +
      String(vm[methodName]),
      vm
    );
  }

  var creator = function (observer) {
    vm[methodName] = function () {
      var args = Array.from(arguments);
      if (passContext) {
        args.push(this);
        observer.next(args);
      } else {
        if (args.length <= 1) {
          observer.next(args[0]);
        } else {
          observer.next(args);
        }
      }
    };
    return function () {
      delete vm[methodName];
    }
  };

  // Must be a hot stream otherwise function context may overwrite over and over again
  return new Observable["a" /* Observable */](creator).pipe(share())
}

/* global Vue */

function VueRx (Vue) {
  install(Vue);
  Vue.mixin(rxMixin);
  Vue.directive('stream', streamDirective);
  Vue.prototype.$watchAsObservable = watchAsObservable;
  Vue.prototype.$fromDOMEvent = fromDOMEvent;
  Vue.prototype.$subscribeTo = subscribeTo;
  Vue.prototype.$eventToObservable = eventToObservable;
  Vue.prototype.$createObservableMethod = createObservableMethod;
}

// auto install
if (typeof Vue !== 'undefined') {
  Vue.use(VueRx);
}

/* harmony default export */ var vue_rx_esm = __webpack_exports__["a"] = (VueRx);


/***/ }),

/***/ "ce8b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return subscribeToResult; });
/* harmony import */ var _InnerSubscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("acf8");
/* harmony import */ var _subscribeTo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("1716");
/** PURE_IMPORTS_START _InnerSubscriber,_subscribeTo PURE_IMPORTS_END */


function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, destination) {
    if (destination === void 0) {
        destination = new _InnerSubscriber__WEBPACK_IMPORTED_MODULE_0__[/* InnerSubscriber */ "a"](outerSubscriber, outerValue, outerIndex);
    }
    if (destination.closed) {
        return;
    }
    return Object(_subscribeTo__WEBPACK_IMPORTED_MODULE_1__[/* subscribeTo */ "a"])(result)(destination);
}
//# sourceMappingURL=subscribeToResult.js.map


/***/ }),

/***/ "d24b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d3fb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Observable.js + 2 modules
var Observable = __webpack_require__("e9b9");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/isPromise.js
var isPromise = __webpack_require__("fd66");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/isArrayLike.js
var isArrayLike = __webpack_require__("d9e3");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/symbol/observable.js
var symbol_observable = __webpack_require__("c539");

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/isInteropObservable.js
/** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */

function isInteropObservable(input) {
    return input && typeof input[symbol_observable["a" /* observable */]] === 'function';
}
//# sourceMappingURL=isInteropObservable.js.map

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/symbol/iterator.js
var symbol_iterator = __webpack_require__("127f");

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/isIterable.js
/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */

function isIterable(input) {
    return input && typeof input[symbol_iterator["a" /* iterator */]] === 'function';
}
//# sourceMappingURL=isIterable.js.map

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/observable/fromArray.js
var fromArray = __webpack_require__("2144");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Subscription.js + 3 modules
var Subscription = __webpack_require__("a6e8");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/subscribeToPromise.js
var subscribeToPromise = __webpack_require__("4b95");

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/fromPromise.js
/** PURE_IMPORTS_START _Observable,_Subscription,_util_subscribeToPromise PURE_IMPORTS_END */



function fromPromise(input, scheduler) {
    if (!scheduler) {
        return new Observable["a" /* Observable */](Object(subscribeToPromise["a" /* subscribeToPromise */])(input));
    }
    else {
        return new Observable["a" /* Observable */](function (subscriber) {
            var sub = new Subscription["a" /* Subscription */]();
            sub.add(scheduler.schedule(function () {
                return input.then(function (value) {
                    sub.add(scheduler.schedule(function () {
                        subscriber.next(value);
                        sub.add(scheduler.schedule(function () { return subscriber.complete(); }));
                    }));
                }, function (err) {
                    sub.add(scheduler.schedule(function () { return subscriber.error(err); }));
                });
            }));
            return sub;
        });
    }
}
//# sourceMappingURL=fromPromise.js.map

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/subscribeToIterable.js
var subscribeToIterable = __webpack_require__("bbae");

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/fromIterable.js
/** PURE_IMPORTS_START _Observable,_Subscription,_symbol_iterator,_util_subscribeToIterable PURE_IMPORTS_END */




function fromIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    if (!scheduler) {
        return new Observable["a" /* Observable */](Object(subscribeToIterable["a" /* subscribeToIterable */])(input));
    }
    else {
        return new Observable["a" /* Observable */](function (subscriber) {
            var sub = new Subscription["a" /* Subscription */]();
            var iterator;
            sub.add(function () {
                if (iterator && typeof iterator.return === 'function') {
                    iterator.return();
                }
            });
            sub.add(scheduler.schedule(function () {
                iterator = input[symbol_iterator["a" /* iterator */]]();
                sub.add(scheduler.schedule(function () {
                    if (subscriber.closed) {
                        return;
                    }
                    var value;
                    var done;
                    try {
                        var result = iterator.next();
                        value = result.value;
                        done = result.done;
                    }
                    catch (err) {
                        subscriber.error(err);
                        return;
                    }
                    if (done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(value);
                        this.schedule();
                    }
                }));
            }));
            return sub;
        });
    }
}
//# sourceMappingURL=fromIterable.js.map

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/subscribeToObservable.js
var subscribeToObservable = __webpack_require__("25c4");

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/fromObservable.js
/** PURE_IMPORTS_START _Observable,_Subscription,_symbol_observable,_util_subscribeToObservable PURE_IMPORTS_END */




function fromObservable(input, scheduler) {
    if (!scheduler) {
        return new Observable["a" /* Observable */](Object(subscribeToObservable["a" /* subscribeToObservable */])(input));
    }
    else {
        return new Observable["a" /* Observable */](function (subscriber) {
            var sub = new Subscription["a" /* Subscription */]();
            sub.add(scheduler.schedule(function () {
                var observable = input[symbol_observable["a" /* observable */]]();
                sub.add(observable.subscribe({
                    next: function (value) { sub.add(scheduler.schedule(function () { return subscriber.next(value); })); },
                    error: function (err) { sub.add(scheduler.schedule(function () { return subscriber.error(err); })); },
                    complete: function () { sub.add(scheduler.schedule(function () { return subscriber.complete(); })); },
                }));
            }));
            return sub;
        });
    }
}
//# sourceMappingURL=fromObservable.js.map

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/subscribeTo.js
var subscribeTo = __webpack_require__("1716");

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/from.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return from; });
/** PURE_IMPORTS_START _Observable,_util_isPromise,_util_isArrayLike,_util_isInteropObservable,_util_isIterable,_fromArray,_fromPromise,_fromIterable,_fromObservable,_util_subscribeTo PURE_IMPORTS_END */










function from(input, scheduler) {
    if (!scheduler) {
        if (input instanceof Observable["a" /* Observable */]) {
            return input;
        }
        return new Observable["a" /* Observable */](Object(subscribeTo["a" /* subscribeTo */])(input));
    }
    if (input != null) {
        if (isInteropObservable(input)) {
            return fromObservable(input, scheduler);
        }
        else if (Object(isPromise["a" /* isPromise */])(input)) {
            return fromPromise(input, scheduler);
        }
        else if (Object(isArrayLike["a" /* isArrayLike */])(input)) {
            return Object(fromArray["a" /* fromArray */])(input, scheduler);
        }
        else if (isIterable(input) || typeof input === 'string') {
            return fromIterable(input, scheduler);
        }
    }
    throw new TypeError((input !== null && typeof input || input) + ' is not observable');
}
//# sourceMappingURL=from.js.map


/***/ }),

/***/ "d4c0":
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__("0d58");
var gOPS = __webpack_require__("2621");
var pIE = __webpack_require__("52a7");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d790":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d817":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isFunction; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isFunction(x) {
    return typeof x === 'function';
}
//# sourceMappingURL=isFunction.js.map


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "d9e3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isArrayLike; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });
//# sourceMappingURL=isArrayLike.js.map


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e581":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_clipper_basic_vue_vue_type_style_index_0_id_7a87f694_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d790");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_clipper_basic_vue_vue_type_style_index_0_id_7a87f694_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_clipper_basic_vue_vue_type_style_index_0_id_7a87f694_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_clipper_basic_vue_vue_type_style_index_0_id_7a87f694_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e9a8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return empty; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("88bc");
/* harmony import */ var _util_hostReportError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("0ca4");
/** PURE_IMPORTS_START _config,_util_hostReportError PURE_IMPORTS_END */


var empty = {
    closed: true,
    next: function (value) { },
    error: function (err) {
        if (_config__WEBPACK_IMPORTED_MODULE_0__[/* config */ "a"].useDeprecatedSynchronousErrorHandling) {
            throw err;
        }
        else {
            Object(_util_hostReportError__WEBPACK_IMPORTED_MODULE_1__[/* hostReportError */ "a"])(err);
        }
    },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map


/***/ }),

/***/ "e9b9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Subscriber.js
var Subscriber = __webpack_require__("1453");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js
var rxSubscriber = __webpack_require__("2ff5");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Observer.js
var Observer = __webpack_require__("e9a8");

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/toSubscriber.js
/** PURE_IMPORTS_START _Subscriber,_symbol_rxSubscriber,_Observer PURE_IMPORTS_END */



function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber["a" /* Subscriber */]) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber["a" /* rxSubscriber */]]) {
            return nextOrObserver[rxSubscriber["a" /* rxSubscriber */]]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber["a" /* Subscriber */](Observer["a" /* empty */]);
    }
    return new Subscriber["a" /* Subscriber */](nextOrObserver, error, complete);
}
//# sourceMappingURL=toSubscriber.js.map

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/symbol/observable.js
var observable = __webpack_require__("c539");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/noop.js
var noop = __webpack_require__("fae9");

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/pipe.js
/** PURE_IMPORTS_START _noop PURE_IMPORTS_END */

function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
function pipeFromArray(fns) {
    if (!fns) {
        return noop["a" /* noop */];
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
//# sourceMappingURL=pipe.js.map

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/config.js
var config = __webpack_require__("88bc");

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/Observable.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Observable_Observable; });
/** PURE_IMPORTS_START _util_toSubscriber,_internal_symbol_observable,_util_pipe,_config PURE_IMPORTS_END */




var Observable_Observable = /*@__PURE__*/ (function () {
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink._addParentTeardownLogic(this.source || (config["a" /* config */].useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable) ?
                this._subscribe(sink) :
                this._trySubscribe(sink));
        }
        if (config["a" /* config */].useDeprecatedSynchronousErrorHandling) {
            if (sink.syncErrorThrowable) {
                sink.syncErrorThrowable = false;
                if (sink.syncErrorThrown) {
                    throw sink.syncErrorValue;
                }
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            if (config["a" /* config */].useDeprecatedSynchronousErrorHandling) {
                sink.syncErrorThrown = true;
                sink.syncErrorValue = err;
            }
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscription;
            subscription = _this.subscribe(function (value) {
                try {
                    next(value);
                }
                catch (err) {
                    reject(err);
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var source = this.source;
        return source && source.subscribe(subscriber);
    };
    Observable.prototype[observable["a" /* observable */]] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());

function getPromiseCtor(promiseCtor) {
    if (!promiseCtor) {
        promiseCtor = config["a" /* config */].Promise || Promise;
    }
    if (!promiseCtor) {
        throw new Error('no Promise impl found');
    }
    return promiseCtor;
}
//# sourceMappingURL=Observable.js.map


/***/ }),

/***/ "ebb6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return map; });
/* unused harmony export MapOperator */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9ab4");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("1453");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function map(project, thisArg) {
    return function mapOperation(source) {
        if (typeof project !== 'function') {
            throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
        }
        return source.lift(new MapOperator(project, thisArg));
    };
}
var MapOperator = /*@__PURE__*/ (function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}());

var MapSubscriber = /*@__PURE__*/ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "a"](MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.count = 0;
        _this.thisArg = thisArg || _this;
        return _this;
    }
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__[/* Subscriber */ "a"]));
//# sourceMappingURL=map.js.map


/***/ }),

/***/ "f04f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules//.cache//vue-loader","cacheIdentifier":"47426207-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/clipper-fixed.vue?vue&type=template&id=42d45bd2&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"clipper-fixed"},[_c('div',{staticClass:"wrap",style:(_vm.wrapStyle)},[_c('canvas',{staticClass:"stem-outer",attrs:{"width":_vm.stemArea.width,"height":_vm.stemArea.height}}),_c('div',{staticClass:"img-center"},[_c('canvas',{staticClass:"stem-bg"}),_c('div',{staticClass:"img-scale",style:(_vm.scaleStyle)},[_c('div',{staticClass:"img-translate",style:(_vm.translateStyle)},[_c('img',{staticClass:"img",style:(_vm.bgStyle),attrs:{"src":_vm.src},on:{"load":_vm.imgLoaded}})])])]),_c('div',{staticClass:"cover"},[_c('div',{staticClass:"area",style:(_vm.areaStyle)},[_c('canvas',{staticClass:"stem-area",style:(_vm.stemStyle),attrs:{"width":_vm.stemArea.width,"height":_vm.stemArea.height}}),(_vm.grid)?_c('div',{staticClass:"grid"},_vm._l((4),function(index){return _c('div',{key:'gridItem'+index,staticClass:"grid-item"})})):_vm._e()])])]),_c('canvas',{staticClass:"hidden-canvas"})])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/clipper-fixed.vue?vue&type=template&id=42d45bd2&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// EXTERNAL MODULE: ./src/components/extends/clippo.js + 4 modules
var clippo = __webpack_require__("bc00");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/filter.js
var filter = __webpack_require__("5670");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/map.js
var map = __webpack_require__("ebb6");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/concatMap.js
var concatMap = __webpack_require__("3e18");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/takeUntil.js
var takeUntil = __webpack_require__("9f2d");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/startWith.js + 5 modules
var startWith = __webpack_require__("a744");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/operators/merge.js + 1 modules
var merge = __webpack_require__("4d82");

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__("9ab4");

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Subscriber.js
var Subscriber = __webpack_require__("1453");

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/scan.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function scan(accumulator, seed) {
    var hasSeed = false;
    if (arguments.length >= 2) {
        hasSeed = true;
    }
    return function scanOperatorFunction(source) {
        return source.lift(new ScanOperator(accumulator, seed, hasSeed));
    };
}
var ScanOperator = /*@__PURE__*/ (function () {
    function ScanOperator(accumulator, seed, hasSeed) {
        if (hasSeed === void 0) {
            hasSeed = false;
        }
        this.accumulator = accumulator;
        this.seed = seed;
        this.hasSeed = hasSeed;
    }
    ScanOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new scan_ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
    };
    return ScanOperator;
}());
var scan_ScanSubscriber = /*@__PURE__*/ (function (_super) {
    tslib_es6["a" /* __extends */](ScanSubscriber, _super);
    function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
        var _this = _super.call(this, destination) || this;
        _this.accumulator = accumulator;
        _this._seed = _seed;
        _this.hasSeed = hasSeed;
        _this.index = 0;
        return _this;
    }
    Object.defineProperty(ScanSubscriber.prototype, "seed", {
        get: function () {
            return this._seed;
        },
        set: function (value) {
            this.hasSeed = true;
            this._seed = value;
        },
        enumerable: true,
        configurable: true
    });
    ScanSubscriber.prototype._next = function (value) {
        if (!this.hasSeed) {
            this.seed = value;
            this.destination.next(value);
        }
        else {
            return this._tryNext(value);
        }
    };
    ScanSubscriber.prototype._tryNext = function (value) {
        var index = this.index++;
        var result;
        try {
            result = this.accumulator(this.seed, value, index);
        }
        catch (err) {
            this.destination.error(err);
        }
        this.seed = result;
        this.destination.next(result);
    };
    return ScanSubscriber;
}(Subscriber["a" /* Subscriber */]));
//# sourceMappingURL=scan.js.map

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Subject.js + 2 modules
var Subject = __webpack_require__("2bd2");

// EXTERNAL MODULE: ./src/namespace.js
var namespace = __webpack_require__("0f53");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/clipper-fixed.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var clipper_fixedvue_type_script_lang_js_ = ({
  extends: {
    methods: clippo["b" /* fixedMethods */],
    mixins: [clippo["d" /* rxEventListeners */], clippo["e" /* rxWheelListeners */], clippo["c" /* pluginMethods */]]
  },
  subscriptions: function subscriptions() {
    var _this = this;

    this.setWH$ = new Subject["a" /* Subject */]();
    this.setTL$ = new Subject["a" /* Subject */]();
    this.onchange$ = new Subject["a" /* Subject */]();
    /** basic */

    this.mousedownDrag$ = this.mousedown$.pipe(Object(filter["a" /* filter */])(this.isDragElement), Object(map["a" /* map */])(this.prevent), Object(map["a" /* map */])(this.dragDownPos), Object(concatMap["a" /* concatMap */])(function (e) {
      return _this.mousemove$.pipe(Object(map["a" /* map */])(_this.prevent), Object(takeUntil["a" /* takeUntil */])(_this.mouseup$));
    }, function (down, move) {
      return {
        down: down,
        move: move
      };
    }));
    this.touchdownDrag$ = this.touchstart$.pipe(Object(filter["a" /* filter */])(this.isDragElement), Object(map["a" /* map */])(this.prevent), Object(filter["a" /* filter */])(function (e) {
      return e.touches.length === 1;
    }), Object(map["a" /* map */])(function (e) {
      return e.touches[0];
    }), Object(map["a" /* map */])(this.dragDownPos), Object(concatMap["a" /* concatMap */])(function (e) {
      return _this.touchmove$.pipe(Object(takeUntil["a" /* takeUntil */])(_this.touchend$), Object(filter["a" /* filter */])(function (e) {
        return e.touches.length === 1;
      }));
    }, function (down, move) {
      return {
        down: down,
        move: move.touches[0]
      };
    }));
    this.wheelEvent$ = this.wheel$.pipe(Object(filter["a" /* filter */])(this.isDragElement), Object(map["a" /* map */])(this.prevent), Object(map["a" /* map */])(function (e) {
      return e.deltaY;
    }), Object(map["a" /* map */])(function (deltaY) {
      return deltaY >= 0 ? -1 : 1;
    }));
    this.touchTwoFinger$ = this.touchstart$.pipe(Object(filter["a" /* filter */])(this.isDragElement), Object(filter["a" /* filter */])(function (e) {
      return e.touches.length === 2;
    }), Object(map["a" /* map */])(this.prevent), Object(map["a" /* map */])(this.towPointsTouches), Object(map["a" /* map */])(this.setOrigin), Object(concatMap["a" /* concatMap */])(function (e) {
      return _this.touchmove$.pipe(Object(takeUntil["a" /* takeUntil */])(_this.touchend$), Object(filter["a" /* filter */])(function (e) {
        return e.touches.length === 2;
      }), Object(map["a" /* map */])(_this.towPointsTouches));
    }, function (_ref, move) {
      var down = _ref.down,
          origin = _ref.origin;
      return {
        down: down,
        move: move,
        origin: origin
      };
    }), Object(map["a" /* map */])(this.twoPointsDelta));
    /** Zoom Subject */

    this.wheelZoom$ = new Subject["a" /* Subject */]().pipe(Object(startWith["a" /* startWith */])(1), Object(merge["a" /* merge */])(this.wheelEvent$), scan(function (origin, delta) {
      var rate = _this.zoomRate * Math.max(origin, 0.8) * delta;
      return Math.max(origin + rate, _this.minScale);
    }));
    this.touchZoom$ = new Subject["a" /* Subject */]().pipe(Object(startWith["a" /* startWith */])(1), Object(merge["a" /* merge */])(this.touchTwoFinger$), scan(function (origin, delta) {
      var rate = Math.max(origin, 0.8) * delta;
      return Math.max(origin + rate, _this.minScale);
    }));
    this.zoomSubject$ = new Subject["a" /* Subject */]().pipe(Object(merge["a" /* merge */])(this.setWH$), Object(merge["a" /* merge */])(this.wheelZoom$), Object(merge["a" /* merge */])(this.touchZoom$));
    /** Drag Subject */

    this.dragSubject$ = new Subject["a" /* Subject */]().pipe(Object(startWith["a" /* startWith */])({
      left: 0,
      top: 0
    }), Object(merge["a" /* merge */])(this.setTL$), Object(merge["a" /* merge */])(this.mousedownDrag$.pipe(Object(merge["a" /* merge */])(this.touchdownDrag$), Object(map["a" /* map */])(this.delta), Object(map["a" /* map */])(this.toPercentage) //map(this.validateTL)
    )));
    return {
      bgWH$: this.zoomSubject$,
      bgTL$: this.dragSubject$
    };
  },
  data: function data() {
    return {
      imgRatio: 1
    };
  },
  props: {
    src: {
      type: String
    },
    rotate: {
      type: Number,
      default: 0
    },
    ratio: {
      type: Number,
      default: 1
    },
    zoomRate: {
      type: Number,
      default: 0.04
    },
    minScale: {
      type: Number,
      default: 0.1
    },
    bgColor: {
      type: String,
      default: "white"
    },
    border: {
      type: Number,
      default: 1
    },
    grid: {
      type: Boolean,
      default: true
    },
    shadow: {
      type: String,
      default: 'rgba(0, 0, 0, 0.4)'
    },
    preview: {
      type: String
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.imgEl = this.$el.querySelector(".img");
    this.wrapEl = this.$el.querySelector(".wrap");
    this.areaEl = this.$el.querySelector(".area");
    this.scaleEl = this.$el.querySelector(".img-scale");
    this.translateEl = this.$el.querySelector(".img-translate");
    this.stemEl = this.$el.querySelector(".stem-bg");
    this.canvasEl = this.$el.querySelector(".hidden-canvas");
    this.$subscribeTo(this.zoomSubject$.pipe(Object(merge["a" /* merge */])(this.dragSubject$), Object(merge["a" /* merge */])(this.onchange$)), function () {
      _this2.$nextTick(function () {
        var result = _this2.getDrawPos().pos;

        var rotate = _this2.rotate;
        if (_this2.invalidDrawPos(result)) return;

        _this2.callPreview("locateImage", result, rotate);
      });
    });
  },
  methods: {
    imgLoaded: function imgLoaded() {
      this.resetData();
      this.imgRatio = this.imgEl.naturalWidth / this.imgEl.naturalHeight;
      this.stemEl.width = this.imgEl.naturalWidth;
      this.stemEl.height = this.imgEl.naturalHeight;
      this.callPreview("setData", {
        src: this.src,
        bgColor: this.bgColor
      });
    },
    resetData: function resetData() {
      this.setTL$.next({
        left: 0,
        top: 0
      });
      this.setWH$.next(1);
    }
  },
  computed: {
    areaStyle: function areaStyle() {
      var style = {
        color: this.shadow,
        borderWidth: this.border + "px",
        boxShadow: "0 0 0 " + this._shadow
      };
      this.ratio >= 1 ? style.width = "50%" : style.height = "50%";
      return style;
    },
    scaleStyle: function scaleStyle() {
      var width = this.bgWH$;
      return {
        transform: "scale(".concat(width, ")")
      };
    },
    translateStyle: function translateStyle() {
      var left = this.bgTL$.left;
      var top = this.bgTL$.top;
      return {
        transform: "translate(".concat(left, "%,").concat(top, "%)")
      };
    },
    bgStyle: function bgStyle() {
      this.onchange$.next(0);
      return {
        transform: "rotate(".concat(this.rotate, "deg)")
      };
    },
    wrapStyle: function wrapStyle() {
      return {
        backgroundColor: this.watchPreData.bgColor
      };
    },
    stemArea: function stemArea() {
      return {
        width: 10,
        height: 10 / this.ratio
      };
    },
    stemStyle: function stemStyle() {
      var style = {};
      this.ratio >= 1 ? style.width = "100%" : style.height = "100%";
      return style;
    },
    _shadow: function _shadow() {
      return (this.imgRatio >= 1 ? 100 : 100 / this.imgRatio) + "vw";
    },
    watchPreData: function watchPreData() {
      this.callPreview("setData", {
        bgColor: this.bgColor
      });
      return {
        bgColor: this.bgColor
      };
    }
  }
});
// CONCATENATED MODULE: ./src/components/clipper-fixed.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_clipper_fixedvue_type_script_lang_js_ = (clipper_fixedvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/clipper-fixed.vue?vue&type=style&index=0&id=42d45bd2&lang=scss&scoped=true&
var clipper_fixedvue_type_style_index_0_id_42d45bd2_lang_scss_scoped_true_ = __webpack_require__("fb76");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/clipper-fixed.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_clipper_fixedvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "42d45bd2",
  null
  
)

component.options.__file = "clipper-fixed.vue"
/* harmony default export */ var clipper_fixed = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "f298":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_clipper_range_vue_vue_type_style_index_0_id_1f0da112_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5438");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_clipper_range_vue_vue_type_style_index_0_id_1f0da112_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_clipper_range_vue_vue_type_style_index_0_id_1f0da112_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_clipper_range_vue_vue_type_style_index_0_id_1f0da112_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "f751":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("5ca1");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("7333") });


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fad2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return subscribeToArray; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var subscribeToArray = function (array) {
    return function (subscriber) {
        for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        if (!subscriber.closed) {
            subscriber.complete();
        }
    };
};
//# sourceMappingURL=subscribeToArray.js.map


/***/ }),

/***/ "fae9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return noop; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function noop() { }
//# sourceMappingURL=noop.js.map


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _setPublicPath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1eb2");
/* harmony import */ var _setPublicPath__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_setPublicPath__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("6888");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clipperBasic", function() { return _entry__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clipperFixed", function() { return _entry__WEBPACK_IMPORTED_MODULE_1__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clipperPreview", function() { return _entry__WEBPACK_IMPORTED_MODULE_1__["c"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clipperRange", function() { return _entry__WEBPACK_IMPORTED_MODULE_1__["d"]; });



/* harmony default export */ __webpack_exports__["default"] = (_entry__WEBPACK_IMPORTED_MODULE_1__[/* default */ "e"]);



/***/ }),

/***/ "fb76":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_clipper_fixed_vue_vue_type_style_index_0_id_42d45bd2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0511");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_clipper_fixed_vue_vue_type_style_index_0_id_42d45bd2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_clipper_fixed_vue_vue_type_style_index_0_id_42d45bd2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_clipper_fixed_vue_vue_type_style_index_0_id_42d45bd2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "fd66":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isPromise; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}
//# sourceMappingURL=isPromise.js.map


/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

/******/ });
});
//# sourceMappingURL=vuejs-clipper.umd.js.map