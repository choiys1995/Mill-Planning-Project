const Store = require('../../models/m_store')
const Menu = require('../../models/m_menus')

module.exports = {

    /**
     * 관리자가 자신의 가게를 조회
     */
    myStore: async function (req, res) {
        const {ownerid} = req.user.account
        const storeList = await Store.selectstore_owner(ownerid);
        if(storeList.errno) return res.status(500).json(storeList);
        // let menuList = [];

        // for(let store in storeList){
        //     //수정 후 store가 아닌 store.id로 넘겨주어야함
        //     const menu = await Menu.selectmenu(store);
        //     menuList.push(menu);
        // }

        res.json(storeList);
    }
}