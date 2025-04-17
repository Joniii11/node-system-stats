import os from 'os';
import { execAsync } from '../utils/util';
import { NetworkMonitor, NetworkStats } from '../utils/network-monitor';

/**
 * Interface for network interface information
 */
export interface NetworkInterfaceInfo {
  name: string;
  ip: string;
  mac: string;
  type: string;
  netmask: string;
  internal: boolean;
  operstate?: string;
  mtu?: number;
  speed?: number;
  bytes?: {
    sent: number;
    received: number;
  };
  packets?: {
    sent: number;
    received: number;
  };
}

let networkMonitor: NetworkMonitor | null = null;

/**
 * Get network interfaces information
 * @returns Promise resolving to array of network interface information
 */
export async function getNetworkInterfaces(): Promise<NetworkInterfaceInfo[]> {
  try {
    const networkInterfaces = os.networkInterfaces();
    const interfaces: NetworkInterfaceInfo[] = [];
    
    for (const [name, netInterface] of Object.entries(networkInterfaces)) {
      if (!netInterface) continue;
      
      for (const info of netInterface) {
        if (info.family === 'IPv4') {
          const networkInfo: NetworkInterfaceInfo = {
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
  } catch (err) {
    console.error('Error getting network interfaces:', err);
    return [];
  }
}

/**
 * Start monitoring network traffic
 * @param updateInterval Interval in milliseconds to update stats (default: 1000)
 * @returns Promise resolving when monitoring has started
 */
export async function startNetworkMonitoring(updateInterval = 1000): Promise<void> {
  try {
    if (!networkMonitor) {
      networkMonitor = new NetworkMonitor(updateInterval);
    }
    await networkMonitor.start();
  } catch (err) {
    console.error('Error starting network monitoring:', err);
    throw err;
  }
}

/**
 * Stop network monitoring
 */
export function stopNetworkMonitoring(): void {
  if (networkMonitor) {
    networkMonitor.stop();
  }
}

/**
 * Get current network stats
 * @returns Network statistics array or empty array if monitoring is not active
 */
export function getNetworkStats(): NetworkStats[] {
  if (!networkMonitor) {
    return [];
  }
  return networkMonitor.getStats();
}

/**
 * Get the total bytes sent since monitoring started
 * @returns Number of bytes sent or 0 if monitoring is not active
 */
export function getTotalBytesSent(): number {
  if (!networkMonitor) {
    return 0;
  }
  return networkMonitor.getTotalBytesSent();
}

/**
 * Get the total bytes received since monitoring started
 * @returns Number of bytes received or 0 if monitoring is not active
 */
export function getTotalBytesReceived(): number {
  if (!networkMonitor) {
    return 0;
  }
  return networkMonitor.getTotalBytesReceived();
}

/**
 * Get the current upload speed in bytes per second
 * @returns Upload speed in bytes per second or 0 if monitoring is not active
 */
export function getUploadSpeed(): number {
  if (!networkMonitor) {
    return 0;
  }
  return networkMonitor.getUploadSpeed();
}

/**
 * Get the current download speed in bytes per second
 * @returns Download speed in bytes per second or 0 if monitoring is not active
 */
export function getDownloadSpeed(): number {
  if (!networkMonitor) {
    return 0;
  }
  return networkMonitor.getDownloadSpeed();
}

/**
 * Check if the network connection is active
 * @returns Promise resolving to a boolean indicating if the network is connected
 */
export async function isNetworkConnected(): Promise<boolean> {
  try {
    const interfaces = await getNetworkInterfaces();
    
    // Check if we have any non-internal interface with an IP address
    return interfaces.some(iface => !iface.internal && iface.ip !== '127.0.0.1');
  } catch (err) {
    return false;
  }
}

/**
 * Get the primary network interface
 * @returns Promise resolving to the primary network interface or null if none found
 */
export async function getPrimaryInterface(): Promise<NetworkInterfaceInfo | null> {
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
  } catch (err) {
    console.error('Error getting primary interface:', err);
    return null;
  }
}

/**
 * Get the primary IP address of the system
 * @returns Promise resolving to the primary IP address or null if none found
 */
export async function getPrimaryIpAddress(): Promise<string | null> {
  try {
    const primaryInterface = await getPrimaryInterface();
    
    if (primaryInterface && primaryInterface.ip) {
      return primaryInterface.ip;
    }
    
    return null;
  } catch (err) {
    console.error('Error getting primary IP address:', err);
    return null;
  }
}

/**
 * Get the interface type based on name
 * @param name Interface name
 * @returns Interface type string
 */
function getInterfaceType(name: string): string {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('wlan') || lowerName.includes('wifi') || lowerName.includes('wireless')) {
    return 'wireless';
  } else if (lowerName.includes('eth') || lowerName.includes('ethernet')) {
    return 'ethernet';
  } else if (lowerName.includes('lo') || lowerName.includes('loopback')) {
    return 'loopback';
  } else if (lowerName.includes('tun') || lowerName.includes('tap')) {
    return 'virtual';
  } else if (lowerName.includes('ppp')) {
    return 'dialup';
  } else if (lowerName.includes('docker') || lowerName.includes('veth')) {
    return 'docker';
  }
  
  return 'unknown';
}

/**
 * Get additional interface information based on platform
 * @param interfaceName Interface name
 * @returns Promise resolving to additional interface information
 */
async function getAdditionalInterfaceInfo(interfaceName: string): Promise<Partial<NetworkInterfaceInfo>> {
  const platform = process.platform;
  const info: Partial<NetworkInterfaceInfo> = {};
  
  try {
    if (platform === 'linux') {
      // Get operstate
      try {
        const { stdout: operstate } = await execAsync(`cat /sys/class/net/${interfaceName}/operstate 2>/dev/null || echo "unknown"`);
        info.operstate = operstate.trim();
      } catch (err) {
        info.operstate = 'unknown';
      }
      
      // Get MTU
      try {
        const { stdout: mtu } = await execAsync(`cat /sys/class/net/${interfaceName}/mtu 2>/dev/null || echo "0"`);
        info.mtu = parseInt(mtu.trim(), 10) || undefined;
      } catch (err) {
        // Ignore error
      }
      
      // Get speed
      try {
        const { stdout: speed } = await execAsync(`cat /sys/class/net/${interfaceName}/speed 2>/dev/null || echo "0"`);
        const speedValue = parseInt(speed.trim(), 10);
        if (speedValue > 0) {
          info.speed = speedValue * 1000000; // Convert to bps (from Mbps)
        }
      } catch (err) {
        // Ignore error
      }
      
      // Get bytes and packets statistics
      try {
        const { stdout: rxBytes } = await execAsync(`cat /sys/class/net/${interfaceName}/statistics/rx_bytes 2>/dev/null || echo "0"`);
        const { stdout: txBytes } = await execAsync(`cat /sys/class/net/${interfaceName}/statistics/tx_bytes 2>/dev/null || echo "0"`);
        const { stdout: rxPackets } = await execAsync(`cat /sys/class/net/${interfaceName}/statistics/rx_packets 2>/dev/null || echo "0"`);
        const { stdout: txPackets } = await execAsync(`cat /sys/class/net/${interfaceName}/statistics/tx_packets 2>/dev/null || echo "0"`);
        
        info.bytes = {
          received: parseInt(rxBytes.trim(), 10) || 0,
          sent: parseInt(txBytes.trim(), 10) || 0
        };
        
        info.packets = {
          received: parseInt(rxPackets.trim(), 10) || 0,
          sent: parseInt(txPackets.trim(), 10) || 0
        };
      } catch (err) {
        // Ignore error
      }
    } else if (platform === 'darwin') {
      // macOS
      try {
        // Get interface info using networksetup
        const { stdout } = await execAsync(`networksetup -getinfo "$(networksetup -listallhardwareports | awk '/${interfaceName}/{getline; print $2}')" 2>/dev/null || echo "Error"`);
        
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
          const { stdout: systemProfiler } = await execAsync('system_profiler SPNetworkDataType');
          const interfaceSection = systemProfiler.split(interfaceName)[1];
          
          if (interfaceSection) {
            const linkSpeedMatch = interfaceSection.match(/Link Speed:\s*([0-9.]+)\s*([GMK])bps/i);
            if (linkSpeedMatch) {
              let speed = parseFloat(linkSpeedMatch[1]);
              const unit = linkSpeedMatch[2].toUpperCase();
              
              if (unit === 'G') {
                speed *= 1000000000;
              } else if (unit === 'M') {
                speed *= 1000000;
              } else if (unit === 'K') {
                speed *= 1000;
              }
              
              info.speed = speed;
            }
          }
        } catch (err) {
          // Ignore error
        }
      } catch (err) {
        info.operstate = 'unknown';
      }
    } else if (platform === 'win32') {
      // Windows
      try {
        // Get interface status using PowerShell
        const { stdout } = await execAsync(`powershell -Command "Get-NetAdapter | Where-Object { $_.InterfaceDescription -match '${interfaceName}' -or $_.Name -eq '${interfaceName}' } | Select-Object -Property Status, LinkSpeed, MacAddress, MtuSize | ConvertTo-Json"`);
        
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
                  } else if (unit === 'M') {
                    speed *= 1000000;
                  } else if (unit === 'K') {
                    speed *= 1000;
                  }
                  
                  info.speed = speed;
                }
              }
            }
          } catch (err) {
            // Ignore parsing error
          }
        } else {
          info.operstate = 'unknown';
        }
      } catch (err) {
        info.operstate = 'unknown';
      }
    }
  } catch (err) {
    console.error(`Error getting additional info for ${interfaceName}:`, err);
  }
  
  return info;
}