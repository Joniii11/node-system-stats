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

/**
 * This function measures the CPU usage
 * @param {IOptsInput} optsInput The options input
 * @returns {Promise<ICallback>} returns a resolvable promise
 */
export declare function usagePercent(optsInput?: IOptsInput): Promise<ICallback>;
/**
 * @returns {number} The number of total cores in the system.
 */
export declare const totalCores: number;
/**
 * @returns {string} The name of the cpu in your system.
 */
export declare const cpuModel: string;
/**
 * @returns {string} Returns the current version of the package
 */
export declare const version: string;
/**
 * This function returns the speed of all cores or only just the selected core.
 * @param {number} coreIndex The index of the core. It begins with 0. If not specified, it will return an array with all of the cores
 * @returns {number | number[]} A number of the speed of the core OR a array with all of the cores speeds.
 */
export declare function clockMHz(coreIndex?: number): number | number[];
/**
 * This function shows the average Clock Frequency from all of the cores.
 * @returns {number} returns a number with the average Clock MHz over all cores
 */
export declare function avgClockMHz(): number;
/**
 * Shows the formmated Memory Usage information
 * @returns {MemoryUsageReturn} An object with every converted memory usage type in redable form.
 */
export declare function showMemoryUsage(): MemoryUsageReturn;
/**
 * This function is used to display the total memory that the system has. It can output in Gigabyte and Megabyte.
 * @param {boolean?} convertedGB If the returned value should be in Gigabytes or in MB. If set to true, then it will output the Gigabyte value.
 * @default {false} Megabyte format.
 *
 * @returns {number} The converted total Memory that is available.
 */
export declare function showTotalMemory(convertedGB?: boolean): number;