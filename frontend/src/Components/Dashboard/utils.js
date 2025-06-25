import url from "../../url";

export function handleChat(uphone, fphone) {
  fetch(`${url}/setdaily`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uphone: uphone,
      fphone: fphone,
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
      console.log("Dashboard.jsx->daily entered");
    })
    .catch((err) => {
      if (err != "Data already inserted") {
        alert(err);
        console.error("Dashboard.jsx->Error on setting daily: " + err);
      }
    });
}
