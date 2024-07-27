import { useState } from "react";
import { TiTick } from "react-icons/ti";
import bg from "../../assets/bg.png";
import "./acc.css";

export default function Account(props) {
  const [nameedit, setNameEdit] = useState(true);
  const [passedit, setPassEdit] = useState(true);
  const [name, setName] = useState(props.name);
  const phn = props.phone;
  const [pass, setPass] = useState(props.password);

  function handleName() {
    fetch("http://localhost:3000/userrename", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: props.id, value: name }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 500) {
          return Promise.reject("Error");
        }
      })
      .then((data) => {
        alert("Name altered");
        console.log("Username altered");
        setNameEdit(!nameedit);
        props.onChecked();
      })
      .catch((err) => {
        alert(err);
        console.log("Account.jsx->Error: " + err);
      });
  }

  function handlePass() {
    fetch("http://localhost:3000/userpassrename", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: props.id, value: pass }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 500) {
          return Promise.reject("Error");
        }
      })
      .then((data) => {
        alert("Password altered");
        console.log("Password altered");
        setPassEdit(!passedit);
        props.onChecked();
      })
      .catch((err) => {
        alert(err);
        console.log("Account.jsx->Error: " + err);
      });
  }

  return (
    <div className="gradient-background h-full w-full flex flex-col items-center justify-center *:transition-all !overflow-y-hidden">
      <h1 className="text-2xl absolute top-16 font-semibold text-[#fff]">
        Account Settings
      </h1>
      <div className="box w-fit p-5 text-white flex flex-col gap-4 shadow-black shadow-inner border-2 border-white rounded-lg">
        <div className="name flex gap-4 items-center ">
          <h1 className="w-[150px] font-semibold">User Name</h1>
          <p>:</p>
          {nameedit ? (
            <p className="w-[120px] px-2 py-1">{name}</p>
          ) : (
            <div className="flex items-center border-b-2 max-w-fit border-black">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-[120px] max-w-fit px-2 py-1 border-none outline-none bg-transparent "
              />
              <TiTick
                className="text-[#fff] text-2xl cursor-pointer"
                onClick={handleName}
              />
            </div>
          )}
          <span
            className="text-[#fff] cursor-pointer font-bold uppercase border-2 border-white rounded-2xl p-2"
            onClick={() => setNameEdit(!nameedit)}
          >
            Edit
          </span>
        </div>
        <hr className="bg-gray-500 h-[2px]" />
        <div className="phone flex gap-4 items-center">
          <h1 className="w-[150px] font-semibold">Phone Number</h1>
          <p>:</p>
          <p className="w-[120px] px-2 py-1">{phn}</p>
        </div>
        <hr className="bg-gray-400 h-[2px]" />
        <div className="password flex gap-4 items-center">
          <h1 className="w-[150px] font-semibold">Password</h1>
          <p>:</p>
          {passedit ? (
            <p className="w-[120px] px-2 py-1">{pass}</p>
          ) : (
            <div className="flex items-center border-b-2 border-black">
              <input
                type="text"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-[120px] max-w-fit px-2 py-1 border-none outline-none bg-transparent"
              />
              <TiTick
                className="text-[#fff] text-2xl cursor-pointer"
                onClick={handlePass}
              />
            </div>
          )}
          <span
            className="text-[#fff] cursor-pointer font-bold uppercase border-2 border-white rounded-2xl p-2"
            onClick={() => setPassEdit(!passedit)}
          >
            Edit
          </span>
        </div>
      </div>
    </div>
  );
}
