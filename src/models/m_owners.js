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

    select: async function (token) {
        if (!token || '') return { error: "error" };
        const connection = await connect();
        if (connection.error) return connection.error;

        try {
            const query = 'select * from owners where token=?';
            const rows = await connection.query(query);
            //console.log(rows0);
            return [rows];
        } catch (error) {
            return error;
        } finally {
            await connection.release();
        }
    },

    insert: async function (user) {
        if (!user) return;

        const connection = await connect();
        if (connection.error) return;

        try {
            const query = 'insert into owners(email, password, tel, nickname, token) values (?, ?, ?, ?, ?)';

            const data = await connection.query(query, [user.email, user.password, user.tel, user.nickname, user.token]);
            return data;
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },

    update: async function (user) {
        if (!user) return;

        const connection = await connect();
        if (connection.error) return;
        try {
            const query = "update owners set password = ?, tel =?, nickname=? where ownerid=" + user.ownerid;
            const data = await connection.query(query, [user.password,user.tel,user.nickname])
            return data;        
        
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },

    delete: async function (user) {
        //✨query 작성시 하나의 상점주에 딸린 여러 가게가 있을 경우
        //✨탈퇴시 연관된 자식노드들도 삭제하기 위해
        //✨on delete cascade 옵션을 테이블에 꼭 걸어줄 것
        if (!user) return;
        
        const connection = await connect();
        if (connection.error) return;

        try {
            const query = 'delete from owners where ownerid = ?';
            const data = await connection.query(query, [user.ownerid]);
            return data;
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    }
}
