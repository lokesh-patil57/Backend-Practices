const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodoverride = require("method-override")

app.use(methodoverride("_method"))
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

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

// home route
app.get("/", (req, res) => {
  let q = "select count(*) from user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    console.log(`Some error in DB`);
  }
});

//Show route
app.get("/user", (req, res) => {
  let q = "SELECT *FROM user"
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      // console.log(result);
      res.render("user.ejs" ,{users})
    });
  } catch (err) {
    console.log(err);
    console.log(`Some error in DB`);
  }
});

// Edit Route
app.get("/user/:id/edit", (req , res )=> {
  let { id } = req.params;
  let q = `SELECT *FROM user WHERE id='${id}'` 
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result);
      let u = result[0]
      res.render("edit.ejs" ,{u})
    });
  } catch (err) {
    console.log(err);
    console.log(`Some error in DB`);
  }
})

//Update Route
app.patch("/user/:id" , (req, res)=>{
  let { id } = req.params;
  let { password : formPass , username : newUsername } = req.body
  let q = `SELECT *FROM user WHERE id='${id}'` 
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result);
      let u = result[0]
      if(formPass != u.password){
        res.send("WRONG Password")
      }
      res.send(u)
    });
  } catch (err) {
    console.log(err);
    console.log(`Some error in DB`);
  }
})

app.listen("8080", () => {
  console.log(`app is listening on port 8080`);
  console.log(`http://localhost:8080`);
});



