import { MdEmail } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import url from "../../../../../url";
import { toast } from "react-toastify";

export default function Email({
  userid,
  email,
  useremail,
  emailval,
  setEmailVal,
  onChange,
  setEmail,
}) {
  function handleEmail(userid, emailval, setEmail, email) {
    fetch(`${url}/emailupdate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userid, email: emailval }),
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
        setEmail(!email);
        toast.success("Email changed", { duration: 5000 });
      })
      .catch((err) => {
        alert(err);
        console.log("Account.jsx->Error in updating email: " + err);
      });
  }

  return (
    <div className="email flex flex-row gap-5 items-center">
      <div className="flex gap-2 items-center w-[150px] ">
        <MdEmail className="text-xl" />
        <h1 className="text-xl">Email</h1>
      </div>
      <p>:</p>
      {email ? (
        <h4 className="w-[220px] text-start">{useremail}</h4>
      ) : (
        <div className="flex bg-white shadow-inner shadow-gray-300 items-center px-2 py-1">
          <input
            type="text"
            value={emailval}
            onChange={(e) => setEmailVal(e.target.value)}
            placeholder="Change your Email ID"
            className="bg-transparent outline-none border-none"
          />
          <TiTick
            className="text-xl cursor-pointer"
            onClick={() => {
              handleEmail(userid, emailval, setEmail, email);
              onChange();
            }}
          />
        </div>
      )}
      <button
        type="submit"
        onClick={() => setEmail(!email)}
        className="px-2 py-1 bg-black hover:bg-white text-white hover:text-black border-2 border-white hover:border-black rounded-sm "
      >
        Edit
      </button>
    </div>
  );
}
