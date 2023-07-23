"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showTotalMemory = exports.showMemoryUsage = exports.avgClockMHz = exports.clockMHz = exports.version = exports.cpuModel = exports.totalCores = exports.usagePercent = void 0;
const os_1 = __importDefault(require("os"));
const utils_1 = require("./utils/utils");
var packageJsonFile = require("../package.json");
/* PUBLIC */
/**
 * This function measures the CPU usage
 * @param {IOptsInput} optsInput The options input
 * @returns {Promise<ICallback>} returns a resolvable promise
 */
async function usagePercent(optsInput) {
    let opts = {
        coreIndex: optsInput?.coreIndex || -1,
        sampleMs: optsInput?.sampleMs || 1000,
    };
    let cpus = os_1.default.cpus();
    //check core exists
    if (opts.coreIndex < -1 ||
        opts.coreIndex >= cpus.length ||
        typeof opts.coreIndex !== "number" ||
        Math.abs(opts.coreIndex % 1) !== 0) {
        _error(opts.coreIndex, cpus.length);
    }
    //all cpu's average
    if (opts.coreIndex === -1) {
        return (0, utils_1.measureCPUMulti)(opts);
        //return Promise.resolve(res).then((res) => [ res.percent, res.seconds ] )
        //only one cpu core
    }
    else {
        return (0, utils_1.measureCPUSingle)(opts);
    }
}
exports.usagePercent = usagePercent;
/**
 * @returns {number} The number of total cores in the system.
 */
exports.totalCores = os_1.default.cpus().length;
/**
 * @returns {string} The name of the cpu in your system.
 */
exports.cpuModel = os_1.default.cpus()[0].model;
/**
 * @returns {string} Returns the current version of the package
 */
exports.version = packageJsonFile.version;
/**
 * This function returns the speed of all cores or only just the selected core.
 * @param {number} coreIndex The index of the core. It begins with 0. If not specified, it will return an array with all of the cores
 * @returns {number | number[]} A number of the speed of the core OR a array with all of the cores speeds.
 */
function clockMHz(coreIndex) {
    let cpus = os_1.default.cpus();
    if (!coreIndex) {
        return cpus.map((cpus) => cpus.speed);
    }
    //check core exists
    if (coreIndex < 0 ||
        coreIndex >= cpus.length ||
        Math.abs(coreIndex % 1) !== 0) {
        _error(coreIndex, cpus.length);
    }
    if (typeof coreIndex !== "number") {
        throw new Error("[node-system-stats] coreIndex must be a number.");
    }
    ;
    return cpus[coreIndex].speed;
}
exports.clockMHz = clockMHz;
/**
 * This function shows the average Clock Frequency from all of the cores.
 * @returns {number} returns a number with the average Clock MHz over all cores
 */
function avgClockMHz() {
    let cpus = os_1.default.cpus();
    let totalHz = 0;
    for (let i = 0; i < cpus.length; i++) {
        totalHz += cpus[i].speed;
    }
    let avgHz = totalHz / cpus.length;
    return avgHz;
}
exports.avgClockMHz = avgClockMHz;
/**
 * Shows the formmated Memory Usage information
 * @returns {MemoryUsageReturn} An object with every converted memory usage type in redable form.
 */
function showMemoryUsage() {
    // Initializing variables
    const mUV = process.memoryUsage();
    const dataKeys = [
        "rss",
        "heapTotal",
        "heapUsed",
        "external",
        "arrayBuffers",
    ];
    // Using reduce to "map" out the memory usage.
    return dataKeys.reduce((acc, cur) => {
        acc[cur] = Math.round((mUV[cur] / 1024 / 1024) * 100) / 100;
        return acc;
    }, {});
}
exports.showMemoryUsage = showMemoryUsage;
/**
 * This function is used to display the total memory that the system has. It can output in Gigabyte and Megabyte.
 * @param {boolean?} convertedGB If the returned value should be in Gigabytes or in MB. If set to true, then it will output the Gigabyte value.
 * @default {false} Megabyte format.
 *
 * @returns {number} The converted total Memory that is available.
 */
function showTotalMemory(convertedGB = false) {
    // In GB
    if (convertedGB)
        return Math.round(((os_1.default.totalmem() / 1024 / 1024) * 100) / 100) / 1000;
    // In MB
    return Math.round((os_1.default.totalmem() / 1024 / 1024) * 100) / 100;
}
exports.showTotalMemory = showTotalMemory;
/* PRIVATE */
/**
 * This function thros a new error for the specific error when you specify a higher core count then you have in your system.
 *
 * @PRIVATE This is a private function, that you will never need to call nor use in your Code Base
 * @param {number} coreIndex
 * @param {number} cores
 * @returns {Error} A throwable new Error
 */
function _error(coreIndex, cores) {
    throw new Error(`[node-system-stats] Error: Core ${coreIndex} not found. Use on of these cores [0, ${cores - 1}], since your system has a total of ${cores} cores.`);
}
