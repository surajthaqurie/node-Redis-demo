'use strict';

((commonHelper) => {
    const httpStatus = require('http-status');
    const objectId = require('mongodb').ObjectID;
    const Promise = require('bluebird');

    commonHelper.getLoggedInUserEmail = (req) => {
        return (req.decodedUser && req.decodedUser.email) ? req.decodedUser.email : '';
    }

    commonHelper.getLoggedInUserId = (req) => {
        return (req.decodedUser && req.decodedUser._id) ?
            req.decodedUser._id : '';
    }

    commonHelper.getLoggedInUserRole = (req) => {
        return (req.decodedUser && req.decodedUser.role) ? req.decodedUser.role : '';
    }

    //get responses
    commonHelper.sendJsonResponse = (res, data, message, status) => {
        res.status(status);
        const returnObj = data ? (status == httpStatus.NOT_FOUND ? {
            'status': status,
            'data': (data instanceof Array) ? [] : {},
            'message': message
        } : {
                'status': status,
                'data': data
            }) : {
                'status': status,
                'data': (data instanceof Array) ? [] : {},
                'message': message
            };
        res.json(returnObj);
    }

    commonHelper.sendNormalRespose = (res, data, status) => {
        res.status(status);
        res.json({
            'status': status,
            'data': data
        });
    }
    commonHelper.sendResponseData = (res, { status, message }) => {
        res.status(status);
        res.json({
            'status': status,
            'message': message
        });
    }

    // put and post req response
    commonHelper.sendJsonResponseMessage = (res, dataRes, dataObj, messageResponse) => {
        if (dataRes && dataRes.result && dataRes.result.n > 0) {
            const returnObj = dataObj ? {
                status: httpStatus.OK,
                message: messageResponse,
                data: dataObj
            } : {
                    status: httpStatus.OK,
                    message: messageResponse
                };
            res.status(httpStatus.OK);
            return res.json(returnObj);
        } else {
            return commonHelper.sendResponseData(res, {
                status: httpStatus.NOT_MODIFIED,
                message: 'data not modified'
            });
        }
    }

})(module.exports);