import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { BsFillPinAngleFill } from "react-icons/bs";
import { useState } from "react";
import { TiTick } from "react-icons/ti";
import { handleDelete, handlePin } from "./utils";
import FriendDrop from "./FriendDrop";

export default function FriendCard({
  fid,
  uid,
  uname,
  uphone,
  fname,
  fphone,
  pin,
  status,
  onChecked,
  rename,
}) {
  const [pins, setPins] = useState(pin);
  const [edit, setEdit] = useState(true);
  const [value, setValue] = useState(fname);

  return (
    <Card className="w-[100%] self-center flex flex-row justify-between items-center">
      {edit ? (
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: "#4F200D", fontSize: "16px" }}
              aria-label="recipe"
            >
              {fname.substring(0, 2).toUpperCase()}
            </Avatar>
          }
          title={
            fname.substring(0, 1).toUpperCase() +
            fname.substring(1).toLowerCase()
          }
          subheader={fphone}
        />
      ) : (
        <div className="flex p-4 gap-2">
          <Avatar sx={{ bgcolor: "#4F200D" }} aria-label="recipe">
            {fname.substring(0, 2).toUpperCase()}
          </Avatar>
          <div className="input flex w-fit justify-evenly items-center border-2 border-gray-400 rounded-md">
            <input
              type="text"
              className="border-none outline-none w-[60%]"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <TiTick
              onClick={() => {
                rename(uid, fid, value);
                setEdit(!edit);
              }}
              className="text-[#4F6F52] text-2xl cursor-pointer"
            />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-1 items-center">
        {pin ? <BsFillPinAngleFill className="text-sm " /> : ""}
        <FriendDrop
          fid={fid}
          uid={uid}
          uname={uname}
          uphone={uphone}
          fname={fname}
          fphone={fphone}
          pin={pins}
          status={status}
          onChecked={() => handlePin(fid, uid, setPins, onChecked)}
          onDelete={() =>
            handleDelete(fid, uid, uphone, fphone, status, onChecked)
          }
          rename={() => setEdit(!edit)}
        />
      </div>
    </Card>
  );
}
