import pg from "pg";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import emailValidator from "email-validator";

const app = express();
const port = 3000;

const db = new pg.Client({
     /* For local rendering */
     // {
     port: 5432,
     host: "localhost",
     user: "postgres",
     database: "whatsappnew",
     password: "tiger",
     // }

     /* For online rendering */
     // connectionString:
     //   "postgresql://whatsappnew_owner:VRd1ZNtIvq0s@ep-yellow-morning-a5v49e60.us-east-2.aws.neon.tech/whatsappnew?sslmode=require",
});

db.connect((err) => {
     if (err) {
          console.error("Connection error", err.stack);
     } else {
          console.log("Connected to the database");
     }
});
// db.connect();

//Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, (req, res) => {
     console.log(`Listening in http://localhost:${port}`);
});

//Table Names
const userTable = "users";
const friendTable = "friends";
const requestTable = "requests";
const chatTable = "chats";
const dailyTable = "daily";

//Create Tables
app.get("/", (req, res) => {
     const userQuery = `CREATE TABLE ${userTable}(userid serial primary key,username varchar(50),useremail varchar(100) unique,userphone char(10) unique,userpassword varchar(50));`;
     db.query(userQuery, (err, result) => {
          if (err) {
               console.error(err.message);
          } else {
               console.log("User Table Created Successfully");
          }
     });

     const frendQuery = `CREATE TABLE ${friendTable}(fid serial primary key,userid integer,username varchar(50),userphone varchar(10),friendname varchar(50),friendphone varchar(10),status varchar(1) DEFAULT 1,pin boolean DEFAULT false);`;
     db.query(frendQuery, (err, result) => {
          if (err) {
               console.error(err.message);
          } else {
               console.log("Friend Table Created Successfully");
          }
     });

     const requestQuery = `CREATE TABLE ${requestTable}(rid serial primary key,fromname varchar(50),fromphone varchar(10),toname varchar(50),tophone varchar(10));`;
     db.query(requestQuery, (err, result) => {
          if (err) {
               console.error(err.message);
          } else {
               console.log("Request Table Created Successfully");
          }
     });

     const chatQuery = `CREATE TABLE ${chatTable}(id serial primary key,uid integer,fid integer,fromphone varchar(10),tophone varchar(10),message text,hours varchar(2),minutes varchar(2),seconds varchar(2));`;
     db.query(chatQuery, (err, result) => {
          if (err) {
               console.error(err.message);
          } else {
               console.log("Chat Table Created Successfully");
          }
     });

     const dailyLogin = `CREATE TABLE ${dailyTable}(id serial primary key,uphone varchar(10),fphone varchar(10), date varchar(2),month varchar(20),year varchar(10),chatted boolean DEFAULT false);`;
     db.query(dailyLogin, (err, result) => {
          if (err) {
               console.error(err.message);
          } else {
               console.log("Daily Login Table Created Successfully");
          }
     });

     res.send({ messasge: "Tables Created Successfully" });
});

