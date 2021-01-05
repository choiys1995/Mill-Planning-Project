const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const http = require('http');
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const dateFormat = require('./lib/dateFormat')
const cors = require('cors');


const app = express();
const http_port = 6534

const passport = require('passport');
const passportConfig = require('./lib/passport')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: "g7m60p0h0m",
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000 * 7 // cookie가 expired 되는시간 7일
    },
    store: new FileStore(),
}))

app.use(cors({
    origin(origin, callback) {
        callback(null, true)
    },
    credentials: true
}))
app.use(passport.initialize());
app.use(passport.session());
passportConfig();
app.use(cookieParser())

app.use('/swagger-ui', express.static(__dirname + '/../public/docs'))
app.use('/images', express.static(__dirname + '/../public/images'))
app.use('/api', require('./api'));

// view 경로 설정
app.set('views', __dirname + '/views');

// 화면 engine을 ejs로 설정
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
    res.render('index.html');
})

app.get('/', (req, res) => {
    res.render('kakao.html');
})

const httpServer = http.createServer(app);
httpServer.listen(http_port, function() {
    console.log(`http server listening on ${http_port}`);
})