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

export type clockMHzType = number;