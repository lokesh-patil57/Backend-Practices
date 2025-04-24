const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Lok22rk+",
  database: "test",
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

let q = "INSERT INTO user (uid, username, email, password) VALUES ?";
let data = [];

for (let i = 0; i < 100; i++) {
  data.push(getRandomUser());
}

connection.query(q, [data], (err, result) => {
  if (err) {
    console.error("Error inserting data:", err);
  } else {
    console.log("Insert successful:", result);
  }

  connection.end(); // Close inside callback to avoid premature termination
});
