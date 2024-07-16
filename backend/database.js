import express from "express";
import pg from "pg";

const app = express();

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  password: "tiger",
  port: 5432,
});

db.connect();

app.get("/", (req, res) => {
  db.query("create database whatsapp", (err, response) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Successfully created database");
    }
  });
});

app.listen(3000, (req, res) => {
  console.log("Listening on port 3000");
});
