const parser = require('body-parser');
const passport = require('passport');
const logWriter = require('./lib/helpers/logwriter.helper');
const errorHandler = require('./lib/middleware/error.handler');

// Testing Files ...:)
const { migrateDB } = require('./lib/helpers/migratedb.helper');
const { migrateDBs } = require('./lib/migrate/trip.migrate');

const express = require('express');
const app = express();

// support parsing of application/json type post data
app.use(parser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(parser.urlencoded({ extended: true }));

// app.use(express.static('./public'));

const dbConnector = require('./lib/helpers/database.helper');
dbConnector.init(app);

const router = require('./lib/route/index');
router.init(app);

// Mongodb  migrated to MySql  with sequelize- ORM(object relation mapping)
// migrateDB();
migrateDBs();

app.use(passport.initialize());
app.use(passport.session());
require('./lib/modules/auth/method/passport')(passport);

logWriter.init(app);

app.use(errorHandler);

module.exports = app;
