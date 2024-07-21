import { useEffect, useState } from "react";
import Footer from "../Footer";
import DisplayChats from "../Messages/DisplayChats";
import ChatNav from "./Navigation/ChatNav";

export default function Chat(props) {
  const [friendchat, setFriendChat] = useState([]);
  const [userchat, setUserChat] = useState([]);
  const [ifEdit, setEdit] = useState(false);
  const [editmsg, setEditMsg] = useState("");
  const [chatIds, setchatIds] = useState({});

  useEffect(() => {
    handleUserChat();
    handleFriendChat();
  }, [props.userid, props.friendidx]);

  function handleFriendChat() {
    fetch("http://localhost:3000/renderfriendchat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uphone: props.userphone,
        fphone: props.friendphone,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 500) {
          return Promise.reject("Error");
        }
      })
      .then((data) => {
        setFriendChat(data);
        console.log("Chat.jsx->Friend Data: " + data);
      })
      .catch((err) => {
        alert(err);
        console.log("Chat.jsx->Error: " + err);
      });
  }

  function handleUserChat() {
    fetch("http://localhost:3000/renderuserchat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: props.userid, fid: props.friendidx }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          return Promise.reject("Error");
        }
      })
      .then((data) => {
        console.log("Chat.jsx->User Data: ", data);
        setUserChat(data);
      })
      .catch((err) => {
        console.error("Chat.jsx->Error: ", err);
      });
  }

  function handleEdit(prop_fid, prop_uid, prop_id) {
    fetch("http://localhost:3000/getchat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: prop_uid, fid: prop_fid, id: prop_id }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 500) {
          return Promise.reject("Error");
        }
      })
      .then((data) => {
        console.log("Got Text: " + data.text);
        setEdit(true);
        setEditMsg(data.text);
        setchatIds({ fid: prop_fid, uid: prop_uid, id: prop_id });
      })
      .catch((err) => {
        alert(err);
        console.log("Chat.jsx->Error: " + err);
      });
  }

  function handleMessageThings(updatetext) {
    fetch("http://localhost:3000/updatechat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: chatIds.uid,
        fid: chatIds.fid,
        id: chatIds.id,
        text: updatetext,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 500) {
          return Promise.reject("Error");
        }
      })
      .then((data) => {
        alert("Chat Updated");
        console.log(data);
        setEdit(false);
        setEditMsg("");
        handleFriendChat();
        handleUserChat();
      })
      .catch((err) => {
        alert(err);
        console.log("Chat.jsx->Edit Chat Error: " + err);
      });
  }

  function handleDelete(prop_fid, prop_uid, prop_id) {
    fetch("http://localhost:3000/deletechat", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: prop_id, uid: prop_uid, fid: prop_fid }),
    })
      .then((response) => {
        if (response.status == 201) {
          return response.json();
        } else if (response.status === 500) {
          return Promise.reject("Error");
        }
      })
      .then((data) => {
        alert("Chat Deleted successfully");
        console.log(data);
        handleFriendChat();
        handleUserChat();
      })
      .catch((err) => {
        alert(err);
        console.log("Chat.jsx->Chat delete Error: " + err);
      });
  }

  return (
    <div className="h-[100vh]">
      <ChatNav
        name={props.friendname}
        phone={props.friendphone}
        idx={props.friendidx}
      />
      <DisplayChats
        friendmessages={friendchat}
        usermessages={userchat}
        fid={props.friendidx}
        uid={props.userid}
        fname={props.friendname}
        uname={props.username}
        onedit={handleEdit}
        ondelete={handleDelete}
      />
      <Footer
        uid={props.userid}
        fid={props.friendidx}
        fname={props.friendname}
        uname={props.username}
        uphone={props.userphone}
        fphone={props.friendphone}
        ifEdit={ifEdit}
        editmsg={editmsg}
        onChecked={() => {
          handleUserChat();
          handleFriendChat();
        }}
        update={handleMessageThings}
      />
    </div>
  );
}
