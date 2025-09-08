const express = require("express");
const app = express();
const session = require("express-session");

const sessionOptions = {
    secret: "mysuperSecret",
    resave: false,
    saveUninitialized: true,
  }

app.use(session(sessionOptions))

app.get("/register" , (req,res) =>{
    let {name="anonymous"} = req.query
    req.session.name = name
    console.log(req.session.name)
    res.redirect("/hello")
})

app.get("/hello", (req,res)=>{
    res.send(`Hello ${req.session.name}`)
})

app.get("/reqcount", (req, res) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.send(`You sent a Request ${req.session.count} times`);
});

// app.get("/test", (req,res)=>{
//     res.send("test is working")
// })

app.get("/", (req, res) => {
  res.send("I am Root");
});

app.listen(3000, () => {
  console.log("Server is started on port 3000");
  console.log("http://localhost:3000/");
});
