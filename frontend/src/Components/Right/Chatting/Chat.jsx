import ChatNav from "../Navigation/ChatNav";
import { useState, useEffect } from "react";
import DisplayText from "./DisplayText";
import Footer from "./Footer";

export default function Chat(props) {
  const [chat, setChat] = useState([]);
  const [userchat, setUserChat] = useState([]);

  function handleChat() {
    fetch("http://localhost:3000/renderChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: props.uId,
        fid: props.fId,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          alert("Error on fetching chat data");
          throw new Error("Server error");
        }
      })
      .then((data) => {
        console.log("Chat.jsx getting Data of userchat is: ", data);
        setChat(data);
      })
      .catch((err) => {
        console.error("Chat.jsx Error on getting data of userchat is: ", err);
      });
  }

  function handleUserChat() {
    fetch("http://localhost:3000/renderUserChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uname: props.username,
        fname: props.friendname,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          alert("Error on fetching chat data");
          throw new Error("Server error");
        }
      })
      .then((data) => {
        console.log("Chat.jsx getting data of friendchat is: ", data);
        setUserChat(data);
      })
      .catch((err) => {
        console.error("Chat.jsx error on getting data of friendchat is: ", err);
      });
  }

  useEffect(() => {
    handleChat();
    handleChats();
    handleDelete();
    handleUserChat();
  }, [props.uId, props.fId]);

  function handleChats(fid, uid, id, text) {
    console.log("Chat to update is: ", text);
    fetch("http://localhost:3000/updateChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: uid,
        fid: fid,
        id: id,
        text: text,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("Chat updated successfully");
          return response.json();
        } else if (response.status === 500) {
          alert("Error on update chat query");
          throw new Error("Server error");
        }
      })
      .then((data) => {
        console.log("Chat.jsx getting data of updated chat", data);
        setChat((prevChat) => {
          return prevChat.map((chat) => {
            if (chat.id === id) {
              return { ...chat, text: text };
            }
            return chat;
          });
        });
      })
      .catch((err) => {
        console.log("Chat.jsx error on getting data of updated chat: " + err);
      });
  }

  function handleDelete(fid, uid, id) {
    fetch("http://localhost:3000/deleteChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: uid,
        fid: fid,
        id: id,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("Chat deleted successfully");
          return response.json();
        } else {
          alert("Error on deleting chat");
          throw new Error("Server error");
        }
      })
      .then((data) => {
        console.log("Chat.jsx getting data of deleted chat: ", dat);
        handleChat();
        handleUserChat();
      })
      .catch((err) => {
        console.log("Chat.jsx Error on getting deleted chat is: ", err);
      });
  }

  return (
    <div className="h-[100vh]">
      <ChatNav name={props.friendname} phone={props.phone} idx={props.fId} />
      <DisplayText
        messages={chat}
        usermessages={userchat}
        fid={props.fId}
        uid={props.uId}
        fname={props.friendname}
        uname={props.username}
        onChecked={handleChats}
        onChange={handleDelete}
      />
      <Footer
        onChecked={handleChat}
        fid={props.fId}
        uid={props.uId}
        fname={props.friendname}
        uname={props.username}
      />
    </div>
  );
}
