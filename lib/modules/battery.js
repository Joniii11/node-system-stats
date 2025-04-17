"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeRemaining = exports.getBatteryPercent = exports.isCharging = exports.hasBattery = exports.getBatteryInfo = void 0;
const util_1 = require("../utils/util");
/**
 * Get battery information
 * @returns Promise resolving to battery information
 */
async function getBatteryInfo() {
    const platform = process.platform;
    try {
        if (platform === 'win32') {
            return await getWindowsBatteryInfo();
        }
        else if (platform === 'darwin') {
            return await getMacOSBatteryInfo();
        }
        else if (platform === 'linux') {
            return await getLinuxBatteryInfo();
        }
        else {
            // Fallback for unsupported platforms
            return {
                hasBattery: false,
                isCharging: false,
                percent: 0,
                timeRemaining: -1,
                acConnected: true
            };
        }
    }
    catch (err) {
        console.error('Error getting battery info:', err);
        // Return conservative defaults
        return {
            hasBattery: false,
            isCharging: false,
            percent: 0,
            timeRemaining: -1,
            acConnected: true
        };
    }
}
exports.getBatteryInfo = getBatteryInfo;
/**
 * Check if the system has a battery
 * @returns Promise resolving to a boolean indicating if a battery is present
 */
async function hasBattery() {
    try {
        const info = await getBatteryInfo();
        return info.hasBattery;
    }
    catch (err) {
        return false;
    }
}
exports.hasBattery = hasBattery;
/**
 * Check if the battery is currently charging
 * @returns Promise resolving to a boolean indicating if the battery is charging
 */
async function isCharging() {
    try {
        const info = await getBatteryInfo();
        return info.isCharging;
    }
    catch (err) {
        return false;
    }
}
exports.isCharging = isCharging;
/**
 * Get battery percentage
 * @returns Promise resolving to the battery percentage (0-100) or 0 if not available
 */
async function getBatteryPercent() {
    try {
        const info = await getBatteryInfo();
        return info.percent;
    }
    catch (err) {
        return 0;
    }
}
exports.getBatteryPercent = getBatteryPercent;
/**
 * Get battery time remaining in minutes
 * @returns Promise resolving to the battery time remaining in minutes or -1 if unknown
 */
async function getTimeRemaining() {
    try {
        const info = await getBatteryInfo();
        return info.timeRemaining;
    }
    catch (err) {
        return -1;
    }
}
exports.getTimeRemaining = getTimeRemaining;
/**
 * Get Windows battery information
 * @returns Promise resolving to battery information
 * @private
 */
async function getWindowsBatteryInfo() {
    try {
        // Check if battery is present
        const { stdout: batteryPresent } = await (0, util_1.execAsync)('wmic path win32_battery get availability /format:list');
        const hasBattery = batteryPresent.includes('Availability=');
        if (!hasBattery) {
            return {
                hasBattery: false,
                isCharging: false,
                percent: 0,
                timeRemaining: -1,
                acConnected: true
            };
        }
        // Get battery status
        const { stdout: batteryStatus } = await (0, util_1.execAsync)('wmic path win32_battery get BatteryStatus /format:list');
        // BatteryStatus: 1=discharging, 2=on AC, other=unknown
        const status = parseInt(batteryStatus.split('=')[1], 10);
        // Get charging status and AC connected status
        const isCharging = status === 2;
        const acConnected = status === 2;
        // Get percentage
        const { stdout: batteryPercent } = await (0, util_1.execAsync)('wmic path win32_battery get EstimatedChargeRemaining /format:list');
        const percent = parseInt(batteryPercent.split('=')[1], 10) || 0;
        // Get time remaining
        const { stdout: timeRemaining } = await (0, util_1.execAsync)('wmic path win32_battery get EstimatedRunTime /format:list');
        const timeRemainingMinutes = parseInt(timeRemaining.split('=')[1], 10) || -1;
        // Get additional information if available
        const { stdout: designCapacity } = await (0, util_1.execAsync)('wmic path win32_battery get DesignCapacity /format:list');
        const maxCapacity = parseInt(designCapacity.split('=')[1], 10) || undefined;
        const { stdout: fullChargeCapacity } = await (0, util_1.execAsync)('wmic path win32_battery get FullChargeCapacity /format:list');
        const currentCapacity = parseInt(fullChargeCapacity.split('=')[1], 10) || undefined;
        const { stdout: voltage } = await (0, util_1.execAsync)('wmic path win32_battery get DesignVoltage /format:list');
        const voltageValue = parseInt(voltage.split('=')[1], 10) || undefined;
        const { stdout: modelInfo } = await (0, util_1.execAsync)('wmic path win32_battery get DeviceID /format:list');
        const model = modelInfo.split('=')[1]?.trim() || undefined;
        return {
            hasBattery,
            isCharging,
            percent,
            timeRemaining: timeRemainingMinutes,
            acConnected,
            maxCapacity,
            currentCapacity,
            voltage: voltageValue ? voltageValue / 1000 : undefined, // Convert from mV to V
            model
        };
    }
    catch (err) {
        console.error('Error getting Windows battery info:', err);
        throw err;
    }
}
/**
 * Get macOS battery information
 * @returns Promise resolving to battery information
 * @private
 */
