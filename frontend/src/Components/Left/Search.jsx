import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Search(props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    handleFriendsRes();
  }, [props.uid]);

  function handleFriendsRes() {
    fetch("http://localhost:3000/getFriends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: props.uid,
        value: value,
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
        console.log("Search.jsx Getting all the Friends details: ", data);
        props.onChecked(data);
      })
      .catch((err) => {
        console.log(
          "Search.jsx Error on getting all the Friends details: ",
          err
        );
      });
  }

  useEffect(() => {
    handleFriendsRes();
  }, [props.uid]);

  return (
    <nav className="bg-[#E7F0DC] h-[10vh] items-center flex px-2 ">
      <div className="border-2 border-black shadow-inner shadow-[#4F6F52] flex flex-row gap-3 w-full p-2 rounded-md">
        <FaSearch className="text-2xl text-[#1A4D2E]" />
        <input
          type="text"
          placeholder="Enter name to Filter"
          className="bg-transparent w-full outline-none border-none"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            console.log("value is:", value);
          }}
        />
      </div>
    </nav>
  );
}
