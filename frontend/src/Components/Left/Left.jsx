import { useEffect, useState } from "react";
import Navigation from "./Navigation/Navigation";
import AddingFriends from "./FriendsManagement/AddingFriends";
import Search from "./Search";
import GetFriends from "./FriendsManagement/GetFriends";

export default function Left(props) {
  const [addfriend, setAddfriend] = useState(false);
  const [friends, setFriends] = useState([]);

  function handleFriends() {
    fetch("http://localhost:3000/getFriends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: props.userid }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 500) {
          return Promise.reject(response);
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then((data) => {
        console.log("Left.jsx->Data: " + data);
        setFriends(data);
      })
      .catch((err) => {
        alert(err);
        console.log("Left.jsx->Error: " + err);
      });
  }

  useEffect(() => {
    handleFriends();
  }, [props.userid]);

  function handleFrendChat(fname, fphone, fidx) {
    props.onChecked(fname, fphone, fidx);
  }

  function handleRename(prop_uid, prop_fid, prop_value) {
    fetch("http://localhost:3000/rename", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: prop_uid, fid: prop_fid, value: prop_value }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 500) {
          return Promise.reject("Error");
        }
      })
      .then((data) => {
        alert("Renamed Successfully");
        console.log("Left.jsx->Data: " + data);
        handleFriends();
        handleFrendChat(data.name, data.phone, data.id);
      })
      .catch((err) => {
        alert(err);
        console.log("Left.jsx->Error: " + err);
      });
  }

  function handleDelete(prop_uid, prop_fid) {
    fetch("http://localhost:3000/deletefriend", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: prop_uid, fid: prop_fid }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 500) {
          return Promise.reject("Error");
        }
      })
      .then((data) => {
        alert("Friend deleted Successfully");
        console.log(data);
        handleFriends();
      })
      .catch((err) => {
        alert(err);
        console.log("Left.jsx->Error: " + err);
      });
  }

  return (
    <div className="flex flex-col mx-auto">
      <Navigation
        isFriend={() => setAddfriend(!addfriend)}
        username={props.username}
      />
      <Search />
      {addfriend ? (
        <AddingFriends
          userid={props.userid}
          isFriend={() => {
            setAddfriend(!addfriend);
            handleFriends();
          }}
        />
      ) : (
        ""
      )}
      <GetFriends
        friends={friends}
        onChecked={handleFrendChat}
        onChange={handleRename}
        ondelete={handleDelete}
      />
    </div>
  );
}
