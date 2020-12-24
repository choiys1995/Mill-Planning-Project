const express = require('express');
const router = express.Router();
const { Login, Logout, Auth, Test, TestCM } = require('./auth.ctrl');
const AuthCheckForJwt = require('../../middleware/authForJwt')

/**
 * 로그인
 */
router.post('/login', Login);

/**
 * 로그인 (관리자)
 */
router.post('/ad-login');

/**
 * 로그아웃
 */
router.get('/logout', AuthCheckForJwt, Logout);

/**
 * 로그인 인증
 */
router.post('/auth', AuthCheckForJwt, Auth);


/**테스트코드 삭제할것 */
router.post('/test', Test);
router.get('/testcm', AuthCheckForJwt, TestCM)

module.exports = router;