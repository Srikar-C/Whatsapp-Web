import { SiWhatsapp } from "react-icons/si";
import { FaPhoneAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import "./usercss.css";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PuffLoader from "react-spinners/PuffLoader";
import { loginUser } from "./utils";

export default function Login() {
  const [passEye, setPassEye] = useState(false);
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  function handleLogin() {
    setSpin(true);
    setTimeout(() => {
      loginUser(phone, pass, navigate, setPhone, setPass, setSpin);
    }, 5000);
  }

  return (
    <div
      className="gradient-bg h-screen *:transition-all overflow-hidden"
      data-aos="flip-left"
    >
      <ToastContainer
        hideProgressBar="false"
        position="top-right"
        transition={Slide}
        autoClose={5000}
      />
      <Link to="/">
        <span className="absolute top-10 left-20 text-6xl">
          <IoMdArrowRoundBack />
        </span>
      </Link>
      <div className="box w-[25%] h-[450px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center p-4 gap-6 bg-[#F6F1E9] rounded-lg shadow-2xl">
        <div className="flex flex-col border-2 border-[#F6F1E9] p-2 rounded-[50%] shadow-inner shadow-[#000]">
          <SiWhatsapp className="text-6xl p-2 bg-[#FFD93D] text-[#4F200D] shadow-inner shadow-[#EBF4F6] rounded-[50%] justify-center" />
        </div>
        <div className="inputs flex flex-col gap-4 items-center space-y-1 *:w-[100%]">
          <h1 className="heading font-semibold text-[#4F200D] text-center uppercase tracking-wider">
            Login
          </h1>
          <div className="phone relative flex items-center bg-transparent rounded-full shadow-inner shadow-[#000] gap-3 px-3 py-2">
            <FaPhoneAlt className="text-[#4F200D] w-[25px] text-xl" />
            <input
              id="phone"
              type="text"
              className={`${
                spin ? "cursor-not-allowed" : ""
              } border-none outline-none bg-transparent text-[#4F200D] font-medium`}
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={spin ? true : false}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  document.getElementById("password").focus(); // Move focus to password field
                }
              }}
            />
          </div>
          <div className="password relative flex items-center bg-transparent rounded-full shadow-inner shadow-black gap-3 px-3 py-2">
            <RiLockPasswordFill className="text-[#4F200D] w-[25px] text-xl" />
            <input
              id="password"
              type={passEye ? "text" : "password"}
              className={`${
                spin ? "cursor-not-allowed" : ""
              } border-none outline-none bg-transparent text-[#4F200D] font-medium`}
              placeholder="Enter Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              disabled={spin ? true : false}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />
            <span
              onClick={() => setPassEye(!passEye)}
              className="cursor-pointer text-[#4F200D]"
            >
              {passEye ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <button
            onClick={handleLogin}
            className={`${
              spin ? "cursor-not-allowed" : ""
            } cursor-pointer hover:border-2 hover:border-[#4F200D] text-[#4F200D] px-3 py-1 justify-center mx-auto flex items-center gap-3 rounded-full bg-[#FFD93D] font-semibold`}
          >
            {spin ? <PuffLoader size={30} color="#4F200D" /> : ""}
            Submit
          </button>
          <div className="font-medium text-center text-[#4F200D] gap-3 flex flex-row justify-center mx-auto">
            {spin ? (
              <span className="cursor-not-allowed">Forgot Password?</span>
            ) : (
              <Link to="/forgot" className="hover:font-bold">
                Forgot Password?
              </Link>
            )}
            <p>or</p>
            {spin ? (
              <span className="cursor-not-allowed">Sign in</span>
            ) : (
              <Link to="/register" className="hover:font-bold">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
