const express = require('express');
const router = express.Router();
const authForJwt = require('../../middleware/authForJwt')

/**
 * 소비자 회원가입
 */
router.post('/register')

/**
 * 유저 예약 현황
 * 로그인 데이터 필요
 */
router.get('/reserve', authForJwt);

/**
 * 유저 이전 예약 현황
 * 로그인 데이터 필요
 */
router.get('/reserve/old', authForJwt);

/**
 * 예약하기
 * 로그인 데이터 필요
 */
router.post('/reserve/:storeid', authForJwt);

/**
 * 예약취소
 * 로그인 데이터 필요
 */
router.delete('/reserve/:storeid', authForJwt);

module.exports = router;