//Register User
app.post("/register", (req, res) => {
     const { useremail, userphone, userpassword, username } = req.body;
     console.log(useremail, userphone, userpassword, username);
     if (!emailValidator.validate(useremail)) {
          return res
               .status(300)
               .send({ message: "Invalid email address", type: "warn" });
     }
     if (userphone.length != 10) {
          return res
               .status(404)
               .send({ message: "Enter 10 digit Phone Number", type: "warn" });
     }
     const checkReg = `SELECT * FROM ${userTable} where useremail = $1 and userphone = $2;`;
     db.query(checkReg, [useremail, userphone], (err, response) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else if (response.rows.length > 0) {
               return res.status(303).send({
                    message: `Both email and phone number are already registered. Please Login or register with other details`,
                    type: "info",
               });
          } else if (response.rows.length === 0) {
               const mailCheck = `SELECT * FROM ${userTable} where useremail = $1;`;
               db.query(mailCheck, [useremail], (error, result) => {
                    if (error) {
                         console.error(error.message);
                         return res
                              .status(500)
                              .send({ message: error.message });
                    } else if (result.rows.length > 0) {
                         return res.status(303).send({
                              message: `Email is already Registered, Please Login or register with other details`,
                              type: "info",
                         });
                    } else {
                         const phoneCheck = `SELECT * FROM ${userTable} where userphone = $1;`;
                         db.query(phoneCheck, [userphone], (error, result) => {
                              if (error) {
                                   console.error(error.message);
                                   return res
                                        .status(500)
                                        .send({ message: error.message });
                              } else if (result.rows.length > 0) {
                                   return res.status(303).send({
                                        message: `Phone number is already Registered, Please Login or register with other details`,
                                        type: "info",
                                   });
                              } else {
                                   if (userphone.length !== 10) {
                                        return res.status(404).send({
                                             message: "Enter 10 digit Phone Number",
                                             type: "warn",
                                        });
                                   }
                                   const regQuery = `INSERT INTO ${userTable} (username,useremail,userphone,userpassword) VALUES ($4,$1,$2,$3) RETURNING *;`;
                                   db.query(
                                        regQuery,
                                        [
                                             useremail,
                                             userphone,
                                             userpassword,
                                             username,
                                        ],
                                        (error, result) => {
                                             if (error) {
                                                  console.error(error.message);
                                                  return res.status(500).send({
                                                       message: error.message,
                                                  });
                                             } else {
                                                  return res
                                                       .status(201)
                                                       .send(result.rows[0]);
                                             }
                                        }
                                   );
                              }
                         });
                    }
               });
          }
     });
});

//Login User
app.post("/login", (req, res) => {
     const { userphone, userpassword } = req.body;
     const checkLog = `SELECT * FROM ${userTable} where userphone = $1;`;
     db.query(checkLog, [userphone], (err, response) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else if (userphone.length !== 10) {
               return res
                    .status(404)
                    .send({ message: "Invalid Phone Number", type: "warn" });
          } else if (response.rows.length === 0) {
               return res.status(404).send({
                    message: `Not an Existing User, Please register`,
                    type: "info",
               });
          } else if (response.rows.length > 0) {
               const { userpassword: hashedPassword } = response.rows[0];
               if (userpassword === hashedPassword) {
                    return res.status(201).send(response.rows[0]);
               } else {
                    return res
                         .status(404)
                         .send({ message: "Incorrect Password", type: "warn" });
               }
          }
     });
});
//Sending OPT for new user
app.post("/send-email-register", (req, res) => {
     const { to, subject, text, phone } = req.body;
     console.log(to, subject, text, phone);

     const checkEmail = `SELECT * FROM ${userTable} where useremail=$1;`;
     db.query(checkEmail, [to], (err, result) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else if (result.rows.length > 0) {
               return res.status(303).send({
                    message: "Email already registered",
                    type: "warn",
               });
          }
     });

     if (phone.length != 10) {
          return res
               .status(404)
               .send({ message: "Enter 10 digit Phone Number", type: "warn" });
     }
     if (!emailValidator.validate(to)) {
          return res
               .status(404)
               .send({ message: "Invalid email address", type: "warn" });
     }
     const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
               user: "dnreply20@gmail.com",
               pass: "xtsl hxuz nulc doiv",
          },
     });
     const mailOptions = {
          from: "dnreply20@gmail.com",
          to: to,
          subject: subject,
          text:
               "Follow These steps to change your password\n" +
               "1) Enter this OTP: " +
               text +
               "\n" +
               "2) Click on Verify OTP\n",
     };
     transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
               console.error(error);
               return res.status(500).send({ message: error.message });
          } else {
               return res
                    .status(201)
                    .send({ message: "Email sent successfully" });
          }
     });
});

