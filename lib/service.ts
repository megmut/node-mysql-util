import { Connection, FieldPacket, Pool, PoolConnection } from 'mysql2/promise';
export interface IMultipleTransaction {
    id: number;
    query: string;
    params: Array<number | string | boolean | JSON | null>;
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

    public async execute(query: string, params: any[], databaseKey: string): Promise<[any, FieldPacket[]]> {
        const connection: PoolConnection | null = await this.getConnectionFromPool(databaseKey);
        if (connection == null) {
            const error: string = 'No connection available';
            throw (error);
        }
        try {
            const result = await connection.query(query, params);
            connection.release();
            return result;
        } catch (err) {
            connection.release();
            throw err;
        }
    }

    public async executeTransaction(query: string, params: any[], databaseKey: string): Promise<[any, FieldPacket[]]> {
        const connection: PoolConnection | null = await this.getConnectionFromPool(databaseKey);
        if (connection == null) {
            const error: string = 'No connection available';
            throw (error);
        }
        try {
            await connection.beginTransaction();
            const result: [any, FieldPacket[]] = await connection.query(query, params);
            await connection.commit();
            connection.release();
            return result;
        } catch (error) {
            await connection.rollback();
            connection.release();
            throw new Error(error);
        }
    }

    public async executeMultipleTransactions(queries: IMultipleTransaction[], databaseKey: 'auth' | 'crm' | 'scheduler'): Promise<{ [index: number]: any }> {
        const connection: PoolConnection | null = await this.getConnectionFromPool(databaseKey);
        if (connection == null) {
            const error: string = 'No connection available';
            throw (error);
        }
        try {
            await connection.beginTransaction();
            const result: { [index: number]: any } = {};
            for (const query of queries) {
                result[query.id] = await connection.query(query.query, query.params);
            }
            await connection.commit();
            connection.release();
            return result;
        } catch (error) {
            await connection.rollback();
            connection.release();
            throw new Error(error);
        }
    }
}
