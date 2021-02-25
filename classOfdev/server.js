const express = require('express');
const mysql = require('mysql');
const app = express();

const server = app.listen(3000, () => {
  console.log('Start Server : localhost: 3000');
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.get('/about', (req, res) => {
  res.render('about.html');
});
app.get('/', (req, res) => {
  res.render('index.html');
});

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '1111',
  database        : 'nodejs'
});
 
app.get('/db', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
   
    // Use the connection
    connection.query('SELECT * FROM users', function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
   
      // Handle error after the release.
      if (error) throw error;
   
      // Don't use the connection here, it has been returned to the pool.
    });
  });
})