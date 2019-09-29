const mysql = require('mysql2');
const { Mysql_data } = require('../config/app.config');


exports.mySql = () => {
    const connection = mysql.createConnection({
        host: Mysql_data.host,
        user: Mysql_data.username,
        password: Mysql_data.password,
        database: Mysql_data.dbName,
        debug: false
    });

    connection.connect();

    console.log('Connected to Mysql');

    // Query Here :) :)

    // Execute query here


    connection.close();

}