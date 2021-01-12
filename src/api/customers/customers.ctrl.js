const encrypt = require('../../lib/encrypt');
const customers = require('../../models/m_customers');
const iamport = require('../../lib/iamport');

module.exports = {
    register: async function (req, res) {
        /**
         * 회원가입에 필요한 데이터들을 받아옴
         */
        const { email, password, tel, nickname } = req.body;

        /**
         * 비밀번호 암호화
         */
        const { hash } = encrypt.genEncryption(password);
        const customer = {
            email,
            password: hash,
            tel,
            nickname
        }

        const result = await customers.insert(customer);

        /**
         * 쿼리상에 문제가 발생하지않도록 잘 처리해야함
         */
        if(result.errno) return res.status(500).json(result);

        return res.status(201).json(customer)
    },

    //예약하기
    doReserve: function(req, res) {
        const { storeid } = req.params;
        const reserve_data = req.body;
        
        res.json(reserve_data)
    },

    //예약취소
    cencelReserve: function (req, res) {
        
    }
}