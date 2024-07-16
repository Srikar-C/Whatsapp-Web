import { useState } from "react";
import Left from "./Left/Left";
import Chat from "./Right/Chatting/Chat";
import Default from "./Right/Default";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const [chat, setChat] = useState(<Default />);
  const location = useLocation();
  const { id, name } = location.state || {};

  function handleFrendChat(username, phone, fidx) {
    setChat(
      <Chat
        username={name}
        uId={id}
        friendname={username}
        fId={fidx}
        phone={phone}
      />
    );
    console.log("Main: ", name + "->" + id + " " + username + "->" + fidx);
  }

  return (
    <div className="flex flex-row h-[100vh] bg-[#E7F0DC] justify-around">
      <div className="w-[29%]">
        <Left onChecked={handleFrendChat} userId={id} name={name} />
      </div>
      <p className="border-r-2 border-black border-dashed"></p>
      <div className="w-[70%]">{chat}</div>
    </div>
  );
}
