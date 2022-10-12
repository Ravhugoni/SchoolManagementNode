const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
// const mysql = require('mysql');

const app = express();

app.use(cors());
app.use(bodyparser.json());

// default route
// app.get('/', function (req, res) {
//     return res.send({ error: true, message: 'hello' })
// });
// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Danny@2016',
    database: 'schoolmanagement',
    port: 3306
});
 
// connect to database
dbConn.connect(err=>{
    if(err){
        console.log(err, 'Database Erro');
    }
    else{
        console.log('Database Connected');
    }
}); 
// Retrieve all users 
app.get('/users', function (req, res) {

    let qr = "SELECT usersID,  CONCAT(firstName, ' ', middleName, ' ', LastName) as fullName, idNumber, gender, phone, address, email, roleID FROM users";
    
    dbConn.query(qr, function (error, results, fields) {
    if (error) throw error;
        return res.send({results});
    });
});

// Retrieve user with id 
app.get('/getUserByID/:usersID', function (req, res) {
 
    let uID = req.params.usersID;
 
    let myQuery = 'SELECT * FROM users where usersID =' + uID;

    dbConn.query(myQuery,(err, results,)=>{
       if(err) {console.log(err);}

       if(results.length > 0){
            res.send({results})
       }
       else
       {
            res.send({
                message:'Data not found'
            })
       }
    });
});

// Retrieve users by role 
app.get('/usersByRole/:roleID', function (req, res) {

    let rlID = req.params.roleID;
    let qr = 'SELECT * FROM users where roleID ='+  rlID;

    dbConn.query(qr, function (error, results, fields) {
    if (error) throw error;
        return res.send({results});
    });
});

// Retrieve roles 
app.get('/roles', function (req, res) {

    let qr = 'SELECT * FROM roles';

    dbConn.query(qr, function (error, results, fields) {
    if (error) throw error;
        return res.send({results});
    });
});


// Add a new user  
app.post('/addUser', function (req, res) {
 
    let firstName = req.body.firstName;
    let middleName = req.body.middleName;
    let LastName = req.body.LastName;
    let idNumber = req.body.idNumber;
    let gender = req.body.gender;
    let phone = req.body.phone;
    let address = req.body.address;
    let email = req.body.email;
    let roleID = req.body.roleID;

    let qr = 'INSERT INTO users (firstName, middleName, LastName, idNumber, gender, phone, address, email, roleID) ' +
    'VALUES("'+ firstName +'","' + middleName +'","' + LastName +'","' + idNumber+'","' + gender +'","' + phone +'","' + address +'","' + email +'","' + roleID + '")';
 
    dbConn.query(qr,(err, results)=>{
        if(err) {console.log(err);}

       if(results.length > 0){
            res.send({
               message: 'Data sent'
            })
       }
       else
       {
            res.send({
                message:'Data not sent'
            })
       }
    });
});

app.delete('/deleteUser', function (req, res) {
 
    let uID = req.params.usersID;
 
    let myQuery = 'DELETE FROM users where usersID = '+ uID;

    dbConn.query(myQuery,(err, results,)=>{
       if(err) {console.log(err);}

       if(results.length > 0){
            res.send({
                message: 'Data deleted'
            })
       }
       else
       {
            res.send({
                message:'Data not Deleted'
            })
       }
    });
});

app.listen(3000, ()=>{
    console.log('Server running...');
})