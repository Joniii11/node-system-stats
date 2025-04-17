/// <reference types="node" />
import { EventEmitter } from 'events';
export interface NetworkStats {
    interface: string;
    bytesReceivedPerSec: number;
    bytesSentPerSec: number;
    totalBytesReceived: number;
    totalBytesSent: number;
}
/**
 * Class for monitoring network traffic across interfaces
 * @event data - Emitted when new network data is collected with NetworkStats[] as the payload
 * @event error - Emitted when an error occurs
 */
export declare class NetworkMonitor extends EventEmitter {
    private interval;
    private maxHistory;
    private timer;
    private interfaceData;
    private lastCheck;
    private isRunning;
    /**
     * Create a new NetworkMonitor
     * @param interval Milliseconds between checks (default: 1000)
     * @param maxHistory Maximum history points to keep (default: 60)
     */
    constructor(interval?: number, maxHistory?: number);
    /**
     * Start monitoring network interfaces
     */
    start(): void;
    /**
     * Stop monitoring network interfaces
     */
    stop(): void;
    /**
     * Get the current network traffic statistics
     * @returns Array of network interface stats
     */
    getNetworkTraffic(): NetworkStats[];
    /**
     * Get the total bytes sent since monitoring started
     * @returns Number of bytes sent across all interfaces
     */
    getTotalBytesSent(): number;
    /**
     * Get the total bytes received since monitoring started
     * @returns Number of bytes received across all interfaces
     */
    getTotalBytesReceived(): number;
    /**
     * Get the current upload speed in bytes per second
     * @returns Upload speed in bytes per second
     */
    getUploadSpeed(): number;
    /**
     * Get the current download speed in bytes per second
     * @returns Download speed in bytes per second
     */
    getDownloadSpeed(): number;
    /**
     * Get stats for all network interfaces
     * @returns Array of NetworkStats or null if monitoring is not active
     */
    getStats(): NetworkStats[];
    /**
     * Get historical network traffic data
     * @returns Object with interface histories
     */
    getHistory(): Record<string, {
        timestamps: number[];
        received: number[];
        sent: number[];
    }>;
    /**
     * Clear collected history data
     */
    clearHistory(): void;
    /**
     * Initialize network interfaces data
     * @private
     */
    private initializeInterfaces;
    /**
     * Check current network usage
     * @param emitEvent Whether to emit the 'data' event
     * @private
     */
    private checkNetworkUsage;
}
