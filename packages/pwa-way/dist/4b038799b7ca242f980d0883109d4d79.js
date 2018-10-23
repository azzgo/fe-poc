// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({73:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children,
        text: text, elm: elm, key: key };
}
exports.vnode = vnode;
exports.default = vnode;
//# sourceMappingURL=vnode.js.map
},{}],74:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array = Array.isArray;
function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}
exports.primitive = primitive;
//# sourceMappingURL=is.js.map
},{}],77:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vnode_1 = require("./vnode");
var is = require("./is");
function addNS(data, children, sel) {
    data.ns = 'http://www.w3.org/2000/svg';
    if (sel !== 'foreignObject' && children !== undefined) {
        for (var i = 0; i < children.length; ++i) {
            var childData = children[i].data;
            if (childData !== undefined) {
                addNS(childData, children[i].children, children[i].sel);
            }
        }
    }
}
function h(sel, b, c) {
    var data = {}, children, text, i;
    if (c !== undefined) {
        data = b;
        if (is.array(c)) {
            children = c;
        }
        else if (is.primitive(c)) {
            text = c;
        }
        else if (c && c.sel) {
            children = [c];
        }
    }
    else if (b !== undefined) {
        if (is.array(b)) {
            children = b;
        }
        else if (is.primitive(b)) {
            text = b;
        }
        else if (b && b.sel) {
            children = [b];
        }
        else {
            data = b;
        }
    }
    if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
            if (is.primitive(children[i]))
                children[i] = vnode_1.vnode(undefined, undefined, undefined, children[i]);
        }
    }
    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
        addNS(data, children, sel);
    }
    return vnode_1.vnode(sel, data, children, text, undefined);
}
exports.h = h;
;
exports.default = h;
//# sourceMappingURL=h.js.map
},{"./vnode":73,"./is":74}],31:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.thunk = thunk;

var _h = require("snabbdom/h");

function copyToThunk(vnode, thunkVNode) {
  thunkVNode.elm = vnode.elm;
  vnode.data.fn = thunkVNode.data.fn;
  vnode.data.args = thunkVNode.data.args;
  vnode.data.isolate = thunkVNode.data.isolate;
  thunkVNode.data = vnode.data;
  thunkVNode.children = vnode.children;
  thunkVNode.text = vnode.text;
  thunkVNode.elm = vnode.elm;
}
function init(thunkVNode) {
  var cur = thunkVNode.data;
  var vnode = cur.fn.apply(undefined, cur.args);
  copyToThunk(vnode, thunkVNode);
}
function prepatch(oldVnode, thunkVNode) {
  var old = oldVnode.data,
      cur = thunkVNode.data;
  var i;
  var oldArgs = old.args,
      args = cur.args;
  if (old.fn !== cur.fn || oldArgs.length !== args.length) {
    copyToThunk(cur.fn.apply(undefined, args), thunkVNode);
  }
  for (i = 0; i < args.length; ++i) {
    if (oldArgs[i] !== args[i]) {
      copyToThunk(cur.fn.apply(undefined, args), thunkVNode);
      return;
    }
  }
  copyToThunk(oldVnode, thunkVNode);
}
function thunk(sel, key, fn, args) {
  if (args === undefined) {
    args = fn;
    fn = key;
    key = undefined;
  }
  return (0, _h.h)(sel, {
    key: key,
    hook: { init: init, prepatch: prepatch },
    fn: fn,
    args: args
  });
}
exports.default = thunk;
//# sourceMappingURL=thunk.js.map
},{"snabbdom/h":77}],95:[function(require,module,exports) {
var global = (1,eval)("this");
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getGlobal() {
    var globalObj;
    if (typeof window !== 'undefined') {
        globalObj = window;
    }
    else if (typeof global !== 'undefined') {
        globalObj = global;
    }
    else {
        globalObj = this;
    }
    globalObj.Cyclejs = globalObj.Cyclejs || {};
    globalObj = globalObj.Cyclejs;
    globalObj.adaptStream = globalObj.adaptStream || (function (x) { return x; });
    return globalObj;
}
function setAdapt(f) {
    getGlobal().adaptStream = f;
}
exports.setAdapt = setAdapt;
function adapt(stream) {
    return getGlobal().adaptStream(stream);
}
exports.adapt = adapt;
//# sourceMappingURL=adapt.js.map
},{}],61:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
  var result;
  var _Symbol = root.Symbol;

  if (typeof _Symbol === 'function') {
    if (_Symbol.observable) {
      result = _Symbol.observable;
    } else {
      result = _Symbol('observable');
      _Symbol.observable = result;
    }
  } else {
    result = '@@observable';
  }

  return result;
};
},{}],59:[function(require,module,exports) {
var global = (1,eval)("this");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = require("./ponyfill");

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2.default)(root);
exports.default = result;
},{"./ponyfill":61}],16:[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var symbol_observable_1 = require("symbol-observable");
var NO = {};
exports.NO = NO;
function noop() { }
function cp(a) {
    var l = a.length;
    var b = Array(l);
    for (var i = 0; i < l; ++i)
        b[i] = a[i];
    return b;
}
function and(f1, f2) {
    return function andFn(t) {
        return f1(t) && f2(t);
    };
}
function _try(c, t, u) {
    try {
        return c.f(t);
    }
    catch (e) {
        u._e(e);
        return NO;
    }
}
var NO_IL = {
    _n: noop,
    _e: noop,
    _c: noop,
};
exports.NO_IL = NO_IL;
// mutates the input
function internalizeProducer(producer) {
    producer._start = function _start(il) {
        il.next = il._n;
        il.error = il._e;
        il.complete = il._c;
        this.start(il);
    };
    producer._stop = producer.stop;
}
var StreamSub = /** @class */ (function () {
    function StreamSub(_stream, _listener) {
        this._stream = _stream;
        this._listener = _listener;
    }
    StreamSub.prototype.unsubscribe = function () {
        this._stream.removeListener(this._listener);
    };
    return StreamSub;
}());
var Observer = /** @class */ (function () {
    function Observer(_listener) {
        this._listener = _listener;
    }
    Observer.prototype.next = function (value) {
        this._listener._n(value);
    };
    Observer.prototype.error = function (err) {
        this._listener._e(err);
    };
    Observer.prototype.complete = function () {
        this._listener._c();
    };
    return Observer;
}());
var FromObservable = /** @class */ (function () {
    function FromObservable(observable) {
        this.type = 'fromObservable';
        this.ins = observable;
        this.active = false;
    }
    FromObservable.prototype._start = function (out) {
        this.out = out;
        this.active = true;
        this._sub = this.ins.subscribe(new Observer(out));
        if (!this.active)
            this._sub.unsubscribe();
    };
    FromObservable.prototype._stop = function () {
        if (this._sub)
            this._sub.unsubscribe();
        this.active = false;
    };
    return FromObservable;
}());
var Merge = /** @class */ (function () {
    function Merge(insArr) {
        this.type = 'merge';
        this.insArr = insArr;
        this.out = NO;
        this.ac = 0;
    }
    Merge.prototype._start = function (out) {
        this.out = out;
        var s = this.insArr;
        var L = s.length;
        this.ac = L;
        for (var i = 0; i < L; i++)
            s[i]._add(this);
    };
    Merge.prototype._stop = function () {
        var s = this.insArr;
        var L = s.length;
        for (var i = 0; i < L; i++)
            s[i]._remove(this);
        this.out = NO;
    };
    Merge.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        u._n(t);
    };
    Merge.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Merge.prototype._c = function () {
        if (--this.ac <= 0) {
            var u = this.out;
            if (u === NO)
                return;
            u._c();
        }
    };
    return Merge;
}());
var CombineListener = /** @class */ (function () {
    function CombineListener(i, out, p) {
        this.i = i;
        this.out = out;
        this.p = p;
        p.ils.push(this);
    }
    CombineListener.prototype._n = function (t) {
        var p = this.p, out = this.out;
        if (out === NO)
            return;
        if (p.up(t, this.i)) {
            var a = p.vals;
            var l = a.length;
            var b = Array(l);
            for (var i = 0; i < l; ++i)
                b[i] = a[i];
            out._n(b);
        }
    };
    CombineListener.prototype._e = function (err) {
        var out = this.out;
        if (out === NO)
            return;
        out._e(err);
    };
    CombineListener.prototype._c = function () {
        var p = this.p;
        if (p.out === NO)
            return;
        if (--p.Nc === 0)
            p.out._c();
    };
    return CombineListener;
}());
var Combine = /** @class */ (function () {
    function Combine(insArr) {
        this.type = 'combine';
        this.insArr = insArr;
        this.out = NO;
        this.ils = [];
        this.Nc = this.Nn = 0;
        this.vals = [];
    }
    Combine.prototype.up = function (t, i) {
        var v = this.vals[i];
        var Nn = !this.Nn ? 0 : v === NO ? --this.Nn : this.Nn;
        this.vals[i] = t;
        return Nn === 0;
    };
    Combine.prototype._start = function (out) {
        this.out = out;
        var s = this.insArr;
        var n = this.Nc = this.Nn = s.length;
        var vals = this.vals = new Array(n);
        if (n === 0) {
            out._n([]);
            out._c();
        }
        else {
            for (var i = 0; i < n; i++) {
                vals[i] = NO;
                s[i]._add(new CombineListener(i, out, this));
            }
        }
    };
    Combine.prototype._stop = function () {
        var s = this.insArr;
        var n = s.length;
        var ils = this.ils;
        for (var i = 0; i < n; i++)
            s[i]._remove(ils[i]);
        this.out = NO;
        this.ils = [];
        this.vals = [];
    };
    return Combine;
}());
var FromArray = /** @class */ (function () {
    function FromArray(a) {
        this.type = 'fromArray';
        this.a = a;
    }
    FromArray.prototype._start = function (out) {
        var a = this.a;
        for (var i = 0, n = a.length; i < n; i++)
            out._n(a[i]);
        out._c();
    };
    FromArray.prototype._stop = function () {
    };
    return FromArray;
}());
var FromPromise = /** @class */ (function () {
    function FromPromise(p) {
        this.type = 'fromPromise';
        this.on = false;
        this.p = p;
    }
    FromPromise.prototype._start = function (out) {
        var prod = this;
        this.on = true;
        this.p.then(function (v) {
            if (prod.on) {
                out._n(v);
                out._c();
            }
        }, function (e) {
            out._e(e);
        }).then(noop, function (err) {
            setTimeout(function () { throw err; });
        });
    };
    FromPromise.prototype._stop = function () {
        this.on = false;
    };
    return FromPromise;
}());
var Periodic = /** @class */ (function () {
    function Periodic(period) {
        this.type = 'periodic';
        this.period = period;
        this.intervalID = -1;
        this.i = 0;
    }
    Periodic.prototype._start = function (out) {
        var self = this;
        function intervalHandler() { out._n(self.i++); }
        this.intervalID = setInterval(intervalHandler, this.period);
    };
    Periodic.prototype._stop = function () {
        if (this.intervalID !== -1)
            clearInterval(this.intervalID);
        this.intervalID = -1;
        this.i = 0;
    };
    return Periodic;
}());
var Debug = /** @class */ (function () {
    function Debug(ins, arg) {
        this.type = 'debug';
        this.ins = ins;
        this.out = NO;
        this.s = noop;
        this.l = '';
        if (typeof arg === 'string')
            this.l = arg;
        else if (typeof arg === 'function')
            this.s = arg;
    }
    Debug.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    Debug.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Debug.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var s = this.s, l = this.l;
        if (s !== noop) {
            try {
                s(t);
            }
            catch (e) {
                u._e(e);
            }
        }
        else if (l)
            console.log(l + ':', t);
        else
            console.log(t);
        u._n(t);
    };
    Debug.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Debug.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Debug;
}());
var Drop = /** @class */ (function () {
    function Drop(max, ins) {
        this.type = 'drop';
        this.ins = ins;
        this.out = NO;
        this.max = max;
        this.dropped = 0;
    }
    Drop.prototype._start = function (out) {
        this.out = out;
        this.dropped = 0;
        this.ins._add(this);
    };
    Drop.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Drop.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        if (this.dropped++ >= this.max)
            u._n(t);
    };
    Drop.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Drop.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Drop;
}());
var EndWhenListener = /** @class */ (function () {
    function EndWhenListener(out, op) {
        this.out = out;
        this.op = op;
    }
    EndWhenListener.prototype._n = function () {
        this.op.end();
    };
    EndWhenListener.prototype._e = function (err) {
        this.out._e(err);
    };
    EndWhenListener.prototype._c = function () {
        this.op.end();
    };
    return EndWhenListener;
}());
var EndWhen = /** @class */ (function () {
    function EndWhen(o, ins) {
        this.type = 'endWhen';
        this.ins = ins;
        this.out = NO;
        this.o = o;
        this.oil = NO_IL;
    }
    EndWhen.prototype._start = function (out) {
        this.out = out;
        this.o._add(this.oil = new EndWhenListener(out, this));
        this.ins._add(this);
    };
    EndWhen.prototype._stop = function () {
        this.ins._remove(this);
        this.o._remove(this.oil);
        this.out = NO;
        this.oil = NO_IL;
    };
    EndWhen.prototype.end = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    EndWhen.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        u._n(t);
    };
    EndWhen.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    EndWhen.prototype._c = function () {
        this.end();
    };
    return EndWhen;
}());
var Filter = /** @class */ (function () {
    function Filter(passes, ins) {
        this.type = 'filter';
        this.ins = ins;
        this.out = NO;
        this.f = passes;
    }
    Filter.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    Filter.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Filter.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var r = _try(this, t, u);
        if (r === NO || !r)
            return;
        u._n(t);
    };
    Filter.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Filter.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Filter;
}());
var FlattenListener = /** @class */ (function () {
    function FlattenListener(out, op) {
        this.out = out;
        this.op = op;
    }
    FlattenListener.prototype._n = function (t) {
        this.out._n(t);
    };
    FlattenListener.prototype._e = function (err) {
        this.out._e(err);
    };
    FlattenListener.prototype._c = function () {
        this.op.inner = NO;
        this.op.less();
    };
    return FlattenListener;
}());
var Flatten = /** @class */ (function () {
    function Flatten(ins) {
        this.type = 'flatten';
        this.ins = ins;
        this.out = NO;
        this.open = true;
        this.inner = NO;
        this.il = NO_IL;
    }
    Flatten.prototype._start = function (out) {
        this.out = out;
        this.open = true;
        this.inner = NO;
        this.il = NO_IL;
        this.ins._add(this);
    };
    Flatten.prototype._stop = function () {
        this.ins._remove(this);
        if (this.inner !== NO)
            this.inner._remove(this.il);
        this.out = NO;
        this.open = true;
        this.inner = NO;
        this.il = NO_IL;
    };
    Flatten.prototype.less = function () {
        var u = this.out;
        if (u === NO)
            return;
        if (!this.open && this.inner === NO)
            u._c();
    };
    Flatten.prototype._n = function (s) {
        var u = this.out;
        if (u === NO)
            return;
        var _a = this, inner = _a.inner, il = _a.il;
        if (inner !== NO && il !== NO_IL)
            inner._remove(il);
        (this.inner = s)._add(this.il = new FlattenListener(u, this));
    };
    Flatten.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Flatten.prototype._c = function () {
        this.open = false;
        this.less();
    };
    return Flatten;
}());
var Fold = /** @class */ (function () {
    function Fold(f, seed, ins) {
        var _this = this;
        this.type = 'fold';
        this.ins = ins;
        this.out = NO;
        this.f = function (t) { return f(_this.acc, t); };
        this.acc = this.seed = seed;
    }
    Fold.prototype._start = function (out) {
        this.out = out;
        this.acc = this.seed;
        out._n(this.acc);
        this.ins._add(this);
    };
    Fold.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
        this.acc = this.seed;
    };
    Fold.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var r = _try(this, t, u);
        if (r === NO)
            return;
        u._n(this.acc = r);
    };
    Fold.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Fold.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Fold;
}());
var Last = /** @class */ (function () {
    function Last(ins) {
        this.type = 'last';
        this.ins = ins;
        this.out = NO;
        this.has = false;
        this.val = NO;
    }
    Last.prototype._start = function (out) {
        this.out = out;
        this.has = false;
        this.ins._add(this);
    };
    Last.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
        this.val = NO;
    };
    Last.prototype._n = function (t) {
        this.has = true;
        this.val = t;
    };
    Last.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Last.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        if (this.has) {
            u._n(this.val);
            u._c();
        }
        else
            u._e(new Error('last() failed because input stream completed'));
    };
    return Last;
}());
var MapOp = /** @class */ (function () {
    function MapOp(project, ins) {
        this.type = 'map';
        this.ins = ins;
        this.out = NO;
        this.f = project;
    }
    MapOp.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    MapOp.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    MapOp.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var r = _try(this, t, u);
        if (r === NO)
            return;
        u._n(r);
    };
    MapOp.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    MapOp.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return MapOp;
}());
var Remember = /** @class */ (function () {
    function Remember(ins) {
        this.type = 'remember';
        this.ins = ins;
        this.out = NO;
    }
    Remember.prototype._start = function (out) {
        this.out = out;
        this.ins._add(out);
    };
    Remember.prototype._stop = function () {
        this.ins._remove(this.out);
        this.out = NO;
    };
    return Remember;
}());
var ReplaceError = /** @class */ (function () {
    function ReplaceError(replacer, ins) {
        this.type = 'replaceError';
        this.ins = ins;
        this.out = NO;
        this.f = replacer;
    }
    ReplaceError.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    ReplaceError.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    ReplaceError.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        u._n(t);
    };
    ReplaceError.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        try {
            this.ins._remove(this);
            (this.ins = this.f(err))._add(this);
        }
        catch (e) {
            u._e(e);
        }
    };
    ReplaceError.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return ReplaceError;
}());
var StartWith = /** @class */ (function () {
    function StartWith(ins, val) {
        this.type = 'startWith';
        this.ins = ins;
        this.out = NO;
        this.val = val;
    }
    StartWith.prototype._start = function (out) {
        this.out = out;
        this.out._n(this.val);
        this.ins._add(out);
    };
    StartWith.prototype._stop = function () {
        this.ins._remove(this.out);
        this.out = NO;
    };
    return StartWith;
}());
var Take = /** @class */ (function () {
    function Take(max, ins) {
        this.type = 'take';
        this.ins = ins;
        this.out = NO;
        this.max = max;
        this.taken = 0;
    }
    Take.prototype._start = function (out) {
        this.out = out;
        this.taken = 0;
        if (this.max <= 0)
            out._c();
        else
            this.ins._add(this);
    };
    Take.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Take.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var m = ++this.taken;
        if (m < this.max)
            u._n(t);
        else if (m === this.max) {
            u._n(t);
            u._c();
        }
    };
    Take.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Take.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Take;
}());
var Stream = /** @class */ (function () {
    function Stream(producer) {
        this._prod = producer || NO;
        this._ils = [];
        this._stopID = NO;
        this._dl = NO;
        this._d = false;
        this._target = NO;
        this._err = NO;
    }
    Stream.prototype._n = function (t) {
        var a = this._ils;
        var L = a.length;
        if (this._d)
            this._dl._n(t);
        if (L == 1)
            a[0]._n(t);
        else if (L == 0)
            return;
        else {
            var b = cp(a);
            for (var i = 0; i < L; i++)
                b[i]._n(t);
        }
    };
    Stream.prototype._e = function (err) {
        if (this._err !== NO)
            return;
        this._err = err;
        var a = this._ils;
        var L = a.length;
        this._x();
        if (this._d)
            this._dl._e(err);
        if (L == 1)
            a[0]._e(err);
        else if (L == 0)
            return;
        else {
            var b = cp(a);
            for (var i = 0; i < L; i++)
                b[i]._e(err);
        }
        if (!this._d && L == 0)
            throw this._err;
    };
    Stream.prototype._c = function () {
        var a = this._ils;
        var L = a.length;
        this._x();
        if (this._d)
            this._dl._c();
        if (L == 1)
            a[0]._c();
        else if (L == 0)
            return;
        else {
            var b = cp(a);
            for (var i = 0; i < L; i++)
                b[i]._c();
        }
    };
    Stream.prototype._x = function () {
        if (this._ils.length === 0)
            return;
        if (this._prod !== NO)
            this._prod._stop();
        this._err = NO;
        this._ils = [];
    };
    Stream.prototype._stopNow = function () {
        // WARNING: code that calls this method should
        // first check if this._prod is valid (not `NO`)
        this._prod._stop();
        this._err = NO;
        this._stopID = NO;
    };
    Stream.prototype._add = function (il) {
        var ta = this._target;
        if (ta !== NO)
            return ta._add(il);
        var a = this._ils;
        a.push(il);
        if (a.length > 1)
            return;
        if (this._stopID !== NO) {
            clearTimeout(this._stopID);
            this._stopID = NO;
        }
        else {
            var p = this._prod;
            if (p !== NO)
                p._start(this);
        }
    };
    Stream.prototype._remove = function (il) {
        var _this = this;
        var ta = this._target;
        if (ta !== NO)
            return ta._remove(il);
        var a = this._ils;
        var i = a.indexOf(il);
        if (i > -1) {
            a.splice(i, 1);
            if (this._prod !== NO && a.length <= 0) {
                this._err = NO;
                this._stopID = setTimeout(function () { return _this._stopNow(); });
            }
            else if (a.length === 1) {
                this._pruneCycles();
            }
        }
    };
    // If all paths stemming from `this` stream eventually end at `this`
    // stream, then we remove the single listener of `this` stream, to
    // force it to end its execution and dispose resources. This method
    // assumes as a precondition that this._ils has just one listener.
    Stream.prototype._pruneCycles = function () {
        if (this._hasNoSinks(this, []))
            this._remove(this._ils[0]);
    };
    // Checks whether *there is no* path starting from `x` that leads to an end
    // listener (sink) in the stream graph, following edges A->B where B is a
    // listener of A. This means these paths constitute a cycle somehow. Is given
    // a trace of all visited nodes so far.
    Stream.prototype._hasNoSinks = function (x, trace) {
        if (trace.indexOf(x) !== -1)
            return true;
        else if (x.out === this)
            return true;
        else if (x.out && x.out !== NO)
            return this._hasNoSinks(x.out, trace.concat(x));
        else if (x._ils) {
            for (var i = 0, N = x._ils.length; i < N; i++)
                if (!this._hasNoSinks(x._ils[i], trace.concat(x)))
                    return false;
            return true;
        }
        else
            return false;
    };
    Stream.prototype.ctor = function () {
        return this instanceof MemoryStream ? MemoryStream : Stream;
    };
    /**
     * Adds a Listener to the Stream.
     *
     * @param {Listener} listener
     */
    Stream.prototype.addListener = function (listener) {
        listener._n = listener.next || noop;
        listener._e = listener.error || noop;
        listener._c = listener.complete || noop;
        this._add(listener);
    };
    /**
     * Removes a Listener from the Stream, assuming the Listener was added to it.
     *
     * @param {Listener<T>} listener
     */
    Stream.prototype.removeListener = function (listener) {
        this._remove(listener);
    };
    /**
     * Adds a Listener to the Stream returning a Subscription to remove that
     * listener.
     *
     * @param {Listener} listener
     * @returns {Subscription}
     */
    Stream.prototype.subscribe = function (listener) {
        this.addListener(listener);
        return new StreamSub(this, listener);
    };
    /**
     * Add interop between most.js and RxJS 5
     *
     * @returns {Stream}
     */
    Stream.prototype[symbol_observable_1.default] = function () {
        return this;
    };
    /**
     * Creates a new Stream given a Producer.
     *
     * @factory true
     * @param {Producer} producer An optional Producer that dictates how to
     * start, generate events, and stop the Stream.
     * @return {Stream}
     */
    Stream.create = function (producer) {
        if (producer) {
            if (typeof producer.start !== 'function'
                || typeof producer.stop !== 'function')
                throw new Error('producer requires both start and stop functions');
            internalizeProducer(producer); // mutates the input
        }
        return new Stream(producer);
    };
    /**
     * Creates a new MemoryStream given a Producer.
     *
     * @factory true
     * @param {Producer} producer An optional Producer that dictates how to
     * start, generate events, and stop the Stream.
     * @return {MemoryStream}
     */
    Stream.createWithMemory = function (producer) {
        if (producer)
            internalizeProducer(producer); // mutates the input
        return new MemoryStream(producer);
    };
    /**
     * Creates a Stream that does nothing when started. It never emits any event.
     *
     * Marble diagram:
     *
     * ```text
     *          never
     * -----------------------
     * ```
     *
     * @factory true
     * @return {Stream}
     */
    Stream.never = function () {
        return new Stream({ _start: noop, _stop: noop });
    };
    /**
     * Creates a Stream that immediately emits the "complete" notification when
     * started, and that's it.
     *
     * Marble diagram:
     *
     * ```text
     * empty
     * -|
     * ```
     *
     * @factory true
     * @return {Stream}
     */
    Stream.empty = function () {
        return new Stream({
            _start: function (il) { il._c(); },
            _stop: noop,
        });
    };
    /**
     * Creates a Stream that immediately emits an "error" notification with the
     * value you passed as the `error` argument when the stream starts, and that's
     * it.
     *
     * Marble diagram:
     *
     * ```text
     * throw(X)
     * -X
     * ```
     *
     * @factory true
     * @param error The error event to emit on the created stream.
     * @return {Stream}
     */
    Stream.throw = function (error) {
        return new Stream({
            _start: function (il) { il._e(error); },
            _stop: noop,
        });
    };
    /**
     * Creates a stream from an Array, Promise, or an Observable.
     *
     * @factory true
     * @param {Array|PromiseLike|Observable} input The input to make a stream from.
     * @return {Stream}
     */
    Stream.from = function (input) {
        if (typeof input[symbol_observable_1.default] === 'function')
            return Stream.fromObservable(input);
        else if (typeof input.then === 'function')
            return Stream.fromPromise(input);
        else if (Array.isArray(input))
            return Stream.fromArray(input);
        throw new TypeError("Type of input to from() must be an Array, Promise, or Observable");
    };
    /**
     * Creates a Stream that immediately emits the arguments that you give to
     * *of*, then completes.
     *
     * Marble diagram:
     *
     * ```text
     * of(1,2,3)
     * 123|
     * ```
     *
     * @factory true
     * @param a The first value you want to emit as an event on the stream.
     * @param b The second value you want to emit as an event on the stream. One
     * or more of these values may be given as arguments.
     * @return {Stream}
     */
    Stream.of = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return Stream.fromArray(items);
    };
    /**
     * Converts an array to a stream. The returned stream will emit synchronously
     * all the items in the array, and then complete.
     *
     * Marble diagram:
     *
     * ```text
     * fromArray([1,2,3])
     * 123|
     * ```
     *
     * @factory true
     * @param {Array} array The array to be converted as a stream.
     * @return {Stream}
     */
    Stream.fromArray = function (array) {
        return new Stream(new FromArray(array));
    };
    /**
     * Converts a promise to a stream. The returned stream will emit the resolved
     * value of the promise, and then complete. However, if the promise is
     * rejected, the stream will emit the corresponding error.
     *
     * Marble diagram:
     *
     * ```text
     * fromPromise( ----42 )
     * -----------------42|
     * ```
     *
     * @factory true
     * @param {PromiseLike} promise The promise to be converted as a stream.
     * @return {Stream}
     */
    Stream.fromPromise = function (promise) {
        return new Stream(new FromPromise(promise));
    };
    /**
     * Converts an Observable into a Stream.
     *
     * @factory true
     * @param {any} observable The observable to be converted as a stream.
     * @return {Stream}
     */
    Stream.fromObservable = function (obs) {
        if (obs.endWhen)
            return obs;
        return new Stream(new FromObservable(obs));
    };
    /**
     * Creates a stream that periodically emits incremental numbers, every
     * `period` milliseconds.
     *
     * Marble diagram:
     *
     * ```text
     *     periodic(1000)
     * ---0---1---2---3---4---...
     * ```
     *
     * @factory true
     * @param {number} period The interval in milliseconds to use as a rate of
     * emission.
     * @return {Stream}
     */
    Stream.periodic = function (period) {
        return new Stream(new Periodic(period));
    };
    Stream.prototype._map = function (project) {
        return new (this.ctor())(new MapOp(project, this));
    };
    /**
     * Transforms each event from the input Stream through a `project` function,
     * to get a Stream that emits those transformed events.
     *
     * Marble diagram:
     *
     * ```text
     * --1---3--5-----7------
     *    map(i => i * 10)
     * --10--30-50----70-----
     * ```
     *
     * @param {Function} project A function of type `(t: T) => U` that takes event
     * `t` of type `T` from the input Stream and produces an event of type `U`, to
     * be emitted on the output Stream.
     * @return {Stream}
     */
    Stream.prototype.map = function (project) {
        return this._map(project);
    };
    /**
     * It's like `map`, but transforms each input event to always the same
     * constant value on the output Stream.
     *
     * Marble diagram:
     *
     * ```text
     * --1---3--5-----7-----
     *       mapTo(10)
     * --10--10-10----10----
     * ```
     *
     * @param projectedValue A value to emit on the output Stream whenever the
     * input Stream emits any value.
     * @return {Stream}
     */
    Stream.prototype.mapTo = function (projectedValue) {
        var s = this.map(function () { return projectedValue; });
        var op = s._prod;
        op.type = 'mapTo';
        return s;
    };
    /**
     * Only allows events that pass the test given by the `passes` argument.
     *
     * Each event from the input stream is given to the `passes` function. If the
     * function returns `true`, the event is forwarded to the output stream,
     * otherwise it is ignored and not forwarded.
     *
     * Marble diagram:
     *
     * ```text
     * --1---2--3-----4-----5---6--7-8--
     *     filter(i => i % 2 === 0)
     * ------2--------4---------6----8--
     * ```
     *
     * @param {Function} passes A function of type `(t: T) => boolean` that takes
     * an event from the input stream and checks if it passes, by returning a
     * boolean.
     * @return {Stream}
     */
    Stream.prototype.filter = function (passes) {
        var p = this._prod;
        if (p instanceof Filter)
            return new Stream(new Filter(and(p.f, passes), p.ins));
        return new Stream(new Filter(passes, this));
    };
    /**
     * Lets the first `amount` many events from the input stream pass to the
     * output stream, then makes the output stream complete.
     *
     * Marble diagram:
     *
     * ```text
     * --a---b--c----d---e--
     *    take(3)
     * --a---b--c|
     * ```
     *
     * @param {number} amount How many events to allow from the input stream
     * before completing the output stream.
     * @return {Stream}
     */
    Stream.prototype.take = function (amount) {
        return new (this.ctor())(new Take(amount, this));
    };
    /**
     * Ignores the first `amount` many events from the input stream, and then
     * after that starts forwarding events from the input stream to the output
     * stream.
     *
     * Marble diagram:
     *
     * ```text
     * --a---b--c----d---e--
     *       drop(3)
     * --------------d---e--
     * ```
     *
     * @param {number} amount How many events to ignore from the input stream
     * before forwarding all events from the input stream to the output stream.
     * @return {Stream}
     */
    Stream.prototype.drop = function (amount) {
        return new Stream(new Drop(amount, this));
    };
    /**
     * When the input stream completes, the output stream will emit the last event
     * emitted by the input stream, and then will also complete.
     *
     * Marble diagram:
     *
     * ```text
     * --a---b--c--d----|
     *       last()
     * -----------------d|
     * ```
     *
     * @return {Stream}
     */
    Stream.prototype.last = function () {
        return new Stream(new Last(this));
    };
    /**
     * Prepends the given `initial` value to the sequence of events emitted by the
     * input stream. The returned stream is a MemoryStream, which means it is
     * already `remember()`'d.
     *
     * Marble diagram:
     *
     * ```text
     * ---1---2-----3---
     *   startWith(0)
     * 0--1---2-----3---
     * ```
     *
     * @param initial The value or event to prepend.
     * @return {MemoryStream}
     */
    Stream.prototype.startWith = function (initial) {
        return new MemoryStream(new StartWith(this, initial));
    };
    /**
     * Uses another stream to determine when to complete the current stream.
     *
     * When the given `other` stream emits an event or completes, the output
     * stream will complete. Before that happens, the output stream will behaves
     * like the input stream.
     *
     * Marble diagram:
     *
     * ```text
     * ---1---2-----3--4----5----6---
     *   endWhen( --------a--b--| )
     * ---1---2-----3--4--|
     * ```
     *
     * @param other Some other stream that is used to know when should the output
     * stream of this operator complete.
     * @return {Stream}
     */
    Stream.prototype.endWhen = function (other) {
        return new (this.ctor())(new EndWhen(other, this));
    };
    /**
     * "Folds" the stream onto itself.
     *
     * Combines events from the past throughout
     * the entire execution of the input stream, allowing you to accumulate them
     * together. It's essentially like `Array.prototype.reduce`. The returned
     * stream is a MemoryStream, which means it is already `remember()`'d.
     *
     * The output stream starts by emitting the `seed` which you give as argument.
     * Then, when an event happens on the input stream, it is combined with that
     * seed value through the `accumulate` function, and the output value is
     * emitted on the output stream. `fold` remembers that output value as `acc`
     * ("accumulator"), and then when a new input event `t` happens, `acc` will be
     * combined with that to produce the new `acc` and so forth.
     *
     * Marble diagram:
     *
     * ```text
     * ------1-----1--2----1----1------
     *   fold((acc, x) => acc + x, 3)
     * 3-----4-----5--7----8----9------
     * ```
     *
     * @param {Function} accumulate A function of type `(acc: R, t: T) => R` that
     * takes the previous accumulated value `acc` and the incoming event from the
     * input stream and produces the new accumulated value.
     * @param seed The initial accumulated value, of type `R`.
     * @return {MemoryStream}
     */
    Stream.prototype.fold = function (accumulate, seed) {
        return new MemoryStream(new Fold(accumulate, seed, this));
    };
    /**
     * Replaces an error with another stream.
     *
     * When (and if) an error happens on the input stream, instead of forwarding
     * that error to the output stream, *replaceError* will call the `replace`
     * function which returns the stream that the output stream will replicate.
     * And, in case that new stream also emits an error, `replace` will be called
     * again to get another stream to start replicating.
     *
     * Marble diagram:
     *
     * ```text
     * --1---2-----3--4-----X
     *   replaceError( () => --10--| )
     * --1---2-----3--4--------10--|
     * ```
     *
     * @param {Function} replace A function of type `(err) => Stream` that takes
     * the error that occurred on the input stream or on the previous replacement
     * stream and returns a new stream. The output stream will behave like the
     * stream that this function returns.
     * @return {Stream}
     */
    Stream.prototype.replaceError = function (replace) {
        return new (this.ctor())(new ReplaceError(replace, this));
    };
    /**
     * Flattens a "stream of streams", handling only one nested stream at a time
     * (no concurrency).
     *
     * If the input stream is a stream that emits streams, then this operator will
     * return an output stream which is a flat stream: emits regular events. The
     * flattening happens without concurrency. It works like this: when the input
     * stream emits a nested stream, *flatten* will start imitating that nested
     * one. However, as soon as the next nested stream is emitted on the input
     * stream, *flatten* will forget the previous nested one it was imitating, and
     * will start imitating the new nested one.
     *
     * Marble diagram:
     *
     * ```text
     * --+--------+---------------
     *   \        \
     *    \       ----1----2---3--
     *    --a--b----c----d--------
     *           flatten
     * -----a--b------1----2---3--
     * ```
     *
     * @return {Stream}
     */
    Stream.prototype.flatten = function () {
        var p = this._prod;
        return new Stream(new Flatten(this));
    };
    /**
     * Passes the input stream to a custom operator, to produce an output stream.
     *
     * *compose* is a handy way of using an existing function in a chained style.
     * Instead of writing `outStream = f(inStream)` you can write
     * `outStream = inStream.compose(f)`.
     *
     * @param {function} operator A function that takes a stream as input and
     * returns a stream as well.
     * @return {Stream}
     */
    Stream.prototype.compose = function (operator) {
        return operator(this);
    };
    /**
     * Returns an output stream that behaves like the input stream, but also
     * remembers the most recent event that happens on the input stream, so that a
     * newly added listener will immediately receive that memorised event.
     *
     * @return {MemoryStream}
     */
    Stream.prototype.remember = function () {
        return new MemoryStream(new Remember(this));
    };
    /**
     * Returns an output stream that identically behaves like the input stream,
     * but also runs a `spy` function for each event, to help you debug your app.
     *
     * *debug* takes a `spy` function as argument, and runs that for each event
     * happening on the input stream. If you don't provide the `spy` argument,
     * then *debug* will just `console.log` each event. This helps you to
     * understand the flow of events through some operator chain.
     *
     * Please note that if the output stream has no listeners, then it will not
     * start, which means `spy` will never run because no actual event happens in
     * that case.
     *
     * Marble diagram:
     *
     * ```text
     * --1----2-----3-----4--
     *         debug
     * --1----2-----3-----4--
     * ```
     *
     * @param {function} labelOrSpy A string to use as the label when printing
     * debug information on the console, or a 'spy' function that takes an event
     * as argument, and does not need to return anything.
     * @return {Stream}
     */
    Stream.prototype.debug = function (labelOrSpy) {
        return new (this.ctor())(new Debug(this, labelOrSpy));
    };
    /**
     * *imitate* changes this current Stream to emit the same events that the
     * `other` given Stream does. This method returns nothing.
     *
     * This method exists to allow one thing: **circular dependency of streams**.
     * For instance, let's imagine that for some reason you need to create a
     * circular dependency where stream `first$` depends on stream `second$`
     * which in turn depends on `first$`:
     *
     * <!-- skip-example -->
     * ```js
     * import delay from 'xstream/extra/delay'
     *
     * var first$ = second$.map(x => x * 10).take(3);
     * var second$ = first$.map(x => x + 1).startWith(1).compose(delay(100));
     * ```
     *
     * However, that is invalid JavaScript, because `second$` is undefined
     * on the first line. This is how *imitate* can help solve it:
     *
     * ```js
     * import delay from 'xstream/extra/delay'
     *
     * var secondProxy$ = xs.create();
     * var first$ = secondProxy$.map(x => x * 10).take(3);
     * var second$ = first$.map(x => x + 1).startWith(1).compose(delay(100));
     * secondProxy$.imitate(second$);
     * ```
     *
     * We create `secondProxy$` before the others, so it can be used in the
     * declaration of `first$`. Then, after both `first$` and `second$` are
     * defined, we hook `secondProxy$` with `second$` with `imitate()` to tell
     * that they are "the same". `imitate` will not trigger the start of any
     * stream, it just binds `secondProxy$` and `second$` together.
     *
     * The following is an example where `imitate()` is important in Cycle.js
     * applications. A parent component contains some child components. A child
     * has an action stream which is given to the parent to define its state:
     *
     * <!-- skip-example -->
     * ```js
     * const childActionProxy$ = xs.create();
     * const parent = Parent({...sources, childAction$: childActionProxy$});
     * const childAction$ = parent.state$.map(s => s.child.action$).flatten();
     * childActionProxy$.imitate(childAction$);
     * ```
     *
     * Note, though, that **`imitate()` does not support MemoryStreams**. If we
     * would attempt to imitate a MemoryStream in a circular dependency, we would
     * either get a race condition (where the symptom would be "nothing happens")
     * or an infinite cyclic emission of values. It's useful to think about
     * MemoryStreams as cells in a spreadsheet. It doesn't make any sense to
     * define a spreadsheet cell `A1` with a formula that depends on `B1` and
     * cell `B1` defined with a formula that depends on `A1`.
     *
     * If you find yourself wanting to use `imitate()` with a
     * MemoryStream, you should rework your code around `imitate()` to use a
     * Stream instead. Look for the stream in the circular dependency that
     * represents an event stream, and that would be a candidate for creating a
     * proxy Stream which then imitates the target Stream.
     *
     * @param {Stream} target The other stream to imitate on the current one. Must
     * not be a MemoryStream.
     */
    Stream.prototype.imitate = function (target) {
        if (target instanceof MemoryStream)
            throw new Error('A MemoryStream was given to imitate(), but it only ' +
                'supports a Stream. Read more about this restriction here: ' +
                'https://github.com/staltz/xstream#faq');
        this._target = target;
        for (var ils = this._ils, N = ils.length, i = 0; i < N; i++)
            target._add(ils[i]);
        this._ils = [];
    };
    /**
     * Forces the Stream to emit the given value to its listeners.
     *
     * As the name indicates, if you use this, you are most likely doing something
     * The Wrong Way. Please try to understand the reactive way before using this
     * method. Use it only when you know what you are doing.
     *
     * @param value The "next" value you want to broadcast to all listeners of
     * this Stream.
     */
    Stream.prototype.shamefullySendNext = function (value) {
        this._n(value);
    };
    /**
     * Forces the Stream to emit the given error to its listeners.
     *
     * As the name indicates, if you use this, you are most likely doing something
     * The Wrong Way. Please try to understand the reactive way before using this
     * method. Use it only when you know what you are doing.
     *
     * @param {any} error The error you want to broadcast to all the listeners of
     * this Stream.
     */
    Stream.prototype.shamefullySendError = function (error) {
        this._e(error);
    };
    /**
     * Forces the Stream to emit the "completed" event to its listeners.
     *
     * As the name indicates, if you use this, you are most likely doing something
     * The Wrong Way. Please try to understand the reactive way before using this
     * method. Use it only when you know what you are doing.
     */
    Stream.prototype.shamefullySendComplete = function () {
        this._c();
    };
    /**
     * Adds a "debug" listener to the stream. There can only be one debug
     * listener, that's why this is 'setDebugListener'. To remove the debug
     * listener, just call setDebugListener(null).
     *
     * A debug listener is like any other listener. The only difference is that a
     * debug listener is "stealthy": its presence/absence does not trigger the
     * start/stop of the stream (or the producer inside the stream). This is
     * useful so you can inspect what is going on without changing the behavior
     * of the program. If you have an idle stream and you add a normal listener to
     * it, the stream will start executing. But if you set a debug listener on an
     * idle stream, it won't start executing (not until the first normal listener
     * is added).
     *
     * As the name indicates, we don't recommend using this method to build app
     * logic. In fact, in most cases the debug operator works just fine. Only use
     * this one if you know what you're doing.
     *
     * @param {Listener<T>} listener
     */
    Stream.prototype.setDebugListener = function (listener) {
        if (!listener) {
            this._d = false;
            this._dl = NO;
        }
        else {
            this._d = true;
            listener._n = listener.next || noop;
            listener._e = listener.error || noop;
            listener._c = listener.complete || noop;
            this._dl = listener;
        }
    };
    /**
     * Blends multiple streams together, emitting events from all of them
     * concurrently.
     *
     * *merge* takes multiple streams as arguments, and creates a stream that
     * behaves like each of the argument streams, in parallel.
     *
     * Marble diagram:
     *
     * ```text
     * --1----2-----3--------4---
     * ----a-----b----c---d------
     *            merge
     * --1-a--2--b--3-c---d--4---
     * ```
     *
     * @factory true
     * @param {Stream} stream1 A stream to merge together with other streams.
     * @param {Stream} stream2 A stream to merge together with other streams. Two
     * or more streams may be given as arguments.
     * @return {Stream}
     */
    Stream.merge = function merge() {
        var streams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            streams[_i] = arguments[_i];
        }
        return new Stream(new Merge(streams));
    };
    /**
     * Combines multiple input streams together to return a stream whose events
     * are arrays that collect the latest events from each input stream.
     *
     * *combine* internally remembers the most recent event from each of the input
     * streams. When any of the input streams emits an event, that event together
     * with all the other saved events are combined into an array. That array will
     * be emitted on the output stream. It's essentially a way of joining together
     * the events from multiple streams.
     *
     * Marble diagram:
     *
     * ```text
     * --1----2-----3--------4---
     * ----a-----b-----c--d------
     *          combine
     * ----1a-2a-2b-3b-3c-3d-4d--
     * ```
     *
     * @factory true
     * @param {Stream} stream1 A stream to combine together with other streams.
     * @param {Stream} stream2 A stream to combine together with other streams.
     * Multiple streams, not just two, may be given as arguments.
     * @return {Stream}
     */
    Stream.combine = function combine() {
        var streams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            streams[_i] = arguments[_i];
        }
        return new Stream(new Combine(streams));
    };
    return Stream;
}());
exports.Stream = Stream;
var MemoryStream = /** @class */ (function (_super) {
    __extends(MemoryStream, _super);
    function MemoryStream(producer) {
        var _this = _super.call(this, producer) || this;
        _this._has = false;
        return _this;
    }
    MemoryStream.prototype._n = function (x) {
        this._v = x;
        this._has = true;
        _super.prototype._n.call(this, x);
    };
    MemoryStream.prototype._add = function (il) {
        var ta = this._target;
        if (ta !== NO)
            return ta._add(il);
        var a = this._ils;
        a.push(il);
        if (a.length > 1) {
            if (this._has)
                il._n(this._v);
            return;
        }
        if (this._stopID !== NO) {
            if (this._has)
                il._n(this._v);
            clearTimeout(this._stopID);
            this._stopID = NO;
        }
        else if (this._has)
            il._n(this._v);
        else {
            var p = this._prod;
            if (p !== NO)
                p._start(this);
        }
    };
    MemoryStream.prototype._stopNow = function () {
        this._has = false;
        _super.prototype._stopNow.call(this);
    };
    MemoryStream.prototype._x = function () {
        this._has = false;
        _super.prototype._x.call(this);
    };
    MemoryStream.prototype.map = function (project) {
        return this._map(project);
    };
    MemoryStream.prototype.mapTo = function (projectedValue) {
        return _super.prototype.mapTo.call(this, projectedValue);
    };
    MemoryStream.prototype.take = function (amount) {
        return _super.prototype.take.call(this, amount);
    };
    MemoryStream.prototype.endWhen = function (other) {
        return _super.prototype.endWhen.call(this, other);
    };
    MemoryStream.prototype.replaceError = function (replace) {
        return _super.prototype.replaceError.call(this, replace);
    };
    MemoryStream.prototype.remember = function () {
        return this;
    };
    MemoryStream.prototype.debug = function (labelOrSpy) {
        return _super.prototype.debug.call(this, labelOrSpy);
    };
    return MemoryStream;
}(Stream));
exports.MemoryStream = MemoryStream;
exports.default = Stream;
//# sourceMappingURL=index.js.map
},{"symbol-observable":59}],53:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.fromEvent = fromEvent;
exports.preventDefaultConditional = preventDefaultConditional;

