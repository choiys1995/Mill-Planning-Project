rsv_check_cust : async function (user) {
    if (!user) return;
    const connection = await connect();
    if (connection.error) return;

    try {
        const query='';
        const [rows] = await connection.query(query,[]);
        //console.log();
        return rows[0];
    } catch (error) {
        return error;
    } finally {
        connection.release();
    }
}