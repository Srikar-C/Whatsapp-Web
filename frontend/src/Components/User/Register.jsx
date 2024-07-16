import { useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
export default function Register() {
  const [name, setName] = new useState("");
  const [phn, setPhn] = new useState("");
  const [pass, setPass] = new useState("");
  const navigate = useNavigate();

  function handleRegister() {
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        phn: phn,
        pass: pass,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 500) {
          alert("Error on register query");
        }
      })
      .then((data) => {
        alert("Inserted successfully");
        console.log("Register.jsx Getting user data: ", data);
        setName("");
        setPhn("");
        setPass("");
        navigate("/dashboard", { state: { id: data.id, name: data.name } });
      })
      .catch((err) => {
        console.log("Register.jsx Error on Getting user data: ", err);
      });
  }

  return (
    <div className="bg-[#4F6F52] h-screen flex items-center justify-center">
      <div className=" w-[25%] bg-[#F5EFE6] p-8 rounded-lg shadow-lg shadow-[#E8DFCA] border-4 border-white">
        <Link to="/">
          <div className="w-20 mx-auto mb-6">
            <img
              src={logo}
              alt="logo"
              className="w-full h-20 object-cover rounded-full border-4 border-[#1A4D2E] shadow-lg"
            />
          </div>
        </Link>
        <div className="text-center text-lg font-bold text-[#1A4D2E] mb-4 hover:text-[#1A4D2E]">
          Whatsapp
        </div>
        <div className="space-y-4">
          <div className="relative flex items-center bg-transparent rounded-full shadow-inner shadow-black px-2 py-2">
            <span className="far fa-user text-gray-500 mr-3"></span>
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-transparent outline-none text-gray-600 text-base"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="relative flex items-center bg-transparent rounded-full shadow-inner shadow-black px-2 py-2">
            <span className="far fa-user text-gray-500 mr-3"></span>
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full bg-transparent outline-none text-gray-600 text-base"
              onChange={(e) => setPhn(e.target.value)}
              value={phn}
            />
          </div>
          <div className="relative flex items-center bg-transparent rounded-full shadow-inner shadow-black px-2 py-2">
            <span className="fas fa-key text-gray-500 mr-3"></span>
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent outline-none text-gray-600 text-base"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
          </div>
          <button
            type="submit"
            onClick={handleRegister}
            className="w-full bg-[#4F6F52] text-white rounded-full py-2 text-center font-semibold hover:bg-[#1A4D2E] shadow-lg"
          >
            Create Account
          </button>
        </div>
        <div className="text-center flex flex-row gap-1 items-center justify-center text-sm text-gray-500 mt-4 hover:*:font-semibold ">
          <Link to="/login" className="text-[#4F6F52] hover:text-[#1A4D2E]">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
