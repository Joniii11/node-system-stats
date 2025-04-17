"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCpuTemperature = exports.avgClockMHz = exports.clockMHz = exports.getLoadAverage = exports.usagePercent = exports.cpuModel = exports.totalCores = void 0;
const os_1 = __importDefault(require("os"));
const util_1 = require("../utils/util");
/**
 * Total number of CPU cores
 */
exports.totalCores = os_1.default.cpus().length;
/**
 * CPU model name
 */
exports.cpuModel = os_1.default.cpus()[0]?.model || 'Unknown';
/**
 * Get CPU usage percentage
 * @param options Optional configuration
 * @returns Promise resolving to CPU usage percentage
 */
function usagePercent(options) {
    return new Promise((resolve, reject) => {
        const opts = {
            coreIndex: options?.coreIndex ?? -1,
            sampleMs: options?.sampleMs ?? 1000,
        };
        // Validate core index
        if (opts.coreIndex >= exports.totalCores) {
            return reject((0, util_1.createCoreError)(opts.coreIndex, exports.totalCores));
        }
        try {
            const startMeasure = cpuAverage(opts.coreIndex);
            // Set delay to calculate usage
            setTimeout(() => {
                const endMeasure = cpuAverage(opts.coreIndex);
                // Calculate the difference in idle and total time between the measurements
                const idleDifference = endMeasure.idle - startMeasure.idle;
                const totalDifference = endMeasure.total - startMeasure.total;
                // Calculate the average percentage CPU usage
                const percentageCpu = 100 - ~~(100 * idleDifference / totalDifference);
                resolve({
                    percent: percentageCpu,
                    seconds: opts.sampleMs / 1000
                });
            }, opts.sampleMs);
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.usagePercent = usagePercent;
/**
 * Get CPU load average
 * @returns Load average information
 */
function getLoadAverage() {
    const [oneMinute, fiveMinutes, fifteenMinutes] = os_1.default.loadavg();
    return {
        oneMinute,
        fiveMinutes,
        fifteenMinutes,
        cpuCount: exports.totalCores
    };
}
exports.getLoadAverage = getLoadAverage;
/**
 * Get CPU clock speed for all or a specific CPU core
 * @param coreIndex Optional core index (default: all cores)
 * @returns CPU clock speed in MHz (average if no core specified)
 */
function clockMHz(coreIndex) {
    const cpus = os_1.default.cpus();
    if (coreIndex !== undefined) {
        if (coreIndex >= exports.totalCores) {
            throw (0, util_1.createCoreError)(coreIndex, exports.totalCores);
        }
        return cpus[coreIndex].speed;
    }
    return cpus.map(cpu => cpu.speed);
}
exports.clockMHz = clockMHz;
/**
 * Get average clock speed across all CPU cores
 * @returns Average clock speed in MHz
 */
function avgClockMHz() {
    const cpus = os_1.default.cpus();
    const totalSpeed = cpus.reduce((acc, cpu) => acc + cpu.speed, 0);
    return totalSpeed / cpus.length;
}
exports.avgClockMHz = avgClockMHz;
/**
 * Get CPU temperature (if available)
 * @returns Promise resolving to CPU temperature information or null if not available
 */
async function getCpuTemperature() {
    try {
        const platform = process.platform;
        if (platform === 'linux') {
            // Linux implementation
            try {
                const { stdout: thermFileName } = await (0, util_1.execAsync)('find /sys/class/thermal -name "thermal_zone*" | head -n 1');
                if (!thermFileName.trim()) {
                    return null;
                }
                const basePath = thermFileName.trim();
                const { stdout: tempStr } = await (0, util_1.execAsync)(`cat ${basePath}/temp`);
                const { stdout: typeStr } = await (0, util_1.execAsync)(`cat ${basePath}/type`);
                // Convert millidegrees to degrees
                const temp = parseInt(tempStr.trim(), 10) / 1000;
                // Try to get multiple core temperatures
                let coreTemps = [];
                try {
                    // Try to find core temp sensors
                    const { stdout: sensorPaths } = await (0, util_1.execAsync)('find /sys/class/hwmon -name "hwmon*" | head -n 1');
                    if (sensorPaths.trim()) {
                        const sensorPath = sensorPaths.trim();
                        // Try to read multiple core temps
                        for (let i = 1; i <= exports.totalCores; i++) {
                            try {
                                const { stdout: coreTempStr } = await (0, util_1.execAsync)(`cat ${sensorPath}/temp${i}_input 2>/dev/null || echo 0`);
                                if (coreTempStr.trim() !== '0') {
                                    coreTemps.push(parseInt(coreTempStr.trim(), 10) / 1000);
                                }
                            }
                            catch (err) {
                                // Skip this core if we can't read it
                            }
                        }
                    }
                }
                catch (err) {
                    // Fall back to main temperature for all cores
                    coreTemps = Array(exports.totalCores).fill(temp);
                }
                // If we couldn't get core temps, fill with main temp
                if (coreTemps.length === 0) {
                    coreTemps = Array(exports.totalCores).fill(temp);
                }
                return {
                    main: temp,
                    cores: coreTemps
                };
            }
            catch (err) {
                return null;
            }
        }
        else if (platform === 'darwin') {
            // macOS implementation using smc
            try {
                const { stdout } = await (0, util_1.execAsync)('which smc >/dev/null 2>&1 && smc -k TC0P -r | cut -d " " -f 4');
                if (!stdout.trim()) {
                    return null;
                }
                // Parse the temperature from hex string
                const temp = parseInt(stdout.trim().replace(/[^0-9A-Fa-f]/g, ''), 16) / 100;
                // Try to get core temps
                const coreTemps = [];
                for (let i = 0; i < exports.totalCores && i < 8; i++) {
                    try {
                        const { stdout: coreTempStr } = await (0, util_1.execAsync)(`smc -k TC${i}C -r | cut -d " " -f 4`);
                        if (coreTempStr.trim()) {
                            const coreTemp = parseInt(coreTempStr.trim().replace(/[^0-9A-Fa-f]/g, ''), 16) / 100;
                            coreTemps.push(coreTemp);
                        }
                    }
                    catch (err) {
                        // Skip this core if we can't read it
                    }
                }
                // If we couldn't get core temps, fill with main temp
                if (coreTemps.length === 0) {
                    for (let i = 0; i < exports.totalCores; i++) {
                        coreTemps.push(temp);
                    }
                }
                return {
                    main: temp,
                    cores: coreTemps
                };
            }
            catch (err) {
                return null;
            }
        }
        else if (platform === 'win32') {
            // Windows implementation using wmic
            try {
                const { stdout } = await (0, util_1.execAsync)('wmic /namespace:\\\\root\\wmi PATH MSAcpi_ThermalZoneTemperature get CurrentTemperature');
                const lines = stdout.trim().split('\n').filter(line => line.trim() !== 'CurrentTemperature');
                if (lines.length === 0) {
                    return null;
                }
                // Parse the temperature (in Kelvin * 10) to Celsius
                const tempKelvin = parseInt(lines[0].trim(), 10);
                const tempCelsius = tempKelvin / 10 - 273.15;
                // Windows doesn't easily provide per-core temps
                const coreTemps = Array(exports.totalCores).fill(tempCelsius);
                return {
                    main: tempCelsius,
                    cores: coreTemps
                };
            }
            catch (err) {
                return null;
            }
        }
        return null;
    }
    catch (error) {
        console.error('Error getting CPU temperature:', error);
        return null;
    }
}
exports.getCpuTemperature = getCpuTemperature;
/**
 * Calculate the average CPU usage across all cores or for a specific core
 * @param coreIndex Optional core index (default: all cores)
 * @returns Object with idle and total CPU time
 * @private
 */
function cpuAverage(coreIndex = -1) {
    const cpus = os_1.default.cpus();
    if (coreIndex >= 0) {
        if (coreIndex >= cpus.length) {
            throw (0, util_1.createCoreError)(coreIndex, cpus.length);
        }
        const cpu = cpus[coreIndex];
        const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);
        return {
            idle: cpu.times.idle,
            total,
        };
    }
    else {
        // Calculate the average of all cores
        let totalIdle = 0;
        let totalTick = 0;
        for (const cpu of cpus) {
            for (const type in cpu.times) {
                totalTick += cpu.times[type];
            }
            totalIdle += cpu.times.idle;
        }
        return {
            idle: totalIdle,
            total: totalTick,
        };
    }
}
//# sourceMappingURL=cpu.js.map