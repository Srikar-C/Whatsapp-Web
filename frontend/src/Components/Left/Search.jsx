import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function Search() {
  const [value, setValue] = useState("");

  return (
    <nav className="bg-[#E7F0DC] h-[10vh] items-center flex px-2 ">
      <div className="border-2 border-black shadow-inner shadow-[#4F6F52] flex flex-row gap-3 w-full p-2 rounded-md">
        <FaSearch className="text-2xl text-[#1A4D2E]" />
        <input
          type="text"
          placeholder="Enter name to Filter"
          className="bg-transparent w-full outline-none border-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </nav>
  );
}
