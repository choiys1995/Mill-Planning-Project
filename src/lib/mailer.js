const nodemailer = require('nodemailer')
const config = require('../config/mailconfig')

exports.mailing = async ({ email, newPassword, token }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            prot: 465,
            host: 'smtp.gmlail.com',
            secure: true,
            requireTLS: true,
            auth: {
                user: config.email,  // gmail 계정 아이디를 입력
                pass: config.password         // gmail 계정의 비밀번호를 입력
            }
        });

        const mailOptions = {
            from: config.email,    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
            to: email,                     // 수신 메일 주소
            subject: 'Hello Your Password Reset~',   // 제목
            text: `계정이 성공적으로 생성되었으나 이메일을 통한 인증이 필요합니다.<br>
                    다음 링크로 들어가 인증절차를 마쳐 주세요. <br>
                    https://localhost/api/user/register/${token}`  // 내용
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return error
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    }catch(error){
        return error
    }
}