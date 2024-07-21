import { SiWhatsapp } from "react-icons/si";
import { MdOutlineAddToPhotos } from "react-icons/md";
import Navdrop from "./Navdrop";

export default function Navigation(props) {
  return (
    <nav className="bg-[#4F6F52] h-[10vh] flex justify-between items-center px-2">
      <header className="">
        <SiWhatsapp className="text-4xl text-white " />
      </header>
      <p className="text-white uppercase font-semibold">{props.username}</p>
      <nav className="flex flex-row gap-3 items-center">
        <MdOutlineAddToPhotos
          className="text-2xl text-white cursor-pointer"
          title="Add Friends"
          onClick={() => {
            props.isFriend();
          }}
        />
        <Navdrop />
      </nav>
    </nav>
  );
}
