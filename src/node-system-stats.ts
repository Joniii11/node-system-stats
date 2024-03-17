import os from "os";
import { measureCPUMulti, measureCPUSingle } from "./utils/utils";
var packageJsonFile: pJSON = require("../package.json");
import {
  IOptsInput,
  ICallback,
  IOptsInternal,
  MemoryUsageReturn,
  pJSON,
} from "./types/types";

/* PUBLIC */
/**
 * This function measures the CPU usage
 * @param {IOptsInput} optsInput The options input
 * @returns {Promise<ICallback>} returns a resolvable promise
 */
export async function usagePercent(optsInput?: IOptsInput): Promise<ICallback> {
  let opts: IOptsInternal = {
    coreIndex: optsInput?.coreIndex || -1,
    sampleMs: optsInput?.sampleMs || 1000,
  };

  let cpus = os.cpus();

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
    return measureCPUMulti(opts);
    //return Promise.resolve(res).then((res) => [ res.percent, res.seconds ] )

    //only one cpu core
  } else {
    return measureCPUSingle(opts);
  }
}

/**
 * @returns {number} The number of total cores in the system.
 */
export const totalCores = os.cpus().length;

/**
 * @returns {string} The name of the cpu in your system.
 */
export const cpuModel = os.cpus()[0]!.model;

/**
 * @returns {string} Returns the current version of the package
 */
export const version = packageJsonFile.version;

/**
 * @returns {string} Returns the name of the package
 */
export const name = packageJsonFile.name;

/**
 * @returns {string} Returns the processes platform
 */
export const platform = process.platform;

/**
 * @returns {number} The processes PID
 */
export const PID = process.pid;

/**
 * This function returns the speed of all cores or only just the selected core.
 * @param {number} coreIndex The index of the core. It begins with 0. If not specified, it will return an array with all of the cores
 * @returns {number | number[]} A number of the speed of the core OR a array with all of the cores speeds.
 */
export function clockMHz(coreIndex?: number): number | number[] {
  let cpus = os.cpus();

  if (!coreIndex) {
    return cpus.map((cpus) => cpus.speed);
  }

  //check core exists
  if (
    coreIndex < 0 ||
    coreIndex >= cpus.length ||
    Math.abs(coreIndex % 1) !== 0
  ) {
    _error(coreIndex, cpus.length);
  }

  if (typeof coreIndex !== "number") {
    throw new Error("[node-system-stats] coreIndex must be a number.");
  };

  return cpus[coreIndex]!.speed;
}

/**
 * This function shows the average Clock Frequency from all of the cores.
 * @returns {number} returns a number with the average Clock MHz over all cores
 */
export function avgClockMHz(): number {
  let cpus = os.cpus();
  let totalHz = 0;

  for (let i = 0; i < cpus.length; i++) {
    totalHz += cpus[i]!.speed;
  }

  let avgHz = totalHz / cpus.length;
  return avgHz;
}

/**
 * Shows the formmated Memory Usage information
 * @returns {MemoryUsageReturn} An object with every converted memory usage type in redable form.
 */
export function showMemoryUsage(): MemoryUsageReturn {
  // Initializing variables
  const mUV = process.memoryUsage();
  const dataKeys = [
    "rss",
    "heapTotal",
    "heapUsed",
    "external",
    "arrayBuffers",
  ] as const;

  // Using reduce to "map" out the memory usage.
  return dataKeys.reduce((acc, cur) => {
    acc[cur] = Math.round((mUV[cur] / 1024 / 1024) * 100) / 100;
    return acc;
  }, {} as MemoryUsageReturn);
}

/**
 * This function is used to display the total memory that the system has. It can output in Gigabyte and Megabyte.
 * @param {boolean?} convertedGB If the returned value should be in Gigabytes or in MB. If set to true, then it will output the Gigabyte value.
 * @default {false} Megabyte format.
 *
 * @returns {number} The converted total Memory that is available.
 */
export function showTotalMemory(convertedGB: boolean = false): number {
  // In GB
  if (convertedGB)
    return Math.round(((os.totalmem() / 1024 / 1024) * 100) / 100) / 1000;

  // In MB
  return Math.round((os.totalmem() / 1024 / 1024) * 100) / 100;
}

/**
 * This function is used to display the free memory that the system has. It can output in Gigabyte and Megabyte.
 * @param {boolean?} convertedGB If the returned value should be in Gigabytes or in MB. If set to true, then it will output the Gigabyte value.
 * @default {false} Megabyte format.
 *
 * @returns {number} The converted free Memory that is available.
 */
export function showFreeMemory(convertedGB: boolean = false): number {
  // In GB
  if (convertedGB)
    return Math.round(((os.freemem() / 1024 / 1024) * 100) / 100) / 1000;

  // In MB
  return Math.round((os.freemem() / 1024 / 1024) * 100) / 100;
};

/* PRIVATE */
/**
 * This function thros a new error for the specific error when you specify a higher core count then you have in your system.
 *
 * @PRIVATE This is a private function, that you will never need to call nor use in your Code Base
 * @param {number} coreIndex
 * @param {number} cores
 * @returns {Error} A throwable new Error
 */
function _error(coreIndex: number, cores: number): Error {
  throw new Error(
    `[node-system-stats] Error: Core ${coreIndex} not found. Use on of these cores [0, ${
      cores - 1
    }], since your system has a total of ${cores} cores.`
  );
}
