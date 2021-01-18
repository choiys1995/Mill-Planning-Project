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
/**
 * 리뷰 테이블에 필요한 기능
 * 리뷰작성, 리뷰검색, 수정 및 삭제는 필요없을 듯
 */
module.exports = {

    select: async function (storeid) {
        if(storeid <= 0) return {errno: "잘못된 요청입니다."};

        const connection = await connect();
        if (connection.error) return {errno: "connection failed"};

        try {
            const query = 
            'SELECT a.nickname as writer,'+
            'b.reviewid,'+
            'b.storeid,'+
            'b.custid,'+
            'b.ownerid,'+
            'b.title,'+
            'b.content,'+
            'b.review_img,'+
            'b.score,'+
            'b.writedate '+
            'FROM customers a, reviews b '+
            'WHERE a.custid = b.custid '+
            'AND storeid=?;';

            const [rows] = await connection.query(query, [storeid]);
            //console.log(rows0);
            return rows;
        } catch (error) {
            return error;
        } finally {
            await connection.release();
        }
    },

    insert_cust : async function (user) {
        if (!user) return {errno: "user is null"};

        const connection = await connect();
        if (connection.error) return {errno: "connection failed"};

        try {
            const query =
                'INSERT INTO reviews('+
                    'storeid,'+
                    'custid,'+
                    'ownerid,'+
                    'title,'+
                    'content,'+
                    'review_img,'+
                    'score,writedate) '+
                'VALUES (?,?,0,?,?,?,?,sysdate())';

            const [data] = await connection.query(
                query,
                [user.storeid,
                user.custid,
                user.title,
                user.content,
                user.review_img,
                user.score
                ]
            );
            return data[0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },

    insert_owner : async function (user) {
        if (!user) return;

        const connection = await connect();
        if (connection.error) return;

        try {
            const query =
                'INSERT INTO reviews('+
                    'storeid,'+
                    'custid,'+
                    'ownerid,'+
                    'title,'+
                    'content,'+
                    'review_img,'+
                    'score,writedate) '+
                'VALUES (?,0,?,?,?,?,?,sysdate())';

            const [data] = await connection.query(
                query,
                [user.storeid,
                user.custid,
                user.title,
                user.content,
                user.review_img,
                user.score
                ]
            );
            return data[0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },

    // inserttest: async function () {

    //     const connection = await connect();
    //     if (connection.error) return;

    //     try {
    //         const query =
    //         'INSERT INTO reviews('+
    //         'storeid,'+
    //         'custid,'+
    //         'ownerid,'+
    //         'title,'+
    //         'content,'+
    //         'review_img,'+
    //         'score,writedate) '+
    //     'VALUES (1,0,1,"리뷰테스트2오너","테스트내용2","IMGSRC",5,sysdate())';
    //         const [data] = await connection.query(query);
    //         return data[0];
    //     } catch (error) {
    //         console.log(error);
    //         return error;
    //     } finally {
    //         connection.release();
    //     }
    // },



    //가게별 평점 조회
    averagescore: async function (user) {
        if (!user) return {errno: "user is null"};

        const connection = await connect();
        if (connection.error) return {errno: "connection failed"};

        try {
            const query =
                'SELECT score,'+
                        'count(score) as count,'+
                        'ROUND(avg(score),2) as average '+
                'FROM reviews '+
                'WHERE storeid = ? '
                'GROUP BY score '+
                'WITH ROLLUP;';

            const [data] = await connection.query(query,[user.storeid]);
            //console.log(data);
            return data;

        } catch (error) {
            console.log(error);
            return error;
        } finally {
            connection.release();
        }
    },

    averagescore_test: async function () {
        const connection = await connect();
        if (connection.error) return {errno: "connection failed"};

        try {
            const query =
                'SELECT score, count(score) as count, ROUND(avg(score),2) as average '+
                'FROM reviews where storeid=1 GROUP BY score with rollup;';

            const [data] = await connection.query(query);
            console.log(data);
            return data;

        } catch (error) {
            console.log(error);
            return error;
        } finally {
            connection.release();
        }
    },

//     selecttest: async function () {
        
//         const connection = await connect();
//         if (connection.error) return connection.error;

//         try {
//             const query = 
//             'SELECT a.nickname as writer,'+
//             'b.reviewid,'+
//             'b.storeid,'+
//             'b.custid,'+
//             'b.ownerid,'+
//             'b.title,'+
//             'b.content,'+
//             'b.review_img,'+
//             'b.score,'+
//             'b.writedate '+
//             'FROM customers a, reviews b '+
//             'WHERE a.custid = b.custid '+
//             'AND storeid=1;';

//             const [rows] = await connection.query(query);
//             console.log(rows[0]);
//             return rows;
//         } catch (error) {
//             return error;
//         } finally {
//             await connection.release();
//         }
//     }
// }
    


    // delete: async function (user) {
    //     if (!user) return;
    // }
}