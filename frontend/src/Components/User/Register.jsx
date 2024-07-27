import { useState } from "react";
import logo from "../../assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import "./externalcss.css";

export default function Register() {
  const [name, setName] = useState("");
  const [phn, setPhn] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const [passEye, setPassEye] = useState(false);

  function handleRegister() {
    console.log("Handling Register");
    if (name !== "" && phn !== "" && pass !== "") {
      fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, phone: phn, password: pass }),
      })
        .then((response) => {
          if (response.status === 201) {
            return response.json();
          } else if (response.status === 500) {
            return Promise.reject("Error");
          } else if (response.status === 303) {
            return Promise.reject("User Name Already Exist");
          }
        })
        .then((data) => {
          alert("User Inserted successfully");
          console.log("Register.jsx Data is: ", data);
          setName("");
          setPhn("");
          setPass("");
          navigate("/login");
        })
        .catch((err) => {
          alert(err);
          console.log("Register.jsx Error is: ", err);
        });
    } else {
      alert("Please fill all the fields");
      console.log("Please fill all the fields");
    }
  }

  return (
    <div className="gradient-bg h-screen flex items-center justify-center">
      <div className=" w-[25%] bg-[#5A72A0] p-8 rounded-lg shadow-xl shadow-[#FDFFE2] border-4 border-[#83B4FF]">
        <Link to="/">
          <div className="w-20 mx-auto mb-6">
            <img
              src={logo}
              alt="logo"
              className="w-full h-20 object-cover rounded-full border-4 border-[#83B4FF] "
            />
          </div>
        </Link>
        <div className="text-center text-lg font-bold text-[#FDFFE2] mb-4 tracking-widest">
          Whatsapp
        </div>
        <div className="space-y-4">
          <div className="relative flex items-center bg-transparent rounded-full shadow-inner shadow-black px-2 py-2">
            <span className="far fa-user text-gray-500 mr-3"></span>
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-transparent outline-none text-[#FDFFE2] text-base"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="relative flex items-center bg-transparent rounded-full shadow-inner shadow-black px-2 py-2">
            <span className="far fa-user text-gray-500 mr-3"></span>
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full bg-transparent outline-none text-[#FDFFE2] text-base"
              onChange={(e) => setPhn(e.target.value)}
              value={phn}
            />
          </div>
          <div className="relative flex items-center bg-transparent rounded-full shadow-inner shadow-black px-2 py-2">
            <span className="fas fa-key text-gray-500 mr-3"></span>
            <input
              type={passEye ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-transparent outline-none text-[#FDFFE2] text-base"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <span
              onClick={() => setPassEye(!passEye)}
              className="cursor-pointer text-[#83B4FF]"
            >
              {passEye ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <button
            type="submit"
            onClick={handleRegister}
            className="w-full bg-[#83B4FF] text-[#1A2130] hover:text-white rounded-full py-2 text-center font-semibold hover:bg-[#1A2130] shadow-lg"
          >
            Create Account
          </button>
        </div>
        <div className="text-center flex flex-row gap-1 items-center justify-center text-sm text-gray-500 mt-4 hover:*:font-semibold ">
          <Link to="/login" className="text-[#FDFFE2] hover:text-[#1A2130]">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
