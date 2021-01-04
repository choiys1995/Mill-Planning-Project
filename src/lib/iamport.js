/**
 * 결제모듈에 관한 코드입니다.
 */

const Iamport = require('iamport');
const impConfig = require('../config/iamport');

const iamport = new Iamport(impConfig);

const index_payment = function() {
    iamport.payment.findByImpUid({
        imp_uid: 'imp94333879'
    }).then(function(result){
        // to do
    }).catch(function(error){
        //handle error 
    })
}