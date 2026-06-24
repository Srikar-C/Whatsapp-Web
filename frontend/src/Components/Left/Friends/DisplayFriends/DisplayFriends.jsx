import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import FriendCard from "./FriendCard/FriendCard";

export default function DisplayFriends({
  friends,
  onChange,
  onChat,
  onChecked,
}) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex overflow-y-auto flex-col gap-3 text-[#4F200D] mt-4">
      {friends?.map((item) => {
        return (
          <div
            key={item.fid}
            onClick={() => {
              onChat(
                item.fid,
                item.userid,
                item.username,
                item.userphone,
                item.friendname,
                item.friendphone,
                item.status
              );
            }}
            className="w-[80%] mx-auto cursor-pointer"
            data-aos="fade-right"
          >
            <FriendCard
              fid={item.fid}
              uid={item.userid}
              uname={item.username}
              uphone={item.userphone}
              fname={item.friendname}
              fphone={item.friendphone}
              pin={item.pin}
              status={item.status}
              onChecked={onChange}
              rename={(uid, fid, value) => {
                onChecked(uid, fid, value);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
