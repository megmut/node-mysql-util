import { Connection, FieldPacket, PoolConnection } from 'mysql2/promise';
import { MySQLService } from './service';
import { Executions } from './executions';


type dbString = 'auth' | 'crm' | 'scheduler';

export class MySQLUtil {

    public static async ping(dbKey: dbString): Promise<boolean> {
        const connection = await MySQLService.getInstance().getConnectionFromPool(dbKey);
        if (connection == null) {
            const error: string = 'No connection available';
            throw (error);
        }
        try {
            await connection.ping();
            connection.release();
            return true;
        } catch (error) {
            throw error;
        }
    }

    // TODO count database open connections

    public static async execute(query: string, params: any[], connection: Connection | PoolConnection): Promise<[any, FieldPacket[]]> {
        return Executions.execute(query, params, connection)
    }

    public static async insertOne(query: string, params: any[], connection: Connection | PoolConnection): Promise<number | null> {
        try {
            const result = await this.execute(query, params, connection);
            if (result == null) {
                return null;
            }
            if (result.length > 0 && result[0].insertId != null) {
                return result[0].insertId;
            } else {
                return null;
            }
        } catch (mysqlError) {
            throw mysqlError;
        }
    }

    public static async insertMany(query: string, params: any[], connection: Connection | PoolConnection): Promise<boolean> {
        try {
            const result = await this.execute(query, params, connection);
            if(result == null) { return false; }
            if (result.length > 0 && result[0].insertId != null) {
                return true;
            } else {
                return false;
            }
        } catch (mysqlError) {
            throw mysqlError;
        }
    }

    public static async selectOne<T>(query: string, params: any[], connection: Connection | PoolConnection): Promise<T | null> {
        try {
            const result = await this.execute(query, params, connection);
            if (result !== null && result[0].length >= 1) {
                return result[0][0];
            } else {
                return null;
            }
        } catch (mysqlError) {
            throw mysqlError;
        }
    }

    public static async selectMany<T>(query: string, params: any[], connection: Connection | PoolConnection): Promise<T[] | null> {
        try {
            const result = await this.execute(query, params, connection);
            if (result !== null && result[0].length >= 1) {
                return result[0];
            } else {
                return null;
            }
        } catch (mysqlError) {
            throw mysqlError;
        }
    }

    public static async deleteOne(query: string, params: any[], connection: Connection | PoolConnection): Promise<boolean> {
        try {
            const result = await this.execute(query, params, connection);
            if (result !== null && result.length > 0 && result[0].affectedRows === 1) {
                return true;
            } else {
                return false;
            }
        } catch (mysqlError) {
            throw mysqlError;
        }
    }

    public static async deleteMany(query: string, params: any[], connection: Connection | PoolConnection): Promise<boolean> {
        try {
            const result = await this.execute(query, params, connection);
            if (result !== null && result.length > 0 && result[0].affectedRows > 0) {
                return true;
            } else {
                return false;
            }
        } catch (mysqlError) {
            throw mysqlError;
        }
    }

    public static async updateOne(query: string, params: any[], connection: Connection | PoolConnection): Promise<boolean> {
        try {
            const result = await this.execute(query, params, connection);
            if (result !== null && result.length > 0 && result[0].affectedRows === 1) {
                return true;
            } else {
                return false;
            }
        } catch (mysqlError) {
            throw mysqlError;
        }
    }

    public static generateUpdateStatement(fields: string[], values: any[]): string {
        if (fields.length !== values.length) {
            throw new Error('Field count does not match value counts');
        }

        let updateString: string = '';

        for (let i = 0; i <= fields.length - 1; i += 1) {
            updateString += `${fields[i]} = ?`;
            if (i < fields.length - 1) {
                updateString += ',';
            }
        }

        return updateString;
    }

    public static generateSelectFields(fields: string[]): string {
        const split: string = fields.join(',');
        if (split.substring(split.length - 1) === ',') {
            return split.substring(0, split.length - 1);
        } else {
            return split;
        }
    }
}