var _xstream = require("xstream");

function fromEvent(element, eventName, useCapture, preventDefault) {
  if (useCapture === void 0) {
    useCapture = false;
  }
  if (preventDefault === void 0) {
    preventDefault = false;
  }
  return _xstream.Stream.create({
    element: element,
    next: null,
    start: function start(listener) {
      if (preventDefault) {
        this.next = function next(event) {
          preventDefaultConditional(event, preventDefault);
          listener.next(event);
        };
      } else {
        this.next = function next(event) {
          listener.next(event);
        };
      }
      this.element.addEventListener(eventName, this.next, useCapture);
    },
    stop: function stop() {
      this.element.removeEventListener(eventName, this.next, useCapture);
    }
  });
}
function matchObject(matcher, obj) {
  var keys = Object.keys(matcher);
  var n = keys.length;
  for (var i = 0; i < n; i++) {
    var k = keys[i];
    if (_typeof(matcher[k]) === 'object' && _typeof(obj[k]) === 'object') {
      if (!matchObject(matcher[k], obj[k])) {
        return false;
      }
    } else if (matcher[k] !== obj[k]) {
      return false;
    }
  }
  return true;
}
function preventDefaultConditional(event, preventDefault) {
  if (preventDefault) {
    if (typeof preventDefault === 'boolean') {
      event.preventDefault();
    } else if (typeof preventDefault === 'function') {
      if (preventDefault(event)) {
        event.preventDefault();
      }
    } else if ((typeof preventDefault === "undefined" ? "undefined" : _typeof(preventDefault)) === 'object') {
      if (matchObject(preventDefault, event)) {
        event.preventDefault();
      }
    } else {
      throw new Error('preventDefault has to be either a boolean, predicate function or object');
    }
  }
}
//# sourceMappingURL=fromEvent.js.map
},{"xstream":16}],50:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentDOMSource = undefined;

var _xstream = require("xstream");

var _xstream2 = _interopRequireDefault(_xstream);

var _adapt = require("@cycle/run/lib/adapt");

var _fromEvent = require("./fromEvent");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DocumentDOMSource = /** @class */function () {
  function DocumentDOMSource(_name) {
    this._name = _name;
  }
  DocumentDOMSource.prototype.select = function (selector) {
    // This functionality is still undefined/undecided.
    return this;
  };
  DocumentDOMSource.prototype.elements = function () {
    var out = (0, _adapt.adapt)(_xstream2.default.of([document]));
    out._isCycleSource = this._name;
    return out;
  };
  DocumentDOMSource.prototype.element = function () {
    var out = (0, _adapt.adapt)(_xstream2.default.of(document));
    out._isCycleSource = this._name;
    return out;
  };
  DocumentDOMSource.prototype.events = function (eventType, options) {
    if (options === void 0) {
      options = {};
    }
    var stream;
    stream = (0, _fromEvent.fromEvent)(document, eventType, options.useCapture, options.preventDefault);
    var out = (0, _adapt.adapt)(stream);
    out._isCycleSource = this._name;
    return out;
  };
  return DocumentDOMSource;
}();
exports.DocumentDOMSource = DocumentDOMSource;
//# sourceMappingURL=DocumentDOMSource.js.map
},{"xstream":16,"@cycle/run/lib/adapt":95,"./fromEvent":53}],52:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BodyDOMSource = undefined;

var _xstream = require("xstream");

var _xstream2 = _interopRequireDefault(_xstream);

var _adapt = require("@cycle/run/lib/adapt");

var _fromEvent = require("./fromEvent");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BodyDOMSource = /** @class */function () {
  function BodyDOMSource(_name) {
    this._name = _name;
  }
  BodyDOMSource.prototype.select = function (selector) {
    // This functionality is still undefined/undecided.
    return this;
  };
  BodyDOMSource.prototype.elements = function () {
    var out = (0, _adapt.adapt)(_xstream2.default.of([document.body]));
    out._isCycleSource = this._name;
    return out;
  };
  BodyDOMSource.prototype.element = function () {
    var out = (0, _adapt.adapt)(_xstream2.default.of(document.body));
    out._isCycleSource = this._name;
    return out;
  };
  BodyDOMSource.prototype.events = function (eventType, options) {
    if (options === void 0) {
      options = {};
    }
    var stream;
    stream = (0, _fromEvent.fromEvent)(document.body, eventType, options.useCapture, options.preventDefault);
    var out = (0, _adapt.adapt)(stream);
    out._isCycleSource = this._name;
    return out;
  };
  return BodyDOMSource;
}();
exports.BodyDOMSource = BodyDOMSource;
//# sourceMappingURL=BodyDOMSource.js.map
},{"xstream":16,"@cycle/run/lib/adapt":95,"./fromEvent":53}],56:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ScopeChecker = /** @class */function () {
  function ScopeChecker(fullScope, isolateModule) {
    this.fullScope = fullScope;
    this.isolateModule = isolateModule;
  }
  /**
   * Checks whether the given element is *directly* in the scope of this
   * scope checker. Being contained *indirectly* through other scopes
   * is not valid. This is crucial for implementing parent-child isolation,
   * so that the parent selectors don't search inside a child scope.
   */
  ScopeChecker.prototype.isDirectlyInScope = function (leaf) {
    for (var el = leaf; el; el = el.parentElement) {
      var fullScope = this.isolateModule.getFullScope(el);
      if (fullScope && fullScope !== this.fullScope) {
        return false;
      }
      if (fullScope) {
        return true;
      }
    }
    return true;
  };
  return ScopeChecker;
}();
exports.ScopeChecker = ScopeChecker;
//# sourceMappingURL=ScopeChecker.js.map
},{}],44:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isClassOrId = isClassOrId;
exports.isDocFrag = isDocFrag;
exports.checkValidContainer = checkValidContainer;
exports.getValidNode = getValidNode;
exports.getFullScope = getFullScope;
exports.getSelectors = getSelectors;
function isValidNode(obj) {
  var ELEM_TYPE = 1;
  var FRAG_TYPE = 11;
  return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === 'object' ? obj instanceof HTMLElement || obj instanceof DocumentFragment : obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === 'object' && obj !== null && (obj.nodeType === ELEM_TYPE || obj.nodeType === FRAG_TYPE) && typeof obj.nodeName === 'string';
}
function isClassOrId(str) {
  return str.length > 1 && (str[0] === '.' || str[0] === '#');
}
function isDocFrag(el) {
  return el.nodeType === 11;
}
var SCOPE_PREFIX = exports.SCOPE_PREFIX = '$$CYCLEDOM$$-';
function checkValidContainer(container) {
  if (typeof container !== 'string' && !isValidNode(container)) {
    throw new Error('Given container is not a DOM element neither a selector string.');
  }
}
function getValidNode(selectors) {
  var domElement = typeof selectors === 'string' ? document.querySelector(selectors) : selectors;
  if (typeof selectors === 'string' && domElement === null) {
    throw new Error("Cannot render into unknown element `" + selectors + "`");
  }
  return domElement;
}
/**
 * The full scope of a namespace is the "absolute path" of scopes from
 * parent to child. This is extracted from the namespace, filter only for
 * scopes in the namespace.
 */
function getFullScope(namespace) {
  return namespace.filter(function (c) {
    return c.indexOf(SCOPE_PREFIX) > -1;
  }).map(function (c) {
    return c.replace(SCOPE_PREFIX, '');
  }).join('-');
}
function getSelectors(namespace) {
  return namespace.filter(function (c) {
    return c.indexOf(SCOPE_PREFIX) === -1;
  }).join(' ');
}
//# sourceMappingURL=utils.js.map
},{}],57:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function createMatchesSelector() {
  var vendor;
  try {
    var proto = Element.prototype;
    vendor = proto.matches || proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;
  } catch (err) {
    vendor = null;
  }
  return function match(elem, selector) {
    if (selector.length === 0) {
      return true;
    }
    if (vendor) {
      return vendor.call(elem, selector);
    }
    var nodes = elem.parentNode.querySelectorAll(selector);
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i] === elem) {
        return true;
      }
    }
    return false;
  };
}
var matchesSelector = exports.matchesSelector = createMatchesSelector();
//# sourceMappingURL=matchesSelector.js.map
},{}],51:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElementFinder = undefined;

var _ScopeChecker = require("./ScopeChecker");

var _utils = require("./utils");

var _matchesSelector = require("./matchesSelector");

function toElArray(input) {
  return Array.prototype.slice.call(input);
}
var ElementFinder = /** @class */function () {
  function ElementFinder(namespace, isolateModule) {
    this.namespace = namespace;
    this.isolateModule = isolateModule;
  }
  ElementFinder.prototype.call = function (rootElement) {
    var namespace = this.namespace;
    var selector = (0, _utils.getSelectors)(namespace);
    if (!selector) {
      return [rootElement];
    }
    var fullScope = (0, _utils.getFullScope)(namespace);
    var scopeChecker = new _ScopeChecker.ScopeChecker(fullScope, this.isolateModule);
    var topNode = fullScope ? this.isolateModule.getElement(fullScope) || rootElement : rootElement;
    var topNodeMatchesSelector = !!fullScope && !!selector && (0, _matchesSelector.matchesSelector)(topNode, selector);
    return toElArray(topNode.querySelectorAll(selector)).filter(scopeChecker.isDirectlyInScope, scopeChecker).concat(topNodeMatchesSelector ? [topNode] : []);
  };
  return ElementFinder;
}();
exports.ElementFinder = ElementFinder;
//# sourceMappingURL=ElementFinder.js.map
},{"./ScopeChecker":56,"./utils":44,"./matchesSelector":57}],54:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isolateSource = isolateSource;
exports.siblingIsolateSink = siblingIsolateSink;
exports.totalIsolateSink = totalIsolateSink;

var _vnode = require("snabbdom/vnode");

var _utils = require("./utils");

function totalIsolateSource(source, scope) {
  return source.select(_utils.SCOPE_PREFIX + scope);
}
function siblingIsolateSource(source, scope) {
  return source.select(scope);
}
function isolateSource(source, scope) {
  if (scope === ':root') {
    return source;
  } else if ((0, _utils.isClassOrId)(scope)) {
    return siblingIsolateSource(source, scope);
  } else {
    return totalIsolateSource(source, scope);
  }
}
function siblingIsolateSink(sink, scope) {
  return sink.map(function (node) {
    return node ? (0, _vnode.vnode)(node.sel + scope, node.data, node.children, node.text, node.elm) : node;
  });
}
function totalIsolateSink(sink, fullScope) {
  return sink.map(function (node) {
    if (!node) {
      return node;
    }
    // Ignore if already had up-to-date full scope in vnode.data.isolate
    if (node.data && node.data.isolate) {
      var isolateData = node.data.isolate;
      var prevFullScopeNum = isolateData.replace(/(cycle|\-)/g, '');
      var fullScopeNum = fullScope.replace(/(cycle|\-)/g, '');
      if (isNaN(parseInt(prevFullScopeNum)) || isNaN(parseInt(fullScopeNum)) || prevFullScopeNum > fullScopeNum) {
        // > is lexicographic string comparison
        return node;
      }
    }
    // Insert up-to-date full scope in vnode.data.isolate, and also a key if needed
    node.data = node.data || {};
    node.data.isolate = fullScope;
    if (typeof node.key === 'undefined') {
      node.key = _utils.SCOPE_PREFIX + fullScope;
    }
    return node;
  });
}
//# sourceMappingURL=isolate.js.map
},{"snabbdom/vnode":73,"./utils":44}],55:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventDelegator = undefined;

var _xstream = require("xstream");

var _xstream2 = _interopRequireDefault(_xstream);

var _ScopeChecker = require("./ScopeChecker");

var _utils = require("./utils");

var _matchesSelector = require("./matchesSelector");

var _fromEvent = require("./fromEvent");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Finds (with binary search) index of the destination that id equal to searchId
 * among the destinations in the given array.
 */
function indexOf(arr, searchId) {
  var minIndex = 0;
  var maxIndex = arr.length - 1;
  var currentIndex;
  var current;
  while (minIndex <= maxIndex) {
    currentIndex = (minIndex + maxIndex) / 2 | 0; // tslint:disable-line:no-bitwise
    current = arr[currentIndex];
    var currentId = current.id;
    if (currentId < searchId) {
      minIndex = currentIndex + 1;
    } else if (currentId > searchId) {
      maxIndex = currentIndex - 1;
    } else {
      return currentIndex;
    }
  }
  return -1;
}
/**
 * Manages "Event delegation", by connecting an origin with multiple
 * destinations.
 *
 * Attaches a DOM event listener to the DOM element called the "origin",
 * and delegates events to "destinations", which are subjects as outputs
 * for the DOMSource. Simulates bubbling or capturing, with regards to
 * isolation boundaries too.
 */
var EventDelegator = /** @class */function () {
  function EventDelegator(origin, eventType, useCapture, isolateModule, preventDefault) {
    if (preventDefault === void 0) {
      preventDefault = false;
    }
    var _this = this;
    this.origin = origin;
    this.eventType = eventType;
    this.useCapture = useCapture;
    this.isolateModule = isolateModule;
    this.preventDefault = preventDefault;
    this.destinations = [];
    this._lastId = 0;
    if (preventDefault) {
      if (useCapture) {
        this.listener = function (ev) {
          (0, _fromEvent.preventDefaultConditional)(ev, preventDefault);
          _this.capture(ev);
        };
      } else {
        this.listener = function (ev) {
          (0, _fromEvent.preventDefaultConditional)(ev, preventDefault);
          _this.bubble(ev);
        };
      }
    } else {
      if (useCapture) {
        this.listener = function (ev) {
          return _this.capture(ev);
        };
      } else {
        this.listener = function (ev) {
          return _this.bubble(ev);
        };
      }
    }
    origin.addEventListener(eventType, this.listener, useCapture);
  }
  EventDelegator.prototype.updateOrigin = function (newOrigin) {
    this.origin.removeEventListener(this.eventType, this.listener, this.useCapture);
    newOrigin.addEventListener(this.eventType, this.listener, this.useCapture);
    this.origin = newOrigin;
  };
  /**
   * Creates a *new* destination given the namespace and returns the subject
   * representing the destination of events. Is not referentially transparent,
   * will always return a different output for the same input.
   */
  EventDelegator.prototype.createDestination = function (namespace) {
    var _this = this;
    var id = this._lastId++;
    var selector = (0, _utils.getSelectors)(namespace);
    var scopeChecker = new _ScopeChecker.ScopeChecker((0, _utils.getFullScope)(namespace), this.isolateModule);
    var subject = _xstream2.default.create({
      start: function start() {},
      stop: function stop() {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(function () {
            _this.removeDestination(id);
          });
        } else {
          _this.removeDestination(id);
        }
      }
    });
    var destination = { id: id, selector: selector, scopeChecker: scopeChecker, subject: subject };
    this.destinations.push(destination);
    return subject;
  };
  /**
   * Removes the destination that has the given id.
   */
  EventDelegator.prototype.removeDestination = function (id) {
    var i = indexOf(this.destinations, id);
    i >= 0 && this.destinations.splice(i, 1); // tslint:disable-line:no-unused-expression
  };
  EventDelegator.prototype.capture = function (ev) {
    var n = this.destinations.length;
    for (var i = 0; i < n; i++) {
      var dest = this.destinations[i];
      if ((0, _matchesSelector.matchesSelector)(ev.target, dest.selector)) {
        dest.subject._n(ev);
      }
    }
  };
  EventDelegator.prototype.bubble = function (rawEvent) {
    var origin = this.origin;
    if (!origin.contains(rawEvent.currentTarget)) {
      return;
    }
    var roof = origin.parentElement;
    var ev = this.patchEvent(rawEvent);
    for (var el = ev.target; el && el !== roof; el = el.parentElement) {
      if (!origin.contains(el)) {
        ev.stopPropagation();
      }
      if (ev.propagationHasBeenStopped) {
        return;
      }
      this.matchEventAgainstDestinations(el, ev);
    }
  };
  EventDelegator.prototype.patchEvent = function (event) {
    var pEvent = event;
    pEvent.propagationHasBeenStopped = false;
    var oldStopPropagation = pEvent.stopPropagation;
    pEvent.stopPropagation = function stopPropagation() {
      oldStopPropagation.call(this);
      this.propagationHasBeenStopped = true;
    };
    return pEvent;
  };
  EventDelegator.prototype.matchEventAgainstDestinations = function (el, ev) {
    var n = this.destinations.length;
    for (var i = 0; i < n; i++) {
      var dest = this.destinations[i];
      if (!dest.scopeChecker.isDirectlyInScope(el)) {
        continue;
      }
      if ((0, _matchesSelector.matchesSelector)(el, dest.selector)) {
        this.mutateEventCurrentTarget(ev, el);
        dest.subject._n(ev);
      }
    }
  };
  EventDelegator.prototype.mutateEventCurrentTarget = function (event, currentTargetElement) {
    try {
      Object.defineProperty(event, "currentTarget", {
        value: currentTargetElement,
        configurable: true
      });
    } catch (err) {
      console.log("please use event.ownerTarget");
    }
    event.ownerTarget = currentTargetElement;
  };
  return EventDelegator;
}();
exports.EventDelegator = EventDelegator;
//# sourceMappingURL=EventDelegator.js.map
},{"xstream":16,"./ScopeChecker":56,"./utils":44,"./matchesSelector":57,"./fromEvent":53}],32:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainDOMSource = undefined;

var _adapt = require("@cycle/run/lib/adapt");

var _DocumentDOMSource = require("./DocumentDOMSource");

var _BodyDOMSource = require("./BodyDOMSource");

var _ElementFinder = require("./ElementFinder");

var _fromEvent = require("./fromEvent");

var _isolate = require("./isolate");

var _EventDelegator = require("./EventDelegator");

var _utils = require("./utils");

