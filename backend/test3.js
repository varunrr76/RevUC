var today = new Date();

console.log(today.getMonth() + 1, today.getFullYear());

var sqlite3 = require('sqlite3').verbose();
const csv = require('csv-parser');
const fs = require('fs');

var db;

db = new sqlite3.Database('backend_db.sqlite3', err => {
  if (err) throw err;
  console.log('Successfully connected to database');
  createcreditTable();
});

function createcreditTable() {
  console.log('createcreditTable lorem');
  db.run(
    'CREATE TABLE IF NOT EXISTS creditTransactions (HSHD_NUM TEXT, PURCHASE_DATE TEXT, SPEND DECIMAL(100,2), DEPARTMENT TEXT, MONTH INTEGER, YEAR INTEGER)',
    insertRows
  );
}

function insertRows() {
  console.log('insertRows Ipsum i');
  var stmt = db.prepare('INSERT INTO creditTransactions VALUES (?,?,?,?,?,?)');
  //const trans_data = [];
  db.parallelize(function() {
    fs.createReadStream('./src/data/4711_credit_trans.csv')
      .pipe(csv())
      .on('data', trans => {
        stmt.run([
          trans.HSHD_NUM,
          trans.PURCHASE_,
          trans.SPEND,
          trans.DEPARTMENT,
          trans.MONTH,
          trans.YEAR
        ]);
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
      });
  });
}
