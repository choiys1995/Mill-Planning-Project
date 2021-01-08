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
    insertmenu : async function(user){
        if (!user) return;

        

        const connection = await connect();
        if(connection.error) return;

        try{
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
                query,[
                user.storeid,
                user.name,
                user.price,
                user.menu_img]);
            return data;

        }catch(error) {
            return error;
        }finally{
            connection.release();
        }
    }
}