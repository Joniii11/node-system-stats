/// <reference types="node" />
export { SystemMonitor } from '../utils/monitor';
export { NetworkMonitor } from '../utils/network-monitor';
import EventEmitter from 'events';
/**
 * Comprehensive system monitoring that combines CPU, memory, disk, network, and process monitoring
 * @event 'data' - Emitted when new system data is collected
 * @event 'error' - Emitted when an error occurs
 */
export declare class SystemInfoMonitor extends EventEmitter {
    private systemMonitor;
    private networkMonitor;
    private options;
    private isRunning;
    /**
     * Create a new comprehensive system monitor
     * @param options Configuration options
     */
    constructor(options?: {
        interval?: number;
        maxHistory?: number;
        includeNetwork?: boolean;
        includeProcesses?: boolean;
    });
    /**
     * Start monitoring system metrics
     * @returns this instance for chaining
     */
    start(): SystemInfoMonitor;
    /**
     * Stop monitoring system metrics
     * @returns this instance for chaining
     */
    stop(): SystemInfoMonitor;
    /**
     * Get the current system state as a formatted object
     * @returns Current system state with formatted values
     */
    getFormattedSystemState(): {
        time: string;
        cpu: {
            usage: string;
            loadAverage: {
                oneMinute: string;
                fiveMinutes: string;
                fifteenMinutes: string;
            };
            temperature: string;
        };
        memory: {
            used: string;
            free: string;
            total: string;
            percentUsed: string;
            v8: {
                rss: string;
                heapTotal: string;
                heapUsed: string;
            };
        };
        disks: {
            filesystem: string;
            mountpoint: string;
            used: string;
            available: string;
            size: string;
            percentUsed: string;
        }[] | undefined;
        processes: {
            name: string;
            pid: number;
            cpu: string;
            memory: string;
            memoryPercent: string;
        }[] | undefined;
        battery: string | {
            percent: string;
            isCharging: string;
            timeRemaining: string;
        };
        network: {
            name: string;
            download: string;
            upload: string;
            totalReceived: string;
            totalSent: string;
        }[] | null;
    } | null;
    /**
     * Clear history data
     * @returns this instance for chaining
     */
    clearHistory(): SystemInfoMonitor;
    /**
     * Set up event listeners for system and network monitors
     * @private
     */
    private setupEventListeners;
}
