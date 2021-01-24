const jwt = require('jsonwebtoken');
const passport = require('passport');
const customers = require('../../models/m_customers');
const owners = require('../../models/m_owners')

/**
 * 로그인메서드
 * 평문으로 받아서 암호화된 데이터베이스의 비밀번호와 비교
 */
exports.Login = function(req, res) {
    passport.authenticate('local', (err, account) => {
        if(err) return res.status(400).json(err);
        if(!account) return res.status(406).json('Invalid email or password')
        req.login(account, (error) => {
            if(error) return res.status(500).json(error);
            const token = jwt.sign(
                {
                    custid: account.custid,
                    ownerid: account.ownerid,
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

exports.findById = async function (req, res) {
    const { email, admin } = req.query;
    if (!email || '') return res.json({ error: '입력된 이메일이 없습니다.', isExist: false })


    const userdata = admin ? await owners.selectemail(email) : 
                await customers.selectemail(email);

    if(!userdata) return res.json({isExist: false})

    res.json({isExist: true})
}

exports.Kakao = async function(req, res) {
    //console.log(req.session, "for kakao");
    if(req.params.admin) 
    {   
        req.session.admin = true;
        return res.redirect('/api/auth/oauth/kakao')
    }
    passport.authenticate('kakao', (err, account) => {
        if(err) return res.status(500).json(err);

        req.login(account, (error) => {
            if(error) return res.status(500).json(error);
            const token = jwt.sign( {
                custid: account.custid,
                ownerid: account.ownerid,
                oauth_token: account.oauth_token,
                admin: account.admin,
            },
            global.secret,
            { expiresIn: 60 * 60 * 24 }
            )
            
            if(token) return res.redirect(req.headers.referer);
        })
    })(req,res);
}

exports.Logout = async function(req, res) {
    if(!req.user) res.status(401).json({message:'로그인 되어있지 않은 사용자입니다.'});
    req.logout();

    if(req.session.admin) delete req.session.admin

    res.json({message: '로그아웃이 성공적으로 이루어졌습니다'});
}
