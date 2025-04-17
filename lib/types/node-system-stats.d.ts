/// <reference types="node" />
import { IOptsInput, ICallback, MemoryUsageReturn, DiskDriveInfo, NetworkInterfaceInfo, CpuTemperature, BatteryInfo, ProcessInfo, LoadAverageInfo } from "./types/types";
/**
 * This function measures the CPU usage
 * @param {IOptsInput} optsInput The options input
 * @returns {Promise<ICallback>} returns a resolvable promise
 */
export declare function usagePercent(optsInput?: IOptsInput): Promise<ICallback>;
/**
 * @returns {number} The number of total cores in the system.
 */
export declare const totalCores: number;
/**
 * @returns {string} The name of the cpu in your system.
 */
export declare const cpuModel: string;
/**
 * @returns {string} Returns the current version of the package
 */
export declare const version: string;
/**
 * @returns {string} Returns the name of the package
 */
export declare const name: string;
/**
 * @returns {string} Returns the processes platform
 */
export declare const platform: NodeJS.Platform;
/**
 * @returns {number} The processes PID
 */
export declare const PID: number;
/**
 * @returns {string} The processes title
 */
export declare const title: string;
/**
 * This function returns the speed of all cores or only just the selected core.
 * @param {number} coreIndex The index of the core. It begins with 0. If not specified, it will return an array with all of the cores
 * @returns {number | number[]} A number of the speed of the core OR a array with all of the cores speeds.
 */
export declare function clockMHz(coreIndex?: number): number | number[];
/**
 * This function shows the average Clock Frequency from all of the cores.
 * @returns {number} returns a number with the average Clock MHz over all cores
 */
export declare function avgClockMHz(): number;
/**
 * Shows the formmated Memory Usage information
 * @returns {MemoryUsageReturn} An object with every converted memory usage type in redable form.
 */
export declare function showMemoryUsage(): MemoryUsageReturn;
/**
 * This function is used to display the total memory that the system has. It can output in Gigabyte and Megabyte.
 * @param {boolean?} convertedGB If the returned value should be in Gigabytes or in MB. If set to true, then it will output the Gigabyte value.
 * @default {false} Megabyte format.
 *
 * @returns {number} The converted total Memory that is available.
 */
export declare function showTotalMemory(convertedGB?: boolean): number;
/**
 * This function is used to display the free memory that the system has. It can output in Gigabyte and Megabyte.
 * @param {boolean?} convertedGB If the returned value should be in Gigabytes or in MB. If set to true, then it will output the Gigabyte value.
 * @default {false} Megabyte format.
 *
 * @returns {number} The converted free Memory that is available.
 */
export declare function showFreeMemory(convertedGB?: boolean): number;
/**
 * Gets the disk usage information for the specified path or for all mounted file systems
 * @param {string} [pathToCheck=undefined] Specific directory path to check. If not provided, returns all file systems.
 * @returns {Promise<DiskDriveInfo[]>} Array of disk usage information objects
 */
export declare function getDiskInfo(pathToCheck?: string): Promise<DiskDriveInfo[]>;
/**
 * Format bytes to a human-readable string with appropriate units
 * @param {number} bytes The number of bytes
 * @param {number} [decimals=2] Number of decimal places to show
 * @returns {string} Human-readable file size string (e.g. '1.5 GB')
 */
export declare function formatBytes(bytes: number, decimals?: number): string;
/**
 * Gets detailed information about network interfaces
 * @returns {NetworkInterfaceInfo[]} Array of network interface information
 */
export declare function getNetworkInterfaces(): NetworkInterfaceInfo[];
/**
 * Get system load averages for 1, 5, and 15 minutes
 * @returns {LoadAverageInfo} Object containing load average information
 */
export declare function getLoadAverage(): LoadAverageInfo;
/**
 * Attempts to get CPU temperature information (platform-dependent)
 * @returns {Promise<CpuTemperature | null>} CPU temperature data or null if unavailable
 */
export declare function getCpuTemperature(): Promise<CpuTemperature | null>;
/**
 * Gets battery information if available
 * @returns {Promise<BatteryInfo | null>} Battery information or null if not available
 */
export declare function getBatteryInfo(): Promise<BatteryInfo | null>;
/**
 * Gets information about the top processes by CPU or memory usage
 * @param {number} [limit=10] Maximum number of processes to return
 * @param {'cpu'|'memory'} [sortBy='cpu'] Sort processes by CPU or memory usage
 * @returns {Promise<ProcessInfo[]>} Array of process information
 */
export declare function getTopProcesses(limit?: number, sortBy?: 'cpu' | 'memory'): Promise<ProcessInfo[]>;
