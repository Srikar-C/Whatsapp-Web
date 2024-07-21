import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

export default function FriendDrop(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [pin, setPin] = useState(true);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <PiDotsThreeOutlineVerticalFill className="text-xl text-black font-normal" />
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => {
            setPin(!pin);
            props.onChecked(pin);
            handleClose();
          }}
        >
          {props.pin ? "UnPin" : "Pin"}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            props.rename();
          }}
        >
          Rename
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.ondelete();
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
