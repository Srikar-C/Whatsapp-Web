import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { LuArrowDownLeft } from "react-icons/lu";

export default function ChatDrop({
  id,
  fromphone,
  tophone,
  message,
  minutes,
  hours,
  onDelete,
  onEdit,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const date = new Date();
  const min = date.getMinutes();
  const hrs = date.getHours() != 12 ? date.getHours() % 12 : date.getHours();

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
        <LuArrowDownLeft className="text-xl text-black font-normal" />
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
        {Math.abs(min - minutes) <= 5 && Math.abs(hrs - hours) == 0 && (
          <MenuItem
            onClick={() => {
              onEdit(id, fromphone, tophone, message);
              handleClose();
            }}
          >
            Edit
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            onDelete(id, fromphone, tophone);
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