var eventTypesThatDontBubble = ["blur", "canplay", "canplaythrough", "durationchange", "emptied", "ended", "focus", "load", "loadeddata", "loadedmetadata", "mouseenter", "mouseleave", "pause", "play", "playing", "ratechange", "reset", "scroll", "seeked", "seeking", "stalled", "submit", "suspend", "timeupdate", "unload", "volumechange", "waiting"];
function determineUseCapture(eventType, options) {
  var result = false;
  if (typeof options.useCapture === 'boolean') {
    result = options.useCapture;
  }
  if (eventTypesThatDontBubble.indexOf(eventType) !== -1) {
    result = true;
  }
  return result;
}
function filterBasedOnIsolation(domSource, fullScope) {
  return function filterBasedOnIsolationOperator(rootElement$) {
    var initialState = {
      wasIsolated: false,
      shouldPass: false,
      element: null
    };
    return rootElement$.fold(function checkIfShouldPass(state, element) {
      var isIsolated = !!domSource._isolateModule.getElement(fullScope);
      state.shouldPass = isIsolated && !state.wasIsolated;
      state.wasIsolated = isIsolated;
      state.element = element;
      return state;
    }, initialState).drop(1).filter(function (s) {
      return s.shouldPass;
    }).map(function (s) {
      return s.element;
    });
  };
}
var MainDOMSource = /** @class */function () {
  function MainDOMSource(_rootElement$, _sanitation$, _namespace, _isolateModule, _delegators, _name) {
    if (_namespace === void 0) {
      _namespace = [];
    }
    var _this = this;
    this._rootElement$ = _rootElement$;
    this._sanitation$ = _sanitation$;
    this._namespace = _namespace;
    this._isolateModule = _isolateModule;
    this._delegators = _delegators;
    this._name = _name;
    this.isolateSource = _isolate.isolateSource;
    this.isolateSink = function (sink, scope) {
      if (scope === ':root') {
        return sink;
      } else if ((0, _utils.isClassOrId)(scope)) {
        return (0, _isolate.siblingIsolateSink)(sink, scope);
      } else {
        var prevFullScope = (0, _utils.getFullScope)(_this._namespace);
        var nextFullScope = [prevFullScope, scope].filter(function (x) {
          return !!x;
        }).join('-');
        return (0, _isolate.totalIsolateSink)(sink, nextFullScope);
      }
    };
  }
  MainDOMSource.prototype.elements = function () {
    var output$;
    if (this._namespace.length === 0) {
      output$ = this._rootElement$.map(function (x) {
        return [x];
      });
    } else {
      var elementFinder_1 = new _ElementFinder.ElementFinder(this._namespace, this._isolateModule);
      output$ = this._rootElement$.map(function (el) {
        return elementFinder_1.call(el);
      });
    }
    var out = (0, _adapt.adapt)(output$.remember());
    out._isCycleSource = this._name;
    return out;
  };
  MainDOMSource.prototype.element = function () {
    var output$ = this.elements().filter(function (arr) {
      return arr.length > 0;
    }).map(function (arr) {
      return arr[0];
    }).remember();
    var out = (0, _adapt.adapt)(output$);
    out._isCycleSource = this._name;
    return out;
  };
  Object.defineProperty(MainDOMSource.prototype, "namespace", {
    get: function get() {
      return this._namespace;
    },
    enumerable: true,
    configurable: true
  });
  MainDOMSource.prototype.select = function (selector) {
    if (typeof selector !== 'string') {
      throw new Error("DOM driver's select() expects the argument to be a " + "string as a CSS selector");
    }
    if (selector === 'document') {
      return new _DocumentDOMSource.DocumentDOMSource(this._name);
    }
    if (selector === 'body') {
      return new _BodyDOMSource.BodyDOMSource(this._name);
    }
    var trimmedSelector = selector.trim();
    var childNamespace = trimmedSelector === ":root" ? this._namespace : this._namespace.concat(trimmedSelector);
    return new MainDOMSource(this._rootElement$, this._sanitation$, childNamespace, this._isolateModule, this._delegators, this._name);
  };
  MainDOMSource.prototype.events = function (eventType, options) {
    if (options === void 0) {
      options = {};
    }
    if (typeof eventType !== "string") {
      throw new Error("DOM driver's events() expects argument to be a " + "string representing the event type to listen for.");
    }
    var useCapture = determineUseCapture(eventType, options);
    var namespace = this._namespace;
    var fullScope = (0, _utils.getFullScope)(namespace);
    var keyParts = [eventType, useCapture];
    if (fullScope) {
      keyParts.push(fullScope);
    }
    var key = keyParts.join('~');
    var domSource = this;
    var rootElement$;
    if (fullScope) {
      rootElement$ = this._rootElement$.compose(filterBasedOnIsolation(domSource, fullScope));
    } else {
      rootElement$ = this._rootElement$.take(2);
    }
    var event$ = rootElement$.map(function setupEventDelegatorOnTopElement(rootElement) {
      // Event listener just for the root element
      if (!namespace || namespace.length === 0) {
        return (0, _fromEvent.fromEvent)(rootElement, eventType, useCapture, options.preventDefault);
      }
      // Event listener on the origin element as an EventDelegator
      var delegators = domSource._delegators;
      var origin = domSource._isolateModule.getElement(fullScope) || rootElement;
      var delegator;
      if (delegators.has(key)) {
        delegator = delegators.get(key);
        delegator.updateOrigin(origin);
      } else {
        delegator = new _EventDelegator.EventDelegator(origin, eventType, useCapture, domSource._isolateModule, options.preventDefault);
        delegators.set(key, delegator);
      }
      if (fullScope) {
        domSource._isolateModule.addEventDelegator(fullScope, delegator);
      }
      var subject = delegator.createDestination(namespace);
      return subject;
    }).flatten();
    var out = (0, _adapt.adapt)(event$);
    out._isCycleSource = domSource._name;
    return out;
  };
  MainDOMSource.prototype.dispose = function () {
    this._sanitation$.shamefullySendNext(null);
    this._isolateModule.reset();
  };
  return MainDOMSource;
}();
exports.MainDOMSource = MainDOMSource;
//# sourceMappingURL=MainDOMSource.js.map
},{"@cycle/run/lib/adapt":95,"./DocumentDOMSource":50,"./BodyDOMSource":52,"./ElementFinder":51,"./fromEvent":53,"./isolate":54,"./EventDelegator":55,"./utils":44}],75:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createElement(tagName) {
    return document.createElement(tagName);
}
function createElementNS(namespaceURI, qualifiedName) {
    return document.createElementNS(namespaceURI, qualifiedName);
}
function createTextNode(text) {
    return document.createTextNode(text);
}
function createComment(text) {
    return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    node.removeChild(child);
}
function appendChild(node, child) {
    node.appendChild(child);
}
function parentNode(node) {
    return node.parentNode;
}
function nextSibling(node) {
    return node.nextSibling;
}
function tagName(elm) {
    return elm.tagName;
}
function setTextContent(node, text) {
    node.textContent = text;
}
function getTextContent(node) {
    return node.textContent;
}
function isElement(node) {
    return node.nodeType === 1;
}
function isText(node) {
    return node.nodeType === 3;
}
function isComment(node) {
    return node.nodeType === 8;
}
exports.htmlDomApi = {
    createElement: createElement,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    getTextContent: getTextContent,
    isElement: isElement,
    isText: isText,
    isComment: isComment,
};
exports.default = exports.htmlDomApi;
//# sourceMappingURL=htmldomapi.js.map
},{}],76:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var h_1 = require("./h");
function copyToThunk(vnode, thunk) {
    thunk.elm = vnode.elm;
    vnode.data.fn = thunk.data.fn;
    vnode.data.args = thunk.data.args;
    thunk.data = vnode.data;
    thunk.children = vnode.children;
    thunk.text = vnode.text;
    thunk.elm = vnode.elm;
}
function init(thunk) {
    var cur = thunk.data;
    var vnode = cur.fn.apply(undefined, cur.args);
    copyToThunk(vnode, thunk);
}
function prepatch(oldVnode, thunk) {
    var i, old = oldVnode.data, cur = thunk.data;
    var oldArgs = old.args, args = cur.args;
    if (old.fn !== cur.fn || oldArgs.length !== args.length) {
        copyToThunk(cur.fn.apply(undefined, args), thunk);
        return;
    }
    for (i = 0; i < args.length; ++i) {
        if (oldArgs[i] !== args[i]) {
            copyToThunk(cur.fn.apply(undefined, args), thunk);
            return;
        }
    }
    copyToThunk(oldVnode, thunk);
}
exports.thunk = function thunk(sel, key, fn, args) {
    if (args === undefined) {
        args = fn;
        fn = key;
        key = undefined;
    }
    return h_1.h(sel, {
        key: key,
        hook: { init: init, prepatch: prepatch },
        fn: fn,
        args: args
    });
};
exports.default = exports.thunk;
//# sourceMappingURL=thunk.js.map
},{"./h":77}],70:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vnode_1 = require("./vnode");
var is = require("./is");
var htmldomapi_1 = require("./htmldomapi");
function isUndef(s) { return s === undefined; }
function isDef(s) { return s !== undefined; }
var emptyNode = vnode_1.default('', {}, [], undefined, undefined);
function sameVnode(vnode1, vnode2) {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}
function isVnode(vnode) {
    return vnode.sel !== undefined;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i, map = {}, key, ch;
    for (i = beginIdx; i <= endIdx; ++i) {
        ch = children[i];
        if (ch != null) {
            key = ch.key;
            if (key !== undefined)
                map[key] = i;
        }
    }
    return map;
}
var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
var h_1 = require("./h");
exports.h = h_1.h;
var thunk_1 = require("./thunk");
exports.thunk = thunk_1.thunk;
function init(modules, domApi) {
    var i, j, cbs = {};
    var api = domApi !== undefined ? domApi : htmldomapi_1.default;
    for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];
        for (j = 0; j < modules.length; ++j) {
            var hook = modules[j][hooks[i]];
            if (hook !== undefined) {
                cbs[hooks[i]].push(hook);
            }
        }
    }
    function emptyNodeAt(elm) {
        var id = elm.id ? '#' + elm.id : '';
        var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
        return vnode_1.default(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
    }
    function createRmCb(childElm, listeners) {
        return function rmCb() {
            if (--listeners === 0) {
                var parent_1 = api.parentNode(childElm);
                api.removeChild(parent_1, childElm);
            }
        };
    }
    function createElm(vnode, insertedVnodeQueue) {
        var i, data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.init)) {
                i(vnode);
                data = vnode.data;
            }
        }
        var children = vnode.children, sel = vnode.sel;
        if (sel === '!') {
            if (isUndef(vnode.text)) {
                vnode.text = '';
            }
            vnode.elm = api.createComment(vnode.text);
        }
        else if (sel !== undefined) {
            // Parse selector
            var hashIdx = sel.indexOf('#');
            var dotIdx = sel.indexOf('.', hashIdx);
            var hash = hashIdx > 0 ? hashIdx : sel.length;
            var dot = dotIdx > 0 ? dotIdx : sel.length;
            var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
            var elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
                : api.createElement(tag);
            if (hash < dot)
                elm.setAttribute('id', sel.slice(hash + 1, dot));
            if (dotIdx > 0)
                elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '));
            for (i = 0; i < cbs.create.length; ++i)
                cbs.create[i](emptyNode, vnode);
            if (is.array(children)) {
                for (i = 0; i < children.length; ++i) {
                    var ch = children[i];
                    if (ch != null) {
                        api.appendChild(elm, createElm(ch, insertedVnodeQueue));
                    }
                }
            }
            else if (is.primitive(vnode.text)) {
                api.appendChild(elm, api.createTextNode(vnode.text));
            }
            i = vnode.data.hook; // Reuse variable
            if (isDef(i)) {
                if (i.create)
                    i.create(emptyNode, vnode);
                if (i.insert)
                    insertedVnodeQueue.push(vnode);
            }
        }
        else {
            vnode.elm = api.createTextNode(vnode.text);
        }
        return vnode.elm;
    }
    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
            var ch = vnodes[startIdx];
            if (ch != null) {
                api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
            }
        }
    }
    function invokeDestroyHook(vnode) {
        var i, j, data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.destroy))
                i(vnode);
            for (i = 0; i < cbs.destroy.length; ++i)
                cbs.destroy[i](vnode);
            if (vnode.children !== undefined) {
                for (j = 0; j < vnode.children.length; ++j) {
                    i = vnode.children[j];
                    if (i != null && typeof i !== "string") {
                        invokeDestroyHook(i);
                    }
                }
            }
        }
    }
    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            var i_1 = void 0, listeners = void 0, rm = void 0, ch = vnodes[startIdx];
            if (ch != null) {
                if (isDef(ch.sel)) {
                    invokeDestroyHook(ch);
                    listeners = cbs.remove.length + 1;
                    rm = createRmCb(ch.elm, listeners);
                    for (i_1 = 0; i_1 < cbs.remove.length; ++i_1)
                        cbs.remove[i_1](ch, rm);
                    if (isDef(i_1 = ch.data) && isDef(i_1 = i_1.hook) && isDef(i_1 = i_1.remove)) {
                        i_1(ch, rm);
                    }
                    else {
                        rm();
                    }
                }
                else {
                    api.removeChild(parentElm, ch.elm);
                }
            }
        }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
        var oldStartIdx = 0, newStartIdx = 0;
        var oldEndIdx = oldCh.length - 1;
        var oldStartVnode = oldCh[0];
        var oldEndVnode = oldCh[oldEndIdx];
        var newEndIdx = newCh.length - 1;
        var newStartVnode = newCh[0];
        var newEndVnode = newCh[newEndIdx];
        var oldKeyToIdx;
        var idxInOld;
        var elmToMove;
        var before;
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
            }
            else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx];
            }
            else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx];
            }
            else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newEndVnode)) {
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldEndVnode, newStartVnode)) {
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                if (oldKeyToIdx === undefined) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                }
                idxInOld = oldKeyToIdx[newStartVnode.key];
                if (isUndef(idxInOld)) {
                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    newStartVnode = newCh[++newStartIdx];
                }
                else {
                    elmToMove = oldCh[idxInOld];
                    if (elmToMove.sel !== newStartVnode.sel) {
                        api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    }
                    else {
                        patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                        oldCh[idxInOld] = undefined;
                        api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                    }
                    newStartVnode = newCh[++newStartIdx];
                }
            }
        }
        if (oldStartIdx > oldEndIdx) {
            before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
        }
        else if (newStartIdx > newEndIdx) {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
        }
    }
    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
        var i, hook;
        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
            i(oldVnode, vnode);
        }
        var elm = vnode.elm = oldVnode.elm;
        var oldCh = oldVnode.children;
        var ch = vnode.children;
        if (oldVnode === vnode)
            return;
        if (vnode.data !== undefined) {
            for (i = 0; i < cbs.update.length; ++i)
                cbs.update[i](oldVnode, vnode);
            i = vnode.data.hook;
            if (isDef(i) && isDef(i = i.update))
                i(oldVnode, vnode);
        }
        if (isUndef(vnode.text)) {
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch)
                    updateChildren(elm, oldCh, ch, insertedVnodeQueue);
            }
            else if (isDef(ch)) {
                if (isDef(oldVnode.text))
                    api.setTextContent(elm, '');
                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            }
            else if (isDef(oldCh)) {
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            }
            else if (isDef(oldVnode.text)) {
                api.setTextContent(elm, '');
            }
        }
        else if (oldVnode.text !== vnode.text) {
            api.setTextContent(elm, vnode.text);
        }
        if (isDef(hook) && isDef(i = hook.postpatch)) {
            i(oldVnode, vnode);
        }
    }
    return function patch(oldVnode, vnode) {
        var i, elm, parent;
        var insertedVnodeQueue = [];
        for (i = 0; i < cbs.pre.length; ++i)
            cbs.pre[i]();
        if (!isVnode(oldVnode)) {
            oldVnode = emptyNodeAt(oldVnode);
        }
        if (sameVnode(oldVnode, vnode)) {
            patchVnode(oldVnode, vnode, insertedVnodeQueue);
        }
        else {
            elm = oldVnode.elm;
            parent = api.parentNode(elm);
            createElm(vnode, insertedVnodeQueue);
            if (parent !== null) {
                api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
                removeVnodes(parent, [oldVnode], 0, 0);
            }
        }
        for (i = 0; i < insertedVnodeQueue.length; ++i) {
            insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
        }
        for (i = 0; i < cbs.post.length; ++i)
            cbs.post[i]();
        return vnode;
    };
}
exports.init = init;
//# sourceMappingURL=snabbdom.js.map
},{"./vnode":73,"./is":74,"./htmldomapi":75,"./h":77,"./thunk":76}],94:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var NO = {};
var SampleCombineListener = /** @class */ (function () {
    function SampleCombineListener(i, p) {
        this.i = i;
        this.p = p;
        p.ils[i] = this;
    }
    SampleCombineListener.prototype._n = function (t) {
        var p = this.p;
        if (p.out === NO)
            return;
        p.up(t, this.i);
    };
    SampleCombineListener.prototype._e = function (err) {
        this.p._e(err);
    };
    SampleCombineListener.prototype._c = function () {
        this.p.down(this.i, this);
    };
    return SampleCombineListener;
}());
exports.SampleCombineListener = SampleCombineListener;
var SampleCombineOperator = /** @class */ (function () {
    function SampleCombineOperator(ins, streams) {
        this.type = 'sampleCombine';
        this.ins = ins;
        this.others = streams;
        this.out = NO;
        this.ils = [];
        this.Nn = 0;
        this.vals = [];
    }
    SampleCombineOperator.prototype._start = function (out) {
        this.out = out;
        var s = this.others;
        var n = this.Nn = s.length;
        var vals = this.vals = new Array(n);
        for (var i = 0; i < n; i++) {
            vals[i] = NO;
            s[i]._add(new SampleCombineListener(i, this));
        }
        this.ins._add(this);
    };
    SampleCombineOperator.prototype._stop = function () {
        var s = this.others;
        var n = s.length;
        var ils = this.ils;
        this.ins._remove(this);
        for (var i = 0; i < n; i++) {
            s[i]._remove(ils[i]);
        }
        this.out = NO;
        this.vals = [];
        this.ils = [];
    };
    SampleCombineOperator.prototype._n = function (t) {
        var out = this.out;
        if (out === NO)
            return;
        if (this.Nn > 0)
            return;
        out._n([t].concat(this.vals));
    };
    SampleCombineOperator.prototype._e = function (err) {
        var out = this.out;
        if (out === NO)
            return;
        out._e(err);
    };
    SampleCombineOperator.prototype._c = function () {
        var out = this.out;
        if (out === NO)
            return;
        out._c();
    };
    SampleCombineOperator.prototype.up = function (t, i) {
        var v = this.vals[i];
        if (this.Nn > 0 && v === NO) {
            this.Nn--;
        }
        this.vals[i] = t;
    };
    SampleCombineOperator.prototype.down = function (i, l) {
        this.others[i]._remove(l);
    };
    return SampleCombineOperator;
}());
exports.SampleCombineOperator = SampleCombineOperator;
var sampleCombine;
/**
 *
 * Combines a source stream with multiple other streams. The result stream
 * will emit the latest events from all input streams, but only when the
 * source stream emits.
 *
 * If the source, or any input stream, throws an error, the result stream
 * will propagate the error. If any input streams end, their final emitted
 * value will remain in the array of any subsequent events from the result
 * stream.
 *
 * The result stream will only complete upon completion of the source stream.
 *
 * Marble diagram:
 *
 * ```text
 * --1----2-----3--------4--- (source)
 * ----a-----b-----c--d------ (other)
 *      sampleCombine
 * -------2a----3b-------4d--
 * ```
 *
 * Examples:
 *
 * ```js
 * import sampleCombine from 'xstream/extra/sampleCombine'
 * import xs from 'xstream'
 *
 * const sampler = xs.periodic(1000).take(3)
 * const other = xs.periodic(100)
 *
 * const stream = sampler.compose(sampleCombine(other))
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > [0, 8]
 * > [1, 18]
 * > [2, 28]
 * ```
 *
 * ```js
 * import sampleCombine from 'xstream/extra/sampleCombine'
 * import xs from 'xstream'
 *
 * const sampler = xs.periodic(1000).take(3)
 * const other = xs.periodic(100).take(2)
 *
 * const stream = sampler.compose(sampleCombine(other))
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > [0, 1]
 * > [1, 1]
 * > [2, 1]
 * ```
 *
 * @param {...Stream} streams One or more streams to combine with the sampler
 * stream.
 * @return {Stream}
 */
sampleCombine = function sampleCombine() {
    var streams = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        streams[_i] = arguments[_i];
    }
    return function sampleCombineOperator(sampler) {
        return new index_1.Stream(new SampleCombineOperator(sampler, streams));
    };
};
exports.default = sampleCombine;
//# sourceMappingURL=sampleCombine.js.map
},{"../index":16}],97:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vnode_1 = require("./vnode");
var htmldomapi_1 = require("./htmldomapi");
function toVNode(node, domApi) {
    var api = domApi !== undefined ? domApi : htmldomapi_1.default;
    var text;
    if (api.isElement(node)) {
        var id = node.id ? '#' + node.id : '';
        var cn = node.getAttribute('class');
        var c = cn ? '.' + cn.split(' ').join('.') : '';
        var sel = api.tagName(node).toLowerCase() + id + c;
        var attrs = {};
        var children = [];
        var name_1;
        var i = void 0, n = void 0;
        var elmAttrs = node.attributes;
        var elmChildren = node.childNodes;
        for (i = 0, n = elmAttrs.length; i < n; i++) {
            name_1 = elmAttrs[i].nodeName;
            if (name_1 !== 'id' && name_1 !== 'class') {
                attrs[name_1] = elmAttrs[i].nodeValue;
            }
        }
        for (i = 0, n = elmChildren.length; i < n; i++) {
            children.push(toVNode(elmChildren[i]));
        }
        return vnode_1.default(sel, { attrs: attrs }, children, undefined, node);
    }
    else if (api.isText(node)) {
        text = api.getTextContent(node);
        return vnode_1.default(undefined, undefined, undefined, text, node);
    }
    else if (api.isComment(node)) {
        text = api.getTextContent(node);
        return vnode_1.default('!', {}, [], text, node);
    }
    else {
        return vnode_1.default('', {}, [], undefined, node);
    }
}
exports.toVNode = toVNode;
exports.default = toVNode;
//# sourceMappingURL=tovnode.js.map
},{"./vnode":73,"./htmldomapi":75}],85:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.curry2 = curry2;
function curry2(select) {
  return function selector(sel, vNode) {
    switch (arguments.length) {
      case 0:
        return select;
      case 1:
        return function (_vNode) {
          return select(sel, _vNode);
        };
      default:
        return select(sel, vNode);
    }
  };
}
;
//# sourceMappingURL=curry2.js.map
},{}],164:[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],167:[function(require,module,exports) {
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],48:[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],190:[function(require,module,exports) {
var process = require("process");
'use strict';

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}

},{"process":48}],188:[function(require,module,exports) {
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],182:[function(require,module,exports) {
module.exports = require('events').EventEmitter;

},{"events":164}],195:[function(require,module,exports) {
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],196:[function(require,module,exports) {
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],192:[function(require,module,exports) {

var global = (1,eval)("this");
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

},{"base64-js":195,"ieee754":196,"isarray":188,"buffer":192}],189:[function(require,module,exports) {

/* eslint-disable node/no-deprecated-api */
var buffer = require('buffer')
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}

},{"buffer":192}],191:[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

},{"buffer":192}],181:[function(require,module,exports) {

},{}],183:[function(require,module,exports) {

'use strict';

/*<replacement>*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();
},{"safe-buffer":189}],184:[function(require,module,exports) {
'use strict';

/*<replacement>*/

var processNextTick = require('process-nextick-args');
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      processNextTick(emitErrorNT, this, err);
    }
    return;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      processNextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};
},{"process-nextick-args":190}],194:[function(require,module,exports) {
var global = (1,eval)("this");

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

},{}],177:[function(require,module,exports) {
var process = require("process");

var global = (1,eval)("this");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.

'use strict';

/*<replacement>*/

var processNextTick = require('process-nextick-args');
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

/*<replacement>*/
var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

var destroyImpl = require('./internal/streams/destroy');

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = _isUint8Array(chunk) && !state.objectMode;

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    processNextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    processNextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      processNextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
},{"process-nextick-args":190,"core-util-is":191,"inherits":167,"util-deprecate":194,"./internal/streams/stream":182,"safe-buffer":189,"./internal/streams/destroy":184,"./_stream_duplex":176,"process":48}],176:[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

'use strict';

/*<replacement>*/

var processNextTick = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  processNextTick(cb, err);
};

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}
},{"process-nextick-args":190,"core-util-is":191,"inherits":167,"./_stream_readable":175,"./_stream_writable":177}],193:[function(require,module,exports) {

'use strict';

var Buffer = require('safe-buffer').Buffer;

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return -1;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// UTF-8 replacement characters ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd'.repeat(p);
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd'.repeat(p + 1);
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd'.repeat(p + 2);
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character for each buffered byte of a (partial)
// character needs to be added to the output.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd'.repeat(this.lastTotal - this.lastNeed);
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}
},{"safe-buffer":189}],175:[function(require,module,exports) {

var global = (1,eval)("this");
var process = require("process");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var processNextTick = require('process-nextick-args');
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = require('events').EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

// TODO(bmeurer): Change this back to const once hole checks are
// properly optimized away early in Ignition+TurboFan.
/*<replacement>*/
var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var debugUtil = require('util');
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = require('./internal/streams/BufferList');
var destroyImpl = require('./internal/streams/destroy');
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
},{"process-nextick-args":190,"isarray":188,"events":164,"./internal/streams/stream":182,"safe-buffer":189,"core-util-is":191,"inherits":167,"util":181,"./internal/streams/BufferList":183,"./internal/streams/destroy":184,"./_stream_duplex":176,"string_decoder/":193,"process":48}],178:[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

'use strict';

module.exports = Transform;

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return stream.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}
},{"./_stream_duplex":176,"core-util-is":191,"inherits":167}],179:[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":178,"core-util-is":191,"inherits":167}],169:[function(require,module,exports) {
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_readable.js":175,"./lib/_stream_writable.js":177,"./lib/_stream_duplex.js":176,"./lib/_stream_transform.js":178,"./lib/_stream_passthrough.js":179}],170:[function(require,module,exports) {
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":177}],171:[function(require,module,exports) {
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":176}],172:[function(require,module,exports) {
module.exports = require('./readable').Transform

},{"./readable":169}],173:[function(require,module,exports) {
module.exports = require('./readable').PassThrough

},{"./readable":169}],161:[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/readable.js');
Stream.Writable = require('readable-stream/writable.js');
Stream.Duplex = require('readable-stream/duplex.js');
Stream.Transform = require('readable-stream/transform.js');
Stream.PassThrough = require('readable-stream/passthrough.js');

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":164,"inherits":167,"readable-stream/readable.js":169,"readable-stream/writable.js":170,"readable-stream/duplex.js":171,"readable-stream/transform.js":172,"readable-stream/passthrough.js":173}],160:[function(require,module,exports) {
var process = require("process");
var Stream = require('stream')

// through
//
// a stream that does nothing but re-emit the input.
// useful for aggregating a series of changing but not ending streams into one stream)

exports = module.exports = through
through.through = through

//create a readable writable stream.

function through (write, end, opts) {
  write = write || function (data) { this.queue(data) }
  end = end || function () { this.queue(null) }

  var ended = false, destroyed = false, buffer = [], _ended = false
  var stream = new Stream()
  stream.readable = stream.writable = true
  stream.paused = false

//  stream.autoPause   = !(opts && opts.autoPause   === false)
  stream.autoDestroy = !(opts && opts.autoDestroy === false)

  stream.write = function (data) {
    write.call(this, data)
    return !stream.paused
  }

  function drain() {
    while(buffer.length && !stream.paused) {
      var data = buffer.shift()
      if(null === data)
        return stream.emit('end')
      else
        stream.emit('data', data)
    }
  }

  stream.queue = stream.push = function (data) {
//    console.error(ended)
    if(_ended) return stream
    if(data === null) _ended = true
    buffer.push(data)
    drain()
    return stream
  }

  //this will be registered as the first 'end' listener
  //must call destroy next tick, to make sure we're after any
  //stream piped from here.
  //this is only a problem if end is not emitted synchronously.
  //a nicer way to do this is to make sure this is the last listener for 'end'

  stream.on('end', function () {
    stream.readable = false
    if(!stream.writable && stream.autoDestroy)
      process.nextTick(function () {
        stream.destroy()
      })
  })

  function _end () {
    stream.writable = false
    end.call(stream)
    if(!stream.readable && stream.autoDestroy)
      stream.destroy()
  }

  stream.end = function (data) {
    if(ended) return
    ended = true
    if(arguments.length) stream.write(data)
    _end() // will emit or queue
    return stream
  }

  stream.destroy = function () {
    if(destroyed) return
    destroyed = true
    ended = true
    buffer.length = 0
    stream.writable = stream.readable = false
    stream.emit('close')
    return stream
  }

  stream.pause = function () {
    if(stream.paused) return
    stream.paused = true
    return stream
  }

  stream.resume = function () {
    if(stream.paused) {
      stream.paused = false
      stream.emit('resume')
    }
    drain()
    //may have become paused again,
    //as drain emits 'data'.
    if(!stream.paused)
      stream.emit('drain')
    return stream
  }
  return stream
}


},{"stream":161,"process":48}],132:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tokenize;

var _through = require("through");

var _through2 = _interopRequireDefault(_through);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PSEUDOSTART = 'pseudo-start',
    ATTR_START = 'attr-start',
    ANY_CHILD = 'any-child',
    ATTR_COMP = 'attr-comp',
    ATTR_END = 'attr-end',
    PSEUDOPSEUDO = '::',
    PSEUDOCLASS = ':',
    READY = '(ready)',
    OPERATION = 'op',
    CLASS = 'class',
    COMMA = 'comma',
    ATTR = 'attr',
    SUBJECT = '!',
    TAG = 'tag',
    STAR = '*',
    ID = 'id';

function tokenize() {
  var escaped = false,
      gathered = [],
      state = READY,
      data = [],
      idx = 0,
      stream,
      length,
      quote,
      depth,
      lhs,
      rhs,
      cmp,
      c;

  return stream = (0, _through2.default)(ondata, onend);

  function ondata(chunk) {
    data = data.concat(chunk.split(''));
    length = data.length;

    while (idx < length && (c = data[idx++])) {
      switch (state) {
        case READY:
          state_ready();break;
        case ANY_CHILD:
          state_any_child();break;
        case OPERATION:
          state_op();break;
        case ATTR_START:
          state_attr_start();break;
        case ATTR_COMP:
          state_attr_compare();break;
        case ATTR_END:
          state_attr_end();break;
        case PSEUDOCLASS:
        case PSEUDOPSEUDO:
          state_pseudo();break;
        case PSEUDOSTART:
          state_pseudostart();break;
        case ID:
        case TAG:
        case CLASS:
          state_gather();break;
      }
    }

    data = data.slice(idx);
  }

  function onend(chunk) {
    if (arguments.length) {
      ondata(chunk);
    }

    if (gathered.length) {
      stream.queue(token());
    }
  }

  function state_ready() {
    switch (true) {
      case '#' === c:
        state = ID;break;
      case '.' === c:
        state = CLASS;break;
      case ':' === c:
        state = PSEUDOCLASS;break;
      case '[' === c:
        state = ATTR_START;break;
      case '!' === c:
        subject();break;
      case '*' === c:
        star();break;
      case ',' === c:
        comma();break;
      case /[>\+~]/.test(c):
        state = OPERATION;break;
      case /\s/.test(c):
        state = ANY_CHILD;break;
      case /[\w\d\-_]/.test(c):
        state = TAG;--idx;break;
    }
  }

  function subject() {
    state = SUBJECT;
    gathered = ['!'];
    stream.queue(token());
    state = READY;
  }

  function star() {
    state = STAR;
    gathered = ['*'];
    stream.queue(token());
    state = READY;
  }

  function comma() {
    state = COMMA;
    gathered = [','];
    stream.queue(token());
    state = READY;
  }

  function state_op() {
    if (/[>\+~]/.test(c)) {
      return gathered.push(c);
    }

    // chomp down the following whitespace.
    if (/\s/.test(c)) {
      return;
    }

    stream.queue(token());
    state = READY;
    --idx;
  }

  function state_any_child() {
    if (/\s/.test(c)) {
      return;
    }

    if (/[>\+~]/.test(c)) {
      return --idx, state = OPERATION;
    }

    stream.queue(token());
    state = READY;
    --idx;
  }

  function state_pseudo() {
    rhs = state;
    state_gather(true);

    if (state !== READY) {
      return;
    }

    if (c === '(') {
      lhs = gathered.join('');
      state = PSEUDOSTART;
      gathered.length = 0;
      depth = 1;
      ++idx;

      return;
    }

    state = PSEUDOCLASS;
    stream.queue(token());
    state = READY;
  }

  function state_pseudostart() {
    if (gathered.length === 0 && !quote) {
      quote = /['"]/.test(c) ? c : null;

      if (quote) {
        return;
      }
    }

    if (quote) {
      if (!escaped && c === quote) {
        quote = null;

        return;
      }

      if (c === '\\') {
        escaped ? gathered.push(c) : escaped = true;

        return;
      }

      escaped = false;
      gathered.push(c);

      return;
    }

    gathered.push(c);

    if (c === '(') {
      ++depth;
    } else if (c === ')') {
      --depth;
    }

    if (!depth) {
      gathered.pop();
      stream.queue({
        type: rhs,
        data: lhs + '(' + gathered.join('') + ')'
      });

      state = READY;
      lhs = rhs = cmp = null;
      gathered.length = 0;
    }

    return;
  }

  function state_attr_start() {
    state_gather(true);

    if (state !== READY) {
      return;
    }

    if (c === ']') {
      state = ATTR;
      stream.queue(token());
      state = READY;

      return;
    }

    lhs = gathered.join('');
    gathered.length = 0;
    state = ATTR_COMP;
  }

  function state_attr_compare() {
    if (/[=~|$^*]/.test(c)) {
      gathered.push(c);
    }

    if (gathered.length === 2 || c === '=') {
      cmp = gathered.join('');
      gathered.length = 0;
      state = ATTR_END;
      quote = null;

      return;
    }
  }

  function state_attr_end() {
    if (!gathered.length && !quote) {
      quote = /['"]/.test(c) ? c : null;

      if (quote) {
        return;
      }
    }

    if (quote) {
      if (!escaped && c === quote) {
        quote = null;

        return;
      }

      if (c === '\\') {
        if (escaped) {
          gathered.push(c);
        }

        escaped = !escaped;

        return;
      }

      escaped = false;
      gathered.push(c);

      return;
    }

    state_gather(true);

    if (state !== READY) {
      return;
    }

    stream.queue({
      type: ATTR,
      data: {
        lhs: lhs,
        rhs: gathered.join(''),
        cmp: cmp
      }
    });

    state = READY;
    lhs = rhs = cmp = null;
    gathered.length = 0;

    return;
  }

  function state_gather(quietly) {
    if (/[^\d\w\-_]/.test(c) && !escaped) {
      if (c === '\\') {
        escaped = true;
      } else {
        !quietly && stream.queue(token());
        state = READY;
        --idx;
      }

      return;
    }

    escaped = false;
    gathered.push(c);
  }

  function token() {
    var data = gathered.join('');

    gathered.length = 0;

    return {
      type: state,
      data: data
    };
  }
}
},{"through":160}],114:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = language;

var _tokenizer = require("./tokenizer");

