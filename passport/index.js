const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const user = require('../models/user')

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        user.findOne({ where: { id }})
            .then((user) => done(null, user))
            .catch(err => done(err));
    });

    local();
};