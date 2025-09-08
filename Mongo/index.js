// const express = require("express");
// const chatbotRoutes = require("./routes/chatbot");

// const app = express();
// const mongoose = require("mongoose");
// const path = require("path");
// const Chat = require("./models/chat.js");
// const methodOverride = require("method-override");
// const ExpressError = require("./ExpressError");
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require("dotenv").config();
// console.log("Gemini Key:", process.env.GEMINI_API_KEY ? "✅ Loaded" : "❌ Not Found");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.json());
// app.use("/api", chatbotRoutes); 
// // Now chatbot is available at POST /api/chat

// main()
//   .then(() => {
//     console.log(`connection successful`);
//   })
//   .catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
// }

// function asyncwrap(fn) {
//   return function (req, res, next) {
//     fn(req, res, next).catch((err) => next(err));
//   };
// }

// // new - Show Route
// app.get(
//   "/chats/:id",
//   asyncwrap(async (req, res, next) => {
//     let { id } = req.params;
//     let chat = await Chat.findById(id);
//     if (!chat) {
//       next(new ExpressError(500, "chat not found!"));
//     }
//     res.render("edit.ejs", { chat });
//   })
// );

// //Edit Route
// app.get("/chats/:id/edit", async (req, res) => {
//   try {
//     let { id } = req.params;
//     let chat = await Chat.findById(id);
//     res.render("edit.ejs", { chat });
//   } catch (err) {
//     next(err);
//   }
// });

// // Show route
// app.get("/chats/:id/show",asyncwrap( async(req,res)=>{
//     let {id}= req.params
//     let chat = await Chat.findById(id)
//     res.render("show.ejs",{chat})

// }))

// //new route
// app.get("/chats/new", (req, res) => {
//   res.render("newChat.ejs");
// });

// //Destroy Route
// app.delete(
//   "/chats/:id",
//   asyncwrap(async (req, res) => {
//     let { id } = req.params;
//     let deletedChat = await Chat.findByIdAndDelete(id);
//     console.log(deletedChat);
//     res.render("/chats");
//   })
// );

// // Update Route
// app.put(
//   "/chats/:id",
//   asyncwrap(async (req, res) => {
//     let { id } = req.params;
//     let { msg: newmsg } = req.body;
//     let updatedChat = await Chat.findByIdAndUpdate(
//       id,
//       { msg: newmsg },
//       { runValidators: true },
//       { new: true }
//     );
//     console.log(updatedChat);
//     res.redirect("/chats");
//   })
// );

// app.post(
//   "/chats",
//   asyncwrap(async (req, res, next) => {
//     let { from, to, msg } = req.body;
//     let newChat = new Chat({
//       from: from,
//       to: to,
//       msg: msg,
//       created_at: new Date(),
//     });
//     await newChat.save();
//     res.redirect("/chats");
//   })
// );

// app.get(
//   "/chats",
//   asyncwrap(async (req, res) => {
//     let chats = await Chat.find();
//     //   console.log(chats);
//     res.render("index.ejs", { chats });
//   })
// );

// app.get("/", (req, res) => {
//   res.send("working");
// });

// app.use((err, req, res, next) => {
//   console.log(err.name);
//   next(err);
// });

 

// //Error Handling Route
// app.use((err, req, res, next) => {
//   let { status = 500, message = "some error" } = err;
//   res.status(status).send(message);
// });

// app.listen(8080, () => {
//   console.log("app is listening on port 8080");
//   console.log("http://localhost:8080");
// });

// app.post("/api/chatbot", async (req, res) => {
//   try {
//     const { message } = req.body;
//     const result = await model.generateContent(message);
//     const botReply = result.response.text();
//     res.json({ reply: botReply });
//   } catch (error) {
//     console.error("Gemini error:", error);
//     res.status(500).json({ reply: "❌ Sorry, something went wrong!" });
//   }
// });

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError");
require("dotenv").config();

// Mount API routes
const chatbotRoutes = require("./routes/chatbot");

// Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// DB
(async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
    console.log("connection successful");
  } catch (err) {
    console.log(err);
  }
})();

// Helper
function asyncwrap(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}

// Routes (CRUD)
app.get(
  "/chats/:id",
  asyncwrap(async (req, res) => {
    const { id } = req.params;
    const chat = await Chat.findById(id);
    if (!chat) throw new ExpressError(404, "chat not found!");
    res.render("edit.ejs", { chat });
  })
);

app.get(
  "/chats/:id/edit",
  asyncwrap(async (req, res) => {
    const { id } = req.params;
    const chat = await Chat.findById(id);
    if (!chat) throw new ExpressError(404, "chat not found!");
    res.render("edit.ejs", { chat });
  })
);

app.get(
  "/chats/:id/show",
  asyncwrap(async (req, res) => {
    const { id } = req.params;
    const chat = await Chat.findById(id);
    if (!chat) throw new ExpressError(404, "chat not found!");
    res.render("show.ejs", { chat });
  })
);

app.get("/chats/new", (req, res) => {
  res.render("newChat.ejs");
});

app.delete(
  "/chats/:id",
  asyncwrap(async (req, res) => {
    const { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats"); // fixed from res.render("/chats")
  })
);

app.put(
  "/chats/:id",
  asyncwrap(async (req, res) => {
    const { id } = req.params;
    const { msg: newmsg } = req.body;
    await Chat.findByIdAndUpdate(
      id,
      { msg: newmsg },
      { runValidators: true, new: true } // merged options correctly
    );
    res.redirect("/chats");
  })
);

app.post(
  "/chats",
  asyncwrap(async (req, res) => {
    const { from, to, msg } = req.body;
    const newChat = new Chat({
      from,
      to,
      msg,
      created_at: new Date(),
    });
    await newChat.save();
    res.redirect("/chats");
  })
);

app.get(
  "/chats",
  asyncwrap(async (req, res) => {
    const chats = await Chat.find();
    res.render("index.ejs", { chats });
  })
);

// API (Gemini) under /api
app.use("/api", chatbotRoutes);

app.get("/", (_req, res) => {
  res.send("working");
});

// Error handler
app.use((err, _req, res, _next) => {
  console.log(err.name);
  const { status = 500, message = "some error" } = err;
  res.status(status).send(message);
});

// Server
app.listen(8080, () => {
  console.log("app is listening on port 8080");
  console.log("http://localhost:8080");
});
