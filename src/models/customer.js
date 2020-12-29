const connectionPool = require('./index');

/**
 * 데이터베이스 연결
 * 여기서 코드를 변경할 필요가없음!!
 */
const connect = async function () {
    try {
        //데이터베이스 커넥션 풀에 연결을 요청하고 커넥션을 반환함
        const connection =  await connectionPool.getConnection(conn => conn);
        console.log('Success DB Server Connect');

        return connection;
    } catch ( error ){
        return {error}
    }
}

module.exports = {
    /**
     * email을 입력받아 해당 email의 user정보를 출력
     */
    findOne: async function (email) {
        /** 입력받은 email값이 존재하지않는다면, db를 연결시키지않고 return */
        if (!email || '') return;

        //데이터베이스에 연결을 요청
        const connection = await connect();
        //데이터베이스 연결 중 에러가 났다면 에러를 반환
        if(connection.error) return connection.error;

        try {
            const query = 'select * from customers where email = ?';

            //데이터베이스 query문을 실행하고 ?에 매핑할 내용을 배열에 입력해줌
            const [rows] = await connection.query(query, [email]);
            
            //email은 unique한 정보이므로, 단 하나의 데이터만 반환함
            return rows[0];
        } catch (error) {
            /** query 문제가 발생하였다면 error를 반환 */
            return error;
        } finally {
            //쿼리 처리가 끝났다면 무조건 반환해주어야함
            await connection.release();
        }
    },

    /** 
     * 유저 데이터를 넘겨서 insert해줌 
     * 입력하지않아도되는 정보는 어떻게 넘겨줄것인지 (그냥 null로 넣을것인지..)
     * */
    insert: async function ( user ) {
        if(!user) return;

        const connection = await connect();
        if(connection.error) return connection.error;

        try {
            const query = 'insert into customers(email, password, tel, nickname) values (?, ?, ?, ?)';

            const data = await connection.query(query, [user.email, user.password, user.tel, user.nickname]);
            return data;
        }catch(error){
            return error;
        }finally {
            connection.release();
        }
    },

    update: async function( user ) {
        if(!user) return;
    },

    delete: async function( user ) {
        if(!user) return;
    }
}