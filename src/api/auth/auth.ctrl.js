const Customer = require('../../models/customer');
const encrypt = require('../../lib/encrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt')

const removeSecretCustomerData = function(customer){
    delete customer.password;
    return customer;
}

/**
 * 로그인메서드
 * 평문으로 받아서 암호화된 데이터베이스의 비밀번호와 비교
 */
exports.Login = async function(req, res) {
    const { email, password } = req.body;

    //입력받은 email이 존재하지 않음
    if(!email || '') return res.status(400).json({
        error: "이메일 칸이 비어있습니다. 잘못된 요청입니다."
    });

    const customer = await Customer.findOne(email);

    //해당 이메일이 DataBase에 존재하지않음
    if(!customer) return res.status(406).json({
        error: "해당 이메일이 존재하지않습니다."
    });

    //query 또는 connection문제 발생
    if(customer.errno) return res.status(500).json(customer);

    if(email === customer.email &&
        encrypt.verifiEncrypt(password, customer.password)){
            return res.status(200).json(removeSecretCustomerData(customer));
    }

    return res.status(406).json({
        error: "올바르지않은 비밀번호입니다."
    })
}

exports.Logout = async function(req, res) {
    if(req.cookies.access_token){
        res.clearCookie('access_token')
        return res.status(204).json()
    }
}

exports.Auth = async function(req, res) {
    /**올바르게 로그인되어있는 사용자 */
    res.status(204).json()
}

/** 테스트 로그인 코드
 * 운영서버로 옮길시 삭제
 */
exports.Test = async function(req, res) {
    const { email, password } = req.body;
    const token = jwt.sign({
        email
    }, jwtConfig.secret, {expiresIn: '1h'});

    const customer = await Customer.findOne(email);

    /**
     * customer가 존재하지않거나 query error가 발생하였을경우 에러처리
     */
    if(!customer) return res.status(400).json();
    if(customer.errno) return res.status(500).json(customer);

    /**
     * 평문의 패스워드와 암호화된 패스워드가 일치하는지 체크
     */
    if(encrypt.verifiEncrypt(password, customer.password)){
        res.cookie('access_token', token);
        return res.status(200).json(removeSecretCustomerData(customer));
    }

    return res.status(400).json();
}

exports.TestCM = async function(req, res) {
    return res.status(200).json('it')
}