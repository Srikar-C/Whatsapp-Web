import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { SiWhatsapp } from "react-icons/si";
import { useLocation, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import url from "../../url";

export default function Password() {
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

  function changePassword() {
    setSpin(true);
    setTimeout(() => {
      if (pass === conf) {
        fetch(`${url}/changepassword`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ useremail: useremail, password: pass }),
        })
          .then((response) => {
            if (response.status === 201) {
              return response.json();
            }
            return response.json().then((data) => {
              return Promise.reject(data.message);
            });
          })
          .then((data) => {
            setSpin(false);
            alert("Password changed successfully");
            navigate("/login");
          })
          .catch((err) => {
            setSpin(false);
            alert(err);
            console.log("Passwords.jsx->Error on changing password: " + err);
          });
      } else {
        setSpin(false);
        alert("Passwords are not same");
      }
    }, 5000);
  }

  return (
    <div
      className=" gradient-bg h-screen *:transition-all"
      data-aos="flip-left"
    >
      {spin ? (
        <div className="spinner absolute h-screen w-screen bg-[#000] opacity-80 z-10">
          <div
            role="status"
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <svg
              aria-hidden="true"
              class="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-[#FFD93D]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        ""
      )}
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
              className="border-none outline-none bg-transparent text-[#4F200D] font-semibold"
              placeholder="Enter New Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
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
              className="border-none outline-none bg-transparent text-[#4F200D] font-semibold"
              placeholder="Confirm Password"
              value={conf}
              onChange={(e) => setConf(e.target.value)}
            />
            <span
              onClick={() => setConfEye(!confEye)}
              className="cursor-pointer text-[#4F200D]"
            >
              {confEye ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <button
            onClick={changePassword}
            className="cursor-pointer hover:border-2 hover:border-[#4F200D] text-[#4F200D] px-3 py-1 justify-center mx-auto flex rounded-full bg-[#FFD93D] font-semibold"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
