const express = require("express")
const app = express()

app.use((req,res) =>{
    res.send("I am middleware")
})

app.post("/random" , (req , res )=>{
    res.send("I am Random")
})

app.get("/" , (req , res ) =>{
    res.send("Hi I am root")
})

app.listen("8080", () => {
  console.log(`app is listening on port 8080`);
  console.log(`http://localhost:8080`);
});

