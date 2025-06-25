import pg from "pg";
import express from "express";

const app = express();
const port = 3000;

const db = new pg.Client({
  port: 5432,
  host: "localhost",
  user: "postgres",
  password: "tiger",
});

db.connect();

app.get("/", (req, res) => {
  const dbQuery = `CREATE DATABASE whatsappnew;`;
  db.query(dbQuery, (err, result) => {
    if (err) {
      console.error(err.message);
      res.send(err.message);
    } else {
      console.log("Database created Successfully");
      res.send("Database created successfully");
    }
  });
});

app.listen(port, (req, res) => {
  console.log(`Listening on http://localhost:${port}`);
});
