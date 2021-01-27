import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/common/Button';
import AuthTemplate from '../components/auth/AuthTemplate';
import { Route, Link } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { auth, logout } from '../_actions/user_actions';

const MyPage = (props) => {
    const { account } = useSelector(state => {
        return state.user;
    })
    const dispatch = useDispatch()

    /* 해당 페이지가 처음 실행되었을때 실행되는 함수 */
    useEffect(() => {
        dispatch(auth());
    }, [dispatch])

    const loggedout = () => {
        dispatch(logout());
    }


    return (
        <AuthTemplate>
            {
                !account ?
                    <><AuthForm type="login" /></> :
                    <>
                        <Link to="/MyResvPage">
                            <Button cyan style={{ marginTop: '1rem' }}>
                                나의 예약 현황
                        </Button>
                        </Link><br />

                        <Link to="/PreResvPage">
                            <Button cyan style={{ marginTop: '1rem' }}>
                                이전 예약 목록
                        </Button>
                        </Link><br />

                        {
                            account.admin &&
                            <>
                                <Link to="/owner/reserve">
                                    <Button cyan style={{ marginTop: '1rem' }}>
                                        내 가게 관리
                                    </Button>
                                </Link><br />
                            </>
                        }

                        <Link to="/ProfilePage">
                            <Button cyan style={{ marginTop: '1rem' }}>
                                프로필 수정
                        </Button>
                        </Link><br />
                        <Button cyan style={{ marginTop: '1rem' }} onClick={loggedout}>로그아웃</Button>
                    </>
            }
        </AuthTemplate>
    )
}

export default MyPage;