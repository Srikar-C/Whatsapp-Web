import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";

export default function ChatNav({ uid, uname, uphone, fname, fphone }) {
  return (
    <div className="flex flex-row bg-[#FFD93D] w-full h-[10vh] items-center px-3 shadow-lg">
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
          fname.substring(0, 1).toUpperCase() + fname.substring(1).toLowerCase()
        }
        subheader={fphone}
      />
    </div>
  );
}
