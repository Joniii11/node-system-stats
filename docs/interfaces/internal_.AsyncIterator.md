[node-system-stats](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / AsyncIterator

# Interface: AsyncIterator\<T, TReturn, TNext\>

[\<internal\>](../modules/internal_.md).AsyncIterator

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `TReturn` | `any` |
| `TNext` | `undefined` |

## Hierarchy

- **`AsyncIterator`**

  ↳ [`AsyncIterableIterator`](internal_.AsyncIterableIterator.md)

## Table of contents

### Methods

- [next](internal_.AsyncIterator.md#next)
- [return](internal_.AsyncIterator.md#return)
- [throw](internal_.AsyncIterator.md#throw)

## Methods

### next

▸ **next**(`...args`): `Promise`\<[`IteratorResult`](../modules/internal_.md#iteratorresult)\<`T`, `TReturn`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] \| [`TNext`] |

#### Returns

`Promise`\<[`IteratorResult`](../modules/internal_.md#iteratorresult)\<`T`, `TReturn`\>\>

#### Defined in

node_modules/typescript/lib/lib.es2018.asynciterable.d.ts:32

___

### return

▸ **return**(`value?`): `Promise`\<[`IteratorResult`](../modules/internal_.md#iteratorresult)\<`T`, `TReturn`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `TReturn` \| [`PromiseLike`](internal_.PromiseLike.md)\<`TReturn`\> |

#### Returns

`Promise`\<[`IteratorResult`](../modules/internal_.md#iteratorresult)\<`T`, `TReturn`\>\>

#### Defined in

node_modules/typescript/lib/lib.es2018.asynciterable.d.ts:33

___

### throw

▸ **throw**(`e?`): `Promise`\<[`IteratorResult`](../modules/internal_.md#iteratorresult)\<`T`, `TReturn`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `e?` | `any` |

#### Returns

`Promise`\<[`IteratorResult`](../modules/internal_.md#iteratorresult)\<`T`, `TReturn`\>\>

#### Defined in

node_modules/typescript/lib/lib.es2018.asynciterable.d.ts:34
