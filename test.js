var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'root',
  database        : 'multi_company',
  port            : 3307
});

console.log(pool);

pool.query('SELECT current_time as x', function (error, results, fields) {
  //if (error) throw error;
  console.log('The solution is: ', results[0]?.x);
});
