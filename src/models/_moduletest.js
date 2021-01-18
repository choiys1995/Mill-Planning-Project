const dbconn = require('./dbconnpool');
const customerupdate = require('./m_customers');
const review = require('./m_reviews');
const dateplan = require('./m_dateplan');
const update = require('./m_menus');
const store = require('./m_store');
const reserve = require('./m_reservation');
const payment = require('./m_payment');
const connect = async function(){
    try{
        const connection = await dbconn.getConnection(conn=>conn);
        console.log('DB접속 성공')
        return connection;
    } catch(error){
        return error
    }
}
//reserve.delete_rsv_cust_test();
//dateplan.insertdateplantest();
//payment.insertpaymenttest();
//reserve.check_cust_test();
//reserve.inserttest();
//reserve.delete_rsv_test();
//reserve.delete_rsv_cust_test();
//review.inserttest();
//review.selecttest();
//reserve.rsv_3month_before();
//reserve.rsv3mb_test();
review.averagescore_test();



