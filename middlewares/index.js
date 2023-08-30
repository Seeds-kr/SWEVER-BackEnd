exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) { // 패스포트 통해서 로그인 했니
        next();
    } else {
        res.status(403).send([{
            Message: "로그인이 필요합니다.", 
            ResultCode: "Login_Needed"            
        }]);
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) { // 패스포트 통해서 로그인 하지 않음
        next();
    } else {
        res.status(403).send([{
            Message: "이미 로그인 상태입니다.", 
            ResultCode: "Logedin_Already"            
        }]);
    }
};