[node-system-stats](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / AbortSignal

# Interface: AbortSignal

[\<internal\>](../modules/internal_.md).AbortSignal

A signal object that allows you to communicate with a DOM request (such as a Fetch) and abort it if required via an AbortController object.

## Hierarchy

- [`EventTarget`](internal_.EventTarget.md)

  ↳ **`AbortSignal`**

## Table of contents

### Properties

- [aborted](internal_.AbortSignal.md#aborted)
- [onabort](internal_.AbortSignal.md#onabort)
- [reason](internal_.AbortSignal.md#reason)

### Methods

- [addEventListener](internal_.AbortSignal.md#addeventlistener)
- [dispatchEvent](internal_.AbortSignal.md#dispatchevent)
- [removeEventListener](internal_.AbortSignal.md#removeeventlistener)
- [throwIfAborted](internal_.AbortSignal.md#throwifaborted)

## Properties

### aborted

• `Readonly` **aborted**: `boolean`

Returns true if this AbortSignal's AbortController has signaled to abort, and false otherwise.

#### Defined in

node_modules/@types/node/globals.d.ts:81

___

### onabort

• **onabort**: ``null`` \| (`this`: [`AbortSignal`](internal_.AbortSignal.md), `event`: [`Event`](internal_.Event.md)) => `any`

#### Defined in

node_modules/@types/node/globals.d.ts:83

___

### reason

• `Readonly` **reason**: `any`

#### Defined in

node_modules/@types/node/globals.d.ts:82

## Methods

### addEventListener

▸ **addEventListener**(`type`, `listener`, `options?`): `void`

Adds a new handler for the `type` event. Any given `listener` is added only once per `type` and per `capture` option value.

If the `once` option is true, the `listener` is removed after the next time a `type` event is dispatched.

The `capture` option is not used by Node.js in any functional way other than tracking registered event listeners per the `EventTarget` specification.
Specifically, the `capture` option is used as part of the key when registering a `listener`.
Any individual `listener` may be added once with `capture = false`, and once with `capture = true`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | [`EventListener`](internal_.EventListener.md) \| [`EventListenerObject`](internal_.EventListenerObject.md) |
| `options?` | `boolean` \| [`AddEventListenerOptions`](internal_.AddEventListenerOptions.md) |

#### Returns

`void`

#### Inherited from

[EventTarget](internal_.EventTarget.md).[addEventListener](internal_.EventTarget.md#addeventlistener)

#### Defined in

node_modules/@types/node/dom-events.d.ts:61

___

### dispatchEvent

▸ **dispatchEvent**(`event`): `boolean`

Dispatches a synthetic event event to target and returns true if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Event`](internal_.Event.md) |

#### Returns

`boolean`

#### Inherited from

[EventTarget](internal_.EventTarget.md).[dispatchEvent](internal_.EventTarget.md#dispatchevent)

#### Defined in

node_modules/@types/node/dom-events.d.ts:67

___

### removeEventListener

▸ **removeEventListener**(`type`, `listener`, `options?`): `void`

Removes the event listener in target's event listener list with the same type, callback, and options.

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | [`EventListener`](internal_.EventListener.md) \| [`EventListenerObject`](internal_.EventListenerObject.md) |
| `options?` | `boolean` \| [`EventListenerOptions`](internal_.EventListenerOptions.md) |

#### Returns

`void`

#### Inherited from

[EventTarget](internal_.EventTarget.md).[removeEventListener](internal_.EventTarget.md#removeeventlistener)

#### Defined in

node_modules/@types/node/dom-events.d.ts:69

___

### throwIfAborted

▸ **throwIfAborted**(): `void`

#### Returns

`void`

#### Defined in

node_modules/@types/node/globals.d.ts:84
