const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express")
const app = express()
const path = require("path")

app.set("view engine" , "ejs")
app.use("views", path.join(_dirname, "/views") )

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
    let q = "select count(*) from user";
      try {
        connection.query(q,(err, result) => {
            if (err) throw err
              console.log(result[0]["count(*)"]);
            res.send("Sucess")
      }); 
    }catch (err) {
      console.log(err);
      console.log(`Some error in DB`);
    }
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