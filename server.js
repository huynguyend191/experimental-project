const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3003;

const server = http.createServer(app);

const hostname = '127.0.0.1';

server.listen(port, hostname);