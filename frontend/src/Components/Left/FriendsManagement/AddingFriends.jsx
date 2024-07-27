import { useState } from "react";

export default function AddingFriends(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [userpresent, setpresent] = useState(false);

  function addNewFriend() {
    fetch("http://localhost:3000/isuserpresent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: phone }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 500) {
          return Promise.reject("Error");
        } else if (response.status === 404) {
          return Promise.reject("User doesn't have an account to connect");
        }
      })
      .then((data) => {
        setpresent(true);
      })
      .catch((err) => {
        alert(err);
        console.log("AddingFriends.jsx-> Error: " + err);
      });
    if (userpresent) {
      if (name !== "" && phone !== "") {
        fetch("http://localhost:3000/addfrend", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: props.userid,
            username: props.username,
            userphone: props.userphone,
            name: name,
            phone: phone,
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
            alert("Friend added successfully");
            console.log("AddingFriends.js->Data: " + data);
            setName("");
            setPhone("");
          })
          .catch((err) => {
            alert(err);
            console.log("AddingFriends.js->Error: " + err);
          });
      } else {
        alert("Enter friend details correctly");
      }
    }
  }

  function addRequest() {
    if (userpresent) {
      if (name !== "" && phone !== "") {
        fetch("http://localhost:3000/addrequest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fromname: props.username,
            fromphone: props.userphone,
            toname: name,
            tophone: phone,
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
            alert("Request sent successfully");
            console.log("AddingFriends.js->Data: " + data);
            setName("");
            setPhone("");
          })
          .catch((err) => {
            alert(err);
            console.log("AddingFriends.js->Error: " + err);
          });
      }
    }
  }

  return (
    <div className="space-y-4 w-[100%] bg-[#FDFFE2] py-3 mx-auto flex flex-col items-center *:w-[70%]">
      <div className="relative flex  items-center justify-center bg-transparent rounded-full shadow-inner shadow-black px-2 py-2">
        <span className="far fa-user text-gray-500 mr-3"></span>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-transparent outline-none text-[#1A2130] text-base font-semibold"
        />
      </div>
      <div className="relative flex  items-center justify-center bg-transparent rounded-full shadow-inner shadow-black px-2 py-2">
        <span className="far fa-user text-gray-500 mr-3"></span>
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-transparent outline-none text-[#1A2130] text-base font-semibold"
        />
      </div>
      <button
        type="submit"
        onClick={() => {
          addNewFriend();
          addRequest();
          props.isFriend();
        }}
        className="w-full bg-[#5A72A0] text-white rounded-full py-2 text-center font-semibold hover:bg-[#1A2130] shadow-lg"
      >
        Add Friend
      </button>
    </div>
  );
}
