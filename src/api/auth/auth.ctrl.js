const jwt = require('jsonwebtoken');
const passport = require('passport');
const customers = require('../../models/m_customers');
const owners = require('../../models/m_owners')
const encrypt = require('../../lib/encrypt')

/**
 * 로그인메서드
 * 평문으로 받아서 암호화된 데이터베이스의 비밀번호와 비교
 */
exports.Login = function (req, res) {
    passport.authenticate('local', (err, account) => {
        if (err) return res.status(400).json(err);
        if (!account) return res.status(406).json('Invalid email or password')
        req.login(account, (error) => {
            if (error) return res.status(500).json(error);
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

exports.Auth = async function (req, res) {
    res.json(req.user);
}

exports.findById = async function (req, res) {
    const { email, admin } = req.query;
    if (!email || '') return res.json({ error: '입력된 이메일이 없습니다.', isExist: false })


    const userdata = admin ? await owners.selectemail(email) :
        await customers.selectemail(email);

    if (!userdata) return res.json({ isExist: false })

    res.json({ isExist: true })
}

exports.Kakao = async function (req, res) {
    const { admin } = req.params

    if(admin) {
        req.session.admin = true;
        return res.send('<meta http-equiv="refresh" content="1;url=http://millplanning.ml/api/auth/oauth/kakao"></meta>')
    }
    passport.authenticate('kakao', (err, account) => {
        if (err) return res.status(500).json(err);
        const redirectPage = 
            '<meta http-equiv="refresh" content="1;url=http://millplanning.ml/MyPage"></meta>'

        req.login(account, (error) => {
            if (error) return res.status(500).json(error);
            const token = jwt.sign({
                custid: account.custid,
                ownerid: account.ownerid,
                oauth_token: account.oauth_token,
                admin: account.admin,
            },
                global.secret,
                { expiresIn: 60 * 60 * 24 }
            )

            if(!token || '') return res.send(redirectPage + '<div>로그인에 실패하셨습니다</div>')
        })


        res.send(redirectPage + '<div>잠시 후 페이지로 넘어갑니다</div>')
    })(req, res);
}

exports.viewProfile = async function (req, res) {
    const { account, admin } = req.user
    if (!account) res.status(401).json({ message: '로그인 되어있지 않은 사용자입니다.' });

    const { currentPassword } = req.body;

    if (account.token) return res.json({ passwordConfirm: true })

    const preProfile = req.user.admin ?
        await owners.selectOwnerid(account.ownerid) :
        await customers.selectCustid(account.custid)

    console.log(encrypt.verifiEncrypt(currentPassword, preProfile.password))

    encrypt.verifiEncrypt(currentPassword, preProfile.password) ?
        res.json({ passwordConfirm: true }) :
        res.json({ passwordConfirm: false })
}

exports.editProfile = async function (req, res) {
    const { account } = req.user
    if (!account) res.status(401).json({ message: '로그인 되어있지 않은 사용자입니다.' });

    const { currentPassword, newPassword, newNickname, newTel } = req.body;
    let newHashedPassword = null;

    const preProfile = req.user.admin ?
        await owners.selectOwnerid(account.ownerid) :
        await customers.selectCustid(account.custid)

    if (!account.token || '') {
        if (!encrypt.verifiEncrypt(currentPassword, preProfile.password)) return res.status(406).json({ errno: "비밀번호가 일치하지않습니다." })

        if (newPassword || '')
            newHashedPassword = encrypt.genEncryption(newPassword).hash
    }


    const profile = {
        custid: account.custid,
        ownerid: account.ownerid,
        password: newPassword || '' ? newHashedPassword : preProfile.password,
        nickname: newNickname || '' ? newNickname : preProfile.nickname,
        tel: newTel || '' ? newTel : preProfile.tel
    }

    const result = req.user.admin ?
        await owners.update(profile) :
        await customers.update(profile);
    if (result.errno) return res.status(500).json();

    res.json(result)
}


exports.Logout = async function (req, res) {
    if (!req.user) res.status(401).json({ message: '로그인 되어있지 않은 사용자입니다.' });
    req.logout();

    if (req.session.admin) delete req.session.admin

    res.json({ message: '로그아웃이 성공적으로 이루어졌습니다' });
}
