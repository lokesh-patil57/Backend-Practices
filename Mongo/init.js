const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => {
    console.log(`connection successful`);
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
  {
    from: "bhavesh",
    to: "bharadwaj",
    msg: "send me reels",
    created_at: new Date(),
  },
  {
    from: "harsh",
    to: "vedant",
    msg: "Hi where are you!",
    created_at: new Date(),
  },
  {
    from: "vedant",
    to: "lokesh",
    msg: "rass pyayala ye mhanalll mayy!!",
    created_at: new Date(),
  },
  {
    from: "harsh",
    to: "Darshan",
    msg: "Study Hard",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);
