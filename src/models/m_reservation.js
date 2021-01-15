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
    //개인사용자가 예약완료한 예약정보 조회
    //파라미터로 유저정보(custid들어와야함) 
    rsv_check_cust: async function (user) { 
        if (!user) return;
        const connection = await connect();
        if (connection.error) return;

        try {
            const query=
            "SELECT reserveid,storeid,reservedate,prepay,orderer_cust,peoples,reservetime,cancel "+
            "FROM reservation "+
            "WHERE orderer_cust = ?;";
            //oederer = customers.custid
            //예약테이블에서 특정 고객이 예약한 행만 출력
            //과거이력까지 고려하여 복수행 설정
            const [rows] = await connection.query(query,[user.custid]);
            //console.log();
            return rows;
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },


    //상점주가 자신의 상점 예약현황 조회
    rsv_check_owner: async function (user) { 
        if (!user) return;
        const connection = await connect();
        if (connection.error) return;

        try {
            const query=
            "SELECT reserveid,storeid,reservedate,prepay,orderer_cust,orderer_owner,peoples,reservetime,cancel "+
            "FROM reservation "+
            "WHERE storeid = ?;";
            const [rows] = await connection.query(query,[user.storeid]);
            //console.log();
            return rows;
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },

    // rsv_check_owner_test : async function () { 
        
    //     const connection = await connect();
    //     if (connection.error) return;

    //     try {
    //         const query=
    //         "SELECT * "+
    //         "FROM reservation "+
    //         "WHERE storeid = 1;";
    //         const [rows] = await connection.query(query);
    //         console.log(rows);
    //         return rows;

    //     } catch (error) {
    //         return error;
    //     } finally {
    //         connection.release();
    //     }
    // },

    //예약테이블에 입력되는 기본값
    insert_rsv: async function (store) { 
        if (!store) return;

        const connection = await connect();
        if (connection.error) return;

        try {
            const query =
                'INSERT INTO reservation(' +
                'storeid,' +
                'reservedate,' +
                'prepay,' +
                'orderer_cust,' +
                'orderer_owner,' +
                'peoples,' +
                'reservetime) '+
                'VALUES (?,?,?,?,?,?,?)';

            const [rows] = await connection.query(
                query,
                [store.storeid,
                store.reservedate,
                store.prepay,
                store.orderer_cust,//custid
                store.orderer_owner,//ownerid
                store.peoples,
                store.reservetime
                ]
            );

            const query_rsvid = 
            'SELECT reserveid '+
            'FROM reservation '+
            'WHERE storeid=? '+
            'AND orderer_cust=? '+
            'AND orderer_owner=? '+
            'AND reservetime=?;'

            const [data] = await connection.query(query_rsvid,[
                store.storeid,
                store.orderer_cust,
                store.orderer_owner,
                store.reservetime
            ])
            console.log(data[0]);

            return data[0];
            
        } catch (error) {
            return error;
        } finally {            
            connection.release();
        }
    },

    //상점주가 예약취소시 사용
    delete_rsv_owner: async function (user) { 
        if (!user) return;
        const connection = await connect();
        if (connection.error) return;

        try {
            const query=
            "DELETE FROM reservation "+
            "WHERE storeid = ?"+
            "AND reservedate = ? "+
            "AND reservetime = ? "+
            "AND orderer_cust = ? "+
            "AND orderer_owner = ?;";
            
            const [rows] = await connection.query(query,
                [
                 user.storeid,
                 user.reservedate,
                 user.reservetime,
                 user.orderer_cust,
                 uer.orderer_owner
                ]);
            //console.log();
            return rows[0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },

    //고객이 예약 취소시 사용 (실제로는 업데이트이용)
    delete_rsv_cust: async function (user) { 
        if (!user) return;
        const connection = await connect();
        if (connection.error) return;

        try {
            const query=
            "UPDATE reservation "+
            "SET cancel = 'Y' "+
            "WHERE orderer_cust = ? "+
            "AND orderer_owner = ? "+
            "AND reservedate = ?;";
                        
            const [rows] = await connection.query(query,[user.custid,user.ownerid,user.reservedate]); //(=orderer)            
            //console.log();
            return rows[0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    delete_rsv_cust_test: async function () { 
        
        const connection = await connect();
        if (connection.error) return;

        try {
            const query=
            "UPDATE reservation "+
            "SET cancel = 'Y' "+
            "WHERE orderer_cust = 3 "+
            "AND orderer_owner = 0 "+
            "AND reservedate = 20770101;";
                        
            const [rows] = await connection.query(query); //(=orderer)            
            //console.log();
            return rows[0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    // inserttest : async function () { //예약테이블에 입력되는 기본값

    //     const connection = await connect();
    //     if (connection.error) return;

    //     try {
    //         const query =
    //             'INSERT INTO reservation('+
    //                 'storeid,'+
    //                 'reservedate,'+
    //                 'prepay,'+
    //                 'orderer_cust,'+
    //                 'orderer_owner,'+
    //                 'peoples,'+
    //                 'reservetime) '+                    
    //             'VALUES (1,20770101,150000,3,0,100,20)';

    //         const [rows] = await connection.query(query);

    //         const query_rsvid = 
    //         'SELECT reserveid '+
    //         'FROM reservation '+
    //         'WHERE storeid=1 '+
    //         'AND orderer_cust=3 '+
    //         'AND orderer_owner=0 '+
    //         'AND reservetime=20;'

    //         const [data] = await connection.query(query_rsvid)
    //         console.log(data[0]);
    //         return data[0];
            
    //     } catch (error) {
    //         console.log(error);
    //         return error;
    //     } finally {
            
    //         connection.release();
    //     }
    // },
    // check_cust_test: async function () { 
        
    //     const connection = await connect();
    //     if (connection.error) return;

    //     try {
    //         const query=
    //         "SELECT reserveid,storeid,reservedate,prepay,orderer_cust,peoples,reservetime,cancel "+
    //         "FROM reservation "+
    //         "WHERE orderer_cust = 1;";
    //         const [rows] = await connection.query(query);
    //         console.log(rows);
    //         return rows;
    //     } catch (error) {
    //         console.log(error);
    //         return error;
    //     } finally {
    //         connection.release();
    //     }
    // },
    // delete_rsv_test: async function () { 
        
    //     const connection = await connect();
    //     if (connection.error) return;

    //     try {
    //         const query=
    //         "DELETE FROM reservation "+
    //         "WHERE storeid = 1 "+
    //         "AND reservedate = 20770101 "+
    //         "AND reservetime = 20 "+
    //         "AND orderer_cust = 3 "+
    //         "AND orderer_owner = 0"
            
    //         const [rows] = await connection.query(query);
    //         console.log(rows[0]);
    //         return rows[0];
    //     } catch (error) {
    //         console.log(error);
    //         return error;
    //     } finally {
    //         connection.release();
    //     }
    // },
    // delete_rsv_cust_test : async function () { 
        
    //     const connection = await connect();
    //     if (connection.error) return;

    //     try {
    //         const query=
    //         "UPDATE reservation "+
    //         "SET cancel = 'Y' "+
    //         "WHERE orderer = 3 "+
    //         "AND reservedate = 20210113;";
                        
    //         const [rows] = await connection.query(query); //(=orderer)            
    //         //console.log();
    //         return rows[0];
    //     } catch (error) {
    //         return error;
    //     } finally {
    //         connection.release();
    //     }
    // },
}