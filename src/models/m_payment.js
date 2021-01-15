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

    insertpayment : async function (user) {
        if (!user) return;

        const connection = await connect();
        if (connection.error) return;

        try {
            const query =
                'INSERT INTO payment('+
                    'ordercode,'+                    
                    'reserveid) '+                                      
                'VALUES (?,?)';

            const [rows] = await connection.query(
                query,
                [store.storeid,
                 store.reserveid                                                                 
                ]
            );
            return rows;
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