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

    insertpayment : async function (store) {
        if (!store) return;

        const connection = await connect();
        if (connection.error) return;

        try {
            const query =
                'INSERT INTO payment('+
                    'paycode,'+
                    'ordercode,'+
                    'reserveid) '+                                        
                'VALUES (?,?,?)';

            const [rows] = await connection.query(
                query,
                [store.storeid,
                 store.reservedate,
                 store.prepay                                                 
                ]
            );
            return rows;
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    }
}