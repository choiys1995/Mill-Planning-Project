const express = require('express');
const router = express.Router();
const multer = require('../../lib/multer');
const { createStore, storeView, storeSearch, storeUpdate, storeDestory, test } = require('./store.ctrl');
const {checkToAdmin, checkToLogin} = require('../../middleware/loginCheck')

/**
 * 가게 생성
 * 관리자 로그인 필요
 */
router.post('/', checkToAdmin, multer.upload.single("store_img"), createStore)

/**
 * 가게 검색
 * query 데이터를 입력받음
 */
router.get('/search', storeSearch);

/**
 * 가게 조회
 * 페이지에서 요청하는 정보
 */
router.get('/:storeid', storeView);

/**
 * 가게 수정
 * 관리자 로그인 확인
 */
router.patch('/:storeid', checkToAdmin, multer.upload.single("store_img"), storeUpdate);

/**
 * 가게 삭제
 * 관리자 로그인 확인
 */
router.delete('/:storeid', checkToAdmin, storeDestory);

/**
 * 리뷰 조회
 * 로그인 필요
 */
router.get('/:storeid/review', checkToLogin);

/**
 * 리뷰 작성
 * 로그인 필요
 */
router.post('/:storeid/review', checkToLogin, multer.upload.single("review_img"));

router.post ('/test', multer.upload.single('test'), test);

module.exports = router;