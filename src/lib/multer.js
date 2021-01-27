const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        const dest = `./public/images/${req.baseUrl.replace('/api', '')}`
        cb(null, dest)
    },
    filename: function (req, file, cb) {
        cb(null, `ml-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const fileFilter = function(req, file, cb){
    const type = file.mimetype.split('/')
    if(type[0] !== 'image') {
        req.fileVaildationError = "이미지 파일만 업로드 가능합니다."
        return cb(null, false);
    }
    else if(type[1] !== 'jpg' && type[1] !== 'jpeg' && type[1] !== 'png' && type[1] !== 'gif'){
        req.fileVaildationError = "확장자가 jpg, jpeg, png, gif인 파일만 업로드 가능합니다."
        return cb(null, false);
    }

    cb(null, true);
}

module.exports.upload =
    multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: { fileSize: 8 * 1024 * 1024 }
    })