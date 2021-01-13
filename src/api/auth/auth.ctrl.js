const jwt = require('jsonwebtoken');
const passport = require('passport');

/**
 * 로그인메서드
 * 평문으로 받아서 암호화된 데이터베이스의 비밀번호와 비교
 */
exports.Login = function(req, res) {
    passport.authenticate('local', (err, account) => {
        if(err) return res.status(400).end(err);
        if(!account) return res.status(406).json('Invalid email or password')
        req.login(account, (error) => {
            if(error) return res.status(500).json(error);
            const token = jwt.sign(
                {
                    custid: account.custid,
                    email: account.email,
                    admin: account.admin,
                },  //토큰에 입력할 값
                global.secret,  //비밀 키
                { expiresIn: 60 * 60 * 24 * 7 * 1000 } //토큰 만료 시간
            )
            return res.status(200).json({ token });
        });
    })(req, res)
}

exports.Auth = async function(req, res){
    res.json(req.user);
}

exports.Kakao = async function(req, res) {
    if(req.params.admin) req.session.admin = true;
    else req.session.admin = false;
    passport.authenticate('kakao', (err, account) => {
        if(err) return res.status(500).json(err);

        req.login(account, (error) => {
            if(error) return res.status(500).json(error);
            const token = jwt.sign( {
                custid: account.custid,
                oauth_token: account.oauth_token,
                admin: account.admin,
            },
            global.secret,
            { expiresIn: 60 * 60 * 24 }
            )
            return res.status(200).json({token});
        })
    })(req,res);
}

exports.Logout = async function(req, res) {
    console.log(req.user);
    req.logout();

    if(req.session.admin) delete req.session.admin

    res.json();

    res.redirect('/');
}