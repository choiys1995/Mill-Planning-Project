import React from 'react';
import axios from 'axios';

const myPage = () =>{
    async function authCheck() {
        const user = await axios.get('/api/auth')

        console.log(user);

        await axios.get('/api/auth/logout');
    }
    return(
        <div>
            마이페이지
            <input type="button" onClick={authCheck}/>
        </div>
    )
}

export default myPage;