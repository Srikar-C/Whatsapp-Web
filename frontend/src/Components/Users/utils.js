import url from "../../url";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function loginUser(phone, pass, navigate, setPhone, setPass, setSpin) {
     fetch(`${url}/login`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify({
               userphone: phone,
               userpassword: pass,
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
               setPhone("");
               setPass("");
               toast.success("User Exist, Successfully logged in", {
                    duration: 4000,
               });
               setTimeout(() => {
                    navigate(`/${data.username}`, {
                         state: {
                              id: data.userid,
                              name: data.username,
                              email: data.useremail,
                              phone: data.userphone,
                              password: data.userpassword,
                         },
                    });
                    setSpin(false);
               }, 2000);
          })
          .catch((err) => {
               setSpin(false);
               if (err.type === "warn") {
                    toast.warn(err.message);
               } else if (err.type == "info") {
                    toast.info(err.message, { icon: "👤" });
               } else {
                    toast.error(err.message);
               }
               console.log("Login.jsx->Error on logging: " + err.message);
          });
}

export function verifyEmail(email, navigate, phone, pass, name, setSpin) {
     const num = Math.floor(100000 + Math.random() * 900000);
     fetch(`${url}/send-email-register`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify({
               to: email.toLowerCase(),
               subject: "OTP Details",
               text: num,
               phone: phone,
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
               toast.success("OTP sent, Please Verify", {
                    duration: 4000,
               });
               setTimeout(() => {
                    navigate("/verifyacc", {
                         state: {
                              number: num,
                              email: email,
                              phone: phone,
                              pass: pass,
                              name: name,
                         },
                    });
                    setSpin(false);
               }, 2000);
          })
          .catch((err) => {
               setSpin(false);
               if (err.type === "invalid") {
                    toast.warn(err.message);
               } else {
                    toast.error(err.message);
               }
               console.log("Register.jsx->Error on sending OTP: " + err);
          });
}

export function registerUser(email, phone, pass, name, navigate, setSpin) {
     fetch(`${url}/register`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify({
               useremail: email,
               userphone: phone,
               userpassword: pass,
               username: name,
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
               toast.success("Welcome to Whatsapp Web\nPlease Login", {
                    duration: 4000,
               });
               setTimeout(() => {
                    navigate("/login", { state: { useremail: email } });
               }, 3000);
               setSpin(false);
          })
          .catch((err) => {
               setSpin(false);
               if (err.type === "warn") {
                    toast.warn(err.message);
               } else if (err.type === "info") {
                    toast.info(err.message, { icon: "👤" });
               } else {
                    toast.error(err.message);
               }
               navigate("/");
               console.log("Register.jsx->Error on registering: " + err);
          });
}

export function forgotPassword(email, setSpin, navigate) {
     const num = Math.floor(100000 + Math.random() * 900000);
     fetch(`${url}/send-email`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify({
               to: email,
               subject: "OTP Details",
               text: num,
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
               toast.success("OTP sent, Please Confirm", {
                    duration: 4000,
               });
               setTimeout(() => {
                    navigate("/verifypass", {
                         state: { number: num, email: email },
                    });
               }, 2000);
               setSpin(false);
          })
          .catch((err) => {
               setSpin(false);
               if (err.type === "warn") {
                    toast.warn(err.message);
               } else {
                    toast.error(err.message);
               }
               console.log("Forgot.jsx->Error on sending OTP: " + err.message);
          });
}

export function changePassword(useremail, pass, setSpin, navigate) {
     fetch(`${url}/changepassword`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ useremail: useremail, password: pass }),
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
               toast.success("Password changed successfully", {
                    duration: 4000,
               });
               setTimeout(() => {
                    navigate("/login");
               }, 3000);
               setSpin(false);
          })
          .catch((err) => {
               setSpin(false);
               toast.error(err);
               console.log("Passwords.jsx->Error on changing password: " + err);
          });
}
