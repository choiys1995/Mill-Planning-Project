const express = require('express');
const router = express.Router();
const { Login, Logout, Auth, Kakao } = require('./auth.ctrl');
const {checkToLogin, checkToNotLogin} = require('../../middleware/loginCheck');

/**
 * 로그인 인증
 */
router.get("/", checkToLogin, Auth);

/**
 * 로그인
 */
router.post('/login', checkToNotLogin, Login);

/**
 * oAuth 기반 로그인
 */
router.get('/oauth/kakao', checkToNotLogin, Kakao);

/**
 * 로그인 (관리자)
 */
router.post('/ad-login', checkToNotLogin);

/**
 * 로그아웃
 */
router.get('/logout', checkToLogin, Logout);

module.exports = router;