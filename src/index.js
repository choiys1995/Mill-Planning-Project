const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
// const https = require('https');
const http = require('http')
// const { privateKey, publicKey } = require('./config/sslconfig');

const app = express();
const http_port = 6534
// const https_port = 6535;

app.use(bodyParser.json());
app.use(cookieParser())

// const options = {
//     key: privateKey,
//     cert: publicKey
// }

app.use('/swagger-ui', express.static(__dirname + '/../public/docs'))
app.use('/api', require('./api'));

const httpServer = http.createServer(app);
httpServer.listen(http_port, function() {
    console.log(`http server listening on ${http_port}`);
})

// const httpsServer = https.createServer(options, app);
// httpsServer.listen(https_port, function() {
//     console.log(`HTTPS server listening on ${https_port}`);
// })