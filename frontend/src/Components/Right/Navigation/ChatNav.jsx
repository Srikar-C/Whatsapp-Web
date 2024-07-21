import { Avatar } from "@mui/material";
import ChatSearch from "./ChatSearch";
import ChatNavdrop from "./ChatNavdrop";

export default function ChatNav(props) {
  return (
    <nav className="bg-[#4F6F52] h-[10vh] mx-auto flex justify-between items-center px-2">
      <nav className="bg-[#4F6F52] h-[10vh] w-[100%] flex justify-between items-center px-2">
        <header className="flex flex-row items-center justify-between gap-10">
          <Avatar>{props.name.substring(0, 2)}</Avatar>
          <nav className="flex flex-col items-center ">
            <h1 className="text-white font-semibold text-xl uppercase">
              {props.name}
            </h1>
            <p className="text-white text-sm font-light">{props.phone}</p>
          </nav>
        </header>
        <nav className="flex flex-row gap-3 items-center">
          <ChatSearch />
          <ChatNavdrop />
        </nav>
      </nav>
    </nav>
  );
}
