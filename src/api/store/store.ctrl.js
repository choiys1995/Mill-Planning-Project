const Review = require('../../../test/dbtest/sqlmodules/m_reviews')
require('../../lib/dateFormat')

module.exports = {
    //가게 생성
    createStore: function(req, res) {
        const {name, address, tel, desc, prepay, breaktime, holyday, busino} = req.body;
        const store_data = {
            name, address, tel, desc, prepay, breaktime, holyday, busino,
            store_img: req.file.filename
        }
        /**
         * DB에 입력요청
         */

         res.status(200).json(store_data);
    },

    //가게 검색 메서드
    storeSearch: function(req, res) {
        const { main, detail } = req.query;

        res.json(req.query)
    },

    //가게 조회 메서드
    storeView: function(req, res) {
        const {storeid} = req.params;

        /**
         * DB에 조회요청
         */
        const store_data = '가게 조회 임시데이터';

        res.status(200).json(store_data)
    },

    //가게 수정 메서드
    storeUpdate: function(req, res) {
        const {storeid} = req.params;

        /**
         * 입력받은 데이터를 DB에 수정요청
         */

        res.status(204).json();
    },

    //가게 삭제 메서드
    storeDestory: function(req, res) {
        const {storeid} = req.params;

        res.status(204).json();
    },

    //리뷰 작성 메서드
    createReview: async function(req, res) {
        const { storeid } = req.params;
        const { title, content, score } = req.body;
        const { custid } = req.user.account
        let file = null;
        const create_at = new Date().format('yyyyMMdd')

        if(req.file) file = req.file.filename;

        const review = {
            title, storeid, custid, content, score, 
            review_img: file,
            writedate: create_at
        }


        /**
         * db에 작성요청
         */
        const result = await Review.insert(review)
        const affectedRows = result[0].affectedRows

         return res.status(200).json(review);
    },

    //리뷰 조회 메서드
    ReviewViewer: async function(req, res) {
        const { storeid } = req.params;

        const result = await Review.select('aa')

        console.log(result)

        res.json(result)
    },

    test: async function(req, res) {
        if(!req.file) return res.status(200).json(req.fileVaildationError)

        let fileSrc;
        if(req.file){
            fileSrc = `${req.file.destination.replace('./public/images/', '')}/${req.file.filename}`;
        }

        res.status(200).json(fileSrc);
    }
}