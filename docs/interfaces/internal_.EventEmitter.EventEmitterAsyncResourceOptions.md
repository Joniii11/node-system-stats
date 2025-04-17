[node-system-stats](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / [EventEmitter](../modules/internal_.EventEmitter.md) / EventEmitterAsyncResourceOptions

# Interface: EventEmitterAsyncResourceOptions

[\<internal\>](../modules/internal_.md).[EventEmitter](../modules/internal_.EventEmitter.md).EventEmitterAsyncResourceOptions

## Hierarchy

- [`AsyncResourceOptions`](internal_.AsyncResourceOptions.md)

- [`EventEmitterOptions`](internal_.EventEmitterOptions.md)

  ↳ **`EventEmitterAsyncResourceOptions`**

## Table of contents

### Properties

- [captureRejections](internal_.EventEmitter.EventEmitterAsyncResourceOptions.md#capturerejections)
- [name](internal_.EventEmitter.EventEmitterAsyncResourceOptions.md#name)
- [requireManualDestroy](internal_.EventEmitter.EventEmitterAsyncResourceOptions.md#requiremanualdestroy)
- [triggerAsyncId](internal_.EventEmitter.EventEmitterAsyncResourceOptions.md#triggerasyncid)

## Properties

### captureRejections

• `Optional` **captureRejections**: `boolean`

Enables automatic capturing of promise rejection.

#### Inherited from

[EventEmitterOptions](internal_.EventEmitterOptions.md).[captureRejections](internal_.EventEmitterOptions.md#capturerejections)

#### Defined in

node_modules/@types/node/events.d.ts:76

___

### name

• `Optional` **name**: `string`

The type of async event, this is required when instantiating `EventEmitterAsyncResource`
directly rather than as a child class.

**`Default`**

```ts
new.target.name if instantiated as a child class.
```

#### Defined in

node_modules/@types/node/events.d.ts:486

___

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

#### Inherited from

[AsyncResourceOptions](internal_.AsyncResourceOptions.md).[requireManualDestroy](internal_.AsyncResourceOptions.md#requiremanualdestroy)

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

#### Inherited from

[AsyncResourceOptions](internal_.AsyncResourceOptions.md).[triggerAsyncId](internal_.AsyncResourceOptions.md#triggerasyncid)

#### Defined in

node_modules/@types/node/async_hooks.d.ts:214
