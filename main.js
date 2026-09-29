"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to2, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to2;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports2, module2) {
    var s = 1e3;
    var m2 = s * 60;
    var h3 = m2 * 60;
    var d2 = h3 * 24;
    var w2 = d2 * 7;
    var y2 = d2 * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y2;
        case "weeks":
        case "week":
        case "w":
          return n * w2;
        case "days":
        case "day":
        case "d":
          return n * d2;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h3;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m2;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms2) {
      var msAbs = Math.abs(ms2);
      if (msAbs >= d2) {
        return Math.round(ms2 / d2) + "d";
      }
      if (msAbs >= h3) {
        return Math.round(ms2 / h3) + "h";
      }
      if (msAbs >= m2) {
        return Math.round(ms2 / m2) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms2 / s) + "s";
      }
      return ms2 + "ms";
    }
    function fmtLong(ms2) {
      var msAbs = Math.abs(ms2);
      if (msAbs >= d2) {
        return plural(ms2, msAbs, d2, "day");
      }
      if (msAbs >= h3) {
        return plural(ms2, msAbs, h3, "hour");
      }
      if (msAbs >= m2) {
        return plural(ms2, msAbs, m2, "minute");
      }
      if (msAbs >= s) {
        return plural(ms2, msAbs, s, "second");
      }
      return ms2 + " ms";
    }
    function plural(ms2, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms2 / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports2, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms2 = curr - (prevTime || curr);
          self.diff = ms2;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v2) => {
            enableOverride = v2;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
        for (const ns2 of split) {
          if (ns2[0] === "-") {
            createDebug.skips.push(ns2.slice(1));
          } else {
            createDebug.names.push(ns2);
          }
        }
      }
      function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search.length) {
          if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
            if (template[templateIndex] === "*") {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (templateIndex < template.length && template[templateIndex] === "*") {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      function disable() {
        const namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name, skip)) {
            return false;
          }
        }
        for (const ns2 of createDebug.names) {
          if (matchesTemplate(name, ns2)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports2, module2) {
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = localstorage();
    exports2.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports2.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m2;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m2 = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m2[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c3 = "color: " + this.color;
      args.splice(1, 0, c3, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c3);
    }
    exports2.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports2.storage.setItem("debug", namespaces);
        } else {
          exports2.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r2;
      try {
        r2 = exports2.storage.getItem("debug") || exports2.storage.getItem("DEBUG");
      } catch (error) {
      }
      if (!r2 && typeof process !== "undefined" && "env" in process) {
        r2 = process.env.DEBUG;
      }
      return r2;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.j = function(v2) {
      try {
        return JSON.stringify(v2);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports2, module2) {
    var tty = require("tty");
    var util = require("util");
    exports2.init = init;
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports2.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require("supports-color");
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports2.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports2.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_3, k2) => {
        return k2.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c3 = this.color;
        const colorCode = "\x1B[3" + (c3 < 8 ? c3 : "8;5;" + c3);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports2.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.formatWithOptions(exports2.inspectOpts, ...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports2.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.o = function(v2) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v2, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v2) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v2, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports2, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/@kwsites/file-exists/dist/src/index.js
var require_src2 = __commonJS({
  "node_modules/@kwsites/file-exists/dist/src/index.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var fs_1 = require("fs");
    var debug_1 = __importDefault(require_src());
    var log = debug_1.default("@kwsites/file-exists");
    function check(path4, isFile, isDirectory) {
      log(`checking %s`, path4);
      try {
        const stat2 = fs_1.statSync(path4);
        if (stat2.isFile() && isFile) {
          log(`[OK] path represents a file`);
          return true;
        }
        if (stat2.isDirectory() && isDirectory) {
          log(`[OK] path represents a directory`);
          return true;
        }
        log(`[FAIL] path represents something other than a file or directory`);
        return false;
      } catch (e) {
        if (e.code === "ENOENT") {
          log(`[FAIL] path is not accessible: %o`, e);
          return false;
        }
        log(`[FATAL] %o`, e);
        throw e;
      }
    }
    function exists(path4, type = exports2.READABLE) {
      return check(path4, (type & exports2.FILE) > 0, (type & exports2.FOLDER) > 0);
    }
    exports2.exists = exists;
    exports2.FILE = 1;
    exports2.FOLDER = 2;
    exports2.READABLE = exports2.FILE + exports2.FOLDER;
  }
});

// node_modules/@kwsites/file-exists/dist/index.js
var require_dist = __commonJS({
  "node_modules/@kwsites/file-exists/dist/index.js"(exports2) {
    "use strict";
    function __export2(m2) {
      for (var p2 in m2) if (!exports2.hasOwnProperty(p2)) exports2[p2] = m2[p2];
    }
    Object.defineProperty(exports2, "__esModule", { value: true });
    __export2(require_src2());
  }
});

// node_modules/@kwsites/promise-deferred/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/@kwsites/promise-deferred/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createDeferred = exports2.deferred = void 0;
    function deferred() {
      let done;
      let fail;
      let status = "pending";
      const promise = new Promise((_done, _fail) => {
        done = _done;
        fail = _fail;
      });
      return {
        promise,
        done(result) {
          if (status === "pending") {
            status = "resolved";
            done(result);
          }
        },
        fail(error) {
          if (status === "pending") {
            status = "rejected";
            fail(error);
          }
        },
        get fulfilled() {
          return status !== "pending";
        },
        get status() {
          return status;
        }
      };
    }
    exports2.deferred = deferred;
    exports2.createDeferred = deferred;
    exports2.default = deferred;
  }
});

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => MySimplePlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian5 = require("obsidian");

// node_modules/@simple-git/args-pathspec/dist/index.mjs
var t = /* @__PURE__ */ new WeakMap();
function c(...n) {
  const e = new String(n);
  return t.set(e, n), e;
}
function r(n) {
  return n instanceof String && t.has(n);
}
function o(n) {
  var _a;
  return (_a = t.get(n)) != null ? _a : [];
}

// node_modules/simple-git/dist/index.mjs
var import_file_exists = __toESM(require_dist(), 1);
var import_node_child_process = require("node:child_process");
var import_debug = __toESM(require_src(), 1);
var import_promise_deferred = __toESM(require_dist2(), 1);
var import_node_path = require("node:path");

// node_modules/@simple-git/argv-parser/dist/index.mjs
function* x(e, n) {
  const t2 = n === "global";
  for (const o2 of e)
    o2.isGlobal === t2 && (yield o2);
}
var P = /* @__PURE__ */ new Set([
  "--add",
  "--edit",
  "--remove-section",
  "--rename-section",
  "--replace-all",
  "--unset",
  "--unset-all",
  "-e"
]);
var S = /* @__PURE__ */ new Set([
  "--get",
  "--get-all",
  "--get-color",
  "--get-colorbool",
  "--get-regexp",
  "--get-urlmatch",
  "--list",
  "-l"
]);
var E = /* @__PURE__ */ new Set([
  "edit",
  "remove-section",
  "rename-section",
  "set",
  "unset"
]);
var F = /* @__PURE__ */ new Set(["get", "get-color", "get-colorbool", "list"]);
function A(e, n) {
  var _a;
  for (const { name: o2 } of x(e, "task")) {
    if (P.has(o2))
      return w(true, n);
    if (S.has(o2))
      return w(false, n);
  }
  const t2 = (_a = n.at(0)) == null ? void 0 : _a.toLowerCase();
  return t2 === void 0 ? null : E.has(t2) ? w(true, n.slice(1)) : F.has(t2) ? w(false, n.slice(1)) : n.length === 1 ? w(false, n) : w(true, n);
}
function w(e = false, n = []) {
  var _a;
  const t2 = (_a = n.at(0)) == null ? void 0 : _a.toLowerCase();
  return t2 === void 0 ? null : {
    isWrite: e,
    isRead: !e,
    key: t2,
    value: n.at(1)
  };
}
function O(e, n) {
  return n.isWrite && n.value !== void 0 ? { key: n.key, value: n.value, scope: e } : { key: n.key, scope: e };
}
function G(e) {
  const n = (e == null ? void 0 : e.indexOf("=")) || -1;
  return !e || n < 0 ? null : {
    key: e.slice(0, n).trim().toLowerCase(),
    value: e.slice(n + 1)
  };
}
function M(e) {
  for (const { name: n } of x(e, "task"))
    switch (n) {
      case "--global":
        return "global";
      case "--system":
        return "system";
      case "--worktree":
        return "worktree";
      case "--local":
        return "local";
      case "--file":
      case "-f":
        return "file";
    }
  return "local";
}
function N({ name: e }) {
  if (e === "-c" || e === "--config")
    return "inline";
  if (e === "--config-env")
    return "env";
}
function* $(e) {
  for (const n of e) {
    const t2 = N(n), o2 = t2 && G(n.value);
    o2 && (yield {
      ...o2,
      scope: t2
    });
  }
}
function D(e, n, t2) {
  const o2 = {
    read: [],
    write: [...$(n)]
  };
  return e === "config" && L(
    o2,
    M(n),
    A(n, t2)
  ), o2;
}
function L(e, n, t2) {
  if (t2 === null)
    return;
  const o2 = O(n, t2);
  t2.isWrite ? e.write.push(o2) : e.read.push(o2);
}
var C = {
  short: /* @__PURE__ */ new Map([
    ["c", true]
    //  -c <k=v>    set config key for this invocation
  ])
};
var I = {
  short: new Map([
    ["C", true],
    //  -C <path>   change working directory
    ["P", false],
    // -P          no pager (alias for --no-pager)
    ["h", false],
    // -h          help
    ["p", false],
    // -p          paginate
    ["v", false],
    // -v          version
    ...C.short.entries()
  ]),
  long: /* @__PURE__ */ new Set([
    "attr-source",
    "config-env",
    "exec-path",
    "git-dir",
    "list-cmds",
    "namespace",
    "super-prefix",
    "work-tree"
  ])
};
var R = {
  clone: {
    short: /* @__PURE__ */ new Map([
      ["b", true],
      // -b <branch>
      ["j", true],
      // -j <n>          parallel jobs
      ["l", false],
      // -l local
      ["n", false],
      // -n no-checkout
      ["o", true],
      // -o <name>       remote name
      ["q", false],
      // -q quiet
      ["s", false],
      // -s shared
      ["u", true]
      // -u <upload-pack>
    ]),
    long: /* @__PURE__ */ new Set(["branch", "config", "jobs", "origin", "upload-pack", "u", "template"])
  },
  commit: {
    short: /* @__PURE__ */ new Map([
      ["C", true],
      // -C <commit>  reuse message
      ["F", true],
      // -F <file>    read message from file
      ["c", true],
      // -c <commit>  reedit message
      ["m", true],
      // -m <msg>
      ["t", true]
      // -t <template>
    ]),
    long: /* @__PURE__ */ new Set(["file", "message", "reedit-message", "reuse-message", "template"])
  },
  config: {
    short: /* @__PURE__ */ new Map([
      ["e", false],
      // -e  open editor
      ["f", true],
      //  -f <file>
      ["l", false]
      // -l  list
    ]),
    long: /* @__PURE__ */ new Set(["blob", "comment", "default", "file", "type", "value"])
  },
  fetch: {
    short: /* @__PURE__ */ new Map(),
    long: /* @__PURE__ */ new Set(["upload-pack"])
  },
  init: {
    short: /* @__PURE__ */ new Map(),
    long: /* @__PURE__ */ new Set(["template"])
  },
  pull: {
    short: /* @__PURE__ */ new Map(),
    long: /* @__PURE__ */ new Set(["upload-pack"])
  },
  push: {
    short: /* @__PURE__ */ new Map(),
    long: /* @__PURE__ */ new Set(["exec", "receive-pack"])
  },
  rebase: {
    short: /* @__PURE__ */ new Map([
      ["X", true],
      // -X <option>   strategy option
      ["f", false],
      // -f force-rebase
      ["i", false],
      // -i interactive
      ["k", false],
      // -k keep-base
      ["m", false],
      // -m merge
      ["n", false],
      // -n no-stat
      ["q", false],
      // -q quiet
      ["r", false],
      // -r rebase-merges
      ["s", true],
      // -s <strategy>
      ["v", false],
      // -v verbose
      ["x", true]
      // -x <cmd>      exec
    ]),
    long: /* @__PURE__ */ new Set(["exec", "onto", "strategy", "strategy-option"])
  }
};
var T = { short: /* @__PURE__ */ new Map(), long: /* @__PURE__ */ new Set() };
function B(e) {
  var _a;
  const n = (_a = R[e != null ? e : ""]) != null ? _a : T;
  return {
    short: new Map([...C.short.entries(), ...n.short.entries()]),
    long: n.long
  };
}
function b(e, n = I) {
  if (e.startsWith("--")) {
    const t2 = e.indexOf("=");
    if (t2 > 2)
      return [{ name: e.slice(0, t2), value: e.slice(t2 + 1), needsNext: false }];
    const o2 = e.slice(2);
    return [{ name: e, needsNext: n.long.has(o2) }];
  }
  if (e.length === 2) {
    const t2 = e.charAt(1), o2 = n.short.get(t2);
    return [{ name: e, needsNext: o2 === true }];
  }
  return j(e, n.short);
}
function j(e, n) {
  const t2 = e.slice(1).split(""), o2 = [];
  for (let a = 0; a < t2.length; a++) {
    const s = t2[a], r2 = n.get(s);
    if (r2 === void 0)
      return [{ name: e, needsNext: false }];
    if (r2) {
      const i = t2.slice(a + 1).join("");
      if (i && ![...i].every((m2) => n.has(m2)))
        return o2.push({ name: `-${s}`, value: i, needsNext: false }), o2;
    }
    o2.push({ name: `-${s}`, needsNext: r2 });
  }
  return o2;
}
function W(e, n = []) {
  let t2 = 0;
  for (; t2 < e.length; ) {
    const o2 = String(e[t2]);
    if (!o2.startsWith("-") || o2.length < 2) break;
    const a = b(o2);
    let s = t2 + 1;
    for (const r2 of a) {
      const i = {
        name: r2.name,
        value: r2.value,
        absorbedNext: false,
        isGlobal: true
      };
      r2.needsNext && i.value === void 0 && s < e.length && (i.value = String(e[s]), i.absorbedNext = true, s++), n.push(i);
    }
    t2 = s;
  }
  return { flags: n, taskIndex: t2 };
}
function V(e, n, t2 = []) {
  const o2 = B(n), a = [], s = [];
  let r2 = 0;
  for (; r2 < e.length; ) {
    const i = e[r2];
    if (r(i)) {
      s.push(...o(i)), r2++;
      continue;
    }
    const p2 = String(i);
    if (p2 === "--") {
      for (let d2 = r2 + 1; d2 < e.length; d2++) {
        const g2 = e[d2];
        r(g2) ? s.push(...o(g2)) : s.push(String(g2));
      }
      break;
    }
    if (!p2.startsWith("-") || p2.length < 2) {
      a.push(p2), r2++;
      continue;
    }
    const m2 = b(p2, o2);
    let u2 = r2 + 1;
    for (const d2 of m2) {
      const g2 = {
        name: d2.name,
        value: d2.value,
        absorbedNext: false,
        isGlobal: false
      };
      d2.needsNext && g2.value === void 0 && u2 < e.length && !r(e[u2]) && (g2.value = String(e[u2]), g2.absorbedNext = true, u2++), t2.push(g2);
    }
    r2 = u2;
  }
  return { flags: t2, positionals: a, pathspecs: s };
}
function* q({
  write: e
}) {
  for (const n of e)
    for (const t2 of K) {
      const o2 = t2(n.key);
      o2 && (yield o2);
    }
}
function f(e, n, t2 = String(e)) {
  const o2 = typeof e == "string" ? new RegExp(`\\s*${e.toLowerCase()}`) : e;
  return function(s) {
    if (o2.test(s))
      return {
        category: n,
        message: `Configuring ${t2} is not permitted without enabling ${n}`
      };
  };
}
function l(e, n) {
  const t2 = new RegExp(`\\s*${e.toLowerCase().replace(/\./g, "(..+)?.")}`);
  return f(t2, n, e);
}
var K = [
  f("alias", "allowUnsafeAlias"),
  f("core.askPass", "allowUnsafeAskPass"),
  f("core.editor", "allowUnsafeEditor"),
  f("core.fsmonitor", "allowUnsafeFsMonitor"),
  f("core.gitProxy", "allowUnsafeGitProxy"),
  f("core.hooksPath", "allowUnsafeHooksPath"),
  f("core.pager", "allowUnsafePager"),
  f("core.sshCommand", "allowUnsafeSshCommand"),
  l("credential.helper", "allowUnsafeCredentialHelper"),
  l("diff.command", "allowUnsafeDiffExternal"),
  f("diff.external", "allowUnsafeDiffExternal"),
  l("difftool.cmd", "allowUnsafeDiffExternal"),
  l("diff.textconv", "allowUnsafeDiffTextConv"),
  l("filter.clean", "allowUnsafeFilter"),
  l("filter.process", "allowUnsafeFilter"),
  l("filter.smudge", "allowUnsafeFilter"),
  l("gpg.program", "allowUnsafeGpgProgram"),
  f("include.path", "allowUnsafeInclude"),
  l("includeIf", "allowUnsafeInclude"),
  f("init.templateDir", "allowUnsafeTemplateDir"),
  l("pager.", "allowUnsafePager"),
  l("merge.driver", "allowUnsafeMergeDriver"),
  l("mergetool.path", "allowUnsafeMergeDriver"),
  l("mergetool.cmd", "allowUnsafeMergeDriver"),
  l("protocol.allow", "allowUnsafeProtocolOverride"),
  l("remote.receivepack", "allowUnsafePack"),
  l("remote.uploadpack", "allowUnsafePack"),
  f("uploadpack.packObjectsHook", "allowUnsafePack"),
  f("sequence.editor", "allowUnsafeEditor"),
  l("submodule.update", "allowUnsafeSubmodule"),
  l("tar.command", "allowUnsafeCommandBinaries"),
  l("trailer.cmd", "allowUnsafeCommandBinaries"),
  l("trailer.command", "allowUnsafeCommandBinaries"),
  l("url.insteadOf", "allowUnsafeUrlRewrite")
];
function* H(e, n) {
  for (const t2 of n)
    for (const o2 of X) {
      const a = o2(e, t2);
      a && (yield a);
    }
}
function c2(e, n, t2, { name: o2 = String(n), globalOnly: a = false, withValue: s = false } = {}) {
  const r2 = typeof n == "string" ? new RegExp(`\\s*${n.toLowerCase()}`) : n, i = `Use of ${e ? `${e} with option ` : ""}${o2} is not permitted without enabling ${t2}`;
  return function(m2, u2) {
    if (!(e && m2 !== e) && !(a && !u2.isGlobal) && !(s && u2.value === void 0) && r2.test(u2.name))
      return {
        category: t2,
        message: i
      };
  };
}
var h = { globalOnly: true, withValue: true };
var X = [
  c2(null, /--(upload|receive)-pack/, "allowUnsafePack", {
    name: "--upload-pack or --receive-pack"
  }),
  c2("clone", /^-\w*u/, "allowUnsafePack"),
  c2("clone", "--u", "allowUnsafePack"),
  c2("push", /^--exec$/, "allowUnsafePack", { name: "--exec" }),
  // `git` accepts unambiguous abbreviations of long options, so `--ex` and `--exe` are `--exec`
  c2("rebase", /^(-x|--ex(ec?)?)$/, "allowUnsafeExec", { name: "-x or --exec" }),
  c2(null, "--template", "allowUnsafeTemplateDir"),
  c2(null, "--exec-path", "allowUnsafeExec", h),
  // `git` reads the configuration of whichever repository these name, so the
  // directory alone is enough to deliver config the argv guards never see
  c2(null, "--git-dir", "allowUnsafeConfigPaths", h),
  c2(null, "--work-tree", "allowUnsafeConfigPaths", h),
  c2(null, /^-C$/, "allowUnsafeConfigPaths", { ...h, name: "-C" })
];
function k(e, n, t2) {
  return [...H(e, n), ...q(t2)];
}
function Y(...e) {
  const { flags: n, taskIndex: t2 } = W(e), o2 = t2 < e.length ? String(e[t2]).toLowerCase() : null, a = o2 !== null ? e.slice(t2 + 1) : [], { positionals: s, pathspecs: r2 } = V(a, o2, n), i = D(o2, n, s);
  return {
    task: o2,
    flags: n.map(J),
    paths: r2,
    config: i,
    vulnerabilities: z(k(o2, n, i))
  };
}
function z(e) {
  return Object.defineProperty(e, "vulnerabilities", {
    value: e
  });
}
function J({ value: e, name: n }) {
  return e !== void 0 ? { name: n, value: e } : { name: n };
}
var y = {
  editor: "allowUnsafeEditor",
  git_askpass: "allowUnsafeAskPass",
  git_config_global: "allowUnsafeConfigPaths",
  git_config_system: "allowUnsafeConfigPaths",
  git_config_count: "allowUnsafeConfigEnvCount",
  git_config_parameters: "allowUnsafeConfigEnvCount",
  git_config: "allowUnsafeConfigPaths",
  git_editor: "allowUnsafeEditor",
  git_exec_path: "allowUnsafeExec",
  git_external_diff: "allowUnsafeDiffExternal",
  git_pager: "allowUnsafePager",
  git_proxy_command: "allowUnsafeGitProxy",
  git_template_dir: "allowUnsafeTemplateDir",
  git_sequence_editor: "allowUnsafeEditor",
  git_ssh: "allowUnsafeSshCommand",
  git_ssh_command: "allowUnsafeSshCommand",
  pager: "allowUnsafePager",
  prefix: "allowUnsafeConfigPaths",
  ssh_askpass: "allowUnsafeAskPass",
  visual: "allowUnsafeEditor"
};
function* Q(e) {
  var _a;
  const n = parseInt((_a = e.git_config_count) != null ? _a : "0", 10);
  for (let t2 = 0; t2 < n; t2++) {
    const o2 = e[`git_config_key_${t2}`], a = e[`git_config_value_${t2}`];
    o2 !== void 0 && (yield { key: o2.toLowerCase().trim(), value: a, scope: "env" });
  }
}
function* Z(e) {
  for (const n of Object.keys(e))
    if (_(n)) {
      const t2 = y[n];
      yield {
        category: t2,
        message: `Use of "${n.toUpperCase()}" is not permitted without enabling ${t2}`
      };
    }
}
function _(e) {
  return Object.hasOwn(y, e);
}
function ee(e) {
  const n = {};
  for (const [t2, o2] of Object.entries(e)) {
    const a = t2.toLowerCase().trim();
    (_(a) || a.startsWith("git")) && (n[a] = String(o2));
  }
  return n;
}
function ne(e) {
  const n = ee(e), t2 = {
    read: [],
    write: [...Q(n)]
  }, o2 = [
    ...Z(n),
    ...k(null, [], t2)
  ];
  return {
    config: t2,
    vulnerabilities: o2
  };
}
function oe(e, n) {
  return [...Y(...e).vulnerabilities, ...ne(n).vulnerabilities];
}

// node_modules/simple-git/dist/index.mjs
var import_node_events = require("node:events");
var O2 = class extends Error {
  constructor(e, n) {
    super(n), this.task = e, Object.setPrototypeOf(this, new.target.prototype);
  }
};
var Ae = class extends O2 {
  constructor(e, n) {
    super(void 0, n), this.config = e;
  }
};
var A2 = class extends O2 {
  constructor(e, n, r2) {
    super(e, r2), this.task = e, this.plugin = n, Object.setPrototypeOf(this, new.target.prototype);
  }
};
var at = class extends O2 {
  constructor(e, n) {
    super(void 0, n || String(e)), this.git = e;
  }
};
var xe = class extends O2 {
  constructor(e) {
    super(void 0, e);
  }
};
var I2 = "\0";
var W2 = () => {
};
function Ne(t2) {
  return typeof t2 != "function" ? W2 : t2;
}
function $e(t2) {
  return typeof t2 == "function" && t2 !== W2;
}
function Pe(t2, e) {
  const n = t2.indexOf(e);
  return n <= 0 ? [t2, ""] : [t2.substr(0, n), t2.substr(n + 1)];
}
function Me(t2, e = 0) {
  return Dt(t2) && t2.length > e ? t2[e] : void 0;
}
function N2(t2, e = 0) {
  if (Dt(t2) && t2.length > e)
    return t2[t2.length - 1 - e];
}
function Dt(t2) {
  return Bt(t2);
}
function H2(t2 = "", e = true, n = `
`) {
  return t2.split(n).reduce((r2, s) => {
    const o2 = e ? s.trim() : s;
    return o2 && r2.push(o2), r2;
  }, []);
}
function ut(t2, e) {
  return H2(t2, true).map((n) => e(n));
}
function Lt(t2) {
  return (0, import_file_exists.exists)(t2, import_file_exists.FOLDER);
}
function S2(t2, e) {
  return Array.isArray(t2) ? t2.includes(e) || t2.push(e) : t2.add(e), e;
}
function De(t2, e) {
  return Array.isArray(t2) && !t2.includes(e) && t2.push(e), t2;
}
function ct(t2, e) {
  if (Array.isArray(t2)) {
    const n = t2.indexOf(e);
    n >= 0 && t2.splice(n, 1);
  } else
    t2.delete(e);
  return e;
}
var ft = Object.prototype.toString.call.bind(Object.prototype.toString);
function v(t2) {
  return Array.isArray(t2) ? t2 : [t2];
}
function jt(t2) {
  return t2.replace(/[\s-]+(.)/g, (e, n) => n.toUpperCase());
}
function L2(t2) {
  return v(t2).map((e) => e instanceof String ? e : String(e));
}
function p(t2, e = 0) {
  if (t2 == null)
    return e;
  const n = parseInt(t2, 10);
  return Number.isNaN(n) ? e : n;
}
function U(t2, e) {
  const n = [];
  for (let r2 = 0, s = t2.length; r2 < s; r2++)
    n.push(e, t2[r2]);
  return n;
}
function F2(t2) {
  return (Array.isArray(t2) ? Buffer.concat(t2) : t2).toString("utf-8");
}
function Le(t2) {
  return t2 ? Buffer.isBuffer(t2) ? t2.length : Buffer.byteLength(t2) : 0;
}
function je(t2, e) {
  const n = {};
  return e.forEach((r2) => {
    t2[r2] !== void 0 && (n[r2] = t2[r2]);
  }), n;
}
function wt(t2 = 0) {
  return new Promise((e) => setTimeout(e, t2));
}
function bt(t2) {
  if (t2 !== false)
    return t2;
}
function d(t2, e, n) {
  return e(t2) ? t2 : arguments.length > 2 ? n : void 0;
}
var K2 = (t2) => Array.isArray(t2);
function st(t2, e) {
  const n = r(t2) ? "string" : typeof t2;
  return /number|string|boolean/.test(n) && (!e || !e.includes(n));
}
var m = (t2) => typeof t2 == "string" || r(t2);
var Be = (t2) => m(t2) || Buffer.isBuffer(t2);
var G2 = (t2) => m(t2) || Array.isArray(t2) && t2.every(m);
function lt(t2) {
  return !!t2 && ft(t2) === "[object Object]";
}
function Ie(t2) {
  return typeof t2 == "function";
}
var Bt = (t2) => t2 == null || "number|boolean|function".includes(typeof t2) ? false : typeof t2.length == "number";
var V2 = /* @__PURE__ */ ((t2) => (t2[t2.SUCCESS = 0] = "SUCCESS", t2[t2.ERROR = 1] = "ERROR", t2[t2.NOT_FOUND = -2] = "NOT_FOUND", t2[t2.UNCLEAN = 128] = "UNCLEAN", t2))(V2 || {});
var z2 = class _z {
  constructor(e, n) {
    this.stdOut = e, this.stdErr = n;
  }
  asStrings() {
    return new _z(this.stdOut.toString("utf8"), this.stdErr.toString("utf8"));
  }
};
function Ue() {
  throw new Error("LineParser:useMatches not implemented");
}
var l2 = class {
  constructor(e, n) {
    this.matches = [], this.useMatches = Ue, this.parse = (r2, s) => (this.resetMatches(), this._regExp.every((o2, i) => this.addMatch(o2, i, r2(i))) ? this.useMatches(s, this.prepareMatches()) !== false : false), this._regExp = Array.isArray(e) ? e : [e], n && (this.useMatches = n);
  }
  resetMatches() {
    this.matches.length = 0;
  }
  prepareMatches() {
    return this.matches;
  }
  addMatch(e, n, r2) {
    const s = r2 && e.exec(r2);
    return s && this.pushMatch(n, s), !!s;
  }
  pushMatch(e, n) {
    this.matches.push(...n.slice(1));
  }
};
var x2 = class extends l2 {
  addMatch(e, n, r2) {
    return /^remote:\s/.test(String(r2)) && super.addMatch(e, n, r2);
  }
  pushMatch(e, n) {
    (e > 0 || n.length > 1) && super.pushMatch(e, n);
  }
};
var Fe = {
  binary: "git",
  maxConcurrentProcesses: 5,
  config: [],
  trimmed: false
};
function Ge(...t2) {
  const e = process.cwd(), n = Object.assign(
    { baseDir: e, ...Fe },
    ...t2.filter((r2) => typeof r2 == "object" && r2)
  );
  return n.baseDir = n.baseDir || e, n.trimmed = n.trimmed === true, n;
}
function It(t2, e = []) {
  return lt(t2) ? Object.keys(t2).reduce((n, r2) => {
    const s = t2[r2];
    if (r(s))
      n.push(s);
    else if (st(s, ["boolean"]))
      n.push(r2 + "=" + s);
    else if (Array.isArray(s))
      for (const o2 of s)
        st(o2, ["string", "number"]) || n.push(r2 + "=" + o2);
    else
      n.push(r2);
    return n;
  }, e) : e;
}
function h2(t2, e = 0, n = false) {
  const r2 = [];
  for (let s = 0, o2 = e < 0 ? t2.length : e; s < o2; s++)
    "string|number".includes(typeof t2[s]) && r2.push(String(t2[s]));
  return It(ht(t2), r2), n || r2.push(...ze(t2)), r2;
}
function ze(t2) {
  const e = typeof N2(t2) == "function";
  return L2(d(N2(t2, e ? 1 : 0), K2, []));
}
function ht(t2) {
  const e = Ie(N2(t2));
  return d(N2(t2, e ? 1 : 0), lt);
}
function u(t2, e = true) {
  const n = Ne(N2(t2));
  return e || $e(n) ? n : void 0;
}
function Tt(t2, e) {
  return t2(e.stdOut, e.stdErr);
}
function E2(t2, e, n, r2 = true) {
  return v(n).forEach((s) => {
    for (let o2 = H2(s, r2), i = 0, a = o2.length; i < a; i++) {
      const c3 = (y2 = 0) => {
        if (!(i + y2 >= a))
          return o2[i + y2];
      };
      e.some(({ parse: y2 }) => y2(c3, t2));
    }
  }), t2;
}
var mt = ({ exitCode: t2 }, e, n, r2) => {
  if (t2 === V2.UNCLEAN && Ve(e))
    return n(Buffer.from("false"));
  r2(e);
};
var Ut = (t2) => t2.trim() === "true";
function We(t2) {
  switch (t2) {
    case "bare":
      return Ke();
    case "root":
      return He();
  }
  return {
    commands: ["rev-parse", "--is-inside-work-tree"],
    format: "utf-8",
    onError: mt,
    parser: Ut
  };
}
function He() {
  return {
    commands: ["rev-parse", "--git-dir"],
    format: "utf-8",
    onError: mt,
    parser(e) {
      return /^\.(git)?$/.test(e.trim());
    }
  };
}
function Ke() {
  return {
    commands: ["rev-parse", "--is-bare-repository"],
    format: "utf-8",
    onError: mt,
    parser: Ut
  };
}
function Ve(t2) {
  return /(Not a git repository|Kein Git-Repository)/i.test(String(t2));
}
var Xe = class {
  constructor(e) {
    this.paths = [], this.files = [], this.folders = [], this.dryRun = e;
  }
};
var Ye = /^[a-z]+\s*/i;
var Qe = /^[a-z]+\s+[a-z]+\s*/i;
var Je = /\/$/;
function Ze(t2, e) {
  const n = new Xe(t2), r2 = t2 ? Qe : Ye;
  return H2(e).forEach((s) => {
    const o2 = s.replace(r2, "");
    n.paths.push(o2), (Je.test(o2) ? n.folders : n.files).push(o2);
  }), n;
}
var Ft = [];
function tn(t2) {
  return {
    commands: Ft,
    format: "empty",
    parser: t2
  };
}
function b2(t2) {
  return {
    commands: Ft,
    format: "empty",
    parser() {
      throw typeof t2 == "string" ? new xe(t2) : t2;
    }
  };
}
function g(t2, e = false) {
  return {
    commands: t2,
    format: "utf-8",
    parser(n) {
      return e ? String(n).trim() : n;
    }
  };
}
function Gt(t2) {
  return {
    commands: t2,
    format: "buffer",
    parser(e) {
      return e;
    }
  };
}
function en(t2) {
  return t2.format === "buffer";
}
function kt(t2) {
  return t2.format === "empty" || !t2.commands.length;
}
var nn = "Git clean interactive mode is not supported";
var rn = 'Git clean mode parameter ("n" or "f") is required';
var sn = "Git clean unknown option found in: ";
var zt = /* @__PURE__ */ ((t2) => (t2.DRY_RUN = "n", t2.FORCE = "f", t2.IGNORED_INCLUDED = "x", t2.IGNORED_ONLY = "X", t2.EXCLUDING = "e", t2.QUIET = "q", t2.RECURSIVE = "d", t2))(zt || {});
var qt = /* @__PURE__ */ new Set([
  "i",
  ...L2(Object.values(zt))
]);
function on(t2, e) {
  const { cleanMode: n, options: r2, valid: s } = cn(t2);
  return n ? s.options ? (r2.push(...e), r2.some(hn) ? b2(nn) : an(n, r2)) : b2(sn + JSON.stringify(t2)) : b2(rn);
}
function an(t2, e) {
  return {
    commands: ["clean", `-${t2}`, ...e],
    format: "utf-8",
    parser(r2) {
      return Ze(t2 === "n", r2);
    }
  };
}
function un(t2) {
  return Array.isArray(t2) && t2.every((e) => qt.has(e));
}
function cn(t2) {
  let e, n = [], r2 = { cleanMode: false, options: true };
  return t2.replace(/[^a-z]i/g, "").split("").forEach((s) => {
    fn(s) ? (e = s, r2.cleanMode = true) : r2.options = r2.options && ln(n[n.length] = `-${s}`);
  }), {
    cleanMode: e,
    options: n,
    valid: r2
  };
}
function fn(t2) {
  return t2 === "f" || t2 === "n";
}
function ln(t2) {
  return /^-[a-z]$/i.test(t2) && qt.has(t2.charAt(1));
}
function hn(t2) {
  return /^-[^\-]/.test(t2) ? t2.indexOf("i") > 0 : t2 === "--interactive";
}
var mn = class {
  constructor() {
    this.files = [], this.values = /* @__PURE__ */ Object.create(null);
  }
  get all() {
    return this._all || (this._all = this.files.reduce((e, n) => Object.assign(e, this.values[n]), {})), this._all;
  }
  addFile(e) {
    if (!(e in this.values)) {
      const n = N2(this.files);
      this.values[e] = n ? Object.create(this.values[n]) : {}, this.files.push(e);
    }
    return this.values[e];
  }
  addValue(e, n, r2) {
    const s = this.addFile(e);
    Object.hasOwn(s, n) ? Array.isArray(s[n]) ? s[n].push(r2) : s[n] = [s[n], r2] : s[n] = r2, this._all = void 0;
  }
};
function pn(t2) {
  const e = new mn();
  for (const n of Wt(t2))
    e.addValue(n.file, String(n.key), n.value);
  return e;
}
function dn(t2, e) {
  let n = null;
  const r2 = [], s = /* @__PURE__ */ new Map();
  for (const o2 of Wt(t2, e))
    o2.key === e && (r2.push(n = o2.value), s.has(o2.file) || s.set(o2.file, []), s.get(o2.file).push(n));
  return {
    key: e,
    paths: Array.from(s.keys()),
    scopes: s,
    value: n,
    values: r2
  };
}
function gn(t2) {
  return t2.replace(/^(file):/, "");
}
function* Wt(t2, e = null) {
  const n = t2.split("\0");
  for (let r2 = 0, s = n.length - 1; r2 < s; ) {
    const o2 = gn(n[r2++]);
    let i = n[r2++], a = e;
    if (i.includes(`
`)) {
      const c3 = Pe(i, `
`);
      a = c3[0], i = c3[1];
    }
    yield { file: o2, key: a, value: i };
  }
}
var Ht = /* @__PURE__ */ ((t2) => (t2.system = "system", t2.global = "global", t2.local = "local", t2.worktree = "worktree", t2))(Ht || {});
function Y2(t2, e) {
  return typeof t2 == "string" && Object.hasOwn(Ht, t2) ? t2 : e;
}
function yn(t2, e, n, r2) {
  const s = ["config", `--${r2}`];
  return n && s.push("--add"), s.push(t2, e), {
    commands: s,
    format: "utf-8",
    parser(o2) {
      return o2;
    }
  };
}
function wn(t2, e) {
  const n = ["config", "--null", "--show-origin", "--get-all", t2];
  return e && n.splice(1, 0, `--${e}`), {
    commands: n,
    format: "utf-8",
    parser(r2) {
      return dn(r2, t2);
    }
  };
}
function bn(t2) {
  const e = ["config", "--list", "--show-origin", "--null"];
  return t2 && e.push(`--${t2}`), {
    commands: e,
    format: "utf-8",
    parser(n) {
      return pn(n);
    }
  };
}
function Tn() {
  return {
    addConfig(t2, e, ...n) {
      return this._runTask(
        yn(
          t2,
          e,
          n[0] === true,
          Y2(
            n[1],
            "local"
            /* local */
          )
        ),
        u(arguments)
      );
    },
    getConfig(t2, e) {
      return this._runTask(
        wn(t2, Y2(e, void 0)),
        u(arguments)
      );
    },
    listConfig(...t2) {
      return this._runTask(
        bn(Y2(t2[0], void 0)),
        u(arguments)
      );
    }
  };
}
var Kt = /* @__PURE__ */ ((t2) => (t2.ADDED = "A", t2.COPIED = "C", t2.DELETED = "D", t2.MODIFIED = "M", t2.RENAMED = "R", t2.CHANGED = "T", t2.UNMERGED = "U", t2.UNKNOWN = "X", t2.BROKEN = "B", t2))(Kt || {});
var kn = new Set(Object.values(Kt));
function _n(t2) {
  return kn.has(t2);
}
var _t;
var vn = ["-h"];
var j2 = /* @__PURE__ */ Symbol("grepQuery");
var En = class {
  constructor() {
    this[_t] = [];
  }
  *[(_t = j2, Symbol.iterator)]() {
    for (const e of this[j2])
      yield e;
  }
  and(...e) {
    return e.length && this[j2].push("--and", "(", ...U(e, "-e"), ")"), this;
  }
  param(...e) {
    return this[j2].push(...U(e, "-e")), this;
  }
};
function Sn(...t2) {
  return new En().param(...t2);
}
function Rn(t2) {
  const e = /* @__PURE__ */ new Set(), n = {};
  return ut(t2, (r2) => {
    const [s, o2, i] = r2.split(I2);
    e.add(s), (n[s] = n[s] || []).push({
      line: p(o2),
      path: s,
      preview: i
    });
  }), {
    paths: e,
    results: n
  };
}
function On() {
  return {
    grep(t2) {
      const e = u(arguments), n = h2(arguments);
      for (const s of vn)
        if (n.includes(s))
          return this._runTask(
            b2(`git.grep: use of "${s}" is not supported.`),
            e
          );
      typeof t2 == "string" && (t2 = Sn().param(t2));
      const r2 = ["grep", "--null", "-n", "--full-name", ...n, ...t2];
      return this._runTask(
        {
          commands: r2,
          format: "utf-8",
          parser(s) {
            return Rn(s);
          }
        },
        e
      );
    }
  };
}
var Vt = /* @__PURE__ */ ((t2) => (t2.MIXED = "mixed", t2.SOFT = "soft", t2.HARD = "hard", t2.MERGE = "merge", t2.KEEP = "keep", t2))(Vt || {});
var Cn = L2(Object.values(Vt));
function An(t2, e) {
  const n = ["reset"];
  return Xt(t2) && n.push(`--${t2}`), n.push(...e), g(n);
}
function xn(t2) {
  if (Xt(t2))
    return t2;
  switch (typeof t2) {
    case "string":
    case "undefined":
      return "soft";
  }
}
function Xt(t2) {
  return typeof t2 == "string" && Cn.includes(t2);
}
import_debug.default.formatters.L = (t2) => String(Bt(t2) ? t2.length : "-");
import_debug.default.formatters.B = (t2) => Buffer.isBuffer(t2) ? t2.toString("utf8") : ft(t2);
function Nn() {
  return (0, import_debug.default)("simple-git");
}
function vt(t2, e, n) {
  return !e || !String(e).replace(/\s*/, "") ? n ? (r2, ...s) => {
    t2(r2, ...s), n(r2, ...s);
  } : t2 : (r2, ...s) => {
    t2(`%s ${r2}`, e, ...s), n && n(r2, ...s);
  };
}
function $n(t2, e, { namespace: n }) {
  if (typeof t2 == "string")
    return t2;
  const r2 = e && e.namespace || "";
  return r2.startsWith(n) ? r2.substr(n.length + 1) : r2 || n;
}
function $2(t2, e, n, r2 = Nn()) {
  const s = t2 && `[${t2}]` || "", o2 = [], i = typeof e == "string" ? r2.extend(e) : e, a = $n(d(e, m), i, r2);
  return y2(n);
  function c3(w2, T2) {
    return S2(
      o2,
      $2(t2, a.replace(/^[^:]+/, w2), T2, r2)
    );
  }
  function y2(w2) {
    const T2 = w2 && `[${w2}]` || "", k2 = i && vt(i, T2) || W2, C2 = vt(r2, `${s} ${T2}`, k2);
    return Object.assign(i ? k2 : C2, {
      label: t2,
      sibling: c3,
      info: C2,
      step: y2
    });
  }
}
var M2 = class M3 {
  constructor(e = "GitExecutor") {
    this.logLabel = e, this._queue = /* @__PURE__ */ new Map();
  }
  withProgress(e) {
    return this._queue.get(e);
  }
  createProgress(e) {
    const n = M3.getName(e.commands[0]), r2 = $2(this.logLabel, n);
    return {
      task: e,
      logger: r2,
      name: n
    };
  }
  push(e) {
    const n = this.createProgress(e);
    return n.logger("Adding task to the queue, commands = %o", e.commands), this._queue.set(e, n), n;
  }
  fatal(e) {
    for (const [n, { logger: r2 }] of Array.from(this._queue.entries()))
      n === e.task ? (r2.info("Failed %o", e), r2(
        "Fatal exception, any as-yet un-started tasks run through this executor will not be attempted"
      )) : r2.info(
        "A fatal exception occurred in a previous task, the queue has been purged: %o",
        e.message
      ), this.complete(n);
    if (this._queue.size !== 0)
      throw new Error(`Queue size should be zero after fatal: ${this._queue.size}`);
  }
  complete(e) {
    this.withProgress(e) && this._queue.delete(e);
  }
  attempt(e) {
    const n = this.withProgress(e);
    if (!n)
      throw new O2(void 0, "TasksPendingQueue: attempt called for an unknown task");
    return n.logger("Starting task"), n;
  }
  static getName(e = "empty") {
    return `task:${e}:${++M3.counter}`;
  }
};
M2.counter = 0;
var ot = M2;
var Pn = class {
  constructor(e, n, r2) {
    this._executor = e, this._scheduler = n, this._plugins = r2, this._chain = Promise.resolve(), this._queue = new ot();
  }
  get cwd() {
    return this._cwd || this._executor.cwd;
  }
  set cwd(e) {
    this._cwd = e;
  }
  get env() {
    return this._executor.env;
  }
  get outputHandler() {
    return this._executor.outputHandler;
  }
  chain() {
    return this;
  }
  push(e) {
    return this._queue.push(e), this._chain = this._chain.then(() => this.attemptTask(e));
  }
  async attemptTask(e) {
    const n = await this._scheduler.next(), r2 = () => this._queue.complete(e);
    try {
      const { logger: s } = this._queue.attempt(e);
      return await (kt(e) ? this.attemptEmptyTask(e, s) : this.attemptRemoteTask(e, s));
    } catch (s) {
      throw this.onFatalException(e, s);
    } finally {
      r2(), n();
    }
  }
  onFatalException(e, n) {
    const r2 = n instanceof O2 ? Object.assign(n, { task: e }) : new O2(e, n && String(n));
    return this._chain = Promise.resolve(), this._queue.fatal(r2), r2;
  }
  async attemptRemoteTask(e, n) {
    const r2 = this._plugins.exec("spawn.binary", "", this.taskContext(e, e.commands)), s = this._plugins.exec(
      "spawn.args",
      [...e.commands],
      this.taskContext(e, e.commands)
    ), o2 = await this.gitResponse(
      e,
      r2,
      s,
      this.outputHandler,
      n.step("SPAWN")
    ), i = await this.handleTaskData(e, s, o2, n.step("HANDLE"));
    return n("passing response to task's parser as a %s", e.format), en(e) ? Tt(e.parser, i) : Tt(e.parser, i.asStrings());
  }
  async attemptEmptyTask(e, n) {
    return n("empty task bypassing child process to call to task's parser"), e.parser(this);
  }
  handleTaskData(e, n, r2, s) {
    const { exitCode: o2, rejection: i, stdOut: a, stdErr: c3 } = r2;
    return new Promise((y2, w2) => {
      s("Preparing to handle process response exitCode=%d stdOut=", o2);
      const { error: T2 } = this._plugins.exec(
        "task.error",
        { error: i },
        {
          ...this.taskContext(e, n),
          ...r2
        }
      );
      if (T2 && e.onError)
        return s.info("exitCode=%s handling with custom error handler"), e.onError(
          r2,
          T2,
          (k2) => {
            s.info("custom error handler treated as success"), s("custom error returned a %s", ft(k2)), y2(
              new z2(
                Array.isArray(k2) ? Buffer.concat(k2) : k2,
                Buffer.concat(c3)
              )
            );
          },
          w2
        );
      if (T2)
        return s.info(
          "handling as error: exitCode=%s stdErr=%s rejection=%o",
          o2,
          c3.length,
          i
        ), w2(T2);
      s.info("retrieving task output complete"), y2(new z2(Buffer.concat(a), Buffer.concat(c3)));
    });
  }
  async gitResponse(e, n, r2, s, o2) {
    const i = o2.sibling("output"), a = this._plugins.exec(
      "spawn.options",
      {
        cwd: this.cwd,
        env: this.env,
        windowsHide: true
      },
      this.taskContext(e, e.commands)
    );
    return new Promise((c3) => {
      const y2 = [], w2 = [];
      o2.info("%s %o", n, r2), o2("%O", a);
      let T2 = this._beforeSpawn(e, r2);
      if (T2)
        return c3({
          stdOut: y2,
          stdErr: w2,
          exitCode: 9901,
          rejection: T2
        });
      this._plugins.exec("spawn.before", void 0, {
        ...this.taskContext(e, r2),
        kill(C2) {
          T2 = C2 || T2;
        }
      });
      const k2 = (0, import_node_child_process.spawn)(n, r2, a);
      k2.stdout.on(
        "data",
        Et(y2, "stdOut", o2, i.step("stdOut"))
      ), k2.stderr.on(
        "data",
        Et(w2, "stdErr", o2, i.step("stdErr"))
      ), k2.on("error", Mn(w2, o2)), s && (o2("Passing child process stdOut/stdErr to custom outputHandler"), s(n, k2.stdout, k2.stderr, [...r2])), this._plugins.exec("spawn.after", void 0, {
        ...this.taskContext(e, r2),
        spawned: k2,
        close(C2, Te) {
          c3({
            stdOut: y2,
            stdErr: w2,
            exitCode: C2,
            rejection: T2 || Te
          });
        },
        kill(C2) {
          k2.killed || (T2 = C2, k2.kill("SIGINT"));
        }
      });
    });
  }
  _beforeSpawn(e, n) {
    let r2;
    return this._plugins.exec("spawn.before", void 0, {
      ...this.taskContext(e, n),
      kill(s) {
        r2 = s || r2;
      }
    }), r2;
  }
  taskContext(e, n) {
    return {
      method: String(Me(e.commands) || ""),
      commands: n,
      env: { ...this.env },
      input: kt(e) ? void 0 : e.input
    };
  }
};
function Mn(t2, e) {
  return (n) => {
    e("[ERROR] child process exception %o", n), t2.push(Buffer.from(String(n.stack), "ascii"));
  };
}
function Et(t2, e, n, r2) {
  return (s) => {
    n("%s received %L bytes", e, s), r2("%B", s), t2.push(s);
  };
}
var Dn = class {
  constructor(e, n, r2) {
    this.cwd = e, this._scheduler = n, this._plugins = r2, this._chain = this.chain();
  }
  chain() {
    return new Pn(this, this._scheduler, this._plugins);
  }
  push(e) {
    return this._chain.push(e);
  }
};
function Ln(t2, e, n = W2) {
  const r2 = (o2) => {
    n(null, o2);
  }, s = (o2) => {
    (o2 == null ? void 0 : o2.task) === t2 && n(o2, void 0);
  };
  e.then(r2, s);
}
function St(t2, e) {
  return tn((n) => {
    if (!Lt(t2))
      throw new Error(`Git.cwd: cannot change to non-directory "${t2}"`);
    return (e || n).cwd = t2;
  });
}
function Q2(t2) {
  const e = ["checkout", ...t2];
  return e[1] === "-b" && e.includes("-B") && (e[1] = ct(e, "-B")), g(e);
}
function jn() {
  return {
    checkout() {
      return this._runTask(
        Q2(h2(arguments, 1)),
        u(arguments)
      );
    },
    checkoutBranch(t2, e) {
      return this._runTask(
        Q2(["-b", t2, e, ...h2(arguments)]),
        u(arguments)
      );
    },
    checkoutLocalBranch(t2) {
      return this._runTask(
        Q2(["-b", t2, ...h2(arguments)]),
        u(arguments)
      );
    }
  };
}
var Yt = (t2, e, n) => {
  const r2 = ["clone", ...n];
  return m(t2) && r2.push(c(t2)), m(e) && r2.push(c(e)), g(r2);
};
var Bn = (t2, e, n) => (S2(n, "--mirror"), Yt(t2, e, n));
function Rt(t2, e, n, ...r2) {
  return m(n) ? e(n, d(r2[0], m), h2(arguments)) : b2(`git.${t2}() requires a string 'repoPath'`);
}
function In() {
  return {
    clone(t2, ...e) {
      return this._runTask(
        Rt("clone", Yt, d(t2, m), ...e),
        u(arguments)
      );
    },
    mirror(t2, ...e) {
      return this._runTask(
        Rt("mirror", Bn, d(t2, m), ...e),
        u(arguments)
      );
    }
  };
}
var Un = [
  new l2(/^\[([^\s]+)( \([^)]+\))? ([^\]]+)/, (t2, [e, n, r2]) => {
    t2.branch = e, t2.commit = r2, t2.root = !!n;
  }),
  new l2(/\s*Author:\s(.+)/i, (t2, [e]) => {
    const n = e.split("<"), r2 = n.pop();
    !r2 || !r2.includes("@") || (t2.author = {
      email: r2.substr(0, r2.length - 1),
      name: n.join("<").trim()
    });
  }),
  new l2(
    /(\d+)[^,]*(?:,\s*(\d+)[^,]*)(?:,\s*(\d+))/g,
    (t2, [e, n, r2]) => {
      t2.summary.changes = parseInt(e, 10) || 0, t2.summary.insertions = parseInt(n, 10) || 0, t2.summary.deletions = parseInt(r2, 10) || 0;
    }
  ),
  new l2(
    /^(\d+)[^,]*(?:,\s*(\d+)[^(]+\(([+-]))?/,
    (t2, [e, n, r2]) => {
      t2.summary.changes = parseInt(e, 10) || 0;
      const s = parseInt(n, 10) || 0;
      r2 === "-" ? t2.summary.deletions = s : r2 === "+" && (t2.summary.insertions = s);
    }
  )
];
function Fn(t2) {
  return E2({
    author: null,
    branch: "",
    commit: "",
    root: false,
    summary: {
      changes: 0,
      insertions: 0,
      deletions: 0
    }
  }, Un, t2);
}
function Gn(t2, e, n) {
  return {
    commands: [
      "-c",
      "core.abbrev=40",
      "commit",
      ...U(t2, "-m"),
      ...e,
      ...n
    ],
    format: "utf-8",
    parser: Fn
  };
}
function zn() {
  return {
    commit(e, ...n) {
      const r2 = u(arguments), s = t2(e) || Gn(
        v(e),
        v(d(n[0], G2, [])),
        [
          ...L2(d(n[1], K2, [])),
          ...h2(arguments, 0, true)
        ]
      );
      return this._runTask(s, r2);
    }
  };
  function t2(e) {
    return !G2(e) && b2(
      "git.commit: requires the commit message to be supplied as a string/string[]"
    );
  }
}
function qn() {
  return {
    count: 0,
    garbage: 0,
    inPack: 0,
    packs: 0,
    prunePackable: 0,
    size: 0,
    sizeGarbage: 0,
    sizePack: 0
  };
}
var Wn = new l2(
  /([a-z-]+): (\d+)$/,
  (t2, [e, n]) => {
    const r2 = jt(e);
    Object.hasOwn(t2, r2) && (t2[r2] = p(n));
  }
);
function Hn() {
  return {
    countObjects() {
      return this._runTask({
        commands: ["count-objects", "--verbose"],
        format: "utf-8",
        parser(t2) {
          return E2(qn(), [Wn], t2);
        }
      });
    }
  };
}
function Kn() {
  return {
    firstCommit() {
      return this._runTask(
        g(["rev-list", "--max-parents=0", "HEAD"], true),
        u(arguments)
      );
    }
  };
}
function Vn(t2, e) {
  const n = ["hash-object", t2];
  return e && n.push("-w"), g(n, true);
}
var J2 = class {
  constructor(e, n, r2, s) {
    this.bare = e, this.path = n, this.existing = r2, this.gitDir = s;
  }
};
var Xn = /^Init.+ repository in (.+)$/;
var Yn = /^Rein.+ in (.+)$/;
function Qn(t2, e, n) {
  const r2 = String(n).trim();
  let s;
  if (s = Xn.exec(r2))
    return new J2(t2, e, false, s[1]);
  if (s = Yn.exec(r2))
    return new J2(t2, e, true, s[1]);
  let o2 = "";
  const i = r2.split(" ");
  for (; i.length; )
    if (i.shift() === "in") {
      o2 = i.join(" ");
      break;
    }
  return new J2(t2, e, /^re/i.test(r2), o2);
}
var Qt = "--bare";
function Jn(t2) {
  return t2.includes(Qt);
}
function Zn(t2 = false, e, n) {
  const r2 = ["init", ...n];
  return t2 && !Jn(r2) && r2.splice(1, 0, Qt), {
    commands: r2,
    format: "utf-8",
    parser(s) {
      return Qn(r2.includes("--bare"), e, s);
    }
  };
}
function tr(t2) {
  return t2 === void 0 ? b2("interpretTrailers called without input content") : {
    format: "utf-8",
    parser(e) {
      return Object.fromEntries(
        ut(e, (n) => {
          const r2 = n.indexOf(":");
          return [
            jt(n.substring(0, r2).toLowerCase()),
            n.substring(r2 + 2).trim()
          ];
        })
      );
    },
    commands: ["interpret-trailers", "--parse"],
    input: t2
  };
}
function er() {
  return {
    interpretTrailers(t2) {
      return this._runTask(
        tr(d(t2, Be)),
        u(arguments)
      );
    }
  };
}
var R2 = /* @__PURE__ */ ((t2) => (t2.NONE = "", t2.STAT = "--stat", t2.NUM_STAT = "--numstat", t2.NAME_ONLY = "--name-only", t2.NAME_STATUS = "--name-status", t2))(R2 || {});
var Jt = /^--(stat|numstat|name-only|name-status)(=|$)/;
function pt(t2) {
  for (let e = 0; e < t2.length; e++) {
    const n = Jt.exec(t2[e]);
    if (n)
      return `--${n[1]}`;
  }
  return "";
}
function nr(t2) {
  return Jt.test(t2);
}
var rr = class {
  constructor() {
    this.changed = 0, this.deletions = 0, this.insertions = 0, this.files = [];
  }
};
var Ot = [
  new l2(
    /^(.+)\s+\|\s+(\d+)(\s+[+\-]+)?$/,
    (t2, [e, n, r2 = ""]) => {
      t2.files.push({
        file: e.trim(),
        changes: p(n),
        insertions: r2.replace(/[^+]/g, "").length,
        deletions: r2.replace(/[^-]/g, "").length,
        binary: false
      });
    }
  ),
  new l2(
    /^(.+) \|\s+Bin ([0-9.]+) -> ([0-9.]+) ([a-z]+)/,
    (t2, [e, n, r2]) => {
      t2.files.push({
        file: e.trim(),
        before: p(n),
        after: p(r2),
        binary: true
      });
    }
  ),
  new l2(/^(.+)\s+\|\s+Bin\s*$/, (t2, [e]) => {
    t2.files.push({
      file: e.trim(),
      before: 0,
      after: 0,
      binary: true
    });
  }),
  new l2(
    /(\d+) files? changed\s*((?:, \d+ [^,]+){0,2})/,
    (t2, [e, n]) => {
      const r2 = /(\d+) i/.exec(n), s = /(\d+) d/.exec(n);
      t2.changed = p(e), t2.insertions = p(r2 == null ? void 0 : r2[1]), t2.deletions = p(s == null ? void 0 : s[1]);
    }
  )
];
var sr = [
  new l2(
    /(\d+)\t(\d+)\t(.+)$/,
    (t2, [e, n, r2]) => {
      const s = p(e), o2 = p(n);
      t2.changed++, t2.insertions += s, t2.deletions += o2, t2.files.push({
        file: r2,
        changes: s + o2,
        insertions: s,
        deletions: o2,
        binary: false
      });
    }
  ),
  new l2(/-\t-\t(.+)$/, (t2, [e]) => {
    t2.changed++, t2.files.push({
      file: e,
      after: 0,
      before: 0,
      binary: true
    });
  })
];
var or = [
  new l2(/(.+)$/, (t2, [e]) => {
    t2.changed++, t2.files.push({
      file: e,
      changes: 0,
      insertions: 0,
      deletions: 0,
      binary: false
    });
  })
];
var ir = [
  new l2(
    /([ACDMRTUXB])([0-9]{0,3})\t(.[^\t]*)(\t(.[^\t]*))?$/,
    (t2, [e, n, r2, s, o2]) => {
      t2.changed++, t2.files.push({
        file: o2 != null ? o2 : r2,
        changes: 0,
        insertions: 0,
        deletions: 0,
        binary: false,
        status: bt(_n(e) && e),
        from: bt(!!o2 && r2 !== o2 && r2),
        similarity: p(n)
      });
    }
  )
];
var ar = {
  [R2.NONE]: Ot,
  [R2.STAT]: Ot,
  [R2.NUM_STAT]: sr,
  [R2.NAME_STATUS]: ir,
  [R2.NAME_ONLY]: or
};
function Zt(t2 = R2.NONE) {
  const e = ar[t2];
  return (n) => E2(new rr(), e, n, false);
}
var te = "\xF2\xF2\xF2\xF2\xF2\xF2 ";
var ee2 = " \xF2\xF2";
var ne2 = " \xF2 ";
var ur = ["hash", "date", "message", "refs", "author_name", "author_email"];
function cr(t2, e) {
  return e.reduce(
    (n, r2, s) => (n[r2] = t2[s] || "", n),
    /* @__PURE__ */ Object.create({ diff: null })
  );
}
function re(t2 = ne2, e = ur, n = R2.NONE) {
  const r2 = Zt(n);
  return function(s) {
    const o2 = H2(
      s.trim(),
      false,
      te
    ).map(function(i) {
      const a = i.split(ee2), c3 = cr(a[0].split(t2), e);
      return a.length > 1 && a[1].trim() && (c3.diff = r2(a[1])), c3;
    });
    return {
      all: o2,
      latest: o2.length && o2[0] || null,
      total: o2.length
    };
  };
}
function fr(t2) {
  let e = pt(t2);
  const n = ["diff"];
  return e === R2.NONE && (e = R2.STAT, n.push("--stat=4096")), n.push(...t2), dt(n) || {
    commands: n,
    format: "utf-8",
    parser: Zt(e)
  };
}
function dt(t2) {
  const e = t2.filter(nr);
  if (e.length > 1)
    return b2(
      `Summary flags are mutually exclusive - pick one of ${e.join(",")}`
    );
  if (e.length && t2.includes("-z"))
    return b2(
      `Summary flag ${e} parsing is not compatible with null termination option '-z'`
    );
}
var se = /* @__PURE__ */ ((t2) => (t2[t2["--pretty"] = 0] = "--pretty", t2[t2["max-count"] = 1] = "max-count", t2[t2.maxCount = 2] = "maxCount", t2[t2.n = 3] = "n", t2[t2.file = 4] = "file", t2[t2.format = 5] = "format", t2[t2.from = 6] = "from", t2[t2.to = 7] = "to", t2[t2.splitter = 8] = "splitter", t2[t2.symmetric = 9] = "symmetric", t2[t2.mailMap = 10] = "mailMap", t2[t2.multiLine = 11] = "multiLine", t2[t2.strictDate = 12] = "strictDate", t2))(se || {});
function lr(t2, e) {
  const n = [], r2 = [];
  return Object.keys(t2).forEach((s) => {
    n.push(s), r2.push(String(t2[s]));
  }), [n, r2.join(e)];
}
function hr(t2) {
  return Object.keys(t2).reduce((e, n) => (n in se || (e[n] = t2[n]), e), {});
}
function oe2(t2 = {}, e = []) {
  const n = d(t2.splitter, m, ne2), r2 = lt(t2.format) ? t2.format : {
    hash: "%H",
    date: t2.strictDate === false ? "%ai" : "%aI",
    message: "%s",
    refs: "%D",
    body: t2.multiLine ? "%B" : "%b",
    author_name: t2.mailMap !== false ? "%aN" : "%an",
    author_email: t2.mailMap !== false ? "%aE" : "%ae"
  }, [s, o2] = lr(r2, n), i = [], a = [
    `--pretty=format:${te}${o2}${ee2}`,
    ...e
  ], c3 = t2.n || t2["max-count"] || t2.maxCount;
  if (c3 && a.push(`--max-count=${c3}`), t2.from || t2.to) {
    const y2 = t2.symmetric !== false ? "..." : "..";
    i.push(`${t2.from || ""}${y2}${t2.to || ""}`);
  }
  return m(t2.file) && a.push("--follow", c(t2.file)), It(hr(t2), a), {
    fields: s,
    splitter: n,
    commands: [...a, ...i]
  };
}
function mr(t2, e, n) {
  const r2 = re(t2, e, pt(n));
  return {
    commands: ["log", ...n],
    format: "utf-8",
    parser: r2
  };
}
function pr() {
  return {
    log(...n) {
      const r2 = u(arguments), s = oe2(
        ht(arguments),
        L2(d(arguments[0], K2, []))
      ), o2 = e(...n) || dt(s.commands) || t2(s);
      return this._runTask(o2, r2);
    }
  };
  function t2(n) {
    return mr(n.splitter, n.fields, n.commands);
  }
  function e(n, r2) {
    return m(n) && m(r2) && b2(
      "git.log(string, string) should be replaced with git.log({ from: string, to: string })"
    );
  }
}
var Z2 = class {
  constructor(e, n = null, r2) {
    this.reason = e, this.file = n, this.meta = r2;
  }
  toString() {
    return `${this.file}:${this.reason}`;
  }
};
var dr = class {
  constructor() {
    this.conflicts = [], this.merges = [], this.result = "success";
  }
  get failed() {
    return this.conflicts.length > 0;
  }
  get reason() {
    return this.result;
  }
  toString() {
    return this.conflicts.length ? `CONFLICTS: ${this.conflicts.join(", ")}` : "OK";
  }
};
var ie = class {
  constructor() {
    this.remoteMessages = {
      all: []
    }, this.created = [], this.deleted = [], this.files = [], this.deletions = {}, this.insertions = {}, this.summary = {
      changes: 0,
      deletions: 0,
      insertions: 0
    };
  }
};
var gr = class {
  constructor() {
    this.remote = "", this.hash = {
      local: "",
      remote: ""
    }, this.branch = {
      local: "",
      remote: ""
    }, this.message = "";
  }
  toString() {
    return this.message;
  }
};
function tt(t2) {
  return t2.objects = t2.objects || {
    compressing: 0,
    counting: 0,
    enumerating: 0,
    packReused: 0,
    reused: { count: 0, delta: 0 },
    total: { count: 0, delta: 0 }
  };
}
function Ct(t2) {
  const e = /^\s*(\d+)/.exec(t2), n = /delta (\d+)/i.exec(t2);
  return {
    count: p(e && e[1] || "0"),
    delta: p(n && n[1] || "0")
  };
}
var yr = [
  new x2(
    /^remote:\s*(enumerating|counting|compressing) objects: (\d+),/i,
    (t2, [e, n]) => {
      const r2 = e.toLowerCase(), s = tt(t2.remoteMessages);
      Object.assign(s, { [r2]: p(n) });
    }
  ),
  new x2(
    /^remote:\s*(enumerating|counting|compressing) objects: \d+% \(\d+\/(\d+)\),/i,
    (t2, [e, n]) => {
      const r2 = e.toLowerCase(), s = tt(t2.remoteMessages);
      Object.assign(s, { [r2]: p(n) });
    }
  ),
  new x2(
    /total ([^,]+), reused ([^,]+), pack-reused (\d+)/i,
    (t2, [e, n, r2]) => {
      const s = tt(t2.remoteMessages);
      s.total = Ct(e), s.reused = Ct(n), s.packReused = p(r2);
    }
  )
];
var wr = [
  new x2(/^remote:\s*(.+)$/, (t2, [e]) => (t2.remoteMessages.all.push(e.trim()), false)),
  ...yr,
  new x2(
    [/create a (?:pull|merge) request/i, /\s(https?:\/\/\S+)$/],
    (t2, [e]) => {
      t2.remoteMessages.pullRequestUrl = e;
    }
  ),
  new x2(
    [/found (\d+) vulnerabilities.+\(([^)]+)\)/i, /\s(https?:\/\/\S+)$/],
    (t2, [e, n, r2]) => {
      t2.remoteMessages.vulnerabilities = {
        count: p(e),
        summary: n,
        url: r2
      };
    }
  )
];
function ae(t2, e) {
  return E2({ remoteMessages: new br() }, wr, e);
}
var br = class {
  constructor() {
    this.all = [];
  }
};
var Tr = /^\s*(.+?)\s+\|\s+\d+\s*(\+*)(-*)/;
var kr = /(\d+)\D+((\d+)\D+\(\+\))?(\D+(\d+)\D+\(-\))?/;
var _r = /^(create|delete) mode \d+ (.+)/;
var vr = [
  new l2(Tr, (t2, [e, n, r2]) => {
    t2.files.push(e), n && (t2.insertions[e] = n.length), r2 && (t2.deletions[e] = r2.length);
  }),
  new l2(kr, (t2, [e, , n, , r2]) => n !== void 0 || r2 !== void 0 ? (t2.summary.changes = +e || 0, t2.summary.insertions = +n || 0, t2.summary.deletions = +r2 || 0, true) : false),
  new l2(_r, (t2, [e, n]) => {
    S2(t2.files, n), S2(e === "create" ? t2.created : t2.deleted, n);
  })
];
var Er = [
  new l2(/^from\s(.+)$/i, (t2, [e]) => {
    t2.remote = e;
  }),
  new l2(/^fatal:\s(.+)$/, (t2, [e]) => {
    t2.message = e;
  }),
  new l2(
    /([a-z0-9]+)\.\.([a-z0-9]+)\s+(\S+)\s+->\s+(\S+)$/,
    (t2, [e, n, r2, s]) => {
      t2.branch.local = r2, t2.hash.local = e, t2.branch.remote = s, t2.hash.remote = n;
    }
  )
];
var Sr = (t2, e) => E2(new ie(), vr, [t2, e]);
var ue = (t2, e) => Object.assign(
  new ie(),
  Sr(t2, e),
  ae(t2, e)
);
function Rr(t2, e) {
  const n = E2(new gr(), Er, [t2, e]);
  return n.message && n;
}
var Or = [
  new l2(/^Auto-merging\s+(.+)$/, (t2, [e]) => {
    t2.merges.push(e);
  }),
  new l2(/^CONFLICT\s+\((.+)\): Merge conflict in (.+)$/, (t2, [e, n]) => {
    t2.conflicts.push(new Z2(e, n));
  }),
  new l2(
    /^CONFLICT\s+\((.+\/delete)\): (.+) deleted in (.+) and/,
    (t2, [e, n, r2]) => {
      t2.conflicts.push(new Z2(e, n, { deleteRef: r2 }));
    }
  ),
  new l2(/^CONFLICT\s+\((.+)\):/, (t2, [e]) => {
    t2.conflicts.push(new Z2(e, null));
  }),
  new l2(/^Automatic merge failed;\s+(.+)$/, (t2, [e]) => {
    t2.result = e;
  })
];
var Cr = (t2, e) => Object.assign(Ar(t2), ue(t2, e));
var Ar = (t2) => E2(new dr(), Or, t2);
function At(t2) {
  return t2.length ? {
    commands: ["merge", ...t2],
    format: "utf-8",
    parser(e, n) {
      const r2 = Cr(e, n);
      if (r2.failed)
        throw new at(r2);
      return r2;
    }
  } : b2("Git.merge requires at least one option");
}
function xr(t2, e, n) {
  const r2 = n.includes("deleted"), s = n.includes("tag") || /^refs\/tags/.test(t2), o2 = !n.includes("new");
  return {
    deleted: r2,
    tag: s,
    branch: !s,
    new: !o2,
    alreadyUpdated: o2,
    local: t2,
    remote: e
  };
}
var Nr = [
  new l2(/^Pushing to (.+)$/, (t2, [e]) => {
    t2.repo = e;
  }),
  new l2(/^updating local tracking ref '(.+)'/, (t2, [e]) => {
    t2.ref = {
      ...t2.ref || {},
      local: e
    };
  }),
  new l2(/^[=*-]\s+([^:]+):(\S+)\s+\[(.+)]$/, (t2, [e, n, r2]) => {
    t2.pushed.push(xr(e, n, r2));
  }),
  new l2(
    /^Branch '([^']+)' set up to track remote branch '([^']+)' from '([^']+)'/,
    (t2, [e, n, r2]) => {
      t2.branch = {
        ...t2.branch || {},
        local: e,
        remote: n,
        remoteName: r2
      };
    }
  ),
  new l2(
    /^([^:]+):(\S+)\s+([a-z0-9]+)\.\.([a-z0-9]+)$/,
    (t2, [e, n, r2, s]) => {
      t2.update = {
        head: {
          local: e,
          remote: n
        },
        hash: {
          from: r2,
          to: s
        }
      };
    }
  )
];
var $r = (t2, e) => {
  const n = Pr(t2, e), r2 = ae(t2, e);
  return {
    ...n,
    ...r2
  };
};
var Pr = (t2, e) => E2({ pushed: [] }, Nr, [t2, e]);
function Mr(t2 = {}, e) {
  return S2(e, "--tags"), ce(t2, e);
}
function ce(t2 = {}, e) {
  const n = ["push", ...e];
  return t2.branch && n.splice(1, 0, t2.branch), t2.remote && n.splice(1, 0, t2.remote), ct(n, "-v"), S2(n, "--verbose"), S2(n, "--porcelain"), {
    commands: n,
    format: "utf-8",
    parser: $r
  };
}
function Dr() {
  return {
    showBuffer() {
      const t2 = ["show", ...h2(arguments, 1)];
      return t2.includes("--binary") || t2.splice(1, 0, "--binary"), this._runTask(
        Gt(t2),
        u(arguments)
      );
    },
    show() {
      const t2 = ["show", ...h2(arguments, 1)];
      return this._runTask(
        g(t2),
        u(arguments)
      );
    }
  };
}
var Lr = /^(.+)\0(.+)$/;
var jr = class {
  constructor(e, n, r2) {
    if (this.path = e, this.index = n, this.working_dir = r2, n === "R" || r2 === "R") {
      const s = Lr.exec(e) || [null, e, e];
      this.from = s[2] || "", this.path = s[1] || "";
    }
  }
};
var Br = class {
  constructor() {
    this.not_added = [], this.conflicted = [], this.created = [], this.deleted = [], this.ignored = void 0, this.modified = [], this.renamed = [], this.files = [], this.staged = [], this.ahead = 0, this.behind = 0, this.current = null, this.tracking = null, this.detached = false, this.isClean = () => !this.files.length;
  }
};
function xt(t2) {
  const [e, n] = t2.split(I2);
  return {
    from: n || e,
    to: e
  };
}
function _2(t2, e, n) {
  return [`${t2}${e}`, n];
}
function et(t2, ...e) {
  return e.map((n) => _2(t2, n, (r2, s) => r2.conflicted.push(s)));
}
var Ir = new Map([
  _2(
    " ",
    "A",
    (t2, e) => t2.created.push(e)
  ),
  _2(
    " ",
    "D",
    (t2, e) => t2.deleted.push(e)
  ),
  _2(
    " ",
    "M",
    (t2, e) => t2.modified.push(e)
  ),
  _2("A", " ", (t2, e) => {
    t2.created.push(e), t2.staged.push(e);
  }),
  _2("A", "M", (t2, e) => {
    t2.created.push(e), t2.staged.push(e), t2.modified.push(e);
  }),
  _2("D", " ", (t2, e) => {
    t2.deleted.push(e), t2.staged.push(e);
  }),
  _2("M", " ", (t2, e) => {
    t2.modified.push(e), t2.staged.push(e);
  }),
  _2("M", "M", (t2, e) => {
    t2.modified.push(e), t2.staged.push(e);
  }),
  _2("R", " ", (t2, e) => {
    t2.renamed.push(xt(e));
  }),
  _2("R", "M", (t2, e) => {
    const n = xt(e);
    t2.renamed.push(n), t2.modified.push(n.to);
  }),
  _2("!", "!", (t2, e) => {
    (t2.ignored = t2.ignored || []).push(e);
  }),
  _2(
    "?",
    "?",
    (t2, e) => t2.not_added.push(e)
  ),
  ...et(
    "A",
    "A",
    "U"
    /* UNMERGED */
  ),
  ...et(
    "D",
    "D",
    "U"
    /* UNMERGED */
  ),
  ...et(
    "U",
    "A",
    "D",
    "U"
    /* UNMERGED */
  ),
  [
    "##",
    (t2, e) => {
      const n = /ahead (\d+)/, r2 = /behind (\d+)/, s = /^(.+?(?=(?:\.{3}|\s|$)))/, o2 = /\.{3}(\S*)/, i = /\son\s(\S+?)(?=\.{3}|$)/;
      let a = n.exec(e);
      t2.ahead = a && +a[1] || 0, a = r2.exec(e), t2.behind = a && +a[1] || 0, a = s.exec(e), t2.current = d(a == null ? void 0 : a[1], m, null), a = o2.exec(e), t2.tracking = d(a == null ? void 0 : a[1], m, null), a = i.exec(e), a && (t2.current = d(a == null ? void 0 : a[1], m, t2.current)), t2.detached = /\(no branch\)/.test(e);
    }
  ]
]);
var Ur = function(t2) {
  const e = t2.split(I2), n = new Br();
  for (let r2 = 0, s = e.length; r2 < s; ) {
    let o2 = e[r2++].trim();
    o2 && (o2.charAt(0) === "R" && (o2 += I2 + (e[r2++] || "")), Fr(n, o2));
  }
  return n;
};
function Fr(t2, e) {
  const n = e.trim();
  switch (" ") {
    case n.charAt(2):
      return r2(n.charAt(0), n.charAt(1), n.slice(3));
    case n.charAt(1):
      return r2(" ", n.charAt(0), n.slice(2));
    default:
      return;
  }
  function r2(s, o2, i) {
    const a = `${s}${o2}`, c3 = Ir.get(a);
    c3 && c3(t2, i), a !== "##" && a !== "!!" && t2.files.push(new jr(i, s, o2));
  }
}
var Gr = ["--null", "-z"];
function zr(t2) {
  return {
    format: "utf-8",
    commands: [
      "status",
      "--porcelain",
      "-b",
      "-u",
      "--null",
      ...t2.filter((n) => !Gr.includes(n))
    ],
    parser(n) {
      return Ur(n);
    }
  };
}
var fe = "installed=false";
function q2(t2 = 0, e = 0, n = 0, r2 = "", s = true) {
  return Object.defineProperty(
    {
      major: t2,
      minor: e,
      patch: n,
      agent: r2,
      installed: s
    },
    "toString",
    {
      value() {
        return `${this.major}.${this.minor}.${this.patch}`;
      },
      configurable: false,
      enumerable: false
    }
  );
}
function qr() {
  return q2(0, 0, 0, "", false);
}
function Wr() {
  return {
    version() {
      return this._runTask({
        commands: ["--version"],
        format: "utf-8",
        parser: Kr,
        onError(t2, e, n, r2) {
          if (t2.exitCode === V2.NOT_FOUND)
            return n(Buffer.from(fe));
          r2(e);
        }
      });
    }
  };
}
var Hr = [
  new l2(
    /version (\d+)\.(\d+)\.(\d+)(?:\s*\((.+)\))?/,
    (t2, [e, n, r2, s = ""]) => {
      Object.assign(
        t2,
        q2(p(e), p(n), p(r2), s)
      );
    }
  ),
  new l2(
    /version (\d+)\.(\d+)\.(\D+)(.+)?$/,
    (t2, [e, n, r2, s = ""]) => {
      Object.assign(t2, q2(p(e), p(n), r2, s));
    }
  )
];
function Kr(t2) {
  return t2 === fe ? qr() : E2(q2(0, 0, 0, t2), Hr, t2);
}
var le = class {
  constructor(e) {
    this._executor = e;
  }
  _runTask(e, n) {
    const r2 = this._executor.chain(), s = r2.push(e);
    return n && Ln(e, s, n), Object.create(this, {
      then: { value: s.then.bind(s) },
      catch: { value: s.catch.bind(s) },
      _executor: { value: r2 }
    });
  }
  add(e) {
    return this._runTask(
      g(["add", ...v(e)]),
      u(arguments)
    );
  }
  cwd(e) {
    const n = u(arguments);
    return typeof e == "string" ? this._runTask(St(e, this._executor), n) : typeof (e == null ? void 0 : e.path) == "string" ? this._runTask(
      St(
        e.path,
        e.root && this._executor || void 0
      ),
      n
    ) : this._runTask(
      b2("Git.cwd: workingDirectory must be supplied as a string"),
      n
    );
  }
  hashObject(e, n) {
    return this._runTask(
      Vn(e, n === true),
      u(arguments)
    );
  }
  init(e) {
    return this._runTask(
      Zn(e === true, this._executor.cwd, h2(arguments)),
      u(arguments)
    );
  }
  merge() {
    return this._runTask(
      At(h2(arguments)),
      u(arguments)
    );
  }
  mergeFromTo(e, n) {
    return m(e) && m(n) ? this._runTask(
      At([e, n, ...h2(arguments)]),
      u(arguments, false)
    ) : this._runTask(
      b2(
        "Git.mergeFromTo requires that the 'remote' and 'branch' arguments are supplied as strings"
      )
    );
  }
  outputHandler(e) {
    return this._executor.outputHandler = e, this;
  }
  push() {
    const e = ce(
      {
        remote: d(arguments[0], m),
        branch: d(arguments[1], m)
      },
      h2(arguments)
    );
    return this._runTask(e, u(arguments));
  }
  stash() {
    return this._runTask(
      g(["stash", ...h2(arguments)]),
      u(arguments)
    );
  }
  status() {
    return this._runTask(
      zr(h2(arguments)),
      u(arguments)
    );
  }
};
Object.assign(
  le.prototype,
  jn(),
  In(),
  zn(),
  Tn(),
  Hn(),
  Kn(),
  On(),
  er(),
  pr(),
  Dr(),
  Wr()
);
var Vr = /* @__PURE__ */ (() => {
  let t2 = 0;
  return () => {
    t2++;
    const { promise: e, done: n } = (0, import_promise_deferred.createDeferred)();
    return {
      promise: e,
      done: n,
      id: t2
    };
  };
})();
var Xr = class {
  constructor(e = 2) {
    this.concurrency = e, this.logger = $2("", "scheduler"), this.pending = [], this.running = [], this.logger("Constructed, concurrency=%s", e);
  }
  schedule() {
    if (!this.pending.length || this.running.length >= this.concurrency) {
      this.logger(
        "Schedule attempt ignored, pending=%s running=%s concurrency=%s",
        this.pending.length,
        this.running.length,
        this.concurrency
      );
      return;
    }
    const e = S2(this.running, this.pending.shift());
    this.logger("Attempting id=%s", e.id), e.done(() => {
      this.logger("Completing id=", e.id), ct(this.running, e), this.schedule();
    });
  }
  next() {
    const { promise: e, id: n } = S2(this.pending, Vr());
    return this.logger("Scheduling id=%s", n), this.schedule(), e;
  }
};
function Yr(t2, e) {
  return g(["apply", ...e, ...t2]);
}
var he = /* @__PURE__ */ ((t2) => (t2.CURRENT = "*", t2.LINKED = "+", t2))(he || {});
var Qr = class {
  constructor() {
    this.all = [], this.branches = {}, this.current = "", this.detached = false;
  }
  push(e, n, r2, s, o2) {
    e === "*" && (this.detached = n, this.current = r2), this.all.push(r2), this.branches[r2] = {
      current: e === "*",
      linkedWorkTree: e === "+",
      name: r2,
      commit: s,
      label: o2
    };
  }
};
var Jr = [
  new l2(
    /^([*+]\s)?\((?:HEAD )?detached (?:from|at) (\S+)\)\s+([a-z0-9]+)\s(.*)$/,
    (t2, [e, n, r2, s]) => {
      t2.push(Nt(e), true, n, r2, s);
    }
  ),
  new l2(
    /^([*+]\s)?(\S+)\s+([a-z0-9]+)\s?(.*)$/s,
    (t2, [e, n, r2, s]) => {
      t2.push(Nt(e), false, n, r2, s);
    }
  )
];
var Zr = new l2(/^(\S+)$/s, (t2, [e]) => {
  t2.push(he.CURRENT, false, e, "", "");
});
function Nt(t2) {
  return t2 ? t2.charAt(0) : "";
}
function me(t2, e = false) {
  return E2(
    new Qr(),
    e ? [Zr] : Jr,
    t2
  );
}
var ts = class {
  constructor() {
    this.all = [], this.branches = {}, this.errors = [];
  }
  get success() {
    return !this.errors.length;
  }
};
function es(t2, e) {
  return {
    branch: t2,
    hash: e,
    success: true
  };
}
function ns(t2) {
  return {
    branch: t2,
    hash: null,
    success: false
  };
}
var rs = /(\S+)\s+\(\S+\s([^)]+)\)/;
var pe = /^error[^']+'([^']+)'/m;
var ss = [
  new l2(rs, (t2, [e, n]) => {
    const r2 = es(e, n);
    t2.all.push(r2), t2.branches[e] = r2;
  }),
  new l2(pe, (t2, [e]) => {
    const n = ns(e);
    t2.errors.push(n), t2.all.push(n), t2.branches[e] = n;
  })
];
var gt = (t2, e) => E2(new ts(), ss, [t2, e]);
function de(t2, e) {
  return e === V2.ERROR && pe.test(t2);
}
function os(t2) {
  const e = ["-d", "-D", "--delete"];
  return t2.some((n) => e.includes(n));
}
function is(t2) {
  const e = os(t2), n = t2.includes("--show-current"), r2 = ["branch", ...t2];
  return r2.length === 1 && r2.push("-a"), r2.includes("-v") || r2.splice(1, 0, "-v"), {
    format: "utf-8",
    commands: r2,
    parser(s, o2) {
      return e ? gt(s, o2).all[0] : me(s, n);
    }
  };
}
function as() {
  return {
    format: "utf-8",
    commands: ["branch", "-v"],
    parser(t2) {
      return me(t2);
    }
  };
}
function us(t2, e = false) {
  return {
    format: "utf-8",
    commands: ["branch", "-v", e ? "-D" : "-d", ...t2],
    parser(n, r2) {
      return gt(n, r2);
    },
    onError({ exitCode: n, stdOut: r2 }, s, o2, i) {
      if (!de(String(s), n))
        return i(s);
      o2(r2);
    }
  };
}
function cs(t2, e = false) {
  const n = {
    format: "utf-8",
    commands: ["branch", "-v", e ? "-D" : "-d", t2],
    parser(r2, s) {
      return gt(r2, s).branches[t2];
    },
    onError({ exitCode: r2, stdErr: s, stdOut: o2 }, i, a, c3) {
      if (!de(String(i), r2))
        return c3(i);
      throw new at(
        n.parser(F2(o2), F2(s)),
        String(i)
      );
    }
  };
  return n;
}
function fs(t2) {
  return {
    commands: ["check-ignore", ...t2],
    format: "utf-8",
    parser: ls
  };
}
function ls(t2) {
  return t2.split(/\n/g).map(hs).filter(Boolean);
}
function hs(t2) {
  const e = t2.trim().replace(/^["']|["']$/g, "");
  return e && (0, import_node_path.normalize)(e);
}
var ms = [
  new l2(/From (.+)$/, (t2, [e]) => {
    t2.remote = e;
  }),
  new l2(/\* \[new branch]\s+(\S+)\s*-> (.+)$/, (t2, [e, n]) => {
    t2.branches.push({
      name: e,
      tracking: n
    });
  }),
  new l2(/\* \[new tag]\s+(\S+)\s*-> (.+)$/, (t2, [e, n]) => {
    t2.tags.push({
      name: e,
      tracking: n
    });
  }),
  new l2(/- \[deleted]\s+\S+\s*-> (.+)$/, (t2, [e]) => {
    t2.deleted.push({
      tracking: e
    });
  }),
  new l2(
    /\s*([^.]+)\.\.(\S+)\s+(\S+)\s*-> (.+)$/,
    (t2, [e, n, r2, s]) => {
      t2.updated.push({
        name: r2,
        tracking: s,
        to: n,
        from: e
      });
    }
  )
];
function ps(t2, e) {
  return E2({
    raw: t2,
    remote: null,
    branches: [],
    tags: [],
    updated: [],
    deleted: []
  }, ms, [t2, e]);
}
function ds(t2) {
  return /^--upload-pack(=|$)/.test(t2);
}
function gs(t2, e, n) {
  const r2 = ["fetch", ...n];
  return t2 && e && r2.push(t2, e), r2.find(ds) ? b2("git.fetch: potential exploit argument blocked.") : {
    commands: r2,
    format: "utf-8",
    parser: ps
  };
}
var ys = [
  new l2(/^Renaming (.+) to (.+)$/, (t2, [e, n]) => {
    t2.moves.push({ from: e, to: n });
  })
];
function ws(t2) {
  return E2({ moves: [] }, ys, t2);
}
function bs(t2, e) {
  return {
    commands: ["mv", "-v", ...v(t2), e],
    format: "utf-8",
    parser: ws
  };
}
function Ts(t2, e, n) {
  const r2 = ["pull", ...n];
  return t2 && e && r2.splice(1, 0, t2, e), {
    commands: r2,
    format: "utf-8",
    parser(s, o2) {
      return ue(s, o2);
    },
    onError(s, o2, i, a) {
      const c3 = Rr(
        F2(s.stdOut),
        F2(s.stdErr)
      );
      if (c3)
        return a(new at(c3));
      a(o2);
    }
  };
}
function ks(t2) {
  const e = {};
  return ge(t2, ([n]) => e[n] = { name: n }), Object.values(e);
}
function _s(t2) {
  const e = {};
  return ge(t2, ([n, r2, s]) => {
    Object.hasOwn(e, n) || (e[n] = {
      name: n,
      refs: { fetch: "", push: "" }
    }), s && r2 && (e[n].refs[s.replace(/[^a-z]/g, "")] = r2);
  }), Object.values(e);
}
function ge(t2, e) {
  ut(t2, (n) => e(n.split(/\s+/)));
}
function vs(t2, e, n) {
  return g(["remote", "add", ...n, t2, e]);
}
function Es(t2) {
  const e = ["remote"];
  return t2 && e.push("-v"), {
    commands: e,
    format: "utf-8",
    parser: t2 ? _s : ks
  };
}
function Ss(t2) {
  const e = [...t2];
  return e[0] !== "ls-remote" && e.unshift("ls-remote"), g(e);
}
function Rs(t2) {
  const e = [...t2];
  return e[0] !== "remote" && e.unshift("remote"), g(e);
}
function Os(t2) {
  return g(["remote", "remove", t2]);
}
function Cs(t2 = {}, e) {
  const n = oe2(t2), r2 = ["stash", "list", ...n.commands, ...e], s = re(
    n.splitter,
    n.fields,
    pt(r2)
  );
  return dt(r2) || {
    commands: r2,
    format: "utf-8",
    parser: s
  };
}
function As(t2, e) {
  return X2(["add", t2, e]);
}
function xs(t2) {
  return X2(["init", ...t2]);
}
function X2(t2) {
  const e = [...t2];
  return e[0] !== "submodule" && e.unshift("submodule"), g(e);
}
function Ns(t2) {
  return X2(["update", ...t2]);
}
var $s = class {
  constructor(e, n) {
    this.all = e, this.latest = n;
  }
};
var Ps = function(t2, e = false) {
  const n = t2.split(`
`).map(Ds).filter(Boolean);
  e || n.sort(function(s, o2) {
    const i = s.split("."), a = o2.split(".");
    if (i.length === 1 || a.length === 1)
      return Ms(B2(i[0]), B2(a[0]));
    for (let c3 = 0, y2 = Math.max(i.length, a.length); c3 < y2; c3++) {
      const w2 = ye(B2(i[c3]), B2(a[c3]));
      if (w2)
        return w2;
    }
    return 0;
  });
  const r2 = e ? n[0] : [...n].reverse().find((s) => s.indexOf(".") >= 0);
  return new $s(n, r2);
};
function Ms(t2, e) {
  const n = Number.isNaN(t2), r2 = Number.isNaN(e);
  return n !== r2 ? n ? 1 : -1 : n ? ye(t2, e) : 0;
}
function ye(t2, e) {
  return t2 === e ? 0 : t2 > e ? 1 : -1;
}
function Ds(t2) {
  return t2.trim();
}
function B2(t2) {
  return typeof t2 == "string" && parseInt(t2.replace(/^\D+/g, ""), 10) || 0;
}
function Ls(t2 = []) {
  const e = t2.some((n) => /^--sort=/.test(n));
  return {
    format: "utf-8",
    commands: ["tag", "-l", ...t2],
    parser(n) {
      return Ps(n, e);
    }
  };
}
function js(t2) {
  return {
    format: "utf-8",
    commands: ["tag", t2],
    parser() {
      return { name: t2 };
    }
  };
}
function Bs(t2, e) {
  return {
    format: "utf-8",
    commands: ["tag", "-a", "-m", e, t2],
    parser() {
      return { name: t2 };
    }
  };
}
function f2(t2, e) {
  this._plugins = e, this._executor = new Dn(
    t2.baseDir,
    new Xr(t2.maxConcurrentProcesses),
    e
  ), this._trimmed = t2.trimmed;
}
(f2.prototype = Object.create(le.prototype)).constructor = f2;
f2.prototype.customBinary = function(t2) {
  return this._plugins.reconfigure("binary", t2), this;
};
f2.prototype.env = function(t2, e) {
  return arguments.length === 1 && typeof t2 == "object" ? this._executor.env = t2 : (this._executor.env = this._executor.env || {})[t2] = e, this;
};
f2.prototype.stashList = function(t2) {
  return this._runTask(
    Cs(
      ht(arguments) || {},
      K2(t2) && t2 || []
    ),
    u(arguments)
  );
};
f2.prototype.mv = function(t2, e) {
  return this._runTask(bs(t2, e), u(arguments));
};
f2.prototype.checkoutLatestTag = function(t2) {
  var e = this;
  return this.pull(function() {
    e.tags(function(n, r2) {
      e.checkout(r2.latest, t2);
    });
  });
};
f2.prototype.pull = function(t2, e, n, r2) {
  return this._runTask(
    Ts(
      d(t2, m),
      d(e, m),
      h2(arguments)
    ),
    u(arguments)
  );
};
f2.prototype.fetch = function(t2, e) {
  return this._runTask(
    gs(
      d(t2, m),
      d(e, m),
      h2(arguments)
    ),
    u(arguments)
  );
};
f2.prototype.tags = function(t2, e) {
  return this._runTask(
    Ls(h2(arguments)),
    u(arguments)
  );
};
f2.prototype.rebase = function() {
  return this._runTask(
    g(["rebase", ...h2(arguments)]),
    u(arguments)
  );
};
f2.prototype.reset = function(t2) {
  return this._runTask(
    An(xn(t2), h2(arguments)),
    u(arguments)
  );
};
f2.prototype.revert = function(t2) {
  const e = u(arguments);
  return typeof t2 != "string" ? this._runTask(b2("Commit must be a string"), e) : this._runTask(
    g(["revert", ...h2(arguments, 0, true), t2]),
    e
  );
};
f2.prototype.addTag = function(t2) {
  const e = typeof t2 == "string" ? js(t2) : b2("Git.addTag requires a tag name");
  return this._runTask(e, u(arguments));
};
f2.prototype.addAnnotatedTag = function(t2, e) {
  return this._runTask(
    Bs(t2, e),
    u(arguments)
  );
};
f2.prototype.deleteLocalBranch = function(t2, e, n) {
  return this._runTask(
    cs(t2, typeof e == "boolean" ? e : false),
    u(arguments)
  );
};
f2.prototype.deleteLocalBranches = function(t2, e, n) {
  return this._runTask(
    us(t2, typeof e == "boolean" ? e : false),
    u(arguments)
  );
};
f2.prototype.branch = function(t2, e) {
  return this._runTask(
    is(h2(arguments)),
    u(arguments)
  );
};
f2.prototype.branchLocal = function(t2) {
  return this._runTask(as(), u(arguments));
};
f2.prototype.raw = function(t2) {
  const e = !Array.isArray(t2), n = [].slice.call(e ? arguments : t2, 0);
  for (let s = 0; s < n.length && e; s++)
    if (!st(n[s])) {
      n.splice(s, n.length - s);
      break;
    }
  n.push(...h2(arguments, 0, true));
  var r2 = u(arguments);
  return n.length ? this._runTask(g(n, this._trimmed), r2) : this._runTask(
    b2("Raw: must supply one or more command to execute"),
    r2
  );
};
f2.prototype.submoduleAdd = function(t2, e, n) {
  return this._runTask(As(t2, e), u(arguments));
};
f2.prototype.submoduleUpdate = function(t2, e) {
  return this._runTask(
    Ns(h2(arguments, true)),
    u(arguments)
  );
};
f2.prototype.submoduleInit = function(t2, e) {
  return this._runTask(
    xs(h2(arguments, true)),
    u(arguments)
  );
};
f2.prototype.subModule = function(t2, e) {
  return this._runTask(
    X2(h2(arguments)),
    u(arguments)
  );
};
f2.prototype.listRemote = function() {
  return this._runTask(
    Ss(h2(arguments)),
    u(arguments)
  );
};
f2.prototype.addRemote = function(t2, e, n) {
  return this._runTask(
    vs(t2, e, h2(arguments)),
    u(arguments)
  );
};
f2.prototype.removeRemote = function(t2, e) {
  return this._runTask(Os(t2), u(arguments));
};
f2.prototype.getRemotes = function(t2, e) {
  return this._runTask(Es(t2 === true), u(arguments));
};
f2.prototype.remote = function(t2, e) {
  return this._runTask(
    Rs(h2(arguments)),
    u(arguments)
  );
};
f2.prototype.tag = function(t2, e) {
  const n = h2(arguments);
  return n[0] !== "tag" && n.unshift("tag"), this._runTask(g(n), u(arguments));
};
f2.prototype.updateServerInfo = function(t2) {
  return this._runTask(
    g(["update-server-info"]),
    u(arguments)
  );
};
f2.prototype.pushTags = function(t2, e) {
  const n = Mr(
    { remote: d(t2, m) },
    h2(arguments)
  );
  return this._runTask(n, u(arguments));
};
f2.prototype.rm = function(t2) {
  return this._runTask(
    g(["rm", "-f", ...v(t2)]),
    u(arguments)
  );
};
f2.prototype.rmKeepLocal = function(t2) {
  return this._runTask(
    g(["rm", "--cached", ...v(t2)]),
    u(arguments)
  );
};
f2.prototype.catFile = function(t2, e) {
  return this._catFile("utf-8", arguments);
};
f2.prototype.binaryCatFile = function() {
  return this._catFile("buffer", arguments);
};
f2.prototype._catFile = function(t2, e) {
  var n = u(e), r2 = ["cat-file"], s = e[0];
  if (typeof s == "string")
    return this._runTask(
      b2("Git.catFile: options must be supplied as an array of strings"),
      n
    );
  Array.isArray(s) && r2.push.apply(r2, s);
  const o2 = t2 === "buffer" ? Gt(r2) : g(r2);
  return this._runTask(o2, n);
};
f2.prototype.diff = function(t2, e) {
  const n = m(t2) ? b2(
    "git.diff: supplying options as a single string is no longer supported, switch to an array of strings"
  ) : g(["diff", ...h2(arguments)]);
  return this._runTask(n, u(arguments));
};
f2.prototype.diffSummary = function() {
  return this._runTask(
    fr(h2(arguments, 1)),
    u(arguments)
  );
};
f2.prototype.applyPatch = function(t2) {
  const e = G2(t2) ? Yr(v(t2), h2([].slice.call(arguments, 1))) : b2(
    "git.applyPatch requires one or more string patches as the first argument"
  );
  return this._runTask(e, u(arguments));
};
f2.prototype.revparse = function() {
  const t2 = ["rev-parse", ...h2(arguments, true)];
  return this._runTask(
    g(t2, true),
    u(arguments)
  );
};
f2.prototype.clean = function(t2, e, n) {
  const r2 = un(t2), s = r2 && t2.join("") || d(t2, m) || "", o2 = h2([].slice.call(arguments, r2 ? 1 : 0));
  return this._runTask(
    on(s, o2),
    u(arguments)
  );
};
f2.prototype.exec = function(t2) {
  const e = {
    commands: [],
    format: "utf-8",
    parser() {
      typeof t2 == "function" && t2();
    }
  };
  return this._runTask(e);
};
f2.prototype.checkIgnore = function(t2, e) {
  return this._runTask(
    fs(v(d(t2, G2, []))),
    u(arguments)
  );
};
f2.prototype.checkIsRepo = function(t2, e) {
  return this._runTask(
    We(d(t2, m)),
    u(arguments)
  );
};
function Is(t2) {
  return t2 ? [{
    type: "spawn.before",
    action(r2, s) {
      t2.aborted && s.kill(new A2(void 0, "abort", "Abort already signaled"));
    }
  }, {
    type: "spawn.after",
    action(r2, s) {
      function o2() {
        s.kill(new A2(void 0, "abort", "Abort signal received"));
      }
      t2.addEventListener("abort", o2), s.spawned.on("close", () => t2.removeEventListener("abort", o2));
    }
  }] : void 0;
}
var Us = $2("", "plugin:allowEnvironment");
function Fs(t2, e = false) {
  const n = new Set(t2.map((r2) => r2.toLowerCase().trim()));
  return {
    type: "spawn.options",
    action(r2, s) {
      var _a;
      const o2 = { ...(_a = r2.env) != null ? _a : process.env }, i = new Set(
        Object.keys(s.env).map((a) => a.toLowerCase().trim())
      );
      for (const a of Object.keys(o2)) {
        const c3 = a.toLowerCase().trim();
        if (!(!Gs(c3) || n.has(c3))) {
          if (i.has(c3))
            throw new A2(
              void 0,
              "allowEnvironment",
              `Use of "${a}" is blocked by the environment guard - add it to the allowEnvironment option to permit it`
            );
          Us("removing ambient guarded environment variable %s", a), delete o2[a];
        }
      }
      return {
        ...r2,
        env: {
          ...o2,
          GIT_TEST_DISALLOW_ABBREVIATED_OPTIONS: String(!e)
        }
      };
    }
  };
}
function Gs(t2) {
  const e = t2.toLowerCase().trim();
  return e.startsWith("git_") || _(e);
}
function zs(t2 = {}) {
  return {
    type: "spawn.args",
    action(e, { env: n }) {
      for (const r2 of oe(e, n))
        if (t2[r2.category] !== true)
          throw new A2(void 0, "unsafe", r2.message);
      return e;
    }
  };
}
function qs(t2) {
  const e = U(t2, "-c");
  return {
    type: "spawn.args",
    action(n) {
      return [...e, ...n];
    }
  };
}
var $t = (0, import_promise_deferred.deferred)().promise;
function Ws({
  onClose: t2 = true,
  onExit: e = 50
} = {}) {
  function n() {
    let s = -1;
    const o2 = {
      close: (0, import_promise_deferred.deferred)(),
      closeTimeout: (0, import_promise_deferred.deferred)(),
      exit: (0, import_promise_deferred.deferred)(),
      exitTimeout: (0, import_promise_deferred.deferred)()
    }, i = Promise.race([
      t2 === false ? $t : o2.closeTimeout.promise,
      e === false ? $t : o2.exitTimeout.promise
    ]);
    return r2(t2, o2.close, o2.closeTimeout), r2(e, o2.exit, o2.exitTimeout), {
      close(a) {
        s = a, o2.close.done();
      },
      exit(a) {
        s = a, o2.exit.done();
      },
      get exitCode() {
        return s;
      },
      result: i
    };
  }
  function r2(s, o2, i) {
    s !== false && (s === true ? o2.promise : o2.promise.then(() => wt(s))).then(i.done);
  }
  return {
    type: "spawn.after",
    async action(s, { spawned: o2, close: i }) {
      var _a, _b;
      const a = n();
      let c3 = true, y2 = () => {
        c3 = false;
      };
      (_a = o2.stdout) == null ? void 0 : _a.on("data", y2), (_b = o2.stderr) == null ? void 0 : _b.on("data", y2), o2.on("error", y2), o2.on("close", (w2) => a.close(w2)), o2.on("exit", (w2) => a.exit(w2));
      try {
        await a.result, c3 && await wt(50), i(a.exitCode);
      } catch (w2) {
        i(a.exitCode, w2);
      }
    }
  };
}
var we = $2("", "plugin:binary");
var Hs = "Invalid value supplied for custom binary, requires a single string or an array containing either one or two strings";
var Ks = "Invalid value supplied for custom binary, restricted characters must be removed or supply the unsafe.allowUnsafeCustomBinary option";
function Vs(t2) {
  return !t2 || !/^([a-z]:)?([a-z0-9/.\\_~-]+)$/i.test(t2);
}
function Pt(t2, e) {
  if (t2.length < 1 || t2.length > 2)
    throw new A2(void 0, "binary", Hs);
  if (t2.some(Vs))
    if (e)
      we("permitted unsafe binary %o", t2);
    else
      throw new A2(void 0, "binary", Ks);
  const [r2, s] = t2;
  return {
    binary: r2,
    prefix: s
  };
}
function Xs(t2, e = ["git"], n = false) {
  let r2 = Pt(v(e), n);
  t2.on("binary", (s) => {
    r2 = Pt(v(s), n), we.info("reconfiguring %o", r2);
  }), t2.append("spawn.binary", () => r2.binary), t2.append("spawn.args", (s) => r2.prefix ? [r2.prefix, ...s] : s);
}
var be = {
  DISALLOWED_ABBREVIATED: {
    text: "disallowed abbreviated or ambiguous option",
    solution: "Unambiguous abbreviated options blocked with unsafe.allowAbbreviatedOptions setting: {message}"
  },
  UNKNOWN: {
    text: "~ unknown ~",
    solution: void 0
  }
};
function Ys(t2) {
  if (!t2)
    return "UNKNOWN";
  for (const [e, { text: n }] of Object.entries(be))
    if (t2.startsWith(`fatal: ${n}`))
      return e;
  return "UNKNOWN";
}
var Qs = class extends O2 {
  constructor(e = "") {
    var _a, _b;
    const n = Ys(e);
    super(void 0, (_b = (_a = be[n].solution) == null ? void 0 : _a.replace("{message}", e)) != null ? _b : e), this.reason = n;
  }
};
function Js(t2) {
  return !!(t2.exitCode && t2.stdErr.length);
}
function Zs(t2) {
  return Buffer.concat([...t2.stdOut, ...t2.stdErr]);
}
function to(t2 = false, e = Js, n = Zs) {
  return (r2, s) => !t2 && r2 || !e(s) ? r2 : n(s);
}
function eo(t2, e) {
  return t2 === 128 && e.startsWith("fatal:") ? new Qs(e) : new O2(void 0, e);
}
function Mt(t2) {
  return {
    type: "task.error",
    action(e, n) {
      const r2 = t2(e.error, {
        stdErr: n.stdErr,
        stdOut: n.stdOut,
        exitCode: n.exitCode
      });
      return Buffer.isBuffer(r2) ? {
        error: eo(n.exitCode, r2.toString("utf-8"))
      } : {
        error: r2
      };
    }
  };
}
var nt = $2("", "plugin:input");
function no(t2) {
  return {
    type: "spawn.after",
    action(e, { commands: n, input: r2, spawned: { stdin: s } }) {
      var _a;
      if (!s)
        return;
      const o2 = (_a = t2 == null ? void 0 : t2([...n])) != null ? _a : r2;
      if (!o2)
        return nt("generated zero length content, not writing to stdin");
      nt("writing %s bytes to stdin", Le(o2)), s.on("error", (i) => {
        i.code !== "EPIPE" && nt("[ERROR] stdin error %o", i);
      }), s.end(o2);
    }
  };
}
var ro = class {
  constructor() {
    this.plugins = /* @__PURE__ */ new Set(), this.events = new import_node_events.EventEmitter();
  }
  on(e, n) {
    this.events.on(e, n);
  }
  reconfigure(e, n) {
    this.events.emit(e, n);
  }
  append(e, n) {
    const r2 = S2(this.plugins, { type: e, action: n });
    return () => this.plugins.delete(r2);
  }
  add(e) {
    const n = [];
    return v(e).forEach(
      (r2) => {
        r2 && this.plugins.add(S2(n, r2));
      }
    ), () => {
      n.forEach((r2) => {
        this.plugins.delete(r2);
      });
    };
  }
  exec(e, n, r2) {
    let s = n;
    const o2 = Object.freeze(Object.create(r2));
    for (const i of this.plugins)
      i.type === e && (s = i.action(s, o2));
    return s;
  }
};
function so(t2) {
  const e = "--progress", n = ["checkout", "clone", "fetch", "pull", "push"];
  return [{
    type: "spawn.args",
    action(o2, i) {
      return n.includes(i.method) ? De(o2, e) : o2;
    }
  }, {
    type: "spawn.after",
    action(o2, i) {
      var _a;
      i.commands.includes(e) && ((_a = i.spawned.stderr) == null ? void 0 : _a.on("data", (a) => {
        const c3 = /^([\s\S]+?):\s*(\d+)% \((\d+)\/(\d+)\)/.exec(a.toString("utf8"));
        c3 && t2({
          method: i.method,
          stage: oo(c3[1]),
          progress: p(c3[2]),
          processed: p(c3[3]),
          total: p(c3[4])
        });
      }));
    }
  }];
}
function oo(t2) {
  return String(t2.toLowerCase().split(" ", 1)) || "unknown";
}
function io(t2) {
  const e = je(t2, ["uid", "gid"]);
  return {
    type: "spawn.options",
    action(n) {
      return { ...e, ...n };
    }
  };
}
function ao() {
  return {
    type: "spawn.args",
    action(t2) {
      const e = [];
      let n;
      function r2(s) {
        (n = n || []).push(...s);
      }
      for (let s = 0; s < t2.length; s++) {
        const o2 = t2[s];
        if (r(o2)) {
          r2(o(o2));
          continue;
        }
        if (o2 === "--") {
          r2(
            t2.slice(s + 1).flatMap((i) => r(i) && o(i) || i)
          );
          break;
        }
        e.push(o2);
      }
      return n ? [...e, "--", ...n.map(String)] : e;
    }
  };
}
function uo({
  block: t2,
  stdErr: e = true,
  stdOut: n = true
}) {
  if (t2 > 0)
    return {
      type: "spawn.after",
      action(r2, s) {
        var _a, _b;
        let o2;
        function i() {
          o2 && clearTimeout(o2), o2 = setTimeout(c3, t2);
        }
        function a() {
          var _a2, _b2;
          (_a2 = s.spawned.stdout) == null ? void 0 : _a2.off("data", i), (_b2 = s.spawned.stderr) == null ? void 0 : _b2.off("data", i), s.spawned.off("exit", a), s.spawned.off("close", a), o2 && clearTimeout(o2);
        }
        function c3() {
          a(), s.kill(new A2(void 0, "timeout", "block timeout reached"));
        }
        n && ((_a = s.spawned.stdout) == null ? void 0 : _a.on("data", i)), e && ((_b = s.spawned.stderr) == null ? void 0 : _b.on("data", i)), s.spawned.on("exit", a), s.spawned.on("close", a), i();
      }
    };
}
var wo = (t2, e) => {
  var _a, _b, _c;
  const n = new ro(), r2 = Ge(
    t2 && (typeof t2 == "string" ? { baseDir: t2 } : t2) || {},
    e
  );
  if (!Lt(r2.baseDir))
    throw new Ae(
      r2,
      "Cannot use simple-git on a directory that does not exist"
    );
  return Array.isArray(r2.config) && n.add(qs(r2.config)), n.add(zs(r2.unsafe)), n.add(Ws(r2.completion)), r2.abort && n.add(Is(r2.abort)), r2.progress && n.add(so(r2.progress)), r2.timeout && n.add(uo(r2.timeout)), r2.spawnOptions && n.add(io(r2.spawnOptions)), n.add(ao()), n.add(no(r2.input)), n.add(Mt(to(true))), r2.errors && n.add(Mt(r2.errors)), Xs(n, r2.binary, (_a = r2.unsafe) == null ? void 0 : _a.allowUnsafeCustomBinary), n.add(
    Fs((_b = r2.allowEnvironment) != null ? _b : [], (_c = r2.unsafe) == null ? void 0 : _c.allowAbbreviatedOptions)
  ), new f2(r2, n);
};

// main.ts
var fsp = __toESM(require("fs/promises"));
var path3 = __toESM(require("path"));
var os3 = __toESM(require("os"));

// src/sync.ts
var import_obsidian = require("obsidian");
var SyncConflictModal = class extends import_obsidian.Modal {
  constructor(app, plugin, article, localFile, onResult) {
    super(app);
    this.plugin = plugin;
    this.article = article;
    this.localFile = localFile;
    this.onResult = onResult;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("git-sync-conflict-modal");
    contentEl.createEl("h2", { text: "\u53D1\u73B0\u540C\u540D\u6587\u7AE0" });
    contentEl.createEl("p", {
      text: `Git \u4ED3\u5E93\u4E2D\u7684\u300A${this.article.title}\u300B\u4E0E\u672C\u5730\u6587\u7AE0\u540C\u540D\u3002\u8BF7\u9009\u62E9\u540C\u6B65\u65B9\u5F0F\u3002`,
      cls: "git-sync-conflict-description"
    });
    const info = contentEl.createDiv({ cls: "git-sync-conflict-info" });
    info.createEl("div", {
      text: `\u672C\u5730\u6587\u4EF6\uFF1A${this.localFile.path}`
    });
    info.createEl("div", {
      text: `Git \u6587\u4EF6\uFF1A${this.article.relativePath}`
    });
    const options = contentEl.createDiv({ cls: "git-sync-conflict-options" });
    const overwrite = options.createEl("button", {
      text: "\u8986\u76D6\u672C\u5730\u6587\u7AE0",
      cls: "git-sync-conflict-overwrite"
    });
    overwrite.createDiv({
      text: "\u4F7F\u7528 Git \u4ED3\u5E93\u4E2D\u7684\u5185\u5BB9\u66FF\u6362\u5F53\u524D\u672C\u5730\u6587\u7AE0\u3002",
      cls: "git-sync-conflict-option-desc"
    });
    overwrite.onclick = () => {
      this.onResult("overwrite");
      this.close();
    };
    const copy = options.createEl("button", {
      text: "\u53E6\u5B58\u4E3A\u526F\u4EF6",
      cls: "git-sync-conflict-copy"
    });
    copy.createDiv({
      text: "\u4FDD\u7559\u672C\u5730\u6587\u7AE0\uFF0C\u5E76\u5C06 Git \u6587\u7AE0\u53E6\u5B58\u4E3A\u201C\u526F\u4EF6\u201D\u3002",
      cls: "git-sync-conflict-option-desc"
    });
    copy.onclick = () => {
      this.onResult("copy");
      this.close();
    };
    const cancel = contentEl.createEl("button", {
      text: "\u53D6\u6D88",
      cls: "git-sync-conflict-cancel"
    });
    cancel.onclick = () => {
      this.onResult("cancel");
      this.close();
    };
  }
  onClose() {
    this.onResult("cancel");
  }
};
async function confirmSyncConflict(plugin, article, localFile) {
  return new Promise((resolve2) => {
    let resolved = false;
    const finish = (result) => {
      if (resolved) return;
      resolved = true;
      resolve2(result);
    };
    const modal = new SyncConflictModal(
      plugin.app,
      plugin,
      article,
      localFile,
      finish
    );
    modal.open();
  });
}
async function syncArticle(plugin, article, localFile) {
  await plugin.app.vault.modify(localFile, article.content);
}
async function syncArticleAsCopy(plugin, article, localFile) {
  var _a, _b;
  const parentPath = (_b = (_a = localFile.parent) == null ? void 0 : _a.path) != null ? _b : "";
  const extension = ".md";
  const baseTitle = article.title;
  let copyName = `${baseTitle}\uFF08\u526F\u4EF6\uFF09${extension}`;
  let copyPath = parentPath && parentPath !== "/" ? `${parentPath}/${copyName}` : copyName;
  let index = 2;
  while (plugin.app.vault.getAbstractFileByPath(copyPath)) {
    copyName = `${baseTitle}\uFF08\u526F\u4EF6 ${index}\uFF09${extension}`;
    copyPath = parentPath && parentPath !== "/" ? `${parentPath}/${copyName}` : copyName;
    index++;
  }
  await plugin.app.vault.create(copyPath, article.content);
  const copyFile = plugin.app.vault.getAbstractFileByPath(copyPath);
  if (!(copyFile instanceof import_obsidian.TFile)) {
    throw new Error("\u526F\u4EF6\u5DF2\u5199\u5165\uFF0C\u4F46 Obsidian \u672A\u80FD\u8BC6\u522B\u65B0\u6587\u4EF6");
  }
  return copyFile;
}

// src/download.ts
var import_obsidian2 = require("obsidian");
var fs2 = __toESM(require("fs"));
var path = __toESM(require("path"));
async function downloadArticle(plugin, article) {
  const adapter = plugin.app.vault.adapter;
  if (!(adapter instanceof import_obsidian2.FileSystemAdapter)) {
    throw new Error("\u5F53\u524D Vault \u4E0D\u662F\u672C\u5730\u6587\u4EF6\u7CFB\u7EDF\uFF0C\u65E0\u6CD5\u4E0B\u8F7D\u6587\u7AE0");
  }
  const targetFolder = plugin.settings.targetFolder || "Git\u6587\u7AE0";
  const relativeTarget = path.join(targetFolder, article.relativePath).split(path.sep).join("/");
  const absoluteTarget = path.join(
    adapter.getBasePath(),
    relativeTarget
  );
  fs2.mkdirSync(path.dirname(absoluteTarget), { recursive: true });
  await adapter.write(relativeTarget, article.content);
  const file = plugin.app.vault.getAbstractFileByPath(relativeTarget);
  if (!(file instanceof import_obsidian2.TFile)) {
    throw new Error("\u6587\u7AE0\u5DF2\u5199\u5165\uFF0C\u4F46 Obsidian \u672A\u80FD\u8BC6\u522B\u65B0\u6587\u4EF6");
  }
  return file;
}

// src/upload.ts
var import_obsidian4 = require("obsidian");
var fs3 = __toESM(require("fs"));
var path2 = __toESM(require("path"));
var os2 = __toESM(require("os"));

// src/refresh.ts
var import_obsidian3 = require("obsidian");
async function refreshArticlesView(plugin, options = {}) {
  const { silent = false } = options;
  try {
    const leaves = plugin.app.workspace.getLeavesOfType(
      plugin.viewTypeArticles
    );
    if (leaves.length === 0) {
      return;
    }
    for (const leaf of leaves) {
      const view = leaf.view;
      if (view && typeof view.refresh === "function") {
        await view.refresh();
      }
    }
  } catch (error) {
    if (!silent) {
      new import_obsidian3.Notice(
        `\u5237\u65B0\u6587\u7AE0\u5217\u8868\u5931\u8D25\uFF1A${error instanceof Error ? error.message : String(error)}`
      );
    } else {
      console.warn("\u5237\u65B0\u6587\u7AE0\u5217\u8868\u5931\u8D25\uFF1A", error);
    }
  }
}

// src/upload.ts
var UploadArticleModal = class extends import_obsidian4.Modal {
  constructor(app, plugin, file) {
    super(app);
    this.folders = [];
    this.selectedFolder = "";
    this.plugin = plugin;
    this.file = file;
  }
  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("git-upload-modal");
    contentEl.createEl("h2", { text: `\u4E0A\u4F20\uFF1A${this.file.basename}` });
    contentEl.createEl("p", {
      text: "\u9009\u62E9 Git \u4ED3\u5E93\u4E2D\u7684\u76EE\u6807\u6587\u4EF6\u5939\u3002\u6587\u4EF6\u5939\u4E0D\u5B58\u5728\u65F6\u4F1A\u81EA\u52A8\u521B\u5EFA\u3002",
      cls: "git-upload-description"
    });
    const loading = contentEl.createDiv({
      text: "\u6B63\u5728\u8BFB\u53D6 Git \u4ED3\u5E93\u6587\u4EF6\u5939\u2026",
      cls: "git-upload-loading"
    });
    try {
      this.folders = await this.plugin.getRemoteFolders();
      loading.remove();
      this.renderForm();
    } catch (error) {
      loading.remove();
      contentEl.createDiv({
        text: `\u8BFB\u53D6\u4ED3\u5E93\u5931\u8D25\uFF1A${error instanceof Error ? error.message : String(error)}`,
        cls: "git-upload-error"
      });
    }
  }
  renderForm() {
    const { contentEl } = this;
    const field = contentEl.createDiv({ cls: "git-upload-field" });
    field.createEl("label", {
      text: "\u5DF2\u6709\u6587\u4EF6\u5939",
      cls: "git-upload-label"
    });
    this.selectEl = field.createEl("select", {
      cls: "git-upload-select"
    });
    this.selectEl.createEl("option", {
      text: "\u4ED3\u5E93\u6839\u76EE\u5F55",
      value: ""
    });
    for (const folder of this.folders) {
      this.selectEl.createEl("option", {
        text: folder || "\u4ED3\u5E93\u6839\u76EE\u5F55",
        value: folder
      });
    }
    this.selectEl.onchange = () => {
      this.selectedFolder = this.selectEl.value;
      if (this.selectEl.value) {
        this.folderInput.value = "";
      }
    };
    const newField = contentEl.createDiv({ cls: "git-upload-field" });
    newField.createEl("label", {
      text: "\u6216\u521B\u5EFA\u65B0\u6587\u4EF6\u5939",
      cls: "git-upload-label"
    });
    this.folderInput = newField.createEl("input", {
      type: "text",
      placeholder: "\u4F8B\u5982\uFF1AAI/\u6A21\u578B\u7B14\u8BB0",
      cls: "git-upload-input"
    });
    newField.createDiv({
      text: "\u652F\u6301\u591A\u7EA7\u76EE\u5F55\uFF0C\u4F8B\u5982\uFF1A\u6280\u672F/AI/Ollama",
      cls: "git-upload-hint"
    });
    this.folderInput.oninput = () => {
      if (this.folderInput.value.trim()) {
        this.selectEl.value = "";
        this.selectedFolder = "";
      }
    };
    const footer = contentEl.createDiv({ cls: "git-upload-footer" });
    const cancel = footer.createEl("button", {
      text: "\u53D6\u6D88",
      cls: "git-upload-cancel"
    });
    cancel.onclick = () => this.close();
    this.uploadButton = footer.createEl("button", {
      text: "\u4E0A\u4F20\u5230 Git",
      cls: "git-upload-submit"
    });
    this.uploadButton.onclick = async () => {
      const customFolder = this.folderInput.value.trim();
      const folder = customFolder || this.selectEl.value;
      this.uploadButton.disabled = true;
      this.uploadButton.textContent = "\u4E0A\u4F20\u4E2D\u2026";
      try {
        await uploadLocalArticle(this.plugin, this.file, folder);
        new import_obsidian4.Notice(
          `\u300A${this.file.basename}\u300B\u5DF2\u4E0A\u4F20\u5230 ${folder || "\u4ED3\u5E93\u6839\u76EE\u5F55"}`
        );
        await refreshArticlesView(this.plugin, { silent: true });
        this.close();
      } catch (error) {
        new import_obsidian4.Notice(
          `\u4E0A\u4F20\u5931\u8D25\uFF1A${error instanceof Error ? error.message : String(error)}`
        );
      } finally {
        this.uploadButton.disabled = false;
        this.uploadButton.textContent = "\u4E0A\u4F20\u5230 Git";
      }
    };
  }
};
async function uploadLocalArticle(plugin, file, folder) {
  const adapter = plugin.app.vault.adapter;
  if (!(adapter instanceof import_obsidian4.FileSystemAdapter)) {
    throw new Error("\u5F53\u524D Vault \u4E0D\u662F\u672C\u5730\u6587\u4EF6\u7CFB\u7EDF\uFF0C\u65E0\u6CD5\u4E0A\u4F20\u6587\u7AE0");
  }
  const tempDir = await plugin.cloneToTemp();
  try {
    let cleanFolder = folder.trim().replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
    const folderParts = cleanFolder ? cleanFolder.split("/").filter((part) => part && part !== "." && part !== "..") : [];
    cleanFolder = folderParts.join("/");
    const content = await plugin.app.vault.read(file);
    const targetRelative = cleanFolder ? `${cleanFolder}/${file.basename}.md` : `${file.basename}.md`;
    const targetAbsolute = path2.resolve(tempDir, targetRelative);
    const normalizedTemp = path2.resolve(tempDir) + path2.sep;
    if (!targetAbsolute.startsWith(normalizedTemp)) {
      throw new Error("\u65E0\u6548\u7684 Git \u6587\u4EF6\u5939\u8DEF\u5F84");
    }
    fs3.mkdirSync(path2.dirname(targetAbsolute), { recursive: true });
    const exists = fs3.existsSync(targetAbsolute);
    fs3.writeFileSync(targetAbsolute, content, "utf8");
    const git = wo({
      baseDir: tempDir,
      trimmed: true
    });
    if (plugin.settings.sshKey.trim()) {
      const keyPath = path2.join(
        os2.tmpdir(),
        `obsidian-git-key-${Date.now()}`
      );
      try {
        fs3.writeFileSync(
          keyPath,
          plugin.settings.sshKey.trim() + "\n",
          { mode: 384 }
        );
        git.env({
          ...process.env,
          GIT_SSH_COMMAND: `ssh -i "${keyPath}" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null`
        });
        await commitAndPushArticle(
          git,
          targetRelative,
          file.basename,
          exists
        );
      } finally {
        if (fs3.existsSync(keyPath)) {
          try {
            fs3.unlinkSync(keyPath);
          } catch (e) {
          }
        }
      }
    } else {
      await commitAndPushArticle(
        git,
        targetRelative,
        file.basename,
        exists
      );
    }
  } finally {
    plugin.removeTempDir(tempDir);
  }
}
async function commitAndPushArticle(git, targetRelative, title, existed) {
  await git.add(targetRelative);
  const status = await git.status();
  if (!status.staged.length) {
    throw new Error("\u6587\u7AE0\u5185\u5BB9\u6CA1\u6709\u53D8\u5316\uFF0C\u65E0\u9700\u4E0A\u4F20");
  }
  const action = existed ? "\u66F4\u65B0" : "\u4E0A\u4F20";
  await git.commit(`docs: ${action} ${title}`);
  await git.push();
  console.log(`Git ${action}\u5B8C\u6210\uFF1A${targetRelative}`);
}

// main.ts
var VIEW_TYPE_ARTICLES = "git-articles-view";
var DEFAULT_SETTINGS = {
  repoUrl: "",
  sshKey: "",
  targetFolder: "Git\u6587\u7AE0"
};
var GitArticlesView = class extends import_obsidian5.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.articles = [];
    this.localTitles = /* @__PURE__ */ new Map();
    this.isLoading = false;
    this.plugin = plugin;
    this.contentEl = this.containerEl.children[1];
  }
  getViewType() {
    return VIEW_TYPE_ARTICLES;
  }
  getDisplayText() {
    return "Git \u6587\u7AE0";
  }
  getIcon() {
    return "book-open";
  }
  async onOpen() {
    await this.render();
  }
  async render() {
    await this.plugin.ensureSettingsLoaded();
    this.contentEl.empty();
    this.contentEl.addClass("git-articles-container");
    const header = this.contentEl.createDiv({ cls: "git-articles-header" });
    const titleBox = header.createDiv({ cls: "git-articles-header-title" });
    titleBox.createEl("h2", { text: "Git \u6587\u7AE0" });
    titleBox.createEl("div", {
      text: this.plugin.settings.repoUrl ? "\u4ECE\u5DF2\u914D\u7F6E\u7684 Git \u4ED3\u5E93\u8BFB\u53D6 Markdown \u6587\u7AE0" : "\u8BF7\u5148\u5728\u8BBE\u7F6E\u4E2D\u914D\u7F6E Git \u4ED3\u5E93",
      cls: "git-articles-subtitle"
    });
    const refreshButton = header.createEl("button", {
      text: "\u5237\u65B0",
      cls: "git-articles-refresh"
    });
    refreshButton.onclick = async () => {
      refreshButton.disabled = true;
      refreshButton.textContent = "\u5237\u65B0\u4E2D\u2026";
      try {
        await this.loadArticles();
      } finally {
        refreshButton.disabled = false;
        refreshButton.textContent = "\u5237\u65B0";
      }
    };
    if (!this.plugin.settings.repoUrl) {
      const empty = this.contentEl.createDiv({ cls: "git-articles-empty" });
      empty.createDiv({ cls: "git-articles-empty-icon", text: "\u2699\uFE0F" });
      empty.createEl("h3", { text: "\u8FD8\u6CA1\u6709\u914D\u7F6E Git \u4ED3\u5E93" });
      empty.createEl("p", {
        text: "\u6253\u5F00 Obsidian \u8BBE\u7F6E \u2192 Git \u6587\u7AE0\u540C\u6B65\uFF0C\u586B\u5199\u4ED3\u5E93\u5730\u5740\u540E\u8FD4\u56DE\u6B64\u6807\u7B7E\u9875\u3002"
      });
      return;
    }
    const loading = this.contentEl.createDiv({ cls: "git-articles-loading" });
    loading.createDiv({ cls: "git-articles-spinner" });
    loading.createSpan({ text: "\u6B63\u5728\u8BFB\u53D6 Git \u4ED3\u5E93\u2026" });
    try {
      await this.loadArticles();
    } catch (error) {
      loading.remove();
      const errorEl = this.contentEl.createDiv({ cls: "git-articles-error" });
      errorEl.createEl("strong", { text: "\u8BFB\u53D6\u4ED3\u5E93\u5931\u8D25" });
      errorEl.createEl("div", {
        text: error instanceof Error ? error.message : String(error)
      });
    }
  }
  /** 对外公开的刷新入口，供 refresh.ts 调用 */
  async refresh() {
    if (!this.plugin.settings.repoUrl) {
      return;
    }
    if (this.isLoading) return;
    this.isLoading = true;
    try {
      await this.loadArticles();
    } catch (error) {
      new import_obsidian5.Notice(
        `\u5237\u65B0\u5931\u8D25\uFF1A${error instanceof Error ? error.message : String(error)}`
      );
    } finally {
      this.isLoading = false;
    }
  }
  async loadArticles() {
    const tempDir = await this.plugin.cloneToTemp();
    try {
      this.articles = await this.plugin.getRemoteArticles(tempDir);
      this.localTitles.clear();
      const localFiles = this.app.vault.getMarkdownFiles();
      for (let i = 0; i < localFiles.length; i++) {
        const file = localFiles[i];
        if (!this.localTitles.has(file.name)) {
          this.localTitles.set(file.name, file);
        }
        if (i % 200 === 0) {
          await new Promise((r2) => setTimeout(r2, 0));
        }
      }
      const oldList = this.contentEl.querySelector(".git-articles-list");
      oldList == null ? void 0 : oldList.remove();
      const loading = this.contentEl.querySelector(".git-articles-loading");
      loading == null ? void 0 : loading.remove();
      const list = this.contentEl.createDiv({ cls: "git-articles-list" });
      if (this.articles.length === 0) {
        const empty = list.createDiv({ cls: "git-articles-empty" });
        empty.createEl("h3", { text: "\u4ED3\u5E93\u4E2D\u6CA1\u6709 Markdown \u6587\u7AE0" });
        empty.createEl("p", { text: "\u5F53\u524D\u53EA\u663E\u793A .md \u6587\u4EF6\u3002" });
        return;
      }
      const summary = list.createDiv({ cls: "git-articles-summary" });
      summary.setText(`\u5171 ${this.articles.length} \u7BC7\u6587\u7AE0`);
      for (const article of this.articles) {
        this.renderArticleCard(list, article);
      }
      await this.renderLocalArticles();
    } finally {
      await this.plugin.removeTempDir(tempDir);
    }
  }
  renderArticleCard(list, article) {
    var _a;
    const remoteFileName = (_a = article.relativePath.split("/").pop()) != null ? _a : "";
    const localFile = this.localTitles.get(remoteFileName);
    const card = list.createDiv({ cls: "git-article-card" });
    const info = card.createDiv({ cls: "git-article-info" });
    info.createEl("div", {
      text: article.title,
      cls: "git-article-title"
    });
    info.createEl("div", {
      text: article.relativePath,
      cls: "git-article-path"
    });
    const action = card.createEl("button", {
      cls: localFile ? "git-article-action is-synced" : "git-article-action",
      text: localFile ? "\u540C\u6B65" : "\u4E0B\u8F7D"
    });
    action.setAttribute(
      "aria-label",
      localFile ? `\u540C\u6B65\u300A${article.title}\u300B` : `\u4E0B\u8F7D\u300A${article.title}\u300B`
    );
    action.onclick = async () => {
      action.disabled = true;
      action.textContent = localFile ? "\u540C\u6B65\u4E2D\u2026" : "\u4E0B\u8F7D\u4E2D\u2026";
      try {
        if (localFile) {
          const result = await confirmSyncConflict(
            this.plugin,
            article,
            localFile
          );
          if (result === "cancel") {
            return;
          }
          if (result === "overwrite") {
            await syncArticle(this.plugin, article, localFile);
            new import_obsidian5.Notice(`\u300A${article.title}\u300B\u5DF2\u8986\u76D6\u5E76\u540C\u6B65`);
            await refreshArticlesView(this.plugin, { silent: true });
          } else if (result === "copy") {
            const copyFile = await syncArticleAsCopy(
              this.plugin,
              article,
              localFile
            );
            new import_obsidian5.Notice(`\u5DF2\u4FDD\u5B58\u4E3A\u526F\u4EF6\uFF1A${copyFile.path}`);
            await refreshArticlesView(this.plugin, { silent: true });
          }
        } else {
          const newFile = await downloadArticle(this.plugin, article);
          this.localTitles.set(newFile.name, newFile);
          action.textContent = "\u540C\u6B65";
          action.classList.add("is-synced");
          new import_obsidian5.Notice(`\u300A${article.title}\u300B\u5DF2\u4E0B\u8F7D`);
          await refreshArticlesView(this.plugin, { silent: true });
        }
      } catch (error) {
        new import_obsidian5.Notice(
          `${localFile ? "\u540C\u6B65" : "\u4E0B\u8F7D"}\u5931\u8D25\uFF1A${error instanceof Error ? error.message : String(error)}`
        );
      } finally {
        action.disabled = false;
        if (localFile) action.textContent = "\u540C\u6B65";
      }
    };
  }
  async renderLocalArticles() {
    var _a, _b, _c, _d;
    (_a = this.contentEl.querySelector(".git-local-articles-section")) == null ? void 0 : _a.remove();
    (_b = this.contentEl.querySelector(".git-articles-loading")) == null ? void 0 : _b.remove();
    (_c = this.contentEl.querySelector(".git-articles-empty")) == null ? void 0 : _c.remove();
    (_d = this.contentEl.querySelector(".git-articles-error")) == null ? void 0 : _d.remove();
    const section = this.contentEl.createDiv({ cls: "git-local-articles-section" });
    const header = section.createDiv({ cls: "git-local-articles-header" });
    const titleBox = header.createDiv();
    titleBox.createEl("h3", { text: "\u672C\u5730\u6587\u7AE0\u4E0A\u4F20" });
    titleBox.createEl("div", {
      text: "\u8BFB\u53D6\u5F53\u524D Vault \u4E2D\u7684 Markdown \u6587\u4EF6\uFF0C\u9009\u62E9 Git \u4ED3\u5E93\u6587\u4EF6\u5939\u540E\u4E0A\u4F20\u3002",
      cls: "git-articles-subtitle"
    });
    const localFiles = this.app.vault.getMarkdownFiles().sort((a, b3) => a.path.localeCompare(b3.path, "zh-CN"));
    if (localFiles.length === 0) {
      section.createDiv({
        text: "\u5F53\u524D Vault \u4E2D\u6CA1\u6709 Markdown \u6587\u7AE0\u3002",
        cls: "git-local-empty"
      });
      return;
    }
    const list = section.createDiv({ cls: "git-local-articles-list" });
    for (const file of localFiles) {
      const card = list.createDiv({ cls: "git-local-article-card" });
      const info = card.createDiv({ cls: "git-article-info" });
      info.createEl("div", {
        text: file.basename,
        cls: "git-article-title"
      });
      info.createEl("div", {
        text: file.path,
        cls: "git-article-path"
      });
      const action = card.createEl("button", {
        text: "\u4E0A\u4F20",
        cls: "git-article-action"
      });
      action.onclick = async () => {
        const modal = new UploadArticleModal(this.app, this.plugin, file);
        modal.open();
      };
    }
  }
  async onClose() {
    this.contentEl.empty();
  }
};
var GitSyncSettingTab = class extends import_obsidian5.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Git \u6587\u7AE0\u540C\u6B65" });
    containerEl.createEl("p", {
      text: "\u5728\u8FD9\u91CC\u914D\u7F6E Git \u4ED3\u5E93\u73AF\u5883\uFF0C\u6587\u7AE0\u5217\u8868\u4F1A\u5728\u201CGit \u6587\u7AE0\u201D\u6807\u7B7E\u9875\u4E2D\u663E\u793A\u3002",
      cls: "setting-item-description"
    });
    new import_obsidian5.Setting(containerEl).setName("Git \u4ED3\u5E93\u5730\u5740").setDesc("\u652F\u6301 HTTPS \u548C SSH\uFF0C\u4F8B\u5982 git@github.com:user/repo.git").addText(
      (text) => text.setPlaceholder("git@github.com:user/repo.git").setValue(this.plugin.settings.repoUrl).onChange(async (value) => {
        this.plugin.settings.repoUrl = value.trim();
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian5.Setting(containerEl).setName("SSH \u79C1\u94A5").setDesc("\u53EF\u9009\u3002\u7559\u7A7A\u65F6\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4 SSH \u914D\u7F6E\u3002\u79C1\u94A5\u53EA\u7528\u4E8E\u5F53\u524D Git \u64CD\u4F5C\u3002").addTextArea((text) => {
      text.setPlaceholder("\u7C98\u8D34 SSH \u79C1\u94A5").setValue(this.plugin.settings.sshKey).onChange(async (value) => {
        this.plugin.settings.sshKey = value;
        await this.plugin.saveSettings();
      });
      text.inputEl.rows = 7;
      text.inputEl.addClass("git-sync-settings-key");
    });
    new import_obsidian5.Setting(containerEl).setName("\u6587\u7AE0\u4FDD\u5B58\u76EE\u5F55").setDesc("\u4E0B\u8F7D\u65B0\u6587\u7AE0\u65F6\u4F7F\u7528\u7684 Vault \u76F8\u5BF9\u8DEF\u5F84\uFF0C\u4F8B\u5982 Git\u6587\u7AE0").addText(
      (text) => text.setPlaceholder("Git\u6587\u7AE0").setValue(this.plugin.settings.targetFolder).onChange(async (value) => {
        this.plugin.settings.targetFolder = value.trim().replace(/^\/+|\/+$/g, "") || "Git\u6587\u7AE0";
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian5.Setting(containerEl).setName("\u6253\u5F00\u6587\u7AE0\u5217\u8868").setDesc("\u6253\u5F00\u4E00\u4E2A\u65B0\u7684 Obsidian \u6807\u7B7E\u9875\uFF0C\u67E5\u770B\u4ED3\u5E93\u4E2D\u7684\u6587\u7AE0\u3002").addButton(
      (button) => button.setButtonText("\u6253\u5F00").onClick(async () => {
        await this.plugin.activateArticlesView();
      })
    );
  }
};
var MySimplePlugin = class extends import_obsidian5.Plugin {
  constructor() {
    super(...arguments);
    this.settingsReady = null;
    /** 供 refresh.ts 使用，避免循环依赖 */
    this.viewTypeArticles = VIEW_TYPE_ARTICLES;
  }
  async onload() {
    this.registerView(
      VIEW_TYPE_ARTICLES,
      (leaf) => new GitArticlesView(leaf, this)
    );
    this.addSettingTab(new GitSyncSettingTab(this.app, this));
    this.addCommand({
      id: "open-git-articles",
      name: "\u6253\u5F00 Git \u6587\u7AE0",
      callback: () => this.activateArticlesView()
    });
    this.addRibbonIcon(
      "book-open",
      "\u6253\u5F00 Git \u6587\u7AE0",
      () => this.activateArticlesView()
    );
    this.ensureSettingsLoaded().then(() => console.log("Git \u6587\u7AE0\u540C\u6B65\u63D2\u4EF6\u5DF2\u52A0\u8F7D")).catch((err) => console.error("\u52A0\u8F7D Git \u6587\u7AE0\u540C\u6B65\u8BBE\u7F6E\u5931\u8D25\uFF1A", err));
  }
  async ensureSettingsLoaded() {
    if (this.settings) return;
    if (!this.settingsReady) {
      this.settingsReady = this.loadSettings();
    }
    await this.settingsReady;
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async activateArticlesView() {
    const { workspace } = this.app;
    let leaf = workspace.getLeavesOfType(VIEW_TYPE_ARTICLES)[0];
    if (!leaf) {
      leaf = workspace.getLeaf("tab");
      await leaf.setViewState({
        type: VIEW_TYPE_ARTICLES,
        active: true
      });
    }
    workspace.revealLeaf(leaf);
  }
  async cloneToTemp() {
    await this.ensureSettingsLoaded();
    if (!this.settings.repoUrl) {
      throw new Error("\u8BF7\u5148\u5728\u8BBE\u7F6E\u4E2D\u586B\u5199 Git \u4ED3\u5E93\u5730\u5740");
    }
    const tempDir = path3.join(
      os3.tmpdir(),
      `obsidian-git-articles-${Date.now()}`
    );
    let tempKeyPath = null;
    try {
      const git = wo();
      if (this.settings.sshKey.trim()) {
        tempKeyPath = path3.join(
          os3.tmpdir(),
          `obsidian-git-key-${Date.now()}`
        );
        await fsp.writeFile(
          tempKeyPath,
          this.settings.sshKey.trim() + "\n",
          { mode: 384 }
        );
        git.env({
          ...process.env,
          GIT_SSH_COMMAND: `ssh -i "${tempKeyPath}" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null`
        });
      }
      await git.clone(this.settings.repoUrl, tempDir, [
        "--depth",
        "1"
      ]);
      return tempDir;
    } catch (error) {
      await this.removeTempDir(tempDir);
      throw error;
    } finally {
      if (tempKeyPath) {
        try {
          await fsp.unlink(tempKeyPath);
        } catch (e) {
        }
      }
    }
  }
  async getRemoteArticles(repoDir) {
    const articles = [];
    const walk = async (currentDir) => {
      const entries = await fsp.readdir(currentDir, {
        withFileTypes: true
      });
      for (const entry of entries) {
        if (entry.name === ".git") continue;
        const absolutePath = path3.join(currentDir, entry.name);
        if (entry.isDirectory()) {
          await walk(absolutePath);
          continue;
        }
        if (!entry.isFile() || path3.extname(entry.name).toLowerCase() !== ".md") {
          continue;
        }
        const relativePath = path3.relative(repoDir, absolutePath).split(path3.sep).join("/");
        const [content, stat2] = await Promise.all([
          fsp.readFile(absolutePath, "utf8"),
          fsp.stat(absolutePath)
        ]);
        articles.push({
          title: path3.basename(entry.name, path3.extname(entry.name)),
          relativePath,
          absolutePath,
          content,
          size: stat2.size
        });
        if (articles.length % 50 === 0) {
          await new Promise((r2) => setTimeout(r2, 0));
        }
      }
    };
    await walk(repoDir);
    return articles.sort(
      (a, b3) => a.title.localeCompare(b3.title, "zh-CN")
    );
  }
  async getRemoteFolders() {
    const tempDir = await this.cloneToTemp();
    try {
      const folders = /* @__PURE__ */ new Set();
      const walk = async (currentDir, relativeBase = "") => {
        const entries = await fsp.readdir(currentDir, {
          withFileTypes: true
        });
        for (const entry of entries) {
          if (entry.name === ".git") continue;
          const absolutePath = path3.join(currentDir, entry.name);
          const relativePath = relativeBase ? path3.join(relativeBase, entry.name) : entry.name;
          if (entry.isDirectory()) {
            folders.add(relativePath.split(path3.sep).join("/"));
            await walk(absolutePath, relativePath);
          }
        }
      };
      await walk(tempDir);
      return Array.from(folders).sort(
        (a, b3) => a.localeCompare(b3, "zh-CN")
      );
    } finally {
      await this.removeTempDir(tempDir);
    }
  }
  async removeTempDir(dir) {
    if (!dir) return;
    try {
      await fsp.rm(dir, { recursive: true, force: true });
    } catch (error) {
      console.warn("\u6E05\u7406 Git \u4E34\u65F6\u76EE\u5F55\u5931\u8D25\uFF1A", error);
    }
  }
  onunload() {
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_ARTICLES);
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL21zL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvY29tbW9uLmpzIiwgIm5vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvYnJvd3Nlci5qcyIsICJub2RlX21vZHVsZXMvZGVidWcvc3JjL25vZGUuanMiLCAibm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvQGt3c2l0ZXMvZmlsZS1leGlzdHMvc3JjL2luZGV4LnRzIiwgIm5vZGVfbW9kdWxlcy9Aa3dzaXRlcy9maWxlLWV4aXN0cy9pbmRleC50cyIsICJub2RlX21vZHVsZXMvQGt3c2l0ZXMvcHJvbWlzZS1kZWZlcnJlZC9zcmMvaW5kZXgudHMiLCAibWFpbi50cyIsICJub2RlX21vZHVsZXMvQHNpbXBsZS1naXQvYXJncy1wYXRoc3BlYy9zcmMvcGF0aHNwZWMudHMiLCAibm9kZV9tb2R1bGVzL0BzaW1wbGUtZ2l0L2FyZ3YtcGFyc2VyL3NyYy9mbGFncy9mbGFncy5oZWxwZXJzLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvY29uZmlnL2NvbmZpZy1vcGVyYW5kcy50cyIsICJub2RlX21vZHVsZXMvQHNpbXBsZS1naXQvYXJndi1wYXJzZXIvc3JjL2NvbmZpZy9kZXRlY3QtY29uZmlnLWFjdGlvbi50cyIsICJub2RlX21vZHVsZXMvQHNpbXBsZS1naXQvYXJndi1wYXJzZXIvc3JjL2NvbmZpZy9hbmFseXNlLWNvbmZpZy50cyIsICJub2RlX21vZHVsZXMvQHNpbXBsZS1naXQvYXJndi1wYXJzZXIvc3JjL3Rva2Vucy9mbGFnLXNwZWNzLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvdG9rZW5zL3Rva2VuLWV4cGFuZGVyLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvZmxhZ3MvcGFyc2UtZ2xvYmFsLWZsYWdzLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvZmxhZ3MvcGFyc2UtdGFzay1mbGFncy50cyIsICJub2RlX21vZHVsZXMvQHNpbXBsZS1naXQvYXJndi1wYXJzZXIvc3JjL3Z1bG5lcmFiaWxpdGllcy9kZXRlY3QtdnVsbmVyYWJsZS1jb25maWctd3JpdGVzLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvdnVsbmVyYWJpbGl0aWVzL2RldGVjdC12dWxuZXJhYmxlLWZsYWdzLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvdnVsbmVyYWJpbGl0aWVzL3Z1bG5lcmFiaWxpdHktYW5hbHlzaXMudHMiLCAibm9kZV9tb2R1bGVzL0BzaW1wbGUtZ2l0L2FyZ3YtcGFyc2VyL3NyYy9hcmdzL3BhcnNlLWFyZ3YudHMiLCAibm9kZV9tb2R1bGVzL0BzaW1wbGUtZ2l0L2FyZ3YtcGFyc2VyL3NyYy9lbnYvcGFyc2UtZW52LnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvdnVsbmVyYWJpbGl0aWVzL3Z1bG5lcmFiaWxpdHktY2hlY2sudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9lcnJvcnMvZ2l0LWVycm9yLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvZXJyb3JzL2dpdC1jb25zdHJ1Y3QtZXJyb3IudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9lcnJvcnMvZ2l0LXBsdWdpbi1lcnJvci50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL2Vycm9ycy9naXQtcmVzcG9uc2UtZXJyb3IudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9lcnJvcnMvdGFzay1jb25maWd1cmF0aW9uLWVycm9yLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdXRpbHMvdXRpbC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3V0aWxzL2FyZ3VtZW50LWZpbHRlcnMudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi91dGlscy9leGl0LWNvZGVzLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdXRpbHMvZ2l0LW91dHB1dC1zdHJlYW1zLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdXRpbHMvbGluZS1wYXJzZXIudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi91dGlscy9zaW1wbGUtZ2l0LW9wdGlvbnMudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi91dGlscy90YXNrLW9wdGlvbnMudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi91dGlscy90YXNrLXBhcnNlci50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2NoZWNrLWlzLXJlcG8udHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wYXJzZXJzL3BhcnNlLWNsZWFuLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvdGFzay50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2NsZWFuLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcmVzcG9uc2VzL0NvbmZpZ0xpc3QudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9jb25maWcudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9kaWZmLW5hbWUtc3RhdHVzLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvZ3JlcC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL3Jlc2V0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvZ2l0LWxvZ2dlci50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3J1bm5lcnMvdGFza3MtcGVuZGluZy1xdWV1ZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3J1bm5lcnMvZ2l0LWV4ZWN1dG9yLWNoYWluLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcnVubmVycy9naXQtZXhlY3V0b3IudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrLWNhbGxiYWNrLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvY2hhbmdlLXdvcmtpbmctZGlyZWN0b3J5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvY2hlY2tvdXQudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9jbG9uZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BhcnNlcnMvcGFyc2UtY29tbWl0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvY29tbWl0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvY291bnQtb2JqZWN0cy50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2ZpcnN0LWNvbW1pdC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2hhc2gtb2JqZWN0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcmVzcG9uc2VzL0luaXRTdW1tYXJ5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvaW5pdC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2ludGVycHJldC10cmFpbGVycy50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL2FyZ3MvbG9nLWZvcm1hdC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9EaWZmU3VtbWFyeS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BhcnNlcnMvcGFyc2UtZGlmZi1zdW1tYXJ5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGFyc2Vycy9wYXJzZS1saXN0LWxvZy1zdW1tYXJ5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvZGlmZi50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2xvZy50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9NZXJnZVN1bW1hcnkudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9yZXNwb25zZXMvUHVsbFN1bW1hcnkudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wYXJzZXJzL3BhcnNlLXJlbW90ZS1vYmplY3RzLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGFyc2Vycy9wYXJzZS1yZW1vdGUtbWVzc2FnZXMudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wYXJzZXJzL3BhcnNlLXB1bGwudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wYXJzZXJzL3BhcnNlLW1lcmdlLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvbWVyZ2UudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wYXJzZXJzL3BhcnNlLXB1c2gudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9wdXNoLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3Mvc2hvdy50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9GaWxlU3RhdHVzU3VtbWFyeS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9TdGF0dXNTdW1tYXJ5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3Mvc3RhdHVzLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvdmVyc2lvbi50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3NpbXBsZS1naXQtYXBpLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcnVubmVycy9zY2hlZHVsZXIudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9hcHBseS1wYXRjaC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9CcmFuY2hTdW1tYXJ5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGFyc2Vycy9wYXJzZS1icmFuY2gudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9yZXNwb25zZXMvQnJhbmNoRGVsZXRlU3VtbWFyeS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BhcnNlcnMvcGFyc2UtYnJhbmNoLWRlbGV0ZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2JyYW5jaC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2NoZWNrLWlnbm9yZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BhcnNlcnMvcGFyc2UtZmV0Y2gudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9mZXRjaC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BhcnNlcnMvcGFyc2UtbW92ZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL21vdmUudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9wdWxsLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcmVzcG9uc2VzL0dldFJlbW90ZVN1bW1hcnkudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9yZW1vdGUudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9zdGFzaC1saXN0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3Mvc3ViLW1vZHVsZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9UYWdMaXN0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvdGFnLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9naXQubWpzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9hYm9ydC1wbHVnaW4udHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wbHVnaW5zL2FsbG93LWVudmlyb25tZW50LnBsdWdpbi50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BsdWdpbnMvYmxvY2stdW5zYWZlLW9wZXJhdGlvbnMtcGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9jb21tYW5kLWNvbmZpZy1wcmVmaXhpbmctcGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9jb21wbGV0aW9uLWRldGVjdGlvbi5wbHVnaW4udHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wbHVnaW5zL2N1c3RvbS1iaW5hcnkucGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvZXJyb3JzL2dpdC1jb25maWd1cmF0aW9uLWVycm9yLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9lcnJvci1kZXRlY3Rpb24ucGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9pbnB1dC5wbHVnaW4udHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wbHVnaW5zL3BsdWdpbi1zdG9yZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BsdWdpbnMvcHJvZ3Jlc3MtbW9uaXRvci1wbHVnaW4udHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wbHVnaW5zL3NwYXduLW9wdGlvbnMtcGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9zdWZmaXgtcGF0aHMucGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy90aW1lb3V0LXBsdWdpbi50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL2dpdC1mYWN0b3J5LnRzIiwgInNyYy9zeW5jLnRzIiwgInNyYy9kb3dubG9hZC50cyIsICJzcmMvdXBsb2FkLnRzIiwgInNyYy9yZWZyZXNoLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIEhlbHBlcnMuXG4gKi9cblxudmFyIHMgPSAxMDAwO1xudmFyIG0gPSBzICogNjA7XG52YXIgaCA9IG0gKiA2MDtcbnZhciBkID0gaCAqIDI0O1xudmFyIHcgPSBkICogNztcbnZhciB5ID0gZCAqIDM2NS4yNTtcblxuLyoqXG4gKiBQYXJzZSBvciBmb3JtYXQgdGhlIGdpdmVuIGB2YWxgLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogIC0gYGxvbmdgIHZlcmJvc2UgZm9ybWF0dGluZyBbZmFsc2VdXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEB0aHJvd3Mge0Vycm9yfSB0aHJvdyBhbiBlcnJvciBpZiB2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIG51bWJlclxuICogQHJldHVybiB7U3RyaW5nfE51bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWw7XG4gIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBwYXJzZSh2YWwpO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmIGlzRmluaXRlKHZhbCkpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb25nID8gZm10TG9uZyh2YWwpIDogZm10U2hvcnQodmFsKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ3ZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgdmFsaWQgbnVtYmVyLiB2YWw9JyArXG4gICAgICBKU09OLnN0cmluZ2lmeSh2YWwpXG4gICk7XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBgc3RyYCBhbmQgcmV0dXJuIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZShzdHIpIHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChzdHIubGVuZ3RoID4gMTAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBtYXRjaCA9IC9eKC0/KD86XFxkKyk/XFwuP1xcZCspICoobWlsbGlzZWNvbmRzP3xtc2Vjcz98bXN8c2Vjb25kcz98c2Vjcz98c3xtaW51dGVzP3xtaW5zP3xtfGhvdXJzP3xocnM/fGh8ZGF5cz98ZHx3ZWVrcz98d3x5ZWFycz98eXJzP3x5KT8kL2kuZXhlYyhcbiAgICBzdHJcbiAgKTtcbiAgaWYgKCFtYXRjaCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbiA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuICB2YXIgdHlwZSA9IChtYXRjaFsyXSB8fCAnbXMnKS50b0xvd2VyQ2FzZSgpO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgY2FzZSAneWVhcic6XG4gICAgY2FzZSAneXJzJzpcbiAgICBjYXNlICd5cic6XG4gICAgY2FzZSAneSc6XG4gICAgICByZXR1cm4gbiAqIHk7XG4gICAgY2FzZSAnd2Vla3MnOlxuICAgIGNhc2UgJ3dlZWsnOlxuICAgIGNhc2UgJ3cnOlxuICAgICAgcmV0dXJuIG4gKiB3O1xuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZCc6XG4gICAgICByZXR1cm4gbiAqIGQ7XG4gICAgY2FzZSAnaG91cnMnOlxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hycyc6XG4gICAgY2FzZSAnaHInOlxuICAgIGNhc2UgJ2gnOlxuICAgICAgcmV0dXJuIG4gKiBoO1xuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgY2FzZSAnbWlucyc6XG4gICAgY2FzZSAnbWluJzpcbiAgICBjYXNlICdtJzpcbiAgICAgIHJldHVybiBuICogbTtcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICBjYXNlICdzZWNvbmQnOlxuICAgIGNhc2UgJ3NlY3MnOlxuICAgIGNhc2UgJ3NlYyc6XG4gICAgY2FzZSAncyc6XG4gICAgICByZXR1cm4gbiAqIHM7XG4gICAgY2FzZSAnbWlsbGlzZWNvbmRzJzpcbiAgICBjYXNlICdtaWxsaXNlY29uZCc6XG4gICAgY2FzZSAnbXNlY3MnOlxuICAgIGNhc2UgJ21zZWMnOlxuICAgIGNhc2UgJ21zJzpcbiAgICAgIHJldHVybiBuO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbi8qKlxuICogU2hvcnQgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10U2hvcnQobXMpIHtcbiAgdmFyIG1zQWJzID0gTWF0aC5hYnMobXMpO1xuICBpZiAobXNBYnMgPj0gZCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gZCkgKyAnZCc7XG4gIH1cbiAgaWYgKG1zQWJzID49IGgpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGgpICsgJ2gnO1xuICB9XG4gIGlmIChtc0FicyA+PSBtKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBtKSArICdtJztcbiAgfVxuICBpZiAobXNBYnMgPj0gcykge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gcykgKyAncyc7XG4gIH1cbiAgcmV0dXJuIG1zICsgJ21zJztcbn1cblxuLyoqXG4gKiBMb25nIGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdExvbmcobXMpIHtcbiAgdmFyIG1zQWJzID0gTWF0aC5hYnMobXMpO1xuICBpZiAobXNBYnMgPj0gZCkge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBkLCAnZGF5Jyk7XG4gIH1cbiAgaWYgKG1zQWJzID49IGgpIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgaCwgJ2hvdXInKTtcbiAgfVxuICBpZiAobXNBYnMgPj0gbSkge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBtLCAnbWludXRlJyk7XG4gIH1cbiAgaWYgKG1zQWJzID49IHMpIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgcywgJ3NlY29uZCcpO1xuICB9XG4gIHJldHVybiBtcyArICcgbXMnO1xufVxuXG4vKipcbiAqIFBsdXJhbGl6YXRpb24gaGVscGVyLlxuICovXG5cbmZ1bmN0aW9uIHBsdXJhbChtcywgbXNBYnMsIG4sIG5hbWUpIHtcbiAgdmFyIGlzUGx1cmFsID0gbXNBYnMgPj0gbiAqIDEuNTtcbiAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBuKSArICcgJyArIG5hbWUgKyAoaXNQbHVyYWwgPyAncycgOiAnJyk7XG59XG4iLCAiXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNvbW1vbiBsb2dpYyBmb3IgYm90aCB0aGUgTm9kZS5qcyBhbmQgd2ViIGJyb3dzZXJcbiAqIGltcGxlbWVudGF0aW9ucyBvZiBgZGVidWcoKWAuXG4gKi9cblxuZnVuY3Rpb24gc2V0dXAoZW52KSB7XG5cdGNyZWF0ZURlYnVnLmRlYnVnID0gY3JlYXRlRGVidWc7XG5cdGNyZWF0ZURlYnVnLmRlZmF1bHQgPSBjcmVhdGVEZWJ1Zztcblx0Y3JlYXRlRGVidWcuY29lcmNlID0gY29lcmNlO1xuXHRjcmVhdGVEZWJ1Zy5kaXNhYmxlID0gZGlzYWJsZTtcblx0Y3JlYXRlRGVidWcuZW5hYmxlID0gZW5hYmxlO1xuXHRjcmVhdGVEZWJ1Zy5lbmFibGVkID0gZW5hYmxlZDtcblx0Y3JlYXRlRGVidWcuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXHRjcmVhdGVEZWJ1Zy5kZXN0cm95ID0gZGVzdHJveTtcblxuXHRPYmplY3Qua2V5cyhlbnYpLmZvckVhY2goa2V5ID0+IHtcblx0XHRjcmVhdGVEZWJ1Z1trZXldID0gZW52W2tleV07XG5cdH0pO1xuXG5cdC8qKlxuXHQqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuXHQqL1xuXG5cdGNyZWF0ZURlYnVnLm5hbWVzID0gW107XG5cdGNyZWF0ZURlYnVnLnNraXBzID0gW107XG5cblx0LyoqXG5cdCogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuXHQqXG5cdCogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXIgb3IgdXBwZXItY2FzZSBsZXR0ZXIsIGkuZS4gXCJuXCIgYW5kIFwiTlwiLlxuXHQqL1xuXHRjcmVhdGVEZWJ1Zy5mb3JtYXR0ZXJzID0ge307XG5cblx0LyoqXG5cdCogU2VsZWN0cyBhIGNvbG9yIGZvciBhIGRlYnVnIG5hbWVzcGFjZVxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2UgVGhlIG5hbWVzcGFjZSBzdHJpbmcgZm9yIHRoZSBkZWJ1ZyBpbnN0YW5jZSB0byBiZSBjb2xvcmVkXG5cdCogQHJldHVybiB7TnVtYmVyfFN0cmluZ30gQW4gQU5TSSBjb2xvciBjb2RlIGZvciB0aGUgZ2l2ZW4gbmFtZXNwYWNlXG5cdCogQGFwaSBwcml2YXRlXG5cdCovXG5cdGZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuXHRcdGxldCBoYXNoID0gMDtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXNwYWNlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcblx0XHRcdGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNyZWF0ZURlYnVnLmNvbG9yc1tNYXRoLmFicyhoYXNoKSAlIGNyZWF0ZURlYnVnLmNvbG9ycy5sZW5ndGhdO1xuXHR9XG5cdGNyZWF0ZURlYnVnLnNlbGVjdENvbG9yID0gc2VsZWN0Q29sb3I7XG5cblx0LyoqXG5cdCogQ3JlYXRlIGEgZGVidWdnZXIgd2l0aCB0aGUgZ2l2ZW4gYG5hbWVzcGFjZWAuXG5cdCpcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG5cdCogQHJldHVybiB7RnVuY3Rpb259XG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cdFx0bGV0IHByZXZUaW1lO1xuXHRcdGxldCBlbmFibGVPdmVycmlkZSA9IG51bGw7XG5cdFx0bGV0IG5hbWVzcGFjZXNDYWNoZTtcblx0XHRsZXQgZW5hYmxlZENhY2hlO1xuXG5cdFx0ZnVuY3Rpb24gZGVidWcoLi4uYXJncykge1xuXHRcdFx0Ly8gRGlzYWJsZWQ/XG5cdFx0XHRpZiAoIWRlYnVnLmVuYWJsZWQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBzZWxmID0gZGVidWc7XG5cblx0XHRcdC8vIFNldCBgZGlmZmAgdGltZXN0YW1wXG5cdFx0XHRjb25zdCBjdXJyID0gTnVtYmVyKG5ldyBEYXRlKCkpO1xuXHRcdFx0Y29uc3QgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuXHRcdFx0c2VsZi5kaWZmID0gbXM7XG5cdFx0XHRzZWxmLnByZXYgPSBwcmV2VGltZTtcblx0XHRcdHNlbGYuY3VyciA9IGN1cnI7XG5cdFx0XHRwcmV2VGltZSA9IGN1cnI7XG5cblx0XHRcdGFyZ3NbMF0gPSBjcmVhdGVEZWJ1Zy5jb2VyY2UoYXJnc1swXSk7XG5cblx0XHRcdGlmICh0eXBlb2YgYXJnc1swXSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdFx0Ly8gQW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJU9cblx0XHRcdFx0YXJncy51bnNoaWZ0KCclTycpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBcHBseSBhbnkgYGZvcm1hdHRlcnNgIHRyYW5zZm9ybWF0aW9uc1xuXHRcdFx0bGV0IGluZGV4ID0gMDtcblx0XHRcdGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCAobWF0Y2gsIGZvcm1hdCkgPT4ge1xuXHRcdFx0XHQvLyBJZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG5cdFx0XHRcdGlmIChtYXRjaCA9PT0gJyUlJykge1xuXHRcdFx0XHRcdHJldHVybiAnJSc7XG5cdFx0XHRcdH1cblx0XHRcdFx0aW5kZXgrKztcblx0XHRcdFx0Y29uc3QgZm9ybWF0dGVyID0gY3JlYXRlRGVidWcuZm9ybWF0dGVyc1tmb3JtYXRdO1xuXHRcdFx0XHRpZiAodHlwZW9mIGZvcm1hdHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdGNvbnN0IHZhbCA9IGFyZ3NbaW5kZXhdO1xuXHRcdFx0XHRcdG1hdGNoID0gZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsKTtcblxuXHRcdFx0XHRcdC8vIE5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcblx0XHRcdFx0XHRhcmdzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRcdFx0aW5kZXgtLTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gbWF0Y2g7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gQXBwbHkgZW52LXNwZWNpZmljIGZvcm1hdHRpbmcgKGNvbG9ycywgZXRjLilcblx0XHRcdGNyZWF0ZURlYnVnLmZvcm1hdEFyZ3MuY2FsbChzZWxmLCBhcmdzKTtcblxuXHRcdFx0Y29uc3QgbG9nRm4gPSBzZWxmLmxvZyB8fCBjcmVhdGVEZWJ1Zy5sb2c7XG5cdFx0XHRsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcblx0XHR9XG5cblx0XHRkZWJ1Zy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG5cdFx0ZGVidWcudXNlQ29sb3JzID0gY3JlYXRlRGVidWcudXNlQ29sb3JzKCk7XG5cdFx0ZGVidWcuY29sb3IgPSBjcmVhdGVEZWJ1Zy5zZWxlY3RDb2xvcihuYW1lc3BhY2UpO1xuXHRcdGRlYnVnLmV4dGVuZCA9IGV4dGVuZDtcblx0XHRkZWJ1Zy5kZXN0cm95ID0gY3JlYXRlRGVidWcuZGVzdHJveTsgLy8gWFhYIFRlbXBvcmFyeS4gV2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UuXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVidWcsICdlbmFibGVkJywge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHRnZXQ6ICgpID0+IHtcblx0XHRcdFx0aWYgKGVuYWJsZU92ZXJyaWRlICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVuYWJsZU92ZXJyaWRlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChuYW1lc3BhY2VzQ2FjaGUgIT09IGNyZWF0ZURlYnVnLm5hbWVzcGFjZXMpIHtcblx0XHRcdFx0XHRuYW1lc3BhY2VzQ2FjaGUgPSBjcmVhdGVEZWJ1Zy5uYW1lc3BhY2VzO1xuXHRcdFx0XHRcdGVuYWJsZWRDYWNoZSA9IGNyZWF0ZURlYnVnLmVuYWJsZWQobmFtZXNwYWNlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBlbmFibGVkQ2FjaGU7XG5cdFx0XHR9LFxuXHRcdFx0c2V0OiB2ID0+IHtcblx0XHRcdFx0ZW5hYmxlT3ZlcnJpZGUgPSB2O1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gRW52LXNwZWNpZmljIGluaXRpYWxpemF0aW9uIGxvZ2ljIGZvciBkZWJ1ZyBpbnN0YW5jZXNcblx0XHRpZiAodHlwZW9mIGNyZWF0ZURlYnVnLmluaXQgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdGNyZWF0ZURlYnVnLmluaXQoZGVidWcpO1xuXHRcdH1cblxuXHRcdHJldHVybiBkZWJ1Zztcblx0fVxuXG5cdGZ1bmN0aW9uIGV4dGVuZChuYW1lc3BhY2UsIGRlbGltaXRlcikge1xuXHRcdGNvbnN0IG5ld0RlYnVnID0gY3JlYXRlRGVidWcodGhpcy5uYW1lc3BhY2UgKyAodHlwZW9mIGRlbGltaXRlciA9PT0gJ3VuZGVmaW5lZCcgPyAnOicgOiBkZWxpbWl0ZXIpICsgbmFtZXNwYWNlKTtcblx0XHRuZXdEZWJ1Zy5sb2cgPSB0aGlzLmxvZztcblx0XHRyZXR1cm4gbmV3RGVidWc7XG5cdH1cblxuXHQvKipcblx0KiBFbmFibGVzIGEgZGVidWcgbW9kZSBieSBuYW1lc3BhY2VzLiBUaGlzIGNhbiBpbmNsdWRlIG1vZGVzXG5cdCogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cblx0KlxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcblx0XHRjcmVhdGVEZWJ1Zy5zYXZlKG5hbWVzcGFjZXMpO1xuXHRcdGNyZWF0ZURlYnVnLm5hbWVzcGFjZXMgPSBuYW1lc3BhY2VzO1xuXG5cdFx0Y3JlYXRlRGVidWcubmFtZXMgPSBbXTtcblx0XHRjcmVhdGVEZWJ1Zy5za2lwcyA9IFtdO1xuXG5cdFx0Y29uc3Qgc3BsaXQgPSAodHlwZW9mIG5hbWVzcGFjZXMgPT09ICdzdHJpbmcnID8gbmFtZXNwYWNlcyA6ICcnKVxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL1xccysvZywgJywnKVxuXHRcdFx0LnNwbGl0KCcsJylcblx0XHRcdC5maWx0ZXIoQm9vbGVhbik7XG5cblx0XHRmb3IgKGNvbnN0IG5zIG9mIHNwbGl0KSB7XG5cdFx0XHRpZiAobnNbMF0gPT09ICctJykge1xuXHRcdFx0XHRjcmVhdGVEZWJ1Zy5za2lwcy5wdXNoKG5zLnNsaWNlKDEpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNyZWF0ZURlYnVnLm5hbWVzLnB1c2gobnMpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVja3MgaWYgdGhlIGdpdmVuIHN0cmluZyBtYXRjaGVzIGEgbmFtZXNwYWNlIHRlbXBsYXRlLCBob25vcmluZ1xuXHQgKiBhc3Rlcmlza3MgYXMgd2lsZGNhcmRzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc2VhcmNoXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0ZW1wbGF0ZVxuXHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHQgKi9cblx0ZnVuY3Rpb24gbWF0Y2hlc1RlbXBsYXRlKHNlYXJjaCwgdGVtcGxhdGUpIHtcblx0XHRsZXQgc2VhcmNoSW5kZXggPSAwO1xuXHRcdGxldCB0ZW1wbGF0ZUluZGV4ID0gMDtcblx0XHRsZXQgc3RhckluZGV4ID0gLTE7XG5cdFx0bGV0IG1hdGNoSW5kZXggPSAwO1xuXG5cdFx0d2hpbGUgKHNlYXJjaEluZGV4IDwgc2VhcmNoLmxlbmd0aCkge1xuXHRcdFx0aWYgKHRlbXBsYXRlSW5kZXggPCB0ZW1wbGF0ZS5sZW5ndGggJiYgKHRlbXBsYXRlW3RlbXBsYXRlSW5kZXhdID09PSBzZWFyY2hbc2VhcmNoSW5kZXhdIHx8IHRlbXBsYXRlW3RlbXBsYXRlSW5kZXhdID09PSAnKicpKSB7XG5cdFx0XHRcdC8vIE1hdGNoIGNoYXJhY3RlciBvciBwcm9jZWVkIHdpdGggd2lsZGNhcmRcblx0XHRcdFx0aWYgKHRlbXBsYXRlW3RlbXBsYXRlSW5kZXhdID09PSAnKicpIHtcblx0XHRcdFx0XHRzdGFySW5kZXggPSB0ZW1wbGF0ZUluZGV4O1xuXHRcdFx0XHRcdG1hdGNoSW5kZXggPSBzZWFyY2hJbmRleDtcblx0XHRcdFx0XHR0ZW1wbGF0ZUluZGV4Kys7IC8vIFNraXAgdGhlICcqJ1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNlYXJjaEluZGV4Kys7XG5cdFx0XHRcdFx0dGVtcGxhdGVJbmRleCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHN0YXJJbmRleCAhPT0gLTEpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZWdhdGVkLWNvbmRpdGlvblxuXHRcdFx0XHQvLyBCYWNrdHJhY2sgdG8gdGhlIGxhc3QgJyonIGFuZCB0cnkgdG8gbWF0Y2ggbW9yZSBjaGFyYWN0ZXJzXG5cdFx0XHRcdHRlbXBsYXRlSW5kZXggPSBzdGFySW5kZXggKyAxO1xuXHRcdFx0XHRtYXRjaEluZGV4Kys7XG5cdFx0XHRcdHNlYXJjaEluZGV4ID0gbWF0Y2hJbmRleDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTsgLy8gTm8gbWF0Y2hcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBIYW5kbGUgdHJhaWxpbmcgJyonIGluIHRlbXBsYXRlXG5cdFx0d2hpbGUgKHRlbXBsYXRlSW5kZXggPCB0ZW1wbGF0ZS5sZW5ndGggJiYgdGVtcGxhdGVbdGVtcGxhdGVJbmRleF0gPT09ICcqJykge1xuXHRcdFx0dGVtcGxhdGVJbmRleCsrO1xuXHRcdH1cblxuXHRcdHJldHVybiB0ZW1wbGF0ZUluZGV4ID09PSB0ZW1wbGF0ZS5sZW5ndGg7XG5cdH1cblxuXHQvKipcblx0KiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cblx0KlxuXHQqIEByZXR1cm4ge1N0cmluZ30gbmFtZXNwYWNlc1xuXHQqIEBhcGkgcHVibGljXG5cdCovXG5cdGZ1bmN0aW9uIGRpc2FibGUoKSB7XG5cdFx0Y29uc3QgbmFtZXNwYWNlcyA9IFtcblx0XHRcdC4uLmNyZWF0ZURlYnVnLm5hbWVzLFxuXHRcdFx0Li4uY3JlYXRlRGVidWcuc2tpcHMubWFwKG5hbWVzcGFjZSA9PiAnLScgKyBuYW1lc3BhY2UpXG5cdFx0XS5qb2luKCcsJyk7XG5cdFx0Y3JlYXRlRGVidWcuZW5hYmxlKCcnKTtcblx0XHRyZXR1cm4gbmFtZXNwYWNlcztcblx0fVxuXG5cdC8qKlxuXHQqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbW9kZSBuYW1lIGlzIGVuYWJsZWQsIGZhbHNlIG90aGVyd2lzZS5cblx0KlxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG5cdCogQHJldHVybiB7Qm9vbGVhbn1cblx0KiBAYXBpIHB1YmxpY1xuXHQqL1xuXHRmdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcblx0XHRmb3IgKGNvbnN0IHNraXAgb2YgY3JlYXRlRGVidWcuc2tpcHMpIHtcblx0XHRcdGlmIChtYXRjaGVzVGVtcGxhdGUobmFtZSwgc2tpcCkpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAoY29uc3QgbnMgb2YgY3JlYXRlRGVidWcubmFtZXMpIHtcblx0XHRcdGlmIChtYXRjaGVzVGVtcGxhdGUobmFtZSwgbnMpKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQqIENvZXJjZSBgdmFsYC5cblx0KlxuXHQqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuXHQqIEByZXR1cm4ge01peGVkfVxuXHQqIEBhcGkgcHJpdmF0ZVxuXHQqL1xuXHRmdW5jdGlvbiBjb2VyY2UodmFsKSB7XG5cdFx0aWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0XHRyZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsO1xuXHR9XG5cblx0LyoqXG5cdCogWFhYIERPIE5PVCBVU0UuIFRoaXMgaXMgYSB0ZW1wb3Jhcnkgc3R1YiBmdW5jdGlvbi5cblx0KiBYWFggSXQgV0lMTCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UuXG5cdCovXG5cdGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG5cdFx0Y29uc29sZS53YXJuKCdJbnN0YW5jZSBtZXRob2QgYGRlYnVnLmRlc3Ryb3koKWAgaXMgZGVwcmVjYXRlZCBhbmQgbm8gbG9uZ2VyIGRvZXMgYW55dGhpbmcuIEl0IHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uIG9mIGBkZWJ1Z2AuJyk7XG5cdH1cblxuXHRjcmVhdGVEZWJ1Zy5lbmFibGUoY3JlYXRlRGVidWcubG9hZCgpKTtcblxuXHRyZXR1cm4gY3JlYXRlRGVidWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0dXA7XG4iLCAiLyogZXNsaW50LWVudiBicm93c2VyICovXG5cbi8qKlxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuZXhwb3J0cy5zdG9yYWdlID0gbG9jYWxzdG9yYWdlKCk7XG5leHBvcnRzLmRlc3Ryb3kgPSAoKCkgPT4ge1xuXHRsZXQgd2FybmVkID0gZmFsc2U7XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRpZiAoIXdhcm5lZCkge1xuXHRcdFx0d2FybmVkID0gdHJ1ZTtcblx0XHRcdGNvbnNvbGUud2FybignSW5zdGFuY2UgbWV0aG9kIGBkZWJ1Zy5kZXN0cm95KClgIGlzIGRlcHJlY2F0ZWQgYW5kIG5vIGxvbmdlciBkb2VzIGFueXRoaW5nLiBJdCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbiBvZiBgZGVidWdgLicpO1xuXHRcdH1cblx0fTtcbn0pKCk7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gW1xuXHQnIzAwMDBDQycsXG5cdCcjMDAwMEZGJyxcblx0JyMwMDMzQ0MnLFxuXHQnIzAwMzNGRicsXG5cdCcjMDA2NkNDJyxcblx0JyMwMDY2RkYnLFxuXHQnIzAwOTlDQycsXG5cdCcjMDA5OUZGJyxcblx0JyMwMENDMDAnLFxuXHQnIzAwQ0MzMycsXG5cdCcjMDBDQzY2Jyxcblx0JyMwMENDOTknLFxuXHQnIzAwQ0NDQycsXG5cdCcjMDBDQ0ZGJyxcblx0JyMzMzAwQ0MnLFxuXHQnIzMzMDBGRicsXG5cdCcjMzMzM0NDJyxcblx0JyMzMzMzRkYnLFxuXHQnIzMzNjZDQycsXG5cdCcjMzM2NkZGJyxcblx0JyMzMzk5Q0MnLFxuXHQnIzMzOTlGRicsXG5cdCcjMzNDQzAwJyxcblx0JyMzM0NDMzMnLFxuXHQnIzMzQ0M2NicsXG5cdCcjMzNDQzk5Jyxcblx0JyMzM0NDQ0MnLFxuXHQnIzMzQ0NGRicsXG5cdCcjNjYwMENDJyxcblx0JyM2NjAwRkYnLFxuXHQnIzY2MzNDQycsXG5cdCcjNjYzM0ZGJyxcblx0JyM2NkNDMDAnLFxuXHQnIzY2Q0MzMycsXG5cdCcjOTkwMENDJyxcblx0JyM5OTAwRkYnLFxuXHQnIzk5MzNDQycsXG5cdCcjOTkzM0ZGJyxcblx0JyM5OUNDMDAnLFxuXHQnIzk5Q0MzMycsXG5cdCcjQ0MwMDAwJyxcblx0JyNDQzAwMzMnLFxuXHQnI0NDMDA2NicsXG5cdCcjQ0MwMDk5Jyxcblx0JyNDQzAwQ0MnLFxuXHQnI0NDMDBGRicsXG5cdCcjQ0MzMzAwJyxcblx0JyNDQzMzMzMnLFxuXHQnI0NDMzM2NicsXG5cdCcjQ0MzMzk5Jyxcblx0JyNDQzMzQ0MnLFxuXHQnI0NDMzNGRicsXG5cdCcjQ0M2NjAwJyxcblx0JyNDQzY2MzMnLFxuXHQnI0NDOTkwMCcsXG5cdCcjQ0M5OTMzJyxcblx0JyNDQ0NDMDAnLFxuXHQnI0NDQ0MzMycsXG5cdCcjRkYwMDAwJyxcblx0JyNGRjAwMzMnLFxuXHQnI0ZGMDA2NicsXG5cdCcjRkYwMDk5Jyxcblx0JyNGRjAwQ0MnLFxuXHQnI0ZGMDBGRicsXG5cdCcjRkYzMzAwJyxcblx0JyNGRjMzMzMnLFxuXHQnI0ZGMzM2NicsXG5cdCcjRkYzMzk5Jyxcblx0JyNGRjMzQ0MnLFxuXHQnI0ZGMzNGRicsXG5cdCcjRkY2NjAwJyxcblx0JyNGRjY2MzMnLFxuXHQnI0ZGOTkwMCcsXG5cdCcjRkY5OTMzJyxcblx0JyNGRkNDMDAnLFxuXHQnI0ZGQ0MzMydcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbmZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcblx0Ly8gTkI6IEluIGFuIEVsZWN0cm9uIHByZWxvYWQgc2NyaXB0LCBkb2N1bWVudCB3aWxsIGJlIGRlZmluZWQgYnV0IG5vdCBmdWxseVxuXHQvLyBpbml0aWFsaXplZC4gU2luY2Ugd2Uga25vdyB3ZSdyZSBpbiBDaHJvbWUsIHdlJ2xsIGp1c3QgZGV0ZWN0IHRoaXMgY2FzZVxuXHQvLyBleHBsaWNpdGx5XG5cdGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucHJvY2VzcyAmJiAod2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJyB8fCB3aW5kb3cucHJvY2Vzcy5fX253anMpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvLyBJbnRlcm5ldCBFeHBsb3JlciBhbmQgRWRnZSBkbyBub3Qgc3VwcG9ydCBjb2xvcnMuXG5cdGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvKGVkZ2V8dHJpZGVudClcXC8oXFxkKykvKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGxldCBtO1xuXG5cdC8vIElzIHdlYmtpdD8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY0NTk2MDYvMzc2NzczXG5cdC8vIGRvY3VtZW50IGlzIHVuZGVmaW5lZCBpbiByZWFjdC1uYXRpdmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvcHVsbC8xNjMyXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXR1cm4tYXNzaWduXG5cdHJldHVybiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5XZWJraXRBcHBlYXJhbmNlKSB8fFxuXHRcdC8vIElzIGZpcmVidWc/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM5ODEyMC8zNzY3NzNcblx0XHQodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNvbnNvbGUgJiYgKHdpbmRvdy5jb25zb2xlLmZpcmVidWcgfHwgKHdpbmRvdy5jb25zb2xlLmV4Y2VwdGlvbiAmJiB3aW5kb3cuY29uc29sZS50YWJsZSkpKSB8fFxuXHRcdC8vIElzIGZpcmVmb3ggPj0gdjMxP1xuXHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuXHRcdCh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIChtID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykpICYmIHBhcnNlSW50KG1bMV0sIDEwKSA+PSAzMSkgfHxcblx0XHQvLyBEb3VibGUgY2hlY2sgd2Via2l0IGluIHVzZXJBZ2VudCBqdXN0IGluIGNhc2Ugd2UgYXJlIGluIGEgd29ya2VyXG5cdFx0KHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9hcHBsZXdlYmtpdFxcLyhcXGQrKS8pKTtcbn1cblxuLyoqXG4gKiBDb2xvcml6ZSBsb2cgYXJndW1lbnRzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcblx0YXJnc1swXSA9ICh0aGlzLnVzZUNvbG9ycyA/ICclYycgOiAnJykgK1xuXHRcdHRoaXMubmFtZXNwYWNlICtcblx0XHQodGhpcy51c2VDb2xvcnMgPyAnICVjJyA6ICcgJykgK1xuXHRcdGFyZ3NbMF0gK1xuXHRcdCh0aGlzLnVzZUNvbG9ycyA/ICclYyAnIDogJyAnKSArXG5cdFx0JysnICsgbW9kdWxlLmV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtcblxuXHRpZiAoIXRoaXMudXNlQ29sb3JzKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG5cdGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpO1xuXG5cdC8vIFRoZSBmaW5hbCBcIiVjXCIgaXMgc29tZXdoYXQgdHJpY2t5LCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyXG5cdC8vIGFyZ3VtZW50cyBwYXNzZWQgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgJWMsIHNvIHdlIG5lZWQgdG9cblx0Ly8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBpbmRleCB0byBpbnNlcnQgdGhlIENTUyBpbnRvXG5cdGxldCBpbmRleCA9IDA7XG5cdGxldCBsYXN0QyA9IDA7XG5cdGFyZ3NbMF0ucmVwbGFjZSgvJVthLXpBLVolXS9nLCBtYXRjaCA9PiB7XG5cdFx0aWYgKG1hdGNoID09PSAnJSUnKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGluZGV4Kys7XG5cdFx0aWYgKG1hdGNoID09PSAnJWMnKSB7XG5cdFx0XHQvLyBXZSBvbmx5IGFyZSBpbnRlcmVzdGVkIGluIHRoZSAqbGFzdCogJWNcblx0XHRcdC8vICh0aGUgdXNlciBtYXkgaGF2ZSBwcm92aWRlZCB0aGVpciBvd24pXG5cdFx0XHRsYXN0QyA9IGluZGV4O1xuXHRcdH1cblx0fSk7XG5cblx0YXJncy5zcGxpY2UobGFzdEMsIDAsIGMpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYGNvbnNvbGUuZGVidWcoKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmRlYnVnYCBpcyBub3QgYSBcImZ1bmN0aW9uXCIuXG4gKiBJZiBgY29uc29sZS5kZWJ1Z2AgaXMgbm90IGF2YWlsYWJsZSwgZmFsbHMgYmFja1xuICogdG8gYGNvbnNvbGUubG9nYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnRzLmxvZyA9IGNvbnNvbGUuZGVidWcgfHwgY29uc29sZS5sb2cgfHwgKCgpID0+IHt9KTtcblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNhdmUobmFtZXNwYWNlcykge1xuXHR0cnkge1xuXHRcdGlmIChuYW1lc3BhY2VzKSB7XG5cdFx0XHRleHBvcnRzLnN0b3JhZ2Uuc2V0SXRlbSgnZGVidWcnLCBuYW1lc3BhY2VzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFN3YWxsb3dcblx0XHQvLyBYWFggKEBRaXgtKSBzaG91bGQgd2UgYmUgbG9nZ2luZyB0aGVzZT9cblx0fVxufVxuXG4vKipcbiAqIExvYWQgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gcmV0dXJucyB0aGUgcHJldmlvdXNseSBwZXJzaXN0ZWQgZGVidWcgbW9kZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsb2FkKCkge1xuXHRsZXQgcjtcblx0dHJ5IHtcblx0XHRyID0gZXhwb3J0cy5zdG9yYWdlLmdldEl0ZW0oJ2RlYnVnJykgfHwgZXhwb3J0cy5zdG9yYWdlLmdldEl0ZW0oJ0RFQlVHJykgO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFN3YWxsb3dcblx0XHQvLyBYWFggKEBRaXgtKSBzaG91bGQgd2UgYmUgbG9nZ2luZyB0aGVzZT9cblx0fVxuXG5cdC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcblx0aWYgKCFyICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAnZW52JyBpbiBwcm9jZXNzKSB7XG5cdFx0ciA9IHByb2Nlc3MuZW52LkRFQlVHO1xuXHR9XG5cblx0cmV0dXJuIHI7XG59XG5cbi8qKlxuICogTG9jYWxzdG9yYWdlIGF0dGVtcHRzIHRvIHJldHVybiB0aGUgbG9jYWxzdG9yYWdlLlxuICpcbiAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugc2FmYXJpIHRocm93c1xuICogd2hlbiBhIHVzZXIgZGlzYWJsZXMgY29va2llcy9sb2NhbHN0b3JhZ2VcbiAqIGFuZCB5b3UgYXR0ZW1wdCB0byBhY2Nlc3MgaXQuXG4gKlxuICogQHJldHVybiB7TG9jYWxTdG9yYWdlfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9jYWxzdG9yYWdlKCkge1xuXHR0cnkge1xuXHRcdC8vIFRWTUxLaXQgKEFwcGxlIFRWIEpTIFJ1bnRpbWUpIGRvZXMgbm90IGhhdmUgYSB3aW5kb3cgb2JqZWN0LCBqdXN0IGxvY2FsU3RvcmFnZSBpbiB0aGUgZ2xvYmFsIGNvbnRleHRcblx0XHQvLyBUaGUgQnJvd3NlciBhbHNvIGhhcyBsb2NhbFN0b3JhZ2UgaW4gdGhlIGdsb2JhbCBjb250ZXh0LlxuXHRcdHJldHVybiBsb2NhbFN0b3JhZ2U7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Ly8gU3dhbGxvd1xuXHRcdC8vIFhYWCAoQFFpeC0pIHNob3VsZCB3ZSBiZSBsb2dnaW5nIHRoZXNlP1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb21tb24nKShleHBvcnRzKTtcblxuY29uc3Qge2Zvcm1hdHRlcnN9ID0gbW9kdWxlLmV4cG9ydHM7XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmZvcm1hdHRlcnMuaiA9IGZ1bmN0aW9uICh2KSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdHJldHVybiAnW1VuZXhwZWN0ZWRKU09OUGFyc2VFcnJvcl06ICcgKyBlcnJvci5tZXNzYWdlO1xuXHR9XG59O1xuIiwgIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5jb25zdCB0dHkgPSByZXF1aXJlKCd0dHknKTtcbmNvbnN0IHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgTm9kZS5qcyBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKi9cblxuZXhwb3J0cy5pbml0ID0gaW5pdDtcbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLmRlc3Ryb3kgPSB1dGlsLmRlcHJlY2F0ZShcblx0KCkgPT4ge30sXG5cdCdJbnN0YW5jZSBtZXRob2QgYGRlYnVnLmRlc3Ryb3koKWAgaXMgZGVwcmVjYXRlZCBhbmQgbm8gbG9uZ2VyIGRvZXMgYW55dGhpbmcuIEl0IHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uIG9mIGBkZWJ1Z2AuJ1xuKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbNiwgMiwgMywgNCwgNSwgMV07XG5cbnRyeSB7XG5cdC8vIE9wdGlvbmFsIGRlcGVuZGVuY3kgKGFzIGluLCBkb2Vzbid0IG5lZWQgdG8gYmUgaW5zdGFsbGVkLCBOT1QgbGlrZSBvcHRpb25hbERlcGVuZGVuY2llcyBpbiBwYWNrYWdlLmpzb24pXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXNcblx0Y29uc3Qgc3VwcG9ydHNDb2xvciA9IHJlcXVpcmUoJ3N1cHBvcnRzLWNvbG9yJyk7XG5cblx0aWYgKHN1cHBvcnRzQ29sb3IgJiYgKHN1cHBvcnRzQ29sb3Iuc3RkZXJyIHx8IHN1cHBvcnRzQ29sb3IpLmxldmVsID49IDIpIHtcblx0XHRleHBvcnRzLmNvbG9ycyA9IFtcblx0XHRcdDIwLFxuXHRcdFx0MjEsXG5cdFx0XHQyNixcblx0XHRcdDI3LFxuXHRcdFx0MzIsXG5cdFx0XHQzMyxcblx0XHRcdDM4LFxuXHRcdFx0MzksXG5cdFx0XHQ0MCxcblx0XHRcdDQxLFxuXHRcdFx0NDIsXG5cdFx0XHQ0Myxcblx0XHRcdDQ0LFxuXHRcdFx0NDUsXG5cdFx0XHQ1Nixcblx0XHRcdDU3LFxuXHRcdFx0NjIsXG5cdFx0XHQ2Myxcblx0XHRcdDY4LFxuXHRcdFx0NjksXG5cdFx0XHQ3NCxcblx0XHRcdDc1LFxuXHRcdFx0NzYsXG5cdFx0XHQ3Nyxcblx0XHRcdDc4LFxuXHRcdFx0NzksXG5cdFx0XHQ4MCxcblx0XHRcdDgxLFxuXHRcdFx0OTIsXG5cdFx0XHQ5Myxcblx0XHRcdDk4LFxuXHRcdFx0OTksXG5cdFx0XHQxMTIsXG5cdFx0XHQxMTMsXG5cdFx0XHQxMjgsXG5cdFx0XHQxMjksXG5cdFx0XHQxMzQsXG5cdFx0XHQxMzUsXG5cdFx0XHQxNDgsXG5cdFx0XHQxNDksXG5cdFx0XHQxNjAsXG5cdFx0XHQxNjEsXG5cdFx0XHQxNjIsXG5cdFx0XHQxNjMsXG5cdFx0XHQxNjQsXG5cdFx0XHQxNjUsXG5cdFx0XHQxNjYsXG5cdFx0XHQxNjcsXG5cdFx0XHQxNjgsXG5cdFx0XHQxNjksXG5cdFx0XHQxNzAsXG5cdFx0XHQxNzEsXG5cdFx0XHQxNzIsXG5cdFx0XHQxNzMsXG5cdFx0XHQxNzgsXG5cdFx0XHQxNzksXG5cdFx0XHQxODQsXG5cdFx0XHQxODUsXG5cdFx0XHQxOTYsXG5cdFx0XHQxOTcsXG5cdFx0XHQxOTgsXG5cdFx0XHQxOTksXG5cdFx0XHQyMDAsXG5cdFx0XHQyMDEsXG5cdFx0XHQyMDIsXG5cdFx0XHQyMDMsXG5cdFx0XHQyMDQsXG5cdFx0XHQyMDUsXG5cdFx0XHQyMDYsXG5cdFx0XHQyMDcsXG5cdFx0XHQyMDgsXG5cdFx0XHQyMDksXG5cdFx0XHQyMTQsXG5cdFx0XHQyMTUsXG5cdFx0XHQyMjAsXG5cdFx0XHQyMjFcblx0XHRdO1xuXHR9XG59IGNhdGNoIChlcnJvcikge1xuXHQvLyBTd2FsbG93IC0gd2Ugb25seSBjYXJlIGlmIGBzdXBwb3J0cy1jb2xvcmAgaXMgYXZhaWxhYmxlOyBpdCBkb2Vzbid0IGhhdmUgdG8gYmUuXG59XG5cbi8qKlxuICogQnVpbGQgdXAgdGhlIGRlZmF1bHQgYGluc3BlY3RPcHRzYCBvYmplY3QgZnJvbSB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuICpcbiAqICAgJCBERUJVR19DT0xPUlM9bm8gREVCVUdfREVQVEg9MTAgREVCVUdfU0hPV19ISURERU49ZW5hYmxlZCBub2RlIHNjcmlwdC5qc1xuICovXG5cbmV4cG9ydHMuaW5zcGVjdE9wdHMgPSBPYmplY3Qua2V5cyhwcm9jZXNzLmVudikuZmlsdGVyKGtleSA9PiB7XG5cdHJldHVybiAvXmRlYnVnXy9pLnRlc3Qoa2V5KTtcbn0pLnJlZHVjZSgob2JqLCBrZXkpID0+IHtcblx0Ly8gQ2FtZWwtY2FzZVxuXHRjb25zdCBwcm9wID0ga2V5XG5cdFx0LnN1YnN0cmluZyg2KVxuXHRcdC50b0xvd2VyQ2FzZSgpXG5cdFx0LnJlcGxhY2UoL18oW2Etel0pL2csIChfLCBrKSA9PiB7XG5cdFx0XHRyZXR1cm4gay50b1VwcGVyQ2FzZSgpO1xuXHRcdH0pO1xuXG5cdC8vIENvZXJjZSBzdHJpbmcgdmFsdWUgaW50byBKUyB2YWx1ZVxuXHRsZXQgdmFsID0gcHJvY2Vzcy5lbnZba2V5XTtcblx0aWYgKC9eKHllc3xvbnx0cnVlfGVuYWJsZWQpJC9pLnRlc3QodmFsKSkge1xuXHRcdHZhbCA9IHRydWU7XG5cdH0gZWxzZSBpZiAoL14obm98b2ZmfGZhbHNlfGRpc2FibGVkKSQvaS50ZXN0KHZhbCkpIHtcblx0XHR2YWwgPSBmYWxzZTtcblx0fSBlbHNlIGlmICh2YWwgPT09ICdudWxsJykge1xuXHRcdHZhbCA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0dmFsID0gTnVtYmVyKHZhbCk7XG5cdH1cblxuXHRvYmpbcHJvcF0gPSB2YWw7XG5cdHJldHVybiBvYmo7XG59LCB7fSk7XG5cbi8qKlxuICogSXMgc3Rkb3V0IGEgVFRZPyBDb2xvcmVkIG91dHB1dCBpcyBlbmFibGVkIHdoZW4gYHRydWVgLlxuICovXG5cbmZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcblx0cmV0dXJuICdjb2xvcnMnIGluIGV4cG9ydHMuaW5zcGVjdE9wdHMgP1xuXHRcdEJvb2xlYW4oZXhwb3J0cy5pbnNwZWN0T3B0cy5jb2xvcnMpIDpcblx0XHR0dHkuaXNhdHR5KHByb2Nlc3Muc3RkZXJyLmZkKTtcbn1cblxuLyoqXG4gKiBBZGRzIEFOU0kgY29sb3IgZXNjYXBlIGNvZGVzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcblx0Y29uc3Qge25hbWVzcGFjZTogbmFtZSwgdXNlQ29sb3JzfSA9IHRoaXM7XG5cblx0aWYgKHVzZUNvbG9ycykge1xuXHRcdGNvbnN0IGMgPSB0aGlzLmNvbG9yO1xuXHRcdGNvbnN0IGNvbG9yQ29kZSA9ICdcXHUwMDFCWzMnICsgKGMgPCA4ID8gYyA6ICc4OzU7JyArIGMpO1xuXHRcdGNvbnN0IHByZWZpeCA9IGAgICR7Y29sb3JDb2RlfTsxbSR7bmFtZX0gXFx1MDAxQlswbWA7XG5cblx0XHRhcmdzWzBdID0gcHJlZml4ICsgYXJnc1swXS5zcGxpdCgnXFxuJykuam9pbignXFxuJyArIHByZWZpeCk7XG5cdFx0YXJncy5wdXNoKGNvbG9yQ29kZSArICdtKycgKyBtb2R1bGUuZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpICsgJ1xcdTAwMUJbMG0nKTtcblx0fSBlbHNlIHtcblx0XHRhcmdzWzBdID0gZ2V0RGF0ZSgpICsgbmFtZSArICcgJyArIGFyZ3NbMF07XG5cdH1cbn1cblxuZnVuY3Rpb24gZ2V0RGF0ZSgpIHtcblx0aWYgKGV4cG9ydHMuaW5zcGVjdE9wdHMuaGlkZURhdGUpIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblx0cmV0dXJuIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSArICcgJztcbn1cblxuLyoqXG4gKiBJbnZva2VzIGB1dGlsLmZvcm1hdFdpdGhPcHRpb25zKClgIHdpdGggdGhlIHNwZWNpZmllZCBhcmd1bWVudHMgYW5kIHdyaXRlcyB0byBzdGRlcnIuXG4gKi9cblxuZnVuY3Rpb24gbG9nKC4uLmFyZ3MpIHtcblx0cmV0dXJuIHByb2Nlc3Muc3RkZXJyLndyaXRlKHV0aWwuZm9ybWF0V2l0aE9wdGlvbnMoZXhwb3J0cy5pbnNwZWN0T3B0cywgLi4uYXJncykgKyAnXFxuJyk7XG59XG5cbi8qKlxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcblx0aWYgKG5hbWVzcGFjZXMpIHtcblx0XHRwcm9jZXNzLmVudi5ERUJVRyA9IG5hbWVzcGFjZXM7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gSWYgeW91IHNldCBhIHByb2Nlc3MuZW52IGZpZWxkIHRvIG51bGwgb3IgdW5kZWZpbmVkLCBpdCBnZXRzIGNhc3QgdG8gdGhlXG5cdFx0Ly8gc3RyaW5nICdudWxsJyBvciAndW5kZWZpbmVkJy4gSnVzdCBkZWxldGUgaW5zdGVhZC5cblx0XHRkZWxldGUgcHJvY2Vzcy5lbnYuREVCVUc7XG5cdH1cbn1cblxuLyoqXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2FkKCkge1xuXHRyZXR1cm4gcHJvY2Vzcy5lbnYuREVCVUc7XG59XG5cbi8qKlxuICogSW5pdCBsb2dpYyBmb3IgYGRlYnVnYCBpbnN0YW5jZXMuXG4gKlxuICogQ3JlYXRlIGEgbmV3IGBpbnNwZWN0T3B0c2Agb2JqZWN0IGluIGNhc2UgYHVzZUNvbG9yc2AgaXMgc2V0XG4gKiBkaWZmZXJlbnRseSBmb3IgYSBwYXJ0aWN1bGFyIGBkZWJ1Z2AgaW5zdGFuY2UuXG4gKi9cblxuZnVuY3Rpb24gaW5pdChkZWJ1Zykge1xuXHRkZWJ1Zy5pbnNwZWN0T3B0cyA9IHt9O1xuXG5cdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmluc3BlY3RPcHRzKTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0ZGVidWcuaW5zcGVjdE9wdHNba2V5c1tpXV0gPSBleHBvcnRzLmluc3BlY3RPcHRzW2tleXNbaV1dO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb21tb24nKShleHBvcnRzKTtcblxuY29uc3Qge2Zvcm1hdHRlcnN9ID0gbW9kdWxlLmV4cG9ydHM7XG5cbi8qKlxuICogTWFwICVvIHRvIGB1dGlsLmluc3BlY3QoKWAsIGFsbCBvbiBhIHNpbmdsZSBsaW5lLlxuICovXG5cbmZvcm1hdHRlcnMubyA9IGZ1bmN0aW9uICh2KSB7XG5cdHRoaXMuaW5zcGVjdE9wdHMuY29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cdHJldHVybiB1dGlsLmluc3BlY3QodiwgdGhpcy5pbnNwZWN0T3B0cylcblx0XHQuc3BsaXQoJ1xcbicpXG5cdFx0Lm1hcChzdHIgPT4gc3RyLnRyaW0oKSlcblx0XHQuam9pbignICcpO1xufTtcblxuLyoqXG4gKiBNYXAgJU8gdG8gYHV0aWwuaW5zcGVjdCgpYCwgYWxsb3dpbmcgbXVsdGlwbGUgbGluZXMgaWYgbmVlZGVkLlxuICovXG5cbmZvcm1hdHRlcnMuTyA9IGZ1bmN0aW9uICh2KSB7XG5cdHRoaXMuaW5zcGVjdE9wdHMuY29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cdHJldHVybiB1dGlsLmluc3BlY3QodiwgdGhpcy5pbnNwZWN0T3B0cyk7XG59O1xuIiwgIi8qKlxuICogRGV0ZWN0IEVsZWN0cm9uIHJlbmRlcmVyIC8gbndqcyBwcm9jZXNzLCB3aGljaCBpcyBub2RlLCBidXQgd2Ugc2hvdWxkXG4gKiB0cmVhdCBhcyBhIGJyb3dzZXIuXG4gKi9cblxuaWYgKHR5cGVvZiBwcm9jZXNzID09PSAndW5kZWZpbmVkJyB8fCBwcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicgfHwgcHJvY2Vzcy5icm93c2VyID09PSB0cnVlIHx8IHByb2Nlc3MuX19ud2pzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9icm93c2VyLmpzJyk7XG59IGVsc2Uge1xuXHRtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbm9kZS5qcycpO1xufVxuIiwgbnVsbCwgbnVsbCwgbnVsbCwgImltcG9ydCB7XG4gICAgQXBwLFxuICAgIEZpbGVTeXN0ZW1BZGFwdGVyLFxuICAgIEl0ZW1WaWV3LFxuICAgIE5vdGljZSxcbiAgICBQbHVnaW4sXG4gICAgUGx1Z2luU2V0dGluZ1RhYixcbiAgICBTZXR0aW5nLFxuICAgIFRGaWxlLFxuICAgIFdvcmtzcGFjZUxlYWYsXG59IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgc2ltcGxlR2l0IH0gZnJvbSBcInNpbXBsZS1naXRcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgZnNwIGZyb20gXCJmcy9wcm9taXNlc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0ICogYXMgb3MgZnJvbSBcIm9zXCI7XG5cbmltcG9ydCB7XG4gICAgUmVtb3RlQXJ0aWNsZSxcbiAgICBjb25maXJtU3luY0NvbmZsaWN0LFxuICAgIHN5bmNBcnRpY2xlLFxuICAgIHN5bmNBcnRpY2xlQXNDb3B5LFxufSBmcm9tIFwiLi9zcmMvc3luY1wiO1xuaW1wb3J0IHsgZG93bmxvYWRBcnRpY2xlIH0gZnJvbSBcIi4vc3JjL2Rvd25sb2FkXCI7XG5pbXBvcnQgeyBVcGxvYWRBcnRpY2xlTW9kYWwsIHVwbG9hZExvY2FsQXJ0aWNsZSB9IGZyb20gXCIuL3NyYy91cGxvYWRcIjtcbmltcG9ydCB7IHJlZnJlc2hBcnRpY2xlc1ZpZXcgfSBmcm9tIFwiLi9zcmMvcmVmcmVzaFwiO1xuXG5leHBvcnQgdHlwZSB7IFJlbW90ZUFydGljbGUgfTtcblxuY29uc3QgVklFV19UWVBFX0FSVElDTEVTID0gXCJnaXQtYXJ0aWNsZXMtdmlld1wiO1xuXG5pbnRlcmZhY2UgR2l0U3luY1NldHRpbmdzIHtcbiAgICByZXBvVXJsOiBzdHJpbmc7XG4gICAgc3NoS2V5OiBzdHJpbmc7XG4gICAgdGFyZ2V0Rm9sZGVyOiBzdHJpbmc7XG59XG5cbmNvbnN0IERFRkFVTFRfU0VUVElOR1M6IEdpdFN5bmNTZXR0aW5ncyA9IHtcbiAgICByZXBvVXJsOiBcIlwiLFxuICAgIHNzaEtleTogXCJcIixcbiAgICB0YXJnZXRGb2xkZXI6IFwiR2l0XHU2NTg3XHU3QUUwXCIsXG59O1xuXG5jbGFzcyBHaXRBcnRpY2xlc1ZpZXcgZXh0ZW5kcyBJdGVtVmlldyB7XG4gICAgcGx1Z2luOiBNeVNpbXBsZVBsdWdpbjtcbiAgICBhcnRpY2xlczogUmVtb3RlQXJ0aWNsZVtdID0gW107XG4gICAgbG9jYWxUaXRsZXMgPSBuZXcgTWFwPHN0cmluZywgVEZpbGU+KCk7XG4gICAgY29udGVudEVsOiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIGlzTG9hZGluZyA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IobGVhZjogV29ya3NwYWNlTGVhZiwgcGx1Z2luOiBNeVNpbXBsZVBsdWdpbikge1xuICAgICAgICBzdXBlcihsZWFmKTtcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgICAgIHRoaXMuY29udGVudEVsID0gdGhpcy5jb250YWluZXJFbC5jaGlsZHJlblsxXSBhcyBIVE1MRWxlbWVudDtcbiAgICB9XG5cbiAgICBnZXRWaWV3VHlwZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gVklFV19UWVBFX0FSVElDTEVTO1xuICAgIH1cblxuICAgIGdldERpc3BsYXlUZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBcIkdpdCBcdTY1ODdcdTdBRTBcIjtcbiAgICB9XG5cbiAgICBnZXRJY29uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBcImJvb2stb3BlblwiO1xuICAgIH1cblxuICAgIGFzeW5jIG9uT3BlbigpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBhc3luYyByZW5kZXIoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLmVuc3VyZVNldHRpbmdzTG9hZGVkKCk7XG5cbiAgICAgICAgdGhpcy5jb250ZW50RWwuZW1wdHkoKTtcbiAgICAgICAgdGhpcy5jb250ZW50RWwuYWRkQ2xhc3MoXCJnaXQtYXJ0aWNsZXMtY29udGFpbmVyXCIpO1xuXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IHRoaXMuY29udGVudEVsLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtaGVhZGVyXCIgfSk7XG4gICAgICAgIGNvbnN0IHRpdGxlQm94ID0gaGVhZGVyLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtaGVhZGVyLXRpdGxlXCIgfSk7XG4gICAgICAgIHRpdGxlQm94LmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIkdpdCBcdTY1ODdcdTdBRTBcIiB9KTtcbiAgICAgICAgdGl0bGVCb3guY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgICAgICAgdGV4dDogdGhpcy5wbHVnaW4uc2V0dGluZ3MucmVwb1VybFxuICAgICAgICAgICAgICAgID8gXCJcdTRFQ0VcdTVERjJcdTkxNERcdTdGNkVcdTc2ODQgR2l0IFx1NEVEM1x1NUU5M1x1OEJGQlx1NTNENiBNYXJrZG93biBcdTY1ODdcdTdBRTBcIlxuICAgICAgICAgICAgICAgIDogXCJcdThCRjdcdTUxNDhcdTU3MjhcdThCQkVcdTdGNkVcdTRFMkRcdTkxNERcdTdGNkUgR2l0IFx1NEVEM1x1NUU5M1wiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC1hcnRpY2xlcy1zdWJ0aXRsZVwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByZWZyZXNoQnV0dG9uID0gaGVhZGVyLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU1MjM3XHU2NUIwXCIsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LWFydGljbGVzLXJlZnJlc2hcIixcbiAgICAgICAgfSk7XG4gICAgICAgIHJlZnJlc2hCdXR0b24ub25jbGljayA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJlZnJlc2hCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmVmcmVzaEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiXHU1MjM3XHU2NUIwXHU0RTJEXHUyMDI2XCI7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZEFydGljbGVzKCk7XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHJlZnJlc2hCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZWZyZXNoQnV0dG9uLnRleHRDb250ZW50ID0gXCJcdTUyMzdcdTY1QjBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoIXRoaXMucGx1Z2luLnNldHRpbmdzLnJlcG9VcmwpIHtcbiAgICAgICAgICAgIGNvbnN0IGVtcHR5ID0gdGhpcy5jb250ZW50RWwuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1hcnRpY2xlcy1lbXB0eVwiIH0pO1xuICAgICAgICAgICAgZW1wdHkuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1hcnRpY2xlcy1lbXB0eS1pY29uXCIsIHRleHQ6IFwiXHUyNjk5XHVGRTBGXCIgfSk7XG4gICAgICAgICAgICBlbXB0eS5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogXCJcdThGRDhcdTZDQTFcdTY3MDlcdTkxNERcdTdGNkUgR2l0IFx1NEVEM1x1NUU5M1wiIH0pO1xuICAgICAgICAgICAgZW1wdHkuY3JlYXRlRWwoXCJwXCIsIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1NjI1M1x1NUYwMCBPYnNpZGlhbiBcdThCQkVcdTdGNkUgXHUyMTkyIEdpdCBcdTY1ODdcdTdBRTBcdTU0MENcdTZCNjVcdUZGMENcdTU4NkJcdTUxOTlcdTRFRDNcdTVFOTNcdTU3MzBcdTU3NDBcdTU0MEVcdThGRDRcdTU2REVcdTZCNjRcdTY4MDdcdTdCN0VcdTk4NzVcdTMwMDJcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9hZGluZyA9IHRoaXMuY29udGVudEVsLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtbG9hZGluZ1wiIH0pO1xuICAgICAgICBsb2FkaW5nLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtc3Bpbm5lclwiIH0pO1xuICAgICAgICBsb2FkaW5nLmNyZWF0ZVNwYW4oeyB0ZXh0OiBcIlx1NkI2M1x1NTcyOFx1OEJGQlx1NTNENiBHaXQgXHU0RUQzXHU1RTkzXHUyMDI2XCIgfSk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZEFydGljbGVzKCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBsb2FkaW5nLnJlbW92ZSgpO1xuICAgICAgICAgICAgY29uc3QgZXJyb3JFbCA9IHRoaXMuY29udGVudEVsLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtZXJyb3JcIiB9KTtcbiAgICAgICAgICAgIGVycm9yRWwuY3JlYXRlRWwoXCJzdHJvbmdcIiwgeyB0ZXh0OiBcIlx1OEJGQlx1NTNENlx1NEVEM1x1NUU5M1x1NTkzMVx1OEQyNVwiIH0pO1xuICAgICAgICAgICAgZXJyb3JFbC5jcmVhdGVFbChcImRpdlwiLCB7XG4gICAgICAgICAgICAgICAgdGV4dDogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogXHU1QkY5XHU1OTE2XHU1MTZDXHU1RjAwXHU3Njg0XHU1MjM3XHU2NUIwXHU1MTY1XHU1M0UzXHVGRjBDXHU0RjlCIHJlZnJlc2gudHMgXHU4QzAzXHU3NTI4ICovXG4gICAgYXN5bmMgcmVmcmVzaCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBsdWdpbi5zZXR0aW5ncy5yZXBvVXJsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0xvYWRpbmcpIHJldHVybjtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRBcnRpY2xlcygpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgbmV3IE5vdGljZShcbiAgICAgICAgICAgICAgICBgXHU1MjM3XHU2NUIwXHU1OTMxXHU4RDI1XHVGRjFBJHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpXG4gICAgICAgICAgICAgICAgfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZEFydGljbGVzKCkge1xuICAgICAgICBjb25zdCB0ZW1wRGlyID0gYXdhaXQgdGhpcy5wbHVnaW4uY2xvbmVUb1RlbXAoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuYXJ0aWNsZXMgPSBhd2FpdCB0aGlzLnBsdWdpbi5nZXRSZW1vdGVBcnRpY2xlcyh0ZW1wRGlyKTtcblxuICAgICAgICAgICAgdGhpcy5sb2NhbFRpdGxlcy5jbGVhcigpO1xuICAgICAgICAgICAgY29uc3QgbG9jYWxGaWxlcyA9IHRoaXMuYXBwLnZhdWx0LmdldE1hcmtkb3duRmlsZXMoKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhbEZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IGxvY2FsRmlsZXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmxvY2FsVGl0bGVzLmhhcyhmaWxlLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYWxUaXRsZXMuc2V0KGZpbGUubmFtZSwgZmlsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFx1NkJDRlx1NTkwNFx1NzQwNlx1NEUwMFx1NjI3OVx1OEJBOVx1NTFGQVx1NEU4Qlx1NEVGNlx1NUZBQVx1NzNBRlx1RkYwQ1x1OTA3Rlx1NTE0RFx1OTU3Rlx1NjVGNlx1OTVGNFx1OTYzQlx1NTg1RSBVSVxuICAgICAgICAgICAgICAgIGlmIChpICUgMjAwID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIDApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG9sZExpc3QgPSB0aGlzLmNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yKFwiLmdpdC1hcnRpY2xlcy1saXN0XCIpO1xuICAgICAgICAgICAgb2xkTGlzdD8ucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGxvYWRpbmcgPSB0aGlzLmNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yKFwiLmdpdC1hcnRpY2xlcy1sb2FkaW5nXCIpO1xuICAgICAgICAgICAgbG9hZGluZz8ucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLmNvbnRlbnRFbC5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LWFydGljbGVzLWxpc3RcIiB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYXJ0aWNsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZW1wdHkgPSBsaXN0LmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtZW1wdHlcIiB9KTtcbiAgICAgICAgICAgICAgICBlbXB0eS5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogXCJcdTRFRDNcdTVFOTNcdTRFMkRcdTZDQTFcdTY3MDkgTWFya2Rvd24gXHU2NTg3XHU3QUUwXCIgfSk7XG4gICAgICAgICAgICAgICAgZW1wdHkuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogXCJcdTVGNTNcdTUyNERcdTUzRUFcdTY2M0VcdTc5M0EgLm1kIFx1NjU4N1x1NEVGNlx1MzAwMlwiIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgc3VtbWFyeSA9IGxpc3QuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1hcnRpY2xlcy1zdW1tYXJ5XCIgfSk7XG4gICAgICAgICAgICBzdW1tYXJ5LnNldFRleHQoYFx1NTE3MSAke3RoaXMuYXJ0aWNsZXMubGVuZ3RofSBcdTdCQzdcdTY1ODdcdTdBRTBgKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBhcnRpY2xlIG9mIHRoaXMuYXJ0aWNsZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckFydGljbGVDYXJkKGxpc3QsIGFydGljbGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnJlbmRlckxvY2FsQXJ0aWNsZXMoKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnJlbW92ZVRlbXBEaXIodGVtcERpcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJBcnRpY2xlQ2FyZChsaXN0OiBIVE1MRWxlbWVudCwgYXJ0aWNsZTogUmVtb3RlQXJ0aWNsZSkge1xuICAgICAgICBjb25zdCByZW1vdGVGaWxlTmFtZSA9IGFydGljbGUucmVsYXRpdmVQYXRoLnNwbGl0KFwiL1wiKS5wb3AoKSA/PyBcIlwiO1xuICAgICAgICBjb25zdCBsb2NhbEZpbGUgPSB0aGlzLmxvY2FsVGl0bGVzLmdldChyZW1vdGVGaWxlTmFtZSk7XG4gICAgICAgIGNvbnN0IGNhcmQgPSBsaXN0LmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZS1jYXJkXCIgfSk7XG5cbiAgICAgICAgY29uc3QgaW5mbyA9IGNhcmQuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1hcnRpY2xlLWluZm9cIiB9KTtcbiAgICAgICAgaW5mby5jcmVhdGVFbChcImRpdlwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBhcnRpY2xlLnRpdGxlLFxuICAgICAgICAgICAgY2xzOiBcImdpdC1hcnRpY2xlLXRpdGxlXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBpbmZvLmNyZWF0ZUVsKFwiZGl2XCIsIHtcbiAgICAgICAgICAgIHRleHQ6IGFydGljbGUucmVsYXRpdmVQYXRoLFxuICAgICAgICAgICAgY2xzOiBcImdpdC1hcnRpY2xlLXBhdGhcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYWN0aW9uID0gY2FyZC5jcmVhdGVFbChcImJ1dHRvblwiLCB7XG4gICAgICAgICAgICBjbHM6IGxvY2FsRmlsZSA/IFwiZ2l0LWFydGljbGUtYWN0aW9uIGlzLXN5bmNlZFwiIDogXCJnaXQtYXJ0aWNsZS1hY3Rpb25cIixcbiAgICAgICAgICAgIHRleHQ6IGxvY2FsRmlsZSA/IFwiXHU1NDBDXHU2QjY1XCIgOiBcIlx1NEUwQlx1OEY3RFwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBhY3Rpb24uc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCIsXG4gICAgICAgICAgICBsb2NhbEZpbGVcbiAgICAgICAgICAgICAgICA/IGBcdTU0MENcdTZCNjVcdTMwMEEke2FydGljbGUudGl0bGV9XHUzMDBCYFxuICAgICAgICAgICAgICAgIDogYFx1NEUwQlx1OEY3RFx1MzAwQSR7YXJ0aWNsZS50aXRsZX1cdTMwMEJgXG4gICAgICAgICk7XG5cbiAgICAgICAgYWN0aW9uLm9uY2xpY2sgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBhY3Rpb24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgYWN0aW9uLnRleHRDb250ZW50ID0gbG9jYWxGaWxlID8gXCJcdTU0MENcdTZCNjVcdTRFMkRcdTIwMjZcIiA6IFwiXHU0RTBCXHU4RjdEXHU0RTJEXHUyMDI2XCI7XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsRmlsZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjb25maXJtU3luY0NvbmZsaWN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnRpY2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxGaWxlXG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gXCJjYW5jZWxcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gXCJvdmVyd3JpdGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgc3luY0FydGljbGUodGhpcy5wbHVnaW4sIGFydGljbGUsIGxvY2FsRmlsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKGBcdTMwMEEke2FydGljbGUudGl0bGV9XHUzMDBCXHU1REYyXHU4OTg2XHU3NkQ2XHU1RTc2XHU1NDBDXHU2QjY1YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCByZWZyZXNoQXJ0aWNsZXNWaWV3KHRoaXMucGx1Z2luLCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IFwiY29weVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3B5RmlsZSA9IGF3YWl0IHN5bmNBcnRpY2xlQXNDb3B5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFydGljbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxGaWxlXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZShgXHU1REYyXHU0RkREXHU1QjU4XHU0RTNBXHU1MjZGXHU0RUY2XHVGRjFBJHtjb3B5RmlsZS5wYXRofWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgcmVmcmVzaEFydGljbGVzVmlldyh0aGlzLnBsdWdpbiwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdGaWxlID0gYXdhaXQgZG93bmxvYWRBcnRpY2xlKHRoaXMucGx1Z2luLCBhcnRpY2xlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhbFRpdGxlcy5zZXQobmV3RmlsZS5uYW1lLCBuZXdGaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLnRleHRDb250ZW50ID0gXCJcdTU0MENcdTZCNjVcIjtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJpcy1zeW5jZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoYFx1MzAwQSR7YXJ0aWNsZS50aXRsZX1cdTMwMEJcdTVERjJcdTRFMEJcdThGN0RgKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcmVmcmVzaEFydGljbGVzVmlldyh0aGlzLnBsdWdpbiwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBuZXcgTm90aWNlKFxuICAgICAgICAgICAgICAgICAgICBgJHtsb2NhbEZpbGUgPyBcIlx1NTQwQ1x1NkI2NVwiIDogXCJcdTRFMEJcdThGN0RcIn1cdTU5MzFcdThEMjVcdUZGMUEke1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgIH1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsRmlsZSkgYWN0aW9uLnRleHRDb250ZW50ID0gXCJcdTU0MENcdTZCNjVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBhc3luYyByZW5kZXJMb2NhbEFydGljbGVzKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yKFwiLmdpdC1sb2NhbC1hcnRpY2xlcy1zZWN0aW9uXCIpPy5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5jb250ZW50RWwucXVlcnlTZWxlY3RvcihcIi5naXQtYXJ0aWNsZXMtbG9hZGluZ1wiKT8ucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuY29udGVudEVsLnF1ZXJ5U2VsZWN0b3IoXCIuZ2l0LWFydGljbGVzLWVtcHR5XCIpPy5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5jb250ZW50RWwucXVlcnlTZWxlY3RvcihcIi5naXQtYXJ0aWNsZXMtZXJyb3JcIik/LnJlbW92ZSgpO1xuXG4gICAgICAgIGNvbnN0IHNlY3Rpb24gPSB0aGlzLmNvbnRlbnRFbC5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LWxvY2FsLWFydGljbGVzLXNlY3Rpb25cIiB9KTtcblxuICAgICAgICBjb25zdCBoZWFkZXIgPSBzZWN0aW9uLmNyZWF0ZURpdih7IGNsczogXCJnaXQtbG9jYWwtYXJ0aWNsZXMtaGVhZGVyXCIgfSk7XG4gICAgICAgIGNvbnN0IHRpdGxlQm94ID0gaGVhZGVyLmNyZWF0ZURpdigpO1xuICAgICAgICB0aXRsZUJveC5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogXCJcdTY3MkNcdTU3MzBcdTY1ODdcdTdBRTBcdTRFMEFcdTRGMjBcIiB9KTtcbiAgICAgICAgdGl0bGVCb3guY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgICAgICAgdGV4dDogXCJcdThCRkJcdTUzRDZcdTVGNTNcdTUyNEQgVmF1bHQgXHU0RTJEXHU3Njg0IE1hcmtkb3duIFx1NjU4N1x1NEVGNlx1RkYwQ1x1OTAwOVx1NjJFOSBHaXQgXHU0RUQzXHU1RTkzXHU2NTg3XHU0RUY2XHU1OTM5XHU1NDBFXHU0RTBBXHU0RjIwXHUzMDAyXCIsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LWFydGljbGVzLXN1YnRpdGxlXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGxvY2FsRmlsZXMgPSB0aGlzLmFwcC52YXVsdFxuICAgICAgICAgICAgLmdldE1hcmtkb3duRmlsZXMoKVxuICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEucGF0aC5sb2NhbGVDb21wYXJlKGIucGF0aCwgXCJ6aC1DTlwiKSk7XG5cbiAgICAgICAgaWYgKGxvY2FsRmlsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBzZWN0aW9uLmNyZWF0ZURpdih7XG4gICAgICAgICAgICAgICAgdGV4dDogXCJcdTVGNTNcdTUyNEQgVmF1bHQgXHU0RTJEXHU2Q0ExXHU2NzA5IE1hcmtkb3duIFx1NjU4N1x1N0FFMFx1MzAwMlwiLFxuICAgICAgICAgICAgICAgIGNsczogXCJnaXQtbG9jYWwtZW1wdHlcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbGlzdCA9IHNlY3Rpb24uY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1sb2NhbC1hcnRpY2xlcy1saXN0XCIgfSk7XG5cbiAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGxvY2FsRmlsZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhcmQgPSBsaXN0LmNyZWF0ZURpdih7IGNsczogXCJnaXQtbG9jYWwtYXJ0aWNsZS1jYXJkXCIgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSBjYXJkLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZS1pbmZvXCIgfSk7XG4gICAgICAgICAgICBpbmZvLmNyZWF0ZUVsKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBmaWxlLmJhc2VuYW1lLFxuICAgICAgICAgICAgICAgIGNsczogXCJnaXQtYXJ0aWNsZS10aXRsZVwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpbmZvLmNyZWF0ZUVsKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBmaWxlLnBhdGgsXG4gICAgICAgICAgICAgICAgY2xzOiBcImdpdC1hcnRpY2xlLXBhdGhcIixcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBhY3Rpb24gPSBjYXJkLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1NEUwQVx1NEYyMFwiLFxuICAgICAgICAgICAgICAgIGNsczogXCJnaXQtYXJ0aWNsZS1hY3Rpb25cIixcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBhY3Rpb24ub25jbGljayA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RhbCA9IG5ldyBVcGxvYWRBcnRpY2xlTW9kYWwodGhpcy5hcHAsIHRoaXMucGx1Z2luLCBmaWxlKTtcbiAgICAgICAgICAgICAgICBtb2RhbC5vcGVuKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgb25DbG9zZSgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50RWwuZW1wdHkoKTtcbiAgICB9XG59XG5cbmNsYXNzIEdpdFN5bmNTZXR0aW5nVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG4gICAgcGx1Z2luOiBNeVNpbXBsZVBsdWdpbjtcblxuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IE15U2ltcGxlUGx1Z2luKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgcGx1Z2luKTtcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgfVxuXG4gICAgZGlzcGxheSgpIHtcbiAgICAgICAgY29uc3QgeyBjb250YWluZXJFbCB9ID0gdGhpcztcbiAgICAgICAgY29udGFpbmVyRWwuZW1wdHkoKTtcblxuICAgICAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogXCJHaXQgXHU2NTg3XHU3QUUwXHU1NDBDXHU2QjY1XCIgfSk7XG4gICAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwicFwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NTcyOFx1OEZEOVx1OTFDQ1x1OTE0RFx1N0Y2RSBHaXQgXHU0RUQzXHU1RTkzXHU3M0FGXHU1ODgzXHVGRjBDXHU2NTg3XHU3QUUwXHU1MjE3XHU4ODY4XHU0RjFBXHU1NzI4XHUyMDFDR2l0IFx1NjU4N1x1N0FFMFx1MjAxRFx1NjgwN1x1N0I3RVx1OTg3NVx1NEUyRFx1NjYzRVx1NzkzQVx1MzAwMlwiLFxuICAgICAgICAgICAgY2xzOiBcInNldHRpbmctaXRlbS1kZXNjcmlwdGlvblwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiR2l0IFx1NEVEM1x1NUU5M1x1NTczMFx1NTc0MFwiKVxuICAgICAgICAgICAgLnNldERlc2MoXCJcdTY1MkZcdTYzMDEgSFRUUFMgXHU1NDhDIFNTSFx1RkYwQ1x1NEY4Qlx1NTk4MiBnaXRAZ2l0aHViLmNvbTp1c2VyL3JlcG8uZ2l0XCIpXG4gICAgICAgICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgICAgICAgICB0ZXh0XG4gICAgICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcImdpdEBnaXRodWIuY29tOnVzZXIvcmVwby5naXRcIilcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnJlcG9VcmwpXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnJlcG9VcmwgPSB2YWx1ZS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIlNTSCBcdTc5QzFcdTk0QTVcIilcbiAgICAgICAgICAgIC5zZXREZXNjKFwiXHU1M0VGXHU5MDA5XHUzMDAyXHU3NTU5XHU3QTdBXHU2NUY2XHU0RjdGXHU3NTI4XHU3Q0ZCXHU3RURGXHU5RUQ4XHU4QkE0IFNTSCBcdTkxNERcdTdGNkVcdTMwMDJcdTc5QzFcdTk0QTVcdTUzRUFcdTc1MjhcdTRFOEVcdTVGNTNcdTUyNEQgR2l0IFx1NjRDRFx1NEY1Q1x1MzAwMlwiKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKCh0ZXh0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGV4dFxuICAgICAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJcdTdDOThcdThEMzQgU1NIIFx1NzlDMVx1OTRBNVwiKVxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc3NoS2V5KVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zc2hLZXkgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0ZXh0LmlucHV0RWwucm93cyA9IDc7XG4gICAgICAgICAgICAgICAgdGV4dC5pbnB1dEVsLmFkZENsYXNzKFwiZ2l0LXN5bmMtc2V0dGluZ3Mta2V5XCIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIlx1NjU4N1x1N0FFMFx1NEZERFx1NUI1OFx1NzZFRVx1NUY1NVwiKVxuICAgICAgICAgICAgLnNldERlc2MoXCJcdTRFMEJcdThGN0RcdTY1QjBcdTY1ODdcdTdBRTBcdTY1RjZcdTRGN0ZcdTc1MjhcdTc2ODQgVmF1bHQgXHU3NkY4XHU1QkY5XHU4REVGXHU1Rjg0XHVGRjBDXHU0RjhCXHU1OTgyIEdpdFx1NjU4N1x1N0FFMFwiKVxuICAgICAgICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgICAgICAgICAgdGV4dFxuICAgICAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJHaXRcdTY1ODdcdTdBRTBcIilcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnRhcmdldEZvbGRlcilcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudGFyZ2V0Rm9sZGVyID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS50cmltKCkucmVwbGFjZSgvXlxcLyt8XFwvKyQvZywgXCJcIikgfHwgXCJHaXRcdTY1ODdcdTdBRTBcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiXHU2MjUzXHU1RjAwXHU2NTg3XHU3QUUwXHU1MjE3XHU4ODY4XCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIlx1NjI1M1x1NUYwMFx1NEUwMFx1NEUyQVx1NjVCMFx1NzY4NCBPYnNpZGlhbiBcdTY4MDdcdTdCN0VcdTk4NzVcdUZGMENcdTY3RTVcdTc3MEJcdTRFRDNcdTVFOTNcdTRFMkRcdTc2ODRcdTY1ODdcdTdBRTBcdTMwMDJcIilcbiAgICAgICAgICAgIC5hZGRCdXR0b24oKGJ1dHRvbikgPT5cbiAgICAgICAgICAgICAgICBidXR0b24uc2V0QnV0dG9uVGV4dChcIlx1NjI1M1x1NUYwMFwiKS5vbkNsaWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uYWN0aXZhdGVBcnRpY2xlc1ZpZXcoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE15U2ltcGxlUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAgICBzZXR0aW5nczogR2l0U3luY1NldHRpbmdzO1xuICAgIHByaXZhdGUgc2V0dGluZ3NSZWFkeTogUHJvbWlzZTx2b2lkPiB8IG51bGwgPSBudWxsO1xuXG4gICAgLyoqIFx1NEY5QiByZWZyZXNoLnRzIFx1NEY3Rlx1NzUyOFx1RkYwQ1x1OTA3Rlx1NTE0RFx1NUZBQVx1NzNBRlx1NEY5RFx1OEQ1NiAqL1xuICAgIHJlYWRvbmx5IHZpZXdUeXBlQXJ0aWNsZXMgPSBWSUVXX1RZUEVfQVJUSUNMRVM7XG5cbiAgICBhc3luYyBvbmxvYWQoKSB7XG4gICAgICAgIC8vIFx1NTE0OFx1NkNFOFx1NTE4Q1x1ODlDNlx1NTZGRSAvIFx1NTQ3RFx1NEVFNCAvIFx1ODNEQ1x1NTM1NVx1RkYwQ1x1NEZERFx1OEJDMVx1NjNEMlx1NEVGNiBVSSBcdTdBQ0JcdTUzNzNcdTUzRUZcdTc1MjhcbiAgICAgICAgdGhpcy5yZWdpc3RlclZpZXcoXG4gICAgICAgICAgICBWSUVXX1RZUEVfQVJUSUNMRVMsXG4gICAgICAgICAgICAobGVhZikgPT4gbmV3IEdpdEFydGljbGVzVmlldyhsZWFmLCB0aGlzKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgR2l0U3luY1NldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcblxuICAgICAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgICAgICAgaWQ6IFwib3Blbi1naXQtYXJ0aWNsZXNcIixcbiAgICAgICAgICAgIG5hbWU6IFwiXHU2MjUzXHU1RjAwIEdpdCBcdTY1ODdcdTdBRTBcIixcbiAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB0aGlzLmFjdGl2YXRlQXJ0aWNsZXNWaWV3KCksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWRkUmliYm9uSWNvbihcImJvb2stb3BlblwiLCBcIlx1NjI1M1x1NUYwMCBHaXQgXHU2NTg3XHU3QUUwXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlQXJ0aWNsZXNWaWV3KClcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBcdTVGMDJcdTZCNjVcdTUyQTBcdThGN0RcdThCQkVcdTdGNkVcdUZGMENcdTRFMERcdTk2M0JcdTU4NUVcdTYzRDJcdTRFRjZcdTUyQTBcdThGN0RcbiAgICAgICAgdGhpcy5lbnN1cmVTZXR0aW5nc0xvYWRlZCgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiBjb25zb2xlLmxvZyhcIkdpdCBcdTY1ODdcdTdBRTBcdTU0MENcdTZCNjVcdTYzRDJcdTRFRjZcdTVERjJcdTUyQTBcdThGN0RcIikpXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihcIlx1NTJBMFx1OEY3RCBHaXQgXHU2NTg3XHU3QUUwXHU1NDBDXHU2QjY1XHU4QkJFXHU3RjZFXHU1OTMxXHU4RDI1XHVGRjFBXCIsIGVycikpO1xuICAgIH1cblxuICAgIGFzeW5jIGVuc3VyZVNldHRpbmdzTG9hZGVkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncykgcmV0dXJuO1xuICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3NSZWFkeSkge1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5nc1JlYWR5ID0gdGhpcy5sb2FkU2V0dGluZ3MoKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLnNldHRpbmdzUmVhZHk7XG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZFNldHRpbmdzKCkge1xuICAgICAgICB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9TRVRUSU5HUywgYXdhaXQgdGhpcy5sb2FkRGF0YSgpKTtcbiAgICB9XG5cbiAgICBhc3luYyBzYXZlU2V0dGluZ3MoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XG4gICAgfVxuXG4gICAgYXN5bmMgYWN0aXZhdGVBcnRpY2xlc1ZpZXcoKSB7XG4gICAgICAgIGNvbnN0IHsgd29ya3NwYWNlIH0gPSB0aGlzLmFwcDtcbiAgICAgICAgbGV0IGxlYWYgPSB3b3Jrc3BhY2UuZ2V0TGVhdmVzT2ZUeXBlKFZJRVdfVFlQRV9BUlRJQ0xFUylbMF07XG5cbiAgICAgICAgaWYgKCFsZWFmKSB7XG4gICAgICAgICAgICBsZWFmID0gd29ya3NwYWNlLmdldExlYWYoXCJ0YWJcIik7XG4gICAgICAgICAgICBhd2FpdCBsZWFmLnNldFZpZXdTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogVklFV19UWVBFX0FSVElDTEVTLFxuICAgICAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgd29ya3NwYWNlLnJldmVhbExlYWYobGVhZik7XG4gICAgfVxuXG4gICAgYXN5bmMgY2xvbmVUb1RlbXAoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5lbnN1cmVTZXR0aW5nc0xvYWRlZCgpO1xuXG4gICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5yZXBvVXJsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdThCRjdcdTUxNDhcdTU3MjhcdThCQkVcdTdGNkVcdTRFMkRcdTU4NkJcdTUxOTkgR2l0IFx1NEVEM1x1NUU5M1x1NTczMFx1NTc0MFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRlbXBEaXIgPSBwYXRoLmpvaW4oXG4gICAgICAgICAgICBvcy50bXBkaXIoKSxcbiAgICAgICAgICAgIGBvYnNpZGlhbi1naXQtYXJ0aWNsZXMtJHtEYXRlLm5vdygpfWBcbiAgICAgICAgKTtcblxuICAgICAgICBsZXQgdGVtcEtleVBhdGg6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBnaXQgPSBzaW1wbGVHaXQoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc3NoS2V5LnRyaW0oKSkge1xuICAgICAgICAgICAgICAgIHRlbXBLZXlQYXRoID0gcGF0aC5qb2luKFxuICAgICAgICAgICAgICAgICAgICBvcy50bXBkaXIoKSxcbiAgICAgICAgICAgICAgICAgICAgYG9ic2lkaWFuLWdpdC1rZXktJHtEYXRlLm5vdygpfWBcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgYXdhaXQgZnNwLndyaXRlRmlsZShcbiAgICAgICAgICAgICAgICAgICAgdGVtcEtleVBhdGgsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3Muc3NoS2V5LnRyaW0oKSArIFwiXFxuXCIsXG4gICAgICAgICAgICAgICAgICAgIHsgbW9kZTogMG82MDAgfVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBnaXQuZW52KHtcbiAgICAgICAgICAgICAgICAgICAgLi4ucHJvY2Vzcy5lbnYsXG4gICAgICAgICAgICAgICAgICAgIEdJVF9TU0hfQ09NTUFORDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGBzc2ggLWkgXCIke3RlbXBLZXlQYXRofVwiIC1vIFN0cmljdEhvc3RLZXlDaGVja2luZz1ubyAtbyBVc2VyS25vd25Ib3N0c0ZpbGU9L2Rldi9udWxsYCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXdhaXQgZ2l0LmNsb25lKHRoaXMuc2V0dGluZ3MucmVwb1VybCwgdGVtcERpciwgW1xuICAgICAgICAgICAgICAgIFwiLS1kZXB0aFwiLFxuICAgICAgICAgICAgICAgIFwiMVwiLFxuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0ZW1wRGlyO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5yZW1vdmVUZW1wRGlyKHRlbXBEaXIpO1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBpZiAodGVtcEtleVBhdGgpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBmc3AudW5saW5rKHRlbXBLZXlQYXRoKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gXHU1RkZEXHU3NTY1XHU0RTM0XHU2NUY2XHU1QkM2XHU5NEE1XHU2RTA1XHU3NDA2XHU1OTMxXHU4RDI1XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0UmVtb3RlQXJ0aWNsZXMocmVwb0Rpcjogc3RyaW5nKTogUHJvbWlzZTxSZW1vdGVBcnRpY2xlW10+IHtcbiAgICAgICAgY29uc3QgYXJ0aWNsZXM6IFJlbW90ZUFydGljbGVbXSA9IFtdO1xuXG4gICAgICAgIGNvbnN0IHdhbGsgPSBhc3luYyAoY3VycmVudERpcjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbnRyaWVzID0gYXdhaXQgZnNwLnJlYWRkaXIoY3VycmVudERpciwge1xuICAgICAgICAgICAgICAgIHdpdGhGaWxlVHlwZXM6IHRydWUsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5Lm5hbWUgPT09IFwiLmdpdFwiKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGFic29sdXRlUGF0aCA9IHBhdGguam9pbihjdXJyZW50RGlyLCBlbnRyeS5uYW1lKTtcblxuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHdhbGsoYWJzb2x1dGVQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAhZW50cnkuaXNGaWxlKCkgfHxcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5leHRuYW1lKGVudHJ5Lm5hbWUpLnRvTG93ZXJDYXNlKCkgIT09IFwiLm1kXCJcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gcGF0aFxuICAgICAgICAgICAgICAgICAgICAucmVsYXRpdmUocmVwb0RpciwgYWJzb2x1dGVQYXRoKVxuICAgICAgICAgICAgICAgICAgICAuc3BsaXQocGF0aC5zZXApXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKFwiL1wiKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IFtjb250ZW50LCBzdGF0XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICAgICAgZnNwLnJlYWRGaWxlKGFic29sdXRlUGF0aCwgXCJ1dGY4XCIpLFxuICAgICAgICAgICAgICAgICAgICBmc3Auc3RhdChhYnNvbHV0ZVBhdGgpLFxuICAgICAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICAgICAgYXJ0aWNsZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBwYXRoLmJhc2VuYW1lKGVudHJ5Lm5hbWUsIHBhdGguZXh0bmFtZShlbnRyeS5uYW1lKSksXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgYWJzb2x1dGVQYXRoLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LFxuICAgICAgICAgICAgICAgICAgICBzaXplOiBzdGF0LnNpemUsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBcdTZCQ0ZcdTU5MDRcdTc0MDZcdTRFMDBcdTYyNzlcdThCQTlcdTUxRkFcdTRFOEJcdTRFRjZcdTVGQUFcdTczQUZcdUZGMENcdTkwN0ZcdTUxNERcdTk1N0ZcdTRFRkJcdTUyQTFcdTk2M0JcdTU4NUUgVUlcbiAgICAgICAgICAgICAgICBpZiAoYXJ0aWNsZXMubGVuZ3RoICUgNTAgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHIpID0+IHNldFRpbWVvdXQociwgMCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBhd2FpdCB3YWxrKHJlcG9EaXIpO1xuXG4gICAgICAgIHJldHVybiBhcnRpY2xlcy5zb3J0KChhLCBiKSA9PlxuICAgICAgICAgICAgYS50aXRsZS5sb2NhbGVDb21wYXJlKGIudGl0bGUsIFwiemgtQ05cIilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRSZW1vdGVGb2xkZXJzKCk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICAgICAgY29uc3QgdGVtcERpciA9IGF3YWl0IHRoaXMuY2xvbmVUb1RlbXAoKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZm9sZGVycyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gICAgICAgICAgICBjb25zdCB3YWxrID0gYXN5bmMgKFxuICAgICAgICAgICAgICAgIGN1cnJlbnREaXI6IHN0cmluZyxcbiAgICAgICAgICAgICAgICByZWxhdGl2ZUJhc2UgPSBcIlwiXG4gICAgICAgICAgICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbnRyaWVzID0gYXdhaXQgZnNwLnJlYWRkaXIoY3VycmVudERpciwge1xuICAgICAgICAgICAgICAgICAgICB3aXRoRmlsZVR5cGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5uYW1lID09PSBcIi5naXRcIikgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWJzb2x1dGVQYXRoID0gcGF0aC5qb2luKGN1cnJlbnREaXIsIGVudHJ5Lm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWxhdGl2ZVBhdGggPSByZWxhdGl2ZUJhc2VcbiAgICAgICAgICAgICAgICAgICAgICAgID8gcGF0aC5qb2luKHJlbGF0aXZlQmFzZSwgZW50cnkubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZW50cnkubmFtZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9sZGVycy5hZGQocmVsYXRpdmVQYXRoLnNwbGl0KHBhdGguc2VwKS5qb2luKFwiL1wiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB3YWxrKGFic29sdXRlUGF0aCwgcmVsYXRpdmVQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGF3YWl0IHdhbGsodGVtcERpcik7XG5cbiAgICAgICAgICAgIHJldHVybiBBcnJheS5mcm9tKGZvbGRlcnMpLnNvcnQoKGEsIGIpID0+XG4gICAgICAgICAgICAgICAgYS5sb2NhbGVDb21wYXJlKGIsIFwiemgtQ05cIilcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnJlbW92ZVRlbXBEaXIodGVtcERpcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyByZW1vdmVUZW1wRGlyKGRpcjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmICghZGlyKSByZXR1cm47XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IGZzcC5ybShkaXIsIHsgcmVjdXJzaXZlOiB0cnVlLCBmb3JjZTogdHJ1ZSB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlx1NkUwNVx1NzQwNiBHaXQgXHU0RTM0XHU2NUY2XHU3NkVFXHU1RjU1XHU1OTMxXHU4RDI1XHVGRjFBXCIsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9udW5sb2FkKCkge1xuICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2UuZGV0YWNoTGVhdmVzT2ZUeXBlKFZJRVdfVFlQRV9BUlRJQ0xFUyk7XG4gICAgfVxufSIsICIvKipcbiAqIFdyYXBzIG9uZSBvciBtb3JlIGZpbGUgcGF0aHMgaW4gYW4gb2JqZWN0IHRoYXQgYHBhcnNlQ2xpYCByZWNvZ25pc2VzIGFzXG4gKiBleHBsaWNpdCBwYXRoc3BlY3MsIHJvdXRpbmcgdGhlbSB0byBgUGFyc2VkQ0xJLnBhdGhzYCByZWdhcmRsZXNzIG9mIHdoZXRoZXJcbiAqIGEgYC0tYCBzZXBhcmF0b3IgdG9rZW4gaXMgcHJlc2VudC5cbiAqL1xuXG4vLyBiaW9tZS1pZ25vcmUgbGludC9jb21wbGV4aXR5L25vQmFubmVkVHlwZXM6IDxVc2VzIFN0cmluZyBvYmplY3QgdG8gc2F0aXNmeSBXZWFrTWFwIHJlcXVpcmVtZXRuPlxuY29uc3QgY2FjaGUgPSBuZXcgV2Vha01hcDxTdHJpbmcsIHN0cmluZ1tdPigpO1xuXG5leHBvcnQgZnVuY3Rpb24gcGF0aHNwZWMoLi4ucGF0aHM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgIGNvbnN0IGtleSA9IG5ldyBTdHJpbmcocGF0aHMpO1xuICAgY2FjaGUuc2V0KGtleSwgcGF0aHMpO1xuICAgcmV0dXJuIGtleSBhcyBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1BhdGhTcGVjKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcbiAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZyAmJiBjYWNoZS5oYXModmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9QYXRocyh2YWx1ZTogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgcmV0dXJuIGNhY2hlLmdldCh2YWx1ZSkgPz8gW107XG59XG4iLCAiZXhwb3J0IGludGVyZmFjZSBGbGFnIHtcbiAgIG5hbWU6IHN0cmluZztcbiAgIHZhbHVlPzogc3RyaW5nO1xuICAgLyoqIFZhbHVlIGNhbWUgZnJvbSB0aGUgbmV4dCB0b2tlbiByYXRoZXIgdGhhbiBiZWluZyBlbWJlZGRlZCBhZnRlciBgPWAuICovXG4gICBhYnNvcmJlZE5leHQ6IGJvb2xlYW47XG4gICAvKiogU3dpdGNoIGFwcGVhcmVkIGJlZm9yZSB0aGUgZ2l0IHN1Yi1jb21tYW5kLiAqL1xuICAgaXNHbG9iYWw6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiogc2NvcGVkRmxhZ3MoZmxhZ3M6IEZsYWdbXSwgc2NvcGU6ICdnbG9iYWwnIHwgJ3Rhc2snKSB7XG4gICBjb25zdCBmaW5kR2xvYmFsID0gc2NvcGUgPT09ICdnbG9iYWwnO1xuICAgZm9yIChjb25zdCBmbGFnIG9mIGZsYWdzKSB7XG4gICAgICBpZiAoZmxhZy5pc0dsb2JhbCA9PT0gZmluZEdsb2JhbCkge1xuICAgICAgICAgeWllbGQgZmxhZztcbiAgICAgIH1cbiAgIH1cbn1cbiIsICIvLyBGbGFncyB0aGF0IHVuYW1iaWd1b3VzbHkgc2lnbmFsIGEgd3JpdGUgb3BlcmF0aW9uIG9uIGdpdCBjb25maWcuXG5leHBvcnQgY29uc3QgQ09ORklHX1dSSVRFX0ZMQUdTID0gbmV3IFNldChbXG4gICAnLS1hZGQnLFxuICAgJy0tZWRpdCcsXG4gICAnLS1yZW1vdmUtc2VjdGlvbicsXG4gICAnLS1yZW5hbWUtc2VjdGlvbicsXG4gICAnLS1yZXBsYWNlLWFsbCcsXG4gICAnLS11bnNldCcsXG4gICAnLS11bnNldC1hbGwnLFxuICAgJy1lJyxcbl0pO1xuXG4vLyBGbGFncyB0aGF0IHVuYW1iaWd1b3VzbHkgc2lnbmFsIGEgcmVhZCBvcGVyYXRpb24uXG5leHBvcnQgY29uc3QgQ09ORklHX1JFQURfRkxBR1MgPSBuZXcgU2V0KFtcbiAgICctLWdldCcsXG4gICAnLS1nZXQtYWxsJyxcbiAgICctLWdldC1jb2xvcicsXG4gICAnLS1nZXQtY29sb3Jib29sJyxcbiAgICctLWdldC1yZWdleHAnLFxuICAgJy0tZ2V0LXVybG1hdGNoJyxcbiAgICctLWxpc3QnLFxuICAgJy1sJyxcbl0pO1xuXG4vLyBTdWItY29tbWFuZCB2ZXJicyBhY2NlcHRlZCBhcyB0aGUgZmlyc3QgcG9zaXRpb25hbCBieSBuZXdlciBnaXQgdmVyc2lvbnMuXG5leHBvcnQgY29uc3QgQ09ORklHX1dSSVRFX1ZFUkJTID0gbmV3IFNldChbXG4gICAnZWRpdCcsXG4gICAncmVtb3ZlLXNlY3Rpb24nLFxuICAgJ3JlbmFtZS1zZWN0aW9uJyxcbiAgICdzZXQnLFxuICAgJ3Vuc2V0Jyxcbl0pO1xuZXhwb3J0IGNvbnN0IENPTkZJR19SRUFEX1ZFUkJTID0gbmV3IFNldChbJ2dldCcsICdnZXQtY29sb3InLCAnZ2V0LWNvbG9yYm9vbCcsICdsaXN0J10pO1xuIiwgImltcG9ydCB0eXBlIHsgQ29uZmlnU2NvcGUgfSBmcm9tICcuLi9hcmdzL3BhcnNlLWFyZ3YudHlwZXMnO1xuaW1wb3J0IHsgdHlwZSBGbGFnLCBzY29wZWRGbGFncyB9IGZyb20gJy4uL2ZsYWdzL2ZsYWdzLmhlbHBlcnMnO1xuaW1wb3J0IHR5cGUgeyBDb25maWdPcGVyYXRpb24gfSBmcm9tICcuL2NvbmZpZy50eXBlcyc7XG5pbXBvcnQge1xuICAgQ09ORklHX1JFQURfRkxBR1MsXG4gICBDT05GSUdfUkVBRF9WRVJCUyxcbiAgIENPTkZJR19XUklURV9GTEFHUyxcbiAgIENPTkZJR19XUklURV9WRVJCUyxcbn0gZnJvbSAnLi9jb25maWctb3BlcmFuZHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0Q29uZmlnQWN0aW9uKGZsYWdzOiBGbGFnW10sIHBvc2l0aW9uYWxzOiBzdHJpbmdbXSk6IENvbmZpZ09wZXJhdGlvbiB8IG51bGwge1xuICAgZm9yIChjb25zdCB7IG5hbWUgfSBvZiBzY29wZWRGbGFncyhmbGFncywgJ3Rhc2snKSkge1xuICAgICAgaWYgKENPTkZJR19XUklURV9GTEFHUy5oYXMobmFtZSkpIHtcbiAgICAgICAgIHJldHVybiBjb25maWdPcGVyYXRpb24odHJ1ZSwgcG9zaXRpb25hbHMpO1xuICAgICAgfVxuICAgICAgaWYgKENPTkZJR19SRUFEX0ZMQUdTLmhhcyhuYW1lKSkge1xuICAgICAgICAgcmV0dXJuIGNvbmZpZ09wZXJhdGlvbihmYWxzZSwgcG9zaXRpb25hbHMpO1xuICAgICAgfVxuICAgfVxuXG4gICBjb25zdCB2ZXJiID0gcG9zaXRpb25hbHMuYXQoMCk/LnRvTG93ZXJDYXNlKCk7XG5cbiAgIGlmICh2ZXJiID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgfVxuXG4gICBpZiAoQ09ORklHX1dSSVRFX1ZFUkJTLmhhcyh2ZXJiKSkge1xuICAgICAgcmV0dXJuIGNvbmZpZ09wZXJhdGlvbih0cnVlLCBwb3NpdGlvbmFscy5zbGljZSgxKSk7XG4gICB9XG5cbiAgIGlmIChDT05GSUdfUkVBRF9WRVJCUy5oYXModmVyYikpIHtcbiAgICAgIHJldHVybiBjb25maWdPcGVyYXRpb24oZmFsc2UsIHBvc2l0aW9uYWxzLnNsaWNlKDEpKTtcbiAgIH1cblxuICAgaWYgKHBvc2l0aW9uYWxzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIGNvbmZpZ09wZXJhdGlvbihmYWxzZSwgcG9zaXRpb25hbHMpO1xuICAgfVxuXG4gICByZXR1cm4gY29uZmlnT3BlcmF0aW9uKHRydWUsIHBvc2l0aW9uYWxzKTtcbn1cblxuZnVuY3Rpb24gY29uZmlnT3BlcmF0aW9uKGlzV3JpdGUgPSBmYWxzZSwgcG9zaXRpb25hbHM6IHN0cmluZ1tdID0gW10pOiBDb25maWdPcGVyYXRpb24gfCBudWxsIHtcbiAgIGNvbnN0IGtleSA9IHBvc2l0aW9uYWxzLmF0KDApPy50b0xvd2VyQ2FzZSgpO1xuXG4gICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgfVxuXG4gICByZXR1cm4ge1xuICAgICAgaXNXcml0ZSxcbiAgICAgIGlzUmVhZDogIWlzV3JpdGUsXG4gICAgICBrZXksXG4gICAgICB2YWx1ZTogcG9zaXRpb25hbHMuYXQoMSksXG4gICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9PcGVyYXRpb24oc2NvcGU6IENvbmZpZ1Njb3BlLCBvcGVyYXRpb246IENvbmZpZ09wZXJhdGlvbikge1xuICAgaWYgKG9wZXJhdGlvbi5pc1dyaXRlICYmIG9wZXJhdGlvbi52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4geyBrZXk6IG9wZXJhdGlvbi5rZXksIHZhbHVlOiBvcGVyYXRpb24udmFsdWUsIHNjb3BlIH07XG4gICB9XG4gICByZXR1cm4geyBrZXk6IG9wZXJhdGlvbi5rZXksIHNjb3BlIH07XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBDb25maWdTY29wZSwgQ29uZmlnV3JpdGUsIFBhcnNlZENvbmZpZ0FjdGl2aXR5IH0gZnJvbSAnLi4vYXJncy9wYXJzZS1hcmd2LnR5cGVzJztcbmltcG9ydCB7IHR5cGUgRmxhZywgc2NvcGVkRmxhZ3MgfSBmcm9tICcuLi9mbGFncy9mbGFncy5oZWxwZXJzJztcbmltcG9ydCB0eXBlIHsgQ29uZmlnT3BlcmF0aW9uIH0gZnJvbSAnLi9jb25maWcudHlwZXMnO1xuaW1wb3J0IHsgZGV0ZWN0Q29uZmlnQWN0aW9uLCB0b09wZXJhdGlvbiB9IGZyb20gJy4vZGV0ZWN0LWNvbmZpZy1hY3Rpb24nO1xuXG5mdW5jdGlvbiBwYXJzZUFzc2lnbm1lbnQocmF3OiBzdHJpbmcgfCB1bmRlZmluZWQpOiB7IGtleTogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH0gfCBudWxsIHtcbiAgIGNvbnN0IGVxID0gcmF3Py5pbmRleE9mKCc9JykgfHwgLTE7XG5cbiAgIGlmICghcmF3IHx8IGVxIDwgMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICB9XG5cbiAgIHJldHVybiB7XG4gICAgICBrZXk6IHJhdy5zbGljZSgwLCBlcSkudHJpbSgpLnRvTG93ZXJDYXNlKCksXG4gICAgICB2YWx1ZTogcmF3LnNsaWNlKGVxICsgMSksXG4gICB9O1xufVxuXG5mdW5jdGlvbiBkZXRlY3RDb25maWdTY29wZShmbGFnczogRmxhZ1tdKTogQ29uZmlnU2NvcGUge1xuICAgZm9yIChjb25zdCB7IG5hbWUgfSBvZiBzY29wZWRGbGFncyhmbGFncywgJ3Rhc2snKSkge1xuICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICBjYXNlICctLWdsb2JhbCc6XG4gICAgICAgICAgICByZXR1cm4gJ2dsb2JhbCc7XG4gICAgICAgICBjYXNlICctLXN5c3RlbSc6XG4gICAgICAgICAgICByZXR1cm4gJ3N5c3RlbSc7XG4gICAgICAgICBjYXNlICctLXdvcmt0cmVlJzpcbiAgICAgICAgICAgIHJldHVybiAnd29ya3RyZWUnO1xuICAgICAgICAgY2FzZSAnLS1sb2NhbCc6XG4gICAgICAgICAgICByZXR1cm4gJ2xvY2FsJztcbiAgICAgICAgIGNhc2UgJy0tZmlsZSc6XG4gICAgICAgICBjYXNlICctZic6XG4gICAgICAgICAgICByZXR1cm4gJ2ZpbGUnO1xuICAgICAgfVxuICAgfVxuICAgcmV0dXJuICdsb2NhbCc7XG59XG5cbmZ1bmN0aW9uIGRldGVjdENvbmZpZ092ZXJyaWRlU2NvcGUoeyBuYW1lIH06IEZsYWcpOiBDb25maWdTY29wZSB8IHZvaWQge1xuICAgaWYgKG5hbWUgPT09ICctYycgfHwgbmFtZSA9PT0gJy0tY29uZmlnJykge1xuICAgICAgcmV0dXJuICdpbmxpbmUnO1xuICAgfVxuICAgaWYgKG5hbWUgPT09ICctLWNvbmZpZy1lbnYnKSB7XG4gICAgICByZXR1cm4gJ2Vudic7XG4gICB9XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIHRoZSBzdHJlYW0gb2YgQ29uZmlnV3JpdGUgc2V0dGluZ3MgZm91bmQgaW4gdGhlIHN1cHBsaWVkIGZsYWdzLFxuICogdHJpZ2dlcmVkIGJ5IGAtY2AgYW5kIGAtLWNvbmZpZ2AgZm9yIGlubGluZSBjb25maWd1cmF0aW9uIGFuZCBgLS1jb25maWctZW52YFxuICogdG8gc2V0IGEgY29uZmlnIHNldHRpbmcgYmFzZWQgb24gZW52aXJvbm1lbnQgdmFyaWFibGUuXG4gKi9cbmZ1bmN0aW9uKiBjb2xsZWN0V3JpdGVGbGFncyhmbGFnczogRmxhZ1tdKTogR2VuZXJhdG9yPENvbmZpZ1dyaXRlPiB7XG4gICBmb3IgKGNvbnN0IGZsYWcgb2YgZmxhZ3MpIHtcbiAgICAgIGNvbnN0IHNjb3BlID0gZGV0ZWN0Q29uZmlnT3ZlcnJpZGVTY29wZShmbGFnKTtcbiAgICAgIGNvbnN0IGFzc2lnbm1lbnQgPSBzY29wZSAmJiBwYXJzZUFzc2lnbm1lbnQoZmxhZy52YWx1ZSk7XG5cbiAgICAgIGlmIChhc3NpZ25tZW50KSB7XG4gICAgICAgICB5aWVsZCB7XG4gICAgICAgICAgICAuLi5hc3NpZ25tZW50LFxuICAgICAgICAgICAgc2NvcGUsXG4gICAgICAgICB9O1xuICAgICAgfVxuICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sbGVjdENvbmZpZ0FjY2VzcyhcbiAgIHRhc2s6IHN0cmluZyB8IG51bGwsXG4gICBmbGFnczogRmxhZ1tdLFxuICAgcG9zaXRpb25hbHM6IHN0cmluZ1tdXG4pOiBQYXJzZWRDb25maWdBY3Rpdml0eSB7XG4gICBjb25zdCBwYXJzZWRDb25maWc6IFBhcnNlZENvbmZpZ0FjdGl2aXR5ID0ge1xuICAgICAgcmVhZDogW10sXG4gICAgICB3cml0ZTogWy4uLmNvbGxlY3RXcml0ZUZsYWdzKGZsYWdzKV0sXG4gICB9O1xuXG4gICBpZiAodGFzayA9PT0gJ2NvbmZpZycpIHtcbiAgICAgIGFwcGVuZFBhcnNlZENvbmZpZ0FjdGlvbihcbiAgICAgICAgIHBhcnNlZENvbmZpZyxcbiAgICAgICAgIGRldGVjdENvbmZpZ1Njb3BlKGZsYWdzKSxcbiAgICAgICAgIGRldGVjdENvbmZpZ0FjdGlvbihmbGFncywgcG9zaXRpb25hbHMpXG4gICAgICApO1xuICAgfVxuXG4gICByZXR1cm4gcGFyc2VkQ29uZmlnO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRQYXJzZWRDb25maWdBY3Rpb24oXG4gICBwYXJzZWRDb25maWc6IFBhcnNlZENvbmZpZ0FjdGl2aXR5LFxuICAgc2NvcGU6IENvbmZpZ1Njb3BlLFxuICAgYWN0aW9uOiBDb25maWdPcGVyYXRpb24gfCBudWxsXG4pIHtcbiAgIGlmIChhY3Rpb24gPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgIH1cblxuICAgY29uc3QgY29uZmlnID0gdG9PcGVyYXRpb24oc2NvcGUsIGFjdGlvbik7XG4gICBpZiAoYWN0aW9uLmlzV3JpdGUpIHtcbiAgICAgIHBhcnNlZENvbmZpZy53cml0ZS5wdXNoKGNvbmZpZyk7XG4gICB9IGVsc2Uge1xuICAgICAgcGFyc2VkQ29uZmlnLnJlYWQucHVzaChjb25maWcpO1xuICAgfVxufVxuIiwgIi8vIOKUgOKUgCBPcHRpb24gdGFibGVzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuLy9cbi8vIEVhY2ggc2NvcGUgaGFzOlxuLy8gICBzaG9ydCAg4oCTIE1hcDxjaGFyLCBjb25zdW1lc05leHQ+ICAoa25vd24gc2luZ2xlLWxldHRlciBzd2l0Y2hlczsgdHJ1ZSA9IHRha2VzIG5leHQgdG9rZW4pXG4vLyAgIGxvbmcgICDigJMgU2V0PHN0ZW0+ICAgICAgICAgICAgICAgIChsb25nIHN3aXRjaCBzdGVtcywgd2l0aG91dCAtLSwgdGhhdCB0YWtlIHRoZSBuZXh0IHRva2VuKVxuLy9cbi8vIE9ubHkgc3dpdGNoZXMgbGlzdGVkIGhlcmUgYXJlIFwia25vd25cIi4gQW4gdW5rbm93biBjaGFyIGFueXdoZXJlIGluIGEgY29tYmluZWRcbi8vIGNsdXN0ZXIgY2F1c2VzIHRoZSBlbnRpcmUgY2x1c3RlciB0byBiZSBrZXB0IGFzIG9uZSBvcGFxdWUgdG9rZW4uXG5cbmV4cG9ydCBpbnRlcmZhY2UgRmxhZ1NwZWMge1xuICAgcmVhZG9ubHkgc2hvcnQ6IFJlYWRvbmx5TWFwPHN0cmluZywgYm9vbGVhbj47XG4gICByZWFkb25seSBsb25nOiBSZWFkb25seVNldDxzdHJpbmc+O1xufVxuXG5jb25zdCBVTklWRVJTQUw6IEZsYWdTcGVjID0ge1xuICAgc2hvcnQ6IG5ldyBNYXAoW1xuICAgICAgWydjJywgdHJ1ZV0sIC8vICAtYyA8az12PiAgICBzZXQgY29uZmlnIGtleSBmb3IgdGhpcyBpbnZvY2F0aW9uXG4gICBdKSxcbiAgIGxvbmc6IG5ldyBTZXQoKSxcbn07XG5cbmV4cG9ydCBjb25zdCBHTE9CQUw6IEZsYWdTcGVjID0ge1xuICAgc2hvcnQ6IG5ldyBNYXAoW1xuICAgICAgWydDJywgdHJ1ZV0sIC8vICAtQyA8cGF0aD4gICBjaGFuZ2Ugd29ya2luZyBkaXJlY3RvcnlcbiAgICAgIFsnUCcsIGZhbHNlXSwgLy8gLVAgICAgICAgICAgbm8gcGFnZXIgKGFsaWFzIGZvciAtLW5vLXBhZ2VyKVxuICAgICAgWydoJywgZmFsc2VdLCAvLyAtaCAgICAgICAgICBoZWxwXG4gICAgICBbJ3AnLCBmYWxzZV0sIC8vIC1wICAgICAgICAgIHBhZ2luYXRlXG4gICAgICBbJ3YnLCBmYWxzZV0sIC8vIC12ICAgICAgICAgIHZlcnNpb25cbiAgICAgIC4uLlVOSVZFUlNBTC5zaG9ydC5lbnRyaWVzKCksXG4gICBdKSxcbiAgIGxvbmc6IG5ldyBTZXQoW1xuICAgICAgJ2F0dHItc291cmNlJyxcbiAgICAgICdjb25maWctZW52JyxcbiAgICAgICdleGVjLXBhdGgnLFxuICAgICAgJ2dpdC1kaXInLFxuICAgICAgJ2xpc3QtY21kcycsXG4gICAgICAnbmFtZXNwYWNlJyxcbiAgICAgICdzdXBlci1wcmVmaXgnLFxuICAgICAgJ3dvcmstdHJlZScsXG4gICBdKSxcbn07XG5cbmNvbnN0IENPTU1BTkRTOiBSZWNvcmQ8c3RyaW5nLCBGbGFnU3BlYz4gPSB7XG4gICBjbG9uZToge1xuICAgICAgc2hvcnQ6IG5ldyBNYXAoW1xuICAgICAgICAgWydiJywgdHJ1ZV0sIC8vIC1iIDxicmFuY2g+XG4gICAgICAgICBbJ2onLCB0cnVlXSwgLy8gLWogPG4+ICAgICAgICAgIHBhcmFsbGVsIGpvYnNcbiAgICAgICAgIFsnbCcsIGZhbHNlXSwgLy8gLWwgbG9jYWxcbiAgICAgICAgIFsnbicsIGZhbHNlXSwgLy8gLW4gbm8tY2hlY2tvdXRcbiAgICAgICAgIFsnbycsIHRydWVdLCAvLyAtbyA8bmFtZT4gICAgICAgcmVtb3RlIG5hbWVcbiAgICAgICAgIFsncScsIGZhbHNlXSwgLy8gLXEgcXVpZXRcbiAgICAgICAgIFsncycsIGZhbHNlXSwgLy8gLXMgc2hhcmVkXG4gICAgICAgICBbJ3UnLCB0cnVlXSwgLy8gLXUgPHVwbG9hZC1wYWNrPlxuICAgICAgXSksXG4gICAgICBsb25nOiBuZXcgU2V0KFsnYnJhbmNoJywgJ2NvbmZpZycsICdqb2JzJywgJ29yaWdpbicsICd1cGxvYWQtcGFjaycsICd1JywgJ3RlbXBsYXRlJ10pLFxuICAgfSxcbiAgIGNvbW1pdDoge1xuICAgICAgc2hvcnQ6IG5ldyBNYXAoW1xuICAgICAgICAgWydDJywgdHJ1ZV0sIC8vIC1DIDxjb21taXQ+ICByZXVzZSBtZXNzYWdlXG4gICAgICAgICBbJ0YnLCB0cnVlXSwgLy8gLUYgPGZpbGU+ICAgIHJlYWQgbWVzc2FnZSBmcm9tIGZpbGVcbiAgICAgICAgIFsnYycsIHRydWVdLCAvLyAtYyA8Y29tbWl0PiAgcmVlZGl0IG1lc3NhZ2VcbiAgICAgICAgIFsnbScsIHRydWVdLCAvLyAtbSA8bXNnPlxuICAgICAgICAgWyd0JywgdHJ1ZV0sIC8vIC10IDx0ZW1wbGF0ZT5cbiAgICAgIF0pLFxuICAgICAgbG9uZzogbmV3IFNldChbJ2ZpbGUnLCAnbWVzc2FnZScsICdyZWVkaXQtbWVzc2FnZScsICdyZXVzZS1tZXNzYWdlJywgJ3RlbXBsYXRlJ10pLFxuICAgfSxcbiAgIGNvbmZpZzoge1xuICAgICAgc2hvcnQ6IG5ldyBNYXAoW1xuICAgICAgICAgWydlJywgZmFsc2VdLCAvLyAtZSAgb3BlbiBlZGl0b3JcbiAgICAgICAgIFsnZicsIHRydWVdLCAvLyAgLWYgPGZpbGU+XG4gICAgICAgICBbJ2wnLCBmYWxzZV0sIC8vIC1sICBsaXN0XG4gICAgICBdKSxcbiAgICAgIGxvbmc6IG5ldyBTZXQoWydibG9iJywgJ2NvbW1lbnQnLCAnZGVmYXVsdCcsICdmaWxlJywgJ3R5cGUnLCAndmFsdWUnXSksXG4gICB9LFxuICAgZmV0Y2g6IHtcbiAgICAgIHNob3J0OiBuZXcgTWFwKCksXG4gICAgICBsb25nOiBuZXcgU2V0KFsndXBsb2FkLXBhY2snXSksXG4gICB9LFxuICAgaW5pdDoge1xuICAgICAgc2hvcnQ6IG5ldyBNYXAoKSxcbiAgICAgIGxvbmc6IG5ldyBTZXQoWyd0ZW1wbGF0ZSddKSxcbiAgIH0sXG4gICBwdWxsOiB7XG4gICAgICBzaG9ydDogbmV3IE1hcCgpLFxuICAgICAgbG9uZzogbmV3IFNldChbJ3VwbG9hZC1wYWNrJ10pLFxuICAgfSxcbiAgIHB1c2g6IHtcbiAgICAgIHNob3J0OiBuZXcgTWFwKCksXG4gICAgICBsb25nOiBuZXcgU2V0KFsnZXhlYycsICdyZWNlaXZlLXBhY2snXSksXG4gICB9LFxuICAgcmViYXNlOiB7XG4gICAgICBzaG9ydDogbmV3IE1hcChbXG4gICAgICAgICBbJ1gnLCB0cnVlXSwgLy8gLVggPG9wdGlvbj4gICBzdHJhdGVneSBvcHRpb25cbiAgICAgICAgIFsnZicsIGZhbHNlXSwgLy8gLWYgZm9yY2UtcmViYXNlXG4gICAgICAgICBbJ2knLCBmYWxzZV0sIC8vIC1pIGludGVyYWN0aXZlXG4gICAgICAgICBbJ2snLCBmYWxzZV0sIC8vIC1rIGtlZXAtYmFzZVxuICAgICAgICAgWydtJywgZmFsc2VdLCAvLyAtbSBtZXJnZVxuICAgICAgICAgWyduJywgZmFsc2VdLCAvLyAtbiBuby1zdGF0XG4gICAgICAgICBbJ3EnLCBmYWxzZV0sIC8vIC1xIHF1aWV0XG4gICAgICAgICBbJ3InLCBmYWxzZV0sIC8vIC1yIHJlYmFzZS1tZXJnZXNcbiAgICAgICAgIFsncycsIHRydWVdLCAvLyAtcyA8c3RyYXRlZ3k+XG4gICAgICAgICBbJ3YnLCBmYWxzZV0sIC8vIC12IHZlcmJvc2VcbiAgICAgICAgIFsneCcsIHRydWVdLCAvLyAteCA8Y21kPiAgICAgIGV4ZWNcbiAgICAgIF0pLFxuICAgICAgbG9uZzogbmV3IFNldChbJ2V4ZWMnLCAnb250bycsICdzdHJhdGVneScsICdzdHJhdGVneS1vcHRpb24nXSksXG4gICB9LFxufTtcblxuY29uc3QgRU1QVFk6IEZsYWdTcGVjID0geyBzaG9ydDogbmV3IE1hcCgpLCBsb25nOiBuZXcgU2V0KCkgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZsYWdTcGVjRm9yVGFzayh0YXNrPzogc3RyaW5nIHwgbnVsbCkge1xuICAgY29uc3Qgc3BlYyA9IENPTU1BTkRTW3Rhc2sgPz8gJyddID8/IEVNUFRZO1xuXG4gICByZXR1cm4ge1xuICAgICAgc2hvcnQ6IG5ldyBNYXAoWy4uLlVOSVZFUlNBTC5zaG9ydC5lbnRyaWVzKCksIC4uLnNwZWMuc2hvcnQuZW50cmllcygpXSksXG4gICAgICBsb25nOiBzcGVjLmxvbmcsXG4gICB9O1xufVxuIiwgImltcG9ydCB7IEdMT0JBTCB9IGZyb20gJy4vZmxhZy1zcGVjcyc7XG5cbi8qKiBQYXJzZSBhIHNpbmdsZSByYXcgdG9rZW4gKGUuZy4gYCctbSdgLCBgJy0tYW1lbmQnYCwgYCctdWMnYCkgaW50byBvbmUgb3JcbiAqICBtb3JlIHN3aXRjaCBkZXNjcmlwdG9ycy4gIFZhbHVlcyBhcmUgbm90IHlldCByZXNvbHZlZCBmb3IgbmVlZHNOZXh0PXRydWUuICovXG5leHBvcnQgZnVuY3Rpb24gZXhwYW5kVG9rZW4oXG4gICByYXc6IHN0cmluZyxcbiAgIHNwZWMgPSBHTE9CQUxcbik6IEFycmF5PHtcbiAgIG5hbWU6IHN0cmluZztcbiAgIHZhbHVlPzogc3RyaW5nO1xuICAgbmVlZHNOZXh0OiBib29sZWFuO1xufT4ge1xuICAgaWYgKHJhdy5zdGFydHNXaXRoKCctLScpKSB7XG4gICAgICBjb25zdCBlcSA9IHJhdy5pbmRleE9mKCc9Jyk7XG4gICAgICBpZiAoZXEgPiAyKSB7XG4gICAgICAgICByZXR1cm4gW3sgbmFtZTogcmF3LnNsaWNlKDAsIGVxKSwgdmFsdWU6IHJhdy5zbGljZShlcSArIDEpLCBuZWVkc05leHQ6IGZhbHNlIH1dO1xuICAgICAgfVxuICAgICAgY29uc3Qgc3RlbSA9IHJhdy5zbGljZSgyKTtcbiAgICAgIHJldHVybiBbeyBuYW1lOiByYXcsIG5lZWRzTmV4dDogc3BlYy5sb25nLmhhcyhzdGVtKSB9XTtcbiAgIH1cblxuICAgLy8gU2luZ2xlIHNob3J0IHN3aXRjaFxuICAgaWYgKHJhdy5sZW5ndGggPT09IDIpIHtcbiAgICAgIGNvbnN0IGNoYXIgPSByYXcuY2hhckF0KDEpO1xuICAgICAgY29uc3QgY29uc3VtZXMgPSBzcGVjLnNob3J0LmdldChjaGFyKTtcbiAgICAgIHJldHVybiBbeyBuYW1lOiByYXcsIG5lZWRzTmV4dDogY29uc3VtZXMgPT09IHRydWUgfV07XG4gICB9XG5cbiAgIC8vIENvbWJpbmVkIHNob3J0IGNsdXN0ZXI6IHRyeSB0byBleHBhbmQgY2hhci1ieS1jaGFyXG4gICByZXR1cm4gZXhwYW5kQ2x1c3RlcihyYXcsIHNwZWMuc2hvcnQpO1xufVxuXG5mdW5jdGlvbiBleHBhbmRDbHVzdGVyKFxuICAgcmF3OiBzdHJpbmcsXG4gICBzaG9ydFNwZWM6IFJlYWRvbmx5TWFwPHN0cmluZywgYm9vbGVhbj5cbik6IEFycmF5PHsgbmFtZTogc3RyaW5nOyB2YWx1ZT86IHN0cmluZzsgbmVlZHNOZXh0OiBib29sZWFuIH0+IHtcbiAgIGNvbnN0IGNoYXJzID0gcmF3LnNsaWNlKDEpLnNwbGl0KCcnKTtcbiAgIGNvbnN0IHJlc3VsdDogQXJyYXk8eyBuYW1lOiBzdHJpbmc7IHZhbHVlPzogc3RyaW5nOyBuZWVkc05leHQ6IGJvb2xlYW4gfT4gPSBbXTtcblxuICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY2hhciA9IGNoYXJzW2ldO1xuICAgICAgY29uc3QgY29uc3VtZXMgPSBzaG9ydFNwZWMuZ2V0KGNoYXIpO1xuXG4gICAgICBpZiAoY29uc3VtZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgLy8gVW5rbm93biBjaGFyOiBrZWVwIHRoZSB3aG9sZSByYXcgdG9rZW4gYXMgb3BhcXVlXG4gICAgICAgICByZXR1cm4gW3sgbmFtZTogcmF3LCBuZWVkc05leHQ6IGZhbHNlIH1dO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29uc3VtZXMpIHtcbiAgICAgICAgIGNvbnN0IHJlbWFpbmRlciA9IGNoYXJzLnNsaWNlKGkgKyAxKS5qb2luKCcnKTtcbiAgICAgICAgIGlmIChyZW1haW5kZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlbWFpbmRlckFsbEtub3duID0gWy4uLnJlbWFpbmRlcl0uZXZlcnkoKGMpID0+IHNob3J0U3BlYy5oYXMoYykpO1xuICAgICAgICAgICAgaWYgKCFyZW1haW5kZXJBbGxLbm93bikge1xuICAgICAgICAgICAgICAgLy8gUmVtYWluaW5nIGNoYXJzIGFyZSB0aGUgZW1iZWRkZWQgdmFsdWUsIG5vdCBzZXBhcmF0ZSBmbGFnc1xuICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goeyBuYW1lOiBgLSR7Y2hhcn1gLCB2YWx1ZTogcmVtYWluZGVyLCBuZWVkc05leHQ6IGZhbHNlIH0pO1xuICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmVzdWx0LnB1c2goeyBuYW1lOiBgLSR7Y2hhcn1gLCBuZWVkc05leHQ6IGNvbnN1bWVzIH0pO1xuICAgfVxuXG4gICByZXR1cm4gcmVzdWx0O1xufVxuIiwgImltcG9ydCB7IGV4cGFuZFRva2VuIH0gZnJvbSAnLi4vdG9rZW5zL3Rva2VuLWV4cGFuZGVyJztcbmltcG9ydCB0eXBlIHsgRmxhZyB9IGZyb20gJy4vZmxhZ3MuaGVscGVycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2xvYmFsRmxhZ3Mge1xuICAgZmxhZ3M6IEZsYWdbXTtcbiAgIHRhc2tJbmRleDogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VHbG9iYWxGbGFncyh0b2tlbnM6IHJlYWRvbmx5IHVua25vd25bXSwgZmxhZ3M6IEZsYWdbXSA9IFtdKTogR2xvYmFsRmxhZ3Mge1xuICAgbGV0IGkgPSAwO1xuXG4gICB3aGlsZSAoaSA8IHRva2Vucy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHJhdyA9IFN0cmluZyh0b2tlbnNbaV0pO1xuICAgICAgaWYgKCFyYXcuc3RhcnRzV2l0aCgnLScpIHx8IHJhdy5sZW5ndGggPCAyKSBicmVhaztcblxuICAgICAgY29uc3QgcGFyc2VkID0gZXhwYW5kVG9rZW4ocmF3KTtcbiAgICAgIGxldCBuZXh0ID0gaSArIDE7XG5cbiAgICAgIGZvciAoY29uc3QgdG9rZW4gb2YgcGFyc2VkKSB7XG4gICAgICAgICBjb25zdCBmbGFnOiBGbGFnID0ge1xuICAgICAgICAgICAgbmFtZTogdG9rZW4ubmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiB0b2tlbi52YWx1ZSxcbiAgICAgICAgICAgIGFic29yYmVkTmV4dDogZmFsc2UsXG4gICAgICAgICAgICBpc0dsb2JhbDogdHJ1ZSxcbiAgICAgICAgIH07XG4gICAgICAgICBpZiAodG9rZW4ubmVlZHNOZXh0ICYmIGZsYWcudmFsdWUgPT09IHVuZGVmaW5lZCAmJiBuZXh0IDwgdG9rZW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgZmxhZy52YWx1ZSA9IFN0cmluZyh0b2tlbnNbbmV4dF0pO1xuICAgICAgICAgICAgZmxhZy5hYnNvcmJlZE5leHQgPSB0cnVlO1xuICAgICAgICAgICAgbmV4dCsrO1xuICAgICAgICAgfVxuICAgICAgICAgZmxhZ3MucHVzaChmbGFnKTtcbiAgICAgIH1cblxuICAgICAgaSA9IG5leHQ7XG4gICB9XG5cbiAgIHJldHVybiB7IGZsYWdzLCB0YXNrSW5kZXg6IGkgfTtcbn1cbiIsICJpbXBvcnQgeyBpc1BhdGhTcGVjLCB0b1BhdGhzIH0gZnJvbSAnQHNpbXBsZS1naXQvYXJncy1wYXRoc3BlYyc7XG5cbmltcG9ydCB7IGdldEZsYWdTcGVjRm9yVGFzayB9IGZyb20gJy4uL3Rva2Vucy9mbGFnLXNwZWNzJztcbmltcG9ydCB7IGV4cGFuZFRva2VuIH0gZnJvbSAnLi4vdG9rZW5zL3Rva2VuLWV4cGFuZGVyJztcbmltcG9ydCB0eXBlIHsgRmxhZyB9IGZyb20gJy4vZmxhZ3MuaGVscGVycyc7XG5cbnR5cGUgVGFza0ZsYWdzID0ge1xuICAgZmxhZ3M6IEZsYWdbXTtcbiAgIHBvc2l0aW9uYWxzOiBzdHJpbmdbXTtcbiAgIHBhdGhzcGVjczogc3RyaW5nW107XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VUYXNrRmxhZ3MoXG4gICB0b2tlbnM6IHJlYWRvbmx5IHVua25vd25bXSxcbiAgIHRhc2s6IHN0cmluZyB8IG51bGwsXG4gICBmbGFnczogRmxhZ1tdID0gW11cbik6IFRhc2tGbGFncyB7XG4gICBjb25zdCBzcGVjID0gZ2V0RmxhZ1NwZWNGb3JUYXNrKHRhc2spO1xuICAgY29uc3QgcG9zaXRpb25hbHM6IHN0cmluZ1tdID0gW107XG4gICBjb25zdCBwYXRoc3BlY3M6IHN0cmluZ1tdID0gW107XG5cbiAgIGxldCBpID0gMDtcbiAgIHdoaWxlIChpIDwgdG9rZW5zLmxlbmd0aCkge1xuICAgICAgY29uc3QgY3VycmVudCA9IHRva2Vuc1tpXTtcblxuICAgICAgaWYgKGlzUGF0aFNwZWMoY3VycmVudCkpIHtcbiAgICAgICAgIHBhdGhzcGVjcy5wdXNoKC4uLnRvUGF0aHMoY3VycmVudCBhcyBzdHJpbmcpKTtcbiAgICAgICAgIGkrKztcbiAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByYXcgPSBTdHJpbmcoY3VycmVudCk7XG5cbiAgICAgIGlmIChyYXcgPT09ICctLScpIHtcbiAgICAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IHRva2Vucy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29uc3QgdCA9IHRva2Vuc1tqXTtcbiAgICAgICAgICAgIGlzUGF0aFNwZWModCkgPyBwYXRoc3BlY3MucHVzaCguLi50b1BhdGhzKHQgYXMgc3RyaW5nKSkgOiBwYXRoc3BlY3MucHVzaChTdHJpbmcodCkpO1xuICAgICAgICAgfVxuICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmICghcmF3LnN0YXJ0c1dpdGgoJy0nKSB8fCByYXcubGVuZ3RoIDwgMikge1xuICAgICAgICAgcG9zaXRpb25hbHMucHVzaChyYXcpO1xuICAgICAgICAgaSsrO1xuICAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhcnNlZCA9IGV4cGFuZFRva2VuKHJhdywgc3BlYyk7XG4gICAgICBsZXQgbmV4dCA9IGkgKyAxO1xuXG4gICAgICBmb3IgKGNvbnN0IHRva2VuIG9mIHBhcnNlZCkge1xuICAgICAgICAgY29uc3QgZmxhZzogRmxhZyA9IHtcbiAgICAgICAgICAgIG5hbWU6IHRva2VuLm5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogdG9rZW4udmFsdWUsXG4gICAgICAgICAgICBhYnNvcmJlZE5leHQ6IGZhbHNlLFxuICAgICAgICAgICAgaXNHbG9iYWw6IGZhbHNlLFxuICAgICAgICAgfTtcbiAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRva2VuLm5lZWRzTmV4dCAmJlxuICAgICAgICAgICAgZmxhZy52YWx1ZSA9PT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBuZXh0IDwgdG9rZW5zLmxlbmd0aCAmJlxuICAgICAgICAgICAgIWlzUGF0aFNwZWModG9rZW5zW25leHRdKVxuICAgICAgICAgKSB7XG4gICAgICAgICAgICBmbGFnLnZhbHVlID0gU3RyaW5nKHRva2Vuc1tuZXh0XSk7XG4gICAgICAgICAgICBmbGFnLmFic29yYmVkTmV4dCA9IHRydWU7XG4gICAgICAgICAgICBuZXh0Kys7XG4gICAgICAgICB9XG4gICAgICAgICBmbGFncy5wdXNoKGZsYWcpO1xuICAgICAgfVxuXG4gICAgICBpID0gbmV4dDtcbiAgIH1cblxuICAgcmV0dXJuIHsgZmxhZ3MsIHBvc2l0aW9uYWxzLCBwYXRoc3BlY3MgfTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFBhcnNlZENvbmZpZ0FjdGl2aXR5IH0gZnJvbSAnLi4vYXJncy9wYXJzZS1hcmd2LnR5cGVzJztcbmltcG9ydCB0eXBlIHsgVnVsbmVyYWJpbGl0eSwgVnVsbmVyYWJpbGl0eUNhdGVnb3J5IH0gZnJvbSAnLi92dWxuZXJhYmlsaXR5LnR5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uKiBkZXRlY3RWdWxuZXJhYmxlQ29uZmlnV3JpdGVzKHtcbiAgIHdyaXRlLFxufTogUGFyc2VkQ29uZmlnQWN0aXZpdHkpOiBHZW5lcmF0b3I8VnVsbmVyYWJpbGl0eT4ge1xuICAgZm9yIChjb25zdCBjb25maWcgb2Ygd3JpdGUpIHtcbiAgICAgIGZvciAoY29uc3QgaGVscGVyIG9mIHByZXZlbnRVbnNhZmVDb25maWcpIHtcbiAgICAgICAgIGNvbnN0IHZ1bG5lcmFiaWxpdHkgPSBoZWxwZXIoY29uZmlnLmtleSk7XG4gICAgICAgICBpZiAodnVsbmVyYWJpbGl0eSkge1xuICAgICAgICAgICAgeWllbGQgdnVsbmVyYWJpbGl0eTtcbiAgICAgICAgIH1cbiAgICAgIH1cbiAgIH1cbn1cblxuZnVuY3Rpb24gcHJldmVudENvbmZpZ0J1aWxkZXIoXG4gICBjb25maWc6IHN0cmluZyB8IFJlZ0V4cCxcbiAgIGNhdGVnb3J5OiBWdWxuZXJhYmlsaXR5Q2F0ZWdvcnksXG4gICBtZXNzYWdlID0gU3RyaW5nKGNvbmZpZylcbikge1xuICAgY29uc3QgcmVnZXggPSB0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJyA/IG5ldyBSZWdFeHAoYFxcXFxzKiR7Y29uZmlnLnRvTG93ZXJDYXNlKCl9YCkgOiBjb25maWc7XG5cbiAgIHJldHVybiBmdW5jdGlvbiBwcmV2ZW50Q29tbWFuZChrZXk6IHN0cmluZyk6IFZ1bG5lcmFiaWxpdHkgfCB2b2lkIHtcbiAgICAgIGlmIChyZWdleC50ZXN0KGtleSkpIHtcbiAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjYXRlZ29yeSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGBDb25maWd1cmluZyAke21lc3NhZ2V9IGlzIG5vdCBwZXJtaXR0ZWQgd2l0aG91dCBlbmFibGluZyAke2NhdGVnb3J5fWAsXG4gICAgICAgICB9O1xuICAgICAgfVxuICAgfTtcbn1cblxuZnVuY3Rpb24gcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcihjb25maWc6IHN0cmluZywgY2F0ZWdvcnk6IFZ1bG5lcmFiaWxpdHlDYXRlZ29yeSkge1xuICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKGBcXFxccyoke2NvbmZpZy50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xcLi9nLCAnKC4uKyk/LicpfWApO1xuICAgcmV0dXJuIHByZXZlbnRDb25maWdCdWlsZGVyKHJlZ2V4LCBjYXRlZ29yeSwgY29uZmlnKTtcbn1cblxuY29uc3QgcHJldmVudFVuc2FmZUNvbmZpZyA9IFtcbiAgIHByZXZlbnRDb25maWdCdWlsZGVyKCdhbGlhcycsICdhbGxvd1Vuc2FmZUFsaWFzJyksXG4gICBwcmV2ZW50Q29uZmlnQnVpbGRlcignY29yZS5hc2tQYXNzJywgJ2FsbG93VW5zYWZlQXNrUGFzcycpLFxuICAgcHJldmVudENvbmZpZ0J1aWxkZXIoJ2NvcmUuZWRpdG9yJywgJ2FsbG93VW5zYWZlRWRpdG9yJyksXG4gICBwcmV2ZW50Q29uZmlnQnVpbGRlcignY29yZS5mc21vbml0b3InLCAnYWxsb3dVbnNhZmVGc01vbml0b3InKSxcbiAgIHByZXZlbnRDb25maWdCdWlsZGVyKCdjb3JlLmdpdFByb3h5JywgJ2FsbG93VW5zYWZlR2l0UHJveHknKSxcbiAgIHByZXZlbnRDb25maWdCdWlsZGVyKCdjb3JlLmhvb2tzUGF0aCcsICdhbGxvd1Vuc2FmZUhvb2tzUGF0aCcpLFxuICAgcHJldmVudENvbmZpZ0J1aWxkZXIoJ2NvcmUucGFnZXInLCAnYWxsb3dVbnNhZmVQYWdlcicpLFxuICAgcHJldmVudENvbmZpZ0J1aWxkZXIoJ2NvcmUuc3NoQ29tbWFuZCcsICdhbGxvd1Vuc2FmZVNzaENvbW1hbmQnKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ2NyZWRlbnRpYWwuaGVscGVyJywgJ2FsbG93VW5zYWZlQ3JlZGVudGlhbEhlbHBlcicpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcignZGlmZi5jb21tYW5kJywgJ2FsbG93VW5zYWZlRGlmZkV4dGVybmFsJyksXG4gICBwcmV2ZW50Q29uZmlnQnVpbGRlcignZGlmZi5leHRlcm5hbCcsICdhbGxvd1Vuc2FmZURpZmZFeHRlcm5hbCcpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcignZGlmZnRvb2wuY21kJywgJ2FsbG93VW5zYWZlRGlmZkV4dGVybmFsJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCdkaWZmLnRleHRjb252JywgJ2FsbG93VW5zYWZlRGlmZlRleHRDb252JyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCdmaWx0ZXIuY2xlYW4nLCAnYWxsb3dVbnNhZmVGaWx0ZXInKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ2ZpbHRlci5wcm9jZXNzJywgJ2FsbG93VW5zYWZlRmlsdGVyJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCdmaWx0ZXIuc211ZGdlJywgJ2FsbG93VW5zYWZlRmlsdGVyJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCdncGcucHJvZ3JhbScsICdhbGxvd1Vuc2FmZUdwZ1Byb2dyYW0nKSxcbiAgIHByZXZlbnRDb25maWdCdWlsZGVyKCdpbmNsdWRlLnBhdGgnLCAnYWxsb3dVbnNhZmVJbmNsdWRlJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCdpbmNsdWRlSWYnLCAnYWxsb3dVbnNhZmVJbmNsdWRlJyksXG4gICBwcmV2ZW50Q29uZmlnQnVpbGRlcignaW5pdC50ZW1wbGF0ZURpcicsICdhbGxvd1Vuc2FmZVRlbXBsYXRlRGlyJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCdwYWdlci4nLCAnYWxsb3dVbnNhZmVQYWdlcicpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcignbWVyZ2UuZHJpdmVyJywgJ2FsbG93VW5zYWZlTWVyZ2VEcml2ZXInKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ21lcmdldG9vbC5wYXRoJywgJ2FsbG93VW5zYWZlTWVyZ2VEcml2ZXInKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ21lcmdldG9vbC5jbWQnLCAnYWxsb3dVbnNhZmVNZXJnZURyaXZlcicpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcigncHJvdG9jb2wuYWxsb3cnLCAnYWxsb3dVbnNhZmVQcm90b2NvbE92ZXJyaWRlJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCdyZW1vdGUucmVjZWl2ZXBhY2snLCAnYWxsb3dVbnNhZmVQYWNrJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCdyZW1vdGUudXBsb2FkcGFjaycsICdhbGxvd1Vuc2FmZVBhY2snKSxcbiAgIHByZXZlbnRDb25maWdCdWlsZGVyKCd1cGxvYWRwYWNrLnBhY2tPYmplY3RzSG9vaycsICdhbGxvd1Vuc2FmZVBhY2snKSxcbiAgIHByZXZlbnRDb25maWdCdWlsZGVyKCdzZXF1ZW5jZS5lZGl0b3InLCAnYWxsb3dVbnNhZmVFZGl0b3InKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ3N1Ym1vZHVsZS51cGRhdGUnLCAnYWxsb3dVbnNhZmVTdWJtb2R1bGUnKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ3Rhci5jb21tYW5kJywgJ2FsbG93VW5zYWZlQ29tbWFuZEJpbmFyaWVzJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCd0cmFpbGVyLmNtZCcsICdhbGxvd1Vuc2FmZUNvbW1hbmRCaW5hcmllcycpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcigndHJhaWxlci5jb21tYW5kJywgJ2FsbG93VW5zYWZlQ29tbWFuZEJpbmFyaWVzJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCd1cmwuaW5zdGVhZE9mJywgJ2FsbG93VW5zYWZlVXJsUmV3cml0ZScpLFxuXTtcbiIsICJpbXBvcnQgdHlwZSB7IEZsYWcgfSBmcm9tICcuLi9mbGFncy9mbGFncy5oZWxwZXJzJztcbmltcG9ydCB0eXBlIHsgVnVsbmVyYWJpbGl0eSwgVnVsbmVyYWJpbGl0eUNhdGVnb3J5IH0gZnJvbSAnLi92dWxuZXJhYmlsaXR5LnR5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uKiBkZXRlY3RWdWxuZXJhYmxlRmxhZ3MoXG4gICB0YXNrOiBudWxsIHwgc3RyaW5nLFxuICAgZmxhZ3M6IEZsYWdbXVxuKTogR2VuZXJhdG9yPFZ1bG5lcmFiaWxpdHk+IHtcbiAgIGZvciAoY29uc3QgZmxhZyBvZiBmbGFncykge1xuICAgICAgZm9yIChjb25zdCBoZWxwZXIgb2YgcHJldmVudFVuc2FmZUZsYWdzKSB7XG4gICAgICAgICBjb25zdCB2dWxuZXJhYmlsaXR5ID0gaGVscGVyKHRhc2ssIGZsYWcpO1xuICAgICAgICAgaWYgKHZ1bG5lcmFiaWxpdHkpIHtcbiAgICAgICAgICAgIHlpZWxkIHZ1bG5lcmFiaWxpdHk7XG4gICAgICAgICB9XG4gICAgICB9XG4gICB9XG59XG5cbmludGVyZmFjZSBQcmV2ZW50RmxhZ09wdGlvbnMge1xuICAgLyoqIExhYmVsIHRvIHVzZSBpbiB0aGUgZXJyb3IgbWVzc2FnZSBpbiBwbGFjZSBvZiB0aGUgbWF0Y2hlciBpdHNlbGYgKi9cbiAgIG5hbWU/OiBzdHJpbmc7XG5cbiAgIC8qKiBPbmx5IG1hdGNoIHdoZW4gdGhlIHN3aXRjaCBhcHBlYXJzIGJlZm9yZSB0aGUgZ2l0IHN1Yi1jb21tYW5kICovXG4gICBnbG9iYWxPbmx5PzogYm9vbGVhbjtcblxuICAgLyoqXG4gICAgKiBPbmx5IG1hdGNoIHdoZW4gdGhlIHN3aXRjaCB3YXMgc3VwcGxpZWQgd2l0aCBhIHZhbHVlIC0gd2l0aG91dCBvbmUgc3dpdGNoZXNcbiAgICAqIHN1Y2ggYXMgYC0tZ2l0LWRpcmAgYW5kIGAtLWV4ZWMtcGF0aGAgYXJlIGdldHRlcnMgcmF0aGVyIHRoYW4gc2V0dGVycy5cbiAgICAqL1xuICAgd2l0aFZhbHVlPzogYm9vbGVhbjtcbn1cblxuZnVuY3Rpb24gcHJldmVudEZsYWdCdWlsZGVyKFxuICAgdGFzazogc3RyaW5nIHwgbnVsbCxcbiAgIGZsYWc6IHN0cmluZyB8IFJlZ0V4cCxcbiAgIGNhdGVnb3J5OiBWdWxuZXJhYmlsaXR5Q2F0ZWdvcnksXG4gICB7IG5hbWUgPSBTdHJpbmcoZmxhZyksIGdsb2JhbE9ubHkgPSBmYWxzZSwgd2l0aFZhbHVlID0gZmFsc2UgfTogUHJldmVudEZsYWdPcHRpb25zID0ge31cbikge1xuICAgY29uc3QgcmVnZXggPSB0eXBlb2YgZmxhZyA9PT0gJ3N0cmluZycgPyBuZXcgUmVnRXhwKGBcXFxccyoke2ZsYWcudG9Mb3dlckNhc2UoKX1gKSA6IGZsYWc7XG4gICBjb25zdCBtZXNzYWdlID0gYFVzZSBvZiAke3Rhc2sgPyBgJHt0YXNrfSB3aXRoIG9wdGlvbiBgIDogJyd9JHtuYW1lfSBpcyBub3QgcGVybWl0dGVkIHdpdGhvdXQgZW5hYmxpbmcgJHtjYXRlZ29yeX1gO1xuXG4gICByZXR1cm4gZnVuY3Rpb24gcHJldmVudEZsYWcoY3VycmVudFRhc2s6IHN0cmluZyB8IG51bGwsIGZsYWc6IEZsYWcpOiBWdWxuZXJhYmlsaXR5IHwgdm9pZCB7XG4gICAgICBpZiAodGFzayAmJiBjdXJyZW50VGFzayAhPT0gdGFzaykge1xuICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZ2xvYmFsT25seSAmJiAhZmxhZy5pc0dsb2JhbCkge1xuICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAod2l0aFZhbHVlICYmIGZsYWcudmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVnZXgudGVzdChmbGFnLm5hbWUpKSB7XG4gICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2F0ZWdvcnksXG4gICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgfTtcbiAgICAgIH1cbiAgIH07XG59XG5cbmNvbnN0IHBhdGhUYWtpbmdHbG9iYWw6IFByZXZlbnRGbGFnT3B0aW9ucyA9IHsgZ2xvYmFsT25seTogdHJ1ZSwgd2l0aFZhbHVlOiB0cnVlIH07XG5cbmNvbnN0IHByZXZlbnRVbnNhZmVGbGFncyA9IFtcbiAgIHByZXZlbnRGbGFnQnVpbGRlcihudWxsLCAvLS0odXBsb2FkfHJlY2VpdmUpLXBhY2svLCAnYWxsb3dVbnNhZmVQYWNrJywge1xuICAgICAgbmFtZTogJy0tdXBsb2FkLXBhY2sgb3IgLS1yZWNlaXZlLXBhY2snLFxuICAgfSksXG4gICBwcmV2ZW50RmxhZ0J1aWxkZXIoJ2Nsb25lJywgL14tXFx3KnUvLCAnYWxsb3dVbnNhZmVQYWNrJyksXG4gICBwcmV2ZW50RmxhZ0J1aWxkZXIoJ2Nsb25lJywgJy0tdScsICdhbGxvd1Vuc2FmZVBhY2snKSxcbiAgIHByZXZlbnRGbGFnQnVpbGRlcigncHVzaCcsIC9eLS1leGVjJC8sICdhbGxvd1Vuc2FmZVBhY2snLCB7IG5hbWU6ICctLWV4ZWMnIH0pLFxuICAgLy8gYGdpdGAgYWNjZXB0cyB1bmFtYmlndW91cyBhYmJyZXZpYXRpb25zIG9mIGxvbmcgb3B0aW9ucywgc28gYC0tZXhgIGFuZCBgLS1leGVgIGFyZSBgLS1leGVjYFxuICAgcHJldmVudEZsYWdCdWlsZGVyKCdyZWJhc2UnLCAvXigteHwtLWV4KGVjPyk/KSQvLCAnYWxsb3dVbnNhZmVFeGVjJywgeyBuYW1lOiAnLXggb3IgLS1leGVjJyB9KSxcbiAgIHByZXZlbnRGbGFnQnVpbGRlcihudWxsLCAnLS10ZW1wbGF0ZScsICdhbGxvd1Vuc2FmZVRlbXBsYXRlRGlyJyksXG4gICBwcmV2ZW50RmxhZ0J1aWxkZXIobnVsbCwgJy0tZXhlYy1wYXRoJywgJ2FsbG93VW5zYWZlRXhlYycsIHBhdGhUYWtpbmdHbG9iYWwpLFxuICAgLy8gYGdpdGAgcmVhZHMgdGhlIGNvbmZpZ3VyYXRpb24gb2Ygd2hpY2hldmVyIHJlcG9zaXRvcnkgdGhlc2UgbmFtZSwgc28gdGhlXG4gICAvLyBkaXJlY3RvcnkgYWxvbmUgaXMgZW5vdWdoIHRvIGRlbGl2ZXIgY29uZmlnIHRoZSBhcmd2IGd1YXJkcyBuZXZlciBzZWVcbiAgIHByZXZlbnRGbGFnQnVpbGRlcihudWxsLCAnLS1naXQtZGlyJywgJ2FsbG93VW5zYWZlQ29uZmlnUGF0aHMnLCBwYXRoVGFraW5nR2xvYmFsKSxcbiAgIHByZXZlbnRGbGFnQnVpbGRlcihudWxsLCAnLS13b3JrLXRyZWUnLCAnYWxsb3dVbnNhZmVDb25maWdQYXRocycsIHBhdGhUYWtpbmdHbG9iYWwpLFxuICAgcHJldmVudEZsYWdCdWlsZGVyKG51bGwsIC9eLUMkLywgJ2FsbG93VW5zYWZlQ29uZmlnUGF0aHMnLCB7IC4uLnBhdGhUYWtpbmdHbG9iYWwsIG5hbWU6ICctQycgfSksXG5dO1xuIiwgImltcG9ydCB0eXBlIHsgUGFyc2VkQ29uZmlnQWN0aXZpdHkgfSBmcm9tICcuLi9hcmdzL3BhcnNlLWFyZ3YudHlwZXMnO1xuaW1wb3J0IHR5cGUgeyBGbGFnIH0gZnJvbSAnLi4vZmxhZ3MvZmxhZ3MuaGVscGVycyc7XG5pbXBvcnQgeyBkZXRlY3RWdWxuZXJhYmxlQ29uZmlnV3JpdGVzIH0gZnJvbSAnLi9kZXRlY3QtdnVsbmVyYWJsZS1jb25maWctd3JpdGVzJztcbmltcG9ydCB7IGRldGVjdFZ1bG5lcmFibGVGbGFncyB9IGZyb20gJy4vZGV0ZWN0LXZ1bG5lcmFibGUtZmxhZ3MnO1xuaW1wb3J0IHR5cGUgeyBWdWxuZXJhYmlsaXR5IH0gZnJvbSAnLi92dWxuZXJhYmlsaXR5LnR5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHZ1bG5lcmFiaWxpdHlBbmFseXNpcyhcbiAgIHRhc2s6IG51bGwgfCBzdHJpbmcsXG4gICBmbGFnczogRmxhZ1tdLFxuICAgY29uZmlnOiBQYXJzZWRDb25maWdBY3Rpdml0eVxuKTogVnVsbmVyYWJpbGl0eVtdIHtcbiAgIHJldHVybiBbLi4uZGV0ZWN0VnVsbmVyYWJsZUZsYWdzKHRhc2ssIGZsYWdzKSwgLi4uZGV0ZWN0VnVsbmVyYWJsZUNvbmZpZ1dyaXRlcyhjb25maWcpXTtcbn1cbiIsICJpbXBvcnQgeyBjb2xsZWN0Q29uZmlnQWNjZXNzIH0gZnJvbSAnLi4vY29uZmlnL2FuYWx5c2UtY29uZmlnJztcbmltcG9ydCB0eXBlIHsgRmxhZyB9IGZyb20gJy4uL2ZsYWdzL2ZsYWdzLmhlbHBlcnMnO1xuaW1wb3J0IHsgcGFyc2VHbG9iYWxGbGFncyB9IGZyb20gJy4uL2ZsYWdzL3BhcnNlLWdsb2JhbC1mbGFncyc7XG5pbXBvcnQgeyBwYXJzZVRhc2tGbGFncyB9IGZyb20gJy4uL2ZsYWdzL3BhcnNlLXRhc2stZmxhZ3MnO1xuaW1wb3J0IHR5cGUgeyBWdWxuZXJhYmlsaXR5IH0gZnJvbSAnLi4vdnVsbmVyYWJpbGl0aWVzL3Z1bG5lcmFiaWxpdHkudHlwZXMnO1xuaW1wb3J0IHsgdnVsbmVyYWJpbGl0eUFuYWx5c2lzIH0gZnJvbSAnLi4vdnVsbmVyYWJpbGl0aWVzL3Z1bG5lcmFiaWxpdHktYW5hbHlzaXMnO1xuaW1wb3J0IHR5cGUgeyBQYXJzZWRBcmd2LCBQYXJzZWRGbGFnIH0gZnJvbSAnLi9wYXJzZS1hcmd2LnR5cGVzJztcblxuLyoqXG4gKiBQYXJzZSB0aGUgdG9rZW5zIHRoYXQgd291bGQgYmUgZm9yd2FyZGVkIHRvIGEgYGdpdGAgY2hpbGQtcHJvY2VzcyBhbmRcbiAqIHJldHVybiBhIHN0cnVjdHVyZWQgc3VtbWFyeSBvZiB3aGF0IHRoZSBpbnZvY2F0aW9uIGRvZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUFyZ3YoLi4udG9rZW5zOiByZWFkb25seSB1bmtub3duW10pOiBQYXJzZWRBcmd2IHtcbiAgIGNvbnN0IHsgZmxhZ3MsIHRhc2tJbmRleCB9ID0gcGFyc2VHbG9iYWxGbGFncyh0b2tlbnMpO1xuXG4gICBjb25zdCB0YXNrID0gdGFza0luZGV4IDwgdG9rZW5zLmxlbmd0aCA/IFN0cmluZyh0b2tlbnNbdGFza0luZGV4XSkudG9Mb3dlckNhc2UoKSA6IG51bGw7XG4gICBjb25zdCB0YXNrVG9rZW5zID0gdGFzayAhPT0gbnVsbCA/IHRva2Vucy5zbGljZSh0YXNrSW5kZXggKyAxKSA6IFtdO1xuXG4gICBjb25zdCB7IHBvc2l0aW9uYWxzLCBwYXRoc3BlY3MgfSA9IHBhcnNlVGFza0ZsYWdzKHRhc2tUb2tlbnMsIHRhc2ssIGZsYWdzKTtcbiAgIGNvbnN0IGNvbmZpZyA9IGNvbGxlY3RDb25maWdBY2Nlc3ModGFzaywgZmxhZ3MsIHBvc2l0aW9uYWxzKTtcblxuICAgcmV0dXJuIHtcbiAgICAgIHRhc2ssXG4gICAgICBmbGFnczogZmxhZ3MubWFwKHRvUGFyc2VkRmxhZyksXG4gICAgICBwYXRoczogcGF0aHNwZWNzLFxuICAgICAgY29uZmlnLFxuICAgICAgdnVsbmVyYWJpbGl0aWVzOiB2dWxuZXJhYmlsaXR5TGlzdCh2dWxuZXJhYmlsaXR5QW5hbHlzaXModGFzaywgZmxhZ3MsIGNvbmZpZykpLFxuICAgfTtcbn1cblxuZnVuY3Rpb24gdnVsbmVyYWJpbGl0eUxpc3QodnVsbmVyYWJpbGl0aWVzOiBWdWxuZXJhYmlsaXR5W10pIHtcbiAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkodnVsbmVyYWJpbGl0aWVzLCAndnVsbmVyYWJpbGl0aWVzJywge1xuICAgICAgdmFsdWU6IHZ1bG5lcmFiaWxpdGllcyxcbiAgIH0pO1xufVxuXG5mdW5jdGlvbiB0b1BhcnNlZEZsYWcoeyB2YWx1ZSwgbmFtZSB9OiBGbGFnKTogUGFyc2VkRmxhZyB7XG4gICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHsgbmFtZSwgdmFsdWUgfSA6IHsgbmFtZSB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgQ29uZmlnV3JpdGUsIFBhcnNlZENvbmZpZ0FjdGl2aXR5IH0gZnJvbSAnLi4vYXJncy9wYXJzZS1hcmd2LnR5cGVzJztcbmltcG9ydCB0eXBlIHsgVnVsbmVyYWJpbGl0eSwgVnVsbmVyYWJpbGl0eUNhdGVnb3J5IH0gZnJvbSAnLi4vdnVsbmVyYWJpbGl0aWVzL3Z1bG5lcmFiaWxpdHkudHlwZXMnO1xuaW1wb3J0IHsgdnVsbmVyYWJpbGl0eUFuYWx5c2lzIH0gZnJvbSAnLi4vdnVsbmVyYWJpbGl0aWVzL3Z1bG5lcmFiaWxpdHktYW5hbHlzaXMnO1xuXG5jb25zdCBHaXRFbnZLZXlzID0ge1xuICAgJ2VkaXRvcic6ICdhbGxvd1Vuc2FmZUVkaXRvcicsXG4gICAnZ2l0X2Fza3Bhc3MnOiAnYWxsb3dVbnNhZmVBc2tQYXNzJyxcbiAgICdnaXRfY29uZmlnX2dsb2JhbCc6ICdhbGxvd1Vuc2FmZUNvbmZpZ1BhdGhzJyxcbiAgICdnaXRfY29uZmlnX3N5c3RlbSc6ICdhbGxvd1Vuc2FmZUNvbmZpZ1BhdGhzJyxcbiAgICdnaXRfY29uZmlnX2NvdW50JzogJ2FsbG93VW5zYWZlQ29uZmlnRW52Q291bnQnLFxuICAgJ2dpdF9jb25maWdfcGFyYW1ldGVycyc6ICdhbGxvd1Vuc2FmZUNvbmZpZ0VudkNvdW50JyxcbiAgICdnaXRfY29uZmlnJzogJ2FsbG93VW5zYWZlQ29uZmlnUGF0aHMnLFxuICAgJ2dpdF9lZGl0b3InOiAnYWxsb3dVbnNhZmVFZGl0b3InLFxuICAgJ2dpdF9leGVjX3BhdGgnOiAnYWxsb3dVbnNhZmVFeGVjJyxcbiAgICdnaXRfZXh0ZXJuYWxfZGlmZic6ICdhbGxvd1Vuc2FmZURpZmZFeHRlcm5hbCcsXG4gICAnZ2l0X3BhZ2VyJzogJ2FsbG93VW5zYWZlUGFnZXInLFxuICAgJ2dpdF9wcm94eV9jb21tYW5kJzogJ2FsbG93VW5zYWZlR2l0UHJveHknLFxuICAgJ2dpdF90ZW1wbGF0ZV9kaXInOiAnYWxsb3dVbnNhZmVUZW1wbGF0ZURpcicsXG4gICAnZ2l0X3NlcXVlbmNlX2VkaXRvcic6ICdhbGxvd1Vuc2FmZUVkaXRvcicsXG4gICAnZ2l0X3NzaCc6ICdhbGxvd1Vuc2FmZVNzaENvbW1hbmQnLFxuICAgJ2dpdF9zc2hfY29tbWFuZCc6ICdhbGxvd1Vuc2FmZVNzaENvbW1hbmQnLFxuICAgJ3BhZ2VyJzogJ2FsbG93VW5zYWZlUGFnZXInLFxuICAgJ3ByZWZpeCc6ICdhbGxvd1Vuc2FmZUNvbmZpZ1BhdGhzJyxcbiAgICdzc2hfYXNrcGFzcyc6ICdhbGxvd1Vuc2FmZUFza1Bhc3MnLFxuICAgJ3Zpc3VhbCc6ICdhbGxvd1Vuc2FmZUVkaXRvcicsXG59IGFzIGNvbnN0IHNhdGlzZmllcyBSZWNvcmQ8c3RyaW5nLCBWdWxuZXJhYmlsaXR5Q2F0ZWdvcnk+O1xuXG50eXBlIEdpdEVudiA9IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gJiB7XG4gICBnaXRfY29uZmlnX2NvdW50Pzogc3RyaW5nO1xufTtcblxuZnVuY3Rpb24qIGNvbGxlY3RDb25maWdCeUNvdW50KGVudjogR2l0RW52KTogR2VuZXJhdG9yPENvbmZpZ1dyaXRlPiB7XG4gICBjb25zdCBjb3VudCA9IHBhcnNlSW50KGVudi5naXRfY29uZmlnX2NvdW50ID8/ICcwJywgMTApO1xuICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNvdW50OyBpbmRleCsrKSB7XG4gICAgICBjb25zdCBrZXkgPSBlbnZbYGdpdF9jb25maWdfa2V5XyR7aW5kZXh9YF07XG4gICAgICBjb25zdCB2YWx1ZSA9IGVudltgZ2l0X2NvbmZpZ192YWx1ZV8ke2luZGV4fWBdO1xuXG4gICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgIHlpZWxkIHsga2V5OiBrZXkudG9Mb3dlckNhc2UoKS50cmltKCksIHZhbHVlLCBzY29wZTogJ2VudicgfTtcbiAgICAgIH1cbiAgIH1cbn1cblxuZnVuY3Rpb24qIGNvbGxlY3RDb25maWdWdWxuZXJhYmlsaXRpZXMoZW52OiBHaXRFbnYpOiBHZW5lcmF0b3I8VnVsbmVyYWJpbGl0eT4ge1xuICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZW52KSkge1xuICAgICAgaWYgKGlzR2l0RW52S2V5KGtleSkpIHtcbiAgICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gR2l0RW52S2V5c1trZXldO1xuICAgICAgICAgeWllbGQge1xuICAgICAgICAgICAgY2F0ZWdvcnksXG4gICAgICAgICAgICBtZXNzYWdlOiBgVXNlIG9mIFwiJHtrZXkudG9VcHBlckNhc2UoKX1cIiBpcyBub3QgcGVybWl0dGVkIHdpdGhvdXQgZW5hYmxpbmcgJHtjYXRlZ29yeX1gLFxuICAgICAgICAgfTtcbiAgICAgIH1cbiAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzR2l0RW52S2V5KGtleTogc3RyaW5nKToga2V5IGlzIGtleW9mIHR5cGVvZiBHaXRFbnZLZXlzIHtcbiAgIHJldHVybiBPYmplY3QuaGFzT3duKEdpdEVudktleXMsIGtleSk7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVFbnYoZW52OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IEdpdEVudiB7XG4gICBjb25zdCBnaXRFbnY6IEdpdEVudiA9IHt9O1xuICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoZW52KSkge1xuICAgICAgY29uc3QgZW52S2V5ID0ga2V5LnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICAgICAgaWYgKGlzR2l0RW52S2V5KGVudktleSkgfHwgZW52S2V5LnN0YXJ0c1dpdGgoJ2dpdCcpKSB7XG4gICAgICAgICBnaXRFbnZbZW52S2V5XSA9IFN0cmluZyh2YWx1ZSk7XG4gICAgICB9XG4gICB9XG4gICByZXR1cm4gZ2l0RW52O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VFbnYocmF3OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikge1xuICAgY29uc3QgZW52ID0gcHJlcGFyZUVudihyYXcpO1xuICAgY29uc3QgY29uZmlnOiBQYXJzZWRDb25maWdBY3Rpdml0eSA9IHtcbiAgICAgIHJlYWQ6IFtdLFxuICAgICAgd3JpdGU6IFsuLi5jb2xsZWN0Q29uZmlnQnlDb3VudChlbnYpXSxcbiAgIH07XG4gICBjb25zdCB2dWxuZXJhYmlsaXRpZXMgPSBbXG4gICAgICAuLi5jb2xsZWN0Q29uZmlnVnVsbmVyYWJpbGl0aWVzKGVudiksXG4gICAgICAuLi52dWxuZXJhYmlsaXR5QW5hbHlzaXMobnVsbCwgW10sIGNvbmZpZyksXG4gICBdO1xuXG4gICByZXR1cm4ge1xuICAgICAgY29uZmlnLFxuICAgICAgdnVsbmVyYWJpbGl0aWVzLFxuICAgfTtcbn1cbiIsICJpbXBvcnQgeyBwYXJzZUFyZ3YgfSBmcm9tICcuLi9hcmdzL3BhcnNlLWFyZ3YnO1xuaW1wb3J0IHsgcGFyc2VFbnYgfSBmcm9tICcuLi9lbnYvcGFyc2UtZW52JztcblxuLyoqXG4gKiBSZXRyaWV2ZXMganVzdCB0aGUgdnVsbmVyYWJpbGl0aWVzIGlkZW50aWZpZWQgaW4gdGhlIHN1cHBsaWVkIHZhcmFyZ3MgdG9rZW5zXG4gKiBhbmQgZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdnVsbmVyYWJpbGl0eUNoZWNrKHRva2VuczogcmVhZG9ubHkgc3RyaW5nW10sIGVudjogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pIHtcbiAgIHJldHVybiBbLi4ucGFyc2VBcmd2KC4uLnRva2VucykudnVsbmVyYWJpbGl0aWVzLCAuLi5wYXJzZUVudihlbnYpLnZ1bG5lcmFiaWxpdGllc107XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIFRoZSBgR2l0RXJyb3JgIGlzIHRocm93biB3aGVuIHRoZSB1bmRlcmx5aW5nIGBnaXRgIHByb2Nlc3MgdGhyb3dzIGFcbiAqIGZhdGFsIGV4Y2VwdGlvbiAoZWcgYW4gYEVOT0VOVGAgZXhjZXB0aW9uIHdoZW4gYXR0ZW1wdGluZyB0byB1c2UgYVxuICogbm9uLXdyaXRhYmxlIGRpcmVjdG9yeSBhcyB0aGUgcm9vdCBmb3IgeW91ciByZXBvKSwgYW5kIGFjdHMgYXMgdGhlXG4gKiBiYXNlIGNsYXNzIGZvciBtb3JlIHNwZWNpZmljIGVycm9ycyB0aHJvd24gYnkgdGhlIHBhcnNpbmcgb2YgdGhlXG4gKiBnaXQgcmVzcG9uc2Ugb3IgZXJyb3JzIGluIHRoZSBjb25maWd1cmF0aW9uIG9mIHRoZSB0YXNrIGFib3V0IHRvXG4gKiBiZSBydW4uXG4gKlxuICogV2hlbiBhbiBleGNlcHRpb24gaXMgdGhyb3duLCBwZW5kaW5nIHRhc2tzIGluIHRoZSBzYW1lIGluc3RhbmNlIHdpbGxcbiAqIG5vdCBiZSBleGVjdXRlZC4gVGhlIHJlY29tbWVuZGVkIHdheSB0byBydW4gYSBzZXJpZXMgb2YgdGFza3MgdGhhdFxuICogY2FuIGluZGVwZW5kZW50bHkgZmFpbCB3aXRob3V0IG5lZWRpbmcgdG8gcHJldmVudCBmdXR1cmUgdGFza3MgZnJvbVxuICogcnVubmluZyBpcyB0byBjYXRjaCB0aGVtIGluZGl2aWR1YWxseTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gaW1wb3J0IHsgc2ltcGxlR2l0LCBTaW1wbGVHaXQsIEdpdEVycm9yLCBQdWxsUmVzdWx0IH0gZnJvbSAnc2ltcGxlLWdpdCc7XG5cbiBmdW5jdGlvbiBjYXRjaFRhc2sgKGU6IEdpdEVycm9yKSB7XG4gICByZXR1cm4gZS5cbiB9XG5cbiBjb25zdCBnaXQgPSBzaW1wbGVHaXQocmVwb1dvcmtpbmdEaXIpO1xuIGNvbnN0IHB1bGxlZDogUHVsbFJlc3VsdCB8IEdpdEVycm9yID0gYXdhaXQgZ2l0LnB1bGwoKS5jYXRjaChjYXRjaFRhc2spO1xuIGNvbnN0IHB1c2hlZDogc3RyaW5nIHwgR2l0RXJyb3IgPSBhd2FpdCBnaXQucHVzaFRhZ3MoKS5jYXRjaChjYXRjaFRhc2spO1xuIGBgYFxuICovXG5leHBvcnQgY2xhc3MgR2l0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyB0YXNrPzogU2ltcGxlR2l0VGFzazxhbnk+LFxuICAgICAgbWVzc2FnZT86IHN0cmluZ1xuICAgKSB7XG4gICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBuZXcudGFyZ2V0LnByb3RvdHlwZSk7XG4gICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRPcHRpb25zIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgR2l0RXJyb3IgfSBmcm9tICcuL2dpdC1lcnJvcic7XG5cbi8qKlxuICogVGhlIGBHaXRDb25zdHJ1Y3RFcnJvcmAgaXMgdGhyb3duIHdoZW4gYW4gZXJyb3Igb2NjdXJzIGluIHRoZSBjb25zdHJ1Y3RvclxuICogb2YgdGhlIGBzaW1wbGUtZ2l0YCBpbnN0YW5jZSBpdHNlbGYuIE1vc3QgY29tbW9ubHkgYXMgYSByZXN1bHQgb2YgdXNpbmdcbiAqIGEgYGJhc2VEaXJgIG9wdGlvbiB0aGF0IHBvaW50cyB0byBhIGZvbGRlciB0aGF0IGVpdGhlciBkb2VzIG5vdCBleGlzdCxcbiAqIG9yIGNhbm5vdCBiZSByZWFkIGJ5IHRoZSB1c2VyIHRoZSBub2RlIHNjcmlwdCBpcyBydW5uaW5nIGFzLlxuICpcbiAqIENoZWNrIHRoZSBgLm1lc3NhZ2VgIHByb3BlcnR5IGZvciBtb3JlIGRldGFpbCBpbmNsdWRpbmcgdGhlIHByb3BlcnRpZXNcbiAqIHBhc3NlZCB0byB0aGUgY29uc3RydWN0b3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBHaXRDb25zdHJ1Y3RFcnJvciBleHRlbmRzIEdpdEVycm9yIHtcbiAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHJlYWRvbmx5IGNvbmZpZzogU2ltcGxlR2l0T3B0aW9ucyxcbiAgICAgIG1lc3NhZ2U6IHN0cmluZ1xuICAgKSB7XG4gICAgICBzdXBlcih1bmRlZmluZWQsIG1lc3NhZ2UpO1xuICAgfVxufVxuIiwgImltcG9ydCB0eXBlIHsgU2ltcGxlR2l0T3B0aW9ucywgU2ltcGxlR2l0VGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IEdpdEVycm9yIH0gZnJvbSAnLi9naXQtZXJyb3InO1xuXG5leHBvcnQgY2xhc3MgR2l0UGx1Z2luRXJyb3IgZXh0ZW5kcyBHaXRFcnJvciB7XG4gICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyB0YXNrPzogU2ltcGxlR2l0VGFzazxhbnk+LFxuICAgICAgcHVibGljIHJlYWRvbmx5IHBsdWdpbj86IGtleW9mIFNpbXBsZUdpdE9wdGlvbnMsXG4gICAgICBtZXNzYWdlPzogc3RyaW5nXG4gICApIHtcbiAgICAgIHN1cGVyKHRhc2ssIG1lc3NhZ2UpO1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIG5ldy50YXJnZXQucHJvdG90eXBlKTtcbiAgIH1cbn1cbiIsICJpbXBvcnQgeyBHaXRFcnJvciB9IGZyb20gJy4vZ2l0LWVycm9yJztcblxuLyoqXG4gKiBUaGUgYEdpdFJlc3BvbnNlRXJyb3JgIGlzIHRoZSB3cmFwcGVyIGZvciBhIHBhcnNlZCByZXNwb25zZSB0aGF0IGlzIHRyZWF0ZWQgYXNcbiAqIGEgZmF0YWwgZXJyb3IsIGZvciBleGFtcGxlIGF0dGVtcHRpbmcgYSBgbWVyZ2VgIGNhbiBsZWF2ZSB0aGUgcmVwbyBpbiBhIGNvcnJ1cHRlZFxuICogc3RhdGUgd2hlbiB0aGVyZSBhcmUgY29uZmxpY3RzIHNvIHRoZSB0YXNrIHdpbGwgcmVqZWN0IHJhdGhlciB0aGFuIHJlc29sdmUuXG4gKlxuICogRm9yIGV4YW1wbGUsIGNhdGNoaW5nIHRoZSBtZXJnZSBjb25mbGljdCBleGNlcHRpb246XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuIGltcG9ydCB7IHNpbXBsZUdpdCwgU2ltcGxlR2l0LCBHaXRSZXNwb25zZUVycm9yLCBNZXJnZVN1bW1hcnkgfSBmcm9tICdzaW1wbGUtZ2l0JztcblxuIGNvbnN0IGdpdCA9IHNpbXBsZUdpdChyZXBvUm9vdCk7XG4gY29uc3QgbWVyZ2VPcHRpb25zOiBzdHJpbmdbXSA9IFsnLS1uby1mZicsICdvdGhlci1icmFuY2gnXTtcbiBjb25zdCBtZXJnZVN1bW1hcnk6IE1lcmdlU3VtbWFyeSA9IGF3YWl0IGdpdC5tZXJnZShtZXJnZU9wdGlvbnMpXG4gICAgICAuY2F0Y2goKGU6IEdpdFJlc3BvbnNlRXJyb3I8TWVyZ2VTdW1tYXJ5PikgPT4gZS5naXQpO1xuXG4gaWYgKG1lcmdlU3VtbWFyeS5mYWlsZWQpIHtcbiAgIC8vIGRlYWwgd2l0aCB0aGUgZXJyb3JcbiB9XG4gYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBHaXRSZXNwb25zZUVycm9yPFQgPSBhbnk+IGV4dGVuZHMgR2l0RXJyb3Ige1xuICAgY29uc3RydWN0b3IoXG4gICAgICAvKipcbiAgICAgICAqIGAuZ2l0YCBhY2Nlc3MgdGhlIHBhcnNlZCByZXNwb25zZSB0aGF0IGlzIHRyZWF0ZWQgYXMgYmVpbmcgYW4gZXJyb3JcbiAgICAgICAqL1xuICAgICAgcHVibGljIHJlYWRvbmx5IGdpdDogVCxcbiAgICAgIG1lc3NhZ2U/OiBzdHJpbmdcbiAgICkge1xuICAgICAgc3VwZXIodW5kZWZpbmVkLCBtZXNzYWdlIHx8IFN0cmluZyhnaXQpKTtcbiAgIH1cbn1cbiIsICJpbXBvcnQgeyBHaXRFcnJvciB9IGZyb20gJy4vZ2l0LWVycm9yJztcblxuLyoqXG4gKiBUaGUgYFRhc2tDb25maWd1cmF0aW9uRXJyb3JgIGlzIHRocm93biB3aGVuIGEgY29tbWFuZCB3YXMgaW5jb3JyZWN0bHlcbiAqIGNvbmZpZ3VyZWQuIEFuIGVycm9yIG9mIHRoaXMga2luZCBtZWFucyB0aGF0IG5vIGF0dGVtcHQgd2FzIG1hZGUgdG9cbiAqIHJ1biB5b3VyIGNvbW1hbmQgdGhyb3VnaCB0aGUgdW5kZXJseWluZyBgZ2l0YCBiaW5hcnkuXG4gKlxuICogQ2hlY2sgdGhlIGAubWVzc2FnZWAgcHJvcGVydHkgZm9yIG1vcmUgZGV0YWlsIG9uIHdoeSB5b3VyIGNvbmZpZ3VyYXRpb25cbiAqIHJlc3VsdGVkIGluIGFuIGVycm9yLlxuICovXG5leHBvcnQgY2xhc3MgVGFza0NvbmZpZ3VyYXRpb25FcnJvciBleHRlbmRzIEdpdEVycm9yIHtcbiAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U/OiBzdHJpbmcpIHtcbiAgICAgIHN1cGVyKHVuZGVmaW5lZCwgbWVzc2FnZSk7XG4gICB9XG59XG4iLCAiaW1wb3J0IHsgZXhpc3RzLCBGT0xERVIgfSBmcm9tICdAa3dzaXRlcy9maWxlLWV4aXN0cyc7XG5cbmltcG9ydCB0eXBlIHsgTWF5YmUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBmaWx0ZXJIYXNMZW5ndGggfSBmcm9tICcuL2FyZ3VtZW50LWZpbHRlcnMnO1xuXG50eXBlIENhbGxhYmxlID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdW5rbm93bjtcblxuZXhwb3J0IGNvbnN0IE5VTEwgPSAnXFwwJztcblxuZXhwb3J0IGNvbnN0IE5PT1A6IENhbGxhYmxlID0gKCkgPT4ge307XG5cbi8qKlxuICogUmV0dXJucyBlaXRoZXIgdGhlIHNvdXJjZSBhcmd1bWVudCB3aGVuIGl0IGlzIGEgYEZ1bmN0aW9uYCwgb3IgdGhlIGRlZmF1bHRcbiAqIGBOT09QYCBmdW5jdGlvbiBjb25zdGFudFxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNGdW5jdGlvbjxUPihzb3VyY2U6IFQgfCB1bmtub3duKTogQ2FsbGFibGUge1xuICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBOT09QO1xuICAgfVxuICAgcmV0dXJuIHNvdXJjZSBhcyBDYWxsYWJsZTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHN1cHBsaWVkIGFyZ3VtZW50IGlzIGJvdGggYSBmdW5jdGlvbiwgYW5kIGlzIG5vdFxuICogdGhlIGBOT09QYCBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVXNlckZ1bmN0aW9uPFQgZXh0ZW5kcyBGdW5jdGlvbj4oc291cmNlOiBUIHwgdW5rbm93bik6IHNvdXJjZSBpcyBUIHtcbiAgIHJldHVybiB0eXBlb2Ygc291cmNlID09PSAnZnVuY3Rpb24nICYmIHNvdXJjZSAhPT0gTk9PUDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNwbGl0T24oaW5wdXQ6IHN0cmluZywgY2hhcjogc3RyaW5nKTogW3N0cmluZywgc3RyaW5nXSB7XG4gICBjb25zdCBpbmRleCA9IGlucHV0LmluZGV4T2YoY2hhcik7XG4gICBpZiAoaW5kZXggPD0gMCkge1xuICAgICAgcmV0dXJuIFtpbnB1dCwgJyddO1xuICAgfVxuXG4gICByZXR1cm4gW2lucHV0LnN1YnN0cigwLCBpbmRleCksIGlucHV0LnN1YnN0cihpbmRleCArIDEpXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0PFQgZXh0ZW5kcyB1bmtub3duW10+KGlucHV0OiBULCBvZmZzZXQ/OiBudW1iZXIpOiBNYXliZTxUW251bWJlcl0+O1xuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0PFQgZXh0ZW5kcyBJQXJndW1lbnRzPihpbnB1dDogVCwgb2Zmc2V0PzogbnVtYmVyKTogTWF5YmU8dW5rbm93bj47XG5leHBvcnQgZnVuY3Rpb24gZmlyc3QoaW5wdXQ6IHVua25vd25bXSB8IElBcmd1bWVudHMsIG9mZnNldCA9IDApOiBNYXliZTx1bmtub3duPiB7XG4gICByZXR1cm4gaXNBcnJheUxpa2UoaW5wdXQpICYmIGlucHV0Lmxlbmd0aCA+IG9mZnNldCA/IGlucHV0W29mZnNldF0gOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsYXN0PFQgZXh0ZW5kcyB1bmtub3duW10+KGlucHV0OiBULCBvZmZzZXQ/OiBudW1iZXIpOiBNYXliZTxUW251bWJlcl0+O1xuZXhwb3J0IGZ1bmN0aW9uIGxhc3Q8VCBleHRlbmRzIElBcmd1bWVudHM+KGlucHV0OiBULCBvZmZzZXQ/OiBudW1iZXIpOiBNYXliZTx1bmtub3duPjtcbmV4cG9ydCBmdW5jdGlvbiBsYXN0PFQ+KGlucHV0OiBULCBvZmZzZXQ/OiBudW1iZXIpOiBNYXliZTx1bmtub3duPjtcbmV4cG9ydCBmdW5jdGlvbiBsYXN0KGlucHV0OiB1bmtub3duLCBvZmZzZXQgPSAwKSB7XG4gICBpZiAoaXNBcnJheUxpa2UoaW5wdXQpICYmIGlucHV0Lmxlbmd0aCA+IG9mZnNldCkge1xuICAgICAgcmV0dXJuIGlucHV0W2lucHV0Lmxlbmd0aCAtIDEgLSBvZmZzZXRdO1xuICAgfVxufVxuXG50eXBlIEFycmF5TGlrZTxUPiA9IFRbXSB8IElBcmd1bWVudHMgfCB7IFtpbmRleDogbnVtYmVyXTogVDsgbGVuZ3RoOiBudW1iZXIgfTtcblxuZnVuY3Rpb24gaXNBcnJheUxpa2UoaW5wdXQ6IHVua25vd24pOiBpbnB1dCBpcyBBcnJheUxpa2U8dW5rbm93bj4ge1xuICAgcmV0dXJuIGZpbHRlckhhc0xlbmd0aChpbnB1dCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0xpbmVzV2l0aENvbnRlbnQoaW5wdXQgPSAnJywgdHJpbW1lZCA9IHRydWUsIHNlcGFyYXRvciA9ICdcXG4nKTogc3RyaW5nW10ge1xuICAgcmV0dXJuIGlucHV0LnNwbGl0KHNlcGFyYXRvcikucmVkdWNlKChvdXRwdXQsIGxpbmUpID0+IHtcbiAgICAgIGNvbnN0IGxpbmVDb250ZW50ID0gdHJpbW1lZCA/IGxpbmUudHJpbSgpIDogbGluZTtcbiAgICAgIGlmIChsaW5lQ29udGVudCkge1xuICAgICAgICAgb3V0cHV0LnB1c2gobGluZUNvbnRlbnQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgIH0sIFtdIGFzIHN0cmluZ1tdKTtcbn1cblxudHlwZSBMaW5lV2l0aENvbnRlbnRDYWxsYmFjazxUID0gdm9pZD4gPSAobGluZTogc3RyaW5nKSA9PiBUO1xuXG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaExpbmVXaXRoQ29udGVudDxUPihcbiAgIGlucHV0OiBzdHJpbmcsXG4gICBjYWxsYmFjazogTGluZVdpdGhDb250ZW50Q2FsbGJhY2s8VD5cbik6IFRbXSB7XG4gICByZXR1cm4gdG9MaW5lc1dpdGhDb250ZW50KGlucHV0LCB0cnVlKS5tYXAoKGxpbmUpID0+IGNhbGxiYWNrKGxpbmUpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvbGRlckV4aXN0cyhwYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgIHJldHVybiBleGlzdHMocGF0aCwgRk9MREVSKTtcbn1cblxuLyoqXG4gKiBBZGRzIGBpdGVtYCBpbnRvIHRoZSBgdGFyZ2V0YCBgQXJyYXlgIG9yIGBTZXRgIHdoZW4gaXQgaXMgbm90IGFscmVhZHkgcHJlc2VudCBhbmQgcmV0dXJucyB0aGUgYGl0ZW1gLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kPFQ+KHRhcmdldDogVFtdIHwgU2V0PFQ+LCBpdGVtOiBUKTogdHlwZW9mIGl0ZW0ge1xuICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgaWYgKCF0YXJnZXQuaW5jbHVkZXMoaXRlbSkpIHtcbiAgICAgICAgIHRhcmdldC5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC5hZGQoaXRlbSk7XG4gICB9XG4gICByZXR1cm4gaXRlbTtcbn1cblxuLyoqXG4gKiBBZGRzIGBpdGVtYCBpbnRvIHRoZSBgdGFyZ2V0YCBgQXJyYXlgIHdoZW4gaXQgaXMgbm90IGFscmVhZHkgcHJlc2VudCBhbmQgcmV0dXJucyB0aGUgYHRhcmdldGAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmNsdWRpbmc8VD4odGFyZ2V0OiBUW10sIGl0ZW06IFQpOiB0eXBlb2YgdGFyZ2V0IHtcbiAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgIXRhcmdldC5pbmNsdWRlcyhpdGVtKSkge1xuICAgICAgdGFyZ2V0LnB1c2goaXRlbSk7XG4gICB9XG5cbiAgIHJldHVybiB0YXJnZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmU8VD4odGFyZ2V0OiBTZXQ8VD4gfCBUW10sIGl0ZW06IFQpOiBUIHtcbiAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGFyZ2V0LmluZGV4T2YoaXRlbSk7XG4gICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgdGFyZ2V0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0LmRlbGV0ZShpdGVtKTtcbiAgIH1cbiAgIHJldHVybiBpdGVtO1xufVxuXG5leHBvcnQgY29uc3Qgb2JqZWN0VG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwuYmluZChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKSBhcyAoXG4gICBpbnB1dDogdW5rbm93blxuKSA9PiBzdHJpbmc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhc0FycmF5PFQ+KHNvdXJjZTogVCB8IFRbXSk6IFRbXSB7XG4gICByZXR1cm4gQXJyYXkuaXNBcnJheShzb3VyY2UpID8gc291cmNlIDogW3NvdXJjZV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc0NhbWVsQ2FzZShzdHI6IHN0cmluZykge1xuICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXFxzLV0rKC4pL2csIChfYWxsLCBjaHIpID0+IHtcbiAgICAgIHJldHVybiBjaHIudG9VcHBlckNhc2UoKTtcbiAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNTdHJpbmdBcnJheTxUPihzb3VyY2U6IFQgfCBUW10pOiBzdHJpbmdbXSB7XG4gICByZXR1cm4gYXNBcnJheShzb3VyY2UpLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIGl0ZW0gaW5zdGFuY2VvZiBTdHJpbmcgPyAoaXRlbSBhcyBzdHJpbmcpIDogU3RyaW5nKGl0ZW0pO1xuICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc051bWJlcihzb3VyY2U6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQsIG9uTmFOID0gMCkge1xuICAgaWYgKHNvdXJjZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gb25OYU47XG4gICB9XG5cbiAgIGNvbnN0IG51bSA9IHBhcnNlSW50KHNvdXJjZSwgMTApO1xuICAgcmV0dXJuIE51bWJlci5pc05hTihudW0pID8gb25OYU4gOiBudW07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmVmaXhlZEFycmF5PFQ+KGlucHV0OiBUW10sIHByZWZpeDogVCk6IFRbXSB7XG4gICBjb25zdCBvdXRwdXQ6IFRbXSA9IFtdO1xuICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IGlucHV0Lmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XG4gICAgICBvdXRwdXQucHVzaChwcmVmaXgsIGlucHV0W2ldKTtcbiAgIH1cbiAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWZmZXJUb1N0cmluZyhpbnB1dDogQnVmZmVyIHwgQnVmZmVyW10pOiBzdHJpbmcge1xuICAgcmV0dXJuIChBcnJheS5pc0FycmF5KGlucHV0KSA/IEJ1ZmZlci5jb25jYXQoaW5wdXQpIDogaW5wdXQpLnRvU3RyaW5nKCd1dGYtOCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnl0ZUxlbmd0aChpbnB1dD86IHN0cmluZyB8IEJ1ZmZlcikge1xuICAgaWYgKCFpbnB1dCkge1xuICAgICAgcmV0dXJuIDA7XG4gICB9XG5cbiAgIHJldHVybiBCdWZmZXIuaXNCdWZmZXIoaW5wdXQpID8gaW5wdXQubGVuZ3RoIDogQnVmZmVyLmJ5dGVMZW5ndGgoaW5wdXQpO1xufVxuXG4vKipcbiAqIEdldCBhIG5ldyBvYmplY3QgZnJvbSBhIHNvdXJjZSBvYmplY3Qgd2l0aCBvbmx5IHRoZSBsaXN0ZWQgcHJvcGVydGllcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBpY2s8VCwgSyBleHRlbmRzIGtleW9mIFQ+KHNvdXJjZTogVCwgcHJvcGVydGllczogcmVhZG9ubHkgS1tdKSB7XG4gICBjb25zdCBvdXQ6IFBhcnRpYWw8UGljazxULCBLPj4gPSB7fTtcblxuICAgcHJvcGVydGllcy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmIChzb3VyY2Vba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICBvdXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgfSk7XG5cbiAgIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxheShkdXJhdGlvbiA9IDApOiBQcm9taXNlPHZvaWQ+IHtcbiAgIHJldHVybiBuZXcgUHJvbWlzZSgoZG9uZSkgPT4gc2V0VGltZW91dChkb25lLCBkdXJhdGlvbikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3JWb2lkPFQ+KGlucHV0OiBUIHwgZmFsc2UpIHtcbiAgIGlmIChpbnB1dCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICB9XG4gICByZXR1cm4gaW5wdXQ7XG59XG4iLCAiaW1wb3J0IHsgaXNQYXRoU3BlYyB9IGZyb20gJ0BzaW1wbGUtZ2l0L2FyZ3MtcGF0aHNwZWMnO1xuXG5pbXBvcnQgdHlwZSB7IE1heWJlLCBPcHRpb25zLCBQcmltaXRpdmVzIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgb2JqZWN0VG9TdHJpbmcgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgdHlwZSBBcmd1bWVudEZpbHRlclByZWRpY2F0ZTxUPiA9IChpbnB1dDogVCB8IHVua25vd24pID0+IGlucHV0IGlzIFQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJUeXBlPFQsIEs+KFxuICAgaW5wdXQ6IEssXG4gICBmaWx0ZXI6IEFyZ3VtZW50RmlsdGVyUHJlZGljYXRlPFQ+XG4pOiBLIGV4dGVuZHMgVCA/IFQgOiB1bmRlZmluZWQ7XG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyVHlwZTxULCBLPihpbnB1dDogSywgZmlsdGVyOiBBcmd1bWVudEZpbHRlclByZWRpY2F0ZTxUPiwgZGVmOiBUKTogVDtcbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJUeXBlPFQsIEs+KGlucHV0OiBLLCBmaWx0ZXI6IEFyZ3VtZW50RmlsdGVyUHJlZGljYXRlPFQ+LCBkZWY/OiBUKTogTWF5YmU8VD4ge1xuICAgaWYgKGZpbHRlcihpbnB1dCkpIHtcbiAgICAgIHJldHVybiBpbnB1dDtcbiAgIH1cbiAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID4gMiA/IGRlZiA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGNvbnN0IGZpbHRlckFycmF5OiBBcmd1bWVudEZpbHRlclByZWRpY2F0ZTxBcnJheTx1bmtub3duPj4gPSAoXG4gICBpbnB1dFxuKTogaW5wdXQgaXMgQXJyYXk8dW5rbm93bj4gPT4ge1xuICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoaW5wdXQpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlclByaW1pdGl2ZXMoXG4gICBpbnB1dDogdW5rbm93bixcbiAgIG9taXQ/OiBBcnJheTwnYm9vbGVhbicgfCAnc3RyaW5nJyB8ICdudW1iZXInPlxuKTogaW5wdXQgaXMgUHJpbWl0aXZlcyB7XG4gICBjb25zdCB0eXBlID0gaXNQYXRoU3BlYyhpbnB1dCkgPyAnc3RyaW5nJyA6IHR5cGVvZiBpbnB1dDtcblxuICAgcmV0dXJuIChcbiAgICAgIC9udW1iZXJ8c3RyaW5nfGJvb2xlYW4vLnRlc3QodHlwZSkgJiZcbiAgICAgICghb21pdCB8fCAhb21pdC5pbmNsdWRlcyh0eXBlIGFzICdib29sZWFuJyB8ICdzdHJpbmcnIHwgJ251bWJlcicpKVxuICAgKTtcbn1cblxuZXhwb3J0IGNvbnN0IGZpbHRlck51bWJlcjogQXJndW1lbnRGaWx0ZXJQcmVkaWNhdGU8bnVtYmVyPiA9IChpbnB1dDogdW5rbm93bik6IGlucHV0IGlzIG51bWJlciA9PiB7XG4gICByZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnbnVtYmVyJztcbn07XG5cbmV4cG9ydCBjb25zdCBmaWx0ZXJTdHJpbmc6IEFyZ3VtZW50RmlsdGVyUHJlZGljYXRlPHN0cmluZz4gPSAoaW5wdXQ6IHVua25vd24pOiBpbnB1dCBpcyBzdHJpbmcgPT4ge1xuICAgcmV0dXJuIHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycgfHwgaXNQYXRoU3BlYyhpbnB1dCk7XG59O1xuXG5leHBvcnQgY29uc3QgZmlsdGVyU3RyaW5nT3JCdWZmZXI6IEFyZ3VtZW50RmlsdGVyUHJlZGljYXRlPHN0cmluZyB8IEJ1ZmZlcj4gPSAoXG4gICBpbnB1dDogdW5rbm93blxuKTogaW5wdXQgaXMgc3RyaW5nIHwgQnVmZmVyID0+IHtcbiAgIHJldHVybiBmaWx0ZXJTdHJpbmcoaW5wdXQpIHx8IEJ1ZmZlci5pc0J1ZmZlcihpbnB1dCk7XG59O1xuXG5leHBvcnQgY29uc3QgZmlsdGVyU3RyaW5nT3JTdHJpbmdBcnJheTogQXJndW1lbnRGaWx0ZXJQcmVkaWNhdGU8c3RyaW5nIHwgc3RyaW5nW10+ID0gKFxuICAgaW5wdXRcbik6IGlucHV0IGlzIHN0cmluZyB8IHN0cmluZ1tdID0+IHtcbiAgIHJldHVybiBmaWx0ZXJTdHJpbmcoaW5wdXQpIHx8IChBcnJheS5pc0FycmF5KGlucHV0KSAmJiBpbnB1dC5ldmVyeShmaWx0ZXJTdHJpbmcpKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJQbGFpbk9iamVjdDxUIGV4dGVuZHMgT3B0aW9ucz4oaW5wdXQ6IFQgfCB1bmtub3duKTogaW5wdXQgaXMgVDtcbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJQbGFpbk9iamVjdDxUIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4+KFxuICAgaW5wdXQ6IFQgfCB1bmtub3duXG4pOiBpbnB1dCBpcyBUIHtcbiAgIHJldHVybiAhIWlucHV0ICYmIG9iamVjdFRvU3RyaW5nKGlucHV0KSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJGdW5jdGlvbihpbnB1dDogdW5rbm93bik6IGlucHV0IGlzICguLi5hcmdzOiB1bmtub3duW10pID0+IHVua25vd24ge1xuICAgcmV0dXJuIHR5cGVvZiBpbnB1dCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZXhwb3J0IGNvbnN0IGZpbHRlckhhc0xlbmd0aDogQXJndW1lbnRGaWx0ZXJQcmVkaWNhdGU8eyBsZW5ndGg6IG51bWJlciB9PiA9IChcbiAgIGlucHV0XG4pOiBpbnB1dCBpcyB7IGxlbmd0aDogbnVtYmVyIH0gPT4ge1xuICAgaWYgKGlucHV0ID09IG51bGwgfHwgJ251bWJlcnxib29sZWFufGZ1bmN0aW9uJy5pbmNsdWRlcyh0eXBlb2YgaW5wdXQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICB9XG5cbiAgIHJldHVybiB0eXBlb2YgKGlucHV0IGFzIHsgbGVuZ3RoPzogbnVtYmVyIH0pLmxlbmd0aCA9PT0gJ251bWJlcic7XG59O1xuIiwgIi8qKlxuICogS25vd24gcHJvY2VzcyBleGl0IGNvZGVzIHVzZWQgYnkgdGhlIHRhc2sgcGFyc2VycyB0byBkZXRlcm1pbmUgd2hldGhlciBhbiBlcnJvclxuICogd2FzIG9uZSB0aGV5IGNhbiBhdXRvbWF0aWNhbGx5IGhhbmRsZVxuICovXG5leHBvcnQgZW51bSBFeGl0Q29kZXMge1xuICAgU1VDQ0VTUyxcbiAgIEVSUk9SLFxuICAgTk9UX0ZPVU5EID0gLTIsXG4gICBVTkNMRUFOID0gMTI4LFxufVxuIiwgImltcG9ydCB0eXBlIHsgVGFza1Jlc3BvbnNlRm9ybWF0IH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgY2xhc3MgR2l0T3V0cHV0U3RyZWFtczxUIGV4dGVuZHMgVGFza1Jlc3BvbnNlRm9ybWF0ID0gQnVmZmVyPiB7XG4gICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyByZWFkb25seSBzdGRPdXQ6IFQsXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgc3RkRXJyOiBUXG4gICApIHt9XG5cbiAgIGFzU3RyaW5ncygpOiBHaXRPdXRwdXRTdHJlYW1zPHN0cmluZz4ge1xuICAgICAgcmV0dXJuIG5ldyBHaXRPdXRwdXRTdHJlYW1zKHRoaXMuc3RkT3V0LnRvU3RyaW5nKCd1dGY4JyksIHRoaXMuc3RkRXJyLnRvU3RyaW5nKCd1dGY4JykpO1xuICAgfVxufVxuIiwgImZ1bmN0aW9uIHVzZU1hdGNoZXNEZWZhdWx0KCkge1xuICAgdGhyb3cgbmV3IEVycm9yKGBMaW5lUGFyc2VyOnVzZU1hdGNoZXMgbm90IGltcGxlbWVudGVkYCk7XG59XG5cbmV4cG9ydCBjbGFzcyBMaW5lUGFyc2VyPFQ+IHtcbiAgIHByb3RlY3RlZCBtYXRjaGVzOiBzdHJpbmdbXSA9IFtdO1xuICAgcHJvdGVjdGVkIHVzZU1hdGNoZXM6ICh0YXJnZXQ6IFQsIG1hdGNoOiBzdHJpbmdbXSkgPT4gYm9vbGVhbiB8IHZvaWQgPSB1c2VNYXRjaGVzRGVmYXVsdDtcblxuICAgcHJpdmF0ZSBfcmVnRXhwOiBSZWdFeHBbXTtcblxuICAgY29uc3RydWN0b3IoXG4gICAgICByZWdFeHA6IFJlZ0V4cCB8IFJlZ0V4cFtdLFxuICAgICAgdXNlTWF0Y2hlcz86ICh0YXJnZXQ6IFQsIG1hdGNoOiBzdHJpbmdbXSkgPT4gYm9vbGVhbiB8IHZvaWRcbiAgICkge1xuICAgICAgdGhpcy5fcmVnRXhwID0gQXJyYXkuaXNBcnJheShyZWdFeHApID8gcmVnRXhwIDogW3JlZ0V4cF07XG4gICAgICBpZiAodXNlTWF0Y2hlcykge1xuICAgICAgICAgdGhpcy51c2VNYXRjaGVzID0gdXNlTWF0Y2hlcztcbiAgICAgIH1cbiAgIH1cblxuICAgcGFyc2UgPSAobGluZTogKG9mZnNldDogbnVtYmVyKSA9PiBzdHJpbmcgfCB1bmRlZmluZWQsIHRhcmdldDogVCk6IGJvb2xlYW4gPT4ge1xuICAgICAgdGhpcy5yZXNldE1hdGNoZXMoKTtcblxuICAgICAgaWYgKCF0aGlzLl9yZWdFeHAuZXZlcnkoKHJlZywgaW5kZXgpID0+IHRoaXMuYWRkTWF0Y2gocmVnLCBpbmRleCwgbGluZShpbmRleCkpKSkge1xuICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy51c2VNYXRjaGVzKHRhcmdldCwgdGhpcy5wcmVwYXJlTWF0Y2hlcygpKSAhPT0gZmFsc2U7XG4gICB9O1xuXG4gICBwcm90ZWN0ZWQgcmVzZXRNYXRjaGVzKCkge1xuICAgICAgdGhpcy5tYXRjaGVzLmxlbmd0aCA9IDA7XG4gICB9XG5cbiAgIHByb3RlY3RlZCBwcmVwYXJlTWF0Y2hlcygpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hdGNoZXM7XG4gICB9XG5cbiAgIHByb3RlY3RlZCBhZGRNYXRjaChyZWc6IFJlZ0V4cCwgaW5kZXg6IG51bWJlciwgbGluZT86IHN0cmluZykge1xuICAgICAgY29uc3QgbWF0Y2hlZCA9IGxpbmUgJiYgcmVnLmV4ZWMobGluZSk7XG4gICAgICBpZiAobWF0Y2hlZCkge1xuICAgICAgICAgdGhpcy5wdXNoTWF0Y2goaW5kZXgsIG1hdGNoZWQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gISFtYXRjaGVkO1xuICAgfVxuXG4gICBwcm90ZWN0ZWQgcHVzaE1hdGNoKF9pbmRleDogbnVtYmVyLCBtYXRjaGVkOiBzdHJpbmdbXSkge1xuICAgICAgdGhpcy5tYXRjaGVzLnB1c2goLi4ubWF0Y2hlZC5zbGljZSgxKSk7XG4gICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZW1vdGVMaW5lUGFyc2VyPFQ+IGV4dGVuZHMgTGluZVBhcnNlcjxUPiB7XG4gICBwcm90ZWN0ZWQgYWRkTWF0Y2gocmVnOiBSZWdFeHAsIGluZGV4OiBudW1iZXIsIGxpbmU/OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiAvXnJlbW90ZTpcXHMvLnRlc3QoU3RyaW5nKGxpbmUpKSAmJiBzdXBlci5hZGRNYXRjaChyZWcsIGluZGV4LCBsaW5lKTtcbiAgIH1cblxuICAgcHJvdGVjdGVkIHB1c2hNYXRjaChpbmRleDogbnVtYmVyLCBtYXRjaGVkOiBzdHJpbmdbXSkge1xuICAgICAgaWYgKGluZGV4ID4gMCB8fCBtYXRjaGVkLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgIHN1cGVyLnB1c2hNYXRjaChpbmRleCwgbWF0Y2hlZCk7XG4gICAgICB9XG4gICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRPcHRpb25zIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0T3B0aW9uczogT21pdDxTaW1wbGVHaXRPcHRpb25zLCAnYmFzZURpcic+ID0ge1xuICAgYmluYXJ5OiAnZ2l0JyxcbiAgIG1heENvbmN1cnJlbnRQcm9jZXNzZXM6IDUsXG4gICBjb25maWc6IFtdLFxuICAgdHJpbW1lZDogZmFsc2UsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VDb25maWcoXG4gICAuLi5vcHRpb25zOiBBcnJheTxQYXJ0aWFsPFNpbXBsZUdpdE9wdGlvbnM+IHwgdW5kZWZpbmVkPlxuKTogU2ltcGxlR2l0T3B0aW9ucyB7XG4gICBjb25zdCBiYXNlRGlyID0gcHJvY2Vzcy5jd2QoKTtcbiAgIGNvbnN0IGNvbmZpZzogU2ltcGxlR2l0T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7IGJhc2VEaXIsIC4uLmRlZmF1bHRPcHRpb25zIH0sXG4gICAgICAuLi5vcHRpb25zLmZpbHRlcigobykgPT4gdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIG8pXG4gICApO1xuXG4gICBjb25maWcuYmFzZURpciA9IGNvbmZpZy5iYXNlRGlyIHx8IGJhc2VEaXI7XG4gICBjb25maWcudHJpbW1lZCA9IGNvbmZpZy50cmltbWVkID09PSB0cnVlO1xuXG4gICByZXR1cm4gY29uZmlnO1xufVxuIiwgImltcG9ydCB7IGlzUGF0aFNwZWMgfSBmcm9tICdAc2ltcGxlLWdpdC9hcmdzLXBhdGhzcGVjJztcblxuaW1wb3J0IHR5cGUgeyBNYXliZSwgT3B0aW9ucyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7XG4gICBmaWx0ZXJBcnJheSxcbiAgIGZpbHRlckZ1bmN0aW9uLFxuICAgZmlsdGVyUGxhaW5PYmplY3QsXG4gICBmaWx0ZXJQcmltaXRpdmVzLFxuICAgZmlsdGVyVHlwZSxcbn0gZnJvbSAnLi9hcmd1bWVudC1maWx0ZXJzJztcbmltcG9ydCB7IGFzRnVuY3Rpb24sIGFzU3RyaW5nQXJyYXksIGlzVXNlckZ1bmN0aW9uLCBsYXN0IH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZFRhc2tPcHRpb25zPFQgZXh0ZW5kcyBPcHRpb25zID0gT3B0aW9ucz4oXG4gICBvcHRpb25zOiBNYXliZTxUPixcbiAgIGNvbW1hbmRzOiBzdHJpbmdbXSA9IFtdXG4pOiBzdHJpbmdbXSB7XG4gICBpZiAoIWZpbHRlclBsYWluT2JqZWN0PE9wdGlvbnM+KG9wdGlvbnMpKSB7XG4gICAgICByZXR1cm4gY29tbWFuZHM7XG4gICB9XG5cbiAgIHJldHVybiBPYmplY3Qua2V5cyhvcHRpb25zKS5yZWR1Y2UoKGNvbW1hbmRzOiBzdHJpbmdbXSwga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9uc1trZXldO1xuXG4gICAgICBpZiAoaXNQYXRoU3BlYyh2YWx1ZSkpIHtcbiAgICAgICAgIGNvbW1hbmRzLnB1c2godmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChmaWx0ZXJQcmltaXRpdmVzKHZhbHVlLCBbJ2Jvb2xlYW4nXSkpIHtcbiAgICAgICAgIGNvbW1hbmRzLnB1c2goa2V5ICsgJz0nICsgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgZm9yIChjb25zdCB2IG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoIWZpbHRlclByaW1pdGl2ZXModiwgWydzdHJpbmcnLCAnbnVtYmVyJ10pKSB7XG4gICAgICAgICAgICAgICBjb21tYW5kcy5wdXNoKGtleSArICc9JyArIHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIGNvbW1hbmRzLnB1c2goa2V5KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbW1hbmRzO1xuICAgfSwgY29tbWFuZHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhaWxpbmdPcHRpb25zKFxuICAgYXJnczogSUFyZ3VtZW50cyxcbiAgIGluaXRpYWxQcmltaXRpdmUgPSAwLFxuICAgb2JqZWN0T25seSA9IGZhbHNlXG4pOiBzdHJpbmdbXSB7XG4gICBjb25zdCBjb21tYW5kOiBzdHJpbmdbXSA9IFtdO1xuXG4gICBmb3IgKGxldCBpID0gMCwgbWF4ID0gaW5pdGlhbFByaW1pdGl2ZSA8IDAgPyBhcmdzLmxlbmd0aCA6IGluaXRpYWxQcmltaXRpdmU7IGkgPCBtYXg7IGkrKykge1xuICAgICAgaWYgKCdzdHJpbmd8bnVtYmVyJy5pbmNsdWRlcyh0eXBlb2YgYXJnc1tpXSkpIHtcbiAgICAgICAgIGNvbW1hbmQucHVzaChTdHJpbmcoYXJnc1tpXSkpO1xuICAgICAgfVxuICAgfVxuXG4gICBhcHBlbmRUYXNrT3B0aW9ucyh0cmFpbGluZ09wdGlvbnNBcmd1bWVudChhcmdzKSwgY29tbWFuZCk7XG4gICBpZiAoIW9iamVjdE9ubHkpIHtcbiAgICAgIGNvbW1hbmQucHVzaCguLi50cmFpbGluZ0FycmF5QXJndW1lbnQoYXJncykpO1xuICAgfVxuXG4gICByZXR1cm4gY29tbWFuZDtcbn1cblxuZnVuY3Rpb24gdHJhaWxpbmdBcnJheUFyZ3VtZW50KGFyZ3M6IElBcmd1bWVudHMpIHtcbiAgIGNvbnN0IGhhc1RyYWlsaW5nQ2FsbGJhY2sgPSB0eXBlb2YgbGFzdChhcmdzKSA9PT0gJ2Z1bmN0aW9uJztcbiAgIHJldHVybiBhc1N0cmluZ0FycmF5KGZpbHRlclR5cGUobGFzdChhcmdzLCBoYXNUcmFpbGluZ0NhbGxiYWNrID8gMSA6IDApLCBmaWx0ZXJBcnJheSwgW10pKTtcbn1cblxuLyoqXG4gKiBHaXZlbiBhbnkgbnVtYmVyIG9mIGFyZ3VtZW50cywgcmV0dXJucyB0aGUgdHJhaWxpbmcgb3B0aW9ucyBhcmd1bWVudCwgaWdub3JpbmcgYSB0cmFpbGluZyBmdW5jdGlvbiBhcmd1bWVudFxuICogaWYgdGhlcmUgaXMgb25lLiBXaGVuIG5vdCBmb3VuZCwgdGhlIHJldHVybiB2YWx1ZSBpcyBudWxsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhaWxpbmdPcHRpb25zQXJndW1lbnQoYXJnczogSUFyZ3VtZW50cyk6IE1heWJlPE9wdGlvbnM+IHtcbiAgIGNvbnN0IGhhc1RyYWlsaW5nQ2FsbGJhY2sgPSBmaWx0ZXJGdW5jdGlvbihsYXN0KGFyZ3MpKTtcbiAgIHJldHVybiBmaWx0ZXJUeXBlKGxhc3QoYXJncywgaGFzVHJhaWxpbmdDYWxsYmFjayA/IDEgOiAwKSwgZmlsdGVyUGxhaW5PYmplY3QpO1xufVxuXG4vKipcbiAqIFJldHVybnMgZWl0aGVyIHRoZSBzb3VyY2UgYXJndW1lbnQgd2hlbiBpdCBpcyBhIGBGdW5jdGlvbmAsIG9yIHRoZSBkZWZhdWx0XG4gKiBgTk9PUGAgZnVuY3Rpb24gY29uc3RhbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChcbiAgIGFyZ3M6IHVua25vd25bXSB8IElBcmd1bWVudHMgfCB1bmtub3duLFxuICAgaW5jbHVkZU5vb3AgPSB0cnVlXG4pOiBNYXliZTwoLi4uYXJnczogdW5rbm93bltdKSA9PiB1bmtub3duPiB7XG4gICBjb25zdCBjYWxsYmFjayA9IGFzRnVuY3Rpb24obGFzdChhcmdzKSk7XG4gICByZXR1cm4gaW5jbHVkZU5vb3AgfHwgaXNVc2VyRnVuY3Rpb24oY2FsbGJhY2spID8gY2FsbGJhY2sgOiB1bmRlZmluZWQ7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBNYXliZUFycmF5LCBUYXNrUGFyc2VyLCBUYXNrUmVzcG9uc2VGb3JtYXQgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgdHlwZSB7IEdpdE91dHB1dFN0cmVhbXMgfSBmcm9tICcuL2dpdC1vdXRwdXQtc3RyZWFtcyc7XG5pbXBvcnQgdHlwZSB7IExpbmVQYXJzZXIgfSBmcm9tICcuL2xpbmUtcGFyc2VyJztcbmltcG9ydCB7IGFzQXJyYXksIHRvTGluZXNXaXRoQ29udGVudCB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxsVGFza1BhcnNlcjxJTlBVVCBleHRlbmRzIFRhc2tSZXNwb25zZUZvcm1hdCwgUkVTUE9OU0U+KFxuICAgcGFyc2VyOiBUYXNrUGFyc2VyPElOUFVULCBSRVNQT05TRT4sXG4gICBzdHJlYW1zOiBHaXRPdXRwdXRTdHJlYW1zPElOUFVUPlxuKSB7XG4gICByZXR1cm4gcGFyc2VyKHN0cmVhbXMuc3RkT3V0LCBzdHJlYW1zLnN0ZEVycik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN0cmluZ1Jlc3BvbnNlPFQ+KFxuICAgcmVzdWx0OiBULFxuICAgcGFyc2VyczogTGluZVBhcnNlcjxUPltdLFxuICAgdGV4dHM6IE1heWJlQXJyYXk8c3RyaW5nPixcbiAgIHRyaW0gPSB0cnVlXG4pOiBUIHtcbiAgIGFzQXJyYXkodGV4dHMpLmZvckVhY2goKHRleHQpID0+IHtcbiAgICAgIGZvciAobGV0IGxpbmVzID0gdG9MaW5lc1dpdGhDb250ZW50KHRleHQsIHRyaW0pLCBpID0gMCwgbWF4ID0gbGluZXMubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcbiAgICAgICAgIGNvbnN0IGxpbmUgPSAob2Zmc2V0ID0gMCkgPT4ge1xuICAgICAgICAgICAgaWYgKGkgKyBvZmZzZXQgPj0gbWF4KSB7XG4gICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbGluZXNbaSArIG9mZnNldF07XG4gICAgICAgICB9O1xuXG4gICAgICAgICBwYXJzZXJzLnNvbWUoKHsgcGFyc2UgfSkgPT4gcGFyc2UobGluZSwgcmVzdWx0KSk7XG4gICAgICB9XG4gICB9KTtcblxuICAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IE1heWJlLCBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgRXhpdENvZGVzIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZW51bSBDaGVja1JlcG9BY3Rpb25zIHtcbiAgIEJBUkUgPSAnYmFyZScsXG4gICBJTl9UUkVFID0gJ3RyZWUnLFxuICAgSVNfUkVQT19ST09UID0gJ3Jvb3QnLFxufVxuXG5jb25zdCBvbkVycm9yOiBTdHJpbmdUYXNrPGJvb2xlYW4+WydvbkVycm9yJ10gPSAoeyBleGl0Q29kZSB9LCBlcnJvciwgZG9uZSwgZmFpbCkgPT4ge1xuICAgaWYgKGV4aXRDb2RlID09PSBFeGl0Q29kZXMuVU5DTEVBTiAmJiBpc05vdFJlcG9NZXNzYWdlKGVycm9yKSkge1xuICAgICAgcmV0dXJuIGRvbmUoQnVmZmVyLmZyb20oJ2ZhbHNlJykpO1xuICAgfVxuXG4gICBmYWlsKGVycm9yKTtcbn07XG5cbmNvbnN0IHBhcnNlcjogU3RyaW5nVGFzazxib29sZWFuPlsncGFyc2VyJ10gPSAodGV4dCkgPT4ge1xuICAgcmV0dXJuIHRleHQudHJpbSgpID09PSAndHJ1ZSc7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tJc1JlcG9UYXNrKGFjdGlvbjogTWF5YmU8Q2hlY2tSZXBvQWN0aW9ucz4pOiBTdHJpbmdUYXNrPGJvb2xlYW4+IHtcbiAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlIENoZWNrUmVwb0FjdGlvbnMuQkFSRTpcbiAgICAgICAgIHJldHVybiBjaGVja0lzQmFyZVJlcG9UYXNrKCk7XG4gICAgICBjYXNlIENoZWNrUmVwb0FjdGlvbnMuSVNfUkVQT19ST09UOlxuICAgICAgICAgcmV0dXJuIGNoZWNrSXNSZXBvUm9vdFRhc2soKTtcbiAgIH1cblxuICAgY29uc3QgY29tbWFuZHMgPSBbJ3Jldi1wYXJzZScsICctLWlzLWluc2lkZS13b3JrLXRyZWUnXTtcblxuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgb25FcnJvcixcbiAgICAgIHBhcnNlcixcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0lzUmVwb1Jvb3RUYXNrKCk6IFN0cmluZ1Rhc2s8Ym9vbGVhbj4ge1xuICAgY29uc3QgY29tbWFuZHMgPSBbJ3Jldi1wYXJzZScsICctLWdpdC1kaXInXTtcblxuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgb25FcnJvcixcbiAgICAgIHBhcnNlcihwYXRoKSB7XG4gICAgICAgICByZXR1cm4gL15cXC4oZ2l0KT8kLy50ZXN0KHBhdGgudHJpbSgpKTtcbiAgICAgIH0sXG4gICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tJc0JhcmVSZXBvVGFzaygpOiBTdHJpbmdUYXNrPGJvb2xlYW4+IHtcbiAgIGNvbnN0IGNvbW1hbmRzID0gWydyZXYtcGFyc2UnLCAnLS1pcy1iYXJlLXJlcG9zaXRvcnknXTtcblxuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgb25FcnJvcixcbiAgICAgIHBhcnNlcixcbiAgIH07XG59XG5cbmZ1bmN0aW9uIGlzTm90UmVwb01lc3NhZ2UoZXJyb3I6IEVycm9yKTogYm9vbGVhbiB7XG4gICByZXR1cm4gLyhOb3QgYSBnaXQgcmVwb3NpdG9yeXxLZWluIEdpdC1SZXBvc2l0b3J5KS9pLnRlc3QoU3RyaW5nKGVycm9yKSk7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBDbGVhblN1bW1hcnkgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IHRvTGluZXNXaXRoQ29udGVudCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGNsYXNzIENsZWFuUmVzcG9uc2UgaW1wbGVtZW50cyBDbGVhblN1bW1hcnkge1xuICAgcHVibGljIHJlYWRvbmx5IHBhdGhzOiBzdHJpbmdbXTtcbiAgIHB1YmxpYyByZWFkb25seSBmaWxlczogc3RyaW5nW107XG4gICBwdWJsaWMgcmVhZG9ubHkgZm9sZGVyczogc3RyaW5nW107XG4gICBwdWJsaWMgcmVhZG9ubHkgZHJ5UnVuOiBib29sZWFuO1xuXG4gICBjb25zdHJ1Y3RvcihkcnlSdW46IGJvb2xlYW4pIHtcbiAgICAgIHRoaXMucGF0aHMgPSBbXTtcbiAgICAgIHRoaXMuZmlsZXMgPSBbXTtcbiAgICAgIHRoaXMuZm9sZGVycyA9IFtdO1xuICAgICAgdGhpcy5kcnlSdW4gPSBkcnlSdW47XG4gICB9XG59XG5cbmNvbnN0IHJlbW92YWxSZWdleHAgPSAvXlthLXpdK1xccyovaTtcbmNvbnN0IGRyeVJ1blJlbW92YWxSZWdleHAgPSAvXlthLXpdK1xccytbYS16XStcXHMqL2k7XG5jb25zdCBpc0ZvbGRlclJlZ2V4cCA9IC9cXC8kLztcblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuU3VtbWFyeVBhcnNlcihkcnlSdW46IGJvb2xlYW4sIHRleHQ6IHN0cmluZyk6IENsZWFuU3VtbWFyeSB7XG4gICBjb25zdCBzdW1tYXJ5ID0gbmV3IENsZWFuUmVzcG9uc2UoZHJ5UnVuKTtcbiAgIGNvbnN0IHJlZ2V4cCA9IGRyeVJ1biA/IGRyeVJ1blJlbW92YWxSZWdleHAgOiByZW1vdmFsUmVnZXhwO1xuXG4gICB0b0xpbmVzV2l0aENvbnRlbnQodGV4dCkuZm9yRWFjaCgobGluZSkgPT4ge1xuICAgICAgY29uc3QgcmVtb3ZlZCA9IGxpbmUucmVwbGFjZShyZWdleHAsICcnKTtcblxuICAgICAgc3VtbWFyeS5wYXRocy5wdXNoKHJlbW92ZWQpO1xuICAgICAgKGlzRm9sZGVyUmVnZXhwLnRlc3QocmVtb3ZlZCkgPyBzdW1tYXJ5LmZvbGRlcnMgOiBzdW1tYXJ5LmZpbGVzKS5wdXNoKHJlbW92ZWQpO1xuICAgfSk7XG5cbiAgIHJldHVybiBzdW1tYXJ5O1xufVxuIiwgImltcG9ydCB7IFRhc2tDb25maWd1cmF0aW9uRXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvdGFzay1jb25maWd1cmF0aW9uLWVycm9yJztcbmltcG9ydCB0eXBlIHsgQnVmZmVyVGFzaywgRW1wdHlUYXNrUGFyc2VyLCBTaW1wbGVHaXRUYXNrLCBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgY29uc3QgRU1QVFlfQ09NTUFORFM6IFtdID0gW107XG5cbmV4cG9ydCB0eXBlIEVtcHR5VGFzayA9IHtcbiAgIGNvbW1hbmRzOiB0eXBlb2YgRU1QVFlfQ09NTUFORFM7XG4gICBmb3JtYXQ6ICdlbXB0eSc7XG4gICBwYXJzZXI6IEVtcHR5VGFza1BhcnNlcjtcbiAgIG9uRXJyb3I/OiB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gYWRob2NFeGVjVGFzayhwYXJzZXI6IEVtcHR5VGFza1BhcnNlcik6IEVtcHR5VGFzayB7XG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHM6IEVNUFRZX0NPTU1BTkRTLFxuICAgICAgZm9ybWF0OiAnZW1wdHknLFxuICAgICAgcGFyc2VyLFxuICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyYXRpb25FcnJvclRhc2soZXJyb3I6IEVycm9yIHwgc3RyaW5nKTogRW1wdHlUYXNrIHtcbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kczogRU1QVFlfQ09NTUFORFMsXG4gICAgICBmb3JtYXQ6ICdlbXB0eScsXG4gICAgICBwYXJzZXIoKSB7XG4gICAgICAgICB0aHJvdyB0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnID8gbmV3IFRhc2tDb25maWd1cmF0aW9uRXJyb3IoZXJyb3IpIDogZXJyb3I7XG4gICAgICB9LFxuICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soY29tbWFuZHM6IHN0cmluZ1tdLCB0cmltbWVkID0gZmFsc2UpOiBTdHJpbmdUYXNrPHN0cmluZz4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgcGFyc2VyKHRleHQpIHtcbiAgICAgICAgIHJldHVybiB0cmltbWVkID8gU3RyaW5nKHRleHQpLnRyaW0oKSA6IHRleHQ7XG4gICAgICB9LFxuICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmFpZ2h0VGhyb3VnaEJ1ZmZlclRhc2soY29tbWFuZHM6IHN0cmluZ1tdKTogQnVmZmVyVGFzazxCdWZmZXI+IHtcbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kcyxcbiAgICAgIGZvcm1hdDogJ2J1ZmZlcicsXG4gICAgICBwYXJzZXIoYnVmZmVyKSB7XG4gICAgICAgICByZXR1cm4gYnVmZmVyO1xuICAgICAgfSxcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0J1ZmZlclRhc2s8Uj4odGFzazogU2ltcGxlR2l0VGFzazxSPik6IHRhc2sgaXMgQnVmZmVyVGFzazxSPiB7XG4gICByZXR1cm4gdGFzay5mb3JtYXQgPT09ICdidWZmZXInO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eVRhc2s8Uj4odGFzazogU2ltcGxlR2l0VGFzazxSPik6IHRhc2sgaXMgRW1wdHlUYXNrIHtcbiAgIHJldHVybiB0YXNrLmZvcm1hdCA9PT0gJ2VtcHR5JyB8fCAhdGFzay5jb21tYW5kcy5sZW5ndGg7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBDbGVhblN1bW1hcnkgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IGNsZWFuU3VtbWFyeVBhcnNlciB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2UtY2xlYW4nO1xuaW1wb3J0IHR5cGUgeyBNYXliZSwgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGFzU3RyaW5nQXJyYXkgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBjb25maWd1cmF0aW9uRXJyb3JUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZXhwb3J0IGNvbnN0IENPTkZJR19FUlJPUl9JTlRFUkFDVElWRV9NT0RFID0gJ0dpdCBjbGVhbiBpbnRlcmFjdGl2ZSBtb2RlIGlzIG5vdCBzdXBwb3J0ZWQnO1xuZXhwb3J0IGNvbnN0IENPTkZJR19FUlJPUl9NT0RFX1JFUVVJUkVEID0gJ0dpdCBjbGVhbiBtb2RlIHBhcmFtZXRlciAoXCJuXCIgb3IgXCJmXCIpIGlzIHJlcXVpcmVkJztcbmV4cG9ydCBjb25zdCBDT05GSUdfRVJST1JfVU5LTk9XTl9PUFRJT04gPSAnR2l0IGNsZWFuIHVua25vd24gb3B0aW9uIGZvdW5kIGluOiAnO1xuXG4vKipcbiAqIEFsbCBzdXBwb3J0ZWQgb3B0aW9uIHN3aXRjaGVzIGF2YWlsYWJsZSBmb3IgdXNlIGluIGEgYGdpdC5jbGVhbmAgb3BlcmF0aW9uXG4gKi9cbmV4cG9ydCBlbnVtIENsZWFuT3B0aW9ucyB7XG4gICBEUllfUlVOID0gJ24nLFxuICAgRk9SQ0UgPSAnZicsXG4gICBJR05PUkVEX0lOQ0xVREVEID0gJ3gnLFxuICAgSUdOT1JFRF9PTkxZID0gJ1gnLFxuICAgRVhDTFVESU5HID0gJ2UnLFxuICAgUVVJRVQgPSAncScsXG4gICBSRUNVUlNJVkUgPSAnZCcsXG59XG5cbi8qKlxuICogVGhlIHR3byBtb2RlcyBgZ2l0LmNsZWFuYCBjYW4gcnVuIGluIC0gb25lIG9mIHRoZXNlIG11c3QgYmUgc3VwcGxpZWQgaW4gb3JkZXJcbiAqIGZvciB0aGUgY29tbWFuZCB0byBub3QgdGhyb3cgYSBgVGFza0NvbmZpZ3VyYXRpb25FcnJvcmBcbiAqL1xuZXhwb3J0IHR5cGUgQ2xlYW5Nb2RlID0gQ2xlYW5PcHRpb25zLkZPUkNFIHwgQ2xlYW5PcHRpb25zLkRSWV9SVU47XG5cbmNvbnN0IENsZWFuT3B0aW9uVmFsdWVzOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQoW1xuICAgJ2knLFxuICAgLi4uYXNTdHJpbmdBcnJheShPYmplY3QudmFsdWVzKENsZWFuT3B0aW9ucyBhcyBhbnkpKSxcbl0pO1xuXG5leHBvcnQgZnVuY3Rpb24gY2xlYW5XaXRoT3B0aW9uc1Rhc2sobW9kZTogQ2xlYW5Nb2RlIHwgc3RyaW5nLCBjdXN0b21BcmdzOiBzdHJpbmdbXSkge1xuICAgY29uc3QgeyBjbGVhbk1vZGUsIG9wdGlvbnMsIHZhbGlkIH0gPSBnZXRDbGVhbk9wdGlvbnMobW9kZSk7XG5cbiAgIGlmICghY2xlYW5Nb2RlKSB7XG4gICAgICByZXR1cm4gY29uZmlndXJhdGlvbkVycm9yVGFzayhDT05GSUdfRVJST1JfTU9ERV9SRVFVSVJFRCk7XG4gICB9XG5cbiAgIGlmICghdmFsaWQub3B0aW9ucykge1xuICAgICAgcmV0dXJuIGNvbmZpZ3VyYXRpb25FcnJvclRhc2soQ09ORklHX0VSUk9SX1VOS05PV05fT1BUSU9OICsgSlNPTi5zdHJpbmdpZnkobW9kZSkpO1xuICAgfVxuXG4gICBvcHRpb25zLnB1c2goLi4uY3VzdG9tQXJncyk7XG5cbiAgIGlmIChvcHRpb25zLnNvbWUoaXNJbnRlcmFjdGl2ZU1vZGUpKSB7XG4gICAgICByZXR1cm4gY29uZmlndXJhdGlvbkVycm9yVGFzayhDT05GSUdfRVJST1JfSU5URVJBQ1RJVkVfTU9ERSk7XG4gICB9XG5cbiAgIHJldHVybiBjbGVhblRhc2soY2xlYW5Nb2RlLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuVGFzayhtb2RlOiBDbGVhbk1vZGUsIGN1c3RvbUFyZ3M6IHN0cmluZ1tdKTogU3RyaW5nVGFzazxDbGVhblN1bW1hcnk+IHtcbiAgIGNvbnN0IGNvbW1hbmRzOiBzdHJpbmdbXSA9IFsnY2xlYW4nLCBgLSR7bW9kZX1gLCAuLi5jdXN0b21BcmdzXTtcblxuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgcGFyc2VyKHRleHQ6IHN0cmluZyk6IENsZWFuU3VtbWFyeSB7XG4gICAgICAgICByZXR1cm4gY2xlYW5TdW1tYXJ5UGFyc2VyKG1vZGUgPT09IENsZWFuT3B0aW9ucy5EUllfUlVOLCB0ZXh0KTtcbiAgICAgIH0sXG4gICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDbGVhbk9wdGlvbnNBcnJheShpbnB1dDogc3RyaW5nW10pOiBpbnB1dCBpcyBDbGVhbk9wdGlvbnNbXSB7XG4gICByZXR1cm4gQXJyYXkuaXNBcnJheShpbnB1dCkgJiYgaW5wdXQuZXZlcnkoKHRlc3QpID0+IENsZWFuT3B0aW9uVmFsdWVzLmhhcyh0ZXN0KSk7XG59XG5cbmZ1bmN0aW9uIGdldENsZWFuT3B0aW9ucyhpbnB1dDogc3RyaW5nKSB7XG4gICBsZXQgY2xlYW5Nb2RlOiBNYXliZTxDbGVhbk1vZGU+O1xuICAgbGV0IG9wdGlvbnM6IHN0cmluZ1tdID0gW107XG4gICBsZXQgdmFsaWQgPSB7IGNsZWFuTW9kZTogZmFsc2UsIG9wdGlvbnM6IHRydWUgfTtcblxuICAgaW5wdXRcbiAgICAgIC5yZXBsYWNlKC9bXmEtel1pL2csICcnKVxuICAgICAgLnNwbGl0KCcnKVxuICAgICAgLmZvckVhY2goKGNoYXIpID0+IHtcbiAgICAgICAgIGlmIChpc0NsZWFuTW9kZShjaGFyKSkge1xuICAgICAgICAgICAgY2xlYW5Nb2RlID0gY2hhcjtcbiAgICAgICAgICAgIHZhbGlkLmNsZWFuTW9kZSA9IHRydWU7XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsaWQub3B0aW9ucyA9IHZhbGlkLm9wdGlvbnMgJiYgaXNLbm93bk9wdGlvbigob3B0aW9uc1tvcHRpb25zLmxlbmd0aF0gPSBgLSR7Y2hhcn1gKSk7XG4gICAgICAgICB9XG4gICAgICB9KTtcblxuICAgcmV0dXJuIHtcbiAgICAgIGNsZWFuTW9kZSxcbiAgICAgIG9wdGlvbnMsXG4gICAgICB2YWxpZCxcbiAgIH07XG59XG5cbmZ1bmN0aW9uIGlzQ2xlYW5Nb2RlKGNsZWFuTW9kZT86IHN0cmluZyk6IGNsZWFuTW9kZSBpcyBDbGVhbk1vZGUge1xuICAgcmV0dXJuIGNsZWFuTW9kZSA9PT0gQ2xlYW5PcHRpb25zLkZPUkNFIHx8IGNsZWFuTW9kZSA9PT0gQ2xlYW5PcHRpb25zLkRSWV9SVU47XG59XG5cbmZ1bmN0aW9uIGlzS25vd25PcHRpb24ob3B0aW9uOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgIHJldHVybiAvXi1bYS16XSQvaS50ZXN0KG9wdGlvbikgJiYgQ2xlYW5PcHRpb25WYWx1ZXMuaGFzKG9wdGlvbi5jaGFyQXQoMSkpO1xufVxuXG5mdW5jdGlvbiBpc0ludGVyYWN0aXZlTW9kZShvcHRpb246IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgaWYgKC9eLVteXFwtXS8udGVzdChvcHRpb24pKSB7XG4gICAgICByZXR1cm4gb3B0aW9uLmluZGV4T2YoJ2knKSA+IDA7XG4gICB9XG5cbiAgIHJldHVybiBvcHRpb24gPT09ICctLWludGVyYWN0aXZlJztcbn1cbiIsICJpbXBvcnQgdHlwZSB7IENvbmZpZ0dldFJlc3VsdCwgQ29uZmlnTGlzdFN1bW1hcnksIENvbmZpZ1ZhbHVlcyB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgbGFzdCwgc3BsaXRPbiB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGNsYXNzIENvbmZpZ0xpc3QgaW1wbGVtZW50cyBDb25maWdMaXN0U3VtbWFyeSB7XG4gICBwdWJsaWMgZmlsZXM6IHN0cmluZ1tdID0gW107XG4gICBwdWJsaWMgdmFsdWVzOiB7IFtmaWxlTmFtZTogc3RyaW5nXTogQ29uZmlnVmFsdWVzIH0gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICBwcml2YXRlIF9hbGw6IENvbmZpZ1ZhbHVlcyB8IHVuZGVmaW5lZDtcblxuICAgcHVibGljIGdldCBhbGwoKTogQ29uZmlnVmFsdWVzIHtcbiAgICAgIGlmICghdGhpcy5fYWxsKSB7XG4gICAgICAgICB0aGlzLl9hbGwgPSB0aGlzLmZpbGVzLnJlZHVjZSgoYWxsOiBDb25maWdWYWx1ZXMsIGZpbGU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oYWxsLCB0aGlzLnZhbHVlc1tmaWxlXSk7XG4gICAgICAgICB9LCB7fSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9hbGw7XG4gICB9XG5cbiAgIHB1YmxpYyBhZGRGaWxlKGZpbGU6IHN0cmluZyk6IENvbmZpZ1ZhbHVlcyB7XG4gICAgICBpZiAoIShmaWxlIGluIHRoaXMudmFsdWVzKSkge1xuICAgICAgICAgY29uc3QgbGF0ZXN0ID0gbGFzdCh0aGlzLmZpbGVzKTtcbiAgICAgICAgIHRoaXMudmFsdWVzW2ZpbGVdID0gbGF0ZXN0ID8gT2JqZWN0LmNyZWF0ZSh0aGlzLnZhbHVlc1tsYXRlc3RdKSA6IHt9O1xuXG4gICAgICAgICB0aGlzLmZpbGVzLnB1c2goZmlsZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnZhbHVlc1tmaWxlXTtcbiAgIH1cblxuICAgcHVibGljIGFkZFZhbHVlKGZpbGU6IHN0cmluZywga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMuYWRkRmlsZShmaWxlKTtcblxuICAgICAgaWYgKCFPYmplY3QuaGFzT3duKHZhbHVlcywga2V5KSkge1xuICAgICAgICAgdmFsdWVzW2tleV0gPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZXNba2V5XSkpIHtcbiAgICAgICAgICh2YWx1ZXNba2V5XSBhcyBzdHJpbmdbXSkucHVzaCh2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgdmFsdWVzW2tleV0gPSBbdmFsdWVzW2tleV0gYXMgc3RyaW5nLCB2YWx1ZV07XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2FsbCA9IHVuZGVmaW5lZDtcbiAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ0xpc3RQYXJzZXIodGV4dDogc3RyaW5nKTogQ29uZmlnTGlzdCB7XG4gICBjb25zdCBjb25maWcgPSBuZXcgQ29uZmlnTGlzdCgpO1xuXG4gICBmb3IgKGNvbnN0IGl0ZW0gb2YgY29uZmlnUGFyc2VyKHRleHQpKSB7XG4gICAgICBjb25maWcuYWRkVmFsdWUoaXRlbS5maWxlLCBTdHJpbmcoaXRlbS5rZXkpLCBpdGVtLnZhbHVlKTtcbiAgIH1cblxuICAgcmV0dXJuIGNvbmZpZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ0dldFBhcnNlcih0ZXh0OiBzdHJpbmcsIGtleTogc3RyaW5nKTogQ29uZmlnR2V0UmVzdWx0IHtcbiAgIGxldCB2YWx1ZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICBjb25zdCB2YWx1ZXM6IHN0cmluZ1tdID0gW107XG4gICBjb25zdCBzY29wZXM6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPiA9IG5ldyBNYXAoKTtcblxuICAgZm9yIChjb25zdCBpdGVtIG9mIGNvbmZpZ1BhcnNlcih0ZXh0LCBrZXkpKSB7XG4gICAgICBpZiAoaXRlbS5rZXkgIT09IGtleSkge1xuICAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHZhbHVlcy5wdXNoKCh2YWx1ZSA9IGl0ZW0udmFsdWUpKTtcblxuICAgICAgaWYgKCFzY29wZXMuaGFzKGl0ZW0uZmlsZSkpIHtcbiAgICAgICAgIHNjb3Blcy5zZXQoaXRlbS5maWxlLCBbXSk7XG4gICAgICB9XG5cbiAgICAgIHNjb3Blcy5nZXQoaXRlbS5maWxlKSEucHVzaCh2YWx1ZSk7XG4gICB9XG5cbiAgIHJldHVybiB7XG4gICAgICBrZXksXG4gICAgICBwYXRoczogQXJyYXkuZnJvbShzY29wZXMua2V5cygpKSxcbiAgICAgIHNjb3BlcyxcbiAgICAgIHZhbHVlLFxuICAgICAgdmFsdWVzLFxuICAgfTtcbn1cblxuZnVuY3Rpb24gY29uZmlnRmlsZVBhdGgoZmlsZVBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gICByZXR1cm4gZmlsZVBhdGgucmVwbGFjZSgvXihmaWxlKTovLCAnJyk7XG59XG5cbmZ1bmN0aW9uKiBjb25maWdQYXJzZXIodGV4dDogc3RyaW5nLCByZXF1ZXN0ZWRLZXk6IHN0cmluZyB8IG51bGwgPSBudWxsKSB7XG4gICBjb25zdCBsaW5lcyA9IHRleHQuc3BsaXQoJ1xcMCcpO1xuXG4gICBmb3IgKGxldCBpID0gMCwgbWF4ID0gbGluZXMubGVuZ3RoIC0gMTsgaSA8IG1heDsgKSB7XG4gICAgICBjb25zdCBmaWxlID0gY29uZmlnRmlsZVBhdGgobGluZXNbaSsrXSk7XG5cbiAgICAgIGxldCB2YWx1ZSA9IGxpbmVzW2krK107XG4gICAgICBsZXQga2V5ID0gcmVxdWVzdGVkS2V5O1xuXG4gICAgICBpZiAodmFsdWUuaW5jbHVkZXMoJ1xcbicpKSB7XG4gICAgICAgICBjb25zdCBsaW5lID0gc3BsaXRPbih2YWx1ZSwgJ1xcbicpO1xuICAgICAgICAga2V5ID0gbGluZVswXTtcbiAgICAgICAgIHZhbHVlID0gbGluZVsxXTtcbiAgICAgIH1cblxuICAgICAgeWllbGQgeyBmaWxlLCBrZXksIHZhbHVlIH07XG4gICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBDb25maWdHZXRSZXN1bHQsIENvbmZpZ0xpc3RTdW1tYXJ5LCBTaW1wbGVHaXQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IGNvbmZpZ0dldFBhcnNlciwgY29uZmlnTGlzdFBhcnNlciB9IGZyb20gJy4uL3Jlc3BvbnNlcy9Db25maWdMaXN0JztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0QXBpIH0gZnJvbSAnLi4vc2ltcGxlLWdpdC1hcGknO1xuaW1wb3J0IHR5cGUgeyBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50IH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZW51bSBHaXRDb25maWdTY29wZSB7XG4gICBzeXN0ZW0gPSAnc3lzdGVtJyxcbiAgIGdsb2JhbCA9ICdnbG9iYWwnLFxuICAgbG9jYWwgPSAnbG9jYWwnLFxuICAgd29ya3RyZWUgPSAnd29ya3RyZWUnLFxufVxuXG5mdW5jdGlvbiBhc0NvbmZpZ1Njb3BlPFQgZXh0ZW5kcyBHaXRDb25maWdTY29wZSB8IHVuZGVmaW5lZD4oXG4gICBzY29wZTogR2l0Q29uZmlnU2NvcGUgfCB1bmtub3duLFxuICAgZmFsbGJhY2s6IFRcbik6IEdpdENvbmZpZ1Njb3BlIHwgVCB7XG4gICBpZiAodHlwZW9mIHNjb3BlID09PSAnc3RyaW5nJyAmJiBPYmplY3QuaGFzT3duKEdpdENvbmZpZ1Njb3BlLCBzY29wZSkpIHtcbiAgICAgIHJldHVybiBzY29wZSBhcyBHaXRDb25maWdTY29wZTtcbiAgIH1cbiAgIHJldHVybiBmYWxsYmFjaztcbn1cblxuZnVuY3Rpb24gYWRkQ29uZmlnVGFzayhcbiAgIGtleTogc3RyaW5nLFxuICAgdmFsdWU6IHN0cmluZyxcbiAgIGFwcGVuZDogYm9vbGVhbixcbiAgIHNjb3BlOiBHaXRDb25maWdTY29wZVxuKTogU3RyaW5nVGFzazxzdHJpbmc+IHtcbiAgIGNvbnN0IGNvbW1hbmRzOiBzdHJpbmdbXSA9IFsnY29uZmlnJywgYC0tJHtzY29wZX1gXTtcblxuICAgaWYgKGFwcGVuZCkge1xuICAgICAgY29tbWFuZHMucHVzaCgnLS1hZGQnKTtcbiAgIH1cblxuICAgY29tbWFuZHMucHVzaChrZXksIHZhbHVlKTtcblxuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgcGFyc2VyKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgIH0sXG4gICB9O1xufVxuXG5mdW5jdGlvbiBnZXRDb25maWdUYXNrKGtleTogc3RyaW5nLCBzY29wZT86IEdpdENvbmZpZ1Njb3BlKTogU3RyaW5nVGFzazxDb25maWdHZXRSZXN1bHQ+IHtcbiAgIGNvbnN0IGNvbW1hbmRzOiBzdHJpbmdbXSA9IFsnY29uZmlnJywgJy0tbnVsbCcsICctLXNob3ctb3JpZ2luJywgJy0tZ2V0LWFsbCcsIGtleV07XG5cbiAgIGlmIChzY29wZSkge1xuICAgICAgY29tbWFuZHMuc3BsaWNlKDEsIDAsIGAtLSR7c2NvcGV9YCk7XG4gICB9XG5cbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kcyxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIHBhcnNlcih0ZXh0KSB7XG4gICAgICAgICByZXR1cm4gY29uZmlnR2V0UGFyc2VyKHRleHQsIGtleSk7XG4gICAgICB9LFxuICAgfTtcbn1cblxuZnVuY3Rpb24gbGlzdENvbmZpZ1Rhc2soc2NvcGU/OiBHaXRDb25maWdTY29wZSk6IFN0cmluZ1Rhc2s8Q29uZmlnTGlzdFN1bW1hcnk+IHtcbiAgIGNvbnN0IGNvbW1hbmRzID0gWydjb25maWcnLCAnLS1saXN0JywgJy0tc2hvdy1vcmlnaW4nLCAnLS1udWxsJ107XG5cbiAgIGlmIChzY29wZSkge1xuICAgICAgY29tbWFuZHMucHVzaChgLS0ke3Njb3BlfWApO1xuICAgfVxuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXIodGV4dDogc3RyaW5nKSB7XG4gICAgICAgICByZXR1cm4gY29uZmlnTGlzdFBhcnNlcih0ZXh0KTtcbiAgICAgIH0sXG4gICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKTogUGljazxTaW1wbGVHaXQsICdhZGRDb25maWcnIHwgJ2dldENvbmZpZycgfCAnbGlzdENvbmZpZyc+IHtcbiAgIHJldHVybiB7XG4gICAgICBhZGRDb25maWcodGhpczogU2ltcGxlR2l0QXBpLCBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZywgLi4ucmVzdDogdW5rbm93bltdKSB7XG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgICAgIGFkZENvbmZpZ1Rhc2soXG4gICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgIHJlc3RbMF0gPT09IHRydWUsXG4gICAgICAgICAgICAgICBhc0NvbmZpZ1Njb3BlKHJlc3RbMV0sIEdpdENvbmZpZ1Njb3BlLmxvY2FsKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICAgICApO1xuICAgICAgfSxcblxuICAgICAgZ2V0Q29uZmlnKHRoaXM6IFNpbXBsZUdpdEFwaSwga2V5OiBzdHJpbmcsIHNjb3BlPzogR2l0Q29uZmlnU2NvcGUpIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgZ2V0Q29uZmlnVGFzayhrZXksIGFzQ29uZmlnU2NvcGUoc2NvcGUsIHVuZGVmaW5lZCkpLFxuICAgICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICAgICAgICk7XG4gICAgICB9LFxuXG4gICAgICBsaXN0Q29uZmlnKHRoaXM6IFNpbXBsZUdpdEFwaSwgLi4ucmVzdDogdW5rbm93bltdKSB7XG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgICAgIGxpc3RDb25maWdUYXNrKGFzQ29uZmlnU2NvcGUocmVzdFswXSwgdW5kZWZpbmVkKSksXG4gICAgICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgICAgKTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImV4cG9ydCBlbnVtIERpZmZOYW1lU3RhdHVzIHtcbiAgIEFEREVEID0gJ0EnLFxuICAgQ09QSUVEID0gJ0MnLFxuICAgREVMRVRFRCA9ICdEJyxcbiAgIE1PRElGSUVEID0gJ00nLFxuICAgUkVOQU1FRCA9ICdSJyxcbiAgIENIQU5HRUQgPSAnVCcsXG4gICBVTk1FUkdFRCA9ICdVJyxcbiAgIFVOS05PV04gPSAnWCcsXG4gICBCUk9LRU4gPSAnQicsXG59XG5cbmNvbnN0IGRpZmZOYW1lU3RhdHVzID0gbmV3IFNldChPYmplY3QudmFsdWVzKERpZmZOYW1lU3RhdHVzKSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RpZmZOYW1lU3RhdHVzKGlucHV0OiBzdHJpbmcpOiBpbnB1dCBpcyBEaWZmTmFtZVN0YXR1cyB7XG4gICByZXR1cm4gZGlmZk5hbWVTdGF0dXMuaGFzKGlucHV0IGFzIERpZmZOYW1lU3RhdHVzKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IEdyZXBSZXN1bHQsIFNpbXBsZUdpdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRBcGkgfSBmcm9tICcuLi9zaW1wbGUtZ2l0LWFwaSc7XG5pbXBvcnQge1xuICAgYXNOdW1iZXIsXG4gICBmb3JFYWNoTGluZVdpdGhDb250ZW50LFxuICAgZ2V0VHJhaWxpbmdPcHRpb25zLFxuICAgTlVMTCxcbiAgIHByZWZpeGVkQXJyYXksXG4gICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQsXG59IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb25FcnJvclRhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5jb25zdCBkaXNhbGxvd2VkT3B0aW9ucyA9IFsnLWgnXTtcblxuY29uc3QgUXVlcnkgPSBTeW1ib2woJ2dyZXBRdWVyeScpO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdpdEdyZXBRdWVyeSBleHRlbmRzIEl0ZXJhYmxlPHN0cmluZz4ge1xuICAgLyoqIEFkZHMgb25lIG9yIG1vcmUgdGVybXMgdG8gYmUgZ3JvdXBlZCBhcyBhbiBcImFuZFwiIHRvIGFueSBvdGhlciB0ZXJtcyAqL1xuICAgYW5kKC4uLmFuZDogc3RyaW5nW10pOiB0aGlzO1xuXG4gICAvKiogQWRkcyBvbmUgb3IgbW9yZSBzZWFyY2ggdGVybXMgLSBnaXQuZ3JlcCB3aWxsIFwib3JcIiB0aGlzIHRvIG90aGVyIHRlcm1zICovXG4gICBwYXJhbSguLi5wYXJhbTogc3RyaW5nW10pOiB0aGlzO1xufVxuXG5jbGFzcyBHcmVwUXVlcnkgaW1wbGVtZW50cyBHaXRHcmVwUXVlcnkge1xuICAgcHJpdmF0ZSBbUXVlcnldOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAqW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgICBmb3IgKGNvbnN0IHF1ZXJ5IG9mIHRoaXNbUXVlcnldKSB7XG4gICAgICAgICB5aWVsZCBxdWVyeTtcbiAgICAgIH1cbiAgIH1cblxuICAgYW5kKC4uLmFuZDogc3RyaW5nW10pIHtcbiAgICAgIGFuZC5sZW5ndGggJiYgdGhpc1tRdWVyeV0ucHVzaCgnLS1hbmQnLCAnKCcsIC4uLnByZWZpeGVkQXJyYXkoYW5kLCAnLWUnKSwgJyknKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgfVxuXG4gICBwYXJhbSguLi5wYXJhbTogc3RyaW5nW10pIHtcbiAgICAgIHRoaXNbUXVlcnldLnB1c2goLi4ucHJlZml4ZWRBcnJheShwYXJhbSwgJy1lJykpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBidWlsZGVyIGZvciBhIGBnaXQuZ3JlcGAgcXVlcnkgd2l0aCBvcHRpb25hbCBwYXJhbXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdyZXBRdWVyeUJ1aWxkZXIoLi4ucGFyYW1zOiBzdHJpbmdbXSk6IEdpdEdyZXBRdWVyeSB7XG4gICByZXR1cm4gbmV3IEdyZXBRdWVyeSgpLnBhcmFtKC4uLnBhcmFtcyk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlR3JlcChncmVwOiBzdHJpbmcpOiBHcmVwUmVzdWx0IHtcbiAgIGNvbnN0IHBhdGhzOiBHcmVwUmVzdWx0WydwYXRocyddID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICBjb25zdCByZXN1bHRzOiBHcmVwUmVzdWx0WydyZXN1bHRzJ10gPSB7fTtcblxuICAgZm9yRWFjaExpbmVXaXRoQ29udGVudChncmVwLCAoaW5wdXQpID0+IHtcbiAgICAgIGNvbnN0IFtwYXRoLCBsaW5lLCBwcmV2aWV3XSA9IGlucHV0LnNwbGl0KE5VTEwpO1xuICAgICAgcGF0aHMuYWRkKHBhdGgpO1xuICAgICAgKHJlc3VsdHNbcGF0aF0gPSByZXN1bHRzW3BhdGhdIHx8IFtdKS5wdXNoKHtcbiAgICAgICAgIGxpbmU6IGFzTnVtYmVyKGxpbmUpLFxuICAgICAgICAgcGF0aCxcbiAgICAgICAgIHByZXZpZXcsXG4gICAgICB9KTtcbiAgIH0pO1xuXG4gICByZXR1cm4ge1xuICAgICAgcGF0aHMsXG4gICAgICByZXN1bHRzLFxuICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCk6IFBpY2s8U2ltcGxlR2l0LCAnZ3JlcCc+IHtcbiAgIHJldHVybiB7XG4gICAgICBncmVwKHRoaXM6IFNpbXBsZUdpdEFwaSwgc2VhcmNoVGVybTogc3RyaW5nIHwgR2l0R3JlcFF1ZXJ5KSB7XG4gICAgICAgICBjb25zdCB0aGVuID0gdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cyk7XG4gICAgICAgICBjb25zdCBvcHRpb25zID0gZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cyk7XG5cbiAgICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIGRpc2FsbG93ZWRPcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5pbmNsdWRlcyhvcHRpb24pKSB7XG4gICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25FcnJvclRhc2soYGdpdC5ncmVwOiB1c2Ugb2YgXCIke29wdGlvbn1cIiBpcyBub3Qgc3VwcG9ydGVkLmApLFxuICAgICAgICAgICAgICAgICAgdGhlblxuICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH1cblxuICAgICAgICAgaWYgKHR5cGVvZiBzZWFyY2hUZXJtID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgc2VhcmNoVGVybSA9IGdyZXBRdWVyeUJ1aWxkZXIoKS5wYXJhbShzZWFyY2hUZXJtKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgY29uc3QgY29tbWFuZHMgPSBbJ2dyZXAnLCAnLS1udWxsJywgJy1uJywgJy0tZnVsbC1uYW1lJywgLi4ub3B0aW9ucywgLi4uc2VhcmNoVGVybV07XG5cbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgY29tbWFuZHMsXG4gICAgICAgICAgICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICAgICAgICAgICBwYXJzZXIoc3RkT3V0KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VHcmVwKHN0ZE91dCk7XG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoZW5cbiAgICAgICAgICk7XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IE1heWJlLCBPcHRpb25GbGFncywgT3B0aW9ucyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGFzU3RyaW5nQXJyYXkgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZXhwb3J0IGVudW0gUmVzZXRNb2RlIHtcbiAgIE1JWEVEID0gJ21peGVkJyxcbiAgIFNPRlQgPSAnc29mdCcsXG4gICBIQVJEID0gJ2hhcmQnLFxuICAgTUVSR0UgPSAnbWVyZ2UnLFxuICAgS0VFUCA9ICdrZWVwJyxcbn1cblxuY29uc3QgdmFsaWRSZXNldE1vZGVzID0gYXNTdHJpbmdBcnJheShPYmplY3QudmFsdWVzKFJlc2V0TW9kZSkpO1xuXG5leHBvcnQgdHlwZSBSZXNldE9wdGlvbnMgPSBPcHRpb25zICZcbiAgIE9wdGlvbkZsYWdzPCctcScgfCAnLS1xdWlldCcgfCAnLS1uby1xdWlldCcgfCAnLS1wYXRoc3BlYy1mcm9tLW51bCc+ICZcbiAgIE9wdGlvbkZsYWdzPCctLXBhdGhzcGVjLWZyb20tZmlsZScsIHN0cmluZz47XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNldFRhc2sobW9kZTogTWF5YmU8UmVzZXRNb2RlPiwgY3VzdG9tQXJnczogc3RyaW5nW10pIHtcbiAgIGNvbnN0IGNvbW1hbmRzOiBzdHJpbmdbXSA9IFsncmVzZXQnXTtcbiAgIGlmIChpc1ZhbGlkUmVzZXRNb2RlKG1vZGUpKSB7XG4gICAgICBjb21tYW5kcy5wdXNoKGAtLSR7bW9kZX1gKTtcbiAgIH1cbiAgIGNvbW1hbmRzLnB1c2goLi4uY3VzdG9tQXJncyk7XG5cbiAgIHJldHVybiBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKGNvbW1hbmRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlc2V0TW9kZShtb2RlOiBSZXNldE1vZGUgfCB1bmtub3duKTogTWF5YmU8UmVzZXRNb2RlPiB7XG4gICBpZiAoaXNWYWxpZFJlc2V0TW9kZShtb2RlKSkge1xuICAgICAgcmV0dXJuIG1vZGU7XG4gICB9XG5cbiAgIHN3aXRjaCAodHlwZW9mIG1vZGUpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgICAgcmV0dXJuIFJlc2V0TW9kZS5TT0ZUO1xuICAgfVxuXG4gICByZXR1cm47XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRSZXNldE1vZGUobW9kZTogUmVzZXRNb2RlIHwgdW5rbm93bik6IG1vZGUgaXMgUmVzZXRNb2RlIHtcbiAgIHJldHVybiB0eXBlb2YgbW9kZSA9PT0gJ3N0cmluZycgJiYgdmFsaWRSZXNldE1vZGVzLmluY2x1ZGVzKG1vZGUpO1xufVxuIiwgImltcG9ydCBkZWJ1ZywgeyB0eXBlIERlYnVnZ2VyIH0gZnJvbSAnZGVidWcnO1xuXG5pbXBvcnQgdHlwZSB7IE1heWJlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge1xuICAgYXBwZW5kLFxuICAgZmlsdGVySGFzTGVuZ3RoLFxuICAgZmlsdGVyU3RyaW5nLFxuICAgZmlsdGVyVHlwZSxcbiAgIE5PT1AsXG4gICBvYmplY3RUb1N0cmluZyxcbiAgIHJlbW92ZSxcbn0gZnJvbSAnLi91dGlscyc7XG5cbmRlYnVnLmZvcm1hdHRlcnMuTCA9ICh2YWx1ZTogYW55KSA9PiBTdHJpbmcoZmlsdGVySGFzTGVuZ3RoKHZhbHVlKSA/IHZhbHVlLmxlbmd0aCA6ICctJyk7XG5kZWJ1Zy5mb3JtYXR0ZXJzLkIgPSAodmFsdWU6IEJ1ZmZlcikgPT4ge1xuICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygndXRmOCcpO1xuICAgfVxuICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn07XG5cbnR5cGUgT3V0cHV0TG9nZ2luZ0hhbmRsZXIgPSAobWVzc2FnZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkgPT4gdm9pZDtcblxuZnVuY3Rpb24gY3JlYXRlTG9nKCkge1xuICAgcmV0dXJuIGRlYnVnKCdzaW1wbGUtZ2l0Jyk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3V0cHV0TG9nZ2VyIGV4dGVuZHMgT3V0cHV0TG9nZ2luZ0hhbmRsZXIge1xuICAgcmVhZG9ubHkgbGFiZWw6IHN0cmluZztcblxuICAgaW5mbzogT3V0cHV0TG9nZ2luZ0hhbmRsZXI7XG4gICBzdGVwKG5leHRTdGVwPzogc3RyaW5nKTogT3V0cHV0TG9nZ2VyO1xuICAgc2libGluZyhuYW1lOiBzdHJpbmcpOiBPdXRwdXRMb2dnZXI7XG59XG5cbmZ1bmN0aW9uIHByZWZpeGVkTG9nZ2VyKFxuICAgdG86IERlYnVnZ2VyLFxuICAgcHJlZml4OiBzdHJpbmcsXG4gICBmb3J3YXJkPzogT3V0cHV0TG9nZ2luZ0hhbmRsZXJcbik6IE91dHB1dExvZ2dpbmdIYW5kbGVyIHtcbiAgIGlmICghcHJlZml4IHx8ICFTdHJpbmcocHJlZml4KS5yZXBsYWNlKC9cXHMqLywgJycpKSB7XG4gICAgICByZXR1cm4gIWZvcndhcmRcbiAgICAgICAgID8gdG9cbiAgICAgICAgIDogKG1lc3NhZ2UsIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgdG8obWVzc2FnZSwgLi4uYXJncyk7XG4gICAgICAgICAgICAgIGZvcndhcmQobWVzc2FnZSwgLi4uYXJncyk7XG4gICAgICAgICAgIH07XG4gICB9XG5cbiAgIHJldHVybiAobWVzc2FnZSwgLi4uYXJncykgPT4ge1xuICAgICAgdG8oYCVzICR7bWVzc2FnZX1gLCBwcmVmaXgsIC4uLmFyZ3MpO1xuICAgICAgaWYgKGZvcndhcmQpIHtcbiAgICAgICAgIGZvcndhcmQobWVzc2FnZSwgLi4uYXJncyk7XG4gICAgICB9XG4gICB9O1xufVxuXG5mdW5jdGlvbiBjaGlsZExvZ2dlck5hbWUoXG4gICBuYW1lOiBNYXliZTxzdHJpbmc+LFxuICAgY2hpbGREZWJ1Z2dlcjogTWF5YmU8RGVidWdnZXI+LFxuICAgeyBuYW1lc3BhY2U6IHBhcmVudE5hbWVzcGFjZSB9OiBEZWJ1Z2dlclxuKTogc3RyaW5nIHtcbiAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBuYW1lO1xuICAgfVxuICAgY29uc3QgY2hpbGROYW1lc3BhY2UgPSAoY2hpbGREZWJ1Z2dlciAmJiBjaGlsZERlYnVnZ2VyLm5hbWVzcGFjZSkgfHwgJyc7XG5cbiAgIGlmIChjaGlsZE5hbWVzcGFjZS5zdGFydHNXaXRoKHBhcmVudE5hbWVzcGFjZSkpIHtcbiAgICAgIHJldHVybiBjaGlsZE5hbWVzcGFjZS5zdWJzdHIocGFyZW50TmFtZXNwYWNlLmxlbmd0aCArIDEpO1xuICAgfVxuXG4gICByZXR1cm4gY2hpbGROYW1lc3BhY2UgfHwgcGFyZW50TmFtZXNwYWNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTG9nZ2VyKFxuICAgbGFiZWw6IHN0cmluZyxcbiAgIHZlcmJvc2U/OiBzdHJpbmcgfCBEZWJ1Z2dlcixcbiAgIGluaXRpYWxTdGVwPzogc3RyaW5nLFxuICAgaW5mb0RlYnVnZ2VyID0gY3JlYXRlTG9nKClcbik6IE91dHB1dExvZ2dlciB7XG4gICBjb25zdCBsYWJlbFByZWZpeCA9IChsYWJlbCAmJiBgWyR7bGFiZWx9XWApIHx8ICcnO1xuXG4gICBjb25zdCBzcGF3bmVkOiBPdXRwdXRMb2dnZXJbXSA9IFtdO1xuICAgY29uc3QgZGVidWdEZWJ1Z2dlcjogTWF5YmU8RGVidWdnZXI+ID1cbiAgICAgIHR5cGVvZiB2ZXJib3NlID09PSAnc3RyaW5nJyA/IGluZm9EZWJ1Z2dlci5leHRlbmQodmVyYm9zZSkgOiB2ZXJib3NlO1xuICAgY29uc3Qga2V5ID0gY2hpbGRMb2dnZXJOYW1lKGZpbHRlclR5cGUodmVyYm9zZSwgZmlsdGVyU3RyaW5nKSwgZGVidWdEZWJ1Z2dlciwgaW5mb0RlYnVnZ2VyKTtcblxuICAgcmV0dXJuIHN0ZXAoaW5pdGlhbFN0ZXApO1xuXG4gICBmdW5jdGlvbiBzaWJsaW5nKG5hbWU6IHN0cmluZywgaW5pdGlhbD86IHN0cmluZykge1xuICAgICAgcmV0dXJuIGFwcGVuZChcbiAgICAgICAgIHNwYXduZWQsXG4gICAgICAgICBjcmVhdGVMb2dnZXIobGFiZWwsIGtleS5yZXBsYWNlKC9eW146XSsvLCBuYW1lKSwgaW5pdGlhbCwgaW5mb0RlYnVnZ2VyKVxuICAgICAgKTtcbiAgIH1cblxuICAgZnVuY3Rpb24gc3RlcChwaGFzZT86IHN0cmluZykge1xuICAgICAgY29uc3Qgc3RlcFByZWZpeCA9IChwaGFzZSAmJiBgWyR7cGhhc2V9XWApIHx8ICcnO1xuICAgICAgY29uc3QgZGVidWcgPSAoZGVidWdEZWJ1Z2dlciAmJiBwcmVmaXhlZExvZ2dlcihkZWJ1Z0RlYnVnZ2VyLCBzdGVwUHJlZml4KSkgfHwgTk9PUDtcbiAgICAgIGNvbnN0IGluZm8gPSBwcmVmaXhlZExvZ2dlcihpbmZvRGVidWdnZXIsIGAke2xhYmVsUHJlZml4fSAke3N0ZXBQcmVmaXh9YCwgZGVidWcpO1xuXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihkZWJ1Z0RlYnVnZ2VyID8gZGVidWcgOiBpbmZvLCB7XG4gICAgICAgICBsYWJlbCxcbiAgICAgICAgIHNpYmxpbmcsXG4gICAgICAgICBpbmZvLFxuICAgICAgICAgc3RlcCxcbiAgICAgIH0pO1xuICAgfVxufVxuXG4vKipcbiAqIFRoZSBgR2l0TG9nZ2VyYCBpcyB1c2VkIGJ5IHRoZSBtYWluIGBTaW1wbGVHaXRgIHJ1bm5lciB0byBoYW5kbGUgbG9nZ2luZ1xuICogYW55IHdhcm5pbmdzIG9yIGVycm9ycy5cbiAqL1xuZXhwb3J0IGNsYXNzIEdpdExvZ2dlciB7XG4gICBwdWJsaWMgZXJyb3I6IE91dHB1dExvZ2dpbmdIYW5kbGVyO1xuXG4gICBwdWJsaWMgd2FybjogT3V0cHV0TG9nZ2luZ0hhbmRsZXI7XG5cbiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX291dDogRGVidWdnZXIgPSBjcmVhdGVMb2coKSkge1xuICAgICAgdGhpcy5lcnJvciA9IHByZWZpeGVkTG9nZ2VyKF9vdXQsICdbRVJST1JdJyk7XG4gICAgICB0aGlzLndhcm4gPSBwcmVmaXhlZExvZ2dlcihfb3V0LCAnW1dBUk5dJyk7XG4gICB9XG5cbiAgIHNpbGVudChzaWxlbmNlID0gZmFsc2UpIHtcbiAgICAgIGlmIChzaWxlbmNlICE9PSB0aGlzLl9vdXQuZW5hYmxlZCkge1xuICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IG5hbWVzcGFjZSB9ID0gdGhpcy5fb3V0O1xuICAgICAgY29uc3QgZW52ID0gKHByb2Nlc3MuZW52LkRFQlVHIHx8ICcnKS5zcGxpdCgnLCcpLmZpbHRlcigocykgPT4gISFzKTtcbiAgICAgIGNvbnN0IGhhc09uID0gZW52LmluY2x1ZGVzKG5hbWVzcGFjZSk7XG4gICAgICBjb25zdCBoYXNPZmYgPSBlbnYuaW5jbHVkZXMoYC0ke25hbWVzcGFjZX1gKTtcblxuICAgICAgLy8gZW5hYmxpbmcgdGhlIGxvZ1xuICAgICAgaWYgKCFzaWxlbmNlKSB7XG4gICAgICAgICBpZiAoaGFzT2ZmKSB7XG4gICAgICAgICAgICByZW1vdmUoZW52LCBgLSR7bmFtZXNwYWNlfWApO1xuICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVudi5wdXNoKG5hbWVzcGFjZSk7XG4gICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgaWYgKGhhc09uKSB7XG4gICAgICAgICAgICByZW1vdmUoZW52LCBuYW1lc3BhY2UpO1xuICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVudi5wdXNoKGAtJHtuYW1lc3BhY2V9YCk7XG4gICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGRlYnVnLmVuYWJsZShlbnYuam9pbignLCcpKTtcbiAgIH1cbn1cbiIsICJpbXBvcnQgeyBHaXRFcnJvciB9IGZyb20gJy4uL2Vycm9ycy9naXQtZXJyb3InO1xuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyLCB0eXBlIE91dHB1dExvZ2dlciB9IGZyb20gJy4uL2dpdC1sb2dnZXInO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG50eXBlIEFueVNpbXBsZUdpdFRhc2sgPSBTaW1wbGVHaXRUYXNrPGFueT47XG5cbnR5cGUgVGFza0luUHJvZ3Jlc3MgPSB7XG4gICBuYW1lOiBzdHJpbmc7XG4gICBsb2dnZXI6IE91dHB1dExvZ2dlcjtcbiAgIHRhc2s6IEFueVNpbXBsZUdpdFRhc2s7XG59O1xuXG5leHBvcnQgY2xhc3MgVGFza3NQZW5kaW5nUXVldWUge1xuICAgcHJpdmF0ZSBfcXVldWU6IE1hcDxBbnlTaW1wbGVHaXRUYXNrLCBUYXNrSW5Qcm9ncmVzcz4gPSBuZXcgTWFwKCk7XG5cbiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9nTGFiZWwgPSAnR2l0RXhlY3V0b3InKSB7fVxuXG4gICBwcml2YXRlIHdpdGhQcm9ncmVzcyh0YXNrOiBBbnlTaW1wbGVHaXRUYXNrKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcXVldWUuZ2V0KHRhc2spO1xuICAgfVxuXG4gICBwcml2YXRlIGNyZWF0ZVByb2dyZXNzKHRhc2s6IEFueVNpbXBsZUdpdFRhc2spOiBUYXNrSW5Qcm9ncmVzcyB7XG4gICAgICBjb25zdCBuYW1lID0gVGFza3NQZW5kaW5nUXVldWUuZ2V0TmFtZSh0YXNrLmNvbW1hbmRzWzBdKTtcbiAgICAgIGNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcih0aGlzLmxvZ0xhYmVsLCBuYW1lKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgIHRhc2ssXG4gICAgICAgICBsb2dnZXIsXG4gICAgICAgICBuYW1lLFxuICAgICAgfTtcbiAgIH1cblxuICAgcHVzaCh0YXNrOiBBbnlTaW1wbGVHaXRUYXNrKTogVGFza0luUHJvZ3Jlc3Mge1xuICAgICAgY29uc3QgcHJvZ3Jlc3MgPSB0aGlzLmNyZWF0ZVByb2dyZXNzKHRhc2spO1xuICAgICAgcHJvZ3Jlc3MubG9nZ2VyKCdBZGRpbmcgdGFzayB0byB0aGUgcXVldWUsIGNvbW1hbmRzID0gJW8nLCB0YXNrLmNvbW1hbmRzKTtcblxuICAgICAgdGhpcy5fcXVldWUuc2V0KHRhc2ssIHByb2dyZXNzKTtcblxuICAgICAgcmV0dXJuIHByb2dyZXNzO1xuICAgfVxuXG4gICBmYXRhbChlcnI6IEdpdEVycm9yKSB7XG4gICAgICBmb3IgKGNvbnN0IFt0YXNrLCB7IGxvZ2dlciB9XSBvZiBBcnJheS5mcm9tKHRoaXMuX3F1ZXVlLmVudHJpZXMoKSkpIHtcbiAgICAgICAgIGlmICh0YXNrID09PSBlcnIudGFzaykge1xuICAgICAgICAgICAgbG9nZ2VyLmluZm8oYEZhaWxlZCAlb2AsIGVycik7XG4gICAgICAgICAgICBsb2dnZXIoXG4gICAgICAgICAgICAgICBgRmF0YWwgZXhjZXB0aW9uLCBhbnkgYXMteWV0IHVuLXN0YXJ0ZWQgdGFza3MgcnVuIHRocm91Z2ggdGhpcyBleGVjdXRvciB3aWxsIG5vdCBiZSBhdHRlbXB0ZWRgXG4gICAgICAgICAgICApO1xuICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvZ2dlci5pbmZvKFxuICAgICAgICAgICAgICAgYEEgZmF0YWwgZXhjZXB0aW9uIG9jY3VycmVkIGluIGEgcHJldmlvdXMgdGFzaywgdGhlIHF1ZXVlIGhhcyBiZWVuIHB1cmdlZDogJW9gLFxuICAgICAgICAgICAgICAgZXJyLm1lc3NhZ2VcbiAgICAgICAgICAgICk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHRoaXMuY29tcGxldGUodGFzayk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9xdWV1ZS5zaXplICE9PSAwKSB7XG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFF1ZXVlIHNpemUgc2hvdWxkIGJlIHplcm8gYWZ0ZXIgZmF0YWw6ICR7dGhpcy5fcXVldWUuc2l6ZX1gKTtcbiAgICAgIH1cbiAgIH1cblxuICAgY29tcGxldGUodGFzazogQW55U2ltcGxlR2l0VGFzaykge1xuICAgICAgY29uc3QgcHJvZ3Jlc3MgPSB0aGlzLndpdGhQcm9ncmVzcyh0YXNrKTtcbiAgICAgIGlmIChwcm9ncmVzcykge1xuICAgICAgICAgdGhpcy5fcXVldWUuZGVsZXRlKHRhc2spO1xuICAgICAgfVxuICAgfVxuXG4gICBhdHRlbXB0KHRhc2s6IEFueVNpbXBsZUdpdFRhc2spOiBUYXNrSW5Qcm9ncmVzcyB7XG4gICAgICBjb25zdCBwcm9ncmVzcyA9IHRoaXMud2l0aFByb2dyZXNzKHRhc2spO1xuICAgICAgaWYgKCFwcm9ncmVzcykge1xuICAgICAgICAgdGhyb3cgbmV3IEdpdEVycm9yKHVuZGVmaW5lZCwgJ1Rhc2tzUGVuZGluZ1F1ZXVlOiBhdHRlbXB0IGNhbGxlZCBmb3IgYW4gdW5rbm93biB0YXNrJyk7XG4gICAgICB9XG4gICAgICBwcm9ncmVzcy5sb2dnZXIoJ1N0YXJ0aW5nIHRhc2snKTtcblxuICAgICAgcmV0dXJuIHByb2dyZXNzO1xuICAgfVxuXG4gICBzdGF0aWMgZ2V0TmFtZShuYW1lID0gJ2VtcHR5Jykge1xuICAgICAgcmV0dXJuIGB0YXNrOiR7bmFtZX06JHsrK1Rhc2tzUGVuZGluZ1F1ZXVlLmNvdW50ZXJ9YDtcbiAgIH1cblxuICAgcHJpdmF0ZSBzdGF0aWMgY291bnRlciA9IDA7XG59XG4iLCAiaW1wb3J0IHsgdHlwZSBTcGF3bk9wdGlvbnMsIHNwYXduIH0gZnJvbSAnbm9kZTpjaGlsZF9wcm9jZXNzJztcblxuaW1wb3J0IHsgR2l0RXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvZ2l0LWVycm9yJztcbmltcG9ydCB0eXBlIHsgT3V0cHV0TG9nZ2VyIH0gZnJvbSAnLi4vZ2l0LWxvZ2dlcic7XG5pbXBvcnQgdHlwZSB7IFBsdWdpblN0b3JlLCBTaW1wbGVHaXRUYXNrUGx1Z2luQ29udGV4dCB9IGZyb20gJy4uL3BsdWdpbnMnO1xuaW1wb3J0IHsgdHlwZSBFbXB0eVRhc2ssIGlzQnVmZmVyVGFzaywgaXNFbXB0eVRhc2sgfSBmcm9tICcuLi90YXNrcy90YXNrJztcbmltcG9ydCB0eXBlIHtcbiAgIEdpdEV4ZWN1dG9yUmVzdWx0LFxuICAgTWF5YmUsXG4gICBvdXRwdXRIYW5kbGVyLFxuICAgUnVubmFibGVUYXNrLFxuICAgU2ltcGxlR2l0RXhlY3V0b3IsXG4gICBTaW1wbGVHaXRUYXNrLFxufSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBjYWxsVGFza1BhcnNlciwgZmlyc3QsIEdpdE91dHB1dFN0cmVhbXMsIG9iamVjdFRvU3RyaW5nIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHR5cGUgeyBTY2hlZHVsZXIgfSBmcm9tICcuL3NjaGVkdWxlcic7XG5pbXBvcnQgeyBUYXNrc1BlbmRpbmdRdWV1ZSB9IGZyb20gJy4vdGFza3MtcGVuZGluZy1xdWV1ZSc7XG5cbmV4cG9ydCBjbGFzcyBHaXRFeGVjdXRvckNoYWluIGltcGxlbWVudHMgU2ltcGxlR2l0RXhlY3V0b3Ige1xuICAgcHJpdmF0ZSBfY2hhaW46IFByb21pc2U8YW55PiA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgcHJpdmF0ZSBfcXVldWUgPSBuZXcgVGFza3NQZW5kaW5nUXVldWUoKTtcbiAgIHByaXZhdGUgX2N3ZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICBwdWJsaWMgZ2V0IGN3ZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jd2QgfHwgdGhpcy5fZXhlY3V0b3IuY3dkO1xuICAgfVxuXG4gICBwdWJsaWMgc2V0IGN3ZChjd2Q6IHN0cmluZykge1xuICAgICAgdGhpcy5fY3dkID0gY3dkO1xuICAgfVxuXG4gICBwdWJsaWMgZ2V0IGVudigpIHtcbiAgICAgIHJldHVybiB0aGlzLl9leGVjdXRvci5lbnY7XG4gICB9XG5cbiAgIHB1YmxpYyBnZXQgb3V0cHV0SGFuZGxlcigpIHtcbiAgICAgIHJldHVybiB0aGlzLl9leGVjdXRvci5vdXRwdXRIYW5kbGVyO1xuICAgfVxuXG4gICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2V4ZWN1dG9yOiBTaW1wbGVHaXRFeGVjdXRvcixcbiAgICAgIHByaXZhdGUgX3NjaGVkdWxlcjogU2NoZWR1bGVyLFxuICAgICAgcHJpdmF0ZSBfcGx1Z2luczogUGx1Z2luU3RvcmVcbiAgICkge31cblxuICAgcHVibGljIGNoYWluKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICB9XG5cbiAgIHB1YmxpYyBwdXNoPFI+KHRhc2s6IFNpbXBsZUdpdFRhc2s8Uj4pOiBQcm9taXNlPFI+IHtcbiAgICAgIHRoaXMuX3F1ZXVlLnB1c2godGFzayk7XG5cbiAgICAgIHJldHVybiAodGhpcy5fY2hhaW4gPSB0aGlzLl9jaGFpbi50aGVuKCgpID0+IHRoaXMuYXR0ZW1wdFRhc2sodGFzaykpKTtcbiAgIH1cblxuICAgcHJpdmF0ZSBhc3luYyBhdHRlbXB0VGFzazxSPih0YXNrOiBTaW1wbGVHaXRUYXNrPFI+KTogUHJvbWlzZTx2b2lkIHwgUj4ge1xuICAgICAgY29uc3Qgb25TY2hlZHVsZUNvbXBsZXRlID0gYXdhaXQgdGhpcy5fc2NoZWR1bGVyLm5leHQoKTtcbiAgICAgIGNvbnN0IG9uUXVldWVDb21wbGV0ZSA9ICgpID0+IHRoaXMuX3F1ZXVlLmNvbXBsZXRlKHRhc2spO1xuXG4gICAgICB0cnkge1xuICAgICAgICAgY29uc3QgeyBsb2dnZXIgfSA9IHRoaXMuX3F1ZXVlLmF0dGVtcHQodGFzayk7XG4gICAgICAgICByZXR1cm4gKGF3YWl0IChpc0VtcHR5VGFzayh0YXNrKVxuICAgICAgICAgICAgPyB0aGlzLmF0dGVtcHRFbXB0eVRhc2sodGFzaywgbG9nZ2VyKVxuICAgICAgICAgICAgOiB0aGlzLmF0dGVtcHRSZW1vdGVUYXNrKHRhc2ssIGxvZ2dlcikpKSBhcyBSO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgdGhyb3cgdGhpcy5vbkZhdGFsRXhjZXB0aW9uKHRhc2ssIGUgYXMgRXJyb3IpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgIG9uUXVldWVDb21wbGV0ZSgpO1xuICAgICAgICAgb25TY2hlZHVsZUNvbXBsZXRlKCk7XG4gICAgICB9XG4gICB9XG5cbiAgIHByaXZhdGUgb25GYXRhbEV4Y2VwdGlvbjxSPih0YXNrOiBTaW1wbGVHaXRUYXNrPFI+LCBlOiBFcnJvcikge1xuICAgICAgY29uc3QgZ2l0RXJyb3IgPVxuICAgICAgICAgZSBpbnN0YW5jZW9mIEdpdEVycm9yID8gT2JqZWN0LmFzc2lnbihlLCB7IHRhc2sgfSkgOiBuZXcgR2l0RXJyb3IodGFzaywgZSAmJiBTdHJpbmcoZSkpO1xuXG4gICAgICB0aGlzLl9jaGFpbiA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgdGhpcy5fcXVldWUuZmF0YWwoZ2l0RXJyb3IpO1xuXG4gICAgICByZXR1cm4gZ2l0RXJyb3I7XG4gICB9XG5cbiAgIHByaXZhdGUgYXN5bmMgYXR0ZW1wdFJlbW90ZVRhc2s8Uj4odGFzazogUnVubmFibGVUYXNrPFI+LCBsb2dnZXI6IE91dHB1dExvZ2dlcikge1xuICAgICAgY29uc3QgYmluYXJ5ID0gdGhpcy5fcGx1Z2lucy5leGVjKCdzcGF3bi5iaW5hcnknLCAnJywgdGhpcy50YXNrQ29udGV4dCh0YXNrLCB0YXNrLmNvbW1hbmRzKSk7XG4gICAgICBjb25zdCBhcmdzID0gdGhpcy5fcGx1Z2lucy5leGVjKFxuICAgICAgICAgJ3NwYXduLmFyZ3MnLFxuICAgICAgICAgWy4uLnRhc2suY29tbWFuZHNdLFxuICAgICAgICAgdGhpcy50YXNrQ29udGV4dCh0YXNrLCB0YXNrLmNvbW1hbmRzKVxuICAgICAgKTtcblxuICAgICAgY29uc3QgcmF3ID0gYXdhaXQgdGhpcy5naXRSZXNwb25zZShcbiAgICAgICAgIHRhc2ssXG4gICAgICAgICBiaW5hcnksXG4gICAgICAgICBhcmdzLFxuICAgICAgICAgdGhpcy5vdXRwdXRIYW5kbGVyLFxuICAgICAgICAgbG9nZ2VyLnN0ZXAoJ1NQQVdOJylcbiAgICAgICk7XG4gICAgICBjb25zdCBvdXRwdXRTdHJlYW1zID0gYXdhaXQgdGhpcy5oYW5kbGVUYXNrRGF0YSh0YXNrLCBhcmdzLCByYXcsIGxvZ2dlci5zdGVwKCdIQU5ETEUnKSk7XG5cbiAgICAgIGxvZ2dlcihgcGFzc2luZyByZXNwb25zZSB0byB0YXNrJ3MgcGFyc2VyIGFzIGEgJXNgLCB0YXNrLmZvcm1hdCk7XG5cbiAgICAgIGlmIChpc0J1ZmZlclRhc2sodGFzaykpIHtcbiAgICAgICAgIHJldHVybiBjYWxsVGFza1BhcnNlcih0YXNrLnBhcnNlciwgb3V0cHV0U3RyZWFtcyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjYWxsVGFza1BhcnNlcih0YXNrLnBhcnNlciwgb3V0cHV0U3RyZWFtcy5hc1N0cmluZ3MoKSk7XG4gICB9XG5cbiAgIHByaXZhdGUgYXN5bmMgYXR0ZW1wdEVtcHR5VGFzayh0YXNrOiBFbXB0eVRhc2ssIGxvZ2dlcjogT3V0cHV0TG9nZ2VyKSB7XG4gICAgICBsb2dnZXIoYGVtcHR5IHRhc2sgYnlwYXNzaW5nIGNoaWxkIHByb2Nlc3MgdG8gY2FsbCB0byB0YXNrJ3MgcGFyc2VyYCk7XG4gICAgICByZXR1cm4gdGFzay5wYXJzZXIodGhpcyk7XG4gICB9XG5cbiAgIHByaXZhdGUgaGFuZGxlVGFza0RhdGE8Uj4oXG4gICAgICB0YXNrOiBTaW1wbGVHaXRUYXNrPFI+LFxuICAgICAgYXJnczogc3RyaW5nW10sXG4gICAgICByZXN1bHQ6IEdpdEV4ZWN1dG9yUmVzdWx0LFxuICAgICAgbG9nZ2VyOiBPdXRwdXRMb2dnZXJcbiAgICk6IFByb21pc2U8R2l0T3V0cHV0U3RyZWFtcz4ge1xuICAgICAgY29uc3QgeyBleGl0Q29kZSwgcmVqZWN0aW9uLCBzdGRPdXQsIHN0ZEVyciB9ID0gcmVzdWx0O1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKGRvbmUsIGZhaWwpID0+IHtcbiAgICAgICAgIGxvZ2dlcihgUHJlcGFyaW5nIHRvIGhhbmRsZSBwcm9jZXNzIHJlc3BvbnNlIGV4aXRDb2RlPSVkIHN0ZE91dD1gLCBleGl0Q29kZSk7XG5cbiAgICAgICAgIGNvbnN0IHsgZXJyb3IgfSA9IHRoaXMuX3BsdWdpbnMuZXhlYyhcbiAgICAgICAgICAgICd0YXNrLmVycm9yJyxcbiAgICAgICAgICAgIHsgZXJyb3I6IHJlamVjdGlvbiB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgLi4udGhpcy50YXNrQ29udGV4dCh0YXNrLCBhcmdzKSxcbiAgICAgICAgICAgICAgIC4uLnJlc3VsdCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICk7XG5cbiAgICAgICAgIGlmIChlcnJvciAmJiB0YXNrLm9uRXJyb3IpIHtcbiAgICAgICAgICAgIGxvZ2dlci5pbmZvKGBleGl0Q29kZT0lcyBoYW5kbGluZyB3aXRoIGN1c3RvbSBlcnJvciBoYW5kbGVyYCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0YXNrLm9uRXJyb3IoXG4gICAgICAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgICAgIChuZXdTdGRPdXQpID0+IHtcbiAgICAgICAgICAgICAgICAgIGxvZ2dlci5pbmZvKGBjdXN0b20gZXJyb3IgaGFuZGxlciB0cmVhdGVkIGFzIHN1Y2Nlc3NgKTtcbiAgICAgICAgICAgICAgICAgIGxvZ2dlcihgY3VzdG9tIGVycm9yIHJldHVybmVkIGEgJXNgLCBvYmplY3RUb1N0cmluZyhuZXdTdGRPdXQpKTtcblxuICAgICAgICAgICAgICAgICAgZG9uZShcbiAgICAgICAgICAgICAgICAgICAgIG5ldyBHaXRPdXRwdXRTdHJlYW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShuZXdTdGRPdXQpID8gQnVmZmVyLmNvbmNhdChuZXdTdGRPdXQpIDogbmV3U3RkT3V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgQnVmZmVyLmNvbmNhdChzdGRFcnIpXG4gICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIGZhaWxcbiAgICAgICAgICAgICk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgbG9nZ2VyLmluZm8oXG4gICAgICAgICAgICAgICBgaGFuZGxpbmcgYXMgZXJyb3I6IGV4aXRDb2RlPSVzIHN0ZEVycj0lcyByZWplY3Rpb249JW9gLFxuICAgICAgICAgICAgICAgZXhpdENvZGUsXG4gICAgICAgICAgICAgICBzdGRFcnIubGVuZ3RoLFxuICAgICAgICAgICAgICAgcmVqZWN0aW9uXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIGZhaWwoZXJyb3IpO1xuICAgICAgICAgfVxuXG4gICAgICAgICBsb2dnZXIuaW5mbyhgcmV0cmlldmluZyB0YXNrIG91dHB1dCBjb21wbGV0ZWApO1xuICAgICAgICAgZG9uZShuZXcgR2l0T3V0cHV0U3RyZWFtcyhCdWZmZXIuY29uY2F0KHN0ZE91dCksIEJ1ZmZlci5jb25jYXQoc3RkRXJyKSkpO1xuICAgICAgfSk7XG4gICB9XG5cbiAgIHByaXZhdGUgYXN5bmMgZ2l0UmVzcG9uc2U8Uj4oXG4gICAgICB0YXNrOiBTaW1wbGVHaXRUYXNrPFI+LFxuICAgICAgY29tbWFuZDogc3RyaW5nLFxuICAgICAgYXJnczogc3RyaW5nW10sXG4gICAgICBvdXRwdXRIYW5kbGVyOiBNYXliZTxvdXRwdXRIYW5kbGVyPixcbiAgICAgIGxvZ2dlcjogT3V0cHV0TG9nZ2VyXG4gICApOiBQcm9taXNlPEdpdEV4ZWN1dG9yUmVzdWx0PiB7XG4gICAgICBjb25zdCBvdXRwdXRMb2dnZXIgPSBsb2dnZXIuc2libGluZygnb3V0cHV0Jyk7XG4gICAgICBjb25zdCBzcGF3bk9wdGlvbnM6IFNwYXduT3B0aW9ucyA9IHRoaXMuX3BsdWdpbnMuZXhlYyhcbiAgICAgICAgICdzcGF3bi5vcHRpb25zJyxcbiAgICAgICAgIHtcbiAgICAgICAgICAgIGN3ZDogdGhpcy5jd2QsXG4gICAgICAgICAgICBlbnY6IHRoaXMuZW52LFxuICAgICAgICAgICAgd2luZG93c0hpZGU6IHRydWUsXG4gICAgICAgICB9LFxuICAgICAgICAgdGhpcy50YXNrQ29udGV4dCh0YXNrLCB0YXNrLmNvbW1hbmRzKVxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChkb25lKSA9PiB7XG4gICAgICAgICBjb25zdCBzdGRPdXQ6IEJ1ZmZlcltdID0gW107XG4gICAgICAgICBjb25zdCBzdGRFcnI6IEJ1ZmZlcltdID0gW107XG5cbiAgICAgICAgIGxvZ2dlci5pbmZvKGAlcyAlb2AsIGNvbW1hbmQsIGFyZ3MpO1xuICAgICAgICAgbG9nZ2VyKCclTycsIHNwYXduT3B0aW9ucyk7XG5cbiAgICAgICAgIGxldCByZWplY3Rpb24gPSB0aGlzLl9iZWZvcmVTcGF3bih0YXNrLCBhcmdzKTtcbiAgICAgICAgIGlmIChyZWplY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBkb25lKHtcbiAgICAgICAgICAgICAgIHN0ZE91dCxcbiAgICAgICAgICAgICAgIHN0ZEVycixcbiAgICAgICAgICAgICAgIGV4aXRDb2RlOiA5OTAxLFxuICAgICAgICAgICAgICAgcmVqZWN0aW9uLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHRoaXMuX3BsdWdpbnMuZXhlYygnc3Bhd24uYmVmb3JlJywgdW5kZWZpbmVkLCB7XG4gICAgICAgICAgICAuLi50aGlzLnRhc2tDb250ZXh0KHRhc2ssIGFyZ3MpLFxuICAgICAgICAgICAga2lsbChyZWFzb24pIHtcbiAgICAgICAgICAgICAgIHJlamVjdGlvbiA9IHJlYXNvbiB8fCByZWplY3Rpb247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgfSk7XG5cbiAgICAgICAgIGNvbnN0IHNwYXduZWQgPSBzcGF3bihjb21tYW5kLCBhcmdzLCBzcGF3bk9wdGlvbnMpO1xuXG4gICAgICAgICBzcGF3bmVkLnN0ZG91dCEub24oXG4gICAgICAgICAgICAnZGF0YScsXG4gICAgICAgICAgICBvbkRhdGFSZWNlaXZlZChzdGRPdXQsICdzdGRPdXQnLCBsb2dnZXIsIG91dHB1dExvZ2dlci5zdGVwKCdzdGRPdXQnKSlcbiAgICAgICAgICk7XG4gICAgICAgICBzcGF3bmVkLnN0ZGVyciEub24oXG4gICAgICAgICAgICAnZGF0YScsXG4gICAgICAgICAgICBvbkRhdGFSZWNlaXZlZChzdGRFcnIsICdzdGRFcnInLCBsb2dnZXIsIG91dHB1dExvZ2dlci5zdGVwKCdzdGRFcnInKSlcbiAgICAgICAgICk7XG5cbiAgICAgICAgIHNwYXduZWQub24oJ2Vycm9yJywgb25FcnJvclJlY2VpdmVkKHN0ZEVyciwgbG9nZ2VyKSk7XG5cbiAgICAgICAgIGlmIChvdXRwdXRIYW5kbGVyKSB7XG4gICAgICAgICAgICBsb2dnZXIoYFBhc3NpbmcgY2hpbGQgcHJvY2VzcyBzdGRPdXQvc3RkRXJyIHRvIGN1c3RvbSBvdXRwdXRIYW5kbGVyYCk7XG4gICAgICAgICAgICBvdXRwdXRIYW5kbGVyKGNvbW1hbmQsIHNwYXduZWQuc3Rkb3V0ISwgc3Bhd25lZC5zdGRlcnIhLCBbLi4uYXJnc10pO1xuICAgICAgICAgfVxuXG4gICAgICAgICB0aGlzLl9wbHVnaW5zLmV4ZWMoJ3NwYXduLmFmdGVyJywgdW5kZWZpbmVkLCB7XG4gICAgICAgICAgICAuLi50aGlzLnRhc2tDb250ZXh0KHRhc2ssIGFyZ3MpLFxuICAgICAgICAgICAgc3Bhd25lZCxcbiAgICAgICAgICAgIGNsb3NlKGV4aXRDb2RlOiBudW1iZXIsIHJlYXNvbj86IEVycm9yKSB7XG4gICAgICAgICAgICAgICBkb25lKHtcbiAgICAgICAgICAgICAgICAgIHN0ZE91dCxcbiAgICAgICAgICAgICAgICAgIHN0ZEVycixcbiAgICAgICAgICAgICAgICAgIGV4aXRDb2RlLFxuICAgICAgICAgICAgICAgICAgcmVqZWN0aW9uOiByZWplY3Rpb24gfHwgcmVhc29uLFxuICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAga2lsbChyZWFzb246IEVycm9yKSB7XG4gICAgICAgICAgICAgICBpZiAoc3Bhd25lZC5raWxsZWQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgcmVqZWN0aW9uID0gcmVhc29uO1xuICAgICAgICAgICAgICAgc3Bhd25lZC5raWxsKCdTSUdJTlQnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgfVxuXG4gICBwcml2YXRlIF9iZWZvcmVTcGF3bjxSPih0YXNrOiBTaW1wbGVHaXRUYXNrPFI+LCBhcmdzOiBzdHJpbmdbXSkge1xuICAgICAgbGV0IHJlamVjdGlvbjogTWF5YmU8RXJyb3I+O1xuICAgICAgdGhpcy5fcGx1Z2lucy5leGVjKCdzcGF3bi5iZWZvcmUnLCB1bmRlZmluZWQsIHtcbiAgICAgICAgIC4uLnRoaXMudGFza0NvbnRleHQodGFzaywgYXJncyksXG4gICAgICAgICBraWxsKHJlYXNvbikge1xuICAgICAgICAgICAgcmVqZWN0aW9uID0gcmVhc29uIHx8IHJlamVjdGlvbjtcbiAgICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlamVjdGlvbjtcbiAgIH1cblxuICAgcHJpdmF0ZSB0YXNrQ29udGV4dDxSPih0YXNrOiBTaW1wbGVHaXRUYXNrPFI+LCBjb21tYW5kczogc3RyaW5nW10pOiBTaW1wbGVHaXRUYXNrUGx1Z2luQ29udGV4dCB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAgbWV0aG9kOiBTdHJpbmcoZmlyc3QodGFzay5jb21tYW5kcykgfHwgJycpLFxuICAgICAgICAgY29tbWFuZHMsXG4gICAgICAgICBlbnY6IHsgLi4udGhpcy5lbnYgfSxcbiAgICAgICAgIGlucHV0OiBpc0VtcHR5VGFzayh0YXNrKSA/IHVuZGVmaW5lZCA6IHRhc2suaW5wdXQsXG4gICAgICB9O1xuICAgfVxufVxuXG5mdW5jdGlvbiBvbkVycm9yUmVjZWl2ZWQodGFyZ2V0OiBCdWZmZXJbXSwgbG9nZ2VyOiBPdXRwdXRMb2dnZXIpIHtcbiAgIHJldHVybiAoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgbG9nZ2VyKGBbRVJST1JdIGNoaWxkIHByb2Nlc3MgZXhjZXB0aW9uICVvYCwgZXJyKTtcbiAgICAgIHRhcmdldC5wdXNoKEJ1ZmZlci5mcm9tKFN0cmluZyhlcnIuc3RhY2spLCAnYXNjaWknKSk7XG4gICB9O1xufVxuXG5mdW5jdGlvbiBvbkRhdGFSZWNlaXZlZChcbiAgIHRhcmdldDogQnVmZmVyW10sXG4gICBuYW1lOiBzdHJpbmcsXG4gICBsb2dnZXI6IE91dHB1dExvZ2dlcixcbiAgIG91dHB1dDogT3V0cHV0TG9nZ2VyXG4pIHtcbiAgIHJldHVybiAoYnVmZmVyOiBCdWZmZXIpID0+IHtcbiAgICAgIGxvZ2dlcihgJXMgcmVjZWl2ZWQgJUwgYnl0ZXNgLCBuYW1lLCBidWZmZXIpO1xuICAgICAgb3V0cHV0KGAlQmAsIGJ1ZmZlcik7XG4gICAgICB0YXJnZXQucHVzaChidWZmZXIpO1xuICAgfTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFBsdWdpblN0b3JlIH0gZnJvbSAnLi4vcGx1Z2lucyc7XG5pbXBvcnQgdHlwZSB7IEdpdEV4ZWN1dG9yRW52LCBvdXRwdXRIYW5kbGVyLCBTaW1wbGVHaXRFeGVjdXRvciwgU2ltcGxlR2l0VGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IEdpdEV4ZWN1dG9yQ2hhaW4gfSBmcm9tICcuL2dpdC1leGVjdXRvci1jaGFpbic7XG5pbXBvcnQgdHlwZSB7IFNjaGVkdWxlciB9IGZyb20gJy4vc2NoZWR1bGVyJztcblxuZXhwb3J0IGNsYXNzIEdpdEV4ZWN1dG9yIGltcGxlbWVudHMgU2ltcGxlR2l0RXhlY3V0b3Ige1xuICAgcHJpdmF0ZSBfY2hhaW46IFNpbXBsZUdpdEV4ZWN1dG9yO1xuXG4gICBwdWJsaWMgZW52OiBHaXRFeGVjdXRvckVudjtcbiAgIHB1YmxpYyBvdXRwdXRIYW5kbGVyPzogb3V0cHV0SGFuZGxlcjtcblxuICAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgY3dkOiBzdHJpbmcsXG4gICAgICBwcml2YXRlIF9zY2hlZHVsZXI6IFNjaGVkdWxlcixcbiAgICAgIHByaXZhdGUgX3BsdWdpbnM6IFBsdWdpblN0b3JlXG4gICApIHtcbiAgICAgIHRoaXMuX2NoYWluID0gdGhpcy5jaGFpbigpO1xuICAgfVxuXG4gICBjaGFpbigpOiBTaW1wbGVHaXRFeGVjdXRvciB7XG4gICAgICByZXR1cm4gbmV3IEdpdEV4ZWN1dG9yQ2hhaW4odGhpcywgdGhpcy5fc2NoZWR1bGVyLCB0aGlzLl9wbHVnaW5zKTtcbiAgIH1cblxuICAgcHVzaDxSPih0YXNrOiBTaW1wbGVHaXRUYXNrPFI+KTogUHJvbWlzZTxSPiB7XG4gICAgICByZXR1cm4gdGhpcy5fY2hhaW4ucHVzaCh0YXNrKTtcbiAgIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IEdpdEVycm9yIH0gZnJvbSAnLi9lcnJvcnMvZ2l0LWVycm9yJztcbmltcG9ydCB0eXBlIHsgR2l0UmVzcG9uc2VFcnJvciB9IGZyb20gJy4vZXJyb3JzL2dpdC1yZXNwb25zZS1lcnJvcic7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdFRhc2ssIFNpbXBsZUdpdFRhc2tDYWxsYmFjayB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgTk9PUCB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gdGFza0NhbGxiYWNrPFI+KFxuICAgdGFzazogU2ltcGxlR2l0VGFzazxSPixcbiAgIHJlc3BvbnNlOiBQcm9taXNlPFI+LFxuICAgY2FsbGJhY2s6IFNpbXBsZUdpdFRhc2tDYWxsYmFjazxSPiA9IE5PT1Bcbikge1xuICAgY29uc3Qgb25TdWNjZXNzID0gKGRhdGE6IFIpID0+IHtcbiAgICAgIGNhbGxiYWNrKG51bGwsIGRhdGEpO1xuICAgfTtcblxuICAgY29uc3Qgb25FcnJvciA9IChlcnI6IEdpdEVycm9yIHwgR2l0UmVzcG9uc2VFcnJvcikgPT4ge1xuICAgICAgaWYgKGVycj8udGFzayA9PT0gdGFzaykge1xuICAgICAgICAgY2FsbGJhY2soZXJyLCB1bmRlZmluZWQgYXMgYW55KTtcbiAgICAgIH1cbiAgIH07XG5cbiAgIHJlc3BvbnNlLnRoZW4ob25TdWNjZXNzLCBvbkVycm9yKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFNpbXBsZUdpdEV4ZWN1dG9yIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgZm9sZGVyRXhpc3RzIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgYWRob2NFeGVjVGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VXb3JraW5nRGlyZWN0b3J5VGFzayhkaXJlY3Rvcnk6IHN0cmluZywgcm9vdD86IFNpbXBsZUdpdEV4ZWN1dG9yKSB7XG4gICByZXR1cm4gYWRob2NFeGVjVGFzaygoaW5zdGFuY2U6IFNpbXBsZUdpdEV4ZWN1dG9yKSA9PiB7XG4gICAgICBpZiAoIWZvbGRlckV4aXN0cyhkaXJlY3RvcnkpKSB7XG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEdpdC5jd2Q6IGNhbm5vdCBjaGFuZ2UgdG8gbm9uLWRpcmVjdG9yeSBcIiR7ZGlyZWN0b3J5fVwiYCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoKHJvb3QgfHwgaW5zdGFuY2UpLmN3ZCA9IGRpcmVjdG9yeSk7XG4gICB9KTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFNpbXBsZUdpdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRBcGkgfSBmcm9tICcuLi9zaW1wbGUtZ2l0LWFwaSc7XG5pbXBvcnQgeyBnZXRUcmFpbGluZ09wdGlvbnMsIHJlbW92ZSwgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmZ1bmN0aW9uIGNoZWNrb3V0VGFzayhhcmdzOiBzdHJpbmdbXSkge1xuICAgY29uc3QgY29tbWFuZHMgPSBbJ2NoZWNrb3V0JywgLi4uYXJnc107XG4gICBpZiAoY29tbWFuZHNbMV0gPT09ICctYicgJiYgY29tbWFuZHMuaW5jbHVkZXMoJy1CJykpIHtcbiAgICAgIGNvbW1hbmRzWzFdID0gcmVtb3ZlKGNvbW1hbmRzLCAnLUInKTtcbiAgIH1cblxuICAgcmV0dXJuIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soY29tbWFuZHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKTogUGljazxTaW1wbGVHaXQsICdjaGVja291dCcgfCAnY2hlY2tvdXRCcmFuY2gnIHwgJ2NoZWNrb3V0TG9jYWxCcmFuY2gnPiB7XG4gICByZXR1cm4ge1xuICAgICAgY2hlY2tvdXQodGhpczogU2ltcGxlR2l0QXBpKSB7XG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgICAgIGNoZWNrb3V0VGFzayhnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzLCAxKSksXG4gICAgICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgICAgKTtcbiAgICAgIH0sXG5cbiAgICAgIGNoZWNrb3V0QnJhbmNoKHRoaXM6IFNpbXBsZUdpdEFwaSwgYnJhbmNoTmFtZSwgc3RhcnRQb2ludCkge1xuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICAgICBjaGVja291dFRhc2soWyctYicsIGJyYW5jaE5hbWUsIHN0YXJ0UG9pbnQsIC4uLmdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpXSksXG4gICAgICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgICAgKTtcbiAgICAgIH0sXG5cbiAgICAgIGNoZWNrb3V0TG9jYWxCcmFuY2godGhpczogU2ltcGxlR2l0QXBpLCBicmFuY2hOYW1lKSB7XG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgICAgIGNoZWNrb3V0VGFzayhbJy1iJywgYnJhbmNoTmFtZSwgLi4uZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cyldKSxcbiAgICAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICAgICApO1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHsgcGF0aHNwZWMgfSBmcm9tICdAc2ltcGxlLWdpdC9hcmdzLXBhdGhzcGVjJztcblxuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0QXBpIH0gZnJvbSAnLi4vc2ltcGxlLWdpdC1hcGknO1xuaW1wb3J0IHR5cGUgeyBPcHRpb25GbGFncywgT3B0aW9ucywgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7XG4gICBhcHBlbmQsXG4gICBmaWx0ZXJTdHJpbmcsXG4gICBmaWx0ZXJUeXBlLFxuICAgZ2V0VHJhaWxpbmdPcHRpb25zLFxuICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50LFxufSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBjb25maWd1cmF0aW9uRXJyb3JUYXNrLCB0eXBlIEVtcHR5VGFzaywgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmV4cG9ydCB0eXBlIENsb25lT3B0aW9ucyA9IE9wdGlvbnMgJlxuICAgT3B0aW9uRmxhZ3M8XG4gICAgICB8ICctLWJhcmUnXG4gICAgICB8ICctLWRpc3NvY2lhdGUnXG4gICAgICB8ICctLW1pcnJvcidcbiAgICAgIHwgJy0tbm8tY2hlY2tvdXQnXG4gICAgICB8ICctLW5vLXJlbW90ZS1zdWJtb2R1bGVzJ1xuICAgICAgfCAnLS1uby1zaGFsbG93LXN1Ym1vZHVsZXMnXG4gICAgICB8ICctLW5vLXNpbmdsZS1icmFuY2gnXG4gICAgICB8ICctLW5vLXRhZ3MnXG4gICAgICB8ICctLXJlbW90ZS1zdWJtb2R1bGVzJ1xuICAgICAgfCAnLS1zaW5nbGUtYnJhbmNoJ1xuICAgICAgfCAnLS1zaGFsbG93LXN1Ym1vZHVsZXMnXG4gICAgICB8ICctLXZlcmJvc2UnXG4gICA+ICZcbiAgIE9wdGlvbkZsYWdzPCctLWRlcHRoJyB8ICctaicgfCAnLS1qb2JzJywgbnVtYmVyPiAmXG4gICBPcHRpb25GbGFnczxcbiAgICAgIHwgJy0tYnJhbmNoJ1xuICAgICAgfCAnLS1vcmlnaW4nXG4gICAgICB8ICctLXJlY3Vyc2Utc3VibW9kdWxlcydcbiAgICAgIHwgJy0tc2VwYXJhdGUtZ2l0LWRpcidcbiAgICAgIHwgJy0tc2hhbGxvdy1leGNsdWRlJ1xuICAgICAgfCAnLS1zaGFsbG93LXNpbmNlJ1xuICAgICAgfCAnLS10ZW1wbGF0ZScsXG4gICAgICBzdHJpbmdcbiAgID47XG5cbnR5cGUgQ2xvbmVUYXNrQnVpbGRlciA9IChcbiAgIHJlcG86IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgIGRpcmVjdG9yeTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgY3VzdG9tQXJnczogc3RyaW5nW11cbikgPT4gU3RyaW5nVGFzazxzdHJpbmc+IHwgRW1wdHlUYXNrO1xuXG5leHBvcnQgY29uc3QgY2xvbmVUYXNrOiBDbG9uZVRhc2tCdWlsZGVyID0gKHJlcG8sIGRpcmVjdG9yeSwgY3VzdG9tQXJncykgPT4ge1xuICAgY29uc3QgY29tbWFuZHMgPSBbJ2Nsb25lJywgLi4uY3VzdG9tQXJnc107XG5cbiAgIGZpbHRlclN0cmluZyhyZXBvKSAmJiBjb21tYW5kcy5wdXNoKHBhdGhzcGVjKHJlcG8pKTtcbiAgIGZpbHRlclN0cmluZyhkaXJlY3RvcnkpICYmIGNvbW1hbmRzLnB1c2gocGF0aHNwZWMoZGlyZWN0b3J5KSk7XG5cbiAgIHJldHVybiBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKGNvbW1hbmRzKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjbG9uZU1pcnJvclRhc2s6IENsb25lVGFza0J1aWxkZXIgPSAocmVwbywgZGlyZWN0b3J5LCBjdXN0b21BcmdzKSA9PiB7XG4gICBhcHBlbmQoY3VzdG9tQXJncywgJy0tbWlycm9yJyk7XG5cbiAgIHJldHVybiBjbG9uZVRhc2socmVwbywgZGlyZWN0b3J5LCBjdXN0b21BcmdzKTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUNsb25lVGFzayhcbiAgIGFwaTogJ2Nsb25lJyB8ICdtaXJyb3InLFxuICAgdGFzazogQ2xvbmVUYXNrQnVpbGRlcixcbiAgIHJlcG9QYXRoOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAuLi5hcmdzOiB1bmtub3duW11cbikge1xuICAgaWYgKCFmaWx0ZXJTdHJpbmcocmVwb1BhdGgpKSB7XG4gICAgICByZXR1cm4gY29uZmlndXJhdGlvbkVycm9yVGFzayhgZ2l0LiR7YXBpfSgpIHJlcXVpcmVzIGEgc3RyaW5nICdyZXBvUGF0aCdgKTtcbiAgIH1cblxuICAgcmV0dXJuIHRhc2socmVwb1BhdGgsIGZpbHRlclR5cGUoYXJnc1swXSwgZmlsdGVyU3RyaW5nKSwgZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cykpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKTogUGljazxTaW1wbGVHaXQsICdjbG9uZScgfCAnbWlycm9yJz4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGNsb25lKHRoaXM6IFNpbXBsZUdpdEFwaSwgcmVwbzogc3RyaW5nIHwgdW5rbm93biwgLi4ucmVzdDogdW5rbm93bltdKSB7XG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgICAgIGNyZWF0ZUNsb25lVGFzaygnY2xvbmUnLCBjbG9uZVRhc2ssIGZpbHRlclR5cGUocmVwbywgZmlsdGVyU3RyaW5nKSwgLi4ucmVzdCksXG4gICAgICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICBtaXJyb3IodGhpczogU2ltcGxlR2l0QXBpLCByZXBvOiBzdHJpbmcgfCB1bmtub3duLCAuLi5yZXN0OiB1bmtub3duW10pIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgY3JlYXRlQ2xvbmVUYXNrKCdtaXJyb3InLCBjbG9uZU1pcnJvclRhc2ssIGZpbHRlclR5cGUocmVwbywgZmlsdGVyU3RyaW5nKSwgLi4ucmVzdCksXG4gICAgICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgICAgKTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgQ29tbWl0UmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBMaW5lUGFyc2VyLCBwYXJzZVN0cmluZ1Jlc3BvbnNlIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5jb25zdCBwYXJzZXJzOiBMaW5lUGFyc2VyPENvbW1pdFJlc3VsdD5bXSA9IFtcbiAgIG5ldyBMaW5lUGFyc2VyKC9eXFxbKFteXFxzXSspKCBcXChbXildK1xcKSk/IChbXlxcXV0rKS8sIChyZXN1bHQsIFticmFuY2gsIHJvb3QsIGNvbW1pdF0pID0+IHtcbiAgICAgIHJlc3VsdC5icmFuY2ggPSBicmFuY2g7XG4gICAgICByZXN1bHQuY29tbWl0ID0gY29tbWl0O1xuICAgICAgcmVzdWx0LnJvb3QgPSAhIXJvb3Q7XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyKC9cXHMqQXV0aG9yOlxccyguKykvaSwgKHJlc3VsdCwgW2F1dGhvcl0pID0+IHtcbiAgICAgIGNvbnN0IHBhcnRzID0gYXV0aG9yLnNwbGl0KCc8Jyk7XG4gICAgICBjb25zdCBlbWFpbCA9IHBhcnRzLnBvcCgpO1xuXG4gICAgICBpZiAoIWVtYWlsIHx8ICFlbWFpbC5pbmNsdWRlcygnQCcpKSB7XG4gICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdC5hdXRob3IgPSB7XG4gICAgICAgICBlbWFpbDogZW1haWwuc3Vic3RyKDAsIGVtYWlsLmxlbmd0aCAtIDEpLFxuICAgICAgICAgbmFtZTogcGFydHMuam9pbignPCcpLnRyaW0oKSxcbiAgICAgIH07XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyKFxuICAgICAgLyhcXGQrKVteLF0qKD86LFxccyooXFxkKylbXixdKikoPzosXFxzKihcXGQrKSkvZyxcbiAgICAgIChyZXN1bHQsIFtjaGFuZ2VzLCBpbnNlcnRpb25zLCBkZWxldGlvbnNdKSA9PiB7XG4gICAgICAgICByZXN1bHQuc3VtbWFyeS5jaGFuZ2VzID0gcGFyc2VJbnQoY2hhbmdlcywgMTApIHx8IDA7XG4gICAgICAgICByZXN1bHQuc3VtbWFyeS5pbnNlcnRpb25zID0gcGFyc2VJbnQoaW5zZXJ0aW9ucywgMTApIHx8IDA7XG4gICAgICAgICByZXN1bHQuc3VtbWFyeS5kZWxldGlvbnMgPSBwYXJzZUludChkZWxldGlvbnMsIDEwKSB8fCAwO1xuICAgICAgfVxuICAgKSxcbiAgIG5ldyBMaW5lUGFyc2VyKFxuICAgICAgL14oXFxkKylbXixdKig/OixcXHMqKFxcZCspW14oXStcXCgoWystXSkpPy8sXG4gICAgICAocmVzdWx0LCBbY2hhbmdlcywgbGluZXMsIGRpcmVjdGlvbl0pID0+IHtcbiAgICAgICAgIHJlc3VsdC5zdW1tYXJ5LmNoYW5nZXMgPSBwYXJzZUludChjaGFuZ2VzLCAxMCkgfHwgMDtcbiAgICAgICAgIGNvbnN0IGNvdW50ID0gcGFyc2VJbnQobGluZXMsIDEwKSB8fCAwO1xuICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJy0nKSB7XG4gICAgICAgICAgICByZXN1bHQuc3VtbWFyeS5kZWxldGlvbnMgPSBjb3VudDtcbiAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnKycpIHtcbiAgICAgICAgICAgIHJlc3VsdC5zdW1tYXJ5Lmluc2VydGlvbnMgPSBjb3VudDtcbiAgICAgICAgIH1cbiAgICAgIH1cbiAgICksXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDb21taXRSZXN1bHQoc3RkT3V0OiBzdHJpbmcpOiBDb21taXRSZXN1bHQge1xuICAgY29uc3QgcmVzdWx0OiBDb21taXRSZXN1bHQgPSB7XG4gICAgICBhdXRob3I6IG51bGwsXG4gICAgICBicmFuY2g6ICcnLFxuICAgICAgY29tbWl0OiAnJyxcbiAgICAgIHJvb3Q6IGZhbHNlLFxuICAgICAgc3VtbWFyeToge1xuICAgICAgICAgY2hhbmdlczogMCxcbiAgICAgICAgIGluc2VydGlvbnM6IDAsXG4gICAgICAgICBkZWxldGlvbnM6IDAsXG4gICAgICB9LFxuICAgfTtcbiAgIHJldHVybiBwYXJzZVN0cmluZ1Jlc3BvbnNlKHJlc3VsdCwgcGFyc2Vycywgc3RkT3V0KTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IENvbW1pdFJlc3VsdCwgU2ltcGxlR2l0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBwYXJzZUNvbW1pdFJlc3VsdCB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2UtY29tbWl0JztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0QXBpIH0gZnJvbSAnLi4vc2ltcGxlLWdpdC1hcGknO1xuaW1wb3J0IHR5cGUgeyBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHtcbiAgIGFzQXJyYXksXG4gICBhc1N0cmluZ0FycmF5LFxuICAgZmlsdGVyQXJyYXksXG4gICBmaWx0ZXJTdHJpbmdPclN0cmluZ0FycmF5LFxuICAgZmlsdGVyVHlwZSxcbiAgIGdldFRyYWlsaW5nT3B0aW9ucyxcbiAgIHByZWZpeGVkQXJyYXksXG4gICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQsXG59IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb25FcnJvclRhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5leHBvcnQgZnVuY3Rpb24gY29tbWl0VGFzayhcbiAgIG1lc3NhZ2U6IHN0cmluZ1tdLFxuICAgZmlsZXM6IHN0cmluZ1tdLFxuICAgY3VzdG9tQXJnczogc3RyaW5nW11cbik6IFN0cmluZ1Rhc2s8Q29tbWl0UmVzdWx0PiB7XG4gICBjb25zdCBjb21tYW5kczogc3RyaW5nW10gPSBbXG4gICAgICAnLWMnLFxuICAgICAgJ2NvcmUuYWJicmV2PTQwJyxcbiAgICAgICdjb21taXQnLFxuICAgICAgLi4ucHJlZml4ZWRBcnJheShtZXNzYWdlLCAnLW0nKSxcbiAgICAgIC4uLmZpbGVzLFxuICAgICAgLi4uY3VzdG9tQXJncyxcbiAgIF07XG5cbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kcyxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIHBhcnNlcjogcGFyc2VDb21taXRSZXN1bHQsXG4gICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKTogUGljazxTaW1wbGVHaXQsICdjb21taXQnPiB7XG4gICByZXR1cm4ge1xuICAgICAgY29tbWl0KHRoaXM6IFNpbXBsZUdpdEFwaSwgbWVzc2FnZTogc3RyaW5nIHwgc3RyaW5nW10sIC4uLnJlc3Q6IHVua25vd25bXSkge1xuICAgICAgICAgY29uc3QgbmV4dCA9IHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpO1xuICAgICAgICAgY29uc3QgdGFzayA9XG4gICAgICAgICAgICByZWplY3REZXByZWNhdGVkU2lnbmF0dXJlcyhtZXNzYWdlKSB8fFxuICAgICAgICAgICAgY29tbWl0VGFzayhcbiAgICAgICAgICAgICAgIGFzQXJyYXkobWVzc2FnZSksXG4gICAgICAgICAgICAgICBhc0FycmF5KGZpbHRlclR5cGUocmVzdFswXSwgZmlsdGVyU3RyaW5nT3JTdHJpbmdBcnJheSwgW10pKSxcbiAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIC4uLmFzU3RyaW5nQXJyYXkoZmlsdGVyVHlwZShyZXN0WzFdLCBmaWx0ZXJBcnJheSwgW10pKSxcbiAgICAgICAgICAgICAgICAgIC4uLmdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMsIDAsIHRydWUpLFxuICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2sodGFzaywgbmV4dCk7XG4gICAgICB9LFxuICAgfTtcblxuICAgZnVuY3Rpb24gcmVqZWN0RGVwcmVjYXRlZFNpZ25hdHVyZXMobWVzc2FnZT86IHVua25vd24pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgICAhZmlsdGVyU3RyaW5nT3JTdHJpbmdBcnJheShtZXNzYWdlKSAmJlxuICAgICAgICAgY29uZmlndXJhdGlvbkVycm9yVGFzayhcbiAgICAgICAgICAgIGBnaXQuY29tbWl0OiByZXF1aXJlcyB0aGUgY29tbWl0IG1lc3NhZ2UgdG8gYmUgc3VwcGxpZWQgYXMgYSBzdHJpbmcvc3RyaW5nW11gXG4gICAgICAgICApXG4gICAgICApO1xuICAgfVxufVxuIiwgImltcG9ydCB0eXBlIHsgU2ltcGxlR2l0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdEFwaSB9IGZyb20gJy4uL3NpbXBsZS1naXQtYXBpJztcbmltcG9ydCB7IGFzQ2FtZWxDYXNlLCBhc051bWJlciwgTGluZVBhcnNlciwgcGFyc2VTdHJpbmdSZXNwb25zZSB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBDb3VudE9iamVjdHNSZXN1bHQge1xuICAgY291bnQ6IG51bWJlcjtcbiAgIHNpemU6IG51bWJlcjtcbiAgIGluUGFjazogbnVtYmVyO1xuICAgcGFja3M6IG51bWJlcjtcbiAgIHNpemVQYWNrOiBudW1iZXI7XG4gICBwcnVuZVBhY2thYmxlOiBudW1iZXI7XG4gICBnYXJiYWdlOiBudW1iZXI7XG4gICBzaXplR2FyYmFnZTogbnVtYmVyO1xufVxuXG5mdW5jdGlvbiBjb3VudE9iamVjdHNSZXNwb25zZSgpOiBDb3VudE9iamVjdHNSZXN1bHQge1xuICAgcmV0dXJuIHtcbiAgICAgIGNvdW50OiAwLFxuICAgICAgZ2FyYmFnZTogMCxcbiAgICAgIGluUGFjazogMCxcbiAgICAgIHBhY2tzOiAwLFxuICAgICAgcHJ1bmVQYWNrYWJsZTogMCxcbiAgICAgIHNpemU6IDAsXG4gICAgICBzaXplR2FyYmFnZTogMCxcbiAgICAgIHNpemVQYWNrOiAwLFxuICAgfTtcbn1cblxuY29uc3QgcGFyc2VyOiBMaW5lUGFyc2VyPENvdW50T2JqZWN0c1Jlc3VsdD4gPSBuZXcgTGluZVBhcnNlcihcbiAgIC8oW2Etei1dKyk6IChcXGQrKSQvLFxuICAgKHJlc3VsdCwgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICBjb25zdCBwcm9wZXJ0eSA9IGFzQ2FtZWxDYXNlKGtleSk7XG4gICAgICBpZiAoT2JqZWN0Lmhhc093bihyZXN1bHQsIHByb3BlcnR5KSkge1xuICAgICAgICAgcmVzdWx0W3Byb3BlcnR5IGFzIGtleW9mIHR5cGVvZiByZXN1bHRdID0gYXNOdW1iZXIodmFsdWUpO1xuICAgICAgfVxuICAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCk6IFBpY2s8U2ltcGxlR2l0LCAnY291bnRPYmplY3RzJz4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGNvdW50T2JqZWN0cyh0aGlzOiBTaW1wbGVHaXRBcGkpIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKHtcbiAgICAgICAgICAgIGNvbW1hbmRzOiBbJ2NvdW50LW9iamVjdHMnLCAnLS12ZXJib3NlJ10sXG4gICAgICAgICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICAgICAgICBwYXJzZXIoc3RkT3V0OiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgIHJldHVybiBwYXJzZVN0cmluZ1Jlc3BvbnNlKGNvdW50T2JqZWN0c1Jlc3BvbnNlKCksIFtwYXJzZXJdLCBzdGRPdXQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgIH0pO1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBSZXNwb25zZSwgU2ltcGxlR2l0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdEFwaSB9IGZyb20gJy4uL3NpbXBsZS1naXQtYXBpJztcbmltcG9ydCB7IHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKTogUGljazxTaW1wbGVHaXQsICdmaXJzdENvbW1pdCc+IHtcbiAgIHJldHVybiB7XG4gICAgICBmaXJzdENvbW1pdCh0aGlzOiBTaW1wbGVHaXRBcGkpOiBSZXNwb25zZTxzdHJpbmc+IHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhbJ3Jldi1saXN0JywgJy0tbWF4LXBhcmVudHM9MCcsICdIRUFEJ10sIHRydWUpLFxuICAgICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICAgICAgICk7XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuLyoqXG4gKiBUYXNrIHVzZWQgYnkgYGdpdC5oYXNoT2JqZWN0YFxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzaE9iamVjdFRhc2soZmlsZVBhdGg6IHN0cmluZywgd3JpdGU6IGJvb2xlYW4pOiBTdHJpbmdUYXNrPHN0cmluZz4ge1xuICAgY29uc3QgY29tbWFuZHMgPSBbJ2hhc2gtb2JqZWN0JywgZmlsZVBhdGhdO1xuICAgaWYgKHdyaXRlKSB7XG4gICAgICBjb21tYW5kcy5wdXNoKCctdycpO1xuICAgfVxuXG4gICByZXR1cm4gc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhjb21tYW5kcywgdHJ1ZSk7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBJbml0UmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5cbmV4cG9ydCBjbGFzcyBJbml0U3VtbWFyeSBpbXBsZW1lbnRzIEluaXRSZXN1bHQge1xuICAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgYmFyZTogYm9vbGVhbixcbiAgICAgIHB1YmxpYyByZWFkb25seSBwYXRoOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgZXhpc3Rpbmc6IGJvb2xlYW4sXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgZ2l0RGlyOiBzdHJpbmdcbiAgICkge31cbn1cblxuY29uc3QgaW5pdFJlc3BvbnNlUmVnZXggPSAvXkluaXQuKyByZXBvc2l0b3J5IGluICguKykkLztcbmNvbnN0IHJlSW5pdFJlc3BvbnNlUmVnZXggPSAvXlJlaW4uKyBpbiAoLispJC87XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUluaXQoYmFyZTogYm9vbGVhbiwgcGF0aDogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpIHtcbiAgIGNvbnN0IHJlc3BvbnNlID0gU3RyaW5nKHRleHQpLnRyaW0oKTtcbiAgIGxldCByZXN1bHQ7XG5cbiAgIGlmICgocmVzdWx0ID0gaW5pdFJlc3BvbnNlUmVnZXguZXhlYyhyZXNwb25zZSkpKSB7XG4gICAgICByZXR1cm4gbmV3IEluaXRTdW1tYXJ5KGJhcmUsIHBhdGgsIGZhbHNlLCByZXN1bHRbMV0pO1xuICAgfVxuXG4gICBpZiAoKHJlc3VsdCA9IHJlSW5pdFJlc3BvbnNlUmVnZXguZXhlYyhyZXNwb25zZSkpKSB7XG4gICAgICByZXR1cm4gbmV3IEluaXRTdW1tYXJ5KGJhcmUsIHBhdGgsIHRydWUsIHJlc3VsdFsxXSk7XG4gICB9XG5cbiAgIGxldCBnaXREaXIgPSAnJztcbiAgIGNvbnN0IHRva2VucyA9IHJlc3BvbnNlLnNwbGl0KCcgJyk7XG4gICB3aGlsZSAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbnMuc2hpZnQoKTtcbiAgICAgIGlmICh0b2tlbiA9PT0gJ2luJykge1xuICAgICAgICAgZ2l0RGlyID0gdG9rZW5zLmpvaW4oJyAnKTtcbiAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgfVxuXG4gICByZXR1cm4gbmV3IEluaXRTdW1tYXJ5KGJhcmUsIHBhdGgsIC9ecmUvaS50ZXN0KHJlc3BvbnNlKSwgZ2l0RGlyKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IEluaXRSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IHBhcnNlSW5pdCB9IGZyb20gJy4uL3Jlc3BvbnNlcy9Jbml0U3VtbWFyeSc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5cbmNvbnN0IGJhcmVDb21tYW5kID0gJy0tYmFyZSc7XG5cbmZ1bmN0aW9uIGhhc0JhcmVDb21tYW5kKGNvbW1hbmQ6IHN0cmluZ1tdKSB7XG4gICByZXR1cm4gY29tbWFuZC5pbmNsdWRlcyhiYXJlQ29tbWFuZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0VGFzayhiYXJlID0gZmFsc2UsIHBhdGg6IHN0cmluZywgY3VzdG9tQXJnczogc3RyaW5nW10pOiBTdHJpbmdUYXNrPEluaXRSZXN1bHQ+IHtcbiAgIGNvbnN0IGNvbW1hbmRzID0gWydpbml0JywgLi4uY3VzdG9tQXJnc107XG4gICBpZiAoYmFyZSAmJiAhaGFzQmFyZUNvbW1hbmQoY29tbWFuZHMpKSB7XG4gICAgICBjb21tYW5kcy5zcGxpY2UoMSwgMCwgYmFyZUNvbW1hbmQpO1xuICAgfVxuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXIodGV4dDogc3RyaW5nKTogSW5pdFJlc3VsdCB7XG4gICAgICAgICByZXR1cm4gcGFyc2VJbml0KGNvbW1hbmRzLmluY2x1ZGVzKCctLWJhcmUnKSwgcGF0aCwgdGV4dCk7XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFNpbXBsZUdpdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRBcGkgfSBmcm9tICcuLi9zaW1wbGUtZ2l0LWFwaSc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQge1xuICAgYXNDYW1lbENhc2UsXG4gICBmaWx0ZXJTdHJpbmdPckJ1ZmZlcixcbiAgIGZpbHRlclR5cGUsXG4gICBmb3JFYWNoTGluZVdpdGhDb250ZW50LFxuICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50LFxufSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBjb25maWd1cmF0aW9uRXJyb3JUYXNrLCB0eXBlIEVtcHR5VGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmZ1bmN0aW9uIGludGVycHJldFRyYWlsZXJzVGFzayhcbiAgIGlucHV0Pzogc3RyaW5nIHwgQnVmZmVyXG4pOiBTdHJpbmdUYXNrPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+IHwgRW1wdHlUYXNrIHtcbiAgIGlmIChpbnB1dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gY29uZmlndXJhdGlvbkVycm9yVGFzayhgaW50ZXJwcmV0VHJhaWxlcnMgY2FsbGVkIHdpdGhvdXQgaW5wdXQgY29udGVudGApO1xuICAgfVxuXG4gICByZXR1cm4ge1xuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgcGFyc2VyKHN0ZE91dCkge1xuICAgICAgICAgcmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhcbiAgICAgICAgICAgIGZvckVhY2hMaW5lV2l0aENvbnRlbnQoc3RkT3V0LCAobGluZSkgPT4ge1xuICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICBhc0NhbWVsQ2FzZShsaW5lLnN1YnN0cmluZygwLCBpbmRleCkudG9Mb3dlckNhc2UoKSksXG4gICAgICAgICAgICAgICAgICBsaW5lLnN1YnN0cmluZyhpbmRleCArIDIpLnRyaW0oKSxcbiAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICBjb21tYW5kczogWydpbnRlcnByZXQtdHJhaWxlcnMnLCAnLS1wYXJzZSddLFxuICAgICAgaW5wdXQsXG4gICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKTogUGljazxTaW1wbGVHaXQsICdpbnRlcnByZXRUcmFpbGVycyc+IHtcbiAgIHJldHVybiB7XG4gICAgICBpbnRlcnByZXRUcmFpbGVycyh0aGlzOiBTaW1wbGVHaXRBcGksIGlucHV0KSB7XG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgICAgIGludGVycHJldFRyYWlsZXJzVGFzayhmaWx0ZXJUeXBlKGlucHV0LCBmaWx0ZXJTdHJpbmdPckJ1ZmZlcikpLFxuICAgICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICAgICAgICk7XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJleHBvcnQgZW51bSBMb2dGb3JtYXQge1xuICAgTk9ORSA9ICcnLFxuICAgU1RBVCA9ICctLXN0YXQnLFxuICAgTlVNX1NUQVQgPSAnLS1udW1zdGF0JyxcbiAgIE5BTUVfT05MWSA9ICctLW5hbWUtb25seScsXG4gICBOQU1FX1NUQVRVUyA9ICctLW5hbWUtc3RhdHVzJyxcbn1cblxuY29uc3QgbG9nRm9ybWF0UmVnZXggPSAvXi0tKHN0YXR8bnVtc3RhdHxuYW1lLW9ubHl8bmFtZS1zdGF0dXMpKD18JCkvO1xuXG5leHBvcnQgZnVuY3Rpb24gbG9nRm9ybWF0RnJvbUNvbW1hbmQoY3VzdG9tQXJnczogc3RyaW5nW10pIHtcbiAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VzdG9tQXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZm9ybWF0ID0gbG9nRm9ybWF0UmVnZXguZXhlYyhjdXN0b21BcmdzW2ldKTtcbiAgICAgIGlmIChmb3JtYXQpIHtcbiAgICAgICAgIHJldHVybiBgLS0ke2Zvcm1hdFsxXX1gIGFzIExvZ0Zvcm1hdDtcbiAgICAgIH1cbiAgIH1cblxuICAgcmV0dXJuIExvZ0Zvcm1hdC5OT05FO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNMb2dGb3JtYXQoY3VzdG9tQXJnOiBzdHJpbmcgfCB1bmtub3duKSB7XG4gICByZXR1cm4gbG9nRm9ybWF0UmVnZXgudGVzdChjdXN0b21BcmcgYXMgc3RyaW5nKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IERpZmZSZXN1bHQsIERpZmZSZXN1bHRCaW5hcnlGaWxlLCBEaWZmUmVzdWx0VGV4dEZpbGUgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcblxuLyoqKlxuICogVGhlIERpZmZTdW1tYXJ5IGlzIHJldHVybmVkIGFzIGEgcmVzcG9uc2UgdG8gZ2V0dGluZyBgZ2l0KCkuc3RhdHVzKClgXG4gKi9cbmV4cG9ydCBjbGFzcyBEaWZmU3VtbWFyeSBpbXBsZW1lbnRzIERpZmZSZXN1bHQge1xuICAgY2hhbmdlZCA9IDA7XG4gICBkZWxldGlvbnMgPSAwO1xuICAgaW5zZXJ0aW9ucyA9IDA7XG5cbiAgIGZpbGVzOiBBcnJheTxEaWZmUmVzdWx0VGV4dEZpbGUgfCBEaWZmUmVzdWx0QmluYXJ5RmlsZT4gPSBbXTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IERpZmZSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IExvZ0Zvcm1hdCB9IGZyb20gJy4uL2FyZ3MvbG9nLWZvcm1hdCc7XG5pbXBvcnQgeyBEaWZmU3VtbWFyeSB9IGZyb20gJy4uL3Jlc3BvbnNlcy9EaWZmU3VtbWFyeSc7XG5pbXBvcnQgeyBpc0RpZmZOYW1lU3RhdHVzIH0gZnJvbSAnLi4vdGFza3MvZGlmZi1uYW1lLXN0YXR1cyc7XG5pbXBvcnQgeyBhc051bWJlciwgTGluZVBhcnNlciwgb3JWb2lkLCBwYXJzZVN0cmluZ1Jlc3BvbnNlIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5jb25zdCBzdGF0UGFyc2VyID0gW1xuICAgbmV3IExpbmVQYXJzZXI8RGlmZlJlc3VsdD4oXG4gICAgICAvXiguKylcXHMrXFx8XFxzKyhcXGQrKShcXHMrWytcXC1dKyk/JC8sXG4gICAgICAocmVzdWx0LCBbZmlsZSwgY2hhbmdlcywgYWx0ZXJhdGlvbnMgPSAnJ10pID0+IHtcbiAgICAgICAgIHJlc3VsdC5maWxlcy5wdXNoKHtcbiAgICAgICAgICAgIGZpbGU6IGZpbGUudHJpbSgpLFxuICAgICAgICAgICAgY2hhbmdlczogYXNOdW1iZXIoY2hhbmdlcyksXG4gICAgICAgICAgICBpbnNlcnRpb25zOiBhbHRlcmF0aW9ucy5yZXBsYWNlKC9bXitdL2csICcnKS5sZW5ndGgsXG4gICAgICAgICAgICBkZWxldGlvbnM6IGFsdGVyYXRpb25zLnJlcGxhY2UoL1teLV0vZywgJycpLmxlbmd0aCxcbiAgICAgICAgICAgIGJpbmFyeTogZmFsc2UsXG4gICAgICAgICB9KTtcbiAgICAgIH1cbiAgICksXG4gICBuZXcgTGluZVBhcnNlcjxEaWZmUmVzdWx0PihcbiAgICAgIC9eKC4rKSBcXHxcXHMrQmluIChbMC05Ll0rKSAtPiAoWzAtOS5dKykgKFthLXpdKykvLFxuICAgICAgKHJlc3VsdCwgW2ZpbGUsIGJlZm9yZSwgYWZ0ZXJdKSA9PiB7XG4gICAgICAgICByZXN1bHQuZmlsZXMucHVzaCh7XG4gICAgICAgICAgICBmaWxlOiBmaWxlLnRyaW0oKSxcbiAgICAgICAgICAgIGJlZm9yZTogYXNOdW1iZXIoYmVmb3JlKSxcbiAgICAgICAgICAgIGFmdGVyOiBhc051bWJlcihhZnRlciksXG4gICAgICAgICAgICBiaW5hcnk6IHRydWUsXG4gICAgICAgICB9KTtcbiAgICAgIH1cbiAgICksXG4gICBuZXcgTGluZVBhcnNlcjxEaWZmUmVzdWx0PigvXiguKylcXHMrXFx8XFxzK0JpblxccyokLywgKHJlc3VsdCwgW2ZpbGVdKSA9PiB7XG4gICAgICByZXN1bHQuZmlsZXMucHVzaCh7XG4gICAgICAgICBmaWxlOiBmaWxlLnRyaW0oKSxcbiAgICAgICAgIGJlZm9yZTogMCxcbiAgICAgICAgIGFmdGVyOiAwLFxuICAgICAgICAgYmluYXJ5OiB0cnVlLFxuICAgICAgfSk7XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyPERpZmZSZXN1bHQ+KFxuICAgICAgLyhcXGQrKSBmaWxlcz8gY2hhbmdlZFxccyooKD86LCBcXGQrIFteLF0rKXswLDJ9KS8sXG4gICAgICAocmVzdWx0LCBbY2hhbmdlZCwgc3VtbWFyeV0pID0+IHtcbiAgICAgICAgIGNvbnN0IGluc2VydGVkID0gLyhcXGQrKSBpLy5leGVjKHN1bW1hcnkpO1xuICAgICAgICAgY29uc3QgZGVsZXRlZCA9IC8oXFxkKykgZC8uZXhlYyhzdW1tYXJ5KTtcblxuICAgICAgICAgcmVzdWx0LmNoYW5nZWQgPSBhc051bWJlcihjaGFuZ2VkKTtcbiAgICAgICAgIHJlc3VsdC5pbnNlcnRpb25zID0gYXNOdW1iZXIoaW5zZXJ0ZWQ/LlsxXSk7XG4gICAgICAgICByZXN1bHQuZGVsZXRpb25zID0gYXNOdW1iZXIoZGVsZXRlZD8uWzFdKTtcbiAgICAgIH1cbiAgICksXG5dO1xuXG5jb25zdCBudW1TdGF0UGFyc2VyID0gW1xuICAgbmV3IExpbmVQYXJzZXI8RGlmZlJlc3VsdD4oXG4gICAgICAvKFxcZCspXFx0KFxcZCspXFx0KC4rKSQvLFxuICAgICAgKHJlc3VsdCwgW2NoYW5nZXNJbnNlcnQsIGNoYW5nZXNEZWxldGUsIGZpbGVdKSA9PiB7XG4gICAgICAgICBjb25zdCBpbnNlcnRpb25zID0gYXNOdW1iZXIoY2hhbmdlc0luc2VydCk7XG4gICAgICAgICBjb25zdCBkZWxldGlvbnMgPSBhc051bWJlcihjaGFuZ2VzRGVsZXRlKTtcblxuICAgICAgICAgcmVzdWx0LmNoYW5nZWQrKztcbiAgICAgICAgIHJlc3VsdC5pbnNlcnRpb25zICs9IGluc2VydGlvbnM7XG4gICAgICAgICByZXN1bHQuZGVsZXRpb25zICs9IGRlbGV0aW9ucztcblxuICAgICAgICAgcmVzdWx0LmZpbGVzLnB1c2goe1xuICAgICAgICAgICAgZmlsZSxcbiAgICAgICAgICAgIGNoYW5nZXM6IGluc2VydGlvbnMgKyBkZWxldGlvbnMsXG4gICAgICAgICAgICBpbnNlcnRpb25zLFxuICAgICAgICAgICAgZGVsZXRpb25zLFxuICAgICAgICAgICAgYmluYXJ5OiBmYWxzZSxcbiAgICAgICAgIH0pO1xuICAgICAgfVxuICAgKSxcbiAgIG5ldyBMaW5lUGFyc2VyPERpZmZSZXN1bHQ+KC8tXFx0LVxcdCguKykkLywgKHJlc3VsdCwgW2ZpbGVdKSA9PiB7XG4gICAgICByZXN1bHQuY2hhbmdlZCsrO1xuXG4gICAgICByZXN1bHQuZmlsZXMucHVzaCh7XG4gICAgICAgICBmaWxlLFxuICAgICAgICAgYWZ0ZXI6IDAsXG4gICAgICAgICBiZWZvcmU6IDAsXG4gICAgICAgICBiaW5hcnk6IHRydWUsXG4gICAgICB9KTtcbiAgIH0pLFxuXTtcblxuY29uc3QgbmFtZU9ubHlQYXJzZXIgPSBbXG4gICBuZXcgTGluZVBhcnNlcjxEaWZmUmVzdWx0PigvKC4rKSQvLCAocmVzdWx0LCBbZmlsZV0pID0+IHtcbiAgICAgIHJlc3VsdC5jaGFuZ2VkKys7XG4gICAgICByZXN1bHQuZmlsZXMucHVzaCh7XG4gICAgICAgICBmaWxlLFxuICAgICAgICAgY2hhbmdlczogMCxcbiAgICAgICAgIGluc2VydGlvbnM6IDAsXG4gICAgICAgICBkZWxldGlvbnM6IDAsXG4gICAgICAgICBiaW5hcnk6IGZhbHNlLFxuICAgICAgfSk7XG4gICB9KSxcbl07XG5cbmNvbnN0IG5hbWVTdGF0dXNQYXJzZXIgPSBbXG4gICBuZXcgTGluZVBhcnNlcjxEaWZmUmVzdWx0PihcbiAgICAgIC8oW0FDRE1SVFVYQl0pKFswLTldezAsM30pXFx0KC5bXlxcdF0qKShcXHQoLlteXFx0XSopKT8kLyxcbiAgICAgIChyZXN1bHQsIFtzdGF0dXMsIHNpbWlsYXJpdHksIGZyb20sIF90bywgdG9dKSA9PiB7XG4gICAgICAgICByZXN1bHQuY2hhbmdlZCsrO1xuICAgICAgICAgcmVzdWx0LmZpbGVzLnB1c2goe1xuICAgICAgICAgICAgZmlsZTogdG8gPz8gZnJvbSxcbiAgICAgICAgICAgIGNoYW5nZXM6IDAsXG4gICAgICAgICAgICBpbnNlcnRpb25zOiAwLFxuICAgICAgICAgICAgZGVsZXRpb25zOiAwLFxuICAgICAgICAgICAgYmluYXJ5OiBmYWxzZSxcbiAgICAgICAgICAgIHN0YXR1czogb3JWb2lkKGlzRGlmZk5hbWVTdGF0dXMoc3RhdHVzKSAmJiBzdGF0dXMpLFxuICAgICAgICAgICAgZnJvbTogb3JWb2lkKCEhdG8gJiYgZnJvbSAhPT0gdG8gJiYgZnJvbSksXG4gICAgICAgICAgICBzaW1pbGFyaXR5OiBhc051bWJlcihzaW1pbGFyaXR5KSxcbiAgICAgICAgIH0pO1xuICAgICAgfVxuICAgKSxcbl07XG5cbmNvbnN0IGRpZmZTdW1tYXJ5UGFyc2VyczogUmVjb3JkPExvZ0Zvcm1hdCwgTGluZVBhcnNlcjxEaWZmUmVzdWx0PltdPiA9IHtcbiAgIFtMb2dGb3JtYXQuTk9ORV06IHN0YXRQYXJzZXIsXG4gICBbTG9nRm9ybWF0LlNUQVRdOiBzdGF0UGFyc2VyLFxuICAgW0xvZ0Zvcm1hdC5OVU1fU1RBVF06IG51bVN0YXRQYXJzZXIsXG4gICBbTG9nRm9ybWF0Lk5BTUVfU1RBVFVTXTogbmFtZVN0YXR1c1BhcnNlcixcbiAgIFtMb2dGb3JtYXQuTkFNRV9PTkxZXTogbmFtZU9ubHlQYXJzZXIsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGlmZlBhcnNlcihmb3JtYXQgPSBMb2dGb3JtYXQuTk9ORSkge1xuICAgY29uc3QgcGFyc2VyID0gZGlmZlN1bW1hcnlQYXJzZXJzW2Zvcm1hdF07XG5cbiAgIHJldHVybiAoc3RkT3V0OiBzdHJpbmcpID0+IHBhcnNlU3RyaW5nUmVzcG9uc2UobmV3IERpZmZTdW1tYXJ5KCksIHBhcnNlciwgc3RkT3V0LCBmYWxzZSk7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBMaXN0TG9nTGluZSwgTG9nUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBMb2dGb3JtYXQgfSBmcm9tICcuLi9hcmdzL2xvZy1mb3JtYXQnO1xuaW1wb3J0IHsgdG9MaW5lc1dpdGhDb250ZW50IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgZ2V0RGlmZlBhcnNlciB9IGZyb20gJy4vcGFyc2UtZGlmZi1zdW1tYXJ5JztcblxuZXhwb3J0IGNvbnN0IFNUQVJUX0JPVU5EQVJZID0gJ8Oyw7LDssOyw7LDsiAnO1xuXG5leHBvcnQgY29uc3QgQ09NTUlUX0JPVU5EQVJZID0gJyDDssOyJztcblxuZXhwb3J0IGNvbnN0IFNQTElUVEVSID0gJyDDsiAnO1xuXG5jb25zdCBkZWZhdWx0RmllbGROYW1lcyA9IFsnaGFzaCcsICdkYXRlJywgJ21lc3NhZ2UnLCAncmVmcycsICdhdXRob3JfbmFtZScsICdhdXRob3JfZW1haWwnXTtcblxuZnVuY3Rpb24gbGluZUJ1aWxkZXIodG9rZW5zOiBzdHJpbmdbXSwgZmllbGRzOiBzdHJpbmdbXSk6IGFueSB7XG4gICByZXR1cm4gZmllbGRzLnJlZHVjZShcbiAgICAgIChsaW5lLCBmaWVsZCwgaW5kZXgpID0+IHtcbiAgICAgICAgIGxpbmVbZmllbGRdID0gdG9rZW5zW2luZGV4XSB8fCAnJztcbiAgICAgICAgIHJldHVybiBsaW5lO1xuICAgICAgfSxcbiAgICAgIE9iamVjdC5jcmVhdGUoeyBkaWZmOiBudWxsIH0pIGFzIGFueVxuICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxpc3RMb2dTdW1tYXJ5UGFyc2VyPFQgPSBhbnk+KFxuICAgc3BsaXR0ZXIgPSBTUExJVFRFUixcbiAgIGZpZWxkcyA9IGRlZmF1bHRGaWVsZE5hbWVzLFxuICAgbG9nRm9ybWF0ID0gTG9nRm9ybWF0Lk5PTkVcbikge1xuICAgY29uc3QgcGFyc2VEaWZmUmVzdWx0ID0gZ2V0RGlmZlBhcnNlcihsb2dGb3JtYXQpO1xuXG4gICByZXR1cm4gZnVuY3Rpb24gKHN0ZE91dDogc3RyaW5nKTogTG9nUmVzdWx0PFQ+IHtcbiAgICAgIGNvbnN0IGFsbDogUmVhZG9ubHlBcnJheTxUICYgTGlzdExvZ0xpbmU+ID0gdG9MaW5lc1dpdGhDb250ZW50KFxuICAgICAgICAgc3RkT3V0LnRyaW0oKSxcbiAgICAgICAgIGZhbHNlLFxuICAgICAgICAgU1RBUlRfQk9VTkRBUllcbiAgICAgICkubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICBjb25zdCBsaW5lRGV0YWlsID0gaXRlbS5zcGxpdChDT01NSVRfQk9VTkRBUlkpO1xuICAgICAgICAgY29uc3QgbGlzdExvZ0xpbmU6IFQgJiBMaXN0TG9nTGluZSA9IGxpbmVCdWlsZGVyKGxpbmVEZXRhaWxbMF0uc3BsaXQoc3BsaXR0ZXIpLCBmaWVsZHMpO1xuXG4gICAgICAgICBpZiAobGluZURldGFpbC5sZW5ndGggPiAxICYmIGxpbmVEZXRhaWxbMV0udHJpbSgpKSB7XG4gICAgICAgICAgICBsaXN0TG9nTGluZS5kaWZmID0gcGFyc2VEaWZmUmVzdWx0KGxpbmVEZXRhaWxbMV0pO1xuICAgICAgICAgfVxuXG4gICAgICAgICByZXR1cm4gbGlzdExvZ0xpbmU7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgIGFsbCxcbiAgICAgICAgIGxhdGVzdDogKGFsbC5sZW5ndGggJiYgYWxsWzBdKSB8fCBudWxsLFxuICAgICAgICAgdG90YWw6IGFsbC5sZW5ndGgsXG4gICAgICB9O1xuICAgfTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IERpZmZSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IGlzTG9nRm9ybWF0LCBMb2dGb3JtYXQsIGxvZ0Zvcm1hdEZyb21Db21tYW5kIH0gZnJvbSAnLi4vYXJncy9sb2ctZm9ybWF0JztcbmltcG9ydCB7IGdldERpZmZQYXJzZXIgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlLWRpZmYtc3VtbWFyeSc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBjb25maWd1cmF0aW9uRXJyb3JUYXNrLCB0eXBlIEVtcHR5VGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkaWZmU3VtbWFyeVRhc2soY3VzdG9tQXJnczogc3RyaW5nW10pOiBTdHJpbmdUYXNrPERpZmZSZXN1bHQ+IHwgRW1wdHlUYXNrIHtcbiAgIGxldCBsb2dGb3JtYXQgPSBsb2dGb3JtYXRGcm9tQ29tbWFuZChjdXN0b21BcmdzKTtcblxuICAgY29uc3QgY29tbWFuZHMgPSBbJ2RpZmYnXTtcblxuICAgaWYgKGxvZ0Zvcm1hdCA9PT0gTG9nRm9ybWF0Lk5PTkUpIHtcbiAgICAgIGxvZ0Zvcm1hdCA9IExvZ0Zvcm1hdC5TVEFUO1xuICAgICAgY29tbWFuZHMucHVzaCgnLS1zdGF0PTQwOTYnKTtcbiAgIH1cblxuICAgY29tbWFuZHMucHVzaCguLi5jdXN0b21BcmdzKTtcblxuICAgcmV0dXJuIChcbiAgICAgIHZhbGlkYXRlTG9nRm9ybWF0Q29uZmlnKGNvbW1hbmRzKSB8fCB7XG4gICAgICAgICBjb21tYW5kcyxcbiAgICAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgICAgIHBhcnNlcjogZ2V0RGlmZlBhcnNlcihsb2dGb3JtYXQpLFxuICAgICAgfVxuICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlTG9nRm9ybWF0Q29uZmlnKGN1c3RvbUFyZ3M6IHVua25vd25bXSk6IEVtcHR5VGFzayB8IHZvaWQge1xuICAgY29uc3QgZmxhZ3MgPSBjdXN0b21BcmdzLmZpbHRlcihpc0xvZ0Zvcm1hdCk7XG5cbiAgIGlmIChmbGFncy5sZW5ndGggPiAxKSB7XG4gICAgICByZXR1cm4gY29uZmlndXJhdGlvbkVycm9yVGFzayhcbiAgICAgICAgIGBTdW1tYXJ5IGZsYWdzIGFyZSBtdXR1YWxseSBleGNsdXNpdmUgLSBwaWNrIG9uZSBvZiAke2ZsYWdzLmpvaW4oJywnKX1gXG4gICAgICApO1xuICAgfVxuXG4gICBpZiAoZmxhZ3MubGVuZ3RoICYmIGN1c3RvbUFyZ3MuaW5jbHVkZXMoJy16JykpIHtcbiAgICAgIHJldHVybiBjb25maWd1cmF0aW9uRXJyb3JUYXNrKFxuICAgICAgICAgYFN1bW1hcnkgZmxhZyAke2ZsYWdzfSBwYXJzaW5nIGlzIG5vdCBjb21wYXRpYmxlIHdpdGggbnVsbCB0ZXJtaW5hdGlvbiBvcHRpb24gJy16J2BcbiAgICAgICk7XG4gICB9XG59XG4iLCAiaW1wb3J0IHsgcGF0aHNwZWMgfSBmcm9tICdAc2ltcGxlLWdpdC9hcmdzLXBhdGhzcGVjJztcblxuaW1wb3J0IHR5cGUgeyBMb2dSZXN1bHQsIE9wdGlvbnMsIFNpbXBsZUdpdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgbG9nRm9ybWF0RnJvbUNvbW1hbmQgfSBmcm9tICcuLi9hcmdzL2xvZy1mb3JtYXQnO1xuaW1wb3J0IHtcbiAgIENPTU1JVF9CT1VOREFSWSxcbiAgIGNyZWF0ZUxpc3RMb2dTdW1tYXJ5UGFyc2VyLFxuICAgU1BMSVRURVIsXG4gICBTVEFSVF9CT1VOREFSWSxcbn0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZS1saXN0LWxvZy1zdW1tYXJ5JztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0QXBpIH0gZnJvbSAnLi4vc2ltcGxlLWdpdC1hcGknO1xuaW1wb3J0IHR5cGUgeyBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHtcbiAgIGFwcGVuZFRhc2tPcHRpb25zLFxuICAgYXNTdHJpbmdBcnJheSxcbiAgIGZpbHRlckFycmF5LFxuICAgZmlsdGVyUGxhaW5PYmplY3QsXG4gICBmaWx0ZXJTdHJpbmcsXG4gICBmaWx0ZXJUeXBlLFxuICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50LFxuICAgdHJhaWxpbmdPcHRpb25zQXJndW1lbnQsXG59IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IHZhbGlkYXRlTG9nRm9ybWF0Q29uZmlnIH0gZnJvbSAnLi9kaWZmJztcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb25FcnJvclRhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5lbnVtIGV4Y2x1ZGVPcHRpb25zIHtcbiAgICctLXByZXR0eScsXG4gICAnbWF4LWNvdW50JyxcbiAgICdtYXhDb3VudCcsXG4gICAnbicsXG4gICAnZmlsZScsXG4gICAnZm9ybWF0JyxcbiAgICdmcm9tJyxcbiAgICd0bycsXG4gICAnc3BsaXR0ZXInLFxuICAgJ3N5bW1ldHJpYycsXG4gICAnbWFpbE1hcCcsXG4gICAnbXVsdGlMaW5lJyxcbiAgICdzdHJpY3REYXRlJyxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEZWZhdWx0TG9nRmllbGRzIHtcbiAgIGhhc2g6IHN0cmluZztcbiAgIGRhdGU6IHN0cmluZztcbiAgIG1lc3NhZ2U6IHN0cmluZztcbiAgIHJlZnM6IHN0cmluZztcbiAgIGJvZHk6IHN0cmluZztcbiAgIGF1dGhvcl9uYW1lOiBzdHJpbmc7XG4gICBhdXRob3JfZW1haWw6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTG9nT3B0aW9uczxUID0gRGVmYXVsdExvZ0ZpZWxkcz4gPSB7XG4gICBmaWxlPzogc3RyaW5nO1xuICAgZm9ybWF0PzogVDtcbiAgIGZyb20/OiBzdHJpbmc7XG4gICBtYWlsTWFwPzogYm9vbGVhbjtcbiAgIG1heENvdW50PzogbnVtYmVyO1xuICAgbXVsdGlMaW5lPzogYm9vbGVhbjtcbiAgIHNwbGl0dGVyPzogc3RyaW5nO1xuICAgc3RyaWN0RGF0ZT86IGJvb2xlYW47XG4gICBzeW1tZXRyaWM/OiBib29sZWFuO1xuICAgdG8/OiBzdHJpbmc7XG59O1xuXG5pbnRlcmZhY2UgUGFyc2VkTG9nT3B0aW9ucyB7XG4gICBmaWVsZHM6IHN0cmluZ1tdO1xuICAgc3BsaXR0ZXI6IHN0cmluZztcbiAgIGNvbW1hbmRzOiBzdHJpbmdbXTtcbn1cblxuZnVuY3Rpb24gcHJldHR5Rm9ybWF0KFxuICAgZm9ybWF0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCB1bmtub3duPixcbiAgIHNwbGl0dGVyOiBzdHJpbmdcbik6IFtzdHJpbmdbXSwgc3RyaW5nXSB7XG4gICBjb25zdCBmaWVsZHM6IHN0cmluZ1tdID0gW107XG4gICBjb25zdCBmb3JtYXRTdHI6IHN0cmluZ1tdID0gW107XG5cbiAgIE9iamVjdC5rZXlzKGZvcm1hdCkuZm9yRWFjaCgoZmllbGQpID0+IHtcbiAgICAgIGZpZWxkcy5wdXNoKGZpZWxkKTtcbiAgICAgIGZvcm1hdFN0ci5wdXNoKFN0cmluZyhmb3JtYXRbZmllbGRdKSk7XG4gICB9KTtcblxuICAgcmV0dXJuIFtmaWVsZHMsIGZvcm1hdFN0ci5qb2luKHNwbGl0dGVyKV07XG59XG5cbmZ1bmN0aW9uIHVzZXJPcHRpb25zPFQgZXh0ZW5kcyBPcHRpb25zPihpbnB1dDogVCk6IE9wdGlvbnMge1xuICAgcmV0dXJuIE9iamVjdC5rZXlzKGlucHV0KS5yZWR1Y2UoKG91dCwga2V5KSA9PiB7XG4gICAgICBpZiAoIShrZXkgaW4gZXhjbHVkZU9wdGlvbnMpKSB7XG4gICAgICAgICBvdXRba2V5XSA9IGlucHV0W2tleV07XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0O1xuICAgfSwge30gYXMgT3B0aW9ucyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUxvZ09wdGlvbnM8VCBleHRlbmRzIE9wdGlvbnM+KFxuICAgb3B0OiBPcHRpb25zIHwgTG9nT3B0aW9uczxUPiA9IHt9LFxuICAgY3VzdG9tQXJnczogc3RyaW5nW10gPSBbXVxuKTogUGFyc2VkTG9nT3B0aW9ucyB7XG4gICBjb25zdCBzcGxpdHRlciA9IGZpbHRlclR5cGUob3B0LnNwbGl0dGVyLCBmaWx0ZXJTdHJpbmcsIFNQTElUVEVSKTtcbiAgIGNvbnN0IGZvcm1hdCA9IGZpbHRlclBsYWluT2JqZWN0KG9wdC5mb3JtYXQpXG4gICAgICA/IG9wdC5mb3JtYXRcbiAgICAgIDoge1xuICAgICAgICAgICBoYXNoOiAnJUgnLFxuICAgICAgICAgICBkYXRlOiBvcHQuc3RyaWN0RGF0ZSA9PT0gZmFsc2UgPyAnJWFpJyA6ICclYUknLFxuICAgICAgICAgICBtZXNzYWdlOiAnJXMnLFxuICAgICAgICAgICByZWZzOiAnJUQnLFxuICAgICAgICAgICBib2R5OiBvcHQubXVsdGlMaW5lID8gJyVCJyA6ICclYicsXG4gICAgICAgICAgIGF1dGhvcl9uYW1lOiBvcHQubWFpbE1hcCAhPT0gZmFsc2UgPyAnJWFOJyA6ICclYW4nLFxuICAgICAgICAgICBhdXRob3JfZW1haWw6IG9wdC5tYWlsTWFwICE9PSBmYWxzZSA/ICclYUUnIDogJyVhZScsXG4gICAgICAgIH07XG5cbiAgIGNvbnN0IFtmaWVsZHMsIGZvcm1hdFN0cl0gPSBwcmV0dHlGb3JtYXQoZm9ybWF0LCBzcGxpdHRlcik7XG5cbiAgIGNvbnN0IHN1ZmZpeDogc3RyaW5nW10gPSBbXTtcbiAgIGNvbnN0IGNvbW1hbmQ6IHN0cmluZ1tdID0gW1xuICAgICAgYC0tcHJldHR5PWZvcm1hdDoke1NUQVJUX0JPVU5EQVJZfSR7Zm9ybWF0U3RyfSR7Q09NTUlUX0JPVU5EQVJZfWAsXG4gICAgICAuLi5jdXN0b21BcmdzLFxuICAgXTtcblxuICAgY29uc3QgbWF4Q291bnQ6IG51bWJlciB8IHVuZGVmaW5lZCA9IChvcHQgYXMgYW55KS5uIHx8IChvcHQgYXMgYW55KVsnbWF4LWNvdW50J10gfHwgb3B0Lm1heENvdW50O1xuICAgaWYgKG1heENvdW50KSB7XG4gICAgICBjb21tYW5kLnB1c2goYC0tbWF4LWNvdW50PSR7bWF4Q291bnR9YCk7XG4gICB9XG5cbiAgIGlmIChvcHQuZnJvbSB8fCBvcHQudG8pIHtcbiAgICAgIGNvbnN0IHJhbmdlT3BlcmF0b3IgPSBvcHQuc3ltbWV0cmljICE9PSBmYWxzZSA/ICcuLi4nIDogJy4uJztcbiAgICAgIHN1ZmZpeC5wdXNoKGAke29wdC5mcm9tIHx8ICcnfSR7cmFuZ2VPcGVyYXRvcn0ke29wdC50byB8fCAnJ31gKTtcbiAgIH1cblxuICAgaWYgKGZpbHRlclN0cmluZyhvcHQuZmlsZSkpIHtcbiAgICAgIGNvbW1hbmQucHVzaCgnLS1mb2xsb3cnLCBwYXRoc3BlYyhvcHQuZmlsZSkpO1xuICAgfVxuXG4gICBhcHBlbmRUYXNrT3B0aW9ucyh1c2VyT3B0aW9ucyhvcHQgYXMgT3B0aW9ucyksIGNvbW1hbmQpO1xuXG4gICByZXR1cm4ge1xuICAgICAgZmllbGRzLFxuICAgICAgc3BsaXR0ZXIsXG4gICAgICBjb21tYW5kczogWy4uLmNvbW1hbmQsIC4uLnN1ZmZpeF0sXG4gICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9nVGFzazxUPihcbiAgIHNwbGl0dGVyOiBzdHJpbmcsXG4gICBmaWVsZHM6IHN0cmluZ1tdLFxuICAgY3VzdG9tQXJnczogc3RyaW5nW11cbik6IFN0cmluZ1Rhc2s8TG9nUmVzdWx0PFQ+PiB7XG4gICBjb25zdCBwYXJzZXIgPSBjcmVhdGVMaXN0TG9nU3VtbWFyeVBhcnNlcihzcGxpdHRlciwgZmllbGRzLCBsb2dGb3JtYXRGcm9tQ29tbWFuZChjdXN0b21BcmdzKSk7XG5cbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kczogWydsb2cnLCAuLi5jdXN0b21BcmdzXSxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIHBhcnNlcixcbiAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpOiBQaWNrPFNpbXBsZUdpdCwgJ2xvZyc+IHtcbiAgIHJldHVybiB7XG4gICAgICBsb2c8VCBleHRlbmRzIE9wdGlvbnM+KHRoaXM6IFNpbXBsZUdpdEFwaSwgLi4ucmVzdDogdW5rbm93bltdKSB7XG4gICAgICAgICBjb25zdCBuZXh0ID0gdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cyk7XG4gICAgICAgICBjb25zdCBvcHRpb25zID0gcGFyc2VMb2dPcHRpb25zPFQ+KFxuICAgICAgICAgICAgdHJhaWxpbmdPcHRpb25zQXJndW1lbnQoYXJndW1lbnRzKSxcbiAgICAgICAgICAgIGFzU3RyaW5nQXJyYXkoZmlsdGVyVHlwZShhcmd1bWVudHNbMF0sIGZpbHRlckFycmF5LCBbXSkpXG4gICAgICAgICApO1xuICAgICAgICAgY29uc3QgdGFzayA9XG4gICAgICAgICAgICByZWplY3REZXByZWNhdGVkU2lnbmF0dXJlcyguLi5yZXN0KSB8fFxuICAgICAgICAgICAgdmFsaWRhdGVMb2dGb3JtYXRDb25maWcob3B0aW9ucy5jb21tYW5kcykgfHxcbiAgICAgICAgICAgIGNyZWF0ZUxvZ1Rhc2sob3B0aW9ucyk7XG5cbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKHRhc2ssIG5leHQpO1xuICAgICAgfSxcbiAgIH07XG5cbiAgIGZ1bmN0aW9uIGNyZWF0ZUxvZ1Rhc2sob3B0aW9uczogUGFyc2VkTG9nT3B0aW9ucykge1xuICAgICAgcmV0dXJuIGxvZ1Rhc2sob3B0aW9ucy5zcGxpdHRlciwgb3B0aW9ucy5maWVsZHMsIG9wdGlvbnMuY29tbWFuZHMpO1xuICAgfVxuXG4gICBmdW5jdGlvbiByZWplY3REZXByZWNhdGVkU2lnbmF0dXJlcyhmcm9tPzogdW5rbm93biwgdG8/OiB1bmtub3duKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAgZmlsdGVyU3RyaW5nKGZyb20pICYmXG4gICAgICAgICBmaWx0ZXJTdHJpbmcodG8pICYmXG4gICAgICAgICBjb25maWd1cmF0aW9uRXJyb3JUYXNrKFxuICAgICAgICAgICAgYGdpdC5sb2coc3RyaW5nLCBzdHJpbmcpIHNob3VsZCBiZSByZXBsYWNlZCB3aXRoIGdpdC5sb2coeyBmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcgfSlgXG4gICAgICAgICApXG4gICAgICApO1xuICAgfVxufVxuIiwgImltcG9ydCB0eXBlIHtcbiAgIE1lcmdlQ29uZmxpY3QsXG4gICBNZXJnZUNvbmZsaWN0RGVsZXRpb24sXG4gICBNZXJnZURldGFpbCxcbiAgIE1lcmdlUmVzdWx0U3RhdHVzLFxufSBmcm9tICcuLi8uLi90eXBpbmdzJztcblxuZXhwb3J0IGNsYXNzIE1lcmdlU3VtbWFyeUNvbmZsaWN0IGltcGxlbWVudHMgTWVyZ2VDb25mbGljdCB7XG4gICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyByZWFkb25seSByZWFzb246IHN0cmluZyxcbiAgICAgIHB1YmxpYyByZWFkb25seSBmaWxlOiBzdHJpbmcgfCBudWxsID0gbnVsbCxcbiAgICAgIHB1YmxpYyByZWFkb25seSBtZXRhPzogTWVyZ2VDb25mbGljdERlbGV0aW9uXG4gICApIHt9XG5cbiAgIHRvU3RyaW5nKCkge1xuICAgICAgcmV0dXJuIGAke3RoaXMuZmlsZX06JHt0aGlzLnJlYXNvbn1gO1xuICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWVyZ2VTdW1tYXJ5RGV0YWlsIGltcGxlbWVudHMgTWVyZ2VEZXRhaWwge1xuICAgcHVibGljIGNvbmZsaWN0czogTWVyZ2VDb25mbGljdFtdID0gW107XG4gICBwdWJsaWMgbWVyZ2VzOiBzdHJpbmdbXSA9IFtdO1xuICAgcHVibGljIHJlc3VsdDogTWVyZ2VSZXN1bHRTdGF0dXMgPSAnc3VjY2Vzcyc7XG5cbiAgIGdldCBmYWlsZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25mbGljdHMubGVuZ3RoID4gMDtcbiAgIH1cblxuICAgZ2V0IHJlYXNvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlc3VsdDtcbiAgIH1cblxuICAgdG9TdHJpbmcoKSB7XG4gICAgICBpZiAodGhpcy5jb25mbGljdHMubGVuZ3RoKSB7XG4gICAgICAgICByZXR1cm4gYENPTkZMSUNUUzogJHt0aGlzLmNvbmZsaWN0cy5qb2luKCcsICcpfWA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnT0snO1xuICAgfVxufVxuIiwgImltcG9ydCB0eXBlIHtcbiAgIFB1bGxEZXRhaWxGaWxlQ2hhbmdlcyxcbiAgIFB1bGxEZXRhaWxTdW1tYXJ5LFxuICAgUHVsbEZhaWxlZFJlc3VsdCxcbiAgIFB1bGxSZXN1bHQsXG59IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuXG5leHBvcnQgY2xhc3MgUHVsbFN1bW1hcnkgaW1wbGVtZW50cyBQdWxsUmVzdWx0IHtcbiAgIHB1YmxpYyByZW1vdGVNZXNzYWdlcyA9IHtcbiAgICAgIGFsbDogW10sXG4gICB9O1xuICAgcHVibGljIGNyZWF0ZWQgPSBbXTtcbiAgIHB1YmxpYyBkZWxldGVkOiBzdHJpbmdbXSA9IFtdO1xuICAgcHVibGljIGZpbGVzOiBzdHJpbmdbXSA9IFtdO1xuICAgcHVibGljIGRlbGV0aW9uczogUHVsbERldGFpbEZpbGVDaGFuZ2VzID0ge307XG4gICBwdWJsaWMgaW5zZXJ0aW9uczogUHVsbERldGFpbEZpbGVDaGFuZ2VzID0ge307XG4gICBwdWJsaWMgc3VtbWFyeTogUHVsbERldGFpbFN1bW1hcnkgPSB7XG4gICAgICBjaGFuZ2VzOiAwLFxuICAgICAgZGVsZXRpb25zOiAwLFxuICAgICAgaW5zZXJ0aW9uczogMCxcbiAgIH07XG59XG5cbmV4cG9ydCBjbGFzcyBQdWxsRmFpbGVkU3VtbWFyeSBpbXBsZW1lbnRzIFB1bGxGYWlsZWRSZXN1bHQge1xuICAgcmVtb3RlID0gJyc7XG4gICBoYXNoID0ge1xuICAgICAgbG9jYWw6ICcnLFxuICAgICAgcmVtb3RlOiAnJyxcbiAgIH07XG4gICBicmFuY2ggPSB7XG4gICAgICBsb2NhbDogJycsXG4gICAgICByZW1vdGU6ICcnLFxuICAgfTtcbiAgIG1lc3NhZ2UgPSAnJztcblxuICAgdG9TdHJpbmcoKSB7XG4gICAgICByZXR1cm4gdGhpcy5tZXNzYWdlO1xuICAgfVxufVxuIiwgImltcG9ydCB0eXBlIHtcbiAgIFJlbW90ZU1lc3NhZ2VSZXN1bHQsXG4gICBSZW1vdGVNZXNzYWdlcyxcbiAgIFJlbW90ZU1lc3NhZ2VzT2JqZWN0RW51bWVyYXRpb24sXG59IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgYXNOdW1iZXIsIFJlbW90ZUxpbmVQYXJzZXIgfSBmcm9tICcuLi91dGlscyc7XG5cbmZ1bmN0aW9uIG9iamVjdEVudW1lcmF0aW9uUmVzdWx0PFQgZXh0ZW5kcyBSZW1vdGVNZXNzYWdlcyA9IFJlbW90ZU1lc3NhZ2VzPihcbiAgIHJlbW90ZU1lc3NhZ2VzOiBUXG4pOiBSZW1vdGVNZXNzYWdlc09iamVjdEVudW1lcmF0aW9uIHtcbiAgIHJldHVybiAocmVtb3RlTWVzc2FnZXMub2JqZWN0cyA9IHJlbW90ZU1lc3NhZ2VzLm9iamVjdHMgfHwge1xuICAgICAgY29tcHJlc3Npbmc6IDAsXG4gICAgICBjb3VudGluZzogMCxcbiAgICAgIGVudW1lcmF0aW5nOiAwLFxuICAgICAgcGFja1JldXNlZDogMCxcbiAgICAgIHJldXNlZDogeyBjb3VudDogMCwgZGVsdGE6IDAgfSxcbiAgICAgIHRvdGFsOiB7IGNvdW50OiAwLCBkZWx0YTogMCB9LFxuICAgfSk7XG59XG5cbmZ1bmN0aW9uIGFzT2JqZWN0Q291bnQoc291cmNlOiBzdHJpbmcpIHtcbiAgIGNvbnN0IGNvdW50ID0gL15cXHMqKFxcZCspLy5leGVjKHNvdXJjZSk7XG4gICBjb25zdCBkZWx0YSA9IC9kZWx0YSAoXFxkKykvaS5leGVjKHNvdXJjZSk7XG5cbiAgIHJldHVybiB7XG4gICAgICBjb3VudDogYXNOdW1iZXIoKGNvdW50ICYmIGNvdW50WzFdKSB8fCAnMCcpLFxuICAgICAgZGVsdGE6IGFzTnVtYmVyKChkZWx0YSAmJiBkZWx0YVsxXSkgfHwgJzAnKSxcbiAgIH07XG59XG5cbmV4cG9ydCBjb25zdCByZW1vdGVNZXNzYWdlc09iamVjdFBhcnNlcnM6IFJlbW90ZUxpbmVQYXJzZXI8UmVtb3RlTWVzc2FnZVJlc3VsdDxSZW1vdGVNZXNzYWdlcz4+W10gPVxuICAgW1xuICAgICAgbmV3IFJlbW90ZUxpbmVQYXJzZXIoXG4gICAgICAgICAvXnJlbW90ZTpcXHMqKGVudW1lcmF0aW5nfGNvdW50aW5nfGNvbXByZXNzaW5nKSBvYmplY3RzOiAoXFxkKyksL2ksXG4gICAgICAgICAocmVzdWx0LCBbYWN0aW9uLCBjb3VudF0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGFjdGlvbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3QgZW51bWVyYXRpb24gPSBvYmplY3RFbnVtZXJhdGlvblJlc3VsdChyZXN1bHQucmVtb3RlTWVzc2FnZXMpO1xuXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVudW1lcmF0aW9uLCB7IFtrZXldOiBhc051bWJlcihjb3VudCkgfSk7XG4gICAgICAgICB9XG4gICAgICApLFxuICAgICAgbmV3IFJlbW90ZUxpbmVQYXJzZXIoXG4gICAgICAgICAvXnJlbW90ZTpcXHMqKGVudW1lcmF0aW5nfGNvdW50aW5nfGNvbXByZXNzaW5nKSBvYmplY3RzOiBcXGQrJSBcXChcXGQrXFwvKFxcZCspXFwpLC9pLFxuICAgICAgICAgKHJlc3VsdCwgW2FjdGlvbiwgY291bnRdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSBhY3Rpb24udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IGVudW1lcmF0aW9uID0gb2JqZWN0RW51bWVyYXRpb25SZXN1bHQocmVzdWx0LnJlbW90ZU1lc3NhZ2VzKTtcblxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlbnVtZXJhdGlvbiwgeyBba2V5XTogYXNOdW1iZXIoY291bnQpIH0pO1xuICAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIG5ldyBSZW1vdGVMaW5lUGFyc2VyKFxuICAgICAgICAgL3RvdGFsIChbXixdKyksIHJldXNlZCAoW14sXSspLCBwYWNrLXJldXNlZCAoXFxkKykvaSxcbiAgICAgICAgIChyZXN1bHQsIFt0b3RhbCwgcmV1c2VkLCBwYWNrUmV1c2VkXSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2JqZWN0cyA9IG9iamVjdEVudW1lcmF0aW9uUmVzdWx0KHJlc3VsdC5yZW1vdGVNZXNzYWdlcyk7XG4gICAgICAgICAgICBvYmplY3RzLnRvdGFsID0gYXNPYmplY3RDb3VudCh0b3RhbCk7XG4gICAgICAgICAgICBvYmplY3RzLnJldXNlZCA9IGFzT2JqZWN0Q291bnQocmV1c2VkKTtcbiAgICAgICAgICAgIG9iamVjdHMucGFja1JldXNlZCA9IGFzTnVtYmVyKHBhY2tSZXVzZWQpO1xuICAgICAgICAgfVxuICAgICAgKSxcbiAgIF07XG4iLCAiaW1wb3J0IHR5cGUgeyBQdXNoUmVzdWx0UmVtb3RlTWVzc2FnZXMsIFJlbW90ZU1lc3NhZ2VSZXN1bHQsIFJlbW90ZU1lc3NhZ2VzIH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBhc051bWJlciwgcGFyc2VTdHJpbmdSZXNwb25zZSwgUmVtb3RlTGluZVBhcnNlciB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IHJlbW90ZU1lc3NhZ2VzT2JqZWN0UGFyc2VycyB9IGZyb20gJy4vcGFyc2UtcmVtb3RlLW9iamVjdHMnO1xuXG5jb25zdCBwYXJzZXJzOiBSZW1vdGVMaW5lUGFyc2VyPFJlbW90ZU1lc3NhZ2VSZXN1bHQ8UHVzaFJlc3VsdFJlbW90ZU1lc3NhZ2VzIHwgUmVtb3RlTWVzc2FnZXM+PltdID1cbiAgIFtcbiAgICAgIG5ldyBSZW1vdGVMaW5lUGFyc2VyKC9ecmVtb3RlOlxccyooLispJC8sIChyZXN1bHQsIFt0ZXh0XSkgPT4ge1xuICAgICAgICAgcmVzdWx0LnJlbW90ZU1lc3NhZ2VzLmFsbC5wdXNoKHRleHQudHJpbSgpKTtcbiAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pLFxuICAgICAgLi4ucmVtb3RlTWVzc2FnZXNPYmplY3RQYXJzZXJzLFxuICAgICAgbmV3IFJlbW90ZUxpbmVQYXJzZXIoXG4gICAgICAgICBbL2NyZWF0ZSBhICg/OnB1bGx8bWVyZ2UpIHJlcXVlc3QvaSwgL1xccyhodHRwcz86XFwvXFwvXFxTKykkL10sXG4gICAgICAgICAocmVzdWx0LCBbcHVsbFJlcXVlc3RVcmxdKSA9PiB7XG4gICAgICAgICAgICAocmVzdWx0LnJlbW90ZU1lc3NhZ2VzIGFzIFB1c2hSZXN1bHRSZW1vdGVNZXNzYWdlcykucHVsbFJlcXVlc3RVcmwgPSBwdWxsUmVxdWVzdFVybDtcbiAgICAgICAgIH1cbiAgICAgICksXG4gICAgICBuZXcgUmVtb3RlTGluZVBhcnNlcihcbiAgICAgICAgIFsvZm91bmQgKFxcZCspIHZ1bG5lcmFiaWxpdGllcy4rXFwoKFteKV0rKVxcKS9pLCAvXFxzKGh0dHBzPzpcXC9cXC9cXFMrKSQvXSxcbiAgICAgICAgIChyZXN1bHQsIFtjb3VudCwgc3VtbWFyeSwgdXJsXSkgPT4ge1xuICAgICAgICAgICAgKHJlc3VsdC5yZW1vdGVNZXNzYWdlcyBhcyBQdXNoUmVzdWx0UmVtb3RlTWVzc2FnZXMpLnZ1bG5lcmFiaWxpdGllcyA9IHtcbiAgICAgICAgICAgICAgIGNvdW50OiBhc051bWJlcihjb3VudCksXG4gICAgICAgICAgICAgICBzdW1tYXJ5LFxuICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgIH1cbiAgICAgICksXG4gICBdO1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VSZW1vdGVNZXNzYWdlczxUIGV4dGVuZHMgUmVtb3RlTWVzc2FnZXMgPSBSZW1vdGVNZXNzYWdlcz4oXG4gICBfc3RkT3V0OiBzdHJpbmcsXG4gICBzdGRFcnI6IHN0cmluZ1xuKTogUmVtb3RlTWVzc2FnZVJlc3VsdCB7XG4gICByZXR1cm4gcGFyc2VTdHJpbmdSZXNwb25zZSh7IHJlbW90ZU1lc3NhZ2VzOiBuZXcgUmVtb3RlTWVzc2FnZVN1bW1hcnkoKSBhcyBUIH0sIHBhcnNlcnMsIHN0ZEVycik7XG59XG5cbmV4cG9ydCBjbGFzcyBSZW1vdGVNZXNzYWdlU3VtbWFyeSBpbXBsZW1lbnRzIFJlbW90ZU1lc3NhZ2VzIHtcbiAgIHB1YmxpYyByZWFkb25seSBhbGw6IHN0cmluZ1tdID0gW107XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBQdWxsRGV0YWlsLCBQdWxsRmFpbGVkUmVzdWx0LCBQdWxsUmVzdWx0LCBSZW1vdGVNZXNzYWdlcyB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgUHVsbEZhaWxlZFN1bW1hcnksIFB1bGxTdW1tYXJ5IH0gZnJvbSAnLi4vcmVzcG9uc2VzL1B1bGxTdW1tYXJ5JztcbmltcG9ydCB0eXBlIHsgVGFza1BhcnNlciB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGFwcGVuZCwgTGluZVBhcnNlciwgcGFyc2VTdHJpbmdSZXNwb25zZSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IHBhcnNlUmVtb3RlTWVzc2FnZXMgfSBmcm9tICcuL3BhcnNlLXJlbW90ZS1tZXNzYWdlcyc7XG5cbmNvbnN0IEZJTEVfVVBEQVRFX1JFR0VYID0gL15cXHMqKC4rPylcXHMrXFx8XFxzK1xcZCtcXHMqKFxcKyopKC0qKS87XG5jb25zdCBTVU1NQVJZX1JFR0VYID0gLyhcXGQrKVxcRCsoKFxcZCspXFxEK1xcKFxcK1xcKSk/KFxcRCsoXFxkKylcXEQrXFwoLVxcKSk/LztcbmNvbnN0IEFDVElPTl9SRUdFWCA9IC9eKGNyZWF0ZXxkZWxldGUpIG1vZGUgXFxkKyAoLispLztcblxuY29uc3QgcGFyc2VyczogTGluZVBhcnNlcjxQdWxsUmVzdWx0PltdID0gW1xuICAgbmV3IExpbmVQYXJzZXIoRklMRV9VUERBVEVfUkVHRVgsIChyZXN1bHQsIFtmaWxlLCBpbnNlcnRpb25zLCBkZWxldGlvbnNdKSA9PiB7XG4gICAgICByZXN1bHQuZmlsZXMucHVzaChmaWxlKTtcblxuICAgICAgaWYgKGluc2VydGlvbnMpIHtcbiAgICAgICAgIHJlc3VsdC5pbnNlcnRpb25zW2ZpbGVdID0gaW5zZXJ0aW9ucy5sZW5ndGg7XG4gICAgICB9XG5cbiAgICAgIGlmIChkZWxldGlvbnMpIHtcbiAgICAgICAgIHJlc3VsdC5kZWxldGlvbnNbZmlsZV0gPSBkZWxldGlvbnMubGVuZ3RoO1xuICAgICAgfVxuICAgfSksXG4gICBuZXcgTGluZVBhcnNlcihTVU1NQVJZX1JFR0VYLCAocmVzdWx0LCBbY2hhbmdlcywgLCBpbnNlcnRpb25zLCAsIGRlbGV0aW9uc10pID0+IHtcbiAgICAgIGlmIChpbnNlcnRpb25zICE9PSB1bmRlZmluZWQgfHwgZGVsZXRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgIHJlc3VsdC5zdW1tYXJ5LmNoYW5nZXMgPSArY2hhbmdlcyB8fCAwO1xuICAgICAgICAgcmVzdWx0LnN1bW1hcnkuaW5zZXJ0aW9ucyA9ICtpbnNlcnRpb25zIHx8IDA7XG4gICAgICAgICByZXN1bHQuc3VtbWFyeS5kZWxldGlvbnMgPSArZGVsZXRpb25zIHx8IDA7XG4gICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgIH0pLFxuICAgbmV3IExpbmVQYXJzZXIoQUNUSU9OX1JFR0VYLCAocmVzdWx0LCBbYWN0aW9uLCBmaWxlXSkgPT4ge1xuICAgICAgYXBwZW5kKHJlc3VsdC5maWxlcywgZmlsZSk7XG4gICAgICBhcHBlbmQoYWN0aW9uID09PSAnY3JlYXRlJyA/IHJlc3VsdC5jcmVhdGVkIDogcmVzdWx0LmRlbGV0ZWQsIGZpbGUpO1xuICAgfSksXG5dO1xuXG5jb25zdCBlcnJvclBhcnNlcnM6IExpbmVQYXJzZXI8UHVsbEZhaWxlZFJlc3VsdD5bXSA9IFtcbiAgIG5ldyBMaW5lUGFyc2VyKC9eZnJvbVxccyguKykkL2ksIChyZXN1bHQsIFtyZW1vdGVdKSA9PiB2b2lkIChyZXN1bHQucmVtb3RlID0gcmVtb3RlKSksXG4gICBuZXcgTGluZVBhcnNlcigvXmZhdGFsOlxccyguKykkLywgKHJlc3VsdCwgW21lc3NhZ2VdKSA9PiB2b2lkIChyZXN1bHQubWVzc2FnZSA9IG1lc3NhZ2UpKSxcbiAgIG5ldyBMaW5lUGFyc2VyKFxuICAgICAgLyhbYS16MC05XSspXFwuXFwuKFthLXowLTldKylcXHMrKFxcUyspXFxzKy0+XFxzKyhcXFMrKSQvLFxuICAgICAgKHJlc3VsdCwgW2hhc2hMb2NhbCwgaGFzaFJlbW90ZSwgYnJhbmNoTG9jYWwsIGJyYW5jaFJlbW90ZV0pID0+IHtcbiAgICAgICAgIHJlc3VsdC5icmFuY2gubG9jYWwgPSBicmFuY2hMb2NhbDtcbiAgICAgICAgIHJlc3VsdC5oYXNoLmxvY2FsID0gaGFzaExvY2FsO1xuICAgICAgICAgcmVzdWx0LmJyYW5jaC5yZW1vdGUgPSBicmFuY2hSZW1vdGU7XG4gICAgICAgICByZXN1bHQuaGFzaC5yZW1vdGUgPSBoYXNoUmVtb3RlO1xuICAgICAgfVxuICAgKSxcbl07XG5cbmV4cG9ydCBjb25zdCBwYXJzZVB1bGxEZXRhaWw6IFRhc2tQYXJzZXI8c3RyaW5nLCBQdWxsRGV0YWlsPiA9IChzdGRPdXQsIHN0ZEVycikgPT4ge1xuICAgcmV0dXJuIHBhcnNlU3RyaW5nUmVzcG9uc2UobmV3IFB1bGxTdW1tYXJ5KCksIHBhcnNlcnMsIFtzdGRPdXQsIHN0ZEVycl0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHBhcnNlUHVsbFJlc3VsdDogVGFza1BhcnNlcjxzdHJpbmcsIFB1bGxSZXN1bHQ+ID0gKHN0ZE91dCwgc3RkRXJyKSA9PiB7XG4gICByZXR1cm4gT2JqZWN0LmFzc2lnbihcbiAgICAgIG5ldyBQdWxsU3VtbWFyeSgpLFxuICAgICAgcGFyc2VQdWxsRGV0YWlsKHN0ZE91dCwgc3RkRXJyKSxcbiAgICAgIHBhcnNlUmVtb3RlTWVzc2FnZXM8UmVtb3RlTWVzc2FnZXM+KHN0ZE91dCwgc3RkRXJyKVxuICAgKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVB1bGxFcnJvclJlc3VsdChzdGRPdXQ6IHN0cmluZywgc3RkRXJyOiBzdHJpbmcpIHtcbiAgIGNvbnN0IHB1bGxFcnJvciA9IHBhcnNlU3RyaW5nUmVzcG9uc2UobmV3IFB1bGxGYWlsZWRTdW1tYXJ5KCksIGVycm9yUGFyc2VycywgW3N0ZE91dCwgc3RkRXJyXSk7XG5cbiAgIHJldHVybiBwdWxsRXJyb3IubWVzc2FnZSAmJiBwdWxsRXJyb3I7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBNZXJnZURldGFpbCwgTWVyZ2VSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IE1lcmdlU3VtbWFyeUNvbmZsaWN0LCBNZXJnZVN1bW1hcnlEZXRhaWwgfSBmcm9tICcuLi9yZXNwb25zZXMvTWVyZ2VTdW1tYXJ5JztcbmltcG9ydCB0eXBlIHsgVGFza1BhcnNlciB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IExpbmVQYXJzZXIsIHBhcnNlU3RyaW5nUmVzcG9uc2UgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBwYXJzZVB1bGxSZXN1bHQgfSBmcm9tICcuL3BhcnNlLXB1bGwnO1xuXG5jb25zdCBwYXJzZXJzOiBMaW5lUGFyc2VyPE1lcmdlRGV0YWlsPltdID0gW1xuICAgbmV3IExpbmVQYXJzZXIoL15BdXRvLW1lcmdpbmdcXHMrKC4rKSQvLCAoc3VtbWFyeSwgW2F1dG9NZXJnZV0pID0+IHtcbiAgICAgIHN1bW1hcnkubWVyZ2VzLnB1c2goYXV0b01lcmdlKTtcbiAgIH0pLFxuICAgbmV3IExpbmVQYXJzZXIoL15DT05GTElDVFxccytcXCgoLispXFwpOiBNZXJnZSBjb25mbGljdCBpbiAoLispJC8sIChzdW1tYXJ5LCBbcmVhc29uLCBmaWxlXSkgPT4ge1xuICAgICAgc3VtbWFyeS5jb25mbGljdHMucHVzaChuZXcgTWVyZ2VTdW1tYXJ5Q29uZmxpY3QocmVhc29uLCBmaWxlKSk7XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyKFxuICAgICAgL15DT05GTElDVFxccytcXCgoLitcXC9kZWxldGUpXFwpOiAoLispIGRlbGV0ZWQgaW4gKC4rKSBhbmQvLFxuICAgICAgKHN1bW1hcnksIFtyZWFzb24sIGZpbGUsIGRlbGV0ZVJlZl0pID0+IHtcbiAgICAgICAgIHN1bW1hcnkuY29uZmxpY3RzLnB1c2gobmV3IE1lcmdlU3VtbWFyeUNvbmZsaWN0KHJlYXNvbiwgZmlsZSwgeyBkZWxldGVSZWYgfSkpO1xuICAgICAgfVxuICAgKSxcbiAgIG5ldyBMaW5lUGFyc2VyKC9eQ09ORkxJQ1RcXHMrXFwoKC4rKVxcKTovLCAoc3VtbWFyeSwgW3JlYXNvbl0pID0+IHtcbiAgICAgIHN1bW1hcnkuY29uZmxpY3RzLnB1c2gobmV3IE1lcmdlU3VtbWFyeUNvbmZsaWN0KHJlYXNvbiwgbnVsbCkpO1xuICAgfSksXG4gICBuZXcgTGluZVBhcnNlcigvXkF1dG9tYXRpYyBtZXJnZSBmYWlsZWQ7XFxzKyguKykkLywgKHN1bW1hcnksIFtyZXN1bHRdKSA9PiB7XG4gICAgICBzdW1tYXJ5LnJlc3VsdCA9IHJlc3VsdDtcbiAgIH0pLFxuXTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgY29tcGxldGUgcmVzcG9uc2UgZnJvbSBgZ2l0Lm1lcmdlYFxuICovXG5leHBvcnQgY29uc3QgcGFyc2VNZXJnZVJlc3VsdDogVGFza1BhcnNlcjxzdHJpbmcsIE1lcmdlUmVzdWx0PiA9IChzdGRPdXQsIHN0ZEVycikgPT4ge1xuICAgcmV0dXJuIE9iamVjdC5hc3NpZ24ocGFyc2VNZXJnZURldGFpbChzdGRPdXQsIHN0ZEVyciksIHBhcnNlUHVsbFJlc3VsdChzdGRPdXQsIHN0ZEVycikpO1xufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgbWVyZ2Ugc3BlY2lmaWMgZGV0YWlsIChpZTogbm90IHRoZSBjb250ZW50IGFsc28gYXZhaWxhYmxlIGluIHRoZSBwdWxsIGRldGFpbCkgZnJvbSBgZ2l0Lm1uZXJnZWBcbiAqIEBwYXJhbSBzdGRPdXRcbiAqL1xuZXhwb3J0IGNvbnN0IHBhcnNlTWVyZ2VEZXRhaWw6IFRhc2tQYXJzZXI8c3RyaW5nLCBNZXJnZURldGFpbD4gPSAoc3RkT3V0KSA9PiB7XG4gICByZXR1cm4gcGFyc2VTdHJpbmdSZXNwb25zZShuZXcgTWVyZ2VTdW1tYXJ5RGV0YWlsKCksIHBhcnNlcnMsIHN0ZE91dCk7XG59O1xuIiwgImltcG9ydCB0eXBlIHsgTWVyZ2VSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IEdpdFJlc3BvbnNlRXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvZ2l0LXJlc3BvbnNlLWVycm9yJztcbmltcG9ydCB7IHBhcnNlTWVyZ2VSZXN1bHQgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlLW1lcmdlJztcbmltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb25FcnJvclRhc2ssIHR5cGUgRW1wdHlUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlVGFzayhjdXN0b21BcmdzOiBzdHJpbmdbXSk6IEVtcHR5VGFzayB8IFN0cmluZ1Rhc2s8TWVyZ2VSZXN1bHQ+IHtcbiAgIGlmICghY3VzdG9tQXJncy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBjb25maWd1cmF0aW9uRXJyb3JUYXNrKCdHaXQubWVyZ2UgcmVxdWlyZXMgYXQgbGVhc3Qgb25lIG9wdGlvbicpO1xuICAgfVxuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHM6IFsnbWVyZ2UnLCAuLi5jdXN0b21BcmdzXSxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIHBhcnNlcihzdGRPdXQsIHN0ZEVycik6IE1lcmdlUmVzdWx0IHtcbiAgICAgICAgIGNvbnN0IG1lcmdlID0gcGFyc2VNZXJnZVJlc3VsdChzdGRPdXQsIHN0ZEVycik7XG4gICAgICAgICBpZiAobWVyZ2UuZmFpbGVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR2l0UmVzcG9uc2VFcnJvcihtZXJnZSk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHJldHVybiBtZXJnZTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB0eXBlIHtcbiAgIFB1c2hEZXRhaWwsXG4gICBQdXNoUmVzdWx0LFxuICAgUHVzaFJlc3VsdFB1c2hlZEl0ZW0sXG4gICBQdXNoUmVzdWx0UmVtb3RlTWVzc2FnZXMsXG59IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHR5cGUgeyBUYXNrUGFyc2VyIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgTGluZVBhcnNlciwgcGFyc2VTdHJpbmdSZXNwb25zZSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IHBhcnNlUmVtb3RlTWVzc2FnZXMgfSBmcm9tICcuL3BhcnNlLXJlbW90ZS1tZXNzYWdlcyc7XG5cbmZ1bmN0aW9uIHB1c2hSZXN1bHRQdXNoZWRJdGVtKGxvY2FsOiBzdHJpbmcsIHJlbW90ZTogc3RyaW5nLCBzdGF0dXM6IHN0cmluZyk6IFB1c2hSZXN1bHRQdXNoZWRJdGVtIHtcbiAgIGNvbnN0IGRlbGV0ZWQgPSBzdGF0dXMuaW5jbHVkZXMoJ2RlbGV0ZWQnKTtcbiAgIGNvbnN0IHRhZyA9IHN0YXR1cy5pbmNsdWRlcygndGFnJykgfHwgL15yZWZzXFwvdGFncy8udGVzdChsb2NhbCk7XG4gICBjb25zdCBhbHJlYWR5VXBkYXRlZCA9ICFzdGF0dXMuaW5jbHVkZXMoJ25ldycpO1xuXG4gICByZXR1cm4ge1xuICAgICAgZGVsZXRlZCxcbiAgICAgIHRhZyxcbiAgICAgIGJyYW5jaDogIXRhZyxcbiAgICAgIG5ldzogIWFscmVhZHlVcGRhdGVkLFxuICAgICAgYWxyZWFkeVVwZGF0ZWQsXG4gICAgICBsb2NhbCxcbiAgICAgIHJlbW90ZSxcbiAgIH07XG59XG5cbmNvbnN0IHBhcnNlcnM6IExpbmVQYXJzZXI8UHVzaERldGFpbD5bXSA9IFtcbiAgIG5ldyBMaW5lUGFyc2VyKC9eUHVzaGluZyB0byAoLispJC8sIChyZXN1bHQsIFtyZXBvXSkgPT4ge1xuICAgICAgcmVzdWx0LnJlcG8gPSByZXBvO1xuICAgfSksXG4gICBuZXcgTGluZVBhcnNlcigvXnVwZGF0aW5nIGxvY2FsIHRyYWNraW5nIHJlZiAnKC4rKScvLCAocmVzdWx0LCBbbG9jYWxdKSA9PiB7XG4gICAgICByZXN1bHQucmVmID0ge1xuICAgICAgICAgLi4uKHJlc3VsdC5yZWYgfHwge30pLFxuICAgICAgICAgbG9jYWwsXG4gICAgICB9O1xuICAgfSksXG4gICBuZXcgTGluZVBhcnNlcigvXls9Ki1dXFxzKyhbXjpdKyk6KFxcUyspXFxzK1xcWyguKyldJC8sIChyZXN1bHQsIFtsb2NhbCwgcmVtb3RlLCB0eXBlXSkgPT4ge1xuICAgICAgcmVzdWx0LnB1c2hlZC5wdXNoKHB1c2hSZXN1bHRQdXNoZWRJdGVtKGxvY2FsLCByZW1vdGUsIHR5cGUpKTtcbiAgIH0pLFxuICAgbmV3IExpbmVQYXJzZXIoXG4gICAgICAvXkJyYW5jaCAnKFteJ10rKScgc2V0IHVwIHRvIHRyYWNrIHJlbW90ZSBicmFuY2ggJyhbXiddKyknIGZyb20gJyhbXiddKyknLyxcbiAgICAgIChyZXN1bHQsIFtsb2NhbCwgcmVtb3RlLCByZW1vdGVOYW1lXSkgPT4ge1xuICAgICAgICAgcmVzdWx0LmJyYW5jaCA9IHtcbiAgICAgICAgICAgIC4uLihyZXN1bHQuYnJhbmNoIHx8IHt9KSxcbiAgICAgICAgICAgIGxvY2FsLFxuICAgICAgICAgICAgcmVtb3RlLFxuICAgICAgICAgICAgcmVtb3RlTmFtZSxcbiAgICAgICAgIH07XG4gICAgICB9XG4gICApLFxuICAgbmV3IExpbmVQYXJzZXIoXG4gICAgICAvXihbXjpdKyk6KFxcUyspXFxzKyhbYS16MC05XSspXFwuXFwuKFthLXowLTldKykkLyxcbiAgICAgIChyZXN1bHQsIFtsb2NhbCwgcmVtb3RlLCBmcm9tLCB0b10pID0+IHtcbiAgICAgICAgIHJlc3VsdC51cGRhdGUgPSB7XG4gICAgICAgICAgICBoZWFkOiB7XG4gICAgICAgICAgICAgICBsb2NhbCxcbiAgICAgICAgICAgICAgIHJlbW90ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoYXNoOiB7XG4gICAgICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgfTtcbiAgICAgIH1cbiAgICksXG5dO1xuXG5leHBvcnQgY29uc3QgcGFyc2VQdXNoUmVzdWx0OiBUYXNrUGFyc2VyPHN0cmluZywgUHVzaFJlc3VsdD4gPSAoc3RkT3V0LCBzdGRFcnIpID0+IHtcbiAgIGNvbnN0IHB1c2hEZXRhaWwgPSBwYXJzZVB1c2hEZXRhaWwoc3RkT3V0LCBzdGRFcnIpO1xuICAgY29uc3QgcmVzcG9uc2VEZXRhaWwgPSBwYXJzZVJlbW90ZU1lc3NhZ2VzPFB1c2hSZXN1bHRSZW1vdGVNZXNzYWdlcz4oc3RkT3V0LCBzdGRFcnIpO1xuXG4gICByZXR1cm4ge1xuICAgICAgLi4ucHVzaERldGFpbCxcbiAgICAgIC4uLnJlc3BvbnNlRGV0YWlsLFxuICAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBwYXJzZVB1c2hEZXRhaWw6IFRhc2tQYXJzZXI8c3RyaW5nLCBQdXNoRGV0YWlsPiA9IChzdGRPdXQsIHN0ZEVycikgPT4ge1xuICAgcmV0dXJuIHBhcnNlU3RyaW5nUmVzcG9uc2UoeyBwdXNoZWQ6IFtdIH0sIHBhcnNlcnMsIFtzdGRPdXQsIHN0ZEVycl0pO1xufTtcbiIsICJpbXBvcnQgdHlwZSB7IFB1c2hSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IHBhcnNlUHVzaFJlc3VsdCBhcyBwYXJzZXIgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlLXB1c2gnO1xuaW1wb3J0IHR5cGUgeyBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgYXBwZW5kLCByZW1vdmUgfSBmcm9tICcuLi91dGlscyc7XG5cbnR5cGUgUHVzaFJlZiA9IHsgcmVtb3RlPzogc3RyaW5nOyBicmFuY2g/OiBzdHJpbmcgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIHB1c2hUYWdzVGFzayhyZWY6IFB1c2hSZWYgPSB7fSwgY3VzdG9tQXJnczogc3RyaW5nW10pOiBTdHJpbmdUYXNrPFB1c2hSZXN1bHQ+IHtcbiAgIGFwcGVuZChjdXN0b21BcmdzLCAnLS10YWdzJyk7XG4gICByZXR1cm4gcHVzaFRhc2socmVmLCBjdXN0b21BcmdzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB1c2hUYXNrKHJlZjogUHVzaFJlZiA9IHt9LCBjdXN0b21BcmdzOiBzdHJpbmdbXSk6IFN0cmluZ1Rhc2s8UHVzaFJlc3VsdD4ge1xuICAgY29uc3QgY29tbWFuZHMgPSBbJ3B1c2gnLCAuLi5jdXN0b21BcmdzXTtcbiAgIGlmIChyZWYuYnJhbmNoKSB7XG4gICAgICBjb21tYW5kcy5zcGxpY2UoMSwgMCwgcmVmLmJyYW5jaCk7XG4gICB9XG4gICBpZiAocmVmLnJlbW90ZSkge1xuICAgICAgY29tbWFuZHMuc3BsaWNlKDEsIDAsIHJlZi5yZW1vdGUpO1xuICAgfVxuXG4gICByZW1vdmUoY29tbWFuZHMsICctdicpO1xuICAgYXBwZW5kKGNvbW1hbmRzLCAnLS12ZXJib3NlJyk7XG4gICBhcHBlbmQoY29tbWFuZHMsICctLXBvcmNlbGFpbicpO1xuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXIsXG4gICB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgU2ltcGxlR2l0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdEFwaSB9IGZyb20gJy4uL3NpbXBsZS1naXQtYXBpJztcbmltcG9ydCB7IGdldFRyYWlsaW5nT3B0aW9ucywgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgc3RyYWlnaHRUaHJvdWdoQnVmZmVyVGFzaywgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpOiBQaWNrPFNpbXBsZUdpdCwgJ3Nob3dCdWZmZXInIHwgJ3Nob3cnPiB7XG4gICByZXR1cm4ge1xuICAgICAgc2hvd0J1ZmZlcih0aGlzOiBTaW1wbGVHaXRBcGkpIHtcbiAgICAgICAgIGNvbnN0IGNvbW1hbmRzID0gWydzaG93JywgLi4uZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cywgMSldO1xuICAgICAgICAgaWYgKCFjb21tYW5kcy5pbmNsdWRlcygnLS1iaW5hcnknKSkge1xuICAgICAgICAgICAgY29tbWFuZHMuc3BsaWNlKDEsIDAsICctLWJpbmFyeScpO1xuICAgICAgICAgfVxuXG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgICAgIHN0cmFpZ2h0VGhyb3VnaEJ1ZmZlclRhc2soY29tbWFuZHMpLFxuICAgICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICAgICAgICk7XG4gICAgICB9LFxuXG4gICAgICBzaG93KHRoaXM6IFNpbXBsZUdpdEFwaSkge1xuICAgICAgICAgY29uc3QgY29tbWFuZHMgPSBbJ3Nob3cnLCAuLi5nZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzLCAxKV07XG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgICAgIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soY29tbWFuZHMpLFxuICAgICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICAgICAgICk7XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IEZpbGVTdGF0dXNSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcblxuZXhwb3J0IGNvbnN0IGZyb21QYXRoUmVnZXggPSAvXiguKylcXDAoLispJC87XG5cbmV4cG9ydCBjbGFzcyBGaWxlU3RhdHVzU3VtbWFyeSBpbXBsZW1lbnRzIEZpbGVTdGF0dXNSZXN1bHQge1xuICAgcHVibGljIHJlYWRvbmx5IGZyb206IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgcGF0aDogc3RyaW5nLFxuICAgICAgcHVibGljIGluZGV4OiBzdHJpbmcsXG4gICAgICBwdWJsaWMgd29ya2luZ19kaXI6IHN0cmluZ1xuICAgKSB7XG4gICAgICBpZiAoaW5kZXggPT09ICdSJyB8fCB3b3JraW5nX2RpciA9PT0gJ1InKSB7XG4gICAgICAgICBjb25zdCBkZXRhaWwgPSBmcm9tUGF0aFJlZ2V4LmV4ZWMocGF0aCkgfHwgW251bGwsIHBhdGgsIHBhdGhdO1xuICAgICAgICAgdGhpcy5mcm9tID0gZGV0YWlsWzJdIHx8ICcnO1xuICAgICAgICAgdGhpcy5wYXRoID0gZGV0YWlsWzFdIHx8ICcnO1xuICAgICAgfVxuICAgfVxufVxuIiwgImltcG9ydCB0eXBlIHsgU3RhdHVzUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBmaWx0ZXJTdHJpbmcsIGZpbHRlclR5cGUsIE5VTEwgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBGaWxlU3RhdHVzU3VtbWFyeSB9IGZyb20gJy4vRmlsZVN0YXR1c1N1bW1hcnknO1xuXG50eXBlIFN0YXR1c0xpbmVQYXJzZXIgPSAocmVzdWx0OiBTdGF0dXNSZXN1bHQsIGZpbGU6IHN0cmluZykgPT4gdm9pZDtcblxuZXhwb3J0IGNsYXNzIFN0YXR1c1N1bW1hcnkgaW1wbGVtZW50cyBTdGF0dXNSZXN1bHQge1xuICAgcHVibGljIG5vdF9hZGRlZCA9IFtdO1xuICAgcHVibGljIGNvbmZsaWN0ZWQgPSBbXTtcbiAgIHB1YmxpYyBjcmVhdGVkID0gW107XG4gICBwdWJsaWMgZGVsZXRlZCA9IFtdO1xuICAgcHVibGljIGlnbm9yZWQgPSB1bmRlZmluZWQ7XG4gICBwdWJsaWMgbW9kaWZpZWQgPSBbXTtcbiAgIHB1YmxpYyByZW5hbWVkID0gW107XG4gICBwdWJsaWMgZmlsZXMgPSBbXTtcbiAgIHB1YmxpYyBzdGFnZWQgPSBbXTtcbiAgIHB1YmxpYyBhaGVhZCA9IDA7XG4gICBwdWJsaWMgYmVoaW5kID0gMDtcbiAgIHB1YmxpYyBjdXJyZW50ID0gbnVsbDtcbiAgIHB1YmxpYyB0cmFja2luZyA9IG51bGw7XG4gICBwdWJsaWMgZGV0YWNoZWQgPSBmYWxzZTtcblxuICAgcHVibGljIGlzQ2xlYW4gPSAoKSA9PiB7XG4gICAgICByZXR1cm4gIXRoaXMuZmlsZXMubGVuZ3RoO1xuICAgfTtcbn1cblxuZW51bSBQb3JjZWxhaW5GaWxlU3RhdHVzIHtcbiAgIEFEREVEID0gJ0EnLFxuICAgREVMRVRFRCA9ICdEJyxcbiAgIE1PRElGSUVEID0gJ00nLFxuICAgUkVOQU1FRCA9ICdSJyxcbiAgIENPUElFRCA9ICdDJyxcbiAgIFVOTUVSR0VEID0gJ1UnLFxuICAgVU5UUkFDS0VEID0gJz8nLFxuICAgSUdOT1JFRCA9ICchJyxcbiAgIE5PTkUgPSAnICcsXG59XG5cbmZ1bmN0aW9uIHJlbmFtZWRGaWxlKGxpbmU6IHN0cmluZykge1xuICAgY29uc3QgW3RvLCBmcm9tXSA9IGxpbmUuc3BsaXQoTlVMTCk7XG5cbiAgIHJldHVybiB7XG4gICAgICBmcm9tOiBmcm9tIHx8IHRvLFxuICAgICAgdG8sXG4gICB9O1xufVxuXG5mdW5jdGlvbiBwYXJzZXIoXG4gICBpbmRleFg6IFBvcmNlbGFpbkZpbGVTdGF0dXMsXG4gICBpbmRleFk6IFBvcmNlbGFpbkZpbGVTdGF0dXMsXG4gICBoYW5kbGVyOiBTdGF0dXNMaW5lUGFyc2VyXG4pOiBbc3RyaW5nLCBTdGF0dXNMaW5lUGFyc2VyXSB7XG4gICByZXR1cm4gW2Ake2luZGV4WH0ke2luZGV4WX1gLCBoYW5kbGVyXTtcbn1cblxuZnVuY3Rpb24gY29uZmxpY3RzKGluZGV4WDogUG9yY2VsYWluRmlsZVN0YXR1cywgLi4uaW5kZXhZOiBQb3JjZWxhaW5GaWxlU3RhdHVzW10pIHtcbiAgIHJldHVybiBpbmRleFkubWFwKCh5KSA9PiBwYXJzZXIoaW5kZXhYLCB5LCAocmVzdWx0LCBmaWxlKSA9PiByZXN1bHQuY29uZmxpY3RlZC5wdXNoKGZpbGUpKSk7XG59XG5cbmNvbnN0IHBhcnNlcnM6IE1hcDxzdHJpbmcsIFN0YXR1c0xpbmVQYXJzZXI+ID0gbmV3IE1hcChbXG4gICBwYXJzZXIoUG9yY2VsYWluRmlsZVN0YXR1cy5OT05FLCBQb3JjZWxhaW5GaWxlU3RhdHVzLkFEREVELCAocmVzdWx0LCBmaWxlKSA9PlxuICAgICAgcmVzdWx0LmNyZWF0ZWQucHVzaChmaWxlKVxuICAgKSxcbiAgIHBhcnNlcihQb3JjZWxhaW5GaWxlU3RhdHVzLk5PTkUsIFBvcmNlbGFpbkZpbGVTdGF0dXMuREVMRVRFRCwgKHJlc3VsdCwgZmlsZSkgPT5cbiAgICAgIHJlc3VsdC5kZWxldGVkLnB1c2goZmlsZSlcbiAgICksXG4gICBwYXJzZXIoUG9yY2VsYWluRmlsZVN0YXR1cy5OT05FLCBQb3JjZWxhaW5GaWxlU3RhdHVzLk1PRElGSUVELCAocmVzdWx0LCBmaWxlKSA9PlxuICAgICAgcmVzdWx0Lm1vZGlmaWVkLnB1c2goZmlsZSlcbiAgICksXG5cbiAgIHBhcnNlcihQb3JjZWxhaW5GaWxlU3RhdHVzLkFEREVELCBQb3JjZWxhaW5GaWxlU3RhdHVzLk5PTkUsIChyZXN1bHQsIGZpbGUpID0+IHtcbiAgICAgIHJlc3VsdC5jcmVhdGVkLnB1c2goZmlsZSk7XG4gICAgICByZXN1bHQuc3RhZ2VkLnB1c2goZmlsZSk7XG4gICB9KSxcbiAgIHBhcnNlcihQb3JjZWxhaW5GaWxlU3RhdHVzLkFEREVELCBQb3JjZWxhaW5GaWxlU3RhdHVzLk1PRElGSUVELCAocmVzdWx0LCBmaWxlKSA9PiB7XG4gICAgICByZXN1bHQuY3JlYXRlZC5wdXNoKGZpbGUpO1xuICAgICAgcmVzdWx0LnN0YWdlZC5wdXNoKGZpbGUpO1xuICAgICAgcmVzdWx0Lm1vZGlmaWVkLnB1c2goZmlsZSk7XG4gICB9KSxcblxuICAgcGFyc2VyKFBvcmNlbGFpbkZpbGVTdGF0dXMuREVMRVRFRCwgUG9yY2VsYWluRmlsZVN0YXR1cy5OT05FLCAocmVzdWx0LCBmaWxlKSA9PiB7XG4gICAgICByZXN1bHQuZGVsZXRlZC5wdXNoKGZpbGUpO1xuICAgICAgcmVzdWx0LnN0YWdlZC5wdXNoKGZpbGUpO1xuICAgfSksXG5cbiAgIHBhcnNlcihQb3JjZWxhaW5GaWxlU3RhdHVzLk1PRElGSUVELCBQb3JjZWxhaW5GaWxlU3RhdHVzLk5PTkUsIChyZXN1bHQsIGZpbGUpID0+IHtcbiAgICAgIHJlc3VsdC5tb2RpZmllZC5wdXNoKGZpbGUpO1xuICAgICAgcmVzdWx0LnN0YWdlZC5wdXNoKGZpbGUpO1xuICAgfSksXG4gICBwYXJzZXIoUG9yY2VsYWluRmlsZVN0YXR1cy5NT0RJRklFRCwgUG9yY2VsYWluRmlsZVN0YXR1cy5NT0RJRklFRCwgKHJlc3VsdCwgZmlsZSkgPT4ge1xuICAgICAgcmVzdWx0Lm1vZGlmaWVkLnB1c2goZmlsZSk7XG4gICAgICByZXN1bHQuc3RhZ2VkLnB1c2goZmlsZSk7XG4gICB9KSxcblxuICAgcGFyc2VyKFBvcmNlbGFpbkZpbGVTdGF0dXMuUkVOQU1FRCwgUG9yY2VsYWluRmlsZVN0YXR1cy5OT05FLCAocmVzdWx0LCBmaWxlKSA9PiB7XG4gICAgICByZXN1bHQucmVuYW1lZC5wdXNoKHJlbmFtZWRGaWxlKGZpbGUpKTtcbiAgIH0pLFxuICAgcGFyc2VyKFBvcmNlbGFpbkZpbGVTdGF0dXMuUkVOQU1FRCwgUG9yY2VsYWluRmlsZVN0YXR1cy5NT0RJRklFRCwgKHJlc3VsdCwgZmlsZSkgPT4ge1xuICAgICAgY29uc3QgcmVuYW1lZCA9IHJlbmFtZWRGaWxlKGZpbGUpO1xuICAgICAgcmVzdWx0LnJlbmFtZWQucHVzaChyZW5hbWVkKTtcbiAgICAgIHJlc3VsdC5tb2RpZmllZC5wdXNoKHJlbmFtZWQudG8pO1xuICAgfSksXG4gICBwYXJzZXIoUG9yY2VsYWluRmlsZVN0YXR1cy5JR05PUkVELCBQb3JjZWxhaW5GaWxlU3RhdHVzLklHTk9SRUQsIChfcmVzdWx0LCBfZmlsZSkgPT4ge1xuICAgICAgKF9yZXN1bHQuaWdub3JlZCA9IF9yZXN1bHQuaWdub3JlZCB8fCBbXSkucHVzaChfZmlsZSk7XG4gICB9KSxcblxuICAgcGFyc2VyKFBvcmNlbGFpbkZpbGVTdGF0dXMuVU5UUkFDS0VELCBQb3JjZWxhaW5GaWxlU3RhdHVzLlVOVFJBQ0tFRCwgKHJlc3VsdCwgZmlsZSkgPT5cbiAgICAgIHJlc3VsdC5ub3RfYWRkZWQucHVzaChmaWxlKVxuICAgKSxcblxuICAgLi4uY29uZmxpY3RzKFBvcmNlbGFpbkZpbGVTdGF0dXMuQURERUQsIFBvcmNlbGFpbkZpbGVTdGF0dXMuQURERUQsIFBvcmNlbGFpbkZpbGVTdGF0dXMuVU5NRVJHRUQpLFxuICAgLi4uY29uZmxpY3RzKFxuICAgICAgUG9yY2VsYWluRmlsZVN0YXR1cy5ERUxFVEVELFxuICAgICAgUG9yY2VsYWluRmlsZVN0YXR1cy5ERUxFVEVELFxuICAgICAgUG9yY2VsYWluRmlsZVN0YXR1cy5VTk1FUkdFRFxuICAgKSxcbiAgIC4uLmNvbmZsaWN0cyhcbiAgICAgIFBvcmNlbGFpbkZpbGVTdGF0dXMuVU5NRVJHRUQsXG4gICAgICBQb3JjZWxhaW5GaWxlU3RhdHVzLkFEREVELFxuICAgICAgUG9yY2VsYWluRmlsZVN0YXR1cy5ERUxFVEVELFxuICAgICAgUG9yY2VsYWluRmlsZVN0YXR1cy5VTk1FUkdFRFxuICAgKSxcblxuICAgW1xuICAgICAgJyMjJyxcbiAgICAgIChyZXN1bHQsIGxpbmUpID0+IHtcbiAgICAgICAgIGNvbnN0IGFoZWFkUmVnID0gL2FoZWFkIChcXGQrKS87XG4gICAgICAgICBjb25zdCBiZWhpbmRSZWcgPSAvYmVoaW5kIChcXGQrKS87XG4gICAgICAgICBjb25zdCBjdXJyZW50UmVnID0gL14oLis/KD89KD86XFwuezN9fFxcc3wkKSkpLztcbiAgICAgICAgIGNvbnN0IHRyYWNraW5nUmVnID0gL1xcLnszfShcXFMqKS87XG4gICAgICAgICBjb25zdCBvbkVtcHR5QnJhbmNoUmVnID0gL1xcc29uXFxzKFxcUys/KSg/PVxcLnszfXwkKS87XG5cbiAgICAgICAgIGxldCByZWdleFJlc3VsdCA9IGFoZWFkUmVnLmV4ZWMobGluZSk7XG4gICAgICAgICByZXN1bHQuYWhlYWQgPSAocmVnZXhSZXN1bHQgJiYgK3JlZ2V4UmVzdWx0WzFdKSB8fCAwO1xuXG4gICAgICAgICByZWdleFJlc3VsdCA9IGJlaGluZFJlZy5leGVjKGxpbmUpO1xuICAgICAgICAgcmVzdWx0LmJlaGluZCA9IChyZWdleFJlc3VsdCAmJiArcmVnZXhSZXN1bHRbMV0pIHx8IDA7XG5cbiAgICAgICAgIHJlZ2V4UmVzdWx0ID0gY3VycmVudFJlZy5leGVjKGxpbmUpO1xuICAgICAgICAgcmVzdWx0LmN1cnJlbnQgPSBmaWx0ZXJUeXBlKHJlZ2V4UmVzdWx0Py5bMV0sIGZpbHRlclN0cmluZywgbnVsbCk7XG5cbiAgICAgICAgIHJlZ2V4UmVzdWx0ID0gdHJhY2tpbmdSZWcuZXhlYyhsaW5lKTtcbiAgICAgICAgIHJlc3VsdC50cmFja2luZyA9IGZpbHRlclR5cGUocmVnZXhSZXN1bHQ/LlsxXSwgZmlsdGVyU3RyaW5nLCBudWxsKTtcblxuICAgICAgICAgcmVnZXhSZXN1bHQgPSBvbkVtcHR5QnJhbmNoUmVnLmV4ZWMobGluZSk7XG4gICAgICAgICBpZiAocmVnZXhSZXN1bHQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5jdXJyZW50ID0gZmlsdGVyVHlwZShyZWdleFJlc3VsdD8uWzFdLCBmaWx0ZXJTdHJpbmcsIHJlc3VsdC5jdXJyZW50KTtcbiAgICAgICAgIH1cblxuICAgICAgICAgcmVzdWx0LmRldGFjaGVkID0gL1xcKG5vIGJyYW5jaFxcKS8udGVzdChsaW5lKTtcbiAgICAgIH0sXG4gICBdLFxuXSk7XG5cbmV4cG9ydCBjb25zdCBwYXJzZVN0YXR1c1N1bW1hcnkgPSBmdW5jdGlvbiAodGV4dDogc3RyaW5nKTogU3RhdHVzUmVzdWx0IHtcbiAgIGNvbnN0IGxpbmVzID0gdGV4dC5zcGxpdChOVUxMKTtcbiAgIGNvbnN0IHN0YXR1cyA9IG5ldyBTdGF0dXNTdW1tYXJ5KCk7XG5cbiAgIGZvciAobGV0IGkgPSAwLCBsID0gbGluZXMubGVuZ3RoOyBpIDwgbDsgKSB7XG4gICAgICBsZXQgbGluZSA9IGxpbmVzW2krK10udHJpbSgpO1xuXG4gICAgICBpZiAoIWxpbmUpIHtcbiAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobGluZS5jaGFyQXQoMCkgPT09IFBvcmNlbGFpbkZpbGVTdGF0dXMuUkVOQU1FRCkge1xuICAgICAgICAgbGluZSArPSBOVUxMICsgKGxpbmVzW2krK10gfHwgJycpO1xuICAgICAgfVxuXG4gICAgICBzcGxpdExpbmUoc3RhdHVzLCBsaW5lKTtcbiAgIH1cblxuICAgcmV0dXJuIHN0YXR1cztcbn07XG5cbmZ1bmN0aW9uIHNwbGl0TGluZShyZXN1bHQ6IFN0YXR1c1Jlc3VsdCwgbGluZVN0cjogc3RyaW5nKSB7XG4gICBjb25zdCB0cmltbWVkID0gbGluZVN0ci50cmltKCk7XG4gICBzd2l0Y2ggKCcgJykge1xuICAgICAgY2FzZSB0cmltbWVkLmNoYXJBdCgyKTpcbiAgICAgICAgIHJldHVybiBkYXRhKHRyaW1tZWQuY2hhckF0KDApLCB0cmltbWVkLmNoYXJBdCgxKSwgdHJpbW1lZC5zbGljZSgzKSk7XG4gICAgICBjYXNlIHRyaW1tZWQuY2hhckF0KDEpOlxuICAgICAgICAgcmV0dXJuIGRhdGEoUG9yY2VsYWluRmlsZVN0YXR1cy5OT05FLCB0cmltbWVkLmNoYXJBdCgwKSwgdHJpbW1lZC5zbGljZSgyKSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAgcmV0dXJuO1xuICAgfVxuXG4gICBmdW5jdGlvbiBkYXRhKGluZGV4OiBzdHJpbmcsIHdvcmtpbmdEaXI6IHN0cmluZywgcGF0aDogc3RyaW5nKSB7XG4gICAgICBjb25zdCByYXcgPSBgJHtpbmRleH0ke3dvcmtpbmdEaXJ9YDtcbiAgICAgIGNvbnN0IGhhbmRsZXIgPSBwYXJzZXJzLmdldChyYXcpO1xuXG4gICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgaGFuZGxlcihyZXN1bHQsIHBhdGgpO1xuICAgICAgfVxuXG4gICAgICBpZiAocmF3ICE9PSAnIyMnICYmIHJhdyAhPT0gJyEhJykge1xuICAgICAgICAgcmVzdWx0LmZpbGVzLnB1c2gobmV3IEZpbGVTdGF0dXNTdW1tYXJ5KHBhdGgsIGluZGV4LCB3b3JraW5nRGlyKSk7XG4gICAgICB9XG4gICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBTdGF0dXNSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IHBhcnNlU3RhdHVzU3VtbWFyeSB9IGZyb20gJy4uL3Jlc3BvbnNlcy9TdGF0dXNTdW1tYXJ5JztcbmltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcblxuY29uc3QgaWdub3JlZE9wdGlvbnMgPSBbJy0tbnVsbCcsICcteiddO1xuXG5leHBvcnQgZnVuY3Rpb24gc3RhdHVzVGFzayhjdXN0b21BcmdzOiBzdHJpbmdbXSk6IFN0cmluZ1Rhc2s8U3RhdHVzUmVzdWx0PiB7XG4gICBjb25zdCBjb21tYW5kcyA9IFtcbiAgICAgICdzdGF0dXMnLFxuICAgICAgJy0tcG9yY2VsYWluJyxcbiAgICAgICctYicsXG4gICAgICAnLXUnLFxuICAgICAgJy0tbnVsbCcsXG4gICAgICAuLi5jdXN0b21BcmdzLmZpbHRlcigoYXJnKSA9PiAhaWdub3JlZE9wdGlvbnMuaW5jbHVkZXMoYXJnKSksXG4gICBdO1xuXG4gICByZXR1cm4ge1xuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgY29tbWFuZHMsXG4gICAgICBwYXJzZXIodGV4dDogc3RyaW5nKSB7XG4gICAgICAgICByZXR1cm4gcGFyc2VTdGF0dXNTdW1tYXJ5KHRleHQpO1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0QXBpIH0gZnJvbSAnLi4vc2ltcGxlLWdpdC1hcGknO1xuaW1wb3J0IHsgYXNOdW1iZXIsIEV4aXRDb2RlcywgTGluZVBhcnNlciwgcGFyc2VTdHJpbmdSZXNwb25zZSB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBWZXJzaW9uUmVzdWx0IHtcbiAgIG1ham9yOiBudW1iZXI7XG4gICBtaW5vcjogbnVtYmVyO1xuICAgcGF0Y2g6IG51bWJlciB8IHN0cmluZztcbiAgIGFnZW50OiBzdHJpbmc7XG4gICBpbnN0YWxsZWQ6IGJvb2xlYW47XG59XG5cbmNvbnN0IE5PVF9JTlNUQUxMRUQgPSAnaW5zdGFsbGVkPWZhbHNlJztcblxuZnVuY3Rpb24gdmVyc2lvblJlc3BvbnNlKFxuICAgbWFqb3IgPSAwLFxuICAgbWlub3IgPSAwLFxuICAgcGF0Y2g6IHN0cmluZyB8IG51bWJlciA9IDAsXG4gICBhZ2VudCA9ICcnLFxuICAgaW5zdGFsbGVkID0gdHJ1ZVxuKTogVmVyc2lvblJlc3VsdCB7XG4gICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICAgICAge1xuICAgICAgICAgbWFqb3IsXG4gICAgICAgICBtaW5vcixcbiAgICAgICAgIHBhdGNoLFxuICAgICAgICAgYWdlbnQsXG4gICAgICAgICBpbnN0YWxsZWQsXG4gICAgICB9LFxuICAgICAgJ3RvU3RyaW5nJyxcbiAgICAgIHtcbiAgICAgICAgIHZhbHVlKCkge1xuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMubWFqb3J9LiR7dGhpcy5taW5vcn0uJHt0aGlzLnBhdGNofWA7XG4gICAgICAgICB9LFxuICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgfVxuICAgKTtcbn1cblxuZnVuY3Rpb24gbm90SW5zdGFsbGVkUmVzcG9uc2UoKSB7XG4gICByZXR1cm4gdmVyc2lvblJlc3BvbnNlKDAsIDAsIDAsICcnLCBmYWxzZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpOiBQaWNrPFNpbXBsZUdpdCwgJ3ZlcnNpb24nPiB7XG4gICByZXR1cm4ge1xuICAgICAgdmVyc2lvbih0aGlzOiBTaW1wbGVHaXRBcGkpIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKHtcbiAgICAgICAgICAgIGNvbW1hbmRzOiBbJy0tdmVyc2lvbiddLFxuICAgICAgICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgICAgICAgcGFyc2VyOiB2ZXJzaW9uUGFyc2VyLFxuICAgICAgICAgICAgb25FcnJvcihyZXN1bHQsIGVycm9yLCBkb25lLCBmYWlsKSB7XG4gICAgICAgICAgICAgICBpZiAocmVzdWx0LmV4aXRDb2RlID09PSBFeGl0Q29kZXMuTk9UX0ZPVU5EKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShCdWZmZXIuZnJvbShOT1RfSU5TVEFMTEVEKSk7XG4gICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgIGZhaWwoZXJyb3IpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgIH0pO1xuICAgICAgfSxcbiAgIH07XG59XG5cbmNvbnN0IHBhcnNlcnM6IExpbmVQYXJzZXI8VmVyc2lvblJlc3VsdD5bXSA9IFtcbiAgIG5ldyBMaW5lUGFyc2VyKFxuICAgICAgL3ZlcnNpb24gKFxcZCspXFwuKFxcZCspXFwuKFxcZCspKD86XFxzKlxcKCguKylcXCkpPy8sXG4gICAgICAocmVzdWx0LCBbbWFqb3IsIG1pbm9yLCBwYXRjaCwgYWdlbnQgPSAnJ10pID0+IHtcbiAgICAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgICB2ZXJzaW9uUmVzcG9uc2UoYXNOdW1iZXIobWFqb3IpLCBhc051bWJlcihtaW5vciksIGFzTnVtYmVyKHBhdGNoKSwgYWdlbnQpXG4gICAgICAgICApO1xuICAgICAgfVxuICAgKSxcbiAgIG5ldyBMaW5lUGFyc2VyKFxuICAgICAgL3ZlcnNpb24gKFxcZCspXFwuKFxcZCspXFwuKFxcRCspKC4rKT8kLyxcbiAgICAgIChyZXN1bHQsIFttYWpvciwgbWlub3IsIHBhdGNoLCBhZ2VudCA9ICcnXSkgPT4ge1xuICAgICAgICAgT2JqZWN0LmFzc2lnbihyZXN1bHQsIHZlcnNpb25SZXNwb25zZShhc051bWJlcihtYWpvciksIGFzTnVtYmVyKG1pbm9yKSwgcGF0Y2gsIGFnZW50KSk7XG4gICAgICB9XG4gICApLFxuXTtcblxuZnVuY3Rpb24gdmVyc2lvblBhcnNlcihzdGRPdXQ6IHN0cmluZykge1xuICAgaWYgKHN0ZE91dCA9PT0gTk9UX0lOU1RBTExFRCkge1xuICAgICAgcmV0dXJuIG5vdEluc3RhbGxlZFJlc3BvbnNlKCk7XG4gICB9XG5cbiAgIHJldHVybiBwYXJzZVN0cmluZ1Jlc3BvbnNlKHZlcnNpb25SZXNwb25zZSgwLCAwLCAwLCBzdGRPdXQpLCBwYXJzZXJzLCBzdGRPdXQpO1xufVxuIiwgImltcG9ydCB0eXBlIHsgU2ltcGxlR2l0QmFzZSB9IGZyb20gJy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgdGFza0NhbGxiYWNrIH0gZnJvbSAnLi90YXNrLWNhbGxiYWNrJztcbmltcG9ydCB7IGNoYW5nZVdvcmtpbmdEaXJlY3RvcnlUYXNrIH0gZnJvbSAnLi90YXNrcy9jaGFuZ2Utd29ya2luZy1kaXJlY3RvcnknO1xuaW1wb3J0IGNoZWNrb3V0IGZyb20gJy4vdGFza3MvY2hlY2tvdXQnO1xuaW1wb3J0IGNsb25lIGZyb20gJy4vdGFza3MvY2xvbmUnO1xuaW1wb3J0IGNvbW1pdCBmcm9tICcuL3Rhc2tzL2NvbW1pdCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4vdGFza3MvY29uZmlnJztcbmltcG9ydCBjb3VudE9iamVjdHMgZnJvbSAnLi90YXNrcy9jb3VudC1vYmplY3RzJztcbmltcG9ydCBmaXJzdENvbW1pdCBmcm9tICcuL3Rhc2tzL2ZpcnN0LWNvbW1pdCc7XG5pbXBvcnQgZ3JlcCBmcm9tICcuL3Rhc2tzL2dyZXAnO1xuaW1wb3J0IHsgaGFzaE9iamVjdFRhc2sgfSBmcm9tICcuL3Rhc2tzL2hhc2gtb2JqZWN0JztcbmltcG9ydCB7IGluaXRUYXNrIH0gZnJvbSAnLi90YXNrcy9pbml0JztcbmltcG9ydCBpbnRlcnByZXRUcmFpbGVycyBmcm9tICcuL3Rhc2tzL2ludGVycHJldC10cmFpbGVycyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vdGFza3MvbG9nJztcbmltcG9ydCB7IG1lcmdlVGFzayB9IGZyb20gJy4vdGFza3MvbWVyZ2UnO1xuaW1wb3J0IHsgcHVzaFRhc2sgfSBmcm9tICcuL3Rhc2tzL3B1c2gnO1xuaW1wb3J0IHNob3cgZnJvbSAnLi90YXNrcy9zaG93JztcbmltcG9ydCB7IHN0YXR1c1Rhc2sgfSBmcm9tICcuL3Rhc2tzL3N0YXR1cyc7XG5pbXBvcnQgeyBjb25maWd1cmF0aW9uRXJyb3JUYXNrLCBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrIH0gZnJvbSAnLi90YXNrcy90YXNrJztcbmltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdGFza3MvdmVyc2lvbic7XG5pbXBvcnQgdHlwZSB7XG4gICBvdXRwdXRIYW5kbGVyLFxuICAgU2ltcGxlR2l0RXhlY3V0b3IsXG4gICBTaW1wbGVHaXRUYXNrLFxuICAgU2ltcGxlR2l0VGFza0NhbGxiYWNrLFxufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7XG4gICBhc0FycmF5LFxuICAgZmlsdGVyU3RyaW5nLFxuICAgZmlsdGVyVHlwZSxcbiAgIGdldFRyYWlsaW5nT3B0aW9ucyxcbiAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudCxcbn0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBjbGFzcyBTaW1wbGVHaXRBcGkgaW1wbGVtZW50cyBTaW1wbGVHaXRCYXNlIHtcbiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2V4ZWN1dG9yOiBTaW1wbGVHaXRFeGVjdXRvcikge31cblxuICAgcHJvdGVjdGVkIF9ydW5UYXNrPFQ+KHRhc2s6IFNpbXBsZUdpdFRhc2s8VD4sIHRoZW4/OiBTaW1wbGVHaXRUYXNrQ2FsbGJhY2s8VD4pIHtcbiAgICAgIGNvbnN0IGNoYWluID0gdGhpcy5fZXhlY3V0b3IuY2hhaW4oKTtcbiAgICAgIGNvbnN0IHByb21pc2UgPSBjaGFpbi5wdXNoKHRhc2spO1xuXG4gICAgICBpZiAodGhlbikge1xuICAgICAgICAgdGFza0NhbGxiYWNrKHRhc2ssIHByb21pc2UsIHRoZW4pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZSh0aGlzLCB7XG4gICAgICAgICB0aGVuOiB7IHZhbHVlOiBwcm9taXNlLnRoZW4uYmluZChwcm9taXNlKSB9LFxuICAgICAgICAgY2F0Y2g6IHsgdmFsdWU6IHByb21pc2UuY2F0Y2guYmluZChwcm9taXNlKSB9LFxuICAgICAgICAgX2V4ZWN1dG9yOiB7IHZhbHVlOiBjaGFpbiB9LFxuICAgICAgfSk7XG4gICB9XG5cbiAgIGFkZChmaWxlczogc3RyaW5nIHwgc3RyaW5nW10pIHtcbiAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhbJ2FkZCcsIC4uLmFzQXJyYXkoZmlsZXMpXSksXG4gICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgKTtcbiAgIH1cblxuICAgY3dkKGRpcmVjdG9yeTogc3RyaW5nIHwgeyBwYXRoOiBzdHJpbmc7IHJvb3Q/OiBib29sZWFuIH0pIHtcbiAgICAgIGNvbnN0IG5leHQgPSB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKTtcblxuICAgICAgaWYgKHR5cGVvZiBkaXJlY3RvcnkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhjaGFuZ2VXb3JraW5nRGlyZWN0b3J5VGFzayhkaXJlY3RvcnksIHRoaXMuX2V4ZWN1dG9yKSwgbmV4dCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgZGlyZWN0b3J5Py5wYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICAgICBjaGFuZ2VXb3JraW5nRGlyZWN0b3J5VGFzayhcbiAgICAgICAgICAgICAgIGRpcmVjdG9yeS5wYXRoLFxuICAgICAgICAgICAgICAgKGRpcmVjdG9yeS5yb290ICYmIHRoaXMuX2V4ZWN1dG9yKSB8fCB1bmRlZmluZWRcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBuZXh0XG4gICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgIGNvbmZpZ3VyYXRpb25FcnJvclRhc2soJ0dpdC5jd2Q6IHdvcmtpbmdEaXJlY3RvcnkgbXVzdCBiZSBzdXBwbGllZCBhcyBhIHN0cmluZycpLFxuICAgICAgICAgbmV4dFxuICAgICAgKTtcbiAgIH1cblxuICAgaGFzaE9iamVjdChwYXRoOiBzdHJpbmcsIHdyaXRlOiBib29sZWFuIHwgdW5rbm93bikge1xuICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICBoYXNoT2JqZWN0VGFzayhwYXRoLCB3cml0ZSA9PT0gdHJ1ZSksXG4gICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgKTtcbiAgIH1cblxuICAgaW5pdChiYXJlPzogYm9vbGVhbiB8IHVua25vd24pIHtcbiAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgaW5pdFRhc2soYmFyZSA9PT0gdHJ1ZSwgdGhpcy5fZXhlY3V0b3IuY3dkLCBnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKSksXG4gICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgKTtcbiAgIH1cblxuICAgbWVyZ2UoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgIG1lcmdlVGFzayhnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKSksXG4gICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgKTtcbiAgIH1cblxuICAgbWVyZ2VGcm9tVG8ocmVtb3RlOiBzdHJpbmcsIGJyYW5jaDogc3RyaW5nKSB7XG4gICAgICBpZiAoIShmaWx0ZXJTdHJpbmcocmVtb3RlKSAmJiBmaWx0ZXJTdHJpbmcoYnJhbmNoKSkpIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgY29uZmlndXJhdGlvbkVycm9yVGFzayhcbiAgICAgICAgICAgICAgIGBHaXQubWVyZ2VGcm9tVG8gcmVxdWlyZXMgdGhhdCB0aGUgJ3JlbW90ZScgYW5kICdicmFuY2gnIGFyZ3VtZW50cyBhcmUgc3VwcGxpZWQgYXMgc3RyaW5nc2BcbiAgICAgICAgICAgIClcbiAgICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgbWVyZ2VUYXNrKFtyZW1vdGUsIGJyYW5jaCwgLi4uZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cyldKSxcbiAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMsIGZhbHNlKVxuICAgICAgKTtcbiAgIH1cblxuICAgb3V0cHV0SGFuZGxlcihoYW5kbGVyOiBvdXRwdXRIYW5kbGVyKSB7XG4gICAgICB0aGlzLl9leGVjdXRvci5vdXRwdXRIYW5kbGVyID0gaGFuZGxlcjtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgfVxuXG4gICBwdXNoKCkge1xuICAgICAgY29uc3QgdGFzayA9IHB1c2hUYXNrKFxuICAgICAgICAge1xuICAgICAgICAgICAgcmVtb3RlOiBmaWx0ZXJUeXBlKGFyZ3VtZW50c1swXSwgZmlsdGVyU3RyaW5nKSxcbiAgICAgICAgICAgIGJyYW5jaDogZmlsdGVyVHlwZShhcmd1bWVudHNbMV0sIGZpbHRlclN0cmluZyksXG4gICAgICAgICB9LFxuICAgICAgICAgZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cylcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKHRhc2ssIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpKTtcbiAgIH1cblxuICAgc3Rhc2goKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soWydzdGFzaCcsIC4uLmdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpXSksXG4gICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgKTtcbiAgIH1cblxuICAgc3RhdHVzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICBzdGF0dXNUYXNrKGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpKSxcbiAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICApO1xuICAgfVxufVxuXG5PYmplY3QuYXNzaWduKFxuICAgU2ltcGxlR2l0QXBpLnByb3RvdHlwZSxcbiAgIGNoZWNrb3V0KCksXG4gICBjbG9uZSgpLFxuICAgY29tbWl0KCksXG4gICBjb25maWcoKSxcbiAgIGNvdW50T2JqZWN0cygpLFxuICAgZmlyc3RDb21taXQoKSxcbiAgIGdyZXAoKSxcbiAgIGludGVycHJldFRyYWlsZXJzKCksXG4gICBsb2coKSxcbiAgIHNob3coKSxcbiAgIHZlcnNpb24oKVxuKTtcbiIsICJpbXBvcnQgeyBjcmVhdGVEZWZlcnJlZCwgdHlwZSBEZWZlcnJlZFByb21pc2UgfSBmcm9tICdAa3dzaXRlcy9wcm9taXNlLWRlZmVycmVkJztcblxuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSAnLi4vZ2l0LWxvZ2dlcic7XG5pbXBvcnQgeyBhcHBlbmQsIHJlbW92ZSB9IGZyb20gJy4uL3V0aWxzJztcblxudHlwZSBTY2hlZHVsZUNvbXBsZXRlQ2FsbGJhY2sgPSAoKSA9PiB2b2lkO1xudHlwZSBTY2hlZHVsZWRUYXNrID0gUGljazxEZWZlcnJlZFByb21pc2U8U2NoZWR1bGVDb21wbGV0ZUNhbGxiYWNrPiwgJ3Byb21pc2UnIHwgJ2RvbmUnPiAmIHtcbiAgIGlkOiBudW1iZXI7XG59O1xuXG5jb25zdCBjcmVhdGVTY2hlZHVsZWRUYXNrOiAoKSA9PiBTY2hlZHVsZWRUYXNrID0gKCgpID0+IHtcbiAgIGxldCBpZCA9IDA7XG4gICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWQrKztcbiAgICAgIGNvbnN0IHsgcHJvbWlzZSwgZG9uZSB9ID0gY3JlYXRlRGVmZXJyZWQ8U2NoZWR1bGVDb21wbGV0ZUNhbGxiYWNrPigpO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAgcHJvbWlzZSxcbiAgICAgICAgIGRvbmUsXG4gICAgICAgICBpZCxcbiAgICAgIH07XG4gICB9O1xufSkoKTtcblxuZXhwb3J0IGNsYXNzIFNjaGVkdWxlciB7XG4gICBwcml2YXRlIGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcignJywgJ3NjaGVkdWxlcicpO1xuICAgcHJpdmF0ZSBwZW5kaW5nOiBTY2hlZHVsZWRUYXNrW10gPSBbXTtcbiAgIHByaXZhdGUgcnVubmluZzogU2NoZWR1bGVkVGFza1tdID0gW107XG5cbiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uY3VycmVuY3kgPSAyKSB7XG4gICAgICB0aGlzLmxvZ2dlcihgQ29uc3RydWN0ZWQsIGNvbmN1cnJlbmN5PSVzYCwgY29uY3VycmVuY3kpO1xuICAgfVxuXG4gICBwcml2YXRlIHNjaGVkdWxlKCkge1xuICAgICAgaWYgKCF0aGlzLnBlbmRpbmcubGVuZ3RoIHx8IHRoaXMucnVubmluZy5sZW5ndGggPj0gdGhpcy5jb25jdXJyZW5jeSkge1xuICAgICAgICAgdGhpcy5sb2dnZXIoXG4gICAgICAgICAgICBgU2NoZWR1bGUgYXR0ZW1wdCBpZ25vcmVkLCBwZW5kaW5nPSVzIHJ1bm5pbmc9JXMgY29uY3VycmVuY3k9JXNgLFxuICAgICAgICAgICAgdGhpcy5wZW5kaW5nLmxlbmd0aCxcbiAgICAgICAgICAgIHRoaXMucnVubmluZy5sZW5ndGgsXG4gICAgICAgICAgICB0aGlzLmNvbmN1cnJlbmN5XG4gICAgICAgICApO1xuICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0YXNrID0gYXBwZW5kKHRoaXMucnVubmluZywgdGhpcy5wZW5kaW5nLnNoaWZ0KCkhKTtcbiAgICAgIHRoaXMubG9nZ2VyKGBBdHRlbXB0aW5nIGlkPSVzYCwgdGFzay5pZCk7XG4gICAgICB0YXNrLmRvbmUoKCkgPT4ge1xuICAgICAgICAgdGhpcy5sb2dnZXIoYENvbXBsZXRpbmcgaWQ9YCwgdGFzay5pZCk7XG4gICAgICAgICByZW1vdmUodGhpcy5ydW5uaW5nLCB0YXNrKTtcbiAgICAgICAgIHRoaXMuc2NoZWR1bGUoKTtcbiAgICAgIH0pO1xuICAgfVxuXG4gICBuZXh0KCk6IFByb21pc2U8U2NoZWR1bGVDb21wbGV0ZUNhbGxiYWNrPiB7XG4gICAgICBjb25zdCB7IHByb21pc2UsIGlkIH0gPSBhcHBlbmQodGhpcy5wZW5kaW5nLCBjcmVhdGVTY2hlZHVsZWRUYXNrKCkpO1xuICAgICAgdGhpcy5sb2dnZXIoYFNjaGVkdWxpbmcgaWQ9JXNgLCBpZCk7XG5cbiAgICAgIHRoaXMuc2NoZWR1bGUoKTtcblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBPcHRpb25GbGFncywgT3B0aW9ucywgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5leHBvcnQgdHlwZSBBcHBseU9wdGlvbnMgPSBPcHRpb25zICZcbiAgIE9wdGlvbkZsYWdzPFxuICAgICAgfCAnLS1zdGF0J1xuICAgICAgfCAnLS1udW1zdGF0J1xuICAgICAgfCAnLS1zdW1tYXJ5J1xuICAgICAgfCAnLS1jaGVjaydcbiAgICAgIHwgJy0taW5kZXgnXG4gICAgICB8ICctLWludGVudC10by1hZGQnXG4gICAgICB8ICctLTN3YXknXG4gICAgICB8ICctLWFwcGx5J1xuICAgICAgfCAnLS1uby1hZGQnXG4gICAgICB8ICctUidcbiAgICAgIHwgJy0tcmV2ZXJzZSdcbiAgICAgIHwgJy0tYWxsb3ctYmluYXJ5LXJlcGxhY2VtZW50J1xuICAgICAgfCAnLS1iaW5hcnknXG4gICAgICB8ICctLXJlamVjdCdcbiAgICAgIHwgJy16J1xuICAgICAgfCAnLS1pbmFjY3VyYXRlLWVvZidcbiAgICAgIHwgJy0tcmVjb3VudCdcbiAgICAgIHwgJy0tY2FjaGVkJ1xuICAgICAgfCAnLS1pZ25vcmUtc3BhY2UtY2hhbmdlJ1xuICAgICAgfCAnLS1pZ25vcmUtd2hpdGVzcGFjZSdcbiAgICAgIHwgJy0tdmVyYm9zZSdcbiAgICAgIHwgJy0tdW5zYWZlLXBhdGhzJ1xuICAgPiAmXG4gICBPcHRpb25GbGFnczwnLS13aGl0ZXNwYWNlJywgJ25vd2FybicgfCAnd2FybicgfCAnZml4JyB8ICdlcnJvcicgfCAnZXJyb3ItYWxsJz4gJlxuICAgT3B0aW9uRmxhZ3M8Jy0tYnVpbGQtZmFrZS1hbmNlc3RvcicgfCAnLS1leGNsdWRlJyB8ICctLWluY2x1ZGUnIHwgJy0tZGlyZWN0b3J5Jywgc3RyaW5nPiAmXG4gICBPcHRpb25GbGFnczwnLXAnIHwgJy1DJywgbnVtYmVyPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5UGF0Y2hUYXNrKHBhdGNoZXM6IHN0cmluZ1tdLCBjdXN0b21BcmdzOiBzdHJpbmdbXSk6IFN0cmluZ1Rhc2s8c3RyaW5nPiB7XG4gICByZXR1cm4gc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhbJ2FwcGx5JywgLi4uY3VzdG9tQXJncywgLi4ucGF0Y2hlc10pO1xufVxuIiwgImltcG9ydCB0eXBlIHsgQnJhbmNoU3VtbWFyeSwgQnJhbmNoU3VtbWFyeUJyYW5jaCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuXG5leHBvcnQgZW51bSBCcmFuY2hTdGF0dXNJZGVudGlmaWVyIHtcbiAgIENVUlJFTlQgPSAnKicsXG4gICBMSU5LRUQgPSAnKycsXG59XG5cbmV4cG9ydCBjbGFzcyBCcmFuY2hTdW1tYXJ5UmVzdWx0IGltcGxlbWVudHMgQnJhbmNoU3VtbWFyeSB7XG4gICBwdWJsaWMgYWxsOiBzdHJpbmdbXSA9IFtdO1xuICAgcHVibGljIGJyYW5jaGVzOiB7IFtwOiBzdHJpbmddOiBCcmFuY2hTdW1tYXJ5QnJhbmNoIH0gPSB7fTtcbiAgIHB1YmxpYyBjdXJyZW50OiBzdHJpbmcgPSAnJztcbiAgIHB1YmxpYyBkZXRhY2hlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICBwdXNoKFxuICAgICAgc3RhdHVzOiBCcmFuY2hTdGF0dXNJZGVudGlmaWVyIHwgdW5rbm93bixcbiAgICAgIGRldGFjaGVkOiBib29sZWFuLFxuICAgICAgbmFtZTogc3RyaW5nLFxuICAgICAgY29tbWl0OiBzdHJpbmcsXG4gICAgICBsYWJlbDogc3RyaW5nXG4gICApIHtcbiAgICAgIGlmIChzdGF0dXMgPT09IEJyYW5jaFN0YXR1c0lkZW50aWZpZXIuQ1VSUkVOVCkge1xuICAgICAgICAgdGhpcy5kZXRhY2hlZCA9IGRldGFjaGVkO1xuICAgICAgICAgdGhpcy5jdXJyZW50ID0gbmFtZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hbGwucHVzaChuYW1lKTtcbiAgICAgIHRoaXMuYnJhbmNoZXNbbmFtZV0gPSB7XG4gICAgICAgICBjdXJyZW50OiBzdGF0dXMgPT09IEJyYW5jaFN0YXR1c0lkZW50aWZpZXIuQ1VSUkVOVCxcbiAgICAgICAgIGxpbmtlZFdvcmtUcmVlOiBzdGF0dXMgPT09IEJyYW5jaFN0YXR1c0lkZW50aWZpZXIuTElOS0VELFxuICAgICAgICAgbmFtZSxcbiAgICAgICAgIGNvbW1pdCxcbiAgICAgICAgIGxhYmVsLFxuICAgICAgfTtcbiAgIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IEJyYW5jaFN1bW1hcnkgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IEJyYW5jaFN0YXR1c0lkZW50aWZpZXIsIEJyYW5jaFN1bW1hcnlSZXN1bHQgfSBmcm9tICcuLi9yZXNwb25zZXMvQnJhbmNoU3VtbWFyeSc7XG5pbXBvcnQgeyBMaW5lUGFyc2VyLCBwYXJzZVN0cmluZ1Jlc3BvbnNlIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5jb25zdCBwYXJzZXJzOiBMaW5lUGFyc2VyPEJyYW5jaFN1bW1hcnlSZXN1bHQ+W10gPSBbXG4gICBuZXcgTGluZVBhcnNlcihcbiAgICAgIC9eKFsqK11cXHMpP1xcKCg/OkhFQUQgKT9kZXRhY2hlZCAoPzpmcm9tfGF0KSAoXFxTKylcXClcXHMrKFthLXowLTldKylcXHMoLiopJC8sXG4gICAgICAocmVzdWx0LCBbY3VycmVudCwgbmFtZSwgY29tbWl0LCBsYWJlbF0pID0+IHtcbiAgICAgICAgIHJlc3VsdC5wdXNoKGJyYW5jaFN0YXR1cyhjdXJyZW50KSwgdHJ1ZSwgbmFtZSwgY29tbWl0LCBsYWJlbCk7XG4gICAgICB9XG4gICApLFxuICAgbmV3IExpbmVQYXJzZXIoXG4gICAgICAvXihbKitdXFxzKT8oXFxTKylcXHMrKFthLXowLTldKylcXHM/KC4qKSQvcyxcbiAgICAgIChyZXN1bHQsIFtjdXJyZW50LCBuYW1lLCBjb21taXQsIGxhYmVsXSkgPT4ge1xuICAgICAgICAgcmVzdWx0LnB1c2goYnJhbmNoU3RhdHVzKGN1cnJlbnQpLCBmYWxzZSwgbmFtZSwgY29tbWl0LCBsYWJlbCk7XG4gICAgICB9XG4gICApLFxuXTtcblxuY29uc3QgY3VycmVudEJyYW5jaFBhcnNlciA9IG5ldyBMaW5lUGFyc2VyPEJyYW5jaFN1bW1hcnlSZXN1bHQ+KC9eKFxcUyspJC9zLCAocmVzdWx0LCBbbmFtZV0pID0+IHtcbiAgIHJlc3VsdC5wdXNoKEJyYW5jaFN0YXR1c0lkZW50aWZpZXIuQ1VSUkVOVCwgZmFsc2UsIG5hbWUsICcnLCAnJyk7XG59KTtcblxuZnVuY3Rpb24gYnJhbmNoU3RhdHVzKGlucHV0Pzogc3RyaW5nKSB7XG4gICByZXR1cm4gaW5wdXQgPyBpbnB1dC5jaGFyQXQoMCkgOiAnJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQnJhbmNoU3VtbWFyeShzdGRPdXQ6IHN0cmluZywgY3VycmVudE9ubHkgPSBmYWxzZSk6IEJyYW5jaFN1bW1hcnkge1xuICAgcmV0dXJuIHBhcnNlU3RyaW5nUmVzcG9uc2UoXG4gICAgICBuZXcgQnJhbmNoU3VtbWFyeVJlc3VsdCgpLFxuICAgICAgY3VycmVudE9ubHkgPyBbY3VycmVudEJyYW5jaFBhcnNlcl0gOiBwYXJzZXJzLFxuICAgICAgc3RkT3V0XG4gICApO1xufVxuIiwgImltcG9ydCB0eXBlIHtcbiAgIEJyYW5jaE11bHRpRGVsZXRlUmVzdWx0LFxuICAgQnJhbmNoU2luZ2xlRGVsZXRlRmFpbHVyZSxcbiAgIEJyYW5jaFNpbmdsZURlbGV0ZVJlc3VsdCxcbiAgIEJyYW5jaFNpbmdsZURlbGV0ZVN1Y2Nlc3MsXG59IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuXG5leHBvcnQgY2xhc3MgQnJhbmNoRGVsZXRpb25CYXRjaCBpbXBsZW1lbnRzIEJyYW5jaE11bHRpRGVsZXRlUmVzdWx0IHtcbiAgIGFsbDogQnJhbmNoU2luZ2xlRGVsZXRlUmVzdWx0W10gPSBbXTtcbiAgIGJyYW5jaGVzOiB7IFticmFuY2hOYW1lOiBzdHJpbmddOiBCcmFuY2hTaW5nbGVEZWxldGVSZXN1bHQgfSA9IHt9O1xuICAgZXJyb3JzOiBCcmFuY2hTaW5nbGVEZWxldGVSZXN1bHRbXSA9IFtdO1xuXG4gICBnZXQgc3VjY2VzcygpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiAhdGhpcy5lcnJvcnMubGVuZ3RoO1xuICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYnJhbmNoRGVsZXRpb25TdWNjZXNzKGJyYW5jaDogc3RyaW5nLCBoYXNoOiBzdHJpbmcpOiBCcmFuY2hTaW5nbGVEZWxldGVTdWNjZXNzIHtcbiAgIHJldHVybiB7XG4gICAgICBicmFuY2gsXG4gICAgICBoYXNoLFxuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBicmFuY2hEZWxldGlvbkZhaWx1cmUoYnJhbmNoOiBzdHJpbmcpOiBCcmFuY2hTaW5nbGVEZWxldGVGYWlsdXJlIHtcbiAgIHJldHVybiB7XG4gICAgICBicmFuY2gsXG4gICAgICBoYXNoOiBudWxsLFxuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTaW5nbGVCcmFuY2hEZWxldGVGYWlsdXJlKFxuICAgdGVzdDogQnJhbmNoU2luZ2xlRGVsZXRlUmVzdWx0XG4pOiB0ZXN0IGlzIEJyYW5jaFNpbmdsZURlbGV0ZVN1Y2Nlc3Mge1xuICAgcmV0dXJuIHRlc3Quc3VjY2Vzcztcbn1cbiIsICJpbXBvcnQgdHlwZSB7IEJyYW5jaE11bHRpRGVsZXRlUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQge1xuICAgQnJhbmNoRGVsZXRpb25CYXRjaCxcbiAgIGJyYW5jaERlbGV0aW9uRmFpbHVyZSxcbiAgIGJyYW5jaERlbGV0aW9uU3VjY2Vzcyxcbn0gZnJvbSAnLi4vcmVzcG9uc2VzL0JyYW5jaERlbGV0ZVN1bW1hcnknO1xuaW1wb3J0IHR5cGUgeyBUYXNrUGFyc2VyIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgRXhpdENvZGVzLCBMaW5lUGFyc2VyLCBwYXJzZVN0cmluZ1Jlc3BvbnNlIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5jb25zdCBkZWxldGVTdWNjZXNzUmVnZXggPSAvKFxcUyspXFxzK1xcKFxcUytcXHMoW14pXSspXFwpLztcbmNvbnN0IGRlbGV0ZUVycm9yUmVnZXggPSAvXmVycm9yW14nXSsnKFteJ10rKScvbTtcblxuY29uc3QgcGFyc2VyczogTGluZVBhcnNlcjxCcmFuY2hNdWx0aURlbGV0ZVJlc3VsdD5bXSA9IFtcbiAgIG5ldyBMaW5lUGFyc2VyKGRlbGV0ZVN1Y2Nlc3NSZWdleCwgKHJlc3VsdCwgW2JyYW5jaCwgaGFzaF0pID0+IHtcbiAgICAgIGNvbnN0IGRlbGV0aW9uID0gYnJhbmNoRGVsZXRpb25TdWNjZXNzKGJyYW5jaCwgaGFzaCk7XG5cbiAgICAgIHJlc3VsdC5hbGwucHVzaChkZWxldGlvbik7XG4gICAgICByZXN1bHQuYnJhbmNoZXNbYnJhbmNoXSA9IGRlbGV0aW9uO1xuICAgfSksXG4gICBuZXcgTGluZVBhcnNlcihkZWxldGVFcnJvclJlZ2V4LCAocmVzdWx0LCBbYnJhbmNoXSkgPT4ge1xuICAgICAgY29uc3QgZGVsZXRpb24gPSBicmFuY2hEZWxldGlvbkZhaWx1cmUoYnJhbmNoKTtcblxuICAgICAgcmVzdWx0LmVycm9ycy5wdXNoKGRlbGV0aW9uKTtcbiAgICAgIHJlc3VsdC5hbGwucHVzaChkZWxldGlvbik7XG4gICAgICByZXN1bHQuYnJhbmNoZXNbYnJhbmNoXSA9IGRlbGV0aW9uO1xuICAgfSksXG5dO1xuXG5leHBvcnQgY29uc3QgcGFyc2VCcmFuY2hEZWxldGlvbnM6IFRhc2tQYXJzZXI8c3RyaW5nLCBCcmFuY2hNdWx0aURlbGV0ZVJlc3VsdD4gPSAoXG4gICBzdGRPdXQsXG4gICBzdGRFcnJcbikgPT4ge1xuICAgcmV0dXJuIHBhcnNlU3RyaW5nUmVzcG9uc2UobmV3IEJyYW5jaERlbGV0aW9uQmF0Y2goKSwgcGFyc2VycywgW3N0ZE91dCwgc3RkRXJyXSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaGFzQnJhbmNoRGVsZXRpb25FcnJvcihkYXRhOiBzdHJpbmcsIHByb2Nlc3NFeGl0Q29kZTogRXhpdENvZGVzKTogYm9vbGVhbiB7XG4gICByZXR1cm4gcHJvY2Vzc0V4aXRDb2RlID09PSBFeGl0Q29kZXMuRVJST1IgJiYgZGVsZXRlRXJyb3JSZWdleC50ZXN0KGRhdGEpO1xufVxuIiwgImltcG9ydCB0eXBlIHtcbiAgIEJyYW5jaE11bHRpRGVsZXRlUmVzdWx0LFxuICAgQnJhbmNoU2luZ2xlRGVsZXRlUmVzdWx0LFxuICAgQnJhbmNoU3VtbWFyeSxcbn0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBHaXRSZXNwb25zZUVycm9yIH0gZnJvbSAnLi4vZXJyb3JzL2dpdC1yZXNwb25zZS1lcnJvcic7XG5pbXBvcnQgeyBwYXJzZUJyYW5jaFN1bW1hcnkgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlLWJyYW5jaCc7XG5pbXBvcnQgeyBoYXNCcmFuY2hEZWxldGlvbkVycm9yLCBwYXJzZUJyYW5jaERlbGV0aW9ucyB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2UtYnJhbmNoLWRlbGV0ZSc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBidWZmZXJUb1N0cmluZyB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5zRGVsZXRlQnJhbmNoQ29tbWFuZChjb21tYW5kczogc3RyaW5nW10pIHtcbiAgIGNvbnN0IGRlbGV0ZUNvbW1hbmRzID0gWyctZCcsICctRCcsICctLWRlbGV0ZSddO1xuICAgcmV0dXJuIGNvbW1hbmRzLnNvbWUoKGNvbW1hbmQpID0+IGRlbGV0ZUNvbW1hbmRzLmluY2x1ZGVzKGNvbW1hbmQpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJyYW5jaFRhc2soXG4gICBjdXN0b21BcmdzOiBzdHJpbmdbXVxuKTogU3RyaW5nVGFzazxCcmFuY2hTdW1tYXJ5IHwgQnJhbmNoU2luZ2xlRGVsZXRlUmVzdWx0PiB7XG4gICBjb25zdCBpc0RlbGV0ZSA9IGNvbnRhaW5zRGVsZXRlQnJhbmNoQ29tbWFuZChjdXN0b21BcmdzKTtcbiAgIGNvbnN0IGlzQ3VycmVudE9ubHkgPSBjdXN0b21BcmdzLmluY2x1ZGVzKCctLXNob3ctY3VycmVudCcpO1xuXG4gICBjb25zdCBjb21tYW5kcyA9IFsnYnJhbmNoJywgLi4uY3VzdG9tQXJnc107XG5cbiAgIGlmIChjb21tYW5kcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGNvbW1hbmRzLnB1c2goJy1hJyk7XG4gICB9XG5cbiAgIGlmICghY29tbWFuZHMuaW5jbHVkZXMoJy12JykpIHtcbiAgICAgIGNvbW1hbmRzLnNwbGljZSgxLCAwLCAnLXYnKTtcbiAgIH1cblxuICAgcmV0dXJuIHtcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIGNvbW1hbmRzLFxuICAgICAgcGFyc2VyKHN0ZE91dCwgc3RkRXJyKSB7XG4gICAgICAgICBpZiAoaXNEZWxldGUpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUJyYW5jaERlbGV0aW9ucyhzdGRPdXQsIHN0ZEVycikuYWxsWzBdO1xuICAgICAgICAgfVxuXG4gICAgICAgICByZXR1cm4gcGFyc2VCcmFuY2hTdW1tYXJ5KHN0ZE91dCwgaXNDdXJyZW50T25seSk7XG4gICAgICB9LFxuICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJyYW5jaExvY2FsVGFzaygpOiBTdHJpbmdUYXNrPEJyYW5jaFN1bW1hcnk+IHtcbiAgIHJldHVybiB7XG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBjb21tYW5kczogWydicmFuY2gnLCAnLXYnXSxcbiAgICAgIHBhcnNlcihzdGRPdXQpIHtcbiAgICAgICAgIHJldHVybiBwYXJzZUJyYW5jaFN1bW1hcnkoc3RkT3V0KTtcbiAgICAgIH0sXG4gICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlQnJhbmNoZXNUYXNrKFxuICAgYnJhbmNoZXM6IHN0cmluZ1tdLFxuICAgZm9yY2VEZWxldGUgPSBmYWxzZVxuKTogU3RyaW5nVGFzazxCcmFuY2hNdWx0aURlbGV0ZVJlc3VsdD4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIGNvbW1hbmRzOiBbJ2JyYW5jaCcsICctdicsIGZvcmNlRGVsZXRlID8gJy1EJyA6ICctZCcsIC4uLmJyYW5jaGVzXSxcbiAgICAgIHBhcnNlcihzdGRPdXQsIHN0ZEVycikge1xuICAgICAgICAgcmV0dXJuIHBhcnNlQnJhbmNoRGVsZXRpb25zKHN0ZE91dCwgc3RkRXJyKTtcbiAgICAgIH0sXG4gICAgICBvbkVycm9yKHsgZXhpdENvZGUsIHN0ZE91dCB9LCBlcnJvciwgZG9uZSwgZmFpbCkge1xuICAgICAgICAgaWYgKCFoYXNCcmFuY2hEZWxldGlvbkVycm9yKFN0cmluZyhlcnJvciksIGV4aXRDb2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhaWwoZXJyb3IpO1xuICAgICAgICAgfVxuXG4gICAgICAgICBkb25lKHN0ZE91dCk7XG4gICAgICB9LFxuICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUJyYW5jaFRhc2soXG4gICBicmFuY2g6IHN0cmluZyxcbiAgIGZvcmNlRGVsZXRlID0gZmFsc2Vcbik6IFN0cmluZ1Rhc2s8QnJhbmNoU2luZ2xlRGVsZXRlUmVzdWx0PiB7XG4gICBjb25zdCB0YXNrOiBTdHJpbmdUYXNrPEJyYW5jaFNpbmdsZURlbGV0ZVJlc3VsdD4gPSB7XG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBjb21tYW5kczogWydicmFuY2gnLCAnLXYnLCBmb3JjZURlbGV0ZSA/ICctRCcgOiAnLWQnLCBicmFuY2hdLFxuICAgICAgcGFyc2VyKHN0ZE91dCwgc3RkRXJyKSB7XG4gICAgICAgICByZXR1cm4gcGFyc2VCcmFuY2hEZWxldGlvbnMoc3RkT3V0LCBzdGRFcnIpLmJyYW5jaGVzW2JyYW5jaF0hO1xuICAgICAgfSxcbiAgICAgIG9uRXJyb3IoeyBleGl0Q29kZSwgc3RkRXJyLCBzdGRPdXQgfSwgZXJyb3IsIF8sIGZhaWwpIHtcbiAgICAgICAgIGlmICghaGFzQnJhbmNoRGVsZXRpb25FcnJvcihTdHJpbmcoZXJyb3IpLCBleGl0Q29kZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWlsKGVycm9yKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgdGhyb3cgbmV3IEdpdFJlc3BvbnNlRXJyb3IoXG4gICAgICAgICAgICB0YXNrLnBhcnNlcihidWZmZXJUb1N0cmluZyhzdGRPdXQpLCBidWZmZXJUb1N0cmluZyhzdGRFcnIpKSxcbiAgICAgICAgICAgIFN0cmluZyhlcnJvcilcbiAgICAgICAgICk7XG4gICAgICB9LFxuICAgfTtcblxuICAgcmV0dXJuIHRhc2s7XG59XG4iLCAiaW1wb3J0IHsgbm9ybWFsaXplIH0gZnJvbSAnbm9kZTpwYXRoJztcblxuaW1wb3J0IHR5cGUgeyBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tJZ25vcmVUYXNrKHBhdGhzOiBzdHJpbmdbXSk6IFN0cmluZ1Rhc2s8c3RyaW5nW10+IHtcbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kczogWydjaGVjay1pZ25vcmUnLCAuLi5wYXRoc10sXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXI6IHBhcnNlQ2hlY2tJZ25vcmUsXG4gICB9O1xufVxuXG4vKipcbiAqIFBhcnNlciBmb3IgdGhlIGBjaGVjay1pZ25vcmVgIGNvbW1hbmQgLSByZXR1cm5zIGVhY2ggZmlsZSBhcyBhIHN0cmluZyBhcnJheVxuICovXG5mdW5jdGlvbiBwYXJzZUNoZWNrSWdub3JlKHRleHQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgIHJldHVybiB0ZXh0LnNwbGl0KC9cXG4vZykubWFwKHRvUGF0aCkuZmlsdGVyKEJvb2xlYW4pO1xufVxuXG5mdW5jdGlvbiB0b1BhdGgoaW5wdXQ6IHN0cmluZykge1xuICAgY29uc3QgcGF0aCA9IGlucHV0LnRyaW0oKS5yZXBsYWNlKC9eW1wiJ118W1wiJ10kL2csICcnKTtcbiAgIHJldHVybiBwYXRoICYmIG5vcm1hbGl6ZShwYXRoKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IEZldGNoUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBMaW5lUGFyc2VyLCBwYXJzZVN0cmluZ1Jlc3BvbnNlIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5jb25zdCBwYXJzZXJzOiBMaW5lUGFyc2VyPEZldGNoUmVzdWx0PltdID0gW1xuICAgbmV3IExpbmVQYXJzZXIoL0Zyb20gKC4rKSQvLCAocmVzdWx0LCBbcmVtb3RlXSkgPT4ge1xuICAgICAgcmVzdWx0LnJlbW90ZSA9IHJlbW90ZTtcbiAgIH0pLFxuICAgbmV3IExpbmVQYXJzZXIoL1xcKiBcXFtuZXcgYnJhbmNoXVxccysoXFxTKylcXHMqLT4gKC4rKSQvLCAocmVzdWx0LCBbbmFtZSwgdHJhY2tpbmddKSA9PiB7XG4gICAgICByZXN1bHQuYnJhbmNoZXMucHVzaCh7XG4gICAgICAgICBuYW1lLFxuICAgICAgICAgdHJhY2tpbmcsXG4gICAgICB9KTtcbiAgIH0pLFxuICAgbmV3IExpbmVQYXJzZXIoL1xcKiBcXFtuZXcgdGFnXVxccysoXFxTKylcXHMqLT4gKC4rKSQvLCAocmVzdWx0LCBbbmFtZSwgdHJhY2tpbmddKSA9PiB7XG4gICAgICByZXN1bHQudGFncy5wdXNoKHtcbiAgICAgICAgIG5hbWUsXG4gICAgICAgICB0cmFja2luZyxcbiAgICAgIH0pO1xuICAgfSksXG4gICBuZXcgTGluZVBhcnNlcigvLSBcXFtkZWxldGVkXVxccytcXFMrXFxzKi0+ICguKykkLywgKHJlc3VsdCwgW3RyYWNraW5nXSkgPT4ge1xuICAgICAgcmVzdWx0LmRlbGV0ZWQucHVzaCh7XG4gICAgICAgICB0cmFja2luZyxcbiAgICAgIH0pO1xuICAgfSksXG4gICBuZXcgTGluZVBhcnNlcihcbiAgICAgIC9cXHMqKFteLl0rKVxcLlxcLihcXFMrKVxccysoXFxTKylcXHMqLT4gKC4rKSQvLFxuICAgICAgKHJlc3VsdCwgW2Zyb20sIHRvLCBuYW1lLCB0cmFja2luZ10pID0+IHtcbiAgICAgICAgIHJlc3VsdC51cGRhdGVkLnB1c2goe1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIHRyYWNraW5nLFxuICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICBmcm9tLFxuICAgICAgICAgfSk7XG4gICAgICB9XG4gICApLFxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmV0Y2hSZXN1bHQoc3RkT3V0OiBzdHJpbmcsIHN0ZEVycjogc3RyaW5nKTogRmV0Y2hSZXN1bHQge1xuICAgY29uc3QgcmVzdWx0OiBGZXRjaFJlc3VsdCA9IHtcbiAgICAgIHJhdzogc3RkT3V0LFxuICAgICAgcmVtb3RlOiBudWxsLFxuICAgICAgYnJhbmNoZXM6IFtdLFxuICAgICAgdGFnczogW10sXG4gICAgICB1cGRhdGVkOiBbXSxcbiAgICAgIGRlbGV0ZWQ6IFtdLFxuICAgfTtcbiAgIHJldHVybiBwYXJzZVN0cmluZ1Jlc3BvbnNlKHJlc3VsdCwgcGFyc2VycywgW3N0ZE91dCwgc3RkRXJyXSk7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBGZXRjaFJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgcGFyc2VGZXRjaFJlc3VsdCB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2UtZmV0Y2gnO1xuaW1wb3J0IHR5cGUgeyBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgY29uZmlndXJhdGlvbkVycm9yVGFzaywgdHlwZSBFbXB0eVRhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5mdW5jdGlvbiBkaXNhbGxvd2VkQ29tbWFuZChjb21tYW5kOiBzdHJpbmcpIHtcbiAgIHJldHVybiAvXi0tdXBsb2FkLXBhY2soPXwkKS8udGVzdChjb21tYW5kKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoVGFzayhcbiAgIHJlbW90ZTogc3RyaW5nLFxuICAgYnJhbmNoOiBzdHJpbmcsXG4gICBjdXN0b21BcmdzOiBzdHJpbmdbXVxuKTogU3RyaW5nVGFzazxGZXRjaFJlc3VsdD4gfCBFbXB0eVRhc2sge1xuICAgY29uc3QgY29tbWFuZHMgPSBbJ2ZldGNoJywgLi4uY3VzdG9tQXJnc107XG4gICBpZiAocmVtb3RlICYmIGJyYW5jaCkge1xuICAgICAgY29tbWFuZHMucHVzaChyZW1vdGUsIGJyYW5jaCk7XG4gICB9XG5cbiAgIGNvbnN0IGJhbm5lZCA9IGNvbW1hbmRzLmZpbmQoZGlzYWxsb3dlZENvbW1hbmQpO1xuICAgaWYgKGJhbm5lZCkge1xuICAgICAgcmV0dXJuIGNvbmZpZ3VyYXRpb25FcnJvclRhc2soYGdpdC5mZXRjaDogcG90ZW50aWFsIGV4cGxvaXQgYXJndW1lbnQgYmxvY2tlZC5gKTtcbiAgIH1cblxuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgcGFyc2VyOiBwYXJzZUZldGNoUmVzdWx0LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IE1vdmVSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IExpbmVQYXJzZXIsIHBhcnNlU3RyaW5nUmVzcG9uc2UgfSBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IHBhcnNlcnM6IExpbmVQYXJzZXI8TW92ZVJlc3VsdD5bXSA9IFtcbiAgIG5ldyBMaW5lUGFyc2VyKC9eUmVuYW1pbmcgKC4rKSB0byAoLispJC8sIChyZXN1bHQsIFtmcm9tLCB0b10pID0+IHtcbiAgICAgIHJlc3VsdC5tb3Zlcy5wdXNoKHsgZnJvbSwgdG8gfSk7XG4gICB9KSxcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU1vdmVSZXN1bHQoc3RkT3V0OiBzdHJpbmcpOiBNb3ZlUmVzdWx0IHtcbiAgIHJldHVybiBwYXJzZVN0cmluZ1Jlc3BvbnNlKHsgbW92ZXM6IFtdIH0sIHBhcnNlcnMsIHN0ZE91dCk7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBNb3ZlUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBwYXJzZU1vdmVSZXN1bHQgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlLW1vdmUnO1xuaW1wb3J0IHR5cGUgeyBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgYXNBcnJheSB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVUYXNrKGZyb206IHN0cmluZyB8IHN0cmluZ1tdLCB0bzogc3RyaW5nKTogU3RyaW5nVGFzazxNb3ZlUmVzdWx0PiB7XG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHM6IFsnbXYnLCAnLXYnLCAuLi5hc0FycmF5KGZyb20pLCB0b10sXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXI6IHBhcnNlTW92ZVJlc3VsdCxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBQdWxsUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBHaXRSZXNwb25zZUVycm9yIH0gZnJvbSAnLi4vZXJyb3JzL2dpdC1yZXNwb25zZS1lcnJvcic7XG5pbXBvcnQgeyBwYXJzZVB1bGxFcnJvclJlc3VsdCwgcGFyc2VQdWxsUmVzdWx0IH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZS1wdWxsJztcbmltcG9ydCB0eXBlIHsgTWF5YmUsIFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBidWZmZXJUb1N0cmluZyB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHB1bGxUYXNrKFxuICAgcmVtb3RlOiBNYXliZTxzdHJpbmc+LFxuICAgYnJhbmNoOiBNYXliZTxzdHJpbmc+LFxuICAgY3VzdG9tQXJnczogc3RyaW5nW11cbik6IFN0cmluZ1Rhc2s8UHVsbFJlc3VsdD4ge1xuICAgY29uc3QgY29tbWFuZHM6IHN0cmluZ1tdID0gWydwdWxsJywgLi4uY3VzdG9tQXJnc107XG4gICBpZiAocmVtb3RlICYmIGJyYW5jaCkge1xuICAgICAgY29tbWFuZHMuc3BsaWNlKDEsIDAsIHJlbW90ZSwgYnJhbmNoKTtcbiAgIH1cblxuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgcGFyc2VyKHN0ZE91dCwgc3RkRXJyKTogUHVsbFJlc3VsdCB7XG4gICAgICAgICByZXR1cm4gcGFyc2VQdWxsUmVzdWx0KHN0ZE91dCwgc3RkRXJyKTtcbiAgICAgIH0sXG4gICAgICBvbkVycm9yKHJlc3VsdCwgX2Vycm9yLCBfZG9uZSwgZmFpbCkge1xuICAgICAgICAgY29uc3QgcHVsbEVycm9yID0gcGFyc2VQdWxsRXJyb3JSZXN1bHQoXG4gICAgICAgICAgICBidWZmZXJUb1N0cmluZyhyZXN1bHQuc3RkT3V0KSxcbiAgICAgICAgICAgIGJ1ZmZlclRvU3RyaW5nKHJlc3VsdC5zdGRFcnIpXG4gICAgICAgICApO1xuICAgICAgICAgaWYgKHB1bGxFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGZhaWwobmV3IEdpdFJlc3BvbnNlRXJyb3IocHVsbEVycm9yKSk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIGZhaWwoX2Vycm9yKTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB7IGZvckVhY2hMaW5lV2l0aENvbnRlbnQgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVtb3RlV2l0aG91dFJlZnMge1xuICAgbmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlbW90ZVdpdGhSZWZzIGV4dGVuZHMgUmVtb3RlV2l0aG91dFJlZnMge1xuICAgcmVmczoge1xuICAgICAgZmV0Y2g6IHN0cmluZztcbiAgICAgIHB1c2g6IHN0cmluZztcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUdldFJlbW90ZXModGV4dDogc3RyaW5nKTogUmVtb3RlV2l0aG91dFJlZnNbXSB7XG4gICBjb25zdCByZW1vdGVzOiB7IFtuYW1lOiBzdHJpbmddOiBSZW1vdGVXaXRob3V0UmVmcyB9ID0ge307XG5cbiAgIGZvckVhY2godGV4dCwgKFtuYW1lXSkgPT4gKHJlbW90ZXNbbmFtZV0gPSB7IG5hbWUgfSkpO1xuXG4gICByZXR1cm4gT2JqZWN0LnZhbHVlcyhyZW1vdGVzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlR2V0UmVtb3Rlc1ZlcmJvc2UodGV4dDogc3RyaW5nKTogUmVtb3RlV2l0aFJlZnNbXSB7XG4gICBjb25zdCByZW1vdGVzOiB7IFtuYW1lOiBzdHJpbmddOiBSZW1vdGVXaXRoUmVmcyB9ID0ge307XG5cbiAgIGZvckVhY2godGV4dCwgKFtuYW1lLCB1cmwsIHB1cnBvc2VdKSA9PiB7XG4gICAgICBpZiAoIU9iamVjdC5oYXNPd24ocmVtb3RlcywgbmFtZSkpIHtcbiAgICAgICAgIHJlbW90ZXNbbmFtZV0gPSB7XG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgcmVmczogeyBmZXRjaDogJycsIHB1c2g6ICcnIH0sXG4gICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBpZiAocHVycG9zZSAmJiB1cmwpIHtcbiAgICAgICAgIHJlbW90ZXNbbmFtZV0ucmVmc1twdXJwb3NlLnJlcGxhY2UoL1teYS16XS9nLCAnJykgYXMga2V5b2YgUmVtb3RlV2l0aFJlZnNbJ3JlZnMnXV0gPSB1cmw7XG4gICAgICB9XG4gICB9KTtcblxuICAgcmV0dXJuIE9iamVjdC52YWx1ZXMocmVtb3Rlcyk7XG59XG5cbmZ1bmN0aW9uIGZvckVhY2godGV4dDogc3RyaW5nLCBoYW5kbGVyOiAobGluZTogc3RyaW5nW10pID0+IHZvaWQpIHtcbiAgIGZvckVhY2hMaW5lV2l0aENvbnRlbnQodGV4dCwgKGxpbmUpID0+IGhhbmRsZXIobGluZS5zcGxpdCgvXFxzKy8pKSk7XG59XG4iLCAiaW1wb3J0IHtcbiAgIHBhcnNlR2V0UmVtb3RlcyxcbiAgIHBhcnNlR2V0UmVtb3Rlc1ZlcmJvc2UsXG4gICB0eXBlIFJlbW90ZVdpdGhvdXRSZWZzLFxuICAgdHlwZSBSZW1vdGVXaXRoUmVmcyxcbn0gZnJvbSAnLi4vcmVzcG9uc2VzL0dldFJlbW90ZVN1bW1hcnknO1xuaW1wb3J0IHR5cGUgeyBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRSZW1vdGVUYXNrKFxuICAgcmVtb3RlTmFtZTogc3RyaW5nLFxuICAgcmVtb3RlUmVwbzogc3RyaW5nLFxuICAgY3VzdG9tQXJnczogc3RyaW5nW11cbik6IFN0cmluZ1Rhc2s8c3RyaW5nPiB7XG4gICByZXR1cm4gc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhbJ3JlbW90ZScsICdhZGQnLCAuLi5jdXN0b21BcmdzLCByZW1vdGVOYW1lLCByZW1vdGVSZXBvXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZW1vdGVzVGFzayh2ZXJib3NlOiB0cnVlKTogU3RyaW5nVGFzazxSZW1vdGVXaXRoUmVmc1tdPjtcbmV4cG9ydCBmdW5jdGlvbiBnZXRSZW1vdGVzVGFzayh2ZXJib3NlOiBmYWxzZSk6IFN0cmluZ1Rhc2s8UmVtb3RlV2l0aG91dFJlZnNbXT47XG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVtb3Rlc1Rhc2soXG4gICB2ZXJib3NlOiBib29sZWFuXG4pOiBTdHJpbmdUYXNrPFJlbW90ZVdpdGhSZWZzW10gfCBSZW1vdGVXaXRob3V0UmVmc1tdPiB7XG4gICBjb25zdCBjb21tYW5kcyA9IFsncmVtb3RlJ107XG4gICBpZiAodmVyYm9zZSkge1xuICAgICAgY29tbWFuZHMucHVzaCgnLXYnKTtcbiAgIH1cblxuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgcGFyc2VyOiB2ZXJib3NlID8gcGFyc2VHZXRSZW1vdGVzVmVyYm9zZSA6IHBhcnNlR2V0UmVtb3RlcyxcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0UmVtb3Rlc1Rhc2soY3VzdG9tQXJnczogc3RyaW5nW10pOiBTdHJpbmdUYXNrPHN0cmluZz4ge1xuICAgY29uc3QgY29tbWFuZHMgPSBbLi4uY3VzdG9tQXJnc107XG4gICBpZiAoY29tbWFuZHNbMF0gIT09ICdscy1yZW1vdGUnKSB7XG4gICAgICBjb21tYW5kcy51bnNoaWZ0KCdscy1yZW1vdGUnKTtcbiAgIH1cblxuICAgcmV0dXJuIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soY29tbWFuZHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3RlVGFzayhjdXN0b21BcmdzOiBzdHJpbmdbXSk6IFN0cmluZ1Rhc2s8c3RyaW5nPiB7XG4gICBjb25zdCBjb21tYW5kcyA9IFsuLi5jdXN0b21BcmdzXTtcbiAgIGlmIChjb21tYW5kc1swXSAhPT0gJ3JlbW90ZScpIHtcbiAgICAgIGNvbW1hbmRzLnVuc2hpZnQoJ3JlbW90ZScpO1xuICAgfVxuXG4gICByZXR1cm4gc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhjb21tYW5kcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVSZW1vdGVUYXNrKHJlbW90ZU5hbWU6IHN0cmluZykge1xuICAgcmV0dXJuIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soWydyZW1vdGUnLCAncmVtb3ZlJywgcmVtb3RlTmFtZV0pO1xufVxuIiwgImltcG9ydCB0eXBlIHsgTG9nT3B0aW9ucywgTG9nUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBsb2dGb3JtYXRGcm9tQ29tbWFuZCB9IGZyb20gJy4uL2FyZ3MvbG9nLWZvcm1hdCc7XG5pbXBvcnQgeyBjcmVhdGVMaXN0TG9nU3VtbWFyeVBhcnNlciB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2UtbGlzdC1sb2ctc3VtbWFyeSc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyB2YWxpZGF0ZUxvZ0Zvcm1hdENvbmZpZyB9IGZyb20gJy4vZGlmZic7XG5pbXBvcnQgeyBwYXJzZUxvZ09wdGlvbnMgfSBmcm9tICcuL2xvZyc7XG5pbXBvcnQgdHlwZSB7IEVtcHR5VGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFzaExpc3RUYXNrKFxuICAgb3B0OiBMb2dPcHRpb25zID0ge30sXG4gICBjdXN0b21BcmdzOiBzdHJpbmdbXVxuKTogRW1wdHlUYXNrIHwgU3RyaW5nVGFzazxMb2dSZXN1bHQ+IHtcbiAgIGNvbnN0IG9wdGlvbnMgPSBwYXJzZUxvZ09wdGlvbnM8YW55PihvcHQpO1xuICAgY29uc3QgY29tbWFuZHMgPSBbJ3N0YXNoJywgJ2xpc3QnLCAuLi5vcHRpb25zLmNvbW1hbmRzLCAuLi5jdXN0b21BcmdzXTtcbiAgIGNvbnN0IHBhcnNlciA9IGNyZWF0ZUxpc3RMb2dTdW1tYXJ5UGFyc2VyKFxuICAgICAgb3B0aW9ucy5zcGxpdHRlcixcbiAgICAgIG9wdGlvbnMuZmllbGRzLFxuICAgICAgbG9nRm9ybWF0RnJvbUNvbW1hbmQoY29tbWFuZHMpXG4gICApO1xuXG4gICByZXR1cm4gKFxuICAgICAgdmFsaWRhdGVMb2dGb3JtYXRDb25maWcoY29tbWFuZHMpIHx8IHtcbiAgICAgICAgIGNvbW1hbmRzLFxuICAgICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgICAgcGFyc2VyLFxuICAgICAgfVxuICAgKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFN1Yk1vZHVsZVRhc2socmVwbzogc3RyaW5nLCBwYXRoOiBzdHJpbmcpOiBTdHJpbmdUYXNrPHN0cmluZz4ge1xuICAgcmV0dXJuIHN1Yk1vZHVsZVRhc2soWydhZGQnLCByZXBvLCBwYXRoXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0U3ViTW9kdWxlVGFzayhjdXN0b21BcmdzOiBzdHJpbmdbXSk6IFN0cmluZ1Rhc2s8c3RyaW5nPiB7XG4gICByZXR1cm4gc3ViTW9kdWxlVGFzayhbJ2luaXQnLCAuLi5jdXN0b21BcmdzXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJNb2R1bGVUYXNrKGN1c3RvbUFyZ3M6IHN0cmluZ1tdKTogU3RyaW5nVGFzazxzdHJpbmc+IHtcbiAgIGNvbnN0IGNvbW1hbmRzID0gWy4uLmN1c3RvbUFyZ3NdO1xuICAgaWYgKGNvbW1hbmRzWzBdICE9PSAnc3VibW9kdWxlJykge1xuICAgICAgY29tbWFuZHMudW5zaGlmdCgnc3VibW9kdWxlJyk7XG4gICB9XG5cbiAgIHJldHVybiBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKGNvbW1hbmRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVN1Yk1vZHVsZVRhc2soY3VzdG9tQXJnczogc3RyaW5nW10pOiBTdHJpbmdUYXNrPHN0cmluZz4ge1xuICAgcmV0dXJuIHN1Yk1vZHVsZVRhc2soWyd1cGRhdGUnLCAuLi5jdXN0b21BcmdzXSk7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBUYWdSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcblxuZXhwb3J0IGNsYXNzIFRhZ0xpc3QgaW1wbGVtZW50cyBUYWdSZXN1bHQge1xuICAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgYWxsOiBzdHJpbmdbXSxcbiAgICAgIHB1YmxpYyByZWFkb25seSBsYXRlc3Q6IHN0cmluZyB8IHVuZGVmaW5lZFxuICAgKSB7fVxufVxuXG5leHBvcnQgY29uc3QgcGFyc2VUYWdMaXN0ID0gZnVuY3Rpb24gKGRhdGE6IHN0cmluZywgY3VzdG9tU29ydCA9IGZhbHNlKSB7XG4gICBjb25zdCB0YWdzID0gZGF0YS5zcGxpdCgnXFxuJykubWFwKHRyaW1tZWQpLmZpbHRlcihCb29sZWFuKTtcblxuICAgaWYgKCFjdXN0b21Tb3J0KSB7XG4gICAgICB0YWdzLnNvcnQoZnVuY3Rpb24gKHRhZ0EsIHRhZ0IpIHtcbiAgICAgICAgIGNvbnN0IHBhcnRzQSA9IHRhZ0Euc3BsaXQoJy4nKTtcbiAgICAgICAgIGNvbnN0IHBhcnRzQiA9IHRhZ0Iuc3BsaXQoJy4nKTtcblxuICAgICAgICAgaWYgKHBhcnRzQS5sZW5ndGggPT09IDEgfHwgcGFydHNCLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHNpbmdsZVNvcnRlZCh0b051bWJlcihwYXJ0c0FbMF0pLCB0b051bWJlcihwYXJ0c0JbMF0pKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBNYXRoLm1heChwYXJ0c0EubGVuZ3RoLCBwYXJ0c0IubGVuZ3RoKTsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZGlmZiA9IHNvcnRlZCh0b051bWJlcihwYXJ0c0FbaV0pLCB0b051bWJlcihwYXJ0c0JbaV0pKTtcblxuICAgICAgICAgICAgaWYgKGRpZmYpIHtcbiAgICAgICAgICAgICAgIHJldHVybiBkaWZmO1xuICAgICAgICAgICAgfVxuICAgICAgICAgfVxuXG4gICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0pO1xuICAgfVxuXG4gICBjb25zdCBsYXRlc3QgPSBjdXN0b21Tb3J0ID8gdGFnc1swXSA6IFsuLi50YWdzXS5yZXZlcnNlKCkuZmluZCgodGFnKSA9PiB0YWcuaW5kZXhPZignLicpID49IDApO1xuXG4gICByZXR1cm4gbmV3IFRhZ0xpc3QodGFncywgbGF0ZXN0KTtcbn07XG5cbmZ1bmN0aW9uIHNpbmdsZVNvcnRlZChhOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XG4gICBjb25zdCBhSXNOdW0gPSBOdW1iZXIuaXNOYU4oYSk7XG4gICBjb25zdCBiSXNOdW0gPSBOdW1iZXIuaXNOYU4oYik7XG5cbiAgIGlmIChhSXNOdW0gIT09IGJJc051bSkge1xuICAgICAgcmV0dXJuIGFJc051bSA/IDEgOiAtMTtcbiAgIH1cblxuICAgcmV0dXJuIGFJc051bSA/IHNvcnRlZChhLCBiKSA6IDA7XG59XG5cbmZ1bmN0aW9uIHNvcnRlZChhOiBudW1iZXIsIGI6IG51bWJlcikge1xuICAgcmV0dXJuIGEgPT09IGIgPyAwIDogYSA+IGIgPyAxIDogLTE7XG59XG5cbmZ1bmN0aW9uIHRyaW1tZWQoaW5wdXQ6IHN0cmluZykge1xuICAgcmV0dXJuIGlucHV0LnRyaW0oKTtcbn1cblxuZnVuY3Rpb24gdG9OdW1iZXIoaW5wdXQ6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBwYXJzZUludChpbnB1dC5yZXBsYWNlKC9eXFxEKy9nLCAnJyksIDEwKSB8fCAwO1xuICAgfVxuXG4gICByZXR1cm4gMDtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFRhZ1Jlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgcGFyc2VUYWdMaXN0IH0gZnJvbSAnLi4vcmVzcG9uc2VzL1RhZ0xpc3QnO1xuaW1wb3J0IHR5cGUgeyBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIFRhc2sgdXNlZCBieSBgZ2l0LnRhZ3NgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0YWdMaXN0VGFzayhjdXN0b21BcmdzOiBzdHJpbmdbXSA9IFtdKTogU3RyaW5nVGFzazxUYWdSZXN1bHQ+IHtcbiAgIGNvbnN0IGhhc0N1c3RvbVNvcnQgPSBjdXN0b21BcmdzLnNvbWUoKG9wdGlvbikgPT4gL14tLXNvcnQ9Ly50ZXN0KG9wdGlvbikpO1xuXG4gICByZXR1cm4ge1xuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgY29tbWFuZHM6IFsndGFnJywgJy1sJywgLi4uY3VzdG9tQXJnc10sXG4gICAgICBwYXJzZXIodGV4dDogc3RyaW5nKSB7XG4gICAgICAgICByZXR1cm4gcGFyc2VUYWdMaXN0KHRleHQsIGhhc0N1c3RvbVNvcnQpO1xuICAgICAgfSxcbiAgIH07XG59XG5cbi8qKlxuICogVGFzayB1c2VkIGJ5IGBnaXQuYWRkVGFnYFxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkVGFnVGFzayhuYW1lOiBzdHJpbmcpOiBTdHJpbmdUYXNrPHsgbmFtZTogc3RyaW5nIH0+IHtcbiAgIHJldHVybiB7XG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBjb21tYW5kczogWyd0YWcnLCBuYW1lXSxcbiAgICAgIHBhcnNlcigpIHtcbiAgICAgICAgIHJldHVybiB7IG5hbWUgfTtcbiAgICAgIH0sXG4gICB9O1xufVxuXG4vKipcbiAqIFRhc2sgdXNlZCBieSBgZ2l0LmFkZFRhZ2BcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEFubm90YXRlZFRhZ1Rhc2soXG4gICBuYW1lOiBzdHJpbmcsXG4gICB0YWdNZXNzYWdlOiBzdHJpbmdcbik6IFN0cmluZ1Rhc2s8eyBuYW1lOiBzdHJpbmcgfT4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIGNvbW1hbmRzOiBbJ3RhZycsICctYScsICctbScsIHRhZ01lc3NhZ2UsIG5hbWVdLFxuICAgICAgcGFyc2VyKCkge1xuICAgICAgICAgcmV0dXJuIHsgbmFtZSB9O1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHtHaXRFeGVjdXRvcn0gZnJvbSBcIi4vbGliL3J1bm5lcnMvZ2l0LWV4ZWN1dG9yXCI7XG5cbmltcG9ydCB7U2ltcGxlR2l0QXBpfSBmcm9tIFwiLi9saWIvc2ltcGxlLWdpdC1hcGlcIjtcblxuaW1wb3J0IHtTY2hlZHVsZXJ9IGZyb20gXCIuL2xpYi9ydW5uZXJzL3NjaGVkdWxlclwiO1xuXG5pbXBvcnQge1xuICAgY29uZmlndXJhdGlvbkVycm9yVGFzayxcbiAgIHN0cmFpZ2h0VGhyb3VnaEJ1ZmZlclRhc2ssXG4gICBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrXG59IGZyb20gXCIuL2xpYi90YXNrcy90YXNrXCI7XG5cbmltcG9ydCB7XG4gICBhc0FycmF5LFxuICAgZmlsdGVyQXJyYXksXG4gICBmaWx0ZXJQcmltaXRpdmVzLFxuICAgZmlsdGVyU3RyaW5nLFxuICAgZmlsdGVyU3RyaW5nT3JTdHJpbmdBcnJheSxcbiAgIGZpbHRlclR5cGUsXG4gICBnZXRUcmFpbGluZ09wdGlvbnMsXG4gICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQsXG4gICB0cmFpbGluZ09wdGlvbnNBcmd1bWVudFxufSBmcm9tIFwiLi9saWIvdXRpbHNcIjtcblxuaW1wb3J0IHthcHBseVBhdGNoVGFza30gZnJvbSBcIi4vbGliL3Rhc2tzL2FwcGx5LXBhdGNoXCI7XG5cbmltcG9ydCB7YnJhbmNoTG9jYWxUYXNrLCBicmFuY2hUYXNrLCBkZWxldGVCcmFuY2hlc1Rhc2ssIGRlbGV0ZUJyYW5jaFRhc2t9IGZyb20gXCIuL2xpYi90YXNrcy9icmFuY2hcIjtcblxuaW1wb3J0IHtjaGVja0lnbm9yZVRhc2t9IGZyb20gXCIuL2xpYi90YXNrcy9jaGVjay1pZ25vcmVcIjtcblxuaW1wb3J0IHtjaGVja0lzUmVwb1Rhc2t9IGZyb20gXCIuL2xpYi90YXNrcy9jaGVjay1pcy1yZXBvXCI7XG5cbmltcG9ydCB7Y2xlYW5XaXRoT3B0aW9uc1Rhc2ssIGlzQ2xlYW5PcHRpb25zQXJyYXl9IGZyb20gXCIuL2xpYi90YXNrcy9jbGVhblwiO1xuXG5pbXBvcnQge2RpZmZTdW1tYXJ5VGFza30gZnJvbSBcIi4vbGliL3Rhc2tzL2RpZmZcIjtcblxuaW1wb3J0IHtmZXRjaFRhc2t9IGZyb20gXCIuL2xpYi90YXNrcy9mZXRjaFwiO1xuXG5pbXBvcnQge21vdmVUYXNrfSBmcm9tIFwiLi9saWIvdGFza3MvbW92ZVwiO1xuXG5pbXBvcnQge3B1bGxUYXNrfSBmcm9tIFwiLi9saWIvdGFza3MvcHVsbFwiO1xuXG5pbXBvcnQge3B1c2hUYWdzVGFza30gZnJvbSBcIi4vbGliL3Rhc2tzL3B1c2hcIjtcblxuaW1wb3J0IHthZGRSZW1vdGVUYXNrLCBnZXRSZW1vdGVzVGFzaywgbGlzdFJlbW90ZXNUYXNrLCByZW1vdGVUYXNrLCByZW1vdmVSZW1vdGVUYXNrfSBmcm9tIFwiLi9saWIvdGFza3MvcmVtb3RlXCI7XG5cbmltcG9ydCB7Z2V0UmVzZXRNb2RlLCByZXNldFRhc2t9IGZyb20gXCIuL2xpYi90YXNrcy9yZXNldFwiO1xuXG5pbXBvcnQge3N0YXNoTGlzdFRhc2t9IGZyb20gXCIuL2xpYi90YXNrcy9zdGFzaC1saXN0XCI7XG5cbmltcG9ydCB7YWRkU3ViTW9kdWxlVGFzaywgaW5pdFN1Yk1vZHVsZVRhc2ssIHN1Yk1vZHVsZVRhc2ssIHVwZGF0ZVN1Yk1vZHVsZVRhc2t9IGZyb20gXCIuL2xpYi90YXNrcy9zdWItbW9kdWxlXCI7XG5cbmltcG9ydCB7YWRkQW5ub3RhdGVkVGFnVGFzaywgYWRkVGFnVGFzaywgdGFnTGlzdFRhc2t9IGZyb20gXCIuL2xpYi90YXNrcy90YWdcIjtcblxuZnVuY3Rpb24gR2l0KG9wdGlvbnMsIHBsdWdpbnMpIHtcbiAgIHRoaXMuX3BsdWdpbnMgPSBwbHVnaW5zO1xuICAgdGhpcy5fZXhlY3V0b3IgPSBuZXcgR2l0RXhlY3V0b3IoXG4gICAgICBvcHRpb25zLmJhc2VEaXIsXG4gICAgICBuZXcgU2NoZWR1bGVyKG9wdGlvbnMubWF4Q29uY3VycmVudFByb2Nlc3NlcyksXG4gICAgICBwbHVnaW5zXG4gICApO1xuXG4gICB0aGlzLl90cmltbWVkID0gb3B0aW9ucy50cmltbWVkO1xufVxuXG4oR2l0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU2ltcGxlR2l0QXBpLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yID0gR2l0O1xuXG4vKipcbiAqIFNldHMgdGhlIHBhdGggdG8gYSBjdXN0b20gZ2l0IGJpbmFyeSwgc2hvdWxkIGVpdGhlciBiZSBgZ2l0YCB3aGVuIHRoZXJlIGlzIGFuIGluc3RhbGxhdGlvbiBvZiBnaXQgYXZhaWxhYmxlIG9uXG4gKiB0aGUgc3lzdGVtIHBhdGgsIG9yIGEgZnVsbHkgcXVhbGlmaWVkIHBhdGggdG8gdGhlIGV4ZWN1dGFibGUuXG4gKi9cbkdpdC5wcm90b3R5cGUuY3VzdG9tQmluYXJ5ID0gZnVuY3Rpb24gKGNvbW1hbmQpIHtcbiAgIHRoaXMuX3BsdWdpbnMucmVjb25maWd1cmUoJ2JpbmFyeScsIGNvbW1hbmQpO1xuICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgYW4gZW52aXJvbm1lbnQgdmFyaWFibGUgZm9yIHRoZSBzcGF3bmVkIGNoaWxkIHByb2Nlc3MsIGVpdGhlciBzdXBwbHkgYm90aCBhIG5hbWUgYW5kIHZhbHVlIGFzIHN0cmluZ3Mgb3JcbiAqIGEgc2luZ2xlIG9iamVjdCB0byBlbnRpcmVseSByZXBsYWNlIHRoZSBjdXJyZW50IGVudmlyb25tZW50IHZhcmlhYmxlcy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xPYmplY3R9IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdmFsdWVdXG4gKiBAcmV0dXJucyB7R2l0fVxuICovXG5HaXQucHJvdG90eXBlLmVudiA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLl9leGVjdXRvci5lbnYgPSBuYW1lO1xuICAgfSBlbHNlIHtcbiAgICAgICh0aGlzLl9leGVjdXRvci5lbnYgPSB0aGlzLl9leGVjdXRvci5lbnYgfHwge30pW25hbWVdID0gdmFsdWU7XG4gICB9XG5cbiAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBMaXN0IHRoZSBzdGFzaChzKSBvZiB0aGUgbG9jYWwgcmVwb1xuICovXG5HaXQucHJvdG90eXBlLnN0YXNoTGlzdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIHN0YXNoTGlzdFRhc2soXG4gICAgICAgICB0cmFpbGluZ09wdGlvbnNBcmd1bWVudChhcmd1bWVudHMpIHx8IHt9LFxuICAgICAgICAgKGZpbHRlckFycmF5KG9wdGlvbnMpICYmIG9wdGlvbnMpIHx8IFtdXG4gICAgICApLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG4vKipcbiAqIE1vdmVzIG9uZSBvciBtb3JlIGZpbGVzIHRvIGEgbmV3IGRlc3RpbmF0aW9uLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9naXQtc2NtLmNvbS9kb2NzL2dpdC1tdlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBmcm9tXG4gKiBAcGFyYW0ge3N0cmluZ30gdG9cbiAqL1xuR2l0LnByb3RvdHlwZS5tdiA9IGZ1bmN0aW9uIChmcm9tLCB0bykge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2sobW92ZVRhc2soZnJvbSwgdG8pLCB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKSk7XG59O1xuXG4vKipcbiAqIEludGVybmFsbHkgdXNlcyBwdWxsIGFuZCB0YWdzIHRvIGdldCB0aGUgbGlzdCBvZiB0YWdzIHRoZW4gY2hlY2tzIG91dCB0aGUgbGF0ZXN0IHRhZy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdGhlbl1cbiAqL1xuR2l0LnByb3RvdHlwZS5jaGVja291dExhdGVzdFRhZyA9IGZ1bmN0aW9uICh0aGVuKSB7XG4gICB2YXIgZ2l0ID0gdGhpcztcbiAgIHJldHVybiB0aGlzLnB1bGwoZnVuY3Rpb24gKCkge1xuICAgICAgZ2l0LnRhZ3MoZnVuY3Rpb24gKGVyciwgdGFncykge1xuICAgICAgICAgZ2l0LmNoZWNrb3V0KHRhZ3MubGF0ZXN0LCB0aGVuKTtcbiAgICAgIH0pO1xuICAgfSk7XG59O1xuXG4vKipcbiAqIFB1bGwgdGhlIHVwZGF0ZWQgY29udGVudHMgb2YgdGhlIGN1cnJlbnQgcmVwb1xuICovXG5HaXQucHJvdG90eXBlLnB1bGwgPSBmdW5jdGlvbiAocmVtb3RlLCBicmFuY2gsIG9wdGlvbnMsIHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgcHVsbFRhc2soXG4gICAgICAgICBmaWx0ZXJUeXBlKHJlbW90ZSwgZmlsdGVyU3RyaW5nKSxcbiAgICAgICAgIGZpbHRlclR5cGUoYnJhbmNoLCBmaWx0ZXJTdHJpbmcpLFxuICAgICAgICAgZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cylcbiAgICAgICksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICogRmV0Y2ggdGhlIHVwZGF0ZWQgY29udGVudHMgb2YgdGhlIGN1cnJlbnQgcmVwby5cbiAqXG4gKiBAZXhhbXBsZVxuICogICAuZmV0Y2goJ3Vwc3RyZWFtJywgJ21hc3RlcicpIC8vIGZldGNoZXMgZnJvbSBtYXN0ZXIgb24gcmVtb3RlIG5hbWVkIHVwc3RyZWFtXG4gKiAgIC5mZXRjaChmdW5jdGlvbiAoKSB7fSkgLy8gcnVucyBmZXRjaCBhZ2FpbnN0IGRlZmF1bHQgcmVtb3RlIGFuZCBicmFuY2ggYW5kIGNhbGxzIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IFtyZW1vdGVdXG4gKiBAcGFyYW0ge3N0cmluZ30gW2JyYW5jaF1cbiAqL1xuR2l0LnByb3RvdHlwZS5mZXRjaCA9IGZ1bmN0aW9uIChyZW1vdGUsIGJyYW5jaCkge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBmZXRjaFRhc2soXG4gICAgICAgICBmaWx0ZXJUeXBlKHJlbW90ZSwgZmlsdGVyU3RyaW5nKSxcbiAgICAgICAgIGZpbHRlclR5cGUoYnJhbmNoLCBmaWx0ZXJTdHJpbmcpLFxuICAgICAgICAgZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cylcbiAgICAgICksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICogTGlzdCBhbGwgdGFncy4gV2hlbiB1c2luZyBnaXQgMi43LjAgb3IgYWJvdmUsIGluY2x1ZGUgYW4gb3B0aW9ucyBvYmplY3Qgd2l0aCBgXCItLXNvcnRcIjogXCJwcm9wZXJ0eS1uYW1lXCJgIHRvXG4gKiBzb3J0IHRoZSB0YWdzIGJ5IHRoYXQgcHJvcGVydHkgaW5zdGVhZCBvZiB1c2luZyB0aGUgZGVmYXVsdCBzZW1hbnRpYyB2ZXJzaW9uaW5nIHNvcnQuXG4gKlxuICogTm90ZSwgc3VwcGx5aW5nIHRoaXMgb3B0aW9uIHdoZW4gaXQgaXMgbm90IHN1cHBvcnRlZCBieSB5b3VyIEdpdCB2ZXJzaW9uIHdpbGwgY2F1c2UgdGhlIG9wZXJhdGlvbiB0byBmYWlsLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFt0aGVuXVxuICovXG5HaXQucHJvdG90eXBlLnRhZ3MgPSBmdW5jdGlvbiAob3B0aW9ucywgdGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICB0YWdMaXN0VGFzayhnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICogUmViYXNlcyB0aGUgY3VycmVudCB3b3JraW5nIGNvcHkuIE9wdGlvbnMgY2FuIGJlIHN1cHBsaWVkIGVpdGhlciBhcyBhbiBhcnJheSBvZiBzdHJpbmcgcGFyYW1ldGVyc1xuICogdG8gYmUgc2VudCB0byB0aGUgYGdpdCByZWJhc2VgIGNvbW1hbmQsIG9yIGEgc3RhbmRhcmQgb3B0aW9ucyBvYmplY3QuXG4gKi9cbkdpdC5wcm90b3R5cGUucmViYXNlID0gZnVuY3Rpb24gKCkge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKFsncmViYXNlJywgLi4uZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cyldKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKiBSZXNldCBhIHJlcG9cbiAqL1xuR2l0LnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIChtb2RlKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIHJlc2V0VGFzayhnZXRSZXNldE1vZGUobW9kZSksIGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKiBSZXZlcnQgb25lIG9yIG1vcmUgY29tbWl0cyBpbiB0aGUgbG9jYWwgd29ya2luZyBjb3B5XG4gKi9cbkdpdC5wcm90b3R5cGUucmV2ZXJ0ID0gZnVuY3Rpb24gKGNvbW1pdCkge1xuICAgY29uc3QgbmV4dCA9IHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpO1xuXG4gICBpZiAodHlwZW9mIGNvbW1pdCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKGNvbmZpZ3VyYXRpb25FcnJvclRhc2soJ0NvbW1pdCBtdXN0IGJlIGEgc3RyaW5nJyksIG5leHQpO1xuICAgfVxuXG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soWydyZXZlcnQnLCAuLi5nZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzLCAwLCB0cnVlKSwgY29tbWl0XSksXG4gICAgICBuZXh0XG4gICApO1xufTtcblxuLyoqXG4gKiBBZGQgYSBsaWdodHdlaWdodCB0YWcgdG8gdGhlIGhlYWQgb2YgdGhlIGN1cnJlbnQgYnJhbmNoXG4gKi9cbkdpdC5wcm90b3R5cGUuYWRkVGFnID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgIGNvbnN0IHRhc2sgPVxuICAgICAgdHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnXG4gICAgICAgICA/IGFkZFRhZ1Rhc2sobmFtZSlcbiAgICAgICAgIDogY29uZmlndXJhdGlvbkVycm9yVGFzaygnR2l0LmFkZFRhZyByZXF1aXJlcyBhIHRhZyBuYW1lJyk7XG5cbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKHRhc2ssIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpKTtcbn07XG5cbi8qKlxuICogQWRkIGFuIGFubm90YXRlZCB0YWcgdG8gdGhlIGhlYWQgb2YgdGhlIGN1cnJlbnQgYnJhbmNoXG4gKi9cbkdpdC5wcm90b3R5cGUuYWRkQW5ub3RhdGVkVGFnID0gZnVuY3Rpb24gKHRhZ05hbWUsIHRhZ01lc3NhZ2UpIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgYWRkQW5ub3RhdGVkVGFnVGFzayh0YWdOYW1lLCB0YWdNZXNzYWdlKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKiBEZWxldGUgYSBsb2NhbCBicmFuY2hcbiAqL1xuR2l0LnByb3RvdHlwZS5kZWxldGVMb2NhbEJyYW5jaCA9IGZ1bmN0aW9uIChicmFuY2hOYW1lLCBmb3JjZURlbGV0ZSwgdGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBkZWxldGVCcmFuY2hUYXNrKGJyYW5jaE5hbWUsIHR5cGVvZiBmb3JjZURlbGV0ZSA9PT0gJ2Jvb2xlYW4nID8gZm9yY2VEZWxldGUgOiBmYWxzZSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICogRGVsZXRlIG9uZSBvciBtb3JlIGxvY2FsIGJyYW5jaGVzXG4gKi9cbkdpdC5wcm90b3R5cGUuZGVsZXRlTG9jYWxCcmFuY2hlcyA9IGZ1bmN0aW9uIChicmFuY2hOYW1lcywgZm9yY2VEZWxldGUsIHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgZGVsZXRlQnJhbmNoZXNUYXNrKGJyYW5jaE5hbWVzLCB0eXBlb2YgZm9yY2VEZWxldGUgPT09ICdib29sZWFuJyA/IGZvcmNlRGVsZXRlIDogZmFsc2UpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG4vKipcbiAqIExpc3QgYWxsIGJyYW5jaGVzXG4gKlxuICogQHBhcmFtIHtPYmplY3QgfCBzdHJpbmdbXX0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdGhlbl1cbiAqL1xuR2l0LnByb3RvdHlwZS5icmFuY2ggPSBmdW5jdGlvbiAob3B0aW9ucywgdGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBicmFuY2hUYXNrKGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gbGlzdCBvZiBsb2NhbCBicmFuY2hlc1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFt0aGVuXVxuICovXG5HaXQucHJvdG90eXBlLmJyYW5jaExvY2FsID0gZnVuY3Rpb24gKHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKGJyYW5jaExvY2FsVGFzaygpLCB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKSk7XG59O1xuXG4vKipcbiAqIEV4ZWN1dGVzIGFueSBjb21tYW5kIGFnYWluc3QgdGhlIGdpdCBiaW5hcnkuXG4gKi9cbkdpdC5wcm90b3R5cGUucmF3ID0gZnVuY3Rpb24gKGNvbW1hbmRzKSB7XG4gICBjb25zdCBjcmVhdGVSZXN0Q29tbWFuZHMgPSAhQXJyYXkuaXNBcnJheShjb21tYW5kcyk7XG4gICBjb25zdCBjb21tYW5kID0gW10uc2xpY2UuY2FsbChjcmVhdGVSZXN0Q29tbWFuZHMgPyBhcmd1bWVudHMgOiBjb21tYW5kcywgMCk7XG5cbiAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29tbWFuZC5sZW5ndGggJiYgY3JlYXRlUmVzdENvbW1hbmRzOyBpKyspIHtcbiAgICAgIGlmICghZmlsdGVyUHJpbWl0aXZlcyhjb21tYW5kW2ldKSkge1xuICAgICAgICAgY29tbWFuZC5zcGxpY2UoaSwgY29tbWFuZC5sZW5ndGggLSBpKTtcbiAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgfVxuXG4gICBjb21tYW5kLnB1c2goLi4uZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cywgMCwgdHJ1ZSkpO1xuXG4gICB2YXIgbmV4dCA9IHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpO1xuXG4gICBpZiAoIWNvbW1hbmQubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgIGNvbmZpZ3VyYXRpb25FcnJvclRhc2soJ1JhdzogbXVzdCBzdXBwbHkgb25lIG9yIG1vcmUgY29tbWFuZCB0byBleGVjdXRlJyksXG4gICAgICAgICBuZXh0XG4gICAgICApO1xuICAgfVxuXG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKGNvbW1hbmQsIHRoaXMuX3RyaW1tZWQpLCBuZXh0KTtcbn07XG5cbkdpdC5wcm90b3R5cGUuc3VibW9kdWxlQWRkID0gZnVuY3Rpb24gKHJlcG8sIHBhdGgsIHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKGFkZFN1Yk1vZHVsZVRhc2socmVwbywgcGF0aCksIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpKTtcbn07XG5cbkdpdC5wcm90b3R5cGUuc3VibW9kdWxlVXBkYXRlID0gZnVuY3Rpb24gKGFyZ3MsIHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgdXBkYXRlU3ViTW9kdWxlVGFzayhnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzLCB0cnVlKSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbkdpdC5wcm90b3R5cGUuc3VibW9kdWxlSW5pdCA9IGZ1bmN0aW9uIChhcmdzLCB0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIGluaXRTdWJNb2R1bGVUYXNrKGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMsIHRydWUpKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuR2l0LnByb3RvdHlwZS5zdWJNb2R1bGUgPSBmdW5jdGlvbiAob3B0aW9ucywgdGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBzdWJNb2R1bGVUYXNrKGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuR2l0LnByb3RvdHlwZS5saXN0UmVtb3RlID0gZnVuY3Rpb24gKCkge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBsaXN0UmVtb3Rlc1Rhc2soZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cykpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG4vKipcbiAqIEFkZHMgYSByZW1vdGUgdG8gdGhlIGxpc3Qgb2YgcmVtb3Rlcy5cbiAqL1xuR2l0LnByb3RvdHlwZS5hZGRSZW1vdGUgPSBmdW5jdGlvbiAocmVtb3RlTmFtZSwgcmVtb3RlUmVwbywgdGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBhZGRSZW1vdGVUYXNrKHJlbW90ZU5hbWUsIHJlbW90ZVJlcG8sIGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGFuIGVudHJ5IGJ5IG5hbWUgZnJvbSB0aGUgbGlzdCBvZiByZW1vdGVzLlxuICovXG5HaXQucHJvdG90eXBlLnJlbW92ZVJlbW90ZSA9IGZ1bmN0aW9uIChyZW1vdGVOYW1lLCB0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhyZW1vdmVSZW1vdGVUYXNrKHJlbW90ZU5hbWUpLCB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKSk7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIGN1cnJlbnRseSBhdmFpbGFibGUgcmVtb3Rlcywgc2V0dGluZyB0aGUgb3B0aW9uYWwgdmVyYm9zZSBhcmd1bWVudCB0byB0cnVlIGluY2x1ZGVzIGFkZGl0aW9uYWxcbiAqIGRldGFpbCBvbiB0aGUgcmVtb3RlcyB0aGVtc2VsdmVzLlxuICovXG5HaXQucHJvdG90eXBlLmdldFJlbW90ZXMgPSBmdW5jdGlvbiAodmVyYm9zZSwgdGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soZ2V0UmVtb3Rlc1Rhc2sodmVyYm9zZSA9PT0gdHJ1ZSksIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpKTtcbn07XG5cbi8qKlxuICogQ2FsbCBhbnkgYGdpdCByZW1vdGVgIGZ1bmN0aW9uIHdpdGggYXJndW1lbnRzIHBhc3NlZCBhcyBhbiBhcnJheSBvZiBzdHJpbmdzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nW119IG9wdGlvbnNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFt0aGVuXVxuICovXG5HaXQucHJvdG90eXBlLnJlbW90ZSA9IGZ1bmN0aW9uIChvcHRpb25zLCB0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIHJlbW90ZVRhc2soZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cykpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG4vKipcbiAqIENhbGwgYW55IGBnaXQgdGFnYCBmdW5jdGlvbiB3aXRoIGFyZ3VtZW50cyBwYXNzZWQgYXMgYW4gYXJyYXkgb2Ygc3RyaW5ncy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBvcHRpb25zXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdGhlbl1cbiAqL1xuR2l0LnByb3RvdHlwZS50YWcgPSBmdW5jdGlvbiAob3B0aW9ucywgdGhlbikge1xuICAgY29uc3QgY29tbWFuZCA9IGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpO1xuXG4gICBpZiAoY29tbWFuZFswXSAhPT0gJ3RhZycpIHtcbiAgICAgIGNvbW1hbmQudW5zaGlmdCgndGFnJyk7XG4gICB9XG5cbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soY29tbWFuZCksIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpKTtcbn07XG5cbi8qKlxuICogVXBkYXRlcyByZXBvc2l0b3J5IHNlcnZlciBpbmZvXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3RoZW5dXG4gKi9cbkdpdC5wcm90b3R5cGUudXBkYXRlU2VydmVySW5mbyA9IGZ1bmN0aW9uICh0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soWyd1cGRhdGUtc2VydmVyLWluZm8nXSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICogUHVzaGVzIHRoZSBjdXJyZW50IHRhZyBjaGFuZ2VzIHRvIGEgcmVtb3RlIHdoaWNoIGNhbiBiZSBlaXRoZXIgYSBVUkwgb3IgbmFtZWQgcmVtb3RlLiBXaGVuIG5vdCBzcGVjaWZpZWQgdXNlcyB0aGVcbiAqIGRlZmF1bHQgY29uZmlndXJlZCByZW1vdGUgc3BlYy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gW3JlbW90ZV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFt0aGVuXVxuICovXG5HaXQucHJvdG90eXBlLnB1c2hUYWdzID0gZnVuY3Rpb24gKHJlbW90ZSwgdGhlbikge1xuICAgY29uc3QgdGFzayA9IHB1c2hUYWdzVGFzayhcbiAgICAgIHsgcmVtb3RlOiBmaWx0ZXJUeXBlKHJlbW90ZSwgZmlsdGVyU3RyaW5nKSB9LFxuICAgICAgZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cylcbiAgICk7XG5cbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKHRhc2ssIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyB0aGUgbmFtZWQgZmlsZXMgZnJvbSBzb3VyY2UgY29udHJvbC5cbiAqL1xuR2l0LnByb3RvdHlwZS5ybSA9IGZ1bmN0aW9uIChmaWxlcykge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKFsncm0nLCAnLWYnLCAuLi5hc0FycmF5KGZpbGVzKV0pLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgdGhlIG5hbWVkIGZpbGVzIGZyb20gc291cmNlIGNvbnRyb2wgYnV0IGtlZXBzIHRoZW0gb24gZGlzayByYXRoZXIgdGhhbiBkZWxldGluZyB0aGVtIGVudGlyZWx5LiBUb1xuICogY29tcGxldGVseSByZW1vdmUgdGhlIGZpbGVzLCB1c2UgYHJtYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gZmlsZXNcbiAqL1xuR2l0LnByb3RvdHlwZS5ybUtlZXBMb2NhbCA9IGZ1bmN0aW9uIChmaWxlcykge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKFsncm0nLCAnLS1jYWNoZWQnLCAuLi5hc0FycmF5KGZpbGVzKV0pLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBsaXN0IG9mIG9iamVjdHMgaW4gYSB0cmVlIGJhc2VkIG9uIGNvbW1pdCBoYXNoLiBQYXNzaW5nIGluIGFuIG9iamVjdCBoYXNoIHJldHVybnMgdGhlIG9iamVjdCdzIGNvbnRlbnQsXG4gKiBzaXplLCBhbmQgdHlwZS5cbiAqXG4gKiBQYXNzaW5nIFwiLXBcIiB3aWxsIGluc3RydWN0IGNhdC1maWxlIHRvIGRldGVybWluZSB0aGUgb2JqZWN0IHR5cGUsIGFuZCBkaXNwbGF5IGl0cyBmb3JtYXR0ZWQgY29udGVudHMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdGhlbl1cbiAqL1xuR2l0LnByb3RvdHlwZS5jYXRGaWxlID0gZnVuY3Rpb24gKG9wdGlvbnMsIHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9jYXRGaWxlKCd1dGYtOCcsIGFyZ3VtZW50cyk7XG59O1xuXG5HaXQucHJvdG90eXBlLmJpbmFyeUNhdEZpbGUgPSBmdW5jdGlvbiAoKSB7XG4gICByZXR1cm4gdGhpcy5fY2F0RmlsZSgnYnVmZmVyJywgYXJndW1lbnRzKTtcbn07XG5cbkdpdC5wcm90b3R5cGUuX2NhdEZpbGUgPSBmdW5jdGlvbiAoZm9ybWF0LCBhcmdzKSB7XG4gICB2YXIgaGFuZGxlciA9IHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmdzKTtcbiAgIHZhciBjb21tYW5kID0gWydjYXQtZmlsZSddO1xuICAgdmFyIG9wdGlvbnMgPSBhcmdzWzBdO1xuXG4gICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgIGNvbmZpZ3VyYXRpb25FcnJvclRhc2soJ0dpdC5jYXRGaWxlOiBvcHRpb25zIG11c3QgYmUgc3VwcGxpZWQgYXMgYW4gYXJyYXkgb2Ygc3RyaW5ncycpLFxuICAgICAgICAgaGFuZGxlclxuICAgICAgKTtcbiAgIH1cblxuICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgIGNvbW1hbmQucHVzaC5hcHBseShjb21tYW5kLCBvcHRpb25zKTtcbiAgIH1cblxuICAgY29uc3QgdGFzayA9XG4gICAgICBmb3JtYXQgPT09ICdidWZmZXInID8gc3RyYWlnaHRUaHJvdWdoQnVmZmVyVGFzayhjb21tYW5kKSA6IHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soY29tbWFuZCk7XG5cbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKHRhc2ssIGhhbmRsZXIpO1xufTtcblxuR2l0LnByb3RvdHlwZS5kaWZmID0gZnVuY3Rpb24gKG9wdGlvbnMsIHRoZW4pIHtcbiAgIGNvbnN0IHRhc2sgPSBmaWx0ZXJTdHJpbmcob3B0aW9ucylcbiAgICAgID8gY29uZmlndXJhdGlvbkVycm9yVGFzayhcbiAgICAgICAgICAgJ2dpdC5kaWZmOiBzdXBwbHlpbmcgb3B0aW9ucyBhcyBhIHNpbmdsZSBzdHJpbmcgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCwgc3dpdGNoIHRvIGFuIGFycmF5IG9mIHN0cmluZ3MnXG4gICAgICAgIClcbiAgICAgIDogc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhbJ2RpZmYnLCAuLi5nZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKV0pO1xuXG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayh0YXNrLCB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKSk7XG59O1xuXG5HaXQucHJvdG90eXBlLmRpZmZTdW1tYXJ5ID0gZnVuY3Rpb24gKCkge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBkaWZmU3VtbWFyeVRhc2soZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cywgMSkpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG5HaXQucHJvdG90eXBlLmFwcGx5UGF0Y2ggPSBmdW5jdGlvbiAocGF0Y2hlcykge1xuICAgY29uc3QgdGFzayA9ICFmaWx0ZXJTdHJpbmdPclN0cmluZ0FycmF5KHBhdGNoZXMpXG4gICAgICA/IGNvbmZpZ3VyYXRpb25FcnJvclRhc2soXG4gICAgICAgICAgIGBnaXQuYXBwbHlQYXRjaCByZXF1aXJlcyBvbmUgb3IgbW9yZSBzdHJpbmcgcGF0Y2hlcyBhcyB0aGUgZmlyc3QgYXJndW1lbnRgXG4gICAgICAgIClcbiAgICAgIDogYXBwbHlQYXRjaFRhc2soYXNBcnJheShwYXRjaGVzKSwgZ2V0VHJhaWxpbmdPcHRpb25zKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSkpO1xuXG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayh0YXNrLCB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKSk7XG59O1xuXG5HaXQucHJvdG90eXBlLnJldnBhcnNlID0gZnVuY3Rpb24gKCkge1xuICAgY29uc3QgY29tbWFuZHMgPSBbJ3Jldi1wYXJzZScsIC4uLmdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMsIHRydWUpXTtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhjb21tYW5kcywgdHJ1ZSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICovXG5HaXQucHJvdG90eXBlLmNsZWFuID0gZnVuY3Rpb24gKG1vZGUsIG9wdGlvbnMsIHRoZW4pIHtcbiAgIGNvbnN0IHVzaW5nQ2xlYW5PcHRpb25zQXJyYXkgPSBpc0NsZWFuT3B0aW9uc0FycmF5KG1vZGUpO1xuICAgY29uc3QgY2xlYW5Nb2RlID1cbiAgICAgICh1c2luZ0NsZWFuT3B0aW9uc0FycmF5ICYmIG1vZGUuam9pbignJykpIHx8IGZpbHRlclR5cGUobW9kZSwgZmlsdGVyU3RyaW5nKSB8fCAnJztcbiAgIGNvbnN0IGN1c3RvbUFyZ3MgPSBnZXRUcmFpbGluZ09wdGlvbnMoW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIHVzaW5nQ2xlYW5PcHRpb25zQXJyYXkgPyAxIDogMCkpO1xuXG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIGNsZWFuV2l0aE9wdGlvbnNUYXNrKGNsZWFuTW9kZSwgY3VzdG9tQXJncyksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbkdpdC5wcm90b3R5cGUuZXhlYyA9IGZ1bmN0aW9uICh0aGVuKSB7XG4gICBjb25zdCB0YXNrID0ge1xuICAgICAgY29tbWFuZHM6IFtdLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgcGFyc2VyKCkge1xuICAgICAgICAgaWYgKHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGVuKCk7XG4gICAgICAgICB9XG4gICAgICB9LFxuICAgfTtcblxuICAgcmV0dXJuIHRoaXMuX3J1blRhc2sodGFzayk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGEgcGF0aG5hbWUgb3IgcGF0aG5hbWVzIGFyZSBleGNsdWRlZCBieSAuZ2l0aWdub3JlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IHBhdGhuYW1lc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gW3RoZW5dXG4gKi9cbkdpdC5wcm90b3R5cGUuY2hlY2tJZ25vcmUgPSBmdW5jdGlvbiAocGF0aG5hbWVzLCB0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIGNoZWNrSWdub3JlVGFzayhhc0FycmF5KGZpbHRlclR5cGUocGF0aG5hbWVzLCBmaWx0ZXJTdHJpbmdPclN0cmluZ0FycmF5LCBbXSkpKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuR2l0LnByb3RvdHlwZS5jaGVja0lzUmVwbyA9IGZ1bmN0aW9uIChjaGVja1R5cGUsIHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgY2hlY2tJc1JlcG9UYXNrKGZpbHRlclR5cGUoY2hlY2tUeXBlLCBmaWx0ZXJTdHJpbmcpKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR2l0O1xuIiwgImltcG9ydCB7IEdpdFBsdWdpbkVycm9yIH0gZnJvbSAnLi4vZXJyb3JzL2dpdC1wbHVnaW4tZXJyb3InO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRPcHRpb25zIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRQbHVnaW4gfSBmcm9tICcuL3NpbXBsZS1naXQtcGx1Z2luJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFib3J0UGx1Z2luKHNpZ25hbDogU2ltcGxlR2l0T3B0aW9uc1snYWJvcnQnXSkge1xuICAgaWYgKCFzaWduYWwpIHtcbiAgICAgIHJldHVybjtcbiAgIH1cblxuICAgY29uc3Qgb25TcGF3bkFmdGVyOiBTaW1wbGVHaXRQbHVnaW48J3NwYXduLmFmdGVyJz4gPSB7XG4gICAgICB0eXBlOiAnc3Bhd24uYWZ0ZXInLFxuICAgICAgYWN0aW9uKF9kYXRhLCBjb250ZXh0KSB7XG4gICAgICAgICBmdW5jdGlvbiBraWxsKCkge1xuICAgICAgICAgICAgY29udGV4dC5raWxsKG5ldyBHaXRQbHVnaW5FcnJvcih1bmRlZmluZWQsICdhYm9ydCcsICdBYm9ydCBzaWduYWwgcmVjZWl2ZWQnKSk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGtpbGwpO1xuXG4gICAgICAgICBjb250ZXh0LnNwYXduZWQub24oJ2Nsb3NlJywgKCkgPT4gc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywga2lsbCkpO1xuICAgICAgfSxcbiAgIH07XG5cbiAgIGNvbnN0IG9uU3Bhd25CZWZvcmU6IFNpbXBsZUdpdFBsdWdpbjwnc3Bhd24uYmVmb3JlJz4gPSB7XG4gICAgICB0eXBlOiAnc3Bhd24uYmVmb3JlJyxcbiAgICAgIGFjdGlvbihfZGF0YSwgY29udGV4dCkge1xuICAgICAgICAgaWYgKHNpZ25hbC5hYm9ydGVkKSB7XG4gICAgICAgICAgICBjb250ZXh0LmtpbGwobmV3IEdpdFBsdWdpbkVycm9yKHVuZGVmaW5lZCwgJ2Fib3J0JywgJ0Fib3J0IGFscmVhZHkgc2lnbmFsZWQnKSk7XG4gICAgICAgICB9XG4gICAgICB9LFxuICAgfTtcblxuICAgcmV0dXJuIFtvblNwYXduQmVmb3JlLCBvblNwYXduQWZ0ZXJdO1xufVxuIiwgImltcG9ydCB7IGlzR2l0RW52S2V5IH0gZnJvbSAnQHNpbXBsZS1naXQvYXJndi1wYXJzZXInO1xuXG5pbXBvcnQgeyBHaXRQbHVnaW5FcnJvciB9IGZyb20gJy4uL2Vycm9ycy9naXQtcGx1Z2luLWVycm9yJztcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gJy4uL2dpdC1sb2dnZXInO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRQbHVnaW4gfSBmcm9tICcuL3NpbXBsZS1naXQtcGx1Z2luJztcblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKCcnLCAncGx1Z2luOmFsbG93RW52aXJvbm1lbnQnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFsbG93RW52aXJvbm1lbnRQbHVnaW4oXG4gICBhbGxvd0Vudmlyb25tZW50OiByZWFkb25seSBzdHJpbmdbXSxcbiAgIGFsbG93QWJicmV2aWF0ZWRPcHRpb25zID0gZmFsc2Vcbik6IFNpbXBsZUdpdFBsdWdpbjwnc3Bhd24ub3B0aW9ucyc+IHtcbiAgIGNvbnN0IGFsbG93ZWQgPSBuZXcgU2V0KGFsbG93RW52aXJvbm1lbnQubWFwKChrZXkpID0+IGtleS50b0xvd2VyQ2FzZSgpLnRyaW0oKSkpO1xuXG4gICByZXR1cm4ge1xuICAgICAgdHlwZTogJ3NwYXduLm9wdGlvbnMnLFxuICAgICAgYWN0aW9uKHNwYXduT3B0aW9ucywgY29udGV4dCkge1xuICAgICAgICAgY29uc3QgZW52ID0geyAuLi4oc3Bhd25PcHRpb25zLmVudiA/PyBwcm9jZXNzLmVudikgfTtcbiAgICAgICAgIGNvbnN0IHN1cHBsaWVkS2V5cyA9IG5ldyBTZXQoXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhjb250ZXh0LmVudikubWFwKChrZXkpID0+IGtleS50b0xvd2VyQ2FzZSgpLnRyaW0oKSlcbiAgICAgICAgICk7XG5cbiAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGVudikpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbGlzZWQgPSBrZXkudG9Mb3dlckNhc2UoKS50cmltKCk7XG5cbiAgICAgICAgICAgIC8vIG5vdCBhIEdJVF8ga2V5LCBvciBleHBsaWNpdGx5IHBlcm1pdHRlZFxuICAgICAgICAgICAgaWYgKCFpc0d1YXJkZWRFbnZLZXkobm9ybWFsaXNlZCkgfHwgYWxsb3dlZC5oYXMobm9ybWFsaXNlZCkpIHtcbiAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBleHBsaWNpdGx5IHRocm93IHdoZW4gc2ltcGxlR2l0LmVudigpIHdhcyBjYWxsZWQgd2l0aCBhIGd1YXJkZWQga2V5XG4gICAgICAgICAgICBpZiAoc3VwcGxpZWRLZXlzLmhhcyhub3JtYWxpc2VkKSkge1xuICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdpdFBsdWdpbkVycm9yKFxuICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgJ2FsbG93RW52aXJvbm1lbnQnLFxuICAgICAgICAgICAgICAgICAgYFVzZSBvZiBcIiR7a2V5fVwiIGlzIGJsb2NrZWQgYnkgdGhlIGVudmlyb25tZW50IGd1YXJkIC0gYWRkIGl0IHRvIHRoZSBhbGxvd0Vudmlyb25tZW50IG9wdGlvbiB0byBwZXJtaXQgaXRgXG4gICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBsb2cgYW5kIHJlbW92ZSBndWFyZGVkIGtleXMgaW5oZXJpdGVkIGZyb20gdGhlIG91dGVyIGVudmlyb25tZW50XG4gICAgICAgICAgICBsb2dnZXIoYHJlbW92aW5nIGFtYmllbnQgZ3VhcmRlZCBlbnZpcm9ubWVudCB2YXJpYWJsZSAlc2AsIGtleSk7XG4gICAgICAgICAgICBkZWxldGUgZW52W2tleV07XG4gICAgICAgICB9XG5cbiAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5zcGF3bk9wdGlvbnMsXG4gICAgICAgICAgICBlbnY6IHtcbiAgICAgICAgICAgICAgIC4uLmVudixcbiAgICAgICAgICAgICAgIEdJVF9URVNUX0RJU0FMTE9XX0FCQlJFVklBVEVEX09QVElPTlM6IFN0cmluZyghYWxsb3dBYmJyZXZpYXRlZE9wdGlvbnMpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgIH07XG4gICAgICB9LFxuICAgfTtcbn1cblxuZnVuY3Rpb24gaXNHdWFyZGVkRW52S2V5KGtleTogc3RyaW5nKSB7XG4gICBjb25zdCBub3JtYWxpc2VkID0ga2V5LnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICAgcmV0dXJuIG5vcm1hbGlzZWQuc3RhcnRzV2l0aCgnZ2l0XycpIHx8IGlzR2l0RW52S2V5KG5vcm1hbGlzZWQpO1xufVxuIiwgImltcG9ydCB7IHZ1bG5lcmFiaWxpdHlDaGVjayB9IGZyb20gJ0BzaW1wbGUtZ2l0L2FyZ3YtcGFyc2VyJztcblxuaW1wb3J0IHsgR2l0UGx1Z2luRXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvZ2l0LXBsdWdpbi1lcnJvcic7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdFBsdWdpbkNvbmZpZyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0UGx1Z2luIH0gZnJvbSAnLi9zaW1wbGUtZ2l0LXBsdWdpbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBibG9ja1Vuc2FmZU9wZXJhdGlvbnNQbHVnaW4oXG4gICBvcHRpb25zOiBTaW1wbGVHaXRQbHVnaW5Db25maWdbJ3Vuc2FmZSddID0ge31cbik6IFNpbXBsZUdpdFBsdWdpbjwnc3Bhd24uYXJncyc+IHtcbiAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnc3Bhd24uYXJncycsXG4gICAgICBhY3Rpb24oYXJncywgeyBlbnYgfSkge1xuICAgICAgICAgZm9yIChjb25zdCB2dWxuZXJhYmlsaXR5IG9mIHZ1bG5lcmFiaWxpdHlDaGVjayhhcmdzLCBlbnYpKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uc1t2dWxuZXJhYmlsaXR5LmNhdGVnb3J5XSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdpdFBsdWdpbkVycm9yKHVuZGVmaW5lZCwgJ3Vuc2FmZScsIHZ1bG5lcmFiaWxpdHkubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICB9XG5cbiAgICAgICAgIHJldHVybiBhcmdzO1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHsgcHJlZml4ZWRBcnJheSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0UGx1Z2luIH0gZnJvbSAnLi9zaW1wbGUtZ2l0LXBsdWdpbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21tYW5kQ29uZmlnUHJlZml4aW5nUGx1Z2luKFxuICAgY29uZmlndXJhdGlvbjogc3RyaW5nW11cbik6IFNpbXBsZUdpdFBsdWdpbjwnc3Bhd24uYXJncyc+IHtcbiAgIGNvbnN0IHByZWZpeCA9IHByZWZpeGVkQXJyYXkoY29uZmlndXJhdGlvbiwgJy1jJyk7XG5cbiAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnc3Bhd24uYXJncycsXG4gICAgICBhY3Rpb24oZGF0YSkge1xuICAgICAgICAgcmV0dXJuIFsuLi5wcmVmaXgsIC4uLmRhdGFdO1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHsgdHlwZSBEZWZlcnJlZFByb21pc2UsIGRlZmVycmVkIH0gZnJvbSAnQGt3c2l0ZXMvcHJvbWlzZS1kZWZlcnJlZCc7XG5cbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0UGx1Z2luQ29uZmlnIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgZGVsYXkgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdFBsdWdpbiB9IGZyb20gJy4vc2ltcGxlLWdpdC1wbHVnaW4nO1xuXG5jb25zdCBuZXZlciA9IGRlZmVycmVkKCkucHJvbWlzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBsZXRpb25EZXRlY3Rpb25QbHVnaW4oe1xuICAgb25DbG9zZSA9IHRydWUsXG4gICBvbkV4aXQgPSA1MCxcbn06IFNpbXBsZUdpdFBsdWdpbkNvbmZpZ1snY29tcGxldGlvbiddID0ge30pOiBTaW1wbGVHaXRQbHVnaW48J3NwYXduLmFmdGVyJz4ge1xuICAgZnVuY3Rpb24gY3JlYXRlRXZlbnRzKCkge1xuICAgICAgbGV0IGV4aXRDb2RlID0gLTE7XG4gICAgICBjb25zdCBldmVudHMgPSB7XG4gICAgICAgICBjbG9zZTogZGVmZXJyZWQoKSxcbiAgICAgICAgIGNsb3NlVGltZW91dDogZGVmZXJyZWQoKSxcbiAgICAgICAgIGV4aXQ6IGRlZmVycmVkKCksXG4gICAgICAgICBleGl0VGltZW91dDogZGVmZXJyZWQoKSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IFByb21pc2UucmFjZShbXG4gICAgICAgICBvbkNsb3NlID09PSBmYWxzZSA/IG5ldmVyIDogZXZlbnRzLmNsb3NlVGltZW91dC5wcm9taXNlLFxuICAgICAgICAgb25FeGl0ID09PSBmYWxzZSA/IG5ldmVyIDogZXZlbnRzLmV4aXRUaW1lb3V0LnByb21pc2UsXG4gICAgICBdKTtcblxuICAgICAgY29uZmlndXJlVGltZW91dChvbkNsb3NlLCBldmVudHMuY2xvc2UsIGV2ZW50cy5jbG9zZVRpbWVvdXQpO1xuICAgICAgY29uZmlndXJlVGltZW91dChvbkV4aXQsIGV2ZW50cy5leGl0LCBldmVudHMuZXhpdFRpbWVvdXQpO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAgY2xvc2UoY29kZTogbnVtYmVyKSB7XG4gICAgICAgICAgICBleGl0Q29kZSA9IGNvZGU7XG4gICAgICAgICAgICBldmVudHMuY2xvc2UuZG9uZSgpO1xuICAgICAgICAgfSxcbiAgICAgICAgIGV4aXQoY29kZTogbnVtYmVyKSB7XG4gICAgICAgICAgICBleGl0Q29kZSA9IGNvZGU7XG4gICAgICAgICAgICBldmVudHMuZXhpdC5kb25lKCk7XG4gICAgICAgICB9LFxuICAgICAgICAgZ2V0IGV4aXRDb2RlKCkge1xuICAgICAgICAgICAgcmV0dXJuIGV4aXRDb2RlO1xuICAgICAgICAgfSxcbiAgICAgICAgIHJlc3VsdCxcbiAgICAgIH07XG4gICB9XG5cbiAgIGZ1bmN0aW9uIGNvbmZpZ3VyZVRpbWVvdXQoXG4gICAgICBmbGFnOiBib29sZWFuIHwgbnVtYmVyLFxuICAgICAgZXZlbnQ6IERlZmVycmVkUHJvbWlzZTx2b2lkPixcbiAgICAgIHRpbWVvdXQ6IERlZmVycmVkUHJvbWlzZTx2b2lkPlxuICAgKSB7XG4gICAgICBpZiAoZmxhZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgKGZsYWcgPT09IHRydWUgPyBldmVudC5wcm9taXNlIDogZXZlbnQucHJvbWlzZS50aGVuKCgpID0+IGRlbGF5KGZsYWcpKSkudGhlbih0aW1lb3V0LmRvbmUpO1xuICAgfVxuXG4gICByZXR1cm4ge1xuICAgICAgdHlwZTogJ3NwYXduLmFmdGVyJyxcbiAgICAgIGFzeW5jIGFjdGlvbihfZGF0YSwgeyBzcGF3bmVkLCBjbG9zZSB9KSB7XG4gICAgICAgICBjb25zdCBldmVudHMgPSBjcmVhdGVFdmVudHMoKTtcblxuICAgICAgICAgbGV0IGRlZmVyQ2xvc2UgPSB0cnVlO1xuICAgICAgICAgbGV0IHF1aWNrQ2xvc2UgPSAoKSA9PiB2b2lkIChkZWZlckNsb3NlID0gZmFsc2UpO1xuXG4gICAgICAgICBzcGF3bmVkLnN0ZG91dD8ub24oJ2RhdGEnLCBxdWlja0Nsb3NlKTtcbiAgICAgICAgIHNwYXduZWQuc3RkZXJyPy5vbignZGF0YScsIHF1aWNrQ2xvc2UpO1xuICAgICAgICAgc3Bhd25lZC5vbignZXJyb3InLCBxdWlja0Nsb3NlKTtcblxuICAgICAgICAgc3Bhd25lZC5vbignY2xvc2UnLCAoY29kZTogbnVtYmVyKSA9PiBldmVudHMuY2xvc2UoY29kZSkpO1xuICAgICAgICAgc3Bhd25lZC5vbignZXhpdCcsIChjb2RlOiBudW1iZXIpID0+IGV2ZW50cy5leGl0KGNvZGUpKTtcblxuICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IGV2ZW50cy5yZXN1bHQ7XG4gICAgICAgICAgICBpZiAoZGVmZXJDbG9zZSkge1xuICAgICAgICAgICAgICAgYXdhaXQgZGVsYXkoNTApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xvc2UoZXZlbnRzLmV4aXRDb2RlKTtcbiAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY2xvc2UoZXZlbnRzLmV4aXRDb2RlLCBlcnIgYXMgRXJyb3IpO1xuICAgICAgICAgfVxuICAgICAgfSxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHsgR2l0UGx1Z2luRXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvZ2l0LXBsdWdpbi1lcnJvcic7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tICcuLi9naXQtbG9nZ2VyJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0T3B0aW9ucyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGFzQXJyYXkgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgdHlwZSB7IFBsdWdpblN0b3JlIH0gZnJvbSAnLi9wbHVnaW4tc3RvcmUnO1xuXG5jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoJycsICdwbHVnaW46YmluYXJ5Jyk7XG5cbmNvbnN0IFdST05HX05VTUJFUl9FUlIgPSBgSW52YWxpZCB2YWx1ZSBzdXBwbGllZCBmb3IgY3VzdG9tIGJpbmFyeSwgcmVxdWlyZXMgYSBzaW5nbGUgc3RyaW5nIG9yIGFuIGFycmF5IGNvbnRhaW5pbmcgZWl0aGVyIG9uZSBvciB0d28gc3RyaW5nc2A7XG5jb25zdCBXUk9OR19DSEFSU19FUlIgPSBgSW52YWxpZCB2YWx1ZSBzdXBwbGllZCBmb3IgY3VzdG9tIGJpbmFyeSwgcmVzdHJpY3RlZCBjaGFyYWN0ZXJzIG11c3QgYmUgcmVtb3ZlZCBvciBzdXBwbHkgdGhlIHVuc2FmZS5hbGxvd1Vuc2FmZUN1c3RvbUJpbmFyeSBvcHRpb25gO1xuXG5mdW5jdGlvbiBpc0JhZEFyZ3VtZW50KGFyZzogc3RyaW5nKSB7XG4gICByZXR1cm4gIWFyZyB8fCAhL14oW2Etel06KT8oW2EtejAtOS8uXFxcXF9+LV0rKSQvaS50ZXN0KGFyZyk7XG59XG5cbmZ1bmN0aW9uIHRvQmluYXJ5Q29uZmlnKFxuICAgaW5wdXQ6IHN0cmluZ1tdLFxuICAgYWxsb3dVbnNhZmU6IGJvb2xlYW5cbik6IHsgYmluYXJ5OiBzdHJpbmc7IHByZWZpeD86IHN0cmluZyB9IHtcbiAgIGlmIChpbnB1dC5sZW5ndGggPCAxIHx8IGlucHV0Lmxlbmd0aCA+IDIpIHtcbiAgICAgIHRocm93IG5ldyBHaXRQbHVnaW5FcnJvcih1bmRlZmluZWQsICdiaW5hcnknLCBXUk9OR19OVU1CRVJfRVJSKTtcbiAgIH1cblxuICAgY29uc3QgaXNCYWQgPSBpbnB1dC5zb21lKGlzQmFkQXJndW1lbnQpO1xuICAgaWYgKGlzQmFkKSB7XG4gICAgICBpZiAoYWxsb3dVbnNhZmUpIHtcbiAgICAgICAgIGxvZ2dlcigncGVybWl0dGVkIHVuc2FmZSBiaW5hcnkgJW8nLCBpbnB1dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgdGhyb3cgbmV3IEdpdFBsdWdpbkVycm9yKHVuZGVmaW5lZCwgJ2JpbmFyeScsIFdST05HX0NIQVJTX0VSUik7XG4gICAgICB9XG4gICB9XG5cbiAgIGNvbnN0IFtiaW5hcnksIHByZWZpeF0gPSBpbnB1dDtcbiAgIHJldHVybiB7XG4gICAgICBiaW5hcnksXG4gICAgICBwcmVmaXgsXG4gICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3VzdG9tQmluYXJ5UGx1Z2luKFxuICAgcGx1Z2luczogUGx1Z2luU3RvcmUsXG4gICBpbnB1dDogU2ltcGxlR2l0T3B0aW9uc1snYmluYXJ5J10gPSBbJ2dpdCddLFxuICAgYWxsb3dVbnNhZmUgPSBmYWxzZVxuKSB7XG4gICBsZXQgY29uZmlnID0gdG9CaW5hcnlDb25maWcoYXNBcnJheShpbnB1dCksIGFsbG93VW5zYWZlKTtcblxuICAgcGx1Z2lucy5vbignYmluYXJ5JywgKGlucHV0KSA9PiB7XG4gICAgICBjb25maWcgPSB0b0JpbmFyeUNvbmZpZyhhc0FycmF5KGlucHV0KSwgYWxsb3dVbnNhZmUpO1xuICAgICAgbG9nZ2VyLmluZm8oJ3JlY29uZmlndXJpbmcgJW8nLCBjb25maWcpO1xuICAgfSk7XG5cbiAgIHBsdWdpbnMuYXBwZW5kKCdzcGF3bi5iaW5hcnknLCAoKSA9PiB7XG4gICAgICByZXR1cm4gY29uZmlnLmJpbmFyeTtcbiAgIH0pO1xuXG4gICBwbHVnaW5zLmFwcGVuZCgnc3Bhd24uYXJncycsIChkYXRhKSA9PiB7XG4gICAgICByZXR1cm4gY29uZmlnLnByZWZpeCA/IFtjb25maWcucHJlZml4LCAuLi5kYXRhXSA6IGRhdGE7XG4gICB9KTtcbn1cbiIsICJpbXBvcnQgeyBHaXRFcnJvciB9IGZyb20gJy4vZ2l0LWVycm9yJztcblxuY29uc3QgUkVBU09OUyA9IHtcbiAgIERJU0FMTE9XRURfQUJCUkVWSUFURUQ6IHtcbiAgICAgIHRleHQ6ICdkaXNhbGxvd2VkIGFiYnJldmlhdGVkIG9yIGFtYmlndW91cyBvcHRpb24nLFxuICAgICAgc29sdXRpb246XG4gICAgICAgICAnVW5hbWJpZ3VvdXMgYWJicmV2aWF0ZWQgb3B0aW9ucyBibG9ja2VkIHdpdGggdW5zYWZlLmFsbG93QWJicmV2aWF0ZWRPcHRpb25zIHNldHRpbmc6IHttZXNzYWdlfScsXG4gICB9LFxuICAgVU5LTk9XTjoge1xuICAgICAgdGV4dDogJ34gdW5rbm93biB+JyxcbiAgICAgIHNvbHV0aW9uOiB1bmRlZmluZWQsXG4gICB9LFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgR2l0Q29uZmlndXJhdGlvbkVycm9yUmVhc29uID0ga2V5b2YgdHlwZW9mIFJFQVNPTlM7XG5cbmZ1bmN0aW9uIGdldFJlYXNvbihtZXNzYWdlPzogc3RyaW5nKTogR2l0Q29uZmlndXJhdGlvbkVycm9yUmVhc29uIHtcbiAgIGlmICghbWVzc2FnZSkge1xuICAgICAgcmV0dXJuICdVTktOT1dOJztcbiAgIH1cbiAgIGZvciAoY29uc3QgW3JlYXNvbiwgeyB0ZXh0IH1dIG9mIE9iamVjdC5lbnRyaWVzKFJFQVNPTlMpKSB7XG4gICAgICBpZiAobWVzc2FnZS5zdGFydHNXaXRoKGBmYXRhbDogJHt0ZXh0fWApKSB7XG4gICAgICAgICByZXR1cm4gcmVhc29uIGFzIEdpdENvbmZpZ3VyYXRpb25FcnJvclJlYXNvbjtcbiAgICAgIH1cbiAgIH1cbiAgIHJldHVybiAnVU5LTk9XTic7XG59XG5cbi8qKlxuICogVGhlIGBHaXRDb25maWd1cmF0aW9uRXJyb3JgIGlzIHRocm93biB3aGVuIHRoZSBgZ2l0YCBwcm9jZXNzIHJlamVjdHNcbiAqIHRoZSBzdXBwbGllZCBjb25maWd1cmF0aW9uIGFyZ3VtZW50cyBvciBlbnZpcm9ubWVudCB2YXJpYWJsZXMuXG4gKlxuICogQ2hlY2sgdGhlIGAubWVzc2FnZWAgcHJvcGVydHkgZm9yIG1vcmUgZGV0YWlsIG9uIHdoeSB5b3VyIGNvbmZpZ3VyYXRpb25cbiAqIHJlc3VsdGVkIGluIGFuIGVycm9yLlxuICovXG5leHBvcnQgY2xhc3MgR2l0Q29uZmlndXJhdGlvbkVycm9yIGV4dGVuZHMgR2l0RXJyb3Ige1xuICAgcHVibGljIHJlYWRvbmx5IHJlYXNvbjogR2l0Q29uZmlndXJhdGlvbkVycm9yUmVhc29uO1xuXG4gICBjb25zdHJ1Y3RvcihtZXNzYWdlID0gJycpIHtcbiAgICAgIGNvbnN0IHJlYXNvbiA9IGdldFJlYXNvbihtZXNzYWdlKTtcblxuICAgICAgc3VwZXIodW5kZWZpbmVkLCBSRUFTT05TW3JlYXNvbl0uc29sdXRpb24/LnJlcGxhY2UoJ3ttZXNzYWdlfScsIG1lc3NhZ2UpID8/IG1lc3NhZ2UpO1xuICAgICAgdGhpcy5yZWFzb24gPSByZWFzb247XG4gICB9XG59XG4iLCAiaW1wb3J0IHsgR2l0Q29uZmlndXJhdGlvbkVycm9yIH0gZnJvbSAnLi4vZXJyb3JzL2dpdC1jb25maWd1cmF0aW9uLWVycm9yJztcbmltcG9ydCB7IEdpdEVycm9yIH0gZnJvbSAnLi4vZXJyb3JzL2dpdC1lcnJvcic7XG5pbXBvcnQgdHlwZSB7IEdpdEV4ZWN1dG9yUmVzdWx0LCBTaW1wbGVHaXRQbHVnaW5Db25maWcgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdFBsdWdpbiB9IGZyb20gJy4vc2ltcGxlLWdpdC1wbHVnaW4nO1xuXG50eXBlIFRhc2tSZXN1bHQgPSBPbWl0PEdpdEV4ZWN1dG9yUmVzdWx0LCAncmVqZWN0aW9uJz47XG5cbmZ1bmN0aW9uIGlzVGFza0Vycm9yKHJlc3VsdDogVGFza1Jlc3VsdCkge1xuICAgcmV0dXJuICEhKHJlc3VsdC5leGl0Q29kZSAmJiByZXN1bHQuc3RkRXJyLmxlbmd0aCk7XG59XG5cbmZ1bmN0aW9uIGdldEVycm9yTWVzc2FnZShyZXN1bHQ6IFRhc2tSZXN1bHQpIHtcbiAgIHJldHVybiBCdWZmZXIuY29uY2F0KFsuLi5yZXN1bHQuc3RkT3V0LCAuLi5yZXN1bHQuc3RkRXJyXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlcnJvckRldGVjdGlvbkhhbmRsZXIoXG4gICBvdmVyd3JpdGUgPSBmYWxzZSxcbiAgIGlzRXJyb3IgPSBpc1Rhc2tFcnJvcixcbiAgIGVycm9yTWVzc2FnZTogKHJlc3VsdDogVGFza1Jlc3VsdCkgPT4gQnVmZmVyIHwgRXJyb3IgPSBnZXRFcnJvck1lc3NhZ2Vcbikge1xuICAgcmV0dXJuIChlcnJvcjogQnVmZmVyIHwgRXJyb3IgfCB1bmRlZmluZWQsIHJlc3VsdDogVGFza1Jlc3VsdCkgPT4ge1xuICAgICAgaWYgKCghb3ZlcndyaXRlICYmIGVycm9yKSB8fCAhaXNFcnJvcihyZXN1bHQpKSB7XG4gICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBlcnJvck1lc3NhZ2UocmVzdWx0KTtcbiAgIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUdpdEVycm9yKGV4aXRDb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZykge1xuICAgaWYgKGV4aXRDb2RlID09PSAxMjggJiYgbWVzc2FnZS5zdGFydHNXaXRoKCdmYXRhbDonKSkge1xuICAgICAgcmV0dXJuIG5ldyBHaXRDb25maWd1cmF0aW9uRXJyb3IobWVzc2FnZSk7XG4gICB9XG5cbiAgIHJldHVybiBuZXcgR2l0RXJyb3IodW5kZWZpbmVkLCBtZXNzYWdlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVycm9yRGV0ZWN0aW9uUGx1Z2luKFxuICAgY29uZmlnOiBTaW1wbGVHaXRQbHVnaW5Db25maWdbJ2Vycm9ycyddXG4pOiBTaW1wbGVHaXRQbHVnaW48J3Rhc2suZXJyb3InPiB7XG4gICByZXR1cm4ge1xuICAgICAgdHlwZTogJ3Rhc2suZXJyb3InLFxuICAgICAgYWN0aW9uKGRhdGEsIGNvbnRleHQpIHtcbiAgICAgICAgIGNvbnN0IGVycm9yID0gY29uZmlnKGRhdGEuZXJyb3IsIHtcbiAgICAgICAgICAgIHN0ZEVycjogY29udGV4dC5zdGRFcnIsXG4gICAgICAgICAgICBzdGRPdXQ6IGNvbnRleHQuc3RkT3V0LFxuICAgICAgICAgICAgZXhpdENvZGU6IGNvbnRleHQuZXhpdENvZGUsXG4gICAgICAgICB9KTtcblxuICAgICAgICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihlcnJvcikpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICBlcnJvcjogY3JlYXRlR2l0RXJyb3IoY29udGV4dC5leGl0Q29kZSwgZXJyb3IudG9TdHJpbmcoJ3V0Zi04JykpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgIH1cblxuICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgfTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gJy4uL2dpdC1sb2dnZXInO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRPcHRpb25zIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgYnl0ZUxlbmd0aCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0UGx1Z2luIH0gZnJvbSAnLi9zaW1wbGUtZ2l0LXBsdWdpbic7XG5cbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcignJywgJ3BsdWdpbjppbnB1dCcpO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5wdXRQbHVnaW4oXG4gICBpbnB1dDogU2ltcGxlR2l0T3B0aW9uc1snaW5wdXQnXVxuKTogU2ltcGxlR2l0UGx1Z2luPCdzcGF3bi5hZnRlcic+IHwgdm9pZCB7XG4gICByZXR1cm4ge1xuICAgICAgdHlwZTogJ3NwYXduLmFmdGVyJyxcbiAgICAgIGFjdGlvbihfZGF0YSwgeyBjb21tYW5kcywgaW5wdXQ6IHRhc2tJbnB1dCwgc3Bhd25lZDogeyBzdGRpbiB9IH0pIHtcbiAgICAgICAgIGlmICghc3RkaW4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgIH1cblxuICAgICAgICAgY29uc3QgY29udGVudCA9IGlucHV0Py4oWy4uLmNvbW1hbmRzXSkgPz8gdGFza0lucHV0O1xuICAgICAgICAgaWYgKCFjb250ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gbG9nZ2VyKGBnZW5lcmF0ZWQgemVybyBsZW5ndGggY29udGVudCwgbm90IHdyaXRpbmcgdG8gc3RkaW5gKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgbG9nZ2VyKGB3cml0aW5nICVzIGJ5dGVzIHRvIHN0ZGluYCwgYnl0ZUxlbmd0aChjb250ZW50KSk7XG5cbiAgICAgICAgIHN0ZGluLm9uKCdlcnJvcicsIChlcnI6IE5vZGVKUy5FcnJub0V4Y2VwdGlvbikgPT4ge1xuICAgICAgICAgICAgLy8gRVBJUEUgaXMgZXhwZWN0ZWQgd2hlbiBnaXQgZXhpdHMgYmVmb3JlIGNvbnN1bWluZyBhbGwgaW5wdXRcbiAgICAgICAgICAgIGlmIChlcnIuY29kZSAhPT0gJ0VQSVBFJykge1xuICAgICAgICAgICAgICAgbG9nZ2VyKCdbRVJST1JdIHN0ZGluIGVycm9yICVvJywgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuXG4gICAgICAgICBzdGRpbi5lbmQoY29udGVudCk7XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdub2RlOmV2ZW50cyc7XG5cbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0UGx1Z2luQ29uZmlnIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgYXBwZW5kLCBhc0FycmF5IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHR5cGUge1xuICAgU2ltcGxlR2l0UGx1Z2luLFxuICAgU2ltcGxlR2l0UGx1Z2luVHlwZSxcbiAgIFNpbXBsZUdpdFBsdWdpblR5cGVzLFxufSBmcm9tICcuL3NpbXBsZS1naXQtcGx1Z2luJztcblxuZXhwb3J0IGNsYXNzIFBsdWdpblN0b3JlIHtcbiAgIHByaXZhdGUgcGx1Z2luczogU2V0PFNpbXBsZUdpdFBsdWdpbjxTaW1wbGVHaXRQbHVnaW5UeXBlPj4gPSBuZXcgU2V0KCk7XG4gICBwcml2YXRlIGV2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgb248SyBleHRlbmRzIGtleW9mIFNpbXBsZUdpdFBsdWdpbkNvbmZpZz4oXG4gICAgICB0eXBlOiBLLFxuICAgICAgbGlzdGVuZXI6IChkYXRhOiBTaW1wbGVHaXRQbHVnaW5Db25maWdbS10pID0+IHZvaWRcbiAgICkge1xuICAgICAgdGhpcy5ldmVudHMub24odHlwZSwgbGlzdGVuZXIpO1xuICAgfVxuXG4gICByZWNvbmZpZ3VyZTxLIGV4dGVuZHMga2V5b2YgU2ltcGxlR2l0UGx1Z2luQ29uZmlnPih0eXBlOiBLLCBkYXRhOiBTaW1wbGVHaXRQbHVnaW5Db25maWdbS10pIHtcbiAgICAgIHRoaXMuZXZlbnRzLmVtaXQodHlwZSwgZGF0YSk7XG4gICB9XG5cbiAgIHB1YmxpYyBhcHBlbmQ8VCBleHRlbmRzIFNpbXBsZUdpdFBsdWdpblR5cGU+KHR5cGU6IFQsIGFjdGlvbjogU2ltcGxlR2l0UGx1Z2luPFQ+WydhY3Rpb24nXSkge1xuICAgICAgY29uc3QgcGx1Z2luID0gYXBwZW5kKHRoaXMucGx1Z2lucywgeyB0eXBlLCBhY3Rpb24gfSk7XG5cbiAgICAgIHJldHVybiAoKSA9PiB0aGlzLnBsdWdpbnMuZGVsZXRlKHBsdWdpbik7XG4gICB9XG5cbiAgIHB1YmxpYyBhZGQ8VCBleHRlbmRzIFNpbXBsZUdpdFBsdWdpblR5cGU+KFxuICAgICAgcGx1Z2luOiB2b2lkIHwgU2ltcGxlR2l0UGx1Z2luPFQ+IHwgU2ltcGxlR2l0UGx1Z2luPFQ+W11cbiAgICkge1xuICAgICAgY29uc3QgcGx1Z2luczogU2ltcGxlR2l0UGx1Z2luPFQ+W10gPSBbXTtcblxuICAgICAgYXNBcnJheShwbHVnaW4pLmZvckVhY2goXG4gICAgICAgICAocGx1Z2luKSA9PiB2b2lkIChwbHVnaW4gJiYgdGhpcy5wbHVnaW5zLmFkZChhcHBlbmQocGx1Z2lucywgcGx1Z2luKSkpXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgcGx1Z2lucy5mb3JFYWNoKChwbHVnaW4pID0+IHZvaWQgdGhpcy5wbHVnaW5zLmRlbGV0ZShwbHVnaW4pKTtcbiAgICAgIH07XG4gICB9XG5cbiAgIHB1YmxpYyBleGVjPFQgZXh0ZW5kcyBTaW1wbGVHaXRQbHVnaW5UeXBlPihcbiAgICAgIHR5cGU6IFQsXG4gICAgICBkYXRhOiBTaW1wbGVHaXRQbHVnaW5UeXBlc1tUXVsnZGF0YSddLFxuICAgICAgY29udGV4dDogU2ltcGxlR2l0UGx1Z2luVHlwZXNbVF1bJ2NvbnRleHQnXVxuICAgKTogdHlwZW9mIGRhdGEge1xuICAgICAgbGV0IG91dHB1dCA9IGRhdGE7XG4gICAgICBjb25zdCBjb250ZXh0dWFsID0gT2JqZWN0LmZyZWV6ZShPYmplY3QuY3JlYXRlKGNvbnRleHQpKTtcblxuICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICBpZiAocGx1Z2luLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgICAgIG91dHB1dCA9IHBsdWdpbi5hY3Rpb24ob3V0cHV0LCBjb250ZXh0dWFsKTtcbiAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IFNpbXBsZUdpdE9wdGlvbnMgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBhc051bWJlciwgaW5jbHVkaW5nIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRQbHVnaW4gfSBmcm9tICcuL3NpbXBsZS1naXQtcGx1Z2luJztcblxuZXhwb3J0IGZ1bmN0aW9uIHByb2dyZXNzTW9uaXRvclBsdWdpbihwcm9ncmVzczogRXhjbHVkZTxTaW1wbGVHaXRPcHRpb25zWydwcm9ncmVzcyddLCB2b2lkPikge1xuICAgY29uc3QgcHJvZ3Jlc3NDb21tYW5kID0gJy0tcHJvZ3Jlc3MnO1xuICAgY29uc3QgcHJvZ3Jlc3NNZXRob2RzID0gWydjaGVja291dCcsICdjbG9uZScsICdmZXRjaCcsICdwdWxsJywgJ3B1c2gnXTtcblxuICAgY29uc3Qgb25Qcm9ncmVzczogU2ltcGxlR2l0UGx1Z2luPCdzcGF3bi5hZnRlcic+ID0ge1xuICAgICAgdHlwZTogJ3NwYXduLmFmdGVyJyxcbiAgICAgIGFjdGlvbihfZGF0YSwgY29udGV4dCkge1xuICAgICAgICAgaWYgKCFjb250ZXh0LmNvbW1hbmRzLmluY2x1ZGVzKHByb2dyZXNzQ29tbWFuZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgIH1cblxuICAgICAgICAgY29udGV4dC5zcGF3bmVkLnN0ZGVycj8ub24oJ2RhdGEnLCAoY2h1bms6IEJ1ZmZlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IC9eKFtcXHNcXFNdKz8pOlxccyooXFxkKyklIFxcKChcXGQrKVxcLyhcXGQrKVxcKS8uZXhlYyhjaHVuay50b1N0cmluZygndXRmOCcpKTtcbiAgICAgICAgICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwcm9ncmVzcyh7XG4gICAgICAgICAgICAgICBtZXRob2Q6IGNvbnRleHQubWV0aG9kLFxuICAgICAgICAgICAgICAgc3RhZ2U6IHByb2dyZXNzRXZlbnRTdGFnZShtZXNzYWdlWzFdKSxcbiAgICAgICAgICAgICAgIHByb2dyZXNzOiBhc051bWJlcihtZXNzYWdlWzJdKSxcbiAgICAgICAgICAgICAgIHByb2Nlc3NlZDogYXNOdW1iZXIobWVzc2FnZVszXSksXG4gICAgICAgICAgICAgICB0b3RhbDogYXNOdW1iZXIobWVzc2FnZVs0XSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgIH0pO1xuICAgICAgfSxcbiAgIH07XG5cbiAgIGNvbnN0IG9uQXJnczogU2ltcGxlR2l0UGx1Z2luPCdzcGF3bi5hcmdzJz4gPSB7XG4gICAgICB0eXBlOiAnc3Bhd24uYXJncycsXG4gICAgICBhY3Rpb24oYXJncywgY29udGV4dCkge1xuICAgICAgICAgaWYgKCFwcm9ncmVzc01ldGhvZHMuaW5jbHVkZXMoY29udGV4dC5tZXRob2QpKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJncztcbiAgICAgICAgIH1cblxuICAgICAgICAgcmV0dXJuIGluY2x1ZGluZyhhcmdzLCBwcm9ncmVzc0NvbW1hbmQpO1xuICAgICAgfSxcbiAgIH07XG5cbiAgIHJldHVybiBbb25BcmdzLCBvblByb2dyZXNzXTtcbn1cblxuZnVuY3Rpb24gcHJvZ3Jlc3NFdmVudFN0YWdlKGlucHV0OiBzdHJpbmcpIHtcbiAgIHJldHVybiBTdHJpbmcoaW5wdXQudG9Mb3dlckNhc2UoKS5zcGxpdCgnICcsIDEpKSB8fCAndW5rbm93bic7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBTcGF3bk9wdGlvbnMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcblxuaW1wb3J0IHsgcGljayB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0UGx1Z2luIH0gZnJvbSAnLi9zaW1wbGUtZ2l0LXBsdWdpbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGF3bk9wdGlvbnNQbHVnaW4oXG4gICBzcGF3bk9wdGlvbnM6IFBhcnRpYWw8U3Bhd25PcHRpb25zPlxuKTogU2ltcGxlR2l0UGx1Z2luPCdzcGF3bi5vcHRpb25zJz4ge1xuICAgY29uc3Qgb3B0aW9ucyA9IHBpY2soc3Bhd25PcHRpb25zLCBbJ3VpZCcsICdnaWQnXSk7XG5cbiAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnc3Bhd24ub3B0aW9ucycsXG4gICAgICBhY3Rpb24oZGF0YSkge1xuICAgICAgICAgcmV0dXJuIHsgLi4ub3B0aW9ucywgLi4uZGF0YSB9O1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHsgaXNQYXRoU3BlYywgdG9QYXRocyB9IGZyb20gJ0BzaW1wbGUtZ2l0L2FyZ3MtcGF0aHNwZWMnO1xuXG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdFBsdWdpbiB9IGZyb20gJy4vc2ltcGxlLWdpdC1wbHVnaW4nO1xuXG5leHBvcnQgZnVuY3Rpb24gc3VmZml4UGF0aHNQbHVnaW4oKTogU2ltcGxlR2l0UGx1Z2luPCdzcGF3bi5hcmdzJz4ge1xuICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdzcGF3bi5hcmdzJyxcbiAgICAgIGFjdGlvbihkYXRhKSB7XG4gICAgICAgICBjb25zdCBwcmVmaXg6IHN0cmluZ1tdID0gW107XG4gICAgICAgICBsZXQgc3VmZml4OiB1bmRlZmluZWQgfCBzdHJpbmdbXTtcbiAgICAgICAgIGZ1bmN0aW9uIGFwcGVuZChhcmdzOiBzdHJpbmdbXSkge1xuICAgICAgICAgICAgKHN1ZmZpeCA9IHN1ZmZpeCB8fCBbXSkucHVzaCguLi5hcmdzKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJhbSA9IGRhdGFbaV07XG5cbiAgICAgICAgICAgIGlmIChpc1BhdGhTcGVjKHBhcmFtKSkge1xuICAgICAgICAgICAgICAgYXBwZW5kKHRvUGF0aHMocGFyYW0pKTtcbiAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGFyYW0gPT09ICctLScpIHtcbiAgICAgICAgICAgICAgIGFwcGVuZChcbiAgICAgICAgICAgICAgICAgIGRhdGEuc2xpY2UoaSArIDEpLmZsYXRNYXAoKGl0ZW0pID0+IChpc1BhdGhTcGVjKGl0ZW0pICYmIHRvUGF0aHMoaXRlbSkpIHx8IGl0ZW0pXG4gICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByZWZpeC5wdXNoKHBhcmFtKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgcmV0dXJuICFzdWZmaXggPyBwcmVmaXggOiBbLi4ucHJlZml4LCAnLS0nLCAuLi5zdWZmaXgubWFwKFN0cmluZyldO1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHsgR2l0UGx1Z2luRXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvZ2l0LXBsdWdpbi1lcnJvcic7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdE9wdGlvbnMgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdFBsdWdpbiB9IGZyb20gJy4vc2ltcGxlLWdpdC1wbHVnaW4nO1xuXG5leHBvcnQgZnVuY3Rpb24gdGltZW91dFBsdWdpbih7XG4gICBibG9jayxcbiAgIHN0ZEVyciA9IHRydWUsXG4gICBzdGRPdXQgPSB0cnVlLFxufTogRXhjbHVkZTxTaW1wbGVHaXRPcHRpb25zWyd0aW1lb3V0J10sIHVuZGVmaW5lZD4pOiBTaW1wbGVHaXRQbHVnaW48J3NwYXduLmFmdGVyJz4gfCB2b2lkIHtcbiAgIGlmIChibG9jayA+IDApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICB0eXBlOiAnc3Bhd24uYWZ0ZXInLFxuICAgICAgICAgYWN0aW9uKF9kYXRhLCBjb250ZXh0KSB7XG4gICAgICAgICAgICBsZXQgdGltZW91dDogTm9kZUpTLlRpbWVvdXQ7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHdhaXQoKSB7XG4gICAgICAgICAgICAgICB0aW1lb3V0ICYmIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGtpbGwsIGJsb2NrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgICAgICAgIGNvbnRleHQuc3Bhd25lZC5zdGRvdXQ/Lm9mZignZGF0YScsIHdhaXQpO1xuICAgICAgICAgICAgICAgY29udGV4dC5zcGF3bmVkLnN0ZGVycj8ub2ZmKCdkYXRhJywgd2FpdCk7XG4gICAgICAgICAgICAgICBjb250ZXh0LnNwYXduZWQub2ZmKCdleGl0Jywgc3RvcCk7XG4gICAgICAgICAgICAgICBjb250ZXh0LnNwYXduZWQub2ZmKCdjbG9zZScsIHN0b3ApO1xuICAgICAgICAgICAgICAgdGltZW91dCAmJiBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGtpbGwoKSB7XG4gICAgICAgICAgICAgICBzdG9wKCk7XG4gICAgICAgICAgICAgICBjb250ZXh0LmtpbGwobmV3IEdpdFBsdWdpbkVycm9yKHVuZGVmaW5lZCwgJ3RpbWVvdXQnLCBgYmxvY2sgdGltZW91dCByZWFjaGVkYCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdGRPdXQgJiYgY29udGV4dC5zcGF3bmVkLnN0ZG91dD8ub24oJ2RhdGEnLCB3YWl0KTtcbiAgICAgICAgICAgIHN0ZEVyciAmJiBjb250ZXh0LnNwYXduZWQuc3RkZXJyPy5vbignZGF0YScsIHdhaXQpO1xuICAgICAgICAgICAgY29udGV4dC5zcGF3bmVkLm9uKCdleGl0Jywgc3RvcCk7XG4gICAgICAgICAgICBjb250ZXh0LnNwYXduZWQub24oJ2Nsb3NlJywgc3RvcCk7XG5cbiAgICAgICAgICAgIHdhaXQoKTtcbiAgICAgICAgIH0sXG4gICAgICB9O1xuICAgfVxufVxuIiwgIi8vIEB0cy1leHBlY3QtZXJyb3JcbmltcG9ydCBHaXQgZnJvbSAnLi4vZ2l0JztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0RmFjdG9yeSB9IGZyb20gJy4uL3R5cGluZ3MnO1xuaW1wb3J0ICogYXMgYXBpIGZyb20gJy4vYXBpJztcbmltcG9ydCB7XG4gICBhYm9ydFBsdWdpbixcbiAgIGFsbG93RW52aXJvbm1lbnRQbHVnaW4sXG4gICBibG9ja1Vuc2FmZU9wZXJhdGlvbnNQbHVnaW4sXG4gICBjb21tYW5kQ29uZmlnUHJlZml4aW5nUGx1Z2luLFxuICAgY29tcGxldGlvbkRldGVjdGlvblBsdWdpbixcbiAgIGN1c3RvbUJpbmFyeVBsdWdpbixcbiAgIGVycm9yRGV0ZWN0aW9uSGFuZGxlcixcbiAgIGVycm9yRGV0ZWN0aW9uUGx1Z2luLFxuICAgaW5wdXRQbHVnaW4sXG4gICBQbHVnaW5TdG9yZSxcbiAgIHByb2dyZXNzTW9uaXRvclBsdWdpbixcbiAgIHNwYXduT3B0aW9uc1BsdWdpbixcbiAgIHN1ZmZpeFBhdGhzUGx1Z2luLFxuICAgdGltZW91dFBsdWdpbixcbn0gZnJvbSAnLi9wbHVnaW5zJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0T3B0aW9ucyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgY3JlYXRlSW5zdGFuY2VDb25maWcsIGZvbGRlckV4aXN0cyB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgY29uc3Qgc2ltcGxlR2l0OiBTaW1wbGVHaXRGYWN0b3J5ID0gKFxuICAgYmFzZURpcj86IHN0cmluZyB8IFBhcnRpYWw8U2ltcGxlR2l0T3B0aW9ucz4sXG4gICBvcHRpb25zPzogUGFydGlhbDxTaW1wbGVHaXRPcHRpb25zPlxuKSA9PiB7XG4gICBjb25zdCBwbHVnaW5zID0gbmV3IFBsdWdpblN0b3JlKCk7XG4gICBjb25zdCBjb25maWcgPSBjcmVhdGVJbnN0YW5jZUNvbmZpZyhcbiAgICAgIChiYXNlRGlyICYmICh0eXBlb2YgYmFzZURpciA9PT0gJ3N0cmluZycgPyB7IGJhc2VEaXIgfSA6IGJhc2VEaXIpKSB8fCB7fSxcbiAgICAgIG9wdGlvbnNcbiAgICk7XG5cbiAgIGlmICghZm9sZGVyRXhpc3RzKGNvbmZpZy5iYXNlRGlyKSkge1xuICAgICAgdGhyb3cgbmV3IGFwaS5HaXRDb25zdHJ1Y3RFcnJvcihcbiAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgIGBDYW5ub3QgdXNlIHNpbXBsZS1naXQgb24gYSBkaXJlY3RvcnkgdGhhdCBkb2VzIG5vdCBleGlzdGBcbiAgICAgICk7XG4gICB9XG5cbiAgIGlmIChBcnJheS5pc0FycmF5KGNvbmZpZy5jb25maWcpKSB7XG4gICAgICBwbHVnaW5zLmFkZChjb21tYW5kQ29uZmlnUHJlZml4aW5nUGx1Z2luKGNvbmZpZy5jb25maWcpKTtcbiAgIH1cblxuICAgcGx1Z2lucy5hZGQoYmxvY2tVbnNhZmVPcGVyYXRpb25zUGx1Z2luKGNvbmZpZy51bnNhZmUpKTtcbiAgIHBsdWdpbnMuYWRkKGNvbXBsZXRpb25EZXRlY3Rpb25QbHVnaW4oY29uZmlnLmNvbXBsZXRpb24pKTtcbiAgIGNvbmZpZy5hYm9ydCAmJiBwbHVnaW5zLmFkZChhYm9ydFBsdWdpbihjb25maWcuYWJvcnQpKTtcbiAgIGNvbmZpZy5wcm9ncmVzcyAmJiBwbHVnaW5zLmFkZChwcm9ncmVzc01vbml0b3JQbHVnaW4oY29uZmlnLnByb2dyZXNzKSk7XG4gICBjb25maWcudGltZW91dCAmJiBwbHVnaW5zLmFkZCh0aW1lb3V0UGx1Z2luKGNvbmZpZy50aW1lb3V0KSk7XG4gICBjb25maWcuc3Bhd25PcHRpb25zICYmIHBsdWdpbnMuYWRkKHNwYXduT3B0aW9uc1BsdWdpbihjb25maWcuc3Bhd25PcHRpb25zKSk7XG4gICBwbHVnaW5zLmFkZChzdWZmaXhQYXRoc1BsdWdpbigpKTtcblxuICAgcGx1Z2lucy5hZGQoaW5wdXRQbHVnaW4oY29uZmlnLmlucHV0KSk7XG4gICBwbHVnaW5zLmFkZChlcnJvckRldGVjdGlvblBsdWdpbihlcnJvckRldGVjdGlvbkhhbmRsZXIodHJ1ZSkpKTtcbiAgIGNvbmZpZy5lcnJvcnMgJiYgcGx1Z2lucy5hZGQoZXJyb3JEZXRlY3Rpb25QbHVnaW4oY29uZmlnLmVycm9ycykpO1xuXG4gICBjdXN0b21CaW5hcnlQbHVnaW4ocGx1Z2lucywgY29uZmlnLmJpbmFyeSwgY29uZmlnLnVuc2FmZT8uYWxsb3dVbnNhZmVDdXN0b21CaW5hcnkpO1xuXG4gICBwbHVnaW5zLmFkZChcbiAgICAgIGFsbG93RW52aXJvbm1lbnRQbHVnaW4oY29uZmlnLmFsbG93RW52aXJvbm1lbnQgPz8gW10sIGNvbmZpZy51bnNhZmU/LmFsbG93QWJicmV2aWF0ZWRPcHRpb25zKVxuICAgKTtcblxuICAgcmV0dXJuIG5ldyBHaXQoY29uZmlnLCBwbHVnaW5zKTtcbn07XG4iLCAiaW1wb3J0IHsgQXBwLCBNb2RhbCwgTm90aWNlLCBURmlsZSB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHR5cGUgTXlTaW1wbGVQbHVnaW4gZnJvbSBcIi4uL21haW5cIjtcblxuZXhwb3J0IGludGVyZmFjZSBSZW1vdGVBcnRpY2xlIHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHJlbGF0aXZlUGF0aDogc3RyaW5nO1xuICAgIGFic29sdXRlUGF0aDogc3RyaW5nO1xuICAgIGNvbnRlbnQ6IHN0cmluZztcbiAgICBzaXplOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBTeW5jQ29uZmxpY3RNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgICBhcnRpY2xlOiBSZW1vdGVBcnRpY2xlO1xuICAgIGxvY2FsRmlsZTogVEZpbGU7XG4gICAgcGx1Z2luOiBNeVNpbXBsZVBsdWdpbjtcbiAgICBvblJlc3VsdDogKHJlc3VsdDogXCJvdmVyd3JpdGVcIiB8IFwiY29weVwiIHwgXCJjYW5jZWxcIikgPT4gdm9pZDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBhcHA6IEFwcCxcbiAgICAgICAgcGx1Z2luOiBNeVNpbXBsZVBsdWdpbixcbiAgICAgICAgYXJ0aWNsZTogUmVtb3RlQXJ0aWNsZSxcbiAgICAgICAgbG9jYWxGaWxlOiBURmlsZSxcbiAgICAgICAgb25SZXN1bHQ6IChyZXN1bHQ6IFwib3ZlcndyaXRlXCIgfCBcImNvcHlcIiB8IFwiY2FuY2VsXCIpID0+IHZvaWRcbiAgICApIHtcbiAgICAgICAgc3VwZXIoYXBwKTtcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgICAgIHRoaXMuYXJ0aWNsZSA9IGFydGljbGU7XG4gICAgICAgIHRoaXMubG9jYWxGaWxlID0gbG9jYWxGaWxlO1xuICAgICAgICB0aGlzLm9uUmVzdWx0ID0gb25SZXN1bHQ7XG4gICAgfVxuXG4gICAgb25PcGVuKCkge1xuICAgICAgICBjb25zdCB7IGNvbnRlbnRFbCB9ID0gdGhpcztcbiAgICAgICAgY29udGVudEVsLmVtcHR5KCk7XG4gICAgICAgIGNvbnRlbnRFbC5hZGRDbGFzcyhcImdpdC1zeW5jLWNvbmZsaWN0LW1vZGFsXCIpO1xuXG4gICAgICAgIGNvbnRlbnRFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogXCJcdTUzRDFcdTczQjBcdTU0MENcdTU0MERcdTY1ODdcdTdBRTBcIiB9KTtcblxuICAgICAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJwXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IGBHaXQgXHU0RUQzXHU1RTkzXHU0RTJEXHU3Njg0XHUzMDBBJHt0aGlzLmFydGljbGUudGl0bGV9XHUzMDBCXHU0RTBFXHU2NzJDXHU1NzMwXHU2NTg3XHU3QUUwXHU1NDBDXHU1NDBEXHUzMDAyXHU4QkY3XHU5MDA5XHU2MkU5XHU1NDBDXHU2QjY1XHU2NUI5XHU1RjBGXHUzMDAyYCxcbiAgICAgICAgICAgIGNsczogXCJnaXQtc3luYy1jb25mbGljdC1kZXNjcmlwdGlvblwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBpbmZvID0gY29udGVudEVsLmNyZWF0ZURpdih7IGNsczogXCJnaXQtc3luYy1jb25mbGljdC1pbmZvXCIgfSk7XG4gICAgICAgIGluZm8uY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgICAgICAgdGV4dDogYFx1NjcyQ1x1NTczMFx1NjU4N1x1NEVGNlx1RkYxQSR7dGhpcy5sb2NhbEZpbGUucGF0aH1gLFxuICAgICAgICB9KTtcbiAgICAgICAgaW5mby5jcmVhdGVFbChcImRpdlwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBgR2l0IFx1NjU4N1x1NEVGNlx1RkYxQSR7dGhpcy5hcnRpY2xlLnJlbGF0aXZlUGF0aH1gLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBvcHRpb25zID0gY29udGVudEVsLmNyZWF0ZURpdih7IGNsczogXCJnaXQtc3luYy1jb25mbGljdC1vcHRpb25zXCIgfSk7XG5cbiAgICAgICAgY29uc3Qgb3ZlcndyaXRlID0gb3B0aW9ucy5jcmVhdGVFbChcImJ1dHRvblwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1ODk4Nlx1NzZENlx1NjcyQ1x1NTczMFx1NjU4N1x1N0FFMFwiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC1zeW5jLWNvbmZsaWN0LW92ZXJ3cml0ZVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgb3ZlcndyaXRlLmNyZWF0ZURpdih7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NEY3Rlx1NzUyOCBHaXQgXHU0RUQzXHU1RTkzXHU0RTJEXHU3Njg0XHU1MTg1XHU1QkI5XHU2NkZGXHU2MzYyXHU1RjUzXHU1MjREXHU2NzJDXHU1NzMwXHU2NTg3XHU3QUUwXHUzMDAyXCIsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LXN5bmMtY29uZmxpY3Qtb3B0aW9uLWRlc2NcIixcbiAgICAgICAgfSk7XG4gICAgICAgIG92ZXJ3cml0ZS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vblJlc3VsdChcIm92ZXJ3cml0ZVwiKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjb3B5ID0gb3B0aW9ucy5jcmVhdGVFbChcImJ1dHRvblwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NTNFNlx1NUI1OFx1NEUzQVx1NTI2Rlx1NEVGNlwiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC1zeW5jLWNvbmZsaWN0LWNvcHlcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGNvcHkuY3JlYXRlRGl2KHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU0RkREXHU3NTU5XHU2NzJDXHU1NzMwXHU2NTg3XHU3QUUwXHVGRjBDXHU1RTc2XHU1QzA2IEdpdCBcdTY1ODdcdTdBRTBcdTUzRTZcdTVCNThcdTRFM0FcdTIwMUNcdTUyNkZcdTRFRjZcdTIwMURcdTMwMDJcIixcbiAgICAgICAgICAgIGNsczogXCJnaXQtc3luYy1jb25mbGljdC1vcHRpb24tZGVzY1wiLFxuICAgICAgICB9KTtcbiAgICAgICAgY29weS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vblJlc3VsdChcImNvcHlcIik7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgY2FuY2VsID0gY29udGVudEVsLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU1M0Q2XHU2RDg4XCIsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LXN5bmMtY29uZmxpY3QtY2FuY2VsXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBjYW5jZWwub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25SZXN1bHQoXCJjYW5jZWxcIik7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgb25DbG9zZSgpIHtcbiAgICAgICAgLy8gXHU1OTgyXHU2NzlDXHU3NTI4XHU2MjM3XHU3NkY0XHU2M0E1XHU2MzA5IEVzYyBcdTUxNzNcdTk1RURcdUZGMENcdTRFNUZcdTg5QzZcdTRFM0FcdTUzRDZcdTZEODhcdTMwMDJcbiAgICAgICAgdGhpcy5vblJlc3VsdChcImNhbmNlbFwiKTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25maXJtU3luY0NvbmZsaWN0KFxuICAgIHBsdWdpbjogTXlTaW1wbGVQbHVnaW4sXG4gICAgYXJ0aWNsZTogUmVtb3RlQXJ0aWNsZSxcbiAgICBsb2NhbEZpbGU6IFRGaWxlXG4pOiBQcm9taXNlPFwib3ZlcndyaXRlXCIgfCBcImNvcHlcIiB8IFwiY2FuY2VsXCI+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgbGV0IHJlc29sdmVkID0gZmFsc2U7XG5cbiAgICAgICAgY29uc3QgZmluaXNoID0gKHJlc3VsdDogXCJvdmVyd3JpdGVcIiB8IFwiY29weVwiIHwgXCJjYW5jZWxcIikgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc29sdmVkKSByZXR1cm47XG4gICAgICAgICAgICByZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgbW9kYWwgPSBuZXcgU3luY0NvbmZsaWN0TW9kYWwoXG4gICAgICAgICAgICBwbHVnaW4uYXBwLFxuICAgICAgICAgICAgcGx1Z2luLFxuICAgICAgICAgICAgYXJ0aWNsZSxcbiAgICAgICAgICAgIGxvY2FsRmlsZSxcbiAgICAgICAgICAgIGZpbmlzaFxuICAgICAgICApO1xuXG4gICAgICAgIG1vZGFsLm9wZW4oKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN5bmNBcnRpY2xlKFxuICAgIHBsdWdpbjogTXlTaW1wbGVQbHVnaW4sXG4gICAgYXJ0aWNsZTogUmVtb3RlQXJ0aWNsZSxcbiAgICBsb2NhbEZpbGU6IFRGaWxlXG4pIHtcbiAgICBhd2FpdCBwbHVnaW4uYXBwLnZhdWx0Lm1vZGlmeShsb2NhbEZpbGUsIGFydGljbGUuY29udGVudCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzeW5jQXJ0aWNsZUFzQ29weShcbiAgICBwbHVnaW46IE15U2ltcGxlUGx1Z2luLFxuICAgIGFydGljbGU6IFJlbW90ZUFydGljbGUsXG4gICAgbG9jYWxGaWxlOiBURmlsZVxuKTogUHJvbWlzZTxURmlsZT4ge1xuICAgIGNvbnN0IHBhcmVudFBhdGggPSBsb2NhbEZpbGUucGFyZW50Py5wYXRoID8/IFwiXCI7XG4gICAgY29uc3QgZXh0ZW5zaW9uID0gXCIubWRcIjtcbiAgICBjb25zdCBiYXNlVGl0bGUgPSBhcnRpY2xlLnRpdGxlO1xuXG4gICAgbGV0IGNvcHlOYW1lID0gYCR7YmFzZVRpdGxlfVx1RkYwOFx1NTI2Rlx1NEVGNlx1RkYwOSR7ZXh0ZW5zaW9ufWA7XG4gICAgbGV0IGNvcHlQYXRoID0gcGFyZW50UGF0aCAmJiBwYXJlbnRQYXRoICE9PSBcIi9cIlxuICAgICAgICA/IGAke3BhcmVudFBhdGh9LyR7Y29weU5hbWV9YFxuICAgICAgICA6IGNvcHlOYW1lO1xuXG4gICAgbGV0IGluZGV4ID0gMjtcbiAgICB3aGlsZSAocGx1Z2luLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoY29weVBhdGgpKSB7XG4gICAgICAgIGNvcHlOYW1lID0gYCR7YmFzZVRpdGxlfVx1RkYwOFx1NTI2Rlx1NEVGNiAke2luZGV4fVx1RkYwOSR7ZXh0ZW5zaW9ufWA7XG4gICAgICAgIGNvcHlQYXRoID0gcGFyZW50UGF0aCAmJiBwYXJlbnRQYXRoICE9PSBcIi9cIlxuICAgICAgICAgICAgPyBgJHtwYXJlbnRQYXRofS8ke2NvcHlOYW1lfWBcbiAgICAgICAgICAgIDogY29weU5hbWU7XG4gICAgICAgIGluZGV4Kys7XG4gICAgfVxuXG4gICAgYXdhaXQgcGx1Z2luLmFwcC52YXVsdC5jcmVhdGUoY29weVBhdGgsIGFydGljbGUuY29udGVudCk7XG5cbiAgICBjb25zdCBjb3B5RmlsZSA9IHBsdWdpbi5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGNvcHlQYXRoKTtcbiAgICBpZiAoIShjb3B5RmlsZSBpbnN0YW5jZW9mIFRGaWxlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdTUyNkZcdTRFRjZcdTVERjJcdTUxOTlcdTUxNjVcdUZGMENcdTRGNDYgT2JzaWRpYW4gXHU2NzJBXHU4MEZEXHU4QkM2XHU1MjJCXHU2NUIwXHU2NTg3XHU0RUY2XCIpO1xuICAgIH1cblxuICAgIHJldHVybiBjb3B5RmlsZTtcbn0iLCAiaW1wb3J0IHsgRmlsZVN5c3RlbUFkYXB0ZXIsIFRGaWxlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB0eXBlIE15U2ltcGxlUGx1Z2luIGZyb20gXCIuLi9tYWluXCI7XG5pbXBvcnQgdHlwZSB7IFJlbW90ZUFydGljbGUgfSBmcm9tIFwiLi9zeW5jXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkb3dubG9hZEFydGljbGUoXG4gICAgcGx1Z2luOiBNeVNpbXBsZVBsdWdpbixcbiAgICBhcnRpY2xlOiBSZW1vdGVBcnRpY2xlXG4pOiBQcm9taXNlPFRGaWxlPiB7XG4gICAgY29uc3QgYWRhcHRlciA9IHBsdWdpbi5hcHAudmF1bHQuYWRhcHRlcjtcblxuICAgIGlmICghKGFkYXB0ZXIgaW5zdGFuY2VvZiBGaWxlU3lzdGVtQWRhcHRlcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHU1RjUzXHU1MjREIFZhdWx0IFx1NEUwRFx1NjYyRlx1NjcyQ1x1NTczMFx1NjU4N1x1NEVGNlx1N0NGQlx1N0VERlx1RkYwQ1x1NjVFMFx1NkNENVx1NEUwQlx1OEY3RFx1NjU4N1x1N0FFMFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXRGb2xkZXIgPSBwbHVnaW4uc2V0dGluZ3MudGFyZ2V0Rm9sZGVyIHx8IFwiR2l0XHU2NTg3XHU3QUUwXCI7XG4gICAgY29uc3QgcmVsYXRpdmVUYXJnZXQgPSBwYXRoXG4gICAgICAgIC5qb2luKHRhcmdldEZvbGRlciwgYXJ0aWNsZS5yZWxhdGl2ZVBhdGgpXG4gICAgICAgIC5zcGxpdChwYXRoLnNlcClcbiAgICAgICAgLmpvaW4oXCIvXCIpO1xuXG4gICAgY29uc3QgYWJzb2x1dGVUYXJnZXQgPSBwYXRoLmpvaW4oXG4gICAgICAgIGFkYXB0ZXIuZ2V0QmFzZVBhdGgoKSxcbiAgICAgICAgcmVsYXRpdmVUYXJnZXRcbiAgICApO1xuXG4gICAgZnMubWtkaXJTeW5jKHBhdGguZGlybmFtZShhYnNvbHV0ZVRhcmdldCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuXG4gICAgYXdhaXQgYWRhcHRlci53cml0ZShyZWxhdGl2ZVRhcmdldCwgYXJ0aWNsZS5jb250ZW50KTtcblxuICAgIGNvbnN0IGZpbGUgPSBwbHVnaW4uYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChyZWxhdGl2ZVRhcmdldCk7XG4gICAgaWYgKCEoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdTY1ODdcdTdBRTBcdTVERjJcdTUxOTlcdTUxNjVcdUZGMENcdTRGNDYgT2JzaWRpYW4gXHU2NzJBXHU4MEZEXHU4QkM2XHU1MjJCXHU2NUIwXHU2NTg3XHU0RUY2XCIpO1xuICAgIH1cblxuICAgIHJldHVybiBmaWxlO1xufSIsICJpbXBvcnQgeyBBcHAsIEZpbGVTeXN0ZW1BZGFwdGVyLCBNb2RhbCwgTm90aWNlLCBURmlsZSB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgc2ltcGxlR2l0IH0gZnJvbSBcInNpbXBsZS1naXRcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0ICogYXMgb3MgZnJvbSBcIm9zXCI7XG5pbXBvcnQgdHlwZSBNeVNpbXBsZVBsdWdpbiBmcm9tIFwiLi4vbWFpblwiO1xuaW1wb3J0IHsgcmVmcmVzaEFydGljbGVzVmlldyB9IGZyb20gXCIuL3JlZnJlc2hcIjtcblxuZXhwb3J0IGNsYXNzIFVwbG9hZEFydGljbGVNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgICBwbHVnaW46IE15U2ltcGxlUGx1Z2luO1xuICAgIGZpbGU6IFRGaWxlO1xuICAgIGZvbGRlcnM6IHN0cmluZ1tdID0gW107XG4gICAgc2VsZWN0ZWRGb2xkZXIgPSBcIlwiO1xuICAgIGZvbGRlcklucHV0ITogSFRNTElucHV0RWxlbWVudDtcbiAgICBzZWxlY3RFbCE6IEhUTUxTZWxlY3RFbGVtZW50O1xuICAgIHVwbG9hZEJ1dHRvbiE6IEhUTUxCdXR0b25FbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogTXlTaW1wbGVQbHVnaW4sIGZpbGU6IFRGaWxlKSB7XG4gICAgICAgIHN1cGVyKGFwcCk7XG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICAgICAgICB0aGlzLmZpbGUgPSBmaWxlO1xuICAgIH1cblxuICAgIGFzeW5jIG9uT3BlbigpIHtcbiAgICAgICAgY29uc3QgeyBjb250ZW50RWwgfSA9IHRoaXM7XG4gICAgICAgIGNvbnRlbnRFbC5lbXB0eSgpO1xuICAgICAgICBjb250ZW50RWwuYWRkQ2xhc3MoXCJnaXQtdXBsb2FkLW1vZGFsXCIpO1xuXG4gICAgICAgIGNvbnRlbnRFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogYFx1NEUwQVx1NEYyMFx1RkYxQSR7dGhpcy5maWxlLmJhc2VuYW1lfWAgfSk7XG4gICAgICAgIGNvbnRlbnRFbC5jcmVhdGVFbChcInBcIiwge1xuICAgICAgICAgICAgdGV4dDogXCJcdTkwMDlcdTYyRTkgR2l0IFx1NEVEM1x1NUU5M1x1NEUyRFx1NzY4NFx1NzZFRVx1NjgwN1x1NjU4N1x1NEVGNlx1NTkzOVx1MzAwMlx1NjU4N1x1NEVGNlx1NTkzOVx1NEUwRFx1NUI1OFx1NTcyOFx1NjVGNlx1NEYxQVx1ODFFQVx1NTJBOFx1NTIxQlx1NUVGQVx1MzAwMlwiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC11cGxvYWQtZGVzY3JpcHRpb25cIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgbG9hZGluZyA9IGNvbnRlbnRFbC5jcmVhdGVEaXYoe1xuICAgICAgICAgICAgdGV4dDogXCJcdTZCNjNcdTU3MjhcdThCRkJcdTUzRDYgR2l0IFx1NEVEM1x1NUU5M1x1NjU4N1x1NEVGNlx1NTkzOVx1MjAyNlwiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC11cGxvYWQtbG9hZGluZ1wiLFxuICAgICAgICB9KTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5mb2xkZXJzID0gYXdhaXQgdGhpcy5wbHVnaW4uZ2V0UmVtb3RlRm9sZGVycygpO1xuICAgICAgICAgICAgbG9hZGluZy5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyRm9ybSgpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgbG9hZGluZy5yZW1vdmUoKTtcbiAgICAgICAgICAgIGNvbnRlbnRFbC5jcmVhdGVEaXYoe1xuICAgICAgICAgICAgICAgIHRleHQ6IGBcdThCRkJcdTUzRDZcdTRFRDNcdTVFOTNcdTU5MzFcdThEMjVcdUZGMUEke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKX1gLFxuICAgICAgICAgICAgICAgIGNsczogXCJnaXQtdXBsb2FkLWVycm9yXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckZvcm0oKSB7XG4gICAgICAgIGNvbnN0IHsgY29udGVudEVsIH0gPSB0aGlzO1xuXG4gICAgICAgIGNvbnN0IGZpZWxkID0gY29udGVudEVsLmNyZWF0ZURpdih7IGNsczogXCJnaXQtdXBsb2FkLWZpZWxkXCIgfSk7XG4gICAgICAgIGZpZWxkLmNyZWF0ZUVsKFwibGFiZWxcIiwge1xuICAgICAgICAgICAgdGV4dDogXCJcdTVERjJcdTY3MDlcdTY1ODdcdTRFRjZcdTU5MzlcIixcbiAgICAgICAgICAgIGNsczogXCJnaXQtdXBsb2FkLWxhYmVsXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0RWwgPSBmaWVsZC5jcmVhdGVFbChcInNlbGVjdFwiLCB7XG4gICAgICAgICAgICBjbHM6IFwiZ2l0LXVwbG9hZC1zZWxlY3RcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RFbC5jcmVhdGVFbChcIm9wdGlvblwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NEVEM1x1NUU5M1x1NjgzOVx1NzZFRVx1NUY1NVwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAoY29uc3QgZm9sZGVyIG9mIHRoaXMuZm9sZGVycykge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RFbC5jcmVhdGVFbChcIm9wdGlvblwiLCB7XG4gICAgICAgICAgICAgICAgdGV4dDogZm9sZGVyIHx8IFwiXHU0RUQzXHU1RTkzXHU2ODM5XHU3NkVFXHU1RjU1XCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZvbGRlcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3RFbC5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRGb2xkZXIgPSB0aGlzLnNlbGVjdEVsLnZhbHVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0RWwudmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvbGRlcklucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBuZXdGaWVsZCA9IGNvbnRlbnRFbC5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LXVwbG9hZC1maWVsZFwiIH0pO1xuICAgICAgICBuZXdGaWVsZC5jcmVhdGVFbChcImxhYmVsXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU2MjE2XHU1MjFCXHU1RUZBXHU2NUIwXHU2NTg3XHU0RUY2XHU1OTM5XCIsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LXVwbG9hZC1sYWJlbFwiLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZvbGRlcklucHV0ID0gbmV3RmllbGQuY3JlYXRlRWwoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlx1NEY4Qlx1NTk4Mlx1RkYxQUFJL1x1NkEyMVx1NTc4Qlx1N0IxNFx1OEJCMFwiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC11cGxvYWQtaW5wdXRcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmV3RmllbGQuY3JlYXRlRGl2KHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU2NTJGXHU2MzAxXHU1OTFBXHU3RUE3XHU3NkVFXHU1RjU1XHVGRjBDXHU0RjhCXHU1OTgyXHVGRjFBXHU2MjgwXHU2NzJGL0FJL09sbGFtYVwiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC11cGxvYWQtaGludFwiLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZvbGRlcklucHV0Lm9uaW5wdXQgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5mb2xkZXJJbnB1dC52YWx1ZS50cmltKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEVsLnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRm9sZGVyID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBmb290ZXIgPSBjb250ZW50RWwuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC11cGxvYWQtZm9vdGVyXCIgfSk7XG5cbiAgICAgICAgY29uc3QgY2FuY2VsID0gZm9vdGVyLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU1M0Q2XHU2RDg4XCIsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LXVwbG9hZC1jYW5jZWxcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGNhbmNlbC5vbmNsaWNrID0gKCkgPT4gdGhpcy5jbG9zZSgpO1xuXG4gICAgICAgIHRoaXMudXBsb2FkQnV0dG9uID0gZm9vdGVyLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU0RTBBXHU0RjIwXHU1MjMwIEdpdFwiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC11cGxvYWQtc3VibWl0XCIsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnVwbG9hZEJ1dHRvbi5vbmNsaWNrID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VzdG9tRm9sZGVyID0gdGhpcy5mb2xkZXJJbnB1dC52YWx1ZS50cmltKCk7XG4gICAgICAgICAgICBjb25zdCBmb2xkZXIgPSBjdXN0b21Gb2xkZXIgfHwgdGhpcy5zZWxlY3RFbC52YWx1ZTtcblxuICAgICAgICAgICAgdGhpcy51cGxvYWRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy51cGxvYWRCdXR0b24udGV4dENvbnRlbnQgPSBcIlx1NEUwQVx1NEYyMFx1NEUyRFx1MjAyNlwiO1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHVwbG9hZExvY2FsQXJ0aWNsZSh0aGlzLnBsdWdpbiwgdGhpcy5maWxlLCBmb2xkZXIpO1xuICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoXG4gICAgICAgICAgICAgICAgICAgIGBcdTMwMEEke3RoaXMuZmlsZS5iYXNlbmFtZX1cdTMwMEJcdTVERjJcdTRFMEFcdTRGMjBcdTUyMzAgJHtmb2xkZXIgfHwgXCJcdTRFRDNcdTVFOTNcdTY4MzlcdTc2RUVcdTVGNTVcIn1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBhd2FpdCByZWZyZXNoQXJ0aWNsZXNWaWV3KHRoaXMucGx1Z2luLCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoXG4gICAgICAgICAgICAgICAgICAgIGBcdTRFMEFcdTRGMjBcdTU5MzFcdThEMjVcdUZGMUEke1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgIH1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGxvYWRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiXHU0RTBBXHU0RjIwXHU1MjMwIEdpdFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwbG9hZExvY2FsQXJ0aWNsZShcbiAgICBwbHVnaW46IE15U2ltcGxlUGx1Z2luLFxuICAgIGZpbGU6IFRGaWxlLFxuICAgIGZvbGRlcjogc3RyaW5nXG4pIHtcbiAgICBjb25zdCBhZGFwdGVyID0gcGx1Z2luLmFwcC52YXVsdC5hZGFwdGVyO1xuXG4gICAgaWYgKCEoYWRhcHRlciBpbnN0YW5jZW9mIEZpbGVTeXN0ZW1BZGFwdGVyKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdTVGNTNcdTUyNEQgVmF1bHQgXHU0RTBEXHU2NjJGXHU2NzJDXHU1NzMwXHU2NTg3XHU0RUY2XHU3Q0ZCXHU3RURGXHVGRjBDXHU2NUUwXHU2Q0Q1XHU0RTBBXHU0RjIwXHU2NTg3XHU3QUUwXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHRlbXBEaXIgPSBhd2FpdCBwbHVnaW4uY2xvbmVUb1RlbXAoKTtcblxuICAgIHRyeSB7XG4gICAgICAgIGxldCBjbGVhbkZvbGRlciA9IGZvbGRlclxuICAgICAgICAgICAgLnRyaW0oKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFwvZywgXCIvXCIpXG4gICAgICAgICAgICAucmVwbGFjZSgvXlxcLyt8XFwvKyQvZywgXCJcIik7XG5cbiAgICAgICAgLy8gXHU5NjMyXHU2QjYyXHU5MDFBXHU4RkM3XHU2NTg3XHU0RUY2XHU1OTM5XHU4RjkzXHU1MTY1XHU4REYzXHU1MUZBIEdpdCBcdTRFMzRcdTY1RjZcdTRFRDNcdTVFOTNcdTMwMDJcbiAgICAgICAgY29uc3QgZm9sZGVyUGFydHMgPSBjbGVhbkZvbGRlclxuICAgICAgICAgICAgPyBjbGVhbkZvbGRlclxuICAgICAgICAgICAgICAgICAgLnNwbGl0KFwiL1wiKVxuICAgICAgICAgICAgICAgICAgLmZpbHRlcigocGFydCkgPT4gcGFydCAmJiBwYXJ0ICE9PSBcIi5cIiAmJiBwYXJ0ICE9PSBcIi4uXCIpXG4gICAgICAgICAgICA6IFtdO1xuXG4gICAgICAgIGNsZWFuRm9sZGVyID0gZm9sZGVyUGFydHMuam9pbihcIi9cIik7XG5cbiAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHBsdWdpbi5hcHAudmF1bHQucmVhZChmaWxlKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0UmVsYXRpdmUgPSBjbGVhbkZvbGRlclxuICAgICAgICAgICAgPyBgJHtjbGVhbkZvbGRlcn0vJHtmaWxlLmJhc2VuYW1lfS5tZGBcbiAgICAgICAgICAgIDogYCR7ZmlsZS5iYXNlbmFtZX0ubWRgO1xuXG4gICAgICAgIGNvbnN0IHRhcmdldEFic29sdXRlID0gcGF0aC5yZXNvbHZlKHRlbXBEaXIsIHRhcmdldFJlbGF0aXZlKTtcblxuICAgICAgICAvLyBcdTc4NkVcdTRGRERcdTc2RUVcdTY4MDdcdThERUZcdTVGODRcdTRFQ0RcdTcxMzZcdTRGNERcdTRFOEVcdTRFMzRcdTY1RjZcdTRFRDNcdTVFOTNcdTUxODVcdTkwRThcdTMwMDJcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFRlbXAgPSBwYXRoLnJlc29sdmUodGVtcERpcikgKyBwYXRoLnNlcDtcbiAgICAgICAgaWYgKCF0YXJnZXRBYnNvbHV0ZS5zdGFydHNXaXRoKG5vcm1hbGl6ZWRUZW1wKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHU2NUUwXHU2NTQ4XHU3Njg0IEdpdCBcdTY1ODdcdTRFRjZcdTU5MzlcdThERUZcdTVGODRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBmcy5ta2RpclN5bmMocGF0aC5kaXJuYW1lKHRhcmdldEFic29sdXRlKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG5cbiAgICAgICAgY29uc3QgZXhpc3RzID0gZnMuZXhpc3RzU3luYyh0YXJnZXRBYnNvbHV0ZSk7XG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmModGFyZ2V0QWJzb2x1dGUsIGNvbnRlbnQsIFwidXRmOFwiKTtcblxuICAgICAgICBjb25zdCBnaXQgPSBzaW1wbGVHaXQoe1xuICAgICAgICAgICAgYmFzZURpcjogdGVtcERpcixcbiAgICAgICAgICAgIHRyaW1tZWQ6IHRydWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChwbHVnaW4uc2V0dGluZ3Muc3NoS2V5LnRyaW0oKSkge1xuICAgICAgICAgICAgY29uc3Qga2V5UGF0aCA9IHBhdGguam9pbihcbiAgICAgICAgICAgICAgICBvcy50bXBkaXIoKSxcbiAgICAgICAgICAgICAgICBgb2JzaWRpYW4tZ2l0LWtleS0ke0RhdGUubm93KCl9YFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmcy53cml0ZUZpbGVTeW5jKFxuICAgICAgICAgICAgICAgICAgICBrZXlQYXRoLFxuICAgICAgICAgICAgICAgICAgICBwbHVnaW4uc2V0dGluZ3Muc3NoS2V5LnRyaW0oKSArIFwiXFxuXCIsXG4gICAgICAgICAgICAgICAgICAgIHsgbW9kZTogMG82MDAgfVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBnaXQuZW52KHtcbiAgICAgICAgICAgICAgICAgICAgLi4ucHJvY2Vzcy5lbnYsXG4gICAgICAgICAgICAgICAgICAgIEdJVF9TU0hfQ09NTUFORDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGBzc2ggLWkgXCIke2tleVBhdGh9XCIgLW8gU3RyaWN0SG9zdEtleUNoZWNraW5nPW5vIC1vIFVzZXJLbm93bkhvc3RzRmlsZT0vZGV2L251bGxgLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgYXdhaXQgY29tbWl0QW5kUHVzaEFydGljbGUoXG4gICAgICAgICAgICAgICAgICAgIGdpdCxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UmVsYXRpdmUsXG4gICAgICAgICAgICAgICAgICAgIGZpbGUuYmFzZW5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGV4aXN0c1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIGlmIChmcy5leGlzdHNTeW5jKGtleVBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcy51bmxpbmtTeW5jKGtleVBhdGgpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFx1NUZGRFx1NzU2NVx1NEUzNFx1NjVGNlx1NUJDNlx1OTRBNVx1NkUwNVx1NzQwNlx1NTkzMVx1OEQyNVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXdhaXQgY29tbWl0QW5kUHVzaEFydGljbGUoXG4gICAgICAgICAgICAgICAgZ2l0LFxuICAgICAgICAgICAgICAgIHRhcmdldFJlbGF0aXZlLFxuICAgICAgICAgICAgICAgIGZpbGUuYmFzZW5hbWUsXG4gICAgICAgICAgICAgICAgZXhpc3RzXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgICAgcGx1Z2luLnJlbW92ZVRlbXBEaXIodGVtcERpcik7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBjb21taXRBbmRQdXNoQXJ0aWNsZShcbiAgICBnaXQ6IFJldHVyblR5cGU8dHlwZW9mIHNpbXBsZUdpdD4sXG4gICAgdGFyZ2V0UmVsYXRpdmU6IHN0cmluZyxcbiAgICB0aXRsZTogc3RyaW5nLFxuICAgIGV4aXN0ZWQ6IGJvb2xlYW5cbikge1xuICAgIGF3YWl0IGdpdC5hZGQodGFyZ2V0UmVsYXRpdmUpO1xuXG4gICAgY29uc3Qgc3RhdHVzID0gYXdhaXQgZ2l0LnN0YXR1cygpO1xuICAgIGlmICghc3RhdHVzLnN0YWdlZC5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHU2NTg3XHU3QUUwXHU1MTg1XHU1QkI5XHU2Q0ExXHU2NzA5XHU1M0Q4XHU1MzE2XHVGRjBDXHU2NUUwXHU5NzAwXHU0RTBBXHU0RjIwXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGlvbiA9IGV4aXN0ZWQgPyBcIlx1NjZGNFx1NjVCMFwiIDogXCJcdTRFMEFcdTRGMjBcIjtcbiAgICBhd2FpdCBnaXQuY29tbWl0KGBkb2NzOiAke2FjdGlvbn0gJHt0aXRsZX1gKTtcbiAgICBhd2FpdCBnaXQucHVzaCgpO1xuXG4gICAgY29uc29sZS5sb2coYEdpdCAke2FjdGlvbn1cdTVCOENcdTYyMTBcdUZGMUEke3RhcmdldFJlbGF0aXZlfWApO1xufSIsICJpbXBvcnQgeyBOb3RpY2UgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB0eXBlIE15U2ltcGxlUGx1Z2luIGZyb20gXCIuL21haW5cIjtcblxuLyoqXG4gKiBcdTUyMzdcdTY1QjBcdTIwMUNHaXQgXHU2NTg3XHU3QUUwXHUyMDFEXHU4OUM2XHU1NkZFXHUzMDAyXG4gKiAtIFx1ODJFNVx1ODlDNlx1NTZGRVx1NURGMlx1NjI1M1x1NUYwMFx1RkYwQ1x1NTIxOVx1OEMwM1x1NzUyOFx1NTE3Nlx1NTE2Q1x1NUYwMFx1NzY4NCByZWZyZXNoIFx1NjVCOVx1NkNENVx1OTFDRFx1NjVCMFx1NTJBMFx1OEY3RFx1NjU4N1x1N0FFMFx1NTIxN1x1ODg2OFx1MzAwMlxuICogLSBcdTgyRTVcdTg5QzZcdTU2RkVcdTY3MkFcdTYyNTNcdTVGMDBcdUZGMENcdTUyMTlcdTRFMERcdTUwNUFcdTRFRkJcdTRGNTVcdTRFOEJcdTMwMDJcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZnJlc2hBcnRpY2xlc1ZpZXcoXG4gICAgcGx1Z2luOiBNeVNpbXBsZVBsdWdpbixcbiAgICBvcHRpb25zOiB7IHNpbGVudD86IGJvb2xlYW4gfSA9IHt9XG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IHNpbGVudCA9IGZhbHNlIH0gPSBvcHRpb25zO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbGVhdmVzID0gcGx1Z2luLmFwcC53b3Jrc3BhY2UuZ2V0TGVhdmVzT2ZUeXBlKFxuICAgICAgICAgICAgcGx1Z2luLnZpZXdUeXBlQXJ0aWNsZXNcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAobGVhdmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gXHU4OUM2XHU1NkZFXHU2Q0ExXHU1RjAwXHVGRjBDXHU2NUUwXHU5NzAwXHU1MjM3XHU2NUIwXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IGxlYWYgb2YgbGVhdmVzKSB7XG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gbGVhZi52aWV3IGFzIHsgcmVmcmVzaD86ICgpID0+IFByb21pc2U8dm9pZD4gfSB8IG51bGw7XG4gICAgICAgICAgICBpZiAodmlldyAmJiB0eXBlb2Ygdmlldy5yZWZyZXNoID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB2aWV3LnJlZnJlc2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmICghc2lsZW50KSB7XG4gICAgICAgICAgICBuZXcgTm90aWNlKFxuICAgICAgICAgICAgICAgIGBcdTUyMzdcdTY1QjBcdTY1ODdcdTdBRTBcdTUyMTdcdTg4NjhcdTU5MzFcdThEMjVcdUZGMUEke1xuICAgICAgICAgICAgICAgICAgICBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcilcbiAgICAgICAgICAgICAgICB9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlx1NTIzN1x1NjVCMFx1NjU4N1x1N0FFMFx1NTIxN1x1ODg2OFx1NTkzMVx1OEQyNVx1RkYxQVwiLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG59Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQSw2QkFBQUEsVUFBQUMsU0FBQTtBQUlBLFFBQUksSUFBSTtBQUNSLFFBQUlDLEtBQUksSUFBSTtBQUNaLFFBQUlDLEtBQUlELEtBQUk7QUFDWixRQUFJRSxLQUFJRCxLQUFJO0FBQ1osUUFBSUUsS0FBSUQsS0FBSTtBQUNaLFFBQUlFLEtBQUlGLEtBQUk7QUFnQlosSUFBQUgsUUFBTyxVQUFVLFNBQVUsS0FBSyxTQUFTO0FBQ3ZDLGdCQUFVLFdBQVcsQ0FBQztBQUN0QixVQUFJLE9BQU8sT0FBTztBQUNsQixVQUFJLFNBQVMsWUFBWSxJQUFJLFNBQVMsR0FBRztBQUN2QyxlQUFPLE1BQU0sR0FBRztBQUFBLE1BQ2xCLFdBQVcsU0FBUyxZQUFZLFNBQVMsR0FBRyxHQUFHO0FBQzdDLGVBQU8sUUFBUSxPQUFPLFFBQVEsR0FBRyxJQUFJLFNBQVMsR0FBRztBQUFBLE1BQ25EO0FBQ0EsWUFBTSxJQUFJO0FBQUEsUUFDUiwwREFDRSxLQUFLLFVBQVUsR0FBRztBQUFBLE1BQ3RCO0FBQUEsSUFDRjtBQVVBLGFBQVMsTUFBTSxLQUFLO0FBQ2xCLFlBQU0sT0FBTyxHQUFHO0FBQ2hCLFVBQUksSUFBSSxTQUFTLEtBQUs7QUFDcEI7QUFBQSxNQUNGO0FBQ0EsVUFBSSxRQUFRLG1JQUFtSTtBQUFBLFFBQzdJO0FBQUEsTUFDRjtBQUNBLFVBQUksQ0FBQyxPQUFPO0FBQ1Y7QUFBQSxNQUNGO0FBQ0EsVUFBSSxJQUFJLFdBQVcsTUFBTSxDQUFDLENBQUM7QUFDM0IsVUFBSSxRQUFRLE1BQU0sQ0FBQyxLQUFLLE1BQU0sWUFBWTtBQUMxQyxjQUFRLE1BQU07QUFBQSxRQUNaLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLEtBQUs7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SCxZQUFNLGdCQUFnQixRQUFRLGdCQUFnQjtBQUU5QyxVQUFJLGtCQUFrQixjQUFjLFVBQVUsZUFBZSxTQUFTLEdBQUc7QUFDeEUsUUFBQUEsU0FBUSxTQUFTO0FBQUEsVUFDaEI7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNEO0FBQUEsTUFDRDtBQUFBLElBQ0QsU0FBUyxPQUFPO0FBQUEsSUFF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QUVaLGNBQUksTUFBTSxZQUFZLEdBQUc7QUFDckIsb0JBQVEsSUFBSSxhQUFhLE1BQVcsU0FBRyxFQUFFLEtBQUssR0FBRyxDQUFDO0FBQ2xELGtCQUFNLEtBQUssY0FBYyxZQUFZO0FBQUEsVUFDekM7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUVBLFlBQU0sS0FBSyxPQUFPO0FBRWxCLGFBQU8sTUFBTSxLQUFLLE9BQU8sRUFBRTtBQUFBLFFBQUssQ0FBQyxHQUFHQSxPQUNoQyxFQUFFLGNBQWNBLElBQUcsT0FBTztBQUFBLE1BQzlCO0FBQUEsSUFDSixVQUFFO0FBQ0UsWUFBTSxLQUFLLGNBQWMsT0FBTztBQUFBLElBQ3BDO0FBQUEsRUFDSjtBQUFBLEVBRUEsTUFBTSxjQUFjLEtBQTRCO0FBQzVDLFFBQUksQ0FBQyxJQUFLO0FBRVYsUUFBSTtBQUNBLFlBQVUsT0FBRyxLQUFLLEVBQUUsV0FBVyxNQUFNLE9BQU8sS0FBSyxDQUFDO0FBQUEsSUFDdEQsU0FBUyxPQUFPO0FBQ1osY0FBUSxLQUFLLCtEQUFrQixLQUFLO0FBQUEsSUFDeEM7QUFBQSxFQUNKO0FBQUEsRUFFQSxXQUFXO0FBQ1AsU0FBSyxJQUFJLFVBQVUsbUJBQW1CLGtCQUFrQjtBQUFBLEVBQzVEO0FBQ0o7IiwKICAibmFtZXMiOiBbImV4cG9ydHMiLCAibW9kdWxlIiwgIm0iLCAiaCIsICJkIiwgInciLCAieSIsICJtcyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJtcyIsICJ2IiwgIm5zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgIm0iLCAiYyIsICJyIiwgInYiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiXyIsICJrIiwgInVzZUNvbG9ycyIsICJjIiwgInYiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAicGF0aCIsICJzdGF0IiwgImV4cG9ydHMiLCAiX19leHBvcnQiLCAiZXhwb3J0cyIsICJpbXBvcnRfb2JzaWRpYW4iLCAiY2FjaGUiLCAicGF0aHNwZWMiLCAicGF0aHMiLCAia2V5IiwgImlzUGF0aFNwZWMiLCAidmFsdWUiLCAidG9QYXRocyIsICJzY29wZWRGbGFncyIsICJmbGFncyIsICJzY29wZSIsICJmaW5kR2xvYmFsIiwgImZsYWciLCAiQ09ORklHX1dSSVRFX0ZMQUdTIiwgIkNPTkZJR19SRUFEX0ZMQUdTIiwgIkNPTkZJR19XUklURV9WRVJCUyIsICJDT05GSUdfUkVBRF9WRVJCUyIsICJkZXRlY3RDb25maWdBY3Rpb24iLCAicG9zaXRpb25hbHMiLCAibmFtZSIsICJjb25maWdPcGVyYXRpb24iLCAidmVyYiIsICJpc1dyaXRlIiwgImtleSIsICJ0b09wZXJhdGlvbiIsICJvcGVyYXRpb24iLCAicGFyc2VBc3NpZ25tZW50IiwgInJhdyIsICJlcSIsICJkZXRlY3RDb25maWdTY29wZSIsICJkZXRlY3RDb25maWdPdmVycmlkZVNjb3BlIiwgImNvbGxlY3RXcml0ZUZsYWdzIiwgImFzc2lnbm1lbnQiLCAiY29sbGVjdENvbmZpZ0FjY2VzcyIsICJ0YXNrIiwgInBhcnNlZENvbmZpZyIsICJhcHBlbmRQYXJzZWRDb25maWdBY3Rpb24iLCAiYWN0aW9uIiwgImNvbmZpZyIsICJVTklWRVJTQUwiLCAiR0xPQkFMIiwgIkNPTU1BTkRTIiwgIkVNUFRZIiwgImdldEZsYWdTcGVjRm9yVGFzayIsICJzcGVjIiwgImV4cGFuZFRva2VuIiwgInN0ZW0iLCAiY2hhciIsICJjb25zdW1lcyIsICJleHBhbmRDbHVzdGVyIiwgInNob3J0U3BlYyIsICJjaGFycyIsICJyZXN1bHQiLCAiaSIsICJyZW1haW5kZXIiLCAiYyIsICJwYXJzZUdsb2JhbEZsYWdzIiwgInRva2VucyIsICJwYXJzZWQiLCAibmV4dCIsICJ0b2tlbiIsICJwYXJzZVRhc2tGbGFncyIsICJwYXRoc3BlY3MiLCAiY3VycmVudCIsICJpc1BhdGhTcGVjIiwgInRvUGF0aHMiLCAiaiIsICJ0IiwgImRldGVjdFZ1bG5lcmFibGVDb25maWdXcml0ZXMiLCAid3JpdGUiLCAiaGVscGVyIiwgInByZXZlbnRVbnNhZmVDb25maWciLCAidnVsbmVyYWJpbGl0eSIsICJwcmV2ZW50Q29uZmlnQnVpbGRlciIsICJjYXRlZ29yeSIsICJtZXNzYWdlIiwgInJlZ2V4IiwgInByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIiLCAiZGV0ZWN0VnVsbmVyYWJsZUZsYWdzIiwgInByZXZlbnRVbnNhZmVGbGFncyIsICJwcmV2ZW50RmxhZ0J1aWxkZXIiLCAiZ2xvYmFsT25seSIsICJ3aXRoVmFsdWUiLCAiY3VycmVudFRhc2siLCAicGF0aFRha2luZ0dsb2JhbCIsICJ2dWxuZXJhYmlsaXR5QW5hbHlzaXMiLCAicGFyc2VBcmd2IiwgInRhc2tJbmRleCIsICJ0YXNrVG9rZW5zIiwgInRvUGFyc2VkRmxhZyIsICJ2dWxuZXJhYmlsaXR5TGlzdCIsICJ2dWxuZXJhYmlsaXRpZXMiLCAidmFsdWUiLCAiR2l0RW52S2V5cyIsICJjb2xsZWN0Q29uZmlnQnlDb3VudCIsICJlbnYiLCAiY291bnQiLCAiaW5kZXgiLCAiY29sbGVjdENvbmZpZ1Z1bG5lcmFiaWxpdGllcyIsICJpc0dpdEVudktleSIsICJwcmVwYXJlRW52IiwgImdpdEVudiIsICJlbnZLZXkiLCAicGFyc2VFbnYiLCAidnVsbmVyYWJpbGl0eUNoZWNrIiwgIkdpdEVycm9yIiwgInRhc2siLCAibWVzc2FnZSIsICJHaXRDb25zdHJ1Y3RFcnJvciIsICJjb25maWciLCAiR2l0UGx1Z2luRXJyb3IiLCAicGx1Z2luIiwgIkdpdFJlc3BvbnNlRXJyb3IiLCAiZ2l0IiwgIlRhc2tDb25maWd1cmF0aW9uRXJyb3IiLCAiTlVMTCIsICJOT09QIiwgImFzRnVuY3Rpb24iLCAic291cmNlIiwgImlzVXNlckZ1bmN0aW9uIiwgInNwbGl0T24iLCAiaW5wdXQiLCAiY2hhciIsICJpbmRleCIsICJmaXJzdCIsICJvZmZzZXQiLCAiaXNBcnJheUxpa2UiLCAibGFzdCIsICJmaWx0ZXJIYXNMZW5ndGgiLCAidG9MaW5lc1dpdGhDb250ZW50IiwgInRyaW1tZWQiLCAic2VwYXJhdG9yIiwgIm91dHB1dCIsICJsaW5lIiwgImxpbmVDb250ZW50IiwgImZvckVhY2hMaW5lV2l0aENvbnRlbnQiLCAiY2FsbGJhY2siLCAiZm9sZGVyRXhpc3RzIiwgInBhdGgiLCAiZXhpc3RzIiwgIkZPTERFUiIsICJhcHBlbmQiLCAidGFyZ2V0IiwgIml0ZW0iLCAiaW5jbHVkaW5nIiwgInJlbW92ZSIsICJvYmplY3RUb1N0cmluZyIsICJhc0FycmF5IiwgImFzQ2FtZWxDYXNlIiwgInN0ciIsICJfYWxsIiwgImNociIsICJhc1N0cmluZ0FycmF5IiwgImFzTnVtYmVyIiwgIm9uTmFOIiwgIm51bSIsICJwcmVmaXhlZEFycmF5IiwgInByZWZpeCIsICJpIiwgIm1heCIsICJidWZmZXJUb1N0cmluZyIsICJieXRlTGVuZ3RoIiwgInBpY2siLCAicHJvcGVydGllcyIsICJvdXQiLCAia2V5IiwgImRlbGF5IiwgImR1cmF0aW9uIiwgImRvbmUiLCAib3JWb2lkIiwgImZpbHRlclR5cGUiLCAiZmlsdGVyIiwgImRlZiIsICJmaWx0ZXJBcnJheSIsICJmaWx0ZXJQcmltaXRpdmVzIiwgIm9taXQiLCAidHlwZSIsICJpc1BhdGhTcGVjIiwgImZpbHRlclN0cmluZyIsICJmaWx0ZXJTdHJpbmdPckJ1ZmZlciIsICJmaWx0ZXJTdHJpbmdPclN0cmluZ0FycmF5IiwgImZpbHRlclBsYWluT2JqZWN0IiwgImZpbHRlckZ1bmN0aW9uIiwgIkV4aXRDb2RlcyIsICJHaXRPdXRwdXRTdHJlYW1zIiwgInN0ZE91dCIsICJzdGRFcnIiLCAidXNlTWF0Y2hlc0RlZmF1bHQiLCAiTGluZVBhcnNlciIsICJyZWdFeHAiLCAidXNlTWF0Y2hlcyIsICJyZWciLCAibWF0Y2hlZCIsICJfaW5kZXgiLCAiUmVtb3RlTGluZVBhcnNlciIsICJkZWZhdWx0T3B0aW9ucyIsICJjcmVhdGVJbnN0YW5jZUNvbmZpZyIsICJvcHRpb25zIiwgImJhc2VEaXIiLCAibyIsICJhcHBlbmRUYXNrT3B0aW9ucyIsICJjb21tYW5kcyIsICJ2YWx1ZSIsICJ2IiwgImdldFRyYWlsaW5nT3B0aW9ucyIsICJhcmdzIiwgImluaXRpYWxQcmltaXRpdmUiLCAib2JqZWN0T25seSIsICJjb21tYW5kIiwgInRyYWlsaW5nT3B0aW9uc0FyZ3VtZW50IiwgInRyYWlsaW5nQXJyYXlBcmd1bWVudCIsICJoYXNUcmFpbGluZ0NhbGxiYWNrIiwgInRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudCIsICJpbmNsdWRlTm9vcCIsICJjYWxsVGFza1BhcnNlciIsICJwYXJzZXIiLCAic3RyZWFtcyIsICJwYXJzZVN0cmluZ1Jlc3BvbnNlIiwgInJlc3VsdCIsICJwYXJzZXJzIiwgInRleHRzIiwgInRyaW0iLCAidGV4dCIsICJsaW5lcyIsICJwYXJzZSIsICJvbkVycm9yIiwgImV4aXRDb2RlIiwgImVycm9yIiwgImRvbmUiLCAiZmFpbCIsICJFeGl0Q29kZXMiLCAiaXNOb3RSZXBvTWVzc2FnZSIsICJwYXJzZXIiLCAidGV4dCIsICJjaGVja0lzUmVwb1Rhc2siLCAiYWN0aW9uIiwgImNoZWNrSXNCYXJlUmVwb1Rhc2siLCAiY2hlY2tJc1JlcG9Sb290VGFzayIsICJwYXRoIiwgIkNsZWFuUmVzcG9uc2UiLCAiZHJ5UnVuIiwgInJlbW92YWxSZWdleHAiLCAiZHJ5UnVuUmVtb3ZhbFJlZ2V4cCIsICJpc0ZvbGRlclJlZ2V4cCIsICJjbGVhblN1bW1hcnlQYXJzZXIiLCAic3VtbWFyeSIsICJyZWdleHAiLCAidG9MaW5lc1dpdGhDb250ZW50IiwgImxpbmUiLCAicmVtb3ZlZCIsICJFTVBUWV9DT01NQU5EUyIsICJhZGhvY0V4ZWNUYXNrIiwgImNvbmZpZ3VyYXRpb25FcnJvclRhc2siLCAiVGFza0NvbmZpZ3VyYXRpb25FcnJvciIsICJzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrIiwgImNvbW1hbmRzIiwgInRyaW1tZWQiLCAic3RyYWlnaHRUaHJvdWdoQnVmZmVyVGFzayIsICJidWZmZXIiLCAiaXNCdWZmZXJUYXNrIiwgInRhc2siLCAiaXNFbXB0eVRhc2siLCAiQ09ORklHX0VSUk9SX0lOVEVSQUNUSVZFX01PREUiLCAiQ09ORklHX0VSUk9SX01PREVfUkVRVUlSRUQiLCAiQ09ORklHX0VSUk9SX1VOS05PV05fT1BUSU9OIiwgIkNsZWFuT3B0aW9ucyIsICJDbGVhbk9wdGlvblZhbHVlcyIsICJhc1N0cmluZ0FycmF5IiwgImNsZWFuV2l0aE9wdGlvbnNUYXNrIiwgIm1vZGUiLCAiY3VzdG9tQXJncyIsICJjbGVhbk1vZGUiLCAib3B0aW9ucyIsICJ2YWxpZCIsICJnZXRDbGVhbk9wdGlvbnMiLCAiaXNJbnRlcmFjdGl2ZU1vZGUiLCAiY2xlYW5UYXNrIiwgImlzQ2xlYW5PcHRpb25zQXJyYXkiLCAiaW5wdXQiLCAidGVzdCIsICJjaGFyIiwgImlzQ2xlYW5Nb2RlIiwgImlzS25vd25PcHRpb24iLCAib3B0aW9uIiwgIkNvbmZpZ0xpc3QiLCAiYWxsIiwgImZpbGUiLCAibGF0ZXN0IiwgImxhc3QiLCAia2V5IiwgInZhbHVlIiwgInZhbHVlcyIsICJjb25maWdMaXN0UGFyc2VyIiwgImNvbmZpZyIsICJpdGVtIiwgImNvbmZpZ1BhcnNlciIsICJjb25maWdHZXRQYXJzZXIiLCAic2NvcGVzIiwgImNvbmZpZ0ZpbGVQYXRoIiwgImZpbGVQYXRoIiwgInJlcXVlc3RlZEtleSIsICJsaW5lcyIsICJpIiwgIm1heCIsICJzcGxpdE9uIiwgIkdpdENvbmZpZ1Njb3BlIiwgImFzQ29uZmlnU2NvcGUiLCAic2NvcGUiLCAiZmFsbGJhY2siLCAiYWRkQ29uZmlnVGFzayIsICJhcHBlbmQiLCAiZ2V0Q29uZmlnVGFzayIsICJsaXN0Q29uZmlnVGFzayIsICJyZXN0IiwgInRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudCIsICJEaWZmTmFtZVN0YXR1cyIsICJkaWZmTmFtZVN0YXR1cyIsICJpc0RpZmZOYW1lU3RhdHVzIiwgIl9hIiwgImRpc2FsbG93ZWRPcHRpb25zIiwgIlF1ZXJ5IiwgIkdyZXBRdWVyeSIsICJxdWVyeSIsICJhbmQiLCAicHJlZml4ZWRBcnJheSIsICJwYXJhbSIsICJncmVwUXVlcnlCdWlsZGVyIiwgInBhcmFtcyIsICJwYXJzZUdyZXAiLCAiZ3JlcCIsICJwYXRocyIsICJyZXN1bHRzIiwgImZvckVhY2hMaW5lV2l0aENvbnRlbnQiLCAicHJldmlldyIsICJOVUxMIiwgImFzTnVtYmVyIiwgInNlYXJjaFRlcm0iLCAidGhlbiIsICJnZXRUcmFpbGluZ09wdGlvbnMiLCAic3RkT3V0IiwgIlJlc2V0TW9kZSIsICJ2YWxpZFJlc2V0TW9kZXMiLCAicmVzZXRUYXNrIiwgImlzVmFsaWRSZXNldE1vZGUiLCAiZ2V0UmVzZXRNb2RlIiwgImRlYnVnIiwgImZpbHRlckhhc0xlbmd0aCIsICJvYmplY3RUb1N0cmluZyIsICJjcmVhdGVMb2ciLCAicHJlZml4ZWRMb2dnZXIiLCAidG8iLCAicHJlZml4IiwgImZvcndhcmQiLCAibWVzc2FnZSIsICJhcmdzIiwgImNoaWxkTG9nZ2VyTmFtZSIsICJuYW1lIiwgImNoaWxkRGVidWdnZXIiLCAicGFyZW50TmFtZXNwYWNlIiwgImNoaWxkTmFtZXNwYWNlIiwgImNyZWF0ZUxvZ2dlciIsICJsYWJlbCIsICJ2ZXJib3NlIiwgImluaXRpYWxTdGVwIiwgImluZm9EZWJ1Z2dlciIsICJsYWJlbFByZWZpeCIsICJzcGF3bmVkIiwgImRlYnVnRGVidWdnZXIiLCAiZmlsdGVyVHlwZSIsICJmaWx0ZXJTdHJpbmciLCAic3RlcCIsICJzaWJsaW5nIiwgImluaXRpYWwiLCAicGhhc2UiLCAic3RlcFByZWZpeCIsICJOT09QIiwgImluZm8iLCAiX1Rhc2tzUGVuZGluZ1F1ZXVlIiwgImxvZ0xhYmVsIiwgImxvZ2dlciIsICJwcm9ncmVzcyIsICJlcnIiLCAiR2l0RXJyb3IiLCAiVGFza3NQZW5kaW5nUXVldWUiLCAiR2l0RXhlY3V0b3JDaGFpbiIsICJfZXhlY3V0b3IiLCAiX3NjaGVkdWxlciIsICJfcGx1Z2lucyIsICJjd2QiLCAib25TY2hlZHVsZUNvbXBsZXRlIiwgIm9uUXVldWVDb21wbGV0ZSIsICJlIiwgImdpdEVycm9yIiwgImJpbmFyeSIsICJyYXciLCAib3V0cHV0U3RyZWFtcyIsICJjYWxsVGFza1BhcnNlciIsICJyZXN1bHQiLCAicmVqZWN0aW9uIiwgInN0ZEVyciIsICJuZXdTdGRPdXQiLCAiR2l0T3V0cHV0U3RyZWFtcyIsICJjb21tYW5kIiwgIm91dHB1dEhhbmRsZXIiLCAib3V0cHV0TG9nZ2VyIiwgInNwYXduT3B0aW9ucyIsICJyZWFzb24iLCAic3Bhd24iLCAib25EYXRhUmVjZWl2ZWQiLCAib25FcnJvclJlY2VpdmVkIiwgImZpcnN0IiwgInRhcmdldCIsICJvdXRwdXQiLCAiR2l0RXhlY3V0b3IiLCAidGFza0NhbGxiYWNrIiwgInJlc3BvbnNlIiwgImNhbGxiYWNrIiwgIm9uU3VjY2VzcyIsICJkYXRhIiwgImNoYW5nZVdvcmtpbmdEaXJlY3RvcnlUYXNrIiwgImRpcmVjdG9yeSIsICJyb290IiwgImluc3RhbmNlIiwgImZvbGRlckV4aXN0cyIsICJjaGVja291dFRhc2siLCAicmVtb3ZlIiwgImNoZWNrb3V0IiwgImJyYW5jaE5hbWUiLCAic3RhcnRQb2ludCIsICJjbG9uZVRhc2siLCAicmVwbyIsICJwYXRoc3BlYyIsICJjbG9uZU1pcnJvclRhc2siLCAiY3JlYXRlQ2xvbmVUYXNrIiwgImFwaSIsICJyZXBvUGF0aCIsICJjbG9uZSIsICJwYXJzZXJzIiwgIkxpbmVQYXJzZXIiLCAiYnJhbmNoIiwgImNvbW1pdCIsICJhdXRob3IiLCAicGFydHMiLCAiZW1haWwiLCAiY2hhbmdlcyIsICJpbnNlcnRpb25zIiwgImRlbGV0aW9ucyIsICJkaXJlY3Rpb24iLCAiY291bnQiLCAicGFyc2VDb21taXRSZXN1bHQiLCAicGFyc2VTdHJpbmdSZXNwb25zZSIsICJjb21taXRUYXNrIiwgImZpbGVzIiwgIm5leHQiLCAicmVqZWN0RGVwcmVjYXRlZFNpZ25hdHVyZXMiLCAiYXNBcnJheSIsICJmaWx0ZXJTdHJpbmdPclN0cmluZ0FycmF5IiwgImZpbHRlckFycmF5IiwgImNvdW50T2JqZWN0c1Jlc3BvbnNlIiwgInByb3BlcnR5IiwgImFzQ2FtZWxDYXNlIiwgImNvdW50T2JqZWN0cyIsICJmaXJzdENvbW1pdCIsICJoYXNoT2JqZWN0VGFzayIsICJ3cml0ZSIsICJJbml0U3VtbWFyeSIsICJiYXJlIiwgImV4aXN0aW5nIiwgImdpdERpciIsICJpbml0UmVzcG9uc2VSZWdleCIsICJyZUluaXRSZXNwb25zZVJlZ2V4IiwgInBhcnNlSW5pdCIsICJ0b2tlbnMiLCAiYmFyZUNvbW1hbmQiLCAiaGFzQmFyZUNvbW1hbmQiLCAiaW5pdFRhc2siLCAiaW50ZXJwcmV0VHJhaWxlcnNUYXNrIiwgImluZGV4IiwgImludGVycHJldFRyYWlsZXJzIiwgImZpbHRlclN0cmluZ09yQnVmZmVyIiwgIkxvZ0Zvcm1hdCIsICJsb2dGb3JtYXRSZWdleCIsICJsb2dGb3JtYXRGcm9tQ29tbWFuZCIsICJmb3JtYXQiLCAiaXNMb2dGb3JtYXQiLCAiY3VzdG9tQXJnIiwgIkRpZmZTdW1tYXJ5IiwgInN0YXRQYXJzZXIiLCAiYWx0ZXJhdGlvbnMiLCAiYmVmb3JlIiwgImFmdGVyIiwgImNoYW5nZWQiLCAiaW5zZXJ0ZWQiLCAiZGVsZXRlZCIsICJudW1TdGF0UGFyc2VyIiwgImNoYW5nZXNJbnNlcnQiLCAiY2hhbmdlc0RlbGV0ZSIsICJuYW1lT25seVBhcnNlciIsICJuYW1lU3RhdHVzUGFyc2VyIiwgInN0YXR1cyIsICJzaW1pbGFyaXR5IiwgImZyb20iLCAiX3RvIiwgIm9yVm9pZCIsICJkaWZmU3VtbWFyeVBhcnNlcnMiLCAiZ2V0RGlmZlBhcnNlciIsICJTVEFSVF9CT1VOREFSWSIsICJDT01NSVRfQk9VTkRBUlkiLCAiU1BMSVRURVIiLCAiZGVmYXVsdEZpZWxkTmFtZXMiLCAibGluZUJ1aWxkZXIiLCAiZmllbGRzIiwgImZpZWxkIiwgImNyZWF0ZUxpc3RMb2dTdW1tYXJ5UGFyc2VyIiwgInNwbGl0dGVyIiwgImxvZ0Zvcm1hdCIsICJwYXJzZURpZmZSZXN1bHQiLCAibGluZURldGFpbCIsICJsaXN0TG9nTGluZSIsICJkaWZmU3VtbWFyeVRhc2siLCAidmFsaWRhdGVMb2dGb3JtYXRDb25maWciLCAiZmxhZ3MiLCAiZXhjbHVkZU9wdGlvbnMiLCAicHJldHR5Rm9ybWF0IiwgImZvcm1hdFN0ciIsICJ1c2VyT3B0aW9ucyIsICJvdXQiLCAicGFyc2VMb2dPcHRpb25zIiwgIm9wdCIsICJmaWx0ZXJQbGFpbk9iamVjdCIsICJzdWZmaXgiLCAibWF4Q291bnQiLCAicmFuZ2VPcGVyYXRvciIsICJhcHBlbmRUYXNrT3B0aW9ucyIsICJsb2dUYXNrIiwgImxvZyIsICJ0cmFpbGluZ09wdGlvbnNBcmd1bWVudCIsICJjcmVhdGVMb2dUYXNrIiwgIk1lcmdlU3VtbWFyeUNvbmZsaWN0IiwgIm1ldGEiLCAiTWVyZ2VTdW1tYXJ5RGV0YWlsIiwgIlB1bGxTdW1tYXJ5IiwgIlB1bGxGYWlsZWRTdW1tYXJ5IiwgIm9iamVjdEVudW1lcmF0aW9uUmVzdWx0IiwgInJlbW90ZU1lc3NhZ2VzIiwgImFzT2JqZWN0Q291bnQiLCAic291cmNlIiwgImRlbHRhIiwgInJlbW90ZU1lc3NhZ2VzT2JqZWN0UGFyc2VycyIsICJSZW1vdGVMaW5lUGFyc2VyIiwgImVudW1lcmF0aW9uIiwgInRvdGFsIiwgInJldXNlZCIsICJwYWNrUmV1c2VkIiwgIm9iamVjdHMiLCAicHVsbFJlcXVlc3RVcmwiLCAidXJsIiwgInBhcnNlUmVtb3RlTWVzc2FnZXMiLCAiX3N0ZE91dCIsICJSZW1vdGVNZXNzYWdlU3VtbWFyeSIsICJGSUxFX1VQREFURV9SRUdFWCIsICJTVU1NQVJZX1JFR0VYIiwgIkFDVElPTl9SRUdFWCIsICJlcnJvclBhcnNlcnMiLCAicmVtb3RlIiwgImhhc2hMb2NhbCIsICJoYXNoUmVtb3RlIiwgImJyYW5jaExvY2FsIiwgImJyYW5jaFJlbW90ZSIsICJwYXJzZVB1bGxEZXRhaWwiLCAicGFyc2VQdWxsUmVzdWx0IiwgInBhcnNlUHVsbEVycm9yUmVzdWx0IiwgInB1bGxFcnJvciIsICJhdXRvTWVyZ2UiLCAiZGVsZXRlUmVmIiwgInBhcnNlTWVyZ2VSZXN1bHQiLCAicGFyc2VNZXJnZURldGFpbCIsICJtZXJnZVRhc2siLCAibWVyZ2UiLCAiR2l0UmVzcG9uc2VFcnJvciIsICJwdXNoUmVzdWx0UHVzaGVkSXRlbSIsICJsb2NhbCIsICJ0YWciLCAiYWxyZWFkeVVwZGF0ZWQiLCAidHlwZSIsICJyZW1vdGVOYW1lIiwgInBhcnNlUHVzaFJlc3VsdCIsICJwdXNoRGV0YWlsIiwgInBhcnNlUHVzaERldGFpbCIsICJyZXNwb25zZURldGFpbCIsICJwdXNoVGFnc1Rhc2siLCAicmVmIiwgInB1c2hUYXNrIiwgInNob3ciLCAiZnJvbVBhdGhSZWdleCIsICJGaWxlU3RhdHVzU3VtbWFyeSIsICJ3b3JraW5nX2RpciIsICJkZXRhaWwiLCAiU3RhdHVzU3VtbWFyeSIsICJyZW5hbWVkRmlsZSIsICJpbmRleFgiLCAiaW5kZXhZIiwgImhhbmRsZXIiLCAiY29uZmxpY3RzIiwgInkiLCAicmVuYW1lZCIsICJfcmVzdWx0IiwgIl9maWxlIiwgImFoZWFkUmVnIiwgImJlaGluZFJlZyIsICJjdXJyZW50UmVnIiwgInRyYWNraW5nUmVnIiwgIm9uRW1wdHlCcmFuY2hSZWciLCAicmVnZXhSZXN1bHQiLCAicGFyc2VTdGF0dXNTdW1tYXJ5IiwgImwiLCAic3BsaXRMaW5lIiwgImxpbmVTdHIiLCAid29ya2luZ0RpciIsICJpZ25vcmVkT3B0aW9ucyIsICJzdGF0dXNUYXNrIiwgImFyZyIsICJOT1RfSU5TVEFMTEVEIiwgInZlcnNpb25SZXNwb25zZSIsICJtYWpvciIsICJtaW5vciIsICJwYXRjaCIsICJhZ2VudCIsICJpbnN0YWxsZWQiLCAibm90SW5zdGFsbGVkUmVzcG9uc2UiLCAidmVyc2lvbiIsICJ2ZXJzaW9uUGFyc2VyIiwgIlNpbXBsZUdpdEFwaSIsICJjaGFpbiIsICJwcm9taXNlIiwgImNyZWF0ZVNjaGVkdWxlZFRhc2siLCAiaWQiLCAiY3JlYXRlRGVmZXJyZWQiLCAiU2NoZWR1bGVyIiwgImNvbmN1cnJlbmN5IiwgImFwcGx5UGF0Y2hUYXNrIiwgInBhdGNoZXMiLCAiQnJhbmNoU3RhdHVzSWRlbnRpZmllciIsICJCcmFuY2hTdW1tYXJ5UmVzdWx0IiwgImRldGFjaGVkIiwgImN1cnJlbnQiLCAiYnJhbmNoU3RhdHVzIiwgImN1cnJlbnRCcmFuY2hQYXJzZXIiLCAicGFyc2VCcmFuY2hTdW1tYXJ5IiwgImN1cnJlbnRPbmx5IiwgIkJyYW5jaERlbGV0aW9uQmF0Y2giLCAiYnJhbmNoRGVsZXRpb25TdWNjZXNzIiwgImhhc2giLCAiYnJhbmNoRGVsZXRpb25GYWlsdXJlIiwgImRlbGV0ZVN1Y2Nlc3NSZWdleCIsICJkZWxldGVFcnJvclJlZ2V4IiwgImRlbGV0aW9uIiwgInBhcnNlQnJhbmNoRGVsZXRpb25zIiwgImhhc0JyYW5jaERlbGV0aW9uRXJyb3IiLCAicHJvY2Vzc0V4aXRDb2RlIiwgImNvbnRhaW5zRGVsZXRlQnJhbmNoQ29tbWFuZCIsICJkZWxldGVDb21tYW5kcyIsICJicmFuY2hUYXNrIiwgImlzRGVsZXRlIiwgImlzQ3VycmVudE9ubHkiLCAiYnJhbmNoTG9jYWxUYXNrIiwgImRlbGV0ZUJyYW5jaGVzVGFzayIsICJicmFuY2hlcyIsICJmb3JjZURlbGV0ZSIsICJkZWxldGVCcmFuY2hUYXNrIiwgIl8iLCAiYnVmZmVyVG9TdHJpbmciLCAiY2hlY2tJZ25vcmVUYXNrIiwgInBhcnNlQ2hlY2tJZ25vcmUiLCAidG9QYXRoIiwgIm5vcm1hbGl6ZSIsICJ0cmFja2luZyIsICJwYXJzZUZldGNoUmVzdWx0IiwgImRpc2FsbG93ZWRDb21tYW5kIiwgImZldGNoVGFzayIsICJwYXJzZU1vdmVSZXN1bHQiLCAibW92ZVRhc2siLCAicHVsbFRhc2siLCAiX2Vycm9yIiwgIl9kb25lIiwgInBhcnNlR2V0UmVtb3RlcyIsICJyZW1vdGVzIiwgImZvckVhY2giLCAicGFyc2VHZXRSZW1vdGVzVmVyYm9zZSIsICJwdXJwb3NlIiwgImFkZFJlbW90ZVRhc2siLCAicmVtb3RlUmVwbyIsICJnZXRSZW1vdGVzVGFzayIsICJsaXN0UmVtb3Rlc1Rhc2siLCAicmVtb3RlVGFzayIsICJyZW1vdmVSZW1vdGVUYXNrIiwgInN0YXNoTGlzdFRhc2siLCAiYWRkU3ViTW9kdWxlVGFzayIsICJzdWJNb2R1bGVUYXNrIiwgImluaXRTdWJNb2R1bGVUYXNrIiwgInVwZGF0ZVN1Yk1vZHVsZVRhc2siLCAiVGFnTGlzdCIsICJwYXJzZVRhZ0xpc3QiLCAiY3VzdG9tU29ydCIsICJ0YWdzIiwgInRhZ0EiLCAidGFnQiIsICJwYXJ0c0EiLCAicGFydHNCIiwgInNpbmdsZVNvcnRlZCIsICJ0b051bWJlciIsICJkaWZmIiwgInNvcnRlZCIsICJhIiwgImIiLCAiYUlzTnVtIiwgImJJc051bSIsICJ0YWdMaXN0VGFzayIsICJoYXNDdXN0b21Tb3J0IiwgImFkZFRhZ1Rhc2siLCAiYWRkQW5ub3RhdGVkVGFnVGFzayIsICJ0YWdNZXNzYWdlIiwgIkdpdCIsICJwbHVnaW5zIiwgImdpdCIsICJ0YWdOYW1lIiwgImJyYW5jaE5hbWVzIiwgImNyZWF0ZVJlc3RDb21tYW5kcyIsICJmaWx0ZXJQcmltaXRpdmVzIiwgInVzaW5nQ2xlYW5PcHRpb25zQXJyYXkiLCAicGF0aG5hbWVzIiwgImNoZWNrVHlwZSIsICJhYm9ydFBsdWdpbiIsICJzaWduYWwiLCAiX2RhdGEiLCAiY29udGV4dCIsICJHaXRQbHVnaW5FcnJvciIsICJraWxsIiwgImFsbG93RW52aXJvbm1lbnRQbHVnaW4iLCAiYWxsb3dFbnZpcm9ubWVudCIsICJhbGxvd0FiYnJldmlhdGVkT3B0aW9ucyIsICJhbGxvd2VkIiwgImVudiIsICJzdXBwbGllZEtleXMiLCAibm9ybWFsaXNlZCIsICJpc0d1YXJkZWRFbnZLZXkiLCAiaXNHaXRFbnZLZXkiLCAiYmxvY2tVbnNhZmVPcGVyYXRpb25zUGx1Z2luIiwgInZ1bG5lcmFiaWxpdHkiLCAidnVsbmVyYWJpbGl0eUNoZWNrIiwgImNvbW1hbmRDb25maWdQcmVmaXhpbmdQbHVnaW4iLCAiY29uZmlndXJhdGlvbiIsICJuZXZlciIsICJkZWZlcnJlZCIsICJjb21wbGV0aW9uRGV0ZWN0aW9uUGx1Z2luIiwgIm9uQ2xvc2UiLCAib25FeGl0IiwgImNyZWF0ZUV2ZW50cyIsICJldmVudHMiLCAiY29uZmlndXJlVGltZW91dCIsICJjb2RlIiwgImZsYWciLCAiZXZlbnQiLCAidGltZW91dCIsICJkZWxheSIsICJjbG9zZSIsICJkZWZlckNsb3NlIiwgInF1aWNrQ2xvc2UiLCAiV1JPTkdfTlVNQkVSX0VSUiIsICJXUk9OR19DSEFSU19FUlIiLCAiaXNCYWRBcmd1bWVudCIsICJ0b0JpbmFyeUNvbmZpZyIsICJhbGxvd1Vuc2FmZSIsICJjdXN0b21CaW5hcnlQbHVnaW4iLCAiUkVBU09OUyIsICJnZXRSZWFzb24iLCAiR2l0Q29uZmlndXJhdGlvbkVycm9yIiwgImlzVGFza0Vycm9yIiwgImdldEVycm9yTWVzc2FnZSIsICJlcnJvckRldGVjdGlvbkhhbmRsZXIiLCAib3ZlcndyaXRlIiwgImlzRXJyb3IiLCAiZXJyb3JNZXNzYWdlIiwgImNyZWF0ZUdpdEVycm9yIiwgImVycm9yRGV0ZWN0aW9uUGx1Z2luIiwgImlucHV0UGx1Z2luIiwgInRhc2tJbnB1dCIsICJzdGRpbiIsICJjb250ZW50IiwgImJ5dGVMZW5ndGgiLCAiUGx1Z2luU3RvcmUiLCAiRXZlbnRFbWl0dGVyIiwgImxpc3RlbmVyIiwgInBsdWdpbiIsICJjb250ZXh0dWFsIiwgInByb2dyZXNzTW9uaXRvclBsdWdpbiIsICJwcm9ncmVzc0NvbW1hbmQiLCAicHJvZ3Jlc3NNZXRob2RzIiwgImluY2x1ZGluZyIsICJjaHVuayIsICJwcm9ncmVzc0V2ZW50U3RhZ2UiLCAic3Bhd25PcHRpb25zUGx1Z2luIiwgInBpY2siLCAic3VmZml4UGF0aHNQbHVnaW4iLCAiaXNQYXRoU3BlYyIsICJ0b1BhdGhzIiwgInRpbWVvdXRQbHVnaW4iLCAiYmxvY2siLCAid2FpdCIsICJzdG9wIiwgInNpbXBsZUdpdCIsICJiYXNlRGlyIiwgImNyZWF0ZUluc3RhbmNlQ29uZmlnIiwgImFwaS5HaXRDb25zdHJ1Y3RFcnJvciIsICJwYXRoIiwgIm9zIiwgInJlc29sdmUiLCAiaW1wb3J0X29ic2lkaWFuIiwgImZzIiwgImltcG9ydF9vYnNpZGlhbiIsICJmcyIsICJwYXRoIiwgIm9zIiwgImltcG9ydF9vYnNpZGlhbiIsICJyIiwgImIiLCAic3RhdCJdCn0K
