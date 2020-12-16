const express = require('express');
const router = express.Router();
const { Register } = require('./user.ctrl')

router.post('/signin', Register)

router.get('/register/:token')

module.exports = router;