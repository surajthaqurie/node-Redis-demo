exports.message = {
    userSaveSuccess: {
        message: 'User created sucessfully'
    },
    userSaveFail: {
        message: 'Sorry !!! user can not be created'
    },
    getUserFail: {
        message: 'Sorry !!! user records are not found'
    },
    getUserBuIdFail: {
        message: 'Sorry !!user record is not found'
    },
    updateSuccess: {
        message: 'User data are updated successfully'
    },
    updatefail: {
        message: 'User data can not be modified'
    },
    deleteSucess: {
        message: 'Sorry !! user data can not be deleted'
    },
    userEmailConfilct: {
        message: 'Sorry !!! email is already taken'
    },
    userNotAvailble: {
        message: 'Sorry !!! this user is not found'
    }
}

exports.formFields = 'firstName lastName email password phone';
exports.projectionFields = {
    '_id:': 1,
    'firstName': 1,
    'lastName': 1,
    'email': 1,
    'phone': 1,
    'registered_on': 1
}