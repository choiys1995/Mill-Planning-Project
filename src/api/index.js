const express = require('express');
const router = express.Router();
const path = require('path');

router.use('/auth', require('./auth'))
router.use('/user', require('./user'))

module.exports = router;