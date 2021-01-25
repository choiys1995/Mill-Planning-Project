const encrypt = require('../../lib/encrypt');
const owners = require('../../models/m_owners');
const Reservation = require('../../models/m_reservation')

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

        const result = await owners.insert(customer);

        /**
         * 쿼리상에 문제가 발생하지않도록 잘 처리해야함
         */
        if(result.errno) return res.status(500).json(result);

        return res.status(201).json(customer)
    },
    test: async function(req, res){
        console.log("???")
    },

    currentReserveOwner: async function(req, res) {
        const { ownerid } = req.user.account;

        console.log("adafaff");

        const reserveData = await Reservation.rsv_check_owner_ownerid(ownerid);
        if(reserveData.errno) return res.status(500).json(reserveData);

        res.json(reserveData);
    },

    //해당 가게에 대한 예약 현황
    currentReserve: async function(req, res) {
        const { storeid } = req.params;

        const reserveData = await Reservation.rsv_check_owner(storeid);
        if(!reserveData.errno) return res.json(reserveData)

        res.status(500).json()
    },

    cancelReserve: async function(req, res) {
        const { storeid, reserveid, reservedate } = req.params;

        const reserve_data = {
            storeid, reserveid, reservedate
        }

        const result = await Reservation.delete_rsv_owner(reserve_data);

        if(!result.errno) return res.status(204).json();

        return res.json(500).json();
    }
}