import client from '../lib/client'
import {
    REVIEW_ADD,
    REVIEW_INDEX
} from './types.js'
import * as domain from '../lib/server'

//리뷰 조회
export function reviewIndexer(storeid){
    const req = client.get(`${domain.default}api/store/${storeid}/review`)
        .then(res => res);

    return {
        type: REVIEW_INDEX,
        payload: req
    }
}

export function reviewAdd(data, storeid) {
    const req = client({
        method: "post",
        url: `${domain.default}api/store/${storeid}/review`,
        data: data,
        headers: { "Content-type": "multipart/form-data" }
    }).then(res => res)

    return {
        type: REVIEW_ADD,
        payload: req
    }
}