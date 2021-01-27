const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt')

module.exports = function(req, res, next) {
    const token = req.cookies.access_token;

    /**토큰이 존재하지 않을 때 에러처리 */
    if(!token) res.status(403).json({
        error: '로그인이 되어있지 않은 사용자'
    });

    /** 암호화된 토큰을 평문으로 바꾸어 로그인 되어있는지 체크 */
    const decoded = jwt.verify(token, jwtConfig.secret);

    if(!decoded) res.status(400).json({
        error: '잘못된 토큰입니다.'
    });

    if(decoded.username == req.body.username) {
        next()
    }
    else{
        res.clearCookie('access_token')
        res.status(401).json('세션이 만료되었습니다. 다시 로그인해주세요.');
    }
}