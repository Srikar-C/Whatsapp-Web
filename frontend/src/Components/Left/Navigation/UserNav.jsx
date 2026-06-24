import { SiWhatsapp } from "react-icons/si";
import { MdOutlineGroupAdd } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import UserDrop from "./UserDrop";

export default function UserNav({
  uname,
  uid,
  addFriend,
  onChange,
  onRight,
  handleSearch,
}) {
  return (
    <div className="*:transition-all w-full h-[10vh] flex flex-row gap-3 justify-between bg-[#FFD93D] text-[#4F200D] px-2 py-2 items-center shadow-xl ">
      <SiWhatsapp className="text-3xl cursor-pointer" onClick={onRight} />
      <p className="text-xl uppercase font-semibold w-[70%] text-center">
        {uname}
      </p>
      <IoSearch
        className="text-3xl cursor-pointer"
        onClick={() => {
          handleSearch();
        }}
      />
      <MdOutlineGroupAdd
        className="text-3xl cursor-pointer"
        onClick={() => {
          addFriend();
        }}
      />
      <UserDrop onChange={() => onChange()} />
    </div>
  );
}
