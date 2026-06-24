import url from "../../../../url";

export function handleEditMsg(det, onChecked, edit) {
  fetch(`${url}/editmsg`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: det.id,
      fromphone: det.from,
      tophone: det.to,
      message: edit,
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
      console.log("ChatType.jsx->Error in editing message: " + err);
    });
}

export function handleMsg(msgs, setMsgs, uid, fid, uphone, fphone, onChecked) {
  if (msgs !== "") {
    const date = new Date();
    const hrs = date.getHours() !== 12 ? date.getHours() % 12 : date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    fetch(`${url}/checkdaily`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: uid,
        fid: fid,
        fromphone: uphone,
        tophone: fphone,
        day: day,
        month: month,
        year: year,
        hours: hrs,
        minutes: min,
        seconds: sec,
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
        fetch(`${url}/sendmsg`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: uid,
            fid: fid,
            fromphone: uphone,
            tophone: fphone,
            message: msgs,
            hours: hrs,
            minutes: min,
            seconds: sec,
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
            setMsgs("");
            onChecked();
          })
          .catch((err) => {
            alert(err);
            console.log("ChatType.jsx->Error in sending message: " + err);
          });
      })
      .catch((err) => {
        alert(err);
        console.log("ChatType.jsx->Error in checking daily: " + err);
      });
  } else {
    toast.warn("Enter a message to send");
  }
}
