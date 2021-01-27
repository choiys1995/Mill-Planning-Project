import client from '../lib/client'
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    CHECK_USER,
    PROFILE_EDIT,
    PROFILE_CHECK
} from './types.js'
import * as domain from '../lib/server'

//로그인
export function loginUser(dataToSubmit){
    const req = client.post(`${domain.default}api/auth/login`, dataToSubmit)
        .then(res => res)

    return {
        type: LOGIN_USER,
        payload: req
    }
}

//회원가입
export function registerUser(dataToSubmit, admin){
    const userType = admin ? 'owners' : 'customers'
    const req = client.post(`${domain.default}api/${userType}/register`, dataToSubmit)
        .then(res => res)

    return {
        type: REGISTER_USER,
        payload: req
    }
}

export function isExistUser(email, admin) {
    const req = client.get(`${domain.default}api/auth/findbyid?email=${email}&admin=${admin}`).then(res=>res)

    return {
        type: CHECK_USER,
        payload: req
    }
}

//인증
export function auth(){
    const req = client.get(`${domain.default}api/auth/`)
                .then(response => {
                    return response;
                })


    return {
        type: AUTH_USER,
        payload: req
    }
}

//로그아웃
export function logout() {
    const req = client.get(`${domain.default}api/auth/logout`)
                    .then(response => response)

    return {
        type: LOGOUT_USER,
        payload: req
    }
}

export function profile_check ({currentPassword}) {
    const checkPassword = {
        currentPassword
    }
    const req = client.post(`${domain.default}api/auth/profile/confirm`, checkPassword)
                    .then(res => res)

    return {
        type: PROFILE_CHECK,
        payload: req
    }
}

export function profile_edit({currentPassword, newPassword, newNickname, newTel}) {
    const profileEdit = {
        currentPassword, newPassword, newNickname, newTel
    }
    const req = client.patch(`${domain.default}api/auth/profile`, profileEdit)
                    .then(res => res)

    return {
        type: PROFILE_EDIT,
        payload: req
    }
}