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
};

export interface IOptsInternal {
    coreIndex: number;
    sampleMs: number;
}

export interface ICallbackReturn {
    /**
     * The percentage of the CPU Utilization of the process.
     */
    percent: number;

    /**
     * The time of how long it measured the CPU Utlization of the process.
     */
    seconds: number;
}

export interface ICallback {
    ( percent: number, seconds: number ): ICallbackReturn | void;
}

export type clockMHzType = number;