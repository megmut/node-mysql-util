"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLService = void 0;
class MySQLService {
    constructor() {
        try {
            this.pools = {};
            this.connections = {};
        }
        catch (error) {
            throw error;
        }
    }
    addPool(key, pool) {
        // TODO check if key already exists
        this.pools[key] = pool;
    }
    addConnection(key, connection) {
        // TODO check if key already exists
        this.connections[key] = connection;
    }
    getPools() {
        return this.pools;
    }
    getConnections() {
        return this.connections;
    }
    // TOOD close single connection
    // TODO close single pool
    // TODO close all connections
    // TOOD close all pools
    static getInstance() {
        if (this.instance == null) {
            this.instance = new this();
        }
        return this.instance;
    }
    async getConnectionFromPool(key) {
        try {
            const connection = await this.pools[key].getConnection();
            if (connection == null) {
                const error = 'No connection available';
                throw (error);
            }
            return connection;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.MySQLService = MySQLService;
//# sourceMappingURL=service.js.map