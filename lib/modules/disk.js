"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileSystemInfo = exports.pathExists = exports.getDrives = exports.formatBytes = exports.getDiskInfo = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = require("../utils/util");
/**
 * Get disk usage information
 * @param diskPath Optional path to check (default: current working directory)
 * @returns Promise resolving to an array of disk drive information objects
 */
async function getDiskInfo(diskPath) {
    const platform = process.platform;
    const checkPath = diskPath || process.cwd();
    try {
        if (platform === 'win32') {
            return await getWindowsDiskInfo(checkPath);
        }
        else {
            return await getUnixDiskInfo(checkPath);
        }
    }
    catch (err) {
        console.error('Error getting disk info:', err);
        throw new Error('Failed to get disk information');
    }
}
exports.getDiskInfo = getDiskInfo;
/**
 * Format bytes to human-readable string
 * Re-exported from utils for convenience
 */
var util_2 = require("../utils/util");
Object.defineProperty(exports, "formatBytes", { enumerable: true, get: function () { return util_2.formatBytes; } });
/**
 * Get all available disk drives
 * @returns Promise resolving to an array of disk drive paths
 */
async function getDrives() {
    const platform = process.platform;
    try {
        if (platform === 'win32') {
            // Windows implementation
            const { stdout } = await (0, util_1.execAsync)('wmic logicaldisk get name');
            return stdout
                .split('\n')
                .map(line => line.trim())
                .filter(line => /^[A-Z]:$/.test(line));
        }
        else {
            // Unix-like implementation
            const { stdout } = await (0, util_1.execAsync)('df -P -l | awk \'NR>1 {print $6}\'');
            return stdout
                .split('\n')
                .map(line => line.trim())
                .filter(Boolean);
        }
    }
    catch (err) {
        console.error('Error getting drives:', err);
        return [];
    }
}
exports.getDrives = getDrives;
/**
 * Check if a path exists and is accessible
 * @param pathToCheck Path to check
 * @returns Promise resolving to a boolean indicating if the path exists and is accessible
 */
async function pathExists(pathToCheck) {
    try {
        await fs_1.default.promises.access(pathToCheck, fs_1.default.constants.F_OK);
        return true;
    }
    catch (err) {
        return false;
    }
}
exports.pathExists = pathExists;
/**
 * Get disk usage information for Windows
 * @param diskPath Path to check
 * @returns Promise resolving to an array of disk drive information objects
 * @private
 */
async function getWindowsDiskInfo(diskPath) {
    // Get the drive letter from the path
    const driveLetter = path_1.default.parse(diskPath).root;
    if (!driveLetter) {
        throw new Error('Invalid path: Cannot determine drive letter');
    }
    try {
        // Use wmic to get disk space information
        const { stdout } = await (0, util_1.execAsync)(`wmic logicaldisk where "DeviceID='${driveLetter.charAt(0)}:'" get FreeSpace,Size /format:csv`);
        const lines = stdout.trim().split('\r\n');
        if (lines.length < 2) {
            throw new Error('Failed to parse wmic output');
        }
        // Skip the header line and parse the CSV data
        const data = lines[1].split(',');
        if (data.length < 3) {
            throw new Error('Invalid wmic output format');
        }
        const freeSpace = parseInt(data[1], 10);
        const size = parseInt(data[2], 10);
        const used = size - freeSpace;
        const percentUsed = Math.round((used / size) * 100);
        return [
            {
                filesystem: driveLetter,
                size,
                used,
                available: freeSpace,
                percentUsed,
                mountpoint: driveLetter
            }
        ];
    }
    catch (err) {
        console.error('Error in getWindowsDiskInfo:', err);
        throw err;
    }
}
/**
 * Get disk usage information for Unix-like systems
 * @param diskPath Path to check
 * @returns Promise resolving to an array of disk drive information objects
 * @private
 */
async function getUnixDiskInfo(diskPath) {
    try {
        // Use df command to get disk space information
        const { stdout } = await (0, util_1.execAsync)(`df -P -k "${diskPath}"`);
        const lines = stdout.trim().split('\n');
        if (lines.length < 2) {
            throw new Error('Failed to parse df output');
        }
        // Skip the header line and parse the output
        const diskInfo = [];
        for (let i = 1; i < lines.length; i++) {
            const fields = lines[i].split(/\s+/);
            if (fields.length < 6) {
                continue;
            }
            // Parse df output fields
            const filesystem = fields[0];
            const size = parseInt(fields[1], 10) * 1024; // Convert KB to bytes
            const used = parseInt(fields[2], 10) * 1024;
            const available = parseInt(fields[3], 10) * 1024;
            const percentUsed = parseInt(fields[4], 10);
            const mountpoint = fields[5];
            diskInfo.push({
                filesystem,
                size,
                used,
                available,
                percentUsed,
                mountpoint
            });
        }
        return diskInfo;
    }
    catch (err) {
        console.error('Error in getUnixDiskInfo:', err);
        throw err;
    }
}
/**
 * Get file system information
 * @returns Promise resolving to an object with file system capabilities
 */
async function getFileSystemInfo() {
    try {
        const tempFile = path_1.default.join(process.platform === 'win32' ? process.env.TEMP || 'C:\\Temp' : '/tmp', `node-stats-test-${Date.now()}`);
        // Test file system capabilities
        const capabilities = {
            symlinks: false,
            caseSensitive: process.platform !== 'win32',
            permissions: process.platform !== 'win32',
            atomic: true
        };
        try {
            // Test symlink support
            await fs_1.default.promises.writeFile(tempFile, 'test');
            const linkPath = `${tempFile}-link`;
            try {
                await fs_1.default.promises.symlink(tempFile, linkPath);
                capabilities.symlinks = true;
                await fs_1.default.promises.unlink(linkPath);
            }
            catch (err) {
                capabilities.symlinks = false;
            }
            // Clean up
            await fs_1.default.promises.unlink(tempFile);
        }
        catch (err) {
            // Ignore errors in cleanup
        }
        return capabilities;
    }
    catch (err) {
        console.error('Error getting file system info:', err);
        return {
            symlinks: process.platform !== 'win32',
            caseSensitive: process.platform !== 'win32',
            permissions: process.platform !== 'win32',
            atomic: true
        };
    }
}
exports.getFileSystemInfo = getFileSystemInfo;
//# sourceMappingURL=disk.js.map