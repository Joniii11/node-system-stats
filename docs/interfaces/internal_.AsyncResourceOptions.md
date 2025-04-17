[node-system-stats](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / AsyncResourceOptions

# Interface: AsyncResourceOptions

[\<internal\>](../modules/internal_.md).AsyncResourceOptions

## Hierarchy

- **`AsyncResourceOptions`**

  ↳ [`EventEmitterAsyncResourceOptions`](internal_.EventEmitter.EventEmitterAsyncResourceOptions.md)

## Table of contents

### Properties

- [requireManualDestroy](internal_.AsyncResourceOptions.md#requiremanualdestroy)
- [triggerAsyncId](internal_.AsyncResourceOptions.md#triggerasyncid)

## Properties

### requireManualDestroy

• `Optional` **requireManualDestroy**: `boolean`

Disables automatic `emitDestroy` when the object is garbage collected.
This usually does not need to be set (even if `emitDestroy` is called
manually), unless the resource's `asyncId` is retrieved and the
sensitive API's `emitDestroy` is called with it.

**`Default`**

```ts
false
```

#### Defined in

node_modules/@types/node/async_hooks.d.ts:222

___

### triggerAsyncId

• `Optional` **triggerAsyncId**: `number`

The ID of the execution context that created this async event.

**`Default`**

```ts
executionAsyncId()
```

#### Defined in

node_modules/@types/node/async_hooks.d.ts:214
