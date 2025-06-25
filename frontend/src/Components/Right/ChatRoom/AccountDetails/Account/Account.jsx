import { useEffect, useState } from "react";
import Name from "../Fields/Name";
import Email from "../Fields/Email";
import Phone from "../Fields/Phone";
import Password from "../Fields/Password";
import OTP from "../Fields/OTP";
import Spinner from "../../../../../Spinner";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./account.module.css";

export default function Account({
  userid,
  username,
  useremail,
  userphone,
  userpassword,
  onChange,
}) {
  const [name, setName] = useState(true);
  const [email, setEmail] = useState(true);
  const [pass, setPass] = useState(true);
  const [nameval, setNameVal] = useState("");
  const [emailval, setEmailVal] = useState("");
  const [passval, setPassVal] = useState("");
  const [otp, setOtp] = useState(false);
  const [otpval, setOtpVal] = useState("");
  const [text, setText] = useState("");
  const [passEye, setPassEye] = useState(false);
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div
      className="flex mx-auto w-full items-center h-full justify-center bg-[#FAEC0C] p-4 "
      data-aos="fade-left"
    >
      <ToastContainer
        hideProgressBar="false"
        position="top-center"
        transition={Slide}
        autoClose={5000}
      />
      <marquee
        loop={Infinity}
        className={` absolute bottom-4 left-1/2 transform -translate-x-1/2 mx-auto justify-center w-[60%] items-center flex bg-white rounded-md p-4 text-center`}
      >
        Disclaimer: Please reload if your data is not updated, there might be a
        technical issue
      </marquee>
      {spin && <Spinner />}
      <div className=" bg-[#F3FEB8] justify-center flex flex-col text-center gap-4 p-5 rounded-md">
        <Name
          userid={userid}
          name={name}
          username={username}
          nameval={nameval}
          setNameVal={setNameVal}
          onChange={() => onChange()}
          setName={setName}
        />
        <Email
          userid={userid}
          email={email}
          useremail={useremail}
          emailval={emailval}
          setEmailVal={setEmailVal}
          onChange={() => onChange()}
          setEmail={setEmail}
        />
        <Phone userphone={userphone} />
        <Password
          userid={userid}
          pass={pass}
          userpassword={userpassword}
          passval={passval}
          passEye={passEye}
          setPassVal={setPassVal}
          onChange={() => onChange()}
          setPass={setPass}
          useremail={useremail}
          otp={otp}
          setOtp={setOtp}
          setPassEye={setPassEye}
          setSpin={setSpin}
          setOtpVal={setOtpVal}
        />
        {otp && (
          <OTP
            text={text}
            setText={setText}
            otpval={otpval}
            setOtp={setOtp}
            otp={otp}
            setPass={setPass}
            pass={pass}
          />
        )}
      </div>
    </div>
  );
}