var _tokenizer2 = _interopRequireDefault(_tokenizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function language(lookups, matchComparison) {
  return function (selector) {
    return parse(selector, remap(lookups), matchComparison || caseSensitiveComparison);
  };
}

function remap(opts) {
  for (var key in opts) {
    if (opt_okay(opts, key)) {
      opts[key] = Function('return function(node, attr) { return node.' + opts[key] + ' }');
      opts[key] = opts[key]();
    }
  }return opts;
}

function opt_okay(opts, key) {
  return opts.hasOwnProperty(key) && typeof opts[key] === 'string';
}

function parse(selector, options, matchComparison) {
  var stream = (0, _tokenizer2.default)(),
      default_subj = true,
      selectors = [[]],
      traversal,
      bits;

  bits = selectors[0];

  traversal = {
    '': any_parents,
    '>': direct_parent,
    '+': direct_sibling,
    '~': any_sibling
  };

  stream.on('data', group).end(selector);

  function group(token) {
    var crnt;

    if (token.type === 'comma') {
      selectors.unshift(bits = []);

      return;
    }

    if (token.type === 'op' || token.type === 'any-child') {
      bits.unshift(traversal[token.data]);
      bits.unshift(check());

      return;
    }

    bits[0] = bits[0] || check();
    crnt = bits[0];

    if (token.type === '!') {
      crnt.subject = selectors[0].subject = true;

      return;
    }

    crnt.push(token.type === 'class' ? listContains(token.type, token.data) : token.type === 'attr' ? attr(token) : token.type === ':' || token.type === '::' ? pseudo(token) : token.type === '*' ? Boolean : matches(token.type, token.data, matchComparison));
  }

  return selector_fn;

  function selector_fn(node, as_boolean) {
    var current, length, orig, subj, set;

    orig = node;
    set = [];

    for (var i = 0, len = selectors.length; i < len; ++i) {
      bits = selectors[i];
      current = entry;
      length = bits.length;
      node = orig;
      subj = [];

      for (var j = 0; j < length; j += 2) {
        node = current(node, bits[j], subj);

        if (!node) {
          break;
        }

        current = bits[j + 1];
      }

      if (j >= length) {
        if (as_boolean) {
          return true;
        }

        add(!bits.subject ? [orig] : subj);
      }
    }

    if (as_boolean) {
      return false;
    }

    return !set.length ? false : set.length === 1 ? set[0] : set;

    function add(items) {
      var next;

      while (items.length) {
        next = items.shift();

        if (set.indexOf(next) === -1) {
          set.push(next);
        }
      }
    }
  }

  function check() {
    _check.bits = [];
    _check.subject = false;
    _check.push = function (token) {
      _check.bits.push(token);
    };

    return _check;

    function _check(node, subj) {
      for (var i = 0, len = _check.bits.length; i < len; ++i) {
        if (!_check.bits[i](node)) {
          return false;
        }
      }

      if (_check.subject) {
        subj.push(node);
      }

      return true;
    }
  }

  function listContains(type, data) {
    return function (node) {
      var val = options[type](node);
      val = Array.isArray(val) ? val : val ? val.toString().split(/\s+/) : [];
      return val.indexOf(data) >= 0;
    };
  }

  function attr(token) {
    return token.data.lhs ? valid_attr(options.attr, token.data.lhs, token.data.cmp, token.data.rhs) : valid_attr(options.attr, token.data);
  }

  function matches(type, data, matchComparison) {
    return function (node) {
      return matchComparison(type, options[type](node), data);
    };
  }

  function any_parents(node, next, subj) {
    do {
      node = options.parent(node);
    } while (node && !next(node, subj));

    return node;
  }

  function direct_parent(node, next, subj) {
    node = options.parent(node);

    return node && next(node, subj) ? node : null;
  }

  function direct_sibling(node, next, subj) {
    var parent = options.parent(node),
        idx = 0,
        children;

    children = options.children(parent);

    for (var i = 0, len = children.length; i < len; ++i) {
      if (children[i] === node) {
        idx = i;

        break;
      }
    }

    return children[idx - 1] && next(children[idx - 1], subj) ? children[idx - 1] : null;
  }

  function any_sibling(node, next, subj) {
    var parent = options.parent(node),
        children;

    children = options.children(parent);

    for (var i = 0, len = children.length; i < len; ++i) {
      if (children[i] === node) {
        return null;
      }

      if (next(children[i], subj)) {
        return children[i];
      }
    }

    return null;
  }

  function pseudo(token) {
    return valid_pseudo(options, token.data, matchComparison);
  }
}

function entry(node, next, subj) {
  return next(node, subj) ? node : null;
}

function valid_pseudo(options, match, matchComparison) {
  switch (match) {
    case 'empty':
      return valid_empty(options);
    case 'first-child':
      return valid_first_child(options);
    case 'last-child':
      return valid_last_child(options);
    case 'root':
      return valid_root(options);
  }

  if (match.indexOf('contains') === 0) {
    return valid_contains(options, match.slice(9, -1));
  }

  if (match.indexOf('any') === 0) {
    return valid_any_match(options, match.slice(4, -1), matchComparison);
  }

  if (match.indexOf('not') === 0) {
    return valid_not_match(options, match.slice(4, -1), matchComparison);
  }

  if (match.indexOf('nth-child') === 0) {
    return valid_nth_child(options, match.slice(10, -1));
  }

  return function () {
    return false;
  };
}

function valid_not_match(options, selector, matchComparison) {
  var fn = parse(selector, options, matchComparison);

  return not_function;

  function not_function(node) {
    return !fn(node, true);
  }
}

function valid_any_match(options, selector, matchComparison) {
  var fn = parse(selector, options, matchComparison);

  return fn;
}

function valid_attr(fn, lhs, cmp, rhs) {
  return function (node) {
    var attr = fn(node, lhs);

    if (!cmp) {
      return !!attr;
    }

    if (cmp.length === 1) {
      return attr == rhs;
    }

    if (attr === void 0 || attr === null) {
      return false;
    }

    return checkattr[cmp.charAt(0)](attr, rhs);
  };
}

function valid_first_child(options) {
  return function (node) {
    return options.children(options.parent(node))[0] === node;
  };
}

function valid_last_child(options) {
  return function (node) {
    var children = options.children(options.parent(node));

    return children[children.length - 1] === node;
  };
}

function valid_empty(options) {
  return function (node) {
    return options.children(node).length === 0;
  };
}

function valid_root(options) {
  return function (node) {
    return !options.parent(node);
  };
}

function valid_contains(options, contents) {
  return function (node) {
    return options.contents(node).indexOf(contents) !== -1;
  };
}

function valid_nth_child(options, nth) {
  var test = function test() {
    return false;
  };
  if (nth == 'odd') {
    nth = '2n+1';
  } else if (nth == 'even') {
    nth = '2n';
  }
  var regexp = /( ?([-|\+])?(\d*)n)? ?((\+|-)? ?(\d+))? ?/;
  var matches = nth.match(regexp);
  if (matches) {
    var growth = 0;
    if (matches[1]) {
      var positiveGrowth = matches[2] != '-';
      growth = parseInt(matches[3] == '' ? 1 : matches[3]);
      growth = growth * (positiveGrowth ? 1 : -1);
    }
    var offset = 0;
    if (matches[4]) {
      offset = parseInt(matches[6]);
      var positiveOffset = matches[5] != '-';
      offset = offset * (positiveOffset ? 1 : -1);
    }
    if (growth == 0) {
      if (offset != 0) {
        test = function test(children, node) {
          return children[offset - 1] === node;
        };
      }
    } else {
      test = function test(children, node) {
        var validPositions = [];
        var len = children.length;
        for (var position = 1; position <= len; position++) {
          var divisible = (position - offset) % growth == 0;
          if (divisible) {
            if (growth > 0) {
              validPositions.push(position);
            } else {
              if ((position - offset) / growth >= 0) {
                validPositions.push(position);
              }
            }
          }
        }
        for (var i = 0; i < validPositions.length; i++) {
          if (children[validPositions[i] - 1] === node) {
            return true;
          }
        }
        return false;
      };
    }
  }
  return function (node) {
    var children = options.children(options.parent(node));

    return test(children, node);
  };
}

var checkattr = {
  '$': check_end,
  '^': check_beg,
  '*': check_any,
  '~': check_spc,
  '|': check_dsh
};

function check_end(l, r) {
  return l.slice(l.length - r.length) === r;
}

function check_beg(l, r) {
  return l.slice(0, r.length) === r;
}

function check_any(l, r) {
  return l.indexOf(r) > -1;
}

function check_spc(l, r) {
  return l.split(/\s+/).indexOf(r) > -1;
}

function check_dsh(l, r) {
  return l.split('-').indexOf(r) > -1;
}

function caseSensitiveComparison(type, pattern, data) {
  return pattern === data;
}
},{"./tokenizer":132}],86:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectorParser = selectorParser;
function selectorParser(node) {
  if (!node.sel) {
    return {
      tagName: '',
      id: '',
      className: ''
    };
  }
  var sel = node.sel;
  var hashIdx = sel.indexOf('#');
  var dotIdx = sel.indexOf('.', hashIdx);
  var hash = hashIdx > 0 ? hashIdx : sel.length;
  var dot = dotIdx > 0 ? dotIdx : sel.length;
  var tagName = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
  var id = hash < dot ? sel.slice(hash + 1, dot) : void 0;
  var className = dotIdx > 0 ? sel.slice(dot + 1).replace(/\./g, ' ') : void 0;
  return {
    tagName: tagName,
    id: id,
    className: className
  };
}
//# sourceMappingURL=selectorParser.js.map
},{}],87:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classNameFromVNode = classNameFromVNode;

var _selectorParser = require("./selectorParser");

function classNameFromVNode(vNode) {
  var _a = (0, _selectorParser.selectorParser)(vNode).className,
      cn = _a === void 0 ? '' : _a;
  if (!vNode.data) {
    return cn;
  }
  var _b = vNode.data,
      dataClass = _b.class,
      props = _b.props;
  if (dataClass) {
    var c = Object.keys(dataClass).filter(function (cl) {
      return dataClass[cl];
    });
    cn += " " + c.join(" ");
  }
  if (props && props.className) {
    cn += " " + props.className;
  }
  return cn && cn.trim();
}
//# sourceMappingURL=classNameFromVNode.js.map
},{"./selectorParser":86}],93:[function(require,module,exports) {
var global = (1,eval)("this");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var root;
if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else {
  root = Function('return this')();
}
var _Symbol = root.Symbol;
var parentSymbol;
if (typeof _Symbol === 'function') {
  parentSymbol = _Symbol('parent');
} else {
  parentSymbol = '@@snabbdom-selector-parent';
}
exports.default = parentSymbol;
//# sourceMappingURL=parent-symbol.js.map
},{}],92:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.language = undefined;

var _cssauron = require("cssauron2");

var _cssauron2 = _interopRequireDefault(_cssauron);

var _selectorParser = require("./selectorParser");

var _classNameFromVNode = require("./classNameFromVNode");

var _parentSymbol = require("./parent-symbol");

var _parentSymbol2 = _interopRequireDefault(_parentSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var language = exports.language = (0, _cssauron2.default)({
  tag: function tag(vNode) {
    return (0, _selectorParser.selectorParser)(vNode).tagName;
  },
  class: function _class(vNode) {
    return (0, _classNameFromVNode.classNameFromVNode)(vNode);
  },
  id: function id(vNode) {
    return (0, _selectorParser.selectorParser)(vNode).id;
  },
  children: function children(vNode) {
    return vNode.children || [];
  },
  parent: function parent(vNode) {
    return vNode.data[_parentSymbol2.default] || vNode;
  },
  contents: function contents(vNode) {
    return vNode.text;
  },
  attr: function attr(vNode, _attr) {
    if (vNode.data) {
      var _a = vNode.data,
          _b = _a.attrs,
          attrs = _b === void 0 ? {} : _b,
          _c = _a.props,
          props = _c === void 0 ? {} : _c;
      if (attrs[_attr]) {
        return attrs[_attr];
      }
      if (props[_attr]) {
        return props[_attr];
      }
    }
  }
});
//# sourceMappingURL=language.js.map
},{"cssauron2":114,"./selectorParser":86,"./classNameFromVNode":87,"./parent-symbol":93}],84:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findMatches = findMatches;

var _language = require("./language");

var _parentSymbol = require("./parent-symbol");

var _parentSymbol2 = _interopRequireDefault(_parentSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findMatches(cssSelector, vNode) {
  var selector = (0, _language.language)(cssSelector);
  var matches = [];
  traverseVNode(vNode, addParent); // add mapping to the parent selectorParser
  traverseVNode(vNode, function (currentNode) {
    var data = currentNode.data;
    var result;
    if (data && data.fn) {
      if (Array.isArray(data.args)) {
        result = selector(data.fn.apply(null, data.args));
      } else if (data.args) {
        result = selector(data.fn.call(null, data.args));
      } else {
        result = selector(data.fn());
      }
    } else {
      result = selector(currentNode);
    }
    if (result) {
      if (!Array.isArray(result)) {
        result = [result];
      }
      matches.push.apply(matches, result);
    }
  });
  return matches;
}
function traverseVNode(vNode, f) {
  function recurse(currentNode, isParent, parentVNode) {
    var length = currentNode.children && currentNode.children.length || 0;
    for (var i = 0; i < length; ++i) {
      var children = currentNode.children;
      if (children && children[i] && typeof children[i] !== 'string') {
        var child = children[i];
        recurse(child, false, currentNode);
      }
    }
    f(currentNode, isParent, isParent ? void 0 : parentVNode);
  }
  recurse(vNode, true);
}
function addParent(vNode, isParent, parent) {
  if (isParent) {
    return void 0;
  }
  if (!vNode.data) {
    vNode.data = {};
  }
  if (!vNode.data[_parentSymbol2.default]) {
    Object.defineProperty(vNode.data, _parentSymbol2.default, {
      value: parent
    });
  }
}
//# sourceMappingURL=findMatches.js.map
},{"./language":92,"./parent-symbol":93}],82:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classNameFromVNode = exports.selectorParser = exports.select = undefined;

var _selectorParser = require("./selectorParser");

Object.defineProperty(exports, "selectorParser", {
  enumerable: true,
  get: function get() {
    return _selectorParser.selectorParser;
  }
});

var _classNameFromVNode = require("./classNameFromVNode");

Object.defineProperty(exports, "classNameFromVNode", {
  enumerable: true,
  get: function get() {
    return _classNameFromVNode.classNameFromVNode;
  }
});

var _curry = require("./curry2");

var _findMatches = require("./findMatches");

var select = exports.select = (0, _curry.curry2)(_findMatches.findMatches);
},{"./curry2":85,"./findMatches":84,"./selectorParser":86,"./classNameFromVNode":87}],42:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VNodeWrapper = undefined;

var _vnode = require("snabbdom/vnode");

var _h = require("snabbdom/h");

var _snabbdomSelector = require("snabbdom-selector");

var _utils = require("./utils");

var VNodeWrapper = /** @class */function () {
  function VNodeWrapper(rootElement) {
    this.rootElement = rootElement;
  }
  VNodeWrapper.prototype.call = function (vnode) {
    if ((0, _utils.isDocFrag)(this.rootElement)) {
      return this.wrapDocFrag(vnode === null ? [] : [vnode]);
    }
    if (vnode === null) {
      return this.wrap([]);
    }
    var _a = (0, _snabbdomSelector.selectorParser)(vnode),
        selTagName = _a.tagName,
        selId = _a.id;
    var vNodeClassName = (0, _snabbdomSelector.classNameFromVNode)(vnode);
    var vNodeData = vnode.data || {};
    var vNodeDataProps = vNodeData.props || {};
    var _b = vNodeDataProps.id,
        vNodeId = _b === void 0 ? selId : _b;
    var isVNodeAndRootElementIdentical = typeof vNodeId === 'string' && vNodeId.toUpperCase() === this.rootElement.id.toUpperCase() && selTagName.toUpperCase() === this.rootElement.tagName.toUpperCase() && vNodeClassName.toUpperCase() === this.rootElement.className.toUpperCase();
    if (isVNodeAndRootElementIdentical) {
      return vnode;
    }
    return this.wrap([vnode]);
  };
  VNodeWrapper.prototype.wrapDocFrag = function (children) {
    return (0, _vnode.vnode)('', {}, children, undefined, this.rootElement);
  };
  VNodeWrapper.prototype.wrap = function (children) {
    var _a = this.rootElement,
        tagName = _a.tagName,
        id = _a.id,
        className = _a.className;
    var selId = id ? "#" + id : '';
    var selClass = className ? "." + className.split(" ").join(".") : '';
    return (0, _h.h)("" + tagName.toLowerCase() + selId + selClass, {}, children);
  };
  return VNodeWrapper;
}();
exports.VNodeWrapper = VNodeWrapper;
//# sourceMappingURL=VNodeWrapper.js.map
},{"snabbdom/vnode":73,"snabbdom/h":77,"snabbdom-selector":82,"./utils":44}],120:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function updateClass(oldVnode, vnode) {
    var cur, name, elm = vnode.elm, oldClass = oldVnode.data.class, klass = vnode.data.class;
    if (!oldClass && !klass)
        return;
    if (oldClass === klass)
        return;
    oldClass = oldClass || {};
    klass = klass || {};
    for (name in oldClass) {
        if (!klass[name]) {
            elm.classList.remove(name);
        }
    }
    for (name in klass) {
        cur = klass[name];
        if (cur !== oldClass[name]) {
            elm.classList[cur ? 'add' : 'remove'](name);
        }
    }
}
exports.classModule = { create: updateClass, update: updateClass };
exports.default = exports.classModule;
//# sourceMappingURL=class.js.map
},{}],118:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function updateProps(oldVnode, vnode) {
    var key, cur, old, elm = vnode.elm, oldProps = oldVnode.data.props, props = vnode.data.props;
    if (!oldProps && !props)
        return;
    if (oldProps === props)
        return;
    oldProps = oldProps || {};
    props = props || {};
    for (key in oldProps) {
        if (!props[key]) {
            delete elm[key];
        }
    }
    for (key in props) {
        cur = props[key];
        old = oldProps[key];
        if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
            elm[key] = cur;
        }
    }
}
exports.propsModule = { create: updateProps, update: updateProps };
exports.default = exports.propsModule;
//# sourceMappingURL=props.js.map
},{}],117:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xlinkNS = 'http://www.w3.org/1999/xlink';
var xmlNS = 'http://www.w3.org/XML/1998/namespace';
var colonChar = 58;
var xChar = 120;
function updateAttrs(oldVnode, vnode) {
    var key, elm = vnode.elm, oldAttrs = oldVnode.data.attrs, attrs = vnode.data.attrs;
    if (!oldAttrs && !attrs)
        return;
    if (oldAttrs === attrs)
        return;
    oldAttrs = oldAttrs || {};
    attrs = attrs || {};
    // update modified attributes, add new attributes
    for (key in attrs) {
        var cur = attrs[key];
        var old = oldAttrs[key];
        if (old !== cur) {
            if (cur === true) {
                elm.setAttribute(key, "");
            }
            else if (cur === false) {
                elm.removeAttribute(key);
            }
            else {
                if (key.charCodeAt(0) !== xChar) {
                    elm.setAttribute(key, cur);
                }
                else if (key.charCodeAt(3) === colonChar) {
                    // Assume xml namespace
                    elm.setAttributeNS(xmlNS, key, cur);
                }
                else if (key.charCodeAt(5) === colonChar) {
                    // Assume xlink namespace
                    elm.setAttributeNS(xlinkNS, key, cur);
                }
                else {
                    elm.setAttribute(key, cur);
                }
            }
        }
    }
    // remove removed attributes
    // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
    // the other option is to remove all attributes with value == undefined
    for (key in oldAttrs) {
        if (!(key in attrs)) {
            elm.removeAttribute(key);
        }
    }
}
exports.attributesModule = { create: updateAttrs, update: updateAttrs };
exports.default = exports.attributesModule;
//# sourceMappingURL=attributes.js.map
},{}],119:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
var nextFrame = function (fn) { raf(function () { raf(fn); }); };
function setNextFrame(obj, prop, val) {
    nextFrame(function () { obj[prop] = val; });
}
function updateStyle(oldVnode, vnode) {
    var cur, name, elm = vnode.elm, oldStyle = oldVnode.data.style, style = vnode.data.style;
    if (!oldStyle && !style)
        return;
    if (oldStyle === style)
        return;
    oldStyle = oldStyle || {};
    style = style || {};
    var oldHasDel = 'delayed' in oldStyle;
    for (name in oldStyle) {
        if (!style[name]) {
            if (name[0] === '-' && name[1] === '-') {
                elm.style.removeProperty(name);
            }
            else {
                elm.style[name] = '';
            }
        }
    }
    for (name in style) {
        cur = style[name];
        if (name === 'delayed' && style.delayed) {
            for (var name2 in style.delayed) {
                cur = style.delayed[name2];
                if (!oldHasDel || cur !== oldStyle.delayed[name2]) {
                    setNextFrame(elm.style, name2, cur);
                }
            }
        }
        else if (name !== 'remove' && cur !== oldStyle[name]) {
            if (name[0] === '-' && name[1] === '-') {
                elm.style.setProperty(name, cur);
            }
            else {
                elm.style[name] = cur;
            }
        }
    }
}
function applyDestroyStyle(vnode) {
    var style, name, elm = vnode.elm, s = vnode.data.style;
    if (!s || !(style = s.destroy))
        return;
    for (name in style) {
        elm.style[name] = style[name];
    }
}
function applyRemoveStyle(vnode, rm) {
    var s = vnode.data.style;
    if (!s || !s.remove) {
        rm();
        return;
    }
    var name, elm = vnode.elm, i = 0, compStyle, style = s.remove, amount = 0, applied = [];
    for (name in style) {
        applied.push(name);
        elm.style[name] = style[name];
    }
    compStyle = getComputedStyle(elm);
    var props = compStyle['transition-property'].split(', ');
    for (; i < props.length; ++i) {
        if (applied.indexOf(props[i]) !== -1)
            amount++;
    }
    elm.addEventListener('transitionend', function (ev) {
        if (ev.target === elm)
            --amount;
        if (amount === 0)
            rm();
    });
}
exports.styleModule = {
    create: updateStyle,
    update: updateStyle,
    destroy: applyDestroyStyle,
    remove: applyRemoveStyle
};
exports.default = exports.styleModule;
//# sourceMappingURL=style.js.map
},{}],121:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CAPS_REGEX = /[A-Z]/g;
function updateDataset(oldVnode, vnode) {
    var elm = vnode.elm, oldDataset = oldVnode.data.dataset, dataset = vnode.data.dataset, key;
    if (!oldDataset && !dataset)
        return;
    if (oldDataset === dataset)
        return;
    oldDataset = oldDataset || {};
    dataset = dataset || {};
    var d = elm.dataset;
    for (key in oldDataset) {
        if (!dataset[key]) {
            if (d) {
                if (key in d) {
                    delete d[key];
                }
            }
            else {
                elm.removeAttribute('data-' + key.replace(CAPS_REGEX, '-$&').toLowerCase());
            }
        }
    }
    for (key in dataset) {
        if (oldDataset[key] !== dataset[key]) {
            if (d) {
                d[key] = dataset[key];
            }
            else {
                elm.setAttribute('data-' + key.replace(CAPS_REGEX, '-$&').toLowerCase(), dataset[key]);
            }
        }
    }
}
exports.datasetModule = { create: updateDataset, update: updateDataset };
exports.default = exports.datasetModule;
//# sourceMappingURL=dataset.js.map
},{}],43:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatasetModule = exports.AttrsModule = exports.PropsModule = exports.ClassModule = exports.StyleModule = undefined;

var _class = require("snabbdom/modules/class");

var _class2 = _interopRequireDefault(_class);

var _props = require("snabbdom/modules/props");

var _props2 = _interopRequireDefault(_props);

var _attributes = require("snabbdom/modules/attributes");

var _attributes2 = _interopRequireDefault(_attributes);

var _style = require("snabbdom/modules/style");

var _style2 = _interopRequireDefault(_style);

var _dataset = require("snabbdom/modules/dataset");

