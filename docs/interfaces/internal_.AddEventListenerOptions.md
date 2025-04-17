[node-system-stats](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / AddEventListenerOptions

# Interface: AddEventListenerOptions

[\<internal\>](../modules/internal_.md).AddEventListenerOptions

## Hierarchy

- [`EventListenerOptions`](internal_.EventListenerOptions.md)

  ↳ **`AddEventListenerOptions`**

## Table of contents

### Properties

- [capture](internal_.AddEventListenerOptions.md#capture)
- [once](internal_.AddEventListenerOptions.md#once)
- [passive](internal_.AddEventListenerOptions.md#passive)

## Properties

### capture

• `Optional` **capture**: `boolean`

Not directly used by Node.js. Added for API completeness. Default: `false`.

#### Inherited from

[EventListenerOptions](internal_.EventListenerOptions.md).[capture](internal_.EventListenerOptions.md#capture)

#### Defined in

node_modules/@types/node/dom-events.d.ts:84

___

### once

• `Optional` **once**: `boolean`

When `true`, the listener is automatically removed when it is first invoked. Default: `false`.

#### Defined in

node_modules/@types/node/dom-events.d.ts:89

___

### passive

• `Optional` **passive**: `boolean`

When `true`, serves as a hint that the listener will not call the `Event` object's `preventDefault()` method. Default: false.

#### Defined in

node_modules/@types/node/dom-events.d.ts:91
