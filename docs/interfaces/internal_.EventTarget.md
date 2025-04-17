[node-system-stats](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / EventTarget

# Interface: EventTarget

[\<internal\>](../modules/internal_.md).EventTarget

EventTarget is a DOM interface implemented by objects that can
receive events and may have listeners for them.

## Hierarchy

- [`__EventTarget`](../modules/internal_.md#__eventtarget)

  ↳ **`EventTarget`**

  ↳↳ [`AbortSignal`](internal_.AbortSignal.md)

## Table of contents

### Methods

- [addEventListener](internal_.EventTarget.md#addeventlistener)
- [dispatchEvent](internal_.EventTarget.md#dispatchevent)
- [removeEventListener](internal_.EventTarget.md#removeeventlistener)

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

\_\_EventTarget.addEventListener

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

\_\_EventTarget.dispatchEvent

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

\_\_EventTarget.removeEventListener

#### Defined in

node_modules/@types/node/dom-events.d.ts:69