var _dataset2 = _interopRequireDefault(_dataset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modules = [_style2.default, _class2.default, _props2.default, _attributes2.default, _dataset2.default];
exports.StyleModule = _style2.default;
exports.ClassModule = _class2.default;
exports.PropsModule = _props2.default;
exports.AttrsModule = _attributes2.default;
exports.DatasetModule = _dataset2.default;
exports.default = modules;
//# sourceMappingURL=modules.js.map
},{"snabbdom/modules/class":120,"snabbdom/modules/props":118,"snabbdom/modules/attributes":117,"snabbdom/modules/style":119,"snabbdom/modules/dataset":121}],45:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var IsolateModule = /** @class */function () {
  function IsolateModule() {
    this.elementsByFullScope = new Map();
    this.delegatorsByFullScope = new Map();
    this.fullScopesBeingUpdated = [];
    this.vnodesBeingRemoved = [];
  }
  IsolateModule.prototype.cleanupVNode = function (_a) {
    var data = _a.data,
        elm = _a.elm;
    var fullScope = (data || {}).isolate || '';
    var isCurrentElm = this.elementsByFullScope.get(fullScope) === elm;
    var isScopeBeingUpdated = this.fullScopesBeingUpdated.indexOf(fullScope) >= 0;
    if (fullScope && isCurrentElm && !isScopeBeingUpdated) {
      this.elementsByFullScope.delete(fullScope);
      this.delegatorsByFullScope.delete(fullScope);
    }
  };
  IsolateModule.prototype.getElement = function (fullScope) {
    return this.elementsByFullScope.get(fullScope);
  };
  IsolateModule.prototype.getFullScope = function (elm) {
    var iterator = this.elementsByFullScope.entries();
    for (var result = iterator.next(); !!result.value; result = iterator.next()) {
      var _a = result.value,
          fullScope = _a[0],
          element = _a[1];
      if (elm === element) {
        return fullScope;
      }
    }
    return '';
  };
  IsolateModule.prototype.addEventDelegator = function (fullScope, eventDelegator) {
    var delegators = this.delegatorsByFullScope.get(fullScope);
    if (!delegators) {
      delegators = [];
      this.delegatorsByFullScope.set(fullScope, delegators);
    }
    delegators[delegators.length] = eventDelegator;
  };
  IsolateModule.prototype.reset = function () {
    this.elementsByFullScope.clear();
    this.delegatorsByFullScope.clear();
    this.fullScopesBeingUpdated = [];
  };
  IsolateModule.prototype.createModule = function () {
    var self = this;
    return {
      create: function create(oldVNode, vNode) {
        var _a = oldVNode.data,
            oldData = _a === void 0 ? {} : _a;
        var elm = vNode.elm,
            _b = vNode.data,
            data = _b === void 0 ? {} : _b;
        var oldFullScope = oldData.isolate || '';
        var fullScope = data.isolate || '';
        // Update data structures with the newly-created element
        if (fullScope) {
          self.fullScopesBeingUpdated.push(fullScope);
          if (oldFullScope) {
            self.elementsByFullScope.delete(oldFullScope);
          }
          self.elementsByFullScope.set(fullScope, elm);
          // Update delegators for this scope
          var delegators = self.delegatorsByFullScope.get(fullScope);
          if (delegators) {
            var len = delegators.length;
            for (var i = 0; i < len; ++i) {
              delegators[i].updateOrigin(elm);
            }
          }
        }
        if (oldFullScope && !fullScope) {
          self.elementsByFullScope.delete(fullScope);
        }
      },
      update: function update(oldVNode, vNode) {
        var _a = oldVNode.data,
            oldData = _a === void 0 ? {} : _a;
        var elm = vNode.elm,
            _b = vNode.data,
            data = _b === void 0 ? {} : _b;
        var oldFullScope = oldData.isolate || '';
        var fullScope = data.isolate || '';
        // Same element, but different scope, so update the data structures
        if (fullScope && fullScope !== oldFullScope) {
          if (oldFullScope) {
            self.elementsByFullScope.delete(oldFullScope);
          }
          self.elementsByFullScope.set(fullScope, elm);
          var delegators = self.delegatorsByFullScope.get(oldFullScope);
          if (delegators) {
            self.delegatorsByFullScope.delete(oldFullScope);
            self.delegatorsByFullScope.set(fullScope, delegators);
          }
        }
        // Same element, but lost the scope, so update the data structures
        if (oldFullScope && !fullScope) {
          self.elementsByFullScope.delete(oldFullScope);
          self.delegatorsByFullScope.delete(oldFullScope);
        }
      },
      destroy: function destroy(vNode) {
        self.vnodesBeingRemoved.push(vNode);
      },
      remove: function remove(vNode, cb) {
        self.vnodesBeingRemoved.push(vNode);
        cb();
      },
      post: function post() {
        var vnodesBeingRemoved = self.vnodesBeingRemoved;
        for (var i = vnodesBeingRemoved.length - 1; i >= 0; i--) {
          self.cleanupVNode(vnodesBeingRemoved[i]);
        }
        self.vnodesBeingRemoved = [];
        self.fullScopesBeingUpdated = [];
      }
    };
  };
  return IsolateModule;
}();
exports.IsolateModule = IsolateModule;
//# sourceMappingURL=IsolateModule.js.map
},{}],100:[function(require,module,exports) {
'use strict';

module.exports = function () {
	var map, iterator, result;
	if (typeof Map !== 'function') return false;
	try {
		// WebKit doesn't support arguments and crashes
		map = new Map([['raz', 'one'], ['dwa', 'two'], ['trzy', 'three']]);
	} catch (e) {
		return false;
	}
	if (String(map) !== '[object Map]') return false;
	if (map.size !== 3) return false;
	if (typeof map.clear !== 'function') return false;
	if (typeof map.delete !== 'function') return false;
	if (typeof map.entries !== 'function') return false;
	if (typeof map.forEach !== 'function') return false;
	if (typeof map.get !== 'function') return false;
	if (typeof map.has !== 'function') return false;
	if (typeof map.keys !== 'function') return false;
	if (typeof map.set !== 'function') return false;
	if (typeof map.values !== 'function') return false;

	iterator = map.entries();
	result = iterator.next();
	if (result.done !== false) return false;
	if (!result.value) return false;
	if (result.value[0] !== 'raz') return false;
	if (result.value[1] !== 'one') return false;

	return true;
};

},{}],109:[function(require,module,exports) {
/* eslint strict: "off" */

module.exports = (function () {
	return this;
}());

},{}],131:[function(require,module,exports) {
"use strict";

// eslint-disable-next-line no-empty-function
module.exports = function () {};

},{}],128:[function(require,module,exports) {
"use strict";

var _undefined = require("../function/noop")(); // Support ES3 engines

module.exports = function (val) {
 return (val !== _undefined) && (val !== null);
};

},{"../function/noop":131}],123:[function(require,module,exports) {
"use strict";

var isValue = require("./is-value");

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};

},{"./is-value":128}],133:[function(require,module,exports) {
// Inspired by Google Closure:
// http://closure-library.googlecode.com/svn/docs/
// closure_goog_array_array.js.html#goog.array.clear

"use strict";

var value = require("../../object/valid-value");

module.exports = function () {
	value(this).length = 0;
	return this;
};

},{"../../object/valid-value":123}],144:[function(require,module,exports) {
"use strict";

module.exports = function () {
	var numberIsNaN = Number.isNaN;
	if (typeof numberIsNaN !== "function") return false;
	return !numberIsNaN({}) && numberIsNaN(NaN) && !numberIsNaN(34);
};

},{}],145:[function(require,module,exports) {
"use strict";

module.exports = function (value) {
	// eslint-disable-next-line no-self-compare
	return value !== value;
};

},{}],141:[function(require,module,exports) {
"use strict";

module.exports = require("./is-implemented")()
	? Number.isNaN
	: require("./shim");

},{"./is-implemented":144,"./shim":145}],151:[function(require,module,exports) {
"use strict";

module.exports = function () {
	var sign = Math.sign;
	if (typeof sign !== "function") return false;
	return (sign(10) === 1) && (sign(-20) === -1);
};

},{}],152:[function(require,module,exports) {
"use strict";

module.exports = function (value) {
	value = Number(value);
	if (isNaN(value) || (value === 0)) return value;
	return value > 0 ? 1 : -1;
};

},{}],148:[function(require,module,exports) {
"use strict";

module.exports = require("./is-implemented")()
	? Math.sign
	: require("./shim");

},{"./is-implemented":151,"./shim":152}],140:[function(require,module,exports) {
"use strict";

var sign = require("../math/sign")

  , abs = Math.abs, floor = Math.floor;

module.exports = function (value) {
	if (isNaN(value)) return 0;
	value = Number(value);
	if ((value === 0) || !isFinite(value)) return value;
	return sign(value) * floor(abs(value));
};

},{"../math/sign":148}],137:[function(require,module,exports) {
"use strict";

var toInteger = require("./to-integer")

  , max = Math.max;

module.exports = function (value) {
 return max(0, toInteger(value));
};

},{"./to-integer":140}],134:[function(require,module,exports) {
"use strict";

var numberIsNaN       = require("../../number/is-nan")
  , toPosInt          = require("../../number/to-pos-integer")
  , value             = require("../../object/valid-value")
  , indexOf           = Array.prototype.indexOf
  , objHasOwnProperty = Object.prototype.hasOwnProperty
  , abs               = Math.abs
  , floor             = Math.floor;

module.exports = function (searchElement /*, fromIndex*/) {
	var i, length, fromIndex, val;
	if (!numberIsNaN(searchElement)) return indexOf.apply(this, arguments);

	length = toPosInt(value(this).length);
	fromIndex = arguments[1];
	if (isNaN(fromIndex)) fromIndex = 0;
	else if (fromIndex >= 0) fromIndex = floor(fromIndex);
	else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));

	for (i = fromIndex; i < length; ++i) {
		if (objHasOwnProperty.call(this, i)) {
			val = this[i];
			if (numberIsNaN(val)) return i; // Jslint: ignore
		}
	}
	return -1;
};

},{"../../number/is-nan":141,"../../number/to-pos-integer":137,"../../object/valid-value":123}],136:[function(require,module,exports) {
"use strict";

var create = Object.create, getPrototypeOf = Object.getPrototypeOf, plainObject = {};

module.exports = function (/* CustomCreate*/) {
	var setPrototypeOf = Object.setPrototypeOf, customCreate = arguments[0] || create;
	if (typeof setPrototypeOf !== "function") return false;
	return getPrototypeOf(setPrototypeOf(customCreate(null), plainObject)) === plainObject;
};

},{}],138:[function(require,module,exports) {
"use strict";

var isValue = require("./is-value");

var map = { function: true, object: true };

module.exports = function (value) {
	return (isValue(value) && map[typeof value]) || false;
};

},{"./is-value":128}],139:[function(require,module,exports) {
// Workaround for http://code.google.com/p/v8/issues/detail?id=2804

"use strict";

var create = Object.create, shim;

if (!require("./set-prototype-of/is-implemented")()) {
	shim = require("./set-prototype-of/shim");
}

module.exports = (function () {
	var nullObject, polyProps, desc;
	if (!shim) return create;
	if (shim.level !== 1) return create;

	nullObject = {};
	polyProps = {};
	desc = {
		configurable: false,
		enumerable: false,
		writable: true,
		value: undefined
	};
	Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
		if (name === "__proto__") {
			polyProps[name] = {
				configurable: true,
				enumerable: false,
				writable: true,
				value: undefined
			};
			return;
		}
		polyProps[name] = desc;
	});
	Object.defineProperties(nullObject, polyProps);

	Object.defineProperty(shim, "nullPolyfill", {
		configurable: false,
		enumerable: false,
		writable: false,
		value: nullObject
	});

	return function (prototype, props) {
		return create(prototype === null ? nullObject : prototype, props);
	};
}());

},{"./set-prototype-of/is-implemented":136,"./set-prototype-of/shim":135}],135:[function(require,module,exports) {
/* eslint no-proto: "off" */

// Big thanks to @WebReflection for sorting this out
// https://gist.github.com/WebReflection/5593554

"use strict";

var isObject        = require("../is-object")
  , value           = require("../valid-value")
  , objIsPrototypeOf = Object.prototype.isPrototypeOf
  , defineProperty  = Object.defineProperty
  , nullDesc        = {
	configurable: true,
	enumerable: false,
	writable: true,
	value: undefined
}
  , validate;

validate = function (obj, prototype) {
	value(obj);
	if (prototype === null || isObject(prototype)) return obj;
	throw new TypeError("Prototype must be null or an object");
};

module.exports = (function (status) {
	var fn, set;
	if (!status) return null;
	if (status.level === 2) {
		if (status.set) {
			set = status.set;
			fn = function (obj, prototype) {
				set.call(validate(obj, prototype), prototype);
				return obj;
			};
		} else {
			fn = function (obj, prototype) {
				validate(obj, prototype).__proto__ = prototype;
				return obj;
			};
		}
	} else {
		fn = function self(obj, prototype) {
			var isNullBase;
			validate(obj, prototype);
			isNullBase = objIsPrototypeOf.call(self.nullPolyfill, obj);
			if (isNullBase) delete self.nullPolyfill.__proto__;
			if (prototype === null) prototype = self.nullPolyfill;
			obj.__proto__ = prototype;
			if (isNullBase) defineProperty(self.nullPolyfill, "__proto__", nullDesc);
			return obj;
		};
	}
	return Object.defineProperty(fn, "level", {
		configurable: false,
		enumerable: false,
		writable: false,
		value: status.level
	});
}(
	(function () {
		var tmpObj1 = Object.create(null)
		  , tmpObj2 = {}
		  , set
		  , desc = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__");

		if (desc) {
			try {
				set = desc.set; // Opera crashes at this point
				set.call(tmpObj1, tmpObj2);
			} catch (ignore) {}
			if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { set: set, level: 2 };
		}

		tmpObj1.__proto__ = tmpObj2;
		if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { level: 2 };

		tmpObj1 = {};
		tmpObj1.__proto__ = tmpObj2;
		if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { level: 1 };

		return false;
	})()
));

require("../create");

},{"../is-object":138,"../valid-value":123,"../create":139}],130:[function(require,module,exports) {
"use strict";

module.exports = require("./is-implemented")()
	? Object.setPrototypeOf
	: require("./shim");

},{"./is-implemented":136,"./shim":135}],124:[function(require,module,exports) {
"use strict";

module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};

},{}],153:[function(require,module,exports) {
"use strict";

module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return (obj.foo + obj.bar + obj.trzy) === "razdwatrzy";
};

},{}],162:[function(require,module,exports) {
"use strict";

module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
 return false;
}
};

},{}],163:[function(require,module,exports) {
"use strict";

var isValue = require("../is-value");

var keys = Object.keys;

module.exports = function (object) {
	return keys(isValue(object) ? Object(object) : object);
};

},{"../is-value":128}],157:[function(require,module,exports) {
"use strict";

module.exports = require("./is-implemented")()
	? Object.keys
	: require("./shim");

},{"./is-implemented":162,"./shim":163}],154:[function(require,module,exports) {
"use strict";

var keys  = require("../keys")
  , value = require("../valid-value")
  , max   = Math.max;

module.exports = function (dest, src /*, …srcn*/) {
	var error, i, length = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

},{"../keys":157,"../valid-value":123}],149:[function(require,module,exports) {
"use strict";

module.exports = require("./is-implemented")()
	? Object.assign
	: require("./shim");

},{"./is-implemented":153,"./shim":154}],142:[function(require,module,exports) {

"use strict";

var isValue = require("./is-value");

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1 /*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};

},{"./is-value":128}],143:[function(require,module,exports) {
// Deprecated

"use strict";

module.exports = function (obj) {
 return typeof obj === "function";
};

},{}],158:[function(require,module,exports) {
"use strict";

var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return (str.contains("dwa") === true) && (str.contains("foo") === false);
};

},{}],159:[function(require,module,exports) {
"use strict";

var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

},{}],155:[function(require,module,exports) {
"use strict";

module.exports = require("./is-implemented")()
	? String.prototype.contains
	: require("./shim");

},{"./is-implemented":158,"./shim":159}],107:[function(require,module,exports) {
'use strict';

var assign        = require('es5-ext/object/assign')
  , normalizeOpts = require('es5-ext/object/normalize-options')
  , isCallable    = require('es5-ext/object/is-callable')
  , contains      = require('es5-ext/string/#/contains')

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

},{"es5-ext/object/assign":149,"es5-ext/object/normalize-options":142,"es5-ext/object/is-callable":143,"es5-ext/string/#/contains":155}],106:[function(require,module,exports) {
'use strict';

var d        = require('d')
  , callable = require('es5-ext/object/valid-callable')

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;
	else if (typeof data[type] === 'object') data[type].push(listener);
	else data[type] = [data[type], listener];

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}
			apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;

},{"d":107,"es5-ext/object/valid-callable":124}],110:[function(require,module,exports) {
'use strict';

var validTypes = { object: true, symbol: true };

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try { String(symbol); } catch (e) { return false; }

	// Return 'true' also for polyfills
	if (!validTypes[typeof Symbol.iterator]) return false;
	if (!validTypes[typeof Symbol.toPrimitive]) return false;
	if (!validTypes[typeof Symbol.toStringTag]) return false;

	return true;
};

},{}],127:[function(require,module,exports) {
'use strict';

module.exports = function (x) {
	if (!x) return false;
	if (typeof x === 'symbol') return true;
	if (!x.constructor) return false;
	if (x.constructor.name !== 'Symbol') return false;
	return (x[x.constructor.toStringTag] === 'Symbol');
};

},{}],122:[function(require,module,exports) {
'use strict';

var isSymbol = require('./is-symbol');

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};

},{"./is-symbol":127}],111:[function(require,module,exports) {
// ES2015 Symbol polyfill for environments that do not (or partially) support it

'use strict';

var d              = require('d')
  , validateSymbol = require('./validate-symbol')

  , create = Object.create, defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
  , isNativeSafe;

if (typeof Symbol === 'function') {
	NativeSymbol = Symbol;
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
}

var generateName = (function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0, name, ie11BugWorkaround;
		while (created[desc + (postfix || '')]) ++postfix;
		desc += (postfix || '');
		created[desc] = true;
		name = '@@' + desc;
		defineProperty(objPrototype, name, d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		}));
		return name;
	};
}());

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError('Symbol is not a constructor');
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError('Symbol is not a constructor');
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};
defineProperties(SymbolPolyfill, {
	for: d(function (key) {
		if (globalSymbols[key]) return globalSymbols[key];
		return (globalSymbols[key] = SymbolPolyfill(String(key)));
	}),
	keyFor: d(function (s) {
		var key;
		validateSymbol(s);
		for (key in globalSymbols) if (globalSymbols[key] === s) return key;
	}),

	// To ensure proper interoperability with other native functions (e.g. Array.from)
	// fallback to eventual native implementation of given symbol
	hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
	isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
		SymbolPolyfill('isConcatSpreadable')),
	iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
	match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
	replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
	search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
	species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
	split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
	toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
	toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
	unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
});

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d('', function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
	var symbol = validateSymbol(this);
	if (typeof symbol === 'symbol') return symbol;
	return symbol.toString();
}));
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));

},{"d":107,"./validate-symbol":122}],108:[function(require,module,exports) {
'use strict';

module.exports = require('./is-implemented')() ? Symbol : require('./polyfill');

},{"./is-implemented":110,"./polyfill":111}],146:[function(require,module,exports) {
"use strict";

var objToString = Object.prototype.toString
  , id = objToString.call(
	(function () {
		return arguments;
	})()
);

module.exports = function (value) {
	return objToString.call(value) === id;
};

},{}],147:[function(require,module,exports) {
"use strict";

var objToString = Object.prototype.toString, id = objToString.call("");

module.exports = function (value) {
	return (
		typeof value === "string" ||
		(value &&
			typeof value === "object" &&
			(value instanceof String || objToString.call(value) === id)) ||
		false
	);
};

},{}],116:[function(require,module,exports) {
"use strict";

var isArguments = require("es5-ext/function/is-arguments")
  , isValue     = require("es5-ext/object/is-value")
  , isString    = require("es5-ext/string/is-string");

var iteratorSymbol = require("es6-symbol").iterator
  , isArray        = Array.isArray;

module.exports = function (value) {
	if (!isValue(value)) return false;
	if (isArray(value)) return true;
	if (isString(value)) return true;
	if (isArguments(value)) return true;
	return typeof value[iteratorSymbol] === "function";
};

},{"es5-ext/function/is-arguments":146,"es5-ext/object/is-value":128,"es5-ext/string/is-string":147,"es6-symbol":108}],113:[function(require,module,exports) {
"use strict";

var isIterable = require("./is-iterable");

module.exports = function (value) {
	if (!isIterable(value)) throw new TypeError(value + " is not iterable");
	return value;
};

},{"./is-iterable":116}],185:[function(require,module,exports) {
"use strict";

module.exports = function () {
	var from = Array.from, arr, result;
	if (typeof from !== "function") return false;
	arr = ["raz", "dwa"];
	result = from(arr);
	return Boolean(result && (result !== arr) && (result[1] === "dwa"));
};

},{}],187:[function(require,module,exports) {
"use strict";

var objToString = Object.prototype.toString, id = objToString.call(require("./noop"));

module.exports = function (value) {
	return typeof value === "function" && objToString.call(value) === id;
};

},{"./noop":131}],186:[function(require,module,exports) {
"use strict";

var iteratorSymbol = require("es6-symbol").iterator
  , isArguments    = require("../../function/is-arguments")
  , isFunction     = require("../../function/is-function")
  , toPosInt       = require("../../number/to-pos-integer")
  , callable       = require("../../object/valid-callable")
  , validValue     = require("../../object/valid-value")
  , isValue        = require("../../object/is-value")
  , isString       = require("../../string/is-string")
  , isArray        = Array.isArray
  , call           = Function.prototype.call
  , desc           = { configurable: true, enumerable: true, writable: true, value: null }
  , defineProperty = Object.defineProperty;

// eslint-disable-next-line complexity
module.exports = function (arrayLike /*, mapFn, thisArg*/) {
	var mapFn = arguments[1]
	  , thisArg = arguments[2]
	  , Context
	  , i
	  , j
	  , arr
	  , length
	  , code
	  , iterator
	  , result
	  , getIterator
	  , value;

	arrayLike = Object(validValue(arrayLike));

	if (isValue(mapFn)) callable(mapFn);
	if (!this || this === Array || !isFunction(this)) {
		// Result: Plain array
		if (!mapFn) {
			if (isArguments(arrayLike)) {
				// Source: Arguments
				length = arrayLike.length;
				if (length !== 1) return Array.apply(null, arrayLike);
				arr = new Array(1);
				arr[0] = arrayLike[0];
				return arr;
			}
			if (isArray(arrayLike)) {
				// Source: Array
				arr = new Array(length = arrayLike.length);
				for (i = 0; i < length; ++i) arr[i] = arrayLike[i];
				return arr;
			}
		}
		arr = [];
	} else {
		// Result: Non plain array
		Context = this;
	}

	if (!isArray(arrayLike)) {
		if ((getIterator = arrayLike[iteratorSymbol]) !== undefined) {
			// Source: Iterator
			iterator = callable(getIterator).call(arrayLike);
			if (Context) arr = new Context();
			result = iterator.next();
			i = 0;
			while (!result.done) {
				value = mapFn ? call.call(mapFn, thisArg, result.value, i) : result.value;
				if (Context) {
					desc.value = value;
					defineProperty(arr, i, desc);
				} else {
					arr[i] = value;
				}
				result = iterator.next();
				++i;
			}
			length = i;
		} else if (isString(arrayLike)) {
			// Source: String
			length = arrayLike.length;
			if (Context) arr = new Context();
			for (i = 0, j = 0; i < length; ++i) {
				value = arrayLike[i];
				if (i + 1 < length) {
					code = value.charCodeAt(0);
					// eslint-disable-next-line max-depth
					if (code >= 0xd800 && code <= 0xdbff) value += arrayLike[++i];
				}
				value = mapFn ? call.call(mapFn, thisArg, value, j) : value;
				if (Context) {
					desc.value = value;
					defineProperty(arr, j, desc);
				} else {
					arr[j] = value;
				}
				++j;
			}
			length = j;
		}
	}
	if (length === undefined) {
		// Source: array or array-like
		length = toPosInt(arrayLike.length);
		if (Context) arr = new Context(length);
		for (i = 0; i < length; ++i) {
			value = mapFn ? call.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];
			if (Context) {
				desc.value = value;
				defineProperty(arr, i, desc);
			} else {
				arr[i] = value;
			}
		}
	}
	if (Context) {
		desc.value = null;
		arr.length = length;
	}
	return arr;
};

},{"es6-symbol":108,"../../function/is-arguments":146,"../../function/is-function":187,"../../number/to-pos-integer":137,"../../object/valid-callable":124,"../../object/valid-value":123,"../../object/is-value":128,"../../string/is-string":147}],180:[function(require,module,exports) {
"use strict";

module.exports = require("./is-implemented")()
	? Array.from
	: require("./shim");

},{"./is-implemented":185,"./shim":186}],165:[function(require,module,exports) {
"use strict";

var aFrom  = require("../array/from")
  , assign = require("./assign")
  , value  = require("./valid-value");

module.exports = function (obj/*, propertyNames, options*/) {
	var copy = Object(value(obj)), propertyNames = arguments[1], options = Object(arguments[2]);
	if (copy !== obj && !propertyNames) return copy;
	var result = {};
	if (propertyNames) {
		aFrom(propertyNames, function (propertyName) {
			if (options.ensure || propertyName in obj) result[propertyName] = obj[propertyName];
		});
	} else {
		assign(result, obj);
	}
	return result;
};

},{"../array/from":180,"./assign":149,"./valid-value":123}],174:[function(require,module,exports) {
// Internal method, used by iteration functions.
// Calls a function for each key-value pair found in object
// Optionally takes compareFn to iterate object in specific order

"use strict";

var callable                = require("./valid-callable")
  , value                   = require("./valid-value")
  , bind                    = Function.prototype.bind
  , call                    = Function.prototype.call
  , keys                    = Object.keys
  , objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (method, defVal) {
	return function (obj, cb /*, thisArg, compareFn*/) {
		var list, thisArg = arguments[2], compareFn = arguments[3];
		obj = Object(value(obj));
		callable(cb);

		list = keys(obj);
		if (compareFn) {
			list.sort(typeof compareFn === "function" ? bind.call(compareFn, obj) : undefined);
		}
		if (typeof method !== "function") method = list[method];
		return call.call(method, list, function (key, index) {
			if (!objPropertyIsEnumerable.call(obj, key)) return defVal;
			return call.call(cb, thisArg, obj[key], key, obj, index);
		});
	};
};

},{"./valid-callable":124,"./valid-value":123}],168:[function(require,module,exports) {
"use strict";

module.exports = require("./_iterate")("forEach");

},{"./_iterate":174}],166:[function(require,module,exports) {
"use strict";

var callable = require("./valid-callable")
  , forEach  = require("./for-each")
  , call     = Function.prototype.call;

module.exports = function (obj, cb /*, thisArg*/) {
	var result = {}, thisArg = arguments[2];
	callable(cb);
	forEach(obj, function (value, key, targetObj, index) {
		result[key] = call.call(cb, thisArg, value, key, targetObj, index);
	});
	return result;
};

},{"./valid-callable":124,"./for-each":168}],150:[function(require,module,exports) {
'use strict';

var copy             = require('es5-ext/object/copy')
  , normalizeOptions = require('es5-ext/object/normalize-options')
  , ensureCallable   = require('es5-ext/object/valid-callable')
  , map              = require('es5-ext/object/map')
  , callable         = require('es5-ext/object/valid-callable')
  , validValue       = require('es5-ext/object/valid-value')

  , bind = Function.prototype.bind, defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , define;

define = function (name, desc, options) {
	var value = validValue(desc) && callable(desc.value), dgs;
	dgs = copy(desc);
	delete dgs.writable;
	delete dgs.value;
	dgs.get = function () {
		if (!options.overwriteDefinition && hasOwnProperty.call(this, name)) return value;
		desc.value = bind.call(value, options.resolveContext ? options.resolveContext(this) : this);
		defineProperty(this, name, desc);
		return this[name];
	};
	return dgs;
};

module.exports = function (props/*, options*/) {
	var options = normalizeOptions(arguments[1]);
	if (options.resolveContext != null) ensureCallable(options.resolveContext);
	return map(props, function (desc, name) { return define(name, desc, options); });
};

},{"es5-ext/object/copy":165,"es5-ext/object/normalize-options":142,"es5-ext/object/valid-callable":124,"es5-ext/object/map":166,"es5-ext/object/valid-value":123}],129:[function(require,module,exports) {
"use strict";

var clear    = require("es5-ext/array/#/clear")
  , assign   = require("es5-ext/object/assign")
  , callable = require("es5-ext/object/valid-callable")
  , value    = require("es5-ext/object/valid-value")
  , d        = require("d")
  , autoBind = require("d/auto-bind")
  , Symbol   = require("es6-symbol");

var defineProperty = Object.defineProperty, defineProperties = Object.defineProperties, Iterator;

module.exports = Iterator = function (list, context) {
	if (!(this instanceof Iterator)) throw new TypeError("Constructor requires 'new'");
	defineProperties(this, {
		__list__: d("w", value(list)),
		__context__: d("w", context),
		__nextIndex__: d("w", 0)
	});
	if (!context) return;
	callable(context.on);
	context.on("_add", this._onAdd);
	context.on("_delete", this._onDelete);
	context.on("_clear", this._onClear);
};

// Internal %IteratorPrototype% doesn't expose its constructor
delete Iterator.prototype.constructor;

defineProperties(
	Iterator.prototype,
	assign(
		{
			_next: d(function () {
				var i;
				if (!this.__list__) return undefined;
				if (this.__redo__) {
					i = this.__redo__.shift();
					if (i !== undefined) return i;
				}
				if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
				this._unBind();
				return undefined;
			}),
			next: d(function () {
				return this._createResult(this._next());
			}),
			_createResult: d(function (i) {
				if (i === undefined) return { done: true, value: undefined };
				return { done: false, value: this._resolve(i) };
			}),
			_resolve: d(function (i) {
				return this.__list__[i];
			}),
			_unBind: d(function () {
				this.__list__ = null;
				delete this.__redo__;
				if (!this.__context__) return;
				this.__context__.off("_add", this._onAdd);
				this.__context__.off("_delete", this._onDelete);
				this.__context__.off("_clear", this._onClear);
				this.__context__ = null;
			}),
			toString: d(function () {
				return "[object " + (this[Symbol.toStringTag] || "Object") + "]";
			})
		},
		autoBind({
			_onAdd: d(function (index) {
				if (index >= this.__nextIndex__) return;
				++this.__nextIndex__;
				if (!this.__redo__) {
					defineProperty(this, "__redo__", d("c", [index]));
					return;
				}
				this.__redo__.forEach(function (redo, i) {
					if (redo >= index) this.__redo__[i] = ++redo;
				}, this);
				this.__redo__.push(index);
			}),
			_onDelete: d(function (index) {
				var i;
				if (index >= this.__nextIndex__) return;
				--this.__nextIndex__;
				if (!this.__redo__) return;
				i = this.__redo__.indexOf(index);
				if (i !== -1) this.__redo__.splice(i, 1);
				this.__redo__.forEach(function (redo, j) {
					if (redo > index) this.__redo__[j] = --redo;
				}, this);
			}),
			_onClear: d(function () {
				if (this.__redo__) clear.call(this.__redo__);
				this.__nextIndex__ = 0;
			})
		})
	)
);

defineProperty(
	Iterator.prototype,
	Symbol.iterator,
	d(function () {
		return this;
	})
);

},{"es5-ext/array/#/clear":133,"es5-ext/object/assign":149,"es5-ext/object/valid-callable":124,"es5-ext/object/valid-value":123,"d":107,"d/auto-bind":150,"es6-symbol":108}],125:[function(require,module,exports) {
"use strict";

var setPrototypeOf = require("es5-ext/object/set-prototype-of")
  , contains       = require("es5-ext/string/#/contains")
  , d              = require("d")
  , Symbol         = require("es6-symbol")
  , Iterator       = require("./");

var defineProperty = Object.defineProperty, ArrayIterator;

ArrayIterator = module.exports = function (arr, kind) {
	if (!(this instanceof ArrayIterator)) throw new TypeError("Constructor requires 'new'");
	Iterator.call(this, arr);
	if (!kind) kind = "value";
	else if (contains.call(kind, "key+value")) kind = "key+value";
	else if (contains.call(kind, "key")) kind = "key";
	else kind = "value";
	defineProperty(this, "__kind__", d("", kind));
};
if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);

// Internal %ArrayIteratorPrototype% doesn't expose its constructor
delete ArrayIterator.prototype.constructor;

ArrayIterator.prototype = Object.create(Iterator.prototype, {
	_resolve: d(function (i) {
		if (this.__kind__ === "value") return this.__list__[i];
		if (this.__kind__ === "key+value") return [i, this.__list__[i]];
		return i;
	})
});
defineProperty(ArrayIterator.prototype, Symbol.toStringTag, d("c", "Array Iterator"));

},{"es5-ext/object/set-prototype-of":130,"es5-ext/string/#/contains":155,"d":107,"es6-symbol":108,"./":129}],126:[function(require,module,exports) {
// Thanks @mathiasbynens
// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols

"use strict";

var setPrototypeOf = require("es5-ext/object/set-prototype-of")
  , d              = require("d")
  , Symbol         = require("es6-symbol")
  , Iterator       = require("./");

var defineProperty = Object.defineProperty, StringIterator;

StringIterator = module.exports = function (str) {
	if (!(this instanceof StringIterator)) throw new TypeError("Constructor requires 'new'");
	str = String(str);
	Iterator.call(this, str);
	defineProperty(this, "__length__", d("", str.length));
};
if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);

// Internal %ArrayIteratorPrototype% doesn't expose its constructor
delete StringIterator.prototype.constructor;

StringIterator.prototype = Object.create(Iterator.prototype, {
	_next: d(function () {
		if (!this.__list__) return undefined;
		if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
		this._unBind();
		return undefined;
	}),
	_resolve: d(function (i) {
		var char = this.__list__[i], code;
		if (this.__nextIndex__ === this.__length__) return char;
		code = char.charCodeAt(0);
		if (code >= 0xd800 && code <= 0xdbff) return char + this.__list__[this.__nextIndex__++];
		return char;
	})
});
defineProperty(StringIterator.prototype, Symbol.toStringTag, d("c", "String Iterator"));

},{"es5-ext/object/set-prototype-of":130,"d":107,"es6-symbol":108,"./":129}],115:[function(require,module,exports) {
"use strict";

var isArguments    = require("es5-ext/function/is-arguments")
  , isString       = require("es5-ext/string/is-string")
  , ArrayIterator  = require("./array")
  , StringIterator = require("./string")
  , iterable       = require("./valid-iterable")
  , iteratorSymbol = require("es6-symbol").iterator;

module.exports = function (obj) {
	if (typeof iterable(obj)[iteratorSymbol] === "function") return obj[iteratorSymbol]();
	if (isArguments(obj)) return new ArrayIterator(obj);
	if (isString(obj)) return new StringIterator(obj);
	return new ArrayIterator(obj);
};

},{"es5-ext/function/is-arguments":146,"es5-ext/string/is-string":147,"./array":125,"./string":126,"./valid-iterable":113,"es6-symbol":108}],112:[function(require,module,exports) {
"use strict";

var isArguments = require("es5-ext/function/is-arguments")
  , callable    = require("es5-ext/object/valid-callable")
  , isString    = require("es5-ext/string/is-string")
  , get         = require("./get");

var isArray = Array.isArray, call = Function.prototype.call, some = Array.prototype.some;

module.exports = function (iterable, cb /*, thisArg*/) {
	var mode, thisArg = arguments[2], result, doBreak, broken, i, length, char, code;
	if (isArray(iterable) || isArguments(iterable)) mode = "array";
	else if (isString(iterable)) mode = "string";
	else iterable = get(iterable);

	callable(cb);
	doBreak = function () {
		broken = true;
	};
	if (mode === "array") {
		some.call(iterable, function (value) {
			call.call(cb, thisArg, value, doBreak);
			return broken;
		});
		return;
	}
	if (mode === "string") {
		length = iterable.length;
		for (i = 0; i < length; ++i) {
			char = iterable[i];
			if (i + 1 < length) {
				code = char.charCodeAt(0);
				if (code >= 0xd800 && code <= 0xdbff) char += iterable[++i];
			}
			call.call(cb, thisArg, char, doBreak);
			if (broken) break;
		}
		return;
	}
	result = iterable.next();

	while (!result.done) {
		call.call(cb, thisArg, result.value, doBreak);
		if (broken) return;
		result = iterable.next();
	}
};

},{"es5-ext/function/is-arguments":146,"es5-ext/object/valid-callable":124,"es5-ext/string/is-string":147,"./get":115}],156:[function(require,module,exports) {
"use strict";

var forEach = Array.prototype.forEach, create = Object.create;

// eslint-disable-next-line no-unused-vars
module.exports = function (arg /*, …args*/) {
	var set = create(null);
	forEach.call(arguments, function (name) {
		set[name] = true;
	});
	return set;
};

},{}],104:[function(require,module,exports) {
'use strict';

module.exports = require('es5-ext/object/primitive-set')('key',
	'value', 'key+value');

},{"es5-ext/object/primitive-set":156}],103:[function(require,module,exports) {
'use strict';

var setPrototypeOf    = require('es5-ext/object/set-prototype-of')
  , d                 = require('d')
  , Iterator          = require('es6-iterator')
  , toStringTagSymbol = require('es6-symbol').toStringTag
  , kinds             = require('./iterator-kinds')

  , defineProperties = Object.defineProperties
  , unBind = Iterator.prototype._unBind
  , MapIterator;

MapIterator = module.exports = function (map, kind) {
	if (!(this instanceof MapIterator)) return new MapIterator(map, kind);
	Iterator.call(this, map.__mapKeysData__, map);
	if (!kind || !kinds[kind]) kind = 'key+value';
	defineProperties(this, {
		__kind__: d('', kind),
		__values__: d('w', map.__mapValuesData__)
	});
};
if (setPrototypeOf) setPrototypeOf(MapIterator, Iterator);

MapIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(MapIterator),
	_resolve: d(function (i) {
		if (this.__kind__ === 'value') return this.__values__[i];
		if (this.__kind__ === 'key') return this.__list__[i];
		return [this.__list__[i], this.__values__[i]];
	}),
	_unBind: d(function () {
		this.__values__ = null;
		unBind.call(this);
	}),
	toString: d(function () { return '[object Map Iterator]'; })
});
Object.defineProperty(MapIterator.prototype, toStringTagSymbol,
	d('c', 'Map Iterator'));

},{"es5-ext/object/set-prototype-of":130,"d":107,"es6-iterator":129,"es6-symbol":108,"./iterator-kinds":104}],102:[function(require,module,exports) {
// Exports true if environment provides native `Map` implementation,
// whatever that is.

'use strict';

module.exports = (function () {
	if (typeof Map === 'undefined') return false;
	return (Object.prototype.toString.call(new Map()) === '[object Map]');
}());

},{}],101:[function(require,module,exports) {
'use strict';

var clear          = require('es5-ext/array/#/clear')
  , eIndexOf       = require('es5-ext/array/#/e-index-of')
  , setPrototypeOf = require('es5-ext/object/set-prototype-of')
  , callable       = require('es5-ext/object/valid-callable')
  , validValue     = require('es5-ext/object/valid-value')
  , d              = require('d')
  , ee             = require('event-emitter')
  , Symbol         = require('es6-symbol')
  , iterator       = require('es6-iterator/valid-iterable')
  , forOf          = require('es6-iterator/for-of')
  , Iterator       = require('./lib/iterator')
  , isNative       = require('./is-native-implemented')

  , call = Function.prototype.call
  , defineProperties = Object.defineProperties, getPrototypeOf = Object.getPrototypeOf
  , MapPoly;

module.exports = MapPoly = function (/*iterable*/) {
	var iterable = arguments[0], keys, values, self;
	if (!(this instanceof MapPoly)) throw new TypeError('Constructor requires \'new\'');
	if (isNative && setPrototypeOf && (Map !== MapPoly)) {
		self = setPrototypeOf(new Map(), getPrototypeOf(this));
	} else {
		self = this;
	}
	if (iterable != null) iterator(iterable);
	defineProperties(self, {
		__mapKeysData__: d('c', keys = []),
		__mapValuesData__: d('c', values = [])
	});
	if (!iterable) return self;
	forOf(iterable, function (value) {
		var key = validValue(value)[0];
		value = value[1];
		if (eIndexOf.call(keys, key) !== -1) return;
		keys.push(key);
		values.push(value);
	}, self);
	return self;
};

if (isNative) {
	if (setPrototypeOf) setPrototypeOf(MapPoly, Map);
	MapPoly.prototype = Object.create(Map.prototype, {
		constructor: d(MapPoly)
	});
}

ee(defineProperties(MapPoly.prototype, {
	clear: d(function () {
		if (!this.__mapKeysData__.length) return;
		clear.call(this.__mapKeysData__);
		clear.call(this.__mapValuesData__);
		this.emit('_clear');
	}),
	delete: d(function (key) {
		var index = eIndexOf.call(this.__mapKeysData__, key);
		if (index === -1) return false;
		this.__mapKeysData__.splice(index, 1);
		this.__mapValuesData__.splice(index, 1);
		this.emit('_delete', index, key);
		return true;
	}),
	entries: d(function () { return new Iterator(this, 'key+value'); }),
	forEach: d(function (cb/*, thisArg*/) {
		var thisArg = arguments[1], iterator, result;
		callable(cb);
		iterator = this.entries();
		result = iterator._next();
		while (result !== undefined) {
			call.call(cb, thisArg, this.__mapValuesData__[result],
				this.__mapKeysData__[result], this);
			result = iterator._next();
		}
	}),
	get: d(function (key) {
		var index = eIndexOf.call(this.__mapKeysData__, key);
		if (index === -1) return;
		return this.__mapValuesData__[index];
	}),
	has: d(function (key) {
		return (eIndexOf.call(this.__mapKeysData__, key) !== -1);
	}),
	keys: d(function () { return new Iterator(this, 'key'); }),
	set: d(function (key, value) {
		var index = eIndexOf.call(this.__mapKeysData__, key), emit;
		if (index === -1) {
			index = this.__mapKeysData__.push(key) - 1;
			emit = true;
		}
		this.__mapValuesData__[index] = value;
		if (emit) this.emit('_add', index, key);
		return this;
	}),
	size: d.gs(function () { return this.__mapKeysData__.length; }),
	values: d(function () { return new Iterator(this, 'value'); }),
	toString: d(function () { return '[object Map]'; })
}));
Object.defineProperty(MapPoly.prototype, Symbol.iterator, d(function () {
	return this.entries();
}));
Object.defineProperty(MapPoly.prototype, Symbol.toStringTag, d('c', 'Map'));

},{"es5-ext/array/#/clear":133,"es5-ext/array/#/e-index-of":134,"es5-ext/object/set-prototype-of":130,"es5-ext/object/valid-callable":124,"es5-ext/object/valid-value":123,"d":107,"event-emitter":106,"es6-symbol":108,"es6-iterator/valid-iterable":113,"es6-iterator/for-of":112,"./lib/iterator":103,"./is-native-implemented":102}],98:[function(require,module,exports) {
'use strict';

if (!require('./is-implemented')()) {
	Object.defineProperty(require('es5-ext/global'), 'Map',
		{ value: require('./polyfill'), configurable: true, enumerable: false,
			writable: true });
}

},{"./is-implemented":100,"es5-ext/global":109,"./polyfill":101}],34:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeDOMDriver = undefined;

var _snabbdom = require("snabbdom");

var _xstream = require("xstream");

var _xstream2 = _interopRequireDefault(_xstream);

var _sampleCombine = require("xstream/extra/sampleCombine");

var _sampleCombine2 = _interopRequireDefault(_sampleCombine);

var _MainDOMSource = require("./MainDOMSource");

var _tovnode = require("snabbdom/tovnode");

var _VNodeWrapper = require("./VNodeWrapper");

var _utils = require("./utils");

var _modules = require("./modules");

var _modules2 = _interopRequireDefault(_modules);

var _IsolateModule = require("./IsolateModule");

require("es6-map/implement");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// tslint:disable-line
function makeDOMDriverInputGuard(modules) {
  if (!Array.isArray(modules)) {
    throw new Error("Optional modules option must be " + "an array for snabbdom modules");
  }
}
function domDriverInputGuard(view$) {
  if (!view$ || typeof view$.addListener !== "function" || typeof view$.fold !== "function") {
    throw new Error("The DOM driver function expects as input a Stream of " + "virtual DOM elements");
  }
}
function dropCompletion(input) {
  return _xstream2.default.merge(input, _xstream2.default.never());
}
function unwrapElementFromVNode(vnode) {
  return vnode.elm;
}
function reportSnabbdomError(err) {
  (console.error || console.log)(err);
}
function makeDOMReady$() {
  return _xstream2.default.create({
    start: function start(lis) {
      if (document.readyState === 'loading') {
        document.addEventListener('readystatechange', function () {
          var state = document.readyState;
          if (state === 'interactive' || state === 'complete') {
            lis.next(null);
            lis.complete();
          }
        });
      } else {
        lis.next(null);
        lis.complete();
      }
    },
    stop: function stop() {}
  });
}
function makeDOMDriver(container, options) {
  if (!options) {
    options = {};
  }
  (0, _utils.checkValidContainer)(container);
  var modules = options.modules || _modules2.default;
  makeDOMDriverInputGuard(modules);
  var isolateModule = new _IsolateModule.IsolateModule();
  var patch = (0, _snabbdom.init)([isolateModule.createModule()].concat(modules));
  var domReady$ = makeDOMReady$();
  var vnodeWrapper;
  var delegators = new Map();
  var mutationObserver;
  var mutationConfirmed$ = _xstream2.default.create({
    start: function start(listener) {
      mutationObserver = new MutationObserver(function () {
        return listener.next(null);
      });
    },
    stop: function stop() {
      mutationObserver.disconnect();
    }
  });
  function DOMDriver(vnode$, name) {
    if (name === void 0) {
      name = 'DOM';
    }
    domDriverInputGuard(vnode$);
    var sanitation$ = _xstream2.default.create();
    var firstRoot$ = domReady$.map(function () {
      var firstRoot = (0, _utils.getValidNode)(container) || document.body;
      vnodeWrapper = new _VNodeWrapper.VNodeWrapper(firstRoot);
      return firstRoot;
    });
    // We need to subscribe to the sink (i.e. vnode$) synchronously inside this
    // driver, and not later in the map().flatten() because this sink is in
    // reality a SinkProxy from @cycle/run, and we don't want to miss the first
    // emission when the main() is connected to the drivers.
    // Read more in issue #739.
    var rememberedVNode$ = vnode$.remember();
    rememberedVNode$.addListener({});
    // The mutation observer internal to mutationConfirmed$ should
    // exist before elementAfterPatch$ calls mutationObserver.observe()
    mutationConfirmed$.addListener({});
    var elementAfterPatch$ = firstRoot$.map(function (firstRoot) {
      return _xstream2.default.merge(rememberedVNode$.endWhen(sanitation$), sanitation$).map(function (vnode) {
        return vnodeWrapper.call(vnode);
      }).fold(patch, (0, _tovnode.toVNode)(firstRoot)).drop(1).map(unwrapElementFromVNode).startWith(firstRoot).map(function (el) {
        mutationObserver.observe(el, {
          childList: true,
          attributes: true,
          characterData: true,
          subtree: true,
          attributeOldValue: true,
          characterDataOldValue: true
        });
        return el;
      }).compose(dropCompletion);
    }).flatten();
    var rootElement$ = mutationConfirmed$.startWith(null).endWhen(sanitation$).compose((0, _sampleCombine2.default)(elementAfterPatch$)).map(function (arr) {
      return arr[1];
    }).remember();
    // Start the snabbdom patching, over time
    rootElement$.addListener({ error: reportSnabbdomError });
    return new _MainDOMSource.MainDOMSource(rootElement$, sanitation$, [], isolateModule, delegators, name);
  }
  return DOMDriver;
}
exports.makeDOMDriver = makeDOMDriver;
//# sourceMappingURL=makeDOMDriver.js.map
},{"snabbdom":70,"xstream":16,"xstream/extra/sampleCombine":94,"./MainDOMSource":32,"snabbdom/tovnode":97,"./VNodeWrapper":42,"./utils":44,"./modules":43,"./IsolateModule":45,"es6-map/implement":98}],33:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MockedDOMSource = undefined;
exports.mockDOMSource = mockDOMSource;

var _xstream = require("xstream");

var _xstream2 = _interopRequireDefault(_xstream);

