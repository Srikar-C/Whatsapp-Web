import express from "express";
import pg from "pg";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//Database Connection
const db = new pg.Client({
  host: "localhost",
  database: "whatsappweb",
  user: "postgres",
  password: "tiger",
  port: 5432,
});
db.connect();

//Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userTable = "users";
const frendTable = "friends";
const chatTable = "chat";

//Tables Creation
app.get("/", (req, res) => {
  const userQuery = `CREATE TABLE ${userTable}(id serial primary key,name varchar(50),phone varchar(10) unique,password varchar(50));`;
  db.query(userQuery, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Users table created successfully");
    }
  });

  const friendsQuery = `CREATE TABLE ${frendTable}(id serial primary key,uid integer references ${userTable}(id),name varchar(50),phone varchar(10),pin boolean DEFAULT false);`;
  db.query(friendsQuery, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Friends table created successfully");
    }
  });

  const chatQuery = `CREATE TABLE ${chatTable}(id serial primary key,uid integer references ${userTable}(id),fid integer references ${frendTable}(id),username varchar(100),friendname varchar(100),userphone varchar(10),friendphone varchar(10),text varchar(200));`;
  db.query(chatQuery, (err, response) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Chats table created successfully");
    }
  });
});

//Register User
app.post("/register", (req, res) => {
  const { name, phone, password } = req.body;
  const subregQuery = `SELECT * FROM ${userTable} where name = $1;`;
  db.query(subregQuery, [name], (error, response) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    } else if (response.rows.length > 0) {
      console.log("Username already Exist");
      return res.status(303).json({ message: "Username already Exist" });
    } else {
      const regQuery = `INSERT INTO ${userTable} (name,phone,password) VALUES ($1,$2,$3) RETURNING *;`;
      db.query(regQuery, [name, phone, password], (err, result) => {
        if (err) {
          console.log(err.message);
          return res.status(500).json({ message: err.message });
        } else {
          console.log("User Insertion Completed");
          return res.status(201).json(result.rows[0]);
        }
      });
    }
  });
});

//Login User
app.post("/login", (req, res) => {
  const { phone, password } = req.body;
  const logQuery = `SELECT * FROM ${userTable} WHERE phone=$1 and password=$2;`;
  db.query(logQuery, [phone, password], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      if (result.rows.length === 1) {
        console.log("User exist");
        return res.status(201).send(result.rows[0]);
      } else if (result.rows.length === 0) {
        const sublogQuery = `SELECT * FROM ${userTable} WHERE phone=$1;`;
        db.query(sublogQuery, [phone], (error, response) => {
          if (error) {
            console.log(error.message);
            return res.status(500).send({ message: error.message });
          } else {
            if (response.rows.length > 0) {
              console.log("Phone number exist");
              console.log(
                "Type correct Password or Create new password using forgot password button"
              );
              return res.status(303).send({
                message:
                  "Type correct Password or Create new password using forgot password button",
              });
            } else {
              console.log("User not exist");
              return res.status(404).send({ message: "User not exist" });
            }
          }
        });
      }
    }
  });
});

//Forgot Password
app.post("/forgot", (req, res) => {
  const { phone, password } = req.body;
  const forgotQuery = `UPDATE ${userTable} SET password=$2 WHERE phone=$1 RETURNING *;`;
  const checkUser = `SELECT * FROM ${userTable} WHERE phone=$1;`;
  db.query(checkUser, [phone], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      if (result.rows.length === 1) {
        db.query(forgotQuery, [phone, password], (error, response) => {
          if (error) {
            console.log(error.message);
            return res.status(500).send({ message: error.message });
          } else {
            console.log("Password updated successfully");
            return res.status(201).json(response.rows[0]);
          }
        });
      } else {
        return res.status(404).send({ message: "User not exist" });
      }
    }
  });
});

//Adding New Friend
app.post("/addfrend", (req, res) => {
  const { uid, name, phone } = req.body;
  const addFriendQuery = `INSERT INTO ${frendTable} (uid,name,phone) VALUES ($1,$2,$3) RETURNING *;`;
  db.query(addFriendQuery, [uid, name, phone], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      console.log("Successfully added new friend");
      return res.status(201).json(result.rows[0]);
    }
  });
});

//Get Friends List
app.post("/getFriends", (req, res) => {
  const { uid } = req.body;
  const getFriendsQuery = `SELECT * FROM ${frendTable} WHERE uid=$1;`;
  db.query(getFriendsQuery, [uid], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      console.log("Friends list fetched successfully");
      return res.status(201).json(result.rows);
    }
  });
});

