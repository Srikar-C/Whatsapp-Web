import { useState } from "react";
import logo from "../../assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./externalcss.css";

export default function Forgot() {
  const [phn, setPhn] = useState("");
  const [pass, setPass] = useState("");
  const [conf, setConf] = useState("");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [passEye, setPassEye] = useState(false);
  const [confEye, setConfEye] = useState(false);

  function handlePass() {
    if (pass === conf) {
      fetch("http://localhost:3000/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phn,
          password: pass,
        }),
      })
        .then((response) => {
          if (response.status === 201) {
            return response.json();
          } else if (response.status === 500) {
            return Promise.reject("Error");
          } else if (response.status === 404) {
            navigate("/register");
            return Promise.reject("User not found/exist");
          }
        })
        .then((data) => {
          alert("Password Updated Login Now");
          console.log("Forgot.jsx->Data: " + data);
          navigate("/login");
        })
        .catch((err) => {
          alert(err);
          console.log("Forgot.jsx->Error: " + err);
        });
    } else {
      alert("Passwords are not same");
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
              className="w-full h-20 object-cover rounded-full border-4 border-[#83B4FF]"
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
              placeholder="Phone Number"
              className="w-full bg-transparent outline-none text-[#FDFFE2] text-base"
              onChange={(e) => setPhn(e.target.value)}
              value={phn}
            />
          </div>
          <div className="relative flex items-center bg-transparent rounded-full shadow-inner shadow-black px-2 py-2">
            <span className="far fa-user text-gray-500 mr-3"></span>
            <input
              type={passEye ? "text" : "password"}
              placeholder="New Password"
              className="w-full bg-transparent outline-none text-[#FDFFE2] text-base"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <span
              onClick={() => setPassEye(!passEye)}
              className="cursor-pointer"
            >
              {passEye ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div className="relative flex items-center bg-transparent rounded-full shadow-inner shadow-black px-2 py-2">
            <span className="fas fa-key text-gray-500 mr-3"></span>
            <input
              type={confEye ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full bg-transparent outline-none text-[#FDFFE2] text-base"
              onChange={(e) => setConf(e.target.value)}
              value={conf}
            />
            <span
              onClick={() => setConfEye(!confEye)}
              className="cursor-pointer"
            >
              {confEye ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <button
            type="submit"
            onClick={handlePass}
            className="w-full bg-[#83B4FF] text-[#1A2130] hover:text-white rounded-full py-2 text-center font-semibold hover:bg-[#1A2130] shadow-lg"
          >
            Submit
          </button>
        </div>
        <div className="text-center flex flex-row gap-1 items-center justify-center text-sm text-gray-500 mt-4 hover:*:font-semibold ">
          <Link to="/login" className="text-[#FDFFE2] hover:text-[#1A2130]">
            Sign In
          </Link>{" "}
          <p className="font-semibold text-[#1a2130]">or</p>{" "}
          <Link to="/register" className="text-[#FDFFE2] hover:text-[#1A2130]">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
