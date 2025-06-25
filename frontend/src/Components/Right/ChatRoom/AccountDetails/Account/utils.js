import url from "../../../../../url";
import { toast } from "react-toastify";

export function sendOtp(setSpin, setOtpVal, useremail) {
  setSpin(true);
  const num = Math.floor(100000 + Math.random() * 900000);
  setOtpVal(num);
  setTimeout(() => {
    fetch(`${url}/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: useremail,
        subject: "OTP for Verification",
        text: num,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        setSpin(false);
        toast.success("OTP sent, Check and Enter");
      })
      .catch((err) => {
        toast.error(err);
        console.log("Account.jsx->Error on sending OTP: " + err);
      });
  }, 5000);
}

export function handleName(userid, nameval, setName, name) {
  fetch(`${url}/nameupdate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: userid, name: nameval }),
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
      setName(!name);
      toast.success("Name changed");
    })
    .catch((err) => {
      toast.error(err);
      console.log("Account.jsx->Error in updating name: " + err);
    });
}

export function handlePass(userid, passval, setPass, pass) {
  fetch(`${url}/passupdate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: userid, pass: passval }),
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
      setPass(!pass);
      toast.success("Password changed");
    })
    .catch((err) => {
      toast.error(err);
      console.log("Account.jsx->Error in updating pass: " + err);
    });
}
