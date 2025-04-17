/// <reference types="node" />
import { pJSON } from '../types/types';
/**
 * Execute a command and return its output as a Promise
 * @param command Command to execute
 * @returns Promise that resolves with the command output
 */
export declare function execAsync(command: string): Promise<{
    stdout: string;
    stderr: string;
}>;
/**
 * Create an error about invalid core index
 * @param coreIndex The invalid core index
 * @param totalCores Total number of cores in the system
 */
export declare function createCoreError(coreIndex: number, totalCores: number): never;
/**
 * Format bytes to human-readable string
 * @param bytes Number of bytes to format
 * @param decimals Number of decimal places to include
 * @returns Formatted string
 */
export declare function formatBytes(bytes: number, decimals?: number): string;
/**
 * Get package.json information
 * @returns Package information
 */
export declare function getPackageInfo(): pJSON;
/**
 * Platform information with additional details
 */
export declare const platformInfo: {
    os: NodeJS.Platform;
    arch: NodeJS.Architecture;
    nodeVersion: string;
    type: string;
    release: string;
    hostname: string;
    cpuModel: string;
    cpuCores: number;
    totalMemory: number;
    freeMemory: number;
    networkInterfaces: number;
    username: string;
    homedir: string;
    tmpdir: string;
    /**
     * Check if platform is Windows
     */
    isWindows: boolean;
    /**
     * Check if platform is macOS
     */
    isMacOS: boolean;
    /**
     * Check if platform is Linux
     */
    isLinux: boolean;
};
