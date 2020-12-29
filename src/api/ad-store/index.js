const express = require('express');
const router = express.Router();
const { checkToAdmin } = require('../../middleware/loginCheck')

/**
 * 소유한 가게를 조회
 * 관리자 로그인 필요
 */
router.get('/', checkToAdmin)

module.exports = router;