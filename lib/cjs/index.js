"use strict";
/**
 * Node System Stats - A comprehensive library for system monitoring
 *
 * This library provides a wide range of functionality for monitoring system resources
 * including CPU, memory, disk, network, processes, and more.
 *
 * @packageDocumentation
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.platform = exports.formatBytes = void 0;
// Export CPU-related functionality
__exportStar(require("./modules/cpu"), exports);
// Export memory-related functionality
__exportStar(require("./modules/memory"), exports);
// Export disk-related functionality
__exportStar(require("./modules/disk"), exports);
// Export network-related functionality
__exportStar(require("./modules/network"), exports);
// Export process-related functionality
__exportStar(require("./modules/process"), exports);
// Export battery-related functionality
__exportStar(require("./modules/battery"), exports);
// Export monitoring functionality
__exportStar(require("./modules/monitor"), exports);
// Export types
__exportStar(require("./types/types"), exports);
// Export utility functions
var util_1 = require("./utils/util");
Object.defineProperty(exports, "formatBytes", { enumerable: true, get: function () { return util_1.formatBytes; } });
var util_2 = require("./utils/util");
Object.defineProperty(exports, "platform", { enumerable: true, get: function () { return util_2.platformInfo; } });
//# sourceMappingURL=index.js.map