import Typewriter from "typewriter-effect";
import Avatar from "@mui/material/Avatar";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Chatting() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex flex-col gap-10 justify-evenly mt-[10vh] items-center">
      <div
        className="text-3xl justify-center w-[30%] text-center flex flex-col gap-4"
        data-aos="fade-right"
      >
        <h1>Chat with people around you</h1>
        <p className="text-lg text-gray-400">
          Chat privately with your friends and family
        </p>
      </div>
      <div className="chats flex flex-row justify-around w-[100%] gap-50">
        <div
          className="flex flex-row h-[10vh] p-2 mb-2 justify-end text-white gap-1 items-center"
          data-aos="fade-left"
        >
          <div className="justify-center w-fit text-wrap bg-transparent flex text-start items-center gap-1">
            <div className="flex flex-row relative w-fit break-all text-wrap bg-[#000] pr-14 px-3 py-1 rounded-tl-lg rounded-bl-lg">
              <div>
                <Typewriter
                  className="text-white"
                  options={{
                    loop: true,
                    strings: ["Type Your Messages"],
                    autoStart: true,
                  }}
                />
                <sub className="absolute bottom-3 right-1 ">3:34</sub>
              </div>
            </div>
          </div>
          <Avatar
            sx={{ bgcolor: "#fff", color: "#000", fontSize: "16px" }}
            aria-label="recipe"
          >
            {"Friends".substring(0, 2).toUpperCase()}
          </Avatar>
        </div>
        <div
          className="flex h-[10vh] p-2 mb-2 justify-start text-black"
          data-aos="fade-right"
        >
          <div className="justify-center w-fit bg-transparent flex text-start items-center gap-1">
            <Avatar
              sx={{ bgcolor: "#000", color: "#fff", fontSize: "16px" }}
              aria-label="recipe"
            >
              {"Family".substring(0, 2).toUpperCase()}
            </Avatar>
            <div className="flex relative w-fit break-all text-wrap bg-[#fff] pr-14 px-3 py-1 rounded-tr-lg rounded-br-lg">
              <div>
                <Typewriter
                  className="text-white"
                  options={{
                    loop: true,
                    strings: ["Edit Your Messages"],
                    autoStart: true,
                  }}
                />
                <sub className="absolute bottom-3 right-1 ">1:28</sub>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
