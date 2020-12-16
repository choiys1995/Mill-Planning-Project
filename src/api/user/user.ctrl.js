const User = require('../../models/user')
const Joi = require('joi')
const encrypt = require('../../lib/encrypt')
const mailer = require('../../lib/mailer')
const { token } = require('morgan')

/**
 * 회원가입메서드
 * req.body 쪽에서 정보를 입력받아 넣는다.
 * joi를 통해 필수목록체크 (이는 홈페이지에서도 그대로 사용하게끔 반영해주어야 함)
 * bcrypt를 통해 비밀번호 암호화
 */
exports.Register = async function(req, res) {
    const user = req.body;

    const schema = Joi.object({
        username: Joi.string()  //문자열 타입
                .alphanum()     //영어 숫자만 포함해야함
                .min(3)         //최소 문자열 3
                .max(20)        //최대 문자열 20
                .required(),     //필수입력
        password: Joi.string()
                .pattern(new RegExp('^[a-z0-9!@#]{6,15}$')),   //영문,숫자,특수문자(!@#)만 포함가능 6글자~15글자까지
    });

    const vaildate = schema.validate(user); //유효성 체크
    if(vaildate.error) return res.status(400).json(vaildate.error)

    /**암호화 영역 암호화는 bcrypt 모듈을 사용함 */
    const data = encrypt.genEncryption(user.password)

    user.password = data.hash
    user.salt = data.salt

    const result = await User.insert(user)
    if(result.errno) return res.status(500).json(result)

    return res.status(200).json(result)
}

exports.registerEmailAuth = async function(req, res) {
    const { token, username } = req.params
}

exports.findPassword = async function(req, res) {

}