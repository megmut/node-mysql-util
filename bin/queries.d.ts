import { Connection, FieldPacket, PoolConnection } from 'mysql2/promise';
export declare class Query {
    static ping(connection: Connection | PoolConnection): Promise<boolean>;
    static execute(query: string, params: any[], connection: Connection | PoolConnection): Promise<[any, FieldPacket[]]>;
    static insertOne(query: string, params: any[], connection: Connection | PoolConnection): Promise<number | null>;
    static insertMany(query: string, params: any[], connection: Connection | PoolConnection): Promise<boolean>;
    static selectOne<T>(query: string, params: any[], connection: Connection | PoolConnection): Promise<T | null>;
    static selectMany<T>(query: string, params: any[], connection: Connection | PoolConnection): Promise<T[] | null>;
    static deleteOne(query: string, params: any[], connection: Connection | PoolConnection): Promise<boolean>;
    static deleteMany(query: string, params: any[], connection: Connection | PoolConnection): Promise<boolean>;
    static updateOne(query: string, params: any[], connection: Connection | PoolConnection): Promise<boolean>;
    static generateUpdateStatement(fields: string[], values: any[]): string;
    static generateSelectFields(fields: string[]): string;
}
