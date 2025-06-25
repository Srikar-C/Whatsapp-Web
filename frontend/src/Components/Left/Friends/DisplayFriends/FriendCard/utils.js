import url from "../../../../../url";

export function handlePin(fid, uid, setPins, onChecked) {
  fetch(`${url}/changepin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fid: fid, uid: uid }),
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
      if (data.pin === true) {
        setPins(true);
      } else {
        setPins(false);
      }
      onChecked();
    })
    .catch((err) => {
      alert(err);
      console.log("FriendCard.jsx->Error is: " + err);
    });
}

export function handleDelete(fid, uid, uphone, fphone, status, onChecked) {
  fetch(`${url}/deletefriend_chat`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone1: uphone,
      phone2: fphone,
      uid: uid,
      fid: fid,
      status: status,
    }),
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
      onChecked();
    })
    .catch((err) => {
      alert(err);
      console.log("FriendCard.jsx->Error is: " + err);
    });
}
