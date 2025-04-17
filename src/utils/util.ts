import { exec, ExecException } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { pJSON } from '../types/types';

/**
 * Execute a command and return its output as a Promise
 * @param command Command to execute
 * @returns Promise that resolves with the command output
 */
export function execAsync(command: string): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    exec(command, (error: ExecException | null, stdout: string, stderr: string) => {
      if (error && error.code !== 0) {
        reject(new Error(`Command failed: ${error.message}`));
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

/**
 * Create an error about invalid core index
 * @param coreIndex The invalid core index
 * @param totalCores Total number of cores in the system
 */
export function createCoreError(coreIndex: number, totalCores: number): never {
  throw new Error(
    `[node-system-stats] The core index ${coreIndex} doesn't exist. You have ${totalCores} cores, so the maximum core index is ${
      totalCores - 1
    } (zero-based).`
  );
}

/**
 * Format bytes to human-readable string
 * @param bytes Number of bytes to format
 * @param decimals Number of decimal places to include
 * @returns Formatted string
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

/**
 * Get package.json information
 * @returns Package information
 */
export function getPackageInfo(): pJSON {
  try {
    // Try to get package.json from different relative paths (for both dev and prod)
    const possiblePaths = [
      path.join(__dirname, '..', '..', '..', 'package.json'), // From lib/utils
      path.join(__dirname, '..', '..', 'package.json'),      // From lib
      path.join(__dirname, '..', 'package.json'),           // From src/utils
      path.join(__dirname, 'package.json'),                // Direct
    ];
    
    for (const pkgPath of possiblePaths) {
      if (fs.existsSync(pkgPath)) {
        const packageData = fs.readFileSync(pkgPath, 'utf8');
        return JSON.parse(packageData) as pJSON;
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
  } catch (err) {
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

/**
 * Platform information with additional details
 */
export const platformInfo = {
  // Basic platform info from Node.js
  os: process.platform,
  arch: process.arch,
  nodeVersion: process.version,
  
  // Detailed OS information
  type: os.type(),
  release: os.release(),
  hostname: os.hostname(),
  
  // Processor info
  cpuModel: os.cpus()[0]?.model || 'Unknown',
  cpuCores: os.cpus().length,
  
  // Memory info
  totalMemory: os.totalmem(),
  freeMemory: os.freemem(),
  
  // Network info
  networkInterfaces: Object.keys(os.networkInterfaces()).length,
  
  // User info
  username: os.userInfo().username,
  homedir: os.homedir(),
  tmpdir: os.tmpdir(),
  
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