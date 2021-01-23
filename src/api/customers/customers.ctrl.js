const encrypt = require('../../lib/encrypt');
const customers = require('../../models/m_customers');
const Reservation = require('../../models/m_reservation');
const Store = require('../../models/m_store');
const Dateplan = require('../../models/m_dateplan');
const Payment = require('../../models/m_payment')
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
        if (!result.errno) return res.json(customer);

        res.status(500).json(result);
    },


    /**
     * 유저 예약 현황
     */
    reserveInfo: async function (req, res) {
        const {custid, ownerid} = req.user.account
        let account = {
            custid: !req.user.account.custid ? 0 : custid,
            ownerid: !req.user.account.ownerid ? 0 : ownerid,
        }
        const newData = await Reservation.rsv_check_new(account);
        const beforeData = await Reservation.rsv_3month_before(account);

        const result = newData.concat(beforeData);
        if (!result.errno) return res.json(result);

        res.status(500).json(result);
    },

    /**
     * 유저 예약 현황(이전데이터)
     */
    reserveInfo_old: async function (req, res) {
        const {custid, ownerid} = req.user.account
        let account = {
            custid: !req.user.account.custid ? 0 : custid,
            ownerid: !req.user.account.ownerid ? 0 : ownerid,
        }
        const result = await Reservation.rsv_check_old(account);
        if(result.errno) return res.status(500).json(result);

        res.json(result);
    },

    //예약하기
    doReserve: async function (req, res) {
        //console.log(req.params, req.body)
        const { storeid } = req.params;
        if(!req.body.merchant_uid) return res.status(400).json("잘못된 요청입니다.");

        let { reservedate, prepay, peoples, reservetime, merchant_uid, name, buyer_name } = req.body
        const {custid, ownerid} = req.user.account
        let account = {
            custid: !req.user.account.custid ? 0 : custid,
            ownerid: !req.user.account.ownerid ? 0 : ownerid,
        }
        const reserve_data = {
            storeid,
            reservedate,
            prepay, peoples, reservetime, merchant_uid,
            orderer_cust: account.custid,
            orderer_owner: account.ownerid,
        };

        const insert_reserve = await Reservation.insert_rsv(reserve_data);
        if(insert_reserve.errno) return res.status(500).json(insert_reserve)

        const dateplan_data = {
            storeid,
            res_date: reservedate,
            res_time: reservetime,
            res_YN: 'Y',
        }

        const orderer_data = await iamport.payment_search(merchant_uid).then(data => data);

        if(!orderer_data) return res.status(400).json('결제가 진행되지 않은 건 입니다.')

        const payment_data = {
            ordercode: merchant_uid,
            reserveid: insert_reserve
        }

        const insert_dateplan = await Dateplan.insertdateplan(dateplan_data)
        if(insert_dateplan.errno) return res.status(500).json(insert_dateplan);

        const insert_payment = await Payment.insertpayment(payment_data)
        if(insert_payment.errno) return res.status(500).json(payment_data)

        const {address} = await Store.selectstore_cust(storeid)
        

        return res.json({
            buyer_name, name, reservedate, prepay, peoples, reservetime, merchant_uid, address
        });
    },

    //결제에 필요한 정보를 제공해줌
    paymentInfo: async function (req, res) {
        const { storeid } = req.params;

        const store_data = await Store.selectstore_cust(storeid);

        if (!store_data.errno) return res.json(store_data);

        res.status(500).json();
    },

    //예약취소(소비자)
    cencelReserve: function (req, res) {

    }
}