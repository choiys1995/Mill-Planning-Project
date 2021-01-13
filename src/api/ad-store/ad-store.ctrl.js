const Store = require('../../models/m_store')
const Menu = require('../../models/m_menus')

module.exports = {
    myStore: async function (req, res) {
        const user = req.user;
        const storeList = await Store.selectstore_owner(user.ownerid);
        let menuList = [];

        for(let store in storeList){
            //수정 후 store가 아닌 store.id로 넘겨주어야함
            const menu = await Menu.selectmenu(store);
            menuList.push(menu);
        }

        console.log(storeList, menuList);

        res.json(storeList);
    }
}