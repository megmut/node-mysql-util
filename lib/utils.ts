import { PoolConnection } from 'mysql2/promise';


export interface IMultipleTransaction {
    id: number;
    query: string;
    params: Array<number | string | boolean | JSON | null>;
}

export function isPoolConnection(arg: any): arg is PoolConnection {
    return 'release' in arg;
}