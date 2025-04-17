import { MemoryUsageReturn } from '../types/types';
/**
 * Get process memory usage in MB
 * @returns Object with memory usage details
 */
export declare function showMemoryUsage(): MemoryUsageReturn;
/**
 * Get total system memory in MB or GB
 * @param inGB Whether to return the value in GB
 * @returns Total memory in MB or GB
 */
export declare function showTotalMemory(inGB?: boolean): number;
/**
 * Get free system memory in MB or GB
 * @param inGB Whether to return the value in GB
 * @returns Free memory in MB or GB
 */
export declare function showFreeMemory(inGB?: boolean): number;
/**
 * Get comprehensive memory information
 * @returns Object with detailed memory usage statistics in both bytes and formatted units
 */
export declare function getMemoryInfo(): {
    total: {
        bytes: number;
        kb: number;
        mb: number;
        gb: number;
    };
    free: {
        bytes: number;
        kb: number;
        mb: number;
        gb: number;
    };
    used: {
        bytes: number;
        kb: number;
        mb: number;
        gb: number;
    };
    percentUsed: number;
    percentFree: number;
};
/**
 * Get swap memory information (if available)
 * @returns Object with swap memory information or null if not available
 */
export declare function getSwapInfo(): Promise<{
    total: number;
    free: number;
    used: number;
    percentUsed: number;
    available: boolean;
}>;
/**
 * Get memory usage per process
 * @returns Array of objects with process ID and memory usage
 */
export declare function getProcessMemoryUsage(): Promise<never[]>;
