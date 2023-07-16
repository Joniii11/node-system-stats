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

export type clockMHzType = number;


/**
 * This function measures the CPU usage
 * @param optsInput The options input
 * @returns returns a resolvable promise
 */
export declare function usagePercent(optsInput?: IOptsInput): Promise<ICallback>;
/**
 * This function shows all Cores that are available in your system
 * @returns The number of total cores in the system.
 */
export declare function totalCores(): number;
/**
 * This function returns the speed of all cores or only just the selected core.
 * @param coreIndex The index of the core. It begins with 0. If not specified, it will return an array with all of the cores
 * @returns A number of the speed of the core OR a array with all of the cores speeds.
 */
export declare function clockMHz(coreIndex?: clockMHzType): number | number[];
/**
 * This function shows the average Clock Frequency from all of the cores.
 * @returns
 */
export declare function avgClockMHz(): number;
/**
 * Shows the formmated Memory Usage information
 * @returns
 */
export declare function showMemoryUsage(): string;

