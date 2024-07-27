import { GrEmoji } from "react-icons/gr";
import { RiAttachment2 } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { useState } from "react";

export default function Footer(props) {
  const [msg, setMsg] = useState("");

  function handleMsg() {
    fetch("http://localhost:3000/addChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: props.uid,
        fid: props.fid,
        uname: props.uname,
        uphone: props.uphone,
        fname: props.fname,
        fphone: props.fphone,
        text: msg,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          alert("Error on adding chat");
          throw new Error("Server error");
        }
      })
      .then((data) => {
        console.log("Footer.jsx adding message Data is: ", data);
        props.onChecked();
        setMsg("");
      })
      .catch((err) => {
        console.log("Footer.jsx Error on adding message is: ", err);
      });
  }

  return (
    <footer className="h-[10vh] flex items-center justify-between px-3 rounded-bl-xl rounded-br-xl bg-slate-200">
      <GrEmoji className="text-4xl font-light" title="Add Emojies" />
      <RiAttachment2 className="text-4xl font-light" title="Attachments" />
      <input
        type="text"
        className="w-[80%] h-[80%] rounded-md bg-slate-100 border-none outline-none text-xl px-5"
        placeholder="Enter message to send"
        onChange={(e) => setMsg(e.target.value)}
        value={msg}
      />
      <IoSend
        className="text-4xl font-light cursor-pointer"
        onClick={handleMsg}
        title="send"
      />
    </footer>
  );
}
