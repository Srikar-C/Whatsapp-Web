import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

export default function FriendDrop({
  fid,
  uid,
  uname,
  uphone,
  fname,
  fphone,
  pin,
  status,
  onChecked,
  onDelete,
  rename,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [pins, setPins] = useState(true);
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
            setPins(!pins);
            onChecked();
            handleClose();
          }}
        >
          {pin ? "UnPin" : "Pin"}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            rename();
          }}
        >
          Rename
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDelete(fid, uid, uphone, fphone, status);
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
