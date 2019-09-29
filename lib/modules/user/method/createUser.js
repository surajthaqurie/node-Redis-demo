'use strict';

const BCRYPT_SALT_ROUND = 10;
const httpStatus = require('http-status');
const bcryptHelper = require('../../../helpers/bcrypt.helper');
//const utilityHelper = require('../../../helpers/utility.helper');
const collectionHelper = require('../../../helpers/collection.hepler');
const commonHelper = require('../../../common/common-helper-function');

const { collectionConfig, dbConfig } = require('../../../config/app.config');
const { validate } = require('../validation');
const { message } = require('../config-message');

const addUser = async (req, res, next) => {
    try {
        const userColl = collectionConfig.usereColl;

        let fields = ['firstName', 'lastName', 'email', 'password', 'phone'];

        let user = collectionHelper.collectInputsData(req.body, fields);

        const { error } = validate(user);
        if (error) {
            return commonHelper.sendResponseData(res, {
                status: httpStatus.BAD_REQUEST,
                message: error.details[0].message
            });
        }

        let query = { email: user.email, deleted: false };

        let userExists = await collectionHelper.getDocument(userColl, query);
        if (userExists) {
            return commonHelper.sendResponseData(res, {
                status: httpStatus.CONFLICT,
                message: message.userEmailConfilct.message
            })
        }

        let salt = await bcryptHelper.generateSalt(BCRYPT_SALT_ROUND);
        let hashPassword = await bcryptHelper.hashPassword(user.password, salt);

        user.password = hashPassword;
        user.deleted = false;
        user.update_on = null;
        user.deleted_on = null;
        user.terms_and_conditons = true;
        user.registered_on = new Date();
        user.role = dbConfig.DEFAULT_USER_ROLE;

        let saveRes = await collectionHelper.saveDocument(userColl, user);
        if (saveRes.result.n > 0) {
            return commonHelper.sendJsonResponseMessage(res, saveRes, user, message.userSaveSuccess.message);
        }

    } catch (err) {
        next(err);
    }
}
module.exports = addUser;
