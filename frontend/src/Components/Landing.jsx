import { Link } from "react-router-dom";
import { SiWhatsapp } from "react-icons/si";
import "./land.css";

export default function Landing() {
  return (
    <div className="gradient-bg2 flex flex-col h-screen">
      <nav className="bg-[#1A2130] h-[15vh] text-white items-center flex justify-between px-5">
        <SiWhatsapp className="pl-5 text-6xl" />
        <p className="font-bold text-3xl">Whatsapp Web</p>
      </nav>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-[#5A72A0] shadow-lg shadow-[#83B4FF] p-3 text-center w-[40%] h-[35vh] justify-around flex flex-col bg-[#E8DFCA] rounded-lg">
        <h1 className="font-bold text-4xl">Create/Enter your Room</h1>
        <div className="links flex justify-around *:border-2 *:border-[#5A72A0] hover:*:bg-[#1A2130] *:p-2 *:text-white *:bg-[#83B4FF] *:rounded-lg *:w-24 *:font-semibold">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