//Sending OTP for existing user
app.post("/send-email", (req, res) => {
     const { to, subject, text } = req.body;
     const query = `SELECT * FROM ${userTable} WHERE useremail=$1;`;
     console.log(to, subject, text);

     if (!emailValidator.validate(to)) {
          return res
               .status(404)
               .send({ message: "Invalid email address", type: "warn" });
     }

     db.query(query, [to], (err, result) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else if (result.rows.length > 0) {
               const transporter = nodemailer.createTransport({
                    service: "Gmail",
                    auth: {
                         user: "dnreply20@gmail.com",
                         pass: "xtsl hxuz nulc doiv",
                    },
               });
               const mailOptions = {
                    from: "dnreply20@gmail.com",
                    to: to,
                    subject: subject,
                    text:
                         "Follow These steps to change your password\n" +
                         "1) Enter this OTP: " +
                         text +
                         "\n" +
                         "2) Click on Verify OTP\n",
               };
               transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                         console.error(error);
                         return res
                              .status(500)
                              .send({ message: error.message });
                    } else {
                         return res
                              .status(201)
                              .send({ message: "Email sent successfully" });
                    }
               });
          } else {
               console.log("No User with this email ID");
               res.status(404).send({
                    message: "No User with this email ID",
                    type: "warn",
               });
          }
     });
});

//Changing Passwords
app.post("/changepassword", (req, res) => {
     const { useremail, password } = req.body;
     const changeQuery = `UPDATE ${userTable} SET userpassword=$2 where useremail=$1 RETURNING *;`;
     db.query(changeQuery, [useremail, password], (err, result) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else {
               console.log("Password Changed successfully");
               return res.status(201).send(result.rows[0]);
          }
     });
});

//Check Friend
app.post("/checkfriend", (req, res) => {
     const { userphone, friendphone } = req.body;
     if (userphone === friendphone) {
          return res.status(500).send({
               message: "Friend Number is same as Your Number",
               type: "warn",
          });
     }
     const checkFriendQuery = `SELECT * FROM ${userTable} where userphone=$1;`;
     db.query(checkFriendQuery, [userphone], (err, result) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else if (result.rows.length === 0) {
               return res.status(404).send({
                    message: "Sorry, Your friend don't have an account to start a conversation",
                    type: "info",
               });
          } else {
               const alreadyFriend = `SELECT * FROM ${friendTable} where userphone=$1 and friendphone=$2;`;
               db.query(
                    alreadyFriend,
                    [userphone, friendphone],
                    (error, response) => {
                         if (error) {
                              console.error(error.message);
                              return res
                                   .status(500)
                                   .send({ message: error.message });
                         } else if (response.rows.length === 0) {
                              return res.status(201).send(result.rows[0]);
                         } else {
                              return res.status(303).send({
                                   message: "Another friend had the same number",
                                   type: "info",
                              });
                         }
                    }
               );
          }
     });
});

