import { EventEmitter } from 'events';
import os from 'os';
import { MonitorOptions, ProcessInfo } from '../types/types';
import { usagePercent } from '../modules/cpu';
import { getMemoryInfo } from '../modules/memory';
import { getDiskInfo } from '../modules/disk';
import { getBatteryInfo } from '../modules/battery';
import { getTopProcesses } from '../modules/process';
import { getLoadAverage, getCpuTemperature } from '../modules/cpu';

/**
 * Snapshot of system state at a point in time
 */
interface SystemSnapshot {
  timestamp: number;
  cpu: {
    usage: number;
    loadAverage: ReturnType<typeof getLoadAverage>;
    temperature: Awaited<ReturnType<typeof getCpuTemperature>>;
  };
  memory: {
    total: number;
    free: number;
    used: number;
    percentUsed: number;
    v8: {
      rss: number;
      heapTotal: number;
      heapUsed: number;
      external: number;
      arrayBuffers: number;
    };
  };
  disks?: Awaited<ReturnType<typeof getDiskInfo>>;
  battery?: Awaited<ReturnType<typeof getBatteryInfo>>;
  processes?: ProcessInfo[];
}

/**
 * System monitoring class that collects and tracks system metrics
 * @event 'data' - Emitted when new system data is collected with SystemSnapshot as the payload
 * @event 'error' - Emitted when an error occurs
 */
export class SystemMonitor extends EventEmitter {
  private options: Required<MonitorOptions>;
  private snapshots: SystemSnapshot[] = [];
  private timer: NodeJS.Timeout | null = null;
  private isRunning = false;

  /**
   * Create a new system monitor
   * @param options Configuration options
   */
  constructor(options: MonitorOptions = {}) {
    super();
    this.options = {
      interval: options.interval || 5000,
      maxHistory: options.maxHistory || 60
    };
  }

  /**
   * Start monitoring system metrics
   * @param includeProcesses Whether to include process information in snapshots
   * @returns this instance for chaining
   */
  public start(includeProcesses: boolean = false): SystemMonitor {
    if (this.isRunning) return this;
    
    this.isRunning = true;
    
    // Take initial snapshot
    this.takeSystemSnapshot(includeProcesses);
    
    // Set up interval for subsequent snapshots
    this.timer = setInterval(() => {
      this.takeSystemSnapshot(includeProcesses);
    }, this.options.interval);
    
    // Make timer unref to not keep process running just for this interval
    if (this.timer.unref) {
      this.timer.unref();
    }
    
    return this;
  }

  /**
   * Stop monitoring system metrics
   * @returns this instance for chaining
   */
  public stop(): SystemMonitor {
    if (!this.isRunning) return this;
    
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    
    this.isRunning = false;
    return this;
  }

  /**
   * Check if monitoring is currently active
   * @returns Whether monitoring is running
   */
  public isActive(): boolean {
    return this.isRunning;
  }

  /**
   * Get the most recent system snapshot
   * @returns The latest system snapshot or null if no snapshots exist
   */
  public getCurrentSnapshot(): SystemSnapshot | null {
    return this.snapshots.length > 0 ? this.snapshots[this.snapshots.length - 1] : null;
  }

  /**
   * Get historical snapshots
   * @param limit Maximum number of snapshots to return (from most recent)
   * @returns Array of system snapshots
   */
  public getSnapshots(limit?: number): SystemSnapshot[] {
    if (limit === undefined) {
      return [...this.snapshots];
    }
    return this.snapshots.slice(-limit);
  }

  /**
   * Clear history data
   * @returns this instance for chaining
   */
  public clearHistory(): SystemMonitor {
    this.snapshots = [];
    return this;
  }

  /**
   * Get CPU usage statistics
   * @returns Object with min, max, and average CPU usage
   */
  public getCpuStats() {
    if (this.snapshots.length === 0) {
      return { min: 0, max: 0, avg: 0 };
    }
    
    const cpuValues = this.snapshots.map(s => s.cpu.usage);
    return {
      min: Math.min(...cpuValues),
      max: Math.max(...cpuValues),
      avg: cpuValues.reduce((sum, val) => sum + val, 0) / cpuValues.length
    };
  }

  /**
   * Get memory usage statistics
   * @returns Object with statistics about memory usage
   */
  public getMemoryStats() {
    if (this.snapshots.length === 0) {
      return {
        used: { min: 0, max: 0, avg: 0 },
        free: { min: 0, max: 0, avg: 0 },
        percentUsed: { min: 0, max: 0, avg: 0 }
      };
    }
    
    const usedValues = this.snapshots.map(s => s.memory.used);
    const freeValues = this.snapshots.map(s => s.memory.free);
    const percentValues = this.snapshots.map(s => s.memory.percentUsed);
    
    const calcStats = (values: number[]) => ({
      min: Math.min(...values),
      max: Math.max(...values),
      avg: values.reduce((sum, val) => sum + val, 0) / values.length
    });
    
    return {
      used: calcStats(usedValues),
      free: calcStats(freeValues),
      percentUsed: calcStats(percentValues)
    };
  }

  /**
   * Take a snapshot of the current system state
   * @param includeProcesses Whether to include process information
   * @private
   */
  private async takeSystemSnapshot(includeProcesses: boolean): Promise<void> {
    try {
      const now = Date.now();
      
      // Get CPU usage
      const cpuUsage = await usagePercent();
      const loadAverage = getLoadAverage();
      const temperature = await getCpuTemperature();
      
      // Get memory information
      const memInfo = getMemoryInfo();
      const procMemory = process.memoryUsage();
      
      // Create base snapshot
      const snapshot: SystemSnapshot = {
        timestamp: now,
        cpu: {
          usage: cpuUsage.percent,
          loadAverage,
          temperature
        },
        memory: {
          total: memInfo.total.bytes,
          free: memInfo.free.bytes,
          used: memInfo.used.bytes,
          percentUsed: memInfo.percentUsed,
          v8: {
            rss: Math.round((procMemory.rss / 1024 / 1024) * 100) / 100,
            heapTotal: Math.round((procMemory.heapTotal / 1024 / 1024) * 100) / 100,
            heapUsed: Math.round((procMemory.heapUsed / 1024 / 1024) * 100) / 100,
            external: Math.round((procMemory.external / 1024 / 1024) * 100) / 100,
            arrayBuffers: Math.round((procMemory.arrayBuffers / 1024 / 1024) * 100) / 100
          }
        }
      };
      
      // Get disk information
      try {
        snapshot.disks = await getDiskInfo();
      } catch (err) {
        // Disk info is optional, so we can continue without it
      }
      
      // Get battery information
      try {
        snapshot.battery = await getBatteryInfo();
      } catch (err) {
        // Battery info is optional, so we can continue without it
      }
      
      // Get process information if requested
      if (includeProcesses) {
        try {
          snapshot.processes = await getTopProcesses(10);
        } catch (err) {
          // Process info is optional, so we can continue without it
        }
      }
      
      // Add to history
      this.snapshots.push(snapshot);
      
      // Trim history if needed
      while (this.snapshots.length > this.options.maxHistory) {
        this.snapshots.shift();
      }
      
      // Emit data event with the snapshot
      this.emit('data', snapshot);
    } catch (error) {
      this.emit('error', error);
    }
  }
}