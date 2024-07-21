import { GrEmoji } from "react-icons/gr";
import { RiAttachment2 } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

export default function Footer(props) {
  const [msg, setMsg] = useState("");
  const [newmsg, setNewMsg] = useState("");

  useEffect(() => {
    if (props.ifEdit) {
      setNewMsg(props.editmsg);
    }
  }, [props.ifEdit, props.editmsg]);

  function handleAddChat() {
    fetch("http://localhost:3000/addchat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: props.uid,
        fid: props.fid,
        uname: props.uname,
        fname: props.fname,
        uphone: props.uphone,
        fphone: props.fphone,
        text: msg,
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
        setMsg("");
        console.log("Message Successfully Inserted");
        console.log("Footer.jsx->Data: " + data);
      })
      .catch((err) => {
        alert(err);
        console.log("Footer.jsx->Error: " + err);
      });
  }

  console.log(
    "Footer.jsx: " + props.ifEdit + " props: " + props.editmsg + " msg: " + msg
  );

  return (
    <footer className="h-[10vh] flex items-center justify-between px-3 rounded-bl-xl rounded-br-xl bg-slate-200">
      <GrEmoji className="text-4xl font-light" title="Add Emojies" />
      <RiAttachment2 className="text-4xl font-light" title="Attachments" />
      {props.ifEdit ? (
        <input
          type="text"
          className="w-[80%] h-[80%] rounded-md bg-slate-100 border-none outline-none text-xl px-5"
          placeholder="Enter updated message to send"
          onChange={(e) => setNewMsg(e.target.value)}
          value={newmsg}
        />
      ) : (
        <input
          type="text"
          className="w-[80%] h-[80%] rounded-md bg-slate-100 border-none outline-none text-xl px-5"
          placeholder="Enter message to send"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
      )}
      {props.ifEdit ? (
        <IoSend
          className="text-4xl font-light cursor-pointer"
          title="send"
          onClick={() => {
            props.update(newmsg);
          }}
        />
      ) : (
        <IoSend
          className="text-4xl font-light cursor-pointer"
          title="send"
          onClick={() => {
            handleAddChat();
            props.onChecked();
          }}
        />
      )}
    </footer>
  );
}
