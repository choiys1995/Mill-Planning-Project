
/**
 * 해당 유저가 로그인 했는지, 안했는지를 체크해주는 메서드
 * checkToLogin = 로그인했는지 체크
 * checkToNotLogin = 로그인 안했을경우에만 입장가능
 */
module.exports = {
    checkToLogin: function(req, res, next){
        if(!req.user) return res.status(401).json('로그인이 되어있지 않은 사용자입니다.');
        next();
    },

    checkToNotLogin: function(req, res, next){
        if(req.user) return res.status(401).json('이미 로그인이 되어있는 사용자입니다.');
        next();
    },

    checkToAdmin: function(req, res, next) {
        if(!req.user.admin) return res.status(401).json('관리자만 입장할 수 있습니다.');
        next();
    }
}