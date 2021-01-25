const express = require('express');
const router = express.Router();

const {register, currentReserve, cancelReserve, currentReserveOwner} = require('./owners.ctrl')

const {checkToNotLogin, checkToAdmin} = require('../../middleware/loginCheck')

/**
 * 관리자 회원가입
 * 비 로그인 체크
 */
router.post('/register', checkToNotLogin, register);

/**
 * 관리자 예약 현황
 */
router.get('/reserve/:storeid', checkToAdmin, currentReserve)

router.get('/reservelist', checkToAdmin, currentReserveOwner);

 /**
  * 관리자 예약 취소
  */
router.delete('/reserve/:storeid', checkToAdmin, cancelReserve)


module.exports = router;