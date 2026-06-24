import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import {
  acceptRequest,
  changeRequest,
  removeRequest,
  updateRequest,
} from "./utils";

export default function RequestCard({
  id,
  uid,
  fromname,
  fromphone,
  toname,
  tophone,
  onChecked,
}) {
  return (
    <div className="bg-white w-[90%] self-center rounded-lg flex flex-col items-center shadow-sm shadow-black">
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: "#4F200D", fontSize: "16px" }}
            aria-label="recipe"
          >
            {fromname.substring(0, 2).toUpperCase()}
          </Avatar>
        }
        title={
          fromname.substring(0, 1).toUpperCase() +
          fromname.substring(1).toLowerCase()
        }
        subheader={fromphone}
      />
      <div className="btm flex flex-row justify-around items-center w-[80%] pb-3">
        <div
          onClick={() => {
            acceptRequest(uid, toname, tophone, fromname, fromphone);
            removeRequest(id);
            updateRequest(fromphone, tophone);
            onChecked();
          }}
          className="cursor-pointer flex flex-row gap-0 items-center *:text-[#4F6F52] shadow-sm shadow-black p-2 rounded-md *:hover:text-white hover:bg-[#4F6F52]"
        >
          <TiTick className="text-2xl" />
          <p>Accept</p>
        </div>
        <div
          onClick={() => {
            removeRequest(id);
            changeRequest(fromphone, tophone);
            onChecked();
          }}
          className="cursor-pointer flex flex-row gap-1 items-center *:text-[#b92c2c] shadow-sm shadow-black p-2 rounded-md *:hover:text-white hover:bg-[#b92c2c]"
        >
          <ImCross className="text-sm" />
          <p>Reject</p>
        </div>
      </div>
    </div>
  );
}
