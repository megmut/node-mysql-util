import { CacheItem } from "./cacheItem";
/**
 * Order Priorities
 *
 * 1. newest descending
 * 2. highest called descending
 * 3. manual priority / priority override
 *
 * It might be worth having a top x% cache in a separate object / array for the most called query.
 * Manual binary lookup passed from specific routes for single queries
 *  to elaborate, if you have a controller that only ever runs 1 query, you could use that query cache ID passed
 *  in order to order that without needing to hash the query and parameters.
 *
 * Creating class objects rather than literal objects is slower. They won't be created all that often,
 *  but it's possible to pre-create empty cache items and store them in a pool to re-use.
 */
declare interface IGlobalOptions {
    enabled?: boolean;
    maxCacheLifeTime?: number;
    maxCacheItems?: number;
    maxMemoryCapacity?: number;
    emptyCacheCycle?: number;
    orderPriority?: number;
    reorderCycle?: number;
    insertNewFirst?: boolean;
    insertNewLast?: boolean;
    ignoreEnvironmentVariables?: boolean;
}
declare type QueryParameters = number | string | string[];
declare interface IGlobalCache {
    [queryKey: string]: CacheItem;
}
export declare class QueryCache {
    private _cache;
    private _options;
    private _job;
    constructor(options?: IGlobalOptions);
    private initializeFullCacheClearCycle;
    private createMaxLifeJob;
    /**
     * Check for expired cache
     *
     * Has a time complexity of O(n)
     */
    private checkForExpiredCache;
    recycleItem(cachedItem: CacheItem): void;
    /**
     *
     * @param queryKey
     * @param parameters
     *
     * Has a time complexity of O(1)
     */
    find(queryKey: string, parameters: QueryParameters[]): CacheItem | null;
    createCache(hash: string | number): CacheItem;
    getCacheGroup(key: string | number): CacheItem;
    nukeCache(): void;
    private generateHash;
    get cache(): IGlobalCache;
    get cachedItems(): number;
    get options(): IGlobalOptions;
}
export {};
