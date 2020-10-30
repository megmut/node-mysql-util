import { Connection, Pool, PoolConnection } from 'mysql2/promise';
export interface IMultipleTransaction {
    id: number;
    query: string;
    params: number | string | boolean | JSON | null [];
}
export class MySQLService {

    private static instance: MySQLService;

    private readonly pools: Record<string, Pool>;
    private readonly connections: Record<string, Connection>;

    constructor() {
        try {
            this.pools = {};
            this.connections = {};
        } catch (error) {
            throw error;
        }
    }

    public addPool(key: string, pool: Pool) {
        // TODO check if key already exists
        this.pools[key] = pool;
    }

    public addConnection(key: string, connection: Connection) {
        // TODO check if key already exists
        this.connections[key] = connection;
    }

    public getPools(): Record<string, Pool> {
        return this.pools;
    }

    public getConnections(): Record<string, Connection> {
        return this.connections;
    }

    // TOOD close single connection
    // TODO close single pool
    // TODO close all connections
    // TOOD close all pools

    public static getInstance(): MySQLService {
        if (this.instance == null) {
            this.instance = new this();
        }

        return this.instance;
    }

    public async getConnectionFromPool(key: string): Promise<PoolConnection | null> {
        try {
            const connection: PoolConnection = await this.pools[key].getConnection();
            if (connection == null) {
                const error: string = 'No connection available';
                throw (error);
            }
            return connection;
        } catch (error) {
            throw error;
        }
    }
}
