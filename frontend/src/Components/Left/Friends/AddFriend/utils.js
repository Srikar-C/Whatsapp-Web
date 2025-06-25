import { toast } from "react-toastify";
import url from "../../../../url";

export function addFriend(uid, uname, uphone, name, phone) {
  fetch(`${url}/addfriend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid: uid,
      uname: uname,
      uphone: uphone,
      fname: name,
      fphone: phone,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      }
      return response.json().then((data) => {
        return Promise.reject(data);
      });
    })
    .then((data) => {
      toast.success("Friend Added", { duration: 4000 });
      setTimeout(() => {}, 5000);
    })
    .catch((err) => {
      if (err.type === "info") {
        toast.info(err.message);
      } else {
        toast.error(err.message);
      }
      console.log("AddFriend.jsx->Error on adding friend: " + err.message);
    });
}

export function requestFriend(uname, uphone, name, phone) {
  fetch(`${url}/requestfriend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fromname: uname,
      fromphone: uphone,
      toname: name,
      tophone: phone,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      }
      return response.json().then((data) => {
        return Promise.reject(data);
      });
    })
    .then((data) => {
      toast.success("Request Sent", { duration: 4000 });
      setTimeout(() => {}, 5000);
    })
    .catch((err) => {
      if (err.type === "info") {
        toast.info(err.message);
      } else {
        toast.error(err.message);
      }
      console.log("AddFriend.jsx->Error on request friend: " + err.message);
    });
}
