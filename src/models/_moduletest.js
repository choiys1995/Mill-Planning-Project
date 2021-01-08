const dbconn = require('./dbconnpool');
const customerupdate = require('./m_customers');
const review = require('./m_reviews');
const dateplan = require('./m_dateplan');

const connect = async function(){
    try{
        const connection = await dbconn.getConnection(conn=>conn);
        console.log('DB접속 성공')
        return connection;
    } catch(error){
        return error
    }
}

//console.log(selectmodule.selectreviews())
//console.log(customerupdate.update());

//customerupdate.update();

//review.inserttest();
//customerupdate.updatetest();
//console.log(review.averagescore());
dateplan.insertdateplantest();