var _adapt = require("@cycle/run/lib/adapt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SCOPE_PREFIX = '___';
var MockedDOMSource = /** @class */function () {
  function MockedDOMSource(_mockConfig) {
    this._mockConfig = _mockConfig;
    if (_mockConfig['elements']) {
      this._elements = _mockConfig['elements'];
    } else {
      this._elements = (0, _adapt.adapt)(_xstream2.default.empty());
    }
  }
  MockedDOMSource.prototype.elements = function () {
    var out = this._elements;
    out._isCycleSource = 'MockedDOM';
    return out;
  };
  MockedDOMSource.prototype.element = function () {
    var output$ = this.elements().filter(function (arr) {
      return arr.length > 0;
    }).map(function (arr) {
      return arr[0];
    }).remember();
    var out = (0, _adapt.adapt)(output$);
    out._isCycleSource = 'MockedDOM';
    return out;
  };
  MockedDOMSource.prototype.events = function (eventType, options) {
    var streamForEventType = this._mockConfig[eventType];
    var out = (0, _adapt.adapt)(streamForEventType || _xstream2.default.empty());
    out._isCycleSource = 'MockedDOM';
    return out;
  };
  MockedDOMSource.prototype.select = function (selector) {
    var mockConfigForSelector = this._mockConfig[selector] || {};
    return new MockedDOMSource(mockConfigForSelector);
  };
  MockedDOMSource.prototype.isolateSource = function (source, scope) {
    return source.select('.' + SCOPE_PREFIX + scope);
  };
  MockedDOMSource.prototype.isolateSink = function (sink, scope) {
    return sink.map(function (vnode) {
      if (vnode.sel && vnode.sel.indexOf(SCOPE_PREFIX + scope) !== -1) {
        return vnode;
      } else {
        vnode.sel += "." + SCOPE_PREFIX + scope;
        return vnode;
      }
    });
  };
  return MockedDOMSource;
}();
exports.MockedDOMSource = MockedDOMSource;
function mockDOMSource(mockConfig) {
  return new MockedDOMSource(mockConfig);
}
//# sourceMappingURL=mockDOMSource.js.map
},{"xstream":16,"@cycle/run/lib/adapt":95}],36:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _h = require("snabbdom/h");

function isValidString(param) {
  return typeof param === 'string' && param.length > 0;
} // tslint:disable:max-file-line-count

function isSelector(param) {
  return isValidString(param) && (param[0] === '.' || param[0] === '#');
}
function createTagFunction(tagName) {
  return function hyperscript(a, b, c) {
    var hasA = typeof a !== 'undefined';
    var hasB = typeof b !== 'undefined';
    var hasC = typeof c !== 'undefined';
    if (isSelector(a)) {
      if (hasB && hasC) {
        return (0, _h.h)(tagName + a, b, c);
      } else if (hasB) {
        return (0, _h.h)(tagName + a, b);
      } else {
        return (0, _h.h)(tagName + a, {});
      }
    } else if (hasC) {
      return (0, _h.h)(tagName + a, b, c);
    } else if (hasB) {
      return (0, _h.h)(tagName, a, b);
    } else if (hasA) {
      return (0, _h.h)(tagName, a);
    } else {
      return (0, _h.h)(tagName, {});
    }
  };
}
var SVG_TAG_NAMES = ['a', 'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor', 'animateMotion', 'animateTransform', 'circle', 'clipPath', 'colorProfile', 'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotlight', 'feTile', 'feTurbulence', 'filter', 'font', 'fontFace', 'fontFaceFormat', 'fontFaceName', 'fontFaceSrc', 'fontFaceUri', 'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line', 'linearGradient', 'marker', 'mask', 'metadata', 'missingGlyph', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'script', 'set', 'stop', 'style', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref', 'tspan', 'use', 'view', 'vkern'];
var svg = createTagFunction('svg');
SVG_TAG_NAMES.forEach(function (tag) {
  svg[tag] = createTagFunction(tag);
});
var TAG_NAMES = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'dd', 'del', 'dfn', 'dir', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'meta', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'u', 'ul', 'video'];
var exported = {
  SVG_TAG_NAMES: SVG_TAG_NAMES,
  TAG_NAMES: TAG_NAMES,
  svg: svg,
  isSelector: isSelector,
  createTagFunction: createTagFunction
};
TAG_NAMES.forEach(function (n) {
  exported[n] = createTagFunction(n);
});
exports.default = exported;
//# sourceMappingURL=hyperscript-helpers.js.map
},{"snabbdom/h":77}],26:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.video = exports.ul = exports.u = exports.tr = exports.title = exports.thead = exports.th = undefined;
exports.tfoot = exports.textarea = exports.td = exports.tbody = exports.table = exports.sup = exports.sub = exports.style = exports.strong = exports.span = exports.source = exports.small = exports.select = exports.section = exports.script = exports.samp = exports.s = exports.ruby = exports.rt = exports.rp = exports.q = exports.progress = exports.pre = exports.param = exports.p = exports.option = exports.optgroup = exports.ol = exports.object = exports.noscript = exports.nav = exports.meta = exports.menu = exports.mark = exports.map = exports.main = exports.link = exports.li = exports.legend = exports.label = exports.keygen = exports.kbd = exports.ins = exports.input = exports.img = exports.iframe = exports.i = exports.html = exports.hr = exports.hgroup = exports.header = exports.head = exports.h6 = exports.h5 = exports.h4 = exports.h3 = exports.h2 = exports.h1 = exports.form = exports.footer = exports.figure = exports.figcaption = exports.fieldset = exports.embed = exports.em = exports.dt = exports.dl = exports.div = exports.dir = exports.dfn = exports.del = exports.dd = exports.colgroup = exports.col = exports.code = exports.cite = exports.caption = exports.canvas = exports.button = exports.br = exports.body = exports.blockquote = exports.bdo = exports.bdi = exports.base = exports.b = exports.audio = exports.aside = exports.article = exports.area = exports.address = exports.abbr = exports.a = exports.svg = exports.h = exports.MockedDOMSource = exports.mockDOMSource = exports.makeDOMDriver = exports.MainDOMSource = exports.thunk = undefined;

var _thunk = require("./thunk");

Object.defineProperty(exports, "thunk", {
  enumerable: true,
  get: function get() {
    return _thunk.thunk;
  }
});

var _MainDOMSource = require("./MainDOMSource");

Object.defineProperty(exports, "MainDOMSource", {
  enumerable: true,
  get: function get() {
    return _MainDOMSource.MainDOMSource;
  }
});

var _makeDOMDriver = require("./makeDOMDriver");

Object.defineProperty(exports, "makeDOMDriver", {
  enumerable: true,
  get: function get() {
    return _makeDOMDriver.makeDOMDriver;
  }
});

var _mockDOMSource = require("./mockDOMSource");

Object.defineProperty(exports, "mockDOMSource", {
  enumerable: true,
  get: function get() {
    return _mockDOMSource.mockDOMSource;
  }
});
Object.defineProperty(exports, "MockedDOMSource", {
  enumerable: true,
  get: function get() {
    return _mockDOMSource.MockedDOMSource;
  }
});

var _h = require("snabbdom/h");

Object.defineProperty(exports, "h", {
  enumerable: true,
  get: function get() {
    return _h.h;
  }
});

var _hyperscriptHelpers = require("./hyperscript-helpers");

var _hyperscriptHelpers2 = _interopRequireDefault(_hyperscriptHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var svg = exports.svg = _hyperscriptHelpers2.default.svg;
var a = exports.a = _hyperscriptHelpers2.default.a;
var abbr = exports.abbr = _hyperscriptHelpers2.default.abbr;
var address = exports.address = _hyperscriptHelpers2.default.address;
var area = exports.area = _hyperscriptHelpers2.default.area;
var article = exports.article = _hyperscriptHelpers2.default.article;
var aside = exports.aside = _hyperscriptHelpers2.default.aside;
var audio = exports.audio = _hyperscriptHelpers2.default.audio;
var b = exports.b = _hyperscriptHelpers2.default.b;
var base = exports.base = _hyperscriptHelpers2.default.base;
var bdi = exports.bdi = _hyperscriptHelpers2.default.bdi;
var bdo = exports.bdo = _hyperscriptHelpers2.default.bdo;
var blockquote = exports.blockquote = _hyperscriptHelpers2.default.blockquote;
var body = exports.body = _hyperscriptHelpers2.default.body;
var br = exports.br = _hyperscriptHelpers2.default.br;
var button = exports.button = _hyperscriptHelpers2.default.button;
var canvas = exports.canvas = _hyperscriptHelpers2.default.canvas;
var caption = exports.caption = _hyperscriptHelpers2.default.caption;
var cite = exports.cite = _hyperscriptHelpers2.default.cite;
var code = exports.code = _hyperscriptHelpers2.default.code;
var col = exports.col = _hyperscriptHelpers2.default.col;
var colgroup = exports.colgroup = _hyperscriptHelpers2.default.colgroup;
var dd = exports.dd = _hyperscriptHelpers2.default.dd;
var del = exports.del = _hyperscriptHelpers2.default.del;
var dfn = exports.dfn = _hyperscriptHelpers2.default.dfn;
var dir = exports.dir = _hyperscriptHelpers2.default.dir;
var div = exports.div = _hyperscriptHelpers2.default.div;
var dl = exports.dl = _hyperscriptHelpers2.default.dl;
var dt = exports.dt = _hyperscriptHelpers2.default.dt;
var em = exports.em = _hyperscriptHelpers2.default.em;
var embed = exports.embed = _hyperscriptHelpers2.default.embed;
var fieldset = exports.fieldset = _hyperscriptHelpers2.default.fieldset;
var figcaption = exports.figcaption = _hyperscriptHelpers2.default.figcaption;
var figure = exports.figure = _hyperscriptHelpers2.default.figure;
var footer = exports.footer = _hyperscriptHelpers2.default.footer;
var form = exports.form = _hyperscriptHelpers2.default.form;
var h1 = exports.h1 = _hyperscriptHelpers2.default.h1;
var h2 = exports.h2 = _hyperscriptHelpers2.default.h2;
var h3 = exports.h3 = _hyperscriptHelpers2.default.h3;
var h4 = exports.h4 = _hyperscriptHelpers2.default.h4;
var h5 = exports.h5 = _hyperscriptHelpers2.default.h5;
var h6 = exports.h6 = _hyperscriptHelpers2.default.h6;
var head = exports.head = _hyperscriptHelpers2.default.head;
var header = exports.header = _hyperscriptHelpers2.default.header;
var hgroup = exports.hgroup = _hyperscriptHelpers2.default.hgroup;
var hr = exports.hr = _hyperscriptHelpers2.default.hr;
var html = exports.html = _hyperscriptHelpers2.default.html;
var i = exports.i = _hyperscriptHelpers2.default.i;
var iframe = exports.iframe = _hyperscriptHelpers2.default.iframe;
var img = exports.img = _hyperscriptHelpers2.default.img;
var input = exports.input = _hyperscriptHelpers2.default.input;
var ins = exports.ins = _hyperscriptHelpers2.default.ins;
var kbd = exports.kbd = _hyperscriptHelpers2.default.kbd;
var keygen = exports.keygen = _hyperscriptHelpers2.default.keygen;
var label = exports.label = _hyperscriptHelpers2.default.label;
var legend = exports.legend = _hyperscriptHelpers2.default.legend;
var li = exports.li = _hyperscriptHelpers2.default.li;
var link = exports.link = _hyperscriptHelpers2.default.link;
var main = exports.main = _hyperscriptHelpers2.default.main;
var map = exports.map = _hyperscriptHelpers2.default.map;
var mark = exports.mark = _hyperscriptHelpers2.default.mark;
var menu = exports.menu = _hyperscriptHelpers2.default.menu;
var meta = exports.meta = _hyperscriptHelpers2.default.meta;
var nav = exports.nav = _hyperscriptHelpers2.default.nav;
var noscript = exports.noscript = _hyperscriptHelpers2.default.noscript;
var object = exports.object = _hyperscriptHelpers2.default.object;
var ol = exports.ol = _hyperscriptHelpers2.default.ol;
var optgroup = exports.optgroup = _hyperscriptHelpers2.default.optgroup;
var option = exports.option = _hyperscriptHelpers2.default.option;
var p = exports.p = _hyperscriptHelpers2.default.p;
var param = exports.param = _hyperscriptHelpers2.default.param;
var pre = exports.pre = _hyperscriptHelpers2.default.pre;
var progress = exports.progress = _hyperscriptHelpers2.default.progress;
var q = exports.q = _hyperscriptHelpers2.default.q;
var rp = exports.rp = _hyperscriptHelpers2.default.rp;
var rt = exports.rt = _hyperscriptHelpers2.default.rt;
var ruby = exports.ruby = _hyperscriptHelpers2.default.ruby;
var s = exports.s = _hyperscriptHelpers2.default.s;
var samp = exports.samp = _hyperscriptHelpers2.default.samp;
var script = exports.script = _hyperscriptHelpers2.default.script;
var section = exports.section = _hyperscriptHelpers2.default.section;
var select = exports.select = _hyperscriptHelpers2.default.select;
var small = exports.small = _hyperscriptHelpers2.default.small;
var source = exports.source = _hyperscriptHelpers2.default.source;
var span = exports.span = _hyperscriptHelpers2.default.span;
var strong = exports.strong = _hyperscriptHelpers2.default.strong;
var style = exports.style = _hyperscriptHelpers2.default.style;
var sub = exports.sub = _hyperscriptHelpers2.default.sub;
var sup = exports.sup = _hyperscriptHelpers2.default.sup;
var table = exports.table = _hyperscriptHelpers2.default.table;
var tbody = exports.tbody = _hyperscriptHelpers2.default.tbody;
var td = exports.td = _hyperscriptHelpers2.default.td;
var textarea = exports.textarea = _hyperscriptHelpers2.default.textarea;
var tfoot = exports.tfoot = _hyperscriptHelpers2.default.tfoot;
var th = exports.th = _hyperscriptHelpers2.default.th;
var thead = exports.thead = _hyperscriptHelpers2.default.thead;
var title = exports.title = _hyperscriptHelpers2.default.title;
var tr = exports.tr = _hyperscriptHelpers2.default.tr;
var u = exports.u = _hyperscriptHelpers2.default.u;
var ul = exports.ul = _hyperscriptHelpers2.default.ul;
var video = exports.video = _hyperscriptHelpers2.default.video;
//# sourceMappingURL=index.js.map
},{"./thunk":31,"./MainDOMSource":32,"./makeDOMDriver":34,"./mockDOMSource":33,"snabbdom/h":77,"./hyperscript-helpers":36}],91:[function(require,module,exports) {
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function () {};

if ("development" !== 'production') {
  warning = function (condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.length < 10 || /^[s\W]*$/.test(format)) {
      throw new Error('The warning format should be able to uniquely identify this ' + 'warning. Please, use a more descriptive format than: ' + format);
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    }
  };
}

module.exports = warning;
},{}],88:[function(require,module,exports) {
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function (condition, format, a, b, c, d, e, f) {
  if ("development" !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;
},{}],89:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

// This implementation is based heavily on node's url.parse
function resolvePathname(to) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var toParts = to && to.split('/') || [];
  var fromParts = from && from.split('/') || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash = void 0;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) {
    fromParts.unshift('..');
  }if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
}

exports.default = resolvePathname;
},{}],90:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

function valueEqual(a, b) {
  if (a === b) return true;

  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
      return valueEqual(item, b[index]);
    });
  }

  var aType = typeof a === 'undefined' ? 'undefined' : _typeof(a);
  var bType = typeof b === 'undefined' ? 'undefined' : _typeof(b);

  if (aType !== bType) return false;

  if (aType === 'object') {
    var aValue = a.valueOf();
    var bValue = b.valueOf();

    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every(function (key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
}

exports.default = valueEqual;
},{}],67:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var addLeadingSlash = exports.addLeadingSlash = function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
};

var stripLeadingSlash = exports.stripLeadingSlash = function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
};

var hasBasename = exports.hasBasename = function hasBasename(path, prefix) {
  return new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i').test(path);
};

var stripBasename = exports.stripBasename = function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
};

var stripTrailingSlash = exports.stripTrailingSlash = function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
};

var parsePath = exports.parsePath = function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
};

var createPath = exports.createPath = function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;

  var path = pathname || '/';

  if (search && search !== '?') path += search.charAt(0) === '?' ? search : '?' + search;

  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : '#' + hash;

  return path;
};
},{}],66:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locationsAreEqual = exports.createLocation = undefined;

var _resolvePathname = require("resolve-pathname");

var _resolvePathname2 = _interopRequireDefault(_resolvePathname);

var _valueEqual = require("value-equal");

var _valueEqual2 = _interopRequireDefault(_valueEqual);

var _PathUtils = require("./PathUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var createLocation = exports.createLocation = function createLocation(path, state, key, currentLocation) {
  var location = void 0;
  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = (0, _PathUtils.parsePath)(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);

    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = (0, _resolvePathname2.default)(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
};

var locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && (0, _valueEqual2.default)(a.state, b.state);
};
},{"resolve-pathname":89,"value-equal":90,"./PathUtils":67}],68:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _warning = require("warning");

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTransitionManager = function createTransitionManager() {
  var prompt = null;

  var setPrompt = function setPrompt(nextPrompt) {
    (0, _warning2.default)(prompt == null, 'A history supports only one prompt at a time');

    prompt = nextPrompt;

    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  };

  var confirmTransitionTo = function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
          (0, _warning2.default)(false, 'A history needs a getUserConfirmation function in order to use a prompt message');

          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  };

  var listeners = [];

  var appendListener = function appendListener(fn) {
    var isActive = true;

    var listener = function listener() {
      if (isActive) fn.apply(undefined, arguments);
    };

    listeners.push(listener);

    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var notifyListeners = function notifyListeners() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(undefined, args);
    });
  };

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
};

exports.default = createTransitionManager;
},{"warning":91}],69:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {
  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
};

var removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {
  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
};

var getConfirmation = exports.getConfirmation = function getConfirmation(message, callback) {
  return callback(window.confirm(message));
}; // eslint-disable-line no-alert

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */
var supportsHistory = exports.supportsHistory = function supportsHistory() {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;

  return window.history && 'pushState' in window.history;
};

/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */
var supportsPopStateOnHashChange = exports.supportsPopStateOnHashChange = function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
};

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */
var supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
};

/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */
var isExtraneousPopstateEvent = exports.isExtraneousPopstateEvent = function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
};
},{}],65:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _warning = require("warning");

var _warning2 = _interopRequireDefault(_warning);

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _LocationUtils = require("./LocationUtils");

var _PathUtils = require("./PathUtils");

var _createTransitionManager = require("./createTransitionManager");

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _DOMUtils = require("./DOMUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

var getHistoryState = function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
};

/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */
var createBrowserHistory = function createBrowserHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  (0, _invariant2.default)(_DOMUtils.canUseDOM, 'Browser history needs a DOM');

  var globalHistory = window.history;
  var canUseHistory = (0, _DOMUtils.supportsHistory)();
  var needsHashChangeListener = !(0, _DOMUtils.supportsPopStateOnHashChange)();

  var _props$forceRefresh = props.forceRefresh,
      forceRefresh = _props$forceRefresh === undefined ? false : _props$forceRefresh,
      _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils.getConfirmation : _props$getUserConfirm,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;

  var basename = props.basename ? (0, _PathUtils.stripTrailingSlash)((0, _PathUtils.addLeadingSlash)(props.basename)) : '';

  var getDOMLocation = function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;

    var path = pathname + search + hash;

    (0, _warning2.default)(!basename || (0, _PathUtils.hasBasename)(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');

    if (basename) path = (0, _PathUtils.stripBasename)(path, basename);

    return (0, _LocationUtils.createLocation)(path, state, key);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var handlePopState = function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if ((0, _DOMUtils.isExtraneousPopstateEvent)(event)) return;

    handlePop(getDOMLocation(event.state));
  };

  var handleHashChange = function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  };

  var forceNextPop = false;

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({ action: action, location: location });
        } else {
          revertPop(location);
        }
      });
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allKeys.indexOf(fromLocation.key);

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key];

  // Public interface

  var createHref = function createHref(location) {
    return basename + (0, _PathUtils.createPath)(location);
  };

  var push = function push(path, state) {
    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'PUSH';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.pushState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

          nextKeys.push(location.key);
          allKeys = nextKeys;

          setState({ action: action, location: location });
        }
      } else {
        (0, _warning2.default)(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history');

        window.location.href = href;
      }
    });
  };

  var replace = function replace(path, state) {
    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'REPLACE';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.replaceState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);

          if (prevIndex !== -1) allKeys[prevIndex] = location.key;

          setState({ action: action, location: location });
        }
      } else {
        (0, _warning2.default)(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history');

        window.location.replace(href);
      }
    });
  };

  var go = function go(n) {
    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      (0, _DOMUtils.addEventListener)(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      (0, _DOMUtils.removeEventListener)(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createBrowserHistory;
},{"warning":91,"invariant":88,"./LocationUtils":66,"./PathUtils":67,"./createTransitionManager":68,"./DOMUtils":69}],63:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _warning = require("warning");

var _warning2 = _interopRequireDefault(_warning);

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _LocationUtils = require("./LocationUtils");

var _PathUtils = require("./PathUtils");

var _createTransitionManager = require("./createTransitionManager");

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _DOMUtils = require("./DOMUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var HashChangeEvent = 'hashchange';

var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + (0, _PathUtils.stripLeadingSlash)(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: _PathUtils.stripLeadingSlash,
    decodePath: _PathUtils.addLeadingSlash
  },
  slash: {
    encodePath: _PathUtils.addLeadingSlash,
    decodePath: _PathUtils.addLeadingSlash
  }
};

var getHashPath = function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
};

var pushHashPath = function pushHashPath(path) {
  return window.location.hash = path;
};

var replaceHashPath = function replaceHashPath(path) {
  var hashIndex = window.location.href.indexOf('#');

  window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
};

var createHashHistory = function createHashHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  (0, _invariant2.default)(_DOMUtils.canUseDOM, 'Hash history needs a DOM');

  var globalHistory = window.history;
  var canGoWithoutReload = (0, _DOMUtils.supportsGoWithoutReloadUsingHash)();

  var _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils.getConfirmation : _props$getUserConfirm,
      _props$hashType = props.hashType,
      hashType = _props$hashType === undefined ? 'slash' : _props$hashType;

  var basename = props.basename ? (0, _PathUtils.stripTrailingSlash)((0, _PathUtils.addLeadingSlash)(props.basename)) : '';

  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;

  var getDOMLocation = function getDOMLocation() {
    var path = decodePath(getHashPath());

    (0, _warning2.default)(!basename || (0, _PathUtils.hasBasename)(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');

    if (basename) path = (0, _PathUtils.stripBasename)(path, basename);

    return (0, _LocationUtils.createLocation)(path);
  };

  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var forceNextPop = false;
  var ignorePath = null;

  var handleHashChange = function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;

      if (!forceNextPop && (0, _LocationUtils.locationsAreEqual)(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === (0, _PathUtils.createPath)(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;

      handlePop(location);
    }
  };

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({ action: action, location: location });
        } else {
          revertPop(location);
        }
      });
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(toLocation));

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(fromLocation));

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  // Ensure the hash is encoded properly before doing anything else.
  var path = getHashPath();
  var encodedPath = encodePath(path);

  if (path !== encodedPath) replaceHashPath(encodedPath);

  var initialLocation = getDOMLocation();
  var allPaths = [(0, _PathUtils.createPath)(initialLocation)];

  // Public interface

  var createHref = function createHref(location) {
    return '#' + encodePath(basename + (0, _PathUtils.createPath)(location));
  };

  var push = function push(path, state) {
    (0, _warning2.default)(state === undefined, 'Hash history cannot push state; it is ignored');

    var action = 'PUSH';
    var location = (0, _LocationUtils.createLocation)(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = (0, _PathUtils.createPath)(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);

        var prevIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(history.location));
        var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

        nextPaths.push(path);
        allPaths = nextPaths;

        setState({ action: action, location: location });
      } else {
        (0, _warning2.default)(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack');

        setState();
      }
    });
  };

  var replace = function replace(path, state) {
    (0, _warning2.default)(state === undefined, 'Hash history cannot replace state; it is ignored');

    var action = 'REPLACE';
    var location = (0, _LocationUtils.createLocation)(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = (0, _PathUtils.createPath)(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf((0, _PathUtils.createPath)(history.location));

      if (prevIndex !== -1) allPaths[prevIndex] = path;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    (0, _warning2.default)(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser');

    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createHashHistory;
},{"warning":91,"invariant":88,"./LocationUtils":66,"./PathUtils":67,"./createTransitionManager":68,"./DOMUtils":69}],64:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _warning = require("warning");

var _warning2 = _interopRequireDefault(_warning);

var _PathUtils = require("./PathUtils");

var _LocationUtils = require("./LocationUtils");

var _createTransitionManager = require("./createTransitionManager");

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var clamp = function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
};

/**
 * Creates a history object that stores locations in memory.
 */
var createMemoryHistory = function createMemoryHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var getUserConfirmation = props.getUserConfirmation,
      _props$initialEntries = props.initialEntries,
      initialEntries = _props$initialEntries === undefined ? ['/'] : _props$initialEntries,
      _props$initialIndex = props.initialIndex,
      initialIndex = _props$initialIndex === undefined ? 0 : _props$initialIndex,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;

  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = history.entries.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function (entry) {
    return typeof entry === 'string' ? (0, _LocationUtils.createLocation)(entry, undefined, createKey()) : (0, _LocationUtils.createLocation)(entry, undefined, entry.key || createKey());
  });

  // Public interface

  var createHref = _PathUtils.createPath;

  var push = function push(path, state) {
    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'PUSH';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;

      var nextEntries = history.entries.slice(0);
      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }

      setState({
        action: action,
        location: location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  };

  var replace = function replace(path, state) {
    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'REPLACE';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      history.entries[history.index] = location;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);

    var action = 'POP';
    var location = history.entries[nextIndex];

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
          index: nextIndex
        });
      } else {
        // Mimic the behavior of DOM histories by
        // causing a render after a cancelled POP.
        setState();
      }
    });
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var canGo = function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  };

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return transitionManager.setPrompt(prompt);
  };

  var listen = function listen(listener) {
    return transitionManager.appendListener(listener);
  };

  var history = {
    length: entries.length,
    action: 'POP',
    location: entries[index],
    index: index,
    entries: entries,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    canGo: canGo,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createMemoryHistory;
},{"warning":91,"./PathUtils":67,"./LocationUtils":66,"./createTransitionManager":68}],62:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPath = exports.parsePath = exports.locationsAreEqual = exports.createLocation = exports.createMemoryHistory = exports.createHashHistory = exports.createBrowserHistory = undefined;

var _LocationUtils = require("./LocationUtils");

Object.defineProperty(exports, "createLocation", {
  enumerable: true,
  get: function get() {
    return _LocationUtils.createLocation;
  }
});
Object.defineProperty(exports, "locationsAreEqual", {
  enumerable: true,
  get: function get() {
    return _LocationUtils.locationsAreEqual;
  }
});

var _PathUtils = require("./PathUtils");

Object.defineProperty(exports, "parsePath", {
  enumerable: true,
  get: function get() {
    return _PathUtils.parsePath;
  }
});
Object.defineProperty(exports, "createPath", {
  enumerable: true,
  get: function get() {
    return _PathUtils.createPath;
  }
});

var _createBrowserHistory2 = require("./createBrowserHistory");

var _createBrowserHistory3 = _interopRequireDefault(_createBrowserHistory2);

var _createHashHistory2 = require("./createHashHistory");

var _createHashHistory3 = _interopRequireDefault(_createHashHistory2);

var _createMemoryHistory2 = require("./createMemoryHistory");

var _createMemoryHistory3 = _interopRequireDefault(_createMemoryHistory2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createBrowserHistory = _createBrowserHistory3.default;
exports.createHashHistory = _createHashHistory3.default;
exports.createMemoryHistory = _createMemoryHistory3.default;
},{"./createBrowserHistory":65,"./createHashHistory":63,"./createMemoryHistory":64,"./LocationUtils":66,"./PathUtils":67}],47:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHistory$ = createHistory$;

var _xstream = require("xstream");

var _xstream2 = _interopRequireDefault(_xstream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createHistory$(history, sink$) {
  var history$ = _xstream2.default.createWithMemory().startWith(history.location);
  var call = makeCallOnHistory(history);
  var unlisten = history.listen(function (loc) {
    history$._n(loc);
  });
  var sub = sink$.subscribe(createObserver(call, unlisten));
  history$.dispose = function () {
    sub.unsubscribe();
    unlisten();
  };
  return history$;
}
function makeCallOnHistory(history) {
  return function call(input) {
    if (input.type === 'push') {
      history.push(input.pathname, input.state);
    }
    if (input.type === 'replace') {
      history.replace(input.pathname, input.state);
    }
    if (input.type === 'go') {
      history.go(input.amount);
    }
    if (input.type === 'goBack') {
      history.goBack();
    }
    if (input.type === 'goForward') {
      history.goForward();
    }
  };
}
function createObserver(call, unlisten) {
  return {
    next: function next(input) {
      if (typeof input === 'string') {
        call({ type: 'push', pathname: input });
      } else {
        call(input);
      }
    },
    error: function error(err) {
      unlisten();
    },
    complete: function complete() {
      setTimeout(unlisten);
    }
  };
}
//# sourceMappingURL=createHistory$.js.map
},{"xstream":16}],39:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeHistoryDriver = makeHistoryDriver;
exports.makeServerHistoryDriver = makeServerHistoryDriver;
exports.makeHashHistoryDriver = makeHashHistoryDriver;

var _history = require("history");

var _createHistory$ = require("./createHistory$");

function isHistory(x) {
  return !!x.createHref;
}
function makeHistoryDriver(options) {
  var history;
  if (options && isHistory(options)) {
    history = options;
  } else {
    history = (0, _history.createBrowserHistory)(options);
  }
  return function historyDriver(sink$) {
    return (0, _createHistory$.createHistory$)(history, sink$);
  };
}
function makeServerHistoryDriver(options) {
  var history = (0, _history.createMemoryHistory)(options);
  return function serverHistoryDriver(sink$) {
    return (0, _createHistory$.createHistory$)(history, sink$);
  };
}
function makeHashHistoryDriver(options) {
  var history = (0, _history.createHashHistory)(options);
  return function hashHistoryDriver(sink$) {
    return (0, _createHistory$.createHistory$)(history, sink$);
  };
}
//# sourceMappingURL=drivers.js.map
},{"history":62,"./createHistory$":47}],38:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.captureClicks = captureClicks;

var _xstream = require("xstream");

var _xstream2 = _interopRequireDefault(_xstream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLICK_EVENT = typeof document !== 'undefined' && document.ontouchstart ? 'touchstart' : 'click';
function which(ev) {
  if (typeof window === 'undefined') {
    return false;
  }
  var e = ev || window.event;
  return e.which === null ? e.button : e.which;
}
function sameOrigin(href) {
  if (typeof window === 'undefined') {
    return false;
  }
  return href && href.indexOf(window.location.origin) === 0;
}
function makeClickListener(push) {
  return function clickListener(event) {
    if (which(event) !== 1) {
      return;
    }
    if (event.metaKey || event.ctrlKey || event.shiftKey) {
      return;
    }
    if (event.defaultPrevented) {
      return;
    }
    var element = event.target;
    while (element && element.nodeName !== 'A') {
      element = element.parentNode;
    }
    if (!element || element.nodeName !== 'A') {
      return;
    }
    if (element.hasAttribute('download') || element.getAttribute('rel') === 'external') {
      return;
    }
    if (element.target) {
      return;
    }
    var link = element.getAttribute('href');
    if (link && link.indexOf('mailto:') > -1 || link.charAt(0) === '#') {
      return;
    }
    if (!sameOrigin(element.href)) {
      return;
    }
    event.preventDefault();
    var pathname = element.pathname,
        search = element.search,
        _a = element.hash,
        hash = _a === void 0 ? '' : _a;
    push(pathname + search + hash);
  };
}
function captureAnchorClicks(push) {
  var listener = makeClickListener(push);
  if (typeof window !== 'undefined') {
    document.addEventListener(CLICK_EVENT, listener, false);
  }
  return function () {
    return document.removeEventListener(CLICK_EVENT, listener);
  };
}
function captureClicks(historyDriver) {
  return function historyDriverWithClickCapture(sink$) {
    var cleanup;
    var internalSink$ = _xstream2.default.create({
      start: function start() {},
      stop: function stop() {
        return typeof cleanup === 'function' && cleanup();
      }
    });
    cleanup = captureAnchorClicks(function (pathname) {
      internalSink$._n({ type: 'push', pathname: pathname });
    });
    sink$._add(internalSink$);
    return historyDriver(internalSink$);
  };
}
//# sourceMappingURL=captureClicks.js.map
},{"xstream":16}],28:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _drivers = require("./drivers");

Object.defineProperty(exports, "makeHistoryDriver", {
  enumerable: true,
  get: function get() {
    return _drivers.makeHistoryDriver;
  }
});
Object.defineProperty(exports, "makeHashHistoryDriver", {
  enumerable: true,
  get: function get() {
    return _drivers.makeHashHistoryDriver;
  }
});

var _captureClicks = require("./captureClicks");

Object.defineProperty(exports, "captureClicks", {
  enumerable: true,
  get: function get() {
    return _captureClicks.captureClicks;
  }
});
Object.defineProperty(exports, "makeServerHistoryDriver", {
  enumerable: true,
  get: function get() {
    return _drivers.makeServerHistoryDriver;
  }
});
},{"./drivers":39,"./captureClicks":38}],49:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isolateSource = isolateSource;
exports.isolateSink = isolateSink;
function arrayEqual(requestNamespace, sourceNamespace) {
  for (var i = 0; i < sourceNamespace.length; i++) {
    if (requestNamespace[i] !== sourceNamespace[i]) {
      return false;
    }
  }
  return true;
}
function isolateSource(httpSource, scope) {
  if (scope === null) {
    return httpSource;
  }
  return httpSource.filter(function (request) {
    return Array.isArray(request._namespace) && arrayEqual(request._namespace, httpSource._namespace.concat(scope));
  }, scope);
}
function isolateSink(request$, scope) {
  if (scope === null) {
    return request$;
  }
  return request$.map(function (req) {
    if (typeof req === 'string') {
      return { url: req, _namespace: [scope] };
    }
    req._namespace = req._namespace || [];
    req._namespace.unshift(scope);
    return req;
  });
}
//# sourceMappingURL=isolate.js.map
},{}],46:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainHTTPSource = undefined;

var _isolate = require("./isolate");

var _adapt = require("@cycle/run/lib/adapt");

