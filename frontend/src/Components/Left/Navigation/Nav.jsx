import { SiWhatsapp } from "react-icons/si";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { useState } from "react";
import Navdrop from "./Navdrop";

export default function Nav(props) {
  const [add, setAdd] = useState(!props.onChecked);

  return (
    <nav className="bg-[#4F6F52] h-[10vh] flex justify-between items-center px-2">
      <header className="">
        <SiWhatsapp className="text-4xl text-white " />
      </header>
      <p className="text-white uppercase font-semibold">{props.userName}</p>
      <nav className="flex flex-row gap-3 items-center">
        <MdOutlineAddToPhotos
          className="text-2xl text-white cursor-pointer"
          title="Add Friends"
          onClick={() => {
            setAdd(!add);
            console.log("Nav.jsx Add Friend Toggle: ", add);
            props.onChange(add);
          }}
        />
        <Navdrop />
      </nav>
    </nav>
  );
}
