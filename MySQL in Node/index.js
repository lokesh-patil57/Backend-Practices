const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'test',
    password : 'Lok22rk+'
})

let q = "INSERT INTO user ( id , username, email ,password ) values ?";
let users = [
  [ 1 , "lokesh" , "loki@gmail.com" , "Lok22as++"]
  [ 2 , "bhavesh" , "burda@gmail.com" , "bhavesh729"]
]; 

try {
    connection.query("SHOW TABLES", (err, result ) =>{
            if (err) throw err
            console.log(result);
            console.log(result.length);
            console.log(result[0]);
            console.log(result[1]);
            
    })
} catch (err) {
    console.log(err);
    
}

connection.end();


let getRandomUser = () => {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

