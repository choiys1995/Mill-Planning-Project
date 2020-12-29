
/**
 * 해당 유저가 로그인 했는지, 안했는지를 체크해주는 메서드
 * checkToLogin = 로그인했는지 체크
 * checkToNotLogin = 로그인 안했을경우에만 입장가능
 */
module.exports = {
    checkToLogin: function(req, res, next){
        if(!req.user) return res.status(401).json();
        console.log(`로그인 한 사용자 ${req.user}의 요청`);
        next();
    },

    checkToNotLogin: function(req, res, next){
        if(req.user) return res.status(401).json();
        console.log(`로그인 하지 않은 사용자의 요청`);
        next();
    },

    checkToAdmin: function(req, res, next) {
        if(!req.user.admin) return res.status(403).json();
        console.log(`관리자 ${req.user}의 요청`);
        next();
    }
}