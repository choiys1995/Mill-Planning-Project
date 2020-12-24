const express = require('express');
const router = express.Router();

/**
 * 관리자 회원가입
 */
router.post('/register')

/**
 * 관리자 예약 현황
 */
router.get('/reserve/:storeid')

 /**
  * 관리자 예약 취소
  */
router.delete('/reserve/:storeid')


module.exports = router;