const connectionPool = require('./index');

/**
 * 데이터베이스 연결
 */
const connect = async function () {
    try {
        const connection =  await connectionPool.getConnection(conn => conn);
        console.log('Success DB Server Connect');

        return connection;
    } catch ( error ){
        return {error}
    }
}

module.exports = {
    /**
     * username을 입력받아 해당 username의 user정보를 출력
     */
    findOne: async function (username) {
        /**입력받은 username값이 존재하지않는다면, db를 연결시키지않고 return */
        if (!username || '') return;

        const connection = await connect();
        if(connection.error) return;

        try {
            const query = 'SELECT * FROM users where username = ?';

            const [rows] = await connection.query(query, [username]);
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
        if(connection.error) return;

        try {
            const query = 'INSERT INTO USERS(username, password, salt) VALUES (?, ?, ?)';

            const data = await connection.query(query, [user.username, user.password, user.salt]);
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