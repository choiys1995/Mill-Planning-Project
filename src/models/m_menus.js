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
    selectmenu : async function(store){
        if (!store) return;

        const connection = await connect();
        if (connection.error) return;

        try {
            //const query = 
            //'SELECT name ,price ,menu_img ,storeid FROM menus WHERE (name,price,menu_img) IN (SELECT name,price,menu_img FROM menus WHERE storeid=? GROUP BY storeid)';
            
            const query = 
            'SELECT name ,price ,menu_img ,storeid FROM menus '+
            'WHERE (name,price,menu_img) ' +
            'IN (SELECT name,price,menu_img FROM menus WHERE storeid=? GROUP BY storeid);';

            const [data] = await connection.(query, [store.storeid]);
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
            return error;
        } finally {
            connection.release();
        }
    },
    
    insertmenu: async function (user) {
        if (!user) return;

        const connection = await connect();
        if (connection.error) return;

        try {
            const query = 'insert into menus values (?,?,?,?)';
            //칼럼명 (menuid,storeid,name,price,menu_img);
            /*const user = {
                custid: "",
                storeid: "",
                name: "",
                price: "",
                menu_img: "",
            }*/
            //리뷰에서 필요한 데이터
            //받을땐: 유저아이디(인덱스), 제목, 내용
            //클라이언트에 보내줄땐: 유저아이디(인덱스), 유저닉네임, 제목, 내용
            const data = await connection.query(
                query, [
                user.storeid,
                user.name,
                user.price,
                user.menu_img]);
            return data;

        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },

    updatemenu: async function (store) {
        if (!store) return;

        const connection = await connect();
        if (connection.error) return;

        try {
            const query = 'update menus set price=?, menu_img=? where name=' + store.name;
            //여기서 name은 메뉴이름임
            const data = await connection.query(query, [store.price, store.menu_img]);
            return data;
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
/** 
    updatemenutest: async function () {
        
        const connection = await connect();
        if (connection.error) return;

        try {
            const query = "update menus set price=1900, menu_img='www.update.com' where name='주니어와퍼'";
            const data = await connection.query(query);
            return data;
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
*/
}
