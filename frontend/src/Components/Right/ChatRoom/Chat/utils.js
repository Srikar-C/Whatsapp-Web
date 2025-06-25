import url from "../../../../url";

export function getChats(uphone, fphone, setChat, setEdit) {
  fetch(`${url}/getchats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone1: uphone, phone2: fphone }),
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
      setChat(data);
      setEdit(false);
    })
    .catch((err) => {
      alert(err);
      console.log("Chat.jsx->Error on geting chats : " + err);
    });
}

export function handleDelete(
  id,
  fromphone,
  tophone,
  popUp,
  getChats,
  uphone,
  fphone,
  setChat,
  setEdit
) {
  fetch(`${url}/deletechat`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id, fromphone: fromphone, tophone: tophone }),
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
      popUp("Chat Deleted Successfully");
      getChats(uphone, fphone, setChat, setEdit);
    })
    .catch((err) => {
      alert(err);
      console.log("Chat.jsx->Error on deleting chat: " + err);
    });
}
