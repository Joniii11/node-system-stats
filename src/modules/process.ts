import os from 'os';
import { execAsync } from '../utils/util';
import { ProcessInfo } from '../types/types';

/**
 * Gets information about the top processes by CPU or memory usage
 * @param {number} [limit=10] Maximum number of processes to return
 * @param {'cpu'|'memory'} [sortBy='cpu'] Sort processes by CPU or memory usage
 * @returns {Promise<ProcessInfo[]>} Array of process information
 */
export async function getTopProcesses(limit: number = 10, sortBy: 'cpu' | 'memory' = 'cpu'): Promise<ProcessInfo[]> {
  try {
    const platform = process.platform;
    const result: ProcessInfo[] = [];
    
    if (platform === 'win32') {
      // Windows implementation
      const command = sortBy === 'cpu' 
        ? 'wmic process get ProcessId,Name,WorkingSetSize,UserModeTime,KernelModeTime /format:csv' 
        : 'wmic process get ProcessId,Name,WorkingSetSize /format:csv';
        
      const { stdout } = await execAsync(command);
      const lines = stdout.trim().split('\r\n').filter(line => line.length > 0);
      
      // Skip the header line
      const processes: ProcessInfo[] = [];
      const totalMemory = os.totalmem();
      const numCores = os.cpus().length;
      
      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',');
        
        if (sortBy === 'cpu' && parts.length >= 5) {
          // Format: Node,ProcessId,Name,WorkingSetSize,UserModeTime,KernelModeTime
          const pid = parseInt(parts[1], 10);
          const name = parts[2];
          const memory = parseInt(parts[3], 10);
          const userTime = parseInt(parts[4], 10);
          const kernelTime = parseInt(parts[5], 10);
          
          const totalTime = userTime + kernelTime;
          const uptime = os.uptime();
          const cpuPercent = (totalTime / 10000000) / uptime * 100 / numCores;
          
          processes.push({
            pid,
            name,
            cpu: parseFloat(cpuPercent.toFixed(1)),
            memory,
            memoryPercent: parseFloat(((memory / totalMemory) * 100).toFixed(1))
          });
        } 
        else if (sortBy === 'memory' && parts.length >= 4) {
          // Format: Node,ProcessId,Name,WorkingSetSize
          const pid = parseInt(parts[1], 10);
          const name = parts[2];
          const memory = parseInt(parts[3], 10);
          
          processes.push({
            pid,
            name,
            cpu: 0, // We don't have CPU info in this query
            memory,
            memoryPercent: parseFloat(((memory / totalMemory) * 100).toFixed(1))
          });
        }
      }
      
      // Sort and limit results
      processes.sort((a, b) => sortBy === 'cpu' ? b.cpu - a.cpu : b.memory - a.memory);
      return processes.slice(0, limit);
    } 
    else {
      // Unix-based systems (Linux, macOS)
      const command = sortBy === 'cpu'
        ? 'ps -ewwo pid,comm,pcpu,pmem,rss,state'
        : 'ps -ewwo pid,comm,pmem,pcpu,rss,state';
      
      const { stdout } = await execAsync(command);
      const lines = stdout.trim().split('\n');
      
      // Skip the header line
      const processes: ProcessInfo[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        const parts = line.split(/\s+/);
        
        if (parts.length >= 6) {
          let idx = 0;
          const pid = parseInt(parts[idx++], 10);
          const name = parts[idx++];
          
          let cpu, mem;
          if (sortBy === 'cpu') {
            cpu = parseFloat(parts[idx++]);
            mem = parseFloat(parts[idx++]);
          } else {
            mem = parseFloat(parts[idx++]);
            cpu = parseFloat(parts[idx++]);
          }
          
          const rss = parseInt(parts[idx++], 10) * 1024; // Convert KB to bytes
          const state = parts[idx++];
          
          processes.push({
            pid,
            name,
            cpu,
            memory: rss,
            memoryPercent: mem,
            state
          });
        }
      }
      
      // Sort and limit results
      processes.sort((a, b) => sortBy === 'cpu' ? b.cpu - a.cpu : b.memory - a.memory);
      return processes.slice(0, limit);
    }
  } catch (error) {
    console.error('Error getting top processes:', error);
    return [];
  }
}

/**
 * Gets information about a specific process by PID
 * @param {number} pid Process ID to get information for
 * @returns {Promise<ProcessInfo | null>} Process information or null if not found
 */
export async function getProcessById(pid: number): Promise<ProcessInfo | null> {
  try {
    const platform = process.platform;
    
    if (platform === 'win32') {
      const { stdout } = await execAsync(`wmic process where ProcessId=${pid} get ProcessId,Name,WorkingSetSize,UserModeTime,KernelModeTime /format:csv`);
      const lines = stdout.trim().split('\r\n').filter(line => line.length > 0);
      
      if (lines.length < 2) {
        return null;
      }
      
      const parts = lines[1].split(',');
      if (parts.length >= 5) {
        const totalMemory = os.totalmem();
        const name = parts[2];
        const memory = parseInt(parts[3], 10);
        const userTime = parseInt(parts[4], 10);
        const kernelTime = parseInt(parts[5], 10);
        
        const totalTime = userTime + kernelTime;
        const numCores = os.cpus().length;
        const uptime = os.uptime();
        const cpuPercent = (totalTime / 10000000) / uptime * 100 / numCores;
        
        return {
          pid,
          name,
          cpu: parseFloat(cpuPercent.toFixed(1)),
          memory,
          memoryPercent: parseFloat(((memory / totalMemory) * 100).toFixed(1))
        };
      }
    } else {
      const { stdout } = await execAsync(`ps -p ${pid} -o pid,comm,pcpu,pmem,rss,state`);
      const lines = stdout.trim().split('\n');
      
      if (lines.length < 2) {
        return null;
      }
      
      const parts = lines[1].trim().split(/\s+/);
      
      if (parts.length >= 6) {
        const name = parts[1];
        const cpu = parseFloat(parts[2]);
        const memPercent = parseFloat(parts[3]);
        const memory = parseInt(parts[4], 10) * 1024; // Convert KB to bytes
        const state = parts[5];
        
        return {
          pid,
          name,
          cpu,
          memory,
          memoryPercent: memPercent,
          state
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Error getting process ${pid}:`, error);
    return null;
  }
}

/**
 * Gets information about the current Node.js process
 * @returns {Promise<ProcessInfo | null>} Current process information
 */
export async function getCurrentProcessInfo(): Promise<ProcessInfo | null> {
  return getProcessById(process.pid);
}