"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrimaryIpAddress = exports.getPrimaryInterface = exports.isNetworkConnected = exports.getDownloadSpeed = exports.getUploadSpeed = exports.getTotalBytesReceived = exports.getTotalBytesSent = exports.getNetworkStats = exports.stopNetworkMonitoring = exports.startNetworkMonitoring = exports.getNetworkInterfaces = void 0;
const os_1 = __importDefault(require("os"));
const util_1 = require("../utils/util");
const network_monitor_1 = require("../utils/network-monitor");
let networkMonitor = null;
/**
 * Get network interfaces information
 * @returns Promise resolving to array of network interface information
 */
async function getNetworkInterfaces() {
    try {
        const networkInterfaces = os_1.default.networkInterfaces();
        const interfaces = [];
        for (const [name, netInterface] of Object.entries(networkInterfaces)) {
            if (!netInterface)
                continue;
            for (const info of netInterface) {
                if (info.family === 'IPv4') {
                    const networkInfo = {
                        name,
                        ip: info.address,
                        mac: info.mac,
                        type: getInterfaceType(name),
                        netmask: info.netmask,
                        internal: info.internal
                    };
                    // Get additional interface information based on platform
                    const additionalInfo = await getAdditionalInterfaceInfo(name);
                    Object.assign(networkInfo, additionalInfo);
                    interfaces.push(networkInfo);
                }
            }
        }
        return interfaces;
    }
    catch (err) {
        console.error('Error getting network interfaces:', err);
        return [];
    }
}
exports.getNetworkInterfaces = getNetworkInterfaces;
/**
 * Start monitoring network traffic
 * @param updateInterval Interval in milliseconds to update stats (default: 1000)
 * @returns Promise resolving when monitoring has started
 */
async function startNetworkMonitoring(updateInterval = 1000) {
    try {
        if (!networkMonitor) {
            networkMonitor = new network_monitor_1.NetworkMonitor(updateInterval);
        }
        await networkMonitor.start();
    }
    catch (err) {
        console.error('Error starting network monitoring:', err);
        throw err;
    }
}
exports.startNetworkMonitoring = startNetworkMonitoring;
/**
 * Stop network monitoring
 */
function stopNetworkMonitoring() {
    if (networkMonitor) {
        networkMonitor.stop();
    }
}
exports.stopNetworkMonitoring = stopNetworkMonitoring;
/**
 * Get current network stats
 * @returns Network statistics array or empty array if monitoring is not active
 */
function getNetworkStats() {
    if (!networkMonitor) {
        return [];
    }
    return networkMonitor.getStats();
}
exports.getNetworkStats = getNetworkStats;
/**
 * Get the total bytes sent since monitoring started
 * @returns Number of bytes sent or 0 if monitoring is not active
 */
function getTotalBytesSent() {
    if (!networkMonitor) {
        return 0;
    }
    return networkMonitor.getTotalBytesSent();
}
exports.getTotalBytesSent = getTotalBytesSent;
/**
 * Get the total bytes received since monitoring started
 * @returns Number of bytes received or 0 if monitoring is not active
 */
function getTotalBytesReceived() {
    if (!networkMonitor) {
        return 0;
    }
    return networkMonitor.getTotalBytesReceived();
}
exports.getTotalBytesReceived = getTotalBytesReceived;
/**
 * Get the current upload speed in bytes per second
 * @returns Upload speed in bytes per second or 0 if monitoring is not active
 */
function getUploadSpeed() {
    if (!networkMonitor) {
        return 0;
    }
    return networkMonitor.getUploadSpeed();
}
exports.getUploadSpeed = getUploadSpeed;
/**
 * Get the current download speed in bytes per second
 * @returns Download speed in bytes per second or 0 if monitoring is not active
 */
function getDownloadSpeed() {
    if (!networkMonitor) {
        return 0;
    }
    return networkMonitor.getDownloadSpeed();
}
exports.getDownloadSpeed = getDownloadSpeed;
/**
 * Check if the network connection is active
 * @returns Promise resolving to a boolean indicating if the network is connected
 */
