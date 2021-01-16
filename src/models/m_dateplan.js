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
    selectdateplan : async function(storeid){
        if(storeid <= 0) return {errno: "잘못된 요청입니다."}
        const connection = await connect();
        if(connection.error) return {errno: connection.error};

        try{
            const query = 'select * from dateplan where busi_index = ?';
            const [rows] = await connection.query(query, storeid);

            return rows;
        }catch(error){
            return error;
        }finally{
            await connection.release();
        }
    },

    insertdateplan : async function(user){
        if (!user) return {errno: "user is null"};

        const connection = await connect();
        if (connection.error) return {errno: "connection error"};

        try{
            const query = 
            'insert into dateplan (busi_index,res_date,res_time,res_YN)'
            +'values (?,?,?,?);';
            //데이터 형식 날짜 : 20201225(2020년 12월 25일), 시간 : 153030 (오후 3시30분30초)
            const insert = await connection.query(query,
                [
                    user.storeid,
                    user.res_date,
                    user.res_time,
                    user.res_YN
                ]
                );
            //console.log(rows)
            return insert;
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

