const express = require('express');
const router = express.Router();
const { checkToAdmin } = require('../../middleware/loginCheck');
const { myStore } = require('./ad-store.ctrl');

/**
 * 소유한 가게를 조회
 * 관리자 로그인 필요
 */
router.get('/', checkToAdmin, myStore)

module.exports = router;