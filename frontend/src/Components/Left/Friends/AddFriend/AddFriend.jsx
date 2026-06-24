import { useState } from "react";
import { FaUserAlt, FaPhoneAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import url from "../../../../url";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PuffLoader from "react-spinners/PuffLoader";
import { addFriend, requestFriend } from "./utils";

export default function AddFriend({ uid, uname, uphone, onChange }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  function checkAndAdd() {
    setSpin(true);
    if (name && phone) {
      if (phone.length === 10) {
        fetch(`${url}/checkfriend`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userphone: phone,
            friendphone: uphone,
          }),
        })
          .then((response) => {
            if (response.status === 201) {
              return response.json();
            }
            return response.json().then((data) => {
              return Promise.reject(data);
            });
          })
          .then((data) => {
            setTimeout(() => {
              addFriend(uid, uname, uphone, name, phone);
              requestFriend(uname, uphone, name, phone);
              setTimeout(() => {
                setName("");
                setPhone("");
                onChange();
              }, 4000);
              setSpin(false);
            }, 5000);
          })
          .catch((err) => {
            if (err.type === "info") {
              toast.info(err.message, { duration: 4000 });
            } else if (err.type === "warn") {
              toast.warn(err.message, { duration: 4000 });
            } else {
              toast.error(err.message, { duration: 4000 });
            }
            setTimeout(() => {
              setName("");
              setPhone("");
              onChange();
            }, 5000);
            setSpin(false);
            console.log(
              "AddFriend.jsx->Error on checking friend: " + err.message
            );
          });
      } else {
        setSpin(false);
        toast.info("Phone Number should contain 10 digits", { duration: 4000 });
      }
    } else {
      setSpin(false);
      toast.info("Please fill both details completely", { duration: 4000 });
    }
  }

  return (
    <div
      className="flex flex-col gap-3 items-center justify-center p-4 *:w-[80%] shadow-lg w-full mx-auto my-2"
      data-aos="zoom-in"
    >
      <ToastContainer
        position="top-left"
        hideProgressBar="false"
        transition={Slide}
        autoClose={4000}
      />
      <div className="name relative flex items-center bg-transparent rounded-full shadow-inner shadow-black gap-3 px-3 py-2">
        <FaUserAlt className="text-[#4F200D] w-[25px] text-xl" />
        <input
          type="text"
          className={`${
            spin ? "cursor-not-allowed" : ""
          } border-none outline-none bg-transparent text-[#4F200D] font-semibold`}
          placeholder="Enter Name"
          value={name}
          disabled={spin ? true : false}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="phone relative flex items-center bg-transparent rounded-full shadow-inner shadow-black gap-3 px-3 py-2">
        <FaPhoneAlt className="text-[#4F200D] w-[25px] text-xl" />
        <input
          type="text"
          className={`${
            spin ? "cursor-not-allowed" : ""
          } border-none outline-none bg-transparent text-[#4F200D] font-semibold`}
          placeholder="Enter Phone Number"
          value={phone}
          disabled={spin ? true : false}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button
        onClick={checkAndAdd}
        className={`${
          spin ? "cursor-not-allowed" : ""
        } cursor-pointer hover:border-2 hover:border-[#4F200D] text-[#4F200D] px-3 py-1 justify-center mx-auto flex items-center gap-3 rounded-full bg-[#FFD93D] font-semibold`}
      >
        {spin ? <PuffLoader size={30} color="#4F200D" /> : ""}
        Submit
      </button>
    </div>
  );
}
