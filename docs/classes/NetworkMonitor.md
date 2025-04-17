[node-system-stats](../README.md) / [Exports](../modules.md) / NetworkMonitor

# Class: NetworkMonitor

Class for monitoring network traffic across interfaces
 data - Emitted when new network data is collected with NetworkStats[] as the payload
 error - Emitted when an error occurs

## Hierarchy

- [`EventEmitter`](internal_.EventEmitter-1.md)

  ↳ **`NetworkMonitor`**

## Table of contents

### Constructors

- [constructor](NetworkMonitor.md#constructor)

### Properties

- [interfaceData](NetworkMonitor.md#interfacedata)
- [interval](NetworkMonitor.md#interval)
- [isRunning](NetworkMonitor.md#isrunning)
- [lastCheck](NetworkMonitor.md#lastcheck)
- [maxHistory](NetworkMonitor.md#maxhistory)
- [timer](NetworkMonitor.md#timer)
- [captureRejectionSymbol](NetworkMonitor.md#capturerejectionsymbol)
- [captureRejections](NetworkMonitor.md#capturerejections)
- [defaultMaxListeners](NetworkMonitor.md#defaultmaxlisteners)
- [errorMonitor](NetworkMonitor.md#errormonitor)

### Methods

- [[captureRejectionSymbol]](NetworkMonitor.md#[capturerejectionsymbol])
- [addListener](NetworkMonitor.md#addlistener)
- [checkNetworkUsage](NetworkMonitor.md#checknetworkusage)
- [clearHistory](NetworkMonitor.md#clearhistory)
- [emit](NetworkMonitor.md#emit)
- [eventNames](NetworkMonitor.md#eventnames)
- [getDownloadSpeed](NetworkMonitor.md#getdownloadspeed)
- [getHistory](NetworkMonitor.md#gethistory)
- [getMaxListeners](NetworkMonitor.md#getmaxlisteners)
- [getNetworkTraffic](NetworkMonitor.md#getnetworktraffic)
- [getStats](NetworkMonitor.md#getstats)
- [getTotalBytesReceived](NetworkMonitor.md#gettotalbytesreceived)
- [getTotalBytesSent](NetworkMonitor.md#gettotalbytessent)
- [getUploadSpeed](NetworkMonitor.md#getuploadspeed)
- [initializeInterfaces](NetworkMonitor.md#initializeinterfaces)
- [listenerCount](NetworkMonitor.md#listenercount)
- [listeners](NetworkMonitor.md#listeners)
- [off](NetworkMonitor.md#off)
- [on](NetworkMonitor.md#on)
- [once](NetworkMonitor.md#once)
- [prependListener](NetworkMonitor.md#prependlistener)
- [prependOnceListener](NetworkMonitor.md#prependoncelistener)
- [rawListeners](NetworkMonitor.md#rawlisteners)
- [removeAllListeners](NetworkMonitor.md#removealllisteners)
- [removeListener](NetworkMonitor.md#removelistener)
- [setMaxListeners](NetworkMonitor.md#setmaxlisteners)
- [start](NetworkMonitor.md#start)
- [stop](NetworkMonitor.md#stop)
- [addAbortListener](NetworkMonitor.md#addabortlistener)
- [getEventListeners](NetworkMonitor.md#geteventlisteners)
- [getMaxListeners](NetworkMonitor.md#getmaxlisteners-1)
- [listenerCount](NetworkMonitor.md#listenercount-1)
- [on](NetworkMonitor.md#on-1)
- [once](NetworkMonitor.md#once-1)
- [setMaxListeners](NetworkMonitor.md#setmaxlisteners-1)

## Constructors

### constructor

• **new NetworkMonitor**(`interval?`, `maxHistory?`): [`NetworkMonitor`](NetworkMonitor.md)

Create a new NetworkMonitor

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `interval` | `number` | `1000` | Milliseconds between checks (default: 1000) |
| `maxHistory` | `number` | `60` | Maximum history points to keep (default: 60) |

#### Returns

[`NetworkMonitor`](NetworkMonitor.md)

#### Overrides

[EventEmitter](internal_.EventEmitter-1.md).[constructor](internal_.EventEmitter-1.md#constructor)

#### Defined in

src/utils/network-monitor.ts:40

## Properties

### interfaceData

• `Private` **interfaceData**: `Map`\<`string`, [`InterfaceData`](../interfaces/internal_.InterfaceData.md)\>

#### Defined in

src/utils/network-monitor.ts:31

___

### interval

• `Private` **interval**: `number`

#### Defined in

src/utils/network-monitor.ts:28

___

### isRunning

• `Private` **isRunning**: `boolean` = `false`

#### Defined in

src/utils/network-monitor.ts:33

___

### lastCheck

• `Private` **lastCheck**: `number` = `0`

#### Defined in

src/utils/network-monitor.ts:32

___

### maxHistory

• `Private` **maxHistory**: `number`

#### Defined in

src/utils/network-monitor.ts:29

___

### timer

• `Private` **timer**: ``null`` \| [`Timeout`](internal_.Timeout.md) = `null`

#### Defined in

src/utils/network-monitor.ts:30

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](internal_.EventEmitter-1.md#capturerejectionsymbol)

Value: `Symbol.for('nodejs.rejection')`

See how to write a custom `rejection handler`.

**`Since`**

v13.4.0, v12.16.0

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[captureRejectionSymbol](internal_.EventEmitter-1.md#capturerejectionsymbol)

#### Defined in

node_modules/@types/node/events.d.ts:419

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

Value: [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Change the default `captureRejections` option on all new `EventEmitter` objects.

**`Since`**

v13.4.0, v12.16.0

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[captureRejections](internal_.EventEmitter-1.md#capturerejections)

#### Defined in

node_modules/@types/node/events.d.ts:426

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

By default, a maximum of `10` listeners can be registered for any single
event. This limit can be changed for individual `EventEmitter` instances
using the `emitter.setMaxListeners(n)` method. To change the default
for _all_`EventEmitter` instances, the `events.defaultMaxListeners`property can be used. If this value is not a positive number, a `RangeError`is thrown.

Take caution when setting the `events.defaultMaxListeners` because the
change affects _all_`EventEmitter` instances, including those created before
the change is made. However, calling `emitter.setMaxListeners(n)` still has
precedence over `events.defaultMaxListeners`.

This is not a hard limit. The `EventEmitter` instance will allow
more listeners to be added but will output a trace warning to stderr indicating
that a "possible EventEmitter memory leak" has been detected. For any single`EventEmitter`, the `emitter.getMaxListeners()` and `emitter.setMaxListeners()`methods can be used to
temporarily avoid this warning:

```js
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.setMaxListeners(emitter.getMaxListeners() + 1);
emitter.once('event', () => {
  // do stuff
  emitter.setMaxListeners(Math.max(emitter.getMaxListeners() - 1, 0));
});
```

The `--trace-warnings` command-line flag can be used to display the
stack trace for such warnings.

The emitted warning can be inspected with `process.on('warning')` and will
have the additional `emitter`, `type`, and `count` properties, referring to
the event emitter instance, the event's name and the number of attached
listeners, respectively.
Its `name` property is set to `'MaxListenersExceededWarning'`.

**`Since`**

v0.11.2

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[defaultMaxListeners](internal_.EventEmitter-1.md#defaultmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:463

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](internal_.EventEmitter-1.md#errormonitor)

This symbol shall be used to install a listener for only monitoring `'error'`events. Listeners installed using this symbol are called before the regular`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an`'error'` event is emitted. Therefore, the process will still crash if no
regular `'error'` listener is installed.

**`Since`**

v13.6.0, v12.17.0

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[errorMonitor](internal_.EventEmitter-1.md#errormonitor)

#### Defined in

node_modules/@types/node/events.d.ts:412

## Methods

### [captureRejectionSymbol]

▸ **[captureRejectionSymbol]**\<`K`\>(`error`, `event`, `...args`): `void`

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |
| `event` | `string` \| `symbol` |
| `...args` | [`AnyRest`](../modules/internal_.md#anyrest) |

#### Returns

`void`

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[[captureRejectionSymbol]](internal_.EventEmitter-1.md#[capturerejectionsymbol])

#### Defined in

node_modules/@types/node/events.d.ts:129

___

### addListener

▸ **addListener**\<`K`\>(`eventName`, `listener`): `this`

Alias for `emitter.on(eventName, listener)`.

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`this`

**`Since`**

v0.1.26

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[addListener](internal_.EventEmitter-1.md#addlistener)

#### Defined in

node_modules/@types/node/events.d.ts:562

___

### checkNetworkUsage

▸ **checkNetworkUsage**(`emitEvent?`): `void`

Check current network usage

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `emitEvent` | `boolean` | `true` | Whether to emit the 'data' event |

#### Returns

`void`

#### Defined in

src/utils/network-monitor.ts:230

___

### clearHistory

▸ **clearHistory**(): `void`

Clear collected history data

#### Returns

`void`

#### Defined in

src/utils/network-monitor.ts:192

___

### emit

▸ **emit**\<`K`\>(`eventName`, `...args`): `boolean`

Synchronously calls each of the listeners registered for the event named`eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
import { EventEmitter } from 'node:events';
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `...args` | [`AnyRest`](../modules/internal_.md#anyrest) |

#### Returns

`boolean`

**`Since`**

v0.1.26

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[emit](internal_.EventEmitter-1.md#emit)

#### Defined in

node_modules/@types/node/events.d.ts:824

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
import { EventEmitter } from 'node:events';

const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

#### Returns

(`string` \| `symbol`)[]

**`Since`**

v6.0.0

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[eventNames](internal_.EventEmitter-1.md#eventnames)

#### Defined in

node_modules/@types/node/events.d.ts:887

___

### getDownloadSpeed

▸ **getDownloadSpeed**(): `number`

Get the current download speed in bytes per second

#### Returns

`number`

Download speed in bytes per second

#### Defined in

src/utils/network-monitor.ts:149

___

### getHistory

▸ **getHistory**(): [`Record`](../modules/internal_.md#record)\<`string`, \{ `received`: `number`[] ; `sent`: `number`[] ; `timestamps`: `number`[]  }\>

Get historical network traffic data

#### Returns

[`Record`](../modules/internal_.md#record)\<`string`, \{ `received`: `number`[] ; `sent`: `number`[] ; `timestamps`: `number`[]  }\>

Object with interface histories

#### Defined in

src/utils/network-monitor.ts:175

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](NetworkMonitor.md#defaultmaxlisteners).

#### Returns

`number`

**`Since`**

v1.0.0

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[getMaxListeners](internal_.EventEmitter-1.md#getmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:739

___

### getNetworkTraffic

▸ **getNetworkTraffic**(): [`NetworkStats`](../interfaces/internal_.NetworkStats.md)[]

Get the current network traffic statistics

#### Returns

[`NetworkStats`](../interfaces/internal_.NetworkStats.md)[]

Array of network interface stats

#### Defined in

src/utils/network-monitor.ts:88

___

### getStats

▸ **getStats**(): [`NetworkStats`](../interfaces/internal_.NetworkStats.md)[]

Get stats for all network interfaces

#### Returns

[`NetworkStats`](../interfaces/internal_.NetworkStats.md)[]

Array of NetworkStats or null if monitoring is not active

#### Defined in

src/utils/network-monitor.ts:164

___

### getTotalBytesReceived

▸ **getTotalBytesReceived**(): `number`

Get the total bytes received since monitoring started

#### Returns

`number`

Number of bytes received across all interfaces

#### Defined in

src/utils/network-monitor.ts:122

___

### getTotalBytesSent

▸ **getTotalBytesSent**(): `number`

Get the total bytes sent since monitoring started

#### Returns

`number`

Number of bytes sent across all interfaces

#### Defined in

src/utils/network-monitor.ts:110

___

### getUploadSpeed

▸ **getUploadSpeed**(): `number`

Get the current upload speed in bytes per second

#### Returns

`number`

Upload speed in bytes per second

#### Defined in

src/utils/network-monitor.ts:134

___

### initializeInterfaces

▸ **initializeInterfaces**(): `void`

Initialize network interfaces data

#### Returns

`void`

#### Defined in

src/utils/network-monitor.ts:204

___

### listenerCount

▸ **listenerCount**\<`K`\>(`eventName`, `listener?`): `number`

Returns the number of listeners listening for the event named `eventName`.
If `listener` is provided, it will return how many times the listener is found
in the list of the listeners of the event.

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event being listened for |
| `listener?` | `Function` | The event handler function |

#### Returns

`number`

**`Since`**

v3.2.0

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[listenerCount](internal_.EventEmitter-1.md#listenercount)

#### Defined in

node_modules/@types/node/events.d.ts:833

___

### listeners

▸ **listeners**\<`K`\>(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ]
```

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

**`Since`**

v0.1.26

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[listeners](internal_.EventEmitter-1.md#listeners)

#### Defined in

node_modules/@types/node/events.d.ts:752

___

### off

▸ **off**\<`K`\>(`eventName`, `listener`): `this`

Alias for `emitter.removeListener()`.

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`this`

**`Since`**

v10.0.0

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[off](internal_.EventEmitter-1.md#off)

#### Defined in

node_modules/@types/node/events.d.ts:712

___

### on

▸ **on**\<`K`\>(`eventName`, `listener`): `this`

Adds the `listener` function to the end of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

`this`

**`Since`**

v0.1.101

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[on](internal_.EventEmitter-1.md#on)

#### Defined in

node_modules/@types/node/events.d.ts:594

___

### once

▸ **once**\<`K`\>(`eventName`, `listener`): `this`

Adds a **one-time**`listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

`this`

**`Since`**

v0.3.0

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[once](internal_.EventEmitter-1.md#once)

#### Defined in

node_modules/@types/node/events.d.ts:624

___

### prependListener

▸ **prependListener**\<`K`\>(`eventName`, `listener`): `this`

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

`this`

**`Since`**

v6.0.0

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[prependListener](internal_.EventEmitter-1.md#prependlistener)

#### Defined in

node_modules/@types/node/events.d.ts:851

___

### prependOnceListener

▸ **prependOnceListener**\<`K`\>(`eventName`, `listener`): `this`

Adds a **one-time**`listener` function for the event named `eventName` to the _beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

`this`

**`Since`**

v6.0.0

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[prependOnceListener](internal_.EventEmitter-1.md#prependoncelistener)

#### Defined in

node_modules/@types/node/events.d.ts:867

___

### rawListeners

▸ **rawListeners**\<`K`\>(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

**`Since`**

v9.4.0

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[rawListeners](internal_.EventEmitter-1.md#rawlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:783

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): `this`

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

`this`

**`Since`**

v0.1.26

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[removeAllListeners](internal_.EventEmitter-1.md#removealllisteners)

#### Defined in

node_modules/@types/node/events.d.ts:723

___

### removeListener

▸ **removeListener**\<`K`\>(`eventName`, `listener`): `this`

Removes the specified `listener` from the listener array for the event named`eventName`.

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any`removeListener()` or `removeAllListeners()` calls _after_ emitting and _before_ the last listener finishes execution
will not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('event');
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit('event');
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')`listener is removed:

```js
import { EventEmitter } from 'node:events';
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`this`

**`Since`**

v0.1.26

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[removeListener](internal_.EventEmitter-1.md#removelistener)

#### Defined in

node_modules/@types/node/events.d.ts:707

___

### setMaxListeners

▸ **setMaxListeners**(`n`): `this`

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to`Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`this`

**`Since`**

v0.3.5

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[setMaxListeners](internal_.EventEmitter-1.md#setmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:733

___

### start

▸ **start**(): `void`

Start monitoring network interfaces

#### Returns

`void`

#### Defined in

src/utils/network-monitor.ts:50

___

### stop

▸ **stop**(): `void`

Stop monitoring network interfaces

#### Returns

`void`

#### Defined in

src/utils/network-monitor.ts:73

___

### addAbortListener

▸ **addAbortListener**(`signal`, `resource`): `Disposable`

Listens once to the `abort` event on the provided `signal`.

Listening to the `abort` event on abort signals is unsafe and may
lead to resource leaks since another third party with the signal can
call `e.stopImmediatePropagation()`. Unfortunately Node.js cannot change
this since it would violate the web standard. Additionally, the original
API makes it easy to forget to remove listeners.

This API allows safely using `AbortSignal`s in Node.js APIs by solving these
two issues by listening to the event such that `stopImmediatePropagation` does
not prevent the listener from running.

Returns a disposable so that it may be unsubscribed from more easily.

```js
import { addAbortListener } from 'node:events';

function example(signal) {
  let disposable;
  try {
    signal.addEventListener('abort', (e) => e.stopImmediatePropagation());
    disposable = addAbortListener(signal, (e) => {
      // Do something when signal is aborted.
    });
  } finally {
    disposable?.[Symbol.dispose]();
  }
}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `signal` | [`AbortSignal`](../interfaces/internal_.AbortSignal.md) |
| `resource` | (`event`: [`Event`](../interfaces/internal_.Event.md)) => `void` |

#### Returns

`Disposable`

Disposable that removes the `abort` listener.

**`Since`**

v20.5.0

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[addAbortListener](internal_.EventEmitter-1.md#addabortlistener)

#### Defined in

node_modules/@types/node/events.d.ts:404

___

### getEventListeners

▸ **getEventListeners**(`emitter`, `name`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

For `EventEmitter`s this behaves exactly the same as calling `.listeners` on
the emitter.

For `EventTarget`s this is the only way to get the event listeners for the
event target. This is useful for debugging and diagnostic purposes.

```js
import { getEventListeners, EventEmitter } from 'node:events';

{
  const ee = new EventEmitter();
  const listener = () => console.log('Events are fun');
  ee.on('foo', listener);
  console.log(getEventListeners(ee, 'foo')); // [ [Function: listener] ]
}
{
  const et = new EventTarget();
  const listener = () => console.log('Events are fun');
  et.addEventListener('foo', listener);
  console.log(getEventListeners(et, 'foo')); // [ [Function: listener] ]
}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | [`EventEmitter`](../interfaces/internal_.EventEmitter-2.md)\<[`DefaultEventMap`](../modules/internal_.md#defaulteventmap)\> \| [`_DOMEventTarget`](../interfaces/internal_._DOMEventTarget.md) |
| `name` | `string` \| `symbol` |

#### Returns

`Function`[]

**`Since`**

v15.2.0, v14.17.0

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[getEventListeners](internal_.EventEmitter-1.md#geteventlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:325

___

### getMaxListeners

▸ **getMaxListeners**(`emitter`): `number`

Returns the currently set max amount of listeners.

For `EventEmitter`s this behaves exactly the same as calling `.getMaxListeners` on
the emitter.

For `EventTarget`s this is the only way to get the max event listeners for the
event target. If the number of event handlers on a single EventTarget exceeds
the max set, the EventTarget will print a warning.

```js
import { getMaxListeners, setMaxListeners, EventEmitter } from 'node:events';

{
  const ee = new EventEmitter();
  console.log(getMaxListeners(ee)); // 10
  setMaxListeners(11, ee);
  console.log(getMaxListeners(ee)); // 11
}
{
  const et = new EventTarget();
  console.log(getMaxListeners(et)); // 10
  setMaxListeners(11, et);
  console.log(getMaxListeners(et)); // 11
}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | [`EventEmitter`](../interfaces/internal_.EventEmitter-2.md)\<[`DefaultEventMap`](../modules/internal_.md#defaulteventmap)\> \| [`_DOMEventTarget`](../interfaces/internal_._DOMEventTarget.md) |

#### Returns

`number`

**`Since`**

v19.9.0

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[getMaxListeners](internal_.EventEmitter-1.md#getmaxlisteners-1)

#### Defined in

node_modules/@types/node/events.d.ts:354

___

### listenerCount

▸ **listenerCount**(`emitter`, `eventName`): `number`

A class method that returns the number of listeners for the given `eventName`registered on the given `emitter`.

```js
import { EventEmitter, listenerCount } from 'node:events';

const myEmitter = new EventEmitter();
myEmitter.on('event', () => {});
myEmitter.on('event', () => {});
console.log(listenerCount(myEmitter, 'event'));
// Prints: 2
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | [`EventEmitter`](../interfaces/internal_.EventEmitter-2.md)\<[`DefaultEventMap`](../modules/internal_.md#defaulteventmap)\> | The emitter to query |
| `eventName` | `string` \| `symbol` | The event name |

#### Returns

`number`

**`Since`**

v0.9.12

**`Deprecated`**

Since v3.2.0 - Use `listenerCount` instead.

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[listenerCount](internal_.EventEmitter-1.md#listenercount-1)

#### Defined in

node_modules/@types/node/events.d.ts:297

___

### on

▸ **on**(`emitter`, `eventName`, `options?`): [`AsyncIterableIterator`](../interfaces/internal_.AsyncIterableIterator.md)\<`any`\>

```js
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

// Emit later on
process.nextTick(() => {
  ee.emit('foo', 'bar');
  ee.emit('foo', 42);
});

for await (const event of on(ee, 'foo')) {
  // The execution of this inner block is synchronous and it
  // processes one event at a time (even with await). Do not use
  // if concurrent execution is required.
  console.log(event); // prints ['bar'] [42]
}
// Unreachable here
```

Returns an `AsyncIterator` that iterates `eventName` events. It will throw
if the `EventEmitter` emits `'error'`. It removes all listeners when
exiting the loop. The `value` returned by each iteration is an array
composed of the emitted event arguments.

An `AbortSignal` can be used to cancel waiting on events:

```js
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo', { signal: ac.signal })) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();

process.nextTick(() => ac.abort());
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | [`EventEmitter`](../interfaces/internal_.EventEmitter-2.md)\<[`DefaultEventMap`](../modules/internal_.md#defaulteventmap)\> | - |
| `eventName` | `string` | The name of the event being listened for |
| `options?` | [`StaticEventEmitterOptions`](../interfaces/internal_.StaticEventEmitterOptions.md) | - |

#### Returns

[`AsyncIterableIterator`](../interfaces/internal_.AsyncIterableIterator.md)\<`any`\>

that iterates `eventName` events emitted by the `emitter`

**`Since`**

v13.6.0, v12.16.0

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[on](internal_.EventEmitter-1.md#on-1)

#### Defined in

node_modules/@types/node/events.d.ts:275

___

### once

▸ **once**(`emitter`, `eventName`, `options?`): `Promise`\<`any`[]\>

Creates a `Promise` that is fulfilled when the `EventEmitter` emits the given
event or that is rejected if the `EventEmitter` emits `'error'` while waiting.
The `Promise` will resolve with an array of all the arguments emitted to the
given event.

This method is intentionally generic and works with the web platform [EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget) interface, which has no special`'error'` event
semantics and does not listen to the `'error'` event.

```js
import { once, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

process.nextTick(() => {
  ee.emit('myevent', 42);
});

const [value] = await once(ee, 'myevent');
console.log(value);

const err = new Error('kaboom');
process.nextTick(() => {
  ee.emit('error', err);
});

try {
  await once(ee, 'myevent');
} catch (err) {
  console.error('error happened', err);
}
```

The special handling of the `'error'` event is only used when `events.once()`is used to wait for another event. If `events.once()` is used to wait for the
'`error'` event itself, then it is treated as any other kind of event without
special handling:

```js
import { EventEmitter, once } from 'node:events';

const ee = new EventEmitter();

once(ee, 'error')
  .then(([err]) => console.log('ok', err.message))
  .catch((err) => console.error('error', err.message));

ee.emit('error', new Error('boom'));

// Prints: ok boom
```

An `AbortSignal` can be used to cancel waiting for the event:

```js
import { EventEmitter, once } from 'node:events';

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log('event emitted!');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Waiting for the event was canceled!');
    } else {
      console.error('There was an error', error.message);
    }
  }
}

foo(ee, 'foo', ac.signal);
ac.abort(); // Abort waiting for the event
ee.emit('foo'); // Prints: Waiting for the event was canceled!
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | [`_NodeEventTarget`](../interfaces/internal_._NodeEventTarget.md) |
| `eventName` | `string` \| `symbol` |
| `options?` | [`StaticEventEmitterOptions`](../interfaces/internal_.StaticEventEmitterOptions.md) |

#### Returns

`Promise`\<`any`[]\>

**`Since`**

v11.13.0, v10.16.0

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[once](internal_.EventEmitter-1.md#once-1)

#### Defined in

node_modules/@types/node/events.d.ts:210

▸ **once**(`emitter`, `eventName`, `options?`): `Promise`\<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | [`_DOMEventTarget`](../interfaces/internal_._DOMEventTarget.md) |
| `eventName` | `string` |
| `options?` | [`StaticEventEmitterOptions`](../interfaces/internal_.StaticEventEmitterOptions.md) |

#### Returns

`Promise`\<`any`[]\>

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[once](internal_.EventEmitter-1.md#once-1)

#### Defined in

node_modules/@types/node/events.d.ts:215

___

### setMaxListeners

▸ **setMaxListeners**(`n?`, `...eventTargets`): `void`

```js
import { setMaxListeners, EventEmitter } from 'node:events';

const target = new EventTarget();
const emitter = new EventEmitter();

setMaxListeners(5, target, emitter);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n?` | `number` | A non-negative number. The maximum number of listeners per `EventTarget` event. |
| `...eventTargets` | ([`EventEmitter`](../interfaces/internal_.EventEmitter-2.md)\<[`DefaultEventMap`](../modules/internal_.md#defaulteventmap)\> \| [`_DOMEventTarget`](../interfaces/internal_._DOMEventTarget.md))[] | - |

#### Returns

`void`

**`Since`**

v15.4.0

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[setMaxListeners](internal_.EventEmitter-1.md#setmaxlisteners-1)

#### Defined in

node_modules/@types/node/events.d.ts:369
