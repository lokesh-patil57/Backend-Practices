const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
  secret: "mysuperSecret",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("Error");
  next();
});

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  console.log(req.session.name);
  req.flash("success", "User registered successfully");
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.render("./page.ejs", { name: req.session.name });
});

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
