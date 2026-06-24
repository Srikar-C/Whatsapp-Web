import url from "../../../url";

export function getFriends(uid, setFriends, setFilteredFriends) {
  fetch(`${url}/getfriends`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid: uid }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      }
      return response.json().then((data) => {
        return Promise.reject(data.message);
      });
    })
    .then((data) => {
      setFriends(data);
      setFilteredFriends(data);
    })
    .catch((err) => {
      alert(err);
      console.log("Left.jsx->Error on getting Friends: " + err);
    });
}

export function checkRequest(uphone, setRequest, setReqFriends) {
  fetch(`${url}/checkrequest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone: uphone }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      }
      return response.json().then((data) => {
        return Promise.reject(data.message);
      });
    })
    .then((data) => {
      setRequest(true);
      setReqFriends(data);
    })
    .catch((err) => {
      if (err !== "No Friend Request found") {
        alert(err);
        console.log("Left.jsx->Error: " + err);
      }
    });
}

export function handleRename(
  uid,
  fid,
  value,
  setFriends,
  setFilteredFriends,
  chatRoom,
  popUp
) {
  fetch(`${url}/rename`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid: uid, fid: fid, value: value }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      }
      return response.json().then((data) => {
        return Promise.reject(data.message);
      });
    })
    .then((data) => {
      popUp("Renamed Successfully");
      getFriends(uid, setFriends, setFilteredFriends);
      chatRoom(
        data.id,
        data.userid,
        data.username,
        data.userphone,
        data.friendname,
        data.friendphone,
        data.status
      );
    })
    .catch((err) => {
      alert(err);
      console.log("Left.jsx->Error: " + err);
    });
}
