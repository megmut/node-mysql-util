import { PoolConnection } from 'mysql2/promise';
export interface IMultipleTransaction {
    id: number;
    query: string;
    params: number | string | boolean | JSON | null[];
}
export declare function isPoolConnection(arg: any): arg is PoolConnection;
