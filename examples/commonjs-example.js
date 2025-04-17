// Example of using the library with CommonJS

// For local development with the new structure
const systemStats = require('../lib/index.js');

// When published as a package, you would use:
// const systemStats = require('node-system-stats');

// Destructure specific features
const { 
  usagePercent, totalCores, cpuModel,
  showMemoryUsage, getMemoryInfo,
  getDiskInfo, formatBytes,
  getNetworkInterfaces, getPrimaryIpAddress,
  getBatteryInfo,
  getTopProcesses,
  SystemMonitor,
  getLoadAverage,
  getCpuTemperature,
  showTotalMemory,
  showFreeMemory,
  SystemInfoMonitor
} = systemStats;

async function main() {
  console.log('=== Node System Stats - CommonJS Example ===');
  
  // CPU information
  console.log('\n== CPU Information ==');
  console.log(`CPU Model: ${cpuModel}`);
  console.log(`Total Cores: ${totalCores}`);
  const loadAvg = getLoadAverage();
  console.log(`Load Average: ${loadAvg.oneMinute} (1m), ${loadAvg.fiveMinutes} (5m), ${loadAvg.fifteenMinutes} (15m)`);
  
  // Get CPU usage
  const cpuUsage = await usagePercent();
  console.log(`CPU Usage: ${cpuUsage.percent.toFixed(2)}%`);
  
  // Try to get CPU temperature
  try {
    const cpuTemp = await getCpuTemperature();
    if (cpuTemp) {
      console.log(`CPU Temperature: ${cpuTemp.main.toFixed(1)}°C`);
    }
  } catch (err) {
    console.log('CPU temperature not available');
  }
  
  // Memory information
  console.log('\n== Memory Information ==');
  const memInfo = getMemoryInfo();
  console.log(`Total Memory: ${formatBytes(memInfo.total.bytes)}`);
  console.log(`Used Memory: ${formatBytes(memInfo.used.bytes)} (${memInfo.percentUsed.toFixed(2)}%)`);
  console.log(`Free Memory: ${formatBytes(memInfo.free.bytes)}`);
  
  // Process memory usage
  const memUsage = showMemoryUsage();
  console.log('\n== Process Memory Usage ==');
  console.log(`RSS: ${memUsage.rss} MB`);
  console.log(`Heap Total: ${memUsage.heapTotal} MB`);
  console.log(`Heap Used: ${memUsage.heapUsed} MB`);
  
  // Disk information
  console.log('\n== Disk Information ==');
  const disks = await getDiskInfo();
  for (const disk of disks) {
    console.log(`\nDisk: ${disk.filesystem}`);
    console.log(`  Size: ${formatBytes(disk.size)}`);
    console.log(`  Used: ${formatBytes(disk.used)} (${disk.percentUsed}%)`);
    console.log(`  Available: ${formatBytes(disk.available)}`);
  }
  
  // Process information
  console.log('\n== Top Memory-Consuming Processes ==');
  try {
    const topMemProcesses = await getTopProcesses(3, 'memory');
    for (const proc of topMemProcesses) {
      console.log(`${proc.name} (PID ${proc.pid}): Memory ${formatBytes(proc.memory)} (${proc.memoryPercent.toFixed(1)}%)`);
    }
  } catch (err) {
    console.log('Process information not available');
  }
  
  // Current process info
  console.log('\n== Current Process Info ==');
  try {
    const processes = await getTopProcesses();
    const currentProc = processes.find(p => p.pid === process.pid);
    if (currentProc) {
      console.log(`Name: ${currentProc.name}`);
      console.log(`PID: ${currentProc.pid}`);
      console.log(`CPU Usage: ${currentProc.cpu.toFixed(1)}%`);
      console.log(`Memory Usage: ${formatBytes(currentProc.memory)}`);
    } else {
      console.log('Current process info not available');
    }
  } catch (err) {
    console.log('Current process info not available');
  }
  
  // Battery information
  console.log('\n== Battery Information ==');
  const battery = await getBatteryInfo();
  if (battery.hasBattery) {
    console.log(`Battery Level: ${battery.percent}%`);
    console.log(`Charging: ${battery.isCharging ? 'Yes' : 'No'}`);
  } else {
    console.log('No battery detected');
  }
  
  // Simple system monitoring
  console.log('\n== System Monitoring ==');
  console.log('Starting system monitor for 5 seconds...');
  
  const monitor = new SystemMonitor({ interval: 1000, maxHistory: 5 });
  
  monitor.on('data', (snapshot) => {
    process.stdout.write(`\rCPU: ${snapshot.cpu.usage.toFixed(1)}%, Memory: ${snapshot.memory.percentUsed.toFixed(1)}%`);
  });
  
  monitor.start(true);
  
  // Stop after 5 seconds
  await new Promise(resolve => setTimeout(resolve, 5000));
  monitor.stop();
  
  console.log('\n\nMonitoring complete!');
  
  // Try comprehensive monitoring if available
  if (SystemInfoMonitor) {
    try {
      console.log('\n== Comprehensive System Monitoring ==');
      console.log('Starting system info monitor for 5 seconds...');
      
      const infoMonitor = new SystemInfoMonitor({ 
        interval: 1000, 
        maxHistory: 5,
        includeNetwork: true,
        includeProcesses: true
      });
      
      infoMonitor.on('data', () => {
        const state = infoMonitor.getFormattedSystemState();
        if (state) {
          process.stdout.write(`\rCPU: ${state.cpu.usage}, Memory: ${state.memory.percentUsed}`);
        }
      });
      
      infoMonitor.start();
      
      // Stop after 5 seconds
      await new Promise(resolve => setTimeout(resolve, 5000));
      infoMonitor.stop();
      
      console.log('\n\nComprehensive monitoring complete!');
    } catch (err) {
      console.error('Comprehensive monitoring not available:', err.message);
    }
  }
  
  console.log('\nExample completed!');
}

main().catch(console.error);