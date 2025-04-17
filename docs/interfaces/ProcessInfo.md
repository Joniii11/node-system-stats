[node-system-stats](../README.md) / [Exports](../modules.md) / ProcessInfo

# Interface: ProcessInfo

Interface for process information

## Table of contents

### Properties

- [cpu](ProcessInfo.md#cpu)
- [memory](ProcessInfo.md#memory)
- [memoryPercent](ProcessInfo.md#memorypercent)
- [name](ProcessInfo.md#name)
- [path](ProcessInfo.md#path)
- [pid](ProcessInfo.md#pid)
- [state](ProcessInfo.md#state)
- [uptime](ProcessInfo.md#uptime)

## Properties

### cpu

• **cpu**: `number`

CPU usage percentage (0-100)

#### Defined in

src/types/types.ts:199

___

### memory

• **memory**: `number`

Memory usage in bytes

#### Defined in

src/types/types.ts:204

___

### memoryPercent

• **memoryPercent**: `number`

Memory usage as percentage of total system memory

#### Defined in

src/types/types.ts:209

___

### name

• **name**: `string`

Process name

#### Defined in

src/types/types.ts:194

___

### path

• `Optional` **path**: `string`

Path to the executable

#### Defined in

src/types/types.ts:224

___

### pid

• **pid**: `number`

Process ID

#### Defined in

src/types/types.ts:189

___

### state

• `Optional` **state**: `string`

Process state/status

#### Defined in

src/types/types.ts:219

___

### uptime

• `Optional` **uptime**: `number`

Process uptime in seconds

#### Defined in

src/types/types.ts:214
