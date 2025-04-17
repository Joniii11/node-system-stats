// Re-export monitoring utilities for convenience
export { SystemMonitor } from '../utils/monitor';
export { NetworkMonitor } from '../utils/network-monitor';
import { SystemMonitor } from '../utils/monitor';
import { NetworkMonitor } from '../utils/network-monitor';
import { MonitorOptions } from '../types/types';
import EventEmitter from 'events';
import { formatBytes } from '../utils/util';

/**
 * Comprehensive system monitoring that combines CPU, memory, disk, network, and process monitoring
 * @event 'data' - Emitted when new system data is collected
 * @event 'error' - Emitted when an error occurs
 */
export class SystemInfoMonitor extends EventEmitter {
  private systemMonitor: SystemMonitor;
  private networkMonitor: NetworkMonitor | null = null;
  private options: {
    interval: number;
    maxHistory: number;
    includeNetwork: boolean;
    includeProcesses: boolean;
  };
  private isRunning = false;

  /**
   * Create a new comprehensive system monitor
   * @param options Configuration options
   */
  constructor(options: {
    interval?: number;
    maxHistory?: number;
    includeNetwork?: boolean;
    includeProcesses?: boolean;
  } = {}) {
    super();
    
    this.options = {
      interval: options.interval || 5000,
      maxHistory: options.maxHistory || 60,
      includeNetwork: options.includeNetwork !== undefined ? options.includeNetwork : true,
      includeProcesses: options.includeProcesses !== undefined ? options.includeProcesses : true
    };

    // Create system monitor
    this.systemMonitor = new SystemMonitor({
      interval: this.options.interval,
      maxHistory: this.options.maxHistory
    });

    // Create network monitor if network monitoring is enabled
    if (this.options.includeNetwork) {
      this.networkMonitor = new NetworkMonitor(this.options.interval, this.options.maxHistory);
    }

    // Set up event listeners
    this.setupEventListeners();
  }

  /**
   * Start monitoring system metrics
   * @returns this instance for chaining
   */
  public start(): SystemInfoMonitor {
    if (this.isRunning) return this;
    
    this.isRunning = true;
    this.systemMonitor.start(this.options.includeProcesses);
    
    if (this.networkMonitor) {
      this.networkMonitor.start();
    }
    
    return this;
  }

  /**
   * Stop monitoring system metrics
   * @returns this instance for chaining
   */
  public stop(): SystemInfoMonitor {
    if (!this.isRunning) return this;
    
    this.systemMonitor.stop();
    
    if (this.networkMonitor) {
      this.networkMonitor.stop();
    }
    
    this.isRunning = false;
    return this;
  }

  /**
   * Get the current system state as a formatted object
   * @returns Current system state with formatted values
   */
  public getFormattedSystemState() {
    const snapshot = this.systemMonitor.getCurrentSnapshot();
    
    if (!snapshot) {
      return null;
    }
    
    let networkInfo = null;
    if (this.networkMonitor) {
      networkInfo = this.networkMonitor.getNetworkTraffic().map(iface => ({
        name: iface.interface,
        download: formatBytes(iface.bytesReceivedPerSec) + '/s',
        upload: formatBytes(iface.bytesSentPerSec) + '/s',
        totalReceived: formatBytes(iface.totalBytesReceived),
        totalSent: formatBytes(iface.totalBytesSent)
      }));
    }
    
    // Format the snapshot data with human-readable values
    return {
      time: new Date(snapshot.timestamp).toISOString(),
      cpu: {
        usage: `${snapshot.cpu.usage.toFixed(1)}%`,
        loadAverage: {
          oneMinute: snapshot.cpu.loadAverage.oneMinute.toFixed(2),
          fiveMinutes: snapshot.cpu.loadAverage.fiveMinutes.toFixed(2),
          fifteenMinutes: snapshot.cpu.loadAverage.fifteenMinutes.toFixed(2)
        },
        temperature: snapshot.cpu.temperature ? 
          `${snapshot.cpu.temperature.main.toFixed(1)}°C` : 'N/A'
      },
      memory: {
        used: formatBytes(snapshot.memory.used),
        free: formatBytes(snapshot.memory.free),
        total: formatBytes(snapshot.memory.total),
        percentUsed: `${snapshot.memory.percentUsed.toFixed(1)}%`,
        v8: {
          rss: `${snapshot.memory.v8.rss} MB`,
          heapTotal: `${snapshot.memory.v8.heapTotal} MB`,
          heapUsed: `${snapshot.memory.v8.heapUsed} MB`
        }
      },
      disks: snapshot.disks?.map(disk => ({
        filesystem: disk.filesystem,
        mountpoint: disk.mountpoint,
        used: formatBytes(disk.used),
        available: formatBytes(disk.available),
        size: formatBytes(disk.size),
        percentUsed: `${disk.percentUsed}%`
      })),
      processes: snapshot.processes?.slice(0, 5).map(proc => ({
        name: proc.name,
        pid: proc.pid,
        cpu: `${proc.cpu.toFixed(1)}%`,
        memory: formatBytes(proc.memory),
        memoryPercent: `${proc.memoryPercent.toFixed(1)}%`
      })),
      battery: snapshot.battery?.hasBattery ? {
        percent: `${snapshot.battery.percent}%`,
        isCharging: snapshot.battery.isCharging ? 'Yes' : 'No',
        timeRemaining: snapshot.battery.timeRemaining ? 
          `${Math.floor(snapshot.battery.timeRemaining / 60)}h ${snapshot.battery.timeRemaining % 60}m` : 'N/A'
      } : 'No battery',
      network: networkInfo
    };
  }

  /**
   * Clear history data
   * @returns this instance for chaining
   */
  public clearHistory(): SystemInfoMonitor {
    this.systemMonitor.clearHistory();
    
    if (this.networkMonitor) {
      this.networkMonitor.clearHistory();
    }
    
    return this;
  }

  /**
   * Set up event listeners for system and network monitors
   * @private
   */
  private setupEventListeners() {
    // Forward system monitor events
    this.systemMonitor.on('data', (data) => {
      this.emit('data', data);
    });
    
    this.systemMonitor.on('error', (error) => {
      this.emit('error', error);
    });
    
    // Forward network monitor events if available
    if (this.networkMonitor) {
      this.networkMonitor.on('data', (data) => {
        this.emit('network-data', data);
      });
      
      this.networkMonitor.on('error', (error) => {
        this.emit('network-error', error);
      });
    }
  }
}