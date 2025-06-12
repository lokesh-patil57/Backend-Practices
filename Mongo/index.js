const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log(`connection successful`);
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

//Edit Route
app.get("/chats/:id/edit", async (req, res) => {
  try {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
  } catch (err) {
    next(err);
  }
});

function asyncwrap(fn) {
  return function (req, res, next ) {
    fn(req, res , next).catch((err)=> next(err))
  }
}

//Show route
app.get("/chats/:id/show",asyncwrap( async(req,res)=>{
    let {id}= req.params
    let chat = await Chat.findById(id)
    res.render("show.ejs",{chat}) 
  
}))

//new route
app.get("/chats/new", (req, res) => {
  res.render("newChat.ejs");
});

//Destroy Route
app.delete("/chats/:id", asyncwrap( async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.render("/chats");
}));

// Update Route
app.put("/chats/:id", asyncwrap( async (req, res) => {
    let { id } = req.params;
    let { msg: newmsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
      id,
      { msg: newmsg },
      { runValidators: true },
      { new: true }
    );
    console.log(updatedChat);
    res.redirect("/chats");
}));

app.post("/chats", asyncwrap( async (req, res, next) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
      from: from,
      to: to,
      msg: msg,
      created_at: new Date(),
    });
    await newChat.save();
    res.redirect("/chats");

}));

app.get("/chats", asyncwrap( async (req, res) => {
  let chats = await Chat.find();
  //   console.log(chats);
  res.render("index.ejs", { chats });
}));

app.get("/", (req, res) => {
  res.send("working");
});

app.use((err,req,res,next) =>{
  console.log(err.name);
  next(err)
  
})

//Error Handling Route
app.use((err, req, res, next) => {
  let { status = 500, message } = err;
  res.status(status).send(message);
});

app.listen(8080, () => {
  console.log("app is listening on port 8080");
  console.log("http://localhost:8080");
});
