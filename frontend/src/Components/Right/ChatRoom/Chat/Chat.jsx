import { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { getChats, handleDelete } from "./utils";
import ChatNav from "./../ChatNav/ChatNav";
import ChatType from "./../ChatType/ChatType";
import DisplayChats from "./../ChatDisplay/DisplayChats";

export default function Chat({
  fid,
  uid,
  uname,
  uphone,
  fname,
  fphone,
  status,
  popUp,
}) {
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");
  const [edit, setEdit] = useState(false);
  const [det, setDet] = useState({});
  const [emoji, setEmoji] = useState(false);
  const emojiRef = useRef();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    getChats(uphone, fphone, setChat, setEdit);
  }, [uid, fid]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmoji(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-[100vh] bg-[#F6F1E9] " data-aos="fade-left">
      <ChatNav
        uid={uid}
        uname={uname}
        uphone={uphone}
        fname={fname}
        fphone={fphone}
      />
      <DisplayChats
        chats={chat}
        uid={uid}
        fid={fid}
        uphone={uphone}
        fphone={fphone}
        onChecked={(id, fromphone, tophone) => {
          handleDelete(
            id,
            fromphone,
            tophone,
            popUp,
            getChats,
            uphone,
            fphone,
            setChat,
            setEdit
          );
        }}
        onChange={(id, from, to, message) => {
          setEdit(true);
          setDet({ id: id, from: from, to: to, message: message });
        }}
      />
      <ChatType
        status={status}
        fid={fid}
        uid={uid}
        uphone={uphone}
        fphone={fphone}
        fname={fname}
        msg={msg}
        det={det}
        edit={edit}
        onChecked={() => getChats(uphone, fphone, setChat, setEdit)}
        emoji={emoji}
        setEmoji={setEmoji}
        emojiRef={emojiRef}
      />
    </div>
  );
}