var MainHTTPSource = /** @class */function () {
  function MainHTTPSource(_res$$, _name, _namespace) {
    if (_namespace === void 0) {
      _namespace = [];
    }
    this._res$$ = _res$$;
    this._name = _name;
    this._namespace = _namespace;
    this.isolateSource = _isolate.isolateSource;
    this.isolateSink = _isolate.isolateSink;
  }
  MainHTTPSource.prototype.filter = function (predicate, scope) {
    var filteredResponse$$ = this._res$$.filter(function (r$) {
      return predicate(r$.request);
    });
    return new MainHTTPSource(filteredResponse$$, this._name, scope === undefined ? this._namespace : this._namespace.concat(scope));
  };
  MainHTTPSource.prototype.select = function (category) {
    var res$$ = category ? this._res$$.filter(function (res$) {
      return res$.request && res$.request.category === category;
    }) : this._res$$;
    var out = (0, _adapt.adapt)(res$$);
    out._isCycleSource = this._name;
    return out;
  };
  return MainHTTPSource;
}();
exports.MainHTTPSource = MainHTTPSource;
//# sourceMappingURL=MainHTTPSource.js.map
},{"./isolate":49,"@cycle/run/lib/adapt":95}],99:[function(require,module,exports) {

/**
 * Expose `Emitter`.
 */

if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],78:[function(require,module,exports) {
'use strict';

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return null !== obj && 'object' === typeof obj;
}

module.exports = isObject;

},{}],79:[function(require,module,exports) {
'use strict';

/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = require('./is-object');

/**
 * Expose `RequestBase`.
 */

module.exports = RequestBase;

/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in RequestBase.prototype) {
    obj[key] = RequestBase.prototype[key];
  }
  return obj;
}

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.clearTimeout = function _clearTimeout(){
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  return this;
};

/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.parse = function parse(fn){
  this._parser = fn;
  return this;
};

/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.responseType = function(val){
  this._responseType = val;
  return this;
};

/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.serialize = function serialize(fn){
  this._serializer = fn;
  return this;
};

/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, deadline}
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.timeout = function timeout(options){
  if (!options || 'object' !== typeof options) {
    this._timeout = options;
    this._responseTimeout = 0;
    return this;
  }

  for(var option in options) {
    switch(option) {
      case 'deadline':
        this._timeout = options.deadline;
        break;
      case 'response':
        this._responseTimeout = options.response;
        break;
      default:
        console.warn("Unknown timeout option", option);
    }
  }
  return this;
};

/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.retry = function retry(count){
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  return this;
};

/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */

RequestBase.prototype._retry = function() {
  this.clearTimeout();

  // node
  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;

  return this._end();
};

/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */

RequestBase.prototype.then = function then(resolve, reject) {
  if (!this._fullfilledPromise) {
    var self = this;
    if (this._endCalled) {
      console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises");
    }
    this._fullfilledPromise = new Promise(function(innerResolve, innerReject){
      self.end(function(err, res){
        if (err) innerReject(err); else innerResolve(res);
      });
    });
  }
  return this._fullfilledPromise.then(resolve, reject);
}

RequestBase.prototype.catch = function(cb) {
  return this.then(undefined, cb);
};

/**
 * Allow for extension
 */

RequestBase.prototype.use = function use(fn) {
  fn(this);
  return this;
}

RequestBase.prototype.ok = function(cb) {
  if ('function' !== typeof cb) throw Error("Callback required");
  this._okCallback = cb;
  return this;
};

RequestBase.prototype._isResponseOK = function(res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};


/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

RequestBase.prototype.get = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

RequestBase.prototype.getHeader = RequestBase.prototype.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */
RequestBase.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */
RequestBase.prototype.field = function(name, val) {

  // name should be either a string or an object.
  if (null === name ||  undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (var key in name) {
      this.field(key, name[key]);
    }
    return this;
  }

  if (Array.isArray(val)) {
    for (var i in val) {
      this.field(name, val[i]);
    }
    return this;
  }

  // val should be defined now
  if (null === val || undefined === val) {
    throw new Error('.field(name, val) val can not be empty');
  }
  if ('boolean' === typeof val) {
    val = '' + val;
  }
  this._getFormData().append(name, val);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */
RequestBase.prototype.abort = function(){
  if (this._aborted) {
    return this;
  }
  this._aborted = true;
  this.xhr && this.xhr.abort(); // browser
  this.req && this.req.abort(); // node
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

RequestBase.prototype.withCredentials = function(on){
  // This is browser-only functionality. Node side is no-op.
  if(on==undefined) on = true;
  this._withCredentials = on;
  return this;
};

/**
 * Set the max redirects to `n`. Does noting in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.redirects = function(n){
  this._maxRedirects = n;
  return this;
};

/**
 * Maximum size of buffered response body, in bytes. Counts uncompressed size.
 * Default 200MB.
 *
 * @param {Number} n
 * @return {Request} for chaining
 */
RequestBase.prototype.maxResponseSize = function(n){
  if ('number' !== typeof n) {
    throw TypeError("Invalid argument");
  }
  this._maxResponseSize = n;
  return this;
};

/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */

RequestBase.prototype.toJSON = function(){
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
};


/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.send = function(data){
  var isObj = isObject(data);
  var type = this._header['content-type'];

  if (this._formData) {
    console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObj && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw Error("Can't merge these send calls");
  }

  // merge
  if (isObj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObj || this._isHost(data)) {
    return this;
  }

  // default to json
  if (!type) this.type('json');
  return this;
};


/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.sortQuery = function(sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};

/**
 * Compose querystring to append to req.url
 *
 * @api private
 */
RequestBase.prototype._finalizeQueryString = function(){
  var query = this._query.join('&');
  if (query) {
    this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + query;
  }
  this._query.length = 0; // Makes the call idempotent

  if (this._sort) {
    var index = this.url.indexOf('?');
    if (index >= 0) {
      var queryArr = this.url.substring(index + 1).split('&');
      if ('function' === typeof this._sort) {
        queryArr.sort(this._sort);
      } else {
        queryArr.sort();
      }
      this.url = this.url.substring(0, index) + '?' + queryArr.join('&');
    }
  }
};

// For backwards compat only
RequestBase.prototype._appendQueryString = function() {console.trace("Unsupported");}

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

RequestBase.prototype._timeoutError = function(reason, timeout, errno){
  if (this._aborted) {
    return;
  }
  var err = new Error(reason + timeout + 'ms exceeded');
  err.timeout = timeout;
  err.code = 'ECONNABORTED';
  err.errno = errno;
  this.timedout = true;
  this.abort();
  this.callback(err);
};

RequestBase.prototype._setTimeouts = function() {
  var self = this;

  // deadline
  if (this._timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  }
  // response timeout
  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(function(){
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
}

},{"./is-object":78}],83:[function(require,module,exports) {
'use strict';

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

exports.type = function(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.params = function(str){
  return str.split(/ *; */).reduce(function(obj, str){
    var parts = str.split(/ *= */);
    var key = parts.shift();
    var val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.parseLinks = function(str){
  return str.split(/ *, */).reduce(function(obj, str){
    var parts = str.split(/ *; */);
    var url = parts[0].slice(1, -1);
    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
    obj[rel] = url;
    return obj;
  }, {});
};

/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */

exports.cleanHeader = function(header, shouldStripCookie){
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header['host'];
  if (shouldStripCookie) {
    delete header['cookie'];
  }
  return header;
};

},{}],81:[function(require,module,exports) {
'use strict';

/**
 * Module dependencies.
 */

var utils = require('./utils');

/**
 * Expose `ResponseBase`.
 */

module.exports = ResponseBase;

/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in ResponseBase.prototype) {
    obj[key] = ResponseBase.prototype[key];
  }
  return obj;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

ResponseBase.prototype.get = function(field){
    return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

ResponseBase.prototype._setHeaderProperties = function(header){
    // TODO: moar!
    // TODO: make this a util

    // content-type
    var ct = header['content-type'] || '';
    this.type = utils.type(ct);

    // params
    var params = utils.params(ct);
    for (var key in params) this[key] = params[key];

    this.links = {};

    // links
    try {
        if (header.link) {
            this.links = utils.parseLinks(header.link);
        }
    } catch (err) {
        // ignore
    }
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

ResponseBase.prototype._setStatusProperties = function(status){
    var type = status / 100 | 0;

    // status / class
    this.status = this.statusCode = status;
    this.statusType = type;

    // basics
    this.info = 1 == type;
    this.ok = 2 == type;
    this.redirect = 3 == type;
    this.clientError = 4 == type;
    this.serverError = 5 == type;
    this.error = (4 == type || 5 == type)
        ? this.toError()
        : false;

    // sugar
    this.accepted = 202 == status;
    this.noContent = 204 == status;
    this.badRequest = 400 == status;
    this.unauthorized = 401 == status;
    this.notAcceptable = 406 == status;
    this.forbidden = 403 == status;
    this.notFound = 404 == status;
};

},{"./utils":83}],80:[function(require,module,exports) {
'use strict';

var ERROR_CODES = [
  'ECONNRESET',
  'ETIMEDOUT',
  'EADDRINFO',
  'ESOCKETTIMEDOUT'
];

/**
 * Determine if a request should be retried.
 * (Borrowed from segmentio/superagent-retry)
 *
 * @param {Error} err
 * @param {Response} [res]
 * @returns {Boolean}
 */
module.exports = function shouldRetry(err, res) {
  if (err && err.code && ~ERROR_CODES.indexOf(err.code)) return true;
  if (res && res.status && res.status >= 500) return true;
  // Superagent timeout
  if (err && 'timeout' in err && err.code == 'ECONNABORTED') return true;
  if (err && 'crossDomain' in err) return true;
  return false;
};

},{}],72:[function(require,module,exports) {
/**
 * Root reference for iframes.
 */

var root;
if (typeof window !== 'undefined') { // Browser window
  root = window;
} else if (typeof self !== 'undefined') { // Web Worker
  root = self;
} else { // Other environments
  console.warn("Using browser-only version of superagent in non-browser environment");
  root = this;
}

var Emitter = require('component-emitter');
var RequestBase = require('./request-base');
var isObject = require('./is-object');
var ResponseBase = require('./response-base');
var shouldRetry = require('./should-retry');

/**
 * Noop.
 */

function noop(){};

/**
 * Expose `request`.
 */

var request = exports = module.exports = function(method, url) {
  // callback
  if ('function' == typeof url) {
    return new exports.Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
}

exports.Request = Request;

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  throw Error("Browser-only version of superagent could not find XHR");
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    pushEncodedKeyValuePair(pairs, key, obj[key]);
  }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (val != null) {
    if (Array.isArray(val)) {
      val.forEach(function(v) {
        pushEncodedKeyValuePair(pairs, key, v);
      });
    } else if (isObject(val)) {
      for(var subkey in val) {
        pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
      }
    } else {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(val));
    }
  } else if (val === null) {
    pairs.push(encodeURIComponent(key));
  }
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var pair;
  var pos;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');
    if (pos == -1) {
      obj[decodeURIComponent(pair)] = '';
    } else {
      obj[decodeURIComponent(pair.slice(0, pos))] =
        decodeURIComponent(pair.slice(pos + 1));
    }
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'text/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    if (index === -1) { // could be empty line, just skip it
      continue;
    }
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  return /[\/+]json\b/.test(mime);
}

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req) {
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  var status = this.xhr.status;
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
      status = 204;
  }
  this._setStatusProperties(status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this._setHeaderProperties(this.header);

  if (null === this.text && req._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body = this.req.method != 'HEAD'
      ? this._parseBody(this.text ? this.text : this.xhr.response)
      : null;
  }
}

ResponseBase(Response.prototype);

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype._parseBody = function(str){
  var parse = request.parse[this.type];
  if(this.req._parser) {
    return this.req._parser(this, str);
  }
  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case
  this._header = {}; // coerces header names to lowercase
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      // issue #675: return the raw response if the response parsing fails
      if (self.xhr) {
        // ie9 doesn't have 'response' property
        err.rawResponse = typeof self.xhr.responseType == 'undefined' ? self.xhr.responseText : self.xhr.response;
        // issue #876: return the http status code if the response parsing fails
        err.status = self.xhr.status ? self.xhr.status : null;
        err.statusCode = err.status; // backwards-compat only
      } else {
        err.rawResponse = null;
        err.status = null;
      }

      return self.callback(err);
    }

    self.emit('response', res);

    var new_err;
    try {
      if (!self._isResponseOK(res)) {
        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
      }
    } catch(custom_err) {
      new_err = custom_err; // ok() callback can throw
    }

    // #1000 don't catch errors from the callback to avoid double calling it
    if (new_err) {
      new_err.original = err;
      new_err.response = res;
      new_err.status = res.status;
      self.callback(new_err, res);
    } else {
      self.callback(null, res);
    }
  });
}

/**
 * Mixin `Emitter` and `RequestBase`.
 */

Emitter(Request.prototype);
RequestBase(Request.prototype);

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} [pass] optional in case of using 'bearer' as type
 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass, options){
  if (typeof pass === 'object' && pass !== null) { // pass is optional and can substitute for options
    options = pass;
  }
  if (!options) {
    options = {
      type: 'function' === typeof btoa ? 'basic' : 'auto',
    }
  }

  switch (options.type) {
    case 'basic':
      this.set('Authorization', 'Basic ' + btoa(user + ':' + pass));
    break;

    case 'auto':
      this.username = user;
      this.password = pass;
    break;

    case 'bearer': // usage would be .auth(accessToken, { type: 'bearer' })
      this.set('Authorization', 'Bearer ' + user);
    break;
  }
  return this;
};

/**
 * Add query-string `val`.
 *
 * Examples:
 *
 *   request.get('/shoes')
 *     .query('size=10')
 *     .query({ color: 'blue' })
 *
 * @param {Object|String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, options){
  if (file) {
    if (this._data) {
      throw Error("superagent can't mix .send() and .attach()");
    }

    this._getFormData().append(field, file, options || file.name);
  }
  return this;
};

Request.prototype._getFormData = function(){
  if (!this._formData) {
    this._formData = new root.FormData();
  }
  return this._formData;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  // console.log(this._retries, this._maxRetries)
  if (this._maxRetries && this._retries++ < this._maxRetries && shouldRetry(err, res)) {
    return this._retry();
  }

  var fn = this._callback;
  this.clearTimeout();

  if (err) {
    if (this._maxRetries) err.retries = this._retries - 1;
    this.emit('error', err);
  }

  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

// This only warns, because the request is still likely to work
Request.prototype.buffer = Request.prototype.ca = Request.prototype.agent = function(){
  console.warn("This is not supported in browser version of superagent");
  return this;
};

// This throws, because it can't send/receive data as expected
Request.prototype.pipe = Request.prototype.write = function(){
  throw Error("Streaming is not supported in browser version of superagent");
};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
Request.prototype._isHost = function _isHost(obj) {
  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
  return obj && 'object' === typeof obj && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
}

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  if (this._endCalled) {
    console.warn("Warning: .end() was called twice. This is not supported in superagent");
  }
  this._endCalled = true;

  // store callback
  this._callback = fn || noop;

  // querystring
  this._finalizeQueryString();

  return this._end();
};

Request.prototype._end = function() {
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var data = this._formData || this._data;

  this._setTimeouts();

  // state change
  xhr.onreadystatechange = function(){
    var readyState = xhr.readyState;
    if (readyState >= 2 && self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }
    if (4 != readyState) {
      return;
    }

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (!status) {
      if (self.timedout || self._aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  var handleProgress = function(direction, e) {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    e.direction = direction;
    self.emit('progress', e);
  }
  if (this.hasListeners('progress')) {
    try {
      xhr.onprogress = handleProgress.bind(null, 'download');
      if (xhr.upload) {
        xhr.upload.onprogress = handleProgress.bind(null, 'upload');
      }
    } catch(e) {
      // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  }

  // initiate request
  try {
    if (this.username && this.password) {
      xhr.open(this.method, this.url, true, this.username, this.password);
    } else {
      xhr.open(this.method, this.url, true);
    }
  } catch (err) {
    // see #1149
    return this.callback(err);
  }

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if (!this._formData && 'GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];
    var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) {
      serialize = request.serialize['application/json'];
    }
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;

    if (this.header.hasOwnProperty(field))
      xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data !== 'undefined' ? data : null);
  return this;
};

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.options = function(url, data, fn){
  var req = request('OPTIONS', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

function del(url, data, fn){
  var req = request('DELETE', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

request['del'] = del;
request['delete'] = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

},{"component-emitter":99,"./request-base":79,"./is-object":78,"./response-base":81,"./should-retry":80}],37:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.optionsToSuperagent = optionsToSuperagent;
exports.createResponse$ = createResponse$;
exports.makeHTTPDriver = makeHTTPDriver;

var _xstream = require("xstream");

var _xstream2 = _interopRequireDefault(_xstream);

var _adapt = require("@cycle/run/lib/adapt");

var _MainHTTPSource = require("./MainHTTPSource");

var _superagent = require("superagent");

var superagent = _interopRequireWildcard(_superagent);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function preprocessReqOptions(reqOptions) {
  reqOptions.withCredentials = reqOptions.withCredentials || false;
  reqOptions.redirects = typeof reqOptions.redirects === 'number' ? reqOptions.redirects : 5;
  reqOptions.method = reqOptions.method || "get";
  return reqOptions;
}
function optionsToSuperagent(rawReqOptions) {
  var reqOptions = preprocessReqOptions(rawReqOptions);
  if (typeof reqOptions.url !== "string") {
    throw new Error("Please provide a `url` property in the request options.");
  }
  var lowerCaseMethod = (reqOptions.method || 'GET').toLowerCase();
  var sanitizedMethod = lowerCaseMethod === "delete" ? "del" : lowerCaseMethod;
  var request = superagent[sanitizedMethod](reqOptions.url);
  if (typeof request.redirects === "function") {
    request = request.redirects(reqOptions.redirects);
  }
  if (reqOptions.type) {
    request = request.type(reqOptions.type);
  }
  if (reqOptions.send) {
    request = request.send(reqOptions.send);
  }
  if (reqOptions.accept) {
    request = request.accept(reqOptions.accept);
  }
  if (reqOptions.query) {
    request = request.query(reqOptions.query);
  }
  if (reqOptions.withCredentials) {
    request = request.withCredentials();
  }
  if (reqOptions.agent) {
    request = request.key(reqOptions.agent.key);
    request = request.cert(reqOptions.agent.cert);
  }
  if (typeof reqOptions.user === 'string' && typeof reqOptions.password === 'string') {
    request = request.auth(reqOptions.user, reqOptions.password);
  }
  if (reqOptions.headers) {
    for (var key in reqOptions.headers) {
      if (reqOptions.headers.hasOwnProperty(key)) {
        request = request.set(key, reqOptions.headers[key]);
      }
    }
  }
  if (reqOptions.field) {
    for (var key in reqOptions.field) {
      if (reqOptions.field.hasOwnProperty(key)) {
        request = request.field(key, reqOptions.field[key]);
      }
    }
  }
  if (reqOptions.attach) {
    for (var i = reqOptions.attach.length - 1; i >= 0; i--) {
      var a = reqOptions.attach[i];
      request = request.attach(a.name, a.path, a.filename);
    }
  }
  if (reqOptions.responseType) {
    request = request.responseType(reqOptions.responseType);
  }
  if (reqOptions.ok) {
    request = request.ok(reqOptions.ok);
  }
  return request;
}
function createResponse$(reqInput) {
  return _xstream2.default.create({
    start: function startResponseStream(listener) {
      try {
        var reqOptions_1 = normalizeRequestInput(reqInput);
        this.request = optionsToSuperagent(reqOptions_1);
        if (reqOptions_1.progress) {
          this.request = this.request.on('progress', function (res) {
            res.request = reqOptions_1;
            listener.next(res);
          });
        }
        this.request.end(function (err, res) {
          if (err) {
            if (err.response) {
              err.response.request = reqOptions_1;
            }
            listener.error(err);
          } else {
            res.request = reqOptions_1;
            listener.next(res);
            listener.complete();
          }
        });
      } catch (err) {
        listener.error(err);
      }
    },
    stop: function stopResponseStream() {
      if (this.request && this.request.abort) {
        this.request.abort();
      }
    }
  });
}
function softNormalizeRequestInput(reqInput) {
  var reqOptions;
  try {
    reqOptions = normalizeRequestInput(reqInput);
  } catch (err) {
    reqOptions = { url: 'Error', _error: err };
  }
  return reqOptions;
}
function normalizeRequestInput(reqInput) {
  if (typeof reqInput === 'string') {
    return { url: reqInput };
  } else if ((typeof reqInput === "undefined" ? "undefined" : _typeof(reqInput)) === 'object') {
    return reqInput;
  } else {
    throw new Error("Observable of requests given to HTTP Driver must emit " + "either URL strings or objects with parameters.");
  }
}
function requestInputToResponse$(reqInput) {
  var response$ = createResponse$(reqInput).remember();
  var reqOptions = softNormalizeRequestInput(reqInput);
  if (!reqOptions.lazy) {
    response$.addListener({
      next: function next() {},
      error: function error() {},
      complete: function complete() {}
    });
  }
  response$ = (0, _adapt.adapt)(response$);
  Object.defineProperty(response$, 'request', {
    value: reqOptions,
    writable: false
  });
  return response$;
}
function makeHTTPDriver() {
  function httpDriver(request$, name) {
    var response$$ = request$.map(requestInputToResponse$);
    var httpSource = new _MainHTTPSource.MainHTTPSource(response$$, name, []);
    response$$.addListener({
      next: function next() {},
      error: function error() {},
      complete: function complete() {}
    });
    return httpSource;
  }
  return httpDriver;
}
//# sourceMappingURL=http-driver.js.map
},{"xstream":16,"@cycle/run/lib/adapt":95,"./MainHTTPSource":46,"superagent":72}],27:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _httpDriver = require("./http-driver");

Object.defineProperty(exports, "makeHTTPDriver", {
  enumerable: true,
  get: function get() {
    return _httpDriver.makeHTTPDriver;
  }
});
},{"./http-driver":37}],40:[function(require,module,exports) {
var global = (1,eval)("this");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAdapt = setAdapt;
exports.adapt = adapt;
function getGlobal() {
  var globalObj;
  if (typeof window !== 'undefined') {
    globalObj = window;
  } else if (typeof global !== 'undefined') {
    globalObj = global;
  } else {
    globalObj = this;
  }
  globalObj.Cyclejs = globalObj.Cyclejs || {};
  globalObj = globalObj.Cyclejs;
  globalObj.adaptStream = globalObj.adaptStream || function (x) {
    return x;
  };
  return globalObj;
}
function setAdapt(f) {
  getGlobal().adaptStream = f;
}
function adapt(stream) {
  return getGlobal().adaptStream(stream);
}
//# sourceMappingURL=adapt.js.map
},{}],41:[function(require,module,exports) {
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = microtask;
/**
 * Inspired by https://github.com/yoshuawuyts/nanotask, this function manages
 * a queue of microtasks. It returns a "scheduleMicrotask" helper.
 *
 * Uses MutationObserver in the browser, supported by many browsers, including
 * IE11.
 *
 * Uses process.nextTick in Node.js.
 *
 * Uses setTimeout otherwise.
 */
function microtask() {
  if (typeof MutationObserver !== 'undefined') {
    var node_1 = document.createTextNode('');
    var queue_1 = [];
    var i_1 = 0;
    new MutationObserver(function () {
      while (queue_1.length) {
        queue_1.shift()();
      }
    }).observe(node_1, { characterData: true });
    return function (fn) {
      queue_1.push(fn);
      node_1.data = i_1 = 1 - i_1;
    };
  } else if (typeof process !== 'undefined') {
    return process.nextTick;
  } else {
    return setTimeout;
  }
}
//# sourceMappingURL=microtask.js.map
},{"process":48}],29:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.setup = setup;
exports.run = run;

var _xstream = require("xstream");

var _xstream2 = _interopRequireDefault(_xstream);

var _adapt = require("./adapt");

var _microtask = require("./microtask");

var _microtask2 = _interopRequireDefault(_microtask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scheduleMicrotask = (0, _microtask2.default)();
function makeSinkProxies(drivers) {
  var sinkProxies = {};
  for (var name_1 in drivers) {
    if (drivers.hasOwnProperty(name_1)) {
      sinkProxies[name_1] = _xstream2.default.create();
    }
  }
  return sinkProxies;
}
function callDrivers(drivers, sinkProxies) {
  var sources = {};
  for (var name_2 in drivers) {
    if (drivers.hasOwnProperty(name_2)) {
      sources[name_2] = drivers[name_2](sinkProxies[name_2], name_2);
      if (sources[name_2] && _typeof(sources[name_2]) === 'object') {
        sources[name_2]._isCycleSource = name_2;
      }
    }
  }
  return sources;
}
// NOTE: this will mutate `sources`.
function adaptSources(sources) {
  for (var name_3 in sources) {
    if (sources.hasOwnProperty(name_3) && sources[name_3] && typeof sources[name_3]['shamefullySendNext'] === 'function') {
      sources[name_3] = (0, _adapt.adapt)(sources[name_3]);
    }
  }
  return sources;
}
function replicateMany(sinks, sinkProxies) {
  var sinkNames = Object.keys(sinks).filter(function (name) {
    return !!sinkProxies[name];
  });
  var buffers = {};
  var replicators = {};
  sinkNames.forEach(function (name) {
    buffers[name] = { _n: [], _e: [] };
    replicators[name] = {
      next: function next(x) {
        return buffers[name]._n.push(x);
      },
      error: function error(err) {
        return buffers[name]._e.push(err);
      },
      complete: function complete() {}
    };
  });
  var subscriptions = sinkNames.map(function (name) {
    return _xstream2.default.fromObservable(sinks[name]).subscribe(replicators[name]);
  });
  sinkNames.forEach(function (name) {
    var listener = sinkProxies[name];
    var next = function next(x) {
      scheduleMicrotask(function () {
        return listener._n(x);
      });
    };
    var error = function error(err) {
      scheduleMicrotask(function () {
        (console.error || console.log)(err);
        listener._e(err);
      });
    };
    buffers[name]._n.forEach(next);
    buffers[name]._e.forEach(error);
    replicators[name].next = next;
    replicators[name].error = error;
    // because sink.subscribe(replicator) had mutated replicator to add
    // _n, _e, _c, we must also update these:
    replicators[name]._n = next;
    replicators[name]._e = error;
  });
  buffers = null; // free up for GC
  return function disposeReplication() {
    subscriptions.forEach(function (s) {
      return s.unsubscribe();
    });
    sinkNames.forEach(function (name) {
      return sinkProxies[name]._c();
    });
  };
}
function disposeSources(sources) {
  for (var k in sources) {
    if (sources.hasOwnProperty(k) && sources[k] && sources[k].dispose) {
      sources[k].dispose();
    }
  }
}
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
/**
 * A function that prepares the Cycle application to be executed. Takes a `main`
 * function and prepares to circularly connects it to the given collection of
 * driver functions. As an output, `setup()` returns an object with three
 * properties: `sources`, `sinks` and `run`. Only when `run()` is called will
 * the application actually execute. Refer to the documentation of `run()` for
 * more details.
 *
 * **Example:**
 * ```js
 * import {setup} from '@cycle/run';
 * const {sources, sinks, run} = setup(main, drivers);
 * // ...
 * const dispose = run(); // Executes the application
 * // ...
 * dispose();
 * ```
 *
 * @param {Function} main a function that takes `sources` as input and outputs
 * `sinks`.
 * @param {Object} drivers an object where keys are driver names and values
 * are driver functions.
 * @return {Object} an object with three properties: `sources`, `sinks` and
 * `run`. `sources` is the collection of driver sources, `sinks` is the
 * collection of driver sinks, these can be used for debugging or testing. `run`
 * is the function that once called will execute the application.
 * @function setup
 */
function setup(main, drivers) {
  if (typeof main !== "function") {
    throw new Error("First argument given to Cycle must be the 'main' " + "function.");
  }
  if ((typeof drivers === "undefined" ? "undefined" : _typeof(drivers)) !== "object" || drivers === null) {
    throw new Error("Second argument given to Cycle must be an object " + "with driver functions as properties.");
  }
  if (isObjectEmpty(drivers)) {
    throw new Error("Second argument given to Cycle must be an object " + "with at least one driver function declared as a property.");
  }
  var sinkProxies = makeSinkProxies(drivers);
  var sources = callDrivers(drivers, sinkProxies);
  var adaptedSources = adaptSources(sources);
  var sinks = main(adaptedSources);
  if (typeof window !== 'undefined') {
    window.Cyclejs = window.Cyclejs || {};
    window.Cyclejs.sinks = sinks;
  }
  function _run() {
    var disposeReplication = replicateMany(sinks, sinkProxies);
    return function dispose() {
      disposeSources(sources);
      disposeReplication();
    };
  }
  return { sinks: sinks, sources: sources, run: _run };
}
/**
 * Takes a `main` function and circularly connects it to the given collection
 * of driver functions.
 *
 * **Example:**
 * ```js
 * import run from '@cycle/run';
 * const dispose = run(main, drivers);
 * // ...
 * dispose();
 * ```
 *
 * The `main` function expects a collection of "source" streams (returned from
 * drivers) as input, and should return a collection of "sink" streams (to be
 * given to drivers). A "collection of streams" is a JavaScript object where
 * keys match the driver names registered by the `drivers` object, and values
 * are the streams. Refer to the documentation of each driver to see more
 * details on what types of sources it outputs and sinks it receives.
 *
 * @param {Function} main a function that takes `sources` as input and outputs
 * `sinks`.
 * @param {Object} drivers an object where keys are driver names and values
 * are driver functions.
 * @return {Function} a dispose function, used to terminate the execution of the
 * Cycle.js program, cleaning up resources used.
 * @function run
 */
function run(main, drivers) {
  var program = setup(main, drivers);
  if (typeof window !== 'undefined' && window['CyclejsDevTool_startGraphSerializer']) {
    window['CyclejsDevTool_startGraphSerializer'](program.sinks);
  }
  return program.run();
}
exports.default = run;
//# sourceMappingURL=index.js.map
},{"xstream":16,"./adapt":40,"./microtask":41}],24:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var __assign = undefined && undefined.__assign || Object.assign || function (t) {
  for (var s, i = 1, n = arguments.length; i < n; i++) {
    s = arguments[i];
    for (var p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
  }
  return t;
};
function splitPath(path) {
  return path.split('/').filter(function (p) {
    return p.length > 0;
  });
}
function filterPath(pathParts, namespace) {
  return pathParts.filter(function (part) {
    return namespace.indexOf(part) < 0;
  }).join('/');
}
var startsWith = function startsWith(param, value) {
  return param[0] === value;
};
var startsWith2 = function startsWith2(param, value1, value2) {
  return param[0] === value1 && param[1] === value2;
};
function makeCreateHref(namespace, _createHref) {
  /**
  * Function used to create HREFs that are properly namespaced
  * @typedef {createHref}
  * @name createHref
  * @method createHref
  * @param  {string} path - the HREF that will be appended to the current
  * namespace
  * @return {string} a fully qualified HREF composed from the current
  * namespace and the path provided
  */
  return function createHref(location) {
    if ((typeof location === "undefined" ? "undefined" : _typeof(location)) === 'object' && location !== null) {
      var fullPath = "" + namespace.join('/') + location.pathname;
      return startsWith(fullPath, '/') || startsWith2(fullPath, '#', '/') ? _createHref(__assign({}, location, { pathname: fullPath })) : _createHref(__assign({}, location, { pathname: '/' + fullPath }));
    } else if (typeof location === 'string') {
      var fullPath = "" + namespace.join('/') + location;
      return startsWith(fullPath, '/') || startsWith2(fullPath, '#', '/') ? _createHref({
        pathname: fullPath
      }) : _createHref({
        pathname: '/' + fullPath
      });
    }
  };
}
exports.splitPath = splitPath;
exports.filterPath = filterPath;
exports.makeCreateHref = makeCreateHref;
//# sourceMappingURL=util.js.map
},{}],17:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouterSource = undefined;

var _util = require("./util");

var util = _interopRequireWildcard(_util);

var _adapt = require("@cycle/run/lib/adapt");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function isStrictlyInScope(namespace, path) {
  var pathParts = util.splitPath(path);
  return namespace.every(function (v, i) {
    return pathParts[i] === v;
  });
}
function getFilteredPath(namespace, path) {
  var pathParts = util.splitPath(path);
  return '/' + util.filterPath(pathParts, namespace);
}
var RouterSource = /** @class */function () {
  function RouterSource(_history$, _namespace, _createHref, _routeMatcher) {
    this._history$ = _history$;
    this._namespace = _namespace;
    this._createHref = _createHref;
    this._routeMatcher = _routeMatcher;
    this.history$ = (0, _adapt.adapt)(this._history$);
  }
  RouterSource.prototype.path = function (pathname) {
    var scopedNamespace = this._namespace.concat(util.splitPath(pathname));
    var scopedHistory$ = this._history$.filter(function (_a) {
      var _path = _a.pathname;
      return isStrictlyInScope(scopedNamespace, _path);
    }).remember();
    var createHref = this._createHref;
    return new RouterSource(scopedHistory$, scopedNamespace, createHref, this._routeMatcher);
  };
  RouterSource.prototype.define = function (routes, routeMatcher) {
    var _this = this;
    var namespace = this._namespace;
    var _createHref = this._createHref;
    var createHref = util.makeCreateHref(namespace, _createHref);
    var match$ = this._history$.map(function (location) {
      var matcher = routeMatcher || _this._routeMatcher;
      var filteredPath = getFilteredPath(namespace, location.pathname);
      var _a = matcher(filteredPath, routes),
          path = _a.path,
          value = _a.value;
      return { path: path, value: value, location: location, createHref: createHref };
    }).remember();
    var out$ = (0, _adapt.adapt)(match$);
    out$.createHref = createHref;
    return out$;
  };
  RouterSource.prototype.createHref = function (path) {
    return util.makeCreateHref(this._namespace, this._createHref)(path);
  };
  return RouterSource;
}();
exports.RouterSource = RouterSource;
//# sourceMappingURL=RouterSource.js.map
},{"./util":24,"@cycle/run/lib/adapt":95}],18:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routerify = undefined;

var _xstream = require("xstream");

var _xstream2 = _interopRequireDefault(_xstream);

var _adapt = require("@cycle/run/lib/adapt");

var _RouterSource = require("./RouterSource");

