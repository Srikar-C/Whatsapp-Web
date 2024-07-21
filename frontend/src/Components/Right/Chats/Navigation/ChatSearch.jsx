import { FaSearch } from "react-icons/fa";

export default function ChatSearch() {
  return (
    <nav className="bg-transparent h-[10vh] items-center flex px-2 ">
      <div className="border-b-2 border-black shadow-inner shadow-[#4F6F52] flex flex-row gap-3 w-full p-2 rounded-md">
        <FaSearch className="text-2xl text-white" />
        <input
          type="text"
          placeholder="Enter name to Filter"
          className="bg-transparent w-full outline-none border-none text-white"
        />
      </div>
    </nav>
  );
}
