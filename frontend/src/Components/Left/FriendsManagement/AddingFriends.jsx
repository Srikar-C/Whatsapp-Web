import { useState } from "react";

export default function AddingFriends(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function addNewFriend() {
    fetch("http://localhost:3000/addfrend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: props.userid, name: name, phone: phone }),
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
  }

  return (
    <div className="space-y-4 w-[100%] bg-[#ebebe2] mx-auto py-5 flex flex-col items-center *:w-[70%]">
      <div className="relative flex  items-center justify-center bg-transparent rounded-full shadow-inner shadow-black px-2 py-2">
        <span className="far fa-user text-gray-500 mr-3"></span>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-transparent outline-none text-gray-600 text-base"
        />
      </div>
      <div className="relative flex  items-center justify-center bg-transparent rounded-full shadow-inner shadow-black px-2 py-2">
        <span className="far fa-user text-gray-500 mr-3"></span>
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-transparent outline-none text-gray-600 text-base"
        />
      </div>
      <button
        type="submit"
        onClick={() => {
          addNewFriend();
          props.isFriend();
        }}
        className="w-full bg-[#4F6F52] text-white rounded-full py-2 text-center font-semibold hover:bg-[#1A4D2E] shadow-lg"
      >
        Add Friend
      </button>
    </div>
  );
}
