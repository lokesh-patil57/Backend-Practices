const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'test',
    password : 'Lok22rk+'
})

try {
    connection.query("SHOW TABLES", (err, result ) =>{
            if (err) throw err
            console.log(result);
            
    })
} catch (err) {
    console.log(err);
    
}


let getRandomUser = () => {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

