import os from 'os';
import { EventEmitter } from 'events';

export interface NetworkStats {
  interface: string;
  bytesReceivedPerSec: number;
  bytesSentPerSec: number;
  totalBytesReceived: number;
  totalBytesSent: number;
}

interface InterfaceData {
  bytesReceived: number;
  bytesSent: number;
  lastBytesReceived: number;
  lastBytesSent: number;
  timestamps: number[];
  bytesReceivedHistory: number[];
  bytesSentHistory: number[];
}

/**
 * Class for monitoring network traffic across interfaces
 * @event data - Emitted when new network data is collected with NetworkStats[] as the payload
 * @event error - Emitted when an error occurs
 */
export class NetworkMonitor extends EventEmitter {
  private interval: number;
  private maxHistory: number;
  private timer: NodeJS.Timeout | null = null;
  private interfaceData = new Map<string, InterfaceData>();
  private lastCheck = 0;
  private isRunning = false;

  /**
   * Create a new NetworkMonitor
   * @param interval Milliseconds between checks (default: 1000)
   * @param maxHistory Maximum history points to keep (default: 60)
   */
  constructor(interval: number = 1000, maxHistory: number = 60) {
    super();
    this.interval = interval;
    this.maxHistory = maxHistory;
    this.initializeInterfaces();
  }

  /**
   * Start monitoring network interfaces
   */
  public start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.lastCheck = Date.now();
    
    this.timer = setInterval(() => {
      try {
        this.checkNetworkUsage();
      } catch (error) {
        this.emit('error', error);
      }
    }, this.interval);

    // Make timer unref to not keep process running just for this interval
    if (this.timer.unref) {
      this.timer.unref();
    }
  }

  /**
   * Stop monitoring network interfaces
   */
  public stop(): void {
    if (!this.isRunning) return;
    
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    
    this.isRunning = false;
  }

  /**
   * Get the current network traffic statistics
   * @returns Array of network interface stats
   */
  public getNetworkTraffic(): NetworkStats[] {
    const result: NetworkStats[] = [];
    
    for (const [interfaceName, data] of this.interfaceData.entries()) {
      const elapsedSec = Math.max(1, (Date.now() - this.lastCheck) / 1000);
      
      result.push({
        interface: interfaceName,
        bytesReceivedPerSec: (data.bytesReceived - data.lastBytesReceived) / elapsedSec,
        bytesSentPerSec: (data.bytesSent - data.lastBytesSent) / elapsedSec,
        totalBytesReceived: data.bytesReceived,
        totalBytesSent: data.bytesSent
      });
    }
    
    return result;
  }

  /**
   * Get the total bytes sent since monitoring started
   * @returns Number of bytes sent across all interfaces
   */
  public getTotalBytesSent(): number {
    let total = 0;
    for (const data of this.interfaceData.values()) {
      total += data.bytesSent;
    }
    return total;
  }

  /**
   * Get the total bytes received since monitoring started
   * @returns Number of bytes received across all interfaces
   */
  public getTotalBytesReceived(): number {
    let total = 0;
    for (const data of this.interfaceData.values()) {
      total += data.bytesReceived;
    }
    return total;
  }

  /**
   * Get the current upload speed in bytes per second
   * @returns Upload speed in bytes per second
   */
  public getUploadSpeed(): number {
    const stats = this.getNetworkTraffic();
    let totalSpeed = 0;
    
    for (const stat of stats) {
      totalSpeed += stat.bytesSentPerSec;
    }
    
    return totalSpeed;
  }

  /**
   * Get the current download speed in bytes per second
   * @returns Download speed in bytes per second
   */
  public getDownloadSpeed(): number {
    const stats = this.getNetworkTraffic();
    let totalSpeed = 0;
    
    for (const stat of stats) {
      totalSpeed += stat.bytesReceivedPerSec;
    }
    
    return totalSpeed;
  }

  /**
   * Get stats for all network interfaces
   * @returns Array of NetworkStats or null if monitoring is not active
   */
  public getStats(): NetworkStats[] {
    if (!this.isRunning) {
      return [];
    }
    return this.getNetworkTraffic();
  }

  /**
   * Get historical network traffic data
   * @returns Object with interface histories
   */
  public getHistory(): Record<string, { timestamps: number[], received: number[], sent: number[] }> {
    const result: Record<string, { timestamps: number[], received: number[], sent: number[] }> = {};
    
    for (const [interfaceName, data] of this.interfaceData.entries()) {
      result[interfaceName] = {
        timestamps: [...data.timestamps],
        received: [...data.bytesReceivedHistory],
        sent: [...data.bytesSentHistory]
      };
    }
    
    return result;
  }

  /**
   * Clear collected history data
   */
  public clearHistory(): void {
    for (const data of this.interfaceData.values()) {
      data.timestamps = [];
      data.bytesReceivedHistory = [];
      data.bytesSentHistory = [];
    }
  }

  /**
   * Initialize network interfaces data
   * @private
   */
  private initializeInterfaces(): void {
    const networkInterfaces = os.networkInterfaces();
    
    for (const [name, interfaces] of Object.entries(networkInterfaces)) {
      if (interfaces && interfaces.length > 0 && !this.interfaceData.has(name)) {
        this.interfaceData.set(name, {
          bytesReceived: 0,
          bytesSent: 0,
          lastBytesReceived: 0,
          lastBytesSent: 0,
          timestamps: [],
          bytesReceivedHistory: [],
          bytesSentHistory: []
        });
      }
    }
    
    // Initial reading (this will always return 0 for the first time)
    this.checkNetworkUsage(false);
  }

  /**
   * Check current network usage
   * @param emitEvent Whether to emit the 'data' event
   * @private
   */
  private checkNetworkUsage(emitEvent: boolean = true): void {
    // This is a stub since Node.js doesn't provide network traffic info directly
    // In a real implementation, this would use platform-specific commands
    // via child_process or a native addon to get actual traffic data
    
    // For now, we'll generate simulated data for demonstration
    const now = Date.now();
    const elapsedMs = now - this.lastCheck;
    this.lastCheck = now;
    
    const stats: NetworkStats[] = [];
    
    for (const [interfaceName, data] of this.interfaceData.entries()) {
      // Update last values
      data.lastBytesReceived = data.bytesReceived;
      data.lastBytesSent = data.bytesSent;
      
      // Generate some simulated network activity
      // In a real implementation, this would be actual data from the OS
      const rxIncrease = Math.floor(Math.random() * 100000); // Simulate received bytes
      const txIncrease = Math.floor(Math.random() * 50000);  // Simulate sent bytes
      
      data.bytesReceived += rxIncrease;
      data.bytesSent += txIncrease;
      
      // Calculate per-second rates
      const elapsedSec = Math.max(1, elapsedMs / 1000);
      const bytesReceivedPerSec = rxIncrease / elapsedSec;
      const bytesSentPerSec = txIncrease / elapsedSec;
      
      // Store in history
      data.timestamps.push(now);
      data.bytesReceivedHistory.push(bytesReceivedPerSec);
      data.bytesSentHistory.push(bytesSentPerSec);
      
      // Trim history if needed
      while (data.timestamps.length > this.maxHistory) {
        data.timestamps.shift();
        data.bytesReceivedHistory.shift();
        data.bytesSentHistory.shift();
      }
      
      // Add to results
      stats.push({
        interface: interfaceName,
        bytesReceivedPerSec,
        bytesSentPerSec,
        totalBytesReceived: data.bytesReceived,
        totalBytesSent: data.bytesSent
      });
    }
    
    // Emit event with the collected stats
    if (emitEvent) {
      this.emit('data', stats);
    }
  }
}