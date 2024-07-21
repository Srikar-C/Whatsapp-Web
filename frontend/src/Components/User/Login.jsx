import { useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function Login() {
  const [phn, setPhn] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const [passEye, setPassEye] = useState(false);

  function handleLogin() {
    console.log("Handling Login");
    if (phn !== "" && pass !== "") {
      fetch("http://localhost:3000/login", {
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
            return Promise.reject("Error ");
          } else if (response.status === 404) {
            return Promise.reject("User Not Exist ");
          } else if (response.status === 303) {
            return Promise.reject("Incorrect Password ");
          } else {
            return Promise.reject(
              "Unexpected response status: " + response.status
            );
          }
        })
        .then((data) => {
          alert("User Exist");
          console.log("Login.jsx Data is: ", data);
          setPhn("");
          setPass("");
          navigate("/dashboard", {
            state: { id: data.id, name: data.name, phone: data.phone },
          });
        })
        .catch((err) => {
          alert(err);
          console.log("Login.jsx Error is: ", err);
        });
    }
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
              placeholder="Phone Number"
              className="w-full bg-transparent outline-none text-gray-600 text-base"
              onChange={(e) => setPhn(e.target.value)}
              value={phn}
            />
          </div>
          <div className="relative flex items-center bg-transparent rounded-full shadow-inner shadow-black px-2 py-2">
            <span className="fas fa-key text-gray-500 mr-3"></span>
            <input
              type={passEye ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-transparent outline-none text-gray-600 text-base"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <span onClick={() => setPassEye(!passEye)}>
              {passEye ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full bg-[#4F6F52] text-white rounded-full py-2 text-center font-semibold hover:bg-[#1A4D2E] shadow-lg"
          >
            Login
          </button>
        </div>
        <div className="text-center flex flex-row gap-1 items-center justify-center text-sm text-gray-500 mt-4 hover:*:font-semibold ">
          <Link to="/forgot" className="text-[#4F6F52] hover:text-[#1A4D2E]">
            Forget password?
          </Link>{" "}
          <p className="font-semibold">or</p>{" "}
          <Link to="/register" className="text-[#4F6F52] hover:text-[#1A4D2E]">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
