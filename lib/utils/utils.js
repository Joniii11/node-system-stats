"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.measureCPUSingle = exports.measureCPUMulti = void 0;
const os_1 = __importDefault(require("os"));
async function measureCPUMulti(opts) {
    return new Promise((resolve) => {
        let cpu0 = os_1.default.cpus();
        let cpu1;
        let timeUsed;
        let timeUsed0 = 0;
        let timeUsed1 = 0;
        let timeIdle;
        let timeIdle0 = 0;
        let timeIdle1 = 0;
        let time = process.hrtime();
        // take first measurement
        cpu0 = os_1.default.cpus();
        time = process.hrtime();
        setTimeout(() => {
            // take second measurement
            cpu1 = os_1.default.cpus();
            let diff = process.hrtime(time);
            let diffSeconds = diff[0] + diff[1] * 1e-9;
            // do the number crunching below and resolve the promise with the result
            for (let i = 0; i < cpu1.length; i++) {
                timeUsed1 += cpu1[i].times.user;
                timeUsed1 += cpu1[i].times.nice;
                timeUsed1 += cpu1[i].times.sys;
                timeIdle1 += cpu1[i].times.idle;
            }
            for (let i = 0; i < cpu0.length; i++) {
                timeUsed0 += cpu0[i].times.user;
                timeUsed0 += cpu0[i].times.nice;
                timeUsed0 += cpu0[i].times.sys;
                timeIdle0 += cpu0[i].times.idle;
            }
            timeUsed = timeUsed1 - timeUsed0;
            timeIdle = timeIdle1 - timeIdle0;
            let percent = (timeUsed / (timeUsed + timeIdle)) * 100;
            resolve({
                percent: _roundTo(percent, 2),
                seconds: Math.floor(diffSeconds)
            });
        }, opts.sampleMs);
    });
}
exports.measureCPUMulti = measureCPUMulti;
async function measureCPUSingle(opts) {
    return new Promise((resolve) => {
        let cpu0 = os_1.default.cpus();
        let cpu1;
        let timeUsed0 = 0;
        let timeUsed1 = 0;
        let timeIdle0 = 0;
        let timeIdle1 = 0;
        let time = process.hrtime();
        // take first measurement
        cpu0 = os_1.default.cpus();
        time = process.hrtime();
        setTimeout(function () {
            // take second measurement
            cpu1 = os_1.default.cpus();
            let diff = process.hrtime(time);
            let diffSeconds = diff[0] + diff[1] * 1e-9;
            //do the number crunching below and return
            timeUsed1 += cpu1[opts.coreIndex].times.user;
            timeUsed1 += cpu1[opts.coreIndex].times.nice;
            timeUsed1 += cpu1[opts.coreIndex].times.sys;
            timeIdle1 += cpu1[opts.coreIndex].times.idle;
            timeUsed0 += cpu0[opts.coreIndex].times.user;
            timeUsed0 += cpu0[opts.coreIndex].times.nice;
            timeUsed0 += cpu0[opts.coreIndex].times.sys;
            timeIdle0 += cpu0[opts.coreIndex].times.idle;
            let timeUsed = timeUsed1 - timeUsed0;
            let timeIdle = timeIdle1 - timeIdle0;
            let percent = (timeUsed / (timeUsed + timeIdle)) * 100;
            resolve({
                percent: _roundTo(percent, 2),
                seconds: Math.floor(diffSeconds)
            });
        }, opts.sampleMs);
    });
}
exports.measureCPUSingle = measureCPUSingle;
/**
 * This function rounds the number from the percentage of the cores into a 3 digit number e.g. 3,25
 *
 * @PRIVATE This is a private function, that you will never need to call nor use in your Code Base
 * @param n
 * @param digits
 * @returns
 */
function _roundTo(n, digits) {
    let negative = false;
    if (digits === undefined) {
        digits = 0;
    }
    if (n < 0) {
        negative = true;
        n = n * -1;
    }
    let multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = parseFloat((Math.round(n) / multiplicator).toFixed(digits));
    if (negative) {
        n = parseFloat((n * -1).toFixed(digits));
    }
    return n;
}
//# sourceMappingURL=utils.js.map