const express = require('express');
const router = express.Router();
const { Login, Logout, Auth, Kakao, findById, editProfile, viewProfile } = require('./auth.ctrl');
const {checkToLogin, checkToNotLogin} = require('../../middleware/loginCheck');

/**
 * 로그인 인증
 */
router.get("/", Auth);

router.get('/findbyid', findById)

/**
 * 로그인
 */
router.post('/login', checkToNotLogin, Login);

/**
 * oAuth 기반 로그인
 */
router.get('/oauth/kakao/', checkToNotLogin, Kakao);
router.get('/oauth/kakao/:admin', checkToNotLogin, Kakao);

/**
 * 로그인 (관리자)
 * 필요없는코드
 */
//router.post('/ad-login', checkToNotLogin);

/**
 * 정보확인(패스워드가 일치하는지 확인용)
 */
router.post('/profile/confirm', checkToLogin, viewProfile)

/**
 * 정보수정
 */
 router.patch('/profile', checkToLogin, editProfile)

/**
 * 로그아웃
 */
router.get('/logout', checkToLogin, Logout);

module.exports = router;