import { SiWhatsapp } from "react-icons/si";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useRef } from "react";

export default function Navigation() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div
      className="nav bg-[#FFD93D] sticky w-screen flex flex-row justify-between items-center h-[10vh] px-4 pr-8 shadow-lg"
      data-aos="zoom-in"
    >
      <div className="leftnav w-[20%]">
        <SiWhatsapp className="logo text-[#4F200D] text-4xl" />
      </div>
      <div className="middlenav w-[30%]">
        <h1 className="font-bold text-[#4F200D] text-xl text-center uppercase">
          Whatsapp Web
        </h1>
      </div>
      <div className="rightnav w-[25%] justify-center flex flex-row gap-28 *:px-3 *:py-1 *:rounded-lg *:cursor-pointer font-sans font-semibold *:text-[#4F200D] hover:*:text-[#F6F1E9] *:bg-[#F6F1E9] hover:*:bg-[#4F200D] hover:*:shadow-md *:border-2 *:border-[#4F200D] hover:*:border-[#F6F1E9] transition-all duration-1000">
        <Link to="/login">
          <p className="text-center ">Login</p>
        </Link>
        <Link to="/register">
          <p className="text-center ">Register</p>
        </Link>
      </div>
    </div>
  );
}
