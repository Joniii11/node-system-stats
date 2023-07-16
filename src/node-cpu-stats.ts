import os from "os";

import {
  IOptsInput,
  IOptsInternal,
  ICallback,
  clockMHzType,
} from "./types/types";

/* PUBLIC */
export function usagePercent(cb: ICallback, optsInput?: IOptsInput) {
  let opts: IOptsInternal = {
    coreIndex: optsInput?.coreIndex || -1,
    sampleMs: optsInput?.sampleMs || 1000,
  };

  const factor = Math.pow(10, 2);

  let timeUsed: number;
  var timeUsed0 = 0;
  var timeUsed1 = 0;

  var timeIdle: number;
  var timeIdle0 = 0;
  var timeIdle1 = 0;

  let cpus = os.cpus();
  let cpu1: os.CpuInfo[];
  let cpu0: os.CpuInfo[];

  let time: [number, number];

  //opts is optional
  if (typeof opts === "function") {
    cb = opts;
    opts = {
      coreIndex: -1,
      sampleMs: 1000,
    };
  } else {
    opts.coreIndex = opts.coreIndex || -1;
    opts.sampleMs = opts.sampleMs || 1000;
  }

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
    //take first measurement
    cpu0 = os.cpus();
    time = process.hrtime();

    setTimeout(function () {
      //take second measurement
      cpu1 = os.cpus();

      var diff = process.hrtime(time);
      var diffSeconds = diff[0] + diff[1] * 1e-9;

      //do the number crunching below and return
      for (var i = 0; i < cpu1.length; i++) {
        timeUsed1 += cpu1[i].times.user;
        timeUsed1 += cpu1[i].times.nice;
        timeUsed1 += cpu1[i].times.sys;
        timeIdle1 += cpu1[i].times.idle;
      }

      for (i = 0; i < cpu0.length; i++) {
        timeUsed0 += cpu0[i].times.user;
        timeUsed0 += cpu0[i].times.nice;
        timeUsed0 += cpu0[i].times.sys;
        timeIdle0 += cpu0[i].times.idle;
      }

      timeUsed = timeUsed1 - timeUsed0;
      timeIdle = timeIdle1 - timeIdle0;

      var percent = (timeUsed / (timeUsed + timeIdle)) * 100;

      return cb(_roundTo(percent, 3), Math.floor(diffSeconds));
    }, opts.sampleMs);

    //only one cpu core
  } else {
    //take first measurement
    cpu0 = os.cpus();
    time = process.hrtime();

    setTimeout(function () {
      //take second measurement
      cpu1 = os.cpus();

      var diff = process.hrtime(time);
      var diffSeconds = diff[0] + diff[1] * 1e-9;

      //do the number crunching below and return
      timeUsed1 += cpu1[opts.coreIndex].times.user;
      timeUsed1 += cpu1[opts.coreIndex].times.nice;
      timeUsed1 += cpu1[opts.coreIndex].times.sys;
      timeIdle1 += cpu1[opts.coreIndex].times.idle;

      timeUsed0 += cpu0[opts.coreIndex].times.user;
      timeUsed0 += cpu0[opts.coreIndex].times.nice;
      timeUsed0 += cpu0[opts.coreIndex].times.sys;
      timeIdle0 += cpu0[opts.coreIndex].times.idle;

      var timeUsed = timeUsed1 - timeUsed0;
      var timeIdle = timeIdle1 - timeIdle0;

      var percent = (timeUsed / (timeUsed + timeIdle)) * 100;

      return cb(_roundTo(percent, 3), Math.floor(diffSeconds));
    }, opts.sampleMs);
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
  var cpus = os.cpus();

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
  var cpus = os.cpus();
  var totalHz = 0;

  for (let i = 0; i < cpus.length; i++) {
    totalHz += cpus[i].speed;
  }

  var avgHz = totalHz / cpus.length;
  return avgHz;
}

/**
 * Shows the formmated Memory Usage information
 * @returns
 */
export function showMemoryUsage(): string {
  return `${
    Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100
  } MB`;
}

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

/**
 * This function rounds the number from the percentage of the cores into a 3 digit number e.g. 3,25
 *
 * @PRIVATE This is a private function, that you will never need to call nor use in your Code Base
 * @param n
 * @param digits
 * @returns
 */
function _roundTo(n: number, digits: number) {
  var negative = false;
  if (digits === undefined) {
    digits = 0;
  }
  if (n < 0) {
    negative = true;
    n = n * -1;
  }
  var multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  n = parseFloat((Math.round(n) / multiplicator).toFixed(digits));
  if (negative) {
    n = parseFloat((n * -1).toFixed(digits));
  }
  return n;
}
