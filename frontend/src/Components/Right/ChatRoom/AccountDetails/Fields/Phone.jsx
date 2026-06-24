import { FaPhoneAlt } from "react-icons/fa";

export default function Phone({ userphone }) {
  return (
    <div className="phone flex flex-row gap-5 items-center">
      <div className="flex gap-2 items-center w-[150px] ">
        <FaPhoneAlt className="text-xl" />
        <h1 className="text-lg">Phone</h1>
      </div>
      <p>:</p>
      <h4 className="w-[220px] text-start">{userphone}</h4>
    </div>
  );
}
