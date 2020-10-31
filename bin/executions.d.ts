import { IMultipleTransaction } from './utils';
import { Connection, FieldPacket, PoolConnection } from 'mysql2/promise';
export declare class Executions {
    static execute(query: string, params: any[], connection: Connection | PoolConnection): Promise<[any, FieldPacket[]]>;
    static executeTransaction(query: string, params: any[], connection: Connection | PoolConnection): Promise<[any, FieldPacket[]]>;
    static executeMultipleTransactions(queries: IMultipleTransaction[], connection: Connection | PoolConnection): Promise<{
        [index: number]: any;
    }>;
}
