import { useEffect, useState } from "react";
import Left from "./Left/Left";
import Default from "./Right/Default";
import { useLocation } from "react-router-dom";
import Chat from "./Right/Chats/Chat";
import Account from "./Right/Account";

export default function Dashboard() {
  const [chat, setChat] = useState(<Default />);
  const location = useLocation();
  const { id, name, phone, password } = location.state || {};
  const [uname, setName] = useState(name);
  const [upass, setPass] = useState(password);

  useEffect(() => {
    handleDetails();
  });

  function handleDetails() {
    fetch("http://localhost:3000/getcrntuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
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
        console.log("Getting Re details of crnt user", data);
        setName(data.name);
        setPass(data.password);
      })
      .catch((err) => {
        alert(err);
        console.log("Dashboard.jsx->Error getting Re details of crnt user");
      });
  }

  function handleFrendChat(frendname, frendphone, frendidx) {
    setChat(
      <Chat
        username={uname}
        userid={id}
        userphone={phone}
        friendname={frendname}
        friendphone={frendphone}
        friendidx={frendidx}
      />
    );
    console.log("Done");
  }

  function handleAccount() {
    setChat(
      <Account
        id={id}
        name={uname}
        phone={phone}
        password={upass}
        onChecked={handleDetails}
      />
    );
  }

  return (
    <div className="flex flex-row h-[100vh] overflow-y-hidden">
      <div className="w-[30%]">
        <Left
          userid={id}
          username={uname}
          userphone={phone}
          onChecked={handleFrendChat}
          onChange={handleAccount}
          default={() => {
            setChat(<Default />);
          }}
        />
      </div>
      <p className="border-r-2 border-black border-dashed"></p>
      <div className="w-[70%]">{chat}</div>
    </div>
  );
}
