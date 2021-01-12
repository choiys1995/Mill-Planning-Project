const mysql2 = require('mysql2/promise');
const { development, test, production } = require('../config/dbconfig')

/**
 * createPool({
 *  host: ~~,              -- 데이터베이스를 연결할 곳
 *  user:   ,          -- 계정아이디
 *  password:   ,          -- 계정 비밀번호
 *  connectionLimit:       -- 커넥션 풀 생성갯수
 * })
 */

const dbConnectionPool = mysql2.createPool(test);

/**db ConnectionPool을 생성 */
module.exports = dbConnectionPool;