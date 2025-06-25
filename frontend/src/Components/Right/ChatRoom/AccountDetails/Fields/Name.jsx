import { handleName } from "../Account/utils";
import { FaUserAlt } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

export default function Name({
  userid,
  name,
  username,
  nameval,
  setNameVal,
  onChange,
  setName,
}) {
  return (
    <div className="name flex flex-row gap-5 items-center">
      <div className="flex gap-2 items-center w-[150px] ">
        <FaUserAlt className="text-xl" />
        <h1 className="text-lg">Name</h1>
      </div>
      <p>:</p>
      {name ? (
        <h4 className="w-[220px] text-start">{username}</h4>
      ) : (
        <div className="flex bg-white shadow-inner shadow-gray-300 items-center px-2 py-1">
          <input
            type="text"
            value={nameval}
            onChange={(e) => setNameVal(e.target.value)}
            placeholder="Change your Username"
            className="bg-transparent outline-none border-none"
          />
          <TiTick
            className="text-xl cursor-pointer"
            onClick={() => {
              handleName(userid, nameval, setName, name);
              onChange();
            }}
          />
        </div>
      )}
      <button
        type="submit"
        onClick={() => setName(!name)}
        className="px-2 py-1 bg-black hover:bg-white text-white hover:text-black border-2 border-white hover:border-black rounded-sm "
      >
        Edit
      </button>
    </div>
  );
}
