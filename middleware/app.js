const express = require("express");
const app = express();
const ExpressError = require("./ExpressError")

const checkToken = (req, res , next)=>{
  let {token} = req.query;
  if(token == "giveaccess") {
    next();
  }
  throw new ExpressError(401 , "ACCESS DENIED!")
}

app.use("/api" , (req,res,next)=>{
    let {token} = req.query
    if (token=== "giveaccess") {
        next()
    }
    throw new ExpressError(401,"ACCESS DENIED !!")

})

app.get("/api" , (req,res)=>{
    res.send("Data")
})

app.use((req,res,next) =>{
    console.log(req.method , req.hostname , req.path);
    next()
    
})

app.get("/random", (req, res) => {
  res.send("I am Random");
});

app.get("/", (req, res) => {
  res.send("Hi I am root");
});

app.get("/err" , (req, res)=>{
  abcd=abcd
})

app.get("/admin", (req , res)=>{
  throw new ExpressError(403,"Access to admin is forbidden")
})

app.use((err,req, res, next)=>{
  let { status=500, message="Some Error" } = err
  res.status(status).send(message)
})

app.listen("8080", () => {
  console.log(`app is listening on port 8080`);
  console.log(`http://localhost:8080`);
});
