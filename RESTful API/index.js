const express = require("express")
const app = express()
const port = 8080
const path = require("path")

app.use(express.urlencoded({extended:true}))

app.set("view engine", "ejs")
app.set("views" , path.join(__dirname ,"views"))

app.use(express.static(path.join(__dirname , "public")))

let posts = [
    {
        username : "luckypatil",
        content : "Hi a MERN stack Developer!"
    },
    {
        username : "ganeshpatil",
        content : "Hi a FULL stack Developer!"
    },
    {
        username : "sandy",
        content : "Hi a Frontend Developer!"
    }
]

app.get("/posts" , (req , res)=>{
    res.render("index.ejs", {posts})
})
app.get("/posts/new", (req , res )=>{
    res.render("new.ejs")
})

app.post("/posts", (req, res)=>{
        let { username , content} = req.body
        posts.push({username , content})
        res.redirect("/posts")
})   

app.listen(port, () => {
    console.log(`listening on port :${port}`);
    console.log(`Server running on http://localhost:${port}`);
    
})