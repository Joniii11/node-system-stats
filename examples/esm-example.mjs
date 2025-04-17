// Example of using the library with ES modules

// Method 1: Import the default export from the local library
import nodeSystemStats from '../lib/esm/index.js';

// Destructure what we need from it
const {
  usagePercent, 
  totalCores, 
  cpuModel,
  showMemoryUsage, 
  getMemoryInfo,
  getDiskInfo, 
  formatBytes,
  getNetworkInterfaces, 
  getPrimaryIpAddress,
  getBatteryInfo,
  getTopProcesses,
  SystemMonitor,
  NetworkMonitor
} = nodeSystemStats;

// When using as an installed package, you would use:
// import nodeSystemStats from 'node-system-stats';

async function main() {
  console.log('=== Node System Stats - ESM Example ===');
  
  // CPU information
  console.log('\n== CPU Information ==');
  console.log(`CPU Model: ${cpuModel}`);
  console.log(`Total Cores: ${totalCores}`);
  
  // Get CPU usage
  const cpuUsage = await usagePercent();
  console.log(`CPU Usage: ${cpuUsage.percent.toFixed(2)}%`);
  
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
  console.log(`External: ${memUsage.external} MB`);
  
  // Disk information
  console.log('\n== Disk Information ==');
  const disks = await getDiskInfo();
  for (const disk of disks) {
    console.log(`\nDisk: ${disk.filesystem}`);
    console.log(`  Mount Point: ${disk.mountpoint}`);
    console.log(`  Size: ${formatBytes(disk.size)}`);
    console.log(`  Used: ${formatBytes(disk.used)} (${disk.percentUsed}%)`);
    console.log(`  Available: ${formatBytes(disk.available)}`);
  }
  
  // Network information
  console.log('\n== Network Information ==');
  const primaryIp = getPrimaryIpAddress();
  console.log(`Primary IP: ${primaryIp || 'Not connected'}`);
  
  const interfaces = getNetworkInterfaces();
  for (const iface of interfaces) {
    console.log(`\nInterface: ${iface.name}`);
    for (const addr of iface.addresses) {
      console.log(`  Address: ${addr.address} (${addr.family})`);
      if (!addr.internal) {
        console.log(`  MAC: ${addr.mac}`);
      }
    }
  }
  
  // Battery information
  console.log('\n== Battery Information ==');
  const battery = await getBatteryInfo();
  if (battery.hasBattery) {
    console.log(`Battery Level: ${battery.percent}%`);
    console.log(`Charging: ${battery.isCharging ? 'Yes' : 'No'}`);
    if (battery.timeRemaining) {
      console.log(`Time Remaining: ${Math.floor(battery.timeRemaining / 60)}h ${battery.timeRemaining % 60}m`);
    }
  } else {
    console.log('No battery detected');
  }
  
  // Process information
  console.log('\n== Top CPU-Consuming Processes ==');
  const topCpuProcesses = await getTopProcesses(5, 'cpu');
  for (const proc of topCpuProcesses) {
    console.log(`${proc.name} (PID ${proc.pid}): CPU ${proc.cpu.toFixed(1)}%, Memory ${formatBytes(proc.memory)}`);
  }
  
  // System monitoring example
  console.log('\n== System Monitoring Demo ==');
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
  
  // Display stats
  const cpuStats = monitor.getCpuStats();
  const memStats = monitor.getMemoryStats();
  
  console.log('\n== Statistics Summary ==');
  console.log(`CPU Usage: Min ${cpuStats.min}%, Max ${cpuStats.max}%, Avg ${cpuStats.avg}%`);
  console.log(`Memory Usage: Min ${memStats.percentUsed.min}%, Max ${memStats.percentUsed.max}%, Avg ${memStats.percentUsed.avg}%`);
  
  console.log('\nExample completed!');
}

main().catch(console.error);