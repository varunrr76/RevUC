const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var sqlite3 = require('sqlite3').verbose();

var db;

db = new sqlite3.Database('backend_db.sqlite3', err => {
  if (err) throw err;
  console.log('Successfully connected to database');
});

function User(
  username,
  password,
  debitBalance,
  creditScore,
  dueAmount,
  dueDate
) {
  this.username = username;
  this.password = password;
  this.debitBalance = debitBalance;
  this.creditScore = creditScore;
  this.dueAmount = dueAmount;
  this.dueDate = dueDate;
}

// In memory Usage Only
var allUsers = [];

const tempUser = new User('Ak', '1234', 20000, 700, 3000, '2020-03-04');

allUsers.push(tempUser);

function findUser(user) {
  var userFlag = false;
  for (var i = 0; i < allUsers.length; i++) {
    if (
      user.username === allUsers[i].username &&
      user.password === allUsers[i].password
    ) {
      userFlag = true;
    }
  }
  return userFlag;
}

const authenticateUser = (req, res, next) => {
  var user = new User(req.body.username, req.body.password);

  console.log('authenticating user', user);
  // In memory usage only
  var userFlag = findUser(user);
  if (userFlag) {
    var token = jwt.sign({ username: user.username }, 'RESTFULAPIs', {
      expiresIn: 60 * 60
    });
    res.status(200).json({ token: token });
  } else {
    res.status(400).send('Failed to authenticate');
  }
};

const getData = (req, res, next) => {
  res.send(allUsers[0].data);
};

const getExp = (req, res, next) => {
  console.log(req.params.month);
  db.all(
    'SELECT COUNT(*) FROM debitTransactions WHERE MONTH = (?)',
    [parseInt(req.params.month, 10)],
    function(err, rows) {
      if (err) throw err;
      console.log(rows);
      res.send(rows);
    }
  );
};

const getDebitCardDetails = (req, res) => {
  var today = new Date();
  db.all(
    'SELECT PURCHASE_DATE AS date, SPEND AS totalExpense FROM debitTransactions ORDER BY PURCHASE_DATE DESC LIMIT 5',
    function(err, lastFiveTrans) {
      if (err) throw err;
      db.all(
        'SELECT ROUND(SUM(SPEND),2) AS totalExpense, DEPARTMENT AS categoryName FROM debitTransactions WHERE MONTH=(?) AND YEAR=(?) GROUP BY DEPARTMENT',
        [parseInt(today.getMonth() + 1), parseInt(today.getFullYear())],
        function(err, rows) {
          if (err) throw err;
          categoryName_ar = ['FOOD', 'NON-FOOD', 'PHARMA'];
          let total_expense = 0;
          for (var i = 0; i < rows.length; i++) {
            total_expense += rows[i].totalExpense;
          }
          thetaOffset = 0;
          for (var i = 0; i < rows.length; i++) {
            rows[i]['theta-length'] = Math.round(
              (rows[i].totalExpense / total_expense) * 360,
              2
            );
            rows[i]['theta-start'] = thetaOffset;
            thetaOffset = rows[i]['theta-length'];
            const index = categoryName_ar.indexOf(rows[i].categoryName);
            if (index > -1) {
              categoryName_ar.splice(index, 1);
            }
          }
          for (var i = 0; i < categoryName_ar.length; i++) {
            rows.push({
              totalExpense: 0,
              categoryName: categoryName_ar[i],
              'theta-length': 0,
              'theta-start': 360
            });
          }
          res.status(200).json({
            availableBalance: '$' + tempUser.debitBalance,
            transactionList: lastFiveTrans,
            expenseCatogories: rows
          });
        }
      );
    }
  );
};

const getCreditCardDetails = (req, res) => {
  var today = new Date();
  db.all(
    'SELECT PURCHASE_DATE AS date, SPEND AS totalExpense FROM creditTransactions ORDER BY PURCHASE_DATE DESC LIMIT 5',
    function(err, lastFiveTrans) {
      if (err) throw err;
      db.all(
        'SELECT ROUND(SUM(SPEND),2) AS totalExpense, DEPARTMENT AS categoryName FROM creditTransactions WHERE MONTH=(?) AND YEAR=(?) GROUP BY DEPARTMENT',
        [parseInt(today.getMonth() + 1), parseInt(today.getFullYear())],
        function(err, rows) {
          if (err) throw err;
          categoryName_ar = ['FOOD', 'NON-FOOD', 'PHARMA'];
          let total_expense = 0;
          for (var i = 0; i < rows.length; i++) {
            total_expense += rows[i].totalExpense;
          }
          thetaOffset = 0;
          for (var i = 0; i < rows.length; i++) {
            rows[i]['theta-length'] = Math.round(
              (rows[i].totalExpense / total_expense) * 360,
              2
            );
            rows[i]['theta-start'] = thetaOffset;
            thetaOffset = rows[i]['theta-length'];
            const index = categoryName_ar.indexOf(rows[i].categoryName);
            if (index > -1) {
              categoryName_ar.splice(index, 1);
            }
          }
          for (var i = 0; i < categoryName_ar.length; i++) {
            rows.push({
              totalExpense: 0,
              categoryName: categoryName_ar[i],
              'theta-length': 0,
              'theta-start': 360
            });
          }
          res.status(200).json({
            creditScore: '$' + tempUser.creditScore,
            dueAmount: '$' + tempUser.dueAmount,
            dueDate: tempUser.dueDate,
            transactionList: lastFiveTrans,
            expenseCatogories: rows
          });
        }
      );
    }
  );
};

/*
const loginRequired = (req, res, next) => {
  console.log(req.user);
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Please Authenticate first!' });
  }
};
*/

module.exports = {
  authenticateUser,
  getData,
  getDebitCardDetails,
  getCreditCardDetails,
  //loginRequired,
  getExp
};
