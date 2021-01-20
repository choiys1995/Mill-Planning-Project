import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/common/Button';
import AuthTemplate from '../components/auth/AuthTemplate';
import { Route, Link } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';

const MyPage = (props) => {
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    /* 해당 페이지가 처음 실행되었을때 실행되는 함수 */
    useEffect(() => {
        const getUser = async () => {
            try {
                setError(null);
                setAccount(null);
                setLoading(true);

                const response = await axios.get('/api/auth');

                setAccount(response.data);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        }

        getUser();
    }, [])

    const logout = async () => {
        await axios.get('/api/auth/logout')
        setAccount(null);
    }


    return (
        <AuthTemplate>
            {
                loading ? '' :
                    !account ?
                        <><AuthForm type="login" /></> :

                        <>
                            <Button cyan style={{ marginTop: '1rem' }}>
                                <Link to="/MyResvPage">나의 예약 현황</Link>
                            </Button><br />
                            <Button cyan style={{ marginTop: '1rem' }}>
                                <Link to="/PreResvPage">이전 예약 목록</Link>
                            </Button><br />
                            <Button cyan style={{ marginTop: '1rem' }}>
                                <Link to="/ProfilePage">프로필 수정</Link>
                            </Button><br />
                            <Button cyan style={{ marginTop: '1rem' }} onClick={logout}>로그아웃</Button>
                        </>

            }
        </AuthTemplate>
    )
}

export default MyPage;