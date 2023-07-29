const models = require('../../../models');
const sha256 = require('sha256');
const app = require('../../../app');
const bcrypt = require('bcrypt');
const passport = require('passport')

exports.getSession = async (req, res, next) => {
    console.log('==================')
    console.log(req.user);
    if (req.session.passport) {
      res.send({
        result: true,
        user: req.session.user
      });
    } else {
      res.status(404).send({
        result: false
      });
    }
  }


exports.join = async (req, res, next) => {
    const { email, name, password } = req.body;
    try {
        const exUser = await models.user.findOne({ where: { user_email: email }});
        if (exUser) {
            res.send([{
                Message: "이미 존재하는 이메일입니다.", 
                ResultCode: "Email_Exists", 
            }])
        }
        const hash = await bcrypt.hash(password, 12);
        await models.user.create({
            user_email: email,
            user_name: name,
            user_password: hash,
        })
        res.send([{
            Message: "회원가입이 완료되었습니다.", 
            ResultCode: "Signin_Success", 
        }])
    } catch (error) {
        console.error(error);
        next(error);
    }
}

exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) { // 서버 실패
            console.error(authError);
            return next(authError);
        }
        if (!user) { // 로직 실패
            return res.send({ message: '로직 실패' });
        }
        return req.login(user, (loginError) => { // 로그인 성공
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.send({ message: '로그인 성공' });
        })
    })(req, res, next);
};

exports.logout = (req, res, next) => {
    req.logout(() => {
        res.send({ message: '로그아웃 성공' });
    });
};