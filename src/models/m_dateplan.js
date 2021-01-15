const dbconn = require('./dbconnpool');

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
    selectdateplan : async function(user){
        if (!user) return;

        const connection = await connect();
        if(connection.error) return connection.error;

        try{
            const query = 'select * from dateplan';
            const [rows] = await connection.query(query);
            console.log(rows)
            return rows;
        }catch(error){
            return error;
        }finally{
            await connection.release();
        }
    },
    insertdateplan : async function(user){
        if (!user) return;

        const connection = await connect();
        if(connection.error) return connection.error;

        try{
            const query = 
            'insert into dateplan (busi_index,res_date,res_time,res_YN)'
            +'values (?,?,?,?);';
            //데이터 형식 날짜 : 20201225(2020년 12월 25일), 시간 : 153030 (오후 3시30분30초)
            const [rows] = await connection.query(query,
                [
                    user.storeid,
                    user.res_date,
                    user.res_time,
                    user.res_YN
                ]
                );
            //console.log(rows)
            return rows[0];
        }catch(error){
            return error;
        }finally{
            await connection.release();
        }
    },
    insertdateplantest : async function(){
       
        const connection = await connect();
        if(connection.error) return connection.error;

        try{
            const query = 
            'insert into dateplan (busi_index,res_date,res_time,res_YN)'
            +"values (2,20200325,153022,'N');";
            const rows = await connection.query(query);
            //console.log(rows)
            return rows;
        }catch(error){
            console.log(error);
            return error;
        }finally{
            await connection.release();
        }
    }
}

