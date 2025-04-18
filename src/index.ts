/**
 * Node System Stats - A comprehensive library for system monitoring
 * 
 * This library provides a wide range of functionality for monitoring system resources
 * including CPU, memory, disk, network, processes, and more.
 * 
 * @packageDocumentation
 */

// Export CPU-related functionality
export * from './modules/cpu';

// Export memory-related functionality
export * from './modules/memory';

// Export disk-related functionality
export * from './modules/disk';

// Export network-related functionality
export * from './modules/network';
// Fix NetworkInterfaceInfo ambiguity
export { NetworkInterfaceInfo } from './types/types';

// Export process-related functionality
export * from './modules/process';

// Export battery-related functionality
export * from './modules/battery';
// Fix BatteryInfo ambiguity
export { BatteryInfo } from './types/types';

// Export monitoring functionality
export * from './modules/monitor';

// Export types
export * from './types/types';

// Export utility functions
export { formatBytes } from './utils/util';
export { platformInfo as platform } from './utils/util';