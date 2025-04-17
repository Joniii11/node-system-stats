import { NetworkStats } from '../utils/network-monitor';
/**
 * Interface for network interface information
 */
export interface NetworkInterfaceInfo {
    name: string;
    ip: string;
    mac: string;
    type: string;
    netmask: string;
    internal: boolean;
    operstate?: string;
    mtu?: number;
    speed?: number;
    bytes?: {
        sent: number;
        received: number;
    };
    packets?: {
        sent: number;
        received: number;
    };
}
/**
 * Get network interfaces information
 * @returns Promise resolving to array of network interface information
 */
export declare function getNetworkInterfaces(): Promise<NetworkInterfaceInfo[]>;
/**
 * Start monitoring network traffic
 * @param updateInterval Interval in milliseconds to update stats (default: 1000)
 * @returns Promise resolving when monitoring has started
 */
export declare function startNetworkMonitoring(updateInterval?: number): Promise<void>;
/**
 * Stop network monitoring
 */
export declare function stopNetworkMonitoring(): void;
/**
 * Get current network stats
 * @returns Network statistics array or empty array if monitoring is not active
 */
export declare function getNetworkStats(): NetworkStats[];
/**
 * Get the total bytes sent since monitoring started
 * @returns Number of bytes sent or 0 if monitoring is not active
 */
export declare function getTotalBytesSent(): number;
/**
 * Get the total bytes received since monitoring started
 * @returns Number of bytes received or 0 if monitoring is not active
 */
export declare function getTotalBytesReceived(): number;
/**
 * Get the current upload speed in bytes per second
 * @returns Upload speed in bytes per second or 0 if monitoring is not active
 */
export declare function getUploadSpeed(): number;
/**
 * Get the current download speed in bytes per second
 * @returns Download speed in bytes per second or 0 if monitoring is not active
 */
export declare function getDownloadSpeed(): number;
/**
 * Check if the network connection is active
 * @returns Promise resolving to a boolean indicating if the network is connected
 */
export declare function isNetworkConnected(): Promise<boolean>;
/**
 * Get the primary network interface
 * @returns Promise resolving to the primary network interface or null if none found
 */
export declare function getPrimaryInterface(): Promise<NetworkInterfaceInfo | null>;
/**
 * Get the primary IP address of the system
 * @returns Promise resolving to the primary IP address or null if none found
 */
export declare function getPrimaryIpAddress(): Promise<string | null>;
