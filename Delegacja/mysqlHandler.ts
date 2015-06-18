var mysql = require('mysql');
import objectHandler = require('./objectHandler');

var pool = mysql.createPool({
    host: 'atomic-jumpers.xaa.pl',
    user: 'atomicju_db',
    database: 'atomicju_db',
    password: 'turbo',
});

export function selectQueries(query: string): any {
    var value = null;
    pool.getConnection((err, connection) => {
        connection.query(query, (err, rows, fields) => {
            if (err) throw err;
            value = objectHandler.getCloneOfArray(rows);
            connection.destroy();
        });
    });
    return value;
}
export function selectQuery(query: string, func: any, params: any) {
    pool.getConnection((err, connection) => {
        var x = connection.query(query, (err, rows, fields) => {
            if (err) throw err;
            params[0] = rows[0];
            func.apply(this, params);
            connection.destroy();
        });
    });
}
export function selectQueryCount(query: string): number {
    var value;
    pool.getConnection((err, connection) => {
        connection.query(query, (err, rows, fields) => {
            if (err) throw err;
            value = rows.affectedRows;
            connection.destroy();
        });
    });
    return value;
}
export function insertQuery(query: string): boolean {
    var value = false;
    pool.getConnection((err, connection) => {
        connection.query(query, (err, rows, fields) => {
            if (err) throw err;
            value = true;
            connection.destroy();
        });
    });
    return value;
}
export function updateQuery(query: string): number {
    var value = -1;
    pool.getConnection((err, connection) => {
        connection.query(query, (err, rows, fields) => {
            if (err) throw err;
            value = rows.affectedRows;
            connection.destroy();
        });
    });
    return value;
}
export function deleteQuery(query: string): number {
    var value = -1;
    pool.getConnection((err, connection) => {
        connection.query(query, (err, rows, fields) => {
            if (err) throw err;
            value = rows.affectedRows;
            connection.destroy();
        });
    });
    return value;
}