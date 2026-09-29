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
        const stat = fs_1.statSync(path4);
        if (stat.isFile() && isFile) {
          log(`[OK] path represents a file`);
          return true;
        }
        if (stat.isDirectory() && isDirectory) {
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
var import_obsidian4 = require("obsidian");

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
var fs4 = __toESM(require("fs"));
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
var import_obsidian3 = require("obsidian");
var fs3 = __toESM(require("fs"));
var path2 = __toESM(require("path"));
var os2 = __toESM(require("os"));
var UploadArticleModal = class extends import_obsidian3.Modal {
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
        new import_obsidian3.Notice(`\u300A${this.file.basename}\u300B\u5DF2\u4E0A\u4F20\u5230 ${folder || "\u4ED3\u5E93\u6839\u76EE\u5F55"}`);
        this.close();
      } catch (error) {
        new import_obsidian3.Notice(
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
  if (!(adapter instanceof import_obsidian3.FileSystemAdapter)) {
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
var GitArticlesView = class extends import_obsidian4.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.articles = [];
    this.localTitles = /* @__PURE__ */ new Map();
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
  async loadArticles() {
    const tempDir = await this.plugin.cloneToTemp();
    try {
      this.articles = this.plugin.getRemoteArticles(tempDir);
      this.localTitles.clear();
      for (const file of this.app.vault.getMarkdownFiles()) {
        if (!this.localTitles.has(file.name)) {
          this.localTitles.set(file.name, file);
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
      this.plugin.removeTempDir(tempDir);
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
            new import_obsidian4.Notice(`\u300A${article.title}\u300B\u5DF2\u8986\u76D6\u5E76\u540C\u6B65`);
          } else if (result === "copy") {
            const copyFile = await syncArticleAsCopy(
              this.plugin,
              article,
              localFile
            );
            new import_obsidian4.Notice(`\u5DF2\u4FDD\u5B58\u4E3A\u526F\u4EF6\uFF1A${copyFile.path}`);
          }
        } else {
          const newFile = await downloadArticle(this.plugin, article);
          this.localTitles.set(newFile.name, newFile);
          action.textContent = "\u540C\u6B65";
          action.classList.add("is-synced");
          new import_obsidian4.Notice(`\u300A${article.title}\u300B\u5DF2\u4E0B\u8F7D`);
        }
      } catch (error) {
        new import_obsidian4.Notice(
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
var GitSyncSettingTab = class extends import_obsidian4.PluginSettingTab {
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
    new import_obsidian4.Setting(containerEl).setName("Git \u4ED3\u5E93\u5730\u5740").setDesc("\u652F\u6301 HTTPS \u548C SSH\uFF0C\u4F8B\u5982 git@github.com:user/repo.git").addText(
      (text) => text.setPlaceholder("git@github.com:user/repo.git").setValue(this.plugin.settings.repoUrl).onChange(async (value) => {
        this.plugin.settings.repoUrl = value.trim();
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian4.Setting(containerEl).setName("SSH \u79C1\u94A5").setDesc("\u53EF\u9009\u3002\u7559\u7A7A\u65F6\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4 SSH \u914D\u7F6E\u3002\u79C1\u94A5\u53EA\u7528\u4E8E\u5F53\u524D Git \u64CD\u4F5C\u3002").addTextArea((text) => {
      text.setPlaceholder("\u7C98\u8D34 SSH \u79C1\u94A5").setValue(this.plugin.settings.sshKey).onChange(async (value) => {
        this.plugin.settings.sshKey = value;
        await this.plugin.saveSettings();
      });
      text.inputEl.rows = 7;
      text.inputEl.addClass("git-sync-settings-key");
    });
    new import_obsidian4.Setting(containerEl).setName("\u6587\u7AE0\u4FDD\u5B58\u76EE\u5F55").setDesc("\u4E0B\u8F7D\u65B0\u6587\u7AE0\u65F6\u4F7F\u7528\u7684 Vault \u76F8\u5BF9\u8DEF\u5F84\uFF0C\u4F8B\u5982 Git\u6587\u7AE0").addText(
      (text) => text.setPlaceholder("Git\u6587\u7AE0").setValue(this.plugin.settings.targetFolder).onChange(async (value) => {
        this.plugin.settings.targetFolder = value.trim().replace(/^\/+|\/+$/g, "") || "Git\u6587\u7AE0";
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian4.Setting(containerEl).setName("\u6253\u5F00\u6587\u7AE0\u5217\u8868").setDesc("\u6253\u5F00\u4E00\u4E2A\u65B0\u7684 Obsidian \u6807\u7B7E\u9875\uFF0C\u67E5\u770B\u4ED3\u5E93\u4E2D\u7684\u6587\u7AE0\u3002").addButton(
      (button) => button.setButtonText("\u6253\u5F00").onClick(async () => {
        await this.plugin.activateArticlesView();
      })
    );
  }
};
var MySimplePlugin = class extends import_obsidian4.Plugin {
  async onload() {
    await this.loadSettings();
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
    console.log("Git \u6587\u7AE0\u540C\u6B65\u63D2\u4EF6\u5DF2\u52A0\u8F7D");
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
        fs4.writeFileSync(
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
      this.removeTempDir(tempDir);
      throw error;
    } finally {
      if (tempKeyPath && fs4.existsSync(tempKeyPath)) {
        try {
          fs4.unlinkSync(tempKeyPath);
        } catch (e) {
        }
      }
    }
  }
  getRemoteArticles(repoDir) {
    const articles = [];
    const walk = (currentDir) => {
      for (const entry of fs4.readdirSync(currentDir, {
        withFileTypes: true
      })) {
        if (entry.name === ".git") continue;
        const absolutePath = path3.join(currentDir, entry.name);
        if (entry.isDirectory()) {
          walk(absolutePath);
          continue;
        }
        if (!entry.isFile() || path3.extname(entry.name).toLowerCase() !== ".md") {
          continue;
        }
        const relativePath = path3.relative(repoDir, absolutePath).split(path3.sep).join("/");
        articles.push({
          title: path3.basename(entry.name, path3.extname(entry.name)),
          relativePath,
          absolutePath,
          content: fs4.readFileSync(absolutePath, "utf8"),
          size: fs4.statSync(absolutePath).size
        });
      }
    };
    walk(repoDir);
    return articles.sort(
      (a, b3) => a.title.localeCompare(b3.title, "zh-CN")
    );
  }
  async getRemoteFolders() {
    const tempDir = await this.cloneToTemp();
    try {
      const folders = /* @__PURE__ */ new Set();
      const walk = (currentDir, relativeBase = "") => {
        for (const entry of fs4.readdirSync(currentDir, { withFileTypes: true })) {
          if (entry.name === ".git") continue;
          const absolutePath = path3.join(currentDir, entry.name);
          const relativePath = relativeBase ? path3.join(relativeBase, entry.name) : entry.name;
          if (entry.isDirectory()) {
            folders.add(relativePath.split(path3.sep).join("/"));
            walk(absolutePath, relativePath);
          }
        }
      };
      walk(tempDir);
      return Array.from(folders).sort(
        (a, b3) => a.localeCompare(b3, "zh-CN")
      );
    } finally {
      this.removeTempDir(tempDir);
    }
  }
  removeTempDir(dir) {
    if (!dir || !fs4.existsSync(dir)) return;
    try {
      fs4.rmSync(dir, { recursive: true, force: true });
    } catch (error) {
      console.warn("\u6E05\u7406 Git \u4E34\u65F6\u76EE\u5F55\u5931\u8D25\uFF1A", error);
    }
  }
  onunload() {
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_ARTICLES);
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL21zL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvY29tbW9uLmpzIiwgIm5vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvYnJvd3Nlci5qcyIsICJub2RlX21vZHVsZXMvZGVidWcvc3JjL25vZGUuanMiLCAibm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvQGt3c2l0ZXMvZmlsZS1leGlzdHMvc3JjL2luZGV4LnRzIiwgIm5vZGVfbW9kdWxlcy9Aa3dzaXRlcy9maWxlLWV4aXN0cy9pbmRleC50cyIsICJub2RlX21vZHVsZXMvQGt3c2l0ZXMvcHJvbWlzZS1kZWZlcnJlZC9zcmMvaW5kZXgudHMiLCAibWFpbi50cyIsICJub2RlX21vZHVsZXMvQHNpbXBsZS1naXQvYXJncy1wYXRoc3BlYy9zcmMvcGF0aHNwZWMudHMiLCAibm9kZV9tb2R1bGVzL0BzaW1wbGUtZ2l0L2FyZ3YtcGFyc2VyL3NyYy9mbGFncy9mbGFncy5oZWxwZXJzLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvY29uZmlnL2NvbmZpZy1vcGVyYW5kcy50cyIsICJub2RlX21vZHVsZXMvQHNpbXBsZS1naXQvYXJndi1wYXJzZXIvc3JjL2NvbmZpZy9kZXRlY3QtY29uZmlnLWFjdGlvbi50cyIsICJub2RlX21vZHVsZXMvQHNpbXBsZS1naXQvYXJndi1wYXJzZXIvc3JjL2NvbmZpZy9hbmFseXNlLWNvbmZpZy50cyIsICJub2RlX21vZHVsZXMvQHNpbXBsZS1naXQvYXJndi1wYXJzZXIvc3JjL3Rva2Vucy9mbGFnLXNwZWNzLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvdG9rZW5zL3Rva2VuLWV4cGFuZGVyLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvZmxhZ3MvcGFyc2UtZ2xvYmFsLWZsYWdzLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvZmxhZ3MvcGFyc2UtdGFzay1mbGFncy50cyIsICJub2RlX21vZHVsZXMvQHNpbXBsZS1naXQvYXJndi1wYXJzZXIvc3JjL3Z1bG5lcmFiaWxpdGllcy9kZXRlY3QtdnVsbmVyYWJsZS1jb25maWctd3JpdGVzLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvdnVsbmVyYWJpbGl0aWVzL2RldGVjdC12dWxuZXJhYmxlLWZsYWdzLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvdnVsbmVyYWJpbGl0aWVzL3Z1bG5lcmFiaWxpdHktYW5hbHlzaXMudHMiLCAibm9kZV9tb2R1bGVzL0BzaW1wbGUtZ2l0L2FyZ3YtcGFyc2VyL3NyYy9hcmdzL3BhcnNlLWFyZ3YudHMiLCAibm9kZV9tb2R1bGVzL0BzaW1wbGUtZ2l0L2FyZ3YtcGFyc2VyL3NyYy9lbnYvcGFyc2UtZW52LnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvdnVsbmVyYWJpbGl0aWVzL3Z1bG5lcmFiaWxpdHktY2hlY2sudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9lcnJvcnMvZ2l0LWVycm9yLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvZXJyb3JzL2dpdC1jb25zdHJ1Y3QtZXJyb3IudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9lcnJvcnMvZ2l0LXBsdWdpbi1lcnJvci50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL2Vycm9ycy9naXQtcmVzcG9uc2UtZXJyb3IudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9lcnJvcnMvdGFzay1jb25maWd1cmF0aW9uLWVycm9yLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdXRpbHMvdXRpbC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3V0aWxzL2FyZ3VtZW50LWZpbHRlcnMudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi91dGlscy9leGl0LWNvZGVzLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdXRpbHMvZ2l0LW91dHB1dC1zdHJlYW1zLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdXRpbHMvbGluZS1wYXJzZXIudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi91dGlscy9zaW1wbGUtZ2l0LW9wdGlvbnMudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi91dGlscy90YXNrLW9wdGlvbnMudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi91dGlscy90YXNrLXBhcnNlci50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2NoZWNrLWlzLXJlcG8udHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wYXJzZXJzL3BhcnNlLWNsZWFuLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvdGFzay50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2NsZWFuLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcmVzcG9uc2VzL0NvbmZpZ0xpc3QudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9jb25maWcudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9kaWZmLW5hbWUtc3RhdHVzLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvZ3JlcC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL3Jlc2V0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvZ2l0LWxvZ2dlci50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3J1bm5lcnMvdGFza3MtcGVuZGluZy1xdWV1ZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3J1bm5lcnMvZ2l0LWV4ZWN1dG9yLWNoYWluLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcnVubmVycy9naXQtZXhlY3V0b3IudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrLWNhbGxiYWNrLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvY2hhbmdlLXdvcmtpbmctZGlyZWN0b3J5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvY2hlY2tvdXQudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9jbG9uZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BhcnNlcnMvcGFyc2UtY29tbWl0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvY29tbWl0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvY291bnQtb2JqZWN0cy50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2ZpcnN0LWNvbW1pdC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2hhc2gtb2JqZWN0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcmVzcG9uc2VzL0luaXRTdW1tYXJ5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvaW5pdC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2ludGVycHJldC10cmFpbGVycy50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL2FyZ3MvbG9nLWZvcm1hdC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9EaWZmU3VtbWFyeS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BhcnNlcnMvcGFyc2UtZGlmZi1zdW1tYXJ5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGFyc2Vycy9wYXJzZS1saXN0LWxvZy1zdW1tYXJ5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvZGlmZi50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2xvZy50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9NZXJnZVN1bW1hcnkudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9yZXNwb25zZXMvUHVsbFN1bW1hcnkudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wYXJzZXJzL3BhcnNlLXJlbW90ZS1vYmplY3RzLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGFyc2Vycy9wYXJzZS1yZW1vdGUtbWVzc2FnZXMudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wYXJzZXJzL3BhcnNlLXB1bGwudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wYXJzZXJzL3BhcnNlLW1lcmdlLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvbWVyZ2UudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wYXJzZXJzL3BhcnNlLXB1c2gudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9wdXNoLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3Mvc2hvdy50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9GaWxlU3RhdHVzU3VtbWFyeS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9TdGF0dXNTdW1tYXJ5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3Mvc3RhdHVzLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvdmVyc2lvbi50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3NpbXBsZS1naXQtYXBpLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcnVubmVycy9zY2hlZHVsZXIudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9hcHBseS1wYXRjaC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9CcmFuY2hTdW1tYXJ5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGFyc2Vycy9wYXJzZS1icmFuY2gudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9yZXNwb25zZXMvQnJhbmNoRGVsZXRlU3VtbWFyeS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BhcnNlcnMvcGFyc2UtYnJhbmNoLWRlbGV0ZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2JyYW5jaC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2NoZWNrLWlnbm9yZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BhcnNlcnMvcGFyc2UtZmV0Y2gudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9mZXRjaC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BhcnNlcnMvcGFyc2UtbW92ZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL21vdmUudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9wdWxsLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcmVzcG9uc2VzL0dldFJlbW90ZVN1bW1hcnkudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9yZW1vdGUudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9zdGFzaC1saXN0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3Mvc3ViLW1vZHVsZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9UYWdMaXN0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvdGFnLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9naXQubWpzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9hYm9ydC1wbHVnaW4udHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wbHVnaW5zL2FsbG93LWVudmlyb25tZW50LnBsdWdpbi50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BsdWdpbnMvYmxvY2stdW5zYWZlLW9wZXJhdGlvbnMtcGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9jb21tYW5kLWNvbmZpZy1wcmVmaXhpbmctcGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9jb21wbGV0aW9uLWRldGVjdGlvbi5wbHVnaW4udHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wbHVnaW5zL2N1c3RvbS1iaW5hcnkucGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvZXJyb3JzL2dpdC1jb25maWd1cmF0aW9uLWVycm9yLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9lcnJvci1kZXRlY3Rpb24ucGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9pbnB1dC5wbHVnaW4udHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wbHVnaW5zL3BsdWdpbi1zdG9yZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BsdWdpbnMvcHJvZ3Jlc3MtbW9uaXRvci1wbHVnaW4udHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wbHVnaW5zL3NwYXduLW9wdGlvbnMtcGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9zdWZmaXgtcGF0aHMucGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy90aW1lb3V0LXBsdWdpbi50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL2dpdC1mYWN0b3J5LnRzIiwgInNyYy9zeW5jLnRzIiwgInNyYy9kb3dubG9hZC50cyIsICJzcmMvdXBsb2FkLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIEhlbHBlcnMuXG4gKi9cblxudmFyIHMgPSAxMDAwO1xudmFyIG0gPSBzICogNjA7XG52YXIgaCA9IG0gKiA2MDtcbnZhciBkID0gaCAqIDI0O1xudmFyIHcgPSBkICogNztcbnZhciB5ID0gZCAqIDM2NS4yNTtcblxuLyoqXG4gKiBQYXJzZSBvciBmb3JtYXQgdGhlIGdpdmVuIGB2YWxgLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogIC0gYGxvbmdgIHZlcmJvc2UgZm9ybWF0dGluZyBbZmFsc2VdXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEB0aHJvd3Mge0Vycm9yfSB0aHJvdyBhbiBlcnJvciBpZiB2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIG51bWJlclxuICogQHJldHVybiB7U3RyaW5nfE51bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWw7XG4gIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBwYXJzZSh2YWwpO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmIGlzRmluaXRlKHZhbCkpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb25nID8gZm10TG9uZyh2YWwpIDogZm10U2hvcnQodmFsKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ3ZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgdmFsaWQgbnVtYmVyLiB2YWw9JyArXG4gICAgICBKU09OLnN0cmluZ2lmeSh2YWwpXG4gICk7XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBgc3RyYCBhbmQgcmV0dXJuIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZShzdHIpIHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChzdHIubGVuZ3RoID4gMTAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBtYXRjaCA9IC9eKC0/KD86XFxkKyk/XFwuP1xcZCspICoobWlsbGlzZWNvbmRzP3xtc2Vjcz98bXN8c2Vjb25kcz98c2Vjcz98c3xtaW51dGVzP3xtaW5zP3xtfGhvdXJzP3xocnM/fGh8ZGF5cz98ZHx3ZWVrcz98d3x5ZWFycz98eXJzP3x5KT8kL2kuZXhlYyhcbiAgICBzdHJcbiAgKTtcbiAgaWYgKCFtYXRjaCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbiA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuICB2YXIgdHlwZSA9IChtYXRjaFsyXSB8fCAnbXMnKS50b0xvd2VyQ2FzZSgpO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgY2FzZSAneWVhcic6XG4gICAgY2FzZSAneXJzJzpcbiAgICBjYXNlICd5cic6XG4gICAgY2FzZSAneSc6XG4gICAgICByZXR1cm4gbiAqIHk7XG4gICAgY2FzZSAnd2Vla3MnOlxuICAgIGNhc2UgJ3dlZWsnOlxuICAgIGNhc2UgJ3cnOlxuICAgICAgcmV0dXJuIG4gKiB3O1xuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZCc6XG4gICAgICByZXR1cm4gbiAqIGQ7XG4gICAgY2FzZSAnaG91cnMnOlxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hycyc6XG4gICAgY2FzZSAnaHInOlxuICAgIGNhc2UgJ2gnOlxuICAgICAgcmV0dXJuIG4gKiBoO1xuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgY2FzZSAnbWlucyc6XG4gICAgY2FzZSAnbWluJzpcbiAgICBjYXNlICdtJzpcbiAgICAgIHJldHVybiBuICogbTtcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICBjYXNlICdzZWNvbmQnOlxuICAgIGNhc2UgJ3NlY3MnOlxuICAgIGNhc2UgJ3NlYyc6XG4gICAgY2FzZSAncyc6XG4gICAgICByZXR1cm4gbiAqIHM7XG4gICAgY2FzZSAnbWlsbGlzZWNvbmRzJzpcbiAgICBjYXNlICdtaWxsaXNlY29uZCc6XG4gICAgY2FzZSAnbXNlY3MnOlxuICAgIGNhc2UgJ21zZWMnOlxuICAgIGNhc2UgJ21zJzpcbiAgICAgIHJldHVybiBuO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbi8qKlxuICogU2hvcnQgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10U2hvcnQobXMpIHtcbiAgdmFyIG1zQWJzID0gTWF0aC5hYnMobXMpO1xuICBpZiAobXNBYnMgPj0gZCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gZCkgKyAnZCc7XG4gIH1cbiAgaWYgKG1zQWJzID49IGgpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGgpICsgJ2gnO1xuICB9XG4gIGlmIChtc0FicyA+PSBtKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBtKSArICdtJztcbiAgfVxuICBpZiAobXNBYnMgPj0gcykge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gcykgKyAncyc7XG4gIH1cbiAgcmV0dXJuIG1zICsgJ21zJztcbn1cblxuLyoqXG4gKiBMb25nIGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdExvbmcobXMpIHtcbiAgdmFyIG1zQWJzID0gTWF0aC5hYnMobXMpO1xuICBpZiAobXNBYnMgPj0gZCkge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBkLCAnZGF5Jyk7XG4gIH1cbiAgaWYgKG1zQWJzID49IGgpIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgaCwgJ2hvdXInKTtcbiAgfVxuICBpZiAobXNBYnMgPj0gbSkge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBtLCAnbWludXRlJyk7XG4gIH1cbiAgaWYgKG1zQWJzID49IHMpIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgcywgJ3NlY29uZCcpO1xuICB9XG4gIHJldHVybiBtcyArICcgbXMnO1xufVxuXG4vKipcbiAqIFBsdXJhbGl6YXRpb24gaGVscGVyLlxuICovXG5cbmZ1bmN0aW9uIHBsdXJhbChtcywgbXNBYnMsIG4sIG5hbWUpIHtcbiAgdmFyIGlzUGx1cmFsID0gbXNBYnMgPj0gbiAqIDEuNTtcbiAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBuKSArICcgJyArIG5hbWUgKyAoaXNQbHVyYWwgPyAncycgOiAnJyk7XG59XG4iLCAiXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNvbW1vbiBsb2dpYyBmb3IgYm90aCB0aGUgTm9kZS5qcyBhbmQgd2ViIGJyb3dzZXJcbiAqIGltcGxlbWVudGF0aW9ucyBvZiBgZGVidWcoKWAuXG4gKi9cblxuZnVuY3Rpb24gc2V0dXAoZW52KSB7XG5cdGNyZWF0ZURlYnVnLmRlYnVnID0gY3JlYXRlRGVidWc7XG5cdGNyZWF0ZURlYnVnLmRlZmF1bHQgPSBjcmVhdGVEZWJ1Zztcblx0Y3JlYXRlRGVidWcuY29lcmNlID0gY29lcmNlO1xuXHRjcmVhdGVEZWJ1Zy5kaXNhYmxlID0gZGlzYWJsZTtcblx0Y3JlYXRlRGVidWcuZW5hYmxlID0gZW5hYmxlO1xuXHRjcmVhdGVEZWJ1Zy5lbmFibGVkID0gZW5hYmxlZDtcblx0Y3JlYXRlRGVidWcuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXHRjcmVhdGVEZWJ1Zy5kZXN0cm95ID0gZGVzdHJveTtcblxuXHRPYmplY3Qua2V5cyhlbnYpLmZvckVhY2goa2V5ID0+IHtcblx0XHRjcmVhdGVEZWJ1Z1trZXldID0gZW52W2tleV07XG5cdH0pO1xuXG5cdC8qKlxuXHQqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuXHQqL1xuXG5cdGNyZWF0ZURlYnVnLm5hbWVzID0gW107XG5cdGNyZWF0ZURlYnVnLnNraXBzID0gW107XG5cblx0LyoqXG5cdCogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuXHQqXG5cdCogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXIgb3IgdXBwZXItY2FzZSBsZXR0ZXIsIGkuZS4gXCJuXCIgYW5kIFwiTlwiLlxuXHQqL1xuXHRjcmVhdGVEZWJ1Zy5mb3JtYXR0ZXJzID0ge307XG5cblx0LyoqXG5cdCogU2VsZWN0cyBhIGNvbG9yIGZvciBhIGRlYnVnIG5hbWVzcGFjZVxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2UgVGhlIG5hbWVzcGFjZSBzdHJpbmcgZm9yIHRoZSBkZWJ1ZyBpbnN0YW5jZSB0byBiZSBjb2xvcmVkXG5cdCogQHJldHVybiB7TnVtYmVyfFN0cmluZ30gQW4gQU5TSSBjb2xvciBjb2RlIGZvciB0aGUgZ2l2ZW4gbmFtZXNwYWNlXG5cdCogQGFwaSBwcml2YXRlXG5cdCovXG5cdGZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuXHRcdGxldCBoYXNoID0gMDtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXNwYWNlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcblx0XHRcdGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNyZWF0ZURlYnVnLmNvbG9yc1tNYXRoLmFicyhoYXNoKSAlIGNyZWF0ZURlYnVnLmNvbG9ycy5sZW5ndGhdO1xuXHR9XG5cdGNyZWF0ZURlYnVnLnNlbGVjdENvbG9yID0gc2VsZWN0Q29sb3I7XG5cblx0LyoqXG5cdCogQ3JlYXRlIGEgZGVidWdnZXIgd2l0aCB0aGUgZ2l2ZW4gYG5hbWVzcGFjZWAuXG5cdCpcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG5cdCogQHJldHVybiB7RnVuY3Rpb259XG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cdFx0bGV0IHByZXZUaW1lO1xuXHRcdGxldCBlbmFibGVPdmVycmlkZSA9IG51bGw7XG5cdFx0bGV0IG5hbWVzcGFjZXNDYWNoZTtcblx0XHRsZXQgZW5hYmxlZENhY2hlO1xuXG5cdFx0ZnVuY3Rpb24gZGVidWcoLi4uYXJncykge1xuXHRcdFx0Ly8gRGlzYWJsZWQ/XG5cdFx0XHRpZiAoIWRlYnVnLmVuYWJsZWQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBzZWxmID0gZGVidWc7XG5cblx0XHRcdC8vIFNldCBgZGlmZmAgdGltZXN0YW1wXG5cdFx0XHRjb25zdCBjdXJyID0gTnVtYmVyKG5ldyBEYXRlKCkpO1xuXHRcdFx0Y29uc3QgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuXHRcdFx0c2VsZi5kaWZmID0gbXM7XG5cdFx0XHRzZWxmLnByZXYgPSBwcmV2VGltZTtcblx0XHRcdHNlbGYuY3VyciA9IGN1cnI7XG5cdFx0XHRwcmV2VGltZSA9IGN1cnI7XG5cblx0XHRcdGFyZ3NbMF0gPSBjcmVhdGVEZWJ1Zy5jb2VyY2UoYXJnc1swXSk7XG5cblx0XHRcdGlmICh0eXBlb2YgYXJnc1swXSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdFx0Ly8gQW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJU9cblx0XHRcdFx0YXJncy51bnNoaWZ0KCclTycpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBcHBseSBhbnkgYGZvcm1hdHRlcnNgIHRyYW5zZm9ybWF0aW9uc1xuXHRcdFx0bGV0IGluZGV4ID0gMDtcblx0XHRcdGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCAobWF0Y2gsIGZvcm1hdCkgPT4ge1xuXHRcdFx0XHQvLyBJZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG5cdFx0XHRcdGlmIChtYXRjaCA9PT0gJyUlJykge1xuXHRcdFx0XHRcdHJldHVybiAnJSc7XG5cdFx0XHRcdH1cblx0XHRcdFx0aW5kZXgrKztcblx0XHRcdFx0Y29uc3QgZm9ybWF0dGVyID0gY3JlYXRlRGVidWcuZm9ybWF0dGVyc1tmb3JtYXRdO1xuXHRcdFx0XHRpZiAodHlwZW9mIGZvcm1hdHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdGNvbnN0IHZhbCA9IGFyZ3NbaW5kZXhdO1xuXHRcdFx0XHRcdG1hdGNoID0gZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsKTtcblxuXHRcdFx0XHRcdC8vIE5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcblx0XHRcdFx0XHRhcmdzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRcdFx0aW5kZXgtLTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gbWF0Y2g7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gQXBwbHkgZW52LXNwZWNpZmljIGZvcm1hdHRpbmcgKGNvbG9ycywgZXRjLilcblx0XHRcdGNyZWF0ZURlYnVnLmZvcm1hdEFyZ3MuY2FsbChzZWxmLCBhcmdzKTtcblxuXHRcdFx0Y29uc3QgbG9nRm4gPSBzZWxmLmxvZyB8fCBjcmVhdGVEZWJ1Zy5sb2c7XG5cdFx0XHRsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcblx0XHR9XG5cblx0XHRkZWJ1Zy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG5cdFx0ZGVidWcudXNlQ29sb3JzID0gY3JlYXRlRGVidWcudXNlQ29sb3JzKCk7XG5cdFx0ZGVidWcuY29sb3IgPSBjcmVhdGVEZWJ1Zy5zZWxlY3RDb2xvcihuYW1lc3BhY2UpO1xuXHRcdGRlYnVnLmV4dGVuZCA9IGV4dGVuZDtcblx0XHRkZWJ1Zy5kZXN0cm95ID0gY3JlYXRlRGVidWcuZGVzdHJveTsgLy8gWFhYIFRlbXBvcmFyeS4gV2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UuXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVidWcsICdlbmFibGVkJywge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHRnZXQ6ICgpID0+IHtcblx0XHRcdFx0aWYgKGVuYWJsZU92ZXJyaWRlICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVuYWJsZU92ZXJyaWRlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChuYW1lc3BhY2VzQ2FjaGUgIT09IGNyZWF0ZURlYnVnLm5hbWVzcGFjZXMpIHtcblx0XHRcdFx0XHRuYW1lc3BhY2VzQ2FjaGUgPSBjcmVhdGVEZWJ1Zy5uYW1lc3BhY2VzO1xuXHRcdFx0XHRcdGVuYWJsZWRDYWNoZSA9IGNyZWF0ZURlYnVnLmVuYWJsZWQobmFtZXNwYWNlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBlbmFibGVkQ2FjaGU7XG5cdFx0XHR9LFxuXHRcdFx0c2V0OiB2ID0+IHtcblx0XHRcdFx0ZW5hYmxlT3ZlcnJpZGUgPSB2O1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gRW52LXNwZWNpZmljIGluaXRpYWxpemF0aW9uIGxvZ2ljIGZvciBkZWJ1ZyBpbnN0YW5jZXNcblx0XHRpZiAodHlwZW9mIGNyZWF0ZURlYnVnLmluaXQgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdGNyZWF0ZURlYnVnLmluaXQoZGVidWcpO1xuXHRcdH1cblxuXHRcdHJldHVybiBkZWJ1Zztcblx0fVxuXG5cdGZ1bmN0aW9uIGV4dGVuZChuYW1lc3BhY2UsIGRlbGltaXRlcikge1xuXHRcdGNvbnN0IG5ld0RlYnVnID0gY3JlYXRlRGVidWcodGhpcy5uYW1lc3BhY2UgKyAodHlwZW9mIGRlbGltaXRlciA9PT0gJ3VuZGVmaW5lZCcgPyAnOicgOiBkZWxpbWl0ZXIpICsgbmFtZXNwYWNlKTtcblx0XHRuZXdEZWJ1Zy5sb2cgPSB0aGlzLmxvZztcblx0XHRyZXR1cm4gbmV3RGVidWc7XG5cdH1cblxuXHQvKipcblx0KiBFbmFibGVzIGEgZGVidWcgbW9kZSBieSBuYW1lc3BhY2VzLiBUaGlzIGNhbiBpbmNsdWRlIG1vZGVzXG5cdCogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cblx0KlxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcblx0XHRjcmVhdGVEZWJ1Zy5zYXZlKG5hbWVzcGFjZXMpO1xuXHRcdGNyZWF0ZURlYnVnLm5hbWVzcGFjZXMgPSBuYW1lc3BhY2VzO1xuXG5cdFx0Y3JlYXRlRGVidWcubmFtZXMgPSBbXTtcblx0XHRjcmVhdGVEZWJ1Zy5za2lwcyA9IFtdO1xuXG5cdFx0Y29uc3Qgc3BsaXQgPSAodHlwZW9mIG5hbWVzcGFjZXMgPT09ICdzdHJpbmcnID8gbmFtZXNwYWNlcyA6ICcnKVxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL1xccysvZywgJywnKVxuXHRcdFx0LnNwbGl0KCcsJylcblx0XHRcdC5maWx0ZXIoQm9vbGVhbik7XG5cblx0XHRmb3IgKGNvbnN0IG5zIG9mIHNwbGl0KSB7XG5cdFx0XHRpZiAobnNbMF0gPT09ICctJykge1xuXHRcdFx0XHRjcmVhdGVEZWJ1Zy5za2lwcy5wdXNoKG5zLnNsaWNlKDEpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNyZWF0ZURlYnVnLm5hbWVzLnB1c2gobnMpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVja3MgaWYgdGhlIGdpdmVuIHN0cmluZyBtYXRjaGVzIGEgbmFtZXNwYWNlIHRlbXBsYXRlLCBob25vcmluZ1xuXHQgKiBhc3Rlcmlza3MgYXMgd2lsZGNhcmRzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc2VhcmNoXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0ZW1wbGF0ZVxuXHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHQgKi9cblx0ZnVuY3Rpb24gbWF0Y2hlc1RlbXBsYXRlKHNlYXJjaCwgdGVtcGxhdGUpIHtcblx0XHRsZXQgc2VhcmNoSW5kZXggPSAwO1xuXHRcdGxldCB0ZW1wbGF0ZUluZGV4ID0gMDtcblx0XHRsZXQgc3RhckluZGV4ID0gLTE7XG5cdFx0bGV0IG1hdGNoSW5kZXggPSAwO1xuXG5cdFx0d2hpbGUgKHNlYXJjaEluZGV4IDwgc2VhcmNoLmxlbmd0aCkge1xuXHRcdFx0aWYgKHRlbXBsYXRlSW5kZXggPCB0ZW1wbGF0ZS5sZW5ndGggJiYgKHRlbXBsYXRlW3RlbXBsYXRlSW5kZXhdID09PSBzZWFyY2hbc2VhcmNoSW5kZXhdIHx8IHRlbXBsYXRlW3RlbXBsYXRlSW5kZXhdID09PSAnKicpKSB7XG5cdFx0XHRcdC8vIE1hdGNoIGNoYXJhY3RlciBvciBwcm9jZWVkIHdpdGggd2lsZGNhcmRcblx0XHRcdFx0aWYgKHRlbXBsYXRlW3RlbXBsYXRlSW5kZXhdID09PSAnKicpIHtcblx0XHRcdFx0XHRzdGFySW5kZXggPSB0ZW1wbGF0ZUluZGV4O1xuXHRcdFx0XHRcdG1hdGNoSW5kZXggPSBzZWFyY2hJbmRleDtcblx0XHRcdFx0XHR0ZW1wbGF0ZUluZGV4Kys7IC8vIFNraXAgdGhlICcqJ1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNlYXJjaEluZGV4Kys7XG5cdFx0XHRcdFx0dGVtcGxhdGVJbmRleCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHN0YXJJbmRleCAhPT0gLTEpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZWdhdGVkLWNvbmRpdGlvblxuXHRcdFx0XHQvLyBCYWNrdHJhY2sgdG8gdGhlIGxhc3QgJyonIGFuZCB0cnkgdG8gbWF0Y2ggbW9yZSBjaGFyYWN0ZXJzXG5cdFx0XHRcdHRlbXBsYXRlSW5kZXggPSBzdGFySW5kZXggKyAxO1xuXHRcdFx0XHRtYXRjaEluZGV4Kys7XG5cdFx0XHRcdHNlYXJjaEluZGV4ID0gbWF0Y2hJbmRleDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTsgLy8gTm8gbWF0Y2hcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBIYW5kbGUgdHJhaWxpbmcgJyonIGluIHRlbXBsYXRlXG5cdFx0d2hpbGUgKHRlbXBsYXRlSW5kZXggPCB0ZW1wbGF0ZS5sZW5ndGggJiYgdGVtcGxhdGVbdGVtcGxhdGVJbmRleF0gPT09ICcqJykge1xuXHRcdFx0dGVtcGxhdGVJbmRleCsrO1xuXHRcdH1cblxuXHRcdHJldHVybiB0ZW1wbGF0ZUluZGV4ID09PSB0ZW1wbGF0ZS5sZW5ndGg7XG5cdH1cblxuXHQvKipcblx0KiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cblx0KlxuXHQqIEByZXR1cm4ge1N0cmluZ30gbmFtZXNwYWNlc1xuXHQqIEBhcGkgcHVibGljXG5cdCovXG5cdGZ1bmN0aW9uIGRpc2FibGUoKSB7XG5cdFx0Y29uc3QgbmFtZXNwYWNlcyA9IFtcblx0XHRcdC4uLmNyZWF0ZURlYnVnLm5hbWVzLFxuXHRcdFx0Li4uY3JlYXRlRGVidWcuc2tpcHMubWFwKG5hbWVzcGFjZSA9PiAnLScgKyBuYW1lc3BhY2UpXG5cdFx0XS5qb2luKCcsJyk7XG5cdFx0Y3JlYXRlRGVidWcuZW5hYmxlKCcnKTtcblx0XHRyZXR1cm4gbmFtZXNwYWNlcztcblx0fVxuXG5cdC8qKlxuXHQqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbW9kZSBuYW1lIGlzIGVuYWJsZWQsIGZhbHNlIG90aGVyd2lzZS5cblx0KlxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG5cdCogQHJldHVybiB7Qm9vbGVhbn1cblx0KiBAYXBpIHB1YmxpY1xuXHQqL1xuXHRmdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcblx0XHRmb3IgKGNvbnN0IHNraXAgb2YgY3JlYXRlRGVidWcuc2tpcHMpIHtcblx0XHRcdGlmIChtYXRjaGVzVGVtcGxhdGUobmFtZSwgc2tpcCkpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAoY29uc3QgbnMgb2YgY3JlYXRlRGVidWcubmFtZXMpIHtcblx0XHRcdGlmIChtYXRjaGVzVGVtcGxhdGUobmFtZSwgbnMpKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQqIENvZXJjZSBgdmFsYC5cblx0KlxuXHQqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuXHQqIEByZXR1cm4ge01peGVkfVxuXHQqIEBhcGkgcHJpdmF0ZVxuXHQqL1xuXHRmdW5jdGlvbiBjb2VyY2UodmFsKSB7XG5cdFx0aWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0XHRyZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsO1xuXHR9XG5cblx0LyoqXG5cdCogWFhYIERPIE5PVCBVU0UuIFRoaXMgaXMgYSB0ZW1wb3Jhcnkgc3R1YiBmdW5jdGlvbi5cblx0KiBYWFggSXQgV0lMTCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UuXG5cdCovXG5cdGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG5cdFx0Y29uc29sZS53YXJuKCdJbnN0YW5jZSBtZXRob2QgYGRlYnVnLmRlc3Ryb3koKWAgaXMgZGVwcmVjYXRlZCBhbmQgbm8gbG9uZ2VyIGRvZXMgYW55dGhpbmcuIEl0IHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uIG9mIGBkZWJ1Z2AuJyk7XG5cdH1cblxuXHRjcmVhdGVEZWJ1Zy5lbmFibGUoY3JlYXRlRGVidWcubG9hZCgpKTtcblxuXHRyZXR1cm4gY3JlYXRlRGVidWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0dXA7XG4iLCAiLyogZXNsaW50LWVudiBicm93c2VyICovXG5cbi8qKlxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuZXhwb3J0cy5zdG9yYWdlID0gbG9jYWxzdG9yYWdlKCk7XG5leHBvcnRzLmRlc3Ryb3kgPSAoKCkgPT4ge1xuXHRsZXQgd2FybmVkID0gZmFsc2U7XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRpZiAoIXdhcm5lZCkge1xuXHRcdFx0d2FybmVkID0gdHJ1ZTtcblx0XHRcdGNvbnNvbGUud2FybignSW5zdGFuY2UgbWV0aG9kIGBkZWJ1Zy5kZXN0cm95KClgIGlzIGRlcHJlY2F0ZWQgYW5kIG5vIGxvbmdlciBkb2VzIGFueXRoaW5nLiBJdCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbiBvZiBgZGVidWdgLicpO1xuXHRcdH1cblx0fTtcbn0pKCk7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gW1xuXHQnIzAwMDBDQycsXG5cdCcjMDAwMEZGJyxcblx0JyMwMDMzQ0MnLFxuXHQnIzAwMzNGRicsXG5cdCcjMDA2NkNDJyxcblx0JyMwMDY2RkYnLFxuXHQnIzAwOTlDQycsXG5cdCcjMDA5OUZGJyxcblx0JyMwMENDMDAnLFxuXHQnIzAwQ0MzMycsXG5cdCcjMDBDQzY2Jyxcblx0JyMwMENDOTknLFxuXHQnIzAwQ0NDQycsXG5cdCcjMDBDQ0ZGJyxcblx0JyMzMzAwQ0MnLFxuXHQnIzMzMDBGRicsXG5cdCcjMzMzM0NDJyxcblx0JyMzMzMzRkYnLFxuXHQnIzMzNjZDQycsXG5cdCcjMzM2NkZGJyxcblx0JyMzMzk5Q0MnLFxuXHQnIzMzOTlGRicsXG5cdCcjMzNDQzAwJyxcblx0JyMzM0NDMzMnLFxuXHQnIzMzQ0M2NicsXG5cdCcjMzNDQzk5Jyxcblx0JyMzM0NDQ0MnLFxuXHQnIzMzQ0NGRicsXG5cdCcjNjYwMENDJyxcblx0JyM2NjAwRkYnLFxuXHQnIzY2MzNDQycsXG5cdCcjNjYzM0ZGJyxcblx0JyM2NkNDMDAnLFxuXHQnIzY2Q0MzMycsXG5cdCcjOTkwMENDJyxcblx0JyM5OTAwRkYnLFxuXHQnIzk5MzNDQycsXG5cdCcjOTkzM0ZGJyxcblx0JyM5OUNDMDAnLFxuXHQnIzk5Q0MzMycsXG5cdCcjQ0MwMDAwJyxcblx0JyNDQzAwMzMnLFxuXHQnI0NDMDA2NicsXG5cdCcjQ0MwMDk5Jyxcblx0JyNDQzAwQ0MnLFxuXHQnI0NDMDBGRicsXG5cdCcjQ0MzMzAwJyxcblx0JyNDQzMzMzMnLFxuXHQnI0NDMzM2NicsXG5cdCcjQ0MzMzk5Jyxcblx0JyNDQzMzQ0MnLFxuXHQnI0NDMzNGRicsXG5cdCcjQ0M2NjAwJyxcblx0JyNDQzY2MzMnLFxuXHQnI0NDOTkwMCcsXG5cdCcjQ0M5OTMzJyxcblx0JyNDQ0NDMDAnLFxuXHQnI0NDQ0MzMycsXG5cdCcjRkYwMDAwJyxcblx0JyNGRjAwMzMnLFxuXHQnI0ZGMDA2NicsXG5cdCcjRkYwMDk5Jyxcblx0JyNGRjAwQ0MnLFxuXHQnI0ZGMDBGRicsXG5cdCcjRkYzMzAwJyxcblx0JyNGRjMzMzMnLFxuXHQnI0ZGMzM2NicsXG5cdCcjRkYzMzk5Jyxcblx0JyNGRjMzQ0MnLFxuXHQnI0ZGMzNGRicsXG5cdCcjRkY2NjAwJyxcblx0JyNGRjY2MzMnLFxuXHQnI0ZGOTkwMCcsXG5cdCcjRkY5OTMzJyxcblx0JyNGRkNDMDAnLFxuXHQnI0ZGQ0MzMydcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbmZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcblx0Ly8gTkI6IEluIGFuIEVsZWN0cm9uIHByZWxvYWQgc2NyaXB0LCBkb2N1bWVudCB3aWxsIGJlIGRlZmluZWQgYnV0IG5vdCBmdWxseVxuXHQvLyBpbml0aWFsaXplZC4gU2luY2Ugd2Uga25vdyB3ZSdyZSBpbiBDaHJvbWUsIHdlJ2xsIGp1c3QgZGV0ZWN0IHRoaXMgY2FzZVxuXHQvLyBleHBsaWNpdGx5XG5cdGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucHJvY2VzcyAmJiAod2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJyB8fCB3aW5kb3cucHJvY2Vzcy5fX253anMpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvLyBJbnRlcm5ldCBFeHBsb3JlciBhbmQgRWRnZSBkbyBub3Qgc3VwcG9ydCBjb2xvcnMuXG5cdGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvKGVkZ2V8dHJpZGVudClcXC8oXFxkKykvKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGxldCBtO1xuXG5cdC8vIElzIHdlYmtpdD8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY0NTk2MDYvMzc2NzczXG5cdC8vIGRvY3VtZW50IGlzIHVuZGVmaW5lZCBpbiByZWFjdC1uYXRpdmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvcHVsbC8xNjMyXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXR1cm4tYXNzaWduXG5cdHJldHVybiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5XZWJraXRBcHBlYXJhbmNlKSB8fFxuXHRcdC8vIElzIGZpcmVidWc/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM5ODEyMC8zNzY3NzNcblx0XHQodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNvbnNvbGUgJiYgKHdpbmRvdy5jb25zb2xlLmZpcmVidWcgfHwgKHdpbmRvdy5jb25zb2xlLmV4Y2VwdGlvbiAmJiB3aW5kb3cuY29uc29sZS50YWJsZSkpKSB8fFxuXHRcdC8vIElzIGZpcmVmb3ggPj0gdjMxP1xuXHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuXHRcdCh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIChtID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykpICYmIHBhcnNlSW50KG1bMV0sIDEwKSA+PSAzMSkgfHxcblx0XHQvLyBEb3VibGUgY2hlY2sgd2Via2l0IGluIHVzZXJBZ2VudCBqdXN0IGluIGNhc2Ugd2UgYXJlIGluIGEgd29ya2VyXG5cdFx0KHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9hcHBsZXdlYmtpdFxcLyhcXGQrKS8pKTtcbn1cblxuLyoqXG4gKiBDb2xvcml6ZSBsb2cgYXJndW1lbnRzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcblx0YXJnc1swXSA9ICh0aGlzLnVzZUNvbG9ycyA/ICclYycgOiAnJykgK1xuXHRcdHRoaXMubmFtZXNwYWNlICtcblx0XHQodGhpcy51c2VDb2xvcnMgPyAnICVjJyA6ICcgJykgK1xuXHRcdGFyZ3NbMF0gK1xuXHRcdCh0aGlzLnVzZUNvbG9ycyA/ICclYyAnIDogJyAnKSArXG5cdFx0JysnICsgbW9kdWxlLmV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtcblxuXHRpZiAoIXRoaXMudXNlQ29sb3JzKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG5cdGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpO1xuXG5cdC8vIFRoZSBmaW5hbCBcIiVjXCIgaXMgc29tZXdoYXQgdHJpY2t5LCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyXG5cdC8vIGFyZ3VtZW50cyBwYXNzZWQgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgJWMsIHNvIHdlIG5lZWQgdG9cblx0Ly8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBpbmRleCB0byBpbnNlcnQgdGhlIENTUyBpbnRvXG5cdGxldCBpbmRleCA9IDA7XG5cdGxldCBsYXN0QyA9IDA7XG5cdGFyZ3NbMF0ucmVwbGFjZSgvJVthLXpBLVolXS9nLCBtYXRjaCA9PiB7XG5cdFx0aWYgKG1hdGNoID09PSAnJSUnKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGluZGV4Kys7XG5cdFx0aWYgKG1hdGNoID09PSAnJWMnKSB7XG5cdFx0XHQvLyBXZSBvbmx5IGFyZSBpbnRlcmVzdGVkIGluIHRoZSAqbGFzdCogJWNcblx0XHRcdC8vICh0aGUgdXNlciBtYXkgaGF2ZSBwcm92aWRlZCB0aGVpciBvd24pXG5cdFx0XHRsYXN0QyA9IGluZGV4O1xuXHRcdH1cblx0fSk7XG5cblx0YXJncy5zcGxpY2UobGFzdEMsIDAsIGMpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYGNvbnNvbGUuZGVidWcoKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmRlYnVnYCBpcyBub3QgYSBcImZ1bmN0aW9uXCIuXG4gKiBJZiBgY29uc29sZS5kZWJ1Z2AgaXMgbm90IGF2YWlsYWJsZSwgZmFsbHMgYmFja1xuICogdG8gYGNvbnNvbGUubG9nYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnRzLmxvZyA9IGNvbnNvbGUuZGVidWcgfHwgY29uc29sZS5sb2cgfHwgKCgpID0+IHt9KTtcblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNhdmUobmFtZXNwYWNlcykge1xuXHR0cnkge1xuXHRcdGlmIChuYW1lc3BhY2VzKSB7XG5cdFx0XHRleHBvcnRzLnN0b3JhZ2Uuc2V0SXRlbSgnZGVidWcnLCBuYW1lc3BhY2VzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFN3YWxsb3dcblx0XHQvLyBYWFggKEBRaXgtKSBzaG91bGQgd2UgYmUgbG9nZ2luZyB0aGVzZT9cblx0fVxufVxuXG4vKipcbiAqIExvYWQgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gcmV0dXJucyB0aGUgcHJldmlvdXNseSBwZXJzaXN0ZWQgZGVidWcgbW9kZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsb2FkKCkge1xuXHRsZXQgcjtcblx0dHJ5IHtcblx0XHRyID0gZXhwb3J0cy5zdG9yYWdlLmdldEl0ZW0oJ2RlYnVnJykgfHwgZXhwb3J0cy5zdG9yYWdlLmdldEl0ZW0oJ0RFQlVHJykgO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFN3YWxsb3dcblx0XHQvLyBYWFggKEBRaXgtKSBzaG91bGQgd2UgYmUgbG9nZ2luZyB0aGVzZT9cblx0fVxuXG5cdC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcblx0aWYgKCFyICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAnZW52JyBpbiBwcm9jZXNzKSB7XG5cdFx0ciA9IHByb2Nlc3MuZW52LkRFQlVHO1xuXHR9XG5cblx0cmV0dXJuIHI7XG59XG5cbi8qKlxuICogTG9jYWxzdG9yYWdlIGF0dGVtcHRzIHRvIHJldHVybiB0aGUgbG9jYWxzdG9yYWdlLlxuICpcbiAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugc2FmYXJpIHRocm93c1xuICogd2hlbiBhIHVzZXIgZGlzYWJsZXMgY29va2llcy9sb2NhbHN0b3JhZ2VcbiAqIGFuZCB5b3UgYXR0ZW1wdCB0byBhY2Nlc3MgaXQuXG4gKlxuICogQHJldHVybiB7TG9jYWxTdG9yYWdlfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9jYWxzdG9yYWdlKCkge1xuXHR0cnkge1xuXHRcdC8vIFRWTUxLaXQgKEFwcGxlIFRWIEpTIFJ1bnRpbWUpIGRvZXMgbm90IGhhdmUgYSB3aW5kb3cgb2JqZWN0LCBqdXN0IGxvY2FsU3RvcmFnZSBpbiB0aGUgZ2xvYmFsIGNvbnRleHRcblx0XHQvLyBUaGUgQnJvd3NlciBhbHNvIGhhcyBsb2NhbFN0b3JhZ2UgaW4gdGhlIGdsb2JhbCBjb250ZXh0LlxuXHRcdHJldHVybiBsb2NhbFN0b3JhZ2U7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Ly8gU3dhbGxvd1xuXHRcdC8vIFhYWCAoQFFpeC0pIHNob3VsZCB3ZSBiZSBsb2dnaW5nIHRoZXNlP1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb21tb24nKShleHBvcnRzKTtcblxuY29uc3Qge2Zvcm1hdHRlcnN9ID0gbW9kdWxlLmV4cG9ydHM7XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmZvcm1hdHRlcnMuaiA9IGZ1bmN0aW9uICh2KSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdHJldHVybiAnW1VuZXhwZWN0ZWRKU09OUGFyc2VFcnJvcl06ICcgKyBlcnJvci5tZXNzYWdlO1xuXHR9XG59O1xuIiwgIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5jb25zdCB0dHkgPSByZXF1aXJlKCd0dHknKTtcbmNvbnN0IHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgTm9kZS5qcyBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKi9cblxuZXhwb3J0cy5pbml0ID0gaW5pdDtcbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLmRlc3Ryb3kgPSB1dGlsLmRlcHJlY2F0ZShcblx0KCkgPT4ge30sXG5cdCdJbnN0YW5jZSBtZXRob2QgYGRlYnVnLmRlc3Ryb3koKWAgaXMgZGVwcmVjYXRlZCBhbmQgbm8gbG9uZ2VyIGRvZXMgYW55dGhpbmcuIEl0IHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uIG9mIGBkZWJ1Z2AuJ1xuKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbNiwgMiwgMywgNCwgNSwgMV07XG5cbnRyeSB7XG5cdC8vIE9wdGlvbmFsIGRlcGVuZGVuY3kgKGFzIGluLCBkb2Vzbid0IG5lZWQgdG8gYmUgaW5zdGFsbGVkLCBOT1QgbGlrZSBvcHRpb25hbERlcGVuZGVuY2llcyBpbiBwYWNrYWdlLmpzb24pXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXNcblx0Y29uc3Qgc3VwcG9ydHNDb2xvciA9IHJlcXVpcmUoJ3N1cHBvcnRzLWNvbG9yJyk7XG5cblx0aWYgKHN1cHBvcnRzQ29sb3IgJiYgKHN1cHBvcnRzQ29sb3Iuc3RkZXJyIHx8IHN1cHBvcnRzQ29sb3IpLmxldmVsID49IDIpIHtcblx0XHRleHBvcnRzLmNvbG9ycyA9IFtcblx0XHRcdDIwLFxuXHRcdFx0MjEsXG5cdFx0XHQyNixcblx0XHRcdDI3LFxuXHRcdFx0MzIsXG5cdFx0XHQzMyxcblx0XHRcdDM4LFxuXHRcdFx0MzksXG5cdFx0XHQ0MCxcblx0XHRcdDQxLFxuXHRcdFx0NDIsXG5cdFx0XHQ0Myxcblx0XHRcdDQ0LFxuXHRcdFx0NDUsXG5cdFx0XHQ1Nixcblx0XHRcdDU3LFxuXHRcdFx0NjIsXG5cdFx0XHQ2Myxcblx0XHRcdDY4LFxuXHRcdFx0NjksXG5cdFx0XHQ3NCxcblx0XHRcdDc1LFxuXHRcdFx0NzYsXG5cdFx0XHQ3Nyxcblx0XHRcdDc4LFxuXHRcdFx0NzksXG5cdFx0XHQ4MCxcblx0XHRcdDgxLFxuXHRcdFx0OTIsXG5cdFx0XHQ5Myxcblx0XHRcdDk4LFxuXHRcdFx0OTksXG5cdFx0XHQxMTIsXG5cdFx0XHQxMTMsXG5cdFx0XHQxMjgsXG5cdFx0XHQxMjksXG5cdFx0XHQxMzQsXG5cdFx0XHQxMzUsXG5cdFx0XHQxNDgsXG5cdFx0XHQxNDksXG5cdFx0XHQxNjAsXG5cdFx0XHQxNjEsXG5cdFx0XHQxNjIsXG5cdFx0XHQxNjMsXG5cdFx0XHQxNjQsXG5cdFx0XHQxNjUsXG5cdFx0XHQxNjYsXG5cdFx0XHQxNjcsXG5cdFx0XHQxNjgsXG5cdFx0XHQxNjksXG5cdFx0XHQxNzAsXG5cdFx0XHQxNzEsXG5cdFx0XHQxNzIsXG5cdFx0XHQxNzMsXG5cdFx0XHQxNzgsXG5cdFx0XHQxNzksXG5cdFx0XHQxODQsXG5cdFx0XHQxODUsXG5cdFx0XHQxOTYsXG5cdFx0XHQxOTcsXG5cdFx0XHQxOTgsXG5cdFx0XHQxOTksXG5cdFx0XHQyMDAsXG5cdFx0XHQyMDEsXG5cdFx0XHQyMDIsXG5cdFx0XHQyMDMsXG5cdFx0XHQyMDQsXG5cdFx0XHQyMDUsXG5cdFx0XHQyMDYsXG5cdFx0XHQyMDcsXG5cdFx0XHQyMDgsXG5cdFx0XHQyMDksXG5cdFx0XHQyMTQsXG5cdFx0XHQyMTUsXG5cdFx0XHQyMjAsXG5cdFx0XHQyMjFcblx0XHRdO1xuXHR9XG59IGNhdGNoIChlcnJvcikge1xuXHQvLyBTd2FsbG93IC0gd2Ugb25seSBjYXJlIGlmIGBzdXBwb3J0cy1jb2xvcmAgaXMgYXZhaWxhYmxlOyBpdCBkb2Vzbid0IGhhdmUgdG8gYmUuXG59XG5cbi8qKlxuICogQnVpbGQgdXAgdGhlIGRlZmF1bHQgYGluc3BlY3RPcHRzYCBvYmplY3QgZnJvbSB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuICpcbiAqICAgJCBERUJVR19DT0xPUlM9bm8gREVCVUdfREVQVEg9MTAgREVCVUdfU0hPV19ISURERU49ZW5hYmxlZCBub2RlIHNjcmlwdC5qc1xuICovXG5cbmV4cG9ydHMuaW5zcGVjdE9wdHMgPSBPYmplY3Qua2V5cyhwcm9jZXNzLmVudikuZmlsdGVyKGtleSA9PiB7XG5cdHJldHVybiAvXmRlYnVnXy9pLnRlc3Qoa2V5KTtcbn0pLnJlZHVjZSgob2JqLCBrZXkpID0+IHtcblx0Ly8gQ2FtZWwtY2FzZVxuXHRjb25zdCBwcm9wID0ga2V5XG5cdFx0LnN1YnN0cmluZyg2KVxuXHRcdC50b0xvd2VyQ2FzZSgpXG5cdFx0LnJlcGxhY2UoL18oW2Etel0pL2csIChfLCBrKSA9PiB7XG5cdFx0XHRyZXR1cm4gay50b1VwcGVyQ2FzZSgpO1xuXHRcdH0pO1xuXG5cdC8vIENvZXJjZSBzdHJpbmcgdmFsdWUgaW50byBKUyB2YWx1ZVxuXHRsZXQgdmFsID0gcHJvY2Vzcy5lbnZba2V5XTtcblx0aWYgKC9eKHllc3xvbnx0cnVlfGVuYWJsZWQpJC9pLnRlc3QodmFsKSkge1xuXHRcdHZhbCA9IHRydWU7XG5cdH0gZWxzZSBpZiAoL14obm98b2ZmfGZhbHNlfGRpc2FibGVkKSQvaS50ZXN0KHZhbCkpIHtcblx0XHR2YWwgPSBmYWxzZTtcblx0fSBlbHNlIGlmICh2YWwgPT09ICdudWxsJykge1xuXHRcdHZhbCA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0dmFsID0gTnVtYmVyKHZhbCk7XG5cdH1cblxuXHRvYmpbcHJvcF0gPSB2YWw7XG5cdHJldHVybiBvYmo7XG59LCB7fSk7XG5cbi8qKlxuICogSXMgc3Rkb3V0IGEgVFRZPyBDb2xvcmVkIG91dHB1dCBpcyBlbmFibGVkIHdoZW4gYHRydWVgLlxuICovXG5cbmZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcblx0cmV0dXJuICdjb2xvcnMnIGluIGV4cG9ydHMuaW5zcGVjdE9wdHMgP1xuXHRcdEJvb2xlYW4oZXhwb3J0cy5pbnNwZWN0T3B0cy5jb2xvcnMpIDpcblx0XHR0dHkuaXNhdHR5KHByb2Nlc3Muc3RkZXJyLmZkKTtcbn1cblxuLyoqXG4gKiBBZGRzIEFOU0kgY29sb3IgZXNjYXBlIGNvZGVzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcblx0Y29uc3Qge25hbWVzcGFjZTogbmFtZSwgdXNlQ29sb3JzfSA9IHRoaXM7XG5cblx0aWYgKHVzZUNvbG9ycykge1xuXHRcdGNvbnN0IGMgPSB0aGlzLmNvbG9yO1xuXHRcdGNvbnN0IGNvbG9yQ29kZSA9ICdcXHUwMDFCWzMnICsgKGMgPCA4ID8gYyA6ICc4OzU7JyArIGMpO1xuXHRcdGNvbnN0IHByZWZpeCA9IGAgICR7Y29sb3JDb2RlfTsxbSR7bmFtZX0gXFx1MDAxQlswbWA7XG5cblx0XHRhcmdzWzBdID0gcHJlZml4ICsgYXJnc1swXS5zcGxpdCgnXFxuJykuam9pbignXFxuJyArIHByZWZpeCk7XG5cdFx0YXJncy5wdXNoKGNvbG9yQ29kZSArICdtKycgKyBtb2R1bGUuZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpICsgJ1xcdTAwMUJbMG0nKTtcblx0fSBlbHNlIHtcblx0XHRhcmdzWzBdID0gZ2V0RGF0ZSgpICsgbmFtZSArICcgJyArIGFyZ3NbMF07XG5cdH1cbn1cblxuZnVuY3Rpb24gZ2V0RGF0ZSgpIHtcblx0aWYgKGV4cG9ydHMuaW5zcGVjdE9wdHMuaGlkZURhdGUpIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblx0cmV0dXJuIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSArICcgJztcbn1cblxuLyoqXG4gKiBJbnZva2VzIGB1dGlsLmZvcm1hdFdpdGhPcHRpb25zKClgIHdpdGggdGhlIHNwZWNpZmllZCBhcmd1bWVudHMgYW5kIHdyaXRlcyB0byBzdGRlcnIuXG4gKi9cblxuZnVuY3Rpb24gbG9nKC4uLmFyZ3MpIHtcblx0cmV0dXJuIHByb2Nlc3Muc3RkZXJyLndyaXRlKHV0aWwuZm9ybWF0V2l0aE9wdGlvbnMoZXhwb3J0cy5pbnNwZWN0T3B0cywgLi4uYXJncykgKyAnXFxuJyk7XG59XG5cbi8qKlxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcblx0aWYgKG5hbWVzcGFjZXMpIHtcblx0XHRwcm9jZXNzLmVudi5ERUJVRyA9IG5hbWVzcGFjZXM7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gSWYgeW91IHNldCBhIHByb2Nlc3MuZW52IGZpZWxkIHRvIG51bGwgb3IgdW5kZWZpbmVkLCBpdCBnZXRzIGNhc3QgdG8gdGhlXG5cdFx0Ly8gc3RyaW5nICdudWxsJyBvciAndW5kZWZpbmVkJy4gSnVzdCBkZWxldGUgaW5zdGVhZC5cblx0XHRkZWxldGUgcHJvY2Vzcy5lbnYuREVCVUc7XG5cdH1cbn1cblxuLyoqXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2FkKCkge1xuXHRyZXR1cm4gcHJvY2Vzcy5lbnYuREVCVUc7XG59XG5cbi8qKlxuICogSW5pdCBsb2dpYyBmb3IgYGRlYnVnYCBpbnN0YW5jZXMuXG4gKlxuICogQ3JlYXRlIGEgbmV3IGBpbnNwZWN0T3B0c2Agb2JqZWN0IGluIGNhc2UgYHVzZUNvbG9yc2AgaXMgc2V0XG4gKiBkaWZmZXJlbnRseSBmb3IgYSBwYXJ0aWN1bGFyIGBkZWJ1Z2AgaW5zdGFuY2UuXG4gKi9cblxuZnVuY3Rpb24gaW5pdChkZWJ1Zykge1xuXHRkZWJ1Zy5pbnNwZWN0T3B0cyA9IHt9O1xuXG5cdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmluc3BlY3RPcHRzKTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0ZGVidWcuaW5zcGVjdE9wdHNba2V5c1tpXV0gPSBleHBvcnRzLmluc3BlY3RPcHRzW2tleXNbaV1dO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb21tb24nKShleHBvcnRzKTtcblxuY29uc3Qge2Zvcm1hdHRlcnN9ID0gbW9kdWxlLmV4cG9ydHM7XG5cbi8qKlxuICogTWFwICVvIHRvIGB1dGlsLmluc3BlY3QoKWAsIGFsbCBvbiBhIHNpbmdsZSBsaW5lLlxuICovXG5cbmZvcm1hdHRlcnMubyA9IGZ1bmN0aW9uICh2KSB7XG5cdHRoaXMuaW5zcGVjdE9wdHMuY29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cdHJldHVybiB1dGlsLmluc3BlY3QodiwgdGhpcy5pbnNwZWN0T3B0cylcblx0XHQuc3BsaXQoJ1xcbicpXG5cdFx0Lm1hcChzdHIgPT4gc3RyLnRyaW0oKSlcblx0XHQuam9pbignICcpO1xufTtcblxuLyoqXG4gKiBNYXAgJU8gdG8gYHV0aWwuaW5zcGVjdCgpYCwgYWxsb3dpbmcgbXVsdGlwbGUgbGluZXMgaWYgbmVlZGVkLlxuICovXG5cbmZvcm1hdHRlcnMuTyA9IGZ1bmN0aW9uICh2KSB7XG5cdHRoaXMuaW5zcGVjdE9wdHMuY29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cdHJldHVybiB1dGlsLmluc3BlY3QodiwgdGhpcy5pbnNwZWN0T3B0cyk7XG59O1xuIiwgIi8qKlxuICogRGV0ZWN0IEVsZWN0cm9uIHJlbmRlcmVyIC8gbndqcyBwcm9jZXNzLCB3aGljaCBpcyBub2RlLCBidXQgd2Ugc2hvdWxkXG4gKiB0cmVhdCBhcyBhIGJyb3dzZXIuXG4gKi9cblxuaWYgKHR5cGVvZiBwcm9jZXNzID09PSAndW5kZWZpbmVkJyB8fCBwcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicgfHwgcHJvY2Vzcy5icm93c2VyID09PSB0cnVlIHx8IHByb2Nlc3MuX19ud2pzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9icm93c2VyLmpzJyk7XG59IGVsc2Uge1xuXHRtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbm9kZS5qcycpO1xufVxuIiwgbnVsbCwgbnVsbCwgbnVsbCwgImltcG9ydCB7XG4gICAgQXBwLFxuICAgIEZpbGVTeXN0ZW1BZGFwdGVyLFxuICAgIEl0ZW1WaWV3LFxuICAgIE5vdGljZSxcbiAgICBQbHVnaW4sXG4gICAgUGx1Z2luU2V0dGluZ1RhYixcbiAgICBTZXR0aW5nLFxuICAgIFRGaWxlLFxuICAgIFdvcmtzcGFjZUxlYWYsXG59IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgc2ltcGxlR2l0IH0gZnJvbSBcInNpbXBsZS1naXRcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0ICogYXMgb3MgZnJvbSBcIm9zXCI7XG5cbmltcG9ydCB7XG4gICAgUmVtb3RlQXJ0aWNsZSxcbiAgICBjb25maXJtU3luY0NvbmZsaWN0LFxuICAgIHN5bmNBcnRpY2xlLFxuICAgIHN5bmNBcnRpY2xlQXNDb3B5LFxufSBmcm9tIFwiLi9zcmMvc3luY1wiO1xuaW1wb3J0IHsgZG93bmxvYWRBcnRpY2xlIH0gZnJvbSBcIi4vc3JjL2Rvd25sb2FkXCI7XG5pbXBvcnQgeyBVcGxvYWRBcnRpY2xlTW9kYWwsIHVwbG9hZExvY2FsQXJ0aWNsZSB9IGZyb20gXCIuL3NyYy91cGxvYWRcIjtcblxuZXhwb3J0IHR5cGUgeyBSZW1vdGVBcnRpY2xlIH07XG5cbmNvbnN0IFZJRVdfVFlQRV9BUlRJQ0xFUyA9IFwiZ2l0LWFydGljbGVzLXZpZXdcIjtcblxuaW50ZXJmYWNlIEdpdFN5bmNTZXR0aW5ncyB7XG4gICAgcmVwb1VybDogc3RyaW5nO1xuICAgIHNzaEtleTogc3RyaW5nO1xuICAgIHRhcmdldEZvbGRlcjogc3RyaW5nO1xufVxuXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBHaXRTeW5jU2V0dGluZ3MgPSB7XG4gICAgcmVwb1VybDogXCJcIixcbiAgICBzc2hLZXk6IFwiXCIsXG4gICAgdGFyZ2V0Rm9sZGVyOiBcIkdpdFx1NjU4N1x1N0FFMFwiLFxufTtcblxuY2xhc3MgR2l0QXJ0aWNsZXNWaWV3IGV4dGVuZHMgSXRlbVZpZXcge1xuICAgIHBsdWdpbjogTXlTaW1wbGVQbHVnaW47XG4gICAgYXJ0aWNsZXM6IFJlbW90ZUFydGljbGVbXSA9IFtdO1xuICAgIGxvY2FsVGl0bGVzID0gbmV3IE1hcDxzdHJpbmcsIFRGaWxlPigpO1xuICAgIGNvbnRlbnRFbDogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihsZWFmOiBXb3Jrc3BhY2VMZWFmLCBwbHVnaW46IE15U2ltcGxlUGx1Z2luKSB7XG4gICAgICAgIHN1cGVyKGxlYWYpO1xuICAgICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgICAgICAgdGhpcy5jb250ZW50RWwgPSB0aGlzLmNvbnRhaW5lckVsLmNoaWxkcmVuWzFdIGFzIEhUTUxFbGVtZW50O1xuICAgIH1cblxuICAgIGdldFZpZXdUeXBlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBWSUVXX1RZUEVfQVJUSUNMRVM7XG4gICAgfVxuXG4gICAgZ2V0RGlzcGxheVRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFwiR2l0IFx1NjU4N1x1N0FFMFwiO1xuICAgIH1cblxuICAgIGdldEljb24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFwiYm9vay1vcGVuXCI7XG4gICAgfVxuXG4gICAgYXN5bmMgb25PcGVuKCkge1xuICAgICAgICBhd2FpdCB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIGFzeW5jIHJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5jb250ZW50RWwuZW1wdHkoKTtcbiAgICAgICAgdGhpcy5jb250ZW50RWwuYWRkQ2xhc3MoXCJnaXQtYXJ0aWNsZXMtY29udGFpbmVyXCIpO1xuXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IHRoaXMuY29udGVudEVsLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtaGVhZGVyXCIgfSk7XG4gICAgICAgIGNvbnN0IHRpdGxlQm94ID0gaGVhZGVyLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtaGVhZGVyLXRpdGxlXCIgfSk7XG4gICAgICAgIHRpdGxlQm94LmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIkdpdCBcdTY1ODdcdTdBRTBcIiB9KTtcbiAgICAgICAgdGl0bGVCb3guY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgICAgICAgdGV4dDogdGhpcy5wbHVnaW4uc2V0dGluZ3MucmVwb1VybFxuICAgICAgICAgICAgICAgID8gXCJcdTRFQ0VcdTVERjJcdTkxNERcdTdGNkVcdTc2ODQgR2l0IFx1NEVEM1x1NUU5M1x1OEJGQlx1NTNENiBNYXJrZG93biBcdTY1ODdcdTdBRTBcIlxuICAgICAgICAgICAgICAgIDogXCJcdThCRjdcdTUxNDhcdTU3MjhcdThCQkVcdTdGNkVcdTRFMkRcdTkxNERcdTdGNkUgR2l0IFx1NEVEM1x1NUU5M1wiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC1hcnRpY2xlcy1zdWJ0aXRsZVwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByZWZyZXNoQnV0dG9uID0gaGVhZGVyLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU1MjM3XHU2NUIwXCIsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LWFydGljbGVzLXJlZnJlc2hcIixcbiAgICAgICAgfSk7XG4gICAgICAgIHJlZnJlc2hCdXR0b24ub25jbGljayA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJlZnJlc2hCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmVmcmVzaEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiXHU1MjM3XHU2NUIwXHU0RTJEXHUyMDI2XCI7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZEFydGljbGVzKCk7XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHJlZnJlc2hCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZWZyZXNoQnV0dG9uLnRleHRDb250ZW50ID0gXCJcdTUyMzdcdTY1QjBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoIXRoaXMucGx1Z2luLnNldHRpbmdzLnJlcG9VcmwpIHtcbiAgICAgICAgICAgIGNvbnN0IGVtcHR5ID0gdGhpcy5jb250ZW50RWwuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1hcnRpY2xlcy1lbXB0eVwiIH0pO1xuICAgICAgICAgICAgZW1wdHkuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1hcnRpY2xlcy1lbXB0eS1pY29uXCIsIHRleHQ6IFwiXHUyNjk5XHVGRTBGXCIgfSk7XG4gICAgICAgICAgICBlbXB0eS5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogXCJcdThGRDhcdTZDQTFcdTY3MDlcdTkxNERcdTdGNkUgR2l0IFx1NEVEM1x1NUU5M1wiIH0pO1xuICAgICAgICAgICAgZW1wdHkuY3JlYXRlRWwoXCJwXCIsIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1NjI1M1x1NUYwMCBPYnNpZGlhbiBcdThCQkVcdTdGNkUgXHUyMTkyIEdpdCBcdTY1ODdcdTdBRTBcdTU0MENcdTZCNjVcdUZGMENcdTU4NkJcdTUxOTlcdTRFRDNcdTVFOTNcdTU3MzBcdTU3NDBcdTU0MEVcdThGRDRcdTU2REVcdTZCNjRcdTY4MDdcdTdCN0VcdTk4NzVcdTMwMDJcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9hZGluZyA9IHRoaXMuY29udGVudEVsLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtbG9hZGluZ1wiIH0pO1xuICAgICAgICBsb2FkaW5nLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtc3Bpbm5lclwiIH0pO1xuICAgICAgICBsb2FkaW5nLmNyZWF0ZVNwYW4oeyB0ZXh0OiBcIlx1NkI2M1x1NTcyOFx1OEJGQlx1NTNENiBHaXQgXHU0RUQzXHU1RTkzXHUyMDI2XCIgfSk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZEFydGljbGVzKCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBsb2FkaW5nLnJlbW92ZSgpO1xuICAgICAgICAgICAgY29uc3QgZXJyb3JFbCA9IHRoaXMuY29udGVudEVsLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtZXJyb3JcIiB9KTtcbiAgICAgICAgICAgIGVycm9yRWwuY3JlYXRlRWwoXCJzdHJvbmdcIiwgeyB0ZXh0OiBcIlx1OEJGQlx1NTNENlx1NEVEM1x1NUU5M1x1NTkzMVx1OEQyNVwiIH0pO1xuICAgICAgICAgICAgZXJyb3JFbC5jcmVhdGVFbChcImRpdlwiLCB7XG4gICAgICAgICAgICAgICAgdGV4dDogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBsb2FkQXJ0aWNsZXMoKSB7XG4gICAgICAgIGNvbnN0IHRlbXBEaXIgPSBhd2FpdCB0aGlzLnBsdWdpbi5jbG9uZVRvVGVtcCgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5hcnRpY2xlcyA9IHRoaXMucGx1Z2luLmdldFJlbW90ZUFydGljbGVzKHRlbXBEaXIpO1xuICAgICAgICAgICAgdGhpcy5sb2NhbFRpdGxlcy5jbGVhcigpO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgdGhpcy5hcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpKSB7XG4gICAgICAgICAgICAgICAgLy8gXHU3NTI4XHU1QjhDXHU2NTc0XHU2NTg3XHU0RUY2XHU1NDBEXHVGRjA4XHU1NDJCIC5tZFx1RkYwOVx1NEY1Q1x1NEUzQSBrZXlcdUZGMENcdTkwN0ZcdTUxNEQgcGF0aC5leHRuYW1lIFx1NjIyQVx1NjVBRFx1OTVFRVx1OTg5OFxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5sb2NhbFRpdGxlcy5oYXMoZmlsZS5uYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2FsVGl0bGVzLnNldChmaWxlLm5hbWUsIGZpbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgb2xkTGlzdCA9IHRoaXMuY29udGVudEVsLnF1ZXJ5U2VsZWN0b3IoXCIuZ2l0LWFydGljbGVzLWxpc3RcIik7XG4gICAgICAgICAgICBvbGRMaXN0Py5yZW1vdmUoKTtcblxuICAgICAgICAgICAgY29uc3QgbG9hZGluZyA9IHRoaXMuY29udGVudEVsLnF1ZXJ5U2VsZWN0b3IoXCIuZ2l0LWFydGljbGVzLWxvYWRpbmdcIik7XG4gICAgICAgICAgICBsb2FkaW5nPy5yZW1vdmUoKTtcblxuICAgICAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMuY29udGVudEVsLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtbGlzdFwiIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5hcnRpY2xlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbXB0eSA9IGxpc3QuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1hcnRpY2xlcy1lbXB0eVwiIH0pO1xuICAgICAgICAgICAgICAgIGVtcHR5LmNyZWF0ZUVsKFwiaDNcIiwgeyB0ZXh0OiBcIlx1NEVEM1x1NUU5M1x1NEUyRFx1NkNBMVx1NjcwOSBNYXJrZG93biBcdTY1ODdcdTdBRTBcIiB9KTtcbiAgICAgICAgICAgICAgICBlbXB0eS5jcmVhdGVFbChcInBcIiwgeyB0ZXh0OiBcIlx1NUY1M1x1NTI0RFx1NTNFQVx1NjYzRVx1NzkzQSAubWQgXHU2NTg3XHU0RUY2XHUzMDAyXCIgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBzdW1tYXJ5ID0gbGlzdC5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LWFydGljbGVzLXN1bW1hcnlcIiB9KTtcbiAgICAgICAgICAgIHN1bW1hcnkuc2V0VGV4dChgXHU1MTcxICR7dGhpcy5hcnRpY2xlcy5sZW5ndGh9IFx1N0JDN1x1NjU4N1x1N0FFMGApO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGFydGljbGUgb2YgdGhpcy5hcnRpY2xlcykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQXJ0aWNsZUNhcmQobGlzdCwgYXJ0aWNsZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGF3YWl0IHRoaXMucmVuZGVyTG9jYWxBcnRpY2xlcygpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4ucmVtb3ZlVGVtcERpcih0ZW1wRGlyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckFydGljbGVDYXJkKGxpc3Q6IEhUTUxFbGVtZW50LCBhcnRpY2xlOiBSZW1vdGVBcnRpY2xlKSB7XG4gICAgICAgIC8vIFx1NzUyOFx1OEZEQ1x1N0EwQlx1NjU4N1x1NEVGNlx1NzY4NFx1MzAwQ1x1NjU4N1x1NEVGNlx1NTQwRFx1RkYwOFx1NTQyQiAubWRcdUZGMDlcdTMwMERcdTUzQkJcdTUzMzlcdTkxNERcdTY3MkNcdTU3MzBcdTY1ODdcdTRFRjZcbiAgICAgICAgY29uc3QgcmVtb3RlRmlsZU5hbWUgPSBhcnRpY2xlLnJlbGF0aXZlUGF0aC5zcGxpdChcIi9cIikucG9wKCkgPz8gXCJcIjtcbiAgICAgICAgY29uc3QgbG9jYWxGaWxlID0gdGhpcy5sb2NhbFRpdGxlcy5nZXQocmVtb3RlRmlsZU5hbWUpO1xuICAgICAgICBjb25zdCBjYXJkID0gbGlzdC5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LWFydGljbGUtY2FyZFwiIH0pO1xuXG4gICAgICAgIGNvbnN0IGluZm8gPSBjYXJkLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZS1pbmZvXCIgfSk7XG4gICAgICAgIGluZm8uY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgICAgICAgdGV4dDogYXJ0aWNsZS50aXRsZSxcbiAgICAgICAgICAgIGNsczogXCJnaXQtYXJ0aWNsZS10aXRsZVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgaW5mby5jcmVhdGVFbChcImRpdlwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBhcnRpY2xlLnJlbGF0aXZlUGF0aCxcbiAgICAgICAgICAgIGNsczogXCJnaXQtYXJ0aWNsZS1wYXRoXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IGNhcmQuY3JlYXRlRWwoXCJidXR0b25cIiwge1xuICAgICAgICAgICAgY2xzOiBsb2NhbEZpbGUgPyBcImdpdC1hcnRpY2xlLWFjdGlvbiBpcy1zeW5jZWRcIiA6IFwiZ2l0LWFydGljbGUtYWN0aW9uXCIsXG4gICAgICAgICAgICB0ZXh0OiBsb2NhbEZpbGUgPyBcIlx1NTQwQ1x1NkI2NVwiIDogXCJcdTRFMEJcdThGN0RcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYWN0aW9uLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiLFxuICAgICAgICAgICAgbG9jYWxGaWxlXG4gICAgICAgICAgICAgICAgPyBgXHU1NDBDXHU2QjY1XHUzMDBBJHthcnRpY2xlLnRpdGxlfVx1MzAwQmBcbiAgICAgICAgICAgICAgICA6IGBcdTRFMEJcdThGN0RcdTMwMEEke2FydGljbGUudGl0bGV9XHUzMDBCYFxuICAgICAgICApO1xuXG4gICAgICAgIGFjdGlvbi5vbmNsaWNrID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYWN0aW9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGFjdGlvbi50ZXh0Q29udGVudCA9IGxvY2FsRmlsZSA/IFwiXHU1NDBDXHU2QjY1XHU0RTJEXHUyMDI2XCIgOiBcIlx1NEUwQlx1OEY3RFx1NEUyRFx1MjAyNlwiO1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChsb2NhbEZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY29uZmlybVN5bmNDb25mbGljdChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJ0aWNsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsRmlsZVxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IFwiY2FuY2VsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IFwib3ZlcndyaXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHN5bmNBcnRpY2xlKHRoaXMucGx1Z2luLCBhcnRpY2xlLCBsb2NhbEZpbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZShgXHUzMDBBJHthcnRpY2xlLnRpdGxlfVx1MzAwQlx1NURGMlx1ODk4Nlx1NzZENlx1NUU3Nlx1NTQwQ1x1NkI2NWApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gXCJjb3B5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvcHlGaWxlID0gYXdhaXQgc3luY0FydGljbGVBc0NvcHkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJ0aWNsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbEZpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKGBcdTVERjJcdTRGRERcdTVCNThcdTRFM0FcdTUyNkZcdTRFRjZcdUZGMUEke2NvcHlGaWxlLnBhdGh9YCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdGaWxlID0gYXdhaXQgZG93bmxvYWRBcnRpY2xlKHRoaXMucGx1Z2luLCBhcnRpY2xlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhbFRpdGxlcy5zZXQobmV3RmlsZS5uYW1lLCBuZXdGaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLnRleHRDb250ZW50ID0gXCJcdTU0MENcdTZCNjVcIjtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJpcy1zeW5jZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoYFx1MzAwQSR7YXJ0aWNsZS50aXRsZX1cdTMwMEJcdTVERjJcdTRFMEJcdThGN0RgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoXG4gICAgICAgICAgICAgICAgICAgIGAke2xvY2FsRmlsZSA/IFwiXHU1NDBDXHU2QjY1XCIgOiBcIlx1NEUwQlx1OEY3RFwifVx1NTkzMVx1OEQyNVx1RkYxQSR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgIH1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsRmlsZSkgYWN0aW9uLnRleHRDb250ZW50ID0gXCJcdTU0MENcdTZCNjVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBhc3luYyByZW5kZXJMb2NhbEFydGljbGVzKCkge1xuICAgICAgICAvLyBcdTUyMzdcdTY1QjBcdTY1RjZcdTUxNDhcdTc5RkJcdTk2NjRcdTY1RTdcdTc2ODRcdTY3MkNcdTU3MzBcdTY1ODdcdTdBRTBcdTRFMEFcdTRGMjBcdTUzM0FcdTU3REZcdUZGMENcdTkwN0ZcdTUxNERcdTkxQ0RcdTU5MERcdTZFMzJcdTY3RDNcdTMwMDJcbiAgICAgICAgdGhpcy5jb250ZW50RWwucXVlcnlTZWxlY3RvcihcIi5naXQtbG9jYWwtYXJ0aWNsZXMtc2VjdGlvblwiKT8ucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuY29udGVudEVsLnF1ZXJ5U2VsZWN0b3IoXCIuZ2l0LWFydGljbGVzLWxvYWRpbmdcIik/LnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yKFwiLmdpdC1hcnRpY2xlcy1lbXB0eVwiKT8ucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuY29udGVudEVsLnF1ZXJ5U2VsZWN0b3IoXCIuZ2l0LWFydGljbGVzLWVycm9yXCIpPy5yZW1vdmUoKTtcblxuICAgICAgICBjb25zdCBzZWN0aW9uID0gdGhpcy5jb250ZW50RWwuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1sb2NhbC1hcnRpY2xlcy1zZWN0aW9uXCIgfSk7XG5cbiAgICAgICAgY29uc3QgaGVhZGVyID0gc2VjdGlvbi5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LWxvY2FsLWFydGljbGVzLWhlYWRlclwiIH0pO1xuICAgICAgICBjb25zdCB0aXRsZUJveCA9IGhlYWRlci5jcmVhdGVEaXYoKTtcbiAgICAgICAgdGl0bGVCb3guY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IFwiXHU2NzJDXHU1NzMwXHU2NTg3XHU3QUUwXHU0RTBBXHU0RjIwXCIgfSk7XG4gICAgICAgIHRpdGxlQm94LmNyZWF0ZUVsKFwiZGl2XCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU4QkZCXHU1M0Q2XHU1RjUzXHU1MjREIFZhdWx0IFx1NEUyRFx1NzY4NCBNYXJrZG93biBcdTY1ODdcdTRFRjZcdUZGMENcdTkwMDlcdTYyRTkgR2l0IFx1NEVEM1x1NUU5M1x1NjU4N1x1NEVGNlx1NTkzOVx1NTQwRVx1NEUwQVx1NEYyMFx1MzAwMlwiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC1hcnRpY2xlcy1zdWJ0aXRsZVwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBsb2NhbEZpbGVzID0gdGhpcy5hcHAudmF1bHRcbiAgICAgICAgICAgIC5nZXRNYXJrZG93bkZpbGVzKClcbiAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnBhdGgubG9jYWxlQ29tcGFyZShiLnBhdGgsIFwiemgtQ05cIikpO1xuXG4gICAgICAgIGlmIChsb2NhbEZpbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgc2VjdGlvbi5jcmVhdGVEaXYoe1xuICAgICAgICAgICAgICAgIHRleHQ6IFwiXHU1RjUzXHU1MjREIFZhdWx0IFx1NEUyRFx1NkNBMVx1NjcwOSBNYXJrZG93biBcdTY1ODdcdTdBRTBcdTMwMDJcIixcbiAgICAgICAgICAgICAgICBjbHM6IFwiZ2l0LWxvY2FsLWVtcHR5XCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxpc3QgPSBzZWN0aW9uLmNyZWF0ZURpdih7IGNsczogXCJnaXQtbG9jYWwtYXJ0aWNsZXMtbGlzdFwiIH0pO1xuXG4gICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBsb2NhbEZpbGVzKSB7XG4gICAgICAgICAgICBjb25zdCBjYXJkID0gbGlzdC5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LWxvY2FsLWFydGljbGUtY2FyZFwiIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBpbmZvID0gY2FyZC5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LWFydGljbGUtaW5mb1wiIH0pO1xuICAgICAgICAgICAgaW5mby5jcmVhdGVFbChcImRpdlwiLCB7XG4gICAgICAgICAgICAgICAgdGV4dDogZmlsZS5iYXNlbmFtZSxcbiAgICAgICAgICAgICAgICBjbHM6IFwiZ2l0LWFydGljbGUtdGl0bGVcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaW5mby5jcmVhdGVFbChcImRpdlwiLCB7XG4gICAgICAgICAgICAgICAgdGV4dDogZmlsZS5wYXRoLFxuICAgICAgICAgICAgICAgIGNsczogXCJnaXQtYXJ0aWNsZS1wYXRoXCIsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gY2FyZC5jcmVhdGVFbChcImJ1dHRvblwiLCB7XG4gICAgICAgICAgICAgICAgdGV4dDogXCJcdTRFMEFcdTRGMjBcIixcbiAgICAgICAgICAgICAgICBjbHM6IFwiZ2l0LWFydGljbGUtYWN0aW9uXCIsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYWN0aW9uLm9uY2xpY2sgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9kYWwgPSBuZXcgVXBsb2FkQXJ0aWNsZU1vZGFsKHRoaXMuYXBwLCB0aGlzLnBsdWdpbiwgZmlsZSk7XG4gICAgICAgICAgICAgICAgbW9kYWwub3BlbigpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIG9uQ2xvc2UoKSB7XG4gICAgICAgIHRoaXMuY29udGVudEVsLmVtcHR5KCk7XG4gICAgfVxufVxuXG5jbGFzcyBHaXRTeW5jU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuICAgIHBsdWdpbjogTXlTaW1wbGVQbHVnaW47XG5cbiAgICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBNeVNpbXBsZVBsdWdpbikge1xuICAgICAgICBzdXBlcihhcHAsIHBsdWdpbik7XG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICAgIH1cblxuICAgIGRpc3BsYXkoKSB7XG4gICAgICAgIGNvbnN0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG4gICAgICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG5cbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IFwiR2l0IFx1NjU4N1x1N0FFMFx1NTQwQ1x1NkI2NVwiIH0pO1xuICAgICAgICBjb250YWluZXJFbC5jcmVhdGVFbChcInBcIiwge1xuICAgICAgICAgICAgdGV4dDogXCJcdTU3MjhcdThGRDlcdTkxQ0NcdTkxNERcdTdGNkUgR2l0IFx1NEVEM1x1NUU5M1x1NzNBRlx1NTg4M1x1RkYwQ1x1NjU4N1x1N0FFMFx1NTIxN1x1ODg2OFx1NEYxQVx1NTcyOFx1MjAxQ0dpdCBcdTY1ODdcdTdBRTBcdTIwMURcdTY4MDdcdTdCN0VcdTk4NzVcdTRFMkRcdTY2M0VcdTc5M0FcdTMwMDJcIixcbiAgICAgICAgICAgIGNsczogXCJzZXR0aW5nLWl0ZW0tZGVzY3JpcHRpb25cIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIkdpdCBcdTRFRDNcdTVFOTNcdTU3MzBcdTU3NDBcIilcbiAgICAgICAgICAgIC5zZXREZXNjKFwiXHU2NTJGXHU2MzAxIEhUVFBTIFx1NTQ4QyBTU0hcdUZGMENcdTRGOEJcdTU5ODIgZ2l0QGdpdGh1Yi5jb206dXNlci9yZXBvLmdpdFwiKVxuICAgICAgICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgICAgICAgICAgdGV4dFxuICAgICAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJnaXRAZ2l0aHViLmNvbTp1c2VyL3JlcG8uZ2l0XCIpXG4gICAgICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5yZXBvVXJsKVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5yZXBvVXJsID0gdmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJTU0ggXHU3OUMxXHU5NEE1XCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIlx1NTNFRlx1OTAwOVx1MzAwMlx1NzU1OVx1N0E3QVx1NjVGNlx1NEY3Rlx1NzUyOFx1N0NGQlx1N0VERlx1OUVEOFx1OEJBNCBTU0ggXHU5MTREXHU3RjZFXHUzMDAyXHU3OUMxXHU5NEE1XHU1M0VBXHU3NTI4XHU0RThFXHU1RjUzXHU1MjREIEdpdCBcdTY0Q0RcdTRGNUNcdTMwMDJcIilcbiAgICAgICAgICAgIC5hZGRUZXh0QXJlYSgodGV4dCkgPT4ge1xuICAgICAgICAgICAgICAgIHRleHRcbiAgICAgICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiXHU3Qzk4XHU4RDM0IFNTSCBcdTc5QzFcdTk0QTVcIilcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnNzaEtleSlcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc3NoS2V5ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGV4dC5pbnB1dEVsLnJvd3MgPSA3O1xuICAgICAgICAgICAgICAgIHRleHQuaW5wdXRFbC5hZGRDbGFzcyhcImdpdC1zeW5jLXNldHRpbmdzLWtleVwiKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJcdTY1ODdcdTdBRTBcdTRGRERcdTVCNThcdTc2RUVcdTVGNTVcIilcbiAgICAgICAgICAgIC5zZXREZXNjKFwiXHU0RTBCXHU4RjdEXHU2NUIwXHU2NTg3XHU3QUUwXHU2NUY2XHU0RjdGXHU3NTI4XHU3Njg0IFZhdWx0IFx1NzZGOFx1NUJGOVx1OERFRlx1NUY4NFx1RkYwQ1x1NEY4Qlx1NTk4MiBHaXRcdTY1ODdcdTdBRTBcIilcbiAgICAgICAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICAgICAgICAgIHRleHRcbiAgICAgICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiR2l0XHU2NTg3XHU3QUUwXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy50YXJnZXRGb2xkZXIpXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnRhcmdldEZvbGRlciA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUudHJpbSgpLnJlcGxhY2UoL15cXC8rfFxcLyskL2csIFwiXCIpIHx8IFwiR2l0XHU2NTg3XHU3QUUwXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIlx1NjI1M1x1NUYwMFx1NjU4N1x1N0FFMFx1NTIxN1x1ODg2OFwiKVxuICAgICAgICAgICAgLnNldERlc2MoXCJcdTYyNTNcdTVGMDBcdTRFMDBcdTRFMkFcdTY1QjBcdTc2ODQgT2JzaWRpYW4gXHU2ODA3XHU3QjdFXHU5ODc1XHVGRjBDXHU2N0U1XHU3NzBCXHU0RUQzXHU1RTkzXHU0RTJEXHU3Njg0XHU2NTg3XHU3QUUwXHUzMDAyXCIpXG4gICAgICAgICAgICAuYWRkQnV0dG9uKChidXR0b24pID0+XG4gICAgICAgICAgICAgICAgYnV0dG9uLnNldEJ1dHRvblRleHQoXCJcdTYyNTNcdTVGMDBcIikub25DbGljayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLmFjdGl2YXRlQXJ0aWNsZXNWaWV3KCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNeVNpbXBsZVBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG4gICAgc2V0dGluZ3M6IEdpdFN5bmNTZXR0aW5ncztcblxuICAgIGFzeW5jIG9ubG9hZCgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyVmlldyhcbiAgICAgICAgICAgIFZJRVdfVFlQRV9BUlRJQ0xFUyxcbiAgICAgICAgICAgIChsZWFmKSA9PiBuZXcgR2l0QXJ0aWNsZXNWaWV3KGxlYWYsIHRoaXMpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBHaXRTeW5jU2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcykpO1xuXG4gICAgICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICAgICAgICBpZDogXCJvcGVuLWdpdC1hcnRpY2xlc1wiLFxuICAgICAgICAgICAgbmFtZTogXCJcdTYyNTNcdTVGMDAgR2l0IFx1NjU4N1x1N0FFMFwiLFxuICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHRoaXMuYWN0aXZhdGVBcnRpY2xlc1ZpZXcoKSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRSaWJib25JY29uKFxuICAgICAgICAgICAgXCJib29rLW9wZW5cIixcbiAgICAgICAgICAgIFwiXHU2MjUzXHU1RjAwIEdpdCBcdTY1ODdcdTdBRTBcIixcbiAgICAgICAgICAgICgpID0+IHRoaXMuYWN0aXZhdGVBcnRpY2xlc1ZpZXcoKVxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiR2l0IFx1NjU4N1x1N0FFMFx1NTQwQ1x1NkI2NVx1NjNEMlx1NEVGNlx1NURGMlx1NTJBMFx1OEY3RFwiKTtcbiAgICB9XG5cbiAgICBhc3luYyBsb2FkU2V0dGluZ3MoKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xuICAgIH1cblxuICAgIGFzeW5jIHNhdmVTZXR0aW5ncygpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcbiAgICB9XG5cbiAgICBhc3luYyBhY3RpdmF0ZUFydGljbGVzVmlldygpIHtcbiAgICAgICAgY29uc3QgeyB3b3Jrc3BhY2UgfSA9IHRoaXMuYXBwO1xuICAgICAgICBsZXQgbGVhZiA9IHdvcmtzcGFjZS5nZXRMZWF2ZXNPZlR5cGUoVklFV19UWVBFX0FSVElDTEVTKVswXTtcblxuICAgICAgICBpZiAoIWxlYWYpIHtcbiAgICAgICAgICAgIGxlYWYgPSB3b3Jrc3BhY2UuZ2V0TGVhZihcInRhYlwiKTtcbiAgICAgICAgICAgIGF3YWl0IGxlYWYuc2V0Vmlld1N0YXRlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBWSUVXX1RZUEVfQVJUSUNMRVMsXG4gICAgICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB3b3Jrc3BhY2UucmV2ZWFsTGVhZihsZWFmKTtcbiAgICB9XG5cbiAgICBhc3luYyBjbG9uZVRvVGVtcCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MucmVwb1VybCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHU4QkY3XHU1MTQ4XHU1NzI4XHU4QkJFXHU3RjZFXHU0RTJEXHU1ODZCXHU1MTk5IEdpdCBcdTRFRDNcdTVFOTNcdTU3MzBcdTU3NDBcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0ZW1wRGlyID0gcGF0aC5qb2luKFxuICAgICAgICAgICAgb3MudG1wZGlyKCksXG4gICAgICAgICAgICBgb2JzaWRpYW4tZ2l0LWFydGljbGVzLSR7RGF0ZS5ub3coKX1gXG4gICAgICAgICk7XG5cbiAgICAgICAgbGV0IHRlbXBLZXlQYXRoOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZ2l0ID0gc2ltcGxlR2l0KCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNzaEtleS50cmltKCkpIHtcbiAgICAgICAgICAgICAgICB0ZW1wS2V5UGF0aCA9IHBhdGguam9pbihcbiAgICAgICAgICAgICAgICAgICAgb3MudG1wZGlyKCksXG4gICAgICAgICAgICAgICAgICAgIGBvYnNpZGlhbi1naXQta2V5LSR7RGF0ZS5ub3coKX1gXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGZzLndyaXRlRmlsZVN5bmMoXG4gICAgICAgICAgICAgICAgICAgIHRlbXBLZXlQYXRoLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLnNzaEtleS50cmltKCkgKyBcIlxcblwiLFxuICAgICAgICAgICAgICAgICAgICB7IG1vZGU6IDBvNjAwIH1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgZ2l0LmVudih7XG4gICAgICAgICAgICAgICAgICAgIC4uLnByb2Nlc3MuZW52LFxuICAgICAgICAgICAgICAgICAgICBHSVRfU1NIX0NPTU1BTkQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBgc3NoIC1pIFwiJHt0ZW1wS2V5UGF0aH1cIiAtbyBTdHJpY3RIb3N0S2V5Q2hlY2tpbmc9bm8gLW8gVXNlcktub3duSG9zdHNGaWxlPS9kZXYvbnVsbGAsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGF3YWl0IGdpdC5jbG9uZSh0aGlzLnNldHRpbmdzLnJlcG9VcmwsIHRlbXBEaXIsIFtcbiAgICAgICAgICAgICAgICBcIi0tZGVwdGhcIixcbiAgICAgICAgICAgICAgICBcIjFcIixcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICByZXR1cm4gdGVtcERpcjtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVGVtcERpcih0ZW1wRGlyKTtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgaWYgKHRlbXBLZXlQYXRoICYmIGZzLmV4aXN0c1N5bmModGVtcEtleVBhdGgpKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZnMudW5saW5rU3luYyh0ZW1wS2V5UGF0aCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFx1NUZGRFx1NzU2NVx1NEUzNFx1NjVGNlx1NUJDNlx1OTRBNVx1NkUwNVx1NzQwNlx1NTkzMVx1OEQyNVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFJlbW90ZUFydGljbGVzKHJlcG9EaXI6IHN0cmluZyk6IFJlbW90ZUFydGljbGVbXSB7XG4gICAgICAgIGNvbnN0IGFydGljbGVzOiBSZW1vdGVBcnRpY2xlW10gPSBbXTtcblxuICAgICAgICBjb25zdCB3YWxrID0gKGN1cnJlbnREaXI6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBmcy5yZWFkZGlyU3luYyhjdXJyZW50RGlyLCB7XG4gICAgICAgICAgICAgICAgd2l0aEZpbGVUeXBlczogdHJ1ZSxcbiAgICAgICAgICAgIH0pKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5Lm5hbWUgPT09IFwiLmdpdFwiKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGFic29sdXRlUGF0aCA9IHBhdGguam9pbihjdXJyZW50RGlyLCBlbnRyeS5uYW1lKTtcblxuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHdhbGsoYWJzb2x1dGVQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFlbnRyeS5pc0ZpbGUoKSB8fCBwYXRoLmV4dG5hbWUoZW50cnkubmFtZSkudG9Mb3dlckNhc2UoKSAhPT0gXCIubWRcIikge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBwYXRoXG4gICAgICAgICAgICAgICAgICAgIC5yZWxhdGl2ZShyZXBvRGlyLCBhYnNvbHV0ZVBhdGgpXG4gICAgICAgICAgICAgICAgICAgIC5zcGxpdChwYXRoLnNlcClcbiAgICAgICAgICAgICAgICAgICAgLmpvaW4oXCIvXCIpO1xuXG4gICAgICAgICAgICAgICAgYXJ0aWNsZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBwYXRoLmJhc2VuYW1lKGVudHJ5Lm5hbWUsIHBhdGguZXh0bmFtZShlbnRyeS5uYW1lKSksXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgYWJzb2x1dGVQYXRoLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBmcy5yZWFkRmlsZVN5bmMoYWJzb2x1dGVQYXRoLCBcInV0ZjhcIiksXG4gICAgICAgICAgICAgICAgICAgIHNpemU6IGZzLnN0YXRTeW5jKGFic29sdXRlUGF0aCkuc2l6ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB3YWxrKHJlcG9EaXIpO1xuXG4gICAgICAgIHJldHVybiBhcnRpY2xlcy5zb3J0KChhLCBiKSA9PlxuICAgICAgICAgICAgYS50aXRsZS5sb2NhbGVDb21wYXJlKGIudGl0bGUsIFwiemgtQ05cIilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRSZW1vdGVGb2xkZXJzKCk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICAgICAgY29uc3QgdGVtcERpciA9IGF3YWl0IHRoaXMuY2xvbmVUb1RlbXAoKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZm9sZGVycyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gICAgICAgICAgICBjb25zdCB3YWxrID0gKGN1cnJlbnREaXI6IHN0cmluZywgcmVsYXRpdmVCYXNlID0gXCJcIikgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZnMucmVhZGRpclN5bmMoY3VycmVudERpciwgeyB3aXRoRmlsZVR5cGVzOiB0cnVlIH0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5uYW1lID09PSBcIi5naXRcIikgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWJzb2x1dGVQYXRoID0gcGF0aC5qb2luKGN1cnJlbnREaXIsIGVudHJ5Lm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWxhdGl2ZVBhdGggPSByZWxhdGl2ZUJhc2VcbiAgICAgICAgICAgICAgICAgICAgICAgID8gcGF0aC5qb2luKHJlbGF0aXZlQmFzZSwgZW50cnkubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZW50cnkubmFtZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9sZGVycy5hZGQocmVsYXRpdmVQYXRoLnNwbGl0KHBhdGguc2VwKS5qb2luKFwiL1wiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3YWxrKGFic29sdXRlUGF0aCwgcmVsYXRpdmVQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHdhbGsodGVtcERpcik7XG5cbiAgICAgICAgICAgIHJldHVybiBBcnJheS5mcm9tKGZvbGRlcnMpLnNvcnQoKGEsIGIpID0+XG4gICAgICAgICAgICAgICAgYS5sb2NhbGVDb21wYXJlKGIsIFwiemgtQ05cIilcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRlbXBEaXIodGVtcERpcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVUZW1wRGlyKGRpcjogc3RyaW5nKSB7XG4gICAgICAgIGlmICghZGlyIHx8ICFmcy5leGlzdHNTeW5jKGRpcikpIHJldHVybjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZnMucm1TeW5jKGRpciwgeyByZWN1cnNpdmU6IHRydWUsIGZvcmNlOiB0cnVlIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiXHU2RTA1XHU3NDA2IEdpdCBcdTRFMzRcdTY1RjZcdTc2RUVcdTVGNTVcdTU5MzFcdThEMjVcdUZGMUFcIiwgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb251bmxvYWQoKSB7XG4gICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5kZXRhY2hMZWF2ZXNPZlR5cGUoVklFV19UWVBFX0FSVElDTEVTKTtcbiAgICB9XG59IiwgIi8qKlxuICogV3JhcHMgb25lIG9yIG1vcmUgZmlsZSBwYXRocyBpbiBhbiBvYmplY3QgdGhhdCBgcGFyc2VDbGlgIHJlY29nbmlzZXMgYXNcbiAqIGV4cGxpY2l0IHBhdGhzcGVjcywgcm91dGluZyB0aGVtIHRvIGBQYXJzZWRDTEkucGF0aHNgIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlclxuICogYSBgLS1gIHNlcGFyYXRvciB0b2tlbiBpcyBwcmVzZW50LlxuICovXG5cbi8vIGJpb21lLWlnbm9yZSBsaW50L2NvbXBsZXhpdHkvbm9CYW5uZWRUeXBlczogPFVzZXMgU3RyaW5nIG9iamVjdCB0byBzYXRpc2Z5IFdlYWtNYXAgcmVxdWlyZW1ldG4+XG5jb25zdCBjYWNoZSA9IG5ldyBXZWFrTWFwPFN0cmluZywgc3RyaW5nW10+KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRoc3BlYyguLi5wYXRoczogc3RyaW5nW10pOiBzdHJpbmcge1xuICAgY29uc3Qga2V5ID0gbmV3IFN0cmluZyhwYXRocyk7XG4gICBjYWNoZS5zZXQoa2V5LCBwYXRocyk7XG4gICByZXR1cm4ga2V5IGFzIHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUGF0aFNwZWModmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nICYmIGNhY2hlLmhhcyh2YWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1BhdGhzKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICByZXR1cm4gY2FjaGUuZ2V0KHZhbHVlKSA/PyBbXTtcbn1cbiIsICJleHBvcnQgaW50ZXJmYWNlIEZsYWcge1xuICAgbmFtZTogc3RyaW5nO1xuICAgdmFsdWU/OiBzdHJpbmc7XG4gICAvKiogVmFsdWUgY2FtZSBmcm9tIHRoZSBuZXh0IHRva2VuIHJhdGhlciB0aGFuIGJlaW5nIGVtYmVkZGVkIGFmdGVyIGA9YC4gKi9cbiAgIGFic29yYmVkTmV4dDogYm9vbGVhbjtcbiAgIC8qKiBTd2l0Y2ggYXBwZWFyZWQgYmVmb3JlIHRoZSBnaXQgc3ViLWNvbW1hbmQuICovXG4gICBpc0dsb2JhbDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uKiBzY29wZWRGbGFncyhmbGFnczogRmxhZ1tdLCBzY29wZTogJ2dsb2JhbCcgfCAndGFzaycpIHtcbiAgIGNvbnN0IGZpbmRHbG9iYWwgPSBzY29wZSA9PT0gJ2dsb2JhbCc7XG4gICBmb3IgKGNvbnN0IGZsYWcgb2YgZmxhZ3MpIHtcbiAgICAgIGlmIChmbGFnLmlzR2xvYmFsID09PSBmaW5kR2xvYmFsKSB7XG4gICAgICAgICB5aWVsZCBmbGFnO1xuICAgICAgfVxuICAgfVxufVxuIiwgIi8vIEZsYWdzIHRoYXQgdW5hbWJpZ3VvdXNseSBzaWduYWwgYSB3cml0ZSBvcGVyYXRpb24gb24gZ2l0IGNvbmZpZy5cbmV4cG9ydCBjb25zdCBDT05GSUdfV1JJVEVfRkxBR1MgPSBuZXcgU2V0KFtcbiAgICctLWFkZCcsXG4gICAnLS1lZGl0JyxcbiAgICctLXJlbW92ZS1zZWN0aW9uJyxcbiAgICctLXJlbmFtZS1zZWN0aW9uJyxcbiAgICctLXJlcGxhY2UtYWxsJyxcbiAgICctLXVuc2V0JyxcbiAgICctLXVuc2V0LWFsbCcsXG4gICAnLWUnLFxuXSk7XG5cbi8vIEZsYWdzIHRoYXQgdW5hbWJpZ3VvdXNseSBzaWduYWwgYSByZWFkIG9wZXJhdGlvbi5cbmV4cG9ydCBjb25zdCBDT05GSUdfUkVBRF9GTEFHUyA9IG5ldyBTZXQoW1xuICAgJy0tZ2V0JyxcbiAgICctLWdldC1hbGwnLFxuICAgJy0tZ2V0LWNvbG9yJyxcbiAgICctLWdldC1jb2xvcmJvb2wnLFxuICAgJy0tZ2V0LXJlZ2V4cCcsXG4gICAnLS1nZXQtdXJsbWF0Y2gnLFxuICAgJy0tbGlzdCcsXG4gICAnLWwnLFxuXSk7XG5cbi8vIFN1Yi1jb21tYW5kIHZlcmJzIGFjY2VwdGVkIGFzIHRoZSBmaXJzdCBwb3NpdGlvbmFsIGJ5IG5ld2VyIGdpdCB2ZXJzaW9ucy5cbmV4cG9ydCBjb25zdCBDT05GSUdfV1JJVEVfVkVSQlMgPSBuZXcgU2V0KFtcbiAgICdlZGl0JyxcbiAgICdyZW1vdmUtc2VjdGlvbicsXG4gICAncmVuYW1lLXNlY3Rpb24nLFxuICAgJ3NldCcsXG4gICAndW5zZXQnLFxuXSk7XG5leHBvcnQgY29uc3QgQ09ORklHX1JFQURfVkVSQlMgPSBuZXcgU2V0KFsnZ2V0JywgJ2dldC1jb2xvcicsICdnZXQtY29sb3Jib29sJywgJ2xpc3QnXSk7XG4iLCAiaW1wb3J0IHR5cGUgeyBDb25maWdTY29wZSB9IGZyb20gJy4uL2FyZ3MvcGFyc2UtYXJndi50eXBlcyc7XG5pbXBvcnQgeyB0eXBlIEZsYWcsIHNjb3BlZEZsYWdzIH0gZnJvbSAnLi4vZmxhZ3MvZmxhZ3MuaGVscGVycyc7XG5pbXBvcnQgdHlwZSB7IENvbmZpZ09wZXJhdGlvbiB9IGZyb20gJy4vY29uZmlnLnR5cGVzJztcbmltcG9ydCB7XG4gICBDT05GSUdfUkVBRF9GTEFHUyxcbiAgIENPTkZJR19SRUFEX1ZFUkJTLFxuICAgQ09ORklHX1dSSVRFX0ZMQUdTLFxuICAgQ09ORklHX1dSSVRFX1ZFUkJTLFxufSBmcm9tICcuL2NvbmZpZy1vcGVyYW5kcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3RDb25maWdBY3Rpb24oZmxhZ3M6IEZsYWdbXSwgcG9zaXRpb25hbHM6IHN0cmluZ1tdKTogQ29uZmlnT3BlcmF0aW9uIHwgbnVsbCB7XG4gICBmb3IgKGNvbnN0IHsgbmFtZSB9IG9mIHNjb3BlZEZsYWdzKGZsYWdzLCAndGFzaycpKSB7XG4gICAgICBpZiAoQ09ORklHX1dSSVRFX0ZMQUdTLmhhcyhuYW1lKSkge1xuICAgICAgICAgcmV0dXJuIGNvbmZpZ09wZXJhdGlvbih0cnVlLCBwb3NpdGlvbmFscyk7XG4gICAgICB9XG4gICAgICBpZiAoQ09ORklHX1JFQURfRkxBR1MuaGFzKG5hbWUpKSB7XG4gICAgICAgICByZXR1cm4gY29uZmlnT3BlcmF0aW9uKGZhbHNlLCBwb3NpdGlvbmFscyk7XG4gICAgICB9XG4gICB9XG5cbiAgIGNvbnN0IHZlcmIgPSBwb3NpdGlvbmFscy5hdCgwKT8udG9Mb3dlckNhc2UoKTtcblxuICAgaWYgKHZlcmIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICB9XG5cbiAgIGlmIChDT05GSUdfV1JJVEVfVkVSQlMuaGFzKHZlcmIpKSB7XG4gICAgICByZXR1cm4gY29uZmlnT3BlcmF0aW9uKHRydWUsIHBvc2l0aW9uYWxzLnNsaWNlKDEpKTtcbiAgIH1cblxuICAgaWYgKENPTkZJR19SRUFEX1ZFUkJTLmhhcyh2ZXJiKSkge1xuICAgICAgcmV0dXJuIGNvbmZpZ09wZXJhdGlvbihmYWxzZSwgcG9zaXRpb25hbHMuc2xpY2UoMSkpO1xuICAgfVxuXG4gICBpZiAocG9zaXRpb25hbHMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gY29uZmlnT3BlcmF0aW9uKGZhbHNlLCBwb3NpdGlvbmFscyk7XG4gICB9XG5cbiAgIHJldHVybiBjb25maWdPcGVyYXRpb24odHJ1ZSwgcG9zaXRpb25hbHMpO1xufVxuXG5mdW5jdGlvbiBjb25maWdPcGVyYXRpb24oaXNXcml0ZSA9IGZhbHNlLCBwb3NpdGlvbmFsczogc3RyaW5nW10gPSBbXSk6IENvbmZpZ09wZXJhdGlvbiB8IG51bGwge1xuICAgY29uc3Qga2V5ID0gcG9zaXRpb25hbHMuYXQoMCk/LnRvTG93ZXJDYXNlKCk7XG5cbiAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICB9XG5cbiAgIHJldHVybiB7XG4gICAgICBpc1dyaXRlLFxuICAgICAgaXNSZWFkOiAhaXNXcml0ZSxcbiAgICAgIGtleSxcbiAgICAgIHZhbHVlOiBwb3NpdGlvbmFscy5hdCgxKSxcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b09wZXJhdGlvbihzY29wZTogQ29uZmlnU2NvcGUsIG9wZXJhdGlvbjogQ29uZmlnT3BlcmF0aW9uKSB7XG4gICBpZiAob3BlcmF0aW9uLmlzV3JpdGUgJiYgb3BlcmF0aW9uLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB7IGtleTogb3BlcmF0aW9uLmtleSwgdmFsdWU6IG9wZXJhdGlvbi52YWx1ZSwgc2NvcGUgfTtcbiAgIH1cbiAgIHJldHVybiB7IGtleTogb3BlcmF0aW9uLmtleSwgc2NvcGUgfTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IENvbmZpZ1Njb3BlLCBDb25maWdXcml0ZSwgUGFyc2VkQ29uZmlnQWN0aXZpdHkgfSBmcm9tICcuLi9hcmdzL3BhcnNlLWFyZ3YudHlwZXMnO1xuaW1wb3J0IHsgdHlwZSBGbGFnLCBzY29wZWRGbGFncyB9IGZyb20gJy4uL2ZsYWdzL2ZsYWdzLmhlbHBlcnMnO1xuaW1wb3J0IHR5cGUgeyBDb25maWdPcGVyYXRpb24gfSBmcm9tICcuL2NvbmZpZy50eXBlcyc7XG5pbXBvcnQgeyBkZXRlY3RDb25maWdBY3Rpb24sIHRvT3BlcmF0aW9uIH0gZnJvbSAnLi9kZXRlY3QtY29uZmlnLWFjdGlvbic7XG5cbmZ1bmN0aW9uIHBhcnNlQXNzaWdubWVudChyYXc6IHN0cmluZyB8IHVuZGVmaW5lZCk6IHsga2V5OiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfSB8IG51bGwge1xuICAgY29uc3QgZXEgPSByYXc/LmluZGV4T2YoJz0nKSB8fCAtMTtcblxuICAgaWYgKCFyYXcgfHwgZXEgPCAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgIH1cblxuICAgcmV0dXJuIHtcbiAgICAgIGtleTogcmF3LnNsaWNlKDAsIGVxKS50cmltKCkudG9Mb3dlckNhc2UoKSxcbiAgICAgIHZhbHVlOiByYXcuc2xpY2UoZXEgKyAxKSxcbiAgIH07XG59XG5cbmZ1bmN0aW9uIGRldGVjdENvbmZpZ1Njb3BlKGZsYWdzOiBGbGFnW10pOiBDb25maWdTY29wZSB7XG4gICBmb3IgKGNvbnN0IHsgbmFtZSB9IG9mIHNjb3BlZEZsYWdzKGZsYWdzLCAndGFzaycpKSB7XG4gICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgIGNhc2UgJy0tZ2xvYmFsJzpcbiAgICAgICAgICAgIHJldHVybiAnZ2xvYmFsJztcbiAgICAgICAgIGNhc2UgJy0tc3lzdGVtJzpcbiAgICAgICAgICAgIHJldHVybiAnc3lzdGVtJztcbiAgICAgICAgIGNhc2UgJy0td29ya3RyZWUnOlxuICAgICAgICAgICAgcmV0dXJuICd3b3JrdHJlZSc7XG4gICAgICAgICBjYXNlICctLWxvY2FsJzpcbiAgICAgICAgICAgIHJldHVybiAnbG9jYWwnO1xuICAgICAgICAgY2FzZSAnLS1maWxlJzpcbiAgICAgICAgIGNhc2UgJy1mJzpcbiAgICAgICAgICAgIHJldHVybiAnZmlsZSc7XG4gICAgICB9XG4gICB9XG4gICByZXR1cm4gJ2xvY2FsJztcbn1cblxuZnVuY3Rpb24gZGV0ZWN0Q29uZmlnT3ZlcnJpZGVTY29wZSh7IG5hbWUgfTogRmxhZyk6IENvbmZpZ1Njb3BlIHwgdm9pZCB7XG4gICBpZiAobmFtZSA9PT0gJy1jJyB8fCBuYW1lID09PSAnLS1jb25maWcnKSB7XG4gICAgICByZXR1cm4gJ2lubGluZSc7XG4gICB9XG4gICBpZiAobmFtZSA9PT0gJy0tY29uZmlnLWVudicpIHtcbiAgICAgIHJldHVybiAnZW52JztcbiAgIH1cbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgdGhlIHN0cmVhbSBvZiBDb25maWdXcml0ZSBzZXR0aW5ncyBmb3VuZCBpbiB0aGUgc3VwcGxpZWQgZmxhZ3MsXG4gKiB0cmlnZ2VyZWQgYnkgYC1jYCBhbmQgYC0tY29uZmlnYCBmb3IgaW5saW5lIGNvbmZpZ3VyYXRpb24gYW5kIGAtLWNvbmZpZy1lbnZgXG4gKiB0byBzZXQgYSBjb25maWcgc2V0dGluZyBiYXNlZCBvbiBlbnZpcm9ubWVudCB2YXJpYWJsZS5cbiAqL1xuZnVuY3Rpb24qIGNvbGxlY3RXcml0ZUZsYWdzKGZsYWdzOiBGbGFnW10pOiBHZW5lcmF0b3I8Q29uZmlnV3JpdGU+IHtcbiAgIGZvciAoY29uc3QgZmxhZyBvZiBmbGFncykge1xuICAgICAgY29uc3Qgc2NvcGUgPSBkZXRlY3RDb25maWdPdmVycmlkZVNjb3BlKGZsYWcpO1xuICAgICAgY29uc3QgYXNzaWdubWVudCA9IHNjb3BlICYmIHBhcnNlQXNzaWdubWVudChmbGFnLnZhbHVlKTtcblxuICAgICAgaWYgKGFzc2lnbm1lbnQpIHtcbiAgICAgICAgIHlpZWxkIHtcbiAgICAgICAgICAgIC4uLmFzc2lnbm1lbnQsXG4gICAgICAgICAgICBzY29wZSxcbiAgICAgICAgIH07XG4gICAgICB9XG4gICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xsZWN0Q29uZmlnQWNjZXNzKFxuICAgdGFzazogc3RyaW5nIHwgbnVsbCxcbiAgIGZsYWdzOiBGbGFnW10sXG4gICBwb3NpdGlvbmFsczogc3RyaW5nW11cbik6IFBhcnNlZENvbmZpZ0FjdGl2aXR5IHtcbiAgIGNvbnN0IHBhcnNlZENvbmZpZzogUGFyc2VkQ29uZmlnQWN0aXZpdHkgPSB7XG4gICAgICByZWFkOiBbXSxcbiAgICAgIHdyaXRlOiBbLi4uY29sbGVjdFdyaXRlRmxhZ3MoZmxhZ3MpXSxcbiAgIH07XG5cbiAgIGlmICh0YXNrID09PSAnY29uZmlnJykge1xuICAgICAgYXBwZW5kUGFyc2VkQ29uZmlnQWN0aW9uKFxuICAgICAgICAgcGFyc2VkQ29uZmlnLFxuICAgICAgICAgZGV0ZWN0Q29uZmlnU2NvcGUoZmxhZ3MpLFxuICAgICAgICAgZGV0ZWN0Q29uZmlnQWN0aW9uKGZsYWdzLCBwb3NpdGlvbmFscylcbiAgICAgICk7XG4gICB9XG5cbiAgIHJldHVybiBwYXJzZWRDb25maWc7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZFBhcnNlZENvbmZpZ0FjdGlvbihcbiAgIHBhcnNlZENvbmZpZzogUGFyc2VkQ29uZmlnQWN0aXZpdHksXG4gICBzY29wZTogQ29uZmlnU2NvcGUsXG4gICBhY3Rpb246IENvbmZpZ09wZXJhdGlvbiB8IG51bGxcbikge1xuICAgaWYgKGFjdGlvbiA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgfVxuXG4gICBjb25zdCBjb25maWcgPSB0b09wZXJhdGlvbihzY29wZSwgYWN0aW9uKTtcbiAgIGlmIChhY3Rpb24uaXNXcml0ZSkge1xuICAgICAgcGFyc2VkQ29uZmlnLndyaXRlLnB1c2goY29uZmlnKTtcbiAgIH0gZWxzZSB7XG4gICAgICBwYXJzZWRDb25maWcucmVhZC5wdXNoKGNvbmZpZyk7XG4gICB9XG59XG4iLCAiLy8g4pSA4pSAIE9wdGlvbiB0YWJsZXMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4vL1xuLy8gRWFjaCBzY29wZSBoYXM6XG4vLyAgIHNob3J0ICDigJMgTWFwPGNoYXIsIGNvbnN1bWVzTmV4dD4gIChrbm93biBzaW5nbGUtbGV0dGVyIHN3aXRjaGVzOyB0cnVlID0gdGFrZXMgbmV4dCB0b2tlbilcbi8vICAgbG9uZyAgIOKAkyBTZXQ8c3RlbT4gICAgICAgICAgICAgICAgKGxvbmcgc3dpdGNoIHN0ZW1zLCB3aXRob3V0IC0tLCB0aGF0IHRha2UgdGhlIG5leHQgdG9rZW4pXG4vL1xuLy8gT25seSBzd2l0Y2hlcyBsaXN0ZWQgaGVyZSBhcmUgXCJrbm93blwiLiBBbiB1bmtub3duIGNoYXIgYW55d2hlcmUgaW4gYSBjb21iaW5lZFxuLy8gY2x1c3RlciBjYXVzZXMgdGhlIGVudGlyZSBjbHVzdGVyIHRvIGJlIGtlcHQgYXMgb25lIG9wYXF1ZSB0b2tlbi5cblxuZXhwb3J0IGludGVyZmFjZSBGbGFnU3BlYyB7XG4gICByZWFkb25seSBzaG9ydDogUmVhZG9ubHlNYXA8c3RyaW5nLCBib29sZWFuPjtcbiAgIHJlYWRvbmx5IGxvbmc6IFJlYWRvbmx5U2V0PHN0cmluZz47XG59XG5cbmNvbnN0IFVOSVZFUlNBTDogRmxhZ1NwZWMgPSB7XG4gICBzaG9ydDogbmV3IE1hcChbXG4gICAgICBbJ2MnLCB0cnVlXSwgLy8gIC1jIDxrPXY+ICAgIHNldCBjb25maWcga2V5IGZvciB0aGlzIGludm9jYXRpb25cbiAgIF0pLFxuICAgbG9uZzogbmV3IFNldCgpLFxufTtcblxuZXhwb3J0IGNvbnN0IEdMT0JBTDogRmxhZ1NwZWMgPSB7XG4gICBzaG9ydDogbmV3IE1hcChbXG4gICAgICBbJ0MnLCB0cnVlXSwgLy8gIC1DIDxwYXRoPiAgIGNoYW5nZSB3b3JraW5nIGRpcmVjdG9yeVxuICAgICAgWydQJywgZmFsc2VdLCAvLyAtUCAgICAgICAgICBubyBwYWdlciAoYWxpYXMgZm9yIC0tbm8tcGFnZXIpXG4gICAgICBbJ2gnLCBmYWxzZV0sIC8vIC1oICAgICAgICAgIGhlbHBcbiAgICAgIFsncCcsIGZhbHNlXSwgLy8gLXAgICAgICAgICAgcGFnaW5hdGVcbiAgICAgIFsndicsIGZhbHNlXSwgLy8gLXYgICAgICAgICAgdmVyc2lvblxuICAgICAgLi4uVU5JVkVSU0FMLnNob3J0LmVudHJpZXMoKSxcbiAgIF0pLFxuICAgbG9uZzogbmV3IFNldChbXG4gICAgICAnYXR0ci1zb3VyY2UnLFxuICAgICAgJ2NvbmZpZy1lbnYnLFxuICAgICAgJ2V4ZWMtcGF0aCcsXG4gICAgICAnZ2l0LWRpcicsXG4gICAgICAnbGlzdC1jbWRzJyxcbiAgICAgICduYW1lc3BhY2UnLFxuICAgICAgJ3N1cGVyLXByZWZpeCcsXG4gICAgICAnd29yay10cmVlJyxcbiAgIF0pLFxufTtcblxuY29uc3QgQ09NTUFORFM6IFJlY29yZDxzdHJpbmcsIEZsYWdTcGVjPiA9IHtcbiAgIGNsb25lOiB7XG4gICAgICBzaG9ydDogbmV3IE1hcChbXG4gICAgICAgICBbJ2InLCB0cnVlXSwgLy8gLWIgPGJyYW5jaD5cbiAgICAgICAgIFsnaicsIHRydWVdLCAvLyAtaiA8bj4gICAgICAgICAgcGFyYWxsZWwgam9ic1xuICAgICAgICAgWydsJywgZmFsc2VdLCAvLyAtbCBsb2NhbFxuICAgICAgICAgWyduJywgZmFsc2VdLCAvLyAtbiBuby1jaGVja291dFxuICAgICAgICAgWydvJywgdHJ1ZV0sIC8vIC1vIDxuYW1lPiAgICAgICByZW1vdGUgbmFtZVxuICAgICAgICAgWydxJywgZmFsc2VdLCAvLyAtcSBxdWlldFxuICAgICAgICAgWydzJywgZmFsc2VdLCAvLyAtcyBzaGFyZWRcbiAgICAgICAgIFsndScsIHRydWVdLCAvLyAtdSA8dXBsb2FkLXBhY2s+XG4gICAgICBdKSxcbiAgICAgIGxvbmc6IG5ldyBTZXQoWydicmFuY2gnLCAnY29uZmlnJywgJ2pvYnMnLCAnb3JpZ2luJywgJ3VwbG9hZC1wYWNrJywgJ3UnLCAndGVtcGxhdGUnXSksXG4gICB9LFxuICAgY29tbWl0OiB7XG4gICAgICBzaG9ydDogbmV3IE1hcChbXG4gICAgICAgICBbJ0MnLCB0cnVlXSwgLy8gLUMgPGNvbW1pdD4gIHJldXNlIG1lc3NhZ2VcbiAgICAgICAgIFsnRicsIHRydWVdLCAvLyAtRiA8ZmlsZT4gICAgcmVhZCBtZXNzYWdlIGZyb20gZmlsZVxuICAgICAgICAgWydjJywgdHJ1ZV0sIC8vIC1jIDxjb21taXQ+ICByZWVkaXQgbWVzc2FnZVxuICAgICAgICAgWydtJywgdHJ1ZV0sIC8vIC1tIDxtc2c+XG4gICAgICAgICBbJ3QnLCB0cnVlXSwgLy8gLXQgPHRlbXBsYXRlPlxuICAgICAgXSksXG4gICAgICBsb25nOiBuZXcgU2V0KFsnZmlsZScsICdtZXNzYWdlJywgJ3JlZWRpdC1tZXNzYWdlJywgJ3JldXNlLW1lc3NhZ2UnLCAndGVtcGxhdGUnXSksXG4gICB9LFxuICAgY29uZmlnOiB7XG4gICAgICBzaG9ydDogbmV3IE1hcChbXG4gICAgICAgICBbJ2UnLCBmYWxzZV0sIC8vIC1lICBvcGVuIGVkaXRvclxuICAgICAgICAgWydmJywgdHJ1ZV0sIC8vICAtZiA8ZmlsZT5cbiAgICAgICAgIFsnbCcsIGZhbHNlXSwgLy8gLWwgIGxpc3RcbiAgICAgIF0pLFxuICAgICAgbG9uZzogbmV3IFNldChbJ2Jsb2InLCAnY29tbWVudCcsICdkZWZhdWx0JywgJ2ZpbGUnLCAndHlwZScsICd2YWx1ZSddKSxcbiAgIH0sXG4gICBmZXRjaDoge1xuICAgICAgc2hvcnQ6IG5ldyBNYXAoKSxcbiAgICAgIGxvbmc6IG5ldyBTZXQoWyd1cGxvYWQtcGFjayddKSxcbiAgIH0sXG4gICBpbml0OiB7XG4gICAgICBzaG9ydDogbmV3IE1hcCgpLFxuICAgICAgbG9uZzogbmV3IFNldChbJ3RlbXBsYXRlJ10pLFxuICAgfSxcbiAgIHB1bGw6IHtcbiAgICAgIHNob3J0OiBuZXcgTWFwKCksXG4gICAgICBsb25nOiBuZXcgU2V0KFsndXBsb2FkLXBhY2snXSksXG4gICB9LFxuICAgcHVzaDoge1xuICAgICAgc2hvcnQ6IG5ldyBNYXAoKSxcbiAgICAgIGxvbmc6IG5ldyBTZXQoWydleGVjJywgJ3JlY2VpdmUtcGFjayddKSxcbiAgIH0sXG4gICByZWJhc2U6IHtcbiAgICAgIHNob3J0OiBuZXcgTWFwKFtcbiAgICAgICAgIFsnWCcsIHRydWVdLCAvLyAtWCA8b3B0aW9uPiAgIHN0cmF0ZWd5IG9wdGlvblxuICAgICAgICAgWydmJywgZmFsc2VdLCAvLyAtZiBmb3JjZS1yZWJhc2VcbiAgICAgICAgIFsnaScsIGZhbHNlXSwgLy8gLWkgaW50ZXJhY3RpdmVcbiAgICAgICAgIFsnaycsIGZhbHNlXSwgLy8gLWsga2VlcC1iYXNlXG4gICAgICAgICBbJ20nLCBmYWxzZV0sIC8vIC1tIG1lcmdlXG4gICAgICAgICBbJ24nLCBmYWxzZV0sIC8vIC1uIG5vLXN0YXRcbiAgICAgICAgIFsncScsIGZhbHNlXSwgLy8gLXEgcXVpZXRcbiAgICAgICAgIFsncicsIGZhbHNlXSwgLy8gLXIgcmViYXNlLW1lcmdlc1xuICAgICAgICAgWydzJywgdHJ1ZV0sIC8vIC1zIDxzdHJhdGVneT5cbiAgICAgICAgIFsndicsIGZhbHNlXSwgLy8gLXYgdmVyYm9zZVxuICAgICAgICAgWyd4JywgdHJ1ZV0sIC8vIC14IDxjbWQ+ICAgICAgZXhlY1xuICAgICAgXSksXG4gICAgICBsb25nOiBuZXcgU2V0KFsnZXhlYycsICdvbnRvJywgJ3N0cmF0ZWd5JywgJ3N0cmF0ZWd5LW9wdGlvbiddKSxcbiAgIH0sXG59O1xuXG5jb25zdCBFTVBUWTogRmxhZ1NwZWMgPSB7IHNob3J0OiBuZXcgTWFwKCksIGxvbmc6IG5ldyBTZXQoKSB9O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmxhZ1NwZWNGb3JUYXNrKHRhc2s/OiBzdHJpbmcgfCBudWxsKSB7XG4gICBjb25zdCBzcGVjID0gQ09NTUFORFNbdGFzayA/PyAnJ10gPz8gRU1QVFk7XG5cbiAgIHJldHVybiB7XG4gICAgICBzaG9ydDogbmV3IE1hcChbLi4uVU5JVkVSU0FMLnNob3J0LmVudHJpZXMoKSwgLi4uc3BlYy5zaG9ydC5lbnRyaWVzKCldKSxcbiAgICAgIGxvbmc6IHNwZWMubG9uZyxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHsgR0xPQkFMIH0gZnJvbSAnLi9mbGFnLXNwZWNzJztcblxuLyoqIFBhcnNlIGEgc2luZ2xlIHJhdyB0b2tlbiAoZS5nLiBgJy1tJ2AsIGAnLS1hbWVuZCdgLCBgJy11YydgKSBpbnRvIG9uZSBvclxuICogIG1vcmUgc3dpdGNoIGRlc2NyaXB0b3JzLiAgVmFsdWVzIGFyZSBub3QgeWV0IHJlc29sdmVkIGZvciBuZWVkc05leHQ9dHJ1ZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHBhbmRUb2tlbihcbiAgIHJhdzogc3RyaW5nLFxuICAgc3BlYyA9IEdMT0JBTFxuKTogQXJyYXk8e1xuICAgbmFtZTogc3RyaW5nO1xuICAgdmFsdWU/OiBzdHJpbmc7XG4gICBuZWVkc05leHQ6IGJvb2xlYW47XG59PiB7XG4gICBpZiAocmF3LnN0YXJ0c1dpdGgoJy0tJykpIHtcbiAgICAgIGNvbnN0IGVxID0gcmF3LmluZGV4T2YoJz0nKTtcbiAgICAgIGlmIChlcSA+IDIpIHtcbiAgICAgICAgIHJldHVybiBbeyBuYW1lOiByYXcuc2xpY2UoMCwgZXEpLCB2YWx1ZTogcmF3LnNsaWNlKGVxICsgMSksIG5lZWRzTmV4dDogZmFsc2UgfV07XG4gICAgICB9XG4gICAgICBjb25zdCBzdGVtID0gcmF3LnNsaWNlKDIpO1xuICAgICAgcmV0dXJuIFt7IG5hbWU6IHJhdywgbmVlZHNOZXh0OiBzcGVjLmxvbmcuaGFzKHN0ZW0pIH1dO1xuICAgfVxuXG4gICAvLyBTaW5nbGUgc2hvcnQgc3dpdGNoXG4gICBpZiAocmF3Lmxlbmd0aCA9PT0gMikge1xuICAgICAgY29uc3QgY2hhciA9IHJhdy5jaGFyQXQoMSk7XG4gICAgICBjb25zdCBjb25zdW1lcyA9IHNwZWMuc2hvcnQuZ2V0KGNoYXIpO1xuICAgICAgcmV0dXJuIFt7IG5hbWU6IHJhdywgbmVlZHNOZXh0OiBjb25zdW1lcyA9PT0gdHJ1ZSB9XTtcbiAgIH1cblxuICAgLy8gQ29tYmluZWQgc2hvcnQgY2x1c3RlcjogdHJ5IHRvIGV4cGFuZCBjaGFyLWJ5LWNoYXJcbiAgIHJldHVybiBleHBhbmRDbHVzdGVyKHJhdywgc3BlYy5zaG9ydCk7XG59XG5cbmZ1bmN0aW9uIGV4cGFuZENsdXN0ZXIoXG4gICByYXc6IHN0cmluZyxcbiAgIHNob3J0U3BlYzogUmVhZG9ubHlNYXA8c3RyaW5nLCBib29sZWFuPlxuKTogQXJyYXk8eyBuYW1lOiBzdHJpbmc7IHZhbHVlPzogc3RyaW5nOyBuZWVkc05leHQ6IGJvb2xlYW4gfT4ge1xuICAgY29uc3QgY2hhcnMgPSByYXcuc2xpY2UoMSkuc3BsaXQoJycpO1xuICAgY29uc3QgcmVzdWx0OiBBcnJheTx7IG5hbWU6IHN0cmluZzsgdmFsdWU/OiBzdHJpbmc7IG5lZWRzTmV4dDogYm9vbGVhbiB9PiA9IFtdO1xuXG4gICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjaGFyID0gY2hhcnNbaV07XG4gICAgICBjb25zdCBjb25zdW1lcyA9IHNob3J0U3BlYy5nZXQoY2hhcik7XG5cbiAgICAgIGlmIChjb25zdW1lcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAvLyBVbmtub3duIGNoYXI6IGtlZXAgdGhlIHdob2xlIHJhdyB0b2tlbiBhcyBvcGFxdWVcbiAgICAgICAgIHJldHVybiBbeyBuYW1lOiByYXcsIG5lZWRzTmV4dDogZmFsc2UgfV07XG4gICAgICB9XG5cbiAgICAgIGlmIChjb25zdW1lcykge1xuICAgICAgICAgY29uc3QgcmVtYWluZGVyID0gY2hhcnMuc2xpY2UoaSArIDEpLmpvaW4oJycpO1xuICAgICAgICAgaWYgKHJlbWFpbmRlcikge1xuICAgICAgICAgICAgY29uc3QgcmVtYWluZGVyQWxsS25vd24gPSBbLi4ucmVtYWluZGVyXS5ldmVyeSgoYykgPT4gc2hvcnRTcGVjLmhhcyhjKSk7XG4gICAgICAgICAgICBpZiAoIXJlbWFpbmRlckFsbEtub3duKSB7XG4gICAgICAgICAgICAgICAvLyBSZW1haW5pbmcgY2hhcnMgYXJlIHRoZSBlbWJlZGRlZCB2YWx1ZSwgbm90IHNlcGFyYXRlIGZsYWdzXG4gICAgICAgICAgICAgICByZXN1bHQucHVzaCh7IG5hbWU6IGAtJHtjaGFyfWAsIHZhbHVlOiByZW1haW5kZXIsIG5lZWRzTmV4dDogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXN1bHQucHVzaCh7IG5hbWU6IGAtJHtjaGFyfWAsIG5lZWRzTmV4dDogY29uc3VtZXMgfSk7XG4gICB9XG5cbiAgIHJldHVybiByZXN1bHQ7XG59XG4iLCAiaW1wb3J0IHsgZXhwYW5kVG9rZW4gfSBmcm9tICcuLi90b2tlbnMvdG9rZW4tZXhwYW5kZXInO1xuaW1wb3J0IHR5cGUgeyBGbGFnIH0gZnJvbSAnLi9mbGFncy5oZWxwZXJzJztcblxuZXhwb3J0IGludGVyZmFjZSBHbG9iYWxGbGFncyB7XG4gICBmbGFnczogRmxhZ1tdO1xuICAgdGFza0luZGV4OiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUdsb2JhbEZsYWdzKHRva2VuczogcmVhZG9ubHkgdW5rbm93bltdLCBmbGFnczogRmxhZ1tdID0gW10pOiBHbG9iYWxGbGFncyB7XG4gICBsZXQgaSA9IDA7XG5cbiAgIHdoaWxlIChpIDwgdG9rZW5zLmxlbmd0aCkge1xuICAgICAgY29uc3QgcmF3ID0gU3RyaW5nKHRva2Vuc1tpXSk7XG4gICAgICBpZiAoIXJhdy5zdGFydHNXaXRoKCctJykgfHwgcmF3Lmxlbmd0aCA8IDIpIGJyZWFrO1xuXG4gICAgICBjb25zdCBwYXJzZWQgPSBleHBhbmRUb2tlbihyYXcpO1xuICAgICAgbGV0IG5leHQgPSBpICsgMTtcblxuICAgICAgZm9yIChjb25zdCB0b2tlbiBvZiBwYXJzZWQpIHtcbiAgICAgICAgIGNvbnN0IGZsYWc6IEZsYWcgPSB7XG4gICAgICAgICAgICBuYW1lOiB0b2tlbi5uYW1lLFxuICAgICAgICAgICAgdmFsdWU6IHRva2VuLnZhbHVlLFxuICAgICAgICAgICAgYWJzb3JiZWROZXh0OiBmYWxzZSxcbiAgICAgICAgICAgIGlzR2xvYmFsOiB0cnVlLFxuICAgICAgICAgfTtcbiAgICAgICAgIGlmICh0b2tlbi5uZWVkc05leHQgJiYgZmxhZy52YWx1ZSA9PT0gdW5kZWZpbmVkICYmIG5leHQgPCB0b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBmbGFnLnZhbHVlID0gU3RyaW5nKHRva2Vuc1tuZXh0XSk7XG4gICAgICAgICAgICBmbGFnLmFic29yYmVkTmV4dCA9IHRydWU7XG4gICAgICAgICAgICBuZXh0Kys7XG4gICAgICAgICB9XG4gICAgICAgICBmbGFncy5wdXNoKGZsYWcpO1xuICAgICAgfVxuXG4gICAgICBpID0gbmV4dDtcbiAgIH1cblxuICAgcmV0dXJuIHsgZmxhZ3MsIHRhc2tJbmRleDogaSB9O1xufVxuIiwgImltcG9ydCB7IGlzUGF0aFNwZWMsIHRvUGF0aHMgfSBmcm9tICdAc2ltcGxlLWdpdC9hcmdzLXBhdGhzcGVjJztcblxuaW1wb3J0IHsgZ2V0RmxhZ1NwZWNGb3JUYXNrIH0gZnJvbSAnLi4vdG9rZW5zL2ZsYWctc3BlY3MnO1xuaW1wb3J0IHsgZXhwYW5kVG9rZW4gfSBmcm9tICcuLi90b2tlbnMvdG9rZW4tZXhwYW5kZXInO1xuaW1wb3J0IHR5cGUgeyBGbGFnIH0gZnJvbSAnLi9mbGFncy5oZWxwZXJzJztcblxudHlwZSBUYXNrRmxhZ3MgPSB7XG4gICBmbGFnczogRmxhZ1tdO1xuICAgcG9zaXRpb25hbHM6IHN0cmluZ1tdO1xuICAgcGF0aHNwZWNzOiBzdHJpbmdbXTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVRhc2tGbGFncyhcbiAgIHRva2VuczogcmVhZG9ubHkgdW5rbm93bltdLFxuICAgdGFzazogc3RyaW5nIHwgbnVsbCxcbiAgIGZsYWdzOiBGbGFnW10gPSBbXVxuKTogVGFza0ZsYWdzIHtcbiAgIGNvbnN0IHNwZWMgPSBnZXRGbGFnU3BlY0ZvclRhc2sodGFzayk7XG4gICBjb25zdCBwb3NpdGlvbmFsczogc3RyaW5nW10gPSBbXTtcbiAgIGNvbnN0IHBhdGhzcGVjczogc3RyaW5nW10gPSBbXTtcblxuICAgbGV0IGkgPSAwO1xuICAgd2hpbGUgKGkgPCB0b2tlbnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gdG9rZW5zW2ldO1xuXG4gICAgICBpZiAoaXNQYXRoU3BlYyhjdXJyZW50KSkge1xuICAgICAgICAgcGF0aHNwZWNzLnB1c2goLi4udG9QYXRocyhjdXJyZW50IGFzIHN0cmluZykpO1xuICAgICAgICAgaSsrO1xuICAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJhdyA9IFN0cmluZyhjdXJyZW50KTtcblxuICAgICAgaWYgKHJhdyA9PT0gJy0tJykge1xuICAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgdG9rZW5zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCB0ID0gdG9rZW5zW2pdO1xuICAgICAgICAgICAgaXNQYXRoU3BlYyh0KSA/IHBhdGhzcGVjcy5wdXNoKC4uLnRvUGF0aHModCBhcyBzdHJpbmcpKSA6IHBhdGhzcGVjcy5wdXNoKFN0cmluZyh0KSk7XG4gICAgICAgICB9XG4gICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKCFyYXcuc3RhcnRzV2l0aCgnLScpIHx8IHJhdy5sZW5ndGggPCAyKSB7XG4gICAgICAgICBwb3NpdGlvbmFscy5wdXNoKHJhdyk7XG4gICAgICAgICBpKys7XG4gICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFyc2VkID0gZXhwYW5kVG9rZW4ocmF3LCBzcGVjKTtcbiAgICAgIGxldCBuZXh0ID0gaSArIDE7XG5cbiAgICAgIGZvciAoY29uc3QgdG9rZW4gb2YgcGFyc2VkKSB7XG4gICAgICAgICBjb25zdCBmbGFnOiBGbGFnID0ge1xuICAgICAgICAgICAgbmFtZTogdG9rZW4ubmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiB0b2tlbi52YWx1ZSxcbiAgICAgICAgICAgIGFic29yYmVkTmV4dDogZmFsc2UsXG4gICAgICAgICAgICBpc0dsb2JhbDogZmFsc2UsXG4gICAgICAgICB9O1xuICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdG9rZW4ubmVlZHNOZXh0ICYmXG4gICAgICAgICAgICBmbGFnLnZhbHVlID09PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIG5leHQgPCB0b2tlbnMubGVuZ3RoICYmXG4gICAgICAgICAgICAhaXNQYXRoU3BlYyh0b2tlbnNbbmV4dF0pXG4gICAgICAgICApIHtcbiAgICAgICAgICAgIGZsYWcudmFsdWUgPSBTdHJpbmcodG9rZW5zW25leHRdKTtcbiAgICAgICAgICAgIGZsYWcuYWJzb3JiZWROZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgIG5leHQrKztcbiAgICAgICAgIH1cbiAgICAgICAgIGZsYWdzLnB1c2goZmxhZyk7XG4gICAgICB9XG5cbiAgICAgIGkgPSBuZXh0O1xuICAgfVxuXG4gICByZXR1cm4geyBmbGFncywgcG9zaXRpb25hbHMsIHBhdGhzcGVjcyB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgUGFyc2VkQ29uZmlnQWN0aXZpdHkgfSBmcm9tICcuLi9hcmdzL3BhcnNlLWFyZ3YudHlwZXMnO1xuaW1wb3J0IHR5cGUgeyBWdWxuZXJhYmlsaXR5LCBWdWxuZXJhYmlsaXR5Q2F0ZWdvcnkgfSBmcm9tICcuL3Z1bG5lcmFiaWxpdHkudHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24qIGRldGVjdFZ1bG5lcmFibGVDb25maWdXcml0ZXMoe1xuICAgd3JpdGUsXG59OiBQYXJzZWRDb25maWdBY3Rpdml0eSk6IEdlbmVyYXRvcjxWdWxuZXJhYmlsaXR5PiB7XG4gICBmb3IgKGNvbnN0IGNvbmZpZyBvZiB3cml0ZSkge1xuICAgICAgZm9yIChjb25zdCBoZWxwZXIgb2YgcHJldmVudFVuc2FmZUNvbmZpZykge1xuICAgICAgICAgY29uc3QgdnVsbmVyYWJpbGl0eSA9IGhlbHBlcihjb25maWcua2V5KTtcbiAgICAgICAgIGlmICh2dWxuZXJhYmlsaXR5KSB7XG4gICAgICAgICAgICB5aWVsZCB2dWxuZXJhYmlsaXR5O1xuICAgICAgICAgfVxuICAgICAgfVxuICAgfVxufVxuXG5mdW5jdGlvbiBwcmV2ZW50Q29uZmlnQnVpbGRlcihcbiAgIGNvbmZpZzogc3RyaW5nIHwgUmVnRXhwLFxuICAgY2F0ZWdvcnk6IFZ1bG5lcmFiaWxpdHlDYXRlZ29yeSxcbiAgIG1lc3NhZ2UgPSBTdHJpbmcoY29uZmlnKVxuKSB7XG4gICBjb25zdCByZWdleCA9IHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnID8gbmV3IFJlZ0V4cChgXFxcXHMqJHtjb25maWcudG9Mb3dlckNhc2UoKX1gKSA6IGNvbmZpZztcblxuICAgcmV0dXJuIGZ1bmN0aW9uIHByZXZlbnRDb21tYW5kKGtleTogc3RyaW5nKTogVnVsbmVyYWJpbGl0eSB8IHZvaWQge1xuICAgICAgaWYgKHJlZ2V4LnRlc3Qoa2V5KSkge1xuICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNhdGVnb3J5LFxuICAgICAgICAgICAgbWVzc2FnZTogYENvbmZpZ3VyaW5nICR7bWVzc2FnZX0gaXMgbm90IHBlcm1pdHRlZCB3aXRob3V0IGVuYWJsaW5nICR7Y2F0ZWdvcnl9YCxcbiAgICAgICAgIH07XG4gICAgICB9XG4gICB9O1xufVxuXG5mdW5jdGlvbiBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKGNvbmZpZzogc3RyaW5nLCBjYXRlZ29yeTogVnVsbmVyYWJpbGl0eUNhdGVnb3J5KSB7XG4gICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYFxcXFxzKiR7Y29uZmlnLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFwuL2csICcoLi4rKT8uJyl9YCk7XG4gICByZXR1cm4gcHJldmVudENvbmZpZ0J1aWxkZXIocmVnZXgsIGNhdGVnb3J5LCBjb25maWcpO1xufVxuXG5jb25zdCBwcmV2ZW50VW5zYWZlQ29uZmlnID0gW1xuICAgcHJldmVudENvbmZpZ0J1aWxkZXIoJ2FsaWFzJywgJ2FsbG93VW5zYWZlQWxpYXMnKSxcbiAgIHByZXZlbnRDb25maWdCdWlsZGVyKCdjb3JlLmFza1Bhc3MnLCAnYWxsb3dVbnNhZmVBc2tQYXNzJyksXG4gICBwcmV2ZW50Q29uZmlnQnVpbGRlcignY29yZS5lZGl0b3InLCAnYWxsb3dVbnNhZmVFZGl0b3InKSxcbiAgIHByZXZlbnRDb25maWdCdWlsZGVyKCdjb3JlLmZzbW9uaXRvcicsICdhbGxvd1Vuc2FmZUZzTW9uaXRvcicpLFxuICAgcHJldmVudENvbmZpZ0J1aWxkZXIoJ2NvcmUuZ2l0UHJveHknLCAnYWxsb3dVbnNhZmVHaXRQcm94eScpLFxuICAgcHJldmVudENvbmZpZ0J1aWxkZXIoJ2NvcmUuaG9va3NQYXRoJywgJ2FsbG93VW5zYWZlSG9va3NQYXRoJyksXG4gICBwcmV2ZW50Q29uZmlnQnVpbGRlcignY29yZS5wYWdlcicsICdhbGxvd1Vuc2FmZVBhZ2VyJyksXG4gICBwcmV2ZW50Q29uZmlnQnVpbGRlcignY29yZS5zc2hDb21tYW5kJywgJ2FsbG93VW5zYWZlU3NoQ29tbWFuZCcpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcignY3JlZGVudGlhbC5oZWxwZXInLCAnYWxsb3dVbnNhZmVDcmVkZW50aWFsSGVscGVyJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCdkaWZmLmNvbW1hbmQnLCAnYWxsb3dVbnNhZmVEaWZmRXh0ZXJuYWwnKSxcbiAgIHByZXZlbnRDb25maWdCdWlsZGVyKCdkaWZmLmV4dGVybmFsJywgJ2FsbG93VW5zYWZlRGlmZkV4dGVybmFsJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCdkaWZmdG9vbC5jbWQnLCAnYWxsb3dVbnNhZmVEaWZmRXh0ZXJuYWwnKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ2RpZmYudGV4dGNvbnYnLCAnYWxsb3dVbnNhZmVEaWZmVGV4dENvbnYnKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ2ZpbHRlci5jbGVhbicsICdhbGxvd1Vuc2FmZUZpbHRlcicpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcignZmlsdGVyLnByb2Nlc3MnLCAnYWxsb3dVbnNhZmVGaWx0ZXInKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ2ZpbHRlci5zbXVkZ2UnLCAnYWxsb3dVbnNhZmVGaWx0ZXInKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ2dwZy5wcm9ncmFtJywgJ2FsbG93VW5zYWZlR3BnUHJvZ3JhbScpLFxuICAgcHJldmVudENvbmZpZ0J1aWxkZXIoJ2luY2x1ZGUucGF0aCcsICdhbGxvd1Vuc2FmZUluY2x1ZGUnKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ2luY2x1ZGVJZicsICdhbGxvd1Vuc2FmZUluY2x1ZGUnKSxcbiAgIHByZXZlbnRDb25maWdCdWlsZGVyKCdpbml0LnRlbXBsYXRlRGlyJywgJ2FsbG93VW5zYWZlVGVtcGxhdGVEaXInKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ3BhZ2VyLicsICdhbGxvd1Vuc2FmZVBhZ2VyJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCdtZXJnZS5kcml2ZXInLCAnYWxsb3dVbnNhZmVNZXJnZURyaXZlcicpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcignbWVyZ2V0b29sLnBhdGgnLCAnYWxsb3dVbnNhZmVNZXJnZURyaXZlcicpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcignbWVyZ2V0b29sLmNtZCcsICdhbGxvd1Vuc2FmZU1lcmdlRHJpdmVyJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCdwcm90b2NvbC5hbGxvdycsICdhbGxvd1Vuc2FmZVByb3RvY29sT3ZlcnJpZGUnKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ3JlbW90ZS5yZWNlaXZlcGFjaycsICdhbGxvd1Vuc2FmZVBhY2snKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ3JlbW90ZS51cGxvYWRwYWNrJywgJ2FsbG93VW5zYWZlUGFjaycpLFxuICAgcHJldmVudENvbmZpZ0J1aWxkZXIoJ3VwbG9hZHBhY2sucGFja09iamVjdHNIb29rJywgJ2FsbG93VW5zYWZlUGFjaycpLFxuICAgcHJldmVudENvbmZpZ0J1aWxkZXIoJ3NlcXVlbmNlLmVkaXRvcicsICdhbGxvd1Vuc2FmZUVkaXRvcicpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcignc3VibW9kdWxlLnVwZGF0ZScsICdhbGxvd1Vuc2FmZVN1Ym1vZHVsZScpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcigndGFyLmNvbW1hbmQnLCAnYWxsb3dVbnNhZmVDb21tYW5kQmluYXJpZXMnKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ3RyYWlsZXIuY21kJywgJ2FsbG93VW5zYWZlQ29tbWFuZEJpbmFyaWVzJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCd0cmFpbGVyLmNvbW1hbmQnLCAnYWxsb3dVbnNhZmVDb21tYW5kQmluYXJpZXMnKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ3VybC5pbnN0ZWFkT2YnLCAnYWxsb3dVbnNhZmVVcmxSZXdyaXRlJyksXG5dO1xuIiwgImltcG9ydCB0eXBlIHsgRmxhZyB9IGZyb20gJy4uL2ZsYWdzL2ZsYWdzLmhlbHBlcnMnO1xuaW1wb3J0IHR5cGUgeyBWdWxuZXJhYmlsaXR5LCBWdWxuZXJhYmlsaXR5Q2F0ZWdvcnkgfSBmcm9tICcuL3Z1bG5lcmFiaWxpdHkudHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24qIGRldGVjdFZ1bG5lcmFibGVGbGFncyhcbiAgIHRhc2s6IG51bGwgfCBzdHJpbmcsXG4gICBmbGFnczogRmxhZ1tdXG4pOiBHZW5lcmF0b3I8VnVsbmVyYWJpbGl0eT4ge1xuICAgZm9yIChjb25zdCBmbGFnIG9mIGZsYWdzKSB7XG4gICAgICBmb3IgKGNvbnN0IGhlbHBlciBvZiBwcmV2ZW50VW5zYWZlRmxhZ3MpIHtcbiAgICAgICAgIGNvbnN0IHZ1bG5lcmFiaWxpdHkgPSBoZWxwZXIodGFzaywgZmxhZyk7XG4gICAgICAgICBpZiAodnVsbmVyYWJpbGl0eSkge1xuICAgICAgICAgICAgeWllbGQgdnVsbmVyYWJpbGl0eTtcbiAgICAgICAgIH1cbiAgICAgIH1cbiAgIH1cbn1cblxuaW50ZXJmYWNlIFByZXZlbnRGbGFnT3B0aW9ucyB7XG4gICAvKiogTGFiZWwgdG8gdXNlIGluIHRoZSBlcnJvciBtZXNzYWdlIGluIHBsYWNlIG9mIHRoZSBtYXRjaGVyIGl0c2VsZiAqL1xuICAgbmFtZT86IHN0cmluZztcblxuICAgLyoqIE9ubHkgbWF0Y2ggd2hlbiB0aGUgc3dpdGNoIGFwcGVhcnMgYmVmb3JlIHRoZSBnaXQgc3ViLWNvbW1hbmQgKi9cbiAgIGdsb2JhbE9ubHk/OiBib29sZWFuO1xuXG4gICAvKipcbiAgICAqIE9ubHkgbWF0Y2ggd2hlbiB0aGUgc3dpdGNoIHdhcyBzdXBwbGllZCB3aXRoIGEgdmFsdWUgLSB3aXRob3V0IG9uZSBzd2l0Y2hlc1xuICAgICogc3VjaCBhcyBgLS1naXQtZGlyYCBhbmQgYC0tZXhlYy1wYXRoYCBhcmUgZ2V0dGVycyByYXRoZXIgdGhhbiBzZXR0ZXJzLlxuICAgICovXG4gICB3aXRoVmFsdWU/OiBib29sZWFuO1xufVxuXG5mdW5jdGlvbiBwcmV2ZW50RmxhZ0J1aWxkZXIoXG4gICB0YXNrOiBzdHJpbmcgfCBudWxsLFxuICAgZmxhZzogc3RyaW5nIHwgUmVnRXhwLFxuICAgY2F0ZWdvcnk6IFZ1bG5lcmFiaWxpdHlDYXRlZ29yeSxcbiAgIHsgbmFtZSA9IFN0cmluZyhmbGFnKSwgZ2xvYmFsT25seSA9IGZhbHNlLCB3aXRoVmFsdWUgPSBmYWxzZSB9OiBQcmV2ZW50RmxhZ09wdGlvbnMgPSB7fVxuKSB7XG4gICBjb25zdCByZWdleCA9IHR5cGVvZiBmbGFnID09PSAnc3RyaW5nJyA/IG5ldyBSZWdFeHAoYFxcXFxzKiR7ZmxhZy50b0xvd2VyQ2FzZSgpfWApIDogZmxhZztcbiAgIGNvbnN0IG1lc3NhZ2UgPSBgVXNlIG9mICR7dGFzayA/IGAke3Rhc2t9IHdpdGggb3B0aW9uIGAgOiAnJ30ke25hbWV9IGlzIG5vdCBwZXJtaXR0ZWQgd2l0aG91dCBlbmFibGluZyAke2NhdGVnb3J5fWA7XG5cbiAgIHJldHVybiBmdW5jdGlvbiBwcmV2ZW50RmxhZyhjdXJyZW50VGFzazogc3RyaW5nIHwgbnVsbCwgZmxhZzogRmxhZyk6IFZ1bG5lcmFiaWxpdHkgfCB2b2lkIHtcbiAgICAgIGlmICh0YXNrICYmIGN1cnJlbnRUYXNrICE9PSB0YXNrKSB7XG4gICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChnbG9iYWxPbmx5ICYmICFmbGFnLmlzR2xvYmFsKSB7XG4gICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh3aXRoVmFsdWUgJiYgZmxhZy52YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWdleC50ZXN0KGZsYWcubmFtZSkpIHtcbiAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjYXRlZ29yeSxcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICB9O1xuICAgICAgfVxuICAgfTtcbn1cblxuY29uc3QgcGF0aFRha2luZ0dsb2JhbDogUHJldmVudEZsYWdPcHRpb25zID0geyBnbG9iYWxPbmx5OiB0cnVlLCB3aXRoVmFsdWU6IHRydWUgfTtcblxuY29uc3QgcHJldmVudFVuc2FmZUZsYWdzID0gW1xuICAgcHJldmVudEZsYWdCdWlsZGVyKG51bGwsIC8tLSh1cGxvYWR8cmVjZWl2ZSktcGFjay8sICdhbGxvd1Vuc2FmZVBhY2snLCB7XG4gICAgICBuYW1lOiAnLS11cGxvYWQtcGFjayBvciAtLXJlY2VpdmUtcGFjaycsXG4gICB9KSxcbiAgIHByZXZlbnRGbGFnQnVpbGRlcignY2xvbmUnLCAvXi1cXHcqdS8sICdhbGxvd1Vuc2FmZVBhY2snKSxcbiAgIHByZXZlbnRGbGFnQnVpbGRlcignY2xvbmUnLCAnLS11JywgJ2FsbG93VW5zYWZlUGFjaycpLFxuICAgcHJldmVudEZsYWdCdWlsZGVyKCdwdXNoJywgL14tLWV4ZWMkLywgJ2FsbG93VW5zYWZlUGFjaycsIHsgbmFtZTogJy0tZXhlYycgfSksXG4gICAvLyBgZ2l0YCBhY2NlcHRzIHVuYW1iaWd1b3VzIGFiYnJldmlhdGlvbnMgb2YgbG9uZyBvcHRpb25zLCBzbyBgLS1leGAgYW5kIGAtLWV4ZWAgYXJlIGAtLWV4ZWNgXG4gICBwcmV2ZW50RmxhZ0J1aWxkZXIoJ3JlYmFzZScsIC9eKC14fC0tZXgoZWM/KT8pJC8sICdhbGxvd1Vuc2FmZUV4ZWMnLCB7IG5hbWU6ICcteCBvciAtLWV4ZWMnIH0pLFxuICAgcHJldmVudEZsYWdCdWlsZGVyKG51bGwsICctLXRlbXBsYXRlJywgJ2FsbG93VW5zYWZlVGVtcGxhdGVEaXInKSxcbiAgIHByZXZlbnRGbGFnQnVpbGRlcihudWxsLCAnLS1leGVjLXBhdGgnLCAnYWxsb3dVbnNhZmVFeGVjJywgcGF0aFRha2luZ0dsb2JhbCksXG4gICAvLyBgZ2l0YCByZWFkcyB0aGUgY29uZmlndXJhdGlvbiBvZiB3aGljaGV2ZXIgcmVwb3NpdG9yeSB0aGVzZSBuYW1lLCBzbyB0aGVcbiAgIC8vIGRpcmVjdG9yeSBhbG9uZSBpcyBlbm91Z2ggdG8gZGVsaXZlciBjb25maWcgdGhlIGFyZ3YgZ3VhcmRzIG5ldmVyIHNlZVxuICAgcHJldmVudEZsYWdCdWlsZGVyKG51bGwsICctLWdpdC1kaXInLCAnYWxsb3dVbnNhZmVDb25maWdQYXRocycsIHBhdGhUYWtpbmdHbG9iYWwpLFxuICAgcHJldmVudEZsYWdCdWlsZGVyKG51bGwsICctLXdvcmstdHJlZScsICdhbGxvd1Vuc2FmZUNvbmZpZ1BhdGhzJywgcGF0aFRha2luZ0dsb2JhbCksXG4gICBwcmV2ZW50RmxhZ0J1aWxkZXIobnVsbCwgL14tQyQvLCAnYWxsb3dVbnNhZmVDb25maWdQYXRocycsIHsgLi4ucGF0aFRha2luZ0dsb2JhbCwgbmFtZTogJy1DJyB9KSxcbl07XG4iLCAiaW1wb3J0IHR5cGUgeyBQYXJzZWRDb25maWdBY3Rpdml0eSB9IGZyb20gJy4uL2FyZ3MvcGFyc2UtYXJndi50eXBlcyc7XG5pbXBvcnQgdHlwZSB7IEZsYWcgfSBmcm9tICcuLi9mbGFncy9mbGFncy5oZWxwZXJzJztcbmltcG9ydCB7IGRldGVjdFZ1bG5lcmFibGVDb25maWdXcml0ZXMgfSBmcm9tICcuL2RldGVjdC12dWxuZXJhYmxlLWNvbmZpZy13cml0ZXMnO1xuaW1wb3J0IHsgZGV0ZWN0VnVsbmVyYWJsZUZsYWdzIH0gZnJvbSAnLi9kZXRlY3QtdnVsbmVyYWJsZS1mbGFncyc7XG5pbXBvcnQgdHlwZSB7IFZ1bG5lcmFiaWxpdHkgfSBmcm9tICcuL3Z1bG5lcmFiaWxpdHkudHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gdnVsbmVyYWJpbGl0eUFuYWx5c2lzKFxuICAgdGFzazogbnVsbCB8IHN0cmluZyxcbiAgIGZsYWdzOiBGbGFnW10sXG4gICBjb25maWc6IFBhcnNlZENvbmZpZ0FjdGl2aXR5XG4pOiBWdWxuZXJhYmlsaXR5W10ge1xuICAgcmV0dXJuIFsuLi5kZXRlY3RWdWxuZXJhYmxlRmxhZ3ModGFzaywgZmxhZ3MpLCAuLi5kZXRlY3RWdWxuZXJhYmxlQ29uZmlnV3JpdGVzKGNvbmZpZyldO1xufVxuIiwgImltcG9ydCB7IGNvbGxlY3RDb25maWdBY2Nlc3MgfSBmcm9tICcuLi9jb25maWcvYW5hbHlzZS1jb25maWcnO1xuaW1wb3J0IHR5cGUgeyBGbGFnIH0gZnJvbSAnLi4vZmxhZ3MvZmxhZ3MuaGVscGVycyc7XG5pbXBvcnQgeyBwYXJzZUdsb2JhbEZsYWdzIH0gZnJvbSAnLi4vZmxhZ3MvcGFyc2UtZ2xvYmFsLWZsYWdzJztcbmltcG9ydCB7IHBhcnNlVGFza0ZsYWdzIH0gZnJvbSAnLi4vZmxhZ3MvcGFyc2UtdGFzay1mbGFncyc7XG5pbXBvcnQgdHlwZSB7IFZ1bG5lcmFiaWxpdHkgfSBmcm9tICcuLi92dWxuZXJhYmlsaXRpZXMvdnVsbmVyYWJpbGl0eS50eXBlcyc7XG5pbXBvcnQgeyB2dWxuZXJhYmlsaXR5QW5hbHlzaXMgfSBmcm9tICcuLi92dWxuZXJhYmlsaXRpZXMvdnVsbmVyYWJpbGl0eS1hbmFseXNpcyc7XG5pbXBvcnQgdHlwZSB7IFBhcnNlZEFyZ3YsIFBhcnNlZEZsYWcgfSBmcm9tICcuL3BhcnNlLWFyZ3YudHlwZXMnO1xuXG4vKipcbiAqIFBhcnNlIHRoZSB0b2tlbnMgdGhhdCB3b3VsZCBiZSBmb3J3YXJkZWQgdG8gYSBgZ2l0YCBjaGlsZC1wcm9jZXNzIGFuZFxuICogcmV0dXJuIGEgc3RydWN0dXJlZCBzdW1tYXJ5IG9mIHdoYXQgdGhlIGludm9jYXRpb24gZG9lcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQXJndiguLi50b2tlbnM6IHJlYWRvbmx5IHVua25vd25bXSk6IFBhcnNlZEFyZ3Yge1xuICAgY29uc3QgeyBmbGFncywgdGFza0luZGV4IH0gPSBwYXJzZUdsb2JhbEZsYWdzKHRva2Vucyk7XG5cbiAgIGNvbnN0IHRhc2sgPSB0YXNrSW5kZXggPCB0b2tlbnMubGVuZ3RoID8gU3RyaW5nKHRva2Vuc1t0YXNrSW5kZXhdKS50b0xvd2VyQ2FzZSgpIDogbnVsbDtcbiAgIGNvbnN0IHRhc2tUb2tlbnMgPSB0YXNrICE9PSBudWxsID8gdG9rZW5zLnNsaWNlKHRhc2tJbmRleCArIDEpIDogW107XG5cbiAgIGNvbnN0IHsgcG9zaXRpb25hbHMsIHBhdGhzcGVjcyB9ID0gcGFyc2VUYXNrRmxhZ3ModGFza1Rva2VucywgdGFzaywgZmxhZ3MpO1xuICAgY29uc3QgY29uZmlnID0gY29sbGVjdENvbmZpZ0FjY2Vzcyh0YXNrLCBmbGFncywgcG9zaXRpb25hbHMpO1xuXG4gICByZXR1cm4ge1xuICAgICAgdGFzayxcbiAgICAgIGZsYWdzOiBmbGFncy5tYXAodG9QYXJzZWRGbGFnKSxcbiAgICAgIHBhdGhzOiBwYXRoc3BlY3MsXG4gICAgICBjb25maWcsXG4gICAgICB2dWxuZXJhYmlsaXRpZXM6IHZ1bG5lcmFiaWxpdHlMaXN0KHZ1bG5lcmFiaWxpdHlBbmFseXNpcyh0YXNrLCBmbGFncywgY29uZmlnKSksXG4gICB9O1xufVxuXG5mdW5jdGlvbiB2dWxuZXJhYmlsaXR5TGlzdCh2dWxuZXJhYmlsaXRpZXM6IFZ1bG5lcmFiaWxpdHlbXSkge1xuICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2dWxuZXJhYmlsaXRpZXMsICd2dWxuZXJhYmlsaXRpZXMnLCB7XG4gICAgICB2YWx1ZTogdnVsbmVyYWJpbGl0aWVzLFxuICAgfSk7XG59XG5cbmZ1bmN0aW9uIHRvUGFyc2VkRmxhZyh7IHZhbHVlLCBuYW1lIH06IEZsYWcpOiBQYXJzZWRGbGFnIHtcbiAgIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8geyBuYW1lLCB2YWx1ZSB9IDogeyBuYW1lIH07XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBDb25maWdXcml0ZSwgUGFyc2VkQ29uZmlnQWN0aXZpdHkgfSBmcm9tICcuLi9hcmdzL3BhcnNlLWFyZ3YudHlwZXMnO1xuaW1wb3J0IHR5cGUgeyBWdWxuZXJhYmlsaXR5LCBWdWxuZXJhYmlsaXR5Q2F0ZWdvcnkgfSBmcm9tICcuLi92dWxuZXJhYmlsaXRpZXMvdnVsbmVyYWJpbGl0eS50eXBlcyc7XG5pbXBvcnQgeyB2dWxuZXJhYmlsaXR5QW5hbHlzaXMgfSBmcm9tICcuLi92dWxuZXJhYmlsaXRpZXMvdnVsbmVyYWJpbGl0eS1hbmFseXNpcyc7XG5cbmNvbnN0IEdpdEVudktleXMgPSB7XG4gICAnZWRpdG9yJzogJ2FsbG93VW5zYWZlRWRpdG9yJyxcbiAgICdnaXRfYXNrcGFzcyc6ICdhbGxvd1Vuc2FmZUFza1Bhc3MnLFxuICAgJ2dpdF9jb25maWdfZ2xvYmFsJzogJ2FsbG93VW5zYWZlQ29uZmlnUGF0aHMnLFxuICAgJ2dpdF9jb25maWdfc3lzdGVtJzogJ2FsbG93VW5zYWZlQ29uZmlnUGF0aHMnLFxuICAgJ2dpdF9jb25maWdfY291bnQnOiAnYWxsb3dVbnNhZmVDb25maWdFbnZDb3VudCcsXG4gICAnZ2l0X2NvbmZpZ19wYXJhbWV0ZXJzJzogJ2FsbG93VW5zYWZlQ29uZmlnRW52Q291bnQnLFxuICAgJ2dpdF9jb25maWcnOiAnYWxsb3dVbnNhZmVDb25maWdQYXRocycsXG4gICAnZ2l0X2VkaXRvcic6ICdhbGxvd1Vuc2FmZUVkaXRvcicsXG4gICAnZ2l0X2V4ZWNfcGF0aCc6ICdhbGxvd1Vuc2FmZUV4ZWMnLFxuICAgJ2dpdF9leHRlcm5hbF9kaWZmJzogJ2FsbG93VW5zYWZlRGlmZkV4dGVybmFsJyxcbiAgICdnaXRfcGFnZXInOiAnYWxsb3dVbnNhZmVQYWdlcicsXG4gICAnZ2l0X3Byb3h5X2NvbW1hbmQnOiAnYWxsb3dVbnNhZmVHaXRQcm94eScsXG4gICAnZ2l0X3RlbXBsYXRlX2Rpcic6ICdhbGxvd1Vuc2FmZVRlbXBsYXRlRGlyJyxcbiAgICdnaXRfc2VxdWVuY2VfZWRpdG9yJzogJ2FsbG93VW5zYWZlRWRpdG9yJyxcbiAgICdnaXRfc3NoJzogJ2FsbG93VW5zYWZlU3NoQ29tbWFuZCcsXG4gICAnZ2l0X3NzaF9jb21tYW5kJzogJ2FsbG93VW5zYWZlU3NoQ29tbWFuZCcsXG4gICAncGFnZXInOiAnYWxsb3dVbnNhZmVQYWdlcicsXG4gICAncHJlZml4JzogJ2FsbG93VW5zYWZlQ29uZmlnUGF0aHMnLFxuICAgJ3NzaF9hc2twYXNzJzogJ2FsbG93VW5zYWZlQXNrUGFzcycsXG4gICAndmlzdWFsJzogJ2FsbG93VW5zYWZlRWRpdG9yJyxcbn0gYXMgY29uc3Qgc2F0aXNmaWVzIFJlY29yZDxzdHJpbmcsIFZ1bG5lcmFiaWxpdHlDYXRlZ29yeT47XG5cbnR5cGUgR2l0RW52ID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPiAmIHtcbiAgIGdpdF9jb25maWdfY291bnQ/OiBzdHJpbmc7XG59O1xuXG5mdW5jdGlvbiogY29sbGVjdENvbmZpZ0J5Q291bnQoZW52OiBHaXRFbnYpOiBHZW5lcmF0b3I8Q29uZmlnV3JpdGU+IHtcbiAgIGNvbnN0IGNvdW50ID0gcGFyc2VJbnQoZW52LmdpdF9jb25maWdfY291bnQgPz8gJzAnLCAxMCk7XG4gICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY291bnQ7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IGtleSA9IGVudltgZ2l0X2NvbmZpZ19rZXlfJHtpbmRleH1gXTtcbiAgICAgIGNvbnN0IHZhbHVlID0gZW52W2BnaXRfY29uZmlnX3ZhbHVlXyR7aW5kZXh9YF07XG5cbiAgICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgeWllbGQgeyBrZXk6IGtleS50b0xvd2VyQ2FzZSgpLnRyaW0oKSwgdmFsdWUsIHNjb3BlOiAnZW52JyB9O1xuICAgICAgfVxuICAgfVxufVxuXG5mdW5jdGlvbiogY29sbGVjdENvbmZpZ1Z1bG5lcmFiaWxpdGllcyhlbnY6IEdpdEVudik6IEdlbmVyYXRvcjxWdWxuZXJhYmlsaXR5PiB7XG4gICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhlbnYpKSB7XG4gICAgICBpZiAoaXNHaXRFbnZLZXkoa2V5KSkge1xuICAgICAgICAgY29uc3QgY2F0ZWdvcnkgPSBHaXRFbnZLZXlzW2tleV07XG4gICAgICAgICB5aWVsZCB7XG4gICAgICAgICAgICBjYXRlZ29yeSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGBVc2Ugb2YgXCIke2tleS50b1VwcGVyQ2FzZSgpfVwiIGlzIG5vdCBwZXJtaXR0ZWQgd2l0aG91dCBlbmFibGluZyAke2NhdGVnb3J5fWAsXG4gICAgICAgICB9O1xuICAgICAgfVxuICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNHaXRFbnZLZXkoa2V5OiBzdHJpbmcpOiBrZXkgaXMga2V5b2YgdHlwZW9mIEdpdEVudktleXMge1xuICAgcmV0dXJuIE9iamVjdC5oYXNPd24oR2l0RW52S2V5cywga2V5KTtcbn1cblxuZnVuY3Rpb24gcHJlcGFyZUVudihlbnY6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogR2l0RW52IHtcbiAgIGNvbnN0IGdpdEVudjogR2l0RW52ID0ge307XG4gICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhlbnYpKSB7XG4gICAgICBjb25zdCBlbnZLZXkgPSBrZXkudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICAgICBpZiAoaXNHaXRFbnZLZXkoZW52S2V5KSB8fCBlbnZLZXkuc3RhcnRzV2l0aCgnZ2l0JykpIHtcbiAgICAgICAgIGdpdEVudltlbnZLZXldID0gU3RyaW5nKHZhbHVlKTtcbiAgICAgIH1cbiAgIH1cbiAgIHJldHVybiBnaXRFbnY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUVudihyYXc6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSB7XG4gICBjb25zdCBlbnYgPSBwcmVwYXJlRW52KHJhdyk7XG4gICBjb25zdCBjb25maWc6IFBhcnNlZENvbmZpZ0FjdGl2aXR5ID0ge1xuICAgICAgcmVhZDogW10sXG4gICAgICB3cml0ZTogWy4uLmNvbGxlY3RDb25maWdCeUNvdW50KGVudildLFxuICAgfTtcbiAgIGNvbnN0IHZ1bG5lcmFiaWxpdGllcyA9IFtcbiAgICAgIC4uLmNvbGxlY3RDb25maWdWdWxuZXJhYmlsaXRpZXMoZW52KSxcbiAgICAgIC4uLnZ1bG5lcmFiaWxpdHlBbmFseXNpcyhudWxsLCBbXSwgY29uZmlnKSxcbiAgIF07XG5cbiAgIHJldHVybiB7XG4gICAgICBjb25maWcsXG4gICAgICB2dWxuZXJhYmlsaXRpZXMsXG4gICB9O1xufVxuIiwgImltcG9ydCB7IHBhcnNlQXJndiB9IGZyb20gJy4uL2FyZ3MvcGFyc2UtYXJndic7XG5pbXBvcnQgeyBwYXJzZUVudiB9IGZyb20gJy4uL2Vudi9wYXJzZS1lbnYnO1xuXG4vKipcbiAqIFJldHJpZXZlcyBqdXN0IHRoZSB2dWxuZXJhYmlsaXRpZXMgaWRlbnRpZmllZCBpbiB0aGUgc3VwcGxpZWQgdmFyYXJncyB0b2tlbnNcbiAqIGFuZCBlbnZpcm9ubWVudCB2YXJpYWJsZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2dWxuZXJhYmlsaXR5Q2hlY2sodG9rZW5zOiByZWFkb25seSBzdHJpbmdbXSwgZW52OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikge1xuICAgcmV0dXJuIFsuLi5wYXJzZUFyZ3YoLi4udG9rZW5zKS52dWxuZXJhYmlsaXRpZXMsIC4uLnBhcnNlRW52KGVudikudnVsbmVyYWJpbGl0aWVzXTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFNpbXBsZUdpdFRhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogVGhlIGBHaXRFcnJvcmAgaXMgdGhyb3duIHdoZW4gdGhlIHVuZGVybHlpbmcgYGdpdGAgcHJvY2VzcyB0aHJvd3MgYVxuICogZmF0YWwgZXhjZXB0aW9uIChlZyBhbiBgRU5PRU5UYCBleGNlcHRpb24gd2hlbiBhdHRlbXB0aW5nIHRvIHVzZSBhXG4gKiBub24td3JpdGFibGUgZGlyZWN0b3J5IGFzIHRoZSByb290IGZvciB5b3VyIHJlcG8pLCBhbmQgYWN0cyBhcyB0aGVcbiAqIGJhc2UgY2xhc3MgZm9yIG1vcmUgc3BlY2lmaWMgZXJyb3JzIHRocm93biBieSB0aGUgcGFyc2luZyBvZiB0aGVcbiAqIGdpdCByZXNwb25zZSBvciBlcnJvcnMgaW4gdGhlIGNvbmZpZ3VyYXRpb24gb2YgdGhlIHRhc2sgYWJvdXQgdG9cbiAqIGJlIHJ1bi5cbiAqXG4gKiBXaGVuIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24sIHBlbmRpbmcgdGFza3MgaW4gdGhlIHNhbWUgaW5zdGFuY2Ugd2lsbFxuICogbm90IGJlIGV4ZWN1dGVkLiBUaGUgcmVjb21tZW5kZWQgd2F5IHRvIHJ1biBhIHNlcmllcyBvZiB0YXNrcyB0aGF0XG4gKiBjYW4gaW5kZXBlbmRlbnRseSBmYWlsIHdpdGhvdXQgbmVlZGluZyB0byBwcmV2ZW50IGZ1dHVyZSB0YXNrcyBmcm9tXG4gKiBydW5uaW5nIGlzIHRvIGNhdGNoIHRoZW0gaW5kaXZpZHVhbGx5OlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiBpbXBvcnQgeyBzaW1wbGVHaXQsIFNpbXBsZUdpdCwgR2l0RXJyb3IsIFB1bGxSZXN1bHQgfSBmcm9tICdzaW1wbGUtZ2l0JztcblxuIGZ1bmN0aW9uIGNhdGNoVGFzayAoZTogR2l0RXJyb3IpIHtcbiAgIHJldHVybiBlLlxuIH1cblxuIGNvbnN0IGdpdCA9IHNpbXBsZUdpdChyZXBvV29ya2luZ0Rpcik7XG4gY29uc3QgcHVsbGVkOiBQdWxsUmVzdWx0IHwgR2l0RXJyb3IgPSBhd2FpdCBnaXQucHVsbCgpLmNhdGNoKGNhdGNoVGFzayk7XG4gY29uc3QgcHVzaGVkOiBzdHJpbmcgfCBHaXRFcnJvciA9IGF3YWl0IGdpdC5wdXNoVGFncygpLmNhdGNoKGNhdGNoVGFzayk7XG4gYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBHaXRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHRhc2s/OiBTaW1wbGVHaXRUYXNrPGFueT4sXG4gICAgICBtZXNzYWdlPzogc3RyaW5nXG4gICApIHtcbiAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIG5ldy50YXJnZXQucHJvdG90eXBlKTtcbiAgIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IFNpbXBsZUdpdE9wdGlvbnMgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBHaXRFcnJvciB9IGZyb20gJy4vZ2l0LWVycm9yJztcblxuLyoqXG4gKiBUaGUgYEdpdENvbnN0cnVjdEVycm9yYCBpcyB0aHJvd24gd2hlbiBhbiBlcnJvciBvY2N1cnMgaW4gdGhlIGNvbnN0cnVjdG9yXG4gKiBvZiB0aGUgYHNpbXBsZS1naXRgIGluc3RhbmNlIGl0c2VsZi4gTW9zdCBjb21tb25seSBhcyBhIHJlc3VsdCBvZiB1c2luZ1xuICogYSBgYmFzZURpcmAgb3B0aW9uIHRoYXQgcG9pbnRzIHRvIGEgZm9sZGVyIHRoYXQgZWl0aGVyIGRvZXMgbm90IGV4aXN0LFxuICogb3IgY2Fubm90IGJlIHJlYWQgYnkgdGhlIHVzZXIgdGhlIG5vZGUgc2NyaXB0IGlzIHJ1bm5pbmcgYXMuXG4gKlxuICogQ2hlY2sgdGhlIGAubWVzc2FnZWAgcHJvcGVydHkgZm9yIG1vcmUgZGV0YWlsIGluY2x1ZGluZyB0aGUgcHJvcGVydGllc1xuICogcGFzc2VkIHRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAqL1xuZXhwb3J0IGNsYXNzIEdpdENvbnN0cnVjdEVycm9yIGV4dGVuZHMgR2l0RXJyb3Ige1xuICAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgY29uZmlnOiBTaW1wbGVHaXRPcHRpb25zLFxuICAgICAgbWVzc2FnZTogc3RyaW5nXG4gICApIHtcbiAgICAgIHN1cGVyKHVuZGVmaW5lZCwgbWVzc2FnZSk7XG4gICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRPcHRpb25zLCBTaW1wbGVHaXRUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgR2l0RXJyb3IgfSBmcm9tICcuL2dpdC1lcnJvcic7XG5cbmV4cG9ydCBjbGFzcyBHaXRQbHVnaW5FcnJvciBleHRlbmRzIEdpdEVycm9yIHtcbiAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHRhc2s/OiBTaW1wbGVHaXRUYXNrPGFueT4sXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgcGx1Z2luPzoga2V5b2YgU2ltcGxlR2l0T3B0aW9ucyxcbiAgICAgIG1lc3NhZ2U/OiBzdHJpbmdcbiAgICkge1xuICAgICAgc3VwZXIodGFzaywgbWVzc2FnZSk7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgbmV3LnRhcmdldC5wcm90b3R5cGUpO1xuICAgfVxufVxuIiwgImltcG9ydCB7IEdpdEVycm9yIH0gZnJvbSAnLi9naXQtZXJyb3InO1xuXG4vKipcbiAqIFRoZSBgR2l0UmVzcG9uc2VFcnJvcmAgaXMgdGhlIHdyYXBwZXIgZm9yIGEgcGFyc2VkIHJlc3BvbnNlIHRoYXQgaXMgdHJlYXRlZCBhc1xuICogYSBmYXRhbCBlcnJvciwgZm9yIGV4YW1wbGUgYXR0ZW1wdGluZyBhIGBtZXJnZWAgY2FuIGxlYXZlIHRoZSByZXBvIGluIGEgY29ycnVwdGVkXG4gKiBzdGF0ZSB3aGVuIHRoZXJlIGFyZSBjb25mbGljdHMgc28gdGhlIHRhc2sgd2lsbCByZWplY3QgcmF0aGVyIHRoYW4gcmVzb2x2ZS5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgY2F0Y2hpbmcgdGhlIG1lcmdlIGNvbmZsaWN0IGV4Y2VwdGlvbjpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gaW1wb3J0IHsgc2ltcGxlR2l0LCBTaW1wbGVHaXQsIEdpdFJlc3BvbnNlRXJyb3IsIE1lcmdlU3VtbWFyeSB9IGZyb20gJ3NpbXBsZS1naXQnO1xuXG4gY29uc3QgZ2l0ID0gc2ltcGxlR2l0KHJlcG9Sb290KTtcbiBjb25zdCBtZXJnZU9wdGlvbnM6IHN0cmluZ1tdID0gWyctLW5vLWZmJywgJ290aGVyLWJyYW5jaCddO1xuIGNvbnN0IG1lcmdlU3VtbWFyeTogTWVyZ2VTdW1tYXJ5ID0gYXdhaXQgZ2l0Lm1lcmdlKG1lcmdlT3B0aW9ucylcbiAgICAgIC5jYXRjaCgoZTogR2l0UmVzcG9uc2VFcnJvcjxNZXJnZVN1bW1hcnk+KSA9PiBlLmdpdCk7XG5cbiBpZiAobWVyZ2VTdW1tYXJ5LmZhaWxlZCkge1xuICAgLy8gZGVhbCB3aXRoIHRoZSBlcnJvclxuIH1cbiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIEdpdFJlc3BvbnNlRXJyb3I8VCA9IGFueT4gZXh0ZW5kcyBHaXRFcnJvciB7XG4gICBjb25zdHJ1Y3RvcihcbiAgICAgIC8qKlxuICAgICAgICogYC5naXRgIGFjY2VzcyB0aGUgcGFyc2VkIHJlc3BvbnNlIHRoYXQgaXMgdHJlYXRlZCBhcyBiZWluZyBhbiBlcnJvclxuICAgICAgICovXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgZ2l0OiBULFxuICAgICAgbWVzc2FnZT86IHN0cmluZ1xuICAgKSB7XG4gICAgICBzdXBlcih1bmRlZmluZWQsIG1lc3NhZ2UgfHwgU3RyaW5nKGdpdCkpO1xuICAgfVxufVxuIiwgImltcG9ydCB7IEdpdEVycm9yIH0gZnJvbSAnLi9naXQtZXJyb3InO1xuXG4vKipcbiAqIFRoZSBgVGFza0NvbmZpZ3VyYXRpb25FcnJvcmAgaXMgdGhyb3duIHdoZW4gYSBjb21tYW5kIHdhcyBpbmNvcnJlY3RseVxuICogY29uZmlndXJlZC4gQW4gZXJyb3Igb2YgdGhpcyBraW5kIG1lYW5zIHRoYXQgbm8gYXR0ZW1wdCB3YXMgbWFkZSB0b1xuICogcnVuIHlvdXIgY29tbWFuZCB0aHJvdWdoIHRoZSB1bmRlcmx5aW5nIGBnaXRgIGJpbmFyeS5cbiAqXG4gKiBDaGVjayB0aGUgYC5tZXNzYWdlYCBwcm9wZXJ0eSBmb3IgbW9yZSBkZXRhaWwgb24gd2h5IHlvdXIgY29uZmlndXJhdGlvblxuICogcmVzdWx0ZWQgaW4gYW4gZXJyb3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBUYXNrQ29uZmlndXJhdGlvbkVycm9yIGV4dGVuZHMgR2l0RXJyb3Ige1xuICAgY29uc3RydWN0b3IobWVzc2FnZT86IHN0cmluZykge1xuICAgICAgc3VwZXIodW5kZWZpbmVkLCBtZXNzYWdlKTtcbiAgIH1cbn1cbiIsICJpbXBvcnQgeyBleGlzdHMsIEZPTERFUiB9IGZyb20gJ0Brd3NpdGVzL2ZpbGUtZXhpc3RzJztcblxuaW1wb3J0IHR5cGUgeyBNYXliZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGZpbHRlckhhc0xlbmd0aCB9IGZyb20gJy4vYXJndW1lbnQtZmlsdGVycyc7XG5cbnR5cGUgQ2FsbGFibGUgPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB1bmtub3duO1xuXG5leHBvcnQgY29uc3QgTlVMTCA9ICdcXDAnO1xuXG5leHBvcnQgY29uc3QgTk9PUDogQ2FsbGFibGUgPSAoKSA9PiB7fTtcblxuLyoqXG4gKiBSZXR1cm5zIGVpdGhlciB0aGUgc291cmNlIGFyZ3VtZW50IHdoZW4gaXQgaXMgYSBgRnVuY3Rpb25gLCBvciB0aGUgZGVmYXVsdFxuICogYE5PT1BgIGZ1bmN0aW9uIGNvbnN0YW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc0Z1bmN0aW9uPFQ+KHNvdXJjZTogVCB8IHVua25vd24pOiBDYWxsYWJsZSB7XG4gICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIE5PT1A7XG4gICB9XG4gICByZXR1cm4gc291cmNlIGFzIENhbGxhYmxlO1xufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3VwcGxpZWQgYXJndW1lbnQgaXMgYm90aCBhIGZ1bmN0aW9uLCBhbmQgaXMgbm90XG4gKiB0aGUgYE5PT1BgIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNVc2VyRnVuY3Rpb248VCBleHRlbmRzIEZ1bmN0aW9uPihzb3VyY2U6IFQgfCB1bmtub3duKTogc291cmNlIGlzIFQge1xuICAgcmV0dXJuIHR5cGVvZiBzb3VyY2UgPT09ICdmdW5jdGlvbicgJiYgc291cmNlICE9PSBOT09QO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BsaXRPbihpbnB1dDogc3RyaW5nLCBjaGFyOiBzdHJpbmcpOiBbc3RyaW5nLCBzdHJpbmddIHtcbiAgIGNvbnN0IGluZGV4ID0gaW5wdXQuaW5kZXhPZihjaGFyKTtcbiAgIGlmIChpbmRleCA8PSAwKSB7XG4gICAgICByZXR1cm4gW2lucHV0LCAnJ107XG4gICB9XG5cbiAgIHJldHVybiBbaW5wdXQuc3Vic3RyKDAsIGluZGV4KSwgaW5wdXQuc3Vic3RyKGluZGV4ICsgMSldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlyc3Q8VCBleHRlbmRzIHVua25vd25bXT4oaW5wdXQ6IFQsIG9mZnNldD86IG51bWJlcik6IE1heWJlPFRbbnVtYmVyXT47XG5leHBvcnQgZnVuY3Rpb24gZmlyc3Q8VCBleHRlbmRzIElBcmd1bWVudHM+KGlucHV0OiBULCBvZmZzZXQ/OiBudW1iZXIpOiBNYXliZTx1bmtub3duPjtcbmV4cG9ydCBmdW5jdGlvbiBmaXJzdChpbnB1dDogdW5rbm93bltdIHwgSUFyZ3VtZW50cywgb2Zmc2V0ID0gMCk6IE1heWJlPHVua25vd24+IHtcbiAgIHJldHVybiBpc0FycmF5TGlrZShpbnB1dCkgJiYgaW5wdXQubGVuZ3RoID4gb2Zmc2V0ID8gaW5wdXRbb2Zmc2V0XSA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxhc3Q8VCBleHRlbmRzIHVua25vd25bXT4oaW5wdXQ6IFQsIG9mZnNldD86IG51bWJlcik6IE1heWJlPFRbbnVtYmVyXT47XG5leHBvcnQgZnVuY3Rpb24gbGFzdDxUIGV4dGVuZHMgSUFyZ3VtZW50cz4oaW5wdXQ6IFQsIG9mZnNldD86IG51bWJlcik6IE1heWJlPHVua25vd24+O1xuZXhwb3J0IGZ1bmN0aW9uIGxhc3Q8VD4oaW5wdXQ6IFQsIG9mZnNldD86IG51bWJlcik6IE1heWJlPHVua25vd24+O1xuZXhwb3J0IGZ1bmN0aW9uIGxhc3QoaW5wdXQ6IHVua25vd24sIG9mZnNldCA9IDApIHtcbiAgIGlmIChpc0FycmF5TGlrZShpbnB1dCkgJiYgaW5wdXQubGVuZ3RoID4gb2Zmc2V0KSB7XG4gICAgICByZXR1cm4gaW5wdXRbaW5wdXQubGVuZ3RoIC0gMSAtIG9mZnNldF07XG4gICB9XG59XG5cbnR5cGUgQXJyYXlMaWtlPFQ+ID0gVFtdIHwgSUFyZ3VtZW50cyB8IHsgW2luZGV4OiBudW1iZXJdOiBUOyBsZW5ndGg6IG51bWJlciB9O1xuXG5mdW5jdGlvbiBpc0FycmF5TGlrZShpbnB1dDogdW5rbm93bik6IGlucHV0IGlzIEFycmF5TGlrZTx1bmtub3duPiB7XG4gICByZXR1cm4gZmlsdGVySGFzTGVuZ3RoKGlucHV0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvTGluZXNXaXRoQ29udGVudChpbnB1dCA9ICcnLCB0cmltbWVkID0gdHJ1ZSwgc2VwYXJhdG9yID0gJ1xcbicpOiBzdHJpbmdbXSB7XG4gICByZXR1cm4gaW5wdXQuc3BsaXQoc2VwYXJhdG9yKS5yZWR1Y2UoKG91dHB1dCwgbGluZSkgPT4ge1xuICAgICAgY29uc3QgbGluZUNvbnRlbnQgPSB0cmltbWVkID8gbGluZS50cmltKCkgOiBsaW5lO1xuICAgICAgaWYgKGxpbmVDb250ZW50KSB7XG4gICAgICAgICBvdXRwdXQucHVzaChsaW5lQ29udGVudCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0cHV0O1xuICAgfSwgW10gYXMgc3RyaW5nW10pO1xufVxuXG50eXBlIExpbmVXaXRoQ29udGVudENhbGxiYWNrPFQgPSB2b2lkPiA9IChsaW5lOiBzdHJpbmcpID0+IFQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoTGluZVdpdGhDb250ZW50PFQ+KFxuICAgaW5wdXQ6IHN0cmluZyxcbiAgIGNhbGxiYWNrOiBMaW5lV2l0aENvbnRlbnRDYWxsYmFjazxUPlxuKTogVFtdIHtcbiAgIHJldHVybiB0b0xpbmVzV2l0aENvbnRlbnQoaW5wdXQsIHRydWUpLm1hcCgobGluZSkgPT4gY2FsbGJhY2sobGluZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9sZGVyRXhpc3RzKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgcmV0dXJuIGV4aXN0cyhwYXRoLCBGT0xERVIpO1xufVxuXG4vKipcbiAqIEFkZHMgYGl0ZW1gIGludG8gdGhlIGB0YXJnZXRgIGBBcnJheWAgb3IgYFNldGAgd2hlbiBpdCBpcyBub3QgYWxyZWFkeSBwcmVzZW50IGFuZCByZXR1cm5zIHRoZSBgaXRlbWAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmQ8VD4odGFyZ2V0OiBUW10gfCBTZXQ8VD4sIGl0ZW06IFQpOiB0eXBlb2YgaXRlbSB7XG4gICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICBpZiAoIXRhcmdldC5pbmNsdWRlcyhpdGVtKSkge1xuICAgICAgICAgdGFyZ2V0LnB1c2goaXRlbSk7XG4gICAgICB9XG4gICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0LmFkZChpdGVtKTtcbiAgIH1cbiAgIHJldHVybiBpdGVtO1xufVxuXG4vKipcbiAqIEFkZHMgYGl0ZW1gIGludG8gdGhlIGB0YXJnZXRgIGBBcnJheWAgd2hlbiBpdCBpcyBub3QgYWxyZWFkeSBwcmVzZW50IGFuZCByZXR1cm5zIHRoZSBgdGFyZ2V0YC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluY2x1ZGluZzxUPih0YXJnZXQ6IFRbXSwgaXRlbTogVCk6IHR5cGVvZiB0YXJnZXQge1xuICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSAmJiAhdGFyZ2V0LmluY2x1ZGVzKGl0ZW0pKSB7XG4gICAgICB0YXJnZXQucHVzaChpdGVtKTtcbiAgIH1cblxuICAgcmV0dXJuIHRhcmdldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZTxUPih0YXJnZXQ6IFNldDxUPiB8IFRbXSwgaXRlbTogVCk6IFQge1xuICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgY29uc3QgaW5kZXggPSB0YXJnZXQuaW5kZXhPZihpdGVtKTtcbiAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICB0YXJnZXQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQuZGVsZXRlKGl0ZW0pO1xuICAgfVxuICAgcmV0dXJuIGl0ZW07XG59XG5cbmV4cG9ydCBjb25zdCBvYmplY3RUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcpIGFzIChcbiAgIGlucHV0OiB1bmtub3duXG4pID0+IHN0cmluZztcblxuZXhwb3J0IGZ1bmN0aW9uIGFzQXJyYXk8VD4oc291cmNlOiBUIHwgVFtdKTogVFtdIHtcbiAgIHJldHVybiBBcnJheS5pc0FycmF5KHNvdXJjZSkgPyBzb3VyY2UgOiBbc291cmNlXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzQ2FtZWxDYXNlKHN0cjogc3RyaW5nKSB7XG4gICByZXR1cm4gc3RyLnJlcGxhY2UoL1tcXHMtXSsoLikvZywgKF9hbGwsIGNocikgPT4ge1xuICAgICAgcmV0dXJuIGNoci50b1VwcGVyQ2FzZSgpO1xuICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc1N0cmluZ0FycmF5PFQ+KHNvdXJjZTogVCB8IFRbXSk6IHN0cmluZ1tdIHtcbiAgIHJldHVybiBhc0FycmF5KHNvdXJjZSkubWFwKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4gaXRlbSBpbnN0YW5jZW9mIFN0cmluZyA/IChpdGVtIGFzIHN0cmluZykgOiBTdHJpbmcoaXRlbSk7XG4gICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzTnVtYmVyKHNvdXJjZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCwgb25OYU4gPSAwKSB7XG4gICBpZiAoc291cmNlID09IG51bGwpIHtcbiAgICAgIHJldHVybiBvbk5hTjtcbiAgIH1cblxuICAgY29uc3QgbnVtID0gcGFyc2VJbnQoc291cmNlLCAxMCk7XG4gICByZXR1cm4gTnVtYmVyLmlzTmFOKG51bSkgPyBvbk5hTiA6IG51bTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZWZpeGVkQXJyYXk8VD4oaW5wdXQ6IFRbXSwgcHJlZml4OiBUKTogVFtdIHtcbiAgIGNvbnN0IG91dHB1dDogVFtdID0gW107XG4gICBmb3IgKGxldCBpID0gMCwgbWF4ID0gaW5wdXQubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcbiAgICAgIG91dHB1dC5wdXNoKHByZWZpeCwgaW5wdXRbaV0pO1xuICAgfVxuICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1ZmZlclRvU3RyaW5nKGlucHV0OiBCdWZmZXIgfCBCdWZmZXJbXSk6IHN0cmluZyB7XG4gICByZXR1cm4gKEFycmF5LmlzQXJyYXkoaW5wdXQpID8gQnVmZmVyLmNvbmNhdChpbnB1dCkgOiBpbnB1dCkudG9TdHJpbmcoJ3V0Zi04Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBieXRlTGVuZ3RoKGlucHV0Pzogc3RyaW5nIHwgQnVmZmVyKSB7XG4gICBpZiAoIWlucHV0KSB7XG4gICAgICByZXR1cm4gMDtcbiAgIH1cblxuICAgcmV0dXJuIEJ1ZmZlci5pc0J1ZmZlcihpbnB1dCkgPyBpbnB1dC5sZW5ndGggOiBCdWZmZXIuYnl0ZUxlbmd0aChpbnB1dCk7XG59XG5cbi8qKlxuICogR2V0IGEgbmV3IG9iamVjdCBmcm9tIGEgc291cmNlIG9iamVjdCB3aXRoIG9ubHkgdGhlIGxpc3RlZCBwcm9wZXJ0aWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGljazxULCBLIGV4dGVuZHMga2V5b2YgVD4oc291cmNlOiBULCBwcm9wZXJ0aWVzOiByZWFkb25seSBLW10pIHtcbiAgIGNvbnN0IG91dDogUGFydGlhbDxQaWNrPFQsIEs+PiA9IHt9O1xuXG4gICBwcm9wZXJ0aWVzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKHNvdXJjZVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgIG91dFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICB9KTtcblxuICAgcmV0dXJuIG91dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGF5KGR1cmF0aW9uID0gMCk6IFByb21pc2U8dm9pZD4ge1xuICAgcmV0dXJuIG5ldyBQcm9taXNlKChkb25lKSA9PiBzZXRUaW1lb3V0KGRvbmUsIGR1cmF0aW9uKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvclZvaWQ8VD4oaW5wdXQ6IFQgfCBmYWxzZSkge1xuICAgaWYgKGlucHV0ID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgIH1cbiAgIHJldHVybiBpbnB1dDtcbn1cbiIsICJpbXBvcnQgeyBpc1BhdGhTcGVjIH0gZnJvbSAnQHNpbXBsZS1naXQvYXJncy1wYXRoc3BlYyc7XG5cbmltcG9ydCB0eXBlIHsgTWF5YmUsIE9wdGlvbnMsIFByaW1pdGl2ZXMgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBvYmplY3RUb1N0cmluZyB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCB0eXBlIEFyZ3VtZW50RmlsdGVyUHJlZGljYXRlPFQ+ID0gKGlucHV0OiBUIHwgdW5rbm93bikgPT4gaW5wdXQgaXMgVDtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlclR5cGU8VCwgSz4oXG4gICBpbnB1dDogSyxcbiAgIGZpbHRlcjogQXJndW1lbnRGaWx0ZXJQcmVkaWNhdGU8VD5cbik6IEsgZXh0ZW5kcyBUID8gVCA6IHVuZGVmaW5lZDtcbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJUeXBlPFQsIEs+KGlucHV0OiBLLCBmaWx0ZXI6IEFyZ3VtZW50RmlsdGVyUHJlZGljYXRlPFQ+LCBkZWY6IFQpOiBUO1xuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlclR5cGU8VCwgSz4oaW5wdXQ6IEssIGZpbHRlcjogQXJndW1lbnRGaWx0ZXJQcmVkaWNhdGU8VD4sIGRlZj86IFQpOiBNYXliZTxUPiB7XG4gICBpZiAoZmlsdGVyKGlucHV0KSkge1xuICAgICAgcmV0dXJuIGlucHV0O1xuICAgfVxuICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAyID8gZGVmIDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgY29uc3QgZmlsdGVyQXJyYXk6IEFyZ3VtZW50RmlsdGVyUHJlZGljYXRlPEFycmF5PHVua25vd24+PiA9IChcbiAgIGlucHV0XG4pOiBpbnB1dCBpcyBBcnJheTx1bmtub3duPiA9PiB7XG4gICByZXR1cm4gQXJyYXkuaXNBcnJheShpbnB1dCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyUHJpbWl0aXZlcyhcbiAgIGlucHV0OiB1bmtub3duLFxuICAgb21pdD86IEFycmF5PCdib29sZWFuJyB8ICdzdHJpbmcnIHwgJ251bWJlcic+XG4pOiBpbnB1dCBpcyBQcmltaXRpdmVzIHtcbiAgIGNvbnN0IHR5cGUgPSBpc1BhdGhTcGVjKGlucHV0KSA/ICdzdHJpbmcnIDogdHlwZW9mIGlucHV0O1xuXG4gICByZXR1cm4gKFxuICAgICAgL251bWJlcnxzdHJpbmd8Ym9vbGVhbi8udGVzdCh0eXBlKSAmJlxuICAgICAgKCFvbWl0IHx8ICFvbWl0LmluY2x1ZGVzKHR5cGUgYXMgJ2Jvb2xlYW4nIHwgJ3N0cmluZycgfCAnbnVtYmVyJykpXG4gICApO1xufVxuXG5leHBvcnQgY29uc3QgZmlsdGVyTnVtYmVyOiBBcmd1bWVudEZpbHRlclByZWRpY2F0ZTxudW1iZXI+ID0gKGlucHV0OiB1bmtub3duKTogaW5wdXQgaXMgbnVtYmVyID0+IHtcbiAgIHJldHVybiB0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInO1xufTtcblxuZXhwb3J0IGNvbnN0IGZpbHRlclN0cmluZzogQXJndW1lbnRGaWx0ZXJQcmVkaWNhdGU8c3RyaW5nPiA9IChpbnB1dDogdW5rbm93bik6IGlucHV0IGlzIHN0cmluZyA9PiB7XG4gICByZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJyB8fCBpc1BhdGhTcGVjKGlucHV0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBmaWx0ZXJTdHJpbmdPckJ1ZmZlcjogQXJndW1lbnRGaWx0ZXJQcmVkaWNhdGU8c3RyaW5nIHwgQnVmZmVyPiA9IChcbiAgIGlucHV0OiB1bmtub3duXG4pOiBpbnB1dCBpcyBzdHJpbmcgfCBCdWZmZXIgPT4ge1xuICAgcmV0dXJuIGZpbHRlclN0cmluZyhpbnB1dCkgfHwgQnVmZmVyLmlzQnVmZmVyKGlucHV0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBmaWx0ZXJTdHJpbmdPclN0cmluZ0FycmF5OiBBcmd1bWVudEZpbHRlclByZWRpY2F0ZTxzdHJpbmcgfCBzdHJpbmdbXT4gPSAoXG4gICBpbnB1dFxuKTogaW5wdXQgaXMgc3RyaW5nIHwgc3RyaW5nW10gPT4ge1xuICAgcmV0dXJuIGZpbHRlclN0cmluZyhpbnB1dCkgfHwgKEFycmF5LmlzQXJyYXkoaW5wdXQpICYmIGlucHV0LmV2ZXJ5KGZpbHRlclN0cmluZykpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlclBsYWluT2JqZWN0PFQgZXh0ZW5kcyBPcHRpb25zPihpbnB1dDogVCB8IHVua25vd24pOiBpbnB1dCBpcyBUO1xuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlclBsYWluT2JqZWN0PFQgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj4oXG4gICBpbnB1dDogVCB8IHVua25vd25cbik6IGlucHV0IGlzIFQge1xuICAgcmV0dXJuICEhaW5wdXQgJiYgb2JqZWN0VG9TdHJpbmcoaW5wdXQpID09PSAnW29iamVjdCBPYmplY3RdJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlckZ1bmN0aW9uKGlucHV0OiB1bmtub3duKTogaW5wdXQgaXMgKC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdW5rbm93biB7XG4gICByZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgY29uc3QgZmlsdGVySGFzTGVuZ3RoOiBBcmd1bWVudEZpbHRlclByZWRpY2F0ZTx7IGxlbmd0aDogbnVtYmVyIH0+ID0gKFxuICAgaW5wdXRcbik6IGlucHV0IGlzIHsgbGVuZ3RoOiBudW1iZXIgfSA9PiB7XG4gICBpZiAoaW5wdXQgPT0gbnVsbCB8fCAnbnVtYmVyfGJvb2xlYW58ZnVuY3Rpb24nLmluY2x1ZGVzKHR5cGVvZiBpbnB1dCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgIH1cblxuICAgcmV0dXJuIHR5cGVvZiAoaW5wdXQgYXMgeyBsZW5ndGg/OiBudW1iZXIgfSkubGVuZ3RoID09PSAnbnVtYmVyJztcbn07XG4iLCAiLyoqXG4gKiBLbm93biBwcm9jZXNzIGV4aXQgY29kZXMgdXNlZCBieSB0aGUgdGFzayBwYXJzZXJzIHRvIGRldGVybWluZSB3aGV0aGVyIGFuIGVycm9yXG4gKiB3YXMgb25lIHRoZXkgY2FuIGF1dG9tYXRpY2FsbHkgaGFuZGxlXG4gKi9cbmV4cG9ydCBlbnVtIEV4aXRDb2RlcyB7XG4gICBTVUNDRVNTLFxuICAgRVJST1IsXG4gICBOT1RfRk9VTkQgPSAtMixcbiAgIFVOQ0xFQU4gPSAxMjgsXG59XG4iLCAiaW1wb3J0IHR5cGUgeyBUYXNrUmVzcG9uc2VGb3JtYXQgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBHaXRPdXRwdXRTdHJlYW1zPFQgZXh0ZW5kcyBUYXNrUmVzcG9uc2VGb3JtYXQgPSBCdWZmZXI+IHtcbiAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHJlYWRvbmx5IHN0ZE91dDogVCxcbiAgICAgIHB1YmxpYyByZWFkb25seSBzdGRFcnI6IFRcbiAgICkge31cblxuICAgYXNTdHJpbmdzKCk6IEdpdE91dHB1dFN0cmVhbXM8c3RyaW5nPiB7XG4gICAgICByZXR1cm4gbmV3IEdpdE91dHB1dFN0cmVhbXModGhpcy5zdGRPdXQudG9TdHJpbmcoJ3V0ZjgnKSwgdGhpcy5zdGRFcnIudG9TdHJpbmcoJ3V0ZjgnKSk7XG4gICB9XG59XG4iLCAiZnVuY3Rpb24gdXNlTWF0Y2hlc0RlZmF1bHQoKSB7XG4gICB0aHJvdyBuZXcgRXJyb3IoYExpbmVQYXJzZXI6dXNlTWF0Y2hlcyBub3QgaW1wbGVtZW50ZWRgKTtcbn1cblxuZXhwb3J0IGNsYXNzIExpbmVQYXJzZXI8VD4ge1xuICAgcHJvdGVjdGVkIG1hdGNoZXM6IHN0cmluZ1tdID0gW107XG4gICBwcm90ZWN0ZWQgdXNlTWF0Y2hlczogKHRhcmdldDogVCwgbWF0Y2g6IHN0cmluZ1tdKSA9PiBib29sZWFuIHwgdm9pZCA9IHVzZU1hdGNoZXNEZWZhdWx0O1xuXG4gICBwcml2YXRlIF9yZWdFeHA6IFJlZ0V4cFtdO1xuXG4gICBjb25zdHJ1Y3RvcihcbiAgICAgIHJlZ0V4cDogUmVnRXhwIHwgUmVnRXhwW10sXG4gICAgICB1c2VNYXRjaGVzPzogKHRhcmdldDogVCwgbWF0Y2g6IHN0cmluZ1tdKSA9PiBib29sZWFuIHwgdm9pZFxuICAgKSB7XG4gICAgICB0aGlzLl9yZWdFeHAgPSBBcnJheS5pc0FycmF5KHJlZ0V4cCkgPyByZWdFeHAgOiBbcmVnRXhwXTtcbiAgICAgIGlmICh1c2VNYXRjaGVzKSB7XG4gICAgICAgICB0aGlzLnVzZU1hdGNoZXMgPSB1c2VNYXRjaGVzO1xuICAgICAgfVxuICAgfVxuXG4gICBwYXJzZSA9IChsaW5lOiAob2Zmc2V0OiBudW1iZXIpID0+IHN0cmluZyB8IHVuZGVmaW5lZCwgdGFyZ2V0OiBUKTogYm9vbGVhbiA9PiB7XG4gICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuXG4gICAgICBpZiAoIXRoaXMuX3JlZ0V4cC5ldmVyeSgocmVnLCBpbmRleCkgPT4gdGhpcy5hZGRNYXRjaChyZWcsIGluZGV4LCBsaW5lKGluZGV4KSkpKSB7XG4gICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnVzZU1hdGNoZXModGFyZ2V0LCB0aGlzLnByZXBhcmVNYXRjaGVzKCkpICE9PSBmYWxzZTtcbiAgIH07XG5cbiAgIHByb3RlY3RlZCByZXNldE1hdGNoZXMoKSB7XG4gICAgICB0aGlzLm1hdGNoZXMubGVuZ3RoID0gMDtcbiAgIH1cblxuICAgcHJvdGVjdGVkIHByZXBhcmVNYXRjaGVzKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWF0Y2hlcztcbiAgIH1cblxuICAgcHJvdGVjdGVkIGFkZE1hdGNoKHJlZzogUmVnRXhwLCBpbmRleDogbnVtYmVyLCBsaW5lPzogc3RyaW5nKSB7XG4gICAgICBjb25zdCBtYXRjaGVkID0gbGluZSAmJiByZWcuZXhlYyhsaW5lKTtcbiAgICAgIGlmIChtYXRjaGVkKSB7XG4gICAgICAgICB0aGlzLnB1c2hNYXRjaChpbmRleCwgbWF0Y2hlZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAhIW1hdGNoZWQ7XG4gICB9XG5cbiAgIHByb3RlY3RlZCBwdXNoTWF0Y2goX2luZGV4OiBudW1iZXIsIG1hdGNoZWQ6IHN0cmluZ1tdKSB7XG4gICAgICB0aGlzLm1hdGNoZXMucHVzaCguLi5tYXRjaGVkLnNsaWNlKDEpKTtcbiAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlbW90ZUxpbmVQYXJzZXI8VD4gZXh0ZW5kcyBMaW5lUGFyc2VyPFQ+IHtcbiAgIHByb3RlY3RlZCBhZGRNYXRjaChyZWc6IFJlZ0V4cCwgaW5kZXg6IG51bWJlciwgbGluZT86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIC9ecmVtb3RlOlxccy8udGVzdChTdHJpbmcobGluZSkpICYmIHN1cGVyLmFkZE1hdGNoKHJlZywgaW5kZXgsIGxpbmUpO1xuICAgfVxuXG4gICBwcm90ZWN0ZWQgcHVzaE1hdGNoKGluZGV4OiBudW1iZXIsIG1hdGNoZWQ6IHN0cmluZ1tdKSB7XG4gICAgICBpZiAoaW5kZXggPiAwIHx8IG1hdGNoZWQubGVuZ3RoID4gMSkge1xuICAgICAgICAgc3VwZXIucHVzaE1hdGNoKGluZGV4LCBtYXRjaGVkKTtcbiAgICAgIH1cbiAgIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IFNpbXBsZUdpdE9wdGlvbnMgfSBmcm9tICcuLi90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zOiBPbWl0PFNpbXBsZUdpdE9wdGlvbnMsICdiYXNlRGlyJz4gPSB7XG4gICBiaW5hcnk6ICdnaXQnLFxuICAgbWF4Q29uY3VycmVudFByb2Nlc3NlczogNSxcbiAgIGNvbmZpZzogW10sXG4gICB0cmltbWVkOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZUNvbmZpZyhcbiAgIC4uLm9wdGlvbnM6IEFycmF5PFBhcnRpYWw8U2ltcGxlR2l0T3B0aW9ucz4gfCB1bmRlZmluZWQ+XG4pOiBTaW1wbGVHaXRPcHRpb25zIHtcbiAgIGNvbnN0IGJhc2VEaXIgPSBwcm9jZXNzLmN3ZCgpO1xuICAgY29uc3QgY29uZmlnOiBTaW1wbGVHaXRPcHRpb25zID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHsgYmFzZURpciwgLi4uZGVmYXVsdE9wdGlvbnMgfSxcbiAgICAgIC4uLm9wdGlvbnMuZmlsdGVyKChvKSA9PiB0eXBlb2YgbyA9PT0gJ29iamVjdCcgJiYgbylcbiAgICk7XG5cbiAgIGNvbmZpZy5iYXNlRGlyID0gY29uZmlnLmJhc2VEaXIgfHwgYmFzZURpcjtcbiAgIGNvbmZpZy50cmltbWVkID0gY29uZmlnLnRyaW1tZWQgPT09IHRydWU7XG5cbiAgIHJldHVybiBjb25maWc7XG59XG4iLCAiaW1wb3J0IHsgaXNQYXRoU3BlYyB9IGZyb20gJ0BzaW1wbGUtZ2l0L2FyZ3MtcGF0aHNwZWMnO1xuXG5pbXBvcnQgdHlwZSB7IE1heWJlLCBPcHRpb25zIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHtcbiAgIGZpbHRlckFycmF5LFxuICAgZmlsdGVyRnVuY3Rpb24sXG4gICBmaWx0ZXJQbGFpbk9iamVjdCxcbiAgIGZpbHRlclByaW1pdGl2ZXMsXG4gICBmaWx0ZXJUeXBlLFxufSBmcm9tICcuL2FyZ3VtZW50LWZpbHRlcnMnO1xuaW1wb3J0IHsgYXNGdW5jdGlvbiwgYXNTdHJpbmdBcnJheSwgaXNVc2VyRnVuY3Rpb24sIGxhc3QgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kVGFza09wdGlvbnM8VCBleHRlbmRzIE9wdGlvbnMgPSBPcHRpb25zPihcbiAgIG9wdGlvbnM6IE1heWJlPFQ+LFxuICAgY29tbWFuZHM6IHN0cmluZ1tdID0gW11cbik6IHN0cmluZ1tdIHtcbiAgIGlmICghZmlsdGVyUGxhaW5PYmplY3Q8T3B0aW9ucz4ob3B0aW9ucykpIHtcbiAgICAgIHJldHVybiBjb21tYW5kcztcbiAgIH1cblxuICAgcmV0dXJuIE9iamVjdC5rZXlzKG9wdGlvbnMpLnJlZHVjZSgoY29tbWFuZHM6IHN0cmluZ1tdLCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBvcHRpb25zW2tleV07XG5cbiAgICAgIGlmIChpc1BhdGhTcGVjKHZhbHVlKSkge1xuICAgICAgICAgY29tbWFuZHMucHVzaCh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGZpbHRlclByaW1pdGl2ZXModmFsdWUsIFsnYm9vbGVhbiddKSkge1xuICAgICAgICAgY29tbWFuZHMucHVzaChrZXkgKyAnPScgKyB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICBmb3IgKGNvbnN0IHYgb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmICghZmlsdGVyUHJpbWl0aXZlcyh2LCBbJ3N0cmluZycsICdudW1iZXInXSkpIHtcbiAgICAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goa2V5ICsgJz0nICsgdik7XG4gICAgICAgICAgICB9XG4gICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgY29tbWFuZHMucHVzaChrZXkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29tbWFuZHM7XG4gICB9LCBjb21tYW5kcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFpbGluZ09wdGlvbnMoXG4gICBhcmdzOiBJQXJndW1lbnRzLFxuICAgaW5pdGlhbFByaW1pdGl2ZSA9IDAsXG4gICBvYmplY3RPbmx5ID0gZmFsc2Vcbik6IHN0cmluZ1tdIHtcbiAgIGNvbnN0IGNvbW1hbmQ6IHN0cmluZ1tdID0gW107XG5cbiAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBpbml0aWFsUHJpbWl0aXZlIDwgMCA/IGFyZ3MubGVuZ3RoIDogaW5pdGlhbFByaW1pdGl2ZTsgaSA8IG1heDsgaSsrKSB7XG4gICAgICBpZiAoJ3N0cmluZ3xudW1iZXInLmluY2x1ZGVzKHR5cGVvZiBhcmdzW2ldKSkge1xuICAgICAgICAgY29tbWFuZC5wdXNoKFN0cmluZyhhcmdzW2ldKSk7XG4gICAgICB9XG4gICB9XG5cbiAgIGFwcGVuZFRhc2tPcHRpb25zKHRyYWlsaW5nT3B0aW9uc0FyZ3VtZW50KGFyZ3MpLCBjb21tYW5kKTtcbiAgIGlmICghb2JqZWN0T25seSkge1xuICAgICAgY29tbWFuZC5wdXNoKC4uLnRyYWlsaW5nQXJyYXlBcmd1bWVudChhcmdzKSk7XG4gICB9XG5cbiAgIHJldHVybiBjb21tYW5kO1xufVxuXG5mdW5jdGlvbiB0cmFpbGluZ0FycmF5QXJndW1lbnQoYXJnczogSUFyZ3VtZW50cykge1xuICAgY29uc3QgaGFzVHJhaWxpbmdDYWxsYmFjayA9IHR5cGVvZiBsYXN0KGFyZ3MpID09PSAnZnVuY3Rpb24nO1xuICAgcmV0dXJuIGFzU3RyaW5nQXJyYXkoZmlsdGVyVHlwZShsYXN0KGFyZ3MsIGhhc1RyYWlsaW5nQ2FsbGJhY2sgPyAxIDogMCksIGZpbHRlckFycmF5LCBbXSkpO1xufVxuXG4vKipcbiAqIEdpdmVuIGFueSBudW1iZXIgb2YgYXJndW1lbnRzLCByZXR1cm5zIHRoZSB0cmFpbGluZyBvcHRpb25zIGFyZ3VtZW50LCBpZ25vcmluZyBhIHRyYWlsaW5nIGZ1bmN0aW9uIGFyZ3VtZW50XG4gKiBpZiB0aGVyZSBpcyBvbmUuIFdoZW4gbm90IGZvdW5kLCB0aGUgcmV0dXJuIHZhbHVlIGlzIG51bGwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFpbGluZ09wdGlvbnNBcmd1bWVudChhcmdzOiBJQXJndW1lbnRzKTogTWF5YmU8T3B0aW9ucz4ge1xuICAgY29uc3QgaGFzVHJhaWxpbmdDYWxsYmFjayA9IGZpbHRlckZ1bmN0aW9uKGxhc3QoYXJncykpO1xuICAgcmV0dXJuIGZpbHRlclR5cGUobGFzdChhcmdzLCBoYXNUcmFpbGluZ0NhbGxiYWNrID8gMSA6IDApLCBmaWx0ZXJQbGFpbk9iamVjdCk7XG59XG5cbi8qKlxuICogUmV0dXJucyBlaXRoZXIgdGhlIHNvdXJjZSBhcmd1bWVudCB3aGVuIGl0IGlzIGEgYEZ1bmN0aW9uYCwgb3IgdGhlIGRlZmF1bHRcbiAqIGBOT09QYCBmdW5jdGlvbiBjb25zdGFudFxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KFxuICAgYXJnczogdW5rbm93bltdIHwgSUFyZ3VtZW50cyB8IHVua25vd24sXG4gICBpbmNsdWRlTm9vcCA9IHRydWVcbik6IE1heWJlPCguLi5hcmdzOiB1bmtub3duW10pID0+IHVua25vd24+IHtcbiAgIGNvbnN0IGNhbGxiYWNrID0gYXNGdW5jdGlvbihsYXN0KGFyZ3MpKTtcbiAgIHJldHVybiBpbmNsdWRlTm9vcCB8fCBpc1VzZXJGdW5jdGlvbihjYWxsYmFjaykgPyBjYWxsYmFjayA6IHVuZGVmaW5lZDtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IE1heWJlQXJyYXksIFRhc2tQYXJzZXIsIFRhc2tSZXNwb25zZUZvcm1hdCB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB0eXBlIHsgR2l0T3V0cHV0U3RyZWFtcyB9IGZyb20gJy4vZ2l0LW91dHB1dC1zdHJlYW1zJztcbmltcG9ydCB0eXBlIHsgTGluZVBhcnNlciB9IGZyb20gJy4vbGluZS1wYXJzZXInO1xuaW1wb3J0IHsgYXNBcnJheSwgdG9MaW5lc1dpdGhDb250ZW50IH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGxUYXNrUGFyc2VyPElOUFVUIGV4dGVuZHMgVGFza1Jlc3BvbnNlRm9ybWF0LCBSRVNQT05TRT4oXG4gICBwYXJzZXI6IFRhc2tQYXJzZXI8SU5QVVQsIFJFU1BPTlNFPixcbiAgIHN0cmVhbXM6IEdpdE91dHB1dFN0cmVhbXM8SU5QVVQ+XG4pIHtcbiAgIHJldHVybiBwYXJzZXIoc3RyZWFtcy5zdGRPdXQsIHN0cmVhbXMuc3RkRXJyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlU3RyaW5nUmVzcG9uc2U8VD4oXG4gICByZXN1bHQ6IFQsXG4gICBwYXJzZXJzOiBMaW5lUGFyc2VyPFQ+W10sXG4gICB0ZXh0czogTWF5YmVBcnJheTxzdHJpbmc+LFxuICAgdHJpbSA9IHRydWVcbik6IFQge1xuICAgYXNBcnJheSh0ZXh0cykuZm9yRWFjaCgodGV4dCkgPT4ge1xuICAgICAgZm9yIChsZXQgbGluZXMgPSB0b0xpbmVzV2l0aENvbnRlbnQodGV4dCwgdHJpbSksIGkgPSAwLCBtYXggPSBsaW5lcy5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xuICAgICAgICAgY29uc3QgbGluZSA9IChvZmZzZXQgPSAwKSA9PiB7XG4gICAgICAgICAgICBpZiAoaSArIG9mZnNldCA+PSBtYXgpIHtcbiAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsaW5lc1tpICsgb2Zmc2V0XTtcbiAgICAgICAgIH07XG5cbiAgICAgICAgIHBhcnNlcnMuc29tZSgoeyBwYXJzZSB9KSA9PiBwYXJzZShsaW5lLCByZXN1bHQpKTtcbiAgICAgIH1cbiAgIH0pO1xuXG4gICByZXR1cm4gcmVzdWx0O1xufVxuIiwgImltcG9ydCB0eXBlIHsgTWF5YmUsIFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBFeGl0Q29kZXMgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBlbnVtIENoZWNrUmVwb0FjdGlvbnMge1xuICAgQkFSRSA9ICdiYXJlJyxcbiAgIElOX1RSRUUgPSAndHJlZScsXG4gICBJU19SRVBPX1JPT1QgPSAncm9vdCcsXG59XG5cbmNvbnN0IG9uRXJyb3I6IFN0cmluZ1Rhc2s8Ym9vbGVhbj5bJ29uRXJyb3InXSA9ICh7IGV4aXRDb2RlIH0sIGVycm9yLCBkb25lLCBmYWlsKSA9PiB7XG4gICBpZiAoZXhpdENvZGUgPT09IEV4aXRDb2Rlcy5VTkNMRUFOICYmIGlzTm90UmVwb01lc3NhZ2UoZXJyb3IpKSB7XG4gICAgICByZXR1cm4gZG9uZShCdWZmZXIuZnJvbSgnZmFsc2UnKSk7XG4gICB9XG5cbiAgIGZhaWwoZXJyb3IpO1xufTtcblxuY29uc3QgcGFyc2VyOiBTdHJpbmdUYXNrPGJvb2xlYW4+WydwYXJzZXInXSA9ICh0ZXh0KSA9PiB7XG4gICByZXR1cm4gdGV4dC50cmltKCkgPT09ICd0cnVlJztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0lzUmVwb1Rhc2soYWN0aW9uOiBNYXliZTxDaGVja1JlcG9BY3Rpb25zPik6IFN0cmluZ1Rhc2s8Ym9vbGVhbj4ge1xuICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgIGNhc2UgQ2hlY2tSZXBvQWN0aW9ucy5CQVJFOlxuICAgICAgICAgcmV0dXJuIGNoZWNrSXNCYXJlUmVwb1Rhc2soKTtcbiAgICAgIGNhc2UgQ2hlY2tSZXBvQWN0aW9ucy5JU19SRVBPX1JPT1Q6XG4gICAgICAgICByZXR1cm4gY2hlY2tJc1JlcG9Sb290VGFzaygpO1xuICAgfVxuXG4gICBjb25zdCBjb21tYW5kcyA9IFsncmV2LXBhcnNlJywgJy0taXMtaW5zaWRlLXdvcmstdHJlZSddO1xuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBvbkVycm9yLFxuICAgICAgcGFyc2VyLFxuICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrSXNSZXBvUm9vdFRhc2soKTogU3RyaW5nVGFzazxib29sZWFuPiB7XG4gICBjb25zdCBjb21tYW5kcyA9IFsncmV2LXBhcnNlJywgJy0tZ2l0LWRpciddO1xuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBvbkVycm9yLFxuICAgICAgcGFyc2VyKHBhdGgpIHtcbiAgICAgICAgIHJldHVybiAvXlxcLihnaXQpPyQvLnRlc3QocGF0aC50cmltKCkpO1xuICAgICAgfSxcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0lzQmFyZVJlcG9UYXNrKCk6IFN0cmluZ1Rhc2s8Ym9vbGVhbj4ge1xuICAgY29uc3QgY29tbWFuZHMgPSBbJ3Jldi1wYXJzZScsICctLWlzLWJhcmUtcmVwb3NpdG9yeSddO1xuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBvbkVycm9yLFxuICAgICAgcGFyc2VyLFxuICAgfTtcbn1cblxuZnVuY3Rpb24gaXNOb3RSZXBvTWVzc2FnZShlcnJvcjogRXJyb3IpOiBib29sZWFuIHtcbiAgIHJldHVybiAvKE5vdCBhIGdpdCByZXBvc2l0b3J5fEtlaW4gR2l0LVJlcG9zaXRvcnkpL2kudGVzdChTdHJpbmcoZXJyb3IpKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IENsZWFuU3VtbWFyeSB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgdG9MaW5lc1dpdGhDb250ZW50IH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgQ2xlYW5SZXNwb25zZSBpbXBsZW1lbnRzIENsZWFuU3VtbWFyeSB7XG4gICBwdWJsaWMgcmVhZG9ubHkgcGF0aHM6IHN0cmluZ1tdO1xuICAgcHVibGljIHJlYWRvbmx5IGZpbGVzOiBzdHJpbmdbXTtcbiAgIHB1YmxpYyByZWFkb25seSBmb2xkZXJzOiBzdHJpbmdbXTtcbiAgIHB1YmxpYyByZWFkb25seSBkcnlSdW46IGJvb2xlYW47XG5cbiAgIGNvbnN0cnVjdG9yKGRyeVJ1bjogYm9vbGVhbikge1xuICAgICAgdGhpcy5wYXRocyA9IFtdO1xuICAgICAgdGhpcy5maWxlcyA9IFtdO1xuICAgICAgdGhpcy5mb2xkZXJzID0gW107XG4gICAgICB0aGlzLmRyeVJ1biA9IGRyeVJ1bjtcbiAgIH1cbn1cblxuY29uc3QgcmVtb3ZhbFJlZ2V4cCA9IC9eW2Etel0rXFxzKi9pO1xuY29uc3QgZHJ5UnVuUmVtb3ZhbFJlZ2V4cCA9IC9eW2Etel0rXFxzK1thLXpdK1xccyovaTtcbmNvbnN0IGlzRm9sZGVyUmVnZXhwID0gL1xcLyQvO1xuXG5leHBvcnQgZnVuY3Rpb24gY2xlYW5TdW1tYXJ5UGFyc2VyKGRyeVJ1bjogYm9vbGVhbiwgdGV4dDogc3RyaW5nKTogQ2xlYW5TdW1tYXJ5IHtcbiAgIGNvbnN0IHN1bW1hcnkgPSBuZXcgQ2xlYW5SZXNwb25zZShkcnlSdW4pO1xuICAgY29uc3QgcmVnZXhwID0gZHJ5UnVuID8gZHJ5UnVuUmVtb3ZhbFJlZ2V4cCA6IHJlbW92YWxSZWdleHA7XG5cbiAgIHRvTGluZXNXaXRoQ29udGVudCh0ZXh0KS5mb3JFYWNoKChsaW5lKSA9PiB7XG4gICAgICBjb25zdCByZW1vdmVkID0gbGluZS5yZXBsYWNlKHJlZ2V4cCwgJycpO1xuXG4gICAgICBzdW1tYXJ5LnBhdGhzLnB1c2gocmVtb3ZlZCk7XG4gICAgICAoaXNGb2xkZXJSZWdleHAudGVzdChyZW1vdmVkKSA/IHN1bW1hcnkuZm9sZGVycyA6IHN1bW1hcnkuZmlsZXMpLnB1c2gocmVtb3ZlZCk7XG4gICB9KTtcblxuICAgcmV0dXJuIHN1bW1hcnk7XG59XG4iLCAiaW1wb3J0IHsgVGFza0NvbmZpZ3VyYXRpb25FcnJvciB9IGZyb20gJy4uL2Vycm9ycy90YXNrLWNvbmZpZ3VyYXRpb24tZXJyb3InO1xuaW1wb3J0IHR5cGUgeyBCdWZmZXJUYXNrLCBFbXB0eVRhc2tQYXJzZXIsIFNpbXBsZUdpdFRhc2ssIFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBFTVBUWV9DT01NQU5EUzogW10gPSBbXTtcblxuZXhwb3J0IHR5cGUgRW1wdHlUYXNrID0ge1xuICAgY29tbWFuZHM6IHR5cGVvZiBFTVBUWV9DT01NQU5EUztcbiAgIGZvcm1hdDogJ2VtcHR5JztcbiAgIHBhcnNlcjogRW1wdHlUYXNrUGFyc2VyO1xuICAgb25FcnJvcj86IHVuZGVmaW5lZDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGhvY0V4ZWNUYXNrKHBhcnNlcjogRW1wdHlUYXNrUGFyc2VyKTogRW1wdHlUYXNrIHtcbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kczogRU1QVFlfQ09NTUFORFMsXG4gICAgICBmb3JtYXQ6ICdlbXB0eScsXG4gICAgICBwYXJzZXIsXG4gICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJhdGlvbkVycm9yVGFzayhlcnJvcjogRXJyb3IgfCBzdHJpbmcpOiBFbXB0eVRhc2sge1xuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzOiBFTVBUWV9DT01NQU5EUyxcbiAgICAgIGZvcm1hdDogJ2VtcHR5JyxcbiAgICAgIHBhcnNlcigpIHtcbiAgICAgICAgIHRocm93IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBuZXcgVGFza0NvbmZpZ3VyYXRpb25FcnJvcihlcnJvcikgOiBlcnJvcjtcbiAgICAgIH0sXG4gICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhjb21tYW5kczogc3RyaW5nW10sIHRyaW1tZWQgPSBmYWxzZSk6IFN0cmluZ1Rhc2s8c3RyaW5nPiB7XG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXIodGV4dCkge1xuICAgICAgICAgcmV0dXJuIHRyaW1tZWQgPyBTdHJpbmcodGV4dCkudHJpbSgpIDogdGV4dDtcbiAgICAgIH0sXG4gICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyYWlnaHRUaHJvdWdoQnVmZmVyVGFzayhjb21tYW5kczogc3RyaW5nW10pOiBCdWZmZXJUYXNrPEJ1ZmZlcj4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzLFxuICAgICAgZm9ybWF0OiAnYnVmZmVyJyxcbiAgICAgIHBhcnNlcihidWZmZXIpIHtcbiAgICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgICB9LFxuICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQnVmZmVyVGFzazxSPih0YXNrOiBTaW1wbGVHaXRUYXNrPFI+KTogdGFzayBpcyBCdWZmZXJUYXNrPFI+IHtcbiAgIHJldHVybiB0YXNrLmZvcm1hdCA9PT0gJ2J1ZmZlcic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5VGFzazxSPih0YXNrOiBTaW1wbGVHaXRUYXNrPFI+KTogdGFzayBpcyBFbXB0eVRhc2sge1xuICAgcmV0dXJuIHRhc2suZm9ybWF0ID09PSAnZW1wdHknIHx8ICF0YXNrLmNvbW1hbmRzLmxlbmd0aDtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IENsZWFuU3VtbWFyeSB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgY2xlYW5TdW1tYXJ5UGFyc2VyIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZS1jbGVhbic7XG5pbXBvcnQgdHlwZSB7IE1heWJlLCBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgYXNTdHJpbmdBcnJheSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb25FcnJvclRhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5leHBvcnQgY29uc3QgQ09ORklHX0VSUk9SX0lOVEVSQUNUSVZFX01PREUgPSAnR2l0IGNsZWFuIGludGVyYWN0aXZlIG1vZGUgaXMgbm90IHN1cHBvcnRlZCc7XG5leHBvcnQgY29uc3QgQ09ORklHX0VSUk9SX01PREVfUkVRVUlSRUQgPSAnR2l0IGNsZWFuIG1vZGUgcGFyYW1ldGVyIChcIm5cIiBvciBcImZcIikgaXMgcmVxdWlyZWQnO1xuZXhwb3J0IGNvbnN0IENPTkZJR19FUlJPUl9VTktOT1dOX09QVElPTiA9ICdHaXQgY2xlYW4gdW5rbm93biBvcHRpb24gZm91bmQgaW46ICc7XG5cbi8qKlxuICogQWxsIHN1cHBvcnRlZCBvcHRpb24gc3dpdGNoZXMgYXZhaWxhYmxlIGZvciB1c2UgaW4gYSBgZ2l0LmNsZWFuYCBvcGVyYXRpb25cbiAqL1xuZXhwb3J0IGVudW0gQ2xlYW5PcHRpb25zIHtcbiAgIERSWV9SVU4gPSAnbicsXG4gICBGT1JDRSA9ICdmJyxcbiAgIElHTk9SRURfSU5DTFVERUQgPSAneCcsXG4gICBJR05PUkVEX09OTFkgPSAnWCcsXG4gICBFWENMVURJTkcgPSAnZScsXG4gICBRVUlFVCA9ICdxJyxcbiAgIFJFQ1VSU0lWRSA9ICdkJyxcbn1cblxuLyoqXG4gKiBUaGUgdHdvIG1vZGVzIGBnaXQuY2xlYW5gIGNhbiBydW4gaW4gLSBvbmUgb2YgdGhlc2UgbXVzdCBiZSBzdXBwbGllZCBpbiBvcmRlclxuICogZm9yIHRoZSBjb21tYW5kIHRvIG5vdCB0aHJvdyBhIGBUYXNrQ29uZmlndXJhdGlvbkVycm9yYFxuICovXG5leHBvcnQgdHlwZSBDbGVhbk1vZGUgPSBDbGVhbk9wdGlvbnMuRk9SQ0UgfCBDbGVhbk9wdGlvbnMuRFJZX1JVTjtcblxuY29uc3QgQ2xlYW5PcHRpb25WYWx1ZXM6IFNldDxzdHJpbmc+ID0gbmV3IFNldChbXG4gICAnaScsXG4gICAuLi5hc1N0cmluZ0FycmF5KE9iamVjdC52YWx1ZXMoQ2xlYW5PcHRpb25zIGFzIGFueSkpLFxuXSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhbldpdGhPcHRpb25zVGFzayhtb2RlOiBDbGVhbk1vZGUgfCBzdHJpbmcsIGN1c3RvbUFyZ3M6IHN0cmluZ1tdKSB7XG4gICBjb25zdCB7IGNsZWFuTW9kZSwgb3B0aW9ucywgdmFsaWQgfSA9IGdldENsZWFuT3B0aW9ucyhtb2RlKTtcblxuICAgaWYgKCFjbGVhbk1vZGUpIHtcbiAgICAgIHJldHVybiBjb25maWd1cmF0aW9uRXJyb3JUYXNrKENPTkZJR19FUlJPUl9NT0RFX1JFUVVJUkVEKTtcbiAgIH1cblxuICAgaWYgKCF2YWxpZC5vcHRpb25zKSB7XG4gICAgICByZXR1cm4gY29uZmlndXJhdGlvbkVycm9yVGFzayhDT05GSUdfRVJST1JfVU5LTk9XTl9PUFRJT04gKyBKU09OLnN0cmluZ2lmeShtb2RlKSk7XG4gICB9XG5cbiAgIG9wdGlvbnMucHVzaCguLi5jdXN0b21BcmdzKTtcblxuICAgaWYgKG9wdGlvbnMuc29tZShpc0ludGVyYWN0aXZlTW9kZSkpIHtcbiAgICAgIHJldHVybiBjb25maWd1cmF0aW9uRXJyb3JUYXNrKENPTkZJR19FUlJPUl9JTlRFUkFDVElWRV9NT0RFKTtcbiAgIH1cblxuICAgcmV0dXJuIGNsZWFuVGFzayhjbGVhbk1vZGUsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYW5UYXNrKG1vZGU6IENsZWFuTW9kZSwgY3VzdG9tQXJnczogc3RyaW5nW10pOiBTdHJpbmdUYXNrPENsZWFuU3VtbWFyeT4ge1xuICAgY29uc3QgY29tbWFuZHM6IHN0cmluZ1tdID0gWydjbGVhbicsIGAtJHttb2RlfWAsIC4uLmN1c3RvbUFyZ3NdO1xuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXIodGV4dDogc3RyaW5nKTogQ2xlYW5TdW1tYXJ5IHtcbiAgICAgICAgIHJldHVybiBjbGVhblN1bW1hcnlQYXJzZXIobW9kZSA9PT0gQ2xlYW5PcHRpb25zLkRSWV9SVU4sIHRleHQpO1xuICAgICAgfSxcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NsZWFuT3B0aW9uc0FycmF5KGlucHV0OiBzdHJpbmdbXSk6IGlucHV0IGlzIENsZWFuT3B0aW9uc1tdIHtcbiAgIHJldHVybiBBcnJheS5pc0FycmF5KGlucHV0KSAmJiBpbnB1dC5ldmVyeSgodGVzdCkgPT4gQ2xlYW5PcHRpb25WYWx1ZXMuaGFzKHRlc3QpKTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2xlYW5PcHRpb25zKGlucHV0OiBzdHJpbmcpIHtcbiAgIGxldCBjbGVhbk1vZGU6IE1heWJlPENsZWFuTW9kZT47XG4gICBsZXQgb3B0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgIGxldCB2YWxpZCA9IHsgY2xlYW5Nb2RlOiBmYWxzZSwgb3B0aW9uczogdHJ1ZSB9O1xuXG4gICBpbnB1dFxuICAgICAgLnJlcGxhY2UoL1teYS16XWkvZywgJycpXG4gICAgICAuc3BsaXQoJycpXG4gICAgICAuZm9yRWFjaCgoY2hhcikgPT4ge1xuICAgICAgICAgaWYgKGlzQ2xlYW5Nb2RlKGNoYXIpKSB7XG4gICAgICAgICAgICBjbGVhbk1vZGUgPSBjaGFyO1xuICAgICAgICAgICAgdmFsaWQuY2xlYW5Nb2RlID0gdHJ1ZTtcbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWxpZC5vcHRpb25zID0gdmFsaWQub3B0aW9ucyAmJiBpc0tub3duT3B0aW9uKChvcHRpb25zW29wdGlvbnMubGVuZ3RoXSA9IGAtJHtjaGFyfWApKTtcbiAgICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICByZXR1cm4ge1xuICAgICAgY2xlYW5Nb2RlLFxuICAgICAgb3B0aW9ucyxcbiAgICAgIHZhbGlkLFxuICAgfTtcbn1cblxuZnVuY3Rpb24gaXNDbGVhbk1vZGUoY2xlYW5Nb2RlPzogc3RyaW5nKTogY2xlYW5Nb2RlIGlzIENsZWFuTW9kZSB7XG4gICByZXR1cm4gY2xlYW5Nb2RlID09PSBDbGVhbk9wdGlvbnMuRk9SQ0UgfHwgY2xlYW5Nb2RlID09PSBDbGVhbk9wdGlvbnMuRFJZX1JVTjtcbn1cblxuZnVuY3Rpb24gaXNLbm93bk9wdGlvbihvcHRpb246IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgcmV0dXJuIC9eLVthLXpdJC9pLnRlc3Qob3B0aW9uKSAmJiBDbGVhbk9wdGlvblZhbHVlcy5oYXMob3B0aW9uLmNoYXJBdCgxKSk7XG59XG5cbmZ1bmN0aW9uIGlzSW50ZXJhY3RpdmVNb2RlKG9wdGlvbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICBpZiAoL14tW15cXC1dLy50ZXN0KG9wdGlvbikpIHtcbiAgICAgIHJldHVybiBvcHRpb24uaW5kZXhPZignaScpID4gMDtcbiAgIH1cblxuICAgcmV0dXJuIG9wdGlvbiA9PT0gJy0taW50ZXJhY3RpdmUnO1xufVxuIiwgImltcG9ydCB0eXBlIHsgQ29uZmlnR2V0UmVzdWx0LCBDb25maWdMaXN0U3VtbWFyeSwgQ29uZmlnVmFsdWVzIH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBsYXN0LCBzcGxpdE9uIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgQ29uZmlnTGlzdCBpbXBsZW1lbnRzIENvbmZpZ0xpc3RTdW1tYXJ5IHtcbiAgIHB1YmxpYyBmaWxlczogc3RyaW5nW10gPSBbXTtcbiAgIHB1YmxpYyB2YWx1ZXM6IHsgW2ZpbGVOYW1lOiBzdHJpbmddOiBDb25maWdWYWx1ZXMgfSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgIHByaXZhdGUgX2FsbDogQ29uZmlnVmFsdWVzIHwgdW5kZWZpbmVkO1xuXG4gICBwdWJsaWMgZ2V0IGFsbCgpOiBDb25maWdWYWx1ZXMge1xuICAgICAgaWYgKCF0aGlzLl9hbGwpIHtcbiAgICAgICAgIHRoaXMuX2FsbCA9IHRoaXMuZmlsZXMucmVkdWNlKChhbGw6IENvbmZpZ1ZhbHVlcywgZmlsZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihhbGwsIHRoaXMudmFsdWVzW2ZpbGVdKTtcbiAgICAgICAgIH0sIHt9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX2FsbDtcbiAgIH1cblxuICAgcHVibGljIGFkZEZpbGUoZmlsZTogc3RyaW5nKTogQ29uZmlnVmFsdWVzIHtcbiAgICAgIGlmICghKGZpbGUgaW4gdGhpcy52YWx1ZXMpKSB7XG4gICAgICAgICBjb25zdCBsYXRlc3QgPSBsYXN0KHRoaXMuZmlsZXMpO1xuICAgICAgICAgdGhpcy52YWx1ZXNbZmlsZV0gPSBsYXRlc3QgPyBPYmplY3QuY3JlYXRlKHRoaXMudmFsdWVzW2xhdGVzdF0pIDoge307XG5cbiAgICAgICAgIHRoaXMuZmlsZXMucHVzaChmaWxlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMudmFsdWVzW2ZpbGVdO1xuICAgfVxuXG4gICBwdWJsaWMgYWRkVmFsdWUoZmlsZTogc3RyaW5nLCBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgICAgY29uc3QgdmFsdWVzID0gdGhpcy5hZGRGaWxlKGZpbGUpO1xuXG4gICAgICBpZiAoIU9iamVjdC5oYXNPd24odmFsdWVzLCBrZXkpKSB7XG4gICAgICAgICB2YWx1ZXNba2V5XSA9IHZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlc1trZXldKSkge1xuICAgICAgICAgKHZhbHVlc1trZXldIGFzIHN0cmluZ1tdKS5wdXNoKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICB2YWx1ZXNba2V5XSA9IFt2YWx1ZXNba2V5XSBhcyBzdHJpbmcsIHZhbHVlXTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fYWxsID0gdW5kZWZpbmVkO1xuICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnTGlzdFBhcnNlcih0ZXh0OiBzdHJpbmcpOiBDb25maWdMaXN0IHtcbiAgIGNvbnN0IGNvbmZpZyA9IG5ldyBDb25maWdMaXN0KCk7XG5cbiAgIGZvciAoY29uc3QgaXRlbSBvZiBjb25maWdQYXJzZXIodGV4dCkpIHtcbiAgICAgIGNvbmZpZy5hZGRWYWx1ZShpdGVtLmZpbGUsIFN0cmluZyhpdGVtLmtleSksIGl0ZW0udmFsdWUpO1xuICAgfVxuXG4gICByZXR1cm4gY29uZmlnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnR2V0UGFyc2VyKHRleHQ6IHN0cmluZywga2V5OiBzdHJpbmcpOiBDb25maWdHZXRSZXN1bHQge1xuICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgIGNvbnN0IHZhbHVlczogc3RyaW5nW10gPSBbXTtcbiAgIGNvbnN0IHNjb3BlczogTWFwPHN0cmluZywgc3RyaW5nW10+ID0gbmV3IE1hcCgpO1xuXG4gICBmb3IgKGNvbnN0IGl0ZW0gb2YgY29uZmlnUGFyc2VyKHRleHQsIGtleSkpIHtcbiAgICAgIGlmIChpdGVtLmtleSAhPT0ga2V5KSB7XG4gICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgdmFsdWVzLnB1c2goKHZhbHVlID0gaXRlbS52YWx1ZSkpO1xuXG4gICAgICBpZiAoIXNjb3Blcy5oYXMoaXRlbS5maWxlKSkge1xuICAgICAgICAgc2NvcGVzLnNldChpdGVtLmZpbGUsIFtdKTtcbiAgICAgIH1cblxuICAgICAgc2NvcGVzLmdldChpdGVtLmZpbGUpIS5wdXNoKHZhbHVlKTtcbiAgIH1cblxuICAgcmV0dXJuIHtcbiAgICAgIGtleSxcbiAgICAgIHBhdGhzOiBBcnJheS5mcm9tKHNjb3Blcy5rZXlzKCkpLFxuICAgICAgc2NvcGVzLFxuICAgICAgdmFsdWUsXG4gICAgICB2YWx1ZXMsXG4gICB9O1xufVxuXG5mdW5jdGlvbiBjb25maWdGaWxlUGF0aChmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgIHJldHVybiBmaWxlUGF0aC5yZXBsYWNlKC9eKGZpbGUpOi8sICcnKTtcbn1cblxuZnVuY3Rpb24qIGNvbmZpZ1BhcnNlcih0ZXh0OiBzdHJpbmcsIHJlcXVlc3RlZEtleTogc3RyaW5nIHwgbnVsbCA9IG51bGwpIHtcbiAgIGNvbnN0IGxpbmVzID0gdGV4dC5zcGxpdCgnXFwwJyk7XG5cbiAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBsaW5lcy5sZW5ndGggLSAxOyBpIDwgbWF4OyApIHtcbiAgICAgIGNvbnN0IGZpbGUgPSBjb25maWdGaWxlUGF0aChsaW5lc1tpKytdKTtcblxuICAgICAgbGV0IHZhbHVlID0gbGluZXNbaSsrXTtcbiAgICAgIGxldCBrZXkgPSByZXF1ZXN0ZWRLZXk7XG5cbiAgICAgIGlmICh2YWx1ZS5pbmNsdWRlcygnXFxuJykpIHtcbiAgICAgICAgIGNvbnN0IGxpbmUgPSBzcGxpdE9uKHZhbHVlLCAnXFxuJyk7XG4gICAgICAgICBrZXkgPSBsaW5lWzBdO1xuICAgICAgICAgdmFsdWUgPSBsaW5lWzFdO1xuICAgICAgfVxuXG4gICAgICB5aWVsZCB7IGZpbGUsIGtleSwgdmFsdWUgfTtcbiAgIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IENvbmZpZ0dldFJlc3VsdCwgQ29uZmlnTGlzdFN1bW1hcnksIFNpbXBsZUdpdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgY29uZmlnR2V0UGFyc2VyLCBjb25maWdMaXN0UGFyc2VyIH0gZnJvbSAnLi4vcmVzcG9uc2VzL0NvbmZpZ0xpc3QnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRBcGkgfSBmcm9tICcuLi9zaW1wbGUtZ2l0LWFwaSc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBlbnVtIEdpdENvbmZpZ1Njb3BlIHtcbiAgIHN5c3RlbSA9ICdzeXN0ZW0nLFxuICAgZ2xvYmFsID0gJ2dsb2JhbCcsXG4gICBsb2NhbCA9ICdsb2NhbCcsXG4gICB3b3JrdHJlZSA9ICd3b3JrdHJlZScsXG59XG5cbmZ1bmN0aW9uIGFzQ29uZmlnU2NvcGU8VCBleHRlbmRzIEdpdENvbmZpZ1Njb3BlIHwgdW5kZWZpbmVkPihcbiAgIHNjb3BlOiBHaXRDb25maWdTY29wZSB8IHVua25vd24sXG4gICBmYWxsYmFjazogVFxuKTogR2l0Q29uZmlnU2NvcGUgfCBUIHtcbiAgIGlmICh0eXBlb2Ygc2NvcGUgPT09ICdzdHJpbmcnICYmIE9iamVjdC5oYXNPd24oR2l0Q29uZmlnU2NvcGUsIHNjb3BlKSkge1xuICAgICAgcmV0dXJuIHNjb3BlIGFzIEdpdENvbmZpZ1Njb3BlO1xuICAgfVxuICAgcmV0dXJuIGZhbGxiYWNrO1xufVxuXG5mdW5jdGlvbiBhZGRDb25maWdUYXNrKFxuICAga2V5OiBzdHJpbmcsXG4gICB2YWx1ZTogc3RyaW5nLFxuICAgYXBwZW5kOiBib29sZWFuLFxuICAgc2NvcGU6IEdpdENvbmZpZ1Njb3BlXG4pOiBTdHJpbmdUYXNrPHN0cmluZz4ge1xuICAgY29uc3QgY29tbWFuZHM6IHN0cmluZ1tdID0gWydjb25maWcnLCBgLS0ke3Njb3BlfWBdO1xuXG4gICBpZiAoYXBwZW5kKSB7XG4gICAgICBjb21tYW5kcy5wdXNoKCctLWFkZCcpO1xuICAgfVxuXG4gICBjb21tYW5kcy5wdXNoKGtleSwgdmFsdWUpO1xuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXIodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgfSxcbiAgIH07XG59XG5cbmZ1bmN0aW9uIGdldENvbmZpZ1Rhc2soa2V5OiBzdHJpbmcsIHNjb3BlPzogR2l0Q29uZmlnU2NvcGUpOiBTdHJpbmdUYXNrPENvbmZpZ0dldFJlc3VsdD4ge1xuICAgY29uc3QgY29tbWFuZHM6IHN0cmluZ1tdID0gWydjb25maWcnLCAnLS1udWxsJywgJy0tc2hvdy1vcmlnaW4nLCAnLS1nZXQtYWxsJywga2V5XTtcblxuICAgaWYgKHNjb3BlKSB7XG4gICAgICBjb21tYW5kcy5zcGxpY2UoMSwgMCwgYC0tJHtzY29wZX1gKTtcbiAgIH1cblxuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgcGFyc2VyKHRleHQpIHtcbiAgICAgICAgIHJldHVybiBjb25maWdHZXRQYXJzZXIodGV4dCwga2V5KTtcbiAgICAgIH0sXG4gICB9O1xufVxuXG5mdW5jdGlvbiBsaXN0Q29uZmlnVGFzayhzY29wZT86IEdpdENvbmZpZ1Njb3BlKTogU3RyaW5nVGFzazxDb25maWdMaXN0U3VtbWFyeT4ge1xuICAgY29uc3QgY29tbWFuZHMgPSBbJ2NvbmZpZycsICctLWxpc3QnLCAnLS1zaG93LW9yaWdpbicsICctLW51bGwnXTtcblxuICAgaWYgKHNjb3BlKSB7XG4gICAgICBjb21tYW5kcy5wdXNoKGAtLSR7c2NvcGV9YCk7XG4gICB9XG5cbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kcyxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIHBhcnNlcih0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgIHJldHVybiBjb25maWdMaXN0UGFyc2VyKHRleHQpO1xuICAgICAgfSxcbiAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpOiBQaWNrPFNpbXBsZUdpdCwgJ2FkZENvbmZpZycgfCAnZ2V0Q29uZmlnJyB8ICdsaXN0Q29uZmlnJz4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGFkZENvbmZpZyh0aGlzOiBTaW1wbGVHaXRBcGksIGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCAuLi5yZXN0OiB1bmtub3duW10pIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgYWRkQ29uZmlnVGFzayhcbiAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgcmVzdFswXSA9PT0gdHJ1ZSxcbiAgICAgICAgICAgICAgIGFzQ29uZmlnU2NvcGUocmVzdFsxXSwgR2l0Q29uZmlnU2NvcGUubG9jYWwpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICAgICAgICk7XG4gICAgICB9LFxuXG4gICAgICBnZXRDb25maWcodGhpczogU2ltcGxlR2l0QXBpLCBrZXk6IHN0cmluZywgc2NvcGU/OiBHaXRDb25maWdTY29wZSkge1xuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICAgICBnZXRDb25maWdUYXNrKGtleSwgYXNDb25maWdTY29wZShzY29wZSwgdW5kZWZpbmVkKSksXG4gICAgICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgICAgKTtcbiAgICAgIH0sXG5cbiAgICAgIGxpc3RDb25maWcodGhpczogU2ltcGxlR2l0QXBpLCAuLi5yZXN0OiB1bmtub3duW10pIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgbGlzdENvbmZpZ1Rhc2soYXNDb25maWdTY29wZShyZXN0WzBdLCB1bmRlZmluZWQpKSxcbiAgICAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICAgICApO1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiZXhwb3J0IGVudW0gRGlmZk5hbWVTdGF0dXMge1xuICAgQURERUQgPSAnQScsXG4gICBDT1BJRUQgPSAnQycsXG4gICBERUxFVEVEID0gJ0QnLFxuICAgTU9ESUZJRUQgPSAnTScsXG4gICBSRU5BTUVEID0gJ1InLFxuICAgQ0hBTkdFRCA9ICdUJyxcbiAgIFVOTUVSR0VEID0gJ1UnLFxuICAgVU5LTk9XTiA9ICdYJyxcbiAgIEJST0tFTiA9ICdCJyxcbn1cblxuY29uc3QgZGlmZk5hbWVTdGF0dXMgPSBuZXcgU2V0KE9iamVjdC52YWx1ZXMoRGlmZk5hbWVTdGF0dXMpKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGlmZk5hbWVTdGF0dXMoaW5wdXQ6IHN0cmluZyk6IGlucHV0IGlzIERpZmZOYW1lU3RhdHVzIHtcbiAgIHJldHVybiBkaWZmTmFtZVN0YXR1cy5oYXMoaW5wdXQgYXMgRGlmZk5hbWVTdGF0dXMpO1xufVxuIiwgImltcG9ydCB0eXBlIHsgR3JlcFJlc3VsdCwgU2ltcGxlR2l0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdEFwaSB9IGZyb20gJy4uL3NpbXBsZS1naXQtYXBpJztcbmltcG9ydCB7XG4gICBhc051bWJlcixcbiAgIGZvckVhY2hMaW5lV2l0aENvbnRlbnQsXG4gICBnZXRUcmFpbGluZ09wdGlvbnMsXG4gICBOVUxMLFxuICAgcHJlZml4ZWRBcnJheSxcbiAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudCxcbn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgY29uZmlndXJhdGlvbkVycm9yVGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmNvbnN0IGRpc2FsbG93ZWRPcHRpb25zID0gWyctaCddO1xuXG5jb25zdCBRdWVyeSA9IFN5bWJvbCgnZ3JlcFF1ZXJ5Jyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2l0R3JlcFF1ZXJ5IGV4dGVuZHMgSXRlcmFibGU8c3RyaW5nPiB7XG4gICAvKiogQWRkcyBvbmUgb3IgbW9yZSB0ZXJtcyB0byBiZSBncm91cGVkIGFzIGFuIFwiYW5kXCIgdG8gYW55IG90aGVyIHRlcm1zICovXG4gICBhbmQoLi4uYW5kOiBzdHJpbmdbXSk6IHRoaXM7XG5cbiAgIC8qKiBBZGRzIG9uZSBvciBtb3JlIHNlYXJjaCB0ZXJtcyAtIGdpdC5ncmVwIHdpbGwgXCJvclwiIHRoaXMgdG8gb3RoZXIgdGVybXMgKi9cbiAgIHBhcmFtKC4uLnBhcmFtOiBzdHJpbmdbXSk6IHRoaXM7XG59XG5cbmNsYXNzIEdyZXBRdWVyeSBpbXBsZW1lbnRzIEdpdEdyZXBRdWVyeSB7XG4gICBwcml2YXRlIFtRdWVyeV06IHN0cmluZ1tdID0gW107XG5cbiAgICpbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICAgIGZvciAoY29uc3QgcXVlcnkgb2YgdGhpc1tRdWVyeV0pIHtcbiAgICAgICAgIHlpZWxkIHF1ZXJ5O1xuICAgICAgfVxuICAgfVxuXG4gICBhbmQoLi4uYW5kOiBzdHJpbmdbXSkge1xuICAgICAgYW5kLmxlbmd0aCAmJiB0aGlzW1F1ZXJ5XS5wdXNoKCctLWFuZCcsICcoJywgLi4ucHJlZml4ZWRBcnJheShhbmQsICctZScpLCAnKScpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICB9XG5cbiAgIHBhcmFtKC4uLnBhcmFtOiBzdHJpbmdbXSkge1xuICAgICAgdGhpc1tRdWVyeV0ucHVzaCguLi5wcmVmaXhlZEFycmF5KHBhcmFtLCAnLWUnKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGJ1aWxkZXIgZm9yIGEgYGdpdC5ncmVwYCBxdWVyeSB3aXRoIG9wdGlvbmFsIHBhcmFtc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ3JlcFF1ZXJ5QnVpbGRlciguLi5wYXJhbXM6IHN0cmluZ1tdKTogR2l0R3JlcFF1ZXJ5IHtcbiAgIHJldHVybiBuZXcgR3JlcFF1ZXJ5KCkucGFyYW0oLi4ucGFyYW1zKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VHcmVwKGdyZXA6IHN0cmluZyk6IEdyZXBSZXN1bHQge1xuICAgY29uc3QgcGF0aHM6IEdyZXBSZXN1bHRbJ3BhdGhzJ10gPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgIGNvbnN0IHJlc3VsdHM6IEdyZXBSZXN1bHRbJ3Jlc3VsdHMnXSA9IHt9O1xuXG4gICBmb3JFYWNoTGluZVdpdGhDb250ZW50KGdyZXAsIChpbnB1dCkgPT4ge1xuICAgICAgY29uc3QgW3BhdGgsIGxpbmUsIHByZXZpZXddID0gaW5wdXQuc3BsaXQoTlVMTCk7XG4gICAgICBwYXRocy5hZGQocGF0aCk7XG4gICAgICAocmVzdWx0c1twYXRoXSA9IHJlc3VsdHNbcGF0aF0gfHwgW10pLnB1c2goe1xuICAgICAgICAgbGluZTogYXNOdW1iZXIobGluZSksXG4gICAgICAgICBwYXRoLFxuICAgICAgICAgcHJldmlldyxcbiAgICAgIH0pO1xuICAgfSk7XG5cbiAgIHJldHVybiB7XG4gICAgICBwYXRocyxcbiAgICAgIHJlc3VsdHMsXG4gICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKTogUGljazxTaW1wbGVHaXQsICdncmVwJz4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGdyZXAodGhpczogU2ltcGxlR2l0QXBpLCBzZWFyY2hUZXJtOiBzdHJpbmcgfCBHaXRHcmVwUXVlcnkpIHtcbiAgICAgICAgIGNvbnN0IHRoZW4gPSB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKTtcbiAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKTtcblxuICAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgZGlzYWxsb3dlZE9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmluY2x1ZGVzKG9wdGlvbikpIHtcbiAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbkVycm9yVGFzayhgZ2l0LmdyZXA6IHVzZSBvZiBcIiR7b3B0aW9ufVwiIGlzIG5vdCBzdXBwb3J0ZWQuYCksXG4gICAgICAgICAgICAgICAgICB0aGVuXG4gICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgfVxuXG4gICAgICAgICBpZiAodHlwZW9mIHNlYXJjaFRlcm0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBzZWFyY2hUZXJtID0gZ3JlcFF1ZXJ5QnVpbGRlcigpLnBhcmFtKHNlYXJjaFRlcm0pO1xuICAgICAgICAgfVxuXG4gICAgICAgICBjb25zdCBjb21tYW5kcyA9IFsnZ3JlcCcsICctLW51bGwnLCAnLW4nLCAnLS1mdWxsLW5hbWUnLCAuLi5vcHRpb25zLCAuLi5zZWFyY2hUZXJtXTtcblxuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICBjb21tYW5kcyxcbiAgICAgICAgICAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgICAgICAgICAgIHBhcnNlcihzdGRPdXQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUdyZXAoc3RkT3V0KTtcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhlblxuICAgICAgICAgKTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgTWF5YmUsIE9wdGlvbkZsYWdzLCBPcHRpb25zIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgYXNTdHJpbmdBcnJheSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5leHBvcnQgZW51bSBSZXNldE1vZGUge1xuICAgTUlYRUQgPSAnbWl4ZWQnLFxuICAgU09GVCA9ICdzb2Z0JyxcbiAgIEhBUkQgPSAnaGFyZCcsXG4gICBNRVJHRSA9ICdtZXJnZScsXG4gICBLRUVQID0gJ2tlZXAnLFxufVxuXG5jb25zdCB2YWxpZFJlc2V0TW9kZXMgPSBhc1N0cmluZ0FycmF5KE9iamVjdC52YWx1ZXMoUmVzZXRNb2RlKSk7XG5cbmV4cG9ydCB0eXBlIFJlc2V0T3B0aW9ucyA9IE9wdGlvbnMgJlxuICAgT3B0aW9uRmxhZ3M8Jy1xJyB8ICctLXF1aWV0JyB8ICctLW5vLXF1aWV0JyB8ICctLXBhdGhzcGVjLWZyb20tbnVsJz4gJlxuICAgT3B0aW9uRmxhZ3M8Jy0tcGF0aHNwZWMtZnJvbS1maWxlJywgc3RyaW5nPjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0VGFzayhtb2RlOiBNYXliZTxSZXNldE1vZGU+LCBjdXN0b21BcmdzOiBzdHJpbmdbXSkge1xuICAgY29uc3QgY29tbWFuZHM6IHN0cmluZ1tdID0gWydyZXNldCddO1xuICAgaWYgKGlzVmFsaWRSZXNldE1vZGUobW9kZSkpIHtcbiAgICAgIGNvbW1hbmRzLnB1c2goYC0tJHttb2RlfWApO1xuICAgfVxuICAgY29tbWFuZHMucHVzaCguLi5jdXN0b21BcmdzKTtcblxuICAgcmV0dXJuIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soY29tbWFuZHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVzZXRNb2RlKG1vZGU6IFJlc2V0TW9kZSB8IHVua25vd24pOiBNYXliZTxSZXNldE1vZGU+IHtcbiAgIGlmIChpc1ZhbGlkUmVzZXRNb2RlKG1vZGUpKSB7XG4gICAgICByZXR1cm4gbW9kZTtcbiAgIH1cblxuICAgc3dpdGNoICh0eXBlb2YgbW9kZSkge1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgICByZXR1cm4gUmVzZXRNb2RlLlNPRlQ7XG4gICB9XG5cbiAgIHJldHVybjtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZFJlc2V0TW9kZShtb2RlOiBSZXNldE1vZGUgfCB1bmtub3duKTogbW9kZSBpcyBSZXNldE1vZGUge1xuICAgcmV0dXJuIHR5cGVvZiBtb2RlID09PSAnc3RyaW5nJyAmJiB2YWxpZFJlc2V0TW9kZXMuaW5jbHVkZXMobW9kZSk7XG59XG4iLCAiaW1wb3J0IGRlYnVnLCB7IHR5cGUgRGVidWdnZXIgfSBmcm9tICdkZWJ1Zyc7XG5cbmltcG9ydCB0eXBlIHsgTWF5YmUgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7XG4gICBhcHBlbmQsXG4gICBmaWx0ZXJIYXNMZW5ndGgsXG4gICBmaWx0ZXJTdHJpbmcsXG4gICBmaWx0ZXJUeXBlLFxuICAgTk9PUCxcbiAgIG9iamVjdFRvU3RyaW5nLFxuICAgcmVtb3ZlLFxufSBmcm9tICcuL3V0aWxzJztcblxuZGVidWcuZm9ybWF0dGVycy5MID0gKHZhbHVlOiBhbnkpID0+IFN0cmluZyhmaWx0ZXJIYXNMZW5ndGgodmFsdWUpID8gdmFsdWUubGVuZ3RoIDogJy0nKTtcbmRlYnVnLmZvcm1hdHRlcnMuQiA9ICh2YWx1ZTogQnVmZmVyKSA9PiB7XG4gICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCd1dGY4Jyk7XG4gICB9XG4gICByZXR1cm4gb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufTtcblxudHlwZSBPdXRwdXRMb2dnaW5nSGFuZGxlciA9IChtZXNzYWdlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkO1xuXG5mdW5jdGlvbiBjcmVhdGVMb2coKSB7XG4gICByZXR1cm4gZGVidWcoJ3NpbXBsZS1naXQnKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPdXRwdXRMb2dnZXIgZXh0ZW5kcyBPdXRwdXRMb2dnaW5nSGFuZGxlciB7XG4gICByZWFkb25seSBsYWJlbDogc3RyaW5nO1xuXG4gICBpbmZvOiBPdXRwdXRMb2dnaW5nSGFuZGxlcjtcbiAgIHN0ZXAobmV4dFN0ZXA/OiBzdHJpbmcpOiBPdXRwdXRMb2dnZXI7XG4gICBzaWJsaW5nKG5hbWU6IHN0cmluZyk6IE91dHB1dExvZ2dlcjtcbn1cblxuZnVuY3Rpb24gcHJlZml4ZWRMb2dnZXIoXG4gICB0bzogRGVidWdnZXIsXG4gICBwcmVmaXg6IHN0cmluZyxcbiAgIGZvcndhcmQ/OiBPdXRwdXRMb2dnaW5nSGFuZGxlclxuKTogT3V0cHV0TG9nZ2luZ0hhbmRsZXIge1xuICAgaWYgKCFwcmVmaXggfHwgIVN0cmluZyhwcmVmaXgpLnJlcGxhY2UoL1xccyovLCAnJykpIHtcbiAgICAgIHJldHVybiAhZm9yd2FyZFxuICAgICAgICAgPyB0b1xuICAgICAgICAgOiAobWVzc2FnZSwgLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICB0byhtZXNzYWdlLCAuLi5hcmdzKTtcbiAgICAgICAgICAgICAgZm9yd2FyZChtZXNzYWdlLCAuLi5hcmdzKTtcbiAgICAgICAgICAgfTtcbiAgIH1cblxuICAgcmV0dXJuIChtZXNzYWdlLCAuLi5hcmdzKSA9PiB7XG4gICAgICB0byhgJXMgJHttZXNzYWdlfWAsIHByZWZpeCwgLi4uYXJncyk7XG4gICAgICBpZiAoZm9yd2FyZCkge1xuICAgICAgICAgZm9yd2FyZChtZXNzYWdlLCAuLi5hcmdzKTtcbiAgICAgIH1cbiAgIH07XG59XG5cbmZ1bmN0aW9uIGNoaWxkTG9nZ2VyTmFtZShcbiAgIG5hbWU6IE1heWJlPHN0cmluZz4sXG4gICBjaGlsZERlYnVnZ2VyOiBNYXliZTxEZWJ1Z2dlcj4sXG4gICB7IG5hbWVzcGFjZTogcGFyZW50TmFtZXNwYWNlIH06IERlYnVnZ2VyXG4pOiBzdHJpbmcge1xuICAgaWYgKHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIG5hbWU7XG4gICB9XG4gICBjb25zdCBjaGlsZE5hbWVzcGFjZSA9IChjaGlsZERlYnVnZ2VyICYmIGNoaWxkRGVidWdnZXIubmFtZXNwYWNlKSB8fCAnJztcblxuICAgaWYgKGNoaWxkTmFtZXNwYWNlLnN0YXJ0c1dpdGgocGFyZW50TmFtZXNwYWNlKSkge1xuICAgICAgcmV0dXJuIGNoaWxkTmFtZXNwYWNlLnN1YnN0cihwYXJlbnROYW1lc3BhY2UubGVuZ3RoICsgMSk7XG4gICB9XG5cbiAgIHJldHVybiBjaGlsZE5hbWVzcGFjZSB8fCBwYXJlbnROYW1lc3BhY2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMb2dnZXIoXG4gICBsYWJlbDogc3RyaW5nLFxuICAgdmVyYm9zZT86IHN0cmluZyB8IERlYnVnZ2VyLFxuICAgaW5pdGlhbFN0ZXA/OiBzdHJpbmcsXG4gICBpbmZvRGVidWdnZXIgPSBjcmVhdGVMb2coKVxuKTogT3V0cHV0TG9nZ2VyIHtcbiAgIGNvbnN0IGxhYmVsUHJlZml4ID0gKGxhYmVsICYmIGBbJHtsYWJlbH1dYCkgfHwgJyc7XG5cbiAgIGNvbnN0IHNwYXduZWQ6IE91dHB1dExvZ2dlcltdID0gW107XG4gICBjb25zdCBkZWJ1Z0RlYnVnZ2VyOiBNYXliZTxEZWJ1Z2dlcj4gPVxuICAgICAgdHlwZW9mIHZlcmJvc2UgPT09ICdzdHJpbmcnID8gaW5mb0RlYnVnZ2VyLmV4dGVuZCh2ZXJib3NlKSA6IHZlcmJvc2U7XG4gICBjb25zdCBrZXkgPSBjaGlsZExvZ2dlck5hbWUoZmlsdGVyVHlwZSh2ZXJib3NlLCBmaWx0ZXJTdHJpbmcpLCBkZWJ1Z0RlYnVnZ2VyLCBpbmZvRGVidWdnZXIpO1xuXG4gICByZXR1cm4gc3RlcChpbml0aWFsU3RlcCk7XG5cbiAgIGZ1bmN0aW9uIHNpYmxpbmcobmFtZTogc3RyaW5nLCBpbml0aWFsPzogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gYXBwZW5kKFxuICAgICAgICAgc3Bhd25lZCxcbiAgICAgICAgIGNyZWF0ZUxvZ2dlcihsYWJlbCwga2V5LnJlcGxhY2UoL15bXjpdKy8sIG5hbWUpLCBpbml0aWFsLCBpbmZvRGVidWdnZXIpXG4gICAgICApO1xuICAgfVxuXG4gICBmdW5jdGlvbiBzdGVwKHBoYXNlPzogc3RyaW5nKSB7XG4gICAgICBjb25zdCBzdGVwUHJlZml4ID0gKHBoYXNlICYmIGBbJHtwaGFzZX1dYCkgfHwgJyc7XG4gICAgICBjb25zdCBkZWJ1ZyA9IChkZWJ1Z0RlYnVnZ2VyICYmIHByZWZpeGVkTG9nZ2VyKGRlYnVnRGVidWdnZXIsIHN0ZXBQcmVmaXgpKSB8fCBOT09QO1xuICAgICAgY29uc3QgaW5mbyA9IHByZWZpeGVkTG9nZ2VyKGluZm9EZWJ1Z2dlciwgYCR7bGFiZWxQcmVmaXh9ICR7c3RlcFByZWZpeH1gLCBkZWJ1Zyk7XG5cbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGRlYnVnRGVidWdnZXIgPyBkZWJ1ZyA6IGluZm8sIHtcbiAgICAgICAgIGxhYmVsLFxuICAgICAgICAgc2libGluZyxcbiAgICAgICAgIGluZm8sXG4gICAgICAgICBzdGVwLFxuICAgICAgfSk7XG4gICB9XG59XG5cbi8qKlxuICogVGhlIGBHaXRMb2dnZXJgIGlzIHVzZWQgYnkgdGhlIG1haW4gYFNpbXBsZUdpdGAgcnVubmVyIHRvIGhhbmRsZSBsb2dnaW5nXG4gKiBhbnkgd2FybmluZ3Mgb3IgZXJyb3JzLlxuICovXG5leHBvcnQgY2xhc3MgR2l0TG9nZ2VyIHtcbiAgIHB1YmxpYyBlcnJvcjogT3V0cHV0TG9nZ2luZ0hhbmRsZXI7XG5cbiAgIHB1YmxpYyB3YXJuOiBPdXRwdXRMb2dnaW5nSGFuZGxlcjtcblxuICAgY29uc3RydWN0b3IocHJpdmF0ZSBfb3V0OiBEZWJ1Z2dlciA9IGNyZWF0ZUxvZygpKSB7XG4gICAgICB0aGlzLmVycm9yID0gcHJlZml4ZWRMb2dnZXIoX291dCwgJ1tFUlJPUl0nKTtcbiAgICAgIHRoaXMud2FybiA9IHByZWZpeGVkTG9nZ2VyKF9vdXQsICdbV0FSTl0nKTtcbiAgIH1cblxuICAgc2lsZW50KHNpbGVuY2UgPSBmYWxzZSkge1xuICAgICAgaWYgKHNpbGVuY2UgIT09IHRoaXMuX291dC5lbmFibGVkKSB7XG4gICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgbmFtZXNwYWNlIH0gPSB0aGlzLl9vdXQ7XG4gICAgICBjb25zdCBlbnYgPSAocHJvY2Vzcy5lbnYuREVCVUcgfHwgJycpLnNwbGl0KCcsJykuZmlsdGVyKChzKSA9PiAhIXMpO1xuICAgICAgY29uc3QgaGFzT24gPSBlbnYuaW5jbHVkZXMobmFtZXNwYWNlKTtcbiAgICAgIGNvbnN0IGhhc09mZiA9IGVudi5pbmNsdWRlcyhgLSR7bmFtZXNwYWNlfWApO1xuXG4gICAgICAvLyBlbmFibGluZyB0aGUgbG9nXG4gICAgICBpZiAoIXNpbGVuY2UpIHtcbiAgICAgICAgIGlmIChoYXNPZmYpIHtcbiAgICAgICAgICAgIHJlbW92ZShlbnYsIGAtJHtuYW1lc3BhY2V9YCk7XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW52LnB1c2gobmFtZXNwYWNlKTtcbiAgICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICBpZiAoaGFzT24pIHtcbiAgICAgICAgICAgIHJlbW92ZShlbnYsIG5hbWVzcGFjZSk7XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW52LnB1c2goYC0ke25hbWVzcGFjZX1gKTtcbiAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZGVidWcuZW5hYmxlKGVudi5qb2luKCcsJykpO1xuICAgfVxufVxuIiwgImltcG9ydCB7IEdpdEVycm9yIH0gZnJvbSAnLi4vZXJyb3JzL2dpdC1lcnJvcic7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIsIHR5cGUgT3V0cHV0TG9nZ2VyIH0gZnJvbSAnLi4vZ2l0LWxvZ2dlcic7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdFRhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5cbnR5cGUgQW55U2ltcGxlR2l0VGFzayA9IFNpbXBsZUdpdFRhc2s8YW55PjtcblxudHlwZSBUYXNrSW5Qcm9ncmVzcyA9IHtcbiAgIG5hbWU6IHN0cmluZztcbiAgIGxvZ2dlcjogT3V0cHV0TG9nZ2VyO1xuICAgdGFzazogQW55U2ltcGxlR2l0VGFzaztcbn07XG5cbmV4cG9ydCBjbGFzcyBUYXNrc1BlbmRpbmdRdWV1ZSB7XG4gICBwcml2YXRlIF9xdWV1ZTogTWFwPEFueVNpbXBsZUdpdFRhc2ssIFRhc2tJblByb2dyZXNzPiA9IG5ldyBNYXAoKTtcblxuICAgY29uc3RydWN0b3IocHJpdmF0ZSBsb2dMYWJlbCA9ICdHaXRFeGVjdXRvcicpIHt9XG5cbiAgIHByaXZhdGUgd2l0aFByb2dyZXNzKHRhc2s6IEFueVNpbXBsZUdpdFRhc2spIHtcbiAgICAgIHJldHVybiB0aGlzLl9xdWV1ZS5nZXQodGFzayk7XG4gICB9XG5cbiAgIHByaXZhdGUgY3JlYXRlUHJvZ3Jlc3ModGFzazogQW55U2ltcGxlR2l0VGFzayk6IFRhc2tJblByb2dyZXNzIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBUYXNrc1BlbmRpbmdRdWV1ZS5nZXROYW1lKHRhc2suY29tbWFuZHNbMF0pO1xuICAgICAgY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKHRoaXMubG9nTGFiZWwsIG5hbWUpO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAgdGFzayxcbiAgICAgICAgIGxvZ2dlcixcbiAgICAgICAgIG5hbWUsXG4gICAgICB9O1xuICAgfVxuXG4gICBwdXNoKHRhc2s6IEFueVNpbXBsZUdpdFRhc2spOiBUYXNrSW5Qcm9ncmVzcyB7XG4gICAgICBjb25zdCBwcm9ncmVzcyA9IHRoaXMuY3JlYXRlUHJvZ3Jlc3ModGFzayk7XG4gICAgICBwcm9ncmVzcy5sb2dnZXIoJ0FkZGluZyB0YXNrIHRvIHRoZSBxdWV1ZSwgY29tbWFuZHMgPSAlbycsIHRhc2suY29tbWFuZHMpO1xuXG4gICAgICB0aGlzLl9xdWV1ZS5zZXQodGFzaywgcHJvZ3Jlc3MpO1xuXG4gICAgICByZXR1cm4gcHJvZ3Jlc3M7XG4gICB9XG5cbiAgIGZhdGFsKGVycjogR2l0RXJyb3IpIHtcbiAgICAgIGZvciAoY29uc3QgW3Rhc2ssIHsgbG9nZ2VyIH1dIG9mIEFycmF5LmZyb20odGhpcy5fcXVldWUuZW50cmllcygpKSkge1xuICAgICAgICAgaWYgKHRhc2sgPT09IGVyci50YXNrKSB7XG4gICAgICAgICAgICBsb2dnZXIuaW5mbyhgRmFpbGVkICVvYCwgZXJyKTtcbiAgICAgICAgICAgIGxvZ2dlcihcbiAgICAgICAgICAgICAgIGBGYXRhbCBleGNlcHRpb24sIGFueSBhcy15ZXQgdW4tc3RhcnRlZCB0YXNrcyBydW4gdGhyb3VnaCB0aGlzIGV4ZWN1dG9yIHdpbGwgbm90IGJlIGF0dGVtcHRlZGBcbiAgICAgICAgICAgICk7XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9nZ2VyLmluZm8oXG4gICAgICAgICAgICAgICBgQSBmYXRhbCBleGNlcHRpb24gb2NjdXJyZWQgaW4gYSBwcmV2aW91cyB0YXNrLCB0aGUgcXVldWUgaGFzIGJlZW4gcHVyZ2VkOiAlb2AsXG4gICAgICAgICAgICAgICBlcnIubWVzc2FnZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgdGhpcy5jb21wbGV0ZSh0YXNrKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX3F1ZXVlLnNpemUgIT09IDApIHtcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUXVldWUgc2l6ZSBzaG91bGQgYmUgemVybyBhZnRlciBmYXRhbDogJHt0aGlzLl9xdWV1ZS5zaXplfWApO1xuICAgICAgfVxuICAgfVxuXG4gICBjb21wbGV0ZSh0YXNrOiBBbnlTaW1wbGVHaXRUYXNrKSB7XG4gICAgICBjb25zdCBwcm9ncmVzcyA9IHRoaXMud2l0aFByb2dyZXNzKHRhc2spO1xuICAgICAgaWYgKHByb2dyZXNzKSB7XG4gICAgICAgICB0aGlzLl9xdWV1ZS5kZWxldGUodGFzayk7XG4gICAgICB9XG4gICB9XG5cbiAgIGF0dGVtcHQodGFzazogQW55U2ltcGxlR2l0VGFzayk6IFRhc2tJblByb2dyZXNzIHtcbiAgICAgIGNvbnN0IHByb2dyZXNzID0gdGhpcy53aXRoUHJvZ3Jlc3ModGFzayk7XG4gICAgICBpZiAoIXByb2dyZXNzKSB7XG4gICAgICAgICB0aHJvdyBuZXcgR2l0RXJyb3IodW5kZWZpbmVkLCAnVGFza3NQZW5kaW5nUXVldWU6IGF0dGVtcHQgY2FsbGVkIGZvciBhbiB1bmtub3duIHRhc2snKTtcbiAgICAgIH1cbiAgICAgIHByb2dyZXNzLmxvZ2dlcignU3RhcnRpbmcgdGFzaycpO1xuXG4gICAgICByZXR1cm4gcHJvZ3Jlc3M7XG4gICB9XG5cbiAgIHN0YXRpYyBnZXROYW1lKG5hbWUgPSAnZW1wdHknKSB7XG4gICAgICByZXR1cm4gYHRhc2s6JHtuYW1lfTokeysrVGFza3NQZW5kaW5nUXVldWUuY291bnRlcn1gO1xuICAgfVxuXG4gICBwcml2YXRlIHN0YXRpYyBjb3VudGVyID0gMDtcbn1cbiIsICJpbXBvcnQgeyB0eXBlIFNwYXduT3B0aW9ucywgc3Bhd24gfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnO1xuXG5pbXBvcnQgeyBHaXRFcnJvciB9IGZyb20gJy4uL2Vycm9ycy9naXQtZXJyb3InO1xuaW1wb3J0IHR5cGUgeyBPdXRwdXRMb2dnZXIgfSBmcm9tICcuLi9naXQtbG9nZ2VyJztcbmltcG9ydCB0eXBlIHsgUGx1Z2luU3RvcmUsIFNpbXBsZUdpdFRhc2tQbHVnaW5Db250ZXh0IH0gZnJvbSAnLi4vcGx1Z2lucyc7XG5pbXBvcnQgeyB0eXBlIEVtcHR5VGFzaywgaXNCdWZmZXJUYXNrLCBpc0VtcHR5VGFzayB9IGZyb20gJy4uL3Rhc2tzL3Rhc2snO1xuaW1wb3J0IHR5cGUge1xuICAgR2l0RXhlY3V0b3JSZXN1bHQsXG4gICBNYXliZSxcbiAgIG91dHB1dEhhbmRsZXIsXG4gICBSdW5uYWJsZVRhc2ssXG4gICBTaW1wbGVHaXRFeGVjdXRvcixcbiAgIFNpbXBsZUdpdFRhc2ssXG59IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGNhbGxUYXNrUGFyc2VyLCBmaXJzdCwgR2l0T3V0cHV0U3RyZWFtcywgb2JqZWN0VG9TdHJpbmcgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgdHlwZSB7IFNjaGVkdWxlciB9IGZyb20gJy4vc2NoZWR1bGVyJztcbmltcG9ydCB7IFRhc2tzUGVuZGluZ1F1ZXVlIH0gZnJvbSAnLi90YXNrcy1wZW5kaW5nLXF1ZXVlJztcblxuZXhwb3J0IGNsYXNzIEdpdEV4ZWN1dG9yQ2hhaW4gaW1wbGVtZW50cyBTaW1wbGVHaXRFeGVjdXRvciB7XG4gICBwcml2YXRlIF9jaGFpbjogUHJvbWlzZTxhbnk+ID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICBwcml2YXRlIF9xdWV1ZSA9IG5ldyBUYXNrc1BlbmRpbmdRdWV1ZSgpO1xuICAgcHJpdmF0ZSBfY3dkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgIHB1YmxpYyBnZXQgY3dkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2N3ZCB8fCB0aGlzLl9leGVjdXRvci5jd2Q7XG4gICB9XG5cbiAgIHB1YmxpYyBzZXQgY3dkKGN3ZDogc3RyaW5nKSB7XG4gICAgICB0aGlzLl9jd2QgPSBjd2Q7XG4gICB9XG5cbiAgIHB1YmxpYyBnZXQgZW52KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2V4ZWN1dG9yLmVudjtcbiAgIH1cblxuICAgcHVibGljIGdldCBvdXRwdXRIYW5kbGVyKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2V4ZWN1dG9yLm91dHB1dEhhbmRsZXI7XG4gICB9XG5cbiAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfZXhlY3V0b3I6IFNpbXBsZUdpdEV4ZWN1dG9yLFxuICAgICAgcHJpdmF0ZSBfc2NoZWR1bGVyOiBTY2hlZHVsZXIsXG4gICAgICBwcml2YXRlIF9wbHVnaW5zOiBQbHVnaW5TdG9yZVxuICAgKSB7fVxuXG4gICBwdWJsaWMgY2hhaW4oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgIH1cblxuICAgcHVibGljIHB1c2g8Uj4odGFzazogU2ltcGxlR2l0VGFzazxSPik6IFByb21pc2U8Uj4ge1xuICAgICAgdGhpcy5fcXVldWUucHVzaCh0YXNrKTtcblxuICAgICAgcmV0dXJuICh0aGlzLl9jaGFpbiA9IHRoaXMuX2NoYWluLnRoZW4oKCkgPT4gdGhpcy5hdHRlbXB0VGFzayh0YXNrKSkpO1xuICAgfVxuXG4gICBwcml2YXRlIGFzeW5jIGF0dGVtcHRUYXNrPFI+KHRhc2s6IFNpbXBsZUdpdFRhc2s8Uj4pOiBQcm9taXNlPHZvaWQgfCBSPiB7XG4gICAgICBjb25zdCBvblNjaGVkdWxlQ29tcGxldGUgPSBhd2FpdCB0aGlzLl9zY2hlZHVsZXIubmV4dCgpO1xuICAgICAgY29uc3Qgb25RdWV1ZUNvbXBsZXRlID0gKCkgPT4gdGhpcy5fcXVldWUuY29tcGxldGUodGFzayk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgICBjb25zdCB7IGxvZ2dlciB9ID0gdGhpcy5fcXVldWUuYXR0ZW1wdCh0YXNrKTtcbiAgICAgICAgIHJldHVybiAoYXdhaXQgKGlzRW1wdHlUYXNrKHRhc2spXG4gICAgICAgICAgICA/IHRoaXMuYXR0ZW1wdEVtcHR5VGFzayh0YXNrLCBsb2dnZXIpXG4gICAgICAgICAgICA6IHRoaXMuYXR0ZW1wdFJlbW90ZVRhc2sodGFzaywgbG9nZ2VyKSkpIGFzIFI7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICB0aHJvdyB0aGlzLm9uRmF0YWxFeGNlcHRpb24odGFzaywgZSBhcyBFcnJvcik7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgb25RdWV1ZUNvbXBsZXRlKCk7XG4gICAgICAgICBvblNjaGVkdWxlQ29tcGxldGUoKTtcbiAgICAgIH1cbiAgIH1cblxuICAgcHJpdmF0ZSBvbkZhdGFsRXhjZXB0aW9uPFI+KHRhc2s6IFNpbXBsZUdpdFRhc2s8Uj4sIGU6IEVycm9yKSB7XG4gICAgICBjb25zdCBnaXRFcnJvciA9XG4gICAgICAgICBlIGluc3RhbmNlb2YgR2l0RXJyb3IgPyBPYmplY3QuYXNzaWduKGUsIHsgdGFzayB9KSA6IG5ldyBHaXRFcnJvcih0YXNrLCBlICYmIFN0cmluZyhlKSk7XG5cbiAgICAgIHRoaXMuX2NoYWluID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICB0aGlzLl9xdWV1ZS5mYXRhbChnaXRFcnJvcik7XG5cbiAgICAgIHJldHVybiBnaXRFcnJvcjtcbiAgIH1cblxuICAgcHJpdmF0ZSBhc3luYyBhdHRlbXB0UmVtb3RlVGFzazxSPih0YXNrOiBSdW5uYWJsZVRhc2s8Uj4sIGxvZ2dlcjogT3V0cHV0TG9nZ2VyKSB7XG4gICAgICBjb25zdCBiaW5hcnkgPSB0aGlzLl9wbHVnaW5zLmV4ZWMoJ3NwYXduLmJpbmFyeScsICcnLCB0aGlzLnRhc2tDb250ZXh0KHRhc2ssIHRhc2suY29tbWFuZHMpKTtcbiAgICAgIGNvbnN0IGFyZ3MgPSB0aGlzLl9wbHVnaW5zLmV4ZWMoXG4gICAgICAgICAnc3Bhd24uYXJncycsXG4gICAgICAgICBbLi4udGFzay5jb21tYW5kc10sXG4gICAgICAgICB0aGlzLnRhc2tDb250ZXh0KHRhc2ssIHRhc2suY29tbWFuZHMpXG4gICAgICApO1xuXG4gICAgICBjb25zdCByYXcgPSBhd2FpdCB0aGlzLmdpdFJlc3BvbnNlKFxuICAgICAgICAgdGFzayxcbiAgICAgICAgIGJpbmFyeSxcbiAgICAgICAgIGFyZ3MsXG4gICAgICAgICB0aGlzLm91dHB1dEhhbmRsZXIsXG4gICAgICAgICBsb2dnZXIuc3RlcCgnU1BBV04nKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IG91dHB1dFN0cmVhbXMgPSBhd2FpdCB0aGlzLmhhbmRsZVRhc2tEYXRhKHRhc2ssIGFyZ3MsIHJhdywgbG9nZ2VyLnN0ZXAoJ0hBTkRMRScpKTtcblxuICAgICAgbG9nZ2VyKGBwYXNzaW5nIHJlc3BvbnNlIHRvIHRhc2sncyBwYXJzZXIgYXMgYSAlc2AsIHRhc2suZm9ybWF0KTtcblxuICAgICAgaWYgKGlzQnVmZmVyVGFzayh0YXNrKSkge1xuICAgICAgICAgcmV0dXJuIGNhbGxUYXNrUGFyc2VyKHRhc2sucGFyc2VyLCBvdXRwdXRTdHJlYW1zKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNhbGxUYXNrUGFyc2VyKHRhc2sucGFyc2VyLCBvdXRwdXRTdHJlYW1zLmFzU3RyaW5ncygpKTtcbiAgIH1cblxuICAgcHJpdmF0ZSBhc3luYyBhdHRlbXB0RW1wdHlUYXNrKHRhc2s6IEVtcHR5VGFzaywgbG9nZ2VyOiBPdXRwdXRMb2dnZXIpIHtcbiAgICAgIGxvZ2dlcihgZW1wdHkgdGFzayBieXBhc3NpbmcgY2hpbGQgcHJvY2VzcyB0byBjYWxsIHRvIHRhc2sncyBwYXJzZXJgKTtcbiAgICAgIHJldHVybiB0YXNrLnBhcnNlcih0aGlzKTtcbiAgIH1cblxuICAgcHJpdmF0ZSBoYW5kbGVUYXNrRGF0YTxSPihcbiAgICAgIHRhc2s6IFNpbXBsZUdpdFRhc2s8Uj4sXG4gICAgICBhcmdzOiBzdHJpbmdbXSxcbiAgICAgIHJlc3VsdDogR2l0RXhlY3V0b3JSZXN1bHQsXG4gICAgICBsb2dnZXI6IE91dHB1dExvZ2dlclxuICAgKTogUHJvbWlzZTxHaXRPdXRwdXRTdHJlYW1zPiB7XG4gICAgICBjb25zdCB7IGV4aXRDb2RlLCByZWplY3Rpb24sIHN0ZE91dCwgc3RkRXJyIH0gPSByZXN1bHQ7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZG9uZSwgZmFpbCkgPT4ge1xuICAgICAgICAgbG9nZ2VyKGBQcmVwYXJpbmcgdG8gaGFuZGxlIHByb2Nlc3MgcmVzcG9uc2UgZXhpdENvZGU9JWQgc3RkT3V0PWAsIGV4aXRDb2RlKTtcblxuICAgICAgICAgY29uc3QgeyBlcnJvciB9ID0gdGhpcy5fcGx1Z2lucy5leGVjKFxuICAgICAgICAgICAgJ3Rhc2suZXJyb3InLFxuICAgICAgICAgICAgeyBlcnJvcjogcmVqZWN0aW9uIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAuLi50aGlzLnRhc2tDb250ZXh0KHRhc2ssIGFyZ3MpLFxuICAgICAgICAgICAgICAgLi4ucmVzdWx0LFxuICAgICAgICAgICAgfVxuICAgICAgICAgKTtcblxuICAgICAgICAgaWYgKGVycm9yICYmIHRhc2sub25FcnJvcikge1xuICAgICAgICAgICAgbG9nZ2VyLmluZm8oYGV4aXRDb2RlPSVzIGhhbmRsaW5nIHdpdGggY3VzdG9tIGVycm9yIGhhbmRsZXJgKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRhc2sub25FcnJvcihcbiAgICAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgICAgKG5ld1N0ZE91dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgbG9nZ2VyLmluZm8oYGN1c3RvbSBlcnJvciBoYW5kbGVyIHRyZWF0ZWQgYXMgc3VjY2Vzc2ApO1xuICAgICAgICAgICAgICAgICAgbG9nZ2VyKGBjdXN0b20gZXJyb3IgcmV0dXJuZWQgYSAlc2AsIG9iamVjdFRvU3RyaW5nKG5ld1N0ZE91dCkpO1xuXG4gICAgICAgICAgICAgICAgICBkb25lKFxuICAgICAgICAgICAgICAgICAgICAgbmV3IEdpdE91dHB1dFN0cmVhbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KG5ld1N0ZE91dCkgPyBCdWZmZXIuY29uY2F0KG5ld1N0ZE91dCkgOiBuZXdTdGRPdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBCdWZmZXIuY29uY2F0KHN0ZEVycilcbiAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgZmFpbFxuICAgICAgICAgICAgKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICBsb2dnZXIuaW5mbyhcbiAgICAgICAgICAgICAgIGBoYW5kbGluZyBhcyBlcnJvcjogZXhpdENvZGU9JXMgc3RkRXJyPSVzIHJlamVjdGlvbj0lb2AsXG4gICAgICAgICAgICAgICBleGl0Q29kZSxcbiAgICAgICAgICAgICAgIHN0ZEVyci5sZW5ndGgsXG4gICAgICAgICAgICAgICByZWplY3Rpb25cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gZmFpbChlcnJvcik7XG4gICAgICAgICB9XG5cbiAgICAgICAgIGxvZ2dlci5pbmZvKGByZXRyaWV2aW5nIHRhc2sgb3V0cHV0IGNvbXBsZXRlYCk7XG4gICAgICAgICBkb25lKG5ldyBHaXRPdXRwdXRTdHJlYW1zKEJ1ZmZlci5jb25jYXQoc3RkT3V0KSwgQnVmZmVyLmNvbmNhdChzdGRFcnIpKSk7XG4gICAgICB9KTtcbiAgIH1cblxuICAgcHJpdmF0ZSBhc3luYyBnaXRSZXNwb25zZTxSPihcbiAgICAgIHRhc2s6IFNpbXBsZUdpdFRhc2s8Uj4sXG4gICAgICBjb21tYW5kOiBzdHJpbmcsXG4gICAgICBhcmdzOiBzdHJpbmdbXSxcbiAgICAgIG91dHB1dEhhbmRsZXI6IE1heWJlPG91dHB1dEhhbmRsZXI+LFxuICAgICAgbG9nZ2VyOiBPdXRwdXRMb2dnZXJcbiAgICk6IFByb21pc2U8R2l0RXhlY3V0b3JSZXN1bHQ+IHtcbiAgICAgIGNvbnN0IG91dHB1dExvZ2dlciA9IGxvZ2dlci5zaWJsaW5nKCdvdXRwdXQnKTtcbiAgICAgIGNvbnN0IHNwYXduT3B0aW9uczogU3Bhd25PcHRpb25zID0gdGhpcy5fcGx1Z2lucy5leGVjKFxuICAgICAgICAgJ3NwYXduLm9wdGlvbnMnLFxuICAgICAgICAge1xuICAgICAgICAgICAgY3dkOiB0aGlzLmN3ZCxcbiAgICAgICAgICAgIGVudjogdGhpcy5lbnYsXG4gICAgICAgICAgICB3aW5kb3dzSGlkZTogdHJ1ZSxcbiAgICAgICAgIH0sXG4gICAgICAgICB0aGlzLnRhc2tDb250ZXh0KHRhc2ssIHRhc2suY29tbWFuZHMpXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKGRvbmUpID0+IHtcbiAgICAgICAgIGNvbnN0IHN0ZE91dDogQnVmZmVyW10gPSBbXTtcbiAgICAgICAgIGNvbnN0IHN0ZEVycjogQnVmZmVyW10gPSBbXTtcblxuICAgICAgICAgbG9nZ2VyLmluZm8oYCVzICVvYCwgY29tbWFuZCwgYXJncyk7XG4gICAgICAgICBsb2dnZXIoJyVPJywgc3Bhd25PcHRpb25zKTtcblxuICAgICAgICAgbGV0IHJlamVjdGlvbiA9IHRoaXMuX2JlZm9yZVNwYXduKHRhc2ssIGFyZ3MpO1xuICAgICAgICAgaWYgKHJlamVjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGRvbmUoe1xuICAgICAgICAgICAgICAgc3RkT3V0LFxuICAgICAgICAgICAgICAgc3RkRXJyLFxuICAgICAgICAgICAgICAgZXhpdENvZGU6IDk5MDEsXG4gICAgICAgICAgICAgICByZWplY3Rpb24sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgIH1cblxuICAgICAgICAgdGhpcy5fcGx1Z2lucy5leGVjKCdzcGF3bi5iZWZvcmUnLCB1bmRlZmluZWQsIHtcbiAgICAgICAgICAgIC4uLnRoaXMudGFza0NvbnRleHQodGFzaywgYXJncyksXG4gICAgICAgICAgICBraWxsKHJlYXNvbikge1xuICAgICAgICAgICAgICAgcmVqZWN0aW9uID0gcmVhc29uIHx8IHJlamVjdGlvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICB9KTtcblxuICAgICAgICAgY29uc3Qgc3Bhd25lZCA9IHNwYXduKGNvbW1hbmQsIGFyZ3MsIHNwYXduT3B0aW9ucyk7XG5cbiAgICAgICAgIHNwYXduZWQuc3Rkb3V0IS5vbihcbiAgICAgICAgICAgICdkYXRhJyxcbiAgICAgICAgICAgIG9uRGF0YVJlY2VpdmVkKHN0ZE91dCwgJ3N0ZE91dCcsIGxvZ2dlciwgb3V0cHV0TG9nZ2VyLnN0ZXAoJ3N0ZE91dCcpKVxuICAgICAgICAgKTtcbiAgICAgICAgIHNwYXduZWQuc3RkZXJyIS5vbihcbiAgICAgICAgICAgICdkYXRhJyxcbiAgICAgICAgICAgIG9uRGF0YVJlY2VpdmVkKHN0ZEVyciwgJ3N0ZEVycicsIGxvZ2dlciwgb3V0cHV0TG9nZ2VyLnN0ZXAoJ3N0ZEVycicpKVxuICAgICAgICAgKTtcblxuICAgICAgICAgc3Bhd25lZC5vbignZXJyb3InLCBvbkVycm9yUmVjZWl2ZWQoc3RkRXJyLCBsb2dnZXIpKTtcblxuICAgICAgICAgaWYgKG91dHB1dEhhbmRsZXIpIHtcbiAgICAgICAgICAgIGxvZ2dlcihgUGFzc2luZyBjaGlsZCBwcm9jZXNzIHN0ZE91dC9zdGRFcnIgdG8gY3VzdG9tIG91dHB1dEhhbmRsZXJgKTtcbiAgICAgICAgICAgIG91dHB1dEhhbmRsZXIoY29tbWFuZCwgc3Bhd25lZC5zdGRvdXQhLCBzcGF3bmVkLnN0ZGVyciEsIFsuLi5hcmdzXSk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHRoaXMuX3BsdWdpbnMuZXhlYygnc3Bhd24uYWZ0ZXInLCB1bmRlZmluZWQsIHtcbiAgICAgICAgICAgIC4uLnRoaXMudGFza0NvbnRleHQodGFzaywgYXJncyksXG4gICAgICAgICAgICBzcGF3bmVkLFxuICAgICAgICAgICAgY2xvc2UoZXhpdENvZGU6IG51bWJlciwgcmVhc29uPzogRXJyb3IpIHtcbiAgICAgICAgICAgICAgIGRvbmUoe1xuICAgICAgICAgICAgICAgICAgc3RkT3V0LFxuICAgICAgICAgICAgICAgICAgc3RkRXJyLFxuICAgICAgICAgICAgICAgICAgZXhpdENvZGUsXG4gICAgICAgICAgICAgICAgICByZWplY3Rpb246IHJlamVjdGlvbiB8fCByZWFzb24sXG4gICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBraWxsKHJlYXNvbjogRXJyb3IpIHtcbiAgICAgICAgICAgICAgIGlmIChzcGF3bmVkLmtpbGxlZCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICByZWplY3Rpb24gPSByZWFzb247XG4gICAgICAgICAgICAgICBzcGF3bmVkLmtpbGwoJ1NJR0lOVCcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICB9XG5cbiAgIHByaXZhdGUgX2JlZm9yZVNwYXduPFI+KHRhc2s6IFNpbXBsZUdpdFRhc2s8Uj4sIGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgICBsZXQgcmVqZWN0aW9uOiBNYXliZTxFcnJvcj47XG4gICAgICB0aGlzLl9wbHVnaW5zLmV4ZWMoJ3NwYXduLmJlZm9yZScsIHVuZGVmaW5lZCwge1xuICAgICAgICAgLi4udGhpcy50YXNrQ29udGV4dCh0YXNrLCBhcmdzKSxcbiAgICAgICAgIGtpbGwocmVhc29uKSB7XG4gICAgICAgICAgICByZWplY3Rpb24gPSByZWFzb24gfHwgcmVqZWN0aW9uO1xuICAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVqZWN0aW9uO1xuICAgfVxuXG4gICBwcml2YXRlIHRhc2tDb250ZXh0PFI+KHRhc2s6IFNpbXBsZUdpdFRhc2s8Uj4sIGNvbW1hbmRzOiBzdHJpbmdbXSk6IFNpbXBsZUdpdFRhc2tQbHVnaW5Db250ZXh0IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICBtZXRob2Q6IFN0cmluZyhmaXJzdCh0YXNrLmNvbW1hbmRzKSB8fCAnJyksXG4gICAgICAgICBjb21tYW5kcyxcbiAgICAgICAgIGVudjogeyAuLi50aGlzLmVudiB9LFxuICAgICAgICAgaW5wdXQ6IGlzRW1wdHlUYXNrKHRhc2spID8gdW5kZWZpbmVkIDogdGFzay5pbnB1dCxcbiAgICAgIH07XG4gICB9XG59XG5cbmZ1bmN0aW9uIG9uRXJyb3JSZWNlaXZlZCh0YXJnZXQ6IEJ1ZmZlcltdLCBsb2dnZXI6IE91dHB1dExvZ2dlcikge1xuICAgcmV0dXJuIChlcnI6IEVycm9yKSA9PiB7XG4gICAgICBsb2dnZXIoYFtFUlJPUl0gY2hpbGQgcHJvY2VzcyBleGNlcHRpb24gJW9gLCBlcnIpO1xuICAgICAgdGFyZ2V0LnB1c2goQnVmZmVyLmZyb20oU3RyaW5nKGVyci5zdGFjayksICdhc2NpaScpKTtcbiAgIH07XG59XG5cbmZ1bmN0aW9uIG9uRGF0YVJlY2VpdmVkKFxuICAgdGFyZ2V0OiBCdWZmZXJbXSxcbiAgIG5hbWU6IHN0cmluZyxcbiAgIGxvZ2dlcjogT3V0cHV0TG9nZ2VyLFxuICAgb3V0cHV0OiBPdXRwdXRMb2dnZXJcbikge1xuICAgcmV0dXJuIChidWZmZXI6IEJ1ZmZlcikgPT4ge1xuICAgICAgbG9nZ2VyKGAlcyByZWNlaXZlZCAlTCBieXRlc2AsIG5hbWUsIGJ1ZmZlcik7XG4gICAgICBvdXRwdXQoYCVCYCwgYnVmZmVyKTtcbiAgICAgIHRhcmdldC5wdXNoKGJ1ZmZlcik7XG4gICB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgUGx1Z2luU3RvcmUgfSBmcm9tICcuLi9wbHVnaW5zJztcbmltcG9ydCB0eXBlIHsgR2l0RXhlY3V0b3JFbnYsIG91dHB1dEhhbmRsZXIsIFNpbXBsZUdpdEV4ZWN1dG9yLCBTaW1wbGVHaXRUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgR2l0RXhlY3V0b3JDaGFpbiB9IGZyb20gJy4vZ2l0LWV4ZWN1dG9yLWNoYWluJztcbmltcG9ydCB0eXBlIHsgU2NoZWR1bGVyIH0gZnJvbSAnLi9zY2hlZHVsZXInO1xuXG5leHBvcnQgY2xhc3MgR2l0RXhlY3V0b3IgaW1wbGVtZW50cyBTaW1wbGVHaXRFeGVjdXRvciB7XG4gICBwcml2YXRlIF9jaGFpbjogU2ltcGxlR2l0RXhlY3V0b3I7XG5cbiAgIHB1YmxpYyBlbnY6IEdpdEV4ZWN1dG9yRW52O1xuICAgcHVibGljIG91dHB1dEhhbmRsZXI/OiBvdXRwdXRIYW5kbGVyO1xuXG4gICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBjd2Q6IHN0cmluZyxcbiAgICAgIHByaXZhdGUgX3NjaGVkdWxlcjogU2NoZWR1bGVyLFxuICAgICAgcHJpdmF0ZSBfcGx1Z2luczogUGx1Z2luU3RvcmVcbiAgICkge1xuICAgICAgdGhpcy5fY2hhaW4gPSB0aGlzLmNoYWluKCk7XG4gICB9XG5cbiAgIGNoYWluKCk6IFNpbXBsZUdpdEV4ZWN1dG9yIHtcbiAgICAgIHJldHVybiBuZXcgR2l0RXhlY3V0b3JDaGFpbih0aGlzLCB0aGlzLl9zY2hlZHVsZXIsIHRoaXMuX3BsdWdpbnMpO1xuICAgfVxuXG4gICBwdXNoPFI+KHRhc2s6IFNpbXBsZUdpdFRhc2s8Uj4pOiBQcm9taXNlPFI+IHtcbiAgICAgIHJldHVybiB0aGlzLl9jaGFpbi5wdXNoKHRhc2spO1xuICAgfVxufVxuIiwgImltcG9ydCB0eXBlIHsgR2l0RXJyb3IgfSBmcm9tICcuL2Vycm9ycy9naXQtZXJyb3InO1xuaW1wb3J0IHR5cGUgeyBHaXRSZXNwb25zZUVycm9yIH0gZnJvbSAnLi9lcnJvcnMvZ2l0LXJlc3BvbnNlLWVycm9yJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0VGFzaywgU2ltcGxlR2l0VGFza0NhbGxiYWNrIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBOT09QIH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0YXNrQ2FsbGJhY2s8Uj4oXG4gICB0YXNrOiBTaW1wbGVHaXRUYXNrPFI+LFxuICAgcmVzcG9uc2U6IFByb21pc2U8Uj4sXG4gICBjYWxsYmFjazogU2ltcGxlR2l0VGFza0NhbGxiYWNrPFI+ID0gTk9PUFxuKSB7XG4gICBjb25zdCBvblN1Y2Nlc3MgPSAoZGF0YTogUikgPT4ge1xuICAgICAgY2FsbGJhY2sobnVsbCwgZGF0YSk7XG4gICB9O1xuXG4gICBjb25zdCBvbkVycm9yID0gKGVycjogR2l0RXJyb3IgfCBHaXRSZXNwb25zZUVycm9yKSA9PiB7XG4gICAgICBpZiAoZXJyPy50YXNrID09PSB0YXNrKSB7XG4gICAgICAgICBjYWxsYmFjayhlcnIsIHVuZGVmaW5lZCBhcyBhbnkpO1xuICAgICAgfVxuICAgfTtcblxuICAgcmVzcG9uc2UudGhlbihvblN1Y2Nlc3MsIG9uRXJyb3IpO1xufVxuIiwgImltcG9ydCB0eXBlIHsgU2ltcGxlR2l0RXhlY3V0b3IgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBmb2xkZXJFeGlzdHMgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBhZGhvY0V4ZWNUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZVdvcmtpbmdEaXJlY3RvcnlUYXNrKGRpcmVjdG9yeTogc3RyaW5nLCByb290PzogU2ltcGxlR2l0RXhlY3V0b3IpIHtcbiAgIHJldHVybiBhZGhvY0V4ZWNUYXNrKChpbnN0YW5jZTogU2ltcGxlR2l0RXhlY3V0b3IpID0+IHtcbiAgICAgIGlmICghZm9sZGVyRXhpc3RzKGRpcmVjdG9yeSkpIHtcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihgR2l0LmN3ZDogY2Fubm90IGNoYW5nZSB0byBub24tZGlyZWN0b3J5IFwiJHtkaXJlY3Rvcnl9XCJgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICgocm9vdCB8fCBpbnN0YW5jZSkuY3dkID0gZGlyZWN0b3J5KTtcbiAgIH0pO1xufVxuIiwgImltcG9ydCB0eXBlIHsgU2ltcGxlR2l0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdEFwaSB9IGZyb20gJy4uL3NpbXBsZS1naXQtYXBpJztcbmltcG9ydCB7IGdldFRyYWlsaW5nT3B0aW9ucywgcmVtb3ZlLCB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZnVuY3Rpb24gY2hlY2tvdXRUYXNrKGFyZ3M6IHN0cmluZ1tdKSB7XG4gICBjb25zdCBjb21tYW5kcyA9IFsnY2hlY2tvdXQnLCAuLi5hcmdzXTtcbiAgIGlmIChjb21tYW5kc1sxXSA9PT0gJy1iJyAmJiBjb21tYW5kcy5pbmNsdWRlcygnLUInKSkge1xuICAgICAgY29tbWFuZHNbMV0gPSByZW1vdmUoY29tbWFuZHMsICctQicpO1xuICAgfVxuXG4gICByZXR1cm4gc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhjb21tYW5kcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpOiBQaWNrPFNpbXBsZUdpdCwgJ2NoZWNrb3V0JyB8ICdjaGVja291dEJyYW5jaCcgfCAnY2hlY2tvdXRMb2NhbEJyYW5jaCc+IHtcbiAgIHJldHVybiB7XG4gICAgICBjaGVja291dCh0aGlzOiBTaW1wbGVHaXRBcGkpIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgY2hlY2tvdXRUYXNrKGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMsIDEpKSxcbiAgICAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICAgICApO1xuICAgICAgfSxcblxuICAgICAgY2hlY2tvdXRCcmFuY2godGhpczogU2ltcGxlR2l0QXBpLCBicmFuY2hOYW1lLCBzdGFydFBvaW50KSB7XG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgICAgIGNoZWNrb3V0VGFzayhbJy1iJywgYnJhbmNoTmFtZSwgc3RhcnRQb2ludCwgLi4uZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cyldKSxcbiAgICAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICAgICApO1xuICAgICAgfSxcblxuICAgICAgY2hlY2tvdXRMb2NhbEJyYW5jaCh0aGlzOiBTaW1wbGVHaXRBcGksIGJyYW5jaE5hbWUpIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgY2hlY2tvdXRUYXNrKFsnLWInLCBicmFuY2hOYW1lLCAuLi5nZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKV0pLFxuICAgICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICAgICAgICk7XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgeyBwYXRoc3BlYyB9IGZyb20gJ0BzaW1wbGUtZ2l0L2FyZ3MtcGF0aHNwZWMnO1xuXG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRBcGkgfSBmcm9tICcuLi9zaW1wbGUtZ2l0LWFwaSc7XG5pbXBvcnQgdHlwZSB7IE9wdGlvbkZsYWdzLCBPcHRpb25zLCBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHtcbiAgIGFwcGVuZCxcbiAgIGZpbHRlclN0cmluZyxcbiAgIGZpbHRlclR5cGUsXG4gICBnZXRUcmFpbGluZ09wdGlvbnMsXG4gICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQsXG59IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb25FcnJvclRhc2ssIHR5cGUgRW1wdHlUYXNrLCBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZXhwb3J0IHR5cGUgQ2xvbmVPcHRpb25zID0gT3B0aW9ucyAmXG4gICBPcHRpb25GbGFnczxcbiAgICAgIHwgJy0tYmFyZSdcbiAgICAgIHwgJy0tZGlzc29jaWF0ZSdcbiAgICAgIHwgJy0tbWlycm9yJ1xuICAgICAgfCAnLS1uby1jaGVja291dCdcbiAgICAgIHwgJy0tbm8tcmVtb3RlLXN1Ym1vZHVsZXMnXG4gICAgICB8ICctLW5vLXNoYWxsb3ctc3VibW9kdWxlcydcbiAgICAgIHwgJy0tbm8tc2luZ2xlLWJyYW5jaCdcbiAgICAgIHwgJy0tbm8tdGFncydcbiAgICAgIHwgJy0tcmVtb3RlLXN1Ym1vZHVsZXMnXG4gICAgICB8ICctLXNpbmdsZS1icmFuY2gnXG4gICAgICB8ICctLXNoYWxsb3ctc3VibW9kdWxlcydcbiAgICAgIHwgJy0tdmVyYm9zZSdcbiAgID4gJlxuICAgT3B0aW9uRmxhZ3M8Jy0tZGVwdGgnIHwgJy1qJyB8ICctLWpvYnMnLCBudW1iZXI+ICZcbiAgIE9wdGlvbkZsYWdzPFxuICAgICAgfCAnLS1icmFuY2gnXG4gICAgICB8ICctLW9yaWdpbidcbiAgICAgIHwgJy0tcmVjdXJzZS1zdWJtb2R1bGVzJ1xuICAgICAgfCAnLS1zZXBhcmF0ZS1naXQtZGlyJ1xuICAgICAgfCAnLS1zaGFsbG93LWV4Y2x1ZGUnXG4gICAgICB8ICctLXNoYWxsb3ctc2luY2UnXG4gICAgICB8ICctLXRlbXBsYXRlJyxcbiAgICAgIHN0cmluZ1xuICAgPjtcblxudHlwZSBDbG9uZVRhc2tCdWlsZGVyID0gKFxuICAgcmVwbzogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgZGlyZWN0b3J5OiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICBjdXN0b21BcmdzOiBzdHJpbmdbXVxuKSA9PiBTdHJpbmdUYXNrPHN0cmluZz4gfCBFbXB0eVRhc2s7XG5cbmV4cG9ydCBjb25zdCBjbG9uZVRhc2s6IENsb25lVGFza0J1aWxkZXIgPSAocmVwbywgZGlyZWN0b3J5LCBjdXN0b21BcmdzKSA9PiB7XG4gICBjb25zdCBjb21tYW5kcyA9IFsnY2xvbmUnLCAuLi5jdXN0b21BcmdzXTtcblxuICAgZmlsdGVyU3RyaW5nKHJlcG8pICYmIGNvbW1hbmRzLnB1c2gocGF0aHNwZWMocmVwbykpO1xuICAgZmlsdGVyU3RyaW5nKGRpcmVjdG9yeSkgJiYgY29tbWFuZHMucHVzaChwYXRoc3BlYyhkaXJlY3RvcnkpKTtcblxuICAgcmV0dXJuIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soY29tbWFuZHMpO1xufTtcblxuZXhwb3J0IGNvbnN0IGNsb25lTWlycm9yVGFzazogQ2xvbmVUYXNrQnVpbGRlciA9IChyZXBvLCBkaXJlY3RvcnksIGN1c3RvbUFyZ3MpID0+IHtcbiAgIGFwcGVuZChjdXN0b21BcmdzLCAnLS1taXJyb3InKTtcblxuICAgcmV0dXJuIGNsb25lVGFzayhyZXBvLCBkaXJlY3RvcnksIGN1c3RvbUFyZ3MpO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlQ2xvbmVUYXNrKFxuICAgYXBpOiAnY2xvbmUnIHwgJ21pcnJvcicsXG4gICB0YXNrOiBDbG9uZVRhc2tCdWlsZGVyLFxuICAgcmVwb1BhdGg6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgIC4uLmFyZ3M6IHVua25vd25bXVxuKSB7XG4gICBpZiAoIWZpbHRlclN0cmluZyhyZXBvUGF0aCkpIHtcbiAgICAgIHJldHVybiBjb25maWd1cmF0aW9uRXJyb3JUYXNrKGBnaXQuJHthcGl9KCkgcmVxdWlyZXMgYSBzdHJpbmcgJ3JlcG9QYXRoJ2ApO1xuICAgfVxuXG4gICByZXR1cm4gdGFzayhyZXBvUGF0aCwgZmlsdGVyVHlwZShhcmdzWzBdLCBmaWx0ZXJTdHJpbmcpLCBnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpOiBQaWNrPFNpbXBsZUdpdCwgJ2Nsb25lJyB8ICdtaXJyb3InPiB7XG4gICByZXR1cm4ge1xuICAgICAgY2xvbmUodGhpczogU2ltcGxlR2l0QXBpLCByZXBvOiBzdHJpbmcgfCB1bmtub3duLCAuLi5yZXN0OiB1bmtub3duW10pIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgY3JlYXRlQ2xvbmVUYXNrKCdjbG9uZScsIGNsb25lVGFzaywgZmlsdGVyVHlwZShyZXBvLCBmaWx0ZXJTdHJpbmcpLCAuLi5yZXN0KSxcbiAgICAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIG1pcnJvcih0aGlzOiBTaW1wbGVHaXRBcGksIHJlcG86IHN0cmluZyB8IHVua25vd24sIC4uLnJlc3Q6IHVua25vd25bXSkge1xuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICAgICBjcmVhdGVDbG9uZVRhc2soJ21pcnJvcicsIGNsb25lTWlycm9yVGFzaywgZmlsdGVyVHlwZShyZXBvLCBmaWx0ZXJTdHJpbmcpLCAuLi5yZXN0KSxcbiAgICAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICAgICApO1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBDb21taXRSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IExpbmVQYXJzZXIsIHBhcnNlU3RyaW5nUmVzcG9uc2UgfSBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IHBhcnNlcnM6IExpbmVQYXJzZXI8Q29tbWl0UmVzdWx0PltdID0gW1xuICAgbmV3IExpbmVQYXJzZXIoL15cXFsoW15cXHNdKykoIFxcKFteKV0rXFwpKT8gKFteXFxdXSspLywgKHJlc3VsdCwgW2JyYW5jaCwgcm9vdCwgY29tbWl0XSkgPT4ge1xuICAgICAgcmVzdWx0LmJyYW5jaCA9IGJyYW5jaDtcbiAgICAgIHJlc3VsdC5jb21taXQgPSBjb21taXQ7XG4gICAgICByZXN1bHQucm9vdCA9ICEhcm9vdDtcbiAgIH0pLFxuICAgbmV3IExpbmVQYXJzZXIoL1xccypBdXRob3I6XFxzKC4rKS9pLCAocmVzdWx0LCBbYXV0aG9yXSkgPT4ge1xuICAgICAgY29uc3QgcGFydHMgPSBhdXRob3Iuc3BsaXQoJzwnKTtcbiAgICAgIGNvbnN0IGVtYWlsID0gcGFydHMucG9wKCk7XG5cbiAgICAgIGlmICghZW1haWwgfHwgIWVtYWlsLmluY2x1ZGVzKCdAJykpIHtcbiAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVzdWx0LmF1dGhvciA9IHtcbiAgICAgICAgIGVtYWlsOiBlbWFpbC5zdWJzdHIoMCwgZW1haWwubGVuZ3RoIC0gMSksXG4gICAgICAgICBuYW1lOiBwYXJ0cy5qb2luKCc8JykudHJpbSgpLFxuICAgICAgfTtcbiAgIH0pLFxuICAgbmV3IExpbmVQYXJzZXIoXG4gICAgICAvKFxcZCspW14sXSooPzosXFxzKihcXGQrKVteLF0qKSg/OixcXHMqKFxcZCspKS9nLFxuICAgICAgKHJlc3VsdCwgW2NoYW5nZXMsIGluc2VydGlvbnMsIGRlbGV0aW9uc10pID0+IHtcbiAgICAgICAgIHJlc3VsdC5zdW1tYXJ5LmNoYW5nZXMgPSBwYXJzZUludChjaGFuZ2VzLCAxMCkgfHwgMDtcbiAgICAgICAgIHJlc3VsdC5zdW1tYXJ5Lmluc2VydGlvbnMgPSBwYXJzZUludChpbnNlcnRpb25zLCAxMCkgfHwgMDtcbiAgICAgICAgIHJlc3VsdC5zdW1tYXJ5LmRlbGV0aW9ucyA9IHBhcnNlSW50KGRlbGV0aW9ucywgMTApIHx8IDA7XG4gICAgICB9XG4gICApLFxuICAgbmV3IExpbmVQYXJzZXIoXG4gICAgICAvXihcXGQrKVteLF0qKD86LFxccyooXFxkKylbXihdK1xcKChbKy1dKSk/LyxcbiAgICAgIChyZXN1bHQsIFtjaGFuZ2VzLCBsaW5lcywgZGlyZWN0aW9uXSkgPT4ge1xuICAgICAgICAgcmVzdWx0LnN1bW1hcnkuY2hhbmdlcyA9IHBhcnNlSW50KGNoYW5nZXMsIDEwKSB8fCAwO1xuICAgICAgICAgY29uc3QgY291bnQgPSBwYXJzZUludChsaW5lcywgMTApIHx8IDA7XG4gICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnLScpIHtcbiAgICAgICAgICAgIHJlc3VsdC5zdW1tYXJ5LmRlbGV0aW9ucyA9IGNvdW50O1xuICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICcrJykge1xuICAgICAgICAgICAgcmVzdWx0LnN1bW1hcnkuaW5zZXJ0aW9ucyA9IGNvdW50O1xuICAgICAgICAgfVxuICAgICAgfVxuICAgKSxcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUNvbW1pdFJlc3VsdChzdGRPdXQ6IHN0cmluZyk6IENvbW1pdFJlc3VsdCB7XG4gICBjb25zdCByZXN1bHQ6IENvbW1pdFJlc3VsdCA9IHtcbiAgICAgIGF1dGhvcjogbnVsbCxcbiAgICAgIGJyYW5jaDogJycsXG4gICAgICBjb21taXQ6ICcnLFxuICAgICAgcm9vdDogZmFsc2UsXG4gICAgICBzdW1tYXJ5OiB7XG4gICAgICAgICBjaGFuZ2VzOiAwLFxuICAgICAgICAgaW5zZXJ0aW9uczogMCxcbiAgICAgICAgIGRlbGV0aW9uczogMCxcbiAgICAgIH0sXG4gICB9O1xuICAgcmV0dXJuIHBhcnNlU3RyaW5nUmVzcG9uc2UocmVzdWx0LCBwYXJzZXJzLCBzdGRPdXQpO1xufVxuIiwgImltcG9ydCB0eXBlIHsgQ29tbWl0UmVzdWx0LCBTaW1wbGVHaXQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IHBhcnNlQ29tbWl0UmVzdWx0IH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZS1jb21taXQnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRBcGkgfSBmcm9tICcuLi9zaW1wbGUtZ2l0LWFwaSc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQge1xuICAgYXNBcnJheSxcbiAgIGFzU3RyaW5nQXJyYXksXG4gICBmaWx0ZXJBcnJheSxcbiAgIGZpbHRlclN0cmluZ09yU3RyaW5nQXJyYXksXG4gICBmaWx0ZXJUeXBlLFxuICAgZ2V0VHJhaWxpbmdPcHRpb25zLFxuICAgcHJlZml4ZWRBcnJheSxcbiAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudCxcbn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgY29uZmlndXJhdGlvbkVycm9yVGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21taXRUYXNrKFxuICAgbWVzc2FnZTogc3RyaW5nW10sXG4gICBmaWxlczogc3RyaW5nW10sXG4gICBjdXN0b21BcmdzOiBzdHJpbmdbXVxuKTogU3RyaW5nVGFzazxDb21taXRSZXN1bHQ+IHtcbiAgIGNvbnN0IGNvbW1hbmRzOiBzdHJpbmdbXSA9IFtcbiAgICAgICctYycsXG4gICAgICAnY29yZS5hYmJyZXY9NDAnLFxuICAgICAgJ2NvbW1pdCcsXG4gICAgICAuLi5wcmVmaXhlZEFycmF5KG1lc3NhZ2UsICctbScpLFxuICAgICAgLi4uZmlsZXMsXG4gICAgICAuLi5jdXN0b21BcmdzLFxuICAgXTtcblxuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgcGFyc2VyOiBwYXJzZUNvbW1pdFJlc3VsdCxcbiAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpOiBQaWNrPFNpbXBsZUdpdCwgJ2NvbW1pdCc+IHtcbiAgIHJldHVybiB7XG4gICAgICBjb21taXQodGhpczogU2ltcGxlR2l0QXBpLCBtZXNzYWdlOiBzdHJpbmcgfCBzdHJpbmdbXSwgLi4ucmVzdDogdW5rbm93bltdKSB7XG4gICAgICAgICBjb25zdCBuZXh0ID0gdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cyk7XG4gICAgICAgICBjb25zdCB0YXNrID1cbiAgICAgICAgICAgIHJlamVjdERlcHJlY2F0ZWRTaWduYXR1cmVzKG1lc3NhZ2UpIHx8XG4gICAgICAgICAgICBjb21taXRUYXNrKFxuICAgICAgICAgICAgICAgYXNBcnJheShtZXNzYWdlKSxcbiAgICAgICAgICAgICAgIGFzQXJyYXkoZmlsdGVyVHlwZShyZXN0WzBdLCBmaWx0ZXJTdHJpbmdPclN0cmluZ0FycmF5LCBbXSkpLFxuICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgLi4uYXNTdHJpbmdBcnJheShmaWx0ZXJUeXBlKHJlc3RbMV0sIGZpbHRlckFycmF5LCBbXSkpLFxuICAgICAgICAgICAgICAgICAgLi4uZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cywgMCwgdHJ1ZSksXG4gICAgICAgICAgICAgICBdXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayh0YXNrLCBuZXh0KTtcbiAgICAgIH0sXG4gICB9O1xuXG4gICBmdW5jdGlvbiByZWplY3REZXByZWNhdGVkU2lnbmF0dXJlcyhtZXNzYWdlPzogdW5rbm93bikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgICFmaWx0ZXJTdHJpbmdPclN0cmluZ0FycmF5KG1lc3NhZ2UpICYmXG4gICAgICAgICBjb25maWd1cmF0aW9uRXJyb3JUYXNrKFxuICAgICAgICAgICAgYGdpdC5jb21taXQ6IHJlcXVpcmVzIHRoZSBjb21taXQgbWVzc2FnZSB0byBiZSBzdXBwbGllZCBhcyBhIHN0cmluZy9zdHJpbmdbXWBcbiAgICAgICAgIClcbiAgICAgICk7XG4gICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0QXBpIH0gZnJvbSAnLi4vc2ltcGxlLWdpdC1hcGknO1xuaW1wb3J0IHsgYXNDYW1lbENhc2UsIGFzTnVtYmVyLCBMaW5lUGFyc2VyLCBwYXJzZVN0cmluZ1Jlc3BvbnNlIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvdW50T2JqZWN0c1Jlc3VsdCB7XG4gICBjb3VudDogbnVtYmVyO1xuICAgc2l6ZTogbnVtYmVyO1xuICAgaW5QYWNrOiBudW1iZXI7XG4gICBwYWNrczogbnVtYmVyO1xuICAgc2l6ZVBhY2s6IG51bWJlcjtcbiAgIHBydW5lUGFja2FibGU6IG51bWJlcjtcbiAgIGdhcmJhZ2U6IG51bWJlcjtcbiAgIHNpemVHYXJiYWdlOiBudW1iZXI7XG59XG5cbmZ1bmN0aW9uIGNvdW50T2JqZWN0c1Jlc3BvbnNlKCk6IENvdW50T2JqZWN0c1Jlc3VsdCB7XG4gICByZXR1cm4ge1xuICAgICAgY291bnQ6IDAsXG4gICAgICBnYXJiYWdlOiAwLFxuICAgICAgaW5QYWNrOiAwLFxuICAgICAgcGFja3M6IDAsXG4gICAgICBwcnVuZVBhY2thYmxlOiAwLFxuICAgICAgc2l6ZTogMCxcbiAgICAgIHNpemVHYXJiYWdlOiAwLFxuICAgICAgc2l6ZVBhY2s6IDAsXG4gICB9O1xufVxuXG5jb25zdCBwYXJzZXI6IExpbmVQYXJzZXI8Q291bnRPYmplY3RzUmVzdWx0PiA9IG5ldyBMaW5lUGFyc2VyKFxuICAgLyhbYS16LV0rKTogKFxcZCspJC8sXG4gICAocmVzdWx0LCBba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgIGNvbnN0IHByb3BlcnR5ID0gYXNDYW1lbENhc2Uoa2V5KTtcbiAgICAgIGlmIChPYmplY3QuaGFzT3duKHJlc3VsdCwgcHJvcGVydHkpKSB7XG4gICAgICAgICByZXN1bHRbcHJvcGVydHkgYXMga2V5b2YgdHlwZW9mIHJlc3VsdF0gPSBhc051bWJlcih2YWx1ZSk7XG4gICAgICB9XG4gICB9XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKTogUGljazxTaW1wbGVHaXQsICdjb3VudE9iamVjdHMnPiB7XG4gICByZXR1cm4ge1xuICAgICAgY291bnRPYmplY3RzKHRoaXM6IFNpbXBsZUdpdEFwaSkge1xuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soe1xuICAgICAgICAgICAgY29tbWFuZHM6IFsnY291bnQtb2JqZWN0cycsICctLXZlcmJvc2UnXSxcbiAgICAgICAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgICAgICAgIHBhcnNlcihzdGRPdXQ6IHN0cmluZykge1xuICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlU3RyaW5nUmVzcG9uc2UoY291bnRPYmplY3RzUmVzcG9uc2UoKSwgW3BhcnNlcl0sIHN0ZE91dCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgfSk7XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFJlc3BvbnNlLCBTaW1wbGVHaXQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0QXBpIH0gZnJvbSAnLi4vc2ltcGxlLWdpdC1hcGknO1xuaW1wb3J0IHsgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpOiBQaWNrPFNpbXBsZUdpdCwgJ2ZpcnN0Q29tbWl0Jz4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGZpcnN0Q29tbWl0KHRoaXM6IFNpbXBsZUdpdEFwaSk6IFJlc3BvbnNlPHN0cmluZz4ge1xuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICAgICBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKFsncmV2LWxpc3QnLCAnLS1tYXgtcGFyZW50cz0wJywgJ0hFQUQnXSwgdHJ1ZSksXG4gICAgICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgICAgKTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG4vKipcbiAqIFRhc2sgdXNlZCBieSBgZ2l0Lmhhc2hPYmplY3RgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNoT2JqZWN0VGFzayhmaWxlUGF0aDogc3RyaW5nLCB3cml0ZTogYm9vbGVhbik6IFN0cmluZ1Rhc2s8c3RyaW5nPiB7XG4gICBjb25zdCBjb21tYW5kcyA9IFsnaGFzaC1vYmplY3QnLCBmaWxlUGF0aF07XG4gICBpZiAod3JpdGUpIHtcbiAgICAgIGNvbW1hbmRzLnB1c2goJy13Jyk7XG4gICB9XG5cbiAgIHJldHVybiBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKGNvbW1hbmRzLCB0cnVlKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IEluaXRSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcblxuZXhwb3J0IGNsYXNzIEluaXRTdW1tYXJ5IGltcGxlbWVudHMgSW5pdFJlc3VsdCB7XG4gICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyByZWFkb25seSBiYXJlOiBib29sZWFuLFxuICAgICAgcHVibGljIHJlYWRvbmx5IHBhdGg6IHN0cmluZyxcbiAgICAgIHB1YmxpYyByZWFkb25seSBleGlzdGluZzogYm9vbGVhbixcbiAgICAgIHB1YmxpYyByZWFkb25seSBnaXREaXI6IHN0cmluZ1xuICAgKSB7fVxufVxuXG5jb25zdCBpbml0UmVzcG9uc2VSZWdleCA9IC9eSW5pdC4rIHJlcG9zaXRvcnkgaW4gKC4rKSQvO1xuY29uc3QgcmVJbml0UmVzcG9uc2VSZWdleCA9IC9eUmVpbi4rIGluICguKykkLztcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlSW5pdChiYXJlOiBib29sZWFuLCBwYXRoOiBzdHJpbmcsIHRleHQ6IHN0cmluZykge1xuICAgY29uc3QgcmVzcG9uc2UgPSBTdHJpbmcodGV4dCkudHJpbSgpO1xuICAgbGV0IHJlc3VsdDtcblxuICAgaWYgKChyZXN1bHQgPSBpbml0UmVzcG9uc2VSZWdleC5leGVjKHJlc3BvbnNlKSkpIHtcbiAgICAgIHJldHVybiBuZXcgSW5pdFN1bW1hcnkoYmFyZSwgcGF0aCwgZmFsc2UsIHJlc3VsdFsxXSk7XG4gICB9XG5cbiAgIGlmICgocmVzdWx0ID0gcmVJbml0UmVzcG9uc2VSZWdleC5leGVjKHJlc3BvbnNlKSkpIHtcbiAgICAgIHJldHVybiBuZXcgSW5pdFN1bW1hcnkoYmFyZSwgcGF0aCwgdHJ1ZSwgcmVzdWx0WzFdKTtcbiAgIH1cblxuICAgbGV0IGdpdERpciA9ICcnO1xuICAgY29uc3QgdG9rZW5zID0gcmVzcG9uc2Uuc3BsaXQoJyAnKTtcbiAgIHdoaWxlICh0b2tlbnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCB0b2tlbiA9IHRva2Vucy5zaGlmdCgpO1xuICAgICAgaWYgKHRva2VuID09PSAnaW4nKSB7XG4gICAgICAgICBnaXREaXIgPSB0b2tlbnMuam9pbignICcpO1xuICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICB9XG5cbiAgIHJldHVybiBuZXcgSW5pdFN1bW1hcnkoYmFyZSwgcGF0aCwgL15yZS9pLnRlc3QocmVzcG9uc2UpLCBnaXREaXIpO1xufVxuIiwgImltcG9ydCB0eXBlIHsgSW5pdFJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgcGFyc2VJbml0IH0gZnJvbSAnLi4vcmVzcG9uc2VzL0luaXRTdW1tYXJ5JztcbmltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcblxuY29uc3QgYmFyZUNvbW1hbmQgPSAnLS1iYXJlJztcblxuZnVuY3Rpb24gaGFzQmFyZUNvbW1hbmQoY29tbWFuZDogc3RyaW5nW10pIHtcbiAgIHJldHVybiBjb21tYW5kLmluY2x1ZGVzKGJhcmVDb21tYW5kKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRUYXNrKGJhcmUgPSBmYWxzZSwgcGF0aDogc3RyaW5nLCBjdXN0b21BcmdzOiBzdHJpbmdbXSk6IFN0cmluZ1Rhc2s8SW5pdFJlc3VsdD4ge1xuICAgY29uc3QgY29tbWFuZHMgPSBbJ2luaXQnLCAuLi5jdXN0b21BcmdzXTtcbiAgIGlmIChiYXJlICYmICFoYXNCYXJlQ29tbWFuZChjb21tYW5kcykpIHtcbiAgICAgIGNvbW1hbmRzLnNwbGljZSgxLCAwLCBiYXJlQ29tbWFuZCk7XG4gICB9XG5cbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kcyxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIHBhcnNlcih0ZXh0OiBzdHJpbmcpOiBJbml0UmVzdWx0IHtcbiAgICAgICAgIHJldHVybiBwYXJzZUluaXQoY29tbWFuZHMuaW5jbHVkZXMoJy0tYmFyZScpLCBwYXRoLCB0ZXh0KTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgU2ltcGxlR2l0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdEFwaSB9IGZyb20gJy4uL3NpbXBsZS1naXQtYXBpJztcbmltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7XG4gICBhc0NhbWVsQ2FzZSxcbiAgIGZpbHRlclN0cmluZ09yQnVmZmVyLFxuICAgZmlsdGVyVHlwZSxcbiAgIGZvckVhY2hMaW5lV2l0aENvbnRlbnQsXG4gICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQsXG59IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb25FcnJvclRhc2ssIHR5cGUgRW1wdHlUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZnVuY3Rpb24gaW50ZXJwcmV0VHJhaWxlcnNUYXNrKFxuICAgaW5wdXQ/OiBzdHJpbmcgfCBCdWZmZXJcbik6IFN0cmluZ1Rhc2s8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4gfCBFbXB0eVRhc2sge1xuICAgaWYgKGlucHV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBjb25maWd1cmF0aW9uRXJyb3JUYXNrKGBpbnRlcnByZXRUcmFpbGVycyBjYWxsZWQgd2l0aG91dCBpbnB1dCBjb250ZW50YCk7XG4gICB9XG5cbiAgIHJldHVybiB7XG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXIoc3RkT3V0KSB7XG4gICAgICAgICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgICAgICAgICAgZm9yRWFjaExpbmVXaXRoQ29udGVudChzdGRPdXQsIChsaW5lKSA9PiB7XG4gICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgIGFzQ2FtZWxDYXNlKGxpbmUuc3Vic3RyaW5nKDAsIGluZGV4KS50b0xvd2VyQ2FzZSgpKSxcbiAgICAgICAgICAgICAgICAgIGxpbmUuc3Vic3RyaW5nKGluZGV4ICsgMikudHJpbSgpLFxuICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIGNvbW1hbmRzOiBbJ2ludGVycHJldC10cmFpbGVycycsICctLXBhcnNlJ10sXG4gICAgICBpbnB1dCxcbiAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpOiBQaWNrPFNpbXBsZUdpdCwgJ2ludGVycHJldFRyYWlsZXJzJz4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGludGVycHJldFRyYWlsZXJzKHRoaXM6IFNpbXBsZUdpdEFwaSwgaW5wdXQpIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgaW50ZXJwcmV0VHJhaWxlcnNUYXNrKGZpbHRlclR5cGUoaW5wdXQsIGZpbHRlclN0cmluZ09yQnVmZmVyKSksXG4gICAgICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgICAgKTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImV4cG9ydCBlbnVtIExvZ0Zvcm1hdCB7XG4gICBOT05FID0gJycsXG4gICBTVEFUID0gJy0tc3RhdCcsXG4gICBOVU1fU1RBVCA9ICctLW51bXN0YXQnLFxuICAgTkFNRV9PTkxZID0gJy0tbmFtZS1vbmx5JyxcbiAgIE5BTUVfU1RBVFVTID0gJy0tbmFtZS1zdGF0dXMnLFxufVxuXG5jb25zdCBsb2dGb3JtYXRSZWdleCA9IC9eLS0oc3RhdHxudW1zdGF0fG5hbWUtb25seXxuYW1lLXN0YXR1cykoPXwkKS87XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2dGb3JtYXRGcm9tQ29tbWFuZChjdXN0b21BcmdzOiBzdHJpbmdbXSkge1xuICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXN0b21BcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBmb3JtYXQgPSBsb2dGb3JtYXRSZWdleC5leGVjKGN1c3RvbUFyZ3NbaV0pO1xuICAgICAgaWYgKGZvcm1hdCkge1xuICAgICAgICAgcmV0dXJuIGAtLSR7Zm9ybWF0WzFdfWAgYXMgTG9nRm9ybWF0O1xuICAgICAgfVxuICAgfVxuXG4gICByZXR1cm4gTG9nRm9ybWF0Lk5PTkU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xvZ0Zvcm1hdChjdXN0b21Bcmc6IHN0cmluZyB8IHVua25vd24pIHtcbiAgIHJldHVybiBsb2dGb3JtYXRSZWdleC50ZXN0KGN1c3RvbUFyZyBhcyBzdHJpbmcpO1xufVxuIiwgImltcG9ydCB0eXBlIHsgRGlmZlJlc3VsdCwgRGlmZlJlc3VsdEJpbmFyeUZpbGUsIERpZmZSZXN1bHRUZXh0RmlsZSB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuXG4vKioqXG4gKiBUaGUgRGlmZlN1bW1hcnkgaXMgcmV0dXJuZWQgYXMgYSByZXNwb25zZSB0byBnZXR0aW5nIGBnaXQoKS5zdGF0dXMoKWBcbiAqL1xuZXhwb3J0IGNsYXNzIERpZmZTdW1tYXJ5IGltcGxlbWVudHMgRGlmZlJlc3VsdCB7XG4gICBjaGFuZ2VkID0gMDtcbiAgIGRlbGV0aW9ucyA9IDA7XG4gICBpbnNlcnRpb25zID0gMDtcblxuICAgZmlsZXM6IEFycmF5PERpZmZSZXN1bHRUZXh0RmlsZSB8IERpZmZSZXN1bHRCaW5hcnlGaWxlPiA9IFtdO1xufVxuIiwgImltcG9ydCB0eXBlIHsgRGlmZlJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgTG9nRm9ybWF0IH0gZnJvbSAnLi4vYXJncy9sb2ctZm9ybWF0JztcbmltcG9ydCB7IERpZmZTdW1tYXJ5IH0gZnJvbSAnLi4vcmVzcG9uc2VzL0RpZmZTdW1tYXJ5JztcbmltcG9ydCB7IGlzRGlmZk5hbWVTdGF0dXMgfSBmcm9tICcuLi90YXNrcy9kaWZmLW5hbWUtc3RhdHVzJztcbmltcG9ydCB7IGFzTnVtYmVyLCBMaW5lUGFyc2VyLCBvclZvaWQsIHBhcnNlU3RyaW5nUmVzcG9uc2UgfSBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IHN0YXRQYXJzZXIgPSBbXG4gICBuZXcgTGluZVBhcnNlcjxEaWZmUmVzdWx0PihcbiAgICAgIC9eKC4rKVxccytcXHxcXHMrKFxcZCspKFxccytbK1xcLV0rKT8kLyxcbiAgICAgIChyZXN1bHQsIFtmaWxlLCBjaGFuZ2VzLCBhbHRlcmF0aW9ucyA9ICcnXSkgPT4ge1xuICAgICAgICAgcmVzdWx0LmZpbGVzLnB1c2goe1xuICAgICAgICAgICAgZmlsZTogZmlsZS50cmltKCksXG4gICAgICAgICAgICBjaGFuZ2VzOiBhc051bWJlcihjaGFuZ2VzKSxcbiAgICAgICAgICAgIGluc2VydGlvbnM6IGFsdGVyYXRpb25zLnJlcGxhY2UoL1teK10vZywgJycpLmxlbmd0aCxcbiAgICAgICAgICAgIGRlbGV0aW9uczogYWx0ZXJhdGlvbnMucmVwbGFjZSgvW14tXS9nLCAnJykubGVuZ3RoLFxuICAgICAgICAgICAgYmluYXJ5OiBmYWxzZSxcbiAgICAgICAgIH0pO1xuICAgICAgfVxuICAgKSxcbiAgIG5ldyBMaW5lUGFyc2VyPERpZmZSZXN1bHQ+KFxuICAgICAgL14oLispIFxcfFxccytCaW4gKFswLTkuXSspIC0+IChbMC05Ll0rKSAoW2Etel0rKS8sXG4gICAgICAocmVzdWx0LCBbZmlsZSwgYmVmb3JlLCBhZnRlcl0pID0+IHtcbiAgICAgICAgIHJlc3VsdC5maWxlcy5wdXNoKHtcbiAgICAgICAgICAgIGZpbGU6IGZpbGUudHJpbSgpLFxuICAgICAgICAgICAgYmVmb3JlOiBhc051bWJlcihiZWZvcmUpLFxuICAgICAgICAgICAgYWZ0ZXI6IGFzTnVtYmVyKGFmdGVyKSxcbiAgICAgICAgICAgIGJpbmFyeTogdHJ1ZSxcbiAgICAgICAgIH0pO1xuICAgICAgfVxuICAgKSxcbiAgIG5ldyBMaW5lUGFyc2VyPERpZmZSZXN1bHQ+KC9eKC4rKVxccytcXHxcXHMrQmluXFxzKiQvLCAocmVzdWx0LCBbZmlsZV0pID0+IHtcbiAgICAgIHJlc3VsdC5maWxlcy5wdXNoKHtcbiAgICAgICAgIGZpbGU6IGZpbGUudHJpbSgpLFxuICAgICAgICAgYmVmb3JlOiAwLFxuICAgICAgICAgYWZ0ZXI6IDAsXG4gICAgICAgICBiaW5hcnk6IHRydWUsXG4gICAgICB9KTtcbiAgIH0pLFxuICAgbmV3IExpbmVQYXJzZXI8RGlmZlJlc3VsdD4oXG4gICAgICAvKFxcZCspIGZpbGVzPyBjaGFuZ2VkXFxzKigoPzosIFxcZCsgW14sXSspezAsMn0pLyxcbiAgICAgIChyZXN1bHQsIFtjaGFuZ2VkLCBzdW1tYXJ5XSkgPT4ge1xuICAgICAgICAgY29uc3QgaW5zZXJ0ZWQgPSAvKFxcZCspIGkvLmV4ZWMoc3VtbWFyeSk7XG4gICAgICAgICBjb25zdCBkZWxldGVkID0gLyhcXGQrKSBkLy5leGVjKHN1bW1hcnkpO1xuXG4gICAgICAgICByZXN1bHQuY2hhbmdlZCA9IGFzTnVtYmVyKGNoYW5nZWQpO1xuICAgICAgICAgcmVzdWx0Lmluc2VydGlvbnMgPSBhc051bWJlcihpbnNlcnRlZD8uWzFdKTtcbiAgICAgICAgIHJlc3VsdC5kZWxldGlvbnMgPSBhc051bWJlcihkZWxldGVkPy5bMV0pO1xuICAgICAgfVxuICAgKSxcbl07XG5cbmNvbnN0IG51bVN0YXRQYXJzZXIgPSBbXG4gICBuZXcgTGluZVBhcnNlcjxEaWZmUmVzdWx0PihcbiAgICAgIC8oXFxkKylcXHQoXFxkKylcXHQoLispJC8sXG4gICAgICAocmVzdWx0LCBbY2hhbmdlc0luc2VydCwgY2hhbmdlc0RlbGV0ZSwgZmlsZV0pID0+IHtcbiAgICAgICAgIGNvbnN0IGluc2VydGlvbnMgPSBhc051bWJlcihjaGFuZ2VzSW5zZXJ0KTtcbiAgICAgICAgIGNvbnN0IGRlbGV0aW9ucyA9IGFzTnVtYmVyKGNoYW5nZXNEZWxldGUpO1xuXG4gICAgICAgICByZXN1bHQuY2hhbmdlZCsrO1xuICAgICAgICAgcmVzdWx0Lmluc2VydGlvbnMgKz0gaW5zZXJ0aW9ucztcbiAgICAgICAgIHJlc3VsdC5kZWxldGlvbnMgKz0gZGVsZXRpb25zO1xuXG4gICAgICAgICByZXN1bHQuZmlsZXMucHVzaCh7XG4gICAgICAgICAgICBmaWxlLFxuICAgICAgICAgICAgY2hhbmdlczogaW5zZXJ0aW9ucyArIGRlbGV0aW9ucyxcbiAgICAgICAgICAgIGluc2VydGlvbnMsXG4gICAgICAgICAgICBkZWxldGlvbnMsXG4gICAgICAgICAgICBiaW5hcnk6IGZhbHNlLFxuICAgICAgICAgfSk7XG4gICAgICB9XG4gICApLFxuICAgbmV3IExpbmVQYXJzZXI8RGlmZlJlc3VsdD4oLy1cXHQtXFx0KC4rKSQvLCAocmVzdWx0LCBbZmlsZV0pID0+IHtcbiAgICAgIHJlc3VsdC5jaGFuZ2VkKys7XG5cbiAgICAgIHJlc3VsdC5maWxlcy5wdXNoKHtcbiAgICAgICAgIGZpbGUsXG4gICAgICAgICBhZnRlcjogMCxcbiAgICAgICAgIGJlZm9yZTogMCxcbiAgICAgICAgIGJpbmFyeTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgfSksXG5dO1xuXG5jb25zdCBuYW1lT25seVBhcnNlciA9IFtcbiAgIG5ldyBMaW5lUGFyc2VyPERpZmZSZXN1bHQ+KC8oLispJC8sIChyZXN1bHQsIFtmaWxlXSkgPT4ge1xuICAgICAgcmVzdWx0LmNoYW5nZWQrKztcbiAgICAgIHJlc3VsdC5maWxlcy5wdXNoKHtcbiAgICAgICAgIGZpbGUsXG4gICAgICAgICBjaGFuZ2VzOiAwLFxuICAgICAgICAgaW5zZXJ0aW9uczogMCxcbiAgICAgICAgIGRlbGV0aW9uczogMCxcbiAgICAgICAgIGJpbmFyeTogZmFsc2UsXG4gICAgICB9KTtcbiAgIH0pLFxuXTtcblxuY29uc3QgbmFtZVN0YXR1c1BhcnNlciA9IFtcbiAgIG5ldyBMaW5lUGFyc2VyPERpZmZSZXN1bHQ+KFxuICAgICAgLyhbQUNETVJUVVhCXSkoWzAtOV17MCwzfSlcXHQoLlteXFx0XSopKFxcdCguW15cXHRdKikpPyQvLFxuICAgICAgKHJlc3VsdCwgW3N0YXR1cywgc2ltaWxhcml0eSwgZnJvbSwgX3RvLCB0b10pID0+IHtcbiAgICAgICAgIHJlc3VsdC5jaGFuZ2VkKys7XG4gICAgICAgICByZXN1bHQuZmlsZXMucHVzaCh7XG4gICAgICAgICAgICBmaWxlOiB0byA/PyBmcm9tLFxuICAgICAgICAgICAgY2hhbmdlczogMCxcbiAgICAgICAgICAgIGluc2VydGlvbnM6IDAsXG4gICAgICAgICAgICBkZWxldGlvbnM6IDAsXG4gICAgICAgICAgICBiaW5hcnk6IGZhbHNlLFxuICAgICAgICAgICAgc3RhdHVzOiBvclZvaWQoaXNEaWZmTmFtZVN0YXR1cyhzdGF0dXMpICYmIHN0YXR1cyksXG4gICAgICAgICAgICBmcm9tOiBvclZvaWQoISF0byAmJiBmcm9tICE9PSB0byAmJiBmcm9tKSxcbiAgICAgICAgICAgIHNpbWlsYXJpdHk6IGFzTnVtYmVyKHNpbWlsYXJpdHkpLFxuICAgICAgICAgfSk7XG4gICAgICB9XG4gICApLFxuXTtcblxuY29uc3QgZGlmZlN1bW1hcnlQYXJzZXJzOiBSZWNvcmQ8TG9nRm9ybWF0LCBMaW5lUGFyc2VyPERpZmZSZXN1bHQ+W10+ID0ge1xuICAgW0xvZ0Zvcm1hdC5OT05FXTogc3RhdFBhcnNlcixcbiAgIFtMb2dGb3JtYXQuU1RBVF06IHN0YXRQYXJzZXIsXG4gICBbTG9nRm9ybWF0Lk5VTV9TVEFUXTogbnVtU3RhdFBhcnNlcixcbiAgIFtMb2dGb3JtYXQuTkFNRV9TVEFUVVNdOiBuYW1lU3RhdHVzUGFyc2VyLFxuICAgW0xvZ0Zvcm1hdC5OQU1FX09OTFldOiBuYW1lT25seVBhcnNlcixcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREaWZmUGFyc2VyKGZvcm1hdCA9IExvZ0Zvcm1hdC5OT05FKSB7XG4gICBjb25zdCBwYXJzZXIgPSBkaWZmU3VtbWFyeVBhcnNlcnNbZm9ybWF0XTtcblxuICAgcmV0dXJuIChzdGRPdXQ6IHN0cmluZykgPT4gcGFyc2VTdHJpbmdSZXNwb25zZShuZXcgRGlmZlN1bW1hcnkoKSwgcGFyc2VyLCBzdGRPdXQsIGZhbHNlKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IExpc3RMb2dMaW5lLCBMb2dSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IExvZ0Zvcm1hdCB9IGZyb20gJy4uL2FyZ3MvbG9nLWZvcm1hdCc7XG5pbXBvcnQgeyB0b0xpbmVzV2l0aENvbnRlbnQgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBnZXREaWZmUGFyc2VyIH0gZnJvbSAnLi9wYXJzZS1kaWZmLXN1bW1hcnknO1xuXG5leHBvcnQgY29uc3QgU1RBUlRfQk9VTkRBUlkgPSAnw7LDssOyw7LDssOyICc7XG5cbmV4cG9ydCBjb25zdCBDT01NSVRfQk9VTkRBUlkgPSAnIMOyw7InO1xuXG5leHBvcnQgY29uc3QgU1BMSVRURVIgPSAnIMOyICc7XG5cbmNvbnN0IGRlZmF1bHRGaWVsZE5hbWVzID0gWydoYXNoJywgJ2RhdGUnLCAnbWVzc2FnZScsICdyZWZzJywgJ2F1dGhvcl9uYW1lJywgJ2F1dGhvcl9lbWFpbCddO1xuXG5mdW5jdGlvbiBsaW5lQnVpbGRlcih0b2tlbnM6IHN0cmluZ1tdLCBmaWVsZHM6IHN0cmluZ1tdKTogYW55IHtcbiAgIHJldHVybiBmaWVsZHMucmVkdWNlKFxuICAgICAgKGxpbmUsIGZpZWxkLCBpbmRleCkgPT4ge1xuICAgICAgICAgbGluZVtmaWVsZF0gPSB0b2tlbnNbaW5kZXhdIHx8ICcnO1xuICAgICAgICAgcmV0dXJuIGxpbmU7XG4gICAgICB9LFxuICAgICAgT2JqZWN0LmNyZWF0ZSh7IGRpZmY6IG51bGwgfSkgYXMgYW55XG4gICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGlzdExvZ1N1bW1hcnlQYXJzZXI8VCA9IGFueT4oXG4gICBzcGxpdHRlciA9IFNQTElUVEVSLFxuICAgZmllbGRzID0gZGVmYXVsdEZpZWxkTmFtZXMsXG4gICBsb2dGb3JtYXQgPSBMb2dGb3JtYXQuTk9ORVxuKSB7XG4gICBjb25zdCBwYXJzZURpZmZSZXN1bHQgPSBnZXREaWZmUGFyc2VyKGxvZ0Zvcm1hdCk7XG5cbiAgIHJldHVybiBmdW5jdGlvbiAoc3RkT3V0OiBzdHJpbmcpOiBMb2dSZXN1bHQ8VD4ge1xuICAgICAgY29uc3QgYWxsOiBSZWFkb25seUFycmF5PFQgJiBMaXN0TG9nTGluZT4gPSB0b0xpbmVzV2l0aENvbnRlbnQoXG4gICAgICAgICBzdGRPdXQudHJpbSgpLFxuICAgICAgICAgZmFsc2UsXG4gICAgICAgICBTVEFSVF9CT1VOREFSWVxuICAgICAgKS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgIGNvbnN0IGxpbmVEZXRhaWwgPSBpdGVtLnNwbGl0KENPTU1JVF9CT1VOREFSWSk7XG4gICAgICAgICBjb25zdCBsaXN0TG9nTGluZTogVCAmIExpc3RMb2dMaW5lID0gbGluZUJ1aWxkZXIobGluZURldGFpbFswXS5zcGxpdChzcGxpdHRlciksIGZpZWxkcyk7XG5cbiAgICAgICAgIGlmIChsaW5lRGV0YWlsLmxlbmd0aCA+IDEgJiYgbGluZURldGFpbFsxXS50cmltKCkpIHtcbiAgICAgICAgICAgIGxpc3RMb2dMaW5lLmRpZmYgPSBwYXJzZURpZmZSZXN1bHQobGluZURldGFpbFsxXSk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHJldHVybiBsaXN0TG9nTGluZTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAgYWxsLFxuICAgICAgICAgbGF0ZXN0OiAoYWxsLmxlbmd0aCAmJiBhbGxbMF0pIHx8IG51bGwsXG4gICAgICAgICB0b3RhbDogYWxsLmxlbmd0aCxcbiAgICAgIH07XG4gICB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgRGlmZlJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgaXNMb2dGb3JtYXQsIExvZ0Zvcm1hdCwgbG9nRm9ybWF0RnJvbUNvbW1hbmQgfSBmcm9tICcuLi9hcmdzL2xvZy1mb3JtYXQnO1xuaW1wb3J0IHsgZ2V0RGlmZlBhcnNlciB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2UtZGlmZi1zdW1tYXJ5JztcbmltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb25FcnJvclRhc2ssIHR5cGUgRW1wdHlUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRpZmZTdW1tYXJ5VGFzayhjdXN0b21BcmdzOiBzdHJpbmdbXSk6IFN0cmluZ1Rhc2s8RGlmZlJlc3VsdD4gfCBFbXB0eVRhc2sge1xuICAgbGV0IGxvZ0Zvcm1hdCA9IGxvZ0Zvcm1hdEZyb21Db21tYW5kKGN1c3RvbUFyZ3MpO1xuXG4gICBjb25zdCBjb21tYW5kcyA9IFsnZGlmZiddO1xuXG4gICBpZiAobG9nRm9ybWF0ID09PSBMb2dGb3JtYXQuTk9ORSkge1xuICAgICAgbG9nRm9ybWF0ID0gTG9nRm9ybWF0LlNUQVQ7XG4gICAgICBjb21tYW5kcy5wdXNoKCctLXN0YXQ9NDA5NicpO1xuICAgfVxuXG4gICBjb21tYW5kcy5wdXNoKC4uLmN1c3RvbUFyZ3MpO1xuXG4gICByZXR1cm4gKFxuICAgICAgdmFsaWRhdGVMb2dGb3JtYXRDb25maWcoY29tbWFuZHMpIHx8IHtcbiAgICAgICAgIGNvbW1hbmRzLFxuICAgICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgICAgcGFyc2VyOiBnZXREaWZmUGFyc2VyKGxvZ0Zvcm1hdCksXG4gICAgICB9XG4gICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVMb2dGb3JtYXRDb25maWcoY3VzdG9tQXJnczogdW5rbm93bltdKTogRW1wdHlUYXNrIHwgdm9pZCB7XG4gICBjb25zdCBmbGFncyA9IGN1c3RvbUFyZ3MuZmlsdGVyKGlzTG9nRm9ybWF0KTtcblxuICAgaWYgKGZsYWdzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHJldHVybiBjb25maWd1cmF0aW9uRXJyb3JUYXNrKFxuICAgICAgICAgYFN1bW1hcnkgZmxhZ3MgYXJlIG11dHVhbGx5IGV4Y2x1c2l2ZSAtIHBpY2sgb25lIG9mICR7ZmxhZ3Muam9pbignLCcpfWBcbiAgICAgICk7XG4gICB9XG5cbiAgIGlmIChmbGFncy5sZW5ndGggJiYgY3VzdG9tQXJncy5pbmNsdWRlcygnLXonKSkge1xuICAgICAgcmV0dXJuIGNvbmZpZ3VyYXRpb25FcnJvclRhc2soXG4gICAgICAgICBgU3VtbWFyeSBmbGFnICR7ZmxhZ3N9IHBhcnNpbmcgaXMgbm90IGNvbXBhdGlibGUgd2l0aCBudWxsIHRlcm1pbmF0aW9uIG9wdGlvbiAnLXonYFxuICAgICAgKTtcbiAgIH1cbn1cbiIsICJpbXBvcnQgeyBwYXRoc3BlYyB9IGZyb20gJ0BzaW1wbGUtZ2l0L2FyZ3MtcGF0aHNwZWMnO1xuXG5pbXBvcnQgdHlwZSB7IExvZ1Jlc3VsdCwgT3B0aW9ucywgU2ltcGxlR2l0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBsb2dGb3JtYXRGcm9tQ29tbWFuZCB9IGZyb20gJy4uL2FyZ3MvbG9nLWZvcm1hdCc7XG5pbXBvcnQge1xuICAgQ09NTUlUX0JPVU5EQVJZLFxuICAgY3JlYXRlTGlzdExvZ1N1bW1hcnlQYXJzZXIsXG4gICBTUExJVFRFUixcbiAgIFNUQVJUX0JPVU5EQVJZLFxufSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlLWxpc3QtbG9nLXN1bW1hcnknO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRBcGkgfSBmcm9tICcuLi9zaW1wbGUtZ2l0LWFwaSc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQge1xuICAgYXBwZW5kVGFza09wdGlvbnMsXG4gICBhc1N0cmluZ0FycmF5LFxuICAgZmlsdGVyQXJyYXksXG4gICBmaWx0ZXJQbGFpbk9iamVjdCxcbiAgIGZpbHRlclN0cmluZyxcbiAgIGZpbHRlclR5cGUsXG4gICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQsXG4gICB0cmFpbGluZ09wdGlvbnNBcmd1bWVudCxcbn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgdmFsaWRhdGVMb2dGb3JtYXRDb25maWcgfSBmcm9tICcuL2RpZmYnO1xuaW1wb3J0IHsgY29uZmlndXJhdGlvbkVycm9yVGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmVudW0gZXhjbHVkZU9wdGlvbnMge1xuICAgJy0tcHJldHR5JyxcbiAgICdtYXgtY291bnQnLFxuICAgJ21heENvdW50JyxcbiAgICduJyxcbiAgICdmaWxlJyxcbiAgICdmb3JtYXQnLFxuICAgJ2Zyb20nLFxuICAgJ3RvJyxcbiAgICdzcGxpdHRlcicsXG4gICAnc3ltbWV0cmljJyxcbiAgICdtYWlsTWFwJyxcbiAgICdtdWx0aUxpbmUnLFxuICAgJ3N0cmljdERhdGUnLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlZmF1bHRMb2dGaWVsZHMge1xuICAgaGFzaDogc3RyaW5nO1xuICAgZGF0ZTogc3RyaW5nO1xuICAgbWVzc2FnZTogc3RyaW5nO1xuICAgcmVmczogc3RyaW5nO1xuICAgYm9keTogc3RyaW5nO1xuICAgYXV0aG9yX25hbWU6IHN0cmluZztcbiAgIGF1dGhvcl9lbWFpbDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBMb2dPcHRpb25zPFQgPSBEZWZhdWx0TG9nRmllbGRzPiA9IHtcbiAgIGZpbGU/OiBzdHJpbmc7XG4gICBmb3JtYXQ/OiBUO1xuICAgZnJvbT86IHN0cmluZztcbiAgIG1haWxNYXA/OiBib29sZWFuO1xuICAgbWF4Q291bnQ/OiBudW1iZXI7XG4gICBtdWx0aUxpbmU/OiBib29sZWFuO1xuICAgc3BsaXR0ZXI/OiBzdHJpbmc7XG4gICBzdHJpY3REYXRlPzogYm9vbGVhbjtcbiAgIHN5bW1ldHJpYz86IGJvb2xlYW47XG4gICB0bz86IHN0cmluZztcbn07XG5cbmludGVyZmFjZSBQYXJzZWRMb2dPcHRpb25zIHtcbiAgIGZpZWxkczogc3RyaW5nW107XG4gICBzcGxpdHRlcjogc3RyaW5nO1xuICAgY29tbWFuZHM6IHN0cmluZ1tdO1xufVxuXG5mdW5jdGlvbiBwcmV0dHlGb3JtYXQoXG4gICBmb3JtYXQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZyB8IHVua25vd24+LFxuICAgc3BsaXR0ZXI6IHN0cmluZ1xuKTogW3N0cmluZ1tdLCBzdHJpbmddIHtcbiAgIGNvbnN0IGZpZWxkczogc3RyaW5nW10gPSBbXTtcbiAgIGNvbnN0IGZvcm1hdFN0cjogc3RyaW5nW10gPSBbXTtcblxuICAgT2JqZWN0LmtleXMoZm9ybWF0KS5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgZmllbGRzLnB1c2goZmllbGQpO1xuICAgICAgZm9ybWF0U3RyLnB1c2goU3RyaW5nKGZvcm1hdFtmaWVsZF0pKTtcbiAgIH0pO1xuXG4gICByZXR1cm4gW2ZpZWxkcywgZm9ybWF0U3RyLmpvaW4oc3BsaXR0ZXIpXTtcbn1cblxuZnVuY3Rpb24gdXNlck9wdGlvbnM8VCBleHRlbmRzIE9wdGlvbnM+KGlucHV0OiBUKTogT3B0aW9ucyB7XG4gICByZXR1cm4gT2JqZWN0LmtleXMoaW5wdXQpLnJlZHVjZSgob3V0LCBrZXkpID0+IHtcbiAgICAgIGlmICghKGtleSBpbiBleGNsdWRlT3B0aW9ucykpIHtcbiAgICAgICAgIG91dFtrZXldID0gaW5wdXRba2V5XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXQ7XG4gICB9LCB7fSBhcyBPcHRpb25zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTG9nT3B0aW9uczxUIGV4dGVuZHMgT3B0aW9ucz4oXG4gICBvcHQ6IE9wdGlvbnMgfCBMb2dPcHRpb25zPFQ+ID0ge30sXG4gICBjdXN0b21BcmdzOiBzdHJpbmdbXSA9IFtdXG4pOiBQYXJzZWRMb2dPcHRpb25zIHtcbiAgIGNvbnN0IHNwbGl0dGVyID0gZmlsdGVyVHlwZShvcHQuc3BsaXR0ZXIsIGZpbHRlclN0cmluZywgU1BMSVRURVIpO1xuICAgY29uc3QgZm9ybWF0ID0gZmlsdGVyUGxhaW5PYmplY3Qob3B0LmZvcm1hdClcbiAgICAgID8gb3B0LmZvcm1hdFxuICAgICAgOiB7XG4gICAgICAgICAgIGhhc2g6ICclSCcsXG4gICAgICAgICAgIGRhdGU6IG9wdC5zdHJpY3REYXRlID09PSBmYWxzZSA/ICclYWknIDogJyVhSScsXG4gICAgICAgICAgIG1lc3NhZ2U6ICclcycsXG4gICAgICAgICAgIHJlZnM6ICclRCcsXG4gICAgICAgICAgIGJvZHk6IG9wdC5tdWx0aUxpbmUgPyAnJUInIDogJyViJyxcbiAgICAgICAgICAgYXV0aG9yX25hbWU6IG9wdC5tYWlsTWFwICE9PSBmYWxzZSA/ICclYU4nIDogJyVhbicsXG4gICAgICAgICAgIGF1dGhvcl9lbWFpbDogb3B0Lm1haWxNYXAgIT09IGZhbHNlID8gJyVhRScgOiAnJWFlJyxcbiAgICAgICAgfTtcblxuICAgY29uc3QgW2ZpZWxkcywgZm9ybWF0U3RyXSA9IHByZXR0eUZvcm1hdChmb3JtYXQsIHNwbGl0dGVyKTtcblxuICAgY29uc3Qgc3VmZml4OiBzdHJpbmdbXSA9IFtdO1xuICAgY29uc3QgY29tbWFuZDogc3RyaW5nW10gPSBbXG4gICAgICBgLS1wcmV0dHk9Zm9ybWF0OiR7U1RBUlRfQk9VTkRBUll9JHtmb3JtYXRTdHJ9JHtDT01NSVRfQk9VTkRBUll9YCxcbiAgICAgIC4uLmN1c3RvbUFyZ3MsXG4gICBdO1xuXG4gICBjb25zdCBtYXhDb3VudDogbnVtYmVyIHwgdW5kZWZpbmVkID0gKG9wdCBhcyBhbnkpLm4gfHwgKG9wdCBhcyBhbnkpWydtYXgtY291bnQnXSB8fCBvcHQubWF4Q291bnQ7XG4gICBpZiAobWF4Q291bnQpIHtcbiAgICAgIGNvbW1hbmQucHVzaChgLS1tYXgtY291bnQ9JHttYXhDb3VudH1gKTtcbiAgIH1cblxuICAgaWYgKG9wdC5mcm9tIHx8IG9wdC50bykge1xuICAgICAgY29uc3QgcmFuZ2VPcGVyYXRvciA9IG9wdC5zeW1tZXRyaWMgIT09IGZhbHNlID8gJy4uLicgOiAnLi4nO1xuICAgICAgc3VmZml4LnB1c2goYCR7b3B0LmZyb20gfHwgJyd9JHtyYW5nZU9wZXJhdG9yfSR7b3B0LnRvIHx8ICcnfWApO1xuICAgfVxuXG4gICBpZiAoZmlsdGVyU3RyaW5nKG9wdC5maWxlKSkge1xuICAgICAgY29tbWFuZC5wdXNoKCctLWZvbGxvdycsIHBhdGhzcGVjKG9wdC5maWxlKSk7XG4gICB9XG5cbiAgIGFwcGVuZFRhc2tPcHRpb25zKHVzZXJPcHRpb25zKG9wdCBhcyBPcHRpb25zKSwgY29tbWFuZCk7XG5cbiAgIHJldHVybiB7XG4gICAgICBmaWVsZHMsXG4gICAgICBzcGxpdHRlcixcbiAgICAgIGNvbW1hbmRzOiBbLi4uY29tbWFuZCwgLi4uc3VmZml4XSxcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2dUYXNrPFQ+KFxuICAgc3BsaXR0ZXI6IHN0cmluZyxcbiAgIGZpZWxkczogc3RyaW5nW10sXG4gICBjdXN0b21BcmdzOiBzdHJpbmdbXVxuKTogU3RyaW5nVGFzazxMb2dSZXN1bHQ8VD4+IHtcbiAgIGNvbnN0IHBhcnNlciA9IGNyZWF0ZUxpc3RMb2dTdW1tYXJ5UGFyc2VyKHNwbGl0dGVyLCBmaWVsZHMsIGxvZ0Zvcm1hdEZyb21Db21tYW5kKGN1c3RvbUFyZ3MpKTtcblxuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzOiBbJ2xvZycsIC4uLmN1c3RvbUFyZ3NdLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgcGFyc2VyLFxuICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCk6IFBpY2s8U2ltcGxlR2l0LCAnbG9nJz4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGxvZzxUIGV4dGVuZHMgT3B0aW9ucz4odGhpczogU2ltcGxlR2l0QXBpLCAuLi5yZXN0OiB1bmtub3duW10pIHtcbiAgICAgICAgIGNvbnN0IG5leHQgPSB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKTtcbiAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBwYXJzZUxvZ09wdGlvbnM8VD4oXG4gICAgICAgICAgICB0cmFpbGluZ09wdGlvbnNBcmd1bWVudChhcmd1bWVudHMpLFxuICAgICAgICAgICAgYXNTdHJpbmdBcnJheShmaWx0ZXJUeXBlKGFyZ3VtZW50c1swXSwgZmlsdGVyQXJyYXksIFtdKSlcbiAgICAgICAgICk7XG4gICAgICAgICBjb25zdCB0YXNrID1cbiAgICAgICAgICAgIHJlamVjdERlcHJlY2F0ZWRTaWduYXR1cmVzKC4uLnJlc3QpIHx8XG4gICAgICAgICAgICB2YWxpZGF0ZUxvZ0Zvcm1hdENvbmZpZyhvcHRpb25zLmNvbW1hbmRzKSB8fFxuICAgICAgICAgICAgY3JlYXRlTG9nVGFzayhvcHRpb25zKTtcblxuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2sodGFzaywgbmV4dCk7XG4gICAgICB9LFxuICAgfTtcblxuICAgZnVuY3Rpb24gY3JlYXRlTG9nVGFzayhvcHRpb25zOiBQYXJzZWRMb2dPcHRpb25zKSB7XG4gICAgICByZXR1cm4gbG9nVGFzayhvcHRpb25zLnNwbGl0dGVyLCBvcHRpb25zLmZpZWxkcywgb3B0aW9ucy5jb21tYW5kcyk7XG4gICB9XG5cbiAgIGZ1bmN0aW9uIHJlamVjdERlcHJlY2F0ZWRTaWduYXR1cmVzKGZyb20/OiB1bmtub3duLCB0bz86IHVua25vd24pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgICBmaWx0ZXJTdHJpbmcoZnJvbSkgJiZcbiAgICAgICAgIGZpbHRlclN0cmluZyh0bykgJiZcbiAgICAgICAgIGNvbmZpZ3VyYXRpb25FcnJvclRhc2soXG4gICAgICAgICAgICBgZ2l0LmxvZyhzdHJpbmcsIHN0cmluZykgc2hvdWxkIGJlIHJlcGxhY2VkIHdpdGggZ2l0LmxvZyh7IGZyb206IHN0cmluZywgdG86IHN0cmluZyB9KWBcbiAgICAgICAgIClcbiAgICAgICk7XG4gICB9XG59XG4iLCAiaW1wb3J0IHR5cGUge1xuICAgTWVyZ2VDb25mbGljdCxcbiAgIE1lcmdlQ29uZmxpY3REZWxldGlvbixcbiAgIE1lcmdlRGV0YWlsLFxuICAgTWVyZ2VSZXN1bHRTdGF0dXMsXG59IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuXG5leHBvcnQgY2xhc3MgTWVyZ2VTdW1tYXJ5Q29uZmxpY3QgaW1wbGVtZW50cyBNZXJnZUNvbmZsaWN0IHtcbiAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHJlYWRvbmx5IHJlYXNvbjogc3RyaW5nLFxuICAgICAgcHVibGljIHJlYWRvbmx5IGZpbGU6IHN0cmluZyB8IG51bGwgPSBudWxsLFxuICAgICAgcHVibGljIHJlYWRvbmx5IG1ldGE/OiBNZXJnZUNvbmZsaWN0RGVsZXRpb25cbiAgICkge31cblxuICAgdG9TdHJpbmcoKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5maWxlfToke3RoaXMucmVhc29ufWA7XG4gICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNZXJnZVN1bW1hcnlEZXRhaWwgaW1wbGVtZW50cyBNZXJnZURldGFpbCB7XG4gICBwdWJsaWMgY29uZmxpY3RzOiBNZXJnZUNvbmZsaWN0W10gPSBbXTtcbiAgIHB1YmxpYyBtZXJnZXM6IHN0cmluZ1tdID0gW107XG4gICBwdWJsaWMgcmVzdWx0OiBNZXJnZVJlc3VsdFN0YXR1cyA9ICdzdWNjZXNzJztcblxuICAgZ2V0IGZhaWxlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZsaWN0cy5sZW5ndGggPiAwO1xuICAgfVxuXG4gICBnZXQgcmVhc29uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVzdWx0O1xuICAgfVxuXG4gICB0b1N0cmluZygpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZsaWN0cy5sZW5ndGgpIHtcbiAgICAgICAgIHJldHVybiBgQ09ORkxJQ1RTOiAke3RoaXMuY29uZmxpY3RzLmpvaW4oJywgJyl9YDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICdPSyc7XG4gICB9XG59XG4iLCAiaW1wb3J0IHR5cGUge1xuICAgUHVsbERldGFpbEZpbGVDaGFuZ2VzLFxuICAgUHVsbERldGFpbFN1bW1hcnksXG4gICBQdWxsRmFpbGVkUmVzdWx0LFxuICAgUHVsbFJlc3VsdCxcbn0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5cbmV4cG9ydCBjbGFzcyBQdWxsU3VtbWFyeSBpbXBsZW1lbnRzIFB1bGxSZXN1bHQge1xuICAgcHVibGljIHJlbW90ZU1lc3NhZ2VzID0ge1xuICAgICAgYWxsOiBbXSxcbiAgIH07XG4gICBwdWJsaWMgY3JlYXRlZCA9IFtdO1xuICAgcHVibGljIGRlbGV0ZWQ6IHN0cmluZ1tdID0gW107XG4gICBwdWJsaWMgZmlsZXM6IHN0cmluZ1tdID0gW107XG4gICBwdWJsaWMgZGVsZXRpb25zOiBQdWxsRGV0YWlsRmlsZUNoYW5nZXMgPSB7fTtcbiAgIHB1YmxpYyBpbnNlcnRpb25zOiBQdWxsRGV0YWlsRmlsZUNoYW5nZXMgPSB7fTtcbiAgIHB1YmxpYyBzdW1tYXJ5OiBQdWxsRGV0YWlsU3VtbWFyeSA9IHtcbiAgICAgIGNoYW5nZXM6IDAsXG4gICAgICBkZWxldGlvbnM6IDAsXG4gICAgICBpbnNlcnRpb25zOiAwLFxuICAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIFB1bGxGYWlsZWRTdW1tYXJ5IGltcGxlbWVudHMgUHVsbEZhaWxlZFJlc3VsdCB7XG4gICByZW1vdGUgPSAnJztcbiAgIGhhc2ggPSB7XG4gICAgICBsb2NhbDogJycsXG4gICAgICByZW1vdGU6ICcnLFxuICAgfTtcbiAgIGJyYW5jaCA9IHtcbiAgICAgIGxvY2FsOiAnJyxcbiAgICAgIHJlbW90ZTogJycsXG4gICB9O1xuICAgbWVzc2FnZSA9ICcnO1xuXG4gICB0b1N0cmluZygpIHtcbiAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2U7XG4gICB9XG59XG4iLCAiaW1wb3J0IHR5cGUge1xuICAgUmVtb3RlTWVzc2FnZVJlc3VsdCxcbiAgIFJlbW90ZU1lc3NhZ2VzLFxuICAgUmVtb3RlTWVzc2FnZXNPYmplY3RFbnVtZXJhdGlvbixcbn0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBhc051bWJlciwgUmVtb3RlTGluZVBhcnNlciB9IGZyb20gJy4uL3V0aWxzJztcblxuZnVuY3Rpb24gb2JqZWN0RW51bWVyYXRpb25SZXN1bHQ8VCBleHRlbmRzIFJlbW90ZU1lc3NhZ2VzID0gUmVtb3RlTWVzc2FnZXM+KFxuICAgcmVtb3RlTWVzc2FnZXM6IFRcbik6IFJlbW90ZU1lc3NhZ2VzT2JqZWN0RW51bWVyYXRpb24ge1xuICAgcmV0dXJuIChyZW1vdGVNZXNzYWdlcy5vYmplY3RzID0gcmVtb3RlTWVzc2FnZXMub2JqZWN0cyB8fCB7XG4gICAgICBjb21wcmVzc2luZzogMCxcbiAgICAgIGNvdW50aW5nOiAwLFxuICAgICAgZW51bWVyYXRpbmc6IDAsXG4gICAgICBwYWNrUmV1c2VkOiAwLFxuICAgICAgcmV1c2VkOiB7IGNvdW50OiAwLCBkZWx0YTogMCB9LFxuICAgICAgdG90YWw6IHsgY291bnQ6IDAsIGRlbHRhOiAwIH0sXG4gICB9KTtcbn1cblxuZnVuY3Rpb24gYXNPYmplY3RDb3VudChzb3VyY2U6IHN0cmluZykge1xuICAgY29uc3QgY291bnQgPSAvXlxccyooXFxkKykvLmV4ZWMoc291cmNlKTtcbiAgIGNvbnN0IGRlbHRhID0gL2RlbHRhIChcXGQrKS9pLmV4ZWMoc291cmNlKTtcblxuICAgcmV0dXJuIHtcbiAgICAgIGNvdW50OiBhc051bWJlcigoY291bnQgJiYgY291bnRbMV0pIHx8ICcwJyksXG4gICAgICBkZWx0YTogYXNOdW1iZXIoKGRlbHRhICYmIGRlbHRhWzFdKSB8fCAnMCcpLFxuICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHJlbW90ZU1lc3NhZ2VzT2JqZWN0UGFyc2VyczogUmVtb3RlTGluZVBhcnNlcjxSZW1vdGVNZXNzYWdlUmVzdWx0PFJlbW90ZU1lc3NhZ2VzPj5bXSA9XG4gICBbXG4gICAgICBuZXcgUmVtb3RlTGluZVBhcnNlcihcbiAgICAgICAgIC9ecmVtb3RlOlxccyooZW51bWVyYXRpbmd8Y291bnRpbmd8Y29tcHJlc3NpbmcpIG9iamVjdHM6IChcXGQrKSwvaSxcbiAgICAgICAgIChyZXN1bHQsIFthY3Rpb24sIGNvdW50XSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gYWN0aW9uLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBjb25zdCBlbnVtZXJhdGlvbiA9IG9iamVjdEVudW1lcmF0aW9uUmVzdWx0KHJlc3VsdC5yZW1vdGVNZXNzYWdlcyk7XG5cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZW51bWVyYXRpb24sIHsgW2tleV06IGFzTnVtYmVyKGNvdW50KSB9KTtcbiAgICAgICAgIH1cbiAgICAgICksXG4gICAgICBuZXcgUmVtb3RlTGluZVBhcnNlcihcbiAgICAgICAgIC9ecmVtb3RlOlxccyooZW51bWVyYXRpbmd8Y291bnRpbmd8Y29tcHJlc3NpbmcpIG9iamVjdHM6IFxcZCslIFxcKFxcZCtcXC8oXFxkKylcXCksL2ksXG4gICAgICAgICAocmVzdWx0LCBbYWN0aW9uLCBjb3VudF0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGFjdGlvbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3QgZW51bWVyYXRpb24gPSBvYmplY3RFbnVtZXJhdGlvblJlc3VsdChyZXN1bHQucmVtb3RlTWVzc2FnZXMpO1xuXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVudW1lcmF0aW9uLCB7IFtrZXldOiBhc051bWJlcihjb3VudCkgfSk7XG4gICAgICAgICB9XG4gICAgICApLFxuICAgICAgbmV3IFJlbW90ZUxpbmVQYXJzZXIoXG4gICAgICAgICAvdG90YWwgKFteLF0rKSwgcmV1c2VkIChbXixdKyksIHBhY2stcmV1c2VkIChcXGQrKS9pLFxuICAgICAgICAgKHJlc3VsdCwgW3RvdGFsLCByZXVzZWQsIHBhY2tSZXVzZWRdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvYmplY3RzID0gb2JqZWN0RW51bWVyYXRpb25SZXN1bHQocmVzdWx0LnJlbW90ZU1lc3NhZ2VzKTtcbiAgICAgICAgICAgIG9iamVjdHMudG90YWwgPSBhc09iamVjdENvdW50KHRvdGFsKTtcbiAgICAgICAgICAgIG9iamVjdHMucmV1c2VkID0gYXNPYmplY3RDb3VudChyZXVzZWQpO1xuICAgICAgICAgICAgb2JqZWN0cy5wYWNrUmV1c2VkID0gYXNOdW1iZXIocGFja1JldXNlZCk7XG4gICAgICAgICB9XG4gICAgICApLFxuICAgXTtcbiIsICJpbXBvcnQgdHlwZSB7IFB1c2hSZXN1bHRSZW1vdGVNZXNzYWdlcywgUmVtb3RlTWVzc2FnZVJlc3VsdCwgUmVtb3RlTWVzc2FnZXMgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IGFzTnVtYmVyLCBwYXJzZVN0cmluZ1Jlc3BvbnNlLCBSZW1vdGVMaW5lUGFyc2VyIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgcmVtb3RlTWVzc2FnZXNPYmplY3RQYXJzZXJzIH0gZnJvbSAnLi9wYXJzZS1yZW1vdGUtb2JqZWN0cyc7XG5cbmNvbnN0IHBhcnNlcnM6IFJlbW90ZUxpbmVQYXJzZXI8UmVtb3RlTWVzc2FnZVJlc3VsdDxQdXNoUmVzdWx0UmVtb3RlTWVzc2FnZXMgfCBSZW1vdGVNZXNzYWdlcz4+W10gPVxuICAgW1xuICAgICAgbmV3IFJlbW90ZUxpbmVQYXJzZXIoL15yZW1vdGU6XFxzKiguKykkLywgKHJlc3VsdCwgW3RleHRdKSA9PiB7XG4gICAgICAgICByZXN1bHQucmVtb3RlTWVzc2FnZXMuYWxsLnB1c2godGV4dC50cmltKCkpO1xuICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSksXG4gICAgICAuLi5yZW1vdGVNZXNzYWdlc09iamVjdFBhcnNlcnMsXG4gICAgICBuZXcgUmVtb3RlTGluZVBhcnNlcihcbiAgICAgICAgIFsvY3JlYXRlIGEgKD86cHVsbHxtZXJnZSkgcmVxdWVzdC9pLCAvXFxzKGh0dHBzPzpcXC9cXC9cXFMrKSQvXSxcbiAgICAgICAgIChyZXN1bHQsIFtwdWxsUmVxdWVzdFVybF0pID0+IHtcbiAgICAgICAgICAgIChyZXN1bHQucmVtb3RlTWVzc2FnZXMgYXMgUHVzaFJlc3VsdFJlbW90ZU1lc3NhZ2VzKS5wdWxsUmVxdWVzdFVybCA9IHB1bGxSZXF1ZXN0VXJsO1xuICAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIG5ldyBSZW1vdGVMaW5lUGFyc2VyKFxuICAgICAgICAgWy9mb3VuZCAoXFxkKykgdnVsbmVyYWJpbGl0aWVzLitcXCgoW14pXSspXFwpL2ksIC9cXHMoaHR0cHM/OlxcL1xcL1xcUyspJC9dLFxuICAgICAgICAgKHJlc3VsdCwgW2NvdW50LCBzdW1tYXJ5LCB1cmxdKSA9PiB7XG4gICAgICAgICAgICAocmVzdWx0LnJlbW90ZU1lc3NhZ2VzIGFzIFB1c2hSZXN1bHRSZW1vdGVNZXNzYWdlcykudnVsbmVyYWJpbGl0aWVzID0ge1xuICAgICAgICAgICAgICAgY291bnQ6IGFzTnVtYmVyKGNvdW50KSxcbiAgICAgICAgICAgICAgIHN1bW1hcnksXG4gICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgfVxuICAgICAgKSxcbiAgIF07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVJlbW90ZU1lc3NhZ2VzPFQgZXh0ZW5kcyBSZW1vdGVNZXNzYWdlcyA9IFJlbW90ZU1lc3NhZ2VzPihcbiAgIF9zdGRPdXQ6IHN0cmluZyxcbiAgIHN0ZEVycjogc3RyaW5nXG4pOiBSZW1vdGVNZXNzYWdlUmVzdWx0IHtcbiAgIHJldHVybiBwYXJzZVN0cmluZ1Jlc3BvbnNlKHsgcmVtb3RlTWVzc2FnZXM6IG5ldyBSZW1vdGVNZXNzYWdlU3VtbWFyeSgpIGFzIFQgfSwgcGFyc2Vycywgc3RkRXJyKTtcbn1cblxuZXhwb3J0IGNsYXNzIFJlbW90ZU1lc3NhZ2VTdW1tYXJ5IGltcGxlbWVudHMgUmVtb3RlTWVzc2FnZXMge1xuICAgcHVibGljIHJlYWRvbmx5IGFsbDogc3RyaW5nW10gPSBbXTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFB1bGxEZXRhaWwsIFB1bGxGYWlsZWRSZXN1bHQsIFB1bGxSZXN1bHQsIFJlbW90ZU1lc3NhZ2VzIH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBQdWxsRmFpbGVkU3VtbWFyeSwgUHVsbFN1bW1hcnkgfSBmcm9tICcuLi9yZXNwb25zZXMvUHVsbFN1bW1hcnknO1xuaW1wb3J0IHR5cGUgeyBUYXNrUGFyc2VyIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgYXBwZW5kLCBMaW5lUGFyc2VyLCBwYXJzZVN0cmluZ1Jlc3BvbnNlIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgcGFyc2VSZW1vdGVNZXNzYWdlcyB9IGZyb20gJy4vcGFyc2UtcmVtb3RlLW1lc3NhZ2VzJztcblxuY29uc3QgRklMRV9VUERBVEVfUkVHRVggPSAvXlxccyooLis/KVxccytcXHxcXHMrXFxkK1xccyooXFwrKikoLSopLztcbmNvbnN0IFNVTU1BUllfUkVHRVggPSAvKFxcZCspXFxEKygoXFxkKylcXEQrXFwoXFwrXFwpKT8oXFxEKyhcXGQrKVxcRCtcXCgtXFwpKT8vO1xuY29uc3QgQUNUSU9OX1JFR0VYID0gL14oY3JlYXRlfGRlbGV0ZSkgbW9kZSBcXGQrICguKykvO1xuXG5jb25zdCBwYXJzZXJzOiBMaW5lUGFyc2VyPFB1bGxSZXN1bHQ+W10gPSBbXG4gICBuZXcgTGluZVBhcnNlcihGSUxFX1VQREFURV9SRUdFWCwgKHJlc3VsdCwgW2ZpbGUsIGluc2VydGlvbnMsIGRlbGV0aW9uc10pID0+IHtcbiAgICAgIHJlc3VsdC5maWxlcy5wdXNoKGZpbGUpO1xuXG4gICAgICBpZiAoaW5zZXJ0aW9ucykge1xuICAgICAgICAgcmVzdWx0Lmluc2VydGlvbnNbZmlsZV0gPSBpbnNlcnRpb25zLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgaWYgKGRlbGV0aW9ucykge1xuICAgICAgICAgcmVzdWx0LmRlbGV0aW9uc1tmaWxlXSA9IGRlbGV0aW9ucy5sZW5ndGg7XG4gICAgICB9XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyKFNVTU1BUllfUkVHRVgsIChyZXN1bHQsIFtjaGFuZ2VzLCAsIGluc2VydGlvbnMsICwgZGVsZXRpb25zXSkgPT4ge1xuICAgICAgaWYgKGluc2VydGlvbnMgIT09IHVuZGVmaW5lZCB8fCBkZWxldGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgcmVzdWx0LnN1bW1hcnkuY2hhbmdlcyA9ICtjaGFuZ2VzIHx8IDA7XG4gICAgICAgICByZXN1bHQuc3VtbWFyeS5pbnNlcnRpb25zID0gK2luc2VydGlvbnMgfHwgMDtcbiAgICAgICAgIHJlc3VsdC5zdW1tYXJ5LmRlbGV0aW9ucyA9ICtkZWxldGlvbnMgfHwgMDtcbiAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgfSksXG4gICBuZXcgTGluZVBhcnNlcihBQ1RJT05fUkVHRVgsIChyZXN1bHQsIFthY3Rpb24sIGZpbGVdKSA9PiB7XG4gICAgICBhcHBlbmQocmVzdWx0LmZpbGVzLCBmaWxlKTtcbiAgICAgIGFwcGVuZChhY3Rpb24gPT09ICdjcmVhdGUnID8gcmVzdWx0LmNyZWF0ZWQgOiByZXN1bHQuZGVsZXRlZCwgZmlsZSk7XG4gICB9KSxcbl07XG5cbmNvbnN0IGVycm9yUGFyc2VyczogTGluZVBhcnNlcjxQdWxsRmFpbGVkUmVzdWx0PltdID0gW1xuICAgbmV3IExpbmVQYXJzZXIoL15mcm9tXFxzKC4rKSQvaSwgKHJlc3VsdCwgW3JlbW90ZV0pID0+IHZvaWQgKHJlc3VsdC5yZW1vdGUgPSByZW1vdGUpKSxcbiAgIG5ldyBMaW5lUGFyc2VyKC9eZmF0YWw6XFxzKC4rKSQvLCAocmVzdWx0LCBbbWVzc2FnZV0pID0+IHZvaWQgKHJlc3VsdC5tZXNzYWdlID0gbWVzc2FnZSkpLFxuICAgbmV3IExpbmVQYXJzZXIoXG4gICAgICAvKFthLXowLTldKylcXC5cXC4oW2EtejAtOV0rKVxccysoXFxTKylcXHMrLT5cXHMrKFxcUyspJC8sXG4gICAgICAocmVzdWx0LCBbaGFzaExvY2FsLCBoYXNoUmVtb3RlLCBicmFuY2hMb2NhbCwgYnJhbmNoUmVtb3RlXSkgPT4ge1xuICAgICAgICAgcmVzdWx0LmJyYW5jaC5sb2NhbCA9IGJyYW5jaExvY2FsO1xuICAgICAgICAgcmVzdWx0Lmhhc2gubG9jYWwgPSBoYXNoTG9jYWw7XG4gICAgICAgICByZXN1bHQuYnJhbmNoLnJlbW90ZSA9IGJyYW5jaFJlbW90ZTtcbiAgICAgICAgIHJlc3VsdC5oYXNoLnJlbW90ZSA9IGhhc2hSZW1vdGU7XG4gICAgICB9XG4gICApLFxuXTtcblxuZXhwb3J0IGNvbnN0IHBhcnNlUHVsbERldGFpbDogVGFza1BhcnNlcjxzdHJpbmcsIFB1bGxEZXRhaWw+ID0gKHN0ZE91dCwgc3RkRXJyKSA9PiB7XG4gICByZXR1cm4gcGFyc2VTdHJpbmdSZXNwb25zZShuZXcgUHVsbFN1bW1hcnkoKSwgcGFyc2VycywgW3N0ZE91dCwgc3RkRXJyXSk7XG59O1xuXG5leHBvcnQgY29uc3QgcGFyc2VQdWxsUmVzdWx0OiBUYXNrUGFyc2VyPHN0cmluZywgUHVsbFJlc3VsdD4gPSAoc3RkT3V0LCBzdGRFcnIpID0+IHtcbiAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAgbmV3IFB1bGxTdW1tYXJ5KCksXG4gICAgICBwYXJzZVB1bGxEZXRhaWwoc3RkT3V0LCBzdGRFcnIpLFxuICAgICAgcGFyc2VSZW1vdGVNZXNzYWdlczxSZW1vdGVNZXNzYWdlcz4oc3RkT3V0LCBzdGRFcnIpXG4gICApO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUHVsbEVycm9yUmVzdWx0KHN0ZE91dDogc3RyaW5nLCBzdGRFcnI6IHN0cmluZykge1xuICAgY29uc3QgcHVsbEVycm9yID0gcGFyc2VTdHJpbmdSZXNwb25zZShuZXcgUHVsbEZhaWxlZFN1bW1hcnkoKSwgZXJyb3JQYXJzZXJzLCBbc3RkT3V0LCBzdGRFcnJdKTtcblxuICAgcmV0dXJuIHB1bGxFcnJvci5tZXNzYWdlICYmIHB1bGxFcnJvcjtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IE1lcmdlRGV0YWlsLCBNZXJnZVJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgTWVyZ2VTdW1tYXJ5Q29uZmxpY3QsIE1lcmdlU3VtbWFyeURldGFpbCB9IGZyb20gJy4uL3Jlc3BvbnNlcy9NZXJnZVN1bW1hcnknO1xuaW1wb3J0IHR5cGUgeyBUYXNrUGFyc2VyIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgTGluZVBhcnNlciwgcGFyc2VTdHJpbmdSZXNwb25zZSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IHBhcnNlUHVsbFJlc3VsdCB9IGZyb20gJy4vcGFyc2UtcHVsbCc7XG5cbmNvbnN0IHBhcnNlcnM6IExpbmVQYXJzZXI8TWVyZ2VEZXRhaWw+W10gPSBbXG4gICBuZXcgTGluZVBhcnNlcigvXkF1dG8tbWVyZ2luZ1xccysoLispJC8sIChzdW1tYXJ5LCBbYXV0b01lcmdlXSkgPT4ge1xuICAgICAgc3VtbWFyeS5tZXJnZXMucHVzaChhdXRvTWVyZ2UpO1xuICAgfSksXG4gICBuZXcgTGluZVBhcnNlcigvXkNPTkZMSUNUXFxzK1xcKCguKylcXCk6IE1lcmdlIGNvbmZsaWN0IGluICguKykkLywgKHN1bW1hcnksIFtyZWFzb24sIGZpbGVdKSA9PiB7XG4gICAgICBzdW1tYXJ5LmNvbmZsaWN0cy5wdXNoKG5ldyBNZXJnZVN1bW1hcnlDb25mbGljdChyZWFzb24sIGZpbGUpKTtcbiAgIH0pLFxuICAgbmV3IExpbmVQYXJzZXIoXG4gICAgICAvXkNPTkZMSUNUXFxzK1xcKCguK1xcL2RlbGV0ZSlcXCk6ICguKykgZGVsZXRlZCBpbiAoLispIGFuZC8sXG4gICAgICAoc3VtbWFyeSwgW3JlYXNvbiwgZmlsZSwgZGVsZXRlUmVmXSkgPT4ge1xuICAgICAgICAgc3VtbWFyeS5jb25mbGljdHMucHVzaChuZXcgTWVyZ2VTdW1tYXJ5Q29uZmxpY3QocmVhc29uLCBmaWxlLCB7IGRlbGV0ZVJlZiB9KSk7XG4gICAgICB9XG4gICApLFxuICAgbmV3IExpbmVQYXJzZXIoL15DT05GTElDVFxccytcXCgoLispXFwpOi8sIChzdW1tYXJ5LCBbcmVhc29uXSkgPT4ge1xuICAgICAgc3VtbWFyeS5jb25mbGljdHMucHVzaChuZXcgTWVyZ2VTdW1tYXJ5Q29uZmxpY3QocmVhc29uLCBudWxsKSk7XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyKC9eQXV0b21hdGljIG1lcmdlIGZhaWxlZDtcXHMrKC4rKSQvLCAoc3VtbWFyeSwgW3Jlc3VsdF0pID0+IHtcbiAgICAgIHN1bW1hcnkucmVzdWx0ID0gcmVzdWx0O1xuICAgfSksXG5dO1xuXG4vKipcbiAqIFBhcnNlIHRoZSBjb21wbGV0ZSByZXNwb25zZSBmcm9tIGBnaXQubWVyZ2VgXG4gKi9cbmV4cG9ydCBjb25zdCBwYXJzZU1lcmdlUmVzdWx0OiBUYXNrUGFyc2VyPHN0cmluZywgTWVyZ2VSZXN1bHQ+ID0gKHN0ZE91dCwgc3RkRXJyKSA9PiB7XG4gICByZXR1cm4gT2JqZWN0LmFzc2lnbihwYXJzZU1lcmdlRGV0YWlsKHN0ZE91dCwgc3RkRXJyKSwgcGFyc2VQdWxsUmVzdWx0KHN0ZE91dCwgc3RkRXJyKSk7XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBtZXJnZSBzcGVjaWZpYyBkZXRhaWwgKGllOiBub3QgdGhlIGNvbnRlbnQgYWxzbyBhdmFpbGFibGUgaW4gdGhlIHB1bGwgZGV0YWlsKSBmcm9tIGBnaXQubW5lcmdlYFxuICogQHBhcmFtIHN0ZE91dFxuICovXG5leHBvcnQgY29uc3QgcGFyc2VNZXJnZURldGFpbDogVGFza1BhcnNlcjxzdHJpbmcsIE1lcmdlRGV0YWlsPiA9IChzdGRPdXQpID0+IHtcbiAgIHJldHVybiBwYXJzZVN0cmluZ1Jlc3BvbnNlKG5ldyBNZXJnZVN1bW1hcnlEZXRhaWwoKSwgcGFyc2Vycywgc3RkT3V0KTtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBNZXJnZVJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgR2l0UmVzcG9uc2VFcnJvciB9IGZyb20gJy4uL2Vycm9ycy9naXQtcmVzcG9uc2UtZXJyb3InO1xuaW1wb3J0IHsgcGFyc2VNZXJnZVJlc3VsdCB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2UtbWVyZ2UnO1xuaW1wb3J0IHR5cGUgeyBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgY29uZmlndXJhdGlvbkVycm9yVGFzaywgdHlwZSBFbXB0eVRhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VUYXNrKGN1c3RvbUFyZ3M6IHN0cmluZ1tdKTogRW1wdHlUYXNrIHwgU3RyaW5nVGFzazxNZXJnZVJlc3VsdD4ge1xuICAgaWYgKCFjdXN0b21BcmdzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGNvbmZpZ3VyYXRpb25FcnJvclRhc2soJ0dpdC5tZXJnZSByZXF1aXJlcyBhdCBsZWFzdCBvbmUgb3B0aW9uJyk7XG4gICB9XG5cbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kczogWydtZXJnZScsIC4uLmN1c3RvbUFyZ3NdLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgcGFyc2VyKHN0ZE91dCwgc3RkRXJyKTogTWVyZ2VSZXN1bHQge1xuICAgICAgICAgY29uc3QgbWVyZ2UgPSBwYXJzZU1lcmdlUmVzdWx0KHN0ZE91dCwgc3RkRXJyKTtcbiAgICAgICAgIGlmIChtZXJnZS5mYWlsZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHaXRSZXNwb25zZUVycm9yKG1lcmdlKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgcmV0dXJuIG1lcmdlO1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHR5cGUge1xuICAgUHVzaERldGFpbCxcbiAgIFB1c2hSZXN1bHQsXG4gICBQdXNoUmVzdWx0UHVzaGVkSXRlbSxcbiAgIFB1c2hSZXN1bHRSZW1vdGVNZXNzYWdlcyxcbn0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgdHlwZSB7IFRhc2tQYXJzZXIgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBMaW5lUGFyc2VyLCBwYXJzZVN0cmluZ1Jlc3BvbnNlIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgcGFyc2VSZW1vdGVNZXNzYWdlcyB9IGZyb20gJy4vcGFyc2UtcmVtb3RlLW1lc3NhZ2VzJztcblxuZnVuY3Rpb24gcHVzaFJlc3VsdFB1c2hlZEl0ZW0obG9jYWw6IHN0cmluZywgcmVtb3RlOiBzdHJpbmcsIHN0YXR1czogc3RyaW5nKTogUHVzaFJlc3VsdFB1c2hlZEl0ZW0ge1xuICAgY29uc3QgZGVsZXRlZCA9IHN0YXR1cy5pbmNsdWRlcygnZGVsZXRlZCcpO1xuICAgY29uc3QgdGFnID0gc3RhdHVzLmluY2x1ZGVzKCd0YWcnKSB8fCAvXnJlZnNcXC90YWdzLy50ZXN0KGxvY2FsKTtcbiAgIGNvbnN0IGFscmVhZHlVcGRhdGVkID0gIXN0YXR1cy5pbmNsdWRlcygnbmV3Jyk7XG5cbiAgIHJldHVybiB7XG4gICAgICBkZWxldGVkLFxuICAgICAgdGFnLFxuICAgICAgYnJhbmNoOiAhdGFnLFxuICAgICAgbmV3OiAhYWxyZWFkeVVwZGF0ZWQsXG4gICAgICBhbHJlYWR5VXBkYXRlZCxcbiAgICAgIGxvY2FsLFxuICAgICAgcmVtb3RlLFxuICAgfTtcbn1cblxuY29uc3QgcGFyc2VyczogTGluZVBhcnNlcjxQdXNoRGV0YWlsPltdID0gW1xuICAgbmV3IExpbmVQYXJzZXIoL15QdXNoaW5nIHRvICguKykkLywgKHJlc3VsdCwgW3JlcG9dKSA9PiB7XG4gICAgICByZXN1bHQucmVwbyA9IHJlcG87XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyKC9edXBkYXRpbmcgbG9jYWwgdHJhY2tpbmcgcmVmICcoLispJy8sIChyZXN1bHQsIFtsb2NhbF0pID0+IHtcbiAgICAgIHJlc3VsdC5yZWYgPSB7XG4gICAgICAgICAuLi4ocmVzdWx0LnJlZiB8fCB7fSksXG4gICAgICAgICBsb2NhbCxcbiAgICAgIH07XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyKC9eWz0qLV1cXHMrKFteOl0rKTooXFxTKylcXHMrXFxbKC4rKV0kLywgKHJlc3VsdCwgW2xvY2FsLCByZW1vdGUsIHR5cGVdKSA9PiB7XG4gICAgICByZXN1bHQucHVzaGVkLnB1c2gocHVzaFJlc3VsdFB1c2hlZEl0ZW0obG9jYWwsIHJlbW90ZSwgdHlwZSkpO1xuICAgfSksXG4gICBuZXcgTGluZVBhcnNlcihcbiAgICAgIC9eQnJhbmNoICcoW14nXSspJyBzZXQgdXAgdG8gdHJhY2sgcmVtb3RlIGJyYW5jaCAnKFteJ10rKScgZnJvbSAnKFteJ10rKScvLFxuICAgICAgKHJlc3VsdCwgW2xvY2FsLCByZW1vdGUsIHJlbW90ZU5hbWVdKSA9PiB7XG4gICAgICAgICByZXN1bHQuYnJhbmNoID0ge1xuICAgICAgICAgICAgLi4uKHJlc3VsdC5icmFuY2ggfHwge30pLFxuICAgICAgICAgICAgbG9jYWwsXG4gICAgICAgICAgICByZW1vdGUsXG4gICAgICAgICAgICByZW1vdGVOYW1lLFxuICAgICAgICAgfTtcbiAgICAgIH1cbiAgICksXG4gICBuZXcgTGluZVBhcnNlcihcbiAgICAgIC9eKFteOl0rKTooXFxTKylcXHMrKFthLXowLTldKylcXC5cXC4oW2EtejAtOV0rKSQvLFxuICAgICAgKHJlc3VsdCwgW2xvY2FsLCByZW1vdGUsIGZyb20sIHRvXSkgPT4ge1xuICAgICAgICAgcmVzdWx0LnVwZGF0ZSA9IHtcbiAgICAgICAgICAgIGhlYWQ6IHtcbiAgICAgICAgICAgICAgIGxvY2FsLFxuICAgICAgICAgICAgICAgcmVtb3RlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhhc2g6IHtcbiAgICAgICAgICAgICAgIGZyb20sXG4gICAgICAgICAgICAgICB0byxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICB9O1xuICAgICAgfVxuICAgKSxcbl07XG5cbmV4cG9ydCBjb25zdCBwYXJzZVB1c2hSZXN1bHQ6IFRhc2tQYXJzZXI8c3RyaW5nLCBQdXNoUmVzdWx0PiA9IChzdGRPdXQsIHN0ZEVycikgPT4ge1xuICAgY29uc3QgcHVzaERldGFpbCA9IHBhcnNlUHVzaERldGFpbChzdGRPdXQsIHN0ZEVycik7XG4gICBjb25zdCByZXNwb25zZURldGFpbCA9IHBhcnNlUmVtb3RlTWVzc2FnZXM8UHVzaFJlc3VsdFJlbW90ZU1lc3NhZ2VzPihzdGRPdXQsIHN0ZEVycik7XG5cbiAgIHJldHVybiB7XG4gICAgICAuLi5wdXNoRGV0YWlsLFxuICAgICAgLi4ucmVzcG9uc2VEZXRhaWwsXG4gICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHBhcnNlUHVzaERldGFpbDogVGFza1BhcnNlcjxzdHJpbmcsIFB1c2hEZXRhaWw+ID0gKHN0ZE91dCwgc3RkRXJyKSA9PiB7XG4gICByZXR1cm4gcGFyc2VTdHJpbmdSZXNwb25zZSh7IHB1c2hlZDogW10gfSwgcGFyc2VycywgW3N0ZE91dCwgc3RkRXJyXSk7XG59O1xuIiwgImltcG9ydCB0eXBlIHsgUHVzaFJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgcGFyc2VQdXNoUmVzdWx0IGFzIHBhcnNlciB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2UtcHVzaCc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBhcHBlbmQsIHJlbW92ZSB9IGZyb20gJy4uL3V0aWxzJztcblxudHlwZSBQdXNoUmVmID0geyByZW1vdGU/OiBzdHJpbmc7IGJyYW5jaD86IHN0cmluZyB9O1xuXG5leHBvcnQgZnVuY3Rpb24gcHVzaFRhZ3NUYXNrKHJlZjogUHVzaFJlZiA9IHt9LCBjdXN0b21BcmdzOiBzdHJpbmdbXSk6IFN0cmluZ1Rhc2s8UHVzaFJlc3VsdD4ge1xuICAgYXBwZW5kKGN1c3RvbUFyZ3MsICctLXRhZ3MnKTtcbiAgIHJldHVybiBwdXNoVGFzayhyZWYsIGN1c3RvbUFyZ3MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHVzaFRhc2socmVmOiBQdXNoUmVmID0ge30sIGN1c3RvbUFyZ3M6IHN0cmluZ1tdKTogU3RyaW5nVGFzazxQdXNoUmVzdWx0PiB7XG4gICBjb25zdCBjb21tYW5kcyA9IFsncHVzaCcsIC4uLmN1c3RvbUFyZ3NdO1xuICAgaWYgKHJlZi5icmFuY2gpIHtcbiAgICAgIGNvbW1hbmRzLnNwbGljZSgxLCAwLCByZWYuYnJhbmNoKTtcbiAgIH1cbiAgIGlmIChyZWYucmVtb3RlKSB7XG4gICAgICBjb21tYW5kcy5zcGxpY2UoMSwgMCwgcmVmLnJlbW90ZSk7XG4gICB9XG5cbiAgIHJlbW92ZShjb21tYW5kcywgJy12Jyk7XG4gICBhcHBlbmQoY29tbWFuZHMsICctLXZlcmJvc2UnKTtcbiAgIGFwcGVuZChjb21tYW5kcywgJy0tcG9yY2VsYWluJyk7XG5cbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kcyxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIHBhcnNlcixcbiAgIH07XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0QXBpIH0gZnJvbSAnLi4vc2ltcGxlLWdpdC1hcGknO1xuaW1wb3J0IHsgZ2V0VHJhaWxpbmdPcHRpb25zLCB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBzdHJhaWdodFRocm91Z2hCdWZmZXJUYXNrLCBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCk6IFBpY2s8U2ltcGxlR2l0LCAnc2hvd0J1ZmZlcicgfCAnc2hvdyc+IHtcbiAgIHJldHVybiB7XG4gICAgICBzaG93QnVmZmVyKHRoaXM6IFNpbXBsZUdpdEFwaSkge1xuICAgICAgICAgY29uc3QgY29tbWFuZHMgPSBbJ3Nob3cnLCAuLi5nZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzLCAxKV07XG4gICAgICAgICBpZiAoIWNvbW1hbmRzLmluY2x1ZGVzKCctLWJpbmFyeScpKSB7XG4gICAgICAgICAgICBjb21tYW5kcy5zcGxpY2UoMSwgMCwgJy0tYmluYXJ5Jyk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgc3RyYWlnaHRUaHJvdWdoQnVmZmVyVGFzayhjb21tYW5kcyksXG4gICAgICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgICAgKTtcbiAgICAgIH0sXG5cbiAgICAgIHNob3codGhpczogU2ltcGxlR2l0QXBpKSB7XG4gICAgICAgICBjb25zdCBjb21tYW5kcyA9IFsnc2hvdycsIC4uLmdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMsIDEpXTtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhjb21tYW5kcyksXG4gICAgICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgICAgKTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgRmlsZVN0YXR1c1Jlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuXG5leHBvcnQgY29uc3QgZnJvbVBhdGhSZWdleCA9IC9eKC4rKVxcMCguKykkLztcblxuZXhwb3J0IGNsYXNzIEZpbGVTdGF0dXNTdW1tYXJ5IGltcGxlbWVudHMgRmlsZVN0YXR1c1Jlc3VsdCB7XG4gICBwdWJsaWMgcmVhZG9ubHkgZnJvbTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBwYXRoOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgaW5kZXg6IHN0cmluZyxcbiAgICAgIHB1YmxpYyB3b3JraW5nX2Rpcjogc3RyaW5nXG4gICApIHtcbiAgICAgIGlmIChpbmRleCA9PT0gJ1InIHx8IHdvcmtpbmdfZGlyID09PSAnUicpIHtcbiAgICAgICAgIGNvbnN0IGRldGFpbCA9IGZyb21QYXRoUmVnZXguZXhlYyhwYXRoKSB8fCBbbnVsbCwgcGF0aCwgcGF0aF07XG4gICAgICAgICB0aGlzLmZyb20gPSBkZXRhaWxbMl0gfHwgJyc7XG4gICAgICAgICB0aGlzLnBhdGggPSBkZXRhaWxbMV0gfHwgJyc7XG4gICAgICB9XG4gICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBTdGF0dXNSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IGZpbHRlclN0cmluZywgZmlsdGVyVHlwZSwgTlVMTCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IEZpbGVTdGF0dXNTdW1tYXJ5IH0gZnJvbSAnLi9GaWxlU3RhdHVzU3VtbWFyeSc7XG5cbnR5cGUgU3RhdHVzTGluZVBhcnNlciA9IChyZXN1bHQ6IFN0YXR1c1Jlc3VsdCwgZmlsZTogc3RyaW5nKSA9PiB2b2lkO1xuXG5leHBvcnQgY2xhc3MgU3RhdHVzU3VtbWFyeSBpbXBsZW1lbnRzIFN0YXR1c1Jlc3VsdCB7XG4gICBwdWJsaWMgbm90X2FkZGVkID0gW107XG4gICBwdWJsaWMgY29uZmxpY3RlZCA9IFtdO1xuICAgcHVibGljIGNyZWF0ZWQgPSBbXTtcbiAgIHB1YmxpYyBkZWxldGVkID0gW107XG4gICBwdWJsaWMgaWdub3JlZCA9IHVuZGVmaW5lZDtcbiAgIHB1YmxpYyBtb2RpZmllZCA9IFtdO1xuICAgcHVibGljIHJlbmFtZWQgPSBbXTtcbiAgIHB1YmxpYyBmaWxlcyA9IFtdO1xuICAgcHVibGljIHN0YWdlZCA9IFtdO1xuICAgcHVibGljIGFoZWFkID0gMDtcbiAgIHB1YmxpYyBiZWhpbmQgPSAwO1xuICAgcHVibGljIGN1cnJlbnQgPSBudWxsO1xuICAgcHVibGljIHRyYWNraW5nID0gbnVsbDtcbiAgIHB1YmxpYyBkZXRhY2hlZCA9IGZhbHNlO1xuXG4gICBwdWJsaWMgaXNDbGVhbiA9ICgpID0+IHtcbiAgICAgIHJldHVybiAhdGhpcy5maWxlcy5sZW5ndGg7XG4gICB9O1xufVxuXG5lbnVtIFBvcmNlbGFpbkZpbGVTdGF0dXMge1xuICAgQURERUQgPSAnQScsXG4gICBERUxFVEVEID0gJ0QnLFxuICAgTU9ESUZJRUQgPSAnTScsXG4gICBSRU5BTUVEID0gJ1InLFxuICAgQ09QSUVEID0gJ0MnLFxuICAgVU5NRVJHRUQgPSAnVScsXG4gICBVTlRSQUNLRUQgPSAnPycsXG4gICBJR05PUkVEID0gJyEnLFxuICAgTk9ORSA9ICcgJyxcbn1cblxuZnVuY3Rpb24gcmVuYW1lZEZpbGUobGluZTogc3RyaW5nKSB7XG4gICBjb25zdCBbdG8sIGZyb21dID0gbGluZS5zcGxpdChOVUxMKTtcblxuICAgcmV0dXJuIHtcbiAgICAgIGZyb206IGZyb20gfHwgdG8sXG4gICAgICB0byxcbiAgIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlcihcbiAgIGluZGV4WDogUG9yY2VsYWluRmlsZVN0YXR1cyxcbiAgIGluZGV4WTogUG9yY2VsYWluRmlsZVN0YXR1cyxcbiAgIGhhbmRsZXI6IFN0YXR1c0xpbmVQYXJzZXJcbik6IFtzdHJpbmcsIFN0YXR1c0xpbmVQYXJzZXJdIHtcbiAgIHJldHVybiBbYCR7aW5kZXhYfSR7aW5kZXhZfWAsIGhhbmRsZXJdO1xufVxuXG5mdW5jdGlvbiBjb25mbGljdHMoaW5kZXhYOiBQb3JjZWxhaW5GaWxlU3RhdHVzLCAuLi5pbmRleFk6IFBvcmNlbGFpbkZpbGVTdGF0dXNbXSkge1xuICAgcmV0dXJuIGluZGV4WS5tYXAoKHkpID0+IHBhcnNlcihpbmRleFgsIHksIChyZXN1bHQsIGZpbGUpID0+IHJlc3VsdC5jb25mbGljdGVkLnB1c2goZmlsZSkpKTtcbn1cblxuY29uc3QgcGFyc2VyczogTWFwPHN0cmluZywgU3RhdHVzTGluZVBhcnNlcj4gPSBuZXcgTWFwKFtcbiAgIHBhcnNlcihQb3JjZWxhaW5GaWxlU3RhdHVzLk5PTkUsIFBvcmNlbGFpbkZpbGVTdGF0dXMuQURERUQsIChyZXN1bHQsIGZpbGUpID0+XG4gICAgICByZXN1bHQuY3JlYXRlZC5wdXNoKGZpbGUpXG4gICApLFxuICAgcGFyc2VyKFBvcmNlbGFpbkZpbGVTdGF0dXMuTk9ORSwgUG9yY2VsYWluRmlsZVN0YXR1cy5ERUxFVEVELCAocmVzdWx0LCBmaWxlKSA9PlxuICAgICAgcmVzdWx0LmRlbGV0ZWQucHVzaChmaWxlKVxuICAgKSxcbiAgIHBhcnNlcihQb3JjZWxhaW5GaWxlU3RhdHVzLk5PTkUsIFBvcmNlbGFpbkZpbGVTdGF0dXMuTU9ESUZJRUQsIChyZXN1bHQsIGZpbGUpID0+XG4gICAgICByZXN1bHQubW9kaWZpZWQucHVzaChmaWxlKVxuICAgKSxcblxuICAgcGFyc2VyKFBvcmNlbGFpbkZpbGVTdGF0dXMuQURERUQsIFBvcmNlbGFpbkZpbGVTdGF0dXMuTk9ORSwgKHJlc3VsdCwgZmlsZSkgPT4ge1xuICAgICAgcmVzdWx0LmNyZWF0ZWQucHVzaChmaWxlKTtcbiAgICAgIHJlc3VsdC5zdGFnZWQucHVzaChmaWxlKTtcbiAgIH0pLFxuICAgcGFyc2VyKFBvcmNlbGFpbkZpbGVTdGF0dXMuQURERUQsIFBvcmNlbGFpbkZpbGVTdGF0dXMuTU9ESUZJRUQsIChyZXN1bHQsIGZpbGUpID0+IHtcbiAgICAgIHJlc3VsdC5jcmVhdGVkLnB1c2goZmlsZSk7XG4gICAgICByZXN1bHQuc3RhZ2VkLnB1c2goZmlsZSk7XG4gICAgICByZXN1bHQubW9kaWZpZWQucHVzaChmaWxlKTtcbiAgIH0pLFxuXG4gICBwYXJzZXIoUG9yY2VsYWluRmlsZVN0YXR1cy5ERUxFVEVELCBQb3JjZWxhaW5GaWxlU3RhdHVzLk5PTkUsIChyZXN1bHQsIGZpbGUpID0+IHtcbiAgICAgIHJlc3VsdC5kZWxldGVkLnB1c2goZmlsZSk7XG4gICAgICByZXN1bHQuc3RhZ2VkLnB1c2goZmlsZSk7XG4gICB9KSxcblxuICAgcGFyc2VyKFBvcmNlbGFpbkZpbGVTdGF0dXMuTU9ESUZJRUQsIFBvcmNlbGFpbkZpbGVTdGF0dXMuTk9ORSwgKHJlc3VsdCwgZmlsZSkgPT4ge1xuICAgICAgcmVzdWx0Lm1vZGlmaWVkLnB1c2goZmlsZSk7XG4gICAgICByZXN1bHQuc3RhZ2VkLnB1c2goZmlsZSk7XG4gICB9KSxcbiAgIHBhcnNlcihQb3JjZWxhaW5GaWxlU3RhdHVzLk1PRElGSUVELCBQb3JjZWxhaW5GaWxlU3RhdHVzLk1PRElGSUVELCAocmVzdWx0LCBmaWxlKSA9PiB7XG4gICAgICByZXN1bHQubW9kaWZpZWQucHVzaChmaWxlKTtcbiAgICAgIHJlc3VsdC5zdGFnZWQucHVzaChmaWxlKTtcbiAgIH0pLFxuXG4gICBwYXJzZXIoUG9yY2VsYWluRmlsZVN0YXR1cy5SRU5BTUVELCBQb3JjZWxhaW5GaWxlU3RhdHVzLk5PTkUsIChyZXN1bHQsIGZpbGUpID0+IHtcbiAgICAgIHJlc3VsdC5yZW5hbWVkLnB1c2gocmVuYW1lZEZpbGUoZmlsZSkpO1xuICAgfSksXG4gICBwYXJzZXIoUG9yY2VsYWluRmlsZVN0YXR1cy5SRU5BTUVELCBQb3JjZWxhaW5GaWxlU3RhdHVzLk1PRElGSUVELCAocmVzdWx0LCBmaWxlKSA9PiB7XG4gICAgICBjb25zdCByZW5hbWVkID0gcmVuYW1lZEZpbGUoZmlsZSk7XG4gICAgICByZXN1bHQucmVuYW1lZC5wdXNoKHJlbmFtZWQpO1xuICAgICAgcmVzdWx0Lm1vZGlmaWVkLnB1c2gocmVuYW1lZC50byk7XG4gICB9KSxcbiAgIHBhcnNlcihQb3JjZWxhaW5GaWxlU3RhdHVzLklHTk9SRUQsIFBvcmNlbGFpbkZpbGVTdGF0dXMuSUdOT1JFRCwgKF9yZXN1bHQsIF9maWxlKSA9PiB7XG4gICAgICAoX3Jlc3VsdC5pZ25vcmVkID0gX3Jlc3VsdC5pZ25vcmVkIHx8IFtdKS5wdXNoKF9maWxlKTtcbiAgIH0pLFxuXG4gICBwYXJzZXIoUG9yY2VsYWluRmlsZVN0YXR1cy5VTlRSQUNLRUQsIFBvcmNlbGFpbkZpbGVTdGF0dXMuVU5UUkFDS0VELCAocmVzdWx0LCBmaWxlKSA9PlxuICAgICAgcmVzdWx0Lm5vdF9hZGRlZC5wdXNoKGZpbGUpXG4gICApLFxuXG4gICAuLi5jb25mbGljdHMoUG9yY2VsYWluRmlsZVN0YXR1cy5BRERFRCwgUG9yY2VsYWluRmlsZVN0YXR1cy5BRERFRCwgUG9yY2VsYWluRmlsZVN0YXR1cy5VTk1FUkdFRCksXG4gICAuLi5jb25mbGljdHMoXG4gICAgICBQb3JjZWxhaW5GaWxlU3RhdHVzLkRFTEVURUQsXG4gICAgICBQb3JjZWxhaW5GaWxlU3RhdHVzLkRFTEVURUQsXG4gICAgICBQb3JjZWxhaW5GaWxlU3RhdHVzLlVOTUVSR0VEXG4gICApLFxuICAgLi4uY29uZmxpY3RzKFxuICAgICAgUG9yY2VsYWluRmlsZVN0YXR1cy5VTk1FUkdFRCxcbiAgICAgIFBvcmNlbGFpbkZpbGVTdGF0dXMuQURERUQsXG4gICAgICBQb3JjZWxhaW5GaWxlU3RhdHVzLkRFTEVURUQsXG4gICAgICBQb3JjZWxhaW5GaWxlU3RhdHVzLlVOTUVSR0VEXG4gICApLFxuXG4gICBbXG4gICAgICAnIyMnLFxuICAgICAgKHJlc3VsdCwgbGluZSkgPT4ge1xuICAgICAgICAgY29uc3QgYWhlYWRSZWcgPSAvYWhlYWQgKFxcZCspLztcbiAgICAgICAgIGNvbnN0IGJlaGluZFJlZyA9IC9iZWhpbmQgKFxcZCspLztcbiAgICAgICAgIGNvbnN0IGN1cnJlbnRSZWcgPSAvXiguKz8oPz0oPzpcXC57M318XFxzfCQpKSkvO1xuICAgICAgICAgY29uc3QgdHJhY2tpbmdSZWcgPSAvXFwuezN9KFxcUyopLztcbiAgICAgICAgIGNvbnN0IG9uRW1wdHlCcmFuY2hSZWcgPSAvXFxzb25cXHMoXFxTKz8pKD89XFwuezN9fCQpLztcblxuICAgICAgICAgbGV0IHJlZ2V4UmVzdWx0ID0gYWhlYWRSZWcuZXhlYyhsaW5lKTtcbiAgICAgICAgIHJlc3VsdC5haGVhZCA9IChyZWdleFJlc3VsdCAmJiArcmVnZXhSZXN1bHRbMV0pIHx8IDA7XG5cbiAgICAgICAgIHJlZ2V4UmVzdWx0ID0gYmVoaW5kUmVnLmV4ZWMobGluZSk7XG4gICAgICAgICByZXN1bHQuYmVoaW5kID0gKHJlZ2V4UmVzdWx0ICYmICtyZWdleFJlc3VsdFsxXSkgfHwgMDtcblxuICAgICAgICAgcmVnZXhSZXN1bHQgPSBjdXJyZW50UmVnLmV4ZWMobGluZSk7XG4gICAgICAgICByZXN1bHQuY3VycmVudCA9IGZpbHRlclR5cGUocmVnZXhSZXN1bHQ/LlsxXSwgZmlsdGVyU3RyaW5nLCBudWxsKTtcblxuICAgICAgICAgcmVnZXhSZXN1bHQgPSB0cmFja2luZ1JlZy5leGVjKGxpbmUpO1xuICAgICAgICAgcmVzdWx0LnRyYWNraW5nID0gZmlsdGVyVHlwZShyZWdleFJlc3VsdD8uWzFdLCBmaWx0ZXJTdHJpbmcsIG51bGwpO1xuXG4gICAgICAgICByZWdleFJlc3VsdCA9IG9uRW1wdHlCcmFuY2hSZWcuZXhlYyhsaW5lKTtcbiAgICAgICAgIGlmIChyZWdleFJlc3VsdCkge1xuICAgICAgICAgICAgcmVzdWx0LmN1cnJlbnQgPSBmaWx0ZXJUeXBlKHJlZ2V4UmVzdWx0Py5bMV0sIGZpbHRlclN0cmluZywgcmVzdWx0LmN1cnJlbnQpO1xuICAgICAgICAgfVxuXG4gICAgICAgICByZXN1bHQuZGV0YWNoZWQgPSAvXFwobm8gYnJhbmNoXFwpLy50ZXN0KGxpbmUpO1xuICAgICAgfSxcbiAgIF0sXG5dKTtcblxuZXhwb3J0IGNvbnN0IHBhcnNlU3RhdHVzU3VtbWFyeSA9IGZ1bmN0aW9uICh0ZXh0OiBzdHJpbmcpOiBTdGF0dXNSZXN1bHQge1xuICAgY29uc3QgbGluZXMgPSB0ZXh0LnNwbGl0KE5VTEwpO1xuICAgY29uc3Qgc3RhdHVzID0gbmV3IFN0YXR1c1N1bW1hcnkoKTtcblxuICAgZm9yIChsZXQgaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyApIHtcbiAgICAgIGxldCBsaW5lID0gbGluZXNbaSsrXS50cmltKCk7XG5cbiAgICAgIGlmICghbGluZSkge1xuICAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChsaW5lLmNoYXJBdCgwKSA9PT0gUG9yY2VsYWluRmlsZVN0YXR1cy5SRU5BTUVEKSB7XG4gICAgICAgICBsaW5lICs9IE5VTEwgKyAobGluZXNbaSsrXSB8fCAnJyk7XG4gICAgICB9XG5cbiAgICAgIHNwbGl0TGluZShzdGF0dXMsIGxpbmUpO1xuICAgfVxuXG4gICByZXR1cm4gc3RhdHVzO1xufTtcblxuZnVuY3Rpb24gc3BsaXRMaW5lKHJlc3VsdDogU3RhdHVzUmVzdWx0LCBsaW5lU3RyOiBzdHJpbmcpIHtcbiAgIGNvbnN0IHRyaW1tZWQgPSBsaW5lU3RyLnRyaW0oKTtcbiAgIHN3aXRjaCAoJyAnKSB7XG4gICAgICBjYXNlIHRyaW1tZWQuY2hhckF0KDIpOlxuICAgICAgICAgcmV0dXJuIGRhdGEodHJpbW1lZC5jaGFyQXQoMCksIHRyaW1tZWQuY2hhckF0KDEpLCB0cmltbWVkLnNsaWNlKDMpKTtcbiAgICAgIGNhc2UgdHJpbW1lZC5jaGFyQXQoMSk6XG4gICAgICAgICByZXR1cm4gZGF0YShQb3JjZWxhaW5GaWxlU3RhdHVzLk5PTkUsIHRyaW1tZWQuY2hhckF0KDApLCB0cmltbWVkLnNsaWNlKDIpKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgICByZXR1cm47XG4gICB9XG5cbiAgIGZ1bmN0aW9uIGRhdGEoaW5kZXg6IHN0cmluZywgd29ya2luZ0Rpcjogc3RyaW5nLCBwYXRoOiBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IHJhdyA9IGAke2luZGV4fSR7d29ya2luZ0Rpcn1gO1xuICAgICAgY29uc3QgaGFuZGxlciA9IHBhcnNlcnMuZ2V0KHJhdyk7XG5cbiAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICBoYW5kbGVyKHJlc3VsdCwgcGF0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyYXcgIT09ICcjIycgJiYgcmF3ICE9PSAnISEnKSB7XG4gICAgICAgICByZXN1bHQuZmlsZXMucHVzaChuZXcgRmlsZVN0YXR1c1N1bW1hcnkocGF0aCwgaW5kZXgsIHdvcmtpbmdEaXIpKTtcbiAgICAgIH1cbiAgIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IFN0YXR1c1Jlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgcGFyc2VTdGF0dXNTdW1tYXJ5IH0gZnJvbSAnLi4vcmVzcG9uc2VzL1N0YXR1c1N1bW1hcnknO1xuaW1wb3J0IHR5cGUgeyBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5jb25zdCBpZ25vcmVkT3B0aW9ucyA9IFsnLS1udWxsJywgJy16J107XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGF0dXNUYXNrKGN1c3RvbUFyZ3M6IHN0cmluZ1tdKTogU3RyaW5nVGFzazxTdGF0dXNSZXN1bHQ+IHtcbiAgIGNvbnN0IGNvbW1hbmRzID0gW1xuICAgICAgJ3N0YXR1cycsXG4gICAgICAnLS1wb3JjZWxhaW4nLFxuICAgICAgJy1iJyxcbiAgICAgICctdScsXG4gICAgICAnLS1udWxsJyxcbiAgICAgIC4uLmN1c3RvbUFyZ3MuZmlsdGVyKChhcmcpID0+ICFpZ25vcmVkT3B0aW9ucy5pbmNsdWRlcyhhcmcpKSxcbiAgIF07XG5cbiAgIHJldHVybiB7XG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBjb21tYW5kcyxcbiAgICAgIHBhcnNlcih0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgIHJldHVybiBwYXJzZVN0YXR1c1N1bW1hcnkodGV4dCk7XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFNpbXBsZUdpdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRBcGkgfSBmcm9tICcuLi9zaW1wbGUtZ2l0LWFwaSc7XG5pbXBvcnQgeyBhc051bWJlciwgRXhpdENvZGVzLCBMaW5lUGFyc2VyLCBwYXJzZVN0cmluZ1Jlc3BvbnNlIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFZlcnNpb25SZXN1bHQge1xuICAgbWFqb3I6IG51bWJlcjtcbiAgIG1pbm9yOiBudW1iZXI7XG4gICBwYXRjaDogbnVtYmVyIHwgc3RyaW5nO1xuICAgYWdlbnQ6IHN0cmluZztcbiAgIGluc3RhbGxlZDogYm9vbGVhbjtcbn1cblxuY29uc3QgTk9UX0lOU1RBTExFRCA9ICdpbnN0YWxsZWQ9ZmFsc2UnO1xuXG5mdW5jdGlvbiB2ZXJzaW9uUmVzcG9uc2UoXG4gICBtYWpvciA9IDAsXG4gICBtaW5vciA9IDAsXG4gICBwYXRjaDogc3RyaW5nIHwgbnVtYmVyID0gMCxcbiAgIGFnZW50ID0gJycsXG4gICBpbnN0YWxsZWQgPSB0cnVlXG4pOiBWZXJzaW9uUmVzdWx0IHtcbiAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gICAgICB7XG4gICAgICAgICBtYWpvcixcbiAgICAgICAgIG1pbm9yLFxuICAgICAgICAgcGF0Y2gsXG4gICAgICAgICBhZ2VudCxcbiAgICAgICAgIGluc3RhbGxlZCxcbiAgICAgIH0sXG4gICAgICAndG9TdHJpbmcnLFxuICAgICAge1xuICAgICAgICAgdmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5tYWpvcn0uJHt0aGlzLm1pbm9yfS4ke3RoaXMucGF0Y2h9YDtcbiAgICAgICAgIH0sXG4gICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB9XG4gICApO1xufVxuXG5mdW5jdGlvbiBub3RJbnN0YWxsZWRSZXNwb25zZSgpIHtcbiAgIHJldHVybiB2ZXJzaW9uUmVzcG9uc2UoMCwgMCwgMCwgJycsIGZhbHNlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCk6IFBpY2s8U2ltcGxlR2l0LCAndmVyc2lvbic+IHtcbiAgIHJldHVybiB7XG4gICAgICB2ZXJzaW9uKHRoaXM6IFNpbXBsZUdpdEFwaSkge1xuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soe1xuICAgICAgICAgICAgY29tbWFuZHM6IFsnLS12ZXJzaW9uJ10sXG4gICAgICAgICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICAgICAgICBwYXJzZXI6IHZlcnNpb25QYXJzZXIsXG4gICAgICAgICAgICBvbkVycm9yKHJlc3VsdCwgZXJyb3IsIGRvbmUsIGZhaWwpIHtcbiAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZXhpdENvZGUgPT09IEV4aXRDb2Rlcy5OT1RfRk9VTkQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKEJ1ZmZlci5mcm9tKE5PVF9JTlNUQUxMRUQpKTtcbiAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgZmFpbChlcnJvcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgfSk7XG4gICAgICB9LFxuICAgfTtcbn1cblxuY29uc3QgcGFyc2VyczogTGluZVBhcnNlcjxWZXJzaW9uUmVzdWx0PltdID0gW1xuICAgbmV3IExpbmVQYXJzZXIoXG4gICAgICAvdmVyc2lvbiAoXFxkKylcXC4oXFxkKylcXC4oXFxkKykoPzpcXHMqXFwoKC4rKVxcKSk/LyxcbiAgICAgIChyZXN1bHQsIFttYWpvciwgbWlub3IsIHBhdGNoLCBhZ2VudCA9ICcnXSkgPT4ge1xuICAgICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgIHZlcnNpb25SZXNwb25zZShhc051bWJlcihtYWpvciksIGFzTnVtYmVyKG1pbm9yKSwgYXNOdW1iZXIocGF0Y2gpLCBhZ2VudClcbiAgICAgICAgICk7XG4gICAgICB9XG4gICApLFxuICAgbmV3IExpbmVQYXJzZXIoXG4gICAgICAvdmVyc2lvbiAoXFxkKylcXC4oXFxkKylcXC4oXFxEKykoLispPyQvLFxuICAgICAgKHJlc3VsdCwgW21ham9yLCBtaW5vciwgcGF0Y2gsIGFnZW50ID0gJyddKSA9PiB7XG4gICAgICAgICBPYmplY3QuYXNzaWduKHJlc3VsdCwgdmVyc2lvblJlc3BvbnNlKGFzTnVtYmVyKG1ham9yKSwgYXNOdW1iZXIobWlub3IpLCBwYXRjaCwgYWdlbnQpKTtcbiAgICAgIH1cbiAgICksXG5dO1xuXG5mdW5jdGlvbiB2ZXJzaW9uUGFyc2VyKHN0ZE91dDogc3RyaW5nKSB7XG4gICBpZiAoc3RkT3V0ID09PSBOT1RfSU5TVEFMTEVEKSB7XG4gICAgICByZXR1cm4gbm90SW5zdGFsbGVkUmVzcG9uc2UoKTtcbiAgIH1cblxuICAgcmV0dXJuIHBhcnNlU3RyaW5nUmVzcG9uc2UodmVyc2lvblJlc3BvbnNlKDAsIDAsIDAsIHN0ZE91dCksIHBhcnNlcnMsIHN0ZE91dCk7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRCYXNlIH0gZnJvbSAnLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyB0YXNrQ2FsbGJhY2sgfSBmcm9tICcuL3Rhc2stY2FsbGJhY2snO1xuaW1wb3J0IHsgY2hhbmdlV29ya2luZ0RpcmVjdG9yeVRhc2sgfSBmcm9tICcuL3Rhc2tzL2NoYW5nZS13b3JraW5nLWRpcmVjdG9yeSc7XG5pbXBvcnQgY2hlY2tvdXQgZnJvbSAnLi90YXNrcy9jaGVja291dCc7XG5pbXBvcnQgY2xvbmUgZnJvbSAnLi90YXNrcy9jbG9uZSc7XG5pbXBvcnQgY29tbWl0IGZyb20gJy4vdGFza3MvY29tbWl0JztcbmltcG9ydCBjb25maWcgZnJvbSAnLi90YXNrcy9jb25maWcnO1xuaW1wb3J0IGNvdW50T2JqZWN0cyBmcm9tICcuL3Rhc2tzL2NvdW50LW9iamVjdHMnO1xuaW1wb3J0IGZpcnN0Q29tbWl0IGZyb20gJy4vdGFza3MvZmlyc3QtY29tbWl0JztcbmltcG9ydCBncmVwIGZyb20gJy4vdGFza3MvZ3JlcCc7XG5pbXBvcnQgeyBoYXNoT2JqZWN0VGFzayB9IGZyb20gJy4vdGFza3MvaGFzaC1vYmplY3QnO1xuaW1wb3J0IHsgaW5pdFRhc2sgfSBmcm9tICcuL3Rhc2tzL2luaXQnO1xuaW1wb3J0IGludGVycHJldFRyYWlsZXJzIGZyb20gJy4vdGFza3MvaW50ZXJwcmV0LXRyYWlsZXJzJztcbmltcG9ydCBsb2cgZnJvbSAnLi90YXNrcy9sb2cnO1xuaW1wb3J0IHsgbWVyZ2VUYXNrIH0gZnJvbSAnLi90YXNrcy9tZXJnZSc7XG5pbXBvcnQgeyBwdXNoVGFzayB9IGZyb20gJy4vdGFza3MvcHVzaCc7XG5pbXBvcnQgc2hvdyBmcm9tICcuL3Rhc2tzL3Nob3cnO1xuaW1wb3J0IHsgc3RhdHVzVGFzayB9IGZyb20gJy4vdGFza3Mvc3RhdHVzJztcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb25FcnJvclRhc2ssIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2sgfSBmcm9tICcuL3Rhc2tzL3Rhc2snO1xuaW1wb3J0IHZlcnNpb24gZnJvbSAnLi90YXNrcy92ZXJzaW9uJztcbmltcG9ydCB0eXBlIHtcbiAgIG91dHB1dEhhbmRsZXIsXG4gICBTaW1wbGVHaXRFeGVjdXRvcixcbiAgIFNpbXBsZUdpdFRhc2ssXG4gICBTaW1wbGVHaXRUYXNrQ2FsbGJhY2ssXG59IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtcbiAgIGFzQXJyYXksXG4gICBmaWx0ZXJTdHJpbmcsXG4gICBmaWx0ZXJUeXBlLFxuICAgZ2V0VHJhaWxpbmdPcHRpb25zLFxuICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50LFxufSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGNsYXNzIFNpbXBsZUdpdEFwaSBpbXBsZW1lbnRzIFNpbXBsZUdpdEJhc2Uge1xuICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZXhlY3V0b3I6IFNpbXBsZUdpdEV4ZWN1dG9yKSB7fVxuXG4gICBwcm90ZWN0ZWQgX3J1blRhc2s8VD4odGFzazogU2ltcGxlR2l0VGFzazxUPiwgdGhlbj86IFNpbXBsZUdpdFRhc2tDYWxsYmFjazxUPikge1xuICAgICAgY29uc3QgY2hhaW4gPSB0aGlzLl9leGVjdXRvci5jaGFpbigpO1xuICAgICAgY29uc3QgcHJvbWlzZSA9IGNoYWluLnB1c2godGFzayk7XG5cbiAgICAgIGlmICh0aGVuKSB7XG4gICAgICAgICB0YXNrQ2FsbGJhY2sodGFzaywgcHJvbWlzZSwgdGhlbik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKHRoaXMsIHtcbiAgICAgICAgIHRoZW46IHsgdmFsdWU6IHByb21pc2UudGhlbi5iaW5kKHByb21pc2UpIH0sXG4gICAgICAgICBjYXRjaDogeyB2YWx1ZTogcHJvbWlzZS5jYXRjaC5iaW5kKHByb21pc2UpIH0sXG4gICAgICAgICBfZXhlY3V0b3I6IHsgdmFsdWU6IGNoYWluIH0sXG4gICAgICB9KTtcbiAgIH1cblxuICAgYWRkKGZpbGVzOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKFsnYWRkJywgLi4uYXNBcnJheShmaWxlcyldKSxcbiAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICApO1xuICAgfVxuXG4gICBjd2QoZGlyZWN0b3J5OiBzdHJpbmcgfCB7IHBhdGg6IHN0cmluZzsgcm9vdD86IGJvb2xlYW4gfSkge1xuICAgICAgY29uc3QgbmV4dCA9IHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpO1xuXG4gICAgICBpZiAodHlwZW9mIGRpcmVjdG9yeSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKGNoYW5nZVdvcmtpbmdEaXJlY3RvcnlUYXNrKGRpcmVjdG9yeSwgdGhpcy5fZXhlY3V0b3IpLCBuZXh0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBkaXJlY3Rvcnk/LnBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgICAgIGNoYW5nZVdvcmtpbmdEaXJlY3RvcnlUYXNrKFxuICAgICAgICAgICAgICAgZGlyZWN0b3J5LnBhdGgsXG4gICAgICAgICAgICAgICAoZGlyZWN0b3J5LnJvb3QgJiYgdGhpcy5fZXhlY3V0b3IpIHx8IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG5leHRcbiAgICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgY29uZmlndXJhdGlvbkVycm9yVGFzaygnR2l0LmN3ZDogd29ya2luZ0RpcmVjdG9yeSBtdXN0IGJlIHN1cHBsaWVkIGFzIGEgc3RyaW5nJyksXG4gICAgICAgICBuZXh0XG4gICAgICApO1xuICAgfVxuXG4gICBoYXNoT2JqZWN0KHBhdGg6IHN0cmluZywgd3JpdGU6IGJvb2xlYW4gfCB1bmtub3duKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgIGhhc2hPYmplY3RUYXNrKHBhdGgsIHdyaXRlID09PSB0cnVlKSxcbiAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICApO1xuICAgfVxuXG4gICBpbml0KGJhcmU/OiBib29sZWFuIHwgdW5rbm93bikge1xuICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICBpbml0VGFzayhiYXJlID09PSB0cnVlLCB0aGlzLl9leGVjdXRvci5jd2QsIGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpKSxcbiAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICApO1xuICAgfVxuXG4gICBtZXJnZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgbWVyZ2VUYXNrKGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpKSxcbiAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICApO1xuICAgfVxuXG4gICBtZXJnZUZyb21UbyhyZW1vdGU6IHN0cmluZywgYnJhbmNoOiBzdHJpbmcpIHtcbiAgICAgIGlmICghKGZpbHRlclN0cmluZyhyZW1vdGUpICYmIGZpbHRlclN0cmluZyhicmFuY2gpKSkge1xuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICAgICBjb25maWd1cmF0aW9uRXJyb3JUYXNrKFxuICAgICAgICAgICAgICAgYEdpdC5tZXJnZUZyb21UbyByZXF1aXJlcyB0aGF0IHRoZSAncmVtb3RlJyBhbmQgJ2JyYW5jaCcgYXJndW1lbnRzIGFyZSBzdXBwbGllZCBhcyBzdHJpbmdzYFxuICAgICAgICAgICAgKVxuICAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICBtZXJnZVRhc2soW3JlbW90ZSwgYnJhbmNoLCAuLi5nZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKV0pLFxuICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cywgZmFsc2UpXG4gICAgICApO1xuICAgfVxuXG4gICBvdXRwdXRIYW5kbGVyKGhhbmRsZXI6IG91dHB1dEhhbmRsZXIpIHtcbiAgICAgIHRoaXMuX2V4ZWN1dG9yLm91dHB1dEhhbmRsZXIgPSBoYW5kbGVyO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICB9XG5cbiAgIHB1c2goKSB7XG4gICAgICBjb25zdCB0YXNrID0gcHVzaFRhc2soXG4gICAgICAgICB7XG4gICAgICAgICAgICByZW1vdGU6IGZpbHRlclR5cGUoYXJndW1lbnRzWzBdLCBmaWx0ZXJTdHJpbmcpLFxuICAgICAgICAgICAgYnJhbmNoOiBmaWx0ZXJUeXBlKGFyZ3VtZW50c1sxXSwgZmlsdGVyU3RyaW5nKSxcbiAgICAgICAgIH0sXG4gICAgICAgICBnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKVxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2sodGFzaywgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cykpO1xuICAgfVxuXG4gICBzdGFzaCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhbJ3N0YXNoJywgLi4uZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cyldKSxcbiAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICApO1xuICAgfVxuXG4gICBzdGF0dXMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgIHN0YXR1c1Rhc2soZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cykpLFxuICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICAgICk7XG4gICB9XG59XG5cbk9iamVjdC5hc3NpZ24oXG4gICBTaW1wbGVHaXRBcGkucHJvdG90eXBlLFxuICAgY2hlY2tvdXQoKSxcbiAgIGNsb25lKCksXG4gICBjb21taXQoKSxcbiAgIGNvbmZpZygpLFxuICAgY291bnRPYmplY3RzKCksXG4gICBmaXJzdENvbW1pdCgpLFxuICAgZ3JlcCgpLFxuICAgaW50ZXJwcmV0VHJhaWxlcnMoKSxcbiAgIGxvZygpLFxuICAgc2hvdygpLFxuICAgdmVyc2lvbigpXG4pO1xuIiwgImltcG9ydCB7IGNyZWF0ZURlZmVycmVkLCB0eXBlIERlZmVycmVkUHJvbWlzZSB9IGZyb20gJ0Brd3NpdGVzL3Byb21pc2UtZGVmZXJyZWQnO1xuXG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tICcuLi9naXQtbG9nZ2VyJztcbmltcG9ydCB7IGFwcGVuZCwgcmVtb3ZlIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG50eXBlIFNjaGVkdWxlQ29tcGxldGVDYWxsYmFjayA9ICgpID0+IHZvaWQ7XG50eXBlIFNjaGVkdWxlZFRhc2sgPSBQaWNrPERlZmVycmVkUHJvbWlzZTxTY2hlZHVsZUNvbXBsZXRlQ2FsbGJhY2s+LCAncHJvbWlzZScgfCAnZG9uZSc+ICYge1xuICAgaWQ6IG51bWJlcjtcbn07XG5cbmNvbnN0IGNyZWF0ZVNjaGVkdWxlZFRhc2s6ICgpID0+IFNjaGVkdWxlZFRhc2sgPSAoKCkgPT4ge1xuICAgbGV0IGlkID0gMDtcbiAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZCsrO1xuICAgICAgY29uc3QgeyBwcm9taXNlLCBkb25lIH0gPSBjcmVhdGVEZWZlcnJlZDxTY2hlZHVsZUNvbXBsZXRlQ2FsbGJhY2s+KCk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgICBwcm9taXNlLFxuICAgICAgICAgZG9uZSxcbiAgICAgICAgIGlkLFxuICAgICAgfTtcbiAgIH07XG59KSgpO1xuXG5leHBvcnQgY2xhc3MgU2NoZWR1bGVyIHtcbiAgIHByaXZhdGUgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKCcnLCAnc2NoZWR1bGVyJyk7XG4gICBwcml2YXRlIHBlbmRpbmc6IFNjaGVkdWxlZFRhc2tbXSA9IFtdO1xuICAgcHJpdmF0ZSBydW5uaW5nOiBTY2hlZHVsZWRUYXNrW10gPSBbXTtcblxuICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25jdXJyZW5jeSA9IDIpIHtcbiAgICAgIHRoaXMubG9nZ2VyKGBDb25zdHJ1Y3RlZCwgY29uY3VycmVuY3k9JXNgLCBjb25jdXJyZW5jeSk7XG4gICB9XG5cbiAgIHByaXZhdGUgc2NoZWR1bGUoKSB7XG4gICAgICBpZiAoIXRoaXMucGVuZGluZy5sZW5ndGggfHwgdGhpcy5ydW5uaW5nLmxlbmd0aCA+PSB0aGlzLmNvbmN1cnJlbmN5KSB7XG4gICAgICAgICB0aGlzLmxvZ2dlcihcbiAgICAgICAgICAgIGBTY2hlZHVsZSBhdHRlbXB0IGlnbm9yZWQsIHBlbmRpbmc9JXMgcnVubmluZz0lcyBjb25jdXJyZW5jeT0lc2AsXG4gICAgICAgICAgICB0aGlzLnBlbmRpbmcubGVuZ3RoLFxuICAgICAgICAgICAgdGhpcy5ydW5uaW5nLmxlbmd0aCxcbiAgICAgICAgICAgIHRoaXMuY29uY3VycmVuY3lcbiAgICAgICAgICk7XG4gICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRhc2sgPSBhcHBlbmQodGhpcy5ydW5uaW5nLCB0aGlzLnBlbmRpbmcuc2hpZnQoKSEpO1xuICAgICAgdGhpcy5sb2dnZXIoYEF0dGVtcHRpbmcgaWQ9JXNgLCB0YXNrLmlkKTtcbiAgICAgIHRhc2suZG9uZSgoKSA9PiB7XG4gICAgICAgICB0aGlzLmxvZ2dlcihgQ29tcGxldGluZyBpZD1gLCB0YXNrLmlkKTtcbiAgICAgICAgIHJlbW92ZSh0aGlzLnJ1bm5pbmcsIHRhc2spO1xuICAgICAgICAgdGhpcy5zY2hlZHVsZSgpO1xuICAgICAgfSk7XG4gICB9XG5cbiAgIG5leHQoKTogUHJvbWlzZTxTY2hlZHVsZUNvbXBsZXRlQ2FsbGJhY2s+IHtcbiAgICAgIGNvbnN0IHsgcHJvbWlzZSwgaWQgfSA9IGFwcGVuZCh0aGlzLnBlbmRpbmcsIGNyZWF0ZVNjaGVkdWxlZFRhc2soKSk7XG4gICAgICB0aGlzLmxvZ2dlcihgU2NoZWR1bGluZyBpZD0lc2AsIGlkKTtcblxuICAgICAgdGhpcy5zY2hlZHVsZSgpO1xuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IE9wdGlvbkZsYWdzLCBPcHRpb25zLCBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmV4cG9ydCB0eXBlIEFwcGx5T3B0aW9ucyA9IE9wdGlvbnMgJlxuICAgT3B0aW9uRmxhZ3M8XG4gICAgICB8ICctLXN0YXQnXG4gICAgICB8ICctLW51bXN0YXQnXG4gICAgICB8ICctLXN1bW1hcnknXG4gICAgICB8ICctLWNoZWNrJ1xuICAgICAgfCAnLS1pbmRleCdcbiAgICAgIHwgJy0taW50ZW50LXRvLWFkZCdcbiAgICAgIHwgJy0tM3dheSdcbiAgICAgIHwgJy0tYXBwbHknXG4gICAgICB8ICctLW5vLWFkZCdcbiAgICAgIHwgJy1SJ1xuICAgICAgfCAnLS1yZXZlcnNlJ1xuICAgICAgfCAnLS1hbGxvdy1iaW5hcnktcmVwbGFjZW1lbnQnXG4gICAgICB8ICctLWJpbmFyeSdcbiAgICAgIHwgJy0tcmVqZWN0J1xuICAgICAgfCAnLXonXG4gICAgICB8ICctLWluYWNjdXJhdGUtZW9mJ1xuICAgICAgfCAnLS1yZWNvdW50J1xuICAgICAgfCAnLS1jYWNoZWQnXG4gICAgICB8ICctLWlnbm9yZS1zcGFjZS1jaGFuZ2UnXG4gICAgICB8ICctLWlnbm9yZS13aGl0ZXNwYWNlJ1xuICAgICAgfCAnLS12ZXJib3NlJ1xuICAgICAgfCAnLS11bnNhZmUtcGF0aHMnXG4gICA+ICZcbiAgIE9wdGlvbkZsYWdzPCctLXdoaXRlc3BhY2UnLCAnbm93YXJuJyB8ICd3YXJuJyB8ICdmaXgnIHwgJ2Vycm9yJyB8ICdlcnJvci1hbGwnPiAmXG4gICBPcHRpb25GbGFnczwnLS1idWlsZC1mYWtlLWFuY2VzdG9yJyB8ICctLWV4Y2x1ZGUnIHwgJy0taW5jbHVkZScgfCAnLS1kaXJlY3RvcnknLCBzdHJpbmc+ICZcbiAgIE9wdGlvbkZsYWdzPCctcCcgfCAnLUMnLCBudW1iZXI+O1xuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlQYXRjaFRhc2socGF0Y2hlczogc3RyaW5nW10sIGN1c3RvbUFyZ3M6IHN0cmluZ1tdKTogU3RyaW5nVGFzazxzdHJpbmc+IHtcbiAgIHJldHVybiBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKFsnYXBwbHknLCAuLi5jdXN0b21BcmdzLCAuLi5wYXRjaGVzXSk7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBCcmFuY2hTdW1tYXJ5LCBCcmFuY2hTdW1tYXJ5QnJhbmNoIH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5cbmV4cG9ydCBlbnVtIEJyYW5jaFN0YXR1c0lkZW50aWZpZXIge1xuICAgQ1VSUkVOVCA9ICcqJyxcbiAgIExJTktFRCA9ICcrJyxcbn1cblxuZXhwb3J0IGNsYXNzIEJyYW5jaFN1bW1hcnlSZXN1bHQgaW1wbGVtZW50cyBCcmFuY2hTdW1tYXJ5IHtcbiAgIHB1YmxpYyBhbGw6IHN0cmluZ1tdID0gW107XG4gICBwdWJsaWMgYnJhbmNoZXM6IHsgW3A6IHN0cmluZ106IEJyYW5jaFN1bW1hcnlCcmFuY2ggfSA9IHt9O1xuICAgcHVibGljIGN1cnJlbnQ6IHN0cmluZyA9ICcnO1xuICAgcHVibGljIGRldGFjaGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgIHB1c2goXG4gICAgICBzdGF0dXM6IEJyYW5jaFN0YXR1c0lkZW50aWZpZXIgfCB1bmtub3duLFxuICAgICAgZGV0YWNoZWQ6IGJvb2xlYW4sXG4gICAgICBuYW1lOiBzdHJpbmcsXG4gICAgICBjb21taXQ6IHN0cmluZyxcbiAgICAgIGxhYmVsOiBzdHJpbmdcbiAgICkge1xuICAgICAgaWYgKHN0YXR1cyA9PT0gQnJhbmNoU3RhdHVzSWRlbnRpZmllci5DVVJSRU5UKSB7XG4gICAgICAgICB0aGlzLmRldGFjaGVkID0gZGV0YWNoZWQ7XG4gICAgICAgICB0aGlzLmN1cnJlbnQgPSBuYW1lO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFsbC5wdXNoKG5hbWUpO1xuICAgICAgdGhpcy5icmFuY2hlc1tuYW1lXSA9IHtcbiAgICAgICAgIGN1cnJlbnQ6IHN0YXR1cyA9PT0gQnJhbmNoU3RhdHVzSWRlbnRpZmllci5DVVJSRU5ULFxuICAgICAgICAgbGlua2VkV29ya1RyZWU6IHN0YXR1cyA9PT0gQnJhbmNoU3RhdHVzSWRlbnRpZmllci5MSU5LRUQsXG4gICAgICAgICBuYW1lLFxuICAgICAgICAgY29tbWl0LFxuICAgICAgICAgbGFiZWwsXG4gICAgICB9O1xuICAgfVxufVxuIiwgImltcG9ydCB0eXBlIHsgQnJhbmNoU3VtbWFyeSB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgQnJhbmNoU3RhdHVzSWRlbnRpZmllciwgQnJhbmNoU3VtbWFyeVJlc3VsdCB9IGZyb20gJy4uL3Jlc3BvbnNlcy9CcmFuY2hTdW1tYXJ5JztcbmltcG9ydCB7IExpbmVQYXJzZXIsIHBhcnNlU3RyaW5nUmVzcG9uc2UgfSBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IHBhcnNlcnM6IExpbmVQYXJzZXI8QnJhbmNoU3VtbWFyeVJlc3VsdD5bXSA9IFtcbiAgIG5ldyBMaW5lUGFyc2VyKFxuICAgICAgL14oWyorXVxccyk/XFwoKD86SEVBRCApP2RldGFjaGVkICg/OmZyb218YXQpIChcXFMrKVxcKVxccysoW2EtejAtOV0rKVxccyguKikkLyxcbiAgICAgIChyZXN1bHQsIFtjdXJyZW50LCBuYW1lLCBjb21taXQsIGxhYmVsXSkgPT4ge1xuICAgICAgICAgcmVzdWx0LnB1c2goYnJhbmNoU3RhdHVzKGN1cnJlbnQpLCB0cnVlLCBuYW1lLCBjb21taXQsIGxhYmVsKTtcbiAgICAgIH1cbiAgICksXG4gICBuZXcgTGluZVBhcnNlcihcbiAgICAgIC9eKFsqK11cXHMpPyhcXFMrKVxccysoW2EtejAtOV0rKVxccz8oLiopJC9zLFxuICAgICAgKHJlc3VsdCwgW2N1cnJlbnQsIG5hbWUsIGNvbW1pdCwgbGFiZWxdKSA9PiB7XG4gICAgICAgICByZXN1bHQucHVzaChicmFuY2hTdGF0dXMoY3VycmVudCksIGZhbHNlLCBuYW1lLCBjb21taXQsIGxhYmVsKTtcbiAgICAgIH1cbiAgICksXG5dO1xuXG5jb25zdCBjdXJyZW50QnJhbmNoUGFyc2VyID0gbmV3IExpbmVQYXJzZXI8QnJhbmNoU3VtbWFyeVJlc3VsdD4oL14oXFxTKykkL3MsIChyZXN1bHQsIFtuYW1lXSkgPT4ge1xuICAgcmVzdWx0LnB1c2goQnJhbmNoU3RhdHVzSWRlbnRpZmllci5DVVJSRU5ULCBmYWxzZSwgbmFtZSwgJycsICcnKTtcbn0pO1xuXG5mdW5jdGlvbiBicmFuY2hTdGF0dXMoaW5wdXQ/OiBzdHJpbmcpIHtcbiAgIHJldHVybiBpbnB1dCA/IGlucHV0LmNoYXJBdCgwKSA6ICcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VCcmFuY2hTdW1tYXJ5KHN0ZE91dDogc3RyaW5nLCBjdXJyZW50T25seSA9IGZhbHNlKTogQnJhbmNoU3VtbWFyeSB7XG4gICByZXR1cm4gcGFyc2VTdHJpbmdSZXNwb25zZShcbiAgICAgIG5ldyBCcmFuY2hTdW1tYXJ5UmVzdWx0KCksXG4gICAgICBjdXJyZW50T25seSA/IFtjdXJyZW50QnJhbmNoUGFyc2VyXSA6IHBhcnNlcnMsXG4gICAgICBzdGRPdXRcbiAgICk7XG59XG4iLCAiaW1wb3J0IHR5cGUge1xuICAgQnJhbmNoTXVsdGlEZWxldGVSZXN1bHQsXG4gICBCcmFuY2hTaW5nbGVEZWxldGVGYWlsdXJlLFxuICAgQnJhbmNoU2luZ2xlRGVsZXRlUmVzdWx0LFxuICAgQnJhbmNoU2luZ2xlRGVsZXRlU3VjY2Vzcyxcbn0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5cbmV4cG9ydCBjbGFzcyBCcmFuY2hEZWxldGlvbkJhdGNoIGltcGxlbWVudHMgQnJhbmNoTXVsdGlEZWxldGVSZXN1bHQge1xuICAgYWxsOiBCcmFuY2hTaW5nbGVEZWxldGVSZXN1bHRbXSA9IFtdO1xuICAgYnJhbmNoZXM6IHsgW2JyYW5jaE5hbWU6IHN0cmluZ106IEJyYW5jaFNpbmdsZURlbGV0ZVJlc3VsdCB9ID0ge307XG4gICBlcnJvcnM6IEJyYW5jaFNpbmdsZURlbGV0ZVJlc3VsdFtdID0gW107XG5cbiAgIGdldCBzdWNjZXNzKCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuICF0aGlzLmVycm9ycy5sZW5ndGg7XG4gICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBicmFuY2hEZWxldGlvblN1Y2Nlc3MoYnJhbmNoOiBzdHJpbmcsIGhhc2g6IHN0cmluZyk6IEJyYW5jaFNpbmdsZURlbGV0ZVN1Y2Nlc3Mge1xuICAgcmV0dXJuIHtcbiAgICAgIGJyYW5jaCxcbiAgICAgIGhhc2gsXG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJyYW5jaERlbGV0aW9uRmFpbHVyZShicmFuY2g6IHN0cmluZyk6IEJyYW5jaFNpbmdsZURlbGV0ZUZhaWx1cmUge1xuICAgcmV0dXJuIHtcbiAgICAgIGJyYW5jaCxcbiAgICAgIGhhc2g6IG51bGwsXG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NpbmdsZUJyYW5jaERlbGV0ZUZhaWx1cmUoXG4gICB0ZXN0OiBCcmFuY2hTaW5nbGVEZWxldGVSZXN1bHRcbik6IHRlc3QgaXMgQnJhbmNoU2luZ2xlRGVsZXRlU3VjY2VzcyB7XG4gICByZXR1cm4gdGVzdC5zdWNjZXNzO1xufVxuIiwgImltcG9ydCB0eXBlIHsgQnJhbmNoTXVsdGlEZWxldGVSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7XG4gICBCcmFuY2hEZWxldGlvbkJhdGNoLFxuICAgYnJhbmNoRGVsZXRpb25GYWlsdXJlLFxuICAgYnJhbmNoRGVsZXRpb25TdWNjZXNzLFxufSBmcm9tICcuLi9yZXNwb25zZXMvQnJhbmNoRGVsZXRlU3VtbWFyeSc7XG5pbXBvcnQgdHlwZSB7IFRhc2tQYXJzZXIgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBFeGl0Q29kZXMsIExpbmVQYXJzZXIsIHBhcnNlU3RyaW5nUmVzcG9uc2UgfSBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IGRlbGV0ZVN1Y2Nlc3NSZWdleCA9IC8oXFxTKylcXHMrXFwoXFxTK1xccyhbXildKylcXCkvO1xuY29uc3QgZGVsZXRlRXJyb3JSZWdleCA9IC9eZXJyb3JbXiddKycoW14nXSspJy9tO1xuXG5jb25zdCBwYXJzZXJzOiBMaW5lUGFyc2VyPEJyYW5jaE11bHRpRGVsZXRlUmVzdWx0PltdID0gW1xuICAgbmV3IExpbmVQYXJzZXIoZGVsZXRlU3VjY2Vzc1JlZ2V4LCAocmVzdWx0LCBbYnJhbmNoLCBoYXNoXSkgPT4ge1xuICAgICAgY29uc3QgZGVsZXRpb24gPSBicmFuY2hEZWxldGlvblN1Y2Nlc3MoYnJhbmNoLCBoYXNoKTtcblxuICAgICAgcmVzdWx0LmFsbC5wdXNoKGRlbGV0aW9uKTtcbiAgICAgIHJlc3VsdC5icmFuY2hlc1ticmFuY2hdID0gZGVsZXRpb247XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyKGRlbGV0ZUVycm9yUmVnZXgsIChyZXN1bHQsIFticmFuY2hdKSA9PiB7XG4gICAgICBjb25zdCBkZWxldGlvbiA9IGJyYW5jaERlbGV0aW9uRmFpbHVyZShicmFuY2gpO1xuXG4gICAgICByZXN1bHQuZXJyb3JzLnB1c2goZGVsZXRpb24pO1xuICAgICAgcmVzdWx0LmFsbC5wdXNoKGRlbGV0aW9uKTtcbiAgICAgIHJlc3VsdC5icmFuY2hlc1ticmFuY2hdID0gZGVsZXRpb247XG4gICB9KSxcbl07XG5cbmV4cG9ydCBjb25zdCBwYXJzZUJyYW5jaERlbGV0aW9uczogVGFza1BhcnNlcjxzdHJpbmcsIEJyYW5jaE11bHRpRGVsZXRlUmVzdWx0PiA9IChcbiAgIHN0ZE91dCxcbiAgIHN0ZEVyclxuKSA9PiB7XG4gICByZXR1cm4gcGFyc2VTdHJpbmdSZXNwb25zZShuZXcgQnJhbmNoRGVsZXRpb25CYXRjaCgpLCBwYXJzZXJzLCBbc3RkT3V0LCBzdGRFcnJdKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNCcmFuY2hEZWxldGlvbkVycm9yKGRhdGE6IHN0cmluZywgcHJvY2Vzc0V4aXRDb2RlOiBFeGl0Q29kZXMpOiBib29sZWFuIHtcbiAgIHJldHVybiBwcm9jZXNzRXhpdENvZGUgPT09IEV4aXRDb2Rlcy5FUlJPUiAmJiBkZWxldGVFcnJvclJlZ2V4LnRlc3QoZGF0YSk7XG59XG4iLCAiaW1wb3J0IHR5cGUge1xuICAgQnJhbmNoTXVsdGlEZWxldGVSZXN1bHQsXG4gICBCcmFuY2hTaW5nbGVEZWxldGVSZXN1bHQsXG4gICBCcmFuY2hTdW1tYXJ5LFxufSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IEdpdFJlc3BvbnNlRXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvZ2l0LXJlc3BvbnNlLWVycm9yJztcbmltcG9ydCB7IHBhcnNlQnJhbmNoU3VtbWFyeSB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2UtYnJhbmNoJztcbmltcG9ydCB7IGhhc0JyYW5jaERlbGV0aW9uRXJyb3IsIHBhcnNlQnJhbmNoRGVsZXRpb25zIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZS1icmFuY2gtZGVsZXRlJztcbmltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGJ1ZmZlclRvU3RyaW5nIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnNEZWxldGVCcmFuY2hDb21tYW5kKGNvbW1hbmRzOiBzdHJpbmdbXSkge1xuICAgY29uc3QgZGVsZXRlQ29tbWFuZHMgPSBbJy1kJywgJy1EJywgJy0tZGVsZXRlJ107XG4gICByZXR1cm4gY29tbWFuZHMuc29tZSgoY29tbWFuZCkgPT4gZGVsZXRlQ29tbWFuZHMuaW5jbHVkZXMoY29tbWFuZCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnJhbmNoVGFzayhcbiAgIGN1c3RvbUFyZ3M6IHN0cmluZ1tdXG4pOiBTdHJpbmdUYXNrPEJyYW5jaFN1bW1hcnkgfCBCcmFuY2hTaW5nbGVEZWxldGVSZXN1bHQ+IHtcbiAgIGNvbnN0IGlzRGVsZXRlID0gY29udGFpbnNEZWxldGVCcmFuY2hDb21tYW5kKGN1c3RvbUFyZ3MpO1xuICAgY29uc3QgaXNDdXJyZW50T25seSA9IGN1c3RvbUFyZ3MuaW5jbHVkZXMoJy0tc2hvdy1jdXJyZW50Jyk7XG5cbiAgIGNvbnN0IGNvbW1hbmRzID0gWydicmFuY2gnLCAuLi5jdXN0b21BcmdzXTtcblxuICAgaWYgKGNvbW1hbmRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgY29tbWFuZHMucHVzaCgnLWEnKTtcbiAgIH1cblxuICAgaWYgKCFjb21tYW5kcy5pbmNsdWRlcygnLXYnKSkge1xuICAgICAgY29tbWFuZHMuc3BsaWNlKDEsIDAsICctdicpO1xuICAgfVxuXG4gICByZXR1cm4ge1xuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgY29tbWFuZHMsXG4gICAgICBwYXJzZXIoc3RkT3V0LCBzdGRFcnIpIHtcbiAgICAgICAgIGlmIChpc0RlbGV0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlQnJhbmNoRGVsZXRpb25zKHN0ZE91dCwgc3RkRXJyKS5hbGxbMF07XG4gICAgICAgICB9XG5cbiAgICAgICAgIHJldHVybiBwYXJzZUJyYW5jaFN1bW1hcnkoc3RkT3V0LCBpc0N1cnJlbnRPbmx5KTtcbiAgICAgIH0sXG4gICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnJhbmNoTG9jYWxUYXNrKCk6IFN0cmluZ1Rhc2s8QnJhbmNoU3VtbWFyeT4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIGNvbW1hbmRzOiBbJ2JyYW5jaCcsICctdiddLFxuICAgICAgcGFyc2VyKHN0ZE91dCkge1xuICAgICAgICAgcmV0dXJuIHBhcnNlQnJhbmNoU3VtbWFyeShzdGRPdXQpO1xuICAgICAgfSxcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVCcmFuY2hlc1Rhc2soXG4gICBicmFuY2hlczogc3RyaW5nW10sXG4gICBmb3JjZURlbGV0ZSA9IGZhbHNlXG4pOiBTdHJpbmdUYXNrPEJyYW5jaE11bHRpRGVsZXRlUmVzdWx0PiB7XG4gICByZXR1cm4ge1xuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgY29tbWFuZHM6IFsnYnJhbmNoJywgJy12JywgZm9yY2VEZWxldGUgPyAnLUQnIDogJy1kJywgLi4uYnJhbmNoZXNdLFxuICAgICAgcGFyc2VyKHN0ZE91dCwgc3RkRXJyKSB7XG4gICAgICAgICByZXR1cm4gcGFyc2VCcmFuY2hEZWxldGlvbnMoc3RkT3V0LCBzdGRFcnIpO1xuICAgICAgfSxcbiAgICAgIG9uRXJyb3IoeyBleGl0Q29kZSwgc3RkT3V0IH0sIGVycm9yLCBkb25lLCBmYWlsKSB7XG4gICAgICAgICBpZiAoIWhhc0JyYW5jaERlbGV0aW9uRXJyb3IoU3RyaW5nKGVycm9yKSwgZXhpdENvZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFpbChlcnJvcik7XG4gICAgICAgICB9XG5cbiAgICAgICAgIGRvbmUoc3RkT3V0KTtcbiAgICAgIH0sXG4gICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlQnJhbmNoVGFzayhcbiAgIGJyYW5jaDogc3RyaW5nLFxuICAgZm9yY2VEZWxldGUgPSBmYWxzZVxuKTogU3RyaW5nVGFzazxCcmFuY2hTaW5nbGVEZWxldGVSZXN1bHQ+IHtcbiAgIGNvbnN0IHRhc2s6IFN0cmluZ1Rhc2s8QnJhbmNoU2luZ2xlRGVsZXRlUmVzdWx0PiA9IHtcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIGNvbW1hbmRzOiBbJ2JyYW5jaCcsICctdicsIGZvcmNlRGVsZXRlID8gJy1EJyA6ICctZCcsIGJyYW5jaF0sXG4gICAgICBwYXJzZXIoc3RkT3V0LCBzdGRFcnIpIHtcbiAgICAgICAgIHJldHVybiBwYXJzZUJyYW5jaERlbGV0aW9ucyhzdGRPdXQsIHN0ZEVycikuYnJhbmNoZXNbYnJhbmNoXSE7XG4gICAgICB9LFxuICAgICAgb25FcnJvcih7IGV4aXRDb2RlLCBzdGRFcnIsIHN0ZE91dCB9LCBlcnJvciwgXywgZmFpbCkge1xuICAgICAgICAgaWYgKCFoYXNCcmFuY2hEZWxldGlvbkVycm9yKFN0cmluZyhlcnJvciksIGV4aXRDb2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhaWwoZXJyb3IpO1xuICAgICAgICAgfVxuXG4gICAgICAgICB0aHJvdyBuZXcgR2l0UmVzcG9uc2VFcnJvcihcbiAgICAgICAgICAgIHRhc2sucGFyc2VyKGJ1ZmZlclRvU3RyaW5nKHN0ZE91dCksIGJ1ZmZlclRvU3RyaW5nKHN0ZEVycikpLFxuICAgICAgICAgICAgU3RyaW5nKGVycm9yKVxuICAgICAgICAgKTtcbiAgICAgIH0sXG4gICB9O1xuXG4gICByZXR1cm4gdGFzaztcbn1cbiIsICJpbXBvcnQgeyBub3JtYWxpemUgfSBmcm9tICdub2RlOnBhdGgnO1xuXG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0lnbm9yZVRhc2socGF0aHM6IHN0cmluZ1tdKTogU3RyaW5nVGFzazxzdHJpbmdbXT4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzOiBbJ2NoZWNrLWlnbm9yZScsIC4uLnBhdGhzXSxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIHBhcnNlcjogcGFyc2VDaGVja0lnbm9yZSxcbiAgIH07XG59XG5cbi8qKlxuICogUGFyc2VyIGZvciB0aGUgYGNoZWNrLWlnbm9yZWAgY29tbWFuZCAtIHJldHVybnMgZWFjaCBmaWxlIGFzIGEgc3RyaW5nIGFycmF5XG4gKi9cbmZ1bmN0aW9uIHBhcnNlQ2hlY2tJZ25vcmUodGV4dDogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgcmV0dXJuIHRleHQuc3BsaXQoL1xcbi9nKS5tYXAodG9QYXRoKS5maWx0ZXIoQm9vbGVhbik7XG59XG5cbmZ1bmN0aW9uIHRvUGF0aChpbnB1dDogc3RyaW5nKSB7XG4gICBjb25zdCBwYXRoID0gaW5wdXQudHJpbSgpLnJlcGxhY2UoL15bXCInXXxbXCInXSQvZywgJycpO1xuICAgcmV0dXJuIHBhdGggJiYgbm9ybWFsaXplKHBhdGgpO1xufVxuIiwgImltcG9ydCB0eXBlIHsgRmV0Y2hSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IExpbmVQYXJzZXIsIHBhcnNlU3RyaW5nUmVzcG9uc2UgfSBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IHBhcnNlcnM6IExpbmVQYXJzZXI8RmV0Y2hSZXN1bHQ+W10gPSBbXG4gICBuZXcgTGluZVBhcnNlcigvRnJvbSAoLispJC8sIChyZXN1bHQsIFtyZW1vdGVdKSA9PiB7XG4gICAgICByZXN1bHQucmVtb3RlID0gcmVtb3RlO1xuICAgfSksXG4gICBuZXcgTGluZVBhcnNlcigvXFwqIFxcW25ldyBicmFuY2hdXFxzKyhcXFMrKVxccyotPiAoLispJC8sIChyZXN1bHQsIFtuYW1lLCB0cmFja2luZ10pID0+IHtcbiAgICAgIHJlc3VsdC5icmFuY2hlcy5wdXNoKHtcbiAgICAgICAgIG5hbWUsXG4gICAgICAgICB0cmFja2luZyxcbiAgICAgIH0pO1xuICAgfSksXG4gICBuZXcgTGluZVBhcnNlcigvXFwqIFxcW25ldyB0YWddXFxzKyhcXFMrKVxccyotPiAoLispJC8sIChyZXN1bHQsIFtuYW1lLCB0cmFja2luZ10pID0+IHtcbiAgICAgIHJlc3VsdC50YWdzLnB1c2goe1xuICAgICAgICAgbmFtZSxcbiAgICAgICAgIHRyYWNraW5nLFxuICAgICAgfSk7XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyKC8tIFxcW2RlbGV0ZWRdXFxzK1xcUytcXHMqLT4gKC4rKSQvLCAocmVzdWx0LCBbdHJhY2tpbmddKSA9PiB7XG4gICAgICByZXN1bHQuZGVsZXRlZC5wdXNoKHtcbiAgICAgICAgIHRyYWNraW5nLFxuICAgICAgfSk7XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyKFxuICAgICAgL1xccyooW14uXSspXFwuXFwuKFxcUyspXFxzKyhcXFMrKVxccyotPiAoLispJC8sXG4gICAgICAocmVzdWx0LCBbZnJvbSwgdG8sIG5hbWUsIHRyYWNraW5nXSkgPT4ge1xuICAgICAgICAgcmVzdWx0LnVwZGF0ZWQucHVzaCh7XG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgdHJhY2tpbmcsXG4gICAgICAgICAgICB0byxcbiAgICAgICAgICAgIGZyb20sXG4gICAgICAgICB9KTtcbiAgICAgIH1cbiAgICksXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VGZXRjaFJlc3VsdChzdGRPdXQ6IHN0cmluZywgc3RkRXJyOiBzdHJpbmcpOiBGZXRjaFJlc3VsdCB7XG4gICBjb25zdCByZXN1bHQ6IEZldGNoUmVzdWx0ID0ge1xuICAgICAgcmF3OiBzdGRPdXQsXG4gICAgICByZW1vdGU6IG51bGwsXG4gICAgICBicmFuY2hlczogW10sXG4gICAgICB0YWdzOiBbXSxcbiAgICAgIHVwZGF0ZWQ6IFtdLFxuICAgICAgZGVsZXRlZDogW10sXG4gICB9O1xuICAgcmV0dXJuIHBhcnNlU3RyaW5nUmVzcG9uc2UocmVzdWx0LCBwYXJzZXJzLCBbc3RkT3V0LCBzdGRFcnJdKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IEZldGNoUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBwYXJzZUZldGNoUmVzdWx0IH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZS1mZXRjaCc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBjb25maWd1cmF0aW9uRXJyb3JUYXNrLCB0eXBlIEVtcHR5VGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmZ1bmN0aW9uIGRpc2FsbG93ZWRDb21tYW5kKGNvbW1hbmQ6IHN0cmluZykge1xuICAgcmV0dXJuIC9eLS11cGxvYWQtcGFjayg9fCQpLy50ZXN0KGNvbW1hbmQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hUYXNrKFxuICAgcmVtb3RlOiBzdHJpbmcsXG4gICBicmFuY2g6IHN0cmluZyxcbiAgIGN1c3RvbUFyZ3M6IHN0cmluZ1tdXG4pOiBTdHJpbmdUYXNrPEZldGNoUmVzdWx0PiB8IEVtcHR5VGFzayB7XG4gICBjb25zdCBjb21tYW5kcyA9IFsnZmV0Y2gnLCAuLi5jdXN0b21BcmdzXTtcbiAgIGlmIChyZW1vdGUgJiYgYnJhbmNoKSB7XG4gICAgICBjb21tYW5kcy5wdXNoKHJlbW90ZSwgYnJhbmNoKTtcbiAgIH1cblxuICAgY29uc3QgYmFubmVkID0gY29tbWFuZHMuZmluZChkaXNhbGxvd2VkQ29tbWFuZCk7XG4gICBpZiAoYmFubmVkKSB7XG4gICAgICByZXR1cm4gY29uZmlndXJhdGlvbkVycm9yVGFzayhgZ2l0LmZldGNoOiBwb3RlbnRpYWwgZXhwbG9pdCBhcmd1bWVudCBibG9ja2VkLmApO1xuICAgfVxuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXI6IHBhcnNlRmV0Y2hSZXN1bHQsXG4gICB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgTW92ZVJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgTGluZVBhcnNlciwgcGFyc2VTdHJpbmdSZXNwb25zZSB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgcGFyc2VyczogTGluZVBhcnNlcjxNb3ZlUmVzdWx0PltdID0gW1xuICAgbmV3IExpbmVQYXJzZXIoL15SZW5hbWluZyAoLispIHRvICguKykkLywgKHJlc3VsdCwgW2Zyb20sIHRvXSkgPT4ge1xuICAgICAgcmVzdWx0Lm1vdmVzLnB1c2goeyBmcm9tLCB0byB9KTtcbiAgIH0pLFxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTW92ZVJlc3VsdChzdGRPdXQ6IHN0cmluZyk6IE1vdmVSZXN1bHQge1xuICAgcmV0dXJuIHBhcnNlU3RyaW5nUmVzcG9uc2UoeyBtb3ZlczogW10gfSwgcGFyc2Vycywgc3RkT3V0KTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IE1vdmVSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IHBhcnNlTW92ZVJlc3VsdCB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2UtbW92ZSc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBhc0FycmF5IH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gbW92ZVRhc2soZnJvbTogc3RyaW5nIHwgc3RyaW5nW10sIHRvOiBzdHJpbmcpOiBTdHJpbmdUYXNrPE1vdmVSZXN1bHQ+IHtcbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kczogWydtdicsICctdicsIC4uLmFzQXJyYXkoZnJvbSksIHRvXSxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIHBhcnNlcjogcGFyc2VNb3ZlUmVzdWx0LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFB1bGxSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IEdpdFJlc3BvbnNlRXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvZ2l0LXJlc3BvbnNlLWVycm9yJztcbmltcG9ydCB7IHBhcnNlUHVsbEVycm9yUmVzdWx0LCBwYXJzZVB1bGxSZXN1bHQgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlLXB1bGwnO1xuaW1wb3J0IHR5cGUgeyBNYXliZSwgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGJ1ZmZlclRvU3RyaW5nIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gcHVsbFRhc2soXG4gICByZW1vdGU6IE1heWJlPHN0cmluZz4sXG4gICBicmFuY2g6IE1heWJlPHN0cmluZz4sXG4gICBjdXN0b21BcmdzOiBzdHJpbmdbXVxuKTogU3RyaW5nVGFzazxQdWxsUmVzdWx0PiB7XG4gICBjb25zdCBjb21tYW5kczogc3RyaW5nW10gPSBbJ3B1bGwnLCAuLi5jdXN0b21BcmdzXTtcbiAgIGlmIChyZW1vdGUgJiYgYnJhbmNoKSB7XG4gICAgICBjb21tYW5kcy5zcGxpY2UoMSwgMCwgcmVtb3RlLCBicmFuY2gpO1xuICAgfVxuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXIoc3RkT3V0LCBzdGRFcnIpOiBQdWxsUmVzdWx0IHtcbiAgICAgICAgIHJldHVybiBwYXJzZVB1bGxSZXN1bHQoc3RkT3V0LCBzdGRFcnIpO1xuICAgICAgfSxcbiAgICAgIG9uRXJyb3IocmVzdWx0LCBfZXJyb3IsIF9kb25lLCBmYWlsKSB7XG4gICAgICAgICBjb25zdCBwdWxsRXJyb3IgPSBwYXJzZVB1bGxFcnJvclJlc3VsdChcbiAgICAgICAgICAgIGJ1ZmZlclRvU3RyaW5nKHJlc3VsdC5zdGRPdXQpLFxuICAgICAgICAgICAgYnVmZmVyVG9TdHJpbmcocmVzdWx0LnN0ZEVycilcbiAgICAgICAgICk7XG4gICAgICAgICBpZiAocHVsbEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFpbChuZXcgR2l0UmVzcG9uc2VFcnJvcihwdWxsRXJyb3IpKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgZmFpbChfZXJyb3IpO1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHsgZm9yRWFjaExpbmVXaXRoQ29udGVudCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBSZW1vdGVXaXRob3V0UmVmcyB7XG4gICBuYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVtb3RlV2l0aFJlZnMgZXh0ZW5kcyBSZW1vdGVXaXRob3V0UmVmcyB7XG4gICByZWZzOiB7XG4gICAgICBmZXRjaDogc3RyaW5nO1xuICAgICAgcHVzaDogc3RyaW5nO1xuICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlR2V0UmVtb3Rlcyh0ZXh0OiBzdHJpbmcpOiBSZW1vdGVXaXRob3V0UmVmc1tdIHtcbiAgIGNvbnN0IHJlbW90ZXM6IHsgW25hbWU6IHN0cmluZ106IFJlbW90ZVdpdGhvdXRSZWZzIH0gPSB7fTtcblxuICAgZm9yRWFjaCh0ZXh0LCAoW25hbWVdKSA9PiAocmVtb3Rlc1tuYW1lXSA9IHsgbmFtZSB9KSk7XG5cbiAgIHJldHVybiBPYmplY3QudmFsdWVzKHJlbW90ZXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VHZXRSZW1vdGVzVmVyYm9zZSh0ZXh0OiBzdHJpbmcpOiBSZW1vdGVXaXRoUmVmc1tdIHtcbiAgIGNvbnN0IHJlbW90ZXM6IHsgW25hbWU6IHN0cmluZ106IFJlbW90ZVdpdGhSZWZzIH0gPSB7fTtcblxuICAgZm9yRWFjaCh0ZXh0LCAoW25hbWUsIHVybCwgcHVycG9zZV0pID0+IHtcbiAgICAgIGlmICghT2JqZWN0Lmhhc093bihyZW1vdGVzLCBuYW1lKSkge1xuICAgICAgICAgcmVtb3Rlc1tuYW1lXSA9IHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICByZWZzOiB7IGZldGNoOiAnJywgcHVzaDogJycgfSxcbiAgICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChwdXJwb3NlICYmIHVybCkge1xuICAgICAgICAgcmVtb3Rlc1tuYW1lXS5yZWZzW3B1cnBvc2UucmVwbGFjZSgvW15hLXpdL2csICcnKSBhcyBrZXlvZiBSZW1vdGVXaXRoUmVmc1sncmVmcyddXSA9IHVybDtcbiAgICAgIH1cbiAgIH0pO1xuXG4gICByZXR1cm4gT2JqZWN0LnZhbHVlcyhyZW1vdGVzKTtcbn1cblxuZnVuY3Rpb24gZm9yRWFjaCh0ZXh0OiBzdHJpbmcsIGhhbmRsZXI6IChsaW5lOiBzdHJpbmdbXSkgPT4gdm9pZCkge1xuICAgZm9yRWFjaExpbmVXaXRoQ29udGVudCh0ZXh0LCAobGluZSkgPT4gaGFuZGxlcihsaW5lLnNwbGl0KC9cXHMrLykpKTtcbn1cbiIsICJpbXBvcnQge1xuICAgcGFyc2VHZXRSZW1vdGVzLFxuICAgcGFyc2VHZXRSZW1vdGVzVmVyYm9zZSxcbiAgIHR5cGUgUmVtb3RlV2l0aG91dFJlZnMsXG4gICB0eXBlIFJlbW90ZVdpdGhSZWZzLFxufSBmcm9tICcuLi9yZXNwb25zZXMvR2V0UmVtb3RlU3VtbWFyeSc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFJlbW90ZVRhc2soXG4gICByZW1vdGVOYW1lOiBzdHJpbmcsXG4gICByZW1vdGVSZXBvOiBzdHJpbmcsXG4gICBjdXN0b21BcmdzOiBzdHJpbmdbXVxuKTogU3RyaW5nVGFzazxzdHJpbmc+IHtcbiAgIHJldHVybiBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKFsncmVtb3RlJywgJ2FkZCcsIC4uLmN1c3RvbUFyZ3MsIHJlbW90ZU5hbWUsIHJlbW90ZVJlcG9dKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlbW90ZXNUYXNrKHZlcmJvc2U6IHRydWUpOiBTdHJpbmdUYXNrPFJlbW90ZVdpdGhSZWZzW10+O1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJlbW90ZXNUYXNrKHZlcmJvc2U6IGZhbHNlKTogU3RyaW5nVGFzazxSZW1vdGVXaXRob3V0UmVmc1tdPjtcbmV4cG9ydCBmdW5jdGlvbiBnZXRSZW1vdGVzVGFzayhcbiAgIHZlcmJvc2U6IGJvb2xlYW5cbik6IFN0cmluZ1Rhc2s8UmVtb3RlV2l0aFJlZnNbXSB8IFJlbW90ZVdpdGhvdXRSZWZzW10+IHtcbiAgIGNvbnN0IGNvbW1hbmRzID0gWydyZW1vdGUnXTtcbiAgIGlmICh2ZXJib3NlKSB7XG4gICAgICBjb21tYW5kcy5wdXNoKCctdicpO1xuICAgfVxuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXI6IHZlcmJvc2UgPyBwYXJzZUdldFJlbW90ZXNWZXJib3NlIDogcGFyc2VHZXRSZW1vdGVzLFxuICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpc3RSZW1vdGVzVGFzayhjdXN0b21BcmdzOiBzdHJpbmdbXSk6IFN0cmluZ1Rhc2s8c3RyaW5nPiB7XG4gICBjb25zdCBjb21tYW5kcyA9IFsuLi5jdXN0b21BcmdzXTtcbiAgIGlmIChjb21tYW5kc1swXSAhPT0gJ2xzLXJlbW90ZScpIHtcbiAgICAgIGNvbW1hbmRzLnVuc2hpZnQoJ2xzLXJlbW90ZScpO1xuICAgfVxuXG4gICByZXR1cm4gc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhjb21tYW5kcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdGVUYXNrKGN1c3RvbUFyZ3M6IHN0cmluZ1tdKTogU3RyaW5nVGFzazxzdHJpbmc+IHtcbiAgIGNvbnN0IGNvbW1hbmRzID0gWy4uLmN1c3RvbUFyZ3NdO1xuICAgaWYgKGNvbW1hbmRzWzBdICE9PSAncmVtb3RlJykge1xuICAgICAgY29tbWFuZHMudW5zaGlmdCgncmVtb3RlJyk7XG4gICB9XG5cbiAgIHJldHVybiBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKGNvbW1hbmRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVJlbW90ZVRhc2socmVtb3RlTmFtZTogc3RyaW5nKSB7XG4gICByZXR1cm4gc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhbJ3JlbW90ZScsICdyZW1vdmUnLCByZW1vdGVOYW1lXSk7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBMb2dPcHRpb25zLCBMb2dSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IGxvZ0Zvcm1hdEZyb21Db21tYW5kIH0gZnJvbSAnLi4vYXJncy9sb2ctZm9ybWF0JztcbmltcG9ydCB7IGNyZWF0ZUxpc3RMb2dTdW1tYXJ5UGFyc2VyIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZS1saXN0LWxvZy1zdW1tYXJ5JztcbmltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHZhbGlkYXRlTG9nRm9ybWF0Q29uZmlnIH0gZnJvbSAnLi9kaWZmJztcbmltcG9ydCB7IHBhcnNlTG9nT3B0aW9ucyB9IGZyb20gJy4vbG9nJztcbmltcG9ydCB0eXBlIHsgRW1wdHlUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXNoTGlzdFRhc2soXG4gICBvcHQ6IExvZ09wdGlvbnMgPSB7fSxcbiAgIGN1c3RvbUFyZ3M6IHN0cmluZ1tdXG4pOiBFbXB0eVRhc2sgfCBTdHJpbmdUYXNrPExvZ1Jlc3VsdD4ge1xuICAgY29uc3Qgb3B0aW9ucyA9IHBhcnNlTG9nT3B0aW9uczxhbnk+KG9wdCk7XG4gICBjb25zdCBjb21tYW5kcyA9IFsnc3Rhc2gnLCAnbGlzdCcsIC4uLm9wdGlvbnMuY29tbWFuZHMsIC4uLmN1c3RvbUFyZ3NdO1xuICAgY29uc3QgcGFyc2VyID0gY3JlYXRlTGlzdExvZ1N1bW1hcnlQYXJzZXIoXG4gICAgICBvcHRpb25zLnNwbGl0dGVyLFxuICAgICAgb3B0aW9ucy5maWVsZHMsXG4gICAgICBsb2dGb3JtYXRGcm9tQ29tbWFuZChjb21tYW5kcylcbiAgICk7XG5cbiAgIHJldHVybiAoXG4gICAgICB2YWxpZGF0ZUxvZ0Zvcm1hdENvbmZpZyhjb21tYW5kcykgfHwge1xuICAgICAgICAgY29tbWFuZHMsXG4gICAgICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICAgICBwYXJzZXIsXG4gICAgICB9XG4gICApO1xufVxuIiwgImltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkU3ViTW9kdWxlVGFzayhyZXBvOiBzdHJpbmcsIHBhdGg6IHN0cmluZyk6IFN0cmluZ1Rhc2s8c3RyaW5nPiB7XG4gICByZXR1cm4gc3ViTW9kdWxlVGFzayhbJ2FkZCcsIHJlcG8sIHBhdGhdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRTdWJNb2R1bGVUYXNrKGN1c3RvbUFyZ3M6IHN0cmluZ1tdKTogU3RyaW5nVGFzazxzdHJpbmc+IHtcbiAgIHJldHVybiBzdWJNb2R1bGVUYXNrKFsnaW5pdCcsIC4uLmN1c3RvbUFyZ3NdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1Yk1vZHVsZVRhc2soY3VzdG9tQXJnczogc3RyaW5nW10pOiBTdHJpbmdUYXNrPHN0cmluZz4ge1xuICAgY29uc3QgY29tbWFuZHMgPSBbLi4uY3VzdG9tQXJnc107XG4gICBpZiAoY29tbWFuZHNbMF0gIT09ICdzdWJtb2R1bGUnKSB7XG4gICAgICBjb21tYW5kcy51bnNoaWZ0KCdzdWJtb2R1bGUnKTtcbiAgIH1cblxuICAgcmV0dXJuIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soY29tbWFuZHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU3ViTW9kdWxlVGFzayhjdXN0b21BcmdzOiBzdHJpbmdbXSk6IFN0cmluZ1Rhc2s8c3RyaW5nPiB7XG4gICByZXR1cm4gc3ViTW9kdWxlVGFzayhbJ3VwZGF0ZScsIC4uLmN1c3RvbUFyZ3NdKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFRhZ1Jlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuXG5leHBvcnQgY2xhc3MgVGFnTGlzdCBpbXBsZW1lbnRzIFRhZ1Jlc3VsdCB7XG4gICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyByZWFkb25seSBhbGw6IHN0cmluZ1tdLFxuICAgICAgcHVibGljIHJlYWRvbmx5IGxhdGVzdDogc3RyaW5nIHwgdW5kZWZpbmVkXG4gICApIHt9XG59XG5cbmV4cG9ydCBjb25zdCBwYXJzZVRhZ0xpc3QgPSBmdW5jdGlvbiAoZGF0YTogc3RyaW5nLCBjdXN0b21Tb3J0ID0gZmFsc2UpIHtcbiAgIGNvbnN0IHRhZ3MgPSBkYXRhLnNwbGl0KCdcXG4nKS5tYXAodHJpbW1lZCkuZmlsdGVyKEJvb2xlYW4pO1xuXG4gICBpZiAoIWN1c3RvbVNvcnQpIHtcbiAgICAgIHRhZ3Muc29ydChmdW5jdGlvbiAodGFnQSwgdGFnQikge1xuICAgICAgICAgY29uc3QgcGFydHNBID0gdGFnQS5zcGxpdCgnLicpO1xuICAgICAgICAgY29uc3QgcGFydHNCID0gdGFnQi5zcGxpdCgnLicpO1xuXG4gICAgICAgICBpZiAocGFydHNBLmxlbmd0aCA9PT0gMSB8fCBwYXJ0c0IubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gc2luZ2xlU29ydGVkKHRvTnVtYmVyKHBhcnRzQVswXSksIHRvTnVtYmVyKHBhcnRzQlswXSkpO1xuICAgICAgICAgfVxuXG4gICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IE1hdGgubWF4KHBhcnRzQS5sZW5ndGgsIHBhcnRzQi5sZW5ndGgpOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkaWZmID0gc29ydGVkKHRvTnVtYmVyKHBhcnRzQVtpXSksIHRvTnVtYmVyKHBhcnRzQltpXSkpO1xuXG4gICAgICAgICAgICBpZiAoZGlmZikge1xuICAgICAgICAgICAgICAgcmV0dXJuIGRpZmY7XG4gICAgICAgICAgICB9XG4gICAgICAgICB9XG5cbiAgICAgICAgIHJldHVybiAwO1xuICAgICAgfSk7XG4gICB9XG5cbiAgIGNvbnN0IGxhdGVzdCA9IGN1c3RvbVNvcnQgPyB0YWdzWzBdIDogWy4uLnRhZ3NdLnJldmVyc2UoKS5maW5kKCh0YWcpID0+IHRhZy5pbmRleE9mKCcuJykgPj0gMCk7XG5cbiAgIHJldHVybiBuZXcgVGFnTGlzdCh0YWdzLCBsYXRlc3QpO1xufTtcblxuZnVuY3Rpb24gc2luZ2xlU29ydGVkKGE6IG51bWJlciwgYjogbnVtYmVyKTogbnVtYmVyIHtcbiAgIGNvbnN0IGFJc051bSA9IE51bWJlci5pc05hTihhKTtcbiAgIGNvbnN0IGJJc051bSA9IE51bWJlci5pc05hTihiKTtcblxuICAgaWYgKGFJc051bSAhPT0gYklzTnVtKSB7XG4gICAgICByZXR1cm4gYUlzTnVtID8gMSA6IC0xO1xuICAgfVxuXG4gICByZXR1cm4gYUlzTnVtID8gc29ydGVkKGEsIGIpIDogMDtcbn1cblxuZnVuY3Rpb24gc29ydGVkKGE6IG51bWJlciwgYjogbnVtYmVyKSB7XG4gICByZXR1cm4gYSA9PT0gYiA/IDAgOiBhID4gYiA/IDEgOiAtMTtcbn1cblxuZnVuY3Rpb24gdHJpbW1lZChpbnB1dDogc3RyaW5nKSB7XG4gICByZXR1cm4gaW5wdXQudHJpbSgpO1xufVxuXG5mdW5jdGlvbiB0b051bWJlcihpbnB1dDogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KGlucHV0LnJlcGxhY2UoL15cXEQrL2csICcnKSwgMTApIHx8IDA7XG4gICB9XG5cbiAgIHJldHVybiAwO1xufVxuIiwgImltcG9ydCB0eXBlIHsgVGFnUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBwYXJzZVRhZ0xpc3QgfSBmcm9tICcuLi9yZXNwb25zZXMvVGFnTGlzdCc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogVGFzayB1c2VkIGJ5IGBnaXQudGFnc2BcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRhZ0xpc3RUYXNrKGN1c3RvbUFyZ3M6IHN0cmluZ1tdID0gW10pOiBTdHJpbmdUYXNrPFRhZ1Jlc3VsdD4ge1xuICAgY29uc3QgaGFzQ3VzdG9tU29ydCA9IGN1c3RvbUFyZ3Muc29tZSgob3B0aW9uKSA9PiAvXi0tc29ydD0vLnRlc3Qob3B0aW9uKSk7XG5cbiAgIHJldHVybiB7XG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBjb21tYW5kczogWyd0YWcnLCAnLWwnLCAuLi5jdXN0b21BcmdzXSxcbiAgICAgIHBhcnNlcih0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgIHJldHVybiBwYXJzZVRhZ0xpc3QodGV4dCwgaGFzQ3VzdG9tU29ydCk7XG4gICAgICB9LFxuICAgfTtcbn1cblxuLyoqXG4gKiBUYXNrIHVzZWQgYnkgYGdpdC5hZGRUYWdgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRUYWdUYXNrKG5hbWU6IHN0cmluZyk6IFN0cmluZ1Rhc2s8eyBuYW1lOiBzdHJpbmcgfT4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIGNvbW1hbmRzOiBbJ3RhZycsIG5hbWVdLFxuICAgICAgcGFyc2VyKCkge1xuICAgICAgICAgcmV0dXJuIHsgbmFtZSB9O1xuICAgICAgfSxcbiAgIH07XG59XG5cbi8qKlxuICogVGFzayB1c2VkIGJ5IGBnaXQuYWRkVGFnYFxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkQW5ub3RhdGVkVGFnVGFzayhcbiAgIG5hbWU6IHN0cmluZyxcbiAgIHRhZ01lc3NhZ2U6IHN0cmluZ1xuKTogU3RyaW5nVGFzazx7IG5hbWU6IHN0cmluZyB9PiB7XG4gICByZXR1cm4ge1xuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgY29tbWFuZHM6IFsndGFnJywgJy1hJywgJy1tJywgdGFnTWVzc2FnZSwgbmFtZV0sXG4gICAgICBwYXJzZXIoKSB7XG4gICAgICAgICByZXR1cm4geyBuYW1lIH07XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQge0dpdEV4ZWN1dG9yfSBmcm9tIFwiLi9saWIvcnVubmVycy9naXQtZXhlY3V0b3JcIjtcblxuaW1wb3J0IHtTaW1wbGVHaXRBcGl9IGZyb20gXCIuL2xpYi9zaW1wbGUtZ2l0LWFwaVwiO1xuXG5pbXBvcnQge1NjaGVkdWxlcn0gZnJvbSBcIi4vbGliL3J1bm5lcnMvc2NoZWR1bGVyXCI7XG5cbmltcG9ydCB7XG4gICBjb25maWd1cmF0aW9uRXJyb3JUYXNrLFxuICAgc3RyYWlnaHRUaHJvdWdoQnVmZmVyVGFzayxcbiAgIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2tcbn0gZnJvbSBcIi4vbGliL3Rhc2tzL3Rhc2tcIjtcblxuaW1wb3J0IHtcbiAgIGFzQXJyYXksXG4gICBmaWx0ZXJBcnJheSxcbiAgIGZpbHRlclByaW1pdGl2ZXMsXG4gICBmaWx0ZXJTdHJpbmcsXG4gICBmaWx0ZXJTdHJpbmdPclN0cmluZ0FycmF5LFxuICAgZmlsdGVyVHlwZSxcbiAgIGdldFRyYWlsaW5nT3B0aW9ucyxcbiAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudCxcbiAgIHRyYWlsaW5nT3B0aW9uc0FyZ3VtZW50XG59IGZyb20gXCIuL2xpYi91dGlsc1wiO1xuXG5pbXBvcnQge2FwcGx5UGF0Y2hUYXNrfSBmcm9tIFwiLi9saWIvdGFza3MvYXBwbHktcGF0Y2hcIjtcblxuaW1wb3J0IHticmFuY2hMb2NhbFRhc2ssIGJyYW5jaFRhc2ssIGRlbGV0ZUJyYW5jaGVzVGFzaywgZGVsZXRlQnJhbmNoVGFza30gZnJvbSBcIi4vbGliL3Rhc2tzL2JyYW5jaFwiO1xuXG5pbXBvcnQge2NoZWNrSWdub3JlVGFza30gZnJvbSBcIi4vbGliL3Rhc2tzL2NoZWNrLWlnbm9yZVwiO1xuXG5pbXBvcnQge2NoZWNrSXNSZXBvVGFza30gZnJvbSBcIi4vbGliL3Rhc2tzL2NoZWNrLWlzLXJlcG9cIjtcblxuaW1wb3J0IHtjbGVhbldpdGhPcHRpb25zVGFzaywgaXNDbGVhbk9wdGlvbnNBcnJheX0gZnJvbSBcIi4vbGliL3Rhc2tzL2NsZWFuXCI7XG5cbmltcG9ydCB7ZGlmZlN1bW1hcnlUYXNrfSBmcm9tIFwiLi9saWIvdGFza3MvZGlmZlwiO1xuXG5pbXBvcnQge2ZldGNoVGFza30gZnJvbSBcIi4vbGliL3Rhc2tzL2ZldGNoXCI7XG5cbmltcG9ydCB7bW92ZVRhc2t9IGZyb20gXCIuL2xpYi90YXNrcy9tb3ZlXCI7XG5cbmltcG9ydCB7cHVsbFRhc2t9IGZyb20gXCIuL2xpYi90YXNrcy9wdWxsXCI7XG5cbmltcG9ydCB7cHVzaFRhZ3NUYXNrfSBmcm9tIFwiLi9saWIvdGFza3MvcHVzaFwiO1xuXG5pbXBvcnQge2FkZFJlbW90ZVRhc2ssIGdldFJlbW90ZXNUYXNrLCBsaXN0UmVtb3Rlc1Rhc2ssIHJlbW90ZVRhc2ssIHJlbW92ZVJlbW90ZVRhc2t9IGZyb20gXCIuL2xpYi90YXNrcy9yZW1vdGVcIjtcblxuaW1wb3J0IHtnZXRSZXNldE1vZGUsIHJlc2V0VGFza30gZnJvbSBcIi4vbGliL3Rhc2tzL3Jlc2V0XCI7XG5cbmltcG9ydCB7c3Rhc2hMaXN0VGFza30gZnJvbSBcIi4vbGliL3Rhc2tzL3N0YXNoLWxpc3RcIjtcblxuaW1wb3J0IHthZGRTdWJNb2R1bGVUYXNrLCBpbml0U3ViTW9kdWxlVGFzaywgc3ViTW9kdWxlVGFzaywgdXBkYXRlU3ViTW9kdWxlVGFza30gZnJvbSBcIi4vbGliL3Rhc2tzL3N1Yi1tb2R1bGVcIjtcblxuaW1wb3J0IHthZGRBbm5vdGF0ZWRUYWdUYXNrLCBhZGRUYWdUYXNrLCB0YWdMaXN0VGFza30gZnJvbSBcIi4vbGliL3Rhc2tzL3RhZ1wiO1xuXG5mdW5jdGlvbiBHaXQob3B0aW9ucywgcGx1Z2lucykge1xuICAgdGhpcy5fcGx1Z2lucyA9IHBsdWdpbnM7XG4gICB0aGlzLl9leGVjdXRvciA9IG5ldyBHaXRFeGVjdXRvcihcbiAgICAgIG9wdGlvbnMuYmFzZURpcixcbiAgICAgIG5ldyBTY2hlZHVsZXIob3B0aW9ucy5tYXhDb25jdXJyZW50UHJvY2Vzc2VzKSxcbiAgICAgIHBsdWdpbnNcbiAgICk7XG5cbiAgIHRoaXMuX3RyaW1tZWQgPSBvcHRpb25zLnRyaW1tZWQ7XG59XG5cbihHaXQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTaW1wbGVHaXRBcGkucHJvdG90eXBlKSkuY29uc3RydWN0b3IgPSBHaXQ7XG5cbi8qKlxuICogU2V0cyB0aGUgcGF0aCB0byBhIGN1c3RvbSBnaXQgYmluYXJ5LCBzaG91bGQgZWl0aGVyIGJlIGBnaXRgIHdoZW4gdGhlcmUgaXMgYW4gaW5zdGFsbGF0aW9uIG9mIGdpdCBhdmFpbGFibGUgb25cbiAqIHRoZSBzeXN0ZW0gcGF0aCwgb3IgYSBmdWxseSBxdWFsaWZpZWQgcGF0aCB0byB0aGUgZXhlY3V0YWJsZS5cbiAqL1xuR2l0LnByb3RvdHlwZS5jdXN0b21CaW5hcnkgPSBmdW5jdGlvbiAoY29tbWFuZCkge1xuICAgdGhpcy5fcGx1Z2lucy5yZWNvbmZpZ3VyZSgnYmluYXJ5JywgY29tbWFuZCk7XG4gICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyBhbiBlbnZpcm9ubWVudCB2YXJpYWJsZSBmb3IgdGhlIHNwYXduZWQgY2hpbGQgcHJvY2VzcywgZWl0aGVyIHN1cHBseSBib3RoIGEgbmFtZSBhbmQgdmFsdWUgYXMgc3RyaW5ncyBvclxuICogYSBzaW5nbGUgb2JqZWN0IHRvIGVudGlyZWx5IHJlcGxhY2UgdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdH0gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IFt2YWx1ZV1cbiAqIEByZXR1cm5zIHtHaXR9XG4gKi9cbkdpdC5wcm90b3R5cGUuZW52ID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMuX2V4ZWN1dG9yLmVudiA9IG5hbWU7XG4gICB9IGVsc2Uge1xuICAgICAgKHRoaXMuX2V4ZWN1dG9yLmVudiA9IHRoaXMuX2V4ZWN1dG9yLmVudiB8fCB7fSlbbmFtZV0gPSB2YWx1ZTtcbiAgIH1cblxuICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIExpc3QgdGhlIHN0YXNoKHMpIG9mIHRoZSBsb2NhbCByZXBvXG4gKi9cbkdpdC5wcm90b3R5cGUuc3Rhc2hMaXN0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgc3Rhc2hMaXN0VGFzayhcbiAgICAgICAgIHRyYWlsaW5nT3B0aW9uc0FyZ3VtZW50KGFyZ3VtZW50cykgfHwge30sXG4gICAgICAgICAoZmlsdGVyQXJyYXkob3B0aW9ucykgJiYgb3B0aW9ucykgfHwgW11cbiAgICAgICksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICogTW92ZXMgb25lIG9yIG1vcmUgZmlsZXMgdG8gYSBuZXcgZGVzdGluYXRpb24uXG4gKlxuICogQHNlZSBodHRwczovL2dpdC1zY20uY29tL2RvY3MvZ2l0LW12XG4gKlxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IGZyb21cbiAqIEBwYXJhbSB7c3RyaW5nfSB0b1xuICovXG5HaXQucHJvdG90eXBlLm12ID0gZnVuY3Rpb24gKGZyb20sIHRvKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhtb3ZlVGFzayhmcm9tLCB0byksIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpKTtcbn07XG5cbi8qKlxuICogSW50ZXJuYWxseSB1c2VzIHB1bGwgYW5kIHRhZ3MgdG8gZ2V0IHRoZSBsaXN0IG9mIHRhZ3MgdGhlbiBjaGVja3Mgb3V0IHRoZSBsYXRlc3QgdGFnLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFt0aGVuXVxuICovXG5HaXQucHJvdG90eXBlLmNoZWNrb3V0TGF0ZXN0VGFnID0gZnVuY3Rpb24gKHRoZW4pIHtcbiAgIHZhciBnaXQgPSB0aGlzO1xuICAgcmV0dXJuIHRoaXMucHVsbChmdW5jdGlvbiAoKSB7XG4gICAgICBnaXQudGFncyhmdW5jdGlvbiAoZXJyLCB0YWdzKSB7XG4gICAgICAgICBnaXQuY2hlY2tvdXQodGFncy5sYXRlc3QsIHRoZW4pO1xuICAgICAgfSk7XG4gICB9KTtcbn07XG5cbi8qKlxuICogUHVsbCB0aGUgdXBkYXRlZCBjb250ZW50cyBvZiB0aGUgY3VycmVudCByZXBvXG4gKi9cbkdpdC5wcm90b3R5cGUucHVsbCA9IGZ1bmN0aW9uIChyZW1vdGUsIGJyYW5jaCwgb3B0aW9ucywgdGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBwdWxsVGFzayhcbiAgICAgICAgIGZpbHRlclR5cGUocmVtb3RlLCBmaWx0ZXJTdHJpbmcpLFxuICAgICAgICAgZmlsdGVyVHlwZShicmFuY2gsIGZpbHRlclN0cmluZyksXG4gICAgICAgICBnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKVxuICAgICAgKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKiBGZXRjaCB0aGUgdXBkYXRlZCBjb250ZW50cyBvZiB0aGUgY3VycmVudCByZXBvLlxuICpcbiAqIEBleGFtcGxlXG4gKiAgIC5mZXRjaCgndXBzdHJlYW0nLCAnbWFzdGVyJykgLy8gZmV0Y2hlcyBmcm9tIG1hc3RlciBvbiByZW1vdGUgbmFtZWQgdXBzdHJlYW1cbiAqICAgLmZldGNoKGZ1bmN0aW9uICgpIHt9KSAvLyBydW5zIGZldGNoIGFnYWluc3QgZGVmYXVsdCByZW1vdGUgYW5kIGJyYW5jaCBhbmQgY2FsbHMgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gW3JlbW90ZV1cbiAqIEBwYXJhbSB7c3RyaW5nfSBbYnJhbmNoXVxuICovXG5HaXQucHJvdG90eXBlLmZldGNoID0gZnVuY3Rpb24gKHJlbW90ZSwgYnJhbmNoKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIGZldGNoVGFzayhcbiAgICAgICAgIGZpbHRlclR5cGUocmVtb3RlLCBmaWx0ZXJTdHJpbmcpLFxuICAgICAgICAgZmlsdGVyVHlwZShicmFuY2gsIGZpbHRlclN0cmluZyksXG4gICAgICAgICBnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKVxuICAgICAgKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKiBMaXN0IGFsbCB0YWdzLiBXaGVuIHVzaW5nIGdpdCAyLjcuMCBvciBhYm92ZSwgaW5jbHVkZSBhbiBvcHRpb25zIG9iamVjdCB3aXRoIGBcIi0tc29ydFwiOiBcInByb3BlcnR5LW5hbWVcImAgdG9cbiAqIHNvcnQgdGhlIHRhZ3MgYnkgdGhhdCBwcm9wZXJ0eSBpbnN0ZWFkIG9mIHVzaW5nIHRoZSBkZWZhdWx0IHNlbWFudGljIHZlcnNpb25pbmcgc29ydC5cbiAqXG4gKiBOb3RlLCBzdXBwbHlpbmcgdGhpcyBvcHRpb24gd2hlbiBpdCBpcyBub3Qgc3VwcG9ydGVkIGJ5IHlvdXIgR2l0IHZlcnNpb24gd2lsbCBjYXVzZSB0aGUgb3BlcmF0aW9uIHRvIGZhaWwuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3RoZW5dXG4gKi9cbkdpdC5wcm90b3R5cGUudGFncyA9IGZ1bmN0aW9uIChvcHRpb25zLCB0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIHRhZ0xpc3RUYXNrKGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKiBSZWJhc2VzIHRoZSBjdXJyZW50IHdvcmtpbmcgY29weS4gT3B0aW9ucyBjYW4gYmUgc3VwcGxpZWQgZWl0aGVyIGFzIGFuIGFycmF5IG9mIHN0cmluZyBwYXJhbWV0ZXJzXG4gKiB0byBiZSBzZW50IHRvIHRoZSBgZ2l0IHJlYmFzZWAgY29tbWFuZCwgb3IgYSBzdGFuZGFyZCBvcHRpb25zIG9iamVjdC5cbiAqL1xuR2l0LnByb3RvdHlwZS5yZWJhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soWydyZWJhc2UnLCAuLi5nZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKV0pLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG4vKipcbiAqIFJlc2V0IGEgcmVwb1xuICovXG5HaXQucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKG1vZGUpIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgcmVzZXRUYXNrKGdldFJlc2V0TW9kZShtb2RlKSwgZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cykpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG4vKipcbiAqIFJldmVydCBvbmUgb3IgbW9yZSBjb21taXRzIGluIHRoZSBsb2NhbCB3b3JraW5nIGNvcHlcbiAqL1xuR2l0LnByb3RvdHlwZS5yZXZlcnQgPSBmdW5jdGlvbiAoY29tbWl0KSB7XG4gICBjb25zdCBuZXh0ID0gdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cyk7XG5cbiAgIGlmICh0eXBlb2YgY29tbWl0ICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soY29uZmlndXJhdGlvbkVycm9yVGFzaygnQ29tbWl0IG11c3QgYmUgYSBzdHJpbmcnKSwgbmV4dCk7XG4gICB9XG5cbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhbJ3JldmVydCcsIC4uLmdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMsIDAsIHRydWUpLCBjb21taXRdKSxcbiAgICAgIG5leHRcbiAgICk7XG59O1xuXG4vKipcbiAqIEFkZCBhIGxpZ2h0d2VpZ2h0IHRhZyB0byB0aGUgaGVhZCBvZiB0aGUgY3VycmVudCBicmFuY2hcbiAqL1xuR2l0LnByb3RvdHlwZS5hZGRUYWcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgY29uc3QgdGFzayA9XG4gICAgICB0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZydcbiAgICAgICAgID8gYWRkVGFnVGFzayhuYW1lKVxuICAgICAgICAgOiBjb25maWd1cmF0aW9uRXJyb3JUYXNrKCdHaXQuYWRkVGFnIHJlcXVpcmVzIGEgdGFnIG5hbWUnKTtcblxuICAgcmV0dXJuIHRoaXMuX3J1blRhc2sodGFzaywgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cykpO1xufTtcblxuLyoqXG4gKiBBZGQgYW4gYW5ub3RhdGVkIHRhZyB0byB0aGUgaGVhZCBvZiB0aGUgY3VycmVudCBicmFuY2hcbiAqL1xuR2l0LnByb3RvdHlwZS5hZGRBbm5vdGF0ZWRUYWcgPSBmdW5jdGlvbiAodGFnTmFtZSwgdGFnTWVzc2FnZSkge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBhZGRBbm5vdGF0ZWRUYWdUYXNrKHRhZ05hbWUsIHRhZ01lc3NhZ2UpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG4vKipcbiAqIERlbGV0ZSBhIGxvY2FsIGJyYW5jaFxuICovXG5HaXQucHJvdG90eXBlLmRlbGV0ZUxvY2FsQnJhbmNoID0gZnVuY3Rpb24gKGJyYW5jaE5hbWUsIGZvcmNlRGVsZXRlLCB0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIGRlbGV0ZUJyYW5jaFRhc2soYnJhbmNoTmFtZSwgdHlwZW9mIGZvcmNlRGVsZXRlID09PSAnYm9vbGVhbicgPyBmb3JjZURlbGV0ZSA6IGZhbHNlKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKiBEZWxldGUgb25lIG9yIG1vcmUgbG9jYWwgYnJhbmNoZXNcbiAqL1xuR2l0LnByb3RvdHlwZS5kZWxldGVMb2NhbEJyYW5jaGVzID0gZnVuY3Rpb24gKGJyYW5jaE5hbWVzLCBmb3JjZURlbGV0ZSwgdGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBkZWxldGVCcmFuY2hlc1Rhc2soYnJhbmNoTmFtZXMsIHR5cGVvZiBmb3JjZURlbGV0ZSA9PT0gJ2Jvb2xlYW4nID8gZm9yY2VEZWxldGUgOiBmYWxzZSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICogTGlzdCBhbGwgYnJhbmNoZXNcbiAqXG4gKiBAcGFyYW0ge09iamVjdCB8IHN0cmluZ1tdfSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFt0aGVuXVxuICovXG5HaXQucHJvdG90eXBlLmJyYW5jaCA9IGZ1bmN0aW9uIChvcHRpb25zLCB0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIGJyYW5jaFRhc2soZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cykpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG4vKipcbiAqIFJldHVybiBsaXN0IG9mIGxvY2FsIGJyYW5jaGVzXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3RoZW5dXG4gKi9cbkdpdC5wcm90b3R5cGUuYnJhbmNoTG9jYWwgPSBmdW5jdGlvbiAodGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soYnJhbmNoTG9jYWxUYXNrKCksIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpKTtcbn07XG5cbi8qKlxuICogRXhlY3V0ZXMgYW55IGNvbW1hbmQgYWdhaW5zdCB0aGUgZ2l0IGJpbmFyeS5cbiAqL1xuR2l0LnByb3RvdHlwZS5yYXcgPSBmdW5jdGlvbiAoY29tbWFuZHMpIHtcbiAgIGNvbnN0IGNyZWF0ZVJlc3RDb21tYW5kcyA9ICFBcnJheS5pc0FycmF5KGNvbW1hbmRzKTtcbiAgIGNvbnN0IGNvbW1hbmQgPSBbXS5zbGljZS5jYWxsKGNyZWF0ZVJlc3RDb21tYW5kcyA/IGFyZ3VtZW50cyA6IGNvbW1hbmRzLCAwKTtcblxuICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21tYW5kLmxlbmd0aCAmJiBjcmVhdGVSZXN0Q29tbWFuZHM7IGkrKykge1xuICAgICAgaWYgKCFmaWx0ZXJQcmltaXRpdmVzKGNvbW1hbmRbaV0pKSB7XG4gICAgICAgICBjb21tYW5kLnNwbGljZShpLCBjb21tYW5kLmxlbmd0aCAtIGkpO1xuICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICB9XG5cbiAgIGNvbW1hbmQucHVzaCguLi5nZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzLCAwLCB0cnVlKSk7XG5cbiAgIHZhciBuZXh0ID0gdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cyk7XG5cbiAgIGlmICghY29tbWFuZC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgY29uZmlndXJhdGlvbkVycm9yVGFzaygnUmF3OiBtdXN0IHN1cHBseSBvbmUgb3IgbW9yZSBjb21tYW5kIHRvIGV4ZWN1dGUnKSxcbiAgICAgICAgIG5leHRcbiAgICAgICk7XG4gICB9XG5cbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soY29tbWFuZCwgdGhpcy5fdHJpbW1lZCksIG5leHQpO1xufTtcblxuR2l0LnByb3RvdHlwZS5zdWJtb2R1bGVBZGQgPSBmdW5jdGlvbiAocmVwbywgcGF0aCwgdGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soYWRkU3ViTW9kdWxlVGFzayhyZXBvLCBwYXRoKSwgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cykpO1xufTtcblxuR2l0LnByb3RvdHlwZS5zdWJtb2R1bGVVcGRhdGUgPSBmdW5jdGlvbiAoYXJncywgdGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICB1cGRhdGVTdWJNb2R1bGVUYXNrKGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMsIHRydWUpKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuR2l0LnByb3RvdHlwZS5zdWJtb2R1bGVJbml0ID0gZnVuY3Rpb24gKGFyZ3MsIHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgaW5pdFN1Yk1vZHVsZVRhc2soZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cywgdHJ1ZSkpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG5HaXQucHJvdG90eXBlLnN1Yk1vZHVsZSA9IGZ1bmN0aW9uIChvcHRpb25zLCB0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIHN1Yk1vZHVsZVRhc2soZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cykpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG5HaXQucHJvdG90eXBlLmxpc3RSZW1vdGUgPSBmdW5jdGlvbiAoKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIGxpc3RSZW1vdGVzVGFzayhnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICogQWRkcyBhIHJlbW90ZSB0byB0aGUgbGlzdCBvZiByZW1vdGVzLlxuICovXG5HaXQucHJvdG90eXBlLmFkZFJlbW90ZSA9IGZ1bmN0aW9uIChyZW1vdGVOYW1lLCByZW1vdGVSZXBvLCB0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIGFkZFJlbW90ZVRhc2socmVtb3RlTmFtZSwgcmVtb3RlUmVwbywgZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cykpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgYW4gZW50cnkgYnkgbmFtZSBmcm9tIHRoZSBsaXN0IG9mIHJlbW90ZXMuXG4gKi9cbkdpdC5wcm90b3R5cGUucmVtb3ZlUmVtb3RlID0gZnVuY3Rpb24gKHJlbW90ZU5hbWUsIHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKHJlbW92ZVJlbW90ZVRhc2socmVtb3RlTmFtZSksIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpKTtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgY3VycmVudGx5IGF2YWlsYWJsZSByZW1vdGVzLCBzZXR0aW5nIHRoZSBvcHRpb25hbCB2ZXJib3NlIGFyZ3VtZW50IHRvIHRydWUgaW5jbHVkZXMgYWRkaXRpb25hbFxuICogZGV0YWlsIG9uIHRoZSByZW1vdGVzIHRoZW1zZWx2ZXMuXG4gKi9cbkdpdC5wcm90b3R5cGUuZ2V0UmVtb3RlcyA9IGZ1bmN0aW9uICh2ZXJib3NlLCB0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhnZXRSZW1vdGVzVGFzayh2ZXJib3NlID09PSB0cnVlKSwgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cykpO1xufTtcblxuLyoqXG4gKiBDYWxsIGFueSBgZ2l0IHJlbW90ZWAgZnVuY3Rpb24gd2l0aCBhcmd1bWVudHMgcGFzc2VkIGFzIGFuIGFycmF5IG9mIHN0cmluZ3MuXG4gKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gb3B0aW9uc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gW3RoZW5dXG4gKi9cbkdpdC5wcm90b3R5cGUucmVtb3RlID0gZnVuY3Rpb24gKG9wdGlvbnMsIHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgcmVtb3RlVGFzayhnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICogQ2FsbCBhbnkgYGdpdCB0YWdgIGZ1bmN0aW9uIHdpdGggYXJndW1lbnRzIHBhc3NlZCBhcyBhbiBhcnJheSBvZiBzdHJpbmdzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nW119IG9wdGlvbnNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFt0aGVuXVxuICovXG5HaXQucHJvdG90eXBlLnRhZyA9IGZ1bmN0aW9uIChvcHRpb25zLCB0aGVuKSB7XG4gICBjb25zdCBjb21tYW5kID0gZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cyk7XG5cbiAgIGlmIChjb21tYW5kWzBdICE9PSAndGFnJykge1xuICAgICAgY29tbWFuZC51bnNoaWZ0KCd0YWcnKTtcbiAgIH1cblxuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhjb21tYW5kKSwgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cykpO1xufTtcblxuLyoqXG4gKiBVcGRhdGVzIHJlcG9zaXRvcnkgc2VydmVyIGluZm9cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdGhlbl1cbiAqL1xuR2l0LnByb3RvdHlwZS51cGRhdGVTZXJ2ZXJJbmZvID0gZnVuY3Rpb24gKHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhbJ3VwZGF0ZS1zZXJ2ZXItaW5mbyddKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKiBQdXNoZXMgdGhlIGN1cnJlbnQgdGFnIGNoYW5nZXMgdG8gYSByZW1vdGUgd2hpY2ggY2FuIGJlIGVpdGhlciBhIFVSTCBvciBuYW1lZCByZW1vdGUuIFdoZW4gbm90IHNwZWNpZmllZCB1c2VzIHRoZVxuICogZGVmYXVsdCBjb25maWd1cmVkIHJlbW90ZSBzcGVjLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBbcmVtb3RlXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3RoZW5dXG4gKi9cbkdpdC5wcm90b3R5cGUucHVzaFRhZ3MgPSBmdW5jdGlvbiAocmVtb3RlLCB0aGVuKSB7XG4gICBjb25zdCB0YXNrID0gcHVzaFRhZ3NUYXNrKFxuICAgICAgeyByZW1vdGU6IGZpbHRlclR5cGUocmVtb3RlLCBmaWx0ZXJTdHJpbmcpIH0sXG4gICAgICBnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKVxuICAgKTtcblxuICAgcmV0dXJuIHRoaXMuX3J1blRhc2sodGFzaywgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cykpO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBuYW1lZCBmaWxlcyBmcm9tIHNvdXJjZSBjb250cm9sLlxuICovXG5HaXQucHJvdG90eXBlLnJtID0gZnVuY3Rpb24gKGZpbGVzKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soWydybScsICctZicsIC4uLmFzQXJyYXkoZmlsZXMpXSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyB0aGUgbmFtZWQgZmlsZXMgZnJvbSBzb3VyY2UgY29udHJvbCBidXQga2VlcHMgdGhlbSBvbiBkaXNrIHJhdGhlciB0aGFuIGRlbGV0aW5nIHRoZW0gZW50aXJlbHkuIFRvXG4gKiBjb21wbGV0ZWx5IHJlbW92ZSB0aGUgZmlsZXMsIHVzZSBgcm1gLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBmaWxlc1xuICovXG5HaXQucHJvdG90eXBlLnJtS2VlcExvY2FsID0gZnVuY3Rpb24gKGZpbGVzKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soWydybScsICctLWNhY2hlZCcsIC4uLmFzQXJyYXkoZmlsZXMpXSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIGxpc3Qgb2Ygb2JqZWN0cyBpbiBhIHRyZWUgYmFzZWQgb24gY29tbWl0IGhhc2guIFBhc3NpbmcgaW4gYW4gb2JqZWN0IGhhc2ggcmV0dXJucyB0aGUgb2JqZWN0J3MgY29udGVudCxcbiAqIHNpemUsIGFuZCB0eXBlLlxuICpcbiAqIFBhc3NpbmcgXCItcFwiIHdpbGwgaW5zdHJ1Y3QgY2F0LWZpbGUgdG8gZGV0ZXJtaW5lIHRoZSBvYmplY3QgdHlwZSwgYW5kIGRpc3BsYXkgaXRzIGZvcm1hdHRlZCBjb250ZW50cy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFt0aGVuXVxuICovXG5HaXQucHJvdG90eXBlLmNhdEZpbGUgPSBmdW5jdGlvbiAob3B0aW9ucywgdGhlbikge1xuICAgcmV0dXJuIHRoaXMuX2NhdEZpbGUoJ3V0Zi04JywgYXJndW1lbnRzKTtcbn07XG5cbkdpdC5wcm90b3R5cGUuYmluYXJ5Q2F0RmlsZSA9IGZ1bmN0aW9uICgpIHtcbiAgIHJldHVybiB0aGlzLl9jYXRGaWxlKCdidWZmZXInLCBhcmd1bWVudHMpO1xufTtcblxuR2l0LnByb3RvdHlwZS5fY2F0RmlsZSA9IGZ1bmN0aW9uIChmb3JtYXQsIGFyZ3MpIHtcbiAgIHZhciBoYW5kbGVyID0gdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3MpO1xuICAgdmFyIGNvbW1hbmQgPSBbJ2NhdC1maWxlJ107XG4gICB2YXIgb3B0aW9ucyA9IGFyZ3NbMF07XG5cbiAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgY29uZmlndXJhdGlvbkVycm9yVGFzaygnR2l0LmNhdEZpbGU6IG9wdGlvbnMgbXVzdCBiZSBzdXBwbGllZCBhcyBhbiBhcnJheSBvZiBzdHJpbmdzJyksXG4gICAgICAgICBoYW5kbGVyXG4gICAgICApO1xuICAgfVxuXG4gICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgY29tbWFuZC5wdXNoLmFwcGx5KGNvbW1hbmQsIG9wdGlvbnMpO1xuICAgfVxuXG4gICBjb25zdCB0YXNrID1cbiAgICAgIGZvcm1hdCA9PT0gJ2J1ZmZlcicgPyBzdHJhaWdodFRocm91Z2hCdWZmZXJUYXNrKGNvbW1hbmQpIDogc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhjb21tYW5kKTtcblxuICAgcmV0dXJuIHRoaXMuX3J1blRhc2sodGFzaywgaGFuZGxlcik7XG59O1xuXG5HaXQucHJvdG90eXBlLmRpZmYgPSBmdW5jdGlvbiAob3B0aW9ucywgdGhlbikge1xuICAgY29uc3QgdGFzayA9IGZpbHRlclN0cmluZyhvcHRpb25zKVxuICAgICAgPyBjb25maWd1cmF0aW9uRXJyb3JUYXNrKFxuICAgICAgICAgICAnZ2l0LmRpZmY6IHN1cHBseWluZyBvcHRpb25zIGFzIGEgc2luZ2xlIHN0cmluZyBpcyBubyBsb25nZXIgc3VwcG9ydGVkLCBzd2l0Y2ggdG8gYW4gYXJyYXkgb2Ygc3RyaW5ncydcbiAgICAgICAgKVxuICAgICAgOiBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKFsnZGlmZicsIC4uLmdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpXSk7XG5cbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKHRhc2ssIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpKTtcbn07XG5cbkdpdC5wcm90b3R5cGUuZGlmZlN1bW1hcnkgPSBmdW5jdGlvbiAoKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIGRpZmZTdW1tYXJ5VGFzayhnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzLCAxKSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbkdpdC5wcm90b3R5cGUuYXBwbHlQYXRjaCA9IGZ1bmN0aW9uIChwYXRjaGVzKSB7XG4gICBjb25zdCB0YXNrID0gIWZpbHRlclN0cmluZ09yU3RyaW5nQXJyYXkocGF0Y2hlcylcbiAgICAgID8gY29uZmlndXJhdGlvbkVycm9yVGFzayhcbiAgICAgICAgICAgYGdpdC5hcHBseVBhdGNoIHJlcXVpcmVzIG9uZSBvciBtb3JlIHN0cmluZyBwYXRjaGVzIGFzIHRoZSBmaXJzdCBhcmd1bWVudGBcbiAgICAgICAgKVxuICAgICAgOiBhcHBseVBhdGNoVGFzayhhc0FycmF5KHBhdGNoZXMpLCBnZXRUcmFpbGluZ09wdGlvbnMoW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKSk7XG5cbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKHRhc2ssIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpKTtcbn07XG5cbkdpdC5wcm90b3R5cGUucmV2cGFyc2UgPSBmdW5jdGlvbiAoKSB7XG4gICBjb25zdCBjb21tYW5kcyA9IFsncmV2LXBhcnNlJywgLi4uZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cywgdHJ1ZSldO1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKGNvbW1hbmRzLCB0cnVlKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKi9cbkdpdC5wcm90b3R5cGUuY2xlYW4gPSBmdW5jdGlvbiAobW9kZSwgb3B0aW9ucywgdGhlbikge1xuICAgY29uc3QgdXNpbmdDbGVhbk9wdGlvbnNBcnJheSA9IGlzQ2xlYW5PcHRpb25zQXJyYXkobW9kZSk7XG4gICBjb25zdCBjbGVhbk1vZGUgPVxuICAgICAgKHVzaW5nQ2xlYW5PcHRpb25zQXJyYXkgJiYgbW9kZS5qb2luKCcnKSkgfHwgZmlsdGVyVHlwZShtb2RlLCBmaWx0ZXJTdHJpbmcpIHx8ICcnO1xuICAgY29uc3QgY3VzdG9tQXJncyA9IGdldFRyYWlsaW5nT3B0aW9ucyhbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgdXNpbmdDbGVhbk9wdGlvbnNBcnJheSA/IDEgOiAwKSk7XG5cbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgY2xlYW5XaXRoT3B0aW9uc1Rhc2soY2xlYW5Nb2RlLCBjdXN0b21BcmdzKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuR2l0LnByb3RvdHlwZS5leGVjID0gZnVuY3Rpb24gKHRoZW4pIHtcbiAgIGNvbnN0IHRhc2sgPSB7XG4gICAgICBjb21tYW5kczogW10sXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXIoKSB7XG4gICAgICAgICBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoZW4oKTtcbiAgICAgICAgIH1cbiAgICAgIH0sXG4gICB9O1xuXG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayh0YXNrKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBwYXRobmFtZSBvciBwYXRobmFtZXMgYXJlIGV4Y2x1ZGVkIGJ5IC5naXRpZ25vcmVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gcGF0aG5hbWVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdGhlbl1cbiAqL1xuR2l0LnByb3RvdHlwZS5jaGVja0lnbm9yZSA9IGZ1bmN0aW9uIChwYXRobmFtZXMsIHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgY2hlY2tJZ25vcmVUYXNrKGFzQXJyYXkoZmlsdGVyVHlwZShwYXRobmFtZXMsIGZpbHRlclN0cmluZ09yU3RyaW5nQXJyYXksIFtdKSkpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG5HaXQucHJvdG90eXBlLmNoZWNrSXNSZXBvID0gZnVuY3Rpb24gKGNoZWNrVHlwZSwgdGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBjaGVja0lzUmVwb1Rhc2soZmlsdGVyVHlwZShjaGVja1R5cGUsIGZpbHRlclN0cmluZykpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHaXQ7XG4iLCAiaW1wb3J0IHsgR2l0UGx1Z2luRXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvZ2l0LXBsdWdpbi1lcnJvcic7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdE9wdGlvbnMgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdFBsdWdpbiB9IGZyb20gJy4vc2ltcGxlLWdpdC1wbHVnaW4nO1xuXG5leHBvcnQgZnVuY3Rpb24gYWJvcnRQbHVnaW4oc2lnbmFsOiBTaW1wbGVHaXRPcHRpb25zWydhYm9ydCddKSB7XG4gICBpZiAoIXNpZ25hbCkge1xuICAgICAgcmV0dXJuO1xuICAgfVxuXG4gICBjb25zdCBvblNwYXduQWZ0ZXI6IFNpbXBsZUdpdFBsdWdpbjwnc3Bhd24uYWZ0ZXInPiA9IHtcbiAgICAgIHR5cGU6ICdzcGF3bi5hZnRlcicsXG4gICAgICBhY3Rpb24oX2RhdGEsIGNvbnRleHQpIHtcbiAgICAgICAgIGZ1bmN0aW9uIGtpbGwoKSB7XG4gICAgICAgICAgICBjb250ZXh0LmtpbGwobmV3IEdpdFBsdWdpbkVycm9yKHVuZGVmaW5lZCwgJ2Fib3J0JywgJ0Fib3J0IHNpZ25hbCByZWNlaXZlZCcpKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywga2lsbCk7XG5cbiAgICAgICAgIGNvbnRleHQuc3Bhd25lZC5vbignY2xvc2UnLCAoKSA9PiBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBraWxsKSk7XG4gICAgICB9LFxuICAgfTtcblxuICAgY29uc3Qgb25TcGF3bkJlZm9yZTogU2ltcGxlR2l0UGx1Z2luPCdzcGF3bi5iZWZvcmUnPiA9IHtcbiAgICAgIHR5cGU6ICdzcGF3bi5iZWZvcmUnLFxuICAgICAgYWN0aW9uKF9kYXRhLCBjb250ZXh0KSB7XG4gICAgICAgICBpZiAoc2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgICAgICAgIGNvbnRleHQua2lsbChuZXcgR2l0UGx1Z2luRXJyb3IodW5kZWZpbmVkLCAnYWJvcnQnLCAnQWJvcnQgYWxyZWFkeSBzaWduYWxlZCcpKTtcbiAgICAgICAgIH1cbiAgICAgIH0sXG4gICB9O1xuXG4gICByZXR1cm4gW29uU3Bhd25CZWZvcmUsIG9uU3Bhd25BZnRlcl07XG59XG4iLCAiaW1wb3J0IHsgaXNHaXRFbnZLZXkgfSBmcm9tICdAc2ltcGxlLWdpdC9hcmd2LXBhcnNlcic7XG5cbmltcG9ydCB7IEdpdFBsdWdpbkVycm9yIH0gZnJvbSAnLi4vZXJyb3JzL2dpdC1wbHVnaW4tZXJyb3InO1xuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSAnLi4vZ2l0LWxvZ2dlcic7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdFBsdWdpbiB9IGZyb20gJy4vc2ltcGxlLWdpdC1wbHVnaW4nO1xuXG5jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoJycsICdwbHVnaW46YWxsb3dFbnZpcm9ubWVudCcpO1xuXG5leHBvcnQgZnVuY3Rpb24gYWxsb3dFbnZpcm9ubWVudFBsdWdpbihcbiAgIGFsbG93RW52aXJvbm1lbnQ6IHJlYWRvbmx5IHN0cmluZ1tdLFxuICAgYWxsb3dBYmJyZXZpYXRlZE9wdGlvbnMgPSBmYWxzZVxuKTogU2ltcGxlR2l0UGx1Z2luPCdzcGF3bi5vcHRpb25zJz4ge1xuICAgY29uc3QgYWxsb3dlZCA9IG5ldyBTZXQoYWxsb3dFbnZpcm9ubWVudC5tYXAoKGtleSkgPT4ga2V5LnRvTG93ZXJDYXNlKCkudHJpbSgpKSk7XG5cbiAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnc3Bhd24ub3B0aW9ucycsXG4gICAgICBhY3Rpb24oc3Bhd25PcHRpb25zLCBjb250ZXh0KSB7XG4gICAgICAgICBjb25zdCBlbnYgPSB7IC4uLihzcGF3bk9wdGlvbnMuZW52ID8/IHByb2Nlc3MuZW52KSB9O1xuICAgICAgICAgY29uc3Qgc3VwcGxpZWRLZXlzID0gbmV3IFNldChcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGNvbnRleHQuZW52KS5tYXAoKGtleSkgPT4ga2V5LnRvTG93ZXJDYXNlKCkudHJpbSgpKVxuICAgICAgICAgKTtcblxuICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZW52KSkge1xuICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXNlZCA9IGtleS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcblxuICAgICAgICAgICAgLy8gbm90IGEgR0lUXyBrZXksIG9yIGV4cGxpY2l0bHkgcGVybWl0dGVkXG4gICAgICAgICAgICBpZiAoIWlzR3VhcmRlZEVudktleShub3JtYWxpc2VkKSB8fCBhbGxvd2VkLmhhcyhub3JtYWxpc2VkKSkge1xuICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGV4cGxpY2l0bHkgdGhyb3cgd2hlbiBzaW1wbGVHaXQuZW52KCkgd2FzIGNhbGxlZCB3aXRoIGEgZ3VhcmRlZCBrZXlcbiAgICAgICAgICAgIGlmIChzdXBwbGllZEtleXMuaGFzKG5vcm1hbGlzZWQpKSB7XG4gICAgICAgICAgICAgICB0aHJvdyBuZXcgR2l0UGx1Z2luRXJyb3IoXG4gICAgICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAnYWxsb3dFbnZpcm9ubWVudCcsXG4gICAgICAgICAgICAgICAgICBgVXNlIG9mIFwiJHtrZXl9XCIgaXMgYmxvY2tlZCBieSB0aGUgZW52aXJvbm1lbnQgZ3VhcmQgLSBhZGQgaXQgdG8gdGhlIGFsbG93RW52aXJvbm1lbnQgb3B0aW9uIHRvIHBlcm1pdCBpdGBcbiAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGxvZyBhbmQgcmVtb3ZlIGd1YXJkZWQga2V5cyBpbmhlcml0ZWQgZnJvbSB0aGUgb3V0ZXIgZW52aXJvbm1lbnRcbiAgICAgICAgICAgIGxvZ2dlcihgcmVtb3ZpbmcgYW1iaWVudCBndWFyZGVkIGVudmlyb25tZW50IHZhcmlhYmxlICVzYCwga2V5KTtcbiAgICAgICAgICAgIGRlbGV0ZSBlbnZba2V5XTtcbiAgICAgICAgIH1cblxuICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnNwYXduT3B0aW9ucyxcbiAgICAgICAgICAgIGVudjoge1xuICAgICAgICAgICAgICAgLi4uZW52LFxuICAgICAgICAgICAgICAgR0lUX1RFU1RfRElTQUxMT1dfQUJCUkVWSUFURURfT1BUSU9OUzogU3RyaW5nKCFhbGxvd0FiYnJldmlhdGVkT3B0aW9ucyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgfTtcbiAgICAgIH0sXG4gICB9O1xufVxuXG5mdW5jdGlvbiBpc0d1YXJkZWRFbnZLZXkoa2V5OiBzdHJpbmcpIHtcbiAgIGNvbnN0IG5vcm1hbGlzZWQgPSBrZXkudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICByZXR1cm4gbm9ybWFsaXNlZC5zdGFydHNXaXRoKCdnaXRfJykgfHwgaXNHaXRFbnZLZXkobm9ybWFsaXNlZCk7XG59XG4iLCAiaW1wb3J0IHsgdnVsbmVyYWJpbGl0eUNoZWNrIH0gZnJvbSAnQHNpbXBsZS1naXQvYXJndi1wYXJzZXInO1xuXG5pbXBvcnQgeyBHaXRQbHVnaW5FcnJvciB9IGZyb20gJy4uL2Vycm9ycy9naXQtcGx1Z2luLWVycm9yJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0UGx1Z2luQ29uZmlnIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRQbHVnaW4gfSBmcm9tICcuL3NpbXBsZS1naXQtcGx1Z2luJztcblxuZXhwb3J0IGZ1bmN0aW9uIGJsb2NrVW5zYWZlT3BlcmF0aW9uc1BsdWdpbihcbiAgIG9wdGlvbnM6IFNpbXBsZUdpdFBsdWdpbkNvbmZpZ1sndW5zYWZlJ10gPSB7fVxuKTogU2ltcGxlR2l0UGx1Z2luPCdzcGF3bi5hcmdzJz4ge1xuICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdzcGF3bi5hcmdzJyxcbiAgICAgIGFjdGlvbihhcmdzLCB7IGVudiB9KSB7XG4gICAgICAgICBmb3IgKGNvbnN0IHZ1bG5lcmFiaWxpdHkgb2YgdnVsbmVyYWJpbGl0eUNoZWNrKGFyZ3MsIGVudikpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zW3Z1bG5lcmFiaWxpdHkuY2F0ZWdvcnldICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICB0aHJvdyBuZXcgR2l0UGx1Z2luRXJyb3IodW5kZWZpbmVkLCAndW5zYWZlJywgdnVsbmVyYWJpbGl0eS5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH1cblxuICAgICAgICAgcmV0dXJuIGFyZ3M7XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgeyBwcmVmaXhlZEFycmF5IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRQbHVnaW4gfSBmcm9tICcuL3NpbXBsZS1naXQtcGx1Z2luJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbW1hbmRDb25maWdQcmVmaXhpbmdQbHVnaW4oXG4gICBjb25maWd1cmF0aW9uOiBzdHJpbmdbXVxuKTogU2ltcGxlR2l0UGx1Z2luPCdzcGF3bi5hcmdzJz4ge1xuICAgY29uc3QgcHJlZml4ID0gcHJlZml4ZWRBcnJheShjb25maWd1cmF0aW9uLCAnLWMnKTtcblxuICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdzcGF3bi5hcmdzJyxcbiAgICAgIGFjdGlvbihkYXRhKSB7XG4gICAgICAgICByZXR1cm4gWy4uLnByZWZpeCwgLi4uZGF0YV07XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgeyB0eXBlIERlZmVycmVkUHJvbWlzZSwgZGVmZXJyZWQgfSBmcm9tICdAa3dzaXRlcy9wcm9taXNlLWRlZmVycmVkJztcblxuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRQbHVnaW5Db25maWcgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBkZWxheSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0UGx1Z2luIH0gZnJvbSAnLi9zaW1wbGUtZ2l0LXBsdWdpbic7XG5cbmNvbnN0IG5ldmVyID0gZGVmZXJyZWQoKS5wcm9taXNlO1xuXG5leHBvcnQgZnVuY3Rpb24gY29tcGxldGlvbkRldGVjdGlvblBsdWdpbih7XG4gICBvbkNsb3NlID0gdHJ1ZSxcbiAgIG9uRXhpdCA9IDUwLFxufTogU2ltcGxlR2l0UGx1Z2luQ29uZmlnWydjb21wbGV0aW9uJ10gPSB7fSk6IFNpbXBsZUdpdFBsdWdpbjwnc3Bhd24uYWZ0ZXInPiB7XG4gICBmdW5jdGlvbiBjcmVhdGVFdmVudHMoKSB7XG4gICAgICBsZXQgZXhpdENvZGUgPSAtMTtcbiAgICAgIGNvbnN0IGV2ZW50cyA9IHtcbiAgICAgICAgIGNsb3NlOiBkZWZlcnJlZCgpLFxuICAgICAgICAgY2xvc2VUaW1lb3V0OiBkZWZlcnJlZCgpLFxuICAgICAgICAgZXhpdDogZGVmZXJyZWQoKSxcbiAgICAgICAgIGV4aXRUaW1lb3V0OiBkZWZlcnJlZCgpLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gUHJvbWlzZS5yYWNlKFtcbiAgICAgICAgIG9uQ2xvc2UgPT09IGZhbHNlID8gbmV2ZXIgOiBldmVudHMuY2xvc2VUaW1lb3V0LnByb21pc2UsXG4gICAgICAgICBvbkV4aXQgPT09IGZhbHNlID8gbmV2ZXIgOiBldmVudHMuZXhpdFRpbWVvdXQucHJvbWlzZSxcbiAgICAgIF0pO1xuXG4gICAgICBjb25maWd1cmVUaW1lb3V0KG9uQ2xvc2UsIGV2ZW50cy5jbG9zZSwgZXZlbnRzLmNsb3NlVGltZW91dCk7XG4gICAgICBjb25maWd1cmVUaW1lb3V0KG9uRXhpdCwgZXZlbnRzLmV4aXQsIGV2ZW50cy5leGl0VGltZW91dCk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgICBjbG9zZShjb2RlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIGV4aXRDb2RlID0gY29kZTtcbiAgICAgICAgICAgIGV2ZW50cy5jbG9zZS5kb25lKCk7XG4gICAgICAgICB9LFxuICAgICAgICAgZXhpdChjb2RlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIGV4aXRDb2RlID0gY29kZTtcbiAgICAgICAgICAgIGV2ZW50cy5leGl0LmRvbmUoKTtcbiAgICAgICAgIH0sXG4gICAgICAgICBnZXQgZXhpdENvZGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gZXhpdENvZGU7XG4gICAgICAgICB9LFxuICAgICAgICAgcmVzdWx0LFxuICAgICAgfTtcbiAgIH1cblxuICAgZnVuY3Rpb24gY29uZmlndXJlVGltZW91dChcbiAgICAgIGZsYWc6IGJvb2xlYW4gfCBudW1iZXIsXG4gICAgICBldmVudDogRGVmZXJyZWRQcm9taXNlPHZvaWQ+LFxuICAgICAgdGltZW91dDogRGVmZXJyZWRQcm9taXNlPHZvaWQ+XG4gICApIHtcbiAgICAgIGlmIChmbGFnID09PSBmYWxzZSkge1xuICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAoZmxhZyA9PT0gdHJ1ZSA/IGV2ZW50LnByb21pc2UgOiBldmVudC5wcm9taXNlLnRoZW4oKCkgPT4gZGVsYXkoZmxhZykpKS50aGVuKHRpbWVvdXQuZG9uZSk7XG4gICB9XG5cbiAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnc3Bhd24uYWZ0ZXInLFxuICAgICAgYXN5bmMgYWN0aW9uKF9kYXRhLCB7IHNwYXduZWQsIGNsb3NlIH0pIHtcbiAgICAgICAgIGNvbnN0IGV2ZW50cyA9IGNyZWF0ZUV2ZW50cygpO1xuXG4gICAgICAgICBsZXQgZGVmZXJDbG9zZSA9IHRydWU7XG4gICAgICAgICBsZXQgcXVpY2tDbG9zZSA9ICgpID0+IHZvaWQgKGRlZmVyQ2xvc2UgPSBmYWxzZSk7XG5cbiAgICAgICAgIHNwYXduZWQuc3Rkb3V0Py5vbignZGF0YScsIHF1aWNrQ2xvc2UpO1xuICAgICAgICAgc3Bhd25lZC5zdGRlcnI/Lm9uKCdkYXRhJywgcXVpY2tDbG9zZSk7XG4gICAgICAgICBzcGF3bmVkLm9uKCdlcnJvcicsIHF1aWNrQ2xvc2UpO1xuXG4gICAgICAgICBzcGF3bmVkLm9uKCdjbG9zZScsIChjb2RlOiBudW1iZXIpID0+IGV2ZW50cy5jbG9zZShjb2RlKSk7XG4gICAgICAgICBzcGF3bmVkLm9uKCdleGl0JywgKGNvZGU6IG51bWJlcikgPT4gZXZlbnRzLmV4aXQoY29kZSkpO1xuXG4gICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgZXZlbnRzLnJlc3VsdDtcbiAgICAgICAgICAgIGlmIChkZWZlckNsb3NlKSB7XG4gICAgICAgICAgICAgICBhd2FpdCBkZWxheSg1MCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbG9zZShldmVudHMuZXhpdENvZGUpO1xuICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjbG9zZShldmVudHMuZXhpdENvZGUsIGVyciBhcyBFcnJvcik7XG4gICAgICAgICB9XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgeyBHaXRQbHVnaW5FcnJvciB9IGZyb20gJy4uL2Vycm9ycy9naXQtcGx1Z2luLWVycm9yJztcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gJy4uL2dpdC1sb2dnZXInO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRPcHRpb25zIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgYXNBcnJheSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB0eXBlIHsgUGx1Z2luU3RvcmUgfSBmcm9tICcuL3BsdWdpbi1zdG9yZSc7XG5cbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcignJywgJ3BsdWdpbjpiaW5hcnknKTtcblxuY29uc3QgV1JPTkdfTlVNQkVSX0VSUiA9IGBJbnZhbGlkIHZhbHVlIHN1cHBsaWVkIGZvciBjdXN0b20gYmluYXJ5LCByZXF1aXJlcyBhIHNpbmdsZSBzdHJpbmcgb3IgYW4gYXJyYXkgY29udGFpbmluZyBlaXRoZXIgb25lIG9yIHR3byBzdHJpbmdzYDtcbmNvbnN0IFdST05HX0NIQVJTX0VSUiA9IGBJbnZhbGlkIHZhbHVlIHN1cHBsaWVkIGZvciBjdXN0b20gYmluYXJ5LCByZXN0cmljdGVkIGNoYXJhY3RlcnMgbXVzdCBiZSByZW1vdmVkIG9yIHN1cHBseSB0aGUgdW5zYWZlLmFsbG93VW5zYWZlQ3VzdG9tQmluYXJ5IG9wdGlvbmA7XG5cbmZ1bmN0aW9uIGlzQmFkQXJndW1lbnQoYXJnOiBzdHJpbmcpIHtcbiAgIHJldHVybiAhYXJnIHx8ICEvXihbYS16XTopPyhbYS16MC05Ly5cXFxcX34tXSspJC9pLnRlc3QoYXJnKTtcbn1cblxuZnVuY3Rpb24gdG9CaW5hcnlDb25maWcoXG4gICBpbnB1dDogc3RyaW5nW10sXG4gICBhbGxvd1Vuc2FmZTogYm9vbGVhblxuKTogeyBiaW5hcnk6IHN0cmluZzsgcHJlZml4Pzogc3RyaW5nIH0ge1xuICAgaWYgKGlucHV0Lmxlbmd0aCA8IDEgfHwgaW5wdXQubGVuZ3RoID4gMikge1xuICAgICAgdGhyb3cgbmV3IEdpdFBsdWdpbkVycm9yKHVuZGVmaW5lZCwgJ2JpbmFyeScsIFdST05HX05VTUJFUl9FUlIpO1xuICAgfVxuXG4gICBjb25zdCBpc0JhZCA9IGlucHV0LnNvbWUoaXNCYWRBcmd1bWVudCk7XG4gICBpZiAoaXNCYWQpIHtcbiAgICAgIGlmIChhbGxvd1Vuc2FmZSkge1xuICAgICAgICAgbG9nZ2VyKCdwZXJtaXR0ZWQgdW5zYWZlIGJpbmFyeSAlbycsIGlucHV0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICB0aHJvdyBuZXcgR2l0UGx1Z2luRXJyb3IodW5kZWZpbmVkLCAnYmluYXJ5JywgV1JPTkdfQ0hBUlNfRVJSKTtcbiAgICAgIH1cbiAgIH1cblxuICAgY29uc3QgW2JpbmFyeSwgcHJlZml4XSA9IGlucHV0O1xuICAgcmV0dXJuIHtcbiAgICAgIGJpbmFyeSxcbiAgICAgIHByZWZpeCxcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjdXN0b21CaW5hcnlQbHVnaW4oXG4gICBwbHVnaW5zOiBQbHVnaW5TdG9yZSxcbiAgIGlucHV0OiBTaW1wbGVHaXRPcHRpb25zWydiaW5hcnknXSA9IFsnZ2l0J10sXG4gICBhbGxvd1Vuc2FmZSA9IGZhbHNlXG4pIHtcbiAgIGxldCBjb25maWcgPSB0b0JpbmFyeUNvbmZpZyhhc0FycmF5KGlucHV0KSwgYWxsb3dVbnNhZmUpO1xuXG4gICBwbHVnaW5zLm9uKCdiaW5hcnknLCAoaW5wdXQpID0+IHtcbiAgICAgIGNvbmZpZyA9IHRvQmluYXJ5Q29uZmlnKGFzQXJyYXkoaW5wdXQpLCBhbGxvd1Vuc2FmZSk7XG4gICAgICBsb2dnZXIuaW5mbygncmVjb25maWd1cmluZyAlbycsIGNvbmZpZyk7XG4gICB9KTtcblxuICAgcGx1Z2lucy5hcHBlbmQoJ3NwYXduLmJpbmFyeScsICgpID0+IHtcbiAgICAgIHJldHVybiBjb25maWcuYmluYXJ5O1xuICAgfSk7XG5cbiAgIHBsdWdpbnMuYXBwZW5kKCdzcGF3bi5hcmdzJywgKGRhdGEpID0+IHtcbiAgICAgIHJldHVybiBjb25maWcucHJlZml4ID8gW2NvbmZpZy5wcmVmaXgsIC4uLmRhdGFdIDogZGF0YTtcbiAgIH0pO1xufVxuIiwgImltcG9ydCB7IEdpdEVycm9yIH0gZnJvbSAnLi9naXQtZXJyb3InO1xuXG5jb25zdCBSRUFTT05TID0ge1xuICAgRElTQUxMT1dFRF9BQkJSRVZJQVRFRDoge1xuICAgICAgdGV4dDogJ2Rpc2FsbG93ZWQgYWJicmV2aWF0ZWQgb3IgYW1iaWd1b3VzIG9wdGlvbicsXG4gICAgICBzb2x1dGlvbjpcbiAgICAgICAgICdVbmFtYmlndW91cyBhYmJyZXZpYXRlZCBvcHRpb25zIGJsb2NrZWQgd2l0aCB1bnNhZmUuYWxsb3dBYmJyZXZpYXRlZE9wdGlvbnMgc2V0dGluZzoge21lc3NhZ2V9JyxcbiAgIH0sXG4gICBVTktOT1dOOiB7XG4gICAgICB0ZXh0OiAnfiB1bmtub3duIH4nLFxuICAgICAgc29sdXRpb246IHVuZGVmaW5lZCxcbiAgIH0sXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBHaXRDb25maWd1cmF0aW9uRXJyb3JSZWFzb24gPSBrZXlvZiB0eXBlb2YgUkVBU09OUztcblxuZnVuY3Rpb24gZ2V0UmVhc29uKG1lc3NhZ2U/OiBzdHJpbmcpOiBHaXRDb25maWd1cmF0aW9uRXJyb3JSZWFzb24ge1xuICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICByZXR1cm4gJ1VOS05PV04nO1xuICAgfVxuICAgZm9yIChjb25zdCBbcmVhc29uLCB7IHRleHQgfV0gb2YgT2JqZWN0LmVudHJpZXMoUkVBU09OUykpIHtcbiAgICAgIGlmIChtZXNzYWdlLnN0YXJ0c1dpdGgoYGZhdGFsOiAke3RleHR9YCkpIHtcbiAgICAgICAgIHJldHVybiByZWFzb24gYXMgR2l0Q29uZmlndXJhdGlvbkVycm9yUmVhc29uO1xuICAgICAgfVxuICAgfVxuICAgcmV0dXJuICdVTktOT1dOJztcbn1cblxuLyoqXG4gKiBUaGUgYEdpdENvbmZpZ3VyYXRpb25FcnJvcmAgaXMgdGhyb3duIHdoZW4gdGhlIGBnaXRgIHByb2Nlc3MgcmVqZWN0c1xuICogdGhlIHN1cHBsaWVkIGNvbmZpZ3VyYXRpb24gYXJndW1lbnRzIG9yIGVudmlyb25tZW50IHZhcmlhYmxlcy5cbiAqXG4gKiBDaGVjayB0aGUgYC5tZXNzYWdlYCBwcm9wZXJ0eSBmb3IgbW9yZSBkZXRhaWwgb24gd2h5IHlvdXIgY29uZmlndXJhdGlvblxuICogcmVzdWx0ZWQgaW4gYW4gZXJyb3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBHaXRDb25maWd1cmF0aW9uRXJyb3IgZXh0ZW5kcyBHaXRFcnJvciB7XG4gICBwdWJsaWMgcmVhZG9ubHkgcmVhc29uOiBHaXRDb25maWd1cmF0aW9uRXJyb3JSZWFzb247XG5cbiAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSAnJykge1xuICAgICAgY29uc3QgcmVhc29uID0gZ2V0UmVhc29uKG1lc3NhZ2UpO1xuXG4gICAgICBzdXBlcih1bmRlZmluZWQsIFJFQVNPTlNbcmVhc29uXS5zb2x1dGlvbj8ucmVwbGFjZSgne21lc3NhZ2V9JywgbWVzc2FnZSkgPz8gbWVzc2FnZSk7XG4gICAgICB0aGlzLnJlYXNvbiA9IHJlYXNvbjtcbiAgIH1cbn1cbiIsICJpbXBvcnQgeyBHaXRDb25maWd1cmF0aW9uRXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvZ2l0LWNvbmZpZ3VyYXRpb24tZXJyb3InO1xuaW1wb3J0IHsgR2l0RXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvZ2l0LWVycm9yJztcbmltcG9ydCB0eXBlIHsgR2l0RXhlY3V0b3JSZXN1bHQsIFNpbXBsZUdpdFBsdWdpbkNvbmZpZyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0UGx1Z2luIH0gZnJvbSAnLi9zaW1wbGUtZ2l0LXBsdWdpbic7XG5cbnR5cGUgVGFza1Jlc3VsdCA9IE9taXQ8R2l0RXhlY3V0b3JSZXN1bHQsICdyZWplY3Rpb24nPjtcblxuZnVuY3Rpb24gaXNUYXNrRXJyb3IocmVzdWx0OiBUYXNrUmVzdWx0KSB7XG4gICByZXR1cm4gISEocmVzdWx0LmV4aXRDb2RlICYmIHJlc3VsdC5zdGRFcnIubGVuZ3RoKTtcbn1cblxuZnVuY3Rpb24gZ2V0RXJyb3JNZXNzYWdlKHJlc3VsdDogVGFza1Jlc3VsdCkge1xuICAgcmV0dXJuIEJ1ZmZlci5jb25jYXQoWy4uLnJlc3VsdC5zdGRPdXQsIC4uLnJlc3VsdC5zdGRFcnJdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVycm9yRGV0ZWN0aW9uSGFuZGxlcihcbiAgIG92ZXJ3cml0ZSA9IGZhbHNlLFxuICAgaXNFcnJvciA9IGlzVGFza0Vycm9yLFxuICAgZXJyb3JNZXNzYWdlOiAocmVzdWx0OiBUYXNrUmVzdWx0KSA9PiBCdWZmZXIgfCBFcnJvciA9IGdldEVycm9yTWVzc2FnZVxuKSB7XG4gICByZXR1cm4gKGVycm9yOiBCdWZmZXIgfCBFcnJvciB8IHVuZGVmaW5lZCwgcmVzdWx0OiBUYXNrUmVzdWx0KSA9PiB7XG4gICAgICBpZiAoKCFvdmVyd3JpdGUgJiYgZXJyb3IpIHx8ICFpc0Vycm9yKHJlc3VsdCkpIHtcbiAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGVycm9yTWVzc2FnZShyZXN1bHQpO1xuICAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlR2l0RXJyb3IoZXhpdENvZGU6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nKSB7XG4gICBpZiAoZXhpdENvZGUgPT09IDEyOCAmJiBtZXNzYWdlLnN0YXJ0c1dpdGgoJ2ZhdGFsOicpKSB7XG4gICAgICByZXR1cm4gbmV3IEdpdENvbmZpZ3VyYXRpb25FcnJvcihtZXNzYWdlKTtcbiAgIH1cblxuICAgcmV0dXJuIG5ldyBHaXRFcnJvcih1bmRlZmluZWQsIG1lc3NhZ2UpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXJyb3JEZXRlY3Rpb25QbHVnaW4oXG4gICBjb25maWc6IFNpbXBsZUdpdFBsdWdpbkNvbmZpZ1snZXJyb3JzJ11cbik6IFNpbXBsZUdpdFBsdWdpbjwndGFzay5lcnJvcic+IHtcbiAgIHJldHVybiB7XG4gICAgICB0eXBlOiAndGFzay5lcnJvcicsXG4gICAgICBhY3Rpb24oZGF0YSwgY29udGV4dCkge1xuICAgICAgICAgY29uc3QgZXJyb3IgPSBjb25maWcoZGF0YS5lcnJvciwge1xuICAgICAgICAgICAgc3RkRXJyOiBjb250ZXh0LnN0ZEVycixcbiAgICAgICAgICAgIHN0ZE91dDogY29udGV4dC5zdGRPdXQsXG4gICAgICAgICAgICBleGl0Q29kZTogY29udGV4dC5leGl0Q29kZSxcbiAgICAgICAgIH0pO1xuXG4gICAgICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKGVycm9yKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgIGVycm9yOiBjcmVhdGVHaXRFcnJvcihjb250ZXh0LmV4aXRDb2RlLCBlcnJvci50b1N0cmluZygndXRmLTgnKSksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgfVxuXG4gICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICB9O1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSAnLi4vZ2l0LWxvZ2dlcic7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdE9wdGlvbnMgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBieXRlTGVuZ3RoIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRQbHVnaW4gfSBmcm9tICcuL3NpbXBsZS1naXQtcGx1Z2luJztcblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKCcnLCAncGx1Z2luOmlucHV0Jyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnB1dFBsdWdpbihcbiAgIGlucHV0OiBTaW1wbGVHaXRPcHRpb25zWydpbnB1dCddXG4pOiBTaW1wbGVHaXRQbHVnaW48J3NwYXduLmFmdGVyJz4gfCB2b2lkIHtcbiAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnc3Bhd24uYWZ0ZXInLFxuICAgICAgYWN0aW9uKF9kYXRhLCB7IGNvbW1hbmRzLCBpbnB1dDogdGFza0lucHV0LCBzcGF3bmVkOiB7IHN0ZGluIH0gfSkge1xuICAgICAgICAgaWYgKCFzdGRpbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgfVxuXG4gICAgICAgICBjb25zdCBjb250ZW50ID0gaW5wdXQ/LihbLi4uY29tbWFuZHNdKSA/PyB0YXNrSW5wdXQ7XG4gICAgICAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2dnZXIoYGdlbmVyYXRlZCB6ZXJvIGxlbmd0aCBjb250ZW50LCBub3Qgd3JpdGluZyB0byBzdGRpbmApO1xuICAgICAgICAgfVxuXG4gICAgICAgICBsb2dnZXIoYHdyaXRpbmcgJXMgYnl0ZXMgdG8gc3RkaW5gLCBieXRlTGVuZ3RoKGNvbnRlbnQpKTtcblxuICAgICAgICAgc3RkaW4ub24oJ2Vycm9yJywgKGVycjogTm9kZUpTLkVycm5vRXhjZXB0aW9uKSA9PiB7XG4gICAgICAgICAgICAvLyBFUElQRSBpcyBleHBlY3RlZCB3aGVuIGdpdCBleGl0cyBiZWZvcmUgY29uc3VtaW5nIGFsbCBpbnB1dFxuICAgICAgICAgICAgaWYgKGVyci5jb2RlICE9PSAnRVBJUEUnKSB7XG4gICAgICAgICAgICAgICBsb2dnZXIoJ1tFUlJPUl0gc3RkaW4gZXJyb3IgJW8nLCBlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG5cbiAgICAgICAgIHN0ZGluLmVuZChjb250ZW50KTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ25vZGU6ZXZlbnRzJztcblxuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRQbHVnaW5Db25maWcgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBhcHBlbmQsIGFzQXJyYXkgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgdHlwZSB7XG4gICBTaW1wbGVHaXRQbHVnaW4sXG4gICBTaW1wbGVHaXRQbHVnaW5UeXBlLFxuICAgU2ltcGxlR2l0UGx1Z2luVHlwZXMsXG59IGZyb20gJy4vc2ltcGxlLWdpdC1wbHVnaW4nO1xuXG5leHBvcnQgY2xhc3MgUGx1Z2luU3RvcmUge1xuICAgcHJpdmF0ZSBwbHVnaW5zOiBTZXQ8U2ltcGxlR2l0UGx1Z2luPFNpbXBsZUdpdFBsdWdpblR5cGU+PiA9IG5ldyBTZXQoKTtcbiAgIHByaXZhdGUgZXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICBvbjxLIGV4dGVuZHMga2V5b2YgU2ltcGxlR2l0UGx1Z2luQ29uZmlnPihcbiAgICAgIHR5cGU6IEssXG4gICAgICBsaXN0ZW5lcjogKGRhdGE6IFNpbXBsZUdpdFBsdWdpbkNvbmZpZ1tLXSkgPT4gdm9pZFxuICAgKSB7XG4gICAgICB0aGlzLmV2ZW50cy5vbih0eXBlLCBsaXN0ZW5lcik7XG4gICB9XG5cbiAgIHJlY29uZmlndXJlPEsgZXh0ZW5kcyBrZXlvZiBTaW1wbGVHaXRQbHVnaW5Db25maWc+KHR5cGU6IEssIGRhdGE6IFNpbXBsZUdpdFBsdWdpbkNvbmZpZ1tLXSkge1xuICAgICAgdGhpcy5ldmVudHMuZW1pdCh0eXBlLCBkYXRhKTtcbiAgIH1cblxuICAgcHVibGljIGFwcGVuZDxUIGV4dGVuZHMgU2ltcGxlR2l0UGx1Z2luVHlwZT4odHlwZTogVCwgYWN0aW9uOiBTaW1wbGVHaXRQbHVnaW48VD5bJ2FjdGlvbiddKSB7XG4gICAgICBjb25zdCBwbHVnaW4gPSBhcHBlbmQodGhpcy5wbHVnaW5zLCB7IHR5cGUsIGFjdGlvbiB9KTtcblxuICAgICAgcmV0dXJuICgpID0+IHRoaXMucGx1Z2lucy5kZWxldGUocGx1Z2luKTtcbiAgIH1cblxuICAgcHVibGljIGFkZDxUIGV4dGVuZHMgU2ltcGxlR2l0UGx1Z2luVHlwZT4oXG4gICAgICBwbHVnaW46IHZvaWQgfCBTaW1wbGVHaXRQbHVnaW48VD4gfCBTaW1wbGVHaXRQbHVnaW48VD5bXVxuICAgKSB7XG4gICAgICBjb25zdCBwbHVnaW5zOiBTaW1wbGVHaXRQbHVnaW48VD5bXSA9IFtdO1xuXG4gICAgICBhc0FycmF5KHBsdWdpbikuZm9yRWFjaChcbiAgICAgICAgIChwbHVnaW4pID0+IHZvaWQgKHBsdWdpbiAmJiB0aGlzLnBsdWdpbnMuYWRkKGFwcGVuZChwbHVnaW5zLCBwbHVnaW4pKSlcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICBwbHVnaW5zLmZvckVhY2goKHBsdWdpbikgPT4gdm9pZCB0aGlzLnBsdWdpbnMuZGVsZXRlKHBsdWdpbikpO1xuICAgICAgfTtcbiAgIH1cblxuICAgcHVibGljIGV4ZWM8VCBleHRlbmRzIFNpbXBsZUdpdFBsdWdpblR5cGU+KFxuICAgICAgdHlwZTogVCxcbiAgICAgIGRhdGE6IFNpbXBsZUdpdFBsdWdpblR5cGVzW1RdWydkYXRhJ10sXG4gICAgICBjb250ZXh0OiBTaW1wbGVHaXRQbHVnaW5UeXBlc1tUXVsnY29udGV4dCddXG4gICApOiB0eXBlb2YgZGF0YSB7XG4gICAgICBsZXQgb3V0cHV0ID0gZGF0YTtcbiAgICAgIGNvbnN0IGNvbnRleHR1YWwgPSBPYmplY3QuZnJlZXplKE9iamVjdC5jcmVhdGUoY29udGV4dCkpO1xuXG4gICAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLnBsdWdpbnMpIHtcbiAgICAgICAgIGlmIChwbHVnaW4udHlwZSA9PT0gdHlwZSkge1xuICAgICAgICAgICAgb3V0cHV0ID0gcGx1Z2luLmFjdGlvbihvdXRwdXQsIGNvbnRleHR1YWwpO1xuICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3V0cHV0O1xuICAgfVxufVxuIiwgImltcG9ydCB0eXBlIHsgU2ltcGxlR2l0T3B0aW9ucyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGFzTnVtYmVyLCBpbmNsdWRpbmcgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdFBsdWdpbiB9IGZyb20gJy4vc2ltcGxlLWdpdC1wbHVnaW4nO1xuXG5leHBvcnQgZnVuY3Rpb24gcHJvZ3Jlc3NNb25pdG9yUGx1Z2luKHByb2dyZXNzOiBFeGNsdWRlPFNpbXBsZUdpdE9wdGlvbnNbJ3Byb2dyZXNzJ10sIHZvaWQ+KSB7XG4gICBjb25zdCBwcm9ncmVzc0NvbW1hbmQgPSAnLS1wcm9ncmVzcyc7XG4gICBjb25zdCBwcm9ncmVzc01ldGhvZHMgPSBbJ2NoZWNrb3V0JywgJ2Nsb25lJywgJ2ZldGNoJywgJ3B1bGwnLCAncHVzaCddO1xuXG4gICBjb25zdCBvblByb2dyZXNzOiBTaW1wbGVHaXRQbHVnaW48J3NwYXduLmFmdGVyJz4gPSB7XG4gICAgICB0eXBlOiAnc3Bhd24uYWZ0ZXInLFxuICAgICAgYWN0aW9uKF9kYXRhLCBjb250ZXh0KSB7XG4gICAgICAgICBpZiAoIWNvbnRleHQuY29tbWFuZHMuaW5jbHVkZXMocHJvZ3Jlc3NDb21tYW5kKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgfVxuXG4gICAgICAgICBjb250ZXh0LnNwYXduZWQuc3RkZXJyPy5vbignZGF0YScsIChjaHVuazogQnVmZmVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gL14oW1xcc1xcU10rPyk6XFxzKihcXGQrKSUgXFwoKFxcZCspXFwvKFxcZCspXFwpLy5leGVjKGNodW5rLnRvU3RyaW5nKCd1dGY4JykpO1xuICAgICAgICAgICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByb2dyZXNzKHtcbiAgICAgICAgICAgICAgIG1ldGhvZDogY29udGV4dC5tZXRob2QsXG4gICAgICAgICAgICAgICBzdGFnZTogcHJvZ3Jlc3NFdmVudFN0YWdlKG1lc3NhZ2VbMV0pLFxuICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IGFzTnVtYmVyKG1lc3NhZ2VbMl0pLFxuICAgICAgICAgICAgICAgcHJvY2Vzc2VkOiBhc051bWJlcihtZXNzYWdlWzNdKSxcbiAgICAgICAgICAgICAgIHRvdGFsOiBhc051bWJlcihtZXNzYWdlWzRdKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgfSk7XG4gICAgICB9LFxuICAgfTtcblxuICAgY29uc3Qgb25BcmdzOiBTaW1wbGVHaXRQbHVnaW48J3NwYXduLmFyZ3MnPiA9IHtcbiAgICAgIHR5cGU6ICdzcGF3bi5hcmdzJyxcbiAgICAgIGFjdGlvbihhcmdzLCBjb250ZXh0KSB7XG4gICAgICAgICBpZiAoIXByb2dyZXNzTWV0aG9kcy5pbmNsdWRlcyhjb250ZXh0Lm1ldGhvZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBhcmdzO1xuICAgICAgICAgfVxuXG4gICAgICAgICByZXR1cm4gaW5jbHVkaW5nKGFyZ3MsIHByb2dyZXNzQ29tbWFuZCk7XG4gICAgICB9LFxuICAgfTtcblxuICAgcmV0dXJuIFtvbkFyZ3MsIG9uUHJvZ3Jlc3NdO1xufVxuXG5mdW5jdGlvbiBwcm9ncmVzc0V2ZW50U3RhZ2UoaW5wdXQ6IHN0cmluZykge1xuICAgcmV0dXJuIFN0cmluZyhpbnB1dC50b0xvd2VyQ2FzZSgpLnNwbGl0KCcgJywgMSkpIHx8ICd1bmtub3duJztcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFNwYXduT3B0aW9ucyB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuXG5pbXBvcnQgeyBwaWNrIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRQbHVnaW4gfSBmcm9tICcuL3NpbXBsZS1naXQtcGx1Z2luJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNwYXduT3B0aW9uc1BsdWdpbihcbiAgIHNwYXduT3B0aW9uczogUGFydGlhbDxTcGF3bk9wdGlvbnM+XG4pOiBTaW1wbGVHaXRQbHVnaW48J3NwYXduLm9wdGlvbnMnPiB7XG4gICBjb25zdCBvcHRpb25zID0gcGljayhzcGF3bk9wdGlvbnMsIFsndWlkJywgJ2dpZCddKTtcblxuICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdzcGF3bi5vcHRpb25zJyxcbiAgICAgIGFjdGlvbihkYXRhKSB7XG4gICAgICAgICByZXR1cm4geyAuLi5vcHRpb25zLCAuLi5kYXRhIH07XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgeyBpc1BhdGhTcGVjLCB0b1BhdGhzIH0gZnJvbSAnQHNpbXBsZS1naXQvYXJncy1wYXRoc3BlYyc7XG5cbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0UGx1Z2luIH0gZnJvbSAnLi9zaW1wbGUtZ2l0LXBsdWdpbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWZmaXhQYXRoc1BsdWdpbigpOiBTaW1wbGVHaXRQbHVnaW48J3NwYXduLmFyZ3MnPiB7XG4gICByZXR1cm4ge1xuICAgICAgdHlwZTogJ3NwYXduLmFyZ3MnLFxuICAgICAgYWN0aW9uKGRhdGEpIHtcbiAgICAgICAgIGNvbnN0IHByZWZpeDogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgIGxldCBzdWZmaXg6IHVuZGVmaW5lZCB8IHN0cmluZ1tdO1xuICAgICAgICAgZnVuY3Rpb24gYXBwZW5kKGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgICAgICAgICAoc3VmZml4ID0gc3VmZml4IHx8IFtdKS5wdXNoKC4uLmFyZ3MpO1xuICAgICAgICAgfVxuXG4gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtID0gZGF0YVtpXTtcblxuICAgICAgICAgICAgaWYgKGlzUGF0aFNwZWMocGFyYW0pKSB7XG4gICAgICAgICAgICAgICBhcHBlbmQodG9QYXRocyhwYXJhbSkpO1xuICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwYXJhbSA9PT0gJy0tJykge1xuICAgICAgICAgICAgICAgYXBwZW5kKFxuICAgICAgICAgICAgICAgICAgZGF0YS5zbGljZShpICsgMSkuZmxhdE1hcCgoaXRlbSkgPT4gKGlzUGF0aFNwZWMoaXRlbSkgJiYgdG9QYXRocyhpdGVtKSkgfHwgaXRlbSlcbiAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJlZml4LnB1c2gocGFyYW0pO1xuICAgICAgICAgfVxuXG4gICAgICAgICByZXR1cm4gIXN1ZmZpeCA/IHByZWZpeCA6IFsuLi5wcmVmaXgsICctLScsIC4uLnN1ZmZpeC5tYXAoU3RyaW5nKV07XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgeyBHaXRQbHVnaW5FcnJvciB9IGZyb20gJy4uL2Vycm9ycy9naXQtcGx1Z2luLWVycm9yJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0T3B0aW9ucyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0UGx1Z2luIH0gZnJvbSAnLi9zaW1wbGUtZ2l0LXBsdWdpbic7XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lb3V0UGx1Z2luKHtcbiAgIGJsb2NrLFxuICAgc3RkRXJyID0gdHJ1ZSxcbiAgIHN0ZE91dCA9IHRydWUsXG59OiBFeGNsdWRlPFNpbXBsZUdpdE9wdGlvbnNbJ3RpbWVvdXQnXSwgdW5kZWZpbmVkPik6IFNpbXBsZUdpdFBsdWdpbjwnc3Bhd24uYWZ0ZXInPiB8IHZvaWQge1xuICAgaWYgKGJsb2NrID4gMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgIHR5cGU6ICdzcGF3bi5hZnRlcicsXG4gICAgICAgICBhY3Rpb24oX2RhdGEsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIGxldCB0aW1lb3V0OiBOb2RlSlMuVGltZW91dDtcblxuICAgICAgICAgICAgZnVuY3Rpb24gd2FpdCgpIHtcbiAgICAgICAgICAgICAgIHRpbWVvdXQgJiYgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoa2lsbCwgYmxvY2spO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICAgICAgICAgY29udGV4dC5zcGF3bmVkLnN0ZG91dD8ub2ZmKCdkYXRhJywgd2FpdCk7XG4gICAgICAgICAgICAgICBjb250ZXh0LnNwYXduZWQuc3RkZXJyPy5vZmYoJ2RhdGEnLCB3YWl0KTtcbiAgICAgICAgICAgICAgIGNvbnRleHQuc3Bhd25lZC5vZmYoJ2V4aXQnLCBzdG9wKTtcbiAgICAgICAgICAgICAgIGNvbnRleHQuc3Bhd25lZC5vZmYoJ2Nsb3NlJywgc3RvcCk7XG4gICAgICAgICAgICAgICB0aW1lb3V0ICYmIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24ga2lsbCgpIHtcbiAgICAgICAgICAgICAgIHN0b3AoKTtcbiAgICAgICAgICAgICAgIGNvbnRleHQua2lsbChuZXcgR2l0UGx1Z2luRXJyb3IodW5kZWZpbmVkLCAndGltZW91dCcsIGBibG9jayB0aW1lb3V0IHJlYWNoZWRgKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN0ZE91dCAmJiBjb250ZXh0LnNwYXduZWQuc3Rkb3V0Py5vbignZGF0YScsIHdhaXQpO1xuICAgICAgICAgICAgc3RkRXJyICYmIGNvbnRleHQuc3Bhd25lZC5zdGRlcnI/Lm9uKCdkYXRhJywgd2FpdCk7XG4gICAgICAgICAgICBjb250ZXh0LnNwYXduZWQub24oJ2V4aXQnLCBzdG9wKTtcbiAgICAgICAgICAgIGNvbnRleHQuc3Bhd25lZC5vbignY2xvc2UnLCBzdG9wKTtcblxuICAgICAgICAgICAgd2FpdCgpO1xuICAgICAgICAgfSxcbiAgICAgIH07XG4gICB9XG59XG4iLCAiLy8gQHRzLWV4cGVjdC1lcnJvclxuaW1wb3J0IEdpdCBmcm9tICcuLi9naXQnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRGYWN0b3J5IH0gZnJvbSAnLi4vdHlwaW5ncyc7XG5pbXBvcnQgKiBhcyBhcGkgZnJvbSAnLi9hcGknO1xuaW1wb3J0IHtcbiAgIGFib3J0UGx1Z2luLFxuICAgYWxsb3dFbnZpcm9ubWVudFBsdWdpbixcbiAgIGJsb2NrVW5zYWZlT3BlcmF0aW9uc1BsdWdpbixcbiAgIGNvbW1hbmRDb25maWdQcmVmaXhpbmdQbHVnaW4sXG4gICBjb21wbGV0aW9uRGV0ZWN0aW9uUGx1Z2luLFxuICAgY3VzdG9tQmluYXJ5UGx1Z2luLFxuICAgZXJyb3JEZXRlY3Rpb25IYW5kbGVyLFxuICAgZXJyb3JEZXRlY3Rpb25QbHVnaW4sXG4gICBpbnB1dFBsdWdpbixcbiAgIFBsdWdpblN0b3JlLFxuICAgcHJvZ3Jlc3NNb25pdG9yUGx1Z2luLFxuICAgc3Bhd25PcHRpb25zUGx1Z2luLFxuICAgc3VmZml4UGF0aHNQbHVnaW4sXG4gICB0aW1lb3V0UGx1Z2luLFxufSBmcm9tICcuL3BsdWdpbnMnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRPcHRpb25zIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVJbnN0YW5jZUNvbmZpZywgZm9sZGVyRXhpc3RzIH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBjb25zdCBzaW1wbGVHaXQ6IFNpbXBsZUdpdEZhY3RvcnkgPSAoXG4gICBiYXNlRGlyPzogc3RyaW5nIHwgUGFydGlhbDxTaW1wbGVHaXRPcHRpb25zPixcbiAgIG9wdGlvbnM/OiBQYXJ0aWFsPFNpbXBsZUdpdE9wdGlvbnM+XG4pID0+IHtcbiAgIGNvbnN0IHBsdWdpbnMgPSBuZXcgUGx1Z2luU3RvcmUoKTtcbiAgIGNvbnN0IGNvbmZpZyA9IGNyZWF0ZUluc3RhbmNlQ29uZmlnKFxuICAgICAgKGJhc2VEaXIgJiYgKHR5cGVvZiBiYXNlRGlyID09PSAnc3RyaW5nJyA/IHsgYmFzZURpciB9IDogYmFzZURpcikpIHx8IHt9LFxuICAgICAgb3B0aW9uc1xuICAgKTtcblxuICAgaWYgKCFmb2xkZXJFeGlzdHMoY29uZmlnLmJhc2VEaXIpKSB7XG4gICAgICB0aHJvdyBuZXcgYXBpLkdpdENvbnN0cnVjdEVycm9yKFxuICAgICAgICAgY29uZmlnLFxuICAgICAgICAgYENhbm5vdCB1c2Ugc2ltcGxlLWdpdCBvbiBhIGRpcmVjdG9yeSB0aGF0IGRvZXMgbm90IGV4aXN0YFxuICAgICAgKTtcbiAgIH1cblxuICAgaWYgKEFycmF5LmlzQXJyYXkoY29uZmlnLmNvbmZpZykpIHtcbiAgICAgIHBsdWdpbnMuYWRkKGNvbW1hbmRDb25maWdQcmVmaXhpbmdQbHVnaW4oY29uZmlnLmNvbmZpZykpO1xuICAgfVxuXG4gICBwbHVnaW5zLmFkZChibG9ja1Vuc2FmZU9wZXJhdGlvbnNQbHVnaW4oY29uZmlnLnVuc2FmZSkpO1xuICAgcGx1Z2lucy5hZGQoY29tcGxldGlvbkRldGVjdGlvblBsdWdpbihjb25maWcuY29tcGxldGlvbikpO1xuICAgY29uZmlnLmFib3J0ICYmIHBsdWdpbnMuYWRkKGFib3J0UGx1Z2luKGNvbmZpZy5hYm9ydCkpO1xuICAgY29uZmlnLnByb2dyZXNzICYmIHBsdWdpbnMuYWRkKHByb2dyZXNzTW9uaXRvclBsdWdpbihjb25maWcucHJvZ3Jlc3MpKTtcbiAgIGNvbmZpZy50aW1lb3V0ICYmIHBsdWdpbnMuYWRkKHRpbWVvdXRQbHVnaW4oY29uZmlnLnRpbWVvdXQpKTtcbiAgIGNvbmZpZy5zcGF3bk9wdGlvbnMgJiYgcGx1Z2lucy5hZGQoc3Bhd25PcHRpb25zUGx1Z2luKGNvbmZpZy5zcGF3bk9wdGlvbnMpKTtcbiAgIHBsdWdpbnMuYWRkKHN1ZmZpeFBhdGhzUGx1Z2luKCkpO1xuXG4gICBwbHVnaW5zLmFkZChpbnB1dFBsdWdpbihjb25maWcuaW5wdXQpKTtcbiAgIHBsdWdpbnMuYWRkKGVycm9yRGV0ZWN0aW9uUGx1Z2luKGVycm9yRGV0ZWN0aW9uSGFuZGxlcih0cnVlKSkpO1xuICAgY29uZmlnLmVycm9ycyAmJiBwbHVnaW5zLmFkZChlcnJvckRldGVjdGlvblBsdWdpbihjb25maWcuZXJyb3JzKSk7XG5cbiAgIGN1c3RvbUJpbmFyeVBsdWdpbihwbHVnaW5zLCBjb25maWcuYmluYXJ5LCBjb25maWcudW5zYWZlPy5hbGxvd1Vuc2FmZUN1c3RvbUJpbmFyeSk7XG5cbiAgIHBsdWdpbnMuYWRkKFxuICAgICAgYWxsb3dFbnZpcm9ubWVudFBsdWdpbihjb25maWcuYWxsb3dFbnZpcm9ubWVudCA/PyBbXSwgY29uZmlnLnVuc2FmZT8uYWxsb3dBYmJyZXZpYXRlZE9wdGlvbnMpXG4gICApO1xuXG4gICByZXR1cm4gbmV3IEdpdChjb25maWcsIHBsdWdpbnMpO1xufTtcbiIsICJpbXBvcnQgeyBBcHAsIE1vZGFsLCBOb3RpY2UsIFRGaWxlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgdHlwZSBNeVNpbXBsZVBsdWdpbiBmcm9tIFwiLi9tYWluXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVtb3RlQXJ0aWNsZSB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICByZWxhdGl2ZVBhdGg6IHN0cmluZztcbiAgICBhYnNvbHV0ZVBhdGg6IHN0cmluZztcbiAgICBjb250ZW50OiBzdHJpbmc7XG4gICAgc2l6ZTogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgU3luY0NvbmZsaWN0TW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gICAgYXJ0aWNsZTogUmVtb3RlQXJ0aWNsZTtcbiAgICBsb2NhbEZpbGU6IFRGaWxlO1xuICAgIHBsdWdpbjogTXlTaW1wbGVQbHVnaW47XG4gICAgb25SZXN1bHQ6IChyZXN1bHQ6IFwib3ZlcndyaXRlXCIgfCBcImNvcHlcIiB8IFwiY2FuY2VsXCIpID0+IHZvaWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgYXBwOiBBcHAsXG4gICAgICAgIHBsdWdpbjogTXlTaW1wbGVQbHVnaW4sXG4gICAgICAgIGFydGljbGU6IFJlbW90ZUFydGljbGUsXG4gICAgICAgIGxvY2FsRmlsZTogVEZpbGUsXG4gICAgICAgIG9uUmVzdWx0OiAocmVzdWx0OiBcIm92ZXJ3cml0ZVwiIHwgXCJjb3B5XCIgfCBcImNhbmNlbFwiKSA9PiB2b2lkXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGFwcCk7XG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICAgICAgICB0aGlzLmFydGljbGUgPSBhcnRpY2xlO1xuICAgICAgICB0aGlzLmxvY2FsRmlsZSA9IGxvY2FsRmlsZTtcbiAgICAgICAgdGhpcy5vblJlc3VsdCA9IG9uUmVzdWx0O1xuICAgIH1cblxuICAgIG9uT3BlbigpIHtcbiAgICAgICAgY29uc3QgeyBjb250ZW50RWwgfSA9IHRoaXM7XG4gICAgICAgIGNvbnRlbnRFbC5lbXB0eSgpO1xuICAgICAgICBjb250ZW50RWwuYWRkQ2xhc3MoXCJnaXQtc3luYy1jb25mbGljdC1tb2RhbFwiKTtcblxuICAgICAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IFwiXHU1M0QxXHU3M0IwXHU1NDBDXHU1NDBEXHU2NTg3XHU3QUUwXCIgfSk7XG5cbiAgICAgICAgY29udGVudEVsLmNyZWF0ZUVsKFwicFwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBgR2l0IFx1NEVEM1x1NUU5M1x1NEUyRFx1NzY4NFx1MzAwQSR7dGhpcy5hcnRpY2xlLnRpdGxlfVx1MzAwQlx1NEUwRVx1NjcyQ1x1NTczMFx1NjU4N1x1N0FFMFx1NTQwQ1x1NTQwRFx1MzAwMlx1OEJGN1x1OTAwOVx1NjJFOVx1NTQwQ1x1NkI2NVx1NjVCOVx1NUYwRlx1MzAwMmAsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LXN5bmMtY29uZmxpY3QtZGVzY3JpcHRpb25cIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgaW5mbyA9IGNvbnRlbnRFbC5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LXN5bmMtY29uZmxpY3QtaW5mb1wiIH0pO1xuICAgICAgICBpbmZvLmNyZWF0ZUVsKFwiZGl2XCIsIHtcbiAgICAgICAgICAgIHRleHQ6IGBcdTY3MkNcdTU3MzBcdTY1ODdcdTRFRjZcdUZGMUEke3RoaXMubG9jYWxGaWxlLnBhdGh9YCxcbiAgICAgICAgfSk7XG4gICAgICAgIGluZm8uY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgICAgICAgdGV4dDogYEdpdCBcdTY1ODdcdTRFRjZcdUZGMUEke3RoaXMuYXJ0aWNsZS5yZWxhdGl2ZVBhdGh9YCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnRlbnRFbC5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LXN5bmMtY29uZmxpY3Qtb3B0aW9uc1wiIH0pO1xuXG4gICAgICAgIGNvbnN0IG92ZXJ3cml0ZSA9IG9wdGlvbnMuY3JlYXRlRWwoXCJidXR0b25cIiwge1xuICAgICAgICAgICAgdGV4dDogXCJcdTg5ODZcdTc2RDZcdTY3MkNcdTU3MzBcdTY1ODdcdTdBRTBcIixcbiAgICAgICAgICAgIGNsczogXCJnaXQtc3luYy1jb25mbGljdC1vdmVyd3JpdGVcIixcbiAgICAgICAgfSk7XG4gICAgICAgIG92ZXJ3cml0ZS5jcmVhdGVEaXYoe1xuICAgICAgICAgICAgdGV4dDogXCJcdTRGN0ZcdTc1MjggR2l0IFx1NEVEM1x1NUU5M1x1NEUyRFx1NzY4NFx1NTE4NVx1NUJCOVx1NjZGRlx1NjM2Mlx1NUY1M1x1NTI0RFx1NjcyQ1x1NTczMFx1NjU4N1x1N0FFMFx1MzAwMlwiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC1zeW5jLWNvbmZsaWN0LW9wdGlvbi1kZXNjXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBvdmVyd3JpdGUub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25SZXN1bHQoXCJvdmVyd3JpdGVcIik7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgY29weSA9IG9wdGlvbnMuY3JlYXRlRWwoXCJidXR0b25cIiwge1xuICAgICAgICAgICAgdGV4dDogXCJcdTUzRTZcdTVCNThcdTRFM0FcdTUyNkZcdTRFRjZcIixcbiAgICAgICAgICAgIGNsczogXCJnaXQtc3luYy1jb25mbGljdC1jb3B5XCIsXG4gICAgICAgIH0pO1xuICAgICAgICBjb3B5LmNyZWF0ZURpdih7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NEZERFx1NzU1OVx1NjcyQ1x1NTczMFx1NjU4N1x1N0FFMFx1RkYwQ1x1NUU3Nlx1NUMwNiBHaXQgXHU2NTg3XHU3QUUwXHU1M0U2XHU1QjU4XHU0RTNBXHUyMDFDXHU1MjZGXHU0RUY2XHUyMDFEXHUzMDAyXCIsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LXN5bmMtY29uZmxpY3Qtb3B0aW9uLWRlc2NcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGNvcHkub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25SZXN1bHQoXCJjb3B5XCIpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGNhbmNlbCA9IGNvbnRlbnRFbC5jcmVhdGVFbChcImJ1dHRvblwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NTNENlx1NkQ4OFwiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC1zeW5jLWNvbmZsaWN0LWNhbmNlbFwiLFxuICAgICAgICB9KTtcbiAgICAgICAgY2FuY2VsLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uUmVzdWx0KFwiY2FuY2VsXCIpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9uQ2xvc2UoKSB7XG4gICAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NzUyOFx1NjIzN1x1NzZGNFx1NjNBNVx1NjMwOSBFc2MgXHU1MTczXHU5NUVEXHVGRjBDXHU0RTVGXHU4OUM2XHU0RTNBXHU1M0Q2XHU2RDg4XHUzMDAyXG4gICAgICAgIHRoaXMub25SZXN1bHQoXCJjYW5jZWxcIik7XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29uZmlybVN5bmNDb25mbGljdChcbiAgICBwbHVnaW46IE15U2ltcGxlUGx1Z2luLFxuICAgIGFydGljbGU6IFJlbW90ZUFydGljbGUsXG4gICAgbG9jYWxGaWxlOiBURmlsZVxuKTogUHJvbWlzZTxcIm92ZXJ3cml0ZVwiIHwgXCJjb3B5XCIgfCBcImNhbmNlbFwiPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGxldCByZXNvbHZlZCA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IGZpbmlzaCA9IChyZXN1bHQ6IFwib3ZlcndyaXRlXCIgfCBcImNvcHlcIiB8IFwiY2FuY2VsXCIpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNvbHZlZCkgcmV0dXJuO1xuICAgICAgICAgICAgcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG1vZGFsID0gbmV3IFN5bmNDb25mbGljdE1vZGFsKFxuICAgICAgICAgICAgcGx1Z2luLmFwcCxcbiAgICAgICAgICAgIHBsdWdpbixcbiAgICAgICAgICAgIGFydGljbGUsXG4gICAgICAgICAgICBsb2NhbEZpbGUsXG4gICAgICAgICAgICBmaW5pc2hcbiAgICAgICAgKTtcblxuICAgICAgICBtb2RhbC5vcGVuKCk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzeW5jQXJ0aWNsZShcbiAgICBwbHVnaW46IE15U2ltcGxlUGx1Z2luLFxuICAgIGFydGljbGU6IFJlbW90ZUFydGljbGUsXG4gICAgbG9jYWxGaWxlOiBURmlsZVxuKSB7XG4gICAgYXdhaXQgcGx1Z2luLmFwcC52YXVsdC5tb2RpZnkobG9jYWxGaWxlLCBhcnRpY2xlLmNvbnRlbnQpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3luY0FydGljbGVBc0NvcHkoXG4gICAgcGx1Z2luOiBNeVNpbXBsZVBsdWdpbixcbiAgICBhcnRpY2xlOiBSZW1vdGVBcnRpY2xlLFxuICAgIGxvY2FsRmlsZTogVEZpbGVcbik6IFByb21pc2U8VEZpbGU+IHtcbiAgICBjb25zdCBwYXJlbnRQYXRoID0gbG9jYWxGaWxlLnBhcmVudD8ucGF0aCA/PyBcIlwiO1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IFwiLm1kXCI7XG4gICAgY29uc3QgYmFzZVRpdGxlID0gYXJ0aWNsZS50aXRsZTtcblxuICAgIGxldCBjb3B5TmFtZSA9IGAke2Jhc2VUaXRsZX1cdUZGMDhcdTUyNkZcdTRFRjZcdUZGMDkke2V4dGVuc2lvbn1gO1xuICAgIGxldCBjb3B5UGF0aCA9IHBhcmVudFBhdGggJiYgcGFyZW50UGF0aCAhPT0gXCIvXCJcbiAgICAgICAgPyBgJHtwYXJlbnRQYXRofS8ke2NvcHlOYW1lfWBcbiAgICAgICAgOiBjb3B5TmFtZTtcblxuICAgIGxldCBpbmRleCA9IDI7XG4gICAgd2hpbGUgKHBsdWdpbi5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGNvcHlQYXRoKSkge1xuICAgICAgICBjb3B5TmFtZSA9IGAke2Jhc2VUaXRsZX1cdUZGMDhcdTUyNkZcdTRFRjYgJHtpbmRleH1cdUZGMDkke2V4dGVuc2lvbn1gO1xuICAgICAgICBjb3B5UGF0aCA9IHBhcmVudFBhdGggJiYgcGFyZW50UGF0aCAhPT0gXCIvXCJcbiAgICAgICAgICAgID8gYCR7cGFyZW50UGF0aH0vJHtjb3B5TmFtZX1gXG4gICAgICAgICAgICA6IGNvcHlOYW1lO1xuICAgICAgICBpbmRleCsrO1xuICAgIH1cblxuICAgIGF3YWl0IHBsdWdpbi5hcHAudmF1bHQuY3JlYXRlKGNvcHlQYXRoLCBhcnRpY2xlLmNvbnRlbnQpO1xuXG4gICAgY29uc3QgY29weUZpbGUgPSBwbHVnaW4uYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChjb3B5UGF0aCk7XG4gICAgaWYgKCEoY29weUZpbGUgaW5zdGFuY2VvZiBURmlsZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHU1MjZGXHU0RUY2XHU1REYyXHU1MTk5XHU1MTY1XHVGRjBDXHU0RjQ2IE9ic2lkaWFuIFx1NjcyQVx1ODBGRFx1OEJDNlx1NTIyQlx1NjVCMFx1NjU4N1x1NEVGNlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29weUZpbGU7XG59IiwgImltcG9ydCB7IEZpbGVTeXN0ZW1BZGFwdGVyLCBURmlsZSB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgdHlwZSBNeVNpbXBsZVBsdWdpbiBmcm9tIFwiLi9tYWluXCI7XG5pbXBvcnQgdHlwZSB7IFJlbW90ZUFydGljbGUgfSBmcm9tIFwiLi9zeW5jXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkb3dubG9hZEFydGljbGUoXG4gICAgcGx1Z2luOiBNeVNpbXBsZVBsdWdpbixcbiAgICBhcnRpY2xlOiBSZW1vdGVBcnRpY2xlXG4pOiBQcm9taXNlPFRGaWxlPiB7XG4gICAgY29uc3QgYWRhcHRlciA9IHBsdWdpbi5hcHAudmF1bHQuYWRhcHRlcjtcblxuICAgIGlmICghKGFkYXB0ZXIgaW5zdGFuY2VvZiBGaWxlU3lzdGVtQWRhcHRlcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHU1RjUzXHU1MjREIFZhdWx0IFx1NEUwRFx1NjYyRlx1NjcyQ1x1NTczMFx1NjU4N1x1NEVGNlx1N0NGQlx1N0VERlx1RkYwQ1x1NjVFMFx1NkNENVx1NEUwQlx1OEY3RFx1NjU4N1x1N0FFMFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXRGb2xkZXIgPSBwbHVnaW4uc2V0dGluZ3MudGFyZ2V0Rm9sZGVyIHx8IFwiR2l0XHU2NTg3XHU3QUUwXCI7XG4gICAgY29uc3QgcmVsYXRpdmVUYXJnZXQgPSBwYXRoXG4gICAgICAgIC5qb2luKHRhcmdldEZvbGRlciwgYXJ0aWNsZS5yZWxhdGl2ZVBhdGgpXG4gICAgICAgIC5zcGxpdChwYXRoLnNlcClcbiAgICAgICAgLmpvaW4oXCIvXCIpO1xuXG4gICAgY29uc3QgYWJzb2x1dGVUYXJnZXQgPSBwYXRoLmpvaW4oXG4gICAgICAgIGFkYXB0ZXIuZ2V0QmFzZVBhdGgoKSxcbiAgICAgICAgcmVsYXRpdmVUYXJnZXRcbiAgICApO1xuXG4gICAgZnMubWtkaXJTeW5jKHBhdGguZGlybmFtZShhYnNvbHV0ZVRhcmdldCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuXG4gICAgYXdhaXQgYWRhcHRlci53cml0ZShyZWxhdGl2ZVRhcmdldCwgYXJ0aWNsZS5jb250ZW50KTtcblxuICAgIGNvbnN0IGZpbGUgPSBwbHVnaW4uYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChyZWxhdGl2ZVRhcmdldCk7XG4gICAgaWYgKCEoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdTY1ODdcdTdBRTBcdTVERjJcdTUxOTlcdTUxNjVcdUZGMENcdTRGNDYgT2JzaWRpYW4gXHU2NzJBXHU4MEZEXHU4QkM2XHU1MjJCXHU2NUIwXHU2NTg3XHU0RUY2XCIpO1xuICAgIH1cblxuICAgIHJldHVybiBmaWxlO1xufSIsICJpbXBvcnQgeyBBcHAsIEZpbGVTeXN0ZW1BZGFwdGVyLCBNb2RhbCwgTm90aWNlLCBURmlsZSB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgc2ltcGxlR2l0IH0gZnJvbSBcInNpbXBsZS1naXRcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0ICogYXMgb3MgZnJvbSBcIm9zXCI7XG5pbXBvcnQgdHlwZSBNeVNpbXBsZVBsdWdpbiBmcm9tIFwiLi9tYWluXCI7XG5cbmV4cG9ydCBjbGFzcyBVcGxvYWRBcnRpY2xlTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gICAgcGx1Z2luOiBNeVNpbXBsZVBsdWdpbjtcbiAgICBmaWxlOiBURmlsZTtcbiAgICBmb2xkZXJzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHNlbGVjdGVkRm9sZGVyID0gXCJcIjtcbiAgICBmb2xkZXJJbnB1dCE6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgc2VsZWN0RWwhOiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICB1cGxvYWRCdXR0b24hOiBIVE1MQnV0dG9uRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IE15U2ltcGxlUGx1Z2luLCBmaWxlOiBURmlsZSkge1xuICAgICAgICBzdXBlcihhcHApO1xuICAgICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgICAgICAgdGhpcy5maWxlID0gZmlsZTtcbiAgICB9XG5cbiAgICBhc3luYyBvbk9wZW4oKSB7XG4gICAgICAgIGNvbnN0IHsgY29udGVudEVsIH0gPSB0aGlzO1xuICAgICAgICBjb250ZW50RWwuZW1wdHkoKTtcbiAgICAgICAgY29udGVudEVsLmFkZENsYXNzKFwiZ2l0LXVwbG9hZC1tb2RhbFwiKTtcblxuICAgICAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IGBcdTRFMEFcdTRGMjBcdUZGMUEke3RoaXMuZmlsZS5iYXNlbmFtZX1gIH0pO1xuICAgICAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJwXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU5MDA5XHU2MkU5IEdpdCBcdTRFRDNcdTVFOTNcdTRFMkRcdTc2ODRcdTc2RUVcdTY4MDdcdTY1ODdcdTRFRjZcdTU5MzlcdTMwMDJcdTY1ODdcdTRFRjZcdTU5MzlcdTRFMERcdTVCNThcdTU3MjhcdTY1RjZcdTRGMUFcdTgxRUFcdTUyQThcdTUyMUJcdTVFRkFcdTMwMDJcIixcbiAgICAgICAgICAgIGNsczogXCJnaXQtdXBsb2FkLWRlc2NyaXB0aW9uXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGxvYWRpbmcgPSBjb250ZW50RWwuY3JlYXRlRGl2KHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU2QjYzXHU1NzI4XHU4QkZCXHU1M0Q2IEdpdCBcdTRFRDNcdTVFOTNcdTY1ODdcdTRFRjZcdTU5MzlcdTIwMjZcIixcbiAgICAgICAgICAgIGNsczogXCJnaXQtdXBsb2FkLWxvYWRpbmdcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuZm9sZGVycyA9IGF3YWl0IHRoaXMucGx1Z2luLmdldFJlbW90ZUZvbGRlcnMoKTtcbiAgICAgICAgICAgIGxvYWRpbmcucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckZvcm0oKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGxvYWRpbmcucmVtb3ZlKCk7XG4gICAgICAgICAgICBjb250ZW50RWwuY3JlYXRlRGl2KHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBgXHU4QkZCXHU1M0Q2XHU0RUQzXHU1RTkzXHU1OTMxXHU4RDI1XHVGRjFBJHtlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcil9YCxcbiAgICAgICAgICAgICAgICBjbHM6IFwiZ2l0LXVwbG9hZC1lcnJvclwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJGb3JtKCkge1xuICAgICAgICBjb25zdCB7IGNvbnRlbnRFbCB9ID0gdGhpcztcblxuICAgICAgICBjb25zdCBmaWVsZCA9IGNvbnRlbnRFbC5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LXVwbG9hZC1maWVsZFwiIH0pO1xuICAgICAgICBmaWVsZC5jcmVhdGVFbChcImxhYmVsXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU1REYyXHU2NzA5XHU2NTg3XHU0RUY2XHU1OTM5XCIsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LXVwbG9hZC1sYWJlbFwiLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNlbGVjdEVsID0gZmllbGQuY3JlYXRlRWwoXCJzZWxlY3RcIiwge1xuICAgICAgICAgICAgY2xzOiBcImdpdC11cGxvYWQtc2VsZWN0XCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0RWwuY3JlYXRlRWwoXCJvcHRpb25cIiwge1xuICAgICAgICAgICAgdGV4dDogXCJcdTRFRDNcdTVFOTNcdTY4MzlcdTc2RUVcdTVGNTVcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGNvbnN0IGZvbGRlciBvZiB0aGlzLmZvbGRlcnMpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0RWwuY3JlYXRlRWwoXCJvcHRpb25cIiwge1xuICAgICAgICAgICAgICAgIHRleHQ6IGZvbGRlciB8fCBcIlx1NEVEM1x1NUU5M1x1NjgzOVx1NzZFRVx1NUY1NVwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBmb2xkZXIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VsZWN0RWwub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRm9sZGVyID0gdGhpcy5zZWxlY3RFbC52YWx1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdEVsLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2xkZXJJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgbmV3RmllbGQgPSBjb250ZW50RWwuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC11cGxvYWQtZmllbGRcIiB9KTtcbiAgICAgICAgbmV3RmllbGQuY3JlYXRlRWwoXCJsYWJlbFwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NjIxNlx1NTIxQlx1NUVGQVx1NjVCMFx1NjU4N1x1NEVGNlx1NTkzOVwiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC11cGxvYWQtbGFiZWxcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mb2xkZXJJbnB1dCA9IG5ld0ZpZWxkLmNyZWF0ZUVsKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJcdTRGOEJcdTU5ODJcdUZGMUFBSS9cdTZBMjFcdTU3OEJcdTdCMTRcdThCQjBcIixcbiAgICAgICAgICAgIGNsczogXCJnaXQtdXBsb2FkLWlucHV0XCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ld0ZpZWxkLmNyZWF0ZURpdih7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NjUyRlx1NjMwMVx1NTkxQVx1N0VBN1x1NzZFRVx1NUY1NVx1RkYwQ1x1NEY4Qlx1NTk4Mlx1RkYxQVx1NjI4MFx1NjcyRi9BSS9PbGxhbWFcIixcbiAgICAgICAgICAgIGNsczogXCJnaXQtdXBsb2FkLWhpbnRcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mb2xkZXJJbnB1dC5vbmlucHV0ID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9sZGVySW5wdXQudmFsdWUudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RFbC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEZvbGRlciA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgZm9vdGVyID0gY29udGVudEVsLmNyZWF0ZURpdih7IGNsczogXCJnaXQtdXBsb2FkLWZvb3RlclwiIH0pO1xuXG4gICAgICAgIGNvbnN0IGNhbmNlbCA9IGZvb3Rlci5jcmVhdGVFbChcImJ1dHRvblwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NTNENlx1NkQ4OFwiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC11cGxvYWQtY2FuY2VsXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBjYW5jZWwub25jbGljayA9ICgpID0+IHRoaXMuY2xvc2UoKTtcblxuICAgICAgICB0aGlzLnVwbG9hZEJ1dHRvbiA9IGZvb3Rlci5jcmVhdGVFbChcImJ1dHRvblwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NEUwQVx1NEYyMFx1NTIzMCBHaXRcIixcbiAgICAgICAgICAgIGNsczogXCJnaXQtdXBsb2FkLXN1Ym1pdFwiLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy51cGxvYWRCdXR0b24ub25jbGljayA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1c3RvbUZvbGRlciA9IHRoaXMuZm9sZGVySW5wdXQudmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgY29uc3QgZm9sZGVyID0gY3VzdG9tRm9sZGVyIHx8IHRoaXMuc2VsZWN0RWwudmFsdWU7XG5cbiAgICAgICAgICAgIHRoaXMudXBsb2FkQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkQnV0dG9uLnRleHRDb250ZW50ID0gXCJcdTRFMEFcdTRGMjBcdTRFMkRcdTIwMjZcIjtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB1cGxvYWRMb2NhbEFydGljbGUodGhpcy5wbHVnaW4sIHRoaXMuZmlsZSwgZm9sZGVyKTtcbiAgICAgICAgICAgICAgICBuZXcgTm90aWNlKGBcdTMwMEEke3RoaXMuZmlsZS5iYXNlbmFtZX1cdTMwMEJcdTVERjJcdTRFMEFcdTRGMjBcdTUyMzAgJHtmb2xkZXIgfHwgXCJcdTRFRDNcdTVFOTNcdTY4MzlcdTc2RUVcdTVGNTVcIn1gKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoXG4gICAgICAgICAgICAgICAgICAgIGBcdTRFMEFcdTRGMjBcdTU5MzFcdThEMjVcdUZGMUEke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGxvYWRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiXHU0RTBBXHU0RjIwXHU1MjMwIEdpdFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwbG9hZExvY2FsQXJ0aWNsZShcbiAgICBwbHVnaW46IE15U2ltcGxlUGx1Z2luLFxuICAgIGZpbGU6IFRGaWxlLFxuICAgIGZvbGRlcjogc3RyaW5nXG4pIHtcbiAgICBjb25zdCBhZGFwdGVyID0gcGx1Z2luLmFwcC52YXVsdC5hZGFwdGVyO1xuXG4gICAgaWYgKCEoYWRhcHRlciBpbnN0YW5jZW9mIEZpbGVTeXN0ZW1BZGFwdGVyKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdTVGNTNcdTUyNEQgVmF1bHQgXHU0RTBEXHU2NjJGXHU2NzJDXHU1NzMwXHU2NTg3XHU0RUY2XHU3Q0ZCXHU3RURGXHVGRjBDXHU2NUUwXHU2Q0Q1XHU0RTBBXHU0RjIwXHU2NTg3XHU3QUUwXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHRlbXBEaXIgPSBhd2FpdCBwbHVnaW4uY2xvbmVUb1RlbXAoKTtcblxuICAgIHRyeSB7XG4gICAgICAgIGxldCBjbGVhbkZvbGRlciA9IGZvbGRlclxuICAgICAgICAgICAgLnRyaW0oKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFwvZywgXCIvXCIpXG4gICAgICAgICAgICAucmVwbGFjZSgvXlxcLyt8XFwvKyQvZywgXCJcIik7XG5cbiAgICAgICAgLy8gXHU5NjMyXHU2QjYyXHU5MDFBXHU4RkM3XHU2NTg3XHU0RUY2XHU1OTM5XHU4RjkzXHU1MTY1XHU4REYzXHU1MUZBIEdpdCBcdTRFMzRcdTY1RjZcdTRFRDNcdTVFOTNcdTMwMDJcbiAgICAgICAgY29uc3QgZm9sZGVyUGFydHMgPSBjbGVhbkZvbGRlclxuICAgICAgICAgICAgPyBjbGVhbkZvbGRlci5zcGxpdChcIi9cIikuZmlsdGVyKChwYXJ0KSA9PiBwYXJ0ICYmIHBhcnQgIT09IFwiLlwiICYmIHBhcnQgIT09IFwiLi5cIilcbiAgICAgICAgICAgIDogW107XG5cbiAgICAgICAgY2xlYW5Gb2xkZXIgPSBmb2xkZXJQYXJ0cy5qb2luKFwiL1wiKTtcblxuICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgcGx1Z2luLmFwcC52YXVsdC5yZWFkKGZpbGUpO1xuICAgICAgICBjb25zdCB0YXJnZXRSZWxhdGl2ZSA9IGNsZWFuRm9sZGVyXG4gICAgICAgICAgICA/IGAke2NsZWFuRm9sZGVyfS8ke2ZpbGUuYmFzZW5hbWV9Lm1kYFxuICAgICAgICAgICAgOiBgJHtmaWxlLmJhc2VuYW1lfS5tZGA7XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0QWJzb2x1dGUgPSBwYXRoLnJlc29sdmUodGVtcERpciwgdGFyZ2V0UmVsYXRpdmUpO1xuXG4gICAgICAgIC8vIFx1Nzg2RVx1NEZERFx1NzZFRVx1NjgwN1x1OERFRlx1NUY4NFx1NEVDRFx1NzEzNlx1NEY0RFx1NEU4RVx1NEUzNFx1NjVGNlx1NEVEM1x1NUU5M1x1NTE4NVx1OTBFOFx1MzAwMlxuICAgICAgICBjb25zdCBub3JtYWxpemVkVGVtcCA9IHBhdGgucmVzb2x2ZSh0ZW1wRGlyKSArIHBhdGguc2VwO1xuICAgICAgICBpZiAoIXRhcmdldEFic29sdXRlLnN0YXJ0c1dpdGgobm9ybWFsaXplZFRlbXApKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdTY1RTBcdTY1NDhcdTc2ODQgR2l0IFx1NjU4N1x1NEVGNlx1NTkzOVx1OERFRlx1NUY4NFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZzLm1rZGlyU3luYyhwYXRoLmRpcm5hbWUodGFyZ2V0QWJzb2x1dGUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblxuICAgICAgICBjb25zdCBleGlzdHMgPSBmcy5leGlzdHNTeW5jKHRhcmdldEFic29sdXRlKTtcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyh0YXJnZXRBYnNvbHV0ZSwgY29udGVudCwgXCJ1dGY4XCIpO1xuXG4gICAgICAgIGNvbnN0IGdpdCA9IHNpbXBsZUdpdCh7XG4gICAgICAgICAgICBiYXNlRGlyOiB0ZW1wRGlyLFxuICAgICAgICAgICAgdHJpbW1lZDogdHJ1ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHBsdWdpbi5zZXR0aW5ncy5zc2hLZXkudHJpbSgpKSB7XG4gICAgICAgICAgICBjb25zdCBrZXlQYXRoID0gcGF0aC5qb2luKFxuICAgICAgICAgICAgICAgIG9zLnRtcGRpcigpLFxuICAgICAgICAgICAgICAgIGBvYnNpZGlhbi1naXQta2V5LSR7RGF0ZS5ub3coKX1gXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZzLndyaXRlRmlsZVN5bmMoXG4gICAgICAgICAgICAgICAgICAgIGtleVBhdGgsXG4gICAgICAgICAgICAgICAgICAgIHBsdWdpbi5zZXR0aW5ncy5zc2hLZXkudHJpbSgpICsgXCJcXG5cIixcbiAgICAgICAgICAgICAgICAgICAgeyBtb2RlOiAwbzYwMCB9XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGdpdC5lbnYoe1xuICAgICAgICAgICAgICAgICAgICAuLi5wcm9jZXNzLmVudixcbiAgICAgICAgICAgICAgICAgICAgR0lUX1NTSF9DT01NQU5EOlxuICAgICAgICAgICAgICAgICAgICAgICAgYHNzaCAtaSBcIiR7a2V5UGF0aH1cIiAtbyBTdHJpY3RIb3N0S2V5Q2hlY2tpbmc9bm8gLW8gVXNlcktub3duSG9zdHNGaWxlPS9kZXYvbnVsbGAsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBhd2FpdCBjb21taXRBbmRQdXNoQXJ0aWNsZShcbiAgICAgICAgICAgICAgICAgICAgZ2l0LFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRSZWxhdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgZmlsZS5iYXNlbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RzXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoa2V5UGF0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZzLnVubGlua1N5bmMoa2V5UGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gXHU1RkZEXHU3NTY1XHU0RTM0XHU2NUY2XHU1QkM2XHU5NEE1XHU2RTA1XHU3NDA2XHU1OTMxXHU4RDI1XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCBjb21taXRBbmRQdXNoQXJ0aWNsZShcbiAgICAgICAgICAgICAgICBnaXQsXG4gICAgICAgICAgICAgICAgdGFyZ2V0UmVsYXRpdmUsXG4gICAgICAgICAgICAgICAgZmlsZS5iYXNlbmFtZSxcbiAgICAgICAgICAgICAgICBleGlzdHNcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgICBwbHVnaW4ucmVtb3ZlVGVtcERpcih0ZW1wRGlyKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNvbW1pdEFuZFB1c2hBcnRpY2xlKFxuICAgIGdpdDogUmV0dXJuVHlwZTx0eXBlb2Ygc2ltcGxlR2l0PixcbiAgICB0YXJnZXRSZWxhdGl2ZTogc3RyaW5nLFxuICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgZXhpc3RlZDogYm9vbGVhblxuKSB7XG4gICAgYXdhaXQgZ2l0LmFkZCh0YXJnZXRSZWxhdGl2ZSk7XG5cbiAgICBjb25zdCBzdGF0dXMgPSBhd2FpdCBnaXQuc3RhdHVzKCk7XG4gICAgaWYgKCFzdGF0dXMuc3RhZ2VkLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdTY1ODdcdTdBRTBcdTUxODVcdTVCQjlcdTZDQTFcdTY3MDlcdTUzRDhcdTUzMTZcdUZGMENcdTY1RTBcdTk3MDBcdTRFMEFcdTRGMjBcIik7XG4gICAgfVxuXG4gICAgY29uc3QgYWN0aW9uID0gZXhpc3RlZCA/IFwiXHU2NkY0XHU2NUIwXCIgOiBcIlx1NEUwQVx1NEYyMFwiO1xuICAgIGF3YWl0IGdpdC5jb21taXQoYGRvY3M6ICR7YWN0aW9ufSAke3RpdGxlfWApO1xuICAgIGF3YWl0IGdpdC5wdXNoKCk7XG5cbiAgICBjb25zb2xlLmxvZyhgR2l0ICR7YWN0aW9ufVx1NUI4Q1x1NjIxMFx1RkYxQSR7dGFyZ2V0UmVsYXRpdmV9YCk7XG59Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQSw2QkFBQUEsVUFBQUMsU0FBQTtBQUlBLFFBQUksSUFBSTtBQUNSLFFBQUlDLEtBQUksSUFBSTtBQUNaLFFBQUlDLEtBQUlELEtBQUk7QUFDWixRQUFJRSxLQUFJRCxLQUFJO0FBQ1osUUFBSUUsS0FBSUQsS0FBSTtBQUNaLFFBQUlFLEtBQUlGLEtBQUk7QUFnQlosSUFBQUgsUUFBTyxVQUFVLFNBQVUsS0FBSyxTQUFTO0FBQ3ZDLGdCQUFVLFdBQVcsQ0FBQztBQUN0QixVQUFJLE9BQU8sT0FBTztBQUNsQixVQUFJLFNBQVMsWUFBWSxJQUFJLFNBQVMsR0FBRztBQUN2QyxlQUFPLE1BQU0sR0FBRztBQUFBLE1BQ2xCLFdBQVcsU0FBUyxZQUFZLFNBQVMsR0FBRyxHQUFHO0FBQzdDLGVBQU8sUUFBUSxPQUFPLFFBQVEsR0FBRyxJQUFJLFNBQVMsR0FBRztBQUFBLE1BQ25EO0FBQ0EsWUFBTSxJQUFJO0FBQUEsUUFDUiwwREFDRSxLQUFLLFVBQVUsR0FBRztBQUFBLE1BQ3RCO0FBQUEsSUFDRjtBQVVBLGFBQVMsTUFBTSxLQUFLO0FBQ2xCLFlBQU0sT0FBTyxHQUFHO0FBQ2hCLFVBQUksSUFBSSxTQUFTLEtBQUs7QUFDcEI7QUFBQSxNQUNGO0FBQ0EsVUFBSSxRQUFRLG1JQUFt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O0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRDtBQVdBLGFBQVMsWUFBWTtBQUlwQixVQUFJLE9BQU8sV0FBVyxlQUFlLE9BQU8sWUFBWSxPQUFPLFFBQVEsU0FBUyxjQUFjLE9BQU8sUUFBUSxTQUFTO0FBQ3JILGVBQU87QUFBQSxNQUNSO0FBR0EsVUFBSSxPQUFPLGNBQWMsZUFBZSxVQUFVLGFB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IiwgImV4cG9ydHMiLCAibW9kdWxlIiwgIm1zIiwgInYiLCAibnMiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAibSIsICJjIiwgInIiLCAidiIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJfIiwgImsiLCAidXNlQ29sb3JzIiwgImMiLCAidiIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJwYXRoIiwgImV4cG9ydHMiLCAiX19leHBvcnQiLCAiZXhwb3J0cyIsICJpbXBvcnRfb2JzaWRpYW4iLCAiY2FjaGUiLCAicGF0aHNwZWMiLCAicGF0aHMiLCAia2V5IiwgImlzUGF0aFNwZWMiLCAidmFsdWUiLCAidG9QYXRocyIsICJzY29wZWRGbGFncyIsICJmbGFncyIsICJzY29wZSIsICJmaW5kR2xvYmFsIiwgImZsYWciLCAiQ09ORklHX1dSSVRFX0ZMQUdTIiwgIkNPTkZJR19SRUFEX0ZMQUdTIiwgIkNPTkZJR19XUklURV9WRVJCUyIsICJDT05GSUdfUkVBRF9WRVJCUyIsICJkZXRlY3RDb25maWdBY3Rpb24iLCAicG9zaXRpb25hbHMiLCAibmFtZSIsICJjb25maWdPcGVyYXRpb24iLCAidmVyYiIsICJpc1dyaXRlIiwgImtleSIsICJ0b09wZXJhdGlvbiIsICJvcGVyYXRpb24iLCAicGFyc2VBc3NpZ25tZW50IiwgInJhdyIsICJlcSIsICJkZXRlY3RDb25maWdTY29wZSIsICJkZXRlY3RDb25maWdPdmVycmlkZVNjb3BlIiwgImNvbGxlY3RXcml0ZUZsYWdzIiwgImFzc2lnbm1lbnQiLCAiY29sbGVjdENvbmZpZ0FjY2VzcyIsICJ0YXNrIiwgInBhcnNlZENvbmZpZyIsICJhcHBlbmRQYXJzZWRDb25maWdBY3Rpb24iLCAiYWN0aW9uIiwgImNvbmZpZyIsICJVTklWRVJTQUwiLCAiR0xPQkFMIiwgIkNPTU1BTkRTIiwgIkVNUFRZIiwgImdldEZsYWdTcGVjRm9yVGFzayIsICJzcGVjIiwgImV4cGFuZFRva2VuIiwgInN0ZW0iLCAiY2hhciIsICJjb25zdW1lcyIsICJleHBhbmRDbHVzdGVyIiwgInNob3J0U3BlYyIsICJjaGFycyIsICJyZXN1bHQiLCAiaSIsICJyZW1haW5kZXIiLCAiYyIsICJwYXJzZUdsb2JhbEZsYWdzIiwgInRva2VucyIsICJwYXJzZWQiLCAibmV4dCIsICJ0b2tlbiIsICJwYXJzZVRhc2tGbGFncyIsICJwYXRoc3BlY3MiLCAiY3VycmVudCIsICJpc1BhdGhTcGVjIiwgInRvUGF0aHMiLCAiaiIsICJ0IiwgImRldGVjdFZ1bG5lcmFibGVDb25maWdXcml0ZXMiLCAid3JpdGUiLCAiaGVscGVyIiwgInByZXZlbnRVbnNhZmVDb25maWciLCAidnVsbmVyYWJpbGl0eSIsICJwcmV2ZW50Q29uZmlnQnVpbGRlciIsICJjYXRlZ29yeSIsICJtZXNzYWdlIiwgInJlZ2V4IiwgInByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIiLCAiZGV0ZWN0VnVsbmVyYWJsZUZsYWdzIiwgInByZXZlbnRVbnNhZmVGbGFncyIsICJwcmV2ZW50RmxhZ0J1aWxkZXIiLCAiZ2xvYmFsT25seSIsICJ3aXRoVmFsdWUiLCAiY3VycmVudFRhc2siLCAicGF0aFRha2luZ0dsb2JhbCIsICJ2dWxuZXJhYmlsaXR5QW5hbHlzaXMiLCAicGFyc2VBcmd2IiwgInRhc2tJbmRleCIsICJ0YXNrVG9rZW5zIiwgInRvUGFyc2VkRmxhZyIsICJ2dWxuZXJhYmlsaXR5TGlzdCIsICJ2dWxuZXJhYmlsaXRpZXMiLCAidmFsdWUiLCAiR2l0RW52S2V5cyIsICJjb2xsZWN0Q29uZmlnQnlDb3VudCIsICJlbnYiLCAiY291bnQiLCAiaW5kZXgiLCAiY29sbGVjdENvbmZpZ1Z1bG5lcmFiaWxpdGllcyIsICJpc0dpdEVudktleSIsICJwcmVwYXJlRW52IiwgImdpdEVudiIsICJlbnZLZXkiLCAicGFyc2VFbnYiLCAidnVsbmVyYWJpbGl0eUNoZWNrIiwgIkdpdEVycm9yIiwgInRhc2siLCAibWVzc2FnZSIsICJHaXRDb25zdHJ1Y3RFcnJvciIsICJjb25maWciLCAiR2l0UGx1Z2luRXJyb3IiLCAicGx1Z2luIiwgIkdpdFJlc3BvbnNlRXJyb3IiLCAiZ2l0IiwgIlRhc2tDb25maWd1cmF0aW9uRXJyb3IiLCAiTlVMTCIsICJOT09QIiwgImFzRnVuY3Rpb24iLCAic291cmNlIiwgImlzVXNlckZ1bmN0aW9uIiwgInNwbGl0T24iLCAiaW5wdXQiLCAiY2hhciIsICJpbmRleCIsICJmaXJzdCIsICJvZmZzZXQiLCAiaXNBcnJheUxpa2UiLCAibGFzdCIsICJmaWx0ZXJIYXNMZW5ndGgiLCAidG9MaW5lc1dpdGhDb250ZW50IiwgInRyaW1tZWQiLCAic2VwYXJhdG9yIiwgIm91dHB1dCIsICJsaW5lIiwgImxpbmVDb250ZW50IiwgImZvckVhY2hMaW5lV2l0aENvbnRlbnQiLCAiY2FsbGJhY2siLCAiZm9sZGVyRXhpc3RzIiwgInBhdGgiLCAiZXhpc3RzIiwgIkZPTERFUiIsICJhcHBlbmQiLCAidGFyZ2V0IiwgIml0ZW0iLCAiaW5jbHVkaW5nIiwgInJlbW92ZSIsICJvYmplY3RUb1N0cmluZyIsICJhc0FycmF5IiwgImFzQ2FtZWxDYXNlIiwgInN0ciIsICJfYWxsIiwgImNociIsICJhc1N0cmluZ0FycmF5IiwgImFzTnVtYmVyIiwgIm9uTmFOIiwgIm51bSIsICJwcmVmaXhlZEFycmF5IiwgInByZWZpeCIsICJpIiwgIm1heCIsICJidWZmZXJUb1N0cmluZyIsICJieXRlTGVuZ3RoIiwgInBpY2siLCAicHJvcGVydGllcyIsICJvdXQiLCAia2V5IiwgImRlbGF5IiwgImR1cmF0aW9uIiwgImRvbmUiLCAib3JWb2lkIiwgImZpbHRlclR5cGUiLCAiZmlsdGVyIiwgImRlZiIsICJmaWx0ZXJBcnJheSIsICJmaWx0ZXJQcmltaXRpdmVzIiwgIm9taXQiLCAidHlwZSIsICJpc1BhdGhTcGVjIiwgImZpbHRlclN0cmluZyIsICJmaWx0ZXJTdHJpbmdPckJ1ZmZlciIsICJmaWx0ZXJTdHJpbmdPclN0cmluZ0FycmF5IiwgImZpbHRlclBsYWluT2JqZWN0IiwgImZpbHRlckZ1bmN0aW9uIiwgIkV4aXRDb2RlcyIsICJHaXRPdXRwdXRTdHJlYW1zIiwgInN0ZE91dCIsICJzdGRFcnIiLCAidXNlTWF0Y2hlc0RlZmF1bHQiLCAiTGluZVBhcnNlciIsICJyZWdFeHAiLCAidXNlTWF0Y2hlcyIsICJyZWciLCAibWF0Y2hlZCIsICJfaW5kZXgiLCAiUmVtb3RlTGluZVBhcnNlciIsICJkZWZhdWx0T3B0aW9ucyIsICJjcmVhdGVJbnN0YW5jZUNvbmZpZyIsICJvcHRpb25zIiwgImJhc2VEaXIiLCAibyIsICJhcHBlbmRUYXNrT3B0aW9ucyIsICJjb21tYW5kcyIsICJ2YWx1ZSIsICJ2IiwgImdldFRyYWlsaW5nT3B0aW9ucyIsICJhcmdzIiwgImluaXRpYWxQcmltaXRpdmUiLCAib2JqZWN0T25seSIsICJjb21tYW5kIiwgInRyYWlsaW5nT3B0aW9uc0FyZ3VtZW50IiwgInRyYWlsaW5nQXJyYXlBcmd1bWVudCIsICJoYXNUcmFpbGluZ0NhbGxiYWNrIiwgInRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudCIsICJpbmNsdWRlTm9vcCIsICJjYWxsVGFza1BhcnNlciIsICJwYXJzZXIiLCAic3RyZWFtcyIsICJwYXJzZVN0cmluZ1Jlc3BvbnNlIiwgInJlc3VsdCIsICJwYXJzZXJzIiwgInRleHRzIiwgInRyaW0iLCAidGV4dCIsICJsaW5lcyIsICJwYXJzZSIsICJvbkVycm9yIiwgImV4aXRDb2RlIiwgImVycm9yIiwgImRvbmUiLCAiZmFpbCIsICJFeGl0Q29kZXMiLCAiaXNOb3RSZXBvTWVzc2FnZSIsICJwYXJzZXIiLCAidGV4dCIsICJjaGVja0lzUmVwb1Rhc2siLCAiYWN0aW9uIiwgImNoZWNrSXNCYXJlUmVwb1Rhc2siLCAiY2hlY2tJc1JlcG9Sb290VGFzayIsICJwYXRoIiwgIkNsZWFuUmVzcG9uc2UiLCAiZHJ5UnVuIiwgInJlbW92YWxSZWdleHAiLCAiZHJ5UnVuUmVtb3ZhbFJlZ2V4cCIsICJpc0ZvbGRlclJlZ2V4cCIsICJjbGVhblN1bW1hcnlQYXJzZXIiLCAic3VtbWFyeSIsICJyZWdleHAiLCAidG9MaW5lc1dpdGhDb250ZW50IiwgImxpbmUiLCAicmVtb3ZlZCIsICJFTVBUWV9DT01NQU5EUyIsICJhZGhvY0V4ZWNUYXNrIiwgImNvbmZpZ3VyYXRpb25FcnJvclRhc2siLCAiVGFza0NvbmZpZ3VyYXRpb25FcnJvciIsICJzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrIiwgImNvbW1hbmRzIiwgInRyaW1tZWQiLCAic3RyYWlnaHRUaHJvdWdoQnVmZmVyVGFzayIsICJidWZmZXIiLCAiaXNCdWZmZXJUYXNrIiwgInRhc2siLCAiaXNFbXB0eVRhc2siLCAiQ09ORklHX0VSUk9SX0lOVEVSQUNUSVZFX01PREUiLCAiQ09ORklHX0VSUk9SX01PREVfUkVRVUlSRUQiLCAiQ09ORklHX0VSUk9SX1VOS05PV05fT1BUSU9OIiwgIkNsZWFuT3B0aW9ucyIsICJDbGVhbk9wdGlvblZhbHVlcyIsICJhc1N0cmluZ0FycmF5IiwgImNsZWFuV2l0aE9wdGlvbnNUYXNrIiwgIm1vZGUiLCAiY3VzdG9tQXJncyIsICJjbGVhbk1vZGUiLCAib3B0aW9ucyIsICJ2YWxpZCIsICJnZXRDbGVhbk9wdGlvbnMiLCAiaXNJbnRlcmFjdGl2ZU1vZGUiLCAiY2xlYW5UYXNrIiwgImlzQ2xlYW5PcHRpb25zQXJyYXkiLCAiaW5wdXQiLCAidGVzdCIsICJjaGFyIiwgImlzQ2xlYW5Nb2RlIiwgImlzS25vd25PcHRpb24iLCAib3B0aW9uIiwgIkNvbmZpZ0xpc3QiLCAiYWxsIiwgImZpbGUiLCAibGF0ZXN0IiwgImxhc3QiLCAia2V5IiwgInZhbHVlIiwgInZhbHVlcyIsICJjb25maWdMaXN0UGFyc2VyIiwgImNvbmZpZyIsICJpdGVtIiwgImNvbmZpZ1BhcnNlciIsICJjb25maWdHZXRQYXJzZXIiLCAic2NvcGVzIiwgImNvbmZpZ0ZpbGVQYXRoIiwgImZpbGVQYXRoIiwgInJlcXVlc3RlZEtleSIsICJsaW5lcyIsICJpIiwgIm1heCIsICJzcGxpdE9uIiwgIkdpdENvbmZpZ1Njb3BlIiwgImFzQ29uZmlnU2NvcGUiLCAic2NvcGUiLCAiZmFsbGJhY2siLCAiYWRkQ29uZmlnVGFzayIsICJhcHBlbmQiLCAiZ2V0Q29uZmlnVGFzayIsICJsaXN0Q29uZmlnVGFzayIsICJyZXN0IiwgInRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudCIsICJEaWZmTmFtZVN0YXR1cyIsICJkaWZmTmFtZVN0YXR1cyIsICJpc0RpZmZOYW1lU3RhdHVzIiwgIl9hIiwgImRpc2FsbG93ZWRPcHRpb25zIiwgIlF1ZXJ5IiwgIkdyZXBRdWVyeSIsICJxdWVyeSIsICJhbmQiLCAicHJlZml4ZWRBcnJheSIsICJwYXJhbSIsICJncmVwUXVlcnlCdWlsZGVyIiwgInBhcmFtcyIsICJwYXJzZUdyZXAiLCAiZ3JlcCIsICJwYXRocyIsICJyZXN1bHRzIiwgImZvckVhY2hMaW5lV2l0aENvbnRlbnQiLCAicHJldmlldyIsICJOVUxMIiwgImFzTnVtYmVyIiwgInNlYXJjaFRlcm0iLCAidGhlbiIsICJnZXRUcmFpbGluZ09wdGlvbnMiLCAic3RkT3V0IiwgIlJlc2V0TW9kZSIsICJ2YWxpZFJlc2V0TW9kZXMiLCAicmVzZXRUYXNrIiwgImlzVmFsaWRSZXNldE1vZGUiLCAiZ2V0UmVzZXRNb2RlIiwgImRlYnVnIiwgImZpbHRlckhhc0xlbmd0aCIsICJvYmplY3RUb1N0cmluZyIsICJjcmVhdGVMb2ciLCAicHJlZml4ZWRMb2dnZXIiLCAidG8iLCAicHJlZml4IiwgImZvcndhcmQiLCAibWVzc2FnZSIsICJhcmdzIiwgImNoaWxkTG9nZ2VyTmFtZSIsICJuYW1lIiwgImNoaWxkRGVidWdnZXIiLCAicGFyZW50TmFtZXNwYWNlIiwgImNoaWxkTmFtZXNwYWNlIiwgImNyZWF0ZUxvZ2dlciIsICJsYWJlbCIsICJ2ZXJib3NlIiwgImluaXRpYWxTdGVwIiwgImluZm9EZWJ1Z2dlciIsICJsYWJlbFByZWZpeCIsICJzcGF3bmVkIiwgImRlYnVnRGVidWdnZXIiLCAiZmlsdGVyVHlwZSIsICJmaWx0ZXJTdHJpbmciLCAic3RlcCIsICJzaWJsaW5nIiwgImluaXRpYWwiLCAicGhhc2UiLCAic3RlcFByZWZpeCIsICJOT09QIiwgImluZm8iLCAiX1Rhc2tzUGVuZGluZ1F1ZXVlIiwgImxvZ0xhYmVsIiwgImxvZ2dlciIsICJwcm9ncmVzcyIsICJlcnIiLCAiR2l0RXJyb3IiLCAiVGFza3NQZW5kaW5nUXVldWUiLCAiR2l0RXhlY3V0b3JDaGFpbiIsICJfZXhlY3V0b3IiLCAiX3NjaGVkdWxlciIsICJfcGx1Z2lucyIsICJjd2QiLCAib25TY2hlZHVsZUNvbXBsZXRlIiwgIm9uUXVldWVDb21wbGV0ZSIsICJlIiwgImdpdEVycm9yIiwgImJpbmFyeSIsICJyYXciLCAib3V0cHV0U3RyZWFtcyIsICJjYWxsVGFza1BhcnNlciIsICJyZXN1bHQiLCAicmVqZWN0aW9uIiwgInN0ZEVyciIsICJuZXdTdGRPdXQiLCAiR2l0T3V0cHV0U3RyZWFtcyIsICJjb21tYW5kIiwgIm91dHB1dEhhbmRsZXIiLCAib3V0cHV0TG9nZ2VyIiwgInNwYXduT3B0aW9ucyIsICJyZWFzb24iLCAic3Bhd24iLCAib25EYXRhUmVjZWl2ZWQiLCAib25FcnJvclJlY2VpdmVkIiwgImZpcnN0IiwgInRhcmdldCIsICJvdXRwdXQiLCAiR2l0RXhlY3V0b3IiLCAidGFza0NhbGxiYWNrIiwgInJlc3BvbnNlIiwgImNhbGxiYWNrIiwgIm9uU3VjY2VzcyIsICJkYXRhIiwgImNoYW5nZVdvcmtpbmdEaXJlY3RvcnlUYXNrIiwgImRpcmVjdG9yeSIsICJyb290IiwgImluc3RhbmNlIiwgImZvbGRlckV4aXN0cyIsICJjaGVja291dFRhc2siLCAicmVtb3ZlIiwgImNoZWNrb3V0IiwgImJyYW5jaE5hbWUiLCAic3RhcnRQb2ludCIsICJjbG9uZVRhc2siLCAicmVwbyIsICJwYXRoc3BlYyIsICJjbG9uZU1pcnJvclRhc2siLCAiY3JlYXRlQ2xvbmVUYXNrIiwgImFwaSIsICJyZXBvUGF0aCIsICJjbG9uZSIsICJwYXJzZXJzIiwgIkxpbmVQYXJzZXIiLCAiYnJhbmNoIiwgImNvbW1pdCIsICJhdXRob3IiLCAicGFydHMiLCAiZW1haWwiLCAiY2hhbmdlcyIsICJpbnNlcnRpb25zIiwgImRlbGV0aW9ucyIsICJkaXJlY3Rpb24iLCAiY291bnQiLCAicGFyc2VDb21taXRSZXN1bHQiLCAicGFyc2VTdHJpbmdSZXNwb25zZSIsICJjb21taXRUYXNrIiwgImZpbGVzIiwgIm5leHQiLCAicmVqZWN0RGVwcmVjYXRlZFNpZ25hdHVyZXMiLCAiYXNBcnJheSIsICJmaWx0ZXJTdHJpbmdPclN0cmluZ0FycmF5IiwgImZpbHRlckFycmF5IiwgImNvdW50T2JqZWN0c1Jlc3BvbnNlIiwgInByb3BlcnR5IiwgImFzQ2FtZWxDYXNlIiwgImNvdW50T2JqZWN0cyIsICJmaXJzdENvbW1pdCIsICJoYXNoT2JqZWN0VGFzayIsICJ3cml0ZSIsICJJbml0U3VtbWFyeSIsICJiYXJlIiwgImV4aXN0aW5nIiwgImdpdERpciIsICJpbml0UmVzcG9uc2VSZWdleCIsICJyZUluaXRSZXNwb25zZVJlZ2V4IiwgInBhcnNlSW5pdCIsICJ0b2tlbnMiLCAiYmFyZUNvbW1hbmQiLCAiaGFzQmFyZUNvbW1hbmQiLCAiaW5pdFRhc2siLCAiaW50ZXJwcmV0VHJhaWxlcnNUYXNrIiwgImluZGV4IiwgImludGVycHJldFRyYWlsZXJzIiwgImZpbHRlclN0cmluZ09yQnVmZmVyIiwgIkxvZ0Zvcm1hdCIsICJsb2dGb3JtYXRSZWdleCIsICJsb2dGb3JtYXRGcm9tQ29tbWFuZCIsICJmb3JtYXQiLCAiaXNMb2dGb3JtYXQiLCAiY3VzdG9tQXJnIiwgIkRpZmZTdW1tYXJ5IiwgInN0YXRQYXJzZXIiLCAiYWx0ZXJhdGlvbnMiLCAiYmVmb3JlIiwgImFmdGVyIiwgImNoYW5nZWQiLCAiaW5zZXJ0ZWQiLCAiZGVsZXRlZCIsICJudW1TdGF0UGFyc2VyIiwgImNoYW5nZXNJbnNlcnQiLCAiY2hhbmdlc0RlbGV0ZSIsICJuYW1lT25seVBhcnNlciIsICJuYW1lU3RhdHVzUGFyc2VyIiwgInN0YXR1cyIsICJzaW1pbGFyaXR5IiwgImZyb20iLCAiX3RvIiwgIm9yVm9pZCIsICJkaWZmU3VtbWFyeVBhcnNlcnMiLCAiZ2V0RGlmZlBhcnNlciIsICJTVEFSVF9CT1VOREFSWSIsICJDT01NSVRfQk9VTkRBUlkiLCAiU1BMSVRURVIiLCAiZGVmYXVsdEZpZWxkTmFtZXMiLCAibGluZUJ1aWxkZXIiLCAiZmllbGRzIiwgImZpZWxkIiwgImNyZWF0ZUxpc3RMb2dTdW1tYXJ5UGFyc2VyIiwgInNwbGl0dGVyIiwgImxvZ0Zvcm1hdCIsICJwYXJzZURpZmZSZXN1bHQiLCAibGluZURldGFpbCIsICJsaXN0TG9nTGluZSIsICJkaWZmU3VtbWFyeVRhc2siLCAidmFsaWRhdGVMb2dGb3JtYXRDb25maWciLCAiZmxhZ3MiLCAiZXhjbHVkZU9wdGlvbnMiLCAicHJldHR5Rm9ybWF0IiwgImZvcm1hdFN0ciIsICJ1c2VyT3B0aW9ucyIsICJvdXQiLCAicGFyc2VMb2dPcHRpb25zIiwgIm9wdCIsICJmaWx0ZXJQbGFpbk9iamVjdCIsICJzdWZmaXgiLCAibWF4Q291bnQiLCAicmFuZ2VPcGVyYXRvciIsICJhcHBlbmRUYXNrT3B0aW9ucyIsICJsb2dUYXNrIiwgImxvZyIsICJ0cmFpbGluZ09wdGlvbnNBcmd1bWVudCIsICJjcmVhdGVMb2dUYXNrIiwgIk1lcmdlU3VtbWFyeUNvbmZsaWN0IiwgIm1ldGEiLCAiTWVyZ2VTdW1tYXJ5RGV0YWlsIiwgIlB1bGxTdW1tYXJ5IiwgIlB1bGxGYWlsZWRTdW1tYXJ5IiwgIm9iamVjdEVudW1lcmF0aW9uUmVzdWx0IiwgInJlbW90ZU1lc3NhZ2VzIiwgImFzT2JqZWN0Q291bnQiLCAic291cmNlIiwgImRlbHRhIiwgInJlbW90ZU1lc3NhZ2VzT2JqZWN0UGFyc2VycyIsICJSZW1vdGVMaW5lUGFyc2VyIiwgImVudW1lcmF0aW9uIiwgInRvdGFsIiwgInJldXNlZCIsICJwYWNrUmV1c2VkIiwgIm9iamVjdHMiLCAicHVsbFJlcXVlc3RVcmwiLCAidXJsIiwgInBhcnNlUmVtb3RlTWVzc2FnZXMiLCAiX3N0ZE91dCIsICJSZW1vdGVNZXNzYWdlU3VtbWFyeSIsICJGSUxFX1VQREFURV9SRUdFWCIsICJTVU1NQVJZX1JFR0VYIiwgIkFDVElPTl9SRUdFWCIsICJlcnJvclBhcnNlcnMiLCAicmVtb3RlIiwgImhhc2hMb2NhbCIsICJoYXNoUmVtb3RlIiwgImJyYW5jaExvY2FsIiwgImJyYW5jaFJlbW90ZSIsICJwYXJzZVB1bGxEZXRhaWwiLCAicGFyc2VQdWxsUmVzdWx0IiwgInBhcnNlUHVsbEVycm9yUmVzdWx0IiwgInB1bGxFcnJvciIsICJhdXRvTWVyZ2UiLCAiZGVsZXRlUmVmIiwgInBhcnNlTWVyZ2VSZXN1bHQiLCAicGFyc2VNZXJnZURldGFpbCIsICJtZXJnZVRhc2siLCAibWVyZ2UiLCAiR2l0UmVzcG9uc2VFcnJvciIsICJwdXNoUmVzdWx0UHVzaGVkSXRlbSIsICJsb2NhbCIsICJ0YWciLCAiYWxyZWFkeVVwZGF0ZWQiLCAidHlwZSIsICJyZW1vdGVOYW1lIiwgInBhcnNlUHVzaFJlc3VsdCIsICJwdXNoRGV0YWlsIiwgInBhcnNlUHVzaERldGFpbCIsICJyZXNwb25zZURldGFpbCIsICJwdXNoVGFnc1Rhc2siLCAicmVmIiwgInB1c2hUYXNrIiwgInNob3ciLCAiZnJvbVBhdGhSZWdleCIsICJGaWxlU3RhdHVzU3VtbWFyeSIsICJ3b3JraW5nX2RpciIsICJkZXRhaWwiLCAiU3RhdHVzU3VtbWFyeSIsICJyZW5hbWVkRmlsZSIsICJpbmRleFgiLCAiaW5kZXhZIiwgImhhbmRsZXIiLCAiY29uZmxpY3RzIiwgInkiLCAicmVuYW1lZCIsICJfcmVzdWx0IiwgIl9maWxlIiwgImFoZWFkUmVnIiwgImJlaGluZFJlZyIsICJjdXJyZW50UmVnIiwgInRyYWNraW5nUmVnIiwgIm9uRW1wdHlCcmFuY2hSZWciLCAicmVnZXhSZXN1bHQiLCAicGFyc2VTdGF0dXNTdW1tYXJ5IiwgImwiLCAic3BsaXRMaW5lIiwgImxpbmVTdHIiLCAid29ya2luZ0RpciIsICJpZ25vcmVkT3B0aW9ucyIsICJzdGF0dXNUYXNrIiwgImFyZyIsICJOT1RfSU5TVEFMTEVEIiwgInZlcnNpb25SZXNwb25zZSIsICJtYWpvciIsICJtaW5vciIsICJwYXRjaCIsICJhZ2VudCIsICJpbnN0YWxsZWQiLCAibm90SW5zdGFsbGVkUmVzcG9uc2UiLCAidmVyc2lvbiIsICJ2ZXJzaW9uUGFyc2VyIiwgIlNpbXBsZUdpdEFwaSIsICJjaGFpbiIsICJwcm9taXNlIiwgImNyZWF0ZVNjaGVkdWxlZFRhc2siLCAiaWQiLCAiY3JlYXRlRGVmZXJyZWQiLCAiU2NoZWR1bGVyIiwgImNvbmN1cnJlbmN5IiwgImFwcGx5UGF0Y2hUYXNrIiwgInBhdGNoZXMiLCAiQnJhbmNoU3RhdHVzSWRlbnRpZmllciIsICJCcmFuY2hTdW1tYXJ5UmVzdWx0IiwgImRldGFjaGVkIiwgImN1cnJlbnQiLCAiYnJhbmNoU3RhdHVzIiwgImN1cnJlbnRCcmFuY2hQYXJzZXIiLCAicGFyc2VCcmFuY2hTdW1tYXJ5IiwgImN1cnJlbnRPbmx5IiwgIkJyYW5jaERlbGV0aW9uQmF0Y2giLCAiYnJhbmNoRGVsZXRpb25TdWNjZXNzIiwgImhhc2giLCAiYnJhbmNoRGVsZXRpb25GYWlsdXJlIiwgImRlbGV0ZVN1Y2Nlc3NSZWdleCIsICJkZWxldGVFcnJvclJlZ2V4IiwgImRlbGV0aW9uIiwgInBhcnNlQnJhbmNoRGVsZXRpb25zIiwgImhhc0JyYW5jaERlbGV0aW9uRXJyb3IiLCAicHJvY2Vzc0V4aXRDb2RlIiwgImNvbnRhaW5zRGVsZXRlQnJhbmNoQ29tbWFuZCIsICJkZWxldGVDb21tYW5kcyIsICJicmFuY2hUYXNrIiwgImlzRGVsZXRlIiwgImlzQ3VycmVudE9ubHkiLCAiYnJhbmNoTG9jYWxUYXNrIiwgImRlbGV0ZUJyYW5jaGVzVGFzayIsICJicmFuY2hlcyIsICJmb3JjZURlbGV0ZSIsICJkZWxldGVCcmFuY2hUYXNrIiwgIl8iLCAiYnVmZmVyVG9TdHJpbmciLCAiY2hlY2tJZ25vcmVUYXNrIiwgInBhcnNlQ2hlY2tJZ25vcmUiLCAidG9QYXRoIiwgIm5vcm1hbGl6ZSIsICJ0cmFja2luZyIsICJwYXJzZUZldGNoUmVzdWx0IiwgImRpc2FsbG93ZWRDb21tYW5kIiwgImZldGNoVGFzayIsICJwYXJzZU1vdmVSZXN1bHQiLCAibW92ZVRhc2siLCAicHVsbFRhc2siLCAiX2Vycm9yIiwgIl9kb25lIiwgInBhcnNlR2V0UmVtb3RlcyIsICJyZW1vdGVzIiwgImZvckVhY2giLCAicGFyc2VHZXRSZW1vdGVzVmVyYm9zZSIsICJwdXJwb3NlIiwgImFkZFJlbW90ZVRhc2siLCAicmVtb3RlUmVwbyIsICJnZXRSZW1vdGVzVGFzayIsICJsaXN0UmVtb3Rlc1Rhc2siLCAicmVtb3RlVGFzayIsICJyZW1vdmVSZW1vdGVUYXNrIiwgInN0YXNoTGlzdFRhc2siLCAiYWRkU3ViTW9kdWxlVGFzayIsICJzdWJNb2R1bGVUYXNrIiwgImluaXRTdWJNb2R1bGVUYXNrIiwgInVwZGF0ZVN1Yk1vZHVsZVRhc2siLCAiVGFnTGlzdCIsICJwYXJzZVRhZ0xpc3QiLCAiY3VzdG9tU29ydCIsICJ0YWdzIiwgInRhZ0EiLCAidGFnQiIsICJwYXJ0c0EiLCAicGFydHNCIiwgInNpbmdsZVNvcnRlZCIsICJ0b051bWJlciIsICJkaWZmIiwgInNvcnRlZCIsICJhIiwgImIiLCAiYUlzTnVtIiwgImJJc051bSIsICJ0YWdMaXN0VGFzayIsICJoYXNDdXN0b21Tb3J0IiwgImFkZFRhZ1Rhc2siLCAiYWRkQW5ub3RhdGVkVGFnVGFzayIsICJ0YWdNZXNzYWdlIiwgIkdpdCIsICJwbHVnaW5zIiwgImdpdCIsICJ0YWdOYW1lIiwgImJyYW5jaE5hbWVzIiwgImNyZWF0ZVJlc3RDb21tYW5kcyIsICJmaWx0ZXJQcmltaXRpdmVzIiwgInVzaW5nQ2xlYW5PcHRpb25zQXJyYXkiLCAicGF0aG5hbWVzIiwgImNoZWNrVHlwZSIsICJhYm9ydFBsdWdpbiIsICJzaWduYWwiLCAiX2RhdGEiLCAiY29udGV4dCIsICJHaXRQbHVnaW5FcnJvciIsICJraWxsIiwgImFsbG93RW52aXJvbm1lbnRQbHVnaW4iLCAiYWxsb3dFbnZpcm9ubWVudCIsICJhbGxvd0FiYnJldmlhdGVkT3B0aW9ucyIsICJhbGxvd2VkIiwgImVudiIsICJzdXBwbGllZEtleXMiLCAibm9ybWFsaXNlZCIsICJpc0d1YXJkZWRFbnZLZXkiLCAiaXNHaXRFbnZLZXkiLCAiYmxvY2tVbnNhZmVPcGVyYXRpb25zUGx1Z2luIiwgInZ1bG5lcmFiaWxpdHkiLCAidnVsbmVyYWJpbGl0eUNoZWNrIiwgImNvbW1hbmRDb25maWdQcmVmaXhpbmdQbHVnaW4iLCAiY29uZmlndXJhdGlvbiIsICJuZXZlciIsICJkZWZlcnJlZCIsICJjb21wbGV0aW9uRGV0ZWN0aW9uUGx1Z2luIiwgIm9uQ2xvc2UiLCAib25FeGl0IiwgImNyZWF0ZUV2ZW50cyIsICJldmVudHMiLCAiY29uZmlndXJlVGltZW91dCIsICJjb2RlIiwgImZsYWciLCAiZXZlbnQiLCAidGltZW91dCIsICJkZWxheSIsICJjbG9zZSIsICJkZWZlckNsb3NlIiwgInF1aWNrQ2xvc2UiLCAiV1JPTkdfTlVNQkVSX0VSUiIsICJXUk9OR19DSEFSU19FUlIiLCAiaXNCYWRBcmd1bWVudCIsICJ0b0JpbmFyeUNvbmZpZyIsICJhbGxvd1Vuc2FmZSIsICJjdXN0b21CaW5hcnlQbHVnaW4iLCAiUkVBU09OUyIsICJnZXRSZWFzb24iLCAiR2l0Q29uZmlndXJhdGlvbkVycm9yIiwgImlzVGFza0Vycm9yIiwgImdldEVycm9yTWVzc2FnZSIsICJlcnJvckRldGVjdGlvbkhhbmRsZXIiLCAib3ZlcndyaXRlIiwgImlzRXJyb3IiLCAiZXJyb3JNZXNzYWdlIiwgImNyZWF0ZUdpdEVycm9yIiwgImVycm9yRGV0ZWN0aW9uUGx1Z2luIiwgImlucHV0UGx1Z2luIiwgInRhc2tJbnB1dCIsICJzdGRpbiIsICJjb250ZW50IiwgImJ5dGVMZW5ndGgiLCAiUGx1Z2luU3RvcmUiLCAiRXZlbnRFbWl0dGVyIiwgImxpc3RlbmVyIiwgInBsdWdpbiIsICJjb250ZXh0dWFsIiwgInByb2dyZXNzTW9uaXRvclBsdWdpbiIsICJwcm9ncmVzc0NvbW1hbmQiLCAicHJvZ3Jlc3NNZXRob2RzIiwgImluY2x1ZGluZyIsICJjaHVuayIsICJwcm9ncmVzc0V2ZW50U3RhZ2UiLCAic3Bhd25PcHRpb25zUGx1Z2luIiwgInBpY2siLCAic3VmZml4UGF0aHNQbHVnaW4iLCAiaXNQYXRoU3BlYyIsICJ0b1BhdGhzIiwgInRpbWVvdXRQbHVnaW4iLCAiYmxvY2siLCAid2FpdCIsICJzdG9wIiwgInNpbXBsZUdpdCIsICJiYXNlRGlyIiwgImNyZWF0ZUluc3RhbmNlQ29uZmlnIiwgImFwaS5HaXRDb25zdHJ1Y3RFcnJvciIsICJmcyIsICJwYXRoIiwgIm9zIiwgInJlc29sdmUiLCAiaW1wb3J0X29ic2lkaWFuIiwgImZzIiwgImltcG9ydF9vYnNpZGlhbiIsICJmcyIsICJwYXRoIiwgIm9zIiwgImIiXQp9Cg==
