[node-system-stats](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / Timeout

# Class: Timeout

[\<internal\>](../modules/internal_.md).Timeout

This object is created internally and is returned from `setTimeout()` and `setInterval()`. It can be passed to either `clearTimeout()` or `clearInterval()` in order to cancel the
scheduled actions.

By default, when a timer is scheduled using either `setTimeout()` or `setInterval()`, the Node.js event loop will continue running as long as the
timer is active. Each of the `Timeout` objects returned by these functions
export both `timeout.ref()` and `timeout.unref()` functions that can be used to
control this default behavior.

## Implements

- [`Timer`](../interfaces/internal_.Timer.md)

## Table of contents

### Constructors

- [constructor](internal_.Timeout.md#constructor)

### Methods

- [[dispose]](internal_.Timeout.md#[dispose])
- [[toPrimitive]](internal_.Timeout.md#[toprimitive])
- [hasRef](internal_.Timeout.md#hasref)
- [ref](internal_.Timeout.md#ref)
- [refresh](internal_.Timeout.md#refresh)
- [unref](internal_.Timeout.md#unref)

## Constructors

### constructor

• **new Timeout**(): [`Timeout`](internal_.Timeout.md)

#### Returns

[`Timeout`](internal_.Timeout.md)

## Methods

### [dispose]

▸ **[dispose]**(): `void`

Cancels the timeout.

#### Returns

`void`

**`Since`**

v20.5.0

#### Defined in

node_modules/@types/node/timers.d.ts:130

___

### [toPrimitive]

▸ **[toPrimitive]**(): `number`

#### Returns

`number`

#### Implementation of

[Timer](../interfaces/internal_.Timer.md).[[toPrimitive]](../interfaces/internal_.Timer.md#[toprimitive])

#### Defined in

node_modules/@types/node/timers.d.ts:125

___

### hasRef

▸ **hasRef**(): `boolean`

If true, the `Timeout` object will keep the Node.js event loop active.

#### Returns

`boolean`

**`Since`**

v11.0.0

#### Implementation of

[Timer](../interfaces/internal_.Timer.md).[hasRef](../interfaces/internal_.Timer.md#hasref)

#### Defined in

node_modules/@types/node/timers.d.ts:112

___

### ref

▸ **ref**(): `this`

When called, requests that the Node.js event loop _not_ exit so long as the`Timeout` is active. Calling `timeout.ref()` multiple times will have no effect.

By default, all `Timeout` objects are "ref'ed", making it normally unnecessary
to call `timeout.ref()` unless `timeout.unref()` had been called previously.

#### Returns

`this`

a reference to `timeout`

**`Since`**

v0.9.1

#### Implementation of

[Timer](../interfaces/internal_.Timer.md).[ref](../interfaces/internal_.Timer.md#ref)

#### Defined in

node_modules/@types/node/timers.d.ts:99

___

### refresh

▸ **refresh**(): `this`

Sets the timer's start time to the current time, and reschedules the timer to
call its callback at the previously specified duration adjusted to the current
time. This is useful for refreshing a timer without allocating a new
JavaScript object.

Using this on a timer that has already called its callback will reactivate the
timer.

#### Returns

`this`

a reference to `timeout`

**`Since`**

v10.2.0

#### Implementation of

[Timer](../interfaces/internal_.Timer.md).[refresh](../interfaces/internal_.Timer.md#refresh)

#### Defined in

node_modules/@types/node/timers.d.ts:124

___

### unref

▸ **unref**(): `this`

When called, the active `Timeout` object will not require the Node.js event loop
to remain active. If there is no other activity keeping the event loop running,
the process may exit before the `Timeout` object's callback is invoked. Calling`timeout.unref()` multiple times will have no effect.

#### Returns

`this`

a reference to `timeout`

**`Since`**

v0.9.1

#### Implementation of

[Timer](../interfaces/internal_.Timer.md).[unref](../interfaces/internal_.Timer.md#unref)

#### Defined in

node_modules/@types/node/timers.d.ts:107
