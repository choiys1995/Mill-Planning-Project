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
    findAll: async function() {
        const connection = await connect();
        if(connection.error) return connection.error;

        try{
            const query = 'select * from store';
            const data = await connection.query(query, []);
            return data;
        }catch(e){
            return e;
        }finally {
            connection.release();
        }
    },
    
    findOne: async function (email) {
        
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