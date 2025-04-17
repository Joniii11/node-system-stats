[node-system-stats](../README.md) / [Exports](../modules.md) / NetworkInterfaceInfo

# Interface: NetworkInterfaceInfo

Interface for network interface statistics

## Table of contents

### Properties

- [addresses](NetworkInterfaceInfo.md#addresses)
- [bytesReceived](NetworkInterfaceInfo.md#bytesreceived)
- [bytesSent](NetworkInterfaceInfo.md#bytessent)
- [name](NetworkInterfaceInfo.md#name)
- [state](NetworkInterfaceInfo.md#state)

## Properties

### addresses

• **addresses**: \{ `address`: `string` ; `family`: `string` ; `internal`: `boolean` ; `mac`: `string` ; `netmask`: `string`  }[]

IP addresses assigned to this interface

#### Defined in

src/types/types.ts:108

___

### bytesReceived

• `Optional` **bytesReceived**: `number`

Bytes received since system boot

#### Defined in

src/types/types.ts:119

___

### bytesSent

• `Optional` **bytesSent**: `number`

Bytes sent since system boot

#### Defined in

src/types/types.ts:124

___

### name

• **name**: `string`

Interface name

#### Defined in

src/types/types.ts:103

___

### state

• `Optional` **state**: `string`

Connection state (if applicable)

#### Defined in

src/types/types.ts:129
