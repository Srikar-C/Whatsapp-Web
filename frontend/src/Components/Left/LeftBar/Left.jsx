import { useEffect, useState } from "react";
import Search from "./Search";
import { checkRequest, getFriends, handleRename } from "./utils";
import UserNav from "./../Navigation/UserNav";
import AddFriend from "./../Friends/AddFriend/AddFriend";
import DisplayFriends from "./../Friends/DisplayFriends/DisplayFriends";
import DisplayRequests from "./../Requests/DisplayRequests";

export default function Left({
  uid,
  uname,
  uemail,
  uphone,
  upassword,
  chatRoom,
  onChange,
  displayUserDetails,
  onRight,
  popUp,
}) {
  const [isadd, setAdd] = useState(false);
  const [search, setSearch] = useState(false);
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [request, setRequest] = useState(false);
  const [reqFriends, setReqFriends] = useState([]);
  const [display, setDisplay] = useState(false);

  function sortFriends(val) {
    if (val === "") {
      setFilteredFriends(friends);
    } else {
      const filtered = friends.filter((friend) =>
        friend.friendname.toLowerCase().includes(val.toLowerCase())
      );
      setFilteredFriends(filtered);
    }
  }

  function sortPhones(val) {
    if (val === "") {
      setFilteredFriends(friends);
    } else {
      const filtered = friends.filter((friend) =>
        friend.friendphone.includes(val)
      );
      setFilteredFriends(filtered);
    }
  }

  useEffect(() => {
    getFriends(uid, setFriends, setFilteredFriends);
    checkRequest(uphone, setRequest, setReqFriends);
  }, [uid]);

  return (
    <div className="flex flex-col h-screen bg-[#F6F1E9] text-white border-r-2 border-black ">
      <UserNav
        uname={uname}
        uid={uid}
        addFriend={() => setAdd(!isadd)}
        onChange={() =>
          displayUserDetails(uid, uname, uemail, uphone, upassword)
        }
        onRight={onRight}
        handleSearch={() => {
          setSearch(!search);
        }}
      />
      {search && (
        <Search
          mapName={sortFriends}
          mapPhone={sortPhones}
          uid={uid}
          setFriends={setFriends}
          setFilteredFriends={setFilteredFriends}
        />
      )}
      {request && (
        <div
          onClick={() => {
            setRequest(false);
            setDisplay(true);
          }}
          className="text-center cursor-pointer bg-[#fffb00] text-[#4F200D] w-full h-[5vh] flex items-center justify-center"
        >
          Friend Requests
        </div>
      )}
      {isadd ? (
        <AddFriend
          uid={uid}
          uname={uname}
          uphone={uphone}
          onChange={() => {
            setAdd(!isadd);
            getFriends(uid, setFriends, setFilteredFriends);
          }}
        />
      ) : (
        ""
      )}
      {display ? (
        <DisplayRequests
          requests={reqFriends}
          uid={uid}
          onChange={() => {
            getFriends(uid, setFriends, setFilteredFriends);
            checkRequest(uphone, setRequest, setReqFriends);
            setDisplay(false);
          }}
        />
      ) : (
        <DisplayFriends
          friends={filteredFriends}
          onChange={() => {
            getFriends(uid, setFriends, setFilteredFriends);
            onChange();
          }}
          onChat={(fid, uid, uname, uphone, fname, fphone, status) => {
            chatRoom(fid, uid, uname, uphone, fname, fphone, status);
            setSearch(false);
          }}
          onChecked={(uid, fid, value) =>
            handleRename(
              uid,
              fid,
              value,
              setFriends,
              setFilteredFriends,
              chatRoom,
              popUp
            )
          }
        />
      )}
    </div>
  );
}
