[node-system-stats](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / AsyncResource

# Class: AsyncResource

[\<internal\>](../modules/internal_.md).AsyncResource

The class `AsyncResource` is designed to be extended by the embedder's async
resources. Using this, users can easily trigger the lifetime events of their
own resources.

The `init` hook will trigger when an `AsyncResource` is instantiated.

The following is an overview of the `AsyncResource` API.

```js
import { AsyncResource, executionAsyncId } from 'node:async_hooks';

// AsyncResource() is meant to be extended. Instantiating a
// new AsyncResource() also triggers init. If triggerAsyncId is omitted then
// async_hook.executionAsyncId() is used.
const asyncResource = new AsyncResource(
  type, { triggerAsyncId: executionAsyncId(), requireManualDestroy: false },
);

// Run a function in the execution context of the resource. This will
// * establish the context of the resource
// * trigger the AsyncHooks before callbacks
// * call the provided function `fn` with the supplied arguments
// * trigger the AsyncHooks after callbacks
// * restore the original execution context
asyncResource.runInAsyncScope(fn, thisArg, ...args);

// Call AsyncHooks destroy callbacks.
asyncResource.emitDestroy();

// Return the unique ID assigned to the AsyncResource instance.
asyncResource.asyncId();

// Return the trigger ID for the AsyncResource instance.
asyncResource.triggerAsyncId();
```

## Hierarchy

- **`AsyncResource`**

  ↳ [`EventEmitterReferencingAsyncResource`](../interfaces/internal_.EventEmitter.EventEmitterReferencingAsyncResource.md)

## Table of contents

### Constructors

- [constructor](internal_.AsyncResource.md#constructor)

### Methods

- [asyncId](internal_.AsyncResource.md#asyncid)
- [bind](internal_.AsyncResource.md#bind)
- [emitDestroy](internal_.AsyncResource.md#emitdestroy)
- [runInAsyncScope](internal_.AsyncResource.md#runinasyncscope)
- [triggerAsyncId](internal_.AsyncResource.md#triggerasyncid)
- [bind](internal_.AsyncResource.md#bind-1)

## Constructors

### constructor

• **new AsyncResource**(`type`, `triggerAsyncId?`): [`AsyncResource`](internal_.AsyncResource.md)

AsyncResource() is meant to be extended. Instantiating a
new AsyncResource() also triggers init. If triggerAsyncId is omitted then
async_hook.executionAsyncId() is used.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | The type of async event. |
| `triggerAsyncId?` | `number` \| [`AsyncResourceOptions`](../interfaces/internal_.AsyncResourceOptions.md) | The ID of the execution context that created this async event (default: `executionAsyncId()`), or an AsyncResourceOptions object (since v9.3.0) |

#### Returns

[`AsyncResource`](internal_.AsyncResource.md)

#### Defined in

node_modules/@types/node/async_hooks.d.ts:271

## Methods

### asyncId

▸ **asyncId**(): `number`

#### Returns

`number`

The unique `asyncId` assigned to the resource.

#### Defined in

node_modules/@types/node/async_hooks.d.ts:315

___

### bind

▸ **bind**\<`Func`\>(`fn`): `Func`

Binds the given function to execute to this `AsyncResource`'s scope.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Func` | extends (...`args`: `any`[]) => `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | `Func` | The function to bind to the current `AsyncResource`. |

#### Returns

`Func`

**`Since`**

v14.8.0, v12.19.0

#### Defined in

node_modules/@types/node/async_hooks.d.ts:288

___

### emitDestroy

▸ **emitDestroy**(): `this`

Call all `destroy` hooks. This should only ever be called once. An error will
be thrown if it is called more than once. This **must** be manually called. If
the resource is left to be collected by the GC then the `destroy` hooks will
never be called.

#### Returns

`this`

A reference to `asyncResource`.

#### Defined in

node_modules/@types/node/async_hooks.d.ts:311

___

### runInAsyncScope

▸ **runInAsyncScope**\<`This`, `Result`\>(`fn`, `thisArg?`, `...args`): `Result`

Call the provided function with the provided arguments in the execution context
of the async resource. This will establish the context, trigger the AsyncHooks
before callbacks, call the function, trigger the AsyncHooks after callbacks, and
then restore the original execution context.

#### Type parameters

| Name |
| :------ |
| `This` |
| `Result` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | (`this`: `This`, ...`args`: `any`[]) => `Result` | The function to call in the execution context of this async resource. |
| `thisArg?` | `This` | The receiver to be used for the function call. |
| `...args` | `any`[] | Optional arguments to pass to the function. |

#### Returns

`Result`

**`Since`**

v9.6.0

#### Defined in

node_modules/@types/node/async_hooks.d.ts:299

___

### triggerAsyncId

▸ **triggerAsyncId**(): `number`

#### Returns

`number`

The same `triggerAsyncId` that is passed to the `AsyncResource` constructor.

#### Defined in

node_modules/@types/node/async_hooks.d.ts:319

___

### bind

▸ **bind**\<`Func`, `ThisArg`\>(`fn`, `type?`, `thisArg?`): `Func`

Binds the given function to the current execution context.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Func` | extends (`this`: `ThisArg`, ...`args`: `any`[]) => `any` |
| `ThisArg` | `ThisArg` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | `Func` | The function to bind to the current execution context. |
| `type?` | `string` | An optional name to associate with the underlying `AsyncResource`. |
| `thisArg?` | `ThisArg` | - |

#### Returns

`Func`

**`Since`**

v14.8.0, v12.19.0

#### Defined in

node_modules/@types/node/async_hooks.d.ts:278
