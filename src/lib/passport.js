/**
 * 패스포트 설정
 * 201228
 */

const passport = require('passport');
const encrypt = require('./encrypt');
const customer = require('../models/customer');
const kakaoConfig = require('../config/kakao');

//임시 다른파일에 보관할것
const secret = '27absmhi1c9'
global.secret = secret;

const LocalStrategy = require('passport-local').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;

const LocalStrategyOption = {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback : true,
}

const KakaoStrategyOption = kakaoConfig;

/**
 * 세션관리
 */
passport.serializeUser(function(user, done) {
    done(null, user.email);
});

passport.deserializeUser(function(id, done) {
    customer.findOne(id)
    done(null, id)
});

async function localVerify(req, email, password, done) {
    let account;
    console.log(req.body);
    try{
        /**
         * DB에서 아이디 체크
         */

        if(req.body.admin){
            account = await owner.findOne(email);
        }else {
            account = await customer.findOne(email);
        }
        if(!account) return done(null, false);

        /**
         * 아이디가 일치한다면 DB에서 패스워드 체크
         */
        const isEqualPassword = await encrypt.verifiEncrypt(password, account.password)
        if(!isEqualPassword) return done(null, false);
    }catch(e) {
        return done(e);
    }

    /**
     * 최종 성공시
     */
    return done(null, account);
}

async function kakaoVerify(accessToken, refreshToken, profile, done) {
    //사용자 정보는 profile에 있음

}

module.exports = () => {
    passport.use('local', new LocalStrategy(LocalStrategyOption, localVerify));
    passport.use('oauth', new KakaoStrategy(KakaoStrategyOption, kakaoVerify))
}