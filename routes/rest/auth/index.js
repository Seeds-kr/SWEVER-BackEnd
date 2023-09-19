const express = require('express');
const passport = require('passport')
const { isLoggedIn, isNotLoggedIn } = require('../../../middlewares');
const { signup, account, passwordCheck, password, nickname, login, logout, getSession } = require('./auth');
const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
})


router.get('/session', getSession);

// POST /auth/join 
router.post('/signup', isNotLoggedIn, signup);

router.get('/signup', (req, res)=>{
    res.status(405).send({
            Message: "Method not allowed", 
            ResultCode: "ERR_INVALID_DATA"            
        });
    return res;
});

// DELETE /auth/account - 회원탈퇴 기능
router.delete('/account', isLoggedIn, account);

// POST /auth/password - 비밀번호 확인 기능
router.post('/password', isLoggedIn, passwordCheck);

// PATCH /auth/password
router.patch('/password', isLoggedIn, password);

// PATCH /auth/nickname
router.patch('/nickname', isLoggedIn, nickname);

// POST /auth/login
router.post('/login', isNotLoggedIn, login);

router.get('/login', (req, res)=>{
    res.status(405).send({
            Message: "Method not allowed", 
            ResultCode: "ERR_INVALID_DATA"            
        });
    return res;
});


// GET /auth/logout
router.post('/logout', isLoggedIn, logout);

// /auth/kakao
router.get('/kakao', passport.authenticate('kakao'));

// /auth/kakao/callback
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/'
}), (req, res) => {
    res.send({
        Message: "카카오톡 로그인이 완료되었습니다.", 
        ResultCode: "Kakao_Login_Success"
    })
});

module.exports = router;