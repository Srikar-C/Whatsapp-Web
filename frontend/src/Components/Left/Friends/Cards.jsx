import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Userdrop from "./Userdrop";
import { BsFillPinAngleFill } from "react-icons/bs";
import { useState } from "react";

export default function Cards(props) {
  const [pin, setPin] = useState(false);

  function handlePin(propsPin) {
    setPin(propsPin);
  }

  function handleName(newName) {
    props.onChecked(props.fidx, props.uidx, newName, props.phone);
  }

  return (
    <Card className="w-[90%] self-center flex flex-row justify-between items-center ">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#4F6F52" }} aria-label="recipe">
            {props.name.substring(0, 2).toUpperCase()}
          </Avatar>
        }
        title={props.name}
        subheader={props.phone}
      />
      <div className="flex flex-col gap-1 items-center">
        {pin ? <BsFillPinAngleFill className="text-sm " /> : ""}
        <Userdrop
          onChecked={handlePin}
          name={props.name}
          phone={props.phone}
          fid={props.fidx}
          uid={props.uidx}
          onChange={handleName}
        />
      </div>
    </Card>
  );
}
