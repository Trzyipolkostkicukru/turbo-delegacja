var mysql = require('mysql');
var pdfCrowd = require('pdfcrowd');
var pdfCrowdClient = new pdfCrowd.Pdfcrowd('biedronka', 'c9225df149b2469749d20b34c928cdff');
var pool = mysql.createPool({
    host: 'atomic-jumpers.xaa.pl',
    user: 'atomicju_db',
    database: 'atomicju_db',
    password: 'turbo',
});
function selectQueries(query, func, params) {
    var _this = this;
    pool.getConnection(function (err, connection) {
        connection.query(query, function (err, rows, fields) {
            if (err)
                throw err;
            params[0] = rows;
            func.apply(_this, params);
            connection.destroy();
        });
    });
}
exports.selectQueries = selectQueries;
function selectQuery(query, func, params) {
    var _this = this;
    pool.getConnection(function (err, connection) {
        var x = connection.query(query, function (err, rows, fields) {
            if (err)
                throw err;
            params[0] = rows[0];
            func.apply(_this, params);
            connection.destroy();
        });
    });
}
exports.selectQuery = selectQuery;
function selectQueryCount(query) {
    var value;
    pool.getConnection(function (err, connection) {
        connection.query(query, function (err, rows, fields) {
            if (err)
                throw err;
            value = rows.affectedRows;
            connection.destroy();
        });
    });
    return value;
}
exports.selectQueryCount = selectQueryCount;
function insertQuery(query) {
    pool.getConnection(function (err, connection) {
        connection.query(query, function (err, rows, fields) {
            if (err)
                throw err;
            connection.destroy();
        });
    });
}
exports.insertQuery = insertQuery;
function updateQuery(query) {
    var value = -1;
    pool.getConnection(function (err, connection) {
        connection.query(query, function (err, rows, fields) {
            if (err)
                throw err;
            value = rows.affectedRows;
            connection.destroy();
        });
    });
    return value;
}
exports.updateQuery = updateQuery;
function deleteQuery(query) {
    var value = -1;
    pool.getConnection(function (err, connection) {
        connection.query(query, function (err, rows, fields) {
            if (err)
                throw err;
            value = rows.affectedRows;
            connection.destroy();
        });
    });
    return value;
}
exports.deleteQuery = deleteQuery;
//# sourceMappingURL=mysqlHandler.js.map