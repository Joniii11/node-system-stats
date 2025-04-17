"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemMonitor = void 0;
const events_1 = require("events");
const cpu_1 = require("../modules/cpu");
const memory_1 = require("../modules/memory");
const disk_1 = require("../modules/disk");
const battery_1 = require("../modules/battery");
const process_1 = require("../modules/process");
const cpu_2 = require("../modules/cpu");
/**
 * System monitoring class that collects and tracks system metrics
 * @event 'data' - Emitted when new system data is collected with SystemSnapshot as the payload
 * @event 'error' - Emitted when an error occurs
 */
class SystemMonitor extends events_1.EventEmitter {
    /**
     * Create a new system monitor
     * @param options Configuration options
     */
    constructor(options = {}) {
        super();
        this.snapshots = [];
        this.timer = null;
        this.isRunning = false;
        this.options = {
            interval: options.interval || 5000,
            maxHistory: options.maxHistory || 60
        };
    }
    /**
     * Start monitoring system metrics
     * @param includeProcesses Whether to include process information in snapshots
     * @returns this instance for chaining
     */
    start(includeProcesses = false) {
        if (this.isRunning)
            return this;
        this.isRunning = true;
        // Take initial snapshot
        this.takeSystemSnapshot(includeProcesses);
        // Set up interval for subsequent snapshots
        this.timer = setInterval(() => {
            this.takeSystemSnapshot(includeProcesses);
        }, this.options.interval);
        // Make timer unref to not keep process running just for this interval
        if (this.timer.unref) {
            this.timer.unref();
        }
        return this;
    }
    /**
     * Stop monitoring system metrics
     * @returns this instance for chaining
     */
    stop() {
        if (!this.isRunning)
            return this;
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.isRunning = false;
        return this;
    }
    /**
     * Check if monitoring is currently active
     * @returns Whether monitoring is running
     */
    isActive() {
        return this.isRunning;
    }
    /**
     * Get the most recent system snapshot
     * @returns The latest system snapshot or null if no snapshots exist
     */
    getCurrentSnapshot() {
        return this.snapshots.length > 0 ? this.snapshots[this.snapshots.length - 1] : null;
    }
    /**
     * Get historical snapshots
     * @param limit Maximum number of snapshots to return (from most recent)
     * @returns Array of system snapshots
     */
    getSnapshots(limit) {
        if (limit === undefined) {
            return [...this.snapshots];
        }
        return this.snapshots.slice(-limit);
    }
    /**
     * Clear history data
     * @returns this instance for chaining
     */
    clearHistory() {
        this.snapshots = [];
        return this;
    }
    /**
     * Get CPU usage statistics
     * @returns Object with min, max, and average CPU usage
     */
    getCpuStats() {
        if (this.snapshots.length === 0) {
            return { min: 0, max: 0, avg: 0 };
        }
        const cpuValues = this.snapshots.map(s => s.cpu.usage);
        return {
            min: Math.min(...cpuValues),
            max: Math.max(...cpuValues),
            avg: cpuValues.reduce((sum, val) => sum + val, 0) / cpuValues.length
        };
    }
    /**
     * Get memory usage statistics
     * @returns Object with statistics about memory usage
     */
    getMemoryStats() {
        if (this.snapshots.length === 0) {
            return {
                used: { min: 0, max: 0, avg: 0 },
                free: { min: 0, max: 0, avg: 0 },
                percentUsed: { min: 0, max: 0, avg: 0 }
            };
        }
        const usedValues = this.snapshots.map(s => s.memory.used);
        const freeValues = this.snapshots.map(s => s.memory.free);
        const percentValues = this.snapshots.map(s => s.memory.percentUsed);
        const calcStats = (values) => ({
            min: Math.min(...values),
            max: Math.max(...values),
            avg: values.reduce((sum, val) => sum + val, 0) / values.length
        });
        return {
            used: calcStats(usedValues),
            free: calcStats(freeValues),
            percentUsed: calcStats(percentValues)
        };
    }
    /**
     * Take a snapshot of the current system state
     * @param includeProcesses Whether to include process information
     * @private
     */
    async takeSystemSnapshot(includeProcesses) {
        try {
            const now = Date.now();
            // Get CPU usage
            const cpuUsage = await (0, cpu_1.usagePercent)();
            const loadAverage = (0, cpu_2.getLoadAverage)();
            const temperature = await (0, cpu_2.getCpuTemperature)();
            // Get memory information
            const memInfo = (0, memory_1.getMemoryInfo)();
            const procMemory = process.memoryUsage();
            // Create base snapshot
            const snapshot = {
                timestamp: now,
                cpu: {
                    usage: cpuUsage.percent,
                    loadAverage,
                    temperature
                },
                memory: {
                    total: memInfo.total.bytes,
                    free: memInfo.free.bytes,
                    used: memInfo.used.bytes,
                    percentUsed: memInfo.percentUsed,
                    v8: {
                        rss: Math.round((procMemory.rss / 1024 / 1024) * 100) / 100,
                        heapTotal: Math.round((procMemory.heapTotal / 1024 / 1024) * 100) / 100,
                        heapUsed: Math.round((procMemory.heapUsed / 1024 / 1024) * 100) / 100,
                        external: Math.round((procMemory.external / 1024 / 1024) * 100) / 100,
                        arrayBuffers: Math.round((procMemory.arrayBuffers / 1024 / 1024) * 100) / 100
                    }
                }
            };
            // Get disk information
            try {
                snapshot.disks = await (0, disk_1.getDiskInfo)();
            }
            catch (err) {
                // Disk info is optional, so we can continue without it
            }
            // Get battery information
            try {
                snapshot.battery = await (0, battery_1.getBatteryInfo)();
            }
            catch (err) {
                // Battery info is optional, so we can continue without it
            }
            // Get process information if requested
            if (includeProcesses) {
                try {
                    snapshot.processes = await (0, process_1.getTopProcesses)(10);
                }
                catch (err) {
                    // Process info is optional, so we can continue without it
                }
            }
            // Add to history
            this.snapshots.push(snapshot);
            // Trim history if needed
            while (this.snapshots.length > this.options.maxHistory) {
                this.snapshots.shift();
            }
            // Emit data event with the snapshot
            this.emit('data', snapshot);
        }
        catch (error) {
            this.emit('error', error);
        }
    }
}
exports.SystemMonitor = SystemMonitor;
//# sourceMappingURL=monitor.js.map