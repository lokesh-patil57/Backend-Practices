const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

app.use(express.urlencoded({ extended: true }));

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

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  console.log(post);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newCont = req.body.content;

  // Check if content is present in the request body
  if (!newCont) {
    return res.status(400).send({ error: "Content is required!" });
  }

  // Find the post by ID
  let post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).send({ error: "Post not found!" });
  }

  // Update content and log the updated post
  post.content = newCont;
  console.log(post);
  res.send("Post updated successfully!");
});

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

app.listen(port, () => {
  console.log(`listening on port :${port}`);
  console.log(`Server running on http://localhost:${port}`);
});