async function getMacOSBatteryInfo() {
    try {
        // Check if pmset is available
        const { stdout } = await (0, util_1.execAsync)('pmset -g batt');
        if (!stdout.includes('InternalBattery')) {
            return {
                hasBattery: false,
                isCharging: false,
                percent: 0,
                timeRemaining: -1,
                acConnected: true
            };
        }
        // Parse the output
        const hasBattery = true;
        const isCharging = stdout.includes('charging');
        const acConnected = stdout.includes('AC Power') || isCharging;
        // Extract percentage
        const percentMatch = stdout.match(/(\d+)%/);
        const percent = percentMatch ? parseInt(percentMatch[1], 10) : 0;
        // Extract time remaining
        const timeMatch = stdout.match(/(\d+):(\d+)/);
        const timeRemainingMinutes = timeMatch
            ? parseInt(timeMatch[1], 10) * 60 + parseInt(timeMatch[2], 10)
            : -1;
        // Get additional information using system_profiler if available
        let cycleCount;
        let maxCapacity;
        let currentCapacity;
        let voltage;
        let model;
        try {
            const { stdout: batteryInfo } = await (0, util_1.execAsync)('system_profiler SPPowerDataType');
            // Extract cycle count
            const cycleMatch = batteryInfo.match(/Cycle Count: (\d+)/);
            if (cycleMatch) {
                cycleCount = parseInt(cycleMatch[1], 10);
            }
            // Extract capacities
            const maxCapMatch = batteryInfo.match(/Full Charge Capacity \(mAh\): (\d+)/);
            if (maxCapMatch) {
                maxCapacity = parseInt(maxCapMatch[1], 10);
            }
            const currentCapMatch = batteryInfo.match(/Charge Remaining \(mAh\): (\d+)/);
            if (currentCapMatch) {
                currentCapacity = parseInt(currentCapMatch[1], 10);
            }
            // Extract voltage
            const voltageMatch = batteryInfo.match(/Voltage \(mV\): (\d+)/);
            if (voltageMatch) {
                voltage = parseInt(voltageMatch[1], 10);
            }
            // Extract model
            const modelMatch = batteryInfo.match(/Model Name: (.+)/);
            if (modelMatch) {
                model = modelMatch[1].trim();
            }
        }
        catch (err) {
            // Ignore errors when getting additional info
        }
        return {
            hasBattery,
            isCharging,
            percent,
            timeRemaining: timeRemainingMinutes,
            acConnected,
            cycleCount,
            maxCapacity,
            currentCapacity,
            voltage,
            model
        };
    }
    catch (err) {
        console.error('Error getting macOS battery info:', err);
        throw err;
    }
}
/**
 * Get Linux battery information
 * @returns Promise resolving to battery information
 * @private
 */
