const express = require('express');
const routes = require('./src/routes/routes');
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 8080;

// JWT setup
app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] == 'JWT'
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(' ')[1],
      'RESTFULAPIs',
      (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen(PORT, () => {
  console.log(`Your Server is running on port ${PORT}`);
});
