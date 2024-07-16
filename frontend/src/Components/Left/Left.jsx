import { useEffect, useState } from "react";
import AddFriend from "./Friends/AddFriend";
import Nav from "./Navigation/Nav";
import Search from "./Search";
import FriendsList from "./Friends/FriendsList";

export default function Left(props) {
  const [add, setAdd] = useState(false);
  const [friends, setFriends] = useState([]);

  function handleToggle(propsAdd) {
    setAdd(propsAdd);
    console.log("Left.jsx Add Friend Toggle: ", propsAdd);
  }

  function handleFriends(crntFriend) {
    setFriends((prevFriends) => {
      return [...prevFriends, crntFriend];
    });
    console.log("Left.jsx added new Friends and updated: ", crntFriend);
    setAdd(!add);
  }

  function handleChat(name, phone, fidx) {
    props.onChecked(name, phone, fidx);
  }

  function handleName(fid, uid, name, phone) {
    fetch("http://localhost:3000/rename", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: uid,
        fid: fid,
        name: name,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          alert("Error on renaming friend");
          throw new Error("Server error");
        }
      })
      .then((data) => {
        console.log("Rename done");
        console.log("Left.jsx getting data of renamed user is: ", data);
        setFriends((prevFrends) => {
          return prevFrends.map((frnd) => {
            if (frnd.id === fid) {
              return { ...frnd, name: name };
            }
            return frnd;
          });
        });
        handleChat(name, phone, fid);
      })
      .catch((err) => {
        console.log("Left.jsx Error on getting the renamed user: ", err);
      });
  }

  function handleFriends(friend) {
    setFriends(friend);
  }

  return (
    <div className=" flex flex-col mx-auto">
      <Nav onChange={handleToggle} onChecked={add} userName={props.name} />
      <Search
        friends={friends}
        uid={props.userId}
        userName={props.name}
        onChecked={handleFriends}
      />
      <AddFriend isAdd={add} onChecked={handleFriends} userId={props.userId} />
      <FriendsList
        friends={friends}
        onChecked={handleChat}
        userId={props.userId}
        onChange={handleName}
      />
    </div>
  );
}
