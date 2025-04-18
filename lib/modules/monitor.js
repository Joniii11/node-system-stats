"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemInfoMonitor = exports.NetworkMonitor = exports.SystemMonitor = void 0;
// Re-export monitoring utilities for convenience
var monitor_1 = require("../utils/monitor");
Object.defineProperty(exports, "SystemMonitor", { enumerable: true, get: function () { return monitor_1.SystemMonitor; } });
var network_monitor_1 = require("../utils/network-monitor");
Object.defineProperty(exports, "NetworkMonitor", { enumerable: true, get: function () { return network_monitor_1.NetworkMonitor; } });
const monitor_2 = require("../utils/monitor");
const network_monitor_2 = require("../utils/network-monitor");
const events_1 = __importDefault(require("events"));
const util_1 = require("../utils/util");
/**
 * Comprehensive system monitoring that combines CPU, memory, disk, network, and process monitoring
 * @event 'data' - Emitted when new system data is collected
 * @event 'error' - Emitted when an error occurs
 */
class SystemInfoMonitor extends events_1.default {
    systemMonitor;
    networkMonitor = null;
    options;
    isRunning = false;
    /**
     * Create a new comprehensive system monitor
     * @param options Configuration options
     */
    constructor(options = {}) {
        super();
        this.options = {
            interval: options.interval || 5000,
            maxHistory: options.maxHistory || 60,
            includeNetwork: options.includeNetwork !== undefined ? options.includeNetwork : true,
            includeProcesses: options.includeProcesses !== undefined ? options.includeProcesses : true
        };
        // Create system monitor
        this.systemMonitor = new monitor_2.SystemMonitor({
            interval: this.options.interval,
            maxHistory: this.options.maxHistory
        });
        // Create network monitor if network monitoring is enabled
        if (this.options.includeNetwork) {
            this.networkMonitor = new network_monitor_2.NetworkMonitor(this.options.interval, this.options.maxHistory);
        }
        // Set up event listeners
        this.setupEventListeners();
    }
    /**
     * Start monitoring system metrics
     * @returns this instance for chaining
     */
    start() {
        if (this.isRunning)
            return this;
        this.isRunning = true;
        this.systemMonitor.start(this.options.includeProcesses);
        if (this.networkMonitor) {
            this.networkMonitor.start();
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
        this.systemMonitor.stop();
        if (this.networkMonitor) {
            this.networkMonitor.stop();
        }
        this.isRunning = false;
        return this;
    }
    /**
     * Get the current system state as a formatted object
     * @returns Current system state with formatted values
     */
    getFormattedSystemState() {
        const snapshot = this.systemMonitor.getCurrentSnapshot();
        if (!snapshot) {
            return null;
        }
        let networkInfo = null;
        if (this.networkMonitor) {
            networkInfo = this.networkMonitor.getNetworkTraffic().map(iface => ({
                name: iface.interface,
                download: (0, util_1.formatBytes)(iface.bytesReceivedPerSec) + '/s',
                upload: (0, util_1.formatBytes)(iface.bytesSentPerSec) + '/s',
                totalReceived: (0, util_1.formatBytes)(iface.totalBytesReceived),
                totalSent: (0, util_1.formatBytes)(iface.totalBytesSent)
            }));
        }
        // Format the snapshot data with human-readable values
        return {
            time: new Date(snapshot.timestamp).toISOString(),
            cpu: {
                usage: `${snapshot.cpu.usage.toFixed(1)}%`,
                loadAverage: {
                    oneMinute: snapshot.cpu.loadAverage.oneMinute.toFixed(2),
                    fiveMinutes: snapshot.cpu.loadAverage.fiveMinutes.toFixed(2),
                    fifteenMinutes: snapshot.cpu.loadAverage.fifteenMinutes.toFixed(2)
                },
                temperature: snapshot.cpu.temperature ?
                    `${snapshot.cpu.temperature.main.toFixed(1)}°C` : 'N/A'
            },
            memory: {
                used: (0, util_1.formatBytes)(snapshot.memory.used),
                free: (0, util_1.formatBytes)(snapshot.memory.free),
                total: (0, util_1.formatBytes)(snapshot.memory.total),
                percentUsed: `${snapshot.memory.percentUsed.toFixed(1)}%`,
                v8: {
                    rss: `${snapshot.memory.v8.rss} MB`,
                    heapTotal: `${snapshot.memory.v8.heapTotal} MB`,
                    heapUsed: `${snapshot.memory.v8.heapUsed} MB`
                }
            },
            disks: snapshot.disks?.map(disk => ({
                filesystem: disk.filesystem,
                mountpoint: disk.mountpoint,
                used: (0, util_1.formatBytes)(disk.used),
                available: (0, util_1.formatBytes)(disk.available),
                size: (0, util_1.formatBytes)(disk.size),
                percentUsed: `${disk.percentUsed}%`
            })),
            processes: snapshot.processes?.slice(0, 5).map(proc => ({
                name: proc.name,
                pid: proc.pid,
                cpu: `${proc.cpu.toFixed(1)}%`,
                memory: (0, util_1.formatBytes)(proc.memory),
                memoryPercent: `${proc.memoryPercent.toFixed(1)}%`
            })),
            battery: snapshot.battery?.hasBattery ? {
                percent: `${snapshot.battery.percent}%`,
                isCharging: snapshot.battery.isCharging ? 'Yes' : 'No',
                timeRemaining: snapshot.battery.timeRemaining ?
                    `${Math.floor(snapshot.battery.timeRemaining / 60)}h ${snapshot.battery.timeRemaining % 60}m` : 'N/A'
            } : 'No battery',
            network: networkInfo
        };
    }
    /**
     * Clear history data
     * @returns this instance for chaining
     */
    clearHistory() {
        this.systemMonitor.clearHistory();
        if (this.networkMonitor) {
            this.networkMonitor.clearHistory();
        }
        return this;
    }
    /**
     * Set up event listeners for system and network monitors
     * @private
     */
    setupEventListeners() {
        // Forward system monitor events
        this.systemMonitor.on('data', (data) => {
            this.emit('data', data);
        });
        this.systemMonitor.on('error', (error) => {
            this.emit('error', error);
        });
        // Forward network monitor events if available
        if (this.networkMonitor) {
            this.networkMonitor.on('data', (data) => {
                this.emit('network-data', data);
            });
            this.networkMonitor.on('error', (error) => {
                this.emit('network-error', error);
            });
        }
    }
}
exports.SystemInfoMonitor = SystemInfoMonitor;
//# sourceMappingURL=monitor.js.map