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

//관리자가 자기가게정보 볼 수 있는거, 소비자가 들어갔을때 볼 수 있는거
module.exports = {
    insertstore: async function (user) {

        if (!user) return;
        /**
         *  storeid int(11) AI PK 
            ownerid int(11) 
            name varchar(45) 
            address varchar(200) 
            tel varchar(45) 
            desc varchar(500) 
            prepay int(11) 
            breaktime varchar(45) 
            holyday varchar(20) 
            buisno varchar(100) 
            store_img varchar(50) 
            categories varchar(15)
        */
        const connection = await connect();
        if (connection.error) return;

        try {
            const query = 'insert into store (ownerid,name,address,tel,description,prepay,breaktime,holyday,busino,store_img,categories) values (?,?,?,?,?,?,?,?,?,?,?)';
            
            const [data] = await connection.query(
                query, [
                user.ownerid,
                user.name,
                user.address,
                user.tel,
                user.description,
                user.prepay,
                user.breaktime,
                user.holiday,
                user.busino,
                user.store_img,
                user.categories]
            );
            return data;

        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    insertstoretest: async function () {      
        
        const connection = await connect();
        if (connection.error) return;

        try {
            const query = "insert into store (ownerid,name,address,tel,description,prepay,breaktime,holyday,busino,store_img,categories) values(2,'페리카나치킨','강남구 대치동','028936322','치킨파는집',3000,'오후1시부터 3시','법정공휴일','4444','www.naver.com','치킨집')";
            
            const data = await connection.query(query);
            return data;

        } catch (error) {
            console.log(error);
            return error;
        } finally {
            connection.release();
        }
    },
}