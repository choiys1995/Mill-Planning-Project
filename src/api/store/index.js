const express = require('express');
const router = express.Router();
const authForJwt = require('../../middleware/authForJwt')

/**
 * 가게 생성
 * 관리자 로그인 필요
 */
router.post('/')

/**
 * 가게 검색
 * query 데이터를 입력받음
 */
router.get('/search');

/**
 * 가게 조회
 * 페이지에서 요청하는 정보
 */
router.get('/:storeid');

/**
 * 가게 수정
 * 관리자 로그인 확인
 */
router.patch('/:storeid');

/**
 * 가게 삭제
 * 관리자 로그인 확인
 */
router.delete('/:storeid');

/**
 * 리뷰 조회
 * 로그인 필요
 */
router.get('/:storeid/review', authForJwt);

/**
 * 리뷰 작성
 * 로그인 필요
 */
router.post('/:storeid/review', authForJwt);

module.exports = router;