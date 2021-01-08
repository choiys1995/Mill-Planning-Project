const dbconn = require('../dbconnpool');

const connect = async function () {
    try {
        const connection = await dbconn.getConnection(conn => conn);
        console.log('DB접속 성공')
        return connection;
    } catch (error) {
        return error
    }
}

module.exports = {
    selectdateplan : async function(){
        const connection = await connect();
        if(connection.error) return connection.error;

        try{
            const query = 'select * from dateplan';
            const rows = await connection.query(query);
            console.log(rows)
            return rows;
        }catch(error){
            return error;
        }finally{
            await connection.release();
        }
    }
}

