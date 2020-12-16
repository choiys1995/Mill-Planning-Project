/**
 * HTTPS 연결을위한 SSL 인증서를 담은 파일
 * public git에 배포시 파일이 담긴 폴더는 .gitignore에 추가할것!!
 */


const fs = require('fs');
const path = require('path');

module.exports = {
    privateKey: fs.readFileSync(path.normalize(__dirname + '\\..\\..\\private\\key.pem')),
    publicKey: fs.readFileSync(path.normalize(__dirname + '\\..\\..\\private\\cert.pem'))
}