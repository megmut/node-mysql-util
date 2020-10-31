"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const utils_1 = require("./utils");
const executions_1 = require("./executions");
class Query {
    static async ping(connection) {
        if (connection == null) {
            const error = 'No connection available';
            throw (error);
        }
        try {
            await connection.ping();
            if (utils_1.isPoolConnection(connection)) {
                connection.release();
            }
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    // TODO count database open connections
    static async execute(query, params, connection) {
        return executions_1.Executions.execute(query, params, connection);
    }
    static async insertOne(query, params, connection) {
        try {
            const result = await this.execute(query, params, connection);
            if (result == null) {
                return null;
            }
            if (result.length > 0 && result[0].insertId != null) {
                return result[0].insertId;
            }
            else {
                return null;
            }
        }
        catch (mysqlError) {
            throw mysqlError;
        }
    }
    static async insertMany(query, params, connection) {
        try {
            const result = await this.execute(query, params, connection);
            if (result == null) {
                return false;
            }
            if (result.length > 0 && result[0].insertId != null) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (mysqlError) {
            throw mysqlError;
        }
    }
    static async selectOne(query, params, connection) {
        try {
            const result = await this.execute(query, params, connection);
            if (result !== null && result[0].length >= 1) {
                return result[0][0];
            }
            else {
                return null;
            }
        }
        catch (mysqlError) {
            throw mysqlError;
        }
    }
    static async selectMany(query, params, connection) {
        try {
            const result = await this.execute(query, params, connection);
            if (result !== null && result[0].length >= 1) {
                return result[0];
            }
            else {
                return null;
            }
        }
        catch (mysqlError) {
            throw mysqlError;
        }
    }
    static async deleteOne(query, params, connection) {
        try {
            const result = await this.execute(query, params, connection);
            if (result !== null && result.length > 0 && result[0].affectedRows === 1) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (mysqlError) {
            throw mysqlError;
        }
    }
    static async deleteMany(query, params, connection) {
        try {
            const result = await this.execute(query, params, connection);
            if (result !== null && result.length > 0 && result[0].affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (mysqlError) {
            throw mysqlError;
        }
    }
    static async updateOne(query, params, connection) {
        try {
            const result = await this.execute(query, params, connection);
            if (result !== null && result.length > 0 && result[0].affectedRows === 1) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (mysqlError) {
            throw mysqlError;
        }
    }
    static generateUpdateStatement(fields, values) {
        if (fields.length !== values.length) {
            throw new Error('Field count does not match value counts');
        }
        let updateString = '';
        for (let i = 0; i <= fields.length - 1; i += 1) {
            updateString += `${fields[i]} = ?`;
            if (i < fields.length - 1) {
                updateString += ',';
            }
        }
        return updateString;
    }
    static generateSelectFields(fields) {
        const split = fields.join(',');
        if (split.substring(split.length - 1) === ',') {
            return split.substring(0, split.length - 1);
        }
        else {
            return split;
        }
    }
}
exports.Query = Query;
//# sourceMappingURL=queries.js.map