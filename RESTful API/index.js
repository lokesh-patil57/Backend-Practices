const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override")
const ExpressError = require("./ExpressError")


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "luckypatil",
    content: "Hi a MERN stack Developer!",
  },
  {
    id: uuidv4(),
    username: "ganeshpatil",
    content: "Hi a FULL stack Developer!",
  },
  {
    id: uuidv4(),
    username: "sandy",
    content: "Hi a Frontend Developer!",
  },
];


//New Route
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

//Show route
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  console.log(post);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => p.id === id);
  post.content = newContent;
  console.log(post);
  res.redirect("/posts");
});

app.delete("/posts/:id" ,(req , res) =>{
    let { id } = req.params
    posts = posts.filter((P) => id !== P.id)
    res.redirect("/posts")
    
});

//Edit Route
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs" , {post});
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

//Error Route
app.use((err,req, res, next)=>{
  let { status=500, message } = err
  res.status(status).send(message)
})

app.listen(port, () => {
  console.log(`listening on port :${port}`);
  console.log(`Server running on http://localhost:${port}`);
});
