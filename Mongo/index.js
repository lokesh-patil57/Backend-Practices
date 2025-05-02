const express = require("express")
const app = express()

app.get("/" ,(req , res)=>{
    res.send("working")
})

app.listen(8080 ,()=>{
    console.log("app is listening on port 8080");
    console.log("http://localhost:8080");
    
})