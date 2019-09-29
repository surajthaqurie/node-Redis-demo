((dbConnector) => {
  'use strict';

  const BCRYPT_SALT_ROUND = 10;
  const mongodbClient = require('mongodb').MongoClient;
  const collectionHelper = require('../helpers/collection.hepler');
  const bcryptHelper = require('./bcrypt.helper');

  const { dbConfig, collectionConfig, superUser } = require('../config/app.config');


  dbConnector.init = async (app) => {
    mongodbClient.connect(dbConfig.dburl, { useNewUrlParser: true })
      .then(async (client) => {
        const db = client.db(`${dbConfig.db}`);
        global.db = db;
        console.log('Database Connection Sucessfully ');

        // Creating super user if Db is Crashed then super user helps to restart.

        const userColl = collectionConfig.usereColl;

        let query = { role: dbConfig.SUPER_USER_ROLE };

        const superuserExists = await collectionHelper.getDocument(userColl, query);

        if (!superuserExists) {

          let salt = await bcryptHelper.generateSalt(BCRYPT_SALT_ROUND);
          let hashPassword = await bcryptHelper.hashPassword(process.env.SUPER_USER_PASS || superUser.SUPER_USER_PASSWORD, salt);

          let superuser = {
            firstName: process.env.SUPER_USER_FIRSTNAME || superUser.SUPER_USER_FIRSTNAME,
            lastName: process.env.SUPER_USER_LASTNAME || superUser.SUPER_USER_LASTNAME,
            email: process.env.SUPER_USER_EMAIL || superUser.SUPER_USER_EMAIL,
            password: hashPassword,
            phone: process.env.SUPER_USER_PHONE || superUser.SUPER_USER_PHONE,
            role: process.env.SUPER_USER_ROLE || superUser.SUPER_USER_ROLE,
            deleted: false,
            registered_on: new Date()
          }

          const saveRes = await collectionHelper.saveDocument(userColl, superuser);
          if (saveRes.result.n > 0) {
            console.log('The super user created successfully', superUser);
          } else {
            console.log('super user can not be created');
          }

        }
      })
      .catch((err) => {
        console.log('DataBase Connection Denied', err.stack);
      })
  }
})(module.exports);
