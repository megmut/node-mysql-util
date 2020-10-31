import { QueryCache } from './cacheController';
export declare class CacheItem {
    private controller;
    private _endOfLife;
    constructor(controller: QueryCache, lifespan: number);
    hasExpired(comparisonDate: number): boolean;
    get endOfLife(): number;
}
