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

    selecttoken: async function (token) {
        if (!token || '') return { errno: "token is null" };
        const connection = await connect();
        if (connection.error) return { errno: "connection error" };

        try {
            const query = 'select * from customers where token=?';
            const [rows] = await connection.query(query, [token]);

            return rows[0];
        } catch (error) {
            return error;
        } finally {
            await connection.release();
        }
    },

    selectemail: async function (email) {
        if (!email || '') return { errno: "email is null" };
        const connection = await connect();
        if (connection.error) return { errno: connection.error };

        try {
            const query = 'select * from customers where email=?';
            const [rows] = await connection.query(query,[email]);
            //console.log(rows0);
            return rows[0];
        } catch (error) {
            return error;
        } finally {
            await connection.release();
        }
    },

    selectCustid: async function (custid) {
        if(custid <= 0) return { errno: "user is null" }
        const connection = await connect();
        if (connection.error) return { errno: connection.error };

        try {
            const query = 'select * from customers where custid=?';
            const [rows] = await connection.query(query,[custid]);
            return rows[0];
        } catch (error) {
            return error;
        } finally {
            await connection.release();
        }
    },

    insert: async function (user) {
        if (!user) return {errno: "user is null"};

        const connection = await connect();
        if (connection.error) return {errno: "connection error"};

        try {
            const query = 'insert into customers(email, password, tel, nickname, token) values (?, ?, ?, ?, ?)';

            const data = await connection.query(query, [user.email, user.password, user.tel, user.nickname,user.token]);
            return data;
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },

    update: async function (user) {
        if (!user) return {errno: "user is null"};

        const connection = await connect();
        if (connection.error) return {errno: "connection error"};

        try {
            const query = "update customers set password = ?, tel =?, nickname=? where custid = ?";
            const data = await connection.query(query, [user.password,user.tel,user.nickname, user.custid])
            return data;
                       

        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },

        /**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
         * @@@@@@@@@@@@@ RAW DATA INPUT TEST @@@@@@@@@@@@
         * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
         */         
         
    //     updatetest : async function() {
    //         const connection = await connect();
    //         if (connection.error) return;
    //     try {
    //         const query = 'update customers set password = "modified" where custid=1';
            
    //         const data = await connection.query(query)
            
    //         return data3;
    //     } catch (error) {
    //         return error;
    //     } finally {
    //         connection.release();
    //     }
    // },
    delete : async function(user){ //회원탈퇴시 고객정보삭제
        if (!user) return {errno: "user is null"};

        const connection = await connect();
        if (connection.error) return {errno: "connection error"};

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
