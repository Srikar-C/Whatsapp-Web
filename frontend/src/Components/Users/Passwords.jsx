import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { SiWhatsapp } from "react-icons/si";
import { useLocation, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PuffLoader from "react-spinners/PuffLoader";
import { changePassword } from "./utils";

export default function Passwords() {
  const [pass, setPass] = useState("");
  const [passEye, setPassEye] = useState(false);
  const [conf, setConf] = useState("");
  const [confEye, setConfEye] = useState(false);
  const location = useLocation();
  const { useremail } = location.state || {};
  const navigate = useNavigate();
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  function handlePassword() {
    setSpin(true);
    setTimeout(() => {
      if (pass === conf) {
        changePassword(useremail, pass, setSpin, navigate);
      } else {
        setSpin(false);
        toast.error("Passwords are not same");
      }
    }, 5000);
  }

  return (
    <div
      className=" gradient-bg h-screen *:transition-all"
      data-aos="flip-left"
    >
      <ToastContainer
        hideProgressBar="false"
        position="top-right"
        transition={Slide}
        autoClose={5000}
      />
      <div className="box w-[25%] h-[400px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center p-4 gap-6 bg-[#F6F1E9] rounded-lg shadow-2xl">
        <div className="flex flex-col border-2 border-[#F6F1E9] p-2 rounded-[50%] shadow-inner shadow-[#000]">
          <SiWhatsapp className="text-6xl p-2 bg-[#FFD93D] text-[#4F200D] shadow-inner shadow-[#EBF4F6] rounded-[50%] justify-center" />
        </div>
        <div className="inputs flex flex-col gap-5 items-center space-y-1 *:w-[100%]">
          <h1 className="heading font-semibold text-[#4F200D] text-center uppercase tracking-wider">
            Change Password
          </h1>
          <div className="password relative flex items-center bg-transparent rounded-full shadow-inner shadow-black gap-3 px-3 py-2">
            <RiLockPasswordFill className="text-[#4F200D] w-[25px] text-xl" />
            <input
              type={passEye ? "text" : "password"}
              className={`${
                spin ? "cursor-not-allowed" : ""
              } border-none outline-none bg-transparent text-[#4F200D] font-semibold`}
              placeholder="Enter New Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              disabled={spin ? true : false}
            />
            <span
              onClick={() => setPassEye(!passEye)}
              className="cursor-pointer text-[#4F200D]"
            >
              {passEye ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div className="confirm relative flex items-center bg-transparent rounded-full shadow-inner shadow-black gap-3 px-3 py-2">
            <RiLockPasswordLine className="text-[#4F200D] w-[25px] text-xl" />
            <input
              type={confEye ? "text" : "password"}
              className={`${
                spin ? "cursor-not-allowed" : ""
              } border-none outline-none bg-transparent text-[#4F200D] font-semibold`}
              placeholder="Confirm Password"
              value={conf}
              onChange={(e) => setConf(e.target.value)}
              disabled={spin ? true : false}
            />
            <span
              onClick={() => setConfEye(!confEye)}
              className="cursor-pointer text-[#4F200D]"
            >
              {confEye ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <button
            onClick={handlePassword}
            className={`${
              spin ? "cursor-not-allowed" : ""
            } hover:border-2 hover:border-[#4F200D] text-[#4F200D] px-3 py-1 justify-center mx-auto flex items-center gap-3 rounded-full bg-[#FFD93D] font-semibold`}
          >
            {spin ? <PuffLoader size={30} color="#4F200D" /> : ""}
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
