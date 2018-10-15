var sql = require('mysql');

var con = sql.createConnection({
    host : "localhost",
    user : "testing",
    password : "testing"
});

con.connect(function(err) {
    if(err) throw err;
    console.log("Connected!");
})
