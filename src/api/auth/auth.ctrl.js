const User = require('../../models/user');
const encrypt = require('../../lib/encrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt')

const removeSecretUserData = function(user){
    delete user.password;
    delete user.salt;

    return user;
}

/**
 * 로그인메서드
 * 평문으로 받아서 암호화된 데이터베이스의 비밀번호와 비교
 */
exports.Login = async function(req, res) {
    const { username, password } = req.body;

    //입력받은 username이 존재하지 않음
    if(!username || '') return res.status(400).json();

    const user = await User.findOne(username);

    //해당 username으로 된 유저가 존재하지 않음 
    if(!user) return res.status(400).json();
    //query 또는 connection문제 발생
    if(user.errno) return res.status(500).json();

    if(username === user.username &&
        encrypt.verifiEncrypt(password, user.password)){
            return res.status(200).json(removeSecretUserData(user));
    }

}

exports.Logout = async function(req, res) {
    if(req.cookies.access_token){
        res.clearCookie('access_token')
        return res.status(204).json()
    }
}

exports.Auth = async function(req, res) {
    /**올바르게 로그인되어있는 사용자 */
    res.status(204).json()
}

/** 테스트 로그인 코드
 * 운영서버로 옮길시 삭제
 */
exports.Test = async function(req, res) {
    const { username, password } = req.body;
    const token = jwt.sign({
        username
    }, jwtConfig.secret, {expiresIn: '1h'});

    const user = await User.findOne(username);

    /**
     * user가 존재하지않거나 query error가 발생하였을경우 에러처리
     */
    if(!user) return res.status(400).json();
    if(user.errno) return res.status(500).json(user);

    /**
     * 평문의 패스워드와 암호화된 패스워드가 일치하는지 체크
     */
    if(encrypt.verifiEncrypt(password, user.password)){
        res.cookie('access_token', token);
        return res.status(200).json(removeSecretUserData(user));
    }

    return res.status(400).json();
}

exports.TestCM = async function(req, res) {
    return res.status(200).json('it')
}