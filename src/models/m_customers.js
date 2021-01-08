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

    select: async function (email) {
        if (!email || '') return { error: "Unregistered email ID" };
        const connection = await connect();
        if (connection.error) return connection.error;

        try {
            const query = 'select * from customers';
            const rows = await connection.query(query);
            //console.log(rows0);
            return rows;
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
            const query = 'insert into customers(email, password, tel, nickname) values (?, ?, ?, ?)';

            const data = await connection.query(query, [user.email, user.password, user.tel, user.nickname]);
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
            const query = "update customers set nickname = ? where custid=" + user.custid;
            const data = await connection.query(query, [user.nickname])
            return data;
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }

        /**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
         * @@@@@@@@@@@@@ RAW DATA INPUT TEST @@@@@@@@@@@@
         * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
         */         
         
        // update : async function() {
        //     const connection = await connect();
        //     if (connection.error) return;
        // try {
        //     const query = 'update customers set nickname = "modified" where custid=1';
        //     const data = await connection.query(query)
        //     return data;
        // } catch (error) {
        //     return error;
        // } finally {
        //     connection.release();
    },
    delete : async function(user){ //회원탈퇴시 고객정보삭제
        if (!user) return;

        const connection = await connect();
        if (connection.error) return;

        try {
            const query = 'delete from customers where custid = ?';

            const data = await connection.query(query, [user.custid]);
            return data;
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    }
    
}
