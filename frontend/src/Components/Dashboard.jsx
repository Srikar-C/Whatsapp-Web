import { useState } from "react";
import Left from "./Left/Left";
import Default from "./Right/Default";
import { useLocation } from "react-router-dom";
import Chat from "./Right/Chats/Chat";

export default function Dashboard() {
  const [chat, setChat] = useState(<Default />);
  const location = useLocation();
  const { id, name, phone } = location.state || {};

  function handleFrendChat(frendname, frendphone, frendidx) {
    setChat(
      <Chat
        username={name}
        userid={id}
        userphone={phone}
        friendname={frendname}
        friendphone={frendphone}
        friendidx={frendidx}
      />
    );
    console.log("Done");
  }

  return (
    <div className="flex flex-row h-[100vh] bg-[#E7F0DC]">
      <div className="w-[29%]">
        <Left userid={id} username={name} onChecked={handleFrendChat} />
      </div>
      <p className="border-r-2 border-black border-dashed"></p>
      <div className="w-[70%]">{chat}</div>
    </div>
  );
}
