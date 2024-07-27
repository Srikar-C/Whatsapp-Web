import { Avatar } from "@mui/material";
import ChatSearch from "./ChatSearch";

export default function ChatNav(props) {
  console.log(
    "ChatNav.jsx-> " +
      "name: " +
      props.name +
      " phone: " +
      props.phone +
      " idx: " +
      props.friendidx
  );

  return (
    // <nav className="bg-[#5A72A0] h-[10vh] mx-auto flex justify-between items-center px-2">
    <nav className="bg-[#1A2130] h-[10vh] w-[100%] flex justify-between items-center px-2">
      <header className="flex flex-row items-center justify-between gap-10">
        <Avatar
          sx={{
            bgcolor: "#FDFFE2",
            fontSize: "16px",
            color: "#1A2130",
            fontWeight: "600",
          }}
        >
          {props.name.substring(0, 2).toUpperCase()}
        </Avatar>
        <nav className="flex flex-col items-center ">
          <h1 className="text-white font-semibold text-xl uppercase">
            {props.name}
          </h1>
          <p className="text-white text-sm font-light">{props.phone}</p>
        </nav>
      </header>
      <nav className="flex flex-row gap-3 items-center">
        <ChatSearch />
      </nav>
    </nav>
    // </nav>
  );
}
