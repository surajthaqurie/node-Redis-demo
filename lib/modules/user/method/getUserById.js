'use strict';

const collectionHelper = require('../../../helpers/collection.hepler');
const objectId = require('mongodb').ObjectID;
const { collectionConfig } = require('../../../config/app.config');
const { message } = require('../config-message');

const getUserById = async (req, res, next) => {

    const userColl = collectionConfig.usereColl;
    const id = objectId(req.params.id);
    let query = { _id: id };
    try {
        let userExists = await collectionHelper.getDocument(userColl, query);
        if (userExists) {
            return res.status(200).json(userExists);
        }
        res.status(400).json({
            message: message.userNotAvailble.message
        })

    } catch (err) {
        next(err);
    }
}
module.exports = getUserById;