var _history = require("history");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __assign = undefined && undefined.__assign || Object.assign || function (t) {
  for (var s, i = 1, n = arguments.length; i < n; i++) {
    s = arguments[i];
    for (var p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
  }
  return t;
};

/**
 * Wraps main to provide an advanced interface over @cycle/history
 * @public
 * @method routerify
 * @return {main} The augmented main function
 */
function routerify(main, routeMatcher, options) {
  if (typeof main !== 'function') {
    throw new Error('First argument to routerify must be a valid cycle app');
  }
  var opts = __assign({ basename: '/', historyName: 'history', routerName: 'router', omitHistory: true }, options);
  var createHref = function createHref(location) {
    return opts.basename + (0, _history.createPath)(location);
  };
  return function (sources) {
    var routerSource = new _RouterSource.RouterSource(_xstream2.default.fromObservable(sources[opts.historyName]).remember(), [], createHref, routeMatcher);
    var srcs = sources;
    if (opts.omitHistory) {
      delete srcs[opts.historyName];
    }
    var sinks = main(__assign({}, srcs, (_a = {}, _a[opts.routerName] = routerSource, _a)));
    return __assign({}, sinks, (_b = {}, _b[opts.historyName] = (0, _adapt.adapt)(_xstream2.default.merge(sinks[opts.historyName] && !opts.omitHistory ? _xstream2.default.fromObservable(sinks[opts.historyName]) : _xstream2.default.never(), sinks[opts.routerName] ? _xstream2.default.fromObservable(sinks[opts.routerName]) : _xstream2.default.never())), _b));
    var _a, _b;
  };
}
exports.routerify = routerify;
//# sourceMappingURL=routerify.js.map
},{"xstream":16,"@cycle/run/lib/adapt":95,"./RouterSource":17,"history":62}],14:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _routerify = require("./routerify");

Object.keys(_routerify).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _routerify[key];
    }
  });
});

var _RouterSource = require("./RouterSource");

Object.defineProperty(exports, "RouterSource", {
  enumerable: true,
  get: function get() {
    return _RouterSource.RouterSource;
  }
});
},{"./routerify":18,"./RouterSource":17}],19:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isPattern = isPattern;
exports.isRouteDefinition = isRouteDefinition;
exports.traverseRoutes = traverseRoutes;
exports.isNotNull = isNotNull;
exports.splitPath = splitPath;
exports.isParam = isParam;
exports.extractPartial = extractPartial;
exports.unprefixed = unprefixed;
function isPattern(candidate) {
  return candidate.charAt(0) === "/" || candidate === "*";
}
function isRouteDefinition(candidate) {
  return !candidate || (typeof candidate === "undefined" ? "undefined" : _typeof(candidate)) !== "object" ? false : isPattern(Object.keys(candidate)[0]);
}
function traverseRoutes(routes, callback) {
  var keys = Object.keys(routes);
  for (var i = 0; i < keys.length; ++i) {
    var pattern = keys[i];
    if (pattern === "*") continue;
    callback(pattern);
  }
}
function isNotNull(candidate) {
  return candidate !== null;
}
function splitPath(path) {
  return path.split("/").filter(function (s) {
    return !!s;
  });
}
function isParam(candidate) {
  return candidate.match(/:\w+/) !== null;
}
function extractPartial(sourcePath, pattern) {
  var patternParts = splitPath(pattern);
  var sourceParts = splitPath(sourcePath);
  var matchedParts = [];
  for (var i = 0; i < patternParts.length; ++i) {
    matchedParts.push(sourceParts[i]);
  }
  return matchedParts.filter(isNotNull).join("/");
}
function unprefixed(fullString, prefix) {
  return fullString.split(prefix)[1];
}
//# sourceMappingURL=util.js.map
},{}],15:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = switchPath;

var _util = require("./util");

function switchPathInputGuard(path, routes) {
  if (!(0, _util.isPattern)(path)) {
    throw new Error("First parameter to switchPath must be a route path.");
  }
  if (!(0, _util.isRouteDefinition)(routes)) {
    throw new Error("Second parameter to switchPath must be an object " + "containing route patterns.");
  }
}
function validatePath(sourcePath, matchedPath) {
  var sourceParts = (0, _util.splitPath)(sourcePath);
  var matchedParts = (0, _util.splitPath)(matchedPath);
  for (var i = 0; i < matchedParts.length; ++i) {
    if (matchedParts[i] !== sourceParts[i]) {
      return null;
    }
  }
  return "/" + (0, _util.extractPartial)(sourcePath, matchedPath);
}
function betterMatch(candidate, reference) {
  if (!(0, _util.isNotNull)(candidate)) {
    return false;
  }
  if (!(0, _util.isNotNull)(reference)) {
    return true;
  }
  if (!validatePath(candidate, reference)) {
    return false;
  }
  return candidate.length >= reference.length;
}
function matchesWithParams(sourcePath, pattern) {
  var sourceParts = (0, _util.splitPath)(sourcePath);
  var patternParts = (0, _util.splitPath)(pattern);
  var params = patternParts.map(function (part, i) {
    return (0, _util.isParam)(part) ? sourceParts[i] : null;
  }).filter(_util.isNotNull);
  var matched = patternParts.every(function (part, i) {
    return (0, _util.isParam)(part) || part === sourceParts[i];
  });
  return matched ? params : [];
}
function getParamFnValue(paramFn, params) {
  var _paramFn = (0, _util.isRouteDefinition)(paramFn) ? paramFn["/"] : paramFn;
  return typeof _paramFn === "function" ? _paramFn.apply(void 0, params) : _paramFn;
}
function validate(_a) {
  var sourcePath = _a.sourcePath,
      matchedPath = _a.matchedPath,
      matchedValue = _a.matchedValue,
      routes = _a.routes;
  var path = matchedPath ? validatePath(sourcePath, matchedPath) : null;
  var value = matchedValue;
  if (!path) {
    path = routes["*"] ? sourcePath : null;
    value = path ? routes["*"] : null;
  }
  return { path: path, value: value };
}
function switchPath(sourcePath, routes) {
  switchPathInputGuard(sourcePath, routes);
  var matchedPath = null;
  var matchedValue = null;
  (0, _util.traverseRoutes)(routes, function matchPattern(pattern) {
    if (sourcePath.search(pattern) === 0 && betterMatch(pattern, matchedPath)) {
      matchedPath = pattern;
      matchedValue = routes[pattern];
    }
    var params = matchesWithParams(sourcePath, pattern).filter(Boolean);
    if (params.length > 0 && betterMatch(sourcePath, matchedPath)) {
      matchedPath = (0, _util.extractPartial)(sourcePath, pattern);
      matchedValue = getParamFnValue(routes[pattern], params);
    }
    if ((0, _util.isRouteDefinition)(routes[pattern]) && params.length === 0) {
      if (sourcePath !== "/") {
        var child = switchPath((0, _util.unprefixed)(sourcePath, pattern) || "/", routes[pattern]);
        var nestedPath = pattern + child.path;
        if (child.path !== null && betterMatch(nestedPath, matchedPath)) {
          matchedPath = nestedPath;
          matchedValue = child.value;
        }
      }
    }
  });
  return validate({ sourcePath: sourcePath, matchedPath: matchedPath, matchedValue: matchedValue, routes: routes });
}
//# sourceMappingURL=index.js.map
},{"./util":19}],58:[function(require,module,exports) {
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var SVGNS = 'http://www.w3.org/2000/svg';
var modulesNS = ['hook', 'on', 'style', 'class', 'props', 'attrs', 'dataset'];
var slice = Array.prototype.slice;

function isPrimitive(val) {
  return typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean' || (typeof val === "undefined" ? "undefined" : _typeof(val)) === 'symbol' || val === null || val === undefined;
}

function normalizeAttrs(attrs, nsURI, defNS, modules) {
  var map = { ns: nsURI };
  for (var i = 0, len = modules.length; i < len; i++) {
    var mod = modules[i];
    if (attrs[mod]) map[mod] = attrs[mod];
  }
  for (var key in attrs) {
    if (key !== 'key' && key !== 'classNames' && key !== 'selector') {
      var idx = key.indexOf('-');
      if (idx > 0) addAttr(key.slice(0, idx), key.slice(idx + 1), attrs[key]);else if (!map[key]) addAttr(defNS, key, attrs[key]);
    }
  }
  return map;

  function addAttr(namespace, key, val) {
    var ns = map[namespace] || (map[namespace] = {});
    ns[key] = val;
  }
}

function buildFromStringTag(nsURI, defNS, modules, tag, attrs, children) {

  if (attrs.selector) {
    tag = tag + attrs.selector;
  }
  if (attrs.classNames) {
    var cns = attrs.classNames;
    tag = tag + '.' + (Array.isArray(cns) ? cns.join('.') : cns.replace(/\s+/g, '.'));
  }

  return {
    sel: tag,
    data: normalizeAttrs(attrs, nsURI, defNS, modules),
    children: children.map(function (c) {
      return isPrimitive(c) ? { text: c } : c;
    }),
    key: attrs.key
  };
}

function buildFromComponent(nsURI, defNS, modules, tag, attrs, children) {
  var res;
  if (typeof tag === 'function') res = tag(attrs, children);else if (tag && typeof tag.view === 'function') res = tag.view(attrs, children);else if (tag && typeof tag.render === 'function') res = tag.render(attrs, children);else throw "JSX tag must be either a string, a function or an object with 'view' or 'render' methods";
  res.key = attrs.key;
  return res;
}

function flatten(nested, start, flat) {
  for (var i = start, len = nested.length; i < len; i++) {
    var item = nested[i];
    if (Array.isArray(item)) {
      flatten(item, 0, flat);
    } else {
      flat.push(item);
    }
  }
}

function maybeFlatten(array) {
  if (array) {
    for (var i = 0, len = array.length; i < len; i++) {
      if (Array.isArray(array[i])) {
        var flat = array.slice(0, i);
        flatten(array, i, flat);
        array = flat;
        break;
      }
    }
  }
  return array;
}

function buildVnode(nsURI, defNS, modules, tag, attrs, children) {
  attrs = attrs || {};
  children = maybeFlatten(children);
  if (typeof tag === 'string') {
    return buildFromStringTag(nsURI, defNS, modules, tag, attrs, children);
  } else {
    return buildFromComponent(nsURI, defNS, modules, tag, attrs, children);
  }
}

function JSX(nsURI, defNS, modules) {
  return function jsxWithCustomNS(tag, attrs, children) {
    if (arguments.length > 3 || !Array.isArray(children)) children = slice.call(arguments, 2);
    return buildVnode(nsURI, defNS || 'props', modules || modulesNS, tag, attrs, children);
  };
}

module.exports = {
  html: JSX(undefined),
  svg: JSX(SVGNS, 'attrs'),
  JSX: JSX
};
},{}],60:[function(require,module,exports) {
/*!
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
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],13:[function(require,module,exports) {
module.exports = {
  "appBar": "_appBar_i7kjf_1",
  "logo": "_logo_i7kjf_7",
  "link": "_link_i7kjf_14"
};
},{}],12:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppBar = AppBar;

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _AppBar = require("./AppBar.less");

var _AppBar2 = _interopRequireDefault(_AppBar);

var _snabbdomJsx = require("snabbdom-jsx");

var _xstream = require("xstream");

var _xstream2 = _interopRequireDefault(_xstream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AppBar() {
  return {
    DOM: _xstream2.default.of((0, _snabbdomJsx.html)(
      "header",
      { className: (0, _classnames2.default)(_AppBar2.default.appBar, 'row', 'middle-xs') },
      (0, _snabbdomJsx.html)(
        "a",
        { href: "/", className: (0, _classnames2.default)(_AppBar2.default.logo, 'col-xs-10') },
        "Retain"
      ),
      (0, _snabbdomJsx.html)(
        "nav",
        { className: "col-xs-2" },
        (0, _snabbdomJsx.html)(
          "div",
          { className: "row middle-xs between-xs" },
          (0, _snabbdomJsx.html)(
            "a",
            { className: _AppBar2.default.link, href: "/about" },
            "About"
          ),
          (0, _snabbdomJsx.html)(
            "span",
            { className: _AppBar2.default.link },
            "SignOut"
          )
        )
      )
    ))
  };
}
},{"classnames":60,"./AppBar.less":13,"snabbdom-jsx":58,"xstream":16}],20:[function(require,module,exports) {
module.exports = {
  "warpper": "_warpper_xwmmk_1",
  "notes": "_notes_xwmmk_4",
  "creator": "_creator_xwmmk_7"
};
},{}],30:[function(require,module,exports) {
module.exports = {
  "noteCreator": "_noteCreator_15t9k_1",
  "title": "_title_15t9k_6"
};
},{}],21:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var actionTypes = exports.actionTypes = {
  createNote: 'createNote',
  fetchNotes: 'fetchNotes',
  deleteNote: 'deleteNote'
};
},{}],22:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.NoteCreator = NoteCreator;

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _snabbdomJsx = require("snabbdom-jsx");

var _xstream = require("xstream");

var _xstream2 = _interopRequireDefault(_xstream);

var _sampleCombine = require("xstream/extra/sampleCombine");

var _sampleCombine2 = _interopRequireDefault(_sampleCombine);

var _NoteCreator = require("./NoteCreator.less");

var _NoteCreator2 = _interopRequireDefault(_NoteCreator);

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NoteCreator(_ref) {
  var DOM = _ref.DOM;

  return {
    DOM: _xstream2.default.of((0, _snabbdomJsx.html)(
      "div",
      { className: (0, _classnames2.default)(_NoteCreator2.default.noteCreator, 'shadow-2') },
      (0, _snabbdomJsx.html)(
        "form",
        { className: "row" },
        (0, _snabbdomJsx.html)("input", {
          type: "text",
          id: "new-note-title",
          name: "newNoteTitle",
          placeholder: "Title",
          className: (0, _classnames2.default)('col-xs-10', _NoteCreator2.default.title),
          autoComplete: "off"
        }),
        (0, _snabbdomJsx.html)("input", {
          type: "text",
          id: "new-note-value",
          name: "newNoteValue",
          placeholder: "Take a note...",
          className: "col-xs-10",
          autoComplete: "off"
        }),
        (0, _snabbdomJsx.html)(
          "div",
          { className: "actions col-xs-12 row between-xs" },
          (0, _snabbdomJsx.html)(
            "button",
            { id: "new-note-submit", type: "submit", className: "btn-light" },
            "Done"
          )
        )
      )
    )),
    HTTP: DOM.select('#new-note-submit').events('click').map(function (e) {
      return e.preventDefault();
    }).compose((0, _sampleCombine2.default)(DOM.select('#new-note-title').element(), DOM.select('#new-note-value').element())).map(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 3),
          titleEl = _ref3[1],
          valueEl = _ref3[2];

      var title = titleEl.value;
      var value = valueEl.value;

      if (!title || !value) {
        return _xstream2.default.empty();
      }

      // reset 
      titleEl.value = '';
      valueEl.value = '';

      return {
        url: 'http://127.0.0.1:3000/notes',
        method: 'POST',
        category: _constants.actionTypes.createNote,
        headers: {
          Authorization: "Bearer " + localStorage.token
        },
        send: {
          title: title,
          value: value
        }
      };
    })
  };
}
},{"classnames":60,"snabbdom-jsx":58,"xstream":16,"xstream/extra/sampleCombine":94,"./NoteCreator.less":30,"../../constants":21}],35:[function(require,module,exports) {
module.exports = {
  "noteCard": "_noteCard_w0dif_1",
  "title": "_title_w0dif_8",
  "value": "_value_w0dif_14",
  "icon": "_icon_w0dif_19"
};
},{}],23:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoteCard = NoteCard;

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _NoteCard = require("./NoteCard.less");

var _NoteCard2 = _interopRequireDefault(_NoteCard);

var _snabbdomJsx = require("snabbdom-jsx");

var _xstream = require("xstream");

var _xstream2 = _interopRequireDefault(_xstream);

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NoteCard(_ref) {
  var DOM = _ref.DOM,
      _ref$props = _ref.props,
      note = _ref$props.note,
      className = _ref$props.className;

  return {
    DOM: _xstream2.default.of((0, _snabbdomJsx.html)(
      "div",
      { className: (0, _classnames2.default)('row shadow-1', _NoteCard2.default.noteCard, className) },
      (0, _snabbdomJsx.html)(
        "div",
        { className: _NoteCard2.default.icon },
        (0, _snabbdomJsx.html)(
          "i",
          { className: "material-icons" },
          "check"
        )
      ),
      (0, _snabbdomJsx.html)(
        "div",
        { className: (0, _classnames2.default)('col-xs-12', _NoteCard2.default.title) },
        note.title
      ),
      (0, _snabbdomJsx.html)(
        "div",
        { className: (0, _classnames2.default)('col-xs-12', _NoteCard2.default.value) },
        note.value
      )
    )),
    HTTP: DOM.select("." + _NoteCard2.default.icon).events('click').mapTo({
      url: "http://127.0.0.1:3000/notes/" + note.id,
      headers: {
        Authorization: "Bearer " + localStorage.token
      },
      method: 'DELETE',
      category: _constants.actionTypes.deleteNote
    })
  };
}
},{"classnames":60,"./NoteCard.less":35,"snabbdom-jsx":58,"xstream":16,"../../constants":21}],71:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function checkIsolateArgs(dataflowComponent, scope) {
  if (typeof dataflowComponent !== "function") {
    throw new Error("First argument given to isolate() must be a " + "'dataflowComponent' function");
  }
  if (scope === null) {
    throw new Error("Second argument given to isolate() must not be null");
  }
}
function normalizeScopes(sources, scopes, randomScope) {
  var perChannel = {};
  Object.keys(sources).forEach(function (channel) {
    if (typeof scopes === 'string') {
      perChannel[channel] = scopes;
      return;
    }
    var candidate = scopes[channel];
    if (typeof candidate !== 'undefined') {
      perChannel[channel] = candidate;
      return;
    }
    var wildcard = scopes['*'];
    if (typeof wildcard !== 'undefined') {
      perChannel[channel] = wildcard;
      return;
    }
    perChannel[channel] = randomScope;
  });
  return perChannel;
}
function isolateAllSources(outerSources, scopes) {
  var innerSources = {};
  for (var channel in outerSources) {
    var outerSource = outerSources[channel];
    if (outerSources.hasOwnProperty(channel) && outerSource && scopes[channel] !== null && typeof outerSource.isolateSource === 'function') {
      innerSources[channel] = outerSource.isolateSource(outerSource, scopes[channel]);
    } else if (outerSources.hasOwnProperty(channel)) {
      innerSources[channel] = outerSources[channel];
    }
  }
  return innerSources;
}
function isolateAllSinks(sources, innerSinks, scopes) {
  var outerSinks = {};
  for (var channel in innerSinks) {
    var source = sources[channel];
    var innerSink = innerSinks[channel];
    if (innerSinks.hasOwnProperty(channel) && source && scopes[channel] !== null && typeof source.isolateSink === 'function') {
      outerSinks[channel] = source.isolateSink(innerSink, scopes[channel]);
    } else if (innerSinks.hasOwnProperty(channel)) {
      outerSinks[channel] = innerSinks[channel];
    }
  }
  return outerSinks;
}
var counter = 0;
function newScope() {
  return "cycle" + ++counter;
}
/**
 * Takes a `component` function and a `scope`, and returns an isolated version
 * of the `component` function.
 *
 * When the isolated component is invoked, each source provided to it is
 * isolated to the given `scope` using `source.isolateSource(source, scope)`,
 * if possible. Likewise, the sinks returned from the isolated component are
 * isolated to the given `scope` using `source.isolateSink(sink, scope)`.
 *
 * The `scope` can be a string or an object. If it is anything else than those
 * two types, it will be converted to a string. If `scope` is an object, it
 * represents "scopes per channel", allowing you to specify a different scope
 * for each key of sources/sinks. For instance
 *
 * ```js
 * const childSinks = isolate(Child, {DOM: 'foo', HTTP: 'bar'})(sources);
 * ```
 *
 * You can also use a wildcard `'*'` to use as a default for source/sinks
 * channels that did not receive a specific scope:
 *
 * ```js
 * // Uses 'bar' as the isolation scope for HTTP and other channels
 * const childSinks = isolate(Child, {DOM: 'foo', '*': 'bar'})(sources);
 * ```
 *
 * If a channel's value is null, then that channel's sources and sinks won't be
 * isolated. If the wildcard is null and some channels are unspecified, those
 * channels won't be isolated. If you don't have a wildcard and some channels
 * are unspecified, then `isolate` will generate a random scope.
 *
 * ```js
 * // Does not isolate HTTP requests
 * const childSinks = isolate(Child, {DOM: 'foo', HTTP: null})(sources);
 * ```
 *
 * If the `scope` argument is not provided at all, a new scope will be
 * automatically created. This means that while **`isolate(component, scope)` is
 * pure** (referentially transparent), **`isolate(component)` is impure** (not
 * referentially transparent). Two calls to `isolate(Foo, bar)` will generate
 * the same component. But, two calls to `isolate(Foo)` will generate two
 * distinct components.
 *
 * ```js
 * // Uses some arbitrary string as the isolation scope for HTTP and other channels
 * const childSinks = isolate(Child, {DOM: 'foo'})(sources);
 * ```
 *
 * Note that both `isolateSource()` and `isolateSink()` are static members of
 * `source`. The reason for this is that drivers produce `source` while the
 * application produces `sink`, and it's the driver's responsibility to
 * implement `isolateSource()` and `isolateSink()`.
 *
 * _Note for Typescript users:_ `isolate` is not currently type-transparent and
 * will explicitly convert generic type arguments to `any`. To preserve types in
 * your components, you can use a type assertion:
 *
 * ```ts
 * // if Child is typed `Component<Sources, Sinks>`
 * const isolatedChild = isolate( Child ) as Component<Sources, Sinks>;
 * ```
 *
 * @param {Function} component a function that takes `sources` as input
 * and outputs a collection of `sinks`.
 * @param {String} scope an optional string that is used to isolate each
 * `sources` and `sinks` when the returned scoped component is invoked.
 * @return {Function} the scoped component function that, as the original
 * `component` function, takes `sources` and returns `sinks`.
 * @function isolate
 */
function isolate(component, scope) {
  if (scope === void 0) {
    scope = newScope();
  }
  checkIsolateArgs(component, scope);
  var randomScope = (typeof scope === "undefined" ? "undefined" : _typeof(scope)) === 'object' ? newScope() : '';
  var scopes = typeof scope === 'string' || (typeof scope === "undefined" ? "undefined" : _typeof(scope)) === 'object' ? scope : scope.toString();
  return function wrappedComponent(outerSources) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      rest[_i - 1] = arguments[_i];
    }
    var scopesPerChannel = normalizeScopes(outerSources, scopes, randomScope);
    var innerSources = isolateAllSources(outerSources, scopesPerChannel);
    var innerSinks = component.apply(void 0, [innerSources].concat(rest));
    var outerSinks = isolateAllSinks(outerSources, innerSinks, scopesPerChannel);
    return outerSinks;
  };
}
isolate.reset = function () {
  return counter = 0;
};
exports.default = isolate;
//# sourceMappingURL=index.js.map
},{}],10:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.Home = Home;

var _xstream = require("xstream");

var _xstream2 = _interopRequireDefault(_xstream);

var _snabbdomJsx = require("snabbdom-jsx");

var _AppBar = require("../../shared/components/AppBar/AppBar");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _Home = require("./Home.less");

var _Home2 = _interopRequireDefault(_Home);

var _NoteCreator = require("./components/NoteCreator/NoteCreator");

var _NoteCard = require("./components/NoteCard/NoteCard");

var _constants = require("./constants");

var _sampleCombine = require("xstream/extra/sampleCombine");

var _sampleCombine2 = _interopRequireDefault(_sampleCombine);

var _isolate = require("@cycle/isolate");

var _isolate2 = _interopRequireDefault(_isolate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function intent(source) {
  var allNotes$ = source.HTTP.select(_constants.actionTypes.fetchNotes).flatten().map(function (res) {
    return res.body;
  });

  var newNote$ = source.HTTP.select(_constants.actionTypes.createNote).flatten().map(function (res) {
    return res.body;
  });

  var deleteNote$ = source.HTTP.select(_constants.actionTypes.deleteNote).flatten();

  return _xstream2.default.merge(allNotes$.map(function (notes) {
    return { type: _constants.actionTypes.fetchNotes, payload: notes };
  }), newNote$.map(function (newNote) {
    return { type: _constants.actionTypes.createNote, payload: newNote };
  }), deleteNote$.map(function () {
    return { type: _constants.actionTypes.deleteNote };
  })).startWith({ type: undefined });
}

function modal(notesActions$) {
  var state = {
    notes: []
  };

  return notesActions$.map(function (action) {
    switch (action.type) {
      case _constants.actionTypes.fetchNotes:
        state = {
          notes: action.payload
        };
        break;
      case _constants.actionTypes.createNote:
        state = {
          notes: state.notes.concat([action.payload])
        };
        break;
    }

    return state;
  });
}

function view(DOMSink, state$) {

  var appBar = (0, _AppBar.AppBar)();
  var noteCreator = (0, _NoteCreator.NoteCreator)({ DOM: DOMSink });

  var noteCards$ = state$.map(function (_ref) {
    var notes = _ref.notes;

    return notes.map(function (note) {
      return (0, _isolate2.default)(_NoteCard.NoteCard, note.id)({ DOM: DOMSink, props: { note: note, className: 'col-xs-4' } });
    });
  });

  return {
    vdom$: noteCards$.map(function (noteCards) {
      return _xstream2.default.combine.apply(_xstream2.default, _toConsumableArray(noteCards.map(function (noteCard) {
        return noteCard.DOM;
      })));
    }).flatten().compose((0, _sampleCombine2.default)(appBar.DOM, noteCreator.DOM)).map(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 3),
          NoteCardViews = _ref3[0],
          AppBarView = _ref3[1],
          NoteCreatorView = _ref3[2];

      return (0, _snabbdomJsx.html)(
        "div",
        null,
        AppBarView,
        (0, _snabbdomJsx.html)(
          "div",
          { className: (0, _classnames2.default)(_Home2.default.warpper, 'row center-xs') },
          (0, _snabbdomJsx.html)(
            "div",
            { className: (0, _classnames2.default)(_Home2.default.creator, 'col-xs-6') },
            NoteCreatorView
          ),
          (0, _snabbdomJsx.html)(
            "div",
            { className: "notes col-xs-8" },
            (0, _snabbdomJsx.html)(
              "div",
              { className: "row between-xs" },
              NoteCardViews
            )
          )
        )
      );
    }),
    request$: _xstream2.default.merge(noteCreator.HTTP, noteCards$.map(function (noteCards) {
      return _xstream2.default.merge.apply(_xstream2.default, _toConsumableArray(noteCards.map(function (noteCard) {
        return noteCard.HTTP;
      })));
    }).flatten())
  };
}

function Home(source) {
  var fetchNotes$ = _xstream2.default.merge(_xstream2.default.of({
    url: 'http://127.0.0.1:3000/notes',
    category: _constants.actionTypes.fetchNotes,
    headers: {
      Authorization: "Bearer " + localStorage.token
    }
  }), source.HTTP.select(_constants.actionTypes.deleteNote).flatten().mapTo({
    url: 'http://127.0.0.1:3000/notes',
    headers: {
      Authorization: "Bearer " + localStorage.token
    },
    category: _constants.actionTypes.fetchNotes
  }));

  var actions$ = intent(source);
  var state$ = modal(actions$);

  var _view = view(source.DOM, state$),
      vdom$ = _view.vdom$,
      request$ = _view.request$;

  return {
    DOM: vdom$,
    HTTP: _xstream2.default.merge(request$, fetchNotes$),
    router: actions$.replaceError(function (e) {
      if (e.response.status === 401) {
        return _xstream2.default.of('/login');
      }
      return _xstream2.default.throw(e);
    }).last()
  };
}
},{"xstream":16,"snabbdom-jsx":58,"../../shared/components/AppBar/AppBar":12,"classnames":60,"./Home.less":20,"./components/NoteCreator/NoteCreator":22,"./components/NoteCard/NoteCard":23,"./constants":21,"xstream/extra/sampleCombine":94,"@cycle/isolate":71}],9:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.About = About;

var _xstream = require("xstream");

var _xstream2 = _interopRequireDefault(_xstream);

var _snabbdomJsx = require("snabbdom-jsx");

var _AppBar = require("../../shared/components/AppBar/AppBar");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function view() {
  var appBar = (0, _AppBar.AppBar)();
  return appBar.DOM.map(function (appBarDOM) {
    return (0, _snabbdomJsx.html)(
      "div",
      null,
      appBarDOM,
      (0, _snabbdomJsx.html)(
        "h1",
        null,
        "About"
      )
    );
  });
}

function About() {
  var vdom$ = view();

  return {
    DOM: vdom$
  };
}
},{"xstream":16,"snabbdom-jsx":58,"../../shared/components/AppBar/AppBar":12}],25:[function(require,module,exports) {
module.exports = {
  "auth": "_auth_1e6qu_1",
  "inputs": "_inputs_1e6qu_14",
  "title": "_title_1e6qu_18",
  "error": "_error_1e6qu_23"
};
},{}],11:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.Login = Login;

var _snabbdomJsx = require("snabbdom-jsx");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _xstream = require("xstream");

var _xstream2 = _interopRequireDefault(_xstream);

var _Login = require("./Login.less");

var _Login2 = _interopRequireDefault(_Login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function intent(source) {
  var emailValue = '';
  var passwordValue = '';

  var emailInputEmiter$ = source.DOM.select('#email').events('input');
  var passwordInputEmiter$ = source.DOM.select('#password').events('input');

  var loginEmiter$ = source.DOM.select('#login-button').events('click');

  var emailValue$ = emailInputEmiter$.map(function (e) {
    emailValue = e.target.value;
    return emailValue;
  }).startWith('');

  var passwordValue$ = passwordInputEmiter$.map(function (e) {
    passwordValue = e.target.value;
    return passwordValue;
  }).startWith('');

  var isEmailDirty$ = emailInputEmiter$.mapTo(true).startWith(false);
  var isPasswordDirty$ = passwordInputEmiter$.mapTo(true).startWith(false);

  return {
    request$: loginEmiter$.map(function (event) {
      return event.preventDefault();
    }).map(function () {
      if (emailValue.length === 0 || passwordValue.length === 0) {
        return _xstream2.default.empty();
      }

      return {
        url: 'http://127.0.0.1:3000/auth',
        category: 'login',
        send: {
          email: emailValue,
          password: passwordValue
        }
      };
    }),
    router$: source.HTTP.select('login').flatten().map(function (res) {
      return localStorage.token = res.body.token;
    }).mapTo('/'),
    state$: _xstream2.default.combine(emailValue$, passwordValue$, isEmailDirty$, isPasswordDirty$).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 4),
          email = _ref2[0],
          password = _ref2[1],
          isEmailDirty = _ref2[2],
          isPasswordDirty = _ref2[3];

      return {
        email: email,
        password: password,
        isEmailDirty: isEmailDirty,
        isPasswordDirty: isPasswordDirty
      };
    })
  };
}

function view(state$) {
  return state$.map(function (_ref3) {
    var email = _ref3.email,
        password = _ref3.password,
        isEmailDirty = _ref3.isEmailDirty,
        isPasswordDirty = _ref3.isPasswordDirty;

    return (0, _snabbdomJsx.html)(
      "div",
      { className: (0, _classnames2.default)(_Login2.default.auth, 'row center-xs middle-xs') },
      (0, _snabbdomJsx.html)(
        "form",
        { className: "col-xs-6 shadow-2" },
        (0, _snabbdomJsx.html)(
          "div",
          { className: (0, _classnames2.default)(_Login2.default.inputs, 'row center-xs middle-xs') },
          (0, _snabbdomJsx.html)(
            "h3",
            { className: (0, _classnames2.default)(_Login2.default.title, 'col-xs-8') },
            "Sign In"
          ),
          (0, _snabbdomJsx.html)("input", {
            className: "col-xs-8",
            id: "email",
            type: "email",
            name: "email",
            placeholder: "email",
            required: true
          }),
          isEmailDirty && email.length === 0 ? (0, _snabbdomJsx.html)(
            "div",
            { className: _Login2.default.error },
            "email is invalid"
          ) : '',
          (0, _snabbdomJsx.html)("input", {
            className: "col-xs-8",
            id: "password",
            type: "password",
            name: "password",
            placeholder: "password",
            required: true
          }),
          isPasswordDirty && password.length === 0 ? (0, _snabbdomJsx.html)(
            "div",
            { className: _Login2.default.error },
            "password is required"
          ) : '',
          (0, _snabbdomJsx.html)(
            "div",
            { className: "col-xs-12" },
            (0, _snabbdomJsx.html)(
              "div",
              { className: "row center-xs" },
              (0, _snabbdomJsx.html)(
                "button",
                { id: "login-button", className: "btn-light", type: "submit" },
                "Login"
              )
            )
          )
        )
      )
    );
  });
}

function Login(source) {
  var _intent = intent(source),
      request$ = _intent.request$,
      router$ = _intent.router$,
      state$ = _intent.state$;

  var vdom$ = view(state$);

  return {
    DOM: vdom$,
    router: router$,
    HTTP: request$
  };
}
},{"snabbdom-jsx":58,"classnames":60,"xstream":16,"./Login.less":25}],7:[function(require,module,exports) {
module.exports = {
  "app": "_app_1l65k_1"
};
},{}],2:[function(require,module,exports) {
"use strict";

var _dom = require("@cycle/dom");

var _history = require("@cycle/history");

var _http = require("@cycle/http");

var _run = require("@cycle/run");

var _cyclicRouter = require("cyclic-router");

var _switchPath = require("switch-path");

var _switchPath2 = _interopRequireDefault(_switchPath);

var _Home = require("./app/Home/Home");

var _About = require("./app/About/About");

var _Login = require("./app/Login/Login");

var _xstream = require("xstream");

var _xstream2 = _interopRequireDefault(_xstream);

require("./main.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function main(source) {
  var match$ = source.router.define({
    '/': _Home.Home,
    '/login': _Login.Login,
    '/about': _About.About
  });

  var page$ = match$.map(function (_ref) {
    var path = _ref.path,
        value = _ref.value;

    return value(Object.assign({}, source, {
      router: source.router.path(path)
    }));
  });

  return {
    DOM: page$.map(function (c) {
      return c.DOM;
    }).flatten(),
    router: page$.map(function (c) {
      return c.router || _xstream2.default.empty();
    }).flatten(),
    HTTP: _xstream2.default.merge(page$.map(function (c) {
      return c.HTTP || _xstream2.default.empty();
    }).flatten())
  };
}

var drivers = {
  DOM: (0, _dom.makeDOMDriver)('#app'),
  history: (0, _history.captureClicks)((0, _history.makeHashHistoryDriver)()),
  HTTP: (0, _http.makeHTTPDriver)()
};

(0, _run.run)((0, _cyclicRouter.routerify)(main, _switchPath2.default), drivers);
},{"@cycle/dom":26,"@cycle/history":28,"@cycle/http":27,"@cycle/run":29,"cyclic-router":14,"switch-path":15,"./app/Home/Home":10,"./app/About/About":9,"./app/Login/Login":11,"xstream":16,"./main.less":7}]},{},[2])