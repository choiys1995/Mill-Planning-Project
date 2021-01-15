import React from 'react';
import axios from 'axios';
import Button from '../components/common/Button';
import AuthTemplate from '../components/auth/AuthTemplate';
import {Route, Link} from 'react-router-dom';

const myPage = () =>{
    async function authCheck() {
        const user = await axios.get('/api/auth')

        console.log(user);

        await axios.get('/api/auth/logout');
    }
    return(
        <AuthTemplate>
            <Button cyan style={{marginTop: '1rem'}}>
                <Link to="/MyResvPage">나의 예약 현황</Link>
            </Button><br/>
            <Button cyan style={{marginTop: '1rem'}}>
                <Link to="/PreResvPage">이전 예약 목록</Link>
            </Button><br/>
            <Button cyan style={{marginTop: '1rem'}}>
                <Link to="/ProfilePage">프로필 수정</Link>
            </Button><br/>
            <Button cyan style={{marginTop: '1rem'}} onClick={authCheck}>로그아웃</Button>
        </AuthTemplate>
    )
}

export default myPage;