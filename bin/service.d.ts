import { Connection, Pool, PoolConnection } from 'mysql2/promise';
export interface IMultipleTransaction {
    id: number;
    query: string;
    params: number | string | boolean | JSON | null[];
}
export declare class MySQLService {
    private static instance;
    private readonly pools;
    private readonly connections;
    constructor();
    addPool(key: string, pool: Pool): void;
    addConnection(key: string, connection: Connection): void;
    getPools(): Record<string, Pool>;
    getConnections(): Record<string, Connection>;
    static getInstance(): MySQLService;
    getConnectionFromPool(key: string): Promise<PoolConnection | null>;
}
