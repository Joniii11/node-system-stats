[node-system-stats](../README.md) / [Exports](../modules.md) / \<internal\>

# Module: \<internal\>

## Table of contents

### Namespaces

- [EventEmitter](internal_.EventEmitter.md)

### Classes

- [AsyncResource](../classes/internal_.AsyncResource.md)
- [EventEmitter](../classes/internal_.EventEmitter-1.md)
- [Timeout](../classes/internal_.Timeout.md)

### Interfaces

- [AbortSignal](../interfaces/internal_.AbortSignal.md)
- [AddEventListenerOptions](../interfaces/internal_.AddEventListenerOptions.md)
- [AsyncIterableIterator](../interfaces/internal_.AsyncIterableIterator.md)
- [AsyncIterator](../interfaces/internal_.AsyncIterator.md)
- [AsyncResourceOptions](../interfaces/internal_.AsyncResourceOptions.md)
- [BatteryInfo](../interfaces/internal_.BatteryInfo.md)
- [DiskDriveInfo](../interfaces/internal_.DiskDriveInfo.md)
- [Event](../interfaces/internal_.Event.md)
- [EventEmitter](../interfaces/internal_.EventEmitter-2.md)
- [EventEmitterOptions](../interfaces/internal_.EventEmitterOptions.md)
- [EventInit](../interfaces/internal_.EventInit.md)
- [EventListener](../interfaces/internal_.EventListener.md)
- [EventListenerObject](../interfaces/internal_.EventListenerObject.md)
- [EventListenerOptions](../interfaces/internal_.EventListenerOptions.md)
- [EventTarget](../interfaces/internal_.EventTarget.md)
- [InterfaceData](../interfaces/internal_.InterfaceData.md)
- [IteratorReturnResult](../interfaces/internal_.IteratorReturnResult.md)
- [IteratorYieldResult](../interfaces/internal_.IteratorYieldResult.md)
- [NetworkInterfaceInfo](../interfaces/internal_.NetworkInterfaceInfo.md)
- [NetworkStats](../interfaces/internal_.NetworkStats.md)
- [Object](../interfaces/internal_.Object.md)
- [PromiseLike](../interfaces/internal_.PromiseLike.md)
- [RefCounted](../interfaces/internal_.RefCounted.md)
- [StaticEventEmitterOptions](../interfaces/internal_.StaticEventEmitterOptions.md)
- [SystemSnapshot](../interfaces/internal_.SystemSnapshot.md)
- [Timer](../interfaces/internal_.Timer.md)
- [\_DOMEventTarget](../interfaces/internal_._DOMEventTarget.md)
- [\_NodeEventTarget](../interfaces/internal_._NodeEventTarget.md)
- [pJsonRepo](../interfaces/internal_.pJsonRepo.md)

### Type Aliases

