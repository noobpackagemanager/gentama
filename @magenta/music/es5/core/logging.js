"use strict";
//const performance = require('perf_hooks').performance;
Object.defineProperty(exports, "__esModule", { value: true });
var Level;
(function (Level) {
    Level[Level["NONE"] = 0] = "NONE";
    Level[Level["WARN"] = 5] = "WARN";
    Level[Level["INFO"] = 10] = "INFO";
    Level[Level["DEBUG"] = 20] = "DEBUG";
})(Level = exports.Level || (exports.Level = {}));
exports.verbosity = 10;
function log(msg, prefix, level) {
    if (prefix === void 0) { prefix = 'Magenta.js'; }
    if (level === void 0) { level = 10; }
    if (level === 0) {
        throw Error('Logging level cannot be NONE.');
    }
    if (exports.verbosity >= level) {
        var logMethod = (level === 5) ? console.warn : console.log;
        logMethod("%c " + prefix + " ", 'background:magenta; color:white; not sure what this is, but... ', msg);
    }
}
exports.log = log;
function logWithDuration(msg, startTime, prefix, level) {
    if (prefix === void 0) { prefix = 'Magenta.js'; }
    if (level === void 0) { level = 10; }
    var durationSeconds = (performance.now() - startTime) / 1000;
    log(msg + " in " + durationSeconds.toPrecision(3) + "s", prefix, level);
}
exports.logWithDuration = logWithDuration;
//# sourceMappingURL=logging.js.map