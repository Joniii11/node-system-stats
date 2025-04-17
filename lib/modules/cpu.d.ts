import { IOptsInput, ICallback, CpuTemperature } from '../types/types';
/**
 * Total number of CPU cores
 */
export declare const totalCores: number;
/**
 * CPU model name
 */
export declare const cpuModel: string;
/**
 * Get CPU usage percentage
 * @param options Optional configuration
 * @returns Promise resolving to CPU usage percentage
 */
export declare function usagePercent(options?: IOptsInput): Promise<ICallback>;
/**
 * Get CPU load average
 * @returns Load average information
 */
export declare function getLoadAverage(): {
    oneMinute: number;
    fiveMinutes: number;
    fifteenMinutes: number;
    cpuCount: number;
};
/**
 * Get CPU clock speed for all or a specific CPU core
 * @param coreIndex Optional core index (default: all cores)
 * @returns CPU clock speed in MHz (average if no core specified)
 */
export declare function clockMHz(coreIndex?: number): number | number[];
/**
 * Get average clock speed across all CPU cores
 * @returns Average clock speed in MHz
 */
export declare function avgClockMHz(): number;
/**
 * Get CPU temperature (if available)
 * @returns Promise resolving to CPU temperature information or null if not available
 */
export declare function getCpuTemperature(): Promise<CpuTemperature | null>;
