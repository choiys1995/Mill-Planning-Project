import client from '../lib/client'
import {
    STORE_ADD,
    STORE_INFO,
    STORE_SEARCH,
    STORE_LIMIT_SEARCH,
    STORE_UPDATE,
    STORE_ADMIN_LIST,
} from './types.js'
import * as domain from '../lib/server'

//홈에 가게조회
export function mainPageStoreList(dataToSubmit){
    const req = client.get(`${domain.default}api/store/home`)
        .then(res => res)

    return {
        type: STORE_LIMIT_SEARCH,
        payload: req
    }
}

export function storeSearch(keyword) {
    const req = client.get(`${domain.default}api/store/search?main=${keyword.main}&detail=${keyword.detail}`)
                .then(res => res)

    return {
        type: STORE_SEARCH,
        payload: req
    }
}

export function storeAdd(data) {
    //const req = client.post(`${domain.default}api/store/filetest`, data).then(res => res)
    const req = client({
        method: "post",
        url: `${domain.default}api/store/`,
        data: data,
        headers: { "Content-type": "multipart/form-data" }
    })

    return {
        type: STORE_ADD,
        payload: req
    }
}

//가게 내용 조회
export function storeInfo(storeid) {
    const req = client.get(`${domain.default}api/store/${storeid}`).then(res => res)

    return {
        type: STORE_INFO,
        payload: req,
    }
}

export function adminManagementStoreList(){
    const req = client.get(`${domain.default}api/ad-store/`).then(res => {
        return res;
    })

    return{
        type: STORE_ADMIN_LIST,
        payload: req
    }
}