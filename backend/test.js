var sqlite3 = require('sqlite3').verbose();
const csv = require('csv-parser');
const fs = require('fs');

var db;

function createDb() {
  console.log('createDb chain');
  db = new sqlite3.Database('backend_db.sqlite3', createdebitTable);
}

function createdebitTable() {
  console.log('createdebitTable lorem');
  db.run(
    'CREATE TABLE IF NOT EXISTS debitTransactions (HSHD_NUM TEXT, PURCHASE_DATE TEXT, SPEND DECIMAL(100,2), DEPARTMENT TEXT, MONTH INTEGER, YEAR INTEGER)',
    insertRows
  );
}

function insertRows() {
  console.log('insertRows Ipsum i');
  var stmt = db.prepare('INSERT INTO debitTransactions VALUES (?,?,?,?,?,?)');
  //const trans_data = [];
  db.parallelize(function() {
    fs.createReadStream('./src/data/4711_debit_trans.csv')
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

function readAllRows() {
  console.log('readAllRows debitTransactions');
  db.all('SELECT COUNT(*) FROM debitTransactions', function(err, rows) {
    console.log(rows);
    //rows.forEach(function(row) {
    //  console.log(row);
    //});
    closeDb();
  });
}

function closeDb() {
  console.log('closeDb');
  db.close();
}

function runChainExample() {
  createDb();
}

runChainExample();
