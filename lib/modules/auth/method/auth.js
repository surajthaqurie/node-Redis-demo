'use strict';

const httpStauts = require('http-status');
const tokenConfig = require('../../../config/token.config');
const collectionHelper = require('../../../helpers/collection.hepler');
const utilityHelper = require('../../../helpers/utility.helper');
const commonHelper = require('../../../common/common-helper-function');
const authTokenController = require('../../auth-token/auth-token.controller');

const { message } = require('../config');
const { generateToken } = require('../../../helpers/jwt.helper');

exports.authenticateUser = async (req, res, next) => {
    try {

        if (req.user.success === false) {
            res.status(httpStauts.UNAUTHORIZED);
            return res.json({
                status: httpStauts.UNAUTHORIZED,
                message: message.userLoginFail.message
            });
        }

        const _hours = utilityHelper.removeCharFromString(tokenConfig.expries, 'h');

        const tokenExpriyDate = new Date(new Date().getTime() + (parseInt(_hours) * 60 * 60 * 1000));

        let token = generateToken(req.user);

        const saveRes = await authTokenController.postAuthorizationTokenInfo(req, token, req.user.email, tokenExpriyDate, req.user._id, next);

        if (saveRes.result.n > 0) {
            res.status(httpStauts.OK);
            return res.json({
                message: message.userLoginSuccess.message,
                token: token
            });
        } else {
            return commonHelper.sendResponseData(res, {
                status: httpStauts.UNAUTHORIZED,
                message: {
                    message: message.userTokenSaveFail.message,
                    success: false
                }
            });
        }
    } catch (err) {
        next(err);
    }
}

