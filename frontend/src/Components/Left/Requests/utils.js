import url from "../../../url";

export function acceptRequest(uid, toname, tophone, fromname, fromphone) {
  fetch(`${url}/acceptreq`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      uid: uid,
      username: toname,
      userphone: tophone,
      friendname: fromname,
      friendphone: fromphone,
      status: 2,
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
      console.log("RequestCard.jsx->Request Accepted");
    })
    .catch((err) => {
      alert(err);
      console.log("RequestCard.jsx->Error in accepting request: " + err);
    });
}

export function removeRequest(id) {
  fetch(`${url}/removereq`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      rid: id,
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
      console.log("RequestCard.jsx->Request Deleted");
    })
    .catch((err) => {
      alert(err);
      console.log("RequestCard.jsx->Error in deleting request: " + err);
    });
}

export function updateRequest(fromphone, tophone) {
  fetch(`${url}/updatereq`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userphone: fromphone,
      friendphone: tophone,
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
      console.log("RequestCard.jsx->Request Updated");
    })
    .catch((err) => {
      alert(err);
      console.log("RequestCard.jsx->Error in updating request: " + err);
    });
}

export function changeRequest(fromphone, tophone) {
  fetch(`${url}/changereq`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userphone: fromphone,
      friendphone: tophone,
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
      console.log("RequestCard.jsx->Request Changed");
    })
    .catch((err) => {
      alert(err);
      console.log("RequestCard.jsx->Error in changing request: " + err);
    });
}
