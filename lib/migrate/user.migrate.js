const Sequelize  = require('sequelize');
const { Mysql_data } = require('../config/app.config');

exports.migrateDBs = () => {

    try {
        const path = Mysql_data.sqlUrl;
        const sequelize = new Sequelize(path, { logging: false });

        User = sequelize.define('users', {
            id: {
                type: Sequelize.UUIDV4,
                primaryKey: true,
                // autoIncrement: true,
            },
            first_name: {
                type: Sequelize.STRING,
                // allowNull: false,

            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                // validate: {
                //     isEmail: true
                // }
            },
            password: Sequelize.STRING,
            phone: Sequelize.INTEGER,
            deleted: Sequelize.BOOLEAN,
            updated_on: {
                type: Sequelize.DATE,
                defaultValue: null
            },
            role: {
                type: Sequelize.STRING,
                defaultValue: "user"
            },
            // don't add the timestamp attributes (updatedAt, createdAt)
            // don't delete database entries but set the newly added attribute deletedAt
            timestamps: false,

            // to the current date (when deletion was done). paranoid will only work if
            // timestamps are enabled
            paranoid: true,

        });

        sequelize.authenticate().then(() => {
            console.log('Connection established successfully to mySql...:)');
            // user.create();
            sequelize.sync().then(() => {

            }).catch(err => {
                console.log('Unable to connect to the mySql database..:(', err);
            }).finally(() => {

                sequelize.close();
            });
        });
    } catch (err) {
        console.log('Error', err);

    }
}
