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
const requestTable = "requests";
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

  const friendsQuery = `CREATE TABLE ${frendTable}(id serial primary key,uid integer,username varchar(50),userphone varchar(10),friendname varchar(50),friendphone varchar(10),pin boolean DEFAULT false);`;
  db.query(friendsQuery, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Friends table created successfully");
    }
  });

  const requestQuery = `CREATE TABLE ${requestTable}(id serial primary key,fromname varchar(50),fromphone varchar(10),toname varchar(50),tophone varchar(10));`;
  db.query(requestQuery, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Requests table created successfully");
    }
  });

  const chatQuery = `CREATE TABLE ${chatTable}(id serial primary key,uid integer,fid integer,username varchar(100),userphone varchar(10),friendname varchar(100),friendphone varchar(10),text varchar(200));`;
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
  console.log("Registering User");
  const subregQuery = `SELECT * FROM ${userTable} where name = $1;`;
  db.query(subregQuery, [name], (error, response) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    } else if (response.rows.length > 0) {
      // console.log("Username already Exist");
      return res.status(303).json({ message: "Username already Exist" });
    } else {
      const regQuery = `INSERT INTO ${userTable} (name,phone,password) VALUES ($1,$2,$3) RETURNING *;`;
      db.query(regQuery, [name, phone, password], (err, result) => {
        if (err) {
          console.log(err.message);
          return res.status(500).json({ message: err.message });
        } else {
          // console.log("User Insertion Completed");
          return res.status(201).json(result.rows[0]);
        }
      });
    }
  });
});

//Login User
app.post("/login", (req, res) => {
  const { phone, password } = req.body;
  console.log("Logining User");
  const logQuery = `SELECT * FROM ${userTable} WHERE phone=$1 and password=$2;`;
  db.query(logQuery, [phone, password], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      if (result.rows.length === 1) {
        // console.log("User exist");
        return res.status(201).send(result.rows[0]);
      } else if (result.rows.length === 0) {
        const sublogQuery = `SELECT * FROM ${userTable} WHERE phone=$1;`;
        db.query(sublogQuery, [phone], (error, response) => {
          if (error) {
            console.log(error.message);
            return res.status(500).send({ message: error.message });
          } else {
            if (response.rows.length > 0) {
              // console.log("Phone number exist");
              // console.log(
              //   "Type correct Password or Create new password using forgot password button"
              // );
              return res.status(303).send({
                message:
                  "Type correct Password or Create new password using forgot password button",
              });
            } else {
              // console.log("User not exist");
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
  console.log("Forgot Password");
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
            // console.log("Password updated successfully");
            return res.status(201).json(response.rows[0]);
          }
        });
      } else {
        return res.status(404).send({ message: "User not exist" });
      }
    }
  });
});

//Checking if User is Exist
app.post("/isuserpresent", (req, res) => {
  const { phone } = req.body;
  console.log("Checking user: " + phone);
  const presentQuery = `SELECT * FROM ${userTable} WHERE phone=$1;`;
  db.query(presentQuery, [phone], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      if (result.rows.length > 0) {
        // console.log("User Exist");
        return res.status(201).send({ message: "User exist" });
      } else {
        // console.log("User not Exist");
        return res.status(404).send({ message: "User not Exist" });
      }
    }
  });
});

