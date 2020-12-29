const express = require('express');
const router = express.Router();
const { register } = require('./customers.ctrl')

/**
 * 소비자 회원가입
 */
router.post('/register', register);

/**
 * 유저 예약 현황
 * 로그인 데이터 필요
 */
router.get('/reserve');

/**
 * 유저 이전 예약 현황
 * 로그인 데이터 필요
 */
router.get('/reserve/old');

/**
 * 예약하기
 * 로그인 데이터 필요
 */
router.post('/reserve/:storeid');

/**
 * 예약취소
 * 로그인 데이터 필요
 */
router.delete('/reserve/:storeid');

module.exports = router;