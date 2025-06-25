import { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { getFriends } from "./utils";
import { FaUserCircle } from "react-icons/fa";
import { GoNumber } from "react-icons/go";

export default function Search({
  mapName,
  mapPhone,
  uid,
  setFriends,
  setFilteredFriends,
}) {
  const [sort, setSort] = useState(false);
  const [search, setSearch] = useState("");
  const [swap, setSwap] = useState(false);

  useEffect(() => {
    if (search !== "") {
      setSort(true);
    } else {
      setSort(false);
    }
  });

  function handleSortByName(e) {
    const value = e.target.value;
    setSearch(value);
    mapName(value);
  }

  function handleSortByPhone(e) {
    const value = e.target.value;
    setSearch(value);
    mapPhone(value);
  }

  return (
    <div className="flex h-[10vh] items-center w-full bg-[#FFD93D] justify-around shadow-xl p-3">
      {swap ? (
        <div className="bg-white text-black w-full p-2 rounded-xl flex items-center">
          <IoSearch className="text-2xl" />
          <input
            type="text"
            value={search}
            placeholder="Search by name"
            className="border-none outline-none bg-transparent w-[90%] px-4 text-black"
            onChange={(e) => {
              handleSortByName(e);
            }}
          />
          <GoNumber
            title="serach by number"
            onClick={() => setSwap(!swap)}
            className="cursor-pointer text-2xl mx-3"
          />
          {sort && (
            <RxCrossCircled
              className="cursor-pointer text-2xl text-black"
              title="erase"
              onClick={() => {
                setSearch("");
                getFriends(uid, setFriends, setFilteredFriends);
                setSort(false);
              }}
            />
          )}
        </div>
      ) : (
        <div className="bg-white text-black w-full p-2 rounded-xl flex items-center">
          <IoSearch className="text-2xl" />
          <input
            type="text"
            value={search}
            placeholder="Search by phone number"
            className="border-none outline-none bg-transparent w-[90%] px-4 text-black"
            onChange={(e) => {
              handleSortByPhone(e);
            }}
          />
          <FaUserCircle
            title="serach by name"
            onClick={() => setSwap(!swap)}
            className="cursor-pointer text-2xl mx-3"
          />
          {sort && (
            <RxCrossCircled
              className="cursor-pointer text-2xl text-black"
              title="erase"
              onClick={() => {
                setSearch("");
                getFriends(uid, setFriends, setFilteredFriends);
                setSort(false);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
