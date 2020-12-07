const mysql = require("mysql");
const { exit } = require("process");
const { promisify } = require("util");

const { database } = require("./config");

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.error("DATABASE CONNECTION WAS CLOSED");
        }

        if (err.code === "ER_CON_COUNT_ERROR") {
            console.error("DATABASE HAS MANY CONNECTIONS");
        }

        if (err.code === "ECONNREFUSED") {
            console.error("DATABASE CONNECTION WAS REFUSED");
        }
        console.error("FATAL ERROR: ", err);
        exit(-1);
    }

    if (connection) connection.release();
    console.log("DB is Connected");

    return;
});

// Promisify pool querys
// pool NO permite usar promesas ni async/await...  por eso se usa promisify
// Permite utilizar promesas cada vez que se hagan consultas.
pool.query = promisify(pool.query);

module.exports = pool;
