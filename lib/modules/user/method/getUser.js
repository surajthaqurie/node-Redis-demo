'use strict';

const redis = require('redis');

const collectionHelper = require('../../../helpers/collection.hepler');

const { collectionConfig } = require('../../../config/app.config');
const { message } = require('../config-message');

const getUser = async (req, res, next) => {
    const userColl = collectionConfig.usereColl;
    const query = { deleted: false, role: 'user' };
    const proData = { firstName: 1, lastName: 1, email: 1, phone: 1 }

    try {
        // Creating Client for redis server
        const client = redis.createClient();

        // On the Client to the server (Connection)
        client.on('error', function (err) {
            console.log('Error', err);
        });

        let user = await collectionHelper.getDocuments(userColl, query, proData);
        if (user.length > 0) {
            // First Store the data on Redis Cache
            for (let i = 0; i <= user.length; i++) {
                client.HSET('userData', 'allUser', JSON.stringify(user));
                // Then Getting data from Redis
                return client.HGETALL('userData', (err, obj) => {
                    res.status(200).json(obj);

                });
            }
        }
        res.status(400).json({
            message: message.userNotAvailble.message
        })
    } catch (err) {
        next(err);
    }
}
module.exports = getUser;
