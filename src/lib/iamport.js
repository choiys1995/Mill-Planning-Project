/**
 * 결제모듈에 관한 코드입니다.
 */

const Iamport = require('iamport');
const impConfig = require('../config/iamport');

const iamport = new Iamport(impConfig);

/**결제 내역을 조회 */
const payment_searchAll = function() {
    iamport.payment.findByImpUid(
        impConfig.uid
    ).then(function(result){
        // to do
        return result;
    }).catch(function(error){
        //handle error 
        return { error }
    })
}

/**하나의 결제에 대한 결제내역을 조회 */
const payment_search = async function(merchantid) {
    const result = await iamport.payment.getByMerchant({
        merchant_uid: merchantid
    })

    return result;
}


module.exports = {
    payment_search,
    payment_searchAll
}