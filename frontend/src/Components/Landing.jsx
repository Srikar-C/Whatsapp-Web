import { Link } from "react-router-dom";
import { SiWhatsapp } from "react-icons/si";

export default function Landing() {
  return (
    <div className="bg-[#B6C4B6] flex flex-col h-screen">
      <nav className="bg-[#4F6F52] h-[15vh] text-white items-center flex rounded-b-xl">
        <SiWhatsapp className="pl-5 text-6xl" />
      </nav>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-[#4F6F52] shadow-lg shadow-[#1A4D2E] p-3 text-center w-[40%] h-[35vh] justify-around flex flex-col bg-[#E8DFCA] rounded-lg">
        <h1 className="font-bold text-4xl">Create/Enter your Room</h1>
        <div className="links flex justify-around *:border-2 *:border-[#1A4D2E] *:p-2 *:text-white *:bg-[#1A4D2E] *:rounded-lg *:w-24 *:font-semibold">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
