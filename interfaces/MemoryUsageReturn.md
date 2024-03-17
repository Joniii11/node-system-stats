[node-system-stats](../README.md) / [Exports](../modules.md) / MemoryUsageReturn

# Interface: MemoryUsageReturn

## Table of contents

### Properties

- [arrayBuffers](MemoryUsageReturn.md#arraybuffers)
- [external](MemoryUsageReturn.md#external)
- [heapTotal](MemoryUsageReturn.md#heaptotal)
- [heapUsed](MemoryUsageReturn.md#heapused)
- [rss](MemoryUsageReturn.md#rss)

## Properties

### arrayBuffers

• **arrayBuffers**: `number`

`arrayBuffers` refers to memory allocated for `ArrayBuffers` and `SharedArrayBuffers`, including all Node.js `Buffers`. This is also included in the external value. When Node.js is used as an embedded library, this value may be 0 because allocations for `ArrayBuffers` may not be tracked in that case.

#### Defined in

src/types/types.d.ts:58

___

### external

• **external**: `number`

`external` refers to the memory usage of C++ objects bound to JavaScript objects managed by V8.

#### Defined in

src/types/types.d.ts:53

___

### heapTotal

• **heapTotal**: `number`

`heapTotal` refers to V8's memory usage in total.

#### Defined in

src/types/types.d.ts:43

___

### heapUsed

• **heapUsed**: `number`

`heapUsed` refers to the V8's memory usage in use

#### Defined in

src/types/types.d.ts:48

___

### rss

• **rss**: `number`

`rss`, Resident Set Size, is the amount of space occupied in the main memory device (that is a subset of the total allocated memory) for the process, including all C++ and JavaScript objects and code.

#### Defined in

src/types/types.d.ts:38
