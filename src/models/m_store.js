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
    select_Limit5_Stores: async function(){
        const connection = await connect();
        if(connection.error) return { errno: 'connection failed'};

        try{
            const query = 
                    `SELECT * ` +
                    `FROM store ` +
                    `limit 5`

            const [rows] = await connection.query(query,[]);
            return rows;
        }catch(e){
            return e;
        }finally{
            connection.release();
        }
    },

    selectstore_categories : async function(keyword){

        if (!keyword) return { errno : '검색어가 없습니다'};

        const connection = await connect();
        if(connection.error) return {errno: 'connection failed' };
        
        try{
            const query =
            'SELECT * FROM store WHERE name LIKE ' +
            connection.escape('%' + keyword.main + '%') + 
            ' OR address LIKE ' +
            connection.escape('%' + keyword.datail + '%');
            
            const [rows] = await connection.query(query);
            return rows;

        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    selectstore_cust: async function(storeid){
        if (storeid <= 0) return { errno : '일치하는 상점 정보가 없습니다'};

        const connection = await connect();
        if(connection.error) return { errno: 'connection failed'};

        try{
            const query =
            'SELECT b.storeid as storeid,'+
                   'b.ownerid as ownerid,'+
                   'a.nickname as ownername,'+
                   'b.name as name,'+
                   'b.address as address,'+
                   'b.tel as tel,'+
                   'b.description as description,'+
                   'b.prepay as prepay,'+
                   'b.breaktime as breaktime,'+
                   'b.holyday as holyday,'+
                   'b.busino as busino,'+
                   'b.store_img as store_img,'+
                   'b.categories as categories '+
            'FROM owners a, store b '+
            'WHERE a.ownerid = b.ownerid '+
            'AND storeid=?;';

            const [rows] = await connection.query(query,[storeid]);
            return rows[0];

        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    selectstore_owner: async function(ownerid){
        if (ownerid <= 0) return { errno : '일치하는 상점 정보가 없습니다'};

        const connection = await connect();
        if(connection.error) return {errno: 'connection failed' };
        
        try{
            const query =
            'SELECT  b.storeid as storeid,'+
                    'b.ownerid as ownerid,'+
                    'a.nickname as ownername,'+
                    'b.name as name,'+
                    'b.address as address,'+
                    'b.tel as tel,'+
                    'b.description as description,'+
                    'b.prepay as prepay,'+
                    'b.breaktime as breaktime,'+
                    'b.holyday as holyday,'+
                    'b.busino as busino,'+
                    'b.store_img as store_img,'+
                    'b.categories as categories '+
            'FROM owners a, store b '+
            'WHERE a.ownerid = b.ownerid '+
            'AND b.ownerid=?;';
            

            const [rows] = await connection.query(query, [ownerid]);
            return rows;

        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    insertstore: async function (user) {

        if(!user) return {errno: "user is null"};
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
        if (connection.error) return {errno: 'connection failed'};

        try {
            const query =
             'INSERT INTO store ('+
                 'ownerid,'+
                 'name,'+
                 'address,'+
                 'tel,'+
                 'description,'+
                 'prepay,'+
                 'breaktime,'+
                 'holyday,'+
                 'busino,'+
                 'store_img,'+
                 'categories) '+
              'VALUES (?,?,?,?,?,?,?,?,?,?,?) ';
            
            await connection.query(
                query, [
                user.ownerid,
                user.name,
                user.address,
                user.tel,
                user.description,
                user.prepay,
                user.breaktime,
                user.holyday,
                user.busino,
                user.store_img,
                user.categories]
            );

            const result = await connection.query('SELECT LAST_INSERT_ID() as insertid')
            
            return result[0][0].insertid;

        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    // insertstoretest: async function () {      
        
    //     const connection = await connect();
    //     if (connection.error) return;

    //     try {
    //         const query = "insert into store (ownerid,name,address,tel,description,prepay,breaktime,holyday,busino,store_img,categories) values(2,'페리카나치킨','강남구 대치동','028936322','치킨파는집',3000,'오후1시부터 3시','법정공휴일','4444','www.naver.com','치킨집')";
            
    //         const data = await connection.query(query);
    //         return data;

    //     } catch (error) {
    //         console.log(error);
    //         return error;
    //     } finally {
    //         connection.release();
    //     }
    // },
    selectstore_custtest: async function(){
        
        const connection = await connect();
        if(connection.error) return;

        try{
            const query =
            'SELECT b.storeid,'+
                   'b.ownerid,'+
                   'a.nickname as ownername,'+
                   'b.name,'+
                   'b.address,'+
                   'b.tel,'+
                   'b.description,'+
                   'b.prepay,'+
                   'b.breaktime,'+
                   'b.holyday,'+
                   'b.busino,'+
                   'b.store_img,'+
                   'b.categories '+
            'FROM owners a, store b '+
            'WHERE a.ownerid = b.ownerid '+
            'AND storeid=1;';

            const [rows] = await connection.query(query);
            return rows[0];

        } catch (error) {
            console.log(error);
            return error;
        } finally {
            connection.release();
        }
    },
    selectstore_ownertest: async function(){
        
        const connection = await connect();
        if(connection.error) return;

        try{
            const query =
            'SELECT b.storeid,'+
                   'b.ownerid,'+
                   'a.nickname as ownername,'+
                   'b.name,'+
                   'b.address,'+
                   'b.tel,'+
                   'b.description,'+
                   'b.prepay,'+
                   'b.breaktime,'+
                   'b.holyday,'+
                   'b.busino,'+
                   'b.store_img,'+
                   'b.categories '+
            'FROM owners a, store b '+
            'WHERE a.ownerid = b.ownerid '+
            'AND b.ownerid=1;';
            

            const [rows] = await connection.query(query);
            console.log(rows);
            return rows;

        } catch (error) {
            console.log(error);
            return error;
        } finally {
            connection.release();
        }
    },
}