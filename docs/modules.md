[node-system-stats](README.md) / Exports

# node-system-stats

Node System Stats - A comprehensive library for system monitoring

This library provides a wide range of functionality for monitoring system resources
including CPU, memory, disk, network, processes, and more.

## Table of contents

### Modules

- [\<internal\>](modules/internal_.md)

### Interfaces

- [BatteryInfo](interfaces/BatteryInfo.md)
- [CpuTemperature](interfaces/CpuTemperature.md)
- [DiskDriveInfo](interfaces/DiskDriveInfo.md)
- [ICallback](interfaces/ICallback.md)
- [IOptsInput](interfaces/IOptsInput.md)
- [IOptsInternal](interfaces/IOptsInternal.md)
- [LoadAverageInfo](interfaces/LoadAverageInfo.md)
- [MemoryUsageReturn](interfaces/MemoryUsageReturn.md)
- [MonitorOptions](interfaces/MonitorOptions.md)
- [NetworkInterfaceInfo](interfaces/NetworkInterfaceInfo.md)
- [ProcessInfo](interfaces/ProcessInfo.md)
- [pJSON](interfaces/pJSON.md)

### Variables

- [cpuModel](modules.md#cpumodel)
- [platform](modules.md#platform)
- [totalCores](modules.md#totalcores)

### Functions

- [avgClockMHz](modules.md#avgclockmhz)
- [clockMHz](modules.md#clockmhz)
- [formatBytes](modules.md#formatbytes)
- [getBatteryInfo](modules.md#getbatteryinfo)
- [getBatteryPercent](modules.md#getbatterypercent)
- [getCpuTemperature](modules.md#getcputemperature)
- [getCurrentProcessInfo](modules.md#getcurrentprocessinfo)
- [getDiskInfo](modules.md#getdiskinfo)
- [getDownloadSpeed](modules.md#getdownloadspeed)
- [getDrives](modules.md#getdrives)
- [getFileSystemInfo](modules.md#getfilesysteminfo)
- [getLoadAverage](modules.md#getloadaverage)
- [getMemoryInfo](modules.md#getmemoryinfo)
- [getNetworkInterfaces](modules.md#getnetworkinterfaces)
- [getNetworkStats](modules.md#getnetworkstats)
- [getPrimaryInterface](modules.md#getprimaryinterface)
- [getPrimaryIpAddress](modules.md#getprimaryipaddress)
- [getProcessById](modules.md#getprocessbyid)
- [getProcessMemoryUsage](modules.md#getprocessmemoryusage)
- [getSwapInfo](modules.md#getswapinfo)
- [getTimeRemaining](modules.md#gettimeremaining)
- [getTopProcesses](modules.md#gettopprocesses)
- [getTotalBytesReceived](modules.md#gettotalbytesreceived)
- [getTotalBytesSent](modules.md#gettotalbytessent)
- [getUploadSpeed](modules.md#getuploadspeed)
- [hasBattery](modules.md#hasbattery)
- [isCharging](modules.md#ischarging)
- [isNetworkConnected](modules.md#isnetworkconnected)
- [pathExists](modules.md#pathexists)
- [showFreeMemory](modules.md#showfreememory)
- [showMemoryUsage](modules.md#showmemoryusage)
- [showTotalMemory](modules.md#showtotalmemory)
- [startNetworkMonitoring](modules.md#startnetworkmonitoring)
- [stopNetworkMonitoring](modules.md#stopnetworkmonitoring)
- [usagePercent](modules.md#usagepercent)

### Events

- [NetworkMonitor](classes/NetworkMonitor.md)
- [SystemInfoMonitor](classes/SystemInfoMonitor.md)
- [SystemMonitor](classes/SystemMonitor.md)

## Variables

### cpuModel

• `Const` **cpuModel**: `string`

CPU model name

#### Defined in

src/modules/cpu.ts:13

___

### platform

• `Const` **platform**: `Object`

Platform information with additional details

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `arch` | [`Architecture`](modules/internal_.md#architecture) | - |
| `cpuCores` | `number` | - |
| `cpuModel` | `string` | - |
| `freeMemory` | `number` | - |
| `homedir` | `string` | - |
| `hostname` | `string` | - |
| `isLinux` | `boolean` | Check if platform is Linux |
| `isMacOS` | `boolean` | Check if platform is macOS |
| `isWindows` | `boolean` | Check if platform is Windows |
| `networkInterfaces` | `number` | - |
| `nodeVersion` | `string` | - |
| `os` | [`Platform`](modules/internal_.md#platform) | - |
| `release` | `string` | - |
| `tmpdir` | `string` | - |
| `totalMemory` | `number` | - |
| `type` | `string` | - |
| `username` | `string` | - |

#### Defined in

src/utils/util.ts:114

___

### totalCores

• `Const` **totalCores**: `number`

Total number of CPU cores

#### Defined in

src/modules/cpu.ts:8

## Functions

### avgClockMHz

▸ **avgClockMHz**(): `number`

Get average clock speed across all CPU cores

#### Returns

`number`

Average clock speed in MHz

#### Defined in

src/modules/cpu.ts:94

___

### clockMHz

▸ **clockMHz**(`coreIndex?`): `number` \| `number`[]

Get CPU clock speed for all or a specific CPU core

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coreIndex?` | `number` | Optional core index (default: all cores) |

#### Returns

`number` \| `number`[]

CPU clock speed in MHz (average if no core specified)

#### Defined in

src/modules/cpu.ts:77

___

### formatBytes

▸ **formatBytes**(`bytes`, `decimals?`): `string`

Format bytes to human-readable string

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `bytes` | `number` | `undefined` | Number of bytes to format |
| `decimals` | `number` | `2` | Number of decimal places to include |

#### Returns

`string`

Formatted string

#### Defined in

src/utils/util.ts:43

___

### getBatteryInfo

▸ **getBatteryInfo**(): `Promise`\<[`BatteryInfo`](interfaces/internal_.BatteryInfo.md)\>

Get battery information

#### Returns

`Promise`\<[`BatteryInfo`](interfaces/internal_.BatteryInfo.md)\>

Promise resolving to battery information

#### Defined in

src/modules/battery.ts:23

___

### getBatteryPercent

▸ **getBatteryPercent**(): `Promise`\<`number`\>

Get battery percentage

#### Returns

`Promise`\<`number`\>

Promise resolving to the battery percentage (0-100) or 0 if not available

#### Defined in

src/modules/battery.ts:86

___

### getCpuTemperature

▸ **getCpuTemperature**(): `Promise`\<[`CpuTemperature`](interfaces/CpuTemperature.md) \| ``null``\>

Get CPU temperature (if available)

#### Returns

`Promise`\<[`CpuTemperature`](interfaces/CpuTemperature.md) \| ``null``\>

Promise resolving to CPU temperature information or null if not available

#### Defined in

src/modules/cpu.ts:104

___

### getCurrentProcessInfo

▸ **getCurrentProcessInfo**(): `Promise`\<[`ProcessInfo`](interfaces/ProcessInfo.md) \| ``null``\>

Gets information about the current Node.js process

#### Returns

`Promise`\<[`ProcessInfo`](interfaces/ProcessInfo.md) \| ``null``\>

Current process information

#### Defined in

src/modules/process.ts:204

___

### getDiskInfo

▸ **getDiskInfo**(`diskPath?`): `Promise`\<[`DiskDriveInfo`](interfaces/internal_.DiskDriveInfo.md)[]\>

Get disk usage information

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `diskPath?` | `string` | Optional path to check (default: current working directory) |

#### Returns

`Promise`\<[`DiskDriveInfo`](interfaces/internal_.DiskDriveInfo.md)[]\>

Promise resolving to an array of disk drive information objects

#### Defined in

src/modules/disk.ts:22

___

### getDownloadSpeed

▸ **getDownloadSpeed**(): `number`

Get the current download speed in bytes per second

#### Returns

`number`

Download speed in bytes per second or 0 if monitoring is not active

#### Defined in

src/modules/network.ts:143

___

### getDrives

▸ **getDrives**(): `Promise`\<`string`[]\>

Get all available disk drives

#### Returns

`Promise`\<`string`[]\>

Promise resolving to an array of disk drive paths

#### Defined in

src/modules/disk.ts:48

___

### getFileSystemInfo

▸ **getFileSystemInfo**(): `Promise`\<\{ `atomic`: `boolean` = true; `caseSensitive`: `boolean` ; `permissions`: `boolean` ; `symlinks`: `boolean` = false }\>

Get file system information

#### Returns

`Promise`\<\{ `atomic`: `boolean` = true; `caseSensitive`: `boolean` ; `permissions`: `boolean` ; `symlinks`: `boolean` = false }\>

Promise resolving to an object with file system capabilities

#### Defined in

src/modules/disk.ts:194

___

### getLoadAverage

▸ **getLoadAverage**(): `Object`

Get CPU load average

#### Returns

`Object`

Load average information

| Name | Type |
| :------ | :------ |
| `cpuCount` | `number` |
| `fifteenMinutes` | `number` |
| `fiveMinutes` | `number` |
| `oneMinute` | `number` |

#### Defined in

src/modules/cpu.ts:61

___

### getMemoryInfo

▸ **getMemoryInfo**(): `Object`

Get comprehensive memory information

#### Returns

`Object`

Object with detailed memory usage statistics in both bytes and formatted units

| Name | Type |
| :------ | :------ |
| `free` | \{ `bytes`: `number` ; `gb`: `number` ; `kb`: `number` ; `mb`: `number`  } |
| `free.bytes` | `number` |
| `free.gb` | `number` |
| `free.kb` | `number` |
| `free.mb` | `number` |
| `percentFree` | `number` |
| `percentUsed` | `number` |
| `total` | \{ `bytes`: `number` ; `gb`: `number` ; `kb`: `number` ; `mb`: `number`  } |
| `total.bytes` | `number` |
| `total.gb` | `number` |
| `total.kb` | `number` |
| `total.mb` | `number` |
| `used` | \{ `bytes`: `number` ; `gb`: `number` ; `kb`: `number` ; `mb`: `number`  } |
| `used.bytes` | `number` |
| `used.gb` | `number` |
| `used.kb` | `number` |
| `used.mb` | `number` |

#### Defined in

src/modules/memory.ts:49

___

### getNetworkInterfaces

▸ **getNetworkInterfaces**(): `Promise`\<[`NetworkInterfaceInfo`](interfaces/internal_.NetworkInterfaceInfo.md)[]\>

Get network interfaces information

#### Returns

`Promise`\<[`NetworkInterfaceInfo`](interfaces/internal_.NetworkInterfaceInfo.md)[]\>

Promise resolving to array of network interface information

#### Defined in

src/modules/network.ts:34

___

### getNetworkStats

▸ **getNetworkStats**(): [`NetworkStats`](interfaces/internal_.NetworkStats.md)[]

Get current network stats

#### Returns

[`NetworkStats`](interfaces/internal_.NetworkStats.md)[]

Network statistics array or empty array if monitoring is not active

#### Defined in

src/modules/network.ts:99

___

### getPrimaryInterface

▸ **getPrimaryInterface**(): `Promise`\<[`NetworkInterfaceInfo`](interfaces/internal_.NetworkInterfaceInfo.md) \| ``null``\>

Get the primary network interface

#### Returns

`Promise`\<[`NetworkInterfaceInfo`](interfaces/internal_.NetworkInterfaceInfo.md) \| ``null``\>

Promise resolving to the primary network interface or null if none found

#### Defined in

src/modules/network.ts:169

___

### getPrimaryIpAddress

▸ **getPrimaryIpAddress**(): `Promise`\<`string` \| ``null``\>

Get the primary IP address of the system

#### Returns

`Promise`\<`string` \| ``null``\>

Promise resolving to the primary IP address or null if none found

#### Defined in

src/modules/network.ts:198

___

### getProcessById

▸ **getProcessById**(`pid`): `Promise`\<[`ProcessInfo`](interfaces/ProcessInfo.md) \| ``null``\>

Gets information about a specific process by PID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pid` | `number` | Process ID to get information for |

#### Returns

`Promise`\<[`ProcessInfo`](interfaces/ProcessInfo.md) \| ``null``\>

Process information or null if not found

#### Defined in

src/modules/process.ts:132

___

### getProcessMemoryUsage

▸ **getProcessMemoryUsage**(): `Promise`\<`never`[]\>

Get memory usage per process

#### Returns

`Promise`\<`never`[]\>

Array of objects with process ID and memory usage

#### Defined in

src/modules/memory.ts:102

___

### getSwapInfo

▸ **getSwapInfo**(): `Promise`\<\{ `available`: `boolean` ; `free`: `number` = 0; `percentUsed`: `number` = 0; `total`: `number` = 0; `used`: `number` = 0 }\>

Get swap memory information (if available)

#### Returns

`Promise`\<\{ `available`: `boolean` ; `free`: `number` = 0; `percentUsed`: `number` = 0; `total`: `number` = 0; `used`: `number` = 0 }\>

Object with swap memory information or null if not available

#### Defined in

src/modules/memory.ts:78

___

### getTimeRemaining

▸ **getTimeRemaining**(): `Promise`\<`number`\>

Get battery time remaining in minutes

#### Returns

`Promise`\<`number`\>

Promise resolving to the battery time remaining in minutes or -1 if unknown

#### Defined in

src/modules/battery.ts:99

___

### getTopProcesses

▸ **getTopProcesses**(`limit?`, `sortBy?`): `Promise`\<[`ProcessInfo`](interfaces/ProcessInfo.md)[]\>

Gets information about the top processes by CPU or memory usage

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `limit?` | `number` | `10` | Maximum number of processes to return |
| `sortBy?` | ``"cpu"`` \| ``"memory"`` | `'cpu'` | Sort processes by CPU or memory usage |

#### Returns

`Promise`\<[`ProcessInfo`](interfaces/ProcessInfo.md)[]\>

Array of process information

#### Defined in

src/modules/process.ts:11

___

### getTotalBytesReceived

▸ **getTotalBytesReceived**(): `number`

Get the total bytes received since monitoring started

#### Returns

`number`

Number of bytes received or 0 if monitoring is not active

#### Defined in

src/modules/network.ts:121

___

### getTotalBytesSent

▸ **getTotalBytesSent**(): `number`

Get the total bytes sent since monitoring started

#### Returns

`number`

Number of bytes sent or 0 if monitoring is not active

#### Defined in

src/modules/network.ts:110

___

### getUploadSpeed

▸ **getUploadSpeed**(): `number`

Get the current upload speed in bytes per second

#### Returns

`number`

Upload speed in bytes per second or 0 if monitoring is not active

#### Defined in

src/modules/network.ts:132

___

### hasBattery

▸ **hasBattery**(): `Promise`\<`boolean`\>

Check if the system has a battery

#### Returns

`Promise`\<`boolean`\>

Promise resolving to a boolean indicating if a battery is present

#### Defined in

src/modules/battery.ts:60

___

### isCharging

▸ **isCharging**(): `Promise`\<`boolean`\>

Check if the battery is currently charging

#### Returns

`Promise`\<`boolean`\>

Promise resolving to a boolean indicating if the battery is charging

#### Defined in

src/modules/battery.ts:73

___

### isNetworkConnected

▸ **isNetworkConnected**(): `Promise`\<`boolean`\>

Check if the network connection is active

#### Returns

`Promise`\<`boolean`\>

Promise resolving to a boolean indicating if the network is connected

#### Defined in

src/modules/network.ts:154

___

### pathExists

▸ **pathExists**(`pathToCheck`): `Promise`\<`boolean`\>

Check if a path exists and is accessible

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pathToCheck` | `string` | Path to check |

#### Returns

`Promise`\<`boolean`\>

Promise resolving to a boolean indicating if the path exists and is accessible

#### Defined in

src/modules/disk.ts:78

___

### showFreeMemory

▸ **showFreeMemory**(`inGB?`): `number`

Get free system memory in MB or GB

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `inGB` | `boolean` | `false` | Whether to return the value in GB |

#### Returns

`number`

Free memory in MB or GB

#### Defined in

src/modules/memory.ts:37

___

### showMemoryUsage

▸ **showMemoryUsage**(): [`MemoryUsageReturn`](interfaces/MemoryUsageReturn.md)

Get process memory usage in MB

#### Returns

[`MemoryUsageReturn`](interfaces/MemoryUsageReturn.md)

Object with memory usage details

#### Defined in

src/modules/memory.ts:8

___

### showTotalMemory

▸ **showTotalMemory**(`inGB?`): `number`

Get total system memory in MB or GB

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `inGB` | `boolean` | `false` | Whether to return the value in GB |

#### Returns

`number`

Total memory in MB or GB

#### Defined in

src/modules/memory.ts:24

___

### startNetworkMonitoring

▸ **startNetworkMonitoring**(`updateInterval?`): `Promise`\<`void`\>

Start monitoring network traffic

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `updateInterval` | `number` | `1000` | Interval in milliseconds to update stats (default: 1000) |

#### Returns

`Promise`\<`void`\>

Promise resolving when monitoring has started

#### Defined in

src/modules/network.ts:74

___

### stopNetworkMonitoring

▸ **stopNetworkMonitoring**(): `void`

Stop network monitoring

#### Returns

`void`

#### Defined in

src/modules/network.ts:89

___

### usagePercent

▸ **usagePercent**(`options?`): `Promise`\<[`ICallback`](interfaces/ICallback.md)\>

Get CPU usage percentage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`IOptsInput`](interfaces/IOptsInput.md) | Optional configuration |

#### Returns

`Promise`\<[`ICallback`](interfaces/ICallback.md)\>

Promise resolving to CPU usage percentage

#### Defined in

src/modules/cpu.ts:20
