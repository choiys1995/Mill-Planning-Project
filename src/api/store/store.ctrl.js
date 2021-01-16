//const Review = require('../../../test/dbtest/sqlmodules/m_reviews')
require('../../lib/dateFormat')
const Review = require('../../models/m_reviews');
const Store = require('../../models/m_store');
const Menu = require('../../models/m_menus');

module.exports = {
    //가게 생성
    createStore: async function (req, res) {
        const upload_file = !req.file ? null : req.file.filename;
        const { name, address, tel, description, prepay, breaktime, holyday, busino, categories } = req.body;
        const { ownerid } = req.user.account;
        const store_data = {
            name, ownerid, address, tel, description, prepay, breaktime, holyday, busino, categories,
            store_img: upload_file
        }

        const menuList = req.body.menu;
        /** upload file이 두가지 이상이 될것같은데, 메뉴가 들어오면 파일도 넘겨줘야함 */
        

        /**
         * DB에 입력요청
         */

        const insert_store = await Store.insertstore(store_data);
        store_data.storeid = insert_store;
        if (!insert_store.errno) {
            menuList.map(async function (data) {
                data.storeid = insert_store;
                await Menu.insertmenu(data);
            })
            return res.status(200).json({
                store: store_data,
                menu: menuList,
            });
        }

        res.status(500).json();
    },

    //가게 검색 메서드
    storeSearch: function (req, res) {
        const { main, detail } = req.query;

        res.json(req.query)
    },

    //해당 가게 조회 메서드
    storeView: async function (req, res) {
        const { storeid } = req.params;

        /**
         * DB에 조회요청
         * 메뉴까지 조회 요청
         */
        const store_data = await Store.selectstore_cust(storeid);
        const menuList = await Menu.selectmenu(store_data.storeid);

        res.status(200).json({
            store: store_data,
            menu: menuList,
        })
    },

    //가게 수정 메서드
    storeUpdate: function (req, res) {
        const { storeid } = req.params;
        const { store, menu } = req.body;

        //일단보류

        /**
         * 입력받은 데이터를 DB에 수정요청
         */

        res.status(204).json();
    },

    //가게 삭제 메서드
    storeDestory: function (req, res) {
        const { storeid } = req.params;

        res.status(204).json();
    },

    //리뷰 작성 메서드
    createReview: async function (req, res) {
        const { storeid } = req.params;
        const { title, content, score } = req.body;
        const { custid } = req.user.account
        let file = null;
        const create_at = new Date().format('yyyyMMdd')

        if (req.file) file = req.file.filename;

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

        if (affectedRows <= 0) {
            return res.status(418).json({
                error: "에러가 발생하였습니다."
            })
        }

        return res.status(200).json(review);
    },

    //리뷰 조회 메서드
    ReviewViewer: async function (req, res) {
        const { storeid } = req.params;

        const result = await Review.select(storeid);

        if(!result.errno) return res.json(result);

        res.status(500).json();
    },
}