async function isNetworkConnected() {
    try {
        const interfaces = await getNetworkInterfaces();
        // Check if we have any non-internal interface with an IP address
        return interfaces.some(iface => !iface.internal && iface.ip !== '127.0.0.1');
    }
    catch (err) {
        return false;
    }
}
exports.isNetworkConnected = isNetworkConnected;
/**
 * Get the primary network interface
 * @returns Promise resolving to the primary network interface or null if none found
 */
async function getPrimaryInterface() {
    try {
        const interfaces = await getNetworkInterfaces();
        // Filter out internal interfaces
        const externalInterfaces = interfaces.filter(iface => !iface.internal);
        if (externalInterfaces.length === 0) {
            return null;
        }
        // Try to find an interface that has 'up' as operstate
        const activeInterface = externalInterfaces.find(iface => iface.operstate === 'up');
        if (activeInterface) {
            return activeInterface;
        }
        // If no active interface, return the first external interface
        return externalInterfaces[0];
    }
    catch (err) {
        console.error('Error getting primary interface:', err);
        return null;
    }
}
exports.getPrimaryInterface = getPrimaryInterface;
/**
 * Get the primary IP address of the system
 * @returns Promise resolving to the primary IP address or null if none found
 */
async function getPrimaryIpAddress() {
    try {
        const primaryInterface = await getPrimaryInterface();
        if (primaryInterface && primaryInterface.ip) {
            return primaryInterface.ip;
        }
        return null;
    }
    catch (err) {
        console.error('Error getting primary IP address:', err);
        return null;
    }
}
exports.getPrimaryIpAddress = getPrimaryIpAddress;
/**
 * Get the interface type based on name
 * @param name Interface name
 * @returns Interface type string
 */
function getInterfaceType(name) {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('wlan') || lowerName.includes('wifi') || lowerName.includes('wireless')) {
        return 'wireless';
    }
    else if (lowerName.includes('eth') || lowerName.includes('ethernet')) {
        return 'ethernet';
    }
    else if (lowerName.includes('lo') || lowerName.includes('loopback')) {
        return 'loopback';
    }
    else if (lowerName.includes('tun') || lowerName.includes('tap')) {
        return 'virtual';
    }
    else if (lowerName.includes('ppp')) {
        return 'dialup';
    }
    else if (lowerName.includes('docker') || lowerName.includes('veth')) {
        return 'docker';
    }
    return 'unknown';
}
/**
 * Get additional interface information based on platform
 * @param interfaceName Interface name
 * @returns Promise resolving to additional interface information
 */
