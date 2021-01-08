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