import { useState } from "react";

export default function AddFriend(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function handleAddFriend() {
    fetch("http://localhost:3000/addfrend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: props.userId,
        name: name,
        phone: phone,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 500) {
          alert("Error on login query");
          throw new Error("Server error");
        }
      })
      .then((data) => {
        alert("frend inserted");
        setName("");
        setPhone("");
        console.log("AddFriend.jsx getting Data of added friend is: ", data);
      })
      .catch((err) => {
        console.log(
          "AddFriend.jsx Error on getting the data of added friend is: ",
          err
        );
      });
  }

  return (
    <div className="">
      {props.isAdd ? (
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
              props.onChecked({ name: name, phone: phone });
              handleAddFriend();
            }}
            className="w-full bg-[#4F6F52] text-white rounded-full py-2 text-center font-semibold hover:bg-[#1A4D2E] shadow-lg"
          >
            Add Friend
          </button>
        </div>
      ) : (
        <div className="v"></div>
      )}
    </div>
  );
}
