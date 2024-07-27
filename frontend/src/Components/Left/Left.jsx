import { useEffect, useState } from "react";
import Navigation from "./Navigation/Navigation";
import AddingFriends from "./FriendsManagement/AddingFriends";
import GetFriends from "./FriendsManagement/GetFriends";
import RequestFriends from "./Requests/RequestFriends";

export default function Left(props) {
  const [addfriend, setAddfriend] = useState(false);
  const [friends, setFriends] = useState([]);
  const [isrequest, setRequest] = useState(false);
  const [rqFriends, setRFriends] = useState([]);
  const [listrequests, setListRequest] = useState(false);

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

  function handleRequest() {
    fetch("http://localhost:3000/findrequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userphone: props.userphone }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 500) {
          return Promise.reject("Error");
        } else if (response.status === 404) {
          setRequest(false);
          return Promise.reject("No Requests");
        }
      })
      .then((data) => {
        console.log("Requestes are there");
        setRequest(true);
        setRFriends(data);
      })
      .catch((err) => {
        alert(err);
        console.log("Left.jsx-> Error in Request Friends: " + err);
      });
  }

  useEffect(() => {
    handleFriends();
    handleRequest();
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
        console.log(
          "Left.jsx->Data: " +
            data.id +
            " " +
            data.friendphone +
            " " +
            data.friendname
        );
        handleFriends();
        handleFrendChat(data.friendname, data.friendphone, data.id);
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
        props.default();
      })
      .catch((err) => {
        alert(err);
        console.log("Left.jsx->Error: " + err);
      });
  }

  function openRequests() {
    setListRequest(!listrequests);
    setRequest(!isrequest);
  }

  return (
    <div className="flex flex-col mx-auto">
      <Navigation
        isFriend={() => setAddfriend(!addfriend)}
        username={props.username}
        onChecked={() => {
          props.onChange();
        }}
      />
      {isrequest ? (
        <div onClick={openRequests} className="cursor-pointer">
          Friends Request
        </div>
      ) : (
        ""
      )}
      {addfriend ? (
        <AddingFriends
          userid={props.userid}
          username={props.username}
          userphone={props.userphone}
          isFriend={() => {
            setAddfriend(!addfriend);
            handleFriends();
          }}
        />
      ) : (
        ""
      )}
      {listrequests ? (
        <RequestFriends
          friends={rqFriends}
          onChange={openRequests}
          userid={props.userid}
          onChecked={() => {
            handleRequest();
            handleFriends();
            setListRequest(!listrequests);
          }}
        />
      ) : (
        <GetFriends
          friends={friends}
          onChecked={handleFrendChat}
          onChange={handleRename}
          ondelete={handleDelete}
        />
      )}
    </div>
  );
}
