import express from "express";
import pg from "pg";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//database connect
const db = new pg.Client({
  host: "localhost",
  user: "postgres",
  password: "tiger",
  database: "whatsapp",
  port: 5432,
});
db.connect();

//Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//tables
const userTable = "users";
const frendTable = "friends";
const chatTable = "chats";

//tables creation
app.get("/", (req, res) => {
  const userQuery = `create table ${userTable}(id serial primary key,name varchar(50),phone varchar(10) unique,password varchar(50));`;

  db.query(userQuery, (err, response) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Users table created successfully");
    }
  });

  const frendQuery = `CREATE TABLE ${frendTable}(id serial primary key,uid integer references ${userTable}(id),name varchar(50),phone varchar(10));`;

  db.query(frendQuery, (err, response) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Friends table created successfully");
    }
  });

  const chatQuery = `CREATE TABLE ${chatTable}(id serial primary key,uid integer references ${userTable}(id),fid integer references ${frendTable}(id),username varchar(100),friendname varchar(100),text varchar(200));`;

  db.query(chatQuery, (err, response) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Chats table created successfully");
    }
  });
});

//crud operations
//REGISTER AND LOGIN USERS
app.post("/register", (req, res) => {
  const { name, phn, pass } = req.body;
  console.log(`Registering user is ${name}, ${phn}, ${pass}`);

  const regQuery = `INSERT INTO ${userTable} (name,phone,password) VALUES ($1,$2,$3) RETURNING *;`;

  db.query(regQuery, [name, phn, pass], (err, response) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ message: err.message });
    } else {
      console.log("Data inserted successfully in users table");
      return res.status(201).json(response.rows[0]);
    }
  });
});

app.post("/login", (req, res) => {
  const { phn, pass } = req.body;
  console.log(`Login user is ${phn},${pass}`);

  const logQuery = `SELECT * FROM ${userTable} WHERE phone=$1 AND password=$2 order by id asc;`;

  db.query(logQuery, [phn, pass], (err, response) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ message: err.message });
    } else {
      console.log("User exist", response.rows.length);
      return res.status(201).json(response.rows[0]);
    }
  });
});

app.post("/forgot", (req, res) => {
  const { phn, pass } = req.body;
  console.log(`User phone number is ${phn}, want to change password`);

  const forgotQuery = `UPDATE ${userTable} SET password=$2 WHERE phone=$1 RETURNING *;`;

  db.query(forgotQuery, [phn, pass], (err, response) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ message: err.message });
    } else {
      console.log("Password updated successfully");
      return res.status(201).json(response.rows[0]);
    }
  });
});

//GET USERS
app.get("/users", (req, res) => {
  db.query(`SELECT * FROM ${userTable};`, (err, response) => {
    if (err) {
      console.log(err.message);
      return res.send({ message: err.message });
    } else {
      console.log("Users fetched successfully");
      return res.send(response.rows);
    }
  });
});

//ADDING FRIENDS
app.post("/addfrend", (req, res) => {
  const { uid, name, phone } = req.body;
  console.log(`Adding Friend for user ${uid} is ${name},${phone}`);

  const addQuery = `INSERT INTO ${frendTable} (uid,name,phone) VALUES ($1,$2,$3) RETURNING *;`;

  db.query(addQuery, [uid, name, phone], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ message: err.message });
    } else {
      console.log("Frend Inserted successfully");
      return res.status(201).json(result.rows[0]);
    }
  });
});

//GETTING FRIENDS FOR RESPECTIVE USER
app.post("/getFriends", (req, res) => {
  const { userId, value } = req.body;
  console.log(`Getting Friends for user ${userId} and ${value}`);

  if (value == "") {
    const frendQuery = `SELECT * FROM ${frendTable} WHERE uid = $1 order by id asc;`;

    db.query(frendQuery, [userId], (err, result) => {
      if (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
      } else {
        console.log("Fetched user Friends successfully", result.rows);
        return res.status(201).json(result.rows);
      }
    });
  } else {
    const frendQuery = `SELECT * FROM ${frendTable} WHERE uid = $1 and name LIKE $2% order by id asc;`;

    db.query(frendQuery, [userId], (err, result) => {
      if (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
      } else {
        console.log("Fetched user with start Friends successfully");
        return res.status(201).json(result.rows);
      }
    });
  }
});

