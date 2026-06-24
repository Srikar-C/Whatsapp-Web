import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from "react-toastify";

export default function OTP({
  text,
  setText,
  otpval,
  setOtp,
  otp,
  setPass,
  pass,
}) {
  return (
    <div className="otp flex flex-row gap-5 items-center">
      <div className="flex gap-2 items-center w-[150px] ">
        <RiLockPasswordFill className="text-xl invisible" />
        <h1 className="text-[12px]">Enter the otp sent to your email</h1>
      </div>
      <p className="">:</p>
      <div className="flex bg-white shadow-inner shadow-gray-300 items-center px-2 py-1">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter the OTP"
          className="bg-transparent outline-none border-none"
        />
      </div>
      <button
        type="submit"
        onClick={() => {
          if (parseInt(text) === parseInt(otpval)) {
            setOtp(!otp);
            setPass(!pass);
            toast.success("OTP Verified");
            toast.success("Change your Password");
          } else {
            toast.error("Incorrect OTP");
          }
        }}
        className="px-2 py-1 bg-black hover:bg-white text-white hover:text-black border-2 border-white hover:border-black rounded-sm "
      >
        Verify
      </button>
    </div>
  );
}
