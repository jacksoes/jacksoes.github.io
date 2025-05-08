const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const applyMiddleware = (server) => {
  server.use(cors({
    origin: 'http://3.217.238.48', // 👈 use your frontend's origin
    credentials: true              // 👈 allow cookies/auth headers
  }));
  server.use(bodyParser.json());
  server.use(cookieParser());

  console.log('middlware is applied');
};

module.exports = applyMiddleware;