//ADDING CHATS
app.post("/addChat", (req, res) => {
  const { uid, fid, uname, fname, text } = req.body;
  console.log(`Adding Chat for user ${uid} with friend ${fid}: ${text}`);

  const chatQuery = `INSERT INTO ${chatTable} (uid, fid, username,friendname,text) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;

  db.query(chatQuery, [uid, fid, uname, fname, text], (err, response) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    } else {
      console.log("Chat inserted successfully");
      return res.status(201).json(response.rows[0]);
    }
  });
});

//RENDER USER CHAT
app.post("/renderChat", (req, res) => {
  const { uid, fid } = req.body;
  console.log(`Rendering Data from user ${uid} and friend ${fid} `);

  const renderQuery = `SELECT * FROM ${chatTable} WHERE uid=$1 and fid=$2 order by id asc;`;

  db.query(renderQuery, [uid, fid], (err, response) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ message: err.message });
    } else {
      console.log("Data fetched successfully");
      return res.status(201).json(response.rows);
    }
  });
});

//RENDER FRIEND CHAT
app.post("/renderUserChat", (req, res) => {
  const { uname, fname } = req.body;
  console.log(`Rendering Data from user ${uname}, friend ${fname} `);

  const renderQuery = `SELECT * FROM ${chatTable} WHERE (username=$2 and friendname=$1) order by id asc;`;

  db.query(renderQuery, [uname, fname], (err, response) => {
    if (err) {
      console.log("renderchatuser: ", err.message);
      return res.status(500).json({ message: err.message });
    } else {
      console.log("Data fetched successfully");
      return res.status(200).json(response.rows);
    }
  });
});

//RENAMING FRIEND NAME
app.post("/rename", (req, res) => {
  const { uid, fid, name } = req.body;
  console.log(`Renaming the friend ${fid} of user ${uid} as ${name}`);

  const renameQuery = `UPDATE ${frendTable} SET name=$3 WHERE uid=$1 and id=$2 RETURNING *;`;

  db.query(renameQuery, [uid, fid, name], (err, response) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ message: err.message });
    } else {
      console.log("Friend Renamed successfully");
      return res.status(201).json(response.rows[0]);
    }
  });
});

//UPDATING CHAT
app.post("/updateChat", (req, res) => {
  const { uid, fid, id, text } = req.body;
  console.log(
    `Updating text of id: ${id} of fid: ${fid} of userId: ${uid} as text: ${text}`
  );

  const updateQuery = `UPDATE ${chatTable} SET text=$4 WHERE uid=$1 and fid=$2 and id=$3 RETURNING *;`;

  db.query(updateQuery, [uid, fid, id, text], (err, response) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ message: err.message });
    } else {
      console.log("Chat Updated successfully");
      return res.status(201).json(response.rows[0]);
    }
  });
});

//DELETING THE CHAT
app.post("/deleteChat", (req, res) => {
  const { fid, uid, id } = req.body;
  console.log(`Deleting the id ${id} of fid of uid ${uid}`);

  const deleteQuery = `DELETE FROM ${chatTable} WHERE id=$3 and uid=$2 and fid=$1 RETURNING *;`;

  db.query(deleteQuery, [fid, uid, id], (err, response) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ message: err.message });
    } else {
      console.log("Chat Updated successfully");
      return res.status(201).json(response.rows[0]);
    }
  });
});

//listening
app.listen(port, (req, res) => {
  console.log(`Listening on http://localhost:${port}`);
});
