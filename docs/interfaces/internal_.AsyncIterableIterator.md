[node-system-stats](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / AsyncIterableIterator

# Interface: AsyncIterableIterator\<T\>

[\<internal\>](../modules/internal_.md).AsyncIterableIterator

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`AsyncIterator`](internal_.AsyncIterator.md)\<`T`\>

  ↳ **`AsyncIterableIterator`**

## Table of contents

### Methods

- [[asyncIterator]](internal_.AsyncIterableIterator.md#[asynciterator])
- [next](internal_.AsyncIterableIterator.md#next)
- [return](internal_.AsyncIterableIterator.md#return)
- [throw](internal_.AsyncIterableIterator.md#throw)

## Methods

### [asyncIterator]

▸ **[asyncIterator]**(): [`AsyncIterableIterator`](internal_.AsyncIterableIterator.md)\<`T`\>

#### Returns

[`AsyncIterableIterator`](internal_.AsyncIterableIterator.md)\<`T`\>

#### Defined in

node_modules/typescript/lib/lib.es2018.asynciterable.d.ts:42

___

### next

▸ **next**(`...args`): `Promise`\<[`IteratorResult`](../modules/internal_.md#iteratorresult)\<`T`, `any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] \| [`undefined`] |

#### Returns

`Promise`\<[`IteratorResult`](../modules/internal_.md#iteratorresult)\<`T`, `any`\>\>

#### Inherited from

[AsyncIterator](internal_.AsyncIterator.md).[next](internal_.AsyncIterator.md#next)

#### Defined in

node_modules/typescript/lib/lib.es2018.asynciterable.d.ts:32

___

### return

▸ **return**(`value?`): `Promise`\<[`IteratorResult`](../modules/internal_.md#iteratorresult)\<`T`, `any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `any` |

#### Returns

`Promise`\<[`IteratorResult`](../modules/internal_.md#iteratorresult)\<`T`, `any`\>\>

#### Inherited from

[AsyncIterator](internal_.AsyncIterator.md).[return](internal_.AsyncIterator.md#return)

#### Defined in

node_modules/typescript/lib/lib.es2018.asynciterable.d.ts:33

___

### throw

▸ **throw**(`e?`): `Promise`\<[`IteratorResult`](../modules/internal_.md#iteratorresult)\<`T`, `any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `e?` | `any` |

#### Returns

`Promise`\<[`IteratorResult`](../modules/internal_.md#iteratorresult)\<`T`, `any`\>\>

#### Inherited from

[AsyncIterator](internal_.AsyncIterator.md).[throw](internal_.AsyncIterator.md#throw)

#### Defined in

node_modules/typescript/lib/lib.es2018.asynciterable.d.ts:34
