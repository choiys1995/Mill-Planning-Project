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

    insert: async function (user) {
        if(!user) return {errno: "user is null"};

        const connection = await connect();
        if (connection.error) return {errno: "connection failed"};

        try {
            const query =
                'insert into reviews(storeid,custid,title,content,review_img,score,writedate) values (?,?,?,?,?,?,sysdate())';
            
            if(user.custid === 0) query.replace('custid', 'ownerid')

            const result = await connection.query(
                query,
                [user.storeid,
                user.custid === 0 ? user.ownerid : user.custid,
                user.title,
                user.content,
                user.review_img,
                user.score
                ]
            );
            return result;
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
    //             'insert into reviews values(25,3,3,"리뷰테스트","sysdate테스트","www.naver.com",3,sysdate())';

    //         const data = await connection.query(query);
    //         return data;
    //     } catch (error) {
    //         console.log(error);
    //         return error;
    //     } finally {
    //         connection.release();
    //     }
    // },

    //가게별 평점 조회
    averagescore: async function (storeid) {
        if (storeid <= 0) return {errno: "there is not store"};

        const connection = await connect();
        if (connection.error) return {errno: "connection failed"};

        try {
            const query =
                'SELECT storeid, score,'+
                        'count(score) as count,'+
                        'ROUND(avg(score),1) as average '+
                        'FROM reviews '+
                        'WHERE storeid = ? ' +
                        'GROUP BY score, storeid ' +
                        'WITH ROLLUP;';

            const [rows] = await connection.query(query,[storeid]);
            //console.log(data);
            return rows;

        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },

    // selecttest: async function () {
        
    //     const connection = await connect();
    //     if (connection.error) return connection.error;

    //     try {
    //         const query = 
    //         'SELECT a.nickname as writer,'+
    //         'b.reviewid,'+
    //         'b.storeid,'+
    //         'b.custid,'+
    //         'b.title,'+
    //         'b.content,'+
    //         'b.review_img,'+
    //         'b.score,'+
    //         'b.writedate '+
    //         'FROM customers a, reviews b '+
    //         'WHERE a.custid = b.custid '+
    //         'AND storeid=1;';

    //         const [rows] = await connection.query(query);
    //         console.log(rows[0]);
    //         return rows;
    //     } catch (error) {
    //         return error;
    //     } finally {
    //         await connection.release();
    //     }
    // }
}
    


    // delete: async function (user) {
    //     if (!user) return;
    // }
