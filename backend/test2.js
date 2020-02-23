const csv = require('csv-parser');
const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();

var db;

db = new sqlite3.Database('backend_db.sqlite3', readAllRows);

function readAllRows() {
  console.log('readAllRows debitTransactions');
  db.all(
    'SELECT COUNT(*) FROM debitTransactions WHERE MONTH = (?)',
    [1],
    function(err, rows) {
      console.log(rows);
      //rows.forEach(function(row) {
      //  console.log(row);
      //});
    }
  );
}
