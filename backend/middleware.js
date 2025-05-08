const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const applyMiddleware = (server) => {
  server.use(cors());
  server.use(bodyParser.json());
  server.use(cookieParser());

  console.log('middlware is applied');
};

module.exports = applyMiddleware;
