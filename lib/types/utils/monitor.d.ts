/// <reference types="node" />
import { EventEmitter } from 'events';
import { MonitorOptions, ProcessInfo } from '../types/types';
import { getDiskInfo } from '../modules/disk';
import { getBatteryInfo } from '../modules/battery';
import { getLoadAverage, getCpuTemperature } from '../modules/cpu';
/**
 * Snapshot of system state at a point in time
 */
interface SystemSnapshot {
    timestamp: number;
    cpu: {
        usage: number;
        loadAverage: ReturnType<typeof getLoadAverage>;
        temperature: Awaited<ReturnType<typeof getCpuTemperature>>;
    };
    memory: {
        total: number;
        free: number;
        used: number;
        percentUsed: number;
        v8: {
            rss: number;
            heapTotal: number;
            heapUsed: number;
            external: number;
            arrayBuffers: number;
        };
    };
    disks?: Awaited<ReturnType<typeof getDiskInfo>>;
    battery?: Awaited<ReturnType<typeof getBatteryInfo>>;
    processes?: ProcessInfo[];
}
/**
 * System monitoring class that collects and tracks system metrics
 * @event 'data' - Emitted when new system data is collected with SystemSnapshot as the payload
 * @event 'error' - Emitted when an error occurs
 */
export declare class SystemMonitor extends EventEmitter {
    private options;
    private snapshots;
    private timer;
    private isRunning;
    /**
     * Create a new system monitor
     * @param options Configuration options
     */
    constructor(options?: MonitorOptions);
    /**
     * Start monitoring system metrics
     * @param includeProcesses Whether to include process information in snapshots
     * @returns this instance for chaining
     */
    start(includeProcesses?: boolean): SystemMonitor;
    /**
     * Stop monitoring system metrics
     * @returns this instance for chaining
     */
    stop(): SystemMonitor;
    /**
     * Check if monitoring is currently active
     * @returns Whether monitoring is running
     */
    isActive(): boolean;
    /**
     * Get the most recent system snapshot
     * @returns The latest system snapshot or null if no snapshots exist
     */
    getCurrentSnapshot(): SystemSnapshot | null;
    /**
     * Get historical snapshots
     * @param limit Maximum number of snapshots to return (from most recent)
     * @returns Array of system snapshots
     */
    getSnapshots(limit?: number): SystemSnapshot[];
    /**
     * Clear history data
     * @returns this instance for chaining
     */
    clearHistory(): SystemMonitor;
    /**
     * Get CPU usage statistics
     * @returns Object with min, max, and average CPU usage
     */
    getCpuStats(): {
        min: number;
        max: number;
        avg: number;
    };
    /**
     * Get memory usage statistics
     * @returns Object with statistics about memory usage
     */
    getMemoryStats(): {
        used: {
            min: number;
            max: number;
            avg: number;
        };
        free: {
            min: number;
            max: number;
            avg: number;
        };
        percentUsed: {
            min: number;
            max: number;
            avg: number;
        };
    };
    /**
     * Take a snapshot of the current system state
     * @param includeProcesses Whether to include process information
     * @private
     */
    private takeSystemSnapshot;
}
export {};
