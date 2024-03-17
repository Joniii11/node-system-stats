[node-system-stats](../README.md) / [Exports](../modules.md) / IOptsInput

# Interface: IOptsInput

## Table of contents

### Properties

- [coreIndex](IOptsInput.md#coreindex)
- [sampleMs](IOptsInput.md#samplems)

## Properties

### coreIndex

• `Optional` **coreIndex**: `number`

The index of the core to calculate the usage on. 
Can use any integer `coreIndex` such that `0 >= coreIndex < memStat.totalCores()`

**`Default`**

```ts
-1 (all cores)
```

#### Defined in

src/types/types.d.ts:8

___

### sampleMs

• `Optional` **sampleMs**: `number`

`sampleMs` is the amount of time to take till the measurement is over.

**`Default`**

```ts
1000 yes
```

#### Defined in

src/types/types.d.ts:14
