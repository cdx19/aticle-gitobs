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
  targetFolder: "Git\u6587\u7AE0",
  autoRefreshInterval: 0
};
var GitArticlesView = class extends import_obsidian5.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.articles = [];
    this.localTitles = /* @__PURE__ */ new Map();
    this.isLoading = false;
    // 新增：搜索关键词
    this.searchQuery = "";
    // 新增：本地区是否折叠
    this.localSectionCollapsed = false;
    // 新增：远程分组折叠状态
    this.collapsedRemoteGroups = /* @__PURE__ */ new Set();
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
    const actions = header.createDiv({ cls: "git-articles-header-actions" });
    const searchWrap = actions.createDiv({ cls: "git-articles-search" });
    const searchInput = searchWrap.createEl("input", {
      type: "search",
      placeholder: "\u641C\u7D22\u6807\u9898\u6216\u8DEF\u5F84\u2026",
      cls: "git-articles-search-input"
    });
    searchInput.value = this.searchQuery;
    searchInput.oninput = () => {
      this.searchQuery = searchInput.value.trim().toLowerCase();
      this.applyFilter();
    };
    const refreshButton = actions.createEl("button", {
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
      const remoteGroups = list.createDiv({ cls: "git-articles-groups" });
      const groupMap = /* @__PURE__ */ new Map();
      for (const article of this.articles) {
        const dir = article.relativePath.includes("/") ? article.relativePath.slice(0, article.relativePath.lastIndexOf("/")) : "\u6839\u76EE\u5F55";
        if (!groupMap.has(dir)) {
          groupMap.set(dir, []);
        }
        groupMap.get(dir).push(article);
      }
      const sortedGroups = Array.from(groupMap.entries()).sort(
        (a, b3) => a[0].localeCompare(b3[0], "zh-CN")
      );
      for (const [dir, items] of sortedGroups) {
        this.renderRemoteGroup(remoteGroups, dir, items);
      }
      await this.renderLocalArticles();
      this.applyFilter();
    } finally {
      await this.plugin.removeTempDir(tempDir);
    }
  }
  applyFilter() {
    const query = this.searchQuery;
    const groups = this.contentEl.querySelectorAll(".git-remote-group");
    groups.forEach((groupEl) => {
      var _a, _b, _c, _d, _e2;
      const el = groupEl;
      const cards = el.querySelectorAll(".git-article-card");
      let visibleCount = 0;
      cards.forEach((cardEl) => {
        var _a2;
        const card = cardEl;
        const text = (_a2 = card.dataset.search) != null ? _a2 : "";
        const match = !query || text.includes(query);
        card.style.display = match ? "" : "none";
        if (match) visibleCount++;
      });
      const groupName = (_c = (_b = (_a = el.querySelector(".git-remote-group-name")) == null ? void 0 : _a.textContent) == null ? void 0 : _b.toLowerCase()) != null ? _c : "";
      const groupMatch = !query || groupName.includes(query);
      el.style.display = visibleCount > 0 || groupMatch ? "" : "none";
      const body = el.querySelector(".git-remote-group-body");
      const toggle = el.querySelector(".git-remote-group-toggle");
      if (body && toggle) {
        if (query && groupMatch && visibleCount > 0) {
          body.style.display = "";
          toggle.textContent = "\u25BC";
        } else {
          const dir = (_e2 = (_d = el.querySelector(".git-remote-group-name")) == null ? void 0 : _d.textContent) != null ? _e2 : "";
          const collapsed = this.collapsedRemoteGroups.has(dir);
          body.style.display = collapsed ? "none" : "";
          toggle.textContent = collapsed ? "\u25B6" : "\u25BC";
        }
      }
    });
    const localSection = this.contentEl.querySelector(
      ".git-local-articles-section"
    );
    if (localSection) {
      const localCards = localSection.querySelectorAll(".git-local-article-card");
      let visibleLocal = 0;
      localCards.forEach((cardEl) => {
        var _a;
        const card = cardEl;
        const text = (_a = card.dataset.search) != null ? _a : "";
        const match = !query || text.includes(query);
        card.style.display = match ? "" : "none";
        if (match) visibleLocal++;
      });
      const localList = localSection.querySelector(
        ".git-local-articles-list"
      );
      if (localList) {
        if (query) {
          localList.style.display = visibleLocal > 0 ? "" : "none";
        } else {
          localList.style.display = this.localSectionCollapsed ? "none" : "";
        }
      }
      if (query && visibleLocal === 0) {
        localSection.style.display = "none";
      } else {
        localSection.style.display = "";
      }
    }
    let noResult = this.contentEl.querySelector(".git-articles-no-result");
    const remoteVisible = Array.from(
      this.contentEl.querySelectorAll(".git-remote-group")
    ).some((el) => el.style.display !== "none");
    const localVisible = localSection && localSection.style.display !== "none" && Array.from(
      localSection.querySelectorAll(".git-local-article-card")
    ).some((el) => el.style.display !== "none");
    if (query && !remoteVisible && !localVisible) {
      if (!noResult) {
        noResult = this.contentEl.createDiv({
          cls: "git-articles-no-result",
          text: `\u6CA1\u6709\u627E\u5230\u5305\u542B\u201C${this.searchQuery}\u201D\u7684\u6587\u7AE0`
        });
      }
    } else {
      noResult == null ? void 0 : noResult.remove();
    }
  }
  renderRemoteGroup(container, dir, articles) {
    const group = container.createDiv({ cls: "git-remote-group" });
    const collapsed = this.collapsedRemoteGroups.has(dir);
    const header = group.createDiv({ cls: "git-remote-group-header" });
    const left = header.createDiv({ cls: "git-remote-group-title" });
    const toggle = left.createEl("span", {
      text: collapsed ? "\u25B6" : "\u25BC",
      cls: "git-remote-group-toggle"
    });
    left.createEl("span", {
      text: dir,
      cls: "git-remote-group-name"
    });
    left.createEl("span", {
      text: `(${articles.length})`,
      cls: "git-remote-group-count"
    });
    header.onclick = () => {
      if (this.collapsedRemoteGroups.has(dir)) {
        this.collapsedRemoteGroups.delete(dir);
      } else {
        this.collapsedRemoteGroups.add(dir);
      }
      this.applyFilter();
    };
    const body = group.createDiv({ cls: "git-remote-group-body" });
    if (collapsed) {
      body.style.display = "none";
    }
    for (const article of articles) {
      this.renderArticleCard(body, article);
    }
  }
  renderArticleCard(list, article) {
    var _a;
    const remoteFileName = (_a = article.relativePath.split("/").pop()) != null ? _a : "";
    const localFile = this.localTitles.get(remoteFileName);
    const card = list.createDiv({ cls: "git-article-card" });
    card.dataset.search = `${article.title} ${article.relativePath}`.toLowerCase();
    const info = card.createDiv({ cls: "git-article-info" });
    const titleRow = info.createDiv({ cls: "git-article-title-row" });
    titleRow.createEl("div", {
      text: article.title,
      cls: "git-article-title"
    });
    const badge = titleRow.createEl("span", {
      text: localFile ? "\u5DF2\u540C\u6B65" : "\u672A\u4E0B\u8F7D",
      cls: localFile ? "git-article-badge is-synced" : "git-article-badge is-remote"
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
    const titleBox = header.createDiv({ cls: "git-local-articles-title" });
    titleBox.createEl("h3", { text: "\u672C\u5730\u6587\u7AE0\u4E0A\u4F20" });
    titleBox.createEl("div", {
      text: "\u8BFB\u53D6\u5F53\u524D Vault \u4E2D\u7684 Markdown \u6587\u4EF6\uFF0C\u9009\u62E9 Git \u4ED3\u5E93\u6587\u4EF6\u5939\u540E\u4E0A\u4F20\u3002",
      cls: "git-articles-subtitle"
    });
    const collapseBtn = header.createEl("button", {
      text: this.localSectionCollapsed ? "\u5C55\u5F00" : "\u6536\u8D77",
      cls: "git-local-collapse-btn"
    });
    collapseBtn.onclick = () => {
      this.localSectionCollapsed = !this.localSectionCollapsed;
      this.applyFilter();
    };
    const localFiles = this.app.vault.getMarkdownFiles().sort((a, b3) => a.path.localeCompare(b3.path, "zh-CN"));
    if (localFiles.length === 0) {
      section.createDiv({
        text: "\u5F53\u524D Vault \u4E2D\u6CA1\u6709 Markdown \u6587\u7AE0\u3002",
        cls: "git-local-empty"
      });
      return;
    }
    const list = section.createDiv({ cls: "git-local-articles-list" });
    if (this.localSectionCollapsed) {
      list.style.display = "none";
    }
    for (const file of localFiles) {
      const card = list.createDiv({ cls: "git-local-article-card" });
      card.dataset.search = `${file.basename} ${file.path}`.toLowerCase();
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
    new import_obsidian5.Setting(containerEl).setName("\u81EA\u52A8\u5237\u65B0\u95F4\u9694\uFF08\u6BEB\u79D2\uFF09").setDesc(
      "\u6309\u8BBE\u5B9A\u95F4\u9694\u81EA\u52A8\u62C9\u53D6 Git \u4ED3\u5E93\u4FE1\u606F\u4E0E\u672C\u5730\u6587\u7AE0\u4FE1\u606F\u5E76\u5237\u65B0\u5217\u8868\u3002\u8BBE\u4E3A 0 \u8868\u793A\u5173\u95ED\u81EA\u52A8\u5237\u65B0\u3002\u5EFA\u8BAE\u4E0D\u5C0F\u4E8E 5000 \u6BEB\u79D2\u3002"
    ).addText((text) => {
      var _a;
      text.setPlaceholder("0").setValue(String((_a = this.plugin.settings.autoRefreshInterval) != null ? _a : 0)).onChange(async (value) => {
        const num = Number(value.trim());
        this.plugin.settings.autoRefreshInterval = Number.isFinite(num) && num > 0 ? Math.floor(num) : 0;
        await this.plugin.saveSettings();
        this.plugin.restartAutoRefresh();
      });
      text.inputEl.type = "number";
      text.inputEl.min = "0";
      text.inputEl.step = "1000";
    });
  }
};
var MySimplePlugin = class extends import_obsidian5.Plugin {
  constructor() {
    super(...arguments);
    this.settingsReady = null;
    this.autoRefreshTimer = null;
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
    this.ensureSettingsLoaded().then(() => {
      this.restartAutoRefresh();
      console.log("Git \u6587\u7AE0\u540C\u6B65\u63D2\u4EF6\u5DF2\u52A0\u8F7D");
    }).catch((err) => console.error("\u52A0\u8F7D Git \u6587\u7AE0\u540C\u6B65\u8BBE\u7F6E\u5931\u8D25\uFF1A", err));
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
  /** 根据当前设置重建自动刷新定时器 */
  async restartAutoRefresh() {
    var _a, _b;
    this.stopAutoRefresh();
    const interval = (_b = (_a = this.settings) == null ? void 0 : _a.autoRefreshInterval) != null ? _b : 0;
    if (!interval || interval <= 0) {
      return;
    }
    this.autoRefreshTimer = window.setInterval(() => {
      var _a2;
      if (!((_a2 = this.settings) == null ? void 0 : _a2.repoUrl)) return;
      refreshArticlesView(this, { silent: true }).catch(
        (err) => console.warn("\u81EA\u52A8\u5237\u65B0\u6587\u7AE0\u5217\u8868\u5931\u8D25\uFF1A", err)
      );
    }, interval);
    this.registerInterval(this.autoRefreshTimer);
  }
  async stopAutoRefresh() {
    if (this.autoRefreshTimer !== null) {
      window.clearInterval(this.autoRefreshTimer);
      this.autoRefreshTimer = null;
    }
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
    this.stopAutoRefresh();
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_ARTICLES);
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL21zL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvY29tbW9uLmpzIiwgIm5vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvYnJvd3Nlci5qcyIsICJub2RlX21vZHVsZXMvZGVidWcvc3JjL25vZGUuanMiLCAibm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvQGt3c2l0ZXMvZmlsZS1leGlzdHMvc3JjL2luZGV4LnRzIiwgIm5vZGVfbW9kdWxlcy9Aa3dzaXRlcy9maWxlLWV4aXN0cy9pbmRleC50cyIsICJub2RlX21vZHVsZXMvQGt3c2l0ZXMvcHJvbWlzZS1kZWZlcnJlZC9zcmMvaW5kZXgudHMiLCAibWFpbi50cyIsICJub2RlX21vZHVsZXMvQHNpbXBsZS1naXQvYXJncy1wYXRoc3BlYy9zcmMvcGF0aHNwZWMudHMiLCAibm9kZV9tb2R1bGVzL0BzaW1wbGUtZ2l0L2FyZ3YtcGFyc2VyL3NyYy9mbGFncy9mbGFncy5oZWxwZXJzLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvY29uZmlnL2NvbmZpZy1vcGVyYW5kcy50cyIsICJub2RlX21vZHVsZXMvQHNpbXBsZS1naXQvYXJndi1wYXJzZXIvc3JjL2NvbmZpZy9kZXRlY3QtY29uZmlnLWFjdGlvbi50cyIsICJub2RlX21vZHVsZXMvQHNpbXBsZS1naXQvYXJndi1wYXJzZXIvc3JjL2NvbmZpZy9hbmFseXNlLWNvbmZpZy50cyIsICJub2RlX21vZHVsZXMvQHNpbXBsZS1naXQvYXJndi1wYXJzZXIvc3JjL3Rva2Vucy9mbGFnLXNwZWNzLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvdG9rZW5zL3Rva2VuLWV4cGFuZGVyLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvZmxhZ3MvcGFyc2UtZ2xvYmFsLWZsYWdzLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvZmxhZ3MvcGFyc2UtdGFzay1mbGFncy50cyIsICJub2RlX21vZHVsZXMvQHNpbXBsZS1naXQvYXJndi1wYXJzZXIvc3JjL3Z1bG5lcmFiaWxpdGllcy9kZXRlY3QtdnVsbmVyYWJsZS1jb25maWctd3JpdGVzLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvdnVsbmVyYWJpbGl0aWVzL2RldGVjdC12dWxuZXJhYmxlLWZsYWdzLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvdnVsbmVyYWJpbGl0aWVzL3Z1bG5lcmFiaWxpdHktYW5hbHlzaXMudHMiLCAibm9kZV9tb2R1bGVzL0BzaW1wbGUtZ2l0L2FyZ3YtcGFyc2VyL3NyYy9hcmdzL3BhcnNlLWFyZ3YudHMiLCAibm9kZV9tb2R1bGVzL0BzaW1wbGUtZ2l0L2FyZ3YtcGFyc2VyL3NyYy9lbnYvcGFyc2UtZW52LnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvdnVsbmVyYWJpbGl0aWVzL3Z1bG5lcmFiaWxpdHktY2hlY2sudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9lcnJvcnMvZ2l0LWVycm9yLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvZXJyb3JzL2dpdC1jb25zdHJ1Y3QtZXJyb3IudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9lcnJvcnMvZ2l0LXBsdWdpbi1lcnJvci50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL2Vycm9ycy9naXQtcmVzcG9uc2UtZXJyb3IudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9lcnJvcnMvdGFzay1jb25maWd1cmF0aW9uLWVycm9yLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdXRpbHMvdXRpbC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3V0aWxzL2FyZ3VtZW50LWZpbHRlcnMudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi91dGlscy9leGl0LWNvZGVzLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdXRpbHMvZ2l0LW91dHB1dC1zdHJlYW1zLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdXRpbHMvbGluZS1wYXJzZXIudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi91dGlscy9zaW1wbGUtZ2l0LW9wdGlvbnMudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi91dGlscy90YXNrLW9wdGlvbnMudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi91dGlscy90YXNrLXBhcnNlci50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2NoZWNrLWlzLXJlcG8udHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wYXJzZXJzL3BhcnNlLWNsZWFuLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvdGFzay50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2NsZWFuLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcmVzcG9uc2VzL0NvbmZpZ0xpc3QudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9jb25maWcudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9kaWZmLW5hbWUtc3RhdHVzLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvZ3JlcC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL3Jlc2V0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvZ2l0LWxvZ2dlci50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3J1bm5lcnMvdGFza3MtcGVuZGluZy1xdWV1ZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3J1bm5lcnMvZ2l0LWV4ZWN1dG9yLWNoYWluLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcnVubmVycy9naXQtZXhlY3V0b3IudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrLWNhbGxiYWNrLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvY2hhbmdlLXdvcmtpbmctZGlyZWN0b3J5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvY2hlY2tvdXQudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9jbG9uZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BhcnNlcnMvcGFyc2UtY29tbWl0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvY29tbWl0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvY291bnQtb2JqZWN0cy50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2ZpcnN0LWNvbW1pdC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2hhc2gtb2JqZWN0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcmVzcG9uc2VzL0luaXRTdW1tYXJ5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvaW5pdC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2ludGVycHJldC10cmFpbGVycy50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL2FyZ3MvbG9nLWZvcm1hdC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9EaWZmU3VtbWFyeS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BhcnNlcnMvcGFyc2UtZGlmZi1zdW1tYXJ5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGFyc2Vycy9wYXJzZS1saXN0LWxvZy1zdW1tYXJ5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvZGlmZi50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2xvZy50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9NZXJnZVN1bW1hcnkudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9yZXNwb25zZXMvUHVsbFN1bW1hcnkudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wYXJzZXJzL3BhcnNlLXJlbW90ZS1vYmplY3RzLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGFyc2Vycy9wYXJzZS1yZW1vdGUtbWVzc2FnZXMudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wYXJzZXJzL3BhcnNlLXB1bGwudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wYXJzZXJzL3BhcnNlLW1lcmdlLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvbWVyZ2UudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wYXJzZXJzL3BhcnNlLXB1c2gudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9wdXNoLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3Mvc2hvdy50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9GaWxlU3RhdHVzU3VtbWFyeS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9TdGF0dXNTdW1tYXJ5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3Mvc3RhdHVzLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvdmVyc2lvbi50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3NpbXBsZS1naXQtYXBpLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcnVubmVycy9zY2hlZHVsZXIudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9hcHBseS1wYXRjaC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9CcmFuY2hTdW1tYXJ5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGFyc2Vycy9wYXJzZS1icmFuY2gudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9yZXNwb25zZXMvQnJhbmNoRGVsZXRlU3VtbWFyeS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BhcnNlcnMvcGFyc2UtYnJhbmNoLWRlbGV0ZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2JyYW5jaC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2NoZWNrLWlnbm9yZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BhcnNlcnMvcGFyc2UtZmV0Y2gudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9mZXRjaC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BhcnNlcnMvcGFyc2UtbW92ZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL21vdmUudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9wdWxsLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcmVzcG9uc2VzL0dldFJlbW90ZVN1bW1hcnkudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9yZW1vdGUudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9zdGFzaC1saXN0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3Mvc3ViLW1vZHVsZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9UYWdMaXN0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvdGFnLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9naXQubWpzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9hYm9ydC1wbHVnaW4udHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wbHVnaW5zL2FsbG93LWVudmlyb25tZW50LnBsdWdpbi50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BsdWdpbnMvYmxvY2stdW5zYWZlLW9wZXJhdGlvbnMtcGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9jb21tYW5kLWNvbmZpZy1wcmVmaXhpbmctcGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9jb21wbGV0aW9uLWRldGVjdGlvbi5wbHVnaW4udHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wbHVnaW5zL2N1c3RvbS1iaW5hcnkucGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvZXJyb3JzL2dpdC1jb25maWd1cmF0aW9uLWVycm9yLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9lcnJvci1kZXRlY3Rpb24ucGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9pbnB1dC5wbHVnaW4udHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wbHVnaW5zL3BsdWdpbi1zdG9yZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BsdWdpbnMvcHJvZ3Jlc3MtbW9uaXRvci1wbHVnaW4udHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wbHVnaW5zL3NwYXduLW9wdGlvbnMtcGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9zdWZmaXgtcGF0aHMucGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy90aW1lb3V0LXBsdWdpbi50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL2dpdC1mYWN0b3J5LnRzIiwgInNyYy9zeW5jLnRzIiwgInNyYy9kb3dubG9hZC50cyIsICJzcmMvdXBsb2FkLnRzIiwgInNyYy9yZWZyZXNoLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIEhlbHBlcnMuXG4gKi9cblxudmFyIHMgPSAxMDAwO1xudmFyIG0gPSBzICogNjA7XG52YXIgaCA9IG0gKiA2MDtcbnZhciBkID0gaCAqIDI0O1xudmFyIHcgPSBkICogNztcbnZhciB5ID0gZCAqIDM2NS4yNTtcblxuLyoqXG4gKiBQYXJzZSBvciBmb3JtYXQgdGhlIGdpdmVuIGB2YWxgLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogIC0gYGxvbmdgIHZlcmJvc2UgZm9ybWF0dGluZyBbZmFsc2VdXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEB0aHJvd3Mge0Vycm9yfSB0aHJvdyBhbiBlcnJvciBpZiB2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIG51bWJlclxuICogQHJldHVybiB7U3RyaW5nfE51bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWw7XG4gIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBwYXJzZSh2YWwpO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmIGlzRmluaXRlKHZhbCkpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb25nID8gZm10TG9uZyh2YWwpIDogZm10U2hvcnQodmFsKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ3ZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgdmFsaWQgbnVtYmVyLiB2YWw9JyArXG4gICAgICBKU09OLnN0cmluZ2lmeSh2YWwpXG4gICk7XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBgc3RyYCBhbmQgcmV0dXJuIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZShzdHIpIHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChzdHIubGVuZ3RoID4gMTAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBtYXRjaCA9IC9eKC0/KD86XFxkKyk/XFwuP1xcZCspICoobWlsbGlzZWNvbmRzP3xtc2Vjcz98bXN8c2Vjb25kcz98c2Vjcz98c3xtaW51dGVzP3xtaW5zP3xtfGhvdXJzP3xocnM/fGh8ZGF5cz98ZHx3ZWVrcz98d3x5ZWFycz98eXJzP3x5KT8kL2kuZXhlYyhcbiAgICBzdHJcbiAgKTtcbiAgaWYgKCFtYXRjaCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbiA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuICB2YXIgdHlwZSA9IChtYXRjaFsyXSB8fCAnbXMnKS50b0xvd2VyQ2FzZSgpO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgY2FzZSAneWVhcic6XG4gICAgY2FzZSAneXJzJzpcbiAgICBjYXNlICd5cic6XG4gICAgY2FzZSAneSc6XG4gICAgICByZXR1cm4gbiAqIHk7XG4gICAgY2FzZSAnd2Vla3MnOlxuICAgIGNhc2UgJ3dlZWsnOlxuICAgIGNhc2UgJ3cnOlxuICAgICAgcmV0dXJuIG4gKiB3O1xuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZCc6XG4gICAgICByZXR1cm4gbiAqIGQ7XG4gICAgY2FzZSAnaG91cnMnOlxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hycyc6XG4gICAgY2FzZSAnaHInOlxuICAgIGNhc2UgJ2gnOlxuICAgICAgcmV0dXJuIG4gKiBoO1xuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgY2FzZSAnbWlucyc6XG4gICAgY2FzZSAnbWluJzpcbiAgICBjYXNlICdtJzpcbiAgICAgIHJldHVybiBuICogbTtcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICBjYXNlICdzZWNvbmQnOlxuICAgIGNhc2UgJ3NlY3MnOlxuICAgIGNhc2UgJ3NlYyc6XG4gICAgY2FzZSAncyc6XG4gICAgICByZXR1cm4gbiAqIHM7XG4gICAgY2FzZSAnbWlsbGlzZWNvbmRzJzpcbiAgICBjYXNlICdtaWxsaXNlY29uZCc6XG4gICAgY2FzZSAnbXNlY3MnOlxuICAgIGNhc2UgJ21zZWMnOlxuICAgIGNhc2UgJ21zJzpcbiAgICAgIHJldHVybiBuO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbi8qKlxuICogU2hvcnQgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10U2hvcnQobXMpIHtcbiAgdmFyIG1zQWJzID0gTWF0aC5hYnMobXMpO1xuICBpZiAobXNBYnMgPj0gZCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gZCkgKyAnZCc7XG4gIH1cbiAgaWYgKG1zQWJzID49IGgpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGgpICsgJ2gnO1xuICB9XG4gIGlmIChtc0FicyA+PSBtKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBtKSArICdtJztcbiAgfVxuICBpZiAobXNBYnMgPj0gcykge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gcykgKyAncyc7XG4gIH1cbiAgcmV0dXJuIG1zICsgJ21zJztcbn1cblxuLyoqXG4gKiBMb25nIGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdExvbmcobXMpIHtcbiAgdmFyIG1zQWJzID0gTWF0aC5hYnMobXMpO1xuICBpZiAobXNBYnMgPj0gZCkge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBkLCAnZGF5Jyk7XG4gIH1cbiAgaWYgKG1zQWJzID49IGgpIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgaCwgJ2hvdXInKTtcbiAgfVxuICBpZiAobXNBYnMgPj0gbSkge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBtLCAnbWludXRlJyk7XG4gIH1cbiAgaWYgKG1zQWJzID49IHMpIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgcywgJ3NlY29uZCcpO1xuICB9XG4gIHJldHVybiBtcyArICcgbXMnO1xufVxuXG4vKipcbiAqIFBsdXJhbGl6YXRpb24gaGVscGVyLlxuICovXG5cbmZ1bmN0aW9uIHBsdXJhbChtcywgbXNBYnMsIG4sIG5hbWUpIHtcbiAgdmFyIGlzUGx1cmFsID0gbXNBYnMgPj0gbiAqIDEuNTtcbiAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBuKSArICcgJyArIG5hbWUgKyAoaXNQbHVyYWwgPyAncycgOiAnJyk7XG59XG4iLCAiXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNvbW1vbiBsb2dpYyBmb3IgYm90aCB0aGUgTm9kZS5qcyBhbmQgd2ViIGJyb3dzZXJcbiAqIGltcGxlbWVudGF0aW9ucyBvZiBgZGVidWcoKWAuXG4gKi9cblxuZnVuY3Rpb24gc2V0dXAoZW52KSB7XG5cdGNyZWF0ZURlYnVnLmRlYnVnID0gY3JlYXRlRGVidWc7XG5cdGNyZWF0ZURlYnVnLmRlZmF1bHQgPSBjcmVhdGVEZWJ1Zztcblx0Y3JlYXRlRGVidWcuY29lcmNlID0gY29lcmNlO1xuXHRjcmVhdGVEZWJ1Zy5kaXNhYmxlID0gZGlzYWJsZTtcblx0Y3JlYXRlRGVidWcuZW5hYmxlID0gZW5hYmxlO1xuXHRjcmVhdGVEZWJ1Zy5lbmFibGVkID0gZW5hYmxlZDtcblx0Y3JlYXRlRGVidWcuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXHRjcmVhdGVEZWJ1Zy5kZXN0cm95ID0gZGVzdHJveTtcblxuXHRPYmplY3Qua2V5cyhlbnYpLmZvckVhY2goa2V5ID0+IHtcblx0XHRjcmVhdGVEZWJ1Z1trZXldID0gZW52W2tleV07XG5cdH0pO1xuXG5cdC8qKlxuXHQqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuXHQqL1xuXG5cdGNyZWF0ZURlYnVnLm5hbWVzID0gW107XG5cdGNyZWF0ZURlYnVnLnNraXBzID0gW107XG5cblx0LyoqXG5cdCogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuXHQqXG5cdCogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXIgb3IgdXBwZXItY2FzZSBsZXR0ZXIsIGkuZS4gXCJuXCIgYW5kIFwiTlwiLlxuXHQqL1xuXHRjcmVhdGVEZWJ1Zy5mb3JtYXR0ZXJzID0ge307XG5cblx0LyoqXG5cdCogU2VsZWN0cyBhIGNvbG9yIGZvciBhIGRlYnVnIG5hbWVzcGFjZVxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2UgVGhlIG5hbWVzcGFjZSBzdHJpbmcgZm9yIHRoZSBkZWJ1ZyBpbnN0YW5jZSB0byBiZSBjb2xvcmVkXG5cdCogQHJldHVybiB7TnVtYmVyfFN0cmluZ30gQW4gQU5TSSBjb2xvciBjb2RlIGZvciB0aGUgZ2l2ZW4gbmFtZXNwYWNlXG5cdCogQGFwaSBwcml2YXRlXG5cdCovXG5cdGZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuXHRcdGxldCBoYXNoID0gMDtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXNwYWNlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcblx0XHRcdGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNyZWF0ZURlYnVnLmNvbG9yc1tNYXRoLmFicyhoYXNoKSAlIGNyZWF0ZURlYnVnLmNvbG9ycy5sZW5ndGhdO1xuXHR9XG5cdGNyZWF0ZURlYnVnLnNlbGVjdENvbG9yID0gc2VsZWN0Q29sb3I7XG5cblx0LyoqXG5cdCogQ3JlYXRlIGEgZGVidWdnZXIgd2l0aCB0aGUgZ2l2ZW4gYG5hbWVzcGFjZWAuXG5cdCpcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG5cdCogQHJldHVybiB7RnVuY3Rpb259XG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cdFx0bGV0IHByZXZUaW1lO1xuXHRcdGxldCBlbmFibGVPdmVycmlkZSA9IG51bGw7XG5cdFx0bGV0IG5hbWVzcGFjZXNDYWNoZTtcblx0XHRsZXQgZW5hYmxlZENhY2hlO1xuXG5cdFx0ZnVuY3Rpb24gZGVidWcoLi4uYXJncykge1xuXHRcdFx0Ly8gRGlzYWJsZWQ/XG5cdFx0XHRpZiAoIWRlYnVnLmVuYWJsZWQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBzZWxmID0gZGVidWc7XG5cblx0XHRcdC8vIFNldCBgZGlmZmAgdGltZXN0YW1wXG5cdFx0XHRjb25zdCBjdXJyID0gTnVtYmVyKG5ldyBEYXRlKCkpO1xuXHRcdFx0Y29uc3QgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuXHRcdFx0c2VsZi5kaWZmID0gbXM7XG5cdFx0XHRzZWxmLnByZXYgPSBwcmV2VGltZTtcblx0XHRcdHNlbGYuY3VyciA9IGN1cnI7XG5cdFx0XHRwcmV2VGltZSA9IGN1cnI7XG5cblx0XHRcdGFyZ3NbMF0gPSBjcmVhdGVEZWJ1Zy5jb2VyY2UoYXJnc1swXSk7XG5cblx0XHRcdGlmICh0eXBlb2YgYXJnc1swXSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdFx0Ly8gQW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJU9cblx0XHRcdFx0YXJncy51bnNoaWZ0KCclTycpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBcHBseSBhbnkgYGZvcm1hdHRlcnNgIHRyYW5zZm9ybWF0aW9uc1xuXHRcdFx0bGV0IGluZGV4ID0gMDtcblx0XHRcdGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCAobWF0Y2gsIGZvcm1hdCkgPT4ge1xuXHRcdFx0XHQvLyBJZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG5cdFx0XHRcdGlmIChtYXRjaCA9PT0gJyUlJykge1xuXHRcdFx0XHRcdHJldHVybiAnJSc7XG5cdFx0XHRcdH1cblx0XHRcdFx0aW5kZXgrKztcblx0XHRcdFx0Y29uc3QgZm9ybWF0dGVyID0gY3JlYXRlRGVidWcuZm9ybWF0dGVyc1tmb3JtYXRdO1xuXHRcdFx0XHRpZiAodHlwZW9mIGZvcm1hdHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdGNvbnN0IHZhbCA9IGFyZ3NbaW5kZXhdO1xuXHRcdFx0XHRcdG1hdGNoID0gZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsKTtcblxuXHRcdFx0XHRcdC8vIE5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcblx0XHRcdFx0XHRhcmdzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRcdFx0aW5kZXgtLTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gbWF0Y2g7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gQXBwbHkgZW52LXNwZWNpZmljIGZvcm1hdHRpbmcgKGNvbG9ycywgZXRjLilcblx0XHRcdGNyZWF0ZURlYnVnLmZvcm1hdEFyZ3MuY2FsbChzZWxmLCBhcmdzKTtcblxuXHRcdFx0Y29uc3QgbG9nRm4gPSBzZWxmLmxvZyB8fCBjcmVhdGVEZWJ1Zy5sb2c7XG5cdFx0XHRsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcblx0XHR9XG5cblx0XHRkZWJ1Zy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG5cdFx0ZGVidWcudXNlQ29sb3JzID0gY3JlYXRlRGVidWcudXNlQ29sb3JzKCk7XG5cdFx0ZGVidWcuY29sb3IgPSBjcmVhdGVEZWJ1Zy5zZWxlY3RDb2xvcihuYW1lc3BhY2UpO1xuXHRcdGRlYnVnLmV4dGVuZCA9IGV4dGVuZDtcblx0XHRkZWJ1Zy5kZXN0cm95ID0gY3JlYXRlRGVidWcuZGVzdHJveTsgLy8gWFhYIFRlbXBvcmFyeS4gV2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UuXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVidWcsICdlbmFibGVkJywge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHRnZXQ6ICgpID0+IHtcblx0XHRcdFx0aWYgKGVuYWJsZU92ZXJyaWRlICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVuYWJsZU92ZXJyaWRlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChuYW1lc3BhY2VzQ2FjaGUgIT09IGNyZWF0ZURlYnVnLm5hbWVzcGFjZXMpIHtcblx0XHRcdFx0XHRuYW1lc3BhY2VzQ2FjaGUgPSBjcmVhdGVEZWJ1Zy5uYW1lc3BhY2VzO1xuXHRcdFx0XHRcdGVuYWJsZWRDYWNoZSA9IGNyZWF0ZURlYnVnLmVuYWJsZWQobmFtZXNwYWNlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBlbmFibGVkQ2FjaGU7XG5cdFx0XHR9LFxuXHRcdFx0c2V0OiB2ID0+IHtcblx0XHRcdFx0ZW5hYmxlT3ZlcnJpZGUgPSB2O1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gRW52LXNwZWNpZmljIGluaXRpYWxpemF0aW9uIGxvZ2ljIGZvciBkZWJ1ZyBpbnN0YW5jZXNcblx0XHRpZiAodHlwZW9mIGNyZWF0ZURlYnVnLmluaXQgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdGNyZWF0ZURlYnVnLmluaXQoZGVidWcpO1xuXHRcdH1cblxuXHRcdHJldHVybiBkZWJ1Zztcblx0fVxuXG5cdGZ1bmN0aW9uIGV4dGVuZChuYW1lc3BhY2UsIGRlbGltaXRlcikge1xuXHRcdGNvbnN0IG5ld0RlYnVnID0gY3JlYXRlRGVidWcodGhpcy5uYW1lc3BhY2UgKyAodHlwZW9mIGRlbGltaXRlciA9PT0gJ3VuZGVmaW5lZCcgPyAnOicgOiBkZWxpbWl0ZXIpICsgbmFtZXNwYWNlKTtcblx0XHRuZXdEZWJ1Zy5sb2cgPSB0aGlzLmxvZztcblx0XHRyZXR1cm4gbmV3RGVidWc7XG5cdH1cblxuXHQvKipcblx0KiBFbmFibGVzIGEgZGVidWcgbW9kZSBieSBuYW1lc3BhY2VzLiBUaGlzIGNhbiBpbmNsdWRlIG1vZGVzXG5cdCogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cblx0KlxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcblx0XHRjcmVhdGVEZWJ1Zy5zYXZlKG5hbWVzcGFjZXMpO1xuXHRcdGNyZWF0ZURlYnVnLm5hbWVzcGFjZXMgPSBuYW1lc3BhY2VzO1xuXG5cdFx0Y3JlYXRlRGVidWcubmFtZXMgPSBbXTtcblx0XHRjcmVhdGVEZWJ1Zy5za2lwcyA9IFtdO1xuXG5cdFx0Y29uc3Qgc3BsaXQgPSAodHlwZW9mIG5hbWVzcGFjZXMgPT09ICdzdHJpbmcnID8gbmFtZXNwYWNlcyA6ICcnKVxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL1xccysvZywgJywnKVxuXHRcdFx0LnNwbGl0KCcsJylcblx0XHRcdC5maWx0ZXIoQm9vbGVhbik7XG5cblx0XHRmb3IgKGNvbnN0IG5zIG9mIHNwbGl0KSB7XG5cdFx0XHRpZiAobnNbMF0gPT09ICctJykge1xuXHRcdFx0XHRjcmVhdGVEZWJ1Zy5za2lwcy5wdXNoKG5zLnNsaWNlKDEpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNyZWF0ZURlYnVnLm5hbWVzLnB1c2gobnMpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVja3MgaWYgdGhlIGdpdmVuIHN0cmluZyBtYXRjaGVzIGEgbmFtZXNwYWNlIHRlbXBsYXRlLCBob25vcmluZ1xuXHQgKiBhc3Rlcmlza3MgYXMgd2lsZGNhcmRzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc2VhcmNoXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0ZW1wbGF0ZVxuXHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHQgKi9cblx0ZnVuY3Rpb24gbWF0Y2hlc1RlbXBsYXRlKHNlYXJjaCwgdGVtcGxhdGUpIHtcblx0XHRsZXQgc2VhcmNoSW5kZXggPSAwO1xuXHRcdGxldCB0ZW1wbGF0ZUluZGV4ID0gMDtcblx0XHRsZXQgc3RhckluZGV4ID0gLTE7XG5cdFx0bGV0IG1hdGNoSW5kZXggPSAwO1xuXG5cdFx0d2hpbGUgKHNlYXJjaEluZGV4IDwgc2VhcmNoLmxlbmd0aCkge1xuXHRcdFx0aWYgKHRlbXBsYXRlSW5kZXggPCB0ZW1wbGF0ZS5sZW5ndGggJiYgKHRlbXBsYXRlW3RlbXBsYXRlSW5kZXhdID09PSBzZWFyY2hbc2VhcmNoSW5kZXhdIHx8IHRlbXBsYXRlW3RlbXBsYXRlSW5kZXhdID09PSAnKicpKSB7XG5cdFx0XHRcdC8vIE1hdGNoIGNoYXJhY3RlciBvciBwcm9jZWVkIHdpdGggd2lsZGNhcmRcblx0XHRcdFx0aWYgKHRlbXBsYXRlW3RlbXBsYXRlSW5kZXhdID09PSAnKicpIHtcblx0XHRcdFx0XHRzdGFySW5kZXggPSB0ZW1wbGF0ZUluZGV4O1xuXHRcdFx0XHRcdG1hdGNoSW5kZXggPSBzZWFyY2hJbmRleDtcblx0XHRcdFx0XHR0ZW1wbGF0ZUluZGV4Kys7IC8vIFNraXAgdGhlICcqJ1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNlYXJjaEluZGV4Kys7XG5cdFx0XHRcdFx0dGVtcGxhdGVJbmRleCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHN0YXJJbmRleCAhPT0gLTEpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZWdhdGVkLWNvbmRpdGlvblxuXHRcdFx0XHQvLyBCYWNrdHJhY2sgdG8gdGhlIGxhc3QgJyonIGFuZCB0cnkgdG8gbWF0Y2ggbW9yZSBjaGFyYWN0ZXJzXG5cdFx0XHRcdHRlbXBsYXRlSW5kZXggPSBzdGFySW5kZXggKyAxO1xuXHRcdFx0XHRtYXRjaEluZGV4Kys7XG5cdFx0XHRcdHNlYXJjaEluZGV4ID0gbWF0Y2hJbmRleDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTsgLy8gTm8gbWF0Y2hcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBIYW5kbGUgdHJhaWxpbmcgJyonIGluIHRlbXBsYXRlXG5cdFx0d2hpbGUgKHRlbXBsYXRlSW5kZXggPCB0ZW1wbGF0ZS5sZW5ndGggJiYgdGVtcGxhdGVbdGVtcGxhdGVJbmRleF0gPT09ICcqJykge1xuXHRcdFx0dGVtcGxhdGVJbmRleCsrO1xuXHRcdH1cblxuXHRcdHJldHVybiB0ZW1wbGF0ZUluZGV4ID09PSB0ZW1wbGF0ZS5sZW5ndGg7XG5cdH1cblxuXHQvKipcblx0KiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cblx0KlxuXHQqIEByZXR1cm4ge1N0cmluZ30gbmFtZXNwYWNlc1xuXHQqIEBhcGkgcHVibGljXG5cdCovXG5cdGZ1bmN0aW9uIGRpc2FibGUoKSB7XG5cdFx0Y29uc3QgbmFtZXNwYWNlcyA9IFtcblx0XHRcdC4uLmNyZWF0ZURlYnVnLm5hbWVzLFxuXHRcdFx0Li4uY3JlYXRlRGVidWcuc2tpcHMubWFwKG5hbWVzcGFjZSA9PiAnLScgKyBuYW1lc3BhY2UpXG5cdFx0XS5qb2luKCcsJyk7XG5cdFx0Y3JlYXRlRGVidWcuZW5hYmxlKCcnKTtcblx0XHRyZXR1cm4gbmFtZXNwYWNlcztcblx0fVxuXG5cdC8qKlxuXHQqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbW9kZSBuYW1lIGlzIGVuYWJsZWQsIGZhbHNlIG90aGVyd2lzZS5cblx0KlxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG5cdCogQHJldHVybiB7Qm9vbGVhbn1cblx0KiBAYXBpIHB1YmxpY1xuXHQqL1xuXHRmdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcblx0XHRmb3IgKGNvbnN0IHNraXAgb2YgY3JlYXRlRGVidWcuc2tpcHMpIHtcblx0XHRcdGlmIChtYXRjaGVzVGVtcGxhdGUobmFtZSwgc2tpcCkpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAoY29uc3QgbnMgb2YgY3JlYXRlRGVidWcubmFtZXMpIHtcblx0XHRcdGlmIChtYXRjaGVzVGVtcGxhdGUobmFtZSwgbnMpKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQqIENvZXJjZSBgdmFsYC5cblx0KlxuXHQqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuXHQqIEByZXR1cm4ge01peGVkfVxuXHQqIEBhcGkgcHJpdmF0ZVxuXHQqL1xuXHRmdW5jdGlvbiBjb2VyY2UodmFsKSB7XG5cdFx0aWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0XHRyZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsO1xuXHR9XG5cblx0LyoqXG5cdCogWFhYIERPIE5PVCBVU0UuIFRoaXMgaXMgYSB0ZW1wb3Jhcnkgc3R1YiBmdW5jdGlvbi5cblx0KiBYWFggSXQgV0lMTCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UuXG5cdCovXG5cdGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG5cdFx0Y29uc29sZS53YXJuKCdJbnN0YW5jZSBtZXRob2QgYGRlYnVnLmRlc3Ryb3koKWAgaXMgZGVwcmVjYXRlZCBhbmQgbm8gbG9uZ2VyIGRvZXMgYW55dGhpbmcuIEl0IHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uIG9mIGBkZWJ1Z2AuJyk7XG5cdH1cblxuXHRjcmVhdGVEZWJ1Zy5lbmFibGUoY3JlYXRlRGVidWcubG9hZCgpKTtcblxuXHRyZXR1cm4gY3JlYXRlRGVidWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0dXA7XG4iLCAiLyogZXNsaW50LWVudiBicm93c2VyICovXG5cbi8qKlxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuZXhwb3J0cy5zdG9yYWdlID0gbG9jYWxzdG9yYWdlKCk7XG5leHBvcnRzLmRlc3Ryb3kgPSAoKCkgPT4ge1xuXHRsZXQgd2FybmVkID0gZmFsc2U7XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRpZiAoIXdhcm5lZCkge1xuXHRcdFx0d2FybmVkID0gdHJ1ZTtcblx0XHRcdGNvbnNvbGUud2FybignSW5zdGFuY2UgbWV0aG9kIGBkZWJ1Zy5kZXN0cm95KClgIGlzIGRlcHJlY2F0ZWQgYW5kIG5vIGxvbmdlciBkb2VzIGFueXRoaW5nLiBJdCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbiBvZiBgZGVidWdgLicpO1xuXHRcdH1cblx0fTtcbn0pKCk7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gW1xuXHQnIzAwMDBDQycsXG5cdCcjMDAwMEZGJyxcblx0JyMwMDMzQ0MnLFxuXHQnIzAwMzNGRicsXG5cdCcjMDA2NkNDJyxcblx0JyMwMDY2RkYnLFxuXHQnIzAwOTlDQycsXG5cdCcjMDA5OUZGJyxcblx0JyMwMENDMDAnLFxuXHQnIzAwQ0MzMycsXG5cdCcjMDBDQzY2Jyxcblx0JyMwMENDOTknLFxuXHQnIzAwQ0NDQycsXG5cdCcjMDBDQ0ZGJyxcblx0JyMzMzAwQ0MnLFxuXHQnIzMzMDBGRicsXG5cdCcjMzMzM0NDJyxcblx0JyMzMzMzRkYnLFxuXHQnIzMzNjZDQycsXG5cdCcjMzM2NkZGJyxcblx0JyMzMzk5Q0MnLFxuXHQnIzMzOTlGRicsXG5cdCcjMzNDQzAwJyxcblx0JyMzM0NDMzMnLFxuXHQnIzMzQ0M2NicsXG5cdCcjMzNDQzk5Jyxcblx0JyMzM0NDQ0MnLFxuXHQnIzMzQ0NGRicsXG5cdCcjNjYwMENDJyxcblx0JyM2NjAwRkYnLFxuXHQnIzY2MzNDQycsXG5cdCcjNjYzM0ZGJyxcblx0JyM2NkNDMDAnLFxuXHQnIzY2Q0MzMycsXG5cdCcjOTkwMENDJyxcblx0JyM5OTAwRkYnLFxuXHQnIzk5MzNDQycsXG5cdCcjOTkzM0ZGJyxcblx0JyM5OUNDMDAnLFxuXHQnIzk5Q0MzMycsXG5cdCcjQ0MwMDAwJyxcblx0JyNDQzAwMzMnLFxuXHQnI0NDMDA2NicsXG5cdCcjQ0MwMDk5Jyxcblx0JyNDQzAwQ0MnLFxuXHQnI0NDMDBGRicsXG5cdCcjQ0MzMzAwJyxcblx0JyNDQzMzMzMnLFxuXHQnI0NDMzM2NicsXG5cdCcjQ0MzMzk5Jyxcblx0JyNDQzMzQ0MnLFxuXHQnI0NDMzNGRicsXG5cdCcjQ0M2NjAwJyxcblx0JyNDQzY2MzMnLFxuXHQnI0NDOTkwMCcsXG5cdCcjQ0M5OTMzJyxcblx0JyNDQ0NDMDAnLFxuXHQnI0NDQ0MzMycsXG5cdCcjRkYwMDAwJyxcblx0JyNGRjAwMzMnLFxuXHQnI0ZGMDA2NicsXG5cdCcjRkYwMDk5Jyxcblx0JyNGRjAwQ0MnLFxuXHQnI0ZGMDBGRicsXG5cdCcjRkYzMzAwJyxcblx0JyNGRjMzMzMnLFxuXHQnI0ZGMzM2NicsXG5cdCcjRkYzMzk5Jyxcblx0JyNGRjMzQ0MnLFxuXHQnI0ZGMzNGRicsXG5cdCcjRkY2NjAwJyxcblx0JyNGRjY2MzMnLFxuXHQnI0ZGOTkwMCcsXG5cdCcjRkY5OTMzJyxcblx0JyNGRkNDMDAnLFxuXHQnI0ZGQ0MzMydcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbmZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcblx0Ly8gTkI6IEluIGFuIEVsZWN0cm9uIHByZWxvYWQgc2NyaXB0LCBkb2N1bWVudCB3aWxsIGJlIGRlZmluZWQgYnV0IG5vdCBmdWxseVxuXHQvLyBpbml0aWFsaXplZC4gU2luY2Ugd2Uga25vdyB3ZSdyZSBpbiBDaHJvbWUsIHdlJ2xsIGp1c3QgZGV0ZWN0IHRoaXMgY2FzZVxuXHQvLyBleHBsaWNpdGx5XG5cdGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucHJvY2VzcyAmJiAod2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJyB8fCB3aW5kb3cucHJvY2Vzcy5fX253anMpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvLyBJbnRlcm5ldCBFeHBsb3JlciBhbmQgRWRnZSBkbyBub3Qgc3VwcG9ydCBjb2xvcnMuXG5cdGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvKGVkZ2V8dHJpZGVudClcXC8oXFxkKykvKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGxldCBtO1xuXG5cdC8vIElzIHdlYmtpdD8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY0NTk2MDYvMzc2NzczXG5cdC8vIGRvY3VtZW50IGlzIHVuZGVmaW5lZCBpbiByZWFjdC1uYXRpdmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvcHVsbC8xNjMyXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXR1cm4tYXNzaWduXG5cdHJldHVybiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5XZWJraXRBcHBlYXJhbmNlKSB8fFxuXHRcdC8vIElzIGZpcmVidWc/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM5ODEyMC8zNzY3NzNcblx0XHQodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNvbnNvbGUgJiYgKHdpbmRvdy5jb25zb2xlLmZpcmVidWcgfHwgKHdpbmRvdy5jb25zb2xlLmV4Y2VwdGlvbiAmJiB3aW5kb3cuY29uc29sZS50YWJsZSkpKSB8fFxuXHRcdC8vIElzIGZpcmVmb3ggPj0gdjMxP1xuXHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuXHRcdCh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIChtID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykpICYmIHBhcnNlSW50KG1bMV0sIDEwKSA+PSAzMSkgfHxcblx0XHQvLyBEb3VibGUgY2hlY2sgd2Via2l0IGluIHVzZXJBZ2VudCBqdXN0IGluIGNhc2Ugd2UgYXJlIGluIGEgd29ya2VyXG5cdFx0KHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9hcHBsZXdlYmtpdFxcLyhcXGQrKS8pKTtcbn1cblxuLyoqXG4gKiBDb2xvcml6ZSBsb2cgYXJndW1lbnRzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcblx0YXJnc1swXSA9ICh0aGlzLnVzZUNvbG9ycyA/ICclYycgOiAnJykgK1xuXHRcdHRoaXMubmFtZXNwYWNlICtcblx0XHQodGhpcy51c2VDb2xvcnMgPyAnICVjJyA6ICcgJykgK1xuXHRcdGFyZ3NbMF0gK1xuXHRcdCh0aGlzLnVzZUNvbG9ycyA/ICclYyAnIDogJyAnKSArXG5cdFx0JysnICsgbW9kdWxlLmV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtcblxuXHRpZiAoIXRoaXMudXNlQ29sb3JzKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG5cdGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpO1xuXG5cdC8vIFRoZSBmaW5hbCBcIiVjXCIgaXMgc29tZXdoYXQgdHJpY2t5LCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyXG5cdC8vIGFyZ3VtZW50cyBwYXNzZWQgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgJWMsIHNvIHdlIG5lZWQgdG9cblx0Ly8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBpbmRleCB0byBpbnNlcnQgdGhlIENTUyBpbnRvXG5cdGxldCBpbmRleCA9IDA7XG5cdGxldCBsYXN0QyA9IDA7XG5cdGFyZ3NbMF0ucmVwbGFjZSgvJVthLXpBLVolXS9nLCBtYXRjaCA9PiB7XG5cdFx0aWYgKG1hdGNoID09PSAnJSUnKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGluZGV4Kys7XG5cdFx0aWYgKG1hdGNoID09PSAnJWMnKSB7XG5cdFx0XHQvLyBXZSBvbmx5IGFyZSBpbnRlcmVzdGVkIGluIHRoZSAqbGFzdCogJWNcblx0XHRcdC8vICh0aGUgdXNlciBtYXkgaGF2ZSBwcm92aWRlZCB0aGVpciBvd24pXG5cdFx0XHRsYXN0QyA9IGluZGV4O1xuXHRcdH1cblx0fSk7XG5cblx0YXJncy5zcGxpY2UobGFzdEMsIDAsIGMpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYGNvbnNvbGUuZGVidWcoKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmRlYnVnYCBpcyBub3QgYSBcImZ1bmN0aW9uXCIuXG4gKiBJZiBgY29uc29sZS5kZWJ1Z2AgaXMgbm90IGF2YWlsYWJsZSwgZmFsbHMgYmFja1xuICogdG8gYGNvbnNvbGUubG9nYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnRzLmxvZyA9IGNvbnNvbGUuZGVidWcgfHwgY29uc29sZS5sb2cgfHwgKCgpID0+IHt9KTtcblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNhdmUobmFtZXNwYWNlcykge1xuXHR0cnkge1xuXHRcdGlmIChuYW1lc3BhY2VzKSB7XG5cdFx0XHRleHBvcnRzLnN0b3JhZ2Uuc2V0SXRlbSgnZGVidWcnLCBuYW1lc3BhY2VzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFN3YWxsb3dcblx0XHQvLyBYWFggKEBRaXgtKSBzaG91bGQgd2UgYmUgbG9nZ2luZyB0aGVzZT9cblx0fVxufVxuXG4vKipcbiAqIExvYWQgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gcmV0dXJucyB0aGUgcHJldmlvdXNseSBwZXJzaXN0ZWQgZGVidWcgbW9kZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsb2FkKCkge1xuXHRsZXQgcjtcblx0dHJ5IHtcblx0XHRyID0gZXhwb3J0cy5zdG9yYWdlLmdldEl0ZW0oJ2RlYnVnJykgfHwgZXhwb3J0cy5zdG9yYWdlLmdldEl0ZW0oJ0RFQlVHJykgO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFN3YWxsb3dcblx0XHQvLyBYWFggKEBRaXgtKSBzaG91bGQgd2UgYmUgbG9nZ2luZyB0aGVzZT9cblx0fVxuXG5cdC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcblx0aWYgKCFyICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAnZW52JyBpbiBwcm9jZXNzKSB7XG5cdFx0ciA9IHByb2Nlc3MuZW52LkRFQlVHO1xuXHR9XG5cblx0cmV0dXJuIHI7XG59XG5cbi8qKlxuICogTG9jYWxzdG9yYWdlIGF0dGVtcHRzIHRvIHJldHVybiB0aGUgbG9jYWxzdG9yYWdlLlxuICpcbiAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugc2FmYXJpIHRocm93c1xuICogd2hlbiBhIHVzZXIgZGlzYWJsZXMgY29va2llcy9sb2NhbHN0b3JhZ2VcbiAqIGFuZCB5b3UgYXR0ZW1wdCB0byBhY2Nlc3MgaXQuXG4gKlxuICogQHJldHVybiB7TG9jYWxTdG9yYWdlfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9jYWxzdG9yYWdlKCkge1xuXHR0cnkge1xuXHRcdC8vIFRWTUxLaXQgKEFwcGxlIFRWIEpTIFJ1bnRpbWUpIGRvZXMgbm90IGhhdmUgYSB3aW5kb3cgb2JqZWN0LCBqdXN0IGxvY2FsU3RvcmFnZSBpbiB0aGUgZ2xvYmFsIGNvbnRleHRcblx0XHQvLyBUaGUgQnJvd3NlciBhbHNvIGhhcyBsb2NhbFN0b3JhZ2UgaW4gdGhlIGdsb2JhbCBjb250ZXh0LlxuXHRcdHJldHVybiBsb2NhbFN0b3JhZ2U7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Ly8gU3dhbGxvd1xuXHRcdC8vIFhYWCAoQFFpeC0pIHNob3VsZCB3ZSBiZSBsb2dnaW5nIHRoZXNlP1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb21tb24nKShleHBvcnRzKTtcblxuY29uc3Qge2Zvcm1hdHRlcnN9ID0gbW9kdWxlLmV4cG9ydHM7XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmZvcm1hdHRlcnMuaiA9IGZ1bmN0aW9uICh2KSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdHJldHVybiAnW1VuZXhwZWN0ZWRKU09OUGFyc2VFcnJvcl06ICcgKyBlcnJvci5tZXNzYWdlO1xuXHR9XG59O1xuIiwgIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5jb25zdCB0dHkgPSByZXF1aXJlKCd0dHknKTtcbmNvbnN0IHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgTm9kZS5qcyBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKi9cblxuZXhwb3J0cy5pbml0ID0gaW5pdDtcbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLmRlc3Ryb3kgPSB1dGlsLmRlcHJlY2F0ZShcblx0KCkgPT4ge30sXG5cdCdJbnN0YW5jZSBtZXRob2QgYGRlYnVnLmRlc3Ryb3koKWAgaXMgZGVwcmVjYXRlZCBhbmQgbm8gbG9uZ2VyIGRvZXMgYW55dGhpbmcuIEl0IHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uIG9mIGBkZWJ1Z2AuJ1xuKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbNiwgMiwgMywgNCwgNSwgMV07XG5cbnRyeSB7XG5cdC8vIE9wdGlvbmFsIGRlcGVuZGVuY3kgKGFzIGluLCBkb2Vzbid0IG5lZWQgdG8gYmUgaW5zdGFsbGVkLCBOT1QgbGlrZSBvcHRpb25hbERlcGVuZGVuY2llcyBpbiBwYWNrYWdlLmpzb24pXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXNcblx0Y29uc3Qgc3VwcG9ydHNDb2xvciA9IHJlcXVpcmUoJ3N1cHBvcnRzLWNvbG9yJyk7XG5cblx0aWYgKHN1cHBvcnRzQ29sb3IgJiYgKHN1cHBvcnRzQ29sb3Iuc3RkZXJyIHx8IHN1cHBvcnRzQ29sb3IpLmxldmVsID49IDIpIHtcblx0XHRleHBvcnRzLmNvbG9ycyA9IFtcblx0XHRcdDIwLFxuXHRcdFx0MjEsXG5cdFx0XHQyNixcblx0XHRcdDI3LFxuXHRcdFx0MzIsXG5cdFx0XHQzMyxcblx0XHRcdDM4LFxuXHRcdFx0MzksXG5cdFx0XHQ0MCxcblx0XHRcdDQxLFxuXHRcdFx0NDIsXG5cdFx0XHQ0Myxcblx0XHRcdDQ0LFxuXHRcdFx0NDUsXG5cdFx0XHQ1Nixcblx0XHRcdDU3LFxuXHRcdFx0NjIsXG5cdFx0XHQ2Myxcblx0XHRcdDY4LFxuXHRcdFx0NjksXG5cdFx0XHQ3NCxcblx0XHRcdDc1LFxuXHRcdFx0NzYsXG5cdFx0XHQ3Nyxcblx0XHRcdDc4LFxuXHRcdFx0NzksXG5cdFx0XHQ4MCxcblx0XHRcdDgxLFxuXHRcdFx0OTIsXG5cdFx0XHQ5Myxcblx0XHRcdDk4LFxuXHRcdFx0OTksXG5cdFx0XHQxMTIsXG5cdFx0XHQxMTMsXG5cdFx0XHQxMjgsXG5cdFx0XHQxMjksXG5cdFx0XHQxMzQsXG5cdFx0XHQxMzUsXG5cdFx0XHQxNDgsXG5cdFx0XHQxNDksXG5cdFx0XHQxNjAsXG5cdFx0XHQxNjEsXG5cdFx0XHQxNjIsXG5cdFx0XHQxNjMsXG5cdFx0XHQxNjQsXG5cdFx0XHQxNjUsXG5cdFx0XHQxNjYsXG5cdFx0XHQxNjcsXG5cdFx0XHQxNjgsXG5cdFx0XHQxNjksXG5cdFx0XHQxNzAsXG5cdFx0XHQxNzEsXG5cdFx0XHQxNzIsXG5cdFx0XHQxNzMsXG5cdFx0XHQxNzgsXG5cdFx0XHQxNzksXG5cdFx0XHQxODQsXG5cdFx0XHQxODUsXG5cdFx0XHQxOTYsXG5cdFx0XHQxOTcsXG5cdFx0XHQxOTgsXG5cdFx0XHQxOTksXG5cdFx0XHQyMDAsXG5cdFx0XHQyMDEsXG5cdFx0XHQyMDIsXG5cdFx0XHQyMDMsXG5cdFx0XHQyMDQsXG5cdFx0XHQyMDUsXG5cdFx0XHQyMDYsXG5cdFx0XHQyMDcsXG5cdFx0XHQyMDgsXG5cdFx0XHQyMDksXG5cdFx0XHQyMTQsXG5cdFx0XHQyMTUsXG5cdFx0XHQyMjAsXG5cdFx0XHQyMjFcblx0XHRdO1xuXHR9XG59IGNhdGNoIChlcnJvcikge1xuXHQvLyBTd2FsbG93IC0gd2Ugb25seSBjYXJlIGlmIGBzdXBwb3J0cy1jb2xvcmAgaXMgYXZhaWxhYmxlOyBpdCBkb2Vzbid0IGhhdmUgdG8gYmUuXG59XG5cbi8qKlxuICogQnVpbGQgdXAgdGhlIGRlZmF1bHQgYGluc3BlY3RPcHRzYCBvYmplY3QgZnJvbSB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuICpcbiAqICAgJCBERUJVR19DT0xPUlM9bm8gREVCVUdfREVQVEg9MTAgREVCVUdfU0hPV19ISURERU49ZW5hYmxlZCBub2RlIHNjcmlwdC5qc1xuICovXG5cbmV4cG9ydHMuaW5zcGVjdE9wdHMgPSBPYmplY3Qua2V5cyhwcm9jZXNzLmVudikuZmlsdGVyKGtleSA9PiB7XG5cdHJldHVybiAvXmRlYnVnXy9pLnRlc3Qoa2V5KTtcbn0pLnJlZHVjZSgob2JqLCBrZXkpID0+IHtcblx0Ly8gQ2FtZWwtY2FzZVxuXHRjb25zdCBwcm9wID0ga2V5XG5cdFx0LnN1YnN0cmluZyg2KVxuXHRcdC50b0xvd2VyQ2FzZSgpXG5cdFx0LnJlcGxhY2UoL18oW2Etel0pL2csIChfLCBrKSA9PiB7XG5cdFx0XHRyZXR1cm4gay50b1VwcGVyQ2FzZSgpO1xuXHRcdH0pO1xuXG5cdC8vIENvZXJjZSBzdHJpbmcgdmFsdWUgaW50byBKUyB2YWx1ZVxuXHRsZXQgdmFsID0gcHJvY2Vzcy5lbnZba2V5XTtcblx0aWYgKC9eKHllc3xvbnx0cnVlfGVuYWJsZWQpJC9pLnRlc3QodmFsKSkge1xuXHRcdHZhbCA9IHRydWU7XG5cdH0gZWxzZSBpZiAoL14obm98b2ZmfGZhbHNlfGRpc2FibGVkKSQvaS50ZXN0KHZhbCkpIHtcblx0XHR2YWwgPSBmYWxzZTtcblx0fSBlbHNlIGlmICh2YWwgPT09ICdudWxsJykge1xuXHRcdHZhbCA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0dmFsID0gTnVtYmVyKHZhbCk7XG5cdH1cblxuXHRvYmpbcHJvcF0gPSB2YWw7XG5cdHJldHVybiBvYmo7XG59LCB7fSk7XG5cbi8qKlxuICogSXMgc3Rkb3V0IGEgVFRZPyBDb2xvcmVkIG91dHB1dCBpcyBlbmFibGVkIHdoZW4gYHRydWVgLlxuICovXG5cbmZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcblx0cmV0dXJuICdjb2xvcnMnIGluIGV4cG9ydHMuaW5zcGVjdE9wdHMgP1xuXHRcdEJvb2xlYW4oZXhwb3J0cy5pbnNwZWN0T3B0cy5jb2xvcnMpIDpcblx0XHR0dHkuaXNhdHR5KHByb2Nlc3Muc3RkZXJyLmZkKTtcbn1cblxuLyoqXG4gKiBBZGRzIEFOU0kgY29sb3IgZXNjYXBlIGNvZGVzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcblx0Y29uc3Qge25hbWVzcGFjZTogbmFtZSwgdXNlQ29sb3JzfSA9IHRoaXM7XG5cblx0aWYgKHVzZUNvbG9ycykge1xuXHRcdGNvbnN0IGMgPSB0aGlzLmNvbG9yO1xuXHRcdGNvbnN0IGNvbG9yQ29kZSA9ICdcXHUwMDFCWzMnICsgKGMgPCA4ID8gYyA6ICc4OzU7JyArIGMpO1xuXHRcdGNvbnN0IHByZWZpeCA9IGAgICR7Y29sb3JDb2RlfTsxbSR7bmFtZX0gXFx1MDAxQlswbWA7XG5cblx0XHRhcmdzWzBdID0gcHJlZml4ICsgYXJnc1swXS5zcGxpdCgnXFxuJykuam9pbignXFxuJyArIHByZWZpeCk7XG5cdFx0YXJncy5wdXNoKGNvbG9yQ29kZSArICdtKycgKyBtb2R1bGUuZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpICsgJ1xcdTAwMUJbMG0nKTtcblx0fSBlbHNlIHtcblx0XHRhcmdzWzBdID0gZ2V0RGF0ZSgpICsgbmFtZSArICcgJyArIGFyZ3NbMF07XG5cdH1cbn1cblxuZnVuY3Rpb24gZ2V0RGF0ZSgpIHtcblx0aWYgKGV4cG9ydHMuaW5zcGVjdE9wdHMuaGlkZURhdGUpIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblx0cmV0dXJuIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSArICcgJztcbn1cblxuLyoqXG4gKiBJbnZva2VzIGB1dGlsLmZvcm1hdFdpdGhPcHRpb25zKClgIHdpdGggdGhlIHNwZWNpZmllZCBhcmd1bWVudHMgYW5kIHdyaXRlcyB0byBzdGRlcnIuXG4gKi9cblxuZnVuY3Rpb24gbG9nKC4uLmFyZ3MpIHtcblx0cmV0dXJuIHByb2Nlc3Muc3RkZXJyLndyaXRlKHV0aWwuZm9ybWF0V2l0aE9wdGlvbnMoZXhwb3J0cy5pbnNwZWN0T3B0cywgLi4uYXJncykgKyAnXFxuJyk7XG59XG5cbi8qKlxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcblx0aWYgKG5hbWVzcGFjZXMpIHtcblx0XHRwcm9jZXNzLmVudi5ERUJVRyA9IG5hbWVzcGFjZXM7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gSWYgeW91IHNldCBhIHByb2Nlc3MuZW52IGZpZWxkIHRvIG51bGwgb3IgdW5kZWZpbmVkLCBpdCBnZXRzIGNhc3QgdG8gdGhlXG5cdFx0Ly8gc3RyaW5nICdudWxsJyBvciAndW5kZWZpbmVkJy4gSnVzdCBkZWxldGUgaW5zdGVhZC5cblx0XHRkZWxldGUgcHJvY2Vzcy5lbnYuREVCVUc7XG5cdH1cbn1cblxuLyoqXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2FkKCkge1xuXHRyZXR1cm4gcHJvY2Vzcy5lbnYuREVCVUc7XG59XG5cbi8qKlxuICogSW5pdCBsb2dpYyBmb3IgYGRlYnVnYCBpbnN0YW5jZXMuXG4gKlxuICogQ3JlYXRlIGEgbmV3IGBpbnNwZWN0T3B0c2Agb2JqZWN0IGluIGNhc2UgYHVzZUNvbG9yc2AgaXMgc2V0XG4gKiBkaWZmZXJlbnRseSBmb3IgYSBwYXJ0aWN1bGFyIGBkZWJ1Z2AgaW5zdGFuY2UuXG4gKi9cblxuZnVuY3Rpb24gaW5pdChkZWJ1Zykge1xuXHRkZWJ1Zy5pbnNwZWN0T3B0cyA9IHt9O1xuXG5cdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmluc3BlY3RPcHRzKTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0ZGVidWcuaW5zcGVjdE9wdHNba2V5c1tpXV0gPSBleHBvcnRzLmluc3BlY3RPcHRzW2tleXNbaV1dO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb21tb24nKShleHBvcnRzKTtcblxuY29uc3Qge2Zvcm1hdHRlcnN9ID0gbW9kdWxlLmV4cG9ydHM7XG5cbi8qKlxuICogTWFwICVvIHRvIGB1dGlsLmluc3BlY3QoKWAsIGFsbCBvbiBhIHNpbmdsZSBsaW5lLlxuICovXG5cbmZvcm1hdHRlcnMubyA9IGZ1bmN0aW9uICh2KSB7XG5cdHRoaXMuaW5zcGVjdE9wdHMuY29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cdHJldHVybiB1dGlsLmluc3BlY3QodiwgdGhpcy5pbnNwZWN0T3B0cylcblx0XHQuc3BsaXQoJ1xcbicpXG5cdFx0Lm1hcChzdHIgPT4gc3RyLnRyaW0oKSlcblx0XHQuam9pbignICcpO1xufTtcblxuLyoqXG4gKiBNYXAgJU8gdG8gYHV0aWwuaW5zcGVjdCgpYCwgYWxsb3dpbmcgbXVsdGlwbGUgbGluZXMgaWYgbmVlZGVkLlxuICovXG5cbmZvcm1hdHRlcnMuTyA9IGZ1bmN0aW9uICh2KSB7XG5cdHRoaXMuaW5zcGVjdE9wdHMuY29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cdHJldHVybiB1dGlsLmluc3BlY3QodiwgdGhpcy5pbnNwZWN0T3B0cyk7XG59O1xuIiwgIi8qKlxuICogRGV0ZWN0IEVsZWN0cm9uIHJlbmRlcmVyIC8gbndqcyBwcm9jZXNzLCB3aGljaCBpcyBub2RlLCBidXQgd2Ugc2hvdWxkXG4gKiB0cmVhdCBhcyBhIGJyb3dzZXIuXG4gKi9cblxuaWYgKHR5cGVvZiBwcm9jZXNzID09PSAndW5kZWZpbmVkJyB8fCBwcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicgfHwgcHJvY2Vzcy5icm93c2VyID09PSB0cnVlIHx8IHByb2Nlc3MuX19ud2pzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9icm93c2VyLmpzJyk7XG59IGVsc2Uge1xuXHRtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbm9kZS5qcycpO1xufVxuIiwgbnVsbCwgbnVsbCwgbnVsbCwgImltcG9ydCB7XG4gICAgQXBwLFxuICAgIEZpbGVTeXN0ZW1BZGFwdGVyLFxuICAgIEl0ZW1WaWV3LFxuICAgIE5vdGljZSxcbiAgICBQbHVnaW4sXG4gICAgUGx1Z2luU2V0dGluZ1RhYixcbiAgICBTZXR0aW5nLFxuICAgIFRGaWxlLFxuICAgIFdvcmtzcGFjZUxlYWYsXG59IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgc2ltcGxlR2l0IH0gZnJvbSBcInNpbXBsZS1naXRcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgZnNwIGZyb20gXCJmcy9wcm9taXNlc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0ICogYXMgb3MgZnJvbSBcIm9zXCI7XG5cbmltcG9ydCB7XG4gICAgUmVtb3RlQXJ0aWNsZSxcbiAgICBjb25maXJtU3luY0NvbmZsaWN0LFxuICAgIHN5bmNBcnRpY2xlLFxuICAgIHN5bmNBcnRpY2xlQXNDb3B5LFxufSBmcm9tIFwiLi9zcmMvc3luY1wiO1xuaW1wb3J0IHsgZG93bmxvYWRBcnRpY2xlIH0gZnJvbSBcIi4vc3JjL2Rvd25sb2FkXCI7XG5pbXBvcnQgeyBVcGxvYWRBcnRpY2xlTW9kYWwsIHVwbG9hZExvY2FsQXJ0aWNsZSB9IGZyb20gXCIuL3NyYy91cGxvYWRcIjtcbmltcG9ydCB7IHJlZnJlc2hBcnRpY2xlc1ZpZXcgfSBmcm9tIFwiLi9zcmMvcmVmcmVzaFwiO1xuXG5leHBvcnQgdHlwZSB7IFJlbW90ZUFydGljbGUgfTtcblxuY29uc3QgVklFV19UWVBFX0FSVElDTEVTID0gXCJnaXQtYXJ0aWNsZXMtdmlld1wiO1xuXG5pbnRlcmZhY2UgR2l0U3luY1NldHRpbmdzIHtcbiAgICByZXBvVXJsOiBzdHJpbmc7XG4gICAgc3NoS2V5OiBzdHJpbmc7XG4gICAgdGFyZ2V0Rm9sZGVyOiBzdHJpbmc7XG4gICAgLyoqIFx1ODFFQVx1NTJBOFx1NTIzN1x1NjVCMFx1OTVGNFx1OTY5NFx1RkYwOFx1NkJFQlx1NzlEMlx1RkYwOVx1RkYwQzAgXHU4ODY4XHU3OTNBXHU1MTczXHU5NUVEICovXG4gICAgYXV0b1JlZnJlc2hJbnRlcnZhbDogbnVtYmVyO1xufVxuXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBHaXRTeW5jU2V0dGluZ3MgPSB7XG4gICAgcmVwb1VybDogXCJcIixcbiAgICBzc2hLZXk6IFwiXCIsXG4gICAgdGFyZ2V0Rm9sZGVyOiBcIkdpdFx1NjU4N1x1N0FFMFwiLFxuICAgIGF1dG9SZWZyZXNoSW50ZXJ2YWw6IDAsXG59O1xuXG5jbGFzcyBHaXRBcnRpY2xlc1ZpZXcgZXh0ZW5kcyBJdGVtVmlldyB7XG4gICAgcGx1Z2luOiBNeVNpbXBsZVBsdWdpbjtcbiAgICBhcnRpY2xlczogUmVtb3RlQXJ0aWNsZVtdID0gW107XG4gICAgbG9jYWxUaXRsZXMgPSBuZXcgTWFwPHN0cmluZywgVEZpbGU+KCk7XG4gICAgY29udGVudEVsOiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIGlzTG9hZGluZyA9IGZhbHNlO1xuXG4gICAgLy8gXHU2NUIwXHU1ODlFXHVGRjFBXHU2NDFDXHU3RDIyXHU1MTczXHU5NTJFXHU4QkNEXG4gICAgcHJpdmF0ZSBzZWFyY2hRdWVyeSA9IFwiXCI7XG4gICAgLy8gXHU2NUIwXHU1ODlFXHVGRjFBXHU2NzJDXHU1NzMwXHU1MzNBXHU2NjJGXHU1NDI2XHU2Mjk4XHU1M0UwXG4gICAgcHJpdmF0ZSBsb2NhbFNlY3Rpb25Db2xsYXBzZWQgPSBmYWxzZTtcbiAgICAvLyBcdTY1QjBcdTU4OUVcdUZGMUFcdThGRENcdTdBMEJcdTUyMDZcdTdFQzRcdTYyOThcdTUzRTBcdTcyQjZcdTYwMDFcbiAgICBwcml2YXRlIGNvbGxhcHNlZFJlbW90ZUdyb3VwcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gICAgY29uc3RydWN0b3IobGVhZjogV29ya3NwYWNlTGVhZiwgcGx1Z2luOiBNeVNpbXBsZVBsdWdpbikge1xuICAgICAgICBzdXBlcihsZWFmKTtcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgICAgIHRoaXMuY29udGVudEVsID0gdGhpcy5jb250YWluZXJFbC5jaGlsZHJlblsxXSBhcyBIVE1MRWxlbWVudDtcbiAgICB9XG5cbiAgICBnZXRWaWV3VHlwZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gVklFV19UWVBFX0FSVElDTEVTO1xuICAgIH1cblxuICAgIGdldERpc3BsYXlUZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBcIkdpdCBcdTY1ODdcdTdBRTBcIjtcbiAgICB9XG5cbiAgICBnZXRJY29uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBcImJvb2stb3BlblwiO1xuICAgIH1cblxuICAgIGFzeW5jIG9uT3BlbigpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBhc3luYyByZW5kZXIoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLmVuc3VyZVNldHRpbmdzTG9hZGVkKCk7XG5cbiAgICAgICAgdGhpcy5jb250ZW50RWwuZW1wdHkoKTtcbiAgICAgICAgdGhpcy5jb250ZW50RWwuYWRkQ2xhc3MoXCJnaXQtYXJ0aWNsZXMtY29udGFpbmVyXCIpO1xuXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IHRoaXMuY29udGVudEVsLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtaGVhZGVyXCIgfSk7XG4gICAgICAgIGNvbnN0IHRpdGxlQm94ID0gaGVhZGVyLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtaGVhZGVyLXRpdGxlXCIgfSk7XG4gICAgICAgIHRpdGxlQm94LmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIkdpdCBcdTY1ODdcdTdBRTBcIiB9KTtcbiAgICAgICAgdGl0bGVCb3guY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgICAgICAgdGV4dDogdGhpcy5wbHVnaW4uc2V0dGluZ3MucmVwb1VybFxuICAgICAgICAgICAgICAgID8gXCJcdTRFQ0VcdTVERjJcdTkxNERcdTdGNkVcdTc2ODQgR2l0IFx1NEVEM1x1NUU5M1x1OEJGQlx1NTNENiBNYXJrZG93biBcdTY1ODdcdTdBRTBcIlxuICAgICAgICAgICAgICAgIDogXCJcdThCRjdcdTUxNDhcdTU3MjhcdThCQkVcdTdGNkVcdTRFMkRcdTkxNERcdTdGNkUgR2l0IFx1NEVEM1x1NUU5M1wiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC1hcnRpY2xlcy1zdWJ0aXRsZVwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBhY3Rpb25zID0gaGVhZGVyLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtaGVhZGVyLWFjdGlvbnNcIiB9KTtcblxuICAgICAgICAvLyBcdTY1QjBcdTU4OUVcdUZGMUFcdTY0MUNcdTdEMjJcdTY4NDZcbiAgICAgICAgY29uc3Qgc2VhcmNoV3JhcCA9IGFjdGlvbnMuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1hcnRpY2xlcy1zZWFyY2hcIiB9KTtcbiAgICAgICAgY29uc3Qgc2VhcmNoSW5wdXQgPSBzZWFyY2hXcmFwLmNyZWF0ZUVsKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgdHlwZTogXCJzZWFyY2hcIixcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlx1NjQxQ1x1N0QyMlx1NjgwN1x1OTg5OFx1NjIxNlx1OERFRlx1NUY4NFx1MjAyNlwiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC1hcnRpY2xlcy1zZWFyY2gtaW5wdXRcIixcbiAgICAgICAgfSk7XG4gICAgICAgIHNlYXJjaElucHV0LnZhbHVlID0gdGhpcy5zZWFyY2hRdWVyeTtcbiAgICAgICAgc2VhcmNoSW5wdXQub25pbnB1dCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoUXVlcnkgPSBzZWFyY2hJbnB1dC52YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXIoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCByZWZyZXNoQnV0dG9uID0gYWN0aW9ucy5jcmVhdGVFbChcImJ1dHRvblwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NTIzN1x1NjVCMFwiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC1hcnRpY2xlcy1yZWZyZXNoXCIsXG4gICAgICAgIH0pO1xuICAgICAgICByZWZyZXNoQnV0dG9uLm9uY2xpY2sgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZWZyZXNoQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlZnJlc2hCdXR0b24udGV4dENvbnRlbnQgPSBcIlx1NTIzN1x1NjVCMFx1NEUyRFx1MjAyNlwiO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRBcnRpY2xlcygpO1xuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICByZWZyZXNoQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmVmcmVzaEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiXHU1MjM3XHU2NUIwXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCF0aGlzLnBsdWdpbi5zZXR0aW5ncy5yZXBvVXJsKSB7XG4gICAgICAgICAgICBjb25zdCBlbXB0eSA9IHRoaXMuY29udGVudEVsLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtZW1wdHlcIiB9KTtcbiAgICAgICAgICAgIGVtcHR5LmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtZW1wdHktaWNvblwiLCB0ZXh0OiBcIlx1MjY5OVx1RkUwRlwiIH0pO1xuICAgICAgICAgICAgZW1wdHkuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IFwiXHU4RkQ4XHU2Q0ExXHU2NzA5XHU5MTREXHU3RjZFIEdpdCBcdTRFRDNcdTVFOTNcIiB9KTtcbiAgICAgICAgICAgIGVtcHR5LmNyZWF0ZUVsKFwicFwiLCB7XG4gICAgICAgICAgICAgICAgdGV4dDogXCJcdTYyNTNcdTVGMDAgT2JzaWRpYW4gXHU4QkJFXHU3RjZFIFx1MjE5MiBHaXQgXHU2NTg3XHU3QUUwXHU1NDBDXHU2QjY1XHVGRjBDXHU1ODZCXHU1MTk5XHU0RUQzXHU1RTkzXHU1NzMwXHU1NzQwXHU1NDBFXHU4RkQ0XHU1NkRFXHU2QjY0XHU2ODA3XHU3QjdFXHU5ODc1XHUzMDAyXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxvYWRpbmcgPSB0aGlzLmNvbnRlbnRFbC5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LWFydGljbGVzLWxvYWRpbmdcIiB9KTtcbiAgICAgICAgbG9hZGluZy5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LWFydGljbGVzLXNwaW5uZXJcIiB9KTtcbiAgICAgICAgbG9hZGluZy5jcmVhdGVTcGFuKHsgdGV4dDogXCJcdTZCNjNcdTU3MjhcdThCRkJcdTUzRDYgR2l0IFx1NEVEM1x1NUU5M1x1MjAyNlwiIH0pO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRBcnRpY2xlcygpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgbG9hZGluZy5yZW1vdmUoKTtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yRWwgPSB0aGlzLmNvbnRlbnRFbC5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LWFydGljbGVzLWVycm9yXCIgfSk7XG4gICAgICAgICAgICBlcnJvckVsLmNyZWF0ZUVsKFwic3Ryb25nXCIsIHsgdGV4dDogXCJcdThCRkJcdTUzRDZcdTRFRDNcdTVFOTNcdTU5MzFcdThEMjVcIiB9KTtcbiAgICAgICAgICAgIGVycm9yRWwuY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgICAgICAgICAgIHRleHQ6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFx1NUJGOVx1NTkxNlx1NTE2Q1x1NUYwMFx1NzY4NFx1NTIzN1x1NjVCMFx1NTE2NVx1NTNFM1x1RkYwQ1x1NEY5QiByZWZyZXNoLnRzIFx1OEMwM1x1NzUyOCAqL1xuICAgIGFzeW5jIHJlZnJlc2goKSB7XG4gICAgICAgIGlmICghdGhpcy5wbHVnaW4uc2V0dGluZ3MucmVwb1VybCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNMb2FkaW5nKSByZXR1cm47XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2FkQXJ0aWNsZXMoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoXG4gICAgICAgICAgICAgICAgYFx1NTIzN1x1NjVCMFx1NTkzMVx1OEQyNVx1RkYxQSR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpXG4gICAgICAgICAgICAgICAgfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZEFydGljbGVzKCkge1xuICAgICAgICBjb25zdCB0ZW1wRGlyID0gYXdhaXQgdGhpcy5wbHVnaW4uY2xvbmVUb1RlbXAoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuYXJ0aWNsZXMgPSBhd2FpdCB0aGlzLnBsdWdpbi5nZXRSZW1vdGVBcnRpY2xlcyh0ZW1wRGlyKTtcblxuICAgICAgICAgICAgdGhpcy5sb2NhbFRpdGxlcy5jbGVhcigpO1xuICAgICAgICAgICAgY29uc3QgbG9jYWxGaWxlcyA9IHRoaXMuYXBwLnZhdWx0LmdldE1hcmtkb3duRmlsZXMoKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhbEZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IGxvY2FsRmlsZXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmxvY2FsVGl0bGVzLmhhcyhmaWxlLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYWxUaXRsZXMuc2V0KGZpbGUubmFtZSwgZmlsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpICUgMjAwID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIDApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG9sZExpc3QgPSB0aGlzLmNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yKFwiLmdpdC1hcnRpY2xlcy1saXN0XCIpO1xuICAgICAgICAgICAgb2xkTGlzdD8ucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGxvYWRpbmcgPSB0aGlzLmNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yKFwiLmdpdC1hcnRpY2xlcy1sb2FkaW5nXCIpO1xuICAgICAgICAgICAgbG9hZGluZz8ucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLmNvbnRlbnRFbC5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LWFydGljbGVzLWxpc3RcIiB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYXJ0aWNsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZW1wdHkgPSBsaXN0LmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtZW1wdHlcIiB9KTtcbiAgICAgICAgICAgICAgICBlbXB0eS5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogXCJcdTRFRDNcdTVFOTNcdTRFMkRcdTZDQTFcdTY3MDkgTWFya2Rvd24gXHU2NTg3XHU3QUUwXCIgfSk7XG4gICAgICAgICAgICAgICAgZW1wdHkuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogXCJcdTVGNTNcdTUyNERcdTUzRUFcdTY2M0VcdTc5M0EgLm1kIFx1NjU4N1x1NEVGNlx1MzAwMlwiIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgc3VtbWFyeSA9IGxpc3QuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1hcnRpY2xlcy1zdW1tYXJ5XCIgfSk7XG4gICAgICAgICAgICBzdW1tYXJ5LnNldFRleHQoYFx1NTE3MSAke3RoaXMuYXJ0aWNsZXMubGVuZ3RofSBcdTdCQzdcdTY1ODdcdTdBRTBgKTtcblxuICAgICAgICAgICAgLy8gXHU2NUIwXHU1ODlFXHVGRjFBXHU4RkRDXHU3QTBCXHU2NTg3XHU3QUUwXHU1MjA2XHU3RUM0XHU1QkI5XHU1NjY4XG4gICAgICAgICAgICBjb25zdCByZW1vdGVHcm91cHMgPSBsaXN0LmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtZ3JvdXBzXCIgfSk7XG5cbiAgICAgICAgICAgIC8vIFx1NjMwOVx1NjU4N1x1NEVGNlx1NTkzOVx1NTIwNlx1N0VDNFxuICAgICAgICAgICAgY29uc3QgZ3JvdXBNYXAgPSBuZXcgTWFwPHN0cmluZywgUmVtb3RlQXJ0aWNsZVtdPigpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBhcnRpY2xlIG9mIHRoaXMuYXJ0aWNsZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXIgPSBhcnRpY2xlLnJlbGF0aXZlUGF0aC5pbmNsdWRlcyhcIi9cIilcbiAgICAgICAgICAgICAgICAgICAgPyBhcnRpY2xlLnJlbGF0aXZlUGF0aC5zbGljZSgwLCBhcnRpY2xlLnJlbGF0aXZlUGF0aC5sYXN0SW5kZXhPZihcIi9cIikpXG4gICAgICAgICAgICAgICAgICAgIDogXCJcdTY4MzlcdTc2RUVcdTVGNTVcIjtcbiAgICAgICAgICAgICAgICBpZiAoIWdyb3VwTWFwLmhhcyhkaXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwTWFwLnNldChkaXIsIFtdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZ3JvdXBNYXAuZ2V0KGRpcikhLnB1c2goYXJ0aWNsZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHNvcnRlZEdyb3VwcyA9IEFycmF5LmZyb20oZ3JvdXBNYXAuZW50cmllcygpKS5zb3J0KChhLCBiKSA9PlxuICAgICAgICAgICAgICAgIGFbMF0ubG9jYWxlQ29tcGFyZShiWzBdLCBcInpoLUNOXCIpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IFtkaXIsIGl0ZW1zXSBvZiBzb3J0ZWRHcm91cHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclJlbW90ZUdyb3VwKHJlbW90ZUdyb3VwcywgZGlyLCBpdGVtcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGF3YWl0IHRoaXMucmVuZGVyTG9jYWxBcnRpY2xlcygpO1xuXG4gICAgICAgICAgICAvLyBcdTY1QjBcdTU4OUVcdUZGMUFcdTVFOTRcdTc1MjhcdTVGNTNcdTUyNERcdTY0MUNcdTdEMjJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXIoKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnJlbW92ZVRlbXBEaXIodGVtcERpcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcigpIHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLnNlYXJjaFF1ZXJ5O1xuXG4gICAgICAgIC8vIFx1OEZEQ1x1N0EwQlx1NTIwNlx1N0VDNFxuICAgICAgICBjb25zdCBncm91cHMgPSB0aGlzLmNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdpdC1yZW1vdGUtZ3JvdXBcIik7XG4gICAgICAgIGdyb3Vwcy5mb3JFYWNoKChncm91cEVsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbCA9IGdyb3VwRWwgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBjYXJkcyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2l0LWFydGljbGUtY2FyZFwiKTtcbiAgICAgICAgICAgIGxldCB2aXNpYmxlQ291bnQgPSAwO1xuXG4gICAgICAgICAgICBjYXJkcy5mb3JFYWNoKChjYXJkRWwpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYXJkID0gY2FyZEVsIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBjYXJkLmRhdGFzZXQuc2VhcmNoID8/IFwiXCI7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSAhcXVlcnkgfHwgdGV4dC5pbmNsdWRlcyhxdWVyeSk7XG4gICAgICAgICAgICAgICAgY2FyZC5zdHlsZS5kaXNwbGF5ID0gbWF0Y2ggPyBcIlwiIDogXCJub25lXCI7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoKSB2aXNpYmxlQ291bnQrKztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBcdTUyMDZcdTdFQzRcdTY4MDdcdTk4OThcdTRFNUZcdTg5ODFcdTgwRkRcdTUzMzlcdTkxNERcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwTmFtZSA9IGVsXG4gICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuZ2l0LXJlbW90ZS1ncm91cC1uYW1lXCIpXG4gICAgICAgICAgICAgICAgPy50ZXh0Q29udGVudD8udG9Mb3dlckNhc2UoKSA/PyBcIlwiO1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBNYXRjaCA9ICFxdWVyeSB8fCBncm91cE5hbWUuaW5jbHVkZXMocXVlcnkpO1xuXG4gICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gdmlzaWJsZUNvdW50ID4gMCB8fCBncm91cE1hdGNoID8gXCJcIiA6IFwibm9uZVwiO1xuXG4gICAgICAgICAgICAvLyBcdTU5ODJcdTY3OUNcdTY0MUNcdTdEMjJcdTU0N0RcdTRFMkRcdTUyMDZcdTdFQzRcdTU0MERcdUZGMENcdTVDNTVcdTVGMDBcdThCRTVcdTUyMDZcdTdFQzRcbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBlbC5xdWVyeVNlbGVjdG9yKFwiLmdpdC1yZW1vdGUtZ3JvdXAtYm9keVwiKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IHRvZ2dsZSA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCIuZ2l0LXJlbW90ZS1ncm91cC10b2dnbGVcIik7XG4gICAgICAgICAgICBpZiAoYm9keSAmJiB0b2dnbGUpIHtcbiAgICAgICAgICAgICAgICBpZiAocXVlcnkgJiYgZ3JvdXBNYXRjaCAmJiB2aXNpYmxlQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkuc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZS50ZXh0Q29udGVudCA9IFwiXHUyNUJDXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlyID0gZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmdpdC1yZW1vdGUtZ3JvdXAtbmFtZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgPy50ZXh0Q29udGVudCA/PyBcIlwiO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmNvbGxhcHNlZFJlbW90ZUdyb3Vwcy5oYXMoZGlyKTtcbiAgICAgICAgICAgICAgICAgICAgYm9keS5zdHlsZS5kaXNwbGF5ID0gY29sbGFwc2VkID8gXCJub25lXCIgOiBcIlwiO1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGUudGV4dENvbnRlbnQgPSBjb2xsYXBzZWQgPyBcIlx1MjVCNlwiIDogXCJcdTI1QkNcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFx1NjcyQ1x1NTczMFx1NjU4N1x1N0FFMFxuICAgICAgICBjb25zdCBsb2NhbFNlY3Rpb24gPSB0aGlzLmNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgXCIuZ2l0LWxvY2FsLWFydGljbGVzLXNlY3Rpb25cIlxuICAgICAgICApIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcblxuICAgICAgICBpZiAobG9jYWxTZWN0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBsb2NhbENhcmRzID0gbG9jYWxTZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2l0LWxvY2FsLWFydGljbGUtY2FyZFwiKTtcbiAgICAgICAgICAgIGxldCB2aXNpYmxlTG9jYWwgPSAwO1xuXG4gICAgICAgICAgICBsb2NhbENhcmRzLmZvckVhY2goKGNhcmRFbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhcmQgPSBjYXJkRWwgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IGNhcmQuZGF0YXNldC5zZWFyY2ggPz8gXCJcIjtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaCA9ICFxdWVyeSB8fCB0ZXh0LmluY2x1ZGVzKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICBjYXJkLnN0eWxlLmRpc3BsYXkgPSBtYXRjaCA/IFwiXCIgOiBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHZpc2libGVMb2NhbCsrO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIFx1NjcyQ1x1NTczMFx1NTIxN1x1ODg2OFx1NUJCOVx1NTY2OFxuICAgICAgICAgICAgY29uc3QgbG9jYWxMaXN0ID0gbG9jYWxTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgXCIuZ2l0LWxvY2FsLWFydGljbGVzLWxpc3RcIlxuICAgICAgICAgICAgKSBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG5cbiAgICAgICAgICAgIGlmIChsb2NhbExpc3QpIHtcbiAgICAgICAgICAgICAgICBpZiAocXVlcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxMaXN0LnN0eWxlLmRpc3BsYXkgPSB2aXNpYmxlTG9jYWwgPiAwID8gXCJcIiA6IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsTGlzdC5zdHlsZS5kaXNwbGF5ID0gdGhpcy5sb2NhbFNlY3Rpb25Db2xsYXBzZWQgPyBcIm5vbmVcIiA6IFwiXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBcdTY3MkNcdTU3MzBcdTY1NzRcdTRFMkFcdTUzM0FcdTU3REZcdUZGMUFcdTY0MUNcdTdEMjJcdTY1RjZcdTU5ODJcdTY3OUNcdTZDQTFcdTdFRDNcdTY3OUNcdUZGMENcdTUzRUZcdTRFRTVcdTk2OTBcdTg1Q0ZcbiAgICAgICAgICAgIGlmIChxdWVyeSAmJiB2aXNpYmxlTG9jYWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICBsb2NhbFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2NhbFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBcdTY0MUNcdTdEMjJcdTY1RTBcdTdFRDNcdTY3OUNcdTYzRDBcdTc5M0FcbiAgICAgICAgbGV0IG5vUmVzdWx0ID0gdGhpcy5jb250ZW50RWwucXVlcnlTZWxlY3RvcihcIi5naXQtYXJ0aWNsZXMtbm8tcmVzdWx0XCIpO1xuICAgICAgICBjb25zdCByZW1vdGVWaXNpYmxlID0gQXJyYXkuZnJvbShcbiAgICAgICAgICAgIHRoaXMuY29udGVudEVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2l0LXJlbW90ZS1ncm91cFwiKVxuICAgICAgICApLnNvbWUoKGVsKSA9PiAoZWwgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgIT09IFwibm9uZVwiKTtcblxuICAgICAgICBjb25zdCBsb2NhbFZpc2libGUgPVxuICAgICAgICAgICAgbG9jYWxTZWN0aW9uICYmXG4gICAgICAgICAgICBsb2NhbFNlY3Rpb24uc3R5bGUuZGlzcGxheSAhPT0gXCJub25lXCIgJiZcbiAgICAgICAgICAgIEFycmF5LmZyb20oXG4gICAgICAgICAgICAgICAgbG9jYWxTZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2l0LWxvY2FsLWFydGljbGUtY2FyZFwiKVxuICAgICAgICAgICAgKS5zb21lKChlbCkgPT4gKGVsIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ICE9PSBcIm5vbmVcIik7XG5cbiAgICAgICAgaWYgKHF1ZXJ5ICYmICFyZW1vdGVWaXNpYmxlICYmICFsb2NhbFZpc2libGUpIHtcbiAgICAgICAgICAgIGlmICghbm9SZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBub1Jlc3VsdCA9IHRoaXMuY29udGVudEVsLmNyZWF0ZURpdih7XG4gICAgICAgICAgICAgICAgICAgIGNsczogXCJnaXQtYXJ0aWNsZXMtbm8tcmVzdWx0XCIsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGBcdTZDQTFcdTY3MDlcdTYyN0VcdTUyMzBcdTUzMDVcdTU0MkJcdTIwMUMke3RoaXMuc2VhcmNoUXVlcnl9XHUyMDFEXHU3Njg0XHU2NTg3XHU3QUUwYCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vUmVzdWx0Py5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclJlbW90ZUdyb3VwKGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIGRpcjogc3RyaW5nLCBhcnRpY2xlczogUmVtb3RlQXJ0aWNsZVtdKSB7XG4gICAgICAgIGNvbnN0IGdyb3VwID0gY29udGFpbmVyLmNyZWF0ZURpdih7IGNsczogXCJnaXQtcmVtb3RlLWdyb3VwXCIgfSk7XG5cbiAgICAgICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5jb2xsYXBzZWRSZW1vdGVHcm91cHMuaGFzKGRpcik7XG5cbiAgICAgICAgY29uc3QgaGVhZGVyID0gZ3JvdXAuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1yZW1vdGUtZ3JvdXAtaGVhZGVyXCIgfSk7XG4gICAgICAgIGNvbnN0IGxlZnQgPSBoZWFkZXIuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1yZW1vdGUtZ3JvdXAtdGl0bGVcIiB9KTtcblxuICAgICAgICBjb25zdCB0b2dnbGUgPSBsZWZ0LmNyZWF0ZUVsKFwic3BhblwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBjb2xsYXBzZWQgPyBcIlx1MjVCNlwiIDogXCJcdTI1QkNcIixcbiAgICAgICAgICAgIGNsczogXCJnaXQtcmVtb3RlLWdyb3VwLXRvZ2dsZVwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBsZWZ0LmNyZWF0ZUVsKFwic3BhblwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBkaXIsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LXJlbW90ZS1ncm91cC1uYW1lXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxlZnQuY3JlYXRlRWwoXCJzcGFuXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IGAoJHthcnRpY2xlcy5sZW5ndGh9KWAsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LXJlbW90ZS1ncm91cC1jb3VudFwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBoZWFkZXIub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbGxhcHNlZFJlbW90ZUdyb3Vwcy5oYXMoZGlyKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkUmVtb3RlR3JvdXBzLmRlbGV0ZShkaXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlZFJlbW90ZUdyb3Vwcy5hZGQoZGlyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXIoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBib2R5ID0gZ3JvdXAuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1yZW1vdGUtZ3JvdXAtYm9keVwiIH0pO1xuICAgICAgICBpZiAoY29sbGFwc2VkKSB7XG4gICAgICAgICAgICBib2R5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgYXJ0aWNsZSBvZiBhcnRpY2xlcykge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJBcnRpY2xlQ2FyZChib2R5LCBhcnRpY2xlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckFydGljbGVDYXJkKGxpc3Q6IEhUTUxFbGVtZW50LCBhcnRpY2xlOiBSZW1vdGVBcnRpY2xlKSB7XG4gICAgICAgIGNvbnN0IHJlbW90ZUZpbGVOYW1lID0gYXJ0aWNsZS5yZWxhdGl2ZVBhdGguc3BsaXQoXCIvXCIpLnBvcCgpID8/IFwiXCI7XG4gICAgICAgIGNvbnN0IGxvY2FsRmlsZSA9IHRoaXMubG9jYWxUaXRsZXMuZ2V0KHJlbW90ZUZpbGVOYW1lKTtcbiAgICAgICAgY29uc3QgY2FyZCA9IGxpc3QuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1hcnRpY2xlLWNhcmRcIiB9KTtcblxuICAgICAgICAvLyBcdTY0MUNcdTdEMjJcdTc1MjhcbiAgICAgICAgY2FyZC5kYXRhc2V0LnNlYXJjaCA9IGAke2FydGljbGUudGl0bGV9ICR7YXJ0aWNsZS5yZWxhdGl2ZVBhdGh9YC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGNvbnN0IGluZm8gPSBjYXJkLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZS1pbmZvXCIgfSk7XG5cbiAgICAgICAgY29uc3QgdGl0bGVSb3cgPSBpbmZvLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZS10aXRsZS1yb3dcIiB9KTtcbiAgICAgICAgdGl0bGVSb3cuY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgICAgICAgdGV4dDogYXJ0aWNsZS50aXRsZSxcbiAgICAgICAgICAgIGNsczogXCJnaXQtYXJ0aWNsZS10aXRsZVwiLFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBcdTY1QjBcdTU4OUVcdUZGMUFcdTcyQjZcdTYwMDFcdTY4MDdcdTdCN0VcbiAgICAgICAgY29uc3QgYmFkZ2UgPSB0aXRsZVJvdy5jcmVhdGVFbChcInNwYW5cIiwge1xuICAgICAgICAgICAgdGV4dDogbG9jYWxGaWxlID8gXCJcdTVERjJcdTU0MENcdTZCNjVcIiA6IFwiXHU2NzJBXHU0RTBCXHU4RjdEXCIsXG4gICAgICAgICAgICBjbHM6IGxvY2FsRmlsZVxuICAgICAgICAgICAgICAgID8gXCJnaXQtYXJ0aWNsZS1iYWRnZSBpcy1zeW5jZWRcIlxuICAgICAgICAgICAgICAgIDogXCJnaXQtYXJ0aWNsZS1iYWRnZSBpcy1yZW1vdGVcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaW5mby5jcmVhdGVFbChcImRpdlwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBhcnRpY2xlLnJlbGF0aXZlUGF0aCxcbiAgICAgICAgICAgIGNsczogXCJnaXQtYXJ0aWNsZS1wYXRoXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IGNhcmQuY3JlYXRlRWwoXCJidXR0b25cIiwge1xuICAgICAgICAgICAgY2xzOiBsb2NhbEZpbGUgPyBcImdpdC1hcnRpY2xlLWFjdGlvbiBpcy1zeW5jZWRcIiA6IFwiZ2l0LWFydGljbGUtYWN0aW9uXCIsXG4gICAgICAgICAgICB0ZXh0OiBsb2NhbEZpbGUgPyBcIlx1NTQwQ1x1NkI2NVwiIDogXCJcdTRFMEJcdThGN0RcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYWN0aW9uLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiLFxuICAgICAgICAgICAgbG9jYWxGaWxlXG4gICAgICAgICAgICAgICAgPyBgXHU1NDBDXHU2QjY1XHUzMDBBJHthcnRpY2xlLnRpdGxlfVx1MzAwQmBcbiAgICAgICAgICAgICAgICA6IGBcdTRFMEJcdThGN0RcdTMwMEEke2FydGljbGUudGl0bGV9XHUzMDBCYFxuICAgICAgICApO1xuXG4gICAgICAgIGFjdGlvbi5vbmNsaWNrID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYWN0aW9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGFjdGlvbi50ZXh0Q29udGVudCA9IGxvY2FsRmlsZSA/IFwiXHU1NDBDXHU2QjY1XHU0RTJEXHUyMDI2XCIgOiBcIlx1NEUwQlx1OEY3RFx1NEUyRFx1MjAyNlwiO1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChsb2NhbEZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY29uZmlybVN5bmNDb25mbGljdChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJ0aWNsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsRmlsZVxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IFwiY2FuY2VsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IFwib3ZlcndyaXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHN5bmNBcnRpY2xlKHRoaXMucGx1Z2luLCBhcnRpY2xlLCBsb2NhbEZpbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZShgXHUzMDBBJHthcnRpY2xlLnRpdGxlfVx1MzAwQlx1NURGMlx1ODk4Nlx1NzZENlx1NUU3Nlx1NTQwQ1x1NkI2NWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgcmVmcmVzaEFydGljbGVzVmlldyh0aGlzLnBsdWdpbiwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSBcImNvcHlcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29weUZpbGUgPSBhd2FpdCBzeW5jQXJ0aWNsZUFzQ29weShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnRpY2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsRmlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoYFx1NURGMlx1NEZERFx1NUI1OFx1NEUzQVx1NTI2Rlx1NEVGNlx1RkYxQSR7Y29weUZpbGUucGF0aH1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHJlZnJlc2hBcnRpY2xlc1ZpZXcodGhpcy5wbHVnaW4sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3RmlsZSA9IGF3YWl0IGRvd25sb2FkQXJ0aWNsZSh0aGlzLnBsdWdpbiwgYXJ0aWNsZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYWxUaXRsZXMuc2V0KG5ld0ZpbGUubmFtZSwgbmV3RmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi50ZXh0Q29udGVudCA9IFwiXHU1NDBDXHU2QjY1XCI7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5jbGFzc0xpc3QuYWRkKFwiaXMtc3luY2VkXCIpO1xuICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKGBcdTMwMEEke2FydGljbGUudGl0bGV9XHUzMDBCXHU1REYyXHU0RTBCXHU4RjdEYCk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHJlZnJlc2hBcnRpY2xlc1ZpZXcodGhpcy5wbHVnaW4sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgbmV3IE5vdGljZShcbiAgICAgICAgICAgICAgICAgICAgYCR7bG9jYWxGaWxlID8gXCJcdTU0MENcdTZCNjVcIiA6IFwiXHU0RTBCXHU4RjdEXCJ9XHU1OTMxXHU4RDI1XHVGRjFBJHtlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBhY3Rpb24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxGaWxlKSBhY3Rpb24udGV4dENvbnRlbnQgPSBcIlx1NTQwQ1x1NkI2NVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGFzeW5jIHJlbmRlckxvY2FsQXJ0aWNsZXMoKSB7XG4gICAgICAgIHRoaXMuY29udGVudEVsLnF1ZXJ5U2VsZWN0b3IoXCIuZ2l0LWxvY2FsLWFydGljbGVzLXNlY3Rpb25cIik/LnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yKFwiLmdpdC1hcnRpY2xlcy1sb2FkaW5nXCIpPy5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5jb250ZW50RWwucXVlcnlTZWxlY3RvcihcIi5naXQtYXJ0aWNsZXMtZW1wdHlcIik/LnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yKFwiLmdpdC1hcnRpY2xlcy1lcnJvclwiKT8ucmVtb3ZlKCk7XG5cbiAgICAgICAgY29uc3Qgc2VjdGlvbiA9IHRoaXMuY29udGVudEVsLmNyZWF0ZURpdih7IGNsczogXCJnaXQtbG9jYWwtYXJ0aWNsZXMtc2VjdGlvblwiIH0pO1xuXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IHNlY3Rpb24uY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1sb2NhbC1hcnRpY2xlcy1oZWFkZXJcIiB9KTtcblxuICAgICAgICBjb25zdCB0aXRsZUJveCA9IGhlYWRlci5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LWxvY2FsLWFydGljbGVzLXRpdGxlXCIgfSk7XG4gICAgICAgIHRpdGxlQm94LmNyZWF0ZUVsKFwiaDNcIiwgeyB0ZXh0OiBcIlx1NjcyQ1x1NTczMFx1NjU4N1x1N0FFMFx1NEUwQVx1NEYyMFwiIH0pO1xuICAgICAgICB0aXRsZUJveC5jcmVhdGVFbChcImRpdlwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1OEJGQlx1NTNENlx1NUY1M1x1NTI0RCBWYXVsdCBcdTRFMkRcdTc2ODQgTWFya2Rvd24gXHU2NTg3XHU0RUY2XHVGRjBDXHU5MDA5XHU2MkU5IEdpdCBcdTRFRDNcdTVFOTNcdTY1ODdcdTRFRjZcdTU5MzlcdTU0MEVcdTRFMEFcdTRGMjBcdTMwMDJcIixcbiAgICAgICAgICAgIGNsczogXCJnaXQtYXJ0aWNsZXMtc3VidGl0bGVcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gXHU2NUIwXHU1ODlFXHVGRjFBXHU2Mjk4XHU1M0UwXHU2MzA5XHU5NEFFXG4gICAgICAgIGNvbnN0IGNvbGxhcHNlQnRuID0gaGVhZGVyLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IHRoaXMubG9jYWxTZWN0aW9uQ29sbGFwc2VkID8gXCJcdTVDNTVcdTVGMDBcIiA6IFwiXHU2NTM2XHU4RDc3XCIsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LWxvY2FsLWNvbGxhcHNlLWJ0blwiLFxuICAgICAgICB9KTtcbiAgICAgICAgY29sbGFwc2VCdG4ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9jYWxTZWN0aW9uQ29sbGFwc2VkID0gIXRoaXMubG9jYWxTZWN0aW9uQ29sbGFwc2VkO1xuICAgICAgICAgICAgdGhpcy5hcHBseUZpbHRlcigpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGxvY2FsRmlsZXMgPSB0aGlzLmFwcC52YXVsdFxuICAgICAgICAgICAgLmdldE1hcmtkb3duRmlsZXMoKVxuICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEucGF0aC5sb2NhbGVDb21wYXJlKGIucGF0aCwgXCJ6aC1DTlwiKSk7XG5cbiAgICAgICAgaWYgKGxvY2FsRmlsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBzZWN0aW9uLmNyZWF0ZURpdih7XG4gICAgICAgICAgICAgICAgdGV4dDogXCJcdTVGNTNcdTUyNEQgVmF1bHQgXHU0RTJEXHU2Q0ExXHU2NzA5IE1hcmtkb3duIFx1NjU4N1x1N0FFMFx1MzAwMlwiLFxuICAgICAgICAgICAgICAgIGNsczogXCJnaXQtbG9jYWwtZW1wdHlcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbGlzdCA9IHNlY3Rpb24uY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1sb2NhbC1hcnRpY2xlcy1saXN0XCIgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMubG9jYWxTZWN0aW9uQ29sbGFwc2VkKSB7XG4gICAgICAgICAgICBsaXN0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBsb2NhbEZpbGVzKSB7XG4gICAgICAgICAgICBjb25zdCBjYXJkID0gbGlzdC5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LWxvY2FsLWFydGljbGUtY2FyZFwiIH0pO1xuICAgICAgICAgICAgY2FyZC5kYXRhc2V0LnNlYXJjaCA9IGAke2ZpbGUuYmFzZW5hbWV9ICR7ZmlsZS5wYXRofWAudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgY29uc3QgaW5mbyA9IGNhcmQuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1hcnRpY2xlLWluZm9cIiB9KTtcbiAgICAgICAgICAgIGluZm8uY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgICAgICAgICAgIHRleHQ6IGZpbGUuYmFzZW5hbWUsXG4gICAgICAgICAgICAgICAgY2xzOiBcImdpdC1hcnRpY2xlLXRpdGxlXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGluZm8uY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgICAgICAgICAgIHRleHQ6IGZpbGUucGF0aCxcbiAgICAgICAgICAgICAgICBjbHM6IFwiZ2l0LWFydGljbGUtcGF0aFwiLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IGNhcmQuY3JlYXRlRWwoXCJidXR0b25cIiwge1xuICAgICAgICAgICAgICAgIHRleHQ6IFwiXHU0RTBBXHU0RjIwXCIsXG4gICAgICAgICAgICAgICAgY2xzOiBcImdpdC1hcnRpY2xlLWFjdGlvblwiLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGFjdGlvbi5vbmNsaWNrID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGFsID0gbmV3IFVwbG9hZEFydGljbGVNb2RhbCh0aGlzLmFwcCwgdGhpcy5wbHVnaW4sIGZpbGUpO1xuICAgICAgICAgICAgICAgIG1vZGFsLm9wZW4oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBvbkNsb3NlKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xuICAgIH1cbn1cblxuY2xhc3MgR2l0U3luY1NldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcbiAgICBwbHVnaW46IE15U2ltcGxlUGx1Z2luO1xuXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogTXlTaW1wbGVQbHVnaW4pIHtcbiAgICAgICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xuICAgICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgICB9XG5cbiAgICBkaXNwbGF5KCkge1xuICAgICAgICBjb25zdCB7IGNvbnRhaW5lckVsIH0gPSB0aGlzO1xuICAgICAgICBjb250YWluZXJFbC5lbXB0eSgpO1xuXG4gICAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIkdpdCBcdTY1ODdcdTdBRTBcdTU0MENcdTZCNjVcIiB9KTtcbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJwXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU1NzI4XHU4RkQ5XHU5MUNDXHU5MTREXHU3RjZFIEdpdCBcdTRFRDNcdTVFOTNcdTczQUZcdTU4ODNcdUZGMENcdTY1ODdcdTdBRTBcdTUyMTdcdTg4NjhcdTRGMUFcdTU3MjhcdTIwMUNHaXQgXHU2NTg3XHU3QUUwXHUyMDFEXHU2ODA3XHU3QjdFXHU5ODc1XHU0RTJEXHU2NjNFXHU3OTNBXHUzMDAyXCIsXG4gICAgICAgICAgICBjbHM6IFwic2V0dGluZy1pdGVtLWRlc2NyaXB0aW9uXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJHaXQgXHU0RUQzXHU1RTkzXHU1NzMwXHU1NzQwXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIlx1NjUyRlx1NjMwMSBIVFRQUyBcdTU0OEMgU1NIXHVGRjBDXHU0RjhCXHU1OTgyIGdpdEBnaXRodWIuY29tOnVzZXIvcmVwby5naXRcIilcbiAgICAgICAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICAgICAgICAgIHRleHRcbiAgICAgICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiZ2l0QGdpdGh1Yi5jb206dXNlci9yZXBvLmdpdFwiKVxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MucmVwb1VybClcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MucmVwb1VybCA9IHZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiU1NIIFx1NzlDMVx1OTRBNVwiKVxuICAgICAgICAgICAgLnNldERlc2MoXCJcdTUzRUZcdTkwMDlcdTMwMDJcdTc1NTlcdTdBN0FcdTY1RjZcdTRGN0ZcdTc1MjhcdTdDRkJcdTdFREZcdTlFRDhcdThCQTQgU1NIIFx1OTE0RFx1N0Y2RVx1MzAwMlx1NzlDMVx1OTRBNVx1NTNFQVx1NzUyOFx1NEU4RVx1NUY1M1x1NTI0RCBHaXQgXHU2NENEXHU0RjVDXHUzMDAyXCIpXG4gICAgICAgICAgICAuYWRkVGV4dEFyZWEoKHRleHQpID0+IHtcbiAgICAgICAgICAgICAgICB0ZXh0XG4gICAgICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIlx1N0M5OFx1OEQzNCBTU0ggXHU3OUMxXHU5NEE1XCIpXG4gICAgICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zc2hLZXkpXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnNzaEtleSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRleHQuaW5wdXRFbC5yb3dzID0gNztcbiAgICAgICAgICAgICAgICB0ZXh0LmlucHV0RWwuYWRkQ2xhc3MoXCJnaXQtc3luYy1zZXR0aW5ncy1rZXlcIik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiXHU2NTg3XHU3QUUwXHU0RkREXHU1QjU4XHU3NkVFXHU1RjU1XCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIlx1NEUwQlx1OEY3RFx1NjVCMFx1NjU4N1x1N0FFMFx1NjVGNlx1NEY3Rlx1NzUyOFx1NzY4NCBWYXVsdCBcdTc2RjhcdTVCRjlcdThERUZcdTVGODRcdUZGMENcdTRGOEJcdTU5ODIgR2l0XHU2NTg3XHU3QUUwXCIpXG4gICAgICAgICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgICAgICAgICB0ZXh0XG4gICAgICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIkdpdFx1NjU4N1x1N0FFMFwiKVxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudGFyZ2V0Rm9sZGVyKVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy50YXJnZXRGb2xkZXIgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLnRyaW0oKS5yZXBsYWNlKC9eXFwvK3xcXC8rJC9nLCBcIlwiKSB8fCBcIkdpdFx1NjU4N1x1N0FFMFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJcdTYyNTNcdTVGMDBcdTY1ODdcdTdBRTBcdTUyMTdcdTg4NjhcIilcbiAgICAgICAgICAgIC5zZXREZXNjKFwiXHU2MjUzXHU1RjAwXHU0RTAwXHU0RTJBXHU2NUIwXHU3Njg0IE9ic2lkaWFuIFx1NjgwN1x1N0I3RVx1OTg3NVx1RkYwQ1x1NjdFNVx1NzcwQlx1NEVEM1x1NUU5M1x1NEUyRFx1NzY4NFx1NjU4N1x1N0FFMFx1MzAwMlwiKVxuICAgICAgICAgICAgLmFkZEJ1dHRvbigoYnV0dG9uKSA9PlxuICAgICAgICAgICAgICAgIGJ1dHRvbi5zZXRCdXR0b25UZXh0KFwiXHU2MjUzXHU1RjAwXCIpLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5hY3RpdmF0ZUFydGljbGVzVmlldygpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJcdTgxRUFcdTUyQThcdTUyMzdcdTY1QjBcdTk1RjRcdTk2OTRcdUZGMDhcdTZCRUJcdTc5RDJcdUZGMDlcIilcbiAgICAgICAgICAgIC5zZXREZXNjKFxuICAgICAgICAgICAgICAgIFwiXHU2MzA5XHU4QkJFXHU1QjlBXHU5NUY0XHU5Njk0XHU4MUVBXHU1MkE4XHU2MkM5XHU1M0Q2IEdpdCBcdTRFRDNcdTVFOTNcdTRGRTFcdTYwNkZcdTRFMEVcdTY3MkNcdTU3MzBcdTY1ODdcdTdBRTBcdTRGRTFcdTYwNkZcdTVFNzZcdTUyMzdcdTY1QjBcdTUyMTdcdTg4NjhcdTMwMDJcdThCQkVcdTRFM0EgMCBcdTg4NjhcdTc5M0FcdTUxNzNcdTk1RURcdTgxRUFcdTUyQThcdTUyMzdcdTY1QjBcdTMwMDJcdTVFRkFcdThCQUVcdTRFMERcdTVDMEZcdTRFOEUgNTAwMCBcdTZCRUJcdTc5RDJcdTMwMDJcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmFkZFRleHQoKHRleHQpID0+IHtcbiAgICAgICAgICAgICAgICB0ZXh0XG4gICAgICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIjBcIilcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKFN0cmluZyh0aGlzLnBsdWdpbi5zZXR0aW5ncy5hdXRvUmVmcmVzaEludGVydmFsID8/IDApKVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBudW0gPSBOdW1iZXIodmFsdWUudHJpbSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmF1dG9SZWZyZXNoSW50ZXJ2YWwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlci5pc0Zpbml0ZShudW0pICYmIG51bSA+IDAgPyBNYXRoLmZsb29yKG51bSkgOiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5yZXN0YXJ0QXV0b1JlZnJlc2goKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGV4dC5pbnB1dEVsLnR5cGUgPSBcIm51bWJlclwiO1xuICAgICAgICAgICAgICAgIHRleHQuaW5wdXRFbC5taW4gPSBcIjBcIjtcbiAgICAgICAgICAgICAgICB0ZXh0LmlucHV0RWwuc3RlcCA9IFwiMTAwMFwiO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNeVNpbXBsZVBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG4gICAgc2V0dGluZ3M6IEdpdFN5bmNTZXR0aW5ncztcbiAgICBwcml2YXRlIHNldHRpbmdzUmVhZHk6IFByb21pc2U8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIGF1dG9SZWZyZXNoVGltZXI6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAgLyoqIFx1NEY5QiByZWZyZXNoLnRzIFx1NEY3Rlx1NzUyOFx1RkYwQ1x1OTA3Rlx1NTE0RFx1NUZBQVx1NzNBRlx1NEY5RFx1OEQ1NiAqL1xuICAgIHJlYWRvbmx5IHZpZXdUeXBlQXJ0aWNsZXMgPSBWSUVXX1RZUEVfQVJUSUNMRVM7XG5cbiAgICBhc3luYyBvbmxvYWQoKSB7XG4gICAgICAgIC8vIFx1NTE0OFx1NkNFOFx1NTE4Q1x1ODlDNlx1NTZGRSAvIFx1NTQ3RFx1NEVFNCAvIFx1ODNEQ1x1NTM1NVx1RkYwQ1x1NEZERFx1OEJDMVx1NjNEMlx1NEVGNiBVSSBcdTdBQ0JcdTUzNzNcdTUzRUZcdTc1MjhcbiAgICAgICAgdGhpcy5yZWdpc3RlclZpZXcoXG4gICAgICAgICAgICBWSUVXX1RZUEVfQVJUSUNMRVMsXG4gICAgICAgICAgICAobGVhZikgPT4gbmV3IEdpdEFydGljbGVzVmlldyhsZWFmLCB0aGlzKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgR2l0U3luY1NldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcblxuICAgICAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgICAgICAgaWQ6IFwib3Blbi1naXQtYXJ0aWNsZXNcIixcbiAgICAgICAgICAgIG5hbWU6IFwiXHU2MjUzXHU1RjAwIEdpdCBcdTY1ODdcdTdBRTBcIixcbiAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB0aGlzLmFjdGl2YXRlQXJ0aWNsZXNWaWV3KCksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWRkUmliYm9uSWNvbihcImJvb2stb3BlblwiLCBcIlx1NjI1M1x1NUYwMCBHaXQgXHU2NTg3XHU3QUUwXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlQXJ0aWNsZXNWaWV3KClcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBcdTVGMDJcdTZCNjVcdTUyQTBcdThGN0RcdThCQkVcdTdGNkVcdUZGMENcdTRFMERcdTk2M0JcdTU4NUVcdTYzRDJcdTRFRjZcdTUyQTBcdThGN0RcbiAgICAgICAgdGhpcy5lbnN1cmVTZXR0aW5nc0xvYWRlZCgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0YXJ0QXV0b1JlZnJlc2goKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdpdCBcdTY1ODdcdTdBRTBcdTU0MENcdTZCNjVcdTYzRDJcdTRFRjZcdTVERjJcdTUyQTBcdThGN0RcIik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoXCJcdTUyQTBcdThGN0QgR2l0IFx1NjU4N1x1N0FFMFx1NTQwQ1x1NkI2NVx1OEJCRVx1N0Y2RVx1NTkzMVx1OEQyNVx1RkYxQVwiLCBlcnIpKTtcbiAgICB9XG5cbiAgICBhc3luYyBlbnN1cmVTZXR0aW5nc0xvYWRlZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MpIHJldHVybjtcbiAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzUmVhZHkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3NSZWFkeSA9IHRoaXMubG9hZFNldHRpbmdzKCk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5zZXR0aW5nc1JlYWR5O1xuICAgIH1cblxuICAgIGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2F2ZVNldHRpbmdzKCkge1xuICAgICAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xuICAgIH1cblxuICAgIGFzeW5jIGFjdGl2YXRlQXJ0aWNsZXNWaWV3KCkge1xuICAgICAgICBjb25zdCB7IHdvcmtzcGFjZSB9ID0gdGhpcy5hcHA7XG4gICAgICAgIGxldCBsZWFmID0gd29ya3NwYWNlLmdldExlYXZlc09mVHlwZShWSUVXX1RZUEVfQVJUSUNMRVMpWzBdO1xuXG4gICAgICAgIGlmICghbGVhZikge1xuICAgICAgICAgICAgbGVhZiA9IHdvcmtzcGFjZS5nZXRMZWFmKFwidGFiXCIpO1xuICAgICAgICAgICAgYXdhaXQgbGVhZi5zZXRWaWV3U3RhdGUoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFZJRVdfVFlQRV9BUlRJQ0xFUyxcbiAgICAgICAgICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdvcmtzcGFjZS5yZXZlYWxMZWFmKGxlYWYpO1xuICAgIH1cblxuICAgIC8qKiBcdTY4MzlcdTYzNkVcdTVGNTNcdTUyNERcdThCQkVcdTdGNkVcdTkxQ0RcdTVFRkFcdTgxRUFcdTUyQThcdTUyMzdcdTY1QjBcdTVCOUFcdTY1RjZcdTU2NjggKi9cbiAgICBhc3luYyByZXN0YXJ0QXV0b1JlZnJlc2goKSB7XG4gICAgICAgIHRoaXMuc3RvcEF1dG9SZWZyZXNoKCk7XG5cbiAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSB0aGlzLnNldHRpbmdzPy5hdXRvUmVmcmVzaEludGVydmFsID8/IDA7XG4gICAgICAgIGlmICghaW50ZXJ2YWwgfHwgaW50ZXJ2YWwgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hdXRvUmVmcmVzaFRpbWVyID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIC8vIFx1NkNBMVx1OTE0RFx1N0Y2RVx1NEVEM1x1NUU5M1x1NUMzMVx1OERGM1x1OEZDN1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzPy5yZXBvVXJsKSByZXR1cm47XG4gICAgICAgICAgICByZWZyZXNoQXJ0aWNsZXNWaWV3KHRoaXMsIHsgc2lsZW50OiB0cnVlIH0pLmNhdGNoKChlcnIpID0+XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiXHU4MUVBXHU1MkE4XHU1MjM3XHU2NUIwXHU2NTg3XHU3QUUwXHU1MjE3XHU4ODY4XHU1OTMxXHU4RDI1XHVGRjFBXCIsIGVycilcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sIGludGVydmFsKTtcblxuICAgICAgICAvLyBcdTZDRThcdTUxOENcdTUyMzBcdTYzRDJcdTRFRjZcdTc1MUZcdTU0N0RcdTU0NjhcdTY3MUZcdUZGMENcdTUzNzhcdThGN0RcdTY1RjZcdTgxRUFcdTUyQThcdTZFMDVcdTc0MDZcbiAgICAgICAgdGhpcy5yZWdpc3RlckludGVydmFsKHRoaXMuYXV0b1JlZnJlc2hUaW1lcik7XG4gICAgfVxuXG4gICAgYXN5bmMgc3RvcEF1dG9SZWZyZXNoKCkge1xuICAgICAgICBpZiAodGhpcy5hdXRvUmVmcmVzaFRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLmF1dG9SZWZyZXNoVGltZXIpO1xuICAgICAgICAgICAgdGhpcy5hdXRvUmVmcmVzaFRpbWVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGNsb25lVG9UZW1wKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGF3YWl0IHRoaXMuZW5zdXJlU2V0dGluZ3NMb2FkZWQoKTtcblxuICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MucmVwb1VybCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHU4QkY3XHU1MTQ4XHU1NzI4XHU4QkJFXHU3RjZFXHU0RTJEXHU1ODZCXHU1MTk5IEdpdCBcdTRFRDNcdTVFOTNcdTU3MzBcdTU3NDBcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0ZW1wRGlyID0gcGF0aC5qb2luKFxuICAgICAgICAgICAgb3MudG1wZGlyKCksXG4gICAgICAgICAgICBgb2JzaWRpYW4tZ2l0LWFydGljbGVzLSR7RGF0ZS5ub3coKX1gXG4gICAgICAgICk7XG5cbiAgICAgICAgbGV0IHRlbXBLZXlQYXRoOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZ2l0ID0gc2ltcGxlR2l0KCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNzaEtleS50cmltKCkpIHtcbiAgICAgICAgICAgICAgICB0ZW1wS2V5UGF0aCA9IHBhdGguam9pbihcbiAgICAgICAgICAgICAgICAgICAgb3MudG1wZGlyKCksXG4gICAgICAgICAgICAgICAgICAgIGBvYnNpZGlhbi1naXQta2V5LSR7RGF0ZS5ub3coKX1gXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGF3YWl0IGZzcC53cml0ZUZpbGUoXG4gICAgICAgICAgICAgICAgICAgIHRlbXBLZXlQYXRoLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLnNzaEtleS50cmltKCkgKyBcIlxcblwiLFxuICAgICAgICAgICAgICAgICAgICB7IG1vZGU6IDBvNjAwIH1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgZ2l0LmVudih7XG4gICAgICAgICAgICAgICAgICAgIC4uLnByb2Nlc3MuZW52LFxuICAgICAgICAgICAgICAgICAgICBHSVRfU1NIX0NPTU1BTkQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBgc3NoIC1pIFwiJHt0ZW1wS2V5UGF0aH1cIiAtbyBTdHJpY3RIb3N0S2V5Q2hlY2tpbmc9bm8gLW8gVXNlcktub3duSG9zdHNGaWxlPS9kZXYvbnVsbGAsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGF3YWl0IGdpdC5jbG9uZSh0aGlzLnNldHRpbmdzLnJlcG9VcmwsIHRlbXBEaXIsIFtcbiAgICAgICAgICAgICAgICBcIi0tZGVwdGhcIixcbiAgICAgICAgICAgICAgICBcIjFcIixcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICByZXR1cm4gdGVtcERpcjtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucmVtb3ZlVGVtcERpcih0ZW1wRGlyKTtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgaWYgKHRlbXBLZXlQYXRoKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZnNwLnVubGluayh0ZW1wS2V5UGF0aCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFx1NUZGRFx1NzU2NVx1NEUzNFx1NjVGNlx1NUJDNlx1OTRBNVx1NkUwNVx1NzQwNlx1NTkzMVx1OEQyNVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGdldFJlbW90ZUFydGljbGVzKHJlcG9EaXI6IHN0cmluZyk6IFByb21pc2U8UmVtb3RlQXJ0aWNsZVtdPiB7XG4gICAgICAgIGNvbnN0IGFydGljbGVzOiBSZW1vdGVBcnRpY2xlW10gPSBbXTtcblxuICAgICAgICBjb25zdCB3YWxrID0gYXN5bmMgKGN1cnJlbnREaXI6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICAgICAgY29uc3QgZW50cmllcyA9IGF3YWl0IGZzcC5yZWFkZGlyKGN1cnJlbnREaXIsIHtcbiAgICAgICAgICAgICAgICB3aXRoRmlsZVR5cGVzOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5uYW1lID09PSBcIi5naXRcIikgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBhYnNvbHV0ZVBhdGggPSBwYXRoLmpvaW4oY3VycmVudERpciwgZW50cnkubmFtZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB3YWxrKGFic29sdXRlUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgIWVudHJ5LmlzRmlsZSgpIHx8XG4gICAgICAgICAgICAgICAgICAgIHBhdGguZXh0bmFtZShlbnRyeS5uYW1lKS50b0xvd2VyQ2FzZSgpICE9PSBcIi5tZFwiXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IHBhdGhcbiAgICAgICAgICAgICAgICAgICAgLnJlbGF0aXZlKHJlcG9EaXIsIGFic29sdXRlUGF0aClcbiAgICAgICAgICAgICAgICAgICAgLnNwbGl0KHBhdGguc2VwKVxuICAgICAgICAgICAgICAgICAgICAuam9pbihcIi9cIik7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBbY29udGVudCwgc3RhdF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgICAgIGZzcC5yZWFkRmlsZShhYnNvbHV0ZVBhdGgsIFwidXRmOFwiKSxcbiAgICAgICAgICAgICAgICAgICAgZnNwLnN0YXQoYWJzb2x1dGVQYXRoKSxcbiAgICAgICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgICAgIGFydGljbGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogcGF0aC5iYXNlbmFtZShlbnRyeS5uYW1lLCBwYXRoLmV4dG5hbWUoZW50cnkubmFtZSkpLFxuICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgIGFic29sdXRlUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogc3RhdC5zaXplLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gXHU2QkNGXHU1OTA0XHU3NDA2XHU0RTAwXHU2Mjc5XHU4QkE5XHU1MUZBXHU0RThCXHU0RUY2XHU1RkFBXHU3M0FGXHVGRjBDXHU5MDdGXHU1MTREXHU5NTdGXHU0RUZCXHU1MkExXHU5NjNCXHU1ODVFIFVJXG4gICAgICAgICAgICAgICAgaWYgKGFydGljbGVzLmxlbmd0aCAlIDUwID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIDApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgYXdhaXQgd2FsayhyZXBvRGlyKTtcblxuICAgICAgICByZXR1cm4gYXJ0aWNsZXMuc29ydCgoYSwgYikgPT5cbiAgICAgICAgICAgIGEudGl0bGUubG9jYWxlQ29tcGFyZShiLnRpdGxlLCBcInpoLUNOXCIpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0UmVtb3RlRm9sZGVycygpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgICAgIGNvbnN0IHRlbXBEaXIgPSBhd2FpdCB0aGlzLmNsb25lVG9UZW1wKCk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGZvbGRlcnMgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICAgICAgICAgICAgY29uc3Qgd2FsayA9IGFzeW5jIChcbiAgICAgICAgICAgICAgICBjdXJyZW50RGlyOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVsYXRpdmVCYXNlID0gXCJcIlxuICAgICAgICAgICAgKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZW50cmllcyA9IGF3YWl0IGZzcC5yZWFkZGlyKGN1cnJlbnREaXIsIHtcbiAgICAgICAgICAgICAgICAgICAgd2l0aEZpbGVUeXBlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkubmFtZSA9PT0gXCIuZ2l0XCIpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFic29sdXRlUGF0aCA9IHBhdGguam9pbihjdXJyZW50RGlyLCBlbnRyeS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gcmVsYXRpdmVCYXNlXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHBhdGguam9pbihyZWxhdGl2ZUJhc2UsIGVudHJ5Lm5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGVudHJ5Lm5hbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbGRlcnMuYWRkKHJlbGF0aXZlUGF0aC5zcGxpdChwYXRoLnNlcCkuam9pbihcIi9cIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgd2FsayhhYnNvbHV0ZVBhdGgsIHJlbGF0aXZlUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBhd2FpdCB3YWxrKHRlbXBEaXIpO1xuXG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShmb2xkZXJzKS5zb3J0KChhLCBiKSA9PlxuICAgICAgICAgICAgICAgIGEubG9jYWxlQ29tcGFyZShiLCBcInpoLUNOXCIpXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5yZW1vdmVUZW1wRGlyKHRlbXBEaXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgcmVtb3ZlVGVtcERpcihkaXI6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAoIWRpcikgcmV0dXJuO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBmc3Aucm0oZGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSwgZm9yY2U6IHRydWUgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJcdTZFMDVcdTc0MDYgR2l0IFx1NEUzNFx1NjVGNlx1NzZFRVx1NUY1NVx1NTkzMVx1OEQyNVx1RkYxQVwiLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbnVubG9hZCgpIHtcbiAgICAgICAgdGhpcy5zdG9wQXV0b1JlZnJlc2goKTtcbiAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLmRldGFjaExlYXZlc09mVHlwZShWSUVXX1RZUEVfQVJUSUNMRVMpO1xuICAgIH1cbn0iLCAiLyoqXG4gKiBXcmFwcyBvbmUgb3IgbW9yZSBmaWxlIHBhdGhzIGluIGFuIG9iamVjdCB0aGF0IGBwYXJzZUNsaWAgcmVjb2duaXNlcyBhc1xuICogZXhwbGljaXQgcGF0aHNwZWNzLCByb3V0aW5nIHRoZW0gdG8gYFBhcnNlZENMSS5wYXRoc2AgcmVnYXJkbGVzcyBvZiB3aGV0aGVyXG4gKiBhIGAtLWAgc2VwYXJhdG9yIHRva2VuIGlzIHByZXNlbnQuXG4gKi9cblxuLy8gYmlvbWUtaWdub3JlIGxpbnQvY29tcGxleGl0eS9ub0Jhbm5lZFR5cGVzOiA8VXNlcyBTdHJpbmcgb2JqZWN0IHRvIHNhdGlzZnkgV2Vha01hcCByZXF1aXJlbWV0bj5cbmNvbnN0IGNhY2hlID0gbmV3IFdlYWtNYXA8U3RyaW5nLCBzdHJpbmdbXT4oKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGhzcGVjKC4uLnBhdGhzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gICBjb25zdCBrZXkgPSBuZXcgU3RyaW5nKHBhdGhzKTtcbiAgIGNhY2hlLnNldChrZXksIHBhdGhzKTtcbiAgIHJldHVybiBrZXkgYXMgc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQYXRoU3BlYyh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG4gICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBTdHJpbmcgJiYgY2FjaGUuaGFzKHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvUGF0aHModmFsdWU6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgIHJldHVybiBjYWNoZS5nZXQodmFsdWUpID8/IFtdO1xufVxuIiwgImV4cG9ydCBpbnRlcmZhY2UgRmxhZyB7XG4gICBuYW1lOiBzdHJpbmc7XG4gICB2YWx1ZT86IHN0cmluZztcbiAgIC8qKiBWYWx1ZSBjYW1lIGZyb20gdGhlIG5leHQgdG9rZW4gcmF0aGVyIHRoYW4gYmVpbmcgZW1iZWRkZWQgYWZ0ZXIgYD1gLiAqL1xuICAgYWJzb3JiZWROZXh0OiBib29sZWFuO1xuICAgLyoqIFN3aXRjaCBhcHBlYXJlZCBiZWZvcmUgdGhlIGdpdCBzdWItY29tbWFuZC4gKi9cbiAgIGlzR2xvYmFsOiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24qIHNjb3BlZEZsYWdzKGZsYWdzOiBGbGFnW10sIHNjb3BlOiAnZ2xvYmFsJyB8ICd0YXNrJykge1xuICAgY29uc3QgZmluZEdsb2JhbCA9IHNjb3BlID09PSAnZ2xvYmFsJztcbiAgIGZvciAoY29uc3QgZmxhZyBvZiBmbGFncykge1xuICAgICAgaWYgKGZsYWcuaXNHbG9iYWwgPT09IGZpbmRHbG9iYWwpIHtcbiAgICAgICAgIHlpZWxkIGZsYWc7XG4gICAgICB9XG4gICB9XG59XG4iLCAiLy8gRmxhZ3MgdGhhdCB1bmFtYmlndW91c2x5IHNpZ25hbCBhIHdyaXRlIG9wZXJhdGlvbiBvbiBnaXQgY29uZmlnLlxuZXhwb3J0IGNvbnN0IENPTkZJR19XUklURV9GTEFHUyA9IG5ldyBTZXQoW1xuICAgJy0tYWRkJyxcbiAgICctLWVkaXQnLFxuICAgJy0tcmVtb3ZlLXNlY3Rpb24nLFxuICAgJy0tcmVuYW1lLXNlY3Rpb24nLFxuICAgJy0tcmVwbGFjZS1hbGwnLFxuICAgJy0tdW5zZXQnLFxuICAgJy0tdW5zZXQtYWxsJyxcbiAgICctZScsXG5dKTtcblxuLy8gRmxhZ3MgdGhhdCB1bmFtYmlndW91c2x5IHNpZ25hbCBhIHJlYWQgb3BlcmF0aW9uLlxuZXhwb3J0IGNvbnN0IENPTkZJR19SRUFEX0ZMQUdTID0gbmV3IFNldChbXG4gICAnLS1nZXQnLFxuICAgJy0tZ2V0LWFsbCcsXG4gICAnLS1nZXQtY29sb3InLFxuICAgJy0tZ2V0LWNvbG9yYm9vbCcsXG4gICAnLS1nZXQtcmVnZXhwJyxcbiAgICctLWdldC11cmxtYXRjaCcsXG4gICAnLS1saXN0JyxcbiAgICctbCcsXG5dKTtcblxuLy8gU3ViLWNvbW1hbmQgdmVyYnMgYWNjZXB0ZWQgYXMgdGhlIGZpcnN0IHBvc2l0aW9uYWwgYnkgbmV3ZXIgZ2l0IHZlcnNpb25zLlxuZXhwb3J0IGNvbnN0IENPTkZJR19XUklURV9WRVJCUyA9IG5ldyBTZXQoW1xuICAgJ2VkaXQnLFxuICAgJ3JlbW92ZS1zZWN0aW9uJyxcbiAgICdyZW5hbWUtc2VjdGlvbicsXG4gICAnc2V0JyxcbiAgICd1bnNldCcsXG5dKTtcbmV4cG9ydCBjb25zdCBDT05GSUdfUkVBRF9WRVJCUyA9IG5ldyBTZXQoWydnZXQnLCAnZ2V0LWNvbG9yJywgJ2dldC1jb2xvcmJvb2wnLCAnbGlzdCddKTtcbiIsICJpbXBvcnQgdHlwZSB7IENvbmZpZ1Njb3BlIH0gZnJvbSAnLi4vYXJncy9wYXJzZS1hcmd2LnR5cGVzJztcbmltcG9ydCB7IHR5cGUgRmxhZywgc2NvcGVkRmxhZ3MgfSBmcm9tICcuLi9mbGFncy9mbGFncy5oZWxwZXJzJztcbmltcG9ydCB0eXBlIHsgQ29uZmlnT3BlcmF0aW9uIH0gZnJvbSAnLi9jb25maWcudHlwZXMnO1xuaW1wb3J0IHtcbiAgIENPTkZJR19SRUFEX0ZMQUdTLFxuICAgQ09ORklHX1JFQURfVkVSQlMsXG4gICBDT05GSUdfV1JJVEVfRkxBR1MsXG4gICBDT05GSUdfV1JJVEVfVkVSQlMsXG59IGZyb20gJy4vY29uZmlnLW9wZXJhbmRzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRldGVjdENvbmZpZ0FjdGlvbihmbGFnczogRmxhZ1tdLCBwb3NpdGlvbmFsczogc3RyaW5nW10pOiBDb25maWdPcGVyYXRpb24gfCBudWxsIHtcbiAgIGZvciAoY29uc3QgeyBuYW1lIH0gb2Ygc2NvcGVkRmxhZ3MoZmxhZ3MsICd0YXNrJykpIHtcbiAgICAgIGlmIChDT05GSUdfV1JJVEVfRkxBR1MuaGFzKG5hbWUpKSB7XG4gICAgICAgICByZXR1cm4gY29uZmlnT3BlcmF0aW9uKHRydWUsIHBvc2l0aW9uYWxzKTtcbiAgICAgIH1cbiAgICAgIGlmIChDT05GSUdfUkVBRF9GTEFHUy5oYXMobmFtZSkpIHtcbiAgICAgICAgIHJldHVybiBjb25maWdPcGVyYXRpb24oZmFsc2UsIHBvc2l0aW9uYWxzKTtcbiAgICAgIH1cbiAgIH1cblxuICAgY29uc3QgdmVyYiA9IHBvc2l0aW9uYWxzLmF0KDApPy50b0xvd2VyQ2FzZSgpO1xuXG4gICBpZiAodmVyYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgIH1cblxuICAgaWYgKENPTkZJR19XUklURV9WRVJCUy5oYXModmVyYikpIHtcbiAgICAgIHJldHVybiBjb25maWdPcGVyYXRpb24odHJ1ZSwgcG9zaXRpb25hbHMuc2xpY2UoMSkpO1xuICAgfVxuXG4gICBpZiAoQ09ORklHX1JFQURfVkVSQlMuaGFzKHZlcmIpKSB7XG4gICAgICByZXR1cm4gY29uZmlnT3BlcmF0aW9uKGZhbHNlLCBwb3NpdGlvbmFscy5zbGljZSgxKSk7XG4gICB9XG5cbiAgIGlmIChwb3NpdGlvbmFscy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBjb25maWdPcGVyYXRpb24oZmFsc2UsIHBvc2l0aW9uYWxzKTtcbiAgIH1cblxuICAgcmV0dXJuIGNvbmZpZ09wZXJhdGlvbih0cnVlLCBwb3NpdGlvbmFscyk7XG59XG5cbmZ1bmN0aW9uIGNvbmZpZ09wZXJhdGlvbihpc1dyaXRlID0gZmFsc2UsIHBvc2l0aW9uYWxzOiBzdHJpbmdbXSA9IFtdKTogQ29uZmlnT3BlcmF0aW9uIHwgbnVsbCB7XG4gICBjb25zdCBrZXkgPSBwb3NpdGlvbmFscy5hdCgwKT8udG9Mb3dlckNhc2UoKTtcblxuICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgIH1cblxuICAgcmV0dXJuIHtcbiAgICAgIGlzV3JpdGUsXG4gICAgICBpc1JlYWQ6ICFpc1dyaXRlLFxuICAgICAga2V5LFxuICAgICAgdmFsdWU6IHBvc2l0aW9uYWxzLmF0KDEpLFxuICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvT3BlcmF0aW9uKHNjb3BlOiBDb25maWdTY29wZSwgb3BlcmF0aW9uOiBDb25maWdPcGVyYXRpb24pIHtcbiAgIGlmIChvcGVyYXRpb24uaXNXcml0ZSAmJiBvcGVyYXRpb24udmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHsga2V5OiBvcGVyYXRpb24ua2V5LCB2YWx1ZTogb3BlcmF0aW9uLnZhbHVlLCBzY29wZSB9O1xuICAgfVxuICAgcmV0dXJuIHsga2V5OiBvcGVyYXRpb24ua2V5LCBzY29wZSB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgQ29uZmlnU2NvcGUsIENvbmZpZ1dyaXRlLCBQYXJzZWRDb25maWdBY3Rpdml0eSB9IGZyb20gJy4uL2FyZ3MvcGFyc2UtYXJndi50eXBlcyc7XG5pbXBvcnQgeyB0eXBlIEZsYWcsIHNjb3BlZEZsYWdzIH0gZnJvbSAnLi4vZmxhZ3MvZmxhZ3MuaGVscGVycyc7XG5pbXBvcnQgdHlwZSB7IENvbmZpZ09wZXJhdGlvbiB9IGZyb20gJy4vY29uZmlnLnR5cGVzJztcbmltcG9ydCB7IGRldGVjdENvbmZpZ0FjdGlvbiwgdG9PcGVyYXRpb24gfSBmcm9tICcuL2RldGVjdC1jb25maWctYWN0aW9uJztcblxuZnVuY3Rpb24gcGFyc2VBc3NpZ25tZW50KHJhdzogc3RyaW5nIHwgdW5kZWZpbmVkKTogeyBrZXk6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9IHwgbnVsbCB7XG4gICBjb25zdCBlcSA9IHJhdz8uaW5kZXhPZignPScpIHx8IC0xO1xuXG4gICBpZiAoIXJhdyB8fCBlcSA8IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgfVxuXG4gICByZXR1cm4ge1xuICAgICAga2V5OiByYXcuc2xpY2UoMCwgZXEpLnRyaW0oKS50b0xvd2VyQ2FzZSgpLFxuICAgICAgdmFsdWU6IHJhdy5zbGljZShlcSArIDEpLFxuICAgfTtcbn1cblxuZnVuY3Rpb24gZGV0ZWN0Q29uZmlnU2NvcGUoZmxhZ3M6IEZsYWdbXSk6IENvbmZpZ1Njb3BlIHtcbiAgIGZvciAoY29uc3QgeyBuYW1lIH0gb2Ygc2NvcGVkRmxhZ3MoZmxhZ3MsICd0YXNrJykpIHtcbiAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgY2FzZSAnLS1nbG9iYWwnOlxuICAgICAgICAgICAgcmV0dXJuICdnbG9iYWwnO1xuICAgICAgICAgY2FzZSAnLS1zeXN0ZW0nOlxuICAgICAgICAgICAgcmV0dXJuICdzeXN0ZW0nO1xuICAgICAgICAgY2FzZSAnLS13b3JrdHJlZSc6XG4gICAgICAgICAgICByZXR1cm4gJ3dvcmt0cmVlJztcbiAgICAgICAgIGNhc2UgJy0tbG9jYWwnOlxuICAgICAgICAgICAgcmV0dXJuICdsb2NhbCc7XG4gICAgICAgICBjYXNlICctLWZpbGUnOlxuICAgICAgICAgY2FzZSAnLWYnOlxuICAgICAgICAgICAgcmV0dXJuICdmaWxlJztcbiAgICAgIH1cbiAgIH1cbiAgIHJldHVybiAnbG9jYWwnO1xufVxuXG5mdW5jdGlvbiBkZXRlY3RDb25maWdPdmVycmlkZVNjb3BlKHsgbmFtZSB9OiBGbGFnKTogQ29uZmlnU2NvcGUgfCB2b2lkIHtcbiAgIGlmIChuYW1lID09PSAnLWMnIHx8IG5hbWUgPT09ICctLWNvbmZpZycpIHtcbiAgICAgIHJldHVybiAnaW5saW5lJztcbiAgIH1cbiAgIGlmIChuYW1lID09PSAnLS1jb25maWctZW52Jykge1xuICAgICAgcmV0dXJuICdlbnYnO1xuICAgfVxufVxuXG4vKipcbiAqIEdlbmVyYXRlcyB0aGUgc3RyZWFtIG9mIENvbmZpZ1dyaXRlIHNldHRpbmdzIGZvdW5kIGluIHRoZSBzdXBwbGllZCBmbGFncyxcbiAqIHRyaWdnZXJlZCBieSBgLWNgIGFuZCBgLS1jb25maWdgIGZvciBpbmxpbmUgY29uZmlndXJhdGlvbiBhbmQgYC0tY29uZmlnLWVudmBcbiAqIHRvIHNldCBhIGNvbmZpZyBzZXR0aW5nIGJhc2VkIG9uIGVudmlyb25tZW50IHZhcmlhYmxlLlxuICovXG5mdW5jdGlvbiogY29sbGVjdFdyaXRlRmxhZ3MoZmxhZ3M6IEZsYWdbXSk6IEdlbmVyYXRvcjxDb25maWdXcml0ZT4ge1xuICAgZm9yIChjb25zdCBmbGFnIG9mIGZsYWdzKSB7XG4gICAgICBjb25zdCBzY29wZSA9IGRldGVjdENvbmZpZ092ZXJyaWRlU2NvcGUoZmxhZyk7XG4gICAgICBjb25zdCBhc3NpZ25tZW50ID0gc2NvcGUgJiYgcGFyc2VBc3NpZ25tZW50KGZsYWcudmFsdWUpO1xuXG4gICAgICBpZiAoYXNzaWdubWVudCkge1xuICAgICAgICAgeWllbGQge1xuICAgICAgICAgICAgLi4uYXNzaWdubWVudCxcbiAgICAgICAgICAgIHNjb3BlLFxuICAgICAgICAgfTtcbiAgICAgIH1cbiAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbGxlY3RDb25maWdBY2Nlc3MoXG4gICB0YXNrOiBzdHJpbmcgfCBudWxsLFxuICAgZmxhZ3M6IEZsYWdbXSxcbiAgIHBvc2l0aW9uYWxzOiBzdHJpbmdbXVxuKTogUGFyc2VkQ29uZmlnQWN0aXZpdHkge1xuICAgY29uc3QgcGFyc2VkQ29uZmlnOiBQYXJzZWRDb25maWdBY3Rpdml0eSA9IHtcbiAgICAgIHJlYWQ6IFtdLFxuICAgICAgd3JpdGU6IFsuLi5jb2xsZWN0V3JpdGVGbGFncyhmbGFncyldLFxuICAgfTtcblxuICAgaWYgKHRhc2sgPT09ICdjb25maWcnKSB7XG4gICAgICBhcHBlbmRQYXJzZWRDb25maWdBY3Rpb24oXG4gICAgICAgICBwYXJzZWRDb25maWcsXG4gICAgICAgICBkZXRlY3RDb25maWdTY29wZShmbGFncyksXG4gICAgICAgICBkZXRlY3RDb25maWdBY3Rpb24oZmxhZ3MsIHBvc2l0aW9uYWxzKVxuICAgICAgKTtcbiAgIH1cblxuICAgcmV0dXJuIHBhcnNlZENvbmZpZztcbn1cblxuZnVuY3Rpb24gYXBwZW5kUGFyc2VkQ29uZmlnQWN0aW9uKFxuICAgcGFyc2VkQ29uZmlnOiBQYXJzZWRDb25maWdBY3Rpdml0eSxcbiAgIHNjb3BlOiBDb25maWdTY29wZSxcbiAgIGFjdGlvbjogQ29uZmlnT3BlcmF0aW9uIHwgbnVsbFxuKSB7XG4gICBpZiAoYWN0aW9uID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICB9XG5cbiAgIGNvbnN0IGNvbmZpZyA9IHRvT3BlcmF0aW9uKHNjb3BlLCBhY3Rpb24pO1xuICAgaWYgKGFjdGlvbi5pc1dyaXRlKSB7XG4gICAgICBwYXJzZWRDb25maWcud3JpdGUucHVzaChjb25maWcpO1xuICAgfSBlbHNlIHtcbiAgICAgIHBhcnNlZENvbmZpZy5yZWFkLnB1c2goY29uZmlnKTtcbiAgIH1cbn1cbiIsICIvLyDilIDilIAgT3B0aW9uIHRhYmxlcyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbi8vXG4vLyBFYWNoIHNjb3BlIGhhczpcbi8vICAgc2hvcnQgIOKAkyBNYXA8Y2hhciwgY29uc3VtZXNOZXh0PiAgKGtub3duIHNpbmdsZS1sZXR0ZXIgc3dpdGNoZXM7IHRydWUgPSB0YWtlcyBuZXh0IHRva2VuKVxuLy8gICBsb25nICAg4oCTIFNldDxzdGVtPiAgICAgICAgICAgICAgICAobG9uZyBzd2l0Y2ggc3RlbXMsIHdpdGhvdXQgLS0sIHRoYXQgdGFrZSB0aGUgbmV4dCB0b2tlbilcbi8vXG4vLyBPbmx5IHN3aXRjaGVzIGxpc3RlZCBoZXJlIGFyZSBcImtub3duXCIuIEFuIHVua25vd24gY2hhciBhbnl3aGVyZSBpbiBhIGNvbWJpbmVkXG4vLyBjbHVzdGVyIGNhdXNlcyB0aGUgZW50aXJlIGNsdXN0ZXIgdG8gYmUga2VwdCBhcyBvbmUgb3BhcXVlIHRva2VuLlxuXG5leHBvcnQgaW50ZXJmYWNlIEZsYWdTcGVjIHtcbiAgIHJlYWRvbmx5IHNob3J0OiBSZWFkb25seU1hcDxzdHJpbmcsIGJvb2xlYW4+O1xuICAgcmVhZG9ubHkgbG9uZzogUmVhZG9ubHlTZXQ8c3RyaW5nPjtcbn1cblxuY29uc3QgVU5JVkVSU0FMOiBGbGFnU3BlYyA9IHtcbiAgIHNob3J0OiBuZXcgTWFwKFtcbiAgICAgIFsnYycsIHRydWVdLCAvLyAgLWMgPGs9dj4gICAgc2V0IGNvbmZpZyBrZXkgZm9yIHRoaXMgaW52b2NhdGlvblxuICAgXSksXG4gICBsb25nOiBuZXcgU2V0KCksXG59O1xuXG5leHBvcnQgY29uc3QgR0xPQkFMOiBGbGFnU3BlYyA9IHtcbiAgIHNob3J0OiBuZXcgTWFwKFtcbiAgICAgIFsnQycsIHRydWVdLCAvLyAgLUMgPHBhdGg+ICAgY2hhbmdlIHdvcmtpbmcgZGlyZWN0b3J5XG4gICAgICBbJ1AnLCBmYWxzZV0sIC8vIC1QICAgICAgICAgIG5vIHBhZ2VyIChhbGlhcyBmb3IgLS1uby1wYWdlcilcbiAgICAgIFsnaCcsIGZhbHNlXSwgLy8gLWggICAgICAgICAgaGVscFxuICAgICAgWydwJywgZmFsc2VdLCAvLyAtcCAgICAgICAgICBwYWdpbmF0ZVxuICAgICAgWyd2JywgZmFsc2VdLCAvLyAtdiAgICAgICAgICB2ZXJzaW9uXG4gICAgICAuLi5VTklWRVJTQUwuc2hvcnQuZW50cmllcygpLFxuICAgXSksXG4gICBsb25nOiBuZXcgU2V0KFtcbiAgICAgICdhdHRyLXNvdXJjZScsXG4gICAgICAnY29uZmlnLWVudicsXG4gICAgICAnZXhlYy1wYXRoJyxcbiAgICAgICdnaXQtZGlyJyxcbiAgICAgICdsaXN0LWNtZHMnLFxuICAgICAgJ25hbWVzcGFjZScsXG4gICAgICAnc3VwZXItcHJlZml4JyxcbiAgICAgICd3b3JrLXRyZWUnLFxuICAgXSksXG59O1xuXG5jb25zdCBDT01NQU5EUzogUmVjb3JkPHN0cmluZywgRmxhZ1NwZWM+ID0ge1xuICAgY2xvbmU6IHtcbiAgICAgIHNob3J0OiBuZXcgTWFwKFtcbiAgICAgICAgIFsnYicsIHRydWVdLCAvLyAtYiA8YnJhbmNoPlxuICAgICAgICAgWydqJywgdHJ1ZV0sIC8vIC1qIDxuPiAgICAgICAgICBwYXJhbGxlbCBqb2JzXG4gICAgICAgICBbJ2wnLCBmYWxzZV0sIC8vIC1sIGxvY2FsXG4gICAgICAgICBbJ24nLCBmYWxzZV0sIC8vIC1uIG5vLWNoZWNrb3V0XG4gICAgICAgICBbJ28nLCB0cnVlXSwgLy8gLW8gPG5hbWU+ICAgICAgIHJlbW90ZSBuYW1lXG4gICAgICAgICBbJ3EnLCBmYWxzZV0sIC8vIC1xIHF1aWV0XG4gICAgICAgICBbJ3MnLCBmYWxzZV0sIC8vIC1zIHNoYXJlZFxuICAgICAgICAgWyd1JywgdHJ1ZV0sIC8vIC11IDx1cGxvYWQtcGFjaz5cbiAgICAgIF0pLFxuICAgICAgbG9uZzogbmV3IFNldChbJ2JyYW5jaCcsICdjb25maWcnLCAnam9icycsICdvcmlnaW4nLCAndXBsb2FkLXBhY2snLCAndScsICd0ZW1wbGF0ZSddKSxcbiAgIH0sXG4gICBjb21taXQ6IHtcbiAgICAgIHNob3J0OiBuZXcgTWFwKFtcbiAgICAgICAgIFsnQycsIHRydWVdLCAvLyAtQyA8Y29tbWl0PiAgcmV1c2UgbWVzc2FnZVxuICAgICAgICAgWydGJywgdHJ1ZV0sIC8vIC1GIDxmaWxlPiAgICByZWFkIG1lc3NhZ2UgZnJvbSBmaWxlXG4gICAgICAgICBbJ2MnLCB0cnVlXSwgLy8gLWMgPGNvbW1pdD4gIHJlZWRpdCBtZXNzYWdlXG4gICAgICAgICBbJ20nLCB0cnVlXSwgLy8gLW0gPG1zZz5cbiAgICAgICAgIFsndCcsIHRydWVdLCAvLyAtdCA8dGVtcGxhdGU+XG4gICAgICBdKSxcbiAgICAgIGxvbmc6IG5ldyBTZXQoWydmaWxlJywgJ21lc3NhZ2UnLCAncmVlZGl0LW1lc3NhZ2UnLCAncmV1c2UtbWVzc2FnZScsICd0ZW1wbGF0ZSddKSxcbiAgIH0sXG4gICBjb25maWc6IHtcbiAgICAgIHNob3J0OiBuZXcgTWFwKFtcbiAgICAgICAgIFsnZScsIGZhbHNlXSwgLy8gLWUgIG9wZW4gZWRpdG9yXG4gICAgICAgICBbJ2YnLCB0cnVlXSwgLy8gIC1mIDxmaWxlPlxuICAgICAgICAgWydsJywgZmFsc2VdLCAvLyAtbCAgbGlzdFxuICAgICAgXSksXG4gICAgICBsb25nOiBuZXcgU2V0KFsnYmxvYicsICdjb21tZW50JywgJ2RlZmF1bHQnLCAnZmlsZScsICd0eXBlJywgJ3ZhbHVlJ10pLFxuICAgfSxcbiAgIGZldGNoOiB7XG4gICAgICBzaG9ydDogbmV3IE1hcCgpLFxuICAgICAgbG9uZzogbmV3IFNldChbJ3VwbG9hZC1wYWNrJ10pLFxuICAgfSxcbiAgIGluaXQ6IHtcbiAgICAgIHNob3J0OiBuZXcgTWFwKCksXG4gICAgICBsb25nOiBuZXcgU2V0KFsndGVtcGxhdGUnXSksXG4gICB9LFxuICAgcHVsbDoge1xuICAgICAgc2hvcnQ6IG5ldyBNYXAoKSxcbiAgICAgIGxvbmc6IG5ldyBTZXQoWyd1cGxvYWQtcGFjayddKSxcbiAgIH0sXG4gICBwdXNoOiB7XG4gICAgICBzaG9ydDogbmV3IE1hcCgpLFxuICAgICAgbG9uZzogbmV3IFNldChbJ2V4ZWMnLCAncmVjZWl2ZS1wYWNrJ10pLFxuICAgfSxcbiAgIHJlYmFzZToge1xuICAgICAgc2hvcnQ6IG5ldyBNYXAoW1xuICAgICAgICAgWydYJywgdHJ1ZV0sIC8vIC1YIDxvcHRpb24+ICAgc3RyYXRlZ3kgb3B0aW9uXG4gICAgICAgICBbJ2YnLCBmYWxzZV0sIC8vIC1mIGZvcmNlLXJlYmFzZVxuICAgICAgICAgWydpJywgZmFsc2VdLCAvLyAtaSBpbnRlcmFjdGl2ZVxuICAgICAgICAgWydrJywgZmFsc2VdLCAvLyAtayBrZWVwLWJhc2VcbiAgICAgICAgIFsnbScsIGZhbHNlXSwgLy8gLW0gbWVyZ2VcbiAgICAgICAgIFsnbicsIGZhbHNlXSwgLy8gLW4gbm8tc3RhdFxuICAgICAgICAgWydxJywgZmFsc2VdLCAvLyAtcSBxdWlldFxuICAgICAgICAgWydyJywgZmFsc2VdLCAvLyAtciByZWJhc2UtbWVyZ2VzXG4gICAgICAgICBbJ3MnLCB0cnVlXSwgLy8gLXMgPHN0cmF0ZWd5PlxuICAgICAgICAgWyd2JywgZmFsc2VdLCAvLyAtdiB2ZXJib3NlXG4gICAgICAgICBbJ3gnLCB0cnVlXSwgLy8gLXggPGNtZD4gICAgICBleGVjXG4gICAgICBdKSxcbiAgICAgIGxvbmc6IG5ldyBTZXQoWydleGVjJywgJ29udG8nLCAnc3RyYXRlZ3knLCAnc3RyYXRlZ3ktb3B0aW9uJ10pLFxuICAgfSxcbn07XG5cbmNvbnN0IEVNUFRZOiBGbGFnU3BlYyA9IHsgc2hvcnQ6IG5ldyBNYXAoKSwgbG9uZzogbmV3IFNldCgpIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGbGFnU3BlY0ZvclRhc2sodGFzaz86IHN0cmluZyB8IG51bGwpIHtcbiAgIGNvbnN0IHNwZWMgPSBDT01NQU5EU1t0YXNrID8/ICcnXSA/PyBFTVBUWTtcblxuICAgcmV0dXJuIHtcbiAgICAgIHNob3J0OiBuZXcgTWFwKFsuLi5VTklWRVJTQUwuc2hvcnQuZW50cmllcygpLCAuLi5zcGVjLnNob3J0LmVudHJpZXMoKV0pLFxuICAgICAgbG9uZzogc3BlYy5sb25nLFxuICAgfTtcbn1cbiIsICJpbXBvcnQgeyBHTE9CQUwgfSBmcm9tICcuL2ZsYWctc3BlY3MnO1xuXG4vKiogUGFyc2UgYSBzaW5nbGUgcmF3IHRva2VuIChlLmcuIGAnLW0nYCwgYCctLWFtZW5kJ2AsIGAnLXVjJ2ApIGludG8gb25lIG9yXG4gKiAgbW9yZSBzd2l0Y2ggZGVzY3JpcHRvcnMuICBWYWx1ZXMgYXJlIG5vdCB5ZXQgcmVzb2x2ZWQgZm9yIG5lZWRzTmV4dD10cnVlLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4cGFuZFRva2VuKFxuICAgcmF3OiBzdHJpbmcsXG4gICBzcGVjID0gR0xPQkFMXG4pOiBBcnJheTx7XG4gICBuYW1lOiBzdHJpbmc7XG4gICB2YWx1ZT86IHN0cmluZztcbiAgIG5lZWRzTmV4dDogYm9vbGVhbjtcbn0+IHtcbiAgIGlmIChyYXcuc3RhcnRzV2l0aCgnLS0nKSkge1xuICAgICAgY29uc3QgZXEgPSByYXcuaW5kZXhPZignPScpO1xuICAgICAgaWYgKGVxID4gMikge1xuICAgICAgICAgcmV0dXJuIFt7IG5hbWU6IHJhdy5zbGljZSgwLCBlcSksIHZhbHVlOiByYXcuc2xpY2UoZXEgKyAxKSwgbmVlZHNOZXh0OiBmYWxzZSB9XTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHN0ZW0gPSByYXcuc2xpY2UoMik7XG4gICAgICByZXR1cm4gW3sgbmFtZTogcmF3LCBuZWVkc05leHQ6IHNwZWMubG9uZy5oYXMoc3RlbSkgfV07XG4gICB9XG5cbiAgIC8vIFNpbmdsZSBzaG9ydCBzd2l0Y2hcbiAgIGlmIChyYXcubGVuZ3RoID09PSAyKSB7XG4gICAgICBjb25zdCBjaGFyID0gcmF3LmNoYXJBdCgxKTtcbiAgICAgIGNvbnN0IGNvbnN1bWVzID0gc3BlYy5zaG9ydC5nZXQoY2hhcik7XG4gICAgICByZXR1cm4gW3sgbmFtZTogcmF3LCBuZWVkc05leHQ6IGNvbnN1bWVzID09PSB0cnVlIH1dO1xuICAgfVxuXG4gICAvLyBDb21iaW5lZCBzaG9ydCBjbHVzdGVyOiB0cnkgdG8gZXhwYW5kIGNoYXItYnktY2hhclxuICAgcmV0dXJuIGV4cGFuZENsdXN0ZXIocmF3LCBzcGVjLnNob3J0KTtcbn1cblxuZnVuY3Rpb24gZXhwYW5kQ2x1c3RlcihcbiAgIHJhdzogc3RyaW5nLFxuICAgc2hvcnRTcGVjOiBSZWFkb25seU1hcDxzdHJpbmcsIGJvb2xlYW4+XG4pOiBBcnJheTx7IG5hbWU6IHN0cmluZzsgdmFsdWU/OiBzdHJpbmc7IG5lZWRzTmV4dDogYm9vbGVhbiB9PiB7XG4gICBjb25zdCBjaGFycyA9IHJhdy5zbGljZSgxKS5zcGxpdCgnJyk7XG4gICBjb25zdCByZXN1bHQ6IEFycmF5PHsgbmFtZTogc3RyaW5nOyB2YWx1ZT86IHN0cmluZzsgbmVlZHNOZXh0OiBib29sZWFuIH0+ID0gW107XG5cbiAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNoYXIgPSBjaGFyc1tpXTtcbiAgICAgIGNvbnN0IGNvbnN1bWVzID0gc2hvcnRTcGVjLmdldChjaGFyKTtcblxuICAgICAgaWYgKGNvbnN1bWVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgIC8vIFVua25vd24gY2hhcjoga2VlcCB0aGUgd2hvbGUgcmF3IHRva2VuIGFzIG9wYXF1ZVxuICAgICAgICAgcmV0dXJuIFt7IG5hbWU6IHJhdywgbmVlZHNOZXh0OiBmYWxzZSB9XTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbnN1bWVzKSB7XG4gICAgICAgICBjb25zdCByZW1haW5kZXIgPSBjaGFycy5zbGljZShpICsgMSkuam9pbignJyk7XG4gICAgICAgICBpZiAocmVtYWluZGVyKSB7XG4gICAgICAgICAgICBjb25zdCByZW1haW5kZXJBbGxLbm93biA9IFsuLi5yZW1haW5kZXJdLmV2ZXJ5KChjKSA9PiBzaG9ydFNwZWMuaGFzKGMpKTtcbiAgICAgICAgICAgIGlmICghcmVtYWluZGVyQWxsS25vd24pIHtcbiAgICAgICAgICAgICAgIC8vIFJlbWFpbmluZyBjaGFycyBhcmUgdGhlIGVtYmVkZGVkIHZhbHVlLCBub3Qgc2VwYXJhdGUgZmxhZ3NcbiAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHsgbmFtZTogYC0ke2NoYXJ9YCwgdmFsdWU6IHJlbWFpbmRlciwgbmVlZHNOZXh0OiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdC5wdXNoKHsgbmFtZTogYC0ke2NoYXJ9YCwgbmVlZHNOZXh0OiBjb25zdW1lcyB9KTtcbiAgIH1cblxuICAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsICJpbXBvcnQgeyBleHBhbmRUb2tlbiB9IGZyb20gJy4uL3Rva2Vucy90b2tlbi1leHBhbmRlcic7XG5pbXBvcnQgdHlwZSB7IEZsYWcgfSBmcm9tICcuL2ZsYWdzLmhlbHBlcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdsb2JhbEZsYWdzIHtcbiAgIGZsYWdzOiBGbGFnW107XG4gICB0YXNrSW5kZXg6IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlR2xvYmFsRmxhZ3ModG9rZW5zOiByZWFkb25seSB1bmtub3duW10sIGZsYWdzOiBGbGFnW10gPSBbXSk6IEdsb2JhbEZsYWdzIHtcbiAgIGxldCBpID0gMDtcblxuICAgd2hpbGUgKGkgPCB0b2tlbnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCByYXcgPSBTdHJpbmcodG9rZW5zW2ldKTtcbiAgICAgIGlmICghcmF3LnN0YXJ0c1dpdGgoJy0nKSB8fCByYXcubGVuZ3RoIDwgMikgYnJlYWs7XG5cbiAgICAgIGNvbnN0IHBhcnNlZCA9IGV4cGFuZFRva2VuKHJhdyk7XG4gICAgICBsZXQgbmV4dCA9IGkgKyAxO1xuXG4gICAgICBmb3IgKGNvbnN0IHRva2VuIG9mIHBhcnNlZCkge1xuICAgICAgICAgY29uc3QgZmxhZzogRmxhZyA9IHtcbiAgICAgICAgICAgIG5hbWU6IHRva2VuLm5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogdG9rZW4udmFsdWUsXG4gICAgICAgICAgICBhYnNvcmJlZE5leHQ6IGZhbHNlLFxuICAgICAgICAgICAgaXNHbG9iYWw6IHRydWUsXG4gICAgICAgICB9O1xuICAgICAgICAgaWYgKHRva2VuLm5lZWRzTmV4dCAmJiBmbGFnLnZhbHVlID09PSB1bmRlZmluZWQgJiYgbmV4dCA8IHRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZsYWcudmFsdWUgPSBTdHJpbmcodG9rZW5zW25leHRdKTtcbiAgICAgICAgICAgIGZsYWcuYWJzb3JiZWROZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgIG5leHQrKztcbiAgICAgICAgIH1cbiAgICAgICAgIGZsYWdzLnB1c2goZmxhZyk7XG4gICAgICB9XG5cbiAgICAgIGkgPSBuZXh0O1xuICAgfVxuXG4gICByZXR1cm4geyBmbGFncywgdGFza0luZGV4OiBpIH07XG59XG4iLCAiaW1wb3J0IHsgaXNQYXRoU3BlYywgdG9QYXRocyB9IGZyb20gJ0BzaW1wbGUtZ2l0L2FyZ3MtcGF0aHNwZWMnO1xuXG5pbXBvcnQgeyBnZXRGbGFnU3BlY0ZvclRhc2sgfSBmcm9tICcuLi90b2tlbnMvZmxhZy1zcGVjcyc7XG5pbXBvcnQgeyBleHBhbmRUb2tlbiB9IGZyb20gJy4uL3Rva2Vucy90b2tlbi1leHBhbmRlcic7XG5pbXBvcnQgdHlwZSB7IEZsYWcgfSBmcm9tICcuL2ZsYWdzLmhlbHBlcnMnO1xuXG50eXBlIFRhc2tGbGFncyA9IHtcbiAgIGZsYWdzOiBGbGFnW107XG4gICBwb3NpdGlvbmFsczogc3RyaW5nW107XG4gICBwYXRoc3BlY3M6IHN0cmluZ1tdO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVGFza0ZsYWdzKFxuICAgdG9rZW5zOiByZWFkb25seSB1bmtub3duW10sXG4gICB0YXNrOiBzdHJpbmcgfCBudWxsLFxuICAgZmxhZ3M6IEZsYWdbXSA9IFtdXG4pOiBUYXNrRmxhZ3Mge1xuICAgY29uc3Qgc3BlYyA9IGdldEZsYWdTcGVjRm9yVGFzayh0YXNrKTtcbiAgIGNvbnN0IHBvc2l0aW9uYWxzOiBzdHJpbmdbXSA9IFtdO1xuICAgY29uc3QgcGF0aHNwZWNzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICBsZXQgaSA9IDA7XG4gICB3aGlsZSAoaSA8IHRva2Vucy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSB0b2tlbnNbaV07XG5cbiAgICAgIGlmIChpc1BhdGhTcGVjKGN1cnJlbnQpKSB7XG4gICAgICAgICBwYXRoc3BlY3MucHVzaCguLi50b1BhdGhzKGN1cnJlbnQgYXMgc3RyaW5nKSk7XG4gICAgICAgICBpKys7XG4gICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmF3ID0gU3RyaW5nKGN1cnJlbnQpO1xuXG4gICAgICBpZiAocmF3ID09PSAnLS0nKSB7XG4gICAgICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCB0b2tlbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHQgPSB0b2tlbnNbal07XG4gICAgICAgICAgICBpc1BhdGhTcGVjKHQpID8gcGF0aHNwZWNzLnB1c2goLi4udG9QYXRocyh0IGFzIHN0cmluZykpIDogcGF0aHNwZWNzLnB1c2goU3RyaW5nKHQpKTtcbiAgICAgICAgIH1cbiAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXJhdy5zdGFydHNXaXRoKCctJykgfHwgcmF3Lmxlbmd0aCA8IDIpIHtcbiAgICAgICAgIHBvc2l0aW9uYWxzLnB1c2gocmF3KTtcbiAgICAgICAgIGkrKztcbiAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXJzZWQgPSBleHBhbmRUb2tlbihyYXcsIHNwZWMpO1xuICAgICAgbGV0IG5leHQgPSBpICsgMTtcblxuICAgICAgZm9yIChjb25zdCB0b2tlbiBvZiBwYXJzZWQpIHtcbiAgICAgICAgIGNvbnN0IGZsYWc6IEZsYWcgPSB7XG4gICAgICAgICAgICBuYW1lOiB0b2tlbi5uYW1lLFxuICAgICAgICAgICAgdmFsdWU6IHRva2VuLnZhbHVlLFxuICAgICAgICAgICAgYWJzb3JiZWROZXh0OiBmYWxzZSxcbiAgICAgICAgICAgIGlzR2xvYmFsOiBmYWxzZSxcbiAgICAgICAgIH07XG4gICAgICAgICBpZiAoXG4gICAgICAgICAgICB0b2tlbi5uZWVkc05leHQgJiZcbiAgICAgICAgICAgIGZsYWcudmFsdWUgPT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgbmV4dCA8IHRva2Vucy5sZW5ndGggJiZcbiAgICAgICAgICAgICFpc1BhdGhTcGVjKHRva2Vuc1tuZXh0XSlcbiAgICAgICAgICkge1xuICAgICAgICAgICAgZmxhZy52YWx1ZSA9IFN0cmluZyh0b2tlbnNbbmV4dF0pO1xuICAgICAgICAgICAgZmxhZy5hYnNvcmJlZE5leHQgPSB0cnVlO1xuICAgICAgICAgICAgbmV4dCsrO1xuICAgICAgICAgfVxuICAgICAgICAgZmxhZ3MucHVzaChmbGFnKTtcbiAgICAgIH1cblxuICAgICAgaSA9IG5leHQ7XG4gICB9XG5cbiAgIHJldHVybiB7IGZsYWdzLCBwb3NpdGlvbmFscywgcGF0aHNwZWNzIH07XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBQYXJzZWRDb25maWdBY3Rpdml0eSB9IGZyb20gJy4uL2FyZ3MvcGFyc2UtYXJndi50eXBlcyc7XG5pbXBvcnQgdHlwZSB7IFZ1bG5lcmFiaWxpdHksIFZ1bG5lcmFiaWxpdHlDYXRlZ29yeSB9IGZyb20gJy4vdnVsbmVyYWJpbGl0eS50eXBlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiogZGV0ZWN0VnVsbmVyYWJsZUNvbmZpZ1dyaXRlcyh7XG4gICB3cml0ZSxcbn06IFBhcnNlZENvbmZpZ0FjdGl2aXR5KTogR2VuZXJhdG9yPFZ1bG5lcmFiaWxpdHk+IHtcbiAgIGZvciAoY29uc3QgY29uZmlnIG9mIHdyaXRlKSB7XG4gICAgICBmb3IgKGNvbnN0IGhlbHBlciBvZiBwcmV2ZW50VW5zYWZlQ29uZmlnKSB7XG4gICAgICAgICBjb25zdCB2dWxuZXJhYmlsaXR5ID0gaGVscGVyKGNvbmZpZy5rZXkpO1xuICAgICAgICAgaWYgKHZ1bG5lcmFiaWxpdHkpIHtcbiAgICAgICAgICAgIHlpZWxkIHZ1bG5lcmFiaWxpdHk7XG4gICAgICAgICB9XG4gICAgICB9XG4gICB9XG59XG5cbmZ1bmN0aW9uIHByZXZlbnRDb25maWdCdWlsZGVyKFxuICAgY29uZmlnOiBzdHJpbmcgfCBSZWdFeHAsXG4gICBjYXRlZ29yeTogVnVsbmVyYWJpbGl0eUNhdGVnb3J5LFxuICAgbWVzc2FnZSA9IFN0cmluZyhjb25maWcpXG4pIHtcbiAgIGNvbnN0IHJlZ2V4ID0gdHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycgPyBuZXcgUmVnRXhwKGBcXFxccyoke2NvbmZpZy50b0xvd2VyQ2FzZSgpfWApIDogY29uZmlnO1xuXG4gICByZXR1cm4gZnVuY3Rpb24gcHJldmVudENvbW1hbmQoa2V5OiBzdHJpbmcpOiBWdWxuZXJhYmlsaXR5IHwgdm9pZCB7XG4gICAgICBpZiAocmVnZXgudGVzdChrZXkpKSB7XG4gICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2F0ZWdvcnksXG4gICAgICAgICAgICBtZXNzYWdlOiBgQ29uZmlndXJpbmcgJHttZXNzYWdlfSBpcyBub3QgcGVybWl0dGVkIHdpdGhvdXQgZW5hYmxpbmcgJHtjYXRlZ29yeX1gLFxuICAgICAgICAgfTtcbiAgICAgIH1cbiAgIH07XG59XG5cbmZ1bmN0aW9uIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoY29uZmlnOiBzdHJpbmcsIGNhdGVnb3J5OiBWdWxuZXJhYmlsaXR5Q2F0ZWdvcnkpIHtcbiAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChgXFxcXHMqJHtjb25maWcudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXC4vZywgJyguLispPy4nKX1gKTtcbiAgIHJldHVybiBwcmV2ZW50Q29uZmlnQnVpbGRlcihyZWdleCwgY2F0ZWdvcnksIGNvbmZpZyk7XG59XG5cbmNvbnN0IHByZXZlbnRVbnNhZmVDb25maWcgPSBbXG4gICBwcmV2ZW50Q29uZmlnQnVpbGRlcignYWxpYXMnLCAnYWxsb3dVbnNhZmVBbGlhcycpLFxuICAgcHJldmVudENvbmZpZ0J1aWxkZXIoJ2NvcmUuYXNrUGFzcycsICdhbGxvd1Vuc2FmZUFza1Bhc3MnKSxcbiAgIHByZXZlbnRDb25maWdCdWlsZGVyKCdjb3JlLmVkaXRvcicsICdhbGxvd1Vuc2FmZUVkaXRvcicpLFxuICAgcHJldmVudENvbmZpZ0J1aWxkZXIoJ2NvcmUuZnNtb25pdG9yJywgJ2FsbG93VW5zYWZlRnNNb25pdG9yJyksXG4gICBwcmV2ZW50Q29uZmlnQnVpbGRlcignY29yZS5naXRQcm94eScsICdhbGxvd1Vuc2FmZUdpdFByb3h5JyksXG4gICBwcmV2ZW50Q29uZmlnQnVpbGRlcignY29yZS5ob29rc1BhdGgnLCAnYWxsb3dVbnNhZmVIb29rc1BhdGgnKSxcbiAgIHByZXZlbnRDb25maWdCdWlsZGVyKCdjb3JlLnBhZ2VyJywgJ2FsbG93VW5zYWZlUGFnZXInKSxcbiAgIHByZXZlbnRDb25maWdCdWlsZGVyKCdjb3JlLnNzaENvbW1hbmQnLCAnYWxsb3dVbnNhZmVTc2hDb21tYW5kJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCdjcmVkZW50aWFsLmhlbHBlcicsICdhbGxvd1Vuc2FmZUNyZWRlbnRpYWxIZWxwZXInKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ2RpZmYuY29tbWFuZCcsICdhbGxvd1Vuc2FmZURpZmZFeHRlcm5hbCcpLFxuICAgcHJldmVudENvbmZpZ0J1aWxkZXIoJ2RpZmYuZXh0ZXJuYWwnLCAnYWxsb3dVbnNhZmVEaWZmRXh0ZXJuYWwnKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ2RpZmZ0b29sLmNtZCcsICdhbGxvd1Vuc2FmZURpZmZFeHRlcm5hbCcpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcignZGlmZi50ZXh0Y29udicsICdhbGxvd1Vuc2FmZURpZmZUZXh0Q29udicpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcignZmlsdGVyLmNsZWFuJywgJ2FsbG93VW5zYWZlRmlsdGVyJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCdmaWx0ZXIucHJvY2VzcycsICdhbGxvd1Vuc2FmZUZpbHRlcicpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcignZmlsdGVyLnNtdWRnZScsICdhbGxvd1Vuc2FmZUZpbHRlcicpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcignZ3BnLnByb2dyYW0nLCAnYWxsb3dVbnNhZmVHcGdQcm9ncmFtJyksXG4gICBwcmV2ZW50Q29uZmlnQnVpbGRlcignaW5jbHVkZS5wYXRoJywgJ2FsbG93VW5zYWZlSW5jbHVkZScpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcignaW5jbHVkZUlmJywgJ2FsbG93VW5zYWZlSW5jbHVkZScpLFxuICAgcHJldmVudENvbmZpZ0J1aWxkZXIoJ2luaXQudGVtcGxhdGVEaXInLCAnYWxsb3dVbnNhZmVUZW1wbGF0ZURpcicpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcigncGFnZXIuJywgJ2FsbG93VW5zYWZlUGFnZXInKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ21lcmdlLmRyaXZlcicsICdhbGxvd1Vuc2FmZU1lcmdlRHJpdmVyJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCdtZXJnZXRvb2wucGF0aCcsICdhbGxvd1Vuc2FmZU1lcmdlRHJpdmVyJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCdtZXJnZXRvb2wuY21kJywgJ2FsbG93VW5zYWZlTWVyZ2VEcml2ZXInKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ3Byb3RvY29sLmFsbG93JywgJ2FsbG93VW5zYWZlUHJvdG9jb2xPdmVycmlkZScpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcigncmVtb3RlLnJlY2VpdmVwYWNrJywgJ2FsbG93VW5zYWZlUGFjaycpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcigncmVtb3RlLnVwbG9hZHBhY2snLCAnYWxsb3dVbnNhZmVQYWNrJyksXG4gICBwcmV2ZW50Q29uZmlnQnVpbGRlcigndXBsb2FkcGFjay5wYWNrT2JqZWN0c0hvb2snLCAnYWxsb3dVbnNhZmVQYWNrJyksXG4gICBwcmV2ZW50Q29uZmlnQnVpbGRlcignc2VxdWVuY2UuZWRpdG9yJywgJ2FsbG93VW5zYWZlRWRpdG9yJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCdzdWJtb2R1bGUudXBkYXRlJywgJ2FsbG93VW5zYWZlU3VibW9kdWxlJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCd0YXIuY29tbWFuZCcsICdhbGxvd1Vuc2FmZUNvbW1hbmRCaW5hcmllcycpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcigndHJhaWxlci5jbWQnLCAnYWxsb3dVbnNhZmVDb21tYW5kQmluYXJpZXMnKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ3RyYWlsZXIuY29tbWFuZCcsICdhbGxvd1Vuc2FmZUNvbW1hbmRCaW5hcmllcycpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcigndXJsLmluc3RlYWRPZicsICdhbGxvd1Vuc2FmZVVybFJld3JpdGUnKSxcbl07XG4iLCAiaW1wb3J0IHR5cGUgeyBGbGFnIH0gZnJvbSAnLi4vZmxhZ3MvZmxhZ3MuaGVscGVycyc7XG5pbXBvcnQgdHlwZSB7IFZ1bG5lcmFiaWxpdHksIFZ1bG5lcmFiaWxpdHlDYXRlZ29yeSB9IGZyb20gJy4vdnVsbmVyYWJpbGl0eS50eXBlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiogZGV0ZWN0VnVsbmVyYWJsZUZsYWdzKFxuICAgdGFzazogbnVsbCB8IHN0cmluZyxcbiAgIGZsYWdzOiBGbGFnW11cbik6IEdlbmVyYXRvcjxWdWxuZXJhYmlsaXR5PiB7XG4gICBmb3IgKGNvbnN0IGZsYWcgb2YgZmxhZ3MpIHtcbiAgICAgIGZvciAoY29uc3QgaGVscGVyIG9mIHByZXZlbnRVbnNhZmVGbGFncykge1xuICAgICAgICAgY29uc3QgdnVsbmVyYWJpbGl0eSA9IGhlbHBlcih0YXNrLCBmbGFnKTtcbiAgICAgICAgIGlmICh2dWxuZXJhYmlsaXR5KSB7XG4gICAgICAgICAgICB5aWVsZCB2dWxuZXJhYmlsaXR5O1xuICAgICAgICAgfVxuICAgICAgfVxuICAgfVxufVxuXG5pbnRlcmZhY2UgUHJldmVudEZsYWdPcHRpb25zIHtcbiAgIC8qKiBMYWJlbCB0byB1c2UgaW4gdGhlIGVycm9yIG1lc3NhZ2UgaW4gcGxhY2Ugb2YgdGhlIG1hdGNoZXIgaXRzZWxmICovXG4gICBuYW1lPzogc3RyaW5nO1xuXG4gICAvKiogT25seSBtYXRjaCB3aGVuIHRoZSBzd2l0Y2ggYXBwZWFycyBiZWZvcmUgdGhlIGdpdCBzdWItY29tbWFuZCAqL1xuICAgZ2xvYmFsT25seT86IGJvb2xlYW47XG5cbiAgIC8qKlxuICAgICogT25seSBtYXRjaCB3aGVuIHRoZSBzd2l0Y2ggd2FzIHN1cHBsaWVkIHdpdGggYSB2YWx1ZSAtIHdpdGhvdXQgb25lIHN3aXRjaGVzXG4gICAgKiBzdWNoIGFzIGAtLWdpdC1kaXJgIGFuZCBgLS1leGVjLXBhdGhgIGFyZSBnZXR0ZXJzIHJhdGhlciB0aGFuIHNldHRlcnMuXG4gICAgKi9cbiAgIHdpdGhWYWx1ZT86IGJvb2xlYW47XG59XG5cbmZ1bmN0aW9uIHByZXZlbnRGbGFnQnVpbGRlcihcbiAgIHRhc2s6IHN0cmluZyB8IG51bGwsXG4gICBmbGFnOiBzdHJpbmcgfCBSZWdFeHAsXG4gICBjYXRlZ29yeTogVnVsbmVyYWJpbGl0eUNhdGVnb3J5LFxuICAgeyBuYW1lID0gU3RyaW5nKGZsYWcpLCBnbG9iYWxPbmx5ID0gZmFsc2UsIHdpdGhWYWx1ZSA9IGZhbHNlIH06IFByZXZlbnRGbGFnT3B0aW9ucyA9IHt9XG4pIHtcbiAgIGNvbnN0IHJlZ2V4ID0gdHlwZW9mIGZsYWcgPT09ICdzdHJpbmcnID8gbmV3IFJlZ0V4cChgXFxcXHMqJHtmbGFnLnRvTG93ZXJDYXNlKCl9YCkgOiBmbGFnO1xuICAgY29uc3QgbWVzc2FnZSA9IGBVc2Ugb2YgJHt0YXNrID8gYCR7dGFza30gd2l0aCBvcHRpb24gYCA6ICcnfSR7bmFtZX0gaXMgbm90IHBlcm1pdHRlZCB3aXRob3V0IGVuYWJsaW5nICR7Y2F0ZWdvcnl9YDtcblxuICAgcmV0dXJuIGZ1bmN0aW9uIHByZXZlbnRGbGFnKGN1cnJlbnRUYXNrOiBzdHJpbmcgfCBudWxsLCBmbGFnOiBGbGFnKTogVnVsbmVyYWJpbGl0eSB8IHZvaWQge1xuICAgICAgaWYgKHRhc2sgJiYgY3VycmVudFRhc2sgIT09IHRhc2spIHtcbiAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGdsb2JhbE9ubHkgJiYgIWZsYWcuaXNHbG9iYWwpIHtcbiAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHdpdGhWYWx1ZSAmJiBmbGFnLnZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlZ2V4LnRlc3QoZmxhZy5uYW1lKSkge1xuICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNhdGVnb3J5LFxuICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgIH07XG4gICAgICB9XG4gICB9O1xufVxuXG5jb25zdCBwYXRoVGFraW5nR2xvYmFsOiBQcmV2ZW50RmxhZ09wdGlvbnMgPSB7IGdsb2JhbE9ubHk6IHRydWUsIHdpdGhWYWx1ZTogdHJ1ZSB9O1xuXG5jb25zdCBwcmV2ZW50VW5zYWZlRmxhZ3MgPSBbXG4gICBwcmV2ZW50RmxhZ0J1aWxkZXIobnVsbCwgLy0tKHVwbG9hZHxyZWNlaXZlKS1wYWNrLywgJ2FsbG93VW5zYWZlUGFjaycsIHtcbiAgICAgIG5hbWU6ICctLXVwbG9hZC1wYWNrIG9yIC0tcmVjZWl2ZS1wYWNrJyxcbiAgIH0pLFxuICAgcHJldmVudEZsYWdCdWlsZGVyKCdjbG9uZScsIC9eLVxcdyp1LywgJ2FsbG93VW5zYWZlUGFjaycpLFxuICAgcHJldmVudEZsYWdCdWlsZGVyKCdjbG9uZScsICctLXUnLCAnYWxsb3dVbnNhZmVQYWNrJyksXG4gICBwcmV2ZW50RmxhZ0J1aWxkZXIoJ3B1c2gnLCAvXi0tZXhlYyQvLCAnYWxsb3dVbnNhZmVQYWNrJywgeyBuYW1lOiAnLS1leGVjJyB9KSxcbiAgIC8vIGBnaXRgIGFjY2VwdHMgdW5hbWJpZ3VvdXMgYWJicmV2aWF0aW9ucyBvZiBsb25nIG9wdGlvbnMsIHNvIGAtLWV4YCBhbmQgYC0tZXhlYCBhcmUgYC0tZXhlY2BcbiAgIHByZXZlbnRGbGFnQnVpbGRlcigncmViYXNlJywgL14oLXh8LS1leChlYz8pPykkLywgJ2FsbG93VW5zYWZlRXhlYycsIHsgbmFtZTogJy14IG9yIC0tZXhlYycgfSksXG4gICBwcmV2ZW50RmxhZ0J1aWxkZXIobnVsbCwgJy0tdGVtcGxhdGUnLCAnYWxsb3dVbnNhZmVUZW1wbGF0ZURpcicpLFxuICAgcHJldmVudEZsYWdCdWlsZGVyKG51bGwsICctLWV4ZWMtcGF0aCcsICdhbGxvd1Vuc2FmZUV4ZWMnLCBwYXRoVGFraW5nR2xvYmFsKSxcbiAgIC8vIGBnaXRgIHJlYWRzIHRoZSBjb25maWd1cmF0aW9uIG9mIHdoaWNoZXZlciByZXBvc2l0b3J5IHRoZXNlIG5hbWUsIHNvIHRoZVxuICAgLy8gZGlyZWN0b3J5IGFsb25lIGlzIGVub3VnaCB0byBkZWxpdmVyIGNvbmZpZyB0aGUgYXJndiBndWFyZHMgbmV2ZXIgc2VlXG4gICBwcmV2ZW50RmxhZ0J1aWxkZXIobnVsbCwgJy0tZ2l0LWRpcicsICdhbGxvd1Vuc2FmZUNvbmZpZ1BhdGhzJywgcGF0aFRha2luZ0dsb2JhbCksXG4gICBwcmV2ZW50RmxhZ0J1aWxkZXIobnVsbCwgJy0td29yay10cmVlJywgJ2FsbG93VW5zYWZlQ29uZmlnUGF0aHMnLCBwYXRoVGFraW5nR2xvYmFsKSxcbiAgIHByZXZlbnRGbGFnQnVpbGRlcihudWxsLCAvXi1DJC8sICdhbGxvd1Vuc2FmZUNvbmZpZ1BhdGhzJywgeyAuLi5wYXRoVGFraW5nR2xvYmFsLCBuYW1lOiAnLUMnIH0pLFxuXTtcbiIsICJpbXBvcnQgdHlwZSB7IFBhcnNlZENvbmZpZ0FjdGl2aXR5IH0gZnJvbSAnLi4vYXJncy9wYXJzZS1hcmd2LnR5cGVzJztcbmltcG9ydCB0eXBlIHsgRmxhZyB9IGZyb20gJy4uL2ZsYWdzL2ZsYWdzLmhlbHBlcnMnO1xuaW1wb3J0IHsgZGV0ZWN0VnVsbmVyYWJsZUNvbmZpZ1dyaXRlcyB9IGZyb20gJy4vZGV0ZWN0LXZ1bG5lcmFibGUtY29uZmlnLXdyaXRlcyc7XG5pbXBvcnQgeyBkZXRlY3RWdWxuZXJhYmxlRmxhZ3MgfSBmcm9tICcuL2RldGVjdC12dWxuZXJhYmxlLWZsYWdzJztcbmltcG9ydCB0eXBlIHsgVnVsbmVyYWJpbGl0eSB9IGZyb20gJy4vdnVsbmVyYWJpbGl0eS50eXBlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB2dWxuZXJhYmlsaXR5QW5hbHlzaXMoXG4gICB0YXNrOiBudWxsIHwgc3RyaW5nLFxuICAgZmxhZ3M6IEZsYWdbXSxcbiAgIGNvbmZpZzogUGFyc2VkQ29uZmlnQWN0aXZpdHlcbik6IFZ1bG5lcmFiaWxpdHlbXSB7XG4gICByZXR1cm4gWy4uLmRldGVjdFZ1bG5lcmFibGVGbGFncyh0YXNrLCBmbGFncyksIC4uLmRldGVjdFZ1bG5lcmFibGVDb25maWdXcml0ZXMoY29uZmlnKV07XG59XG4iLCAiaW1wb3J0IHsgY29sbGVjdENvbmZpZ0FjY2VzcyB9IGZyb20gJy4uL2NvbmZpZy9hbmFseXNlLWNvbmZpZyc7XG5pbXBvcnQgdHlwZSB7IEZsYWcgfSBmcm9tICcuLi9mbGFncy9mbGFncy5oZWxwZXJzJztcbmltcG9ydCB7IHBhcnNlR2xvYmFsRmxhZ3MgfSBmcm9tICcuLi9mbGFncy9wYXJzZS1nbG9iYWwtZmxhZ3MnO1xuaW1wb3J0IHsgcGFyc2VUYXNrRmxhZ3MgfSBmcm9tICcuLi9mbGFncy9wYXJzZS10YXNrLWZsYWdzJztcbmltcG9ydCB0eXBlIHsgVnVsbmVyYWJpbGl0eSB9IGZyb20gJy4uL3Z1bG5lcmFiaWxpdGllcy92dWxuZXJhYmlsaXR5LnR5cGVzJztcbmltcG9ydCB7IHZ1bG5lcmFiaWxpdHlBbmFseXNpcyB9IGZyb20gJy4uL3Z1bG5lcmFiaWxpdGllcy92dWxuZXJhYmlsaXR5LWFuYWx5c2lzJztcbmltcG9ydCB0eXBlIHsgUGFyc2VkQXJndiwgUGFyc2VkRmxhZyB9IGZyb20gJy4vcGFyc2UtYXJndi50eXBlcyc7XG5cbi8qKlxuICogUGFyc2UgdGhlIHRva2VucyB0aGF0IHdvdWxkIGJlIGZvcndhcmRlZCB0byBhIGBnaXRgIGNoaWxkLXByb2Nlc3MgYW5kXG4gKiByZXR1cm4gYSBzdHJ1Y3R1cmVkIHN1bW1hcnkgb2Ygd2hhdCB0aGUgaW52b2NhdGlvbiBkb2VzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VBcmd2KC4uLnRva2VuczogcmVhZG9ubHkgdW5rbm93bltdKTogUGFyc2VkQXJndiB7XG4gICBjb25zdCB7IGZsYWdzLCB0YXNrSW5kZXggfSA9IHBhcnNlR2xvYmFsRmxhZ3ModG9rZW5zKTtcblxuICAgY29uc3QgdGFzayA9IHRhc2tJbmRleCA8IHRva2Vucy5sZW5ndGggPyBTdHJpbmcodG9rZW5zW3Rhc2tJbmRleF0pLnRvTG93ZXJDYXNlKCkgOiBudWxsO1xuICAgY29uc3QgdGFza1Rva2VucyA9IHRhc2sgIT09IG51bGwgPyB0b2tlbnMuc2xpY2UodGFza0luZGV4ICsgMSkgOiBbXTtcblxuICAgY29uc3QgeyBwb3NpdGlvbmFscywgcGF0aHNwZWNzIH0gPSBwYXJzZVRhc2tGbGFncyh0YXNrVG9rZW5zLCB0YXNrLCBmbGFncyk7XG4gICBjb25zdCBjb25maWcgPSBjb2xsZWN0Q29uZmlnQWNjZXNzKHRhc2ssIGZsYWdzLCBwb3NpdGlvbmFscyk7XG5cbiAgIHJldHVybiB7XG4gICAgICB0YXNrLFxuICAgICAgZmxhZ3M6IGZsYWdzLm1hcCh0b1BhcnNlZEZsYWcpLFxuICAgICAgcGF0aHM6IHBhdGhzcGVjcyxcbiAgICAgIGNvbmZpZyxcbiAgICAgIHZ1bG5lcmFiaWxpdGllczogdnVsbmVyYWJpbGl0eUxpc3QodnVsbmVyYWJpbGl0eUFuYWx5c2lzKHRhc2ssIGZsYWdzLCBjb25maWcpKSxcbiAgIH07XG59XG5cbmZ1bmN0aW9uIHZ1bG5lcmFiaWxpdHlMaXN0KHZ1bG5lcmFiaWxpdGllczogVnVsbmVyYWJpbGl0eVtdKSB7XG4gICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHZ1bG5lcmFiaWxpdGllcywgJ3Z1bG5lcmFiaWxpdGllcycsIHtcbiAgICAgIHZhbHVlOiB2dWxuZXJhYmlsaXRpZXMsXG4gICB9KTtcbn1cblxuZnVuY3Rpb24gdG9QYXJzZWRGbGFnKHsgdmFsdWUsIG5hbWUgfTogRmxhZyk6IFBhcnNlZEZsYWcge1xuICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgPyB7IG5hbWUsIHZhbHVlIH0gOiB7IG5hbWUgfTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IENvbmZpZ1dyaXRlLCBQYXJzZWRDb25maWdBY3Rpdml0eSB9IGZyb20gJy4uL2FyZ3MvcGFyc2UtYXJndi50eXBlcyc7XG5pbXBvcnQgdHlwZSB7IFZ1bG5lcmFiaWxpdHksIFZ1bG5lcmFiaWxpdHlDYXRlZ29yeSB9IGZyb20gJy4uL3Z1bG5lcmFiaWxpdGllcy92dWxuZXJhYmlsaXR5LnR5cGVzJztcbmltcG9ydCB7IHZ1bG5lcmFiaWxpdHlBbmFseXNpcyB9IGZyb20gJy4uL3Z1bG5lcmFiaWxpdGllcy92dWxuZXJhYmlsaXR5LWFuYWx5c2lzJztcblxuY29uc3QgR2l0RW52S2V5cyA9IHtcbiAgICdlZGl0b3InOiAnYWxsb3dVbnNhZmVFZGl0b3InLFxuICAgJ2dpdF9hc2twYXNzJzogJ2FsbG93VW5zYWZlQXNrUGFzcycsXG4gICAnZ2l0X2NvbmZpZ19nbG9iYWwnOiAnYWxsb3dVbnNhZmVDb25maWdQYXRocycsXG4gICAnZ2l0X2NvbmZpZ19zeXN0ZW0nOiAnYWxsb3dVbnNhZmVDb25maWdQYXRocycsXG4gICAnZ2l0X2NvbmZpZ19jb3VudCc6ICdhbGxvd1Vuc2FmZUNvbmZpZ0VudkNvdW50JyxcbiAgICdnaXRfY29uZmlnX3BhcmFtZXRlcnMnOiAnYWxsb3dVbnNhZmVDb25maWdFbnZDb3VudCcsXG4gICAnZ2l0X2NvbmZpZyc6ICdhbGxvd1Vuc2FmZUNvbmZpZ1BhdGhzJyxcbiAgICdnaXRfZWRpdG9yJzogJ2FsbG93VW5zYWZlRWRpdG9yJyxcbiAgICdnaXRfZXhlY19wYXRoJzogJ2FsbG93VW5zYWZlRXhlYycsXG4gICAnZ2l0X2V4dGVybmFsX2RpZmYnOiAnYWxsb3dVbnNhZmVEaWZmRXh0ZXJuYWwnLFxuICAgJ2dpdF9wYWdlcic6ICdhbGxvd1Vuc2FmZVBhZ2VyJyxcbiAgICdnaXRfcHJveHlfY29tbWFuZCc6ICdhbGxvd1Vuc2FmZUdpdFByb3h5JyxcbiAgICdnaXRfdGVtcGxhdGVfZGlyJzogJ2FsbG93VW5zYWZlVGVtcGxhdGVEaXInLFxuICAgJ2dpdF9zZXF1ZW5jZV9lZGl0b3InOiAnYWxsb3dVbnNhZmVFZGl0b3InLFxuICAgJ2dpdF9zc2gnOiAnYWxsb3dVbnNhZmVTc2hDb21tYW5kJyxcbiAgICdnaXRfc3NoX2NvbW1hbmQnOiAnYWxsb3dVbnNhZmVTc2hDb21tYW5kJyxcbiAgICdwYWdlcic6ICdhbGxvd1Vuc2FmZVBhZ2VyJyxcbiAgICdwcmVmaXgnOiAnYWxsb3dVbnNhZmVDb25maWdQYXRocycsXG4gICAnc3NoX2Fza3Bhc3MnOiAnYWxsb3dVbnNhZmVBc2tQYXNzJyxcbiAgICd2aXN1YWwnOiAnYWxsb3dVbnNhZmVFZGl0b3InLFxufSBhcyBjb25zdCBzYXRpc2ZpZXMgUmVjb3JkPHN0cmluZywgVnVsbmVyYWJpbGl0eUNhdGVnb3J5PjtcblxudHlwZSBHaXRFbnYgPSBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ICYge1xuICAgZ2l0X2NvbmZpZ19jb3VudD86IHN0cmluZztcbn07XG5cbmZ1bmN0aW9uKiBjb2xsZWN0Q29uZmlnQnlDb3VudChlbnY6IEdpdEVudik6IEdlbmVyYXRvcjxDb25maWdXcml0ZT4ge1xuICAgY29uc3QgY291bnQgPSBwYXJzZUludChlbnYuZ2l0X2NvbmZpZ19jb3VudCA/PyAnMCcsIDEwKTtcbiAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjb3VudDsgaW5kZXgrKykge1xuICAgICAgY29uc3Qga2V5ID0gZW52W2BnaXRfY29uZmlnX2tleV8ke2luZGV4fWBdO1xuICAgICAgY29uc3QgdmFsdWUgPSBlbnZbYGdpdF9jb25maWdfdmFsdWVfJHtpbmRleH1gXTtcblxuICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICB5aWVsZCB7IGtleToga2V5LnRvTG93ZXJDYXNlKCkudHJpbSgpLCB2YWx1ZSwgc2NvcGU6ICdlbnYnIH07XG4gICAgICB9XG4gICB9XG59XG5cbmZ1bmN0aW9uKiBjb2xsZWN0Q29uZmlnVnVsbmVyYWJpbGl0aWVzKGVudjogR2l0RW52KTogR2VuZXJhdG9yPFZ1bG5lcmFiaWxpdHk+IHtcbiAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGVudikpIHtcbiAgICAgIGlmIChpc0dpdEVudktleShrZXkpKSB7XG4gICAgICAgICBjb25zdCBjYXRlZ29yeSA9IEdpdEVudktleXNba2V5XTtcbiAgICAgICAgIHlpZWxkIHtcbiAgICAgICAgICAgIGNhdGVnb3J5LFxuICAgICAgICAgICAgbWVzc2FnZTogYFVzZSBvZiBcIiR7a2V5LnRvVXBwZXJDYXNlKCl9XCIgaXMgbm90IHBlcm1pdHRlZCB3aXRob3V0IGVuYWJsaW5nICR7Y2F0ZWdvcnl9YCxcbiAgICAgICAgIH07XG4gICAgICB9XG4gICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0dpdEVudktleShrZXk6IHN0cmluZyk6IGtleSBpcyBrZXlvZiB0eXBlb2YgR2l0RW52S2V5cyB7XG4gICByZXR1cm4gT2JqZWN0Lmhhc093bihHaXRFbnZLZXlzLCBrZXkpO1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlRW52KGVudjogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBHaXRFbnYge1xuICAgY29uc3QgZ2l0RW52OiBHaXRFbnYgPSB7fTtcbiAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGVudikpIHtcbiAgICAgIGNvbnN0IGVudktleSA9IGtleS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgICAgIGlmIChpc0dpdEVudktleShlbnZLZXkpIHx8IGVudktleS5zdGFydHNXaXRoKCdnaXQnKSkge1xuICAgICAgICAgZ2l0RW52W2VudktleV0gPSBTdHJpbmcodmFsdWUpO1xuICAgICAgfVxuICAgfVxuICAgcmV0dXJuIGdpdEVudjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRW52KHJhdzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pIHtcbiAgIGNvbnN0IGVudiA9IHByZXBhcmVFbnYocmF3KTtcbiAgIGNvbnN0IGNvbmZpZzogUGFyc2VkQ29uZmlnQWN0aXZpdHkgPSB7XG4gICAgICByZWFkOiBbXSxcbiAgICAgIHdyaXRlOiBbLi4uY29sbGVjdENvbmZpZ0J5Q291bnQoZW52KV0sXG4gICB9O1xuICAgY29uc3QgdnVsbmVyYWJpbGl0aWVzID0gW1xuICAgICAgLi4uY29sbGVjdENvbmZpZ1Z1bG5lcmFiaWxpdGllcyhlbnYpLFxuICAgICAgLi4udnVsbmVyYWJpbGl0eUFuYWx5c2lzKG51bGwsIFtdLCBjb25maWcpLFxuICAgXTtcblxuICAgcmV0dXJuIHtcbiAgICAgIGNvbmZpZyxcbiAgICAgIHZ1bG5lcmFiaWxpdGllcyxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHsgcGFyc2VBcmd2IH0gZnJvbSAnLi4vYXJncy9wYXJzZS1hcmd2JztcbmltcG9ydCB7IHBhcnNlRW52IH0gZnJvbSAnLi4vZW52L3BhcnNlLWVudic7XG5cbi8qKlxuICogUmV0cmlldmVzIGp1c3QgdGhlIHZ1bG5lcmFiaWxpdGllcyBpZGVudGlmaWVkIGluIHRoZSBzdXBwbGllZCB2YXJhcmdzIHRva2Vuc1xuICogYW5kIGVudmlyb25tZW50IHZhcmlhYmxlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZ1bG5lcmFiaWxpdHlDaGVjayh0b2tlbnM6IHJlYWRvbmx5IHN0cmluZ1tdLCBlbnY6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSB7XG4gICByZXR1cm4gWy4uLnBhcnNlQXJndiguLi50b2tlbnMpLnZ1bG5lcmFiaWxpdGllcywgLi4ucGFyc2VFbnYoZW52KS52dWxuZXJhYmlsaXRpZXNdO1xufVxuIiwgImltcG9ydCB0eXBlIHsgU2ltcGxlR2l0VGFzayB9IGZyb20gJy4uL3R5cGVzJztcblxuLyoqXG4gKiBUaGUgYEdpdEVycm9yYCBpcyB0aHJvd24gd2hlbiB0aGUgdW5kZXJseWluZyBgZ2l0YCBwcm9jZXNzIHRocm93cyBhXG4gKiBmYXRhbCBleGNlcHRpb24gKGVnIGFuIGBFTk9FTlRgIGV4Y2VwdGlvbiB3aGVuIGF0dGVtcHRpbmcgdG8gdXNlIGFcbiAqIG5vbi13cml0YWJsZSBkaXJlY3RvcnkgYXMgdGhlIHJvb3QgZm9yIHlvdXIgcmVwbyksIGFuZCBhY3RzIGFzIHRoZVxuICogYmFzZSBjbGFzcyBmb3IgbW9yZSBzcGVjaWZpYyBlcnJvcnMgdGhyb3duIGJ5IHRoZSBwYXJzaW5nIG9mIHRoZVxuICogZ2l0IHJlc3BvbnNlIG9yIGVycm9ycyBpbiB0aGUgY29uZmlndXJhdGlvbiBvZiB0aGUgdGFzayBhYm91dCB0b1xuICogYmUgcnVuLlxuICpcbiAqIFdoZW4gYW4gZXhjZXB0aW9uIGlzIHRocm93biwgcGVuZGluZyB0YXNrcyBpbiB0aGUgc2FtZSBpbnN0YW5jZSB3aWxsXG4gKiBub3QgYmUgZXhlY3V0ZWQuIFRoZSByZWNvbW1lbmRlZCB3YXkgdG8gcnVuIGEgc2VyaWVzIG9mIHRhc2tzIHRoYXRcbiAqIGNhbiBpbmRlcGVuZGVudGx5IGZhaWwgd2l0aG91dCBuZWVkaW5nIHRvIHByZXZlbnQgZnV0dXJlIHRhc2tzIGZyb21cbiAqIHJ1bm5pbmcgaXMgdG8gY2F0Y2ggdGhlbSBpbmRpdmlkdWFsbHk6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuIGltcG9ydCB7IHNpbXBsZUdpdCwgU2ltcGxlR2l0LCBHaXRFcnJvciwgUHVsbFJlc3VsdCB9IGZyb20gJ3NpbXBsZS1naXQnO1xuXG4gZnVuY3Rpb24gY2F0Y2hUYXNrIChlOiBHaXRFcnJvcikge1xuICAgcmV0dXJuIGUuXG4gfVxuXG4gY29uc3QgZ2l0ID0gc2ltcGxlR2l0KHJlcG9Xb3JraW5nRGlyKTtcbiBjb25zdCBwdWxsZWQ6IFB1bGxSZXN1bHQgfCBHaXRFcnJvciA9IGF3YWl0IGdpdC5wdWxsKCkuY2F0Y2goY2F0Y2hUYXNrKTtcbiBjb25zdCBwdXNoZWQ6IHN0cmluZyB8IEdpdEVycm9yID0gYXdhaXQgZ2l0LnB1c2hUYWdzKCkuY2F0Y2goY2F0Y2hUYXNrKTtcbiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIEdpdEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgdGFzaz86IFNpbXBsZUdpdFRhc2s8YW55PixcbiAgICAgIG1lc3NhZ2U/OiBzdHJpbmdcbiAgICkge1xuICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgbmV3LnRhcmdldC5wcm90b3R5cGUpO1xuICAgfVxufVxuIiwgImltcG9ydCB0eXBlIHsgU2ltcGxlR2l0T3B0aW9ucyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IEdpdEVycm9yIH0gZnJvbSAnLi9naXQtZXJyb3InO1xuXG4vKipcbiAqIFRoZSBgR2l0Q29uc3RydWN0RXJyb3JgIGlzIHRocm93biB3aGVuIGFuIGVycm9yIG9jY3VycyBpbiB0aGUgY29uc3RydWN0b3JcbiAqIG9mIHRoZSBgc2ltcGxlLWdpdGAgaW5zdGFuY2UgaXRzZWxmLiBNb3N0IGNvbW1vbmx5IGFzIGEgcmVzdWx0IG9mIHVzaW5nXG4gKiBhIGBiYXNlRGlyYCBvcHRpb24gdGhhdCBwb2ludHMgdG8gYSBmb2xkZXIgdGhhdCBlaXRoZXIgZG9lcyBub3QgZXhpc3QsXG4gKiBvciBjYW5ub3QgYmUgcmVhZCBieSB0aGUgdXNlciB0aGUgbm9kZSBzY3JpcHQgaXMgcnVubmluZyBhcy5cbiAqXG4gKiBDaGVjayB0aGUgYC5tZXNzYWdlYCBwcm9wZXJ0eSBmb3IgbW9yZSBkZXRhaWwgaW5jbHVkaW5nIHRoZSBwcm9wZXJ0aWVzXG4gKiBwYXNzZWQgdG8gdGhlIGNvbnN0cnVjdG9yLlxuICovXG5leHBvcnQgY2xhc3MgR2l0Q29uc3RydWN0RXJyb3IgZXh0ZW5kcyBHaXRFcnJvciB7XG4gICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyByZWFkb25seSBjb25maWc6IFNpbXBsZUdpdE9wdGlvbnMsXG4gICAgICBtZXNzYWdlOiBzdHJpbmdcbiAgICkge1xuICAgICAgc3VwZXIodW5kZWZpbmVkLCBtZXNzYWdlKTtcbiAgIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IFNpbXBsZUdpdE9wdGlvbnMsIFNpbXBsZUdpdFRhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBHaXRFcnJvciB9IGZyb20gJy4vZ2l0LWVycm9yJztcblxuZXhwb3J0IGNsYXNzIEdpdFBsdWdpbkVycm9yIGV4dGVuZHMgR2l0RXJyb3Ige1xuICAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgdGFzaz86IFNpbXBsZUdpdFRhc2s8YW55PixcbiAgICAgIHB1YmxpYyByZWFkb25seSBwbHVnaW4/OiBrZXlvZiBTaW1wbGVHaXRPcHRpb25zLFxuICAgICAgbWVzc2FnZT86IHN0cmluZ1xuICAgKSB7XG4gICAgICBzdXBlcih0YXNrLCBtZXNzYWdlKTtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBuZXcudGFyZ2V0LnByb3RvdHlwZSk7XG4gICB9XG59XG4iLCAiaW1wb3J0IHsgR2l0RXJyb3IgfSBmcm9tICcuL2dpdC1lcnJvcic7XG5cbi8qKlxuICogVGhlIGBHaXRSZXNwb25zZUVycm9yYCBpcyB0aGUgd3JhcHBlciBmb3IgYSBwYXJzZWQgcmVzcG9uc2UgdGhhdCBpcyB0cmVhdGVkIGFzXG4gKiBhIGZhdGFsIGVycm9yLCBmb3IgZXhhbXBsZSBhdHRlbXB0aW5nIGEgYG1lcmdlYCBjYW4gbGVhdmUgdGhlIHJlcG8gaW4gYSBjb3JydXB0ZWRcbiAqIHN0YXRlIHdoZW4gdGhlcmUgYXJlIGNvbmZsaWN0cyBzbyB0aGUgdGFzayB3aWxsIHJlamVjdCByYXRoZXIgdGhhbiByZXNvbHZlLlxuICpcbiAqIEZvciBleGFtcGxlLCBjYXRjaGluZyB0aGUgbWVyZ2UgY29uZmxpY3QgZXhjZXB0aW9uOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiBpbXBvcnQgeyBzaW1wbGVHaXQsIFNpbXBsZUdpdCwgR2l0UmVzcG9uc2VFcnJvciwgTWVyZ2VTdW1tYXJ5IH0gZnJvbSAnc2ltcGxlLWdpdCc7XG5cbiBjb25zdCBnaXQgPSBzaW1wbGVHaXQocmVwb1Jvb3QpO1xuIGNvbnN0IG1lcmdlT3B0aW9uczogc3RyaW5nW10gPSBbJy0tbm8tZmYnLCAnb3RoZXItYnJhbmNoJ107XG4gY29uc3QgbWVyZ2VTdW1tYXJ5OiBNZXJnZVN1bW1hcnkgPSBhd2FpdCBnaXQubWVyZ2UobWVyZ2VPcHRpb25zKVxuICAgICAgLmNhdGNoKChlOiBHaXRSZXNwb25zZUVycm9yPE1lcmdlU3VtbWFyeT4pID0+IGUuZ2l0KTtcblxuIGlmIChtZXJnZVN1bW1hcnkuZmFpbGVkKSB7XG4gICAvLyBkZWFsIHdpdGggdGhlIGVycm9yXG4gfVxuIGBgYFxuICovXG5leHBvcnQgY2xhc3MgR2l0UmVzcG9uc2VFcnJvcjxUID0gYW55PiBleHRlbmRzIEdpdEVycm9yIHtcbiAgIGNvbnN0cnVjdG9yKFxuICAgICAgLyoqXG4gICAgICAgKiBgLmdpdGAgYWNjZXNzIHRoZSBwYXJzZWQgcmVzcG9uc2UgdGhhdCBpcyB0cmVhdGVkIGFzIGJlaW5nIGFuIGVycm9yXG4gICAgICAgKi9cbiAgICAgIHB1YmxpYyByZWFkb25seSBnaXQ6IFQsXG4gICAgICBtZXNzYWdlPzogc3RyaW5nXG4gICApIHtcbiAgICAgIHN1cGVyKHVuZGVmaW5lZCwgbWVzc2FnZSB8fCBTdHJpbmcoZ2l0KSk7XG4gICB9XG59XG4iLCAiaW1wb3J0IHsgR2l0RXJyb3IgfSBmcm9tICcuL2dpdC1lcnJvcic7XG5cbi8qKlxuICogVGhlIGBUYXNrQ29uZmlndXJhdGlvbkVycm9yYCBpcyB0aHJvd24gd2hlbiBhIGNvbW1hbmQgd2FzIGluY29ycmVjdGx5XG4gKiBjb25maWd1cmVkLiBBbiBlcnJvciBvZiB0aGlzIGtpbmQgbWVhbnMgdGhhdCBubyBhdHRlbXB0IHdhcyBtYWRlIHRvXG4gKiBydW4geW91ciBjb21tYW5kIHRocm91Z2ggdGhlIHVuZGVybHlpbmcgYGdpdGAgYmluYXJ5LlxuICpcbiAqIENoZWNrIHRoZSBgLm1lc3NhZ2VgIHByb3BlcnR5IGZvciBtb3JlIGRldGFpbCBvbiB3aHkgeW91ciBjb25maWd1cmF0aW9uXG4gKiByZXN1bHRlZCBpbiBhbiBlcnJvci5cbiAqL1xuZXhwb3J0IGNsYXNzIFRhc2tDb25maWd1cmF0aW9uRXJyb3IgZXh0ZW5kcyBHaXRFcnJvciB7XG4gICBjb25zdHJ1Y3RvcihtZXNzYWdlPzogc3RyaW5nKSB7XG4gICAgICBzdXBlcih1bmRlZmluZWQsIG1lc3NhZ2UpO1xuICAgfVxufVxuIiwgImltcG9ydCB7IGV4aXN0cywgRk9MREVSIH0gZnJvbSAnQGt3c2l0ZXMvZmlsZS1leGlzdHMnO1xuXG5pbXBvcnQgdHlwZSB7IE1heWJlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgZmlsdGVySGFzTGVuZ3RoIH0gZnJvbSAnLi9hcmd1bWVudC1maWx0ZXJzJztcblxudHlwZSBDYWxsYWJsZSA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHVua25vd247XG5cbmV4cG9ydCBjb25zdCBOVUxMID0gJ1xcMCc7XG5cbmV4cG9ydCBjb25zdCBOT09QOiBDYWxsYWJsZSA9ICgpID0+IHt9O1xuXG4vKipcbiAqIFJldHVybnMgZWl0aGVyIHRoZSBzb3VyY2UgYXJndW1lbnQgd2hlbiBpdCBpcyBhIGBGdW5jdGlvbmAsIG9yIHRoZSBkZWZhdWx0XG4gKiBgTk9PUGAgZnVuY3Rpb24gY29uc3RhbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzRnVuY3Rpb248VD4oc291cmNlOiBUIHwgdW5rbm93bik6IENhbGxhYmxlIHtcbiAgIGlmICh0eXBlb2Ygc291cmNlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gTk9PUDtcbiAgIH1cbiAgIHJldHVybiBzb3VyY2UgYXMgQ2FsbGFibGU7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzdXBwbGllZCBhcmd1bWVudCBpcyBib3RoIGEgZnVuY3Rpb24sIGFuZCBpcyBub3RcbiAqIHRoZSBgTk9PUGAgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1VzZXJGdW5jdGlvbjxUIGV4dGVuZHMgRnVuY3Rpb24+KHNvdXJjZTogVCB8IHVua25vd24pOiBzb3VyY2UgaXMgVCB7XG4gICByZXR1cm4gdHlwZW9mIHNvdXJjZSA9PT0gJ2Z1bmN0aW9uJyAmJiBzb3VyY2UgIT09IE5PT1A7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGxpdE9uKGlucHV0OiBzdHJpbmcsIGNoYXI6IHN0cmluZyk6IFtzdHJpbmcsIHN0cmluZ10ge1xuICAgY29uc3QgaW5kZXggPSBpbnB1dC5pbmRleE9mKGNoYXIpO1xuICAgaWYgKGluZGV4IDw9IDApIHtcbiAgICAgIHJldHVybiBbaW5wdXQsICcnXTtcbiAgIH1cblxuICAgcmV0dXJuIFtpbnB1dC5zdWJzdHIoMCwgaW5kZXgpLCBpbnB1dC5zdWJzdHIoaW5kZXggKyAxKV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaXJzdDxUIGV4dGVuZHMgdW5rbm93bltdPihpbnB1dDogVCwgb2Zmc2V0PzogbnVtYmVyKTogTWF5YmU8VFtudW1iZXJdPjtcbmV4cG9ydCBmdW5jdGlvbiBmaXJzdDxUIGV4dGVuZHMgSUFyZ3VtZW50cz4oaW5wdXQ6IFQsIG9mZnNldD86IG51bWJlcik6IE1heWJlPHVua25vd24+O1xuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0KGlucHV0OiB1bmtub3duW10gfCBJQXJndW1lbnRzLCBvZmZzZXQgPSAwKTogTWF5YmU8dW5rbm93bj4ge1xuICAgcmV0dXJuIGlzQXJyYXlMaWtlKGlucHV0KSAmJiBpbnB1dC5sZW5ndGggPiBvZmZzZXQgPyBpbnB1dFtvZmZzZXRdIDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGFzdDxUIGV4dGVuZHMgdW5rbm93bltdPihpbnB1dDogVCwgb2Zmc2V0PzogbnVtYmVyKTogTWF5YmU8VFtudW1iZXJdPjtcbmV4cG9ydCBmdW5jdGlvbiBsYXN0PFQgZXh0ZW5kcyBJQXJndW1lbnRzPihpbnB1dDogVCwgb2Zmc2V0PzogbnVtYmVyKTogTWF5YmU8dW5rbm93bj47XG5leHBvcnQgZnVuY3Rpb24gbGFzdDxUPihpbnB1dDogVCwgb2Zmc2V0PzogbnVtYmVyKTogTWF5YmU8dW5rbm93bj47XG5leHBvcnQgZnVuY3Rpb24gbGFzdChpbnB1dDogdW5rbm93biwgb2Zmc2V0ID0gMCkge1xuICAgaWYgKGlzQXJyYXlMaWtlKGlucHV0KSAmJiBpbnB1dC5sZW5ndGggPiBvZmZzZXQpIHtcbiAgICAgIHJldHVybiBpbnB1dFtpbnB1dC5sZW5ndGggLSAxIC0gb2Zmc2V0XTtcbiAgIH1cbn1cblxudHlwZSBBcnJheUxpa2U8VD4gPSBUW10gfCBJQXJndW1lbnRzIHwgeyBbaW5kZXg6IG51bWJlcl06IFQ7IGxlbmd0aDogbnVtYmVyIH07XG5cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKGlucHV0OiB1bmtub3duKTogaW5wdXQgaXMgQXJyYXlMaWtlPHVua25vd24+IHtcbiAgIHJldHVybiBmaWx0ZXJIYXNMZW5ndGgoaW5wdXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9MaW5lc1dpdGhDb250ZW50KGlucHV0ID0gJycsIHRyaW1tZWQgPSB0cnVlLCBzZXBhcmF0b3IgPSAnXFxuJyk6IHN0cmluZ1tdIHtcbiAgIHJldHVybiBpbnB1dC5zcGxpdChzZXBhcmF0b3IpLnJlZHVjZSgob3V0cHV0LCBsaW5lKSA9PiB7XG4gICAgICBjb25zdCBsaW5lQ29udGVudCA9IHRyaW1tZWQgPyBsaW5lLnRyaW0oKSA6IGxpbmU7XG4gICAgICBpZiAobGluZUNvbnRlbnQpIHtcbiAgICAgICAgIG91dHB1dC5wdXNoKGxpbmVDb250ZW50KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXRwdXQ7XG4gICB9LCBbXSBhcyBzdHJpbmdbXSk7XG59XG5cbnR5cGUgTGluZVdpdGhDb250ZW50Q2FsbGJhY2s8VCA9IHZvaWQ+ID0gKGxpbmU6IHN0cmluZykgPT4gVDtcblxuZXhwb3J0IGZ1bmN0aW9uIGZvckVhY2hMaW5lV2l0aENvbnRlbnQ8VD4oXG4gICBpbnB1dDogc3RyaW5nLFxuICAgY2FsbGJhY2s6IExpbmVXaXRoQ29udGVudENhbGxiYWNrPFQ+XG4pOiBUW10ge1xuICAgcmV0dXJuIHRvTGluZXNXaXRoQ29udGVudChpbnB1dCwgdHJ1ZSkubWFwKChsaW5lKSA9PiBjYWxsYmFjayhsaW5lKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb2xkZXJFeGlzdHMocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICByZXR1cm4gZXhpc3RzKHBhdGgsIEZPTERFUik7XG59XG5cbi8qKlxuICogQWRkcyBgaXRlbWAgaW50byB0aGUgYHRhcmdldGAgYEFycmF5YCBvciBgU2V0YCB3aGVuIGl0IGlzIG5vdCBhbHJlYWR5IHByZXNlbnQgYW5kIHJldHVybnMgdGhlIGBpdGVtYC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZDxUPih0YXJnZXQ6IFRbXSB8IFNldDxUPiwgaXRlbTogVCk6IHR5cGVvZiBpdGVtIHtcbiAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkpIHtcbiAgICAgIGlmICghdGFyZ2V0LmluY2x1ZGVzKGl0ZW0pKSB7XG4gICAgICAgICB0YXJnZXQucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQuYWRkKGl0ZW0pO1xuICAgfVxuICAgcmV0dXJuIGl0ZW07XG59XG5cbi8qKlxuICogQWRkcyBgaXRlbWAgaW50byB0aGUgYHRhcmdldGAgYEFycmF5YCB3aGVuIGl0IGlzIG5vdCBhbHJlYWR5IHByZXNlbnQgYW5kIHJldHVybnMgdGhlIGB0YXJnZXRgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5jbHVkaW5nPFQ+KHRhcmdldDogVFtdLCBpdGVtOiBUKTogdHlwZW9mIHRhcmdldCB7XG4gICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmICF0YXJnZXQuaW5jbHVkZXMoaXRlbSkpIHtcbiAgICAgIHRhcmdldC5wdXNoKGl0ZW0pO1xuICAgfVxuXG4gICByZXR1cm4gdGFyZ2V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlPFQ+KHRhcmdldDogU2V0PFQ+IHwgVFtdLCBpdGVtOiBUKTogVCB7XG4gICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRhcmdldC5pbmRleE9mKGl0ZW0pO1xuICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgIHRhcmdldC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC5kZWxldGUoaXRlbSk7XG4gICB9XG4gICByZXR1cm4gaXRlbTtcbn1cblxuZXhwb3J0IGNvbnN0IG9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsLmJpbmQoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZykgYXMgKFxuICAgaW5wdXQ6IHVua25vd25cbikgPT4gc3RyaW5nO1xuXG5leHBvcnQgZnVuY3Rpb24gYXNBcnJheTxUPihzb3VyY2U6IFQgfCBUW10pOiBUW10ge1xuICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoc291cmNlKSA/IHNvdXJjZSA6IFtzb3VyY2VdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNDYW1lbENhc2Uoc3RyOiBzdHJpbmcpIHtcbiAgIHJldHVybiBzdHIucmVwbGFjZSgvW1xccy1dKyguKS9nLCAoX2FsbCwgY2hyKSA9PiB7XG4gICAgICByZXR1cm4gY2hyLnRvVXBwZXJDYXNlKCk7XG4gICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzU3RyaW5nQXJyYXk8VD4oc291cmNlOiBUIHwgVFtdKTogc3RyaW5nW10ge1xuICAgcmV0dXJuIGFzQXJyYXkoc291cmNlKS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIHJldHVybiBpdGVtIGluc3RhbmNlb2YgU3RyaW5nID8gKGl0ZW0gYXMgc3RyaW5nKSA6IFN0cmluZyhpdGVtKTtcbiAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNOdW1iZXIoc291cmNlOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkLCBvbk5hTiA9IDApIHtcbiAgIGlmIChzb3VyY2UgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG9uTmFOO1xuICAgfVxuXG4gICBjb25zdCBudW0gPSBwYXJzZUludChzb3VyY2UsIDEwKTtcbiAgIHJldHVybiBOdW1iZXIuaXNOYU4obnVtKSA/IG9uTmFOIDogbnVtO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJlZml4ZWRBcnJheTxUPihpbnB1dDogVFtdLCBwcmVmaXg6IFQpOiBUW10ge1xuICAgY29uc3Qgb3V0cHV0OiBUW10gPSBbXTtcbiAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBpbnB1dC5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xuICAgICAgb3V0cHV0LnB1c2gocHJlZml4LCBpbnB1dFtpXSk7XG4gICB9XG4gICByZXR1cm4gb3V0cHV0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVmZmVyVG9TdHJpbmcoaW5wdXQ6IEJ1ZmZlciB8IEJ1ZmZlcltdKTogc3RyaW5nIHtcbiAgIHJldHVybiAoQXJyYXkuaXNBcnJheShpbnB1dCkgPyBCdWZmZXIuY29uY2F0KGlucHV0KSA6IGlucHV0KS50b1N0cmluZygndXRmLTgnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ5dGVMZW5ndGgoaW5wdXQ/OiBzdHJpbmcgfCBCdWZmZXIpIHtcbiAgIGlmICghaW5wdXQpIHtcbiAgICAgIHJldHVybiAwO1xuICAgfVxuXG4gICByZXR1cm4gQnVmZmVyLmlzQnVmZmVyKGlucHV0KSA/IGlucHV0Lmxlbmd0aCA6IEJ1ZmZlci5ieXRlTGVuZ3RoKGlucHV0KTtcbn1cblxuLyoqXG4gKiBHZXQgYSBuZXcgb2JqZWN0IGZyb20gYSBzb3VyY2Ugb2JqZWN0IHdpdGggb25seSB0aGUgbGlzdGVkIHByb3BlcnRpZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwaWNrPFQsIEsgZXh0ZW5kcyBrZXlvZiBUPihzb3VyY2U6IFQsIHByb3BlcnRpZXM6IHJlYWRvbmx5IEtbXSkge1xuICAgY29uc3Qgb3V0OiBQYXJ0aWFsPFBpY2s8VCwgSz4+ID0ge307XG5cbiAgIHByb3BlcnRpZXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoc291cmNlW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgb3V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgIH0pO1xuXG4gICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsYXkoZHVyYXRpb24gPSAwKTogUHJvbWlzZTx2b2lkPiB7XG4gICByZXR1cm4gbmV3IFByb21pc2UoKGRvbmUpID0+IHNldFRpbWVvdXQoZG9uZSwgZHVyYXRpb24pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9yVm9pZDxUPihpbnB1dDogVCB8IGZhbHNlKSB7XG4gICBpZiAoaW5wdXQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgfVxuICAgcmV0dXJuIGlucHV0O1xufVxuIiwgImltcG9ydCB7IGlzUGF0aFNwZWMgfSBmcm9tICdAc2ltcGxlLWdpdC9hcmdzLXBhdGhzcGVjJztcblxuaW1wb3J0IHR5cGUgeyBNYXliZSwgT3B0aW9ucywgUHJpbWl0aXZlcyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IG9iamVjdFRvU3RyaW5nIH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IHR5cGUgQXJndW1lbnRGaWx0ZXJQcmVkaWNhdGU8VD4gPSAoaW5wdXQ6IFQgfCB1bmtub3duKSA9PiBpbnB1dCBpcyBUO1xuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyVHlwZTxULCBLPihcbiAgIGlucHV0OiBLLFxuICAgZmlsdGVyOiBBcmd1bWVudEZpbHRlclByZWRpY2F0ZTxUPlxuKTogSyBleHRlbmRzIFQgPyBUIDogdW5kZWZpbmVkO1xuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlclR5cGU8VCwgSz4oaW5wdXQ6IEssIGZpbHRlcjogQXJndW1lbnRGaWx0ZXJQcmVkaWNhdGU8VD4sIGRlZjogVCk6IFQ7XG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyVHlwZTxULCBLPihpbnB1dDogSywgZmlsdGVyOiBBcmd1bWVudEZpbHRlclByZWRpY2F0ZTxUPiwgZGVmPzogVCk6IE1heWJlPFQ+IHtcbiAgIGlmIChmaWx0ZXIoaW5wdXQpKSB7XG4gICAgICByZXR1cm4gaW5wdXQ7XG4gICB9XG4gICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBkZWYgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBjb25zdCBmaWx0ZXJBcnJheTogQXJndW1lbnRGaWx0ZXJQcmVkaWNhdGU8QXJyYXk8dW5rbm93bj4+ID0gKFxuICAgaW5wdXRcbik6IGlucHV0IGlzIEFycmF5PHVua25vd24+ID0+IHtcbiAgIHJldHVybiBBcnJheS5pc0FycmF5KGlucHV0KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJQcmltaXRpdmVzKFxuICAgaW5wdXQ6IHVua25vd24sXG4gICBvbWl0PzogQXJyYXk8J2Jvb2xlYW4nIHwgJ3N0cmluZycgfCAnbnVtYmVyJz5cbik6IGlucHV0IGlzIFByaW1pdGl2ZXMge1xuICAgY29uc3QgdHlwZSA9IGlzUGF0aFNwZWMoaW5wdXQpID8gJ3N0cmluZycgOiB0eXBlb2YgaW5wdXQ7XG5cbiAgIHJldHVybiAoXG4gICAgICAvbnVtYmVyfHN0cmluZ3xib29sZWFuLy50ZXN0KHR5cGUpICYmXG4gICAgICAoIW9taXQgfHwgIW9taXQuaW5jbHVkZXModHlwZSBhcyAnYm9vbGVhbicgfCAnc3RyaW5nJyB8ICdudW1iZXInKSlcbiAgICk7XG59XG5cbmV4cG9ydCBjb25zdCBmaWx0ZXJOdW1iZXI6IEFyZ3VtZW50RmlsdGVyUHJlZGljYXRlPG51bWJlcj4gPSAoaW5wdXQ6IHVua25vd24pOiBpbnB1dCBpcyBudW1iZXIgPT4ge1xuICAgcmV0dXJuIHR5cGVvZiBpbnB1dCA9PT0gJ251bWJlcic7XG59O1xuXG5leHBvcnQgY29uc3QgZmlsdGVyU3RyaW5nOiBBcmd1bWVudEZpbHRlclByZWRpY2F0ZTxzdHJpbmc+ID0gKGlucHV0OiB1bmtub3duKTogaW5wdXQgaXMgc3RyaW5nID0+IHtcbiAgIHJldHVybiB0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnIHx8IGlzUGF0aFNwZWMoaW5wdXQpO1xufTtcblxuZXhwb3J0IGNvbnN0IGZpbHRlclN0cmluZ09yQnVmZmVyOiBBcmd1bWVudEZpbHRlclByZWRpY2F0ZTxzdHJpbmcgfCBCdWZmZXI+ID0gKFxuICAgaW5wdXQ6IHVua25vd25cbik6IGlucHV0IGlzIHN0cmluZyB8IEJ1ZmZlciA9PiB7XG4gICByZXR1cm4gZmlsdGVyU3RyaW5nKGlucHV0KSB8fCBCdWZmZXIuaXNCdWZmZXIoaW5wdXQpO1xufTtcblxuZXhwb3J0IGNvbnN0IGZpbHRlclN0cmluZ09yU3RyaW5nQXJyYXk6IEFyZ3VtZW50RmlsdGVyUHJlZGljYXRlPHN0cmluZyB8IHN0cmluZ1tdPiA9IChcbiAgIGlucHV0XG4pOiBpbnB1dCBpcyBzdHJpbmcgfCBzdHJpbmdbXSA9PiB7XG4gICByZXR1cm4gZmlsdGVyU3RyaW5nKGlucHV0KSB8fCAoQXJyYXkuaXNBcnJheShpbnB1dCkgJiYgaW5wdXQuZXZlcnkoZmlsdGVyU3RyaW5nKSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyUGxhaW5PYmplY3Q8VCBleHRlbmRzIE9wdGlvbnM+KGlucHV0OiBUIHwgdW5rbm93bik6IGlucHV0IGlzIFQ7XG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyUGxhaW5PYmplY3Q8VCBleHRlbmRzIFJlY29yZDxzdHJpbmcsIHVua25vd24+PihcbiAgIGlucHV0OiBUIHwgdW5rbm93blxuKTogaW5wdXQgaXMgVCB7XG4gICByZXR1cm4gISFpbnB1dCAmJiBvYmplY3RUb1N0cmluZyhpbnB1dCkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyRnVuY3Rpb24oaW5wdXQ6IHVua25vd24pOiBpbnB1dCBpcyAoLi4uYXJnczogdW5rbm93bltdKSA9PiB1bmtub3duIHtcbiAgIHJldHVybiB0eXBlb2YgaW5wdXQgPT09ICdmdW5jdGlvbic7XG59XG5cbmV4cG9ydCBjb25zdCBmaWx0ZXJIYXNMZW5ndGg6IEFyZ3VtZW50RmlsdGVyUHJlZGljYXRlPHsgbGVuZ3RoOiBudW1iZXIgfT4gPSAoXG4gICBpbnB1dFxuKTogaW5wdXQgaXMgeyBsZW5ndGg6IG51bWJlciB9ID0+IHtcbiAgIGlmIChpbnB1dCA9PSBudWxsIHx8ICdudW1iZXJ8Ym9vbGVhbnxmdW5jdGlvbicuaW5jbHVkZXModHlwZW9mIGlucHV0KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgfVxuXG4gICByZXR1cm4gdHlwZW9mIChpbnB1dCBhcyB7IGxlbmd0aD86IG51bWJlciB9KS5sZW5ndGggPT09ICdudW1iZXInO1xufTtcbiIsICIvKipcbiAqIEtub3duIHByb2Nlc3MgZXhpdCBjb2RlcyB1c2VkIGJ5IHRoZSB0YXNrIHBhcnNlcnMgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgYW4gZXJyb3JcbiAqIHdhcyBvbmUgdGhleSBjYW4gYXV0b21hdGljYWxseSBoYW5kbGVcbiAqL1xuZXhwb3J0IGVudW0gRXhpdENvZGVzIHtcbiAgIFNVQ0NFU1MsXG4gICBFUlJPUixcbiAgIE5PVF9GT1VORCA9IC0yLFxuICAgVU5DTEVBTiA9IDEyOCxcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFRhc2tSZXNwb25zZUZvcm1hdCB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGNsYXNzIEdpdE91dHB1dFN0cmVhbXM8VCBleHRlbmRzIFRhc2tSZXNwb25zZUZvcm1hdCA9IEJ1ZmZlcj4ge1xuICAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgc3RkT3V0OiBULFxuICAgICAgcHVibGljIHJlYWRvbmx5IHN0ZEVycjogVFxuICAgKSB7fVxuXG4gICBhc1N0cmluZ3MoKTogR2l0T3V0cHV0U3RyZWFtczxzdHJpbmc+IHtcbiAgICAgIHJldHVybiBuZXcgR2l0T3V0cHV0U3RyZWFtcyh0aGlzLnN0ZE91dC50b1N0cmluZygndXRmOCcpLCB0aGlzLnN0ZEVyci50b1N0cmluZygndXRmOCcpKTtcbiAgIH1cbn1cbiIsICJmdW5jdGlvbiB1c2VNYXRjaGVzRGVmYXVsdCgpIHtcbiAgIHRocm93IG5ldyBFcnJvcihgTGluZVBhcnNlcjp1c2VNYXRjaGVzIG5vdCBpbXBsZW1lbnRlZGApO1xufVxuXG5leHBvcnQgY2xhc3MgTGluZVBhcnNlcjxUPiB7XG4gICBwcm90ZWN0ZWQgbWF0Y2hlczogc3RyaW5nW10gPSBbXTtcbiAgIHByb3RlY3RlZCB1c2VNYXRjaGVzOiAodGFyZ2V0OiBULCBtYXRjaDogc3RyaW5nW10pID0+IGJvb2xlYW4gfCB2b2lkID0gdXNlTWF0Y2hlc0RlZmF1bHQ7XG5cbiAgIHByaXZhdGUgX3JlZ0V4cDogUmVnRXhwW107XG5cbiAgIGNvbnN0cnVjdG9yKFxuICAgICAgcmVnRXhwOiBSZWdFeHAgfCBSZWdFeHBbXSxcbiAgICAgIHVzZU1hdGNoZXM/OiAodGFyZ2V0OiBULCBtYXRjaDogc3RyaW5nW10pID0+IGJvb2xlYW4gfCB2b2lkXG4gICApIHtcbiAgICAgIHRoaXMuX3JlZ0V4cCA9IEFycmF5LmlzQXJyYXkocmVnRXhwKSA/IHJlZ0V4cCA6IFtyZWdFeHBdO1xuICAgICAgaWYgKHVzZU1hdGNoZXMpIHtcbiAgICAgICAgIHRoaXMudXNlTWF0Y2hlcyA9IHVzZU1hdGNoZXM7XG4gICAgICB9XG4gICB9XG5cbiAgIHBhcnNlID0gKGxpbmU6IChvZmZzZXQ6IG51bWJlcikgPT4gc3RyaW5nIHwgdW5kZWZpbmVkLCB0YXJnZXQ6IFQpOiBib29sZWFuID0+IHtcbiAgICAgIHRoaXMucmVzZXRNYXRjaGVzKCk7XG5cbiAgICAgIGlmICghdGhpcy5fcmVnRXhwLmV2ZXJ5KChyZWcsIGluZGV4KSA9PiB0aGlzLmFkZE1hdGNoKHJlZywgaW5kZXgsIGxpbmUoaW5kZXgpKSkpIHtcbiAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMudXNlTWF0Y2hlcyh0YXJnZXQsIHRoaXMucHJlcGFyZU1hdGNoZXMoKSkgIT09IGZhbHNlO1xuICAgfTtcblxuICAgcHJvdGVjdGVkIHJlc2V0TWF0Y2hlcygpIHtcbiAgICAgIHRoaXMubWF0Y2hlcy5sZW5ndGggPSAwO1xuICAgfVxuXG4gICBwcm90ZWN0ZWQgcHJlcGFyZU1hdGNoZXMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXRjaGVzO1xuICAgfVxuXG4gICBwcm90ZWN0ZWQgYWRkTWF0Y2gocmVnOiBSZWdFeHAsIGluZGV4OiBudW1iZXIsIGxpbmU/OiBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IG1hdGNoZWQgPSBsaW5lICYmIHJlZy5leGVjKGxpbmUpO1xuICAgICAgaWYgKG1hdGNoZWQpIHtcbiAgICAgICAgIHRoaXMucHVzaE1hdGNoKGluZGV4LCBtYXRjaGVkKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICEhbWF0Y2hlZDtcbiAgIH1cblxuICAgcHJvdGVjdGVkIHB1c2hNYXRjaChfaW5kZXg6IG51bWJlciwgbWF0Y2hlZDogc3RyaW5nW10pIHtcbiAgICAgIHRoaXMubWF0Y2hlcy5wdXNoKC4uLm1hdGNoZWQuc2xpY2UoMSkpO1xuICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVtb3RlTGluZVBhcnNlcjxUPiBleHRlbmRzIExpbmVQYXJzZXI8VD4ge1xuICAgcHJvdGVjdGVkIGFkZE1hdGNoKHJlZzogUmVnRXhwLCBpbmRleDogbnVtYmVyLCBsaW5lPzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gL15yZW1vdGU6XFxzLy50ZXN0KFN0cmluZyhsaW5lKSkgJiYgc3VwZXIuYWRkTWF0Y2gocmVnLCBpbmRleCwgbGluZSk7XG4gICB9XG5cbiAgIHByb3RlY3RlZCBwdXNoTWF0Y2goaW5kZXg6IG51bWJlciwgbWF0Y2hlZDogc3RyaW5nW10pIHtcbiAgICAgIGlmIChpbmRleCA+IDAgfHwgbWF0Y2hlZC5sZW5ndGggPiAxKSB7XG4gICAgICAgICBzdXBlci5wdXNoTWF0Y2goaW5kZXgsIG1hdGNoZWQpO1xuICAgICAgfVxuICAgfVxufVxuIiwgImltcG9ydCB0eXBlIHsgU2ltcGxlR2l0T3B0aW9ucyB9IGZyb20gJy4uL3R5cGVzJztcblxuY29uc3QgZGVmYXVsdE9wdGlvbnM6IE9taXQ8U2ltcGxlR2l0T3B0aW9ucywgJ2Jhc2VEaXInPiA9IHtcbiAgIGJpbmFyeTogJ2dpdCcsXG4gICBtYXhDb25jdXJyZW50UHJvY2Vzc2VzOiA1LFxuICAgY29uZmlnOiBbXSxcbiAgIHRyaW1tZWQ6IGZhbHNlLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlQ29uZmlnKFxuICAgLi4ub3B0aW9uczogQXJyYXk8UGFydGlhbDxTaW1wbGVHaXRPcHRpb25zPiB8IHVuZGVmaW5lZD5cbik6IFNpbXBsZUdpdE9wdGlvbnMge1xuICAgY29uc3QgYmFzZURpciA9IHByb2Nlc3MuY3dkKCk7XG4gICBjb25zdCBjb25maWc6IFNpbXBsZUdpdE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKFxuICAgICAgeyBiYXNlRGlyLCAuLi5kZWZhdWx0T3B0aW9ucyB9LFxuICAgICAgLi4ub3B0aW9ucy5maWx0ZXIoKG8pID0+IHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiBvKVxuICAgKTtcblxuICAgY29uZmlnLmJhc2VEaXIgPSBjb25maWcuYmFzZURpciB8fCBiYXNlRGlyO1xuICAgY29uZmlnLnRyaW1tZWQgPSBjb25maWcudHJpbW1lZCA9PT0gdHJ1ZTtcblxuICAgcmV0dXJuIGNvbmZpZztcbn1cbiIsICJpbXBvcnQgeyBpc1BhdGhTcGVjIH0gZnJvbSAnQHNpbXBsZS1naXQvYXJncy1wYXRoc3BlYyc7XG5cbmltcG9ydCB0eXBlIHsgTWF5YmUsIE9wdGlvbnMgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQge1xuICAgZmlsdGVyQXJyYXksXG4gICBmaWx0ZXJGdW5jdGlvbixcbiAgIGZpbHRlclBsYWluT2JqZWN0LFxuICAgZmlsdGVyUHJpbWl0aXZlcyxcbiAgIGZpbHRlclR5cGUsXG59IGZyb20gJy4vYXJndW1lbnQtZmlsdGVycyc7XG5pbXBvcnQgeyBhc0Z1bmN0aW9uLCBhc1N0cmluZ0FycmF5LCBpc1VzZXJGdW5jdGlvbiwgbGFzdCB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRUYXNrT3B0aW9uczxUIGV4dGVuZHMgT3B0aW9ucyA9IE9wdGlvbnM+KFxuICAgb3B0aW9uczogTWF5YmU8VD4sXG4gICBjb21tYW5kczogc3RyaW5nW10gPSBbXVxuKTogc3RyaW5nW10ge1xuICAgaWYgKCFmaWx0ZXJQbGFpbk9iamVjdDxPcHRpb25zPihvcHRpb25zKSkge1xuICAgICAgcmV0dXJuIGNvbW1hbmRzO1xuICAgfVxuXG4gICByZXR1cm4gT2JqZWN0LmtleXMob3B0aW9ucykucmVkdWNlKChjb21tYW5kczogc3RyaW5nW10sIGtleTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnNba2V5XTtcblxuICAgICAgaWYgKGlzUGF0aFNwZWModmFsdWUpKSB7XG4gICAgICAgICBjb21tYW5kcy5wdXNoKHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoZmlsdGVyUHJpbWl0aXZlcyh2YWx1ZSwgWydib29sZWFuJ10pKSB7XG4gICAgICAgICBjb21tYW5kcy5wdXNoKGtleSArICc9JyArIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgIGZvciAoY29uc3QgdiBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKCFmaWx0ZXJQcmltaXRpdmVzKHYsIFsnc3RyaW5nJywgJ251bWJlciddKSkge1xuICAgICAgICAgICAgICAgY29tbWFuZHMucHVzaChrZXkgKyAnPScgKyB2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICBjb21tYW5kcy5wdXNoKGtleSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb21tYW5kcztcbiAgIH0sIGNvbW1hbmRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYWlsaW5nT3B0aW9ucyhcbiAgIGFyZ3M6IElBcmd1bWVudHMsXG4gICBpbml0aWFsUHJpbWl0aXZlID0gMCxcbiAgIG9iamVjdE9ubHkgPSBmYWxzZVxuKTogc3RyaW5nW10ge1xuICAgY29uc3QgY29tbWFuZDogc3RyaW5nW10gPSBbXTtcblxuICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IGluaXRpYWxQcmltaXRpdmUgPCAwID8gYXJncy5sZW5ndGggOiBpbml0aWFsUHJpbWl0aXZlOyBpIDwgbWF4OyBpKyspIHtcbiAgICAgIGlmICgnc3RyaW5nfG51bWJlcicuaW5jbHVkZXModHlwZW9mIGFyZ3NbaV0pKSB7XG4gICAgICAgICBjb21tYW5kLnB1c2goU3RyaW5nKGFyZ3NbaV0pKTtcbiAgICAgIH1cbiAgIH1cblxuICAgYXBwZW5kVGFza09wdGlvbnModHJhaWxpbmdPcHRpb25zQXJndW1lbnQoYXJncyksIGNvbW1hbmQpO1xuICAgaWYgKCFvYmplY3RPbmx5KSB7XG4gICAgICBjb21tYW5kLnB1c2goLi4udHJhaWxpbmdBcnJheUFyZ3VtZW50KGFyZ3MpKTtcbiAgIH1cblxuICAgcmV0dXJuIGNvbW1hbmQ7XG59XG5cbmZ1bmN0aW9uIHRyYWlsaW5nQXJyYXlBcmd1bWVudChhcmdzOiBJQXJndW1lbnRzKSB7XG4gICBjb25zdCBoYXNUcmFpbGluZ0NhbGxiYWNrID0gdHlwZW9mIGxhc3QoYXJncykgPT09ICdmdW5jdGlvbic7XG4gICByZXR1cm4gYXNTdHJpbmdBcnJheShmaWx0ZXJUeXBlKGxhc3QoYXJncywgaGFzVHJhaWxpbmdDYWxsYmFjayA/IDEgOiAwKSwgZmlsdGVyQXJyYXksIFtdKSk7XG59XG5cbi8qKlxuICogR2l2ZW4gYW55IG51bWJlciBvZiBhcmd1bWVudHMsIHJldHVybnMgdGhlIHRyYWlsaW5nIG9wdGlvbnMgYXJndW1lbnQsIGlnbm9yaW5nIGEgdHJhaWxpbmcgZnVuY3Rpb24gYXJndW1lbnRcbiAqIGlmIHRoZXJlIGlzIG9uZS4gV2hlbiBub3QgZm91bmQsIHRoZSByZXR1cm4gdmFsdWUgaXMgbnVsbC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYWlsaW5nT3B0aW9uc0FyZ3VtZW50KGFyZ3M6IElBcmd1bWVudHMpOiBNYXliZTxPcHRpb25zPiB7XG4gICBjb25zdCBoYXNUcmFpbGluZ0NhbGxiYWNrID0gZmlsdGVyRnVuY3Rpb24obGFzdChhcmdzKSk7XG4gICByZXR1cm4gZmlsdGVyVHlwZShsYXN0KGFyZ3MsIGhhc1RyYWlsaW5nQ2FsbGJhY2sgPyAxIDogMCksIGZpbHRlclBsYWluT2JqZWN0KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGVpdGhlciB0aGUgc291cmNlIGFyZ3VtZW50IHdoZW4gaXQgaXMgYSBgRnVuY3Rpb25gLCBvciB0aGUgZGVmYXVsdFxuICogYE5PT1BgIGZ1bmN0aW9uIGNvbnN0YW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoXG4gICBhcmdzOiB1bmtub3duW10gfCBJQXJndW1lbnRzIHwgdW5rbm93bixcbiAgIGluY2x1ZGVOb29wID0gdHJ1ZVxuKTogTWF5YmU8KC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdW5rbm93bj4ge1xuICAgY29uc3QgY2FsbGJhY2sgPSBhc0Z1bmN0aW9uKGxhc3QoYXJncykpO1xuICAgcmV0dXJuIGluY2x1ZGVOb29wIHx8IGlzVXNlckZ1bmN0aW9uKGNhbGxiYWNrKSA/IGNhbGxiYWNrIDogdW5kZWZpbmVkO1xufVxuIiwgImltcG9ydCB0eXBlIHsgTWF5YmVBcnJheSwgVGFza1BhcnNlciwgVGFza1Jlc3BvbnNlRm9ybWF0IH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHR5cGUgeyBHaXRPdXRwdXRTdHJlYW1zIH0gZnJvbSAnLi9naXQtb3V0cHV0LXN0cmVhbXMnO1xuaW1wb3J0IHR5cGUgeyBMaW5lUGFyc2VyIH0gZnJvbSAnLi9saW5lLXBhcnNlcic7XG5pbXBvcnQgeyBhc0FycmF5LCB0b0xpbmVzV2l0aENvbnRlbnQgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gY2FsbFRhc2tQYXJzZXI8SU5QVVQgZXh0ZW5kcyBUYXNrUmVzcG9uc2VGb3JtYXQsIFJFU1BPTlNFPihcbiAgIHBhcnNlcjogVGFza1BhcnNlcjxJTlBVVCwgUkVTUE9OU0U+LFxuICAgc3RyZWFtczogR2l0T3V0cHV0U3RyZWFtczxJTlBVVD5cbikge1xuICAgcmV0dXJuIHBhcnNlcihzdHJlYW1zLnN0ZE91dCwgc3RyZWFtcy5zdGRFcnIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTdHJpbmdSZXNwb25zZTxUPihcbiAgIHJlc3VsdDogVCxcbiAgIHBhcnNlcnM6IExpbmVQYXJzZXI8VD5bXSxcbiAgIHRleHRzOiBNYXliZUFycmF5PHN0cmluZz4sXG4gICB0cmltID0gdHJ1ZVxuKTogVCB7XG4gICBhc0FycmF5KHRleHRzKS5mb3JFYWNoKCh0ZXh0KSA9PiB7XG4gICAgICBmb3IgKGxldCBsaW5lcyA9IHRvTGluZXNXaXRoQ29udGVudCh0ZXh0LCB0cmltKSwgaSA9IDAsIG1heCA9IGxpbmVzLmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XG4gICAgICAgICBjb25zdCBsaW5lID0gKG9mZnNldCA9IDApID0+IHtcbiAgICAgICAgICAgIGlmIChpICsgb2Zmc2V0ID49IG1heCkge1xuICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxpbmVzW2kgKyBvZmZzZXRdO1xuICAgICAgICAgfTtcblxuICAgICAgICAgcGFyc2Vycy5zb21lKCh7IHBhcnNlIH0pID0+IHBhcnNlKGxpbmUsIHJlc3VsdCkpO1xuICAgICAgfVxuICAgfSk7XG5cbiAgIHJldHVybiByZXN1bHQ7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBNYXliZSwgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IEV4aXRDb2RlcyB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGVudW0gQ2hlY2tSZXBvQWN0aW9ucyB7XG4gICBCQVJFID0gJ2JhcmUnLFxuICAgSU5fVFJFRSA9ICd0cmVlJyxcbiAgIElTX1JFUE9fUk9PVCA9ICdyb290Jyxcbn1cblxuY29uc3Qgb25FcnJvcjogU3RyaW5nVGFzazxib29sZWFuPlsnb25FcnJvciddID0gKHsgZXhpdENvZGUgfSwgZXJyb3IsIGRvbmUsIGZhaWwpID0+IHtcbiAgIGlmIChleGl0Q29kZSA9PT0gRXhpdENvZGVzLlVOQ0xFQU4gJiYgaXNOb3RSZXBvTWVzc2FnZShlcnJvcikpIHtcbiAgICAgIHJldHVybiBkb25lKEJ1ZmZlci5mcm9tKCdmYWxzZScpKTtcbiAgIH1cblxuICAgZmFpbChlcnJvcik7XG59O1xuXG5jb25zdCBwYXJzZXI6IFN0cmluZ1Rhc2s8Ym9vbGVhbj5bJ3BhcnNlciddID0gKHRleHQpID0+IHtcbiAgIHJldHVybiB0ZXh0LnRyaW0oKSA9PT0gJ3RydWUnO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrSXNSZXBvVGFzayhhY3Rpb246IE1heWJlPENoZWNrUmVwb0FjdGlvbnM+KTogU3RyaW5nVGFzazxib29sZWFuPiB7XG4gICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgY2FzZSBDaGVja1JlcG9BY3Rpb25zLkJBUkU6XG4gICAgICAgICByZXR1cm4gY2hlY2tJc0JhcmVSZXBvVGFzaygpO1xuICAgICAgY2FzZSBDaGVja1JlcG9BY3Rpb25zLklTX1JFUE9fUk9PVDpcbiAgICAgICAgIHJldHVybiBjaGVja0lzUmVwb1Jvb3RUYXNrKCk7XG4gICB9XG5cbiAgIGNvbnN0IGNvbW1hbmRzID0gWydyZXYtcGFyc2UnLCAnLS1pcy1pbnNpZGUtd29yay10cmVlJ107XG5cbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kcyxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIG9uRXJyb3IsXG4gICAgICBwYXJzZXIsXG4gICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tJc1JlcG9Sb290VGFzaygpOiBTdHJpbmdUYXNrPGJvb2xlYW4+IHtcbiAgIGNvbnN0IGNvbW1hbmRzID0gWydyZXYtcGFyc2UnLCAnLS1naXQtZGlyJ107XG5cbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kcyxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIG9uRXJyb3IsXG4gICAgICBwYXJzZXIocGF0aCkge1xuICAgICAgICAgcmV0dXJuIC9eXFwuKGdpdCk/JC8udGVzdChwYXRoLnRyaW0oKSk7XG4gICAgICB9LFxuICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrSXNCYXJlUmVwb1Rhc2soKTogU3RyaW5nVGFzazxib29sZWFuPiB7XG4gICBjb25zdCBjb21tYW5kcyA9IFsncmV2LXBhcnNlJywgJy0taXMtYmFyZS1yZXBvc2l0b3J5J107XG5cbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kcyxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIG9uRXJyb3IsXG4gICAgICBwYXJzZXIsXG4gICB9O1xufVxuXG5mdW5jdGlvbiBpc05vdFJlcG9NZXNzYWdlKGVycm9yOiBFcnJvcik6IGJvb2xlYW4ge1xuICAgcmV0dXJuIC8oTm90IGEgZ2l0IHJlcG9zaXRvcnl8S2VpbiBHaXQtUmVwb3NpdG9yeSkvaS50ZXN0KFN0cmluZyhlcnJvcikpO1xufVxuIiwgImltcG9ydCB0eXBlIHsgQ2xlYW5TdW1tYXJ5IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyB0b0xpbmVzV2l0aENvbnRlbnQgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBjbGFzcyBDbGVhblJlc3BvbnNlIGltcGxlbWVudHMgQ2xlYW5TdW1tYXJ5IHtcbiAgIHB1YmxpYyByZWFkb25seSBwYXRoczogc3RyaW5nW107XG4gICBwdWJsaWMgcmVhZG9ubHkgZmlsZXM6IHN0cmluZ1tdO1xuICAgcHVibGljIHJlYWRvbmx5IGZvbGRlcnM6IHN0cmluZ1tdO1xuICAgcHVibGljIHJlYWRvbmx5IGRyeVJ1bjogYm9vbGVhbjtcblxuICAgY29uc3RydWN0b3IoZHJ5UnVuOiBib29sZWFuKSB7XG4gICAgICB0aGlzLnBhdGhzID0gW107XG4gICAgICB0aGlzLmZpbGVzID0gW107XG4gICAgICB0aGlzLmZvbGRlcnMgPSBbXTtcbiAgICAgIHRoaXMuZHJ5UnVuID0gZHJ5UnVuO1xuICAgfVxufVxuXG5jb25zdCByZW1vdmFsUmVnZXhwID0gL15bYS16XStcXHMqL2k7XG5jb25zdCBkcnlSdW5SZW1vdmFsUmVnZXhwID0gL15bYS16XStcXHMrW2Etel0rXFxzKi9pO1xuY29uc3QgaXNGb2xkZXJSZWdleHAgPSAvXFwvJC87XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhblN1bW1hcnlQYXJzZXIoZHJ5UnVuOiBib29sZWFuLCB0ZXh0OiBzdHJpbmcpOiBDbGVhblN1bW1hcnkge1xuICAgY29uc3Qgc3VtbWFyeSA9IG5ldyBDbGVhblJlc3BvbnNlKGRyeVJ1bik7XG4gICBjb25zdCByZWdleHAgPSBkcnlSdW4gPyBkcnlSdW5SZW1vdmFsUmVnZXhwIDogcmVtb3ZhbFJlZ2V4cDtcblxuICAgdG9MaW5lc1dpdGhDb250ZW50KHRleHQpLmZvckVhY2goKGxpbmUpID0+IHtcbiAgICAgIGNvbnN0IHJlbW92ZWQgPSBsaW5lLnJlcGxhY2UocmVnZXhwLCAnJyk7XG5cbiAgICAgIHN1bW1hcnkucGF0aHMucHVzaChyZW1vdmVkKTtcbiAgICAgIChpc0ZvbGRlclJlZ2V4cC50ZXN0KHJlbW92ZWQpID8gc3VtbWFyeS5mb2xkZXJzIDogc3VtbWFyeS5maWxlcykucHVzaChyZW1vdmVkKTtcbiAgIH0pO1xuXG4gICByZXR1cm4gc3VtbWFyeTtcbn1cbiIsICJpbXBvcnQgeyBUYXNrQ29uZmlndXJhdGlvbkVycm9yIH0gZnJvbSAnLi4vZXJyb3JzL3Rhc2stY29uZmlndXJhdGlvbi1lcnJvcic7XG5pbXBvcnQgdHlwZSB7IEJ1ZmZlclRhc2ssIEVtcHR5VGFza1BhcnNlciwgU2ltcGxlR2l0VGFzaywgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IEVNUFRZX0NPTU1BTkRTOiBbXSA9IFtdO1xuXG5leHBvcnQgdHlwZSBFbXB0eVRhc2sgPSB7XG4gICBjb21tYW5kczogdHlwZW9mIEVNUFRZX0NPTU1BTkRTO1xuICAgZm9ybWF0OiAnZW1wdHknO1xuICAgcGFyc2VyOiBFbXB0eVRhc2tQYXJzZXI7XG4gICBvbkVycm9yPzogdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkaG9jRXhlY1Rhc2socGFyc2VyOiBFbXB0eVRhc2tQYXJzZXIpOiBFbXB0eVRhc2sge1xuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzOiBFTVBUWV9DT01NQU5EUyxcbiAgICAgIGZvcm1hdDogJ2VtcHR5JyxcbiAgICAgIHBhcnNlcixcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmF0aW9uRXJyb3JUYXNrKGVycm9yOiBFcnJvciB8IHN0cmluZyk6IEVtcHR5VGFzayB7XG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHM6IEVNUFRZX0NPTU1BTkRTLFxuICAgICAgZm9ybWF0OiAnZW1wdHknLFxuICAgICAgcGFyc2VyKCkge1xuICAgICAgICAgdGhyb3cgdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IG5ldyBUYXNrQ29uZmlndXJhdGlvbkVycm9yKGVycm9yKSA6IGVycm9yO1xuICAgICAgfSxcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKGNvbW1hbmRzOiBzdHJpbmdbXSwgdHJpbW1lZCA9IGZhbHNlKTogU3RyaW5nVGFzazxzdHJpbmc+IHtcbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kcyxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIHBhcnNlcih0ZXh0KSB7XG4gICAgICAgICByZXR1cm4gdHJpbW1lZCA/IFN0cmluZyh0ZXh0KS50cmltKCkgOiB0ZXh0O1xuICAgICAgfSxcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJhaWdodFRocm91Z2hCdWZmZXJUYXNrKGNvbW1hbmRzOiBzdHJpbmdbXSk6IEJ1ZmZlclRhc2s8QnVmZmVyPiB7XG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICdidWZmZXInLFxuICAgICAgcGFyc2VyKGJ1ZmZlcikge1xuICAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcbiAgICAgIH0sXG4gICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCdWZmZXJUYXNrPFI+KHRhc2s6IFNpbXBsZUdpdFRhc2s8Uj4pOiB0YXNrIGlzIEJ1ZmZlclRhc2s8Uj4ge1xuICAgcmV0dXJuIHRhc2suZm9ybWF0ID09PSAnYnVmZmVyJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHlUYXNrPFI+KHRhc2s6IFNpbXBsZUdpdFRhc2s8Uj4pOiB0YXNrIGlzIEVtcHR5VGFzayB7XG4gICByZXR1cm4gdGFzay5mb3JtYXQgPT09ICdlbXB0eScgfHwgIXRhc2suY29tbWFuZHMubGVuZ3RoO1xufVxuIiwgImltcG9ydCB0eXBlIHsgQ2xlYW5TdW1tYXJ5IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBjbGVhblN1bW1hcnlQYXJzZXIgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlLWNsZWFuJztcbmltcG9ydCB0eXBlIHsgTWF5YmUsIFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBhc1N0cmluZ0FycmF5IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgY29uZmlndXJhdGlvbkVycm9yVGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmV4cG9ydCBjb25zdCBDT05GSUdfRVJST1JfSU5URVJBQ1RJVkVfTU9ERSA9ICdHaXQgY2xlYW4gaW50ZXJhY3RpdmUgbW9kZSBpcyBub3Qgc3VwcG9ydGVkJztcbmV4cG9ydCBjb25zdCBDT05GSUdfRVJST1JfTU9ERV9SRVFVSVJFRCA9ICdHaXQgY2xlYW4gbW9kZSBwYXJhbWV0ZXIgKFwiblwiIG9yIFwiZlwiKSBpcyByZXF1aXJlZCc7XG5leHBvcnQgY29uc3QgQ09ORklHX0VSUk9SX1VOS05PV05fT1BUSU9OID0gJ0dpdCBjbGVhbiB1bmtub3duIG9wdGlvbiBmb3VuZCBpbjogJztcblxuLyoqXG4gKiBBbGwgc3VwcG9ydGVkIG9wdGlvbiBzd2l0Y2hlcyBhdmFpbGFibGUgZm9yIHVzZSBpbiBhIGBnaXQuY2xlYW5gIG9wZXJhdGlvblxuICovXG5leHBvcnQgZW51bSBDbGVhbk9wdGlvbnMge1xuICAgRFJZX1JVTiA9ICduJyxcbiAgIEZPUkNFID0gJ2YnLFxuICAgSUdOT1JFRF9JTkNMVURFRCA9ICd4JyxcbiAgIElHTk9SRURfT05MWSA9ICdYJyxcbiAgIEVYQ0xVRElORyA9ICdlJyxcbiAgIFFVSUVUID0gJ3EnLFxuICAgUkVDVVJTSVZFID0gJ2QnLFxufVxuXG4vKipcbiAqIFRoZSB0d28gbW9kZXMgYGdpdC5jbGVhbmAgY2FuIHJ1biBpbiAtIG9uZSBvZiB0aGVzZSBtdXN0IGJlIHN1cHBsaWVkIGluIG9yZGVyXG4gKiBmb3IgdGhlIGNvbW1hbmQgdG8gbm90IHRocm93IGEgYFRhc2tDb25maWd1cmF0aW9uRXJyb3JgXG4gKi9cbmV4cG9ydCB0eXBlIENsZWFuTW9kZSA9IENsZWFuT3B0aW9ucy5GT1JDRSB8IENsZWFuT3B0aW9ucy5EUllfUlVOO1xuXG5jb25zdCBDbGVhbk9wdGlvblZhbHVlczogU2V0PHN0cmluZz4gPSBuZXcgU2V0KFtcbiAgICdpJyxcbiAgIC4uLmFzU3RyaW5nQXJyYXkoT2JqZWN0LnZhbHVlcyhDbGVhbk9wdGlvbnMgYXMgYW55KSksXG5dKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuV2l0aE9wdGlvbnNUYXNrKG1vZGU6IENsZWFuTW9kZSB8IHN0cmluZywgY3VzdG9tQXJnczogc3RyaW5nW10pIHtcbiAgIGNvbnN0IHsgY2xlYW5Nb2RlLCBvcHRpb25zLCB2YWxpZCB9ID0gZ2V0Q2xlYW5PcHRpb25zKG1vZGUpO1xuXG4gICBpZiAoIWNsZWFuTW9kZSkge1xuICAgICAgcmV0dXJuIGNvbmZpZ3VyYXRpb25FcnJvclRhc2soQ09ORklHX0VSUk9SX01PREVfUkVRVUlSRUQpO1xuICAgfVxuXG4gICBpZiAoIXZhbGlkLm9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBjb25maWd1cmF0aW9uRXJyb3JUYXNrKENPTkZJR19FUlJPUl9VTktOT1dOX09QVElPTiArIEpTT04uc3RyaW5naWZ5KG1vZGUpKTtcbiAgIH1cblxuICAgb3B0aW9ucy5wdXNoKC4uLmN1c3RvbUFyZ3MpO1xuXG4gICBpZiAob3B0aW9ucy5zb21lKGlzSW50ZXJhY3RpdmVNb2RlKSkge1xuICAgICAgcmV0dXJuIGNvbmZpZ3VyYXRpb25FcnJvclRhc2soQ09ORklHX0VSUk9SX0lOVEVSQUNUSVZFX01PREUpO1xuICAgfVxuXG4gICByZXR1cm4gY2xlYW5UYXNrKGNsZWFuTW9kZSwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhblRhc2sobW9kZTogQ2xlYW5Nb2RlLCBjdXN0b21BcmdzOiBzdHJpbmdbXSk6IFN0cmluZ1Rhc2s8Q2xlYW5TdW1tYXJ5PiB7XG4gICBjb25zdCBjb21tYW5kczogc3RyaW5nW10gPSBbJ2NsZWFuJywgYC0ke21vZGV9YCwgLi4uY3VzdG9tQXJnc107XG5cbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kcyxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIHBhcnNlcih0ZXh0OiBzdHJpbmcpOiBDbGVhblN1bW1hcnkge1xuICAgICAgICAgcmV0dXJuIGNsZWFuU3VtbWFyeVBhcnNlcihtb2RlID09PSBDbGVhbk9wdGlvbnMuRFJZX1JVTiwgdGV4dCk7XG4gICAgICB9LFxuICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2xlYW5PcHRpb25zQXJyYXkoaW5wdXQ6IHN0cmluZ1tdKTogaW5wdXQgaXMgQ2xlYW5PcHRpb25zW10ge1xuICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoaW5wdXQpICYmIGlucHV0LmV2ZXJ5KCh0ZXN0KSA9PiBDbGVhbk9wdGlvblZhbHVlcy5oYXModGVzdCkpO1xufVxuXG5mdW5jdGlvbiBnZXRDbGVhbk9wdGlvbnMoaW5wdXQ6IHN0cmluZykge1xuICAgbGV0IGNsZWFuTW9kZTogTWF5YmU8Q2xlYW5Nb2RlPjtcbiAgIGxldCBvcHRpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgbGV0IHZhbGlkID0geyBjbGVhbk1vZGU6IGZhbHNlLCBvcHRpb25zOiB0cnVlIH07XG5cbiAgIGlucHV0XG4gICAgICAucmVwbGFjZSgvW15hLXpdaS9nLCAnJylcbiAgICAgIC5zcGxpdCgnJylcbiAgICAgIC5mb3JFYWNoKChjaGFyKSA9PiB7XG4gICAgICAgICBpZiAoaXNDbGVhbk1vZGUoY2hhcikpIHtcbiAgICAgICAgICAgIGNsZWFuTW9kZSA9IGNoYXI7XG4gICAgICAgICAgICB2YWxpZC5jbGVhbk1vZGUgPSB0cnVlO1xuICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbGlkLm9wdGlvbnMgPSB2YWxpZC5vcHRpb25zICYmIGlzS25vd25PcHRpb24oKG9wdGlvbnNbb3B0aW9ucy5sZW5ndGhdID0gYC0ke2NoYXJ9YCkpO1xuICAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgIHJldHVybiB7XG4gICAgICBjbGVhbk1vZGUsXG4gICAgICBvcHRpb25zLFxuICAgICAgdmFsaWQsXG4gICB9O1xufVxuXG5mdW5jdGlvbiBpc0NsZWFuTW9kZShjbGVhbk1vZGU/OiBzdHJpbmcpOiBjbGVhbk1vZGUgaXMgQ2xlYW5Nb2RlIHtcbiAgIHJldHVybiBjbGVhbk1vZGUgPT09IENsZWFuT3B0aW9ucy5GT1JDRSB8fCBjbGVhbk1vZGUgPT09IENsZWFuT3B0aW9ucy5EUllfUlVOO1xufVxuXG5mdW5jdGlvbiBpc0tub3duT3B0aW9uKG9wdGlvbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICByZXR1cm4gL14tW2Etel0kL2kudGVzdChvcHRpb24pICYmIENsZWFuT3B0aW9uVmFsdWVzLmhhcyhvcHRpb24uY2hhckF0KDEpKTtcbn1cblxuZnVuY3Rpb24gaXNJbnRlcmFjdGl2ZU1vZGUob3B0aW9uOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgIGlmICgvXi1bXlxcLV0vLnRlc3Qob3B0aW9uKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbi5pbmRleE9mKCdpJykgPiAwO1xuICAgfVxuXG4gICByZXR1cm4gb3B0aW9uID09PSAnLS1pbnRlcmFjdGl2ZSc7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBDb25maWdHZXRSZXN1bHQsIENvbmZpZ0xpc3RTdW1tYXJ5LCBDb25maWdWYWx1ZXMgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IGxhc3QsIHNwbGl0T24gfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBjbGFzcyBDb25maWdMaXN0IGltcGxlbWVudHMgQ29uZmlnTGlzdFN1bW1hcnkge1xuICAgcHVibGljIGZpbGVzOiBzdHJpbmdbXSA9IFtdO1xuICAgcHVibGljIHZhbHVlczogeyBbZmlsZU5hbWU6IHN0cmluZ106IENvbmZpZ1ZhbHVlcyB9ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgcHJpdmF0ZSBfYWxsOiBDb25maWdWYWx1ZXMgfCB1bmRlZmluZWQ7XG5cbiAgIHB1YmxpYyBnZXQgYWxsKCk6IENvbmZpZ1ZhbHVlcyB7XG4gICAgICBpZiAoIXRoaXMuX2FsbCkge1xuICAgICAgICAgdGhpcy5fYWxsID0gdGhpcy5maWxlcy5yZWR1Y2UoKGFsbDogQ29uZmlnVmFsdWVzLCBmaWxlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGFsbCwgdGhpcy52YWx1ZXNbZmlsZV0pO1xuICAgICAgICAgfSwge30pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fYWxsO1xuICAgfVxuXG4gICBwdWJsaWMgYWRkRmlsZShmaWxlOiBzdHJpbmcpOiBDb25maWdWYWx1ZXMge1xuICAgICAgaWYgKCEoZmlsZSBpbiB0aGlzLnZhbHVlcykpIHtcbiAgICAgICAgIGNvbnN0IGxhdGVzdCA9IGxhc3QodGhpcy5maWxlcyk7XG4gICAgICAgICB0aGlzLnZhbHVlc1tmaWxlXSA9IGxhdGVzdCA/IE9iamVjdC5jcmVhdGUodGhpcy52YWx1ZXNbbGF0ZXN0XSkgOiB7fTtcblxuICAgICAgICAgdGhpcy5maWxlcy5wdXNoKGZpbGUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZXNbZmlsZV07XG4gICB9XG5cbiAgIHB1YmxpYyBhZGRWYWx1ZShmaWxlOiBzdHJpbmcsIGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLmFkZEZpbGUoZmlsZSk7XG5cbiAgICAgIGlmICghT2JqZWN0Lmhhc093bih2YWx1ZXMsIGtleSkpIHtcbiAgICAgICAgIHZhbHVlc1trZXldID0gdmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWVzW2tleV0pKSB7XG4gICAgICAgICAodmFsdWVzW2tleV0gYXMgc3RyaW5nW10pLnB1c2godmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIHZhbHVlc1trZXldID0gW3ZhbHVlc1trZXldIGFzIHN0cmluZywgdmFsdWVdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9hbGwgPSB1bmRlZmluZWQ7XG4gICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWdMaXN0UGFyc2VyKHRleHQ6IHN0cmluZyk6IENvbmZpZ0xpc3Qge1xuICAgY29uc3QgY29uZmlnID0gbmV3IENvbmZpZ0xpc3QoKTtcblxuICAgZm9yIChjb25zdCBpdGVtIG9mIGNvbmZpZ1BhcnNlcih0ZXh0KSkge1xuICAgICAgY29uZmlnLmFkZFZhbHVlKGl0ZW0uZmlsZSwgU3RyaW5nKGl0ZW0ua2V5KSwgaXRlbS52YWx1ZSk7XG4gICB9XG5cbiAgIHJldHVybiBjb25maWc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWdHZXRQYXJzZXIodGV4dDogc3RyaW5nLCBrZXk6IHN0cmluZyk6IENvbmZpZ0dldFJlc3VsdCB7XG4gICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgY29uc3QgdmFsdWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgY29uc3Qgc2NvcGVzOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT4gPSBuZXcgTWFwKCk7XG5cbiAgIGZvciAoY29uc3QgaXRlbSBvZiBjb25maWdQYXJzZXIodGV4dCwga2V5KSkge1xuICAgICAgaWYgKGl0ZW0ua2V5ICE9PSBrZXkpIHtcbiAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB2YWx1ZXMucHVzaCgodmFsdWUgPSBpdGVtLnZhbHVlKSk7XG5cbiAgICAgIGlmICghc2NvcGVzLmhhcyhpdGVtLmZpbGUpKSB7XG4gICAgICAgICBzY29wZXMuc2V0KGl0ZW0uZmlsZSwgW10pO1xuICAgICAgfVxuXG4gICAgICBzY29wZXMuZ2V0KGl0ZW0uZmlsZSkhLnB1c2godmFsdWUpO1xuICAgfVxuXG4gICByZXR1cm4ge1xuICAgICAga2V5LFxuICAgICAgcGF0aHM6IEFycmF5LmZyb20oc2NvcGVzLmtleXMoKSksXG4gICAgICBzY29wZXMsXG4gICAgICB2YWx1ZSxcbiAgICAgIHZhbHVlcyxcbiAgIH07XG59XG5cbmZ1bmN0aW9uIGNvbmZpZ0ZpbGVQYXRoKGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgcmV0dXJuIGZpbGVQYXRoLnJlcGxhY2UoL14oZmlsZSk6LywgJycpO1xufVxuXG5mdW5jdGlvbiogY29uZmlnUGFyc2VyKHRleHQ6IHN0cmluZywgcmVxdWVzdGVkS2V5OiBzdHJpbmcgfCBudWxsID0gbnVsbCkge1xuICAgY29uc3QgbGluZXMgPSB0ZXh0LnNwbGl0KCdcXDAnKTtcblxuICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IGxpbmVzLmxlbmd0aCAtIDE7IGkgPCBtYXg7ICkge1xuICAgICAgY29uc3QgZmlsZSA9IGNvbmZpZ0ZpbGVQYXRoKGxpbmVzW2krK10pO1xuXG4gICAgICBsZXQgdmFsdWUgPSBsaW5lc1tpKytdO1xuICAgICAgbGV0IGtleSA9IHJlcXVlc3RlZEtleTtcblxuICAgICAgaWYgKHZhbHVlLmluY2x1ZGVzKCdcXG4nKSkge1xuICAgICAgICAgY29uc3QgbGluZSA9IHNwbGl0T24odmFsdWUsICdcXG4nKTtcbiAgICAgICAgIGtleSA9IGxpbmVbMF07XG4gICAgICAgICB2YWx1ZSA9IGxpbmVbMV07XG4gICAgICB9XG5cbiAgICAgIHlpZWxkIHsgZmlsZSwga2V5LCB2YWx1ZSB9O1xuICAgfVxufVxuIiwgImltcG9ydCB0eXBlIHsgQ29uZmlnR2V0UmVzdWx0LCBDb25maWdMaXN0U3VtbWFyeSwgU2ltcGxlR2l0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBjb25maWdHZXRQYXJzZXIsIGNvbmZpZ0xpc3RQYXJzZXIgfSBmcm9tICcuLi9yZXNwb25zZXMvQ29uZmlnTGlzdCc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdEFwaSB9IGZyb20gJy4uL3NpbXBsZS1naXQtYXBpJztcbmltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGVudW0gR2l0Q29uZmlnU2NvcGUge1xuICAgc3lzdGVtID0gJ3N5c3RlbScsXG4gICBnbG9iYWwgPSAnZ2xvYmFsJyxcbiAgIGxvY2FsID0gJ2xvY2FsJyxcbiAgIHdvcmt0cmVlID0gJ3dvcmt0cmVlJyxcbn1cblxuZnVuY3Rpb24gYXNDb25maWdTY29wZTxUIGV4dGVuZHMgR2l0Q29uZmlnU2NvcGUgfCB1bmRlZmluZWQ+KFxuICAgc2NvcGU6IEdpdENvbmZpZ1Njb3BlIHwgdW5rbm93bixcbiAgIGZhbGxiYWNrOiBUXG4pOiBHaXRDb25maWdTY29wZSB8IFQge1xuICAgaWYgKHR5cGVvZiBzY29wZSA9PT0gJ3N0cmluZycgJiYgT2JqZWN0Lmhhc093bihHaXRDb25maWdTY29wZSwgc2NvcGUpKSB7XG4gICAgICByZXR1cm4gc2NvcGUgYXMgR2l0Q29uZmlnU2NvcGU7XG4gICB9XG4gICByZXR1cm4gZmFsbGJhY2s7XG59XG5cbmZ1bmN0aW9uIGFkZENvbmZpZ1Rhc2soXG4gICBrZXk6IHN0cmluZyxcbiAgIHZhbHVlOiBzdHJpbmcsXG4gICBhcHBlbmQ6IGJvb2xlYW4sXG4gICBzY29wZTogR2l0Q29uZmlnU2NvcGVcbik6IFN0cmluZ1Rhc2s8c3RyaW5nPiB7XG4gICBjb25zdCBjb21tYW5kczogc3RyaW5nW10gPSBbJ2NvbmZpZycsIGAtLSR7c2NvcGV9YF07XG5cbiAgIGlmIChhcHBlbmQpIHtcbiAgICAgIGNvbW1hbmRzLnB1c2goJy0tYWRkJyk7XG4gICB9XG5cbiAgIGNvbW1hbmRzLnB1c2goa2V5LCB2YWx1ZSk7XG5cbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kcyxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIHBhcnNlcih0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICB9LFxuICAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29uZmlnVGFzayhrZXk6IHN0cmluZywgc2NvcGU/OiBHaXRDb25maWdTY29wZSk6IFN0cmluZ1Rhc2s8Q29uZmlnR2V0UmVzdWx0PiB7XG4gICBjb25zdCBjb21tYW5kczogc3RyaW5nW10gPSBbJ2NvbmZpZycsICctLW51bGwnLCAnLS1zaG93LW9yaWdpbicsICctLWdldC1hbGwnLCBrZXldO1xuXG4gICBpZiAoc2NvcGUpIHtcbiAgICAgIGNvbW1hbmRzLnNwbGljZSgxLCAwLCBgLS0ke3Njb3BlfWApO1xuICAgfVxuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXIodGV4dCkge1xuICAgICAgICAgcmV0dXJuIGNvbmZpZ0dldFBhcnNlcih0ZXh0LCBrZXkpO1xuICAgICAgfSxcbiAgIH07XG59XG5cbmZ1bmN0aW9uIGxpc3RDb25maWdUYXNrKHNjb3BlPzogR2l0Q29uZmlnU2NvcGUpOiBTdHJpbmdUYXNrPENvbmZpZ0xpc3RTdW1tYXJ5PiB7XG4gICBjb25zdCBjb21tYW5kcyA9IFsnY29uZmlnJywgJy0tbGlzdCcsICctLXNob3ctb3JpZ2luJywgJy0tbnVsbCddO1xuXG4gICBpZiAoc2NvcGUpIHtcbiAgICAgIGNvbW1hbmRzLnB1c2goYC0tJHtzY29wZX1gKTtcbiAgIH1cblxuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgcGFyc2VyKHRleHQ6IHN0cmluZykge1xuICAgICAgICAgcmV0dXJuIGNvbmZpZ0xpc3RQYXJzZXIodGV4dCk7XG4gICAgICB9LFxuICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCk6IFBpY2s8U2ltcGxlR2l0LCAnYWRkQ29uZmlnJyB8ICdnZXRDb25maWcnIHwgJ2xpc3RDb25maWcnPiB7XG4gICByZXR1cm4ge1xuICAgICAgYWRkQ29uZmlnKHRoaXM6IFNpbXBsZUdpdEFwaSwga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIC4uLnJlc3Q6IHVua25vd25bXSkge1xuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICAgICBhZGRDb25maWdUYXNrKFxuICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICByZXN0WzBdID09PSB0cnVlLFxuICAgICAgICAgICAgICAgYXNDb25maWdTY29wZShyZXN0WzFdLCBHaXRDb25maWdTY29wZS5sb2NhbClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgICAgKTtcbiAgICAgIH0sXG5cbiAgICAgIGdldENvbmZpZyh0aGlzOiBTaW1wbGVHaXRBcGksIGtleTogc3RyaW5nLCBzY29wZT86IEdpdENvbmZpZ1Njb3BlKSB7XG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgICAgIGdldENvbmZpZ1Rhc2soa2V5LCBhc0NvbmZpZ1Njb3BlKHNjb3BlLCB1bmRlZmluZWQpKSxcbiAgICAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICAgICApO1xuICAgICAgfSxcblxuICAgICAgbGlzdENvbmZpZyh0aGlzOiBTaW1wbGVHaXRBcGksIC4uLnJlc3Q6IHVua25vd25bXSkge1xuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICAgICBsaXN0Q29uZmlnVGFzayhhc0NvbmZpZ1Njb3BlKHJlc3RbMF0sIHVuZGVmaW5lZCkpLFxuICAgICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICAgICAgICk7XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJleHBvcnQgZW51bSBEaWZmTmFtZVN0YXR1cyB7XG4gICBBRERFRCA9ICdBJyxcbiAgIENPUElFRCA9ICdDJyxcbiAgIERFTEVURUQgPSAnRCcsXG4gICBNT0RJRklFRCA9ICdNJyxcbiAgIFJFTkFNRUQgPSAnUicsXG4gICBDSEFOR0VEID0gJ1QnLFxuICAgVU5NRVJHRUQgPSAnVScsXG4gICBVTktOT1dOID0gJ1gnLFxuICAgQlJPS0VOID0gJ0InLFxufVxuXG5jb25zdCBkaWZmTmFtZVN0YXR1cyA9IG5ldyBTZXQoT2JqZWN0LnZhbHVlcyhEaWZmTmFtZVN0YXR1cykpO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNEaWZmTmFtZVN0YXR1cyhpbnB1dDogc3RyaW5nKTogaW5wdXQgaXMgRGlmZk5hbWVTdGF0dXMge1xuICAgcmV0dXJuIGRpZmZOYW1lU3RhdHVzLmhhcyhpbnB1dCBhcyBEaWZmTmFtZVN0YXR1cyk7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBHcmVwUmVzdWx0LCBTaW1wbGVHaXQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0QXBpIH0gZnJvbSAnLi4vc2ltcGxlLWdpdC1hcGknO1xuaW1wb3J0IHtcbiAgIGFzTnVtYmVyLFxuICAgZm9yRWFjaExpbmVXaXRoQ29udGVudCxcbiAgIGdldFRyYWlsaW5nT3B0aW9ucyxcbiAgIE5VTEwsXG4gICBwcmVmaXhlZEFycmF5LFxuICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50LFxufSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBjb25maWd1cmF0aW9uRXJyb3JUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuY29uc3QgZGlzYWxsb3dlZE9wdGlvbnMgPSBbJy1oJ107XG5cbmNvbnN0IFF1ZXJ5ID0gU3ltYm9sKCdncmVwUXVlcnknKTtcblxuZXhwb3J0IGludGVyZmFjZSBHaXRHcmVwUXVlcnkgZXh0ZW5kcyBJdGVyYWJsZTxzdHJpbmc+IHtcbiAgIC8qKiBBZGRzIG9uZSBvciBtb3JlIHRlcm1zIHRvIGJlIGdyb3VwZWQgYXMgYW4gXCJhbmRcIiB0byBhbnkgb3RoZXIgdGVybXMgKi9cbiAgIGFuZCguLi5hbmQ6IHN0cmluZ1tdKTogdGhpcztcblxuICAgLyoqIEFkZHMgb25lIG9yIG1vcmUgc2VhcmNoIHRlcm1zIC0gZ2l0LmdyZXAgd2lsbCBcIm9yXCIgdGhpcyB0byBvdGhlciB0ZXJtcyAqL1xuICAgcGFyYW0oLi4ucGFyYW06IHN0cmluZ1tdKTogdGhpcztcbn1cblxuY2xhc3MgR3JlcFF1ZXJ5IGltcGxlbWVudHMgR2l0R3JlcFF1ZXJ5IHtcbiAgIHByaXZhdGUgW1F1ZXJ5XTogc3RyaW5nW10gPSBbXTtcblxuICAgKltTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgICAgZm9yIChjb25zdCBxdWVyeSBvZiB0aGlzW1F1ZXJ5XSkge1xuICAgICAgICAgeWllbGQgcXVlcnk7XG4gICAgICB9XG4gICB9XG5cbiAgIGFuZCguLi5hbmQ6IHN0cmluZ1tdKSB7XG4gICAgICBhbmQubGVuZ3RoICYmIHRoaXNbUXVlcnldLnB1c2goJy0tYW5kJywgJygnLCAuLi5wcmVmaXhlZEFycmF5KGFuZCwgJy1lJyksICcpJyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgIH1cblxuICAgcGFyYW0oLi4ucGFyYW06IHN0cmluZ1tdKSB7XG4gICAgICB0aGlzW1F1ZXJ5XS5wdXNoKC4uLnByZWZpeGVkQXJyYXkocGFyYW0sICctZScpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgYnVpbGRlciBmb3IgYSBgZ2l0LmdyZXBgIHF1ZXJ5IHdpdGggb3B0aW9uYWwgcGFyYW1zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBncmVwUXVlcnlCdWlsZGVyKC4uLnBhcmFtczogc3RyaW5nW10pOiBHaXRHcmVwUXVlcnkge1xuICAgcmV0dXJuIG5ldyBHcmVwUXVlcnkoKS5wYXJhbSguLi5wYXJhbXMpO1xufVxuXG5mdW5jdGlvbiBwYXJzZUdyZXAoZ3JlcDogc3RyaW5nKTogR3JlcFJlc3VsdCB7XG4gICBjb25zdCBwYXRoczogR3JlcFJlc3VsdFsncGF0aHMnXSA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgY29uc3QgcmVzdWx0czogR3JlcFJlc3VsdFsncmVzdWx0cyddID0ge307XG5cbiAgIGZvckVhY2hMaW5lV2l0aENvbnRlbnQoZ3JlcCwgKGlucHV0KSA9PiB7XG4gICAgICBjb25zdCBbcGF0aCwgbGluZSwgcHJldmlld10gPSBpbnB1dC5zcGxpdChOVUxMKTtcbiAgICAgIHBhdGhzLmFkZChwYXRoKTtcbiAgICAgIChyZXN1bHRzW3BhdGhdID0gcmVzdWx0c1twYXRoXSB8fCBbXSkucHVzaCh7XG4gICAgICAgICBsaW5lOiBhc051bWJlcihsaW5lKSxcbiAgICAgICAgIHBhdGgsXG4gICAgICAgICBwcmV2aWV3LFxuICAgICAgfSk7XG4gICB9KTtcblxuICAgcmV0dXJuIHtcbiAgICAgIHBhdGhzLFxuICAgICAgcmVzdWx0cyxcbiAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpOiBQaWNrPFNpbXBsZUdpdCwgJ2dyZXAnPiB7XG4gICByZXR1cm4ge1xuICAgICAgZ3JlcCh0aGlzOiBTaW1wbGVHaXRBcGksIHNlYXJjaFRlcm06IHN0cmluZyB8IEdpdEdyZXBRdWVyeSkge1xuICAgICAgICAgY29uc3QgdGhlbiA9IHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpO1xuICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpO1xuXG4gICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBkaXNhbGxvd2VkT3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuaW5jbHVkZXMob3B0aW9uKSkge1xuICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uRXJyb3JUYXNrKGBnaXQuZ3JlcDogdXNlIG9mIFwiJHtvcHRpb259XCIgaXMgbm90IHN1cHBvcnRlZC5gKSxcbiAgICAgICAgICAgICAgICAgIHRoZW5cbiAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICB9XG5cbiAgICAgICAgIGlmICh0eXBlb2Ygc2VhcmNoVGVybSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHNlYXJjaFRlcm0gPSBncmVwUXVlcnlCdWlsZGVyKCkucGFyYW0oc2VhcmNoVGVybSk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIGNvbnN0IGNvbW1hbmRzID0gWydncmVwJywgJy0tbnVsbCcsICctbicsICctLWZ1bGwtbmFtZScsIC4uLm9wdGlvbnMsIC4uLnNlYXJjaFRlcm1dO1xuXG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIGNvbW1hbmRzLFxuICAgICAgICAgICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgICAgICAgICAgcGFyc2VyKHN0ZE91dCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlR3JlcChzdGRPdXQpO1xuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aGVuXG4gICAgICAgICApO1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBNYXliZSwgT3B0aW9uRmxhZ3MsIE9wdGlvbnMgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBhc1N0cmluZ0FycmF5IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmV4cG9ydCBlbnVtIFJlc2V0TW9kZSB7XG4gICBNSVhFRCA9ICdtaXhlZCcsXG4gICBTT0ZUID0gJ3NvZnQnLFxuICAgSEFSRCA9ICdoYXJkJyxcbiAgIE1FUkdFID0gJ21lcmdlJyxcbiAgIEtFRVAgPSAna2VlcCcsXG59XG5cbmNvbnN0IHZhbGlkUmVzZXRNb2RlcyA9IGFzU3RyaW5nQXJyYXkoT2JqZWN0LnZhbHVlcyhSZXNldE1vZGUpKTtcblxuZXhwb3J0IHR5cGUgUmVzZXRPcHRpb25zID0gT3B0aW9ucyAmXG4gICBPcHRpb25GbGFnczwnLXEnIHwgJy0tcXVpZXQnIHwgJy0tbm8tcXVpZXQnIHwgJy0tcGF0aHNwZWMtZnJvbS1udWwnPiAmXG4gICBPcHRpb25GbGFnczwnLS1wYXRoc3BlYy1mcm9tLWZpbGUnLCBzdHJpbmc+O1xuXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRUYXNrKG1vZGU6IE1heWJlPFJlc2V0TW9kZT4sIGN1c3RvbUFyZ3M6IHN0cmluZ1tdKSB7XG4gICBjb25zdCBjb21tYW5kczogc3RyaW5nW10gPSBbJ3Jlc2V0J107XG4gICBpZiAoaXNWYWxpZFJlc2V0TW9kZShtb2RlKSkge1xuICAgICAgY29tbWFuZHMucHVzaChgLS0ke21vZGV9YCk7XG4gICB9XG4gICBjb21tYW5kcy5wdXNoKC4uLmN1c3RvbUFyZ3MpO1xuXG4gICByZXR1cm4gc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhjb21tYW5kcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZXNldE1vZGUobW9kZTogUmVzZXRNb2RlIHwgdW5rbm93bik6IE1heWJlPFJlc2V0TW9kZT4ge1xuICAgaWYgKGlzVmFsaWRSZXNldE1vZGUobW9kZSkpIHtcbiAgICAgIHJldHVybiBtb2RlO1xuICAgfVxuXG4gICBzd2l0Y2ggKHR5cGVvZiBtb2RlKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgIHJldHVybiBSZXNldE1vZGUuU09GVDtcbiAgIH1cblxuICAgcmV0dXJuO1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkUmVzZXRNb2RlKG1vZGU6IFJlc2V0TW9kZSB8IHVua25vd24pOiBtb2RlIGlzIFJlc2V0TW9kZSB7XG4gICByZXR1cm4gdHlwZW9mIG1vZGUgPT09ICdzdHJpbmcnICYmIHZhbGlkUmVzZXRNb2Rlcy5pbmNsdWRlcyhtb2RlKTtcbn1cbiIsICJpbXBvcnQgZGVidWcsIHsgdHlwZSBEZWJ1Z2dlciB9IGZyb20gJ2RlYnVnJztcblxuaW1wb3J0IHR5cGUgeyBNYXliZSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtcbiAgIGFwcGVuZCxcbiAgIGZpbHRlckhhc0xlbmd0aCxcbiAgIGZpbHRlclN0cmluZyxcbiAgIGZpbHRlclR5cGUsXG4gICBOT09QLFxuICAgb2JqZWN0VG9TdHJpbmcsXG4gICByZW1vdmUsXG59IGZyb20gJy4vdXRpbHMnO1xuXG5kZWJ1Zy5mb3JtYXR0ZXJzLkwgPSAodmFsdWU6IGFueSkgPT4gU3RyaW5nKGZpbHRlckhhc0xlbmd0aCh2YWx1ZSkgPyB2YWx1ZS5sZW5ndGggOiAnLScpO1xuZGVidWcuZm9ybWF0dGVycy5CID0gKHZhbHVlOiBCdWZmZXIpID0+IHtcbiAgIGlmIChCdWZmZXIuaXNCdWZmZXIodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoJ3V0ZjgnKTtcbiAgIH1cbiAgIHJldHVybiBvYmplY3RUb1N0cmluZyh2YWx1ZSk7XG59O1xuXG50eXBlIE91dHB1dExvZ2dpbmdIYW5kbGVyID0gKG1lc3NhZ2U6IHN0cmluZywgLi4uYXJnczogYW55W10pID0+IHZvaWQ7XG5cbmZ1bmN0aW9uIGNyZWF0ZUxvZygpIHtcbiAgIHJldHVybiBkZWJ1Zygnc2ltcGxlLWdpdCcpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE91dHB1dExvZ2dlciBleHRlbmRzIE91dHB1dExvZ2dpbmdIYW5kbGVyIHtcbiAgIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmc7XG5cbiAgIGluZm86IE91dHB1dExvZ2dpbmdIYW5kbGVyO1xuICAgc3RlcChuZXh0U3RlcD86IHN0cmluZyk6IE91dHB1dExvZ2dlcjtcbiAgIHNpYmxpbmcobmFtZTogc3RyaW5nKTogT3V0cHV0TG9nZ2VyO1xufVxuXG5mdW5jdGlvbiBwcmVmaXhlZExvZ2dlcihcbiAgIHRvOiBEZWJ1Z2dlcixcbiAgIHByZWZpeDogc3RyaW5nLFxuICAgZm9yd2FyZD86IE91dHB1dExvZ2dpbmdIYW5kbGVyXG4pOiBPdXRwdXRMb2dnaW5nSGFuZGxlciB7XG4gICBpZiAoIXByZWZpeCB8fCAhU3RyaW5nKHByZWZpeCkucmVwbGFjZSgvXFxzKi8sICcnKSkge1xuICAgICAgcmV0dXJuICFmb3J3YXJkXG4gICAgICAgICA/IHRvXG4gICAgICAgICA6IChtZXNzYWdlLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAgIHRvKG1lc3NhZ2UsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgICBmb3J3YXJkKG1lc3NhZ2UsIC4uLmFyZ3MpO1xuICAgICAgICAgICB9O1xuICAgfVxuXG4gICByZXR1cm4gKG1lc3NhZ2UsIC4uLmFyZ3MpID0+IHtcbiAgICAgIHRvKGAlcyAke21lc3NhZ2V9YCwgcHJlZml4LCAuLi5hcmdzKTtcbiAgICAgIGlmIChmb3J3YXJkKSB7XG4gICAgICAgICBmb3J3YXJkKG1lc3NhZ2UsIC4uLmFyZ3MpO1xuICAgICAgfVxuICAgfTtcbn1cblxuZnVuY3Rpb24gY2hpbGRMb2dnZXJOYW1lKFxuICAgbmFtZTogTWF5YmU8c3RyaW5nPixcbiAgIGNoaWxkRGVidWdnZXI6IE1heWJlPERlYnVnZ2VyPixcbiAgIHsgbmFtZXNwYWNlOiBwYXJlbnROYW1lc3BhY2UgfTogRGVidWdnZXJcbik6IHN0cmluZyB7XG4gICBpZiAodHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gbmFtZTtcbiAgIH1cbiAgIGNvbnN0IGNoaWxkTmFtZXNwYWNlID0gKGNoaWxkRGVidWdnZXIgJiYgY2hpbGREZWJ1Z2dlci5uYW1lc3BhY2UpIHx8ICcnO1xuXG4gICBpZiAoY2hpbGROYW1lc3BhY2Uuc3RhcnRzV2l0aChwYXJlbnROYW1lc3BhY2UpKSB7XG4gICAgICByZXR1cm4gY2hpbGROYW1lc3BhY2Uuc3Vic3RyKHBhcmVudE5hbWVzcGFjZS5sZW5ndGggKyAxKTtcbiAgIH1cblxuICAgcmV0dXJuIGNoaWxkTmFtZXNwYWNlIHx8IHBhcmVudE5hbWVzcGFjZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxvZ2dlcihcbiAgIGxhYmVsOiBzdHJpbmcsXG4gICB2ZXJib3NlPzogc3RyaW5nIHwgRGVidWdnZXIsXG4gICBpbml0aWFsU3RlcD86IHN0cmluZyxcbiAgIGluZm9EZWJ1Z2dlciA9IGNyZWF0ZUxvZygpXG4pOiBPdXRwdXRMb2dnZXIge1xuICAgY29uc3QgbGFiZWxQcmVmaXggPSAobGFiZWwgJiYgYFske2xhYmVsfV1gKSB8fCAnJztcblxuICAgY29uc3Qgc3Bhd25lZDogT3V0cHV0TG9nZ2VyW10gPSBbXTtcbiAgIGNvbnN0IGRlYnVnRGVidWdnZXI6IE1heWJlPERlYnVnZ2VyPiA9XG4gICAgICB0eXBlb2YgdmVyYm9zZSA9PT0gJ3N0cmluZycgPyBpbmZvRGVidWdnZXIuZXh0ZW5kKHZlcmJvc2UpIDogdmVyYm9zZTtcbiAgIGNvbnN0IGtleSA9IGNoaWxkTG9nZ2VyTmFtZShmaWx0ZXJUeXBlKHZlcmJvc2UsIGZpbHRlclN0cmluZyksIGRlYnVnRGVidWdnZXIsIGluZm9EZWJ1Z2dlcik7XG5cbiAgIHJldHVybiBzdGVwKGluaXRpYWxTdGVwKTtcblxuICAgZnVuY3Rpb24gc2libGluZyhuYW1lOiBzdHJpbmcsIGluaXRpYWw/OiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiBhcHBlbmQoXG4gICAgICAgICBzcGF3bmVkLFxuICAgICAgICAgY3JlYXRlTG9nZ2VyKGxhYmVsLCBrZXkucmVwbGFjZSgvXlteOl0rLywgbmFtZSksIGluaXRpYWwsIGluZm9EZWJ1Z2dlcilcbiAgICAgICk7XG4gICB9XG5cbiAgIGZ1bmN0aW9uIHN0ZXAocGhhc2U/OiBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IHN0ZXBQcmVmaXggPSAocGhhc2UgJiYgYFske3BoYXNlfV1gKSB8fCAnJztcbiAgICAgIGNvbnN0IGRlYnVnID0gKGRlYnVnRGVidWdnZXIgJiYgcHJlZml4ZWRMb2dnZXIoZGVidWdEZWJ1Z2dlciwgc3RlcFByZWZpeCkpIHx8IE5PT1A7XG4gICAgICBjb25zdCBpbmZvID0gcHJlZml4ZWRMb2dnZXIoaW5mb0RlYnVnZ2VyLCBgJHtsYWJlbFByZWZpeH0gJHtzdGVwUHJlZml4fWAsIGRlYnVnKTtcblxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZGVidWdEZWJ1Z2dlciA/IGRlYnVnIDogaW5mbywge1xuICAgICAgICAgbGFiZWwsXG4gICAgICAgICBzaWJsaW5nLFxuICAgICAgICAgaW5mbyxcbiAgICAgICAgIHN0ZXAsXG4gICAgICB9KTtcbiAgIH1cbn1cblxuLyoqXG4gKiBUaGUgYEdpdExvZ2dlcmAgaXMgdXNlZCBieSB0aGUgbWFpbiBgU2ltcGxlR2l0YCBydW5uZXIgdG8gaGFuZGxlIGxvZ2dpbmdcbiAqIGFueSB3YXJuaW5ncyBvciBlcnJvcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBHaXRMb2dnZXIge1xuICAgcHVibGljIGVycm9yOiBPdXRwdXRMb2dnaW5nSGFuZGxlcjtcblxuICAgcHVibGljIHdhcm46IE91dHB1dExvZ2dpbmdIYW5kbGVyO1xuXG4gICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9vdXQ6IERlYnVnZ2VyID0gY3JlYXRlTG9nKCkpIHtcbiAgICAgIHRoaXMuZXJyb3IgPSBwcmVmaXhlZExvZ2dlcihfb3V0LCAnW0VSUk9SXScpO1xuICAgICAgdGhpcy53YXJuID0gcHJlZml4ZWRMb2dnZXIoX291dCwgJ1tXQVJOXScpO1xuICAgfVxuXG4gICBzaWxlbnQoc2lsZW5jZSA9IGZhbHNlKSB7XG4gICAgICBpZiAoc2lsZW5jZSAhPT0gdGhpcy5fb3V0LmVuYWJsZWQpIHtcbiAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBuYW1lc3BhY2UgfSA9IHRoaXMuX291dDtcbiAgICAgIGNvbnN0IGVudiA9IChwcm9jZXNzLmVudi5ERUJVRyB8fCAnJykuc3BsaXQoJywnKS5maWx0ZXIoKHMpID0+ICEhcyk7XG4gICAgICBjb25zdCBoYXNPbiA9IGVudi5pbmNsdWRlcyhuYW1lc3BhY2UpO1xuICAgICAgY29uc3QgaGFzT2ZmID0gZW52LmluY2x1ZGVzKGAtJHtuYW1lc3BhY2V9YCk7XG5cbiAgICAgIC8vIGVuYWJsaW5nIHRoZSBsb2dcbiAgICAgIGlmICghc2lsZW5jZSkge1xuICAgICAgICAgaWYgKGhhc09mZikge1xuICAgICAgICAgICAgcmVtb3ZlKGVudiwgYC0ke25hbWVzcGFjZX1gKTtcbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbnYucHVzaChuYW1lc3BhY2UpO1xuICAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIGlmIChoYXNPbikge1xuICAgICAgICAgICAgcmVtb3ZlKGVudiwgbmFtZXNwYWNlKTtcbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbnYucHVzaChgLSR7bmFtZXNwYWNlfWApO1xuICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkZWJ1Zy5lbmFibGUoZW52LmpvaW4oJywnKSk7XG4gICB9XG59XG4iLCAiaW1wb3J0IHsgR2l0RXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvZ2l0LWVycm9yJztcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciwgdHlwZSBPdXRwdXRMb2dnZXIgfSBmcm9tICcuLi9naXQtbG9nZ2VyJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0VGFzayB9IGZyb20gJy4uL3R5cGVzJztcblxudHlwZSBBbnlTaW1wbGVHaXRUYXNrID0gU2ltcGxlR2l0VGFzazxhbnk+O1xuXG50eXBlIFRhc2tJblByb2dyZXNzID0ge1xuICAgbmFtZTogc3RyaW5nO1xuICAgbG9nZ2VyOiBPdXRwdXRMb2dnZXI7XG4gICB0YXNrOiBBbnlTaW1wbGVHaXRUYXNrO1xufTtcblxuZXhwb3J0IGNsYXNzIFRhc2tzUGVuZGluZ1F1ZXVlIHtcbiAgIHByaXZhdGUgX3F1ZXVlOiBNYXA8QW55U2ltcGxlR2l0VGFzaywgVGFza0luUHJvZ3Jlc3M+ID0gbmV3IE1hcCgpO1xuXG4gICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvZ0xhYmVsID0gJ0dpdEV4ZWN1dG9yJykge31cblxuICAgcHJpdmF0ZSB3aXRoUHJvZ3Jlc3ModGFzazogQW55U2ltcGxlR2l0VGFzaykge1xuICAgICAgcmV0dXJuIHRoaXMuX3F1ZXVlLmdldCh0YXNrKTtcbiAgIH1cblxuICAgcHJpdmF0ZSBjcmVhdGVQcm9ncmVzcyh0YXNrOiBBbnlTaW1wbGVHaXRUYXNrKTogVGFza0luUHJvZ3Jlc3Mge1xuICAgICAgY29uc3QgbmFtZSA9IFRhc2tzUGVuZGluZ1F1ZXVlLmdldE5hbWUodGFzay5jb21tYW5kc1swXSk7XG4gICAgICBjb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIodGhpcy5sb2dMYWJlbCwgbmFtZSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgICB0YXNrLFxuICAgICAgICAgbG9nZ2VyLFxuICAgICAgICAgbmFtZSxcbiAgICAgIH07XG4gICB9XG5cbiAgIHB1c2godGFzazogQW55U2ltcGxlR2l0VGFzayk6IFRhc2tJblByb2dyZXNzIHtcbiAgICAgIGNvbnN0IHByb2dyZXNzID0gdGhpcy5jcmVhdGVQcm9ncmVzcyh0YXNrKTtcbiAgICAgIHByb2dyZXNzLmxvZ2dlcignQWRkaW5nIHRhc2sgdG8gdGhlIHF1ZXVlLCBjb21tYW5kcyA9ICVvJywgdGFzay5jb21tYW5kcyk7XG5cbiAgICAgIHRoaXMuX3F1ZXVlLnNldCh0YXNrLCBwcm9ncmVzcyk7XG5cbiAgICAgIHJldHVybiBwcm9ncmVzcztcbiAgIH1cblxuICAgZmF0YWwoZXJyOiBHaXRFcnJvcikge1xuICAgICAgZm9yIChjb25zdCBbdGFzaywgeyBsb2dnZXIgfV0gb2YgQXJyYXkuZnJvbSh0aGlzLl9xdWV1ZS5lbnRyaWVzKCkpKSB7XG4gICAgICAgICBpZiAodGFzayA9PT0gZXJyLnRhc2spIHtcbiAgICAgICAgICAgIGxvZ2dlci5pbmZvKGBGYWlsZWQgJW9gLCBlcnIpO1xuICAgICAgICAgICAgbG9nZ2VyKFxuICAgICAgICAgICAgICAgYEZhdGFsIGV4Y2VwdGlvbiwgYW55IGFzLXlldCB1bi1zdGFydGVkIHRhc2tzIHJ1biB0aHJvdWdoIHRoaXMgZXhlY3V0b3Igd2lsbCBub3QgYmUgYXR0ZW1wdGVkYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2dnZXIuaW5mbyhcbiAgICAgICAgICAgICAgIGBBIGZhdGFsIGV4Y2VwdGlvbiBvY2N1cnJlZCBpbiBhIHByZXZpb3VzIHRhc2ssIHRoZSBxdWV1ZSBoYXMgYmVlbiBwdXJnZWQ6ICVvYCxcbiAgICAgICAgICAgICAgIGVyci5tZXNzYWdlXG4gICAgICAgICAgICApO1xuICAgICAgICAgfVxuXG4gICAgICAgICB0aGlzLmNvbXBsZXRlKHRhc2spO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fcXVldWUuc2l6ZSAhPT0gMCkge1xuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBRdWV1ZSBzaXplIHNob3VsZCBiZSB6ZXJvIGFmdGVyIGZhdGFsOiAke3RoaXMuX3F1ZXVlLnNpemV9YCk7XG4gICAgICB9XG4gICB9XG5cbiAgIGNvbXBsZXRlKHRhc2s6IEFueVNpbXBsZUdpdFRhc2spIHtcbiAgICAgIGNvbnN0IHByb2dyZXNzID0gdGhpcy53aXRoUHJvZ3Jlc3ModGFzayk7XG4gICAgICBpZiAocHJvZ3Jlc3MpIHtcbiAgICAgICAgIHRoaXMuX3F1ZXVlLmRlbGV0ZSh0YXNrKTtcbiAgICAgIH1cbiAgIH1cblxuICAgYXR0ZW1wdCh0YXNrOiBBbnlTaW1wbGVHaXRUYXNrKTogVGFza0luUHJvZ3Jlc3Mge1xuICAgICAgY29uc3QgcHJvZ3Jlc3MgPSB0aGlzLndpdGhQcm9ncmVzcyh0YXNrKTtcbiAgICAgIGlmICghcHJvZ3Jlc3MpIHtcbiAgICAgICAgIHRocm93IG5ldyBHaXRFcnJvcih1bmRlZmluZWQsICdUYXNrc1BlbmRpbmdRdWV1ZTogYXR0ZW1wdCBjYWxsZWQgZm9yIGFuIHVua25vd24gdGFzaycpO1xuICAgICAgfVxuICAgICAgcHJvZ3Jlc3MubG9nZ2VyKCdTdGFydGluZyB0YXNrJyk7XG5cbiAgICAgIHJldHVybiBwcm9ncmVzcztcbiAgIH1cblxuICAgc3RhdGljIGdldE5hbWUobmFtZSA9ICdlbXB0eScpIHtcbiAgICAgIHJldHVybiBgdGFzazoke25hbWV9OiR7KytUYXNrc1BlbmRpbmdRdWV1ZS5jb3VudGVyfWA7XG4gICB9XG5cbiAgIHByaXZhdGUgc3RhdGljIGNvdW50ZXIgPSAwO1xufVxuIiwgImltcG9ydCB7IHR5cGUgU3Bhd25PcHRpb25zLCBzcGF3biB9IGZyb20gJ25vZGU6Y2hpbGRfcHJvY2Vzcyc7XG5cbmltcG9ydCB7IEdpdEVycm9yIH0gZnJvbSAnLi4vZXJyb3JzL2dpdC1lcnJvcic7XG5pbXBvcnQgdHlwZSB7IE91dHB1dExvZ2dlciB9IGZyb20gJy4uL2dpdC1sb2dnZXInO1xuaW1wb3J0IHR5cGUgeyBQbHVnaW5TdG9yZSwgU2ltcGxlR2l0VGFza1BsdWdpbkNvbnRleHQgfSBmcm9tICcuLi9wbHVnaW5zJztcbmltcG9ydCB7IHR5cGUgRW1wdHlUYXNrLCBpc0J1ZmZlclRhc2ssIGlzRW1wdHlUYXNrIH0gZnJvbSAnLi4vdGFza3MvdGFzayc7XG5pbXBvcnQgdHlwZSB7XG4gICBHaXRFeGVjdXRvclJlc3VsdCxcbiAgIE1heWJlLFxuICAgb3V0cHV0SGFuZGxlcixcbiAgIFJ1bm5hYmxlVGFzayxcbiAgIFNpbXBsZUdpdEV4ZWN1dG9yLFxuICAgU2ltcGxlR2l0VGFzayxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgY2FsbFRhc2tQYXJzZXIsIGZpcnN0LCBHaXRPdXRwdXRTdHJlYW1zLCBvYmplY3RUb1N0cmluZyB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB0eXBlIHsgU2NoZWR1bGVyIH0gZnJvbSAnLi9zY2hlZHVsZXInO1xuaW1wb3J0IHsgVGFza3NQZW5kaW5nUXVldWUgfSBmcm9tICcuL3Rhc2tzLXBlbmRpbmctcXVldWUnO1xuXG5leHBvcnQgY2xhc3MgR2l0RXhlY3V0b3JDaGFpbiBpbXBsZW1lbnRzIFNpbXBsZUdpdEV4ZWN1dG9yIHtcbiAgIHByaXZhdGUgX2NoYWluOiBQcm9taXNlPGFueT4gPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgIHByaXZhdGUgX3F1ZXVlID0gbmV3IFRhc2tzUGVuZGluZ1F1ZXVlKCk7XG4gICBwcml2YXRlIF9jd2Q6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgcHVibGljIGdldCBjd2QoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY3dkIHx8IHRoaXMuX2V4ZWN1dG9yLmN3ZDtcbiAgIH1cblxuICAgcHVibGljIHNldCBjd2QoY3dkOiBzdHJpbmcpIHtcbiAgICAgIHRoaXMuX2N3ZCA9IGN3ZDtcbiAgIH1cblxuICAgcHVibGljIGdldCBlbnYoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZXhlY3V0b3IuZW52O1xuICAgfVxuXG4gICBwdWJsaWMgZ2V0IG91dHB1dEhhbmRsZXIoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZXhlY3V0b3Iub3V0cHV0SGFuZGxlcjtcbiAgIH1cblxuICAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9leGVjdXRvcjogU2ltcGxlR2l0RXhlY3V0b3IsXG4gICAgICBwcml2YXRlIF9zY2hlZHVsZXI6IFNjaGVkdWxlcixcbiAgICAgIHByaXZhdGUgX3BsdWdpbnM6IFBsdWdpblN0b3JlXG4gICApIHt9XG5cbiAgIHB1YmxpYyBjaGFpbigpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgfVxuXG4gICBwdWJsaWMgcHVzaDxSPih0YXNrOiBTaW1wbGVHaXRUYXNrPFI+KTogUHJvbWlzZTxSPiB7XG4gICAgICB0aGlzLl9xdWV1ZS5wdXNoKHRhc2spO1xuXG4gICAgICByZXR1cm4gKHRoaXMuX2NoYWluID0gdGhpcy5fY2hhaW4udGhlbigoKSA9PiB0aGlzLmF0dGVtcHRUYXNrKHRhc2spKSk7XG4gICB9XG5cbiAgIHByaXZhdGUgYXN5bmMgYXR0ZW1wdFRhc2s8Uj4odGFzazogU2ltcGxlR2l0VGFzazxSPik6IFByb21pc2U8dm9pZCB8IFI+IHtcbiAgICAgIGNvbnN0IG9uU2NoZWR1bGVDb21wbGV0ZSA9IGF3YWl0IHRoaXMuX3NjaGVkdWxlci5uZXh0KCk7XG4gICAgICBjb25zdCBvblF1ZXVlQ29tcGxldGUgPSAoKSA9PiB0aGlzLl9xdWV1ZS5jb21wbGV0ZSh0YXNrKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgIGNvbnN0IHsgbG9nZ2VyIH0gPSB0aGlzLl9xdWV1ZS5hdHRlbXB0KHRhc2spO1xuICAgICAgICAgcmV0dXJuIChhd2FpdCAoaXNFbXB0eVRhc2sodGFzaylcbiAgICAgICAgICAgID8gdGhpcy5hdHRlbXB0RW1wdHlUYXNrKHRhc2ssIGxvZ2dlcilcbiAgICAgICAgICAgIDogdGhpcy5hdHRlbXB0UmVtb3RlVGFzayh0YXNrLCBsb2dnZXIpKSkgYXMgUjtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgIHRocm93IHRoaXMub25GYXRhbEV4Y2VwdGlvbih0YXNrLCBlIGFzIEVycm9yKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICBvblF1ZXVlQ29tcGxldGUoKTtcbiAgICAgICAgIG9uU2NoZWR1bGVDb21wbGV0ZSgpO1xuICAgICAgfVxuICAgfVxuXG4gICBwcml2YXRlIG9uRmF0YWxFeGNlcHRpb248Uj4odGFzazogU2ltcGxlR2l0VGFzazxSPiwgZTogRXJyb3IpIHtcbiAgICAgIGNvbnN0IGdpdEVycm9yID1cbiAgICAgICAgIGUgaW5zdGFuY2VvZiBHaXRFcnJvciA/IE9iamVjdC5hc3NpZ24oZSwgeyB0YXNrIH0pIDogbmV3IEdpdEVycm9yKHRhc2ssIGUgJiYgU3RyaW5nKGUpKTtcblxuICAgICAgdGhpcy5fY2hhaW4gPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIHRoaXMuX3F1ZXVlLmZhdGFsKGdpdEVycm9yKTtcblxuICAgICAgcmV0dXJuIGdpdEVycm9yO1xuICAgfVxuXG4gICBwcml2YXRlIGFzeW5jIGF0dGVtcHRSZW1vdGVUYXNrPFI+KHRhc2s6IFJ1bm5hYmxlVGFzazxSPiwgbG9nZ2VyOiBPdXRwdXRMb2dnZXIpIHtcbiAgICAgIGNvbnN0IGJpbmFyeSA9IHRoaXMuX3BsdWdpbnMuZXhlYygnc3Bhd24uYmluYXJ5JywgJycsIHRoaXMudGFza0NvbnRleHQodGFzaywgdGFzay5jb21tYW5kcykpO1xuICAgICAgY29uc3QgYXJncyA9IHRoaXMuX3BsdWdpbnMuZXhlYyhcbiAgICAgICAgICdzcGF3bi5hcmdzJyxcbiAgICAgICAgIFsuLi50YXNrLmNvbW1hbmRzXSxcbiAgICAgICAgIHRoaXMudGFza0NvbnRleHQodGFzaywgdGFzay5jb21tYW5kcylcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHJhdyA9IGF3YWl0IHRoaXMuZ2l0UmVzcG9uc2UoXG4gICAgICAgICB0YXNrLFxuICAgICAgICAgYmluYXJ5LFxuICAgICAgICAgYXJncyxcbiAgICAgICAgIHRoaXMub3V0cHV0SGFuZGxlcixcbiAgICAgICAgIGxvZ2dlci5zdGVwKCdTUEFXTicpXG4gICAgICApO1xuICAgICAgY29uc3Qgb3V0cHV0U3RyZWFtcyA9IGF3YWl0IHRoaXMuaGFuZGxlVGFza0RhdGEodGFzaywgYXJncywgcmF3LCBsb2dnZXIuc3RlcCgnSEFORExFJykpO1xuXG4gICAgICBsb2dnZXIoYHBhc3NpbmcgcmVzcG9uc2UgdG8gdGFzaydzIHBhcnNlciBhcyBhICVzYCwgdGFzay5mb3JtYXQpO1xuXG4gICAgICBpZiAoaXNCdWZmZXJUYXNrKHRhc2spKSB7XG4gICAgICAgICByZXR1cm4gY2FsbFRhc2tQYXJzZXIodGFzay5wYXJzZXIsIG91dHB1dFN0cmVhbXMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2FsbFRhc2tQYXJzZXIodGFzay5wYXJzZXIsIG91dHB1dFN0cmVhbXMuYXNTdHJpbmdzKCkpO1xuICAgfVxuXG4gICBwcml2YXRlIGFzeW5jIGF0dGVtcHRFbXB0eVRhc2sodGFzazogRW1wdHlUYXNrLCBsb2dnZXI6IE91dHB1dExvZ2dlcikge1xuICAgICAgbG9nZ2VyKGBlbXB0eSB0YXNrIGJ5cGFzc2luZyBjaGlsZCBwcm9jZXNzIHRvIGNhbGwgdG8gdGFzaydzIHBhcnNlcmApO1xuICAgICAgcmV0dXJuIHRhc2sucGFyc2VyKHRoaXMpO1xuICAgfVxuXG4gICBwcml2YXRlIGhhbmRsZVRhc2tEYXRhPFI+KFxuICAgICAgdGFzazogU2ltcGxlR2l0VGFzazxSPixcbiAgICAgIGFyZ3M6IHN0cmluZ1tdLFxuICAgICAgcmVzdWx0OiBHaXRFeGVjdXRvclJlc3VsdCxcbiAgICAgIGxvZ2dlcjogT3V0cHV0TG9nZ2VyXG4gICApOiBQcm9taXNlPEdpdE91dHB1dFN0cmVhbXM+IHtcbiAgICAgIGNvbnN0IHsgZXhpdENvZGUsIHJlamVjdGlvbiwgc3RkT3V0LCBzdGRFcnIgfSA9IHJlc3VsdDtcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChkb25lLCBmYWlsKSA9PiB7XG4gICAgICAgICBsb2dnZXIoYFByZXBhcmluZyB0byBoYW5kbGUgcHJvY2VzcyByZXNwb25zZSBleGl0Q29kZT0lZCBzdGRPdXQ9YCwgZXhpdENvZGUpO1xuXG4gICAgICAgICBjb25zdCB7IGVycm9yIH0gPSB0aGlzLl9wbHVnaW5zLmV4ZWMoXG4gICAgICAgICAgICAndGFzay5lcnJvcicsXG4gICAgICAgICAgICB7IGVycm9yOiByZWplY3Rpb24gfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIC4uLnRoaXMudGFza0NvbnRleHQodGFzaywgYXJncyksXG4gICAgICAgICAgICAgICAuLi5yZXN1bHQsXG4gICAgICAgICAgICB9XG4gICAgICAgICApO1xuXG4gICAgICAgICBpZiAoZXJyb3IgJiYgdGFzay5vbkVycm9yKSB7XG4gICAgICAgICAgICBsb2dnZXIuaW5mbyhgZXhpdENvZGU9JXMgaGFuZGxpbmcgd2l0aCBjdXN0b20gZXJyb3IgaGFuZGxlcmApO1xuXG4gICAgICAgICAgICByZXR1cm4gdGFzay5vbkVycm9yKFxuICAgICAgICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICAgICAobmV3U3RkT3V0KSA9PiB7XG4gICAgICAgICAgICAgICAgICBsb2dnZXIuaW5mbyhgY3VzdG9tIGVycm9yIGhhbmRsZXIgdHJlYXRlZCBhcyBzdWNjZXNzYCk7XG4gICAgICAgICAgICAgICAgICBsb2dnZXIoYGN1c3RvbSBlcnJvciByZXR1cm5lZCBhICVzYCwgb2JqZWN0VG9TdHJpbmcobmV3U3RkT3V0KSk7XG5cbiAgICAgICAgICAgICAgICAgIGRvbmUoXG4gICAgICAgICAgICAgICAgICAgICBuZXcgR2l0T3V0cHV0U3RyZWFtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkobmV3U3RkT3V0KSA/IEJ1ZmZlci5jb25jYXQobmV3U3RkT3V0KSA6IG5ld1N0ZE91dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIEJ1ZmZlci5jb25jYXQoc3RkRXJyKVxuICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICBmYWlsXG4gICAgICAgICAgICApO1xuICAgICAgICAgfVxuXG4gICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGxvZ2dlci5pbmZvKFxuICAgICAgICAgICAgICAgYGhhbmRsaW5nIGFzIGVycm9yOiBleGl0Q29kZT0lcyBzdGRFcnI9JXMgcmVqZWN0aW9uPSVvYCxcbiAgICAgICAgICAgICAgIGV4aXRDb2RlLFxuICAgICAgICAgICAgICAgc3RkRXJyLmxlbmd0aCxcbiAgICAgICAgICAgICAgIHJlamVjdGlvblxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBmYWlsKGVycm9yKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgbG9nZ2VyLmluZm8oYHJldHJpZXZpbmcgdGFzayBvdXRwdXQgY29tcGxldGVgKTtcbiAgICAgICAgIGRvbmUobmV3IEdpdE91dHB1dFN0cmVhbXMoQnVmZmVyLmNvbmNhdChzdGRPdXQpLCBCdWZmZXIuY29uY2F0KHN0ZEVycikpKTtcbiAgICAgIH0pO1xuICAgfVxuXG4gICBwcml2YXRlIGFzeW5jIGdpdFJlc3BvbnNlPFI+KFxuICAgICAgdGFzazogU2ltcGxlR2l0VGFzazxSPixcbiAgICAgIGNvbW1hbmQ6IHN0cmluZyxcbiAgICAgIGFyZ3M6IHN0cmluZ1tdLFxuICAgICAgb3V0cHV0SGFuZGxlcjogTWF5YmU8b3V0cHV0SGFuZGxlcj4sXG4gICAgICBsb2dnZXI6IE91dHB1dExvZ2dlclxuICAgKTogUHJvbWlzZTxHaXRFeGVjdXRvclJlc3VsdD4ge1xuICAgICAgY29uc3Qgb3V0cHV0TG9nZ2VyID0gbG9nZ2VyLnNpYmxpbmcoJ291dHB1dCcpO1xuICAgICAgY29uc3Qgc3Bhd25PcHRpb25zOiBTcGF3bk9wdGlvbnMgPSB0aGlzLl9wbHVnaW5zLmV4ZWMoXG4gICAgICAgICAnc3Bhd24ub3B0aW9ucycsXG4gICAgICAgICB7XG4gICAgICAgICAgICBjd2Q6IHRoaXMuY3dkLFxuICAgICAgICAgICAgZW52OiB0aGlzLmVudixcbiAgICAgICAgICAgIHdpbmRvd3NIaWRlOiB0cnVlLFxuICAgICAgICAgfSxcbiAgICAgICAgIHRoaXMudGFza0NvbnRleHQodGFzaywgdGFzay5jb21tYW5kcylcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZG9uZSkgPT4ge1xuICAgICAgICAgY29uc3Qgc3RkT3V0OiBCdWZmZXJbXSA9IFtdO1xuICAgICAgICAgY29uc3Qgc3RkRXJyOiBCdWZmZXJbXSA9IFtdO1xuXG4gICAgICAgICBsb2dnZXIuaW5mbyhgJXMgJW9gLCBjb21tYW5kLCBhcmdzKTtcbiAgICAgICAgIGxvZ2dlcignJU8nLCBzcGF3bk9wdGlvbnMpO1xuXG4gICAgICAgICBsZXQgcmVqZWN0aW9uID0gdGhpcy5fYmVmb3JlU3Bhd24odGFzaywgYXJncyk7XG4gICAgICAgICBpZiAocmVqZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9uZSh7XG4gICAgICAgICAgICAgICBzdGRPdXQsXG4gICAgICAgICAgICAgICBzdGRFcnIsXG4gICAgICAgICAgICAgICBleGl0Q29kZTogOTkwMSxcbiAgICAgICAgICAgICAgIHJlamVjdGlvbixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgfVxuXG4gICAgICAgICB0aGlzLl9wbHVnaW5zLmV4ZWMoJ3NwYXduLmJlZm9yZScsIHVuZGVmaW5lZCwge1xuICAgICAgICAgICAgLi4udGhpcy50YXNrQ29udGV4dCh0YXNrLCBhcmdzKSxcbiAgICAgICAgICAgIGtpbGwocmVhc29uKSB7XG4gICAgICAgICAgICAgICByZWplY3Rpb24gPSByZWFzb24gfHwgcmVqZWN0aW9uO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgIH0pO1xuXG4gICAgICAgICBjb25zdCBzcGF3bmVkID0gc3Bhd24oY29tbWFuZCwgYXJncywgc3Bhd25PcHRpb25zKTtcblxuICAgICAgICAgc3Bhd25lZC5zdGRvdXQhLm9uKFxuICAgICAgICAgICAgJ2RhdGEnLFxuICAgICAgICAgICAgb25EYXRhUmVjZWl2ZWQoc3RkT3V0LCAnc3RkT3V0JywgbG9nZ2VyLCBvdXRwdXRMb2dnZXIuc3RlcCgnc3RkT3V0JykpXG4gICAgICAgICApO1xuICAgICAgICAgc3Bhd25lZC5zdGRlcnIhLm9uKFxuICAgICAgICAgICAgJ2RhdGEnLFxuICAgICAgICAgICAgb25EYXRhUmVjZWl2ZWQoc3RkRXJyLCAnc3RkRXJyJywgbG9nZ2VyLCBvdXRwdXRMb2dnZXIuc3RlcCgnc3RkRXJyJykpXG4gICAgICAgICApO1xuXG4gICAgICAgICBzcGF3bmVkLm9uKCdlcnJvcicsIG9uRXJyb3JSZWNlaXZlZChzdGRFcnIsIGxvZ2dlcikpO1xuXG4gICAgICAgICBpZiAob3V0cHV0SGFuZGxlcikge1xuICAgICAgICAgICAgbG9nZ2VyKGBQYXNzaW5nIGNoaWxkIHByb2Nlc3Mgc3RkT3V0L3N0ZEVyciB0byBjdXN0b20gb3V0cHV0SGFuZGxlcmApO1xuICAgICAgICAgICAgb3V0cHV0SGFuZGxlcihjb21tYW5kLCBzcGF3bmVkLnN0ZG91dCEsIHNwYXduZWQuc3RkZXJyISwgWy4uLmFyZ3NdKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgdGhpcy5fcGx1Z2lucy5leGVjKCdzcGF3bi5hZnRlcicsIHVuZGVmaW5lZCwge1xuICAgICAgICAgICAgLi4udGhpcy50YXNrQ29udGV4dCh0YXNrLCBhcmdzKSxcbiAgICAgICAgICAgIHNwYXduZWQsXG4gICAgICAgICAgICBjbG9zZShleGl0Q29kZTogbnVtYmVyLCByZWFzb24/OiBFcnJvcikge1xuICAgICAgICAgICAgICAgZG9uZSh7XG4gICAgICAgICAgICAgICAgICBzdGRPdXQsXG4gICAgICAgICAgICAgICAgICBzdGRFcnIsXG4gICAgICAgICAgICAgICAgICBleGl0Q29kZSxcbiAgICAgICAgICAgICAgICAgIHJlamVjdGlvbjogcmVqZWN0aW9uIHx8IHJlYXNvbixcbiAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGtpbGwocmVhc29uOiBFcnJvcikge1xuICAgICAgICAgICAgICAgaWYgKHNwYXduZWQua2lsbGVkKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgIHJlamVjdGlvbiA9IHJlYXNvbjtcbiAgICAgICAgICAgICAgIHNwYXduZWQua2lsbCgnU0lHSU5UJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgIH1cblxuICAgcHJpdmF0ZSBfYmVmb3JlU3Bhd248Uj4odGFzazogU2ltcGxlR2l0VGFzazxSPiwgYXJnczogc3RyaW5nW10pIHtcbiAgICAgIGxldCByZWplY3Rpb246IE1heWJlPEVycm9yPjtcbiAgICAgIHRoaXMuX3BsdWdpbnMuZXhlYygnc3Bhd24uYmVmb3JlJywgdW5kZWZpbmVkLCB7XG4gICAgICAgICAuLi50aGlzLnRhc2tDb250ZXh0KHRhc2ssIGFyZ3MpLFxuICAgICAgICAga2lsbChyZWFzb24pIHtcbiAgICAgICAgICAgIHJlamVjdGlvbiA9IHJlYXNvbiB8fCByZWplY3Rpb247XG4gICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZWplY3Rpb247XG4gICB9XG5cbiAgIHByaXZhdGUgdGFza0NvbnRleHQ8Uj4odGFzazogU2ltcGxlR2l0VGFzazxSPiwgY29tbWFuZHM6IHN0cmluZ1tdKTogU2ltcGxlR2l0VGFza1BsdWdpbkNvbnRleHQge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgIG1ldGhvZDogU3RyaW5nKGZpcnN0KHRhc2suY29tbWFuZHMpIHx8ICcnKSxcbiAgICAgICAgIGNvbW1hbmRzLFxuICAgICAgICAgZW52OiB7IC4uLnRoaXMuZW52IH0sXG4gICAgICAgICBpbnB1dDogaXNFbXB0eVRhc2sodGFzaykgPyB1bmRlZmluZWQgOiB0YXNrLmlucHV0LFxuICAgICAgfTtcbiAgIH1cbn1cblxuZnVuY3Rpb24gb25FcnJvclJlY2VpdmVkKHRhcmdldDogQnVmZmVyW10sIGxvZ2dlcjogT3V0cHV0TG9nZ2VyKSB7XG4gICByZXR1cm4gKGVycjogRXJyb3IpID0+IHtcbiAgICAgIGxvZ2dlcihgW0VSUk9SXSBjaGlsZCBwcm9jZXNzIGV4Y2VwdGlvbiAlb2AsIGVycik7XG4gICAgICB0YXJnZXQucHVzaChCdWZmZXIuZnJvbShTdHJpbmcoZXJyLnN0YWNrKSwgJ2FzY2lpJykpO1xuICAgfTtcbn1cblxuZnVuY3Rpb24gb25EYXRhUmVjZWl2ZWQoXG4gICB0YXJnZXQ6IEJ1ZmZlcltdLFxuICAgbmFtZTogc3RyaW5nLFxuICAgbG9nZ2VyOiBPdXRwdXRMb2dnZXIsXG4gICBvdXRwdXQ6IE91dHB1dExvZ2dlclxuKSB7XG4gICByZXR1cm4gKGJ1ZmZlcjogQnVmZmVyKSA9PiB7XG4gICAgICBsb2dnZXIoYCVzIHJlY2VpdmVkICVMIGJ5dGVzYCwgbmFtZSwgYnVmZmVyKTtcbiAgICAgIG91dHB1dChgJUJgLCBidWZmZXIpO1xuICAgICAgdGFyZ2V0LnB1c2goYnVmZmVyKTtcbiAgIH07XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBQbHVnaW5TdG9yZSB9IGZyb20gJy4uL3BsdWdpbnMnO1xuaW1wb3J0IHR5cGUgeyBHaXRFeGVjdXRvckVudiwgb3V0cHV0SGFuZGxlciwgU2ltcGxlR2l0RXhlY3V0b3IsIFNpbXBsZUdpdFRhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBHaXRFeGVjdXRvckNoYWluIH0gZnJvbSAnLi9naXQtZXhlY3V0b3ItY2hhaW4nO1xuaW1wb3J0IHR5cGUgeyBTY2hlZHVsZXIgfSBmcm9tICcuL3NjaGVkdWxlcic7XG5cbmV4cG9ydCBjbGFzcyBHaXRFeGVjdXRvciBpbXBsZW1lbnRzIFNpbXBsZUdpdEV4ZWN1dG9yIHtcbiAgIHByaXZhdGUgX2NoYWluOiBTaW1wbGVHaXRFeGVjdXRvcjtcblxuICAgcHVibGljIGVudjogR2l0RXhlY3V0b3JFbnY7XG4gICBwdWJsaWMgb3V0cHV0SGFuZGxlcj86IG91dHB1dEhhbmRsZXI7XG5cbiAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGN3ZDogc3RyaW5nLFxuICAgICAgcHJpdmF0ZSBfc2NoZWR1bGVyOiBTY2hlZHVsZXIsXG4gICAgICBwcml2YXRlIF9wbHVnaW5zOiBQbHVnaW5TdG9yZVxuICAgKSB7XG4gICAgICB0aGlzLl9jaGFpbiA9IHRoaXMuY2hhaW4oKTtcbiAgIH1cblxuICAgY2hhaW4oKTogU2ltcGxlR2l0RXhlY3V0b3Ige1xuICAgICAgcmV0dXJuIG5ldyBHaXRFeGVjdXRvckNoYWluKHRoaXMsIHRoaXMuX3NjaGVkdWxlciwgdGhpcy5fcGx1Z2lucyk7XG4gICB9XG5cbiAgIHB1c2g8Uj4odGFzazogU2ltcGxlR2l0VGFzazxSPik6IFByb21pc2U8Uj4ge1xuICAgICAgcmV0dXJuIHRoaXMuX2NoYWluLnB1c2godGFzayk7XG4gICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBHaXRFcnJvciB9IGZyb20gJy4vZXJyb3JzL2dpdC1lcnJvcic7XG5pbXBvcnQgdHlwZSB7IEdpdFJlc3BvbnNlRXJyb3IgfSBmcm9tICcuL2Vycm9ycy9naXQtcmVzcG9uc2UtZXJyb3InO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRUYXNrLCBTaW1wbGVHaXRUYXNrQ2FsbGJhY2sgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IE5PT1AgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRhc2tDYWxsYmFjazxSPihcbiAgIHRhc2s6IFNpbXBsZUdpdFRhc2s8Uj4sXG4gICByZXNwb25zZTogUHJvbWlzZTxSPixcbiAgIGNhbGxiYWNrOiBTaW1wbGVHaXRUYXNrQ2FsbGJhY2s8Uj4gPSBOT09QXG4pIHtcbiAgIGNvbnN0IG9uU3VjY2VzcyA9IChkYXRhOiBSKSA9PiB7XG4gICAgICBjYWxsYmFjayhudWxsLCBkYXRhKTtcbiAgIH07XG5cbiAgIGNvbnN0IG9uRXJyb3IgPSAoZXJyOiBHaXRFcnJvciB8IEdpdFJlc3BvbnNlRXJyb3IpID0+IHtcbiAgICAgIGlmIChlcnI/LnRhc2sgPT09IHRhc2spIHtcbiAgICAgICAgIGNhbGxiYWNrKGVyciwgdW5kZWZpbmVkIGFzIGFueSk7XG4gICAgICB9XG4gICB9O1xuXG4gICByZXNwb25zZS50aGVuKG9uU3VjY2Vzcywgb25FcnJvcik7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRFeGVjdXRvciB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGZvbGRlckV4aXN0cyB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IGFkaG9jRXhlY1Rhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlV29ya2luZ0RpcmVjdG9yeVRhc2soZGlyZWN0b3J5OiBzdHJpbmcsIHJvb3Q/OiBTaW1wbGVHaXRFeGVjdXRvcikge1xuICAgcmV0dXJuIGFkaG9jRXhlY1Rhc2soKGluc3RhbmNlOiBTaW1wbGVHaXRFeGVjdXRvcikgPT4ge1xuICAgICAgaWYgKCFmb2xkZXJFeGlzdHMoZGlyZWN0b3J5KSkge1xuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBHaXQuY3dkOiBjYW5ub3QgY2hhbmdlIHRvIG5vbi1kaXJlY3RvcnkgXCIke2RpcmVjdG9yeX1cImApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKChyb290IHx8IGluc3RhbmNlKS5jd2QgPSBkaXJlY3RvcnkpO1xuICAgfSk7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0QXBpIH0gZnJvbSAnLi4vc2ltcGxlLWdpdC1hcGknO1xuaW1wb3J0IHsgZ2V0VHJhaWxpbmdPcHRpb25zLCByZW1vdmUsIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5mdW5jdGlvbiBjaGVja291dFRhc2soYXJnczogc3RyaW5nW10pIHtcbiAgIGNvbnN0IGNvbW1hbmRzID0gWydjaGVja291dCcsIC4uLmFyZ3NdO1xuICAgaWYgKGNvbW1hbmRzWzFdID09PSAnLWInICYmIGNvbW1hbmRzLmluY2x1ZGVzKCctQicpKSB7XG4gICAgICBjb21tYW5kc1sxXSA9IHJlbW92ZShjb21tYW5kcywgJy1CJyk7XG4gICB9XG5cbiAgIHJldHVybiBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKGNvbW1hbmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCk6IFBpY2s8U2ltcGxlR2l0LCAnY2hlY2tvdXQnIHwgJ2NoZWNrb3V0QnJhbmNoJyB8ICdjaGVja291dExvY2FsQnJhbmNoJz4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGNoZWNrb3V0KHRoaXM6IFNpbXBsZUdpdEFwaSkge1xuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICAgICBjaGVja291dFRhc2soZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cywgMSkpLFxuICAgICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICAgICAgICk7XG4gICAgICB9LFxuXG4gICAgICBjaGVja291dEJyYW5jaCh0aGlzOiBTaW1wbGVHaXRBcGksIGJyYW5jaE5hbWUsIHN0YXJ0UG9pbnQpIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgY2hlY2tvdXRUYXNrKFsnLWInLCBicmFuY2hOYW1lLCBzdGFydFBvaW50LCAuLi5nZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKV0pLFxuICAgICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICAgICAgICk7XG4gICAgICB9LFxuXG4gICAgICBjaGVja291dExvY2FsQnJhbmNoKHRoaXM6IFNpbXBsZUdpdEFwaSwgYnJhbmNoTmFtZSkge1xuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICAgICBjaGVja291dFRhc2soWyctYicsIGJyYW5jaE5hbWUsIC4uLmdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpXSksXG4gICAgICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgICAgKTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB7IHBhdGhzcGVjIH0gZnJvbSAnQHNpbXBsZS1naXQvYXJncy1wYXRoc3BlYyc7XG5cbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdEFwaSB9IGZyb20gJy4uL3NpbXBsZS1naXQtYXBpJztcbmltcG9ydCB0eXBlIHsgT3B0aW9uRmxhZ3MsIE9wdGlvbnMsIFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQge1xuICAgYXBwZW5kLFxuICAgZmlsdGVyU3RyaW5nLFxuICAgZmlsdGVyVHlwZSxcbiAgIGdldFRyYWlsaW5nT3B0aW9ucyxcbiAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudCxcbn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgY29uZmlndXJhdGlvbkVycm9yVGFzaywgdHlwZSBFbXB0eVRhc2ssIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5leHBvcnQgdHlwZSBDbG9uZU9wdGlvbnMgPSBPcHRpb25zICZcbiAgIE9wdGlvbkZsYWdzPFxuICAgICAgfCAnLS1iYXJlJ1xuICAgICAgfCAnLS1kaXNzb2NpYXRlJ1xuICAgICAgfCAnLS1taXJyb3InXG4gICAgICB8ICctLW5vLWNoZWNrb3V0J1xuICAgICAgfCAnLS1uby1yZW1vdGUtc3VibW9kdWxlcydcbiAgICAgIHwgJy0tbm8tc2hhbGxvdy1zdWJtb2R1bGVzJ1xuICAgICAgfCAnLS1uby1zaW5nbGUtYnJhbmNoJ1xuICAgICAgfCAnLS1uby10YWdzJ1xuICAgICAgfCAnLS1yZW1vdGUtc3VibW9kdWxlcydcbiAgICAgIHwgJy0tc2luZ2xlLWJyYW5jaCdcbiAgICAgIHwgJy0tc2hhbGxvdy1zdWJtb2R1bGVzJ1xuICAgICAgfCAnLS12ZXJib3NlJ1xuICAgPiAmXG4gICBPcHRpb25GbGFnczwnLS1kZXB0aCcgfCAnLWonIHwgJy0tam9icycsIG51bWJlcj4gJlxuICAgT3B0aW9uRmxhZ3M8XG4gICAgICB8ICctLWJyYW5jaCdcbiAgICAgIHwgJy0tb3JpZ2luJ1xuICAgICAgfCAnLS1yZWN1cnNlLXN1Ym1vZHVsZXMnXG4gICAgICB8ICctLXNlcGFyYXRlLWdpdC1kaXInXG4gICAgICB8ICctLXNoYWxsb3ctZXhjbHVkZSdcbiAgICAgIHwgJy0tc2hhbGxvdy1zaW5jZSdcbiAgICAgIHwgJy0tdGVtcGxhdGUnLFxuICAgICAgc3RyaW5nXG4gICA+O1xuXG50eXBlIENsb25lVGFza0J1aWxkZXIgPSAoXG4gICByZXBvOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICBkaXJlY3Rvcnk6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgIGN1c3RvbUFyZ3M6IHN0cmluZ1tdXG4pID0+IFN0cmluZ1Rhc2s8c3RyaW5nPiB8IEVtcHR5VGFzaztcblxuZXhwb3J0IGNvbnN0IGNsb25lVGFzazogQ2xvbmVUYXNrQnVpbGRlciA9IChyZXBvLCBkaXJlY3RvcnksIGN1c3RvbUFyZ3MpID0+IHtcbiAgIGNvbnN0IGNvbW1hbmRzID0gWydjbG9uZScsIC4uLmN1c3RvbUFyZ3NdO1xuXG4gICBmaWx0ZXJTdHJpbmcocmVwbykgJiYgY29tbWFuZHMucHVzaChwYXRoc3BlYyhyZXBvKSk7XG4gICBmaWx0ZXJTdHJpbmcoZGlyZWN0b3J5KSAmJiBjb21tYW5kcy5wdXNoKHBhdGhzcGVjKGRpcmVjdG9yeSkpO1xuXG4gICByZXR1cm4gc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhjb21tYW5kcyk7XG59O1xuXG5leHBvcnQgY29uc3QgY2xvbmVNaXJyb3JUYXNrOiBDbG9uZVRhc2tCdWlsZGVyID0gKHJlcG8sIGRpcmVjdG9yeSwgY3VzdG9tQXJncykgPT4ge1xuICAgYXBwZW5kKGN1c3RvbUFyZ3MsICctLW1pcnJvcicpO1xuXG4gICByZXR1cm4gY2xvbmVUYXNrKHJlcG8sIGRpcmVjdG9yeSwgY3VzdG9tQXJncyk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVDbG9uZVRhc2soXG4gICBhcGk6ICdjbG9uZScgfCAnbWlycm9yJyxcbiAgIHRhc2s6IENsb25lVGFza0J1aWxkZXIsXG4gICByZXBvUGF0aDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgLi4uYXJnczogdW5rbm93bltdXG4pIHtcbiAgIGlmICghZmlsdGVyU3RyaW5nKHJlcG9QYXRoKSkge1xuICAgICAgcmV0dXJuIGNvbmZpZ3VyYXRpb25FcnJvclRhc2soYGdpdC4ke2FwaX0oKSByZXF1aXJlcyBhIHN0cmluZyAncmVwb1BhdGgnYCk7XG4gICB9XG5cbiAgIHJldHVybiB0YXNrKHJlcG9QYXRoLCBmaWx0ZXJUeXBlKGFyZ3NbMF0sIGZpbHRlclN0cmluZyksIGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCk6IFBpY2s8U2ltcGxlR2l0LCAnY2xvbmUnIHwgJ21pcnJvcic+IHtcbiAgIHJldHVybiB7XG4gICAgICBjbG9uZSh0aGlzOiBTaW1wbGVHaXRBcGksIHJlcG86IHN0cmluZyB8IHVua25vd24sIC4uLnJlc3Q6IHVua25vd25bXSkge1xuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICAgICBjcmVhdGVDbG9uZVRhc2soJ2Nsb25lJywgY2xvbmVUYXNrLCBmaWx0ZXJUeXBlKHJlcG8sIGZpbHRlclN0cmluZyksIC4uLnJlc3QpLFxuICAgICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICAgICAgICk7XG4gICAgICB9LFxuICAgICAgbWlycm9yKHRoaXM6IFNpbXBsZUdpdEFwaSwgcmVwbzogc3RyaW5nIHwgdW5rbm93biwgLi4ucmVzdDogdW5rbm93bltdKSB7XG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgICAgIGNyZWF0ZUNsb25lVGFzaygnbWlycm9yJywgY2xvbmVNaXJyb3JUYXNrLCBmaWx0ZXJUeXBlKHJlcG8sIGZpbHRlclN0cmluZyksIC4uLnJlc3QpLFxuICAgICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICAgICAgICk7XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IENvbW1pdFJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgTGluZVBhcnNlciwgcGFyc2VTdHJpbmdSZXNwb25zZSB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgcGFyc2VyczogTGluZVBhcnNlcjxDb21taXRSZXN1bHQ+W10gPSBbXG4gICBuZXcgTGluZVBhcnNlcigvXlxcWyhbXlxcc10rKSggXFwoW14pXStcXCkpPyAoW15cXF1dKykvLCAocmVzdWx0LCBbYnJhbmNoLCByb290LCBjb21taXRdKSA9PiB7XG4gICAgICByZXN1bHQuYnJhbmNoID0gYnJhbmNoO1xuICAgICAgcmVzdWx0LmNvbW1pdCA9IGNvbW1pdDtcbiAgICAgIHJlc3VsdC5yb290ID0gISFyb290O1xuICAgfSksXG4gICBuZXcgTGluZVBhcnNlcigvXFxzKkF1dGhvcjpcXHMoLispL2ksIChyZXN1bHQsIFthdXRob3JdKSA9PiB7XG4gICAgICBjb25zdCBwYXJ0cyA9IGF1dGhvci5zcGxpdCgnPCcpO1xuICAgICAgY29uc3QgZW1haWwgPSBwYXJ0cy5wb3AoKTtcblxuICAgICAgaWYgKCFlbWFpbCB8fCAhZW1haWwuaW5jbHVkZXMoJ0AnKSkge1xuICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZXN1bHQuYXV0aG9yID0ge1xuICAgICAgICAgZW1haWw6IGVtYWlsLnN1YnN0cigwLCBlbWFpbC5sZW5ndGggLSAxKSxcbiAgICAgICAgIG5hbWU6IHBhcnRzLmpvaW4oJzwnKS50cmltKCksXG4gICAgICB9O1xuICAgfSksXG4gICBuZXcgTGluZVBhcnNlcihcbiAgICAgIC8oXFxkKylbXixdKig/OixcXHMqKFxcZCspW14sXSopKD86LFxccyooXFxkKykpL2csXG4gICAgICAocmVzdWx0LCBbY2hhbmdlcywgaW5zZXJ0aW9ucywgZGVsZXRpb25zXSkgPT4ge1xuICAgICAgICAgcmVzdWx0LnN1bW1hcnkuY2hhbmdlcyA9IHBhcnNlSW50KGNoYW5nZXMsIDEwKSB8fCAwO1xuICAgICAgICAgcmVzdWx0LnN1bW1hcnkuaW5zZXJ0aW9ucyA9IHBhcnNlSW50KGluc2VydGlvbnMsIDEwKSB8fCAwO1xuICAgICAgICAgcmVzdWx0LnN1bW1hcnkuZGVsZXRpb25zID0gcGFyc2VJbnQoZGVsZXRpb25zLCAxMCkgfHwgMDtcbiAgICAgIH1cbiAgICksXG4gICBuZXcgTGluZVBhcnNlcihcbiAgICAgIC9eKFxcZCspW14sXSooPzosXFxzKihcXGQrKVteKF0rXFwoKFsrLV0pKT8vLFxuICAgICAgKHJlc3VsdCwgW2NoYW5nZXMsIGxpbmVzLCBkaXJlY3Rpb25dKSA9PiB7XG4gICAgICAgICByZXN1bHQuc3VtbWFyeS5jaGFuZ2VzID0gcGFyc2VJbnQoY2hhbmdlcywgMTApIHx8IDA7XG4gICAgICAgICBjb25zdCBjb3VudCA9IHBhcnNlSW50KGxpbmVzLCAxMCkgfHwgMDtcbiAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICctJykge1xuICAgICAgICAgICAgcmVzdWx0LnN1bW1hcnkuZGVsZXRpb25zID0gY291bnQ7XG4gICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJysnKSB7XG4gICAgICAgICAgICByZXN1bHQuc3VtbWFyeS5pbnNlcnRpb25zID0gY291bnQ7XG4gICAgICAgICB9XG4gICAgICB9XG4gICApLFxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ29tbWl0UmVzdWx0KHN0ZE91dDogc3RyaW5nKTogQ29tbWl0UmVzdWx0IHtcbiAgIGNvbnN0IHJlc3VsdDogQ29tbWl0UmVzdWx0ID0ge1xuICAgICAgYXV0aG9yOiBudWxsLFxuICAgICAgYnJhbmNoOiAnJyxcbiAgICAgIGNvbW1pdDogJycsXG4gICAgICByb290OiBmYWxzZSxcbiAgICAgIHN1bW1hcnk6IHtcbiAgICAgICAgIGNoYW5nZXM6IDAsXG4gICAgICAgICBpbnNlcnRpb25zOiAwLFxuICAgICAgICAgZGVsZXRpb25zOiAwLFxuICAgICAgfSxcbiAgIH07XG4gICByZXR1cm4gcGFyc2VTdHJpbmdSZXNwb25zZShyZXN1bHQsIHBhcnNlcnMsIHN0ZE91dCk7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBDb21taXRSZXN1bHQsIFNpbXBsZUdpdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgcGFyc2VDb21taXRSZXN1bHQgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlLWNvbW1pdCc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdEFwaSB9IGZyb20gJy4uL3NpbXBsZS1naXQtYXBpJztcbmltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7XG4gICBhc0FycmF5LFxuICAgYXNTdHJpbmdBcnJheSxcbiAgIGZpbHRlckFycmF5LFxuICAgZmlsdGVyU3RyaW5nT3JTdHJpbmdBcnJheSxcbiAgIGZpbHRlclR5cGUsXG4gICBnZXRUcmFpbGluZ09wdGlvbnMsXG4gICBwcmVmaXhlZEFycmF5LFxuICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50LFxufSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBjb25maWd1cmF0aW9uRXJyb3JUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbW1pdFRhc2soXG4gICBtZXNzYWdlOiBzdHJpbmdbXSxcbiAgIGZpbGVzOiBzdHJpbmdbXSxcbiAgIGN1c3RvbUFyZ3M6IHN0cmluZ1tdXG4pOiBTdHJpbmdUYXNrPENvbW1pdFJlc3VsdD4ge1xuICAgY29uc3QgY29tbWFuZHM6IHN0cmluZ1tdID0gW1xuICAgICAgJy1jJyxcbiAgICAgICdjb3JlLmFiYnJldj00MCcsXG4gICAgICAnY29tbWl0JyxcbiAgICAgIC4uLnByZWZpeGVkQXJyYXkobWVzc2FnZSwgJy1tJyksXG4gICAgICAuLi5maWxlcyxcbiAgICAgIC4uLmN1c3RvbUFyZ3MsXG4gICBdO1xuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXI6IHBhcnNlQ29tbWl0UmVzdWx0LFxuICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCk6IFBpY2s8U2ltcGxlR2l0LCAnY29tbWl0Jz4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1pdCh0aGlzOiBTaW1wbGVHaXRBcGksIG1lc3NhZ2U6IHN0cmluZyB8IHN0cmluZ1tdLCAuLi5yZXN0OiB1bmtub3duW10pIHtcbiAgICAgICAgIGNvbnN0IG5leHQgPSB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKTtcbiAgICAgICAgIGNvbnN0IHRhc2sgPVxuICAgICAgICAgICAgcmVqZWN0RGVwcmVjYXRlZFNpZ25hdHVyZXMobWVzc2FnZSkgfHxcbiAgICAgICAgICAgIGNvbW1pdFRhc2soXG4gICAgICAgICAgICAgICBhc0FycmF5KG1lc3NhZ2UpLFxuICAgICAgICAgICAgICAgYXNBcnJheShmaWx0ZXJUeXBlKHJlc3RbMF0sIGZpbHRlclN0cmluZ09yU3RyaW5nQXJyYXksIFtdKSksXG4gICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAuLi5hc1N0cmluZ0FycmF5KGZpbHRlclR5cGUocmVzdFsxXSwgZmlsdGVyQXJyYXksIFtdKSksXG4gICAgICAgICAgICAgICAgICAuLi5nZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzLCAwLCB0cnVlKSxcbiAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKHRhc2ssIG5leHQpO1xuICAgICAgfSxcbiAgIH07XG5cbiAgIGZ1bmN0aW9uIHJlamVjdERlcHJlY2F0ZWRTaWduYXR1cmVzKG1lc3NhZ2U/OiB1bmtub3duKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAgIWZpbHRlclN0cmluZ09yU3RyaW5nQXJyYXkobWVzc2FnZSkgJiZcbiAgICAgICAgIGNvbmZpZ3VyYXRpb25FcnJvclRhc2soXG4gICAgICAgICAgICBgZ2l0LmNvbW1pdDogcmVxdWlyZXMgdGhlIGNvbW1pdCBtZXNzYWdlIHRvIGJlIHN1cHBsaWVkIGFzIGEgc3RyaW5nL3N0cmluZ1tdYFxuICAgICAgICAgKVxuICAgICAgKTtcbiAgIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IFNpbXBsZUdpdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRBcGkgfSBmcm9tICcuLi9zaW1wbGUtZ2l0LWFwaSc7XG5pbXBvcnQgeyBhc0NhbWVsQ2FzZSwgYXNOdW1iZXIsIExpbmVQYXJzZXIsIHBhcnNlU3RyaW5nUmVzcG9uc2UgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ291bnRPYmplY3RzUmVzdWx0IHtcbiAgIGNvdW50OiBudW1iZXI7XG4gICBzaXplOiBudW1iZXI7XG4gICBpblBhY2s6IG51bWJlcjtcbiAgIHBhY2tzOiBudW1iZXI7XG4gICBzaXplUGFjazogbnVtYmVyO1xuICAgcHJ1bmVQYWNrYWJsZTogbnVtYmVyO1xuICAgZ2FyYmFnZTogbnVtYmVyO1xuICAgc2l6ZUdhcmJhZ2U6IG51bWJlcjtcbn1cblxuZnVuY3Rpb24gY291bnRPYmplY3RzUmVzcG9uc2UoKTogQ291bnRPYmplY3RzUmVzdWx0IHtcbiAgIHJldHVybiB7XG4gICAgICBjb3VudDogMCxcbiAgICAgIGdhcmJhZ2U6IDAsXG4gICAgICBpblBhY2s6IDAsXG4gICAgICBwYWNrczogMCxcbiAgICAgIHBydW5lUGFja2FibGU6IDAsXG4gICAgICBzaXplOiAwLFxuICAgICAgc2l6ZUdhcmJhZ2U6IDAsXG4gICAgICBzaXplUGFjazogMCxcbiAgIH07XG59XG5cbmNvbnN0IHBhcnNlcjogTGluZVBhcnNlcjxDb3VudE9iamVjdHNSZXN1bHQ+ID0gbmV3IExpbmVQYXJzZXIoXG4gICAvKFthLXotXSspOiAoXFxkKykkLyxcbiAgIChyZXN1bHQsIFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgY29uc3QgcHJvcGVydHkgPSBhc0NhbWVsQ2FzZShrZXkpO1xuICAgICAgaWYgKE9iamVjdC5oYXNPd24ocmVzdWx0LCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgIHJlc3VsdFtwcm9wZXJ0eSBhcyBrZXlvZiB0eXBlb2YgcmVzdWx0XSA9IGFzTnVtYmVyKHZhbHVlKTtcbiAgICAgIH1cbiAgIH1cbik7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpOiBQaWNrPFNpbXBsZUdpdCwgJ2NvdW50T2JqZWN0cyc+IHtcbiAgIHJldHVybiB7XG4gICAgICBjb3VudE9iamVjdHModGhpczogU2ltcGxlR2l0QXBpKSB7XG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayh7XG4gICAgICAgICAgICBjb21tYW5kczogWydjb3VudC1vYmplY3RzJywgJy0tdmVyYm9zZSddLFxuICAgICAgICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgICAgICAgcGFyc2VyKHN0ZE91dDogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICByZXR1cm4gcGFyc2VTdHJpbmdSZXNwb25zZShjb3VudE9iamVjdHNSZXNwb25zZSgpLCBbcGFyc2VyXSwgc3RkT3V0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICB9KTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgUmVzcG9uc2UsIFNpbXBsZUdpdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRBcGkgfSBmcm9tICcuLi9zaW1wbGUtZ2l0LWFwaSc7XG5pbXBvcnQgeyB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCk6IFBpY2s8U2ltcGxlR2l0LCAnZmlyc3RDb21taXQnPiB7XG4gICByZXR1cm4ge1xuICAgICAgZmlyc3RDb21taXQodGhpczogU2ltcGxlR2l0QXBpKTogUmVzcG9uc2U8c3RyaW5nPiB7XG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgICAgIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soWydyZXYtbGlzdCcsICctLW1heC1wYXJlbnRzPTAnLCAnSEVBRCddLCB0cnVlKSxcbiAgICAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICAgICApO1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayB9IGZyb20gJy4vdGFzayc7XG5cbi8qKlxuICogVGFzayB1c2VkIGJ5IGBnaXQuaGFzaE9iamVjdGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc2hPYmplY3RUYXNrKGZpbGVQYXRoOiBzdHJpbmcsIHdyaXRlOiBib29sZWFuKTogU3RyaW5nVGFzazxzdHJpbmc+IHtcbiAgIGNvbnN0IGNvbW1hbmRzID0gWydoYXNoLW9iamVjdCcsIGZpbGVQYXRoXTtcbiAgIGlmICh3cml0ZSkge1xuICAgICAgY29tbWFuZHMucHVzaCgnLXcnKTtcbiAgIH1cblxuICAgcmV0dXJuIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soY29tbWFuZHMsIHRydWUpO1xufVxuIiwgImltcG9ydCB0eXBlIHsgSW5pdFJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuXG5leHBvcnQgY2xhc3MgSW5pdFN1bW1hcnkgaW1wbGVtZW50cyBJbml0UmVzdWx0IHtcbiAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHJlYWRvbmx5IGJhcmU6IGJvb2xlYW4sXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgcGF0aDogc3RyaW5nLFxuICAgICAgcHVibGljIHJlYWRvbmx5IGV4aXN0aW5nOiBib29sZWFuLFxuICAgICAgcHVibGljIHJlYWRvbmx5IGdpdERpcjogc3RyaW5nXG4gICApIHt9XG59XG5cbmNvbnN0IGluaXRSZXNwb25zZVJlZ2V4ID0gL15Jbml0LisgcmVwb3NpdG9yeSBpbiAoLispJC87XG5jb25zdCByZUluaXRSZXNwb25zZVJlZ2V4ID0gL15SZWluLisgaW4gKC4rKSQvO1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VJbml0KGJhcmU6IGJvb2xlYW4sIHBhdGg6IHN0cmluZywgdGV4dDogc3RyaW5nKSB7XG4gICBjb25zdCByZXNwb25zZSA9IFN0cmluZyh0ZXh0KS50cmltKCk7XG4gICBsZXQgcmVzdWx0O1xuXG4gICBpZiAoKHJlc3VsdCA9IGluaXRSZXNwb25zZVJlZ2V4LmV4ZWMocmVzcG9uc2UpKSkge1xuICAgICAgcmV0dXJuIG5ldyBJbml0U3VtbWFyeShiYXJlLCBwYXRoLCBmYWxzZSwgcmVzdWx0WzFdKTtcbiAgIH1cblxuICAgaWYgKChyZXN1bHQgPSByZUluaXRSZXNwb25zZVJlZ2V4LmV4ZWMocmVzcG9uc2UpKSkge1xuICAgICAgcmV0dXJuIG5ldyBJbml0U3VtbWFyeShiYXJlLCBwYXRoLCB0cnVlLCByZXN1bHRbMV0pO1xuICAgfVxuXG4gICBsZXQgZ2l0RGlyID0gJyc7XG4gICBjb25zdCB0b2tlbnMgPSByZXNwb25zZS5zcGxpdCgnICcpO1xuICAgd2hpbGUgKHRva2Vucy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5zLnNoaWZ0KCk7XG4gICAgICBpZiAodG9rZW4gPT09ICdpbicpIHtcbiAgICAgICAgIGdpdERpciA9IHRva2Vucy5qb2luKCcgJyk7XG4gICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgIH1cblxuICAgcmV0dXJuIG5ldyBJbml0U3VtbWFyeShiYXJlLCBwYXRoLCAvXnJlL2kudGVzdChyZXNwb25zZSksIGdpdERpcik7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBJbml0UmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBwYXJzZUluaXQgfSBmcm9tICcuLi9yZXNwb25zZXMvSW5pdFN1bW1hcnknO1xuaW1wb3J0IHR5cGUgeyBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5jb25zdCBiYXJlQ29tbWFuZCA9ICctLWJhcmUnO1xuXG5mdW5jdGlvbiBoYXNCYXJlQ29tbWFuZChjb21tYW5kOiBzdHJpbmdbXSkge1xuICAgcmV0dXJuIGNvbW1hbmQuaW5jbHVkZXMoYmFyZUNvbW1hbmQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdFRhc2soYmFyZSA9IGZhbHNlLCBwYXRoOiBzdHJpbmcsIGN1c3RvbUFyZ3M6IHN0cmluZ1tdKTogU3RyaW5nVGFzazxJbml0UmVzdWx0PiB7XG4gICBjb25zdCBjb21tYW5kcyA9IFsnaW5pdCcsIC4uLmN1c3RvbUFyZ3NdO1xuICAgaWYgKGJhcmUgJiYgIWhhc0JhcmVDb21tYW5kKGNvbW1hbmRzKSkge1xuICAgICAgY29tbWFuZHMuc3BsaWNlKDEsIDAsIGJhcmVDb21tYW5kKTtcbiAgIH1cblxuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgcGFyc2VyKHRleHQ6IHN0cmluZyk6IEluaXRSZXN1bHQge1xuICAgICAgICAgcmV0dXJuIHBhcnNlSW5pdChjb21tYW5kcy5pbmNsdWRlcygnLS1iYXJlJyksIHBhdGgsIHRleHQpO1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0QXBpIH0gZnJvbSAnLi4vc2ltcGxlLWdpdC1hcGknO1xuaW1wb3J0IHR5cGUgeyBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHtcbiAgIGFzQ2FtZWxDYXNlLFxuICAgZmlsdGVyU3RyaW5nT3JCdWZmZXIsXG4gICBmaWx0ZXJUeXBlLFxuICAgZm9yRWFjaExpbmVXaXRoQ29udGVudCxcbiAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudCxcbn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgY29uZmlndXJhdGlvbkVycm9yVGFzaywgdHlwZSBFbXB0eVRhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5mdW5jdGlvbiBpbnRlcnByZXRUcmFpbGVyc1Rhc2soXG4gICBpbnB1dD86IHN0cmluZyB8IEJ1ZmZlclxuKTogU3RyaW5nVGFzazxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PiB8IEVtcHR5VGFzayB7XG4gICBpZiAoaW5wdXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGNvbmZpZ3VyYXRpb25FcnJvclRhc2soYGludGVycHJldFRyYWlsZXJzIGNhbGxlZCB3aXRob3V0IGlucHV0IGNvbnRlbnRgKTtcbiAgIH1cblxuICAgcmV0dXJuIHtcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIHBhcnNlcihzdGRPdXQpIHtcbiAgICAgICAgIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoXG4gICAgICAgICAgICBmb3JFYWNoTGluZVdpdGhDb250ZW50KHN0ZE91dCwgKGxpbmUpID0+IHtcbiAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgYXNDYW1lbENhc2UobGluZS5zdWJzdHJpbmcoMCwgaW5kZXgpLnRvTG93ZXJDYXNlKCkpLFxuICAgICAgICAgICAgICAgICAgbGluZS5zdWJzdHJpbmcoaW5kZXggKyAyKS50cmltKCksXG4gICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICk7XG4gICAgICB9LFxuICAgICAgY29tbWFuZHM6IFsnaW50ZXJwcmV0LXRyYWlsZXJzJywgJy0tcGFyc2UnXSxcbiAgICAgIGlucHV0LFxuICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCk6IFBpY2s8U2ltcGxlR2l0LCAnaW50ZXJwcmV0VHJhaWxlcnMnPiB7XG4gICByZXR1cm4ge1xuICAgICAgaW50ZXJwcmV0VHJhaWxlcnModGhpczogU2ltcGxlR2l0QXBpLCBpbnB1dCkge1xuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICAgICBpbnRlcnByZXRUcmFpbGVyc1Rhc2soZmlsdGVyVHlwZShpbnB1dCwgZmlsdGVyU3RyaW5nT3JCdWZmZXIpKSxcbiAgICAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICAgICApO1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiZXhwb3J0IGVudW0gTG9nRm9ybWF0IHtcbiAgIE5PTkUgPSAnJyxcbiAgIFNUQVQgPSAnLS1zdGF0JyxcbiAgIE5VTV9TVEFUID0gJy0tbnVtc3RhdCcsXG4gICBOQU1FX09OTFkgPSAnLS1uYW1lLW9ubHknLFxuICAgTkFNRV9TVEFUVVMgPSAnLS1uYW1lLXN0YXR1cycsXG59XG5cbmNvbnN0IGxvZ0Zvcm1hdFJlZ2V4ID0gL14tLShzdGF0fG51bXN0YXR8bmFtZS1vbmx5fG5hbWUtc3RhdHVzKSg9fCQpLztcblxuZXhwb3J0IGZ1bmN0aW9uIGxvZ0Zvcm1hdEZyb21Db21tYW5kKGN1c3RvbUFyZ3M6IHN0cmluZ1tdKSB7XG4gICBmb3IgKGxldCBpID0gMDsgaSA8IGN1c3RvbUFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGZvcm1hdCA9IGxvZ0Zvcm1hdFJlZ2V4LmV4ZWMoY3VzdG9tQXJnc1tpXSk7XG4gICAgICBpZiAoZm9ybWF0KSB7XG4gICAgICAgICByZXR1cm4gYC0tJHtmb3JtYXRbMV19YCBhcyBMb2dGb3JtYXQ7XG4gICAgICB9XG4gICB9XG5cbiAgIHJldHVybiBMb2dGb3JtYXQuTk9ORTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTG9nRm9ybWF0KGN1c3RvbUFyZzogc3RyaW5nIHwgdW5rbm93bikge1xuICAgcmV0dXJuIGxvZ0Zvcm1hdFJlZ2V4LnRlc3QoY3VzdG9tQXJnIGFzIHN0cmluZyk7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBEaWZmUmVzdWx0LCBEaWZmUmVzdWx0QmluYXJ5RmlsZSwgRGlmZlJlc3VsdFRleHRGaWxlIH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5cbi8qKipcbiAqIFRoZSBEaWZmU3VtbWFyeSBpcyByZXR1cm5lZCBhcyBhIHJlc3BvbnNlIHRvIGdldHRpbmcgYGdpdCgpLnN0YXR1cygpYFxuICovXG5leHBvcnQgY2xhc3MgRGlmZlN1bW1hcnkgaW1wbGVtZW50cyBEaWZmUmVzdWx0IHtcbiAgIGNoYW5nZWQgPSAwO1xuICAgZGVsZXRpb25zID0gMDtcbiAgIGluc2VydGlvbnMgPSAwO1xuXG4gICBmaWxlczogQXJyYXk8RGlmZlJlc3VsdFRleHRGaWxlIHwgRGlmZlJlc3VsdEJpbmFyeUZpbGU+ID0gW107XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBEaWZmUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBMb2dGb3JtYXQgfSBmcm9tICcuLi9hcmdzL2xvZy1mb3JtYXQnO1xuaW1wb3J0IHsgRGlmZlN1bW1hcnkgfSBmcm9tICcuLi9yZXNwb25zZXMvRGlmZlN1bW1hcnknO1xuaW1wb3J0IHsgaXNEaWZmTmFtZVN0YXR1cyB9IGZyb20gJy4uL3Rhc2tzL2RpZmYtbmFtZS1zdGF0dXMnO1xuaW1wb3J0IHsgYXNOdW1iZXIsIExpbmVQYXJzZXIsIG9yVm9pZCwgcGFyc2VTdHJpbmdSZXNwb25zZSB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3Qgc3RhdFBhcnNlciA9IFtcbiAgIG5ldyBMaW5lUGFyc2VyPERpZmZSZXN1bHQ+KFxuICAgICAgL14oLispXFxzK1xcfFxccysoXFxkKykoXFxzK1srXFwtXSspPyQvLFxuICAgICAgKHJlc3VsdCwgW2ZpbGUsIGNoYW5nZXMsIGFsdGVyYXRpb25zID0gJyddKSA9PiB7XG4gICAgICAgICByZXN1bHQuZmlsZXMucHVzaCh7XG4gICAgICAgICAgICBmaWxlOiBmaWxlLnRyaW0oKSxcbiAgICAgICAgICAgIGNoYW5nZXM6IGFzTnVtYmVyKGNoYW5nZXMpLFxuICAgICAgICAgICAgaW5zZXJ0aW9uczogYWx0ZXJhdGlvbnMucmVwbGFjZSgvW14rXS9nLCAnJykubGVuZ3RoLFxuICAgICAgICAgICAgZGVsZXRpb25zOiBhbHRlcmF0aW9ucy5yZXBsYWNlKC9bXi1dL2csICcnKS5sZW5ndGgsXG4gICAgICAgICAgICBiaW5hcnk6IGZhbHNlLFxuICAgICAgICAgfSk7XG4gICAgICB9XG4gICApLFxuICAgbmV3IExpbmVQYXJzZXI8RGlmZlJlc3VsdD4oXG4gICAgICAvXiguKykgXFx8XFxzK0JpbiAoWzAtOS5dKykgLT4gKFswLTkuXSspIChbYS16XSspLyxcbiAgICAgIChyZXN1bHQsIFtmaWxlLCBiZWZvcmUsIGFmdGVyXSkgPT4ge1xuICAgICAgICAgcmVzdWx0LmZpbGVzLnB1c2goe1xuICAgICAgICAgICAgZmlsZTogZmlsZS50cmltKCksXG4gICAgICAgICAgICBiZWZvcmU6IGFzTnVtYmVyKGJlZm9yZSksXG4gICAgICAgICAgICBhZnRlcjogYXNOdW1iZXIoYWZ0ZXIpLFxuICAgICAgICAgICAgYmluYXJ5OiB0cnVlLFxuICAgICAgICAgfSk7XG4gICAgICB9XG4gICApLFxuICAgbmV3IExpbmVQYXJzZXI8RGlmZlJlc3VsdD4oL14oLispXFxzK1xcfFxccytCaW5cXHMqJC8sIChyZXN1bHQsIFtmaWxlXSkgPT4ge1xuICAgICAgcmVzdWx0LmZpbGVzLnB1c2goe1xuICAgICAgICAgZmlsZTogZmlsZS50cmltKCksXG4gICAgICAgICBiZWZvcmU6IDAsXG4gICAgICAgICBhZnRlcjogMCxcbiAgICAgICAgIGJpbmFyeTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgfSksXG4gICBuZXcgTGluZVBhcnNlcjxEaWZmUmVzdWx0PihcbiAgICAgIC8oXFxkKykgZmlsZXM/IGNoYW5nZWRcXHMqKCg/OiwgXFxkKyBbXixdKyl7MCwyfSkvLFxuICAgICAgKHJlc3VsdCwgW2NoYW5nZWQsIHN1bW1hcnldKSA9PiB7XG4gICAgICAgICBjb25zdCBpbnNlcnRlZCA9IC8oXFxkKykgaS8uZXhlYyhzdW1tYXJ5KTtcbiAgICAgICAgIGNvbnN0IGRlbGV0ZWQgPSAvKFxcZCspIGQvLmV4ZWMoc3VtbWFyeSk7XG5cbiAgICAgICAgIHJlc3VsdC5jaGFuZ2VkID0gYXNOdW1iZXIoY2hhbmdlZCk7XG4gICAgICAgICByZXN1bHQuaW5zZXJ0aW9ucyA9IGFzTnVtYmVyKGluc2VydGVkPy5bMV0pO1xuICAgICAgICAgcmVzdWx0LmRlbGV0aW9ucyA9IGFzTnVtYmVyKGRlbGV0ZWQ/LlsxXSk7XG4gICAgICB9XG4gICApLFxuXTtcblxuY29uc3QgbnVtU3RhdFBhcnNlciA9IFtcbiAgIG5ldyBMaW5lUGFyc2VyPERpZmZSZXN1bHQ+KFxuICAgICAgLyhcXGQrKVxcdChcXGQrKVxcdCguKykkLyxcbiAgICAgIChyZXN1bHQsIFtjaGFuZ2VzSW5zZXJ0LCBjaGFuZ2VzRGVsZXRlLCBmaWxlXSkgPT4ge1xuICAgICAgICAgY29uc3QgaW5zZXJ0aW9ucyA9IGFzTnVtYmVyKGNoYW5nZXNJbnNlcnQpO1xuICAgICAgICAgY29uc3QgZGVsZXRpb25zID0gYXNOdW1iZXIoY2hhbmdlc0RlbGV0ZSk7XG5cbiAgICAgICAgIHJlc3VsdC5jaGFuZ2VkKys7XG4gICAgICAgICByZXN1bHQuaW5zZXJ0aW9ucyArPSBpbnNlcnRpb25zO1xuICAgICAgICAgcmVzdWx0LmRlbGV0aW9ucyArPSBkZWxldGlvbnM7XG5cbiAgICAgICAgIHJlc3VsdC5maWxlcy5wdXNoKHtcbiAgICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgICBjaGFuZ2VzOiBpbnNlcnRpb25zICsgZGVsZXRpb25zLFxuICAgICAgICAgICAgaW5zZXJ0aW9ucyxcbiAgICAgICAgICAgIGRlbGV0aW9ucyxcbiAgICAgICAgICAgIGJpbmFyeTogZmFsc2UsXG4gICAgICAgICB9KTtcbiAgICAgIH1cbiAgICksXG4gICBuZXcgTGluZVBhcnNlcjxEaWZmUmVzdWx0PigvLVxcdC1cXHQoLispJC8sIChyZXN1bHQsIFtmaWxlXSkgPT4ge1xuICAgICAgcmVzdWx0LmNoYW5nZWQrKztcblxuICAgICAgcmVzdWx0LmZpbGVzLnB1c2goe1xuICAgICAgICAgZmlsZSxcbiAgICAgICAgIGFmdGVyOiAwLFxuICAgICAgICAgYmVmb3JlOiAwLFxuICAgICAgICAgYmluYXJ5OiB0cnVlLFxuICAgICAgfSk7XG4gICB9KSxcbl07XG5cbmNvbnN0IG5hbWVPbmx5UGFyc2VyID0gW1xuICAgbmV3IExpbmVQYXJzZXI8RGlmZlJlc3VsdD4oLyguKykkLywgKHJlc3VsdCwgW2ZpbGVdKSA9PiB7XG4gICAgICByZXN1bHQuY2hhbmdlZCsrO1xuICAgICAgcmVzdWx0LmZpbGVzLnB1c2goe1xuICAgICAgICAgZmlsZSxcbiAgICAgICAgIGNoYW5nZXM6IDAsXG4gICAgICAgICBpbnNlcnRpb25zOiAwLFxuICAgICAgICAgZGVsZXRpb25zOiAwLFxuICAgICAgICAgYmluYXJ5OiBmYWxzZSxcbiAgICAgIH0pO1xuICAgfSksXG5dO1xuXG5jb25zdCBuYW1lU3RhdHVzUGFyc2VyID0gW1xuICAgbmV3IExpbmVQYXJzZXI8RGlmZlJlc3VsdD4oXG4gICAgICAvKFtBQ0RNUlRVWEJdKShbMC05XXswLDN9KVxcdCguW15cXHRdKikoXFx0KC5bXlxcdF0qKSk/JC8sXG4gICAgICAocmVzdWx0LCBbc3RhdHVzLCBzaW1pbGFyaXR5LCBmcm9tLCBfdG8sIHRvXSkgPT4ge1xuICAgICAgICAgcmVzdWx0LmNoYW5nZWQrKztcbiAgICAgICAgIHJlc3VsdC5maWxlcy5wdXNoKHtcbiAgICAgICAgICAgIGZpbGU6IHRvID8/IGZyb20sXG4gICAgICAgICAgICBjaGFuZ2VzOiAwLFxuICAgICAgICAgICAgaW5zZXJ0aW9uczogMCxcbiAgICAgICAgICAgIGRlbGV0aW9uczogMCxcbiAgICAgICAgICAgIGJpbmFyeTogZmFsc2UsXG4gICAgICAgICAgICBzdGF0dXM6IG9yVm9pZChpc0RpZmZOYW1lU3RhdHVzKHN0YXR1cykgJiYgc3RhdHVzKSxcbiAgICAgICAgICAgIGZyb206IG9yVm9pZCghIXRvICYmIGZyb20gIT09IHRvICYmIGZyb20pLFxuICAgICAgICAgICAgc2ltaWxhcml0eTogYXNOdW1iZXIoc2ltaWxhcml0eSksXG4gICAgICAgICB9KTtcbiAgICAgIH1cbiAgICksXG5dO1xuXG5jb25zdCBkaWZmU3VtbWFyeVBhcnNlcnM6IFJlY29yZDxMb2dGb3JtYXQsIExpbmVQYXJzZXI8RGlmZlJlc3VsdD5bXT4gPSB7XG4gICBbTG9nRm9ybWF0Lk5PTkVdOiBzdGF0UGFyc2VyLFxuICAgW0xvZ0Zvcm1hdC5TVEFUXTogc3RhdFBhcnNlcixcbiAgIFtMb2dGb3JtYXQuTlVNX1NUQVRdOiBudW1TdGF0UGFyc2VyLFxuICAgW0xvZ0Zvcm1hdC5OQU1FX1NUQVRVU106IG5hbWVTdGF0dXNQYXJzZXIsXG4gICBbTG9nRm9ybWF0Lk5BTUVfT05MWV06IG5hbWVPbmx5UGFyc2VyLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldERpZmZQYXJzZXIoZm9ybWF0ID0gTG9nRm9ybWF0Lk5PTkUpIHtcbiAgIGNvbnN0IHBhcnNlciA9IGRpZmZTdW1tYXJ5UGFyc2Vyc1tmb3JtYXRdO1xuXG4gICByZXR1cm4gKHN0ZE91dDogc3RyaW5nKSA9PiBwYXJzZVN0cmluZ1Jlc3BvbnNlKG5ldyBEaWZmU3VtbWFyeSgpLCBwYXJzZXIsIHN0ZE91dCwgZmFsc2UpO1xufVxuIiwgImltcG9ydCB0eXBlIHsgTGlzdExvZ0xpbmUsIExvZ1Jlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgTG9nRm9ybWF0IH0gZnJvbSAnLi4vYXJncy9sb2ctZm9ybWF0JztcbmltcG9ydCB7IHRvTGluZXNXaXRoQ29udGVudCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IGdldERpZmZQYXJzZXIgfSBmcm9tICcuL3BhcnNlLWRpZmYtc3VtbWFyeSc7XG5cbmV4cG9ydCBjb25zdCBTVEFSVF9CT1VOREFSWSA9ICfDssOyw7LDssOyw7IgJztcblxuZXhwb3J0IGNvbnN0IENPTU1JVF9CT1VOREFSWSA9ICcgw7LDsic7XG5cbmV4cG9ydCBjb25zdCBTUExJVFRFUiA9ICcgw7IgJztcblxuY29uc3QgZGVmYXVsdEZpZWxkTmFtZXMgPSBbJ2hhc2gnLCAnZGF0ZScsICdtZXNzYWdlJywgJ3JlZnMnLCAnYXV0aG9yX25hbWUnLCAnYXV0aG9yX2VtYWlsJ107XG5cbmZ1bmN0aW9uIGxpbmVCdWlsZGVyKHRva2Vuczogc3RyaW5nW10sIGZpZWxkczogc3RyaW5nW10pOiBhbnkge1xuICAgcmV0dXJuIGZpZWxkcy5yZWR1Y2UoXG4gICAgICAobGluZSwgZmllbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICBsaW5lW2ZpZWxkXSA9IHRva2Vuc1tpbmRleF0gfHwgJyc7XG4gICAgICAgICByZXR1cm4gbGluZTtcbiAgICAgIH0sXG4gICAgICBPYmplY3QuY3JlYXRlKHsgZGlmZjogbnVsbCB9KSBhcyBhbnlcbiAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMaXN0TG9nU3VtbWFyeVBhcnNlcjxUID0gYW55PihcbiAgIHNwbGl0dGVyID0gU1BMSVRURVIsXG4gICBmaWVsZHMgPSBkZWZhdWx0RmllbGROYW1lcyxcbiAgIGxvZ0Zvcm1hdCA9IExvZ0Zvcm1hdC5OT05FXG4pIHtcbiAgIGNvbnN0IHBhcnNlRGlmZlJlc3VsdCA9IGdldERpZmZQYXJzZXIobG9nRm9ybWF0KTtcblxuICAgcmV0dXJuIGZ1bmN0aW9uIChzdGRPdXQ6IHN0cmluZyk6IExvZ1Jlc3VsdDxUPiB7XG4gICAgICBjb25zdCBhbGw6IFJlYWRvbmx5QXJyYXk8VCAmIExpc3RMb2dMaW5lPiA9IHRvTGluZXNXaXRoQ29udGVudChcbiAgICAgICAgIHN0ZE91dC50cmltKCksXG4gICAgICAgICBmYWxzZSxcbiAgICAgICAgIFNUQVJUX0JPVU5EQVJZXG4gICAgICApLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgY29uc3QgbGluZURldGFpbCA9IGl0ZW0uc3BsaXQoQ09NTUlUX0JPVU5EQVJZKTtcbiAgICAgICAgIGNvbnN0IGxpc3RMb2dMaW5lOiBUICYgTGlzdExvZ0xpbmUgPSBsaW5lQnVpbGRlcihsaW5lRGV0YWlsWzBdLnNwbGl0KHNwbGl0dGVyKSwgZmllbGRzKTtcblxuICAgICAgICAgaWYgKGxpbmVEZXRhaWwubGVuZ3RoID4gMSAmJiBsaW5lRGV0YWlsWzFdLnRyaW0oKSkge1xuICAgICAgICAgICAgbGlzdExvZ0xpbmUuZGlmZiA9IHBhcnNlRGlmZlJlc3VsdChsaW5lRGV0YWlsWzFdKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgcmV0dXJuIGxpc3RMb2dMaW5lO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgICBhbGwsXG4gICAgICAgICBsYXRlc3Q6IChhbGwubGVuZ3RoICYmIGFsbFswXSkgfHwgbnVsbCxcbiAgICAgICAgIHRvdGFsOiBhbGwubGVuZ3RoLFxuICAgICAgfTtcbiAgIH07XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBEaWZmUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBpc0xvZ0Zvcm1hdCwgTG9nRm9ybWF0LCBsb2dGb3JtYXRGcm9tQ29tbWFuZCB9IGZyb20gJy4uL2FyZ3MvbG9nLWZvcm1hdCc7XG5pbXBvcnQgeyBnZXREaWZmUGFyc2VyIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZS1kaWZmLXN1bW1hcnknO1xuaW1wb3J0IHR5cGUgeyBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgY29uZmlndXJhdGlvbkVycm9yVGFzaywgdHlwZSBFbXB0eVRhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5leHBvcnQgZnVuY3Rpb24gZGlmZlN1bW1hcnlUYXNrKGN1c3RvbUFyZ3M6IHN0cmluZ1tdKTogU3RyaW5nVGFzazxEaWZmUmVzdWx0PiB8IEVtcHR5VGFzayB7XG4gICBsZXQgbG9nRm9ybWF0ID0gbG9nRm9ybWF0RnJvbUNvbW1hbmQoY3VzdG9tQXJncyk7XG5cbiAgIGNvbnN0IGNvbW1hbmRzID0gWydkaWZmJ107XG5cbiAgIGlmIChsb2dGb3JtYXQgPT09IExvZ0Zvcm1hdC5OT05FKSB7XG4gICAgICBsb2dGb3JtYXQgPSBMb2dGb3JtYXQuU1RBVDtcbiAgICAgIGNvbW1hbmRzLnB1c2goJy0tc3RhdD00MDk2Jyk7XG4gICB9XG5cbiAgIGNvbW1hbmRzLnB1c2goLi4uY3VzdG9tQXJncyk7XG5cbiAgIHJldHVybiAoXG4gICAgICB2YWxpZGF0ZUxvZ0Zvcm1hdENvbmZpZyhjb21tYW5kcykgfHwge1xuICAgICAgICAgY29tbWFuZHMsXG4gICAgICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICAgICBwYXJzZXI6IGdldERpZmZQYXJzZXIobG9nRm9ybWF0KSxcbiAgICAgIH1cbiAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUxvZ0Zvcm1hdENvbmZpZyhjdXN0b21BcmdzOiB1bmtub3duW10pOiBFbXB0eVRhc2sgfCB2b2lkIHtcbiAgIGNvbnN0IGZsYWdzID0gY3VzdG9tQXJncy5maWx0ZXIoaXNMb2dGb3JtYXQpO1xuXG4gICBpZiAoZmxhZ3MubGVuZ3RoID4gMSkge1xuICAgICAgcmV0dXJuIGNvbmZpZ3VyYXRpb25FcnJvclRhc2soXG4gICAgICAgICBgU3VtbWFyeSBmbGFncyBhcmUgbXV0dWFsbHkgZXhjbHVzaXZlIC0gcGljayBvbmUgb2YgJHtmbGFncy5qb2luKCcsJyl9YFxuICAgICAgKTtcbiAgIH1cblxuICAgaWYgKGZsYWdzLmxlbmd0aCAmJiBjdXN0b21BcmdzLmluY2x1ZGVzKCcteicpKSB7XG4gICAgICByZXR1cm4gY29uZmlndXJhdGlvbkVycm9yVGFzayhcbiAgICAgICAgIGBTdW1tYXJ5IGZsYWcgJHtmbGFnc30gcGFyc2luZyBpcyBub3QgY29tcGF0aWJsZSB3aXRoIG51bGwgdGVybWluYXRpb24gb3B0aW9uICcteidgXG4gICAgICApO1xuICAgfVxufVxuIiwgImltcG9ydCB7IHBhdGhzcGVjIH0gZnJvbSAnQHNpbXBsZS1naXQvYXJncy1wYXRoc3BlYyc7XG5cbmltcG9ydCB0eXBlIHsgTG9nUmVzdWx0LCBPcHRpb25zLCBTaW1wbGVHaXQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IGxvZ0Zvcm1hdEZyb21Db21tYW5kIH0gZnJvbSAnLi4vYXJncy9sb2ctZm9ybWF0JztcbmltcG9ydCB7XG4gICBDT01NSVRfQk9VTkRBUlksXG4gICBjcmVhdGVMaXN0TG9nU3VtbWFyeVBhcnNlcixcbiAgIFNQTElUVEVSLFxuICAgU1RBUlRfQk9VTkRBUlksXG59IGZyb20gJy4uL3BhcnNlcnMvcGFyc2UtbGlzdC1sb2ctc3VtbWFyeSc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdEFwaSB9IGZyb20gJy4uL3NpbXBsZS1naXQtYXBpJztcbmltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7XG4gICBhcHBlbmRUYXNrT3B0aW9ucyxcbiAgIGFzU3RyaW5nQXJyYXksXG4gICBmaWx0ZXJBcnJheSxcbiAgIGZpbHRlclBsYWluT2JqZWN0LFxuICAgZmlsdGVyU3RyaW5nLFxuICAgZmlsdGVyVHlwZSxcbiAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudCxcbiAgIHRyYWlsaW5nT3B0aW9uc0FyZ3VtZW50LFxufSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyB2YWxpZGF0ZUxvZ0Zvcm1hdENvbmZpZyB9IGZyb20gJy4vZGlmZic7XG5pbXBvcnQgeyBjb25maWd1cmF0aW9uRXJyb3JUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZW51bSBleGNsdWRlT3B0aW9ucyB7XG4gICAnLS1wcmV0dHknLFxuICAgJ21heC1jb3VudCcsXG4gICAnbWF4Q291bnQnLFxuICAgJ24nLFxuICAgJ2ZpbGUnLFxuICAgJ2Zvcm1hdCcsXG4gICAnZnJvbScsXG4gICAndG8nLFxuICAgJ3NwbGl0dGVyJyxcbiAgICdzeW1tZXRyaWMnLFxuICAgJ21haWxNYXAnLFxuICAgJ211bHRpTGluZScsXG4gICAnc3RyaWN0RGF0ZScsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGVmYXVsdExvZ0ZpZWxkcyB7XG4gICBoYXNoOiBzdHJpbmc7XG4gICBkYXRlOiBzdHJpbmc7XG4gICBtZXNzYWdlOiBzdHJpbmc7XG4gICByZWZzOiBzdHJpbmc7XG4gICBib2R5OiBzdHJpbmc7XG4gICBhdXRob3JfbmFtZTogc3RyaW5nO1xuICAgYXV0aG9yX2VtYWlsOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIExvZ09wdGlvbnM8VCA9IERlZmF1bHRMb2dGaWVsZHM+ID0ge1xuICAgZmlsZT86IHN0cmluZztcbiAgIGZvcm1hdD86IFQ7XG4gICBmcm9tPzogc3RyaW5nO1xuICAgbWFpbE1hcD86IGJvb2xlYW47XG4gICBtYXhDb3VudD86IG51bWJlcjtcbiAgIG11bHRpTGluZT86IGJvb2xlYW47XG4gICBzcGxpdHRlcj86IHN0cmluZztcbiAgIHN0cmljdERhdGU/OiBib29sZWFuO1xuICAgc3ltbWV0cmljPzogYm9vbGVhbjtcbiAgIHRvPzogc3RyaW5nO1xufTtcblxuaW50ZXJmYWNlIFBhcnNlZExvZ09wdGlvbnMge1xuICAgZmllbGRzOiBzdHJpbmdbXTtcbiAgIHNwbGl0dGVyOiBzdHJpbmc7XG4gICBjb21tYW5kczogc3RyaW5nW107XG59XG5cbmZ1bmN0aW9uIHByZXR0eUZvcm1hdChcbiAgIGZvcm1hdDogUmVjb3JkPHN0cmluZywgc3RyaW5nIHwgdW5rbm93bj4sXG4gICBzcGxpdHRlcjogc3RyaW5nXG4pOiBbc3RyaW5nW10sIHN0cmluZ10ge1xuICAgY29uc3QgZmllbGRzOiBzdHJpbmdbXSA9IFtdO1xuICAgY29uc3QgZm9ybWF0U3RyOiBzdHJpbmdbXSA9IFtdO1xuXG4gICBPYmplY3Qua2V5cyhmb3JtYXQpLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICBmaWVsZHMucHVzaChmaWVsZCk7XG4gICAgICBmb3JtYXRTdHIucHVzaChTdHJpbmcoZm9ybWF0W2ZpZWxkXSkpO1xuICAgfSk7XG5cbiAgIHJldHVybiBbZmllbGRzLCBmb3JtYXRTdHIuam9pbihzcGxpdHRlcildO1xufVxuXG5mdW5jdGlvbiB1c2VyT3B0aW9uczxUIGV4dGVuZHMgT3B0aW9ucz4oaW5wdXQ6IFQpOiBPcHRpb25zIHtcbiAgIHJldHVybiBPYmplY3Qua2V5cyhpbnB1dCkucmVkdWNlKChvdXQsIGtleSkgPT4ge1xuICAgICAgaWYgKCEoa2V5IGluIGV4Y2x1ZGVPcHRpb25zKSkge1xuICAgICAgICAgb3V0W2tleV0gPSBpbnB1dFtrZXldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG91dDtcbiAgIH0sIHt9IGFzIE9wdGlvbnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VMb2dPcHRpb25zPFQgZXh0ZW5kcyBPcHRpb25zPihcbiAgIG9wdDogT3B0aW9ucyB8IExvZ09wdGlvbnM8VD4gPSB7fSxcbiAgIGN1c3RvbUFyZ3M6IHN0cmluZ1tdID0gW11cbik6IFBhcnNlZExvZ09wdGlvbnMge1xuICAgY29uc3Qgc3BsaXR0ZXIgPSBmaWx0ZXJUeXBlKG9wdC5zcGxpdHRlciwgZmlsdGVyU3RyaW5nLCBTUExJVFRFUik7XG4gICBjb25zdCBmb3JtYXQgPSBmaWx0ZXJQbGFpbk9iamVjdChvcHQuZm9ybWF0KVxuICAgICAgPyBvcHQuZm9ybWF0XG4gICAgICA6IHtcbiAgICAgICAgICAgaGFzaDogJyVIJyxcbiAgICAgICAgICAgZGF0ZTogb3B0LnN0cmljdERhdGUgPT09IGZhbHNlID8gJyVhaScgOiAnJWFJJyxcbiAgICAgICAgICAgbWVzc2FnZTogJyVzJyxcbiAgICAgICAgICAgcmVmczogJyVEJyxcbiAgICAgICAgICAgYm9keTogb3B0Lm11bHRpTGluZSA/ICclQicgOiAnJWInLFxuICAgICAgICAgICBhdXRob3JfbmFtZTogb3B0Lm1haWxNYXAgIT09IGZhbHNlID8gJyVhTicgOiAnJWFuJyxcbiAgICAgICAgICAgYXV0aG9yX2VtYWlsOiBvcHQubWFpbE1hcCAhPT0gZmFsc2UgPyAnJWFFJyA6ICclYWUnLFxuICAgICAgICB9O1xuXG4gICBjb25zdCBbZmllbGRzLCBmb3JtYXRTdHJdID0gcHJldHR5Rm9ybWF0KGZvcm1hdCwgc3BsaXR0ZXIpO1xuXG4gICBjb25zdCBzdWZmaXg6IHN0cmluZ1tdID0gW107XG4gICBjb25zdCBjb21tYW5kOiBzdHJpbmdbXSA9IFtcbiAgICAgIGAtLXByZXR0eT1mb3JtYXQ6JHtTVEFSVF9CT1VOREFSWX0ke2Zvcm1hdFN0cn0ke0NPTU1JVF9CT1VOREFSWX1gLFxuICAgICAgLi4uY3VzdG9tQXJncyxcbiAgIF07XG5cbiAgIGNvbnN0IG1heENvdW50OiBudW1iZXIgfCB1bmRlZmluZWQgPSAob3B0IGFzIGFueSkubiB8fCAob3B0IGFzIGFueSlbJ21heC1jb3VudCddIHx8IG9wdC5tYXhDb3VudDtcbiAgIGlmIChtYXhDb3VudCkge1xuICAgICAgY29tbWFuZC5wdXNoKGAtLW1heC1jb3VudD0ke21heENvdW50fWApO1xuICAgfVxuXG4gICBpZiAob3B0LmZyb20gfHwgb3B0LnRvKSB7XG4gICAgICBjb25zdCByYW5nZU9wZXJhdG9yID0gb3B0LnN5bW1ldHJpYyAhPT0gZmFsc2UgPyAnLi4uJyA6ICcuLic7XG4gICAgICBzdWZmaXgucHVzaChgJHtvcHQuZnJvbSB8fCAnJ30ke3JhbmdlT3BlcmF0b3J9JHtvcHQudG8gfHwgJyd9YCk7XG4gICB9XG5cbiAgIGlmIChmaWx0ZXJTdHJpbmcob3B0LmZpbGUpKSB7XG4gICAgICBjb21tYW5kLnB1c2goJy0tZm9sbG93JywgcGF0aHNwZWMob3B0LmZpbGUpKTtcbiAgIH1cblxuICAgYXBwZW5kVGFza09wdGlvbnModXNlck9wdGlvbnMob3B0IGFzIE9wdGlvbnMpLCBjb21tYW5kKTtcblxuICAgcmV0dXJuIHtcbiAgICAgIGZpZWxkcyxcbiAgICAgIHNwbGl0dGVyLFxuICAgICAgY29tbWFuZHM6IFsuLi5jb21tYW5kLCAuLi5zdWZmaXhdLFxuICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvZ1Rhc2s8VD4oXG4gICBzcGxpdHRlcjogc3RyaW5nLFxuICAgZmllbGRzOiBzdHJpbmdbXSxcbiAgIGN1c3RvbUFyZ3M6IHN0cmluZ1tdXG4pOiBTdHJpbmdUYXNrPExvZ1Jlc3VsdDxUPj4ge1xuICAgY29uc3QgcGFyc2VyID0gY3JlYXRlTGlzdExvZ1N1bW1hcnlQYXJzZXIoc3BsaXR0ZXIsIGZpZWxkcywgbG9nRm9ybWF0RnJvbUNvbW1hbmQoY3VzdG9tQXJncykpO1xuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHM6IFsnbG9nJywgLi4uY3VzdG9tQXJnc10sXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXIsXG4gICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKTogUGljazxTaW1wbGVHaXQsICdsb2cnPiB7XG4gICByZXR1cm4ge1xuICAgICAgbG9nPFQgZXh0ZW5kcyBPcHRpb25zPih0aGlzOiBTaW1wbGVHaXRBcGksIC4uLnJlc3Q6IHVua25vd25bXSkge1xuICAgICAgICAgY29uc3QgbmV4dCA9IHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpO1xuICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHBhcnNlTG9nT3B0aW9uczxUPihcbiAgICAgICAgICAgIHRyYWlsaW5nT3B0aW9uc0FyZ3VtZW50KGFyZ3VtZW50cyksXG4gICAgICAgICAgICBhc1N0cmluZ0FycmF5KGZpbHRlclR5cGUoYXJndW1lbnRzWzBdLCBmaWx0ZXJBcnJheSwgW10pKVxuICAgICAgICAgKTtcbiAgICAgICAgIGNvbnN0IHRhc2sgPVxuICAgICAgICAgICAgcmVqZWN0RGVwcmVjYXRlZFNpZ25hdHVyZXMoLi4ucmVzdCkgfHxcbiAgICAgICAgICAgIHZhbGlkYXRlTG9nRm9ybWF0Q29uZmlnKG9wdGlvbnMuY29tbWFuZHMpIHx8XG4gICAgICAgICAgICBjcmVhdGVMb2dUYXNrKG9wdGlvbnMpO1xuXG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayh0YXNrLCBuZXh0KTtcbiAgICAgIH0sXG4gICB9O1xuXG4gICBmdW5jdGlvbiBjcmVhdGVMb2dUYXNrKG9wdGlvbnM6IFBhcnNlZExvZ09wdGlvbnMpIHtcbiAgICAgIHJldHVybiBsb2dUYXNrKG9wdGlvbnMuc3BsaXR0ZXIsIG9wdGlvbnMuZmllbGRzLCBvcHRpb25zLmNvbW1hbmRzKTtcbiAgIH1cblxuICAgZnVuY3Rpb24gcmVqZWN0RGVwcmVjYXRlZFNpZ25hdHVyZXMoZnJvbT86IHVua25vd24sIHRvPzogdW5rbm93bikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgIGZpbHRlclN0cmluZyhmcm9tKSAmJlxuICAgICAgICAgZmlsdGVyU3RyaW5nKHRvKSAmJlxuICAgICAgICAgY29uZmlndXJhdGlvbkVycm9yVGFzayhcbiAgICAgICAgICAgIGBnaXQubG9nKHN0cmluZywgc3RyaW5nKSBzaG91bGQgYmUgcmVwbGFjZWQgd2l0aCBnaXQubG9nKHsgZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nIH0pYFxuICAgICAgICAgKVxuICAgICAgKTtcbiAgIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7XG4gICBNZXJnZUNvbmZsaWN0LFxuICAgTWVyZ2VDb25mbGljdERlbGV0aW9uLFxuICAgTWVyZ2VEZXRhaWwsXG4gICBNZXJnZVJlc3VsdFN0YXR1cyxcbn0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5cbmV4cG9ydCBjbGFzcyBNZXJnZVN1bW1hcnlDb25mbGljdCBpbXBsZW1lbnRzIE1lcmdlQ29uZmxpY3Qge1xuICAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgcmVhc29uOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgZmlsZTogc3RyaW5nIHwgbnVsbCA9IG51bGwsXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgbWV0YT86IE1lcmdlQ29uZmxpY3REZWxldGlvblxuICAgKSB7fVxuXG4gICB0b1N0cmluZygpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLmZpbGV9OiR7dGhpcy5yZWFzb259YDtcbiAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1lcmdlU3VtbWFyeURldGFpbCBpbXBsZW1lbnRzIE1lcmdlRGV0YWlsIHtcbiAgIHB1YmxpYyBjb25mbGljdHM6IE1lcmdlQ29uZmxpY3RbXSA9IFtdO1xuICAgcHVibGljIG1lcmdlczogc3RyaW5nW10gPSBbXTtcbiAgIHB1YmxpYyByZXN1bHQ6IE1lcmdlUmVzdWx0U3RhdHVzID0gJ3N1Y2Nlc3MnO1xuXG4gICBnZXQgZmFpbGVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmxpY3RzLmxlbmd0aCA+IDA7XG4gICB9XG5cbiAgIGdldCByZWFzb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XG4gICB9XG5cbiAgIHRvU3RyaW5nKCkge1xuICAgICAgaWYgKHRoaXMuY29uZmxpY3RzLmxlbmd0aCkge1xuICAgICAgICAgcmV0dXJuIGBDT05GTElDVFM6ICR7dGhpcy5jb25mbGljdHMuam9pbignLCAnKX1gO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJ09LJztcbiAgIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7XG4gICBQdWxsRGV0YWlsRmlsZUNoYW5nZXMsXG4gICBQdWxsRGV0YWlsU3VtbWFyeSxcbiAgIFB1bGxGYWlsZWRSZXN1bHQsXG4gICBQdWxsUmVzdWx0LFxufSBmcm9tICcuLi8uLi90eXBpbmdzJztcblxuZXhwb3J0IGNsYXNzIFB1bGxTdW1tYXJ5IGltcGxlbWVudHMgUHVsbFJlc3VsdCB7XG4gICBwdWJsaWMgcmVtb3RlTWVzc2FnZXMgPSB7XG4gICAgICBhbGw6IFtdLFxuICAgfTtcbiAgIHB1YmxpYyBjcmVhdGVkID0gW107XG4gICBwdWJsaWMgZGVsZXRlZDogc3RyaW5nW10gPSBbXTtcbiAgIHB1YmxpYyBmaWxlczogc3RyaW5nW10gPSBbXTtcbiAgIHB1YmxpYyBkZWxldGlvbnM6IFB1bGxEZXRhaWxGaWxlQ2hhbmdlcyA9IHt9O1xuICAgcHVibGljIGluc2VydGlvbnM6IFB1bGxEZXRhaWxGaWxlQ2hhbmdlcyA9IHt9O1xuICAgcHVibGljIHN1bW1hcnk6IFB1bGxEZXRhaWxTdW1tYXJ5ID0ge1xuICAgICAgY2hhbmdlczogMCxcbiAgICAgIGRlbGV0aW9uczogMCxcbiAgICAgIGluc2VydGlvbnM6IDAsXG4gICB9O1xufVxuXG5leHBvcnQgY2xhc3MgUHVsbEZhaWxlZFN1bW1hcnkgaW1wbGVtZW50cyBQdWxsRmFpbGVkUmVzdWx0IHtcbiAgIHJlbW90ZSA9ICcnO1xuICAgaGFzaCA9IHtcbiAgICAgIGxvY2FsOiAnJyxcbiAgICAgIHJlbW90ZTogJycsXG4gICB9O1xuICAgYnJhbmNoID0ge1xuICAgICAgbG9jYWw6ICcnLFxuICAgICAgcmVtb3RlOiAnJyxcbiAgIH07XG4gICBtZXNzYWdlID0gJyc7XG5cbiAgIHRvU3RyaW5nKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZTtcbiAgIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7XG4gICBSZW1vdGVNZXNzYWdlUmVzdWx0LFxuICAgUmVtb3RlTWVzc2FnZXMsXG4gICBSZW1vdGVNZXNzYWdlc09iamVjdEVudW1lcmF0aW9uLFxufSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IGFzTnVtYmVyLCBSZW1vdGVMaW5lUGFyc2VyIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5mdW5jdGlvbiBvYmplY3RFbnVtZXJhdGlvblJlc3VsdDxUIGV4dGVuZHMgUmVtb3RlTWVzc2FnZXMgPSBSZW1vdGVNZXNzYWdlcz4oXG4gICByZW1vdGVNZXNzYWdlczogVFxuKTogUmVtb3RlTWVzc2FnZXNPYmplY3RFbnVtZXJhdGlvbiB7XG4gICByZXR1cm4gKHJlbW90ZU1lc3NhZ2VzLm9iamVjdHMgPSByZW1vdGVNZXNzYWdlcy5vYmplY3RzIHx8IHtcbiAgICAgIGNvbXByZXNzaW5nOiAwLFxuICAgICAgY291bnRpbmc6IDAsXG4gICAgICBlbnVtZXJhdGluZzogMCxcbiAgICAgIHBhY2tSZXVzZWQ6IDAsXG4gICAgICByZXVzZWQ6IHsgY291bnQ6IDAsIGRlbHRhOiAwIH0sXG4gICAgICB0b3RhbDogeyBjb3VudDogMCwgZGVsdGE6IDAgfSxcbiAgIH0pO1xufVxuXG5mdW5jdGlvbiBhc09iamVjdENvdW50KHNvdXJjZTogc3RyaW5nKSB7XG4gICBjb25zdCBjb3VudCA9IC9eXFxzKihcXGQrKS8uZXhlYyhzb3VyY2UpO1xuICAgY29uc3QgZGVsdGEgPSAvZGVsdGEgKFxcZCspL2kuZXhlYyhzb3VyY2UpO1xuXG4gICByZXR1cm4ge1xuICAgICAgY291bnQ6IGFzTnVtYmVyKChjb3VudCAmJiBjb3VudFsxXSkgfHwgJzAnKSxcbiAgICAgIGRlbHRhOiBhc051bWJlcigoZGVsdGEgJiYgZGVsdGFbMV0pIHx8ICcwJyksXG4gICB9O1xufVxuXG5leHBvcnQgY29uc3QgcmVtb3RlTWVzc2FnZXNPYmplY3RQYXJzZXJzOiBSZW1vdGVMaW5lUGFyc2VyPFJlbW90ZU1lc3NhZ2VSZXN1bHQ8UmVtb3RlTWVzc2FnZXM+PltdID1cbiAgIFtcbiAgICAgIG5ldyBSZW1vdGVMaW5lUGFyc2VyKFxuICAgICAgICAgL15yZW1vdGU6XFxzKihlbnVtZXJhdGluZ3xjb3VudGluZ3xjb21wcmVzc2luZykgb2JqZWN0czogKFxcZCspLC9pLFxuICAgICAgICAgKHJlc3VsdCwgW2FjdGlvbiwgY291bnRdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSBhY3Rpb24udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IGVudW1lcmF0aW9uID0gb2JqZWN0RW51bWVyYXRpb25SZXN1bHQocmVzdWx0LnJlbW90ZU1lc3NhZ2VzKTtcblxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlbnVtZXJhdGlvbiwgeyBba2V5XTogYXNOdW1iZXIoY291bnQpIH0pO1xuICAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIG5ldyBSZW1vdGVMaW5lUGFyc2VyKFxuICAgICAgICAgL15yZW1vdGU6XFxzKihlbnVtZXJhdGluZ3xjb3VudGluZ3xjb21wcmVzc2luZykgb2JqZWN0czogXFxkKyUgXFwoXFxkK1xcLyhcXGQrKVxcKSwvaSxcbiAgICAgICAgIChyZXN1bHQsIFthY3Rpb24sIGNvdW50XSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gYWN0aW9uLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBjb25zdCBlbnVtZXJhdGlvbiA9IG9iamVjdEVudW1lcmF0aW9uUmVzdWx0KHJlc3VsdC5yZW1vdGVNZXNzYWdlcyk7XG5cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZW51bWVyYXRpb24sIHsgW2tleV06IGFzTnVtYmVyKGNvdW50KSB9KTtcbiAgICAgICAgIH1cbiAgICAgICksXG4gICAgICBuZXcgUmVtb3RlTGluZVBhcnNlcihcbiAgICAgICAgIC90b3RhbCAoW14sXSspLCByZXVzZWQgKFteLF0rKSwgcGFjay1yZXVzZWQgKFxcZCspL2ksXG4gICAgICAgICAocmVzdWx0LCBbdG90YWwsIHJldXNlZCwgcGFja1JldXNlZF0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9iamVjdHMgPSBvYmplY3RFbnVtZXJhdGlvblJlc3VsdChyZXN1bHQucmVtb3RlTWVzc2FnZXMpO1xuICAgICAgICAgICAgb2JqZWN0cy50b3RhbCA9IGFzT2JqZWN0Q291bnQodG90YWwpO1xuICAgICAgICAgICAgb2JqZWN0cy5yZXVzZWQgPSBhc09iamVjdENvdW50KHJldXNlZCk7XG4gICAgICAgICAgICBvYmplY3RzLnBhY2tSZXVzZWQgPSBhc051bWJlcihwYWNrUmV1c2VkKTtcbiAgICAgICAgIH1cbiAgICAgICksXG4gICBdO1xuIiwgImltcG9ydCB0eXBlIHsgUHVzaFJlc3VsdFJlbW90ZU1lc3NhZ2VzLCBSZW1vdGVNZXNzYWdlUmVzdWx0LCBSZW1vdGVNZXNzYWdlcyB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgYXNOdW1iZXIsIHBhcnNlU3RyaW5nUmVzcG9uc2UsIFJlbW90ZUxpbmVQYXJzZXIgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyByZW1vdGVNZXNzYWdlc09iamVjdFBhcnNlcnMgfSBmcm9tICcuL3BhcnNlLXJlbW90ZS1vYmplY3RzJztcblxuY29uc3QgcGFyc2VyczogUmVtb3RlTGluZVBhcnNlcjxSZW1vdGVNZXNzYWdlUmVzdWx0PFB1c2hSZXN1bHRSZW1vdGVNZXNzYWdlcyB8IFJlbW90ZU1lc3NhZ2VzPj5bXSA9XG4gICBbXG4gICAgICBuZXcgUmVtb3RlTGluZVBhcnNlcigvXnJlbW90ZTpcXHMqKC4rKSQvLCAocmVzdWx0LCBbdGV4dF0pID0+IHtcbiAgICAgICAgIHJlc3VsdC5yZW1vdGVNZXNzYWdlcy5hbGwucHVzaCh0ZXh0LnRyaW0oKSk7XG4gICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KSxcbiAgICAgIC4uLnJlbW90ZU1lc3NhZ2VzT2JqZWN0UGFyc2VycyxcbiAgICAgIG5ldyBSZW1vdGVMaW5lUGFyc2VyKFxuICAgICAgICAgWy9jcmVhdGUgYSAoPzpwdWxsfG1lcmdlKSByZXF1ZXN0L2ksIC9cXHMoaHR0cHM/OlxcL1xcL1xcUyspJC9dLFxuICAgICAgICAgKHJlc3VsdCwgW3B1bGxSZXF1ZXN0VXJsXSkgPT4ge1xuICAgICAgICAgICAgKHJlc3VsdC5yZW1vdGVNZXNzYWdlcyBhcyBQdXNoUmVzdWx0UmVtb3RlTWVzc2FnZXMpLnB1bGxSZXF1ZXN0VXJsID0gcHVsbFJlcXVlc3RVcmw7XG4gICAgICAgICB9XG4gICAgICApLFxuICAgICAgbmV3IFJlbW90ZUxpbmVQYXJzZXIoXG4gICAgICAgICBbL2ZvdW5kIChcXGQrKSB2dWxuZXJhYmlsaXRpZXMuK1xcKChbXildKylcXCkvaSwgL1xccyhodHRwcz86XFwvXFwvXFxTKykkL10sXG4gICAgICAgICAocmVzdWx0LCBbY291bnQsIHN1bW1hcnksIHVybF0pID0+IHtcbiAgICAgICAgICAgIChyZXN1bHQucmVtb3RlTWVzc2FnZXMgYXMgUHVzaFJlc3VsdFJlbW90ZU1lc3NhZ2VzKS52dWxuZXJhYmlsaXRpZXMgPSB7XG4gICAgICAgICAgICAgICBjb3VudDogYXNOdW1iZXIoY291bnQpLFxuICAgICAgICAgICAgICAgc3VtbWFyeSxcbiAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICB9XG4gICAgICApLFxuICAgXTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUmVtb3RlTWVzc2FnZXM8VCBleHRlbmRzIFJlbW90ZU1lc3NhZ2VzID0gUmVtb3RlTWVzc2FnZXM+KFxuICAgX3N0ZE91dDogc3RyaW5nLFxuICAgc3RkRXJyOiBzdHJpbmdcbik6IFJlbW90ZU1lc3NhZ2VSZXN1bHQge1xuICAgcmV0dXJuIHBhcnNlU3RyaW5nUmVzcG9uc2UoeyByZW1vdGVNZXNzYWdlczogbmV3IFJlbW90ZU1lc3NhZ2VTdW1tYXJ5KCkgYXMgVCB9LCBwYXJzZXJzLCBzdGRFcnIpO1xufVxuXG5leHBvcnQgY2xhc3MgUmVtb3RlTWVzc2FnZVN1bW1hcnkgaW1wbGVtZW50cyBSZW1vdGVNZXNzYWdlcyB7XG4gICBwdWJsaWMgcmVhZG9ubHkgYWxsOiBzdHJpbmdbXSA9IFtdO1xufVxuIiwgImltcG9ydCB0eXBlIHsgUHVsbERldGFpbCwgUHVsbEZhaWxlZFJlc3VsdCwgUHVsbFJlc3VsdCwgUmVtb3RlTWVzc2FnZXMgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IFB1bGxGYWlsZWRTdW1tYXJ5LCBQdWxsU3VtbWFyeSB9IGZyb20gJy4uL3Jlc3BvbnNlcy9QdWxsU3VtbWFyeSc7XG5pbXBvcnQgdHlwZSB7IFRhc2tQYXJzZXIgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBhcHBlbmQsIExpbmVQYXJzZXIsIHBhcnNlU3RyaW5nUmVzcG9uc2UgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBwYXJzZVJlbW90ZU1lc3NhZ2VzIH0gZnJvbSAnLi9wYXJzZS1yZW1vdGUtbWVzc2FnZXMnO1xuXG5jb25zdCBGSUxFX1VQREFURV9SRUdFWCA9IC9eXFxzKiguKz8pXFxzK1xcfFxccytcXGQrXFxzKihcXCsqKSgtKikvO1xuY29uc3QgU1VNTUFSWV9SRUdFWCA9IC8oXFxkKylcXEQrKChcXGQrKVxcRCtcXChcXCtcXCkpPyhcXEQrKFxcZCspXFxEK1xcKC1cXCkpPy87XG5jb25zdCBBQ1RJT05fUkVHRVggPSAvXihjcmVhdGV8ZGVsZXRlKSBtb2RlIFxcZCsgKC4rKS87XG5cbmNvbnN0IHBhcnNlcnM6IExpbmVQYXJzZXI8UHVsbFJlc3VsdD5bXSA9IFtcbiAgIG5ldyBMaW5lUGFyc2VyKEZJTEVfVVBEQVRFX1JFR0VYLCAocmVzdWx0LCBbZmlsZSwgaW5zZXJ0aW9ucywgZGVsZXRpb25zXSkgPT4ge1xuICAgICAgcmVzdWx0LmZpbGVzLnB1c2goZmlsZSk7XG5cbiAgICAgIGlmIChpbnNlcnRpb25zKSB7XG4gICAgICAgICByZXN1bHQuaW5zZXJ0aW9uc1tmaWxlXSA9IGluc2VydGlvbnMubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGVsZXRpb25zKSB7XG4gICAgICAgICByZXN1bHQuZGVsZXRpb25zW2ZpbGVdID0gZGVsZXRpb25zLmxlbmd0aDtcbiAgICAgIH1cbiAgIH0pLFxuICAgbmV3IExpbmVQYXJzZXIoU1VNTUFSWV9SRUdFWCwgKHJlc3VsdCwgW2NoYW5nZXMsICwgaW5zZXJ0aW9ucywgLCBkZWxldGlvbnNdKSA9PiB7XG4gICAgICBpZiAoaW5zZXJ0aW9ucyAhPT0gdW5kZWZpbmVkIHx8IGRlbGV0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICByZXN1bHQuc3VtbWFyeS5jaGFuZ2VzID0gK2NoYW5nZXMgfHwgMDtcbiAgICAgICAgIHJlc3VsdC5zdW1tYXJ5Lmluc2VydGlvbnMgPSAraW5zZXJ0aW9ucyB8fCAwO1xuICAgICAgICAgcmVzdWx0LnN1bW1hcnkuZGVsZXRpb25zID0gK2RlbGV0aW9ucyB8fCAwO1xuICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyKEFDVElPTl9SRUdFWCwgKHJlc3VsdCwgW2FjdGlvbiwgZmlsZV0pID0+IHtcbiAgICAgIGFwcGVuZChyZXN1bHQuZmlsZXMsIGZpbGUpO1xuICAgICAgYXBwZW5kKGFjdGlvbiA9PT0gJ2NyZWF0ZScgPyByZXN1bHQuY3JlYXRlZCA6IHJlc3VsdC5kZWxldGVkLCBmaWxlKTtcbiAgIH0pLFxuXTtcblxuY29uc3QgZXJyb3JQYXJzZXJzOiBMaW5lUGFyc2VyPFB1bGxGYWlsZWRSZXN1bHQ+W10gPSBbXG4gICBuZXcgTGluZVBhcnNlcigvXmZyb21cXHMoLispJC9pLCAocmVzdWx0LCBbcmVtb3RlXSkgPT4gdm9pZCAocmVzdWx0LnJlbW90ZSA9IHJlbW90ZSkpLFxuICAgbmV3IExpbmVQYXJzZXIoL15mYXRhbDpcXHMoLispJC8sIChyZXN1bHQsIFttZXNzYWdlXSkgPT4gdm9pZCAocmVzdWx0Lm1lc3NhZ2UgPSBtZXNzYWdlKSksXG4gICBuZXcgTGluZVBhcnNlcihcbiAgICAgIC8oW2EtejAtOV0rKVxcLlxcLihbYS16MC05XSspXFxzKyhcXFMrKVxccystPlxccysoXFxTKykkLyxcbiAgICAgIChyZXN1bHQsIFtoYXNoTG9jYWwsIGhhc2hSZW1vdGUsIGJyYW5jaExvY2FsLCBicmFuY2hSZW1vdGVdKSA9PiB7XG4gICAgICAgICByZXN1bHQuYnJhbmNoLmxvY2FsID0gYnJhbmNoTG9jYWw7XG4gICAgICAgICByZXN1bHQuaGFzaC5sb2NhbCA9IGhhc2hMb2NhbDtcbiAgICAgICAgIHJlc3VsdC5icmFuY2gucmVtb3RlID0gYnJhbmNoUmVtb3RlO1xuICAgICAgICAgcmVzdWx0Lmhhc2gucmVtb3RlID0gaGFzaFJlbW90ZTtcbiAgICAgIH1cbiAgICksXG5dO1xuXG5leHBvcnQgY29uc3QgcGFyc2VQdWxsRGV0YWlsOiBUYXNrUGFyc2VyPHN0cmluZywgUHVsbERldGFpbD4gPSAoc3RkT3V0LCBzdGRFcnIpID0+IHtcbiAgIHJldHVybiBwYXJzZVN0cmluZ1Jlc3BvbnNlKG5ldyBQdWxsU3VtbWFyeSgpLCBwYXJzZXJzLCBbc3RkT3V0LCBzdGRFcnJdKTtcbn07XG5cbmV4cG9ydCBjb25zdCBwYXJzZVB1bGxSZXN1bHQ6IFRhc2tQYXJzZXI8c3RyaW5nLCBQdWxsUmVzdWx0PiA9IChzdGRPdXQsIHN0ZEVycikgPT4ge1xuICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAgICBuZXcgUHVsbFN1bW1hcnkoKSxcbiAgICAgIHBhcnNlUHVsbERldGFpbChzdGRPdXQsIHN0ZEVyciksXG4gICAgICBwYXJzZVJlbW90ZU1lc3NhZ2VzPFJlbW90ZU1lc3NhZ2VzPihzdGRPdXQsIHN0ZEVycilcbiAgICk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VQdWxsRXJyb3JSZXN1bHQoc3RkT3V0OiBzdHJpbmcsIHN0ZEVycjogc3RyaW5nKSB7XG4gICBjb25zdCBwdWxsRXJyb3IgPSBwYXJzZVN0cmluZ1Jlc3BvbnNlKG5ldyBQdWxsRmFpbGVkU3VtbWFyeSgpLCBlcnJvclBhcnNlcnMsIFtzdGRPdXQsIHN0ZEVycl0pO1xuXG4gICByZXR1cm4gcHVsbEVycm9yLm1lc3NhZ2UgJiYgcHVsbEVycm9yO1xufVxuIiwgImltcG9ydCB0eXBlIHsgTWVyZ2VEZXRhaWwsIE1lcmdlUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBNZXJnZVN1bW1hcnlDb25mbGljdCwgTWVyZ2VTdW1tYXJ5RGV0YWlsIH0gZnJvbSAnLi4vcmVzcG9uc2VzL01lcmdlU3VtbWFyeSc7XG5pbXBvcnQgdHlwZSB7IFRhc2tQYXJzZXIgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBMaW5lUGFyc2VyLCBwYXJzZVN0cmluZ1Jlc3BvbnNlIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgcGFyc2VQdWxsUmVzdWx0IH0gZnJvbSAnLi9wYXJzZS1wdWxsJztcblxuY29uc3QgcGFyc2VyczogTGluZVBhcnNlcjxNZXJnZURldGFpbD5bXSA9IFtcbiAgIG5ldyBMaW5lUGFyc2VyKC9eQXV0by1tZXJnaW5nXFxzKyguKykkLywgKHN1bW1hcnksIFthdXRvTWVyZ2VdKSA9PiB7XG4gICAgICBzdW1tYXJ5Lm1lcmdlcy5wdXNoKGF1dG9NZXJnZSk7XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyKC9eQ09ORkxJQ1RcXHMrXFwoKC4rKVxcKTogTWVyZ2UgY29uZmxpY3QgaW4gKC4rKSQvLCAoc3VtbWFyeSwgW3JlYXNvbiwgZmlsZV0pID0+IHtcbiAgICAgIHN1bW1hcnkuY29uZmxpY3RzLnB1c2gobmV3IE1lcmdlU3VtbWFyeUNvbmZsaWN0KHJlYXNvbiwgZmlsZSkpO1xuICAgfSksXG4gICBuZXcgTGluZVBhcnNlcihcbiAgICAgIC9eQ09ORkxJQ1RcXHMrXFwoKC4rXFwvZGVsZXRlKVxcKTogKC4rKSBkZWxldGVkIGluICguKykgYW5kLyxcbiAgICAgIChzdW1tYXJ5LCBbcmVhc29uLCBmaWxlLCBkZWxldGVSZWZdKSA9PiB7XG4gICAgICAgICBzdW1tYXJ5LmNvbmZsaWN0cy5wdXNoKG5ldyBNZXJnZVN1bW1hcnlDb25mbGljdChyZWFzb24sIGZpbGUsIHsgZGVsZXRlUmVmIH0pKTtcbiAgICAgIH1cbiAgICksXG4gICBuZXcgTGluZVBhcnNlcigvXkNPTkZMSUNUXFxzK1xcKCguKylcXCk6LywgKHN1bW1hcnksIFtyZWFzb25dKSA9PiB7XG4gICAgICBzdW1tYXJ5LmNvbmZsaWN0cy5wdXNoKG5ldyBNZXJnZVN1bW1hcnlDb25mbGljdChyZWFzb24sIG51bGwpKTtcbiAgIH0pLFxuICAgbmV3IExpbmVQYXJzZXIoL15BdXRvbWF0aWMgbWVyZ2UgZmFpbGVkO1xccysoLispJC8sIChzdW1tYXJ5LCBbcmVzdWx0XSkgPT4ge1xuICAgICAgc3VtbWFyeS5yZXN1bHQgPSByZXN1bHQ7XG4gICB9KSxcbl07XG5cbi8qKlxuICogUGFyc2UgdGhlIGNvbXBsZXRlIHJlc3BvbnNlIGZyb20gYGdpdC5tZXJnZWBcbiAqL1xuZXhwb3J0IGNvbnN0IHBhcnNlTWVyZ2VSZXN1bHQ6IFRhc2tQYXJzZXI8c3RyaW5nLCBNZXJnZVJlc3VsdD4gPSAoc3RkT3V0LCBzdGRFcnIpID0+IHtcbiAgIHJldHVybiBPYmplY3QuYXNzaWduKHBhcnNlTWVyZ2VEZXRhaWwoc3RkT3V0LCBzdGRFcnIpLCBwYXJzZVB1bGxSZXN1bHQoc3RkT3V0LCBzdGRFcnIpKTtcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIG1lcmdlIHNwZWNpZmljIGRldGFpbCAoaWU6IG5vdCB0aGUgY29udGVudCBhbHNvIGF2YWlsYWJsZSBpbiB0aGUgcHVsbCBkZXRhaWwpIGZyb20gYGdpdC5tbmVyZ2VgXG4gKiBAcGFyYW0gc3RkT3V0XG4gKi9cbmV4cG9ydCBjb25zdCBwYXJzZU1lcmdlRGV0YWlsOiBUYXNrUGFyc2VyPHN0cmluZywgTWVyZ2VEZXRhaWw+ID0gKHN0ZE91dCkgPT4ge1xuICAgcmV0dXJuIHBhcnNlU3RyaW5nUmVzcG9uc2UobmV3IE1lcmdlU3VtbWFyeURldGFpbCgpLCBwYXJzZXJzLCBzdGRPdXQpO1xufTtcbiIsICJpbXBvcnQgdHlwZSB7IE1lcmdlUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBHaXRSZXNwb25zZUVycm9yIH0gZnJvbSAnLi4vZXJyb3JzL2dpdC1yZXNwb25zZS1lcnJvcic7XG5pbXBvcnQgeyBwYXJzZU1lcmdlUmVzdWx0IH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZS1tZXJnZSc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBjb25maWd1cmF0aW9uRXJyb3JUYXNrLCB0eXBlIEVtcHR5VGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVRhc2soY3VzdG9tQXJnczogc3RyaW5nW10pOiBFbXB0eVRhc2sgfCBTdHJpbmdUYXNrPE1lcmdlUmVzdWx0PiB7XG4gICBpZiAoIWN1c3RvbUFyZ3MubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gY29uZmlndXJhdGlvbkVycm9yVGFzaygnR2l0Lm1lcmdlIHJlcXVpcmVzIGF0IGxlYXN0IG9uZSBvcHRpb24nKTtcbiAgIH1cblxuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzOiBbJ21lcmdlJywgLi4uY3VzdG9tQXJnc10sXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXIoc3RkT3V0LCBzdGRFcnIpOiBNZXJnZVJlc3VsdCB7XG4gICAgICAgICBjb25zdCBtZXJnZSA9IHBhcnNlTWVyZ2VSZXN1bHQoc3RkT3V0LCBzdGRFcnIpO1xuICAgICAgICAgaWYgKG1lcmdlLmZhaWxlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdpdFJlc3BvbnNlRXJyb3IobWVyZ2UpO1xuICAgICAgICAgfVxuXG4gICAgICAgICByZXR1cm4gbWVyZ2U7XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7XG4gICBQdXNoRGV0YWlsLFxuICAgUHVzaFJlc3VsdCxcbiAgIFB1c2hSZXN1bHRQdXNoZWRJdGVtLFxuICAgUHVzaFJlc3VsdFJlbW90ZU1lc3NhZ2VzLFxufSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB0eXBlIHsgVGFza1BhcnNlciB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IExpbmVQYXJzZXIsIHBhcnNlU3RyaW5nUmVzcG9uc2UgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBwYXJzZVJlbW90ZU1lc3NhZ2VzIH0gZnJvbSAnLi9wYXJzZS1yZW1vdGUtbWVzc2FnZXMnO1xuXG5mdW5jdGlvbiBwdXNoUmVzdWx0UHVzaGVkSXRlbShsb2NhbDogc3RyaW5nLCByZW1vdGU6IHN0cmluZywgc3RhdHVzOiBzdHJpbmcpOiBQdXNoUmVzdWx0UHVzaGVkSXRlbSB7XG4gICBjb25zdCBkZWxldGVkID0gc3RhdHVzLmluY2x1ZGVzKCdkZWxldGVkJyk7XG4gICBjb25zdCB0YWcgPSBzdGF0dXMuaW5jbHVkZXMoJ3RhZycpIHx8IC9ecmVmc1xcL3RhZ3MvLnRlc3QobG9jYWwpO1xuICAgY29uc3QgYWxyZWFkeVVwZGF0ZWQgPSAhc3RhdHVzLmluY2x1ZGVzKCduZXcnKTtcblxuICAgcmV0dXJuIHtcbiAgICAgIGRlbGV0ZWQsXG4gICAgICB0YWcsXG4gICAgICBicmFuY2g6ICF0YWcsXG4gICAgICBuZXc6ICFhbHJlYWR5VXBkYXRlZCxcbiAgICAgIGFscmVhZHlVcGRhdGVkLFxuICAgICAgbG9jYWwsXG4gICAgICByZW1vdGUsXG4gICB9O1xufVxuXG5jb25zdCBwYXJzZXJzOiBMaW5lUGFyc2VyPFB1c2hEZXRhaWw+W10gPSBbXG4gICBuZXcgTGluZVBhcnNlcigvXlB1c2hpbmcgdG8gKC4rKSQvLCAocmVzdWx0LCBbcmVwb10pID0+IHtcbiAgICAgIHJlc3VsdC5yZXBvID0gcmVwbztcbiAgIH0pLFxuICAgbmV3IExpbmVQYXJzZXIoL151cGRhdGluZyBsb2NhbCB0cmFja2luZyByZWYgJyguKyknLywgKHJlc3VsdCwgW2xvY2FsXSkgPT4ge1xuICAgICAgcmVzdWx0LnJlZiA9IHtcbiAgICAgICAgIC4uLihyZXN1bHQucmVmIHx8IHt9KSxcbiAgICAgICAgIGxvY2FsLFxuICAgICAgfTtcbiAgIH0pLFxuICAgbmV3IExpbmVQYXJzZXIoL15bPSotXVxccysoW146XSspOihcXFMrKVxccytcXFsoLispXSQvLCAocmVzdWx0LCBbbG9jYWwsIHJlbW90ZSwgdHlwZV0pID0+IHtcbiAgICAgIHJlc3VsdC5wdXNoZWQucHVzaChwdXNoUmVzdWx0UHVzaGVkSXRlbShsb2NhbCwgcmVtb3RlLCB0eXBlKSk7XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyKFxuICAgICAgL15CcmFuY2ggJyhbXiddKyknIHNldCB1cCB0byB0cmFjayByZW1vdGUgYnJhbmNoICcoW14nXSspJyBmcm9tICcoW14nXSspJy8sXG4gICAgICAocmVzdWx0LCBbbG9jYWwsIHJlbW90ZSwgcmVtb3RlTmFtZV0pID0+IHtcbiAgICAgICAgIHJlc3VsdC5icmFuY2ggPSB7XG4gICAgICAgICAgICAuLi4ocmVzdWx0LmJyYW5jaCB8fCB7fSksXG4gICAgICAgICAgICBsb2NhbCxcbiAgICAgICAgICAgIHJlbW90ZSxcbiAgICAgICAgICAgIHJlbW90ZU5hbWUsXG4gICAgICAgICB9O1xuICAgICAgfVxuICAgKSxcbiAgIG5ldyBMaW5lUGFyc2VyKFxuICAgICAgL14oW146XSspOihcXFMrKVxccysoW2EtejAtOV0rKVxcLlxcLihbYS16MC05XSspJC8sXG4gICAgICAocmVzdWx0LCBbbG9jYWwsIHJlbW90ZSwgZnJvbSwgdG9dKSA9PiB7XG4gICAgICAgICByZXN1bHQudXBkYXRlID0ge1xuICAgICAgICAgICAgaGVhZDoge1xuICAgICAgICAgICAgICAgbG9jYWwsXG4gICAgICAgICAgICAgICByZW1vdGUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGFzaDoge1xuICAgICAgICAgICAgICAgZnJvbSxcbiAgICAgICAgICAgICAgIHRvLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgIH07XG4gICAgICB9XG4gICApLFxuXTtcblxuZXhwb3J0IGNvbnN0IHBhcnNlUHVzaFJlc3VsdDogVGFza1BhcnNlcjxzdHJpbmcsIFB1c2hSZXN1bHQ+ID0gKHN0ZE91dCwgc3RkRXJyKSA9PiB7XG4gICBjb25zdCBwdXNoRGV0YWlsID0gcGFyc2VQdXNoRGV0YWlsKHN0ZE91dCwgc3RkRXJyKTtcbiAgIGNvbnN0IHJlc3BvbnNlRGV0YWlsID0gcGFyc2VSZW1vdGVNZXNzYWdlczxQdXNoUmVzdWx0UmVtb3RlTWVzc2FnZXM+KHN0ZE91dCwgc3RkRXJyKTtcblxuICAgcmV0dXJuIHtcbiAgICAgIC4uLnB1c2hEZXRhaWwsXG4gICAgICAuLi5yZXNwb25zZURldGFpbCxcbiAgIH07XG59O1xuXG5leHBvcnQgY29uc3QgcGFyc2VQdXNoRGV0YWlsOiBUYXNrUGFyc2VyPHN0cmluZywgUHVzaERldGFpbD4gPSAoc3RkT3V0LCBzdGRFcnIpID0+IHtcbiAgIHJldHVybiBwYXJzZVN0cmluZ1Jlc3BvbnNlKHsgcHVzaGVkOiBbXSB9LCBwYXJzZXJzLCBbc3RkT3V0LCBzdGRFcnJdKTtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBQdXNoUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBwYXJzZVB1c2hSZXN1bHQgYXMgcGFyc2VyIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZS1wdXNoJztcbmltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGFwcGVuZCwgcmVtb3ZlIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG50eXBlIFB1c2hSZWYgPSB7IHJlbW90ZT86IHN0cmluZzsgYnJhbmNoPzogc3RyaW5nIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBwdXNoVGFnc1Rhc2socmVmOiBQdXNoUmVmID0ge30sIGN1c3RvbUFyZ3M6IHN0cmluZ1tdKTogU3RyaW5nVGFzazxQdXNoUmVzdWx0PiB7XG4gICBhcHBlbmQoY3VzdG9tQXJncywgJy0tdGFncycpO1xuICAgcmV0dXJuIHB1c2hUYXNrKHJlZiwgY3VzdG9tQXJncyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwdXNoVGFzayhyZWY6IFB1c2hSZWYgPSB7fSwgY3VzdG9tQXJnczogc3RyaW5nW10pOiBTdHJpbmdUYXNrPFB1c2hSZXN1bHQ+IHtcbiAgIGNvbnN0IGNvbW1hbmRzID0gWydwdXNoJywgLi4uY3VzdG9tQXJnc107XG4gICBpZiAocmVmLmJyYW5jaCkge1xuICAgICAgY29tbWFuZHMuc3BsaWNlKDEsIDAsIHJlZi5icmFuY2gpO1xuICAgfVxuICAgaWYgKHJlZi5yZW1vdGUpIHtcbiAgICAgIGNvbW1hbmRzLnNwbGljZSgxLCAwLCByZWYucmVtb3RlKTtcbiAgIH1cblxuICAgcmVtb3ZlKGNvbW1hbmRzLCAnLXYnKTtcbiAgIGFwcGVuZChjb21tYW5kcywgJy0tdmVyYm9zZScpO1xuICAgYXBwZW5kKGNvbW1hbmRzLCAnLS1wb3JjZWxhaW4nKTtcblxuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgcGFyc2VyLFxuICAgfTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFNpbXBsZUdpdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRBcGkgfSBmcm9tICcuLi9zaW1wbGUtZ2l0LWFwaSc7XG5pbXBvcnQgeyBnZXRUcmFpbGluZ09wdGlvbnMsIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IHN0cmFpZ2h0VGhyb3VnaEJ1ZmZlclRhc2ssIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKTogUGljazxTaW1wbGVHaXQsICdzaG93QnVmZmVyJyB8ICdzaG93Jz4ge1xuICAgcmV0dXJuIHtcbiAgICAgIHNob3dCdWZmZXIodGhpczogU2ltcGxlR2l0QXBpKSB7XG4gICAgICAgICBjb25zdCBjb21tYW5kcyA9IFsnc2hvdycsIC4uLmdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMsIDEpXTtcbiAgICAgICAgIGlmICghY29tbWFuZHMuaW5jbHVkZXMoJy0tYmluYXJ5JykpIHtcbiAgICAgICAgICAgIGNvbW1hbmRzLnNwbGljZSgxLCAwLCAnLS1iaW5hcnknKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICAgICBzdHJhaWdodFRocm91Z2hCdWZmZXJUYXNrKGNvbW1hbmRzKSxcbiAgICAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICAgICApO1xuICAgICAgfSxcblxuICAgICAgc2hvdyh0aGlzOiBTaW1wbGVHaXRBcGkpIHtcbiAgICAgICAgIGNvbnN0IGNvbW1hbmRzID0gWydzaG93JywgLi4uZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cywgMSldO1xuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICAgICBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKGNvbW1hbmRzKSxcbiAgICAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICAgICApO1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBGaWxlU3RhdHVzUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5cbmV4cG9ydCBjb25zdCBmcm9tUGF0aFJlZ2V4ID0gL14oLispXFwwKC4rKSQvO1xuXG5leHBvcnQgY2xhc3MgRmlsZVN0YXR1c1N1bW1hcnkgaW1wbGVtZW50cyBGaWxlU3RhdHVzUmVzdWx0IHtcbiAgIHB1YmxpYyByZWFkb25seSBmcm9tOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHBhdGg6IHN0cmluZyxcbiAgICAgIHB1YmxpYyBpbmRleDogc3RyaW5nLFxuICAgICAgcHVibGljIHdvcmtpbmdfZGlyOiBzdHJpbmdcbiAgICkge1xuICAgICAgaWYgKGluZGV4ID09PSAnUicgfHwgd29ya2luZ19kaXIgPT09ICdSJykge1xuICAgICAgICAgY29uc3QgZGV0YWlsID0gZnJvbVBhdGhSZWdleC5leGVjKHBhdGgpIHx8IFtudWxsLCBwYXRoLCBwYXRoXTtcbiAgICAgICAgIHRoaXMuZnJvbSA9IGRldGFpbFsyXSB8fCAnJztcbiAgICAgICAgIHRoaXMucGF0aCA9IGRldGFpbFsxXSB8fCAnJztcbiAgICAgIH1cbiAgIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IFN0YXR1c1Jlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgZmlsdGVyU3RyaW5nLCBmaWx0ZXJUeXBlLCBOVUxMIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgRmlsZVN0YXR1c1N1bW1hcnkgfSBmcm9tICcuL0ZpbGVTdGF0dXNTdW1tYXJ5JztcblxudHlwZSBTdGF0dXNMaW5lUGFyc2VyID0gKHJlc3VsdDogU3RhdHVzUmVzdWx0LCBmaWxlOiBzdHJpbmcpID0+IHZvaWQ7XG5cbmV4cG9ydCBjbGFzcyBTdGF0dXNTdW1tYXJ5IGltcGxlbWVudHMgU3RhdHVzUmVzdWx0IHtcbiAgIHB1YmxpYyBub3RfYWRkZWQgPSBbXTtcbiAgIHB1YmxpYyBjb25mbGljdGVkID0gW107XG4gICBwdWJsaWMgY3JlYXRlZCA9IFtdO1xuICAgcHVibGljIGRlbGV0ZWQgPSBbXTtcbiAgIHB1YmxpYyBpZ25vcmVkID0gdW5kZWZpbmVkO1xuICAgcHVibGljIG1vZGlmaWVkID0gW107XG4gICBwdWJsaWMgcmVuYW1lZCA9IFtdO1xuICAgcHVibGljIGZpbGVzID0gW107XG4gICBwdWJsaWMgc3RhZ2VkID0gW107XG4gICBwdWJsaWMgYWhlYWQgPSAwO1xuICAgcHVibGljIGJlaGluZCA9IDA7XG4gICBwdWJsaWMgY3VycmVudCA9IG51bGw7XG4gICBwdWJsaWMgdHJhY2tpbmcgPSBudWxsO1xuICAgcHVibGljIGRldGFjaGVkID0gZmFsc2U7XG5cbiAgIHB1YmxpYyBpc0NsZWFuID0gKCkgPT4ge1xuICAgICAgcmV0dXJuICF0aGlzLmZpbGVzLmxlbmd0aDtcbiAgIH07XG59XG5cbmVudW0gUG9yY2VsYWluRmlsZVN0YXR1cyB7XG4gICBBRERFRCA9ICdBJyxcbiAgIERFTEVURUQgPSAnRCcsXG4gICBNT0RJRklFRCA9ICdNJyxcbiAgIFJFTkFNRUQgPSAnUicsXG4gICBDT1BJRUQgPSAnQycsXG4gICBVTk1FUkdFRCA9ICdVJyxcbiAgIFVOVFJBQ0tFRCA9ICc/JyxcbiAgIElHTk9SRUQgPSAnIScsXG4gICBOT05FID0gJyAnLFxufVxuXG5mdW5jdGlvbiByZW5hbWVkRmlsZShsaW5lOiBzdHJpbmcpIHtcbiAgIGNvbnN0IFt0bywgZnJvbV0gPSBsaW5lLnNwbGl0KE5VTEwpO1xuXG4gICByZXR1cm4ge1xuICAgICAgZnJvbTogZnJvbSB8fCB0byxcbiAgICAgIHRvLFxuICAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VyKFxuICAgaW5kZXhYOiBQb3JjZWxhaW5GaWxlU3RhdHVzLFxuICAgaW5kZXhZOiBQb3JjZWxhaW5GaWxlU3RhdHVzLFxuICAgaGFuZGxlcjogU3RhdHVzTGluZVBhcnNlclxuKTogW3N0cmluZywgU3RhdHVzTGluZVBhcnNlcl0ge1xuICAgcmV0dXJuIFtgJHtpbmRleFh9JHtpbmRleFl9YCwgaGFuZGxlcl07XG59XG5cbmZ1bmN0aW9uIGNvbmZsaWN0cyhpbmRleFg6IFBvcmNlbGFpbkZpbGVTdGF0dXMsIC4uLmluZGV4WTogUG9yY2VsYWluRmlsZVN0YXR1c1tdKSB7XG4gICByZXR1cm4gaW5kZXhZLm1hcCgoeSkgPT4gcGFyc2VyKGluZGV4WCwgeSwgKHJlc3VsdCwgZmlsZSkgPT4gcmVzdWx0LmNvbmZsaWN0ZWQucHVzaChmaWxlKSkpO1xufVxuXG5jb25zdCBwYXJzZXJzOiBNYXA8c3RyaW5nLCBTdGF0dXNMaW5lUGFyc2VyPiA9IG5ldyBNYXAoW1xuICAgcGFyc2VyKFBvcmNlbGFpbkZpbGVTdGF0dXMuTk9ORSwgUG9yY2VsYWluRmlsZVN0YXR1cy5BRERFRCwgKHJlc3VsdCwgZmlsZSkgPT5cbiAgICAgIHJlc3VsdC5jcmVhdGVkLnB1c2goZmlsZSlcbiAgICksXG4gICBwYXJzZXIoUG9yY2VsYWluRmlsZVN0YXR1cy5OT05FLCBQb3JjZWxhaW5GaWxlU3RhdHVzLkRFTEVURUQsIChyZXN1bHQsIGZpbGUpID0+XG4gICAgICByZXN1bHQuZGVsZXRlZC5wdXNoKGZpbGUpXG4gICApLFxuICAgcGFyc2VyKFBvcmNlbGFpbkZpbGVTdGF0dXMuTk9ORSwgUG9yY2VsYWluRmlsZVN0YXR1cy5NT0RJRklFRCwgKHJlc3VsdCwgZmlsZSkgPT5cbiAgICAgIHJlc3VsdC5tb2RpZmllZC5wdXNoKGZpbGUpXG4gICApLFxuXG4gICBwYXJzZXIoUG9yY2VsYWluRmlsZVN0YXR1cy5BRERFRCwgUG9yY2VsYWluRmlsZVN0YXR1cy5OT05FLCAocmVzdWx0LCBmaWxlKSA9PiB7XG4gICAgICByZXN1bHQuY3JlYXRlZC5wdXNoKGZpbGUpO1xuICAgICAgcmVzdWx0LnN0YWdlZC5wdXNoKGZpbGUpO1xuICAgfSksXG4gICBwYXJzZXIoUG9yY2VsYWluRmlsZVN0YXR1cy5BRERFRCwgUG9yY2VsYWluRmlsZVN0YXR1cy5NT0RJRklFRCwgKHJlc3VsdCwgZmlsZSkgPT4ge1xuICAgICAgcmVzdWx0LmNyZWF0ZWQucHVzaChmaWxlKTtcbiAgICAgIHJlc3VsdC5zdGFnZWQucHVzaChmaWxlKTtcbiAgICAgIHJlc3VsdC5tb2RpZmllZC5wdXNoKGZpbGUpO1xuICAgfSksXG5cbiAgIHBhcnNlcihQb3JjZWxhaW5GaWxlU3RhdHVzLkRFTEVURUQsIFBvcmNlbGFpbkZpbGVTdGF0dXMuTk9ORSwgKHJlc3VsdCwgZmlsZSkgPT4ge1xuICAgICAgcmVzdWx0LmRlbGV0ZWQucHVzaChmaWxlKTtcbiAgICAgIHJlc3VsdC5zdGFnZWQucHVzaChmaWxlKTtcbiAgIH0pLFxuXG4gICBwYXJzZXIoUG9yY2VsYWluRmlsZVN0YXR1cy5NT0RJRklFRCwgUG9yY2VsYWluRmlsZVN0YXR1cy5OT05FLCAocmVzdWx0LCBmaWxlKSA9PiB7XG4gICAgICByZXN1bHQubW9kaWZpZWQucHVzaChmaWxlKTtcbiAgICAgIHJlc3VsdC5zdGFnZWQucHVzaChmaWxlKTtcbiAgIH0pLFxuICAgcGFyc2VyKFBvcmNlbGFpbkZpbGVTdGF0dXMuTU9ESUZJRUQsIFBvcmNlbGFpbkZpbGVTdGF0dXMuTU9ESUZJRUQsIChyZXN1bHQsIGZpbGUpID0+IHtcbiAgICAgIHJlc3VsdC5tb2RpZmllZC5wdXNoKGZpbGUpO1xuICAgICAgcmVzdWx0LnN0YWdlZC5wdXNoKGZpbGUpO1xuICAgfSksXG5cbiAgIHBhcnNlcihQb3JjZWxhaW5GaWxlU3RhdHVzLlJFTkFNRUQsIFBvcmNlbGFpbkZpbGVTdGF0dXMuTk9ORSwgKHJlc3VsdCwgZmlsZSkgPT4ge1xuICAgICAgcmVzdWx0LnJlbmFtZWQucHVzaChyZW5hbWVkRmlsZShmaWxlKSk7XG4gICB9KSxcbiAgIHBhcnNlcihQb3JjZWxhaW5GaWxlU3RhdHVzLlJFTkFNRUQsIFBvcmNlbGFpbkZpbGVTdGF0dXMuTU9ESUZJRUQsIChyZXN1bHQsIGZpbGUpID0+IHtcbiAgICAgIGNvbnN0IHJlbmFtZWQgPSByZW5hbWVkRmlsZShmaWxlKTtcbiAgICAgIHJlc3VsdC5yZW5hbWVkLnB1c2gocmVuYW1lZCk7XG4gICAgICByZXN1bHQubW9kaWZpZWQucHVzaChyZW5hbWVkLnRvKTtcbiAgIH0pLFxuICAgcGFyc2VyKFBvcmNlbGFpbkZpbGVTdGF0dXMuSUdOT1JFRCwgUG9yY2VsYWluRmlsZVN0YXR1cy5JR05PUkVELCAoX3Jlc3VsdCwgX2ZpbGUpID0+IHtcbiAgICAgIChfcmVzdWx0Lmlnbm9yZWQgPSBfcmVzdWx0Lmlnbm9yZWQgfHwgW10pLnB1c2goX2ZpbGUpO1xuICAgfSksXG5cbiAgIHBhcnNlcihQb3JjZWxhaW5GaWxlU3RhdHVzLlVOVFJBQ0tFRCwgUG9yY2VsYWluRmlsZVN0YXR1cy5VTlRSQUNLRUQsIChyZXN1bHQsIGZpbGUpID0+XG4gICAgICByZXN1bHQubm90X2FkZGVkLnB1c2goZmlsZSlcbiAgICksXG5cbiAgIC4uLmNvbmZsaWN0cyhQb3JjZWxhaW5GaWxlU3RhdHVzLkFEREVELCBQb3JjZWxhaW5GaWxlU3RhdHVzLkFEREVELCBQb3JjZWxhaW5GaWxlU3RhdHVzLlVOTUVSR0VEKSxcbiAgIC4uLmNvbmZsaWN0cyhcbiAgICAgIFBvcmNlbGFpbkZpbGVTdGF0dXMuREVMRVRFRCxcbiAgICAgIFBvcmNlbGFpbkZpbGVTdGF0dXMuREVMRVRFRCxcbiAgICAgIFBvcmNlbGFpbkZpbGVTdGF0dXMuVU5NRVJHRURcbiAgICksXG4gICAuLi5jb25mbGljdHMoXG4gICAgICBQb3JjZWxhaW5GaWxlU3RhdHVzLlVOTUVSR0VELFxuICAgICAgUG9yY2VsYWluRmlsZVN0YXR1cy5BRERFRCxcbiAgICAgIFBvcmNlbGFpbkZpbGVTdGF0dXMuREVMRVRFRCxcbiAgICAgIFBvcmNlbGFpbkZpbGVTdGF0dXMuVU5NRVJHRURcbiAgICksXG5cbiAgIFtcbiAgICAgICcjIycsXG4gICAgICAocmVzdWx0LCBsaW5lKSA9PiB7XG4gICAgICAgICBjb25zdCBhaGVhZFJlZyA9IC9haGVhZCAoXFxkKykvO1xuICAgICAgICAgY29uc3QgYmVoaW5kUmVnID0gL2JlaGluZCAoXFxkKykvO1xuICAgICAgICAgY29uc3QgY3VycmVudFJlZyA9IC9eKC4rPyg/PSg/OlxcLnszfXxcXHN8JCkpKS87XG4gICAgICAgICBjb25zdCB0cmFja2luZ1JlZyA9IC9cXC57M30oXFxTKikvO1xuICAgICAgICAgY29uc3Qgb25FbXB0eUJyYW5jaFJlZyA9IC9cXHNvblxccyhcXFMrPykoPz1cXC57M318JCkvO1xuXG4gICAgICAgICBsZXQgcmVnZXhSZXN1bHQgPSBhaGVhZFJlZy5leGVjKGxpbmUpO1xuICAgICAgICAgcmVzdWx0LmFoZWFkID0gKHJlZ2V4UmVzdWx0ICYmICtyZWdleFJlc3VsdFsxXSkgfHwgMDtcblxuICAgICAgICAgcmVnZXhSZXN1bHQgPSBiZWhpbmRSZWcuZXhlYyhsaW5lKTtcbiAgICAgICAgIHJlc3VsdC5iZWhpbmQgPSAocmVnZXhSZXN1bHQgJiYgK3JlZ2V4UmVzdWx0WzFdKSB8fCAwO1xuXG4gICAgICAgICByZWdleFJlc3VsdCA9IGN1cnJlbnRSZWcuZXhlYyhsaW5lKTtcbiAgICAgICAgIHJlc3VsdC5jdXJyZW50ID0gZmlsdGVyVHlwZShyZWdleFJlc3VsdD8uWzFdLCBmaWx0ZXJTdHJpbmcsIG51bGwpO1xuXG4gICAgICAgICByZWdleFJlc3VsdCA9IHRyYWNraW5nUmVnLmV4ZWMobGluZSk7XG4gICAgICAgICByZXN1bHQudHJhY2tpbmcgPSBmaWx0ZXJUeXBlKHJlZ2V4UmVzdWx0Py5bMV0sIGZpbHRlclN0cmluZywgbnVsbCk7XG5cbiAgICAgICAgIHJlZ2V4UmVzdWx0ID0gb25FbXB0eUJyYW5jaFJlZy5leGVjKGxpbmUpO1xuICAgICAgICAgaWYgKHJlZ2V4UmVzdWx0KSB7XG4gICAgICAgICAgICByZXN1bHQuY3VycmVudCA9IGZpbHRlclR5cGUocmVnZXhSZXN1bHQ/LlsxXSwgZmlsdGVyU3RyaW5nLCByZXN1bHQuY3VycmVudCk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHJlc3VsdC5kZXRhY2hlZCA9IC9cXChubyBicmFuY2hcXCkvLnRlc3QobGluZSk7XG4gICAgICB9LFxuICAgXSxcbl0pO1xuXG5leHBvcnQgY29uc3QgcGFyc2VTdGF0dXNTdW1tYXJ5ID0gZnVuY3Rpb24gKHRleHQ6IHN0cmluZyk6IFN0YXR1c1Jlc3VsdCB7XG4gICBjb25zdCBsaW5lcyA9IHRleHQuc3BsaXQoTlVMTCk7XG4gICBjb25zdCBzdGF0dXMgPSBuZXcgU3RhdHVzU3VtbWFyeSgpO1xuXG4gICBmb3IgKGxldCBpID0gMCwgbCA9IGxpbmVzLmxlbmd0aDsgaSA8IGw7ICkge1xuICAgICAgbGV0IGxpbmUgPSBsaW5lc1tpKytdLnRyaW0oKTtcblxuICAgICAgaWYgKCFsaW5lKSB7XG4gICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGxpbmUuY2hhckF0KDApID09PSBQb3JjZWxhaW5GaWxlU3RhdHVzLlJFTkFNRUQpIHtcbiAgICAgICAgIGxpbmUgKz0gTlVMTCArIChsaW5lc1tpKytdIHx8ICcnKTtcbiAgICAgIH1cblxuICAgICAgc3BsaXRMaW5lKHN0YXR1cywgbGluZSk7XG4gICB9XG5cbiAgIHJldHVybiBzdGF0dXM7XG59O1xuXG5mdW5jdGlvbiBzcGxpdExpbmUocmVzdWx0OiBTdGF0dXNSZXN1bHQsIGxpbmVTdHI6IHN0cmluZykge1xuICAgY29uc3QgdHJpbW1lZCA9IGxpbmVTdHIudHJpbSgpO1xuICAgc3dpdGNoICgnICcpIHtcbiAgICAgIGNhc2UgdHJpbW1lZC5jaGFyQXQoMik6XG4gICAgICAgICByZXR1cm4gZGF0YSh0cmltbWVkLmNoYXJBdCgwKSwgdHJpbW1lZC5jaGFyQXQoMSksIHRyaW1tZWQuc2xpY2UoMykpO1xuICAgICAgY2FzZSB0cmltbWVkLmNoYXJBdCgxKTpcbiAgICAgICAgIHJldHVybiBkYXRhKFBvcmNlbGFpbkZpbGVTdGF0dXMuTk9ORSwgdHJpbW1lZC5jaGFyQXQoMCksIHRyaW1tZWQuc2xpY2UoMikpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgIHJldHVybjtcbiAgIH1cblxuICAgZnVuY3Rpb24gZGF0YShpbmRleDogc3RyaW5nLCB3b3JraW5nRGlyOiBzdHJpbmcsIHBhdGg6IHN0cmluZykge1xuICAgICAgY29uc3QgcmF3ID0gYCR7aW5kZXh9JHt3b3JraW5nRGlyfWA7XG4gICAgICBjb25zdCBoYW5kbGVyID0gcGFyc2Vycy5nZXQocmF3KTtcblxuICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgIGhhbmRsZXIocmVzdWx0LCBwYXRoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJhdyAhPT0gJyMjJyAmJiByYXcgIT09ICchIScpIHtcbiAgICAgICAgIHJlc3VsdC5maWxlcy5wdXNoKG5ldyBGaWxlU3RhdHVzU3VtbWFyeShwYXRoLCBpbmRleCwgd29ya2luZ0RpcikpO1xuICAgICAgfVxuICAgfVxufVxuIiwgImltcG9ydCB0eXBlIHsgU3RhdHVzUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBwYXJzZVN0YXR1c1N1bW1hcnkgfSBmcm9tICcuLi9yZXNwb25zZXMvU3RhdHVzU3VtbWFyeSc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5cbmNvbnN0IGlnbm9yZWRPcHRpb25zID0gWyctLW51bGwnLCAnLXonXTtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXR1c1Rhc2soY3VzdG9tQXJnczogc3RyaW5nW10pOiBTdHJpbmdUYXNrPFN0YXR1c1Jlc3VsdD4ge1xuICAgY29uc3QgY29tbWFuZHMgPSBbXG4gICAgICAnc3RhdHVzJyxcbiAgICAgICctLXBvcmNlbGFpbicsXG4gICAgICAnLWInLFxuICAgICAgJy11JyxcbiAgICAgICctLW51bGwnLFxuICAgICAgLi4uY3VzdG9tQXJncy5maWx0ZXIoKGFyZykgPT4gIWlnbm9yZWRPcHRpb25zLmluY2x1ZGVzKGFyZykpLFxuICAgXTtcblxuICAgcmV0dXJuIHtcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIGNvbW1hbmRzLFxuICAgICAgcGFyc2VyKHRleHQ6IHN0cmluZykge1xuICAgICAgICAgcmV0dXJuIHBhcnNlU3RhdHVzU3VtbWFyeSh0ZXh0KTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgU2ltcGxlR2l0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdEFwaSB9IGZyb20gJy4uL3NpbXBsZS1naXQtYXBpJztcbmltcG9ydCB7IGFzTnVtYmVyLCBFeGl0Q29kZXMsIExpbmVQYXJzZXIsIHBhcnNlU3RyaW5nUmVzcG9uc2UgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmVyc2lvblJlc3VsdCB7XG4gICBtYWpvcjogbnVtYmVyO1xuICAgbWlub3I6IG51bWJlcjtcbiAgIHBhdGNoOiBudW1iZXIgfCBzdHJpbmc7XG4gICBhZ2VudDogc3RyaW5nO1xuICAgaW5zdGFsbGVkOiBib29sZWFuO1xufVxuXG5jb25zdCBOT1RfSU5TVEFMTEVEID0gJ2luc3RhbGxlZD1mYWxzZSc7XG5cbmZ1bmN0aW9uIHZlcnNpb25SZXNwb25zZShcbiAgIG1ham9yID0gMCxcbiAgIG1pbm9yID0gMCxcbiAgIHBhdGNoOiBzdHJpbmcgfCBudW1iZXIgPSAwLFxuICAgYWdlbnQgPSAnJyxcbiAgIGluc3RhbGxlZCA9IHRydWVcbik6IFZlcnNpb25SZXN1bHQge1xuICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShcbiAgICAgIHtcbiAgICAgICAgIG1ham9yLFxuICAgICAgICAgbWlub3IsXG4gICAgICAgICBwYXRjaCxcbiAgICAgICAgIGFnZW50LFxuICAgICAgICAgaW5zdGFsbGVkLFxuICAgICAgfSxcbiAgICAgICd0b1N0cmluZycsXG4gICAgICB7XG4gICAgICAgICB2YWx1ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLm1ham9yfS4ke3RoaXMubWlub3J9LiR7dGhpcy5wYXRjaH1gO1xuICAgICAgICAgfSxcbiAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIH1cbiAgICk7XG59XG5cbmZ1bmN0aW9uIG5vdEluc3RhbGxlZFJlc3BvbnNlKCkge1xuICAgcmV0dXJuIHZlcnNpb25SZXNwb25zZSgwLCAwLCAwLCAnJywgZmFsc2UpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKTogUGljazxTaW1wbGVHaXQsICd2ZXJzaW9uJz4ge1xuICAgcmV0dXJuIHtcbiAgICAgIHZlcnNpb24odGhpczogU2ltcGxlR2l0QXBpKSB7XG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayh7XG4gICAgICAgICAgICBjb21tYW5kczogWyctLXZlcnNpb24nXSxcbiAgICAgICAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgICAgICAgIHBhcnNlcjogdmVyc2lvblBhcnNlcixcbiAgICAgICAgICAgIG9uRXJyb3IocmVzdWx0LCBlcnJvciwgZG9uZSwgZmFpbCkge1xuICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5leGl0Q29kZSA9PT0gRXhpdENvZGVzLk5PVF9GT1VORCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoQnVmZmVyLmZyb20oTk9UX0lOU1RBTExFRCkpO1xuICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICBmYWlsKGVycm9yKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICB9KTtcbiAgICAgIH0sXG4gICB9O1xufVxuXG5jb25zdCBwYXJzZXJzOiBMaW5lUGFyc2VyPFZlcnNpb25SZXN1bHQ+W10gPSBbXG4gICBuZXcgTGluZVBhcnNlcihcbiAgICAgIC92ZXJzaW9uIChcXGQrKVxcLihcXGQrKVxcLihcXGQrKSg/OlxccypcXCgoLispXFwpKT8vLFxuICAgICAgKHJlc3VsdCwgW21ham9yLCBtaW5vciwgcGF0Y2gsIGFnZW50ID0gJyddKSA9PiB7XG4gICAgICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgICAgdmVyc2lvblJlc3BvbnNlKGFzTnVtYmVyKG1ham9yKSwgYXNOdW1iZXIobWlub3IpLCBhc051bWJlcihwYXRjaCksIGFnZW50KVxuICAgICAgICAgKTtcbiAgICAgIH1cbiAgICksXG4gICBuZXcgTGluZVBhcnNlcihcbiAgICAgIC92ZXJzaW9uIChcXGQrKVxcLihcXGQrKVxcLihcXEQrKSguKyk/JC8sXG4gICAgICAocmVzdWx0LCBbbWFqb3IsIG1pbm9yLCBwYXRjaCwgYWdlbnQgPSAnJ10pID0+IHtcbiAgICAgICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0LCB2ZXJzaW9uUmVzcG9uc2UoYXNOdW1iZXIobWFqb3IpLCBhc051bWJlcihtaW5vciksIHBhdGNoLCBhZ2VudCkpO1xuICAgICAgfVxuICAgKSxcbl07XG5cbmZ1bmN0aW9uIHZlcnNpb25QYXJzZXIoc3RkT3V0OiBzdHJpbmcpIHtcbiAgIGlmIChzdGRPdXQgPT09IE5PVF9JTlNUQUxMRUQpIHtcbiAgICAgIHJldHVybiBub3RJbnN0YWxsZWRSZXNwb25zZSgpO1xuICAgfVxuXG4gICByZXR1cm4gcGFyc2VTdHJpbmdSZXNwb25zZSh2ZXJzaW9uUmVzcG9uc2UoMCwgMCwgMCwgc3RkT3V0KSwgcGFyc2Vycywgc3RkT3V0KTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFNpbXBsZUdpdEJhc2UgfSBmcm9tICcuLi90eXBpbmdzJztcbmltcG9ydCB7IHRhc2tDYWxsYmFjayB9IGZyb20gJy4vdGFzay1jYWxsYmFjayc7XG5pbXBvcnQgeyBjaGFuZ2VXb3JraW5nRGlyZWN0b3J5VGFzayB9IGZyb20gJy4vdGFza3MvY2hhbmdlLXdvcmtpbmctZGlyZWN0b3J5JztcbmltcG9ydCBjaGVja291dCBmcm9tICcuL3Rhc2tzL2NoZWNrb3V0JztcbmltcG9ydCBjbG9uZSBmcm9tICcuL3Rhc2tzL2Nsb25lJztcbmltcG9ydCBjb21taXQgZnJvbSAnLi90YXNrcy9jb21taXQnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL3Rhc2tzL2NvbmZpZyc7XG5pbXBvcnQgY291bnRPYmplY3RzIGZyb20gJy4vdGFza3MvY291bnQtb2JqZWN0cyc7XG5pbXBvcnQgZmlyc3RDb21taXQgZnJvbSAnLi90YXNrcy9maXJzdC1jb21taXQnO1xuaW1wb3J0IGdyZXAgZnJvbSAnLi90YXNrcy9ncmVwJztcbmltcG9ydCB7IGhhc2hPYmplY3RUYXNrIH0gZnJvbSAnLi90YXNrcy9oYXNoLW9iamVjdCc7XG5pbXBvcnQgeyBpbml0VGFzayB9IGZyb20gJy4vdGFza3MvaW5pdCc7XG5pbXBvcnQgaW50ZXJwcmV0VHJhaWxlcnMgZnJvbSAnLi90YXNrcy9pbnRlcnByZXQtdHJhaWxlcnMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL3Rhc2tzL2xvZyc7XG5pbXBvcnQgeyBtZXJnZVRhc2sgfSBmcm9tICcuL3Rhc2tzL21lcmdlJztcbmltcG9ydCB7IHB1c2hUYXNrIH0gZnJvbSAnLi90YXNrcy9wdXNoJztcbmltcG9ydCBzaG93IGZyb20gJy4vdGFza3Mvc2hvdyc7XG5pbXBvcnQgeyBzdGF0dXNUYXNrIH0gZnJvbSAnLi90YXNrcy9zdGF0dXMnO1xuaW1wb3J0IHsgY29uZmlndXJhdGlvbkVycm9yVGFzaywgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayB9IGZyb20gJy4vdGFza3MvdGFzayc7XG5pbXBvcnQgdmVyc2lvbiBmcm9tICcuL3Rhc2tzL3ZlcnNpb24nO1xuaW1wb3J0IHR5cGUge1xuICAgb3V0cHV0SGFuZGxlcixcbiAgIFNpbXBsZUdpdEV4ZWN1dG9yLFxuICAgU2ltcGxlR2l0VGFzayxcbiAgIFNpbXBsZUdpdFRhc2tDYWxsYmFjayxcbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge1xuICAgYXNBcnJheSxcbiAgIGZpbHRlclN0cmluZyxcbiAgIGZpbHRlclR5cGUsXG4gICBnZXRUcmFpbGluZ09wdGlvbnMsXG4gICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQsXG59IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgU2ltcGxlR2l0QXBpIGltcGxlbWVudHMgU2ltcGxlR2l0QmFzZSB7XG4gICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9leGVjdXRvcjogU2ltcGxlR2l0RXhlY3V0b3IpIHt9XG5cbiAgIHByb3RlY3RlZCBfcnVuVGFzazxUPih0YXNrOiBTaW1wbGVHaXRUYXNrPFQ+LCB0aGVuPzogU2ltcGxlR2l0VGFza0NhbGxiYWNrPFQ+KSB7XG4gICAgICBjb25zdCBjaGFpbiA9IHRoaXMuX2V4ZWN1dG9yLmNoYWluKCk7XG4gICAgICBjb25zdCBwcm9taXNlID0gY2hhaW4ucHVzaCh0YXNrKTtcblxuICAgICAgaWYgKHRoZW4pIHtcbiAgICAgICAgIHRhc2tDYWxsYmFjayh0YXNrLCBwcm9taXNlLCB0aGVuKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIE9iamVjdC5jcmVhdGUodGhpcywge1xuICAgICAgICAgdGhlbjogeyB2YWx1ZTogcHJvbWlzZS50aGVuLmJpbmQocHJvbWlzZSkgfSxcbiAgICAgICAgIGNhdGNoOiB7IHZhbHVlOiBwcm9taXNlLmNhdGNoLmJpbmQocHJvbWlzZSkgfSxcbiAgICAgICAgIF9leGVjdXRvcjogeyB2YWx1ZTogY2hhaW4gfSxcbiAgICAgIH0pO1xuICAgfVxuXG4gICBhZGQoZmlsZXM6IHN0cmluZyB8IHN0cmluZ1tdKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soWydhZGQnLCAuLi5hc0FycmF5KGZpbGVzKV0pLFxuICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICAgICk7XG4gICB9XG5cbiAgIGN3ZChkaXJlY3Rvcnk6IHN0cmluZyB8IHsgcGF0aDogc3RyaW5nOyByb290PzogYm9vbGVhbiB9KSB7XG4gICAgICBjb25zdCBuZXh0ID0gdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cyk7XG5cbiAgICAgIGlmICh0eXBlb2YgZGlyZWN0b3J5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soY2hhbmdlV29ya2luZ0RpcmVjdG9yeVRhc2soZGlyZWN0b3J5LCB0aGlzLl9leGVjdXRvciksIG5leHQpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGRpcmVjdG9yeT8ucGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgY2hhbmdlV29ya2luZ0RpcmVjdG9yeVRhc2soXG4gICAgICAgICAgICAgICBkaXJlY3RvcnkucGF0aCxcbiAgICAgICAgICAgICAgIChkaXJlY3Rvcnkucm9vdCAmJiB0aGlzLl9leGVjdXRvcikgfHwgdW5kZWZpbmVkXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbmV4dFxuICAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICBjb25maWd1cmF0aW9uRXJyb3JUYXNrKCdHaXQuY3dkOiB3b3JraW5nRGlyZWN0b3J5IG11c3QgYmUgc3VwcGxpZWQgYXMgYSBzdHJpbmcnKSxcbiAgICAgICAgIG5leHRcbiAgICAgICk7XG4gICB9XG5cbiAgIGhhc2hPYmplY3QocGF0aDogc3RyaW5nLCB3cml0ZTogYm9vbGVhbiB8IHVua25vd24pIHtcbiAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgaGFzaE9iamVjdFRhc2socGF0aCwgd3JpdGUgPT09IHRydWUpLFxuICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICAgICk7XG4gICB9XG5cbiAgIGluaXQoYmFyZT86IGJvb2xlYW4gfCB1bmtub3duKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgIGluaXRUYXNrKGJhcmUgPT09IHRydWUsIHRoaXMuX2V4ZWN1dG9yLmN3ZCwgZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cykpLFxuICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICAgICk7XG4gICB9XG5cbiAgIG1lcmdlKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICBtZXJnZVRhc2soZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cykpLFxuICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICAgICk7XG4gICB9XG5cbiAgIG1lcmdlRnJvbVRvKHJlbW90ZTogc3RyaW5nLCBicmFuY2g6IHN0cmluZykge1xuICAgICAgaWYgKCEoZmlsdGVyU3RyaW5nKHJlbW90ZSkgJiYgZmlsdGVyU3RyaW5nKGJyYW5jaCkpKSB7XG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25FcnJvclRhc2soXG4gICAgICAgICAgICAgICBgR2l0Lm1lcmdlRnJvbVRvIHJlcXVpcmVzIHRoYXQgdGhlICdyZW1vdGUnIGFuZCAnYnJhbmNoJyBhcmd1bWVudHMgYXJlIHN1cHBsaWVkIGFzIHN0cmluZ3NgXG4gICAgICAgICAgICApXG4gICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgIG1lcmdlVGFzayhbcmVtb3RlLCBicmFuY2gsIC4uLmdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpXSksXG4gICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzLCBmYWxzZSlcbiAgICAgICk7XG4gICB9XG5cbiAgIG91dHB1dEhhbmRsZXIoaGFuZGxlcjogb3V0cHV0SGFuZGxlcikge1xuICAgICAgdGhpcy5fZXhlY3V0b3Iub3V0cHV0SGFuZGxlciA9IGhhbmRsZXI7XG4gICAgICByZXR1cm4gdGhpcztcbiAgIH1cblxuICAgcHVzaCgpIHtcbiAgICAgIGNvbnN0IHRhc2sgPSBwdXNoVGFzayhcbiAgICAgICAgIHtcbiAgICAgICAgICAgIHJlbW90ZTogZmlsdGVyVHlwZShhcmd1bWVudHNbMF0sIGZpbHRlclN0cmluZyksXG4gICAgICAgICAgICBicmFuY2g6IGZpbHRlclR5cGUoYXJndW1lbnRzWzFdLCBmaWx0ZXJTdHJpbmcpLFxuICAgICAgICAgfSxcbiAgICAgICAgIGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayh0YXNrLCB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKSk7XG4gICB9XG5cbiAgIHN0YXNoKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKFsnc3Rhc2gnLCAuLi5nZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKV0pLFxuICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICAgICk7XG4gICB9XG5cbiAgIHN0YXR1cygpIHtcbiAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgc3RhdHVzVGFzayhnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKSksXG4gICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgKTtcbiAgIH1cbn1cblxuT2JqZWN0LmFzc2lnbihcbiAgIFNpbXBsZUdpdEFwaS5wcm90b3R5cGUsXG4gICBjaGVja291dCgpLFxuICAgY2xvbmUoKSxcbiAgIGNvbW1pdCgpLFxuICAgY29uZmlnKCksXG4gICBjb3VudE9iamVjdHMoKSxcbiAgIGZpcnN0Q29tbWl0KCksXG4gICBncmVwKCksXG4gICBpbnRlcnByZXRUcmFpbGVycygpLFxuICAgbG9nKCksXG4gICBzaG93KCksXG4gICB2ZXJzaW9uKClcbik7XG4iLCAiaW1wb3J0IHsgY3JlYXRlRGVmZXJyZWQsIHR5cGUgRGVmZXJyZWRQcm9taXNlIH0gZnJvbSAnQGt3c2l0ZXMvcHJvbWlzZS1kZWZlcnJlZCc7XG5cbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gJy4uL2dpdC1sb2dnZXInO1xuaW1wb3J0IHsgYXBwZW5kLCByZW1vdmUgfSBmcm9tICcuLi91dGlscyc7XG5cbnR5cGUgU2NoZWR1bGVDb21wbGV0ZUNhbGxiYWNrID0gKCkgPT4gdm9pZDtcbnR5cGUgU2NoZWR1bGVkVGFzayA9IFBpY2s8RGVmZXJyZWRQcm9taXNlPFNjaGVkdWxlQ29tcGxldGVDYWxsYmFjaz4sICdwcm9taXNlJyB8ICdkb25lJz4gJiB7XG4gICBpZDogbnVtYmVyO1xufTtcblxuY29uc3QgY3JlYXRlU2NoZWR1bGVkVGFzazogKCkgPT4gU2NoZWR1bGVkVGFzayA9ICgoKSA9PiB7XG4gICBsZXQgaWQgPSAwO1xuICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlkKys7XG4gICAgICBjb25zdCB7IHByb21pc2UsIGRvbmUgfSA9IGNyZWF0ZURlZmVycmVkPFNjaGVkdWxlQ29tcGxldGVDYWxsYmFjaz4oKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgIHByb21pc2UsXG4gICAgICAgICBkb25lLFxuICAgICAgICAgaWQsXG4gICAgICB9O1xuICAgfTtcbn0pKCk7XG5cbmV4cG9ydCBjbGFzcyBTY2hlZHVsZXIge1xuICAgcHJpdmF0ZSBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoJycsICdzY2hlZHVsZXInKTtcbiAgIHByaXZhdGUgcGVuZGluZzogU2NoZWR1bGVkVGFza1tdID0gW107XG4gICBwcml2YXRlIHJ1bm5pbmc6IFNjaGVkdWxlZFRhc2tbXSA9IFtdO1xuXG4gICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmN1cnJlbmN5ID0gMikge1xuICAgICAgdGhpcy5sb2dnZXIoYENvbnN0cnVjdGVkLCBjb25jdXJyZW5jeT0lc2AsIGNvbmN1cnJlbmN5KTtcbiAgIH1cblxuICAgcHJpdmF0ZSBzY2hlZHVsZSgpIHtcbiAgICAgIGlmICghdGhpcy5wZW5kaW5nLmxlbmd0aCB8fCB0aGlzLnJ1bm5pbmcubGVuZ3RoID49IHRoaXMuY29uY3VycmVuY3kpIHtcbiAgICAgICAgIHRoaXMubG9nZ2VyKFxuICAgICAgICAgICAgYFNjaGVkdWxlIGF0dGVtcHQgaWdub3JlZCwgcGVuZGluZz0lcyBydW5uaW5nPSVzIGNvbmN1cnJlbmN5PSVzYCxcbiAgICAgICAgICAgIHRoaXMucGVuZGluZy5sZW5ndGgsXG4gICAgICAgICAgICB0aGlzLnJ1bm5pbmcubGVuZ3RoLFxuICAgICAgICAgICAgdGhpcy5jb25jdXJyZW5jeVxuICAgICAgICAgKTtcbiAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdGFzayA9IGFwcGVuZCh0aGlzLnJ1bm5pbmcsIHRoaXMucGVuZGluZy5zaGlmdCgpISk7XG4gICAgICB0aGlzLmxvZ2dlcihgQXR0ZW1wdGluZyBpZD0lc2AsIHRhc2suaWQpO1xuICAgICAgdGFzay5kb25lKCgpID0+IHtcbiAgICAgICAgIHRoaXMubG9nZ2VyKGBDb21wbGV0aW5nIGlkPWAsIHRhc2suaWQpO1xuICAgICAgICAgcmVtb3ZlKHRoaXMucnVubmluZywgdGFzayk7XG4gICAgICAgICB0aGlzLnNjaGVkdWxlKCk7XG4gICAgICB9KTtcbiAgIH1cblxuICAgbmV4dCgpOiBQcm9taXNlPFNjaGVkdWxlQ29tcGxldGVDYWxsYmFjaz4ge1xuICAgICAgY29uc3QgeyBwcm9taXNlLCBpZCB9ID0gYXBwZW5kKHRoaXMucGVuZGluZywgY3JlYXRlU2NoZWR1bGVkVGFzaygpKTtcbiAgICAgIHRoaXMubG9nZ2VyKGBTY2hlZHVsaW5nIGlkPSVzYCwgaWQpO1xuXG4gICAgICB0aGlzLnNjaGVkdWxlKCk7XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgfVxufVxuIiwgImltcG9ydCB0eXBlIHsgT3B0aW9uRmxhZ3MsIE9wdGlvbnMsIFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZXhwb3J0IHR5cGUgQXBwbHlPcHRpb25zID0gT3B0aW9ucyAmXG4gICBPcHRpb25GbGFnczxcbiAgICAgIHwgJy0tc3RhdCdcbiAgICAgIHwgJy0tbnVtc3RhdCdcbiAgICAgIHwgJy0tc3VtbWFyeSdcbiAgICAgIHwgJy0tY2hlY2snXG4gICAgICB8ICctLWluZGV4J1xuICAgICAgfCAnLS1pbnRlbnQtdG8tYWRkJ1xuICAgICAgfCAnLS0zd2F5J1xuICAgICAgfCAnLS1hcHBseSdcbiAgICAgIHwgJy0tbm8tYWRkJ1xuICAgICAgfCAnLVInXG4gICAgICB8ICctLXJldmVyc2UnXG4gICAgICB8ICctLWFsbG93LWJpbmFyeS1yZXBsYWNlbWVudCdcbiAgICAgIHwgJy0tYmluYXJ5J1xuICAgICAgfCAnLS1yZWplY3QnXG4gICAgICB8ICcteidcbiAgICAgIHwgJy0taW5hY2N1cmF0ZS1lb2YnXG4gICAgICB8ICctLXJlY291bnQnXG4gICAgICB8ICctLWNhY2hlZCdcbiAgICAgIHwgJy0taWdub3JlLXNwYWNlLWNoYW5nZSdcbiAgICAgIHwgJy0taWdub3JlLXdoaXRlc3BhY2UnXG4gICAgICB8ICctLXZlcmJvc2UnXG4gICAgICB8ICctLXVuc2FmZS1wYXRocydcbiAgID4gJlxuICAgT3B0aW9uRmxhZ3M8Jy0td2hpdGVzcGFjZScsICdub3dhcm4nIHwgJ3dhcm4nIHwgJ2ZpeCcgfCAnZXJyb3InIHwgJ2Vycm9yLWFsbCc+ICZcbiAgIE9wdGlvbkZsYWdzPCctLWJ1aWxkLWZha2UtYW5jZXN0b3InIHwgJy0tZXhjbHVkZScgfCAnLS1pbmNsdWRlJyB8ICctLWRpcmVjdG9yeScsIHN0cmluZz4gJlxuICAgT3B0aW9uRmxhZ3M8Jy1wJyB8ICctQycsIG51bWJlcj47XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVBhdGNoVGFzayhwYXRjaGVzOiBzdHJpbmdbXSwgY3VzdG9tQXJnczogc3RyaW5nW10pOiBTdHJpbmdUYXNrPHN0cmluZz4ge1xuICAgcmV0dXJuIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soWydhcHBseScsIC4uLmN1c3RvbUFyZ3MsIC4uLnBhdGNoZXNdKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IEJyYW5jaFN1bW1hcnksIEJyYW5jaFN1bW1hcnlCcmFuY2ggfSBmcm9tICcuLi8uLi90eXBpbmdzJztcblxuZXhwb3J0IGVudW0gQnJhbmNoU3RhdHVzSWRlbnRpZmllciB7XG4gICBDVVJSRU5UID0gJyonLFxuICAgTElOS0VEID0gJysnLFxufVxuXG5leHBvcnQgY2xhc3MgQnJhbmNoU3VtbWFyeVJlc3VsdCBpbXBsZW1lbnRzIEJyYW5jaFN1bW1hcnkge1xuICAgcHVibGljIGFsbDogc3RyaW5nW10gPSBbXTtcbiAgIHB1YmxpYyBicmFuY2hlczogeyBbcDogc3RyaW5nXTogQnJhbmNoU3VtbWFyeUJyYW5jaCB9ID0ge307XG4gICBwdWJsaWMgY3VycmVudDogc3RyaW5nID0gJyc7XG4gICBwdWJsaWMgZGV0YWNoZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgcHVzaChcbiAgICAgIHN0YXR1czogQnJhbmNoU3RhdHVzSWRlbnRpZmllciB8IHVua25vd24sXG4gICAgICBkZXRhY2hlZDogYm9vbGVhbixcbiAgICAgIG5hbWU6IHN0cmluZyxcbiAgICAgIGNvbW1pdDogc3RyaW5nLFxuICAgICAgbGFiZWw6IHN0cmluZ1xuICAgKSB7XG4gICAgICBpZiAoc3RhdHVzID09PSBCcmFuY2hTdGF0dXNJZGVudGlmaWVyLkNVUlJFTlQpIHtcbiAgICAgICAgIHRoaXMuZGV0YWNoZWQgPSBkZXRhY2hlZDtcbiAgICAgICAgIHRoaXMuY3VycmVudCA9IG5hbWU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYWxsLnB1c2gobmFtZSk7XG4gICAgICB0aGlzLmJyYW5jaGVzW25hbWVdID0ge1xuICAgICAgICAgY3VycmVudDogc3RhdHVzID09PSBCcmFuY2hTdGF0dXNJZGVudGlmaWVyLkNVUlJFTlQsXG4gICAgICAgICBsaW5rZWRXb3JrVHJlZTogc3RhdHVzID09PSBCcmFuY2hTdGF0dXNJZGVudGlmaWVyLkxJTktFRCxcbiAgICAgICAgIG5hbWUsXG4gICAgICAgICBjb21taXQsXG4gICAgICAgICBsYWJlbCxcbiAgICAgIH07XG4gICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBCcmFuY2hTdW1tYXJ5IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBCcmFuY2hTdGF0dXNJZGVudGlmaWVyLCBCcmFuY2hTdW1tYXJ5UmVzdWx0IH0gZnJvbSAnLi4vcmVzcG9uc2VzL0JyYW5jaFN1bW1hcnknO1xuaW1wb3J0IHsgTGluZVBhcnNlciwgcGFyc2VTdHJpbmdSZXNwb25zZSB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgcGFyc2VyczogTGluZVBhcnNlcjxCcmFuY2hTdW1tYXJ5UmVzdWx0PltdID0gW1xuICAgbmV3IExpbmVQYXJzZXIoXG4gICAgICAvXihbKitdXFxzKT9cXCgoPzpIRUFEICk/ZGV0YWNoZWQgKD86ZnJvbXxhdCkgKFxcUyspXFwpXFxzKyhbYS16MC05XSspXFxzKC4qKSQvLFxuICAgICAgKHJlc3VsdCwgW2N1cnJlbnQsIG5hbWUsIGNvbW1pdCwgbGFiZWxdKSA9PiB7XG4gICAgICAgICByZXN1bHQucHVzaChicmFuY2hTdGF0dXMoY3VycmVudCksIHRydWUsIG5hbWUsIGNvbW1pdCwgbGFiZWwpO1xuICAgICAgfVxuICAgKSxcbiAgIG5ldyBMaW5lUGFyc2VyKFxuICAgICAgL14oWyorXVxccyk/KFxcUyspXFxzKyhbYS16MC05XSspXFxzPyguKikkL3MsXG4gICAgICAocmVzdWx0LCBbY3VycmVudCwgbmFtZSwgY29tbWl0LCBsYWJlbF0pID0+IHtcbiAgICAgICAgIHJlc3VsdC5wdXNoKGJyYW5jaFN0YXR1cyhjdXJyZW50KSwgZmFsc2UsIG5hbWUsIGNvbW1pdCwgbGFiZWwpO1xuICAgICAgfVxuICAgKSxcbl07XG5cbmNvbnN0IGN1cnJlbnRCcmFuY2hQYXJzZXIgPSBuZXcgTGluZVBhcnNlcjxCcmFuY2hTdW1tYXJ5UmVzdWx0PigvXihcXFMrKSQvcywgKHJlc3VsdCwgW25hbWVdKSA9PiB7XG4gICByZXN1bHQucHVzaChCcmFuY2hTdGF0dXNJZGVudGlmaWVyLkNVUlJFTlQsIGZhbHNlLCBuYW1lLCAnJywgJycpO1xufSk7XG5cbmZ1bmN0aW9uIGJyYW5jaFN0YXR1cyhpbnB1dD86IHN0cmluZykge1xuICAgcmV0dXJuIGlucHV0ID8gaW5wdXQuY2hhckF0KDApIDogJyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUJyYW5jaFN1bW1hcnkoc3RkT3V0OiBzdHJpbmcsIGN1cnJlbnRPbmx5ID0gZmFsc2UpOiBCcmFuY2hTdW1tYXJ5IHtcbiAgIHJldHVybiBwYXJzZVN0cmluZ1Jlc3BvbnNlKFxuICAgICAgbmV3IEJyYW5jaFN1bW1hcnlSZXN1bHQoKSxcbiAgICAgIGN1cnJlbnRPbmx5ID8gW2N1cnJlbnRCcmFuY2hQYXJzZXJdIDogcGFyc2VycyxcbiAgICAgIHN0ZE91dFxuICAgKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7XG4gICBCcmFuY2hNdWx0aURlbGV0ZVJlc3VsdCxcbiAgIEJyYW5jaFNpbmdsZURlbGV0ZUZhaWx1cmUsXG4gICBCcmFuY2hTaW5nbGVEZWxldGVSZXN1bHQsXG4gICBCcmFuY2hTaW5nbGVEZWxldGVTdWNjZXNzLFxufSBmcm9tICcuLi8uLi90eXBpbmdzJztcblxuZXhwb3J0IGNsYXNzIEJyYW5jaERlbGV0aW9uQmF0Y2ggaW1wbGVtZW50cyBCcmFuY2hNdWx0aURlbGV0ZVJlc3VsdCB7XG4gICBhbGw6IEJyYW5jaFNpbmdsZURlbGV0ZVJlc3VsdFtdID0gW107XG4gICBicmFuY2hlczogeyBbYnJhbmNoTmFtZTogc3RyaW5nXTogQnJhbmNoU2luZ2xlRGVsZXRlUmVzdWx0IH0gPSB7fTtcbiAgIGVycm9yczogQnJhbmNoU2luZ2xlRGVsZXRlUmVzdWx0W10gPSBbXTtcblxuICAgZ2V0IHN1Y2Nlc3MoKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gIXRoaXMuZXJyb3JzLmxlbmd0aDtcbiAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJyYW5jaERlbGV0aW9uU3VjY2VzcyhicmFuY2g6IHN0cmluZywgaGFzaDogc3RyaW5nKTogQnJhbmNoU2luZ2xlRGVsZXRlU3VjY2VzcyB7XG4gICByZXR1cm4ge1xuICAgICAgYnJhbmNoLFxuICAgICAgaGFzaCxcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnJhbmNoRGVsZXRpb25GYWlsdXJlKGJyYW5jaDogc3RyaW5nKTogQnJhbmNoU2luZ2xlRGVsZXRlRmFpbHVyZSB7XG4gICByZXR1cm4ge1xuICAgICAgYnJhbmNoLFxuICAgICAgaGFzaDogbnVsbCxcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2luZ2xlQnJhbmNoRGVsZXRlRmFpbHVyZShcbiAgIHRlc3Q6IEJyYW5jaFNpbmdsZURlbGV0ZVJlc3VsdFxuKTogdGVzdCBpcyBCcmFuY2hTaW5nbGVEZWxldGVTdWNjZXNzIHtcbiAgIHJldHVybiB0ZXN0LnN1Y2Nlc3M7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBCcmFuY2hNdWx0aURlbGV0ZVJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHtcbiAgIEJyYW5jaERlbGV0aW9uQmF0Y2gsXG4gICBicmFuY2hEZWxldGlvbkZhaWx1cmUsXG4gICBicmFuY2hEZWxldGlvblN1Y2Nlc3MsXG59IGZyb20gJy4uL3Jlc3BvbnNlcy9CcmFuY2hEZWxldGVTdW1tYXJ5JztcbmltcG9ydCB0eXBlIHsgVGFza1BhcnNlciB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IEV4aXRDb2RlcywgTGluZVBhcnNlciwgcGFyc2VTdHJpbmdSZXNwb25zZSB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgZGVsZXRlU3VjY2Vzc1JlZ2V4ID0gLyhcXFMrKVxccytcXChcXFMrXFxzKFteKV0rKVxcKS87XG5jb25zdCBkZWxldGVFcnJvclJlZ2V4ID0gL15lcnJvclteJ10rJyhbXiddKyknL207XG5cbmNvbnN0IHBhcnNlcnM6IExpbmVQYXJzZXI8QnJhbmNoTXVsdGlEZWxldGVSZXN1bHQ+W10gPSBbXG4gICBuZXcgTGluZVBhcnNlcihkZWxldGVTdWNjZXNzUmVnZXgsIChyZXN1bHQsIFticmFuY2gsIGhhc2hdKSA9PiB7XG4gICAgICBjb25zdCBkZWxldGlvbiA9IGJyYW5jaERlbGV0aW9uU3VjY2VzcyhicmFuY2gsIGhhc2gpO1xuXG4gICAgICByZXN1bHQuYWxsLnB1c2goZGVsZXRpb24pO1xuICAgICAgcmVzdWx0LmJyYW5jaGVzW2JyYW5jaF0gPSBkZWxldGlvbjtcbiAgIH0pLFxuICAgbmV3IExpbmVQYXJzZXIoZGVsZXRlRXJyb3JSZWdleCwgKHJlc3VsdCwgW2JyYW5jaF0pID0+IHtcbiAgICAgIGNvbnN0IGRlbGV0aW9uID0gYnJhbmNoRGVsZXRpb25GYWlsdXJlKGJyYW5jaCk7XG5cbiAgICAgIHJlc3VsdC5lcnJvcnMucHVzaChkZWxldGlvbik7XG4gICAgICByZXN1bHQuYWxsLnB1c2goZGVsZXRpb24pO1xuICAgICAgcmVzdWx0LmJyYW5jaGVzW2JyYW5jaF0gPSBkZWxldGlvbjtcbiAgIH0pLFxuXTtcblxuZXhwb3J0IGNvbnN0IHBhcnNlQnJhbmNoRGVsZXRpb25zOiBUYXNrUGFyc2VyPHN0cmluZywgQnJhbmNoTXVsdGlEZWxldGVSZXN1bHQ+ID0gKFxuICAgc3RkT3V0LFxuICAgc3RkRXJyXG4pID0+IHtcbiAgIHJldHVybiBwYXJzZVN0cmluZ1Jlc3BvbnNlKG5ldyBCcmFuY2hEZWxldGlvbkJhdGNoKCksIHBhcnNlcnMsIFtzdGRPdXQsIHN0ZEVycl0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0JyYW5jaERlbGV0aW9uRXJyb3IoZGF0YTogc3RyaW5nLCBwcm9jZXNzRXhpdENvZGU6IEV4aXRDb2Rlcyk6IGJvb2xlYW4ge1xuICAgcmV0dXJuIHByb2Nlc3NFeGl0Q29kZSA9PT0gRXhpdENvZGVzLkVSUk9SICYmIGRlbGV0ZUVycm9yUmVnZXgudGVzdChkYXRhKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7XG4gICBCcmFuY2hNdWx0aURlbGV0ZVJlc3VsdCxcbiAgIEJyYW5jaFNpbmdsZURlbGV0ZVJlc3VsdCxcbiAgIEJyYW5jaFN1bW1hcnksXG59IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgR2l0UmVzcG9uc2VFcnJvciB9IGZyb20gJy4uL2Vycm9ycy9naXQtcmVzcG9uc2UtZXJyb3InO1xuaW1wb3J0IHsgcGFyc2VCcmFuY2hTdW1tYXJ5IH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZS1icmFuY2gnO1xuaW1wb3J0IHsgaGFzQnJhbmNoRGVsZXRpb25FcnJvciwgcGFyc2VCcmFuY2hEZWxldGlvbnMgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlLWJyYW5jaC1kZWxldGUnO1xuaW1wb3J0IHR5cGUgeyBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgYnVmZmVyVG9TdHJpbmcgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb250YWluc0RlbGV0ZUJyYW5jaENvbW1hbmQoY29tbWFuZHM6IHN0cmluZ1tdKSB7XG4gICBjb25zdCBkZWxldGVDb21tYW5kcyA9IFsnLWQnLCAnLUQnLCAnLS1kZWxldGUnXTtcbiAgIHJldHVybiBjb21tYW5kcy5zb21lKChjb21tYW5kKSA9PiBkZWxldGVDb21tYW5kcy5pbmNsdWRlcyhjb21tYW5kKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBicmFuY2hUYXNrKFxuICAgY3VzdG9tQXJnczogc3RyaW5nW11cbik6IFN0cmluZ1Rhc2s8QnJhbmNoU3VtbWFyeSB8IEJyYW5jaFNpbmdsZURlbGV0ZVJlc3VsdD4ge1xuICAgY29uc3QgaXNEZWxldGUgPSBjb250YWluc0RlbGV0ZUJyYW5jaENvbW1hbmQoY3VzdG9tQXJncyk7XG4gICBjb25zdCBpc0N1cnJlbnRPbmx5ID0gY3VzdG9tQXJncy5pbmNsdWRlcygnLS1zaG93LWN1cnJlbnQnKTtcblxuICAgY29uc3QgY29tbWFuZHMgPSBbJ2JyYW5jaCcsIC4uLmN1c3RvbUFyZ3NdO1xuXG4gICBpZiAoY29tbWFuZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBjb21tYW5kcy5wdXNoKCctYScpO1xuICAgfVxuXG4gICBpZiAoIWNvbW1hbmRzLmluY2x1ZGVzKCctdicpKSB7XG4gICAgICBjb21tYW5kcy5zcGxpY2UoMSwgMCwgJy12Jyk7XG4gICB9XG5cbiAgIHJldHVybiB7XG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBjb21tYW5kcyxcbiAgICAgIHBhcnNlcihzdGRPdXQsIHN0ZEVycikge1xuICAgICAgICAgaWYgKGlzRGVsZXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VCcmFuY2hEZWxldGlvbnMoc3RkT3V0LCBzdGRFcnIpLmFsbFswXTtcbiAgICAgICAgIH1cblxuICAgICAgICAgcmV0dXJuIHBhcnNlQnJhbmNoU3VtbWFyeShzdGRPdXQsIGlzQ3VycmVudE9ubHkpO1xuICAgICAgfSxcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBicmFuY2hMb2NhbFRhc2soKTogU3RyaW5nVGFzazxCcmFuY2hTdW1tYXJ5PiB7XG4gICByZXR1cm4ge1xuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgY29tbWFuZHM6IFsnYnJhbmNoJywgJy12J10sXG4gICAgICBwYXJzZXIoc3RkT3V0KSB7XG4gICAgICAgICByZXR1cm4gcGFyc2VCcmFuY2hTdW1tYXJ5KHN0ZE91dCk7XG4gICAgICB9LFxuICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUJyYW5jaGVzVGFzayhcbiAgIGJyYW5jaGVzOiBzdHJpbmdbXSxcbiAgIGZvcmNlRGVsZXRlID0gZmFsc2Vcbik6IFN0cmluZ1Rhc2s8QnJhbmNoTXVsdGlEZWxldGVSZXN1bHQ+IHtcbiAgIHJldHVybiB7XG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBjb21tYW5kczogWydicmFuY2gnLCAnLXYnLCBmb3JjZURlbGV0ZSA/ICctRCcgOiAnLWQnLCAuLi5icmFuY2hlc10sXG4gICAgICBwYXJzZXIoc3RkT3V0LCBzdGRFcnIpIHtcbiAgICAgICAgIHJldHVybiBwYXJzZUJyYW5jaERlbGV0aW9ucyhzdGRPdXQsIHN0ZEVycik7XG4gICAgICB9LFxuICAgICAgb25FcnJvcih7IGV4aXRDb2RlLCBzdGRPdXQgfSwgZXJyb3IsIGRvbmUsIGZhaWwpIHtcbiAgICAgICAgIGlmICghaGFzQnJhbmNoRGVsZXRpb25FcnJvcihTdHJpbmcoZXJyb3IpLCBleGl0Q29kZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWlsKGVycm9yKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgZG9uZShzdGRPdXQpO1xuICAgICAgfSxcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVCcmFuY2hUYXNrKFxuICAgYnJhbmNoOiBzdHJpbmcsXG4gICBmb3JjZURlbGV0ZSA9IGZhbHNlXG4pOiBTdHJpbmdUYXNrPEJyYW5jaFNpbmdsZURlbGV0ZVJlc3VsdD4ge1xuICAgY29uc3QgdGFzazogU3RyaW5nVGFzazxCcmFuY2hTaW5nbGVEZWxldGVSZXN1bHQ+ID0ge1xuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgY29tbWFuZHM6IFsnYnJhbmNoJywgJy12JywgZm9yY2VEZWxldGUgPyAnLUQnIDogJy1kJywgYnJhbmNoXSxcbiAgICAgIHBhcnNlcihzdGRPdXQsIHN0ZEVycikge1xuICAgICAgICAgcmV0dXJuIHBhcnNlQnJhbmNoRGVsZXRpb25zKHN0ZE91dCwgc3RkRXJyKS5icmFuY2hlc1ticmFuY2hdITtcbiAgICAgIH0sXG4gICAgICBvbkVycm9yKHsgZXhpdENvZGUsIHN0ZEVyciwgc3RkT3V0IH0sIGVycm9yLCBfLCBmYWlsKSB7XG4gICAgICAgICBpZiAoIWhhc0JyYW5jaERlbGV0aW9uRXJyb3IoU3RyaW5nKGVycm9yKSwgZXhpdENvZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFpbChlcnJvcik7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHRocm93IG5ldyBHaXRSZXNwb25zZUVycm9yKFxuICAgICAgICAgICAgdGFzay5wYXJzZXIoYnVmZmVyVG9TdHJpbmcoc3RkT3V0KSwgYnVmZmVyVG9TdHJpbmcoc3RkRXJyKSksXG4gICAgICAgICAgICBTdHJpbmcoZXJyb3IpXG4gICAgICAgICApO1xuICAgICAgfSxcbiAgIH07XG5cbiAgIHJldHVybiB0YXNrO1xufVxuIiwgImltcG9ydCB7IG5vcm1hbGl6ZSB9IGZyb20gJ25vZGU6cGF0aCc7XG5cbmltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrSWdub3JlVGFzayhwYXRoczogc3RyaW5nW10pOiBTdHJpbmdUYXNrPHN0cmluZ1tdPiB7XG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHM6IFsnY2hlY2staWdub3JlJywgLi4ucGF0aHNdLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgcGFyc2VyOiBwYXJzZUNoZWNrSWdub3JlLFxuICAgfTtcbn1cblxuLyoqXG4gKiBQYXJzZXIgZm9yIHRoZSBgY2hlY2staWdub3JlYCBjb21tYW5kIC0gcmV0dXJucyBlYWNoIGZpbGUgYXMgYSBzdHJpbmcgYXJyYXlcbiAqL1xuZnVuY3Rpb24gcGFyc2VDaGVja0lnbm9yZSh0ZXh0OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICByZXR1cm4gdGV4dC5zcGxpdCgvXFxuL2cpLm1hcCh0b1BhdGgpLmZpbHRlcihCb29sZWFuKTtcbn1cblxuZnVuY3Rpb24gdG9QYXRoKGlucHV0OiBzdHJpbmcpIHtcbiAgIGNvbnN0IHBhdGggPSBpbnB1dC50cmltKCkucmVwbGFjZSgvXltcIiddfFtcIiddJC9nLCAnJyk7XG4gICByZXR1cm4gcGF0aCAmJiBub3JtYWxpemUocGF0aCk7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBGZXRjaFJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgTGluZVBhcnNlciwgcGFyc2VTdHJpbmdSZXNwb25zZSB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgcGFyc2VyczogTGluZVBhcnNlcjxGZXRjaFJlc3VsdD5bXSA9IFtcbiAgIG5ldyBMaW5lUGFyc2VyKC9Gcm9tICguKykkLywgKHJlc3VsdCwgW3JlbW90ZV0pID0+IHtcbiAgICAgIHJlc3VsdC5yZW1vdGUgPSByZW1vdGU7XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyKC9cXCogXFxbbmV3IGJyYW5jaF1cXHMrKFxcUyspXFxzKi0+ICguKykkLywgKHJlc3VsdCwgW25hbWUsIHRyYWNraW5nXSkgPT4ge1xuICAgICAgcmVzdWx0LmJyYW5jaGVzLnB1c2goe1xuICAgICAgICAgbmFtZSxcbiAgICAgICAgIHRyYWNraW5nLFxuICAgICAgfSk7XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyKC9cXCogXFxbbmV3IHRhZ11cXHMrKFxcUyspXFxzKi0+ICguKykkLywgKHJlc3VsdCwgW25hbWUsIHRyYWNraW5nXSkgPT4ge1xuICAgICAgcmVzdWx0LnRhZ3MucHVzaCh7XG4gICAgICAgICBuYW1lLFxuICAgICAgICAgdHJhY2tpbmcsXG4gICAgICB9KTtcbiAgIH0pLFxuICAgbmV3IExpbmVQYXJzZXIoLy0gXFxbZGVsZXRlZF1cXHMrXFxTK1xccyotPiAoLispJC8sIChyZXN1bHQsIFt0cmFja2luZ10pID0+IHtcbiAgICAgIHJlc3VsdC5kZWxldGVkLnB1c2goe1xuICAgICAgICAgdHJhY2tpbmcsXG4gICAgICB9KTtcbiAgIH0pLFxuICAgbmV3IExpbmVQYXJzZXIoXG4gICAgICAvXFxzKihbXi5dKylcXC5cXC4oXFxTKylcXHMrKFxcUyspXFxzKi0+ICguKykkLyxcbiAgICAgIChyZXN1bHQsIFtmcm9tLCB0bywgbmFtZSwgdHJhY2tpbmddKSA9PiB7XG4gICAgICAgICByZXN1bHQudXBkYXRlZC5wdXNoKHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICB0cmFja2luZyxcbiAgICAgICAgICAgIHRvLFxuICAgICAgICAgICAgZnJvbSxcbiAgICAgICAgIH0pO1xuICAgICAgfVxuICAgKSxcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUZldGNoUmVzdWx0KHN0ZE91dDogc3RyaW5nLCBzdGRFcnI6IHN0cmluZyk6IEZldGNoUmVzdWx0IHtcbiAgIGNvbnN0IHJlc3VsdDogRmV0Y2hSZXN1bHQgPSB7XG4gICAgICByYXc6IHN0ZE91dCxcbiAgICAgIHJlbW90ZTogbnVsbCxcbiAgICAgIGJyYW5jaGVzOiBbXSxcbiAgICAgIHRhZ3M6IFtdLFxuICAgICAgdXBkYXRlZDogW10sXG4gICAgICBkZWxldGVkOiBbXSxcbiAgIH07XG4gICByZXR1cm4gcGFyc2VTdHJpbmdSZXNwb25zZShyZXN1bHQsIHBhcnNlcnMsIFtzdGRPdXQsIHN0ZEVycl0pO1xufVxuIiwgImltcG9ydCB0eXBlIHsgRmV0Y2hSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IHBhcnNlRmV0Y2hSZXN1bHQgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlLWZldGNoJztcbmltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb25FcnJvclRhc2ssIHR5cGUgRW1wdHlUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZnVuY3Rpb24gZGlzYWxsb3dlZENvbW1hbmQoY29tbWFuZDogc3RyaW5nKSB7XG4gICByZXR1cm4gL14tLXVwbG9hZC1wYWNrKD18JCkvLnRlc3QoY29tbWFuZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmZXRjaFRhc2soXG4gICByZW1vdGU6IHN0cmluZyxcbiAgIGJyYW5jaDogc3RyaW5nLFxuICAgY3VzdG9tQXJnczogc3RyaW5nW11cbik6IFN0cmluZ1Rhc2s8RmV0Y2hSZXN1bHQ+IHwgRW1wdHlUYXNrIHtcbiAgIGNvbnN0IGNvbW1hbmRzID0gWydmZXRjaCcsIC4uLmN1c3RvbUFyZ3NdO1xuICAgaWYgKHJlbW90ZSAmJiBicmFuY2gpIHtcbiAgICAgIGNvbW1hbmRzLnB1c2gocmVtb3RlLCBicmFuY2gpO1xuICAgfVxuXG4gICBjb25zdCBiYW5uZWQgPSBjb21tYW5kcy5maW5kKGRpc2FsbG93ZWRDb21tYW5kKTtcbiAgIGlmIChiYW5uZWQpIHtcbiAgICAgIHJldHVybiBjb25maWd1cmF0aW9uRXJyb3JUYXNrKGBnaXQuZmV0Y2g6IHBvdGVudGlhbCBleHBsb2l0IGFyZ3VtZW50IGJsb2NrZWQuYCk7XG4gICB9XG5cbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kcyxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIHBhcnNlcjogcGFyc2VGZXRjaFJlc3VsdCxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBNb3ZlUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBMaW5lUGFyc2VyLCBwYXJzZVN0cmluZ1Jlc3BvbnNlIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5jb25zdCBwYXJzZXJzOiBMaW5lUGFyc2VyPE1vdmVSZXN1bHQ+W10gPSBbXG4gICBuZXcgTGluZVBhcnNlcigvXlJlbmFtaW5nICguKykgdG8gKC4rKSQvLCAocmVzdWx0LCBbZnJvbSwgdG9dKSA9PiB7XG4gICAgICByZXN1bHQubW92ZXMucHVzaCh7IGZyb20sIHRvIH0pO1xuICAgfSksXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VNb3ZlUmVzdWx0KHN0ZE91dDogc3RyaW5nKTogTW92ZVJlc3VsdCB7XG4gICByZXR1cm4gcGFyc2VTdHJpbmdSZXNwb25zZSh7IG1vdmVzOiBbXSB9LCBwYXJzZXJzLCBzdGRPdXQpO1xufVxuIiwgImltcG9ydCB0eXBlIHsgTW92ZVJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgcGFyc2VNb3ZlUmVzdWx0IH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZS1tb3ZlJztcbmltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGFzQXJyYXkgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlVGFzayhmcm9tOiBzdHJpbmcgfCBzdHJpbmdbXSwgdG86IHN0cmluZyk6IFN0cmluZ1Rhc2s8TW92ZVJlc3VsdD4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzOiBbJ212JywgJy12JywgLi4uYXNBcnJheShmcm9tKSwgdG9dLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgcGFyc2VyOiBwYXJzZU1vdmVSZXN1bHQsXG4gICB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgUHVsbFJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgR2l0UmVzcG9uc2VFcnJvciB9IGZyb20gJy4uL2Vycm9ycy9naXQtcmVzcG9uc2UtZXJyb3InO1xuaW1wb3J0IHsgcGFyc2VQdWxsRXJyb3JSZXN1bHQsIHBhcnNlUHVsbFJlc3VsdCB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2UtcHVsbCc7XG5pbXBvcnQgdHlwZSB7IE1heWJlLCBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgYnVmZmVyVG9TdHJpbmcgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBwdWxsVGFzayhcbiAgIHJlbW90ZTogTWF5YmU8c3RyaW5nPixcbiAgIGJyYW5jaDogTWF5YmU8c3RyaW5nPixcbiAgIGN1c3RvbUFyZ3M6IHN0cmluZ1tdXG4pOiBTdHJpbmdUYXNrPFB1bGxSZXN1bHQ+IHtcbiAgIGNvbnN0IGNvbW1hbmRzOiBzdHJpbmdbXSA9IFsncHVsbCcsIC4uLmN1c3RvbUFyZ3NdO1xuICAgaWYgKHJlbW90ZSAmJiBicmFuY2gpIHtcbiAgICAgIGNvbW1hbmRzLnNwbGljZSgxLCAwLCByZW1vdGUsIGJyYW5jaCk7XG4gICB9XG5cbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kcyxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIHBhcnNlcihzdGRPdXQsIHN0ZEVycik6IFB1bGxSZXN1bHQge1xuICAgICAgICAgcmV0dXJuIHBhcnNlUHVsbFJlc3VsdChzdGRPdXQsIHN0ZEVycik7XG4gICAgICB9LFxuICAgICAgb25FcnJvcihyZXN1bHQsIF9lcnJvciwgX2RvbmUsIGZhaWwpIHtcbiAgICAgICAgIGNvbnN0IHB1bGxFcnJvciA9IHBhcnNlUHVsbEVycm9yUmVzdWx0KFxuICAgICAgICAgICAgYnVmZmVyVG9TdHJpbmcocmVzdWx0LnN0ZE91dCksXG4gICAgICAgICAgICBidWZmZXJUb1N0cmluZyhyZXN1bHQuc3RkRXJyKVxuICAgICAgICAgKTtcbiAgICAgICAgIGlmIChwdWxsRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWlsKG5ldyBHaXRSZXNwb25zZUVycm9yKHB1bGxFcnJvcikpO1xuICAgICAgICAgfVxuXG4gICAgICAgICBmYWlsKF9lcnJvcik7XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgeyBmb3JFYWNoTGluZVdpdGhDb250ZW50IH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlbW90ZVdpdGhvdXRSZWZzIHtcbiAgIG5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZW1vdGVXaXRoUmVmcyBleHRlbmRzIFJlbW90ZVdpdGhvdXRSZWZzIHtcbiAgIHJlZnM6IHtcbiAgICAgIGZldGNoOiBzdHJpbmc7XG4gICAgICBwdXNoOiBzdHJpbmc7XG4gICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VHZXRSZW1vdGVzKHRleHQ6IHN0cmluZyk6IFJlbW90ZVdpdGhvdXRSZWZzW10ge1xuICAgY29uc3QgcmVtb3RlczogeyBbbmFtZTogc3RyaW5nXTogUmVtb3RlV2l0aG91dFJlZnMgfSA9IHt9O1xuXG4gICBmb3JFYWNoKHRleHQsIChbbmFtZV0pID0+IChyZW1vdGVzW25hbWVdID0geyBuYW1lIH0pKTtcblxuICAgcmV0dXJuIE9iamVjdC52YWx1ZXMocmVtb3Rlcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUdldFJlbW90ZXNWZXJib3NlKHRleHQ6IHN0cmluZyk6IFJlbW90ZVdpdGhSZWZzW10ge1xuICAgY29uc3QgcmVtb3RlczogeyBbbmFtZTogc3RyaW5nXTogUmVtb3RlV2l0aFJlZnMgfSA9IHt9O1xuXG4gICBmb3JFYWNoKHRleHQsIChbbmFtZSwgdXJsLCBwdXJwb3NlXSkgPT4ge1xuICAgICAgaWYgKCFPYmplY3QuaGFzT3duKHJlbW90ZXMsIG5hbWUpKSB7XG4gICAgICAgICByZW1vdGVzW25hbWVdID0ge1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIHJlZnM6IHsgZmV0Y2g6ICcnLCBwdXNoOiAnJyB9LFxuICAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKHB1cnBvc2UgJiYgdXJsKSB7XG4gICAgICAgICByZW1vdGVzW25hbWVdLnJlZnNbcHVycG9zZS5yZXBsYWNlKC9bXmEtel0vZywgJycpIGFzIGtleW9mIFJlbW90ZVdpdGhSZWZzWydyZWZzJ11dID0gdXJsO1xuICAgICAgfVxuICAgfSk7XG5cbiAgIHJldHVybiBPYmplY3QudmFsdWVzKHJlbW90ZXMpO1xufVxuXG5mdW5jdGlvbiBmb3JFYWNoKHRleHQ6IHN0cmluZywgaGFuZGxlcjogKGxpbmU6IHN0cmluZ1tdKSA9PiB2b2lkKSB7XG4gICBmb3JFYWNoTGluZVdpdGhDb250ZW50KHRleHQsIChsaW5lKSA9PiBoYW5kbGVyKGxpbmUuc3BsaXQoL1xccysvKSkpO1xufVxuIiwgImltcG9ydCB7XG4gICBwYXJzZUdldFJlbW90ZXMsXG4gICBwYXJzZUdldFJlbW90ZXNWZXJib3NlLFxuICAgdHlwZSBSZW1vdGVXaXRob3V0UmVmcyxcbiAgIHR5cGUgUmVtb3RlV2l0aFJlZnMsXG59IGZyb20gJy4uL3Jlc3BvbnNlcy9HZXRSZW1vdGVTdW1tYXJ5JztcbmltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkUmVtb3RlVGFzayhcbiAgIHJlbW90ZU5hbWU6IHN0cmluZyxcbiAgIHJlbW90ZVJlcG86IHN0cmluZyxcbiAgIGN1c3RvbUFyZ3M6IHN0cmluZ1tdXG4pOiBTdHJpbmdUYXNrPHN0cmluZz4ge1xuICAgcmV0dXJuIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soWydyZW1vdGUnLCAnYWRkJywgLi4uY3VzdG9tQXJncywgcmVtb3RlTmFtZSwgcmVtb3RlUmVwb10pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVtb3Rlc1Rhc2sodmVyYm9zZTogdHJ1ZSk6IFN0cmluZ1Rhc2s8UmVtb3RlV2l0aFJlZnNbXT47XG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVtb3Rlc1Rhc2sodmVyYm9zZTogZmFsc2UpOiBTdHJpbmdUYXNrPFJlbW90ZVdpdGhvdXRSZWZzW10+O1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJlbW90ZXNUYXNrKFxuICAgdmVyYm9zZTogYm9vbGVhblxuKTogU3RyaW5nVGFzazxSZW1vdGVXaXRoUmVmc1tdIHwgUmVtb3RlV2l0aG91dFJlZnNbXT4ge1xuICAgY29uc3QgY29tbWFuZHMgPSBbJ3JlbW90ZSddO1xuICAgaWYgKHZlcmJvc2UpIHtcbiAgICAgIGNvbW1hbmRzLnB1c2goJy12Jyk7XG4gICB9XG5cbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kcyxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIHBhcnNlcjogdmVyYm9zZSA/IHBhcnNlR2V0UmVtb3Rlc1ZlcmJvc2UgOiBwYXJzZUdldFJlbW90ZXMsXG4gICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGlzdFJlbW90ZXNUYXNrKGN1c3RvbUFyZ3M6IHN0cmluZ1tdKTogU3RyaW5nVGFzazxzdHJpbmc+IHtcbiAgIGNvbnN0IGNvbW1hbmRzID0gWy4uLmN1c3RvbUFyZ3NdO1xuICAgaWYgKGNvbW1hbmRzWzBdICE9PSAnbHMtcmVtb3RlJykge1xuICAgICAgY29tbWFuZHMudW5zaGlmdCgnbHMtcmVtb3RlJyk7XG4gICB9XG5cbiAgIHJldHVybiBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKGNvbW1hbmRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW90ZVRhc2soY3VzdG9tQXJnczogc3RyaW5nW10pOiBTdHJpbmdUYXNrPHN0cmluZz4ge1xuICAgY29uc3QgY29tbWFuZHMgPSBbLi4uY3VzdG9tQXJnc107XG4gICBpZiAoY29tbWFuZHNbMF0gIT09ICdyZW1vdGUnKSB7XG4gICAgICBjb21tYW5kcy51bnNoaWZ0KCdyZW1vdGUnKTtcbiAgIH1cblxuICAgcmV0dXJuIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soY29tbWFuZHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlUmVtb3RlVGFzayhyZW1vdGVOYW1lOiBzdHJpbmcpIHtcbiAgIHJldHVybiBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKFsncmVtb3RlJywgJ3JlbW92ZScsIHJlbW90ZU5hbWVdKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IExvZ09wdGlvbnMsIExvZ1Jlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgbG9nRm9ybWF0RnJvbUNvbW1hbmQgfSBmcm9tICcuLi9hcmdzL2xvZy1mb3JtYXQnO1xuaW1wb3J0IHsgY3JlYXRlTGlzdExvZ1N1bW1hcnlQYXJzZXIgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlLWxpc3QtbG9nLXN1bW1hcnknO1xuaW1wb3J0IHR5cGUgeyBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgdmFsaWRhdGVMb2dGb3JtYXRDb25maWcgfSBmcm9tICcuL2RpZmYnO1xuaW1wb3J0IHsgcGFyc2VMb2dPcHRpb25zIH0gZnJvbSAnLi9sb2cnO1xuaW1wb3J0IHR5cGUgeyBFbXB0eVRhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5leHBvcnQgZnVuY3Rpb24gc3Rhc2hMaXN0VGFzayhcbiAgIG9wdDogTG9nT3B0aW9ucyA9IHt9LFxuICAgY3VzdG9tQXJnczogc3RyaW5nW11cbik6IEVtcHR5VGFzayB8IFN0cmluZ1Rhc2s8TG9nUmVzdWx0PiB7XG4gICBjb25zdCBvcHRpb25zID0gcGFyc2VMb2dPcHRpb25zPGFueT4ob3B0KTtcbiAgIGNvbnN0IGNvbW1hbmRzID0gWydzdGFzaCcsICdsaXN0JywgLi4ub3B0aW9ucy5jb21tYW5kcywgLi4uY3VzdG9tQXJnc107XG4gICBjb25zdCBwYXJzZXIgPSBjcmVhdGVMaXN0TG9nU3VtbWFyeVBhcnNlcihcbiAgICAgIG9wdGlvbnMuc3BsaXR0ZXIsXG4gICAgICBvcHRpb25zLmZpZWxkcyxcbiAgICAgIGxvZ0Zvcm1hdEZyb21Db21tYW5kKGNvbW1hbmRzKVxuICAgKTtcblxuICAgcmV0dXJuIChcbiAgICAgIHZhbGlkYXRlTG9nRm9ybWF0Q29uZmlnKGNvbW1hbmRzKSB8fCB7XG4gICAgICAgICBjb21tYW5kcyxcbiAgICAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgICAgIHBhcnNlcixcbiAgICAgIH1cbiAgICk7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTdWJNb2R1bGVUYXNrKHJlcG86IHN0cmluZywgcGF0aDogc3RyaW5nKTogU3RyaW5nVGFzazxzdHJpbmc+IHtcbiAgIHJldHVybiBzdWJNb2R1bGVUYXNrKFsnYWRkJywgcmVwbywgcGF0aF0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdFN1Yk1vZHVsZVRhc2soY3VzdG9tQXJnczogc3RyaW5nW10pOiBTdHJpbmdUYXNrPHN0cmluZz4ge1xuICAgcmV0dXJuIHN1Yk1vZHVsZVRhc2soWydpbml0JywgLi4uY3VzdG9tQXJnc10pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3ViTW9kdWxlVGFzayhjdXN0b21BcmdzOiBzdHJpbmdbXSk6IFN0cmluZ1Rhc2s8c3RyaW5nPiB7XG4gICBjb25zdCBjb21tYW5kcyA9IFsuLi5jdXN0b21BcmdzXTtcbiAgIGlmIChjb21tYW5kc1swXSAhPT0gJ3N1Ym1vZHVsZScpIHtcbiAgICAgIGNvbW1hbmRzLnVuc2hpZnQoJ3N1Ym1vZHVsZScpO1xuICAgfVxuXG4gICByZXR1cm4gc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhjb21tYW5kcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVTdWJNb2R1bGVUYXNrKGN1c3RvbUFyZ3M6IHN0cmluZ1tdKTogU3RyaW5nVGFzazxzdHJpbmc+IHtcbiAgIHJldHVybiBzdWJNb2R1bGVUYXNrKFsndXBkYXRlJywgLi4uY3VzdG9tQXJnc10pO1xufVxuIiwgImltcG9ydCB0eXBlIHsgVGFnUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5cbmV4cG9ydCBjbGFzcyBUYWdMaXN0IGltcGxlbWVudHMgVGFnUmVzdWx0IHtcbiAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHJlYWRvbmx5IGFsbDogc3RyaW5nW10sXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgbGF0ZXN0OiBzdHJpbmcgfCB1bmRlZmluZWRcbiAgICkge31cbn1cblxuZXhwb3J0IGNvbnN0IHBhcnNlVGFnTGlzdCA9IGZ1bmN0aW9uIChkYXRhOiBzdHJpbmcsIGN1c3RvbVNvcnQgPSBmYWxzZSkge1xuICAgY29uc3QgdGFncyA9IGRhdGEuc3BsaXQoJ1xcbicpLm1hcCh0cmltbWVkKS5maWx0ZXIoQm9vbGVhbik7XG5cbiAgIGlmICghY3VzdG9tU29ydCkge1xuICAgICAgdGFncy5zb3J0KGZ1bmN0aW9uICh0YWdBLCB0YWdCKSB7XG4gICAgICAgICBjb25zdCBwYXJ0c0EgPSB0YWdBLnNwbGl0KCcuJyk7XG4gICAgICAgICBjb25zdCBwYXJ0c0IgPSB0YWdCLnNwbGl0KCcuJyk7XG5cbiAgICAgICAgIGlmIChwYXJ0c0EubGVuZ3RoID09PSAxIHx8IHBhcnRzQi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBzaW5nbGVTb3J0ZWQodG9OdW1iZXIocGFydHNBWzBdKSwgdG9OdW1iZXIocGFydHNCWzBdKSk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gTWF0aC5tYXgocGFydHNBLmxlbmd0aCwgcGFydHNCLmxlbmd0aCk7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGRpZmYgPSBzb3J0ZWQodG9OdW1iZXIocGFydHNBW2ldKSwgdG9OdW1iZXIocGFydHNCW2ldKSk7XG5cbiAgICAgICAgICAgIGlmIChkaWZmKSB7XG4gICAgICAgICAgICAgICByZXR1cm4gZGlmZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH1cblxuICAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9KTtcbiAgIH1cblxuICAgY29uc3QgbGF0ZXN0ID0gY3VzdG9tU29ydCA/IHRhZ3NbMF0gOiBbLi4udGFnc10ucmV2ZXJzZSgpLmZpbmQoKHRhZykgPT4gdGFnLmluZGV4T2YoJy4nKSA+PSAwKTtcblxuICAgcmV0dXJuIG5ldyBUYWdMaXN0KHRhZ3MsIGxhdGVzdCk7XG59O1xuXG5mdW5jdGlvbiBzaW5nbGVTb3J0ZWQoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXIge1xuICAgY29uc3QgYUlzTnVtID0gTnVtYmVyLmlzTmFOKGEpO1xuICAgY29uc3QgYklzTnVtID0gTnVtYmVyLmlzTmFOKGIpO1xuXG4gICBpZiAoYUlzTnVtICE9PSBiSXNOdW0pIHtcbiAgICAgIHJldHVybiBhSXNOdW0gPyAxIDogLTE7XG4gICB9XG5cbiAgIHJldHVybiBhSXNOdW0gPyBzb3J0ZWQoYSwgYikgOiAwO1xufVxuXG5mdW5jdGlvbiBzb3J0ZWQoYTogbnVtYmVyLCBiOiBudW1iZXIpIHtcbiAgIHJldHVybiBhID09PSBiID8gMCA6IGEgPiBiID8gMSA6IC0xO1xufVxuXG5mdW5jdGlvbiB0cmltbWVkKGlucHV0OiBzdHJpbmcpIHtcbiAgIHJldHVybiBpbnB1dC50cmltKCk7XG59XG5cbmZ1bmN0aW9uIHRvTnVtYmVyKGlucHV0OiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQoaW5wdXQucmVwbGFjZSgvXlxcRCsvZywgJycpLCAxMCkgfHwgMDtcbiAgIH1cblxuICAgcmV0dXJuIDA7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBUYWdSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IHBhcnNlVGFnTGlzdCB9IGZyb20gJy4uL3Jlc3BvbnNlcy9UYWdMaXN0JztcbmltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcblxuLyoqXG4gKiBUYXNrIHVzZWQgYnkgYGdpdC50YWdzYFxuICovXG5leHBvcnQgZnVuY3Rpb24gdGFnTGlzdFRhc2soY3VzdG9tQXJnczogc3RyaW5nW10gPSBbXSk6IFN0cmluZ1Rhc2s8VGFnUmVzdWx0PiB7XG4gICBjb25zdCBoYXNDdXN0b21Tb3J0ID0gY3VzdG9tQXJncy5zb21lKChvcHRpb24pID0+IC9eLS1zb3J0PS8udGVzdChvcHRpb24pKTtcblxuICAgcmV0dXJuIHtcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIGNvbW1hbmRzOiBbJ3RhZycsICctbCcsIC4uLmN1c3RvbUFyZ3NdLFxuICAgICAgcGFyc2VyKHRleHQ6IHN0cmluZykge1xuICAgICAgICAgcmV0dXJuIHBhcnNlVGFnTGlzdCh0ZXh0LCBoYXNDdXN0b21Tb3J0KTtcbiAgICAgIH0sXG4gICB9O1xufVxuXG4vKipcbiAqIFRhc2sgdXNlZCBieSBgZ2l0LmFkZFRhZ2BcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZFRhZ1Rhc2sobmFtZTogc3RyaW5nKTogU3RyaW5nVGFzazx7IG5hbWU6IHN0cmluZyB9PiB7XG4gICByZXR1cm4ge1xuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgY29tbWFuZHM6IFsndGFnJywgbmFtZV0sXG4gICAgICBwYXJzZXIoKSB7XG4gICAgICAgICByZXR1cm4geyBuYW1lIH07XG4gICAgICB9LFxuICAgfTtcbn1cblxuLyoqXG4gKiBUYXNrIHVzZWQgYnkgYGdpdC5hZGRUYWdgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRBbm5vdGF0ZWRUYWdUYXNrKFxuICAgbmFtZTogc3RyaW5nLFxuICAgdGFnTWVzc2FnZTogc3RyaW5nXG4pOiBTdHJpbmdUYXNrPHsgbmFtZTogc3RyaW5nIH0+IHtcbiAgIHJldHVybiB7XG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBjb21tYW5kczogWyd0YWcnLCAnLWEnLCAnLW0nLCB0YWdNZXNzYWdlLCBuYW1lXSxcbiAgICAgIHBhcnNlcigpIHtcbiAgICAgICAgIHJldHVybiB7IG5hbWUgfTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB7R2l0RXhlY3V0b3J9IGZyb20gXCIuL2xpYi9ydW5uZXJzL2dpdC1leGVjdXRvclwiO1xuXG5pbXBvcnQge1NpbXBsZUdpdEFwaX0gZnJvbSBcIi4vbGliL3NpbXBsZS1naXQtYXBpXCI7XG5cbmltcG9ydCB7U2NoZWR1bGVyfSBmcm9tIFwiLi9saWIvcnVubmVycy9zY2hlZHVsZXJcIjtcblxuaW1wb3J0IHtcbiAgIGNvbmZpZ3VyYXRpb25FcnJvclRhc2ssXG4gICBzdHJhaWdodFRocm91Z2hCdWZmZXJUYXNrLFxuICAgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFza1xufSBmcm9tIFwiLi9saWIvdGFza3MvdGFza1wiO1xuXG5pbXBvcnQge1xuICAgYXNBcnJheSxcbiAgIGZpbHRlckFycmF5LFxuICAgZmlsdGVyUHJpbWl0aXZlcyxcbiAgIGZpbHRlclN0cmluZyxcbiAgIGZpbHRlclN0cmluZ09yU3RyaW5nQXJyYXksXG4gICBmaWx0ZXJUeXBlLFxuICAgZ2V0VHJhaWxpbmdPcHRpb25zLFxuICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50LFxuICAgdHJhaWxpbmdPcHRpb25zQXJndW1lbnRcbn0gZnJvbSBcIi4vbGliL3V0aWxzXCI7XG5cbmltcG9ydCB7YXBwbHlQYXRjaFRhc2t9IGZyb20gXCIuL2xpYi90YXNrcy9hcHBseS1wYXRjaFwiO1xuXG5pbXBvcnQge2JyYW5jaExvY2FsVGFzaywgYnJhbmNoVGFzaywgZGVsZXRlQnJhbmNoZXNUYXNrLCBkZWxldGVCcmFuY2hUYXNrfSBmcm9tIFwiLi9saWIvdGFza3MvYnJhbmNoXCI7XG5cbmltcG9ydCB7Y2hlY2tJZ25vcmVUYXNrfSBmcm9tIFwiLi9saWIvdGFza3MvY2hlY2staWdub3JlXCI7XG5cbmltcG9ydCB7Y2hlY2tJc1JlcG9UYXNrfSBmcm9tIFwiLi9saWIvdGFza3MvY2hlY2staXMtcmVwb1wiO1xuXG5pbXBvcnQge2NsZWFuV2l0aE9wdGlvbnNUYXNrLCBpc0NsZWFuT3B0aW9uc0FycmF5fSBmcm9tIFwiLi9saWIvdGFza3MvY2xlYW5cIjtcblxuaW1wb3J0IHtkaWZmU3VtbWFyeVRhc2t9IGZyb20gXCIuL2xpYi90YXNrcy9kaWZmXCI7XG5cbmltcG9ydCB7ZmV0Y2hUYXNrfSBmcm9tIFwiLi9saWIvdGFza3MvZmV0Y2hcIjtcblxuaW1wb3J0IHttb3ZlVGFza30gZnJvbSBcIi4vbGliL3Rhc2tzL21vdmVcIjtcblxuaW1wb3J0IHtwdWxsVGFza30gZnJvbSBcIi4vbGliL3Rhc2tzL3B1bGxcIjtcblxuaW1wb3J0IHtwdXNoVGFnc1Rhc2t9IGZyb20gXCIuL2xpYi90YXNrcy9wdXNoXCI7XG5cbmltcG9ydCB7YWRkUmVtb3RlVGFzaywgZ2V0UmVtb3Rlc1Rhc2ssIGxpc3RSZW1vdGVzVGFzaywgcmVtb3RlVGFzaywgcmVtb3ZlUmVtb3RlVGFza30gZnJvbSBcIi4vbGliL3Rhc2tzL3JlbW90ZVwiO1xuXG5pbXBvcnQge2dldFJlc2V0TW9kZSwgcmVzZXRUYXNrfSBmcm9tIFwiLi9saWIvdGFza3MvcmVzZXRcIjtcblxuaW1wb3J0IHtzdGFzaExpc3RUYXNrfSBmcm9tIFwiLi9saWIvdGFza3Mvc3Rhc2gtbGlzdFwiO1xuXG5pbXBvcnQge2FkZFN1Yk1vZHVsZVRhc2ssIGluaXRTdWJNb2R1bGVUYXNrLCBzdWJNb2R1bGVUYXNrLCB1cGRhdGVTdWJNb2R1bGVUYXNrfSBmcm9tIFwiLi9saWIvdGFza3Mvc3ViLW1vZHVsZVwiO1xuXG5pbXBvcnQge2FkZEFubm90YXRlZFRhZ1Rhc2ssIGFkZFRhZ1Rhc2ssIHRhZ0xpc3RUYXNrfSBmcm9tIFwiLi9saWIvdGFza3MvdGFnXCI7XG5cbmZ1bmN0aW9uIEdpdChvcHRpb25zLCBwbHVnaW5zKSB7XG4gICB0aGlzLl9wbHVnaW5zID0gcGx1Z2lucztcbiAgIHRoaXMuX2V4ZWN1dG9yID0gbmV3IEdpdEV4ZWN1dG9yKFxuICAgICAgb3B0aW9ucy5iYXNlRGlyLFxuICAgICAgbmV3IFNjaGVkdWxlcihvcHRpb25zLm1heENvbmN1cnJlbnRQcm9jZXNzZXMpLFxuICAgICAgcGx1Z2luc1xuICAgKTtcblxuICAgdGhpcy5fdHJpbW1lZCA9IG9wdGlvbnMudHJpbW1lZDtcbn1cblxuKEdpdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFNpbXBsZUdpdEFwaS5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IEdpdDtcblxuLyoqXG4gKiBTZXRzIHRoZSBwYXRoIHRvIGEgY3VzdG9tIGdpdCBiaW5hcnksIHNob3VsZCBlaXRoZXIgYmUgYGdpdGAgd2hlbiB0aGVyZSBpcyBhbiBpbnN0YWxsYXRpb24gb2YgZ2l0IGF2YWlsYWJsZSBvblxuICogdGhlIHN5c3RlbSBwYXRoLCBvciBhIGZ1bGx5IHF1YWxpZmllZCBwYXRoIHRvIHRoZSBleGVjdXRhYmxlLlxuICovXG5HaXQucHJvdG90eXBlLmN1c3RvbUJpbmFyeSA9IGZ1bmN0aW9uIChjb21tYW5kKSB7XG4gICB0aGlzLl9wbHVnaW5zLnJlY29uZmlndXJlKCdiaW5hcnknLCBjb21tYW5kKTtcbiAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIGFuIGVudmlyb25tZW50IHZhcmlhYmxlIGZvciB0aGUgc3Bhd25lZCBjaGlsZCBwcm9jZXNzLCBlaXRoZXIgc3VwcGx5IGJvdGggYSBuYW1lIGFuZCB2YWx1ZSBhcyBzdHJpbmdzIG9yXG4gKiBhIHNpbmdsZSBvYmplY3QgdG8gZW50aXJlbHkgcmVwbGFjZSB0aGUgY3VycmVudCBlbnZpcm9ubWVudCB2YXJpYWJsZXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8T2JqZWN0fSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gW3ZhbHVlXVxuICogQHJldHVybnMge0dpdH1cbiAqL1xuR2l0LnByb3RvdHlwZS5lbnYgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBuYW1lID09PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5fZXhlY3V0b3IuZW52ID0gbmFtZTtcbiAgIH0gZWxzZSB7XG4gICAgICAodGhpcy5fZXhlY3V0b3IuZW52ID0gdGhpcy5fZXhlY3V0b3IuZW52IHx8IHt9KVtuYW1lXSA9IHZhbHVlO1xuICAgfVxuXG4gICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTGlzdCB0aGUgc3Rhc2gocykgb2YgdGhlIGxvY2FsIHJlcG9cbiAqL1xuR2l0LnByb3RvdHlwZS5zdGFzaExpc3QgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBzdGFzaExpc3RUYXNrKFxuICAgICAgICAgdHJhaWxpbmdPcHRpb25zQXJndW1lbnQoYXJndW1lbnRzKSB8fCB7fSxcbiAgICAgICAgIChmaWx0ZXJBcnJheShvcHRpb25zKSAmJiBvcHRpb25zKSB8fCBbXVxuICAgICAgKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKiBNb3ZlcyBvbmUgb3IgbW9yZSBmaWxlcyB0byBhIG5ldyBkZXN0aW5hdGlvbi5cbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0LXNjbS5jb20vZG9jcy9naXQtbXZcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gZnJvbVxuICogQHBhcmFtIHtzdHJpbmd9IHRvXG4gKi9cbkdpdC5wcm90b3R5cGUubXYgPSBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKG1vdmVUYXNrKGZyb20sIHRvKSwgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cykpO1xufTtcblxuLyoqXG4gKiBJbnRlcm5hbGx5IHVzZXMgcHVsbCBhbmQgdGFncyB0byBnZXQgdGhlIGxpc3Qgb2YgdGFncyB0aGVuIGNoZWNrcyBvdXQgdGhlIGxhdGVzdCB0YWcuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3RoZW5dXG4gKi9cbkdpdC5wcm90b3R5cGUuY2hlY2tvdXRMYXRlc3RUYWcgPSBmdW5jdGlvbiAodGhlbikge1xuICAgdmFyIGdpdCA9IHRoaXM7XG4gICByZXR1cm4gdGhpcy5wdWxsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGdpdC50YWdzKGZ1bmN0aW9uIChlcnIsIHRhZ3MpIHtcbiAgICAgICAgIGdpdC5jaGVja291dCh0YWdzLmxhdGVzdCwgdGhlbik7XG4gICAgICB9KTtcbiAgIH0pO1xufTtcblxuLyoqXG4gKiBQdWxsIHRoZSB1cGRhdGVkIGNvbnRlbnRzIG9mIHRoZSBjdXJyZW50IHJlcG9cbiAqL1xuR2l0LnByb3RvdHlwZS5wdWxsID0gZnVuY3Rpb24gKHJlbW90ZSwgYnJhbmNoLCBvcHRpb25zLCB0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIHB1bGxUYXNrKFxuICAgICAgICAgZmlsdGVyVHlwZShyZW1vdGUsIGZpbHRlclN0cmluZyksXG4gICAgICAgICBmaWx0ZXJUeXBlKGJyYW5jaCwgZmlsdGVyU3RyaW5nKSxcbiAgICAgICAgIGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpXG4gICAgICApLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG4vKipcbiAqIEZldGNoIHRoZSB1cGRhdGVkIGNvbnRlbnRzIG9mIHRoZSBjdXJyZW50IHJlcG8uXG4gKlxuICogQGV4YW1wbGVcbiAqICAgLmZldGNoKCd1cHN0cmVhbScsICdtYXN0ZXInKSAvLyBmZXRjaGVzIGZyb20gbWFzdGVyIG9uIHJlbW90ZSBuYW1lZCB1cHN0cmVhbVxuICogICAuZmV0Y2goZnVuY3Rpb24gKCkge30pIC8vIHJ1bnMgZmV0Y2ggYWdhaW5zdCBkZWZhdWx0IHJlbW90ZSBhbmQgYnJhbmNoIGFuZCBjYWxscyBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBbcmVtb3RlXVxuICogQHBhcmFtIHtzdHJpbmd9IFticmFuY2hdXG4gKi9cbkdpdC5wcm90b3R5cGUuZmV0Y2ggPSBmdW5jdGlvbiAocmVtb3RlLCBicmFuY2gpIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgZmV0Y2hUYXNrKFxuICAgICAgICAgZmlsdGVyVHlwZShyZW1vdGUsIGZpbHRlclN0cmluZyksXG4gICAgICAgICBmaWx0ZXJUeXBlKGJyYW5jaCwgZmlsdGVyU3RyaW5nKSxcbiAgICAgICAgIGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpXG4gICAgICApLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG4vKipcbiAqIExpc3QgYWxsIHRhZ3MuIFdoZW4gdXNpbmcgZ2l0IDIuNy4wIG9yIGFib3ZlLCBpbmNsdWRlIGFuIG9wdGlvbnMgb2JqZWN0IHdpdGggYFwiLS1zb3J0XCI6IFwicHJvcGVydHktbmFtZVwiYCB0b1xuICogc29ydCB0aGUgdGFncyBieSB0aGF0IHByb3BlcnR5IGluc3RlYWQgb2YgdXNpbmcgdGhlIGRlZmF1bHQgc2VtYW50aWMgdmVyc2lvbmluZyBzb3J0LlxuICpcbiAqIE5vdGUsIHN1cHBseWluZyB0aGlzIG9wdGlvbiB3aGVuIGl0IGlzIG5vdCBzdXBwb3J0ZWQgYnkgeW91ciBHaXQgdmVyc2lvbiB3aWxsIGNhdXNlIHRoZSBvcGVyYXRpb24gdG8gZmFpbC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdGhlbl1cbiAqL1xuR2l0LnByb3RvdHlwZS50YWdzID0gZnVuY3Rpb24gKG9wdGlvbnMsIHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgdGFnTGlzdFRhc2soZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cykpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG4vKipcbiAqIFJlYmFzZXMgdGhlIGN1cnJlbnQgd29ya2luZyBjb3B5LiBPcHRpb25zIGNhbiBiZSBzdXBwbGllZCBlaXRoZXIgYXMgYW4gYXJyYXkgb2Ygc3RyaW5nIHBhcmFtZXRlcnNcbiAqIHRvIGJlIHNlbnQgdG8gdGhlIGBnaXQgcmViYXNlYCBjb21tYW5kLCBvciBhIHN0YW5kYXJkIG9wdGlvbnMgb2JqZWN0LlxuICovXG5HaXQucHJvdG90eXBlLnJlYmFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhbJ3JlYmFzZScsIC4uLmdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpXSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICogUmVzZXQgYSByZXBvXG4gKi9cbkdpdC5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAobW9kZSkge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICByZXNldFRhc2soZ2V0UmVzZXRNb2RlKG1vZGUpLCBnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICogUmV2ZXJ0IG9uZSBvciBtb3JlIGNvbW1pdHMgaW4gdGhlIGxvY2FsIHdvcmtpbmcgY29weVxuICovXG5HaXQucHJvdG90eXBlLnJldmVydCA9IGZ1bmN0aW9uIChjb21taXQpIHtcbiAgIGNvbnN0IG5leHQgPSB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKTtcblxuICAgaWYgKHR5cGVvZiBjb21taXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhjb25maWd1cmF0aW9uRXJyb3JUYXNrKCdDb21taXQgbXVzdCBiZSBhIHN0cmluZycpLCBuZXh0KTtcbiAgIH1cblxuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKFsncmV2ZXJ0JywgLi4uZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cywgMCwgdHJ1ZSksIGNvbW1pdF0pLFxuICAgICAgbmV4dFxuICAgKTtcbn07XG5cbi8qKlxuICogQWRkIGEgbGlnaHR3ZWlnaHQgdGFnIHRvIHRoZSBoZWFkIG9mIHRoZSBjdXJyZW50IGJyYW5jaFxuICovXG5HaXQucHJvdG90eXBlLmFkZFRhZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICBjb25zdCB0YXNrID1cbiAgICAgIHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJ1xuICAgICAgICAgPyBhZGRUYWdUYXNrKG5hbWUpXG4gICAgICAgICA6IGNvbmZpZ3VyYXRpb25FcnJvclRhc2soJ0dpdC5hZGRUYWcgcmVxdWlyZXMgYSB0YWcgbmFtZScpO1xuXG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayh0YXNrLCB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKSk7XG59O1xuXG4vKipcbiAqIEFkZCBhbiBhbm5vdGF0ZWQgdGFnIHRvIHRoZSBoZWFkIG9mIHRoZSBjdXJyZW50IGJyYW5jaFxuICovXG5HaXQucHJvdG90eXBlLmFkZEFubm90YXRlZFRhZyA9IGZ1bmN0aW9uICh0YWdOYW1lLCB0YWdNZXNzYWdlKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIGFkZEFubm90YXRlZFRhZ1Rhc2sodGFnTmFtZSwgdGFnTWVzc2FnZSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICogRGVsZXRlIGEgbG9jYWwgYnJhbmNoXG4gKi9cbkdpdC5wcm90b3R5cGUuZGVsZXRlTG9jYWxCcmFuY2ggPSBmdW5jdGlvbiAoYnJhbmNoTmFtZSwgZm9yY2VEZWxldGUsIHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgZGVsZXRlQnJhbmNoVGFzayhicmFuY2hOYW1lLCB0eXBlb2YgZm9yY2VEZWxldGUgPT09ICdib29sZWFuJyA/IGZvcmNlRGVsZXRlIDogZmFsc2UpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG4vKipcbiAqIERlbGV0ZSBvbmUgb3IgbW9yZSBsb2NhbCBicmFuY2hlc1xuICovXG5HaXQucHJvdG90eXBlLmRlbGV0ZUxvY2FsQnJhbmNoZXMgPSBmdW5jdGlvbiAoYnJhbmNoTmFtZXMsIGZvcmNlRGVsZXRlLCB0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIGRlbGV0ZUJyYW5jaGVzVGFzayhicmFuY2hOYW1lcywgdHlwZW9mIGZvcmNlRGVsZXRlID09PSAnYm9vbGVhbicgPyBmb3JjZURlbGV0ZSA6IGZhbHNlKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKiBMaXN0IGFsbCBicmFuY2hlc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0IHwgc3RyaW5nW119IFtvcHRpb25zXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3RoZW5dXG4gKi9cbkdpdC5wcm90b3R5cGUuYnJhbmNoID0gZnVuY3Rpb24gKG9wdGlvbnMsIHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgYnJhbmNoVGFzayhnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGxpc3Qgb2YgbG9jYWwgYnJhbmNoZXNcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdGhlbl1cbiAqL1xuR2l0LnByb3RvdHlwZS5icmFuY2hMb2NhbCA9IGZ1bmN0aW9uICh0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhicmFuY2hMb2NhbFRhc2soKSwgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cykpO1xufTtcblxuLyoqXG4gKiBFeGVjdXRlcyBhbnkgY29tbWFuZCBhZ2FpbnN0IHRoZSBnaXQgYmluYXJ5LlxuICovXG5HaXQucHJvdG90eXBlLnJhdyA9IGZ1bmN0aW9uIChjb21tYW5kcykge1xuICAgY29uc3QgY3JlYXRlUmVzdENvbW1hbmRzID0gIUFycmF5LmlzQXJyYXkoY29tbWFuZHMpO1xuICAgY29uc3QgY29tbWFuZCA9IFtdLnNsaWNlLmNhbGwoY3JlYXRlUmVzdENvbW1hbmRzID8gYXJndW1lbnRzIDogY29tbWFuZHMsIDApO1xuXG4gICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbW1hbmQubGVuZ3RoICYmIGNyZWF0ZVJlc3RDb21tYW5kczsgaSsrKSB7XG4gICAgICBpZiAoIWZpbHRlclByaW1pdGl2ZXMoY29tbWFuZFtpXSkpIHtcbiAgICAgICAgIGNvbW1hbmQuc3BsaWNlKGksIGNvbW1hbmQubGVuZ3RoIC0gaSk7XG4gICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgIH1cblxuICAgY29tbWFuZC5wdXNoKC4uLmdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMsIDAsIHRydWUpKTtcblxuICAgdmFyIG5leHQgPSB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKTtcblxuICAgaWYgKCFjb21tYW5kLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICBjb25maWd1cmF0aW9uRXJyb3JUYXNrKCdSYXc6IG11c3Qgc3VwcGx5IG9uZSBvciBtb3JlIGNvbW1hbmQgdG8gZXhlY3V0ZScpLFxuICAgICAgICAgbmV4dFxuICAgICAgKTtcbiAgIH1cblxuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhjb21tYW5kLCB0aGlzLl90cmltbWVkKSwgbmV4dCk7XG59O1xuXG5HaXQucHJvdG90eXBlLnN1Ym1vZHVsZUFkZCA9IGZ1bmN0aW9uIChyZXBvLCBwYXRoLCB0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhhZGRTdWJNb2R1bGVUYXNrKHJlcG8sIHBhdGgpLCB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKSk7XG59O1xuXG5HaXQucHJvdG90eXBlLnN1Ym1vZHVsZVVwZGF0ZSA9IGZ1bmN0aW9uIChhcmdzLCB0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIHVwZGF0ZVN1Yk1vZHVsZVRhc2soZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cywgdHJ1ZSkpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG5HaXQucHJvdG90eXBlLnN1Ym1vZHVsZUluaXQgPSBmdW5jdGlvbiAoYXJncywgdGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBpbml0U3ViTW9kdWxlVGFzayhnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzLCB0cnVlKSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbkdpdC5wcm90b3R5cGUuc3ViTW9kdWxlID0gZnVuY3Rpb24gKG9wdGlvbnMsIHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgc3ViTW9kdWxlVGFzayhnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbkdpdC5wcm90b3R5cGUubGlzdFJlbW90ZSA9IGZ1bmN0aW9uICgpIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgbGlzdFJlbW90ZXNUYXNrKGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKiBBZGRzIGEgcmVtb3RlIHRvIHRoZSBsaXN0IG9mIHJlbW90ZXMuXG4gKi9cbkdpdC5wcm90b3R5cGUuYWRkUmVtb3RlID0gZnVuY3Rpb24gKHJlbW90ZU5hbWUsIHJlbW90ZVJlcG8sIHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgYWRkUmVtb3RlVGFzayhyZW1vdGVOYW1lLCByZW1vdGVSZXBvLCBnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBhbiBlbnRyeSBieSBuYW1lIGZyb20gdGhlIGxpc3Qgb2YgcmVtb3Rlcy5cbiAqL1xuR2l0LnByb3RvdHlwZS5yZW1vdmVSZW1vdGUgPSBmdW5jdGlvbiAocmVtb3RlTmFtZSwgdGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2socmVtb3ZlUmVtb3RlVGFzayhyZW1vdGVOYW1lKSwgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cykpO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBjdXJyZW50bHkgYXZhaWxhYmxlIHJlbW90ZXMsIHNldHRpbmcgdGhlIG9wdGlvbmFsIHZlcmJvc2UgYXJndW1lbnQgdG8gdHJ1ZSBpbmNsdWRlcyBhZGRpdGlvbmFsXG4gKiBkZXRhaWwgb24gdGhlIHJlbW90ZXMgdGhlbXNlbHZlcy5cbiAqL1xuR2l0LnByb3RvdHlwZS5nZXRSZW1vdGVzID0gZnVuY3Rpb24gKHZlcmJvc2UsIHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKGdldFJlbW90ZXNUYXNrKHZlcmJvc2UgPT09IHRydWUpLCB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKSk7XG59O1xuXG4vKipcbiAqIENhbGwgYW55IGBnaXQgcmVtb3RlYCBmdW5jdGlvbiB3aXRoIGFyZ3VtZW50cyBwYXNzZWQgYXMgYW4gYXJyYXkgb2Ygc3RyaW5ncy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBvcHRpb25zXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdGhlbl1cbiAqL1xuR2l0LnByb3RvdHlwZS5yZW1vdGUgPSBmdW5jdGlvbiAob3B0aW9ucywgdGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICByZW1vdGVUYXNrKGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKiBDYWxsIGFueSBgZ2l0IHRhZ2AgZnVuY3Rpb24gd2l0aCBhcmd1bWVudHMgcGFzc2VkIGFzIGFuIGFycmF5IG9mIHN0cmluZ3MuXG4gKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gb3B0aW9uc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gW3RoZW5dXG4gKi9cbkdpdC5wcm90b3R5cGUudGFnID0gZnVuY3Rpb24gKG9wdGlvbnMsIHRoZW4pIHtcbiAgIGNvbnN0IGNvbW1hbmQgPSBnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKTtcblxuICAgaWYgKGNvbW1hbmRbMF0gIT09ICd0YWcnKSB7XG4gICAgICBjb21tYW5kLnVuc2hpZnQoJ3RhZycpO1xuICAgfVxuXG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKGNvbW1hbmQpLCB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKSk7XG59O1xuXG4vKipcbiAqIFVwZGF0ZXMgcmVwb3NpdG9yeSBzZXJ2ZXIgaW5mb1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFt0aGVuXVxuICovXG5HaXQucHJvdG90eXBlLnVwZGF0ZVNlcnZlckluZm8gPSBmdW5jdGlvbiAodGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKFsndXBkYXRlLXNlcnZlci1pbmZvJ10pLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG4vKipcbiAqIFB1c2hlcyB0aGUgY3VycmVudCB0YWcgY2hhbmdlcyB0byBhIHJlbW90ZSB3aGljaCBjYW4gYmUgZWl0aGVyIGEgVVJMIG9yIG5hbWVkIHJlbW90ZS4gV2hlbiBub3Qgc3BlY2lmaWVkIHVzZXMgdGhlXG4gKiBkZWZhdWx0IGNvbmZpZ3VyZWQgcmVtb3RlIHNwZWMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IFtyZW1vdGVdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdGhlbl1cbiAqL1xuR2l0LnByb3RvdHlwZS5wdXNoVGFncyA9IGZ1bmN0aW9uIChyZW1vdGUsIHRoZW4pIHtcbiAgIGNvbnN0IHRhc2sgPSBwdXNoVGFnc1Rhc2soXG4gICAgICB7IHJlbW90ZTogZmlsdGVyVHlwZShyZW1vdGUsIGZpbHRlclN0cmluZykgfSxcbiAgICAgIGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpXG4gICApO1xuXG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayh0YXNrLCB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKSk7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgdGhlIG5hbWVkIGZpbGVzIGZyb20gc291cmNlIGNvbnRyb2wuXG4gKi9cbkdpdC5wcm90b3R5cGUucm0gPSBmdW5jdGlvbiAoZmlsZXMpIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhbJ3JtJywgJy1mJywgLi4uYXNBcnJheShmaWxlcyldKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBuYW1lZCBmaWxlcyBmcm9tIHNvdXJjZSBjb250cm9sIGJ1dCBrZWVwcyB0aGVtIG9uIGRpc2sgcmF0aGVyIHRoYW4gZGVsZXRpbmcgdGhlbSBlbnRpcmVseS4gVG9cbiAqIGNvbXBsZXRlbHkgcmVtb3ZlIHRoZSBmaWxlcywgdXNlIGBybWAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IGZpbGVzXG4gKi9cbkdpdC5wcm90b3R5cGUucm1LZWVwTG9jYWwgPSBmdW5jdGlvbiAoZmlsZXMpIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhbJ3JtJywgJy0tY2FjaGVkJywgLi4uYXNBcnJheShmaWxlcyldKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbGlzdCBvZiBvYmplY3RzIGluIGEgdHJlZSBiYXNlZCBvbiBjb21taXQgaGFzaC4gUGFzc2luZyBpbiBhbiBvYmplY3QgaGFzaCByZXR1cm5zIHRoZSBvYmplY3QncyBjb250ZW50LFxuICogc2l6ZSwgYW5kIHR5cGUuXG4gKlxuICogUGFzc2luZyBcIi1wXCIgd2lsbCBpbnN0cnVjdCBjYXQtZmlsZSB0byBkZXRlcm1pbmUgdGhlIG9iamVjdCB0eXBlLCBhbmQgZGlzcGxheSBpdHMgZm9ybWF0dGVkIGNvbnRlbnRzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nW119IFtvcHRpb25zXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3RoZW5dXG4gKi9cbkdpdC5wcm90b3R5cGUuY2F0RmlsZSA9IGZ1bmN0aW9uIChvcHRpb25zLCB0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fY2F0RmlsZSgndXRmLTgnLCBhcmd1bWVudHMpO1xufTtcblxuR2l0LnByb3RvdHlwZS5iaW5hcnlDYXRGaWxlID0gZnVuY3Rpb24gKCkge1xuICAgcmV0dXJuIHRoaXMuX2NhdEZpbGUoJ2J1ZmZlcicsIGFyZ3VtZW50cyk7XG59O1xuXG5HaXQucHJvdG90eXBlLl9jYXRGaWxlID0gZnVuY3Rpb24gKGZvcm1hdCwgYXJncykge1xuICAgdmFyIGhhbmRsZXIgPSB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJncyk7XG4gICB2YXIgY29tbWFuZCA9IFsnY2F0LWZpbGUnXTtcbiAgIHZhciBvcHRpb25zID0gYXJnc1swXTtcblxuICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICBjb25maWd1cmF0aW9uRXJyb3JUYXNrKCdHaXQuY2F0RmlsZTogb3B0aW9ucyBtdXN0IGJlIHN1cHBsaWVkIGFzIGFuIGFycmF5IG9mIHN0cmluZ3MnKSxcbiAgICAgICAgIGhhbmRsZXJcbiAgICAgICk7XG4gICB9XG5cbiAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICBjb21tYW5kLnB1c2guYXBwbHkoY29tbWFuZCwgb3B0aW9ucyk7XG4gICB9XG5cbiAgIGNvbnN0IHRhc2sgPVxuICAgICAgZm9ybWF0ID09PSAnYnVmZmVyJyA/IHN0cmFpZ2h0VGhyb3VnaEJ1ZmZlclRhc2soY29tbWFuZCkgOiBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKGNvbW1hbmQpO1xuXG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayh0YXNrLCBoYW5kbGVyKTtcbn07XG5cbkdpdC5wcm90b3R5cGUuZGlmZiA9IGZ1bmN0aW9uIChvcHRpb25zLCB0aGVuKSB7XG4gICBjb25zdCB0YXNrID0gZmlsdGVyU3RyaW5nKG9wdGlvbnMpXG4gICAgICA/IGNvbmZpZ3VyYXRpb25FcnJvclRhc2soXG4gICAgICAgICAgICdnaXQuZGlmZjogc3VwcGx5aW5nIG9wdGlvbnMgYXMgYSBzaW5nbGUgc3RyaW5nIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQsIHN3aXRjaCB0byBhbiBhcnJheSBvZiBzdHJpbmdzJ1xuICAgICAgICApXG4gICAgICA6IHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soWydkaWZmJywgLi4uZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cyldKTtcblxuICAgcmV0dXJuIHRoaXMuX3J1blRhc2sodGFzaywgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cykpO1xufTtcblxuR2l0LnByb3RvdHlwZS5kaWZmU3VtbWFyeSA9IGZ1bmN0aW9uICgpIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgZGlmZlN1bW1hcnlUYXNrKGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMsIDEpKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuR2l0LnByb3RvdHlwZS5hcHBseVBhdGNoID0gZnVuY3Rpb24gKHBhdGNoZXMpIHtcbiAgIGNvbnN0IHRhc2sgPSAhZmlsdGVyU3RyaW5nT3JTdHJpbmdBcnJheShwYXRjaGVzKVxuICAgICAgPyBjb25maWd1cmF0aW9uRXJyb3JUYXNrKFxuICAgICAgICAgICBgZ2l0LmFwcGx5UGF0Y2ggcmVxdWlyZXMgb25lIG9yIG1vcmUgc3RyaW5nIHBhdGNoZXMgYXMgdGhlIGZpcnN0IGFyZ3VtZW50YFxuICAgICAgICApXG4gICAgICA6IGFwcGx5UGF0Y2hUYXNrKGFzQXJyYXkocGF0Y2hlcyksIGdldFRyYWlsaW5nT3B0aW9ucyhbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpKTtcblxuICAgcmV0dXJuIHRoaXMuX3J1blRhc2sodGFzaywgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cykpO1xufTtcblxuR2l0LnByb3RvdHlwZS5yZXZwYXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgIGNvbnN0IGNvbW1hbmRzID0gWydyZXYtcGFyc2UnLCAuLi5nZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzLCB0cnVlKV07XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soY29tbWFuZHMsIHRydWUpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG4vKipcbiAqL1xuR2l0LnByb3RvdHlwZS5jbGVhbiA9IGZ1bmN0aW9uIChtb2RlLCBvcHRpb25zLCB0aGVuKSB7XG4gICBjb25zdCB1c2luZ0NsZWFuT3B0aW9uc0FycmF5ID0gaXNDbGVhbk9wdGlvbnNBcnJheShtb2RlKTtcbiAgIGNvbnN0IGNsZWFuTW9kZSA9XG4gICAgICAodXNpbmdDbGVhbk9wdGlvbnNBcnJheSAmJiBtb2RlLmpvaW4oJycpKSB8fCBmaWx0ZXJUeXBlKG1vZGUsIGZpbHRlclN0cmluZykgfHwgJyc7XG4gICBjb25zdCBjdXN0b21BcmdzID0gZ2V0VHJhaWxpbmdPcHRpb25zKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCB1c2luZ0NsZWFuT3B0aW9uc0FycmF5ID8gMSA6IDApKTtcblxuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBjbGVhbldpdGhPcHRpb25zVGFzayhjbGVhbk1vZGUsIGN1c3RvbUFyZ3MpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG5HaXQucHJvdG90eXBlLmV4ZWMgPSBmdW5jdGlvbiAodGhlbikge1xuICAgY29uc3QgdGFzayA9IHtcbiAgICAgIGNvbW1hbmRzOiBbXSxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIHBhcnNlcigpIHtcbiAgICAgICAgIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhlbigpO1xuICAgICAgICAgfVxuICAgICAgfSxcbiAgIH07XG5cbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKHRhc2spO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBhIHBhdGhuYW1lIG9yIHBhdGhuYW1lcyBhcmUgZXhjbHVkZWQgYnkgLmdpdGlnbm9yZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBwYXRobmFtZXNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFt0aGVuXVxuICovXG5HaXQucHJvdG90eXBlLmNoZWNrSWdub3JlID0gZnVuY3Rpb24gKHBhdGhuYW1lcywgdGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBjaGVja0lnbm9yZVRhc2soYXNBcnJheShmaWx0ZXJUeXBlKHBhdGhuYW1lcywgZmlsdGVyU3RyaW5nT3JTdHJpbmdBcnJheSwgW10pKSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbkdpdC5wcm90b3R5cGUuY2hlY2tJc1JlcG8gPSBmdW5jdGlvbiAoY2hlY2tUeXBlLCB0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIGNoZWNrSXNSZXBvVGFzayhmaWx0ZXJUeXBlKGNoZWNrVHlwZSwgZmlsdGVyU3RyaW5nKSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdpdDtcbiIsICJpbXBvcnQgeyBHaXRQbHVnaW5FcnJvciB9IGZyb20gJy4uL2Vycm9ycy9naXQtcGx1Z2luLWVycm9yJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0T3B0aW9ucyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0UGx1Z2luIH0gZnJvbSAnLi9zaW1wbGUtZ2l0LXBsdWdpbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBhYm9ydFBsdWdpbihzaWduYWw6IFNpbXBsZUdpdE9wdGlvbnNbJ2Fib3J0J10pIHtcbiAgIGlmICghc2lnbmFsKSB7XG4gICAgICByZXR1cm47XG4gICB9XG5cbiAgIGNvbnN0IG9uU3Bhd25BZnRlcjogU2ltcGxlR2l0UGx1Z2luPCdzcGF3bi5hZnRlcic+ID0ge1xuICAgICAgdHlwZTogJ3NwYXduLmFmdGVyJyxcbiAgICAgIGFjdGlvbihfZGF0YSwgY29udGV4dCkge1xuICAgICAgICAgZnVuY3Rpb24ga2lsbCgpIHtcbiAgICAgICAgICAgIGNvbnRleHQua2lsbChuZXcgR2l0UGx1Z2luRXJyb3IodW5kZWZpbmVkLCAnYWJvcnQnLCAnQWJvcnQgc2lnbmFsIHJlY2VpdmVkJykpO1xuICAgICAgICAgfVxuXG4gICAgICAgICBzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBraWxsKTtcblxuICAgICAgICAgY29udGV4dC5zcGF3bmVkLm9uKCdjbG9zZScsICgpID0+IHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIGtpbGwpKTtcbiAgICAgIH0sXG4gICB9O1xuXG4gICBjb25zdCBvblNwYXduQmVmb3JlOiBTaW1wbGVHaXRQbHVnaW48J3NwYXduLmJlZm9yZSc+ID0ge1xuICAgICAgdHlwZTogJ3NwYXduLmJlZm9yZScsXG4gICAgICBhY3Rpb24oX2RhdGEsIGNvbnRleHQpIHtcbiAgICAgICAgIGlmIChzaWduYWwuYWJvcnRlZCkge1xuICAgICAgICAgICAgY29udGV4dC5raWxsKG5ldyBHaXRQbHVnaW5FcnJvcih1bmRlZmluZWQsICdhYm9ydCcsICdBYm9ydCBhbHJlYWR5IHNpZ25hbGVkJykpO1xuICAgICAgICAgfVxuICAgICAgfSxcbiAgIH07XG5cbiAgIHJldHVybiBbb25TcGF3bkJlZm9yZSwgb25TcGF3bkFmdGVyXTtcbn1cbiIsICJpbXBvcnQgeyBpc0dpdEVudktleSB9IGZyb20gJ0BzaW1wbGUtZ2l0L2FyZ3YtcGFyc2VyJztcblxuaW1wb3J0IHsgR2l0UGx1Z2luRXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvZ2l0LXBsdWdpbi1lcnJvcic7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tICcuLi9naXQtbG9nZ2VyJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0UGx1Z2luIH0gZnJvbSAnLi9zaW1wbGUtZ2l0LXBsdWdpbic7XG5cbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcignJywgJ3BsdWdpbjphbGxvd0Vudmlyb25tZW50Jyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGxvd0Vudmlyb25tZW50UGx1Z2luKFxuICAgYWxsb3dFbnZpcm9ubWVudDogcmVhZG9ubHkgc3RyaW5nW10sXG4gICBhbGxvd0FiYnJldmlhdGVkT3B0aW9ucyA9IGZhbHNlXG4pOiBTaW1wbGVHaXRQbHVnaW48J3NwYXduLm9wdGlvbnMnPiB7XG4gICBjb25zdCBhbGxvd2VkID0gbmV3IFNldChhbGxvd0Vudmlyb25tZW50Lm1hcCgoa2V5KSA9PiBrZXkudG9Mb3dlckNhc2UoKS50cmltKCkpKTtcblxuICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdzcGF3bi5vcHRpb25zJyxcbiAgICAgIGFjdGlvbihzcGF3bk9wdGlvbnMsIGNvbnRleHQpIHtcbiAgICAgICAgIGNvbnN0IGVudiA9IHsgLi4uKHNwYXduT3B0aW9ucy5lbnYgPz8gcHJvY2Vzcy5lbnYpIH07XG4gICAgICAgICBjb25zdCBzdXBwbGllZEtleXMgPSBuZXcgU2V0KFxuICAgICAgICAgICAgT2JqZWN0LmtleXMoY29udGV4dC5lbnYpLm1hcCgoa2V5KSA9PiBrZXkudG9Mb3dlckNhc2UoKS50cmltKCkpXG4gICAgICAgICApO1xuXG4gICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhlbnYpKSB7XG4gICAgICAgICAgICBjb25zdCBub3JtYWxpc2VkID0ga2V5LnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuXG4gICAgICAgICAgICAvLyBub3QgYSBHSVRfIGtleSwgb3IgZXhwbGljaXRseSBwZXJtaXR0ZWRcbiAgICAgICAgICAgIGlmICghaXNHdWFyZGVkRW52S2V5KG5vcm1hbGlzZWQpIHx8IGFsbG93ZWQuaGFzKG5vcm1hbGlzZWQpKSB7XG4gICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZXhwbGljaXRseSB0aHJvdyB3aGVuIHNpbXBsZUdpdC5lbnYoKSB3YXMgY2FsbGVkIHdpdGggYSBndWFyZGVkIGtleVxuICAgICAgICAgICAgaWYgKHN1cHBsaWVkS2V5cy5oYXMobm9ybWFsaXNlZCkpIHtcbiAgICAgICAgICAgICAgIHRocm93IG5ldyBHaXRQbHVnaW5FcnJvcihcbiAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICdhbGxvd0Vudmlyb25tZW50JyxcbiAgICAgICAgICAgICAgICAgIGBVc2Ugb2YgXCIke2tleX1cIiBpcyBibG9ja2VkIGJ5IHRoZSBlbnZpcm9ubWVudCBndWFyZCAtIGFkZCBpdCB0byB0aGUgYWxsb3dFbnZpcm9ubWVudCBvcHRpb24gdG8gcGVybWl0IGl0YFxuICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbG9nIGFuZCByZW1vdmUgZ3VhcmRlZCBrZXlzIGluaGVyaXRlZCBmcm9tIHRoZSBvdXRlciBlbnZpcm9ubWVudFxuICAgICAgICAgICAgbG9nZ2VyKGByZW1vdmluZyBhbWJpZW50IGd1YXJkZWQgZW52aXJvbm1lbnQgdmFyaWFibGUgJXNgLCBrZXkpO1xuICAgICAgICAgICAgZGVsZXRlIGVudltrZXldO1xuICAgICAgICAgfVxuXG4gICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uc3Bhd25PcHRpb25zLFxuICAgICAgICAgICAgZW52OiB7XG4gICAgICAgICAgICAgICAuLi5lbnYsXG4gICAgICAgICAgICAgICBHSVRfVEVTVF9ESVNBTExPV19BQkJSRVZJQVRFRF9PUFRJT05TOiBTdHJpbmcoIWFsbG93QWJicmV2aWF0ZWRPcHRpb25zKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICB9O1xuICAgICAgfSxcbiAgIH07XG59XG5cbmZ1bmN0aW9uIGlzR3VhcmRlZEVudktleShrZXk6IHN0cmluZykge1xuICAgY29uc3Qgbm9ybWFsaXNlZCA9IGtleS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgIHJldHVybiBub3JtYWxpc2VkLnN0YXJ0c1dpdGgoJ2dpdF8nKSB8fCBpc0dpdEVudktleShub3JtYWxpc2VkKTtcbn1cbiIsICJpbXBvcnQgeyB2dWxuZXJhYmlsaXR5Q2hlY2sgfSBmcm9tICdAc2ltcGxlLWdpdC9hcmd2LXBhcnNlcic7XG5cbmltcG9ydCB7IEdpdFBsdWdpbkVycm9yIH0gZnJvbSAnLi4vZXJyb3JzL2dpdC1wbHVnaW4tZXJyb3InO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRQbHVnaW5Db25maWcgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdFBsdWdpbiB9IGZyb20gJy4vc2ltcGxlLWdpdC1wbHVnaW4nO1xuXG5leHBvcnQgZnVuY3Rpb24gYmxvY2tVbnNhZmVPcGVyYXRpb25zUGx1Z2luKFxuICAgb3B0aW9uczogU2ltcGxlR2l0UGx1Z2luQ29uZmlnWyd1bnNhZmUnXSA9IHt9XG4pOiBTaW1wbGVHaXRQbHVnaW48J3NwYXduLmFyZ3MnPiB7XG4gICByZXR1cm4ge1xuICAgICAgdHlwZTogJ3NwYXduLmFyZ3MnLFxuICAgICAgYWN0aW9uKGFyZ3MsIHsgZW52IH0pIHtcbiAgICAgICAgIGZvciAoY29uc3QgdnVsbmVyYWJpbGl0eSBvZiB2dWxuZXJhYmlsaXR5Q2hlY2soYXJncywgZW52KSkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnNbdnVsbmVyYWJpbGl0eS5jYXRlZ29yeV0gIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgIHRocm93IG5ldyBHaXRQbHVnaW5FcnJvcih1bmRlZmluZWQsICd1bnNhZmUnLCB2dWxuZXJhYmlsaXR5Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgfVxuXG4gICAgICAgICByZXR1cm4gYXJncztcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB7IHByZWZpeGVkQXJyYXkgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdFBsdWdpbiB9IGZyb20gJy4vc2ltcGxlLWdpdC1wbHVnaW4nO1xuXG5leHBvcnQgZnVuY3Rpb24gY29tbWFuZENvbmZpZ1ByZWZpeGluZ1BsdWdpbihcbiAgIGNvbmZpZ3VyYXRpb246IHN0cmluZ1tdXG4pOiBTaW1wbGVHaXRQbHVnaW48J3NwYXduLmFyZ3MnPiB7XG4gICBjb25zdCBwcmVmaXggPSBwcmVmaXhlZEFycmF5KGNvbmZpZ3VyYXRpb24sICctYycpO1xuXG4gICByZXR1cm4ge1xuICAgICAgdHlwZTogJ3NwYXduLmFyZ3MnLFxuICAgICAgYWN0aW9uKGRhdGEpIHtcbiAgICAgICAgIHJldHVybiBbLi4ucHJlZml4LCAuLi5kYXRhXTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB7IHR5cGUgRGVmZXJyZWRQcm9taXNlLCBkZWZlcnJlZCB9IGZyb20gJ0Brd3NpdGVzL3Byb21pc2UtZGVmZXJyZWQnO1xuXG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdFBsdWdpbkNvbmZpZyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGRlbGF5IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRQbHVnaW4gfSBmcm9tICcuL3NpbXBsZS1naXQtcGx1Z2luJztcblxuY29uc3QgbmV2ZXIgPSBkZWZlcnJlZCgpLnByb21pc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wbGV0aW9uRGV0ZWN0aW9uUGx1Z2luKHtcbiAgIG9uQ2xvc2UgPSB0cnVlLFxuICAgb25FeGl0ID0gNTAsXG59OiBTaW1wbGVHaXRQbHVnaW5Db25maWdbJ2NvbXBsZXRpb24nXSA9IHt9KTogU2ltcGxlR2l0UGx1Z2luPCdzcGF3bi5hZnRlcic+IHtcbiAgIGZ1bmN0aW9uIGNyZWF0ZUV2ZW50cygpIHtcbiAgICAgIGxldCBleGl0Q29kZSA9IC0xO1xuICAgICAgY29uc3QgZXZlbnRzID0ge1xuICAgICAgICAgY2xvc2U6IGRlZmVycmVkKCksXG4gICAgICAgICBjbG9zZVRpbWVvdXQ6IGRlZmVycmVkKCksXG4gICAgICAgICBleGl0OiBkZWZlcnJlZCgpLFxuICAgICAgICAgZXhpdFRpbWVvdXQ6IGRlZmVycmVkKCksXG4gICAgICB9O1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBQcm9taXNlLnJhY2UoW1xuICAgICAgICAgb25DbG9zZSA9PT0gZmFsc2UgPyBuZXZlciA6IGV2ZW50cy5jbG9zZVRpbWVvdXQucHJvbWlzZSxcbiAgICAgICAgIG9uRXhpdCA9PT0gZmFsc2UgPyBuZXZlciA6IGV2ZW50cy5leGl0VGltZW91dC5wcm9taXNlLFxuICAgICAgXSk7XG5cbiAgICAgIGNvbmZpZ3VyZVRpbWVvdXQob25DbG9zZSwgZXZlbnRzLmNsb3NlLCBldmVudHMuY2xvc2VUaW1lb3V0KTtcbiAgICAgIGNvbmZpZ3VyZVRpbWVvdXQob25FeGl0LCBldmVudHMuZXhpdCwgZXZlbnRzLmV4aXRUaW1lb3V0KTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgIGNsb3NlKGNvZGU6IG51bWJlcikge1xuICAgICAgICAgICAgZXhpdENvZGUgPSBjb2RlO1xuICAgICAgICAgICAgZXZlbnRzLmNsb3NlLmRvbmUoKTtcbiAgICAgICAgIH0sXG4gICAgICAgICBleGl0KGNvZGU6IG51bWJlcikge1xuICAgICAgICAgICAgZXhpdENvZGUgPSBjb2RlO1xuICAgICAgICAgICAgZXZlbnRzLmV4aXQuZG9uZSgpO1xuICAgICAgICAgfSxcbiAgICAgICAgIGdldCBleGl0Q29kZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBleGl0Q29kZTtcbiAgICAgICAgIH0sXG4gICAgICAgICByZXN1bHQsXG4gICAgICB9O1xuICAgfVxuXG4gICBmdW5jdGlvbiBjb25maWd1cmVUaW1lb3V0KFxuICAgICAgZmxhZzogYm9vbGVhbiB8IG51bWJlcixcbiAgICAgIGV2ZW50OiBEZWZlcnJlZFByb21pc2U8dm9pZD4sXG4gICAgICB0aW1lb3V0OiBEZWZlcnJlZFByb21pc2U8dm9pZD5cbiAgICkge1xuICAgICAgaWYgKGZsYWcgPT09IGZhbHNlKSB7XG4gICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIChmbGFnID09PSB0cnVlID8gZXZlbnQucHJvbWlzZSA6IGV2ZW50LnByb21pc2UudGhlbigoKSA9PiBkZWxheShmbGFnKSkpLnRoZW4odGltZW91dC5kb25lKTtcbiAgIH1cblxuICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdzcGF3bi5hZnRlcicsXG4gICAgICBhc3luYyBhY3Rpb24oX2RhdGEsIHsgc3Bhd25lZCwgY2xvc2UgfSkge1xuICAgICAgICAgY29uc3QgZXZlbnRzID0gY3JlYXRlRXZlbnRzKCk7XG5cbiAgICAgICAgIGxldCBkZWZlckNsb3NlID0gdHJ1ZTtcbiAgICAgICAgIGxldCBxdWlja0Nsb3NlID0gKCkgPT4gdm9pZCAoZGVmZXJDbG9zZSA9IGZhbHNlKTtcblxuICAgICAgICAgc3Bhd25lZC5zdGRvdXQ/Lm9uKCdkYXRhJywgcXVpY2tDbG9zZSk7XG4gICAgICAgICBzcGF3bmVkLnN0ZGVycj8ub24oJ2RhdGEnLCBxdWlja0Nsb3NlKTtcbiAgICAgICAgIHNwYXduZWQub24oJ2Vycm9yJywgcXVpY2tDbG9zZSk7XG5cbiAgICAgICAgIHNwYXduZWQub24oJ2Nsb3NlJywgKGNvZGU6IG51bWJlcikgPT4gZXZlbnRzLmNsb3NlKGNvZGUpKTtcbiAgICAgICAgIHNwYXduZWQub24oJ2V4aXQnLCAoY29kZTogbnVtYmVyKSA9PiBldmVudHMuZXhpdChjb2RlKSk7XG5cbiAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBldmVudHMucmVzdWx0O1xuICAgICAgICAgICAgaWYgKGRlZmVyQ2xvc2UpIHtcbiAgICAgICAgICAgICAgIGF3YWl0IGRlbGF5KDUwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsb3NlKGV2ZW50cy5leGl0Q29kZSk7XG4gICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNsb3NlKGV2ZW50cy5leGl0Q29kZSwgZXJyIGFzIEVycm9yKTtcbiAgICAgICAgIH1cbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB7IEdpdFBsdWdpbkVycm9yIH0gZnJvbSAnLi4vZXJyb3JzL2dpdC1wbHVnaW4tZXJyb3InO1xuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSAnLi4vZ2l0LWxvZ2dlcic7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdE9wdGlvbnMgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBhc0FycmF5IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHR5cGUgeyBQbHVnaW5TdG9yZSB9IGZyb20gJy4vcGx1Z2luLXN0b3JlJztcblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKCcnLCAncGx1Z2luOmJpbmFyeScpO1xuXG5jb25zdCBXUk9OR19OVU1CRVJfRVJSID0gYEludmFsaWQgdmFsdWUgc3VwcGxpZWQgZm9yIGN1c3RvbSBiaW5hcnksIHJlcXVpcmVzIGEgc2luZ2xlIHN0cmluZyBvciBhbiBhcnJheSBjb250YWluaW5nIGVpdGhlciBvbmUgb3IgdHdvIHN0cmluZ3NgO1xuY29uc3QgV1JPTkdfQ0hBUlNfRVJSID0gYEludmFsaWQgdmFsdWUgc3VwcGxpZWQgZm9yIGN1c3RvbSBiaW5hcnksIHJlc3RyaWN0ZWQgY2hhcmFjdGVycyBtdXN0IGJlIHJlbW92ZWQgb3Igc3VwcGx5IHRoZSB1bnNhZmUuYWxsb3dVbnNhZmVDdXN0b21CaW5hcnkgb3B0aW9uYDtcblxuZnVuY3Rpb24gaXNCYWRBcmd1bWVudChhcmc6IHN0cmluZykge1xuICAgcmV0dXJuICFhcmcgfHwgIS9eKFthLXpdOik/KFthLXowLTkvLlxcXFxffi1dKykkL2kudGVzdChhcmcpO1xufVxuXG5mdW5jdGlvbiB0b0JpbmFyeUNvbmZpZyhcbiAgIGlucHV0OiBzdHJpbmdbXSxcbiAgIGFsbG93VW5zYWZlOiBib29sZWFuXG4pOiB7IGJpbmFyeTogc3RyaW5nOyBwcmVmaXg/OiBzdHJpbmcgfSB7XG4gICBpZiAoaW5wdXQubGVuZ3RoIDwgMSB8fCBpbnB1dC5sZW5ndGggPiAyKSB7XG4gICAgICB0aHJvdyBuZXcgR2l0UGx1Z2luRXJyb3IodW5kZWZpbmVkLCAnYmluYXJ5JywgV1JPTkdfTlVNQkVSX0VSUik7XG4gICB9XG5cbiAgIGNvbnN0IGlzQmFkID0gaW5wdXQuc29tZShpc0JhZEFyZ3VtZW50KTtcbiAgIGlmIChpc0JhZCkge1xuICAgICAgaWYgKGFsbG93VW5zYWZlKSB7XG4gICAgICAgICBsb2dnZXIoJ3Blcm1pdHRlZCB1bnNhZmUgYmluYXJ5ICVvJywgaW5wdXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIHRocm93IG5ldyBHaXRQbHVnaW5FcnJvcih1bmRlZmluZWQsICdiaW5hcnknLCBXUk9OR19DSEFSU19FUlIpO1xuICAgICAgfVxuICAgfVxuXG4gICBjb25zdCBbYmluYXJ5LCBwcmVmaXhdID0gaW5wdXQ7XG4gICByZXR1cm4ge1xuICAgICAgYmluYXJ5LFxuICAgICAgcHJlZml4LFxuICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGN1c3RvbUJpbmFyeVBsdWdpbihcbiAgIHBsdWdpbnM6IFBsdWdpblN0b3JlLFxuICAgaW5wdXQ6IFNpbXBsZUdpdE9wdGlvbnNbJ2JpbmFyeSddID0gWydnaXQnXSxcbiAgIGFsbG93VW5zYWZlID0gZmFsc2Vcbikge1xuICAgbGV0IGNvbmZpZyA9IHRvQmluYXJ5Q29uZmlnKGFzQXJyYXkoaW5wdXQpLCBhbGxvd1Vuc2FmZSk7XG5cbiAgIHBsdWdpbnMub24oJ2JpbmFyeScsIChpbnB1dCkgPT4ge1xuICAgICAgY29uZmlnID0gdG9CaW5hcnlDb25maWcoYXNBcnJheShpbnB1dCksIGFsbG93VW5zYWZlKTtcbiAgICAgIGxvZ2dlci5pbmZvKCdyZWNvbmZpZ3VyaW5nICVvJywgY29uZmlnKTtcbiAgIH0pO1xuXG4gICBwbHVnaW5zLmFwcGVuZCgnc3Bhd24uYmluYXJ5JywgKCkgPT4ge1xuICAgICAgcmV0dXJuIGNvbmZpZy5iaW5hcnk7XG4gICB9KTtcblxuICAgcGx1Z2lucy5hcHBlbmQoJ3NwYXduLmFyZ3MnLCAoZGF0YSkgPT4ge1xuICAgICAgcmV0dXJuIGNvbmZpZy5wcmVmaXggPyBbY29uZmlnLnByZWZpeCwgLi4uZGF0YV0gOiBkYXRhO1xuICAgfSk7XG59XG4iLCAiaW1wb3J0IHsgR2l0RXJyb3IgfSBmcm9tICcuL2dpdC1lcnJvcic7XG5cbmNvbnN0IFJFQVNPTlMgPSB7XG4gICBESVNBTExPV0VEX0FCQlJFVklBVEVEOiB7XG4gICAgICB0ZXh0OiAnZGlzYWxsb3dlZCBhYmJyZXZpYXRlZCBvciBhbWJpZ3VvdXMgb3B0aW9uJyxcbiAgICAgIHNvbHV0aW9uOlxuICAgICAgICAgJ1VuYW1iaWd1b3VzIGFiYnJldmlhdGVkIG9wdGlvbnMgYmxvY2tlZCB3aXRoIHVuc2FmZS5hbGxvd0FiYnJldmlhdGVkT3B0aW9ucyBzZXR0aW5nOiB7bWVzc2FnZX0nLFxuICAgfSxcbiAgIFVOS05PV046IHtcbiAgICAgIHRleHQ6ICd+IHVua25vd24gficsXG4gICAgICBzb2x1dGlvbjogdW5kZWZpbmVkLFxuICAgfSxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIEdpdENvbmZpZ3VyYXRpb25FcnJvclJlYXNvbiA9IGtleW9mIHR5cGVvZiBSRUFTT05TO1xuXG5mdW5jdGlvbiBnZXRSZWFzb24obWVzc2FnZT86IHN0cmluZyk6IEdpdENvbmZpZ3VyYXRpb25FcnJvclJlYXNvbiB7XG4gICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiAnVU5LTk9XTic7XG4gICB9XG4gICBmb3IgKGNvbnN0IFtyZWFzb24sIHsgdGV4dCB9XSBvZiBPYmplY3QuZW50cmllcyhSRUFTT05TKSkge1xuICAgICAgaWYgKG1lc3NhZ2Uuc3RhcnRzV2l0aChgZmF0YWw6ICR7dGV4dH1gKSkge1xuICAgICAgICAgcmV0dXJuIHJlYXNvbiBhcyBHaXRDb25maWd1cmF0aW9uRXJyb3JSZWFzb247XG4gICAgICB9XG4gICB9XG4gICByZXR1cm4gJ1VOS05PV04nO1xufVxuXG4vKipcbiAqIFRoZSBgR2l0Q29uZmlndXJhdGlvbkVycm9yYCBpcyB0aHJvd24gd2hlbiB0aGUgYGdpdGAgcHJvY2VzcyByZWplY3RzXG4gKiB0aGUgc3VwcGxpZWQgY29uZmlndXJhdGlvbiBhcmd1bWVudHMgb3IgZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuICpcbiAqIENoZWNrIHRoZSBgLm1lc3NhZ2VgIHByb3BlcnR5IGZvciBtb3JlIGRldGFpbCBvbiB3aHkgeW91ciBjb25maWd1cmF0aW9uXG4gKiByZXN1bHRlZCBpbiBhbiBlcnJvci5cbiAqL1xuZXhwb3J0IGNsYXNzIEdpdENvbmZpZ3VyYXRpb25FcnJvciBleHRlbmRzIEdpdEVycm9yIHtcbiAgIHB1YmxpYyByZWFkb25seSByZWFzb246IEdpdENvbmZpZ3VyYXRpb25FcnJvclJlYXNvbjtcblxuICAgY29uc3RydWN0b3IobWVzc2FnZSA9ICcnKSB7XG4gICAgICBjb25zdCByZWFzb24gPSBnZXRSZWFzb24obWVzc2FnZSk7XG5cbiAgICAgIHN1cGVyKHVuZGVmaW5lZCwgUkVBU09OU1tyZWFzb25dLnNvbHV0aW9uPy5yZXBsYWNlKCd7bWVzc2FnZX0nLCBtZXNzYWdlKSA/PyBtZXNzYWdlKTtcbiAgICAgIHRoaXMucmVhc29uID0gcmVhc29uO1xuICAgfVxufVxuIiwgImltcG9ydCB7IEdpdENvbmZpZ3VyYXRpb25FcnJvciB9IGZyb20gJy4uL2Vycm9ycy9naXQtY29uZmlndXJhdGlvbi1lcnJvcic7XG5pbXBvcnQgeyBHaXRFcnJvciB9IGZyb20gJy4uL2Vycm9ycy9naXQtZXJyb3InO1xuaW1wb3J0IHR5cGUgeyBHaXRFeGVjdXRvclJlc3VsdCwgU2ltcGxlR2l0UGx1Z2luQ29uZmlnIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRQbHVnaW4gfSBmcm9tICcuL3NpbXBsZS1naXQtcGx1Z2luJztcblxudHlwZSBUYXNrUmVzdWx0ID0gT21pdDxHaXRFeGVjdXRvclJlc3VsdCwgJ3JlamVjdGlvbic+O1xuXG5mdW5jdGlvbiBpc1Rhc2tFcnJvcihyZXN1bHQ6IFRhc2tSZXN1bHQpIHtcbiAgIHJldHVybiAhIShyZXN1bHQuZXhpdENvZGUgJiYgcmVzdWx0LnN0ZEVyci5sZW5ndGgpO1xufVxuXG5mdW5jdGlvbiBnZXRFcnJvck1lc3NhZ2UocmVzdWx0OiBUYXNrUmVzdWx0KSB7XG4gICByZXR1cm4gQnVmZmVyLmNvbmNhdChbLi4ucmVzdWx0LnN0ZE91dCwgLi4ucmVzdWx0LnN0ZEVycl0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXJyb3JEZXRlY3Rpb25IYW5kbGVyKFxuICAgb3ZlcndyaXRlID0gZmFsc2UsXG4gICBpc0Vycm9yID0gaXNUYXNrRXJyb3IsXG4gICBlcnJvck1lc3NhZ2U6IChyZXN1bHQ6IFRhc2tSZXN1bHQpID0+IEJ1ZmZlciB8IEVycm9yID0gZ2V0RXJyb3JNZXNzYWdlXG4pIHtcbiAgIHJldHVybiAoZXJyb3I6IEJ1ZmZlciB8IEVycm9yIHwgdW5kZWZpbmVkLCByZXN1bHQ6IFRhc2tSZXN1bHQpID0+IHtcbiAgICAgIGlmICgoIW92ZXJ3cml0ZSAmJiBlcnJvcikgfHwgIWlzRXJyb3IocmVzdWx0KSkge1xuICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZXJyb3JNZXNzYWdlKHJlc3VsdCk7XG4gICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVHaXRFcnJvcihleGl0Q29kZTogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgIGlmIChleGl0Q29kZSA9PT0gMTI4ICYmIG1lc3NhZ2Uuc3RhcnRzV2l0aCgnZmF0YWw6JykpIHtcbiAgICAgIHJldHVybiBuZXcgR2l0Q29uZmlndXJhdGlvbkVycm9yKG1lc3NhZ2UpO1xuICAgfVxuXG4gICByZXR1cm4gbmV3IEdpdEVycm9yKHVuZGVmaW5lZCwgbWVzc2FnZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlcnJvckRldGVjdGlvblBsdWdpbihcbiAgIGNvbmZpZzogU2ltcGxlR2l0UGx1Z2luQ29uZmlnWydlcnJvcnMnXVxuKTogU2ltcGxlR2l0UGx1Z2luPCd0YXNrLmVycm9yJz4ge1xuICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICd0YXNrLmVycm9yJyxcbiAgICAgIGFjdGlvbihkYXRhLCBjb250ZXh0KSB7XG4gICAgICAgICBjb25zdCBlcnJvciA9IGNvbmZpZyhkYXRhLmVycm9yLCB7XG4gICAgICAgICAgICBzdGRFcnI6IGNvbnRleHQuc3RkRXJyLFxuICAgICAgICAgICAgc3RkT3V0OiBjb250ZXh0LnN0ZE91dCxcbiAgICAgICAgICAgIGV4aXRDb2RlOiBjb250ZXh0LmV4aXRDb2RlLFxuICAgICAgICAgfSk7XG5cbiAgICAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoZXJyb3IpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgZXJyb3I6IGNyZWF0ZUdpdEVycm9yKGNvbnRleHQuZXhpdENvZGUsIGVycm9yLnRvU3RyaW5nKCd1dGYtOCcpKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICB9XG5cbiAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlcnJvcixcbiAgICAgICAgIH07XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tICcuLi9naXQtbG9nZ2VyJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0T3B0aW9ucyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGJ5dGVMZW5ndGggfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdFBsdWdpbiB9IGZyb20gJy4vc2ltcGxlLWdpdC1wbHVnaW4nO1xuXG5jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoJycsICdwbHVnaW46aW5wdXQnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlucHV0UGx1Z2luKFxuICAgaW5wdXQ6IFNpbXBsZUdpdE9wdGlvbnNbJ2lucHV0J11cbik6IFNpbXBsZUdpdFBsdWdpbjwnc3Bhd24uYWZ0ZXInPiB8IHZvaWQge1xuICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdzcGF3bi5hZnRlcicsXG4gICAgICBhY3Rpb24oX2RhdGEsIHsgY29tbWFuZHMsIGlucHV0OiB0YXNrSW5wdXQsIHNwYXduZWQ6IHsgc3RkaW4gfSB9KSB7XG4gICAgICAgICBpZiAoIXN0ZGluKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICB9XG5cbiAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBpbnB1dD8uKFsuLi5jb21tYW5kc10pID8/IHRhc2tJbnB1dDtcbiAgICAgICAgIGlmICghY29udGVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGxvZ2dlcihgZ2VuZXJhdGVkIHplcm8gbGVuZ3RoIGNvbnRlbnQsIG5vdCB3cml0aW5nIHRvIHN0ZGluYCk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIGxvZ2dlcihgd3JpdGluZyAlcyBieXRlcyB0byBzdGRpbmAsIGJ5dGVMZW5ndGgoY29udGVudCkpO1xuXG4gICAgICAgICBzdGRpbi5vbignZXJyb3InLCAoZXJyOiBOb2RlSlMuRXJybm9FeGNlcHRpb24pID0+IHtcbiAgICAgICAgICAgIC8vIEVQSVBFIGlzIGV4cGVjdGVkIHdoZW4gZ2l0IGV4aXRzIGJlZm9yZSBjb25zdW1pbmcgYWxsIGlucHV0XG4gICAgICAgICAgICBpZiAoZXJyLmNvZGUgIT09ICdFUElQRScpIHtcbiAgICAgICAgICAgICAgIGxvZ2dlcignW0VSUk9SXSBzdGRpbiBlcnJvciAlbycsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICB9KTtcblxuICAgICAgICAgc3RkaW4uZW5kKGNvbnRlbnQpO1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnbm9kZTpldmVudHMnO1xuXG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdFBsdWdpbkNvbmZpZyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGFwcGVuZCwgYXNBcnJheSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB0eXBlIHtcbiAgIFNpbXBsZUdpdFBsdWdpbixcbiAgIFNpbXBsZUdpdFBsdWdpblR5cGUsXG4gICBTaW1wbGVHaXRQbHVnaW5UeXBlcyxcbn0gZnJvbSAnLi9zaW1wbGUtZ2l0LXBsdWdpbic7XG5cbmV4cG9ydCBjbGFzcyBQbHVnaW5TdG9yZSB7XG4gICBwcml2YXRlIHBsdWdpbnM6IFNldDxTaW1wbGVHaXRQbHVnaW48U2ltcGxlR2l0UGx1Z2luVHlwZT4+ID0gbmV3IFNldCgpO1xuICAgcHJpdmF0ZSBldmVudHMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgIG9uPEsgZXh0ZW5kcyBrZXlvZiBTaW1wbGVHaXRQbHVnaW5Db25maWc+KFxuICAgICAgdHlwZTogSyxcbiAgICAgIGxpc3RlbmVyOiAoZGF0YTogU2ltcGxlR2l0UGx1Z2luQ29uZmlnW0tdKSA9PiB2b2lkXG4gICApIHtcbiAgICAgIHRoaXMuZXZlbnRzLm9uKHR5cGUsIGxpc3RlbmVyKTtcbiAgIH1cblxuICAgcmVjb25maWd1cmU8SyBleHRlbmRzIGtleW9mIFNpbXBsZUdpdFBsdWdpbkNvbmZpZz4odHlwZTogSywgZGF0YTogU2ltcGxlR2l0UGx1Z2luQ29uZmlnW0tdKSB7XG4gICAgICB0aGlzLmV2ZW50cy5lbWl0KHR5cGUsIGRhdGEpO1xuICAgfVxuXG4gICBwdWJsaWMgYXBwZW5kPFQgZXh0ZW5kcyBTaW1wbGVHaXRQbHVnaW5UeXBlPih0eXBlOiBULCBhY3Rpb246IFNpbXBsZUdpdFBsdWdpbjxUPlsnYWN0aW9uJ10pIHtcbiAgICAgIGNvbnN0IHBsdWdpbiA9IGFwcGVuZCh0aGlzLnBsdWdpbnMsIHsgdHlwZSwgYWN0aW9uIH0pO1xuXG4gICAgICByZXR1cm4gKCkgPT4gdGhpcy5wbHVnaW5zLmRlbGV0ZShwbHVnaW4pO1xuICAgfVxuXG4gICBwdWJsaWMgYWRkPFQgZXh0ZW5kcyBTaW1wbGVHaXRQbHVnaW5UeXBlPihcbiAgICAgIHBsdWdpbjogdm9pZCB8IFNpbXBsZUdpdFBsdWdpbjxUPiB8IFNpbXBsZUdpdFBsdWdpbjxUPltdXG4gICApIHtcbiAgICAgIGNvbnN0IHBsdWdpbnM6IFNpbXBsZUdpdFBsdWdpbjxUPltdID0gW107XG5cbiAgICAgIGFzQXJyYXkocGx1Z2luKS5mb3JFYWNoKFxuICAgICAgICAgKHBsdWdpbikgPT4gdm9pZCAocGx1Z2luICYmIHRoaXMucGx1Z2lucy5hZGQoYXBwZW5kKHBsdWdpbnMsIHBsdWdpbikpKVxuICAgICAgKTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgIHBsdWdpbnMuZm9yRWFjaCgocGx1Z2luKSA9PiB2b2lkIHRoaXMucGx1Z2lucy5kZWxldGUocGx1Z2luKSk7XG4gICAgICB9O1xuICAgfVxuXG4gICBwdWJsaWMgZXhlYzxUIGV4dGVuZHMgU2ltcGxlR2l0UGx1Z2luVHlwZT4oXG4gICAgICB0eXBlOiBULFxuICAgICAgZGF0YTogU2ltcGxlR2l0UGx1Z2luVHlwZXNbVF1bJ2RhdGEnXSxcbiAgICAgIGNvbnRleHQ6IFNpbXBsZUdpdFBsdWdpblR5cGVzW1RdWydjb250ZXh0J11cbiAgICk6IHR5cGVvZiBkYXRhIHtcbiAgICAgIGxldCBvdXRwdXQgPSBkYXRhO1xuICAgICAgY29uc3QgY29udGV4dHVhbCA9IE9iamVjdC5mcmVlemUoT2JqZWN0LmNyZWF0ZShjb250ZXh0KSk7XG5cbiAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMucGx1Z2lucykge1xuICAgICAgICAgaWYgKHBsdWdpbi50eXBlID09PSB0eXBlKSB7XG4gICAgICAgICAgICBvdXRwdXQgPSBwbHVnaW4uYWN0aW9uKG91dHB1dCwgY29udGV4dHVhbCk7XG4gICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvdXRwdXQ7XG4gICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRPcHRpb25zIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgYXNOdW1iZXIsIGluY2x1ZGluZyB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0UGx1Z2luIH0gZnJvbSAnLi9zaW1wbGUtZ2l0LXBsdWdpbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9ncmVzc01vbml0b3JQbHVnaW4ocHJvZ3Jlc3M6IEV4Y2x1ZGU8U2ltcGxlR2l0T3B0aW9uc1sncHJvZ3Jlc3MnXSwgdm9pZD4pIHtcbiAgIGNvbnN0IHByb2dyZXNzQ29tbWFuZCA9ICctLXByb2dyZXNzJztcbiAgIGNvbnN0IHByb2dyZXNzTWV0aG9kcyA9IFsnY2hlY2tvdXQnLCAnY2xvbmUnLCAnZmV0Y2gnLCAncHVsbCcsICdwdXNoJ107XG5cbiAgIGNvbnN0IG9uUHJvZ3Jlc3M6IFNpbXBsZUdpdFBsdWdpbjwnc3Bhd24uYWZ0ZXInPiA9IHtcbiAgICAgIHR5cGU6ICdzcGF3bi5hZnRlcicsXG4gICAgICBhY3Rpb24oX2RhdGEsIGNvbnRleHQpIHtcbiAgICAgICAgIGlmICghY29udGV4dC5jb21tYW5kcy5pbmNsdWRlcyhwcm9ncmVzc0NvbW1hbmQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICB9XG5cbiAgICAgICAgIGNvbnRleHQuc3Bhd25lZC5zdGRlcnI/Lm9uKCdkYXRhJywgKGNodW5rOiBCdWZmZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSAvXihbXFxzXFxTXSs/KTpcXHMqKFxcZCspJSBcXCgoXFxkKylcXC8oXFxkKylcXCkvLmV4ZWMoY2h1bmsudG9TdHJpbmcoJ3V0ZjgnKSk7XG4gICAgICAgICAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJvZ3Jlc3Moe1xuICAgICAgICAgICAgICAgbWV0aG9kOiBjb250ZXh0Lm1ldGhvZCxcbiAgICAgICAgICAgICAgIHN0YWdlOiBwcm9ncmVzc0V2ZW50U3RhZ2UobWVzc2FnZVsxXSksXG4gICAgICAgICAgICAgICBwcm9ncmVzczogYXNOdW1iZXIobWVzc2FnZVsyXSksXG4gICAgICAgICAgICAgICBwcm9jZXNzZWQ6IGFzTnVtYmVyKG1lc3NhZ2VbM10pLFxuICAgICAgICAgICAgICAgdG90YWw6IGFzTnVtYmVyKG1lc3NhZ2VbNF0pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICB9KTtcbiAgICAgIH0sXG4gICB9O1xuXG4gICBjb25zdCBvbkFyZ3M6IFNpbXBsZUdpdFBsdWdpbjwnc3Bhd24uYXJncyc+ID0ge1xuICAgICAgdHlwZTogJ3NwYXduLmFyZ3MnLFxuICAgICAgYWN0aW9uKGFyZ3MsIGNvbnRleHQpIHtcbiAgICAgICAgIGlmICghcHJvZ3Jlc3NNZXRob2RzLmluY2x1ZGVzKGNvbnRleHQubWV0aG9kKSkge1xuICAgICAgICAgICAgcmV0dXJuIGFyZ3M7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHJldHVybiBpbmNsdWRpbmcoYXJncywgcHJvZ3Jlc3NDb21tYW5kKTtcbiAgICAgIH0sXG4gICB9O1xuXG4gICByZXR1cm4gW29uQXJncywgb25Qcm9ncmVzc107XG59XG5cbmZ1bmN0aW9uIHByb2dyZXNzRXZlbnRTdGFnZShpbnB1dDogc3RyaW5nKSB7XG4gICByZXR1cm4gU3RyaW5nKGlucHV0LnRvTG93ZXJDYXNlKCkuc3BsaXQoJyAnLCAxKSkgfHwgJ3Vua25vd24nO1xufVxuIiwgImltcG9ydCB0eXBlIHsgU3Bhd25PcHRpb25zIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XG5cbmltcG9ydCB7IHBpY2sgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdFBsdWdpbiB9IGZyb20gJy4vc2ltcGxlLWdpdC1wbHVnaW4nO1xuXG5leHBvcnQgZnVuY3Rpb24gc3Bhd25PcHRpb25zUGx1Z2luKFxuICAgc3Bhd25PcHRpb25zOiBQYXJ0aWFsPFNwYXduT3B0aW9ucz5cbik6IFNpbXBsZUdpdFBsdWdpbjwnc3Bhd24ub3B0aW9ucyc+IHtcbiAgIGNvbnN0IG9wdGlvbnMgPSBwaWNrKHNwYXduT3B0aW9ucywgWyd1aWQnLCAnZ2lkJ10pO1xuXG4gICByZXR1cm4ge1xuICAgICAgdHlwZTogJ3NwYXduLm9wdGlvbnMnLFxuICAgICAgYWN0aW9uKGRhdGEpIHtcbiAgICAgICAgIHJldHVybiB7IC4uLm9wdGlvbnMsIC4uLmRhdGEgfTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB7IGlzUGF0aFNwZWMsIHRvUGF0aHMgfSBmcm9tICdAc2ltcGxlLWdpdC9hcmdzLXBhdGhzcGVjJztcblxuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRQbHVnaW4gfSBmcm9tICcuL3NpbXBsZS1naXQtcGx1Z2luJztcblxuZXhwb3J0IGZ1bmN0aW9uIHN1ZmZpeFBhdGhzUGx1Z2luKCk6IFNpbXBsZUdpdFBsdWdpbjwnc3Bhd24uYXJncyc+IHtcbiAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnc3Bhd24uYXJncycsXG4gICAgICBhY3Rpb24oZGF0YSkge1xuICAgICAgICAgY29uc3QgcHJlZml4OiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgbGV0IHN1ZmZpeDogdW5kZWZpbmVkIHwgc3RyaW5nW107XG4gICAgICAgICBmdW5jdGlvbiBhcHBlbmQoYXJnczogc3RyaW5nW10pIHtcbiAgICAgICAgICAgIChzdWZmaXggPSBzdWZmaXggfHwgW10pLnB1c2goLi4uYXJncyk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcGFyYW0gPSBkYXRhW2ldO1xuXG4gICAgICAgICAgICBpZiAoaXNQYXRoU3BlYyhwYXJhbSkpIHtcbiAgICAgICAgICAgICAgIGFwcGVuZCh0b1BhdGhzKHBhcmFtKSk7XG4gICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBhcmFtID09PSAnLS0nKSB7XG4gICAgICAgICAgICAgICBhcHBlbmQoXG4gICAgICAgICAgICAgICAgICBkYXRhLnNsaWNlKGkgKyAxKS5mbGF0TWFwKChpdGVtKSA9PiAoaXNQYXRoU3BlYyhpdGVtKSAmJiB0b1BhdGhzKGl0ZW0pKSB8fCBpdGVtKVxuICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwcmVmaXgucHVzaChwYXJhbSk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHJldHVybiAhc3VmZml4ID8gcHJlZml4IDogWy4uLnByZWZpeCwgJy0tJywgLi4uc3VmZml4Lm1hcChTdHJpbmcpXTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB7IEdpdFBsdWdpbkVycm9yIH0gZnJvbSAnLi4vZXJyb3JzL2dpdC1wbHVnaW4tZXJyb3InO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRPcHRpb25zIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRQbHVnaW4gfSBmcm9tICcuL3NpbXBsZS1naXQtcGx1Z2luJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRpbWVvdXRQbHVnaW4oe1xuICAgYmxvY2ssXG4gICBzdGRFcnIgPSB0cnVlLFxuICAgc3RkT3V0ID0gdHJ1ZSxcbn06IEV4Y2x1ZGU8U2ltcGxlR2l0T3B0aW9uc1sndGltZW91dCddLCB1bmRlZmluZWQ+KTogU2ltcGxlR2l0UGx1Z2luPCdzcGF3bi5hZnRlcic+IHwgdm9pZCB7XG4gICBpZiAoYmxvY2sgPiAwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAgdHlwZTogJ3NwYXduLmFmdGVyJyxcbiAgICAgICAgIGFjdGlvbihfZGF0YSwgY29udGV4dCkge1xuICAgICAgICAgICAgbGV0IHRpbWVvdXQ6IE5vZGVKUy5UaW1lb3V0O1xuXG4gICAgICAgICAgICBmdW5jdGlvbiB3YWl0KCkge1xuICAgICAgICAgICAgICAgdGltZW91dCAmJiBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChraWxsLCBibG9jayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgICAgICAgICBjb250ZXh0LnNwYXduZWQuc3Rkb3V0Py5vZmYoJ2RhdGEnLCB3YWl0KTtcbiAgICAgICAgICAgICAgIGNvbnRleHQuc3Bhd25lZC5zdGRlcnI/Lm9mZignZGF0YScsIHdhaXQpO1xuICAgICAgICAgICAgICAgY29udGV4dC5zcGF3bmVkLm9mZignZXhpdCcsIHN0b3ApO1xuICAgICAgICAgICAgICAgY29udGV4dC5zcGF3bmVkLm9mZignY2xvc2UnLCBzdG9wKTtcbiAgICAgICAgICAgICAgIHRpbWVvdXQgJiYgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBraWxsKCkge1xuICAgICAgICAgICAgICAgc3RvcCgpO1xuICAgICAgICAgICAgICAgY29udGV4dC5raWxsKG5ldyBHaXRQbHVnaW5FcnJvcih1bmRlZmluZWQsICd0aW1lb3V0JywgYGJsb2NrIHRpbWVvdXQgcmVhY2hlZGApKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3RkT3V0ICYmIGNvbnRleHQuc3Bhd25lZC5zdGRvdXQ/Lm9uKCdkYXRhJywgd2FpdCk7XG4gICAgICAgICAgICBzdGRFcnIgJiYgY29udGV4dC5zcGF3bmVkLnN0ZGVycj8ub24oJ2RhdGEnLCB3YWl0KTtcbiAgICAgICAgICAgIGNvbnRleHQuc3Bhd25lZC5vbignZXhpdCcsIHN0b3ApO1xuICAgICAgICAgICAgY29udGV4dC5zcGF3bmVkLm9uKCdjbG9zZScsIHN0b3ApO1xuXG4gICAgICAgICAgICB3YWl0KCk7XG4gICAgICAgICB9LFxuICAgICAgfTtcbiAgIH1cbn1cbiIsICIvLyBAdHMtZXhwZWN0LWVycm9yXG5pbXBvcnQgR2l0IGZyb20gJy4uL2dpdCc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdEZhY3RvcnkgfSBmcm9tICcuLi90eXBpbmdzJztcbmltcG9ydCAqIGFzIGFwaSBmcm9tICcuL2FwaSc7XG5pbXBvcnQge1xuICAgYWJvcnRQbHVnaW4sXG4gICBhbGxvd0Vudmlyb25tZW50UGx1Z2luLFxuICAgYmxvY2tVbnNhZmVPcGVyYXRpb25zUGx1Z2luLFxuICAgY29tbWFuZENvbmZpZ1ByZWZpeGluZ1BsdWdpbixcbiAgIGNvbXBsZXRpb25EZXRlY3Rpb25QbHVnaW4sXG4gICBjdXN0b21CaW5hcnlQbHVnaW4sXG4gICBlcnJvckRldGVjdGlvbkhhbmRsZXIsXG4gICBlcnJvckRldGVjdGlvblBsdWdpbixcbiAgIGlucHV0UGx1Z2luLFxuICAgUGx1Z2luU3RvcmUsXG4gICBwcm9ncmVzc01vbml0b3JQbHVnaW4sXG4gICBzcGF3bk9wdGlvbnNQbHVnaW4sXG4gICBzdWZmaXhQYXRoc1BsdWdpbixcbiAgIHRpbWVvdXRQbHVnaW4sXG59IGZyb20gJy4vcGx1Z2lucyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdE9wdGlvbnMgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGNyZWF0ZUluc3RhbmNlQ29uZmlnLCBmb2xkZXJFeGlzdHMgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGNvbnN0IHNpbXBsZUdpdDogU2ltcGxlR2l0RmFjdG9yeSA9IChcbiAgIGJhc2VEaXI/OiBzdHJpbmcgfCBQYXJ0aWFsPFNpbXBsZUdpdE9wdGlvbnM+LFxuICAgb3B0aW9ucz86IFBhcnRpYWw8U2ltcGxlR2l0T3B0aW9ucz5cbikgPT4ge1xuICAgY29uc3QgcGx1Z2lucyA9IG5ldyBQbHVnaW5TdG9yZSgpO1xuICAgY29uc3QgY29uZmlnID0gY3JlYXRlSW5zdGFuY2VDb25maWcoXG4gICAgICAoYmFzZURpciAmJiAodHlwZW9mIGJhc2VEaXIgPT09ICdzdHJpbmcnID8geyBiYXNlRGlyIH0gOiBiYXNlRGlyKSkgfHwge30sXG4gICAgICBvcHRpb25zXG4gICApO1xuXG4gICBpZiAoIWZvbGRlckV4aXN0cyhjb25maWcuYmFzZURpcikpIHtcbiAgICAgIHRocm93IG5ldyBhcGkuR2l0Q29uc3RydWN0RXJyb3IoXG4gICAgICAgICBjb25maWcsXG4gICAgICAgICBgQ2Fubm90IHVzZSBzaW1wbGUtZ2l0IG9uIGEgZGlyZWN0b3J5IHRoYXQgZG9lcyBub3QgZXhpc3RgXG4gICAgICApO1xuICAgfVxuXG4gICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcuY29uZmlnKSkge1xuICAgICAgcGx1Z2lucy5hZGQoY29tbWFuZENvbmZpZ1ByZWZpeGluZ1BsdWdpbihjb25maWcuY29uZmlnKSk7XG4gICB9XG5cbiAgIHBsdWdpbnMuYWRkKGJsb2NrVW5zYWZlT3BlcmF0aW9uc1BsdWdpbihjb25maWcudW5zYWZlKSk7XG4gICBwbHVnaW5zLmFkZChjb21wbGV0aW9uRGV0ZWN0aW9uUGx1Z2luKGNvbmZpZy5jb21wbGV0aW9uKSk7XG4gICBjb25maWcuYWJvcnQgJiYgcGx1Z2lucy5hZGQoYWJvcnRQbHVnaW4oY29uZmlnLmFib3J0KSk7XG4gICBjb25maWcucHJvZ3Jlc3MgJiYgcGx1Z2lucy5hZGQocHJvZ3Jlc3NNb25pdG9yUGx1Z2luKGNvbmZpZy5wcm9ncmVzcykpO1xuICAgY29uZmlnLnRpbWVvdXQgJiYgcGx1Z2lucy5hZGQodGltZW91dFBsdWdpbihjb25maWcudGltZW91dCkpO1xuICAgY29uZmlnLnNwYXduT3B0aW9ucyAmJiBwbHVnaW5zLmFkZChzcGF3bk9wdGlvbnNQbHVnaW4oY29uZmlnLnNwYXduT3B0aW9ucykpO1xuICAgcGx1Z2lucy5hZGQoc3VmZml4UGF0aHNQbHVnaW4oKSk7XG5cbiAgIHBsdWdpbnMuYWRkKGlucHV0UGx1Z2luKGNvbmZpZy5pbnB1dCkpO1xuICAgcGx1Z2lucy5hZGQoZXJyb3JEZXRlY3Rpb25QbHVnaW4oZXJyb3JEZXRlY3Rpb25IYW5kbGVyKHRydWUpKSk7XG4gICBjb25maWcuZXJyb3JzICYmIHBsdWdpbnMuYWRkKGVycm9yRGV0ZWN0aW9uUGx1Z2luKGNvbmZpZy5lcnJvcnMpKTtcblxuICAgY3VzdG9tQmluYXJ5UGx1Z2luKHBsdWdpbnMsIGNvbmZpZy5iaW5hcnksIGNvbmZpZy51bnNhZmU/LmFsbG93VW5zYWZlQ3VzdG9tQmluYXJ5KTtcblxuICAgcGx1Z2lucy5hZGQoXG4gICAgICBhbGxvd0Vudmlyb25tZW50UGx1Z2luKGNvbmZpZy5hbGxvd0Vudmlyb25tZW50ID8/IFtdLCBjb25maWcudW5zYWZlPy5hbGxvd0FiYnJldmlhdGVkT3B0aW9ucylcbiAgICk7XG5cbiAgIHJldHVybiBuZXcgR2l0KGNvbmZpZywgcGx1Z2lucyk7XG59O1xuIiwgImltcG9ydCB7IEFwcCwgTW9kYWwsIE5vdGljZSwgVEZpbGUgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB0eXBlIE15U2ltcGxlUGx1Z2luIGZyb20gXCIuLi9tYWluXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVtb3RlQXJ0aWNsZSB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICByZWxhdGl2ZVBhdGg6IHN0cmluZztcbiAgICBhYnNvbHV0ZVBhdGg6IHN0cmluZztcbiAgICBjb250ZW50OiBzdHJpbmc7XG4gICAgc2l6ZTogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgU3luY0NvbmZsaWN0TW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gICAgYXJ0aWNsZTogUmVtb3RlQXJ0aWNsZTtcbiAgICBsb2NhbEZpbGU6IFRGaWxlO1xuICAgIHBsdWdpbjogTXlTaW1wbGVQbHVnaW47XG4gICAgb25SZXN1bHQ6IChyZXN1bHQ6IFwib3ZlcndyaXRlXCIgfCBcImNvcHlcIiB8IFwiY2FuY2VsXCIpID0+IHZvaWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgYXBwOiBBcHAsXG4gICAgICAgIHBsdWdpbjogTXlTaW1wbGVQbHVnaW4sXG4gICAgICAgIGFydGljbGU6IFJlbW90ZUFydGljbGUsXG4gICAgICAgIGxvY2FsRmlsZTogVEZpbGUsXG4gICAgICAgIG9uUmVzdWx0OiAocmVzdWx0OiBcIm92ZXJ3cml0ZVwiIHwgXCJjb3B5XCIgfCBcImNhbmNlbFwiKSA9PiB2b2lkXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGFwcCk7XG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICAgICAgICB0aGlzLmFydGljbGUgPSBhcnRpY2xlO1xuICAgICAgICB0aGlzLmxvY2FsRmlsZSA9IGxvY2FsRmlsZTtcbiAgICAgICAgdGhpcy5vblJlc3VsdCA9IG9uUmVzdWx0O1xuICAgIH1cblxuICAgIG9uT3BlbigpIHtcbiAgICAgICAgY29uc3QgeyBjb250ZW50RWwgfSA9IHRoaXM7XG4gICAgICAgIGNvbnRlbnRFbC5lbXB0eSgpO1xuICAgICAgICBjb250ZW50RWwuYWRkQ2xhc3MoXCJnaXQtc3luYy1jb25mbGljdC1tb2RhbFwiKTtcblxuICAgICAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IFwiXHU1M0QxXHU3M0IwXHU1NDBDXHU1NDBEXHU2NTg3XHU3QUUwXCIgfSk7XG5cbiAgICAgICAgY29udGVudEVsLmNyZWF0ZUVsKFwicFwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBgR2l0IFx1NEVEM1x1NUU5M1x1NEUyRFx1NzY4NFx1MzAwQSR7dGhpcy5hcnRpY2xlLnRpdGxlfVx1MzAwQlx1NEUwRVx1NjcyQ1x1NTczMFx1NjU4N1x1N0FFMFx1NTQwQ1x1NTQwRFx1MzAwMlx1OEJGN1x1OTAwOVx1NjJFOVx1NTQwQ1x1NkI2NVx1NjVCOVx1NUYwRlx1MzAwMmAsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LXN5bmMtY29uZmxpY3QtZGVzY3JpcHRpb25cIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgaW5mbyA9IGNvbnRlbnRFbC5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LXN5bmMtY29uZmxpY3QtaW5mb1wiIH0pO1xuICAgICAgICBpbmZvLmNyZWF0ZUVsKFwiZGl2XCIsIHtcbiAgICAgICAgICAgIHRleHQ6IGBcdTY3MkNcdTU3MzBcdTY1ODdcdTRFRjZcdUZGMUEke3RoaXMubG9jYWxGaWxlLnBhdGh9YCxcbiAgICAgICAgfSk7XG4gICAgICAgIGluZm8uY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgICAgICAgdGV4dDogYEdpdCBcdTY1ODdcdTRFRjZcdUZGMUEke3RoaXMuYXJ0aWNsZS5yZWxhdGl2ZVBhdGh9YCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnRlbnRFbC5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LXN5bmMtY29uZmxpY3Qtb3B0aW9uc1wiIH0pO1xuXG4gICAgICAgIGNvbnN0IG92ZXJ3cml0ZSA9IG9wdGlvbnMuY3JlYXRlRWwoXCJidXR0b25cIiwge1xuICAgICAgICAgICAgdGV4dDogXCJcdTg5ODZcdTc2RDZcdTY3MkNcdTU3MzBcdTY1ODdcdTdBRTBcIixcbiAgICAgICAgICAgIGNsczogXCJnaXQtc3luYy1jb25mbGljdC1vdmVyd3JpdGVcIixcbiAgICAgICAgfSk7XG4gICAgICAgIG92ZXJ3cml0ZS5jcmVhdGVEaXYoe1xuICAgICAgICAgICAgdGV4dDogXCJcdTRGN0ZcdTc1MjggR2l0IFx1NEVEM1x1NUU5M1x1NEUyRFx1NzY4NFx1NTE4NVx1NUJCOVx1NjZGRlx1NjM2Mlx1NUY1M1x1NTI0RFx1NjcyQ1x1NTczMFx1NjU4N1x1N0FFMFx1MzAwMlwiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC1zeW5jLWNvbmZsaWN0LW9wdGlvbi1kZXNjXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBvdmVyd3JpdGUub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25SZXN1bHQoXCJvdmVyd3JpdGVcIik7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgY29weSA9IG9wdGlvbnMuY3JlYXRlRWwoXCJidXR0b25cIiwge1xuICAgICAgICAgICAgdGV4dDogXCJcdTUzRTZcdTVCNThcdTRFM0FcdTUyNkZcdTRFRjZcIixcbiAgICAgICAgICAgIGNsczogXCJnaXQtc3luYy1jb25mbGljdC1jb3B5XCIsXG4gICAgICAgIH0pO1xuICAgICAgICBjb3B5LmNyZWF0ZURpdih7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NEZERFx1NzU1OVx1NjcyQ1x1NTczMFx1NjU4N1x1N0FFMFx1RkYwQ1x1NUU3Nlx1NUMwNiBHaXQgXHU2NTg3XHU3QUUwXHU1M0U2XHU1QjU4XHU0RTNBXHUyMDFDXHU1MjZGXHU0RUY2XHUyMDFEXHUzMDAyXCIsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LXN5bmMtY29uZmxpY3Qtb3B0aW9uLWRlc2NcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGNvcHkub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25SZXN1bHQoXCJjb3B5XCIpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGNhbmNlbCA9IGNvbnRlbnRFbC5jcmVhdGVFbChcImJ1dHRvblwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NTNENlx1NkQ4OFwiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC1zeW5jLWNvbmZsaWN0LWNhbmNlbFwiLFxuICAgICAgICB9KTtcbiAgICAgICAgY2FuY2VsLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uUmVzdWx0KFwiY2FuY2VsXCIpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9uQ2xvc2UoKSB7XG4gICAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NzUyOFx1NjIzN1x1NzZGNFx1NjNBNVx1NjMwOSBFc2MgXHU1MTczXHU5NUVEXHVGRjBDXHU0RTVGXHU4OUM2XHU0RTNBXHU1M0Q2XHU2RDg4XHUzMDAyXG4gICAgICAgIHRoaXMub25SZXN1bHQoXCJjYW5jZWxcIik7XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29uZmlybVN5bmNDb25mbGljdChcbiAgICBwbHVnaW46IE15U2ltcGxlUGx1Z2luLFxuICAgIGFydGljbGU6IFJlbW90ZUFydGljbGUsXG4gICAgbG9jYWxGaWxlOiBURmlsZVxuKTogUHJvbWlzZTxcIm92ZXJ3cml0ZVwiIHwgXCJjb3B5XCIgfCBcImNhbmNlbFwiPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGxldCByZXNvbHZlZCA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IGZpbmlzaCA9IChyZXN1bHQ6IFwib3ZlcndyaXRlXCIgfCBcImNvcHlcIiB8IFwiY2FuY2VsXCIpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNvbHZlZCkgcmV0dXJuO1xuICAgICAgICAgICAgcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG1vZGFsID0gbmV3IFN5bmNDb25mbGljdE1vZGFsKFxuICAgICAgICAgICAgcGx1Z2luLmFwcCxcbiAgICAgICAgICAgIHBsdWdpbixcbiAgICAgICAgICAgIGFydGljbGUsXG4gICAgICAgICAgICBsb2NhbEZpbGUsXG4gICAgICAgICAgICBmaW5pc2hcbiAgICAgICAgKTtcblxuICAgICAgICBtb2RhbC5vcGVuKCk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzeW5jQXJ0aWNsZShcbiAgICBwbHVnaW46IE15U2ltcGxlUGx1Z2luLFxuICAgIGFydGljbGU6IFJlbW90ZUFydGljbGUsXG4gICAgbG9jYWxGaWxlOiBURmlsZVxuKSB7XG4gICAgYXdhaXQgcGx1Z2luLmFwcC52YXVsdC5tb2RpZnkobG9jYWxGaWxlLCBhcnRpY2xlLmNvbnRlbnQpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3luY0FydGljbGVBc0NvcHkoXG4gICAgcGx1Z2luOiBNeVNpbXBsZVBsdWdpbixcbiAgICBhcnRpY2xlOiBSZW1vdGVBcnRpY2xlLFxuICAgIGxvY2FsRmlsZTogVEZpbGVcbik6IFByb21pc2U8VEZpbGU+IHtcbiAgICBjb25zdCBwYXJlbnRQYXRoID0gbG9jYWxGaWxlLnBhcmVudD8ucGF0aCA/PyBcIlwiO1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IFwiLm1kXCI7XG4gICAgY29uc3QgYmFzZVRpdGxlID0gYXJ0aWNsZS50aXRsZTtcblxuICAgIGxldCBjb3B5TmFtZSA9IGAke2Jhc2VUaXRsZX1cdUZGMDhcdTUyNkZcdTRFRjZcdUZGMDkke2V4dGVuc2lvbn1gO1xuICAgIGxldCBjb3B5UGF0aCA9IHBhcmVudFBhdGggJiYgcGFyZW50UGF0aCAhPT0gXCIvXCJcbiAgICAgICAgPyBgJHtwYXJlbnRQYXRofS8ke2NvcHlOYW1lfWBcbiAgICAgICAgOiBjb3B5TmFtZTtcblxuICAgIGxldCBpbmRleCA9IDI7XG4gICAgd2hpbGUgKHBsdWdpbi5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGNvcHlQYXRoKSkge1xuICAgICAgICBjb3B5TmFtZSA9IGAke2Jhc2VUaXRsZX1cdUZGMDhcdTUyNkZcdTRFRjYgJHtpbmRleH1cdUZGMDkke2V4dGVuc2lvbn1gO1xuICAgICAgICBjb3B5UGF0aCA9IHBhcmVudFBhdGggJiYgcGFyZW50UGF0aCAhPT0gXCIvXCJcbiAgICAgICAgICAgID8gYCR7cGFyZW50UGF0aH0vJHtjb3B5TmFtZX1gXG4gICAgICAgICAgICA6IGNvcHlOYW1lO1xuICAgICAgICBpbmRleCsrO1xuICAgIH1cblxuICAgIGF3YWl0IHBsdWdpbi5hcHAudmF1bHQuY3JlYXRlKGNvcHlQYXRoLCBhcnRpY2xlLmNvbnRlbnQpO1xuXG4gICAgY29uc3QgY29weUZpbGUgPSBwbHVnaW4uYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChjb3B5UGF0aCk7XG4gICAgaWYgKCEoY29weUZpbGUgaW5zdGFuY2VvZiBURmlsZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHU1MjZGXHU0RUY2XHU1REYyXHU1MTk5XHU1MTY1XHVGRjBDXHU0RjQ2IE9ic2lkaWFuIFx1NjcyQVx1ODBGRFx1OEJDNlx1NTIyQlx1NjVCMFx1NjU4N1x1NEVGNlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29weUZpbGU7XG59IiwgImltcG9ydCB7IEZpbGVTeXN0ZW1BZGFwdGVyLCBURmlsZSB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgdHlwZSBNeVNpbXBsZVBsdWdpbiBmcm9tIFwiLi4vbWFpblwiO1xuaW1wb3J0IHR5cGUgeyBSZW1vdGVBcnRpY2xlIH0gZnJvbSBcIi4vc3luY1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZG93bmxvYWRBcnRpY2xlKFxuICAgIHBsdWdpbjogTXlTaW1wbGVQbHVnaW4sXG4gICAgYXJ0aWNsZTogUmVtb3RlQXJ0aWNsZVxuKTogUHJvbWlzZTxURmlsZT4ge1xuICAgIGNvbnN0IGFkYXB0ZXIgPSBwbHVnaW4uYXBwLnZhdWx0LmFkYXB0ZXI7XG5cbiAgICBpZiAoIShhZGFwdGVyIGluc3RhbmNlb2YgRmlsZVN5c3RlbUFkYXB0ZXIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlx1NUY1M1x1NTI0RCBWYXVsdCBcdTRFMERcdTY2MkZcdTY3MkNcdTU3MzBcdTY1ODdcdTRFRjZcdTdDRkJcdTdFREZcdUZGMENcdTY1RTBcdTZDRDVcdTRFMEJcdThGN0RcdTY1ODdcdTdBRTBcIik7XG4gICAgfVxuXG4gICAgY29uc3QgdGFyZ2V0Rm9sZGVyID0gcGx1Z2luLnNldHRpbmdzLnRhcmdldEZvbGRlciB8fCBcIkdpdFx1NjU4N1x1N0FFMFwiO1xuICAgIGNvbnN0IHJlbGF0aXZlVGFyZ2V0ID0gcGF0aFxuICAgICAgICAuam9pbih0YXJnZXRGb2xkZXIsIGFydGljbGUucmVsYXRpdmVQYXRoKVxuICAgICAgICAuc3BsaXQocGF0aC5zZXApXG4gICAgICAgIC5qb2luKFwiL1wiKTtcblxuICAgIGNvbnN0IGFic29sdXRlVGFyZ2V0ID0gcGF0aC5qb2luKFxuICAgICAgICBhZGFwdGVyLmdldEJhc2VQYXRoKCksXG4gICAgICAgIHJlbGF0aXZlVGFyZ2V0XG4gICAgKTtcblxuICAgIGZzLm1rZGlyU3luYyhwYXRoLmRpcm5hbWUoYWJzb2x1dGVUYXJnZXQpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblxuICAgIGF3YWl0IGFkYXB0ZXIud3JpdGUocmVsYXRpdmVUYXJnZXQsIGFydGljbGUuY29udGVudCk7XG5cbiAgICBjb25zdCBmaWxlID0gcGx1Z2luLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgocmVsYXRpdmVUYXJnZXQpO1xuICAgIGlmICghKGZpbGUgaW5zdGFuY2VvZiBURmlsZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHU2NTg3XHU3QUUwXHU1REYyXHU1MTk5XHU1MTY1XHVGRjBDXHU0RjQ2IE9ic2lkaWFuIFx1NjcyQVx1ODBGRFx1OEJDNlx1NTIyQlx1NjVCMFx1NjU4N1x1NEVGNlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmlsZTtcbn0iLCAiaW1wb3J0IHsgQXBwLCBGaWxlU3lzdGVtQWRhcHRlciwgTW9kYWwsIE5vdGljZSwgVEZpbGUgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IHNpbXBsZUdpdCB9IGZyb20gXCJzaW1wbGUtZ2l0XCI7XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCAqIGFzIG9zIGZyb20gXCJvc1wiO1xuaW1wb3J0IHR5cGUgTXlTaW1wbGVQbHVnaW4gZnJvbSBcIi4uL21haW5cIjtcbmltcG9ydCB7IHJlZnJlc2hBcnRpY2xlc1ZpZXcgfSBmcm9tIFwiLi9yZWZyZXNoXCI7XG5cbmV4cG9ydCBjbGFzcyBVcGxvYWRBcnRpY2xlTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gICAgcGx1Z2luOiBNeVNpbXBsZVBsdWdpbjtcbiAgICBmaWxlOiBURmlsZTtcbiAgICBmb2xkZXJzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHNlbGVjdGVkRm9sZGVyID0gXCJcIjtcbiAgICBmb2xkZXJJbnB1dCE6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgc2VsZWN0RWwhOiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICB1cGxvYWRCdXR0b24hOiBIVE1MQnV0dG9uRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IE15U2ltcGxlUGx1Z2luLCBmaWxlOiBURmlsZSkge1xuICAgICAgICBzdXBlcihhcHApO1xuICAgICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgICAgICAgdGhpcy5maWxlID0gZmlsZTtcbiAgICB9XG5cbiAgICBhc3luYyBvbk9wZW4oKSB7XG4gICAgICAgIGNvbnN0IHsgY29udGVudEVsIH0gPSB0aGlzO1xuICAgICAgICBjb250ZW50RWwuZW1wdHkoKTtcbiAgICAgICAgY29udGVudEVsLmFkZENsYXNzKFwiZ2l0LXVwbG9hZC1tb2RhbFwiKTtcblxuICAgICAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IGBcdTRFMEFcdTRGMjBcdUZGMUEke3RoaXMuZmlsZS5iYXNlbmFtZX1gIH0pO1xuICAgICAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJwXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU5MDA5XHU2MkU5IEdpdCBcdTRFRDNcdTVFOTNcdTRFMkRcdTc2ODRcdTc2RUVcdTY4MDdcdTY1ODdcdTRFRjZcdTU5MzlcdTMwMDJcdTY1ODdcdTRFRjZcdTU5MzlcdTRFMERcdTVCNThcdTU3MjhcdTY1RjZcdTRGMUFcdTgxRUFcdTUyQThcdTUyMUJcdTVFRkFcdTMwMDJcIixcbiAgICAgICAgICAgIGNsczogXCJnaXQtdXBsb2FkLWRlc2NyaXB0aW9uXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGxvYWRpbmcgPSBjb250ZW50RWwuY3JlYXRlRGl2KHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU2QjYzXHU1NzI4XHU4QkZCXHU1M0Q2IEdpdCBcdTRFRDNcdTVFOTNcdTY1ODdcdTRFRjZcdTU5MzlcdTIwMjZcIixcbiAgICAgICAgICAgIGNsczogXCJnaXQtdXBsb2FkLWxvYWRpbmdcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuZm9sZGVycyA9IGF3YWl0IHRoaXMucGx1Z2luLmdldFJlbW90ZUZvbGRlcnMoKTtcbiAgICAgICAgICAgIGxvYWRpbmcucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckZvcm0oKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGxvYWRpbmcucmVtb3ZlKCk7XG4gICAgICAgICAgICBjb250ZW50RWwuY3JlYXRlRGl2KHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBgXHU4QkZCXHU1M0Q2XHU0RUQzXHU1RTkzXHU1OTMxXHU4RDI1XHVGRjFBJHtlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcil9YCxcbiAgICAgICAgICAgICAgICBjbHM6IFwiZ2l0LXVwbG9hZC1lcnJvclwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJGb3JtKCkge1xuICAgICAgICBjb25zdCB7IGNvbnRlbnRFbCB9ID0gdGhpcztcblxuICAgICAgICBjb25zdCBmaWVsZCA9IGNvbnRlbnRFbC5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LXVwbG9hZC1maWVsZFwiIH0pO1xuICAgICAgICBmaWVsZC5jcmVhdGVFbChcImxhYmVsXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU1REYyXHU2NzA5XHU2NTg3XHU0RUY2XHU1OTM5XCIsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LXVwbG9hZC1sYWJlbFwiLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNlbGVjdEVsID0gZmllbGQuY3JlYXRlRWwoXCJzZWxlY3RcIiwge1xuICAgICAgICAgICAgY2xzOiBcImdpdC11cGxvYWQtc2VsZWN0XCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0RWwuY3JlYXRlRWwoXCJvcHRpb25cIiwge1xuICAgICAgICAgICAgdGV4dDogXCJcdTRFRDNcdTVFOTNcdTY4MzlcdTc2RUVcdTVGNTVcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGNvbnN0IGZvbGRlciBvZiB0aGlzLmZvbGRlcnMpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0RWwuY3JlYXRlRWwoXCJvcHRpb25cIiwge1xuICAgICAgICAgICAgICAgIHRleHQ6IGZvbGRlciB8fCBcIlx1NEVEM1x1NUU5M1x1NjgzOVx1NzZFRVx1NUY1NVwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBmb2xkZXIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VsZWN0RWwub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRm9sZGVyID0gdGhpcy5zZWxlY3RFbC52YWx1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdEVsLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2xkZXJJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgbmV3RmllbGQgPSBjb250ZW50RWwuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC11cGxvYWQtZmllbGRcIiB9KTtcbiAgICAgICAgbmV3RmllbGQuY3JlYXRlRWwoXCJsYWJlbFwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NjIxNlx1NTIxQlx1NUVGQVx1NjVCMFx1NjU4N1x1NEVGNlx1NTkzOVwiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC11cGxvYWQtbGFiZWxcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mb2xkZXJJbnB1dCA9IG5ld0ZpZWxkLmNyZWF0ZUVsKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJcdTRGOEJcdTU5ODJcdUZGMUFBSS9cdTZBMjFcdTU3OEJcdTdCMTRcdThCQjBcIixcbiAgICAgICAgICAgIGNsczogXCJnaXQtdXBsb2FkLWlucHV0XCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ld0ZpZWxkLmNyZWF0ZURpdih7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NjUyRlx1NjMwMVx1NTkxQVx1N0VBN1x1NzZFRVx1NUY1NVx1RkYwQ1x1NEY4Qlx1NTk4Mlx1RkYxQVx1NjI4MFx1NjcyRi9BSS9PbGxhbWFcIixcbiAgICAgICAgICAgIGNsczogXCJnaXQtdXBsb2FkLWhpbnRcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mb2xkZXJJbnB1dC5vbmlucHV0ID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9sZGVySW5wdXQudmFsdWUudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RFbC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEZvbGRlciA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgZm9vdGVyID0gY29udGVudEVsLmNyZWF0ZURpdih7IGNsczogXCJnaXQtdXBsb2FkLWZvb3RlclwiIH0pO1xuXG4gICAgICAgIGNvbnN0IGNhbmNlbCA9IGZvb3Rlci5jcmVhdGVFbChcImJ1dHRvblwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NTNENlx1NkQ4OFwiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC11cGxvYWQtY2FuY2VsXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBjYW5jZWwub25jbGljayA9ICgpID0+IHRoaXMuY2xvc2UoKTtcblxuICAgICAgICB0aGlzLnVwbG9hZEJ1dHRvbiA9IGZvb3Rlci5jcmVhdGVFbChcImJ1dHRvblwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NEUwQVx1NEYyMFx1NTIzMCBHaXRcIixcbiAgICAgICAgICAgIGNsczogXCJnaXQtdXBsb2FkLXN1Ym1pdFwiLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy51cGxvYWRCdXR0b24ub25jbGljayA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1c3RvbUZvbGRlciA9IHRoaXMuZm9sZGVySW5wdXQudmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgY29uc3QgZm9sZGVyID0gY3VzdG9tRm9sZGVyIHx8IHRoaXMuc2VsZWN0RWwudmFsdWU7XG5cbiAgICAgICAgICAgIHRoaXMudXBsb2FkQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkQnV0dG9uLnRleHRDb250ZW50ID0gXCJcdTRFMEFcdTRGMjBcdTRFMkRcdTIwMjZcIjtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB1cGxvYWRMb2NhbEFydGljbGUodGhpcy5wbHVnaW4sIHRoaXMuZmlsZSwgZm9sZGVyKTtcbiAgICAgICAgICAgICAgICBuZXcgTm90aWNlKFxuICAgICAgICAgICAgICAgICAgICBgXHUzMDBBJHt0aGlzLmZpbGUuYmFzZW5hbWV9XHUzMDBCXHU1REYyXHU0RTBBXHU0RjIwXHU1MjMwICR7Zm9sZGVyIHx8IFwiXHU0RUQzXHU1RTkzXHU2ODM5XHU3NkVFXHU1RjU1XCJ9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYXdhaXQgcmVmcmVzaEFydGljbGVzVmlldyh0aGlzLnBsdWdpbiwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBuZXcgTm90aWNlKFxuICAgICAgICAgICAgICAgICAgICBgXHU0RTBBXHU0RjIwXHU1OTMxXHU4RDI1XHVGRjFBJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKVxuICAgICAgICAgICAgICAgICAgICB9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy51cGxvYWRCdXR0b24udGV4dENvbnRlbnQgPSBcIlx1NEUwQVx1NEYyMFx1NTIzMCBHaXRcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGxvYWRMb2NhbEFydGljbGUoXG4gICAgcGx1Z2luOiBNeVNpbXBsZVBsdWdpbixcbiAgICBmaWxlOiBURmlsZSxcbiAgICBmb2xkZXI6IHN0cmluZ1xuKSB7XG4gICAgY29uc3QgYWRhcHRlciA9IHBsdWdpbi5hcHAudmF1bHQuYWRhcHRlcjtcblxuICAgIGlmICghKGFkYXB0ZXIgaW5zdGFuY2VvZiBGaWxlU3lzdGVtQWRhcHRlcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHU1RjUzXHU1MjREIFZhdWx0IFx1NEUwRFx1NjYyRlx1NjcyQ1x1NTczMFx1NjU4N1x1NEVGNlx1N0NGQlx1N0VERlx1RkYwQ1x1NjVFMFx1NkNENVx1NEUwQVx1NEYyMFx1NjU4N1x1N0FFMFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZW1wRGlyID0gYXdhaXQgcGx1Z2luLmNsb25lVG9UZW1wKCk7XG5cbiAgICB0cnkge1xuICAgICAgICBsZXQgY2xlYW5Gb2xkZXIgPSBmb2xkZXJcbiAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcL2csIFwiL1wiKVxuICAgICAgICAgICAgLnJlcGxhY2UoL15cXC8rfFxcLyskL2csIFwiXCIpO1xuXG4gICAgICAgIC8vIFx1OTYzMlx1NkI2Mlx1OTAxQVx1OEZDN1x1NjU4N1x1NEVGNlx1NTkzOVx1OEY5M1x1NTE2NVx1OERGM1x1NTFGQSBHaXQgXHU0RTM0XHU2NUY2XHU0RUQzXHU1RTkzXHUzMDAyXG4gICAgICAgIGNvbnN0IGZvbGRlclBhcnRzID0gY2xlYW5Gb2xkZXJcbiAgICAgICAgICAgID8gY2xlYW5Gb2xkZXJcbiAgICAgICAgICAgICAgICAgIC5zcGxpdChcIi9cIilcbiAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKHBhcnQpID0+IHBhcnQgJiYgcGFydCAhPT0gXCIuXCIgJiYgcGFydCAhPT0gXCIuLlwiKVxuICAgICAgICAgICAgOiBbXTtcblxuICAgICAgICBjbGVhbkZvbGRlciA9IGZvbGRlclBhcnRzLmpvaW4oXCIvXCIpO1xuXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBwbHVnaW4uYXBwLnZhdWx0LnJlYWQoZmlsZSk7XG4gICAgICAgIGNvbnN0IHRhcmdldFJlbGF0aXZlID0gY2xlYW5Gb2xkZXJcbiAgICAgICAgICAgID8gYCR7Y2xlYW5Gb2xkZXJ9LyR7ZmlsZS5iYXNlbmFtZX0ubWRgXG4gICAgICAgICAgICA6IGAke2ZpbGUuYmFzZW5hbWV9Lm1kYDtcblxuICAgICAgICBjb25zdCB0YXJnZXRBYnNvbHV0ZSA9IHBhdGgucmVzb2x2ZSh0ZW1wRGlyLCB0YXJnZXRSZWxhdGl2ZSk7XG5cbiAgICAgICAgLy8gXHU3ODZFXHU0RkREXHU3NkVFXHU2ODA3XHU4REVGXHU1Rjg0XHU0RUNEXHU3MTM2XHU0RjREXHU0RThFXHU0RTM0XHU2NUY2XHU0RUQzXHU1RTkzXHU1MTg1XHU5MEU4XHUzMDAyXG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRUZW1wID0gcGF0aC5yZXNvbHZlKHRlbXBEaXIpICsgcGF0aC5zZXA7XG4gICAgICAgIGlmICghdGFyZ2V0QWJzb2x1dGUuc3RhcnRzV2l0aChub3JtYWxpemVkVGVtcCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlx1NjVFMFx1NjU0OFx1NzY4NCBHaXQgXHU2NTg3XHU0RUY2XHU1OTM5XHU4REVGXHU1Rjg0XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnMubWtkaXJTeW5jKHBhdGguZGlybmFtZSh0YXJnZXRBYnNvbHV0ZSksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuXG4gICAgICAgIGNvbnN0IGV4aXN0cyA9IGZzLmV4aXN0c1N5bmModGFyZ2V0QWJzb2x1dGUpO1xuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKHRhcmdldEFic29sdXRlLCBjb250ZW50LCBcInV0ZjhcIik7XG5cbiAgICAgICAgY29uc3QgZ2l0ID0gc2ltcGxlR2l0KHtcbiAgICAgICAgICAgIGJhc2VEaXI6IHRlbXBEaXIsXG4gICAgICAgICAgICB0cmltbWVkOiB0cnVlLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocGx1Z2luLnNldHRpbmdzLnNzaEtleS50cmltKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGtleVBhdGggPSBwYXRoLmpvaW4oXG4gICAgICAgICAgICAgICAgb3MudG1wZGlyKCksXG4gICAgICAgICAgICAgICAgYG9ic2lkaWFuLWdpdC1rZXktJHtEYXRlLm5vdygpfWBcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZnMud3JpdGVGaWxlU3luYyhcbiAgICAgICAgICAgICAgICAgICAga2V5UGF0aCxcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luLnNldHRpbmdzLnNzaEtleS50cmltKCkgKyBcIlxcblwiLFxuICAgICAgICAgICAgICAgICAgICB7IG1vZGU6IDBvNjAwIH1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgZ2l0LmVudih7XG4gICAgICAgICAgICAgICAgICAgIC4uLnByb2Nlc3MuZW52LFxuICAgICAgICAgICAgICAgICAgICBHSVRfU1NIX0NPTU1BTkQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBgc3NoIC1pIFwiJHtrZXlQYXRofVwiIC1vIFN0cmljdEhvc3RLZXlDaGVja2luZz1ubyAtbyBVc2VyS25vd25Ib3N0c0ZpbGU9L2Rldi9udWxsYCxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGF3YWl0IGNvbW1pdEFuZFB1c2hBcnRpY2xlKFxuICAgICAgICAgICAgICAgICAgICBnaXQsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFJlbGF0aXZlLFxuICAgICAgICAgICAgICAgICAgICBmaWxlLmJhc2VuYW1lLFxuICAgICAgICAgICAgICAgICAgICBleGlzdHNcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhrZXlQYXRoKSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnMudW5saW5rU3luYyhrZXlQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBcdTVGRkRcdTc1NjVcdTRFMzRcdTY1RjZcdTVCQzZcdTk0QTVcdTZFMDVcdTc0MDZcdTU5MzFcdThEMjVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IGNvbW1pdEFuZFB1c2hBcnRpY2xlKFxuICAgICAgICAgICAgICAgIGdpdCxcbiAgICAgICAgICAgICAgICB0YXJnZXRSZWxhdGl2ZSxcbiAgICAgICAgICAgICAgICBmaWxlLmJhc2VuYW1lLFxuICAgICAgICAgICAgICAgIGV4aXN0c1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICAgIHBsdWdpbi5yZW1vdmVUZW1wRGlyKHRlbXBEaXIpO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gY29tbWl0QW5kUHVzaEFydGljbGUoXG4gICAgZ2l0OiBSZXR1cm5UeXBlPHR5cGVvZiBzaW1wbGVHaXQ+LFxuICAgIHRhcmdldFJlbGF0aXZlOiBzdHJpbmcsXG4gICAgdGl0bGU6IHN0cmluZyxcbiAgICBleGlzdGVkOiBib29sZWFuXG4pIHtcbiAgICBhd2FpdCBnaXQuYWRkKHRhcmdldFJlbGF0aXZlKTtcblxuICAgIGNvbnN0IHN0YXR1cyA9IGF3YWl0IGdpdC5zdGF0dXMoKTtcbiAgICBpZiAoIXN0YXR1cy5zdGFnZWQubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlx1NjU4N1x1N0FFMFx1NTE4NVx1NUJCOVx1NkNBMVx1NjcwOVx1NTNEOFx1NTMxNlx1RkYwQ1x1NjVFMFx1OTcwMFx1NEUwQVx1NEYyMFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBhY3Rpb24gPSBleGlzdGVkID8gXCJcdTY2RjRcdTY1QjBcIiA6IFwiXHU0RTBBXHU0RjIwXCI7XG4gICAgYXdhaXQgZ2l0LmNvbW1pdChgZG9jczogJHthY3Rpb259ICR7dGl0bGV9YCk7XG4gICAgYXdhaXQgZ2l0LnB1c2goKTtcblxuICAgIGNvbnNvbGUubG9nKGBHaXQgJHthY3Rpb259XHU1QjhDXHU2MjEwXHVGRjFBJHt0YXJnZXRSZWxhdGl2ZX1gKTtcbn0iLCAiaW1wb3J0IHsgTm90aWNlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgdHlwZSBNeVNpbXBsZVBsdWdpbiBmcm9tIFwiLi9tYWluXCI7XG5cbi8qKlxuICogXHU1MjM3XHU2NUIwXHUyMDFDR2l0IFx1NjU4N1x1N0FFMFx1MjAxRFx1ODlDNlx1NTZGRVx1MzAwMlxuICogLSBcdTgyRTVcdTg5QzZcdTU2RkVcdTVERjJcdTYyNTNcdTVGMDBcdUZGMENcdTUyMTlcdThDMDNcdTc1MjhcdTUxNzZcdTUxNkNcdTVGMDBcdTc2ODQgcmVmcmVzaCBcdTY1QjlcdTZDRDVcdTkxQ0RcdTY1QjBcdTUyQTBcdThGN0RcdTY1ODdcdTdBRTBcdTUyMTdcdTg4NjhcdTMwMDJcbiAqIC0gXHU4MkU1XHU4OUM2XHU1NkZFXHU2NzJBXHU2MjUzXHU1RjAwXHVGRjBDXHU1MjE5XHU0RTBEXHU1MDVBXHU0RUZCXHU0RjU1XHU0RThCXHUzMDAyXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWZyZXNoQXJ0aWNsZXNWaWV3KFxuICAgIHBsdWdpbjogTXlTaW1wbGVQbHVnaW4sXG4gICAgb3B0aW9uczogeyBzaWxlbnQ/OiBib29sZWFuIH0gPSB7fVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBzaWxlbnQgPSBmYWxzZSB9ID0gb3B0aW9ucztcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGxlYXZlcyA9IHBsdWdpbi5hcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZShcbiAgICAgICAgICAgIHBsdWdpbi52aWV3VHlwZUFydGljbGVzXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKGxlYXZlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIFx1ODlDNlx1NTZGRVx1NkNBMVx1NUYwMFx1RkYwQ1x1NjVFMFx1OTcwMFx1NTIzN1x1NjVCMFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBsZWFmIG9mIGxlYXZlcykge1xuICAgICAgICAgICAgY29uc3QgdmlldyA9IGxlYWYudmlldyBhcyB7IHJlZnJlc2g/OiAoKSA9PiBQcm9taXNlPHZvaWQ+IH0gfCBudWxsO1xuICAgICAgICAgICAgaWYgKHZpZXcgJiYgdHlwZW9mIHZpZXcucmVmcmVzaCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdmlldy5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoIXNpbGVudCkge1xuICAgICAgICAgICAgbmV3IE5vdGljZShcbiAgICAgICAgICAgICAgICBgXHU1MjM3XHU2NUIwXHU2NTg3XHU3QUUwXHU1MjE3XHU4ODY4XHU1OTMxXHU4RDI1XHVGRjFBJHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpXG4gICAgICAgICAgICAgICAgfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJcdTUyMzdcdTY1QjBcdTY1ODdcdTdBRTBcdTUyMTdcdTg4NjhcdTU5MzFcdThEMjVcdUZGMUFcIiwgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxufSJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRDtBQUFBLE1BQ0Q7QUFBQSxJQUNELFNBQVMsT0FBTztBQUFBLElBRWhCO0FBUUEsSUFBQUEsU0FBUSxjQUFjLE9BQU8sS0FBSyxRQUFRLEdBQUcsRUFBRSxPQUFPLFNBQU87QUFDNUQsYUFBTyxXQUFXLEtBQUssR0FBRztBQUFBLElBQzNCLENBQUMsRUFBRSxPQUFPLENBQUMsS0FBSyxRQUFRO0FBRXZCLFlBQU0sT0FBTyxJQUNYLFVBQVUsQ0FBQyxFQUNYLFlBQVksRUFDWixRQUFRLGFBQWEsQ0FBQ0UsSUFBR0MsT0FBTTtBQUMvQixlQUFPQSxHQUFFLFlBQVk7QUFBQSxNQUN0QixDQUFDO0FBR0YsVUFBSSxNQUFNLFFBQVEsSUFBSSxHQUFHO0FBQ3pCLFVBQUksMkJBQTJCLEtBQUssR0FBRyxHQUFHO0FBQ3pDLGNBQU07QUFBQSxNQUNQLFdBQVcsNkJBQTZCLEtBQUssR0FBRyxHQUFHO0FBQ2xELGNBQU07QUFBQSxNQUNQLFdBQVcsUUFBUSxRQUFRO0FBQzFCLGNBQU07QUFBQSxNQUNQLE9BQU87QUFDTixjQUFNLE9BQU8sR0FBRztBQUFBLE1BQ2pCO0FBRUEsVUFBSSxJQUFJLElBQUk7QUFDWixhQUFPO0FBQUEsSUFDUixHQUFHLENBQUMsQ0FBQztBQU1MLGFBQVMsWUFBWTtBQUNwQixhQUFPLFlBQVlILFNBQVEsY0FDMUIsUUFBUUEsU0FBUSxZQUFZLE1BQU0sSUFDbEMsSUFBSSxPQUFPLFFBQVEsT0FBTyxFQUFFO0FBQUEsSUFDOUI7QUFRQSxhQUFTLFdBQVcsTUFBTTtBQUN6QixZQUFNLEVBQUMsV0FBVyxNQUFNLFdBQUFJLFdBQVMsSUFBSTtBQUVyQyxVQUFJQSxZQUFXO0FBQ2QsY0FBTUMsS0FBSSxLQUFLO0FBQ2YsY0FBTSxZQUFZLFlBQWNBLEtBQUksSUFBSUEsS0FBSSxTQUFTQTtBQUNyRCxjQUFNLFNBQVMsS0FBSyxTQUFTLE1BQU0sSUFBSTtBQUV2QyxhQUFLLENBQUMsSUFBSSxTQUFTLEtBQUssQ0FBQyxFQUFFLE1BQU0sSUFBSSxFQUFFLEtBQUssT0FBTyxNQUFNO0FBQ3pELGFBQUssS0FBSyxZQUFZLE9BQU9KLFFBQU8sUUFBUSxTQUFTLEtBQUssSUFBSSxJQUFJLFNBQVc7QUFBQSxNQUM5RSxPQUFPO0FBQ04sYUFBSyxDQUFDLElBQUksUUFBUSxJQUFJLE9BQU8sTUFBTSxLQUFLLENBQUM7QUFBQSxNQUMxQztBQUFBLElBQ0Q7QUFFQSxhQUFTLFVBQVU7QUFDbEIsVUFBSUQsU0FBUSxZQUFZLFVBQVU7QUFDakMsZUFBTztBQUFBLE1BQ1I7QUFDQSxjQUFPLG9CQUFJLEtBQUssR0FBRSxZQUFZLElBQUk7QUFBQSxJQUNuQztBQU1BLGFBQVMsT0FBTyxNQUFNO0FBQ3JCLGFBQU8sUUFBUSxPQUFPLE1BQU0sS0FBSyxrQkFBa0JBLFNBQVEsYUFBYSxHQUFHLElBQUksSUFBSSxJQUFJO0FBQUEsSUFDeEY7QUFRQSxhQUFTLEtBQUssWUFBWTtBQUN6QixVQUFJLFlBQVk7QUFDZixnQkFBUSxJQUFJLFFBQVE7QUFBQSxNQUNyQixPQUFPO0FBR04sZUFBTyxRQUFRLElBQUk7QUFBQSxNQUNwQjtBQUFBLElBQ0Q7QUFTQSxhQUFTLE9BQU87QUFDZixhQUFPLFFBQVEsSUFBSTtBQUFBLElBQ3BCO0FBU0EsYUFBUyxLQUFLLE9BQU87QUFDcEIsWUFBTSxjQUFjLENBQUM7QUFFckIsWUFBTSxPQUFPLE9BQU8sS0FBS0EsU0FBUSxXQUFXO0FBQzVDLGVBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLEtBQUs7QUFDckMsY0FBTSxZQUFZLEtBQUssQ0FBQyxDQUFDLElBQUlBLFNBQVEsWUFBWSxLQUFLLENBQUMsQ0FBQztBQUFBLE1BQ3pEO0FBQUEsSUFDRDtBQUVBLElBQUFDLFFBQU8sVUFBVSxpQkFBb0JELFFBQU87QUFFNUMsUUFBTSxFQUFDLFdBQVUsSUFBSUMsUUFBTztBQU01QixlQUFXLElBQUksU0FBVUssSUFBRztBQUMzQixXQUFLLFlBQVksU0FBUyxLQUFLO0FBQy9CLGFBQU8sS0FBSyxRQUFRQSxJQUFHLEtBQUssV0FBVyxFQUNyQyxNQUFNLElBQUksRUFDVixJQUFJLFNBQU8sSUFBSSxLQUFLLENBQUMsRUFDckIsS0FBSyxHQUFHO0FBQUEsSUFDWDtBQU1BLGVBQVcsSUFBSSxTQUFVQSxJQUFHO0FBQzNCLFdBQUssWUFBWSxTQUFTLEtBQUs7QUFDL0IsYUFBTyxLQUFLLFFBQVFBLElBQUcsS0FBSyxXQUFXO0FBQUEsSUFDeEM7QUFBQTtBQUFBOzs7QUN0UUE7QUFBQSxvQ0FBQUMsVUFBQUMsU0FBQTtBQUtBLFFBQUksT0FBTyxZQUFZLGVBQWUsUUFBUSxTQUFTLGNBQWMsUUFBUSxZQUFZLFFBQVEsUUFBUSxRQUFRO0FBQ2hILE1BQUFBLFFBQU8sVUFBVTtBQUFBLElBQ2xCLE9BQU87QUFDTixNQUFBQSxRQUFPLFVBQVU7QUFBQSxJQUNsQjtBQUFBO0FBQUE7Ozs7Ozs7Ozs7QUNUQSxRQUFBLE9BQUEsUUFBQSxJQUFBO0FBQ0EsUUFBQSxVQUFBLGdCQUFBLGFBQUE7QUFFQSxRQUFNLE1BQU0sUUFBQSxRQUFNLHNCQUFzQjtBQUV4QyxhQUFTLE1BQU1DLE9BQWMsUUFBaUIsYUFBb0I7QUFDL0QsVUFBSSxlQUFlQSxLQUFJO0FBRXZCLFVBQUk7QUFDRCxjQUFNQyxRQUFPLEtBQUEsU0FBU0QsS0FBSTtBQUUxQixZQUFJQyxNQUFLLE9BQU0sS0FBTSxRQUFRO0FBQzFCLGNBQUksNkJBQTZCO0FBQ2pDLGlCQUFPOztBQUdWLFlBQUlBLE1BQUssWUFBVyxLQUFNLGFBQWE7QUFDcEMsY0FBSSxrQ0FBa0M7QUFDdEMsaUJBQU87O0FBR1YsWUFBSSxpRUFBaUU7QUFDckUsZUFBTztlQUNELEdBQUc7QUFDVCxZQUFJLEVBQUUsU0FBUyxVQUFVO0FBQ3RCLGNBQUkscUNBQXFDLENBQUM7QUFDMUMsaUJBQU87O0FBR1YsWUFBSSxjQUFjLENBQUM7QUFDbkIsY0FBTTs7SUFFWjtBQVFBLGFBQWdCLE9BQU9ELE9BQWMsT0FBZUUsU0FBQSxVQUFRO0FBQ3pELGFBQU8sTUFBTUYsUUFBTyxPQUFPRSxTQUFBLFFBQVEsSUFBSSxPQUFPQSxTQUFBLFVBQVUsQ0FBQztJQUM1RDtBQUZBLElBQUFBLFNBQUEsU0FBQTtBQU9hLElBQUFBLFNBQUEsT0FBTztBQUtQLElBQUFBLFNBQUEsU0FBUztBQUtULElBQUFBLFNBQUEsV0FBV0EsU0FBQSxPQUFPQSxTQUFBOzs7Ozs7Ozs7Ozs7QUN4RC9CLElBQUFDLFVBQUEsY0FBQTs7Ozs7Ozs7OztBQ2dDQSxhQUFnQixXQUFRO0FBQ3JCLFVBQUk7QUFDSixVQUFJO0FBQ0osVUFBSSxTQUFnQztBQUVwQyxZQUFNLFVBQXNCLElBQUksUUFBVyxDQUFDLE9BQU8sVUFBUztBQUN6RCxlQUFPO0FBQ1AsZUFBTztNQUNWLENBQUM7QUFFRCxhQUFPO1FBQ0o7UUFDQSxLQUFNLFFBQU07QUFDVCxjQUFJLFdBQVcsV0FBVztBQUN2QixxQkFBUztBQUNULGlCQUFLLE1BQU07O1FBRWpCO1FBQ0EsS0FBTSxPQUFLO0FBQ1IsY0FBSSxXQUFXLFdBQVc7QUFDdkIscUJBQVM7QUFDVCxpQkFBSyxLQUFLOztRQUVoQjtRQUNBLElBQUksWUFBUztBQUNWLGlCQUFPLFdBQVc7UUFDckI7UUFDQSxJQUFJLFNBQU07QUFDUCxpQkFBTztRQUNWOztJQUVOO0FBL0JBLElBQUFDLFNBQUEsV0FBQTtBQXlDYSxJQUFBQSxTQUFBLGlCQUFpQjtBQVM5QixJQUFBQSxTQUFBLFVBQWU7Ozs7O0FDbkZmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUFBQyxtQkFVTzs7O0FDSFAsSUFBTUMsSUFBQUEsb0JBQVksUUFBQTtBQUVYLFNBQVNDLEtBQVlDLEdBQXlCO0FBQ2xELFFBQU1DLElBQU0sSUFBSSxPQUFPRCxDQUFLO0FBQzVCLFNBQUFGLEVBQU0sSUFBSUcsR0FBS0QsQ0FBSyxHQUNiQztBQUNWO0FBRU8sU0FBU0MsRUFBV0MsR0FBaUM7QUFDekQsU0FBT0EsYUFBaUIsVUFBVUwsRUFBTSxJQUFJSyxDQUFLO0FBQ3BEO0FBRU8sU0FBU0MsRUFBUUQsR0FBeUI7QUFaakQ7QUFhRyxVQUFPTCxPQUFNLElBQUlLLENBQUssTUFBZkwsWUFBb0IsQ0FBQTtBQUM5QjtBOzs7Ozs7Ozs7QUNaTyxVQUFVTyxFQUFZQyxHQUFlQyxHQUEwQjtBQUNuRSxRQUFNQyxLQUFhRCxNQUFVO0FBQzdCLGFBQVdFLE1BQVFIO0FBQ1pHLElBQUFBLEdBQUssYUFBYUQsT0FDbkIsTUFBTUM7QUFHZjtBQ2ZPLElBQU1DLElBQUFBLG9CQUF5QixJQUFJO0VBQ3ZDO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7QUFDSCxDQUFDO0FBVE0sSUFZTUMsSUFBQUEsb0JBQXdCLElBQUk7RUFDdEM7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtBQUNILENBQUM7QUFyQk0sSUF3Qk1DLElBQUFBLG9CQUF5QixJQUFJO0VBQ3ZDO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7QUFDSCxDQUFDO0FBOUJNLElBK0JNQyxJQUFBQSxvQkFBd0IsSUFBSSxDQUFDLE9BQU8sYUFBYSxpQkFBaUIsTUFBTSxDQUFDO0FDdEIvRSxTQUFTQyxFQUFtQlIsR0FBZVMsR0FBK0M7O0FBQzlGLGFBQVcsRUFBRSxNQUFBQyxHQUFBLEtBQVVYLEVBQVlDLEdBQU8sTUFBTSxHQUFHO0FBQ2hELFFBQUlJLEVBQW1CLElBQUlNLEVBQUk7QUFDNUIsYUFBT0MsRUFBZ0IsTUFBTUYsQ0FBVztBQUUzQyxRQUFJSixFQUFrQixJQUFJSyxFQUFJO0FBQzNCLGFBQU9DLEVBQWdCLE9BQU9GLENBQVc7RUFFL0M7QUFFQSxRQUFNRyxNQUFPSCxPQUFZLEdBQUcsQ0FBQyxNQUFoQkEsbUJBQW1CO0FBRWhDLFNBQUlHLE9BQVMsU0FDSCxPQUdOTixFQUFtQixJQUFJTSxFQUFJLElBQ3JCRCxFQUFnQixNQUFNRixFQUFZLE1BQU0sQ0FBQyxDQUFDLElBR2hERixFQUFrQixJQUFJSyxFQUFJLElBQ3BCRCxFQUFnQixPQUFPRixFQUFZLE1BQU0sQ0FBQyxDQUFDLElBR2pEQSxFQUFZLFdBQVcsSUFDakJFLEVBQWdCLE9BQU9GLENBQVcsSUFHckNFLEVBQWdCLE1BQU1GLENBQVc7QUFDM0M7QUFFQSxTQUFTRSxFQUFnQkUsSUFBVSxPQUFPSixJQUF3QixDQUFBLEdBQTRCOztBQUMzRixRQUFNSyxNQUFNTCxPQUFZLEdBQUcsQ0FBQyxNQUFoQkEsbUJBQW1CO0FBRS9CLFNBQUlLLE9BQVEsU0FDRixPQUdIO0lBQ0osU0FBQUQ7SUFDQSxRQUFRLENBQUNBO0lBQ1QsS0FBQUM7SUFDQSxPQUFPTCxFQUFZLEdBQUcsQ0FBQztFQUFBO0FBRTdCO0FBRU8sU0FBU00sRUFBWWQsR0FBb0JlLEdBQTRCO0FBQ3pFLFNBQUlBLEVBQVUsV0FBV0EsRUFBVSxVQUFVLFNBQ25DLEVBQUUsS0FBS0EsRUFBVSxLQUFLLE9BQU9BLEVBQVUsT0FBTyxPQUFBZixFQUFBLElBRWpELEVBQUUsS0FBS2UsRUFBVSxLQUFLLE9BQUFmLEVBQUE7QUFDaEM7QUN4REEsU0FBU2dCLEVBQWdCQyxHQUFnRTtBQUN0RixRQUFNQyxLQUFLRCx1QkFBSyxRQUFRLFNBQVE7QUFFaEMsU0FBSSxDQUFDQSxLQUFPQyxJQUFLLElBQ1AsT0FHSDtJQUNKLEtBQUtELEVBQUksTUFBTSxHQUFHQyxDQUFFLEVBQUUsS0FBQSxFQUFPLFlBQUE7SUFDN0IsT0FBT0QsRUFBSSxNQUFNQyxJQUFLLENBQUM7RUFBQTtBQUU3QjtBQUVBLFNBQVNDLEVBQWtCcEIsR0FBNEI7QUFDcEQsYUFBVyxFQUFFLE1BQUFVLEVBQUEsS0FBVVgsRUFBWUMsR0FBTyxNQUFNO0FBQzdDLFlBQVFVLEdBQUE7TUFDTCxLQUFLO0FBQ0YsZUFBTztNQUNWLEtBQUs7QUFDRixlQUFPO01BQ1YsS0FBSztBQUNGLGVBQU87TUFDVixLQUFLO0FBQ0YsZUFBTztNQUNWLEtBQUs7TUFDTCxLQUFLO0FBQ0YsZUFBTztJQUFBO0FBR2hCLFNBQU87QUFDVjtBQUVBLFNBQVNXLEVBQTBCLEVBQUUsTUFBQVgsRUFBQUEsR0FBa0M7QUFDcEUsTUFBSUEsTUFBUyxRQUFRQSxNQUFTO0FBQzNCLFdBQU87QUFFVixNQUFJQSxNQUFTO0FBQ1YsV0FBTztBQUViO0FBT0EsVUFBVVksRUFBa0J0QixHQUF1QztBQUNoRSxhQUFXRyxLQUFRSCxHQUFPO0FBQ3ZCLFVBQU1DLEtBQVFvQixFQUEwQmxCLENBQUksR0FDdENvQixLQUFhdEIsTUFBU2dCLEVBQWdCZCxFQUFLLEtBQUs7QUFFbERvQixJQUFBQSxPQUNELE1BQU07TUFDSCxHQUFHQTtNQUNILE9BQUF0QjtJQUFBO0VBR1Q7QUFDSDtBQUVPLFNBQVN1QixFQUNiQyxHQUNBekIsR0FDQVMsSUFDcUI7QUFDckIsUUFBTWlCLEtBQXFDO0lBQ3hDLE1BQU0sQ0FBQTtJQUNOLE9BQU8sQ0FBQyxHQUFHSixFQUFrQnRCLENBQUssQ0FBQztFQUFBO0FBR3RDLFNBQUl5QixNQUFTLFlBQ1ZFO0lBQ0dEO0lBQ0FOLEVBQWtCcEIsQ0FBSztJQUN2QlEsRUFBbUJSLEdBQU9TLEVBQVc7RUFBQSxHQUlwQ2lCO0FBQ1Y7QUFFQSxTQUFTQyxFQUNORCxHQUNBekIsR0FDQTJCLElBQ0Q7QUFDQyxNQUFJQSxPQUFXO0FBQ1o7QUFHSCxRQUFNQyxLQUFTZCxFQUFZZCxHQUFPMkIsRUFBTTtBQUNwQ0EsRUFBQUEsR0FBTyxVQUNSRixFQUFhLE1BQU0sS0FBS0csRUFBTSxJQUU5QkgsRUFBYSxLQUFLLEtBQUtHLEVBQU07QUFFbkM7QUN2RkEsSUFBTUMsSUFBc0I7RUFDekIsT0FBQSxvQkFBVyxJQUFJO0lBQ1osQ0FBQyxLQUFLLElBQUk7O0VBQUEsQ0FDWjtBQUVKO0FBTEEsSUFPYUMsSUFBbUI7RUFDN0IsT0FBTyxJQUFJLElBQUk7SUFDWixDQUFDLEtBQUssSUFBSTs7SUFDVixDQUFDLEtBQUssS0FBSzs7SUFDWCxDQUFDLEtBQUssS0FBSzs7SUFDWCxDQUFDLEtBQUssS0FBSzs7SUFDWCxDQUFDLEtBQUssS0FBSzs7SUFDWCxHQUFHRCxFQUFVLE1BQU0sUUFBQTtFQUFRLENBQzdCO0VBQ0QsTUFBQSxvQkFBVSxJQUFJO0lBQ1g7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtFQUFBLENBQ0Y7QUFDSjtBQTFCQSxJQTRCTUUsSUFBcUM7RUFDeEMsT0FBTztJQUNKLE9BQUEsb0JBQVcsSUFBSTtNQUNaLENBQUMsS0FBSyxJQUFJOztNQUNWLENBQUMsS0FBSyxJQUFJOztNQUNWLENBQUMsS0FBSyxLQUFLOztNQUNYLENBQUMsS0FBSyxLQUFLOztNQUNYLENBQUMsS0FBSyxJQUFJOztNQUNWLENBQUMsS0FBSyxLQUFLOztNQUNYLENBQUMsS0FBSyxLQUFLOztNQUNYLENBQUMsS0FBSyxJQUFJOztJQUFBLENBQ1o7SUFDRCxNQUFNLG9CQUFJLElBQUksQ0FBQyxVQUFVLFVBQVUsUUFBUSxVQUFVLGVBQWUsS0FBSyxVQUFVLENBQUM7RUFBQTtFQUV2RixRQUFRO0lBQ0wsT0FBQSxvQkFBVyxJQUFJO01BQ1osQ0FBQyxLQUFLLElBQUk7O01BQ1YsQ0FBQyxLQUFLLElBQUk7O01BQ1YsQ0FBQyxLQUFLLElBQUk7O01BQ1YsQ0FBQyxLQUFLLElBQUk7O01BQ1YsQ0FBQyxLQUFLLElBQUk7O0lBQUEsQ0FDWjtJQUNELE1BQUEsb0JBQVUsSUFBSSxDQUFDLFFBQVEsV0FBVyxrQkFBa0IsaUJBQWlCLFVBQVUsQ0FBQztFQUFBO0VBRW5GLFFBQVE7SUFDTCxPQUFBLG9CQUFXLElBQUk7TUFDWixDQUFDLEtBQUssS0FBSzs7TUFDWCxDQUFDLEtBQUssSUFBSTs7TUFDVixDQUFDLEtBQUssS0FBSzs7SUFBQSxDQUNiO0lBQ0QsTUFBTSxvQkFBSSxJQUFJLENBQUMsUUFBUSxXQUFXLFdBQVcsUUFBUSxRQUFRLE9BQU8sQ0FBQztFQUFBO0VBRXhFLE9BQU87SUFDSixPQUFBLG9CQUFXLElBQUE7SUFDWCxNQUFNLG9CQUFJLElBQUksQ0FBQyxhQUFhLENBQUM7RUFBQTtFQUVoQyxNQUFNO0lBQ0gsT0FBQSxvQkFBVyxJQUFBO0lBQ1gsTUFBTSxvQkFBSSxJQUFJLENBQUMsVUFBVSxDQUFDO0VBQUE7RUFFN0IsTUFBTTtJQUNILE9BQUEsb0JBQVcsSUFBQTtJQUNYLE1BQU0sb0JBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQztFQUFBO0VBRWhDLE1BQU07SUFDSCxPQUFBLG9CQUFXLElBQUE7SUFDWCxNQUFNLG9CQUFJLElBQUksQ0FBQyxRQUFRLGNBQWMsQ0FBQztFQUFBO0VBRXpDLFFBQVE7SUFDTCxPQUFBLG9CQUFXLElBQUk7TUFDWixDQUFDLEtBQUssSUFBSTs7TUFDVixDQUFDLEtBQUssS0FBSzs7TUFDWCxDQUFDLEtBQUssS0FBSzs7TUFDWCxDQUFDLEtBQUssS0FBSzs7TUFDWCxDQUFDLEtBQUssS0FBSzs7TUFDWCxDQUFDLEtBQUssS0FBSzs7TUFDWCxDQUFDLEtBQUssS0FBSzs7TUFDWCxDQUFDLEtBQUssS0FBSzs7TUFDWCxDQUFDLEtBQUssSUFBSTs7TUFDVixDQUFDLEtBQUssS0FBSzs7TUFDWCxDQUFDLEtBQUssSUFBSTs7SUFBQSxDQUNaO0lBQ0QsTUFBQSxvQkFBVSxJQUFJLENBQUMsUUFBUSxRQUFRLFlBQVksaUJBQWlCLENBQUM7RUFBQTtBQUVuRTtBQTVGQSxJQThGTUMsSUFBa0IsRUFBRSxPQUFPLG9CQUFJLElBQUEsR0FBTyxNQUFNLG9CQUFJLElBQUEsRUFBSTtBQUVuRCxTQUFTQyxFQUFtQlQsR0FBc0I7O0FBQ3RELFFBQU1VLEtBQU9ILE9BQVNQLGdCQUFRLEVBQUUsTUFBbkJPLFlBQXdCQztBQUVyQyxTQUFPO0lBQ0osT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHSCxFQUFVLE1BQU0sUUFBQSxHQUFXLEdBQUdLLEVBQUssTUFBTSxRQUFBLENBQVMsQ0FBQztJQUN0RSxNQUFNQSxFQUFLO0VBQUE7QUFFakI7QUNqSE8sU0FBU0MsRUFDYmxCLEdBQ0FpQixJQUFPSixHQUtQO0FBQ0EsTUFBSWIsRUFBSSxXQUFXLElBQUksR0FBRztBQUN2QixVQUFNQyxLQUFLRCxFQUFJLFFBQVEsR0FBRztBQUMxQixRQUFJQyxLQUFLO0FBQ04sYUFBTyxDQUFDLEVBQUUsTUFBTUQsRUFBSSxNQUFNLEdBQUdDLEVBQUUsR0FBRyxPQUFPRCxFQUFJLE1BQU1DLEtBQUssQ0FBQyxHQUFHLFdBQVcsTUFBQSxDQUFPO0FBRWpGLFVBQU1rQixLQUFPbkIsRUFBSSxNQUFNLENBQUM7QUFDeEIsV0FBTyxDQUFDLEVBQUUsTUFBTUEsR0FBSyxXQUFXaUIsRUFBSyxLQUFLLElBQUlFLEVBQUksRUFBQSxDQUFHO0VBQ3hEO0FBR0EsTUFBSW5CLEVBQUksV0FBVyxHQUFHO0FBQ25CLFVBQU1vQixLQUFPcEIsRUFBSSxPQUFPLENBQUMsR0FDbkJxQixLQUFXSixFQUFLLE1BQU0sSUFBSUcsRUFBSTtBQUNwQyxXQUFPLENBQUMsRUFBRSxNQUFNcEIsR0FBSyxXQUFXcUIsT0FBYSxLQUFBLENBQU07RUFDdEQ7QUFHQSxTQUFPQyxFQUFjdEIsR0FBS2lCLEVBQUssS0FBSztBQUN2QztBQUVBLFNBQVNLLEVBQ050QixHQUNBdUIsR0FDNEQ7QUFDNUQsUUFBTUMsS0FBUXhCLEVBQUksTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQzdCeUIsS0FBc0UsQ0FBQTtBQUU1RSxXQUFTQyxJQUFJLEdBQUdBLElBQUlGLEdBQU0sUUFBUUUsS0FBSztBQUNwQyxVQUFNTixJQUFPSSxHQUFNRSxDQUFDLEdBQ2RMLEtBQVdFLEVBQVUsSUFBSUgsQ0FBSTtBQUVuQyxRQUFJQyxPQUFhO0FBRWQsYUFBTyxDQUFDLEVBQUUsTUFBTXJCLEdBQUssV0FBVyxNQUFBLENBQU87QUFHMUMsUUFBSXFCLElBQVU7QUFDWCxZQUFNTSxJQUFZSCxHQUFNLE1BQU1FLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRTtBQUM1QyxVQUFJQyxLQUVHLENBRHNCLENBQUMsR0FBR0EsQ0FBUyxFQUFFLE1BQU0sQ0FBQ0MsT0FBTUwsRUFBVSxJQUFJSyxFQUFDLENBQUM7QUFHbkUsZUFBQUgsR0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJTCxDQUFJLElBQUksT0FBT08sR0FBVyxXQUFXLE1BQUEsQ0FBTyxHQUM3REY7SUFHaEI7QUFFQUEsSUFBQUEsR0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJTCxDQUFJLElBQUksV0FBV0MsR0FBQUEsQ0FBVTtFQUN4RDtBQUVBLFNBQU9JO0FBQ1Y7QUN4RE8sU0FBU0ksRUFBaUJDLEdBQTRCaEQsSUFBZ0IsQ0FBQSxHQUFpQjtBQUMzRixNQUFJNEMsS0FBSTtBQUVSLFNBQU9BLEtBQUlJLEVBQU8sVUFBUTtBQUN2QixVQUFNOUIsS0FBTSxPQUFPOEIsRUFBT0osRUFBQyxDQUFDO0FBQzVCLFFBQUksQ0FBQzFCLEdBQUksV0FBVyxHQUFHLEtBQUtBLEdBQUksU0FBUyxFQUFHO0FBRTVDLFVBQU0rQixJQUFTYixFQUFZbEIsRUFBRztBQUM5QixRQUFJZ0MsSUFBT04sS0FBSTtBQUVmLGVBQVdPLE1BQVNGLEdBQVE7QUFDekIsWUFBTTlDLElBQWE7UUFDaEIsTUFBTWdELEdBQU07UUFDWixPQUFPQSxHQUFNO1FBQ2IsY0FBYztRQUNkLFVBQVU7TUFBQTtBQUVUQSxNQUFBQSxHQUFNLGFBQWFoRCxFQUFLLFVBQVUsVUFBYStDLElBQU9GLEVBQU8sV0FDOUQ3QyxFQUFLLFFBQVEsT0FBTzZDLEVBQU9FLENBQUksQ0FBQyxHQUNoQy9DLEVBQUssZUFBZSxNQUNwQitDLE1BRUhsRCxFQUFNLEtBQUtHLENBQUk7SUFDbEI7QUFFQXlDLElBQUFBLEtBQUlNO0VBQ1A7QUFFQSxTQUFPLEVBQUUsT0FBQWxELEdBQU8sV0FBVzRDLEdBQUE7QUFDOUI7QUN6Qk8sU0FBU1EsRUFDYkosR0FDQXZCLEdBQ0F6QixLQUFnQixDQUFBLEdBQ047QUFDVixRQUFNbUMsS0FBT0QsRUFBbUJULENBQUksR0FDOUJoQixJQUF3QixDQUFBLEdBQ3hCNEMsSUFBc0IsQ0FBQTtBQUU1QixNQUFJVCxLQUFJO0FBQ1IsU0FBT0EsS0FBSUksRUFBTyxVQUFRO0FBQ3ZCLFVBQU1NLElBQVVOLEVBQU9KLEVBQUM7QUFFeEIsUUFBSVcsRUFBV0QsQ0FBTyxHQUFHO0FBQ3RCRCxRQUFVLEtBQUssR0FBR0csRUFBUUYsQ0FBaUIsQ0FBQyxHQUM1Q1Y7QUFDQTtJQUNIO0FBRUEsVUFBTTFCLEtBQU0sT0FBT29DLENBQU87QUFFMUIsUUFBSXBDLE9BQVEsTUFBTTtBQUNmLGVBQVN1QyxLQUFJYixLQUFJLEdBQUdhLEtBQUlULEVBQU8sUUFBUVMsTUFBSztBQUN6QyxjQUFNQyxLQUFJVixFQUFPUyxFQUFDO0FBQ2xCRixVQUFXRyxFQUFDLElBQUlMLEVBQVUsS0FBSyxHQUFHRyxFQUFRRSxFQUFXLENBQUMsSUFBSUwsRUFBVSxLQUFLLE9BQU9LLEVBQUMsQ0FBQztNQUNyRjtBQUNBO0lBQ0g7QUFFQSxRQUFJLENBQUN4QyxHQUFJLFdBQVcsR0FBRyxLQUFLQSxHQUFJLFNBQVMsR0FBRztBQUN6Q1QsUUFBWSxLQUFLUyxFQUFHLEdBQ3BCMEI7QUFDQTtJQUNIO0FBRUEsVUFBTUssS0FBU2IsRUFBWWxCLElBQUtpQixFQUFJO0FBQ3BDLFFBQUllLEtBQU9OLEtBQUk7QUFFZixlQUFXTyxNQUFTRixJQUFRO0FBQ3pCLFlBQU05QyxLQUFhO1FBQ2hCLE1BQU1nRCxHQUFNO1FBQ1osT0FBT0EsR0FBTTtRQUNiLGNBQWM7UUFDZCxVQUFVO01BQUE7QUFHVkEsTUFBQUEsR0FBTSxhQUNOaEQsR0FBSyxVQUFVLFVBQ2YrQyxLQUFPRixFQUFPLFVBQ2QsQ0FBQ08sRUFBV1AsRUFBT0UsRUFBSSxDQUFDLE1BRXhCL0MsR0FBSyxRQUFRLE9BQU82QyxFQUFPRSxFQUFJLENBQUMsR0FDaEMvQyxHQUFLLGVBQWUsTUFDcEIrQyxPQUVIbEQsR0FBTSxLQUFLRyxFQUFJO0lBQ2xCO0FBRUF5QyxJQUFBQSxLQUFJTTtFQUNQO0FBRUEsU0FBTyxFQUFFLE9BQUFsRCxJQUFPLGFBQUFTLEdBQWEsV0FBQTRDLEVBQUE7QUFDaEM7QUN2RU8sVUFBVU0sRUFBNkI7RUFDM0MsT0FBQUM7QUFDSCxHQUFtRDtBQUNoRCxhQUFXL0IsS0FBVStCO0FBQ2xCLGVBQVdDLE1BQVVDLEdBQXFCO0FBQ3ZDLFlBQU1DLEtBQWdCRixHQUFPaEMsRUFBTyxHQUFHO0FBQ25Da0MsTUFBQUEsT0FDRCxNQUFNQTtJQUVaO0FBRU47QUFFQSxTQUFTQyxFQUNObkMsR0FDQW9DLEdBQ0FDLEtBQVUsT0FBT3JDLENBQU0sR0FDeEI7QUFDQyxRQUFNc0MsS0FBUSxPQUFPdEMsS0FBVyxXQUFXLElBQUksT0FBTyxPQUFPQSxFQUFPLFlBQUEsQ0FBYSxFQUFFLElBQUlBO0FBRXZGLFNBQU8sU0FBd0JmLEdBQW1DO0FBQy9ELFFBQUlxRCxHQUFNLEtBQUtyRCxDQUFHO0FBQ2YsYUFBTztRQUNKLFVBQUFtRDtRQUNBLFNBQVMsZUFBZUMsRUFBTyxzQ0FBc0NELENBQVE7TUFBQTtFQUd0RjtBQUNIO0FBRUEsU0FBU0csRUFBNkJ2QyxHQUFnQm9DLEdBQWlDO0FBQ3BGLFFBQU1FLEtBQVEsSUFBSSxPQUFPLE9BQU90QyxFQUFPLFlBQUEsRUFBYyxRQUFRLE9BQU8sU0FBUyxDQUFDLEVBQUU7QUFDaEYsU0FBT21DLEVBQXFCRyxJQUFPRixHQUFVcEMsQ0FBTTtBQUN0RDtBQUVBLElBQU1pQyxJQUFzQjtFQUN6QkUsRUFBcUIsU0FBUyxrQkFBa0I7RUFDaERBLEVBQXFCLGdCQUFnQixvQkFBb0I7RUFDekRBLEVBQXFCLGVBQWUsbUJBQW1CO0VBQ3ZEQSxFQUFxQixrQkFBa0Isc0JBQXNCO0VBQzdEQSxFQUFxQixpQkFBaUIscUJBQXFCO0VBQzNEQSxFQUFxQixrQkFBa0Isc0JBQXNCO0VBQzdEQSxFQUFxQixjQUFjLGtCQUFrQjtFQUNyREEsRUFBcUIsbUJBQW1CLHVCQUF1QjtFQUMvREksRUFBNkIscUJBQXFCLDZCQUE2QjtFQUMvRUEsRUFBNkIsZ0JBQWdCLHlCQUF5QjtFQUN0RUosRUFBcUIsaUJBQWlCLHlCQUF5QjtFQUMvREksRUFBNkIsZ0JBQWdCLHlCQUF5QjtFQUN0RUEsRUFBNkIsaUJBQWlCLHlCQUF5QjtFQUN2RUEsRUFBNkIsZ0JBQWdCLG1CQUFtQjtFQUNoRUEsRUFBNkIsa0JBQWtCLG1CQUFtQjtFQUNsRUEsRUFBNkIsaUJBQWlCLG1CQUFtQjtFQUNqRUEsRUFBNkIsZUFBZSx1QkFBdUI7RUFDbkVKLEVBQXFCLGdCQUFnQixvQkFBb0I7RUFDekRJLEVBQTZCLGFBQWEsb0JBQW9CO0VBQzlESixFQUFxQixvQkFBb0Isd0JBQXdCO0VBQ2pFSSxFQUE2QixVQUFVLGtCQUFrQjtFQUN6REEsRUFBNkIsZ0JBQWdCLHdCQUF3QjtFQUNyRUEsRUFBNkIsa0JBQWtCLHdCQUF3QjtFQUN2RUEsRUFBNkIsaUJBQWlCLHdCQUF3QjtFQUN0RUEsRUFBNkIsa0JBQWtCLDZCQUE2QjtFQUM1RUEsRUFBNkIsc0JBQXNCLGlCQUFpQjtFQUNwRUEsRUFBNkIscUJBQXFCLGlCQUFpQjtFQUNuRUosRUFBcUIsOEJBQThCLGlCQUFpQjtFQUNwRUEsRUFBcUIsbUJBQW1CLG1CQUFtQjtFQUMzREksRUFBNkIsb0JBQW9CLHNCQUFzQjtFQUN2RUEsRUFBNkIsZUFBZSw0QkFBNEI7RUFDeEVBLEVBQTZCLGVBQWUsNEJBQTRCO0VBQ3hFQSxFQUE2QixtQkFBbUIsNEJBQTRCO0VBQzVFQSxFQUE2QixpQkFBaUIsdUJBQXVCO0FBQ3hFO0FDdEVPLFVBQVVDLEVBQ2Q1QyxHQUNBekIsR0FDeUI7QUFDekIsYUFBV0csTUFBUUg7QUFDaEIsZUFBVzZELE1BQVVTLEdBQW9CO0FBQ3RDLFlBQU1QLElBQWdCRixHQUFPcEMsR0FBTXRCLEVBQUk7QUFDbkM0RCxZQUNELE1BQU1BO0lBRVo7QUFFTjtBQWdCQSxTQUFTUSxHQUNOOUMsR0FDQXRCLEdBQ0E4RCxJQUNBLEVBQUUsTUFBQXZELEtBQU8sT0FBT1AsQ0FBSSxHQUFHLFlBQUFxRSxJQUFhLE9BQU8sV0FBQUMsSUFBWSxNQUFBLElBQThCLENBQUEsR0FDdEY7QUFDQyxRQUFNTixLQUFRLE9BQU9oRSxLQUFTLFdBQVcsSUFBSSxPQUFPLE9BQU9BLEVBQUssWUFBQSxDQUFhLEVBQUUsSUFBSUEsR0FDN0UrRCxJQUFVLFVBQVV6QyxJQUFPLEdBQUdBLENBQUksa0JBQWtCLEVBQUUsR0FBR2YsRUFBSSxzQ0FBc0N1RCxFQUFRO0FBRWpILFNBQU8sU0FBcUJTLElBQTRCdkUsSUFBa0M7QUFDdkYsUUFBSSxFQUFBc0IsS0FBUWlELE9BQWdCakQsTUFJeEIsRUFBQStDLEtBQWMsQ0FBQ3JFLEdBQUssYUFJcEIsRUFBQXNFLEtBQWF0RSxHQUFLLFVBQVUsV0FJNUJnRSxHQUFNLEtBQUtoRSxHQUFLLElBQUk7QUFDckIsYUFBTztRQUNKLFVBQUE4RDtRQUNBLFNBQUFDO01BQUE7RUFHVDtBQUNIO0FBRUEsSUFBTVMsSUFBdUMsRUFBRSxZQUFZLE1BQU0sV0FBVyxLQUFBO0FBQTVFLElBRU1MLElBQXFCO0VBQ3hCQyxHQUFtQixNQUFNLDJCQUEyQixtQkFBbUI7SUFDcEUsTUFBTTtFQUFBLENBQ1I7RUFDREEsR0FBbUIsU0FBUyxVQUFVLGlCQUFpQjtFQUN2REEsR0FBbUIsU0FBUyxPQUFPLGlCQUFpQjtFQUNwREEsR0FBbUIsUUFBUSxZQUFZLG1CQUFtQixFQUFFLE1BQU0sU0FBQSxDQUFVOztFQUU1RUEsR0FBbUIsVUFBVSxxQkFBcUIsbUJBQW1CLEVBQUUsTUFBTSxlQUFBLENBQWdCO0VBQzdGQSxHQUFtQixNQUFNLGNBQWMsd0JBQXdCO0VBQy9EQSxHQUFtQixNQUFNLGVBQWUsbUJBQW1CSSxDQUFnQjs7O0VBRzNFSixHQUFtQixNQUFNLGFBQWEsMEJBQTBCSSxDQUFnQjtFQUNoRkosR0FBbUIsTUFBTSxlQUFlLDBCQUEwQkksQ0FBZ0I7RUFDbEZKLEdBQW1CLE1BQU0sUUFBUSwwQkFBMEIsRUFBRSxHQUFHSSxHQUFrQixNQUFNLEtBQUEsQ0FBTTtBQUNqRztBQzFFTyxTQUFTQyxFQUNibkQsR0FDQXpCLEdBQ0E2QixJQUNnQjtBQUNoQixTQUFPLENBQUMsR0FBR3dDLEVBQXNCNUMsR0FBTXpCLENBQUssR0FBRyxHQUFHMkQsRUFBNkI5QixFQUFNLENBQUM7QUFDekY7QUNBTyxTQUFTZ0QsS0FBYTdCLEdBQXdDO0FBQ2xFLFFBQU0sRUFBRSxPQUFBaEQsR0FBTyxXQUFBOEUsR0FBQUEsSUFBYy9CLEVBQWlCQyxDQUFNLEdBRTlDdkIsS0FBT3FELEtBQVk5QixFQUFPLFNBQVMsT0FBT0EsRUFBTzhCLEVBQVMsQ0FBQyxFQUFFLFlBQUEsSUFBZ0IsTUFDN0VDLElBQWF0RCxPQUFTLE9BQU91QixFQUFPLE1BQU04QixLQUFZLENBQUMsSUFBSSxDQUFBLEdBRTNELEVBQUUsYUFBQXJFLEdBQWEsV0FBQTRDLEdBQUEsSUFBY0QsRUFBZTJCLEdBQVl0RCxJQUFNekIsQ0FBSyxHQUNuRTZCLElBQVNMLEVBQW9CQyxJQUFNekIsR0FBT1MsQ0FBVztBQUUzRCxTQUFPO0lBQ0osTUFBQWdCO0lBQ0EsT0FBT3pCLEVBQU0sSUFBSWdGLENBQVk7SUFDN0IsT0FBTzNCO0lBQ1AsUUFBQXhCO0lBQ0EsaUJBQWlCb0QsRUFBa0JMLEVBQXNCbkQsSUFBTXpCLEdBQU82QixDQUFNLENBQUM7RUFBQTtBQUVuRjtBQUVBLFNBQVNvRCxFQUFrQkMsR0FBa0M7QUFDMUQsU0FBTyxPQUFPLGVBQWVBLEdBQWlCLG1CQUFtQjtJQUM5RCxPQUFPQTtFQUFBLENBQ1Q7QUFDSjtBQUVBLFNBQVNGLEVBQWEsRUFBRSxPQUFBRyxHQUFPLE1BQUF6RSxFQUFBQSxHQUEwQjtBQUN0RCxTQUFPeUUsTUFBVSxTQUFZLEVBQUUsTUFBQXpFLEdBQU0sT0FBQXlFLEVBQUEsSUFBVSxFQUFFLE1BQUF6RSxFQUFBO0FBQ3BEO0FDbENBLElBQU0wRSxJQUFhO0VBQ2hCLFFBQVU7RUFDVixhQUFlO0VBQ2YsbUJBQXFCO0VBQ3JCLG1CQUFxQjtFQUNyQixrQkFBb0I7RUFDcEIsdUJBQXlCO0VBQ3pCLFlBQWM7RUFDZCxZQUFjO0VBQ2QsZUFBaUI7RUFDakIsbUJBQXFCO0VBQ3JCLFdBQWE7RUFDYixtQkFBcUI7RUFDckIsa0JBQW9CO0VBQ3BCLHFCQUF1QjtFQUN2QixTQUFXO0VBQ1gsaUJBQW1CO0VBQ25CLE9BQVM7RUFDVCxRQUFVO0VBQ1YsYUFBZTtFQUNmLFFBQVU7QUFDYjtBQU1BLFVBQVVDLEVBQXFCQyxHQUFxQzs7QUFDakUsUUFBTUMsSUFBUSxVQUFTRCxPQUFJLHFCQUFKQSxZQUF3QixLQUFLLEVBQUU7QUFDdEQsV0FBU0UsS0FBUSxHQUFHQSxLQUFRRCxHQUFPQyxNQUFTO0FBQ3pDLFVBQU0xRSxLQUFNd0UsRUFBSSxrQkFBa0JFLEVBQUssRUFBRSxHQUNuQ0wsSUFBUUcsRUFBSSxvQkFBb0JFLEVBQUssRUFBRTtBQUV6QzFFLElBQUFBLE9BQVEsV0FDVCxNQUFNLEVBQUUsS0FBS0EsR0FBSSxZQUFBLEVBQWMsS0FBQSxHQUFRLE9BQUFxRSxHQUFPLE9BQU8sTUFBQTtFQUUzRDtBQUNIO0FBRUEsVUFBVU0sRUFBNkJILEdBQXVDO0FBQzNFLGFBQVd4RSxLQUFPLE9BQU8sS0FBS3dFLENBQUc7QUFDOUIsUUFBSUksRUFBWTVFLENBQUcsR0FBRztBQUNuQixZQUFNbUQsS0FBV21CLEVBQVd0RSxDQUFHO0FBQy9CLFlBQU07UUFDSCxVQUFBbUQ7UUFDQSxTQUFTLFdBQVduRCxFQUFJLFlBQUEsQ0FBYSx1Q0FBdUNtRCxFQUFRO01BQUE7SUFFMUY7QUFFTjtBQUVPLFNBQVN5QixFQUFZNUUsR0FBNkM7QUFDdEUsU0FBTyxPQUFPLE9BQU9zRSxHQUFZdEUsQ0FBRztBQUN2QztBQUVBLFNBQVM2RSxHQUFXTCxHQUFzQztBQUN2RCxRQUFNTSxJQUFpQixDQUFBO0FBQ3ZCLGFBQVcsQ0FBQzlFLElBQUtxRSxFQUFLLEtBQUssT0FBTyxRQUFRRyxDQUFHLEdBQUc7QUFDN0MsVUFBTU8sSUFBUy9FLEdBQUksWUFBQSxFQUFjLEtBQUE7QUFDakMsS0FBSTRFLEVBQVlHLENBQU0sS0FBS0EsRUFBTyxXQUFXLEtBQUssT0FDL0NELEVBQU9DLENBQU0sSUFBSSxPQUFPVixFQUFLO0VBRW5DO0FBQ0EsU0FBT1M7QUFDVjtBQUVPLFNBQVNFLEdBQVM1RSxHQUE4QjtBQUNwRCxRQUFNb0UsSUFBTUssR0FBV3pFLENBQUcsR0FDcEJXLEtBQStCO0lBQ2xDLE1BQU0sQ0FBQTtJQUNOLE9BQU8sQ0FBQyxHQUFHd0QsRUFBcUJDLENBQUcsQ0FBQztFQUFBLEdBRWpDSixLQUFrQjtJQUNyQixHQUFHTyxFQUE2QkgsQ0FBRztJQUNuQyxHQUFHVixFQUFzQixNQUFNLENBQUEsR0FBSS9DLEVBQU07RUFBQTtBQUc1QyxTQUFPO0lBQ0osUUFBQUE7SUFDQSxpQkFBQXFEO0VBQUE7QUFFTjtBQzlFTyxTQUFTYSxHQUFtQi9DLEdBQTJCc0MsR0FBOEI7QUFDekYsU0FBTyxDQUFDLEdBQUdULEVBQVUsR0FBRzdCLENBQU0sRUFBRSxpQkFBaUIsR0FBRzhDLEdBQVNSLENBQUcsRUFBRSxlQUFlO0FBQ3BGOzs7O0FDa0JPLElBQU1VLEtBQU4sY0FBdUIsTUFBTTtFQUNqQyxZQUNVQyxHQUNQQyxHQUNEO0FBQ0MsVUFBTUEsQ0FBTyxHQUhOLEtBQUEsT0FBQUQsR0FJUCxPQUFPLGVBQWUsTUFBTSxXQUFXLFNBQVM7RUFDbkQ7QUFDSDtBQ3ZCTyxJQUFNRSxLQUFOLGNBQWdDSCxHQUFTO0VBQzdDLFlBQ21CSSxHQUNoQkYsR0FDRDtBQUNDLFVBQU0sUUFBV0EsQ0FBTyxHQUhSLEtBQUEsU0FBQUU7RUFJbkI7QUFDSDtBQ2hCTyxJQUFNQyxLQUFOLGNBQTZCTCxHQUFTO0VBQzFDLFlBQ1VDLEdBQ1NLLEdBQ2hCSixJQUNEO0FBQ0MsVUFBTUQsR0FBTUMsRUFBTyxHQUpaLEtBQUEsT0FBQUQsR0FDUyxLQUFBLFNBQUFLLEdBSWhCLE9BQU8sZUFBZSxNQUFNLFdBQVcsU0FBUztFQUNuRDtBQUNIO0FDVU8sSUFBTUMsS0FBTixjQUF3Q1AsR0FBUztFQUNyRCxZQUltQlEsR0FDaEJOLEdBQ0Q7QUFDQyxVQUFNLFFBQVdBLEtBQVcsT0FBT00sQ0FBRyxDQUFDLEdBSHZCLEtBQUEsTUFBQUE7RUFJbkI7QUFDSDtBQ3RCTyxJQUFNQyxLQUFOLGNBQXFDVCxHQUFTO0VBQ2xELFlBQVlFLEdBQWtCO0FBQzNCLFVBQU0sUUFBV0EsQ0FBTztFQUMzQjtBQUNIO0FDUE8sSUFBTVEsS0FBTztBQUFiLElBRU1DLEtBQWlCLE1BQU07QUFBQztBQU05QixTQUFTQyxHQUFjQyxJQUErQjtBQUMxRCxTQUFJLE9BQU9BLE1BQVcsYUFDWkYsS0FFSEU7QUFDVjtBQU1PLFNBQVNDLEdBQW1DRCxJQUFrQztBQUNsRixTQUFPLE9BQU9BLE1BQVcsY0FBY0EsT0FBV0Y7QUFDckQ7QUFFTyxTQUFTSSxHQUFRQyxJQUFlQyxHQUFnQztBQUNwRSxRQUFNQyxJQUFRRixHQUFNLFFBQVFDLENBQUk7QUFDaEMsU0FBSUMsS0FBUyxJQUNILENBQUNGLElBQU8sRUFBRSxJQUdiLENBQUNBLEdBQU0sT0FBTyxHQUFHRSxDQUFLLEdBQUdGLEdBQU0sT0FBT0UsSUFBUSxDQUFDLENBQUM7QUFDMUQ7QUFJTyxTQUFTQyxHQUFNSCxJQUErQkksSUFBUyxHQUFtQjtBQUM5RSxTQUFPQyxHQUFZTCxFQUFLLEtBQUtBLEdBQU0sU0FBU0ksSUFBU0osR0FBTUksQ0FBTSxJQUFJO0FBQ3hFO0FBS08sU0FBU0UsR0FBS04sSUFBZ0JJLElBQVMsR0FBRztBQUM5QyxNQUFJQyxHQUFZTCxFQUFLLEtBQUtBLEdBQU0sU0FBU0k7QUFDdEMsV0FBT0osR0FBTUEsR0FBTSxTQUFTLElBQUlJLENBQU07QUFFNUM7QUFJQSxTQUFTQyxHQUFZTCxJQUE2QztBQUMvRCxTQUFPTyxHQUFnQlAsRUFBSztBQUMvQjtBQUVPLFNBQVNRLEdBQW1CUixLQUFRLElBQUlTLElBQVUsTUFBTUMsSUFBWTtHQUFnQjtBQUN4RixTQUFPVixHQUFNLE1BQU1VLENBQVMsRUFBRSxPQUFPLENBQUNDLElBQVFDLE1BQVM7QUFDcEQsVUFBTUMsS0FBY0osSUFBVUcsRUFBSyxLQUFBLElBQVNBO0FBQzVDLFdBQUlDLE1BQ0RGLEdBQU8sS0FBS0UsRUFBVyxHQUVuQkY7RUFDVixHQUFHLENBQUEsQ0FBYztBQUNwQjtBQUlPLFNBQVNHLEdBQ2JkLElBQ0FlLEdBQ0k7QUFDSixTQUFPUCxHQUFtQlIsSUFBTyxJQUFJLEVBQUUsSUFBSSxDQUFDWSxNQUFTRyxFQUFTSCxDQUFJLENBQUM7QUFDdEU7QUFFTyxTQUFTSSxHQUFhQyxJQUF1QjtBQUNqRCxhQUFPQyxtQkFBQUEsUUFBT0QsSUFBTUUsbUJBQUFBLE1BQU07QUFDN0I7QUFLTyxTQUFTQyxHQUFVQyxJQUFzQkMsR0FBc0I7QUFDbkUsU0FBSSxNQUFNLFFBQVFELEVBQU0sSUFDaEJBLEdBQU8sU0FBU0MsQ0FBSSxLQUN0QkQsR0FBTyxLQUFLQyxDQUFJLElBR25CRCxHQUFPLElBQUlDLENBQUksR0FFWEE7QUFDVjtBQUtPLFNBQVNDLEdBQWFGLElBQWFDLEdBQXdCO0FBQy9ELFNBQUksTUFBTSxRQUFRRCxFQUFNLEtBQUssQ0FBQ0EsR0FBTyxTQUFTQyxDQUFJLEtBQy9DRCxHQUFPLEtBQUtDLENBQUksR0FHWkQ7QUFDVjtBQUVPLFNBQVNHLEdBQVVILElBQXNCQyxHQUFZO0FBQ3pELE1BQUksTUFBTSxRQUFRRCxFQUFNLEdBQUc7QUFDeEIsVUFBTW5CLElBQVFtQixHQUFPLFFBQVFDLENBQUk7QUFDN0JwQixTQUFTLEtBQ1ZtQixHQUFPLE9BQU9uQixHQUFPLENBQUM7RUFFNUI7QUFDR21CLElBQUFBLEdBQU8sT0FBT0MsQ0FBSTtBQUVyQixTQUFPQTtBQUNWO0FBRU8sSUFBTUcsS0FBaUIsT0FBTyxVQUFVLFNBQVMsS0FBSyxLQUFLLE9BQU8sVUFBVSxRQUFRO0FBSXBGLFNBQVNDLEVBQVc3QixJQUFzQjtBQUM5QyxTQUFPLE1BQU0sUUFBUUEsRUFBTSxJQUFJQSxLQUFTLENBQUNBLEVBQU07QUFDbEQ7QUFFTyxTQUFTOEIsR0FBWUMsSUFBYTtBQUN0QyxTQUFPQSxHQUFJLFFBQVEsY0FBYyxDQUFDQyxHQUFNQyxNQUM5QkEsRUFBSSxZQUFBLENBQ2I7QUFDSjtBQUVPLFNBQVNDLEdBQWlCbEMsSUFBMkI7QUFDekQsU0FBTzZCLEVBQVE3QixFQUFNLEVBQUUsSUFBSSxDQUFDeUIsTUFDbEJBLGFBQWdCLFNBQVVBLElBQWtCLE9BQU9BLENBQUksQ0FDaEU7QUFDSjtBQUVPLFNBQVNVLEVBQVNuQyxJQUFtQ29DLElBQVEsR0FBRztBQUNwRSxNQUFJcEMsTUFBVTtBQUNYLFdBQU9vQztBQUdWLFFBQU1DLElBQU0sU0FBU3JDLElBQVEsRUFBRTtBQUMvQixTQUFPLE9BQU8sTUFBTXFDLENBQUcsSUFBSUQsSUFBUUM7QUFDdEM7QUFFTyxTQUFTQyxFQUFpQm5DLElBQVlvQyxHQUFnQjtBQUMxRCxRQUFNekIsSUFBYyxDQUFBO0FBQ3BCLFdBQVMwQixLQUFJLEdBQUdDLElBQU10QyxHQUFNLFFBQVFxQyxLQUFJQyxHQUFLRDtBQUMxQzFCLE1BQU8sS0FBS3lCLEdBQVFwQyxHQUFNcUMsRUFBQyxDQUFDO0FBRS9CLFNBQU8xQjtBQUNWO0FBRU8sU0FBUzRCLEdBQWV2QyxJQUFrQztBQUM5RCxVQUFRLE1BQU0sUUFBUUEsRUFBSyxJQUFJLE9BQU8sT0FBT0EsRUFBSyxJQUFJQSxJQUFPLFNBQVMsT0FBTztBQUNoRjtBQUVPLFNBQVN3QyxHQUFXeEMsSUFBeUI7QUFDakQsU0FBS0EsS0FJRSxPQUFPLFNBQVNBLEVBQUssSUFBSUEsR0FBTSxTQUFTLE9BQU8sV0FBV0EsRUFBSyxJQUg1RDtBQUliO0FBS08sU0FBU3lDLEdBQTJCNUMsSUFBVzZDLEdBQTBCO0FBQzdFLFFBQU1DLElBQTJCLENBQUE7QUFFakMsU0FBQUQsRUFBVyxRQUFRLENBQUNFLE9BQVE7QUFDckIvQyxJQUFBQSxHQUFPK0MsRUFBRyxNQUFNLFdBQ2pCRCxFQUFJQyxFQUFHLElBQUkvQyxHQUFPK0MsRUFBRztFQUUzQixDQUFDLEdBRU1EO0FBQ1Y7QUFFTyxTQUFTRSxHQUFNQyxLQUFXLEdBQWtCO0FBQ2hELFNBQU8sSUFBSSxRQUFRLENBQUNDLE1BQVMsV0FBV0EsR0FBTUQsRUFBUSxDQUFDO0FBQzFEO0FBRU8sU0FBU0UsR0FBVWhELElBQWtCO0FBQ3pDLE1BQUlBLE9BQVU7QUFHZCxXQUFPQTtBQUNWO0FDckxPLFNBQVNpRCxFQUFpQmpELElBQVVrRCxHQUFvQ0MsR0FBbUI7QUFDL0YsU0FBSUQsRUFBT2xELEVBQUssSUFDTkEsS0FFSCxVQUFVLFNBQVMsSUFBSW1ELElBQU07QUFDdkM7QUFFTyxJQUFNQyxLQUF1RCxDQUNqRXBELE9BRU8sTUFBTSxRQUFRQSxFQUFLO0FBR3RCLFNBQVNxRCxHQUNickQsSUFDQXNELEdBQ29CO0FBQ3BCLFFBQU1DLElBQU9DLEVBQVd4RCxFQUFLLElBQUksV0FBVyxPQUFPQTtBQUVuRCxTQUNHLHdCQUF3QixLQUFLdUQsQ0FBSSxNQUNoQyxDQUFDRCxLQUFRLENBQUNBLEVBQUssU0FBU0MsQ0FBdUM7QUFFdEU7QUFNTyxJQUFNRSxJQUFnRCxDQUFDekQsT0FDcEQsT0FBT0EsTUFBVSxZQUFZd0QsRUFBV3hELEVBQUs7QUFEaEQsSUFJTTBELEtBQWlFLENBQzNFMUQsT0FFT3lELEVBQWF6RCxFQUFLLEtBQUssT0FBTyxTQUFTQSxFQUFLO0FBUC9DLElBVU0yRCxLQUF3RSxDQUNsRjNELE9BRU95RCxFQUFhekQsRUFBSyxLQUFNLE1BQU0sUUFBUUEsRUFBSyxLQUFLQSxHQUFNLE1BQU15RCxDQUFZO0FBSTNFLFNBQVNHLEdBQ2I1RCxJQUNXO0FBQ1gsU0FBTyxDQUFDLENBQUNBLE1BQVN5QixHQUFlekIsRUFBSyxNQUFNO0FBQy9DO0FBRU8sU0FBUzZELEdBQWU3RCxJQUEwRDtBQUN0RixTQUFPLE9BQU9BLE1BQVU7QUFDM0I7QUFFTyxJQUFNTyxLQUErRCxDQUN6RVAsT0FFSUEsTUFBUyxRQUFRLDBCQUEwQixTQUFTLE9BQU9BLEVBQUssSUFDMUQsUUFHSCxPQUFRQSxHQUE4QixVQUFXO0FDdkVwRCxJQUFLOEQsS0FBQUEsa0JBQUFBLFFBQ1RBLEdBQUFBLEdBQUEsVUFBQSxDQUFBLElBQUEsV0FDQUEsR0FBQUEsR0FBQSxRQUFBLENBQUEsSUFBQSxTQUNBQSxHQUFBQSxHQUFBLFlBQVksRUFBQSxJQUFaLGFBQ0FBLEdBQUFBLEdBQUEsVUFBVSxHQUFBLElBQVYsV0FKU0EsS0FBQUEsTUFBQSxDQUFBLENBQUE7QUNGTCxJQUFNQyxLQUFOLE1BQU1BLEdBQXdEO0VBQ2xFLFlBQ21CQyxHQUNBQyxHQUNqQjtBQUZpQixTQUFBLFNBQUFELEdBQ0EsS0FBQSxTQUFBQztFQUNoQjtFQUVILFlBQXNDO0FBQ25DLFdBQU8sSUFBSUYsR0FBaUIsS0FBSyxPQUFPLFNBQVMsTUFBTSxHQUFHLEtBQUssT0FBTyxTQUFTLE1BQU0sQ0FBQztFQUN6RjtBQUNIO0FDWEEsU0FBU0csS0FBb0I7QUFDMUIsUUFBTSxJQUFJLE1BQU0sdUNBQXVDO0FBQzFEO0FBRU8sSUFBTUMsS0FBTixNQUFvQjtFQU14QixZQUNHQyxHQUNBQyxHQUNEO0FBUkYsU0FBVSxVQUFvQixDQUFBLEdBQzlCLEtBQVUsYUFBNkRILElBY3ZFLEtBQUEsUUFBUSxDQUFDdEQsSUFBOENTLE9BQ3BELEtBQUssYUFBQSxHQUVBLEtBQUssUUFBUSxNQUFNLENBQUNpRCxJQUFLcEUsTUFBVSxLQUFLLFNBQVNvRSxJQUFLcEUsR0FBT1UsR0FBS1YsQ0FBSyxDQUFDLENBQUMsSUFJdkUsS0FBSyxXQUFXbUIsR0FBUSxLQUFLLGVBQUEsQ0FBZ0IsTUFBTSxRQUhoRCxRQVZWLEtBQUssVUFBVSxNQUFNLFFBQVErQyxDQUFNLElBQUlBLElBQVMsQ0FBQ0EsQ0FBTSxHQUNuREMsTUFDRCxLQUFLLGFBQWFBO0VBRXhCO0VBWVUsZUFBZTtBQUN0QixTQUFLLFFBQVEsU0FBUztFQUN6QjtFQUVVLGlCQUFpQjtBQUN4QixXQUFPLEtBQUs7RUFDZjtFQUVVLFNBQVNDLEdBQWFwRSxHQUFlVSxJQUFlO0FBQzNELFVBQU0yRCxJQUFVM0QsTUFBUTBELEVBQUksS0FBSzFELEVBQUk7QUFDckMsV0FBSTJELEtBQ0QsS0FBSyxVQUFVckUsR0FBT3FFLENBQU8sR0FHekIsQ0FBQyxDQUFDQTtFQUNaO0VBRVUsVUFBVUMsR0FBZ0JELEdBQW1CO0FBQ3BELFNBQUssUUFBUSxLQUFLLEdBQUdBLEVBQVEsTUFBTSxDQUFDLENBQUM7RUFDeEM7QUFDSDtBQUVPLElBQU1FLEtBQU4sY0FBa0NOLEdBQWM7RUFDMUMsU0FBU0csR0FBYXBFLEdBQWVVLElBQXdCO0FBQ3BFLFdBQU8sYUFBYSxLQUFLLE9BQU9BLEVBQUksQ0FBQyxLQUFLLE1BQU0sU0FBUzBELEdBQUtwRSxHQUFPVSxFQUFJO0VBQzVFO0VBRVUsVUFBVVYsR0FBZXFFLEdBQW1CO0FBQ25ELEtBQUlyRSxJQUFRLEtBQUtxRSxFQUFRLFNBQVMsTUFDL0IsTUFBTSxVQUFVckUsR0FBT3FFLENBQU87RUFFcEM7QUFDSDtBQzVEQSxJQUFNRyxLQUFvRDtFQUN2RCxRQUFRO0VBQ1Isd0JBQXdCO0VBQ3hCLFFBQVEsQ0FBQTtFQUNSLFNBQVM7QUFDWjtBQUVPLFNBQVNDLE1BQ1ZDLElBQ2M7QUFDakIsUUFBTUMsSUFBVSxRQUFRLElBQUEsR0FDbEJ6RixJQUEyQixPQUFPO0lBQ3JDLEVBQUUsU0FBQXlGLEdBQVMsR0FBR0gsR0FBQTtJQUNkLEdBQUdFLEdBQVEsT0FBTyxDQUFDRSxPQUFNLE9BQU9BLE1BQU0sWUFBWUEsRUFBQztFQUFBO0FBR3RELFNBQUExRixFQUFPLFVBQVVBLEVBQU8sV0FBV3lGLEdBQ25DekYsRUFBTyxVQUFVQSxFQUFPLFlBQVksTUFFN0JBO0FBQ1Y7QUNWTyxTQUFTMkYsR0FDYkgsSUFDQUksSUFBcUIsQ0FBQSxHQUNaO0FBQ1QsU0FBS3BCLEdBQTJCZ0IsRUFBTyxJQUloQyxPQUFPLEtBQUtBLEVBQU8sRUFBRSxPQUFPLENBQUNJLEdBQW9CcEMsT0FBZ0I7QUFDckUsVUFBTXFDLElBQVFMLEdBQVFoQyxFQUFHO0FBRXpCLFFBQUlZLEVBQVd5QixDQUFLO0FBQ2pCRCxRQUFTLEtBQUtDLENBQUs7YUFDWDVCLEdBQWlCNEIsR0FBTyxDQUFDLFNBQVMsQ0FBQztBQUMzQ0QsUUFBUyxLQUFLcEMsS0FBTSxNQUFNcUMsQ0FBSzthQUN2QixNQUFNLFFBQVFBLENBQUs7QUFDM0IsaUJBQVdDLE1BQUtEO0FBQ1I1QixXQUFpQjZCLElBQUcsQ0FBQyxVQUFVLFFBQVEsQ0FBQyxLQUMxQ0YsRUFBUyxLQUFLcEMsS0FBTSxNQUFNc0MsRUFBQzs7QUFJakNGLFFBQVMsS0FBS3BDLEVBQUc7QUFHcEIsV0FBT29DO0VBQ1YsR0FBR0EsQ0FBUSxJQXJCREE7QUFzQmI7QUFFTyxTQUFTRyxHQUNiQyxJQUNBQyxJQUFtQixHQUNuQkMsSUFBYSxPQUNKO0FBQ1QsUUFBTUMsS0FBb0IsQ0FBQTtBQUUxQixXQUFTbEQsSUFBSSxHQUFHQyxLQUFNK0MsSUFBbUIsSUFBSUQsR0FBSyxTQUFTQyxHQUFrQmhELElBQUlDLElBQUtEO0FBQy9FLG9CQUFnQixTQUFTLE9BQU8rQyxHQUFLL0MsQ0FBQyxDQUFDLEtBQ3hDa0QsR0FBUSxLQUFLLE9BQU9ILEdBQUsvQyxDQUFDLENBQUMsQ0FBQztBQUlsQyxTQUFBMEMsR0FBa0JTLEdBQXdCSixFQUFJLEdBQUdHLEVBQU8sR0FDbkRELEtBQ0ZDLEdBQVEsS0FBSyxHQUFHRSxHQUFzQkwsRUFBSSxDQUFDLEdBR3ZDRztBQUNWO0FBRUEsU0FBU0UsR0FBc0JMLElBQWtCO0FBQzlDLFFBQU1NLElBQXNCLE9BQU9wRixHQUFLOEUsRUFBSSxLQUFNO0FBQ2xELFNBQU9yRCxHQUFja0IsRUFBVzNDLEdBQUs4RSxJQUFNTSxJQUFzQixJQUFJLENBQUMsR0FBR3RDLElBQWEsQ0FBQSxDQUFFLENBQUM7QUFDNUY7QUFNTyxTQUFTb0MsR0FBd0JKLElBQWtDO0FBQ3ZFLFFBQU1NLElBQXNCN0IsR0FBZXZELEdBQUs4RSxFQUFJLENBQUM7QUFDckQsU0FBT25DLEVBQVczQyxHQUFLOEUsSUFBTU0sSUFBc0IsSUFBSSxDQUFDLEdBQUc5QixFQUFpQjtBQUMvRTtBQU1PLFNBQVMrQixFQUNiUCxJQUNBUSxJQUFjLE1BQ3lCO0FBQ3ZDLFFBQU03RSxJQUFXbkIsR0FBV1UsR0FBSzhFLEVBQUksQ0FBQztBQUN0QyxTQUFPUSxLQUFlOUYsR0FBZWlCLENBQVEsSUFBSUEsSUFBVztBQUMvRDtBQ2pGTyxTQUFTOEUsR0FDYkMsSUFDQUMsR0FDRDtBQUNDLFNBQU9ELEdBQU9DLEVBQVEsUUFBUUEsRUFBUSxNQUFNO0FBQy9DO0FBRU8sU0FBU0MsR0FDYkMsSUFDQUMsR0FDQUMsR0FDQUMsS0FBTyxNQUNMO0FBQ0YsU0FBQTFFLEVBQVF5RSxDQUFLLEVBQUUsUUFBUSxDQUFDRSxNQUFTO0FBQzlCLGFBQVNDLEtBQVE5RixHQUFtQjZGLEdBQU1ELEVBQUksR0FBRyxJQUFJLEdBQUc5RCxJQUFNZ0UsR0FBTSxRQUFRLElBQUloRSxHQUFLLEtBQUs7QUFDdkYsWUFBTTFCLEtBQU8sQ0FBQ1IsS0FBUyxNQUFNO0FBQzFCLFlBQUksRUFBQSxJQUFJQSxNQUFVa0M7QUFHbEIsaUJBQU9nRSxHQUFNLElBQUlsRyxFQUFNO01BQzFCO0FBRUE4RixRQUFRLEtBQUssQ0FBQyxFQUFFLE9BQUFLLEdBQUEsTUFBWUEsR0FBTTNGLElBQU1xRixFQUFNLENBQUM7SUFDbEQ7RUFDSCxDQUFDLEdBRU1BO0FBQ1Y7QUN2QkEsSUFBTU8sS0FBMEMsQ0FBQyxFQUFFLFVBQUFDLEdBQUFBLEdBQVlDLEdBQU9DLEdBQU1DLE9BQVM7QUFDbEYsTUFBSUgsT0FBYUksR0FBVSxXQUFXQyxHQUFpQkosQ0FBSztBQUN6RCxXQUFPQyxFQUFLLE9BQU8sS0FBSyxPQUFPLENBQUM7QUFHbkNDLEVBQUFBLEdBQUtGLENBQUs7QUFDYjtBQU5BLElBUU1LLEtBQXdDLENBQUNDLE9BQ3JDQSxHQUFLLEtBQUEsTUFBVztBQUduQixTQUFTQyxHQUFnQkMsSUFBc0Q7QUFDbkYsVUFBUUEsSUFBQTtJQUNMLEtBQUs7QUFDRixhQUFPQyxHQUFBO0lBQ1YsS0FBSztBQUNGLGFBQU9DLEdBQUE7RUFBb0I7QUFLakMsU0FBTztJQUNKLFVBSGMsQ0FBQyxhQUFhLHVCQUF1QjtJQUluRCxRQUFRO0lBQ1IsU0FBQVo7SUFBQSxRQUNBTztFQUFBO0FBRU47QUFFTyxTQUFTSyxLQUEyQztBQUd4RCxTQUFPO0lBQ0osVUFIYyxDQUFDLGFBQWEsV0FBVztJQUl2QyxRQUFRO0lBQ1IsU0FBQVo7SUFDQSxPQUFPYSxHQUFNO0FBQ1YsYUFBTyxhQUFhLEtBQUtBLEVBQUssS0FBQSxDQUFNO0lBQ3ZDO0VBQUE7QUFFTjtBQUVPLFNBQVNGLEtBQTJDO0FBR3hELFNBQU87SUFDSixVQUhjLENBQUMsYUFBYSxzQkFBc0I7SUFJbEQsUUFBUTtJQUNSLFNBQUFYO0lBQUEsUUFDQU87RUFBQTtBQUVOO0FBRUEsU0FBU0QsR0FBaUJKLElBQXVCO0FBQzlDLFNBQU8sOENBQThDLEtBQUssT0FBT0EsRUFBSyxDQUFDO0FBQzFFO0FDOURPLElBQU1ZLEtBQU4sTUFBNEM7RUFNaEQsWUFBWUMsR0FBaUI7QUFDMUIsU0FBSyxRQUFRLENBQUEsR0FDYixLQUFLLFFBQVEsQ0FBQSxHQUNiLEtBQUssVUFBVSxDQUFBLEdBQ2YsS0FBSyxTQUFTQTtFQUNqQjtBQUNIO0FBRUEsSUFBTUMsS0FBZ0I7QUFBdEIsSUFDTUMsS0FBc0I7QUFENUIsSUFFTUMsS0FBaUI7QUFFaEIsU0FBU0MsR0FBbUJKLElBQWlCUCxHQUE0QjtBQUM3RSxRQUFNWSxJQUFVLElBQUlOLEdBQWNDLEVBQU0sR0FDbENNLEtBQVNOLEtBQVNFLEtBQXNCRDtBQUU5QyxTQUFBTSxHQUFtQmQsQ0FBSSxFQUFFLFFBQVEsQ0FBQ2UsTUFBUztBQUN4QyxVQUFNQyxLQUFVRCxFQUFLLFFBQVFGLElBQVEsRUFBRTtBQUV2Q0QsTUFBUSxNQUFNLEtBQUtJLEVBQU8sSUFDekJOLEdBQWUsS0FBS00sRUFBTyxJQUFJSixFQUFRLFVBQVVBLEVBQVEsT0FBTyxLQUFLSSxFQUFPO0VBQ2hGLENBQUMsR0FFTUo7QUFDVjtBQzlCTyxJQUFNSyxLQUFxQixDQUFBO0FBUzNCLFNBQVNDLEdBQWNuQixJQUFvQztBQUMvRCxTQUFPO0lBQ0osVUFBVWtCO0lBQ1YsUUFBUTtJQUNSLFFBQUFsQjtFQUFBO0FBRU47QUFFTyxTQUFTb0IsR0FBdUJ6QixJQUFrQztBQUN0RSxTQUFPO0lBQ0osVUFBVXVCO0lBQ1YsUUFBUTtJQUNSLFNBQVM7QUFDTixZQUFNLE9BQU92QixNQUFVLFdBQVcsSUFBSTBCLEdBQXVCMUIsRUFBSyxJQUFJQTtJQUN6RTtFQUFBO0FBRU47QUFFTyxTQUFTMkIsRUFBMEJDLElBQW9CQyxJQUFVLE9BQTJCO0FBQ2hHLFNBQU87SUFDSixVQUFBRDtJQUNBLFFBQVE7SUFDUixPQUFPdEIsR0FBTTtBQUNWLGFBQU91QixJQUFVLE9BQU92QixDQUFJLEVBQUUsS0FBQSxJQUFTQTtJQUMxQztFQUFBO0FBRU47QUFFTyxTQUFTd0IsR0FBMEJGLElBQXdDO0FBQy9FLFNBQU87SUFDSixVQUFBQTtJQUNBLFFBQVE7SUFDUixPQUFPRyxHQUFRO0FBQ1osYUFBT0E7SUFDVjtFQUFBO0FBRU47QUFFTyxTQUFTQyxHQUFnQkMsSUFBK0M7QUFDNUUsU0FBT0EsR0FBSyxXQUFXO0FBQzFCO0FBRU8sU0FBU0MsR0FBZUQsSUFBMkM7QUFDdkUsU0FBT0EsR0FBSyxXQUFXLFdBQVcsQ0FBQ0EsR0FBSyxTQUFTO0FBQ3BEO0FDbERPLElBQU1FLEtBQWdDO0FBQXRDLElBQ01DLEtBQTZCO0FBRG5DLElBRU1DLEtBQThCO0FBS3BDLElBQUtDLEtBQUFBLGtCQUFBQSxRQUNUQSxHQUFBLFVBQVUsS0FDVkEsR0FBQSxRQUFRLEtBQ1JBLEdBQUEsbUJBQW1CLEtBQ25CQSxHQUFBLGVBQWUsS0FDZkEsR0FBQSxZQUFZLEtBQ1pBLEdBQUEsUUFBUSxLQUNSQSxHQUFBLFlBQVksS0FQSEEsS0FBQUEsTUFBQSxDQUFBLENBQUE7QUFnQlosSUFBTUMsS0FBQUEsb0JBQXFDLElBQUk7RUFDNUM7RUFDQSxHQUFHQyxHQUFjLE9BQU8sT0FBT0YsRUFBbUIsQ0FBQztBQUN0RCxDQUFDO0FBRU0sU0FBU0csR0FBcUJDLElBQTBCQyxHQUFzQjtBQUNsRixRQUFNLEVBQUUsV0FBQUMsR0FBVyxTQUFBQyxJQUFTLE9BQUFDLEVBQUEsSUFBVUMsR0FBZ0JMLEVBQUk7QUFFMUQsU0FBS0UsSUFJQUUsRUFBTSxXQUlYRCxHQUFRLEtBQUssR0FBR0YsQ0FBVSxHQUV0QkUsR0FBUSxLQUFLRyxFQUFpQixJQUN4QnZCLEdBQXVCVSxFQUE2QixJQUd2RGMsR0FBVUwsR0FBV0MsRUFBTyxLQVR6QnBCLEdBQXVCWSxLQUE4QixLQUFLLFVBQVVLLEVBQUksQ0FBQyxJQUp6RWpCLEdBQXVCVyxFQUEwQjtBQWM5RDtBQUVPLFNBQVNhLEdBQVVQLElBQWlCQyxHQUFnRDtBQUd4RixTQUFPO0lBQ0osVUFId0IsQ0FBQyxTQUFTLElBQUlELEVBQUksSUFBSSxHQUFHQyxDQUFVO0lBSTNELFFBQVE7SUFDUixPQUFPckMsSUFBNEI7QUFDaEMsYUFBT1csR0FBbUJ5QixPQUFTLEtBQXNCcEMsRUFBSTtJQUNoRTtFQUFBO0FBRU47QUFFTyxTQUFTNEMsR0FBb0JDLElBQTBDO0FBQzNFLFNBQU8sTUFBTSxRQUFRQSxFQUFLLEtBQUtBLEdBQU0sTUFBTSxDQUFDQyxNQUFTYixHQUFrQixJQUFJYSxDQUFJLENBQUM7QUFDbkY7QUFFQSxTQUFTTCxHQUFnQkksSUFBZTtBQUNyQyxNQUFJUCxHQUNBQyxJQUFvQixDQUFBLEdBQ3BCQyxLQUFRLEVBQUUsV0FBVyxPQUFPLFNBQVMsS0FBQTtBQUV6QyxTQUFBSyxHQUNJLFFBQVEsWUFBWSxFQUFFLEVBQ3RCLE1BQU0sRUFBRSxFQUNSLFFBQVEsQ0FBQ0UsTUFBUztBQUNaQyxPQUFZRCxDQUFJLEtBQ2pCVCxJQUFZUyxHQUNaUCxHQUFNLFlBQVksUUFFbEJBLEdBQU0sVUFBVUEsR0FBTSxXQUFXUyxHQUFlVixFQUFRQSxFQUFRLE1BQU0sSUFBSSxJQUFJUSxDQUFJLEVBQUc7RUFFM0YsQ0FBQyxHQUVHO0lBQ0osV0FBQVQ7SUFDQSxTQUFBQztJQUNBLE9BQUFDO0VBQUE7QUFFTjtBQUVBLFNBQVNRLEdBQVlWLElBQTRDO0FBQzlELFNBQU9BLE9BQWMsT0FBc0JBLE9BQWM7QUFDNUQ7QUFFQSxTQUFTVyxHQUFjQyxJQUF5QjtBQUM3QyxTQUFPLFlBQVksS0FBS0EsRUFBTSxLQUFLakIsR0FBa0IsSUFBSWlCLEdBQU8sT0FBTyxDQUFDLENBQUM7QUFDNUU7QUFFQSxTQUFTUixHQUFrQlEsSUFBeUI7QUFDakQsU0FBSSxVQUFVLEtBQUtBLEVBQU0sSUFDZkEsR0FBTyxRQUFRLEdBQUcsSUFBSSxJQUd6QkEsT0FBVztBQUNyQjtBQ3pHTyxJQUFNQyxLQUFOLE1BQThDO0VBQTlDLGNBQUE7QUFDSixTQUFPLFFBQWtCLENBQUEsR0FDekIsS0FBTyxTQUErQyx1QkFBTyxPQUFPLElBQUk7RUFBQTtFQUl4RSxJQUFXLE1BQW9CO0FBQzVCLFdBQUssS0FBSyxTQUNQLEtBQUssT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDQyxHQUFtQkMsTUFDeEMsT0FBTyxPQUFPRCxHQUFLLEtBQUssT0FBT0MsQ0FBSSxDQUFDLEdBQzNDLENBQUEsQ0FBRSxJQUdELEtBQUs7RUFDZjtFQUVPLFFBQVFBLEdBQTRCO0FBQ3hDLFFBQUksRUFBRUEsS0FBUSxLQUFLLFNBQVM7QUFDekIsWUFBTUMsSUFBU0MsR0FBSyxLQUFLLEtBQUs7QUFDOUIsV0FBSyxPQUFPRixDQUFJLElBQUlDLElBQVMsT0FBTyxPQUFPLEtBQUssT0FBT0EsQ0FBTSxDQUFDLElBQUksQ0FBQSxHQUVsRSxLQUFLLE1BQU0sS0FBS0QsQ0FBSTtJQUN2QjtBQUVBLFdBQU8sS0FBSyxPQUFPQSxDQUFJO0VBQzFCO0VBRU8sU0FBU0EsR0FBY0csR0FBYUMsSUFBZTtBQUN2RCxVQUFNQyxJQUFTLEtBQUssUUFBUUwsQ0FBSTtBQUUzQixXQUFPLE9BQU9LLEdBQVFGLENBQUcsSUFFbkIsTUFBTSxRQUFRRSxFQUFPRixDQUFHLENBQUMsSUFDaENFLEVBQU9GLENBQUcsRUFBZSxLQUFLQyxFQUFLLElBRXBDQyxFQUFPRixDQUFHLElBQUksQ0FBQ0UsRUFBT0YsQ0FBRyxHQUFhQyxFQUFLLElBSjNDQyxFQUFPRixDQUFHLElBQUlDLElBT2pCLEtBQUssT0FBTztFQUNmO0FBQ0g7QUFFTyxTQUFTRSxHQUFpQjNELElBQTBCO0FBQ3hELFFBQU00RCxJQUFTLElBQUlULEdBQUE7QUFFbkIsYUFBV1UsS0FBUUMsR0FBYTlELEVBQUk7QUFDakM0RCxNQUFPLFNBQVNDLEVBQUssTUFBTSxPQUFPQSxFQUFLLEdBQUcsR0FBR0EsRUFBSyxLQUFLO0FBRzFELFNBQU9EO0FBQ1Y7QUFFTyxTQUFTRyxHQUFnQi9ELElBQWN3RCxHQUE4QjtBQUN6RSxNQUFJQyxJQUF1QjtBQUMzQixRQUFNQyxLQUFtQixDQUFBLEdBQ25CTSxJQUFBQSxvQkFBb0MsSUFBQTtBQUUxQyxhQUFXSCxNQUFRQyxHQUFhOUQsSUFBTXdELENBQUc7QUFDbENLLElBQUFBLEdBQUssUUFBUUwsTUFJakJFLEdBQU8sS0FBTUQsSUFBUUksR0FBSyxLQUFNLEdBRTNCRyxFQUFPLElBQUlILEdBQUssSUFBSSxLQUN0QkcsRUFBTyxJQUFJSCxHQUFLLE1BQU0sQ0FBQSxDQUFFLEdBRzNCRyxFQUFPLElBQUlILEdBQUssSUFBSSxFQUFHLEtBQUtKLENBQUs7QUFHcEMsU0FBTztJQUNKLEtBQUFEO0lBQ0EsT0FBTyxNQUFNLEtBQUtRLEVBQU8sS0FBQSxDQUFNO0lBQy9CLFFBQUFBO0lBQ0EsT0FBQVA7SUFDQSxRQUFBQztFQUFBO0FBRU47QUFFQSxTQUFTTyxHQUFlQyxJQUEwQjtBQUMvQyxTQUFPQSxHQUFTLFFBQVEsWUFBWSxFQUFFO0FBQ3pDO0FBRUEsVUFBVUosR0FBYTlELElBQWNtRSxJQUE4QixNQUFNO0FBQ3RFLFFBQU1DLElBQVFwRSxHQUFLLE1BQU0sSUFBSTtBQUU3QixXQUFTcUUsS0FBSSxHQUFHQyxJQUFNRixFQUFNLFNBQVMsR0FBR0MsS0FBSUMsS0FBTztBQUNoRCxVQUFNakIsS0FBT1ksR0FBZUcsRUFBTUMsSUFBRyxDQUFDO0FBRXRDLFFBQUlaLElBQVFXLEVBQU1DLElBQUcsR0FDakJiLElBQU1XO0FBRVYsUUFBSVYsRUFBTSxTQUFTO0NBQUksR0FBRztBQUN2QixZQUFNMUMsS0FBT3dELEdBQVFkLEdBQU87Q0FBSTtBQUNoQ0QsVUFBTXpDLEdBQUssQ0FBQyxHQUNaMEMsSUFBUTFDLEdBQUssQ0FBQztJQUNqQjtBQUVBLFVBQU0sRUFBRSxNQUFBc0MsSUFBTSxLQUFBRyxHQUFLLE9BQUFDLEVBQUE7RUFDdEI7QUFDSDtBQ2xHTyxJQUFLZSxLQUFBQSxrQkFBQUEsUUFDVEEsR0FBQSxTQUFTLFVBQ1RBLEdBQUEsU0FBUyxVQUNUQSxHQUFBLFFBQVEsU0FDUkEsR0FBQSxXQUFXLFlBSkZBLEtBQUFBLE1BQUEsQ0FBQSxDQUFBO0FBT1osU0FBU0MsR0FDTkMsSUFDQUMsR0FDbUI7QUFDbkIsU0FBSSxPQUFPRCxNQUFVLFlBQVksT0FBTyxPQUFPRixJQUFnQkUsRUFBSyxJQUMxREEsS0FFSEM7QUFDVjtBQUVBLFNBQVNDLEdBQ05wQixJQUNBQyxHQUNBb0IsR0FDQUgsSUFDbUI7QUFDbkIsUUFBTXBELElBQXFCLENBQUMsVUFBVSxLQUFLb0QsRUFBSyxFQUFFO0FBRWxELFNBQUlHLEtBQ0R2RCxFQUFTLEtBQUssT0FBTyxHQUd4QkEsRUFBUyxLQUFLa0MsSUFBS0MsQ0FBSyxHQUVqQjtJQUNKLFVBQUFuQztJQUNBLFFBQVE7SUFDUixPQUFPdEIsSUFBc0I7QUFDMUIsYUFBT0E7SUFDVjtFQUFBO0FBRU47QUFFQSxTQUFTOEUsR0FBY3RCLElBQWFrQixHQUFxRDtBQUN0RixRQUFNcEQsSUFBcUIsQ0FBQyxVQUFVLFVBQVUsaUJBQWlCLGFBQWFrQyxFQUFHO0FBRWpGLFNBQUlrQixLQUNEcEQsRUFBUyxPQUFPLEdBQUcsR0FBRyxLQUFLb0QsQ0FBSyxFQUFFLEdBRzlCO0lBQ0osVUFBQXBEO0lBQ0EsUUFBUTtJQUNSLE9BQU90QixJQUFNO0FBQ1YsYUFBTytELEdBQWdCL0QsSUFBTXdELEVBQUc7SUFDbkM7RUFBQTtBQUVOO0FBRUEsU0FBU3VCLEdBQWVMLElBQXVEO0FBQzVFLFFBQU1wRCxJQUFXLENBQUMsVUFBVSxVQUFVLGlCQUFpQixRQUFRO0FBRS9ELFNBQUlvRCxNQUNEcEQsRUFBUyxLQUFLLEtBQUtvRCxFQUFLLEVBQUUsR0FHdEI7SUFDSixVQUFBcEQ7SUFDQSxRQUFRO0lBQ1IsT0FBT3RCLEdBQWM7QUFDbEIsYUFBTzJELEdBQWlCM0QsQ0FBSTtJQUMvQjtFQUFBO0FBRU47QUFFQSxTQUFBNEQsS0FBc0Y7QUFDbkYsU0FBTztJQUNKLFVBQThCSixJQUFhQyxNQUFrQnVCLEdBQWlCO0FBQzNFLGFBQU8sS0FBSztRQUNUSjtVQUNHcEI7VUFDQUM7VUFDQXVCLEVBQUssQ0FBQyxNQUFNO1VBQ1pQO1lBQWNPLEVBQUssQ0FBQztZQUFHOztVQUFBO1FBQW9CO1FBRTlDQyxFQUF5QixTQUFTO01BQUE7SUFFeEM7SUFFQSxVQUE4QnpCLElBQWFrQixHQUF3QjtBQUNoRSxhQUFPLEtBQUs7UUFDVEksR0FBY3RCLElBQUtpQixHQUFjQyxHQUFPLE1BQVMsQ0FBQztRQUNsRE8sRUFBeUIsU0FBUztNQUFBO0lBRXhDO0lBRUEsY0FBa0NELElBQWlCO0FBQ2hELGFBQU8sS0FBSztRQUNURCxHQUFlTixHQUFjTyxHQUFLLENBQUMsR0FBRyxNQUFTLENBQUM7UUFDaERDLEVBQXlCLFNBQVM7TUFBQTtJQUV4QztFQUFBO0FBRU47QUMxR08sSUFBS0MsS0FBQUEsa0JBQUFBLFFBQ1RBLEdBQUEsUUFBUSxLQUNSQSxHQUFBLFNBQVMsS0FDVEEsR0FBQSxVQUFVLEtBQ1ZBLEdBQUEsV0FBVyxLQUNYQSxHQUFBLFVBQVUsS0FDVkEsR0FBQSxVQUFVLEtBQ1ZBLEdBQUEsV0FBVyxLQUNYQSxHQUFBLFVBQVUsS0FDVkEsR0FBQSxTQUFTLEtBVEFBLEtBQUFBLE1BQUEsQ0FBQSxDQUFBO0FBWVosSUFBTUMsS0FBaUIsSUFBSSxJQUFJLE9BQU8sT0FBT0QsRUFBYyxDQUFDO0FBRXJELFNBQVNFLEdBQWlCdkMsSUFBd0M7QUFDdEUsU0FBT3NDLEdBQWUsSUFBSXRDLEVBQXVCO0FBQ3BEO0FDaEJBLElBQUF3QztBQVlBLElBQU1DLEtBQW9CLENBQUMsSUFBSTtBQUEvQixJQUVNQyxLQUFBQSx1QkFBZSxXQUFXO0FBVWhDLElBQU1DLEtBQU4sTUFBd0M7RUFBeEMsY0FBQTtBQUNHLFNBQVNILEVBQUFBLElBQW1CLENBQUE7RUFBQztFQUU3QixHQUZTQSxLQUFBRSxJQUVQLE9BQU8sU0FBQSxJQUFZO0FBQ2xCLGVBQVdFLEtBQVMsS0FBS0YsRUFBSztBQUMzQixZQUFNRTtFQUVaO0VBRUEsT0FBT0MsR0FBZTtBQUNuQixXQUFBQSxFQUFJLFVBQVUsS0FBS0gsRUFBSyxFQUFFLEtBQUssU0FBUyxLQUFLLEdBQUdJLEVBQWNELEdBQUssSUFBSSxHQUFHLEdBQUcsR0FDdEU7RUFDVjtFQUVBLFNBQVNFLEdBQWlCO0FBQ3ZCLFdBQUEsS0FBS0wsRUFBSyxFQUFFLEtBQUssR0FBR0ksRUFBY0MsR0FBTyxJQUFJLENBQUMsR0FDdkM7RUFDVjtBQUNIO0FBS08sU0FBU0MsTUFBb0JDLElBQWdDO0FBQ2pFLFNBQU8sSUFBSU4sR0FBQSxFQUFZLE1BQU0sR0FBR00sRUFBTTtBQUN6QztBQUVBLFNBQVNDLEdBQVVDLElBQTBCO0FBQzFDLFFBQU1DLElBQUFBLG9CQUFpQyxJQUFBLEdBQ2pDQyxJQUFpQyxDQUFBO0FBRXZDLFNBQUFDLEdBQXVCSCxJQUFNLENBQUNuRCxPQUFVO0FBQ3JDLFVBQU0sQ0FBQ3hDLEdBQU1VLElBQU1xRixDQUFPLElBQUl2RCxHQUFNLE1BQU13RCxFQUFJO0FBQzlDSixNQUFNLElBQUk1RixDQUFJLElBQ2I2RixFQUFRN0YsQ0FBSSxJQUFJNkYsRUFBUTdGLENBQUksS0FBSyxDQUFBLEdBQUksS0FBSztNQUN4QyxNQUFNaUcsRUFBU3ZGLEVBQUk7TUFDbkIsTUFBQVY7TUFDQSxTQUFBK0Y7SUFBQSxDQUNGO0VBQ0osQ0FBQyxHQUVNO0lBQ0osT0FBQUg7SUFDQSxTQUFBQztFQUFBO0FBRU47QUFFQSxTQUFBRixLQUFvRDtBQUNqRCxTQUFPO0lBQ0osS0FBeUJPLElBQW1DO0FBQ3pELFlBQU1DLElBQU92QixFQUF5QixTQUFTLEdBQ3pDMUMsSUFBVWtFLEdBQW1CLFNBQVM7QUFFNUMsaUJBQVd2RCxLQUFVb0M7QUFDbEIsWUFBSS9DLEVBQVEsU0FBU1csQ0FBTTtBQUN4QixpQkFBTyxLQUFLO1lBQ1QvQixHQUF1QixxQkFBcUIrQixDQUFNLHFCQUFxQjtZQUN2RXNEO1VBQUE7QUFLTCxhQUFPRCxNQUFlLGFBQ3ZCQSxLQUFhVixHQUFBLEVBQW1CLE1BQU1VLEVBQVU7QUFHbkQsWUFBTWpGLEtBQVcsQ0FBQyxRQUFRLFVBQVUsTUFBTSxlQUFlLEdBQUdpQixHQUFTLEdBQUdnRSxFQUFVO0FBRWxGLGFBQU8sS0FBSztRQUNUO1VBQ0csVUFBQWpGO1VBQ0EsUUFBUTtVQUNSLE9BQU9vRixHQUFRO0FBQ1osbUJBQU9YLEdBQVVXLENBQU07VUFDMUI7UUFBQTtRQUVIRjtNQUFBO0lBRU47RUFBQTtBQUVOO0FDcEdPLElBQUtHLEtBQUFBLGtCQUFBQSxRQUNUQSxHQUFBLFFBQVEsU0FDUkEsR0FBQSxPQUFPLFFBQ1BBLEdBQUEsT0FBTyxRQUNQQSxHQUFBLFFBQVEsU0FDUkEsR0FBQSxPQUFPLFFBTEVBLEtBQUFBLE1BQUEsQ0FBQSxDQUFBO0FBUVosSUFBTUMsS0FBa0IxRSxHQUFjLE9BQU8sT0FBT3lFLEVBQVMsQ0FBQztBQU12RCxTQUFTRSxHQUFVekUsSUFBd0JDLEdBQXNCO0FBQ3JFLFFBQU1mLElBQXFCLENBQUMsT0FBTztBQUNuQyxTQUFJd0YsR0FBaUIxRSxFQUFJLEtBQ3RCZCxFQUFTLEtBQUssS0FBS2MsRUFBSSxFQUFFLEdBRTVCZCxFQUFTLEtBQUssR0FBR2UsQ0FBVSxHQUVwQmhCLEVBQTBCQyxDQUFRO0FBQzVDO0FBRU8sU0FBU3lGLEdBQWEzRSxJQUE2QztBQUN2RSxNQUFJMEUsR0FBaUIxRSxFQUFJO0FBQ3RCLFdBQU9BO0FBR1YsVUFBUSxPQUFPQSxJQUFBO0lBQ1osS0FBSztJQUNMLEtBQUs7QUFDRixhQUFPO0VBQUE7QUFJaEI7QUFFQSxTQUFTMEUsR0FBaUIxRSxJQUE4QztBQUNyRSxTQUFPLE9BQU9BLE1BQVMsWUFBWXdFLEdBQWdCLFNBQVN4RSxFQUFJO0FBQ25FO0FDL0JBNEUsYUFBQUEsUUFBTSxXQUFXLElBQUksQ0FBQ3ZELE9BQWUsT0FBT3dELEdBQWdCeEQsRUFBSyxJQUFJQSxHQUFNLFNBQVMsR0FBRztBQUN2RnVELGFBQUFBLFFBQU0sV0FBVyxJQUFJLENBQUN2RCxPQUNmLE9BQU8sU0FBU0EsRUFBSyxJQUNmQSxHQUFNLFNBQVMsTUFBTSxJQUV4QnlELEdBQWV6RCxFQUFLO0FBSzlCLFNBQVMwRCxLQUFZO0FBQ2xCLGFBQU9ILGFBQUFBLFNBQU0sWUFBWTtBQUM1QjtBQVVBLFNBQVNJLEdBQ05DLElBQ0FDLEdBQ0FDLEdBQ3FCO0FBQ3JCLFNBQUksQ0FBQ0QsS0FBVSxDQUFDLE9BQU9BLENBQU0sRUFBRSxRQUFRLE9BQU8sRUFBRSxJQUNyQ0MsSUFFSCxDQUFDQyxPQUFZQyxNQUFTO0FBQ25CSixJQUFBQSxHQUFHRyxJQUFTLEdBQUdDLENBQUksR0FDbkJGLEVBQVFDLElBQVMsR0FBR0MsQ0FBSTtFQUMzQixJQUpBSixLQU9ELENBQUNHLE9BQVlDLE1BQVM7QUFDMUJKLElBQUFBLEdBQUcsTUFBTUcsRUFBTyxJQUFJRixHQUFRLEdBQUdHLENBQUksR0FDL0JGLEtBQ0RBLEVBQVFDLElBQVMsR0FBR0MsQ0FBSTtFQUU5QjtBQUNIO0FBRUEsU0FBU0MsR0FDTkMsSUFDQUMsR0FDQSxFQUFFLFdBQVdDLEVBQUFBLEdBQ047QUFDUCxNQUFJLE9BQU9GLE1BQVM7QUFDakIsV0FBT0E7QUFFVixRQUFNRyxLQUFrQkYsS0FBaUJBLEVBQWMsYUFBYztBQUVyRSxTQUFJRSxHQUFlLFdBQVdELENBQWUsSUFDbkNDLEdBQWUsT0FBT0QsRUFBZ0IsU0FBUyxDQUFDLElBR25EQyxNQUFrQkQ7QUFDNUI7QUFFTyxTQUFTRSxHQUNiQyxJQUNBQyxHQUNBQyxHQUNBQyxLQUFlaEIsR0FBQUEsR0FDRjtBQUNiLFFBQU1pQixJQUFlSixNQUFTLElBQUlBLEVBQUssT0FBUSxJQUV6Q0ssS0FBMEIsQ0FBQSxHQUMxQkMsSUFDSCxPQUFPTCxLQUFZLFdBQVdFLEdBQWEsT0FBT0YsQ0FBTyxJQUFJQSxHQUMxRHpFLElBQU1rRSxHQUFnQmEsRUFBV04sR0FBU08sQ0FBWSxHQUFHRixHQUFlSCxFQUFZO0FBRTFGLFNBQU9NLEdBQUtQLENBQVc7QUFFdkIsV0FBU1EsR0FBUWYsSUFBY2dCLElBQWtCO0FBQzlDLFdBQU85RDtNQUNKd0Q7TUFDQU4sR0FBYUMsSUFBT3hFLEVBQUksUUFBUSxVQUFVbUUsRUFBSSxHQUFHZ0IsSUFBU1IsRUFBWTtJQUFBO0VBRTVFO0FBRUEsV0FBU00sR0FBS0csSUFBZ0I7QUFDM0IsVUFBTUMsS0FBY0QsTUFBUyxJQUFJQSxFQUFLLE9BQVEsSUFDeEM1QixLQUFTc0IsS0FBaUJsQixHQUFla0IsR0FBZU8sRUFBVSxLQUFNQyxJQUN4RUMsS0FBTzNCLEdBQWVlLElBQWMsR0FBR0MsQ0FBVyxJQUFJUyxFQUFVLElBQUk3QixFQUFLO0FBRS9FLFdBQU8sT0FBTyxPQUFPc0IsSUFBZ0J0QixLQUFRK0IsSUFBTTtNQUNoRCxPQUFBZjtNQUNBLFNBQUFVO01BQ0EsTUFBQUs7TUFDQSxNQUFBTjtJQUFBLENBQ0Y7RUFDSjtBQUNIO0FDaEdPLElBQU1PLEtBQU4sTUFBTUEsR0FBa0I7RUFHNUIsWUFBb0JDLElBQVcsZUFBZTtBQUExQixTQUFBLFdBQUFBLEdBRnBCLEtBQVEsU0FBQSxvQkFBb0QsSUFBQTtFQUViO0VBRXZDLGFBQWF0SCxHQUF3QjtBQUMxQyxXQUFPLEtBQUssT0FBTyxJQUFJQSxDQUFJO0VBQzlCO0VBRVEsZUFBZUEsR0FBd0M7QUFDNUQsVUFBTWdHLElBQU9xQixHQUFrQixRQUFRckgsRUFBSyxTQUFTLENBQUMsQ0FBQyxHQUNqRHVILEtBQVNuQixHQUFhLEtBQUssVUFBVUosQ0FBSTtBQUUvQyxXQUFPO01BQ0osTUFBQWhHO01BQ0EsUUFBQXVIO01BQ0EsTUFBQXZCO0lBQUE7RUFFTjtFQUVBLEtBQUtoRyxHQUF3QztBQUMxQyxVQUFNd0gsSUFBVyxLQUFLLGVBQWV4SCxDQUFJO0FBQ3pDLFdBQUF3SCxFQUFTLE9BQU8sMkNBQTJDeEgsRUFBSyxRQUFRLEdBRXhFLEtBQUssT0FBTyxJQUFJQSxHQUFNd0gsQ0FBUSxHQUV2QkE7RUFDVjtFQUVBLE1BQU1DLEdBQWU7QUFDbEIsZUFBVyxDQUFDekgsR0FBTSxFQUFFLFFBQUF1SCxHQUFBQSxDQUFRLEtBQUssTUFBTSxLQUFLLEtBQUssT0FBTyxRQUFBLENBQVM7QUFDMUR2SCxZQUFTeUgsRUFBSSxRQUNkRixHQUFPLEtBQUssYUFBYUUsQ0FBRyxHQUM1QkY7UUFDRztNQUFBLEtBR0hBLEdBQU87UUFDSjtRQUNBRSxFQUFJO01BQUEsR0FJVixLQUFLLFNBQVN6SCxDQUFJO0FBR3JCLFFBQUksS0FBSyxPQUFPLFNBQVM7QUFDdEIsWUFBTSxJQUFJLE1BQU0sMENBQTBDLEtBQUssT0FBTyxJQUFJLEVBQUU7RUFFbEY7RUFFQSxTQUFTQSxHQUF3QjtBQUNiLFNBQUssYUFBYUEsQ0FBSSxLQUVwQyxLQUFLLE9BQU8sT0FBT0EsQ0FBSTtFQUU3QjtFQUVBLFFBQVFBLEdBQXdDO0FBQzdDLFVBQU13SCxJQUFXLEtBQUssYUFBYXhILENBQUk7QUFDdkMsUUFBSSxDQUFDd0g7QUFDRixZQUFNLElBQUlFLEdBQVMsUUFBVyx1REFBdUQ7QUFFeEYsV0FBQUYsRUFBUyxPQUFPLGVBQWUsR0FFeEJBO0VBQ1Y7RUFFQSxPQUFPLFFBQVF4QixJQUFPLFNBQVM7QUFDNUIsV0FBTyxRQUFRQSxDQUFJLElBQUksRUFBRXFCLEdBQWtCLE9BQU87RUFDckQ7QUFHSDtBQURHQSxHQUFlLFVBQVU7QUF4RXJCLElBQU1NLEtBQU5OO0FDTUEsSUFBTU8sS0FBTixNQUFvRDtFQXFCeEQsWUFDV0MsR0FDQUMsR0FDQUMsSUFDVDtBQUhTLFNBQUEsWUFBQUYsR0FDQSxLQUFBLGFBQUFDLEdBQ0EsS0FBQSxXQUFBQyxJQXZCWCxLQUFRLFNBQXVCLFFBQVEsUUFBQSxHQUN2QyxLQUFRLFNBQVMsSUFBSUosR0FBQTtFQXVCbEI7RUFwQkgsSUFBVyxNQUFNO0FBQ2QsV0FBTyxLQUFLLFFBQVEsS0FBSyxVQUFVO0VBQ3RDO0VBRUEsSUFBVyxJQUFJSyxHQUFhO0FBQ3pCLFNBQUssT0FBT0E7RUFDZjtFQUVBLElBQVcsTUFBTTtBQUNkLFdBQU8sS0FBSyxVQUFVO0VBQ3pCO0VBRUEsSUFBVyxnQkFBZ0I7QUFDeEIsV0FBTyxLQUFLLFVBQVU7RUFDekI7RUFRTyxRQUFRO0FBQ1osV0FBTztFQUNWO0VBRU8sS0FBUWhJLEdBQW9DO0FBQ2hELFdBQUEsS0FBSyxPQUFPLEtBQUtBLENBQUksR0FFYixLQUFLLFNBQVMsS0FBSyxPQUFPLEtBQUssTUFBTSxLQUFLLFlBQVlBLENBQUksQ0FBQztFQUN0RTtFQUVBLE1BQWMsWUFBZUEsR0FBMkM7QUFDckUsVUFBTWlJLElBQXFCLE1BQU0sS0FBSyxXQUFXLEtBQUEsR0FDM0NDLEtBQWtCLE1BQU0sS0FBSyxPQUFPLFNBQVNsSSxDQUFJO0FBRXZELFFBQUk7QUFDRCxZQUFNLEVBQUUsUUFBQXVILEVBQUEsSUFBVyxLQUFLLE9BQU8sUUFBUXZILENBQUk7QUFDM0MsYUFBUSxPQUFPQyxHQUFZRCxDQUFJLElBQzFCLEtBQUssaUJBQWlCQSxHQUFNdUgsQ0FBTSxJQUNsQyxLQUFLLGtCQUFrQnZILEdBQU11SCxDQUFNO0lBQzNDLFNBQVNZLEdBQUc7QUFDVCxZQUFNLEtBQUssaUJBQWlCbkksR0FBTW1JLENBQVU7SUFDL0MsVUFBQTtBQUNHRCxNQUFBQSxHQUFBLEdBQ0FELEVBQUE7SUFDSDtFQUNIO0VBRVEsaUJBQW9CakksR0FBd0JtSSxHQUFVO0FBQzNELFVBQU1DLEtBQ0hELGFBQWFULEtBQVcsT0FBTyxPQUFPUyxHQUFHLEVBQUUsTUFBQW5JLEVBQUEsQ0FBTSxJQUFJLElBQUkwSCxHQUFTMUgsR0FBTW1JLEtBQUssT0FBT0EsQ0FBQyxDQUFDO0FBRXpGLFdBQUEsS0FBSyxTQUFTLFFBQVEsUUFBQSxHQUN0QixLQUFLLE9BQU8sTUFBTUMsRUFBUSxHQUVuQkE7RUFDVjtFQUVBLE1BQWMsa0JBQXFCcEksR0FBdUJ1SCxHQUFzQjtBQUM3RSxVQUFNYyxLQUFTLEtBQUssU0FBUyxLQUFLLGdCQUFnQixJQUFJLEtBQUssWUFBWXJJLEdBQU1BLEVBQUssUUFBUSxDQUFDLEdBQ3JGOEYsSUFBTyxLQUFLLFNBQVM7TUFDeEI7TUFDQSxDQUFDLEdBQUc5RixFQUFLLFFBQVE7TUFDakIsS0FBSyxZQUFZQSxHQUFNQSxFQUFLLFFBQVE7SUFBQSxHQUdqQ3NJLEtBQU0sTUFBTSxLQUFLO01BQ3BCdEk7TUFDQXFJO01BQ0F2QztNQUNBLEtBQUs7TUFDTHlCLEVBQU8sS0FBSyxPQUFPO0lBQUEsR0FFaEJnQixJQUFnQixNQUFNLEtBQUssZUFBZXZJLEdBQU04RixHQUFNd0MsSUFBS2YsRUFBTyxLQUFLLFFBQVEsQ0FBQztBQUl0RixXQUZBQSxFQUFPLDZDQUE2Q3ZILEVBQUssTUFBTSxHQUUzREQsR0FBYUMsQ0FBSSxJQUNYd0ksR0FBZXhJLEVBQUssUUFBUXVJLENBQWEsSUFHNUNDLEdBQWV4SSxFQUFLLFFBQVF1SSxFQUFjLFVBQUEsQ0FBVztFQUMvRDtFQUVBLE1BQWMsaUJBQWlCdkksR0FBaUJ1SCxHQUFzQjtBQUNuRSxXQUFBQSxFQUFPLDZEQUE2RCxHQUM3RHZILEVBQUssT0FBTyxJQUFJO0VBQzFCO0VBRVEsZUFDTEEsR0FDQThGLEdBQ0EyQyxJQUNBbEIsR0FDMEI7QUFDMUIsVUFBTSxFQUFFLFVBQUF6SixJQUFVLFdBQUE0SyxHQUFXLFFBQUEzRCxHQUFRLFFBQUE0RCxHQUFBQSxJQUFXRjtBQUVoRCxXQUFPLElBQUksUUFBUSxDQUFDekssSUFBTUMsT0FBUztBQUNoQ3NKLFFBQU8sNERBQTREekosRUFBUTtBQUUzRSxZQUFNLEVBQUUsT0FBQUMsR0FBQSxJQUFVLEtBQUssU0FBUztRQUM3QjtRQUNBLEVBQUUsT0FBTzJLLEVBQUE7UUFDVDtVQUNHLEdBQUcsS0FBSyxZQUFZMUksR0FBTThGLENBQUk7VUFDOUIsR0FBRzJDO1FBQUE7TUFDTjtBQUdILFVBQUkxSyxNQUFTaUMsRUFBSztBQUNmLGVBQUF1SCxFQUFPLEtBQUssZ0RBQWdELEdBRXJEdkgsRUFBSztVQUNUeUk7VUFDQTFLO1VBQ0EsQ0FBQzZLLE9BQWM7QUFDWnJCLGNBQU8sS0FBSyx5Q0FBeUMsR0FDckRBLEVBQU8sOEJBQThCaEMsR0FBZXFELEVBQVMsQ0FBQyxHQUU5RDVLO2NBQ0csSUFBSTZLO2dCQUNELE1BQU0sUUFBUUQsRUFBUyxJQUFJLE9BQU8sT0FBT0EsRUFBUyxJQUFJQTtnQkFDdEQsT0FBTyxPQUFPRCxFQUFNO2NBQUE7WUFDdkI7VUFFTjtVQUNBMUs7UUFBQTtBQUlOLFVBQUlGO0FBQ0QsZUFBQXdKLEVBQU87VUFDSjtVQUNBeko7VUFDQTZLLEdBQU87VUFDUEQ7UUFBQSxHQUVJekssR0FBS0YsRUFBSztBQUdwQndKLFFBQU8sS0FBSyxpQ0FBaUMsR0FDN0N2SixHQUFLLElBQUk2SyxHQUFpQixPQUFPLE9BQU85RCxDQUFNLEdBQUcsT0FBTyxPQUFPNEQsRUFBTSxDQUFDLENBQUM7SUFDMUUsQ0FBQztFQUNKO0VBRUEsTUFBYyxZQUNYM0ksR0FDQThJLEdBQ0FoRCxJQUNBaUQsR0FDQXhCLElBQzJCO0FBQzNCLFVBQU15QixJQUFlekIsR0FBTyxRQUFRLFFBQVEsR0FDdEMwQixJQUE2QixLQUFLLFNBQVM7TUFDOUM7TUFDQTtRQUNHLEtBQUssS0FBSztRQUNWLEtBQUssS0FBSztRQUNWLGFBQWE7TUFBQTtNQUVoQixLQUFLLFlBQVlqSixHQUFNQSxFQUFLLFFBQVE7SUFBQTtBQUd2QyxXQUFPLElBQUksUUFBUSxDQUFDaEMsT0FBUztBQUMxQixZQUFNK0csS0FBbUIsQ0FBQSxHQUNuQjRELEtBQW1CLENBQUE7QUFFekJwQixNQUFBQSxHQUFPLEtBQUssU0FBU3VCLEdBQVNoRCxFQUFJLEdBQ2xDeUIsR0FBTyxNQUFNMEIsQ0FBWTtBQUV6QixVQUFJUCxLQUFZLEtBQUssYUFBYTFJLEdBQU04RixFQUFJO0FBQzVDLFVBQUk0QztBQUNELGVBQU8xSyxHQUFLO1VBQ1QsUUFBQStHO1VBQ0EsUUFBQTREO1VBQ0EsVUFBVTtVQUNWLFdBQUFEO1FBQUEsQ0FDRjtBQUdKLFdBQUssU0FBUyxLQUFLLGdCQUFnQixRQUFXO1FBQzNDLEdBQUcsS0FBSyxZQUFZMUksR0FBTThGLEVBQUk7UUFDOUIsS0FBS29ELElBQVE7QUFDVlIsVUFBQUEsS0FBWVEsTUFBVVI7UUFDekI7TUFBQSxDQUNGO0FBRUQsWUFBTWhDLFNBQVV5QywwQkFBQUEsT0FBTUwsR0FBU2hELElBQU1tRCxDQUFZO0FBRWpEdkMsTUFBQUEsR0FBUSxPQUFRO1FBQ2I7UUFDQTBDLEdBQWVyRSxJQUFRLFVBQVV3QyxJQUFReUIsRUFBYSxLQUFLLFFBQVEsQ0FBQztNQUFBLEdBRXZFdEMsR0FBUSxPQUFRO1FBQ2I7UUFDQTBDLEdBQWVULElBQVEsVUFBVXBCLElBQVF5QixFQUFhLEtBQUssUUFBUSxDQUFDO01BQUEsR0FHdkV0QyxHQUFRLEdBQUcsU0FBUzJDLEdBQWdCVixJQUFRcEIsRUFBTSxDQUFDLEdBRS9Dd0IsTUFDRHhCLEdBQU8sNkRBQTZELEdBQ3BFd0IsRUFBY0QsR0FBU3BDLEdBQVEsUUFBU0EsR0FBUSxRQUFTLENBQUMsR0FBR1osRUFBSSxDQUFDLElBR3JFLEtBQUssU0FBUyxLQUFLLGVBQWUsUUFBVztRQUMxQyxHQUFHLEtBQUssWUFBWTlGLEdBQU04RixFQUFJO1FBQzlCLFNBQUFZO1FBQ0EsTUFBTTVJLElBQWtCb0wsSUFBZ0I7QUFDckNsTCxVQUFBQSxHQUFLO1lBQ0YsUUFBQStHO1lBQ0EsUUFBQTREO1lBQ0EsVUFBQTdLO1lBQ0EsV0FBVzRLLE1BQWFRO1VBQUEsQ0FDMUI7UUFDSjtRQUNBLEtBQUtBLElBQWU7QUFDYnhDLFVBQUFBLEdBQVEsV0FJWmdDLEtBQVlRLElBQ1p4QyxHQUFRLEtBQUssUUFBUTtRQUN4QjtNQUFBLENBQ0Y7SUFDSixDQUFDO0VBQ0o7RUFFUSxhQUFnQjFHLEdBQXdCOEYsR0FBZ0I7QUFDN0QsUUFBSTRDO0FBQ0osV0FBQSxLQUFLLFNBQVMsS0FBSyxnQkFBZ0IsUUFBVztNQUMzQyxHQUFHLEtBQUssWUFBWTFJLEdBQU04RixDQUFJO01BQzlCLEtBQUtvRCxHQUFRO0FBQ1ZSLFFBQUFBLEtBQVlRLEtBQVVSO01BQ3pCO0lBQUEsQ0FDRixHQUVNQTtFQUNWO0VBRVEsWUFBZTFJLEdBQXdCTCxHQUFnRDtBQUM1RixXQUFPO01BQ0osUUFBUSxPQUFPMkosR0FBTXRKLEVBQUssUUFBUSxLQUFLLEVBQUU7TUFDekMsVUFBQUw7TUFDQSxLQUFLLEVBQUUsR0FBRyxLQUFLLElBQUE7TUFDZixPQUFPTSxHQUFZRCxDQUFJLElBQUksU0FBWUEsRUFBSztJQUFBO0VBRWxEO0FBQ0g7QUFFQSxTQUFTcUosR0FBZ0JFLElBQWtCaEMsR0FBc0I7QUFDOUQsU0FBTyxDQUFDRSxNQUFlO0FBQ3BCRixNQUFPLHNDQUFzQ0UsQ0FBRyxHQUNoRDhCLEdBQU8sS0FBSyxPQUFPLEtBQUssT0FBTzlCLEVBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQztFQUN0RDtBQUNIO0FBRUEsU0FBUzJCLEdBQ05HLElBQ0F2RCxHQUNBdUIsR0FDQWlDLElBQ0Q7QUFDQyxTQUFPLENBQUMxSixNQUFtQjtBQUN4QnlILE1BQU8sd0JBQXdCdkIsR0FBTWxHLENBQU0sR0FDM0MwSixHQUFPLE1BQU0xSixDQUFNLEdBQ25CeUosR0FBTyxLQUFLekosQ0FBTTtFQUNyQjtBQUNIO0FDL1JPLElBQU0ySixLQUFOLE1BQStDO0VBTW5ELFlBQ1V6QixHQUNDRixHQUNBQyxJQUNUO0FBSFEsU0FBQSxNQUFBQyxHQUNDLEtBQUEsYUFBQUYsR0FDQSxLQUFBLFdBQUFDLElBRVIsS0FBSyxTQUFTLEtBQUssTUFBQTtFQUN0QjtFQUVBLFFBQTJCO0FBQ3hCLFdBQU8sSUFBSUgsR0FBaUIsTUFBTSxLQUFLLFlBQVksS0FBSyxRQUFRO0VBQ25FO0VBRUEsS0FBUTVILEdBQW9DO0FBQ3pDLFdBQU8sS0FBSyxPQUFPLEtBQUtBLENBQUk7RUFDL0I7QUFDSDtBQ3JCTyxTQUFTMEosR0FDYjFKLElBQ0EySixHQUNBQyxJQUFxQ3pDLElBQ3RDO0FBQ0MsUUFBTTBDLEtBQVksQ0FBQ0MsT0FBWTtBQUM1QkYsTUFBUyxNQUFNRSxFQUFJO0VBQ3RCLEdBRU1qTSxJQUFVLENBQUM0SixPQUFxQztBQUMvQ0EsS0FBQUEsTUFBQUEsZ0JBQUFBLEdBQUssVUFBU3pILE1BQ2Y0SixFQUFTbkMsSUFBSyxNQUFnQjtFQUVwQztBQUVBa0MsSUFBUyxLQUFLRSxJQUFXaE0sQ0FBTztBQUNuQztBQ2pCTyxTQUFTa00sR0FBMkJDLElBQW1CQyxHQUEwQjtBQUNyRixTQUFPMUssR0FBYyxDQUFDMkssTUFBZ0M7QUFDbkQsUUFBSSxDQUFDQyxHQUFhSCxFQUFTO0FBQ3hCLFlBQU0sSUFBSSxNQUFNLDRDQUE0Q0EsRUFBUyxHQUFHO0FBRzNFLFlBQVNDLEtBQVFDLEdBQVUsTUFBTUY7RUFDcEMsQ0FBQztBQUNKO0FDUEEsU0FBU0ksR0FBYXRFLElBQWdCO0FBQ25DLFFBQU1uRyxJQUFXLENBQUMsWUFBWSxHQUFHbUcsRUFBSTtBQUNyQyxTQUFJbkcsRUFBUyxDQUFDLE1BQU0sUUFBUUEsRUFBUyxTQUFTLElBQUksTUFDL0NBLEVBQVMsQ0FBQyxJQUFJMEssR0FBTzFLLEdBQVUsSUFBSSxJQUcvQkQsRUFBMEJDLENBQVE7QUFDNUM7QUFFQSxTQUFBMkssS0FBbUc7QUFDaEcsU0FBTztJQUNKLFdBQTZCO0FBQzFCLGFBQU8sS0FBSztRQUNURixHQUFhdEYsR0FBbUIsV0FBVyxDQUFDLENBQUM7UUFDN0N4QixFQUF5QixTQUFTO01BQUE7SUFFeEM7SUFFQSxlQUFtQ2lILElBQVlDLEdBQVk7QUFDeEQsYUFBTyxLQUFLO1FBQ1RKLEdBQWEsQ0FBQyxNQUFNRyxJQUFZQyxHQUFZLEdBQUcxRixHQUFtQixTQUFTLENBQUMsQ0FBQztRQUM3RXhCLEVBQXlCLFNBQVM7TUFBQTtJQUV4QztJQUVBLG9CQUF3Q2lILElBQVk7QUFDakQsYUFBTyxLQUFLO1FBQ1RILEdBQWEsQ0FBQyxNQUFNRyxJQUFZLEdBQUd6RixHQUFtQixTQUFTLENBQUMsQ0FBQztRQUNqRXhCLEVBQXlCLFNBQVM7TUFBQTtJQUV4QztFQUFBO0FBRU47QUNVTyxJQUFNbUgsS0FBOEIsQ0FBQ0MsSUFBTVYsR0FBV3RKLE1BQWU7QUFDekUsUUFBTWYsS0FBVyxDQUFDLFNBQVMsR0FBR2UsQ0FBVTtBQUV4QyxTQUFBbUcsRUFBYTZELEVBQUksS0FBSy9LLEdBQVMsS0FBS2dMLEVBQVNELEVBQUksQ0FBQyxHQUNsRDdELEVBQWFtRCxDQUFTLEtBQUtySyxHQUFTLEtBQUtnTCxFQUFTWCxDQUFTLENBQUMsR0FFckR0SyxFQUEwQkMsRUFBUTtBQUM1QztBQVBPLElBU01pTCxLQUFvQyxDQUFDRixJQUFNVixHQUFXdEosT0FDaEV3QyxHQUFPeEMsR0FBWSxVQUFVLEdBRXRCK0osR0FBVUMsSUFBTVYsR0FBV3RKLENBQVU7QUFHL0MsU0FBU21LLEdBQ05DLElBQ0E5SyxHQUNBK0ssTUFDR2pGLElBQ0o7QUFDQyxTQUFLZSxFQUFha0UsQ0FBUSxJQUluQi9LLEVBQUsrSyxHQUFVbkUsRUFBV2QsR0FBSyxDQUFDLEdBQUdlLENBQVksR0FBRy9CLEdBQW1CLFNBQVMsQ0FBQyxJQUg1RXRGLEdBQXVCLE9BQU9zTCxFQUFHLGlDQUFpQztBQUkvRTtBQUVBLFNBQUFFLEtBQWdFO0FBQzdELFNBQU87SUFDSixNQUEwQk4sT0FBMkJySCxHQUFpQjtBQUNuRSxhQUFPLEtBQUs7UUFDVHdILEdBQWdCLFNBQVNKLElBQVc3RCxFQUFXOEQsSUFBTTdELENBQVksR0FBRyxHQUFHeEQsQ0FBSTtRQUMzRUMsRUFBeUIsU0FBUztNQUFBO0lBRXhDO0lBQ0EsT0FBMkJvSCxPQUEyQnJILEdBQWlCO0FBQ3BFLGFBQU8sS0FBSztRQUNUd0gsR0FBZ0IsVUFBVUQsSUFBaUJoRSxFQUFXOEQsSUFBTTdELENBQVksR0FBRyxHQUFHeEQsQ0FBSTtRQUNsRkMsRUFBeUIsU0FBUztNQUFBO0lBRXhDO0VBQUE7QUFFTjtBQ3ZGQSxJQUFNMkgsS0FBc0M7RUFDekMsSUFBSUMsR0FBVyxxQ0FBcUMsQ0FBQ3pDLElBQVEsQ0FBQzBDLEdBQVFsQixHQUFNbUIsRUFBTSxNQUFNO0FBQ3JGM0MsSUFBQUEsR0FBTyxTQUFTMEMsR0FDaEIxQyxHQUFPLFNBQVMyQyxJQUNoQjNDLEdBQU8sT0FBTyxDQUFDLENBQUN3QjtFQUNuQixDQUFDO0VBQ0QsSUFBSWlCLEdBQVcscUJBQXFCLENBQUN6QyxJQUFRLENBQUM0QyxDQUFNLE1BQU07QUFDdkQsVUFBTUMsSUFBUUQsRUFBTyxNQUFNLEdBQUcsR0FDeEJFLEtBQVFELEVBQU0sSUFBQTtBQUVoQixLQUFDQyxNQUFTLENBQUNBLEdBQU0sU0FBUyxHQUFHLE1BSWpDOUMsR0FBTyxTQUFTO01BQ2IsT0FBTzhDLEdBQU0sT0FBTyxHQUFHQSxHQUFNLFNBQVMsQ0FBQztNQUN2QyxNQUFNRCxFQUFNLEtBQUssR0FBRyxFQUFFLEtBQUE7SUFBSztFQUVqQyxDQUFDO0VBQ0QsSUFBSUo7SUFDRDtJQUNBLENBQUN6QyxJQUFRLENBQUMrQyxHQUFTQyxHQUFZQyxFQUFTLE1BQU07QUFDM0NqRCxNQUFBQSxHQUFPLFFBQVEsVUFBVSxTQUFTK0MsR0FBUyxFQUFFLEtBQUssR0FDbEQvQyxHQUFPLFFBQVEsYUFBYSxTQUFTZ0QsR0FBWSxFQUFFLEtBQUssR0FDeERoRCxHQUFPLFFBQVEsWUFBWSxTQUFTaUQsSUFBVyxFQUFFLEtBQUs7SUFDekQ7RUFBQTtFQUVILElBQUlSO0lBQ0Q7SUFDQSxDQUFDekMsSUFBUSxDQUFDK0MsR0FBUy9JLEdBQU9rSixFQUFTLE1BQU07QUFDdENsRCxNQUFBQSxHQUFPLFFBQVEsVUFBVSxTQUFTK0MsR0FBUyxFQUFFLEtBQUs7QUFDbEQsWUFBTUksSUFBUSxTQUFTbkosR0FBTyxFQUFFLEtBQUs7QUFDakNrSixNQUFBQSxPQUFjLE1BQ2ZsRCxHQUFPLFFBQVEsWUFBWW1ELElBQ25CRCxPQUFjLFFBQ3RCbEQsR0FBTyxRQUFRLGFBQWFtRDtJQUVsQztFQUFBO0FBRU47QUFFTyxTQUFTQyxHQUFrQjlHLElBQThCO0FBWTdELFNBQU8rRyxHQVhzQjtJQUMxQixRQUFRO0lBQ1IsUUFBUTtJQUNSLFFBQVE7SUFDUixNQUFNO0lBQ04sU0FBUztNQUNOLFNBQVM7TUFDVCxZQUFZO01BQ1osV0FBVztJQUFBO0VBQ2QsR0FFZ0NiLElBQVNsRyxFQUFNO0FBQ3JEO0FDekNPLFNBQVNnSCxHQUNibEcsSUFDQW1HLEdBQ0F0TCxHQUN5QjtBQVV6QixTQUFPO0lBQ0osVUFWd0I7TUFDeEI7TUFDQTtNQUNBO01BQ0EsR0FBR3NELEVBQWM2QixJQUFTLElBQUk7TUFDOUIsR0FBR21HO01BQ0gsR0FBR3RMO0lBQUE7SUFLSCxRQUFRO0lBQ1IsUUFBUW1MO0VBQUE7QUFFZDtBQUVBLFNBQUFULEtBQXNEO0FBQ25ELFNBQU87SUFDSixPQUEyQnZGLE1BQStCeEMsR0FBaUI7QUFDeEUsWUFBTTRJLEtBQU8zSSxFQUF5QixTQUFTLEdBQ3pDdEQsSUFDSGtNLEdBQTJCckcsQ0FBTyxLQUNsQ2tHO1FBQ0dJLEVBQVF0RyxDQUFPO1FBQ2ZzRyxFQUFRdkYsRUFBV3ZELEVBQUssQ0FBQyxHQUFHK0ksSUFBMkIsQ0FBQSxDQUFFLENBQUM7UUFDMUQ7VUFDRyxHQUFHN0wsR0FBY3FHLEVBQVd2RCxFQUFLLENBQUMsR0FBR2dKLElBQWEsQ0FBQSxDQUFFLENBQUM7VUFDckQsR0FBR3ZILEdBQW1CLFdBQVcsR0FBRyxJQUFJO1FBQUE7TUFDM0M7QUFHTixhQUFPLEtBQUssU0FBUzlFLEdBQU1pTSxFQUFJO0lBQ2xDO0VBQUE7QUFHSCxXQUFTQyxHQUEyQnJHLEdBQW1CO0FBQ3BELFdBQ0csQ0FBQ3VHLEdBQTBCdkcsQ0FBTyxLQUNsQ3JHO01BQ0c7SUFBQTtFQUdUO0FBQ0g7QUNqREEsU0FBUzhNLEtBQTJDO0FBQ2pELFNBQU87SUFDSixPQUFPO0lBQ1AsU0FBUztJQUNULFFBQVE7SUFDUixPQUFPO0lBQ1AsZUFBZTtJQUNmLE1BQU07SUFDTixhQUFhO0lBQ2IsVUFBVTtFQUFBO0FBRWhCO0FBRUEsSUFBTWxPLEtBQXlDLElBQUk4TTtFQUNoRDtFQUNBLENBQUN6QyxJQUFRLENBQUM1RyxHQUFLQyxDQUFLLE1BQU07QUFDdkIsVUFBTXlLLEtBQVdDLEdBQVkzSyxDQUFHO0FBQzVCLFdBQU8sT0FBTzRHLElBQVE4RCxFQUFRLE1BQy9COUQsR0FBTzhELEVBQStCLElBQUk1SCxFQUFTN0MsQ0FBSztFQUU5RDtBQUNIO0FBRUEsU0FBQTJLLEtBQTREO0FBQ3pELFNBQU87SUFDSixlQUFpQztBQUM5QixhQUFPLEtBQUssU0FBUztRQUNsQixVQUFVLENBQUMsaUJBQWlCLFdBQVc7UUFDdkMsUUFBUTtRQUNSLE9BQU8xSCxJQUFnQjtBQUNwQixpQkFBTytHLEdBQW9CUSxHQUFBLEdBQXdCLENBQUNsTyxFQUFNLEdBQUcyRyxFQUFNO1FBQ3RFO01BQUEsQ0FDRjtJQUNKO0VBQUE7QUFFTjtBQzdDQSxTQUFBMkgsS0FBMkQ7QUFDeEQsU0FBTztJQUNKLGNBQWtEO0FBQy9DLGFBQU8sS0FBSztRQUNUaE4sRUFBMEIsQ0FBQyxZQUFZLG1CQUFtQixNQUFNLEdBQUcsSUFBSTtRQUN2RTRELEVBQXlCLFNBQVM7TUFBQTtJQUV4QztFQUFBO0FBRU47QUNSTyxTQUFTcUosR0FBZXBLLElBQWtCcUssR0FBb0M7QUFDbEYsUUFBTWpOLElBQVcsQ0FBQyxlQUFlNEMsRUFBUTtBQUN6QyxTQUFJcUssS0FDRGpOLEVBQVMsS0FBSyxJQUFJLEdBR2RELEVBQTBCQyxHQUFVLElBQUk7QUFDbEQ7QUNYTyxJQUFNa04sS0FBTixNQUF3QztFQUM1QyxZQUNtQkMsR0FDQXBPLEdBQ0FxTyxJQUNBQyxHQUNqQjtBQUppQixTQUFBLE9BQUFGLEdBQ0EsS0FBQSxPQUFBcE8sR0FDQSxLQUFBLFdBQUFxTyxJQUNBLEtBQUEsU0FBQUM7RUFDaEI7QUFDTjtBQUVBLElBQU1DLEtBQW9CO0FBQTFCLElBQ01DLEtBQXNCO0FBRXJCLFNBQVNDLEdBQVVMLElBQWVwTyxHQUFjTCxHQUFjO0FBQ2xFLFFBQU1zTCxLQUFXLE9BQU90TCxDQUFJLEVBQUUsS0FBQTtBQUM5QixNQUFJb0s7QUFFSixNQUFLQSxJQUFTd0UsR0FBa0IsS0FBS3RELEVBQVE7QUFDMUMsV0FBTyxJQUFJa0QsR0FBWUMsSUFBTXBPLEdBQU0sT0FBTytKLEVBQU8sQ0FBQyxDQUFDO0FBR3RELE1BQUtBLElBQVN5RSxHQUFvQixLQUFLdkQsRUFBUTtBQUM1QyxXQUFPLElBQUlrRCxHQUFZQyxJQUFNcE8sR0FBTSxNQUFNK0osRUFBTyxDQUFDLENBQUM7QUFHckQsTUFBSXVFLEtBQVM7QUFDYixRQUFNSSxJQUFTekQsR0FBUyxNQUFNLEdBQUc7QUFDakMsU0FBT3lELEVBQU87QUFFWCxRQURjQSxFQUFPLE1BQUEsTUFDUCxNQUFNO0FBQ2pCSixNQUFBQSxLQUFTSSxFQUFPLEtBQUssR0FBRztBQUN4QjtJQUNIO0FBR0gsU0FBTyxJQUFJUCxHQUFZQyxJQUFNcE8sR0FBTSxPQUFPLEtBQUtpTCxFQUFRLEdBQUdxRCxFQUFNO0FBQ25FO0FDakNBLElBQU1LLEtBQWM7QUFFcEIsU0FBU0MsR0FBZXhFLElBQW1CO0FBQ3hDLFNBQU9BLEdBQVEsU0FBU3VFLEVBQVc7QUFDdEM7QUFFTyxTQUFTRSxHQUFTVCxLQUFPLE9BQU9wTyxHQUFjZ0MsR0FBOEM7QUFDaEcsUUFBTWYsS0FBVyxDQUFDLFFBQVEsR0FBR2UsQ0FBVTtBQUN2QyxTQUFJb00sTUFBUSxDQUFDUSxHQUFlM04sRUFBUSxLQUNqQ0EsR0FBUyxPQUFPLEdBQUcsR0FBRzBOLEVBQVcsR0FHN0I7SUFDSixVQUFBMU47SUFDQSxRQUFRO0lBQ1IsT0FBT3RCLEdBQTBCO0FBQzlCLGFBQU84TyxHQUFVeE4sR0FBUyxTQUFTLFFBQVEsR0FBR2pCLEdBQU1MLENBQUk7SUFDM0Q7RUFBQTtBQUVOO0FDWEEsU0FBU21QLEdBQ050TSxJQUMrQztBQUMvQyxTQUFJQSxPQUFVLFNBQ0oxQixHQUF1QixnREFBZ0QsSUFHMUU7SUFDSixRQUFRO0lBQ1IsT0FBT3VGLEdBQVE7QUFDWixhQUFPLE9BQU87UUFDWFAsR0FBdUJPLEdBQVEsQ0FBQzNGLE1BQVM7QUFDdEMsZ0JBQU1xTyxLQUFRck8sRUFBSyxRQUFRLEdBQUc7QUFDOUIsaUJBQU87WUFDSm9OLEdBQVlwTixFQUFLLFVBQVUsR0FBR3FPLEVBQUssRUFBRSxZQUFBLENBQWE7WUFDbERyTyxFQUFLLFVBQVVxTyxLQUFRLENBQUMsRUFBRSxLQUFBO1VBQUs7UUFFckMsQ0FBQztNQUFBO0lBRVA7SUFDQSxVQUFVLENBQUMsc0JBQXNCLFNBQVM7SUFDMUMsT0FBQXZNO0VBQUE7QUFFTjtBQUVBLFNBQUF3TSxLQUFpRTtBQUM5RCxTQUFPO0lBQ0osa0JBQXNDeE0sSUFBTztBQUMxQyxhQUFPLEtBQUs7UUFDVHNNLEdBQXNCNUcsRUFBVzFGLElBQU95TSxFQUFvQixDQUFDO1FBQzdEckssRUFBeUIsU0FBUztNQUFBO0lBRXhDO0VBQUE7QUFFTjtBQzlDTyxJQUFLc0ssS0FBQUEsa0JBQUFBLFFBQ1RBLEdBQUEsT0FBTyxJQUNQQSxHQUFBLE9BQU8sVUFDUEEsR0FBQSxXQUFXLGFBQ1hBLEdBQUEsWUFBWSxlQUNaQSxHQUFBLGNBQWMsaUJBTExBLEtBQUFBLE1BQUEsQ0FBQSxDQUFBO0FBUVosSUFBTUMsS0FBaUI7QUFFaEIsU0FBU0MsR0FBcUJwTixJQUFzQjtBQUN4RCxXQUFTZ0MsSUFBSSxHQUFHQSxJQUFJaEMsR0FBVyxRQUFRZ0MsS0FBSztBQUN6QyxVQUFNcUwsSUFBU0YsR0FBZSxLQUFLbk4sR0FBV2dDLENBQUMsQ0FBQztBQUNoRCxRQUFJcUw7QUFDRCxhQUFPLEtBQUtBLEVBQU8sQ0FBQyxDQUFDO0VBRTNCO0FBRUEsU0FBTztBQUNWO0FBRU8sU0FBU0MsR0FBWUMsSUFBNkI7QUFDdEQsU0FBT0osR0FBZSxLQUFLSSxFQUFtQjtBQUNqRDtBQ2xCTyxJQUFNQyxLQUFOLE1BQXdDO0VBQXhDLGNBQUE7QUFDSixTQUFBLFVBQVUsR0FDVixLQUFBLFlBQVksR0FDWixLQUFBLGFBQWEsR0FFYixLQUFBLFFBQTBELENBQUE7RUFBQztBQUM5RDtBQ0xBLElBQU1DLEtBQWE7RUFDaEIsSUFBSWpEO0lBQ0Q7SUFDQSxDQUFDekMsSUFBUSxDQUFDL0csR0FBTThKLEdBQVM0QyxLQUFjLEVBQUUsTUFBTTtBQUM1QzNGLE1BQUFBLEdBQU8sTUFBTSxLQUFLO1FBQ2YsTUFBTS9HLEVBQUssS0FBQTtRQUNYLFNBQVNpRCxFQUFTNkcsQ0FBTztRQUN6QixZQUFZNEMsR0FBWSxRQUFRLFNBQVMsRUFBRSxFQUFFO1FBQzdDLFdBQVdBLEdBQVksUUFBUSxTQUFTLEVBQUUsRUFBRTtRQUM1QyxRQUFRO01BQUEsQ0FDVjtJQUNKO0VBQUE7RUFFSCxJQUFJbEQ7SUFDRDtJQUNBLENBQUN6QyxJQUFRLENBQUMvRyxHQUFNMk0sR0FBUUMsRUFBSyxNQUFNO0FBQ2hDN0YsTUFBQUEsR0FBTyxNQUFNLEtBQUs7UUFDZixNQUFNL0csRUFBSyxLQUFBO1FBQ1gsUUFBUWlELEVBQVMwSixDQUFNO1FBQ3ZCLE9BQU8xSixFQUFTMkosRUFBSztRQUNyQixRQUFRO01BQUEsQ0FDVjtJQUNKO0VBQUE7RUFFSCxJQUFJcEQsR0FBdUIsd0JBQXdCLENBQUN6QyxJQUFRLENBQUMvRyxDQUFJLE1BQU07QUFDcEUrRyxJQUFBQSxHQUFPLE1BQU0sS0FBSztNQUNmLE1BQU0vRyxFQUFLLEtBQUE7TUFDWCxRQUFRO01BQ1IsT0FBTztNQUNQLFFBQVE7SUFBQSxDQUNWO0VBQ0osQ0FBQztFQUNELElBQUl3SjtJQUNEO0lBQ0EsQ0FBQ3pDLElBQVEsQ0FBQzhGLEdBQVN0UCxDQUFPLE1BQU07QUFDN0IsWUFBTXVQLEtBQVcsVUFBVSxLQUFLdlAsQ0FBTyxHQUNqQ3dQLElBQVUsVUFBVSxLQUFLeFAsQ0FBTztBQUV0Q3dKLE1BQUFBLEdBQU8sVUFBVTlELEVBQVM0SixDQUFPLEdBQ2pDOUYsR0FBTyxhQUFhOUQsRUFBUzZKLE1BQUFBLGdCQUFBQSxHQUFXLEVBQUUsR0FDMUMvRixHQUFPLFlBQVk5RCxFQUFTOEosdUJBQVUsRUFBRTtJQUMzQztFQUFBO0FBRU47QUEzQ0EsSUE2Q01DLEtBQWdCO0VBQ25CLElBQUl4RDtJQUNEO0lBQ0EsQ0FBQ3pDLElBQVEsQ0FBQ2tHLEdBQWVDLEdBQWVsTixFQUFJLE1BQU07QUFDL0MsWUFBTStKLElBQWE5RyxFQUFTZ0ssQ0FBYSxHQUNuQ2pELEtBQVkvRyxFQUFTaUssQ0FBYTtBQUV4Q25HLE1BQUFBLEdBQU8sV0FDUEEsR0FBTyxjQUFjZ0QsR0FDckJoRCxHQUFPLGFBQWFpRCxJQUVwQmpELEdBQU8sTUFBTSxLQUFLO1FBQ2YsTUFBQS9HO1FBQ0EsU0FBUytKLElBQWFDO1FBQ3RCLFlBQUFEO1FBQ0EsV0FBQUM7UUFDQSxRQUFRO01BQUEsQ0FDVjtJQUNKO0VBQUE7RUFFSCxJQUFJUixHQUF1QixlQUFlLENBQUN6QyxJQUFRLENBQUMvRyxDQUFJLE1BQU07QUFDM0QrRyxJQUFBQSxHQUFPLFdBRVBBLEdBQU8sTUFBTSxLQUFLO01BQ2YsTUFBQS9HO01BQ0EsT0FBTztNQUNQLFFBQVE7TUFDUixRQUFRO0lBQUEsQ0FDVjtFQUNKLENBQUM7QUFDSjtBQTNFQSxJQTZFTW1OLEtBQWlCO0VBQ3BCLElBQUkzRCxHQUF1QixTQUFTLENBQUN6QyxJQUFRLENBQUMvRyxDQUFJLE1BQU07QUFDckQrRyxJQUFBQSxHQUFPLFdBQ1BBLEdBQU8sTUFBTSxLQUFLO01BQ2YsTUFBQS9HO01BQ0EsU0FBUztNQUNULFlBQVk7TUFDWixXQUFXO01BQ1gsUUFBUTtJQUFBLENBQ1Y7RUFDSixDQUFDO0FBQ0o7QUF4RkEsSUEwRk1vTixLQUFtQjtFQUN0QixJQUFJNUQ7SUFDRDtJQUNBLENBQUN6QyxJQUFRLENBQUNzRyxHQUFRQyxHQUFZQyxJQUFNQyxHQUFLeEosRUFBRSxNQUFNO0FBQzlDK0MsTUFBQUEsR0FBTyxXQUNQQSxHQUFPLE1BQU0sS0FBSztRQUNmLE1BQU0vQyxNQUFBQSxPQUFBQSxLQUFNdUo7UUFDWixTQUFTO1FBQ1QsWUFBWTtRQUNaLFdBQVc7UUFDWCxRQUFRO1FBQ1IsUUFBUUUsR0FBTzFMLEdBQWlCc0wsQ0FBTSxLQUFLQSxDQUFNO1FBQ2pELE1BQU1JLEdBQU8sQ0FBQyxDQUFDekosTUFBTXVKLE9BQVN2SixNQUFNdUosRUFBSTtRQUN4QyxZQUFZdEssRUFBU3FLLENBQVU7TUFBQSxDQUNqQztJQUNKO0VBQUE7QUFFTjtBQTNHQSxJQTZHTUksS0FBa0U7RUFDckUsQ0FBQ3hCLEdBQVUsSUFBSSxHQUFHTztFQUNsQixDQUFDUCxHQUFVLElBQUksR0FBR087RUFDbEIsQ0FBQ1AsR0FBVSxRQUFRLEdBQUdjO0VBQ3RCLENBQUNkLEdBQVUsV0FBVyxHQUFHa0I7RUFDekIsQ0FBQ2xCLEdBQVUsU0FBUyxHQUFHaUI7QUFDMUI7QUFFTyxTQUFTUSxHQUFjdEIsS0FBU0gsR0FBVSxNQUFNO0FBQ3BELFFBQU14UCxJQUFTZ1IsR0FBbUJyQixFQUFNO0FBRXhDLFNBQU8sQ0FBQ2hKLE1BQW1CK0csR0FBb0IsSUFBSW9DLEdBQUFBLEdBQWU5UCxHQUFRMkcsR0FBUSxLQUFLO0FBQzFGO0FDMUhPLElBQU11SyxLQUFpQjtBQUF2QixJQUVNQyxNQUFrQjtBQUZ4QixJQUlNQyxNQUFXO0FBSmpCLElBTURDLEtBQW9CLENBQUMsUUFBUSxRQUFRLFdBQVcsUUFBUSxlQUFlLGNBQWM7QUFFM0YsU0FBU0MsR0FBWXRDLElBQWtCdUMsR0FBdUI7QUFDM0QsU0FBT0EsRUFBTztJQUNYLENBQUN2USxHQUFNd1EsSUFBT25DLE9BQ1hyTyxFQUFLd1EsRUFBSyxJQUFJeEMsR0FBT0ssQ0FBSyxLQUFLLElBQ3hCck87SUFFVix1QkFBTyxPQUFPLEVBQUUsTUFBTSxLQUFBLENBQU07RUFBQTtBQUVsQztBQUVPLFNBQVN5USxHQUNiQyxLQUFXTixLQUNYRyxJQUFTRixJQUNUTSxJQUFZbkMsR0FBVSxNQUN2QjtBQUNDLFFBQU1vQyxLQUFrQlgsR0FBY1UsQ0FBUztBQUUvQyxTQUFPLFNBQVVoTCxHQUE4QjtBQUM1QyxVQUFNdEQsS0FBc0N0QztNQUN6QzRGLEVBQU8sS0FBQTtNQUNQO01BQ0F1SztJQUFBLEVBQ0QsSUFBSSxTQUFVcE4sR0FBTTtBQUNuQixZQUFNK04sSUFBYS9OLEVBQUssTUFBTXFOLEdBQWUsR0FDdkNXLEtBQStCUixHQUFZTyxFQUFXLENBQUMsRUFBRSxNQUFNSCxFQUFRLEdBQUdILENBQU07QUFFdEYsYUFBSU0sRUFBVyxTQUFTLEtBQUtBLEVBQVcsQ0FBQyxFQUFFLEtBQUEsTUFDeENDLEdBQVksT0FBT0YsR0FBZ0JDLEVBQVcsQ0FBQyxDQUFDLElBRzVDQztJQUNWLENBQUM7QUFFRCxXQUFPO01BQ0osS0FBQXpPO01BQ0EsUUFBU0EsR0FBSSxVQUFVQSxHQUFJLENBQUMsS0FBTTtNQUNsQyxPQUFPQSxHQUFJO0lBQUE7RUFFakI7QUFDSDtBQzlDTyxTQUFTME8sR0FBZ0J6UCxJQUEwRDtBQUN2RixNQUFJcVAsSUFBWWpDLEdBQXFCcE4sRUFBVTtBQUUvQyxRQUFNZixJQUFXLENBQUMsTUFBTTtBQUV4QixTQUFJb1EsTUFBY25DLEdBQVUsU0FDekJtQyxJQUFZbkMsR0FBVSxNQUN0QmpPLEVBQVMsS0FBSyxhQUFhLElBRzlCQSxFQUFTLEtBQUssR0FBR2UsRUFBVSxHQUd4QjBQLEdBQXdCelEsQ0FBUSxLQUFLO0lBQ2xDLFVBQUFBO0lBQ0EsUUFBUTtJQUNSLFFBQVEwUCxHQUFjVSxDQUFTO0VBQUE7QUFHeEM7QUFFTyxTQUFTSyxHQUF3QjFQLElBQXlDO0FBQzlFLFFBQU0yUCxJQUFRM1AsR0FBVyxPQUFPc04sRUFBVztBQUUzQyxNQUFJcUMsRUFBTSxTQUFTO0FBQ2hCLFdBQU83UTtNQUNKLHNEQUFzRDZRLEVBQU0sS0FBSyxHQUFHLENBQUM7SUFBQTtBQUkzRSxNQUFJQSxFQUFNLFVBQVUzUCxHQUFXLFNBQVMsSUFBSTtBQUN6QyxXQUFPbEI7TUFDSixnQkFBZ0I2USxDQUFLO0lBQUE7QUFHOUI7QUNoQkEsSUFBS0MsS0FBQUEsa0JBQUFBLFFBQ0ZBLEdBQUFBLEdBQUEsVUFBQSxJQUFBLENBQUEsSUFBQSxZQUNBQSxHQUFBQSxHQUFBLFdBQUEsSUFBQSxDQUFBLElBQUEsYUFDQUEsR0FBQUEsR0FBQSxXQUFBLENBQUEsSUFBQSxZQUNBQSxHQUFBQSxHQUFBLElBQUEsQ0FBQSxJQUFBLEtBQ0FBLEdBQUFBLEdBQUEsT0FBQSxDQUFBLElBQUEsUUFDQUEsR0FBQUEsR0FBQSxTQUFBLENBQUEsSUFBQSxVQUNBQSxHQUFBQSxHQUFBLE9BQUEsQ0FBQSxJQUFBLFFBQ0FBLEdBQUFBLEdBQUEsS0FBQSxDQUFBLElBQUEsTUFDQUEsR0FBQUEsR0FBQSxXQUFBLENBQUEsSUFBQSxZQUNBQSxHQUFBQSxHQUFBLFlBQUEsQ0FBQSxJQUFBLGFBQ0FBLEdBQUFBLEdBQUEsVUFBQSxFQUFBLElBQUEsV0FDQUEsR0FBQUEsR0FBQSxZQUFBLEVBQUEsSUFBQSxhQUNBQSxHQUFBQSxHQUFBLGFBQUEsRUFBQSxJQUFBLGNBYkVBLEtBQUFBLE1BQUEsQ0FBQSxDQUFBO0FBNkNMLFNBQVNDLEdBQ054QyxJQUNBK0IsR0FDbUI7QUFDbkIsUUFBTUgsSUFBbUIsQ0FBQSxHQUNuQmEsS0FBc0IsQ0FBQTtBQUU1QixTQUFBLE9BQU8sS0FBS3pDLEVBQU0sRUFBRSxRQUFRLENBQUM2QixNQUFVO0FBQ3BDRCxNQUFPLEtBQUtDLENBQUssR0FDakJZLEdBQVUsS0FBSyxPQUFPekMsR0FBTzZCLENBQUssQ0FBQyxDQUFDO0VBQ3ZDLENBQUMsR0FFTSxDQUFDRCxHQUFRYSxHQUFVLEtBQUtWLENBQVEsQ0FBQztBQUMzQztBQUVBLFNBQVNXLEdBQStCdlAsSUFBbUI7QUFDeEQsU0FBTyxPQUFPLEtBQUtBLEVBQUssRUFBRSxPQUFPLENBQUN3UCxHQUFLN08sT0FDOUJBLEtBQU95TyxPQUNWSSxFQUFJN08sQ0FBRyxJQUFJWCxHQUFNVyxDQUFHLElBRWhCNk8sSUFDUCxDQUFBLENBQWE7QUFDbkI7QUFFTyxTQUFTQyxJQUNiQyxLQUErQixDQUFBLEdBQy9CbFEsSUFBdUIsQ0FBQSxHQUNOO0FBQ2pCLFFBQU1vUCxJQUFXbEosRUFBV2dLLEdBQUksVUFBVS9KLEdBQWMySSxHQUFRLEdBQzFEekIsS0FBUzhDLEdBQWtCRCxHQUFJLE1BQU0sSUFDdENBLEdBQUksU0FDSjtJQUNHLE1BQU07SUFDTixNQUFNQSxHQUFJLGVBQWUsUUFBUSxRQUFRO0lBQ3pDLFNBQVM7SUFDVCxNQUFNO0lBQ04sTUFBTUEsR0FBSSxZQUFZLE9BQU87SUFDN0IsYUFBYUEsR0FBSSxZQUFZLFFBQVEsUUFBUTtJQUM3QyxjQUFjQSxHQUFJLFlBQVksUUFBUSxRQUFRO0VBQUEsR0FHaEQsQ0FBQ2pCLEdBQVFhLEVBQVMsSUFBSUQsR0FBYXhDLElBQVErQixDQUFRLEdBRW5EZ0IsSUFBbUIsQ0FBQSxHQUNuQmhJLElBQW9CO0lBQ3ZCLG1CQUFtQndHLEVBQWMsR0FBR2tCLEVBQVMsR0FBR2pCLEdBQWU7SUFDL0QsR0FBRzdPO0VBQUEsR0FHQXFRLEtBQWdDSCxHQUFZLEtBQU1BLEdBQVksV0FBVyxLQUFLQSxHQUFJO0FBS3hGLE1BSklHLE1BQ0RqSSxFQUFRLEtBQUssZUFBZWlJLEVBQVEsRUFBRSxHQUdyQ0gsR0FBSSxRQUFRQSxHQUFJLElBQUk7QUFDckIsVUFBTUksS0FBZ0JKLEdBQUksY0FBYyxRQUFRLFFBQVE7QUFDeERFLE1BQU8sS0FBSyxHQUFHRixHQUFJLFFBQVEsRUFBRSxHQUFHSSxFQUFhLEdBQUdKLEdBQUksTUFBTSxFQUFFLEVBQUU7RUFDakU7QUFFQSxTQUFJL0osRUFBYStKLEdBQUksSUFBSSxLQUN0QjlILEVBQVEsS0FBSyxZQUFZNkIsRUFBU2lHLEdBQUksSUFBSSxDQUFDLEdBRzlDSyxHQUFrQlIsR0FBWUcsRUFBYyxHQUFHOUgsQ0FBTyxHQUUvQztJQUNKLFFBQUE2RztJQUNBLFVBQUFHO0lBQ0EsVUFBVSxDQUFDLEdBQUdoSCxHQUFTLEdBQUdnSSxDQUFNO0VBQUE7QUFFdEM7QUFFTyxTQUFTSSxHQUNicEIsSUFDQUgsR0FDQWpQLEdBQ3lCO0FBQ3pCLFFBQU10QyxLQUFTeVIsR0FBMkJDLElBQVVILEdBQVE3QixHQUFxQnBOLENBQVUsQ0FBQztBQUU1RixTQUFPO0lBQ0osVUFBVSxDQUFDLE9BQU8sR0FBR0EsQ0FBVTtJQUMvQixRQUFRO0lBQ1IsUUFBQXRDO0VBQUE7QUFFTjtBQUVBLFNBQUErUyxLQUFtRDtBQUNoRCxTQUFPO0lBQ0osT0FBOEM5TixHQUFpQjtBQUM1RCxZQUFNNEksS0FBTzNJLEVBQXlCLFNBQVMsR0FDekMxQyxJQUFVK1A7UUFDYlMsR0FBd0IsU0FBUztRQUNqQzdRLEdBQWNxRyxFQUFXLFVBQVUsQ0FBQyxHQUFHeUYsSUFBYSxDQUFBLENBQUUsQ0FBQztNQUFBLEdBRXBEck0sS0FDSGtNLEVBQTJCLEdBQUc3SSxDQUFJLEtBQ2xDK00sR0FBd0J4UCxFQUFRLFFBQVEsS0FDeEN5USxHQUFjelEsQ0FBTztBQUV4QixhQUFPLEtBQUssU0FBU1osSUFBTWlNLEVBQUk7SUFDbEM7RUFBQTtBQUdILFdBQVNvRixHQUFjelEsR0FBMkI7QUFDL0MsV0FBT3NRLEdBQVF0USxFQUFRLFVBQVVBLEVBQVEsUUFBUUEsRUFBUSxRQUFRO0VBQ3BFO0FBRUEsV0FBU3NMLEVBQTJCK0MsR0FBZ0J2SixJQUFjO0FBQy9ELFdBQ0dtQixFQUFhb0ksQ0FBSSxLQUNqQnBJLEVBQWFuQixFQUFFLEtBQ2ZsRztNQUNHO0lBQUE7RUFHVDtBQUNIO0FDbkxPLElBQU04UixLQUFOLE1BQW9EO0VBQ3hELFlBQ21CcEksR0FDQXhILElBQXNCLE1BQ3RCNlAsSUFDakI7QUFIaUIsU0FBQSxTQUFBckksR0FDQSxLQUFBLE9BQUF4SCxHQUNBLEtBQUEsT0FBQTZQO0VBQ2hCO0VBRUgsV0FBVztBQUNSLFdBQU8sR0FBRyxLQUFLLElBQUksSUFBSSxLQUFLLE1BQU07RUFDckM7QUFDSDtBQUVPLElBQU1DLEtBQU4sTUFBZ0Q7RUFBaEQsY0FBQTtBQUNKLFNBQU8sWUFBNkIsQ0FBQSxHQUNwQyxLQUFPLFNBQW1CLENBQUEsR0FDMUIsS0FBTyxTQUE0QjtFQUFBO0VBRW5DLElBQUksU0FBUztBQUNWLFdBQU8sS0FBSyxVQUFVLFNBQVM7RUFDbEM7RUFFQSxJQUFJLFNBQVM7QUFDVixXQUFPLEtBQUs7RUFDZjtFQUVBLFdBQVc7QUFDUixXQUFJLEtBQUssVUFBVSxTQUNULGNBQWMsS0FBSyxVQUFVLEtBQUssSUFBSSxDQUFDLEtBRzFDO0VBQ1Y7QUFDSDtBQ2hDTyxJQUFNQyxLQUFOLE1BQXdDO0VBQXhDLGNBQUE7QUFDSixTQUFPLGlCQUFpQjtNQUNyQixLQUFLLENBQUE7SUFBQyxHQUVULEtBQU8sVUFBVSxDQUFBLEdBQ2pCLEtBQU8sVUFBb0IsQ0FBQSxHQUMzQixLQUFPLFFBQWtCLENBQUEsR0FDekIsS0FBTyxZQUFtQyxDQUFBLEdBQzFDLEtBQU8sYUFBb0MsQ0FBQSxHQUMzQyxLQUFPLFVBQTZCO01BQ2pDLFNBQVM7TUFDVCxXQUFXO01BQ1gsWUFBWTtJQUFBO0VBQ2Y7QUFDSDtBQUVPLElBQU1DLEtBQU4sTUFBb0Q7RUFBcEQsY0FBQTtBQUNKLFNBQUEsU0FBUyxJQUNULEtBQUEsT0FBTztNQUNKLE9BQU87TUFDUCxRQUFRO0lBQUEsR0FFWCxLQUFBLFNBQVM7TUFDTixPQUFPO01BQ1AsUUFBUTtJQUFBLEdBRVgsS0FBQSxVQUFVO0VBQUE7RUFFVixXQUFXO0FBQ1IsV0FBTyxLQUFLO0VBQ2Y7QUFDSDtBQy9CQSxTQUFTQyxHQUNOQyxJQUNnQztBQUNoQyxTQUFRQSxHQUFlLFVBQVVBLEdBQWUsV0FBVztJQUN4RCxhQUFhO0lBQ2IsVUFBVTtJQUNWLGFBQWE7SUFDYixZQUFZO0lBQ1osUUFBUSxFQUFFLE9BQU8sR0FBRyxPQUFPLEVBQUE7SUFDM0IsT0FBTyxFQUFFLE9BQU8sR0FBRyxPQUFPLEVBQUE7RUFBRTtBQUVsQztBQUVBLFNBQVNDLEdBQWNDLElBQWdCO0FBQ3BDLFFBQU1sRyxJQUFRLFlBQVksS0FBS2tHLEVBQU0sR0FDL0JDLElBQVEsZUFBZSxLQUFLRCxFQUFNO0FBRXhDLFNBQU87SUFDSixPQUFPbk4sRUFBVWlILEtBQVNBLEVBQU0sQ0FBQyxLQUFNLEdBQUc7SUFDMUMsT0FBT2pILEVBQVVvTixLQUFTQSxFQUFNLENBQUMsS0FBTSxHQUFHO0VBQUE7QUFFaEQ7QUFFTyxJQUFNQyxLQUNWO0VBQ0csSUFBSUM7SUFDRDtJQUNBLENBQUN4SixJQUFRLENBQUNsSyxHQUFRcU4sQ0FBSyxNQUFNO0FBQzFCLFlBQU0vSixLQUFNdEQsRUFBTyxZQUFBLEdBQ2IyVCxJQUFjUCxHQUF3QmxKLEdBQU8sY0FBYztBQUVqRSxhQUFPLE9BQU95SixHQUFhLEVBQUUsQ0FBQ3JRLEVBQUcsR0FBRzhDLEVBQVNpSCxDQUFLLEVBQUEsQ0FBRztJQUN4RDtFQUFBO0VBRUgsSUFBSXFHO0lBQ0Q7SUFDQSxDQUFDeEosSUFBUSxDQUFDbEssR0FBUXFOLENBQUssTUFBTTtBQUMxQixZQUFNL0osS0FBTXRELEVBQU8sWUFBQSxHQUNiMlQsSUFBY1AsR0FBd0JsSixHQUFPLGNBQWM7QUFFakUsYUFBTyxPQUFPeUosR0FBYSxFQUFFLENBQUNyUSxFQUFHLEdBQUc4QyxFQUFTaUgsQ0FBSyxFQUFBLENBQUc7SUFDeEQ7RUFBQTtFQUVILElBQUlxRztJQUNEO0lBQ0EsQ0FBQ3hKLElBQVEsQ0FBQzBKLEdBQU9DLEdBQVFDLEVBQVUsTUFBTTtBQUN0QyxZQUFNQyxJQUFVWCxHQUF3QmxKLEdBQU8sY0FBYztBQUM3RDZKLFFBQVEsUUFBUVQsR0FBY00sQ0FBSyxHQUNuQ0csRUFBUSxTQUFTVCxHQUFjTyxDQUFNLEdBQ3JDRSxFQUFRLGFBQWEzTixFQUFTME4sRUFBVTtJQUMzQztFQUFBO0FBRU47QUE3QkksSUMxQkRwSCxLQUNIO0VBQ0csSUFBSWdILEdBQWlCLG9CQUFvQixDQUFDeEosSUFBUSxDQUFDcEssQ0FBSSxPQUNwRG9LLEdBQU8sZUFBZSxJQUFJLEtBQUtwSyxFQUFLLEtBQUEsQ0FBTSxHQUNuQyxNQUNUO0VBQ0QsR0FBRzJUO0VBQ0gsSUFBSUM7SUFDRCxDQUFDLG9DQUFvQyxxQkFBcUI7SUFDMUQsQ0FBQ3hKLElBQVEsQ0FBQzhKLENBQWMsTUFBTTtBQUMxQjlKLE1BQUFBLEdBQU8sZUFBNEMsaUJBQWlCOEo7SUFDeEU7RUFBQTtFQUVILElBQUlOO0lBQ0QsQ0FBQyw2Q0FBNkMscUJBQXFCO0lBQ25FLENBQUN4SixJQUFRLENBQUNtRCxHQUFPM00sR0FBU3VULEVBQUcsTUFBTTtBQUMvQi9KLE1BQUFBLEdBQU8sZUFBNEMsa0JBQWtCO1FBQ25FLE9BQU85RCxFQUFTaUgsQ0FBSztRQUNyQixTQUFBM007UUFDQSxLQUFBdVQ7TUFBQTtJQUVOO0VBQUE7QUFFTjtBQUVJLFNBQVNDLEdBQ2JDLElBQ0EvSixHQUNvQjtBQUNwQixTQUFPbUQsR0FBb0IsRUFBRSxnQkFBZ0IsSUFBSTZHLEdBQUFBLEVBQXFCLEdBQVUxSCxJQUFTdEMsQ0FBTTtBQUNsRztBQUVPLElBQU1nSyxLQUFOLE1BQXFEO0VBQXJELGNBQUE7QUFDSixTQUFnQixNQUFnQixDQUFBO0VBQUM7QUFDcEM7QUNoQ0EsSUFBTUMsS0FBb0I7QUFBMUIsSUFDTUMsS0FBZ0I7QUFEdEIsSUFFTUMsS0FBZTtBQUZyQixJQUlNN0gsS0FBb0M7RUFDdkMsSUFBSUMsR0FBVzBILElBQW1CLENBQUNuSyxJQUFRLENBQUMvRyxHQUFNK0osR0FBWUMsRUFBUyxNQUFNO0FBQzFFakQsSUFBQUEsR0FBTyxNQUFNLEtBQUsvRyxDQUFJLEdBRWxCK0osTUFDRGhELEdBQU8sV0FBVy9HLENBQUksSUFBSStKLEVBQVcsU0FHcENDLE9BQ0RqRCxHQUFPLFVBQVUvRyxDQUFJLElBQUlnSyxHQUFVO0VBRXpDLENBQUM7RUFDRCxJQUFJUixHQUFXMkgsSUFBZSxDQUFDcEssSUFBUSxDQUFDK0MsR0FBQSxFQUFXQyxHQUFBLEVBQWNDLEVBQVMsTUFDbkVELE1BQWUsVUFBYUMsT0FBYyxVQUMzQ2pELEdBQU8sUUFBUSxVQUFVLENBQUMrQyxLQUFXLEdBQ3JDL0MsR0FBTyxRQUFRLGFBQWEsQ0FBQ2dELEtBQWMsR0FDM0NoRCxHQUFPLFFBQVEsWUFBWSxDQUFDaUQsTUFBYSxHQUNsQyxRQUVILEtBQ1Q7RUFDRCxJQUFJUixHQUFXNEgsSUFBYyxDQUFDckssSUFBUSxDQUFDbEssR0FBUW1ELENBQUksTUFBTTtBQUN0RHdCLElBQUFBLEdBQU91RixHQUFPLE9BQU8vRyxDQUFJLEdBQ3pCd0IsR0FBTzNFLE1BQVcsV0FBV2tLLEdBQU8sVUFBVUEsR0FBTyxTQUFTL0csQ0FBSTtFQUNyRSxDQUFDO0FBQ0o7QUE3QkEsSUErQk1xUixLQUErQztFQUNsRCxJQUFJN0gsR0FBVyxpQkFBaUIsQ0FBQ3pDLElBQVEsQ0FBQ3VLLENBQU0sTUFBQTtBQUFZdkssSUFBQUEsR0FBTyxTQUFTdUs7RUFBQSxDQUFPO0VBQ25GLElBQUk5SCxHQUFXLGtCQUFrQixDQUFDekMsSUFBUSxDQUFDNUMsQ0FBTyxNQUFBO0FBQVk0QyxJQUFBQSxHQUFPLFVBQVU1QztFQUFBLENBQVE7RUFDdkYsSUFBSXFGO0lBQ0Q7SUFDQSxDQUFDekMsSUFBUSxDQUFDd0ssR0FBV0MsR0FBWUMsSUFBYUMsQ0FBWSxNQUFNO0FBQzdEM0ssTUFBQUEsR0FBTyxPQUFPLFFBQVEwSyxJQUN0QjFLLEdBQU8sS0FBSyxRQUFRd0ssR0FDcEJ4SyxHQUFPLE9BQU8sU0FBUzJLLEdBQ3ZCM0ssR0FBTyxLQUFLLFNBQVN5SztJQUN4QjtFQUFBO0FBRU47QUEzQ0EsSUE2Q2FHLEtBQWtELENBQUN0TyxJQUFRNEQsTUFDOURtRCxHQUFvQixJQUFJMkYsR0FBQSxHQUFleEcsSUFBUyxDQUFDbEcsSUFBUTRELENBQU0sQ0FBQztBQTlDMUUsSUFpRGEySyxLQUFrRCxDQUFDdk8sSUFBUTRELE1BQzlELE9BQU87RUFDWCxJQUFJOEksR0FBQTtFQUNKNEIsR0FBZ0J0TyxJQUFRNEQsQ0FBTTtFQUM5QjhKLEdBQW9DMU4sSUFBUTRELENBQU07QUFBQTtBQUlqRCxTQUFTNEssR0FBcUJ4TyxJQUFnQjRELEdBQWdCO0FBQ2xFLFFBQU02SyxJQUFZMUgsR0FBb0IsSUFBSTRGLEdBQUEsR0FBcUJxQixJQUFjLENBQUNoTyxJQUFRNEQsQ0FBTSxDQUFDO0FBRTdGLFNBQU82SyxFQUFVLFdBQVdBO0FBQy9CO0FDN0RBLElBQU12SSxLQUFxQztFQUN4QyxJQUFJQyxHQUFXLHlCQUF5QixDQUFDak0sSUFBUyxDQUFDd1UsQ0FBUyxNQUFNO0FBQy9EeFUsSUFBQUEsR0FBUSxPQUFPLEtBQUt3VSxDQUFTO0VBQ2hDLENBQUM7RUFDRCxJQUFJdkksR0FBVyxpREFBaUQsQ0FBQ2pNLElBQVMsQ0FBQ2lLLEdBQVF4SCxDQUFJLE1BQU07QUFDMUZ6QyxJQUFBQSxHQUFRLFVBQVUsS0FBSyxJQUFJcVMsR0FBcUJwSSxHQUFReEgsQ0FBSSxDQUFDO0VBQ2hFLENBQUM7RUFDRCxJQUFJd0o7SUFDRDtJQUNBLENBQUNqTSxJQUFTLENBQUNpSyxHQUFReEgsR0FBTWdTLEVBQVMsTUFBTTtBQUNyQ3pVLE1BQUFBLEdBQVEsVUFBVSxLQUFLLElBQUlxUyxHQUFxQnBJLEdBQVF4SCxHQUFNLEVBQUUsV0FBQWdTLEdBQUEsQ0FBVyxDQUFDO0lBQy9FO0VBQUE7RUFFSCxJQUFJeEksR0FBVyx5QkFBeUIsQ0FBQ2pNLElBQVMsQ0FBQ2lLLENBQU0sTUFBTTtBQUM1RGpLLElBQUFBLEdBQVEsVUFBVSxLQUFLLElBQUlxUyxHQUFxQnBJLEdBQVEsSUFBSSxDQUFDO0VBQ2hFLENBQUM7RUFDRCxJQUFJZ0MsR0FBVyxvQ0FBb0MsQ0FBQ2pNLElBQVMsQ0FBQ3dKLENBQU0sTUFBTTtBQUN2RXhKLElBQUFBLEdBQVEsU0FBU3dKO0VBQ3BCLENBQUM7QUFDSjtBQW5CQSxJQXdCYWtMLEtBQW9ELENBQUM1TyxJQUFRNEQsTUFDaEUsT0FBTyxPQUFPaUwsR0FBaUI3TyxFQUFjLEdBQUd1TyxHQUFnQnZPLElBQVE0RCxDQUFNLENBQUM7QUF6QnpGLElBZ0NhaUwsS0FBb0QsQ0FBQzdPLE9BQ3hEK0csR0FBb0IsSUFBSTBGLEdBQUFBLEdBQXNCdkcsSUFBU2xHLEVBQU07QUNqQ2hFLFNBQVM4TyxHQUFVblQsSUFBMkQ7QUFDbEYsU0FBS0EsR0FBVyxTQUlUO0lBQ0osVUFBVSxDQUFDLFNBQVMsR0FBR0EsRUFBVTtJQUNqQyxRQUFRO0lBQ1IsT0FBT3FFLEdBQVE0RCxHQUFxQjtBQUNqQyxZQUFNbUwsS0FBUUgsR0FBaUI1TyxHQUFRNEQsQ0FBTTtBQUM3QyxVQUFJbUwsR0FBTTtBQUNQLGNBQU0sSUFBSUMsR0FBaUJELEVBQUs7QUFHbkMsYUFBT0E7SUFDVjtFQUFBLElBYk90VSxHQUF1Qix3Q0FBd0M7QUFlNUU7QUNiQSxTQUFTd1UsR0FBcUJDLElBQWVqQixHQUFnQmpFLEdBQXNDO0FBQ2hHLFFBQU1OLEtBQVVNLEVBQU8sU0FBUyxTQUFTLEdBQ25DbUYsSUFBTW5GLEVBQU8sU0FBUyxLQUFLLEtBQUssY0FBYyxLQUFLa0YsRUFBSyxHQUN4REUsS0FBaUIsQ0FBQ3BGLEVBQU8sU0FBUyxLQUFLO0FBRTdDLFNBQU87SUFDSixTQUFBTjtJQUNBLEtBQUF5RjtJQUNBLFFBQVEsQ0FBQ0E7SUFDVCxLQUFLLENBQUNDO0lBQ04sZ0JBQUFBO0lBQ0EsT0FBQUY7SUFDQSxRQUFBakI7RUFBQTtBQUVOO0FBRUEsSUFBTS9ILEtBQW9DO0VBQ3ZDLElBQUlDLEdBQVcscUJBQXFCLENBQUN6QyxJQUFRLENBQUNpQyxDQUFJLE1BQU07QUFDckRqQyxJQUFBQSxHQUFPLE9BQU9pQztFQUNqQixDQUFDO0VBQ0QsSUFBSVEsR0FBVyx1Q0FBdUMsQ0FBQ3pDLElBQVEsQ0FBQ3dMLENBQUssTUFBTTtBQUN4RXhMLElBQUFBLEdBQU8sTUFBTTtNQUNWLEdBQUlBLEdBQU8sT0FBTyxDQUFBO01BQ2xCLE9BQUF3TDtJQUFBO0VBRU4sQ0FBQztFQUNELElBQUkvSSxHQUFXLHFDQUFxQyxDQUFDekMsSUFBUSxDQUFDd0wsR0FBT2pCLEdBQVFvQixFQUFJLE1BQU07QUFDcEYzTCxJQUFBQSxHQUFPLE9BQU8sS0FBS3VMLEdBQXFCQyxHQUFPakIsR0FBUW9CLEVBQUksQ0FBQztFQUMvRCxDQUFDO0VBQ0QsSUFBSWxKO0lBQ0Q7SUFDQSxDQUFDekMsSUFBUSxDQUFDd0wsR0FBT2pCLEdBQVFxQixFQUFVLE1BQU07QUFDdEM1TCxNQUFBQSxHQUFPLFNBQVM7UUFDYixHQUFJQSxHQUFPLFVBQVUsQ0FBQTtRQUNyQixPQUFBd0w7UUFDQSxRQUFBakI7UUFDQSxZQUFBcUI7TUFBQTtJQUVOO0VBQUE7RUFFSCxJQUFJbko7SUFDRDtJQUNBLENBQUN6QyxJQUFRLENBQUN3TCxHQUFPakIsR0FBUS9ELElBQU12SixDQUFFLE1BQU07QUFDcEMrQyxNQUFBQSxHQUFPLFNBQVM7UUFDYixNQUFNO1VBQ0gsT0FBQXdMO1VBQ0EsUUFBQWpCO1FBQUE7UUFFSCxNQUFNO1VBQ0gsTUFBQS9EO1VBQ0EsSUFBQXZKO1FBQUE7TUFDSDtJQUVOO0VBQUE7QUFFTjtBQXZDQSxJQXlDYTRPLEtBQWtELENBQUN2UCxJQUFRNEQsTUFBVztBQUNoRixRQUFNNEwsSUFBYUMsR0FBZ0J6UCxJQUFRNEQsQ0FBTSxHQUMzQzhMLEtBQWlCaEMsR0FBOEMxTixJQUFRNEQsQ0FBTTtBQUVuRixTQUFPO0lBQ0osR0FBRzRMO0lBQ0gsR0FBR0U7RUFBQTtBQUVUO0FBakRBLElBbURhRCxLQUFrRCxDQUFDelAsSUFBUTRELE1BQzlEbUQsR0FBb0IsRUFBRSxRQUFRLENBQUEsRUFBQyxHQUFLYixJQUFTLENBQUNsRyxJQUFRNEQsQ0FBTSxDQUFDO0FDdkVoRSxTQUFTK0wsR0FBYUMsS0FBZSxDQUFBLEdBQUlqVSxHQUE4QztBQUMzRixTQUFBd0MsR0FBT3hDLEdBQVksUUFBUSxHQUNwQmtVLEdBQVNELElBQUtqVSxDQUFVO0FBQ2xDO0FBRU8sU0FBU2tVLEdBQVNELEtBQWUsQ0FBQSxHQUFJalUsR0FBOEM7QUFDdkYsUUFBTWYsSUFBVyxDQUFDLFFBQVEsR0FBR2UsQ0FBVTtBQUN2QyxTQUFJaVUsR0FBSSxVQUNMaFYsRUFBUyxPQUFPLEdBQUcsR0FBR2dWLEdBQUksTUFBTSxHQUUvQkEsR0FBSSxVQUNMaFYsRUFBUyxPQUFPLEdBQUcsR0FBR2dWLEdBQUksTUFBTSxHQUduQ3RLLEdBQU8xSyxHQUFVLElBQUksR0FDckJ1RCxHQUFPdkQsR0FBVSxXQUFXLEdBQzVCdUQsR0FBT3ZELEdBQVUsYUFBYSxHQUV2QjtJQUNKLFVBQUFBO0lBQ0EsUUFBUTtJQUFBLFFBQ1J2QjtFQUFBO0FBRU47QUN6QkEsU0FBQXlXLEtBQW1FO0FBQ2hFLFNBQU87SUFDSixhQUErQjtBQUM1QixZQUFNbFYsS0FBVyxDQUFDLFFBQVEsR0FBR21GLEdBQW1CLFdBQVcsQ0FBQyxDQUFDO0FBQzdELGFBQUtuRixHQUFTLFNBQVMsVUFBVSxLQUM5QkEsR0FBUyxPQUFPLEdBQUcsR0FBRyxVQUFVLEdBRzVCLEtBQUs7UUFDVEUsR0FBMEJGLEVBQVE7UUFDbEMyRCxFQUF5QixTQUFTO01BQUE7SUFFeEM7SUFFQSxPQUF5QjtBQUN0QixZQUFNM0QsS0FBVyxDQUFDLFFBQVEsR0FBR21GLEdBQW1CLFdBQVcsQ0FBQyxDQUFDO0FBQzdELGFBQU8sS0FBSztRQUNUcEYsRUFBMEJDLEVBQVE7UUFDbEMyRCxFQUF5QixTQUFTO01BQUE7SUFFeEM7RUFBQTtBQUVOO0FDekJPLElBQU13UixLQUFnQjtBQUV0QixJQUFNQyxLQUFOLE1BQW9EO0VBR3hELFlBQ1VyVyxHQUNBK08sR0FDQXVILElBQ1I7QUFDQyxRQUpPLEtBQUEsT0FBQXRXLEdBQ0EsS0FBQSxRQUFBK08sR0FDQSxLQUFBLGNBQUF1SCxJQUVIdkgsTUFBVSxPQUFPdUgsT0FBZ0IsS0FBSztBQUN2QyxZQUFNQyxJQUFTSCxHQUFjLEtBQUtwVyxDQUFJLEtBQUssQ0FBQyxNQUFNQSxHQUFNQSxDQUFJO0FBQzVELFdBQUssT0FBT3VXLEVBQU8sQ0FBQyxLQUFLLElBQ3pCLEtBQUssT0FBT0EsRUFBTyxDQUFDLEtBQUs7SUFDNUI7RUFDSDtBQUNIO0FDWk8sSUFBTUMsS0FBTixNQUE0QztFQUE1QyxjQUFBO0FBQ0osU0FBTyxZQUFZLENBQUEsR0FDbkIsS0FBTyxhQUFhLENBQUEsR0FDcEIsS0FBTyxVQUFVLENBQUEsR0FDakIsS0FBTyxVQUFVLENBQUEsR0FDakIsS0FBTyxVQUFVLFFBQ2pCLEtBQU8sV0FBVyxDQUFBLEdBQ2xCLEtBQU8sVUFBVSxDQUFBLEdBQ2pCLEtBQU8sUUFBUSxDQUFBLEdBQ2YsS0FBTyxTQUFTLENBQUEsR0FDaEIsS0FBTyxRQUFRLEdBQ2YsS0FBTyxTQUFTLEdBQ2hCLEtBQU8sVUFBVSxNQUNqQixLQUFPLFdBQVcsTUFDbEIsS0FBTyxXQUFXLE9BRWxCLEtBQU8sVUFBVSxNQUNQLENBQUMsS0FBSyxNQUFNO0VBQ3RCO0FBQ0g7QUFjQSxTQUFTQyxHQUFZL1YsSUFBYztBQUNoQyxRQUFNLENBQUNzRyxHQUFJdUosQ0FBSSxJQUFJN1AsR0FBSyxNQUFNc0YsRUFBSTtBQUVsQyxTQUFPO0lBQ0osTUFBTXVLLEtBQVF2SjtJQUNkLElBQUFBO0VBQUE7QUFFTjtBQUVBLFNBQVN0SCxHQUNOZ1gsSUFDQUMsR0FDQUMsR0FDMkI7QUFDM0IsU0FBTyxDQUFDLEdBQUdGLEVBQU0sR0FBR0MsQ0FBTSxJQUFJQyxDQUFPO0FBQ3hDO0FBRUEsU0FBU0MsR0FBVUgsT0FBZ0NDLEdBQStCO0FBQy9FLFNBQU9BLEVBQU8sSUFBSSxDQUFDRyxNQUFNcFgsR0FBT2dYLElBQVFJLEdBQUcsQ0FBQy9NLElBQVEvRyxNQUFTK0csR0FBTyxXQUFXLEtBQUsvRyxDQUFJLENBQUMsQ0FBQztBQUM3RjtBQUVBLElBQU11SixLQUF5QyxJQUFJLElBQUk7RUFDcEQ3TTtJQUFPO0lBQTBCO0lBQTJCLENBQUNxSyxJQUFRL0csTUFDbEUrRyxHQUFPLFFBQVEsS0FBSy9HLENBQUk7RUFBQTtFQUUzQnREO0lBQU87SUFBMEI7SUFBNkIsQ0FBQ3FLLElBQVEvRyxNQUNwRStHLEdBQU8sUUFBUSxLQUFLL0csQ0FBSTtFQUFBO0VBRTNCdEQ7SUFBTztJQUEwQjtJQUE4QixDQUFDcUssSUFBUS9HLE1BQ3JFK0csR0FBTyxTQUFTLEtBQUsvRyxDQUFJO0VBQUE7RUFHNUJ0RCxHQUFPLEtBQTJCLEtBQTBCLENBQUNxSyxJQUFRL0csTUFBUztBQUMzRStHLElBQUFBLEdBQU8sUUFBUSxLQUFLL0csQ0FBSSxHQUN4QitHLEdBQU8sT0FBTyxLQUFLL0csQ0FBSTtFQUMxQixDQUFDO0VBQ0R0RCxHQUFPLEtBQTJCLEtBQThCLENBQUNxSyxJQUFRL0csTUFBUztBQUMvRStHLElBQUFBLEdBQU8sUUFBUSxLQUFLL0csQ0FBSSxHQUN4QitHLEdBQU8sT0FBTyxLQUFLL0csQ0FBSSxHQUN2QitHLEdBQU8sU0FBUyxLQUFLL0csQ0FBSTtFQUM1QixDQUFDO0VBRUR0RCxHQUFPLEtBQTZCLEtBQTBCLENBQUNxSyxJQUFRL0csTUFBUztBQUM3RStHLElBQUFBLEdBQU8sUUFBUSxLQUFLL0csQ0FBSSxHQUN4QitHLEdBQU8sT0FBTyxLQUFLL0csQ0FBSTtFQUMxQixDQUFDO0VBRUR0RCxHQUFPLEtBQThCLEtBQTBCLENBQUNxSyxJQUFRL0csTUFBUztBQUM5RStHLElBQUFBLEdBQU8sU0FBUyxLQUFLL0csQ0FBSSxHQUN6QitHLEdBQU8sT0FBTyxLQUFLL0csQ0FBSTtFQUMxQixDQUFDO0VBQ0R0RCxHQUFPLEtBQThCLEtBQThCLENBQUNxSyxJQUFRL0csTUFBUztBQUNsRitHLElBQUFBLEdBQU8sU0FBUyxLQUFLL0csQ0FBSSxHQUN6QitHLEdBQU8sT0FBTyxLQUFLL0csQ0FBSTtFQUMxQixDQUFDO0VBRUR0RCxHQUFPLEtBQTZCLEtBQTBCLENBQUNxSyxJQUFRL0csTUFBUztBQUM3RStHLElBQUFBLEdBQU8sUUFBUSxLQUFLME0sR0FBWXpULENBQUksQ0FBQztFQUN4QyxDQUFDO0VBQ0R0RCxHQUFPLEtBQTZCLEtBQThCLENBQUNxSyxJQUFRL0csTUFBUztBQUNqRixVQUFNK1QsSUFBVU4sR0FBWXpULENBQUk7QUFDaEMrRyxJQUFBQSxHQUFPLFFBQVEsS0FBS2dOLENBQU8sR0FDM0JoTixHQUFPLFNBQVMsS0FBS2dOLEVBQVEsRUFBRTtFQUNsQyxDQUFDO0VBQ0RyWCxHQUFPLEtBQTZCLEtBQTZCLENBQUNzWCxJQUFTQyxNQUFVO0FBQ2xGLEtBQUNELEdBQVEsVUFBVUEsR0FBUSxXQUFXLENBQUEsR0FBSSxLQUFLQyxDQUFLO0VBQ3ZELENBQUM7RUFFRHZYO0lBQU87SUFBK0I7SUFBK0IsQ0FBQ3FLLElBQVEvRyxNQUMzRStHLEdBQU8sVUFBVSxLQUFLL0csQ0FBSTtFQUFBO0VBRzdCLEdBQUc2VDtJQUFVO0lBQTJCO0lBQTJCOztFQUFBO0VBQ25FLEdBQUdBO0lBQ0E7SUFDQTtJQUNBOztFQUFBO0VBRUgsR0FBR0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTs7RUFBQTtFQUdIO0lBQ0c7SUFDQSxDQUFDOU0sSUFBUXJKLE1BQVM7QUFDZixZQUFNd1csSUFBVyxlQUNYQyxLQUFZLGdCQUNaQyxJQUFhLDRCQUNiQyxLQUFjLGNBQ2RDLElBQW1CO0FBRXpCLFVBQUlDLElBQWNMLEVBQVMsS0FBS3hXLENBQUk7QUFDcENxSixNQUFBQSxHQUFPLFFBQVN3TixLQUFlLENBQUNBLEVBQVksQ0FBQyxLQUFNLEdBRW5EQSxJQUFjSixHQUFVLEtBQUt6VyxDQUFJLEdBQ2pDcUosR0FBTyxTQUFVd04sS0FBZSxDQUFDQSxFQUFZLENBQUMsS0FBTSxHQUVwREEsSUFBY0gsRUFBVyxLQUFLMVcsQ0FBSSxHQUNsQ3FKLEdBQU8sVUFBVTdCLEVBQVdxUCx1QkFBYyxJQUFJcFAsR0FBYyxJQUFJLEdBRWhFb1AsSUFBY0YsR0FBWSxLQUFLM1csQ0FBSSxHQUNuQ3FKLEdBQU8sV0FBVzdCLEVBQVdxUCx1QkFBYyxJQUFJcFAsR0FBYyxJQUFJLEdBRWpFb1AsSUFBY0QsRUFBaUIsS0FBSzVXLENBQUksR0FDcEM2VyxNQUNEeE4sR0FBTyxVQUFVN0IsRUFBV3FQLHVCQUFjLElBQUlwUCxHQUFjNEIsR0FBTyxPQUFPLElBRzdFQSxHQUFPLFdBQVcsZ0JBQWdCLEtBQUtySixDQUFJO0lBQzlDO0VBQUE7QUFFTixDQUFDO0FBN0ZELElBK0ZhOFcsS0FBcUIsU0FBVTdYLElBQTRCO0FBQ3JFLFFBQU1vRSxJQUFRcEUsR0FBSyxNQUFNcUcsRUFBSSxHQUN2QnFLLElBQVMsSUFBSW1HLEdBQUE7QUFFbkIsV0FBU3hTLEtBQUksR0FBR3lULElBQUkxVCxFQUFNLFFBQVFDLEtBQUl5VCxLQUFLO0FBQ3hDLFFBQUkvVyxLQUFPcUQsRUFBTUMsSUFBRyxFQUFFLEtBQUE7QUFFakJ0RCxJQUFBQSxPQUlEQSxHQUFLLE9BQU8sQ0FBQyxNQUFNLFFBQ3BCQSxNQUFRc0YsTUFBUWpDLEVBQU1DLElBQUcsS0FBSyxNQUdqQzBULEdBQVVySCxHQUFRM1AsRUFBSTtFQUN6QjtBQUVBLFNBQU8yUDtBQUNWO0FBRUEsU0FBU3FILEdBQVUzTixJQUFzQjROLEdBQWlCO0FBQ3ZELFFBQU16VyxJQUFVeVcsRUFBUSxLQUFBO0FBQ3hCLFVBQVEsS0FBQTtJQUNMLEtBQUt6VyxFQUFRLE9BQU8sQ0FBQztBQUNsQixhQUFPa0ssR0FBS2xLLEVBQVEsT0FBTyxDQUFDLEdBQUdBLEVBQVEsT0FBTyxDQUFDLEdBQUdBLEVBQVEsTUFBTSxDQUFDLENBQUM7SUFDckUsS0FBS0EsRUFBUSxPQUFPLENBQUM7QUFDbEIsYUFBT2tLLEdBQUssS0FBMEJsSyxFQUFRLE9BQU8sQ0FBQyxHQUFHQSxFQUFRLE1BQU0sQ0FBQyxDQUFDO0lBQzVFO0FBQ0c7RUFBQTtBQUdOLFdBQVNrSyxHQUFLMkQsR0FBZTZJLElBQW9CNVgsR0FBYztBQUM1RCxVQUFNNEosSUFBTSxHQUFHbUYsQ0FBSyxHQUFHNkksRUFBVSxJQUMzQmhCLEtBQVVySyxHQUFRLElBQUkzQyxDQUFHO0FBRTNCZ04sSUFBQUEsTUFDREEsR0FBUTdNLElBQVEvSixDQUFJLEdBR25CNEosTUFBUSxRQUFRQSxNQUFRLFFBQ3pCRyxHQUFPLE1BQU0sS0FBSyxJQUFJc00sR0FBa0JyVyxHQUFNK08sR0FBTzZJLEVBQVUsQ0FBQztFQUV0RTtBQUNIO0FDbk1BLElBQU1DLEtBQWlCLENBQUMsVUFBVSxJQUFJO0FBRS9CLFNBQVNDLEdBQVc5VixJQUFnRDtBQVV4RSxTQUFPO0lBQ0osUUFBUTtJQUNSLFVBWGM7TUFDZDtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0EsR0FBR0EsR0FBVyxPQUFPLENBQUMrVixNQUFRLENBQUNGLEdBQWUsU0FBU0UsQ0FBRyxDQUFDO0lBQUE7SUFNM0QsT0FBT3BZLEdBQWM7QUFDbEIsYUFBTzZYLEdBQW1CN1gsQ0FBSTtJQUNqQztFQUFBO0FBRU47QUNYQSxJQUFNcVksS0FBZ0I7QUFFdEIsU0FBU0MsR0FDTkMsS0FBUSxHQUNSQyxJQUFRLEdBQ1JDLElBQXlCLEdBQ3pCQyxLQUFRLElBQ1JDLElBQVksTUFDRTtBQUNkLFNBQU8sT0FBTztJQUNYO01BQ0csT0FBQUo7TUFDQSxPQUFBQztNQUNBLE9BQUFDO01BQ0EsT0FBQUM7TUFDQSxXQUFBQztJQUFBO0lBRUg7SUFDQTtNQUNHLFFBQVE7QUFDTCxlQUFPLEdBQUcsS0FBSyxLQUFLLElBQUksS0FBSyxLQUFLLElBQUksS0FBSyxLQUFLO01BQ25EO01BQ0EsY0FBYztNQUNkLFlBQVk7SUFBQTtFQUNmO0FBRU47QUFFQSxTQUFTQyxLQUF1QjtBQUM3QixTQUFPTixHQUFnQixHQUFHLEdBQUcsR0FBRyxJQUFJLEtBQUs7QUFDNUM7QUFFQSxTQUFBTyxLQUF1RDtBQUNwRCxTQUFPO0lBQ0osVUFBNEI7QUFDekIsYUFBTyxLQUFLLFNBQVM7UUFDbEIsVUFBVSxDQUFDLFdBQVc7UUFDdEIsUUFBUTtRQUNSLFFBQVFDO1FBQ1IsUUFBUTFPLElBQVExSyxHQUFPQyxHQUFNQyxJQUFNO0FBQ2hDLGNBQUl3SyxHQUFPLGFBQWF2SyxHQUFVO0FBQy9CLG1CQUFPRixFQUFLLE9BQU8sS0FBSzBZLEVBQWEsQ0FBQztBQUd6Q3pZLFVBQUFBLEdBQUtGLENBQUs7UUFDYjtNQUFBLENBQ0Y7SUFDSjtFQUFBO0FBRU47QUFFQSxJQUFNa04sS0FBdUM7RUFDMUMsSUFBSUM7SUFDRDtJQUNBLENBQUN6QyxJQUFRLENBQUNtTyxHQUFPQyxHQUFPQyxJQUFPQyxJQUFRLEVBQUUsTUFBTTtBQUM1QyxhQUFPO1FBQ0p0TztRQUNBa08sR0FBZ0JoUyxFQUFTaVMsQ0FBSyxHQUFHalMsRUFBU2tTLENBQUssR0FBR2xTLEVBQVNtUyxFQUFLLEdBQUdDLENBQUs7TUFBQTtJQUU5RTtFQUFBO0VBRUgsSUFBSTdMO0lBQ0Q7SUFDQSxDQUFDekMsSUFBUSxDQUFDbU8sR0FBT0MsR0FBT0MsSUFBT0MsSUFBUSxFQUFFLE1BQU07QUFDNUMsYUFBTyxPQUFPdE8sSUFBUWtPLEdBQWdCaFMsRUFBU2lTLENBQUssR0FBR2pTLEVBQVNrUyxDQUFLLEdBQUdDLElBQU9DLENBQUssQ0FBQztJQUN4RjtFQUFBO0FBRU47QUFFQSxTQUFTSSxHQUFjcFMsSUFBZ0I7QUFDcEMsU0FBSUEsT0FBVzJSLEtBQ0xPLEdBQUEsSUFHSG5MLEdBQW9CNkssR0FBZ0IsR0FBRyxHQUFHLEdBQUc1UixFQUFNLEdBQUdrRyxJQUFTbEcsRUFBTTtBQUMvRTtBQ3JETyxJQUFNcVMsS0FBTixNQUE0QztFQUNoRCxZQUFvQnZQLEdBQThCO0FBQTlCLFNBQUEsWUFBQUE7RUFBK0I7RUFFekMsU0FBWTdILEdBQXdCNkUsR0FBaUM7QUFDNUUsVUFBTXdTLEtBQVEsS0FBSyxVQUFVLE1BQUEsR0FDdkJDLElBQVVELEdBQU0sS0FBS3JYLENBQUk7QUFFL0IsV0FBSTZFLEtBQ0Q2RSxHQUFhMUosR0FBTXNYLEdBQVN6UyxDQUFJLEdBRzVCLE9BQU8sT0FBTyxNQUFNO01BQ3hCLE1BQU0sRUFBRSxPQUFPeVMsRUFBUSxLQUFLLEtBQUtBLENBQU8sRUFBQTtNQUN4QyxPQUFPLEVBQUUsT0FBT0EsRUFBUSxNQUFNLEtBQUtBLENBQU8sRUFBQTtNQUMxQyxXQUFXLEVBQUUsT0FBT0QsR0FBQTtJQUFNLENBQzVCO0VBQ0o7RUFFQSxJQUFJckwsR0FBMEI7QUFDM0IsV0FBTyxLQUFLO01BQ1R0TSxFQUEwQixDQUFDLE9BQU8sR0FBR3lNLEVBQVFILENBQUssQ0FBQyxDQUFDO01BQ3BEMUksRUFBeUIsU0FBUztJQUFBO0VBRXhDO0VBRUEsSUFBSTBHLEdBQXNEO0FBQ3ZELFVBQU1pQyxJQUFPM0ksRUFBeUIsU0FBUztBQUUvQyxXQUFJLE9BQU8wRyxLQUFjLFdBQ2YsS0FBSyxTQUFTRCxHQUEyQkMsR0FBVyxLQUFLLFNBQVMsR0FBR2lDLENBQUksSUFHL0UsUUFBT2pDLHVCQUFXLFNBQVMsV0FDckIsS0FBSztNQUNURDtRQUNHQyxFQUFVO1FBQ1RBLEVBQVUsUUFBUSxLQUFLLGFBQWM7TUFBQTtNQUV6Q2lDO0lBQUEsSUFJQyxLQUFLO01BQ1R6TSxHQUF1Qix3REFBd0Q7TUFDL0V5TTtJQUFBO0VBRU47RUFFQSxXQUFXdk4sR0FBY2tPLEdBQTBCO0FBQ2hELFdBQU8sS0FBSztNQUNURCxHQUFlak8sR0FBTWtPLE1BQVUsSUFBSTtNQUNuQ3RKLEVBQXlCLFNBQVM7SUFBQTtFQUV4QztFQUVBLEtBQUt3SixHQUEwQjtBQUM1QixXQUFPLEtBQUs7TUFDVFMsR0FBU1QsTUFBUyxNQUFNLEtBQUssVUFBVSxLQUFLaEksR0FBbUIsU0FBUyxDQUFDO01BQ3pFeEIsRUFBeUIsU0FBUztJQUFBO0VBRXhDO0VBRUEsUUFBUTtBQUNMLFdBQU8sS0FBSztNQUNUdVEsR0FBVS9PLEdBQW1CLFNBQVMsQ0FBQztNQUN2Q3hCLEVBQXlCLFNBQVM7SUFBQTtFQUV4QztFQUVBLFlBQVkwUCxHQUFnQjdILEdBQWdCO0FBQ3pDLFdBQU10RSxFQUFhbU0sQ0FBTSxLQUFLbk0sRUFBYXNFLENBQU0sSUFRMUMsS0FBSztNQUNUMEksR0FBVSxDQUFDYixHQUFRN0gsR0FBUSxHQUFHckcsR0FBbUIsU0FBUyxDQUFDLENBQUM7TUFDNUR4QixFQUF5QixXQUFXLEtBQUs7SUFBQSxJQVRsQyxLQUFLO01BQ1Q5RDtRQUNHO01BQUE7SUFDSDtFQVFUO0VBRUEsY0FBYzhWLEdBQXdCO0FBQ25DLFdBQUEsS0FBSyxVQUFVLGdCQUFnQkEsR0FDeEI7RUFDVjtFQUVBLE9BQU87QUFDSixVQUFNdFYsSUFBTzRVO01BQ1Y7UUFDRyxRQUFRaE8sRUFBVyxVQUFVLENBQUMsR0FBR0MsQ0FBWTtRQUM3QyxRQUFRRCxFQUFXLFVBQVUsQ0FBQyxHQUFHQyxDQUFZO01BQUE7TUFFaEQvQixHQUFtQixTQUFTO0lBQUE7QUFHL0IsV0FBTyxLQUFLLFNBQVM5RSxHQUFNc0QsRUFBeUIsU0FBUyxDQUFDO0VBQ2pFO0VBRUEsUUFBUTtBQUNMLFdBQU8sS0FBSztNQUNUNUQsRUFBMEIsQ0FBQyxTQUFTLEdBQUdvRixHQUFtQixTQUFTLENBQUMsQ0FBQztNQUNyRXhCLEVBQXlCLFNBQVM7SUFBQTtFQUV4QztFQUVBLFNBQVM7QUFDTixXQUFPLEtBQUs7TUFDVGtULEdBQVcxUixHQUFtQixTQUFTLENBQUM7TUFDeEN4QixFQUF5QixTQUFTO0lBQUE7RUFFeEM7QUFDSDtBQUVBLE9BQU87RUFDSjhULEdBQWE7RUFDYjlNLEdBQUE7RUFDQVUsR0FBQTtFQUNBSSxHQUFBO0VBQ0FuSixHQUFBO0VBQ0F3SyxHQUFBO0VBQ0FDLEdBQUE7RUFDQXJJLEdBQUE7RUFDQXFKLEdBQUE7RUFDQXlELEdBQUE7RUFDQTBELEdBQUE7RUFDQXFDLEdBQUE7QUFDSDtBQ3pKQSxJQUFNSyxLQUE0Qyx1QkFBTTtBQUNyRCxNQUFJQyxLQUFLO0FBQ1QsU0FBTyxNQUFNO0FBQ1ZBLElBQUFBO0FBQ0EsVUFBTSxFQUFFLFNBQUFGLEdBQVMsTUFBQXRaLEVBQUEsUUFBU3laLHdCQUFBQSxnQkFBQTtBQUUxQixXQUFPO01BQ0osU0FBQUg7TUFDQSxNQUFBdFo7TUFDQSxJQUFBd1o7SUFBQTtFQUVOO0FBQ0gsR0FBQTtBQUVPLElBQU1FLEtBQU4sTUFBZ0I7RUFLcEIsWUFBb0JDLElBQWMsR0FBRztBQUFqQixTQUFBLGNBQUFBLEdBSnBCLEtBQVEsU0FBU3ZSLEdBQWEsSUFBSSxXQUFXLEdBQzdDLEtBQVEsVUFBMkIsQ0FBQSxHQUNuQyxLQUFRLFVBQTJCLENBQUEsR0FHaEMsS0FBSyxPQUFPLCtCQUErQnVSLENBQVc7RUFDekQ7RUFFUSxXQUFXO0FBQ2hCLFFBQUksQ0FBQyxLQUFLLFFBQVEsVUFBVSxLQUFLLFFBQVEsVUFBVSxLQUFLLGFBQWE7QUFDbEUsV0FBSztRQUNGO1FBQ0EsS0FBSyxRQUFRO1FBQ2IsS0FBSyxRQUFRO1FBQ2IsS0FBSztNQUFBO0FBRVI7SUFDSDtBQUVBLFVBQU0zWCxJQUFPa0QsR0FBTyxLQUFLLFNBQVMsS0FBSyxRQUFRLE1BQUEsQ0FBUTtBQUN2RCxTQUFLLE9BQU8sb0JBQW9CbEQsRUFBSyxFQUFFLEdBQ3ZDQSxFQUFLLEtBQUssTUFBTTtBQUNiLFdBQUssT0FBTyxrQkFBa0JBLEVBQUssRUFBRSxHQUNyQ3FLLEdBQU8sS0FBSyxTQUFTckssQ0FBSSxHQUN6QixLQUFLLFNBQUE7SUFDUixDQUFDO0VBQ0o7RUFFQSxPQUEwQztBQUN2QyxVQUFNLEVBQUUsU0FBQXNYLEdBQVMsSUFBQUUsRUFBQSxJQUFPdFUsR0FBTyxLQUFLLFNBQVNxVSxHQUFBQSxDQUFxQjtBQUNsRSxXQUFBLEtBQUssT0FBTyxvQkFBb0JDLENBQUUsR0FFbEMsS0FBSyxTQUFBLEdBRUVGO0VBQ1Y7QUFDSDtBQzdCTyxTQUFTTSxHQUFlQyxJQUFtQm5YLEdBQTBDO0FBQ3pGLFNBQU9oQixFQUEwQixDQUFDLFNBQVMsR0FBR2dCLEdBQVksR0FBR21YLEVBQU8sQ0FBQztBQUN4RTtBQ2hDTyxJQUFLQyxLQUFBQSxrQkFBQUEsUUFDVEEsR0FBQSxVQUFVLEtBQ1ZBLEdBQUEsU0FBUyxLQUZBQSxLQUFBQSxNQUFBLENBQUEsQ0FBQTtBQUtMLElBQU1DLEtBQU4sTUFBbUQ7RUFBbkQsY0FBQTtBQUNKLFNBQU8sTUFBZ0IsQ0FBQSxHQUN2QixLQUFPLFdBQWlELENBQUEsR0FDeEQsS0FBTyxVQUFrQixJQUN6QixLQUFPLFdBQW9CO0VBQUE7RUFFM0IsS0FDR2hKLEdBQ0FpSixHQUNBaFMsSUFDQW9GLEdBQ0EvRSxJQUNEO0FBQ0swSSxVQUFXLFFBQ1osS0FBSyxXQUFXaUosR0FDaEIsS0FBSyxVQUFVaFMsS0FHbEIsS0FBSyxJQUFJLEtBQUtBLEVBQUksR0FDbEIsS0FBSyxTQUFTQSxFQUFJLElBQUk7TUFDbkIsU0FBUytJLE1BQVc7TUFDcEIsZ0JBQWdCQSxNQUFXO01BQzNCLE1BQUEvSTtNQUNBLFFBQUFvRjtNQUNBLE9BQUEvRTtJQUFBO0VBRU47QUFDSDtBQzlCQSxJQUFNNEUsS0FBNkM7RUFDaEQsSUFBSUM7SUFDRDtJQUNBLENBQUN6QyxJQUFRLENBQUN3UCxHQUFTalMsR0FBTW9GLElBQVEvRSxDQUFLLE1BQU07QUFDekNvQyxNQUFBQSxHQUFPLEtBQUt5UCxHQUFhRCxDQUFPLEdBQUcsTUFBTWpTLEdBQU1vRixJQUFRL0UsQ0FBSztJQUMvRDtFQUFBO0VBRUgsSUFBSTZFO0lBQ0Q7SUFDQSxDQUFDekMsSUFBUSxDQUFDd1AsR0FBU2pTLEdBQU1vRixJQUFRL0UsQ0FBSyxNQUFNO0FBQ3pDb0MsTUFBQUEsR0FBTyxLQUFLeVAsR0FBYUQsQ0FBTyxHQUFHLE9BQU9qUyxHQUFNb0YsSUFBUS9FLENBQUs7SUFDaEU7RUFBQTtBQUVOO0FBYkEsSUFlTThSLEtBQXNCLElBQUlqTixHQUFnQyxZQUFZLENBQUN6QyxJQUFRLENBQUN6QyxDQUFJLE1BQU07QUFDN0Z5QyxFQUFBQSxHQUFPLEtBQUtxUCxHQUF1QixTQUFTLE9BQU85UixHQUFNLElBQUksRUFBRTtBQUNsRSxDQUFDO0FBRUQsU0FBU2tTLEdBQWFoWCxJQUFnQjtBQUNuQyxTQUFPQSxLQUFRQSxHQUFNLE9BQU8sQ0FBQyxJQUFJO0FBQ3BDO0FBRU8sU0FBU2tYLEdBQW1CclQsSUFBZ0JzVCxJQUFjLE9BQXNCO0FBQ3BGLFNBQU92TTtJQUNKLElBQUlpTSxHQUFBO0lBQ0pNLElBQWMsQ0FBQ0YsRUFBbUIsSUFBSWxOO0lBQ3RDbEc7RUFBQTtBQUVOO0FDMUJPLElBQU11VCxLQUFOLE1BQTZEO0VBQTdELGNBQUE7QUFDSixTQUFBLE1BQWtDLENBQUEsR0FDbEMsS0FBQSxXQUErRCxDQUFBLEdBQy9ELEtBQUEsU0FBcUMsQ0FBQTtFQUFDO0VBRXRDLElBQUksVUFBbUI7QUFDcEIsV0FBTyxDQUFDLEtBQUssT0FBTztFQUN2QjtBQUNIO0FBRU8sU0FBU0MsR0FBc0JwTixJQUFnQnFOLEdBQXlDO0FBQzVGLFNBQU87SUFDSixRQUFBck47SUFDQSxNQUFBcU47SUFDQSxTQUFTO0VBQUE7QUFFZjtBQUVPLFNBQVNDLEdBQXNCdE4sSUFBMkM7QUFDOUUsU0FBTztJQUNKLFFBQUFBO0lBQ0EsTUFBTTtJQUNOLFNBQVM7RUFBQTtBQUVmO0FDdEJBLElBQU11TixLQUFxQjtBQUEzQixJQUNNQyxLQUFtQjtBQUR6QixJQUdNMU4sS0FBaUQ7RUFDcEQsSUFBSUMsR0FBV3dOLElBQW9CLENBQUNqUSxJQUFRLENBQUMwQyxHQUFRcU4sQ0FBSSxNQUFNO0FBQzVELFVBQU1JLEtBQVdMLEdBQXNCcE4sR0FBUXFOLENBQUk7QUFFbkQvUCxJQUFBQSxHQUFPLElBQUksS0FBS21RLEVBQVEsR0FDeEJuUSxHQUFPLFNBQVMwQyxDQUFNLElBQUl5TjtFQUM3QixDQUFDO0VBQ0QsSUFBSTFOLEdBQVd5TixJQUFrQixDQUFDbFEsSUFBUSxDQUFDMEMsQ0FBTSxNQUFNO0FBQ3BELFVBQU15TixJQUFXSCxHQUFzQnROLENBQU07QUFFN0MxQyxJQUFBQSxHQUFPLE9BQU8sS0FBS21RLENBQVEsR0FDM0JuUSxHQUFPLElBQUksS0FBS21RLENBQVEsR0FDeEJuUSxHQUFPLFNBQVMwQyxDQUFNLElBQUl5TjtFQUM3QixDQUFDO0FBQ0o7QUFqQkEsSUFtQmFDLEtBQW9FLENBQzlFOVQsSUFDQTRELE1BRU9tRCxHQUFvQixJQUFJd00sR0FBQSxHQUF1QnJOLElBQVMsQ0FBQ2xHLElBQVE0RCxDQUFNLENBQUM7QUFHM0UsU0FBU21RLEdBQXVCaFAsSUFBY2lQLEdBQXFDO0FBQ3ZGLFNBQU9BLE1BQW9CN2EsR0FBVSxTQUFTeWEsR0FBaUIsS0FBSzdPLEVBQUk7QUFDM0U7QUMxQk8sU0FBU2tQLEdBQTRCclosSUFBb0I7QUFDN0QsUUFBTXNaLElBQWlCLENBQUMsTUFBTSxNQUFNLFVBQVU7QUFDOUMsU0FBT3RaLEdBQVMsS0FBSyxDQUFDbUosTUFBWW1RLEVBQWUsU0FBU25RLENBQU8sQ0FBQztBQUNyRTtBQUVPLFNBQVNvUSxHQUNieFksSUFDcUQ7QUFDckQsUUFBTXlZLElBQVdILEdBQTRCdFksRUFBVSxHQUNqRDBZLElBQWdCMVksR0FBVyxTQUFTLGdCQUFnQixHQUVwRGYsS0FBVyxDQUFDLFVBQVUsR0FBR2UsRUFBVTtBQUV6QyxTQUFJZixHQUFTLFdBQVcsS0FDckJBLEdBQVMsS0FBSyxJQUFJLEdBR2hCQSxHQUFTLFNBQVMsSUFBSSxLQUN4QkEsR0FBUyxPQUFPLEdBQUcsR0FBRyxJQUFJLEdBR3RCO0lBQ0osUUFBUTtJQUNSLFVBQUFBO0lBQ0EsT0FBT29GLEdBQVE0RCxJQUFRO0FBQ3BCLGFBQUl3USxJQUNNTixHQUFxQjlULEdBQVE0RCxFQUFNLEVBQUUsSUFBSSxDQUFDLElBRzdDeVAsR0FBbUJyVCxHQUFRcVUsQ0FBYTtJQUNsRDtFQUFBO0FBRU47QUFFTyxTQUFTQyxLQUE2QztBQUMxRCxTQUFPO0lBQ0osUUFBUTtJQUNSLFVBQVUsQ0FBQyxVQUFVLElBQUk7SUFDekIsT0FBT3RVLElBQVE7QUFDWixhQUFPcVQsR0FBbUJyVCxFQUFNO0lBQ25DO0VBQUE7QUFFTjtBQUVPLFNBQVN1VSxHQUNiQyxJQUNBQyxJQUFjLE9BQ3NCO0FBQ3BDLFNBQU87SUFDSixRQUFRO0lBQ1IsVUFBVSxDQUFDLFVBQVUsTUFBTUEsSUFBYyxPQUFPLE1BQU0sR0FBR0QsRUFBUTtJQUNqRSxPQUFPeFUsR0FBUTRELElBQVE7QUFDcEIsYUFBT2tRLEdBQXFCOVQsR0FBUTRELEVBQU07SUFDN0M7SUFDQSxRQUFRLEVBQUUsVUFBQTdLLEdBQVUsUUFBQWlILEdBQUFBLEdBQVVoSCxHQUFPQyxJQUFNQyxHQUFNO0FBQzlDLFVBQUksQ0FBQzZhLEdBQXVCLE9BQU8vYSxDQUFLLEdBQUdELENBQVE7QUFDaEQsZUFBT0csRUFBS0YsQ0FBSztBQUdwQkMsTUFBQUEsR0FBSytHLEVBQU07SUFDZDtFQUFBO0FBRU47QUFFTyxTQUFTMFUsR0FDYnRPLElBQ0FxTyxJQUFjLE9BQ3VCO0FBQ3JDLFFBQU14WixJQUE2QztJQUNoRCxRQUFRO0lBQ1IsVUFBVSxDQUFDLFVBQVUsTUFBTXdaLElBQWMsT0FBTyxNQUFNck8sRUFBTTtJQUM1RCxPQUFPcEcsSUFBUTRELEdBQVE7QUFDcEIsYUFBT2tRLEdBQXFCOVQsSUFBUTRELENBQU0sRUFBRSxTQUFTd0MsRUFBTTtJQUM5RDtJQUNBLFFBQVEsRUFBRSxVQUFBck4sSUFBVSxRQUFBNkssR0FBUSxRQUFBNUQsR0FBQUEsR0FBVWhILEdBQU8yYixHQUFHemIsSUFBTTtBQUNuRCxVQUFJLENBQUM2YSxHQUF1QixPQUFPL2EsQ0FBSyxHQUFHRCxFQUFRO0FBQ2hELGVBQU9HLEdBQUtGLENBQUs7QUFHcEIsWUFBTSxJQUFJZ1c7UUFDUC9ULEVBQUssT0FBTzJaLEdBQWU1VSxFQUFNLEdBQUc0VSxHQUFlaFIsQ0FBTSxDQUFDO1FBQzFELE9BQU81SyxDQUFLO01BQUE7SUFFbEI7RUFBQTtBQUdILFNBQU9pQztBQUNWO0FDOUZPLFNBQVM0WixHQUFnQnRWLElBQXVDO0FBQ3BFLFNBQU87SUFDSixVQUFVLENBQUMsZ0JBQWdCLEdBQUdBLEVBQUs7SUFDbkMsUUFBUTtJQUNSLFFBQVF1VjtFQUFBO0FBRWQ7QUFLQSxTQUFTQSxHQUFpQnhiLElBQXdCO0FBQy9DLFNBQU9BLEdBQUssTUFBTSxLQUFLLEVBQUUsSUFBSXliLEVBQU0sRUFBRSxPQUFPLE9BQU87QUFDdEQ7QUFFQSxTQUFTQSxHQUFPNVksSUFBZTtBQUM1QixRQUFNeEMsSUFBT3dDLEdBQU0sS0FBQSxFQUFPLFFBQVEsZ0JBQWdCLEVBQUU7QUFDcEQsU0FBT3hDLFNBQVFxYixpQkFBQUEsV0FBVXJiLENBQUk7QUFDaEM7QUNuQkEsSUFBTXVNLEtBQXFDO0VBQ3hDLElBQUlDLEdBQVcsY0FBYyxDQUFDekMsSUFBUSxDQUFDdUssQ0FBTSxNQUFNO0FBQ2hEdkssSUFBQUEsR0FBTyxTQUFTdUs7RUFDbkIsQ0FBQztFQUNELElBQUk5SCxHQUFXLHVDQUF1QyxDQUFDekMsSUFBUSxDQUFDekMsR0FBTWdVLENBQVEsTUFBTTtBQUNqRnZSLElBQUFBLEdBQU8sU0FBUyxLQUFLO01BQ2xCLE1BQUF6QztNQUNBLFVBQUFnVTtJQUFBLENBQ0Y7RUFDSixDQUFDO0VBQ0QsSUFBSTlPLEdBQVcsb0NBQW9DLENBQUN6QyxJQUFRLENBQUN6QyxHQUFNZ1UsQ0FBUSxNQUFNO0FBQzlFdlIsSUFBQUEsR0FBTyxLQUFLLEtBQUs7TUFDZCxNQUFBekM7TUFDQSxVQUFBZ1U7SUFBQSxDQUNGO0VBQ0osQ0FBQztFQUNELElBQUk5TyxHQUFXLGlDQUFpQyxDQUFDekMsSUFBUSxDQUFDdVIsQ0FBUSxNQUFNO0FBQ3JFdlIsSUFBQUEsR0FBTyxRQUFRLEtBQUs7TUFDakIsVUFBQXVSO0lBQUEsQ0FDRjtFQUNKLENBQUM7RUFDRCxJQUFJOU87SUFDRDtJQUNBLENBQUN6QyxJQUFRLENBQUN3RyxHQUFNdkosR0FBSU0sSUFBTWdVLENBQVEsTUFBTTtBQUNyQ3ZSLE1BQUFBLEdBQU8sUUFBUSxLQUFLO1FBQ2pCLE1BQUF6QztRQUNBLFVBQUFnVTtRQUNBLElBQUF0VTtRQUNBLE1BQUF1SjtNQUFBLENBQ0Y7SUFDSjtFQUFBO0FBRU47QUFFTyxTQUFTZ0wsR0FBaUJsVixJQUFnQjRELEdBQTZCO0FBUzNFLFNBQU9tRCxHQVJxQjtJQUN6QixLQUFLL0c7SUFDTCxRQUFRO0lBQ1IsVUFBVSxDQUFBO0lBQ1YsTUFBTSxDQUFBO0lBQ04sU0FBUyxDQUFBO0lBQ1QsU0FBUyxDQUFBO0VBQUMsR0FFc0JrRyxJQUFTLENBQUNsRyxJQUFRNEQsQ0FBTSxDQUFDO0FBQy9EO0FDMUNBLFNBQVN1UixHQUFrQnBSLElBQWlCO0FBQ3pDLFNBQU8sc0JBQXNCLEtBQUtBLEVBQU87QUFDNUM7QUFFTyxTQUFTcVIsR0FDYm5ILElBQ0E3SCxHQUNBekssR0FDb0M7QUFDcEMsUUFBTWYsS0FBVyxDQUFDLFNBQVMsR0FBR2UsQ0FBVTtBQU14QyxTQUxJc1MsTUFBVTdILEtBQ1h4TCxHQUFTLEtBQUtxVCxJQUFRN0gsQ0FBTSxHQUdoQnhMLEdBQVMsS0FBS3VhLEVBQWlCLElBRXBDMWEsR0FBdUIsZ0RBQWdELElBRzFFO0lBQ0osVUFBQUc7SUFDQSxRQUFRO0lBQ1IsUUFBUXNhO0VBQUE7QUFFZDtBQzFCQSxJQUFNaFAsS0FBb0M7RUFDdkMsSUFBSUMsR0FBVywyQkFBMkIsQ0FBQ3pDLElBQVEsQ0FBQ3dHLEdBQU12SixDQUFFLE1BQU07QUFDL0QrQyxJQUFBQSxHQUFPLE1BQU0sS0FBSyxFQUFFLE1BQUF3RyxHQUFNLElBQUF2SixFQUFBQSxDQUFJO0VBQ2pDLENBQUM7QUFDSjtBQUVPLFNBQVMwVSxHQUFnQnJWLElBQTRCO0FBQ3pELFNBQU8rRyxHQUFvQixFQUFFLE9BQU8sQ0FBQSxFQUFDLEdBQUtiLElBQVNsRyxFQUFNO0FBQzVEO0FDTk8sU0FBU3NWLEdBQVNwTCxJQUF5QnZKLEdBQW9DO0FBQ25GLFNBQU87SUFDSixVQUFVLENBQUMsTUFBTSxNQUFNLEdBQUd5RyxFQUFROEMsRUFBSSxHQUFHdkosQ0FBRTtJQUMzQyxRQUFRO0lBQ1IsUUFBUTBVO0VBQUE7QUFFZDtBQ0xPLFNBQVNFLEdBQ2J0SCxJQUNBN0gsR0FDQXpLLEdBQ3VCO0FBQ3ZCLFFBQU1mLEtBQXFCLENBQUMsUUFBUSxHQUFHZSxDQUFVO0FBQ2pELFNBQUlzUyxNQUFVN0gsS0FDWHhMLEdBQVMsT0FBTyxHQUFHLEdBQUdxVCxJQUFRN0gsQ0FBTSxHQUdoQztJQUNKLFVBQUF4TDtJQUNBLFFBQVE7SUFDUixPQUFPb0YsR0FBUTRELElBQW9CO0FBQ2hDLGFBQU8ySyxHQUFnQnZPLEdBQVE0RCxFQUFNO0lBQ3hDO0lBQ0EsUUFBUUYsR0FBUThSLElBQVFDLEdBQU92YyxHQUFNO0FBQ2xDLFlBQU11VixLQUFZRDtRQUNmb0csR0FBZWxSLEVBQU8sTUFBTTtRQUM1QmtSLEdBQWVsUixFQUFPLE1BQU07TUFBQTtBQUUvQixVQUFJK0s7QUFDRCxlQUFPdlYsRUFBSyxJQUFJOFYsR0FBaUJQLEVBQVMsQ0FBQztBQUc5Q3ZWLFFBQUtzYyxFQUFNO0lBQ2Q7RUFBQTtBQUVOO0FDckJPLFNBQVNFLEdBQWdCcGMsSUFBbUM7QUFDaEUsUUFBTXFjLElBQWlELENBQUE7QUFFdkQsU0FBQUMsR0FBUXRjLElBQU0sQ0FBQyxDQUFDMkgsQ0FBSSxNQUFPMFUsRUFBUTFVLENBQUksSUFBSSxFQUFFLE1BQUFBLEVBQUFBLENBQU8sR0FFN0MsT0FBTyxPQUFPMFUsQ0FBTztBQUMvQjtBQUVPLFNBQVNFLEdBQXVCdmMsSUFBZ0M7QUFDcEUsUUFBTXFjLElBQThDLENBQUE7QUFFcEQsU0FBQUMsR0FBUXRjLElBQU0sQ0FBQyxDQUFDMkgsR0FBTXdNLElBQUtxSSxDQUFPLE1BQU07QUFDaEMsV0FBTyxPQUFPSCxHQUFTMVUsQ0FBSSxNQUM3QjBVLEVBQVExVSxDQUFJLElBQUk7TUFDYixNQUFBQTtNQUNBLE1BQU0sRUFBRSxPQUFPLElBQUksTUFBTSxHQUFBO0lBQUcsSUFJOUI2VSxLQUFXckksT0FDWmtJLEVBQVExVSxDQUFJLEVBQUUsS0FBSzZVLEVBQVEsUUFBUSxXQUFXLEVBQUUsQ0FBaUMsSUFBSXJJO0VBRTNGLENBQUMsR0FFTSxPQUFPLE9BQU9rSSxDQUFPO0FBQy9CO0FBRUEsU0FBU0MsR0FBUXRjLElBQWNpWCxHQUFtQztBQUMvRDlRLEtBQXVCbkcsSUFBTSxDQUFDZSxNQUFTa1csRUFBUWxXLEVBQUssTUFBTSxLQUFLLENBQUMsQ0FBQztBQUNwRTtBQ2pDTyxTQUFTMGIsR0FDYnpHLElBQ0EwRyxHQUNBcmEsR0FDbUI7QUFDbkIsU0FBT2hCLEVBQTBCLENBQUMsVUFBVSxPQUFPLEdBQUdnQixHQUFZMlQsSUFBWTBHLENBQVUsQ0FBQztBQUM1RjtBQUlPLFNBQVNDLEdBQ2IxVSxJQUNtRDtBQUNuRCxRQUFNM0csSUFBVyxDQUFDLFFBQVE7QUFDMUIsU0FBSTJHLE1BQ0QzRyxFQUFTLEtBQUssSUFBSSxHQUdkO0lBQ0osVUFBQUE7SUFDQSxRQUFRO0lBQ1IsUUFBUTJHLEtBQVVzVSxLQUF5Qkg7RUFBQTtBQUVqRDtBQUVPLFNBQVNRLEdBQWdCdmEsSUFBMEM7QUFDdkUsUUFBTWYsSUFBVyxDQUFDLEdBQUdlLEVBQVU7QUFDL0IsU0FBSWYsRUFBUyxDQUFDLE1BQU0sZUFDakJBLEVBQVMsUUFBUSxXQUFXLEdBR3hCRCxFQUEwQkMsQ0FBUTtBQUM1QztBQUVPLFNBQVN1YixHQUFXeGEsSUFBMEM7QUFDbEUsUUFBTWYsSUFBVyxDQUFDLEdBQUdlLEVBQVU7QUFDL0IsU0FBSWYsRUFBUyxDQUFDLE1BQU0sWUFDakJBLEVBQVMsUUFBUSxRQUFRLEdBR3JCRCxFQUEwQkMsQ0FBUTtBQUM1QztBQUVPLFNBQVN3YixHQUFpQjlHLElBQW9CO0FBQ2xELFNBQU8zVSxFQUEwQixDQUFDLFVBQVUsVUFBVTJVLEVBQVUsQ0FBQztBQUNwRTtBQzlDTyxTQUFTK0csR0FDYnhLLEtBQWtCLENBQUEsR0FDbEJsUSxHQUNrQztBQUNsQyxRQUFNRSxJQUFVK1AsSUFBcUJDLEVBQUcsR0FDbENqUixLQUFXLENBQUMsU0FBUyxRQUFRLEdBQUdpQixFQUFRLFVBQVUsR0FBR0YsQ0FBVSxHQUMvRHRDLElBQVN5UjtJQUNaalAsRUFBUTtJQUNSQSxFQUFRO0lBQ1JrTixHQUFxQm5PLEVBQVE7RUFBQTtBQUdoQyxTQUNHeVEsR0FBd0J6USxFQUFRLEtBQUs7SUFDbEMsVUFBQUE7SUFDQSxRQUFRO0lBQ1IsUUFBQXZCO0VBQUE7QUFHVDtBQ3hCTyxTQUFTaWQsR0FBaUIzUSxJQUFjaE0sR0FBa0M7QUFDOUUsU0FBTzRjLEdBQWMsQ0FBQyxPQUFPNVEsSUFBTWhNLENBQUksQ0FBQztBQUMzQztBQUVPLFNBQVM2YyxHQUFrQjdhLElBQTBDO0FBQ3pFLFNBQU80YSxHQUFjLENBQUMsUUFBUSxHQUFHNWEsRUFBVSxDQUFDO0FBQy9DO0FBRU8sU0FBUzRhLEdBQWM1YSxJQUEwQztBQUNyRSxRQUFNZixJQUFXLENBQUMsR0FBR2UsRUFBVTtBQUMvQixTQUFJZixFQUFTLENBQUMsTUFBTSxlQUNqQkEsRUFBUyxRQUFRLFdBQVcsR0FHeEJELEVBQTBCQyxDQUFRO0FBQzVDO0FBRU8sU0FBUzZiLEdBQW9COWEsSUFBMEM7QUFDM0UsU0FBTzRhLEdBQWMsQ0FBQyxVQUFVLEdBQUc1YSxFQUFVLENBQUM7QUFDakQ7QUNwQk8sSUFBTSthLEtBQU4sTUFBbUM7RUFDdkMsWUFDbUJoYSxHQUNBRSxHQUNqQjtBQUZpQixTQUFBLE1BQUFGLEdBQ0EsS0FBQSxTQUFBRTtFQUNoQjtBQUNOO0FBRU8sSUFBTStaLEtBQWUsU0FBVTVSLElBQWM2UixJQUFhLE9BQU87QUFDckUsUUFBTUMsSUFBTzlSLEdBQUssTUFBTTtDQUFJLEVBQUUsSUFBSWxLLEVBQU8sRUFBRSxPQUFPLE9BQU87QUFFcEQrYixPQUNGQyxFQUFLLEtBQUssU0FBVUMsR0FBTUMsSUFBTTtBQUM3QixVQUFNQyxJQUFTRixFQUFLLE1BQU0sR0FBRyxHQUN2QkcsSUFBU0YsR0FBSyxNQUFNLEdBQUc7QUFFN0IsUUFBSUMsRUFBTyxXQUFXLEtBQUtDLEVBQU8sV0FBVztBQUMxQyxhQUFPQyxHQUFhQyxHQUFTSCxFQUFPLENBQUMsQ0FBQyxHQUFHRyxHQUFTRixFQUFPLENBQUMsQ0FBQyxDQUFDO0FBRy9ELGFBQVN0WixLQUFJLEdBQUd5VCxLQUFJLEtBQUssSUFBSTRGLEVBQU8sUUFBUUMsRUFBTyxNQUFNLEdBQUd0WixLQUFJeVQsSUFBR3pULE1BQUs7QUFDckUsWUFBTXlaLEtBQU9DLEdBQU9GLEdBQVNILEVBQU9yWixFQUFDLENBQUMsR0FBR3daLEdBQVNGLEVBQU90WixFQUFDLENBQUMsQ0FBQztBQUU1RCxVQUFJeVo7QUFDRCxlQUFPQTtJQUViO0FBRUEsV0FBTztFQUNWLENBQUM7QUFHSixRQUFNeGEsS0FBU2dhLElBQWFDLEVBQUssQ0FBQyxJQUFJLENBQUMsR0FBR0EsQ0FBSSxFQUFFLFFBQUEsRUFBVSxLQUFLLENBQUMxSCxNQUFRQSxFQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFFN0YsU0FBTyxJQUFJdUgsR0FBUUcsR0FBTWphLEVBQU07QUFDbEM7QUFFQSxTQUFTc2EsR0FBYUksSUFBV0MsR0FBbUI7QUFDakQsUUFBTUMsSUFBUyxPQUFPLE1BQU1GLEVBQUMsR0FDdkJHLEtBQVMsT0FBTyxNQUFNRixDQUFDO0FBRTdCLFNBQUlDLE1BQVdDLEtBQ0xELElBQVMsSUFBSSxLQUdoQkEsSUFBU0gsR0FBT0MsSUFBR0MsQ0FBQyxJQUFJO0FBQ2xDO0FBRUEsU0FBU0YsR0FBT0MsSUFBV0MsR0FBVztBQUNuQyxTQUFPRCxPQUFNQyxJQUFJLElBQUlELEtBQUlDLElBQUksSUFBSTtBQUNwQztBQUVBLFNBQVMxYyxHQUFRc0IsSUFBZTtBQUM3QixTQUFPQSxHQUFNLEtBQUE7QUFDaEI7QUFFQSxTQUFTZ2IsR0FBU2hiLElBQTJCO0FBQzFDLFNBQUksT0FBT0EsTUFBVSxZQUNYLFNBQVNBLEdBQU0sUUFBUSxTQUFTLEVBQUUsR0FBRyxFQUFFLEtBQUs7QUFJekQ7QUN4RE8sU0FBU3ViLEdBQVkvYixLQUF1QixDQUFBLEdBQTJCO0FBQzNFLFFBQU1nYyxJQUFnQmhjLEdBQVcsS0FBSyxDQUFDYSxNQUFXLFdBQVcsS0FBS0EsQ0FBTSxDQUFDO0FBRXpFLFNBQU87SUFDSixRQUFRO0lBQ1IsVUFBVSxDQUFDLE9BQU8sTUFBTSxHQUFHYixFQUFVO0lBQ3JDLE9BQU9yQyxHQUFjO0FBQ2xCLGFBQU9xZCxHQUFhcmQsR0FBTXFlLENBQWE7SUFDMUM7RUFBQTtBQUVOO0FBS08sU0FBU0MsR0FBVzNXLElBQTRDO0FBQ3BFLFNBQU87SUFDSixRQUFRO0lBQ1IsVUFBVSxDQUFDLE9BQU9BLEVBQUk7SUFDdEIsU0FBUztBQUNOLGFBQU8sRUFBRSxNQUFBQSxHQUFBO0lBQ1o7RUFBQTtBQUVOO0FBS08sU0FBUzRXLEdBQ2I1VyxJQUNBNlcsR0FDNkI7QUFDN0IsU0FBTztJQUNKLFFBQVE7SUFDUixVQUFVLENBQUMsT0FBTyxNQUFNLE1BQU1BLEdBQVk3VyxFQUFJO0lBQzlDLFNBQVM7QUFDTixhQUFPLEVBQUUsTUFBQUEsR0FBQTtJQUNaO0VBQUE7QUFFTjtBQ1FBLFNBQVM4VyxHQUFJbGMsSUFBU21jLEdBQVM7QUFDNUIsT0FBSyxXQUFXQSxHQUNoQixLQUFLLFlBQVksSUFBSXRUO0lBQ2xCN0ksR0FBUTtJQUNSLElBQUk4VyxHQUFVOVcsR0FBUSxzQkFBc0I7SUFDNUNtYztFQUNOLEdBRUcsS0FBSyxXQUFXbmMsR0FBUTtBQUMzQjtDQUVDa2MsR0FBSSxZQUFZLE9BQU8sT0FBTzFGLEdBQWEsU0FBUyxHQUFHLGNBQWMwRjtBQU10RUEsR0FBSSxVQUFVLGVBQWUsU0FBVWhVLElBQVM7QUFDN0MsU0FBQSxLQUFLLFNBQVMsWUFBWSxVQUFVQSxFQUFPLEdBQ3BDO0FBQ1Y7QUFVQWdVLEdBQUksVUFBVSxNQUFNLFNBQVU5VyxJQUFNbEUsR0FBTztBQUN4QyxTQUFJLFVBQVUsV0FBVyxLQUFLLE9BQU9rRSxNQUFTLFdBQzNDLEtBQUssVUFBVSxNQUFNQSxNQUVwQixLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsT0FBTyxDQUFBLEdBQUlBLEVBQUksSUFBSWxFLEdBR3BEO0FBQ1Y7QUFLQWdiLEdBQUksVUFBVSxZQUFZLFNBQVVsYyxJQUFTO0FBQzFDLFNBQU8sS0FBSztJQUNUd2E7TUFDR2hLLEdBQXdCLFNBQVMsS0FBSyxDQUFBO01BQ3JDL0UsR0FBWXpMLEVBQU8sS0FBS0EsTUFBWSxDQUFBO0lBQzlDO0lBQ00wQyxFQUF5QixTQUFTO0VBQ3hDO0FBQ0E7QUFVQXdaLEdBQUksVUFBVSxLQUFLLFNBQVU3TixJQUFNdkosR0FBSTtBQUNwQyxTQUFPLEtBQUssU0FBUzJVLEdBQVNwTCxJQUFNdkosQ0FBRSxHQUFHcEMsRUFBeUIsU0FBUyxDQUFDO0FBQy9FO0FBT0F3WixHQUFJLFVBQVUsb0JBQW9CLFNBQVVqWSxJQUFNO0FBQy9DLE1BQUltWSxJQUFNO0FBQ1YsU0FBTyxLQUFLLEtBQUssV0FBWTtBQUMxQkEsTUFBSSxLQUFLLFNBQVV2VixHQUFLbVUsSUFBTTtBQUMzQm9CLFFBQUksU0FBU3BCLEdBQUssUUFBUS9XLEVBQUk7SUFDakMsQ0FBQztFQUNKLENBQUM7QUFDSjtBQUtBaVksR0FBSSxVQUFVLE9BQU8sU0FBVTlKLElBQVE3SCxHQUFRdkssR0FBU2lFLElBQU07QUFDM0QsU0FBTyxLQUFLO0lBQ1R5VjtNQUNHMVQsRUFBV29NLElBQVFuTSxDQUFZO01BQy9CRCxFQUFXdUUsR0FBUXRFLENBQVk7TUFDL0IvQixHQUFtQixTQUFTO0lBQ3JDO0lBQ014QixFQUF5QixTQUFTO0VBQ3hDO0FBQ0E7QUFZQXdaLEdBQUksVUFBVSxRQUFRLFNBQVU5SixJQUFRN0gsR0FBUTtBQUM3QyxTQUFPLEtBQUs7SUFDVGdQO01BQ0d2VCxFQUFXb00sSUFBUW5NLENBQVk7TUFDL0JELEVBQVd1RSxHQUFRdEUsQ0FBWTtNQUMvQi9CLEdBQW1CLFNBQVM7SUFDckM7SUFDTXhCLEVBQXlCLFNBQVM7RUFDeEM7QUFDQTtBQVdBd1osR0FBSSxVQUFVLE9BQU8sU0FBVWxjLElBQVNpRSxHQUFNO0FBQzNDLFNBQU8sS0FBSztJQUNUNFgsR0FBWTNYLEdBQW1CLFNBQVMsQ0FBQztJQUN6Q3hCLEVBQXlCLFNBQVM7RUFDeEM7QUFDQTtBQU1Bd1osR0FBSSxVQUFVLFNBQVMsV0FBWTtBQUNoQyxTQUFPLEtBQUs7SUFDVHBkLEVBQTBCLENBQUMsVUFBVSxHQUFHb0YsR0FBbUIsU0FBUyxDQUFDLENBQUM7SUFDdEV4QixFQUF5QixTQUFTO0VBQ3hDO0FBQ0E7QUFLQXdaLEdBQUksVUFBVSxRQUFRLFNBQVVyYyxJQUFNO0FBQ25DLFNBQU8sS0FBSztJQUNUeUUsR0FBVUUsR0FBYTNFLEVBQUksR0FBR3FFLEdBQW1CLFNBQVMsQ0FBQztJQUMzRHhCLEVBQXlCLFNBQVM7RUFDeEM7QUFDQTtBQUtBd1osR0FBSSxVQUFVLFNBQVMsU0FBVTFSLElBQVE7QUFDdEMsUUFBTWEsSUFBTzNJLEVBQXlCLFNBQVM7QUFFL0MsU0FBSSxPQUFPOEgsTUFBVyxXQUNaLEtBQUssU0FBUzVMLEdBQXVCLHlCQUF5QixHQUFHeU0sQ0FBSSxJQUd4RSxLQUFLO0lBQ1R2TSxFQUEwQixDQUFDLFVBQVUsR0FBR29GLEdBQW1CLFdBQVcsR0FBRyxJQUFJLEdBQUdzRyxFQUFNLENBQUM7SUFDdkZhO0VBQ047QUFDQTtBQUtBNlEsR0FBSSxVQUFVLFNBQVMsU0FBVTlXLElBQU07QUFDcEMsUUFBTWhHLElBQ0gsT0FBT2dHLE1BQVMsV0FDWDJXLEdBQVczVyxFQUFJLElBQ2Z4RyxHQUF1QixnQ0FBZ0M7QUFFL0QsU0FBTyxLQUFLLFNBQVNRLEdBQU1zRCxFQUF5QixTQUFTLENBQUM7QUFDakU7QUFLQXdaLEdBQUksVUFBVSxrQkFBa0IsU0FBVUcsSUFBU0osR0FBWTtBQUM1RCxTQUFPLEtBQUs7SUFDVEQsR0FBb0JLLElBQVNKLENBQVU7SUFDdkN2WixFQUF5QixTQUFTO0VBQ3hDO0FBQ0E7QUFLQXdaLEdBQUksVUFBVSxvQkFBb0IsU0FBVXZTLElBQVlpUCxHQUFhM1UsR0FBTTtBQUN4RSxTQUFPLEtBQUs7SUFDVDRVLEdBQWlCbFAsSUFBWSxPQUFPaVAsS0FBZ0IsWUFBWUEsSUFBYyxLQUFLO0lBQ25GbFcsRUFBeUIsU0FBUztFQUN4QztBQUNBO0FBS0F3WixHQUFJLFVBQVUsc0JBQXNCLFNBQVVJLElBQWExRCxHQUFhM1UsR0FBTTtBQUMzRSxTQUFPLEtBQUs7SUFDVHlVLEdBQW1CNEQsSUFBYSxPQUFPMUQsS0FBZ0IsWUFBWUEsSUFBYyxLQUFLO0lBQ3RGbFcsRUFBeUIsU0FBUztFQUN4QztBQUNBO0FBUUF3WixHQUFJLFVBQVUsU0FBUyxTQUFVbGMsSUFBU2lFLEdBQU07QUFDN0MsU0FBTyxLQUFLO0lBQ1RxVSxHQUFXcFUsR0FBbUIsU0FBUyxDQUFDO0lBQ3hDeEIsRUFBeUIsU0FBUztFQUN4QztBQUNBO0FBT0F3WixHQUFJLFVBQVUsY0FBYyxTQUFValksSUFBTTtBQUN6QyxTQUFPLEtBQUssU0FBU3dVLEdBQWUsR0FBSS9WLEVBQXlCLFNBQVMsQ0FBQztBQUM5RTtBQUtBd1osR0FBSSxVQUFVLE1BQU0sU0FBVW5kLElBQVU7QUFDckMsUUFBTXdkLElBQXFCLENBQUMsTUFBTSxRQUFReGQsRUFBUSxHQUM1Q21KLElBQVUsQ0FBQSxFQUFHLE1BQU0sS0FBS3FVLElBQXFCLFlBQVl4ZCxJQUFVLENBQUM7QUFFMUUsV0FBUytDLElBQUksR0FBR0EsSUFBSW9HLEVBQVEsVUFBVXFVLEdBQW9CemE7QUFDdkQsUUFBSSxDQUFDMGEsR0FBaUJ0VSxFQUFRcEcsQ0FBQyxDQUFDLEdBQUc7QUFDaENvRyxRQUFRLE9BQU9wRyxHQUFHb0csRUFBUSxTQUFTcEcsQ0FBQztBQUNwQztJQUNIO0FBR0hvRyxJQUFRLEtBQUssR0FBR2hFLEdBQW1CLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFFdEQsTUFBSW1ILEtBQU8zSSxFQUF5QixTQUFTO0FBRTdDLFNBQUt3RixFQUFRLFNBT04sS0FBSyxTQUFTcEosRUFBMEJvSixHQUFTLEtBQUssUUFBUSxHQUFHbUQsRUFBSSxJQU5sRSxLQUFLO0lBQ1R6TSxHQUF1QixpREFBaUQ7SUFDeEV5TTtFQUNUO0FBSUE7QUFFQTZRLEdBQUksVUFBVSxlQUFlLFNBQVVwUyxJQUFNaE0sR0FBTW1HLEdBQU07QUFDdEQsU0FBTyxLQUFLLFNBQVN3VyxHQUFpQjNRLElBQU1oTSxDQUFJLEdBQUc0RSxFQUF5QixTQUFTLENBQUM7QUFDekY7QUFFQXdaLEdBQUksVUFBVSxrQkFBa0IsU0FBVWhYLElBQU1qQixHQUFNO0FBQ25ELFNBQU8sS0FBSztJQUNUMlcsR0FBb0IxVyxHQUFtQixXQUFXLElBQUksQ0FBQztJQUN2RHhCLEVBQXlCLFNBQVM7RUFDeEM7QUFDQTtBQUVBd1osR0FBSSxVQUFVLGdCQUFnQixTQUFVaFgsSUFBTWpCLEdBQU07QUFDakQsU0FBTyxLQUFLO0lBQ1QwVyxHQUFrQnpXLEdBQW1CLFdBQVcsSUFBSSxDQUFDO0lBQ3JEeEIsRUFBeUIsU0FBUztFQUN4QztBQUNBO0FBRUF3WixHQUFJLFVBQVUsWUFBWSxTQUFVbGMsSUFBU2lFLEdBQU07QUFDaEQsU0FBTyxLQUFLO0lBQ1R5VyxHQUFjeFcsR0FBbUIsU0FBUyxDQUFDO0lBQzNDeEIsRUFBeUIsU0FBUztFQUN4QztBQUNBO0FBRUF3WixHQUFJLFVBQVUsYUFBYSxXQUFZO0FBQ3BDLFNBQU8sS0FBSztJQUNUN0IsR0FBZ0JuVyxHQUFtQixTQUFTLENBQUM7SUFDN0N4QixFQUF5QixTQUFTO0VBQ3hDO0FBQ0E7QUFLQXdaLEdBQUksVUFBVSxZQUFZLFNBQVV6SSxJQUFZMEcsR0FBWWxXLEdBQU07QUFDL0QsU0FBTyxLQUFLO0lBQ1RpVyxHQUFjekcsSUFBWTBHLEdBQVlqVyxHQUFtQixTQUFTLENBQUM7SUFDbkV4QixFQUF5QixTQUFTO0VBQ3hDO0FBQ0E7QUFLQXdaLEdBQUksVUFBVSxlQUFlLFNBQVV6SSxJQUFZeFAsR0FBTTtBQUN0RCxTQUFPLEtBQUssU0FBU3NXLEdBQWlCOUcsRUFBVSxHQUFHL1EsRUFBeUIsU0FBUyxDQUFDO0FBQ3pGO0FBTUF3WixHQUFJLFVBQVUsYUFBYSxTQUFVeFcsSUFBU3pCLEdBQU07QUFDakQsU0FBTyxLQUFLLFNBQVNtVyxHQUFlMVUsT0FBWSxJQUFJLEdBQUdoRCxFQUF5QixTQUFTLENBQUM7QUFDN0Y7QUFRQXdaLEdBQUksVUFBVSxTQUFTLFNBQVVsYyxJQUFTaUUsR0FBTTtBQUM3QyxTQUFPLEtBQUs7SUFDVHFXLEdBQVdwVyxHQUFtQixTQUFTLENBQUM7SUFDeEN4QixFQUF5QixTQUFTO0VBQ3hDO0FBQ0E7QUFRQXdaLEdBQUksVUFBVSxNQUFNLFNBQVVsYyxJQUFTaUUsR0FBTTtBQUMxQyxRQUFNaUUsSUFBVWhFLEdBQW1CLFNBQVM7QUFFNUMsU0FBSWdFLEVBQVEsQ0FBQyxNQUFNLFNBQ2hCQSxFQUFRLFFBQVEsS0FBSyxHQUdqQixLQUFLLFNBQVNwSixFQUEwQm9KLENBQU8sR0FBR3hGLEVBQXlCLFNBQVMsQ0FBQztBQUMvRjtBQU9Bd1osR0FBSSxVQUFVLG1CQUFtQixTQUFValksSUFBTTtBQUM5QyxTQUFPLEtBQUs7SUFDVG5GLEVBQTBCLENBQUMsb0JBQW9CLENBQUM7SUFDaEQ0RCxFQUF5QixTQUFTO0VBQ3hDO0FBQ0E7QUFTQXdaLEdBQUksVUFBVSxXQUFXLFNBQVU5SixJQUFRbk8sR0FBTTtBQUM5QyxRQUFNN0UsSUFBTzBVO0lBQ1YsRUFBRSxRQUFROU4sRUFBV29NLElBQVFuTSxDQUFZLEVBQUM7SUFDMUMvQixHQUFtQixTQUFTO0VBQ2xDO0FBRUcsU0FBTyxLQUFLLFNBQVM5RSxHQUFNc0QsRUFBeUIsU0FBUyxDQUFDO0FBQ2pFO0FBS0F3WixHQUFJLFVBQVUsS0FBSyxTQUFVOVEsSUFBTztBQUNqQyxTQUFPLEtBQUs7SUFDVHRNLEVBQTBCLENBQUMsTUFBTSxNQUFNLEdBQUd5TSxFQUFRSCxFQUFLLENBQUMsQ0FBQztJQUN6RDFJLEVBQXlCLFNBQVM7RUFDeEM7QUFDQTtBQVFBd1osR0FBSSxVQUFVLGNBQWMsU0FBVTlRLElBQU87QUFDMUMsU0FBTyxLQUFLO0lBQ1R0TSxFQUEwQixDQUFDLE1BQU0sWUFBWSxHQUFHeU0sRUFBUUgsRUFBSyxDQUFDLENBQUM7SUFDL0QxSSxFQUF5QixTQUFTO0VBQ3hDO0FBQ0E7QUFXQXdaLEdBQUksVUFBVSxVQUFVLFNBQVVsYyxJQUFTaUUsR0FBTTtBQUM5QyxTQUFPLEtBQUssU0FBUyxTQUFTLFNBQVM7QUFDMUM7QUFFQWlZLEdBQUksVUFBVSxnQkFBZ0IsV0FBWTtBQUN2QyxTQUFPLEtBQUssU0FBUyxVQUFVLFNBQVM7QUFDM0M7QUFFQUEsR0FBSSxVQUFVLFdBQVcsU0FBVS9PLElBQVFqSSxHQUFNO0FBQzlDLE1BQUl3UCxJQUFVaFMsRUFBeUJ3QyxDQUFJLEdBQ3ZDZ0QsS0FBVSxDQUFDLFVBQVUsR0FDckJsSSxJQUFVa0YsRUFBSyxDQUFDO0FBRXBCLE1BQUksT0FBT2xGLEtBQVk7QUFDcEIsV0FBTyxLQUFLO01BQ1RwQixHQUF1Qiw4REFBOEQ7TUFDckY4VjtJQUNUO0FBR08sUUFBTSxRQUFRMVUsQ0FBTyxLQUN0QmtJLEdBQVEsS0FBSyxNQUFNQSxJQUFTbEksQ0FBTztBQUd0QyxRQUFNWixLQUNIK04sT0FBVyxXQUFXbE8sR0FBMEJpSixFQUFPLElBQUlwSixFQUEwQm9KLEVBQU87QUFFL0YsU0FBTyxLQUFLLFNBQVM5SSxJQUFNc1YsQ0FBTztBQUNyQztBQUVBd0gsR0FBSSxVQUFVLE9BQU8sU0FBVWxjLElBQVNpRSxHQUFNO0FBQzNDLFFBQU03RSxJQUFPNkcsRUFBYWpHLEVBQU8sSUFDNUJwQjtJQUNHO0VBQ1gsSUFDUUUsRUFBMEIsQ0FBQyxRQUFRLEdBQUdvRixHQUFtQixTQUFTLENBQUMsQ0FBQztBQUV6RSxTQUFPLEtBQUssU0FBUzlFLEdBQU1zRCxFQUF5QixTQUFTLENBQUM7QUFDakU7QUFFQXdaLEdBQUksVUFBVSxjQUFjLFdBQVk7QUFDckMsU0FBTyxLQUFLO0lBQ1QzTSxHQUFnQnJMLEdBQW1CLFdBQVcsQ0FBQyxDQUFDO0lBQ2hEeEIsRUFBeUIsU0FBUztFQUN4QztBQUNBO0FBRUF3WixHQUFJLFVBQVUsYUFBYSxTQUFVakYsSUFBUztBQUMzQyxRQUFNN1gsSUFBUW9NLEdBQTBCeUwsRUFBTyxJQUkxQ0QsR0FBZXpMLEVBQVEwTCxFQUFPLEdBQUcvUyxHQUFtQixDQUFBLEVBQUcsTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFIaEZ0RjtJQUNHO0VBQ1g7QUFHRyxTQUFPLEtBQUssU0FBU1EsR0FBTXNELEVBQXlCLFNBQVMsQ0FBQztBQUNqRTtBQUVBd1osR0FBSSxVQUFVLFdBQVcsV0FBWTtBQUNsQyxRQUFNbmQsS0FBVyxDQUFDLGFBQWEsR0FBR21GLEdBQW1CLFdBQVcsSUFBSSxDQUFDO0FBQ3JFLFNBQU8sS0FBSztJQUNUcEYsRUFBMEJDLElBQVUsSUFBSTtJQUN4QzJELEVBQXlCLFNBQVM7RUFDeEM7QUFDQTtBQUlBd1osR0FBSSxVQUFVLFFBQVEsU0FBVXJjLElBQU1HLEdBQVNpRSxHQUFNO0FBQ2xELFFBQU13WSxLQUF5QnBjLEdBQW9CUixFQUFJLEdBQ2pERSxJQUNGMGMsTUFBMEI1YyxHQUFLLEtBQUssRUFBRSxLQUFNbUcsRUFBV25HLElBQU1vRyxDQUFZLEtBQUssSUFDNUVuRyxLQUFhb0UsR0FBbUIsQ0FBQSxFQUFHLE1BQU0sS0FBSyxXQUFXdVksS0FBeUIsSUFBSSxDQUFDLENBQUM7QUFFOUYsU0FBTyxLQUFLO0lBQ1Q3YyxHQUFxQkcsR0FBV0QsRUFBVTtJQUMxQzRDLEVBQXlCLFNBQVM7RUFDeEM7QUFDQTtBQUVBd1osR0FBSSxVQUFVLE9BQU8sU0FBVWpZLElBQU07QUFDbEMsUUFBTTdFLElBQU87SUFDVixVQUFVLENBQUE7SUFDVixRQUFRO0lBQ1IsU0FBUztBQUNGLGFBQU82RSxNQUFTLGNBQ2pCQSxHQUFJO0lBRVY7RUFDTjtBQUVHLFNBQU8sS0FBSyxTQUFTN0UsQ0FBSTtBQUM1QjtBQVFBOGMsR0FBSSxVQUFVLGNBQWMsU0FBVVEsSUFBV3pZLEdBQU07QUFDcEQsU0FBTyxLQUFLO0lBQ1QrVSxHQUFnQnpOLEVBQVF2RixFQUFXMFcsSUFBV2xSLElBQTJCLENBQUEsQ0FBRSxDQUFDLENBQUM7SUFDN0U5SSxFQUF5QixTQUFTO0VBQ3hDO0FBQ0E7QUFFQXdaLEdBQUksVUFBVSxjQUFjLFNBQVVTLElBQVcxWSxHQUFNO0FBQ3BELFNBQU8sS0FBSztJQUNUdkcsR0FBZ0JzSSxFQUFXMlcsSUFBVzFXLENBQVksQ0FBQztJQUNuRHZELEVBQXlCLFNBQVM7RUFDeEM7QUFDQTtBQ3RqQk8sU0FBU2thLEdBQVlDLElBQW1DO0FBQzVELFNBQUtBLEtBMEJFLENBVGdEO0lBQ3BELE1BQU07SUFDTixPQUFPQyxJQUFPQyxHQUFTO0FBQ2hCRixNQUFBQSxHQUFPLFdBQ1JFLEVBQVEsS0FBSyxJQUFJQyxHQUFlLFFBQVcsU0FBUyx3QkFBd0IsQ0FBQztJQUVuRjtFQUFBLEdBbkJrRDtJQUNsRCxNQUFNO0lBQ04sT0FBT0YsSUFBT0MsR0FBUztBQUNwQixlQUFTRSxLQUFPO0FBQ2JGLFVBQVEsS0FBSyxJQUFJQyxHQUFlLFFBQVcsU0FBUyx1QkFBdUIsQ0FBQztNQUMvRTtBQUVBSCxNQUFBQSxHQUFPLGlCQUFpQixTQUFTSSxFQUFJLEdBRXJDRixFQUFRLFFBQVEsR0FBRyxTQUFTLE1BQU1GLEdBQU8sb0JBQW9CLFNBQVNJLEVBQUksQ0FBQztJQUM5RTtFQUFBLENBWWdDLElBekJoQztBQTBCTjtBQzFCQSxJQUFNdFcsS0FBU25CLEdBQWEsSUFBSSx5QkFBeUI7QUFFbEQsU0FBUzBYLEdBQ2JDLElBQ0FDLElBQTBCLE9BQ087QUFDakMsUUFBTUMsSUFBVSxJQUFJLElBQUlGLEdBQWlCLElBQUksQ0FBQ2xjLE9BQVFBLEdBQUksWUFBQSxFQUFjLEtBQUEsQ0FBTSxDQUFDO0FBRS9FLFNBQU87SUFDSixNQUFNO0lBQ04sT0FBT29ILElBQWMwVSxHQUFTOztBQUMzQixZQUFNTyxLQUFNLEVBQUUsSUFBSWpWLEtBQUFBLEdBQWEsUUFBYkEsWUFBb0IsUUFBUSxJQUFBLEdBQ3hDa1YsSUFBZSxJQUFJO1FBQ3RCLE9BQU8sS0FBS1IsRUFBUSxHQUFHLEVBQUUsSUFBSSxDQUFDOWIsTUFBUUEsRUFBSSxZQUFBLEVBQWMsS0FBQSxDQUFNO01BQUE7QUFHakUsaUJBQVdBLEtBQU8sT0FBTyxLQUFLcWMsRUFBRyxHQUFHO0FBQ2pDLGNBQU1FLEtBQWF2YyxFQUFJLFlBQUEsRUFBYyxLQUFBO0FBR3JDLFlBQUksRUFBQSxDQUFDd2MsR0FBZ0JELEVBQVUsS0FBS0gsRUFBUSxJQUFJRyxFQUFVLElBSzFEO0FBQUEsY0FBSUQsRUFBYSxJQUFJQyxFQUFVO0FBQzVCLGtCQUFNLElBQUlSO2NBQ1A7Y0FDQTtjQUNBLFdBQVcvYixDQUFHO1lBQUE7QUFLcEIwRixhQUFPLG9EQUFvRDFGLENBQUcsR0FDOUQsT0FBT3FjLEdBQUlyYyxDQUFHO1FBQUE7TUFDakI7QUFFQSxhQUFPO1FBQ0osR0FBR29IO1FBQ0gsS0FBSztVQUNGLEdBQUdpVjtVQUNILHVDQUF1QyxPQUFPLENBQUNGLENBQXVCO1FBQUE7TUFDekU7SUFFTjtFQUFBO0FBRU47QUFFQSxTQUFTSyxHQUFnQnhjLElBQWE7QUFDbkMsUUFBTXVjLElBQWF2YyxHQUFJLFlBQUEsRUFBYyxLQUFBO0FBQ3JDLFNBQU91YyxFQUFXLFdBQVcsTUFBTSxLQUFLRSxFQUFZRixDQUFVO0FBQ2pFO0FDcERPLFNBQVNHLEdBQ2IzZCxLQUEyQyxDQUFBLEdBQ2I7QUFDOUIsU0FBTztJQUNKLE1BQU07SUFDTixPQUFPa0YsR0FBTSxFQUFFLEtBQUFvWSxFQUFBQSxHQUFPO0FBQ25CLGlCQUFXTSxNQUFpQkMsR0FBbUIzWSxHQUFNb1ksQ0FBRztBQUNyRCxZQUFJdGQsR0FBUTRkLEdBQWMsUUFBUSxNQUFNO0FBQ3JDLGdCQUFNLElBQUlaLEdBQWUsUUFBVyxVQUFVWSxHQUFjLE9BQU87QUFJekUsYUFBTzFZO0lBQ1Y7RUFBQTtBQUVOO0FDbEJPLFNBQVM0WSxHQUNiQyxJQUM4QjtBQUM5QixRQUFNaFosSUFBUzNCLEVBQWMyYSxJQUFlLElBQUk7QUFFaEQsU0FBTztJQUNKLE1BQU07SUFDTixPQUFPN1UsR0FBTTtBQUNWLGFBQU8sQ0FBQyxHQUFHbkUsR0FBUSxHQUFHbUUsQ0FBSTtJQUM3QjtFQUFBO0FBRU47QUNSQSxJQUFNOFUsU0FBUUMsd0JBQUFBLFVBQUFBLEVBQVc7QUFFbEIsU0FBU0MsR0FBMEI7RUFDdkMsU0FBQUMsS0FBVTtFQUNWLFFBQUFDLElBQVM7QUFDWixJQUF5QyxDQUFBLEdBQW9DO0FBQzFFLFdBQVNDLElBQWU7QUFDckIsUUFBSW5oQixJQUFXO0FBQ2YsVUFBTW9oQixLQUFTO01BQ1osV0FBT0wsd0JBQUFBLFVBQUE7TUFDUCxrQkFBY0Esd0JBQUFBLFVBQUE7TUFDZCxVQUFNQSx3QkFBQUEsVUFBQTtNQUNOLGlCQUFhQSx3QkFBQUEsVUFBQTtJQUFTLEdBR25CcFcsSUFBUyxRQUFRLEtBQUs7TUFDekJzVyxPQUFZLFFBQVFILEtBQVFNLEdBQU8sYUFBYTtNQUNoREYsTUFBVyxRQUFRSixLQUFRTSxHQUFPLFlBQVk7SUFBQSxDQUNoRDtBQUVELFdBQUFDLEdBQWlCSixJQUFTRyxHQUFPLE9BQU9BLEdBQU8sWUFBWSxHQUMzREMsR0FBaUJILEdBQVFFLEdBQU8sTUFBTUEsR0FBTyxXQUFXLEdBRWpEO01BQ0osTUFBTUUsR0FBYztBQUNqQnRoQixZQUFXc2hCLEdBQ1hGLEdBQU8sTUFBTSxLQUFBO01BQ2hCO01BQ0EsS0FBS0UsR0FBYztBQUNoQnRoQixZQUFXc2hCLEdBQ1hGLEdBQU8sS0FBSyxLQUFBO01BQ2Y7TUFDQSxJQUFJLFdBQVc7QUFDWixlQUFPcGhCO01BQ1Y7TUFDQSxRQUFBMks7SUFBQTtFQUVOO0FBRUEsV0FBUzBXLEdBQ05FLEdBQ0FDLElBQ0FDLEdBQ0Q7QUFDS0YsVUFBUyxVQUlaQSxNQUFTLE9BQU9DLEdBQU0sVUFBVUEsR0FBTSxRQUFRLEtBQUssTUFBTUUsR0FBTUgsQ0FBSSxDQUFDLEdBQUcsS0FBS0UsRUFBUSxJQUFJO0VBQzVGO0FBRUEsU0FBTztJQUNKLE1BQU07SUFDTixNQUFNLE9BQU83QixHQUFPLEVBQUUsU0FBQWhYLElBQVMsT0FBQStZLEVBQUFBLEdBQVM7O0FBQ3JDLFlBQU1QLElBQVNELEVBQUE7QUFFZixVQUFJUyxLQUFhLE1BQ2JDLEtBQWEsTUFBQTtBQUFZRCxRQUFBQSxLQUFhO01BQUE7QUFFMUNoWixZQUFBQSxHQUFRLFdBQVJBLG1CQUFnQixHQUFHLFFBQVFpWixNQUMzQmpaLEtBQUFBLEdBQVEsV0FBUkEsbUJBQWdCLEdBQUcsUUFBUWlaLEtBQzNCalosR0FBUSxHQUFHLFNBQVNpWixFQUFVLEdBRTlCalosR0FBUSxHQUFHLFNBQVMsQ0FBQzBZLE9BQWlCRixFQUFPLE1BQU1FLEVBQUksQ0FBQyxHQUN4RDFZLEdBQVEsR0FBRyxRQUFRLENBQUMwWSxPQUFpQkYsRUFBTyxLQUFLRSxFQUFJLENBQUM7QUFFdEQsVUFBSTtBQUNELGNBQU1GLEVBQU8sUUFDVFEsTUFDRCxNQUFNRixHQUFNLEVBQUUsR0FFakJDLEVBQU1QLEVBQU8sUUFBUTtNQUN4QixTQUFTelgsSUFBSztBQUNYZ1ksVUFBTVAsRUFBTyxVQUFVelgsRUFBWTtNQUN0QztJQUNIO0VBQUE7QUFFTjtBQzdFQSxJQUFNRixLQUFTbkIsR0FBYSxJQUFJLGVBQWU7QUFBL0MsSUFFTXdaLEtBQW1CO0FBRnpCLElBR01DLEtBQWtCO0FBRXhCLFNBQVNDLEdBQWNySixJQUFhO0FBQ2pDLFNBQU8sQ0FBQ0EsTUFBTyxDQUFDLGlDQUFpQyxLQUFLQSxFQUFHO0FBQzVEO0FBRUEsU0FBU3NKLEdBQ043ZSxJQUNBOGUsR0FDb0M7QUFDcEMsTUFBSTllLEdBQU0sU0FBUyxLQUFLQSxHQUFNLFNBQVM7QUFDcEMsVUFBTSxJQUFJMGMsR0FBZSxRQUFXLFVBQVVnQyxFQUFnQjtBQUlqRSxNQURjMWUsR0FBTSxLQUFLNGUsRUFBYTtBQUVuQyxRQUFJRTtBQUNEelksU0FBTyw4QkFBOEJyRyxFQUFLOztBQUUxQyxZQUFNLElBQUkwYyxHQUFlLFFBQVcsVUFBVWlDLEVBQWU7QUFJbkUsUUFBTSxDQUFDeFgsSUFBUTFDLENBQU0sSUFBSXpFO0FBQ3pCLFNBQU87SUFDSixRQUFBbUg7SUFDQSxRQUFBMUM7RUFBQTtBQUVOO0FBRU8sU0FBU3NhLEdBQ2JsRCxJQUNBN2IsSUFBb0MsQ0FBQyxLQUFLLEdBQzFDOGUsSUFBYyxPQUNmO0FBQ0MsTUFBSS9kLEtBQVM4ZCxHQUFlNVQsRUFBUWpMLENBQUssR0FBRzhlLENBQVc7QUFFdkRqRCxFQUFBQSxHQUFRLEdBQUcsVUFBVSxDQUFDN2IsTUFBVTtBQUM3QmUsSUFBQUEsS0FBUzhkLEdBQWU1VCxFQUFRakwsQ0FBSyxHQUFHOGUsQ0FBVyxHQUNuRHpZLEdBQU8sS0FBSyxvQkFBb0J0RixFQUFNO0VBQ3pDLENBQUMsR0FFRDhhLEdBQVEsT0FBTyxnQkFBZ0IsTUFDckI5YSxHQUFPLE1BQ2hCLEdBRUQ4YSxHQUFRLE9BQU8sY0FBYyxDQUFDalQsTUFDcEI3SCxHQUFPLFNBQVMsQ0FBQ0EsR0FBTyxRQUFRLEdBQUc2SCxDQUFJLElBQUlBLENBQ3BEO0FBQ0o7QUN4REEsSUFBTW9XLEtBQVU7RUFDYix3QkFBd0I7SUFDckIsTUFBTTtJQUNOLFVBQ0c7RUFBQTtFQUVOLFNBQVM7SUFDTixNQUFNO0lBQ04sVUFBVTtFQUFBO0FBRWhCO0FBSUEsU0FBU0MsR0FBVXRhLElBQStDO0FBQy9ELE1BQUksQ0FBQ0E7QUFDRixXQUFPO0FBRVYsYUFBVyxDQUFDcUQsR0FBUSxFQUFFLE1BQUE3SyxFQUFBLENBQU0sS0FBSyxPQUFPLFFBQVE2aEIsRUFBTztBQUNwRCxRQUFJcmEsR0FBUSxXQUFXLFVBQVV4SCxDQUFJLEVBQUU7QUFDcEMsYUFBTzZLO0FBR2IsU0FBTztBQUNWO0FBU08sSUFBTWtYLEtBQU4sY0FBb0MxWSxHQUFTO0VBR2pELFlBQVk3QixJQUFVLElBQUk7O0FBQ3ZCLFVBQU1xRCxJQUFTaVgsR0FBVXRhLENBQU87QUFFaEMsVUFBTSxTQUFXcWEsY0FBUWhYLENBQU0sRUFBRSxhQUFoQmdYLG1CQUEwQixRQUFRLGFBQWFyYSxPQUEvQ3FhLFlBQTJEcmEsQ0FBTyxHQUNuRixLQUFLLFNBQVNxRDtFQUNqQjtBQUNIO0FDckNBLFNBQVNtWCxHQUFZNVgsSUFBb0I7QUFDdEMsU0FBTyxDQUFDLEVBQUVBLEdBQU8sWUFBWUEsR0FBTyxPQUFPO0FBQzlDO0FBRUEsU0FBUzZYLEdBQWdCN1gsSUFBb0I7QUFDMUMsU0FBTyxPQUFPLE9BQU8sQ0FBQyxHQUFHQSxHQUFPLFFBQVEsR0FBR0EsR0FBTyxNQUFNLENBQUM7QUFDNUQ7QUFFTyxTQUFTOFgsR0FDYkMsS0FBWSxPQUNaQyxJQUFVSixJQUNWSyxJQUF1REosSUFDeEQ7QUFDQyxTQUFPLENBQUN2aUIsSUFBbUMwSyxNQUNuQyxDQUFDK1gsTUFBYXppQixNQUFVLENBQUMwaUIsRUFBUWhZLENBQU0sSUFDbEMxSyxLQUdIMmlCLEVBQWFqWSxDQUFNO0FBRWhDO0FBRUEsU0FBU2tZLEdBQWU3aUIsSUFBa0IrSCxHQUFpQjtBQUN4RCxTQUFJL0gsT0FBYSxPQUFPK0gsRUFBUSxXQUFXLFFBQVEsSUFDekMsSUFBSXVhLEdBQXNCdmEsQ0FBTyxJQUdwQyxJQUFJNkIsR0FBUyxRQUFXN0IsQ0FBTztBQUN6QztBQUVPLFNBQVMrYSxHQUNiM2UsSUFDOEI7QUFDOUIsU0FBTztJQUNKLE1BQU07SUFDTixPQUFPNkgsR0FBTTZULEdBQVM7QUFDbkIsWUFBTTVmLEtBQVFrRSxHQUFPNkgsRUFBSyxPQUFPO1FBQzlCLFFBQVE2VCxFQUFRO1FBQ2hCLFFBQVFBLEVBQVE7UUFDaEIsVUFBVUEsRUFBUTtNQUFBLENBQ3BCO0FBRUQsYUFBSSxPQUFPLFNBQVM1ZixFQUFLLElBQ2Y7UUFDSixPQUFPNGlCLEdBQWVoRCxFQUFRLFVBQVU1ZixHQUFNLFNBQVMsT0FBTyxDQUFDO01BQUEsSUFJOUQ7UUFDSixPQUFBQTtNQUFBO0lBRU47RUFBQTtBQUVOO0FDdkRBLElBQU13SixLQUFTbkIsR0FBYSxJQUFJLGNBQWM7QUFFdkMsU0FBU3lhLEdBQ2IzZixJQUNzQztBQUN0QyxTQUFPO0lBQ0osTUFBTTtJQUNOLE9BQU93YyxHQUFPLEVBQUUsVUFBQS9kLEdBQVUsT0FBT21oQixJQUFXLFNBQVMsRUFBRSxPQUFBQyxFQUFBLEVBQUEsR0FBVzs7QUFDL0QsVUFBSSxDQUFDQTtBQUNGO0FBR0gsWUFBTUMsTUFBVTlmLEtBQUFBLE1BQUFBLGdCQUFBQSxHQUFRLENBQUMsR0FBR3ZCLENBQVEsT0FBcEJ1QixZQUEwQjRmO0FBQzFDLFVBQUksQ0FBQ0U7QUFDRixlQUFPelosR0FBTyxxREFBcUQ7QUFHdEVBLFNBQU8sNkJBQTZCMFosR0FBV0QsRUFBTyxDQUFDLEdBRXZERCxFQUFNLEdBQUcsU0FBUyxDQUFDdFosTUFBK0I7QUFFM0NBLFVBQUksU0FBUyxXQUNkRixHQUFPLDBCQUEwQkUsQ0FBRztNQUUxQyxDQUFDLEdBRURzWixFQUFNLElBQUlDLEVBQU87SUFDcEI7RUFBQTtBQUVOO0FDeEJPLElBQU1FLEtBQU4sTUFBa0I7RUFBbEIsY0FBQTtBQUNKLFNBQVEsVUFBQSxvQkFBeUQsSUFBQSxHQUNqRSxLQUFRLFNBQVMsSUFBSUMsbUJBQUFBLGFBQUE7RUFBYTtFQUVsQyxHQUNHL00sR0FDQWdOLEdBQ0Q7QUFDQyxTQUFLLE9BQU8sR0FBR2hOLEdBQU1nTixDQUFRO0VBQ2hDO0VBRUEsWUFBbURoTixHQUFTdEssR0FBZ0M7QUFDekYsU0FBSyxPQUFPLEtBQUtzSyxHQUFNdEssQ0FBSTtFQUM5QjtFQUVPLE9BQXNDc0ssR0FBUzdWLEdBQXNDO0FBQ3pGLFVBQU04aUIsS0FBU25lLEdBQU8sS0FBSyxTQUFTLEVBQUUsTUFBQWtSLEdBQU0sUUFBQTdWLEVBQUFBLENBQVE7QUFFcEQsV0FBTyxNQUFNLEtBQUssUUFBUSxPQUFPOGlCLEVBQU07RUFDMUM7RUFFTyxJQUNKQSxHQUNEO0FBQ0MsVUFBTXRFLElBQWdDLENBQUE7QUFFdEMsV0FBQTVRLEVBQVFrVixDQUFNLEVBQUU7TUFDYixDQUFDQSxPQUFBQTtBQUFpQkEsUUFBQUEsTUFBVSxLQUFLLFFBQVEsSUFBSW5lLEdBQU82WixHQUFTc0UsRUFBTSxDQUFDO01BQUE7SUFBQSxHQUdoRSxNQUFNO0FBQ1Z0RSxRQUFRLFFBQVEsQ0FBQ3NFLE9BQUFBO0FBQWdCLGFBQUssUUFBUSxPQUFPQSxFQUFNO01BQUEsQ0FBQztJQUMvRDtFQUNIO0VBRU8sS0FDSmpOLEdBQ0F0SyxHQUNBNlQsSUFDWTtBQUNaLFFBQUluVSxJQUFTTTtBQUNiLFVBQU13WCxLQUFhLE9BQU8sT0FBTyxPQUFPLE9BQU8zRCxFQUFPLENBQUM7QUFFdkQsZUFBVzBELEtBQVUsS0FBSztBQUNuQkEsUUFBTyxTQUFTak4sTUFDakI1SyxJQUFTNlgsRUFBTyxPQUFPN1gsR0FBUThYLEVBQVU7QUFJL0MsV0FBTzlYO0VBQ1Y7QUFDSDtBQ3pETyxTQUFTK1gsR0FBc0IvWixJQUF1RDtBQUMxRixRQUFNZ2EsSUFBa0IsY0FDbEJDLElBQWtCLENBQUMsWUFBWSxTQUFTLFNBQVMsUUFBUSxNQUFNO0FBcUNyRSxTQUFPLENBWHVDO0lBQzNDLE1BQU07SUFDTixPQUFPM2IsSUFBTTZYLEdBQVM7QUFDbkIsYUFBSzhELEVBQWdCLFNBQVM5RCxFQUFRLE1BQU0sSUFJckMrRCxHQUFVNWIsSUFBTTBiLENBQWUsSUFINUIxYjtJQUliO0VBQUEsR0FoQ2dEO0lBQ2hELE1BQU07SUFDTixPQUFPNFgsSUFBT0MsR0FBUzs7QUFDZkEsUUFBUSxTQUFTLFNBQVM2RCxDQUFlLE9BSTlDN0QsT0FBUSxRQUFRLFdBQWhCQSxtQkFBd0IsR0FBRyxRQUFRLENBQUNnRSxNQUFrQjtBQUNuRCxjQUFNOWIsS0FBVSx5Q0FBeUMsS0FBSzhiLEVBQU0sU0FBUyxNQUFNLENBQUM7QUFDL0U5YixRQUFBQSxNQUlMMkIsR0FBUztVQUNOLFFBQVFtVyxFQUFRO1VBQ2hCLE9BQU9pRSxHQUFtQi9iLEdBQVEsQ0FBQyxDQUFDO1VBQ3BDLFVBQVVsQixFQUFTa0IsR0FBUSxDQUFDLENBQUM7VUFDN0IsV0FBV2xCLEVBQVNrQixHQUFRLENBQUMsQ0FBQztVQUM5QixPQUFPbEIsRUFBU2tCLEdBQVEsQ0FBQyxDQUFDO1FBQUEsQ0FDNUI7TUFDSjtJQUNIO0VBQUEsQ0FjdUI7QUFDN0I7QUFFQSxTQUFTK2IsR0FBbUIxZ0IsSUFBZTtBQUN4QyxTQUFPLE9BQU9BLEdBQU0sWUFBQSxFQUFjLE1BQU0sS0FBSyxDQUFDLENBQUMsS0FBSztBQUN2RDtBQzNDTyxTQUFTMmdCLEdBQ2I1WSxJQUNpQztBQUNqQyxRQUFNckksSUFBVWtoQixHQUFLN1ksSUFBYyxDQUFDLE9BQU8sS0FBSyxDQUFDO0FBRWpELFNBQU87SUFDSixNQUFNO0lBQ04sT0FBT2EsR0FBTTtBQUNWLGFBQU8sRUFBRSxHQUFHbEosR0FBUyxHQUFHa0osRUFBQTtJQUMzQjtFQUFBO0FBRU47QUNaTyxTQUFTaVksS0FBbUQ7QUFDaEUsU0FBTztJQUNKLE1BQU07SUFDTixPQUFPalksSUFBTTtBQUNWLFlBQU1uRSxJQUFtQixDQUFBO0FBQ3pCLFVBQUltTDtBQUNKLGVBQVM1TixHQUFPNEMsR0FBZ0I7QUFDN0IsU0FBQ2dMLElBQVNBLEtBQVUsQ0FBQSxHQUFJLEtBQUssR0FBR2hMLENBQUk7TUFDdkM7QUFFQSxlQUFTcEQsSUFBSSxHQUFHQSxJQUFJb0gsR0FBSyxRQUFRcEgsS0FBSztBQUNuQyxjQUFNdUIsS0FBUTZGLEdBQUtwSCxDQUFDO0FBRXBCLFlBQUlzZixFQUFXL2QsRUFBSyxHQUFHO0FBQ3BCZixVQUFBQSxHQUFPK2UsRUFBUWhlLEVBQUssQ0FBQztBQUNyQjtRQUNIO0FBRUEsWUFBSUEsT0FBVSxNQUFNO0FBQ2pCZixVQUFBQTtZQUNHNEcsR0FBSyxNQUFNcEgsSUFBSSxDQUFDLEVBQUUsUUFBUSxDQUFDUixNQUFVOGYsRUFBVzlmLENBQUksS0FBSytmLEVBQVEvZixDQUFJLEtBQU1BLENBQUk7VUFBQTtBQUVsRjtRQUNIO0FBRUF5RCxVQUFPLEtBQUsxQixFQUFLO01BQ3BCO0FBRUEsYUFBUTZNLElBQWtCLENBQUMsR0FBR25MLEdBQVEsTUFBTSxHQUFHbUwsRUFBTyxJQUFJLE1BQU0sQ0FBQyxJQUFoRG5MO0lBQ3BCO0VBQUE7QUFFTjtBQy9CTyxTQUFTdWMsR0FBYztFQUMzQixPQUFBQztFQUNBLFFBQUF4WixJQUFTO0VBQ1QsUUFBQTVELElBQVM7QUFDWixHQUEyRjtBQUN4RixNQUFJb2QsS0FBUTtBQUNULFdBQU87TUFDSixNQUFNO01BQ04sT0FBT3pFLElBQU9DLEdBQVM7O0FBQ3BCLFlBQUk0QjtBQUVKLGlCQUFTNkMsSUFBTztBQUNiN0MsVUFBQUEsTUFBVyxhQUFhQSxFQUFPLEdBQy9CQSxLQUFVLFdBQVcxQixJQUFNc0UsRUFBSztRQUNuQztBQUVBLGlCQUFTRSxJQUFPOztBQUNiMUUsV0FBQUEsTUFBQUEsRUFBUSxRQUFRLFdBQWhCQSxnQkFBQUEsSUFBd0IsSUFBSSxRQUFReUUsS0FDcEN6RSxNQUFBQSxFQUFRLFFBQVEsV0FBaEJBLGdCQUFBQSxJQUF3QixJQUFJLFFBQVF5RSxJQUNwQ3pFLEVBQVEsUUFBUSxJQUFJLFFBQVEwRSxDQUFJLEdBQ2hDMUUsRUFBUSxRQUFRLElBQUksU0FBUzBFLENBQUksR0FDakM5QyxNQUFXLGFBQWFBLEVBQU87UUFDbEM7QUFFQSxpQkFBUzFCLEtBQU87QUFDYndFLFlBQUEsR0FDQTFFLEVBQVEsS0FBSyxJQUFJQyxHQUFlLFFBQVcsV0FBVyx1QkFBdUIsQ0FBQztRQUNqRjtBQUVBN1ksZUFBVTRZLE9BQVEsUUFBUSxXQUFoQkEsbUJBQXdCLEdBQUcsUUFBUXlFLEtBQzdDelosT0FBVWdWLE9BQVEsUUFBUSxXQUFoQkEsbUJBQXdCLEdBQUcsUUFBUXlFLEtBQzdDekUsRUFBUSxRQUFRLEdBQUcsUUFBUTBFLENBQUksR0FDL0IxRSxFQUFRLFFBQVEsR0FBRyxTQUFTMEUsQ0FBSSxHQUVoQ0QsRUFBQTtNQUNIO0lBQUE7QUFHVDtBQ25CTyxJQUFNRSxLQUE4QixDQUN4Q0MsSUFDQTNoQixNQUNFOztBQUNGLFFBQU1tYyxJQUFVLElBQUltRSxHQUFBLEdBQ2RqZixLQUFTdWdCO0lBQ1hELE9BQVksT0FBT0EsTUFBWSxXQUFXLEVBQUUsU0FBQUEsR0FBQSxJQUFZQSxPQUFhLENBQUE7SUFDdEUzaEI7RUFBQTtBQUdILE1BQUksQ0FBQ3VKLEdBQWFsSSxHQUFPLE9BQU87QUFDN0IsVUFBTSxJQUFJd2dCO01BQ1B4Z0I7TUFDQTtJQUFBO0FBSU4sU0FBSSxNQUFNLFFBQVFBLEdBQU8sTUFBTSxLQUM1QjhhLEVBQVEsSUFBSTJCLEdBQTZCemMsR0FBTyxNQUFNLENBQUMsR0FHMUQ4YSxFQUFRLElBQUl3QixHQUE0QnRjLEdBQU8sTUFBTSxDQUFDLEdBQ3REOGEsRUFBUSxJQUFJK0IsR0FBMEI3YyxHQUFPLFVBQVUsQ0FBQyxHQUN4REEsR0FBTyxTQUFTOGEsRUFBUSxJQUFJUyxHQUFZdmIsR0FBTyxLQUFLLENBQUMsR0FDckRBLEdBQU8sWUFBWThhLEVBQVEsSUFBSXdFLEdBQXNCdGYsR0FBTyxRQUFRLENBQUMsR0FDckVBLEdBQU8sV0FBVzhhLEVBQVEsSUFBSW1GLEdBQWNqZ0IsR0FBTyxPQUFPLENBQUMsR0FDM0RBLEdBQU8sZ0JBQWdCOGEsRUFBUSxJQUFJOEUsR0FBbUI1ZixHQUFPLFlBQVksQ0FBQyxHQUMxRThhLEVBQVEsSUFBSWdGLEdBQUFBLENBQW1CLEdBRS9CaEYsRUFBUSxJQUFJOEQsR0FBWTVlLEdBQU8sS0FBSyxDQUFDLEdBQ3JDOGEsRUFBUSxJQUFJNkQsR0FBcUJMLEdBQXNCLElBQUksQ0FBQyxDQUFDLEdBQzdEdGUsR0FBTyxVQUFVOGEsRUFBUSxJQUFJNkQsR0FBcUIzZSxHQUFPLE1BQU0sQ0FBQyxHQUVoRWdlLEdBQW1CbEQsR0FBUzlhLEdBQU8sU0FBUUEsS0FBQUEsR0FBTyxXQUFQQSxtQkFBZSx1QkFBdUIsR0FFakY4YSxFQUFRO0lBQ0xlLElBQXVCN2IsS0FBQUEsR0FBTyxxQkFBUEEsWUFBMkIsQ0FBQSxJQUFJQSxLQUFBQSxHQUFPLFdBQVBBLG1CQUFlLHVCQUF1QjtFQUFBLEdBR3hGLElBQUk2YSxHQUFJN2EsSUFBUThhLENBQU87QUFDakM7OztBN0dsREEsVUFBcUI7QUFDckIsSUFBQTJGLFFBQXNCO0FBQ3RCLElBQUFDLE1BQW9COzs7QThHZnBCLHNCQUEwQztBQVduQyxJQUFNLG9CQUFOLGNBQWdDLHNCQUFNO0FBQUEsRUFNekMsWUFDSSxLQUNBLFFBQ0EsU0FDQSxXQUNBLFVBQ0Y7QUFDRSxVQUFNLEdBQUc7QUFDVCxTQUFLLFNBQVM7QUFDZCxTQUFLLFVBQVU7QUFDZixTQUFLLFlBQVk7QUFDakIsU0FBSyxXQUFXO0FBQUEsRUFDcEI7QUFBQSxFQUVBLFNBQVM7QUFDTCxVQUFNLEVBQUUsVUFBVSxJQUFJO0FBQ3RCLGNBQVUsTUFBTTtBQUNoQixjQUFVLFNBQVMseUJBQXlCO0FBRTVDLGNBQVUsU0FBUyxNQUFNLEVBQUUsTUFBTSx1Q0FBUyxDQUFDO0FBRTNDLGNBQVUsU0FBUyxLQUFLO0FBQUEsTUFDcEIsTUFBTSxxQ0FBWSxLQUFLLFFBQVEsS0FBSztBQUFBLE1BQ3BDLEtBQUs7QUFBQSxJQUNULENBQUM7QUFFRCxVQUFNLE9BQU8sVUFBVSxVQUFVLEVBQUUsS0FBSyx5QkFBeUIsQ0FBQztBQUNsRSxTQUFLLFNBQVMsT0FBTztBQUFBLE1BQ2pCLE1BQU0saUNBQVEsS0FBSyxVQUFVLElBQUk7QUFBQSxJQUNyQyxDQUFDO0FBQ0QsU0FBSyxTQUFTLE9BQU87QUFBQSxNQUNqQixNQUFNLHlCQUFVLEtBQUssUUFBUSxZQUFZO0FBQUEsSUFDN0MsQ0FBQztBQUVELFVBQU0sVUFBVSxVQUFVLFVBQVUsRUFBRSxLQUFLLDRCQUE0QixDQUFDO0FBRXhFLFVBQU0sWUFBWSxRQUFRLFNBQVMsVUFBVTtBQUFBLE1BQ3pDLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxJQUNULENBQUM7QUFDRCxjQUFVLFVBQVU7QUFBQSxNQUNoQixNQUFNO0FBQUEsTUFDTixLQUFLO0FBQUEsSUFDVCxDQUFDO0FBQ0QsY0FBVSxVQUFVLE1BQU07QUFDdEIsV0FBSyxTQUFTLFdBQVc7QUFDekIsV0FBSyxNQUFNO0FBQUEsSUFDZjtBQUVBLFVBQU0sT0FBTyxRQUFRLFNBQVMsVUFBVTtBQUFBLE1BQ3BDLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxJQUNULENBQUM7QUFDRCxTQUFLLFVBQVU7QUFBQSxNQUNYLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxJQUNULENBQUM7QUFDRCxTQUFLLFVBQVUsTUFBTTtBQUNqQixXQUFLLFNBQVMsTUFBTTtBQUNwQixXQUFLLE1BQU07QUFBQSxJQUNmO0FBRUEsVUFBTSxTQUFTLFVBQVUsU0FBUyxVQUFVO0FBQUEsTUFDeEMsTUFBTTtBQUFBLE1BQ04sS0FBSztBQUFBLElBQ1QsQ0FBQztBQUNELFdBQU8sVUFBVSxNQUFNO0FBQ25CLFdBQUssU0FBUyxRQUFRO0FBQ3RCLFdBQUssTUFBTTtBQUFBLElBQ2Y7QUFBQSxFQUNKO0FBQUEsRUFFQSxVQUFVO0FBRU4sU0FBSyxTQUFTLFFBQVE7QUFBQSxFQUMxQjtBQUNKO0FBRUEsZUFBc0Isb0JBQ2xCLFFBQ0EsU0FDQSxXQUN3QztBQUN4QyxTQUFPLElBQUksUUFBUSxDQUFDQyxhQUFZO0FBQzVCLFFBQUksV0FBVztBQUVmLFVBQU0sU0FBUyxDQUFDLFdBQTRDO0FBQ3hELFVBQUksU0FBVTtBQUNkLGlCQUFXO0FBQ1gsTUFBQUEsU0FBUSxNQUFNO0FBQUEsSUFDbEI7QUFFQSxVQUFNLFFBQVEsSUFBSTtBQUFBLE1BQ2QsT0FBTztBQUFBLE1BQ1A7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNKO0FBRUEsVUFBTSxLQUFLO0FBQUEsRUFDZixDQUFDO0FBQ0w7QUFFQSxlQUFzQixZQUNsQixRQUNBLFNBQ0EsV0FDRjtBQUNFLFFBQU0sT0FBTyxJQUFJLE1BQU0sT0FBTyxXQUFXLFFBQVEsT0FBTztBQUM1RDtBQUVBLGVBQXNCLGtCQUNsQixRQUNBLFNBQ0EsV0FDYztBQXJJbEI7QUFzSUksUUFBTSxjQUFhLHFCQUFVLFdBQVYsbUJBQWtCLFNBQWxCLFlBQTBCO0FBQzdDLFFBQU0sWUFBWTtBQUNsQixRQUFNLFlBQVksUUFBUTtBQUUxQixNQUFJLFdBQVcsR0FBRyxTQUFTLDJCQUFPLFNBQVM7QUFDM0MsTUFBSSxXQUFXLGNBQWMsZUFBZSxNQUN0QyxHQUFHLFVBQVUsSUFBSSxRQUFRLEtBQ3pCO0FBRU4sTUFBSSxRQUFRO0FBQ1osU0FBTyxPQUFPLElBQUksTUFBTSxzQkFBc0IsUUFBUSxHQUFHO0FBQ3JELGVBQVcsR0FBRyxTQUFTLHNCQUFPLEtBQUssU0FBSSxTQUFTO0FBQ2hELGVBQVcsY0FBYyxlQUFlLE1BQ2xDLEdBQUcsVUFBVSxJQUFJLFFBQVEsS0FDekI7QUFDTjtBQUFBLEVBQ0o7QUFFQSxRQUFNLE9BQU8sSUFBSSxNQUFNLE9BQU8sVUFBVSxRQUFRLE9BQU87QUFFdkQsUUFBTSxXQUFXLE9BQU8sSUFBSSxNQUFNLHNCQUFzQixRQUFRO0FBQ2hFLE1BQUksRUFBRSxvQkFBb0Isd0JBQVE7QUFDOUIsVUFBTSxJQUFJLE1BQU0sZ0dBQTBCO0FBQUEsRUFDOUM7QUFFQSxTQUFPO0FBQ1g7OztBQ2hLQSxJQUFBQyxtQkFBeUM7QUFDekMsSUFBQUMsTUFBb0I7QUFDcEIsV0FBc0I7QUFJdEIsZUFBc0IsZ0JBQ2xCLFFBQ0EsU0FDYztBQUNkLFFBQU0sVUFBVSxPQUFPLElBQUksTUFBTTtBQUVqQyxNQUFJLEVBQUUsbUJBQW1CLHFDQUFvQjtBQUN6QyxVQUFNLElBQUksTUFBTSwrR0FBMEI7QUFBQSxFQUM5QztBQUVBLFFBQU0sZUFBZSxPQUFPLFNBQVMsZ0JBQWdCO0FBQ3JELFFBQU0saUJBQ0QsVUFBSyxjQUFjLFFBQVEsWUFBWSxFQUN2QyxNQUFXLFFBQUcsRUFDZCxLQUFLLEdBQUc7QUFFYixRQUFNLGlCQUFzQjtBQUFBLElBQ3hCLFFBQVEsWUFBWTtBQUFBLElBQ3BCO0FBQUEsRUFDSjtBQUVBLEVBQUcsY0FBZSxhQUFRLGNBQWMsR0FBRyxFQUFFLFdBQVcsS0FBSyxDQUFDO0FBRTlELFFBQU0sUUFBUSxNQUFNLGdCQUFnQixRQUFRLE9BQU87QUFFbkQsUUFBTSxPQUFPLE9BQU8sSUFBSSxNQUFNLHNCQUFzQixjQUFjO0FBQ2xFLE1BQUksRUFBRSxnQkFBZ0IseUJBQVE7QUFDMUIsVUFBTSxJQUFJLE1BQU0sZ0dBQTBCO0FBQUEsRUFDOUM7QUFFQSxTQUFPO0FBQ1g7OztBQ3JDQSxJQUFBQyxtQkFBNkQ7QUFFN0QsSUFBQUMsTUFBb0I7QUFDcEIsSUFBQUMsUUFBc0I7QUFDdEIsSUFBQUMsTUFBb0I7OztBQ0pwQixJQUFBQyxtQkFBdUI7QUFRdkIsZUFBc0Isb0JBQ2xCLFFBQ0EsVUFBZ0MsQ0FBQyxHQUNwQjtBQUNiLFFBQU0sRUFBRSxTQUFTLE1BQU0sSUFBSTtBQUUzQixNQUFJO0FBQ0EsVUFBTSxTQUFTLE9BQU8sSUFBSSxVQUFVO0FBQUEsTUFDaEMsT0FBTztBQUFBLElBQ1g7QUFFQSxRQUFJLE9BQU8sV0FBVyxHQUFHO0FBRXJCO0FBQUEsSUFDSjtBQUVBLGVBQVcsUUFBUSxRQUFRO0FBQ3ZCLFlBQU0sT0FBTyxLQUFLO0FBQ2xCLFVBQUksUUFBUSxPQUFPLEtBQUssWUFBWSxZQUFZO0FBQzVDLGNBQU0sS0FBSyxRQUFRO0FBQUEsTUFDdkI7QUFBQSxJQUNKO0FBQUEsRUFDSixTQUFTLE9BQU87QUFDWixRQUFJLENBQUMsUUFBUTtBQUNULFVBQUk7QUFBQSxRQUNBLHlEQUNJLGlCQUFpQixRQUFRLE1BQU0sVUFBVSxPQUFPLEtBQUssQ0FDekQ7QUFBQSxNQUNKO0FBQUEsSUFDSixPQUFPO0FBQ0gsY0FBUSxLQUFLLDBEQUFhLEtBQUs7QUFBQSxJQUNuQztBQUFBLEVBQ0o7QUFDSjs7O0FEakNPLElBQU0scUJBQU4sY0FBaUMsdUJBQU07QUFBQSxFQVMxQyxZQUFZLEtBQVUsUUFBd0IsTUFBYTtBQUN2RCxVQUFNLEdBQUc7QUFQYixtQkFBb0IsQ0FBQztBQUNyQiwwQkFBaUI7QUFPYixTQUFLLFNBQVM7QUFDZCxTQUFLLE9BQU87QUFBQSxFQUNoQjtBQUFBLEVBRUEsTUFBTSxTQUFTO0FBQ1gsVUFBTSxFQUFFLFVBQVUsSUFBSTtBQUN0QixjQUFVLE1BQU07QUFDaEIsY0FBVSxTQUFTLGtCQUFrQjtBQUVyQyxjQUFVLFNBQVMsTUFBTSxFQUFFLE1BQU0scUJBQU0sS0FBSyxLQUFLLFFBQVEsR0FBRyxDQUFDO0FBQzdELGNBQVUsU0FBUyxLQUFLO0FBQUEsTUFDcEIsTUFBTTtBQUFBLE1BQ04sS0FBSztBQUFBLElBQ1QsQ0FBQztBQUVELFVBQU0sVUFBVSxVQUFVLFVBQVU7QUFBQSxNQUNoQyxNQUFNO0FBQUEsTUFDTixLQUFLO0FBQUEsSUFDVCxDQUFDO0FBRUQsUUFBSTtBQUNBLFdBQUssVUFBVSxNQUFNLEtBQUssT0FBTyxpQkFBaUI7QUFDbEQsY0FBUSxPQUFPO0FBQ2YsV0FBSyxXQUFXO0FBQUEsSUFDcEIsU0FBUyxPQUFPO0FBQ1osY0FBUSxPQUFPO0FBQ2YsZ0JBQVUsVUFBVTtBQUFBLFFBQ2hCLE1BQU0sNkNBQVUsaUJBQWlCLFFBQVEsTUFBTSxVQUFVLE9BQU8sS0FBSyxDQUFDO0FBQUEsUUFDdEUsS0FBSztBQUFBLE1BQ1QsQ0FBQztBQUFBLElBQ0w7QUFBQSxFQUNKO0FBQUEsRUFFQSxhQUFhO0FBQ1QsVUFBTSxFQUFFLFVBQVUsSUFBSTtBQUV0QixVQUFNLFFBQVEsVUFBVSxVQUFVLEVBQUUsS0FBSyxtQkFBbUIsQ0FBQztBQUM3RCxVQUFNLFNBQVMsU0FBUztBQUFBLE1BQ3BCLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxJQUNULENBQUM7QUFFRCxTQUFLLFdBQVcsTUFBTSxTQUFTLFVBQVU7QUFBQSxNQUNyQyxLQUFLO0FBQUEsSUFDVCxDQUFDO0FBRUQsU0FBSyxTQUFTLFNBQVMsVUFBVTtBQUFBLE1BQzdCLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxJQUNYLENBQUM7QUFFRCxlQUFXLFVBQVUsS0FBSyxTQUFTO0FBQy9CLFdBQUssU0FBUyxTQUFTLFVBQVU7QUFBQSxRQUM3QixNQUFNLFVBQVU7QUFBQSxRQUNoQixPQUFPO0FBQUEsTUFDWCxDQUFDO0FBQUEsSUFDTDtBQUVBLFNBQUssU0FBUyxXQUFXLE1BQU07QUFDM0IsV0FBSyxpQkFBaUIsS0FBSyxTQUFTO0FBQ3BDLFVBQUksS0FBSyxTQUFTLE9BQU87QUFDckIsYUFBSyxZQUFZLFFBQVE7QUFBQSxNQUM3QjtBQUFBLElBQ0o7QUFFQSxVQUFNLFdBQVcsVUFBVSxVQUFVLEVBQUUsS0FBSyxtQkFBbUIsQ0FBQztBQUNoRSxhQUFTLFNBQVMsU0FBUztBQUFBLE1BQ3ZCLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxJQUNULENBQUM7QUFFRCxTQUFLLGNBQWMsU0FBUyxTQUFTLFNBQVM7QUFBQSxNQUMxQyxNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixLQUFLO0FBQUEsSUFDVCxDQUFDO0FBRUQsYUFBUyxVQUFVO0FBQUEsTUFDZixNQUFNO0FBQUEsTUFDTixLQUFLO0FBQUEsSUFDVCxDQUFDO0FBRUQsU0FBSyxZQUFZLFVBQVUsTUFBTTtBQUM3QixVQUFJLEtBQUssWUFBWSxNQUFNLEtBQUssR0FBRztBQUMvQixhQUFLLFNBQVMsUUFBUTtBQUN0QixhQUFLLGlCQUFpQjtBQUFBLE1BQzFCO0FBQUEsSUFDSjtBQUVBLFVBQU0sU0FBUyxVQUFVLFVBQVUsRUFBRSxLQUFLLG9CQUFvQixDQUFDO0FBRS9ELFVBQU0sU0FBUyxPQUFPLFNBQVMsVUFBVTtBQUFBLE1BQ3JDLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxJQUNULENBQUM7QUFDRCxXQUFPLFVBQVUsTUFBTSxLQUFLLE1BQU07QUFFbEMsU0FBSyxlQUFlLE9BQU8sU0FBUyxVQUFVO0FBQUEsTUFDMUMsTUFBTTtBQUFBLE1BQ04sS0FBSztBQUFBLElBQ1QsQ0FBQztBQUNELFNBQUssYUFBYSxVQUFVLFlBQVk7QUFDcEMsWUFBTSxlQUFlLEtBQUssWUFBWSxNQUFNLEtBQUs7QUFDakQsWUFBTSxTQUFTLGdCQUFnQixLQUFLLFNBQVM7QUFFN0MsV0FBSyxhQUFhLFdBQVc7QUFDN0IsV0FBSyxhQUFhLGNBQWM7QUFFaEMsVUFBSTtBQUNBLGNBQU0sbUJBQW1CLEtBQUssUUFBUSxLQUFLLE1BQU0sTUFBTTtBQUN2RCxZQUFJO0FBQUEsVUFDQSxTQUFJLEtBQUssS0FBSyxRQUFRLGtDQUFTLFVBQVUsZ0NBQU87QUFBQSxRQUNwRDtBQUNBLGNBQU0sb0JBQW9CLEtBQUssUUFBUSxFQUFFLFFBQVEsS0FBSyxDQUFDO0FBQ3ZELGFBQUssTUFBTTtBQUFBLE1BQ2YsU0FBUyxPQUFPO0FBQ1osWUFBSTtBQUFBLFVBQ0EsaUNBQ0ksaUJBQWlCLFFBQVEsTUFBTSxVQUFVLE9BQU8sS0FBSyxDQUN6RDtBQUFBLFFBQ0o7QUFBQSxNQUNKLFVBQUU7QUFDRSxhQUFLLGFBQWEsV0FBVztBQUM3QixhQUFLLGFBQWEsY0FBYztBQUFBLE1BQ3BDO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDSjtBQUVBLGVBQXNCLG1CQUNsQixRQUNBLE1BQ0EsUUFDRjtBQUNFLFFBQU0sVUFBVSxPQUFPLElBQUksTUFBTTtBQUVqQyxNQUFJLEVBQUUsbUJBQW1CLHFDQUFvQjtBQUN6QyxVQUFNLElBQUksTUFBTSwrR0FBMEI7QUFBQSxFQUM5QztBQUVBLFFBQU0sVUFBVSxNQUFNLE9BQU8sWUFBWTtBQUV6QyxNQUFJO0FBQ0EsUUFBSSxjQUFjLE9BQ2IsS0FBSyxFQUNMLFFBQVEsT0FBTyxHQUFHLEVBQ2xCLFFBQVEsY0FBYyxFQUFFO0FBRzdCLFVBQU0sY0FBYyxjQUNkLFlBQ0ssTUFBTSxHQUFHLEVBQ1QsT0FBTyxDQUFDLFNBQVMsUUFBUSxTQUFTLE9BQU8sU0FBUyxJQUFJLElBQzNELENBQUM7QUFFUCxrQkFBYyxZQUFZLEtBQUssR0FBRztBQUVsQyxVQUFNLFVBQVUsTUFBTSxPQUFPLElBQUksTUFBTSxLQUFLLElBQUk7QUFDaEQsVUFBTSxpQkFBaUIsY0FDakIsR0FBRyxXQUFXLElBQUksS0FBSyxRQUFRLFFBQy9CLEdBQUcsS0FBSyxRQUFRO0FBRXRCLFVBQU0saUJBQXNCLGNBQVEsU0FBUyxjQUFjO0FBRzNELFVBQU0saUJBQXNCLGNBQVEsT0FBTyxJQUFTO0FBQ3BELFFBQUksQ0FBQyxlQUFlLFdBQVcsY0FBYyxHQUFHO0FBQzVDLFlBQU0sSUFBSSxNQUFNLHVEQUFlO0FBQUEsSUFDbkM7QUFFQSxJQUFHLGNBQWUsY0FBUSxjQUFjLEdBQUcsRUFBRSxXQUFXLEtBQUssQ0FBQztBQUU5RCxVQUFNLFNBQVksZUFBVyxjQUFjO0FBQzNDLElBQUcsa0JBQWMsZ0JBQWdCLFNBQVMsTUFBTTtBQUVoRCxVQUFNLE1BQU0sR0FBVTtBQUFBLE1BQ2xCLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxJQUNiLENBQUM7QUFFRCxRQUFJLE9BQU8sU0FBUyxPQUFPLEtBQUssR0FBRztBQUMvQixZQUFNLFVBQWU7QUFBQSxRQUNkLFdBQU87QUFBQSxRQUNWLG9CQUFvQixLQUFLLElBQUksQ0FBQztBQUFBLE1BQ2xDO0FBRUEsVUFBSTtBQUNBLFFBQUc7QUFBQSxVQUNDO0FBQUEsVUFDQSxPQUFPLFNBQVMsT0FBTyxLQUFLLElBQUk7QUFBQSxVQUNoQyxFQUFFLE1BQU0sSUFBTTtBQUFBLFFBQ2xCO0FBRUEsWUFBSSxJQUFJO0FBQUEsVUFDSixHQUFHLFFBQVE7QUFBQSxVQUNYLGlCQUNJLFdBQVcsT0FBTztBQUFBLFFBQzFCLENBQUM7QUFFRCxjQUFNO0FBQUEsVUFDRjtBQUFBLFVBQ0E7QUFBQSxVQUNBLEtBQUs7QUFBQSxVQUNMO0FBQUEsUUFDSjtBQUFBLE1BQ0osVUFBRTtBQUNFLFlBQU8sZUFBVyxPQUFPLEdBQUc7QUFDeEIsY0FBSTtBQUNBLFlBQUcsZUFBVyxPQUFPO0FBQUEsVUFDekIsU0FBUTtBQUFBLFVBRVI7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUFBLElBQ0osT0FBTztBQUNILFlBQU07QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLFFBQ0EsS0FBSztBQUFBLFFBQ0w7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLEVBQ0osVUFBRTtBQUNFLFdBQU8sY0FBYyxPQUFPO0FBQUEsRUFDaEM7QUFDSjtBQUVBLGVBQWUscUJBQ1gsS0FDQSxnQkFDQSxPQUNBLFNBQ0Y7QUFDRSxRQUFNLElBQUksSUFBSSxjQUFjO0FBRTVCLFFBQU0sU0FBUyxNQUFNLElBQUksT0FBTztBQUNoQyxNQUFJLENBQUMsT0FBTyxPQUFPLFFBQVE7QUFDdkIsVUFBTSxJQUFJLE1BQU0sZ0ZBQWU7QUFBQSxFQUNuQztBQUVBLFFBQU0sU0FBUyxVQUFVLGlCQUFPO0FBQ2hDLFFBQU0sSUFBSSxPQUFPLFNBQVMsTUFBTSxJQUFJLEtBQUssRUFBRTtBQUMzQyxRQUFNLElBQUksS0FBSztBQUVmLFVBQVEsSUFBSSxPQUFPLE1BQU0scUJBQU0sY0FBYyxFQUFFO0FBQ25EOzs7QWhIM09BLElBQU0scUJBQXFCO0FBVTNCLElBQU0sbUJBQW9DO0FBQUEsRUFDdEMsU0FBUztBQUFBLEVBQ1QsUUFBUTtBQUFBLEVBQ1IsY0FBYztBQUFBLEVBQ2QscUJBQXFCO0FBQ3pCO0FBRUEsSUFBTSxrQkFBTixjQUE4QiwwQkFBUztBQUFBLEVBY25DLFlBQVksTUFBcUIsUUFBd0I7QUFDckQsVUFBTSxJQUFJO0FBYmQsb0JBQTRCLENBQUM7QUFDN0IsdUJBQWMsb0JBQUksSUFBbUI7QUFFckMsU0FBUSxZQUFZO0FBR3BCO0FBQUEsU0FBUSxjQUFjO0FBRXRCO0FBQUEsU0FBUSx3QkFBd0I7QUFFaEM7QUFBQSxTQUFRLHdCQUF3QixvQkFBSSxJQUFZO0FBSTVDLFNBQUssU0FBUztBQUNkLFNBQUssWUFBWSxLQUFLLFlBQVksU0FBUyxDQUFDO0FBQUEsRUFDaEQ7QUFBQSxFQUVBLGNBQXNCO0FBQ2xCLFdBQU87QUFBQSxFQUNYO0FBQUEsRUFFQSxpQkFBeUI7QUFDckIsV0FBTztBQUFBLEVBQ1g7QUFBQSxFQUVBLFVBQWtCO0FBQ2QsV0FBTztBQUFBLEVBQ1g7QUFBQSxFQUVBLE1BQU0sU0FBUztBQUNYLFVBQU0sS0FBSyxPQUFPO0FBQUEsRUFDdEI7QUFBQSxFQUVBLE1BQU0sU0FBUztBQUNYLFVBQU0sS0FBSyxPQUFPLHFCQUFxQjtBQUV2QyxTQUFLLFVBQVUsTUFBTTtBQUNyQixTQUFLLFVBQVUsU0FBUyx3QkFBd0I7QUFFaEQsVUFBTSxTQUFTLEtBQUssVUFBVSxVQUFVLEVBQUUsS0FBSyxzQkFBc0IsQ0FBQztBQUN0RSxVQUFNLFdBQVcsT0FBTyxVQUFVLEVBQUUsS0FBSyw0QkFBNEIsQ0FBQztBQUN0RSxhQUFTLFNBQVMsTUFBTSxFQUFFLE1BQU0sbUJBQVMsQ0FBQztBQUMxQyxhQUFTLFNBQVMsT0FBTztBQUFBLE1BQ3JCLE1BQU0sS0FBSyxPQUFPLFNBQVMsVUFDckIsc0ZBQ0E7QUFBQSxNQUNOLEtBQUs7QUFBQSxJQUNULENBQUM7QUFFRCxVQUFNLFVBQVUsT0FBTyxVQUFVLEVBQUUsS0FBSyw4QkFBOEIsQ0FBQztBQUd2RSxVQUFNLGFBQWEsUUFBUSxVQUFVLEVBQUUsS0FBSyxzQkFBc0IsQ0FBQztBQUNuRSxVQUFNLGNBQWMsV0FBVyxTQUFTLFNBQVM7QUFBQSxNQUM3QyxNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsTUFDYixLQUFLO0FBQUEsSUFDVCxDQUFDO0FBQ0QsZ0JBQVksUUFBUSxLQUFLO0FBQ3pCLGdCQUFZLFVBQVUsTUFBTTtBQUN4QixXQUFLLGNBQWMsWUFBWSxNQUFNLEtBQUssRUFBRSxZQUFZO0FBQ3hELFdBQUssWUFBWTtBQUFBLElBQ3JCO0FBRUEsVUFBTSxnQkFBZ0IsUUFBUSxTQUFTLFVBQVU7QUFBQSxNQUM3QyxNQUFNO0FBQUEsTUFDTixLQUFLO0FBQUEsSUFDVCxDQUFDO0FBQ0Qsa0JBQWMsVUFBVSxZQUFZO0FBQ2hDLG9CQUFjLFdBQVc7QUFDekIsb0JBQWMsY0FBYztBQUM1QixVQUFJO0FBQ0EsY0FBTSxLQUFLLGFBQWE7QUFBQSxNQUM1QixVQUFFO0FBQ0Usc0JBQWMsV0FBVztBQUN6QixzQkFBYyxjQUFjO0FBQUEsTUFDaEM7QUFBQSxJQUNKO0FBRUEsUUFBSSxDQUFDLEtBQUssT0FBTyxTQUFTLFNBQVM7QUFDL0IsWUFBTSxRQUFRLEtBQUssVUFBVSxVQUFVLEVBQUUsS0FBSyxxQkFBcUIsQ0FBQztBQUNwRSxZQUFNLFVBQVUsRUFBRSxLQUFLLDJCQUEyQixNQUFNLGVBQUssQ0FBQztBQUM5RCxZQUFNLFNBQVMsTUFBTSxFQUFFLE1BQU0sa0RBQWUsQ0FBQztBQUM3QyxZQUFNLFNBQVMsS0FBSztBQUFBLFFBQ2hCLE1BQU07QUFBQSxNQUNWLENBQUM7QUFDRDtBQUFBLElBQ0o7QUFFQSxVQUFNLFVBQVUsS0FBSyxVQUFVLFVBQVUsRUFBRSxLQUFLLHVCQUF1QixDQUFDO0FBQ3hFLFlBQVEsVUFBVSxFQUFFLEtBQUssdUJBQXVCLENBQUM7QUFDakQsWUFBUSxXQUFXLEVBQUUsTUFBTSxrREFBZSxDQUFDO0FBRTNDLFFBQUk7QUFDQSxZQUFNLEtBQUssYUFBYTtBQUFBLElBQzVCLFNBQVMsT0FBTztBQUNaLGNBQVEsT0FBTztBQUNmLFlBQU0sVUFBVSxLQUFLLFVBQVUsVUFBVSxFQUFFLEtBQUsscUJBQXFCLENBQUM7QUFDdEUsY0FBUSxTQUFTLFVBQVUsRUFBRSxNQUFNLHVDQUFTLENBQUM7QUFDN0MsY0FBUSxTQUFTLE9BQU87QUFBQSxRQUNwQixNQUFNLGlCQUFpQixRQUFRLE1BQU0sVUFBVSxPQUFPLEtBQUs7QUFBQSxNQUMvRCxDQUFDO0FBQUEsSUFDTDtBQUFBLEVBQ0o7QUFBQTtBQUFBLEVBR0EsTUFBTSxVQUFVO0FBQ1osUUFBSSxDQUFDLEtBQUssT0FBTyxTQUFTLFNBQVM7QUFDL0I7QUFBQSxJQUNKO0FBRUEsUUFBSSxLQUFLLFVBQVc7QUFDcEIsU0FBSyxZQUFZO0FBRWpCLFFBQUk7QUFDQSxZQUFNLEtBQUssYUFBYTtBQUFBLElBQzVCLFNBQVMsT0FBTztBQUNaLFVBQUk7QUFBQSxRQUNBLGlDQUFRLGlCQUFpQixRQUFRLE1BQU0sVUFBVSxPQUFPLEtBQUssQ0FDN0Q7QUFBQSxNQUNKO0FBQUEsSUFDSixVQUFFO0FBQ0UsV0FBSyxZQUFZO0FBQUEsSUFDckI7QUFBQSxFQUNKO0FBQUEsRUFFQSxNQUFNLGVBQWU7QUFDakIsVUFBTSxVQUFVLE1BQU0sS0FBSyxPQUFPLFlBQVk7QUFDOUMsUUFBSTtBQUNBLFdBQUssV0FBVyxNQUFNLEtBQUssT0FBTyxrQkFBa0IsT0FBTztBQUUzRCxXQUFLLFlBQVksTUFBTTtBQUN2QixZQUFNLGFBQWEsS0FBSyxJQUFJLE1BQU0saUJBQWlCO0FBRW5ELGVBQVMsSUFBSSxHQUFHLElBQUksV0FBVyxRQUFRLEtBQUs7QUFDeEMsY0FBTSxPQUFPLFdBQVcsQ0FBQztBQUN6QixZQUFJLENBQUMsS0FBSyxZQUFZLElBQUksS0FBSyxJQUFJLEdBQUc7QUFDbEMsZUFBSyxZQUFZLElBQUksS0FBSyxNQUFNLElBQUk7QUFBQSxRQUN4QztBQUNBLFlBQUksSUFBSSxRQUFRLEdBQUc7QUFDZixnQkFBTSxJQUFJLFFBQVEsQ0FBQ0MsT0FBTSxXQUFXQSxJQUFHLENBQUMsQ0FBQztBQUFBLFFBQzdDO0FBQUEsTUFDSjtBQUVBLFlBQU0sVUFBVSxLQUFLLFVBQVUsY0FBYyxvQkFBb0I7QUFDakUseUNBQVM7QUFFVCxZQUFNLFVBQVUsS0FBSyxVQUFVLGNBQWMsdUJBQXVCO0FBQ3BFLHlDQUFTO0FBRVQsWUFBTSxPQUFPLEtBQUssVUFBVSxVQUFVLEVBQUUsS0FBSyxvQkFBb0IsQ0FBQztBQUVsRSxVQUFJLEtBQUssU0FBUyxXQUFXLEdBQUc7QUFDNUIsY0FBTSxRQUFRLEtBQUssVUFBVSxFQUFFLEtBQUsscUJBQXFCLENBQUM7QUFDMUQsY0FBTSxTQUFTLE1BQU0sRUFBRSxNQUFNLHVEQUFvQixDQUFDO0FBQ2xELGNBQU0sU0FBUyxLQUFLLEVBQUUsTUFBTSx3REFBZ0IsQ0FBQztBQUM3QztBQUFBLE1BQ0o7QUFFQSxZQUFNLFVBQVUsS0FBSyxVQUFVLEVBQUUsS0FBSyx1QkFBdUIsQ0FBQztBQUM5RCxjQUFRLFFBQVEsVUFBSyxLQUFLLFNBQVMsTUFBTSxxQkFBTTtBQUcvQyxZQUFNLGVBQWUsS0FBSyxVQUFVLEVBQUUsS0FBSyxzQkFBc0IsQ0FBQztBQUdsRSxZQUFNLFdBQVcsb0JBQUksSUFBNkI7QUFDbEQsaUJBQVcsV0FBVyxLQUFLLFVBQVU7QUFDakMsY0FBTSxNQUFNLFFBQVEsYUFBYSxTQUFTLEdBQUcsSUFDdkMsUUFBUSxhQUFhLE1BQU0sR0FBRyxRQUFRLGFBQWEsWUFBWSxHQUFHLENBQUMsSUFDbkU7QUFDTixZQUFJLENBQUMsU0FBUyxJQUFJLEdBQUcsR0FBRztBQUNwQixtQkFBUyxJQUFJLEtBQUssQ0FBQyxDQUFDO0FBQUEsUUFDeEI7QUFDQSxpQkFBUyxJQUFJLEdBQUcsRUFBRyxLQUFLLE9BQU87QUFBQSxNQUNuQztBQUVBLFlBQU0sZUFBZSxNQUFNLEtBQUssU0FBUyxRQUFRLENBQUMsRUFBRTtBQUFBLFFBQUssQ0FBQyxHQUFHQyxPQUN6RCxFQUFFLENBQUMsRUFBRSxjQUFjQSxHQUFFLENBQUMsR0FBRyxPQUFPO0FBQUEsTUFDcEM7QUFFQSxpQkFBVyxDQUFDLEtBQUssS0FBSyxLQUFLLGNBQWM7QUFDckMsYUFBSyxrQkFBa0IsY0FBYyxLQUFLLEtBQUs7QUFBQSxNQUNuRDtBQUVBLFlBQU0sS0FBSyxvQkFBb0I7QUFHL0IsV0FBSyxZQUFZO0FBQUEsSUFDckIsVUFBRTtBQUNFLFlBQU0sS0FBSyxPQUFPLGNBQWMsT0FBTztBQUFBLElBQzNDO0FBQUEsRUFDSjtBQUFBLEVBRUEsY0FBYztBQUNWLFVBQU0sUUFBUSxLQUFLO0FBR25CLFVBQU0sU0FBUyxLQUFLLFVBQVUsaUJBQWlCLG1CQUFtQjtBQUNsRSxXQUFPLFFBQVEsQ0FBQyxZQUFZO0FBeFBwQywwQkFBQUM7QUF5UFksWUFBTSxLQUFLO0FBQ1gsWUFBTSxRQUFRLEdBQUcsaUJBQWlCLG1CQUFtQjtBQUNyRCxVQUFJLGVBQWU7QUFFbkIsWUFBTSxRQUFRLENBQUMsV0FBVztBQTdQdEMsWUFBQUM7QUE4UGdCLGNBQU0sT0FBTztBQUNiLGNBQU0sUUFBT0EsTUFBQSxLQUFLLFFBQVEsV0FBYixPQUFBQSxNQUF1QjtBQUNwQyxjQUFNLFFBQVEsQ0FBQyxTQUFTLEtBQUssU0FBUyxLQUFLO0FBQzNDLGFBQUssTUFBTSxVQUFVLFFBQVEsS0FBSztBQUNsQyxZQUFJLE1BQU87QUFBQSxNQUNmLENBQUM7QUFHRCxZQUFNLGFBQVksb0JBQ2IsY0FBYyx3QkFBd0IsTUFEekIsbUJBRVosZ0JBRlksbUJBRUMsa0JBRkQsWUFFa0I7QUFDcEMsWUFBTSxhQUFhLENBQUMsU0FBUyxVQUFVLFNBQVMsS0FBSztBQUVyRCxTQUFHLE1BQU0sVUFBVSxlQUFlLEtBQUssYUFBYSxLQUFLO0FBR3pELFlBQU0sT0FBTyxHQUFHLGNBQWMsd0JBQXdCO0FBQ3RELFlBQU0sU0FBUyxHQUFHLGNBQWMsMEJBQTBCO0FBQzFELFVBQUksUUFBUSxRQUFRO0FBQ2hCLFlBQUksU0FBUyxjQUFjLGVBQWUsR0FBRztBQUN6QyxlQUFLLE1BQU0sVUFBVTtBQUNyQixpQkFBTyxjQUFjO0FBQUEsUUFDekIsT0FBTztBQUNILGdCQUFNLE9BQU1ELE9BQUEsUUFDUCxjQUFjLHdCQUF3QixNQUQvQixtQkFFTixnQkFGTSxPQUFBQSxNQUVTO0FBQ3JCLGdCQUFNLFlBQVksS0FBSyxzQkFBc0IsSUFBSSxHQUFHO0FBQ3BELGVBQUssTUFBTSxVQUFVLFlBQVksU0FBUztBQUMxQyxpQkFBTyxjQUFjLFlBQVksV0FBTTtBQUFBLFFBQzNDO0FBQUEsTUFDSjtBQUFBLElBQ0osQ0FBQztBQUdELFVBQU0sZUFBZSxLQUFLLFVBQVU7QUFBQSxNQUNoQztBQUFBLElBQ0o7QUFFQSxRQUFJLGNBQWM7QUFDZCxZQUFNLGFBQWEsYUFBYSxpQkFBaUIseUJBQXlCO0FBQzFFLFVBQUksZUFBZTtBQUVuQixpQkFBVyxRQUFRLENBQUMsV0FBVztBQXhTM0M7QUF5U2dCLGNBQU0sT0FBTztBQUNiLGNBQU0sUUFBTyxVQUFLLFFBQVEsV0FBYixZQUF1QjtBQUNwQyxjQUFNLFFBQVEsQ0FBQyxTQUFTLEtBQUssU0FBUyxLQUFLO0FBQzNDLGFBQUssTUFBTSxVQUFVLFFBQVEsS0FBSztBQUNsQyxZQUFJLE1BQU87QUFBQSxNQUNmLENBQUM7QUFHRCxZQUFNLFlBQVksYUFBYTtBQUFBLFFBQzNCO0FBQUEsTUFDSjtBQUVBLFVBQUksV0FBVztBQUNYLFlBQUksT0FBTztBQUNQLG9CQUFVLE1BQU0sVUFBVSxlQUFlLElBQUksS0FBSztBQUFBLFFBQ3RELE9BQU87QUFDSCxvQkFBVSxNQUFNLFVBQVUsS0FBSyx3QkFBd0IsU0FBUztBQUFBLFFBQ3BFO0FBQUEsTUFDSjtBQUdBLFVBQUksU0FBUyxpQkFBaUIsR0FBRztBQUM3QixxQkFBYSxNQUFNLFVBQVU7QUFBQSxNQUNqQyxPQUFPO0FBQ0gscUJBQWEsTUFBTSxVQUFVO0FBQUEsTUFDakM7QUFBQSxJQUNKO0FBR0EsUUFBSSxXQUFXLEtBQUssVUFBVSxjQUFjLHlCQUF5QjtBQUNyRSxVQUFNLGdCQUFnQixNQUFNO0FBQUEsTUFDeEIsS0FBSyxVQUFVLGlCQUFpQixtQkFBbUI7QUFBQSxJQUN2RCxFQUFFLEtBQUssQ0FBQyxPQUFRLEdBQW1CLE1BQU0sWUFBWSxNQUFNO0FBRTNELFVBQU0sZUFDRixnQkFDQSxhQUFhLE1BQU0sWUFBWSxVQUMvQixNQUFNO0FBQUEsTUFDRixhQUFhLGlCQUFpQix5QkFBeUI7QUFBQSxJQUMzRCxFQUFFLEtBQUssQ0FBQyxPQUFRLEdBQW1CLE1BQU0sWUFBWSxNQUFNO0FBRS9ELFFBQUksU0FBUyxDQUFDLGlCQUFpQixDQUFDLGNBQWM7QUFDMUMsVUFBSSxDQUFDLFVBQVU7QUFDWCxtQkFBVyxLQUFLLFVBQVUsVUFBVTtBQUFBLFVBQ2hDLEtBQUs7QUFBQSxVQUNMLE1BQU0sNkNBQVUsS0FBSyxXQUFXO0FBQUEsUUFDcEMsQ0FBQztBQUFBLE1BQ0w7QUFBQSxJQUNKLE9BQU87QUFDSCwyQ0FBVTtBQUFBLElBQ2Q7QUFBQSxFQUNKO0FBQUEsRUFFQSxrQkFBa0IsV0FBd0IsS0FBYSxVQUEyQjtBQUM5RSxVQUFNLFFBQVEsVUFBVSxVQUFVLEVBQUUsS0FBSyxtQkFBbUIsQ0FBQztBQUU3RCxVQUFNLFlBQVksS0FBSyxzQkFBc0IsSUFBSSxHQUFHO0FBRXBELFVBQU0sU0FBUyxNQUFNLFVBQVUsRUFBRSxLQUFLLDBCQUEwQixDQUFDO0FBQ2pFLFVBQU0sT0FBTyxPQUFPLFVBQVUsRUFBRSxLQUFLLHlCQUF5QixDQUFDO0FBRS9ELFVBQU0sU0FBUyxLQUFLLFNBQVMsUUFBUTtBQUFBLE1BQ2pDLE1BQU0sWUFBWSxXQUFNO0FBQUEsTUFDeEIsS0FBSztBQUFBLElBQ1QsQ0FBQztBQUVELFNBQUssU0FBUyxRQUFRO0FBQUEsTUFDbEIsTUFBTTtBQUFBLE1BQ04sS0FBSztBQUFBLElBQ1QsQ0FBQztBQUVELFNBQUssU0FBUyxRQUFRO0FBQUEsTUFDbEIsTUFBTSxJQUFJLFNBQVMsTUFBTTtBQUFBLE1BQ3pCLEtBQUs7QUFBQSxJQUNULENBQUM7QUFFRCxXQUFPLFVBQVUsTUFBTTtBQUNuQixVQUFJLEtBQUssc0JBQXNCLElBQUksR0FBRyxHQUFHO0FBQ3JDLGFBQUssc0JBQXNCLE9BQU8sR0FBRztBQUFBLE1BQ3pDLE9BQU87QUFDSCxhQUFLLHNCQUFzQixJQUFJLEdBQUc7QUFBQSxNQUN0QztBQUNBLFdBQUssWUFBWTtBQUFBLElBQ3JCO0FBRUEsVUFBTSxPQUFPLE1BQU0sVUFBVSxFQUFFLEtBQUssd0JBQXdCLENBQUM7QUFDN0QsUUFBSSxXQUFXO0FBQ1gsV0FBSyxNQUFNLFVBQVU7QUFBQSxJQUN6QjtBQUVBLGVBQVcsV0FBVyxVQUFVO0FBQzVCLFdBQUssa0JBQWtCLE1BQU0sT0FBTztBQUFBLElBQ3hDO0FBQUEsRUFDSjtBQUFBLEVBRUEsa0JBQWtCLE1BQW1CLFNBQXdCO0FBeFlqRTtBQXlZUSxVQUFNLGtCQUFpQixhQUFRLGFBQWEsTUFBTSxHQUFHLEVBQUUsSUFBSSxNQUFwQyxZQUF5QztBQUNoRSxVQUFNLFlBQVksS0FBSyxZQUFZLElBQUksY0FBYztBQUNyRCxVQUFNLE9BQU8sS0FBSyxVQUFVLEVBQUUsS0FBSyxtQkFBbUIsQ0FBQztBQUd2RCxTQUFLLFFBQVEsU0FBUyxHQUFHLFFBQVEsS0FBSyxJQUFJLFFBQVEsWUFBWSxHQUFHLFlBQVk7QUFFN0UsVUFBTSxPQUFPLEtBQUssVUFBVSxFQUFFLEtBQUssbUJBQW1CLENBQUM7QUFFdkQsVUFBTSxXQUFXLEtBQUssVUFBVSxFQUFFLEtBQUssd0JBQXdCLENBQUM7QUFDaEUsYUFBUyxTQUFTLE9BQU87QUFBQSxNQUNyQixNQUFNLFFBQVE7QUFBQSxNQUNkLEtBQUs7QUFBQSxJQUNULENBQUM7QUFHRCxVQUFNLFFBQVEsU0FBUyxTQUFTLFFBQVE7QUFBQSxNQUNwQyxNQUFNLFlBQVksdUJBQVE7QUFBQSxNQUMxQixLQUFLLFlBQ0MsZ0NBQ0E7QUFBQSxJQUNWLENBQUM7QUFFRCxTQUFLLFNBQVMsT0FBTztBQUFBLE1BQ2pCLE1BQU0sUUFBUTtBQUFBLE1BQ2QsS0FBSztBQUFBLElBQ1QsQ0FBQztBQUVELFVBQU0sU0FBUyxLQUFLLFNBQVMsVUFBVTtBQUFBLE1BQ25DLEtBQUssWUFBWSxpQ0FBaUM7QUFBQSxNQUNsRCxNQUFNLFlBQVksaUJBQU87QUFBQSxJQUM3QixDQUFDO0FBRUQsV0FBTztBQUFBLE1BQ0g7QUFBQSxNQUNBLFlBQ00scUJBQU0sUUFBUSxLQUFLLFdBQ25CLHFCQUFNLFFBQVEsS0FBSztBQUFBLElBQzdCO0FBRUEsV0FBTyxVQUFVLFlBQVk7QUFDekIsYUFBTyxXQUFXO0FBQ2xCLGFBQU8sY0FBYyxZQUFZLDZCQUFTO0FBRTFDLFVBQUk7QUFDQSxZQUFJLFdBQVc7QUFDWCxnQkFBTSxTQUFTLE1BQU07QUFBQSxZQUNqQixLQUFLO0FBQUEsWUFDTDtBQUFBLFlBQ0E7QUFBQSxVQUNKO0FBRUEsY0FBSSxXQUFXLFVBQVU7QUFDckI7QUFBQSxVQUNKO0FBRUEsY0FBSSxXQUFXLGFBQWE7QUFDeEIsa0JBQU0sWUFBWSxLQUFLLFFBQVEsU0FBUyxTQUFTO0FBQ2pELGdCQUFJLHdCQUFPLFNBQUksUUFBUSxLQUFLLDRDQUFTO0FBQ3JDLGtCQUFNLG9CQUFvQixLQUFLLFFBQVEsRUFBRSxRQUFRLEtBQUssQ0FBQztBQUFBLFVBQzNELFdBQVcsV0FBVyxRQUFRO0FBQzFCLGtCQUFNLFdBQVcsTUFBTTtBQUFBLGNBQ25CLEtBQUs7QUFBQSxjQUNMO0FBQUEsY0FDQTtBQUFBLFlBQ0o7QUFDQSxnQkFBSSx3QkFBTyw2Q0FBVSxTQUFTLElBQUksRUFBRTtBQUNwQyxrQkFBTSxvQkFBb0IsS0FBSyxRQUFRLEVBQUUsUUFBUSxLQUFLLENBQUM7QUFBQSxVQUMzRDtBQUFBLFFBQ0osT0FBTztBQUNILGdCQUFNLFVBQVUsTUFBTSxnQkFBZ0IsS0FBSyxRQUFRLE9BQU87QUFDMUQsZUFBSyxZQUFZLElBQUksUUFBUSxNQUFNLE9BQU87QUFDMUMsaUJBQU8sY0FBYztBQUNyQixpQkFBTyxVQUFVLElBQUksV0FBVztBQUNoQyxjQUFJLHdCQUFPLFNBQUksUUFBUSxLQUFLLDBCQUFNO0FBQ2xDLGdCQUFNLG9CQUFvQixLQUFLLFFBQVEsRUFBRSxRQUFRLEtBQUssQ0FBQztBQUFBLFFBQzNEO0FBQUEsTUFDSixTQUFTLE9BQU87QUFDWixZQUFJO0FBQUEsVUFDQSxHQUFHLFlBQVksaUJBQU8sY0FBSSxxQkFBTSxpQkFBaUIsUUFBUSxNQUFNLFVBQVUsT0FBTyxLQUFLLENBQ3JGO0FBQUEsUUFDSjtBQUFBLE1BQ0osVUFBRTtBQUNFLGVBQU8sV0FBVztBQUNsQixZQUFJLFVBQVcsUUFBTyxjQUFjO0FBQUEsTUFDeEM7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBRUEsTUFBTSxzQkFBc0I7QUFsZWhDO0FBbWVRLGVBQUssVUFBVSxjQUFjLDZCQUE2QixNQUExRCxtQkFBNkQ7QUFDN0QsZUFBSyxVQUFVLGNBQWMsdUJBQXVCLE1BQXBELG1CQUF1RDtBQUN2RCxlQUFLLFVBQVUsY0FBYyxxQkFBcUIsTUFBbEQsbUJBQXFEO0FBQ3JELGVBQUssVUFBVSxjQUFjLHFCQUFxQixNQUFsRCxtQkFBcUQ7QUFFckQsVUFBTSxVQUFVLEtBQUssVUFBVSxVQUFVLEVBQUUsS0FBSyw2QkFBNkIsQ0FBQztBQUU5RSxVQUFNLFNBQVMsUUFBUSxVQUFVLEVBQUUsS0FBSyw0QkFBNEIsQ0FBQztBQUVyRSxVQUFNLFdBQVcsT0FBTyxVQUFVLEVBQUUsS0FBSywyQkFBMkIsQ0FBQztBQUNyRSxhQUFTLFNBQVMsTUFBTSxFQUFFLE1BQU0sdUNBQVMsQ0FBQztBQUMxQyxhQUFTLFNBQVMsT0FBTztBQUFBLE1BQ3JCLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxJQUNULENBQUM7QUFHRCxVQUFNLGNBQWMsT0FBTyxTQUFTLFVBQVU7QUFBQSxNQUMxQyxNQUFNLEtBQUssd0JBQXdCLGlCQUFPO0FBQUEsTUFDMUMsS0FBSztBQUFBLElBQ1QsQ0FBQztBQUNELGdCQUFZLFVBQVUsTUFBTTtBQUN4QixXQUFLLHdCQUF3QixDQUFDLEtBQUs7QUFDbkMsV0FBSyxZQUFZO0FBQUEsSUFDckI7QUFFQSxVQUFNLGFBQWEsS0FBSyxJQUFJLE1BQ3ZCLGlCQUFpQixFQUNqQixLQUFLLENBQUMsR0FBR0QsT0FBTSxFQUFFLEtBQUssY0FBY0EsR0FBRSxNQUFNLE9BQU8sQ0FBQztBQUV6RCxRQUFJLFdBQVcsV0FBVyxHQUFHO0FBQ3pCLGNBQVEsVUFBVTtBQUFBLFFBQ2QsTUFBTTtBQUFBLFFBQ04sS0FBSztBQUFBLE1BQ1QsQ0FBQztBQUNEO0FBQUEsSUFDSjtBQUVBLFVBQU0sT0FBTyxRQUFRLFVBQVUsRUFBRSxLQUFLLDBCQUEwQixDQUFDO0FBRWpFLFFBQUksS0FBSyx1QkFBdUI7QUFDNUIsV0FBSyxNQUFNLFVBQVU7QUFBQSxJQUN6QjtBQUVBLGVBQVcsUUFBUSxZQUFZO0FBQzNCLFlBQU0sT0FBTyxLQUFLLFVBQVUsRUFBRSxLQUFLLHlCQUF5QixDQUFDO0FBQzdELFdBQUssUUFBUSxTQUFTLEdBQUcsS0FBSyxRQUFRLElBQUksS0FBSyxJQUFJLEdBQUcsWUFBWTtBQUVsRSxZQUFNLE9BQU8sS0FBSyxVQUFVLEVBQUUsS0FBSyxtQkFBbUIsQ0FBQztBQUN2RCxXQUFLLFNBQVMsT0FBTztBQUFBLFFBQ2pCLE1BQU0sS0FBSztBQUFBLFFBQ1gsS0FBSztBQUFBLE1BQ1QsQ0FBQztBQUNELFdBQUssU0FBUyxPQUFPO0FBQUEsUUFDakIsTUFBTSxLQUFLO0FBQUEsUUFDWCxLQUFLO0FBQUEsTUFDVCxDQUFDO0FBRUQsWUFBTSxTQUFTLEtBQUssU0FBUyxVQUFVO0FBQUEsUUFDbkMsTUFBTTtBQUFBLFFBQ04sS0FBSztBQUFBLE1BQ1QsQ0FBQztBQUVELGFBQU8sVUFBVSxZQUFZO0FBQ3pCLGNBQU0sUUFBUSxJQUFJLG1CQUFtQixLQUFLLEtBQUssS0FBSyxRQUFRLElBQUk7QUFDaEUsY0FBTSxLQUFLO0FBQUEsTUFDZjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFFQSxNQUFNLFVBQVU7QUFDWixTQUFLLFVBQVUsTUFBTTtBQUFBLEVBQ3pCO0FBQ0o7QUFFQSxJQUFNLG9CQUFOLGNBQWdDLGtDQUFpQjtBQUFBLEVBRzdDLFlBQVksS0FBVSxRQUF3QjtBQUMxQyxVQUFNLEtBQUssTUFBTTtBQUNqQixTQUFLLFNBQVM7QUFBQSxFQUNsQjtBQUFBLEVBRUEsVUFBVTtBQUNOLFVBQU0sRUFBRSxZQUFZLElBQUk7QUFDeEIsZ0JBQVksTUFBTTtBQUVsQixnQkFBWSxTQUFTLE1BQU0sRUFBRSxNQUFNLCtCQUFXLENBQUM7QUFDL0MsZ0JBQVksU0FBUyxLQUFLO0FBQUEsTUFDdEIsTUFBTTtBQUFBLE1BQ04sS0FBSztBQUFBLElBQ1QsQ0FBQztBQUVELFFBQUkseUJBQVEsV0FBVyxFQUNsQixRQUFRLDhCQUFVLEVBQ2xCLFFBQVEsOEVBQWdELEVBQ3hEO0FBQUEsTUFBUSxDQUFDLFNBQ04sS0FDSyxlQUFlLDhCQUE4QixFQUM3QyxTQUFTLEtBQUssT0FBTyxTQUFTLE9BQU8sRUFDckMsU0FBUyxPQUFPLFVBQVU7QUFDdkIsYUFBSyxPQUFPLFNBQVMsVUFBVSxNQUFNLEtBQUs7QUFDMUMsY0FBTSxLQUFLLE9BQU8sYUFBYTtBQUFBLE1BQ25DLENBQUM7QUFBQSxJQUNUO0FBRUosUUFBSSx5QkFBUSxXQUFXLEVBQ2xCLFFBQVEsa0JBQVEsRUFDaEIsUUFBUSxrS0FBcUMsRUFDN0MsWUFBWSxDQUFDLFNBQVM7QUFDbkIsV0FDSyxlQUFlLCtCQUFXLEVBQzFCLFNBQVMsS0FBSyxPQUFPLFNBQVMsTUFBTSxFQUNwQyxTQUFTLE9BQU8sVUFBVTtBQUN2QixhQUFLLE9BQU8sU0FBUyxTQUFTO0FBQzlCLGNBQU0sS0FBSyxPQUFPLGFBQWE7QUFBQSxNQUNuQyxDQUFDO0FBQ0wsV0FBSyxRQUFRLE9BQU87QUFDcEIsV0FBSyxRQUFRLFNBQVMsdUJBQXVCO0FBQUEsSUFDakQsQ0FBQztBQUVMLFFBQUkseUJBQVEsV0FBVyxFQUNsQixRQUFRLHNDQUFRLEVBQ2hCLFFBQVEseUhBQStCLEVBQ3ZDO0FBQUEsTUFBUSxDQUFDLFNBQ04sS0FDSyxlQUFlLGlCQUFPLEVBQ3RCLFNBQVMsS0FBSyxPQUFPLFNBQVMsWUFBWSxFQUMxQyxTQUFTLE9BQU8sVUFBVTtBQUN2QixhQUFLLE9BQU8sU0FBUyxlQUNqQixNQUFNLEtBQUssRUFBRSxRQUFRLGNBQWMsRUFBRSxLQUFLO0FBQzlDLGNBQU0sS0FBSyxPQUFPLGFBQWE7QUFBQSxNQUNuQyxDQUFDO0FBQUEsSUFDVDtBQUVKLFFBQUkseUJBQVEsV0FBVyxFQUNsQixRQUFRLHNDQUFRLEVBQ2hCLFFBQVEsOEhBQStCLEVBQ3ZDO0FBQUEsTUFBVSxDQUFDLFdBQ1IsT0FBTyxjQUFjLGNBQUksRUFBRSxRQUFRLFlBQVk7QUFDM0MsY0FBTSxLQUFLLE9BQU8scUJBQXFCO0FBQUEsTUFDM0MsQ0FBQztBQUFBLElBQ0w7QUFFSixRQUFJLHlCQUFRLFdBQVcsRUFDbEIsUUFBUSw4REFBWSxFQUNwQjtBQUFBLE1BQ0c7QUFBQSxJQUNKLEVBQ0MsUUFBUSxDQUFDLFNBQVM7QUF4bkIvQjtBQXluQmdCLFdBQ0ssZUFBZSxHQUFHLEVBQ2xCLFNBQVMsUUFBTyxVQUFLLE9BQU8sU0FBUyx3QkFBckIsWUFBNEMsQ0FBQyxDQUFDLEVBQzlELFNBQVMsT0FBTyxVQUFVO0FBQ3ZCLGNBQU0sTUFBTSxPQUFPLE1BQU0sS0FBSyxDQUFDO0FBQy9CLGFBQUssT0FBTyxTQUFTLHNCQUNqQixPQUFPLFNBQVMsR0FBRyxLQUFLLE1BQU0sSUFBSSxLQUFLLE1BQU0sR0FBRyxJQUFJO0FBQ3hELGNBQU0sS0FBSyxPQUFPLGFBQWE7QUFDL0IsYUFBSyxPQUFPLG1CQUFtQjtBQUFBLE1BQ25DLENBQUM7QUFDTCxXQUFLLFFBQVEsT0FBTztBQUNwQixXQUFLLFFBQVEsTUFBTTtBQUNuQixXQUFLLFFBQVEsT0FBTztBQUFBLElBQ3hCLENBQUM7QUFBQSxFQUNUO0FBQ0o7QUFFQSxJQUFxQixpQkFBckIsY0FBNEMsd0JBQU87QUFBQSxFQUFuRDtBQUFBO0FBRUksU0FBUSxnQkFBc0M7QUFDOUMsU0FBUSxtQkFBa0M7QUFHMUM7QUFBQSxTQUFTLG1CQUFtQjtBQUFBO0FBQUEsRUFFNUIsTUFBTSxTQUFTO0FBRVgsU0FBSztBQUFBLE1BQ0Q7QUFBQSxNQUNBLENBQUMsU0FBUyxJQUFJLGdCQUFnQixNQUFNLElBQUk7QUFBQSxJQUM1QztBQUVBLFNBQUssY0FBYyxJQUFJLGtCQUFrQixLQUFLLEtBQUssSUFBSSxDQUFDO0FBRXhELFNBQUssV0FBVztBQUFBLE1BQ1osSUFBSTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sVUFBVSxNQUFNLEtBQUsscUJBQXFCO0FBQUEsSUFDOUMsQ0FBQztBQUVELFNBQUs7QUFBQSxNQUFjO0FBQUEsTUFBYTtBQUFBLE1BQWEsTUFDekMsS0FBSyxxQkFBcUI7QUFBQSxJQUM5QjtBQUdBLFNBQUsscUJBQXFCLEVBQ3JCLEtBQUssTUFBTTtBQUNSLFdBQUssbUJBQW1CO0FBQ3hCLGNBQVEsSUFBSSw0REFBZTtBQUFBLElBQy9CLENBQUMsRUFDQSxNQUFNLENBQUMsUUFBUSxRQUFRLE1BQU0sMkVBQW9CLEdBQUcsQ0FBQztBQUFBLEVBQzlEO0FBQUEsRUFFQSxNQUFNLHVCQUFzQztBQUN4QyxRQUFJLEtBQUssU0FBVTtBQUNuQixRQUFJLENBQUMsS0FBSyxlQUFlO0FBQ3JCLFdBQUssZ0JBQWdCLEtBQUssYUFBYTtBQUFBLElBQzNDO0FBQ0EsVUFBTSxLQUFLO0FBQUEsRUFDZjtBQUFBLEVBRUEsTUFBTSxlQUFlO0FBQ2pCLFNBQUssV0FBVyxPQUFPLE9BQU8sQ0FBQyxHQUFHLGtCQUFrQixNQUFNLEtBQUssU0FBUyxDQUFDO0FBQUEsRUFDN0U7QUFBQSxFQUVBLE1BQU0sZUFBZTtBQUNqQixVQUFNLEtBQUssU0FBUyxLQUFLLFFBQVE7QUFBQSxFQUNyQztBQUFBLEVBRUEsTUFBTSx1QkFBdUI7QUFDekIsVUFBTSxFQUFFLFVBQVUsSUFBSSxLQUFLO0FBQzNCLFFBQUksT0FBTyxVQUFVLGdCQUFnQixrQkFBa0IsRUFBRSxDQUFDO0FBRTFELFFBQUksQ0FBQyxNQUFNO0FBQ1AsYUFBTyxVQUFVLFFBQVEsS0FBSztBQUM5QixZQUFNLEtBQUssYUFBYTtBQUFBLFFBQ3BCLE1BQU07QUFBQSxRQUNOLFFBQVE7QUFBQSxNQUNaLENBQUM7QUFBQSxJQUNMO0FBRUEsY0FBVSxXQUFXLElBQUk7QUFBQSxFQUM3QjtBQUFBO0FBQUEsRUFHQSxNQUFNLHFCQUFxQjtBQTlzQi9CO0FBK3NCUSxTQUFLLGdCQUFnQjtBQUVyQixVQUFNLFlBQVcsZ0JBQUssYUFBTCxtQkFBZSx3QkFBZixZQUFzQztBQUN2RCxRQUFJLENBQUMsWUFBWSxZQUFZLEdBQUc7QUFDNUI7QUFBQSxJQUNKO0FBRUEsU0FBSyxtQkFBbUIsT0FBTyxZQUFZLE1BQU07QUF0dEJ6RCxVQUFBRTtBQXd0QlksVUFBSSxHQUFDQSxNQUFBLEtBQUssYUFBTCxnQkFBQUEsSUFBZSxTQUFTO0FBQzdCLDBCQUFvQixNQUFNLEVBQUUsUUFBUSxLQUFLLENBQUMsRUFBRTtBQUFBLFFBQU0sQ0FBQyxRQUMvQyxRQUFRLEtBQUssc0VBQWUsR0FBRztBQUFBLE1BQ25DO0FBQUEsSUFDSixHQUFHLFFBQVE7QUFHWCxTQUFLLGlCQUFpQixLQUFLLGdCQUFnQjtBQUFBLEVBQy9DO0FBQUEsRUFFQSxNQUFNLGtCQUFrQjtBQUNwQixRQUFJLEtBQUsscUJBQXFCLE1BQU07QUFDaEMsYUFBTyxjQUFjLEtBQUssZ0JBQWdCO0FBQzFDLFdBQUssbUJBQW1CO0FBQUEsSUFDNUI7QUFBQSxFQUNKO0FBQUEsRUFFQSxNQUFNLGNBQStCO0FBQ2pDLFVBQU0sS0FBSyxxQkFBcUI7QUFFaEMsUUFBSSxDQUFDLEtBQUssU0FBUyxTQUFTO0FBQ3hCLFlBQU0sSUFBSSxNQUFNLCtFQUFtQjtBQUFBLElBQ3ZDO0FBRUEsVUFBTSxVQUFlO0FBQUEsTUFDZCxXQUFPO0FBQUEsTUFDVix5QkFBeUIsS0FBSyxJQUFJLENBQUM7QUFBQSxJQUN2QztBQUVBLFFBQUksY0FBNkI7QUFFakMsUUFBSTtBQUNBLFlBQU0sTUFBTSxHQUFVO0FBRXRCLFVBQUksS0FBSyxTQUFTLE9BQU8sS0FBSyxHQUFHO0FBQzdCLHNCQUFtQjtBQUFBLFVBQ1osV0FBTztBQUFBLFVBQ1Ysb0JBQW9CLEtBQUssSUFBSSxDQUFDO0FBQUEsUUFDbEM7QUFFQSxjQUFVO0FBQUEsVUFDTjtBQUFBLFVBQ0EsS0FBSyxTQUFTLE9BQU8sS0FBSyxJQUFJO0FBQUEsVUFDOUIsRUFBRSxNQUFNLElBQU07QUFBQSxRQUNsQjtBQUVBLFlBQUksSUFBSTtBQUFBLFVBQ0osR0FBRyxRQUFRO0FBQUEsVUFDWCxpQkFDSSxXQUFXLFdBQVc7QUFBQSxRQUM5QixDQUFDO0FBQUEsTUFDTDtBQUVBLFlBQU0sSUFBSSxNQUFNLEtBQUssU0FBUyxTQUFTLFNBQVM7QUFBQSxRQUM1QztBQUFBLFFBQ0E7QUFBQSxNQUNKLENBQUM7QUFFRCxhQUFPO0FBQUEsSUFDWCxTQUFTLE9BQU87QUFDWixZQUFNLEtBQUssY0FBYyxPQUFPO0FBQ2hDLFlBQU07QUFBQSxJQUNWLFVBQUU7QUFDRSxVQUFJLGFBQWE7QUFDYixZQUFJO0FBQ0EsZ0JBQVUsV0FBTyxXQUFXO0FBQUEsUUFDaEMsU0FBUTtBQUFBLFFBRVI7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUVBLE1BQU0sa0JBQWtCLFNBQTJDO0FBQy9ELFVBQU0sV0FBNEIsQ0FBQztBQUVuQyxVQUFNLE9BQU8sT0FBTyxlQUFzQztBQUN0RCxZQUFNLFVBQVUsTUFBVSxZQUFRLFlBQVk7QUFBQSxRQUMxQyxlQUFlO0FBQUEsTUFDbkIsQ0FBQztBQUVELGlCQUFXLFNBQVMsU0FBUztBQUN6QixZQUFJLE1BQU0sU0FBUyxPQUFRO0FBRTNCLGNBQU0sZUFBb0IsV0FBSyxZQUFZLE1BQU0sSUFBSTtBQUVyRCxZQUFJLE1BQU0sWUFBWSxHQUFHO0FBQ3JCLGdCQUFNLEtBQUssWUFBWTtBQUN2QjtBQUFBLFFBQ0o7QUFFQSxZQUNJLENBQUMsTUFBTSxPQUFPLEtBQ1QsY0FBUSxNQUFNLElBQUksRUFBRSxZQUFZLE1BQU0sT0FDN0M7QUFDRTtBQUFBLFFBQ0o7QUFFQSxjQUFNLGVBQ0QsZUFBUyxTQUFTLFlBQVksRUFDOUIsTUFBVyxTQUFHLEVBQ2QsS0FBSyxHQUFHO0FBRWIsY0FBTSxDQUFDLFNBQVNDLEtBQUksSUFBSSxNQUFNLFFBQVEsSUFBSTtBQUFBLFVBQ2xDLGFBQVMsY0FBYyxNQUFNO0FBQUEsVUFDN0IsU0FBSyxZQUFZO0FBQUEsUUFDekIsQ0FBQztBQUVELGlCQUFTLEtBQUs7QUFBQSxVQUNWLE9BQVksZUFBUyxNQUFNLE1BQVcsY0FBUSxNQUFNLElBQUksQ0FBQztBQUFBLFVBQ3pEO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBLE1BQU1BLE1BQUs7QUFBQSxRQUNmLENBQUM7QUFHRCxZQUFJLFNBQVMsU0FBUyxPQUFPLEdBQUc7QUFDNUIsZ0JBQU0sSUFBSSxRQUFRLENBQUNKLE9BQU0sV0FBV0EsSUFBRyxDQUFDLENBQUM7QUFBQSxRQUM3QztBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBRUEsVUFBTSxLQUFLLE9BQU87QUFFbEIsV0FBTyxTQUFTO0FBQUEsTUFBSyxDQUFDLEdBQUdDLE9BQ3JCLEVBQUUsTUFBTSxjQUFjQSxHQUFFLE9BQU8sT0FBTztBQUFBLElBQzFDO0FBQUEsRUFDSjtBQUFBLEVBRUEsTUFBTSxtQkFBc0M7QUFDeEMsVUFBTSxVQUFVLE1BQU0sS0FBSyxZQUFZO0FBRXZDLFFBQUk7QUFDQSxZQUFNLFVBQVUsb0JBQUksSUFBWTtBQUVoQyxZQUFNLE9BQU8sT0FDVCxZQUNBLGVBQWUsT0FDQztBQUNoQixjQUFNLFVBQVUsTUFBVSxZQUFRLFlBQVk7QUFBQSxVQUMxQyxlQUFlO0FBQUEsUUFDbkIsQ0FBQztBQUVELG1CQUFXLFNBQVMsU0FBUztBQUN6QixjQUFJLE1BQU0sU0FBUyxPQUFRO0FBRTNCLGdCQUFNLGVBQW9CLFdBQUssWUFBWSxNQUFNLElBQUk7QUFDckQsZ0JBQU0sZUFBZSxlQUNWLFdBQUssY0FBYyxNQUFNLElBQUksSUFDbEMsTUFBTTtBQUVaLGNBQUksTUFBTSxZQUFZLEdBQUc7QUFDckIsb0JBQVEsSUFBSSxhQUFhLE1BQVcsU0FBRyxFQUFFLEtBQUssR0FBRyxDQUFDO0FBQ2xELGtCQUFNLEtBQUssY0FBYyxZQUFZO0FBQUEsVUFDekM7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUVBLFlBQU0sS0FBSyxPQUFPO0FBRWxCLGFBQU8sTUFBTSxLQUFLLE9BQU8sRUFBRTtBQUFBLFFBQUssQ0FBQyxHQUFHQSxPQUNoQyxFQUFFLGNBQWNBLElBQUcsT0FBTztBQUFBLE1BQzlCO0FBQUEsSUFDSixVQUFFO0FBQ0UsWUFBTSxLQUFLLGNBQWMsT0FBTztBQUFBLElBQ3BDO0FBQUEsRUFDSjtBQUFBLEVBRUEsTUFBTSxjQUFjLEtBQTRCO0FBQzVDLFFBQUksQ0FBQyxJQUFLO0FBRVYsUUFBSTtBQUNBLFlBQVUsT0FBRyxLQUFLLEVBQUUsV0FBVyxNQUFNLE9BQU8sS0FBSyxDQUFDO0FBQUEsSUFDdEQsU0FBUyxPQUFPO0FBQ1osY0FBUSxLQUFLLCtEQUFrQixLQUFLO0FBQUEsSUFDeEM7QUFBQSxFQUNKO0FBQUEsRUFFQSxXQUFXO0FBQ1AsU0FBSyxnQkFBZ0I7QUFDckIsU0FBSyxJQUFJLFVBQVUsbUJBQW1CLGtCQUFrQjtBQUFBLEVBQzVEO0FBQ0o7IiwKICAibmFtZXMiOiBbImV4cG9ydHMiLCAibW9kdWxlIiwgIm0iLCAiaCIsICJkIiwgInciLCAieSIsICJtcyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJtcyIsICJ2IiwgIm5zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgIm0iLCAiYyIsICJyIiwgInYiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiXyIsICJrIiwgInVzZUNvbG9ycyIsICJjIiwgInYiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAicGF0aCIsICJzdGF0IiwgImV4cG9ydHMiLCAiX19leHBvcnQiLCAiZXhwb3J0cyIsICJpbXBvcnRfb2JzaWRpYW4iLCAiY2FjaGUiLCAicGF0aHNwZWMiLCAicGF0aHMiLCAia2V5IiwgImlzUGF0aFNwZWMiLCAidmFsdWUiLCAidG9QYXRocyIsICJzY29wZWRGbGFncyIsICJmbGFncyIsICJzY29wZSIsICJmaW5kR2xvYmFsIiwgImZsYWciLCAiQ09ORklHX1dSSVRFX0ZMQUdTIiwgIkNPTkZJR19SRUFEX0ZMQUdTIiwgIkNPTkZJR19XUklURV9WRVJCUyIsICJDT05GSUdfUkVBRF9WRVJCUyIsICJkZXRlY3RDb25maWdBY3Rpb24iLCAicG9zaXRpb25hbHMiLCAibmFtZSIsICJjb25maWdPcGVyYXRpb24iLCAidmVyYiIsICJpc1dyaXRlIiwgImtleSIsICJ0b09wZXJhdGlvbiIsICJvcGVyYXRpb24iLCAicGFyc2VBc3NpZ25tZW50IiwgInJhdyIsICJlcSIsICJkZXRlY3RDb25maWdTY29wZSIsICJkZXRlY3RDb25maWdPdmVycmlkZVNjb3BlIiwgImNvbGxlY3RXcml0ZUZsYWdzIiwgImFzc2lnbm1lbnQiLCAiY29sbGVjdENvbmZpZ0FjY2VzcyIsICJ0YXNrIiwgInBhcnNlZENvbmZpZyIsICJhcHBlbmRQYXJzZWRDb25maWdBY3Rpb24iLCAiYWN0aW9uIiwgImNvbmZpZyIsICJVTklWRVJTQUwiLCAiR0xPQkFMIiwgIkNPTU1BTkRTIiwgIkVNUFRZIiwgImdldEZsYWdTcGVjRm9yVGFzayIsICJzcGVjIiwgImV4cGFuZFRva2VuIiwgInN0ZW0iLCAiY2hhciIsICJjb25zdW1lcyIsICJleHBhbmRDbHVzdGVyIiwgInNob3J0U3BlYyIsICJjaGFycyIsICJyZXN1bHQiLCAiaSIsICJyZW1haW5kZXIiLCAiYyIsICJwYXJzZUdsb2JhbEZsYWdzIiwgInRva2VucyIsICJwYXJzZWQiLCAibmV4dCIsICJ0b2tlbiIsICJwYXJzZVRhc2tGbGFncyIsICJwYXRoc3BlY3MiLCAiY3VycmVudCIsICJpc1BhdGhTcGVjIiwgInRvUGF0aHMiLCAiaiIsICJ0IiwgImRldGVjdFZ1bG5lcmFibGVDb25maWdXcml0ZXMiLCAid3JpdGUiLCAiaGVscGVyIiwgInByZXZlbnRVbnNhZmVDb25maWciLCAidnVsbmVyYWJpbGl0eSIsICJwcmV2ZW50Q29uZmlnQnVpbGRlciIsICJjYXRlZ29yeSIsICJtZXNzYWdlIiwgInJlZ2V4IiwgInByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIiLCAiZGV0ZWN0VnVsbmVyYWJsZUZsYWdzIiwgInByZXZlbnRVbnNhZmVGbGFncyIsICJwcmV2ZW50RmxhZ0J1aWxkZXIiLCAiZ2xvYmFsT25seSIsICJ3aXRoVmFsdWUiLCAiY3VycmVudFRhc2siLCAicGF0aFRha2luZ0dsb2JhbCIsICJ2dWxuZXJhYmlsaXR5QW5hbHlzaXMiLCAicGFyc2VBcmd2IiwgInRhc2tJbmRleCIsICJ0YXNrVG9rZW5zIiwgInRvUGFyc2VkRmxhZyIsICJ2dWxuZXJhYmlsaXR5TGlzdCIsICJ2dWxuZXJhYmlsaXRpZXMiLCAidmFsdWUiLCAiR2l0RW52S2V5cyIsICJjb2xsZWN0Q29uZmlnQnlDb3VudCIsICJlbnYiLCAiY291bnQiLCAiaW5kZXgiLCAiY29sbGVjdENvbmZpZ1Z1bG5lcmFiaWxpdGllcyIsICJpc0dpdEVudktleSIsICJwcmVwYXJlRW52IiwgImdpdEVudiIsICJlbnZLZXkiLCAicGFyc2VFbnYiLCAidnVsbmVyYWJpbGl0eUNoZWNrIiwgIkdpdEVycm9yIiwgInRhc2siLCAibWVzc2FnZSIsICJHaXRDb25zdHJ1Y3RFcnJvciIsICJjb25maWciLCAiR2l0UGx1Z2luRXJyb3IiLCAicGx1Z2luIiwgIkdpdFJlc3BvbnNlRXJyb3IiLCAiZ2l0IiwgIlRhc2tDb25maWd1cmF0aW9uRXJyb3IiLCAiTlVMTCIsICJOT09QIiwgImFzRnVuY3Rpb24iLCAic291cmNlIiwgImlzVXNlckZ1bmN0aW9uIiwgInNwbGl0T24iLCAiaW5wdXQiLCAiY2hhciIsICJpbmRleCIsICJmaXJzdCIsICJvZmZzZXQiLCAiaXNBcnJheUxpa2UiLCAibGFzdCIsICJmaWx0ZXJIYXNMZW5ndGgiLCAidG9MaW5lc1dpdGhDb250ZW50IiwgInRyaW1tZWQiLCAic2VwYXJhdG9yIiwgIm91dHB1dCIsICJsaW5lIiwgImxpbmVDb250ZW50IiwgImZvckVhY2hMaW5lV2l0aENvbnRlbnQiLCAiY2FsbGJhY2siLCAiZm9sZGVyRXhpc3RzIiwgInBhdGgiLCAiZXhpc3RzIiwgIkZPTERFUiIsICJhcHBlbmQiLCAidGFyZ2V0IiwgIml0ZW0iLCAiaW5jbHVkaW5nIiwgInJlbW92ZSIsICJvYmplY3RUb1N0cmluZyIsICJhc0FycmF5IiwgImFzQ2FtZWxDYXNlIiwgInN0ciIsICJfYWxsIiwgImNociIsICJhc1N0cmluZ0FycmF5IiwgImFzTnVtYmVyIiwgIm9uTmFOIiwgIm51bSIsICJwcmVmaXhlZEFycmF5IiwgInByZWZpeCIsICJpIiwgIm1heCIsICJidWZmZXJUb1N0cmluZyIsICJieXRlTGVuZ3RoIiwgInBpY2siLCAicHJvcGVydGllcyIsICJvdXQiLCAia2V5IiwgImRlbGF5IiwgImR1cmF0aW9uIiwgImRvbmUiLCAib3JWb2lkIiwgImZpbHRlclR5cGUiLCAiZmlsdGVyIiwgImRlZiIsICJmaWx0ZXJBcnJheSIsICJmaWx0ZXJQcmltaXRpdmVzIiwgIm9taXQiLCAidHlwZSIsICJpc1BhdGhTcGVjIiwgImZpbHRlclN0cmluZyIsICJmaWx0ZXJTdHJpbmdPckJ1ZmZlciIsICJmaWx0ZXJTdHJpbmdPclN0cmluZ0FycmF5IiwgImZpbHRlclBsYWluT2JqZWN0IiwgImZpbHRlckZ1bmN0aW9uIiwgIkV4aXRDb2RlcyIsICJHaXRPdXRwdXRTdHJlYW1zIiwgInN0ZE91dCIsICJzdGRFcnIiLCAidXNlTWF0Y2hlc0RlZmF1bHQiLCAiTGluZVBhcnNlciIsICJyZWdFeHAiLCAidXNlTWF0Y2hlcyIsICJyZWciLCAibWF0Y2hlZCIsICJfaW5kZXgiLCAiUmVtb3RlTGluZVBhcnNlciIsICJkZWZhdWx0T3B0aW9ucyIsICJjcmVhdGVJbnN0YW5jZUNvbmZpZyIsICJvcHRpb25zIiwgImJhc2VEaXIiLCAibyIsICJhcHBlbmRUYXNrT3B0aW9ucyIsICJjb21tYW5kcyIsICJ2YWx1ZSIsICJ2IiwgImdldFRyYWlsaW5nT3B0aW9ucyIsICJhcmdzIiwgImluaXRpYWxQcmltaXRpdmUiLCAib2JqZWN0T25seSIsICJjb21tYW5kIiwgInRyYWlsaW5nT3B0aW9uc0FyZ3VtZW50IiwgInRyYWlsaW5nQXJyYXlBcmd1bWVudCIsICJoYXNUcmFpbGluZ0NhbGxiYWNrIiwgInRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudCIsICJpbmNsdWRlTm9vcCIsICJjYWxsVGFza1BhcnNlciIsICJwYXJzZXIiLCAic3RyZWFtcyIsICJwYXJzZVN0cmluZ1Jlc3BvbnNlIiwgInJlc3VsdCIsICJwYXJzZXJzIiwgInRleHRzIiwgInRyaW0iLCAidGV4dCIsICJsaW5lcyIsICJwYXJzZSIsICJvbkVycm9yIiwgImV4aXRDb2RlIiwgImVycm9yIiwgImRvbmUiLCAiZmFpbCIsICJFeGl0Q29kZXMiLCAiaXNOb3RSZXBvTWVzc2FnZSIsICJwYXJzZXIiLCAidGV4dCIsICJjaGVja0lzUmVwb1Rhc2siLCAiYWN0aW9uIiwgImNoZWNrSXNCYXJlUmVwb1Rhc2siLCAiY2hlY2tJc1JlcG9Sb290VGFzayIsICJwYXRoIiwgIkNsZWFuUmVzcG9uc2UiLCAiZHJ5UnVuIiwgInJlbW92YWxSZWdleHAiLCAiZHJ5UnVuUmVtb3ZhbFJlZ2V4cCIsICJpc0ZvbGRlclJlZ2V4cCIsICJjbGVhblN1bW1hcnlQYXJzZXIiLCAic3VtbWFyeSIsICJyZWdleHAiLCAidG9MaW5lc1dpdGhDb250ZW50IiwgImxpbmUiLCAicmVtb3ZlZCIsICJFTVBUWV9DT01NQU5EUyIsICJhZGhvY0V4ZWNUYXNrIiwgImNvbmZpZ3VyYXRpb25FcnJvclRhc2siLCAiVGFza0NvbmZpZ3VyYXRpb25FcnJvciIsICJzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrIiwgImNvbW1hbmRzIiwgInRyaW1tZWQiLCAic3RyYWlnaHRUaHJvdWdoQnVmZmVyVGFzayIsICJidWZmZXIiLCAiaXNCdWZmZXJUYXNrIiwgInRhc2siLCAiaXNFbXB0eVRhc2siLCAiQ09ORklHX0VSUk9SX0lOVEVSQUNUSVZFX01PREUiLCAiQ09ORklHX0VSUk9SX01PREVfUkVRVUlSRUQiLCAiQ09ORklHX0VSUk9SX1VOS05PV05fT1BUSU9OIiwgIkNsZWFuT3B0aW9ucyIsICJDbGVhbk9wdGlvblZhbHVlcyIsICJhc1N0cmluZ0FycmF5IiwgImNsZWFuV2l0aE9wdGlvbnNUYXNrIiwgIm1vZGUiLCAiY3VzdG9tQXJncyIsICJjbGVhbk1vZGUiLCAib3B0aW9ucyIsICJ2YWxpZCIsICJnZXRDbGVhbk9wdGlvbnMiLCAiaXNJbnRlcmFjdGl2ZU1vZGUiLCAiY2xlYW5UYXNrIiwgImlzQ2xlYW5PcHRpb25zQXJyYXkiLCAiaW5wdXQiLCAidGVzdCIsICJjaGFyIiwgImlzQ2xlYW5Nb2RlIiwgImlzS25vd25PcHRpb24iLCAib3B0aW9uIiwgIkNvbmZpZ0xpc3QiLCAiYWxsIiwgImZpbGUiLCAibGF0ZXN0IiwgImxhc3QiLCAia2V5IiwgInZhbHVlIiwgInZhbHVlcyIsICJjb25maWdMaXN0UGFyc2VyIiwgImNvbmZpZyIsICJpdGVtIiwgImNvbmZpZ1BhcnNlciIsICJjb25maWdHZXRQYXJzZXIiLCAic2NvcGVzIiwgImNvbmZpZ0ZpbGVQYXRoIiwgImZpbGVQYXRoIiwgInJlcXVlc3RlZEtleSIsICJsaW5lcyIsICJpIiwgIm1heCIsICJzcGxpdE9uIiwgIkdpdENvbmZpZ1Njb3BlIiwgImFzQ29uZmlnU2NvcGUiLCAic2NvcGUiLCAiZmFsbGJhY2siLCAiYWRkQ29uZmlnVGFzayIsICJhcHBlbmQiLCAiZ2V0Q29uZmlnVGFzayIsICJsaXN0Q29uZmlnVGFzayIsICJyZXN0IiwgInRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudCIsICJEaWZmTmFtZVN0YXR1cyIsICJkaWZmTmFtZVN0YXR1cyIsICJpc0RpZmZOYW1lU3RhdHVzIiwgIl9hIiwgImRpc2FsbG93ZWRPcHRpb25zIiwgIlF1ZXJ5IiwgIkdyZXBRdWVyeSIsICJxdWVyeSIsICJhbmQiLCAicHJlZml4ZWRBcnJheSIsICJwYXJhbSIsICJncmVwUXVlcnlCdWlsZGVyIiwgInBhcmFtcyIsICJwYXJzZUdyZXAiLCAiZ3JlcCIsICJwYXRocyIsICJyZXN1bHRzIiwgImZvckVhY2hMaW5lV2l0aENvbnRlbnQiLCAicHJldmlldyIsICJOVUxMIiwgImFzTnVtYmVyIiwgInNlYXJjaFRlcm0iLCAidGhlbiIsICJnZXRUcmFpbGluZ09wdGlvbnMiLCAic3RkT3V0IiwgIlJlc2V0TW9kZSIsICJ2YWxpZFJlc2V0TW9kZXMiLCAicmVzZXRUYXNrIiwgImlzVmFsaWRSZXNldE1vZGUiLCAiZ2V0UmVzZXRNb2RlIiwgImRlYnVnIiwgImZpbHRlckhhc0xlbmd0aCIsICJvYmplY3RUb1N0cmluZyIsICJjcmVhdGVMb2ciLCAicHJlZml4ZWRMb2dnZXIiLCAidG8iLCAicHJlZml4IiwgImZvcndhcmQiLCAibWVzc2FnZSIsICJhcmdzIiwgImNoaWxkTG9nZ2VyTmFtZSIsICJuYW1lIiwgImNoaWxkRGVidWdnZXIiLCAicGFyZW50TmFtZXNwYWNlIiwgImNoaWxkTmFtZXNwYWNlIiwgImNyZWF0ZUxvZ2dlciIsICJsYWJlbCIsICJ2ZXJib3NlIiwgImluaXRpYWxTdGVwIiwgImluZm9EZWJ1Z2dlciIsICJsYWJlbFByZWZpeCIsICJzcGF3bmVkIiwgImRlYnVnRGVidWdnZXIiLCAiZmlsdGVyVHlwZSIsICJmaWx0ZXJTdHJpbmciLCAic3RlcCIsICJzaWJsaW5nIiwgImluaXRpYWwiLCAicGhhc2UiLCAic3RlcFByZWZpeCIsICJOT09QIiwgImluZm8iLCAiX1Rhc2tzUGVuZGluZ1F1ZXVlIiwgImxvZ0xhYmVsIiwgImxvZ2dlciIsICJwcm9ncmVzcyIsICJlcnIiLCAiR2l0RXJyb3IiLCAiVGFza3NQZW5kaW5nUXVldWUiLCAiR2l0RXhlY3V0b3JDaGFpbiIsICJfZXhlY3V0b3IiLCAiX3NjaGVkdWxlciIsICJfcGx1Z2lucyIsICJjd2QiLCAib25TY2hlZHVsZUNvbXBsZXRlIiwgIm9uUXVldWVDb21wbGV0ZSIsICJlIiwgImdpdEVycm9yIiwgImJpbmFyeSIsICJyYXciLCAib3V0cHV0U3RyZWFtcyIsICJjYWxsVGFza1BhcnNlciIsICJyZXN1bHQiLCAicmVqZWN0aW9uIiwgInN0ZEVyciIsICJuZXdTdGRPdXQiLCAiR2l0T3V0cHV0U3RyZWFtcyIsICJjb21tYW5kIiwgIm91dHB1dEhhbmRsZXIiLCAib3V0cHV0TG9nZ2VyIiwgInNwYXduT3B0aW9ucyIsICJyZWFzb24iLCAic3Bhd24iLCAib25EYXRhUmVjZWl2ZWQiLCAib25FcnJvclJlY2VpdmVkIiwgImZpcnN0IiwgInRhcmdldCIsICJvdXRwdXQiLCAiR2l0RXhlY3V0b3IiLCAidGFza0NhbGxiYWNrIiwgInJlc3BvbnNlIiwgImNhbGxiYWNrIiwgIm9uU3VjY2VzcyIsICJkYXRhIiwgImNoYW5nZVdvcmtpbmdEaXJlY3RvcnlUYXNrIiwgImRpcmVjdG9yeSIsICJyb290IiwgImluc3RhbmNlIiwgImZvbGRlckV4aXN0cyIsICJjaGVja291dFRhc2siLCAicmVtb3ZlIiwgImNoZWNrb3V0IiwgImJyYW5jaE5hbWUiLCAic3RhcnRQb2ludCIsICJjbG9uZVRhc2siLCAicmVwbyIsICJwYXRoc3BlYyIsICJjbG9uZU1pcnJvclRhc2siLCAiY3JlYXRlQ2xvbmVUYXNrIiwgImFwaSIsICJyZXBvUGF0aCIsICJjbG9uZSIsICJwYXJzZXJzIiwgIkxpbmVQYXJzZXIiLCAiYnJhbmNoIiwgImNvbW1pdCIsICJhdXRob3IiLCAicGFydHMiLCAiZW1haWwiLCAiY2hhbmdlcyIsICJpbnNlcnRpb25zIiwgImRlbGV0aW9ucyIsICJkaXJlY3Rpb24iLCAiY291bnQiLCAicGFyc2VDb21taXRSZXN1bHQiLCAicGFyc2VTdHJpbmdSZXNwb25zZSIsICJjb21taXRUYXNrIiwgImZpbGVzIiwgIm5leHQiLCAicmVqZWN0RGVwcmVjYXRlZFNpZ25hdHVyZXMiLCAiYXNBcnJheSIsICJmaWx0ZXJTdHJpbmdPclN0cmluZ0FycmF5IiwgImZpbHRlckFycmF5IiwgImNvdW50T2JqZWN0c1Jlc3BvbnNlIiwgInByb3BlcnR5IiwgImFzQ2FtZWxDYXNlIiwgImNvdW50T2JqZWN0cyIsICJmaXJzdENvbW1pdCIsICJoYXNoT2JqZWN0VGFzayIsICJ3cml0ZSIsICJJbml0U3VtbWFyeSIsICJiYXJlIiwgImV4aXN0aW5nIiwgImdpdERpciIsICJpbml0UmVzcG9uc2VSZWdleCIsICJyZUluaXRSZXNwb25zZVJlZ2V4IiwgInBhcnNlSW5pdCIsICJ0b2tlbnMiLCAiYmFyZUNvbW1hbmQiLCAiaGFzQmFyZUNvbW1hbmQiLCAiaW5pdFRhc2siLCAiaW50ZXJwcmV0VHJhaWxlcnNUYXNrIiwgImluZGV4IiwgImludGVycHJldFRyYWlsZXJzIiwgImZpbHRlclN0cmluZ09yQnVmZmVyIiwgIkxvZ0Zvcm1hdCIsICJsb2dGb3JtYXRSZWdleCIsICJsb2dGb3JtYXRGcm9tQ29tbWFuZCIsICJmb3JtYXQiLCAiaXNMb2dGb3JtYXQiLCAiY3VzdG9tQXJnIiwgIkRpZmZTdW1tYXJ5IiwgInN0YXRQYXJzZXIiLCAiYWx0ZXJhdGlvbnMiLCAiYmVmb3JlIiwgImFmdGVyIiwgImNoYW5nZWQiLCAiaW5zZXJ0ZWQiLCAiZGVsZXRlZCIsICJudW1TdGF0UGFyc2VyIiwgImNoYW5nZXNJbnNlcnQiLCAiY2hhbmdlc0RlbGV0ZSIsICJuYW1lT25seVBhcnNlciIsICJuYW1lU3RhdHVzUGFyc2VyIiwgInN0YXR1cyIsICJzaW1pbGFyaXR5IiwgImZyb20iLCAiX3RvIiwgIm9yVm9pZCIsICJkaWZmU3VtbWFyeVBhcnNlcnMiLCAiZ2V0RGlmZlBhcnNlciIsICJTVEFSVF9CT1VOREFSWSIsICJDT01NSVRfQk9VTkRBUlkiLCAiU1BMSVRURVIiLCAiZGVmYXVsdEZpZWxkTmFtZXMiLCAibGluZUJ1aWxkZXIiLCAiZmllbGRzIiwgImZpZWxkIiwgImNyZWF0ZUxpc3RMb2dTdW1tYXJ5UGFyc2VyIiwgInNwbGl0dGVyIiwgImxvZ0Zvcm1hdCIsICJwYXJzZURpZmZSZXN1bHQiLCAibGluZURldGFpbCIsICJsaXN0TG9nTGluZSIsICJkaWZmU3VtbWFyeVRhc2siLCAidmFsaWRhdGVMb2dGb3JtYXRDb25maWciLCAiZmxhZ3MiLCAiZXhjbHVkZU9wdGlvbnMiLCAicHJldHR5Rm9ybWF0IiwgImZvcm1hdFN0ciIsICJ1c2VyT3B0aW9ucyIsICJvdXQiLCAicGFyc2VMb2dPcHRpb25zIiwgIm9wdCIsICJmaWx0ZXJQbGFpbk9iamVjdCIsICJzdWZmaXgiLCAibWF4Q291bnQiLCAicmFuZ2VPcGVyYXRvciIsICJhcHBlbmRUYXNrT3B0aW9ucyIsICJsb2dUYXNrIiwgImxvZyIsICJ0cmFpbGluZ09wdGlvbnNBcmd1bWVudCIsICJjcmVhdGVMb2dUYXNrIiwgIk1lcmdlU3VtbWFyeUNvbmZsaWN0IiwgIm1ldGEiLCAiTWVyZ2VTdW1tYXJ5RGV0YWlsIiwgIlB1bGxTdW1tYXJ5IiwgIlB1bGxGYWlsZWRTdW1tYXJ5IiwgIm9iamVjdEVudW1lcmF0aW9uUmVzdWx0IiwgInJlbW90ZU1lc3NhZ2VzIiwgImFzT2JqZWN0Q291bnQiLCAic291cmNlIiwgImRlbHRhIiwgInJlbW90ZU1lc3NhZ2VzT2JqZWN0UGFyc2VycyIsICJSZW1vdGVMaW5lUGFyc2VyIiwgImVudW1lcmF0aW9uIiwgInRvdGFsIiwgInJldXNlZCIsICJwYWNrUmV1c2VkIiwgIm9iamVjdHMiLCAicHVsbFJlcXVlc3RVcmwiLCAidXJsIiwgInBhcnNlUmVtb3RlTWVzc2FnZXMiLCAiX3N0ZE91dCIsICJSZW1vdGVNZXNzYWdlU3VtbWFyeSIsICJGSUxFX1VQREFURV9SRUdFWCIsICJTVU1NQVJZX1JFR0VYIiwgIkFDVElPTl9SRUdFWCIsICJlcnJvclBhcnNlcnMiLCAicmVtb3RlIiwgImhhc2hMb2NhbCIsICJoYXNoUmVtb3RlIiwgImJyYW5jaExvY2FsIiwgImJyYW5jaFJlbW90ZSIsICJwYXJzZVB1bGxEZXRhaWwiLCAicGFyc2VQdWxsUmVzdWx0IiwgInBhcnNlUHVsbEVycm9yUmVzdWx0IiwgInB1bGxFcnJvciIsICJhdXRvTWVyZ2UiLCAiZGVsZXRlUmVmIiwgInBhcnNlTWVyZ2VSZXN1bHQiLCAicGFyc2VNZXJnZURldGFpbCIsICJtZXJnZVRhc2siLCAibWVyZ2UiLCAiR2l0UmVzcG9uc2VFcnJvciIsICJwdXNoUmVzdWx0UHVzaGVkSXRlbSIsICJsb2NhbCIsICJ0YWciLCAiYWxyZWFkeVVwZGF0ZWQiLCAidHlwZSIsICJyZW1vdGVOYW1lIiwgInBhcnNlUHVzaFJlc3VsdCIsICJwdXNoRGV0YWlsIiwgInBhcnNlUHVzaERldGFpbCIsICJyZXNwb25zZURldGFpbCIsICJwdXNoVGFnc1Rhc2siLCAicmVmIiwgInB1c2hUYXNrIiwgInNob3ciLCAiZnJvbVBhdGhSZWdleCIsICJGaWxlU3RhdHVzU3VtbWFyeSIsICJ3b3JraW5nX2RpciIsICJkZXRhaWwiLCAiU3RhdHVzU3VtbWFyeSIsICJyZW5hbWVkRmlsZSIsICJpbmRleFgiLCAiaW5kZXhZIiwgImhhbmRsZXIiLCAiY29uZmxpY3RzIiwgInkiLCAicmVuYW1lZCIsICJfcmVzdWx0IiwgIl9maWxlIiwgImFoZWFkUmVnIiwgImJlaGluZFJlZyIsICJjdXJyZW50UmVnIiwgInRyYWNraW5nUmVnIiwgIm9uRW1wdHlCcmFuY2hSZWciLCAicmVnZXhSZXN1bHQiLCAicGFyc2VTdGF0dXNTdW1tYXJ5IiwgImwiLCAic3BsaXRMaW5lIiwgImxpbmVTdHIiLCAid29ya2luZ0RpciIsICJpZ25vcmVkT3B0aW9ucyIsICJzdGF0dXNUYXNrIiwgImFyZyIsICJOT1RfSU5TVEFMTEVEIiwgInZlcnNpb25SZXNwb25zZSIsICJtYWpvciIsICJtaW5vciIsICJwYXRjaCIsICJhZ2VudCIsICJpbnN0YWxsZWQiLCAibm90SW5zdGFsbGVkUmVzcG9uc2UiLCAidmVyc2lvbiIsICJ2ZXJzaW9uUGFyc2VyIiwgIlNpbXBsZUdpdEFwaSIsICJjaGFpbiIsICJwcm9taXNlIiwgImNyZWF0ZVNjaGVkdWxlZFRhc2siLCAiaWQiLCAiY3JlYXRlRGVmZXJyZWQiLCAiU2NoZWR1bGVyIiwgImNvbmN1cnJlbmN5IiwgImFwcGx5UGF0Y2hUYXNrIiwgInBhdGNoZXMiLCAiQnJhbmNoU3RhdHVzSWRlbnRpZmllciIsICJCcmFuY2hTdW1tYXJ5UmVzdWx0IiwgImRldGFjaGVkIiwgImN1cnJlbnQiLCAiYnJhbmNoU3RhdHVzIiwgImN1cnJlbnRCcmFuY2hQYXJzZXIiLCAicGFyc2VCcmFuY2hTdW1tYXJ5IiwgImN1cnJlbnRPbmx5IiwgIkJyYW5jaERlbGV0aW9uQmF0Y2giLCAiYnJhbmNoRGVsZXRpb25TdWNjZXNzIiwgImhhc2giLCAiYnJhbmNoRGVsZXRpb25GYWlsdXJlIiwgImRlbGV0ZVN1Y2Nlc3NSZWdleCIsICJkZWxldGVFcnJvclJlZ2V4IiwgImRlbGV0aW9uIiwgInBhcnNlQnJhbmNoRGVsZXRpb25zIiwgImhhc0JyYW5jaERlbGV0aW9uRXJyb3IiLCAicHJvY2Vzc0V4aXRDb2RlIiwgImNvbnRhaW5zRGVsZXRlQnJhbmNoQ29tbWFuZCIsICJkZWxldGVDb21tYW5kcyIsICJicmFuY2hUYXNrIiwgImlzRGVsZXRlIiwgImlzQ3VycmVudE9ubHkiLCAiYnJhbmNoTG9jYWxUYXNrIiwgImRlbGV0ZUJyYW5jaGVzVGFzayIsICJicmFuY2hlcyIsICJmb3JjZURlbGV0ZSIsICJkZWxldGVCcmFuY2hUYXNrIiwgIl8iLCAiYnVmZmVyVG9TdHJpbmciLCAiY2hlY2tJZ25vcmVUYXNrIiwgInBhcnNlQ2hlY2tJZ25vcmUiLCAidG9QYXRoIiwgIm5vcm1hbGl6ZSIsICJ0cmFja2luZyIsICJwYXJzZUZldGNoUmVzdWx0IiwgImRpc2FsbG93ZWRDb21tYW5kIiwgImZldGNoVGFzayIsICJwYXJzZU1vdmVSZXN1bHQiLCAibW92ZVRhc2siLCAicHVsbFRhc2siLCAiX2Vycm9yIiwgIl9kb25lIiwgInBhcnNlR2V0UmVtb3RlcyIsICJyZW1vdGVzIiwgImZvckVhY2giLCAicGFyc2VHZXRSZW1vdGVzVmVyYm9zZSIsICJwdXJwb3NlIiwgImFkZFJlbW90ZVRhc2siLCAicmVtb3RlUmVwbyIsICJnZXRSZW1vdGVzVGFzayIsICJsaXN0UmVtb3Rlc1Rhc2siLCAicmVtb3RlVGFzayIsICJyZW1vdmVSZW1vdGVUYXNrIiwgInN0YXNoTGlzdFRhc2siLCAiYWRkU3ViTW9kdWxlVGFzayIsICJzdWJNb2R1bGVUYXNrIiwgImluaXRTdWJNb2R1bGVUYXNrIiwgInVwZGF0ZVN1Yk1vZHVsZVRhc2siLCAiVGFnTGlzdCIsICJwYXJzZVRhZ0xpc3QiLCAiY3VzdG9tU29ydCIsICJ0YWdzIiwgInRhZ0EiLCAidGFnQiIsICJwYXJ0c0EiLCAicGFydHNCIiwgInNpbmdsZVNvcnRlZCIsICJ0b051bWJlciIsICJkaWZmIiwgInNvcnRlZCIsICJhIiwgImIiLCAiYUlzTnVtIiwgImJJc051bSIsICJ0YWdMaXN0VGFzayIsICJoYXNDdXN0b21Tb3J0IiwgImFkZFRhZ1Rhc2siLCAiYWRkQW5ub3RhdGVkVGFnVGFzayIsICJ0YWdNZXNzYWdlIiwgIkdpdCIsICJwbHVnaW5zIiwgImdpdCIsICJ0YWdOYW1lIiwgImJyYW5jaE5hbWVzIiwgImNyZWF0ZVJlc3RDb21tYW5kcyIsICJmaWx0ZXJQcmltaXRpdmVzIiwgInVzaW5nQ2xlYW5PcHRpb25zQXJyYXkiLCAicGF0aG5hbWVzIiwgImNoZWNrVHlwZSIsICJhYm9ydFBsdWdpbiIsICJzaWduYWwiLCAiX2RhdGEiLCAiY29udGV4dCIsICJHaXRQbHVnaW5FcnJvciIsICJraWxsIiwgImFsbG93RW52aXJvbm1lbnRQbHVnaW4iLCAiYWxsb3dFbnZpcm9ubWVudCIsICJhbGxvd0FiYnJldmlhdGVkT3B0aW9ucyIsICJhbGxvd2VkIiwgImVudiIsICJzdXBwbGllZEtleXMiLCAibm9ybWFsaXNlZCIsICJpc0d1YXJkZWRFbnZLZXkiLCAiaXNHaXRFbnZLZXkiLCAiYmxvY2tVbnNhZmVPcGVyYXRpb25zUGx1Z2luIiwgInZ1bG5lcmFiaWxpdHkiLCAidnVsbmVyYWJpbGl0eUNoZWNrIiwgImNvbW1hbmRDb25maWdQcmVmaXhpbmdQbHVnaW4iLCAiY29uZmlndXJhdGlvbiIsICJuZXZlciIsICJkZWZlcnJlZCIsICJjb21wbGV0aW9uRGV0ZWN0aW9uUGx1Z2luIiwgIm9uQ2xvc2UiLCAib25FeGl0IiwgImNyZWF0ZUV2ZW50cyIsICJldmVudHMiLCAiY29uZmlndXJlVGltZW91dCIsICJjb2RlIiwgImZsYWciLCAiZXZlbnQiLCAidGltZW91dCIsICJkZWxheSIsICJjbG9zZSIsICJkZWZlckNsb3NlIiwgInF1aWNrQ2xvc2UiLCAiV1JPTkdfTlVNQkVSX0VSUiIsICJXUk9OR19DSEFSU19FUlIiLCAiaXNCYWRBcmd1bWVudCIsICJ0b0JpbmFyeUNvbmZpZyIsICJhbGxvd1Vuc2FmZSIsICJjdXN0b21CaW5hcnlQbHVnaW4iLCAiUkVBU09OUyIsICJnZXRSZWFzb24iLCAiR2l0Q29uZmlndXJhdGlvbkVycm9yIiwgImlzVGFza0Vycm9yIiwgImdldEVycm9yTWVzc2FnZSIsICJlcnJvckRldGVjdGlvbkhhbmRsZXIiLCAib3ZlcndyaXRlIiwgImlzRXJyb3IiLCAiZXJyb3JNZXNzYWdlIiwgImNyZWF0ZUdpdEVycm9yIiwgImVycm9yRGV0ZWN0aW9uUGx1Z2luIiwgImlucHV0UGx1Z2luIiwgInRhc2tJbnB1dCIsICJzdGRpbiIsICJjb250ZW50IiwgImJ5dGVMZW5ndGgiLCAiUGx1Z2luU3RvcmUiLCAiRXZlbnRFbWl0dGVyIiwgImxpc3RlbmVyIiwgInBsdWdpbiIsICJjb250ZXh0dWFsIiwgInByb2dyZXNzTW9uaXRvclBsdWdpbiIsICJwcm9ncmVzc0NvbW1hbmQiLCAicHJvZ3Jlc3NNZXRob2RzIiwgImluY2x1ZGluZyIsICJjaHVuayIsICJwcm9ncmVzc0V2ZW50U3RhZ2UiLCAic3Bhd25PcHRpb25zUGx1Z2luIiwgInBpY2siLCAic3VmZml4UGF0aHNQbHVnaW4iLCAiaXNQYXRoU3BlYyIsICJ0b1BhdGhzIiwgInRpbWVvdXRQbHVnaW4iLCAiYmxvY2siLCAid2FpdCIsICJzdG9wIiwgInNpbXBsZUdpdCIsICJiYXNlRGlyIiwgImNyZWF0ZUluc3RhbmNlQ29uZmlnIiwgImFwaS5HaXRDb25zdHJ1Y3RFcnJvciIsICJwYXRoIiwgIm9zIiwgInJlc29sdmUiLCAiaW1wb3J0X29ic2lkaWFuIiwgImZzIiwgImltcG9ydF9vYnNpZGlhbiIsICJmcyIsICJwYXRoIiwgIm9zIiwgImltcG9ydF9vYnNpZGlhbiIsICJyIiwgImIiLCAiX2UiLCAiX2EiLCAic3RhdCJdCn0K
