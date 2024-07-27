import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

export default function FriendRequestCard(props) {
  function acceptRequest() {
    fetch("http://localhost:3000/acceptreq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: props.userid,
        username: props.toname,
        userphone: props.tophone,
        friendname: props.fromname,
        friendphone: props.fromphone,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 500) {
          return Promise.reject("Error");
        }
      })
      .then((data) => {
        alert("Friend Request Accepted");
      })
      .catch((err) => {
        alert(err);
        console.log("FriendRequestCard.jsx-> Error: " + err);
      });
  }

  function deleteRequest() {
    fetch("http://localhost:3000/deletereq", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: props.fromname,
        userphone: props.fromphone,
        friendname: props.toname,
        friendphone: props.tophone,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 500) {
          return Promise.reject("Error");
        }
      })
      .then((data) => {
        alert("Friend Request Rejected");
        props.onChecked();
      })
      .catch((err) => {
        alert(err);
        console.log("FriendRequestCard.jsx-> Error: " + err);
      });
  }

  return (
    <div className="bg-white w-[90%] self-center rounded-lg flex flex-col items-center shadow-sm shadow-black">
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: "#1A2130", fontSize: "16px" }}
            aria-label="recipe"
          >
            {props.fromname.substring(0, 2).toUpperCase()}
          </Avatar>
        }
        title={
          props.fromname.substring(0, 1).toUpperCase() +
          props.fromname.substring(1).toLowerCase()
        }
        subheader={props.fromphone}
      />
      <div className="btm flex flex-row justify-around items-center w-[80%] pb-3">
        <div
          className="flex flex-row gap-0 items-center *:text-[#4F6F52] shadow-sm shadow-black p-2 rounded-md *:hover:text-white hover:bg-[#4F6F52]"
          onClick={() => {
            acceptRequest();
            deleteRequest();
          }}
        >
          <TiTick className="text-2xl" />
          <p>Accept</p>
        </div>
        <div
          className="flex flex-row gap-1 items-center *:text-[#b92c2c] shadow-sm shadow-black p-2 rounded-md *:hover:text-white hover:bg-[#b92c2c]"
          onClick={deleteRequest}
        >
          <ImCross className="text-sm" />
          <p>Reject</p>
        </div>
      </div>
    </div>
  );
}
