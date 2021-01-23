/**
 * 패스포트 설정
 * 201228
 */

const passport = require('passport');
const encrypt = require('./encrypt');
const customer = require('../models/m_customers');
const owner = require('../models/m_owners')
const kakaoConfig = require('../config/kakao');

//임시 다른파일에 보관할것
const secret = '27absmhi1c9'
global.secret = secret;

const LocalStrategy = require('passport-local').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;

const LocalStrategyOption = {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
}

const KakaoStrategyOption = kakaoConfig;

/**
 * 세션관리
 */
passport.serializeUser(function (user, done) {
    delete user.account.password
    //console.log('serial', user);    
    done(null, user);
});

passport.deserializeUser(async function (user, done) {
    //delete user.account.password
    //console.log('deserial', user)
    done(null, user);
});

async function localVerify(req, email, password, done) {
    let account;
    let userinfo = null;
    try {
        /**
         * DB에서 아이디 체크
         */

        if (req.body.admin) {
            account = await owner.selectemail(email);
        } else {
            account = await customer.selectemail(email);
        }
        if (!account) return done(null, false);

        if(!encrypt.verifiEncrypt(password, account.password)){
            return done(null, false);
        }

        userinfo = {
            account,
            admin: !!req.body.admin,
        }

        /**
         * 아이디가 일치한다면 DB에서 패스워드 체크
         */
        const isEqualPassword = await encrypt.verifiEncrypt(password, account.password)
        if (!isEqualPassword) return done(null, false);
    } catch (e) {
        return done(e);
    }

    /**
     * 최종 성공시
     */
    return done(null, userinfo);
}

async function kakaoVerify(req, accessToken, refreshToken, profile, done) {
    //사용자 정보는 profile에 있음
    //console.log('verify', profile);
    let account = null;
    let userinfo = null;

    //console.log(req.session.admin)

    let kakao_data = {
        email: null,
        password: null,
        tel: null,
        token: profile.id,
        nickname: profile.username,
    }

    try {
        if (req.session.admin) {
            account = await owner.selecttoken(profile.id);
            if (!account) {
                await owner.insert(kakao_data);
                account = await owner.selecttoken(profile.id);
            }
        }
        else {
            account = await customer.selecttoken(profile.id);
            if (!account) {
                await customer.insert(kakao_data);
                account = await customer.selecttoken(profile.id);
            }
        }


        userinfo = {
            account,
            admin: !!req.session.admin
        }
    } catch (e) {
        done(e);
    }

    return done(null, userinfo);
}

module.exports = () => {
    passport.use('local', new LocalStrategy(LocalStrategyOption, localVerify));
    passport.use('kakao', new KakaoStrategy(KakaoStrategyOption, kakaoVerify))
}