async function getAdditionalInterfaceInfo(interfaceName) {
    const platform = process.platform;
    const info = {};
    try {
        if (platform === 'linux') {
            // Get operstate
            try {
                const { stdout: operstate } = await (0, util_1.execAsync)(`cat /sys/class/net/${interfaceName}/operstate 2>/dev/null || echo "unknown"`);
                info.operstate = operstate.trim();
            }
            catch (err) {
                info.operstate = 'unknown';
            }
            // Get MTU
            try {
                const { stdout: mtu } = await (0, util_1.execAsync)(`cat /sys/class/net/${interfaceName}/mtu 2>/dev/null || echo "0"`);
                info.mtu = parseInt(mtu.trim(), 10) || undefined;
            }
            catch (err) {
                // Ignore error
            }
            // Get speed
            try {
                const { stdout: speed } = await (0, util_1.execAsync)(`cat /sys/class/net/${interfaceName}/speed 2>/dev/null || echo "0"`);
                const speedValue = parseInt(speed.trim(), 10);
                if (speedValue > 0) {
                    info.speed = speedValue * 1000000; // Convert to bps (from Mbps)
                }
            }
            catch (err) {
                // Ignore error
            }
            // Get bytes and packets statistics
            try {
                const { stdout: rxBytes } = await (0, util_1.execAsync)(`cat /sys/class/net/${interfaceName}/statistics/rx_bytes 2>/dev/null || echo "0"`);
                const { stdout: txBytes } = await (0, util_1.execAsync)(`cat /sys/class/net/${interfaceName}/statistics/tx_bytes 2>/dev/null || echo "0"`);
                const { stdout: rxPackets } = await (0, util_1.execAsync)(`cat /sys/class/net/${interfaceName}/statistics/rx_packets 2>/dev/null || echo "0"`);
                const { stdout: txPackets } = await (0, util_1.execAsync)(`cat /sys/class/net/${interfaceName}/statistics/tx_packets 2>/dev/null || echo "0"`);
                info.bytes = {
                    received: parseInt(rxBytes.trim(), 10) || 0,
                    sent: parseInt(txBytes.trim(), 10) || 0
                };
                info.packets = {
                    received: parseInt(rxPackets.trim(), 10) || 0,
                    sent: parseInt(txPackets.trim(), 10) || 0
                };
            }
            catch (err) {
                // Ignore error
            }
        }
        else if (platform === 'darwin') {
            // macOS
            try {
                // Get interface info using networksetup
                const { stdout } = await (0, util_1.execAsync)(`networksetup -getinfo "$(networksetup -listallhardwareports | awk '/${interfaceName}/{getline; print $2}')" 2>/dev/null || echo "Error"`);
                if (!stdout.includes('Error')) {
                    // Extract MTU if available
                    if (stdout.includes('MTU:')) {
                        const mtuMatch = stdout.match(/MTU:\s*(\d+)/);
                        if (mtuMatch) {
                            info.mtu = parseInt(mtuMatch[1], 10);
                        }
                    }
                    // Determine operstate based on IP address
                    info.operstate = stdout.includes('IP address:') ? 'up' : 'down';
                }
                // Try to get speed using system_profiler
                try {
                    const { stdout: systemProfiler } = await (0, util_1.execAsync)('system_profiler SPNetworkDataType');
                    const interfaceSection = systemProfiler.split(interfaceName)[1];
                    if (interfaceSection) {
                        const linkSpeedMatch = interfaceSection.match(/Link Speed:\s*([0-9.]+)\s*([GMK])bps/i);
                        if (linkSpeedMatch) {
                            let speed = parseFloat(linkSpeedMatch[1]);
                            const unit = linkSpeedMatch[2].toUpperCase();
                            if (unit === 'G') {
                                speed *= 1000000000;
                            }
                            else if (unit === 'M') {
                                speed *= 1000000;
                            }
                            else if (unit === 'K') {
                                speed *= 1000;
                            }
                            info.speed = speed;
                        }
                    }
                }
                catch (err) {
                    // Ignore error
                }
            }
            catch (err) {
                info.operstate = 'unknown';
            }
        }
        else if (platform === 'win32') {
            // Windows
            try {
                // Get interface status using PowerShell
                const { stdout } = await (0, util_1.execAsync)(`powershell -Command "Get-NetAdapter | Where-Object { $_.InterfaceDescription -match '${interfaceName}' -or $_.Name -eq '${interfaceName}' } | Select-Object -Property Status, LinkSpeed, MacAddress, MtuSize | ConvertTo-Json"`);
                if (stdout && !stdout.includes('Error')) {
                    try {
                        const adapter = JSON.parse(stdout);
                        if (adapter) {
                            // Convert status to Linux-like operstate
                            info.operstate = adapter.Status === 'Up' ? 'up' : 'down';
                            // Get MTU
                            if (adapter.MtuSize) {
                                info.mtu = adapter.MtuSize;
                            }
                            // Get speed
                            if (adapter.LinkSpeed && adapter.LinkSpeed.includes('bps')) {
                                const speedMatch = adapter.LinkSpeed.match(/([0-9.]+)\s*([GMK]?)bps/i);
                                if (speedMatch) {
                                    let speed = parseFloat(speedMatch[1]);
                                    const unit = speedMatch[2].toUpperCase();
                                    if (unit === 'G') {
                                        speed *= 1000000000;
                                    }
                                    else if (unit === 'M') {
                                        speed *= 1000000;
                                    }
                                    else if (unit === 'K') {
                                        speed *= 1000;
                                    }
                                    info.speed = speed;
                                }
                            }
                        }
                    }
                    catch (err) {
                        // Ignore parsing error
                    }
                }
                else {
                    info.operstate = 'unknown';
                }
            }
            catch (err) {
                info.operstate = 'unknown';
            }
        }
    }
    catch (err) {
        console.error(`Error getting additional info for ${interfaceName}:`, err);
    }
    return info;
}
//# sourceMappingURL=network.js.map