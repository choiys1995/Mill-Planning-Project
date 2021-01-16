const Dateplan = require('../../models/m_dateplan');
require('../../lib/dateFormat')

module.exports = {
    showCurrentReserve: async function(req, res){
        const { storeid } = req.params; 

        const store_dateplan = await Dateplan.selectdateplan(storeid);

        if(!store_dateplan.errno) return res.json(store_dateplan);

        res.status(500).json();
    }
}