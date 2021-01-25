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


    //3개월 이전의 데이터까지
    rsv_3month_before: async function (rsv_data) {
        /**
         * rsv_data = {
         *      custid: ,
         *      ownerid: ,
         * }
         */
        const { custid, ownerid } = rsv_data;

        let userid = custid;

        let query = 'SELECT res.reserveid as reserveid, ' +
            'res.storeid as storeid, ' +
            'store.name as name, ' +
            'res.prepay as prepay, ' +
            'res.reservedate as reservedate, ' +
            'res.reservetime as reservetime ' +
            'FROM reservation as res, store as store ' +
            'WHERE orderer_cust = ? AND ' +
            'reservedate < NOW() - INTERVAL 1 DAY AND ' +
            'reservedate > NOW() - INTERVAL 3 MONTH AND ' +
            'res.storeid = store.storeid ' +
            'ORDER BY reservedate asc';

        if (custid <= 0 && ownerid <= 0) return { errno: "잘못된 데이터정보입니다." }

        //관리자로 로그인된 사용자가 조회를 요구하였을 경우
        if (custid <= 0) {
            query = query.replace('orderer_cust', 'orderer_owner');
            userid = ownerid
        }

        const connection = await connect();
        if (connection.error) return { errno: "connection failed" };

        try {
            const [rows] = await connection.query(query, [userid]);

            return rows;
        } catch (error) {
            return error
        } finally {
            connection.release();
        }
    },

    //3개월보다 더 된 데이터들
    rsv_check_old: async function (rsv_data) {
        /**
         * rsv_data = {
         *      custid: ,
         *      ownerid: ,
         * }
         */
        const { custid, ownerid } = rsv_data;

        let userid = custid;

        let query = 'SELECT res.reserveid as reserveid, ' +
            'res.storeid as storeid, ' +
            'store.name as name, ' +
            'res.prepay as prepay, ' +
            'res.reservedate as reservedate, ' +
            'res.reservetime as reservetime ' +
            'FROM reservation as res, store as store ' +
            'WHERE orderer_cust = ? AND ' +
            'reservedate < (NOW() - INTERVAL 3 MONTH) AND ' +
            'res.storeid = store.storeid ' +
            'ORDER BY reservedate asc';

        if (custid <= 0 && ownerid <= 0) return { errno: "잘못된 데이터정보입니다." }

        //관리자로 로그인된 사용자가 조회를 요구하였을 경우
        if (custid <= 0) {
            query = query.replace('orderer_cust', 'orderer_owner');
            userid = ownerid
        }

        const connection = await connect();
        if (connection.error) return { errno: "connection failed" };

        try {
            const [rows] = await connection.query(query, [userid]);

            return rows;
        } catch (error) {
            return error
        } finally {
            connection.release();
        }

    },

    //오늘 날짜부터 그 이후의 데이터들
    rsv_check_new: async function (rsv_data) {
        /**
         * rsv_data = {
         *      custid: ,
         *      ownerid: ,
         * }
         */
        const { custid, ownerid } = rsv_data;

        let userid = custid;

        let query = 'SELECT res.reserveid as reserveid, ' +
            'res.storeid as storeid, ' +
            'store.name as name, ' +
            'res.prepay as prepay, ' +
            'res.reservedate as reservedate, ' +
            'res.reservetime as reservetime ' +
            'FROM reservation as res, store as store ' +
            'WHERE orderer_cust = ? AND ' +
            'reservedate >= NOW() - INTERVAL 1 DAY AND ' +
            'res.storeid = store.storeid ' +
            'ORDER BY reservedate asc';

        if (custid <= 0 && ownerid <= 0) return { errno: "잘못된 데이터정보입니다." }

        //관리자로 로그인된 사용자가 조회를 요구하였을 경우
        if (custid <= 0) {
            query = query.replace('orderer_cust', 'orderer_owner');
            userid = ownerid
        }

        const connection = await connect();
        if (connection.error) return { errno: "connection failed" };

        try {
            const [rows] = await connection.query(query, [userid]);

            return rows;
        } catch (error) {
            return error
        } finally {
            connection.release();
        }

    },

    rsv_check_cust: async function (user) {
        if (!user) return { errno: "user is null" };

        const connection = await connect();
        if (connection.error) return { errno: "connection failed" };

        try {
            const query =
                "SELECT reserveid,storeid,reservedate,prepay,orderer_cust,peoples,reservetime,cancel " +
                "FROM reservation " +
                "WHERE orderer_cust = ?;";
            //oederer = customers.custid
            //예약테이블에서 특정 고객이 예약한 행만 출력
            //과거이력까지 고려하여 복수행 설정
            const [rows] = await connection.query(query, [user.custid]);
            //console.log();
            return rows;
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },

    rsv_check_owner_ownerid: async function (ownerid) {
        if (ownerid <= 0) return { errno: "검색할 수 없는 데이터입니다." };
        const connection = await connect();
        if (connection.error) return { errno: "연결에 실패했습니다." }
        
        try {
            const query =
                'select pay.ordercode as ordercode,' +
                'res.reserveid as reserveid,' +
                'res.reservedate as reservedate,' +
                'res.reservetime as reservetime, ' +
                'res.cancel as cancel,' +
                'str.ownerid as store_ownerid,' +
                'str.name as store_name,' +
                'cus.custid as orderer_cust,' +
                'own.ownerid as orderer_owner,' +
                'cus.nickname as orderer_cust_nickname,' +
                'own.nickname as orderer_owner_nickname ' +
                'from reservation res,' +
                'payment pay,' +
                'store str,' +
                'owners own,' +
                'customers cus ' +
                'where res.storeid in' +
                '(select storeid ' +
                'from store ' +
                'where ownerid = ?)' +
                'and pay.reserveid = res.reserveid ' +
                'and str.storeid = res.storeid ' +
                'and own.ownerid = res.orderer_owner ' +
                'and cus.custid = res.orderer_cust ' +
                'order by reservedate desc, reservetime desc'
            const [rows] = await connection.query(query, [ownerid]);
            //console.log();
            return rows;
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },


    //상점주가 자신의 상점 예약현황 조회
    rsv_check_owner: async function (storeid) {
        if (storeid <= 0) return { errno: "검색할 수 없는 데이터입니다." };
        const connection = await connect();
        if (connection.error) return { errno: "연결에 실패하였습니다." };

        try {
            const query =
                "SELECT reserveid,storeid,reservedate,prepay,orderer_cust,orderer_owner,peoples,reservetime,cancel " +
                "FROM reservation " +
                "WHERE storeid = ?;";
            const [rows] = await connection.query(query, [storeid]);
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
        if (!store) return { errno: "store is null" };

        const connection = await connect();
        if (connection.error) return { errno: "connection failed" };

        try {
            const query =
                'INSERT INTO reservation(' +
                'storeid,' +
                'reservedate,' +
                'prepay,' +
                'orderer_cust,' +
                'orderer_owner,' +
                'peoples,' +
                'reservetime) ' +
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

            const lastIndex = await connection.query('SELECT LAST_INSERT_ID() as insertid')

            return lastIndex[0][0].insertid;

        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },

    find_one_reserve: async function (reserveid) {
        if (reserveid <= 0) return { errno: "reserveid empty" }

        const connection = await connect();
        if (connection.error) return { errno: "connection failed" }

        try {
            const query = 'select res.reserveid as reserveid,' + //예약번호
                'res.reservedate as reservedate,' + //날짜
                'res.reservetime as reservetime,' + //시간
                'res.cancel as cancel,' +   //취소여부
                'res.peoples as peoples,' + //인원수
                'pay.ordercode as ordercode,' + //주문번호
                'cus.nickname as c_nickname,' +
                'own.nickname as o_nickname,' + //둘중에하나
                'store.prepay as prepay, ' + //선수금
                'store.name as name,' + //가게명
                'store.address as address ' + //주소
                'from reservation as res, payment as pay, store as store, customers as cus, owners as own ' +
                'where (res.reserveid = ? and ' +
                'res.reserveid = pay.reserveid and ' +
                'res.storeid = store.storeid) and ' +
                '(res.orderer_cust = cus.custid and res.orderer_owner = own.ownerid)'

            const [rows] = await connection.query(query, [reserveid]);

            return rows[0];
        } catch (e) {
            return e
        } finally {
            connection.release();
        }
    },

    //상점주가 예약취소시 사용
    delete_rsv_owner: async function (user) {
        if (!user) return { errno: "user is null" };

        const connection = await connect();
        if (connection.error) return { errno: "connection failed" };

        try {
            const query =
                "DELETE FROM reservation " +
                "WHERE storeid = ?" +
                "AND reservedate = ? " +
                "AND reservetime = ? " +
                "AND orderer_cust = ? " +
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
        if (!user) return { errno: "user is null" };

        const connection = await connect();
        if (connection.error) return { errno: "connection failed" };

        try {
            const query =
                "UPDATE reservation " +
                "SET cancel = 'Y' " +
                "WHERE orderer_cust = ? " +
                "AND orderer_owner = ? " +
                "AND reservedate = ?;";

            const [rows] = await connection.query(query, [user.custid, user.ownerid, user.reservedate]); //(=orderer)            
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
            const query =
                "UPDATE reservation " +
                "SET cancel = 'Y' " +
                "WHERE orderer_cust = 3 " +
                "AND orderer_owner = 0 " +
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