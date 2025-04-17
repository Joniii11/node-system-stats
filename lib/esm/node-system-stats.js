import os from "os";
import { exec } from "child_process";
import { promisify } from "util";
import { measureCPUMulti, measureCPUSingle } from "./utils/utils";
var packageJsonFile = require("../package.json");
const execAsync = promisify(exec);
/* PUBLIC */
/**
 * This function measures the CPU usage
 * @param {IOptsInput} optsInput The options input
 * @returns {Promise<ICallback>} returns a resolvable promise
 */
export async function usagePercent(optsInput) {
    let opts = {
        coreIndex: optsInput?.coreIndex || -1,
        sampleMs: optsInput?.sampleMs || 1000,
    };
    let cpus = os.cpus();
    //check core exists
    if (opts.coreIndex < -1 ||
        opts.coreIndex >= cpus.length ||
        typeof opts.coreIndex !== "number" ||
        Math.abs(opts.coreIndex % 1) !== 0) {
        _error(opts.coreIndex, cpus.length);
    }
    //all cpu's average
    if (opts.coreIndex === -1) {
        return measureCPUMulti(opts);
        //return Promise.resolve(res).then((res) => [ res.percent, res.seconds ] )
        //only one cpu core
    }
    else {
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
export const cpuModel = os.cpus()[0].model;
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
 * @returns {string} The processes title
 */
export const title = process.title;
/**
 * This function returns the speed of all cores or only just the selected core.
 * @param {number} coreIndex The index of the core. It begins with 0. If not specified, it will return an array with all of the cores
 * @returns {number | number[]} A number of the speed of the core OR a array with all of the cores speeds.
 */
export function clockMHz(coreIndex) {
    let cpus = os.cpus();
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
/**
 * This function shows the average Clock Frequency from all of the cores.
 * @returns {number} returns a number with the average Clock MHz over all cores
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
 * @returns {MemoryUsageReturn} An object with every converted memory usage type in redable form.
 */
export function showMemoryUsage() {
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
/**
 * This function is used to display the total memory that the system has. It can output in Gigabyte and Megabyte.
 * @param {boolean?} convertedGB If the returned value should be in Gigabytes or in MB. If set to true, then it will output the Gigabyte value.
 * @default {false} Megabyte format.
 *
 * @returns {number} The converted total Memory that is available.
 */
export function showTotalMemory(convertedGB = false) {
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
export function showFreeMemory(convertedGB = false) {
    // In GB
    if (convertedGB)
        return Math.round(((os.freemem() / 1024 / 1024) * 100) / 100) / 1000;
    // In MB
    return Math.round((os.freemem() / 1024 / 1024) * 100) / 100;
}
;
/**
 * Gets the disk usage information for the specified path or for all mounted file systems
 * @param {string} [pathToCheck=undefined] Specific directory path to check. If not provided, returns all file systems.
 * @returns {Promise<DiskDriveInfo[]>} Array of disk usage information objects
 */
export async function getDiskInfo(pathToCheck) {
    try {
        const isWindows = process.platform === 'win32';
        const result = [];
        if (isWindows) {
            // Windows implementation
            const { stdout } = await execAsync('wmic logicaldisk get DeviceID,FreeSpace,Size /format:csv');
            const lines = stdout.trim().split('\r\n').filter(line => line.length > 0);
            // Skip the header line
            for (let i = 1; i < lines.length; i++) {
                const parts = lines[i].split(',');
                // Format: Node,DeviceID,FreeSpace,Size
                if (parts.length >= 4) {
                    const deviceId = parts[1];
                    const freeSpace = Number(parts[2]);
                    const size = Number(parts[3]);
                    if (size > 0) {
                        const used = size - freeSpace;
                        const percentUsed = Math.round((used / size) * 10000) / 100;
                        result.push({
                            filesystem: deviceId,
                            size: size,
                            used: used,
                            available: freeSpace,
                            percentUsed: percentUsed,
                            mountpoint: deviceId
                        });
                    }
                }
            }
        }
        else {
            // Unix-based OS implementation
            const { stdout } = await execAsync('df -k');
            const lines = stdout.trim().split('\n');
            // Skip the header line
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                const parts = line.split(/\s+/);
                if (parts.length >= 6) {
                    const filesystem = parts[0];
                    const size = parseInt(parts[1], 10) * 1024; // Convert KB to bytes
                    const used = parseInt(parts[2], 10) * 1024;
                    const available = parseInt(parts[3], 10) * 1024;
                    const percentUsed = parseInt(parts[4], 10);
                    const mountpoint = parts[5];
                    // If pathToCheck is specified, only return info for that path
                    if (pathToCheck && !pathToCheck.startsWith(mountpoint)) {
                        continue;
                    }
                    result.push({
                        filesystem,
                        size,
                        used,
                        available,
                        percentUsed,
                        mountpoint
                    });
                }
            }
        }
        // If path is specified and we didn't find a match yet, get the closest mount point
        if (pathToCheck && result.length === 0) {
            const allDrives = await getDiskInfo();
            let bestMatch = null;
            let longestPrefix = 0;
            for (const drive of allDrives) {
                if (pathToCheck.startsWith(drive.mountpoint) && drive.mountpoint.length > longestPrefix) {
                    bestMatch = drive;
                    longestPrefix = drive.mountpoint.length;
                }
            }
            if (bestMatch) {
                return [bestMatch];
            }
        }
        return result;
    }
    catch (error) {
        console.error('Error getting disk information:', error);
        return [];
    }
}
/**
 * Format bytes to a human-readable string with appropriate units
 * @param {number} bytes The number of bytes
 * @param {number} [decimals=2] Number of decimal places to show
 * @returns {string} Human-readable file size string (e.g. '1.5 GB')
 */
export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
/**
 * Gets detailed information about network interfaces
 * @returns {NetworkInterfaceInfo[]} Array of network interface information
 */
export function getNetworkInterfaces() {
    try {
        const networkInterfaces = os.networkInterfaces();
        const result = [];
        // Process each network interface
        for (const [name, interfaces] of Object.entries(networkInterfaces)) {
            if (interfaces) {
                result.push({
                    name,
                    addresses: interfaces.map(iface => ({
                        address: iface.address,
                        netmask: iface.netmask,
                        family: iface.family,
                        mac: iface.mac,
                        internal: iface.internal
                    }))
                });
            }
        }
        return result;
    }
    catch (error) {
        console.error('Error getting network interfaces:', error);
        return [];
    }
}
/**
 * Get system load averages for 1, 5, and 15 minutes
 * @returns {LoadAverageInfo} Object containing load average information
 */
export function getLoadAverage() {
    const [oneMinute, fiveMinutes, fifteenMinutes] = os.loadavg();
    return {
        oneMinute,
        fiveMinutes,
        fifteenMinutes,
        cpuCount: os.cpus().length
    };
}
/**
 * Attempts to get CPU temperature information (platform-dependent)
 * @returns {Promise<CpuTemperature | null>} CPU temperature data or null if unavailable
 */
export async function getCpuTemperature() {
    try {
        const platform = process.platform;
        if (platform === 'linux') {
            // Linux implementation - Read from thermal zones
            try {
                const { stdout } = await execAsync('cat /sys/class/thermal/thermal_zone*/temp');
                const temps = stdout.trim().split('\n').map(t => parseInt(t, 10) / 1000);
                if (temps.length > 0) {
                    return {
                        main: temps[0],
                        cores: temps,
                        max: 100 // Typical max safe temperature
                    };
                }
            }
            catch (err) {
                // Try alternate method with lm-sensors
                try {
                    const { stdout } = await execAsync('sensors -j');
                    const data = JSON.parse(stdout);
                    const temps = [];
                    // Extract CPU temperatures from the sensors output
                    for (const [key, value] of Object.entries(data)) {
                        if (typeof value === 'object' && value !== null && key.includes('core')) {
                            for (const [subKey, subValue] of Object.entries(value)) {
                                if (subKey.includes('temp') && typeof subValue === 'object' && subValue !== null) {
                                    const temp = subValue.input;
                                    if (typeof temp === 'number') {
                                        temps.push(temp);
                                    }
                                }
                            }
                        }
                    }
                    if (temps.length > 0) {
                        return {
                            main: temps.reduce((sum, temp) => sum + temp, 0) / temps.length,
                            cores: temps,
                            max: 100
                        };
                    }
                }
                catch (err) {
                    // Silently fail and return null later
                }
            }
        }
        else if (platform === 'darwin') {
            // macOS implementation
            try {
                const { stdout } = await execAsync('sudo powermetrics --samplers smc -n 1 -i 1');
                const match = stdout.match(/CPU die temperature: (\d+\.\d+) C/);
                if (match && match[1]) {
                    const temp = parseFloat(match[1]);
                    return {
                        main: temp,
                        cores: [temp], // macOS often only provides a single temperature
                        max: 105 // Typical max for Apple CPUs
                    };
                }
            }
            catch (err) {
                // Silently fail and return null later
            }
        }
        else if (platform === 'win32') {
            // Windows implementation using wmic
            try {
                const { stdout } = await execAsync('wmic /namespace:\\\\root\\wmi PATH MSAcpi_ThermalZoneTemperature get CurrentTemperature');
                const lines = stdout.trim().split('\n').slice(1);
                const temps = lines
                    .map(line => line.trim())
                    .filter(line => line.length > 0)
                    .map(line => parseInt(line, 10) / 10 - 273.15); // Convert from deciKelvin to Celsius
                if (temps.length > 0) {
                    return {
                        main: temps[0],
                        cores: temps,
                        max: 100
                    };
                }
            }
            catch (err) {
                // Silently fail and return null later
            }
        }
        return null; // Temperature information not available
    }
    catch (error) {
        console.error('Error getting CPU temperature:', error);
        return null;
    }
}
/**
 * Gets battery information if available
 * @returns {Promise<BatteryInfo | null>} Battery information or null if not available
 */
export async function getBatteryInfo() {
    try {
        const platform = process.platform;
        if (platform === 'darwin') {
            // macOS implementation
            try {
                const { stdout } = await execAsync('pmset -g batt');
                const hasBattery = !stdout.includes('No batteries available');
                if (!hasBattery) {
                    return { hasBattery: false };
                }
                const percentMatch = stdout.match(/(\d+)%/);
                const chargingMatch = stdout.match(/(?:charging|discharging|charged)/i);
                const timeRemainingMatch = stdout.match(/(\d+:\d+) remaining/);
                const percent = percentMatch ? parseInt(percentMatch[1], 10) : undefined;
                const isCharging = chargingMatch ? chargingMatch[0].toLowerCase() !== 'discharging' : undefined;
                let timeRemaining = undefined;
                if (timeRemainingMatch) {
                    const [hours, minutes] = timeRemainingMatch[1].split(':').map(Number);
                    timeRemaining = hours * 60 + minutes;
                }
                return {
                    hasBattery: true,
                    percent,
                    isCharging,
                    timeRemaining
                };
            }
            catch (err) {
                return { hasBattery: false };
            }
        }
        else if (platform === 'linux') {
            // Linux implementation
            try {
                // Check if battery exists
                const { stdout: batteryCheck } = await execAsync('ls /sys/class/power_supply/BAT*');
                const hasBattery = batteryCheck.length > 0;
                if (!hasBattery) {
                    return { hasBattery: false };
                }
                const batteryPath = batteryCheck.trim().split('\n')[0];
                // Get capacity (percent)
                const { stdout: capacityOutput } = await execAsync(`cat ${batteryPath}/capacity`);
                const percent = parseInt(capacityOutput.trim(), 10);
                // Get charging status
                const { stdout: statusOutput } = await execAsync(`cat ${batteryPath}/status`);
                const status = statusOutput.trim();
                const isCharging = status === 'Charging';
                // Try to get time remaining (not always available)
                let timeRemaining = undefined;
                try {
                    const { stdout: energyOutput } = await execAsync(`cat ${batteryPath}/energy_now`);
                    const { stdout: powerOutput } = await execAsync(`cat ${batteryPath}/power_now`);
                    const energyNow = parseInt(energyOutput.trim(), 10);
                    const powerNow = parseInt(powerOutput.trim(), 10);
                    if (powerNow > 0) {
                        timeRemaining = Math.floor((energyNow / powerNow) * 60);
                    }
                }
                catch (err) {
                    // Time remaining calculation failed, continue without it
                }
                return {
                    hasBattery: true,
                    percent,
                    isCharging,
                    timeRemaining
                };
            }
            catch (err) {
                return { hasBattery: false };
            }
        }
        else if (platform === 'win32') {
            // Windows implementation
            try {
                const { stdout } = await execAsync('wmic path Win32_Battery get BatteryStatus, EstimatedChargeRemaining');
                const lines = stdout.trim().split('\n');
                if (lines.length < 2) {
                    return { hasBattery: false };
                }
                const parts = lines[1].trim().split(/\s+/);
                if (parts.length >= 2) {
                    const batteryStatus = parseInt(parts[0], 10);
                    const percent = parseInt(parts[1], 10);
                    // BatteryStatus: 1 = discharging, 2 = AC, 3-10 = charging or other states
                    const isCharging = batteryStatus >= 2;
                    return {
                        hasBattery: true,
                        percent,
                        isCharging
                    };
                }
                return { hasBattery: true };
            }
            catch (err) {
                return { hasBattery: false };
            }
        }
        return { hasBattery: false };
    }
    catch (error) {
        console.error('Error getting battery information:', error);
        return { hasBattery: false };
    }
}
/**
 * Gets information about the top processes by CPU or memory usage
 * @param {number} [limit=10] Maximum number of processes to return
 * @param {'cpu'|'memory'} [sortBy='cpu'] Sort processes by CPU or memory usage
 * @returns {Promise<ProcessInfo[]>} Array of process information
 */
export async function getTopProcesses(limit = 10, sortBy = 'cpu') {
    try {
        const platform = process.platform;
        const result = [];
        if (platform === 'win32') {
            // Windows implementation
            const command = sortBy === 'cpu'
                ? 'wmic process get ProcessId,Name,WorkingSetSize,UserModeTime,KernelModeTime /format:csv'
                : 'wmic process get ProcessId,Name,WorkingSetSize /format:csv';
            const { stdout } = await execAsync(command);
            const lines = stdout.trim().split('\r\n').filter(line => line.length > 0);
            // Skip the header line
            const processes = [];
            const totalMemory = os.totalmem();
            for (let i = 1; i < lines.length; i++) {
                const parts = lines[i].split(',');
                if (sortBy === 'cpu' && parts.length >= 5) {
                    // Format: Node,ProcessId,Name,WorkingSetSize,UserModeTime,KernelModeTime
                    const pid = parseInt(parts[1], 10);
                    const name = parts[2];
                    const memory = parseInt(parts[3], 10);
                    const userTime = parseInt(parts[4], 10);
                    const kernelTime = parseInt(parts[5], 10);
                    const totalTime = userTime + kernelTime;
                    // This isn't a perfect measure of CPU % but gives a relative value
                    const cpuPercent = totalTime / 10000;
                    processes.push({
                        pid,
                        name,
                        cpu: parseFloat(cpuPercent.toFixed(1)),
                        memory,
                        memoryPercent: parseFloat(((memory / totalMemory) * 100).toFixed(1))
                    });
                }
                else if (sortBy === 'memory' && parts.length >= 4) {
                    // Format: Node,ProcessId,Name,WorkingSetSize
                    const pid = parseInt(parts[1], 10);
                    const name = parts[2];
                    const memory = parseInt(parts[3], 10);
                    processes.push({
                        pid,
                        name,
                        cpu: 0, // We don't have CPU info in this query
                        memory,
                        memoryPercent: parseFloat(((memory / totalMemory) * 100).toFixed(1))
                    });
                }
            }
            // Sort and limit results
            processes.sort((a, b) => sortBy === 'cpu' ? b.cpu - a.cpu : b.memory - a.memory);
            return processes.slice(0, limit);
        }
        else {
            // Unix-based systems (Linux, macOS)
            const command = sortBy === 'cpu'
                ? 'ps -ewwo pid,comm,pcpu,pmem,rss,state'
                : 'ps -ewwo pid,comm,pmem,pcpu,rss,state';
            const { stdout } = await execAsync(command);
            const lines = stdout.trim().split('\n');
            // Skip the header line
            const processes = [];
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                const parts = line.split(/\s+/);
                if (parts.length >= 6) {
                    let idx = 0;
                    const pid = parseInt(parts[idx++], 10);
                    const name = parts[idx++];
                    let cpu, mem;
                    if (sortBy === 'cpu') {
                        cpu = parseFloat(parts[idx++]);
                        mem = parseFloat(parts[idx++]);
                    }
                    else {
                        mem = parseFloat(parts[idx++]);
                        cpu = parseFloat(parts[idx++]);
                    }
                    const rss = parseInt(parts[idx++], 10) * 1024; // Convert KB to bytes
                    const state = parts[idx++];
                    processes.push({
                        pid,
                        name,
                        cpu,
                        memory: rss,
                        memoryPercent: mem,
                        state
                    });
                }
            }
            // Sort and limit results
            processes.sort((a, b) => sortBy === 'cpu' ? b.cpu - a.cpu : b.memory - a.memory);
            return processes.slice(0, limit);
        }
    }
    catch (error) {
        console.error('Error getting top processes:', error);
        return [];
    }
}
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
//# sourceMappingURL=node-system-stats.js.map