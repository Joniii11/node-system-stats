"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.showMemoryUsage =
  exports.avgClockMHz =
  exports.clockMHz =
  exports.totalCores =
  exports.usagePercent =
    void 0;
const os_1 = __importDefault(require("os"));
const utils_1 = require("./utils/utils");
/* PUBLIC */
/**
 * This function measures the CPU usage
 * @param optsInput The options input
 * @returns returns a resolvable promise
 */
function usagePercent(optsInput) {
  return __awaiter(this, void 0, void 0, function* () {
    let opts = {
      coreIndex:
        (optsInput === null || optsInput === void 0
          ? void 0
          : optsInput.coreIndex) || -1,
      sampleMs:
        (optsInput === null || optsInput === void 0
          ? void 0
          : optsInput.sampleMs) || 1000,
    };
    let cpus = os_1.default.cpus();
    //check core exists
    if (
      opts.coreIndex < -1 ||
      opts.coreIndex >= cpus.length ||
      typeof opts.coreIndex !== "number" ||
      Math.abs(opts.coreIndex % 1) !== 0
    ) {
      _error(opts.coreIndex, cpus.length);
    }
    //all cpu's average
    if (opts.coreIndex === -1) {
      return (0, utils_1.measureCPUMulti)(opts);
      //return Promise.resolve(res).then((res) => [ res.percent, res.seconds ] )
      //only one cpu core
    } else {
      return (0, utils_1.measureCPUSingle)(opts);
    }
  });
}
exports.usagePercent = usagePercent;
/**
 * This function shows all Cores that are available in your system
 * @returns The number of total cores in the system.
 */
function totalCores() {
  return os_1.default.cpus().length;
}
exports.totalCores = totalCores;
/**
 * This function returns the speed of all cores or only just the selected core.
 * @param coreIndex The index of the core. It begins with 0. If not specified, it will return an array with all of the cores
 * @returns A number of the speed of the core OR a array with all of the cores speeds.
 */
function clockMHz(coreIndex) {
  let cpus = os_1.default.cpus();
  if (!coreIndex) {
    return cpus.map((cpus) => cpus.speed);
  }
  //check core exists
  if (
    coreIndex < 0 ||
    coreIndex >= cpus.length ||
    typeof coreIndex !== "number" ||
    Math.abs(coreIndex % 1) !== 0
  ) {
    _error(coreIndex, cpus.length);
  }
  return cpus[coreIndex].speed;
}
exports.clockMHz = clockMHz;
/**
 * This function shows the average Clock Frequency from all of the cores.
 * @returns
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
 * @returns {MemoryUsageReturn} An object with every converted redable form.
 */
function showMemoryUsage() {
  const mUV = process.memoryUsage();
  // If somebody finds a better solution of doing this, then please make a PR. Because i don't know any better solution currently.
  return {
    rss: Math.round((mUV.rss / 1024 / 1024) * 100) / 100,
    heapTotal: Math.round((mUV.heapTotal / 1024 / 1024) * 100) / 100,
    heapUsed: Math.round((mUV.heapUsed / 1024 / 1024) * 100) / 100,
    external: Math.round((mUV.external / 1024 / 1024) * 100) / 100,
    arrayBuffers: Math.round((mUV.arrayBuffers / 1024 / 1024) * 100) / 100,
  };
}
exports.showMemoryUsage = showMemoryUsage;
/* PRIVATE */
/**
 * This function thros a new error for the specific error when you specify a higher core count then you have in your system.
 *
 * @PRIVATE This is a private function, that you will never need to call nor use in your Code Base
 * @param coreIndex
 * @param cores
 */
function _error(coreIndex, cores) {
  throw new Error(
    '[cpu-stats] Error: Core "' +
      coreIndex +
      '" not found, use one of ' +
      "[0, " +
      (cores - 1) +
      "], " +
      "since your system has a total of " +
      cores +
      " cores."
  );
}
