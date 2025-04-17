/**
 * Interface for battery information
 */
export interface BatteryInfo {
    hasBattery: boolean;
    isCharging: boolean;
    percent: number;
    timeRemaining: number;
    acConnected: boolean;
    maxCapacity?: number;
    currentCapacity?: number;
    voltage?: number;
    cycleCount?: number;
    model?: string;
}
/**
 * Get battery information
 * @returns Promise resolving to battery information
 */
export declare function getBatteryInfo(): Promise<BatteryInfo>;
/**
 * Check if the system has a battery
 * @returns Promise resolving to a boolean indicating if a battery is present
 */
export declare function hasBattery(): Promise<boolean>;
/**
 * Check if the battery is currently charging
 * @returns Promise resolving to a boolean indicating if the battery is charging
 */
export declare function isCharging(): Promise<boolean>;
/**
 * Get battery percentage
 * @returns Promise resolving to the battery percentage (0-100) or 0 if not available
 */
export declare function getBatteryPercent(): Promise<number>;
/**
 * Get battery time remaining in minutes
 * @returns Promise resolving to the battery time remaining in minutes or -1 if unknown
 */
export declare function getTimeRemaining(): Promise<number>;