- [AnyRest](internal_.md#anyrest)
- [Architecture](internal_.md#architecture)
- [Args](internal_.md#args)
- [DefaultEventMap](internal_.md#defaulteventmap)
- [EventMap](internal_.md#eventmap)
- [IteratorResult](internal_.md#iteratorresult)
- [Key](internal_.md#key)
- [Key2](internal_.md#key2)
- [Listener](internal_.md#listener)
- [Platform](internal_.md#platform)
- [PropertyKey](internal_.md#propertykey)
- [Record](internal_.md#record)
- [Required](internal_.md#required)
- [\_\_Event](internal_.md#__event)
- [\_\_EventTarget](internal_.md#__eventtarget)

### Variables

- [AbortSignal](internal_.md#abortsignal)
- [Event](internal_.md#event)
- [EventTarget](internal_.md#eventtarget)
- [Object](internal_.md#object)

## Type Aliases

### AnyRest

Ƭ **AnyRest**: [args: any[]]

#### Defined in

node_modules/@types/node/events.d.ts:98

___

### Architecture

Ƭ **Architecture**: ``"arm"`` \| ``"arm64"`` \| ``"ia32"`` \| ``"mips"`` \| ``"mipsel"`` \| ``"ppc"`` \| ``"ppc64"`` \| ``"riscv64"`` \| ``"s390"`` \| ``"s390x"`` \| ``"x64"``

#### Defined in

node_modules/@types/node/process.d.ts:63

___

### Args

Ƭ **Args**\<`K`, `T`\>: `T` extends [`DefaultEventMap`](internal_.md#defaulteventmap) ? [`AnyRest`](internal_.md#anyrest) : `K` extends keyof `T` ? `T`[`K`] : `never`

#### Type parameters

| Name |
| :------ |
| `K` |
| `T` |

#### Defined in

node_modules/@types/node/events.d.ts:99

___

### DefaultEventMap

Ƭ **DefaultEventMap**: [`never`]

#### Defined in

node_modules/@types/node/events.d.ts:97

___

### EventMap

Ƭ **EventMap**\<`T`\>: [`Record`](internal_.md#record)\<keyof `T`, `any`[]\> \| [`DefaultEventMap`](internal_.md#defaulteventmap)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

node_modules/@types/node/events.d.ts:96

___

### IteratorResult

Ƭ **IteratorResult**\<`T`, `TReturn`\>: [`IteratorYieldResult`](../interfaces/internal_.IteratorYieldResult.md)\<`T`\> \| [`IteratorReturnResult`](../interfaces/internal_.IteratorReturnResult.md)\<`TReturn`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `TReturn` | `any` |

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:39

___

### Key

Ƭ **Key**\<`K`, `T`\>: `T` extends [`DefaultEventMap`](internal_.md#defaulteventmap) ? `string` \| `symbol` : `K` \| keyof `T`

#### Type parameters

| Name |
| :------ |
| `K` |
| `T` |

#### Defined in

node_modules/@types/node/events.d.ts:102

___

### Key2

Ƭ **Key2**\<`K`, `T`\>: `T` extends [`DefaultEventMap`](internal_.md#defaulteventmap) ? `string` \| `symbol` : `K` & keyof `T`

#### Type parameters

| Name |
| :------ |
| `K` |
| `T` |

#### Defined in

node_modules/@types/node/events.d.ts:103

___

### Listener

Ƭ **Listener**\<`K`, `T`, `F`\>: `T` extends [`DefaultEventMap`](internal_.md#defaulteventmap) ? `F` : `K` extends keyof `T` ? `T`[`K`] extends `unknown`[] ? (...`args`: `T`[`K`]) => `void` : `never` : `never`

#### Type parameters

| Name |
| :------ |
| `K` |
| `T` |
| `F` |

#### Defined in

node_modules/@types/node/events.d.ts:104

___

### Platform

Ƭ **Platform**: ``"aix"`` \| ``"android"`` \| ``"darwin"`` \| ``"freebsd"`` \| ``"haiku"`` \| ``"linux"`` \| ``"openbsd"`` \| ``"sunos"`` \| ``"win32"`` \| ``"cygwin"`` \| ``"netbsd"``

#### Defined in

node_modules/@types/node/process.d.ts:51

___

### PropertyKey

Ƭ **PropertyKey**: `string` \| `number` \| `symbol`

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:108

___

### Record

Ƭ **Record**\<`K`, `T`\>: \{ [P in K]: T }

Construct a type with a set of properties K of type T

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `any` |
| `T` | `T` |

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1606

___

### Required

Ƭ **Required**\<`T`\>: \{ [P in keyof T]-?: T[P] }

Make all properties in T required

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1585

___

### \_\_Event

Ƭ **\_\_Event**: typeof `globalThis` extends \{ `Event`: `any` ; `onmessage`: `any`  } ? {} : \{ `bubbles`: `boolean` ; `cancelBubble`: () => `void` ; `cancelable`: `boolean` ; `composed`: `boolean` ; `currentTarget`: [`EventTarget`](../interfaces/internal_.EventTarget.md) \| ``null`` ; `defaultPrevented`: `boolean` ; `eventPhase`: ``0`` \| ``2`` ; `isTrusted`: `boolean` ; `returnValue`: `boolean` ; `srcElement`: [`EventTarget`](../interfaces/internal_.EventTarget.md) \| ``null`` ; `target`: [`EventTarget`](../interfaces/internal_.EventTarget.md) \| ``null`` ; `timeStamp`: `number` ; `type`: `string` ; `composedPath`: () => [EventTarget?] ; `preventDefault`: () => `void` ; `stopImmediatePropagation`: () => `void` ; `stopPropagation`: () => `void`  }

#### Defined in

node_modules/@types/node/dom-events.d.ts:11

___

### \_\_EventTarget

Ƭ **\_\_EventTarget**: typeof `globalThis` extends \{ `EventTarget`: `any` ; `onmessage`: `any`  } ? {} : \{ `addEventListener`: (`type`: `string`, `listener`: [`EventListener`](../interfaces/internal_.EventListener.md) \| [`EventListenerObject`](../interfaces/internal_.EventListenerObject.md), `options?`: `boolean` \| [`AddEventListenerOptions`](../interfaces/internal_.AddEventListenerOptions.md)) => `void` ; `dispatchEvent`: (`event`: [`Event`](../interfaces/internal_.Event.md)) => `boolean` ; `removeEventListener`: (`type`: `string`, `listener`: [`EventListener`](../interfaces/internal_.EventListener.md) \| [`EventListenerObject`](../interfaces/internal_.EventListenerObject.md), `options?`: `boolean` \| [`EventListenerOptions`](../interfaces/internal_.EventListenerOptions.md)) => `void`  }

#### Defined in

node_modules/@types/node/dom-events.d.ts:50

## Variables

### AbortSignal

• **AbortSignal**: `Object`

#### Call signature

• **new AbortSignal**(): [`AbortSignal`](../interfaces/internal_.AbortSignal.md)

##### Returns

[`AbortSignal`](../interfaces/internal_.AbortSignal.md)

#### Type declaration

| Name | Type |
| :------ | :------ |
| `prototype` | [`AbortSignal`](../interfaces/internal_.AbortSignal.md) |
| `abort` | (`reason?`: `any`) => [`AbortSignal`](../interfaces/internal_.AbortSignal.md) |
| `timeout` | (`milliseconds`: `number`) => [`AbortSignal`](../interfaces/internal_.AbortSignal.md) |

#### Defined in

node_modules/@types/node/globals.d.ts:77

node_modules/@types/node/globals.d.ts:93

___

### Event

• **Event**: `Object`

#### Call signature

• **new Event**(`type`, `eventInitDict?`): `Object`

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `eventInitDict?` | [`EventInit`](../interfaces/internal_.EventInit.md) |

##### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `bubbles` | `boolean` | This is not used in Node.js and is provided purely for completeness. |
| `cancelBubble` | () => `void` | - |
| `cancelable` | `boolean` | True if the event was created with the cancelable option |
| `composed` | `boolean` | This is not used in Node.js and is provided purely for completeness. |
| `currentTarget` | ``null`` \| [`EventTarget`](../interfaces/internal_.EventTarget.md) | Alias for event.target. |
| `defaultPrevented` | `boolean` | Is true if cancelable is true and event.preventDefault() has been called. |
| `eventPhase` | ``0`` \| ``2`` | This is not used in Node.js and is provided purely for completeness. |
| `isTrusted` | `boolean` | The `AbortSignal` "abort" event is emitted with `isTrusted` set to `true`. The value is `false` in all other cases. |
| `returnValue` | `boolean` | This is not used in Node.js and is provided purely for completeness. |
| `srcElement` | ``null`` \| [`EventTarget`](../interfaces/internal_.EventTarget.md) | Alias for event.target. |
| `target` | ``null`` \| [`EventTarget`](../interfaces/internal_.EventTarget.md) | The `EventTarget` dispatching the event |
| `timeStamp` | `number` | The millisecond timestamp when the Event object was created. |
| `type` | `string` | Returns the type of event, e.g. "click", "hashchange", or "submit". |
| `composedPath` | () => [EventTarget?] | Returns an array containing the current EventTarget as the only entry or empty if the event is not being dispatched. This is not used in Node.js and is provided purely for completeness. |
| `preventDefault` | () => `void` | Sets the `defaultPrevented` property to `true` if `cancelable` is `true`. |
| `stopImmediatePropagation` | () => `void` | Stops the invocation of event listeners after the current one completes. |
| `stopPropagation` | () => `void` | This is not used in Node.js and is provided purely for completeness. |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `prototype` | \{ `bubbles`: `boolean` ; `cancelBubble`: () => `void` ; `cancelable`: `boolean` ; `composed`: `boolean` ; `currentTarget`: ``null`` \| [`EventTarget`](../interfaces/internal_.EventTarget.md) ; `defaultPrevented`: `boolean` ; `eventPhase`: ``0`` \| ``2`` ; `isTrusted`: `boolean` ; `returnValue`: `boolean` ; `srcElement`: ``null`` \| [`EventTarget`](../interfaces/internal_.EventTarget.md) ; `target`: ``null`` \| [`EventTarget`](../interfaces/internal_.EventTarget.md) ; `timeStamp`: `number` ; `type`: `string` ; `composedPath`: () => [EventTarget?] ; `preventDefault`: () => `void` ; `stopImmediatePropagation`: () => `void` ; `stopPropagation`: () => `void`  } |
| `prototype.bubbles` | `boolean` |
| `prototype.cancelBubble` | () => `void` |
| `prototype.cancelable` | `boolean` |
| `prototype.composed` | `boolean` |
| `prototype.currentTarget` | ``null`` \| [`EventTarget`](../interfaces/internal_.EventTarget.md) |
| `prototype.defaultPrevented` | `boolean` |
| `prototype.eventPhase` | ``0`` \| ``2`` |
| `prototype.isTrusted` | `boolean` |
| `prototype.returnValue` | `boolean` |
| `prototype.srcElement` | ``null`` \| [`EventTarget`](../interfaces/internal_.EventTarget.md) |
| `prototype.target` | ``null`` \| [`EventTarget`](../interfaces/internal_.EventTarget.md) |
| `prototype.timeStamp` | `number` |
| `prototype.type` | `string` |
| `prototype.composedPath` | [object Object] |
| `prototype.preventDefault` | [object Object] |
| `prototype.stopImmediatePropagation` | [object Object] |
| `prototype.stopPropagation` | [object Object] |

#### Defined in

node_modules/@types/node/dom-events.d.ts:105

node_modules/@types/node/dom-events.d.ts:106

___

### EventTarget

• **EventTarget**: `Object`

#### Call signature

• **new EventTarget**(): `Object`

##### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `addEventListener` | (`type`: `string`, `listener`: [`EventListener`](../interfaces/internal_.EventListener.md) \| [`EventListenerObject`](../interfaces/internal_.EventListenerObject.md), `options?`: `boolean` \| [`AddEventListenerOptions`](../interfaces/internal_.AddEventListenerOptions.md)) => `void` |
| `dispatchEvent` | (`event`: [`Event`](../interfaces/internal_.Event.md)) => `boolean` |
| `removeEventListener` | (`type`: `string`, `listener`: [`EventListener`](../interfaces/internal_.EventListener.md) \| [`EventListenerObject`](../interfaces/internal_.EventListenerObject.md), `options?`: `boolean` \| [`EventListenerOptions`](../interfaces/internal_.EventListenerOptions.md)) => `void` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `prototype` | \{ `addEventListener`: (`type`: `string`, `listener`: [`EventListener`](../interfaces/internal_.EventListener.md) \| [`EventListenerObject`](../interfaces/internal_.EventListenerObject.md), `options?`: `boolean` \| [`AddEventListenerOptions`](../interfaces/internal_.AddEventListenerOptions.md)) => `void` ; `dispatchEvent`: (`event`: [`Event`](../interfaces/internal_.Event.md)) => `boolean` ; `removeEventListener`: (`type`: `string`, `listener`: [`EventListener`](../interfaces/internal_.EventListener.md) \| [`EventListenerObject`](../interfaces/internal_.EventListenerObject.md), `options?`: `boolean` \| [`EventListenerOptions`](../interfaces/internal_.EventListenerOptions.md)) => `void`  } |
| `prototype.addEventListener` | [object Object] |
| `prototype.dispatchEvent` | [object Object] |
| `prototype.removeEventListener` | [object Object] |

#### Defined in

node_modules/@types/node/dom-events.d.ts:116

node_modules/@types/node/dom-events.d.ts:117

___

### Object

• **Object**: `ObjectConstructor`

Provides functionality common to all JavaScript objects.

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:123

node_modules/typescript/lib/lib.es5.d.ts:270
