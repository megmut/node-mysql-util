"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Executions = void 0;
const utils_1 = require("./utils");
class Executions {
    static async execute(query, params, connection) {
        if (connection == null) {
            const error = 'No connection available';
            throw (error);
        }
        try {
            const result = await connection.query(query, params);
            if (utils_1.isPoolConnection(connection)) {
                connection.release();
            }
            return result;
        }
        catch (err) {
            if (utils_1.isPoolConnection(connection)) {
                connection.release();
            }
            throw err;
        }
    }
    static async executeTransaction(query, params, connection) {
        if (connection == null) {
            const error = 'No connection available';
            throw (error);
        }
        try {
            await connection.beginTransaction();
            const result = await connection.query(query, params);
            await connection.commit();
            if (utils_1.isPoolConnection(connection)) {
                connection.release();
            }
            return result;
        }
        catch (error) {
            await connection.rollback();
            if (utils_1.isPoolConnection(connection)) {
                connection.release();
            }
            throw new Error(error);
        }
    }
    static async executeMultipleTransactions(queries, connection) {
        if (connection == null) {
            const error = 'No connection available';
            throw (error);
        }
        try {
            await connection.beginTransaction();
            const result = {};
            for (const query of queries) {
                result[query.id] = await connection.query(query.query, query.params);
            }
            await connection.commit();
            if (utils_1.isPoolConnection(connection)) {
                connection.release();
            }
            return result;
        }
        catch (error) {
            await connection.rollback();
            if (utils_1.isPoolConnection(connection)) {
                connection.release();
            }
            throw new Error(error);
        }
    }
}
exports.Executions = Executions;
//# sourceMappingURL=executions.js.map