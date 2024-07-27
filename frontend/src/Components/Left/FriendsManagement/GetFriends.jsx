import { useState } from "react";
import FriendCard from "./FriendCard";

export default function GetFriends(props) {
  const { friends } = props;
  const [pin, setPin] = useState(false);

  function handleChat(e, name, phone, id) {
    props.onChecked(name, phone, id);
  }

  function handleIds(e, prop_fid, prop_uid) {
    fetch("http://localhost:3000/getpin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fid: prop_fid,
        uid: prop_uid,
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

  function handleRename(prop_uid, prop_fid, prop_value) {
    props.onChange(prop_uid, prop_fid, prop_value);
  }

  function handleDelete(prop_uid, prop_fid) {
    props.ondelete(prop_uid, prop_fid);
  }

  return (
    <div className="gap-2 flex flex-col h-[90vh] bg-[#FDFFE2] pt-5 overflow-y-scroll">
      {friends?.map((item, index) => {
        return (
          <div
            className="flex flex-col gap-1 items-center cursor-pointer"
            key={item.id}
            onClick={(e) =>
              handleChat(e, item.friendname, item.friendphone, item.id)
            }
          >
            <FriendCard
              name={item.friendname}
              phone={item.friendphone}
              fidx={item.id}
              uidx={item.uid}
              pin={item.pin}
              onChecked={(e) => handleIds(e, item.id, item.uid)}
              rename={handleRename}
              delete={handleDelete}
            />
            <hr className="text-8xl font-semibold text-black bg-black" />
          </div>
        );
      })}
    </div>
  );
}
