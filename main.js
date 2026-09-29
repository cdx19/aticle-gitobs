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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL21zL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvY29tbW9uLmpzIiwgIm5vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvYnJvd3Nlci5qcyIsICJub2RlX21vZHVsZXMvZGVidWcvc3JjL25vZGUuanMiLCAibm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvQGt3c2l0ZXMvZmlsZS1leGlzdHMvc3JjL2luZGV4LnRzIiwgIm5vZGVfbW9kdWxlcy9Aa3dzaXRlcy9maWxlLWV4aXN0cy9pbmRleC50cyIsICJub2RlX21vZHVsZXMvQGt3c2l0ZXMvcHJvbWlzZS1kZWZlcnJlZC9zcmMvaW5kZXgudHMiLCAibWFpbi50cyIsICJub2RlX21vZHVsZXMvQHNpbXBsZS1naXQvYXJncy1wYXRoc3BlYy9zcmMvcGF0aHNwZWMudHMiLCAibm9kZV9tb2R1bGVzL0BzaW1wbGUtZ2l0L2FyZ3YtcGFyc2VyL3NyYy9mbGFncy9mbGFncy5oZWxwZXJzLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvY29uZmlnL2NvbmZpZy1vcGVyYW5kcy50cyIsICJub2RlX21vZHVsZXMvQHNpbXBsZS1naXQvYXJndi1wYXJzZXIvc3JjL2NvbmZpZy9kZXRlY3QtY29uZmlnLWFjdGlvbi50cyIsICJub2RlX21vZHVsZXMvQHNpbXBsZS1naXQvYXJndi1wYXJzZXIvc3JjL2NvbmZpZy9hbmFseXNlLWNvbmZpZy50cyIsICJub2RlX21vZHVsZXMvQHNpbXBsZS1naXQvYXJndi1wYXJzZXIvc3JjL3Rva2Vucy9mbGFnLXNwZWNzLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvdG9rZW5zL3Rva2VuLWV4cGFuZGVyLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvZmxhZ3MvcGFyc2UtZ2xvYmFsLWZsYWdzLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvZmxhZ3MvcGFyc2UtdGFzay1mbGFncy50cyIsICJub2RlX21vZHVsZXMvQHNpbXBsZS1naXQvYXJndi1wYXJzZXIvc3JjL3Z1bG5lcmFiaWxpdGllcy9kZXRlY3QtdnVsbmVyYWJsZS1jb25maWctd3JpdGVzLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvdnVsbmVyYWJpbGl0aWVzL2RldGVjdC12dWxuZXJhYmxlLWZsYWdzLnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvdnVsbmVyYWJpbGl0aWVzL3Z1bG5lcmFiaWxpdHktYW5hbHlzaXMudHMiLCAibm9kZV9tb2R1bGVzL0BzaW1wbGUtZ2l0L2FyZ3YtcGFyc2VyL3NyYy9hcmdzL3BhcnNlLWFyZ3YudHMiLCAibm9kZV9tb2R1bGVzL0BzaW1wbGUtZ2l0L2FyZ3YtcGFyc2VyL3NyYy9lbnYvcGFyc2UtZW52LnRzIiwgIm5vZGVfbW9kdWxlcy9Ac2ltcGxlLWdpdC9hcmd2LXBhcnNlci9zcmMvdnVsbmVyYWJpbGl0aWVzL3Z1bG5lcmFiaWxpdHktY2hlY2sudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9lcnJvcnMvZ2l0LWVycm9yLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvZXJyb3JzL2dpdC1jb25zdHJ1Y3QtZXJyb3IudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9lcnJvcnMvZ2l0LXBsdWdpbi1lcnJvci50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL2Vycm9ycy9naXQtcmVzcG9uc2UtZXJyb3IudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9lcnJvcnMvdGFzay1jb25maWd1cmF0aW9uLWVycm9yLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdXRpbHMvdXRpbC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3V0aWxzL2FyZ3VtZW50LWZpbHRlcnMudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi91dGlscy9leGl0LWNvZGVzLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdXRpbHMvZ2l0LW91dHB1dC1zdHJlYW1zLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdXRpbHMvbGluZS1wYXJzZXIudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi91dGlscy9zaW1wbGUtZ2l0LW9wdGlvbnMudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi91dGlscy90YXNrLW9wdGlvbnMudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi91dGlscy90YXNrLXBhcnNlci50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2NoZWNrLWlzLXJlcG8udHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wYXJzZXJzL3BhcnNlLWNsZWFuLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvdGFzay50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2NsZWFuLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcmVzcG9uc2VzL0NvbmZpZ0xpc3QudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9jb25maWcudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9kaWZmLW5hbWUtc3RhdHVzLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvZ3JlcC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL3Jlc2V0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvZ2l0LWxvZ2dlci50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3J1bm5lcnMvdGFza3MtcGVuZGluZy1xdWV1ZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3J1bm5lcnMvZ2l0LWV4ZWN1dG9yLWNoYWluLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcnVubmVycy9naXQtZXhlY3V0b3IudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrLWNhbGxiYWNrLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvY2hhbmdlLXdvcmtpbmctZGlyZWN0b3J5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvY2hlY2tvdXQudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9jbG9uZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BhcnNlcnMvcGFyc2UtY29tbWl0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvY29tbWl0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvY291bnQtb2JqZWN0cy50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2ZpcnN0LWNvbW1pdC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2hhc2gtb2JqZWN0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcmVzcG9uc2VzL0luaXRTdW1tYXJ5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvaW5pdC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2ludGVycHJldC10cmFpbGVycy50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL2FyZ3MvbG9nLWZvcm1hdC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9EaWZmU3VtbWFyeS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BhcnNlcnMvcGFyc2UtZGlmZi1zdW1tYXJ5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGFyc2Vycy9wYXJzZS1saXN0LWxvZy1zdW1tYXJ5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvZGlmZi50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2xvZy50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9NZXJnZVN1bW1hcnkudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9yZXNwb25zZXMvUHVsbFN1bW1hcnkudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wYXJzZXJzL3BhcnNlLXJlbW90ZS1vYmplY3RzLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGFyc2Vycy9wYXJzZS1yZW1vdGUtbWVzc2FnZXMudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wYXJzZXJzL3BhcnNlLXB1bGwudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wYXJzZXJzL3BhcnNlLW1lcmdlLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvbWVyZ2UudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wYXJzZXJzL3BhcnNlLXB1c2gudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9wdXNoLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3Mvc2hvdy50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9GaWxlU3RhdHVzU3VtbWFyeS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9TdGF0dXNTdW1tYXJ5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3Mvc3RhdHVzLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvdmVyc2lvbi50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3NpbXBsZS1naXQtYXBpLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcnVubmVycy9zY2hlZHVsZXIudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9hcHBseS1wYXRjaC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9CcmFuY2hTdW1tYXJ5LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGFyc2Vycy9wYXJzZS1icmFuY2gudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9yZXNwb25zZXMvQnJhbmNoRGVsZXRlU3VtbWFyeS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BhcnNlcnMvcGFyc2UtYnJhbmNoLWRlbGV0ZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2JyYW5jaC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL2NoZWNrLWlnbm9yZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BhcnNlcnMvcGFyc2UtZmV0Y2gudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9mZXRjaC50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BhcnNlcnMvcGFyc2UtbW92ZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Rhc2tzL21vdmUudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9wdWxsLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcmVzcG9uc2VzL0dldFJlbW90ZVN1bW1hcnkudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9yZW1vdGUudHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi90YXNrcy9zdGFzaC1saXN0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3Mvc3ViLW1vZHVsZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3Jlc3BvbnNlcy9UYWdMaXN0LnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvdGFza3MvdGFnLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9naXQubWpzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9hYm9ydC1wbHVnaW4udHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wbHVnaW5zL2FsbG93LWVudmlyb25tZW50LnBsdWdpbi50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BsdWdpbnMvYmxvY2stdW5zYWZlLW9wZXJhdGlvbnMtcGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9jb21tYW5kLWNvbmZpZy1wcmVmaXhpbmctcGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9jb21wbGV0aW9uLWRldGVjdGlvbi5wbHVnaW4udHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wbHVnaW5zL2N1c3RvbS1iaW5hcnkucGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvZXJyb3JzL2dpdC1jb25maWd1cmF0aW9uLWVycm9yLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9lcnJvci1kZXRlY3Rpb24ucGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9pbnB1dC5wbHVnaW4udHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wbHVnaW5zL3BsdWdpbi1zdG9yZS50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL3BsdWdpbnMvcHJvZ3Jlc3MtbW9uaXRvci1wbHVnaW4udHMiLCAibm9kZV9tb2R1bGVzL3NpbXBsZS1naXQvc3JjL2xpYi9wbHVnaW5zL3NwYXduLW9wdGlvbnMtcGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy9zdWZmaXgtcGF0aHMucGx1Z2luLnRzIiwgIm5vZGVfbW9kdWxlcy9zaW1wbGUtZ2l0L3NyYy9saWIvcGx1Z2lucy90aW1lb3V0LXBsdWdpbi50cyIsICJub2RlX21vZHVsZXMvc2ltcGxlLWdpdC9zcmMvbGliL2dpdC1mYWN0b3J5LnRzIiwgInNyYy9zeW5jLnRzIiwgInNyYy9kb3dubG9hZC50cyIsICJzcmMvdXBsb2FkLnRzIiwgInNyYy9yZWZyZXNoLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIEhlbHBlcnMuXG4gKi9cblxudmFyIHMgPSAxMDAwO1xudmFyIG0gPSBzICogNjA7XG52YXIgaCA9IG0gKiA2MDtcbnZhciBkID0gaCAqIDI0O1xudmFyIHcgPSBkICogNztcbnZhciB5ID0gZCAqIDM2NS4yNTtcblxuLyoqXG4gKiBQYXJzZSBvciBmb3JtYXQgdGhlIGdpdmVuIGB2YWxgLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogIC0gYGxvbmdgIHZlcmJvc2UgZm9ybWF0dGluZyBbZmFsc2VdXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEB0aHJvd3Mge0Vycm9yfSB0aHJvdyBhbiBlcnJvciBpZiB2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIG51bWJlclxuICogQHJldHVybiB7U3RyaW5nfE51bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWw7XG4gIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBwYXJzZSh2YWwpO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmIGlzRmluaXRlKHZhbCkpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb25nID8gZm10TG9uZyh2YWwpIDogZm10U2hvcnQodmFsKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ3ZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgdmFsaWQgbnVtYmVyLiB2YWw9JyArXG4gICAgICBKU09OLnN0cmluZ2lmeSh2YWwpXG4gICk7XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBgc3RyYCBhbmQgcmV0dXJuIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZShzdHIpIHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChzdHIubGVuZ3RoID4gMTAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBtYXRjaCA9IC9eKC0/KD86XFxkKyk/XFwuP1xcZCspICoobWlsbGlzZWNvbmRzP3xtc2Vjcz98bXN8c2Vjb25kcz98c2Vjcz98c3xtaW51dGVzP3xtaW5zP3xtfGhvdXJzP3xocnM/fGh8ZGF5cz98ZHx3ZWVrcz98d3x5ZWFycz98eXJzP3x5KT8kL2kuZXhlYyhcbiAgICBzdHJcbiAgKTtcbiAgaWYgKCFtYXRjaCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbiA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuICB2YXIgdHlwZSA9IChtYXRjaFsyXSB8fCAnbXMnKS50b0xvd2VyQ2FzZSgpO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgY2FzZSAneWVhcic6XG4gICAgY2FzZSAneXJzJzpcbiAgICBjYXNlICd5cic6XG4gICAgY2FzZSAneSc6XG4gICAgICByZXR1cm4gbiAqIHk7XG4gICAgY2FzZSAnd2Vla3MnOlxuICAgIGNhc2UgJ3dlZWsnOlxuICAgIGNhc2UgJ3cnOlxuICAgICAgcmV0dXJuIG4gKiB3O1xuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZCc6XG4gICAgICByZXR1cm4gbiAqIGQ7XG4gICAgY2FzZSAnaG91cnMnOlxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hycyc6XG4gICAgY2FzZSAnaHInOlxuICAgIGNhc2UgJ2gnOlxuICAgICAgcmV0dXJuIG4gKiBoO1xuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgY2FzZSAnbWlucyc6XG4gICAgY2FzZSAnbWluJzpcbiAgICBjYXNlICdtJzpcbiAgICAgIHJldHVybiBuICogbTtcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICBjYXNlICdzZWNvbmQnOlxuICAgIGNhc2UgJ3NlY3MnOlxuICAgIGNhc2UgJ3NlYyc6XG4gICAgY2FzZSAncyc6XG4gICAgICByZXR1cm4gbiAqIHM7XG4gICAgY2FzZSAnbWlsbGlzZWNvbmRzJzpcbiAgICBjYXNlICdtaWxsaXNlY29uZCc6XG4gICAgY2FzZSAnbXNlY3MnOlxuICAgIGNhc2UgJ21zZWMnOlxuICAgIGNhc2UgJ21zJzpcbiAgICAgIHJldHVybiBuO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbi8qKlxuICogU2hvcnQgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10U2hvcnQobXMpIHtcbiAgdmFyIG1zQWJzID0gTWF0aC5hYnMobXMpO1xuICBpZiAobXNBYnMgPj0gZCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gZCkgKyAnZCc7XG4gIH1cbiAgaWYgKG1zQWJzID49IGgpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGgpICsgJ2gnO1xuICB9XG4gIGlmIChtc0FicyA+PSBtKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBtKSArICdtJztcbiAgfVxuICBpZiAobXNBYnMgPj0gcykge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gcykgKyAncyc7XG4gIH1cbiAgcmV0dXJuIG1zICsgJ21zJztcbn1cblxuLyoqXG4gKiBMb25nIGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdExvbmcobXMpIHtcbiAgdmFyIG1zQWJzID0gTWF0aC5hYnMobXMpO1xuICBpZiAobXNBYnMgPj0gZCkge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBkLCAnZGF5Jyk7XG4gIH1cbiAgaWYgKG1zQWJzID49IGgpIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgaCwgJ2hvdXInKTtcbiAgfVxuICBpZiAobXNBYnMgPj0gbSkge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBtLCAnbWludXRlJyk7XG4gIH1cbiAgaWYgKG1zQWJzID49IHMpIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgcywgJ3NlY29uZCcpO1xuICB9XG4gIHJldHVybiBtcyArICcgbXMnO1xufVxuXG4vKipcbiAqIFBsdXJhbGl6YXRpb24gaGVscGVyLlxuICovXG5cbmZ1bmN0aW9uIHBsdXJhbChtcywgbXNBYnMsIG4sIG5hbWUpIHtcbiAgdmFyIGlzUGx1cmFsID0gbXNBYnMgPj0gbiAqIDEuNTtcbiAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBuKSArICcgJyArIG5hbWUgKyAoaXNQbHVyYWwgPyAncycgOiAnJyk7XG59XG4iLCAiXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNvbW1vbiBsb2dpYyBmb3IgYm90aCB0aGUgTm9kZS5qcyBhbmQgd2ViIGJyb3dzZXJcbiAqIGltcGxlbWVudGF0aW9ucyBvZiBgZGVidWcoKWAuXG4gKi9cblxuZnVuY3Rpb24gc2V0dXAoZW52KSB7XG5cdGNyZWF0ZURlYnVnLmRlYnVnID0gY3JlYXRlRGVidWc7XG5cdGNyZWF0ZURlYnVnLmRlZmF1bHQgPSBjcmVhdGVEZWJ1Zztcblx0Y3JlYXRlRGVidWcuY29lcmNlID0gY29lcmNlO1xuXHRjcmVhdGVEZWJ1Zy5kaXNhYmxlID0gZGlzYWJsZTtcblx0Y3JlYXRlRGVidWcuZW5hYmxlID0gZW5hYmxlO1xuXHRjcmVhdGVEZWJ1Zy5lbmFibGVkID0gZW5hYmxlZDtcblx0Y3JlYXRlRGVidWcuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXHRjcmVhdGVEZWJ1Zy5kZXN0cm95ID0gZGVzdHJveTtcblxuXHRPYmplY3Qua2V5cyhlbnYpLmZvckVhY2goa2V5ID0+IHtcblx0XHRjcmVhdGVEZWJ1Z1trZXldID0gZW52W2tleV07XG5cdH0pO1xuXG5cdC8qKlxuXHQqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuXHQqL1xuXG5cdGNyZWF0ZURlYnVnLm5hbWVzID0gW107XG5cdGNyZWF0ZURlYnVnLnNraXBzID0gW107XG5cblx0LyoqXG5cdCogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuXHQqXG5cdCogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXIgb3IgdXBwZXItY2FzZSBsZXR0ZXIsIGkuZS4gXCJuXCIgYW5kIFwiTlwiLlxuXHQqL1xuXHRjcmVhdGVEZWJ1Zy5mb3JtYXR0ZXJzID0ge307XG5cblx0LyoqXG5cdCogU2VsZWN0cyBhIGNvbG9yIGZvciBhIGRlYnVnIG5hbWVzcGFjZVxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2UgVGhlIG5hbWVzcGFjZSBzdHJpbmcgZm9yIHRoZSBkZWJ1ZyBpbnN0YW5jZSB0byBiZSBjb2xvcmVkXG5cdCogQHJldHVybiB7TnVtYmVyfFN0cmluZ30gQW4gQU5TSSBjb2xvciBjb2RlIGZvciB0aGUgZ2l2ZW4gbmFtZXNwYWNlXG5cdCogQGFwaSBwcml2YXRlXG5cdCovXG5cdGZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuXHRcdGxldCBoYXNoID0gMDtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXNwYWNlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcblx0XHRcdGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNyZWF0ZURlYnVnLmNvbG9yc1tNYXRoLmFicyhoYXNoKSAlIGNyZWF0ZURlYnVnLmNvbG9ycy5sZW5ndGhdO1xuXHR9XG5cdGNyZWF0ZURlYnVnLnNlbGVjdENvbG9yID0gc2VsZWN0Q29sb3I7XG5cblx0LyoqXG5cdCogQ3JlYXRlIGEgZGVidWdnZXIgd2l0aCB0aGUgZ2l2ZW4gYG5hbWVzcGFjZWAuXG5cdCpcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG5cdCogQHJldHVybiB7RnVuY3Rpb259XG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cdFx0bGV0IHByZXZUaW1lO1xuXHRcdGxldCBlbmFibGVPdmVycmlkZSA9IG51bGw7XG5cdFx0bGV0IG5hbWVzcGFjZXNDYWNoZTtcblx0XHRsZXQgZW5hYmxlZENhY2hlO1xuXG5cdFx0ZnVuY3Rpb24gZGVidWcoLi4uYXJncykge1xuXHRcdFx0Ly8gRGlzYWJsZWQ/XG5cdFx0XHRpZiAoIWRlYnVnLmVuYWJsZWQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBzZWxmID0gZGVidWc7XG5cblx0XHRcdC8vIFNldCBgZGlmZmAgdGltZXN0YW1wXG5cdFx0XHRjb25zdCBjdXJyID0gTnVtYmVyKG5ldyBEYXRlKCkpO1xuXHRcdFx0Y29uc3QgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuXHRcdFx0c2VsZi5kaWZmID0gbXM7XG5cdFx0XHRzZWxmLnByZXYgPSBwcmV2VGltZTtcblx0XHRcdHNlbGYuY3VyciA9IGN1cnI7XG5cdFx0XHRwcmV2VGltZSA9IGN1cnI7XG5cblx0XHRcdGFyZ3NbMF0gPSBjcmVhdGVEZWJ1Zy5jb2VyY2UoYXJnc1swXSk7XG5cblx0XHRcdGlmICh0eXBlb2YgYXJnc1swXSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdFx0Ly8gQW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJU9cblx0XHRcdFx0YXJncy51bnNoaWZ0KCclTycpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBcHBseSBhbnkgYGZvcm1hdHRlcnNgIHRyYW5zZm9ybWF0aW9uc1xuXHRcdFx0bGV0IGluZGV4ID0gMDtcblx0XHRcdGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCAobWF0Y2gsIGZvcm1hdCkgPT4ge1xuXHRcdFx0XHQvLyBJZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG5cdFx0XHRcdGlmIChtYXRjaCA9PT0gJyUlJykge1xuXHRcdFx0XHRcdHJldHVybiAnJSc7XG5cdFx0XHRcdH1cblx0XHRcdFx0aW5kZXgrKztcblx0XHRcdFx0Y29uc3QgZm9ybWF0dGVyID0gY3JlYXRlRGVidWcuZm9ybWF0dGVyc1tmb3JtYXRdO1xuXHRcdFx0XHRpZiAodHlwZW9mIGZvcm1hdHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdGNvbnN0IHZhbCA9IGFyZ3NbaW5kZXhdO1xuXHRcdFx0XHRcdG1hdGNoID0gZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsKTtcblxuXHRcdFx0XHRcdC8vIE5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcblx0XHRcdFx0XHRhcmdzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRcdFx0aW5kZXgtLTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gbWF0Y2g7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gQXBwbHkgZW52LXNwZWNpZmljIGZvcm1hdHRpbmcgKGNvbG9ycywgZXRjLilcblx0XHRcdGNyZWF0ZURlYnVnLmZvcm1hdEFyZ3MuY2FsbChzZWxmLCBhcmdzKTtcblxuXHRcdFx0Y29uc3QgbG9nRm4gPSBzZWxmLmxvZyB8fCBjcmVhdGVEZWJ1Zy5sb2c7XG5cdFx0XHRsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcblx0XHR9XG5cblx0XHRkZWJ1Zy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG5cdFx0ZGVidWcudXNlQ29sb3JzID0gY3JlYXRlRGVidWcudXNlQ29sb3JzKCk7XG5cdFx0ZGVidWcuY29sb3IgPSBjcmVhdGVEZWJ1Zy5zZWxlY3RDb2xvcihuYW1lc3BhY2UpO1xuXHRcdGRlYnVnLmV4dGVuZCA9IGV4dGVuZDtcblx0XHRkZWJ1Zy5kZXN0cm95ID0gY3JlYXRlRGVidWcuZGVzdHJveTsgLy8gWFhYIFRlbXBvcmFyeS4gV2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UuXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVidWcsICdlbmFibGVkJywge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHRnZXQ6ICgpID0+IHtcblx0XHRcdFx0aWYgKGVuYWJsZU92ZXJyaWRlICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVuYWJsZU92ZXJyaWRlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChuYW1lc3BhY2VzQ2FjaGUgIT09IGNyZWF0ZURlYnVnLm5hbWVzcGFjZXMpIHtcblx0XHRcdFx0XHRuYW1lc3BhY2VzQ2FjaGUgPSBjcmVhdGVEZWJ1Zy5uYW1lc3BhY2VzO1xuXHRcdFx0XHRcdGVuYWJsZWRDYWNoZSA9IGNyZWF0ZURlYnVnLmVuYWJsZWQobmFtZXNwYWNlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBlbmFibGVkQ2FjaGU7XG5cdFx0XHR9LFxuXHRcdFx0c2V0OiB2ID0+IHtcblx0XHRcdFx0ZW5hYmxlT3ZlcnJpZGUgPSB2O1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gRW52LXNwZWNpZmljIGluaXRpYWxpemF0aW9uIGxvZ2ljIGZvciBkZWJ1ZyBpbnN0YW5jZXNcblx0XHRpZiAodHlwZW9mIGNyZWF0ZURlYnVnLmluaXQgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdGNyZWF0ZURlYnVnLmluaXQoZGVidWcpO1xuXHRcdH1cblxuXHRcdHJldHVybiBkZWJ1Zztcblx0fVxuXG5cdGZ1bmN0aW9uIGV4dGVuZChuYW1lc3BhY2UsIGRlbGltaXRlcikge1xuXHRcdGNvbnN0IG5ld0RlYnVnID0gY3JlYXRlRGVidWcodGhpcy5uYW1lc3BhY2UgKyAodHlwZW9mIGRlbGltaXRlciA9PT0gJ3VuZGVmaW5lZCcgPyAnOicgOiBkZWxpbWl0ZXIpICsgbmFtZXNwYWNlKTtcblx0XHRuZXdEZWJ1Zy5sb2cgPSB0aGlzLmxvZztcblx0XHRyZXR1cm4gbmV3RGVidWc7XG5cdH1cblxuXHQvKipcblx0KiBFbmFibGVzIGEgZGVidWcgbW9kZSBieSBuYW1lc3BhY2VzLiBUaGlzIGNhbiBpbmNsdWRlIG1vZGVzXG5cdCogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cblx0KlxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcblx0XHRjcmVhdGVEZWJ1Zy5zYXZlKG5hbWVzcGFjZXMpO1xuXHRcdGNyZWF0ZURlYnVnLm5hbWVzcGFjZXMgPSBuYW1lc3BhY2VzO1xuXG5cdFx0Y3JlYXRlRGVidWcubmFtZXMgPSBbXTtcblx0XHRjcmVhdGVEZWJ1Zy5za2lwcyA9IFtdO1xuXG5cdFx0Y29uc3Qgc3BsaXQgPSAodHlwZW9mIG5hbWVzcGFjZXMgPT09ICdzdHJpbmcnID8gbmFtZXNwYWNlcyA6ICcnKVxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL1xccysvZywgJywnKVxuXHRcdFx0LnNwbGl0KCcsJylcblx0XHRcdC5maWx0ZXIoQm9vbGVhbik7XG5cblx0XHRmb3IgKGNvbnN0IG5zIG9mIHNwbGl0KSB7XG5cdFx0XHRpZiAobnNbMF0gPT09ICctJykge1xuXHRcdFx0XHRjcmVhdGVEZWJ1Zy5za2lwcy5wdXNoKG5zLnNsaWNlKDEpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNyZWF0ZURlYnVnLm5hbWVzLnB1c2gobnMpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVja3MgaWYgdGhlIGdpdmVuIHN0cmluZyBtYXRjaGVzIGEgbmFtZXNwYWNlIHRlbXBsYXRlLCBob25vcmluZ1xuXHQgKiBhc3Rlcmlza3MgYXMgd2lsZGNhcmRzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc2VhcmNoXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0ZW1wbGF0ZVxuXHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHQgKi9cblx0ZnVuY3Rpb24gbWF0Y2hlc1RlbXBsYXRlKHNlYXJjaCwgdGVtcGxhdGUpIHtcblx0XHRsZXQgc2VhcmNoSW5kZXggPSAwO1xuXHRcdGxldCB0ZW1wbGF0ZUluZGV4ID0gMDtcblx0XHRsZXQgc3RhckluZGV4ID0gLTE7XG5cdFx0bGV0IG1hdGNoSW5kZXggPSAwO1xuXG5cdFx0d2hpbGUgKHNlYXJjaEluZGV4IDwgc2VhcmNoLmxlbmd0aCkge1xuXHRcdFx0aWYgKHRlbXBsYXRlSW5kZXggPCB0ZW1wbGF0ZS5sZW5ndGggJiYgKHRlbXBsYXRlW3RlbXBsYXRlSW5kZXhdID09PSBzZWFyY2hbc2VhcmNoSW5kZXhdIHx8IHRlbXBsYXRlW3RlbXBsYXRlSW5kZXhdID09PSAnKicpKSB7XG5cdFx0XHRcdC8vIE1hdGNoIGNoYXJhY3RlciBvciBwcm9jZWVkIHdpdGggd2lsZGNhcmRcblx0XHRcdFx0aWYgKHRlbXBsYXRlW3RlbXBsYXRlSW5kZXhdID09PSAnKicpIHtcblx0XHRcdFx0XHRzdGFySW5kZXggPSB0ZW1wbGF0ZUluZGV4O1xuXHRcdFx0XHRcdG1hdGNoSW5kZXggPSBzZWFyY2hJbmRleDtcblx0XHRcdFx0XHR0ZW1wbGF0ZUluZGV4Kys7IC8vIFNraXAgdGhlICcqJ1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNlYXJjaEluZGV4Kys7XG5cdFx0XHRcdFx0dGVtcGxhdGVJbmRleCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHN0YXJJbmRleCAhPT0gLTEpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZWdhdGVkLWNvbmRpdGlvblxuXHRcdFx0XHQvLyBCYWNrdHJhY2sgdG8gdGhlIGxhc3QgJyonIGFuZCB0cnkgdG8gbWF0Y2ggbW9yZSBjaGFyYWN0ZXJzXG5cdFx0XHRcdHRlbXBsYXRlSW5kZXggPSBzdGFySW5kZXggKyAxO1xuXHRcdFx0XHRtYXRjaEluZGV4Kys7XG5cdFx0XHRcdHNlYXJjaEluZGV4ID0gbWF0Y2hJbmRleDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTsgLy8gTm8gbWF0Y2hcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBIYW5kbGUgdHJhaWxpbmcgJyonIGluIHRlbXBsYXRlXG5cdFx0d2hpbGUgKHRlbXBsYXRlSW5kZXggPCB0ZW1wbGF0ZS5sZW5ndGggJiYgdGVtcGxhdGVbdGVtcGxhdGVJbmRleF0gPT09ICcqJykge1xuXHRcdFx0dGVtcGxhdGVJbmRleCsrO1xuXHRcdH1cblxuXHRcdHJldHVybiB0ZW1wbGF0ZUluZGV4ID09PSB0ZW1wbGF0ZS5sZW5ndGg7XG5cdH1cblxuXHQvKipcblx0KiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cblx0KlxuXHQqIEByZXR1cm4ge1N0cmluZ30gbmFtZXNwYWNlc1xuXHQqIEBhcGkgcHVibGljXG5cdCovXG5cdGZ1bmN0aW9uIGRpc2FibGUoKSB7XG5cdFx0Y29uc3QgbmFtZXNwYWNlcyA9IFtcblx0XHRcdC4uLmNyZWF0ZURlYnVnLm5hbWVzLFxuXHRcdFx0Li4uY3JlYXRlRGVidWcuc2tpcHMubWFwKG5hbWVzcGFjZSA9PiAnLScgKyBuYW1lc3BhY2UpXG5cdFx0XS5qb2luKCcsJyk7XG5cdFx0Y3JlYXRlRGVidWcuZW5hYmxlKCcnKTtcblx0XHRyZXR1cm4gbmFtZXNwYWNlcztcblx0fVxuXG5cdC8qKlxuXHQqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbW9kZSBuYW1lIGlzIGVuYWJsZWQsIGZhbHNlIG90aGVyd2lzZS5cblx0KlxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG5cdCogQHJldHVybiB7Qm9vbGVhbn1cblx0KiBAYXBpIHB1YmxpY1xuXHQqL1xuXHRmdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcblx0XHRmb3IgKGNvbnN0IHNraXAgb2YgY3JlYXRlRGVidWcuc2tpcHMpIHtcblx0XHRcdGlmIChtYXRjaGVzVGVtcGxhdGUobmFtZSwgc2tpcCkpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAoY29uc3QgbnMgb2YgY3JlYXRlRGVidWcubmFtZXMpIHtcblx0XHRcdGlmIChtYXRjaGVzVGVtcGxhdGUobmFtZSwgbnMpKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQqIENvZXJjZSBgdmFsYC5cblx0KlxuXHQqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuXHQqIEByZXR1cm4ge01peGVkfVxuXHQqIEBhcGkgcHJpdmF0ZVxuXHQqL1xuXHRmdW5jdGlvbiBjb2VyY2UodmFsKSB7XG5cdFx0aWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0XHRyZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsO1xuXHR9XG5cblx0LyoqXG5cdCogWFhYIERPIE5PVCBVU0UuIFRoaXMgaXMgYSB0ZW1wb3Jhcnkgc3R1YiBmdW5jdGlvbi5cblx0KiBYWFggSXQgV0lMTCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UuXG5cdCovXG5cdGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG5cdFx0Y29uc29sZS53YXJuKCdJbnN0YW5jZSBtZXRob2QgYGRlYnVnLmRlc3Ryb3koKWAgaXMgZGVwcmVjYXRlZCBhbmQgbm8gbG9uZ2VyIGRvZXMgYW55dGhpbmcuIEl0IHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uIG9mIGBkZWJ1Z2AuJyk7XG5cdH1cblxuXHRjcmVhdGVEZWJ1Zy5lbmFibGUoY3JlYXRlRGVidWcubG9hZCgpKTtcblxuXHRyZXR1cm4gY3JlYXRlRGVidWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0dXA7XG4iLCAiLyogZXNsaW50LWVudiBicm93c2VyICovXG5cbi8qKlxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuZXhwb3J0cy5zdG9yYWdlID0gbG9jYWxzdG9yYWdlKCk7XG5leHBvcnRzLmRlc3Ryb3kgPSAoKCkgPT4ge1xuXHRsZXQgd2FybmVkID0gZmFsc2U7XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRpZiAoIXdhcm5lZCkge1xuXHRcdFx0d2FybmVkID0gdHJ1ZTtcblx0XHRcdGNvbnNvbGUud2FybignSW5zdGFuY2UgbWV0aG9kIGBkZWJ1Zy5kZXN0cm95KClgIGlzIGRlcHJlY2F0ZWQgYW5kIG5vIGxvbmdlciBkb2VzIGFueXRoaW5nLiBJdCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbiBvZiBgZGVidWdgLicpO1xuXHRcdH1cblx0fTtcbn0pKCk7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gW1xuXHQnIzAwMDBDQycsXG5cdCcjMDAwMEZGJyxcblx0JyMwMDMzQ0MnLFxuXHQnIzAwMzNGRicsXG5cdCcjMDA2NkNDJyxcblx0JyMwMDY2RkYnLFxuXHQnIzAwOTlDQycsXG5cdCcjMDA5OUZGJyxcblx0JyMwMENDMDAnLFxuXHQnIzAwQ0MzMycsXG5cdCcjMDBDQzY2Jyxcblx0JyMwMENDOTknLFxuXHQnIzAwQ0NDQycsXG5cdCcjMDBDQ0ZGJyxcblx0JyMzMzAwQ0MnLFxuXHQnIzMzMDBGRicsXG5cdCcjMzMzM0NDJyxcblx0JyMzMzMzRkYnLFxuXHQnIzMzNjZDQycsXG5cdCcjMzM2NkZGJyxcblx0JyMzMzk5Q0MnLFxuXHQnIzMzOTlGRicsXG5cdCcjMzNDQzAwJyxcblx0JyMzM0NDMzMnLFxuXHQnIzMzQ0M2NicsXG5cdCcjMzNDQzk5Jyxcblx0JyMzM0NDQ0MnLFxuXHQnIzMzQ0NGRicsXG5cdCcjNjYwMENDJyxcblx0JyM2NjAwRkYnLFxuXHQnIzY2MzNDQycsXG5cdCcjNjYzM0ZGJyxcblx0JyM2NkNDMDAnLFxuXHQnIzY2Q0MzMycsXG5cdCcjOTkwMENDJyxcblx0JyM5OTAwRkYnLFxuXHQnIzk5MzNDQycsXG5cdCcjOTkzM0ZGJyxcblx0JyM5OUNDMDAnLFxuXHQnIzk5Q0MzMycsXG5cdCcjQ0MwMDAwJyxcblx0JyNDQzAwMzMnLFxuXHQnI0NDMDA2NicsXG5cdCcjQ0MwMDk5Jyxcblx0JyNDQzAwQ0MnLFxuXHQnI0NDMDBGRicsXG5cdCcjQ0MzMzAwJyxcblx0JyNDQzMzMzMnLFxuXHQnI0NDMzM2NicsXG5cdCcjQ0MzMzk5Jyxcblx0JyNDQzMzQ0MnLFxuXHQnI0NDMzNGRicsXG5cdCcjQ0M2NjAwJyxcblx0JyNDQzY2MzMnLFxuXHQnI0NDOTkwMCcsXG5cdCcjQ0M5OTMzJyxcblx0JyNDQ0NDMDAnLFxuXHQnI0NDQ0MzMycsXG5cdCcjRkYwMDAwJyxcblx0JyNGRjAwMzMnLFxuXHQnI0ZGMDA2NicsXG5cdCcjRkYwMDk5Jyxcblx0JyNGRjAwQ0MnLFxuXHQnI0ZGMDBGRicsXG5cdCcjRkYzMzAwJyxcblx0JyNGRjMzMzMnLFxuXHQnI0ZGMzM2NicsXG5cdCcjRkYzMzk5Jyxcblx0JyNGRjMzQ0MnLFxuXHQnI0ZGMzNGRicsXG5cdCcjRkY2NjAwJyxcblx0JyNGRjY2MzMnLFxuXHQnI0ZGOTkwMCcsXG5cdCcjRkY5OTMzJyxcblx0JyNGRkNDMDAnLFxuXHQnI0ZGQ0MzMydcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbmZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcblx0Ly8gTkI6IEluIGFuIEVsZWN0cm9uIHByZWxvYWQgc2NyaXB0LCBkb2N1bWVudCB3aWxsIGJlIGRlZmluZWQgYnV0IG5vdCBmdWxseVxuXHQvLyBpbml0aWFsaXplZC4gU2luY2Ugd2Uga25vdyB3ZSdyZSBpbiBDaHJvbWUsIHdlJ2xsIGp1c3QgZGV0ZWN0IHRoaXMgY2FzZVxuXHQvLyBleHBsaWNpdGx5XG5cdGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucHJvY2VzcyAmJiAod2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJyB8fCB3aW5kb3cucHJvY2Vzcy5fX253anMpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvLyBJbnRlcm5ldCBFeHBsb3JlciBhbmQgRWRnZSBkbyBub3Qgc3VwcG9ydCBjb2xvcnMuXG5cdGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvKGVkZ2V8dHJpZGVudClcXC8oXFxkKykvKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGxldCBtO1xuXG5cdC8vIElzIHdlYmtpdD8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY0NTk2MDYvMzc2NzczXG5cdC8vIGRvY3VtZW50IGlzIHVuZGVmaW5lZCBpbiByZWFjdC1uYXRpdmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvcHVsbC8xNjMyXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXR1cm4tYXNzaWduXG5cdHJldHVybiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5XZWJraXRBcHBlYXJhbmNlKSB8fFxuXHRcdC8vIElzIGZpcmVidWc/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM5ODEyMC8zNzY3NzNcblx0XHQodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNvbnNvbGUgJiYgKHdpbmRvdy5jb25zb2xlLmZpcmVidWcgfHwgKHdpbmRvdy5jb25zb2xlLmV4Y2VwdGlvbiAmJiB3aW5kb3cuY29uc29sZS50YWJsZSkpKSB8fFxuXHRcdC8vIElzIGZpcmVmb3ggPj0gdjMxP1xuXHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuXHRcdCh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIChtID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykpICYmIHBhcnNlSW50KG1bMV0sIDEwKSA+PSAzMSkgfHxcblx0XHQvLyBEb3VibGUgY2hlY2sgd2Via2l0IGluIHVzZXJBZ2VudCBqdXN0IGluIGNhc2Ugd2UgYXJlIGluIGEgd29ya2VyXG5cdFx0KHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9hcHBsZXdlYmtpdFxcLyhcXGQrKS8pKTtcbn1cblxuLyoqXG4gKiBDb2xvcml6ZSBsb2cgYXJndW1lbnRzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcblx0YXJnc1swXSA9ICh0aGlzLnVzZUNvbG9ycyA/ICclYycgOiAnJykgK1xuXHRcdHRoaXMubmFtZXNwYWNlICtcblx0XHQodGhpcy51c2VDb2xvcnMgPyAnICVjJyA6ICcgJykgK1xuXHRcdGFyZ3NbMF0gK1xuXHRcdCh0aGlzLnVzZUNvbG9ycyA/ICclYyAnIDogJyAnKSArXG5cdFx0JysnICsgbW9kdWxlLmV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtcblxuXHRpZiAoIXRoaXMudXNlQ29sb3JzKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG5cdGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpO1xuXG5cdC8vIFRoZSBmaW5hbCBcIiVjXCIgaXMgc29tZXdoYXQgdHJpY2t5LCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyXG5cdC8vIGFyZ3VtZW50cyBwYXNzZWQgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgJWMsIHNvIHdlIG5lZWQgdG9cblx0Ly8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBpbmRleCB0byBpbnNlcnQgdGhlIENTUyBpbnRvXG5cdGxldCBpbmRleCA9IDA7XG5cdGxldCBsYXN0QyA9IDA7XG5cdGFyZ3NbMF0ucmVwbGFjZSgvJVthLXpBLVolXS9nLCBtYXRjaCA9PiB7XG5cdFx0aWYgKG1hdGNoID09PSAnJSUnKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGluZGV4Kys7XG5cdFx0aWYgKG1hdGNoID09PSAnJWMnKSB7XG5cdFx0XHQvLyBXZSBvbmx5IGFyZSBpbnRlcmVzdGVkIGluIHRoZSAqbGFzdCogJWNcblx0XHRcdC8vICh0aGUgdXNlciBtYXkgaGF2ZSBwcm92aWRlZCB0aGVpciBvd24pXG5cdFx0XHRsYXN0QyA9IGluZGV4O1xuXHRcdH1cblx0fSk7XG5cblx0YXJncy5zcGxpY2UobGFzdEMsIDAsIGMpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYGNvbnNvbGUuZGVidWcoKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmRlYnVnYCBpcyBub3QgYSBcImZ1bmN0aW9uXCIuXG4gKiBJZiBgY29uc29sZS5kZWJ1Z2AgaXMgbm90IGF2YWlsYWJsZSwgZmFsbHMgYmFja1xuICogdG8gYGNvbnNvbGUubG9nYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnRzLmxvZyA9IGNvbnNvbGUuZGVidWcgfHwgY29uc29sZS5sb2cgfHwgKCgpID0+IHt9KTtcblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNhdmUobmFtZXNwYWNlcykge1xuXHR0cnkge1xuXHRcdGlmIChuYW1lc3BhY2VzKSB7XG5cdFx0XHRleHBvcnRzLnN0b3JhZ2Uuc2V0SXRlbSgnZGVidWcnLCBuYW1lc3BhY2VzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFN3YWxsb3dcblx0XHQvLyBYWFggKEBRaXgtKSBzaG91bGQgd2UgYmUgbG9nZ2luZyB0aGVzZT9cblx0fVxufVxuXG4vKipcbiAqIExvYWQgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gcmV0dXJucyB0aGUgcHJldmlvdXNseSBwZXJzaXN0ZWQgZGVidWcgbW9kZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsb2FkKCkge1xuXHRsZXQgcjtcblx0dHJ5IHtcblx0XHRyID0gZXhwb3J0cy5zdG9yYWdlLmdldEl0ZW0oJ2RlYnVnJykgfHwgZXhwb3J0cy5zdG9yYWdlLmdldEl0ZW0oJ0RFQlVHJykgO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFN3YWxsb3dcblx0XHQvLyBYWFggKEBRaXgtKSBzaG91bGQgd2UgYmUgbG9nZ2luZyB0aGVzZT9cblx0fVxuXG5cdC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcblx0aWYgKCFyICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAnZW52JyBpbiBwcm9jZXNzKSB7XG5cdFx0ciA9IHByb2Nlc3MuZW52LkRFQlVHO1xuXHR9XG5cblx0cmV0dXJuIHI7XG59XG5cbi8qKlxuICogTG9jYWxzdG9yYWdlIGF0dGVtcHRzIHRvIHJldHVybiB0aGUgbG9jYWxzdG9yYWdlLlxuICpcbiAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugc2FmYXJpIHRocm93c1xuICogd2hlbiBhIHVzZXIgZGlzYWJsZXMgY29va2llcy9sb2NhbHN0b3JhZ2VcbiAqIGFuZCB5b3UgYXR0ZW1wdCB0byBhY2Nlc3MgaXQuXG4gKlxuICogQHJldHVybiB7TG9jYWxTdG9yYWdlfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9jYWxzdG9yYWdlKCkge1xuXHR0cnkge1xuXHRcdC8vIFRWTUxLaXQgKEFwcGxlIFRWIEpTIFJ1bnRpbWUpIGRvZXMgbm90IGhhdmUgYSB3aW5kb3cgb2JqZWN0LCBqdXN0IGxvY2FsU3RvcmFnZSBpbiB0aGUgZ2xvYmFsIGNvbnRleHRcblx0XHQvLyBUaGUgQnJvd3NlciBhbHNvIGhhcyBsb2NhbFN0b3JhZ2UgaW4gdGhlIGdsb2JhbCBjb250ZXh0LlxuXHRcdHJldHVybiBsb2NhbFN0b3JhZ2U7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Ly8gU3dhbGxvd1xuXHRcdC8vIFhYWCAoQFFpeC0pIHNob3VsZCB3ZSBiZSBsb2dnaW5nIHRoZXNlP1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb21tb24nKShleHBvcnRzKTtcblxuY29uc3Qge2Zvcm1hdHRlcnN9ID0gbW9kdWxlLmV4cG9ydHM7XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmZvcm1hdHRlcnMuaiA9IGZ1bmN0aW9uICh2KSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdHJldHVybiAnW1VuZXhwZWN0ZWRKU09OUGFyc2VFcnJvcl06ICcgKyBlcnJvci5tZXNzYWdlO1xuXHR9XG59O1xuIiwgIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5jb25zdCB0dHkgPSByZXF1aXJlKCd0dHknKTtcbmNvbnN0IHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgTm9kZS5qcyBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKi9cblxuZXhwb3J0cy5pbml0ID0gaW5pdDtcbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLmRlc3Ryb3kgPSB1dGlsLmRlcHJlY2F0ZShcblx0KCkgPT4ge30sXG5cdCdJbnN0YW5jZSBtZXRob2QgYGRlYnVnLmRlc3Ryb3koKWAgaXMgZGVwcmVjYXRlZCBhbmQgbm8gbG9uZ2VyIGRvZXMgYW55dGhpbmcuIEl0IHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uIG9mIGBkZWJ1Z2AuJ1xuKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbNiwgMiwgMywgNCwgNSwgMV07XG5cbnRyeSB7XG5cdC8vIE9wdGlvbmFsIGRlcGVuZGVuY3kgKGFzIGluLCBkb2Vzbid0IG5lZWQgdG8gYmUgaW5zdGFsbGVkLCBOT1QgbGlrZSBvcHRpb25hbERlcGVuZGVuY2llcyBpbiBwYWNrYWdlLmpzb24pXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXNcblx0Y29uc3Qgc3VwcG9ydHNDb2xvciA9IHJlcXVpcmUoJ3N1cHBvcnRzLWNvbG9yJyk7XG5cblx0aWYgKHN1cHBvcnRzQ29sb3IgJiYgKHN1cHBvcnRzQ29sb3Iuc3RkZXJyIHx8IHN1cHBvcnRzQ29sb3IpLmxldmVsID49IDIpIHtcblx0XHRleHBvcnRzLmNvbG9ycyA9IFtcblx0XHRcdDIwLFxuXHRcdFx0MjEsXG5cdFx0XHQyNixcblx0XHRcdDI3LFxuXHRcdFx0MzIsXG5cdFx0XHQzMyxcblx0XHRcdDM4LFxuXHRcdFx0MzksXG5cdFx0XHQ0MCxcblx0XHRcdDQxLFxuXHRcdFx0NDIsXG5cdFx0XHQ0Myxcblx0XHRcdDQ0LFxuXHRcdFx0NDUsXG5cdFx0XHQ1Nixcblx0XHRcdDU3LFxuXHRcdFx0NjIsXG5cdFx0XHQ2Myxcblx0XHRcdDY4LFxuXHRcdFx0NjksXG5cdFx0XHQ3NCxcblx0XHRcdDc1LFxuXHRcdFx0NzYsXG5cdFx0XHQ3Nyxcblx0XHRcdDc4LFxuXHRcdFx0NzksXG5cdFx0XHQ4MCxcblx0XHRcdDgxLFxuXHRcdFx0OTIsXG5cdFx0XHQ5Myxcblx0XHRcdDk4LFxuXHRcdFx0OTksXG5cdFx0XHQxMTIsXG5cdFx0XHQxMTMsXG5cdFx0XHQxMjgsXG5cdFx0XHQxMjksXG5cdFx0XHQxMzQsXG5cdFx0XHQxMzUsXG5cdFx0XHQxNDgsXG5cdFx0XHQxNDksXG5cdFx0XHQxNjAsXG5cdFx0XHQxNjEsXG5cdFx0XHQxNjIsXG5cdFx0XHQxNjMsXG5cdFx0XHQxNjQsXG5cdFx0XHQxNjUsXG5cdFx0XHQxNjYsXG5cdFx0XHQxNjcsXG5cdFx0XHQxNjgsXG5cdFx0XHQxNjksXG5cdFx0XHQxNzAsXG5cdFx0XHQxNzEsXG5cdFx0XHQxNzIsXG5cdFx0XHQxNzMsXG5cdFx0XHQxNzgsXG5cdFx0XHQxNzksXG5cdFx0XHQxODQsXG5cdFx0XHQxODUsXG5cdFx0XHQxOTYsXG5cdFx0XHQxOTcsXG5cdFx0XHQxOTgsXG5cdFx0XHQxOTksXG5cdFx0XHQyMDAsXG5cdFx0XHQyMDEsXG5cdFx0XHQyMDIsXG5cdFx0XHQyMDMsXG5cdFx0XHQyMDQsXG5cdFx0XHQyMDUsXG5cdFx0XHQyMDYsXG5cdFx0XHQyMDcsXG5cdFx0XHQyMDgsXG5cdFx0XHQyMDksXG5cdFx0XHQyMTQsXG5cdFx0XHQyMTUsXG5cdFx0XHQyMjAsXG5cdFx0XHQyMjFcblx0XHRdO1xuXHR9XG59IGNhdGNoIChlcnJvcikge1xuXHQvLyBTd2FsbG93IC0gd2Ugb25seSBjYXJlIGlmIGBzdXBwb3J0cy1jb2xvcmAgaXMgYXZhaWxhYmxlOyBpdCBkb2Vzbid0IGhhdmUgdG8gYmUuXG59XG5cbi8qKlxuICogQnVpbGQgdXAgdGhlIGRlZmF1bHQgYGluc3BlY3RPcHRzYCBvYmplY3QgZnJvbSB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuICpcbiAqICAgJCBERUJVR19DT0xPUlM9bm8gREVCVUdfREVQVEg9MTAgREVCVUdfU0hPV19ISURERU49ZW5hYmxlZCBub2RlIHNjcmlwdC5qc1xuICovXG5cbmV4cG9ydHMuaW5zcGVjdE9wdHMgPSBPYmplY3Qua2V5cyhwcm9jZXNzLmVudikuZmlsdGVyKGtleSA9PiB7XG5cdHJldHVybiAvXmRlYnVnXy9pLnRlc3Qoa2V5KTtcbn0pLnJlZHVjZSgob2JqLCBrZXkpID0+IHtcblx0Ly8gQ2FtZWwtY2FzZVxuXHRjb25zdCBwcm9wID0ga2V5XG5cdFx0LnN1YnN0cmluZyg2KVxuXHRcdC50b0xvd2VyQ2FzZSgpXG5cdFx0LnJlcGxhY2UoL18oW2Etel0pL2csIChfLCBrKSA9PiB7XG5cdFx0XHRyZXR1cm4gay50b1VwcGVyQ2FzZSgpO1xuXHRcdH0pO1xuXG5cdC8vIENvZXJjZSBzdHJpbmcgdmFsdWUgaW50byBKUyB2YWx1ZVxuXHRsZXQgdmFsID0gcHJvY2Vzcy5lbnZba2V5XTtcblx0aWYgKC9eKHllc3xvbnx0cnVlfGVuYWJsZWQpJC9pLnRlc3QodmFsKSkge1xuXHRcdHZhbCA9IHRydWU7XG5cdH0gZWxzZSBpZiAoL14obm98b2ZmfGZhbHNlfGRpc2FibGVkKSQvaS50ZXN0KHZhbCkpIHtcblx0XHR2YWwgPSBmYWxzZTtcblx0fSBlbHNlIGlmICh2YWwgPT09ICdudWxsJykge1xuXHRcdHZhbCA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0dmFsID0gTnVtYmVyKHZhbCk7XG5cdH1cblxuXHRvYmpbcHJvcF0gPSB2YWw7XG5cdHJldHVybiBvYmo7XG59LCB7fSk7XG5cbi8qKlxuICogSXMgc3Rkb3V0IGEgVFRZPyBDb2xvcmVkIG91dHB1dCBpcyBlbmFibGVkIHdoZW4gYHRydWVgLlxuICovXG5cbmZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcblx0cmV0dXJuICdjb2xvcnMnIGluIGV4cG9ydHMuaW5zcGVjdE9wdHMgP1xuXHRcdEJvb2xlYW4oZXhwb3J0cy5pbnNwZWN0T3B0cy5jb2xvcnMpIDpcblx0XHR0dHkuaXNhdHR5KHByb2Nlc3Muc3RkZXJyLmZkKTtcbn1cblxuLyoqXG4gKiBBZGRzIEFOU0kgY29sb3IgZXNjYXBlIGNvZGVzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcblx0Y29uc3Qge25hbWVzcGFjZTogbmFtZSwgdXNlQ29sb3JzfSA9IHRoaXM7XG5cblx0aWYgKHVzZUNvbG9ycykge1xuXHRcdGNvbnN0IGMgPSB0aGlzLmNvbG9yO1xuXHRcdGNvbnN0IGNvbG9yQ29kZSA9ICdcXHUwMDFCWzMnICsgKGMgPCA4ID8gYyA6ICc4OzU7JyArIGMpO1xuXHRcdGNvbnN0IHByZWZpeCA9IGAgICR7Y29sb3JDb2RlfTsxbSR7bmFtZX0gXFx1MDAxQlswbWA7XG5cblx0XHRhcmdzWzBdID0gcHJlZml4ICsgYXJnc1swXS5zcGxpdCgnXFxuJykuam9pbignXFxuJyArIHByZWZpeCk7XG5cdFx0YXJncy5wdXNoKGNvbG9yQ29kZSArICdtKycgKyBtb2R1bGUuZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpICsgJ1xcdTAwMUJbMG0nKTtcblx0fSBlbHNlIHtcblx0XHRhcmdzWzBdID0gZ2V0RGF0ZSgpICsgbmFtZSArICcgJyArIGFyZ3NbMF07XG5cdH1cbn1cblxuZnVuY3Rpb24gZ2V0RGF0ZSgpIHtcblx0aWYgKGV4cG9ydHMuaW5zcGVjdE9wdHMuaGlkZURhdGUpIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblx0cmV0dXJuIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSArICcgJztcbn1cblxuLyoqXG4gKiBJbnZva2VzIGB1dGlsLmZvcm1hdFdpdGhPcHRpb25zKClgIHdpdGggdGhlIHNwZWNpZmllZCBhcmd1bWVudHMgYW5kIHdyaXRlcyB0byBzdGRlcnIuXG4gKi9cblxuZnVuY3Rpb24gbG9nKC4uLmFyZ3MpIHtcblx0cmV0dXJuIHByb2Nlc3Muc3RkZXJyLndyaXRlKHV0aWwuZm9ybWF0V2l0aE9wdGlvbnMoZXhwb3J0cy5pbnNwZWN0T3B0cywgLi4uYXJncykgKyAnXFxuJyk7XG59XG5cbi8qKlxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcblx0aWYgKG5hbWVzcGFjZXMpIHtcblx0XHRwcm9jZXNzLmVudi5ERUJVRyA9IG5hbWVzcGFjZXM7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gSWYgeW91IHNldCBhIHByb2Nlc3MuZW52IGZpZWxkIHRvIG51bGwgb3IgdW5kZWZpbmVkLCBpdCBnZXRzIGNhc3QgdG8gdGhlXG5cdFx0Ly8gc3RyaW5nICdudWxsJyBvciAndW5kZWZpbmVkJy4gSnVzdCBkZWxldGUgaW5zdGVhZC5cblx0XHRkZWxldGUgcHJvY2Vzcy5lbnYuREVCVUc7XG5cdH1cbn1cblxuLyoqXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2FkKCkge1xuXHRyZXR1cm4gcHJvY2Vzcy5lbnYuREVCVUc7XG59XG5cbi8qKlxuICogSW5pdCBsb2dpYyBmb3IgYGRlYnVnYCBpbnN0YW5jZXMuXG4gKlxuICogQ3JlYXRlIGEgbmV3IGBpbnNwZWN0T3B0c2Agb2JqZWN0IGluIGNhc2UgYHVzZUNvbG9yc2AgaXMgc2V0XG4gKiBkaWZmZXJlbnRseSBmb3IgYSBwYXJ0aWN1bGFyIGBkZWJ1Z2AgaW5zdGFuY2UuXG4gKi9cblxuZnVuY3Rpb24gaW5pdChkZWJ1Zykge1xuXHRkZWJ1Zy5pbnNwZWN0T3B0cyA9IHt9O1xuXG5cdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmluc3BlY3RPcHRzKTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0ZGVidWcuaW5zcGVjdE9wdHNba2V5c1tpXV0gPSBleHBvcnRzLmluc3BlY3RPcHRzW2tleXNbaV1dO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb21tb24nKShleHBvcnRzKTtcblxuY29uc3Qge2Zvcm1hdHRlcnN9ID0gbW9kdWxlLmV4cG9ydHM7XG5cbi8qKlxuICogTWFwICVvIHRvIGB1dGlsLmluc3BlY3QoKWAsIGFsbCBvbiBhIHNpbmdsZSBsaW5lLlxuICovXG5cbmZvcm1hdHRlcnMubyA9IGZ1bmN0aW9uICh2KSB7XG5cdHRoaXMuaW5zcGVjdE9wdHMuY29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cdHJldHVybiB1dGlsLmluc3BlY3QodiwgdGhpcy5pbnNwZWN0T3B0cylcblx0XHQuc3BsaXQoJ1xcbicpXG5cdFx0Lm1hcChzdHIgPT4gc3RyLnRyaW0oKSlcblx0XHQuam9pbignICcpO1xufTtcblxuLyoqXG4gKiBNYXAgJU8gdG8gYHV0aWwuaW5zcGVjdCgpYCwgYWxsb3dpbmcgbXVsdGlwbGUgbGluZXMgaWYgbmVlZGVkLlxuICovXG5cbmZvcm1hdHRlcnMuTyA9IGZ1bmN0aW9uICh2KSB7XG5cdHRoaXMuaW5zcGVjdE9wdHMuY29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cdHJldHVybiB1dGlsLmluc3BlY3QodiwgdGhpcy5pbnNwZWN0T3B0cyk7XG59O1xuIiwgIi8qKlxuICogRGV0ZWN0IEVsZWN0cm9uIHJlbmRlcmVyIC8gbndqcyBwcm9jZXNzLCB3aGljaCBpcyBub2RlLCBidXQgd2Ugc2hvdWxkXG4gKiB0cmVhdCBhcyBhIGJyb3dzZXIuXG4gKi9cblxuaWYgKHR5cGVvZiBwcm9jZXNzID09PSAndW5kZWZpbmVkJyB8fCBwcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicgfHwgcHJvY2Vzcy5icm93c2VyID09PSB0cnVlIHx8IHByb2Nlc3MuX19ud2pzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9icm93c2VyLmpzJyk7XG59IGVsc2Uge1xuXHRtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbm9kZS5qcycpO1xufVxuIiwgbnVsbCwgbnVsbCwgbnVsbCwgImltcG9ydCB7XG4gICAgQXBwLFxuICAgIEZpbGVTeXN0ZW1BZGFwdGVyLFxuICAgIEl0ZW1WaWV3LFxuICAgIE5vdGljZSxcbiAgICBQbHVnaW4sXG4gICAgUGx1Z2luU2V0dGluZ1RhYixcbiAgICBTZXR0aW5nLFxuICAgIFRGaWxlLFxuICAgIFdvcmtzcGFjZUxlYWYsXG59IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgc2ltcGxlR2l0IH0gZnJvbSBcInNpbXBsZS1naXRcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgZnNwIGZyb20gXCJmcy9wcm9taXNlc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0ICogYXMgb3MgZnJvbSBcIm9zXCI7XG5cbmltcG9ydCB7XG4gICAgUmVtb3RlQXJ0aWNsZSxcbiAgICBjb25maXJtU3luY0NvbmZsaWN0LFxuICAgIHN5bmNBcnRpY2xlLFxuICAgIHN5bmNBcnRpY2xlQXNDb3B5LFxufSBmcm9tIFwiLi9zcmMvc3luY1wiO1xuaW1wb3J0IHsgZG93bmxvYWRBcnRpY2xlIH0gZnJvbSBcIi4vc3JjL2Rvd25sb2FkXCI7XG5pbXBvcnQgeyBVcGxvYWRBcnRpY2xlTW9kYWwsIHVwbG9hZExvY2FsQXJ0aWNsZSB9IGZyb20gXCIuL3NyYy91cGxvYWRcIjtcbmltcG9ydCB7IHJlZnJlc2hBcnRpY2xlc1ZpZXcgfSBmcm9tIFwiLi9zcmMvcmVmcmVzaFwiO1xuXG5leHBvcnQgdHlwZSB7IFJlbW90ZUFydGljbGUgfTtcblxuY29uc3QgVklFV19UWVBFX0FSVElDTEVTID0gXCJnaXQtYXJ0aWNsZXMtdmlld1wiO1xuXG5pbnRlcmZhY2UgR2l0U3luY1NldHRpbmdzIHtcbiAgICByZXBvVXJsOiBzdHJpbmc7XG4gICAgc3NoS2V5OiBzdHJpbmc7XG4gICAgdGFyZ2V0Rm9sZGVyOiBzdHJpbmc7XG4gICAgLyoqIFx1ODFFQVx1NTJBOFx1NTIzN1x1NjVCMFx1OTVGNFx1OTY5NFx1RkYwOFx1NkJFQlx1NzlEMlx1RkYwOVx1RkYwQzAgXHU4ODY4XHU3OTNBXHU1MTczXHU5NUVEICovXG4gICAgYXV0b1JlZnJlc2hJbnRlcnZhbDogbnVtYmVyO1xufVxuXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBHaXRTeW5jU2V0dGluZ3MgPSB7XG4gICAgcmVwb1VybDogXCJcIixcbiAgICBzc2hLZXk6IFwiXCIsXG4gICAgdGFyZ2V0Rm9sZGVyOiBcIkdpdFx1NjU4N1x1N0FFMFwiLFxuICAgIGF1dG9SZWZyZXNoSW50ZXJ2YWw6IDAsXG59O1xuXG5jbGFzcyBHaXRBcnRpY2xlc1ZpZXcgZXh0ZW5kcyBJdGVtVmlldyB7XG4gICAgcGx1Z2luOiBNeVNpbXBsZVBsdWdpbjtcbiAgICBhcnRpY2xlczogUmVtb3RlQXJ0aWNsZVtdID0gW107XG4gICAgbG9jYWxUaXRsZXMgPSBuZXcgTWFwPHN0cmluZywgVEZpbGU+KCk7XG4gICAgY29udGVudEVsOiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIGlzTG9hZGluZyA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IobGVhZjogV29ya3NwYWNlTGVhZiwgcGx1Z2luOiBNeVNpbXBsZVBsdWdpbikge1xuICAgICAgICBzdXBlcihsZWFmKTtcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgICAgIHRoaXMuY29udGVudEVsID0gdGhpcy5jb250YWluZXJFbC5jaGlsZHJlblsxXSBhcyBIVE1MRWxlbWVudDtcbiAgICB9XG5cbiAgICBnZXRWaWV3VHlwZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gVklFV19UWVBFX0FSVElDTEVTO1xuICAgIH1cblxuICAgIGdldERpc3BsYXlUZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBcIkdpdCBcdTY1ODdcdTdBRTBcIjtcbiAgICB9XG5cbiAgICBnZXRJY29uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBcImJvb2stb3BlblwiO1xuICAgIH1cblxuICAgIGFzeW5jIG9uT3BlbigpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBhc3luYyByZW5kZXIoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLmVuc3VyZVNldHRpbmdzTG9hZGVkKCk7XG5cbiAgICAgICAgdGhpcy5jb250ZW50RWwuZW1wdHkoKTtcbiAgICAgICAgdGhpcy5jb250ZW50RWwuYWRkQ2xhc3MoXCJnaXQtYXJ0aWNsZXMtY29udGFpbmVyXCIpO1xuXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IHRoaXMuY29udGVudEVsLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtaGVhZGVyXCIgfSk7XG4gICAgICAgIGNvbnN0IHRpdGxlQm94ID0gaGVhZGVyLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtaGVhZGVyLXRpdGxlXCIgfSk7XG4gICAgICAgIHRpdGxlQm94LmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIkdpdCBcdTY1ODdcdTdBRTBcIiB9KTtcbiAgICAgICAgdGl0bGVCb3guY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgICAgICAgdGV4dDogdGhpcy5wbHVnaW4uc2V0dGluZ3MucmVwb1VybFxuICAgICAgICAgICAgICAgID8gXCJcdTRFQ0VcdTVERjJcdTkxNERcdTdGNkVcdTc2ODQgR2l0IFx1NEVEM1x1NUU5M1x1OEJGQlx1NTNENiBNYXJrZG93biBcdTY1ODdcdTdBRTBcIlxuICAgICAgICAgICAgICAgIDogXCJcdThCRjdcdTUxNDhcdTU3MjhcdThCQkVcdTdGNkVcdTRFMkRcdTkxNERcdTdGNkUgR2l0IFx1NEVEM1x1NUU5M1wiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC1hcnRpY2xlcy1zdWJ0aXRsZVwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByZWZyZXNoQnV0dG9uID0gaGVhZGVyLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU1MjM3XHU2NUIwXCIsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LWFydGljbGVzLXJlZnJlc2hcIixcbiAgICAgICAgfSk7XG4gICAgICAgIHJlZnJlc2hCdXR0b24ub25jbGljayA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJlZnJlc2hCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmVmcmVzaEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiXHU1MjM3XHU2NUIwXHU0RTJEXHUyMDI2XCI7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZEFydGljbGVzKCk7XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHJlZnJlc2hCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZWZyZXNoQnV0dG9uLnRleHRDb250ZW50ID0gXCJcdTUyMzdcdTY1QjBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoIXRoaXMucGx1Z2luLnNldHRpbmdzLnJlcG9VcmwpIHtcbiAgICAgICAgICAgIGNvbnN0IGVtcHR5ID0gdGhpcy5jb250ZW50RWwuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1hcnRpY2xlcy1lbXB0eVwiIH0pO1xuICAgICAgICAgICAgZW1wdHkuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1hcnRpY2xlcy1lbXB0eS1pY29uXCIsIHRleHQ6IFwiXHUyNjk5XHVGRTBGXCIgfSk7XG4gICAgICAgICAgICBlbXB0eS5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogXCJcdThGRDhcdTZDQTFcdTY3MDlcdTkxNERcdTdGNkUgR2l0IFx1NEVEM1x1NUU5M1wiIH0pO1xuICAgICAgICAgICAgZW1wdHkuY3JlYXRlRWwoXCJwXCIsIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1NjI1M1x1NUYwMCBPYnNpZGlhbiBcdThCQkVcdTdGNkUgXHUyMTkyIEdpdCBcdTY1ODdcdTdBRTBcdTU0MENcdTZCNjVcdUZGMENcdTU4NkJcdTUxOTlcdTRFRDNcdTVFOTNcdTU3MzBcdTU3NDBcdTU0MEVcdThGRDRcdTU2REVcdTZCNjRcdTY4MDdcdTdCN0VcdTk4NzVcdTMwMDJcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9hZGluZyA9IHRoaXMuY29udGVudEVsLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtbG9hZGluZ1wiIH0pO1xuICAgICAgICBsb2FkaW5nLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtc3Bpbm5lclwiIH0pO1xuICAgICAgICBsb2FkaW5nLmNyZWF0ZVNwYW4oeyB0ZXh0OiBcIlx1NkI2M1x1NTcyOFx1OEJGQlx1NTNENiBHaXQgXHU0RUQzXHU1RTkzXHUyMDI2XCIgfSk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZEFydGljbGVzKCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBsb2FkaW5nLnJlbW92ZSgpO1xuICAgICAgICAgICAgY29uc3QgZXJyb3JFbCA9IHRoaXMuY29udGVudEVsLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtZXJyb3JcIiB9KTtcbiAgICAgICAgICAgIGVycm9yRWwuY3JlYXRlRWwoXCJzdHJvbmdcIiwgeyB0ZXh0OiBcIlx1OEJGQlx1NTNENlx1NEVEM1x1NUU5M1x1NTkzMVx1OEQyNVwiIH0pO1xuICAgICAgICAgICAgZXJyb3JFbC5jcmVhdGVFbChcImRpdlwiLCB7XG4gICAgICAgICAgICAgICAgdGV4dDogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogXHU1QkY5XHU1OTE2XHU1MTZDXHU1RjAwXHU3Njg0XHU1MjM3XHU2NUIwXHU1MTY1XHU1M0UzXHVGRjBDXHU0RjlCIHJlZnJlc2gudHMgXHU4QzAzXHU3NTI4ICovXG4gICAgYXN5bmMgcmVmcmVzaCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBsdWdpbi5zZXR0aW5ncy5yZXBvVXJsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0xvYWRpbmcpIHJldHVybjtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRBcnRpY2xlcygpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgbmV3IE5vdGljZShcbiAgICAgICAgICAgICAgICBgXHU1MjM3XHU2NUIwXHU1OTMxXHU4RDI1XHVGRjFBJHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpXG4gICAgICAgICAgICAgICAgfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZEFydGljbGVzKCkge1xuICAgICAgICBjb25zdCB0ZW1wRGlyID0gYXdhaXQgdGhpcy5wbHVnaW4uY2xvbmVUb1RlbXAoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuYXJ0aWNsZXMgPSBhd2FpdCB0aGlzLnBsdWdpbi5nZXRSZW1vdGVBcnRpY2xlcyh0ZW1wRGlyKTtcblxuICAgICAgICAgICAgdGhpcy5sb2NhbFRpdGxlcy5jbGVhcigpO1xuICAgICAgICAgICAgY29uc3QgbG9jYWxGaWxlcyA9IHRoaXMuYXBwLnZhdWx0LmdldE1hcmtkb3duRmlsZXMoKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhbEZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IGxvY2FsRmlsZXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmxvY2FsVGl0bGVzLmhhcyhmaWxlLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYWxUaXRsZXMuc2V0KGZpbGUubmFtZSwgZmlsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFx1NkJDRlx1NTkwNFx1NzQwNlx1NEUwMFx1NjI3OVx1OEJBOVx1NTFGQVx1NEU4Qlx1NEVGNlx1NUZBQVx1NzNBRlx1RkYwQ1x1OTA3Rlx1NTE0RFx1OTU3Rlx1NjVGNlx1OTVGNFx1OTYzQlx1NTg1RSBVSVxuICAgICAgICAgICAgICAgIGlmIChpICUgMjAwID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIDApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG9sZExpc3QgPSB0aGlzLmNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yKFwiLmdpdC1hcnRpY2xlcy1saXN0XCIpO1xuICAgICAgICAgICAgb2xkTGlzdD8ucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGxvYWRpbmcgPSB0aGlzLmNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yKFwiLmdpdC1hcnRpY2xlcy1sb2FkaW5nXCIpO1xuICAgICAgICAgICAgbG9hZGluZz8ucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLmNvbnRlbnRFbC5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LWFydGljbGVzLWxpc3RcIiB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYXJ0aWNsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZW1wdHkgPSBsaXN0LmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZXMtZW1wdHlcIiB9KTtcbiAgICAgICAgICAgICAgICBlbXB0eS5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogXCJcdTRFRDNcdTVFOTNcdTRFMkRcdTZDQTFcdTY3MDkgTWFya2Rvd24gXHU2NTg3XHU3QUUwXCIgfSk7XG4gICAgICAgICAgICAgICAgZW1wdHkuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogXCJcdTVGNTNcdTUyNERcdTUzRUFcdTY2M0VcdTc5M0EgLm1kIFx1NjU4N1x1NEVGNlx1MzAwMlwiIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgc3VtbWFyeSA9IGxpc3QuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1hcnRpY2xlcy1zdW1tYXJ5XCIgfSk7XG4gICAgICAgICAgICBzdW1tYXJ5LnNldFRleHQoYFx1NTE3MSAke3RoaXMuYXJ0aWNsZXMubGVuZ3RofSBcdTdCQzdcdTY1ODdcdTdBRTBgKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBhcnRpY2xlIG9mIHRoaXMuYXJ0aWNsZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckFydGljbGVDYXJkKGxpc3QsIGFydGljbGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnJlbmRlckxvY2FsQXJ0aWNsZXMoKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnJlbW92ZVRlbXBEaXIodGVtcERpcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJBcnRpY2xlQ2FyZChsaXN0OiBIVE1MRWxlbWVudCwgYXJ0aWNsZTogUmVtb3RlQXJ0aWNsZSkge1xuICAgICAgICBjb25zdCByZW1vdGVGaWxlTmFtZSA9IGFydGljbGUucmVsYXRpdmVQYXRoLnNwbGl0KFwiL1wiKS5wb3AoKSA/PyBcIlwiO1xuICAgICAgICBjb25zdCBsb2NhbEZpbGUgPSB0aGlzLmxvY2FsVGl0bGVzLmdldChyZW1vdGVGaWxlTmFtZSk7XG4gICAgICAgIGNvbnN0IGNhcmQgPSBsaXN0LmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZS1jYXJkXCIgfSk7XG5cbiAgICAgICAgY29uc3QgaW5mbyA9IGNhcmQuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1hcnRpY2xlLWluZm9cIiB9KTtcbiAgICAgICAgaW5mby5jcmVhdGVFbChcImRpdlwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBhcnRpY2xlLnRpdGxlLFxuICAgICAgICAgICAgY2xzOiBcImdpdC1hcnRpY2xlLXRpdGxlXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBpbmZvLmNyZWF0ZUVsKFwiZGl2XCIsIHtcbiAgICAgICAgICAgIHRleHQ6IGFydGljbGUucmVsYXRpdmVQYXRoLFxuICAgICAgICAgICAgY2xzOiBcImdpdC1hcnRpY2xlLXBhdGhcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYWN0aW9uID0gY2FyZC5jcmVhdGVFbChcImJ1dHRvblwiLCB7XG4gICAgICAgICAgICBjbHM6IGxvY2FsRmlsZSA/IFwiZ2l0LWFydGljbGUtYWN0aW9uIGlzLXN5bmNlZFwiIDogXCJnaXQtYXJ0aWNsZS1hY3Rpb25cIixcbiAgICAgICAgICAgIHRleHQ6IGxvY2FsRmlsZSA/IFwiXHU1NDBDXHU2QjY1XCIgOiBcIlx1NEUwQlx1OEY3RFwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBhY3Rpb24uc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCIsXG4gICAgICAgICAgICBsb2NhbEZpbGVcbiAgICAgICAgICAgICAgICA/IGBcdTU0MENcdTZCNjVcdTMwMEEke2FydGljbGUudGl0bGV9XHUzMDBCYFxuICAgICAgICAgICAgICAgIDogYFx1NEUwQlx1OEY3RFx1MzAwQSR7YXJ0aWNsZS50aXRsZX1cdTMwMEJgXG4gICAgICAgICk7XG5cbiAgICAgICAgYWN0aW9uLm9uY2xpY2sgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBhY3Rpb24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgYWN0aW9uLnRleHRDb250ZW50ID0gbG9jYWxGaWxlID8gXCJcdTU0MENcdTZCNjVcdTRFMkRcdTIwMjZcIiA6IFwiXHU0RTBCXHU4RjdEXHU0RTJEXHUyMDI2XCI7XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsRmlsZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjb25maXJtU3luY0NvbmZsaWN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnRpY2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxGaWxlXG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gXCJjYW5jZWxcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gXCJvdmVyd3JpdGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgc3luY0FydGljbGUodGhpcy5wbHVnaW4sIGFydGljbGUsIGxvY2FsRmlsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKGBcdTMwMEEke2FydGljbGUudGl0bGV9XHUzMDBCXHU1REYyXHU4OTg2XHU3NkQ2XHU1RTc2XHU1NDBDXHU2QjY1YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCByZWZyZXNoQXJ0aWNsZXNWaWV3KHRoaXMucGx1Z2luLCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IFwiY29weVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3B5RmlsZSA9IGF3YWl0IHN5bmNBcnRpY2xlQXNDb3B5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFydGljbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxGaWxlXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZShgXHU1REYyXHU0RkREXHU1QjU4XHU0RTNBXHU1MjZGXHU0RUY2XHVGRjFBJHtjb3B5RmlsZS5wYXRofWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgcmVmcmVzaEFydGljbGVzVmlldyh0aGlzLnBsdWdpbiwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdGaWxlID0gYXdhaXQgZG93bmxvYWRBcnRpY2xlKHRoaXMucGx1Z2luLCBhcnRpY2xlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhbFRpdGxlcy5zZXQobmV3RmlsZS5uYW1lLCBuZXdGaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLnRleHRDb250ZW50ID0gXCJcdTU0MENcdTZCNjVcIjtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJpcy1zeW5jZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoYFx1MzAwQSR7YXJ0aWNsZS50aXRsZX1cdTMwMEJcdTVERjJcdTRFMEJcdThGN0RgKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcmVmcmVzaEFydGljbGVzVmlldyh0aGlzLnBsdWdpbiwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBuZXcgTm90aWNlKFxuICAgICAgICAgICAgICAgICAgICBgJHtsb2NhbEZpbGUgPyBcIlx1NTQwQ1x1NkI2NVwiIDogXCJcdTRFMEJcdThGN0RcIn1cdTU5MzFcdThEMjVcdUZGMUEke1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgIH1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsRmlsZSkgYWN0aW9uLnRleHRDb250ZW50ID0gXCJcdTU0MENcdTZCNjVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBhc3luYyByZW5kZXJMb2NhbEFydGljbGVzKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yKFwiLmdpdC1sb2NhbC1hcnRpY2xlcy1zZWN0aW9uXCIpPy5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5jb250ZW50RWwucXVlcnlTZWxlY3RvcihcIi5naXQtYXJ0aWNsZXMtbG9hZGluZ1wiKT8ucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuY29udGVudEVsLnF1ZXJ5U2VsZWN0b3IoXCIuZ2l0LWFydGljbGVzLWVtcHR5XCIpPy5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5jb250ZW50RWwucXVlcnlTZWxlY3RvcihcIi5naXQtYXJ0aWNsZXMtZXJyb3JcIik/LnJlbW92ZSgpO1xuXG4gICAgICAgIGNvbnN0IHNlY3Rpb24gPSB0aGlzLmNvbnRlbnRFbC5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LWxvY2FsLWFydGljbGVzLXNlY3Rpb25cIiB9KTtcblxuICAgICAgICBjb25zdCBoZWFkZXIgPSBzZWN0aW9uLmNyZWF0ZURpdih7IGNsczogXCJnaXQtbG9jYWwtYXJ0aWNsZXMtaGVhZGVyXCIgfSk7XG4gICAgICAgIGNvbnN0IHRpdGxlQm94ID0gaGVhZGVyLmNyZWF0ZURpdigpO1xuICAgICAgICB0aXRsZUJveC5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogXCJcdTY3MkNcdTU3MzBcdTY1ODdcdTdBRTBcdTRFMEFcdTRGMjBcIiB9KTtcbiAgICAgICAgdGl0bGVCb3guY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgICAgICAgdGV4dDogXCJcdThCRkJcdTUzRDZcdTVGNTNcdTUyNEQgVmF1bHQgXHU0RTJEXHU3Njg0IE1hcmtkb3duIFx1NjU4N1x1NEVGNlx1RkYwQ1x1OTAwOVx1NjJFOSBHaXQgXHU0RUQzXHU1RTkzXHU2NTg3XHU0RUY2XHU1OTM5XHU1NDBFXHU0RTBBXHU0RjIwXHUzMDAyXCIsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LWFydGljbGVzLXN1YnRpdGxlXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGxvY2FsRmlsZXMgPSB0aGlzLmFwcC52YXVsdFxuICAgICAgICAgICAgLmdldE1hcmtkb3duRmlsZXMoKVxuICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEucGF0aC5sb2NhbGVDb21wYXJlKGIucGF0aCwgXCJ6aC1DTlwiKSk7XG5cbiAgICAgICAgaWYgKGxvY2FsRmlsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBzZWN0aW9uLmNyZWF0ZURpdih7XG4gICAgICAgICAgICAgICAgdGV4dDogXCJcdTVGNTNcdTUyNEQgVmF1bHQgXHU0RTJEXHU2Q0ExXHU2NzA5IE1hcmtkb3duIFx1NjU4N1x1N0FFMFx1MzAwMlwiLFxuICAgICAgICAgICAgICAgIGNsczogXCJnaXQtbG9jYWwtZW1wdHlcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbGlzdCA9IHNlY3Rpb24uY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1sb2NhbC1hcnRpY2xlcy1saXN0XCIgfSk7XG5cbiAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGxvY2FsRmlsZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhcmQgPSBsaXN0LmNyZWF0ZURpdih7IGNsczogXCJnaXQtbG9jYWwtYXJ0aWNsZS1jYXJkXCIgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSBjYXJkLmNyZWF0ZURpdih7IGNsczogXCJnaXQtYXJ0aWNsZS1pbmZvXCIgfSk7XG4gICAgICAgICAgICBpbmZvLmNyZWF0ZUVsKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBmaWxlLmJhc2VuYW1lLFxuICAgICAgICAgICAgICAgIGNsczogXCJnaXQtYXJ0aWNsZS10aXRsZVwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpbmZvLmNyZWF0ZUVsKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBmaWxlLnBhdGgsXG4gICAgICAgICAgICAgICAgY2xzOiBcImdpdC1hcnRpY2xlLXBhdGhcIixcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBhY3Rpb24gPSBjYXJkLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1NEUwQVx1NEYyMFwiLFxuICAgICAgICAgICAgICAgIGNsczogXCJnaXQtYXJ0aWNsZS1hY3Rpb25cIixcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBhY3Rpb24ub25jbGljayA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RhbCA9IG5ldyBVcGxvYWRBcnRpY2xlTW9kYWwodGhpcy5hcHAsIHRoaXMucGx1Z2luLCBmaWxlKTtcbiAgICAgICAgICAgICAgICBtb2RhbC5vcGVuKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgb25DbG9zZSgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50RWwuZW1wdHkoKTtcbiAgICB9XG59XG5cbmNsYXNzIEdpdFN5bmNTZXR0aW5nVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG4gICAgcGx1Z2luOiBNeVNpbXBsZVBsdWdpbjtcblxuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IE15U2ltcGxlUGx1Z2luKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgcGx1Z2luKTtcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgfVxuXG4gICAgZGlzcGxheSgpIHtcbiAgICAgICAgY29uc3QgeyBjb250YWluZXJFbCB9ID0gdGhpcztcbiAgICAgICAgY29udGFpbmVyRWwuZW1wdHkoKTtcblxuICAgICAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogXCJHaXQgXHU2NTg3XHU3QUUwXHU1NDBDXHU2QjY1XCIgfSk7XG4gICAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwicFwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NTcyOFx1OEZEOVx1OTFDQ1x1OTE0RFx1N0Y2RSBHaXQgXHU0RUQzXHU1RTkzXHU3M0FGXHU1ODgzXHVGRjBDXHU2NTg3XHU3QUUwXHU1MjE3XHU4ODY4XHU0RjFBXHU1NzI4XHUyMDFDR2l0IFx1NjU4N1x1N0FFMFx1MjAxRFx1NjgwN1x1N0I3RVx1OTg3NVx1NEUyRFx1NjYzRVx1NzkzQVx1MzAwMlwiLFxuICAgICAgICAgICAgY2xzOiBcInNldHRpbmctaXRlbS1kZXNjcmlwdGlvblwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiR2l0IFx1NEVEM1x1NUU5M1x1NTczMFx1NTc0MFwiKVxuICAgICAgICAgICAgLnNldERlc2MoXCJcdTY1MkZcdTYzMDEgSFRUUFMgXHU1NDhDIFNTSFx1RkYwQ1x1NEY4Qlx1NTk4MiBnaXRAZ2l0aHViLmNvbTp1c2VyL3JlcG8uZ2l0XCIpXG4gICAgICAgICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgICAgICAgICB0ZXh0XG4gICAgICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcImdpdEBnaXRodWIuY29tOnVzZXIvcmVwby5naXRcIilcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnJlcG9VcmwpXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnJlcG9VcmwgPSB2YWx1ZS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIlNTSCBcdTc5QzFcdTk0QTVcIilcbiAgICAgICAgICAgIC5zZXREZXNjKFwiXHU1M0VGXHU5MDA5XHUzMDAyXHU3NTU5XHU3QTdBXHU2NUY2XHU0RjdGXHU3NTI4XHU3Q0ZCXHU3RURGXHU5RUQ4XHU4QkE0IFNTSCBcdTkxNERcdTdGNkVcdTMwMDJcdTc5QzFcdTk0QTVcdTUzRUFcdTc1MjhcdTRFOEVcdTVGNTNcdTUyNEQgR2l0IFx1NjRDRFx1NEY1Q1x1MzAwMlwiKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKCh0ZXh0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGV4dFxuICAgICAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJcdTdDOThcdThEMzQgU1NIIFx1NzlDMVx1OTRBNVwiKVxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc3NoS2V5KVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zc2hLZXkgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0ZXh0LmlucHV0RWwucm93cyA9IDc7XG4gICAgICAgICAgICAgICAgdGV4dC5pbnB1dEVsLmFkZENsYXNzKFwiZ2l0LXN5bmMtc2V0dGluZ3Mta2V5XCIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIlx1NjU4N1x1N0FFMFx1NEZERFx1NUI1OFx1NzZFRVx1NUY1NVwiKVxuICAgICAgICAgICAgLnNldERlc2MoXCJcdTRFMEJcdThGN0RcdTY1QjBcdTY1ODdcdTdBRTBcdTY1RjZcdTRGN0ZcdTc1MjhcdTc2ODQgVmF1bHQgXHU3NkY4XHU1QkY5XHU4REVGXHU1Rjg0XHVGRjBDXHU0RjhCXHU1OTgyIEdpdFx1NjU4N1x1N0FFMFwiKVxuICAgICAgICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgICAgICAgICAgdGV4dFxuICAgICAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJHaXRcdTY1ODdcdTdBRTBcIilcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnRhcmdldEZvbGRlcilcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudGFyZ2V0Rm9sZGVyID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS50cmltKCkucmVwbGFjZSgvXlxcLyt8XFwvKyQvZywgXCJcIikgfHwgXCJHaXRcdTY1ODdcdTdBRTBcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiXHU2MjUzXHU1RjAwXHU2NTg3XHU3QUUwXHU1MjE3XHU4ODY4XCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIlx1NjI1M1x1NUYwMFx1NEUwMFx1NEUyQVx1NjVCMFx1NzY4NCBPYnNpZGlhbiBcdTY4MDdcdTdCN0VcdTk4NzVcdUZGMENcdTY3RTVcdTc3MEJcdTRFRDNcdTVFOTNcdTRFMkRcdTc2ODRcdTY1ODdcdTdBRTBcdTMwMDJcIilcbiAgICAgICAgICAgIC5hZGRCdXR0b24oKGJ1dHRvbikgPT5cbiAgICAgICAgICAgICAgICBidXR0b24uc2V0QnV0dG9uVGV4dChcIlx1NjI1M1x1NUYwMFwiKS5vbkNsaWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uYWN0aXZhdGVBcnRpY2xlc1ZpZXcoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiXHU4MUVBXHU1MkE4XHU1MjM3XHU2NUIwXHU5NUY0XHU5Njk0XHVGRjA4XHU2QkVCXHU3OUQyXHVGRjA5XCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcbiAgICAgICAgICAgICAgICBcIlx1NjMwOVx1OEJCRVx1NUI5QVx1OTVGNFx1OTY5NFx1ODFFQVx1NTJBOFx1NjJDOVx1NTNENiBHaXQgXHU0RUQzXHU1RTkzXHU0RkUxXHU2MDZGXHU0RTBFXHU2NzJDXHU1NzMwXHU2NTg3XHU3QUUwXHU0RkUxXHU2MDZGXHU1RTc2XHU1MjM3XHU2NUIwXHU1MjE3XHU4ODY4XHUzMDAyXHU4QkJFXHU0RTNBIDAgXHU4ODY4XHU3OTNBXHU1MTczXHU5NUVEXHU4MUVBXHU1MkE4XHU1MjM3XHU2NUIwXHUzMDAyXHU1RUZBXHU4QkFFXHU0RTBEXHU1QzBGXHU0RThFIDUwMDAgXHU2QkVCXHU3OUQyXHUzMDAyXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGV4dFxuICAgICAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCIwXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zZXRWYWx1ZShTdHJpbmcodGhpcy5wbHVnaW4uc2V0dGluZ3MuYXV0b1JlZnJlc2hJbnRlcnZhbCA/PyAwKSlcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbnVtID0gTnVtYmVyKHZhbHVlLnRyaW0oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5hdXRvUmVmcmVzaEludGVydmFsID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIuaXNGaW5pdGUobnVtKSAmJiBudW0gPiAwID8gTWF0aC5mbG9vcihudW0pIDogMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4ucmVzdGFydEF1dG9SZWZyZXNoKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRleHQuaW5wdXRFbC50eXBlID0gXCJudW1iZXJcIjtcbiAgICAgICAgICAgICAgICB0ZXh0LmlucHV0RWwubWluID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgdGV4dC5pbnB1dEVsLnN0ZXAgPSBcIjEwMDBcIjtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlTaW1wbGVQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuICAgIHNldHRpbmdzOiBHaXRTeW5jU2V0dGluZ3M7XG4gICAgcHJpdmF0ZSBzZXR0aW5nc1JlYWR5OiBQcm9taXNlPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBhdXRvUmVmcmVzaFRpbWVyOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIC8qKiBcdTRGOUIgcmVmcmVzaC50cyBcdTRGN0ZcdTc1MjhcdUZGMENcdTkwN0ZcdTUxNERcdTVGQUFcdTczQUZcdTRGOURcdThENTYgKi9cbiAgICByZWFkb25seSB2aWV3VHlwZUFydGljbGVzID0gVklFV19UWVBFX0FSVElDTEVTO1xuXG4gICAgYXN5bmMgb25sb2FkKCkge1xuICAgICAgICAvLyBcdTUxNDhcdTZDRThcdTUxOENcdTg5QzZcdTU2RkUgLyBcdTU0N0RcdTRFRTQgLyBcdTgzRENcdTUzNTVcdUZGMENcdTRGRERcdThCQzFcdTYzRDJcdTRFRjYgVUkgXHU3QUNCXHU1MzczXHU1M0VGXHU3NTI4XG4gICAgICAgIHRoaXMucmVnaXN0ZXJWaWV3KFxuICAgICAgICAgICAgVklFV19UWVBFX0FSVElDTEVTLFxuICAgICAgICAgICAgKGxlYWYpID0+IG5ldyBHaXRBcnRpY2xlc1ZpZXcobGVhZiwgdGhpcylcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFkZFNldHRpbmdUYWIobmV3IEdpdFN5bmNTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgICAgICAgIGlkOiBcIm9wZW4tZ2l0LWFydGljbGVzXCIsXG4gICAgICAgICAgICBuYW1lOiBcIlx1NjI1M1x1NUYwMCBHaXQgXHU2NTg3XHU3QUUwXCIsXG4gICAgICAgICAgICBjYWxsYmFjazogKCkgPT4gdGhpcy5hY3RpdmF0ZUFydGljbGVzVmlldygpLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFkZFJpYmJvbkljb24oXCJib29rLW9wZW5cIiwgXCJcdTYyNTNcdTVGMDAgR2l0IFx1NjU4N1x1N0FFMFwiLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUFydGljbGVzVmlldygpXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gXHU1RjAyXHU2QjY1XHU1MkEwXHU4RjdEXHU4QkJFXHU3RjZFXHVGRjBDXHU0RTBEXHU5NjNCXHU1ODVFXHU2M0QyXHU0RUY2XHU1MkEwXHU4RjdEXG4gICAgICAgIHRoaXMuZW5zdXJlU2V0dGluZ3NMb2FkZWQoKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdGFydEF1dG9SZWZyZXNoKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHaXQgXHU2NTg3XHU3QUUwXHU1NDBDXHU2QjY1XHU2M0QyXHU0RUY2XHU1REYyXHU1MkEwXHU4RjdEXCIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKFwiXHU1MkEwXHU4RjdEIEdpdCBcdTY1ODdcdTdBRTBcdTU0MENcdTZCNjVcdThCQkVcdTdGNkVcdTU5MzFcdThEMjVcdUZGMUFcIiwgZXJyKSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZW5zdXJlU2V0dGluZ3NMb2FkZWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzKSByZXR1cm47XG4gICAgICAgIGlmICghdGhpcy5zZXR0aW5nc1JlYWR5KSB7XG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzUmVhZHkgPSB0aGlzLmxvYWRTZXR0aW5ncygpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuc2V0dGluZ3NSZWFkeTtcbiAgICB9XG5cbiAgICBhc3luYyBsb2FkU2V0dGluZ3MoKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xuICAgIH1cblxuICAgIGFzeW5jIHNhdmVTZXR0aW5ncygpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcbiAgICB9XG5cbiAgICBhc3luYyBhY3RpdmF0ZUFydGljbGVzVmlldygpIHtcbiAgICAgICAgY29uc3QgeyB3b3Jrc3BhY2UgfSA9IHRoaXMuYXBwO1xuICAgICAgICBsZXQgbGVhZiA9IHdvcmtzcGFjZS5nZXRMZWF2ZXNPZlR5cGUoVklFV19UWVBFX0FSVElDTEVTKVswXTtcblxuICAgICAgICBpZiAoIWxlYWYpIHtcbiAgICAgICAgICAgIGxlYWYgPSB3b3Jrc3BhY2UuZ2V0TGVhZihcInRhYlwiKTtcbiAgICAgICAgICAgIGF3YWl0IGxlYWYuc2V0Vmlld1N0YXRlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBWSUVXX1RZUEVfQVJUSUNMRVMsXG4gICAgICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB3b3Jrc3BhY2UucmV2ZWFsTGVhZihsZWFmKTtcbiAgICB9XG5cbiAgICAvKiogXHU2ODM5XHU2MzZFXHU1RjUzXHU1MjREXHU4QkJFXHU3RjZFXHU5MUNEXHU1RUZBXHU4MUVBXHU1MkE4XHU1MjM3XHU2NUIwXHU1QjlBXHU2NUY2XHU1NjY4ICovXG4gICAgYXN5bmMgcmVzdGFydEF1dG9SZWZyZXNoKCkge1xuICAgICAgICB0aGlzLnN0b3BBdXRvUmVmcmVzaCgpO1xuXG4gICAgICAgIGNvbnN0IGludGVydmFsID0gdGhpcy5zZXR0aW5ncz8uYXV0b1JlZnJlc2hJbnRlcnZhbCA/PyAwO1xuICAgICAgICBpZiAoIWludGVydmFsIHx8IGludGVydmFsIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXV0b1JlZnJlc2hUaW1lciA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBcdTZDQTFcdTkxNERcdTdGNkVcdTRFRDNcdTVFOTNcdTVDMzFcdThERjNcdThGQzdcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncz8ucmVwb1VybCkgcmV0dXJuO1xuICAgICAgICAgICAgcmVmcmVzaEFydGljbGVzVmlldyh0aGlzLCB7IHNpbGVudDogdHJ1ZSB9KS5jYXRjaCgoZXJyKSA9PlxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlx1ODFFQVx1NTJBOFx1NTIzN1x1NjVCMFx1NjU4N1x1N0FFMFx1NTIxN1x1ODg2OFx1NTkzMVx1OEQyNVx1RkYxQVwiLCBlcnIpXG4gICAgICAgICAgICApO1xuICAgICAgICB9LCBpbnRlcnZhbCk7XG5cbiAgICAgICAgLy8gXHU2Q0U4XHU1MThDXHU1MjMwXHU2M0QyXHU0RUY2XHU3NTFGXHU1NDdEXHU1NDY4XHU2NzFGXHVGRjBDXHU1Mzc4XHU4RjdEXHU2NUY2XHU4MUVBXHU1MkE4XHU2RTA1XHU3NDA2XG4gICAgICAgIHRoaXMucmVnaXN0ZXJJbnRlcnZhbCh0aGlzLmF1dG9SZWZyZXNoVGltZXIpO1xuICAgIH1cblxuICAgIGFzeW5jIHN0b3BBdXRvUmVmcmVzaCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b1JlZnJlc2hUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5hdXRvUmVmcmVzaFRpbWVyKTtcbiAgICAgICAgICAgIHRoaXMuYXV0b1JlZnJlc2hUaW1lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBjbG9uZVRvVGVtcCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBhd2FpdCB0aGlzLmVuc3VyZVNldHRpbmdzTG9hZGVkKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLnJlcG9VcmwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlx1OEJGN1x1NTE0OFx1NTcyOFx1OEJCRVx1N0Y2RVx1NEUyRFx1NTg2Qlx1NTE5OSBHaXQgXHU0RUQzXHU1RTkzXHU1NzMwXHU1NzQwXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGVtcERpciA9IHBhdGguam9pbihcbiAgICAgICAgICAgIG9zLnRtcGRpcigpLFxuICAgICAgICAgICAgYG9ic2lkaWFuLWdpdC1hcnRpY2xlcy0ke0RhdGUubm93KCl9YFxuICAgICAgICApO1xuXG4gICAgICAgIGxldCB0ZW1wS2V5UGF0aDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGdpdCA9IHNpbXBsZUdpdCgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zc2hLZXkudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgdGVtcEtleVBhdGggPSBwYXRoLmpvaW4oXG4gICAgICAgICAgICAgICAgICAgIG9zLnRtcGRpcigpLFxuICAgICAgICAgICAgICAgICAgICBgb2JzaWRpYW4tZ2l0LWtleS0ke0RhdGUubm93KCl9YFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBhd2FpdCBmc3Aud3JpdGVGaWxlKFxuICAgICAgICAgICAgICAgICAgICB0ZW1wS2V5UGF0aCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5zc2hLZXkudHJpbSgpICsgXCJcXG5cIixcbiAgICAgICAgICAgICAgICAgICAgeyBtb2RlOiAwbzYwMCB9XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGdpdC5lbnYoe1xuICAgICAgICAgICAgICAgICAgICAuLi5wcm9jZXNzLmVudixcbiAgICAgICAgICAgICAgICAgICAgR0lUX1NTSF9DT01NQU5EOlxuICAgICAgICAgICAgICAgICAgICAgICAgYHNzaCAtaSBcIiR7dGVtcEtleVBhdGh9XCIgLW8gU3RyaWN0SG9zdEtleUNoZWNraW5nPW5vIC1vIFVzZXJLbm93bkhvc3RzRmlsZT0vZGV2L251bGxgLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhd2FpdCBnaXQuY2xvbmUodGhpcy5zZXR0aW5ncy5yZXBvVXJsLCB0ZW1wRGlyLCBbXG4gICAgICAgICAgICAgICAgXCItLWRlcHRoXCIsXG4gICAgICAgICAgICAgICAgXCIxXCIsXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRlbXBEaXI7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnJlbW92ZVRlbXBEaXIodGVtcERpcik7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGlmICh0ZW1wS2V5UGF0aCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGZzcC51bmxpbmsodGVtcEtleVBhdGgpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgICAgICAvLyBcdTVGRkRcdTc1NjVcdTRFMzRcdTY1RjZcdTVCQzZcdTk0QTVcdTZFMDVcdTc0MDZcdTU5MzFcdThEMjVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBnZXRSZW1vdGVBcnRpY2xlcyhyZXBvRGlyOiBzdHJpbmcpOiBQcm9taXNlPFJlbW90ZUFydGljbGVbXT4ge1xuICAgICAgICBjb25zdCBhcnRpY2xlczogUmVtb3RlQXJ0aWNsZVtdID0gW107XG5cbiAgICAgICAgY29uc3Qgd2FsayA9IGFzeW5jIChjdXJyZW50RGlyOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVudHJpZXMgPSBhd2FpdCBmc3AucmVhZGRpcihjdXJyZW50RGlyLCB7XG4gICAgICAgICAgICAgICAgd2l0aEZpbGVUeXBlczogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkubmFtZSA9PT0gXCIuZ2l0XCIpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgYWJzb2x1dGVQYXRoID0gcGF0aC5qb2luKGN1cnJlbnREaXIsIGVudHJ5Lm5hbWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgd2FsayhhYnNvbHV0ZVBhdGgpO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICFlbnRyeS5pc0ZpbGUoKSB8fFxuICAgICAgICAgICAgICAgICAgICBwYXRoLmV4dG5hbWUoZW50cnkubmFtZSkudG9Mb3dlckNhc2UoKSAhPT0gXCIubWRcIlxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBwYXRoXG4gICAgICAgICAgICAgICAgICAgIC5yZWxhdGl2ZShyZXBvRGlyLCBhYnNvbHV0ZVBhdGgpXG4gICAgICAgICAgICAgICAgICAgIC5zcGxpdChwYXRoLnNlcClcbiAgICAgICAgICAgICAgICAgICAgLmpvaW4oXCIvXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgW2NvbnRlbnQsIHN0YXRdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgICAgICBmc3AucmVhZEZpbGUoYWJzb2x1dGVQYXRoLCBcInV0ZjhcIiksXG4gICAgICAgICAgICAgICAgICAgIGZzcC5zdGF0KGFic29sdXRlUGF0aCksXG4gICAgICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgICAgICBhcnRpY2xlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHBhdGguYmFzZW5hbWUoZW50cnkubmFtZSwgcGF0aC5leHRuYW1lKGVudHJ5Lm5hbWUpKSxcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVQYXRoLFxuICAgICAgICAgICAgICAgICAgICBhYnNvbHV0ZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgIHNpemU6IHN0YXQuc2l6ZSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIFx1NkJDRlx1NTkwNFx1NzQwNlx1NEUwMFx1NjI3OVx1OEJBOVx1NTFGQVx1NEU4Qlx1NEVGNlx1NUZBQVx1NzNBRlx1RkYwQ1x1OTA3Rlx1NTE0RFx1OTU3Rlx1NEVGQlx1NTJBMVx1OTYzQlx1NTg1RSBVSVxuICAgICAgICAgICAgICAgIGlmIChhcnRpY2xlcy5sZW5ndGggJSA1MCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocikgPT4gc2V0VGltZW91dChyLCAwKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGF3YWl0IHdhbGsocmVwb0Rpcik7XG5cbiAgICAgICAgcmV0dXJuIGFydGljbGVzLnNvcnQoKGEsIGIpID0+XG4gICAgICAgICAgICBhLnRpdGxlLmxvY2FsZUNvbXBhcmUoYi50aXRsZSwgXCJ6aC1DTlwiKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGFzeW5jIGdldFJlbW90ZUZvbGRlcnMoKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgICAgICBjb25zdCB0ZW1wRGlyID0gYXdhaXQgdGhpcy5jbG9uZVRvVGVtcCgpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBmb2xkZXJzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHdhbGsgPSBhc3luYyAoXG4gICAgICAgICAgICAgICAgY3VycmVudERpcjogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlbGF0aXZlQmFzZSA9IFwiXCJcbiAgICAgICAgICAgICk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVudHJpZXMgPSBhd2FpdCBmc3AucmVhZGRpcihjdXJyZW50RGlyLCB7XG4gICAgICAgICAgICAgICAgICAgIHdpdGhGaWxlVHlwZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5Lm5hbWUgPT09IFwiLmdpdFwiKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhYnNvbHV0ZVBhdGggPSBwYXRoLmpvaW4oY3VycmVudERpciwgZW50cnkubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IHJlbGF0aXZlQmFzZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBwYXRoLmpvaW4ocmVsYXRpdmVCYXNlLCBlbnRyeS5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBlbnRyeS5uYW1lO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2xkZXJzLmFkZChyZWxhdGl2ZVBhdGguc3BsaXQocGF0aC5zZXApLmpvaW4oXCIvXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHdhbGsoYWJzb2x1dGVQYXRoLCByZWxhdGl2ZVBhdGgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgYXdhaXQgd2Fsayh0ZW1wRGlyKTtcblxuICAgICAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oZm9sZGVycykuc29ydCgoYSwgYikgPT5cbiAgICAgICAgICAgICAgICBhLmxvY2FsZUNvbXBhcmUoYiwgXCJ6aC1DTlwiKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucmVtb3ZlVGVtcERpcih0ZW1wRGlyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHJlbW92ZVRlbXBEaXIoZGlyOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKCFkaXIpIHJldHVybjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgZnNwLnJtKGRpciwgeyByZWN1cnNpdmU6IHRydWUsIGZvcmNlOiB0cnVlIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiXHU2RTA1XHU3NDA2IEdpdCBcdTRFMzRcdTY1RjZcdTc2RUVcdTVGNTVcdTU5MzFcdThEMjVcdUZGMUFcIiwgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb251bmxvYWQoKSB7XG4gICAgICAgIHRoaXMuc3RvcEF1dG9SZWZyZXNoKCk7XG4gICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5kZXRhY2hMZWF2ZXNPZlR5cGUoVklFV19UWVBFX0FSVElDTEVTKTtcbiAgICB9XG59IiwgIi8qKlxuICogV3JhcHMgb25lIG9yIG1vcmUgZmlsZSBwYXRocyBpbiBhbiBvYmplY3QgdGhhdCBgcGFyc2VDbGlgIHJlY29nbmlzZXMgYXNcbiAqIGV4cGxpY2l0IHBhdGhzcGVjcywgcm91dGluZyB0aGVtIHRvIGBQYXJzZWRDTEkucGF0aHNgIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlclxuICogYSBgLS1gIHNlcGFyYXRvciB0b2tlbiBpcyBwcmVzZW50LlxuICovXG5cbi8vIGJpb21lLWlnbm9yZSBsaW50L2NvbXBsZXhpdHkvbm9CYW5uZWRUeXBlczogPFVzZXMgU3RyaW5nIG9iamVjdCB0byBzYXRpc2Z5IFdlYWtNYXAgcmVxdWlyZW1ldG4+XG5jb25zdCBjYWNoZSA9IG5ldyBXZWFrTWFwPFN0cmluZywgc3RyaW5nW10+KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRoc3BlYyguLi5wYXRoczogc3RyaW5nW10pOiBzdHJpbmcge1xuICAgY29uc3Qga2V5ID0gbmV3IFN0cmluZyhwYXRocyk7XG4gICBjYWNoZS5zZXQoa2V5LCBwYXRocyk7XG4gICByZXR1cm4ga2V5IGFzIHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUGF0aFNwZWModmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nICYmIGNhY2hlLmhhcyh2YWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1BhdGhzKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICByZXR1cm4gY2FjaGUuZ2V0KHZhbHVlKSA/PyBbXTtcbn1cbiIsICJleHBvcnQgaW50ZXJmYWNlIEZsYWcge1xuICAgbmFtZTogc3RyaW5nO1xuICAgdmFsdWU/OiBzdHJpbmc7XG4gICAvKiogVmFsdWUgY2FtZSBmcm9tIHRoZSBuZXh0IHRva2VuIHJhdGhlciB0aGFuIGJlaW5nIGVtYmVkZGVkIGFmdGVyIGA9YC4gKi9cbiAgIGFic29yYmVkTmV4dDogYm9vbGVhbjtcbiAgIC8qKiBTd2l0Y2ggYXBwZWFyZWQgYmVmb3JlIHRoZSBnaXQgc3ViLWNvbW1hbmQuICovXG4gICBpc0dsb2JhbDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uKiBzY29wZWRGbGFncyhmbGFnczogRmxhZ1tdLCBzY29wZTogJ2dsb2JhbCcgfCAndGFzaycpIHtcbiAgIGNvbnN0IGZpbmRHbG9iYWwgPSBzY29wZSA9PT0gJ2dsb2JhbCc7XG4gICBmb3IgKGNvbnN0IGZsYWcgb2YgZmxhZ3MpIHtcbiAgICAgIGlmIChmbGFnLmlzR2xvYmFsID09PSBmaW5kR2xvYmFsKSB7XG4gICAgICAgICB5aWVsZCBmbGFnO1xuICAgICAgfVxuICAgfVxufVxuIiwgIi8vIEZsYWdzIHRoYXQgdW5hbWJpZ3VvdXNseSBzaWduYWwgYSB3cml0ZSBvcGVyYXRpb24gb24gZ2l0IGNvbmZpZy5cbmV4cG9ydCBjb25zdCBDT05GSUdfV1JJVEVfRkxBR1MgPSBuZXcgU2V0KFtcbiAgICctLWFkZCcsXG4gICAnLS1lZGl0JyxcbiAgICctLXJlbW92ZS1zZWN0aW9uJyxcbiAgICctLXJlbmFtZS1zZWN0aW9uJyxcbiAgICctLXJlcGxhY2UtYWxsJyxcbiAgICctLXVuc2V0JyxcbiAgICctLXVuc2V0LWFsbCcsXG4gICAnLWUnLFxuXSk7XG5cbi8vIEZsYWdzIHRoYXQgdW5hbWJpZ3VvdXNseSBzaWduYWwgYSByZWFkIG9wZXJhdGlvbi5cbmV4cG9ydCBjb25zdCBDT05GSUdfUkVBRF9GTEFHUyA9IG5ldyBTZXQoW1xuICAgJy0tZ2V0JyxcbiAgICctLWdldC1hbGwnLFxuICAgJy0tZ2V0LWNvbG9yJyxcbiAgICctLWdldC1jb2xvcmJvb2wnLFxuICAgJy0tZ2V0LXJlZ2V4cCcsXG4gICAnLS1nZXQtdXJsbWF0Y2gnLFxuICAgJy0tbGlzdCcsXG4gICAnLWwnLFxuXSk7XG5cbi8vIFN1Yi1jb21tYW5kIHZlcmJzIGFjY2VwdGVkIGFzIHRoZSBmaXJzdCBwb3NpdGlvbmFsIGJ5IG5ld2VyIGdpdCB2ZXJzaW9ucy5cbmV4cG9ydCBjb25zdCBDT05GSUdfV1JJVEVfVkVSQlMgPSBuZXcgU2V0KFtcbiAgICdlZGl0JyxcbiAgICdyZW1vdmUtc2VjdGlvbicsXG4gICAncmVuYW1lLXNlY3Rpb24nLFxuICAgJ3NldCcsXG4gICAndW5zZXQnLFxuXSk7XG5leHBvcnQgY29uc3QgQ09ORklHX1JFQURfVkVSQlMgPSBuZXcgU2V0KFsnZ2V0JywgJ2dldC1jb2xvcicsICdnZXQtY29sb3Jib29sJywgJ2xpc3QnXSk7XG4iLCAiaW1wb3J0IHR5cGUgeyBDb25maWdTY29wZSB9IGZyb20gJy4uL2FyZ3MvcGFyc2UtYXJndi50eXBlcyc7XG5pbXBvcnQgeyB0eXBlIEZsYWcsIHNjb3BlZEZsYWdzIH0gZnJvbSAnLi4vZmxhZ3MvZmxhZ3MuaGVscGVycyc7XG5pbXBvcnQgdHlwZSB7IENvbmZpZ09wZXJhdGlvbiB9IGZyb20gJy4vY29uZmlnLnR5cGVzJztcbmltcG9ydCB7XG4gICBDT05GSUdfUkVBRF9GTEFHUyxcbiAgIENPTkZJR19SRUFEX1ZFUkJTLFxuICAgQ09ORklHX1dSSVRFX0ZMQUdTLFxuICAgQ09ORklHX1dSSVRFX1ZFUkJTLFxufSBmcm9tICcuL2NvbmZpZy1vcGVyYW5kcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3RDb25maWdBY3Rpb24oZmxhZ3M6IEZsYWdbXSwgcG9zaXRpb25hbHM6IHN0cmluZ1tdKTogQ29uZmlnT3BlcmF0aW9uIHwgbnVsbCB7XG4gICBmb3IgKGNvbnN0IHsgbmFtZSB9IG9mIHNjb3BlZEZsYWdzKGZsYWdzLCAndGFzaycpKSB7XG4gICAgICBpZiAoQ09ORklHX1dSSVRFX0ZMQUdTLmhhcyhuYW1lKSkge1xuICAgICAgICAgcmV0dXJuIGNvbmZpZ09wZXJhdGlvbih0cnVlLCBwb3NpdGlvbmFscyk7XG4gICAgICB9XG4gICAgICBpZiAoQ09ORklHX1JFQURfRkxBR1MuaGFzKG5hbWUpKSB7XG4gICAgICAgICByZXR1cm4gY29uZmlnT3BlcmF0aW9uKGZhbHNlLCBwb3NpdGlvbmFscyk7XG4gICAgICB9XG4gICB9XG5cbiAgIGNvbnN0IHZlcmIgPSBwb3NpdGlvbmFscy5hdCgwKT8udG9Mb3dlckNhc2UoKTtcblxuICAgaWYgKHZlcmIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICB9XG5cbiAgIGlmIChDT05GSUdfV1JJVEVfVkVSQlMuaGFzKHZlcmIpKSB7XG4gICAgICByZXR1cm4gY29uZmlnT3BlcmF0aW9uKHRydWUsIHBvc2l0aW9uYWxzLnNsaWNlKDEpKTtcbiAgIH1cblxuICAgaWYgKENPTkZJR19SRUFEX1ZFUkJTLmhhcyh2ZXJiKSkge1xuICAgICAgcmV0dXJuIGNvbmZpZ09wZXJhdGlvbihmYWxzZSwgcG9zaXRpb25hbHMuc2xpY2UoMSkpO1xuICAgfVxuXG4gICBpZiAocG9zaXRpb25hbHMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gY29uZmlnT3BlcmF0aW9uKGZhbHNlLCBwb3NpdGlvbmFscyk7XG4gICB9XG5cbiAgIHJldHVybiBjb25maWdPcGVyYXRpb24odHJ1ZSwgcG9zaXRpb25hbHMpO1xufVxuXG5mdW5jdGlvbiBjb25maWdPcGVyYXRpb24oaXNXcml0ZSA9IGZhbHNlLCBwb3NpdGlvbmFsczogc3RyaW5nW10gPSBbXSk6IENvbmZpZ09wZXJhdGlvbiB8IG51bGwge1xuICAgY29uc3Qga2V5ID0gcG9zaXRpb25hbHMuYXQoMCk/LnRvTG93ZXJDYXNlKCk7XG5cbiAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICB9XG5cbiAgIHJldHVybiB7XG4gICAgICBpc1dyaXRlLFxuICAgICAgaXNSZWFkOiAhaXNXcml0ZSxcbiAgICAgIGtleSxcbiAgICAgIHZhbHVlOiBwb3NpdGlvbmFscy5hdCgxKSxcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b09wZXJhdGlvbihzY29wZTogQ29uZmlnU2NvcGUsIG9wZXJhdGlvbjogQ29uZmlnT3BlcmF0aW9uKSB7XG4gICBpZiAob3BlcmF0aW9uLmlzV3JpdGUgJiYgb3BlcmF0aW9uLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB7IGtleTogb3BlcmF0aW9uLmtleSwgdmFsdWU6IG9wZXJhdGlvbi52YWx1ZSwgc2NvcGUgfTtcbiAgIH1cbiAgIHJldHVybiB7IGtleTogb3BlcmF0aW9uLmtleSwgc2NvcGUgfTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IENvbmZpZ1Njb3BlLCBDb25maWdXcml0ZSwgUGFyc2VkQ29uZmlnQWN0aXZpdHkgfSBmcm9tICcuLi9hcmdzL3BhcnNlLWFyZ3YudHlwZXMnO1xuaW1wb3J0IHsgdHlwZSBGbGFnLCBzY29wZWRGbGFncyB9IGZyb20gJy4uL2ZsYWdzL2ZsYWdzLmhlbHBlcnMnO1xuaW1wb3J0IHR5cGUgeyBDb25maWdPcGVyYXRpb24gfSBmcm9tICcuL2NvbmZpZy50eXBlcyc7XG5pbXBvcnQgeyBkZXRlY3RDb25maWdBY3Rpb24sIHRvT3BlcmF0aW9uIH0gZnJvbSAnLi9kZXRlY3QtY29uZmlnLWFjdGlvbic7XG5cbmZ1bmN0aW9uIHBhcnNlQXNzaWdubWVudChyYXc6IHN0cmluZyB8IHVuZGVmaW5lZCk6IHsga2V5OiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfSB8IG51bGwge1xuICAgY29uc3QgZXEgPSByYXc/LmluZGV4T2YoJz0nKSB8fCAtMTtcblxuICAgaWYgKCFyYXcgfHwgZXEgPCAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgIH1cblxuICAgcmV0dXJuIHtcbiAgICAgIGtleTogcmF3LnNsaWNlKDAsIGVxKS50cmltKCkudG9Mb3dlckNhc2UoKSxcbiAgICAgIHZhbHVlOiByYXcuc2xpY2UoZXEgKyAxKSxcbiAgIH07XG59XG5cbmZ1bmN0aW9uIGRldGVjdENvbmZpZ1Njb3BlKGZsYWdzOiBGbGFnW10pOiBDb25maWdTY29wZSB7XG4gICBmb3IgKGNvbnN0IHsgbmFtZSB9IG9mIHNjb3BlZEZsYWdzKGZsYWdzLCAndGFzaycpKSB7XG4gICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgIGNhc2UgJy0tZ2xvYmFsJzpcbiAgICAgICAgICAgIHJldHVybiAnZ2xvYmFsJztcbiAgICAgICAgIGNhc2UgJy0tc3lzdGVtJzpcbiAgICAgICAgICAgIHJldHVybiAnc3lzdGVtJztcbiAgICAgICAgIGNhc2UgJy0td29ya3RyZWUnOlxuICAgICAgICAgICAgcmV0dXJuICd3b3JrdHJlZSc7XG4gICAgICAgICBjYXNlICctLWxvY2FsJzpcbiAgICAgICAgICAgIHJldHVybiAnbG9jYWwnO1xuICAgICAgICAgY2FzZSAnLS1maWxlJzpcbiAgICAgICAgIGNhc2UgJy1mJzpcbiAgICAgICAgICAgIHJldHVybiAnZmlsZSc7XG4gICAgICB9XG4gICB9XG4gICByZXR1cm4gJ2xvY2FsJztcbn1cblxuZnVuY3Rpb24gZGV0ZWN0Q29uZmlnT3ZlcnJpZGVTY29wZSh7IG5hbWUgfTogRmxhZyk6IENvbmZpZ1Njb3BlIHwgdm9pZCB7XG4gICBpZiAobmFtZSA9PT0gJy1jJyB8fCBuYW1lID09PSAnLS1jb25maWcnKSB7XG4gICAgICByZXR1cm4gJ2lubGluZSc7XG4gICB9XG4gICBpZiAobmFtZSA9PT0gJy0tY29uZmlnLWVudicpIHtcbiAgICAgIHJldHVybiAnZW52JztcbiAgIH1cbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgdGhlIHN0cmVhbSBvZiBDb25maWdXcml0ZSBzZXR0aW5ncyBmb3VuZCBpbiB0aGUgc3VwcGxpZWQgZmxhZ3MsXG4gKiB0cmlnZ2VyZWQgYnkgYC1jYCBhbmQgYC0tY29uZmlnYCBmb3IgaW5saW5lIGNvbmZpZ3VyYXRpb24gYW5kIGAtLWNvbmZpZy1lbnZgXG4gKiB0byBzZXQgYSBjb25maWcgc2V0dGluZyBiYXNlZCBvbiBlbnZpcm9ubWVudCB2YXJpYWJsZS5cbiAqL1xuZnVuY3Rpb24qIGNvbGxlY3RXcml0ZUZsYWdzKGZsYWdzOiBGbGFnW10pOiBHZW5lcmF0b3I8Q29uZmlnV3JpdGU+IHtcbiAgIGZvciAoY29uc3QgZmxhZyBvZiBmbGFncykge1xuICAgICAgY29uc3Qgc2NvcGUgPSBkZXRlY3RDb25maWdPdmVycmlkZVNjb3BlKGZsYWcpO1xuICAgICAgY29uc3QgYXNzaWdubWVudCA9IHNjb3BlICYmIHBhcnNlQXNzaWdubWVudChmbGFnLnZhbHVlKTtcblxuICAgICAgaWYgKGFzc2lnbm1lbnQpIHtcbiAgICAgICAgIHlpZWxkIHtcbiAgICAgICAgICAgIC4uLmFzc2lnbm1lbnQsXG4gICAgICAgICAgICBzY29wZSxcbiAgICAgICAgIH07XG4gICAgICB9XG4gICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xsZWN0Q29uZmlnQWNjZXNzKFxuICAgdGFzazogc3RyaW5nIHwgbnVsbCxcbiAgIGZsYWdzOiBGbGFnW10sXG4gICBwb3NpdGlvbmFsczogc3RyaW5nW11cbik6IFBhcnNlZENvbmZpZ0FjdGl2aXR5IHtcbiAgIGNvbnN0IHBhcnNlZENvbmZpZzogUGFyc2VkQ29uZmlnQWN0aXZpdHkgPSB7XG4gICAgICByZWFkOiBbXSxcbiAgICAgIHdyaXRlOiBbLi4uY29sbGVjdFdyaXRlRmxhZ3MoZmxhZ3MpXSxcbiAgIH07XG5cbiAgIGlmICh0YXNrID09PSAnY29uZmlnJykge1xuICAgICAgYXBwZW5kUGFyc2VkQ29uZmlnQWN0aW9uKFxuICAgICAgICAgcGFyc2VkQ29uZmlnLFxuICAgICAgICAgZGV0ZWN0Q29uZmlnU2NvcGUoZmxhZ3MpLFxuICAgICAgICAgZGV0ZWN0Q29uZmlnQWN0aW9uKGZsYWdzLCBwb3NpdGlvbmFscylcbiAgICAgICk7XG4gICB9XG5cbiAgIHJldHVybiBwYXJzZWRDb25maWc7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZFBhcnNlZENvbmZpZ0FjdGlvbihcbiAgIHBhcnNlZENvbmZpZzogUGFyc2VkQ29uZmlnQWN0aXZpdHksXG4gICBzY29wZTogQ29uZmlnU2NvcGUsXG4gICBhY3Rpb246IENvbmZpZ09wZXJhdGlvbiB8IG51bGxcbikge1xuICAgaWYgKGFjdGlvbiA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgfVxuXG4gICBjb25zdCBjb25maWcgPSB0b09wZXJhdGlvbihzY29wZSwgYWN0aW9uKTtcbiAgIGlmIChhY3Rpb24uaXNXcml0ZSkge1xuICAgICAgcGFyc2VkQ29uZmlnLndyaXRlLnB1c2goY29uZmlnKTtcbiAgIH0gZWxzZSB7XG4gICAgICBwYXJzZWRDb25maWcucmVhZC5wdXNoKGNvbmZpZyk7XG4gICB9XG59XG4iLCAiLy8g4pSA4pSAIE9wdGlvbiB0YWJsZXMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4vL1xuLy8gRWFjaCBzY29wZSBoYXM6XG4vLyAgIHNob3J0ICDigJMgTWFwPGNoYXIsIGNvbnN1bWVzTmV4dD4gIChrbm93biBzaW5nbGUtbGV0dGVyIHN3aXRjaGVzOyB0cnVlID0gdGFrZXMgbmV4dCB0b2tlbilcbi8vICAgbG9uZyAgIOKAkyBTZXQ8c3RlbT4gICAgICAgICAgICAgICAgKGxvbmcgc3dpdGNoIHN0ZW1zLCB3aXRob3V0IC0tLCB0aGF0IHRha2UgdGhlIG5leHQgdG9rZW4pXG4vL1xuLy8gT25seSBzd2l0Y2hlcyBsaXN0ZWQgaGVyZSBhcmUgXCJrbm93blwiLiBBbiB1bmtub3duIGNoYXIgYW55d2hlcmUgaW4gYSBjb21iaW5lZFxuLy8gY2x1c3RlciBjYXVzZXMgdGhlIGVudGlyZSBjbHVzdGVyIHRvIGJlIGtlcHQgYXMgb25lIG9wYXF1ZSB0b2tlbi5cblxuZXhwb3J0IGludGVyZmFjZSBGbGFnU3BlYyB7XG4gICByZWFkb25seSBzaG9ydDogUmVhZG9ubHlNYXA8c3RyaW5nLCBib29sZWFuPjtcbiAgIHJlYWRvbmx5IGxvbmc6IFJlYWRvbmx5U2V0PHN0cmluZz47XG59XG5cbmNvbnN0IFVOSVZFUlNBTDogRmxhZ1NwZWMgPSB7XG4gICBzaG9ydDogbmV3IE1hcChbXG4gICAgICBbJ2MnLCB0cnVlXSwgLy8gIC1jIDxrPXY+ICAgIHNldCBjb25maWcga2V5IGZvciB0aGlzIGludm9jYXRpb25cbiAgIF0pLFxuICAgbG9uZzogbmV3IFNldCgpLFxufTtcblxuZXhwb3J0IGNvbnN0IEdMT0JBTDogRmxhZ1NwZWMgPSB7XG4gICBzaG9ydDogbmV3IE1hcChbXG4gICAgICBbJ0MnLCB0cnVlXSwgLy8gIC1DIDxwYXRoPiAgIGNoYW5nZSB3b3JraW5nIGRpcmVjdG9yeVxuICAgICAgWydQJywgZmFsc2VdLCAvLyAtUCAgICAgICAgICBubyBwYWdlciAoYWxpYXMgZm9yIC0tbm8tcGFnZXIpXG4gICAgICBbJ2gnLCBmYWxzZV0sIC8vIC1oICAgICAgICAgIGhlbHBcbiAgICAgIFsncCcsIGZhbHNlXSwgLy8gLXAgICAgICAgICAgcGFnaW5hdGVcbiAgICAgIFsndicsIGZhbHNlXSwgLy8gLXYgICAgICAgICAgdmVyc2lvblxuICAgICAgLi4uVU5JVkVSU0FMLnNob3J0LmVudHJpZXMoKSxcbiAgIF0pLFxuICAgbG9uZzogbmV3IFNldChbXG4gICAgICAnYXR0ci1zb3VyY2UnLFxuICAgICAgJ2NvbmZpZy1lbnYnLFxuICAgICAgJ2V4ZWMtcGF0aCcsXG4gICAgICAnZ2l0LWRpcicsXG4gICAgICAnbGlzdC1jbWRzJyxcbiAgICAgICduYW1lc3BhY2UnLFxuICAgICAgJ3N1cGVyLXByZWZpeCcsXG4gICAgICAnd29yay10cmVlJyxcbiAgIF0pLFxufTtcblxuY29uc3QgQ09NTUFORFM6IFJlY29yZDxzdHJpbmcsIEZsYWdTcGVjPiA9IHtcbiAgIGNsb25lOiB7XG4gICAgICBzaG9ydDogbmV3IE1hcChbXG4gICAgICAgICBbJ2InLCB0cnVlXSwgLy8gLWIgPGJyYW5jaD5cbiAgICAgICAgIFsnaicsIHRydWVdLCAvLyAtaiA8bj4gICAgICAgICAgcGFyYWxsZWwgam9ic1xuICAgICAgICAgWydsJywgZmFsc2VdLCAvLyAtbCBsb2NhbFxuICAgICAgICAgWyduJywgZmFsc2VdLCAvLyAtbiBuby1jaGVja291dFxuICAgICAgICAgWydvJywgdHJ1ZV0sIC8vIC1vIDxuYW1lPiAgICAgICByZW1vdGUgbmFtZVxuICAgICAgICAgWydxJywgZmFsc2VdLCAvLyAtcSBxdWlldFxuICAgICAgICAgWydzJywgZmFsc2VdLCAvLyAtcyBzaGFyZWRcbiAgICAgICAgIFsndScsIHRydWVdLCAvLyAtdSA8dXBsb2FkLXBhY2s+XG4gICAgICBdKSxcbiAgICAgIGxvbmc6IG5ldyBTZXQoWydicmFuY2gnLCAnY29uZmlnJywgJ2pvYnMnLCAnb3JpZ2luJywgJ3VwbG9hZC1wYWNrJywgJ3UnLCAndGVtcGxhdGUnXSksXG4gICB9LFxuICAgY29tbWl0OiB7XG4gICAgICBzaG9ydDogbmV3IE1hcChbXG4gICAgICAgICBbJ0MnLCB0cnVlXSwgLy8gLUMgPGNvbW1pdD4gIHJldXNlIG1lc3NhZ2VcbiAgICAgICAgIFsnRicsIHRydWVdLCAvLyAtRiA8ZmlsZT4gICAgcmVhZCBtZXNzYWdlIGZyb20gZmlsZVxuICAgICAgICAgWydjJywgdHJ1ZV0sIC8vIC1jIDxjb21taXQ+ICByZWVkaXQgbWVzc2FnZVxuICAgICAgICAgWydtJywgdHJ1ZV0sIC8vIC1tIDxtc2c+XG4gICAgICAgICBbJ3QnLCB0cnVlXSwgLy8gLXQgPHRlbXBsYXRlPlxuICAgICAgXSksXG4gICAgICBsb25nOiBuZXcgU2V0KFsnZmlsZScsICdtZXNzYWdlJywgJ3JlZWRpdC1tZXNzYWdlJywgJ3JldXNlLW1lc3NhZ2UnLCAndGVtcGxhdGUnXSksXG4gICB9LFxuICAgY29uZmlnOiB7XG4gICAgICBzaG9ydDogbmV3IE1hcChbXG4gICAgICAgICBbJ2UnLCBmYWxzZV0sIC8vIC1lICBvcGVuIGVkaXRvclxuICAgICAgICAgWydmJywgdHJ1ZV0sIC8vICAtZiA8ZmlsZT5cbiAgICAgICAgIFsnbCcsIGZhbHNlXSwgLy8gLWwgIGxpc3RcbiAgICAgIF0pLFxuICAgICAgbG9uZzogbmV3IFNldChbJ2Jsb2InLCAnY29tbWVudCcsICdkZWZhdWx0JywgJ2ZpbGUnLCAndHlwZScsICd2YWx1ZSddKSxcbiAgIH0sXG4gICBmZXRjaDoge1xuICAgICAgc2hvcnQ6IG5ldyBNYXAoKSxcbiAgICAgIGxvbmc6IG5ldyBTZXQoWyd1cGxvYWQtcGFjayddKSxcbiAgIH0sXG4gICBpbml0OiB7XG4gICAgICBzaG9ydDogbmV3IE1hcCgpLFxuICAgICAgbG9uZzogbmV3IFNldChbJ3RlbXBsYXRlJ10pLFxuICAgfSxcbiAgIHB1bGw6IHtcbiAgICAgIHNob3J0OiBuZXcgTWFwKCksXG4gICAgICBsb25nOiBuZXcgU2V0KFsndXBsb2FkLXBhY2snXSksXG4gICB9LFxuICAgcHVzaDoge1xuICAgICAgc2hvcnQ6IG5ldyBNYXAoKSxcbiAgICAgIGxvbmc6IG5ldyBTZXQoWydleGVjJywgJ3JlY2VpdmUtcGFjayddKSxcbiAgIH0sXG4gICByZWJhc2U6IHtcbiAgICAgIHNob3J0OiBuZXcgTWFwKFtcbiAgICAgICAgIFsnWCcsIHRydWVdLCAvLyAtWCA8b3B0aW9uPiAgIHN0cmF0ZWd5IG9wdGlvblxuICAgICAgICAgWydmJywgZmFsc2VdLCAvLyAtZiBmb3JjZS1yZWJhc2VcbiAgICAgICAgIFsnaScsIGZhbHNlXSwgLy8gLWkgaW50ZXJhY3RpdmVcbiAgICAgICAgIFsnaycsIGZhbHNlXSwgLy8gLWsga2VlcC1iYXNlXG4gICAgICAgICBbJ20nLCBmYWxzZV0sIC8vIC1tIG1lcmdlXG4gICAgICAgICBbJ24nLCBmYWxzZV0sIC8vIC1uIG5vLXN0YXRcbiAgICAgICAgIFsncScsIGZhbHNlXSwgLy8gLXEgcXVpZXRcbiAgICAgICAgIFsncicsIGZhbHNlXSwgLy8gLXIgcmViYXNlLW1lcmdlc1xuICAgICAgICAgWydzJywgdHJ1ZV0sIC8vIC1zIDxzdHJhdGVneT5cbiAgICAgICAgIFsndicsIGZhbHNlXSwgLy8gLXYgdmVyYm9zZVxuICAgICAgICAgWyd4JywgdHJ1ZV0sIC8vIC14IDxjbWQ+ICAgICAgZXhlY1xuICAgICAgXSksXG4gICAgICBsb25nOiBuZXcgU2V0KFsnZXhlYycsICdvbnRvJywgJ3N0cmF0ZWd5JywgJ3N0cmF0ZWd5LW9wdGlvbiddKSxcbiAgIH0sXG59O1xuXG5jb25zdCBFTVBUWTogRmxhZ1NwZWMgPSB7IHNob3J0OiBuZXcgTWFwKCksIGxvbmc6IG5ldyBTZXQoKSB9O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmxhZ1NwZWNGb3JUYXNrKHRhc2s/OiBzdHJpbmcgfCBudWxsKSB7XG4gICBjb25zdCBzcGVjID0gQ09NTUFORFNbdGFzayA/PyAnJ10gPz8gRU1QVFk7XG5cbiAgIHJldHVybiB7XG4gICAgICBzaG9ydDogbmV3IE1hcChbLi4uVU5JVkVSU0FMLnNob3J0LmVudHJpZXMoKSwgLi4uc3BlYy5zaG9ydC5lbnRyaWVzKCldKSxcbiAgICAgIGxvbmc6IHNwZWMubG9uZyxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHsgR0xPQkFMIH0gZnJvbSAnLi9mbGFnLXNwZWNzJztcblxuLyoqIFBhcnNlIGEgc2luZ2xlIHJhdyB0b2tlbiAoZS5nLiBgJy1tJ2AsIGAnLS1hbWVuZCdgLCBgJy11YydgKSBpbnRvIG9uZSBvclxuICogIG1vcmUgc3dpdGNoIGRlc2NyaXB0b3JzLiAgVmFsdWVzIGFyZSBub3QgeWV0IHJlc29sdmVkIGZvciBuZWVkc05leHQ9dHJ1ZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHBhbmRUb2tlbihcbiAgIHJhdzogc3RyaW5nLFxuICAgc3BlYyA9IEdMT0JBTFxuKTogQXJyYXk8e1xuICAgbmFtZTogc3RyaW5nO1xuICAgdmFsdWU/OiBzdHJpbmc7XG4gICBuZWVkc05leHQ6IGJvb2xlYW47XG59PiB7XG4gICBpZiAocmF3LnN0YXJ0c1dpdGgoJy0tJykpIHtcbiAgICAgIGNvbnN0IGVxID0gcmF3LmluZGV4T2YoJz0nKTtcbiAgICAgIGlmIChlcSA+IDIpIHtcbiAgICAgICAgIHJldHVybiBbeyBuYW1lOiByYXcuc2xpY2UoMCwgZXEpLCB2YWx1ZTogcmF3LnNsaWNlKGVxICsgMSksIG5lZWRzTmV4dDogZmFsc2UgfV07XG4gICAgICB9XG4gICAgICBjb25zdCBzdGVtID0gcmF3LnNsaWNlKDIpO1xuICAgICAgcmV0dXJuIFt7IG5hbWU6IHJhdywgbmVlZHNOZXh0OiBzcGVjLmxvbmcuaGFzKHN0ZW0pIH1dO1xuICAgfVxuXG4gICAvLyBTaW5nbGUgc2hvcnQgc3dpdGNoXG4gICBpZiAocmF3Lmxlbmd0aCA9PT0gMikge1xuICAgICAgY29uc3QgY2hhciA9IHJhdy5jaGFyQXQoMSk7XG4gICAgICBjb25zdCBjb25zdW1lcyA9IHNwZWMuc2hvcnQuZ2V0KGNoYXIpO1xuICAgICAgcmV0dXJuIFt7IG5hbWU6IHJhdywgbmVlZHNOZXh0OiBjb25zdW1lcyA9PT0gdHJ1ZSB9XTtcbiAgIH1cblxuICAgLy8gQ29tYmluZWQgc2hvcnQgY2x1c3RlcjogdHJ5IHRvIGV4cGFuZCBjaGFyLWJ5LWNoYXJcbiAgIHJldHVybiBleHBhbmRDbHVzdGVyKHJhdywgc3BlYy5zaG9ydCk7XG59XG5cbmZ1bmN0aW9uIGV4cGFuZENsdXN0ZXIoXG4gICByYXc6IHN0cmluZyxcbiAgIHNob3J0U3BlYzogUmVhZG9ubHlNYXA8c3RyaW5nLCBib29sZWFuPlxuKTogQXJyYXk8eyBuYW1lOiBzdHJpbmc7IHZhbHVlPzogc3RyaW5nOyBuZWVkc05leHQ6IGJvb2xlYW4gfT4ge1xuICAgY29uc3QgY2hhcnMgPSByYXcuc2xpY2UoMSkuc3BsaXQoJycpO1xuICAgY29uc3QgcmVzdWx0OiBBcnJheTx7IG5hbWU6IHN0cmluZzsgdmFsdWU/OiBzdHJpbmc7IG5lZWRzTmV4dDogYm9vbGVhbiB9PiA9IFtdO1xuXG4gICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjaGFyID0gY2hhcnNbaV07XG4gICAgICBjb25zdCBjb25zdW1lcyA9IHNob3J0U3BlYy5nZXQoY2hhcik7XG5cbiAgICAgIGlmIChjb25zdW1lcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAvLyBVbmtub3duIGNoYXI6IGtlZXAgdGhlIHdob2xlIHJhdyB0b2tlbiBhcyBvcGFxdWVcbiAgICAgICAgIHJldHVybiBbeyBuYW1lOiByYXcsIG5lZWRzTmV4dDogZmFsc2UgfV07XG4gICAgICB9XG5cbiAgICAgIGlmIChjb25zdW1lcykge1xuICAgICAgICAgY29uc3QgcmVtYWluZGVyID0gY2hhcnMuc2xpY2UoaSArIDEpLmpvaW4oJycpO1xuICAgICAgICAgaWYgKHJlbWFpbmRlcikge1xuICAgICAgICAgICAgY29uc3QgcmVtYWluZGVyQWxsS25vd24gPSBbLi4ucmVtYWluZGVyXS5ldmVyeSgoYykgPT4gc2hvcnRTcGVjLmhhcyhjKSk7XG4gICAgICAgICAgICBpZiAoIXJlbWFpbmRlckFsbEtub3duKSB7XG4gICAgICAgICAgICAgICAvLyBSZW1haW5pbmcgY2hhcnMgYXJlIHRoZSBlbWJlZGRlZCB2YWx1ZSwgbm90IHNlcGFyYXRlIGZsYWdzXG4gICAgICAgICAgICAgICByZXN1bHQucHVzaCh7IG5hbWU6IGAtJHtjaGFyfWAsIHZhbHVlOiByZW1haW5kZXIsIG5lZWRzTmV4dDogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXN1bHQucHVzaCh7IG5hbWU6IGAtJHtjaGFyfWAsIG5lZWRzTmV4dDogY29uc3VtZXMgfSk7XG4gICB9XG5cbiAgIHJldHVybiByZXN1bHQ7XG59XG4iLCAiaW1wb3J0IHsgZXhwYW5kVG9rZW4gfSBmcm9tICcuLi90b2tlbnMvdG9rZW4tZXhwYW5kZXInO1xuaW1wb3J0IHR5cGUgeyBGbGFnIH0gZnJvbSAnLi9mbGFncy5oZWxwZXJzJztcblxuZXhwb3J0IGludGVyZmFjZSBHbG9iYWxGbGFncyB7XG4gICBmbGFnczogRmxhZ1tdO1xuICAgdGFza0luZGV4OiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUdsb2JhbEZsYWdzKHRva2VuczogcmVhZG9ubHkgdW5rbm93bltdLCBmbGFnczogRmxhZ1tdID0gW10pOiBHbG9iYWxGbGFncyB7XG4gICBsZXQgaSA9IDA7XG5cbiAgIHdoaWxlIChpIDwgdG9rZW5zLmxlbmd0aCkge1xuICAgICAgY29uc3QgcmF3ID0gU3RyaW5nKHRva2Vuc1tpXSk7XG4gICAgICBpZiAoIXJhdy5zdGFydHNXaXRoKCctJykgfHwgcmF3Lmxlbmd0aCA8IDIpIGJyZWFrO1xuXG4gICAgICBjb25zdCBwYXJzZWQgPSBleHBhbmRUb2tlbihyYXcpO1xuICAgICAgbGV0IG5leHQgPSBpICsgMTtcblxuICAgICAgZm9yIChjb25zdCB0b2tlbiBvZiBwYXJzZWQpIHtcbiAgICAgICAgIGNvbnN0IGZsYWc6IEZsYWcgPSB7XG4gICAgICAgICAgICBuYW1lOiB0b2tlbi5uYW1lLFxuICAgICAgICAgICAgdmFsdWU6IHRva2VuLnZhbHVlLFxuICAgICAgICAgICAgYWJzb3JiZWROZXh0OiBmYWxzZSxcbiAgICAgICAgICAgIGlzR2xvYmFsOiB0cnVlLFxuICAgICAgICAgfTtcbiAgICAgICAgIGlmICh0b2tlbi5uZWVkc05leHQgJiYgZmxhZy52YWx1ZSA9PT0gdW5kZWZpbmVkICYmIG5leHQgPCB0b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBmbGFnLnZhbHVlID0gU3RyaW5nKHRva2Vuc1tuZXh0XSk7XG4gICAgICAgICAgICBmbGFnLmFic29yYmVkTmV4dCA9IHRydWU7XG4gICAgICAgICAgICBuZXh0Kys7XG4gICAgICAgICB9XG4gICAgICAgICBmbGFncy5wdXNoKGZsYWcpO1xuICAgICAgfVxuXG4gICAgICBpID0gbmV4dDtcbiAgIH1cblxuICAgcmV0dXJuIHsgZmxhZ3MsIHRhc2tJbmRleDogaSB9O1xufVxuIiwgImltcG9ydCB7IGlzUGF0aFNwZWMsIHRvUGF0aHMgfSBmcm9tICdAc2ltcGxlLWdpdC9hcmdzLXBhdGhzcGVjJztcblxuaW1wb3J0IHsgZ2V0RmxhZ1NwZWNGb3JUYXNrIH0gZnJvbSAnLi4vdG9rZW5zL2ZsYWctc3BlY3MnO1xuaW1wb3J0IHsgZXhwYW5kVG9rZW4gfSBmcm9tICcuLi90b2tlbnMvdG9rZW4tZXhwYW5kZXInO1xuaW1wb3J0IHR5cGUgeyBGbGFnIH0gZnJvbSAnLi9mbGFncy5oZWxwZXJzJztcblxudHlwZSBUYXNrRmxhZ3MgPSB7XG4gICBmbGFnczogRmxhZ1tdO1xuICAgcG9zaXRpb25hbHM6IHN0cmluZ1tdO1xuICAgcGF0aHNwZWNzOiBzdHJpbmdbXTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVRhc2tGbGFncyhcbiAgIHRva2VuczogcmVhZG9ubHkgdW5rbm93bltdLFxuICAgdGFzazogc3RyaW5nIHwgbnVsbCxcbiAgIGZsYWdzOiBGbGFnW10gPSBbXVxuKTogVGFza0ZsYWdzIHtcbiAgIGNvbnN0IHNwZWMgPSBnZXRGbGFnU3BlY0ZvclRhc2sodGFzayk7XG4gICBjb25zdCBwb3NpdGlvbmFsczogc3RyaW5nW10gPSBbXTtcbiAgIGNvbnN0IHBhdGhzcGVjczogc3RyaW5nW10gPSBbXTtcblxuICAgbGV0IGkgPSAwO1xuICAgd2hpbGUgKGkgPCB0b2tlbnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gdG9rZW5zW2ldO1xuXG4gICAgICBpZiAoaXNQYXRoU3BlYyhjdXJyZW50KSkge1xuICAgICAgICAgcGF0aHNwZWNzLnB1c2goLi4udG9QYXRocyhjdXJyZW50IGFzIHN0cmluZykpO1xuICAgICAgICAgaSsrO1xuICAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJhdyA9IFN0cmluZyhjdXJyZW50KTtcblxuICAgICAgaWYgKHJhdyA9PT0gJy0tJykge1xuICAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgdG9rZW5zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCB0ID0gdG9rZW5zW2pdO1xuICAgICAgICAgICAgaXNQYXRoU3BlYyh0KSA/IHBhdGhzcGVjcy5wdXNoKC4uLnRvUGF0aHModCBhcyBzdHJpbmcpKSA6IHBhdGhzcGVjcy5wdXNoKFN0cmluZyh0KSk7XG4gICAgICAgICB9XG4gICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKCFyYXcuc3RhcnRzV2l0aCgnLScpIHx8IHJhdy5sZW5ndGggPCAyKSB7XG4gICAgICAgICBwb3NpdGlvbmFscy5wdXNoKHJhdyk7XG4gICAgICAgICBpKys7XG4gICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFyc2VkID0gZXhwYW5kVG9rZW4ocmF3LCBzcGVjKTtcbiAgICAgIGxldCBuZXh0ID0gaSArIDE7XG5cbiAgICAgIGZvciAoY29uc3QgdG9rZW4gb2YgcGFyc2VkKSB7XG4gICAgICAgICBjb25zdCBmbGFnOiBGbGFnID0ge1xuICAgICAgICAgICAgbmFtZTogdG9rZW4ubmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiB0b2tlbi52YWx1ZSxcbiAgICAgICAgICAgIGFic29yYmVkTmV4dDogZmFsc2UsXG4gICAgICAgICAgICBpc0dsb2JhbDogZmFsc2UsXG4gICAgICAgICB9O1xuICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdG9rZW4ubmVlZHNOZXh0ICYmXG4gICAgICAgICAgICBmbGFnLnZhbHVlID09PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIG5leHQgPCB0b2tlbnMubGVuZ3RoICYmXG4gICAgICAgICAgICAhaXNQYXRoU3BlYyh0b2tlbnNbbmV4dF0pXG4gICAgICAgICApIHtcbiAgICAgICAgICAgIGZsYWcudmFsdWUgPSBTdHJpbmcodG9rZW5zW25leHRdKTtcbiAgICAgICAgICAgIGZsYWcuYWJzb3JiZWROZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgIG5leHQrKztcbiAgICAgICAgIH1cbiAgICAgICAgIGZsYWdzLnB1c2goZmxhZyk7XG4gICAgICB9XG5cbiAgICAgIGkgPSBuZXh0O1xuICAgfVxuXG4gICByZXR1cm4geyBmbGFncywgcG9zaXRpb25hbHMsIHBhdGhzcGVjcyB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgUGFyc2VkQ29uZmlnQWN0aXZpdHkgfSBmcm9tICcuLi9hcmdzL3BhcnNlLWFyZ3YudHlwZXMnO1xuaW1wb3J0IHR5cGUgeyBWdWxuZXJhYmlsaXR5LCBWdWxuZXJhYmlsaXR5Q2F0ZWdvcnkgfSBmcm9tICcuL3Z1bG5lcmFiaWxpdHkudHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24qIGRldGVjdFZ1bG5lcmFibGVDb25maWdXcml0ZXMoe1xuICAgd3JpdGUsXG59OiBQYXJzZWRDb25maWdBY3Rpdml0eSk6IEdlbmVyYXRvcjxWdWxuZXJhYmlsaXR5PiB7XG4gICBmb3IgKGNvbnN0IGNvbmZpZyBvZiB3cml0ZSkge1xuICAgICAgZm9yIChjb25zdCBoZWxwZXIgb2YgcHJldmVudFVuc2FmZUNvbmZpZykge1xuICAgICAgICAgY29uc3QgdnVsbmVyYWJpbGl0eSA9IGhlbHBlcihjb25maWcua2V5KTtcbiAgICAgICAgIGlmICh2dWxuZXJhYmlsaXR5KSB7XG4gICAgICAgICAgICB5aWVsZCB2dWxuZXJhYmlsaXR5O1xuICAgICAgICAgfVxuICAgICAgfVxuICAgfVxufVxuXG5mdW5jdGlvbiBwcmV2ZW50Q29uZmlnQnVpbGRlcihcbiAgIGNvbmZpZzogc3RyaW5nIHwgUmVnRXhwLFxuICAgY2F0ZWdvcnk6IFZ1bG5lcmFiaWxpdHlDYXRlZ29yeSxcbiAgIG1lc3NhZ2UgPSBTdHJpbmcoY29uZmlnKVxuKSB7XG4gICBjb25zdCByZWdleCA9IHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnID8gbmV3IFJlZ0V4cChgXFxcXHMqJHtjb25maWcudG9Mb3dlckNhc2UoKX1gKSA6IGNvbmZpZztcblxuICAgcmV0dXJuIGZ1bmN0aW9uIHByZXZlbnRDb21tYW5kKGtleTogc3RyaW5nKTogVnVsbmVyYWJpbGl0eSB8IHZvaWQge1xuICAgICAgaWYgKHJlZ2V4LnRlc3Qoa2V5KSkge1xuICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNhdGVnb3J5LFxuICAgICAgICAgICAgbWVzc2FnZTogYENvbmZpZ3VyaW5nICR7bWVzc2FnZX0gaXMgbm90IHBlcm1pdHRlZCB3aXRob3V0IGVuYWJsaW5nICR7Y2F0ZWdvcnl9YCxcbiAgICAgICAgIH07XG4gICAgICB9XG4gICB9O1xufVxuXG5mdW5jdGlvbiBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKGNvbmZpZzogc3RyaW5nLCBjYXRlZ29yeTogVnVsbmVyYWJpbGl0eUNhdGVnb3J5KSB7XG4gICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYFxcXFxzKiR7Y29uZmlnLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFwuL2csICcoLi4rKT8uJyl9YCk7XG4gICByZXR1cm4gcHJldmVudENvbmZpZ0J1aWxkZXIocmVnZXgsIGNhdGVnb3J5LCBjb25maWcpO1xufVxuXG5jb25zdCBwcmV2ZW50VW5zYWZlQ29uZmlnID0gW1xuICAgcHJldmVudENvbmZpZ0J1aWxkZXIoJ2FsaWFzJywgJ2FsbG93VW5zYWZlQWxpYXMnKSxcbiAgIHByZXZlbnRDb25maWdCdWlsZGVyKCdjb3JlLmFza1Bhc3MnLCAnYWxsb3dVbnNhZmVBc2tQYXNzJyksXG4gICBwcmV2ZW50Q29uZmlnQnVpbGRlcignY29yZS5lZGl0b3InLCAnYWxsb3dVbnNhZmVFZGl0b3InKSxcbiAgIHByZXZlbnRDb25maWdCdWlsZGVyKCdjb3JlLmZzbW9uaXRvcicsICdhbGxvd1Vuc2FmZUZzTW9uaXRvcicpLFxuICAgcHJldmVudENvbmZpZ0J1aWxkZXIoJ2NvcmUuZ2l0UHJveHknLCAnYWxsb3dVbnNhZmVHaXRQcm94eScpLFxuICAgcHJldmVudENvbmZpZ0J1aWxkZXIoJ2NvcmUuaG9va3NQYXRoJywgJ2FsbG93VW5zYWZlSG9va3NQYXRoJyksXG4gICBwcmV2ZW50Q29uZmlnQnVpbGRlcignY29yZS5wYWdlcicsICdhbGxvd1Vuc2FmZVBhZ2VyJyksXG4gICBwcmV2ZW50Q29uZmlnQnVpbGRlcignY29yZS5zc2hDb21tYW5kJywgJ2FsbG93VW5zYWZlU3NoQ29tbWFuZCcpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcignY3JlZGVudGlhbC5oZWxwZXInLCAnYWxsb3dVbnNhZmVDcmVkZW50aWFsSGVscGVyJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCdkaWZmLmNvbW1hbmQnLCAnYWxsb3dVbnNhZmVEaWZmRXh0ZXJuYWwnKSxcbiAgIHByZXZlbnRDb25maWdCdWlsZGVyKCdkaWZmLmV4dGVybmFsJywgJ2FsbG93VW5zYWZlRGlmZkV4dGVybmFsJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCdkaWZmdG9vbC5jbWQnLCAnYWxsb3dVbnNhZmVEaWZmRXh0ZXJuYWwnKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ2RpZmYudGV4dGNvbnYnLCAnYWxsb3dVbnNhZmVEaWZmVGV4dENvbnYnKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ2ZpbHRlci5jbGVhbicsICdhbGxvd1Vuc2FmZUZpbHRlcicpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcignZmlsdGVyLnByb2Nlc3MnLCAnYWxsb3dVbnNhZmVGaWx0ZXInKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ2ZpbHRlci5zbXVkZ2UnLCAnYWxsb3dVbnNhZmVGaWx0ZXInKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ2dwZy5wcm9ncmFtJywgJ2FsbG93VW5zYWZlR3BnUHJvZ3JhbScpLFxuICAgcHJldmVudENvbmZpZ0J1aWxkZXIoJ2luY2x1ZGUucGF0aCcsICdhbGxvd1Vuc2FmZUluY2x1ZGUnKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ2luY2x1ZGVJZicsICdhbGxvd1Vuc2FmZUluY2x1ZGUnKSxcbiAgIHByZXZlbnRDb25maWdCdWlsZGVyKCdpbml0LnRlbXBsYXRlRGlyJywgJ2FsbG93VW5zYWZlVGVtcGxhdGVEaXInKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ3BhZ2VyLicsICdhbGxvd1Vuc2FmZVBhZ2VyJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCdtZXJnZS5kcml2ZXInLCAnYWxsb3dVbnNhZmVNZXJnZURyaXZlcicpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcignbWVyZ2V0b29sLnBhdGgnLCAnYWxsb3dVbnNhZmVNZXJnZURyaXZlcicpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcignbWVyZ2V0b29sLmNtZCcsICdhbGxvd1Vuc2FmZU1lcmdlRHJpdmVyJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCdwcm90b2NvbC5hbGxvdycsICdhbGxvd1Vuc2FmZVByb3RvY29sT3ZlcnJpZGUnKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ3JlbW90ZS5yZWNlaXZlcGFjaycsICdhbGxvd1Vuc2FmZVBhY2snKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ3JlbW90ZS51cGxvYWRwYWNrJywgJ2FsbG93VW5zYWZlUGFjaycpLFxuICAgcHJldmVudENvbmZpZ0J1aWxkZXIoJ3VwbG9hZHBhY2sucGFja09iamVjdHNIb29rJywgJ2FsbG93VW5zYWZlUGFjaycpLFxuICAgcHJldmVudENvbmZpZ0J1aWxkZXIoJ3NlcXVlbmNlLmVkaXRvcicsICdhbGxvd1Vuc2FmZUVkaXRvcicpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcignc3VibW9kdWxlLnVwZGF0ZScsICdhbGxvd1Vuc2FmZVN1Ym1vZHVsZScpLFxuICAgcHJldmVudEV4cGFuZGVkQ29uZmlnQnVpbGRlcigndGFyLmNvbW1hbmQnLCAnYWxsb3dVbnNhZmVDb21tYW5kQmluYXJpZXMnKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ3RyYWlsZXIuY21kJywgJ2FsbG93VW5zYWZlQ29tbWFuZEJpbmFyaWVzJyksXG4gICBwcmV2ZW50RXhwYW5kZWRDb25maWdCdWlsZGVyKCd0cmFpbGVyLmNvbW1hbmQnLCAnYWxsb3dVbnNhZmVDb21tYW5kQmluYXJpZXMnKSxcbiAgIHByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIoJ3VybC5pbnN0ZWFkT2YnLCAnYWxsb3dVbnNhZmVVcmxSZXdyaXRlJyksXG5dO1xuIiwgImltcG9ydCB0eXBlIHsgRmxhZyB9IGZyb20gJy4uL2ZsYWdzL2ZsYWdzLmhlbHBlcnMnO1xuaW1wb3J0IHR5cGUgeyBWdWxuZXJhYmlsaXR5LCBWdWxuZXJhYmlsaXR5Q2F0ZWdvcnkgfSBmcm9tICcuL3Z1bG5lcmFiaWxpdHkudHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24qIGRldGVjdFZ1bG5lcmFibGVGbGFncyhcbiAgIHRhc2s6IG51bGwgfCBzdHJpbmcsXG4gICBmbGFnczogRmxhZ1tdXG4pOiBHZW5lcmF0b3I8VnVsbmVyYWJpbGl0eT4ge1xuICAgZm9yIChjb25zdCBmbGFnIG9mIGZsYWdzKSB7XG4gICAgICBmb3IgKGNvbnN0IGhlbHBlciBvZiBwcmV2ZW50VW5zYWZlRmxhZ3MpIHtcbiAgICAgICAgIGNvbnN0IHZ1bG5lcmFiaWxpdHkgPSBoZWxwZXIodGFzaywgZmxhZyk7XG4gICAgICAgICBpZiAodnVsbmVyYWJpbGl0eSkge1xuICAgICAgICAgICAgeWllbGQgdnVsbmVyYWJpbGl0eTtcbiAgICAgICAgIH1cbiAgICAgIH1cbiAgIH1cbn1cblxuaW50ZXJmYWNlIFByZXZlbnRGbGFnT3B0aW9ucyB7XG4gICAvKiogTGFiZWwgdG8gdXNlIGluIHRoZSBlcnJvciBtZXNzYWdlIGluIHBsYWNlIG9mIHRoZSBtYXRjaGVyIGl0c2VsZiAqL1xuICAgbmFtZT86IHN0cmluZztcblxuICAgLyoqIE9ubHkgbWF0Y2ggd2hlbiB0aGUgc3dpdGNoIGFwcGVhcnMgYmVmb3JlIHRoZSBnaXQgc3ViLWNvbW1hbmQgKi9cbiAgIGdsb2JhbE9ubHk/OiBib29sZWFuO1xuXG4gICAvKipcbiAgICAqIE9ubHkgbWF0Y2ggd2hlbiB0aGUgc3dpdGNoIHdhcyBzdXBwbGllZCB3aXRoIGEgdmFsdWUgLSB3aXRob3V0IG9uZSBzd2l0Y2hlc1xuICAgICogc3VjaCBhcyBgLS1naXQtZGlyYCBhbmQgYC0tZXhlYy1wYXRoYCBhcmUgZ2V0dGVycyByYXRoZXIgdGhhbiBzZXR0ZXJzLlxuICAgICovXG4gICB3aXRoVmFsdWU/OiBib29sZWFuO1xufVxuXG5mdW5jdGlvbiBwcmV2ZW50RmxhZ0J1aWxkZXIoXG4gICB0YXNrOiBzdHJpbmcgfCBudWxsLFxuICAgZmxhZzogc3RyaW5nIHwgUmVnRXhwLFxuICAgY2F0ZWdvcnk6IFZ1bG5lcmFiaWxpdHlDYXRlZ29yeSxcbiAgIHsgbmFtZSA9IFN0cmluZyhmbGFnKSwgZ2xvYmFsT25seSA9IGZhbHNlLCB3aXRoVmFsdWUgPSBmYWxzZSB9OiBQcmV2ZW50RmxhZ09wdGlvbnMgPSB7fVxuKSB7XG4gICBjb25zdCByZWdleCA9IHR5cGVvZiBmbGFnID09PSAnc3RyaW5nJyA/IG5ldyBSZWdFeHAoYFxcXFxzKiR7ZmxhZy50b0xvd2VyQ2FzZSgpfWApIDogZmxhZztcbiAgIGNvbnN0IG1lc3NhZ2UgPSBgVXNlIG9mICR7dGFzayA/IGAke3Rhc2t9IHdpdGggb3B0aW9uIGAgOiAnJ30ke25hbWV9IGlzIG5vdCBwZXJtaXR0ZWQgd2l0aG91dCBlbmFibGluZyAke2NhdGVnb3J5fWA7XG5cbiAgIHJldHVybiBmdW5jdGlvbiBwcmV2ZW50RmxhZyhjdXJyZW50VGFzazogc3RyaW5nIHwgbnVsbCwgZmxhZzogRmxhZyk6IFZ1bG5lcmFiaWxpdHkgfCB2b2lkIHtcbiAgICAgIGlmICh0YXNrICYmIGN1cnJlbnRUYXNrICE9PSB0YXNrKSB7XG4gICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChnbG9iYWxPbmx5ICYmICFmbGFnLmlzR2xvYmFsKSB7XG4gICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh3aXRoVmFsdWUgJiYgZmxhZy52YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWdleC50ZXN0KGZsYWcubmFtZSkpIHtcbiAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjYXRlZ29yeSxcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICB9O1xuICAgICAgfVxuICAgfTtcbn1cblxuY29uc3QgcGF0aFRha2luZ0dsb2JhbDogUHJldmVudEZsYWdPcHRpb25zID0geyBnbG9iYWxPbmx5OiB0cnVlLCB3aXRoVmFsdWU6IHRydWUgfTtcblxuY29uc3QgcHJldmVudFVuc2FmZUZsYWdzID0gW1xuICAgcHJldmVudEZsYWdCdWlsZGVyKG51bGwsIC8tLSh1cGxvYWR8cmVjZWl2ZSktcGFjay8sICdhbGxvd1Vuc2FmZVBhY2snLCB7XG4gICAgICBuYW1lOiAnLS11cGxvYWQtcGFjayBvciAtLXJlY2VpdmUtcGFjaycsXG4gICB9KSxcbiAgIHByZXZlbnRGbGFnQnVpbGRlcignY2xvbmUnLCAvXi1cXHcqdS8sICdhbGxvd1Vuc2FmZVBhY2snKSxcbiAgIHByZXZlbnRGbGFnQnVpbGRlcignY2xvbmUnLCAnLS11JywgJ2FsbG93VW5zYWZlUGFjaycpLFxuICAgcHJldmVudEZsYWdCdWlsZGVyKCdwdXNoJywgL14tLWV4ZWMkLywgJ2FsbG93VW5zYWZlUGFjaycsIHsgbmFtZTogJy0tZXhlYycgfSksXG4gICAvLyBgZ2l0YCBhY2NlcHRzIHVuYW1iaWd1b3VzIGFiYnJldmlhdGlvbnMgb2YgbG9uZyBvcHRpb25zLCBzbyBgLS1leGAgYW5kIGAtLWV4ZWAgYXJlIGAtLWV4ZWNgXG4gICBwcmV2ZW50RmxhZ0J1aWxkZXIoJ3JlYmFzZScsIC9eKC14fC0tZXgoZWM/KT8pJC8sICdhbGxvd1Vuc2FmZUV4ZWMnLCB7IG5hbWU6ICcteCBvciAtLWV4ZWMnIH0pLFxuICAgcHJldmVudEZsYWdCdWlsZGVyKG51bGwsICctLXRlbXBsYXRlJywgJ2FsbG93VW5zYWZlVGVtcGxhdGVEaXInKSxcbiAgIHByZXZlbnRGbGFnQnVpbGRlcihudWxsLCAnLS1leGVjLXBhdGgnLCAnYWxsb3dVbnNhZmVFeGVjJywgcGF0aFRha2luZ0dsb2JhbCksXG4gICAvLyBgZ2l0YCByZWFkcyB0aGUgY29uZmlndXJhdGlvbiBvZiB3aGljaGV2ZXIgcmVwb3NpdG9yeSB0aGVzZSBuYW1lLCBzbyB0aGVcbiAgIC8vIGRpcmVjdG9yeSBhbG9uZSBpcyBlbm91Z2ggdG8gZGVsaXZlciBjb25maWcgdGhlIGFyZ3YgZ3VhcmRzIG5ldmVyIHNlZVxuICAgcHJldmVudEZsYWdCdWlsZGVyKG51bGwsICctLWdpdC1kaXInLCAnYWxsb3dVbnNhZmVDb25maWdQYXRocycsIHBhdGhUYWtpbmdHbG9iYWwpLFxuICAgcHJldmVudEZsYWdCdWlsZGVyKG51bGwsICctLXdvcmstdHJlZScsICdhbGxvd1Vuc2FmZUNvbmZpZ1BhdGhzJywgcGF0aFRha2luZ0dsb2JhbCksXG4gICBwcmV2ZW50RmxhZ0J1aWxkZXIobnVsbCwgL14tQyQvLCAnYWxsb3dVbnNhZmVDb25maWdQYXRocycsIHsgLi4ucGF0aFRha2luZ0dsb2JhbCwgbmFtZTogJy1DJyB9KSxcbl07XG4iLCAiaW1wb3J0IHR5cGUgeyBQYXJzZWRDb25maWdBY3Rpdml0eSB9IGZyb20gJy4uL2FyZ3MvcGFyc2UtYXJndi50eXBlcyc7XG5pbXBvcnQgdHlwZSB7IEZsYWcgfSBmcm9tICcuLi9mbGFncy9mbGFncy5oZWxwZXJzJztcbmltcG9ydCB7IGRldGVjdFZ1bG5lcmFibGVDb25maWdXcml0ZXMgfSBmcm9tICcuL2RldGVjdC12dWxuZXJhYmxlLWNvbmZpZy13cml0ZXMnO1xuaW1wb3J0IHsgZGV0ZWN0VnVsbmVyYWJsZUZsYWdzIH0gZnJvbSAnLi9kZXRlY3QtdnVsbmVyYWJsZS1mbGFncyc7XG5pbXBvcnQgdHlwZSB7IFZ1bG5lcmFiaWxpdHkgfSBmcm9tICcuL3Z1bG5lcmFiaWxpdHkudHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gdnVsbmVyYWJpbGl0eUFuYWx5c2lzKFxuICAgdGFzazogbnVsbCB8IHN0cmluZyxcbiAgIGZsYWdzOiBGbGFnW10sXG4gICBjb25maWc6IFBhcnNlZENvbmZpZ0FjdGl2aXR5XG4pOiBWdWxuZXJhYmlsaXR5W10ge1xuICAgcmV0dXJuIFsuLi5kZXRlY3RWdWxuZXJhYmxlRmxhZ3ModGFzaywgZmxhZ3MpLCAuLi5kZXRlY3RWdWxuZXJhYmxlQ29uZmlnV3JpdGVzKGNvbmZpZyldO1xufVxuIiwgImltcG9ydCB7IGNvbGxlY3RDb25maWdBY2Nlc3MgfSBmcm9tICcuLi9jb25maWcvYW5hbHlzZS1jb25maWcnO1xuaW1wb3J0IHR5cGUgeyBGbGFnIH0gZnJvbSAnLi4vZmxhZ3MvZmxhZ3MuaGVscGVycyc7XG5pbXBvcnQgeyBwYXJzZUdsb2JhbEZsYWdzIH0gZnJvbSAnLi4vZmxhZ3MvcGFyc2UtZ2xvYmFsLWZsYWdzJztcbmltcG9ydCB7IHBhcnNlVGFza0ZsYWdzIH0gZnJvbSAnLi4vZmxhZ3MvcGFyc2UtdGFzay1mbGFncyc7XG5pbXBvcnQgdHlwZSB7IFZ1bG5lcmFiaWxpdHkgfSBmcm9tICcuLi92dWxuZXJhYmlsaXRpZXMvdnVsbmVyYWJpbGl0eS50eXBlcyc7XG5pbXBvcnQgeyB2dWxuZXJhYmlsaXR5QW5hbHlzaXMgfSBmcm9tICcuLi92dWxuZXJhYmlsaXRpZXMvdnVsbmVyYWJpbGl0eS1hbmFseXNpcyc7XG5pbXBvcnQgdHlwZSB7IFBhcnNlZEFyZ3YsIFBhcnNlZEZsYWcgfSBmcm9tICcuL3BhcnNlLWFyZ3YudHlwZXMnO1xuXG4vKipcbiAqIFBhcnNlIHRoZSB0b2tlbnMgdGhhdCB3b3VsZCBiZSBmb3J3YXJkZWQgdG8gYSBgZ2l0YCBjaGlsZC1wcm9jZXNzIGFuZFxuICogcmV0dXJuIGEgc3RydWN0dXJlZCBzdW1tYXJ5IG9mIHdoYXQgdGhlIGludm9jYXRpb24gZG9lcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQXJndiguLi50b2tlbnM6IHJlYWRvbmx5IHVua25vd25bXSk6IFBhcnNlZEFyZ3Yge1xuICAgY29uc3QgeyBmbGFncywgdGFza0luZGV4IH0gPSBwYXJzZUdsb2JhbEZsYWdzKHRva2Vucyk7XG5cbiAgIGNvbnN0IHRhc2sgPSB0YXNrSW5kZXggPCB0b2tlbnMubGVuZ3RoID8gU3RyaW5nKHRva2Vuc1t0YXNrSW5kZXhdKS50b0xvd2VyQ2FzZSgpIDogbnVsbDtcbiAgIGNvbnN0IHRhc2tUb2tlbnMgPSB0YXNrICE9PSBudWxsID8gdG9rZW5zLnNsaWNlKHRhc2tJbmRleCArIDEpIDogW107XG5cbiAgIGNvbnN0IHsgcG9zaXRpb25hbHMsIHBhdGhzcGVjcyB9ID0gcGFyc2VUYXNrRmxhZ3ModGFza1Rva2VucywgdGFzaywgZmxhZ3MpO1xuICAgY29uc3QgY29uZmlnID0gY29sbGVjdENvbmZpZ0FjY2Vzcyh0YXNrLCBmbGFncywgcG9zaXRpb25hbHMpO1xuXG4gICByZXR1cm4ge1xuICAgICAgdGFzayxcbiAgICAgIGZsYWdzOiBmbGFncy5tYXAodG9QYXJzZWRGbGFnKSxcbiAgICAgIHBhdGhzOiBwYXRoc3BlY3MsXG4gICAgICBjb25maWcsXG4gICAgICB2dWxuZXJhYmlsaXRpZXM6IHZ1bG5lcmFiaWxpdHlMaXN0KHZ1bG5lcmFiaWxpdHlBbmFseXNpcyh0YXNrLCBmbGFncywgY29uZmlnKSksXG4gICB9O1xufVxuXG5mdW5jdGlvbiB2dWxuZXJhYmlsaXR5TGlzdCh2dWxuZXJhYmlsaXRpZXM6IFZ1bG5lcmFiaWxpdHlbXSkge1xuICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2dWxuZXJhYmlsaXRpZXMsICd2dWxuZXJhYmlsaXRpZXMnLCB7XG4gICAgICB2YWx1ZTogdnVsbmVyYWJpbGl0aWVzLFxuICAgfSk7XG59XG5cbmZ1bmN0aW9uIHRvUGFyc2VkRmxhZyh7IHZhbHVlLCBuYW1lIH06IEZsYWcpOiBQYXJzZWRGbGFnIHtcbiAgIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8geyBuYW1lLCB2YWx1ZSB9IDogeyBuYW1lIH07XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBDb25maWdXcml0ZSwgUGFyc2VkQ29uZmlnQWN0aXZpdHkgfSBmcm9tICcuLi9hcmdzL3BhcnNlLWFyZ3YudHlwZXMnO1xuaW1wb3J0IHR5cGUgeyBWdWxuZXJhYmlsaXR5LCBWdWxuZXJhYmlsaXR5Q2F0ZWdvcnkgfSBmcm9tICcuLi92dWxuZXJhYmlsaXRpZXMvdnVsbmVyYWJpbGl0eS50eXBlcyc7XG5pbXBvcnQgeyB2dWxuZXJhYmlsaXR5QW5hbHlzaXMgfSBmcm9tICcuLi92dWxuZXJhYmlsaXRpZXMvdnVsbmVyYWJpbGl0eS1hbmFseXNpcyc7XG5cbmNvbnN0IEdpdEVudktleXMgPSB7XG4gICAnZWRpdG9yJzogJ2FsbG93VW5zYWZlRWRpdG9yJyxcbiAgICdnaXRfYXNrcGFzcyc6ICdhbGxvd1Vuc2FmZUFza1Bhc3MnLFxuICAgJ2dpdF9jb25maWdfZ2xvYmFsJzogJ2FsbG93VW5zYWZlQ29uZmlnUGF0aHMnLFxuICAgJ2dpdF9jb25maWdfc3lzdGVtJzogJ2FsbG93VW5zYWZlQ29uZmlnUGF0aHMnLFxuICAgJ2dpdF9jb25maWdfY291bnQnOiAnYWxsb3dVbnNhZmVDb25maWdFbnZDb3VudCcsXG4gICAnZ2l0X2NvbmZpZ19wYXJhbWV0ZXJzJzogJ2FsbG93VW5zYWZlQ29uZmlnRW52Q291bnQnLFxuICAgJ2dpdF9jb25maWcnOiAnYWxsb3dVbnNhZmVDb25maWdQYXRocycsXG4gICAnZ2l0X2VkaXRvcic6ICdhbGxvd1Vuc2FmZUVkaXRvcicsXG4gICAnZ2l0X2V4ZWNfcGF0aCc6ICdhbGxvd1Vuc2FmZUV4ZWMnLFxuICAgJ2dpdF9leHRlcm5hbF9kaWZmJzogJ2FsbG93VW5zYWZlRGlmZkV4dGVybmFsJyxcbiAgICdnaXRfcGFnZXInOiAnYWxsb3dVbnNhZmVQYWdlcicsXG4gICAnZ2l0X3Byb3h5X2NvbW1hbmQnOiAnYWxsb3dVbnNhZmVHaXRQcm94eScsXG4gICAnZ2l0X3RlbXBsYXRlX2Rpcic6ICdhbGxvd1Vuc2FmZVRlbXBsYXRlRGlyJyxcbiAgICdnaXRfc2VxdWVuY2VfZWRpdG9yJzogJ2FsbG93VW5zYWZlRWRpdG9yJyxcbiAgICdnaXRfc3NoJzogJ2FsbG93VW5zYWZlU3NoQ29tbWFuZCcsXG4gICAnZ2l0X3NzaF9jb21tYW5kJzogJ2FsbG93VW5zYWZlU3NoQ29tbWFuZCcsXG4gICAncGFnZXInOiAnYWxsb3dVbnNhZmVQYWdlcicsXG4gICAncHJlZml4JzogJ2FsbG93VW5zYWZlQ29uZmlnUGF0aHMnLFxuICAgJ3NzaF9hc2twYXNzJzogJ2FsbG93VW5zYWZlQXNrUGFzcycsXG4gICAndmlzdWFsJzogJ2FsbG93VW5zYWZlRWRpdG9yJyxcbn0gYXMgY29uc3Qgc2F0aXNmaWVzIFJlY29yZDxzdHJpbmcsIFZ1bG5lcmFiaWxpdHlDYXRlZ29yeT47XG5cbnR5cGUgR2l0RW52ID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPiAmIHtcbiAgIGdpdF9jb25maWdfY291bnQ/OiBzdHJpbmc7XG59O1xuXG5mdW5jdGlvbiogY29sbGVjdENvbmZpZ0J5Q291bnQoZW52OiBHaXRFbnYpOiBHZW5lcmF0b3I8Q29uZmlnV3JpdGU+IHtcbiAgIGNvbnN0IGNvdW50ID0gcGFyc2VJbnQoZW52LmdpdF9jb25maWdfY291bnQgPz8gJzAnLCAxMCk7XG4gICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY291bnQ7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IGtleSA9IGVudltgZ2l0X2NvbmZpZ19rZXlfJHtpbmRleH1gXTtcbiAgICAgIGNvbnN0IHZhbHVlID0gZW52W2BnaXRfY29uZmlnX3ZhbHVlXyR7aW5kZXh9YF07XG5cbiAgICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgeWllbGQgeyBrZXk6IGtleS50b0xvd2VyQ2FzZSgpLnRyaW0oKSwgdmFsdWUsIHNjb3BlOiAnZW52JyB9O1xuICAgICAgfVxuICAgfVxufVxuXG5mdW5jdGlvbiogY29sbGVjdENvbmZpZ1Z1bG5lcmFiaWxpdGllcyhlbnY6IEdpdEVudik6IEdlbmVyYXRvcjxWdWxuZXJhYmlsaXR5PiB7XG4gICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhlbnYpKSB7XG4gICAgICBpZiAoaXNHaXRFbnZLZXkoa2V5KSkge1xuICAgICAgICAgY29uc3QgY2F0ZWdvcnkgPSBHaXRFbnZLZXlzW2tleV07XG4gICAgICAgICB5aWVsZCB7XG4gICAgICAgICAgICBjYXRlZ29yeSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGBVc2Ugb2YgXCIke2tleS50b1VwcGVyQ2FzZSgpfVwiIGlzIG5vdCBwZXJtaXR0ZWQgd2l0aG91dCBlbmFibGluZyAke2NhdGVnb3J5fWAsXG4gICAgICAgICB9O1xuICAgICAgfVxuICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNHaXRFbnZLZXkoa2V5OiBzdHJpbmcpOiBrZXkgaXMga2V5b2YgdHlwZW9mIEdpdEVudktleXMge1xuICAgcmV0dXJuIE9iamVjdC5oYXNPd24oR2l0RW52S2V5cywga2V5KTtcbn1cblxuZnVuY3Rpb24gcHJlcGFyZUVudihlbnY6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogR2l0RW52IHtcbiAgIGNvbnN0IGdpdEVudjogR2l0RW52ID0ge307XG4gICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhlbnYpKSB7XG4gICAgICBjb25zdCBlbnZLZXkgPSBrZXkudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICAgICBpZiAoaXNHaXRFbnZLZXkoZW52S2V5KSB8fCBlbnZLZXkuc3RhcnRzV2l0aCgnZ2l0JykpIHtcbiAgICAgICAgIGdpdEVudltlbnZLZXldID0gU3RyaW5nKHZhbHVlKTtcbiAgICAgIH1cbiAgIH1cbiAgIHJldHVybiBnaXRFbnY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUVudihyYXc6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSB7XG4gICBjb25zdCBlbnYgPSBwcmVwYXJlRW52KHJhdyk7XG4gICBjb25zdCBjb25maWc6IFBhcnNlZENvbmZpZ0FjdGl2aXR5ID0ge1xuICAgICAgcmVhZDogW10sXG4gICAgICB3cml0ZTogWy4uLmNvbGxlY3RDb25maWdCeUNvdW50KGVudildLFxuICAgfTtcbiAgIGNvbnN0IHZ1bG5lcmFiaWxpdGllcyA9IFtcbiAgICAgIC4uLmNvbGxlY3RDb25maWdWdWxuZXJhYmlsaXRpZXMoZW52KSxcbiAgICAgIC4uLnZ1bG5lcmFiaWxpdHlBbmFseXNpcyhudWxsLCBbXSwgY29uZmlnKSxcbiAgIF07XG5cbiAgIHJldHVybiB7XG4gICAgICBjb25maWcsXG4gICAgICB2dWxuZXJhYmlsaXRpZXMsXG4gICB9O1xufVxuIiwgImltcG9ydCB7IHBhcnNlQXJndiB9IGZyb20gJy4uL2FyZ3MvcGFyc2UtYXJndic7XG5pbXBvcnQgeyBwYXJzZUVudiB9IGZyb20gJy4uL2Vudi9wYXJzZS1lbnYnO1xuXG4vKipcbiAqIFJldHJpZXZlcyBqdXN0IHRoZSB2dWxuZXJhYmlsaXRpZXMgaWRlbnRpZmllZCBpbiB0aGUgc3VwcGxpZWQgdmFyYXJncyB0b2tlbnNcbiAqIGFuZCBlbnZpcm9ubWVudCB2YXJpYWJsZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2dWxuZXJhYmlsaXR5Q2hlY2sodG9rZW5zOiByZWFkb25seSBzdHJpbmdbXSwgZW52OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikge1xuICAgcmV0dXJuIFsuLi5wYXJzZUFyZ3YoLi4udG9rZW5zKS52dWxuZXJhYmlsaXRpZXMsIC4uLnBhcnNlRW52KGVudikudnVsbmVyYWJpbGl0aWVzXTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFNpbXBsZUdpdFRhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogVGhlIGBHaXRFcnJvcmAgaXMgdGhyb3duIHdoZW4gdGhlIHVuZGVybHlpbmcgYGdpdGAgcHJvY2VzcyB0aHJvd3MgYVxuICogZmF0YWwgZXhjZXB0aW9uIChlZyBhbiBgRU5PRU5UYCBleGNlcHRpb24gd2hlbiBhdHRlbXB0aW5nIHRvIHVzZSBhXG4gKiBub24td3JpdGFibGUgZGlyZWN0b3J5IGFzIHRoZSByb290IGZvciB5b3VyIHJlcG8pLCBhbmQgYWN0cyBhcyB0aGVcbiAqIGJhc2UgY2xhc3MgZm9yIG1vcmUgc3BlY2lmaWMgZXJyb3JzIHRocm93biBieSB0aGUgcGFyc2luZyBvZiB0aGVcbiAqIGdpdCByZXNwb25zZSBvciBlcnJvcnMgaW4gdGhlIGNvbmZpZ3VyYXRpb24gb2YgdGhlIHRhc2sgYWJvdXQgdG9cbiAqIGJlIHJ1bi5cbiAqXG4gKiBXaGVuIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24sIHBlbmRpbmcgdGFza3MgaW4gdGhlIHNhbWUgaW5zdGFuY2Ugd2lsbFxuICogbm90IGJlIGV4ZWN1dGVkLiBUaGUgcmVjb21tZW5kZWQgd2F5IHRvIHJ1biBhIHNlcmllcyBvZiB0YXNrcyB0aGF0XG4gKiBjYW4gaW5kZXBlbmRlbnRseSBmYWlsIHdpdGhvdXQgbmVlZGluZyB0byBwcmV2ZW50IGZ1dHVyZSB0YXNrcyBmcm9tXG4gKiBydW5uaW5nIGlzIHRvIGNhdGNoIHRoZW0gaW5kaXZpZHVhbGx5OlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiBpbXBvcnQgeyBzaW1wbGVHaXQsIFNpbXBsZUdpdCwgR2l0RXJyb3IsIFB1bGxSZXN1bHQgfSBmcm9tICdzaW1wbGUtZ2l0JztcblxuIGZ1bmN0aW9uIGNhdGNoVGFzayAoZTogR2l0RXJyb3IpIHtcbiAgIHJldHVybiBlLlxuIH1cblxuIGNvbnN0IGdpdCA9IHNpbXBsZUdpdChyZXBvV29ya2luZ0Rpcik7XG4gY29uc3QgcHVsbGVkOiBQdWxsUmVzdWx0IHwgR2l0RXJyb3IgPSBhd2FpdCBnaXQucHVsbCgpLmNhdGNoKGNhdGNoVGFzayk7XG4gY29uc3QgcHVzaGVkOiBzdHJpbmcgfCBHaXRFcnJvciA9IGF3YWl0IGdpdC5wdXNoVGFncygpLmNhdGNoKGNhdGNoVGFzayk7XG4gYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBHaXRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHRhc2s/OiBTaW1wbGVHaXRUYXNrPGFueT4sXG4gICAgICBtZXNzYWdlPzogc3RyaW5nXG4gICApIHtcbiAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIG5ldy50YXJnZXQucHJvdG90eXBlKTtcbiAgIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IFNpbXBsZUdpdE9wdGlvbnMgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBHaXRFcnJvciB9IGZyb20gJy4vZ2l0LWVycm9yJztcblxuLyoqXG4gKiBUaGUgYEdpdENvbnN0cnVjdEVycm9yYCBpcyB0aHJvd24gd2hlbiBhbiBlcnJvciBvY2N1cnMgaW4gdGhlIGNvbnN0cnVjdG9yXG4gKiBvZiB0aGUgYHNpbXBsZS1naXRgIGluc3RhbmNlIGl0c2VsZi4gTW9zdCBjb21tb25seSBhcyBhIHJlc3VsdCBvZiB1c2luZ1xuICogYSBgYmFzZURpcmAgb3B0aW9uIHRoYXQgcG9pbnRzIHRvIGEgZm9sZGVyIHRoYXQgZWl0aGVyIGRvZXMgbm90IGV4aXN0LFxuICogb3IgY2Fubm90IGJlIHJlYWQgYnkgdGhlIHVzZXIgdGhlIG5vZGUgc2NyaXB0IGlzIHJ1bm5pbmcgYXMuXG4gKlxuICogQ2hlY2sgdGhlIGAubWVzc2FnZWAgcHJvcGVydHkgZm9yIG1vcmUgZGV0YWlsIGluY2x1ZGluZyB0aGUgcHJvcGVydGllc1xuICogcGFzc2VkIHRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAqL1xuZXhwb3J0IGNsYXNzIEdpdENvbnN0cnVjdEVycm9yIGV4dGVuZHMgR2l0RXJyb3Ige1xuICAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgY29uZmlnOiBTaW1wbGVHaXRPcHRpb25zLFxuICAgICAgbWVzc2FnZTogc3RyaW5nXG4gICApIHtcbiAgICAgIHN1cGVyKHVuZGVmaW5lZCwgbWVzc2FnZSk7XG4gICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRPcHRpb25zLCBTaW1wbGVHaXRUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgR2l0RXJyb3IgfSBmcm9tICcuL2dpdC1lcnJvcic7XG5cbmV4cG9ydCBjbGFzcyBHaXRQbHVnaW5FcnJvciBleHRlbmRzIEdpdEVycm9yIHtcbiAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHRhc2s/OiBTaW1wbGVHaXRUYXNrPGFueT4sXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgcGx1Z2luPzoga2V5b2YgU2ltcGxlR2l0T3B0aW9ucyxcbiAgICAgIG1lc3NhZ2U/OiBzdHJpbmdcbiAgICkge1xuICAgICAgc3VwZXIodGFzaywgbWVzc2FnZSk7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgbmV3LnRhcmdldC5wcm90b3R5cGUpO1xuICAgfVxufVxuIiwgImltcG9ydCB7IEdpdEVycm9yIH0gZnJvbSAnLi9naXQtZXJyb3InO1xuXG4vKipcbiAqIFRoZSBgR2l0UmVzcG9uc2VFcnJvcmAgaXMgdGhlIHdyYXBwZXIgZm9yIGEgcGFyc2VkIHJlc3BvbnNlIHRoYXQgaXMgdHJlYXRlZCBhc1xuICogYSBmYXRhbCBlcnJvciwgZm9yIGV4YW1wbGUgYXR0ZW1wdGluZyBhIGBtZXJnZWAgY2FuIGxlYXZlIHRoZSByZXBvIGluIGEgY29ycnVwdGVkXG4gKiBzdGF0ZSB3aGVuIHRoZXJlIGFyZSBjb25mbGljdHMgc28gdGhlIHRhc2sgd2lsbCByZWplY3QgcmF0aGVyIHRoYW4gcmVzb2x2ZS5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgY2F0Y2hpbmcgdGhlIG1lcmdlIGNvbmZsaWN0IGV4Y2VwdGlvbjpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gaW1wb3J0IHsgc2ltcGxlR2l0LCBTaW1wbGVHaXQsIEdpdFJlc3BvbnNlRXJyb3IsIE1lcmdlU3VtbWFyeSB9IGZyb20gJ3NpbXBsZS1naXQnO1xuXG4gY29uc3QgZ2l0ID0gc2ltcGxlR2l0KHJlcG9Sb290KTtcbiBjb25zdCBtZXJnZU9wdGlvbnM6IHN0cmluZ1tdID0gWyctLW5vLWZmJywgJ290aGVyLWJyYW5jaCddO1xuIGNvbnN0IG1lcmdlU3VtbWFyeTogTWVyZ2VTdW1tYXJ5ID0gYXdhaXQgZ2l0Lm1lcmdlKG1lcmdlT3B0aW9ucylcbiAgICAgIC5jYXRjaCgoZTogR2l0UmVzcG9uc2VFcnJvcjxNZXJnZVN1bW1hcnk+KSA9PiBlLmdpdCk7XG5cbiBpZiAobWVyZ2VTdW1tYXJ5LmZhaWxlZCkge1xuICAgLy8gZGVhbCB3aXRoIHRoZSBlcnJvclxuIH1cbiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIEdpdFJlc3BvbnNlRXJyb3I8VCA9IGFueT4gZXh0ZW5kcyBHaXRFcnJvciB7XG4gICBjb25zdHJ1Y3RvcihcbiAgICAgIC8qKlxuICAgICAgICogYC5naXRgIGFjY2VzcyB0aGUgcGFyc2VkIHJlc3BvbnNlIHRoYXQgaXMgdHJlYXRlZCBhcyBiZWluZyBhbiBlcnJvclxuICAgICAgICovXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgZ2l0OiBULFxuICAgICAgbWVzc2FnZT86IHN0cmluZ1xuICAgKSB7XG4gICAgICBzdXBlcih1bmRlZmluZWQsIG1lc3NhZ2UgfHwgU3RyaW5nKGdpdCkpO1xuICAgfVxufVxuIiwgImltcG9ydCB7IEdpdEVycm9yIH0gZnJvbSAnLi9naXQtZXJyb3InO1xuXG4vKipcbiAqIFRoZSBgVGFza0NvbmZpZ3VyYXRpb25FcnJvcmAgaXMgdGhyb3duIHdoZW4gYSBjb21tYW5kIHdhcyBpbmNvcnJlY3RseVxuICogY29uZmlndXJlZC4gQW4gZXJyb3Igb2YgdGhpcyBraW5kIG1lYW5zIHRoYXQgbm8gYXR0ZW1wdCB3YXMgbWFkZSB0b1xuICogcnVuIHlvdXIgY29tbWFuZCB0aHJvdWdoIHRoZSB1bmRlcmx5aW5nIGBnaXRgIGJpbmFyeS5cbiAqXG4gKiBDaGVjayB0aGUgYC5tZXNzYWdlYCBwcm9wZXJ0eSBmb3IgbW9yZSBkZXRhaWwgb24gd2h5IHlvdXIgY29uZmlndXJhdGlvblxuICogcmVzdWx0ZWQgaW4gYW4gZXJyb3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBUYXNrQ29uZmlndXJhdGlvbkVycm9yIGV4dGVuZHMgR2l0RXJyb3Ige1xuICAgY29uc3RydWN0b3IobWVzc2FnZT86IHN0cmluZykge1xuICAgICAgc3VwZXIodW5kZWZpbmVkLCBtZXNzYWdlKTtcbiAgIH1cbn1cbiIsICJpbXBvcnQgeyBleGlzdHMsIEZPTERFUiB9IGZyb20gJ0Brd3NpdGVzL2ZpbGUtZXhpc3RzJztcblxuaW1wb3J0IHR5cGUgeyBNYXliZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGZpbHRlckhhc0xlbmd0aCB9IGZyb20gJy4vYXJndW1lbnQtZmlsdGVycyc7XG5cbnR5cGUgQ2FsbGFibGUgPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB1bmtub3duO1xuXG5leHBvcnQgY29uc3QgTlVMTCA9ICdcXDAnO1xuXG5leHBvcnQgY29uc3QgTk9PUDogQ2FsbGFibGUgPSAoKSA9PiB7fTtcblxuLyoqXG4gKiBSZXR1cm5zIGVpdGhlciB0aGUgc291cmNlIGFyZ3VtZW50IHdoZW4gaXQgaXMgYSBgRnVuY3Rpb25gLCBvciB0aGUgZGVmYXVsdFxuICogYE5PT1BgIGZ1bmN0aW9uIGNvbnN0YW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc0Z1bmN0aW9uPFQ+KHNvdXJjZTogVCB8IHVua25vd24pOiBDYWxsYWJsZSB7XG4gICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIE5PT1A7XG4gICB9XG4gICByZXR1cm4gc291cmNlIGFzIENhbGxhYmxlO1xufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3VwcGxpZWQgYXJndW1lbnQgaXMgYm90aCBhIGZ1bmN0aW9uLCBhbmQgaXMgbm90XG4gKiB0aGUgYE5PT1BgIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNVc2VyRnVuY3Rpb248VCBleHRlbmRzIEZ1bmN0aW9uPihzb3VyY2U6IFQgfCB1bmtub3duKTogc291cmNlIGlzIFQge1xuICAgcmV0dXJuIHR5cGVvZiBzb3VyY2UgPT09ICdmdW5jdGlvbicgJiYgc291cmNlICE9PSBOT09QO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BsaXRPbihpbnB1dDogc3RyaW5nLCBjaGFyOiBzdHJpbmcpOiBbc3RyaW5nLCBzdHJpbmddIHtcbiAgIGNvbnN0IGluZGV4ID0gaW5wdXQuaW5kZXhPZihjaGFyKTtcbiAgIGlmIChpbmRleCA8PSAwKSB7XG4gICAgICByZXR1cm4gW2lucHV0LCAnJ107XG4gICB9XG5cbiAgIHJldHVybiBbaW5wdXQuc3Vic3RyKDAsIGluZGV4KSwgaW5wdXQuc3Vic3RyKGluZGV4ICsgMSldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlyc3Q8VCBleHRlbmRzIHVua25vd25bXT4oaW5wdXQ6IFQsIG9mZnNldD86IG51bWJlcik6IE1heWJlPFRbbnVtYmVyXT47XG5leHBvcnQgZnVuY3Rpb24gZmlyc3Q8VCBleHRlbmRzIElBcmd1bWVudHM+KGlucHV0OiBULCBvZmZzZXQ/OiBudW1iZXIpOiBNYXliZTx1bmtub3duPjtcbmV4cG9ydCBmdW5jdGlvbiBmaXJzdChpbnB1dDogdW5rbm93bltdIHwgSUFyZ3VtZW50cywgb2Zmc2V0ID0gMCk6IE1heWJlPHVua25vd24+IHtcbiAgIHJldHVybiBpc0FycmF5TGlrZShpbnB1dCkgJiYgaW5wdXQubGVuZ3RoID4gb2Zmc2V0ID8gaW5wdXRbb2Zmc2V0XSA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxhc3Q8VCBleHRlbmRzIHVua25vd25bXT4oaW5wdXQ6IFQsIG9mZnNldD86IG51bWJlcik6IE1heWJlPFRbbnVtYmVyXT47XG5leHBvcnQgZnVuY3Rpb24gbGFzdDxUIGV4dGVuZHMgSUFyZ3VtZW50cz4oaW5wdXQ6IFQsIG9mZnNldD86IG51bWJlcik6IE1heWJlPHVua25vd24+O1xuZXhwb3J0IGZ1bmN0aW9uIGxhc3Q8VD4oaW5wdXQ6IFQsIG9mZnNldD86IG51bWJlcik6IE1heWJlPHVua25vd24+O1xuZXhwb3J0IGZ1bmN0aW9uIGxhc3QoaW5wdXQ6IHVua25vd24sIG9mZnNldCA9IDApIHtcbiAgIGlmIChpc0FycmF5TGlrZShpbnB1dCkgJiYgaW5wdXQubGVuZ3RoID4gb2Zmc2V0KSB7XG4gICAgICByZXR1cm4gaW5wdXRbaW5wdXQubGVuZ3RoIC0gMSAtIG9mZnNldF07XG4gICB9XG59XG5cbnR5cGUgQXJyYXlMaWtlPFQ+ID0gVFtdIHwgSUFyZ3VtZW50cyB8IHsgW2luZGV4OiBudW1iZXJdOiBUOyBsZW5ndGg6IG51bWJlciB9O1xuXG5mdW5jdGlvbiBpc0FycmF5TGlrZShpbnB1dDogdW5rbm93bik6IGlucHV0IGlzIEFycmF5TGlrZTx1bmtub3duPiB7XG4gICByZXR1cm4gZmlsdGVySGFzTGVuZ3RoKGlucHV0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvTGluZXNXaXRoQ29udGVudChpbnB1dCA9ICcnLCB0cmltbWVkID0gdHJ1ZSwgc2VwYXJhdG9yID0gJ1xcbicpOiBzdHJpbmdbXSB7XG4gICByZXR1cm4gaW5wdXQuc3BsaXQoc2VwYXJhdG9yKS5yZWR1Y2UoKG91dHB1dCwgbGluZSkgPT4ge1xuICAgICAgY29uc3QgbGluZUNvbnRlbnQgPSB0cmltbWVkID8gbGluZS50cmltKCkgOiBsaW5lO1xuICAgICAgaWYgKGxpbmVDb250ZW50KSB7XG4gICAgICAgICBvdXRwdXQucHVzaChsaW5lQ29udGVudCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0cHV0O1xuICAgfSwgW10gYXMgc3RyaW5nW10pO1xufVxuXG50eXBlIExpbmVXaXRoQ29udGVudENhbGxiYWNrPFQgPSB2b2lkPiA9IChsaW5lOiBzdHJpbmcpID0+IFQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoTGluZVdpdGhDb250ZW50PFQ+KFxuICAgaW5wdXQ6IHN0cmluZyxcbiAgIGNhbGxiYWNrOiBMaW5lV2l0aENvbnRlbnRDYWxsYmFjazxUPlxuKTogVFtdIHtcbiAgIHJldHVybiB0b0xpbmVzV2l0aENvbnRlbnQoaW5wdXQsIHRydWUpLm1hcCgobGluZSkgPT4gY2FsbGJhY2sobGluZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9sZGVyRXhpc3RzKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgcmV0dXJuIGV4aXN0cyhwYXRoLCBGT0xERVIpO1xufVxuXG4vKipcbiAqIEFkZHMgYGl0ZW1gIGludG8gdGhlIGB0YXJnZXRgIGBBcnJheWAgb3IgYFNldGAgd2hlbiBpdCBpcyBub3QgYWxyZWFkeSBwcmVzZW50IGFuZCByZXR1cm5zIHRoZSBgaXRlbWAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmQ8VD4odGFyZ2V0OiBUW10gfCBTZXQ8VD4sIGl0ZW06IFQpOiB0eXBlb2YgaXRlbSB7XG4gICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICBpZiAoIXRhcmdldC5pbmNsdWRlcyhpdGVtKSkge1xuICAgICAgICAgdGFyZ2V0LnB1c2goaXRlbSk7XG4gICAgICB9XG4gICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0LmFkZChpdGVtKTtcbiAgIH1cbiAgIHJldHVybiBpdGVtO1xufVxuXG4vKipcbiAqIEFkZHMgYGl0ZW1gIGludG8gdGhlIGB0YXJnZXRgIGBBcnJheWAgd2hlbiBpdCBpcyBub3QgYWxyZWFkeSBwcmVzZW50IGFuZCByZXR1cm5zIHRoZSBgdGFyZ2V0YC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluY2x1ZGluZzxUPih0YXJnZXQ6IFRbXSwgaXRlbTogVCk6IHR5cGVvZiB0YXJnZXQge1xuICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSAmJiAhdGFyZ2V0LmluY2x1ZGVzKGl0ZW0pKSB7XG4gICAgICB0YXJnZXQucHVzaChpdGVtKTtcbiAgIH1cblxuICAgcmV0dXJuIHRhcmdldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZTxUPih0YXJnZXQ6IFNldDxUPiB8IFRbXSwgaXRlbTogVCk6IFQge1xuICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgY29uc3QgaW5kZXggPSB0YXJnZXQuaW5kZXhPZihpdGVtKTtcbiAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICB0YXJnZXQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQuZGVsZXRlKGl0ZW0pO1xuICAgfVxuICAgcmV0dXJuIGl0ZW07XG59XG5cbmV4cG9ydCBjb25zdCBvYmplY3RUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcpIGFzIChcbiAgIGlucHV0OiB1bmtub3duXG4pID0+IHN0cmluZztcblxuZXhwb3J0IGZ1bmN0aW9uIGFzQXJyYXk8VD4oc291cmNlOiBUIHwgVFtdKTogVFtdIHtcbiAgIHJldHVybiBBcnJheS5pc0FycmF5KHNvdXJjZSkgPyBzb3VyY2UgOiBbc291cmNlXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzQ2FtZWxDYXNlKHN0cjogc3RyaW5nKSB7XG4gICByZXR1cm4gc3RyLnJlcGxhY2UoL1tcXHMtXSsoLikvZywgKF9hbGwsIGNocikgPT4ge1xuICAgICAgcmV0dXJuIGNoci50b1VwcGVyQ2FzZSgpO1xuICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc1N0cmluZ0FycmF5PFQ+KHNvdXJjZTogVCB8IFRbXSk6IHN0cmluZ1tdIHtcbiAgIHJldHVybiBhc0FycmF5KHNvdXJjZSkubWFwKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4gaXRlbSBpbnN0YW5jZW9mIFN0cmluZyA/IChpdGVtIGFzIHN0cmluZykgOiBTdHJpbmcoaXRlbSk7XG4gICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzTnVtYmVyKHNvdXJjZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCwgb25OYU4gPSAwKSB7XG4gICBpZiAoc291cmNlID09IG51bGwpIHtcbiAgICAgIHJldHVybiBvbk5hTjtcbiAgIH1cblxuICAgY29uc3QgbnVtID0gcGFyc2VJbnQoc291cmNlLCAxMCk7XG4gICByZXR1cm4gTnVtYmVyLmlzTmFOKG51bSkgPyBvbk5hTiA6IG51bTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZWZpeGVkQXJyYXk8VD4oaW5wdXQ6IFRbXSwgcHJlZml4OiBUKTogVFtdIHtcbiAgIGNvbnN0IG91dHB1dDogVFtdID0gW107XG4gICBmb3IgKGxldCBpID0gMCwgbWF4ID0gaW5wdXQubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcbiAgICAgIG91dHB1dC5wdXNoKHByZWZpeCwgaW5wdXRbaV0pO1xuICAgfVxuICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1ZmZlclRvU3RyaW5nKGlucHV0OiBCdWZmZXIgfCBCdWZmZXJbXSk6IHN0cmluZyB7XG4gICByZXR1cm4gKEFycmF5LmlzQXJyYXkoaW5wdXQpID8gQnVmZmVyLmNvbmNhdChpbnB1dCkgOiBpbnB1dCkudG9TdHJpbmcoJ3V0Zi04Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBieXRlTGVuZ3RoKGlucHV0Pzogc3RyaW5nIHwgQnVmZmVyKSB7XG4gICBpZiAoIWlucHV0KSB7XG4gICAgICByZXR1cm4gMDtcbiAgIH1cblxuICAgcmV0dXJuIEJ1ZmZlci5pc0J1ZmZlcihpbnB1dCkgPyBpbnB1dC5sZW5ndGggOiBCdWZmZXIuYnl0ZUxlbmd0aChpbnB1dCk7XG59XG5cbi8qKlxuICogR2V0IGEgbmV3IG9iamVjdCBmcm9tIGEgc291cmNlIG9iamVjdCB3aXRoIG9ubHkgdGhlIGxpc3RlZCBwcm9wZXJ0aWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGljazxULCBLIGV4dGVuZHMga2V5b2YgVD4oc291cmNlOiBULCBwcm9wZXJ0aWVzOiByZWFkb25seSBLW10pIHtcbiAgIGNvbnN0IG91dDogUGFydGlhbDxQaWNrPFQsIEs+PiA9IHt9O1xuXG4gICBwcm9wZXJ0aWVzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKHNvdXJjZVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgIG91dFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICB9KTtcblxuICAgcmV0dXJuIG91dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGF5KGR1cmF0aW9uID0gMCk6IFByb21pc2U8dm9pZD4ge1xuICAgcmV0dXJuIG5ldyBQcm9taXNlKChkb25lKSA9PiBzZXRUaW1lb3V0KGRvbmUsIGR1cmF0aW9uKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvclZvaWQ8VD4oaW5wdXQ6IFQgfCBmYWxzZSkge1xuICAgaWYgKGlucHV0ID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgIH1cbiAgIHJldHVybiBpbnB1dDtcbn1cbiIsICJpbXBvcnQgeyBpc1BhdGhTcGVjIH0gZnJvbSAnQHNpbXBsZS1naXQvYXJncy1wYXRoc3BlYyc7XG5cbmltcG9ydCB0eXBlIHsgTWF5YmUsIE9wdGlvbnMsIFByaW1pdGl2ZXMgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBvYmplY3RUb1N0cmluZyB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCB0eXBlIEFyZ3VtZW50RmlsdGVyUHJlZGljYXRlPFQ+ID0gKGlucHV0OiBUIHwgdW5rbm93bikgPT4gaW5wdXQgaXMgVDtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlclR5cGU8VCwgSz4oXG4gICBpbnB1dDogSyxcbiAgIGZpbHRlcjogQXJndW1lbnRGaWx0ZXJQcmVkaWNhdGU8VD5cbik6IEsgZXh0ZW5kcyBUID8gVCA6IHVuZGVmaW5lZDtcbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJUeXBlPFQsIEs+KGlucHV0OiBLLCBmaWx0ZXI6IEFyZ3VtZW50RmlsdGVyUHJlZGljYXRlPFQ+LCBkZWY6IFQpOiBUO1xuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlclR5cGU8VCwgSz4oaW5wdXQ6IEssIGZpbHRlcjogQXJndW1lbnRGaWx0ZXJQcmVkaWNhdGU8VD4sIGRlZj86IFQpOiBNYXliZTxUPiB7XG4gICBpZiAoZmlsdGVyKGlucHV0KSkge1xuICAgICAgcmV0dXJuIGlucHV0O1xuICAgfVxuICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAyID8gZGVmIDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgY29uc3QgZmlsdGVyQXJyYXk6IEFyZ3VtZW50RmlsdGVyUHJlZGljYXRlPEFycmF5PHVua25vd24+PiA9IChcbiAgIGlucHV0XG4pOiBpbnB1dCBpcyBBcnJheTx1bmtub3duPiA9PiB7XG4gICByZXR1cm4gQXJyYXkuaXNBcnJheShpbnB1dCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyUHJpbWl0aXZlcyhcbiAgIGlucHV0OiB1bmtub3duLFxuICAgb21pdD86IEFycmF5PCdib29sZWFuJyB8ICdzdHJpbmcnIHwgJ251bWJlcic+XG4pOiBpbnB1dCBpcyBQcmltaXRpdmVzIHtcbiAgIGNvbnN0IHR5cGUgPSBpc1BhdGhTcGVjKGlucHV0KSA/ICdzdHJpbmcnIDogdHlwZW9mIGlucHV0O1xuXG4gICByZXR1cm4gKFxuICAgICAgL251bWJlcnxzdHJpbmd8Ym9vbGVhbi8udGVzdCh0eXBlKSAmJlxuICAgICAgKCFvbWl0IHx8ICFvbWl0LmluY2x1ZGVzKHR5cGUgYXMgJ2Jvb2xlYW4nIHwgJ3N0cmluZycgfCAnbnVtYmVyJykpXG4gICApO1xufVxuXG5leHBvcnQgY29uc3QgZmlsdGVyTnVtYmVyOiBBcmd1bWVudEZpbHRlclByZWRpY2F0ZTxudW1iZXI+ID0gKGlucHV0OiB1bmtub3duKTogaW5wdXQgaXMgbnVtYmVyID0+IHtcbiAgIHJldHVybiB0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInO1xufTtcblxuZXhwb3J0IGNvbnN0IGZpbHRlclN0cmluZzogQXJndW1lbnRGaWx0ZXJQcmVkaWNhdGU8c3RyaW5nPiA9IChpbnB1dDogdW5rbm93bik6IGlucHV0IGlzIHN0cmluZyA9PiB7XG4gICByZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJyB8fCBpc1BhdGhTcGVjKGlucHV0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBmaWx0ZXJTdHJpbmdPckJ1ZmZlcjogQXJndW1lbnRGaWx0ZXJQcmVkaWNhdGU8c3RyaW5nIHwgQnVmZmVyPiA9IChcbiAgIGlucHV0OiB1bmtub3duXG4pOiBpbnB1dCBpcyBzdHJpbmcgfCBCdWZmZXIgPT4ge1xuICAgcmV0dXJuIGZpbHRlclN0cmluZyhpbnB1dCkgfHwgQnVmZmVyLmlzQnVmZmVyKGlucHV0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBmaWx0ZXJTdHJpbmdPclN0cmluZ0FycmF5OiBBcmd1bWVudEZpbHRlclByZWRpY2F0ZTxzdHJpbmcgfCBzdHJpbmdbXT4gPSAoXG4gICBpbnB1dFxuKTogaW5wdXQgaXMgc3RyaW5nIHwgc3RyaW5nW10gPT4ge1xuICAgcmV0dXJuIGZpbHRlclN0cmluZyhpbnB1dCkgfHwgKEFycmF5LmlzQXJyYXkoaW5wdXQpICYmIGlucHV0LmV2ZXJ5KGZpbHRlclN0cmluZykpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlclBsYWluT2JqZWN0PFQgZXh0ZW5kcyBPcHRpb25zPihpbnB1dDogVCB8IHVua25vd24pOiBpbnB1dCBpcyBUO1xuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlclBsYWluT2JqZWN0PFQgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj4oXG4gICBpbnB1dDogVCB8IHVua25vd25cbik6IGlucHV0IGlzIFQge1xuICAgcmV0dXJuICEhaW5wdXQgJiYgb2JqZWN0VG9TdHJpbmcoaW5wdXQpID09PSAnW29iamVjdCBPYmplY3RdJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlckZ1bmN0aW9uKGlucHV0OiB1bmtub3duKTogaW5wdXQgaXMgKC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdW5rbm93biB7XG4gICByZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgY29uc3QgZmlsdGVySGFzTGVuZ3RoOiBBcmd1bWVudEZpbHRlclByZWRpY2F0ZTx7IGxlbmd0aDogbnVtYmVyIH0+ID0gKFxuICAgaW5wdXRcbik6IGlucHV0IGlzIHsgbGVuZ3RoOiBudW1iZXIgfSA9PiB7XG4gICBpZiAoaW5wdXQgPT0gbnVsbCB8fCAnbnVtYmVyfGJvb2xlYW58ZnVuY3Rpb24nLmluY2x1ZGVzKHR5cGVvZiBpbnB1dCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgIH1cblxuICAgcmV0dXJuIHR5cGVvZiAoaW5wdXQgYXMgeyBsZW5ndGg/OiBudW1iZXIgfSkubGVuZ3RoID09PSAnbnVtYmVyJztcbn07XG4iLCAiLyoqXG4gKiBLbm93biBwcm9jZXNzIGV4aXQgY29kZXMgdXNlZCBieSB0aGUgdGFzayBwYXJzZXJzIHRvIGRldGVybWluZSB3aGV0aGVyIGFuIGVycm9yXG4gKiB3YXMgb25lIHRoZXkgY2FuIGF1dG9tYXRpY2FsbHkgaGFuZGxlXG4gKi9cbmV4cG9ydCBlbnVtIEV4aXRDb2RlcyB7XG4gICBTVUNDRVNTLFxuICAgRVJST1IsXG4gICBOT1RfRk9VTkQgPSAtMixcbiAgIFVOQ0xFQU4gPSAxMjgsXG59XG4iLCAiaW1wb3J0IHR5cGUgeyBUYXNrUmVzcG9uc2VGb3JtYXQgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBHaXRPdXRwdXRTdHJlYW1zPFQgZXh0ZW5kcyBUYXNrUmVzcG9uc2VGb3JtYXQgPSBCdWZmZXI+IHtcbiAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHJlYWRvbmx5IHN0ZE91dDogVCxcbiAgICAgIHB1YmxpYyByZWFkb25seSBzdGRFcnI6IFRcbiAgICkge31cblxuICAgYXNTdHJpbmdzKCk6IEdpdE91dHB1dFN0cmVhbXM8c3RyaW5nPiB7XG4gICAgICByZXR1cm4gbmV3IEdpdE91dHB1dFN0cmVhbXModGhpcy5zdGRPdXQudG9TdHJpbmcoJ3V0ZjgnKSwgdGhpcy5zdGRFcnIudG9TdHJpbmcoJ3V0ZjgnKSk7XG4gICB9XG59XG4iLCAiZnVuY3Rpb24gdXNlTWF0Y2hlc0RlZmF1bHQoKSB7XG4gICB0aHJvdyBuZXcgRXJyb3IoYExpbmVQYXJzZXI6dXNlTWF0Y2hlcyBub3QgaW1wbGVtZW50ZWRgKTtcbn1cblxuZXhwb3J0IGNsYXNzIExpbmVQYXJzZXI8VD4ge1xuICAgcHJvdGVjdGVkIG1hdGNoZXM6IHN0cmluZ1tdID0gW107XG4gICBwcm90ZWN0ZWQgdXNlTWF0Y2hlczogKHRhcmdldDogVCwgbWF0Y2g6IHN0cmluZ1tdKSA9PiBib29sZWFuIHwgdm9pZCA9IHVzZU1hdGNoZXNEZWZhdWx0O1xuXG4gICBwcml2YXRlIF9yZWdFeHA6IFJlZ0V4cFtdO1xuXG4gICBjb25zdHJ1Y3RvcihcbiAgICAgIHJlZ0V4cDogUmVnRXhwIHwgUmVnRXhwW10sXG4gICAgICB1c2VNYXRjaGVzPzogKHRhcmdldDogVCwgbWF0Y2g6IHN0cmluZ1tdKSA9PiBib29sZWFuIHwgdm9pZFxuICAgKSB7XG4gICAgICB0aGlzLl9yZWdFeHAgPSBBcnJheS5pc0FycmF5KHJlZ0V4cCkgPyByZWdFeHAgOiBbcmVnRXhwXTtcbiAgICAgIGlmICh1c2VNYXRjaGVzKSB7XG4gICAgICAgICB0aGlzLnVzZU1hdGNoZXMgPSB1c2VNYXRjaGVzO1xuICAgICAgfVxuICAgfVxuXG4gICBwYXJzZSA9IChsaW5lOiAob2Zmc2V0OiBudW1iZXIpID0+IHN0cmluZyB8IHVuZGVmaW5lZCwgdGFyZ2V0OiBUKTogYm9vbGVhbiA9PiB7XG4gICAgICB0aGlzLnJlc2V0TWF0Y2hlcygpO1xuXG4gICAgICBpZiAoIXRoaXMuX3JlZ0V4cC5ldmVyeSgocmVnLCBpbmRleCkgPT4gdGhpcy5hZGRNYXRjaChyZWcsIGluZGV4LCBsaW5lKGluZGV4KSkpKSB7XG4gICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnVzZU1hdGNoZXModGFyZ2V0LCB0aGlzLnByZXBhcmVNYXRjaGVzKCkpICE9PSBmYWxzZTtcbiAgIH07XG5cbiAgIHByb3RlY3RlZCByZXNldE1hdGNoZXMoKSB7XG4gICAgICB0aGlzLm1hdGNoZXMubGVuZ3RoID0gMDtcbiAgIH1cblxuICAgcHJvdGVjdGVkIHByZXBhcmVNYXRjaGVzKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWF0Y2hlcztcbiAgIH1cblxuICAgcHJvdGVjdGVkIGFkZE1hdGNoKHJlZzogUmVnRXhwLCBpbmRleDogbnVtYmVyLCBsaW5lPzogc3RyaW5nKSB7XG4gICAgICBjb25zdCBtYXRjaGVkID0gbGluZSAmJiByZWcuZXhlYyhsaW5lKTtcbiAgICAgIGlmIChtYXRjaGVkKSB7XG4gICAgICAgICB0aGlzLnB1c2hNYXRjaChpbmRleCwgbWF0Y2hlZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAhIW1hdGNoZWQ7XG4gICB9XG5cbiAgIHByb3RlY3RlZCBwdXNoTWF0Y2goX2luZGV4OiBudW1iZXIsIG1hdGNoZWQ6IHN0cmluZ1tdKSB7XG4gICAgICB0aGlzLm1hdGNoZXMucHVzaCguLi5tYXRjaGVkLnNsaWNlKDEpKTtcbiAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlbW90ZUxpbmVQYXJzZXI8VD4gZXh0ZW5kcyBMaW5lUGFyc2VyPFQ+IHtcbiAgIHByb3RlY3RlZCBhZGRNYXRjaChyZWc6IFJlZ0V4cCwgaW5kZXg6IG51bWJlciwgbGluZT86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIC9ecmVtb3RlOlxccy8udGVzdChTdHJpbmcobGluZSkpICYmIHN1cGVyLmFkZE1hdGNoKHJlZywgaW5kZXgsIGxpbmUpO1xuICAgfVxuXG4gICBwcm90ZWN0ZWQgcHVzaE1hdGNoKGluZGV4OiBudW1iZXIsIG1hdGNoZWQ6IHN0cmluZ1tdKSB7XG4gICAgICBpZiAoaW5kZXggPiAwIHx8IG1hdGNoZWQubGVuZ3RoID4gMSkge1xuICAgICAgICAgc3VwZXIucHVzaE1hdGNoKGluZGV4LCBtYXRjaGVkKTtcbiAgICAgIH1cbiAgIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IFNpbXBsZUdpdE9wdGlvbnMgfSBmcm9tICcuLi90eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zOiBPbWl0PFNpbXBsZUdpdE9wdGlvbnMsICdiYXNlRGlyJz4gPSB7XG4gICBiaW5hcnk6ICdnaXQnLFxuICAgbWF4Q29uY3VycmVudFByb2Nlc3NlczogNSxcbiAgIGNvbmZpZzogW10sXG4gICB0cmltbWVkOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZUNvbmZpZyhcbiAgIC4uLm9wdGlvbnM6IEFycmF5PFBhcnRpYWw8U2ltcGxlR2l0T3B0aW9ucz4gfCB1bmRlZmluZWQ+XG4pOiBTaW1wbGVHaXRPcHRpb25zIHtcbiAgIGNvbnN0IGJhc2VEaXIgPSBwcm9jZXNzLmN3ZCgpO1xuICAgY29uc3QgY29uZmlnOiBTaW1wbGVHaXRPcHRpb25zID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHsgYmFzZURpciwgLi4uZGVmYXVsdE9wdGlvbnMgfSxcbiAgICAgIC4uLm9wdGlvbnMuZmlsdGVyKChvKSA9PiB0eXBlb2YgbyA9PT0gJ29iamVjdCcgJiYgbylcbiAgICk7XG5cbiAgIGNvbmZpZy5iYXNlRGlyID0gY29uZmlnLmJhc2VEaXIgfHwgYmFzZURpcjtcbiAgIGNvbmZpZy50cmltbWVkID0gY29uZmlnLnRyaW1tZWQgPT09IHRydWU7XG5cbiAgIHJldHVybiBjb25maWc7XG59XG4iLCAiaW1wb3J0IHsgaXNQYXRoU3BlYyB9IGZyb20gJ0BzaW1wbGUtZ2l0L2FyZ3MtcGF0aHNwZWMnO1xuXG5pbXBvcnQgdHlwZSB7IE1heWJlLCBPcHRpb25zIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHtcbiAgIGZpbHRlckFycmF5LFxuICAgZmlsdGVyRnVuY3Rpb24sXG4gICBmaWx0ZXJQbGFpbk9iamVjdCxcbiAgIGZpbHRlclByaW1pdGl2ZXMsXG4gICBmaWx0ZXJUeXBlLFxufSBmcm9tICcuL2FyZ3VtZW50LWZpbHRlcnMnO1xuaW1wb3J0IHsgYXNGdW5jdGlvbiwgYXNTdHJpbmdBcnJheSwgaXNVc2VyRnVuY3Rpb24sIGxhc3QgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kVGFza09wdGlvbnM8VCBleHRlbmRzIE9wdGlvbnMgPSBPcHRpb25zPihcbiAgIG9wdGlvbnM6IE1heWJlPFQ+LFxuICAgY29tbWFuZHM6IHN0cmluZ1tdID0gW11cbik6IHN0cmluZ1tdIHtcbiAgIGlmICghZmlsdGVyUGxhaW5PYmplY3Q8T3B0aW9ucz4ob3B0aW9ucykpIHtcbiAgICAgIHJldHVybiBjb21tYW5kcztcbiAgIH1cblxuICAgcmV0dXJuIE9iamVjdC5rZXlzKG9wdGlvbnMpLnJlZHVjZSgoY29tbWFuZHM6IHN0cmluZ1tdLCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBvcHRpb25zW2tleV07XG5cbiAgICAgIGlmIChpc1BhdGhTcGVjKHZhbHVlKSkge1xuICAgICAgICAgY29tbWFuZHMucHVzaCh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGZpbHRlclByaW1pdGl2ZXModmFsdWUsIFsnYm9vbGVhbiddKSkge1xuICAgICAgICAgY29tbWFuZHMucHVzaChrZXkgKyAnPScgKyB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICBmb3IgKGNvbnN0IHYgb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmICghZmlsdGVyUHJpbWl0aXZlcyh2LCBbJ3N0cmluZycsICdudW1iZXInXSkpIHtcbiAgICAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goa2V5ICsgJz0nICsgdik7XG4gICAgICAgICAgICB9XG4gICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgY29tbWFuZHMucHVzaChrZXkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29tbWFuZHM7XG4gICB9LCBjb21tYW5kcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFpbGluZ09wdGlvbnMoXG4gICBhcmdzOiBJQXJndW1lbnRzLFxuICAgaW5pdGlhbFByaW1pdGl2ZSA9IDAsXG4gICBvYmplY3RPbmx5ID0gZmFsc2Vcbik6IHN0cmluZ1tdIHtcbiAgIGNvbnN0IGNvbW1hbmQ6IHN0cmluZ1tdID0gW107XG5cbiAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBpbml0aWFsUHJpbWl0aXZlIDwgMCA/IGFyZ3MubGVuZ3RoIDogaW5pdGlhbFByaW1pdGl2ZTsgaSA8IG1heDsgaSsrKSB7XG4gICAgICBpZiAoJ3N0cmluZ3xudW1iZXInLmluY2x1ZGVzKHR5cGVvZiBhcmdzW2ldKSkge1xuICAgICAgICAgY29tbWFuZC5wdXNoKFN0cmluZyhhcmdzW2ldKSk7XG4gICAgICB9XG4gICB9XG5cbiAgIGFwcGVuZFRhc2tPcHRpb25zKHRyYWlsaW5nT3B0aW9uc0FyZ3VtZW50KGFyZ3MpLCBjb21tYW5kKTtcbiAgIGlmICghb2JqZWN0T25seSkge1xuICAgICAgY29tbWFuZC5wdXNoKC4uLnRyYWlsaW5nQXJyYXlBcmd1bWVudChhcmdzKSk7XG4gICB9XG5cbiAgIHJldHVybiBjb21tYW5kO1xufVxuXG5mdW5jdGlvbiB0cmFpbGluZ0FycmF5QXJndW1lbnQoYXJnczogSUFyZ3VtZW50cykge1xuICAgY29uc3QgaGFzVHJhaWxpbmdDYWxsYmFjayA9IHR5cGVvZiBsYXN0KGFyZ3MpID09PSAnZnVuY3Rpb24nO1xuICAgcmV0dXJuIGFzU3RyaW5nQXJyYXkoZmlsdGVyVHlwZShsYXN0KGFyZ3MsIGhhc1RyYWlsaW5nQ2FsbGJhY2sgPyAxIDogMCksIGZpbHRlckFycmF5LCBbXSkpO1xufVxuXG4vKipcbiAqIEdpdmVuIGFueSBudW1iZXIgb2YgYXJndW1lbnRzLCByZXR1cm5zIHRoZSB0cmFpbGluZyBvcHRpb25zIGFyZ3VtZW50LCBpZ25vcmluZyBhIHRyYWlsaW5nIGZ1bmN0aW9uIGFyZ3VtZW50XG4gKiBpZiB0aGVyZSBpcyBvbmUuIFdoZW4gbm90IGZvdW5kLCB0aGUgcmV0dXJuIHZhbHVlIGlzIG51bGwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFpbGluZ09wdGlvbnNBcmd1bWVudChhcmdzOiBJQXJndW1lbnRzKTogTWF5YmU8T3B0aW9ucz4ge1xuICAgY29uc3QgaGFzVHJhaWxpbmdDYWxsYmFjayA9IGZpbHRlckZ1bmN0aW9uKGxhc3QoYXJncykpO1xuICAgcmV0dXJuIGZpbHRlclR5cGUobGFzdChhcmdzLCBoYXNUcmFpbGluZ0NhbGxiYWNrID8gMSA6IDApLCBmaWx0ZXJQbGFpbk9iamVjdCk7XG59XG5cbi8qKlxuICogUmV0dXJucyBlaXRoZXIgdGhlIHNvdXJjZSBhcmd1bWVudCB3aGVuIGl0IGlzIGEgYEZ1bmN0aW9uYCwgb3IgdGhlIGRlZmF1bHRcbiAqIGBOT09QYCBmdW5jdGlvbiBjb25zdGFudFxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KFxuICAgYXJnczogdW5rbm93bltdIHwgSUFyZ3VtZW50cyB8IHVua25vd24sXG4gICBpbmNsdWRlTm9vcCA9IHRydWVcbik6IE1heWJlPCguLi5hcmdzOiB1bmtub3duW10pID0+IHVua25vd24+IHtcbiAgIGNvbnN0IGNhbGxiYWNrID0gYXNGdW5jdGlvbihsYXN0KGFyZ3MpKTtcbiAgIHJldHVybiBpbmNsdWRlTm9vcCB8fCBpc1VzZXJGdW5jdGlvbihjYWxsYmFjaykgPyBjYWxsYmFjayA6IHVuZGVmaW5lZDtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IE1heWJlQXJyYXksIFRhc2tQYXJzZXIsIFRhc2tSZXNwb25zZUZvcm1hdCB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB0eXBlIHsgR2l0T3V0cHV0U3RyZWFtcyB9IGZyb20gJy4vZ2l0LW91dHB1dC1zdHJlYW1zJztcbmltcG9ydCB0eXBlIHsgTGluZVBhcnNlciB9IGZyb20gJy4vbGluZS1wYXJzZXInO1xuaW1wb3J0IHsgYXNBcnJheSwgdG9MaW5lc1dpdGhDb250ZW50IH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGxUYXNrUGFyc2VyPElOUFVUIGV4dGVuZHMgVGFza1Jlc3BvbnNlRm9ybWF0LCBSRVNQT05TRT4oXG4gICBwYXJzZXI6IFRhc2tQYXJzZXI8SU5QVVQsIFJFU1BPTlNFPixcbiAgIHN0cmVhbXM6IEdpdE91dHB1dFN0cmVhbXM8SU5QVVQ+XG4pIHtcbiAgIHJldHVybiBwYXJzZXIoc3RyZWFtcy5zdGRPdXQsIHN0cmVhbXMuc3RkRXJyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlU3RyaW5nUmVzcG9uc2U8VD4oXG4gICByZXN1bHQ6IFQsXG4gICBwYXJzZXJzOiBMaW5lUGFyc2VyPFQ+W10sXG4gICB0ZXh0czogTWF5YmVBcnJheTxzdHJpbmc+LFxuICAgdHJpbSA9IHRydWVcbik6IFQge1xuICAgYXNBcnJheSh0ZXh0cykuZm9yRWFjaCgodGV4dCkgPT4ge1xuICAgICAgZm9yIChsZXQgbGluZXMgPSB0b0xpbmVzV2l0aENvbnRlbnQodGV4dCwgdHJpbSksIGkgPSAwLCBtYXggPSBsaW5lcy5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xuICAgICAgICAgY29uc3QgbGluZSA9IChvZmZzZXQgPSAwKSA9PiB7XG4gICAgICAgICAgICBpZiAoaSArIG9mZnNldCA+PSBtYXgpIHtcbiAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsaW5lc1tpICsgb2Zmc2V0XTtcbiAgICAgICAgIH07XG5cbiAgICAgICAgIHBhcnNlcnMuc29tZSgoeyBwYXJzZSB9KSA9PiBwYXJzZShsaW5lLCByZXN1bHQpKTtcbiAgICAgIH1cbiAgIH0pO1xuXG4gICByZXR1cm4gcmVzdWx0O1xufVxuIiwgImltcG9ydCB0eXBlIHsgTWF5YmUsIFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBFeGl0Q29kZXMgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBlbnVtIENoZWNrUmVwb0FjdGlvbnMge1xuICAgQkFSRSA9ICdiYXJlJyxcbiAgIElOX1RSRUUgPSAndHJlZScsXG4gICBJU19SRVBPX1JPT1QgPSAncm9vdCcsXG59XG5cbmNvbnN0IG9uRXJyb3I6IFN0cmluZ1Rhc2s8Ym9vbGVhbj5bJ29uRXJyb3InXSA9ICh7IGV4aXRDb2RlIH0sIGVycm9yLCBkb25lLCBmYWlsKSA9PiB7XG4gICBpZiAoZXhpdENvZGUgPT09IEV4aXRDb2Rlcy5VTkNMRUFOICYmIGlzTm90UmVwb01lc3NhZ2UoZXJyb3IpKSB7XG4gICAgICByZXR1cm4gZG9uZShCdWZmZXIuZnJvbSgnZmFsc2UnKSk7XG4gICB9XG5cbiAgIGZhaWwoZXJyb3IpO1xufTtcblxuY29uc3QgcGFyc2VyOiBTdHJpbmdUYXNrPGJvb2xlYW4+WydwYXJzZXInXSA9ICh0ZXh0KSA9PiB7XG4gICByZXR1cm4gdGV4dC50cmltKCkgPT09ICd0cnVlJztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0lzUmVwb1Rhc2soYWN0aW9uOiBNYXliZTxDaGVja1JlcG9BY3Rpb25zPik6IFN0cmluZ1Rhc2s8Ym9vbGVhbj4ge1xuICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgIGNhc2UgQ2hlY2tSZXBvQWN0aW9ucy5CQVJFOlxuICAgICAgICAgcmV0dXJuIGNoZWNrSXNCYXJlUmVwb1Rhc2soKTtcbiAgICAgIGNhc2UgQ2hlY2tSZXBvQWN0aW9ucy5JU19SRVBPX1JPT1Q6XG4gICAgICAgICByZXR1cm4gY2hlY2tJc1JlcG9Sb290VGFzaygpO1xuICAgfVxuXG4gICBjb25zdCBjb21tYW5kcyA9IFsncmV2LXBhcnNlJywgJy0taXMtaW5zaWRlLXdvcmstdHJlZSddO1xuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBvbkVycm9yLFxuICAgICAgcGFyc2VyLFxuICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrSXNSZXBvUm9vdFRhc2soKTogU3RyaW5nVGFzazxib29sZWFuPiB7XG4gICBjb25zdCBjb21tYW5kcyA9IFsncmV2LXBhcnNlJywgJy0tZ2l0LWRpciddO1xuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBvbkVycm9yLFxuICAgICAgcGFyc2VyKHBhdGgpIHtcbiAgICAgICAgIHJldHVybiAvXlxcLihnaXQpPyQvLnRlc3QocGF0aC50cmltKCkpO1xuICAgICAgfSxcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0lzQmFyZVJlcG9UYXNrKCk6IFN0cmluZ1Rhc2s8Ym9vbGVhbj4ge1xuICAgY29uc3QgY29tbWFuZHMgPSBbJ3Jldi1wYXJzZScsICctLWlzLWJhcmUtcmVwb3NpdG9yeSddO1xuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBvbkVycm9yLFxuICAgICAgcGFyc2VyLFxuICAgfTtcbn1cblxuZnVuY3Rpb24gaXNOb3RSZXBvTWVzc2FnZShlcnJvcjogRXJyb3IpOiBib29sZWFuIHtcbiAgIHJldHVybiAvKE5vdCBhIGdpdCByZXBvc2l0b3J5fEtlaW4gR2l0LVJlcG9zaXRvcnkpL2kudGVzdChTdHJpbmcoZXJyb3IpKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IENsZWFuU3VtbWFyeSB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgdG9MaW5lc1dpdGhDb250ZW50IH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgQ2xlYW5SZXNwb25zZSBpbXBsZW1lbnRzIENsZWFuU3VtbWFyeSB7XG4gICBwdWJsaWMgcmVhZG9ubHkgcGF0aHM6IHN0cmluZ1tdO1xuICAgcHVibGljIHJlYWRvbmx5IGZpbGVzOiBzdHJpbmdbXTtcbiAgIHB1YmxpYyByZWFkb25seSBmb2xkZXJzOiBzdHJpbmdbXTtcbiAgIHB1YmxpYyByZWFkb25seSBkcnlSdW46IGJvb2xlYW47XG5cbiAgIGNvbnN0cnVjdG9yKGRyeVJ1bjogYm9vbGVhbikge1xuICAgICAgdGhpcy5wYXRocyA9IFtdO1xuICAgICAgdGhpcy5maWxlcyA9IFtdO1xuICAgICAgdGhpcy5mb2xkZXJzID0gW107XG4gICAgICB0aGlzLmRyeVJ1biA9IGRyeVJ1bjtcbiAgIH1cbn1cblxuY29uc3QgcmVtb3ZhbFJlZ2V4cCA9IC9eW2Etel0rXFxzKi9pO1xuY29uc3QgZHJ5UnVuUmVtb3ZhbFJlZ2V4cCA9IC9eW2Etel0rXFxzK1thLXpdK1xccyovaTtcbmNvbnN0IGlzRm9sZGVyUmVnZXhwID0gL1xcLyQvO1xuXG5leHBvcnQgZnVuY3Rpb24gY2xlYW5TdW1tYXJ5UGFyc2VyKGRyeVJ1bjogYm9vbGVhbiwgdGV4dDogc3RyaW5nKTogQ2xlYW5TdW1tYXJ5IHtcbiAgIGNvbnN0IHN1bW1hcnkgPSBuZXcgQ2xlYW5SZXNwb25zZShkcnlSdW4pO1xuICAgY29uc3QgcmVnZXhwID0gZHJ5UnVuID8gZHJ5UnVuUmVtb3ZhbFJlZ2V4cCA6IHJlbW92YWxSZWdleHA7XG5cbiAgIHRvTGluZXNXaXRoQ29udGVudCh0ZXh0KS5mb3JFYWNoKChsaW5lKSA9PiB7XG4gICAgICBjb25zdCByZW1vdmVkID0gbGluZS5yZXBsYWNlKHJlZ2V4cCwgJycpO1xuXG4gICAgICBzdW1tYXJ5LnBhdGhzLnB1c2gocmVtb3ZlZCk7XG4gICAgICAoaXNGb2xkZXJSZWdleHAudGVzdChyZW1vdmVkKSA/IHN1bW1hcnkuZm9sZGVycyA6IHN1bW1hcnkuZmlsZXMpLnB1c2gocmVtb3ZlZCk7XG4gICB9KTtcblxuICAgcmV0dXJuIHN1bW1hcnk7XG59XG4iLCAiaW1wb3J0IHsgVGFza0NvbmZpZ3VyYXRpb25FcnJvciB9IGZyb20gJy4uL2Vycm9ycy90YXNrLWNvbmZpZ3VyYXRpb24tZXJyb3InO1xuaW1wb3J0IHR5cGUgeyBCdWZmZXJUYXNrLCBFbXB0eVRhc2tQYXJzZXIsIFNpbXBsZUdpdFRhc2ssIFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBFTVBUWV9DT01NQU5EUzogW10gPSBbXTtcblxuZXhwb3J0IHR5cGUgRW1wdHlUYXNrID0ge1xuICAgY29tbWFuZHM6IHR5cGVvZiBFTVBUWV9DT01NQU5EUztcbiAgIGZvcm1hdDogJ2VtcHR5JztcbiAgIHBhcnNlcjogRW1wdHlUYXNrUGFyc2VyO1xuICAgb25FcnJvcj86IHVuZGVmaW5lZDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGhvY0V4ZWNUYXNrKHBhcnNlcjogRW1wdHlUYXNrUGFyc2VyKTogRW1wdHlUYXNrIHtcbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kczogRU1QVFlfQ09NTUFORFMsXG4gICAgICBmb3JtYXQ6ICdlbXB0eScsXG4gICAgICBwYXJzZXIsXG4gICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJhdGlvbkVycm9yVGFzayhlcnJvcjogRXJyb3IgfCBzdHJpbmcpOiBFbXB0eVRhc2sge1xuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzOiBFTVBUWV9DT01NQU5EUyxcbiAgICAgIGZvcm1hdDogJ2VtcHR5JyxcbiAgICAgIHBhcnNlcigpIHtcbiAgICAgICAgIHRocm93IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBuZXcgVGFza0NvbmZpZ3VyYXRpb25FcnJvcihlcnJvcikgOiBlcnJvcjtcbiAgICAgIH0sXG4gICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhjb21tYW5kczogc3RyaW5nW10sIHRyaW1tZWQgPSBmYWxzZSk6IFN0cmluZ1Rhc2s8c3RyaW5nPiB7XG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXIodGV4dCkge1xuICAgICAgICAgcmV0dXJuIHRyaW1tZWQgPyBTdHJpbmcodGV4dCkudHJpbSgpIDogdGV4dDtcbiAgICAgIH0sXG4gICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyYWlnaHRUaHJvdWdoQnVmZmVyVGFzayhjb21tYW5kczogc3RyaW5nW10pOiBCdWZmZXJUYXNrPEJ1ZmZlcj4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzLFxuICAgICAgZm9ybWF0OiAnYnVmZmVyJyxcbiAgICAgIHBhcnNlcihidWZmZXIpIHtcbiAgICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgICB9LFxuICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQnVmZmVyVGFzazxSPih0YXNrOiBTaW1wbGVHaXRUYXNrPFI+KTogdGFzayBpcyBCdWZmZXJUYXNrPFI+IHtcbiAgIHJldHVybiB0YXNrLmZvcm1hdCA9PT0gJ2J1ZmZlcic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5VGFzazxSPih0YXNrOiBTaW1wbGVHaXRUYXNrPFI+KTogdGFzayBpcyBFbXB0eVRhc2sge1xuICAgcmV0dXJuIHRhc2suZm9ybWF0ID09PSAnZW1wdHknIHx8ICF0YXNrLmNvbW1hbmRzLmxlbmd0aDtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IENsZWFuU3VtbWFyeSB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgY2xlYW5TdW1tYXJ5UGFyc2VyIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZS1jbGVhbic7XG5pbXBvcnQgdHlwZSB7IE1heWJlLCBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgYXNTdHJpbmdBcnJheSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb25FcnJvclRhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5leHBvcnQgY29uc3QgQ09ORklHX0VSUk9SX0lOVEVSQUNUSVZFX01PREUgPSAnR2l0IGNsZWFuIGludGVyYWN0aXZlIG1vZGUgaXMgbm90IHN1cHBvcnRlZCc7XG5leHBvcnQgY29uc3QgQ09ORklHX0VSUk9SX01PREVfUkVRVUlSRUQgPSAnR2l0IGNsZWFuIG1vZGUgcGFyYW1ldGVyIChcIm5cIiBvciBcImZcIikgaXMgcmVxdWlyZWQnO1xuZXhwb3J0IGNvbnN0IENPTkZJR19FUlJPUl9VTktOT1dOX09QVElPTiA9ICdHaXQgY2xlYW4gdW5rbm93biBvcHRpb24gZm91bmQgaW46ICc7XG5cbi8qKlxuICogQWxsIHN1cHBvcnRlZCBvcHRpb24gc3dpdGNoZXMgYXZhaWxhYmxlIGZvciB1c2UgaW4gYSBgZ2l0LmNsZWFuYCBvcGVyYXRpb25cbiAqL1xuZXhwb3J0IGVudW0gQ2xlYW5PcHRpb25zIHtcbiAgIERSWV9SVU4gPSAnbicsXG4gICBGT1JDRSA9ICdmJyxcbiAgIElHTk9SRURfSU5DTFVERUQgPSAneCcsXG4gICBJR05PUkVEX09OTFkgPSAnWCcsXG4gICBFWENMVURJTkcgPSAnZScsXG4gICBRVUlFVCA9ICdxJyxcbiAgIFJFQ1VSU0lWRSA9ICdkJyxcbn1cblxuLyoqXG4gKiBUaGUgdHdvIG1vZGVzIGBnaXQuY2xlYW5gIGNhbiBydW4gaW4gLSBvbmUgb2YgdGhlc2UgbXVzdCBiZSBzdXBwbGllZCBpbiBvcmRlclxuICogZm9yIHRoZSBjb21tYW5kIHRvIG5vdCB0aHJvdyBhIGBUYXNrQ29uZmlndXJhdGlvbkVycm9yYFxuICovXG5leHBvcnQgdHlwZSBDbGVhbk1vZGUgPSBDbGVhbk9wdGlvbnMuRk9SQ0UgfCBDbGVhbk9wdGlvbnMuRFJZX1JVTjtcblxuY29uc3QgQ2xlYW5PcHRpb25WYWx1ZXM6IFNldDxzdHJpbmc+ID0gbmV3IFNldChbXG4gICAnaScsXG4gICAuLi5hc1N0cmluZ0FycmF5KE9iamVjdC52YWx1ZXMoQ2xlYW5PcHRpb25zIGFzIGFueSkpLFxuXSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhbldpdGhPcHRpb25zVGFzayhtb2RlOiBDbGVhbk1vZGUgfCBzdHJpbmcsIGN1c3RvbUFyZ3M6IHN0cmluZ1tdKSB7XG4gICBjb25zdCB7IGNsZWFuTW9kZSwgb3B0aW9ucywgdmFsaWQgfSA9IGdldENsZWFuT3B0aW9ucyhtb2RlKTtcblxuICAgaWYgKCFjbGVhbk1vZGUpIHtcbiAgICAgIHJldHVybiBjb25maWd1cmF0aW9uRXJyb3JUYXNrKENPTkZJR19FUlJPUl9NT0RFX1JFUVVJUkVEKTtcbiAgIH1cblxuICAgaWYgKCF2YWxpZC5vcHRpb25zKSB7XG4gICAgICByZXR1cm4gY29uZmlndXJhdGlvbkVycm9yVGFzayhDT05GSUdfRVJST1JfVU5LTk9XTl9PUFRJT04gKyBKU09OLnN0cmluZ2lmeShtb2RlKSk7XG4gICB9XG5cbiAgIG9wdGlvbnMucHVzaCguLi5jdXN0b21BcmdzKTtcblxuICAgaWYgKG9wdGlvbnMuc29tZShpc0ludGVyYWN0aXZlTW9kZSkpIHtcbiAgICAgIHJldHVybiBjb25maWd1cmF0aW9uRXJyb3JUYXNrKENPTkZJR19FUlJPUl9JTlRFUkFDVElWRV9NT0RFKTtcbiAgIH1cblxuICAgcmV0dXJuIGNsZWFuVGFzayhjbGVhbk1vZGUsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYW5UYXNrKG1vZGU6IENsZWFuTW9kZSwgY3VzdG9tQXJnczogc3RyaW5nW10pOiBTdHJpbmdUYXNrPENsZWFuU3VtbWFyeT4ge1xuICAgY29uc3QgY29tbWFuZHM6IHN0cmluZ1tdID0gWydjbGVhbicsIGAtJHttb2RlfWAsIC4uLmN1c3RvbUFyZ3NdO1xuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXIodGV4dDogc3RyaW5nKTogQ2xlYW5TdW1tYXJ5IHtcbiAgICAgICAgIHJldHVybiBjbGVhblN1bW1hcnlQYXJzZXIobW9kZSA9PT0gQ2xlYW5PcHRpb25zLkRSWV9SVU4sIHRleHQpO1xuICAgICAgfSxcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NsZWFuT3B0aW9uc0FycmF5KGlucHV0OiBzdHJpbmdbXSk6IGlucHV0IGlzIENsZWFuT3B0aW9uc1tdIHtcbiAgIHJldHVybiBBcnJheS5pc0FycmF5KGlucHV0KSAmJiBpbnB1dC5ldmVyeSgodGVzdCkgPT4gQ2xlYW5PcHRpb25WYWx1ZXMuaGFzKHRlc3QpKTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2xlYW5PcHRpb25zKGlucHV0OiBzdHJpbmcpIHtcbiAgIGxldCBjbGVhbk1vZGU6IE1heWJlPENsZWFuTW9kZT47XG4gICBsZXQgb3B0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgIGxldCB2YWxpZCA9IHsgY2xlYW5Nb2RlOiBmYWxzZSwgb3B0aW9uczogdHJ1ZSB9O1xuXG4gICBpbnB1dFxuICAgICAgLnJlcGxhY2UoL1teYS16XWkvZywgJycpXG4gICAgICAuc3BsaXQoJycpXG4gICAgICAuZm9yRWFjaCgoY2hhcikgPT4ge1xuICAgICAgICAgaWYgKGlzQ2xlYW5Nb2RlKGNoYXIpKSB7XG4gICAgICAgICAgICBjbGVhbk1vZGUgPSBjaGFyO1xuICAgICAgICAgICAgdmFsaWQuY2xlYW5Nb2RlID0gdHJ1ZTtcbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWxpZC5vcHRpb25zID0gdmFsaWQub3B0aW9ucyAmJiBpc0tub3duT3B0aW9uKChvcHRpb25zW29wdGlvbnMubGVuZ3RoXSA9IGAtJHtjaGFyfWApKTtcbiAgICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICByZXR1cm4ge1xuICAgICAgY2xlYW5Nb2RlLFxuICAgICAgb3B0aW9ucyxcbiAgICAgIHZhbGlkLFxuICAgfTtcbn1cblxuZnVuY3Rpb24gaXNDbGVhbk1vZGUoY2xlYW5Nb2RlPzogc3RyaW5nKTogY2xlYW5Nb2RlIGlzIENsZWFuTW9kZSB7XG4gICByZXR1cm4gY2xlYW5Nb2RlID09PSBDbGVhbk9wdGlvbnMuRk9SQ0UgfHwgY2xlYW5Nb2RlID09PSBDbGVhbk9wdGlvbnMuRFJZX1JVTjtcbn1cblxuZnVuY3Rpb24gaXNLbm93bk9wdGlvbihvcHRpb246IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgcmV0dXJuIC9eLVthLXpdJC9pLnRlc3Qob3B0aW9uKSAmJiBDbGVhbk9wdGlvblZhbHVlcy5oYXMob3B0aW9uLmNoYXJBdCgxKSk7XG59XG5cbmZ1bmN0aW9uIGlzSW50ZXJhY3RpdmVNb2RlKG9wdGlvbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICBpZiAoL14tW15cXC1dLy50ZXN0KG9wdGlvbikpIHtcbiAgICAgIHJldHVybiBvcHRpb24uaW5kZXhPZignaScpID4gMDtcbiAgIH1cblxuICAgcmV0dXJuIG9wdGlvbiA9PT0gJy0taW50ZXJhY3RpdmUnO1xufVxuIiwgImltcG9ydCB0eXBlIHsgQ29uZmlnR2V0UmVzdWx0LCBDb25maWdMaXN0U3VtbWFyeSwgQ29uZmlnVmFsdWVzIH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBsYXN0LCBzcGxpdE9uIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgQ29uZmlnTGlzdCBpbXBsZW1lbnRzIENvbmZpZ0xpc3RTdW1tYXJ5IHtcbiAgIHB1YmxpYyBmaWxlczogc3RyaW5nW10gPSBbXTtcbiAgIHB1YmxpYyB2YWx1ZXM6IHsgW2ZpbGVOYW1lOiBzdHJpbmddOiBDb25maWdWYWx1ZXMgfSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgIHByaXZhdGUgX2FsbDogQ29uZmlnVmFsdWVzIHwgdW5kZWZpbmVkO1xuXG4gICBwdWJsaWMgZ2V0IGFsbCgpOiBDb25maWdWYWx1ZXMge1xuICAgICAgaWYgKCF0aGlzLl9hbGwpIHtcbiAgICAgICAgIHRoaXMuX2FsbCA9IHRoaXMuZmlsZXMucmVkdWNlKChhbGw6IENvbmZpZ1ZhbHVlcywgZmlsZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihhbGwsIHRoaXMudmFsdWVzW2ZpbGVdKTtcbiAgICAgICAgIH0sIHt9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX2FsbDtcbiAgIH1cblxuICAgcHVibGljIGFkZEZpbGUoZmlsZTogc3RyaW5nKTogQ29uZmlnVmFsdWVzIHtcbiAgICAgIGlmICghKGZpbGUgaW4gdGhpcy52YWx1ZXMpKSB7XG4gICAgICAgICBjb25zdCBsYXRlc3QgPSBsYXN0KHRoaXMuZmlsZXMpO1xuICAgICAgICAgdGhpcy52YWx1ZXNbZmlsZV0gPSBsYXRlc3QgPyBPYmplY3QuY3JlYXRlKHRoaXMudmFsdWVzW2xhdGVzdF0pIDoge307XG5cbiAgICAgICAgIHRoaXMuZmlsZXMucHVzaChmaWxlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMudmFsdWVzW2ZpbGVdO1xuICAgfVxuXG4gICBwdWJsaWMgYWRkVmFsdWUoZmlsZTogc3RyaW5nLCBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgICAgY29uc3QgdmFsdWVzID0gdGhpcy5hZGRGaWxlKGZpbGUpO1xuXG4gICAgICBpZiAoIU9iamVjdC5oYXNPd24odmFsdWVzLCBrZXkpKSB7XG4gICAgICAgICB2YWx1ZXNba2V5XSA9IHZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlc1trZXldKSkge1xuICAgICAgICAgKHZhbHVlc1trZXldIGFzIHN0cmluZ1tdKS5wdXNoKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICB2YWx1ZXNba2V5XSA9IFt2YWx1ZXNba2V5XSBhcyBzdHJpbmcsIHZhbHVlXTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fYWxsID0gdW5kZWZpbmVkO1xuICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnTGlzdFBhcnNlcih0ZXh0OiBzdHJpbmcpOiBDb25maWdMaXN0IHtcbiAgIGNvbnN0IGNvbmZpZyA9IG5ldyBDb25maWdMaXN0KCk7XG5cbiAgIGZvciAoY29uc3QgaXRlbSBvZiBjb25maWdQYXJzZXIodGV4dCkpIHtcbiAgICAgIGNvbmZpZy5hZGRWYWx1ZShpdGVtLmZpbGUsIFN0cmluZyhpdGVtLmtleSksIGl0ZW0udmFsdWUpO1xuICAgfVxuXG4gICByZXR1cm4gY29uZmlnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnR2V0UGFyc2VyKHRleHQ6IHN0cmluZywga2V5OiBzdHJpbmcpOiBDb25maWdHZXRSZXN1bHQge1xuICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgIGNvbnN0IHZhbHVlczogc3RyaW5nW10gPSBbXTtcbiAgIGNvbnN0IHNjb3BlczogTWFwPHN0cmluZywgc3RyaW5nW10+ID0gbmV3IE1hcCgpO1xuXG4gICBmb3IgKGNvbnN0IGl0ZW0gb2YgY29uZmlnUGFyc2VyKHRleHQsIGtleSkpIHtcbiAgICAgIGlmIChpdGVtLmtleSAhPT0ga2V5KSB7XG4gICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgdmFsdWVzLnB1c2goKHZhbHVlID0gaXRlbS52YWx1ZSkpO1xuXG4gICAgICBpZiAoIXNjb3Blcy5oYXMoaXRlbS5maWxlKSkge1xuICAgICAgICAgc2NvcGVzLnNldChpdGVtLmZpbGUsIFtdKTtcbiAgICAgIH1cblxuICAgICAgc2NvcGVzLmdldChpdGVtLmZpbGUpIS5wdXNoKHZhbHVlKTtcbiAgIH1cblxuICAgcmV0dXJuIHtcbiAgICAgIGtleSxcbiAgICAgIHBhdGhzOiBBcnJheS5mcm9tKHNjb3Blcy5rZXlzKCkpLFxuICAgICAgc2NvcGVzLFxuICAgICAgdmFsdWUsXG4gICAgICB2YWx1ZXMsXG4gICB9O1xufVxuXG5mdW5jdGlvbiBjb25maWdGaWxlUGF0aChmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgIHJldHVybiBmaWxlUGF0aC5yZXBsYWNlKC9eKGZpbGUpOi8sICcnKTtcbn1cblxuZnVuY3Rpb24qIGNvbmZpZ1BhcnNlcih0ZXh0OiBzdHJpbmcsIHJlcXVlc3RlZEtleTogc3RyaW5nIHwgbnVsbCA9IG51bGwpIHtcbiAgIGNvbnN0IGxpbmVzID0gdGV4dC5zcGxpdCgnXFwwJyk7XG5cbiAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBsaW5lcy5sZW5ndGggLSAxOyBpIDwgbWF4OyApIHtcbiAgICAgIGNvbnN0IGZpbGUgPSBjb25maWdGaWxlUGF0aChsaW5lc1tpKytdKTtcblxuICAgICAgbGV0IHZhbHVlID0gbGluZXNbaSsrXTtcbiAgICAgIGxldCBrZXkgPSByZXF1ZXN0ZWRLZXk7XG5cbiAgICAgIGlmICh2YWx1ZS5pbmNsdWRlcygnXFxuJykpIHtcbiAgICAgICAgIGNvbnN0IGxpbmUgPSBzcGxpdE9uKHZhbHVlLCAnXFxuJyk7XG4gICAgICAgICBrZXkgPSBsaW5lWzBdO1xuICAgICAgICAgdmFsdWUgPSBsaW5lWzFdO1xuICAgICAgfVxuXG4gICAgICB5aWVsZCB7IGZpbGUsIGtleSwgdmFsdWUgfTtcbiAgIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IENvbmZpZ0dldFJlc3VsdCwgQ29uZmlnTGlzdFN1bW1hcnksIFNpbXBsZUdpdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgY29uZmlnR2V0UGFyc2VyLCBjb25maWdMaXN0UGFyc2VyIH0gZnJvbSAnLi4vcmVzcG9uc2VzL0NvbmZpZ0xpc3QnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRBcGkgfSBmcm9tICcuLi9zaW1wbGUtZ2l0LWFwaSc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBlbnVtIEdpdENvbmZpZ1Njb3BlIHtcbiAgIHN5c3RlbSA9ICdzeXN0ZW0nLFxuICAgZ2xvYmFsID0gJ2dsb2JhbCcsXG4gICBsb2NhbCA9ICdsb2NhbCcsXG4gICB3b3JrdHJlZSA9ICd3b3JrdHJlZScsXG59XG5cbmZ1bmN0aW9uIGFzQ29uZmlnU2NvcGU8VCBleHRlbmRzIEdpdENvbmZpZ1Njb3BlIHwgdW5kZWZpbmVkPihcbiAgIHNjb3BlOiBHaXRDb25maWdTY29wZSB8IHVua25vd24sXG4gICBmYWxsYmFjazogVFxuKTogR2l0Q29uZmlnU2NvcGUgfCBUIHtcbiAgIGlmICh0eXBlb2Ygc2NvcGUgPT09ICdzdHJpbmcnICYmIE9iamVjdC5oYXNPd24oR2l0Q29uZmlnU2NvcGUsIHNjb3BlKSkge1xuICAgICAgcmV0dXJuIHNjb3BlIGFzIEdpdENvbmZpZ1Njb3BlO1xuICAgfVxuICAgcmV0dXJuIGZhbGxiYWNrO1xufVxuXG5mdW5jdGlvbiBhZGRDb25maWdUYXNrKFxuICAga2V5OiBzdHJpbmcsXG4gICB2YWx1ZTogc3RyaW5nLFxuICAgYXBwZW5kOiBib29sZWFuLFxuICAgc2NvcGU6IEdpdENvbmZpZ1Njb3BlXG4pOiBTdHJpbmdUYXNrPHN0cmluZz4ge1xuICAgY29uc3QgY29tbWFuZHM6IHN0cmluZ1tdID0gWydjb25maWcnLCBgLS0ke3Njb3BlfWBdO1xuXG4gICBpZiAoYXBwZW5kKSB7XG4gICAgICBjb21tYW5kcy5wdXNoKCctLWFkZCcpO1xuICAgfVxuXG4gICBjb21tYW5kcy5wdXNoKGtleSwgdmFsdWUpO1xuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXIodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgfSxcbiAgIH07XG59XG5cbmZ1bmN0aW9uIGdldENvbmZpZ1Rhc2soa2V5OiBzdHJpbmcsIHNjb3BlPzogR2l0Q29uZmlnU2NvcGUpOiBTdHJpbmdUYXNrPENvbmZpZ0dldFJlc3VsdD4ge1xuICAgY29uc3QgY29tbWFuZHM6IHN0cmluZ1tdID0gWydjb25maWcnLCAnLS1udWxsJywgJy0tc2hvdy1vcmlnaW4nLCAnLS1nZXQtYWxsJywga2V5XTtcblxuICAgaWYgKHNjb3BlKSB7XG4gICAgICBjb21tYW5kcy5zcGxpY2UoMSwgMCwgYC0tJHtzY29wZX1gKTtcbiAgIH1cblxuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgcGFyc2VyKHRleHQpIHtcbiAgICAgICAgIHJldHVybiBjb25maWdHZXRQYXJzZXIodGV4dCwga2V5KTtcbiAgICAgIH0sXG4gICB9O1xufVxuXG5mdW5jdGlvbiBsaXN0Q29uZmlnVGFzayhzY29wZT86IEdpdENvbmZpZ1Njb3BlKTogU3RyaW5nVGFzazxDb25maWdMaXN0U3VtbWFyeT4ge1xuICAgY29uc3QgY29tbWFuZHMgPSBbJ2NvbmZpZycsICctLWxpc3QnLCAnLS1zaG93LW9yaWdpbicsICctLW51bGwnXTtcblxuICAgaWYgKHNjb3BlKSB7XG4gICAgICBjb21tYW5kcy5wdXNoKGAtLSR7c2NvcGV9YCk7XG4gICB9XG5cbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kcyxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIHBhcnNlcih0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgIHJldHVybiBjb25maWdMaXN0UGFyc2VyKHRleHQpO1xuICAgICAgfSxcbiAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpOiBQaWNrPFNpbXBsZUdpdCwgJ2FkZENvbmZpZycgfCAnZ2V0Q29uZmlnJyB8ICdsaXN0Q29uZmlnJz4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGFkZENvbmZpZyh0aGlzOiBTaW1wbGVHaXRBcGksIGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCAuLi5yZXN0OiB1bmtub3duW10pIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgYWRkQ29uZmlnVGFzayhcbiAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgcmVzdFswXSA9PT0gdHJ1ZSxcbiAgICAgICAgICAgICAgIGFzQ29uZmlnU2NvcGUocmVzdFsxXSwgR2l0Q29uZmlnU2NvcGUubG9jYWwpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICAgICAgICk7XG4gICAgICB9LFxuXG4gICAgICBnZXRDb25maWcodGhpczogU2ltcGxlR2l0QXBpLCBrZXk6IHN0cmluZywgc2NvcGU/OiBHaXRDb25maWdTY29wZSkge1xuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICAgICBnZXRDb25maWdUYXNrKGtleSwgYXNDb25maWdTY29wZShzY29wZSwgdW5kZWZpbmVkKSksXG4gICAgICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgICAgKTtcbiAgICAgIH0sXG5cbiAgICAgIGxpc3RDb25maWcodGhpczogU2ltcGxlR2l0QXBpLCAuLi5yZXN0OiB1bmtub3duW10pIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgbGlzdENvbmZpZ1Rhc2soYXNDb25maWdTY29wZShyZXN0WzBdLCB1bmRlZmluZWQpKSxcbiAgICAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICAgICApO1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiZXhwb3J0IGVudW0gRGlmZk5hbWVTdGF0dXMge1xuICAgQURERUQgPSAnQScsXG4gICBDT1BJRUQgPSAnQycsXG4gICBERUxFVEVEID0gJ0QnLFxuICAgTU9ESUZJRUQgPSAnTScsXG4gICBSRU5BTUVEID0gJ1InLFxuICAgQ0hBTkdFRCA9ICdUJyxcbiAgIFVOTUVSR0VEID0gJ1UnLFxuICAgVU5LTk9XTiA9ICdYJyxcbiAgIEJST0tFTiA9ICdCJyxcbn1cblxuY29uc3QgZGlmZk5hbWVTdGF0dXMgPSBuZXcgU2V0KE9iamVjdC52YWx1ZXMoRGlmZk5hbWVTdGF0dXMpKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGlmZk5hbWVTdGF0dXMoaW5wdXQ6IHN0cmluZyk6IGlucHV0IGlzIERpZmZOYW1lU3RhdHVzIHtcbiAgIHJldHVybiBkaWZmTmFtZVN0YXR1cy5oYXMoaW5wdXQgYXMgRGlmZk5hbWVTdGF0dXMpO1xufVxuIiwgImltcG9ydCB0eXBlIHsgR3JlcFJlc3VsdCwgU2ltcGxlR2l0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdEFwaSB9IGZyb20gJy4uL3NpbXBsZS1naXQtYXBpJztcbmltcG9ydCB7XG4gICBhc051bWJlcixcbiAgIGZvckVhY2hMaW5lV2l0aENvbnRlbnQsXG4gICBnZXRUcmFpbGluZ09wdGlvbnMsXG4gICBOVUxMLFxuICAgcHJlZml4ZWRBcnJheSxcbiAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudCxcbn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgY29uZmlndXJhdGlvbkVycm9yVGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmNvbnN0IGRpc2FsbG93ZWRPcHRpb25zID0gWyctaCddO1xuXG5jb25zdCBRdWVyeSA9IFN5bWJvbCgnZ3JlcFF1ZXJ5Jyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2l0R3JlcFF1ZXJ5IGV4dGVuZHMgSXRlcmFibGU8c3RyaW5nPiB7XG4gICAvKiogQWRkcyBvbmUgb3IgbW9yZSB0ZXJtcyB0byBiZSBncm91cGVkIGFzIGFuIFwiYW5kXCIgdG8gYW55IG90aGVyIHRlcm1zICovXG4gICBhbmQoLi4uYW5kOiBzdHJpbmdbXSk6IHRoaXM7XG5cbiAgIC8qKiBBZGRzIG9uZSBvciBtb3JlIHNlYXJjaCB0ZXJtcyAtIGdpdC5ncmVwIHdpbGwgXCJvclwiIHRoaXMgdG8gb3RoZXIgdGVybXMgKi9cbiAgIHBhcmFtKC4uLnBhcmFtOiBzdHJpbmdbXSk6IHRoaXM7XG59XG5cbmNsYXNzIEdyZXBRdWVyeSBpbXBsZW1lbnRzIEdpdEdyZXBRdWVyeSB7XG4gICBwcml2YXRlIFtRdWVyeV06IHN0cmluZ1tdID0gW107XG5cbiAgICpbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICAgIGZvciAoY29uc3QgcXVlcnkgb2YgdGhpc1tRdWVyeV0pIHtcbiAgICAgICAgIHlpZWxkIHF1ZXJ5O1xuICAgICAgfVxuICAgfVxuXG4gICBhbmQoLi4uYW5kOiBzdHJpbmdbXSkge1xuICAgICAgYW5kLmxlbmd0aCAmJiB0aGlzW1F1ZXJ5XS5wdXNoKCctLWFuZCcsICcoJywgLi4ucHJlZml4ZWRBcnJheShhbmQsICctZScpLCAnKScpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICB9XG5cbiAgIHBhcmFtKC4uLnBhcmFtOiBzdHJpbmdbXSkge1xuICAgICAgdGhpc1tRdWVyeV0ucHVzaCguLi5wcmVmaXhlZEFycmF5KHBhcmFtLCAnLWUnKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGJ1aWxkZXIgZm9yIGEgYGdpdC5ncmVwYCBxdWVyeSB3aXRoIG9wdGlvbmFsIHBhcmFtc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ3JlcFF1ZXJ5QnVpbGRlciguLi5wYXJhbXM6IHN0cmluZ1tdKTogR2l0R3JlcFF1ZXJ5IHtcbiAgIHJldHVybiBuZXcgR3JlcFF1ZXJ5KCkucGFyYW0oLi4ucGFyYW1zKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VHcmVwKGdyZXA6IHN0cmluZyk6IEdyZXBSZXN1bHQge1xuICAgY29uc3QgcGF0aHM6IEdyZXBSZXN1bHRbJ3BhdGhzJ10gPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgIGNvbnN0IHJlc3VsdHM6IEdyZXBSZXN1bHRbJ3Jlc3VsdHMnXSA9IHt9O1xuXG4gICBmb3JFYWNoTGluZVdpdGhDb250ZW50KGdyZXAsIChpbnB1dCkgPT4ge1xuICAgICAgY29uc3QgW3BhdGgsIGxpbmUsIHByZXZpZXddID0gaW5wdXQuc3BsaXQoTlVMTCk7XG4gICAgICBwYXRocy5hZGQocGF0aCk7XG4gICAgICAocmVzdWx0c1twYXRoXSA9IHJlc3VsdHNbcGF0aF0gfHwgW10pLnB1c2goe1xuICAgICAgICAgbGluZTogYXNOdW1iZXIobGluZSksXG4gICAgICAgICBwYXRoLFxuICAgICAgICAgcHJldmlldyxcbiAgICAgIH0pO1xuICAgfSk7XG5cbiAgIHJldHVybiB7XG4gICAgICBwYXRocyxcbiAgICAgIHJlc3VsdHMsXG4gICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKTogUGljazxTaW1wbGVHaXQsICdncmVwJz4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGdyZXAodGhpczogU2ltcGxlR2l0QXBpLCBzZWFyY2hUZXJtOiBzdHJpbmcgfCBHaXRHcmVwUXVlcnkpIHtcbiAgICAgICAgIGNvbnN0IHRoZW4gPSB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKTtcbiAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKTtcblxuICAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgZGlzYWxsb3dlZE9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmluY2x1ZGVzKG9wdGlvbikpIHtcbiAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbkVycm9yVGFzayhgZ2l0LmdyZXA6IHVzZSBvZiBcIiR7b3B0aW9ufVwiIGlzIG5vdCBzdXBwb3J0ZWQuYCksXG4gICAgICAgICAgICAgICAgICB0aGVuXG4gICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgfVxuXG4gICAgICAgICBpZiAodHlwZW9mIHNlYXJjaFRlcm0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBzZWFyY2hUZXJtID0gZ3JlcFF1ZXJ5QnVpbGRlcigpLnBhcmFtKHNlYXJjaFRlcm0pO1xuICAgICAgICAgfVxuXG4gICAgICAgICBjb25zdCBjb21tYW5kcyA9IFsnZ3JlcCcsICctLW51bGwnLCAnLW4nLCAnLS1mdWxsLW5hbWUnLCAuLi5vcHRpb25zLCAuLi5zZWFyY2hUZXJtXTtcblxuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICBjb21tYW5kcyxcbiAgICAgICAgICAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgICAgICAgICAgIHBhcnNlcihzdGRPdXQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUdyZXAoc3RkT3V0KTtcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhlblxuICAgICAgICAgKTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgTWF5YmUsIE9wdGlvbkZsYWdzLCBPcHRpb25zIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgYXNTdHJpbmdBcnJheSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5leHBvcnQgZW51bSBSZXNldE1vZGUge1xuICAgTUlYRUQgPSAnbWl4ZWQnLFxuICAgU09GVCA9ICdzb2Z0JyxcbiAgIEhBUkQgPSAnaGFyZCcsXG4gICBNRVJHRSA9ICdtZXJnZScsXG4gICBLRUVQID0gJ2tlZXAnLFxufVxuXG5jb25zdCB2YWxpZFJlc2V0TW9kZXMgPSBhc1N0cmluZ0FycmF5KE9iamVjdC52YWx1ZXMoUmVzZXRNb2RlKSk7XG5cbmV4cG9ydCB0eXBlIFJlc2V0T3B0aW9ucyA9IE9wdGlvbnMgJlxuICAgT3B0aW9uRmxhZ3M8Jy1xJyB8ICctLXF1aWV0JyB8ICctLW5vLXF1aWV0JyB8ICctLXBhdGhzcGVjLWZyb20tbnVsJz4gJlxuICAgT3B0aW9uRmxhZ3M8Jy0tcGF0aHNwZWMtZnJvbS1maWxlJywgc3RyaW5nPjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0VGFzayhtb2RlOiBNYXliZTxSZXNldE1vZGU+LCBjdXN0b21BcmdzOiBzdHJpbmdbXSkge1xuICAgY29uc3QgY29tbWFuZHM6IHN0cmluZ1tdID0gWydyZXNldCddO1xuICAgaWYgKGlzVmFsaWRSZXNldE1vZGUobW9kZSkpIHtcbiAgICAgIGNvbW1hbmRzLnB1c2goYC0tJHttb2RlfWApO1xuICAgfVxuICAgY29tbWFuZHMucHVzaCguLi5jdXN0b21BcmdzKTtcblxuICAgcmV0dXJuIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soY29tbWFuZHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVzZXRNb2RlKG1vZGU6IFJlc2V0TW9kZSB8IHVua25vd24pOiBNYXliZTxSZXNldE1vZGU+IHtcbiAgIGlmIChpc1ZhbGlkUmVzZXRNb2RlKG1vZGUpKSB7XG4gICAgICByZXR1cm4gbW9kZTtcbiAgIH1cblxuICAgc3dpdGNoICh0eXBlb2YgbW9kZSkge1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgICByZXR1cm4gUmVzZXRNb2RlLlNPRlQ7XG4gICB9XG5cbiAgIHJldHVybjtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZFJlc2V0TW9kZShtb2RlOiBSZXNldE1vZGUgfCB1bmtub3duKTogbW9kZSBpcyBSZXNldE1vZGUge1xuICAgcmV0dXJuIHR5cGVvZiBtb2RlID09PSAnc3RyaW5nJyAmJiB2YWxpZFJlc2V0TW9kZXMuaW5jbHVkZXMobW9kZSk7XG59XG4iLCAiaW1wb3J0IGRlYnVnLCB7IHR5cGUgRGVidWdnZXIgfSBmcm9tICdkZWJ1Zyc7XG5cbmltcG9ydCB0eXBlIHsgTWF5YmUgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7XG4gICBhcHBlbmQsXG4gICBmaWx0ZXJIYXNMZW5ndGgsXG4gICBmaWx0ZXJTdHJpbmcsXG4gICBmaWx0ZXJUeXBlLFxuICAgTk9PUCxcbiAgIG9iamVjdFRvU3RyaW5nLFxuICAgcmVtb3ZlLFxufSBmcm9tICcuL3V0aWxzJztcblxuZGVidWcuZm9ybWF0dGVycy5MID0gKHZhbHVlOiBhbnkpID0+IFN0cmluZyhmaWx0ZXJIYXNMZW5ndGgodmFsdWUpID8gdmFsdWUubGVuZ3RoIDogJy0nKTtcbmRlYnVnLmZvcm1hdHRlcnMuQiA9ICh2YWx1ZTogQnVmZmVyKSA9PiB7XG4gICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCd1dGY4Jyk7XG4gICB9XG4gICByZXR1cm4gb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufTtcblxudHlwZSBPdXRwdXRMb2dnaW5nSGFuZGxlciA9IChtZXNzYWdlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkO1xuXG5mdW5jdGlvbiBjcmVhdGVMb2coKSB7XG4gICByZXR1cm4gZGVidWcoJ3NpbXBsZS1naXQnKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPdXRwdXRMb2dnZXIgZXh0ZW5kcyBPdXRwdXRMb2dnaW5nSGFuZGxlciB7XG4gICByZWFkb25seSBsYWJlbDogc3RyaW5nO1xuXG4gICBpbmZvOiBPdXRwdXRMb2dnaW5nSGFuZGxlcjtcbiAgIHN0ZXAobmV4dFN0ZXA/OiBzdHJpbmcpOiBPdXRwdXRMb2dnZXI7XG4gICBzaWJsaW5nKG5hbWU6IHN0cmluZyk6IE91dHB1dExvZ2dlcjtcbn1cblxuZnVuY3Rpb24gcHJlZml4ZWRMb2dnZXIoXG4gICB0bzogRGVidWdnZXIsXG4gICBwcmVmaXg6IHN0cmluZyxcbiAgIGZvcndhcmQ/OiBPdXRwdXRMb2dnaW5nSGFuZGxlclxuKTogT3V0cHV0TG9nZ2luZ0hhbmRsZXIge1xuICAgaWYgKCFwcmVmaXggfHwgIVN0cmluZyhwcmVmaXgpLnJlcGxhY2UoL1xccyovLCAnJykpIHtcbiAgICAgIHJldHVybiAhZm9yd2FyZFxuICAgICAgICAgPyB0b1xuICAgICAgICAgOiAobWVzc2FnZSwgLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICB0byhtZXNzYWdlLCAuLi5hcmdzKTtcbiAgICAgICAgICAgICAgZm9yd2FyZChtZXNzYWdlLCAuLi5hcmdzKTtcbiAgICAgICAgICAgfTtcbiAgIH1cblxuICAgcmV0dXJuIChtZXNzYWdlLCAuLi5hcmdzKSA9PiB7XG4gICAgICB0byhgJXMgJHttZXNzYWdlfWAsIHByZWZpeCwgLi4uYXJncyk7XG4gICAgICBpZiAoZm9yd2FyZCkge1xuICAgICAgICAgZm9yd2FyZChtZXNzYWdlLCAuLi5hcmdzKTtcbiAgICAgIH1cbiAgIH07XG59XG5cbmZ1bmN0aW9uIGNoaWxkTG9nZ2VyTmFtZShcbiAgIG5hbWU6IE1heWJlPHN0cmluZz4sXG4gICBjaGlsZERlYnVnZ2VyOiBNYXliZTxEZWJ1Z2dlcj4sXG4gICB7IG5hbWVzcGFjZTogcGFyZW50TmFtZXNwYWNlIH06IERlYnVnZ2VyXG4pOiBzdHJpbmcge1xuICAgaWYgKHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIG5hbWU7XG4gICB9XG4gICBjb25zdCBjaGlsZE5hbWVzcGFjZSA9IChjaGlsZERlYnVnZ2VyICYmIGNoaWxkRGVidWdnZXIubmFtZXNwYWNlKSB8fCAnJztcblxuICAgaWYgKGNoaWxkTmFtZXNwYWNlLnN0YXJ0c1dpdGgocGFyZW50TmFtZXNwYWNlKSkge1xuICAgICAgcmV0dXJuIGNoaWxkTmFtZXNwYWNlLnN1YnN0cihwYXJlbnROYW1lc3BhY2UubGVuZ3RoICsgMSk7XG4gICB9XG5cbiAgIHJldHVybiBjaGlsZE5hbWVzcGFjZSB8fCBwYXJlbnROYW1lc3BhY2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMb2dnZXIoXG4gICBsYWJlbDogc3RyaW5nLFxuICAgdmVyYm9zZT86IHN0cmluZyB8IERlYnVnZ2VyLFxuICAgaW5pdGlhbFN0ZXA/OiBzdHJpbmcsXG4gICBpbmZvRGVidWdnZXIgPSBjcmVhdGVMb2coKVxuKTogT3V0cHV0TG9nZ2VyIHtcbiAgIGNvbnN0IGxhYmVsUHJlZml4ID0gKGxhYmVsICYmIGBbJHtsYWJlbH1dYCkgfHwgJyc7XG5cbiAgIGNvbnN0IHNwYXduZWQ6IE91dHB1dExvZ2dlcltdID0gW107XG4gICBjb25zdCBkZWJ1Z0RlYnVnZ2VyOiBNYXliZTxEZWJ1Z2dlcj4gPVxuICAgICAgdHlwZW9mIHZlcmJvc2UgPT09ICdzdHJpbmcnID8gaW5mb0RlYnVnZ2VyLmV4dGVuZCh2ZXJib3NlKSA6IHZlcmJvc2U7XG4gICBjb25zdCBrZXkgPSBjaGlsZExvZ2dlck5hbWUoZmlsdGVyVHlwZSh2ZXJib3NlLCBmaWx0ZXJTdHJpbmcpLCBkZWJ1Z0RlYnVnZ2VyLCBpbmZvRGVidWdnZXIpO1xuXG4gICByZXR1cm4gc3RlcChpbml0aWFsU3RlcCk7XG5cbiAgIGZ1bmN0aW9uIHNpYmxpbmcobmFtZTogc3RyaW5nLCBpbml0aWFsPzogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gYXBwZW5kKFxuICAgICAgICAgc3Bhd25lZCxcbiAgICAgICAgIGNyZWF0ZUxvZ2dlcihsYWJlbCwga2V5LnJlcGxhY2UoL15bXjpdKy8sIG5hbWUpLCBpbml0aWFsLCBpbmZvRGVidWdnZXIpXG4gICAgICApO1xuICAgfVxuXG4gICBmdW5jdGlvbiBzdGVwKHBoYXNlPzogc3RyaW5nKSB7XG4gICAgICBjb25zdCBzdGVwUHJlZml4ID0gKHBoYXNlICYmIGBbJHtwaGFzZX1dYCkgfHwgJyc7XG4gICAgICBjb25zdCBkZWJ1ZyA9IChkZWJ1Z0RlYnVnZ2VyICYmIHByZWZpeGVkTG9nZ2VyKGRlYnVnRGVidWdnZXIsIHN0ZXBQcmVmaXgpKSB8fCBOT09QO1xuICAgICAgY29uc3QgaW5mbyA9IHByZWZpeGVkTG9nZ2VyKGluZm9EZWJ1Z2dlciwgYCR7bGFiZWxQcmVmaXh9ICR7c3RlcFByZWZpeH1gLCBkZWJ1Zyk7XG5cbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGRlYnVnRGVidWdnZXIgPyBkZWJ1ZyA6IGluZm8sIHtcbiAgICAgICAgIGxhYmVsLFxuICAgICAgICAgc2libGluZyxcbiAgICAgICAgIGluZm8sXG4gICAgICAgICBzdGVwLFxuICAgICAgfSk7XG4gICB9XG59XG5cbi8qKlxuICogVGhlIGBHaXRMb2dnZXJgIGlzIHVzZWQgYnkgdGhlIG1haW4gYFNpbXBsZUdpdGAgcnVubmVyIHRvIGhhbmRsZSBsb2dnaW5nXG4gKiBhbnkgd2FybmluZ3Mgb3IgZXJyb3JzLlxuICovXG5leHBvcnQgY2xhc3MgR2l0TG9nZ2VyIHtcbiAgIHB1YmxpYyBlcnJvcjogT3V0cHV0TG9nZ2luZ0hhbmRsZXI7XG5cbiAgIHB1YmxpYyB3YXJuOiBPdXRwdXRMb2dnaW5nSGFuZGxlcjtcblxuICAgY29uc3RydWN0b3IocHJpdmF0ZSBfb3V0OiBEZWJ1Z2dlciA9IGNyZWF0ZUxvZygpKSB7XG4gICAgICB0aGlzLmVycm9yID0gcHJlZml4ZWRMb2dnZXIoX291dCwgJ1tFUlJPUl0nKTtcbiAgICAgIHRoaXMud2FybiA9IHByZWZpeGVkTG9nZ2VyKF9vdXQsICdbV0FSTl0nKTtcbiAgIH1cblxuICAgc2lsZW50KHNpbGVuY2UgPSBmYWxzZSkge1xuICAgICAgaWYgKHNpbGVuY2UgIT09IHRoaXMuX291dC5lbmFibGVkKSB7XG4gICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgbmFtZXNwYWNlIH0gPSB0aGlzLl9vdXQ7XG4gICAgICBjb25zdCBlbnYgPSAocHJvY2Vzcy5lbnYuREVCVUcgfHwgJycpLnNwbGl0KCcsJykuZmlsdGVyKChzKSA9PiAhIXMpO1xuICAgICAgY29uc3QgaGFzT24gPSBlbnYuaW5jbHVkZXMobmFtZXNwYWNlKTtcbiAgICAgIGNvbnN0IGhhc09mZiA9IGVudi5pbmNsdWRlcyhgLSR7bmFtZXNwYWNlfWApO1xuXG4gICAgICAvLyBlbmFibGluZyB0aGUgbG9nXG4gICAgICBpZiAoIXNpbGVuY2UpIHtcbiAgICAgICAgIGlmIChoYXNPZmYpIHtcbiAgICAgICAgICAgIHJlbW92ZShlbnYsIGAtJHtuYW1lc3BhY2V9YCk7XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW52LnB1c2gobmFtZXNwYWNlKTtcbiAgICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICBpZiAoaGFzT24pIHtcbiAgICAgICAgICAgIHJlbW92ZShlbnYsIG5hbWVzcGFjZSk7XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW52LnB1c2goYC0ke25hbWVzcGFjZX1gKTtcbiAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZGVidWcuZW5hYmxlKGVudi5qb2luKCcsJykpO1xuICAgfVxufVxuIiwgImltcG9ydCB7IEdpdEVycm9yIH0gZnJvbSAnLi4vZXJyb3JzL2dpdC1lcnJvcic7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIsIHR5cGUgT3V0cHV0TG9nZ2VyIH0gZnJvbSAnLi4vZ2l0LWxvZ2dlcic7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdFRhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5cbnR5cGUgQW55U2ltcGxlR2l0VGFzayA9IFNpbXBsZUdpdFRhc2s8YW55PjtcblxudHlwZSBUYXNrSW5Qcm9ncmVzcyA9IHtcbiAgIG5hbWU6IHN0cmluZztcbiAgIGxvZ2dlcjogT3V0cHV0TG9nZ2VyO1xuICAgdGFzazogQW55U2ltcGxlR2l0VGFzaztcbn07XG5cbmV4cG9ydCBjbGFzcyBUYXNrc1BlbmRpbmdRdWV1ZSB7XG4gICBwcml2YXRlIF9xdWV1ZTogTWFwPEFueVNpbXBsZUdpdFRhc2ssIFRhc2tJblByb2dyZXNzPiA9IG5ldyBNYXAoKTtcblxuICAgY29uc3RydWN0b3IocHJpdmF0ZSBsb2dMYWJlbCA9ICdHaXRFeGVjdXRvcicpIHt9XG5cbiAgIHByaXZhdGUgd2l0aFByb2dyZXNzKHRhc2s6IEFueVNpbXBsZUdpdFRhc2spIHtcbiAgICAgIHJldHVybiB0aGlzLl9xdWV1ZS5nZXQodGFzayk7XG4gICB9XG5cbiAgIHByaXZhdGUgY3JlYXRlUHJvZ3Jlc3ModGFzazogQW55U2ltcGxlR2l0VGFzayk6IFRhc2tJblByb2dyZXNzIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBUYXNrc1BlbmRpbmdRdWV1ZS5nZXROYW1lKHRhc2suY29tbWFuZHNbMF0pO1xuICAgICAgY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKHRoaXMubG9nTGFiZWwsIG5hbWUpO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAgdGFzayxcbiAgICAgICAgIGxvZ2dlcixcbiAgICAgICAgIG5hbWUsXG4gICAgICB9O1xuICAgfVxuXG4gICBwdXNoKHRhc2s6IEFueVNpbXBsZUdpdFRhc2spOiBUYXNrSW5Qcm9ncmVzcyB7XG4gICAgICBjb25zdCBwcm9ncmVzcyA9IHRoaXMuY3JlYXRlUHJvZ3Jlc3ModGFzayk7XG4gICAgICBwcm9ncmVzcy5sb2dnZXIoJ0FkZGluZyB0YXNrIHRvIHRoZSBxdWV1ZSwgY29tbWFuZHMgPSAlbycsIHRhc2suY29tbWFuZHMpO1xuXG4gICAgICB0aGlzLl9xdWV1ZS5zZXQodGFzaywgcHJvZ3Jlc3MpO1xuXG4gICAgICByZXR1cm4gcHJvZ3Jlc3M7XG4gICB9XG5cbiAgIGZhdGFsKGVycjogR2l0RXJyb3IpIHtcbiAgICAgIGZvciAoY29uc3QgW3Rhc2ssIHsgbG9nZ2VyIH1dIG9mIEFycmF5LmZyb20odGhpcy5fcXVldWUuZW50cmllcygpKSkge1xuICAgICAgICAgaWYgKHRhc2sgPT09IGVyci50YXNrKSB7XG4gICAgICAgICAgICBsb2dnZXIuaW5mbyhgRmFpbGVkICVvYCwgZXJyKTtcbiAgICAgICAgICAgIGxvZ2dlcihcbiAgICAgICAgICAgICAgIGBGYXRhbCBleGNlcHRpb24sIGFueSBhcy15ZXQgdW4tc3RhcnRlZCB0YXNrcyBydW4gdGhyb3VnaCB0aGlzIGV4ZWN1dG9yIHdpbGwgbm90IGJlIGF0dGVtcHRlZGBcbiAgICAgICAgICAgICk7XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9nZ2VyLmluZm8oXG4gICAgICAgICAgICAgICBgQSBmYXRhbCBleGNlcHRpb24gb2NjdXJyZWQgaW4gYSBwcmV2aW91cyB0YXNrLCB0aGUgcXVldWUgaGFzIGJlZW4gcHVyZ2VkOiAlb2AsXG4gICAgICAgICAgICAgICBlcnIubWVzc2FnZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgdGhpcy5jb21wbGV0ZSh0YXNrKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX3F1ZXVlLnNpemUgIT09IDApIHtcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUXVldWUgc2l6ZSBzaG91bGQgYmUgemVybyBhZnRlciBmYXRhbDogJHt0aGlzLl9xdWV1ZS5zaXplfWApO1xuICAgICAgfVxuICAgfVxuXG4gICBjb21wbGV0ZSh0YXNrOiBBbnlTaW1wbGVHaXRUYXNrKSB7XG4gICAgICBjb25zdCBwcm9ncmVzcyA9IHRoaXMud2l0aFByb2dyZXNzKHRhc2spO1xuICAgICAgaWYgKHByb2dyZXNzKSB7XG4gICAgICAgICB0aGlzLl9xdWV1ZS5kZWxldGUodGFzayk7XG4gICAgICB9XG4gICB9XG5cbiAgIGF0dGVtcHQodGFzazogQW55U2ltcGxlR2l0VGFzayk6IFRhc2tJblByb2dyZXNzIHtcbiAgICAgIGNvbnN0IHByb2dyZXNzID0gdGhpcy53aXRoUHJvZ3Jlc3ModGFzayk7XG4gICAgICBpZiAoIXByb2dyZXNzKSB7XG4gICAgICAgICB0aHJvdyBuZXcgR2l0RXJyb3IodW5kZWZpbmVkLCAnVGFza3NQZW5kaW5nUXVldWU6IGF0dGVtcHQgY2FsbGVkIGZvciBhbiB1bmtub3duIHRhc2snKTtcbiAgICAgIH1cbiAgICAgIHByb2dyZXNzLmxvZ2dlcignU3RhcnRpbmcgdGFzaycpO1xuXG4gICAgICByZXR1cm4gcHJvZ3Jlc3M7XG4gICB9XG5cbiAgIHN0YXRpYyBnZXROYW1lKG5hbWUgPSAnZW1wdHknKSB7XG4gICAgICByZXR1cm4gYHRhc2s6JHtuYW1lfTokeysrVGFza3NQZW5kaW5nUXVldWUuY291bnRlcn1gO1xuICAgfVxuXG4gICBwcml2YXRlIHN0YXRpYyBjb3VudGVyID0gMDtcbn1cbiIsICJpbXBvcnQgeyB0eXBlIFNwYXduT3B0aW9ucywgc3Bhd24gfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnO1xuXG5pbXBvcnQgeyBHaXRFcnJvciB9IGZyb20gJy4uL2Vycm9ycy9naXQtZXJyb3InO1xuaW1wb3J0IHR5cGUgeyBPdXRwdXRMb2dnZXIgfSBmcm9tICcuLi9naXQtbG9nZ2VyJztcbmltcG9ydCB0eXBlIHsgUGx1Z2luU3RvcmUsIFNpbXBsZUdpdFRhc2tQbHVnaW5Db250ZXh0IH0gZnJvbSAnLi4vcGx1Z2lucyc7XG5pbXBvcnQgeyB0eXBlIEVtcHR5VGFzaywgaXNCdWZmZXJUYXNrLCBpc0VtcHR5VGFzayB9IGZyb20gJy4uL3Rhc2tzL3Rhc2snO1xuaW1wb3J0IHR5cGUge1xuICAgR2l0RXhlY3V0b3JSZXN1bHQsXG4gICBNYXliZSxcbiAgIG91dHB1dEhhbmRsZXIsXG4gICBSdW5uYWJsZVRhc2ssXG4gICBTaW1wbGVHaXRFeGVjdXRvcixcbiAgIFNpbXBsZUdpdFRhc2ssXG59IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGNhbGxUYXNrUGFyc2VyLCBmaXJzdCwgR2l0T3V0cHV0U3RyZWFtcywgb2JqZWN0VG9TdHJpbmcgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgdHlwZSB7IFNjaGVkdWxlciB9IGZyb20gJy4vc2NoZWR1bGVyJztcbmltcG9ydCB7IFRhc2tzUGVuZGluZ1F1ZXVlIH0gZnJvbSAnLi90YXNrcy1wZW5kaW5nLXF1ZXVlJztcblxuZXhwb3J0IGNsYXNzIEdpdEV4ZWN1dG9yQ2hhaW4gaW1wbGVtZW50cyBTaW1wbGVHaXRFeGVjdXRvciB7XG4gICBwcml2YXRlIF9jaGFpbjogUHJvbWlzZTxhbnk+ID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICBwcml2YXRlIF9xdWV1ZSA9IG5ldyBUYXNrc1BlbmRpbmdRdWV1ZSgpO1xuICAgcHJpdmF0ZSBfY3dkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgIHB1YmxpYyBnZXQgY3dkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2N3ZCB8fCB0aGlzLl9leGVjdXRvci5jd2Q7XG4gICB9XG5cbiAgIHB1YmxpYyBzZXQgY3dkKGN3ZDogc3RyaW5nKSB7XG4gICAgICB0aGlzLl9jd2QgPSBjd2Q7XG4gICB9XG5cbiAgIHB1YmxpYyBnZXQgZW52KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2V4ZWN1dG9yLmVudjtcbiAgIH1cblxuICAgcHVibGljIGdldCBvdXRwdXRIYW5kbGVyKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2V4ZWN1dG9yLm91dHB1dEhhbmRsZXI7XG4gICB9XG5cbiAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfZXhlY3V0b3I6IFNpbXBsZUdpdEV4ZWN1dG9yLFxuICAgICAgcHJpdmF0ZSBfc2NoZWR1bGVyOiBTY2hlZHVsZXIsXG4gICAgICBwcml2YXRlIF9wbHVnaW5zOiBQbHVnaW5TdG9yZVxuICAgKSB7fVxuXG4gICBwdWJsaWMgY2hhaW4oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgIH1cblxuICAgcHVibGljIHB1c2g8Uj4odGFzazogU2ltcGxlR2l0VGFzazxSPik6IFByb21pc2U8Uj4ge1xuICAgICAgdGhpcy5fcXVldWUucHVzaCh0YXNrKTtcblxuICAgICAgcmV0dXJuICh0aGlzLl9jaGFpbiA9IHRoaXMuX2NoYWluLnRoZW4oKCkgPT4gdGhpcy5hdHRlbXB0VGFzayh0YXNrKSkpO1xuICAgfVxuXG4gICBwcml2YXRlIGFzeW5jIGF0dGVtcHRUYXNrPFI+KHRhc2s6IFNpbXBsZUdpdFRhc2s8Uj4pOiBQcm9taXNlPHZvaWQgfCBSPiB7XG4gICAgICBjb25zdCBvblNjaGVkdWxlQ29tcGxldGUgPSBhd2FpdCB0aGlzLl9zY2hlZHVsZXIubmV4dCgpO1xuICAgICAgY29uc3Qgb25RdWV1ZUNvbXBsZXRlID0gKCkgPT4gdGhpcy5fcXVldWUuY29tcGxldGUodGFzayk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgICBjb25zdCB7IGxvZ2dlciB9ID0gdGhpcy5fcXVldWUuYXR0ZW1wdCh0YXNrKTtcbiAgICAgICAgIHJldHVybiAoYXdhaXQgKGlzRW1wdHlUYXNrKHRhc2spXG4gICAgICAgICAgICA/IHRoaXMuYXR0ZW1wdEVtcHR5VGFzayh0YXNrLCBsb2dnZXIpXG4gICAgICAgICAgICA6IHRoaXMuYXR0ZW1wdFJlbW90ZVRhc2sodGFzaywgbG9nZ2VyKSkpIGFzIFI7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICB0aHJvdyB0aGlzLm9uRmF0YWxFeGNlcHRpb24odGFzaywgZSBhcyBFcnJvcik7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgb25RdWV1ZUNvbXBsZXRlKCk7XG4gICAgICAgICBvblNjaGVkdWxlQ29tcGxldGUoKTtcbiAgICAgIH1cbiAgIH1cblxuICAgcHJpdmF0ZSBvbkZhdGFsRXhjZXB0aW9uPFI+KHRhc2s6IFNpbXBsZUdpdFRhc2s8Uj4sIGU6IEVycm9yKSB7XG4gICAgICBjb25zdCBnaXRFcnJvciA9XG4gICAgICAgICBlIGluc3RhbmNlb2YgR2l0RXJyb3IgPyBPYmplY3QuYXNzaWduKGUsIHsgdGFzayB9KSA6IG5ldyBHaXRFcnJvcih0YXNrLCBlICYmIFN0cmluZyhlKSk7XG5cbiAgICAgIHRoaXMuX2NoYWluID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICB0aGlzLl9xdWV1ZS5mYXRhbChnaXRFcnJvcik7XG5cbiAgICAgIHJldHVybiBnaXRFcnJvcjtcbiAgIH1cblxuICAgcHJpdmF0ZSBhc3luYyBhdHRlbXB0UmVtb3RlVGFzazxSPih0YXNrOiBSdW5uYWJsZVRhc2s8Uj4sIGxvZ2dlcjogT3V0cHV0TG9nZ2VyKSB7XG4gICAgICBjb25zdCBiaW5hcnkgPSB0aGlzLl9wbHVnaW5zLmV4ZWMoJ3NwYXduLmJpbmFyeScsICcnLCB0aGlzLnRhc2tDb250ZXh0KHRhc2ssIHRhc2suY29tbWFuZHMpKTtcbiAgICAgIGNvbnN0IGFyZ3MgPSB0aGlzLl9wbHVnaW5zLmV4ZWMoXG4gICAgICAgICAnc3Bhd24uYXJncycsXG4gICAgICAgICBbLi4udGFzay5jb21tYW5kc10sXG4gICAgICAgICB0aGlzLnRhc2tDb250ZXh0KHRhc2ssIHRhc2suY29tbWFuZHMpXG4gICAgICApO1xuXG4gICAgICBjb25zdCByYXcgPSBhd2FpdCB0aGlzLmdpdFJlc3BvbnNlKFxuICAgICAgICAgdGFzayxcbiAgICAgICAgIGJpbmFyeSxcbiAgICAgICAgIGFyZ3MsXG4gICAgICAgICB0aGlzLm91dHB1dEhhbmRsZXIsXG4gICAgICAgICBsb2dnZXIuc3RlcCgnU1BBV04nKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IG91dHB1dFN0cmVhbXMgPSBhd2FpdCB0aGlzLmhhbmRsZVRhc2tEYXRhKHRhc2ssIGFyZ3MsIHJhdywgbG9nZ2VyLnN0ZXAoJ0hBTkRMRScpKTtcblxuICAgICAgbG9nZ2VyKGBwYXNzaW5nIHJlc3BvbnNlIHRvIHRhc2sncyBwYXJzZXIgYXMgYSAlc2AsIHRhc2suZm9ybWF0KTtcblxuICAgICAgaWYgKGlzQnVmZmVyVGFzayh0YXNrKSkge1xuICAgICAgICAgcmV0dXJuIGNhbGxUYXNrUGFyc2VyKHRhc2sucGFyc2VyLCBvdXRwdXRTdHJlYW1zKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNhbGxUYXNrUGFyc2VyKHRhc2sucGFyc2VyLCBvdXRwdXRTdHJlYW1zLmFzU3RyaW5ncygpKTtcbiAgIH1cblxuICAgcHJpdmF0ZSBhc3luYyBhdHRlbXB0RW1wdHlUYXNrKHRhc2s6IEVtcHR5VGFzaywgbG9nZ2VyOiBPdXRwdXRMb2dnZXIpIHtcbiAgICAgIGxvZ2dlcihgZW1wdHkgdGFzayBieXBhc3NpbmcgY2hpbGQgcHJvY2VzcyB0byBjYWxsIHRvIHRhc2sncyBwYXJzZXJgKTtcbiAgICAgIHJldHVybiB0YXNrLnBhcnNlcih0aGlzKTtcbiAgIH1cblxuICAgcHJpdmF0ZSBoYW5kbGVUYXNrRGF0YTxSPihcbiAgICAgIHRhc2s6IFNpbXBsZUdpdFRhc2s8Uj4sXG4gICAgICBhcmdzOiBzdHJpbmdbXSxcbiAgICAgIHJlc3VsdDogR2l0RXhlY3V0b3JSZXN1bHQsXG4gICAgICBsb2dnZXI6IE91dHB1dExvZ2dlclxuICAgKTogUHJvbWlzZTxHaXRPdXRwdXRTdHJlYW1zPiB7XG4gICAgICBjb25zdCB7IGV4aXRDb2RlLCByZWplY3Rpb24sIHN0ZE91dCwgc3RkRXJyIH0gPSByZXN1bHQ7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZG9uZSwgZmFpbCkgPT4ge1xuICAgICAgICAgbG9nZ2VyKGBQcmVwYXJpbmcgdG8gaGFuZGxlIHByb2Nlc3MgcmVzcG9uc2UgZXhpdENvZGU9JWQgc3RkT3V0PWAsIGV4aXRDb2RlKTtcblxuICAgICAgICAgY29uc3QgeyBlcnJvciB9ID0gdGhpcy5fcGx1Z2lucy5leGVjKFxuICAgICAgICAgICAgJ3Rhc2suZXJyb3InLFxuICAgICAgICAgICAgeyBlcnJvcjogcmVqZWN0aW9uIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAuLi50aGlzLnRhc2tDb250ZXh0KHRhc2ssIGFyZ3MpLFxuICAgICAgICAgICAgICAgLi4ucmVzdWx0LFxuICAgICAgICAgICAgfVxuICAgICAgICAgKTtcblxuICAgICAgICAgaWYgKGVycm9yICYmIHRhc2sub25FcnJvcikge1xuICAgICAgICAgICAgbG9nZ2VyLmluZm8oYGV4aXRDb2RlPSVzIGhhbmRsaW5nIHdpdGggY3VzdG9tIGVycm9yIGhhbmRsZXJgKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRhc2sub25FcnJvcihcbiAgICAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgICAgKG5ld1N0ZE91dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgbG9nZ2VyLmluZm8oYGN1c3RvbSBlcnJvciBoYW5kbGVyIHRyZWF0ZWQgYXMgc3VjY2Vzc2ApO1xuICAgICAgICAgICAgICAgICAgbG9nZ2VyKGBjdXN0b20gZXJyb3IgcmV0dXJuZWQgYSAlc2AsIG9iamVjdFRvU3RyaW5nKG5ld1N0ZE91dCkpO1xuXG4gICAgICAgICAgICAgICAgICBkb25lKFxuICAgICAgICAgICAgICAgICAgICAgbmV3IEdpdE91dHB1dFN0cmVhbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KG5ld1N0ZE91dCkgPyBCdWZmZXIuY29uY2F0KG5ld1N0ZE91dCkgOiBuZXdTdGRPdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBCdWZmZXIuY29uY2F0KHN0ZEVycilcbiAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgZmFpbFxuICAgICAgICAgICAgKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICBsb2dnZXIuaW5mbyhcbiAgICAgICAgICAgICAgIGBoYW5kbGluZyBhcyBlcnJvcjogZXhpdENvZGU9JXMgc3RkRXJyPSVzIHJlamVjdGlvbj0lb2AsXG4gICAgICAgICAgICAgICBleGl0Q29kZSxcbiAgICAgICAgICAgICAgIHN0ZEVyci5sZW5ndGgsXG4gICAgICAgICAgICAgICByZWplY3Rpb25cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gZmFpbChlcnJvcik7XG4gICAgICAgICB9XG5cbiAgICAgICAgIGxvZ2dlci5pbmZvKGByZXRyaWV2aW5nIHRhc2sgb3V0cHV0IGNvbXBsZXRlYCk7XG4gICAgICAgICBkb25lKG5ldyBHaXRPdXRwdXRTdHJlYW1zKEJ1ZmZlci5jb25jYXQoc3RkT3V0KSwgQnVmZmVyLmNvbmNhdChzdGRFcnIpKSk7XG4gICAgICB9KTtcbiAgIH1cblxuICAgcHJpdmF0ZSBhc3luYyBnaXRSZXNwb25zZTxSPihcbiAgICAgIHRhc2s6IFNpbXBsZUdpdFRhc2s8Uj4sXG4gICAgICBjb21tYW5kOiBzdHJpbmcsXG4gICAgICBhcmdzOiBzdHJpbmdbXSxcbiAgICAgIG91dHB1dEhhbmRsZXI6IE1heWJlPG91dHB1dEhhbmRsZXI+LFxuICAgICAgbG9nZ2VyOiBPdXRwdXRMb2dnZXJcbiAgICk6IFByb21pc2U8R2l0RXhlY3V0b3JSZXN1bHQ+IHtcbiAgICAgIGNvbnN0IG91dHB1dExvZ2dlciA9IGxvZ2dlci5zaWJsaW5nKCdvdXRwdXQnKTtcbiAgICAgIGNvbnN0IHNwYXduT3B0aW9uczogU3Bhd25PcHRpb25zID0gdGhpcy5fcGx1Z2lucy5leGVjKFxuICAgICAgICAgJ3NwYXduLm9wdGlvbnMnLFxuICAgICAgICAge1xuICAgICAgICAgICAgY3dkOiB0aGlzLmN3ZCxcbiAgICAgICAgICAgIGVudjogdGhpcy5lbnYsXG4gICAgICAgICAgICB3aW5kb3dzSGlkZTogdHJ1ZSxcbiAgICAgICAgIH0sXG4gICAgICAgICB0aGlzLnRhc2tDb250ZXh0KHRhc2ssIHRhc2suY29tbWFuZHMpXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKGRvbmUpID0+IHtcbiAgICAgICAgIGNvbnN0IHN0ZE91dDogQnVmZmVyW10gPSBbXTtcbiAgICAgICAgIGNvbnN0IHN0ZEVycjogQnVmZmVyW10gPSBbXTtcblxuICAgICAgICAgbG9nZ2VyLmluZm8oYCVzICVvYCwgY29tbWFuZCwgYXJncyk7XG4gICAgICAgICBsb2dnZXIoJyVPJywgc3Bhd25PcHRpb25zKTtcblxuICAgICAgICAgbGV0IHJlamVjdGlvbiA9IHRoaXMuX2JlZm9yZVNwYXduKHRhc2ssIGFyZ3MpO1xuICAgICAgICAgaWYgKHJlamVjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGRvbmUoe1xuICAgICAgICAgICAgICAgc3RkT3V0LFxuICAgICAgICAgICAgICAgc3RkRXJyLFxuICAgICAgICAgICAgICAgZXhpdENvZGU6IDk5MDEsXG4gICAgICAgICAgICAgICByZWplY3Rpb24sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgIH1cblxuICAgICAgICAgdGhpcy5fcGx1Z2lucy5leGVjKCdzcGF3bi5iZWZvcmUnLCB1bmRlZmluZWQsIHtcbiAgICAgICAgICAgIC4uLnRoaXMudGFza0NvbnRleHQodGFzaywgYXJncyksXG4gICAgICAgICAgICBraWxsKHJlYXNvbikge1xuICAgICAgICAgICAgICAgcmVqZWN0aW9uID0gcmVhc29uIHx8IHJlamVjdGlvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICB9KTtcblxuICAgICAgICAgY29uc3Qgc3Bhd25lZCA9IHNwYXduKGNvbW1hbmQsIGFyZ3MsIHNwYXduT3B0aW9ucyk7XG5cbiAgICAgICAgIHNwYXduZWQuc3Rkb3V0IS5vbihcbiAgICAgICAgICAgICdkYXRhJyxcbiAgICAgICAgICAgIG9uRGF0YVJlY2VpdmVkKHN0ZE91dCwgJ3N0ZE91dCcsIGxvZ2dlciwgb3V0cHV0TG9nZ2VyLnN0ZXAoJ3N0ZE91dCcpKVxuICAgICAgICAgKTtcbiAgICAgICAgIHNwYXduZWQuc3RkZXJyIS5vbihcbiAgICAgICAgICAgICdkYXRhJyxcbiAgICAgICAgICAgIG9uRGF0YVJlY2VpdmVkKHN0ZEVyciwgJ3N0ZEVycicsIGxvZ2dlciwgb3V0cHV0TG9nZ2VyLnN0ZXAoJ3N0ZEVycicpKVxuICAgICAgICAgKTtcblxuICAgICAgICAgc3Bhd25lZC5vbignZXJyb3InLCBvbkVycm9yUmVjZWl2ZWQoc3RkRXJyLCBsb2dnZXIpKTtcblxuICAgICAgICAgaWYgKG91dHB1dEhhbmRsZXIpIHtcbiAgICAgICAgICAgIGxvZ2dlcihgUGFzc2luZyBjaGlsZCBwcm9jZXNzIHN0ZE91dC9zdGRFcnIgdG8gY3VzdG9tIG91dHB1dEhhbmRsZXJgKTtcbiAgICAgICAgICAgIG91dHB1dEhhbmRsZXIoY29tbWFuZCwgc3Bhd25lZC5zdGRvdXQhLCBzcGF3bmVkLnN0ZGVyciEsIFsuLi5hcmdzXSk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHRoaXMuX3BsdWdpbnMuZXhlYygnc3Bhd24uYWZ0ZXInLCB1bmRlZmluZWQsIHtcbiAgICAgICAgICAgIC4uLnRoaXMudGFza0NvbnRleHQodGFzaywgYXJncyksXG4gICAgICAgICAgICBzcGF3bmVkLFxuICAgICAgICAgICAgY2xvc2UoZXhpdENvZGU6IG51bWJlciwgcmVhc29uPzogRXJyb3IpIHtcbiAgICAgICAgICAgICAgIGRvbmUoe1xuICAgICAgICAgICAgICAgICAgc3RkT3V0LFxuICAgICAgICAgICAgICAgICAgc3RkRXJyLFxuICAgICAgICAgICAgICAgICAgZXhpdENvZGUsXG4gICAgICAgICAgICAgICAgICByZWplY3Rpb246IHJlamVjdGlvbiB8fCByZWFzb24sXG4gICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBraWxsKHJlYXNvbjogRXJyb3IpIHtcbiAgICAgICAgICAgICAgIGlmIChzcGF3bmVkLmtpbGxlZCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICByZWplY3Rpb24gPSByZWFzb247XG4gICAgICAgICAgICAgICBzcGF3bmVkLmtpbGwoJ1NJR0lOVCcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICB9XG5cbiAgIHByaXZhdGUgX2JlZm9yZVNwYXduPFI+KHRhc2s6IFNpbXBsZUdpdFRhc2s8Uj4sIGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgICBsZXQgcmVqZWN0aW9uOiBNYXliZTxFcnJvcj47XG4gICAgICB0aGlzLl9wbHVnaW5zLmV4ZWMoJ3NwYXduLmJlZm9yZScsIHVuZGVmaW5lZCwge1xuICAgICAgICAgLi4udGhpcy50YXNrQ29udGV4dCh0YXNrLCBhcmdzKSxcbiAgICAgICAgIGtpbGwocmVhc29uKSB7XG4gICAgICAgICAgICByZWplY3Rpb24gPSByZWFzb24gfHwgcmVqZWN0aW9uO1xuICAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVqZWN0aW9uO1xuICAgfVxuXG4gICBwcml2YXRlIHRhc2tDb250ZXh0PFI+KHRhc2s6IFNpbXBsZUdpdFRhc2s8Uj4sIGNvbW1hbmRzOiBzdHJpbmdbXSk6IFNpbXBsZUdpdFRhc2tQbHVnaW5Db250ZXh0IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICBtZXRob2Q6IFN0cmluZyhmaXJzdCh0YXNrLmNvbW1hbmRzKSB8fCAnJyksXG4gICAgICAgICBjb21tYW5kcyxcbiAgICAgICAgIGVudjogeyAuLi50aGlzLmVudiB9LFxuICAgICAgICAgaW5wdXQ6IGlzRW1wdHlUYXNrKHRhc2spID8gdW5kZWZpbmVkIDogdGFzay5pbnB1dCxcbiAgICAgIH07XG4gICB9XG59XG5cbmZ1bmN0aW9uIG9uRXJyb3JSZWNlaXZlZCh0YXJnZXQ6IEJ1ZmZlcltdLCBsb2dnZXI6IE91dHB1dExvZ2dlcikge1xuICAgcmV0dXJuIChlcnI6IEVycm9yKSA9PiB7XG4gICAgICBsb2dnZXIoYFtFUlJPUl0gY2hpbGQgcHJvY2VzcyBleGNlcHRpb24gJW9gLCBlcnIpO1xuICAgICAgdGFyZ2V0LnB1c2goQnVmZmVyLmZyb20oU3RyaW5nKGVyci5zdGFjayksICdhc2NpaScpKTtcbiAgIH07XG59XG5cbmZ1bmN0aW9uIG9uRGF0YVJlY2VpdmVkKFxuICAgdGFyZ2V0OiBCdWZmZXJbXSxcbiAgIG5hbWU6IHN0cmluZyxcbiAgIGxvZ2dlcjogT3V0cHV0TG9nZ2VyLFxuICAgb3V0cHV0OiBPdXRwdXRMb2dnZXJcbikge1xuICAgcmV0dXJuIChidWZmZXI6IEJ1ZmZlcikgPT4ge1xuICAgICAgbG9nZ2VyKGAlcyByZWNlaXZlZCAlTCBieXRlc2AsIG5hbWUsIGJ1ZmZlcik7XG4gICAgICBvdXRwdXQoYCVCYCwgYnVmZmVyKTtcbiAgICAgIHRhcmdldC5wdXNoKGJ1ZmZlcik7XG4gICB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgUGx1Z2luU3RvcmUgfSBmcm9tICcuLi9wbHVnaW5zJztcbmltcG9ydCB0eXBlIHsgR2l0RXhlY3V0b3JFbnYsIG91dHB1dEhhbmRsZXIsIFNpbXBsZUdpdEV4ZWN1dG9yLCBTaW1wbGVHaXRUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgR2l0RXhlY3V0b3JDaGFpbiB9IGZyb20gJy4vZ2l0LWV4ZWN1dG9yLWNoYWluJztcbmltcG9ydCB0eXBlIHsgU2NoZWR1bGVyIH0gZnJvbSAnLi9zY2hlZHVsZXInO1xuXG5leHBvcnQgY2xhc3MgR2l0RXhlY3V0b3IgaW1wbGVtZW50cyBTaW1wbGVHaXRFeGVjdXRvciB7XG4gICBwcml2YXRlIF9jaGFpbjogU2ltcGxlR2l0RXhlY3V0b3I7XG5cbiAgIHB1YmxpYyBlbnY6IEdpdEV4ZWN1dG9yRW52O1xuICAgcHVibGljIG91dHB1dEhhbmRsZXI/OiBvdXRwdXRIYW5kbGVyO1xuXG4gICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBjd2Q6IHN0cmluZyxcbiAgICAgIHByaXZhdGUgX3NjaGVkdWxlcjogU2NoZWR1bGVyLFxuICAgICAgcHJpdmF0ZSBfcGx1Z2luczogUGx1Z2luU3RvcmVcbiAgICkge1xuICAgICAgdGhpcy5fY2hhaW4gPSB0aGlzLmNoYWluKCk7XG4gICB9XG5cbiAgIGNoYWluKCk6IFNpbXBsZUdpdEV4ZWN1dG9yIHtcbiAgICAgIHJldHVybiBuZXcgR2l0RXhlY3V0b3JDaGFpbih0aGlzLCB0aGlzLl9zY2hlZHVsZXIsIHRoaXMuX3BsdWdpbnMpO1xuICAgfVxuXG4gICBwdXNoPFI+KHRhc2s6IFNpbXBsZUdpdFRhc2s8Uj4pOiBQcm9taXNlPFI+IHtcbiAgICAgIHJldHVybiB0aGlzLl9jaGFpbi5wdXNoKHRhc2spO1xuICAgfVxufVxuIiwgImltcG9ydCB0eXBlIHsgR2l0RXJyb3IgfSBmcm9tICcuL2Vycm9ycy9naXQtZXJyb3InO1xuaW1wb3J0IHR5cGUgeyBHaXRSZXNwb25zZUVycm9yIH0gZnJvbSAnLi9lcnJvcnMvZ2l0LXJlc3BvbnNlLWVycm9yJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0VGFzaywgU2ltcGxlR2l0VGFza0NhbGxiYWNrIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBOT09QIH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0YXNrQ2FsbGJhY2s8Uj4oXG4gICB0YXNrOiBTaW1wbGVHaXRUYXNrPFI+LFxuICAgcmVzcG9uc2U6IFByb21pc2U8Uj4sXG4gICBjYWxsYmFjazogU2ltcGxlR2l0VGFza0NhbGxiYWNrPFI+ID0gTk9PUFxuKSB7XG4gICBjb25zdCBvblN1Y2Nlc3MgPSAoZGF0YTogUikgPT4ge1xuICAgICAgY2FsbGJhY2sobnVsbCwgZGF0YSk7XG4gICB9O1xuXG4gICBjb25zdCBvbkVycm9yID0gKGVycjogR2l0RXJyb3IgfCBHaXRSZXNwb25zZUVycm9yKSA9PiB7XG4gICAgICBpZiAoZXJyPy50YXNrID09PSB0YXNrKSB7XG4gICAgICAgICBjYWxsYmFjayhlcnIsIHVuZGVmaW5lZCBhcyBhbnkpO1xuICAgICAgfVxuICAgfTtcblxuICAgcmVzcG9uc2UudGhlbihvblN1Y2Nlc3MsIG9uRXJyb3IpO1xufVxuIiwgImltcG9ydCB0eXBlIHsgU2ltcGxlR2l0RXhlY3V0b3IgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBmb2xkZXJFeGlzdHMgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBhZGhvY0V4ZWNUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZVdvcmtpbmdEaXJlY3RvcnlUYXNrKGRpcmVjdG9yeTogc3RyaW5nLCByb290PzogU2ltcGxlR2l0RXhlY3V0b3IpIHtcbiAgIHJldHVybiBhZGhvY0V4ZWNUYXNrKChpbnN0YW5jZTogU2ltcGxlR2l0RXhlY3V0b3IpID0+IHtcbiAgICAgIGlmICghZm9sZGVyRXhpc3RzKGRpcmVjdG9yeSkpIHtcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihgR2l0LmN3ZDogY2Fubm90IGNoYW5nZSB0byBub24tZGlyZWN0b3J5IFwiJHtkaXJlY3Rvcnl9XCJgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICgocm9vdCB8fCBpbnN0YW5jZSkuY3dkID0gZGlyZWN0b3J5KTtcbiAgIH0pO1xufVxuIiwgImltcG9ydCB0eXBlIHsgU2ltcGxlR2l0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdEFwaSB9IGZyb20gJy4uL3NpbXBsZS1naXQtYXBpJztcbmltcG9ydCB7IGdldFRyYWlsaW5nT3B0aW9ucywgcmVtb3ZlLCB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZnVuY3Rpb24gY2hlY2tvdXRUYXNrKGFyZ3M6IHN0cmluZ1tdKSB7XG4gICBjb25zdCBjb21tYW5kcyA9IFsnY2hlY2tvdXQnLCAuLi5hcmdzXTtcbiAgIGlmIChjb21tYW5kc1sxXSA9PT0gJy1iJyAmJiBjb21tYW5kcy5pbmNsdWRlcygnLUInKSkge1xuICAgICAgY29tbWFuZHNbMV0gPSByZW1vdmUoY29tbWFuZHMsICctQicpO1xuICAgfVxuXG4gICByZXR1cm4gc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhjb21tYW5kcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpOiBQaWNrPFNpbXBsZUdpdCwgJ2NoZWNrb3V0JyB8ICdjaGVja291dEJyYW5jaCcgfCAnY2hlY2tvdXRMb2NhbEJyYW5jaCc+IHtcbiAgIHJldHVybiB7XG4gICAgICBjaGVja291dCh0aGlzOiBTaW1wbGVHaXRBcGkpIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgY2hlY2tvdXRUYXNrKGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMsIDEpKSxcbiAgICAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICAgICApO1xuICAgICAgfSxcblxuICAgICAgY2hlY2tvdXRCcmFuY2godGhpczogU2ltcGxlR2l0QXBpLCBicmFuY2hOYW1lLCBzdGFydFBvaW50KSB7XG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgICAgIGNoZWNrb3V0VGFzayhbJy1iJywgYnJhbmNoTmFtZSwgc3RhcnRQb2ludCwgLi4uZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cyldKSxcbiAgICAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICAgICApO1xuICAgICAgfSxcblxuICAgICAgY2hlY2tvdXRMb2NhbEJyYW5jaCh0aGlzOiBTaW1wbGVHaXRBcGksIGJyYW5jaE5hbWUpIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgY2hlY2tvdXRUYXNrKFsnLWInLCBicmFuY2hOYW1lLCAuLi5nZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKV0pLFxuICAgICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICAgICAgICk7XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgeyBwYXRoc3BlYyB9IGZyb20gJ0BzaW1wbGUtZ2l0L2FyZ3MtcGF0aHNwZWMnO1xuXG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRBcGkgfSBmcm9tICcuLi9zaW1wbGUtZ2l0LWFwaSc7XG5pbXBvcnQgdHlwZSB7IE9wdGlvbkZsYWdzLCBPcHRpb25zLCBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHtcbiAgIGFwcGVuZCxcbiAgIGZpbHRlclN0cmluZyxcbiAgIGZpbHRlclR5cGUsXG4gICBnZXRUcmFpbGluZ09wdGlvbnMsXG4gICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQsXG59IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb25FcnJvclRhc2ssIHR5cGUgRW1wdHlUYXNrLCBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZXhwb3J0IHR5cGUgQ2xvbmVPcHRpb25zID0gT3B0aW9ucyAmXG4gICBPcHRpb25GbGFnczxcbiAgICAgIHwgJy0tYmFyZSdcbiAgICAgIHwgJy0tZGlzc29jaWF0ZSdcbiAgICAgIHwgJy0tbWlycm9yJ1xuICAgICAgfCAnLS1uby1jaGVja291dCdcbiAgICAgIHwgJy0tbm8tcmVtb3RlLXN1Ym1vZHVsZXMnXG4gICAgICB8ICctLW5vLXNoYWxsb3ctc3VibW9kdWxlcydcbiAgICAgIHwgJy0tbm8tc2luZ2xlLWJyYW5jaCdcbiAgICAgIHwgJy0tbm8tdGFncydcbiAgICAgIHwgJy0tcmVtb3RlLXN1Ym1vZHVsZXMnXG4gICAgICB8ICctLXNpbmdsZS1icmFuY2gnXG4gICAgICB8ICctLXNoYWxsb3ctc3VibW9kdWxlcydcbiAgICAgIHwgJy0tdmVyYm9zZSdcbiAgID4gJlxuICAgT3B0aW9uRmxhZ3M8Jy0tZGVwdGgnIHwgJy1qJyB8ICctLWpvYnMnLCBudW1iZXI+ICZcbiAgIE9wdGlvbkZsYWdzPFxuICAgICAgfCAnLS1icmFuY2gnXG4gICAgICB8ICctLW9yaWdpbidcbiAgICAgIHwgJy0tcmVjdXJzZS1zdWJtb2R1bGVzJ1xuICAgICAgfCAnLS1zZXBhcmF0ZS1naXQtZGlyJ1xuICAgICAgfCAnLS1zaGFsbG93LWV4Y2x1ZGUnXG4gICAgICB8ICctLXNoYWxsb3ctc2luY2UnXG4gICAgICB8ICctLXRlbXBsYXRlJyxcbiAgICAgIHN0cmluZ1xuICAgPjtcblxudHlwZSBDbG9uZVRhc2tCdWlsZGVyID0gKFxuICAgcmVwbzogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgZGlyZWN0b3J5OiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICBjdXN0b21BcmdzOiBzdHJpbmdbXVxuKSA9PiBTdHJpbmdUYXNrPHN0cmluZz4gfCBFbXB0eVRhc2s7XG5cbmV4cG9ydCBjb25zdCBjbG9uZVRhc2s6IENsb25lVGFza0J1aWxkZXIgPSAocmVwbywgZGlyZWN0b3J5LCBjdXN0b21BcmdzKSA9PiB7XG4gICBjb25zdCBjb21tYW5kcyA9IFsnY2xvbmUnLCAuLi5jdXN0b21BcmdzXTtcblxuICAgZmlsdGVyU3RyaW5nKHJlcG8pICYmIGNvbW1hbmRzLnB1c2gocGF0aHNwZWMocmVwbykpO1xuICAgZmlsdGVyU3RyaW5nKGRpcmVjdG9yeSkgJiYgY29tbWFuZHMucHVzaChwYXRoc3BlYyhkaXJlY3RvcnkpKTtcblxuICAgcmV0dXJuIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soY29tbWFuZHMpO1xufTtcblxuZXhwb3J0IGNvbnN0IGNsb25lTWlycm9yVGFzazogQ2xvbmVUYXNrQnVpbGRlciA9IChyZXBvLCBkaXJlY3RvcnksIGN1c3RvbUFyZ3MpID0+IHtcbiAgIGFwcGVuZChjdXN0b21BcmdzLCAnLS1taXJyb3InKTtcblxuICAgcmV0dXJuIGNsb25lVGFzayhyZXBvLCBkaXJlY3RvcnksIGN1c3RvbUFyZ3MpO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlQ2xvbmVUYXNrKFxuICAgYXBpOiAnY2xvbmUnIHwgJ21pcnJvcicsXG4gICB0YXNrOiBDbG9uZVRhc2tCdWlsZGVyLFxuICAgcmVwb1BhdGg6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgIC4uLmFyZ3M6IHVua25vd25bXVxuKSB7XG4gICBpZiAoIWZpbHRlclN0cmluZyhyZXBvUGF0aCkpIHtcbiAgICAgIHJldHVybiBjb25maWd1cmF0aW9uRXJyb3JUYXNrKGBnaXQuJHthcGl9KCkgcmVxdWlyZXMgYSBzdHJpbmcgJ3JlcG9QYXRoJ2ApO1xuICAgfVxuXG4gICByZXR1cm4gdGFzayhyZXBvUGF0aCwgZmlsdGVyVHlwZShhcmdzWzBdLCBmaWx0ZXJTdHJpbmcpLCBnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpOiBQaWNrPFNpbXBsZUdpdCwgJ2Nsb25lJyB8ICdtaXJyb3InPiB7XG4gICByZXR1cm4ge1xuICAgICAgY2xvbmUodGhpczogU2ltcGxlR2l0QXBpLCByZXBvOiBzdHJpbmcgfCB1bmtub3duLCAuLi5yZXN0OiB1bmtub3duW10pIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgY3JlYXRlQ2xvbmVUYXNrKCdjbG9uZScsIGNsb25lVGFzaywgZmlsdGVyVHlwZShyZXBvLCBmaWx0ZXJTdHJpbmcpLCAuLi5yZXN0KSxcbiAgICAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIG1pcnJvcih0aGlzOiBTaW1wbGVHaXRBcGksIHJlcG86IHN0cmluZyB8IHVua25vd24sIC4uLnJlc3Q6IHVua25vd25bXSkge1xuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICAgICBjcmVhdGVDbG9uZVRhc2soJ21pcnJvcicsIGNsb25lTWlycm9yVGFzaywgZmlsdGVyVHlwZShyZXBvLCBmaWx0ZXJTdHJpbmcpLCAuLi5yZXN0KSxcbiAgICAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICAgICApO1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBDb21taXRSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IExpbmVQYXJzZXIsIHBhcnNlU3RyaW5nUmVzcG9uc2UgfSBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IHBhcnNlcnM6IExpbmVQYXJzZXI8Q29tbWl0UmVzdWx0PltdID0gW1xuICAgbmV3IExpbmVQYXJzZXIoL15cXFsoW15cXHNdKykoIFxcKFteKV0rXFwpKT8gKFteXFxdXSspLywgKHJlc3VsdCwgW2JyYW5jaCwgcm9vdCwgY29tbWl0XSkgPT4ge1xuICAgICAgcmVzdWx0LmJyYW5jaCA9IGJyYW5jaDtcbiAgICAgIHJlc3VsdC5jb21taXQgPSBjb21taXQ7XG4gICAgICByZXN1bHQucm9vdCA9ICEhcm9vdDtcbiAgIH0pLFxuICAgbmV3IExpbmVQYXJzZXIoL1xccypBdXRob3I6XFxzKC4rKS9pLCAocmVzdWx0LCBbYXV0aG9yXSkgPT4ge1xuICAgICAgY29uc3QgcGFydHMgPSBhdXRob3Iuc3BsaXQoJzwnKTtcbiAgICAgIGNvbnN0IGVtYWlsID0gcGFydHMucG9wKCk7XG5cbiAgICAgIGlmICghZW1haWwgfHwgIWVtYWlsLmluY2x1ZGVzKCdAJykpIHtcbiAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVzdWx0LmF1dGhvciA9IHtcbiAgICAgICAgIGVtYWlsOiBlbWFpbC5zdWJzdHIoMCwgZW1haWwubGVuZ3RoIC0gMSksXG4gICAgICAgICBuYW1lOiBwYXJ0cy5qb2luKCc8JykudHJpbSgpLFxuICAgICAgfTtcbiAgIH0pLFxuICAgbmV3IExpbmVQYXJzZXIoXG4gICAgICAvKFxcZCspW14sXSooPzosXFxzKihcXGQrKVteLF0qKSg/OixcXHMqKFxcZCspKS9nLFxuICAgICAgKHJlc3VsdCwgW2NoYW5nZXMsIGluc2VydGlvbnMsIGRlbGV0aW9uc10pID0+IHtcbiAgICAgICAgIHJlc3VsdC5zdW1tYXJ5LmNoYW5nZXMgPSBwYXJzZUludChjaGFuZ2VzLCAxMCkgfHwgMDtcbiAgICAgICAgIHJlc3VsdC5zdW1tYXJ5Lmluc2VydGlvbnMgPSBwYXJzZUludChpbnNlcnRpb25zLCAxMCkgfHwgMDtcbiAgICAgICAgIHJlc3VsdC5zdW1tYXJ5LmRlbGV0aW9ucyA9IHBhcnNlSW50KGRlbGV0aW9ucywgMTApIHx8IDA7XG4gICAgICB9XG4gICApLFxuICAgbmV3IExpbmVQYXJzZXIoXG4gICAgICAvXihcXGQrKVteLF0qKD86LFxccyooXFxkKylbXihdK1xcKChbKy1dKSk/LyxcbiAgICAgIChyZXN1bHQsIFtjaGFuZ2VzLCBsaW5lcywgZGlyZWN0aW9uXSkgPT4ge1xuICAgICAgICAgcmVzdWx0LnN1bW1hcnkuY2hhbmdlcyA9IHBhcnNlSW50KGNoYW5nZXMsIDEwKSB8fCAwO1xuICAgICAgICAgY29uc3QgY291bnQgPSBwYXJzZUludChsaW5lcywgMTApIHx8IDA7XG4gICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnLScpIHtcbiAgICAgICAgICAgIHJlc3VsdC5zdW1tYXJ5LmRlbGV0aW9ucyA9IGNvdW50O1xuICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICcrJykge1xuICAgICAgICAgICAgcmVzdWx0LnN1bW1hcnkuaW5zZXJ0aW9ucyA9IGNvdW50O1xuICAgICAgICAgfVxuICAgICAgfVxuICAgKSxcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUNvbW1pdFJlc3VsdChzdGRPdXQ6IHN0cmluZyk6IENvbW1pdFJlc3VsdCB7XG4gICBjb25zdCByZXN1bHQ6IENvbW1pdFJlc3VsdCA9IHtcbiAgICAgIGF1dGhvcjogbnVsbCxcbiAgICAgIGJyYW5jaDogJycsXG4gICAgICBjb21taXQ6ICcnLFxuICAgICAgcm9vdDogZmFsc2UsXG4gICAgICBzdW1tYXJ5OiB7XG4gICAgICAgICBjaGFuZ2VzOiAwLFxuICAgICAgICAgaW5zZXJ0aW9uczogMCxcbiAgICAgICAgIGRlbGV0aW9uczogMCxcbiAgICAgIH0sXG4gICB9O1xuICAgcmV0dXJuIHBhcnNlU3RyaW5nUmVzcG9uc2UocmVzdWx0LCBwYXJzZXJzLCBzdGRPdXQpO1xufVxuIiwgImltcG9ydCB0eXBlIHsgQ29tbWl0UmVzdWx0LCBTaW1wbGVHaXQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IHBhcnNlQ29tbWl0UmVzdWx0IH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZS1jb21taXQnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRBcGkgfSBmcm9tICcuLi9zaW1wbGUtZ2l0LWFwaSc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQge1xuICAgYXNBcnJheSxcbiAgIGFzU3RyaW5nQXJyYXksXG4gICBmaWx0ZXJBcnJheSxcbiAgIGZpbHRlclN0cmluZ09yU3RyaW5nQXJyYXksXG4gICBmaWx0ZXJUeXBlLFxuICAgZ2V0VHJhaWxpbmdPcHRpb25zLFxuICAgcHJlZml4ZWRBcnJheSxcbiAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudCxcbn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgY29uZmlndXJhdGlvbkVycm9yVGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21taXRUYXNrKFxuICAgbWVzc2FnZTogc3RyaW5nW10sXG4gICBmaWxlczogc3RyaW5nW10sXG4gICBjdXN0b21BcmdzOiBzdHJpbmdbXVxuKTogU3RyaW5nVGFzazxDb21taXRSZXN1bHQ+IHtcbiAgIGNvbnN0IGNvbW1hbmRzOiBzdHJpbmdbXSA9IFtcbiAgICAgICctYycsXG4gICAgICAnY29yZS5hYmJyZXY9NDAnLFxuICAgICAgJ2NvbW1pdCcsXG4gICAgICAuLi5wcmVmaXhlZEFycmF5KG1lc3NhZ2UsICctbScpLFxuICAgICAgLi4uZmlsZXMsXG4gICAgICAuLi5jdXN0b21BcmdzLFxuICAgXTtcblxuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgcGFyc2VyOiBwYXJzZUNvbW1pdFJlc3VsdCxcbiAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpOiBQaWNrPFNpbXBsZUdpdCwgJ2NvbW1pdCc+IHtcbiAgIHJldHVybiB7XG4gICAgICBjb21taXQodGhpczogU2ltcGxlR2l0QXBpLCBtZXNzYWdlOiBzdHJpbmcgfCBzdHJpbmdbXSwgLi4ucmVzdDogdW5rbm93bltdKSB7XG4gICAgICAgICBjb25zdCBuZXh0ID0gdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cyk7XG4gICAgICAgICBjb25zdCB0YXNrID1cbiAgICAgICAgICAgIHJlamVjdERlcHJlY2F0ZWRTaWduYXR1cmVzKG1lc3NhZ2UpIHx8XG4gICAgICAgICAgICBjb21taXRUYXNrKFxuICAgICAgICAgICAgICAgYXNBcnJheShtZXNzYWdlKSxcbiAgICAgICAgICAgICAgIGFzQXJyYXkoZmlsdGVyVHlwZShyZXN0WzBdLCBmaWx0ZXJTdHJpbmdPclN0cmluZ0FycmF5LCBbXSkpLFxuICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgLi4uYXNTdHJpbmdBcnJheShmaWx0ZXJUeXBlKHJlc3RbMV0sIGZpbHRlckFycmF5LCBbXSkpLFxuICAgICAgICAgICAgICAgICAgLi4uZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cywgMCwgdHJ1ZSksXG4gICAgICAgICAgICAgICBdXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayh0YXNrLCBuZXh0KTtcbiAgICAgIH0sXG4gICB9O1xuXG4gICBmdW5jdGlvbiByZWplY3REZXByZWNhdGVkU2lnbmF0dXJlcyhtZXNzYWdlPzogdW5rbm93bikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgICFmaWx0ZXJTdHJpbmdPclN0cmluZ0FycmF5KG1lc3NhZ2UpICYmXG4gICAgICAgICBjb25maWd1cmF0aW9uRXJyb3JUYXNrKFxuICAgICAgICAgICAgYGdpdC5jb21taXQ6IHJlcXVpcmVzIHRoZSBjb21taXQgbWVzc2FnZSB0byBiZSBzdXBwbGllZCBhcyBhIHN0cmluZy9zdHJpbmdbXWBcbiAgICAgICAgIClcbiAgICAgICk7XG4gICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0QXBpIH0gZnJvbSAnLi4vc2ltcGxlLWdpdC1hcGknO1xuaW1wb3J0IHsgYXNDYW1lbENhc2UsIGFzTnVtYmVyLCBMaW5lUGFyc2VyLCBwYXJzZVN0cmluZ1Jlc3BvbnNlIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvdW50T2JqZWN0c1Jlc3VsdCB7XG4gICBjb3VudDogbnVtYmVyO1xuICAgc2l6ZTogbnVtYmVyO1xuICAgaW5QYWNrOiBudW1iZXI7XG4gICBwYWNrczogbnVtYmVyO1xuICAgc2l6ZVBhY2s6IG51bWJlcjtcbiAgIHBydW5lUGFja2FibGU6IG51bWJlcjtcbiAgIGdhcmJhZ2U6IG51bWJlcjtcbiAgIHNpemVHYXJiYWdlOiBudW1iZXI7XG59XG5cbmZ1bmN0aW9uIGNvdW50T2JqZWN0c1Jlc3BvbnNlKCk6IENvdW50T2JqZWN0c1Jlc3VsdCB7XG4gICByZXR1cm4ge1xuICAgICAgY291bnQ6IDAsXG4gICAgICBnYXJiYWdlOiAwLFxuICAgICAgaW5QYWNrOiAwLFxuICAgICAgcGFja3M6IDAsXG4gICAgICBwcnVuZVBhY2thYmxlOiAwLFxuICAgICAgc2l6ZTogMCxcbiAgICAgIHNpemVHYXJiYWdlOiAwLFxuICAgICAgc2l6ZVBhY2s6IDAsXG4gICB9O1xufVxuXG5jb25zdCBwYXJzZXI6IExpbmVQYXJzZXI8Q291bnRPYmplY3RzUmVzdWx0PiA9IG5ldyBMaW5lUGFyc2VyKFxuICAgLyhbYS16LV0rKTogKFxcZCspJC8sXG4gICAocmVzdWx0LCBba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgIGNvbnN0IHByb3BlcnR5ID0gYXNDYW1lbENhc2Uoa2V5KTtcbiAgICAgIGlmIChPYmplY3QuaGFzT3duKHJlc3VsdCwgcHJvcGVydHkpKSB7XG4gICAgICAgICByZXN1bHRbcHJvcGVydHkgYXMga2V5b2YgdHlwZW9mIHJlc3VsdF0gPSBhc051bWJlcih2YWx1ZSk7XG4gICAgICB9XG4gICB9XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKTogUGljazxTaW1wbGVHaXQsICdjb3VudE9iamVjdHMnPiB7XG4gICByZXR1cm4ge1xuICAgICAgY291bnRPYmplY3RzKHRoaXM6IFNpbXBsZUdpdEFwaSkge1xuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soe1xuICAgICAgICAgICAgY29tbWFuZHM6IFsnY291bnQtb2JqZWN0cycsICctLXZlcmJvc2UnXSxcbiAgICAgICAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgICAgICAgIHBhcnNlcihzdGRPdXQ6IHN0cmluZykge1xuICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlU3RyaW5nUmVzcG9uc2UoY291bnRPYmplY3RzUmVzcG9uc2UoKSwgW3BhcnNlcl0sIHN0ZE91dCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgfSk7XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFJlc3BvbnNlLCBTaW1wbGVHaXQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0QXBpIH0gZnJvbSAnLi4vc2ltcGxlLWdpdC1hcGknO1xuaW1wb3J0IHsgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpOiBQaWNrPFNpbXBsZUdpdCwgJ2ZpcnN0Q29tbWl0Jz4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGZpcnN0Q29tbWl0KHRoaXM6IFNpbXBsZUdpdEFwaSk6IFJlc3BvbnNlPHN0cmluZz4ge1xuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICAgICBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKFsncmV2LWxpc3QnLCAnLS1tYXgtcGFyZW50cz0wJywgJ0hFQUQnXSwgdHJ1ZSksXG4gICAgICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgICAgKTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG4vKipcbiAqIFRhc2sgdXNlZCBieSBgZ2l0Lmhhc2hPYmplY3RgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNoT2JqZWN0VGFzayhmaWxlUGF0aDogc3RyaW5nLCB3cml0ZTogYm9vbGVhbik6IFN0cmluZ1Rhc2s8c3RyaW5nPiB7XG4gICBjb25zdCBjb21tYW5kcyA9IFsnaGFzaC1vYmplY3QnLCBmaWxlUGF0aF07XG4gICBpZiAod3JpdGUpIHtcbiAgICAgIGNvbW1hbmRzLnB1c2goJy13Jyk7XG4gICB9XG5cbiAgIHJldHVybiBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKGNvbW1hbmRzLCB0cnVlKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IEluaXRSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcblxuZXhwb3J0IGNsYXNzIEluaXRTdW1tYXJ5IGltcGxlbWVudHMgSW5pdFJlc3VsdCB7XG4gICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyByZWFkb25seSBiYXJlOiBib29sZWFuLFxuICAgICAgcHVibGljIHJlYWRvbmx5IHBhdGg6IHN0cmluZyxcbiAgICAgIHB1YmxpYyByZWFkb25seSBleGlzdGluZzogYm9vbGVhbixcbiAgICAgIHB1YmxpYyByZWFkb25seSBnaXREaXI6IHN0cmluZ1xuICAgKSB7fVxufVxuXG5jb25zdCBpbml0UmVzcG9uc2VSZWdleCA9IC9eSW5pdC4rIHJlcG9zaXRvcnkgaW4gKC4rKSQvO1xuY29uc3QgcmVJbml0UmVzcG9uc2VSZWdleCA9IC9eUmVpbi4rIGluICguKykkLztcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlSW5pdChiYXJlOiBib29sZWFuLCBwYXRoOiBzdHJpbmcsIHRleHQ6IHN0cmluZykge1xuICAgY29uc3QgcmVzcG9uc2UgPSBTdHJpbmcodGV4dCkudHJpbSgpO1xuICAgbGV0IHJlc3VsdDtcblxuICAgaWYgKChyZXN1bHQgPSBpbml0UmVzcG9uc2VSZWdleC5leGVjKHJlc3BvbnNlKSkpIHtcbiAgICAgIHJldHVybiBuZXcgSW5pdFN1bW1hcnkoYmFyZSwgcGF0aCwgZmFsc2UsIHJlc3VsdFsxXSk7XG4gICB9XG5cbiAgIGlmICgocmVzdWx0ID0gcmVJbml0UmVzcG9uc2VSZWdleC5leGVjKHJlc3BvbnNlKSkpIHtcbiAgICAgIHJldHVybiBuZXcgSW5pdFN1bW1hcnkoYmFyZSwgcGF0aCwgdHJ1ZSwgcmVzdWx0WzFdKTtcbiAgIH1cblxuICAgbGV0IGdpdERpciA9ICcnO1xuICAgY29uc3QgdG9rZW5zID0gcmVzcG9uc2Uuc3BsaXQoJyAnKTtcbiAgIHdoaWxlICh0b2tlbnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCB0b2tlbiA9IHRva2Vucy5zaGlmdCgpO1xuICAgICAgaWYgKHRva2VuID09PSAnaW4nKSB7XG4gICAgICAgICBnaXREaXIgPSB0b2tlbnMuam9pbignICcpO1xuICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICB9XG5cbiAgIHJldHVybiBuZXcgSW5pdFN1bW1hcnkoYmFyZSwgcGF0aCwgL15yZS9pLnRlc3QocmVzcG9uc2UpLCBnaXREaXIpO1xufVxuIiwgImltcG9ydCB0eXBlIHsgSW5pdFJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgcGFyc2VJbml0IH0gZnJvbSAnLi4vcmVzcG9uc2VzL0luaXRTdW1tYXJ5JztcbmltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcblxuY29uc3QgYmFyZUNvbW1hbmQgPSAnLS1iYXJlJztcblxuZnVuY3Rpb24gaGFzQmFyZUNvbW1hbmQoY29tbWFuZDogc3RyaW5nW10pIHtcbiAgIHJldHVybiBjb21tYW5kLmluY2x1ZGVzKGJhcmVDb21tYW5kKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRUYXNrKGJhcmUgPSBmYWxzZSwgcGF0aDogc3RyaW5nLCBjdXN0b21BcmdzOiBzdHJpbmdbXSk6IFN0cmluZ1Rhc2s8SW5pdFJlc3VsdD4ge1xuICAgY29uc3QgY29tbWFuZHMgPSBbJ2luaXQnLCAuLi5jdXN0b21BcmdzXTtcbiAgIGlmIChiYXJlICYmICFoYXNCYXJlQ29tbWFuZChjb21tYW5kcykpIHtcbiAgICAgIGNvbW1hbmRzLnNwbGljZSgxLCAwLCBiYXJlQ29tbWFuZCk7XG4gICB9XG5cbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kcyxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIHBhcnNlcih0ZXh0OiBzdHJpbmcpOiBJbml0UmVzdWx0IHtcbiAgICAgICAgIHJldHVybiBwYXJzZUluaXQoY29tbWFuZHMuaW5jbHVkZXMoJy0tYmFyZScpLCBwYXRoLCB0ZXh0KTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgU2ltcGxlR2l0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdEFwaSB9IGZyb20gJy4uL3NpbXBsZS1naXQtYXBpJztcbmltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7XG4gICBhc0NhbWVsQ2FzZSxcbiAgIGZpbHRlclN0cmluZ09yQnVmZmVyLFxuICAgZmlsdGVyVHlwZSxcbiAgIGZvckVhY2hMaW5lV2l0aENvbnRlbnQsXG4gICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQsXG59IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb25FcnJvclRhc2ssIHR5cGUgRW1wdHlUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZnVuY3Rpb24gaW50ZXJwcmV0VHJhaWxlcnNUYXNrKFxuICAgaW5wdXQ/OiBzdHJpbmcgfCBCdWZmZXJcbik6IFN0cmluZ1Rhc2s8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4gfCBFbXB0eVRhc2sge1xuICAgaWYgKGlucHV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBjb25maWd1cmF0aW9uRXJyb3JUYXNrKGBpbnRlcnByZXRUcmFpbGVycyBjYWxsZWQgd2l0aG91dCBpbnB1dCBjb250ZW50YCk7XG4gICB9XG5cbiAgIHJldHVybiB7XG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXIoc3RkT3V0KSB7XG4gICAgICAgICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgICAgICAgICAgZm9yRWFjaExpbmVXaXRoQ29udGVudChzdGRPdXQsIChsaW5lKSA9PiB7XG4gICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgIGFzQ2FtZWxDYXNlKGxpbmUuc3Vic3RyaW5nKDAsIGluZGV4KS50b0xvd2VyQ2FzZSgpKSxcbiAgICAgICAgICAgICAgICAgIGxpbmUuc3Vic3RyaW5nKGluZGV4ICsgMikudHJpbSgpLFxuICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIGNvbW1hbmRzOiBbJ2ludGVycHJldC10cmFpbGVycycsICctLXBhcnNlJ10sXG4gICAgICBpbnB1dCxcbiAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpOiBQaWNrPFNpbXBsZUdpdCwgJ2ludGVycHJldFRyYWlsZXJzJz4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGludGVycHJldFRyYWlsZXJzKHRoaXM6IFNpbXBsZUdpdEFwaSwgaW5wdXQpIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgaW50ZXJwcmV0VHJhaWxlcnNUYXNrKGZpbHRlclR5cGUoaW5wdXQsIGZpbHRlclN0cmluZ09yQnVmZmVyKSksXG4gICAgICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgICAgKTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImV4cG9ydCBlbnVtIExvZ0Zvcm1hdCB7XG4gICBOT05FID0gJycsXG4gICBTVEFUID0gJy0tc3RhdCcsXG4gICBOVU1fU1RBVCA9ICctLW51bXN0YXQnLFxuICAgTkFNRV9PTkxZID0gJy0tbmFtZS1vbmx5JyxcbiAgIE5BTUVfU1RBVFVTID0gJy0tbmFtZS1zdGF0dXMnLFxufVxuXG5jb25zdCBsb2dGb3JtYXRSZWdleCA9IC9eLS0oc3RhdHxudW1zdGF0fG5hbWUtb25seXxuYW1lLXN0YXR1cykoPXwkKS87XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2dGb3JtYXRGcm9tQ29tbWFuZChjdXN0b21BcmdzOiBzdHJpbmdbXSkge1xuICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXN0b21BcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBmb3JtYXQgPSBsb2dGb3JtYXRSZWdleC5leGVjKGN1c3RvbUFyZ3NbaV0pO1xuICAgICAgaWYgKGZvcm1hdCkge1xuICAgICAgICAgcmV0dXJuIGAtLSR7Zm9ybWF0WzFdfWAgYXMgTG9nRm9ybWF0O1xuICAgICAgfVxuICAgfVxuXG4gICByZXR1cm4gTG9nRm9ybWF0Lk5PTkU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xvZ0Zvcm1hdChjdXN0b21Bcmc6IHN0cmluZyB8IHVua25vd24pIHtcbiAgIHJldHVybiBsb2dGb3JtYXRSZWdleC50ZXN0KGN1c3RvbUFyZyBhcyBzdHJpbmcpO1xufVxuIiwgImltcG9ydCB0eXBlIHsgRGlmZlJlc3VsdCwgRGlmZlJlc3VsdEJpbmFyeUZpbGUsIERpZmZSZXN1bHRUZXh0RmlsZSB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuXG4vKioqXG4gKiBUaGUgRGlmZlN1bW1hcnkgaXMgcmV0dXJuZWQgYXMgYSByZXNwb25zZSB0byBnZXR0aW5nIGBnaXQoKS5zdGF0dXMoKWBcbiAqL1xuZXhwb3J0IGNsYXNzIERpZmZTdW1tYXJ5IGltcGxlbWVudHMgRGlmZlJlc3VsdCB7XG4gICBjaGFuZ2VkID0gMDtcbiAgIGRlbGV0aW9ucyA9IDA7XG4gICBpbnNlcnRpb25zID0gMDtcblxuICAgZmlsZXM6IEFycmF5PERpZmZSZXN1bHRUZXh0RmlsZSB8IERpZmZSZXN1bHRCaW5hcnlGaWxlPiA9IFtdO1xufVxuIiwgImltcG9ydCB0eXBlIHsgRGlmZlJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgTG9nRm9ybWF0IH0gZnJvbSAnLi4vYXJncy9sb2ctZm9ybWF0JztcbmltcG9ydCB7IERpZmZTdW1tYXJ5IH0gZnJvbSAnLi4vcmVzcG9uc2VzL0RpZmZTdW1tYXJ5JztcbmltcG9ydCB7IGlzRGlmZk5hbWVTdGF0dXMgfSBmcm9tICcuLi90YXNrcy9kaWZmLW5hbWUtc3RhdHVzJztcbmltcG9ydCB7IGFzTnVtYmVyLCBMaW5lUGFyc2VyLCBvclZvaWQsIHBhcnNlU3RyaW5nUmVzcG9uc2UgfSBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IHN0YXRQYXJzZXIgPSBbXG4gICBuZXcgTGluZVBhcnNlcjxEaWZmUmVzdWx0PihcbiAgICAgIC9eKC4rKVxccytcXHxcXHMrKFxcZCspKFxccytbK1xcLV0rKT8kLyxcbiAgICAgIChyZXN1bHQsIFtmaWxlLCBjaGFuZ2VzLCBhbHRlcmF0aW9ucyA9ICcnXSkgPT4ge1xuICAgICAgICAgcmVzdWx0LmZpbGVzLnB1c2goe1xuICAgICAgICAgICAgZmlsZTogZmlsZS50cmltKCksXG4gICAgICAgICAgICBjaGFuZ2VzOiBhc051bWJlcihjaGFuZ2VzKSxcbiAgICAgICAgICAgIGluc2VydGlvbnM6IGFsdGVyYXRpb25zLnJlcGxhY2UoL1teK10vZywgJycpLmxlbmd0aCxcbiAgICAgICAgICAgIGRlbGV0aW9uczogYWx0ZXJhdGlvbnMucmVwbGFjZSgvW14tXS9nLCAnJykubGVuZ3RoLFxuICAgICAgICAgICAgYmluYXJ5OiBmYWxzZSxcbiAgICAgICAgIH0pO1xuICAgICAgfVxuICAgKSxcbiAgIG5ldyBMaW5lUGFyc2VyPERpZmZSZXN1bHQ+KFxuICAgICAgL14oLispIFxcfFxccytCaW4gKFswLTkuXSspIC0+IChbMC05Ll0rKSAoW2Etel0rKS8sXG4gICAgICAocmVzdWx0LCBbZmlsZSwgYmVmb3JlLCBhZnRlcl0pID0+IHtcbiAgICAgICAgIHJlc3VsdC5maWxlcy5wdXNoKHtcbiAgICAgICAgICAgIGZpbGU6IGZpbGUudHJpbSgpLFxuICAgICAgICAgICAgYmVmb3JlOiBhc051bWJlcihiZWZvcmUpLFxuICAgICAgICAgICAgYWZ0ZXI6IGFzTnVtYmVyKGFmdGVyKSxcbiAgICAgICAgICAgIGJpbmFyeTogdHJ1ZSxcbiAgICAgICAgIH0pO1xuICAgICAgfVxuICAgKSxcbiAgIG5ldyBMaW5lUGFyc2VyPERpZmZSZXN1bHQ+KC9eKC4rKVxccytcXHxcXHMrQmluXFxzKiQvLCAocmVzdWx0LCBbZmlsZV0pID0+IHtcbiAgICAgIHJlc3VsdC5maWxlcy5wdXNoKHtcbiAgICAgICAgIGZpbGU6IGZpbGUudHJpbSgpLFxuICAgICAgICAgYmVmb3JlOiAwLFxuICAgICAgICAgYWZ0ZXI6IDAsXG4gICAgICAgICBiaW5hcnk6IHRydWUsXG4gICAgICB9KTtcbiAgIH0pLFxuICAgbmV3IExpbmVQYXJzZXI8RGlmZlJlc3VsdD4oXG4gICAgICAvKFxcZCspIGZpbGVzPyBjaGFuZ2VkXFxzKigoPzosIFxcZCsgW14sXSspezAsMn0pLyxcbiAgICAgIChyZXN1bHQsIFtjaGFuZ2VkLCBzdW1tYXJ5XSkgPT4ge1xuICAgICAgICAgY29uc3QgaW5zZXJ0ZWQgPSAvKFxcZCspIGkvLmV4ZWMoc3VtbWFyeSk7XG4gICAgICAgICBjb25zdCBkZWxldGVkID0gLyhcXGQrKSBkLy5leGVjKHN1bW1hcnkpO1xuXG4gICAgICAgICByZXN1bHQuY2hhbmdlZCA9IGFzTnVtYmVyKGNoYW5nZWQpO1xuICAgICAgICAgcmVzdWx0Lmluc2VydGlvbnMgPSBhc051bWJlcihpbnNlcnRlZD8uWzFdKTtcbiAgICAgICAgIHJlc3VsdC5kZWxldGlvbnMgPSBhc051bWJlcihkZWxldGVkPy5bMV0pO1xuICAgICAgfVxuICAgKSxcbl07XG5cbmNvbnN0IG51bVN0YXRQYXJzZXIgPSBbXG4gICBuZXcgTGluZVBhcnNlcjxEaWZmUmVzdWx0PihcbiAgICAgIC8oXFxkKylcXHQoXFxkKylcXHQoLispJC8sXG4gICAgICAocmVzdWx0LCBbY2hhbmdlc0luc2VydCwgY2hhbmdlc0RlbGV0ZSwgZmlsZV0pID0+IHtcbiAgICAgICAgIGNvbnN0IGluc2VydGlvbnMgPSBhc051bWJlcihjaGFuZ2VzSW5zZXJ0KTtcbiAgICAgICAgIGNvbnN0IGRlbGV0aW9ucyA9IGFzTnVtYmVyKGNoYW5nZXNEZWxldGUpO1xuXG4gICAgICAgICByZXN1bHQuY2hhbmdlZCsrO1xuICAgICAgICAgcmVzdWx0Lmluc2VydGlvbnMgKz0gaW5zZXJ0aW9ucztcbiAgICAgICAgIHJlc3VsdC5kZWxldGlvbnMgKz0gZGVsZXRpb25zO1xuXG4gICAgICAgICByZXN1bHQuZmlsZXMucHVzaCh7XG4gICAgICAgICAgICBmaWxlLFxuICAgICAgICAgICAgY2hhbmdlczogaW5zZXJ0aW9ucyArIGRlbGV0aW9ucyxcbiAgICAgICAgICAgIGluc2VydGlvbnMsXG4gICAgICAgICAgICBkZWxldGlvbnMsXG4gICAgICAgICAgICBiaW5hcnk6IGZhbHNlLFxuICAgICAgICAgfSk7XG4gICAgICB9XG4gICApLFxuICAgbmV3IExpbmVQYXJzZXI8RGlmZlJlc3VsdD4oLy1cXHQtXFx0KC4rKSQvLCAocmVzdWx0LCBbZmlsZV0pID0+IHtcbiAgICAgIHJlc3VsdC5jaGFuZ2VkKys7XG5cbiAgICAgIHJlc3VsdC5maWxlcy5wdXNoKHtcbiAgICAgICAgIGZpbGUsXG4gICAgICAgICBhZnRlcjogMCxcbiAgICAgICAgIGJlZm9yZTogMCxcbiAgICAgICAgIGJpbmFyeTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgfSksXG5dO1xuXG5jb25zdCBuYW1lT25seVBhcnNlciA9IFtcbiAgIG5ldyBMaW5lUGFyc2VyPERpZmZSZXN1bHQ+KC8oLispJC8sIChyZXN1bHQsIFtmaWxlXSkgPT4ge1xuICAgICAgcmVzdWx0LmNoYW5nZWQrKztcbiAgICAgIHJlc3VsdC5maWxlcy5wdXNoKHtcbiAgICAgICAgIGZpbGUsXG4gICAgICAgICBjaGFuZ2VzOiAwLFxuICAgICAgICAgaW5zZXJ0aW9uczogMCxcbiAgICAgICAgIGRlbGV0aW9uczogMCxcbiAgICAgICAgIGJpbmFyeTogZmFsc2UsXG4gICAgICB9KTtcbiAgIH0pLFxuXTtcblxuY29uc3QgbmFtZVN0YXR1c1BhcnNlciA9IFtcbiAgIG5ldyBMaW5lUGFyc2VyPERpZmZSZXN1bHQ+KFxuICAgICAgLyhbQUNETVJUVVhCXSkoWzAtOV17MCwzfSlcXHQoLlteXFx0XSopKFxcdCguW15cXHRdKikpPyQvLFxuICAgICAgKHJlc3VsdCwgW3N0YXR1cywgc2ltaWxhcml0eSwgZnJvbSwgX3RvLCB0b10pID0+IHtcbiAgICAgICAgIHJlc3VsdC5jaGFuZ2VkKys7XG4gICAgICAgICByZXN1bHQuZmlsZXMucHVzaCh7XG4gICAgICAgICAgICBmaWxlOiB0byA/PyBmcm9tLFxuICAgICAgICAgICAgY2hhbmdlczogMCxcbiAgICAgICAgICAgIGluc2VydGlvbnM6IDAsXG4gICAgICAgICAgICBkZWxldGlvbnM6IDAsXG4gICAgICAgICAgICBiaW5hcnk6IGZhbHNlLFxuICAgICAgICAgICAgc3RhdHVzOiBvclZvaWQoaXNEaWZmTmFtZVN0YXR1cyhzdGF0dXMpICYmIHN0YXR1cyksXG4gICAgICAgICAgICBmcm9tOiBvclZvaWQoISF0byAmJiBmcm9tICE9PSB0byAmJiBmcm9tKSxcbiAgICAgICAgICAgIHNpbWlsYXJpdHk6IGFzTnVtYmVyKHNpbWlsYXJpdHkpLFxuICAgICAgICAgfSk7XG4gICAgICB9XG4gICApLFxuXTtcblxuY29uc3QgZGlmZlN1bW1hcnlQYXJzZXJzOiBSZWNvcmQ8TG9nRm9ybWF0LCBMaW5lUGFyc2VyPERpZmZSZXN1bHQ+W10+ID0ge1xuICAgW0xvZ0Zvcm1hdC5OT05FXTogc3RhdFBhcnNlcixcbiAgIFtMb2dGb3JtYXQuU1RBVF06IHN0YXRQYXJzZXIsXG4gICBbTG9nRm9ybWF0Lk5VTV9TVEFUXTogbnVtU3RhdFBhcnNlcixcbiAgIFtMb2dGb3JtYXQuTkFNRV9TVEFUVVNdOiBuYW1lU3RhdHVzUGFyc2VyLFxuICAgW0xvZ0Zvcm1hdC5OQU1FX09OTFldOiBuYW1lT25seVBhcnNlcixcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREaWZmUGFyc2VyKGZvcm1hdCA9IExvZ0Zvcm1hdC5OT05FKSB7XG4gICBjb25zdCBwYXJzZXIgPSBkaWZmU3VtbWFyeVBhcnNlcnNbZm9ybWF0XTtcblxuICAgcmV0dXJuIChzdGRPdXQ6IHN0cmluZykgPT4gcGFyc2VTdHJpbmdSZXNwb25zZShuZXcgRGlmZlN1bW1hcnkoKSwgcGFyc2VyLCBzdGRPdXQsIGZhbHNlKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IExpc3RMb2dMaW5lLCBMb2dSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IExvZ0Zvcm1hdCB9IGZyb20gJy4uL2FyZ3MvbG9nLWZvcm1hdCc7XG5pbXBvcnQgeyB0b0xpbmVzV2l0aENvbnRlbnQgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBnZXREaWZmUGFyc2VyIH0gZnJvbSAnLi9wYXJzZS1kaWZmLXN1bW1hcnknO1xuXG5leHBvcnQgY29uc3QgU1RBUlRfQk9VTkRBUlkgPSAnw7LDssOyw7LDssOyICc7XG5cbmV4cG9ydCBjb25zdCBDT01NSVRfQk9VTkRBUlkgPSAnIMOyw7InO1xuXG5leHBvcnQgY29uc3QgU1BMSVRURVIgPSAnIMOyICc7XG5cbmNvbnN0IGRlZmF1bHRGaWVsZE5hbWVzID0gWydoYXNoJywgJ2RhdGUnLCAnbWVzc2FnZScsICdyZWZzJywgJ2F1dGhvcl9uYW1lJywgJ2F1dGhvcl9lbWFpbCddO1xuXG5mdW5jdGlvbiBsaW5lQnVpbGRlcih0b2tlbnM6IHN0cmluZ1tdLCBmaWVsZHM6IHN0cmluZ1tdKTogYW55IHtcbiAgIHJldHVybiBmaWVsZHMucmVkdWNlKFxuICAgICAgKGxpbmUsIGZpZWxkLCBpbmRleCkgPT4ge1xuICAgICAgICAgbGluZVtmaWVsZF0gPSB0b2tlbnNbaW5kZXhdIHx8ICcnO1xuICAgICAgICAgcmV0dXJuIGxpbmU7XG4gICAgICB9LFxuICAgICAgT2JqZWN0LmNyZWF0ZSh7IGRpZmY6IG51bGwgfSkgYXMgYW55XG4gICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGlzdExvZ1N1bW1hcnlQYXJzZXI8VCA9IGFueT4oXG4gICBzcGxpdHRlciA9IFNQTElUVEVSLFxuICAgZmllbGRzID0gZGVmYXVsdEZpZWxkTmFtZXMsXG4gICBsb2dGb3JtYXQgPSBMb2dGb3JtYXQuTk9ORVxuKSB7XG4gICBjb25zdCBwYXJzZURpZmZSZXN1bHQgPSBnZXREaWZmUGFyc2VyKGxvZ0Zvcm1hdCk7XG5cbiAgIHJldHVybiBmdW5jdGlvbiAoc3RkT3V0OiBzdHJpbmcpOiBMb2dSZXN1bHQ8VD4ge1xuICAgICAgY29uc3QgYWxsOiBSZWFkb25seUFycmF5PFQgJiBMaXN0TG9nTGluZT4gPSB0b0xpbmVzV2l0aENvbnRlbnQoXG4gICAgICAgICBzdGRPdXQudHJpbSgpLFxuICAgICAgICAgZmFsc2UsXG4gICAgICAgICBTVEFSVF9CT1VOREFSWVxuICAgICAgKS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgIGNvbnN0IGxpbmVEZXRhaWwgPSBpdGVtLnNwbGl0KENPTU1JVF9CT1VOREFSWSk7XG4gICAgICAgICBjb25zdCBsaXN0TG9nTGluZTogVCAmIExpc3RMb2dMaW5lID0gbGluZUJ1aWxkZXIobGluZURldGFpbFswXS5zcGxpdChzcGxpdHRlciksIGZpZWxkcyk7XG5cbiAgICAgICAgIGlmIChsaW5lRGV0YWlsLmxlbmd0aCA+IDEgJiYgbGluZURldGFpbFsxXS50cmltKCkpIHtcbiAgICAgICAgICAgIGxpc3RMb2dMaW5lLmRpZmYgPSBwYXJzZURpZmZSZXN1bHQobGluZURldGFpbFsxXSk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHJldHVybiBsaXN0TG9nTGluZTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAgYWxsLFxuICAgICAgICAgbGF0ZXN0OiAoYWxsLmxlbmd0aCAmJiBhbGxbMF0pIHx8IG51bGwsXG4gICAgICAgICB0b3RhbDogYWxsLmxlbmd0aCxcbiAgICAgIH07XG4gICB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgRGlmZlJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgaXNMb2dGb3JtYXQsIExvZ0Zvcm1hdCwgbG9nRm9ybWF0RnJvbUNvbW1hbmQgfSBmcm9tICcuLi9hcmdzL2xvZy1mb3JtYXQnO1xuaW1wb3J0IHsgZ2V0RGlmZlBhcnNlciB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2UtZGlmZi1zdW1tYXJ5JztcbmltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb25FcnJvclRhc2ssIHR5cGUgRW1wdHlUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRpZmZTdW1tYXJ5VGFzayhjdXN0b21BcmdzOiBzdHJpbmdbXSk6IFN0cmluZ1Rhc2s8RGlmZlJlc3VsdD4gfCBFbXB0eVRhc2sge1xuICAgbGV0IGxvZ0Zvcm1hdCA9IGxvZ0Zvcm1hdEZyb21Db21tYW5kKGN1c3RvbUFyZ3MpO1xuXG4gICBjb25zdCBjb21tYW5kcyA9IFsnZGlmZiddO1xuXG4gICBpZiAobG9nRm9ybWF0ID09PSBMb2dGb3JtYXQuTk9ORSkge1xuICAgICAgbG9nRm9ybWF0ID0gTG9nRm9ybWF0LlNUQVQ7XG4gICAgICBjb21tYW5kcy5wdXNoKCctLXN0YXQ9NDA5NicpO1xuICAgfVxuXG4gICBjb21tYW5kcy5wdXNoKC4uLmN1c3RvbUFyZ3MpO1xuXG4gICByZXR1cm4gKFxuICAgICAgdmFsaWRhdGVMb2dGb3JtYXRDb25maWcoY29tbWFuZHMpIHx8IHtcbiAgICAgICAgIGNvbW1hbmRzLFxuICAgICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgICAgcGFyc2VyOiBnZXREaWZmUGFyc2VyKGxvZ0Zvcm1hdCksXG4gICAgICB9XG4gICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVMb2dGb3JtYXRDb25maWcoY3VzdG9tQXJnczogdW5rbm93bltdKTogRW1wdHlUYXNrIHwgdm9pZCB7XG4gICBjb25zdCBmbGFncyA9IGN1c3RvbUFyZ3MuZmlsdGVyKGlzTG9nRm9ybWF0KTtcblxuICAgaWYgKGZsYWdzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHJldHVybiBjb25maWd1cmF0aW9uRXJyb3JUYXNrKFxuICAgICAgICAgYFN1bW1hcnkgZmxhZ3MgYXJlIG11dHVhbGx5IGV4Y2x1c2l2ZSAtIHBpY2sgb25lIG9mICR7ZmxhZ3Muam9pbignLCcpfWBcbiAgICAgICk7XG4gICB9XG5cbiAgIGlmIChmbGFncy5sZW5ndGggJiYgY3VzdG9tQXJncy5pbmNsdWRlcygnLXonKSkge1xuICAgICAgcmV0dXJuIGNvbmZpZ3VyYXRpb25FcnJvclRhc2soXG4gICAgICAgICBgU3VtbWFyeSBmbGFnICR7ZmxhZ3N9IHBhcnNpbmcgaXMgbm90IGNvbXBhdGlibGUgd2l0aCBudWxsIHRlcm1pbmF0aW9uIG9wdGlvbiAnLXonYFxuICAgICAgKTtcbiAgIH1cbn1cbiIsICJpbXBvcnQgeyBwYXRoc3BlYyB9IGZyb20gJ0BzaW1wbGUtZ2l0L2FyZ3MtcGF0aHNwZWMnO1xuXG5pbXBvcnQgdHlwZSB7IExvZ1Jlc3VsdCwgT3B0aW9ucywgU2ltcGxlR2l0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBsb2dGb3JtYXRGcm9tQ29tbWFuZCB9IGZyb20gJy4uL2FyZ3MvbG9nLWZvcm1hdCc7XG5pbXBvcnQge1xuICAgQ09NTUlUX0JPVU5EQVJZLFxuICAgY3JlYXRlTGlzdExvZ1N1bW1hcnlQYXJzZXIsXG4gICBTUExJVFRFUixcbiAgIFNUQVJUX0JPVU5EQVJZLFxufSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlLWxpc3QtbG9nLXN1bW1hcnknO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRBcGkgfSBmcm9tICcuLi9zaW1wbGUtZ2l0LWFwaSc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQge1xuICAgYXBwZW5kVGFza09wdGlvbnMsXG4gICBhc1N0cmluZ0FycmF5LFxuICAgZmlsdGVyQXJyYXksXG4gICBmaWx0ZXJQbGFpbk9iamVjdCxcbiAgIGZpbHRlclN0cmluZyxcbiAgIGZpbHRlclR5cGUsXG4gICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQsXG4gICB0cmFpbGluZ09wdGlvbnNBcmd1bWVudCxcbn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgdmFsaWRhdGVMb2dGb3JtYXRDb25maWcgfSBmcm9tICcuL2RpZmYnO1xuaW1wb3J0IHsgY29uZmlndXJhdGlvbkVycm9yVGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmVudW0gZXhjbHVkZU9wdGlvbnMge1xuICAgJy0tcHJldHR5JyxcbiAgICdtYXgtY291bnQnLFxuICAgJ21heENvdW50JyxcbiAgICduJyxcbiAgICdmaWxlJyxcbiAgICdmb3JtYXQnLFxuICAgJ2Zyb20nLFxuICAgJ3RvJyxcbiAgICdzcGxpdHRlcicsXG4gICAnc3ltbWV0cmljJyxcbiAgICdtYWlsTWFwJyxcbiAgICdtdWx0aUxpbmUnLFxuICAgJ3N0cmljdERhdGUnLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlZmF1bHRMb2dGaWVsZHMge1xuICAgaGFzaDogc3RyaW5nO1xuICAgZGF0ZTogc3RyaW5nO1xuICAgbWVzc2FnZTogc3RyaW5nO1xuICAgcmVmczogc3RyaW5nO1xuICAgYm9keTogc3RyaW5nO1xuICAgYXV0aG9yX25hbWU6IHN0cmluZztcbiAgIGF1dGhvcl9lbWFpbDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBMb2dPcHRpb25zPFQgPSBEZWZhdWx0TG9nRmllbGRzPiA9IHtcbiAgIGZpbGU/OiBzdHJpbmc7XG4gICBmb3JtYXQ/OiBUO1xuICAgZnJvbT86IHN0cmluZztcbiAgIG1haWxNYXA/OiBib29sZWFuO1xuICAgbWF4Q291bnQ/OiBudW1iZXI7XG4gICBtdWx0aUxpbmU/OiBib29sZWFuO1xuICAgc3BsaXR0ZXI/OiBzdHJpbmc7XG4gICBzdHJpY3REYXRlPzogYm9vbGVhbjtcbiAgIHN5bW1ldHJpYz86IGJvb2xlYW47XG4gICB0bz86IHN0cmluZztcbn07XG5cbmludGVyZmFjZSBQYXJzZWRMb2dPcHRpb25zIHtcbiAgIGZpZWxkczogc3RyaW5nW107XG4gICBzcGxpdHRlcjogc3RyaW5nO1xuICAgY29tbWFuZHM6IHN0cmluZ1tdO1xufVxuXG5mdW5jdGlvbiBwcmV0dHlGb3JtYXQoXG4gICBmb3JtYXQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZyB8IHVua25vd24+LFxuICAgc3BsaXR0ZXI6IHN0cmluZ1xuKTogW3N0cmluZ1tdLCBzdHJpbmddIHtcbiAgIGNvbnN0IGZpZWxkczogc3RyaW5nW10gPSBbXTtcbiAgIGNvbnN0IGZvcm1hdFN0cjogc3RyaW5nW10gPSBbXTtcblxuICAgT2JqZWN0LmtleXMoZm9ybWF0KS5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgZmllbGRzLnB1c2goZmllbGQpO1xuICAgICAgZm9ybWF0U3RyLnB1c2goU3RyaW5nKGZvcm1hdFtmaWVsZF0pKTtcbiAgIH0pO1xuXG4gICByZXR1cm4gW2ZpZWxkcywgZm9ybWF0U3RyLmpvaW4oc3BsaXR0ZXIpXTtcbn1cblxuZnVuY3Rpb24gdXNlck9wdGlvbnM8VCBleHRlbmRzIE9wdGlvbnM+KGlucHV0OiBUKTogT3B0aW9ucyB7XG4gICByZXR1cm4gT2JqZWN0LmtleXMoaW5wdXQpLnJlZHVjZSgob3V0LCBrZXkpID0+IHtcbiAgICAgIGlmICghKGtleSBpbiBleGNsdWRlT3B0aW9ucykpIHtcbiAgICAgICAgIG91dFtrZXldID0gaW5wdXRba2V5XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXQ7XG4gICB9LCB7fSBhcyBPcHRpb25zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTG9nT3B0aW9uczxUIGV4dGVuZHMgT3B0aW9ucz4oXG4gICBvcHQ6IE9wdGlvbnMgfCBMb2dPcHRpb25zPFQ+ID0ge30sXG4gICBjdXN0b21BcmdzOiBzdHJpbmdbXSA9IFtdXG4pOiBQYXJzZWRMb2dPcHRpb25zIHtcbiAgIGNvbnN0IHNwbGl0dGVyID0gZmlsdGVyVHlwZShvcHQuc3BsaXR0ZXIsIGZpbHRlclN0cmluZywgU1BMSVRURVIpO1xuICAgY29uc3QgZm9ybWF0ID0gZmlsdGVyUGxhaW5PYmplY3Qob3B0LmZvcm1hdClcbiAgICAgID8gb3B0LmZvcm1hdFxuICAgICAgOiB7XG4gICAgICAgICAgIGhhc2g6ICclSCcsXG4gICAgICAgICAgIGRhdGU6IG9wdC5zdHJpY3REYXRlID09PSBmYWxzZSA/ICclYWknIDogJyVhSScsXG4gICAgICAgICAgIG1lc3NhZ2U6ICclcycsXG4gICAgICAgICAgIHJlZnM6ICclRCcsXG4gICAgICAgICAgIGJvZHk6IG9wdC5tdWx0aUxpbmUgPyAnJUInIDogJyViJyxcbiAgICAgICAgICAgYXV0aG9yX25hbWU6IG9wdC5tYWlsTWFwICE9PSBmYWxzZSA/ICclYU4nIDogJyVhbicsXG4gICAgICAgICAgIGF1dGhvcl9lbWFpbDogb3B0Lm1haWxNYXAgIT09IGZhbHNlID8gJyVhRScgOiAnJWFlJyxcbiAgICAgICAgfTtcblxuICAgY29uc3QgW2ZpZWxkcywgZm9ybWF0U3RyXSA9IHByZXR0eUZvcm1hdChmb3JtYXQsIHNwbGl0dGVyKTtcblxuICAgY29uc3Qgc3VmZml4OiBzdHJpbmdbXSA9IFtdO1xuICAgY29uc3QgY29tbWFuZDogc3RyaW5nW10gPSBbXG4gICAgICBgLS1wcmV0dHk9Zm9ybWF0OiR7U1RBUlRfQk9VTkRBUll9JHtmb3JtYXRTdHJ9JHtDT01NSVRfQk9VTkRBUll9YCxcbiAgICAgIC4uLmN1c3RvbUFyZ3MsXG4gICBdO1xuXG4gICBjb25zdCBtYXhDb3VudDogbnVtYmVyIHwgdW5kZWZpbmVkID0gKG9wdCBhcyBhbnkpLm4gfHwgKG9wdCBhcyBhbnkpWydtYXgtY291bnQnXSB8fCBvcHQubWF4Q291bnQ7XG4gICBpZiAobWF4Q291bnQpIHtcbiAgICAgIGNvbW1hbmQucHVzaChgLS1tYXgtY291bnQ9JHttYXhDb3VudH1gKTtcbiAgIH1cblxuICAgaWYgKG9wdC5mcm9tIHx8IG9wdC50bykge1xuICAgICAgY29uc3QgcmFuZ2VPcGVyYXRvciA9IG9wdC5zeW1tZXRyaWMgIT09IGZhbHNlID8gJy4uLicgOiAnLi4nO1xuICAgICAgc3VmZml4LnB1c2goYCR7b3B0LmZyb20gfHwgJyd9JHtyYW5nZU9wZXJhdG9yfSR7b3B0LnRvIHx8ICcnfWApO1xuICAgfVxuXG4gICBpZiAoZmlsdGVyU3RyaW5nKG9wdC5maWxlKSkge1xuICAgICAgY29tbWFuZC5wdXNoKCctLWZvbGxvdycsIHBhdGhzcGVjKG9wdC5maWxlKSk7XG4gICB9XG5cbiAgIGFwcGVuZFRhc2tPcHRpb25zKHVzZXJPcHRpb25zKG9wdCBhcyBPcHRpb25zKSwgY29tbWFuZCk7XG5cbiAgIHJldHVybiB7XG4gICAgICBmaWVsZHMsXG4gICAgICBzcGxpdHRlcixcbiAgICAgIGNvbW1hbmRzOiBbLi4uY29tbWFuZCwgLi4uc3VmZml4XSxcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2dUYXNrPFQ+KFxuICAgc3BsaXR0ZXI6IHN0cmluZyxcbiAgIGZpZWxkczogc3RyaW5nW10sXG4gICBjdXN0b21BcmdzOiBzdHJpbmdbXVxuKTogU3RyaW5nVGFzazxMb2dSZXN1bHQ8VD4+IHtcbiAgIGNvbnN0IHBhcnNlciA9IGNyZWF0ZUxpc3RMb2dTdW1tYXJ5UGFyc2VyKHNwbGl0dGVyLCBmaWVsZHMsIGxvZ0Zvcm1hdEZyb21Db21tYW5kKGN1c3RvbUFyZ3MpKTtcblxuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzOiBbJ2xvZycsIC4uLmN1c3RvbUFyZ3NdLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgcGFyc2VyLFxuICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCk6IFBpY2s8U2ltcGxlR2l0LCAnbG9nJz4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGxvZzxUIGV4dGVuZHMgT3B0aW9ucz4odGhpczogU2ltcGxlR2l0QXBpLCAuLi5yZXN0OiB1bmtub3duW10pIHtcbiAgICAgICAgIGNvbnN0IG5leHQgPSB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKTtcbiAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBwYXJzZUxvZ09wdGlvbnM8VD4oXG4gICAgICAgICAgICB0cmFpbGluZ09wdGlvbnNBcmd1bWVudChhcmd1bWVudHMpLFxuICAgICAgICAgICAgYXNTdHJpbmdBcnJheShmaWx0ZXJUeXBlKGFyZ3VtZW50c1swXSwgZmlsdGVyQXJyYXksIFtdKSlcbiAgICAgICAgICk7XG4gICAgICAgICBjb25zdCB0YXNrID1cbiAgICAgICAgICAgIHJlamVjdERlcHJlY2F0ZWRTaWduYXR1cmVzKC4uLnJlc3QpIHx8XG4gICAgICAgICAgICB2YWxpZGF0ZUxvZ0Zvcm1hdENvbmZpZyhvcHRpb25zLmNvbW1hbmRzKSB8fFxuICAgICAgICAgICAgY3JlYXRlTG9nVGFzayhvcHRpb25zKTtcblxuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2sodGFzaywgbmV4dCk7XG4gICAgICB9LFxuICAgfTtcblxuICAgZnVuY3Rpb24gY3JlYXRlTG9nVGFzayhvcHRpb25zOiBQYXJzZWRMb2dPcHRpb25zKSB7XG4gICAgICByZXR1cm4gbG9nVGFzayhvcHRpb25zLnNwbGl0dGVyLCBvcHRpb25zLmZpZWxkcywgb3B0aW9ucy5jb21tYW5kcyk7XG4gICB9XG5cbiAgIGZ1bmN0aW9uIHJlamVjdERlcHJlY2F0ZWRTaWduYXR1cmVzKGZyb20/OiB1bmtub3duLCB0bz86IHVua25vd24pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgICBmaWx0ZXJTdHJpbmcoZnJvbSkgJiZcbiAgICAgICAgIGZpbHRlclN0cmluZyh0bykgJiZcbiAgICAgICAgIGNvbmZpZ3VyYXRpb25FcnJvclRhc2soXG4gICAgICAgICAgICBgZ2l0LmxvZyhzdHJpbmcsIHN0cmluZykgc2hvdWxkIGJlIHJlcGxhY2VkIHdpdGggZ2l0LmxvZyh7IGZyb206IHN0cmluZywgdG86IHN0cmluZyB9KWBcbiAgICAgICAgIClcbiAgICAgICk7XG4gICB9XG59XG4iLCAiaW1wb3J0IHR5cGUge1xuICAgTWVyZ2VDb25mbGljdCxcbiAgIE1lcmdlQ29uZmxpY3REZWxldGlvbixcbiAgIE1lcmdlRGV0YWlsLFxuICAgTWVyZ2VSZXN1bHRTdGF0dXMsXG59IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuXG5leHBvcnQgY2xhc3MgTWVyZ2VTdW1tYXJ5Q29uZmxpY3QgaW1wbGVtZW50cyBNZXJnZUNvbmZsaWN0IHtcbiAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHJlYWRvbmx5IHJlYXNvbjogc3RyaW5nLFxuICAgICAgcHVibGljIHJlYWRvbmx5IGZpbGU6IHN0cmluZyB8IG51bGwgPSBudWxsLFxuICAgICAgcHVibGljIHJlYWRvbmx5IG1ldGE/OiBNZXJnZUNvbmZsaWN0RGVsZXRpb25cbiAgICkge31cblxuICAgdG9TdHJpbmcoKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5maWxlfToke3RoaXMucmVhc29ufWA7XG4gICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNZXJnZVN1bW1hcnlEZXRhaWwgaW1wbGVtZW50cyBNZXJnZURldGFpbCB7XG4gICBwdWJsaWMgY29uZmxpY3RzOiBNZXJnZUNvbmZsaWN0W10gPSBbXTtcbiAgIHB1YmxpYyBtZXJnZXM6IHN0cmluZ1tdID0gW107XG4gICBwdWJsaWMgcmVzdWx0OiBNZXJnZVJlc3VsdFN0YXR1cyA9ICdzdWNjZXNzJztcblxuICAgZ2V0IGZhaWxlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZsaWN0cy5sZW5ndGggPiAwO1xuICAgfVxuXG4gICBnZXQgcmVhc29uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVzdWx0O1xuICAgfVxuXG4gICB0b1N0cmluZygpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZsaWN0cy5sZW5ndGgpIHtcbiAgICAgICAgIHJldHVybiBgQ09ORkxJQ1RTOiAke3RoaXMuY29uZmxpY3RzLmpvaW4oJywgJyl9YDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICdPSyc7XG4gICB9XG59XG4iLCAiaW1wb3J0IHR5cGUge1xuICAgUHVsbERldGFpbEZpbGVDaGFuZ2VzLFxuICAgUHVsbERldGFpbFN1bW1hcnksXG4gICBQdWxsRmFpbGVkUmVzdWx0LFxuICAgUHVsbFJlc3VsdCxcbn0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5cbmV4cG9ydCBjbGFzcyBQdWxsU3VtbWFyeSBpbXBsZW1lbnRzIFB1bGxSZXN1bHQge1xuICAgcHVibGljIHJlbW90ZU1lc3NhZ2VzID0ge1xuICAgICAgYWxsOiBbXSxcbiAgIH07XG4gICBwdWJsaWMgY3JlYXRlZCA9IFtdO1xuICAgcHVibGljIGRlbGV0ZWQ6IHN0cmluZ1tdID0gW107XG4gICBwdWJsaWMgZmlsZXM6IHN0cmluZ1tdID0gW107XG4gICBwdWJsaWMgZGVsZXRpb25zOiBQdWxsRGV0YWlsRmlsZUNoYW5nZXMgPSB7fTtcbiAgIHB1YmxpYyBpbnNlcnRpb25zOiBQdWxsRGV0YWlsRmlsZUNoYW5nZXMgPSB7fTtcbiAgIHB1YmxpYyBzdW1tYXJ5OiBQdWxsRGV0YWlsU3VtbWFyeSA9IHtcbiAgICAgIGNoYW5nZXM6IDAsXG4gICAgICBkZWxldGlvbnM6IDAsXG4gICAgICBpbnNlcnRpb25zOiAwLFxuICAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIFB1bGxGYWlsZWRTdW1tYXJ5IGltcGxlbWVudHMgUHVsbEZhaWxlZFJlc3VsdCB7XG4gICByZW1vdGUgPSAnJztcbiAgIGhhc2ggPSB7XG4gICAgICBsb2NhbDogJycsXG4gICAgICByZW1vdGU6ICcnLFxuICAgfTtcbiAgIGJyYW5jaCA9IHtcbiAgICAgIGxvY2FsOiAnJyxcbiAgICAgIHJlbW90ZTogJycsXG4gICB9O1xuICAgbWVzc2FnZSA9ICcnO1xuXG4gICB0b1N0cmluZygpIHtcbiAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2U7XG4gICB9XG59XG4iLCAiaW1wb3J0IHR5cGUge1xuICAgUmVtb3RlTWVzc2FnZVJlc3VsdCxcbiAgIFJlbW90ZU1lc3NhZ2VzLFxuICAgUmVtb3RlTWVzc2FnZXNPYmplY3RFbnVtZXJhdGlvbixcbn0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBhc051bWJlciwgUmVtb3RlTGluZVBhcnNlciB9IGZyb20gJy4uL3V0aWxzJztcblxuZnVuY3Rpb24gb2JqZWN0RW51bWVyYXRpb25SZXN1bHQ8VCBleHRlbmRzIFJlbW90ZU1lc3NhZ2VzID0gUmVtb3RlTWVzc2FnZXM+KFxuICAgcmVtb3RlTWVzc2FnZXM6IFRcbik6IFJlbW90ZU1lc3NhZ2VzT2JqZWN0RW51bWVyYXRpb24ge1xuICAgcmV0dXJuIChyZW1vdGVNZXNzYWdlcy5vYmplY3RzID0gcmVtb3RlTWVzc2FnZXMub2JqZWN0cyB8fCB7XG4gICAgICBjb21wcmVzc2luZzogMCxcbiAgICAgIGNvdW50aW5nOiAwLFxuICAgICAgZW51bWVyYXRpbmc6IDAsXG4gICAgICBwYWNrUmV1c2VkOiAwLFxuICAgICAgcmV1c2VkOiB7IGNvdW50OiAwLCBkZWx0YTogMCB9LFxuICAgICAgdG90YWw6IHsgY291bnQ6IDAsIGRlbHRhOiAwIH0sXG4gICB9KTtcbn1cblxuZnVuY3Rpb24gYXNPYmplY3RDb3VudChzb3VyY2U6IHN0cmluZykge1xuICAgY29uc3QgY291bnQgPSAvXlxccyooXFxkKykvLmV4ZWMoc291cmNlKTtcbiAgIGNvbnN0IGRlbHRhID0gL2RlbHRhIChcXGQrKS9pLmV4ZWMoc291cmNlKTtcblxuICAgcmV0dXJuIHtcbiAgICAgIGNvdW50OiBhc051bWJlcigoY291bnQgJiYgY291bnRbMV0pIHx8ICcwJyksXG4gICAgICBkZWx0YTogYXNOdW1iZXIoKGRlbHRhICYmIGRlbHRhWzFdKSB8fCAnMCcpLFxuICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHJlbW90ZU1lc3NhZ2VzT2JqZWN0UGFyc2VyczogUmVtb3RlTGluZVBhcnNlcjxSZW1vdGVNZXNzYWdlUmVzdWx0PFJlbW90ZU1lc3NhZ2VzPj5bXSA9XG4gICBbXG4gICAgICBuZXcgUmVtb3RlTGluZVBhcnNlcihcbiAgICAgICAgIC9ecmVtb3RlOlxccyooZW51bWVyYXRpbmd8Y291bnRpbmd8Y29tcHJlc3NpbmcpIG9iamVjdHM6IChcXGQrKSwvaSxcbiAgICAgICAgIChyZXN1bHQsIFthY3Rpb24sIGNvdW50XSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gYWN0aW9uLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBjb25zdCBlbnVtZXJhdGlvbiA9IG9iamVjdEVudW1lcmF0aW9uUmVzdWx0KHJlc3VsdC5yZW1vdGVNZXNzYWdlcyk7XG5cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZW51bWVyYXRpb24sIHsgW2tleV06IGFzTnVtYmVyKGNvdW50KSB9KTtcbiAgICAgICAgIH1cbiAgICAgICksXG4gICAgICBuZXcgUmVtb3RlTGluZVBhcnNlcihcbiAgICAgICAgIC9ecmVtb3RlOlxccyooZW51bWVyYXRpbmd8Y291bnRpbmd8Y29tcHJlc3NpbmcpIG9iamVjdHM6IFxcZCslIFxcKFxcZCtcXC8oXFxkKylcXCksL2ksXG4gICAgICAgICAocmVzdWx0LCBbYWN0aW9uLCBjb3VudF0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGFjdGlvbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3QgZW51bWVyYXRpb24gPSBvYmplY3RFbnVtZXJhdGlvblJlc3VsdChyZXN1bHQucmVtb3RlTWVzc2FnZXMpO1xuXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVudW1lcmF0aW9uLCB7IFtrZXldOiBhc051bWJlcihjb3VudCkgfSk7XG4gICAgICAgICB9XG4gICAgICApLFxuICAgICAgbmV3IFJlbW90ZUxpbmVQYXJzZXIoXG4gICAgICAgICAvdG90YWwgKFteLF0rKSwgcmV1c2VkIChbXixdKyksIHBhY2stcmV1c2VkIChcXGQrKS9pLFxuICAgICAgICAgKHJlc3VsdCwgW3RvdGFsLCByZXVzZWQsIHBhY2tSZXVzZWRdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvYmplY3RzID0gb2JqZWN0RW51bWVyYXRpb25SZXN1bHQocmVzdWx0LnJlbW90ZU1lc3NhZ2VzKTtcbiAgICAgICAgICAgIG9iamVjdHMudG90YWwgPSBhc09iamVjdENvdW50KHRvdGFsKTtcbiAgICAgICAgICAgIG9iamVjdHMucmV1c2VkID0gYXNPYmplY3RDb3VudChyZXVzZWQpO1xuICAgICAgICAgICAgb2JqZWN0cy5wYWNrUmV1c2VkID0gYXNOdW1iZXIocGFja1JldXNlZCk7XG4gICAgICAgICB9XG4gICAgICApLFxuICAgXTtcbiIsICJpbXBvcnQgdHlwZSB7IFB1c2hSZXN1bHRSZW1vdGVNZXNzYWdlcywgUmVtb3RlTWVzc2FnZVJlc3VsdCwgUmVtb3RlTWVzc2FnZXMgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IGFzTnVtYmVyLCBwYXJzZVN0cmluZ1Jlc3BvbnNlLCBSZW1vdGVMaW5lUGFyc2VyIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgcmVtb3RlTWVzc2FnZXNPYmplY3RQYXJzZXJzIH0gZnJvbSAnLi9wYXJzZS1yZW1vdGUtb2JqZWN0cyc7XG5cbmNvbnN0IHBhcnNlcnM6IFJlbW90ZUxpbmVQYXJzZXI8UmVtb3RlTWVzc2FnZVJlc3VsdDxQdXNoUmVzdWx0UmVtb3RlTWVzc2FnZXMgfCBSZW1vdGVNZXNzYWdlcz4+W10gPVxuICAgW1xuICAgICAgbmV3IFJlbW90ZUxpbmVQYXJzZXIoL15yZW1vdGU6XFxzKiguKykkLywgKHJlc3VsdCwgW3RleHRdKSA9PiB7XG4gICAgICAgICByZXN1bHQucmVtb3RlTWVzc2FnZXMuYWxsLnB1c2godGV4dC50cmltKCkpO1xuICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSksXG4gICAgICAuLi5yZW1vdGVNZXNzYWdlc09iamVjdFBhcnNlcnMsXG4gICAgICBuZXcgUmVtb3RlTGluZVBhcnNlcihcbiAgICAgICAgIFsvY3JlYXRlIGEgKD86cHVsbHxtZXJnZSkgcmVxdWVzdC9pLCAvXFxzKGh0dHBzPzpcXC9cXC9cXFMrKSQvXSxcbiAgICAgICAgIChyZXN1bHQsIFtwdWxsUmVxdWVzdFVybF0pID0+IHtcbiAgICAgICAgICAgIChyZXN1bHQucmVtb3RlTWVzc2FnZXMgYXMgUHVzaFJlc3VsdFJlbW90ZU1lc3NhZ2VzKS5wdWxsUmVxdWVzdFVybCA9IHB1bGxSZXF1ZXN0VXJsO1xuICAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIG5ldyBSZW1vdGVMaW5lUGFyc2VyKFxuICAgICAgICAgWy9mb3VuZCAoXFxkKykgdnVsbmVyYWJpbGl0aWVzLitcXCgoW14pXSspXFwpL2ksIC9cXHMoaHR0cHM/OlxcL1xcL1xcUyspJC9dLFxuICAgICAgICAgKHJlc3VsdCwgW2NvdW50LCBzdW1tYXJ5LCB1cmxdKSA9PiB7XG4gICAgICAgICAgICAocmVzdWx0LnJlbW90ZU1lc3NhZ2VzIGFzIFB1c2hSZXN1bHRSZW1vdGVNZXNzYWdlcykudnVsbmVyYWJpbGl0aWVzID0ge1xuICAgICAgICAgICAgICAgY291bnQ6IGFzTnVtYmVyKGNvdW50KSxcbiAgICAgICAgICAgICAgIHN1bW1hcnksXG4gICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgfVxuICAgICAgKSxcbiAgIF07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVJlbW90ZU1lc3NhZ2VzPFQgZXh0ZW5kcyBSZW1vdGVNZXNzYWdlcyA9IFJlbW90ZU1lc3NhZ2VzPihcbiAgIF9zdGRPdXQ6IHN0cmluZyxcbiAgIHN0ZEVycjogc3RyaW5nXG4pOiBSZW1vdGVNZXNzYWdlUmVzdWx0IHtcbiAgIHJldHVybiBwYXJzZVN0cmluZ1Jlc3BvbnNlKHsgcmVtb3RlTWVzc2FnZXM6IG5ldyBSZW1vdGVNZXNzYWdlU3VtbWFyeSgpIGFzIFQgfSwgcGFyc2Vycywgc3RkRXJyKTtcbn1cblxuZXhwb3J0IGNsYXNzIFJlbW90ZU1lc3NhZ2VTdW1tYXJ5IGltcGxlbWVudHMgUmVtb3RlTWVzc2FnZXMge1xuICAgcHVibGljIHJlYWRvbmx5IGFsbDogc3RyaW5nW10gPSBbXTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFB1bGxEZXRhaWwsIFB1bGxGYWlsZWRSZXN1bHQsIFB1bGxSZXN1bHQsIFJlbW90ZU1lc3NhZ2VzIH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBQdWxsRmFpbGVkU3VtbWFyeSwgUHVsbFN1bW1hcnkgfSBmcm9tICcuLi9yZXNwb25zZXMvUHVsbFN1bW1hcnknO1xuaW1wb3J0IHR5cGUgeyBUYXNrUGFyc2VyIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgYXBwZW5kLCBMaW5lUGFyc2VyLCBwYXJzZVN0cmluZ1Jlc3BvbnNlIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgcGFyc2VSZW1vdGVNZXNzYWdlcyB9IGZyb20gJy4vcGFyc2UtcmVtb3RlLW1lc3NhZ2VzJztcblxuY29uc3QgRklMRV9VUERBVEVfUkVHRVggPSAvXlxccyooLis/KVxccytcXHxcXHMrXFxkK1xccyooXFwrKikoLSopLztcbmNvbnN0IFNVTU1BUllfUkVHRVggPSAvKFxcZCspXFxEKygoXFxkKylcXEQrXFwoXFwrXFwpKT8oXFxEKyhcXGQrKVxcRCtcXCgtXFwpKT8vO1xuY29uc3QgQUNUSU9OX1JFR0VYID0gL14oY3JlYXRlfGRlbGV0ZSkgbW9kZSBcXGQrICguKykvO1xuXG5jb25zdCBwYXJzZXJzOiBMaW5lUGFyc2VyPFB1bGxSZXN1bHQ+W10gPSBbXG4gICBuZXcgTGluZVBhcnNlcihGSUxFX1VQREFURV9SRUdFWCwgKHJlc3VsdCwgW2ZpbGUsIGluc2VydGlvbnMsIGRlbGV0aW9uc10pID0+IHtcbiAgICAgIHJlc3VsdC5maWxlcy5wdXNoKGZpbGUpO1xuXG4gICAgICBpZiAoaW5zZXJ0aW9ucykge1xuICAgICAgICAgcmVzdWx0Lmluc2VydGlvbnNbZmlsZV0gPSBpbnNlcnRpb25zLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgaWYgKGRlbGV0aW9ucykge1xuICAgICAgICAgcmVzdWx0LmRlbGV0aW9uc1tmaWxlXSA9IGRlbGV0aW9ucy5sZW5ndGg7XG4gICAgICB9XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyKFNVTU1BUllfUkVHRVgsIChyZXN1bHQsIFtjaGFuZ2VzLCAsIGluc2VydGlvbnMsICwgZGVsZXRpb25zXSkgPT4ge1xuICAgICAgaWYgKGluc2VydGlvbnMgIT09IHVuZGVmaW5lZCB8fCBkZWxldGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgcmVzdWx0LnN1bW1hcnkuY2hhbmdlcyA9ICtjaGFuZ2VzIHx8IDA7XG4gICAgICAgICByZXN1bHQuc3VtbWFyeS5pbnNlcnRpb25zID0gK2luc2VydGlvbnMgfHwgMDtcbiAgICAgICAgIHJlc3VsdC5zdW1tYXJ5LmRlbGV0aW9ucyA9ICtkZWxldGlvbnMgfHwgMDtcbiAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgfSksXG4gICBuZXcgTGluZVBhcnNlcihBQ1RJT05fUkVHRVgsIChyZXN1bHQsIFthY3Rpb24sIGZpbGVdKSA9PiB7XG4gICAgICBhcHBlbmQocmVzdWx0LmZpbGVzLCBmaWxlKTtcbiAgICAgIGFwcGVuZChhY3Rpb24gPT09ICdjcmVhdGUnID8gcmVzdWx0LmNyZWF0ZWQgOiByZXN1bHQuZGVsZXRlZCwgZmlsZSk7XG4gICB9KSxcbl07XG5cbmNvbnN0IGVycm9yUGFyc2VyczogTGluZVBhcnNlcjxQdWxsRmFpbGVkUmVzdWx0PltdID0gW1xuICAgbmV3IExpbmVQYXJzZXIoL15mcm9tXFxzKC4rKSQvaSwgKHJlc3VsdCwgW3JlbW90ZV0pID0+IHZvaWQgKHJlc3VsdC5yZW1vdGUgPSByZW1vdGUpKSxcbiAgIG5ldyBMaW5lUGFyc2VyKC9eZmF0YWw6XFxzKC4rKSQvLCAocmVzdWx0LCBbbWVzc2FnZV0pID0+IHZvaWQgKHJlc3VsdC5tZXNzYWdlID0gbWVzc2FnZSkpLFxuICAgbmV3IExpbmVQYXJzZXIoXG4gICAgICAvKFthLXowLTldKylcXC5cXC4oW2EtejAtOV0rKVxccysoXFxTKylcXHMrLT5cXHMrKFxcUyspJC8sXG4gICAgICAocmVzdWx0LCBbaGFzaExvY2FsLCBoYXNoUmVtb3RlLCBicmFuY2hMb2NhbCwgYnJhbmNoUmVtb3RlXSkgPT4ge1xuICAgICAgICAgcmVzdWx0LmJyYW5jaC5sb2NhbCA9IGJyYW5jaExvY2FsO1xuICAgICAgICAgcmVzdWx0Lmhhc2gubG9jYWwgPSBoYXNoTG9jYWw7XG4gICAgICAgICByZXN1bHQuYnJhbmNoLnJlbW90ZSA9IGJyYW5jaFJlbW90ZTtcbiAgICAgICAgIHJlc3VsdC5oYXNoLnJlbW90ZSA9IGhhc2hSZW1vdGU7XG4gICAgICB9XG4gICApLFxuXTtcblxuZXhwb3J0IGNvbnN0IHBhcnNlUHVsbERldGFpbDogVGFza1BhcnNlcjxzdHJpbmcsIFB1bGxEZXRhaWw+ID0gKHN0ZE91dCwgc3RkRXJyKSA9PiB7XG4gICByZXR1cm4gcGFyc2VTdHJpbmdSZXNwb25zZShuZXcgUHVsbFN1bW1hcnkoKSwgcGFyc2VycywgW3N0ZE91dCwgc3RkRXJyXSk7XG59O1xuXG5leHBvcnQgY29uc3QgcGFyc2VQdWxsUmVzdWx0OiBUYXNrUGFyc2VyPHN0cmluZywgUHVsbFJlc3VsdD4gPSAoc3RkT3V0LCBzdGRFcnIpID0+IHtcbiAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAgbmV3IFB1bGxTdW1tYXJ5KCksXG4gICAgICBwYXJzZVB1bGxEZXRhaWwoc3RkT3V0LCBzdGRFcnIpLFxuICAgICAgcGFyc2VSZW1vdGVNZXNzYWdlczxSZW1vdGVNZXNzYWdlcz4oc3RkT3V0LCBzdGRFcnIpXG4gICApO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUHVsbEVycm9yUmVzdWx0KHN0ZE91dDogc3RyaW5nLCBzdGRFcnI6IHN0cmluZykge1xuICAgY29uc3QgcHVsbEVycm9yID0gcGFyc2VTdHJpbmdSZXNwb25zZShuZXcgUHVsbEZhaWxlZFN1bW1hcnkoKSwgZXJyb3JQYXJzZXJzLCBbc3RkT3V0LCBzdGRFcnJdKTtcblxuICAgcmV0dXJuIHB1bGxFcnJvci5tZXNzYWdlICYmIHB1bGxFcnJvcjtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IE1lcmdlRGV0YWlsLCBNZXJnZVJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgTWVyZ2VTdW1tYXJ5Q29uZmxpY3QsIE1lcmdlU3VtbWFyeURldGFpbCB9IGZyb20gJy4uL3Jlc3BvbnNlcy9NZXJnZVN1bW1hcnknO1xuaW1wb3J0IHR5cGUgeyBUYXNrUGFyc2VyIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgTGluZVBhcnNlciwgcGFyc2VTdHJpbmdSZXNwb25zZSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IHBhcnNlUHVsbFJlc3VsdCB9IGZyb20gJy4vcGFyc2UtcHVsbCc7XG5cbmNvbnN0IHBhcnNlcnM6IExpbmVQYXJzZXI8TWVyZ2VEZXRhaWw+W10gPSBbXG4gICBuZXcgTGluZVBhcnNlcigvXkF1dG8tbWVyZ2luZ1xccysoLispJC8sIChzdW1tYXJ5LCBbYXV0b01lcmdlXSkgPT4ge1xuICAgICAgc3VtbWFyeS5tZXJnZXMucHVzaChhdXRvTWVyZ2UpO1xuICAgfSksXG4gICBuZXcgTGluZVBhcnNlcigvXkNPTkZMSUNUXFxzK1xcKCguKylcXCk6IE1lcmdlIGNvbmZsaWN0IGluICguKykkLywgKHN1bW1hcnksIFtyZWFzb24sIGZpbGVdKSA9PiB7XG4gICAgICBzdW1tYXJ5LmNvbmZsaWN0cy5wdXNoKG5ldyBNZXJnZVN1bW1hcnlDb25mbGljdChyZWFzb24sIGZpbGUpKTtcbiAgIH0pLFxuICAgbmV3IExpbmVQYXJzZXIoXG4gICAgICAvXkNPTkZMSUNUXFxzK1xcKCguK1xcL2RlbGV0ZSlcXCk6ICguKykgZGVsZXRlZCBpbiAoLispIGFuZC8sXG4gICAgICAoc3VtbWFyeSwgW3JlYXNvbiwgZmlsZSwgZGVsZXRlUmVmXSkgPT4ge1xuICAgICAgICAgc3VtbWFyeS5jb25mbGljdHMucHVzaChuZXcgTWVyZ2VTdW1tYXJ5Q29uZmxpY3QocmVhc29uLCBmaWxlLCB7IGRlbGV0ZVJlZiB9KSk7XG4gICAgICB9XG4gICApLFxuICAgbmV3IExpbmVQYXJzZXIoL15DT05GTElDVFxccytcXCgoLispXFwpOi8sIChzdW1tYXJ5LCBbcmVhc29uXSkgPT4ge1xuICAgICAgc3VtbWFyeS5jb25mbGljdHMucHVzaChuZXcgTWVyZ2VTdW1tYXJ5Q29uZmxpY3QocmVhc29uLCBudWxsKSk7XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyKC9eQXV0b21hdGljIG1lcmdlIGZhaWxlZDtcXHMrKC4rKSQvLCAoc3VtbWFyeSwgW3Jlc3VsdF0pID0+IHtcbiAgICAgIHN1bW1hcnkucmVzdWx0ID0gcmVzdWx0O1xuICAgfSksXG5dO1xuXG4vKipcbiAqIFBhcnNlIHRoZSBjb21wbGV0ZSByZXNwb25zZSBmcm9tIGBnaXQubWVyZ2VgXG4gKi9cbmV4cG9ydCBjb25zdCBwYXJzZU1lcmdlUmVzdWx0OiBUYXNrUGFyc2VyPHN0cmluZywgTWVyZ2VSZXN1bHQ+ID0gKHN0ZE91dCwgc3RkRXJyKSA9PiB7XG4gICByZXR1cm4gT2JqZWN0LmFzc2lnbihwYXJzZU1lcmdlRGV0YWlsKHN0ZE91dCwgc3RkRXJyKSwgcGFyc2VQdWxsUmVzdWx0KHN0ZE91dCwgc3RkRXJyKSk7XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBtZXJnZSBzcGVjaWZpYyBkZXRhaWwgKGllOiBub3QgdGhlIGNvbnRlbnQgYWxzbyBhdmFpbGFibGUgaW4gdGhlIHB1bGwgZGV0YWlsKSBmcm9tIGBnaXQubW5lcmdlYFxuICogQHBhcmFtIHN0ZE91dFxuICovXG5leHBvcnQgY29uc3QgcGFyc2VNZXJnZURldGFpbDogVGFza1BhcnNlcjxzdHJpbmcsIE1lcmdlRGV0YWlsPiA9IChzdGRPdXQpID0+IHtcbiAgIHJldHVybiBwYXJzZVN0cmluZ1Jlc3BvbnNlKG5ldyBNZXJnZVN1bW1hcnlEZXRhaWwoKSwgcGFyc2Vycywgc3RkT3V0KTtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBNZXJnZVJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgR2l0UmVzcG9uc2VFcnJvciB9IGZyb20gJy4uL2Vycm9ycy9naXQtcmVzcG9uc2UtZXJyb3InO1xuaW1wb3J0IHsgcGFyc2VNZXJnZVJlc3VsdCB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2UtbWVyZ2UnO1xuaW1wb3J0IHR5cGUgeyBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgY29uZmlndXJhdGlvbkVycm9yVGFzaywgdHlwZSBFbXB0eVRhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VUYXNrKGN1c3RvbUFyZ3M6IHN0cmluZ1tdKTogRW1wdHlUYXNrIHwgU3RyaW5nVGFzazxNZXJnZVJlc3VsdD4ge1xuICAgaWYgKCFjdXN0b21BcmdzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGNvbmZpZ3VyYXRpb25FcnJvclRhc2soJ0dpdC5tZXJnZSByZXF1aXJlcyBhdCBsZWFzdCBvbmUgb3B0aW9uJyk7XG4gICB9XG5cbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kczogWydtZXJnZScsIC4uLmN1c3RvbUFyZ3NdLFxuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgcGFyc2VyKHN0ZE91dCwgc3RkRXJyKTogTWVyZ2VSZXN1bHQge1xuICAgICAgICAgY29uc3QgbWVyZ2UgPSBwYXJzZU1lcmdlUmVzdWx0KHN0ZE91dCwgc3RkRXJyKTtcbiAgICAgICAgIGlmIChtZXJnZS5mYWlsZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHaXRSZXNwb25zZUVycm9yKG1lcmdlKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgcmV0dXJuIG1lcmdlO1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHR5cGUge1xuICAgUHVzaERldGFpbCxcbiAgIFB1c2hSZXN1bHQsXG4gICBQdXNoUmVzdWx0UHVzaGVkSXRlbSxcbiAgIFB1c2hSZXN1bHRSZW1vdGVNZXNzYWdlcyxcbn0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgdHlwZSB7IFRhc2tQYXJzZXIgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBMaW5lUGFyc2VyLCBwYXJzZVN0cmluZ1Jlc3BvbnNlIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgcGFyc2VSZW1vdGVNZXNzYWdlcyB9IGZyb20gJy4vcGFyc2UtcmVtb3RlLW1lc3NhZ2VzJztcblxuZnVuY3Rpb24gcHVzaFJlc3VsdFB1c2hlZEl0ZW0obG9jYWw6IHN0cmluZywgcmVtb3RlOiBzdHJpbmcsIHN0YXR1czogc3RyaW5nKTogUHVzaFJlc3VsdFB1c2hlZEl0ZW0ge1xuICAgY29uc3QgZGVsZXRlZCA9IHN0YXR1cy5pbmNsdWRlcygnZGVsZXRlZCcpO1xuICAgY29uc3QgdGFnID0gc3RhdHVzLmluY2x1ZGVzKCd0YWcnKSB8fCAvXnJlZnNcXC90YWdzLy50ZXN0KGxvY2FsKTtcbiAgIGNvbnN0IGFscmVhZHlVcGRhdGVkID0gIXN0YXR1cy5pbmNsdWRlcygnbmV3Jyk7XG5cbiAgIHJldHVybiB7XG4gICAgICBkZWxldGVkLFxuICAgICAgdGFnLFxuICAgICAgYnJhbmNoOiAhdGFnLFxuICAgICAgbmV3OiAhYWxyZWFkeVVwZGF0ZWQsXG4gICAgICBhbHJlYWR5VXBkYXRlZCxcbiAgICAgIGxvY2FsLFxuICAgICAgcmVtb3RlLFxuICAgfTtcbn1cblxuY29uc3QgcGFyc2VyczogTGluZVBhcnNlcjxQdXNoRGV0YWlsPltdID0gW1xuICAgbmV3IExpbmVQYXJzZXIoL15QdXNoaW5nIHRvICguKykkLywgKHJlc3VsdCwgW3JlcG9dKSA9PiB7XG4gICAgICByZXN1bHQucmVwbyA9IHJlcG87XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyKC9edXBkYXRpbmcgbG9jYWwgdHJhY2tpbmcgcmVmICcoLispJy8sIChyZXN1bHQsIFtsb2NhbF0pID0+IHtcbiAgICAgIHJlc3VsdC5yZWYgPSB7XG4gICAgICAgICAuLi4ocmVzdWx0LnJlZiB8fCB7fSksXG4gICAgICAgICBsb2NhbCxcbiAgICAgIH07XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyKC9eWz0qLV1cXHMrKFteOl0rKTooXFxTKylcXHMrXFxbKC4rKV0kLywgKHJlc3VsdCwgW2xvY2FsLCByZW1vdGUsIHR5cGVdKSA9PiB7XG4gICAgICByZXN1bHQucHVzaGVkLnB1c2gocHVzaFJlc3VsdFB1c2hlZEl0ZW0obG9jYWwsIHJlbW90ZSwgdHlwZSkpO1xuICAgfSksXG4gICBuZXcgTGluZVBhcnNlcihcbiAgICAgIC9eQnJhbmNoICcoW14nXSspJyBzZXQgdXAgdG8gdHJhY2sgcmVtb3RlIGJyYW5jaCAnKFteJ10rKScgZnJvbSAnKFteJ10rKScvLFxuICAgICAgKHJlc3VsdCwgW2xvY2FsLCByZW1vdGUsIHJlbW90ZU5hbWVdKSA9PiB7XG4gICAgICAgICByZXN1bHQuYnJhbmNoID0ge1xuICAgICAgICAgICAgLi4uKHJlc3VsdC5icmFuY2ggfHwge30pLFxuICAgICAgICAgICAgbG9jYWwsXG4gICAgICAgICAgICByZW1vdGUsXG4gICAgICAgICAgICByZW1vdGVOYW1lLFxuICAgICAgICAgfTtcbiAgICAgIH1cbiAgICksXG4gICBuZXcgTGluZVBhcnNlcihcbiAgICAgIC9eKFteOl0rKTooXFxTKylcXHMrKFthLXowLTldKylcXC5cXC4oW2EtejAtOV0rKSQvLFxuICAgICAgKHJlc3VsdCwgW2xvY2FsLCByZW1vdGUsIGZyb20sIHRvXSkgPT4ge1xuICAgICAgICAgcmVzdWx0LnVwZGF0ZSA9IHtcbiAgICAgICAgICAgIGhlYWQ6IHtcbiAgICAgICAgICAgICAgIGxvY2FsLFxuICAgICAgICAgICAgICAgcmVtb3RlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhhc2g6IHtcbiAgICAgICAgICAgICAgIGZyb20sXG4gICAgICAgICAgICAgICB0byxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICB9O1xuICAgICAgfVxuICAgKSxcbl07XG5cbmV4cG9ydCBjb25zdCBwYXJzZVB1c2hSZXN1bHQ6IFRhc2tQYXJzZXI8c3RyaW5nLCBQdXNoUmVzdWx0PiA9IChzdGRPdXQsIHN0ZEVycikgPT4ge1xuICAgY29uc3QgcHVzaERldGFpbCA9IHBhcnNlUHVzaERldGFpbChzdGRPdXQsIHN0ZEVycik7XG4gICBjb25zdCByZXNwb25zZURldGFpbCA9IHBhcnNlUmVtb3RlTWVzc2FnZXM8UHVzaFJlc3VsdFJlbW90ZU1lc3NhZ2VzPihzdGRPdXQsIHN0ZEVycik7XG5cbiAgIHJldHVybiB7XG4gICAgICAuLi5wdXNoRGV0YWlsLFxuICAgICAgLi4ucmVzcG9uc2VEZXRhaWwsXG4gICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHBhcnNlUHVzaERldGFpbDogVGFza1BhcnNlcjxzdHJpbmcsIFB1c2hEZXRhaWw+ID0gKHN0ZE91dCwgc3RkRXJyKSA9PiB7XG4gICByZXR1cm4gcGFyc2VTdHJpbmdSZXNwb25zZSh7IHB1c2hlZDogW10gfSwgcGFyc2VycywgW3N0ZE91dCwgc3RkRXJyXSk7XG59O1xuIiwgImltcG9ydCB0eXBlIHsgUHVzaFJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgcGFyc2VQdXNoUmVzdWx0IGFzIHBhcnNlciB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2UtcHVzaCc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBhcHBlbmQsIHJlbW92ZSB9IGZyb20gJy4uL3V0aWxzJztcblxudHlwZSBQdXNoUmVmID0geyByZW1vdGU/OiBzdHJpbmc7IGJyYW5jaD86IHN0cmluZyB9O1xuXG5leHBvcnQgZnVuY3Rpb24gcHVzaFRhZ3NUYXNrKHJlZjogUHVzaFJlZiA9IHt9LCBjdXN0b21BcmdzOiBzdHJpbmdbXSk6IFN0cmluZ1Rhc2s8UHVzaFJlc3VsdD4ge1xuICAgYXBwZW5kKGN1c3RvbUFyZ3MsICctLXRhZ3MnKTtcbiAgIHJldHVybiBwdXNoVGFzayhyZWYsIGN1c3RvbUFyZ3MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHVzaFRhc2socmVmOiBQdXNoUmVmID0ge30sIGN1c3RvbUFyZ3M6IHN0cmluZ1tdKTogU3RyaW5nVGFzazxQdXNoUmVzdWx0PiB7XG4gICBjb25zdCBjb21tYW5kcyA9IFsncHVzaCcsIC4uLmN1c3RvbUFyZ3NdO1xuICAgaWYgKHJlZi5icmFuY2gpIHtcbiAgICAgIGNvbW1hbmRzLnNwbGljZSgxLCAwLCByZWYuYnJhbmNoKTtcbiAgIH1cbiAgIGlmIChyZWYucmVtb3RlKSB7XG4gICAgICBjb21tYW5kcy5zcGxpY2UoMSwgMCwgcmVmLnJlbW90ZSk7XG4gICB9XG5cbiAgIHJlbW92ZShjb21tYW5kcywgJy12Jyk7XG4gICBhcHBlbmQoY29tbWFuZHMsICctLXZlcmJvc2UnKTtcbiAgIGFwcGVuZChjb21tYW5kcywgJy0tcG9yY2VsYWluJyk7XG5cbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kcyxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIHBhcnNlcixcbiAgIH07XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0QXBpIH0gZnJvbSAnLi4vc2ltcGxlLWdpdC1hcGknO1xuaW1wb3J0IHsgZ2V0VHJhaWxpbmdPcHRpb25zLCB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBzdHJhaWdodFRocm91Z2hCdWZmZXJUYXNrLCBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCk6IFBpY2s8U2ltcGxlR2l0LCAnc2hvd0J1ZmZlcicgfCAnc2hvdyc+IHtcbiAgIHJldHVybiB7XG4gICAgICBzaG93QnVmZmVyKHRoaXM6IFNpbXBsZUdpdEFwaSkge1xuICAgICAgICAgY29uc3QgY29tbWFuZHMgPSBbJ3Nob3cnLCAuLi5nZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzLCAxKV07XG4gICAgICAgICBpZiAoIWNvbW1hbmRzLmluY2x1ZGVzKCctLWJpbmFyeScpKSB7XG4gICAgICAgICAgICBjb21tYW5kcy5zcGxpY2UoMSwgMCwgJy0tYmluYXJ5Jyk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgc3RyYWlnaHRUaHJvdWdoQnVmZmVyVGFzayhjb21tYW5kcyksXG4gICAgICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgICAgKTtcbiAgICAgIH0sXG5cbiAgICAgIHNob3codGhpczogU2ltcGxlR2l0QXBpKSB7XG4gICAgICAgICBjb25zdCBjb21tYW5kcyA9IFsnc2hvdycsIC4uLmdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMsIDEpXTtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgICAgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhjb21tYW5kcyksXG4gICAgICAgICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgICAgICAgKTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgRmlsZVN0YXR1c1Jlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuXG5leHBvcnQgY29uc3QgZnJvbVBhdGhSZWdleCA9IC9eKC4rKVxcMCguKykkLztcblxuZXhwb3J0IGNsYXNzIEZpbGVTdGF0dXNTdW1tYXJ5IGltcGxlbWVudHMgRmlsZVN0YXR1c1Jlc3VsdCB7XG4gICBwdWJsaWMgcmVhZG9ubHkgZnJvbTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBwYXRoOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgaW5kZXg6IHN0cmluZyxcbiAgICAgIHB1YmxpYyB3b3JraW5nX2Rpcjogc3RyaW5nXG4gICApIHtcbiAgICAgIGlmIChpbmRleCA9PT0gJ1InIHx8IHdvcmtpbmdfZGlyID09PSAnUicpIHtcbiAgICAgICAgIGNvbnN0IGRldGFpbCA9IGZyb21QYXRoUmVnZXguZXhlYyhwYXRoKSB8fCBbbnVsbCwgcGF0aCwgcGF0aF07XG4gICAgICAgICB0aGlzLmZyb20gPSBkZXRhaWxbMl0gfHwgJyc7XG4gICAgICAgICB0aGlzLnBhdGggPSBkZXRhaWxbMV0gfHwgJyc7XG4gICAgICB9XG4gICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBTdGF0dXNSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IGZpbHRlclN0cmluZywgZmlsdGVyVHlwZSwgTlVMTCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IEZpbGVTdGF0dXNTdW1tYXJ5IH0gZnJvbSAnLi9GaWxlU3RhdHVzU3VtbWFyeSc7XG5cbnR5cGUgU3RhdHVzTGluZVBhcnNlciA9IChyZXN1bHQ6IFN0YXR1c1Jlc3VsdCwgZmlsZTogc3RyaW5nKSA9PiB2b2lkO1xuXG5leHBvcnQgY2xhc3MgU3RhdHVzU3VtbWFyeSBpbXBsZW1lbnRzIFN0YXR1c1Jlc3VsdCB7XG4gICBwdWJsaWMgbm90X2FkZGVkID0gW107XG4gICBwdWJsaWMgY29uZmxpY3RlZCA9IFtdO1xuICAgcHVibGljIGNyZWF0ZWQgPSBbXTtcbiAgIHB1YmxpYyBkZWxldGVkID0gW107XG4gICBwdWJsaWMgaWdub3JlZCA9IHVuZGVmaW5lZDtcbiAgIHB1YmxpYyBtb2RpZmllZCA9IFtdO1xuICAgcHVibGljIHJlbmFtZWQgPSBbXTtcbiAgIHB1YmxpYyBmaWxlcyA9IFtdO1xuICAgcHVibGljIHN0YWdlZCA9IFtdO1xuICAgcHVibGljIGFoZWFkID0gMDtcbiAgIHB1YmxpYyBiZWhpbmQgPSAwO1xuICAgcHVibGljIGN1cnJlbnQgPSBudWxsO1xuICAgcHVibGljIHRyYWNraW5nID0gbnVsbDtcbiAgIHB1YmxpYyBkZXRhY2hlZCA9IGZhbHNlO1xuXG4gICBwdWJsaWMgaXNDbGVhbiA9ICgpID0+IHtcbiAgICAgIHJldHVybiAhdGhpcy5maWxlcy5sZW5ndGg7XG4gICB9O1xufVxuXG5lbnVtIFBvcmNlbGFpbkZpbGVTdGF0dXMge1xuICAgQURERUQgPSAnQScsXG4gICBERUxFVEVEID0gJ0QnLFxuICAgTU9ESUZJRUQgPSAnTScsXG4gICBSRU5BTUVEID0gJ1InLFxuICAgQ09QSUVEID0gJ0MnLFxuICAgVU5NRVJHRUQgPSAnVScsXG4gICBVTlRSQUNLRUQgPSAnPycsXG4gICBJR05PUkVEID0gJyEnLFxuICAgTk9ORSA9ICcgJyxcbn1cblxuZnVuY3Rpb24gcmVuYW1lZEZpbGUobGluZTogc3RyaW5nKSB7XG4gICBjb25zdCBbdG8sIGZyb21dID0gbGluZS5zcGxpdChOVUxMKTtcblxuICAgcmV0dXJuIHtcbiAgICAgIGZyb206IGZyb20gfHwgdG8sXG4gICAgICB0byxcbiAgIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlcihcbiAgIGluZGV4WDogUG9yY2VsYWluRmlsZVN0YXR1cyxcbiAgIGluZGV4WTogUG9yY2VsYWluRmlsZVN0YXR1cyxcbiAgIGhhbmRsZXI6IFN0YXR1c0xpbmVQYXJzZXJcbik6IFtzdHJpbmcsIFN0YXR1c0xpbmVQYXJzZXJdIHtcbiAgIHJldHVybiBbYCR7aW5kZXhYfSR7aW5kZXhZfWAsIGhhbmRsZXJdO1xufVxuXG5mdW5jdGlvbiBjb25mbGljdHMoaW5kZXhYOiBQb3JjZWxhaW5GaWxlU3RhdHVzLCAuLi5pbmRleFk6IFBvcmNlbGFpbkZpbGVTdGF0dXNbXSkge1xuICAgcmV0dXJuIGluZGV4WS5tYXAoKHkpID0+IHBhcnNlcihpbmRleFgsIHksIChyZXN1bHQsIGZpbGUpID0+IHJlc3VsdC5jb25mbGljdGVkLnB1c2goZmlsZSkpKTtcbn1cblxuY29uc3QgcGFyc2VyczogTWFwPHN0cmluZywgU3RhdHVzTGluZVBhcnNlcj4gPSBuZXcgTWFwKFtcbiAgIHBhcnNlcihQb3JjZWxhaW5GaWxlU3RhdHVzLk5PTkUsIFBvcmNlbGFpbkZpbGVTdGF0dXMuQURERUQsIChyZXN1bHQsIGZpbGUpID0+XG4gICAgICByZXN1bHQuY3JlYXRlZC5wdXNoKGZpbGUpXG4gICApLFxuICAgcGFyc2VyKFBvcmNlbGFpbkZpbGVTdGF0dXMuTk9ORSwgUG9yY2VsYWluRmlsZVN0YXR1cy5ERUxFVEVELCAocmVzdWx0LCBmaWxlKSA9PlxuICAgICAgcmVzdWx0LmRlbGV0ZWQucHVzaChmaWxlKVxuICAgKSxcbiAgIHBhcnNlcihQb3JjZWxhaW5GaWxlU3RhdHVzLk5PTkUsIFBvcmNlbGFpbkZpbGVTdGF0dXMuTU9ESUZJRUQsIChyZXN1bHQsIGZpbGUpID0+XG4gICAgICByZXN1bHQubW9kaWZpZWQucHVzaChmaWxlKVxuICAgKSxcblxuICAgcGFyc2VyKFBvcmNlbGFpbkZpbGVTdGF0dXMuQURERUQsIFBvcmNlbGFpbkZpbGVTdGF0dXMuTk9ORSwgKHJlc3VsdCwgZmlsZSkgPT4ge1xuICAgICAgcmVzdWx0LmNyZWF0ZWQucHVzaChmaWxlKTtcbiAgICAgIHJlc3VsdC5zdGFnZWQucHVzaChmaWxlKTtcbiAgIH0pLFxuICAgcGFyc2VyKFBvcmNlbGFpbkZpbGVTdGF0dXMuQURERUQsIFBvcmNlbGFpbkZpbGVTdGF0dXMuTU9ESUZJRUQsIChyZXN1bHQsIGZpbGUpID0+IHtcbiAgICAgIHJlc3VsdC5jcmVhdGVkLnB1c2goZmlsZSk7XG4gICAgICByZXN1bHQuc3RhZ2VkLnB1c2goZmlsZSk7XG4gICAgICByZXN1bHQubW9kaWZpZWQucHVzaChmaWxlKTtcbiAgIH0pLFxuXG4gICBwYXJzZXIoUG9yY2VsYWluRmlsZVN0YXR1cy5ERUxFVEVELCBQb3JjZWxhaW5GaWxlU3RhdHVzLk5PTkUsIChyZXN1bHQsIGZpbGUpID0+IHtcbiAgICAgIHJlc3VsdC5kZWxldGVkLnB1c2goZmlsZSk7XG4gICAgICByZXN1bHQuc3RhZ2VkLnB1c2goZmlsZSk7XG4gICB9KSxcblxuICAgcGFyc2VyKFBvcmNlbGFpbkZpbGVTdGF0dXMuTU9ESUZJRUQsIFBvcmNlbGFpbkZpbGVTdGF0dXMuTk9ORSwgKHJlc3VsdCwgZmlsZSkgPT4ge1xuICAgICAgcmVzdWx0Lm1vZGlmaWVkLnB1c2goZmlsZSk7XG4gICAgICByZXN1bHQuc3RhZ2VkLnB1c2goZmlsZSk7XG4gICB9KSxcbiAgIHBhcnNlcihQb3JjZWxhaW5GaWxlU3RhdHVzLk1PRElGSUVELCBQb3JjZWxhaW5GaWxlU3RhdHVzLk1PRElGSUVELCAocmVzdWx0LCBmaWxlKSA9PiB7XG4gICAgICByZXN1bHQubW9kaWZpZWQucHVzaChmaWxlKTtcbiAgICAgIHJlc3VsdC5zdGFnZWQucHVzaChmaWxlKTtcbiAgIH0pLFxuXG4gICBwYXJzZXIoUG9yY2VsYWluRmlsZVN0YXR1cy5SRU5BTUVELCBQb3JjZWxhaW5GaWxlU3RhdHVzLk5PTkUsIChyZXN1bHQsIGZpbGUpID0+IHtcbiAgICAgIHJlc3VsdC5yZW5hbWVkLnB1c2gocmVuYW1lZEZpbGUoZmlsZSkpO1xuICAgfSksXG4gICBwYXJzZXIoUG9yY2VsYWluRmlsZVN0YXR1cy5SRU5BTUVELCBQb3JjZWxhaW5GaWxlU3RhdHVzLk1PRElGSUVELCAocmVzdWx0LCBmaWxlKSA9PiB7XG4gICAgICBjb25zdCByZW5hbWVkID0gcmVuYW1lZEZpbGUoZmlsZSk7XG4gICAgICByZXN1bHQucmVuYW1lZC5wdXNoKHJlbmFtZWQpO1xuICAgICAgcmVzdWx0Lm1vZGlmaWVkLnB1c2gocmVuYW1lZC50byk7XG4gICB9KSxcbiAgIHBhcnNlcihQb3JjZWxhaW5GaWxlU3RhdHVzLklHTk9SRUQsIFBvcmNlbGFpbkZpbGVTdGF0dXMuSUdOT1JFRCwgKF9yZXN1bHQsIF9maWxlKSA9PiB7XG4gICAgICAoX3Jlc3VsdC5pZ25vcmVkID0gX3Jlc3VsdC5pZ25vcmVkIHx8IFtdKS5wdXNoKF9maWxlKTtcbiAgIH0pLFxuXG4gICBwYXJzZXIoUG9yY2VsYWluRmlsZVN0YXR1cy5VTlRSQUNLRUQsIFBvcmNlbGFpbkZpbGVTdGF0dXMuVU5UUkFDS0VELCAocmVzdWx0LCBmaWxlKSA9PlxuICAgICAgcmVzdWx0Lm5vdF9hZGRlZC5wdXNoKGZpbGUpXG4gICApLFxuXG4gICAuLi5jb25mbGljdHMoUG9yY2VsYWluRmlsZVN0YXR1cy5BRERFRCwgUG9yY2VsYWluRmlsZVN0YXR1cy5BRERFRCwgUG9yY2VsYWluRmlsZVN0YXR1cy5VTk1FUkdFRCksXG4gICAuLi5jb25mbGljdHMoXG4gICAgICBQb3JjZWxhaW5GaWxlU3RhdHVzLkRFTEVURUQsXG4gICAgICBQb3JjZWxhaW5GaWxlU3RhdHVzLkRFTEVURUQsXG4gICAgICBQb3JjZWxhaW5GaWxlU3RhdHVzLlVOTUVSR0VEXG4gICApLFxuICAgLi4uY29uZmxpY3RzKFxuICAgICAgUG9yY2VsYWluRmlsZVN0YXR1cy5VTk1FUkdFRCxcbiAgICAgIFBvcmNlbGFpbkZpbGVTdGF0dXMuQURERUQsXG4gICAgICBQb3JjZWxhaW5GaWxlU3RhdHVzLkRFTEVURUQsXG4gICAgICBQb3JjZWxhaW5GaWxlU3RhdHVzLlVOTUVSR0VEXG4gICApLFxuXG4gICBbXG4gICAgICAnIyMnLFxuICAgICAgKHJlc3VsdCwgbGluZSkgPT4ge1xuICAgICAgICAgY29uc3QgYWhlYWRSZWcgPSAvYWhlYWQgKFxcZCspLztcbiAgICAgICAgIGNvbnN0IGJlaGluZFJlZyA9IC9iZWhpbmQgKFxcZCspLztcbiAgICAgICAgIGNvbnN0IGN1cnJlbnRSZWcgPSAvXiguKz8oPz0oPzpcXC57M318XFxzfCQpKSkvO1xuICAgICAgICAgY29uc3QgdHJhY2tpbmdSZWcgPSAvXFwuezN9KFxcUyopLztcbiAgICAgICAgIGNvbnN0IG9uRW1wdHlCcmFuY2hSZWcgPSAvXFxzb25cXHMoXFxTKz8pKD89XFwuezN9fCQpLztcblxuICAgICAgICAgbGV0IHJlZ2V4UmVzdWx0ID0gYWhlYWRSZWcuZXhlYyhsaW5lKTtcbiAgICAgICAgIHJlc3VsdC5haGVhZCA9IChyZWdleFJlc3VsdCAmJiArcmVnZXhSZXN1bHRbMV0pIHx8IDA7XG5cbiAgICAgICAgIHJlZ2V4UmVzdWx0ID0gYmVoaW5kUmVnLmV4ZWMobGluZSk7XG4gICAgICAgICByZXN1bHQuYmVoaW5kID0gKHJlZ2V4UmVzdWx0ICYmICtyZWdleFJlc3VsdFsxXSkgfHwgMDtcblxuICAgICAgICAgcmVnZXhSZXN1bHQgPSBjdXJyZW50UmVnLmV4ZWMobGluZSk7XG4gICAgICAgICByZXN1bHQuY3VycmVudCA9IGZpbHRlclR5cGUocmVnZXhSZXN1bHQ/LlsxXSwgZmlsdGVyU3RyaW5nLCBudWxsKTtcblxuICAgICAgICAgcmVnZXhSZXN1bHQgPSB0cmFja2luZ1JlZy5leGVjKGxpbmUpO1xuICAgICAgICAgcmVzdWx0LnRyYWNraW5nID0gZmlsdGVyVHlwZShyZWdleFJlc3VsdD8uWzFdLCBmaWx0ZXJTdHJpbmcsIG51bGwpO1xuXG4gICAgICAgICByZWdleFJlc3VsdCA9IG9uRW1wdHlCcmFuY2hSZWcuZXhlYyhsaW5lKTtcbiAgICAgICAgIGlmIChyZWdleFJlc3VsdCkge1xuICAgICAgICAgICAgcmVzdWx0LmN1cnJlbnQgPSBmaWx0ZXJUeXBlKHJlZ2V4UmVzdWx0Py5bMV0sIGZpbHRlclN0cmluZywgcmVzdWx0LmN1cnJlbnQpO1xuICAgICAgICAgfVxuXG4gICAgICAgICByZXN1bHQuZGV0YWNoZWQgPSAvXFwobm8gYnJhbmNoXFwpLy50ZXN0KGxpbmUpO1xuICAgICAgfSxcbiAgIF0sXG5dKTtcblxuZXhwb3J0IGNvbnN0IHBhcnNlU3RhdHVzU3VtbWFyeSA9IGZ1bmN0aW9uICh0ZXh0OiBzdHJpbmcpOiBTdGF0dXNSZXN1bHQge1xuICAgY29uc3QgbGluZXMgPSB0ZXh0LnNwbGl0KE5VTEwpO1xuICAgY29uc3Qgc3RhdHVzID0gbmV3IFN0YXR1c1N1bW1hcnkoKTtcblxuICAgZm9yIChsZXQgaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyApIHtcbiAgICAgIGxldCBsaW5lID0gbGluZXNbaSsrXS50cmltKCk7XG5cbiAgICAgIGlmICghbGluZSkge1xuICAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChsaW5lLmNoYXJBdCgwKSA9PT0gUG9yY2VsYWluRmlsZVN0YXR1cy5SRU5BTUVEKSB7XG4gICAgICAgICBsaW5lICs9IE5VTEwgKyAobGluZXNbaSsrXSB8fCAnJyk7XG4gICAgICB9XG5cbiAgICAgIHNwbGl0TGluZShzdGF0dXMsIGxpbmUpO1xuICAgfVxuXG4gICByZXR1cm4gc3RhdHVzO1xufTtcblxuZnVuY3Rpb24gc3BsaXRMaW5lKHJlc3VsdDogU3RhdHVzUmVzdWx0LCBsaW5lU3RyOiBzdHJpbmcpIHtcbiAgIGNvbnN0IHRyaW1tZWQgPSBsaW5lU3RyLnRyaW0oKTtcbiAgIHN3aXRjaCAoJyAnKSB7XG4gICAgICBjYXNlIHRyaW1tZWQuY2hhckF0KDIpOlxuICAgICAgICAgcmV0dXJuIGRhdGEodHJpbW1lZC5jaGFyQXQoMCksIHRyaW1tZWQuY2hhckF0KDEpLCB0cmltbWVkLnNsaWNlKDMpKTtcbiAgICAgIGNhc2UgdHJpbW1lZC5jaGFyQXQoMSk6XG4gICAgICAgICByZXR1cm4gZGF0YShQb3JjZWxhaW5GaWxlU3RhdHVzLk5PTkUsIHRyaW1tZWQuY2hhckF0KDApLCB0cmltbWVkLnNsaWNlKDIpKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgICByZXR1cm47XG4gICB9XG5cbiAgIGZ1bmN0aW9uIGRhdGEoaW5kZXg6IHN0cmluZywgd29ya2luZ0Rpcjogc3RyaW5nLCBwYXRoOiBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IHJhdyA9IGAke2luZGV4fSR7d29ya2luZ0Rpcn1gO1xuICAgICAgY29uc3QgaGFuZGxlciA9IHBhcnNlcnMuZ2V0KHJhdyk7XG5cbiAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICBoYW5kbGVyKHJlc3VsdCwgcGF0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyYXcgIT09ICcjIycgJiYgcmF3ICE9PSAnISEnKSB7XG4gICAgICAgICByZXN1bHQuZmlsZXMucHVzaChuZXcgRmlsZVN0YXR1c1N1bW1hcnkocGF0aCwgaW5kZXgsIHdvcmtpbmdEaXIpKTtcbiAgICAgIH1cbiAgIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IFN0YXR1c1Jlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgcGFyc2VTdGF0dXNTdW1tYXJ5IH0gZnJvbSAnLi4vcmVzcG9uc2VzL1N0YXR1c1N1bW1hcnknO1xuaW1wb3J0IHR5cGUgeyBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5jb25zdCBpZ25vcmVkT3B0aW9ucyA9IFsnLS1udWxsJywgJy16J107XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGF0dXNUYXNrKGN1c3RvbUFyZ3M6IHN0cmluZ1tdKTogU3RyaW5nVGFzazxTdGF0dXNSZXN1bHQ+IHtcbiAgIGNvbnN0IGNvbW1hbmRzID0gW1xuICAgICAgJ3N0YXR1cycsXG4gICAgICAnLS1wb3JjZWxhaW4nLFxuICAgICAgJy1iJyxcbiAgICAgICctdScsXG4gICAgICAnLS1udWxsJyxcbiAgICAgIC4uLmN1c3RvbUFyZ3MuZmlsdGVyKChhcmcpID0+ICFpZ25vcmVkT3B0aW9ucy5pbmNsdWRlcyhhcmcpKSxcbiAgIF07XG5cbiAgIHJldHVybiB7XG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBjb21tYW5kcyxcbiAgICAgIHBhcnNlcih0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgIHJldHVybiBwYXJzZVN0YXR1c1N1bW1hcnkodGV4dCk7XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFNpbXBsZUdpdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRBcGkgfSBmcm9tICcuLi9zaW1wbGUtZ2l0LWFwaSc7XG5pbXBvcnQgeyBhc051bWJlciwgRXhpdENvZGVzLCBMaW5lUGFyc2VyLCBwYXJzZVN0cmluZ1Jlc3BvbnNlIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFZlcnNpb25SZXN1bHQge1xuICAgbWFqb3I6IG51bWJlcjtcbiAgIG1pbm9yOiBudW1iZXI7XG4gICBwYXRjaDogbnVtYmVyIHwgc3RyaW5nO1xuICAgYWdlbnQ6IHN0cmluZztcbiAgIGluc3RhbGxlZDogYm9vbGVhbjtcbn1cblxuY29uc3QgTk9UX0lOU1RBTExFRCA9ICdpbnN0YWxsZWQ9ZmFsc2UnO1xuXG5mdW5jdGlvbiB2ZXJzaW9uUmVzcG9uc2UoXG4gICBtYWpvciA9IDAsXG4gICBtaW5vciA9IDAsXG4gICBwYXRjaDogc3RyaW5nIHwgbnVtYmVyID0gMCxcbiAgIGFnZW50ID0gJycsXG4gICBpbnN0YWxsZWQgPSB0cnVlXG4pOiBWZXJzaW9uUmVzdWx0IHtcbiAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gICAgICB7XG4gICAgICAgICBtYWpvcixcbiAgICAgICAgIG1pbm9yLFxuICAgICAgICAgcGF0Y2gsXG4gICAgICAgICBhZ2VudCxcbiAgICAgICAgIGluc3RhbGxlZCxcbiAgICAgIH0sXG4gICAgICAndG9TdHJpbmcnLFxuICAgICAge1xuICAgICAgICAgdmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5tYWpvcn0uJHt0aGlzLm1pbm9yfS4ke3RoaXMucGF0Y2h9YDtcbiAgICAgICAgIH0sXG4gICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB9XG4gICApO1xufVxuXG5mdW5jdGlvbiBub3RJbnN0YWxsZWRSZXNwb25zZSgpIHtcbiAgIHJldHVybiB2ZXJzaW9uUmVzcG9uc2UoMCwgMCwgMCwgJycsIGZhbHNlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCk6IFBpY2s8U2ltcGxlR2l0LCAndmVyc2lvbic+IHtcbiAgIHJldHVybiB7XG4gICAgICB2ZXJzaW9uKHRoaXM6IFNpbXBsZUdpdEFwaSkge1xuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soe1xuICAgICAgICAgICAgY29tbWFuZHM6IFsnLS12ZXJzaW9uJ10sXG4gICAgICAgICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICAgICAgICBwYXJzZXI6IHZlcnNpb25QYXJzZXIsXG4gICAgICAgICAgICBvbkVycm9yKHJlc3VsdCwgZXJyb3IsIGRvbmUsIGZhaWwpIHtcbiAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZXhpdENvZGUgPT09IEV4aXRDb2Rlcy5OT1RfRk9VTkQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKEJ1ZmZlci5mcm9tKE5PVF9JTlNUQUxMRUQpKTtcbiAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgZmFpbChlcnJvcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgfSk7XG4gICAgICB9LFxuICAgfTtcbn1cblxuY29uc3QgcGFyc2VyczogTGluZVBhcnNlcjxWZXJzaW9uUmVzdWx0PltdID0gW1xuICAgbmV3IExpbmVQYXJzZXIoXG4gICAgICAvdmVyc2lvbiAoXFxkKylcXC4oXFxkKylcXC4oXFxkKykoPzpcXHMqXFwoKC4rKVxcKSk/LyxcbiAgICAgIChyZXN1bHQsIFttYWpvciwgbWlub3IsIHBhdGNoLCBhZ2VudCA9ICcnXSkgPT4ge1xuICAgICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgIHZlcnNpb25SZXNwb25zZShhc051bWJlcihtYWpvciksIGFzTnVtYmVyKG1pbm9yKSwgYXNOdW1iZXIocGF0Y2gpLCBhZ2VudClcbiAgICAgICAgICk7XG4gICAgICB9XG4gICApLFxuICAgbmV3IExpbmVQYXJzZXIoXG4gICAgICAvdmVyc2lvbiAoXFxkKylcXC4oXFxkKylcXC4oXFxEKykoLispPyQvLFxuICAgICAgKHJlc3VsdCwgW21ham9yLCBtaW5vciwgcGF0Y2gsIGFnZW50ID0gJyddKSA9PiB7XG4gICAgICAgICBPYmplY3QuYXNzaWduKHJlc3VsdCwgdmVyc2lvblJlc3BvbnNlKGFzTnVtYmVyKG1ham9yKSwgYXNOdW1iZXIobWlub3IpLCBwYXRjaCwgYWdlbnQpKTtcbiAgICAgIH1cbiAgICksXG5dO1xuXG5mdW5jdGlvbiB2ZXJzaW9uUGFyc2VyKHN0ZE91dDogc3RyaW5nKSB7XG4gICBpZiAoc3RkT3V0ID09PSBOT1RfSU5TVEFMTEVEKSB7XG4gICAgICByZXR1cm4gbm90SW5zdGFsbGVkUmVzcG9uc2UoKTtcbiAgIH1cblxuICAgcmV0dXJuIHBhcnNlU3RyaW5nUmVzcG9uc2UodmVyc2lvblJlc3BvbnNlKDAsIDAsIDAsIHN0ZE91dCksIHBhcnNlcnMsIHN0ZE91dCk7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRCYXNlIH0gZnJvbSAnLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyB0YXNrQ2FsbGJhY2sgfSBmcm9tICcuL3Rhc2stY2FsbGJhY2snO1xuaW1wb3J0IHsgY2hhbmdlV29ya2luZ0RpcmVjdG9yeVRhc2sgfSBmcm9tICcuL3Rhc2tzL2NoYW5nZS13b3JraW5nLWRpcmVjdG9yeSc7XG5pbXBvcnQgY2hlY2tvdXQgZnJvbSAnLi90YXNrcy9jaGVja291dCc7XG5pbXBvcnQgY2xvbmUgZnJvbSAnLi90YXNrcy9jbG9uZSc7XG5pbXBvcnQgY29tbWl0IGZyb20gJy4vdGFza3MvY29tbWl0JztcbmltcG9ydCBjb25maWcgZnJvbSAnLi90YXNrcy9jb25maWcnO1xuaW1wb3J0IGNvdW50T2JqZWN0cyBmcm9tICcuL3Rhc2tzL2NvdW50LW9iamVjdHMnO1xuaW1wb3J0IGZpcnN0Q29tbWl0IGZyb20gJy4vdGFza3MvZmlyc3QtY29tbWl0JztcbmltcG9ydCBncmVwIGZyb20gJy4vdGFza3MvZ3JlcCc7XG5pbXBvcnQgeyBoYXNoT2JqZWN0VGFzayB9IGZyb20gJy4vdGFza3MvaGFzaC1vYmplY3QnO1xuaW1wb3J0IHsgaW5pdFRhc2sgfSBmcm9tICcuL3Rhc2tzL2luaXQnO1xuaW1wb3J0IGludGVycHJldFRyYWlsZXJzIGZyb20gJy4vdGFza3MvaW50ZXJwcmV0LXRyYWlsZXJzJztcbmltcG9ydCBsb2cgZnJvbSAnLi90YXNrcy9sb2cnO1xuaW1wb3J0IHsgbWVyZ2VUYXNrIH0gZnJvbSAnLi90YXNrcy9tZXJnZSc7XG5pbXBvcnQgeyBwdXNoVGFzayB9IGZyb20gJy4vdGFza3MvcHVzaCc7XG5pbXBvcnQgc2hvdyBmcm9tICcuL3Rhc2tzL3Nob3cnO1xuaW1wb3J0IHsgc3RhdHVzVGFzayB9IGZyb20gJy4vdGFza3Mvc3RhdHVzJztcbmltcG9ydCB7IGNvbmZpZ3VyYXRpb25FcnJvclRhc2ssIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2sgfSBmcm9tICcuL3Rhc2tzL3Rhc2snO1xuaW1wb3J0IHZlcnNpb24gZnJvbSAnLi90YXNrcy92ZXJzaW9uJztcbmltcG9ydCB0eXBlIHtcbiAgIG91dHB1dEhhbmRsZXIsXG4gICBTaW1wbGVHaXRFeGVjdXRvcixcbiAgIFNpbXBsZUdpdFRhc2ssXG4gICBTaW1wbGVHaXRUYXNrQ2FsbGJhY2ssXG59IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtcbiAgIGFzQXJyYXksXG4gICBmaWx0ZXJTdHJpbmcsXG4gICBmaWx0ZXJUeXBlLFxuICAgZ2V0VHJhaWxpbmdPcHRpb25zLFxuICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50LFxufSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGNsYXNzIFNpbXBsZUdpdEFwaSBpbXBsZW1lbnRzIFNpbXBsZUdpdEJhc2Uge1xuICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZXhlY3V0b3I6IFNpbXBsZUdpdEV4ZWN1dG9yKSB7fVxuXG4gICBwcm90ZWN0ZWQgX3J1blRhc2s8VD4odGFzazogU2ltcGxlR2l0VGFzazxUPiwgdGhlbj86IFNpbXBsZUdpdFRhc2tDYWxsYmFjazxUPikge1xuICAgICAgY29uc3QgY2hhaW4gPSB0aGlzLl9leGVjdXRvci5jaGFpbigpO1xuICAgICAgY29uc3QgcHJvbWlzZSA9IGNoYWluLnB1c2godGFzayk7XG5cbiAgICAgIGlmICh0aGVuKSB7XG4gICAgICAgICB0YXNrQ2FsbGJhY2sodGFzaywgcHJvbWlzZSwgdGhlbik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKHRoaXMsIHtcbiAgICAgICAgIHRoZW46IHsgdmFsdWU6IHByb21pc2UudGhlbi5iaW5kKHByb21pc2UpIH0sXG4gICAgICAgICBjYXRjaDogeyB2YWx1ZTogcHJvbWlzZS5jYXRjaC5iaW5kKHByb21pc2UpIH0sXG4gICAgICAgICBfZXhlY3V0b3I6IHsgdmFsdWU6IGNoYWluIH0sXG4gICAgICB9KTtcbiAgIH1cblxuICAgYWRkKGZpbGVzOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKFsnYWRkJywgLi4uYXNBcnJheShmaWxlcyldKSxcbiAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICApO1xuICAgfVxuXG4gICBjd2QoZGlyZWN0b3J5OiBzdHJpbmcgfCB7IHBhdGg6IHN0cmluZzsgcm9vdD86IGJvb2xlYW4gfSkge1xuICAgICAgY29uc3QgbmV4dCA9IHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpO1xuXG4gICAgICBpZiAodHlwZW9mIGRpcmVjdG9yeSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKGNoYW5nZVdvcmtpbmdEaXJlY3RvcnlUYXNrKGRpcmVjdG9yeSwgdGhpcy5fZXhlY3V0b3IpLCBuZXh0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBkaXJlY3Rvcnk/LnBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgICAgIGNoYW5nZVdvcmtpbmdEaXJlY3RvcnlUYXNrKFxuICAgICAgICAgICAgICAgZGlyZWN0b3J5LnBhdGgsXG4gICAgICAgICAgICAgICAoZGlyZWN0b3J5LnJvb3QgJiYgdGhpcy5fZXhlY3V0b3IpIHx8IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG5leHRcbiAgICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgY29uZmlndXJhdGlvbkVycm9yVGFzaygnR2l0LmN3ZDogd29ya2luZ0RpcmVjdG9yeSBtdXN0IGJlIHN1cHBsaWVkIGFzIGEgc3RyaW5nJyksXG4gICAgICAgICBuZXh0XG4gICAgICApO1xuICAgfVxuXG4gICBoYXNoT2JqZWN0KHBhdGg6IHN0cmluZywgd3JpdGU6IGJvb2xlYW4gfCB1bmtub3duKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgIGhhc2hPYmplY3RUYXNrKHBhdGgsIHdyaXRlID09PSB0cnVlKSxcbiAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICApO1xuICAgfVxuXG4gICBpbml0KGJhcmU/OiBib29sZWFuIHwgdW5rbm93bikge1xuICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICBpbml0VGFzayhiYXJlID09PSB0cnVlLCB0aGlzLl9leGVjdXRvci5jd2QsIGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpKSxcbiAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICApO1xuICAgfVxuXG4gICBtZXJnZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgbWVyZ2VUYXNrKGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpKSxcbiAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICApO1xuICAgfVxuXG4gICBtZXJnZUZyb21UbyhyZW1vdGU6IHN0cmluZywgYnJhbmNoOiBzdHJpbmcpIHtcbiAgICAgIGlmICghKGZpbHRlclN0cmluZyhyZW1vdGUpICYmIGZpbHRlclN0cmluZyhicmFuY2gpKSkge1xuICAgICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICAgICBjb25maWd1cmF0aW9uRXJyb3JUYXNrKFxuICAgICAgICAgICAgICAgYEdpdC5tZXJnZUZyb21UbyByZXF1aXJlcyB0aGF0IHRoZSAncmVtb3RlJyBhbmQgJ2JyYW5jaCcgYXJndW1lbnRzIGFyZSBzdXBwbGllZCBhcyBzdHJpbmdzYFxuICAgICAgICAgICAgKVxuICAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICAgICBtZXJnZVRhc2soW3JlbW90ZSwgYnJhbmNoLCAuLi5nZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKV0pLFxuICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cywgZmFsc2UpXG4gICAgICApO1xuICAgfVxuXG4gICBvdXRwdXRIYW5kbGVyKGhhbmRsZXI6IG91dHB1dEhhbmRsZXIpIHtcbiAgICAgIHRoaXMuX2V4ZWN1dG9yLm91dHB1dEhhbmRsZXIgPSBoYW5kbGVyO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICB9XG5cbiAgIHB1c2goKSB7XG4gICAgICBjb25zdCB0YXNrID0gcHVzaFRhc2soXG4gICAgICAgICB7XG4gICAgICAgICAgICByZW1vdGU6IGZpbHRlclR5cGUoYXJndW1lbnRzWzBdLCBmaWx0ZXJTdHJpbmcpLFxuICAgICAgICAgICAgYnJhbmNoOiBmaWx0ZXJUeXBlKGFyZ3VtZW50c1sxXSwgZmlsdGVyU3RyaW5nKSxcbiAgICAgICAgIH0sXG4gICAgICAgICBnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKVxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2sodGFzaywgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cykpO1xuICAgfVxuXG4gICBzdGFzaCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhbJ3N0YXNoJywgLi4uZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cyldKSxcbiAgICAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICAgICApO1xuICAgfVxuXG4gICBzdGF0dXMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgICAgIHN0YXR1c1Rhc2soZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cykpLFxuICAgICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICAgICk7XG4gICB9XG59XG5cbk9iamVjdC5hc3NpZ24oXG4gICBTaW1wbGVHaXRBcGkucHJvdG90eXBlLFxuICAgY2hlY2tvdXQoKSxcbiAgIGNsb25lKCksXG4gICBjb21taXQoKSxcbiAgIGNvbmZpZygpLFxuICAgY291bnRPYmplY3RzKCksXG4gICBmaXJzdENvbW1pdCgpLFxuICAgZ3JlcCgpLFxuICAgaW50ZXJwcmV0VHJhaWxlcnMoKSxcbiAgIGxvZygpLFxuICAgc2hvdygpLFxuICAgdmVyc2lvbigpXG4pO1xuIiwgImltcG9ydCB7IGNyZWF0ZURlZmVycmVkLCB0eXBlIERlZmVycmVkUHJvbWlzZSB9IGZyb20gJ0Brd3NpdGVzL3Byb21pc2UtZGVmZXJyZWQnO1xuXG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tICcuLi9naXQtbG9nZ2VyJztcbmltcG9ydCB7IGFwcGVuZCwgcmVtb3ZlIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG50eXBlIFNjaGVkdWxlQ29tcGxldGVDYWxsYmFjayA9ICgpID0+IHZvaWQ7XG50eXBlIFNjaGVkdWxlZFRhc2sgPSBQaWNrPERlZmVycmVkUHJvbWlzZTxTY2hlZHVsZUNvbXBsZXRlQ2FsbGJhY2s+LCAncHJvbWlzZScgfCAnZG9uZSc+ICYge1xuICAgaWQ6IG51bWJlcjtcbn07XG5cbmNvbnN0IGNyZWF0ZVNjaGVkdWxlZFRhc2s6ICgpID0+IFNjaGVkdWxlZFRhc2sgPSAoKCkgPT4ge1xuICAgbGV0IGlkID0gMDtcbiAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZCsrO1xuICAgICAgY29uc3QgeyBwcm9taXNlLCBkb25lIH0gPSBjcmVhdGVEZWZlcnJlZDxTY2hlZHVsZUNvbXBsZXRlQ2FsbGJhY2s+KCk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgICBwcm9taXNlLFxuICAgICAgICAgZG9uZSxcbiAgICAgICAgIGlkLFxuICAgICAgfTtcbiAgIH07XG59KSgpO1xuXG5leHBvcnQgY2xhc3MgU2NoZWR1bGVyIHtcbiAgIHByaXZhdGUgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKCcnLCAnc2NoZWR1bGVyJyk7XG4gICBwcml2YXRlIHBlbmRpbmc6IFNjaGVkdWxlZFRhc2tbXSA9IFtdO1xuICAgcHJpdmF0ZSBydW5uaW5nOiBTY2hlZHVsZWRUYXNrW10gPSBbXTtcblxuICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25jdXJyZW5jeSA9IDIpIHtcbiAgICAgIHRoaXMubG9nZ2VyKGBDb25zdHJ1Y3RlZCwgY29uY3VycmVuY3k9JXNgLCBjb25jdXJyZW5jeSk7XG4gICB9XG5cbiAgIHByaXZhdGUgc2NoZWR1bGUoKSB7XG4gICAgICBpZiAoIXRoaXMucGVuZGluZy5sZW5ndGggfHwgdGhpcy5ydW5uaW5nLmxlbmd0aCA+PSB0aGlzLmNvbmN1cnJlbmN5KSB7XG4gICAgICAgICB0aGlzLmxvZ2dlcihcbiAgICAgICAgICAgIGBTY2hlZHVsZSBhdHRlbXB0IGlnbm9yZWQsIHBlbmRpbmc9JXMgcnVubmluZz0lcyBjb25jdXJyZW5jeT0lc2AsXG4gICAgICAgICAgICB0aGlzLnBlbmRpbmcubGVuZ3RoLFxuICAgICAgICAgICAgdGhpcy5ydW5uaW5nLmxlbmd0aCxcbiAgICAgICAgICAgIHRoaXMuY29uY3VycmVuY3lcbiAgICAgICAgICk7XG4gICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRhc2sgPSBhcHBlbmQodGhpcy5ydW5uaW5nLCB0aGlzLnBlbmRpbmcuc2hpZnQoKSEpO1xuICAgICAgdGhpcy5sb2dnZXIoYEF0dGVtcHRpbmcgaWQ9JXNgLCB0YXNrLmlkKTtcbiAgICAgIHRhc2suZG9uZSgoKSA9PiB7XG4gICAgICAgICB0aGlzLmxvZ2dlcihgQ29tcGxldGluZyBpZD1gLCB0YXNrLmlkKTtcbiAgICAgICAgIHJlbW92ZSh0aGlzLnJ1bm5pbmcsIHRhc2spO1xuICAgICAgICAgdGhpcy5zY2hlZHVsZSgpO1xuICAgICAgfSk7XG4gICB9XG5cbiAgIG5leHQoKTogUHJvbWlzZTxTY2hlZHVsZUNvbXBsZXRlQ2FsbGJhY2s+IHtcbiAgICAgIGNvbnN0IHsgcHJvbWlzZSwgaWQgfSA9IGFwcGVuZCh0aGlzLnBlbmRpbmcsIGNyZWF0ZVNjaGVkdWxlZFRhc2soKSk7XG4gICAgICB0aGlzLmxvZ2dlcihgU2NoZWR1bGluZyBpZD0lc2AsIGlkKTtcblxuICAgICAgdGhpcy5zY2hlZHVsZSgpO1xuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IE9wdGlvbkZsYWdzLCBPcHRpb25zLCBTdHJpbmdUYXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmV4cG9ydCB0eXBlIEFwcGx5T3B0aW9ucyA9IE9wdGlvbnMgJlxuICAgT3B0aW9uRmxhZ3M8XG4gICAgICB8ICctLXN0YXQnXG4gICAgICB8ICctLW51bXN0YXQnXG4gICAgICB8ICctLXN1bW1hcnknXG4gICAgICB8ICctLWNoZWNrJ1xuICAgICAgfCAnLS1pbmRleCdcbiAgICAgIHwgJy0taW50ZW50LXRvLWFkZCdcbiAgICAgIHwgJy0tM3dheSdcbiAgICAgIHwgJy0tYXBwbHknXG4gICAgICB8ICctLW5vLWFkZCdcbiAgICAgIHwgJy1SJ1xuICAgICAgfCAnLS1yZXZlcnNlJ1xuICAgICAgfCAnLS1hbGxvdy1iaW5hcnktcmVwbGFjZW1lbnQnXG4gICAgICB8ICctLWJpbmFyeSdcbiAgICAgIHwgJy0tcmVqZWN0J1xuICAgICAgfCAnLXonXG4gICAgICB8ICctLWluYWNjdXJhdGUtZW9mJ1xuICAgICAgfCAnLS1yZWNvdW50J1xuICAgICAgfCAnLS1jYWNoZWQnXG4gICAgICB8ICctLWlnbm9yZS1zcGFjZS1jaGFuZ2UnXG4gICAgICB8ICctLWlnbm9yZS13aGl0ZXNwYWNlJ1xuICAgICAgfCAnLS12ZXJib3NlJ1xuICAgICAgfCAnLS11bnNhZmUtcGF0aHMnXG4gICA+ICZcbiAgIE9wdGlvbkZsYWdzPCctLXdoaXRlc3BhY2UnLCAnbm93YXJuJyB8ICd3YXJuJyB8ICdmaXgnIHwgJ2Vycm9yJyB8ICdlcnJvci1hbGwnPiAmXG4gICBPcHRpb25GbGFnczwnLS1idWlsZC1mYWtlLWFuY2VzdG9yJyB8ICctLWV4Y2x1ZGUnIHwgJy0taW5jbHVkZScgfCAnLS1kaXJlY3RvcnknLCBzdHJpbmc+ICZcbiAgIE9wdGlvbkZsYWdzPCctcCcgfCAnLUMnLCBudW1iZXI+O1xuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlQYXRjaFRhc2socGF0Y2hlczogc3RyaW5nW10sIGN1c3RvbUFyZ3M6IHN0cmluZ1tdKTogU3RyaW5nVGFzazxzdHJpbmc+IHtcbiAgIHJldHVybiBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKFsnYXBwbHknLCAuLi5jdXN0b21BcmdzLCAuLi5wYXRjaGVzXSk7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBCcmFuY2hTdW1tYXJ5LCBCcmFuY2hTdW1tYXJ5QnJhbmNoIH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5cbmV4cG9ydCBlbnVtIEJyYW5jaFN0YXR1c0lkZW50aWZpZXIge1xuICAgQ1VSUkVOVCA9ICcqJyxcbiAgIExJTktFRCA9ICcrJyxcbn1cblxuZXhwb3J0IGNsYXNzIEJyYW5jaFN1bW1hcnlSZXN1bHQgaW1wbGVtZW50cyBCcmFuY2hTdW1tYXJ5IHtcbiAgIHB1YmxpYyBhbGw6IHN0cmluZ1tdID0gW107XG4gICBwdWJsaWMgYnJhbmNoZXM6IHsgW3A6IHN0cmluZ106IEJyYW5jaFN1bW1hcnlCcmFuY2ggfSA9IHt9O1xuICAgcHVibGljIGN1cnJlbnQ6IHN0cmluZyA9ICcnO1xuICAgcHVibGljIGRldGFjaGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgIHB1c2goXG4gICAgICBzdGF0dXM6IEJyYW5jaFN0YXR1c0lkZW50aWZpZXIgfCB1bmtub3duLFxuICAgICAgZGV0YWNoZWQ6IGJvb2xlYW4sXG4gICAgICBuYW1lOiBzdHJpbmcsXG4gICAgICBjb21taXQ6IHN0cmluZyxcbiAgICAgIGxhYmVsOiBzdHJpbmdcbiAgICkge1xuICAgICAgaWYgKHN0YXR1cyA9PT0gQnJhbmNoU3RhdHVzSWRlbnRpZmllci5DVVJSRU5UKSB7XG4gICAgICAgICB0aGlzLmRldGFjaGVkID0gZGV0YWNoZWQ7XG4gICAgICAgICB0aGlzLmN1cnJlbnQgPSBuYW1lO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFsbC5wdXNoKG5hbWUpO1xuICAgICAgdGhpcy5icmFuY2hlc1tuYW1lXSA9IHtcbiAgICAgICAgIGN1cnJlbnQ6IHN0YXR1cyA9PT0gQnJhbmNoU3RhdHVzSWRlbnRpZmllci5DVVJSRU5ULFxuICAgICAgICAgbGlua2VkV29ya1RyZWU6IHN0YXR1cyA9PT0gQnJhbmNoU3RhdHVzSWRlbnRpZmllci5MSU5LRUQsXG4gICAgICAgICBuYW1lLFxuICAgICAgICAgY29tbWl0LFxuICAgICAgICAgbGFiZWwsXG4gICAgICB9O1xuICAgfVxufVxuIiwgImltcG9ydCB0eXBlIHsgQnJhbmNoU3VtbWFyeSB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgQnJhbmNoU3RhdHVzSWRlbnRpZmllciwgQnJhbmNoU3VtbWFyeVJlc3VsdCB9IGZyb20gJy4uL3Jlc3BvbnNlcy9CcmFuY2hTdW1tYXJ5JztcbmltcG9ydCB7IExpbmVQYXJzZXIsIHBhcnNlU3RyaW5nUmVzcG9uc2UgfSBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IHBhcnNlcnM6IExpbmVQYXJzZXI8QnJhbmNoU3VtbWFyeVJlc3VsdD5bXSA9IFtcbiAgIG5ldyBMaW5lUGFyc2VyKFxuICAgICAgL14oWyorXVxccyk/XFwoKD86SEVBRCApP2RldGFjaGVkICg/OmZyb218YXQpIChcXFMrKVxcKVxccysoW2EtejAtOV0rKVxccyguKikkLyxcbiAgICAgIChyZXN1bHQsIFtjdXJyZW50LCBuYW1lLCBjb21taXQsIGxhYmVsXSkgPT4ge1xuICAgICAgICAgcmVzdWx0LnB1c2goYnJhbmNoU3RhdHVzKGN1cnJlbnQpLCB0cnVlLCBuYW1lLCBjb21taXQsIGxhYmVsKTtcbiAgICAgIH1cbiAgICksXG4gICBuZXcgTGluZVBhcnNlcihcbiAgICAgIC9eKFsqK11cXHMpPyhcXFMrKVxccysoW2EtejAtOV0rKVxccz8oLiopJC9zLFxuICAgICAgKHJlc3VsdCwgW2N1cnJlbnQsIG5hbWUsIGNvbW1pdCwgbGFiZWxdKSA9PiB7XG4gICAgICAgICByZXN1bHQucHVzaChicmFuY2hTdGF0dXMoY3VycmVudCksIGZhbHNlLCBuYW1lLCBjb21taXQsIGxhYmVsKTtcbiAgICAgIH1cbiAgICksXG5dO1xuXG5jb25zdCBjdXJyZW50QnJhbmNoUGFyc2VyID0gbmV3IExpbmVQYXJzZXI8QnJhbmNoU3VtbWFyeVJlc3VsdD4oL14oXFxTKykkL3MsIChyZXN1bHQsIFtuYW1lXSkgPT4ge1xuICAgcmVzdWx0LnB1c2goQnJhbmNoU3RhdHVzSWRlbnRpZmllci5DVVJSRU5ULCBmYWxzZSwgbmFtZSwgJycsICcnKTtcbn0pO1xuXG5mdW5jdGlvbiBicmFuY2hTdGF0dXMoaW5wdXQ/OiBzdHJpbmcpIHtcbiAgIHJldHVybiBpbnB1dCA/IGlucHV0LmNoYXJBdCgwKSA6ICcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VCcmFuY2hTdW1tYXJ5KHN0ZE91dDogc3RyaW5nLCBjdXJyZW50T25seSA9IGZhbHNlKTogQnJhbmNoU3VtbWFyeSB7XG4gICByZXR1cm4gcGFyc2VTdHJpbmdSZXNwb25zZShcbiAgICAgIG5ldyBCcmFuY2hTdW1tYXJ5UmVzdWx0KCksXG4gICAgICBjdXJyZW50T25seSA/IFtjdXJyZW50QnJhbmNoUGFyc2VyXSA6IHBhcnNlcnMsXG4gICAgICBzdGRPdXRcbiAgICk7XG59XG4iLCAiaW1wb3J0IHR5cGUge1xuICAgQnJhbmNoTXVsdGlEZWxldGVSZXN1bHQsXG4gICBCcmFuY2hTaW5nbGVEZWxldGVGYWlsdXJlLFxuICAgQnJhbmNoU2luZ2xlRGVsZXRlUmVzdWx0LFxuICAgQnJhbmNoU2luZ2xlRGVsZXRlU3VjY2Vzcyxcbn0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5cbmV4cG9ydCBjbGFzcyBCcmFuY2hEZWxldGlvbkJhdGNoIGltcGxlbWVudHMgQnJhbmNoTXVsdGlEZWxldGVSZXN1bHQge1xuICAgYWxsOiBCcmFuY2hTaW5nbGVEZWxldGVSZXN1bHRbXSA9IFtdO1xuICAgYnJhbmNoZXM6IHsgW2JyYW5jaE5hbWU6IHN0cmluZ106IEJyYW5jaFNpbmdsZURlbGV0ZVJlc3VsdCB9ID0ge307XG4gICBlcnJvcnM6IEJyYW5jaFNpbmdsZURlbGV0ZVJlc3VsdFtdID0gW107XG5cbiAgIGdldCBzdWNjZXNzKCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuICF0aGlzLmVycm9ycy5sZW5ndGg7XG4gICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBicmFuY2hEZWxldGlvblN1Y2Nlc3MoYnJhbmNoOiBzdHJpbmcsIGhhc2g6IHN0cmluZyk6IEJyYW5jaFNpbmdsZURlbGV0ZVN1Y2Nlc3Mge1xuICAgcmV0dXJuIHtcbiAgICAgIGJyYW5jaCxcbiAgICAgIGhhc2gsXG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJyYW5jaERlbGV0aW9uRmFpbHVyZShicmFuY2g6IHN0cmluZyk6IEJyYW5jaFNpbmdsZURlbGV0ZUZhaWx1cmUge1xuICAgcmV0dXJuIHtcbiAgICAgIGJyYW5jaCxcbiAgICAgIGhhc2g6IG51bGwsXG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NpbmdsZUJyYW5jaERlbGV0ZUZhaWx1cmUoXG4gICB0ZXN0OiBCcmFuY2hTaW5nbGVEZWxldGVSZXN1bHRcbik6IHRlc3QgaXMgQnJhbmNoU2luZ2xlRGVsZXRlU3VjY2VzcyB7XG4gICByZXR1cm4gdGVzdC5zdWNjZXNzO1xufVxuIiwgImltcG9ydCB0eXBlIHsgQnJhbmNoTXVsdGlEZWxldGVSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7XG4gICBCcmFuY2hEZWxldGlvbkJhdGNoLFxuICAgYnJhbmNoRGVsZXRpb25GYWlsdXJlLFxuICAgYnJhbmNoRGVsZXRpb25TdWNjZXNzLFxufSBmcm9tICcuLi9yZXNwb25zZXMvQnJhbmNoRGVsZXRlU3VtbWFyeSc7XG5pbXBvcnQgdHlwZSB7IFRhc2tQYXJzZXIgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBFeGl0Q29kZXMsIExpbmVQYXJzZXIsIHBhcnNlU3RyaW5nUmVzcG9uc2UgfSBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IGRlbGV0ZVN1Y2Nlc3NSZWdleCA9IC8oXFxTKylcXHMrXFwoXFxTK1xccyhbXildKylcXCkvO1xuY29uc3QgZGVsZXRlRXJyb3JSZWdleCA9IC9eZXJyb3JbXiddKycoW14nXSspJy9tO1xuXG5jb25zdCBwYXJzZXJzOiBMaW5lUGFyc2VyPEJyYW5jaE11bHRpRGVsZXRlUmVzdWx0PltdID0gW1xuICAgbmV3IExpbmVQYXJzZXIoZGVsZXRlU3VjY2Vzc1JlZ2V4LCAocmVzdWx0LCBbYnJhbmNoLCBoYXNoXSkgPT4ge1xuICAgICAgY29uc3QgZGVsZXRpb24gPSBicmFuY2hEZWxldGlvblN1Y2Nlc3MoYnJhbmNoLCBoYXNoKTtcblxuICAgICAgcmVzdWx0LmFsbC5wdXNoKGRlbGV0aW9uKTtcbiAgICAgIHJlc3VsdC5icmFuY2hlc1ticmFuY2hdID0gZGVsZXRpb247XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyKGRlbGV0ZUVycm9yUmVnZXgsIChyZXN1bHQsIFticmFuY2hdKSA9PiB7XG4gICAgICBjb25zdCBkZWxldGlvbiA9IGJyYW5jaERlbGV0aW9uRmFpbHVyZShicmFuY2gpO1xuXG4gICAgICByZXN1bHQuZXJyb3JzLnB1c2goZGVsZXRpb24pO1xuICAgICAgcmVzdWx0LmFsbC5wdXNoKGRlbGV0aW9uKTtcbiAgICAgIHJlc3VsdC5icmFuY2hlc1ticmFuY2hdID0gZGVsZXRpb247XG4gICB9KSxcbl07XG5cbmV4cG9ydCBjb25zdCBwYXJzZUJyYW5jaERlbGV0aW9uczogVGFza1BhcnNlcjxzdHJpbmcsIEJyYW5jaE11bHRpRGVsZXRlUmVzdWx0PiA9IChcbiAgIHN0ZE91dCxcbiAgIHN0ZEVyclxuKSA9PiB7XG4gICByZXR1cm4gcGFyc2VTdHJpbmdSZXNwb25zZShuZXcgQnJhbmNoRGVsZXRpb25CYXRjaCgpLCBwYXJzZXJzLCBbc3RkT3V0LCBzdGRFcnJdKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNCcmFuY2hEZWxldGlvbkVycm9yKGRhdGE6IHN0cmluZywgcHJvY2Vzc0V4aXRDb2RlOiBFeGl0Q29kZXMpOiBib29sZWFuIHtcbiAgIHJldHVybiBwcm9jZXNzRXhpdENvZGUgPT09IEV4aXRDb2Rlcy5FUlJPUiAmJiBkZWxldGVFcnJvclJlZ2V4LnRlc3QoZGF0YSk7XG59XG4iLCAiaW1wb3J0IHR5cGUge1xuICAgQnJhbmNoTXVsdGlEZWxldGVSZXN1bHQsXG4gICBCcmFuY2hTaW5nbGVEZWxldGVSZXN1bHQsXG4gICBCcmFuY2hTdW1tYXJ5LFxufSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IEdpdFJlc3BvbnNlRXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvZ2l0LXJlc3BvbnNlLWVycm9yJztcbmltcG9ydCB7IHBhcnNlQnJhbmNoU3VtbWFyeSB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2UtYnJhbmNoJztcbmltcG9ydCB7IGhhc0JyYW5jaERlbGV0aW9uRXJyb3IsIHBhcnNlQnJhbmNoRGVsZXRpb25zIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZS1icmFuY2gtZGVsZXRlJztcbmltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGJ1ZmZlclRvU3RyaW5nIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnNEZWxldGVCcmFuY2hDb21tYW5kKGNvbW1hbmRzOiBzdHJpbmdbXSkge1xuICAgY29uc3QgZGVsZXRlQ29tbWFuZHMgPSBbJy1kJywgJy1EJywgJy0tZGVsZXRlJ107XG4gICByZXR1cm4gY29tbWFuZHMuc29tZSgoY29tbWFuZCkgPT4gZGVsZXRlQ29tbWFuZHMuaW5jbHVkZXMoY29tbWFuZCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnJhbmNoVGFzayhcbiAgIGN1c3RvbUFyZ3M6IHN0cmluZ1tdXG4pOiBTdHJpbmdUYXNrPEJyYW5jaFN1bW1hcnkgfCBCcmFuY2hTaW5nbGVEZWxldGVSZXN1bHQ+IHtcbiAgIGNvbnN0IGlzRGVsZXRlID0gY29udGFpbnNEZWxldGVCcmFuY2hDb21tYW5kKGN1c3RvbUFyZ3MpO1xuICAgY29uc3QgaXNDdXJyZW50T25seSA9IGN1c3RvbUFyZ3MuaW5jbHVkZXMoJy0tc2hvdy1jdXJyZW50Jyk7XG5cbiAgIGNvbnN0IGNvbW1hbmRzID0gWydicmFuY2gnLCAuLi5jdXN0b21BcmdzXTtcblxuICAgaWYgKGNvbW1hbmRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgY29tbWFuZHMucHVzaCgnLWEnKTtcbiAgIH1cblxuICAgaWYgKCFjb21tYW5kcy5pbmNsdWRlcygnLXYnKSkge1xuICAgICAgY29tbWFuZHMuc3BsaWNlKDEsIDAsICctdicpO1xuICAgfVxuXG4gICByZXR1cm4ge1xuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgY29tbWFuZHMsXG4gICAgICBwYXJzZXIoc3RkT3V0LCBzdGRFcnIpIHtcbiAgICAgICAgIGlmIChpc0RlbGV0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlQnJhbmNoRGVsZXRpb25zKHN0ZE91dCwgc3RkRXJyKS5hbGxbMF07XG4gICAgICAgICB9XG5cbiAgICAgICAgIHJldHVybiBwYXJzZUJyYW5jaFN1bW1hcnkoc3RkT3V0LCBpc0N1cnJlbnRPbmx5KTtcbiAgICAgIH0sXG4gICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnJhbmNoTG9jYWxUYXNrKCk6IFN0cmluZ1Rhc2s8QnJhbmNoU3VtbWFyeT4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIGNvbW1hbmRzOiBbJ2JyYW5jaCcsICctdiddLFxuICAgICAgcGFyc2VyKHN0ZE91dCkge1xuICAgICAgICAgcmV0dXJuIHBhcnNlQnJhbmNoU3VtbWFyeShzdGRPdXQpO1xuICAgICAgfSxcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVCcmFuY2hlc1Rhc2soXG4gICBicmFuY2hlczogc3RyaW5nW10sXG4gICBmb3JjZURlbGV0ZSA9IGZhbHNlXG4pOiBTdHJpbmdUYXNrPEJyYW5jaE11bHRpRGVsZXRlUmVzdWx0PiB7XG4gICByZXR1cm4ge1xuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgY29tbWFuZHM6IFsnYnJhbmNoJywgJy12JywgZm9yY2VEZWxldGUgPyAnLUQnIDogJy1kJywgLi4uYnJhbmNoZXNdLFxuICAgICAgcGFyc2VyKHN0ZE91dCwgc3RkRXJyKSB7XG4gICAgICAgICByZXR1cm4gcGFyc2VCcmFuY2hEZWxldGlvbnMoc3RkT3V0LCBzdGRFcnIpO1xuICAgICAgfSxcbiAgICAgIG9uRXJyb3IoeyBleGl0Q29kZSwgc3RkT3V0IH0sIGVycm9yLCBkb25lLCBmYWlsKSB7XG4gICAgICAgICBpZiAoIWhhc0JyYW5jaERlbGV0aW9uRXJyb3IoU3RyaW5nKGVycm9yKSwgZXhpdENvZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFpbChlcnJvcik7XG4gICAgICAgICB9XG5cbiAgICAgICAgIGRvbmUoc3RkT3V0KTtcbiAgICAgIH0sXG4gICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlQnJhbmNoVGFzayhcbiAgIGJyYW5jaDogc3RyaW5nLFxuICAgZm9yY2VEZWxldGUgPSBmYWxzZVxuKTogU3RyaW5nVGFzazxCcmFuY2hTaW5nbGVEZWxldGVSZXN1bHQ+IHtcbiAgIGNvbnN0IHRhc2s6IFN0cmluZ1Rhc2s8QnJhbmNoU2luZ2xlRGVsZXRlUmVzdWx0PiA9IHtcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIGNvbW1hbmRzOiBbJ2JyYW5jaCcsICctdicsIGZvcmNlRGVsZXRlID8gJy1EJyA6ICctZCcsIGJyYW5jaF0sXG4gICAgICBwYXJzZXIoc3RkT3V0LCBzdGRFcnIpIHtcbiAgICAgICAgIHJldHVybiBwYXJzZUJyYW5jaERlbGV0aW9ucyhzdGRPdXQsIHN0ZEVycikuYnJhbmNoZXNbYnJhbmNoXSE7XG4gICAgICB9LFxuICAgICAgb25FcnJvcih7IGV4aXRDb2RlLCBzdGRFcnIsIHN0ZE91dCB9LCBlcnJvciwgXywgZmFpbCkge1xuICAgICAgICAgaWYgKCFoYXNCcmFuY2hEZWxldGlvbkVycm9yKFN0cmluZyhlcnJvciksIGV4aXRDb2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhaWwoZXJyb3IpO1xuICAgICAgICAgfVxuXG4gICAgICAgICB0aHJvdyBuZXcgR2l0UmVzcG9uc2VFcnJvcihcbiAgICAgICAgICAgIHRhc2sucGFyc2VyKGJ1ZmZlclRvU3RyaW5nKHN0ZE91dCksIGJ1ZmZlclRvU3RyaW5nKHN0ZEVycikpLFxuICAgICAgICAgICAgU3RyaW5nKGVycm9yKVxuICAgICAgICAgKTtcbiAgICAgIH0sXG4gICB9O1xuXG4gICByZXR1cm4gdGFzaztcbn1cbiIsICJpbXBvcnQgeyBub3JtYWxpemUgfSBmcm9tICdub2RlOnBhdGgnO1xuXG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0lnbm9yZVRhc2socGF0aHM6IHN0cmluZ1tdKTogU3RyaW5nVGFzazxzdHJpbmdbXT4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGNvbW1hbmRzOiBbJ2NoZWNrLWlnbm9yZScsIC4uLnBhdGhzXSxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIHBhcnNlcjogcGFyc2VDaGVja0lnbm9yZSxcbiAgIH07XG59XG5cbi8qKlxuICogUGFyc2VyIGZvciB0aGUgYGNoZWNrLWlnbm9yZWAgY29tbWFuZCAtIHJldHVybnMgZWFjaCBmaWxlIGFzIGEgc3RyaW5nIGFycmF5XG4gKi9cbmZ1bmN0aW9uIHBhcnNlQ2hlY2tJZ25vcmUodGV4dDogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgcmV0dXJuIHRleHQuc3BsaXQoL1xcbi9nKS5tYXAodG9QYXRoKS5maWx0ZXIoQm9vbGVhbik7XG59XG5cbmZ1bmN0aW9uIHRvUGF0aChpbnB1dDogc3RyaW5nKSB7XG4gICBjb25zdCBwYXRoID0gaW5wdXQudHJpbSgpLnJlcGxhY2UoL15bXCInXXxbXCInXSQvZywgJycpO1xuICAgcmV0dXJuIHBhdGggJiYgbm9ybWFsaXplKHBhdGgpO1xufVxuIiwgImltcG9ydCB0eXBlIHsgRmV0Y2hSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IExpbmVQYXJzZXIsIHBhcnNlU3RyaW5nUmVzcG9uc2UgfSBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IHBhcnNlcnM6IExpbmVQYXJzZXI8RmV0Y2hSZXN1bHQ+W10gPSBbXG4gICBuZXcgTGluZVBhcnNlcigvRnJvbSAoLispJC8sIChyZXN1bHQsIFtyZW1vdGVdKSA9PiB7XG4gICAgICByZXN1bHQucmVtb3RlID0gcmVtb3RlO1xuICAgfSksXG4gICBuZXcgTGluZVBhcnNlcigvXFwqIFxcW25ldyBicmFuY2hdXFxzKyhcXFMrKVxccyotPiAoLispJC8sIChyZXN1bHQsIFtuYW1lLCB0cmFja2luZ10pID0+IHtcbiAgICAgIHJlc3VsdC5icmFuY2hlcy5wdXNoKHtcbiAgICAgICAgIG5hbWUsXG4gICAgICAgICB0cmFja2luZyxcbiAgICAgIH0pO1xuICAgfSksXG4gICBuZXcgTGluZVBhcnNlcigvXFwqIFxcW25ldyB0YWddXFxzKyhcXFMrKVxccyotPiAoLispJC8sIChyZXN1bHQsIFtuYW1lLCB0cmFja2luZ10pID0+IHtcbiAgICAgIHJlc3VsdC50YWdzLnB1c2goe1xuICAgICAgICAgbmFtZSxcbiAgICAgICAgIHRyYWNraW5nLFxuICAgICAgfSk7XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyKC8tIFxcW2RlbGV0ZWRdXFxzK1xcUytcXHMqLT4gKC4rKSQvLCAocmVzdWx0LCBbdHJhY2tpbmddKSA9PiB7XG4gICAgICByZXN1bHQuZGVsZXRlZC5wdXNoKHtcbiAgICAgICAgIHRyYWNraW5nLFxuICAgICAgfSk7XG4gICB9KSxcbiAgIG5ldyBMaW5lUGFyc2VyKFxuICAgICAgL1xccyooW14uXSspXFwuXFwuKFxcUyspXFxzKyhcXFMrKVxccyotPiAoLispJC8sXG4gICAgICAocmVzdWx0LCBbZnJvbSwgdG8sIG5hbWUsIHRyYWNraW5nXSkgPT4ge1xuICAgICAgICAgcmVzdWx0LnVwZGF0ZWQucHVzaCh7XG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgdHJhY2tpbmcsXG4gICAgICAgICAgICB0byxcbiAgICAgICAgICAgIGZyb20sXG4gICAgICAgICB9KTtcbiAgICAgIH1cbiAgICksXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VGZXRjaFJlc3VsdChzdGRPdXQ6IHN0cmluZywgc3RkRXJyOiBzdHJpbmcpOiBGZXRjaFJlc3VsdCB7XG4gICBjb25zdCByZXN1bHQ6IEZldGNoUmVzdWx0ID0ge1xuICAgICAgcmF3OiBzdGRPdXQsXG4gICAgICByZW1vdGU6IG51bGwsXG4gICAgICBicmFuY2hlczogW10sXG4gICAgICB0YWdzOiBbXSxcbiAgICAgIHVwZGF0ZWQ6IFtdLFxuICAgICAgZGVsZXRlZDogW10sXG4gICB9O1xuICAgcmV0dXJuIHBhcnNlU3RyaW5nUmVzcG9uc2UocmVzdWx0LCBwYXJzZXJzLCBbc3RkT3V0LCBzdGRFcnJdKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IEZldGNoUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBwYXJzZUZldGNoUmVzdWx0IH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZS1mZXRjaCc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBjb25maWd1cmF0aW9uRXJyb3JUYXNrLCB0eXBlIEVtcHR5VGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmZ1bmN0aW9uIGRpc2FsbG93ZWRDb21tYW5kKGNvbW1hbmQ6IHN0cmluZykge1xuICAgcmV0dXJuIC9eLS11cGxvYWQtcGFjayg9fCQpLy50ZXN0KGNvbW1hbmQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hUYXNrKFxuICAgcmVtb3RlOiBzdHJpbmcsXG4gICBicmFuY2g6IHN0cmluZyxcbiAgIGN1c3RvbUFyZ3M6IHN0cmluZ1tdXG4pOiBTdHJpbmdUYXNrPEZldGNoUmVzdWx0PiB8IEVtcHR5VGFzayB7XG4gICBjb25zdCBjb21tYW5kcyA9IFsnZmV0Y2gnLCAuLi5jdXN0b21BcmdzXTtcbiAgIGlmIChyZW1vdGUgJiYgYnJhbmNoKSB7XG4gICAgICBjb21tYW5kcy5wdXNoKHJlbW90ZSwgYnJhbmNoKTtcbiAgIH1cblxuICAgY29uc3QgYmFubmVkID0gY29tbWFuZHMuZmluZChkaXNhbGxvd2VkQ29tbWFuZCk7XG4gICBpZiAoYmFubmVkKSB7XG4gICAgICByZXR1cm4gY29uZmlndXJhdGlvbkVycm9yVGFzayhgZ2l0LmZldGNoOiBwb3RlbnRpYWwgZXhwbG9pdCBhcmd1bWVudCBibG9ja2VkLmApO1xuICAgfVxuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXI6IHBhcnNlRmV0Y2hSZXN1bHQsXG4gICB9O1xufVxuIiwgImltcG9ydCB0eXBlIHsgTW92ZVJlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuaW1wb3J0IHsgTGluZVBhcnNlciwgcGFyc2VTdHJpbmdSZXNwb25zZSB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgcGFyc2VyczogTGluZVBhcnNlcjxNb3ZlUmVzdWx0PltdID0gW1xuICAgbmV3IExpbmVQYXJzZXIoL15SZW5hbWluZyAoLispIHRvICguKykkLywgKHJlc3VsdCwgW2Zyb20sIHRvXSkgPT4ge1xuICAgICAgcmVzdWx0Lm1vdmVzLnB1c2goeyBmcm9tLCB0byB9KTtcbiAgIH0pLFxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTW92ZVJlc3VsdChzdGRPdXQ6IHN0cmluZyk6IE1vdmVSZXN1bHQge1xuICAgcmV0dXJuIHBhcnNlU3RyaW5nUmVzcG9uc2UoeyBtb3ZlczogW10gfSwgcGFyc2Vycywgc3RkT3V0KTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IE1vdmVSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IHBhcnNlTW92ZVJlc3VsdCB9IGZyb20gJy4uL3BhcnNlcnMvcGFyc2UtbW92ZSc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBhc0FycmF5IH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gbW92ZVRhc2soZnJvbTogc3RyaW5nIHwgc3RyaW5nW10sIHRvOiBzdHJpbmcpOiBTdHJpbmdUYXNrPE1vdmVSZXN1bHQ+IHtcbiAgIHJldHVybiB7XG4gICAgICBjb21tYW5kczogWydtdicsICctdicsIC4uLmFzQXJyYXkoZnJvbSksIHRvXSxcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIHBhcnNlcjogcGFyc2VNb3ZlUmVzdWx0LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFB1bGxSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IEdpdFJlc3BvbnNlRXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvZ2l0LXJlc3BvbnNlLWVycm9yJztcbmltcG9ydCB7IHBhcnNlUHVsbEVycm9yUmVzdWx0LCBwYXJzZVB1bGxSZXN1bHQgfSBmcm9tICcuLi9wYXJzZXJzL3BhcnNlLXB1bGwnO1xuaW1wb3J0IHR5cGUgeyBNYXliZSwgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGJ1ZmZlclRvU3RyaW5nIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gcHVsbFRhc2soXG4gICByZW1vdGU6IE1heWJlPHN0cmluZz4sXG4gICBicmFuY2g6IE1heWJlPHN0cmluZz4sXG4gICBjdXN0b21BcmdzOiBzdHJpbmdbXVxuKTogU3RyaW5nVGFzazxQdWxsUmVzdWx0PiB7XG4gICBjb25zdCBjb21tYW5kczogc3RyaW5nW10gPSBbJ3B1bGwnLCAuLi5jdXN0b21BcmdzXTtcbiAgIGlmIChyZW1vdGUgJiYgYnJhbmNoKSB7XG4gICAgICBjb21tYW5kcy5zcGxpY2UoMSwgMCwgcmVtb3RlLCBicmFuY2gpO1xuICAgfVxuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXIoc3RkT3V0LCBzdGRFcnIpOiBQdWxsUmVzdWx0IHtcbiAgICAgICAgIHJldHVybiBwYXJzZVB1bGxSZXN1bHQoc3RkT3V0LCBzdGRFcnIpO1xuICAgICAgfSxcbiAgICAgIG9uRXJyb3IocmVzdWx0LCBfZXJyb3IsIF9kb25lLCBmYWlsKSB7XG4gICAgICAgICBjb25zdCBwdWxsRXJyb3IgPSBwYXJzZVB1bGxFcnJvclJlc3VsdChcbiAgICAgICAgICAgIGJ1ZmZlclRvU3RyaW5nKHJlc3VsdC5zdGRPdXQpLFxuICAgICAgICAgICAgYnVmZmVyVG9TdHJpbmcocmVzdWx0LnN0ZEVycilcbiAgICAgICAgICk7XG4gICAgICAgICBpZiAocHVsbEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFpbChuZXcgR2l0UmVzcG9uc2VFcnJvcihwdWxsRXJyb3IpKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgZmFpbChfZXJyb3IpO1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHsgZm9yRWFjaExpbmVXaXRoQ29udGVudCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBSZW1vdGVXaXRob3V0UmVmcyB7XG4gICBuYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVtb3RlV2l0aFJlZnMgZXh0ZW5kcyBSZW1vdGVXaXRob3V0UmVmcyB7XG4gICByZWZzOiB7XG4gICAgICBmZXRjaDogc3RyaW5nO1xuICAgICAgcHVzaDogc3RyaW5nO1xuICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlR2V0UmVtb3Rlcyh0ZXh0OiBzdHJpbmcpOiBSZW1vdGVXaXRob3V0UmVmc1tdIHtcbiAgIGNvbnN0IHJlbW90ZXM6IHsgW25hbWU6IHN0cmluZ106IFJlbW90ZVdpdGhvdXRSZWZzIH0gPSB7fTtcblxuICAgZm9yRWFjaCh0ZXh0LCAoW25hbWVdKSA9PiAocmVtb3Rlc1tuYW1lXSA9IHsgbmFtZSB9KSk7XG5cbiAgIHJldHVybiBPYmplY3QudmFsdWVzKHJlbW90ZXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VHZXRSZW1vdGVzVmVyYm9zZSh0ZXh0OiBzdHJpbmcpOiBSZW1vdGVXaXRoUmVmc1tdIHtcbiAgIGNvbnN0IHJlbW90ZXM6IHsgW25hbWU6IHN0cmluZ106IFJlbW90ZVdpdGhSZWZzIH0gPSB7fTtcblxuICAgZm9yRWFjaCh0ZXh0LCAoW25hbWUsIHVybCwgcHVycG9zZV0pID0+IHtcbiAgICAgIGlmICghT2JqZWN0Lmhhc093bihyZW1vdGVzLCBuYW1lKSkge1xuICAgICAgICAgcmVtb3Rlc1tuYW1lXSA9IHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICByZWZzOiB7IGZldGNoOiAnJywgcHVzaDogJycgfSxcbiAgICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChwdXJwb3NlICYmIHVybCkge1xuICAgICAgICAgcmVtb3Rlc1tuYW1lXS5yZWZzW3B1cnBvc2UucmVwbGFjZSgvW15hLXpdL2csICcnKSBhcyBrZXlvZiBSZW1vdGVXaXRoUmVmc1sncmVmcyddXSA9IHVybDtcbiAgICAgIH1cbiAgIH0pO1xuXG4gICByZXR1cm4gT2JqZWN0LnZhbHVlcyhyZW1vdGVzKTtcbn1cblxuZnVuY3Rpb24gZm9yRWFjaCh0ZXh0OiBzdHJpbmcsIGhhbmRsZXI6IChsaW5lOiBzdHJpbmdbXSkgPT4gdm9pZCkge1xuICAgZm9yRWFjaExpbmVXaXRoQ29udGVudCh0ZXh0LCAobGluZSkgPT4gaGFuZGxlcihsaW5lLnNwbGl0KC9cXHMrLykpKTtcbn1cbiIsICJpbXBvcnQge1xuICAgcGFyc2VHZXRSZW1vdGVzLFxuICAgcGFyc2VHZXRSZW1vdGVzVmVyYm9zZSxcbiAgIHR5cGUgUmVtb3RlV2l0aG91dFJlZnMsXG4gICB0eXBlIFJlbW90ZVdpdGhSZWZzLFxufSBmcm9tICcuLi9yZXNwb25zZXMvR2V0UmVtb3RlU3VtbWFyeSc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFJlbW90ZVRhc2soXG4gICByZW1vdGVOYW1lOiBzdHJpbmcsXG4gICByZW1vdGVSZXBvOiBzdHJpbmcsXG4gICBjdXN0b21BcmdzOiBzdHJpbmdbXVxuKTogU3RyaW5nVGFzazxzdHJpbmc+IHtcbiAgIHJldHVybiBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKFsncmVtb3RlJywgJ2FkZCcsIC4uLmN1c3RvbUFyZ3MsIHJlbW90ZU5hbWUsIHJlbW90ZVJlcG9dKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlbW90ZXNUYXNrKHZlcmJvc2U6IHRydWUpOiBTdHJpbmdUYXNrPFJlbW90ZVdpdGhSZWZzW10+O1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJlbW90ZXNUYXNrKHZlcmJvc2U6IGZhbHNlKTogU3RyaW5nVGFzazxSZW1vdGVXaXRob3V0UmVmc1tdPjtcbmV4cG9ydCBmdW5jdGlvbiBnZXRSZW1vdGVzVGFzayhcbiAgIHZlcmJvc2U6IGJvb2xlYW5cbik6IFN0cmluZ1Rhc2s8UmVtb3RlV2l0aFJlZnNbXSB8IFJlbW90ZVdpdGhvdXRSZWZzW10+IHtcbiAgIGNvbnN0IGNvbW1hbmRzID0gWydyZW1vdGUnXTtcbiAgIGlmICh2ZXJib3NlKSB7XG4gICAgICBjb21tYW5kcy5wdXNoKCctdicpO1xuICAgfVxuXG4gICByZXR1cm4ge1xuICAgICAgY29tbWFuZHMsXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXI6IHZlcmJvc2UgPyBwYXJzZUdldFJlbW90ZXNWZXJib3NlIDogcGFyc2VHZXRSZW1vdGVzLFxuICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpc3RSZW1vdGVzVGFzayhjdXN0b21BcmdzOiBzdHJpbmdbXSk6IFN0cmluZ1Rhc2s8c3RyaW5nPiB7XG4gICBjb25zdCBjb21tYW5kcyA9IFsuLi5jdXN0b21BcmdzXTtcbiAgIGlmIChjb21tYW5kc1swXSAhPT0gJ2xzLXJlbW90ZScpIHtcbiAgICAgIGNvbW1hbmRzLnVuc2hpZnQoJ2xzLXJlbW90ZScpO1xuICAgfVxuXG4gICByZXR1cm4gc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhjb21tYW5kcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdGVUYXNrKGN1c3RvbUFyZ3M6IHN0cmluZ1tdKTogU3RyaW5nVGFzazxzdHJpbmc+IHtcbiAgIGNvbnN0IGNvbW1hbmRzID0gWy4uLmN1c3RvbUFyZ3NdO1xuICAgaWYgKGNvbW1hbmRzWzBdICE9PSAncmVtb3RlJykge1xuICAgICAgY29tbWFuZHMudW5zaGlmdCgncmVtb3RlJyk7XG4gICB9XG5cbiAgIHJldHVybiBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKGNvbW1hbmRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVJlbW90ZVRhc2socmVtb3RlTmFtZTogc3RyaW5nKSB7XG4gICByZXR1cm4gc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhbJ3JlbW90ZScsICdyZW1vdmUnLCByZW1vdGVOYW1lXSk7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBMb2dPcHRpb25zLCBMb2dSZXN1bHQgfSBmcm9tICcuLi8uLi90eXBpbmdzJztcbmltcG9ydCB7IGxvZ0Zvcm1hdEZyb21Db21tYW5kIH0gZnJvbSAnLi4vYXJncy9sb2ctZm9ybWF0JztcbmltcG9ydCB7IGNyZWF0ZUxpc3RMb2dTdW1tYXJ5UGFyc2VyIH0gZnJvbSAnLi4vcGFyc2Vycy9wYXJzZS1saXN0LWxvZy1zdW1tYXJ5JztcbmltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHZhbGlkYXRlTG9nRm9ybWF0Q29uZmlnIH0gZnJvbSAnLi9kaWZmJztcbmltcG9ydCB7IHBhcnNlTG9nT3B0aW9ucyB9IGZyb20gJy4vbG9nJztcbmltcG9ydCB0eXBlIHsgRW1wdHlUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXNoTGlzdFRhc2soXG4gICBvcHQ6IExvZ09wdGlvbnMgPSB7fSxcbiAgIGN1c3RvbUFyZ3M6IHN0cmluZ1tdXG4pOiBFbXB0eVRhc2sgfCBTdHJpbmdUYXNrPExvZ1Jlc3VsdD4ge1xuICAgY29uc3Qgb3B0aW9ucyA9IHBhcnNlTG9nT3B0aW9uczxhbnk+KG9wdCk7XG4gICBjb25zdCBjb21tYW5kcyA9IFsnc3Rhc2gnLCAnbGlzdCcsIC4uLm9wdGlvbnMuY29tbWFuZHMsIC4uLmN1c3RvbUFyZ3NdO1xuICAgY29uc3QgcGFyc2VyID0gY3JlYXRlTGlzdExvZ1N1bW1hcnlQYXJzZXIoXG4gICAgICBvcHRpb25zLnNwbGl0dGVyLFxuICAgICAgb3B0aW9ucy5maWVsZHMsXG4gICAgICBsb2dGb3JtYXRGcm9tQ29tbWFuZChjb21tYW5kcylcbiAgICk7XG5cbiAgIHJldHVybiAoXG4gICAgICB2YWxpZGF0ZUxvZ0Zvcm1hdENvbmZpZyhjb21tYW5kcykgfHwge1xuICAgICAgICAgY29tbWFuZHMsXG4gICAgICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICAgICBwYXJzZXIsXG4gICAgICB9XG4gICApO1xufVxuIiwgImltcG9ydCB0eXBlIHsgU3RyaW5nVGFzayB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkU3ViTW9kdWxlVGFzayhyZXBvOiBzdHJpbmcsIHBhdGg6IHN0cmluZyk6IFN0cmluZ1Rhc2s8c3RyaW5nPiB7XG4gICByZXR1cm4gc3ViTW9kdWxlVGFzayhbJ2FkZCcsIHJlcG8sIHBhdGhdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRTdWJNb2R1bGVUYXNrKGN1c3RvbUFyZ3M6IHN0cmluZ1tdKTogU3RyaW5nVGFzazxzdHJpbmc+IHtcbiAgIHJldHVybiBzdWJNb2R1bGVUYXNrKFsnaW5pdCcsIC4uLmN1c3RvbUFyZ3NdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1Yk1vZHVsZVRhc2soY3VzdG9tQXJnczogc3RyaW5nW10pOiBTdHJpbmdUYXNrPHN0cmluZz4ge1xuICAgY29uc3QgY29tbWFuZHMgPSBbLi4uY3VzdG9tQXJnc107XG4gICBpZiAoY29tbWFuZHNbMF0gIT09ICdzdWJtb2R1bGUnKSB7XG4gICAgICBjb21tYW5kcy51bnNoaWZ0KCdzdWJtb2R1bGUnKTtcbiAgIH1cblxuICAgcmV0dXJuIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soY29tbWFuZHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU3ViTW9kdWxlVGFzayhjdXN0b21BcmdzOiBzdHJpbmdbXSk6IFN0cmluZ1Rhc2s8c3RyaW5nPiB7XG4gICByZXR1cm4gc3ViTW9kdWxlVGFzayhbJ3VwZGF0ZScsIC4uLmN1c3RvbUFyZ3NdKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFRhZ1Jlc3VsdCB9IGZyb20gJy4uLy4uL3R5cGluZ3MnO1xuXG5leHBvcnQgY2xhc3MgVGFnTGlzdCBpbXBsZW1lbnRzIFRhZ1Jlc3VsdCB7XG4gICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyByZWFkb25seSBhbGw6IHN0cmluZ1tdLFxuICAgICAgcHVibGljIHJlYWRvbmx5IGxhdGVzdDogc3RyaW5nIHwgdW5kZWZpbmVkXG4gICApIHt9XG59XG5cbmV4cG9ydCBjb25zdCBwYXJzZVRhZ0xpc3QgPSBmdW5jdGlvbiAoZGF0YTogc3RyaW5nLCBjdXN0b21Tb3J0ID0gZmFsc2UpIHtcbiAgIGNvbnN0IHRhZ3MgPSBkYXRhLnNwbGl0KCdcXG4nKS5tYXAodHJpbW1lZCkuZmlsdGVyKEJvb2xlYW4pO1xuXG4gICBpZiAoIWN1c3RvbVNvcnQpIHtcbiAgICAgIHRhZ3Muc29ydChmdW5jdGlvbiAodGFnQSwgdGFnQikge1xuICAgICAgICAgY29uc3QgcGFydHNBID0gdGFnQS5zcGxpdCgnLicpO1xuICAgICAgICAgY29uc3QgcGFydHNCID0gdGFnQi5zcGxpdCgnLicpO1xuXG4gICAgICAgICBpZiAocGFydHNBLmxlbmd0aCA9PT0gMSB8fCBwYXJ0c0IubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gc2luZ2xlU29ydGVkKHRvTnVtYmVyKHBhcnRzQVswXSksIHRvTnVtYmVyKHBhcnRzQlswXSkpO1xuICAgICAgICAgfVxuXG4gICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IE1hdGgubWF4KHBhcnRzQS5sZW5ndGgsIHBhcnRzQi5sZW5ndGgpOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkaWZmID0gc29ydGVkKHRvTnVtYmVyKHBhcnRzQVtpXSksIHRvTnVtYmVyKHBhcnRzQltpXSkpO1xuXG4gICAgICAgICAgICBpZiAoZGlmZikge1xuICAgICAgICAgICAgICAgcmV0dXJuIGRpZmY7XG4gICAgICAgICAgICB9XG4gICAgICAgICB9XG5cbiAgICAgICAgIHJldHVybiAwO1xuICAgICAgfSk7XG4gICB9XG5cbiAgIGNvbnN0IGxhdGVzdCA9IGN1c3RvbVNvcnQgPyB0YWdzWzBdIDogWy4uLnRhZ3NdLnJldmVyc2UoKS5maW5kKCh0YWcpID0+IHRhZy5pbmRleE9mKCcuJykgPj0gMCk7XG5cbiAgIHJldHVybiBuZXcgVGFnTGlzdCh0YWdzLCBsYXRlc3QpO1xufTtcblxuZnVuY3Rpb24gc2luZ2xlU29ydGVkKGE6IG51bWJlciwgYjogbnVtYmVyKTogbnVtYmVyIHtcbiAgIGNvbnN0IGFJc051bSA9IE51bWJlci5pc05hTihhKTtcbiAgIGNvbnN0IGJJc051bSA9IE51bWJlci5pc05hTihiKTtcblxuICAgaWYgKGFJc051bSAhPT0gYklzTnVtKSB7XG4gICAgICByZXR1cm4gYUlzTnVtID8gMSA6IC0xO1xuICAgfVxuXG4gICByZXR1cm4gYUlzTnVtID8gc29ydGVkKGEsIGIpIDogMDtcbn1cblxuZnVuY3Rpb24gc29ydGVkKGE6IG51bWJlciwgYjogbnVtYmVyKSB7XG4gICByZXR1cm4gYSA9PT0gYiA/IDAgOiBhID4gYiA/IDEgOiAtMTtcbn1cblxuZnVuY3Rpb24gdHJpbW1lZChpbnB1dDogc3RyaW5nKSB7XG4gICByZXR1cm4gaW5wdXQudHJpbSgpO1xufVxuXG5mdW5jdGlvbiB0b051bWJlcihpbnB1dDogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KGlucHV0LnJlcGxhY2UoL15cXEQrL2csICcnKSwgMTApIHx8IDA7XG4gICB9XG5cbiAgIHJldHVybiAwO1xufVxuIiwgImltcG9ydCB0eXBlIHsgVGFnUmVzdWx0IH0gZnJvbSAnLi4vLi4vdHlwaW5ncyc7XG5pbXBvcnQgeyBwYXJzZVRhZ0xpc3QgfSBmcm9tICcuLi9yZXNwb25zZXMvVGFnTGlzdCc7XG5pbXBvcnQgdHlwZSB7IFN0cmluZ1Rhc2sgfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogVGFzayB1c2VkIGJ5IGBnaXQudGFnc2BcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRhZ0xpc3RUYXNrKGN1c3RvbUFyZ3M6IHN0cmluZ1tdID0gW10pOiBTdHJpbmdUYXNrPFRhZ1Jlc3VsdD4ge1xuICAgY29uc3QgaGFzQ3VzdG9tU29ydCA9IGN1c3RvbUFyZ3Muc29tZSgob3B0aW9uKSA9PiAvXi0tc29ydD0vLnRlc3Qob3B0aW9uKSk7XG5cbiAgIHJldHVybiB7XG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBjb21tYW5kczogWyd0YWcnLCAnLWwnLCAuLi5jdXN0b21BcmdzXSxcbiAgICAgIHBhcnNlcih0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgIHJldHVybiBwYXJzZVRhZ0xpc3QodGV4dCwgaGFzQ3VzdG9tU29ydCk7XG4gICAgICB9LFxuICAgfTtcbn1cblxuLyoqXG4gKiBUYXNrIHVzZWQgYnkgYGdpdC5hZGRUYWdgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRUYWdUYXNrKG5hbWU6IHN0cmluZyk6IFN0cmluZ1Rhc2s8eyBuYW1lOiBzdHJpbmcgfT4ge1xuICAgcmV0dXJuIHtcbiAgICAgIGZvcm1hdDogJ3V0Zi04JyxcbiAgICAgIGNvbW1hbmRzOiBbJ3RhZycsIG5hbWVdLFxuICAgICAgcGFyc2VyKCkge1xuICAgICAgICAgcmV0dXJuIHsgbmFtZSB9O1xuICAgICAgfSxcbiAgIH07XG59XG5cbi8qKlxuICogVGFzayB1c2VkIGJ5IGBnaXQuYWRkVGFnYFxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkQW5ub3RhdGVkVGFnVGFzayhcbiAgIG5hbWU6IHN0cmluZyxcbiAgIHRhZ01lc3NhZ2U6IHN0cmluZ1xuKTogU3RyaW5nVGFzazx7IG5hbWU6IHN0cmluZyB9PiB7XG4gICByZXR1cm4ge1xuICAgICAgZm9ybWF0OiAndXRmLTgnLFxuICAgICAgY29tbWFuZHM6IFsndGFnJywgJy1hJywgJy1tJywgdGFnTWVzc2FnZSwgbmFtZV0sXG4gICAgICBwYXJzZXIoKSB7XG4gICAgICAgICByZXR1cm4geyBuYW1lIH07XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQge0dpdEV4ZWN1dG9yfSBmcm9tIFwiLi9saWIvcnVubmVycy9naXQtZXhlY3V0b3JcIjtcblxuaW1wb3J0IHtTaW1wbGVHaXRBcGl9IGZyb20gXCIuL2xpYi9zaW1wbGUtZ2l0LWFwaVwiO1xuXG5pbXBvcnQge1NjaGVkdWxlcn0gZnJvbSBcIi4vbGliL3J1bm5lcnMvc2NoZWR1bGVyXCI7XG5cbmltcG9ydCB7XG4gICBjb25maWd1cmF0aW9uRXJyb3JUYXNrLFxuICAgc3RyYWlnaHRUaHJvdWdoQnVmZmVyVGFzayxcbiAgIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2tcbn0gZnJvbSBcIi4vbGliL3Rhc2tzL3Rhc2tcIjtcblxuaW1wb3J0IHtcbiAgIGFzQXJyYXksXG4gICBmaWx0ZXJBcnJheSxcbiAgIGZpbHRlclByaW1pdGl2ZXMsXG4gICBmaWx0ZXJTdHJpbmcsXG4gICBmaWx0ZXJTdHJpbmdPclN0cmluZ0FycmF5LFxuICAgZmlsdGVyVHlwZSxcbiAgIGdldFRyYWlsaW5nT3B0aW9ucyxcbiAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudCxcbiAgIHRyYWlsaW5nT3B0aW9uc0FyZ3VtZW50XG59IGZyb20gXCIuL2xpYi91dGlsc1wiO1xuXG5pbXBvcnQge2FwcGx5UGF0Y2hUYXNrfSBmcm9tIFwiLi9saWIvdGFza3MvYXBwbHktcGF0Y2hcIjtcblxuaW1wb3J0IHticmFuY2hMb2NhbFRhc2ssIGJyYW5jaFRhc2ssIGRlbGV0ZUJyYW5jaGVzVGFzaywgZGVsZXRlQnJhbmNoVGFza30gZnJvbSBcIi4vbGliL3Rhc2tzL2JyYW5jaFwiO1xuXG5pbXBvcnQge2NoZWNrSWdub3JlVGFza30gZnJvbSBcIi4vbGliL3Rhc2tzL2NoZWNrLWlnbm9yZVwiO1xuXG5pbXBvcnQge2NoZWNrSXNSZXBvVGFza30gZnJvbSBcIi4vbGliL3Rhc2tzL2NoZWNrLWlzLXJlcG9cIjtcblxuaW1wb3J0IHtjbGVhbldpdGhPcHRpb25zVGFzaywgaXNDbGVhbk9wdGlvbnNBcnJheX0gZnJvbSBcIi4vbGliL3Rhc2tzL2NsZWFuXCI7XG5cbmltcG9ydCB7ZGlmZlN1bW1hcnlUYXNrfSBmcm9tIFwiLi9saWIvdGFza3MvZGlmZlwiO1xuXG5pbXBvcnQge2ZldGNoVGFza30gZnJvbSBcIi4vbGliL3Rhc2tzL2ZldGNoXCI7XG5cbmltcG9ydCB7bW92ZVRhc2t9IGZyb20gXCIuL2xpYi90YXNrcy9tb3ZlXCI7XG5cbmltcG9ydCB7cHVsbFRhc2t9IGZyb20gXCIuL2xpYi90YXNrcy9wdWxsXCI7XG5cbmltcG9ydCB7cHVzaFRhZ3NUYXNrfSBmcm9tIFwiLi9saWIvdGFza3MvcHVzaFwiO1xuXG5pbXBvcnQge2FkZFJlbW90ZVRhc2ssIGdldFJlbW90ZXNUYXNrLCBsaXN0UmVtb3Rlc1Rhc2ssIHJlbW90ZVRhc2ssIHJlbW92ZVJlbW90ZVRhc2t9IGZyb20gXCIuL2xpYi90YXNrcy9yZW1vdGVcIjtcblxuaW1wb3J0IHtnZXRSZXNldE1vZGUsIHJlc2V0VGFza30gZnJvbSBcIi4vbGliL3Rhc2tzL3Jlc2V0XCI7XG5cbmltcG9ydCB7c3Rhc2hMaXN0VGFza30gZnJvbSBcIi4vbGliL3Rhc2tzL3N0YXNoLWxpc3RcIjtcblxuaW1wb3J0IHthZGRTdWJNb2R1bGVUYXNrLCBpbml0U3ViTW9kdWxlVGFzaywgc3ViTW9kdWxlVGFzaywgdXBkYXRlU3ViTW9kdWxlVGFza30gZnJvbSBcIi4vbGliL3Rhc2tzL3N1Yi1tb2R1bGVcIjtcblxuaW1wb3J0IHthZGRBbm5vdGF0ZWRUYWdUYXNrLCBhZGRUYWdUYXNrLCB0YWdMaXN0VGFza30gZnJvbSBcIi4vbGliL3Rhc2tzL3RhZ1wiO1xuXG5mdW5jdGlvbiBHaXQob3B0aW9ucywgcGx1Z2lucykge1xuICAgdGhpcy5fcGx1Z2lucyA9IHBsdWdpbnM7XG4gICB0aGlzLl9leGVjdXRvciA9IG5ldyBHaXRFeGVjdXRvcihcbiAgICAgIG9wdGlvbnMuYmFzZURpcixcbiAgICAgIG5ldyBTY2hlZHVsZXIob3B0aW9ucy5tYXhDb25jdXJyZW50UHJvY2Vzc2VzKSxcbiAgICAgIHBsdWdpbnNcbiAgICk7XG5cbiAgIHRoaXMuX3RyaW1tZWQgPSBvcHRpb25zLnRyaW1tZWQ7XG59XG5cbihHaXQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTaW1wbGVHaXRBcGkucHJvdG90eXBlKSkuY29uc3RydWN0b3IgPSBHaXQ7XG5cbi8qKlxuICogU2V0cyB0aGUgcGF0aCB0byBhIGN1c3RvbSBnaXQgYmluYXJ5LCBzaG91bGQgZWl0aGVyIGJlIGBnaXRgIHdoZW4gdGhlcmUgaXMgYW4gaW5zdGFsbGF0aW9uIG9mIGdpdCBhdmFpbGFibGUgb25cbiAqIHRoZSBzeXN0ZW0gcGF0aCwgb3IgYSBmdWxseSBxdWFsaWZpZWQgcGF0aCB0byB0aGUgZXhlY3V0YWJsZS5cbiAqL1xuR2l0LnByb3RvdHlwZS5jdXN0b21CaW5hcnkgPSBmdW5jdGlvbiAoY29tbWFuZCkge1xuICAgdGhpcy5fcGx1Z2lucy5yZWNvbmZpZ3VyZSgnYmluYXJ5JywgY29tbWFuZCk7XG4gICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyBhbiBlbnZpcm9ubWVudCB2YXJpYWJsZSBmb3IgdGhlIHNwYXduZWQgY2hpbGQgcHJvY2VzcywgZWl0aGVyIHN1cHBseSBib3RoIGEgbmFtZSBhbmQgdmFsdWUgYXMgc3RyaW5ncyBvclxuICogYSBzaW5nbGUgb2JqZWN0IHRvIGVudGlyZWx5IHJlcGxhY2UgdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdH0gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IFt2YWx1ZV1cbiAqIEByZXR1cm5zIHtHaXR9XG4gKi9cbkdpdC5wcm90b3R5cGUuZW52ID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMuX2V4ZWN1dG9yLmVudiA9IG5hbWU7XG4gICB9IGVsc2Uge1xuICAgICAgKHRoaXMuX2V4ZWN1dG9yLmVudiA9IHRoaXMuX2V4ZWN1dG9yLmVudiB8fCB7fSlbbmFtZV0gPSB2YWx1ZTtcbiAgIH1cblxuICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIExpc3QgdGhlIHN0YXNoKHMpIG9mIHRoZSBsb2NhbCByZXBvXG4gKi9cbkdpdC5wcm90b3R5cGUuc3Rhc2hMaXN0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgc3Rhc2hMaXN0VGFzayhcbiAgICAgICAgIHRyYWlsaW5nT3B0aW9uc0FyZ3VtZW50KGFyZ3VtZW50cykgfHwge30sXG4gICAgICAgICAoZmlsdGVyQXJyYXkob3B0aW9ucykgJiYgb3B0aW9ucykgfHwgW11cbiAgICAgICksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICogTW92ZXMgb25lIG9yIG1vcmUgZmlsZXMgdG8gYSBuZXcgZGVzdGluYXRpb24uXG4gKlxuICogQHNlZSBodHRwczovL2dpdC1zY20uY29tL2RvY3MvZ2l0LW12XG4gKlxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IGZyb21cbiAqIEBwYXJhbSB7c3RyaW5nfSB0b1xuICovXG5HaXQucHJvdG90eXBlLm12ID0gZnVuY3Rpb24gKGZyb20sIHRvKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhtb3ZlVGFzayhmcm9tLCB0byksIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpKTtcbn07XG5cbi8qKlxuICogSW50ZXJuYWxseSB1c2VzIHB1bGwgYW5kIHRhZ3MgdG8gZ2V0IHRoZSBsaXN0IG9mIHRhZ3MgdGhlbiBjaGVja3Mgb3V0IHRoZSBsYXRlc3QgdGFnLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFt0aGVuXVxuICovXG5HaXQucHJvdG90eXBlLmNoZWNrb3V0TGF0ZXN0VGFnID0gZnVuY3Rpb24gKHRoZW4pIHtcbiAgIHZhciBnaXQgPSB0aGlzO1xuICAgcmV0dXJuIHRoaXMucHVsbChmdW5jdGlvbiAoKSB7XG4gICAgICBnaXQudGFncyhmdW5jdGlvbiAoZXJyLCB0YWdzKSB7XG4gICAgICAgICBnaXQuY2hlY2tvdXQodGFncy5sYXRlc3QsIHRoZW4pO1xuICAgICAgfSk7XG4gICB9KTtcbn07XG5cbi8qKlxuICogUHVsbCB0aGUgdXBkYXRlZCBjb250ZW50cyBvZiB0aGUgY3VycmVudCByZXBvXG4gKi9cbkdpdC5wcm90b3R5cGUucHVsbCA9IGZ1bmN0aW9uIChyZW1vdGUsIGJyYW5jaCwgb3B0aW9ucywgdGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBwdWxsVGFzayhcbiAgICAgICAgIGZpbHRlclR5cGUocmVtb3RlLCBmaWx0ZXJTdHJpbmcpLFxuICAgICAgICAgZmlsdGVyVHlwZShicmFuY2gsIGZpbHRlclN0cmluZyksXG4gICAgICAgICBnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKVxuICAgICAgKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKiBGZXRjaCB0aGUgdXBkYXRlZCBjb250ZW50cyBvZiB0aGUgY3VycmVudCByZXBvLlxuICpcbiAqIEBleGFtcGxlXG4gKiAgIC5mZXRjaCgndXBzdHJlYW0nLCAnbWFzdGVyJykgLy8gZmV0Y2hlcyBmcm9tIG1hc3RlciBvbiByZW1vdGUgbmFtZWQgdXBzdHJlYW1cbiAqICAgLmZldGNoKGZ1bmN0aW9uICgpIHt9KSAvLyBydW5zIGZldGNoIGFnYWluc3QgZGVmYXVsdCByZW1vdGUgYW5kIGJyYW5jaCBhbmQgY2FsbHMgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gW3JlbW90ZV1cbiAqIEBwYXJhbSB7c3RyaW5nfSBbYnJhbmNoXVxuICovXG5HaXQucHJvdG90eXBlLmZldGNoID0gZnVuY3Rpb24gKHJlbW90ZSwgYnJhbmNoKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIGZldGNoVGFzayhcbiAgICAgICAgIGZpbHRlclR5cGUocmVtb3RlLCBmaWx0ZXJTdHJpbmcpLFxuICAgICAgICAgZmlsdGVyVHlwZShicmFuY2gsIGZpbHRlclN0cmluZyksXG4gICAgICAgICBnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKVxuICAgICAgKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKiBMaXN0IGFsbCB0YWdzLiBXaGVuIHVzaW5nIGdpdCAyLjcuMCBvciBhYm92ZSwgaW5jbHVkZSBhbiBvcHRpb25zIG9iamVjdCB3aXRoIGBcIi0tc29ydFwiOiBcInByb3BlcnR5LW5hbWVcImAgdG9cbiAqIHNvcnQgdGhlIHRhZ3MgYnkgdGhhdCBwcm9wZXJ0eSBpbnN0ZWFkIG9mIHVzaW5nIHRoZSBkZWZhdWx0IHNlbWFudGljIHZlcnNpb25pbmcgc29ydC5cbiAqXG4gKiBOb3RlLCBzdXBwbHlpbmcgdGhpcyBvcHRpb24gd2hlbiBpdCBpcyBub3Qgc3VwcG9ydGVkIGJ5IHlvdXIgR2l0IHZlcnNpb24gd2lsbCBjYXVzZSB0aGUgb3BlcmF0aW9uIHRvIGZhaWwuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3RoZW5dXG4gKi9cbkdpdC5wcm90b3R5cGUudGFncyA9IGZ1bmN0aW9uIChvcHRpb25zLCB0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIHRhZ0xpc3RUYXNrKGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKiBSZWJhc2VzIHRoZSBjdXJyZW50IHdvcmtpbmcgY29weS4gT3B0aW9ucyBjYW4gYmUgc3VwcGxpZWQgZWl0aGVyIGFzIGFuIGFycmF5IG9mIHN0cmluZyBwYXJhbWV0ZXJzXG4gKiB0byBiZSBzZW50IHRvIHRoZSBgZ2l0IHJlYmFzZWAgY29tbWFuZCwgb3IgYSBzdGFuZGFyZCBvcHRpb25zIG9iamVjdC5cbiAqL1xuR2l0LnByb3RvdHlwZS5yZWJhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soWydyZWJhc2UnLCAuLi5nZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKV0pLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG4vKipcbiAqIFJlc2V0IGEgcmVwb1xuICovXG5HaXQucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKG1vZGUpIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgcmVzZXRUYXNrKGdldFJlc2V0TW9kZShtb2RlKSwgZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cykpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG4vKipcbiAqIFJldmVydCBvbmUgb3IgbW9yZSBjb21taXRzIGluIHRoZSBsb2NhbCB3b3JraW5nIGNvcHlcbiAqL1xuR2l0LnByb3RvdHlwZS5yZXZlcnQgPSBmdW5jdGlvbiAoY29tbWl0KSB7XG4gICBjb25zdCBuZXh0ID0gdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cyk7XG5cbiAgIGlmICh0eXBlb2YgY29tbWl0ICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMuX3J1blRhc2soY29uZmlndXJhdGlvbkVycm9yVGFzaygnQ29tbWl0IG11c3QgYmUgYSBzdHJpbmcnKSwgbmV4dCk7XG4gICB9XG5cbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhbJ3JldmVydCcsIC4uLmdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMsIDAsIHRydWUpLCBjb21taXRdKSxcbiAgICAgIG5leHRcbiAgICk7XG59O1xuXG4vKipcbiAqIEFkZCBhIGxpZ2h0d2VpZ2h0IHRhZyB0byB0aGUgaGVhZCBvZiB0aGUgY3VycmVudCBicmFuY2hcbiAqL1xuR2l0LnByb3RvdHlwZS5hZGRUYWcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgY29uc3QgdGFzayA9XG4gICAgICB0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZydcbiAgICAgICAgID8gYWRkVGFnVGFzayhuYW1lKVxuICAgICAgICAgOiBjb25maWd1cmF0aW9uRXJyb3JUYXNrKCdHaXQuYWRkVGFnIHJlcXVpcmVzIGEgdGFnIG5hbWUnKTtcblxuICAgcmV0dXJuIHRoaXMuX3J1blRhc2sodGFzaywgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cykpO1xufTtcblxuLyoqXG4gKiBBZGQgYW4gYW5ub3RhdGVkIHRhZyB0byB0aGUgaGVhZCBvZiB0aGUgY3VycmVudCBicmFuY2hcbiAqL1xuR2l0LnByb3RvdHlwZS5hZGRBbm5vdGF0ZWRUYWcgPSBmdW5jdGlvbiAodGFnTmFtZSwgdGFnTWVzc2FnZSkge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBhZGRBbm5vdGF0ZWRUYWdUYXNrKHRhZ05hbWUsIHRhZ01lc3NhZ2UpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG4vKipcbiAqIERlbGV0ZSBhIGxvY2FsIGJyYW5jaFxuICovXG5HaXQucHJvdG90eXBlLmRlbGV0ZUxvY2FsQnJhbmNoID0gZnVuY3Rpb24gKGJyYW5jaE5hbWUsIGZvcmNlRGVsZXRlLCB0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIGRlbGV0ZUJyYW5jaFRhc2soYnJhbmNoTmFtZSwgdHlwZW9mIGZvcmNlRGVsZXRlID09PSAnYm9vbGVhbicgPyBmb3JjZURlbGV0ZSA6IGZhbHNlKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKiBEZWxldGUgb25lIG9yIG1vcmUgbG9jYWwgYnJhbmNoZXNcbiAqL1xuR2l0LnByb3RvdHlwZS5kZWxldGVMb2NhbEJyYW5jaGVzID0gZnVuY3Rpb24gKGJyYW5jaE5hbWVzLCBmb3JjZURlbGV0ZSwgdGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBkZWxldGVCcmFuY2hlc1Rhc2soYnJhbmNoTmFtZXMsIHR5cGVvZiBmb3JjZURlbGV0ZSA9PT0gJ2Jvb2xlYW4nID8gZm9yY2VEZWxldGUgOiBmYWxzZSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICogTGlzdCBhbGwgYnJhbmNoZXNcbiAqXG4gKiBAcGFyYW0ge09iamVjdCB8IHN0cmluZ1tdfSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFt0aGVuXVxuICovXG5HaXQucHJvdG90eXBlLmJyYW5jaCA9IGZ1bmN0aW9uIChvcHRpb25zLCB0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIGJyYW5jaFRhc2soZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cykpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG4vKipcbiAqIFJldHVybiBsaXN0IG9mIGxvY2FsIGJyYW5jaGVzXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3RoZW5dXG4gKi9cbkdpdC5wcm90b3R5cGUuYnJhbmNoTG9jYWwgPSBmdW5jdGlvbiAodGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soYnJhbmNoTG9jYWxUYXNrKCksIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpKTtcbn07XG5cbi8qKlxuICogRXhlY3V0ZXMgYW55IGNvbW1hbmQgYWdhaW5zdCB0aGUgZ2l0IGJpbmFyeS5cbiAqL1xuR2l0LnByb3RvdHlwZS5yYXcgPSBmdW5jdGlvbiAoY29tbWFuZHMpIHtcbiAgIGNvbnN0IGNyZWF0ZVJlc3RDb21tYW5kcyA9ICFBcnJheS5pc0FycmF5KGNvbW1hbmRzKTtcbiAgIGNvbnN0IGNvbW1hbmQgPSBbXS5zbGljZS5jYWxsKGNyZWF0ZVJlc3RDb21tYW5kcyA/IGFyZ3VtZW50cyA6IGNvbW1hbmRzLCAwKTtcblxuICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21tYW5kLmxlbmd0aCAmJiBjcmVhdGVSZXN0Q29tbWFuZHM7IGkrKykge1xuICAgICAgaWYgKCFmaWx0ZXJQcmltaXRpdmVzKGNvbW1hbmRbaV0pKSB7XG4gICAgICAgICBjb21tYW5kLnNwbGljZShpLCBjb21tYW5kLmxlbmd0aCAtIGkpO1xuICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICB9XG5cbiAgIGNvbW1hbmQucHVzaCguLi5nZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzLCAwLCB0cnVlKSk7XG5cbiAgIHZhciBuZXh0ID0gdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cyk7XG5cbiAgIGlmICghY29tbWFuZC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgY29uZmlndXJhdGlvbkVycm9yVGFzaygnUmF3OiBtdXN0IHN1cHBseSBvbmUgb3IgbW9yZSBjb21tYW5kIHRvIGV4ZWN1dGUnKSxcbiAgICAgICAgIG5leHRcbiAgICAgICk7XG4gICB9XG5cbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soY29tbWFuZCwgdGhpcy5fdHJpbW1lZCksIG5leHQpO1xufTtcblxuR2l0LnByb3RvdHlwZS5zdWJtb2R1bGVBZGQgPSBmdW5jdGlvbiAocmVwbywgcGF0aCwgdGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soYWRkU3ViTW9kdWxlVGFzayhyZXBvLCBwYXRoKSwgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cykpO1xufTtcblxuR2l0LnByb3RvdHlwZS5zdWJtb2R1bGVVcGRhdGUgPSBmdW5jdGlvbiAoYXJncywgdGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICB1cGRhdGVTdWJNb2R1bGVUYXNrKGdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMsIHRydWUpKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuR2l0LnByb3RvdHlwZS5zdWJtb2R1bGVJbml0ID0gZnVuY3Rpb24gKGFyZ3MsIHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgaW5pdFN1Yk1vZHVsZVRhc2soZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cywgdHJ1ZSkpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG5HaXQucHJvdG90eXBlLnN1Yk1vZHVsZSA9IGZ1bmN0aW9uIChvcHRpb25zLCB0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIHN1Yk1vZHVsZVRhc2soZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cykpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG5HaXQucHJvdG90eXBlLmxpc3RSZW1vdGUgPSBmdW5jdGlvbiAoKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIGxpc3RSZW1vdGVzVGFzayhnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICogQWRkcyBhIHJlbW90ZSB0byB0aGUgbGlzdCBvZiByZW1vdGVzLlxuICovXG5HaXQucHJvdG90eXBlLmFkZFJlbW90ZSA9IGZ1bmN0aW9uIChyZW1vdGVOYW1lLCByZW1vdGVSZXBvLCB0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIGFkZFJlbW90ZVRhc2socmVtb3RlTmFtZSwgcmVtb3RlUmVwbywgZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cykpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgYW4gZW50cnkgYnkgbmFtZSBmcm9tIHRoZSBsaXN0IG9mIHJlbW90ZXMuXG4gKi9cbkdpdC5wcm90b3R5cGUucmVtb3ZlUmVtb3RlID0gZnVuY3Rpb24gKHJlbW90ZU5hbWUsIHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKHJlbW92ZVJlbW90ZVRhc2socmVtb3RlTmFtZSksIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpKTtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgY3VycmVudGx5IGF2YWlsYWJsZSByZW1vdGVzLCBzZXR0aW5nIHRoZSBvcHRpb25hbCB2ZXJib3NlIGFyZ3VtZW50IHRvIHRydWUgaW5jbHVkZXMgYWRkaXRpb25hbFxuICogZGV0YWlsIG9uIHRoZSByZW1vdGVzIHRoZW1zZWx2ZXMuXG4gKi9cbkdpdC5wcm90b3R5cGUuZ2V0UmVtb3RlcyA9IGZ1bmN0aW9uICh2ZXJib3NlLCB0aGVuKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhnZXRSZW1vdGVzVGFzayh2ZXJib3NlID09PSB0cnVlKSwgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cykpO1xufTtcblxuLyoqXG4gKiBDYWxsIGFueSBgZ2l0IHJlbW90ZWAgZnVuY3Rpb24gd2l0aCBhcmd1bWVudHMgcGFzc2VkIGFzIGFuIGFycmF5IG9mIHN0cmluZ3MuXG4gKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gb3B0aW9uc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gW3RoZW5dXG4gKi9cbkdpdC5wcm90b3R5cGUucmVtb3RlID0gZnVuY3Rpb24gKG9wdGlvbnMsIHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgcmVtb3RlVGFzayhnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICogQ2FsbCBhbnkgYGdpdCB0YWdgIGZ1bmN0aW9uIHdpdGggYXJndW1lbnRzIHBhc3NlZCBhcyBhbiBhcnJheSBvZiBzdHJpbmdzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nW119IG9wdGlvbnNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFt0aGVuXVxuICovXG5HaXQucHJvdG90eXBlLnRhZyA9IGZ1bmN0aW9uIChvcHRpb25zLCB0aGVuKSB7XG4gICBjb25zdCBjb21tYW5kID0gZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cyk7XG5cbiAgIGlmIChjb21tYW5kWzBdICE9PSAndGFnJykge1xuICAgICAgY29tbWFuZC51bnNoaWZ0KCd0YWcnKTtcbiAgIH1cblxuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhjb21tYW5kKSwgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cykpO1xufTtcblxuLyoqXG4gKiBVcGRhdGVzIHJlcG9zaXRvcnkgc2VydmVyIGluZm9cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdGhlbl1cbiAqL1xuR2l0LnByb3RvdHlwZS51cGRhdGVTZXJ2ZXJJbmZvID0gZnVuY3Rpb24gKHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhbJ3VwZGF0ZS1zZXJ2ZXItaW5mbyddKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKiBQdXNoZXMgdGhlIGN1cnJlbnQgdGFnIGNoYW5nZXMgdG8gYSByZW1vdGUgd2hpY2ggY2FuIGJlIGVpdGhlciBhIFVSTCBvciBuYW1lZCByZW1vdGUuIFdoZW4gbm90IHNwZWNpZmllZCB1c2VzIHRoZVxuICogZGVmYXVsdCBjb25maWd1cmVkIHJlbW90ZSBzcGVjLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBbcmVtb3RlXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3RoZW5dXG4gKi9cbkdpdC5wcm90b3R5cGUucHVzaFRhZ3MgPSBmdW5jdGlvbiAocmVtb3RlLCB0aGVuKSB7XG4gICBjb25zdCB0YXNrID0gcHVzaFRhZ3NUYXNrKFxuICAgICAgeyByZW1vdGU6IGZpbHRlclR5cGUocmVtb3RlLCBmaWx0ZXJTdHJpbmcpIH0sXG4gICAgICBnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzKVxuICAgKTtcblxuICAgcmV0dXJuIHRoaXMuX3J1blRhc2sodGFzaywgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cykpO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBuYW1lZCBmaWxlcyBmcm9tIHNvdXJjZSBjb250cm9sLlxuICovXG5HaXQucHJvdG90eXBlLnJtID0gZnVuY3Rpb24gKGZpbGVzKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soWydybScsICctZicsIC4uLmFzQXJyYXkoZmlsZXMpXSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyB0aGUgbmFtZWQgZmlsZXMgZnJvbSBzb3VyY2UgY29udHJvbCBidXQga2VlcHMgdGhlbSBvbiBkaXNrIHJhdGhlciB0aGFuIGRlbGV0aW5nIHRoZW0gZW50aXJlbHkuIFRvXG4gKiBjb21wbGV0ZWx5IHJlbW92ZSB0aGUgZmlsZXMsIHVzZSBgcm1gLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBmaWxlc1xuICovXG5HaXQucHJvdG90eXBlLnJtS2VlcExvY2FsID0gZnVuY3Rpb24gKGZpbGVzKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIHN0cmFpZ2h0VGhyb3VnaFN0cmluZ1Rhc2soWydybScsICctLWNhY2hlZCcsIC4uLmFzQXJyYXkoZmlsZXMpXSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIGxpc3Qgb2Ygb2JqZWN0cyBpbiBhIHRyZWUgYmFzZWQgb24gY29tbWl0IGhhc2guIFBhc3NpbmcgaW4gYW4gb2JqZWN0IGhhc2ggcmV0dXJucyB0aGUgb2JqZWN0J3MgY29udGVudCxcbiAqIHNpemUsIGFuZCB0eXBlLlxuICpcbiAqIFBhc3NpbmcgXCItcFwiIHdpbGwgaW5zdHJ1Y3QgY2F0LWZpbGUgdG8gZGV0ZXJtaW5lIHRoZSBvYmplY3QgdHlwZSwgYW5kIGRpc3BsYXkgaXRzIGZvcm1hdHRlZCBjb250ZW50cy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFt0aGVuXVxuICovXG5HaXQucHJvdG90eXBlLmNhdEZpbGUgPSBmdW5jdGlvbiAob3B0aW9ucywgdGhlbikge1xuICAgcmV0dXJuIHRoaXMuX2NhdEZpbGUoJ3V0Zi04JywgYXJndW1lbnRzKTtcbn07XG5cbkdpdC5wcm90b3R5cGUuYmluYXJ5Q2F0RmlsZSA9IGZ1bmN0aW9uICgpIHtcbiAgIHJldHVybiB0aGlzLl9jYXRGaWxlKCdidWZmZXInLCBhcmd1bWVudHMpO1xufTtcblxuR2l0LnByb3RvdHlwZS5fY2F0RmlsZSA9IGZ1bmN0aW9uIChmb3JtYXQsIGFyZ3MpIHtcbiAgIHZhciBoYW5kbGVyID0gdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3MpO1xuICAgdmFyIGNvbW1hbmQgPSBbJ2NhdC1maWxlJ107XG4gICB2YXIgb3B0aW9ucyA9IGFyZ3NbMF07XG5cbiAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgICAgY29uZmlndXJhdGlvbkVycm9yVGFzaygnR2l0LmNhdEZpbGU6IG9wdGlvbnMgbXVzdCBiZSBzdXBwbGllZCBhcyBhbiBhcnJheSBvZiBzdHJpbmdzJyksXG4gICAgICAgICBoYW5kbGVyXG4gICAgICApO1xuICAgfVxuXG4gICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgY29tbWFuZC5wdXNoLmFwcGx5KGNvbW1hbmQsIG9wdGlvbnMpO1xuICAgfVxuXG4gICBjb25zdCB0YXNrID1cbiAgICAgIGZvcm1hdCA9PT0gJ2J1ZmZlcicgPyBzdHJhaWdodFRocm91Z2hCdWZmZXJUYXNrKGNvbW1hbmQpIDogc3RyYWlnaHRUaHJvdWdoU3RyaW5nVGFzayhjb21tYW5kKTtcblxuICAgcmV0dXJuIHRoaXMuX3J1blRhc2sodGFzaywgaGFuZGxlcik7XG59O1xuXG5HaXQucHJvdG90eXBlLmRpZmYgPSBmdW5jdGlvbiAob3B0aW9ucywgdGhlbikge1xuICAgY29uc3QgdGFzayA9IGZpbHRlclN0cmluZyhvcHRpb25zKVxuICAgICAgPyBjb25maWd1cmF0aW9uRXJyb3JUYXNrKFxuICAgICAgICAgICAnZ2l0LmRpZmY6IHN1cHBseWluZyBvcHRpb25zIGFzIGEgc2luZ2xlIHN0cmluZyBpcyBubyBsb25nZXIgc3VwcG9ydGVkLCBzd2l0Y2ggdG8gYW4gYXJyYXkgb2Ygc3RyaW5ncydcbiAgICAgICAgKVxuICAgICAgOiBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKFsnZGlmZicsIC4uLmdldFRyYWlsaW5nT3B0aW9ucyhhcmd1bWVudHMpXSk7XG5cbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKHRhc2ssIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpKTtcbn07XG5cbkdpdC5wcm90b3R5cGUuZGlmZlN1bW1hcnkgPSBmdW5jdGlvbiAoKSB7XG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayhcbiAgICAgIGRpZmZTdW1tYXJ5VGFzayhnZXRUcmFpbGluZ09wdGlvbnMoYXJndW1lbnRzLCAxKSksXG4gICAgICB0cmFpbGluZ0Z1bmN0aW9uQXJndW1lbnQoYXJndW1lbnRzKVxuICAgKTtcbn07XG5cbkdpdC5wcm90b3R5cGUuYXBwbHlQYXRjaCA9IGZ1bmN0aW9uIChwYXRjaGVzKSB7XG4gICBjb25zdCB0YXNrID0gIWZpbHRlclN0cmluZ09yU3RyaW5nQXJyYXkocGF0Y2hlcylcbiAgICAgID8gY29uZmlndXJhdGlvbkVycm9yVGFzayhcbiAgICAgICAgICAgYGdpdC5hcHBseVBhdGNoIHJlcXVpcmVzIG9uZSBvciBtb3JlIHN0cmluZyBwYXRjaGVzIGFzIHRoZSBmaXJzdCBhcmd1bWVudGBcbiAgICAgICAgKVxuICAgICAgOiBhcHBseVBhdGNoVGFzayhhc0FycmF5KHBhdGNoZXMpLCBnZXRUcmFpbGluZ09wdGlvbnMoW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKSk7XG5cbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKHRhc2ssIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpKTtcbn07XG5cbkdpdC5wcm90b3R5cGUucmV2cGFyc2UgPSBmdW5jdGlvbiAoKSB7XG4gICBjb25zdCBjb21tYW5kcyA9IFsncmV2LXBhcnNlJywgLi4uZ2V0VHJhaWxpbmdPcHRpb25zKGFyZ3VtZW50cywgdHJ1ZSldO1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrKGNvbW1hbmRzLCB0cnVlKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuLyoqXG4gKi9cbkdpdC5wcm90b3R5cGUuY2xlYW4gPSBmdW5jdGlvbiAobW9kZSwgb3B0aW9ucywgdGhlbikge1xuICAgY29uc3QgdXNpbmdDbGVhbk9wdGlvbnNBcnJheSA9IGlzQ2xlYW5PcHRpb25zQXJyYXkobW9kZSk7XG4gICBjb25zdCBjbGVhbk1vZGUgPVxuICAgICAgKHVzaW5nQ2xlYW5PcHRpb25zQXJyYXkgJiYgbW9kZS5qb2luKCcnKSkgfHwgZmlsdGVyVHlwZShtb2RlLCBmaWx0ZXJTdHJpbmcpIHx8ICcnO1xuICAgY29uc3QgY3VzdG9tQXJncyA9IGdldFRyYWlsaW5nT3B0aW9ucyhbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgdXNpbmdDbGVhbk9wdGlvbnNBcnJheSA/IDEgOiAwKSk7XG5cbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgY2xlYW5XaXRoT3B0aW9uc1Rhc2soY2xlYW5Nb2RlLCBjdXN0b21BcmdzKSxcbiAgICAgIHRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudChhcmd1bWVudHMpXG4gICApO1xufTtcblxuR2l0LnByb3RvdHlwZS5leGVjID0gZnVuY3Rpb24gKHRoZW4pIHtcbiAgIGNvbnN0IHRhc2sgPSB7XG4gICAgICBjb21tYW5kczogW10sXG4gICAgICBmb3JtYXQ6ICd1dGYtOCcsXG4gICAgICBwYXJzZXIoKSB7XG4gICAgICAgICBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoZW4oKTtcbiAgICAgICAgIH1cbiAgICAgIH0sXG4gICB9O1xuXG4gICByZXR1cm4gdGhpcy5fcnVuVGFzayh0YXNrKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBwYXRobmFtZSBvciBwYXRobmFtZXMgYXJlIGV4Y2x1ZGVkIGJ5IC5naXRpZ25vcmVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gcGF0aG5hbWVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdGhlbl1cbiAqL1xuR2l0LnByb3RvdHlwZS5jaGVja0lnbm9yZSA9IGZ1bmN0aW9uIChwYXRobmFtZXMsIHRoZW4pIHtcbiAgIHJldHVybiB0aGlzLl9ydW5UYXNrKFxuICAgICAgY2hlY2tJZ25vcmVUYXNrKGFzQXJyYXkoZmlsdGVyVHlwZShwYXRobmFtZXMsIGZpbHRlclN0cmluZ09yU3RyaW5nQXJyYXksIFtdKSkpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG5HaXQucHJvdG90eXBlLmNoZWNrSXNSZXBvID0gZnVuY3Rpb24gKGNoZWNrVHlwZSwgdGhlbikge1xuICAgcmV0dXJuIHRoaXMuX3J1blRhc2soXG4gICAgICBjaGVja0lzUmVwb1Rhc2soZmlsdGVyVHlwZShjaGVja1R5cGUsIGZpbHRlclN0cmluZykpLFxuICAgICAgdHJhaWxpbmdGdW5jdGlvbkFyZ3VtZW50KGFyZ3VtZW50cylcbiAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHaXQ7XG4iLCAiaW1wb3J0IHsgR2l0UGx1Z2luRXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvZ2l0LXBsdWdpbi1lcnJvcic7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdE9wdGlvbnMgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdFBsdWdpbiB9IGZyb20gJy4vc2ltcGxlLWdpdC1wbHVnaW4nO1xuXG5leHBvcnQgZnVuY3Rpb24gYWJvcnRQbHVnaW4oc2lnbmFsOiBTaW1wbGVHaXRPcHRpb25zWydhYm9ydCddKSB7XG4gICBpZiAoIXNpZ25hbCkge1xuICAgICAgcmV0dXJuO1xuICAgfVxuXG4gICBjb25zdCBvblNwYXduQWZ0ZXI6IFNpbXBsZUdpdFBsdWdpbjwnc3Bhd24uYWZ0ZXInPiA9IHtcbiAgICAgIHR5cGU6ICdzcGF3bi5hZnRlcicsXG4gICAgICBhY3Rpb24oX2RhdGEsIGNvbnRleHQpIHtcbiAgICAgICAgIGZ1bmN0aW9uIGtpbGwoKSB7XG4gICAgICAgICAgICBjb250ZXh0LmtpbGwobmV3IEdpdFBsdWdpbkVycm9yKHVuZGVmaW5lZCwgJ2Fib3J0JywgJ0Fib3J0IHNpZ25hbCByZWNlaXZlZCcpKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywga2lsbCk7XG5cbiAgICAgICAgIGNvbnRleHQuc3Bhd25lZC5vbignY2xvc2UnLCAoKSA9PiBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBraWxsKSk7XG4gICAgICB9LFxuICAgfTtcblxuICAgY29uc3Qgb25TcGF3bkJlZm9yZTogU2ltcGxlR2l0UGx1Z2luPCdzcGF3bi5iZWZvcmUnPiA9IHtcbiAgICAgIHR5cGU6ICdzcGF3bi5iZWZvcmUnLFxuICAgICAgYWN0aW9uKF9kYXRhLCBjb250ZXh0KSB7XG4gICAgICAgICBpZiAoc2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgICAgICAgIGNvbnRleHQua2lsbChuZXcgR2l0UGx1Z2luRXJyb3IodW5kZWZpbmVkLCAnYWJvcnQnLCAnQWJvcnQgYWxyZWFkeSBzaWduYWxlZCcpKTtcbiAgICAgICAgIH1cbiAgICAgIH0sXG4gICB9O1xuXG4gICByZXR1cm4gW29uU3Bhd25CZWZvcmUsIG9uU3Bhd25BZnRlcl07XG59XG4iLCAiaW1wb3J0IHsgaXNHaXRFbnZLZXkgfSBmcm9tICdAc2ltcGxlLWdpdC9hcmd2LXBhcnNlcic7XG5cbmltcG9ydCB7IEdpdFBsdWdpbkVycm9yIH0gZnJvbSAnLi4vZXJyb3JzL2dpdC1wbHVnaW4tZXJyb3InO1xuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSAnLi4vZ2l0LWxvZ2dlcic7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdFBsdWdpbiB9IGZyb20gJy4vc2ltcGxlLWdpdC1wbHVnaW4nO1xuXG5jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoJycsICdwbHVnaW46YWxsb3dFbnZpcm9ubWVudCcpO1xuXG5leHBvcnQgZnVuY3Rpb24gYWxsb3dFbnZpcm9ubWVudFBsdWdpbihcbiAgIGFsbG93RW52aXJvbm1lbnQ6IHJlYWRvbmx5IHN0cmluZ1tdLFxuICAgYWxsb3dBYmJyZXZpYXRlZE9wdGlvbnMgPSBmYWxzZVxuKTogU2ltcGxlR2l0UGx1Z2luPCdzcGF3bi5vcHRpb25zJz4ge1xuICAgY29uc3QgYWxsb3dlZCA9IG5ldyBTZXQoYWxsb3dFbnZpcm9ubWVudC5tYXAoKGtleSkgPT4ga2V5LnRvTG93ZXJDYXNlKCkudHJpbSgpKSk7XG5cbiAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnc3Bhd24ub3B0aW9ucycsXG4gICAgICBhY3Rpb24oc3Bhd25PcHRpb25zLCBjb250ZXh0KSB7XG4gICAgICAgICBjb25zdCBlbnYgPSB7IC4uLihzcGF3bk9wdGlvbnMuZW52ID8/IHByb2Nlc3MuZW52KSB9O1xuICAgICAgICAgY29uc3Qgc3VwcGxpZWRLZXlzID0gbmV3IFNldChcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGNvbnRleHQuZW52KS5tYXAoKGtleSkgPT4ga2V5LnRvTG93ZXJDYXNlKCkudHJpbSgpKVxuICAgICAgICAgKTtcblxuICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZW52KSkge1xuICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXNlZCA9IGtleS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcblxuICAgICAgICAgICAgLy8gbm90IGEgR0lUXyBrZXksIG9yIGV4cGxpY2l0bHkgcGVybWl0dGVkXG4gICAgICAgICAgICBpZiAoIWlzR3VhcmRlZEVudktleShub3JtYWxpc2VkKSB8fCBhbGxvd2VkLmhhcyhub3JtYWxpc2VkKSkge1xuICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGV4cGxpY2l0bHkgdGhyb3cgd2hlbiBzaW1wbGVHaXQuZW52KCkgd2FzIGNhbGxlZCB3aXRoIGEgZ3VhcmRlZCBrZXlcbiAgICAgICAgICAgIGlmIChzdXBwbGllZEtleXMuaGFzKG5vcm1hbGlzZWQpKSB7XG4gICAgICAgICAgICAgICB0aHJvdyBuZXcgR2l0UGx1Z2luRXJyb3IoXG4gICAgICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAnYWxsb3dFbnZpcm9ubWVudCcsXG4gICAgICAgICAgICAgICAgICBgVXNlIG9mIFwiJHtrZXl9XCIgaXMgYmxvY2tlZCBieSB0aGUgZW52aXJvbm1lbnQgZ3VhcmQgLSBhZGQgaXQgdG8gdGhlIGFsbG93RW52aXJvbm1lbnQgb3B0aW9uIHRvIHBlcm1pdCBpdGBcbiAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGxvZyBhbmQgcmVtb3ZlIGd1YXJkZWQga2V5cyBpbmhlcml0ZWQgZnJvbSB0aGUgb3V0ZXIgZW52aXJvbm1lbnRcbiAgICAgICAgICAgIGxvZ2dlcihgcmVtb3ZpbmcgYW1iaWVudCBndWFyZGVkIGVudmlyb25tZW50IHZhcmlhYmxlICVzYCwga2V5KTtcbiAgICAgICAgICAgIGRlbGV0ZSBlbnZba2V5XTtcbiAgICAgICAgIH1cblxuICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnNwYXduT3B0aW9ucyxcbiAgICAgICAgICAgIGVudjoge1xuICAgICAgICAgICAgICAgLi4uZW52LFxuICAgICAgICAgICAgICAgR0lUX1RFU1RfRElTQUxMT1dfQUJCUkVWSUFURURfT1BUSU9OUzogU3RyaW5nKCFhbGxvd0FiYnJldmlhdGVkT3B0aW9ucyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgfTtcbiAgICAgIH0sXG4gICB9O1xufVxuXG5mdW5jdGlvbiBpc0d1YXJkZWRFbnZLZXkoa2V5OiBzdHJpbmcpIHtcbiAgIGNvbnN0IG5vcm1hbGlzZWQgPSBrZXkudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICByZXR1cm4gbm9ybWFsaXNlZC5zdGFydHNXaXRoKCdnaXRfJykgfHwgaXNHaXRFbnZLZXkobm9ybWFsaXNlZCk7XG59XG4iLCAiaW1wb3J0IHsgdnVsbmVyYWJpbGl0eUNoZWNrIH0gZnJvbSAnQHNpbXBsZS1naXQvYXJndi1wYXJzZXInO1xuXG5pbXBvcnQgeyBHaXRQbHVnaW5FcnJvciB9IGZyb20gJy4uL2Vycm9ycy9naXQtcGx1Z2luLWVycm9yJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0UGx1Z2luQ29uZmlnIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRQbHVnaW4gfSBmcm9tICcuL3NpbXBsZS1naXQtcGx1Z2luJztcblxuZXhwb3J0IGZ1bmN0aW9uIGJsb2NrVW5zYWZlT3BlcmF0aW9uc1BsdWdpbihcbiAgIG9wdGlvbnM6IFNpbXBsZUdpdFBsdWdpbkNvbmZpZ1sndW5zYWZlJ10gPSB7fVxuKTogU2ltcGxlR2l0UGx1Z2luPCdzcGF3bi5hcmdzJz4ge1xuICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdzcGF3bi5hcmdzJyxcbiAgICAgIGFjdGlvbihhcmdzLCB7IGVudiB9KSB7XG4gICAgICAgICBmb3IgKGNvbnN0IHZ1bG5lcmFiaWxpdHkgb2YgdnVsbmVyYWJpbGl0eUNoZWNrKGFyZ3MsIGVudikpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zW3Z1bG5lcmFiaWxpdHkuY2F0ZWdvcnldICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICB0aHJvdyBuZXcgR2l0UGx1Z2luRXJyb3IodW5kZWZpbmVkLCAndW5zYWZlJywgdnVsbmVyYWJpbGl0eS5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH1cblxuICAgICAgICAgcmV0dXJuIGFyZ3M7XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgeyBwcmVmaXhlZEFycmF5IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRQbHVnaW4gfSBmcm9tICcuL3NpbXBsZS1naXQtcGx1Z2luJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbW1hbmRDb25maWdQcmVmaXhpbmdQbHVnaW4oXG4gICBjb25maWd1cmF0aW9uOiBzdHJpbmdbXVxuKTogU2ltcGxlR2l0UGx1Z2luPCdzcGF3bi5hcmdzJz4ge1xuICAgY29uc3QgcHJlZml4ID0gcHJlZml4ZWRBcnJheShjb25maWd1cmF0aW9uLCAnLWMnKTtcblxuICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdzcGF3bi5hcmdzJyxcbiAgICAgIGFjdGlvbihkYXRhKSB7XG4gICAgICAgICByZXR1cm4gWy4uLnByZWZpeCwgLi4uZGF0YV07XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgeyB0eXBlIERlZmVycmVkUHJvbWlzZSwgZGVmZXJyZWQgfSBmcm9tICdAa3dzaXRlcy9wcm9taXNlLWRlZmVycmVkJztcblxuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRQbHVnaW5Db25maWcgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBkZWxheSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0UGx1Z2luIH0gZnJvbSAnLi9zaW1wbGUtZ2l0LXBsdWdpbic7XG5cbmNvbnN0IG5ldmVyID0gZGVmZXJyZWQoKS5wcm9taXNlO1xuXG5leHBvcnQgZnVuY3Rpb24gY29tcGxldGlvbkRldGVjdGlvblBsdWdpbih7XG4gICBvbkNsb3NlID0gdHJ1ZSxcbiAgIG9uRXhpdCA9IDUwLFxufTogU2ltcGxlR2l0UGx1Z2luQ29uZmlnWydjb21wbGV0aW9uJ10gPSB7fSk6IFNpbXBsZUdpdFBsdWdpbjwnc3Bhd24uYWZ0ZXInPiB7XG4gICBmdW5jdGlvbiBjcmVhdGVFdmVudHMoKSB7XG4gICAgICBsZXQgZXhpdENvZGUgPSAtMTtcbiAgICAgIGNvbnN0IGV2ZW50cyA9IHtcbiAgICAgICAgIGNsb3NlOiBkZWZlcnJlZCgpLFxuICAgICAgICAgY2xvc2VUaW1lb3V0OiBkZWZlcnJlZCgpLFxuICAgICAgICAgZXhpdDogZGVmZXJyZWQoKSxcbiAgICAgICAgIGV4aXRUaW1lb3V0OiBkZWZlcnJlZCgpLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gUHJvbWlzZS5yYWNlKFtcbiAgICAgICAgIG9uQ2xvc2UgPT09IGZhbHNlID8gbmV2ZXIgOiBldmVudHMuY2xvc2VUaW1lb3V0LnByb21pc2UsXG4gICAgICAgICBvbkV4aXQgPT09IGZhbHNlID8gbmV2ZXIgOiBldmVudHMuZXhpdFRpbWVvdXQucHJvbWlzZSxcbiAgICAgIF0pO1xuXG4gICAgICBjb25maWd1cmVUaW1lb3V0KG9uQ2xvc2UsIGV2ZW50cy5jbG9zZSwgZXZlbnRzLmNsb3NlVGltZW91dCk7XG4gICAgICBjb25maWd1cmVUaW1lb3V0KG9uRXhpdCwgZXZlbnRzLmV4aXQsIGV2ZW50cy5leGl0VGltZW91dCk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgICBjbG9zZShjb2RlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIGV4aXRDb2RlID0gY29kZTtcbiAgICAgICAgICAgIGV2ZW50cy5jbG9zZS5kb25lKCk7XG4gICAgICAgICB9LFxuICAgICAgICAgZXhpdChjb2RlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIGV4aXRDb2RlID0gY29kZTtcbiAgICAgICAgICAgIGV2ZW50cy5leGl0LmRvbmUoKTtcbiAgICAgICAgIH0sXG4gICAgICAgICBnZXQgZXhpdENvZGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gZXhpdENvZGU7XG4gICAgICAgICB9LFxuICAgICAgICAgcmVzdWx0LFxuICAgICAgfTtcbiAgIH1cblxuICAgZnVuY3Rpb24gY29uZmlndXJlVGltZW91dChcbiAgICAgIGZsYWc6IGJvb2xlYW4gfCBudW1iZXIsXG4gICAgICBldmVudDogRGVmZXJyZWRQcm9taXNlPHZvaWQ+LFxuICAgICAgdGltZW91dDogRGVmZXJyZWRQcm9taXNlPHZvaWQ+XG4gICApIHtcbiAgICAgIGlmIChmbGFnID09PSBmYWxzZSkge1xuICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAoZmxhZyA9PT0gdHJ1ZSA/IGV2ZW50LnByb21pc2UgOiBldmVudC5wcm9taXNlLnRoZW4oKCkgPT4gZGVsYXkoZmxhZykpKS50aGVuKHRpbWVvdXQuZG9uZSk7XG4gICB9XG5cbiAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnc3Bhd24uYWZ0ZXInLFxuICAgICAgYXN5bmMgYWN0aW9uKF9kYXRhLCB7IHNwYXduZWQsIGNsb3NlIH0pIHtcbiAgICAgICAgIGNvbnN0IGV2ZW50cyA9IGNyZWF0ZUV2ZW50cygpO1xuXG4gICAgICAgICBsZXQgZGVmZXJDbG9zZSA9IHRydWU7XG4gICAgICAgICBsZXQgcXVpY2tDbG9zZSA9ICgpID0+IHZvaWQgKGRlZmVyQ2xvc2UgPSBmYWxzZSk7XG5cbiAgICAgICAgIHNwYXduZWQuc3Rkb3V0Py5vbignZGF0YScsIHF1aWNrQ2xvc2UpO1xuICAgICAgICAgc3Bhd25lZC5zdGRlcnI/Lm9uKCdkYXRhJywgcXVpY2tDbG9zZSk7XG4gICAgICAgICBzcGF3bmVkLm9uKCdlcnJvcicsIHF1aWNrQ2xvc2UpO1xuXG4gICAgICAgICBzcGF3bmVkLm9uKCdjbG9zZScsIChjb2RlOiBudW1iZXIpID0+IGV2ZW50cy5jbG9zZShjb2RlKSk7XG4gICAgICAgICBzcGF3bmVkLm9uKCdleGl0JywgKGNvZGU6IG51bWJlcikgPT4gZXZlbnRzLmV4aXQoY29kZSkpO1xuXG4gICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgZXZlbnRzLnJlc3VsdDtcbiAgICAgICAgICAgIGlmIChkZWZlckNsb3NlKSB7XG4gICAgICAgICAgICAgICBhd2FpdCBkZWxheSg1MCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbG9zZShldmVudHMuZXhpdENvZGUpO1xuICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjbG9zZShldmVudHMuZXhpdENvZGUsIGVyciBhcyBFcnJvcik7XG4gICAgICAgICB9XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgeyBHaXRQbHVnaW5FcnJvciB9IGZyb20gJy4uL2Vycm9ycy9naXQtcGx1Z2luLWVycm9yJztcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gJy4uL2dpdC1sb2dnZXInO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRPcHRpb25zIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgYXNBcnJheSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB0eXBlIHsgUGx1Z2luU3RvcmUgfSBmcm9tICcuL3BsdWdpbi1zdG9yZSc7XG5cbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcignJywgJ3BsdWdpbjpiaW5hcnknKTtcblxuY29uc3QgV1JPTkdfTlVNQkVSX0VSUiA9IGBJbnZhbGlkIHZhbHVlIHN1cHBsaWVkIGZvciBjdXN0b20gYmluYXJ5LCByZXF1aXJlcyBhIHNpbmdsZSBzdHJpbmcgb3IgYW4gYXJyYXkgY29udGFpbmluZyBlaXRoZXIgb25lIG9yIHR3byBzdHJpbmdzYDtcbmNvbnN0IFdST05HX0NIQVJTX0VSUiA9IGBJbnZhbGlkIHZhbHVlIHN1cHBsaWVkIGZvciBjdXN0b20gYmluYXJ5LCByZXN0cmljdGVkIGNoYXJhY3RlcnMgbXVzdCBiZSByZW1vdmVkIG9yIHN1cHBseSB0aGUgdW5zYWZlLmFsbG93VW5zYWZlQ3VzdG9tQmluYXJ5IG9wdGlvbmA7XG5cbmZ1bmN0aW9uIGlzQmFkQXJndW1lbnQoYXJnOiBzdHJpbmcpIHtcbiAgIHJldHVybiAhYXJnIHx8ICEvXihbYS16XTopPyhbYS16MC05Ly5cXFxcX34tXSspJC9pLnRlc3QoYXJnKTtcbn1cblxuZnVuY3Rpb24gdG9CaW5hcnlDb25maWcoXG4gICBpbnB1dDogc3RyaW5nW10sXG4gICBhbGxvd1Vuc2FmZTogYm9vbGVhblxuKTogeyBiaW5hcnk6IHN0cmluZzsgcHJlZml4Pzogc3RyaW5nIH0ge1xuICAgaWYgKGlucHV0Lmxlbmd0aCA8IDEgfHwgaW5wdXQubGVuZ3RoID4gMikge1xuICAgICAgdGhyb3cgbmV3IEdpdFBsdWdpbkVycm9yKHVuZGVmaW5lZCwgJ2JpbmFyeScsIFdST05HX05VTUJFUl9FUlIpO1xuICAgfVxuXG4gICBjb25zdCBpc0JhZCA9IGlucHV0LnNvbWUoaXNCYWRBcmd1bWVudCk7XG4gICBpZiAoaXNCYWQpIHtcbiAgICAgIGlmIChhbGxvd1Vuc2FmZSkge1xuICAgICAgICAgbG9nZ2VyKCdwZXJtaXR0ZWQgdW5zYWZlIGJpbmFyeSAlbycsIGlucHV0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICB0aHJvdyBuZXcgR2l0UGx1Z2luRXJyb3IodW5kZWZpbmVkLCAnYmluYXJ5JywgV1JPTkdfQ0hBUlNfRVJSKTtcbiAgICAgIH1cbiAgIH1cblxuICAgY29uc3QgW2JpbmFyeSwgcHJlZml4XSA9IGlucHV0O1xuICAgcmV0dXJuIHtcbiAgICAgIGJpbmFyeSxcbiAgICAgIHByZWZpeCxcbiAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjdXN0b21CaW5hcnlQbHVnaW4oXG4gICBwbHVnaW5zOiBQbHVnaW5TdG9yZSxcbiAgIGlucHV0OiBTaW1wbGVHaXRPcHRpb25zWydiaW5hcnknXSA9IFsnZ2l0J10sXG4gICBhbGxvd1Vuc2FmZSA9IGZhbHNlXG4pIHtcbiAgIGxldCBjb25maWcgPSB0b0JpbmFyeUNvbmZpZyhhc0FycmF5KGlucHV0KSwgYWxsb3dVbnNhZmUpO1xuXG4gICBwbHVnaW5zLm9uKCdiaW5hcnknLCAoaW5wdXQpID0+IHtcbiAgICAgIGNvbmZpZyA9IHRvQmluYXJ5Q29uZmlnKGFzQXJyYXkoaW5wdXQpLCBhbGxvd1Vuc2FmZSk7XG4gICAgICBsb2dnZXIuaW5mbygncmVjb25maWd1cmluZyAlbycsIGNvbmZpZyk7XG4gICB9KTtcblxuICAgcGx1Z2lucy5hcHBlbmQoJ3NwYXduLmJpbmFyeScsICgpID0+IHtcbiAgICAgIHJldHVybiBjb25maWcuYmluYXJ5O1xuICAgfSk7XG5cbiAgIHBsdWdpbnMuYXBwZW5kKCdzcGF3bi5hcmdzJywgKGRhdGEpID0+IHtcbiAgICAgIHJldHVybiBjb25maWcucHJlZml4ID8gW2NvbmZpZy5wcmVmaXgsIC4uLmRhdGFdIDogZGF0YTtcbiAgIH0pO1xufVxuIiwgImltcG9ydCB7IEdpdEVycm9yIH0gZnJvbSAnLi9naXQtZXJyb3InO1xuXG5jb25zdCBSRUFTT05TID0ge1xuICAgRElTQUxMT1dFRF9BQkJSRVZJQVRFRDoge1xuICAgICAgdGV4dDogJ2Rpc2FsbG93ZWQgYWJicmV2aWF0ZWQgb3IgYW1iaWd1b3VzIG9wdGlvbicsXG4gICAgICBzb2x1dGlvbjpcbiAgICAgICAgICdVbmFtYmlndW91cyBhYmJyZXZpYXRlZCBvcHRpb25zIGJsb2NrZWQgd2l0aCB1bnNhZmUuYWxsb3dBYmJyZXZpYXRlZE9wdGlvbnMgc2V0dGluZzoge21lc3NhZ2V9JyxcbiAgIH0sXG4gICBVTktOT1dOOiB7XG4gICAgICB0ZXh0OiAnfiB1bmtub3duIH4nLFxuICAgICAgc29sdXRpb246IHVuZGVmaW5lZCxcbiAgIH0sXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBHaXRDb25maWd1cmF0aW9uRXJyb3JSZWFzb24gPSBrZXlvZiB0eXBlb2YgUkVBU09OUztcblxuZnVuY3Rpb24gZ2V0UmVhc29uKG1lc3NhZ2U/OiBzdHJpbmcpOiBHaXRDb25maWd1cmF0aW9uRXJyb3JSZWFzb24ge1xuICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICByZXR1cm4gJ1VOS05PV04nO1xuICAgfVxuICAgZm9yIChjb25zdCBbcmVhc29uLCB7IHRleHQgfV0gb2YgT2JqZWN0LmVudHJpZXMoUkVBU09OUykpIHtcbiAgICAgIGlmIChtZXNzYWdlLnN0YXJ0c1dpdGgoYGZhdGFsOiAke3RleHR9YCkpIHtcbiAgICAgICAgIHJldHVybiByZWFzb24gYXMgR2l0Q29uZmlndXJhdGlvbkVycm9yUmVhc29uO1xuICAgICAgfVxuICAgfVxuICAgcmV0dXJuICdVTktOT1dOJztcbn1cblxuLyoqXG4gKiBUaGUgYEdpdENvbmZpZ3VyYXRpb25FcnJvcmAgaXMgdGhyb3duIHdoZW4gdGhlIGBnaXRgIHByb2Nlc3MgcmVqZWN0c1xuICogdGhlIHN1cHBsaWVkIGNvbmZpZ3VyYXRpb24gYXJndW1lbnRzIG9yIGVudmlyb25tZW50IHZhcmlhYmxlcy5cbiAqXG4gKiBDaGVjayB0aGUgYC5tZXNzYWdlYCBwcm9wZXJ0eSBmb3IgbW9yZSBkZXRhaWwgb24gd2h5IHlvdXIgY29uZmlndXJhdGlvblxuICogcmVzdWx0ZWQgaW4gYW4gZXJyb3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBHaXRDb25maWd1cmF0aW9uRXJyb3IgZXh0ZW5kcyBHaXRFcnJvciB7XG4gICBwdWJsaWMgcmVhZG9ubHkgcmVhc29uOiBHaXRDb25maWd1cmF0aW9uRXJyb3JSZWFzb247XG5cbiAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSAnJykge1xuICAgICAgY29uc3QgcmVhc29uID0gZ2V0UmVhc29uKG1lc3NhZ2UpO1xuXG4gICAgICBzdXBlcih1bmRlZmluZWQsIFJFQVNPTlNbcmVhc29uXS5zb2x1dGlvbj8ucmVwbGFjZSgne21lc3NhZ2V9JywgbWVzc2FnZSkgPz8gbWVzc2FnZSk7XG4gICAgICB0aGlzLnJlYXNvbiA9IHJlYXNvbjtcbiAgIH1cbn1cbiIsICJpbXBvcnQgeyBHaXRDb25maWd1cmF0aW9uRXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvZ2l0LWNvbmZpZ3VyYXRpb24tZXJyb3InO1xuaW1wb3J0IHsgR2l0RXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvZ2l0LWVycm9yJztcbmltcG9ydCB0eXBlIHsgR2l0RXhlY3V0b3JSZXN1bHQsIFNpbXBsZUdpdFBsdWdpbkNvbmZpZyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0UGx1Z2luIH0gZnJvbSAnLi9zaW1wbGUtZ2l0LXBsdWdpbic7XG5cbnR5cGUgVGFza1Jlc3VsdCA9IE9taXQ8R2l0RXhlY3V0b3JSZXN1bHQsICdyZWplY3Rpb24nPjtcblxuZnVuY3Rpb24gaXNUYXNrRXJyb3IocmVzdWx0OiBUYXNrUmVzdWx0KSB7XG4gICByZXR1cm4gISEocmVzdWx0LmV4aXRDb2RlICYmIHJlc3VsdC5zdGRFcnIubGVuZ3RoKTtcbn1cblxuZnVuY3Rpb24gZ2V0RXJyb3JNZXNzYWdlKHJlc3VsdDogVGFza1Jlc3VsdCkge1xuICAgcmV0dXJuIEJ1ZmZlci5jb25jYXQoWy4uLnJlc3VsdC5zdGRPdXQsIC4uLnJlc3VsdC5zdGRFcnJdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVycm9yRGV0ZWN0aW9uSGFuZGxlcihcbiAgIG92ZXJ3cml0ZSA9IGZhbHNlLFxuICAgaXNFcnJvciA9IGlzVGFza0Vycm9yLFxuICAgZXJyb3JNZXNzYWdlOiAocmVzdWx0OiBUYXNrUmVzdWx0KSA9PiBCdWZmZXIgfCBFcnJvciA9IGdldEVycm9yTWVzc2FnZVxuKSB7XG4gICByZXR1cm4gKGVycm9yOiBCdWZmZXIgfCBFcnJvciB8IHVuZGVmaW5lZCwgcmVzdWx0OiBUYXNrUmVzdWx0KSA9PiB7XG4gICAgICBpZiAoKCFvdmVyd3JpdGUgJiYgZXJyb3IpIHx8ICFpc0Vycm9yKHJlc3VsdCkpIHtcbiAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGVycm9yTWVzc2FnZShyZXN1bHQpO1xuICAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlR2l0RXJyb3IoZXhpdENvZGU6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nKSB7XG4gICBpZiAoZXhpdENvZGUgPT09IDEyOCAmJiBtZXNzYWdlLnN0YXJ0c1dpdGgoJ2ZhdGFsOicpKSB7XG4gICAgICByZXR1cm4gbmV3IEdpdENvbmZpZ3VyYXRpb25FcnJvcihtZXNzYWdlKTtcbiAgIH1cblxuICAgcmV0dXJuIG5ldyBHaXRFcnJvcih1bmRlZmluZWQsIG1lc3NhZ2UpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXJyb3JEZXRlY3Rpb25QbHVnaW4oXG4gICBjb25maWc6IFNpbXBsZUdpdFBsdWdpbkNvbmZpZ1snZXJyb3JzJ11cbik6IFNpbXBsZUdpdFBsdWdpbjwndGFzay5lcnJvcic+IHtcbiAgIHJldHVybiB7XG4gICAgICB0eXBlOiAndGFzay5lcnJvcicsXG4gICAgICBhY3Rpb24oZGF0YSwgY29udGV4dCkge1xuICAgICAgICAgY29uc3QgZXJyb3IgPSBjb25maWcoZGF0YS5lcnJvciwge1xuICAgICAgICAgICAgc3RkRXJyOiBjb250ZXh0LnN0ZEVycixcbiAgICAgICAgICAgIHN0ZE91dDogY29udGV4dC5zdGRPdXQsXG4gICAgICAgICAgICBleGl0Q29kZTogY29udGV4dC5leGl0Q29kZSxcbiAgICAgICAgIH0pO1xuXG4gICAgICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKGVycm9yKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgIGVycm9yOiBjcmVhdGVHaXRFcnJvcihjb250ZXh0LmV4aXRDb2RlLCBlcnJvci50b1N0cmluZygndXRmLTgnKSksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgfVxuXG4gICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICB9O1xuICAgICAgfSxcbiAgIH07XG59XG4iLCAiaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSAnLi4vZ2l0LWxvZ2dlcic7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdE9wdGlvbnMgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBieXRlTGVuZ3RoIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRQbHVnaW4gfSBmcm9tICcuL3NpbXBsZS1naXQtcGx1Z2luJztcblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKCcnLCAncGx1Z2luOmlucHV0Jyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnB1dFBsdWdpbihcbiAgIGlucHV0OiBTaW1wbGVHaXRPcHRpb25zWydpbnB1dCddXG4pOiBTaW1wbGVHaXRQbHVnaW48J3NwYXduLmFmdGVyJz4gfCB2b2lkIHtcbiAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnc3Bhd24uYWZ0ZXInLFxuICAgICAgYWN0aW9uKF9kYXRhLCB7IGNvbW1hbmRzLCBpbnB1dDogdGFza0lucHV0LCBzcGF3bmVkOiB7IHN0ZGluIH0gfSkge1xuICAgICAgICAgaWYgKCFzdGRpbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgfVxuXG4gICAgICAgICBjb25zdCBjb250ZW50ID0gaW5wdXQ/LihbLi4uY29tbWFuZHNdKSA/PyB0YXNrSW5wdXQ7XG4gICAgICAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2dnZXIoYGdlbmVyYXRlZCB6ZXJvIGxlbmd0aCBjb250ZW50LCBub3Qgd3JpdGluZyB0byBzdGRpbmApO1xuICAgICAgICAgfVxuXG4gICAgICAgICBsb2dnZXIoYHdyaXRpbmcgJXMgYnl0ZXMgdG8gc3RkaW5gLCBieXRlTGVuZ3RoKGNvbnRlbnQpKTtcblxuICAgICAgICAgc3RkaW4ub24oJ2Vycm9yJywgKGVycjogTm9kZUpTLkVycm5vRXhjZXB0aW9uKSA9PiB7XG4gICAgICAgICAgICAvLyBFUElQRSBpcyBleHBlY3RlZCB3aGVuIGdpdCBleGl0cyBiZWZvcmUgY29uc3VtaW5nIGFsbCBpbnB1dFxuICAgICAgICAgICAgaWYgKGVyci5jb2RlICE9PSAnRVBJUEUnKSB7XG4gICAgICAgICAgICAgICBsb2dnZXIoJ1tFUlJPUl0gc3RkaW4gZXJyb3IgJW8nLCBlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG5cbiAgICAgICAgIHN0ZGluLmVuZChjb250ZW50KTtcbiAgICAgIH0sXG4gICB9O1xufVxuIiwgImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ25vZGU6ZXZlbnRzJztcblxuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRQbHVnaW5Db25maWcgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBhcHBlbmQsIGFzQXJyYXkgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgdHlwZSB7XG4gICBTaW1wbGVHaXRQbHVnaW4sXG4gICBTaW1wbGVHaXRQbHVnaW5UeXBlLFxuICAgU2ltcGxlR2l0UGx1Z2luVHlwZXMsXG59IGZyb20gJy4vc2ltcGxlLWdpdC1wbHVnaW4nO1xuXG5leHBvcnQgY2xhc3MgUGx1Z2luU3RvcmUge1xuICAgcHJpdmF0ZSBwbHVnaW5zOiBTZXQ8U2ltcGxlR2l0UGx1Z2luPFNpbXBsZUdpdFBsdWdpblR5cGU+PiA9IG5ldyBTZXQoKTtcbiAgIHByaXZhdGUgZXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICBvbjxLIGV4dGVuZHMga2V5b2YgU2ltcGxlR2l0UGx1Z2luQ29uZmlnPihcbiAgICAgIHR5cGU6IEssXG4gICAgICBsaXN0ZW5lcjogKGRhdGE6IFNpbXBsZUdpdFBsdWdpbkNvbmZpZ1tLXSkgPT4gdm9pZFxuICAgKSB7XG4gICAgICB0aGlzLmV2ZW50cy5vbih0eXBlLCBsaXN0ZW5lcik7XG4gICB9XG5cbiAgIHJlY29uZmlndXJlPEsgZXh0ZW5kcyBrZXlvZiBTaW1wbGVHaXRQbHVnaW5Db25maWc+KHR5cGU6IEssIGRhdGE6IFNpbXBsZUdpdFBsdWdpbkNvbmZpZ1tLXSkge1xuICAgICAgdGhpcy5ldmVudHMuZW1pdCh0eXBlLCBkYXRhKTtcbiAgIH1cblxuICAgcHVibGljIGFwcGVuZDxUIGV4dGVuZHMgU2ltcGxlR2l0UGx1Z2luVHlwZT4odHlwZTogVCwgYWN0aW9uOiBTaW1wbGVHaXRQbHVnaW48VD5bJ2FjdGlvbiddKSB7XG4gICAgICBjb25zdCBwbHVnaW4gPSBhcHBlbmQodGhpcy5wbHVnaW5zLCB7IHR5cGUsIGFjdGlvbiB9KTtcblxuICAgICAgcmV0dXJuICgpID0+IHRoaXMucGx1Z2lucy5kZWxldGUocGx1Z2luKTtcbiAgIH1cblxuICAgcHVibGljIGFkZDxUIGV4dGVuZHMgU2ltcGxlR2l0UGx1Z2luVHlwZT4oXG4gICAgICBwbHVnaW46IHZvaWQgfCBTaW1wbGVHaXRQbHVnaW48VD4gfCBTaW1wbGVHaXRQbHVnaW48VD5bXVxuICAgKSB7XG4gICAgICBjb25zdCBwbHVnaW5zOiBTaW1wbGVHaXRQbHVnaW48VD5bXSA9IFtdO1xuXG4gICAgICBhc0FycmF5KHBsdWdpbikuZm9yRWFjaChcbiAgICAgICAgIChwbHVnaW4pID0+IHZvaWQgKHBsdWdpbiAmJiB0aGlzLnBsdWdpbnMuYWRkKGFwcGVuZChwbHVnaW5zLCBwbHVnaW4pKSlcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICBwbHVnaW5zLmZvckVhY2goKHBsdWdpbikgPT4gdm9pZCB0aGlzLnBsdWdpbnMuZGVsZXRlKHBsdWdpbikpO1xuICAgICAgfTtcbiAgIH1cblxuICAgcHVibGljIGV4ZWM8VCBleHRlbmRzIFNpbXBsZUdpdFBsdWdpblR5cGU+KFxuICAgICAgdHlwZTogVCxcbiAgICAgIGRhdGE6IFNpbXBsZUdpdFBsdWdpblR5cGVzW1RdWydkYXRhJ10sXG4gICAgICBjb250ZXh0OiBTaW1wbGVHaXRQbHVnaW5UeXBlc1tUXVsnY29udGV4dCddXG4gICApOiB0eXBlb2YgZGF0YSB7XG4gICAgICBsZXQgb3V0cHV0ID0gZGF0YTtcbiAgICAgIGNvbnN0IGNvbnRleHR1YWwgPSBPYmplY3QuZnJlZXplKE9iamVjdC5jcmVhdGUoY29udGV4dCkpO1xuXG4gICAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLnBsdWdpbnMpIHtcbiAgICAgICAgIGlmIChwbHVnaW4udHlwZSA9PT0gdHlwZSkge1xuICAgICAgICAgICAgb3V0cHV0ID0gcGx1Z2luLmFjdGlvbihvdXRwdXQsIGNvbnRleHR1YWwpO1xuICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3V0cHV0O1xuICAgfVxufVxuIiwgImltcG9ydCB0eXBlIHsgU2ltcGxlR2l0T3B0aW9ucyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGFzTnVtYmVyLCBpbmNsdWRpbmcgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgdHlwZSB7IFNpbXBsZUdpdFBsdWdpbiB9IGZyb20gJy4vc2ltcGxlLWdpdC1wbHVnaW4nO1xuXG5leHBvcnQgZnVuY3Rpb24gcHJvZ3Jlc3NNb25pdG9yUGx1Z2luKHByb2dyZXNzOiBFeGNsdWRlPFNpbXBsZUdpdE9wdGlvbnNbJ3Byb2dyZXNzJ10sIHZvaWQ+KSB7XG4gICBjb25zdCBwcm9ncmVzc0NvbW1hbmQgPSAnLS1wcm9ncmVzcyc7XG4gICBjb25zdCBwcm9ncmVzc01ldGhvZHMgPSBbJ2NoZWNrb3V0JywgJ2Nsb25lJywgJ2ZldGNoJywgJ3B1bGwnLCAncHVzaCddO1xuXG4gICBjb25zdCBvblByb2dyZXNzOiBTaW1wbGVHaXRQbHVnaW48J3NwYXduLmFmdGVyJz4gPSB7XG4gICAgICB0eXBlOiAnc3Bhd24uYWZ0ZXInLFxuICAgICAgYWN0aW9uKF9kYXRhLCBjb250ZXh0KSB7XG4gICAgICAgICBpZiAoIWNvbnRleHQuY29tbWFuZHMuaW5jbHVkZXMocHJvZ3Jlc3NDb21tYW5kKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgfVxuXG4gICAgICAgICBjb250ZXh0LnNwYXduZWQuc3RkZXJyPy5vbignZGF0YScsIChjaHVuazogQnVmZmVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gL14oW1xcc1xcU10rPyk6XFxzKihcXGQrKSUgXFwoKFxcZCspXFwvKFxcZCspXFwpLy5leGVjKGNodW5rLnRvU3RyaW5nKCd1dGY4JykpO1xuICAgICAgICAgICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByb2dyZXNzKHtcbiAgICAgICAgICAgICAgIG1ldGhvZDogY29udGV4dC5tZXRob2QsXG4gICAgICAgICAgICAgICBzdGFnZTogcHJvZ3Jlc3NFdmVudFN0YWdlKG1lc3NhZ2VbMV0pLFxuICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IGFzTnVtYmVyKG1lc3NhZ2VbMl0pLFxuICAgICAgICAgICAgICAgcHJvY2Vzc2VkOiBhc051bWJlcihtZXNzYWdlWzNdKSxcbiAgICAgICAgICAgICAgIHRvdGFsOiBhc051bWJlcihtZXNzYWdlWzRdKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgfSk7XG4gICAgICB9LFxuICAgfTtcblxuICAgY29uc3Qgb25BcmdzOiBTaW1wbGVHaXRQbHVnaW48J3NwYXduLmFyZ3MnPiA9IHtcbiAgICAgIHR5cGU6ICdzcGF3bi5hcmdzJyxcbiAgICAgIGFjdGlvbihhcmdzLCBjb250ZXh0KSB7XG4gICAgICAgICBpZiAoIXByb2dyZXNzTWV0aG9kcy5pbmNsdWRlcyhjb250ZXh0Lm1ldGhvZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBhcmdzO1xuICAgICAgICAgfVxuXG4gICAgICAgICByZXR1cm4gaW5jbHVkaW5nKGFyZ3MsIHByb2dyZXNzQ29tbWFuZCk7XG4gICAgICB9LFxuICAgfTtcblxuICAgcmV0dXJuIFtvbkFyZ3MsIG9uUHJvZ3Jlc3NdO1xufVxuXG5mdW5jdGlvbiBwcm9ncmVzc0V2ZW50U3RhZ2UoaW5wdXQ6IHN0cmluZykge1xuICAgcmV0dXJuIFN0cmluZyhpbnB1dC50b0xvd2VyQ2FzZSgpLnNwbGl0KCcgJywgMSkpIHx8ICd1bmtub3duJztcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFNwYXduT3B0aW9ucyB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuXG5pbXBvcnQgeyBwaWNrIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRQbHVnaW4gfSBmcm9tICcuL3NpbXBsZS1naXQtcGx1Z2luJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNwYXduT3B0aW9uc1BsdWdpbihcbiAgIHNwYXduT3B0aW9uczogUGFydGlhbDxTcGF3bk9wdGlvbnM+XG4pOiBTaW1wbGVHaXRQbHVnaW48J3NwYXduLm9wdGlvbnMnPiB7XG4gICBjb25zdCBvcHRpb25zID0gcGljayhzcGF3bk9wdGlvbnMsIFsndWlkJywgJ2dpZCddKTtcblxuICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdzcGF3bi5vcHRpb25zJyxcbiAgICAgIGFjdGlvbihkYXRhKSB7XG4gICAgICAgICByZXR1cm4geyAuLi5vcHRpb25zLCAuLi5kYXRhIH07XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgeyBpc1BhdGhTcGVjLCB0b1BhdGhzIH0gZnJvbSAnQHNpbXBsZS1naXQvYXJncy1wYXRoc3BlYyc7XG5cbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0UGx1Z2luIH0gZnJvbSAnLi9zaW1wbGUtZ2l0LXBsdWdpbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWZmaXhQYXRoc1BsdWdpbigpOiBTaW1wbGVHaXRQbHVnaW48J3NwYXduLmFyZ3MnPiB7XG4gICByZXR1cm4ge1xuICAgICAgdHlwZTogJ3NwYXduLmFyZ3MnLFxuICAgICAgYWN0aW9uKGRhdGEpIHtcbiAgICAgICAgIGNvbnN0IHByZWZpeDogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgIGxldCBzdWZmaXg6IHVuZGVmaW5lZCB8IHN0cmluZ1tdO1xuICAgICAgICAgZnVuY3Rpb24gYXBwZW5kKGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgICAgICAgICAoc3VmZml4ID0gc3VmZml4IHx8IFtdKS5wdXNoKC4uLmFyZ3MpO1xuICAgICAgICAgfVxuXG4gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtID0gZGF0YVtpXTtcblxuICAgICAgICAgICAgaWYgKGlzUGF0aFNwZWMocGFyYW0pKSB7XG4gICAgICAgICAgICAgICBhcHBlbmQodG9QYXRocyhwYXJhbSkpO1xuICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwYXJhbSA9PT0gJy0tJykge1xuICAgICAgICAgICAgICAgYXBwZW5kKFxuICAgICAgICAgICAgICAgICAgZGF0YS5zbGljZShpICsgMSkuZmxhdE1hcCgoaXRlbSkgPT4gKGlzUGF0aFNwZWMoaXRlbSkgJiYgdG9QYXRocyhpdGVtKSkgfHwgaXRlbSlcbiAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJlZml4LnB1c2gocGFyYW0pO1xuICAgICAgICAgfVxuXG4gICAgICAgICByZXR1cm4gIXN1ZmZpeCA/IHByZWZpeCA6IFsuLi5wcmVmaXgsICctLScsIC4uLnN1ZmZpeC5tYXAoU3RyaW5nKV07XG4gICAgICB9LFxuICAgfTtcbn1cbiIsICJpbXBvcnQgeyBHaXRQbHVnaW5FcnJvciB9IGZyb20gJy4uL2Vycm9ycy9naXQtcGx1Z2luLWVycm9yJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0T3B0aW9ucyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB0eXBlIHsgU2ltcGxlR2l0UGx1Z2luIH0gZnJvbSAnLi9zaW1wbGUtZ2l0LXBsdWdpbic7XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lb3V0UGx1Z2luKHtcbiAgIGJsb2NrLFxuICAgc3RkRXJyID0gdHJ1ZSxcbiAgIHN0ZE91dCA9IHRydWUsXG59OiBFeGNsdWRlPFNpbXBsZUdpdE9wdGlvbnNbJ3RpbWVvdXQnXSwgdW5kZWZpbmVkPik6IFNpbXBsZUdpdFBsdWdpbjwnc3Bhd24uYWZ0ZXInPiB8IHZvaWQge1xuICAgaWYgKGJsb2NrID4gMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgIHR5cGU6ICdzcGF3bi5hZnRlcicsXG4gICAgICAgICBhY3Rpb24oX2RhdGEsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIGxldCB0aW1lb3V0OiBOb2RlSlMuVGltZW91dDtcblxuICAgICAgICAgICAgZnVuY3Rpb24gd2FpdCgpIHtcbiAgICAgICAgICAgICAgIHRpbWVvdXQgJiYgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoa2lsbCwgYmxvY2spO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICAgICAgICAgY29udGV4dC5zcGF3bmVkLnN0ZG91dD8ub2ZmKCdkYXRhJywgd2FpdCk7XG4gICAgICAgICAgICAgICBjb250ZXh0LnNwYXduZWQuc3RkZXJyPy5vZmYoJ2RhdGEnLCB3YWl0KTtcbiAgICAgICAgICAgICAgIGNvbnRleHQuc3Bhd25lZC5vZmYoJ2V4aXQnLCBzdG9wKTtcbiAgICAgICAgICAgICAgIGNvbnRleHQuc3Bhd25lZC5vZmYoJ2Nsb3NlJywgc3RvcCk7XG4gICAgICAgICAgICAgICB0aW1lb3V0ICYmIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24ga2lsbCgpIHtcbiAgICAgICAgICAgICAgIHN0b3AoKTtcbiAgICAgICAgICAgICAgIGNvbnRleHQua2lsbChuZXcgR2l0UGx1Z2luRXJyb3IodW5kZWZpbmVkLCAndGltZW91dCcsIGBibG9jayB0aW1lb3V0IHJlYWNoZWRgKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN0ZE91dCAmJiBjb250ZXh0LnNwYXduZWQuc3Rkb3V0Py5vbignZGF0YScsIHdhaXQpO1xuICAgICAgICAgICAgc3RkRXJyICYmIGNvbnRleHQuc3Bhd25lZC5zdGRlcnI/Lm9uKCdkYXRhJywgd2FpdCk7XG4gICAgICAgICAgICBjb250ZXh0LnNwYXduZWQub24oJ2V4aXQnLCBzdG9wKTtcbiAgICAgICAgICAgIGNvbnRleHQuc3Bhd25lZC5vbignY2xvc2UnLCBzdG9wKTtcblxuICAgICAgICAgICAgd2FpdCgpO1xuICAgICAgICAgfSxcbiAgICAgIH07XG4gICB9XG59XG4iLCAiLy8gQHRzLWV4cGVjdC1lcnJvclxuaW1wb3J0IEdpdCBmcm9tICcuLi9naXQnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRGYWN0b3J5IH0gZnJvbSAnLi4vdHlwaW5ncyc7XG5pbXBvcnQgKiBhcyBhcGkgZnJvbSAnLi9hcGknO1xuaW1wb3J0IHtcbiAgIGFib3J0UGx1Z2luLFxuICAgYWxsb3dFbnZpcm9ubWVudFBsdWdpbixcbiAgIGJsb2NrVW5zYWZlT3BlcmF0aW9uc1BsdWdpbixcbiAgIGNvbW1hbmRDb25maWdQcmVmaXhpbmdQbHVnaW4sXG4gICBjb21wbGV0aW9uRGV0ZWN0aW9uUGx1Z2luLFxuICAgY3VzdG9tQmluYXJ5UGx1Z2luLFxuICAgZXJyb3JEZXRlY3Rpb25IYW5kbGVyLFxuICAgZXJyb3JEZXRlY3Rpb25QbHVnaW4sXG4gICBpbnB1dFBsdWdpbixcbiAgIFBsdWdpblN0b3JlLFxuICAgcHJvZ3Jlc3NNb25pdG9yUGx1Z2luLFxuICAgc3Bhd25PcHRpb25zUGx1Z2luLFxuICAgc3VmZml4UGF0aHNQbHVnaW4sXG4gICB0aW1lb3V0UGx1Z2luLFxufSBmcm9tICcuL3BsdWdpbnMnO1xuaW1wb3J0IHR5cGUgeyBTaW1wbGVHaXRPcHRpb25zIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVJbnN0YW5jZUNvbmZpZywgZm9sZGVyRXhpc3RzIH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBjb25zdCBzaW1wbGVHaXQ6IFNpbXBsZUdpdEZhY3RvcnkgPSAoXG4gICBiYXNlRGlyPzogc3RyaW5nIHwgUGFydGlhbDxTaW1wbGVHaXRPcHRpb25zPixcbiAgIG9wdGlvbnM/OiBQYXJ0aWFsPFNpbXBsZUdpdE9wdGlvbnM+XG4pID0+IHtcbiAgIGNvbnN0IHBsdWdpbnMgPSBuZXcgUGx1Z2luU3RvcmUoKTtcbiAgIGNvbnN0IGNvbmZpZyA9IGNyZWF0ZUluc3RhbmNlQ29uZmlnKFxuICAgICAgKGJhc2VEaXIgJiYgKHR5cGVvZiBiYXNlRGlyID09PSAnc3RyaW5nJyA/IHsgYmFzZURpciB9IDogYmFzZURpcikpIHx8IHt9LFxuICAgICAgb3B0aW9uc1xuICAgKTtcblxuICAgaWYgKCFmb2xkZXJFeGlzdHMoY29uZmlnLmJhc2VEaXIpKSB7XG4gICAgICB0aHJvdyBuZXcgYXBpLkdpdENvbnN0cnVjdEVycm9yKFxuICAgICAgICAgY29uZmlnLFxuICAgICAgICAgYENhbm5vdCB1c2Ugc2ltcGxlLWdpdCBvbiBhIGRpcmVjdG9yeSB0aGF0IGRvZXMgbm90IGV4aXN0YFxuICAgICAgKTtcbiAgIH1cblxuICAgaWYgKEFycmF5LmlzQXJyYXkoY29uZmlnLmNvbmZpZykpIHtcbiAgICAgIHBsdWdpbnMuYWRkKGNvbW1hbmRDb25maWdQcmVmaXhpbmdQbHVnaW4oY29uZmlnLmNvbmZpZykpO1xuICAgfVxuXG4gICBwbHVnaW5zLmFkZChibG9ja1Vuc2FmZU9wZXJhdGlvbnNQbHVnaW4oY29uZmlnLnVuc2FmZSkpO1xuICAgcGx1Z2lucy5hZGQoY29tcGxldGlvbkRldGVjdGlvblBsdWdpbihjb25maWcuY29tcGxldGlvbikpO1xuICAgY29uZmlnLmFib3J0ICYmIHBsdWdpbnMuYWRkKGFib3J0UGx1Z2luKGNvbmZpZy5hYm9ydCkpO1xuICAgY29uZmlnLnByb2dyZXNzICYmIHBsdWdpbnMuYWRkKHByb2dyZXNzTW9uaXRvclBsdWdpbihjb25maWcucHJvZ3Jlc3MpKTtcbiAgIGNvbmZpZy50aW1lb3V0ICYmIHBsdWdpbnMuYWRkKHRpbWVvdXRQbHVnaW4oY29uZmlnLnRpbWVvdXQpKTtcbiAgIGNvbmZpZy5zcGF3bk9wdGlvbnMgJiYgcGx1Z2lucy5hZGQoc3Bhd25PcHRpb25zUGx1Z2luKGNvbmZpZy5zcGF3bk9wdGlvbnMpKTtcbiAgIHBsdWdpbnMuYWRkKHN1ZmZpeFBhdGhzUGx1Z2luKCkpO1xuXG4gICBwbHVnaW5zLmFkZChpbnB1dFBsdWdpbihjb25maWcuaW5wdXQpKTtcbiAgIHBsdWdpbnMuYWRkKGVycm9yRGV0ZWN0aW9uUGx1Z2luKGVycm9yRGV0ZWN0aW9uSGFuZGxlcih0cnVlKSkpO1xuICAgY29uZmlnLmVycm9ycyAmJiBwbHVnaW5zLmFkZChlcnJvckRldGVjdGlvblBsdWdpbihjb25maWcuZXJyb3JzKSk7XG5cbiAgIGN1c3RvbUJpbmFyeVBsdWdpbihwbHVnaW5zLCBjb25maWcuYmluYXJ5LCBjb25maWcudW5zYWZlPy5hbGxvd1Vuc2FmZUN1c3RvbUJpbmFyeSk7XG5cbiAgIHBsdWdpbnMuYWRkKFxuICAgICAgYWxsb3dFbnZpcm9ubWVudFBsdWdpbihjb25maWcuYWxsb3dFbnZpcm9ubWVudCA/PyBbXSwgY29uZmlnLnVuc2FmZT8uYWxsb3dBYmJyZXZpYXRlZE9wdGlvbnMpXG4gICApO1xuXG4gICByZXR1cm4gbmV3IEdpdChjb25maWcsIHBsdWdpbnMpO1xufTtcbiIsICJpbXBvcnQgeyBBcHAsIE1vZGFsLCBOb3RpY2UsIFRGaWxlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgdHlwZSBNeVNpbXBsZVBsdWdpbiBmcm9tIFwiLi4vbWFpblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlbW90ZUFydGljbGUge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcmVsYXRpdmVQYXRoOiBzdHJpbmc7XG4gICAgYWJzb2x1dGVQYXRoOiBzdHJpbmc7XG4gICAgY29udGVudDogc3RyaW5nO1xuICAgIHNpemU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIFN5bmNDb25mbGljdE1vZGFsIGV4dGVuZHMgTW9kYWwge1xuICAgIGFydGljbGU6IFJlbW90ZUFydGljbGU7XG4gICAgbG9jYWxGaWxlOiBURmlsZTtcbiAgICBwbHVnaW46IE15U2ltcGxlUGx1Z2luO1xuICAgIG9uUmVzdWx0OiAocmVzdWx0OiBcIm92ZXJ3cml0ZVwiIHwgXCJjb3B5XCIgfCBcImNhbmNlbFwiKSA9PiB2b2lkO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGFwcDogQXBwLFxuICAgICAgICBwbHVnaW46IE15U2ltcGxlUGx1Z2luLFxuICAgICAgICBhcnRpY2xlOiBSZW1vdGVBcnRpY2xlLFxuICAgICAgICBsb2NhbEZpbGU6IFRGaWxlLFxuICAgICAgICBvblJlc3VsdDogKHJlc3VsdDogXCJvdmVyd3JpdGVcIiB8IFwiY29weVwiIHwgXCJjYW5jZWxcIikgPT4gdm9pZFxuICAgICkge1xuICAgICAgICBzdXBlcihhcHApO1xuICAgICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgICAgICAgdGhpcy5hcnRpY2xlID0gYXJ0aWNsZTtcbiAgICAgICAgdGhpcy5sb2NhbEZpbGUgPSBsb2NhbEZpbGU7XG4gICAgICAgIHRoaXMub25SZXN1bHQgPSBvblJlc3VsdDtcbiAgICB9XG5cbiAgICBvbk9wZW4oKSB7XG4gICAgICAgIGNvbnN0IHsgY29udGVudEVsIH0gPSB0aGlzO1xuICAgICAgICBjb250ZW50RWwuZW1wdHkoKTtcbiAgICAgICAgY29udGVudEVsLmFkZENsYXNzKFwiZ2l0LXN5bmMtY29uZmxpY3QtbW9kYWxcIik7XG5cbiAgICAgICAgY29udGVudEVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIlx1NTNEMVx1NzNCMFx1NTQwQ1x1NTQwRFx1NjU4N1x1N0FFMFwiIH0pO1xuXG4gICAgICAgIGNvbnRlbnRFbC5jcmVhdGVFbChcInBcIiwge1xuICAgICAgICAgICAgdGV4dDogYEdpdCBcdTRFRDNcdTVFOTNcdTRFMkRcdTc2ODRcdTMwMEEke3RoaXMuYXJ0aWNsZS50aXRsZX1cdTMwMEJcdTRFMEVcdTY3MkNcdTU3MzBcdTY1ODdcdTdBRTBcdTU0MENcdTU0MERcdTMwMDJcdThCRjdcdTkwMDlcdTYyRTlcdTU0MENcdTZCNjVcdTY1QjlcdTVGMEZcdTMwMDJgLFxuICAgICAgICAgICAgY2xzOiBcImdpdC1zeW5jLWNvbmZsaWN0LWRlc2NyaXB0aW9uXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGluZm8gPSBjb250ZW50RWwuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1zeW5jLWNvbmZsaWN0LWluZm9cIiB9KTtcbiAgICAgICAgaW5mby5jcmVhdGVFbChcImRpdlwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBgXHU2NzJDXHU1NzMwXHU2NTg3XHU0RUY2XHVGRjFBJHt0aGlzLmxvY2FsRmlsZS5wYXRofWAsXG4gICAgICAgIH0pO1xuICAgICAgICBpbmZvLmNyZWF0ZUVsKFwiZGl2XCIsIHtcbiAgICAgICAgICAgIHRleHQ6IGBHaXQgXHU2NTg3XHU0RUY2XHVGRjFBJHt0aGlzLmFydGljbGUucmVsYXRpdmVQYXRofWAsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBjb250ZW50RWwuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC1zeW5jLWNvbmZsaWN0LW9wdGlvbnNcIiB9KTtcblxuICAgICAgICBjb25zdCBvdmVyd3JpdGUgPSBvcHRpb25zLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU4OTg2XHU3NkQ2XHU2NzJDXHU1NzMwXHU2NTg3XHU3QUUwXCIsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LXN5bmMtY29uZmxpY3Qtb3ZlcndyaXRlXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBvdmVyd3JpdGUuY3JlYXRlRGl2KHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU0RjdGXHU3NTI4IEdpdCBcdTRFRDNcdTVFOTNcdTRFMkRcdTc2ODRcdTUxODVcdTVCQjlcdTY2RkZcdTYzNjJcdTVGNTNcdTUyNERcdTY3MkNcdTU3MzBcdTY1ODdcdTdBRTBcdTMwMDJcIixcbiAgICAgICAgICAgIGNsczogXCJnaXQtc3luYy1jb25mbGljdC1vcHRpb24tZGVzY1wiLFxuICAgICAgICB9KTtcbiAgICAgICAgb3ZlcndyaXRlLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uUmVzdWx0KFwib3ZlcndyaXRlXCIpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGNvcHkgPSBvcHRpb25zLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU1M0U2XHU1QjU4XHU0RTNBXHU1MjZGXHU0RUY2XCIsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LXN5bmMtY29uZmxpY3QtY29weVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgY29weS5jcmVhdGVEaXYoe1xuICAgICAgICAgICAgdGV4dDogXCJcdTRGRERcdTc1NTlcdTY3MkNcdTU3MzBcdTY1ODdcdTdBRTBcdUZGMENcdTVFNzZcdTVDMDYgR2l0IFx1NjU4N1x1N0FFMFx1NTNFNlx1NUI1OFx1NEUzQVx1MjAxQ1x1NTI2Rlx1NEVGNlx1MjAxRFx1MzAwMlwiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC1zeW5jLWNvbmZsaWN0LW9wdGlvbi1kZXNjXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBjb3B5Lm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uUmVzdWx0KFwiY29weVwiKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjYW5jZWwgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJidXR0b25cIiwge1xuICAgICAgICAgICAgdGV4dDogXCJcdTUzRDZcdTZEODhcIixcbiAgICAgICAgICAgIGNsczogXCJnaXQtc3luYy1jb25mbGljdC1jYW5jZWxcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGNhbmNlbC5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vblJlc3VsdChcImNhbmNlbFwiKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvbkNsb3NlKCkge1xuICAgICAgICAvLyBcdTU5ODJcdTY3OUNcdTc1MjhcdTYyMzdcdTc2RjRcdTYzQTVcdTYzMDkgRXNjIFx1NTE3M1x1OTVFRFx1RkYwQ1x1NEU1Rlx1ODlDNlx1NEUzQVx1NTNENlx1NkQ4OFx1MzAwMlxuICAgICAgICB0aGlzLm9uUmVzdWx0KFwiY2FuY2VsXCIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbmZpcm1TeW5jQ29uZmxpY3QoXG4gICAgcGx1Z2luOiBNeVNpbXBsZVBsdWdpbixcbiAgICBhcnRpY2xlOiBSZW1vdGVBcnRpY2xlLFxuICAgIGxvY2FsRmlsZTogVEZpbGVcbik6IFByb21pc2U8XCJvdmVyd3JpdGVcIiB8IFwiY29weVwiIHwgXCJjYW5jZWxcIj4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBsZXQgcmVzb2x2ZWQgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCBmaW5pc2ggPSAocmVzdWx0OiBcIm92ZXJ3cml0ZVwiIHwgXCJjb3B5XCIgfCBcImNhbmNlbFwiKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzb2x2ZWQpIHJldHVybjtcbiAgICAgICAgICAgIHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBtb2RhbCA9IG5ldyBTeW5jQ29uZmxpY3RNb2RhbChcbiAgICAgICAgICAgIHBsdWdpbi5hcHAsXG4gICAgICAgICAgICBwbHVnaW4sXG4gICAgICAgICAgICBhcnRpY2xlLFxuICAgICAgICAgICAgbG9jYWxGaWxlLFxuICAgICAgICAgICAgZmluaXNoXG4gICAgICAgICk7XG5cbiAgICAgICAgbW9kYWwub3BlbigpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3luY0FydGljbGUoXG4gICAgcGx1Z2luOiBNeVNpbXBsZVBsdWdpbixcbiAgICBhcnRpY2xlOiBSZW1vdGVBcnRpY2xlLFxuICAgIGxvY2FsRmlsZTogVEZpbGVcbikge1xuICAgIGF3YWl0IHBsdWdpbi5hcHAudmF1bHQubW9kaWZ5KGxvY2FsRmlsZSwgYXJ0aWNsZS5jb250ZW50KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN5bmNBcnRpY2xlQXNDb3B5KFxuICAgIHBsdWdpbjogTXlTaW1wbGVQbHVnaW4sXG4gICAgYXJ0aWNsZTogUmVtb3RlQXJ0aWNsZSxcbiAgICBsb2NhbEZpbGU6IFRGaWxlXG4pOiBQcm9taXNlPFRGaWxlPiB7XG4gICAgY29uc3QgcGFyZW50UGF0aCA9IGxvY2FsRmlsZS5wYXJlbnQ/LnBhdGggPz8gXCJcIjtcbiAgICBjb25zdCBleHRlbnNpb24gPSBcIi5tZFwiO1xuICAgIGNvbnN0IGJhc2VUaXRsZSA9IGFydGljbGUudGl0bGU7XG5cbiAgICBsZXQgY29weU5hbWUgPSBgJHtiYXNlVGl0bGV9XHVGRjA4XHU1MjZGXHU0RUY2XHVGRjA5JHtleHRlbnNpb259YDtcbiAgICBsZXQgY29weVBhdGggPSBwYXJlbnRQYXRoICYmIHBhcmVudFBhdGggIT09IFwiL1wiXG4gICAgICAgID8gYCR7cGFyZW50UGF0aH0vJHtjb3B5TmFtZX1gXG4gICAgICAgIDogY29weU5hbWU7XG5cbiAgICBsZXQgaW5kZXggPSAyO1xuICAgIHdoaWxlIChwbHVnaW4uYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChjb3B5UGF0aCkpIHtcbiAgICAgICAgY29weU5hbWUgPSBgJHtiYXNlVGl0bGV9XHVGRjA4XHU1MjZGXHU0RUY2ICR7aW5kZXh9XHVGRjA5JHtleHRlbnNpb259YDtcbiAgICAgICAgY29weVBhdGggPSBwYXJlbnRQYXRoICYmIHBhcmVudFBhdGggIT09IFwiL1wiXG4gICAgICAgICAgICA/IGAke3BhcmVudFBhdGh9LyR7Y29weU5hbWV9YFxuICAgICAgICAgICAgOiBjb3B5TmFtZTtcbiAgICAgICAgaW5kZXgrKztcbiAgICB9XG5cbiAgICBhd2FpdCBwbHVnaW4uYXBwLnZhdWx0LmNyZWF0ZShjb3B5UGF0aCwgYXJ0aWNsZS5jb250ZW50KTtcblxuICAgIGNvbnN0IGNvcHlGaWxlID0gcGx1Z2luLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoY29weVBhdGgpO1xuICAgIGlmICghKGNvcHlGaWxlIGluc3RhbmNlb2YgVEZpbGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlx1NTI2Rlx1NEVGNlx1NURGMlx1NTE5OVx1NTE2NVx1RkYwQ1x1NEY0NiBPYnNpZGlhbiBcdTY3MkFcdTgwRkRcdThCQzZcdTUyMkJcdTY1QjBcdTY1ODdcdTRFRjZcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvcHlGaWxlO1xufSIsICJpbXBvcnQgeyBGaWxlU3lzdGVtQWRhcHRlciwgVEZpbGUgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHR5cGUgTXlTaW1wbGVQbHVnaW4gZnJvbSBcIi4uL21haW5cIjtcbmltcG9ydCB0eXBlIHsgUmVtb3RlQXJ0aWNsZSB9IGZyb20gXCIuL3N5bmNcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRvd25sb2FkQXJ0aWNsZShcbiAgICBwbHVnaW46IE15U2ltcGxlUGx1Z2luLFxuICAgIGFydGljbGU6IFJlbW90ZUFydGljbGVcbik6IFByb21pc2U8VEZpbGU+IHtcbiAgICBjb25zdCBhZGFwdGVyID0gcGx1Z2luLmFwcC52YXVsdC5hZGFwdGVyO1xuXG4gICAgaWYgKCEoYWRhcHRlciBpbnN0YW5jZW9mIEZpbGVTeXN0ZW1BZGFwdGVyKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdTVGNTNcdTUyNEQgVmF1bHQgXHU0RTBEXHU2NjJGXHU2NzJDXHU1NzMwXHU2NTg3XHU0RUY2XHU3Q0ZCXHU3RURGXHVGRjBDXHU2NUUwXHU2Q0Q1XHU0RTBCXHU4RjdEXHU2NTg3XHU3QUUwXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldEZvbGRlciA9IHBsdWdpbi5zZXR0aW5ncy50YXJnZXRGb2xkZXIgfHwgXCJHaXRcdTY1ODdcdTdBRTBcIjtcbiAgICBjb25zdCByZWxhdGl2ZVRhcmdldCA9IHBhdGhcbiAgICAgICAgLmpvaW4odGFyZ2V0Rm9sZGVyLCBhcnRpY2xlLnJlbGF0aXZlUGF0aClcbiAgICAgICAgLnNwbGl0KHBhdGguc2VwKVxuICAgICAgICAuam9pbihcIi9cIik7XG5cbiAgICBjb25zdCBhYnNvbHV0ZVRhcmdldCA9IHBhdGguam9pbihcbiAgICAgICAgYWRhcHRlci5nZXRCYXNlUGF0aCgpLFxuICAgICAgICByZWxhdGl2ZVRhcmdldFxuICAgICk7XG5cbiAgICBmcy5ta2RpclN5bmMocGF0aC5kaXJuYW1lKGFic29sdXRlVGFyZ2V0KSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG5cbiAgICBhd2FpdCBhZGFwdGVyLndyaXRlKHJlbGF0aXZlVGFyZ2V0LCBhcnRpY2xlLmNvbnRlbnQpO1xuXG4gICAgY29uc3QgZmlsZSA9IHBsdWdpbi5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKHJlbGF0aXZlVGFyZ2V0KTtcbiAgICBpZiAoIShmaWxlIGluc3RhbmNlb2YgVEZpbGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlx1NjU4N1x1N0FFMFx1NURGMlx1NTE5OVx1NTE2NVx1RkYwQ1x1NEY0NiBPYnNpZGlhbiBcdTY3MkFcdTgwRkRcdThCQzZcdTUyMkJcdTY1QjBcdTY1ODdcdTRFRjZcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbGU7XG59IiwgImltcG9ydCB7IEFwcCwgRmlsZVN5c3RlbUFkYXB0ZXIsIE1vZGFsLCBOb3RpY2UsIFRGaWxlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBzaW1wbGVHaXQgfSBmcm9tIFwic2ltcGxlLWdpdFwiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgKiBhcyBvcyBmcm9tIFwib3NcIjtcbmltcG9ydCB0eXBlIE15U2ltcGxlUGx1Z2luIGZyb20gXCIuLi9tYWluXCI7XG5pbXBvcnQgeyByZWZyZXNoQXJ0aWNsZXNWaWV3IH0gZnJvbSBcIi4vcmVmcmVzaFwiO1xuXG5leHBvcnQgY2xhc3MgVXBsb2FkQXJ0aWNsZU1vZGFsIGV4dGVuZHMgTW9kYWwge1xuICAgIHBsdWdpbjogTXlTaW1wbGVQbHVnaW47XG4gICAgZmlsZTogVEZpbGU7XG4gICAgZm9sZGVyczogc3RyaW5nW10gPSBbXTtcbiAgICBzZWxlY3RlZEZvbGRlciA9IFwiXCI7XG4gICAgZm9sZGVySW5wdXQhOiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHNlbGVjdEVsITogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgdXBsb2FkQnV0dG9uITogSFRNTEJ1dHRvbkVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBNeVNpbXBsZVBsdWdpbiwgZmlsZTogVEZpbGUpIHtcbiAgICAgICAgc3VwZXIoYXBwKTtcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgICAgIHRoaXMuZmlsZSA9IGZpbGU7XG4gICAgfVxuXG4gICAgYXN5bmMgb25PcGVuKCkge1xuICAgICAgICBjb25zdCB7IGNvbnRlbnRFbCB9ID0gdGhpcztcbiAgICAgICAgY29udGVudEVsLmVtcHR5KCk7XG4gICAgICAgIGNvbnRlbnRFbC5hZGRDbGFzcyhcImdpdC11cGxvYWQtbW9kYWxcIik7XG5cbiAgICAgICAgY29udGVudEVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBgXHU0RTBBXHU0RjIwXHVGRjFBJHt0aGlzLmZpbGUuYmFzZW5hbWV9YCB9KTtcbiAgICAgICAgY29udGVudEVsLmNyZWF0ZUVsKFwicFwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1OTAwOVx1NjJFOSBHaXQgXHU0RUQzXHU1RTkzXHU0RTJEXHU3Njg0XHU3NkVFXHU2ODA3XHU2NTg3XHU0RUY2XHU1OTM5XHUzMDAyXHU2NTg3XHU0RUY2XHU1OTM5XHU0RTBEXHU1QjU4XHU1NzI4XHU2NUY2XHU0RjFBXHU4MUVBXHU1MkE4XHU1MjFCXHU1RUZBXHUzMDAyXCIsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LXVwbG9hZC1kZXNjcmlwdGlvblwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBsb2FkaW5nID0gY29udGVudEVsLmNyZWF0ZURpdih7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NkI2M1x1NTcyOFx1OEJGQlx1NTNENiBHaXQgXHU0RUQzXHU1RTkzXHU2NTg3XHU0RUY2XHU1OTM5XHUyMDI2XCIsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LXVwbG9hZC1sb2FkaW5nXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmZvbGRlcnMgPSBhd2FpdCB0aGlzLnBsdWdpbi5nZXRSZW1vdGVGb2xkZXJzKCk7XG4gICAgICAgICAgICBsb2FkaW5nLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJGb3JtKCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBsb2FkaW5nLnJlbW92ZSgpO1xuICAgICAgICAgICAgY29udGVudEVsLmNyZWF0ZURpdih7XG4gICAgICAgICAgICAgICAgdGV4dDogYFx1OEJGQlx1NTNENlx1NEVEM1x1NUU5M1x1NTkzMVx1OEQyNVx1RkYxQSR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpfWAsXG4gICAgICAgICAgICAgICAgY2xzOiBcImdpdC11cGxvYWQtZXJyb3JcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRm9ybSgpIHtcbiAgICAgICAgY29uc3QgeyBjb250ZW50RWwgfSA9IHRoaXM7XG5cbiAgICAgICAgY29uc3QgZmllbGQgPSBjb250ZW50RWwuY3JlYXRlRGl2KHsgY2xzOiBcImdpdC11cGxvYWQtZmllbGRcIiB9KTtcbiAgICAgICAgZmllbGQuY3JlYXRlRWwoXCJsYWJlbFwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NURGMlx1NjcwOVx1NjU4N1x1NEVGNlx1NTkzOVwiLFxuICAgICAgICAgICAgY2xzOiBcImdpdC11cGxvYWQtbGFiZWxcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RFbCA9IGZpZWxkLmNyZWF0ZUVsKFwic2VsZWN0XCIsIHtcbiAgICAgICAgICAgIGNsczogXCJnaXQtdXBsb2FkLXNlbGVjdFwiLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNlbGVjdEVsLmNyZWF0ZUVsKFwib3B0aW9uXCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU0RUQzXHU1RTkzXHU2ODM5XHU3NkVFXHU1RjU1XCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChjb25zdCBmb2xkZXIgb2YgdGhpcy5mb2xkZXJzKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEVsLmNyZWF0ZUVsKFwib3B0aW9uXCIsIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBmb2xkZXIgfHwgXCJcdTRFRDNcdTVFOTNcdTY4MzlcdTc2RUVcdTVGNTVcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZm9sZGVyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbGVjdEVsLm9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEZvbGRlciA9IHRoaXMuc2VsZWN0RWwudmFsdWU7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RFbC52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9sZGVySW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG5ld0ZpZWxkID0gY29udGVudEVsLmNyZWF0ZURpdih7IGNsczogXCJnaXQtdXBsb2FkLWZpZWxkXCIgfSk7XG4gICAgICAgIG5ld0ZpZWxkLmNyZWF0ZUVsKFwibGFiZWxcIiwge1xuICAgICAgICAgICAgdGV4dDogXCJcdTYyMTZcdTUyMUJcdTVFRkFcdTY1QjBcdTY1ODdcdTRFRjZcdTU5MzlcIixcbiAgICAgICAgICAgIGNsczogXCJnaXQtdXBsb2FkLWxhYmVsXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZm9sZGVySW5wdXQgPSBuZXdGaWVsZC5jcmVhdGVFbChcImlucHV0XCIsIHtcbiAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiXHU0RjhCXHU1OTgyXHVGRjFBQUkvXHU2QTIxXHU1NzhCXHU3QjE0XHU4QkIwXCIsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LXVwbG9hZC1pbnB1dFwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXdGaWVsZC5jcmVhdGVEaXYoe1xuICAgICAgICAgICAgdGV4dDogXCJcdTY1MkZcdTYzMDFcdTU5MUFcdTdFQTdcdTc2RUVcdTVGNTVcdUZGMENcdTRGOEJcdTU5ODJcdUZGMUFcdTYyODBcdTY3MkYvQUkvT2xsYW1hXCIsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LXVwbG9hZC1oaW50XCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZm9sZGVySW5wdXQub25pbnB1dCA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvbGRlcklucHV0LnZhbHVlLnRyaW0oKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0RWwudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRGb2xkZXIgPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGZvb3RlciA9IGNvbnRlbnRFbC5jcmVhdGVEaXYoeyBjbHM6IFwiZ2l0LXVwbG9hZC1mb290ZXJcIiB9KTtcblxuICAgICAgICBjb25zdCBjYW5jZWwgPSBmb290ZXIuY3JlYXRlRWwoXCJidXR0b25cIiwge1xuICAgICAgICAgICAgdGV4dDogXCJcdTUzRDZcdTZEODhcIixcbiAgICAgICAgICAgIGNsczogXCJnaXQtdXBsb2FkLWNhbmNlbFwiLFxuICAgICAgICB9KTtcbiAgICAgICAgY2FuY2VsLm9uY2xpY2sgPSAoKSA9PiB0aGlzLmNsb3NlKCk7XG5cbiAgICAgICAgdGhpcy51cGxvYWRCdXR0b24gPSBmb290ZXIuY3JlYXRlRWwoXCJidXR0b25cIiwge1xuICAgICAgICAgICAgdGV4dDogXCJcdTRFMEFcdTRGMjBcdTUyMzAgR2l0XCIsXG4gICAgICAgICAgICBjbHM6IFwiZ2l0LXVwbG9hZC1zdWJtaXRcIixcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudXBsb2FkQnV0dG9uLm9uY2xpY2sgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXN0b21Gb2xkZXIgPSB0aGlzLmZvbGRlcklucHV0LnZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIGNvbnN0IGZvbGRlciA9IGN1c3RvbUZvbGRlciB8fCB0aGlzLnNlbGVjdEVsLnZhbHVlO1xuXG4gICAgICAgICAgICB0aGlzLnVwbG9hZEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiXHU0RTBBXHU0RjIwXHU0RTJEXHUyMDI2XCI7XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdXBsb2FkTG9jYWxBcnRpY2xlKHRoaXMucGx1Z2luLCB0aGlzLmZpbGUsIGZvbGRlcik7XG4gICAgICAgICAgICAgICAgbmV3IE5vdGljZShcbiAgICAgICAgICAgICAgICAgICAgYFx1MzAwQSR7dGhpcy5maWxlLmJhc2VuYW1lfVx1MzAwQlx1NURGMlx1NEUwQVx1NEYyMFx1NTIzMCAke2ZvbGRlciB8fCBcIlx1NEVEM1x1NUU5M1x1NjgzOVx1NzZFRVx1NUY1NVwifWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGF3YWl0IHJlZnJlc2hBcnRpY2xlc1ZpZXcodGhpcy5wbHVnaW4sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgbmV3IE5vdGljZShcbiAgICAgICAgICAgICAgICAgICAgYFx1NEUwQVx1NEYyMFx1NTkzMVx1OEQyNVx1RkYxQSR7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkQnV0dG9uLnRleHRDb250ZW50ID0gXCJcdTRFMEFcdTRGMjBcdTUyMzAgR2l0XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBsb2FkTG9jYWxBcnRpY2xlKFxuICAgIHBsdWdpbjogTXlTaW1wbGVQbHVnaW4sXG4gICAgZmlsZTogVEZpbGUsXG4gICAgZm9sZGVyOiBzdHJpbmdcbikge1xuICAgIGNvbnN0IGFkYXB0ZXIgPSBwbHVnaW4uYXBwLnZhdWx0LmFkYXB0ZXI7XG5cbiAgICBpZiAoIShhZGFwdGVyIGluc3RhbmNlb2YgRmlsZVN5c3RlbUFkYXB0ZXIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlx1NUY1M1x1NTI0RCBWYXVsdCBcdTRFMERcdTY2MkZcdTY3MkNcdTU3MzBcdTY1ODdcdTRFRjZcdTdDRkJcdTdFREZcdUZGMENcdTY1RTBcdTZDRDVcdTRFMEFcdTRGMjBcdTY1ODdcdTdBRTBcIik7XG4gICAgfVxuXG4gICAgY29uc3QgdGVtcERpciA9IGF3YWl0IHBsdWdpbi5jbG9uZVRvVGVtcCgpO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgbGV0IGNsZWFuRm9sZGVyID0gZm9sZGVyXG4gICAgICAgICAgICAudHJpbSgpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxcXC9nLCBcIi9cIilcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eXFwvK3xcXC8rJC9nLCBcIlwiKTtcblxuICAgICAgICAvLyBcdTk2MzJcdTZCNjJcdTkwMUFcdThGQzdcdTY1ODdcdTRFRjZcdTU5MzlcdThGOTNcdTUxNjVcdThERjNcdTUxRkEgR2l0IFx1NEUzNFx1NjVGNlx1NEVEM1x1NUU5M1x1MzAwMlxuICAgICAgICBjb25zdCBmb2xkZXJQYXJ0cyA9IGNsZWFuRm9sZGVyXG4gICAgICAgICAgICA/IGNsZWFuRm9sZGVyXG4gICAgICAgICAgICAgICAgICAuc3BsaXQoXCIvXCIpXG4gICAgICAgICAgICAgICAgICAuZmlsdGVyKChwYXJ0KSA9PiBwYXJ0ICYmIHBhcnQgIT09IFwiLlwiICYmIHBhcnQgIT09IFwiLi5cIilcbiAgICAgICAgICAgIDogW107XG5cbiAgICAgICAgY2xlYW5Gb2xkZXIgPSBmb2xkZXJQYXJ0cy5qb2luKFwiL1wiKTtcblxuICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgcGx1Z2luLmFwcC52YXVsdC5yZWFkKGZpbGUpO1xuICAgICAgICBjb25zdCB0YXJnZXRSZWxhdGl2ZSA9IGNsZWFuRm9sZGVyXG4gICAgICAgICAgICA/IGAke2NsZWFuRm9sZGVyfS8ke2ZpbGUuYmFzZW5hbWV9Lm1kYFxuICAgICAgICAgICAgOiBgJHtmaWxlLmJhc2VuYW1lfS5tZGA7XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0QWJzb2x1dGUgPSBwYXRoLnJlc29sdmUodGVtcERpciwgdGFyZ2V0UmVsYXRpdmUpO1xuXG4gICAgICAgIC8vIFx1Nzg2RVx1NEZERFx1NzZFRVx1NjgwN1x1OERFRlx1NUY4NFx1NEVDRFx1NzEzNlx1NEY0RFx1NEU4RVx1NEUzNFx1NjVGNlx1NEVEM1x1NUU5M1x1NTE4NVx1OTBFOFx1MzAwMlxuICAgICAgICBjb25zdCBub3JtYWxpemVkVGVtcCA9IHBhdGgucmVzb2x2ZSh0ZW1wRGlyKSArIHBhdGguc2VwO1xuICAgICAgICBpZiAoIXRhcmdldEFic29sdXRlLnN0YXJ0c1dpdGgobm9ybWFsaXplZFRlbXApKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdTY1RTBcdTY1NDhcdTc2ODQgR2l0IFx1NjU4N1x1NEVGNlx1NTkzOVx1OERFRlx1NUY4NFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZzLm1rZGlyU3luYyhwYXRoLmRpcm5hbWUodGFyZ2V0QWJzb2x1dGUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblxuICAgICAgICBjb25zdCBleGlzdHMgPSBmcy5leGlzdHNTeW5jKHRhcmdldEFic29sdXRlKTtcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyh0YXJnZXRBYnNvbHV0ZSwgY29udGVudCwgXCJ1dGY4XCIpO1xuXG4gICAgICAgIGNvbnN0IGdpdCA9IHNpbXBsZUdpdCh7XG4gICAgICAgICAgICBiYXNlRGlyOiB0ZW1wRGlyLFxuICAgICAgICAgICAgdHJpbW1lZDogdHJ1ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHBsdWdpbi5zZXR0aW5ncy5zc2hLZXkudHJpbSgpKSB7XG4gICAgICAgICAgICBjb25zdCBrZXlQYXRoID0gcGF0aC5qb2luKFxuICAgICAgICAgICAgICAgIG9zLnRtcGRpcigpLFxuICAgICAgICAgICAgICAgIGBvYnNpZGlhbi1naXQta2V5LSR7RGF0ZS5ub3coKX1gXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZzLndyaXRlRmlsZVN5bmMoXG4gICAgICAgICAgICAgICAgICAgIGtleVBhdGgsXG4gICAgICAgICAgICAgICAgICAgIHBsdWdpbi5zZXR0aW5ncy5zc2hLZXkudHJpbSgpICsgXCJcXG5cIixcbiAgICAgICAgICAgICAgICAgICAgeyBtb2RlOiAwbzYwMCB9XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGdpdC5lbnYoe1xuICAgICAgICAgICAgICAgICAgICAuLi5wcm9jZXNzLmVudixcbiAgICAgICAgICAgICAgICAgICAgR0lUX1NTSF9DT01NQU5EOlxuICAgICAgICAgICAgICAgICAgICAgICAgYHNzaCAtaSBcIiR7a2V5UGF0aH1cIiAtbyBTdHJpY3RIb3N0S2V5Q2hlY2tpbmc9bm8gLW8gVXNlcktub3duSG9zdHNGaWxlPS9kZXYvbnVsbGAsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBhd2FpdCBjb21taXRBbmRQdXNoQXJ0aWNsZShcbiAgICAgICAgICAgICAgICAgICAgZ2l0LFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRSZWxhdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgZmlsZS5iYXNlbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RzXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoa2V5UGF0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZzLnVubGlua1N5bmMoa2V5UGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gXHU1RkZEXHU3NTY1XHU0RTM0XHU2NUY2XHU1QkM2XHU5NEE1XHU2RTA1XHU3NDA2XHU1OTMxXHU4RDI1XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCBjb21taXRBbmRQdXNoQXJ0aWNsZShcbiAgICAgICAgICAgICAgICBnaXQsXG4gICAgICAgICAgICAgICAgdGFyZ2V0UmVsYXRpdmUsXG4gICAgICAgICAgICAgICAgZmlsZS5iYXNlbmFtZSxcbiAgICAgICAgICAgICAgICBleGlzdHNcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgICBwbHVnaW4ucmVtb3ZlVGVtcERpcih0ZW1wRGlyKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNvbW1pdEFuZFB1c2hBcnRpY2xlKFxuICAgIGdpdDogUmV0dXJuVHlwZTx0eXBlb2Ygc2ltcGxlR2l0PixcbiAgICB0YXJnZXRSZWxhdGl2ZTogc3RyaW5nLFxuICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgZXhpc3RlZDogYm9vbGVhblxuKSB7XG4gICAgYXdhaXQgZ2l0LmFkZCh0YXJnZXRSZWxhdGl2ZSk7XG5cbiAgICBjb25zdCBzdGF0dXMgPSBhd2FpdCBnaXQuc3RhdHVzKCk7XG4gICAgaWYgKCFzdGF0dXMuc3RhZ2VkLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcdTY1ODdcdTdBRTBcdTUxODVcdTVCQjlcdTZDQTFcdTY3MDlcdTUzRDhcdTUzMTZcdUZGMENcdTY1RTBcdTk3MDBcdTRFMEFcdTRGMjBcIik7XG4gICAgfVxuXG4gICAgY29uc3QgYWN0aW9uID0gZXhpc3RlZCA/IFwiXHU2NkY0XHU2NUIwXCIgOiBcIlx1NEUwQVx1NEYyMFwiO1xuICAgIGF3YWl0IGdpdC5jb21taXQoYGRvY3M6ICR7YWN0aW9ufSAke3RpdGxlfWApO1xuICAgIGF3YWl0IGdpdC5wdXNoKCk7XG5cbiAgICBjb25zb2xlLmxvZyhgR2l0ICR7YWN0aW9ufVx1NUI4Q1x1NjIxMFx1RkYxQSR7dGFyZ2V0UmVsYXRpdmV9YCk7XG59IiwgImltcG9ydCB7IE5vdGljZSB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHR5cGUgTXlTaW1wbGVQbHVnaW4gZnJvbSBcIi4vbWFpblwiO1xuXG4vKipcbiAqIFx1NTIzN1x1NjVCMFx1MjAxQ0dpdCBcdTY1ODdcdTdBRTBcdTIwMURcdTg5QzZcdTU2RkVcdTMwMDJcbiAqIC0gXHU4MkU1XHU4OUM2XHU1NkZFXHU1REYyXHU2MjUzXHU1RjAwXHVGRjBDXHU1MjE5XHU4QzAzXHU3NTI4XHU1MTc2XHU1MTZDXHU1RjAwXHU3Njg0IHJlZnJlc2ggXHU2NUI5XHU2Q0Q1XHU5MUNEXHU2NUIwXHU1MkEwXHU4RjdEXHU2NTg3XHU3QUUwXHU1MjE3XHU4ODY4XHUzMDAyXG4gKiAtIFx1ODJFNVx1ODlDNlx1NTZGRVx1NjcyQVx1NjI1M1x1NUYwMFx1RkYwQ1x1NTIxOVx1NEUwRFx1NTA1QVx1NEVGQlx1NEY1NVx1NEU4Qlx1MzAwMlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVmcmVzaEFydGljbGVzVmlldyhcbiAgICBwbHVnaW46IE15U2ltcGxlUGx1Z2luLFxuICAgIG9wdGlvbnM6IHsgc2lsZW50PzogYm9vbGVhbiB9ID0ge31cbik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgc2lsZW50ID0gZmFsc2UgfSA9IG9wdGlvbnM7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBsZWF2ZXMgPSBwbHVnaW4uYXBwLndvcmtzcGFjZS5nZXRMZWF2ZXNPZlR5cGUoXG4gICAgICAgICAgICBwbHVnaW4udmlld1R5cGVBcnRpY2xlc1xuICAgICAgICApO1xuXG4gICAgICAgIGlmIChsZWF2ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBcdTg5QzZcdTU2RkVcdTZDQTFcdTVGMDBcdUZGMENcdTY1RTBcdTk3MDBcdTUyMzdcdTY1QjBcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgbGVhZiBvZiBsZWF2ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHZpZXcgPSBsZWFmLnZpZXcgYXMgeyByZWZyZXNoPzogKCkgPT4gUHJvbWlzZTx2b2lkPiB9IHwgbnVsbDtcbiAgICAgICAgICAgIGlmICh2aWV3ICYmIHR5cGVvZiB2aWV3LnJlZnJlc2ggPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIGF3YWl0IHZpZXcucmVmcmVzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoXG4gICAgICAgICAgICAgICAgYFx1NTIzN1x1NjVCMFx1NjU4N1x1N0FFMFx1NTIxN1x1ODg2OFx1NTkzMVx1OEQyNVx1RkYxQSR7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKVxuICAgICAgICAgICAgICAgIH1gXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiXHU1MjM3XHU2NUIwXHU2NTg3XHU3QUUwXHU1MjE3XHU4ODY4XHU1OTMxXHU4RDI1XHVGRjFB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R0FBRztBQUN4RSxRQUFBQSxTQUFRLFNBQVM7QUFBQSxVQUNoQjtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Q7QUFBQSxNQUNEO0FBQUEsSUFDRCxTQUFTLE9BQU87QUFBQSxJQUVoQjtBQVFBLElBQUFBLFNBQVEsY0FBYyxPQUFPLEtBQUssUUFBUSxHQUFHLEVBQUUsT0FBTyxTQUFPO0FBQzVE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LElBQUk7QUFDckQsZ0JBQU0sZUFBZSxlQUNWLFdBQUssY0FBYyxNQUFNLElBQUksSUFDbEMsTUFBTTtBQUVaLGNBQUksTUFBTSxZQUFZLEdBQUc7QUFDckIsb0JBQVEsSUFBSSxhQUFhLE1BQVcsU0FBRyxFQUFFLEtBQUssR0FBRyxDQUFDO0FBQ2xELGtCQUFNLEtBQUssY0FBYyxZQUFZO0FBQUEsVUFDekM7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUVBLFlBQU0sS0FBSyxPQUFPO0FBRWxCLGFBQU8sTUFBTSxLQUFLLE9BQU8sRUFBRTtBQUFBLFFBQUssQ0FBQyxHQUFHQSxPQUNoQyxFQUFFLGNBQWNBLElBQUcsT0FBTztBQUFBLE1BQzlCO0FBQUEsSUFDSixVQUFFO0FBQ0UsWUFBTSxLQUFLLGNBQWMsT0FBTztBQUFBLElBQ3BDO0FBQUEsRUFDSjtBQUFBLEVBRUEsTUFBTSxjQUFjLEtBQTRCO0FBQzVDLFFBQUksQ0FBQyxJQUFLO0FBRVYsUUFBSTtBQUNBLFlBQVUsT0FBRyxLQUFLLEVBQUUsV0FBVyxNQUFNLE9BQU8sS0FBSyxDQUFDO0FBQUEsSUFDdEQsU0FBUyxPQUFPO0FBQ1osY0FBUSxLQUFLLCtEQUFrQixLQUFLO0FBQUEsSUFDeEM7QUFBQSxFQUNKO0FBQUEsRUFFQSxXQUFXO0FBQ1AsU0FBSyxnQkFBZ0I7QUFDckIsU0FBSyxJQUFJLFVBQVUsbUJBQW1CLGtCQUFrQjtBQUFBLEVBQzVEO0FBQ0o7IiwKICAibmFtZXMiOiBbImV4cG9ydHMiLCAibW9kdWxlIiwgIm0iLCAiaCIsICJkIiwgInciLCAieSIsICJtcyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJtcyIsICJ2IiwgIm5zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgIm0iLCAiYyIsICJyIiwgInYiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiXyIsICJrIiwgInVzZUNvbG9ycyIsICJjIiwgInYiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAicGF0aCIsICJzdGF0IiwgImV4cG9ydHMiLCAiX19leHBvcnQiLCAiZXhwb3J0cyIsICJpbXBvcnRfb2JzaWRpYW4iLCAiY2FjaGUiLCAicGF0aHNwZWMiLCAicGF0aHMiLCAia2V5IiwgImlzUGF0aFNwZWMiLCAidmFsdWUiLCAidG9QYXRocyIsICJzY29wZWRGbGFncyIsICJmbGFncyIsICJzY29wZSIsICJmaW5kR2xvYmFsIiwgImZsYWciLCAiQ09ORklHX1dSSVRFX0ZMQUdTIiwgIkNPTkZJR19SRUFEX0ZMQUdTIiwgIkNPTkZJR19XUklURV9WRVJCUyIsICJDT05GSUdfUkVBRF9WRVJCUyIsICJkZXRlY3RDb25maWdBY3Rpb24iLCAicG9zaXRpb25hbHMiLCAibmFtZSIsICJjb25maWdPcGVyYXRpb24iLCAidmVyYiIsICJpc1dyaXRlIiwgImtleSIsICJ0b09wZXJhdGlvbiIsICJvcGVyYXRpb24iLCAicGFyc2VBc3NpZ25tZW50IiwgInJhdyIsICJlcSIsICJkZXRlY3RDb25maWdTY29wZSIsICJkZXRlY3RDb25maWdPdmVycmlkZVNjb3BlIiwgImNvbGxlY3RXcml0ZUZsYWdzIiwgImFzc2lnbm1lbnQiLCAiY29sbGVjdENvbmZpZ0FjY2VzcyIsICJ0YXNrIiwgInBhcnNlZENvbmZpZyIsICJhcHBlbmRQYXJzZWRDb25maWdBY3Rpb24iLCAiYWN0aW9uIiwgImNvbmZpZyIsICJVTklWRVJTQUwiLCAiR0xPQkFMIiwgIkNPTU1BTkRTIiwgIkVNUFRZIiwgImdldEZsYWdTcGVjRm9yVGFzayIsICJzcGVjIiwgImV4cGFuZFRva2VuIiwgInN0ZW0iLCAiY2hhciIsICJjb25zdW1lcyIsICJleHBhbmRDbHVzdGVyIiwgInNob3J0U3BlYyIsICJjaGFycyIsICJyZXN1bHQiLCAiaSIsICJyZW1haW5kZXIiLCAiYyIsICJwYXJzZUdsb2JhbEZsYWdzIiwgInRva2VucyIsICJwYXJzZWQiLCAibmV4dCIsICJ0b2tlbiIsICJwYXJzZVRhc2tGbGFncyIsICJwYXRoc3BlY3MiLCAiY3VycmVudCIsICJpc1BhdGhTcGVjIiwgInRvUGF0aHMiLCAiaiIsICJ0IiwgImRldGVjdFZ1bG5lcmFibGVDb25maWdXcml0ZXMiLCAid3JpdGUiLCAiaGVscGVyIiwgInByZXZlbnRVbnNhZmVDb25maWciLCAidnVsbmVyYWJpbGl0eSIsICJwcmV2ZW50Q29uZmlnQnVpbGRlciIsICJjYXRlZ29yeSIsICJtZXNzYWdlIiwgInJlZ2V4IiwgInByZXZlbnRFeHBhbmRlZENvbmZpZ0J1aWxkZXIiLCAiZGV0ZWN0VnVsbmVyYWJsZUZsYWdzIiwgInByZXZlbnRVbnNhZmVGbGFncyIsICJwcmV2ZW50RmxhZ0J1aWxkZXIiLCAiZ2xvYmFsT25seSIsICJ3aXRoVmFsdWUiLCAiY3VycmVudFRhc2siLCAicGF0aFRha2luZ0dsb2JhbCIsICJ2dWxuZXJhYmlsaXR5QW5hbHlzaXMiLCAicGFyc2VBcmd2IiwgInRhc2tJbmRleCIsICJ0YXNrVG9rZW5zIiwgInRvUGFyc2VkRmxhZyIsICJ2dWxuZXJhYmlsaXR5TGlzdCIsICJ2dWxuZXJhYmlsaXRpZXMiLCAidmFsdWUiLCAiR2l0RW52S2V5cyIsICJjb2xsZWN0Q29uZmlnQnlDb3VudCIsICJlbnYiLCAiY291bnQiLCAiaW5kZXgiLCAiY29sbGVjdENvbmZpZ1Z1bG5lcmFiaWxpdGllcyIsICJpc0dpdEVudktleSIsICJwcmVwYXJlRW52IiwgImdpdEVudiIsICJlbnZLZXkiLCAicGFyc2VFbnYiLCAidnVsbmVyYWJpbGl0eUNoZWNrIiwgIkdpdEVycm9yIiwgInRhc2siLCAibWVzc2FnZSIsICJHaXRDb25zdHJ1Y3RFcnJvciIsICJjb25maWciLCAiR2l0UGx1Z2luRXJyb3IiLCAicGx1Z2luIiwgIkdpdFJlc3BvbnNlRXJyb3IiLCAiZ2l0IiwgIlRhc2tDb25maWd1cmF0aW9uRXJyb3IiLCAiTlVMTCIsICJOT09QIiwgImFzRnVuY3Rpb24iLCAic291cmNlIiwgImlzVXNlckZ1bmN0aW9uIiwgInNwbGl0T24iLCAiaW5wdXQiLCAiY2hhciIsICJpbmRleCIsICJmaXJzdCIsICJvZmZzZXQiLCAiaXNBcnJheUxpa2UiLCAibGFzdCIsICJmaWx0ZXJIYXNMZW5ndGgiLCAidG9MaW5lc1dpdGhDb250ZW50IiwgInRyaW1tZWQiLCAic2VwYXJhdG9yIiwgIm91dHB1dCIsICJsaW5lIiwgImxpbmVDb250ZW50IiwgImZvckVhY2hMaW5lV2l0aENvbnRlbnQiLCAiY2FsbGJhY2siLCAiZm9sZGVyRXhpc3RzIiwgInBhdGgiLCAiZXhpc3RzIiwgIkZPTERFUiIsICJhcHBlbmQiLCAidGFyZ2V0IiwgIml0ZW0iLCAiaW5jbHVkaW5nIiwgInJlbW92ZSIsICJvYmplY3RUb1N0cmluZyIsICJhc0FycmF5IiwgImFzQ2FtZWxDYXNlIiwgInN0ciIsICJfYWxsIiwgImNociIsICJhc1N0cmluZ0FycmF5IiwgImFzTnVtYmVyIiwgIm9uTmFOIiwgIm51bSIsICJwcmVmaXhlZEFycmF5IiwgInByZWZpeCIsICJpIiwgIm1heCIsICJidWZmZXJUb1N0cmluZyIsICJieXRlTGVuZ3RoIiwgInBpY2siLCAicHJvcGVydGllcyIsICJvdXQiLCAia2V5IiwgImRlbGF5IiwgImR1cmF0aW9uIiwgImRvbmUiLCAib3JWb2lkIiwgImZpbHRlclR5cGUiLCAiZmlsdGVyIiwgImRlZiIsICJmaWx0ZXJBcnJheSIsICJmaWx0ZXJQcmltaXRpdmVzIiwgIm9taXQiLCAidHlwZSIsICJpc1BhdGhTcGVjIiwgImZpbHRlclN0cmluZyIsICJmaWx0ZXJTdHJpbmdPckJ1ZmZlciIsICJmaWx0ZXJTdHJpbmdPclN0cmluZ0FycmF5IiwgImZpbHRlclBsYWluT2JqZWN0IiwgImZpbHRlckZ1bmN0aW9uIiwgIkV4aXRDb2RlcyIsICJHaXRPdXRwdXRTdHJlYW1zIiwgInN0ZE91dCIsICJzdGRFcnIiLCAidXNlTWF0Y2hlc0RlZmF1bHQiLCAiTGluZVBhcnNlciIsICJyZWdFeHAiLCAidXNlTWF0Y2hlcyIsICJyZWciLCAibWF0Y2hlZCIsICJfaW5kZXgiLCAiUmVtb3RlTGluZVBhcnNlciIsICJkZWZhdWx0T3B0aW9ucyIsICJjcmVhdGVJbnN0YW5jZUNvbmZpZyIsICJvcHRpb25zIiwgImJhc2VEaXIiLCAibyIsICJhcHBlbmRUYXNrT3B0aW9ucyIsICJjb21tYW5kcyIsICJ2YWx1ZSIsICJ2IiwgImdldFRyYWlsaW5nT3B0aW9ucyIsICJhcmdzIiwgImluaXRpYWxQcmltaXRpdmUiLCAib2JqZWN0T25seSIsICJjb21tYW5kIiwgInRyYWlsaW5nT3B0aW9uc0FyZ3VtZW50IiwgInRyYWlsaW5nQXJyYXlBcmd1bWVudCIsICJoYXNUcmFpbGluZ0NhbGxiYWNrIiwgInRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudCIsICJpbmNsdWRlTm9vcCIsICJjYWxsVGFza1BhcnNlciIsICJwYXJzZXIiLCAic3RyZWFtcyIsICJwYXJzZVN0cmluZ1Jlc3BvbnNlIiwgInJlc3VsdCIsICJwYXJzZXJzIiwgInRleHRzIiwgInRyaW0iLCAidGV4dCIsICJsaW5lcyIsICJwYXJzZSIsICJvbkVycm9yIiwgImV4aXRDb2RlIiwgImVycm9yIiwgImRvbmUiLCAiZmFpbCIsICJFeGl0Q29kZXMiLCAiaXNOb3RSZXBvTWVzc2FnZSIsICJwYXJzZXIiLCAidGV4dCIsICJjaGVja0lzUmVwb1Rhc2siLCAiYWN0aW9uIiwgImNoZWNrSXNCYXJlUmVwb1Rhc2siLCAiY2hlY2tJc1JlcG9Sb290VGFzayIsICJwYXRoIiwgIkNsZWFuUmVzcG9uc2UiLCAiZHJ5UnVuIiwgInJlbW92YWxSZWdleHAiLCAiZHJ5UnVuUmVtb3ZhbFJlZ2V4cCIsICJpc0ZvbGRlclJlZ2V4cCIsICJjbGVhblN1bW1hcnlQYXJzZXIiLCAic3VtbWFyeSIsICJyZWdleHAiLCAidG9MaW5lc1dpdGhDb250ZW50IiwgImxpbmUiLCAicmVtb3ZlZCIsICJFTVBUWV9DT01NQU5EUyIsICJhZGhvY0V4ZWNUYXNrIiwgImNvbmZpZ3VyYXRpb25FcnJvclRhc2siLCAiVGFza0NvbmZpZ3VyYXRpb25FcnJvciIsICJzdHJhaWdodFRocm91Z2hTdHJpbmdUYXNrIiwgImNvbW1hbmRzIiwgInRyaW1tZWQiLCAic3RyYWlnaHRUaHJvdWdoQnVmZmVyVGFzayIsICJidWZmZXIiLCAiaXNCdWZmZXJUYXNrIiwgInRhc2siLCAiaXNFbXB0eVRhc2siLCAiQ09ORklHX0VSUk9SX0lOVEVSQUNUSVZFX01PREUiLCAiQ09ORklHX0VSUk9SX01PREVfUkVRVUlSRUQiLCAiQ09ORklHX0VSUk9SX1VOS05PV05fT1BUSU9OIiwgIkNsZWFuT3B0aW9ucyIsICJDbGVhbk9wdGlvblZhbHVlcyIsICJhc1N0cmluZ0FycmF5IiwgImNsZWFuV2l0aE9wdGlvbnNUYXNrIiwgIm1vZGUiLCAiY3VzdG9tQXJncyIsICJjbGVhbk1vZGUiLCAib3B0aW9ucyIsICJ2YWxpZCIsICJnZXRDbGVhbk9wdGlvbnMiLCAiaXNJbnRlcmFjdGl2ZU1vZGUiLCAiY2xlYW5UYXNrIiwgImlzQ2xlYW5PcHRpb25zQXJyYXkiLCAiaW5wdXQiLCAidGVzdCIsICJjaGFyIiwgImlzQ2xlYW5Nb2RlIiwgImlzS25vd25PcHRpb24iLCAib3B0aW9uIiwgIkNvbmZpZ0xpc3QiLCAiYWxsIiwgImZpbGUiLCAibGF0ZXN0IiwgImxhc3QiLCAia2V5IiwgInZhbHVlIiwgInZhbHVlcyIsICJjb25maWdMaXN0UGFyc2VyIiwgImNvbmZpZyIsICJpdGVtIiwgImNvbmZpZ1BhcnNlciIsICJjb25maWdHZXRQYXJzZXIiLCAic2NvcGVzIiwgImNvbmZpZ0ZpbGVQYXRoIiwgImZpbGVQYXRoIiwgInJlcXVlc3RlZEtleSIsICJsaW5lcyIsICJpIiwgIm1heCIsICJzcGxpdE9uIiwgIkdpdENvbmZpZ1Njb3BlIiwgImFzQ29uZmlnU2NvcGUiLCAic2NvcGUiLCAiZmFsbGJhY2siLCAiYWRkQ29uZmlnVGFzayIsICJhcHBlbmQiLCAiZ2V0Q29uZmlnVGFzayIsICJsaXN0Q29uZmlnVGFzayIsICJyZXN0IiwgInRyYWlsaW5nRnVuY3Rpb25Bcmd1bWVudCIsICJEaWZmTmFtZVN0YXR1cyIsICJkaWZmTmFtZVN0YXR1cyIsICJpc0RpZmZOYW1lU3RhdHVzIiwgIl9hIiwgImRpc2FsbG93ZWRPcHRpb25zIiwgIlF1ZXJ5IiwgIkdyZXBRdWVyeSIsICJxdWVyeSIsICJhbmQiLCAicHJlZml4ZWRBcnJheSIsICJwYXJhbSIsICJncmVwUXVlcnlCdWlsZGVyIiwgInBhcmFtcyIsICJwYXJzZUdyZXAiLCAiZ3JlcCIsICJwYXRocyIsICJyZXN1bHRzIiwgImZvckVhY2hMaW5lV2l0aENvbnRlbnQiLCAicHJldmlldyIsICJOVUxMIiwgImFzTnVtYmVyIiwgInNlYXJjaFRlcm0iLCAidGhlbiIsICJnZXRUcmFpbGluZ09wdGlvbnMiLCAic3RkT3V0IiwgIlJlc2V0TW9kZSIsICJ2YWxpZFJlc2V0TW9kZXMiLCAicmVzZXRUYXNrIiwgImlzVmFsaWRSZXNldE1vZGUiLCAiZ2V0UmVzZXRNb2RlIiwgImRlYnVnIiwgImZpbHRlckhhc0xlbmd0aCIsICJvYmplY3RUb1N0cmluZyIsICJjcmVhdGVMb2ciLCAicHJlZml4ZWRMb2dnZXIiLCAidG8iLCAicHJlZml4IiwgImZvcndhcmQiLCAibWVzc2FnZSIsICJhcmdzIiwgImNoaWxkTG9nZ2VyTmFtZSIsICJuYW1lIiwgImNoaWxkRGVidWdnZXIiLCAicGFyZW50TmFtZXNwYWNlIiwgImNoaWxkTmFtZXNwYWNlIiwgImNyZWF0ZUxvZ2dlciIsICJsYWJlbCIsICJ2ZXJib3NlIiwgImluaXRpYWxTdGVwIiwgImluZm9EZWJ1Z2dlciIsICJsYWJlbFByZWZpeCIsICJzcGF3bmVkIiwgImRlYnVnRGVidWdnZXIiLCAiZmlsdGVyVHlwZSIsICJmaWx0ZXJTdHJpbmciLCAic3RlcCIsICJzaWJsaW5nIiwgImluaXRpYWwiLCAicGhhc2UiLCAic3RlcFByZWZpeCIsICJOT09QIiwgImluZm8iLCAiX1Rhc2tzUGVuZGluZ1F1ZXVlIiwgImxvZ0xhYmVsIiwgImxvZ2dlciIsICJwcm9ncmVzcyIsICJlcnIiLCAiR2l0RXJyb3IiLCAiVGFza3NQZW5kaW5nUXVldWUiLCAiR2l0RXhlY3V0b3JDaGFpbiIsICJfZXhlY3V0b3IiLCAiX3NjaGVkdWxlciIsICJfcGx1Z2lucyIsICJjd2QiLCAib25TY2hlZHVsZUNvbXBsZXRlIiwgIm9uUXVldWVDb21wbGV0ZSIsICJlIiwgImdpdEVycm9yIiwgImJpbmFyeSIsICJyYXciLCAib3V0cHV0U3RyZWFtcyIsICJjYWxsVGFza1BhcnNlciIsICJyZXN1bHQiLCAicmVqZWN0aW9uIiwgInN0ZEVyciIsICJuZXdTdGRPdXQiLCAiR2l0T3V0cHV0U3RyZWFtcyIsICJjb21tYW5kIiwgIm91dHB1dEhhbmRsZXIiLCAib3V0cHV0TG9nZ2VyIiwgInNwYXduT3B0aW9ucyIsICJyZWFzb24iLCAic3Bhd24iLCAib25EYXRhUmVjZWl2ZWQiLCAib25FcnJvclJlY2VpdmVkIiwgImZpcnN0IiwgInRhcmdldCIsICJvdXRwdXQiLCAiR2l0RXhlY3V0b3IiLCAidGFza0NhbGxiYWNrIiwgInJlc3BvbnNlIiwgImNhbGxiYWNrIiwgIm9uU3VjY2VzcyIsICJkYXRhIiwgImNoYW5nZVdvcmtpbmdEaXJlY3RvcnlUYXNrIiwgImRpcmVjdG9yeSIsICJyb290IiwgImluc3RhbmNlIiwgImZvbGRlckV4aXN0cyIsICJjaGVja291dFRhc2siLCAicmVtb3ZlIiwgImNoZWNrb3V0IiwgImJyYW5jaE5hbWUiLCAic3RhcnRQb2ludCIsICJjbG9uZVRhc2siLCAicmVwbyIsICJwYXRoc3BlYyIsICJjbG9uZU1pcnJvclRhc2siLCAiY3JlYXRlQ2xvbmVUYXNrIiwgImFwaSIsICJyZXBvUGF0aCIsICJjbG9uZSIsICJwYXJzZXJzIiwgIkxpbmVQYXJzZXIiLCAiYnJhbmNoIiwgImNvbW1pdCIsICJhdXRob3IiLCAicGFydHMiLCAiZW1haWwiLCAiY2hhbmdlcyIsICJpbnNlcnRpb25zIiwgImRlbGV0aW9ucyIsICJkaXJlY3Rpb24iLCAiY291bnQiLCAicGFyc2VDb21taXRSZXN1bHQiLCAicGFyc2VTdHJpbmdSZXNwb25zZSIsICJjb21taXRUYXNrIiwgImZpbGVzIiwgIm5leHQiLCAicmVqZWN0RGVwcmVjYXRlZFNpZ25hdHVyZXMiLCAiYXNBcnJheSIsICJmaWx0ZXJTdHJpbmdPclN0cmluZ0FycmF5IiwgImZpbHRlckFycmF5IiwgImNvdW50T2JqZWN0c1Jlc3BvbnNlIiwgInByb3BlcnR5IiwgImFzQ2FtZWxDYXNlIiwgImNvdW50T2JqZWN0cyIsICJmaXJzdENvbW1pdCIsICJoYXNoT2JqZWN0VGFzayIsICJ3cml0ZSIsICJJbml0U3VtbWFyeSIsICJiYXJlIiwgImV4aXN0aW5nIiwgImdpdERpciIsICJpbml0UmVzcG9uc2VSZWdleCIsICJyZUluaXRSZXNwb25zZVJlZ2V4IiwgInBhcnNlSW5pdCIsICJ0b2tlbnMiLCAiYmFyZUNvbW1hbmQiLCAiaGFzQmFyZUNvbW1hbmQiLCAiaW5pdFRhc2siLCAiaW50ZXJwcmV0VHJhaWxlcnNUYXNrIiwgImluZGV4IiwgImludGVycHJldFRyYWlsZXJzIiwgImZpbHRlclN0cmluZ09yQnVmZmVyIiwgIkxvZ0Zvcm1hdCIsICJsb2dGb3JtYXRSZWdleCIsICJsb2dGb3JtYXRGcm9tQ29tbWFuZCIsICJmb3JtYXQiLCAiaXNMb2dGb3JtYXQiLCAiY3VzdG9tQXJnIiwgIkRpZmZTdW1tYXJ5IiwgInN0YXRQYXJzZXIiLCAiYWx0ZXJhdGlvbnMiLCAiYmVmb3JlIiwgImFmdGVyIiwgImNoYW5nZWQiLCAiaW5zZXJ0ZWQiLCAiZGVsZXRlZCIsICJudW1TdGF0UGFyc2VyIiwgImNoYW5nZXNJbnNlcnQiLCAiY2hhbmdlc0RlbGV0ZSIsICJuYW1lT25seVBhcnNlciIsICJuYW1lU3RhdHVzUGFyc2VyIiwgInN0YXR1cyIsICJzaW1pbGFyaXR5IiwgImZyb20iLCAiX3RvIiwgIm9yVm9pZCIsICJkaWZmU3VtbWFyeVBhcnNlcnMiLCAiZ2V0RGlmZlBhcnNlciIsICJTVEFSVF9CT1VOREFSWSIsICJDT01NSVRfQk9VTkRBUlkiLCAiU1BMSVRURVIiLCAiZGVmYXVsdEZpZWxkTmFtZXMiLCAibGluZUJ1aWxkZXIiLCAiZmllbGRzIiwgImZpZWxkIiwgImNyZWF0ZUxpc3RMb2dTdW1tYXJ5UGFyc2VyIiwgInNwbGl0dGVyIiwgImxvZ0Zvcm1hdCIsICJwYXJzZURpZmZSZXN1bHQiLCAibGluZURldGFpbCIsICJsaXN0TG9nTGluZSIsICJkaWZmU3VtbWFyeVRhc2siLCAidmFsaWRhdGVMb2dGb3JtYXRDb25maWciLCAiZmxhZ3MiLCAiZXhjbHVkZU9wdGlvbnMiLCAicHJldHR5Rm9ybWF0IiwgImZvcm1hdFN0ciIsICJ1c2VyT3B0aW9ucyIsICJvdXQiLCAicGFyc2VMb2dPcHRpb25zIiwgIm9wdCIsICJmaWx0ZXJQbGFpbk9iamVjdCIsICJzdWZmaXgiLCAibWF4Q291bnQiLCAicmFuZ2VPcGVyYXRvciIsICJhcHBlbmRUYXNrT3B0aW9ucyIsICJsb2dUYXNrIiwgImxvZyIsICJ0cmFpbGluZ09wdGlvbnNBcmd1bWVudCIsICJjcmVhdGVMb2dUYXNrIiwgIk1lcmdlU3VtbWFyeUNvbmZsaWN0IiwgIm1ldGEiLCAiTWVyZ2VTdW1tYXJ5RGV0YWlsIiwgIlB1bGxTdW1tYXJ5IiwgIlB1bGxGYWlsZWRTdW1tYXJ5IiwgIm9iamVjdEVudW1lcmF0aW9uUmVzdWx0IiwgInJlbW90ZU1lc3NhZ2VzIiwgImFzT2JqZWN0Q291bnQiLCAic291cmNlIiwgImRlbHRhIiwgInJlbW90ZU1lc3NhZ2VzT2JqZWN0UGFyc2VycyIsICJSZW1vdGVMaW5lUGFyc2VyIiwgImVudW1lcmF0aW9uIiwgInRvdGFsIiwgInJldXNlZCIsICJwYWNrUmV1c2VkIiwgIm9iamVjdHMiLCAicHVsbFJlcXVlc3RVcmwiLCAidXJsIiwgInBhcnNlUmVtb3RlTWVzc2FnZXMiLCAiX3N0ZE91dCIsICJSZW1vdGVNZXNzYWdlU3VtbWFyeSIsICJGSUxFX1VQREFURV9SRUdFWCIsICJTVU1NQVJZX1JFR0VYIiwgIkFDVElPTl9SRUdFWCIsICJlcnJvclBhcnNlcnMiLCAicmVtb3RlIiwgImhhc2hMb2NhbCIsICJoYXNoUmVtb3RlIiwgImJyYW5jaExvY2FsIiwgImJyYW5jaFJlbW90ZSIsICJwYXJzZVB1bGxEZXRhaWwiLCAicGFyc2VQdWxsUmVzdWx0IiwgInBhcnNlUHVsbEVycm9yUmVzdWx0IiwgInB1bGxFcnJvciIsICJhdXRvTWVyZ2UiLCAiZGVsZXRlUmVmIiwgInBhcnNlTWVyZ2VSZXN1bHQiLCAicGFyc2VNZXJnZURldGFpbCIsICJtZXJnZVRhc2siLCAibWVyZ2UiLCAiR2l0UmVzcG9uc2VFcnJvciIsICJwdXNoUmVzdWx0UHVzaGVkSXRlbSIsICJsb2NhbCIsICJ0YWciLCAiYWxyZWFkeVVwZGF0ZWQiLCAidHlwZSIsICJyZW1vdGVOYW1lIiwgInBhcnNlUHVzaFJlc3VsdCIsICJwdXNoRGV0YWlsIiwgInBhcnNlUHVzaERldGFpbCIsICJyZXNwb25zZURldGFpbCIsICJwdXNoVGFnc1Rhc2siLCAicmVmIiwgInB1c2hUYXNrIiwgInNob3ciLCAiZnJvbVBhdGhSZWdleCIsICJGaWxlU3RhdHVzU3VtbWFyeSIsICJ3b3JraW5nX2RpciIsICJkZXRhaWwiLCAiU3RhdHVzU3VtbWFyeSIsICJyZW5hbWVkRmlsZSIsICJpbmRleFgiLCAiaW5kZXhZIiwgImhhbmRsZXIiLCAiY29uZmxpY3RzIiwgInkiLCAicmVuYW1lZCIsICJfcmVzdWx0IiwgIl9maWxlIiwgImFoZWFkUmVnIiwgImJlaGluZFJlZyIsICJjdXJyZW50UmVnIiwgInRyYWNraW5nUmVnIiwgIm9uRW1wdHlCcmFuY2hSZWciLCAicmVnZXhSZXN1bHQiLCAicGFyc2VTdGF0dXNTdW1tYXJ5IiwgImwiLCAic3BsaXRMaW5lIiwgImxpbmVTdHIiLCAid29ya2luZ0RpciIsICJpZ25vcmVkT3B0aW9ucyIsICJzdGF0dXNUYXNrIiwgImFyZyIsICJOT1RfSU5TVEFMTEVEIiwgInZlcnNpb25SZXNwb25zZSIsICJtYWpvciIsICJtaW5vciIsICJwYXRjaCIsICJhZ2VudCIsICJpbnN0YWxsZWQiLCAibm90SW5zdGFsbGVkUmVzcG9uc2UiLCAidmVyc2lvbiIsICJ2ZXJzaW9uUGFyc2VyIiwgIlNpbXBsZUdpdEFwaSIsICJjaGFpbiIsICJwcm9taXNlIiwgImNyZWF0ZVNjaGVkdWxlZFRhc2siLCAiaWQiLCAiY3JlYXRlRGVmZXJyZWQiLCAiU2NoZWR1bGVyIiwgImNvbmN1cnJlbmN5IiwgImFwcGx5UGF0Y2hUYXNrIiwgInBhdGNoZXMiLCAiQnJhbmNoU3RhdHVzSWRlbnRpZmllciIsICJCcmFuY2hTdW1tYXJ5UmVzdWx0IiwgImRldGFjaGVkIiwgImN1cnJlbnQiLCAiYnJhbmNoU3RhdHVzIiwgImN1cnJlbnRCcmFuY2hQYXJzZXIiLCAicGFyc2VCcmFuY2hTdW1tYXJ5IiwgImN1cnJlbnRPbmx5IiwgIkJyYW5jaERlbGV0aW9uQmF0Y2giLCAiYnJhbmNoRGVsZXRpb25TdWNjZXNzIiwgImhhc2giLCAiYnJhbmNoRGVsZXRpb25GYWlsdXJlIiwgImRlbGV0ZVN1Y2Nlc3NSZWdleCIsICJkZWxldGVFcnJvclJlZ2V4IiwgImRlbGV0aW9uIiwgInBhcnNlQnJhbmNoRGVsZXRpb25zIiwgImhhc0JyYW5jaERlbGV0aW9uRXJyb3IiLCAicHJvY2Vzc0V4aXRDb2RlIiwgImNvbnRhaW5zRGVsZXRlQnJhbmNoQ29tbWFuZCIsICJkZWxldGVDb21tYW5kcyIsICJicmFuY2hUYXNrIiwgImlzRGVsZXRlIiwgImlzQ3VycmVudE9ubHkiLCAiYnJhbmNoTG9jYWxUYXNrIiwgImRlbGV0ZUJyYW5jaGVzVGFzayIsICJicmFuY2hlcyIsICJmb3JjZURlbGV0ZSIsICJkZWxldGVCcmFuY2hUYXNrIiwgIl8iLCAiYnVmZmVyVG9TdHJpbmciLCAiY2hlY2tJZ25vcmVUYXNrIiwgInBhcnNlQ2hlY2tJZ25vcmUiLCAidG9QYXRoIiwgIm5vcm1hbGl6ZSIsICJ0cmFja2luZyIsICJwYXJzZUZldGNoUmVzdWx0IiwgImRpc2FsbG93ZWRDb21tYW5kIiwgImZldGNoVGFzayIsICJwYXJzZU1vdmVSZXN1bHQiLCAibW92ZVRhc2siLCAicHVsbFRhc2siLCAiX2Vycm9yIiwgIl9kb25lIiwgInBhcnNlR2V0UmVtb3RlcyIsICJyZW1vdGVzIiwgImZvckVhY2giLCAicGFyc2VHZXRSZW1vdGVzVmVyYm9zZSIsICJwdXJwb3NlIiwgImFkZFJlbW90ZVRhc2siLCAicmVtb3RlUmVwbyIsICJnZXRSZW1vdGVzVGFzayIsICJsaXN0UmVtb3Rlc1Rhc2siLCAicmVtb3RlVGFzayIsICJyZW1vdmVSZW1vdGVUYXNrIiwgInN0YXNoTGlzdFRhc2siLCAiYWRkU3ViTW9kdWxlVGFzayIsICJzdWJNb2R1bGVUYXNrIiwgImluaXRTdWJNb2R1bGVUYXNrIiwgInVwZGF0ZVN1Yk1vZHVsZVRhc2siLCAiVGFnTGlzdCIsICJwYXJzZVRhZ0xpc3QiLCAiY3VzdG9tU29ydCIsICJ0YWdzIiwgInRhZ0EiLCAidGFnQiIsICJwYXJ0c0EiLCAicGFydHNCIiwgInNpbmdsZVNvcnRlZCIsICJ0b051bWJlciIsICJkaWZmIiwgInNvcnRlZCIsICJhIiwgImIiLCAiYUlzTnVtIiwgImJJc051bSIsICJ0YWdMaXN0VGFzayIsICJoYXNDdXN0b21Tb3J0IiwgImFkZFRhZ1Rhc2siLCAiYWRkQW5ub3RhdGVkVGFnVGFzayIsICJ0YWdNZXNzYWdlIiwgIkdpdCIsICJwbHVnaW5zIiwgImdpdCIsICJ0YWdOYW1lIiwgImJyYW5jaE5hbWVzIiwgImNyZWF0ZVJlc3RDb21tYW5kcyIsICJmaWx0ZXJQcmltaXRpdmVzIiwgInVzaW5nQ2xlYW5PcHRpb25zQXJyYXkiLCAicGF0aG5hbWVzIiwgImNoZWNrVHlwZSIsICJhYm9ydFBsdWdpbiIsICJzaWduYWwiLCAiX2RhdGEiLCAiY29udGV4dCIsICJHaXRQbHVnaW5FcnJvciIsICJraWxsIiwgImFsbG93RW52aXJvbm1lbnRQbHVnaW4iLCAiYWxsb3dFbnZpcm9ubWVudCIsICJhbGxvd0FiYnJldmlhdGVkT3B0aW9ucyIsICJhbGxvd2VkIiwgImVudiIsICJzdXBwbGllZEtleXMiLCAibm9ybWFsaXNlZCIsICJpc0d1YXJkZWRFbnZLZXkiLCAiaXNHaXRFbnZLZXkiLCAiYmxvY2tVbnNhZmVPcGVyYXRpb25zUGx1Z2luIiwgInZ1bG5lcmFiaWxpdHkiLCAidnVsbmVyYWJpbGl0eUNoZWNrIiwgImNvbW1hbmRDb25maWdQcmVmaXhpbmdQbHVnaW4iLCAiY29uZmlndXJhdGlvbiIsICJuZXZlciIsICJkZWZlcnJlZCIsICJjb21wbGV0aW9uRGV0ZWN0aW9uUGx1Z2luIiwgIm9uQ2xvc2UiLCAib25FeGl0IiwgImNyZWF0ZUV2ZW50cyIsICJldmVudHMiLCAiY29uZmlndXJlVGltZW91dCIsICJjb2RlIiwgImZsYWciLCAiZXZlbnQiLCAidGltZW91dCIsICJkZWxheSIsICJjbG9zZSIsICJkZWZlckNsb3NlIiwgInF1aWNrQ2xvc2UiLCAiV1JPTkdfTlVNQkVSX0VSUiIsICJXUk9OR19DSEFSU19FUlIiLCAiaXNCYWRBcmd1bWVudCIsICJ0b0JpbmFyeUNvbmZpZyIsICJhbGxvd1Vuc2FmZSIsICJjdXN0b21CaW5hcnlQbHVnaW4iLCAiUkVBU09OUyIsICJnZXRSZWFzb24iLCAiR2l0Q29uZmlndXJhdGlvbkVycm9yIiwgImlzVGFza0Vycm9yIiwgImdldEVycm9yTWVzc2FnZSIsICJlcnJvckRldGVjdGlvbkhhbmRsZXIiLCAib3ZlcndyaXRlIiwgImlzRXJyb3IiLCAiZXJyb3JNZXNzYWdlIiwgImNyZWF0ZUdpdEVycm9yIiwgImVycm9yRGV0ZWN0aW9uUGx1Z2luIiwgImlucHV0UGx1Z2luIiwgInRhc2tJbnB1dCIsICJzdGRpbiIsICJjb250ZW50IiwgImJ5dGVMZW5ndGgiLCAiUGx1Z2luU3RvcmUiLCAiRXZlbnRFbWl0dGVyIiwgImxpc3RlbmVyIiwgInBsdWdpbiIsICJjb250ZXh0dWFsIiwgInByb2dyZXNzTW9uaXRvclBsdWdpbiIsICJwcm9ncmVzc0NvbW1hbmQiLCAicHJvZ3Jlc3NNZXRob2RzIiwgImluY2x1ZGluZyIsICJjaHVuayIsICJwcm9ncmVzc0V2ZW50U3RhZ2UiLCAic3Bhd25PcHRpb25zUGx1Z2luIiwgInBpY2siLCAic3VmZml4UGF0aHNQbHVnaW4iLCAiaXNQYXRoU3BlYyIsICJ0b1BhdGhzIiwgInRpbWVvdXRQbHVnaW4iLCAiYmxvY2siLCAid2FpdCIsICJzdG9wIiwgInNpbXBsZUdpdCIsICJiYXNlRGlyIiwgImNyZWF0ZUluc3RhbmNlQ29uZmlnIiwgImFwaS5HaXRDb25zdHJ1Y3RFcnJvciIsICJwYXRoIiwgIm9zIiwgInJlc29sdmUiLCAiaW1wb3J0X29ic2lkaWFuIiwgImZzIiwgImltcG9ydF9vYnNpZGlhbiIsICJmcyIsICJwYXRoIiwgIm9zIiwgImltcG9ydF9vYnNpZGlhbiIsICJyIiwgImIiLCAiX2EiLCAic3RhdCJdCn0K
