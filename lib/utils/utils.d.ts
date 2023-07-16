import { IOptsInternal, ICallback } from "../node-system-stats";
export declare function measureCPUMulti(opts: IOptsInternal): Promise<ICallback>;
export declare function measureCPUSingle(opts: IOptsInternal): Promise<ICallback>;
