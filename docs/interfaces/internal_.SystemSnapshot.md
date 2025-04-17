[node-system-stats](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / SystemSnapshot

# Interface: SystemSnapshot

[\<internal\>](../modules/internal_.md).SystemSnapshot

Snapshot of system state at a point in time

## Table of contents

### Properties

- [battery](internal_.SystemSnapshot.md#battery)
- [cpu](internal_.SystemSnapshot.md#cpu)
- [disks](internal_.SystemSnapshot.md#disks)
- [memory](internal_.SystemSnapshot.md#memory)
- [processes](internal_.SystemSnapshot.md#processes)
- [timestamp](internal_.SystemSnapshot.md#timestamp)

## Properties

### battery

• `Optional` **battery**: [`BatteryInfo`](internal_.BatteryInfo.md)

#### Defined in

src/utils/monitor.ts:35

___

### cpu

• **cpu**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `loadAverage` | \{ `cpuCount`: `number` = totalCores; `fifteenMinutes`: `number` ; `fiveMinutes`: `number` ; `oneMinute`: `number`  } |
| `loadAverage.cpuCount` | `number` |
| `loadAverage.fifteenMinutes` | `number` |
| `loadAverage.fiveMinutes` | `number` |
| `loadAverage.oneMinute` | `number` |
| `temperature` | ``null`` \| [`CpuTemperature`](CpuTemperature.md) |
| `usage` | `number` |

#### Defined in

src/utils/monitor.ts:16

___

### disks

• `Optional` **disks**: [`DiskDriveInfo`](internal_.DiskDriveInfo.md)[]

#### Defined in

src/utils/monitor.ts:34

___

### memory

• **memory**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `free` | `number` |
| `percentUsed` | `number` |
| `total` | `number` |
| `used` | `number` |
| `v8` | \{ `arrayBuffers`: `number` ; `external`: `number` ; `heapTotal`: `number` ; `heapUsed`: `number` ; `rss`: `number`  } |
| `v8.arrayBuffers` | `number` |
| `v8.external` | `number` |
| `v8.heapTotal` | `number` |
| `v8.heapUsed` | `number` |
| `v8.rss` | `number` |

#### Defined in

src/utils/monitor.ts:21

___

### processes

• `Optional` **processes**: [`ProcessInfo`](ProcessInfo.md)[]

#### Defined in

src/utils/monitor.ts:36

___

### timestamp

• **timestamp**: `number`

#### Defined in

src/utils/monitor.ts:15
