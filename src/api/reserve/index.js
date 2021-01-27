const express = require('express');
const router = express.Router();

const { showCurrentReserve } = require('./reserve.ctrl')



router.get('/', (req, res) => {
    res.status(400).json({error: "잘못된 요청입니다."})
})
/**
 * 가게 예약 현황
 */
router.get('/:storeid', showCurrentReserve)

module.exports = router;