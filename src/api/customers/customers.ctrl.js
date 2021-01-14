const encrypt = require('../../lib/encrypt');
const customers = require('../../models/m_customers');
const Reservation = require('../../models/m_reservation');
const Store = require('../../models/m_store')
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
        if(!result.errno) return res.json(customer);

        res.status(500).json(result);
    },


    /**
     * 유저 예약 현황
     */
    reserveInfo: async function(req, res) {
        const result = await Reservation.rsv_check_cust(req.user.account);
        if(!result.errno) return res.json(result);

        res.status(500).json(result);
    },

    /**
     * 유저 예약 현황(이전데이터)
     */
    reserveInfo_old: async function(req, res) {
        const result = await Reservation.rsv_check_cust(req.user.account);

        res.json(result);
    },

    //예약하기
    doReserve: async function(req, res) {
        const { storeid } = req.params;
        let {reservedate, prepay, peoples, reservetime} = req.body
        const orderer = req.user.account.custid ? req.user.account.custid : req.user.account.ownerid;
        const reserve_data = {
            storeid,
            reservedate,
            prepay, orderer, peoples, reservetime
        };

        const insert = await Reservation.insert_rsv(reserve_data);
        if(!insert.errno){
            return res.json(reserve_data);
        }
        
        res.status(500).json(insert);
    },

    paymentInfo: async function(req, res) {
        const {storeid} = req.params;

        const store_data = await Store.selectstore_cust(storeid);
        console.log(store_data);

        res.json(store_data);

    },

    //예약취소
    cencelReserve: function (req, res) {
        
    }
}