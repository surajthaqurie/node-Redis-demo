const { Sequelize, Model, DataTypes } = require('sequelize');
const { Mysql_data } = require('../config/app.config');

const { mySql } = require('./mySql.helper');

exports.migrateDB = () => {
    try {
        const path = Mysql_data.sqlUrl;
        const sequelize = new Sequelize(path, { logging: false });

        // Just for checking this worked or not ('mysql2) package :) 
        // mySql(); 

        sequelize.authenticate().then(() => {
            console.log('Connection established successfully to mySql...:)');

        }).catch(err => {
            console.log('Unable to connect to the mySql database..:(', err);
        }).finally(() => {

            sequelize.close();
        });

    } catch (err) {
        console.log('Error', err);

    }
}

