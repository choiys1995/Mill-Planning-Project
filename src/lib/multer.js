const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination: '../public/images/',
    filename: function (req, file, cb) {
        cb(null, `image File ${data.now()} ${path.extname(file.originalname)}`)
    }
})

module.exports.upload =
    multer({
        storage: storage,
        limits: { fileSize: 102400 }
    })