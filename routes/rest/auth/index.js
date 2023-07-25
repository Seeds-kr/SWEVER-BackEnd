const express = require('express');
const passport = require('passport')
const { isLoggedIn, isNotLoggedIn } = require('../../../middlewares');
const { join, join2, login, logout } = require('./auth');
const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
})

// POST /auth/join 
router.post('/join', isNotLoggedIn, join);
// POST /auth/login
router.post('/login', isNotLoggedIn, login);
// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

// /auth/kakao
router.get('/kakao', passport.authenticate('kakao'));

// /auth/kakao/callback
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/'
}), (req, res) => {
    res.send({ message: '카카오 로그인 성공 '});
});

module.exports = router;