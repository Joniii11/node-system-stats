import { ProcessInfo } from '../types/types';
/**
 * Gets information about the top processes by CPU or memory usage
 * @param {number} [limit=10] Maximum number of processes to return
 * @param {'cpu'|'memory'} [sortBy='cpu'] Sort processes by CPU or memory usage
 * @returns {Promise<ProcessInfo[]>} Array of process information
 */
export declare function getTopProcesses(limit?: number, sortBy?: 'cpu' | 'memory'): Promise<ProcessInfo[]>;
/**
 * Gets information about a specific process by PID
 * @param {number} pid Process ID to get information for
 * @returns {Promise<ProcessInfo | null>} Process information or null if not found
 */
export declare function getProcessById(pid: number): Promise<ProcessInfo | null>;
/**
 * Gets information about the current Node.js process
 * @returns {Promise<ProcessInfo | null>} Current process information
 */
export declare function getCurrentProcessInfo(): Promise<ProcessInfo | null>;
