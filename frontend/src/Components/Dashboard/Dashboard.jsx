import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../App.css";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Right from "./../Right/Right";
import url from "../../url.jsx";
import Account from "../Right/ChatRoom/AccountDetails/Account/Account.jsx";
import { handleChat } from "./utils";
import Left from "../Left/LeftBar/Left.jsx";
import Chat from "../Right/ChatRoom/Chat/Chat.jsx";

export default function Dashboard() {
  const location = useLocation();
  const { id, name, email, phone, password } = location.state || {};
  const [uid, setUId] = useState(id);
  const [uname, setUName] = useState(name);
  const [uemail, setUEmail] = useState(email);
  const [uphone, setUPhone] = useState(phone);
  const [upassword, setUPassword] = useState(password);
  const [right, setRight] = useState(<Right />);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    getUser();
  }, [uid]);

  function getUser() {
    fetch(`${url}/getUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: uid,
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
        setUId(data.userid);
        setUName(data.username);
        setUEmail(data.useremail);
        setUPhone(data.userphone);
        setUPassword(data.userpassword);
        navigate(`/${data.username}`, {
          state: {
            id: data.userid,
            name: data.username,
            email: data.useremail,
            phone: data.userphone,
            password: data.userpassword,
          },
        });
        setRight(
          <Account
            userid={data.userid}
            username={data.username}
            useremail={data.useremail}
            userphone={data.userphone}
            userpassword={data.userpassword}
            onChange={() => getUser()}
          />
        );
        setRight(<Right />);
      })
      .catch((err) => {
        alert(err);
        console.error("Dashboard.jsx->Error on Getting User Details: " + err);
      });
  }

  return (
    <div className="flex flex-row w-screen overflow-hidden">
      <ToastContainer
        hideProgressBar="false"
        position="top-center"
        transition={Slide}
        autoClose={5000}
      />
      <div className="w-[30%]" data-aos="fade-right">
        <Left
          uid={uid}
          uname={uname}
          uemail={uemail}
          uphone={uphone}
          upassword={upassword}
          chatRoom={(fid, uid, uname, uphone, fname, fphone, status) => {
            handleChat(uphone, fphone);
            setRight(
              <Chat
                fid={fid}
                uid={uid}
                uname={uname}
                uphone={uphone}
                fname={fname}
                fphone={fphone}
                status={status}
                popUp={(data) => toast.success(data)}
              />
            );
          }}
          onChange={() => setRight(<Right />)}
          displayUserDetails={(uid, uname, uemail, uphone, upassword) =>
            setRight(
              <Account
                userid={uid}
                username={uname}
                useremail={uemail}
                userphone={uphone}
                userpassword={upassword}
                onChange={() => getUser()}
              />
            )
          }
          onRight={() => setRight(<Right />)}
          popUp={(data) => toast.success(data)}
        />
      </div>
      <div className="right w-[70%]" data-aos="fade-left">
        {right}
      </div>
    </div>
  );
}
