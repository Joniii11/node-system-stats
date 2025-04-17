export interface IOptsInput {
    /**
     * The index of the core to calculate the usage on. 
     * Can use any integer `coreIndex` such that `0 >= coreIndex < memStat.totalCores()`
     * 
     * @default -1 (all cores)
     */
    coreIndex?: number;
    /**
     * `sampleMs` is the amount of time to take till the measurement is over.
     * 
     * @default 1000 yes
     */
    sampleMs?: number;
}

export interface IOptsInternal {
    coreIndex: number;
    sampleMs: number;
}

export interface ICallback {
        /**
         * The percentage of the CPU Utilization of the process.
         */
        percent: number;

        /**
         * The time of how long it measured the CPU Utlization of the process.
         */
        seconds?: number;
}

export interface MemoryUsageReturn {
    /**
     * `rss`, Resident Set Size, is the amount of space occupied in the main memory device (that is a subset of the total allocated memory) for the process, including all C++ and JavaScript objects and code.
     */
    rss: number;

    /**
     * `heapTotal` refers to V8's memory usage in total.
     */
    heapTotal: number;

    /**
     * `heapUsed` refers to the V8's memory usage in use
     */
    heapUsed: number;

    /**
     * `external` refers to the memory usage of C++ objects bound to JavaScript objects managed by V8.
     */
    external: number;

    /**
     * `arrayBuffers` refers to memory allocated for `ArrayBuffers` and `SharedArrayBuffers`, including all Node.js `Buffers`. This is also included in the external value. When Node.js is used as an embedded library, this value may be 0 because allocations for `ArrayBuffers` may not be tracked in that case.
     */
    arrayBuffers: number;
}

/**
 * Interface for disk drive information
 */
export interface DiskDriveInfo {
    /**
     * The filesystem path or drive letter
     */
    filesystem: string;
    
    /**
     * Total size of the drive in bytes
     */
    size: number;
    
    /**
     * Used space on the drive in bytes
     */
    used: number;
    
    /**
     * Available space on the drive in bytes
     */
    available: number;
    
    /**
     * Percentage of disk used (0-100)
     */
    percentUsed: number;
    
    /**
     * Mount point of the drive
     */
    mountpoint: string;
}

/**
 * Interface for network interface statistics
 */
export interface NetworkInterfaceInfo {
    /**
     * Interface name
     */
    name: string;
    
    /**
     * IP addresses assigned to this interface
     */
    addresses: {
        address: string;
        netmask: string;
        family: string;
        mac: string;
        internal: boolean;
    }[];
    
    /**
     * Bytes received since system boot
     */
    bytesReceived?: number;
    
    /**
     * Bytes sent since system boot
     */
    bytesSent?: number;
    
    /**
     * Connection state (if applicable)
     */
    state?: string;
}

/**
 * Interface for CPU temperature data
 */
export interface CpuTemperature {
    /**
     * Main CPU temperature in Celsius
     */
    main: number;
    
    /**
     * Array of core temperatures in Celsius
     */
    cores: number[];
    
    /**
     * Max temperature safe threshold in Celsius
     */
    max?: number;
}

/**
 * Interface for battery information
 */
export interface BatteryInfo {
    /**
     * Whether the system has a battery
     */
    hasBattery: boolean;
    
    /**
     * Current battery charge level as percentage (0-100)
     */
    percent?: number;
    
    /**
     * Whether the device is currently charging
     */
    isCharging?: boolean;
    
    /**
     * Estimated time remaining in minutes (if discharging)
     */
    timeRemaining?: number;
    
    /**
     * Power consumption in watts
     */
    powerConsumption?: number;
}

/**
 * Interface for process information
 */
export interface ProcessInfo {
    /**
     * Process ID
     */
    pid: number;
    
    /**
     * Process name
     */
    name: string;
    
    /**
     * CPU usage percentage (0-100)
     */
    cpu: number;
    
    /**
     * Memory usage in bytes
     */
    memory: number;
    
    /**
     * Memory usage as percentage of total system memory
     */
    memoryPercent: number;
    
    /**
     * Process uptime in seconds
     */
    uptime?: number;
    
    /**
     * Process state/status
     */
    state?: string;
    
    /**
     * Path to the executable
     */
    path?: string;
}

/**
 * Interface for system load average
 */
export interface LoadAverageInfo {
    /**
     * 1 minute load average
     */
    oneMinute: number;
    
    /**
     * 5 minute load average
     */
    fiveMinutes: number;
    
    /**
     * 15 minute load average
     */
    fifteenMinutes: number;
    
    /**
     * Current CPU count to help interpret load values
     */
    cpuCount: number;
}

/**
 * Options for the monitoring module
 */
export interface MonitorOptions {
    /**
     * Interval in milliseconds to collect stats
     */
    interval?: number;
    
    /**
     * Maximum history points to keep
     */
    maxHistory?: number;
}

interface pJsonRepo {
    type: string;
    url: string;
}

export interface pJSON {
    name: string;
    version: string;
    private: boolean;
    description: string;
    main: string;
    types: string;
    files: string[];
    repository: pJsonRepo;
    bugs: pJsonRepo;
    keywords: string[];
    readmeFilename: string;
    devDependencies: Object;
    license: string;
}