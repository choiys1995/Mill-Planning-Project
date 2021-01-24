const express = require('express');
const router = express.Router();
const multer = require('../../lib/multer');
const { createStore, storeView, storeSearch, storeUpdate, storeDestory, test, createReview, ReviewViewer, homePageSearch, ReviewStarPoint } = require('./store.ctrl');
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

//메인용
router.get('/home', homePageSearch);

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
 * 로그인이 필요하나
 */
router.get('/:storeid/review', ReviewViewer);

/**
 * 리뷰 별점 계산
 */
router.get('/:storeid/review/star', ReviewStarPoint);

/**
 * 리뷰 작성
 * 로그인 필요
 */
router.post('/:storeid/review', checkToLogin, multer.upload.single("review_img"), createReview);


router.post('/test', multer.upload.fields([{ name: 'store_img' }, { name: 'menu_img' }]), function(req, res) {
    console.log(req.body);

    res.json(req.files);
})

module.exports = router;