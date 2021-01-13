const dbconn = require('./dbconnpool');
const customerupdate = require('./m_customers');
const review = require('./m_reviews');
const dateplan = require('./m_dateplan');
const update = require('./m_menus');
const store = require('./m_store');
const reserve = require('./m_reservation');
const connect = async function(){
    try{
        const connection = await dbconn.getConnection(conn=>conn);
        console.log('DB접속 성공')
        return connection;
    } catch(error){
        return error
    }
}
reserve.delete_rsv_cust_test();



