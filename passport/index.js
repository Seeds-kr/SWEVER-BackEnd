const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const models = require('../models')

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id) // user id 만 추출
    });

    passport.deserializeUser((id, done) => {
        models.user.findOne({ where: { id }})
            .then((user) => done(null, user))
            .catch(err => done(err));
    });

    local();
};