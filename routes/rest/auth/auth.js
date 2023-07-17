const models = require('../../../models');
const sha256 = require('sha256');
const app = require('../../../app');
const bcrypt = require('bcrypt');

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
