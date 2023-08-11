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
        Message: "세션이 존재합니다.", 
        ResultCode: "Session_Exist", 
        result: true,
        user: req.session.user
      });
    } else {
      res.send({
        Message: "세션이 없습니다",
        ResultCode: "Session_Not_Exist", 
        result: false
      });
    }
  }


exports.join = async (req, res, next) => {
    try {
        const { email, name, password } = req.body;
        const exUser = await models.user.findOne({ where: { user_email: email }});
        if (exUser) {
            return res.send({
                Message: "이미 존재하는 이메일입니다.", 
                ResultCode: "Email_Exists", 
            })
        }
        const hash = await bcrypt.hash(password, 12);
        await models.user.create({
            user_email: email,
            user_name: name,
            user_password: hash,
        })
        return res.send({
            Message: "회원가입이 완료되었습니다.", 
            ResultCode: "Signup_Success", 
        })
    } catch (error) {
        console.log(error);        
        res.status(500).send({            
            Message: "Internal server error", 
            ResultCode: "ERR_INTERNAL_SERVER"
        });
    }
}

exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) { // 서버 실패
            console.error(authError);
            return res.status(500).send({            
                Message: "Internal server error", 
                ResultCode: "ERR_INTERNAL_SERVER"
            });
        }
        if (!user) { // 로직 실패
            console.log(info.code)
            if (info.code == 1) {
                return res.send({
                    Message: "비밀번호가 일치하지 않습니다.", 
                    ResultCode: "Wrong_Password"
                });
            } else if (info.code == 2) {
                return res.send({
                    Message: "존재하지 않는 회원입니다.", 
                    ResultCode: "User_NotExist"
                });
            }
        }
        return req.login(user, (loginError) => { // 로그인 성공
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.send({
                Message: "로그인이 완료되었습니다.", 
                ResultCode: "Login_Success"
            })
        })
    })(req, res, next);
};

exports.logout = (req, res, next) => {
    req.logout(() => {
        req.session.destroy();
        res.send({
            Message: "로그아웃이 완료되었습니다.", 
            ResultCode: "Logout_Success", 
        })
    });
};