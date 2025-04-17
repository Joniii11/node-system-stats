/**
 * Interface for disk drive information
 */
interface DiskDriveInfo {
    filesystem: string;
    size: number;
    used: number;
    available: number;
    percentUsed: number;
    mountpoint: string;
}
/**
 * Get disk usage information
 * @param diskPath Optional path to check (default: current working directory)
 * @returns Promise resolving to an array of disk drive information objects
 */
export declare function getDiskInfo(diskPath?: string): Promise<DiskDriveInfo[]>;
/**
 * Format bytes to human-readable string
 * Re-exported from utils for convenience
 */
export { formatBytes } from '../utils/util';
/**
 * Get all available disk drives
 * @returns Promise resolving to an array of disk drive paths
 */
export declare function getDrives(): Promise<string[]>;
/**
 * Check if a path exists and is accessible
 * @param pathToCheck Path to check
 * @returns Promise resolving to a boolean indicating if the path exists and is accessible
 */
export declare function pathExists(pathToCheck: string): Promise<boolean>;
/**
 * Get file system information
 * @returns Promise resolving to an object with file system capabilities
 */
export declare function getFileSystemInfo(): Promise<{
    symlinks: boolean;
    caseSensitive: boolean;
    permissions: boolean;
    atomic: boolean;
}>;
