

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

         res.status(200).json();
    },

    //가게 검색 메서드
    storeSearch: function(req, res) {
        const { main, detail } = req.query;
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

    createReview: function(req, res) {
        const {storeid} = req.params;
    },

    ReviewViewer: function(req, res) {
        const {storeid} = req.params;
    }
}