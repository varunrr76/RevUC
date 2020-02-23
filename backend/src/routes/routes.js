const userControllers = require('../controllers/userControllers');

const routes = app => {
  app.route('/').get((req, res) => {
    res.send('Welcome');
  });
  app
    .post('/login', userControllers.authenticateUser)
    .get('/data', userControllers.getData)
    .get('/getDebitCardDetails', userControllers.getDebitCardDetails)
    .get('/getCreditCardDetails', userControllers.getCreditCardDetails)
    .get('/exp/:month', userControllers.getExp);
};

module.exports = routes;
