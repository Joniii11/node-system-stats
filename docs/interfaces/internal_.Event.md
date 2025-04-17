[node-system-stats](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / Event

# Interface: Event

[\<internal\>](../modules/internal_.md).Event

An event which takes place in the DOM.

## Hierarchy

- [`__Event`](../modules/internal_.md#__event)

  ↳ **`Event`**

## Table of contents

### Properties

- [bubbles](internal_.Event.md#bubbles)
- [cancelBubble](internal_.Event.md#cancelbubble)
- [cancelable](internal_.Event.md#cancelable)
- [composed](internal_.Event.md#composed)
- [currentTarget](internal_.Event.md#currenttarget)
- [defaultPrevented](internal_.Event.md#defaultprevented)
- [eventPhase](internal_.Event.md#eventphase)
- [isTrusted](internal_.Event.md#istrusted)
- [returnValue](internal_.Event.md#returnvalue)
- [srcElement](internal_.Event.md#srcelement)
- [target](internal_.Event.md#target)
- [timeStamp](internal_.Event.md#timestamp)
- [type](internal_.Event.md#type)

### Methods

- [composedPath](internal_.Event.md#composedpath)
- [preventDefault](internal_.Event.md#preventdefault)
- [stopImmediatePropagation](internal_.Event.md#stopimmediatepropagation)
- [stopPropagation](internal_.Event.md#stoppropagation)

## Properties

### bubbles

• `Readonly` **bubbles**: `boolean`

This is not used in Node.js and is provided purely for completeness.

#### Inherited from

\_\_Event.bubbles

#### Defined in

node_modules/@types/node/dom-events.d.ts:14

___

### cancelBubble

• **cancelBubble**: () => `void`

Alias for event.stopPropagation(). This is not used in Node.js and is provided purely for completeness.

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Inherited from

\_\_Event.cancelBubble

#### Defined in

node_modules/@types/node/dom-events.d.ts:16

___

### cancelable

• `Readonly` **cancelable**: `boolean`

True if the event was created with the cancelable option

#### Inherited from

\_\_Event.cancelable

#### Defined in

node_modules/@types/node/dom-events.d.ts:18

___

### composed

• `Readonly` **composed**: `boolean`

This is not used in Node.js and is provided purely for completeness.

#### Inherited from

\_\_Event.composed

#### Defined in

node_modules/@types/node/dom-events.d.ts:20

___

### currentTarget

• `Readonly` **currentTarget**: ``null`` \| [`EventTarget`](internal_.EventTarget.md)

Alias for event.target.

#### Inherited from

\_\_Event.currentTarget

#### Defined in

node_modules/@types/node/dom-events.d.ts:24

___

### defaultPrevented

• `Readonly` **defaultPrevented**: `boolean`

Is true if cancelable is true and event.preventDefault() has been called.

#### Inherited from

\_\_Event.defaultPrevented

#### Defined in

node_modules/@types/node/dom-events.d.ts:26

___

### eventPhase

• `Readonly` **eventPhase**: ``0`` \| ``2``

This is not used in Node.js and is provided purely for completeness.

#### Inherited from

\_\_Event.eventPhase

#### Defined in

node_modules/@types/node/dom-events.d.ts:28

___

### isTrusted

• `Readonly` **isTrusted**: `boolean`

The `AbortSignal` "abort" event is emitted with `isTrusted` set to `true`. The value is `false` in all other cases.

#### Inherited from

\_\_Event.isTrusted

#### Defined in

node_modules/@types/node/dom-events.d.ts:30

___

### returnValue

• **returnValue**: `boolean`

This is not used in Node.js and is provided purely for completeness.

#### Inherited from

\_\_Event.returnValue

#### Defined in

node_modules/@types/node/dom-events.d.ts:34

___

### srcElement

• `Readonly` **srcElement**: ``null`` \| [`EventTarget`](internal_.EventTarget.md)

Alias for event.target.

#### Inherited from

\_\_Event.srcElement

#### Defined in

node_modules/@types/node/dom-events.d.ts:36

___

### target

• `Readonly` **target**: ``null`` \| [`EventTarget`](internal_.EventTarget.md)

The `EventTarget` dispatching the event

#### Inherited from

\_\_Event.target

#### Defined in

node_modules/@types/node/dom-events.d.ts:42

___

### timeStamp

• `Readonly` **timeStamp**: `number`

The millisecond timestamp when the Event object was created.

#### Inherited from

\_\_Event.timeStamp

#### Defined in

node_modules/@types/node/dom-events.d.ts:44

___

### type

• `Readonly` **type**: `string`

Returns the type of event, e.g. "click", "hashchange", or "submit".

#### Inherited from

\_\_Event.type

#### Defined in

node_modules/@types/node/dom-events.d.ts:46

## Methods

### composedPath

▸ **composedPath**(): [EventTarget?]

Returns an array containing the current EventTarget as the only entry or empty if the event is not being dispatched. This is not used in Node.js and is provided purely for completeness.

#### Returns

[EventTarget?]

#### Inherited from

\_\_Event.composedPath

#### Defined in

node_modules/@types/node/dom-events.d.ts:22

___

### preventDefault

▸ **preventDefault**(): `void`

Sets the `defaultPrevented` property to `true` if `cancelable` is `true`.

#### Returns

`void`

#### Inherited from

\_\_Event.preventDefault

#### Defined in

node_modules/@types/node/dom-events.d.ts:32

___

### stopImmediatePropagation

▸ **stopImmediatePropagation**(): `void`

Stops the invocation of event listeners after the current one completes.

#### Returns

`void`

#### Inherited from

\_\_Event.stopImmediatePropagation

#### Defined in

node_modules/@types/node/dom-events.d.ts:38

___

### stopPropagation

▸ **stopPropagation**(): `void`

This is not used in Node.js and is provided purely for completeness.

#### Returns

`void`

#### Inherited from

\_\_Event.stopPropagation

#### Defined in

node_modules/@types/node/dom-events.d.ts:40
