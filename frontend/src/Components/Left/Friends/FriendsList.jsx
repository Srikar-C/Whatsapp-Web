import React from "react";
import Cards from "./Cards";

export default function FriendsList(props) {
  const { friends } = props;

  function handleChat(e, name, phone, fidx) {
    props.onChecked(name, phone, fidx);
    console.log("FriendsList: ", name, phone, fidx);
  }

  function handleNewName(fid, uid, name, phone) {
    props.onChange(fid, uid, name, phone);
  }

  return (
    <div className="gap-1 flex flex-col h-[80vh] overflow-scroll">
      {friends.map((item, index) => {
        return (
          <div
            className="flex flex-col gap-1 items-center cursor-pointer"
            key={item.id}
            onClick={(e) => handleChat(e, item.name, item.phone, item.id)}
          >
            <Cards
              name={item.name}
              phone={item.phone}
              fidx={item.id}
              uidx={props.userId}
              onChecked={handleNewName}
            />
            <hr className="text-8xl font-semibold text-black bg-black" />
          </div>
        );
      })}
    </div>
  );
}
