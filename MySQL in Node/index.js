const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express")
const app = express()

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Lok22rk+",
  database: "test",
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};



app.get( "/" , (req , res)=>{
  res.send("welcome to home page")
})

app.listen ("8080" , ()=> {
  console.log(`app is listening on port 8080`);
  console.log(`http://localhost:8080`);
  
  
})

// connection.query(q, [data], (err, result) => {
//   if (err) {
//     console.error("Error inserting data:", err);
//   } else {
//     console.log("Insert successful:", result);
//   }

//   connection.end(); // Close inside callback to avoid premature termination
// });