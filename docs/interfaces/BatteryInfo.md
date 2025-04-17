[node-system-stats](../README.md) / [Exports](../modules.md) / BatteryInfo

# Interface: BatteryInfo

Interface for battery information

## Table of contents

### Properties

- [hasBattery](BatteryInfo.md#hasbattery)
- [isCharging](BatteryInfo.md#ischarging)
- [percent](BatteryInfo.md#percent)
- [powerConsumption](BatteryInfo.md#powerconsumption)
- [timeRemaining](BatteryInfo.md#timeremaining)

## Properties

### hasBattery

• **hasBattery**: `boolean`

Whether the system has a battery

#### Defined in

src/types/types.ts:159

___

### isCharging

• `Optional` **isCharging**: `boolean`

Whether the device is currently charging

#### Defined in

src/types/types.ts:169

___

### percent

• `Optional` **percent**: `number`

Current battery charge level as percentage (0-100)

#### Defined in

src/types/types.ts:164

___

### powerConsumption

• `Optional` **powerConsumption**: `number`

Power consumption in watts

#### Defined in

src/types/types.ts:179

___

### timeRemaining

• `Optional` **timeRemaining**: `number`

Estimated time remaining in minutes (if discharging)

#### Defined in

src/types/types.ts:174
