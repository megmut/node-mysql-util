"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryCache = void 0;
const cacheItem_1 = require("./cacheItem");
;
class QueryCache {
    constructor(options = {}) {
        this._options = options;
        this._cache = {};
        this._job = null;
        if (this._job) {
            // temp tslint fix
        }
        if (options.maxCacheLifeTime) {
            if (options.emptyCacheCycle != null) {
                this.initializeFullCacheClearCycle(options.emptyCacheCycle);
            }
        }
        // setup the job to check for expired
        if (options.maxCacheLifeTime) {
            this._options.maxCacheLifeTime = options.maxCacheLifeTime;
        }
        else {
            this._options.maxCacheLifeTime = 14400;
        }
        this.createMaxLifeJob();
    }
    initializeFullCacheClearCycle(interval) {
        if (!interval) {
            throw new Error('No full cache clear cycle interval was provided');
        }
        const timer = setInterval(() => {
            // Do something at some point
        }, interval);
        return timer;
    }
    createMaxLifeJob() {
        this._job = setInterval(() => {
            this.checkForExpiredCache();
        }, this._options.emptyCacheCycle);
    }
    /**
     * Check for expired cache
     *
     * Has a time complexity of O(n)
     */
    checkForExpiredCache() {
        // store this so we don't have to lookup every time.
        // negative about doing this is the end of life is calculated against when the cache
        // cycle was begun, not the specific time
        const curDate = Date.now();
        for (const index in this._cache) {
            if (index != null) {
                const cacheItem = this._cache[index];
                if (cacheItem.hasExpired(curDate)) {
                    this.recycleItem(cacheItem);
                }
            }
        }
    }
    recycleItem(cachedItem) {
        // delete the cached item
        if (cachedItem) {
            // temp tslint fix
        }
    }
    /**
     *
     * @param queryKey
     * @param parameters
     *
     * Has a time complexity of O(1)
     */
    find(queryKey, parameters) {
        const hash = this.generateHash(queryKey, parameters);
        // check that there is a base instance of a query cache from the query key
        if (this._cache[hash]) {
            return this._cache[hash];
        }
        else {
            return null;
        }
    }
    createCache(hash) {
        // if the hash has already been used, then kill that cached item
        if (this._cache[hash]) {
            this.recycleItem(this._cache[hash]);
        }
        const maxCacheLifeTime = this.options.maxCacheLifeTime ? this.options.maxCacheLifeTime : 3600;
        const newCacheItem = new cacheItem_1.CacheItem(this, maxCacheLifeTime);
        this._cache[hash] = newCacheItem;
        return newCacheItem;
    }
    getCacheGroup(key) {
        return this._cache[key] || null;
    }
    nukeCache() {
        this._cache = {};
    }
    generateHash(queryKey, parameters) {
        // need to bench test the join function
        const parameterString = parameters.join('');
        const hash = `${queryKey}-${parameterString}`;
        return hash;
    }
    get cache() {
        return this._cache;
    }
    get cachedItems() {
        return Object.keys(this._cache).length;
    }
    get options() {
        return this._options;
    }
}
exports.QueryCache = QueryCache;
//# sourceMappingURL=cacheController.js.map