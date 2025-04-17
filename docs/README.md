node-system-stats / [Exports](modules.md)

[![github actions][actions-image]][actions-url]

# Node-System-Stats v2.0.0

A comprehensive library for monitoring system statistics in Node.js applications. This library provides detailed information about CPU, memory, disk, network, battery, and running processes.

**Key Features:**
- CPU usage monitoring with per-core statistics
- Memory usage tracking
- Disk usage information
- Network traffic monitoring
- Battery status tracking
- Process monitoring
- CPU temperature readings
- Real-time system monitoring with history tracking

## Documentation

You can find detailed documentation for all types and functions [here](https://joniii11.github.io/node-system-stats/).

**Note:** This module primarily relies on the built-in `os` module, with some platform-specific commands for enhanced features, ensuring compatibility across all operating systems where Node.js runs.

## Installation

```bash
npm install node-system-stats
```

## Modular Structure & Dual Module Support

Node-System-Stats v2.0.0 now supports both ES Modules and CommonJS formats. You can import the library using either style:

### ES Modules (ESM)

```js
// Import everything
import * as systemStats from 'node-system-stats';

// Or import specific features
import { usagePercent, totalCores } from 'node-system-stats';
import { getDiskInfo } from 'node-system-stats/disk';
import { NetworkMonitor } from 'node-system-stats/network';
import { getTopProcesses } from 'node-system-stats/process';
import { SystemMonitor } from 'node-system-stats/monitor';
```

### CommonJS (CJS)

```js
// Import everything
const systemStats = require('node-system-stats');

// Or destructure specific features
const { usagePercent, totalCores } = require('node-system-stats');
const { getDiskInfo } = require('node-system-stats/disk');
const { NetworkMonitor } = require('node-system-stats/network');
const { getTopProcesses } = require('node-system-stats/process');
const { SystemMonitor } = require('node-system-stats/monitor');
```

The library is organized into logical modules for better code organization:

- `cpu` - CPU-related functionality
- `memory` - Memory-related functions
- `disk` - File system and disk usage
- `network` - Network interfaces and traffic monitoring
- `process` - Process information and monitoring
- `battery` - Battery status (if available)
- `monitor` - System monitoring utilities

## Basic CPU and Memory Examples

### CPU Usage

```js
// TypeScript: import { usagePercent } from "node-system-stats";
const { usagePercent } = require("node-system-stats");

async function checkCpu() {
  let result = { percent: 0 };

  try {
    result = await usagePercent();
    console.log(`CPU usage: ${result.percent}%, measured over ${result.seconds} seconds`);
    
    // Get specific core usage (core 0)
    const core0Usage = await usagePercent({ coreIndex: 0, sampleMs: 2000 });
    console.log(`Core 0 usage: ${core0Usage.percent}%`);
  } catch (err) {
    console.error(err);
  }
}

checkCpu();
```

### CPU Information

```js
// TypeScript: import { totalCores, cpuModel, avgClockMHz, clockMHz } from "node-system-stats";
const { totalCores, cpuModel, avgClockMHz, clockMHz } = require("node-system-stats");

// Get total number of cores
console.log(`Total cores: ${totalCores}`); // Output: 8 (includes hyper-threaded cores)
console.log(`Physical cores: ${totalCores / 2}`); // Output: 4 (on systems with hyper-threading)

// Get CPU model name
console.log(`CPU model: ${cpuModel}`);

// Get average clock speed of all cores
console.log(`Average clock speed: ${avgClockMHz()} MHz`);

// Get individual core clock speeds
const allSpeeds = clockMHz();
console.log("All core speeds:", allSpeeds);

// Get specific core speed
const core0Speed = clockMHz(0);
console.log(`Core 0 speed: ${core0Speed} MHz`);
```

### Memory Usage

```js
// TypeScript: import { showMemoryUsage, showTotalMemory, showFreeMemory } from "node-system-stats";
const { showMemoryUsage, showTotalMemory, showFreeMemory } = require("node-system-stats");

// Get detailed memory usage
const memUsage = showMemoryUsage();
console.log("Memory usage:", memUsage);
// Output: { rss: 35.06, heapTotal: 7.34, heapUsed: 6.08, external: 0.88, arrayBuffers: 0.11 }

// Get total system memory (in MB by default)
console.log(`Total system memory: ${showTotalMemory()} MB`);
// Or in GB
console.log(`Total system memory: ${showTotalMemory(true)} GB`);

// Get free system memory
console.log(`Free memory: ${showFreeMemory()} MB`);
console.log(`Free memory: ${showFreeMemory(true)} GB`);
```

## New Features in v2.0.0

### Disk Usage Information

```js
// TypeScript: import { getDiskInfo, formatBytes } from "node-system-stats";
const { getDiskInfo, formatBytes } = require("node-system-stats");

async function checkDisks() {
  try {
    // Get all disks
    const allDisks = await getDiskInfo();
    console.log("All disks:", allDisks);
    
    // Format disk size for better readability
    allDisks.forEach(disk => {
      console.log(`Disk ${disk.filesystem}:`);
      console.log(`  Total: ${formatBytes(disk.size)}`);
      console.log(`  Used: ${formatBytes(disk.used)} (${disk.percentUsed}%)`);
      console.log(`  Available: ${formatBytes(disk.available)}`);
    });
    
    // Check specific path
    const specificDisk = await getDiskInfo("C:\\Users");
    console.log("Specific path disk info:", specificDisk);
  } catch (err) {
    console.error(err);
  }
}

checkDisks();
```

### Network Information

```js
// TypeScript: import { getNetworkInterfaces, NetworkMonitor } from "node-system-stats";
const { getNetworkInterfaces, NetworkMonitor } = require("node-system-stats");

// Get static network interface information
const interfaces = getNetworkInterfaces();
console.log("Network interfaces:", interfaces);

// Monitor network traffic in real-time
const networkMonitor = new NetworkMonitor(1000); // Update every second

networkMonitor.on('data', (trafficData) => {
  trafficData.forEach(iface => {
    console.log(`Interface: ${iface.interface}`);
    console.log(`  Download: ${formatBytes(iface.bytesReceivedPerSec)}/s`);
    console.log(`  Upload: ${formatBytes(iface.bytesSentPerSec)}/s`);
  });
});

networkMonitor.start();

// Stop monitoring after 30 seconds
setTimeout(() => networkMonitor.stop(), 30000);
```

### CPU Temperature & Battery Information

```js
// TypeScript: import { getCpuTemperature, getBatteryInfo } from "node-system-stats";
const { getCpuTemperature, getBatteryInfo } = require("node-system-stats");

async function checkHardwareStatus() {
  try {
    // Get CPU temperature (if available)
    const temp = await getCpuTemperature();
    if (temp) {
      console.log(`CPU temperature: ${temp.main}°C`);
      console.log(`Individual cores: ${temp.cores.join('°C, ')}°C`);
    } else {
      console.log("CPU temperature information not available");
    }
    
    // Get battery information (if available)
    const battery = await getBatteryInfo();
    if (battery.hasBattery) {
      console.log(`Battery level: ${battery.percent}%`);
      console.log(`Charging: ${battery.isCharging ? 'Yes' : 'No'}`);
      if (battery.timeRemaining) {
        console.log(`Time remaining: ${Math.floor(battery.timeRemaining / 60)}h ${battery.timeRemaining % 60}m`);
      }
    } else {
      console.log("No battery detected");
    }
  } catch (err) {
    console.error(err);
  }
}

checkHardwareStatus();
```

### Process Monitoring

```js
// TypeScript: import { getTopProcesses } from "node-system-stats";
const { getTopProcesses } = require("node-system-stats");

async function monitorProcesses() {
  try {
    // Get top 5 CPU-intensive processes
    const cpuProcesses = await getTopProcesses(5, 'cpu');
    console.log("Top CPU processes:", cpuProcesses);
    
    // Get top 5 memory-intensive processes
    const memProcesses = await getTopProcesses(5, 'memory');
    console.log("Top memory processes:", memProcesses);
    
    // Display formatted process information
    console.log("Top CPU-intensive processes:");
    cpuProcesses.forEach(proc => {
      console.log(`${proc.name} (PID ${proc.pid}): CPU ${proc.cpu}%, Memory ${formatBytes(proc.memory)}`);
    });
  } catch (err) {
    console.error(err);
  }
}

monitorProcesses();
```

### Complete System Monitoring

```js
// TypeScript: import { SystemMonitor, formatBytes } from "node-system-stats";
const { SystemMonitor, formatBytes } = require("node-system-stats");

// Create a system monitor that updates every 2 seconds and keeps 30 data points
const monitor = new SystemMonitor({ 
  interval: 2000, 
  maxHistory: 30 
});

// Listen for new data
monitor.on('data', (snapshot) => {
  console.clear(); // Clear console to create a live dashboard effect
  
  console.log(`=== System Monitor ===`);
  console.log(`Time: ${new Date(snapshot.timestamp).toLocaleTimeString()}`);
  console.log(`\nCPU: ${snapshot.cpu.usage.toFixed(1)}%`);
  console.log(`Load average: ${snapshot.cpu.loadAverage.oneMinute.toFixed(2)}`);
  
  if (snapshot.cpu.temperature) {
    console.log(`CPU Temperature: ${snapshot.cpu.temperature.main}°C`);
  }
  
  console.log(`\nMemory:`);
  console.log(`  Used: ${formatBytes(snapshot.memory.used)} / ${formatBytes(snapshot.memory.total)}`);
  console.log(`  Free: ${formatBytes(snapshot.memory.free)}`);
  console.log(`  Usage: ${snapshot.memory.percentUsed.toFixed(1)}%`);
  
  if (snapshot.disks) {
    console.log(`\nDisk Usage:`);
    snapshot.disks.forEach(disk => {
      console.log(`  ${disk.filesystem}: ${disk.percentUsed}% used`);
    });
  }
  
  if (snapshot.battery && snapshot.battery.hasBattery) {
    console.log(`\nBattery: ${snapshot.battery.percent}% ${snapshot.battery.isCharging ? '(charging)' : ''}`);
  }
  
  if (snapshot.processes) {
    console.log(`\nTop Processes:`);
    snapshot.processes.slice(0, 3).forEach(proc => {
      console.log(`  ${proc.name}: CPU ${proc.cpu.toFixed(1)}%, Mem ${formatBytes(proc.memory)}`);
    });
  }
});

// Start monitoring with process information collection
monitor.start(true);

// Get statistics after running for a while
setTimeout(() => {
  const cpuStats = monitor.getCpuStats();
  const memoryStats = monitor.getMemoryStats();
  
  console.log("\n=== Statistics ===");
  console.log(`CPU Usage: Min ${cpuStats.min}%, Max ${cpuStats.max}%, Avg ${cpuStats.avg}%`);
  console.log(`Memory Usage: Min ${memoryStats.percentUsed.min}%, Max ${memoryStats.percentUsed.max}%, Avg ${memoryStats.percentUsed.avg}%`);
  
  // Stop monitoring after 60 seconds
  setTimeout(() => monitor.stop(), 30000);
}, 30000);
```

## API Overview

This library provides the following main categories of functionality:

1. **CPU Information**
   - `usagePercent()` - Get CPU usage percentage
   - `totalCores` - Get total number of CPU cores
   - `cpuModel` - Get CPU model name
   - `clockMHz()` - Get CPU clock speeds
   - `avgClockMHz()` - Get average clock speed
   - `getCpuTemperature()` - Get CPU temperature information

2. **Memory Information**
   - `showMemoryUsage()` - Get detailed memory usage
   - `showTotalMemory()` - Get total system memory
   - `showFreeMemory()` - Get available system memory

3. **Disk Information**
   - `getDiskInfo()` - Get disk usage information
   - `formatBytes()` - Format byte values to human-readable strings

4. **Network Information**
   - `getNetworkInterfaces()` - Get network interface details
   - `getLoadAverage()` - Get system load averages
   - `NetworkMonitor` - Monitor network traffic in real-time

5. **Battery Information**
   - `getBatteryInfo()` - Get battery status information

6. **Process Information**
   - `getTopProcesses()` - Get information about top resource-consuming processes

7. **System Monitoring**
   - `SystemMonitor` - Complete system monitoring with history tracking
   - `SystemInfoMonitor` - Comprehensive monitoring that combines all metrics

See the examples directory for complete examples of using each module.

## Platform Compatibility

While most functions work across all platforms (Windows, macOS, Linux), some advanced features like CPU temperature and battery information may have varying levels of detail depending on the operating system.

## Contributing

If you wish to contribute to the Node-System-Stats codebase or documentation, feel free to fork the repository and submit a pull request. We use ESLint to enforce a consistent coding style, so having that set up in your editor of choice is a great boon to your development process.

## License

MIT

[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/Math.clz32
[actions-url]: https://github.com/Joniii11/node-system-stats/actions
