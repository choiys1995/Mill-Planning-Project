const express = require('express');
const router = express.Router();
const { Login, Logout, Auth, Test, TestCM } = require('./auth.ctrl');
const AuthCheckForJwt = require('../../middleware/authForJwt')

router.get('/', (req, res) => {
    res.status(200).json({
        data: 'testpage'
    })
});

router.post('/login', Login);

router.get('/logout', AuthCheckForJwt, Logout);

router.post('/auth', AuthCheckForJwt, Auth);

router.post('/test', Test);

router.get('/testcm', AuthCheckForJwt, TestCM)

module.exports = router;