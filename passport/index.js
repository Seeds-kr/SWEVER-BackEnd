const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const models = require('../models')

module.exports = () => {
    passport.serializeUser((user, done) => {  // user = exUser
        done(null, user.id) // user id 만 추출
    });
    // 세션 { 123: 1 } - { 세션쿠키: 유저아이디 } -> 메모리에 저장 
    passport.deserializeUser((id, done) => {
        models.user.findOne({ where: { id }})
            .then((user) => done(null, user))
            .catch(err => done(err));
    });

    local();
    kakao();
};