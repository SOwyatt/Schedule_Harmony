/**
    * Database is called testdb1
    * Table is called employees
*/
var mySQL = require('mysql');

var con = mySQL.createConnection({
    host : "localhost",
    user : "root",
    password : "F9vZ6!7)nF2)Gru",
    database : "testdb1"
});

function objToArray(obj) { // Convert object into an array of the form [[key, value], [key, value]]
    var keys = Object.keys(obj);
    var values = Object.values(obj);
    var objArray = [];
    for(var i = 0; i < keys.length; i++) {
        objArray[i] = [keys[i], values[i]];
    }
    return objArray;
}

function convertToSQLCompData(input) {
    var result = "";

    if(typeof(input) === "object") { // If the value is an obj, stringify it first
        result = "'" + JSON.stringify(input) + "'";
    }
    else if(typeof(input) === "number") { //Set a number to just said number
        result = input;
    }
    else if(typeof(input) === "string") { // Add single quotes around strings
        result = "'" + input + "'";
    }
    else if(typeof(input) === "boolean") { // Convert boolean into 0/1 bitfield
        result = (input) ? 1 : 0;
    }
    else {
        throw "Datatype Error!";
        return "DATATYPE ERROR!"
    }
    return result
}

function updateRow(table, keyParamater, keyValue, obj) {
    //keyParamater should be the keyParamater, keyValue should be the value of such
    //table should be a string with the name of the table to modify
    //obj should be an obj in sql format

    //Convert object into an array of the form [[key, value], [key, value]]
    var objArray = objToArray(obj);

    var sql = "UPDATE " + table + " SET "; //Set base SQL

    for(i = 0; i < objArray.length; i++) {
        sql += "" + objArray[i][0] + "="; //Add "key="

        sql += convertToSQLCompData(objArray[i][1]);

        if(i !== objArray.length - 1) { //Add a comma if it isn't the last piece
            sql += ",";
        }
    }
    sql += " WHERE " + keyParamater + "=" + keyValue + ";";

    con.connect(function(err) {
        if(err) throw err;
        con.query(sql, function(err) { if(err) throw err; } );
    });
}

function newEntry(table, obj) {
    //Convert object into an array of the form [[key, value], [key, value]]
    var objArray = objToArray(obj);

    var sql = "INSERT INTO " + table + "("; //Prepare for keys
    for(var i = 0; i < objArray.length; i++) {
        sql += objArray[i][0];
        if(i !== objArray.length - 1) { // Add a comma if it isnt the last one
            sql += ",";
        }
    }

    sql += ") VALUES ("; //Prepare for values
    for(var i = 0; i < objArray.length; i++) {
        sql += convertToSQLCompData(objectArray[i][1]);
        if(i !== objArray.length - 1) { // Add a comma if it isnt the last one
            sql += ",";
        }
    }

    con.connect(function(err) {
        if(err) throw err;
        con.query(sql, function(err) { if(err) throw err; } );
    })
}


function saveEmployee(e) { //Takes an employee object and saves it to the database
    con.connect(function(err) { //Connect to the database
        if(err) throw err;

        if(fetchEmployee(e.id) !== undefined) { //If the user already exists, update them
            con.query("SET id=" + e.id "name=" + e.name + ", position=" + e.positions + "WHERE id=" + e.id)
        }
        else { // If the user does not currently exist, create them
            con.query("INSERT INTO employees VALUES(" + e.id + "," + e.name + "," + e.positions + ");");
        }
    });
}

function fetchEmployee(id) { //Returns an employee object from SQL Database
    return con.connect(function(err) {
        if(err) throw err;

        //Select the employee
        return con.query("SELECT * FROM employees WHERE id=" + id + ";",
        function(err, results, fields) {
            if(err) throw err;

            return results[0]; //Return results as an object rather than an array with the object
        });
    });
}


module.exports = {
    updateRow : updateRow,
    newEntry : newEntry
};