//Adding New Friend
app.post("/addfrend", (req, res) => {
  const { uid, username, userphone, name, phone } = req.body;
  console.log("Adding New Friend");
  const addFriendQuery = `INSERT INTO ${frendTable} (uid,username,userphone,friendname,friendphone) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;
  db.query(
    addFriendQuery,
    [uid, username, userphone, name, phone],
    (err, result) => {
      if (err) {
        console.log(err.message);
        return res.status(500).send({ message: err.message });
      } else {
        // console.log("Successfully added new friend");
        return res.status(201).json(result.rows[0]);
      }
    }
  );
});

//Adding Request
app.post("/addrequest", (req, res) => {
  const { fromname, fromphone, toname, tophone } = req.body;
  console.log("Adding Request");
  const requestQuery = `INSERT INTO ${requestTable} (fromname,fromphone,toname,tophone) VALUES ($1,$2,$3,$4) RETURNING *;`;
  db.query(
    requestQuery,
    [fromname, fromphone, toname, tophone],
    (err, result) => {
      if (err) {
        console.log(err.message);
        return res.status(500).send({ message: err.message });
      } else {
        // console.log("Request sent successfully");
        return res.status(201).json(result.rows[0]);
      }
    }
  );
});

//Finding Request
app.post("/findrequest", (req, res) => {
  const { userphone } = req.body;
  const retQuery = `SELECT * FROM ${requestTable} where tophone=$1;`;
  db.query(retQuery, [userphone], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      if (result.rows.length > 0) {
        // console.log("Request found successfully");
        return res.status(201).json(result.rows);
      } else {
        return res.status(404).json({ message: "No Requests" });
      }
    }
  });
});

//Accept Request
app.post("/acceptreq", (req, res) => {
  const { userid, username, userphone, friendname, friendphone } = req.body;
  const acceptQuery = `INSERT INTO ${frendTable} (uid,username,userphone,friendname,friendphone) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;
  db.query(
    acceptQuery,
    [userid, username, userphone, friendname, friendphone],
    (err, result) => {
      if (err) {
        console.log(err.message);
        return res.status(500).send({ message: err.message });
      } else {
        // console.log("Request accepted successfully");
        return res.status(201).json(result.rows);
      }
    }
  );
});

//Delete Request
app.delete("/deletereq", (req, res) => {
  const { username, userphone, friendname, friendphone } = req.body;
  const deleteQuery = `DELETE FROM ${requestTable} WHERE fromname=$1 and fromphone=$2 and toname=$3 and tophone=$4;`;
  db.query(
    deleteQuery,
    [username, userphone, friendname, friendphone],
    (err, result) => {
      if (err) {
        console.log(err.message);
        return res.status(500).send({ message: err.message });
      } else {
        // console.log("Request deleted successfully");
        return res.status(201).json(result.rows);
      }
    }
  );
});

//All Requests Update
app.post("/allrequest", (req, res) => {
  const { userphone } = req.body;
  const retQuery = `SELECT * FROM ${requestTable} where tophone=$1;`;
  db.query(retQuery, [userphone], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      if (result.rows.length > 0) {
        // console.log("Request found successfully");
        return res.status(201).json(result.rows);
      } else {
        return res.status(404).json({ message: "No Requests" });
      }
    }
  });
});
//Get Friends List
app.post("/getFriends", (req, res) => {
  const { uid } = req.body;
  console.log("Getting all Friends of particular " + uid + " user");
  const getFriendsQuery = `SELECT * FROM ${frendTable} WHERE uid=$1;`;
  db.query(getFriendsQuery, [uid], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      // console.log("Friends list fetched successfully");
      return res.status(201).json(result.rows);
    }
  });
});

//Get Friend Chat
app.post("/renderfriendchat", (req, res) => {
  const { uphone, fphone } = req.body;
  console.log("Rendering Friend Chat");
  const renderQuery = `SELECT * FROM ${chatTable} WHERE (userphone=$2 and friendphone=$1) order by id asc;`;
  db.query(renderQuery, [uphone, fphone], (err, response) => {
    if (err) {
      console.log("renderchatuser: ", err.message);
      return res.status(500).json({ message: err.message });
    } else {
      // console.log("Friends List Data fetched successfully" + response.rows);
      //   console.log("Friends List is: " + response.rows);
      return res.status(201).json(response.rows);
    }
  });
});

//Get User Chat
app.post("/renderuserchat", (req, res) => {
  const { uid, fid } = req.body;
  console.log("Rendering user Chat");
  const renderQuery = `SELECT * FROM ${chatTable} WHERE uid=$1 and fid=$2 order by id asc;`;
  db.query(renderQuery, [uid, fid], (err, response) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ message: err.message });
    } else {
      // console.log("User List Data fetched successfully");
      //   console.log("User List is: " + response.rows);
      return res.status(201).json(response.rows);
    }
  });
});

