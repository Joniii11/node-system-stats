import os from "os";

import { measureCPUMulti, measureCPUSingle } from "./utils/utils";
import { IOptsInput, IOptsInternal, clockMHzType, MemoryUsageReturn } from "./types/types";

/* PUBLIC */
/**
 * This function measures the CPU usage
 * @param optsInput The options input
 * @returns returns a resolvable promise
 */
export async function usagePercent(optsInput?: IOptsInput) {
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
 * This function shows all Cores that are available in your system
 * @returns The number of total cores in the system.
 */
export function totalCores() {
  return os.cpus().length;
}

/**
 * This function returns the speed of all cores or only just the selected core.
 * @param coreIndex The index of the core. It begins with 0. If not specified, it will return an array with all of the cores
 * @returns A number of the speed of the core OR a array with all of the cores speeds.
 */
export function clockMHz(coreIndex?: clockMHzType) {
  let cpus = os.cpus();

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

/**
 * This function shows the average Clock Frequency from all of the cores.
 * @returns
 */
export function avgClockMHz() {
  let cpus = os.cpus();
  let totalHz = 0;

  for (let i = 0; i < cpus.length; i++) {
    totalHz += cpus[i].speed;
  }

  let avgHz = totalHz / cpus.length;
  return avgHz;
}

/**
 * Shows the formmated Memory Usage information
 * @returns {MemoryUsageReturn} An object with every converted redable form.
 */
export function showMemoryUsage(): MemoryUsageReturn {
  const mUV = process.memoryUsage();

  // If somebody finds a better solution of doing this, then please make a PR. Because i don't know any better solution currently.
  return {
    rss: Math.round((mUV.rss / 1024 / 1024) * 100) / 100,
    heapTotal: Math.round((mUV.heapTotal / 1024 / 1024) * 100) / 100,
    heapUsed: Math.round((mUV.heapUsed / 1024 / 1024) * 100) / 100,
    external: Math.round((mUV.external / 1024 / 1024) * 100) / 100,
    arrayBuffers: Math.round((mUV.arrayBuffers / 1024 / 1024) * 100) / 100
  } as MemoryUsageReturn;
};

/* PRIVATE */
/**
 * This function thros a new error for the specific error when you specify a higher core count then you have in your system.
 *
 * @PRIVATE This is a private function, that you will never need to call nor use in your Code Base
 * @param coreIndex
 * @param cores
 */
function _error(coreIndex: number, cores: number): Error {
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
