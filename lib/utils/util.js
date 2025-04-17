"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.platformInfo = exports.getPackageInfo = exports.formatBytes = exports.createCoreError = exports.execAsync = void 0;
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
/**
 * Execute a command and return its output as a Promise
 * @param command Command to execute
 * @returns Promise that resolves with the command output
 */
function execAsync(command) {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(command, (error, stdout, stderr) => {
            if (error && error.code !== 0) {
                reject(new Error(`Command failed: ${error.message}`));
                return;
            }
            resolve({ stdout, stderr });
        });
    });
}
exports.execAsync = execAsync;
/**
 * Create an error about invalid core index
 * @param coreIndex The invalid core index
 * @param totalCores Total number of cores in the system
 */
function createCoreError(coreIndex, totalCores) {
    throw new Error(`[node-system-stats] The core index ${coreIndex} doesn't exist. You have ${totalCores} cores, so the maximum core index is ${totalCores - 1} (zero-based).`);
}
exports.createCoreError = createCoreError;
/**
 * Format bytes to human-readable string
 * @param bytes Number of bytes to format
 * @param decimals Number of decimal places to include
 * @returns Formatted string
 */
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}
exports.formatBytes = formatBytes;
/**
 * Get package.json information
 * @returns Package information
 */
function getPackageInfo() {
    try {
        // Try to get package.json from different relative paths (for both dev and prod)
        const possiblePaths = [
            path_1.default.join(__dirname, '..', '..', '..', 'package.json'), // From lib/utils
            path_1.default.join(__dirname, '..', '..', 'package.json'), // From lib
            path_1.default.join(__dirname, '..', 'package.json'), // From src/utils
            path_1.default.join(__dirname, 'package.json'), // Direct
        ];
        for (const pkgPath of possiblePaths) {
            if (fs_1.default.existsSync(pkgPath)) {
                const packageData = fs_1.default.readFileSync(pkgPath, 'utf8');
                return JSON.parse(packageData);
            }
        }
        // Fallback to a default value if package.json cannot be found
        return {
            name: 'node-system-stats',
            version: '2.0.0',
            private: false,
            description: 'System statistics for Node.js applications',
            main: 'lib/index.js',
            types: 'lib/index.d.ts',
            files: ['lib/**/*'],
            repository: { type: 'git', url: 'https://github.com/Joniii11/node-system-stats' },
            bugs: { type: 'issues', url: 'https://github.com/Joniii11/node-system-stats/issues' },
            keywords: ['cpu', 'memory', 'disk', 'network', 'monitor', 'stats', 'system'],
            readmeFilename: 'README.md',
            devDependencies: {},
            license: 'MIT',
        };
    }
    catch (err) {
        // Return a default value in case of error
        return {
            name: 'node-system-stats',
            version: '2.0.0',
            private: false,
            description: 'System statistics for Node.js applications',
            main: 'lib/index.js',
            types: 'lib/index.d.ts',
            files: ['lib/**/*'],
            repository: { type: 'git', url: 'https://github.com/Joniii11/node-system-stats' },
            bugs: { type: 'issues', url: 'https://github.com/Joniii11/node-system-stats/issues' },
            keywords: ['cpu', 'memory', 'disk', 'network', 'monitor', 'stats', 'system'],
            readmeFilename: 'README.md',
            devDependencies: {},
            license: 'MIT',
        };
    }
}
exports.getPackageInfo = getPackageInfo;
/**
 * Platform information with additional details
 */
exports.platformInfo = {
    // Basic platform info from Node.js
    os: process.platform,
    arch: process.arch,
    nodeVersion: process.version,
    // Detailed OS information
    type: os_1.default.type(),
    release: os_1.default.release(),
    hostname: os_1.default.hostname(),
    // Processor info
    cpuModel: os_1.default.cpus()[0]?.model || 'Unknown',
    cpuCores: os_1.default.cpus().length,
    // Memory info
    totalMemory: os_1.default.totalmem(),
    freeMemory: os_1.default.freemem(),
    // Network info
    networkInterfaces: Object.keys(os_1.default.networkInterfaces()).length,
    // User info
    username: os_1.default.userInfo().username,
    homedir: os_1.default.homedir(),
    tmpdir: os_1.default.tmpdir(),
    /**
     * Check if platform is Windows
     */
    isWindows: process.platform === 'win32',
    /**
     * Check if platform is macOS
     */
    isMacOS: process.platform === 'darwin',
    /**
     * Check if platform is Linux
     */
    isLinux: process.platform === 'linux',
};
//# sourceMappingURL=util.js.map