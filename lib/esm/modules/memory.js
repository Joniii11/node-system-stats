import os from 'os';
/**
 * Get process memory usage in MB
 * @returns Object with memory usage details
 */
export function showMemoryUsage() {
    const mem = process.memoryUsage();
    return {
        rss: Math.round((mem.rss / 1024 / 1024) * 100) / 100,
        heapTotal: Math.round((mem.heapTotal / 1024 / 1024) * 100) / 100,
        heapUsed: Math.round((mem.heapUsed / 1024 / 1024) * 100) / 100,
        external: Math.round((mem.external / 1024 / 1024) * 100) / 100,
        arrayBuffers: Math.round((mem.arrayBuffers / 1024 / 1024) * 100) / 100
    };
}
/**
 * Get total system memory in MB or GB
 * @param inGB Whether to return the value in GB
 * @returns Total memory in MB or GB
 */
export function showTotalMemory(inGB = false) {
    const mem = os.totalmem();
    if (inGB) {
        return Math.round((mem / 1024 / 1024 / 1024) * 100) / 100;
    }
    return Math.round(mem / 1024 / 1024);
}
/**
 * Get free system memory in MB or GB
 * @param inGB Whether to return the value in GB
 * @returns Free memory in MB or GB
 */
export function showFreeMemory(inGB = false) {
    const mem = os.freemem();
    if (inGB) {
        return Math.round((mem / 1024 / 1024 / 1024) * 100) / 100;
    }
    return Math.round(mem / 1024 / 1024);
}
/**
 * Get comprehensive memory information
 * @returns Object with detailed memory usage statistics in both bytes and formatted units
 */
export function getMemoryInfo() {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const percentUsed = (usedMem / totalMem) * 100;
    // Format values in bytes, KB, MB and GB
    function formatUnits(bytes) {
        return {
            bytes,
            kb: Math.round((bytes / 1024) * 100) / 100,
            mb: Math.round((bytes / 1024 / 1024) * 100) / 100,
            gb: Math.round((bytes / 1024 / 1024 / 1024) * 100) / 100
        };
    }
    return {
        total: formatUnits(totalMem),
        free: formatUnits(freeMem),
        used: formatUnits(usedMem),
        percentUsed,
        percentFree: 100 - percentUsed
    };
}
/**
 * Get swap memory information (if available)
 * @returns Object with swap memory information or null if not available
 */
export async function getSwapInfo() {
    // This is a placeholder function
    // In an actual implementation, you would use platform-specific
    // commands to retrieve swap information
    const platform = process.platform;
    // This would be implemented with platform-specific commands
    // For example, using 'swapon -s' on Linux, 'vm_stat' on macOS, etc.
    // For now, return a simple object
    return {
        total: 0,
        free: 0,
        used: 0,
        percentUsed: 0,
        available: platform !== 'win32' // most platforms support swap except for some Windows configurations
    };
}
/**
 * Get memory usage per process
 * @returns Array of objects with process ID and memory usage
 */
export async function getProcessMemoryUsage() {
    // This is a placeholder function
    // In an actual implementation, you would use platform-specific
    // commands to retrieve per-process memory usage
    // For example, using 'ps' on Unix-like systems
    // or Windows Management Instrumentation (WMI) on Windows
    // This would return an array of processes with their memory usage
    return [];
}
//# sourceMappingURL=memory.js.map