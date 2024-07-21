import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { BsFillPinAngleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import FriendDrop from "./FriendDrop";
import { TiTick } from "react-icons/ti";

export default function FriendCard(props) {
  const [pin, setPin] = useState(props.pin);
  const [re, setRe] = useState(true);
  const [value, setValue] = useState(props.name);

  function handlePin() {
    fetch("http://localhost:3000/handlepin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fid: props.fidx,
        uid: props.uidx,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 500) {
          return Promise.reject("Error");
        } else if (response.status === 404) {
          return Promise.reject("Friend not found");
        }
      })
      .then((data) => {
        console.log("FriendCard.jsx->Data: " + data);
        if (data.pin === true) {
          setPin(true);
        } else {
          setPin(false);
        }
      })
      .catch((err) => {
        alert(err);
        console.log("FriendCard.jsx->Error: " + err);
      });
  }

  return (
    <Card className="w-[90%] self-center flex flex-row justify-between items-center ">
      {re ? (
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#4F6F52" }} aria-label="recipe">
              {props.name.substring(0, 2).toUpperCase()}
            </Avatar>
          }
          title={props.name}
          subheader={props.phone}
        />
      ) : (
        <div className="flex p-4 gap-2">
          <Avatar sx={{ bgcolor: "#4F6F52" }} aria-label="recipe">
            {props.name.substring(0, 2).toUpperCase()}
          </Avatar>
          <div className="input flex w-fit justify-evenly items-center border-2 border-gray-400 rounded-md">
            <input
              type="text"
              className="border-none outline-none w-[60%]"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <TiTick
              className="text-[#4F6F52] text-2xl cursor-pointer"
              onClick={() => {
                props.rename(props.uidx, props.fidx, value);
                setRe(!re);
              }}
            />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-1 items-center">
        {pin ? <BsFillPinAngleFill className="text-sm " /> : ""}
        <FriendDrop
          name={props.name}
          phone={props.phone}
          fid={props.fidx}
          uid={props.uidx}
          pin={pin}
          onChecked={handlePin}
          rename={() => {
            setRe(!re);
          }}
          ondelete={() => {
            props.delete(props.uidx, props.fidx);
          }}
        />
      </div>
    </Card>
  );
}
