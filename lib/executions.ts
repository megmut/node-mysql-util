import { IMultipleTransaction, isPoolConnection } from './utils';
import { Connection, FieldPacket, PoolConnection } from 'mysql2/promise';

export class Executions {

    public static async execute(query: string, params: any[], connection: Connection | PoolConnection): Promise<[any, FieldPacket[]]> {
        if (connection == null) {
            const error: string = 'No connection available';
            throw (error);
        }
        try {
            const result = await connection.query(query, params);
            if (isPoolConnection(connection)) {
                connection.release();
            }
            return result;
        } catch (err) {
            if (isPoolConnection(connection)) {
                connection.release();
            }
            throw err;
        }
    }

    public static async executeTransaction(query: string, params: any[], connection: Connection | PoolConnection): Promise<[any, FieldPacket[]]> {
        if (connection == null) {
            const error: string = 'No connection available';
            throw (error);
        }
        try {
            await connection.beginTransaction();
            const result: [any, FieldPacket[]] = await connection.query(query, params);
            await connection.commit();
            if (isPoolConnection(connection)) {
                connection.release();
            }
            return result;
        } catch (error) {
            await connection.rollback();
            if (isPoolConnection(connection)) {
                connection.release();
            }
            throw new Error(error);
        }
    }

    public static async executeMultipleTransactions(queries: IMultipleTransaction[], connection: Connection | PoolConnection): Promise<{ [index: number]: any }> {
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
            if (isPoolConnection(connection)) {
                connection.release();
            }
            return result;
        } catch (error) {
            await connection.rollback();
            if (isPoolConnection(connection)) {
                connection.release();
            }
            throw new Error(error);
        }
    }
}