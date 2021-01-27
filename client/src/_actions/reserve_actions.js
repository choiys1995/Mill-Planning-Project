import client from '../lib/client'
import {
    RESERVE_ADD,
    RESERVE_INDEX,
    RESERVE_DELETE,
    PRE_RESERVE_DATA,
    RESERVE_DATA,
    ADMIN_RESERVE_DATA
} from './types.js'
import * as domain from '../lib/server'


//예약하기
export function doReserve({imp_uid, merchant_uid, name, amount, buyer_name, buyer_tel, storeid, reservedate, prepay, peoples, reservetime}){
    const send_data = {
        imp_uid, merchant_uid, name, amount, buyer_name, buyer_tel,
        storeid, reservedate, prepay, peoples, reservetime
    }
    const req = client.post(`${domain.default}api/customers/reserve/${storeid}`, send_data)
        .then(res => res);

    return {
        type: RESERVE_ADD,
        payload: req
    }
}

//예약 조회(하나만)
export function indexReserve(reserveid){
    //console.log(reserveid);
    const req = client.get(`${domain.default}api/customers/reserve/find/${reserveid}`)
                .then(res => res);

    return {
        type: RESERVE_INDEX,
        payload: req
    }
}

export function listReserve() {
    const req = client.get(`${domain.default}api/customers/reserve/`)
                    .then(res => res);
    return {
        type: RESERVE_DATA,
        payload: req
    }
}

export function listOldReserve(){
    const req = client.get(`${domain.default}api/customers/old/reserve`)
        .then(res => res);

    return {
        type: PRE_RESERVE_DATA,
        payload: req
    }
}

export function adminReserveView() {
    const req = client.get(`${domain.default}api/owners/reservelist`)

    return {
        type: ADMIN_RESERVE_DATA,
        payload: req
    }
}