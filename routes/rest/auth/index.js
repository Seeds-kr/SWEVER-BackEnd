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

router.get('/join', (req, res)=>{
    res.status(405).send([{
            Message: "Method not allowed", 
            ResultCode: "ERR_INVALID_DATA"            
        }]);
    return res;
});

// POST /auth/login
router.post('/login', isNotLoggedIn, login);

router.get('/login', (req, res)=>{
    res.status(405).send([{
            Message: "Method not allowed", 
            ResultCode: "ERR_INVALID_DATA"            
        }]);
    return res;
});


// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

// /auth/kakao
router.get('/kakao', passport.authenticate('kakao'));

// /auth/kakao/callback
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/'
}), (req, res) => {
    res.send([{
        Message: "카카오톡 로그인이 완료되었습니다.", 
        ResultCode: "Kakao_Login_Success"
    }])
});

module.exports = router;