((logWriter) => {
    'use strict';

    const fs = require('fs');
    const path = require('path');
    const morgan = require('morgan');
    const moment = require('moment-timezone');
    const { dbConfig } = require('../config/app.config');

    const { createLogger, transports, format } = require('winston');
    const { combine, label, printf } = format;


    const myFormat = printf(info => `${info.timestamp} [${info.level}]:${info.label} - ${info.message}`);

    const appendTimestamp = format((info, opts) => {
        if (opts.tz)
            info.timestamp = moment().tz(opts.tz).format();
        return info;
    });

    const accessLogStream = fs.createWriteStream(
        path.join(__dirname, 'logs', 'Loggerfile.log'),
        { flags: 'a' }
    );


    logWriter.init = (app) => {

        require('winston-mongodb');


        morgan.token('date', (req, res, tz) => {
            return moment().tz('Asia/Kathmandu').format();
        });
        morgan.format('myformat', '[:data[Asia/Kathmandu]]":method:url":status:res[content-lenght]-:response-time ms');

        app.use(morgan('myformat', { stream: accessLogStream }));

        process.on('unhandledRejection', (ex) => {

            console.log('error logger unhandled error rejection', ex);
        });


    }

    logWriter.writeError = (err) => {

        const logger = createLogger({
            level: 'info',
            format: combine(
                label({ label: 'Message' }),
                appendTimestamp({ tz: 'Asia/Kathmandu' }),
                myFormat
            ),
            transports: [
                new transports.File({
                    filename: path.join(__dirname, 'logs', 'error.log'), level: 'error'
                }),
                new transports.MongoDB({ db: dbConfig.dburl })
            ],
            exceptionHandlers: [
                new transports.Console({ colorize: true, prettyPrint: true }),
                new transports.File({
                    filename: path.join(__dirname, 'logs', 'uncaughtExpextions.log')
                })
            ],
            exitOnError: false
        });

        logger.error(err.message, err);

    }

})(module.exports);