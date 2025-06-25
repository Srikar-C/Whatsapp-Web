import { handlePass, sendOtp } from "../Account/utils";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

export default function Password({
  userid,
  pass,
  userpassword,
  passval,
  passEye,
  setPassVal,
  onChange,
  setPass,
  useremail,
  otp,
  setOtp,
  setPassEye,
  setSpin,
  setOtpVal,
}) {
  return (
    <div className="password flex flex-row gap-5 items-center">
      <div className="flex gap-2 items-center w-[150px] ">
        <RiLockPasswordFill className="text-xl" />
        <h1 className="text-xl">Password</h1>
      </div>
      <p>:</p>
      {pass ? (
        <div className="flex justify-between gap-2 items-center">
          <input
            className="w-[200px] text-start bg-transparent"
            value={userpassword}
            type={passEye ? "text" : "password"}
            readOnly
          />
          <span
            onClick={() => setPassEye(!passEye)}
            className="cursor-pointer text-[#000]"
          >
            {passEye ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
      ) : (
        <div className="flex bg-white shadow-inner shadow-gray-300 items-center px-2 py-1">
          <input
            type="text"
            value={passval}
            onChange={(e) => setPassVal(e.target.value)}
            className="bg-transparent outline-none border-none"
            placeholder="Change your Password"
          />
          <TiTick
            className="text-xl cursor-pointer"
            onClick={() => {
              handlePass(userid, passval, setPass, pass);
              onChange();
            }}
          />
        </div>
      )}
      {!otp && (
        <button
          type="submit"
          onClick={() => {
            sendOtp(setSpin, setOtpVal, useremail);
            setOtp(!otp);
          }}
          className="px-2 py-1 bg-black hover:bg-white text-white hover:text-black border-2 border-white hover:border-black rounded-sm "
        >
          Edit
        </button>
      )}
    </div>
  );
}
