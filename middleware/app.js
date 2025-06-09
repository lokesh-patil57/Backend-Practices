const express = require("express")
const app = express()

app.listen("8080", () => {
  console.log(`app is listening on port 8080`);
  console.log(`http://localhost:8080`);
});

app.get("/" , (req , res ) =>{
    res.send("Hi I am root")
})