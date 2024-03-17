[node-system-stats](README.md) / Exports

# node-system-stats

## Table of contents

### Modules

- [\<internal\>](modules/internal_.md)

### Interfaces

- [ICallback](interfaces/ICallback.md)
- [IOptsInput](interfaces/IOptsInput.md)
- [IOptsInternal](interfaces/IOptsInternal.md)
- [MemoryUsageReturn](interfaces/MemoryUsageReturn.md)
- [pJSON](interfaces/pJSON.md)
- [pJsonRepo](interfaces/pJsonRepo.md)

### Variables

- [PID](modules.md#pid)
- [cpuModel](modules.md#cpumodel)
- [name](modules.md#name)
- [platform](modules.md#platform)
- [totalCores](modules.md#totalcores)
- [version](modules.md#version)

### Functions

- [avgClockMHz](modules.md#avgclockmhz)
- [clockMHz](modules.md#clockmhz)
- [showFreeMemory](modules.md#showfreememory)
- [showMemoryUsage](modules.md#showmemoryusage)
- [showTotalMemory](modules.md#showtotalmemory)
- [usagePercent](modules.md#usagepercent)

## Variables

### PID

• `Const` **PID**: `number` = `process.pid`

#### Defined in

src/node-system-stats.ts:75

___

### cpuModel

• `Const` **cpuModel**: `string`

#### Defined in

src/node-system-stats.ts:55

___

### name

• `Const` **name**: `string` = `packageJsonFile.name`

#### Defined in

src/node-system-stats.ts:65

___

### platform

• `Const` **platform**: [`Platform`](modules/internal_.md#platform) = `process.platform`

#### Defined in

src/node-system-stats.ts:70

___

### totalCores

• `Const` **totalCores**: `number`

#### Defined in

src/node-system-stats.ts:50

___

### version

• `Const` **version**: `string` = `packageJsonFile.version`

#### Defined in

src/node-system-stats.ts:60

## Functions

### avgClockMHz

▸ **avgClockMHz**(): `number`

This function shows the average Clock Frequency from all of the cores.

#### Returns

`number`

returns a number with the average Clock MHz over all cores

#### Defined in

src/node-system-stats.ts:109

___

### clockMHz

▸ **clockMHz**(`coreIndex?`): `number` \| `number`[]

This function returns the speed of all cores or only just the selected core.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coreIndex?` | `number` | The index of the core. It begins with 0. If not specified, it will return an array with all of the cores |

#### Returns

`number` \| `number`[]

A number of the speed of the core OR a array with all of the cores speeds.

#### Defined in

src/node-system-stats.ts:82

___

### showFreeMemory

▸ **showFreeMemory**(`convertedGB?`): `number`

This function is used to display the free memory that the system has. It can output in Gigabyte and Megabyte.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `convertedGB` | `boolean` | `false` | If the returned value should be in Gigabytes or in MB. If set to true, then it will output the Gigabyte value. |

#### Returns

`number`

The converted free Memory that is available.

**`Default`**

```ts
{false} Megabyte format.
```

#### Defined in

src/node-system-stats.ts:166

___

### showMemoryUsage

▸ **showMemoryUsage**(): [`MemoryUsageReturn`](interfaces/MemoryUsageReturn.md)

Shows the formmated Memory Usage information

#### Returns

[`MemoryUsageReturn`](interfaces/MemoryUsageReturn.md)

An object with every converted memory usage type in redable form.

#### Defined in

src/node-system-stats.ts:125

___

### showTotalMemory

▸ **showTotalMemory**(`convertedGB?`): `number`

This function is used to display the total memory that the system has. It can output in Gigabyte and Megabyte.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `convertedGB` | `boolean` | `false` | If the returned value should be in Gigabytes or in MB. If set to true, then it will output the Gigabyte value. |

#### Returns

`number`

The converted total Memory that is available.

**`Default`**

```ts
{false} Megabyte format.
```

#### Defined in

src/node-system-stats.ts:150

___

### usagePercent

▸ **usagePercent**(`optsInput?`): `Promise`\<[`ICallback`](interfaces/ICallback.md)\>

This function measures the CPU usage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `optsInput?` | [`IOptsInput`](interfaces/IOptsInput.md) | The options input |

#### Returns

`Promise`\<[`ICallback`](interfaces/ICallback.md)\>

returns a resolvable promise

#### Defined in

src/node-system-stats.ts:18
