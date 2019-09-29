const authTokenController = (() => {
    'use strict';

    const httpStatus = require('http-status');
    const commonProvider = require('../../common/common-provider.function');
    const utilityHelper = require('../../helpers/utility.helper');
    const objectId = require('mongodb').ObjectID;
    const commonHelper = require('../../common/common-helper-function');

    const { message } = require('../auth-token/auth-token.config');

    const projectionFields = {
        '_id': 1,
        'authorization_token': 1,
        'user_agent': 1,
        'expires_on': 1,
        'user_id': 1,
        'added_on': 1
    };

    function AuthorizationTokenModule() { }

    const _p = AuthorizationTokenModule.prototype;

    AuthorizationTokenModule.createAuthorizationToken = (_authorizationToken, _userAgent, _expiresOn, _userId) => {
        return {
            '_id': objectId(),
            'authorization_token': _authorizationToken,
            'user_agent': _userAgent,
            'expires_on': _expiresOn,
            'user_id': _userId,
            'added_on': new Date()
        };
    };

    _p.checkAuthorizationTokenStatus = (req, _authorizationToken, _userId) => {
        const queryOpts = {
            authorization_token: _authorizationToken,
            user_id: objectId(_userId),
            expires_on: {
                "$gte": new Date()
            }
        }
        return db.collection('AuthorizationToken').count(queryOpts);
    };

    _p.getAuthorizedTokens = (req, next) => {
        const queryOpts = {
            user_id: commonHelper.getLoggedInUserId(req),
            expires_on: {
                "$gte": new Date()
            }
        }
        const pagerOpts = utilityHelper.paginationControl(req);
        const sortOpts = { added_on: -1 };

        return commonProvider.getPaginationDataList(db.collection('AuthorizationToken'), queryOpts, pagerOpts, projectionFields, sortOpts);
    };

    _p.getAuthorizedTokenById = (req) => {
        const queryOpts = {
            _id: objectId(req.params.authorizationTokenId)
        };

        return req.db.collection('AuthorizationToken').findOne(queryOpts, projectionFields);
    };

    _p.deleteAuthorizationToken = (async function (req, res, next) {
        try {
            const queryOpts = (req.params && req.params.authorizationTokenId) ? { _id: objectId(req.params.authorizationTokenId), user_id: commonHelper.getLoggedInUserId(req) } : { user_id: commonHelper.getLoggedInUserId(req) };

            const dataRes = await db.collection('AuthorizationToken').remove(queryOpts);

            commonHelper.sendJsonResponseMessage(res, dataRes, null, (req.params.authorizationTokenId) ? message.deletedMessage : message.deleteFailedMessage);

        } catch (err) {
            err: err.toString()
        }

    });

    _p.postAuthorizationTokenInfo = (req, authorization_token, user_agent, expires_on, user_id, next) => {
        try {
            const authorizationTokenInfo = AuthorizationTokenModule.createAuthorizationToken(authorization_token, user_agent, expires_on, user_id);

            return db.collection('AuthorizationToken').insertOne(authorizationTokenInfo);


        } catch (err) {
            err: err.toString()
        }
    };

    _p.invalidateAuthToken = (req, user_id) => {
        return db.collection('AuthorizationToken').remove({
            user_id: objectId(user_id)
        });
    };

    return {
        checkAuthorizationTokenStatus: _p.checkAuthorizationTokenStatus,
        getAuthorizedTokens: _p.getAuthorizedTokens,
        getAuthorizedTokenById: _p.getAuthorizedTokenById,
        postAuthorizationTokenInfo: _p.postAuthorizationTokenInfo,
        deleteAuthorizationToken: _p.deleteAuthorizationToken,
        invalidateAuthToken: _p.invalidateAuthToken
    };

})();

module.exports = authTokenController;