const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log(`I am 1st middleware`);

  next();
});

app.use((req, res , next) => {
  console.log(`I am 2nd middleware`);

  next();
});

app.get("/random", (req, res) => {
  res.send("I am Random");
});

app.get("/", (req, res) => {
  res.send("Hi I am root");
});

app.listen("8080", () => {
  console.log(`app is listening on port 8080`);
  console.log(`http://localhost:8080`);
});
