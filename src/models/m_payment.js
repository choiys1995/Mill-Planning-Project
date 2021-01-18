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

    //결제코드로 검색
    select_Ordercode: async function(ordercode) {
        if(ordercode <= 0) return {errno: "잘못된 요청입니다."}

        const connection = await connect();
        if (connection.error) return {errno: "connection error"};

        try{
            const query =
                'SELECT * FROM payment WHERE ordercode = ?'

            const [rows] = await connection.query(query, [ordercode]);

            return rows;
        }catch(error){
            return error
        }
    },

    select_reserveid: async function(reserveid) {
        if (reserveid <= 0) return {errno: "잘못된 요청입니다"};

        const connection = await connect();
        if (connection.error) return {errno: "connection error"};

        try{
            const query =
                'SELECT * FROM payment WHERE reserveid = ?'

            const [rows] = await connection.query(query, [reserveid]);

            return rows;
        }catch(error){
            return error
        }
    },

    insertpayment : async function (store) {
        if (!store) return {errno: "store is null"};

        const connection = await connect();
        if (connection.error) return {errno: "connection error"};

        try {
            const query =
                'INSERT INTO payment('+
                    'ordercode,'+                    
                    'reserveid) '+                                      
                'VALUES (?,?)';

            const result = await connection.query(
                query,
                [store.ordercode,
                 store.reserveid                                                                 
                ]
            );
            return result;
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },

    insertpaymenttest : async function (r) {
        
        const connection = await connect();
        if (connection.error) return;

        try {
            const query =
                'INSERT INTO payment('+
                    'ordercode,'+                    
                    'reserveid) '+                                      
                'VALUES ("2013AA",5)';

            const [rows] = await connection.query(query);
            console.log(rows[0]);
            return rows[0];
        } catch (error) {
            console.log(error);
            return error;
        } finally {
            connection.release();
        }
    }
}