//Adding Chats
app.post("/addchat", (req, res) => {
  const { uid, fid, uname, uphone, fname, fphone, text } = req.body;
  console.log("Adding Chat");
  const addChatQuery = `INSERT INTO ${chatTable} (uid,fid,username,userphone,friendname,friendphone,text) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;`;
  db.query(
    addChatQuery,
    [uid, fid, uname, uphone, fname, fphone, text],
    (err, result) => {
      if (err) {
        console.log(err.message);
        return res.status(500).send({ message: err.message });
      } else {
        // console.log("Successfully added chats");
        return res.status(201).json(result.rows[0]);
      }
    }
  );
});

//Handling Pins
app.post("/handlepin", (req, res) => {
  const { fid, uid } = req.body;
  console.log("Adding Pin");
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
  console.log("Getting Pin for particular fid and uid");
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
  console.log("Renaming the friend");
  const renameQuery = `UPDATE ${frendTable} SET friendname=$3 where uid=$1 and id=$2 RETURNING *;`;
  db.query(renameQuery, [uid, fid, value], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      // console.log("Friend renamed successfully");
      return res.status(201).json(result.rows[0]);
    }
  });
});

//Delete Friend
app.delete("/deletefriend", (req, res) => {
  const { uid, fid } = req.body;
  console.log("Deleting the friend");
  const deleteQuery = `DELETE FROM ${frendTable} where uid=$1 and id=$2;`;
  db.query(deleteQuery, [uid, fid], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      // console.log("Friend deleted successfully");
      return res.status(201).send({ message: "Friend Deleted" });
    }
  });
});

//Get Particular Chat
app.post("/getchat", (req, res) => {
  const { uid, fid, id } = req.body;
  console.log("Get particular chat ");
  const getchatQuery = `SELECT * from ${chatTable} where uid=$1 and fid=$2 and id=$3;`;
  db.query(getchatQuery, [uid, fid, id], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      // console.log("Get Particular text: " + result.rows[0]);
      return res.status(201).json(result.rows[0]);
    }
  });
});

//Update Particular Chat
app.post("/updatechat", (req, res) => {
  const { uid, fid, id, text } = req.body;
  console.log("Update Particular Chat");
  const updatechatQuery = `UPDATE ${chatTable} SET text=$4 where uid=$1 and fid=$2 and id=$3;`;
  db.query(updatechatQuery, [uid, fid, id, text], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      // console.log("Update chat successful");
      return res.status(201).json({ message: "Updated chat" });
    }
  });
});

//Delete Particular Chat
app.delete("/deletechat", (req, res) => {
  const { id, uid, fid } = req.body;
  console.log("Deleting particular chat");
  const deleteQuery = `DELETE FROM ${chatTable} where id=$1 and uid=$2 and fid=$3;`;
  db.query(deleteQuery, [id, uid, fid], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      // console.log("Chat deleted successfully");
      return res.status(201).send({ message: "Friend Deleted" });
    }
  });
});

//Get All Users
app.get("/users", (req, res) => {
  console.log("Getting all users list");
  db.query(`SELECT * from ${userTable}`, (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      return res.status(201).send(result.rows);
    }
  });
});

//Change User Name
app.post("/userrename", (req, res) => {
  const { id, value } = req.body;
  console.log("User details for rename: " + id + " " + value);
  const userrenameQuery = `UPDATE ${userTable} SET name=$2 where id=$1;`;
  db.query(userrenameQuery, [id, value], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      // console.log("User Name Changed successfully");
      return res.status(201).json({ message: "Updated Username" });
    }
  });
});

//Change User Password
app.post("/userpassrename", (req, res) => {
  const { id, value } = req.body;
  console.log("User details for repass: " + id + " " + value);
  const userpassrenameQuery = `UPDATE ${userTable} SET password=$2 where id=$1;`;
  db.query(userpassrenameQuery, [id, value], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      // console.log("Password Changed successfully");
      return res.status(201).json({ message: "Updated Username" });
    }
  });
});

//Get crnt user details
app.post("/getcrntuser", (req, res) => {
  const { id } = req.body;
  console.log("Details of curnt user", id);
  db.query(`SELECT * from ${userTable} where id=$1;`, [id], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    } else {
      // console.log("Details: ", result.rows[0]);
      return res.status(201).send(result.rows[0]);
    }
  });
});

app.listen(port, (req, res) => {
  console.log(`Listening on http://localhost:${port}`);
});
