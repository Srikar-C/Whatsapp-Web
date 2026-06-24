import { useEffect, useRef } from "react";
import ChatDrop from "./ChatDrop";
import "../../../../App.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function DisplayChats({
  chats,
  uid,
  fid,
  uphone,
  fphone,
  onChecked,
  onChange,
}) {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <div ref={chatContainerRef} className="h-[80vh] overflow-y-auto pt-1">
      {chats?.map((item) => {
        if (item.message.substring(0, 5) === "date:") {
          return (
            <div
              className="flex justify-center items-center w-full"
              key={item.id}
            >
              <div
                className={`shadow border-2 border-black rounded-xl justify-center text-[#4F200D] bg-[#FFD93D] py-1 px-3`}
              >
                {item.message.substring(5)}
              </div>
            </div>
          );
        } else if (item.fromphone === uphone) {
          return (
            <div
              key={item.id}
              className="flex w-[100%] p-2 mb-2 justify-end text-white"
            >
              <div className="justify-end w-[50%] text-wrap bg-transparent flex text-start items-center gap-1">
                <ChatDrop
                  id={item.id}
                  fromphone={item.fromphone}
                  tophone={item.tophone}
                  message={item.message}
                  minutes={item.minutes}
                  hours={item.hours}
                  onDelete={(id, fromphone, tophone) => {
                    onChecked(id, fromphone, tophone);
                  }}
                  onEdit={(id, fromphone, tophone, msg) => {
                    onChange(id, fromphone, tophone, msg);
                  }}
                />
                <div className="flex relative w-fit break-all max-w-[500px] text-wrap bg-[#000] pr-14 px-3 py-1 rounded-tl-lg rounded-bl-lg">
                  <p>
                    {item.message}{" "}
                    <sub className="absolute bottom-3 right-1 ">
                      {item.hours}:{item.minutes}
                    </sub>{" "}
                  </p>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div
              key={item.id}
              className="flex w-[100%] p-2 mb-2 justify-start text-black"
            >
              <div className="justify-start w-[50%] bg-transparent flex text-start items-center gap-1">
                <div className="flex relative w-fit break-all max-w-[500px] text-wrap bg-[#fff] pr-14 px-3 py-1 rounded-tr-lg rounded-br-lg">
                  <p>
                    {item.message}{" "}
                    <sub className="absolute bottom-3 right-1 ">
                      {item.hours}:{item.minutes}
                    </sub>{" "}
                  </p>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
