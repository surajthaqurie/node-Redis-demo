((appRoute) => {
    appRoute.init = (app) => {

        const userRoute = require('../modules/user/route');
        app.use('/api/users', userRoute);

        const loginRoute = require('../modules/auth/route');
        app.use('/api/login', loginRoute);

    }
})(module.exports);