//Add Friend
app.post("/addfriend", (req, res) => {
     const { uid, uname, uphone, fname, fphone } = req.body;
     const checkQuery = `SELECT * FROM ${friendTable} where userphone=$1 and friendphone=$2;`;
     db.query(checkQuery, [uphone, fphone], (error, response) => {
          if (error) {
               console.error(error.message);
               return res.status(500).send({ message: error.message });
          } else if (response.rows.length > 0) {
               console.log("Friend Already Exists");
               return res
                    .status(404)
                    .send({ message: "Friend Already Exists", type: "info" });
          } else {
               const addQuery = `INSERT INTO ${friendTable} (userid,username,userphone,friendname,friendphone) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;
               db.query(
                    addQuery,
                    [uid, uname, uphone, fname, fphone],
                    (err, result) => {
                         if (err) {
                              console.error(err.message);
                              return res
                                   .status(500)
                                   .send({ message: err.message });
                         } else {
                              return res.status(201).send(result.rows[0]);
                         }
                    }
               );
          }
     });
});

//Request Friend
app.post("/requestfriend", (req, res) => {
     const { fromname, fromphone, toname, tophone } = req.body;
     const checkQuery = `SELECT * FROM ${requestTable} where fromphone=$1 and tophone=$2;`;
     db.query(checkQuery, [fromphone, tophone], (error, response) => {
          if (error) {
               return res.status(500).send({ message: err.message });
          } else if (response.rows.length > 0) {
               console.log("Friend Request already sent");
               return res.status(404).send({
                    message: "Friend Request already sent",
                    type: "info",
               });
          } else {
               const requestQuery = `INSERT INTO ${requestTable} (fromname,fromphone,toname,tophone) VALUES ($1,$2,$3,$4) RETURNING *;`;
               db.query(
                    requestQuery,
                    [fromname, fromphone, toname, tophone],
                    (err, result) => {
                         if (err) {
                              console.error(err.message);
                              return res
                                   .status(500)
                                   .send({ message: err.message });
                         } else {
                              console.log("Friend Request sent successfully");
                              return res.status(201).send(result.rows[0]);
                         }
                    }
               );
          }
     });
});

//Check Request
app.post("/checkrequest", (req, res) => {
     const { phone } = req.body;
     const checkRequestQuery = `SELECT * FROM ${requestTable} WHERE tophone=$1;`;
     db.query(checkRequestQuery, [phone], (err, result) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else if (result.rows.length === 0) {
               console.log("No Friend Request found");
               return res
                    .status(404)
                    .send({ message: "No Friend Request found" });
          } else {
               console.log("Friend Request found" + result.rows);
               return res.status(201).send(result.rows);
          }
     });
});

//Accept Friend Request
app.post("/acceptreq", (req, res) => {
     const { uid, username, userphone, friendname, friendphone, status } =
          req.body;

     const acceptreq = `INSERT INTO ${friendTable} (userid, username, userphone,friendname, friendphone, status) VALUES($1,$2,$3,$4,$5,$6) RETURNING *;`;
     db.query(
          acceptreq,
          [uid, username, userphone, friendname, friendphone, status],
          (err, result) => {
               if (err) {
                    console.error(err.message);
                    return res.status(500).send({ message: err.message });
               } else {
                    console.log("Friend Request Accepted successfully");
                    return res.status(201).send(result.rows[0]);
               }
          }
     );
});

//Remove Request
app.post("/removereq", (req, res) => {
     const { rid } = req.body;
     const removeQuery = `DELETE from ${requestTable} WHERE rid=$1;`;
     db.query(removeQuery, [rid], (err, result) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else {
               console.log("Request deleted successfully");
               return res
                    .status(201)
                    .send({ message: "Request deleted successfully" });
          }
     });
});

//Update Request
app.post("/updatereq", (req, res) => {
     const { userphone, friendphone } = req.body;
     const updateQuery = `UPDATE ${friendTable} SET status='2' WHERE userphone=$1 AND friendphone=$2 RETURNING *;`;
     db.query(updateQuery, [userphone, friendphone], (err, result) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else {
               console.log("Request updated successfully");
               return res
                    .status(201)
                    .send({ message: "Request updated successfully" });
          }
     });
});

//Change Request
app.post("/changereq", (req, res) => {
     const { userphone, friendphone } = req.body;
     const updateQuery = `UPDATE ${friendTable} SET status='0' WHERE userphone=$1 AND friendphone=$2 RETURNING *;`;
     db.query(updateQuery, [userphone, friendphone], (err, result) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else {
               console.log("Request updated successfully");
               return res
                    .status(201)
                    .send({ message: "Request changed successfully" });
          }
     });
});

//Get Friends of respective user
app.post("/getfriends", (req, res) => {
     const { uid } = req.body;
     const getFriendsQuery = `SELECT * FROM ${friendTable} WHERE userid=$1 order by pin desc;`;
     db.query(getFriendsQuery, [uid], (err, result) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else {
               console.log("Friends fetched successfully");
               return res.status(201).send(result.rows);
          }
     });
});

//Change Pin
app.post("/changepin", (req, res) => {
     const { fid, uid } = req.body;
     const pinQuery = `UPDATE ${friendTable} SET pin=NOT pin WHERE fid=$1 and userid=$2 RETURNING *;`;
     db.query(pinQuery, [fid, uid], (err, result) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else {
               console.log("Pin changed successfully");
               return res.status(201).send(result.rows[0]);
          }
     });
});

//Delete Friend
app.delete("/deletefriend_chat", (req, res) => {
     const { phone1, phone2, uid, fid, status } = req.body;
     if (status !== "2") {
          const deleteQuery = `DELETE FROM ${friendTable} WHERE fid=$1 and userid=$2 RETURNING *;`;
          db.query(deleteQuery, [fid, uid], (err, result) => {
               if (err) {
                    console.error(err.message);
                    return res.status(500).send({ message: err.message });
               } else {
                    console.log("Deleted friend and chats successfully");
                    return res.status(201).send({ message: "DELETION DONE" });
               }
          });
     } else if (status === "2") {
          const deletechatQuery = `DELETE FROM ${chatTable} WHERE (fromphone=$1 and tophone=$2) or (fromphone=$2 and tophone=$1);`;
          db.query(deletechatQuery, [phone1, phone2], (err, result) => {
               if (err) {
                    console.error(err.message);
                    return res
                         .status(500)
                         .send({ message: "Error in Deleting Chat" });
               } else {
                    const check = `SELECT * FROM ${friendTable} where fid=$1 and userid=$2;`;
                    db.query(check, [fid, uid], (err, response) => {
                         if (err) {
                              console.error(err.message);
                              return res
                                   .status(500)
                                   .send({ message: err.message });
                         } else if (response.rows === 0) {
                              console.log("Friend not found");
                              return res
                                   .status(201)
                                   .send({ message: "NO DATA" });
                         }
                    });
                    const deleteQuery = `DELETE FROM ${friendTable} WHERE fid=$1 and userid=$2 RETURNING *;`;
                    db.query(deleteQuery, [fid, uid], (err, review) => {
                         if (err) {
                              console.error(err.message);
                              return res
                                   .status(500)
                                   .send({ message: err.message });
                         } else {
                              const updateQuery = `UPDATE ${friendTable} SET status='3' WHERE userphone=$2 AND friendphone=$1 RETURNING *;`;
                              db.query(
                                   updateQuery,
                                   [phone1, phone2],
                                   (error, resp) => {
                                        if (error) {
                                             console.error(error.message);
                                             return res.status(500).send({
                                                  message: error.message,
                                             });
                                        } else {
                                             console.log(
                                                  "Request updated successfully"
                                             );
                                             return res.status(201).send({
                                                  message: "DELETION DONE",
                                             });
                                        }
                                   }
                              );
                         }
                    });
               }
          });
     }
});

//Send Messages
app.post("/sendmsg", (req, res) => {
     const { uid, fid, fromphone, tophone, message, hours, minutes, seconds } =
          req.body;
     const sendMsgQuery = `INSERT INTO ${chatTable} (uid,fid,fromphone, tophone, message,hours,minutes,seconds) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;`;
     db.query(
          sendMsgQuery,
          [uid, fid, fromphone, tophone, message, hours, minutes, seconds],
          (err, result) => {
               if (err) {
                    console.error(err.message);
                    return res.status(500).send({ message: err.message });
               } else {
                    console.log("Message sent successfully");
                    return res.status(201).send(result.rows[0]);
               }
          }
     );
});

//Get Messages
app.post("/getchats", (req, res) => {
     const { phone1, phone2 } = req.body;
     const recMsgQuery = `SELECT * FROM ${chatTable} WHERE (fromphone=$1 and tophone=$2) or (fromphone=$2 and tophone=$1) order by id;`;
     db.query(recMsgQuery, [phone1, phone2], (err, result) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else {
               console.log("Get Message successfully");
               return res.status(201).send(result.rows);
          }
     });
});

//Rename User
app.post("/rename", (req, res) => {
     const { uid, fid, value } = req.body;
     const renameQuery = `UPDATE ${friendTable} SET friendname=$3 where userid=$1 and fid=$2 RETURNING *;`;
     db.query(renameQuery, [uid, fid, value], (err, result) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else {
               console.log("Friend renamed successfully");
               return res.status(201).json(result.rows[0]);
          }
     });
});

//Delete Chat
app.delete("/deletechat", (req, res) => {
     const { id, fromphone, tophone } = req.body;
     const deleteQuery = `DELETE FROM ${chatTable} where id=$1 and fromphone=$2 and tophone=$3;`;
     db.query(deleteQuery, [id, fromphone, tophone], (err, result) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else {
               console.log("Chat deleted successfully");
               return res.status(201).send({ message: "Friend Deleted" });
          }
     });
});

//Edit Chat
app.post("/editmsg", (req, res) => {
     const { id, fromphone, tophone, message } = req.body;
     const updatechatQuery = `UPDATE ${chatTable} SET message=$4 where id=$1 and fromphone=$2 and tophone=$3;`;
     db.query(
          updatechatQuery,
          [id, fromphone, tophone, message],
          (err, result) => {
               if (err) {
                    console.error(err.message);
                    return res.status(500).send({ message: err.message });
               } else {
                    console.log("Update chat successful");
                    return res.status(201).json({ message: "Updated chat" });
               }
          }
     );
});

//Update user name
app.post("/nameupdate", (req, res) => {
     const { id, name } = req.body;
     const nameQuery = `UPDATE ${userTable} SET username=$2 where userid=$1;`;
     db.query(nameQuery, [id, name], (err, result) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else {
               console.log("User name updated successfully");
               return res.status(201).json({ message: "Updated chat" });
          }
     });
});

//Update user wmail
app.post("/emailupdate", (req, res) => {
     const { id, email } = req.body;

     const checkEmail = `SELECT * FROM "${userTable}" WHERE useremail=$1;`;
     db.query(checkEmail, [email], (err, result) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else if (result.rowCount > 0) {
               return res.status(400).send({ message: "Email already exists" });
          } else {
               const emailQuery = `UPDATE "${userTable}" SET useremail=$2 WHERE userid=$1;`;
               db.query(emailQuery, [id, email], (error, response) => {
                    if (error) {
                         console.error(error.message);
                         return res
                              .status(500)
                              .send({ message: error.message });
                    } else {
                         console.log("User email updated successfully");
                         return res
                              .status(201)
                              .json({ message: "Updated email" });
                    }
               });
          }
     });
});

//Update user password
app.post("/passupdate", (req, res) => {
     const { id, pass } = req.body;
     const passQuery = `UPDATE ${userTable} SET userpassword=$2 where userid=$1;`;
     db.query(passQuery, [id, pass], (err, result) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else {
               console.log("User password updated successfully");
               return res.status(201).json({ message: "Updated chat" });
          }
     });
});

//Get user
app.post("/getuser", (req, res) => {
     const { uid } = req.body;
     const getQuery = `SELECT * FROM ${userTable} where userid=$1;`;
     db.query(getQuery, [uid], (err, result) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else {
               console.log("User retrieved successfully");
               return res.status(201).send(result.rows[0]);
          }
     });
});

//set daily
app.post("/setdaily", (req, res) => {
     const { uphone, fphone } = req.body;
     const day = new Date();
     const date = day.getDate();
     const month = day.getMonth();
     const year = day.getFullYear();
     const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
     ];
     const monthName = months[month];
     const checkDaily = `SELECT * FROM ${dailyTable} where ((uphone=$1 and fphone=$2) or (uphone=$2 and fphone=$1)) and date=$3 and month=$4;`;
     db.query(checkDaily, [uphone, fphone, date, monthName], (err, result) => {
          if (err) {
               return res.status(500).send({ message: "Error checking data" });
          } else {
               if (result.rows.length === 0) {
                    const dailyQuery = `INSERT INTO ${dailyTable} (uphone,fphone,date, month, year) VALUES ($1, $2, $3,$4,$5) RETURNING *`;
                    db.query(
                         dailyQuery,
                         [uphone, fphone, date, monthName, year],
                         (err, result) => {
                              if (err) {
                                   return res.status(500).send({
                                        message: "Error inserting data",
                                   });
                              } else {
                                   return res.status(201).send({
                                        message: "Data inserted successfully",
                                        data: result.rows[0],
                                   });
                              }
                         }
                    );
               } else {
                    return res
                         .status(303)
                         .send({ message: "Data already inserted" });
               }
          }
     });
});

//check daily
app.post("/checkdaily", (req, res) => {
     const {
          uid,
          fid,
          fromphone,
          tophone,
          day,
          month,
          year,
          hours,
          minutes,
          seconds,
     } = req.body;

     const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
     ];
     const monthName = months[month];

     const checkQuery = `
    SELECT chatted FROM ${dailyTable} 
    WHERE ((uphone=$1 AND fphone=$2) OR (uphone=$2 AND fphone=$1))
      AND date=$3 AND month=$4 AND year=$5;
  `;

     db.query(
          checkQuery,
          [fromphone, tophone, day, monthName, year],
          (err, result) => {
               if (err) {
                    console.error(err.message);
                    return res.status(500).send({ message: err.message });
               }
               if (result.rows.length > 0) {
                    if (result.rows[0].chatted === true) {
                         return res.status(201).send(result.rows[0]);
                    } else {
                         const message =
                              "date:" + day + " " + monthName + " " + year;
                         const addChatQuery = `
      INSERT INTO ${chatTable} (uid, fid, fromphone, tophone, message, hours, minutes, seconds)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `;
                         db.query(
                              addChatQuery,
                              [
                                   uid,
                                   fid,
                                   fromphone,
                                   tophone,
                                   message,
                                   hours,
                                   minutes,
                                   seconds,
                              ],
                              (error, response) => {
                                   if (error) {
                                        console.error(error.message);
                                        return res
                                             .status(500)
                                             .send({ message: error.message });
                                   }
                                   const updateDailyQuery = `UPDATE ${dailyTable} SET chatted = true WHERE ((uphone=$1 AND fphone=$2) OR (uphone=$2 AND fphone=$1)) AND date=$3 AND month=$4 AND year=$5;`;
                                   db.query(
                                        updateDailyQuery,
                                        [
                                             fromphone,
                                             tophone,
                                             day,
                                             monthName,
                                             year,
                                        ],
                                        (updateErr, updateRes) => {
                                             if (updateErr) {
                                                  console.error(
                                                       updateErr.message
                                                  );
                                                  return res.status(500).send({
                                                       message: updateErr.message,
                                                  });
                                             }
                                             return res.status(201).send({
                                                  message: "Chat added and daily table updated successfully",
                                             });
                                        }
                                   );
                              }
                         );
                    }
               }
          }
     );
});

app.get("/users", (req, res) => {
     db.query(`SELECT * FROM ${userTable};`, (err, result) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else {
               console.log("Users retrieved successfully" + result.rows);
               return res.status(201).send(result.rows);
          }
     });
});

app.get("/requests", (req, res) => {
     db.query(`SELECT * FROM ${requestTable};`, (err, result) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else {
               console.log("Users retrieved successfully" + result.rows);
               return res.status(201).send(result.rows);
          }
     });
});

app.get("/friends", (req, res) => {
     db.query(`SELECT * FROM ${friendTable};`, (err, result) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else {
               console.log("Users retrieved successfully" + result.rows);
               return res.status(201).send(result.rows);
          }
     });
});

app.get("/chats", (req, res) => {
     db.query(`SELECT * FROM ${chatTable};`, (err, result) => {
          if (err) {
               console.error(err.message);
               return res.status(500).send({ message: err.message });
          } else {
               console.log("Users retrieved successfully" + result.rows);
               return res.status(201).send(result.rows);
          }
     });
});