//Get Friend Chat
app.post("/renderfriendchat", (req, res) => {
  const { uphone, fphone } = req.body;
  const renderQuery = `SELECT * FROM ${chatTable} WHERE (userphone=$2 and friendphone=$1) order by id asc;`;
  db.query(renderQuery, [uphone, fphone], (err, response) => {
    if (err) {
      console.log("renderchatuser: ", err.message);
      return res.status(500).json({ message: err.message });
    } else {
      console.log("Friends List Data fetched successfully");
      //   console.log("Friends List is: " + response.rows);
      return res.status(201).json(response.rows);
    }
  });
});

//Get User Chat
app.post("/renderuserchat", (req, res) => {
  const { uid, fid } = req.body;
  const renderQuery = `SELECT * FROM ${chatTable} WHERE uid=$1 and fid=$2 order by id asc;`;
  db.query(renderQuery, [uid, fid], (err, response) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ message: err.message });
    } else {
      console.log("User List Data fetched successfully");
      //   console.log("User List is: " + response.rows);
      return res.status(201).json(response.rows);
    }
  });
});

//Adding Chats
app.post("/addchat", (req, res) => {
  const { uid, fid, uname, fname, uphone, fphone, text } = req.body;
  const addChatQuery = `INSERT INTO ${chatTable} (uid,fid,username,friendname,userphone,friendphone,text) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;`;
  db.query(
    addChatQuery,
    [uid, fid, uname, fname, uphone, fphone, text],
    (err, result) => {
      if (err) {
        console.log(err.message);
        return res.status(500).send({ message: err.message });
      } else {
        console.log("Successfully added chats");
        return res.status(201).json(result.rows[0]);
      }
    }
  );
});

//Handling Pins
app.post("/handlepin", (req, res) => {
  const { fid, uid } = req.body;
  console.log("Friend and User Id: " + fid + " " + uid);
  const pinQuery = `UPDATE ${frendTable} SET pin = NOT pin WHERE id = $1 AND uid = $2 RETURNING *;`;
  db.query(pinQuery, [fid, uid], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.rows.length === 0) {
        return res.status(404).send("Friend not found");
      } else {
        res.status(201).json(result.rows[0]);
      }
    }
  });
});

//Get Pins
app.post("/getpin", (req, res) => {
  const { fid, uid } = req.body;
  console.log("Friend and User Id: " + fid + " " + uid);
  const pinQuery = `SELECT * from ${frendTable} WHERE id = $1 AND uid = $2;`;
  db.query(pinQuery, [fid, uid], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.rows.length === 0) {
        return res.status(404).send("Friend not found");
      } else {
        res.status(201).json(result.rows[0]);
      }
    }
  });
});

//Handle Rename
app.post("/rename", (req, res) => {
  const { uid, fid, value } = req.body;
  const renameQuery = `UPDATE ${frendTable} SET name=$3 where uid=$1 and id=$2 RETURNING *;`;
  db.query(renameQuery, [uid, fid, value], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      console.log("Friend renamed successfully");
      return res.status(201).json(result.rows[0]);
    }
  });
});

//Delete Friend
app.delete("/deletefriend", (req, res) => {
  const { uid, fid } = req.body;
  const deleteQuery = `DELETE FROM ${frendTable} where uid=$1 and id=$2;`;
  db.query(deleteQuery, [uid, fid], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      console.log("Friend deleted successfully");
      return res.status(201).send({ message: "Friend Deleted" });
    }
  });
});

//Get Particular Chat
app.post("/getchat", (req, res) => {
  const { uid, fid, id } = req.body;
  console.log("Get particular chat: " + uid + " " + fid + " " + id);
  const getchatQuery = `SELECT * from ${chatTable} where uid=$1 and fid=$2 and id=$3;`;
  db.query(getchatQuery, [uid, fid, id], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      console.log("Get Particular text: " + result.rows[0]);
      return res.status(201).json(result.rows[0]);
    }
  });
});

//Update Particular Chat
app.post("/updatechat", (req, res) => {
  const { uid, fid, id, text } = req.body;
  console.log("Chat details: " + uid + " " + fid + " " + id + " " + text);
  const updatechatQuery = `UPDATE ${chatTable} SET text=$4 where uid=$1 and fid=$2 and id=$3;`;
  db.query(updatechatQuery, [uid, fid, id, text], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      console.log("Update chat successful");
      return res.status(201).json({ message: "Updated chat" });
    }
  });
});

//Delete Particular Chat
app.delete("/deletechat", (req, res) => {
  const { id, uid, fid } = req.body;
  const deleteQuery = `DELETE FROM ${chatTable} where id=$1 and uid=$2 and fid=$3;`;
  db.query(deleteQuery, [id, uid, fid], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      console.log("Chat deleted successfully");
      return res.status(201).send({ message: "Friend Deleted" });
    }
  });
});

//Get All Users
app.get("/users", (req, res) => {
  db.query(`SELECT * from ${userTable}`, (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      return res.status(201).send(result.rows);
    }
  });
});

app.listen(port, (req, res) => {
  console.log(`Listening on http://localhost:${port}`);
});
