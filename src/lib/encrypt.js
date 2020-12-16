const bcrypt = require('bcrypt')
const saltRounds = 12

/**
 * 비밀번호를 암호화하여 salt값과 함께 반환
 */
exports.genEncryption = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)

    return { salt, hash }
}

/**
 * 평문과 암호화된 비밀번호를 비교하여 올바른 패스워드인지 확인
 */
exports.verifiEncrypt = (password, saltedPassword) => 
                bcrypt.compareSync(password, saltedPassword)