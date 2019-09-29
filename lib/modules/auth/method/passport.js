const localStrategy = require('passport-local').Strategy;
const { comparePassword } = require('../../../helpers/bcrypt.helper');

module.exports = passport => {
    passport.use(new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            db.collection('users').findOne({ email: email, deleted: false }, async function (err, user) {
                if (err) { return done(err) };
                if (!user) {
                    user = {
                        success: false
                    }
                    return done(null, user);
                }

                const matchPassword = await comparePassword(password, user.password);
                if (!matchPassword) {
                    user = {
                        success: false
                    }
                    return done(null, user)
                };

                return done(null, user);
            });
        }
    ));
}