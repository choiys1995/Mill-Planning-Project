const jwt = require('jsonwebtoken');
const passport = require('passport');

/**
 * 로그인메서드
 * 평문으로 받아서 암호화된 데이터베이스의 비밀번호와 비교
 */
exports.Login = async function(req, res) {
    passport.authenticate('local', (err, account) => {
        if(err) return res.status(400).end('잘못된 주소로의 접근입니다.');
        if(!account) return res.status(406).json('Invalid email or password')
        req.login(account, (error) => {
            if(error) return res.status(500).json(error);
            const token = jwt.sign(
                {
                    email: account.email,
                },  //토큰에 입력할 값
                global.secret,  //비밀 키
                { expiresIn: '60 days' } //토큰 만료 시간
            )
            return res.status(200).json({ token });
        });
    })(req, res)
}

exports.oAuth_Login = async function(req, res) {
    passport.authenticate('local', (err, account) => {

    })
}

exports.Auth = async function(req, res){
    res.json();
}

exports.Logout = async function(req, res) {
    console.log(req.user);
    req.logout();

    res.json();
}