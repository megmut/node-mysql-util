"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheItem = void 0;
class CacheItem {
    constructor(controller, lifespan) {
        this.controller = controller;
        if (this.controller) {
            // ts lint temp fix
        }
        // inherit the date now from the create hash function to avoid Date.now call twice
        this._endOfLife = lifespan + Date.now();
    }
    hasExpired(comparisonDate) {
        if (this._endOfLife <= comparisonDate) {
            return true;
        }
        else {
            return false;
        }
    }
    get endOfLife() {
        return this._endOfLife;
    }
}
exports.CacheItem = CacheItem;
//# sourceMappingURL=cacheItem.js.map