async function getLinuxBatteryInfo() {
    try {
        // Check if we have a battery
        const { stdout: batteryPath } = await (0, util_1.execAsync)('find /sys/class/power_supply -name "BAT*" | head -n 1');
        if (!batteryPath.trim()) {
            return {
                hasBattery: false,
                isCharging: false,
                percent: 0,
                timeRemaining: -1,
                acConnected: true
            };
        }
        const basePath = batteryPath.trim();
        // Get battery status
        const { stdout: status } = await (0, util_1.execAsync)(`cat ${basePath}/status`);
        const isCharging = status.trim().toLowerCase() === 'charging';
        const acConnected = status.trim().toLowerCase() !== 'discharging';
        // Get battery percentage
        let percent = 0;
        try {
            const { stdout: energy_now } = await (0, util_1.execAsync)(`cat ${basePath}/energy_now`);
            const { stdout: energy_full } = await (0, util_1.execAsync)(`cat ${basePath}/energy_full`);
            const now = parseInt(energy_now.trim(), 10);
            const full = parseInt(energy_full.trim(), 10);
            percent = Math.round((now / full) * 100);
        }
        catch (err) {
            // Some systems use charge instead of energy
            try {
                const { stdout: charge_now } = await (0, util_1.execAsync)(`cat ${basePath}/charge_now`);
                const { stdout: charge_full } = await (0, util_1.execAsync)(`cat ${basePath}/charge_full`);
                const now = parseInt(charge_now.trim(), 10);
                const full = parseInt(charge_full.trim(), 10);
                percent = Math.round((now / full) * 100);
            }
            catch (e) {
                // Fallback to capacity if available
                try {
                    const { stdout: capacity } = await (0, util_1.execAsync)(`cat ${basePath}/capacity`);
                    percent = parseInt(capacity.trim(), 10);
                }
                catch (e2) {
                    percent = 0;
                }
            }
        }
        // Get time remaining (not always available)
        let timeRemaining = -1;
        try {
            if (!isCharging) {
                const { stdout: power_now } = await (0, util_1.execAsync)(`cat ${basePath}/power_now`);
                const { stdout: energy_now } = await (0, util_1.execAsync)(`cat ${basePath}/energy_now`);
                const power = parseInt(power_now.trim(), 10);
                const energy = parseInt(energy_now.trim(), 10);
                if (power > 0) {
                    // Calculate time in minutes
                    timeRemaining = Math.round((energy / power) * 60);
                }
            }
        }
        catch (err) {
            timeRemaining = -1;
        }
        // Get additional battery info if available
        let maxCapacity;
        let currentCapacity;
        let voltage;
        let model;
        let cycleCount;
        try {
            const { stdout: energy_full } = await (0, util_1.execAsync)(`cat ${basePath}/energy_full 2>/dev/null || echo 0`);
            if (energy_full.trim() !== '0') {
                maxCapacity = parseInt(energy_full.trim(), 10) / 1000; // Convert to mWh
            }
        }
        catch (err) {
            // Ignore error
        }
        try {
            const { stdout: energy_now } = await (0, util_1.execAsync)(`cat ${basePath}/energy_now 2>/dev/null || echo 0`);
            if (energy_now.trim() !== '0') {
                currentCapacity = parseInt(energy_now.trim(), 10) / 1000; // Convert to mWh
            }
        }
        catch (err) {
            // Ignore error
        }
        try {
            const { stdout: voltage_now } = await (0, util_1.execAsync)(`cat ${basePath}/voltage_now 2>/dev/null || echo 0`);
            if (voltage_now.trim() !== '0') {
                voltage = parseInt(voltage_now.trim(), 10) / 1000; // Convert to mV
            }
        }
        catch (err) {
            // Ignore error
        }
        try {
            const { stdout: modelName } = await (0, util_1.execAsync)(`cat ${basePath}/model_name 2>/dev/null || echo ""`);
            if (modelName.trim() !== '') {
                model = modelName.trim();
            }
        }
        catch (err) {
            // Ignore error
        }
        try {
            const { stdout: cycle_count } = await (0, util_1.execAsync)(`cat ${basePath}/cycle_count 2>/dev/null || echo 0`);
            if (cycle_count.trim() !== '0') {
                cycleCount = parseInt(cycle_count.trim(), 10);
            }
        }
        catch (err) {
            // Ignore error
        }
        return {
            hasBattery: true,
            isCharging,
            percent,
            timeRemaining,
            acConnected,
            maxCapacity,
            currentCapacity,
            voltage,
            cycleCount,
            model
        };
    }
    catch (err) {
        console.error('Error getting Linux battery info:', err);
        throw err;
    }
}
//# sourceMappingURL=battery.js.map