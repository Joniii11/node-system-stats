"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentProcessInfo = exports.getProcessById = exports.getTopProcesses = void 0;
const os_1 = __importDefault(require("os"));
const util_1 = require("../utils/util");
/**
 * Gets information about the top processes by CPU or memory usage
 * @param {number} [limit=10] Maximum number of processes to return
 * @param {'cpu'|'memory'} [sortBy='cpu'] Sort processes by CPU or memory usage
 * @returns {Promise<ProcessInfo[]>} Array of process information
 */
async function getTopProcesses(limit = 10, sortBy = 'cpu') {
    try {
        const platform = process.platform;
        const result = [];
        if (platform === 'win32') {
            // Windows implementation
            const command = sortBy === 'cpu'
                ? 'wmic process get ProcessId,Name,WorkingSetSize,UserModeTime,KernelModeTime /format:csv'
                : 'wmic process get ProcessId,Name,WorkingSetSize /format:csv';
            const { stdout } = await (0, util_1.execAsync)(command);
            const lines = stdout.trim().split('\r\n').filter(line => line.length > 0);
            // Skip the header line
            const processes = [];
            const totalMemory = os_1.default.totalmem();
            const numCores = os_1.default.cpus().length;
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
                    const uptime = os_1.default.uptime();
                    const cpuPercent = (totalTime / 10000000) / uptime * 100 / numCores;
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
            const { stdout } = await (0, util_1.execAsync)(command);
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
exports.getTopProcesses = getTopProcesses;
/**
 * Gets information about a specific process by PID
 * @param {number} pid Process ID to get information for
 * @returns {Promise<ProcessInfo | null>} Process information or null if not found
 */
async function getProcessById(pid) {
    try {
        const platform = process.platform;
        if (platform === 'win32') {
            const { stdout } = await (0, util_1.execAsync)(`wmic process where ProcessId=${pid} get ProcessId,Name,WorkingSetSize,UserModeTime,KernelModeTime /format:csv`);
            const lines = stdout.trim().split('\r\n').filter(line => line.length > 0);
            if (lines.length < 2) {
                return null;
            }
            const parts = lines[1].split(',');
            if (parts.length >= 5) {
                const totalMemory = os_1.default.totalmem();
                const name = parts[2];
                const memory = parseInt(parts[3], 10);
                const userTime = parseInt(parts[4], 10);
                const kernelTime = parseInt(parts[5], 10);
                const totalTime = userTime + kernelTime;
                const numCores = os_1.default.cpus().length;
                const uptime = os_1.default.uptime();
                const cpuPercent = (totalTime / 10000000) / uptime * 100 / numCores;
                return {
                    pid,
                    name,
                    cpu: parseFloat(cpuPercent.toFixed(1)),
                    memory,
                    memoryPercent: parseFloat(((memory / totalMemory) * 100).toFixed(1))
                };
            }
        }
        else {
            const { stdout } = await (0, util_1.execAsync)(`ps -p ${pid} -o pid,comm,pcpu,pmem,rss,state`);
            const lines = stdout.trim().split('\n');
            if (lines.length < 2) {
                return null;
            }
            const parts = lines[1].trim().split(/\s+/);
            if (parts.length >= 6) {
                const name = parts[1];
                const cpu = parseFloat(parts[2]);
                const memPercent = parseFloat(parts[3]);
                const memory = parseInt(parts[4], 10) * 1024; // Convert KB to bytes
                const state = parts[5];
                return {
                    pid,
                    name,
                    cpu,
                    memory,
                    memoryPercent: memPercent,
                    state
                };
            }
        }
        return null;
    }
    catch (error) {
        console.error(`Error getting process ${pid}:`, error);
        return null;
    }
}
exports.getProcessById = getProcessById;
/**
 * Gets information about the current Node.js process
 * @returns {Promise<ProcessInfo | null>} Current process information
 */
async function getCurrentProcessInfo() {
    return getProcessById(process.pid);
}
exports.getCurrentProcessInfo = getCurrentProcessInfo;
//# sourceMappingURL=process.js.map