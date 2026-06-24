import { GrEmoji } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import EmojiPicker from "emoji-picker-react";
import UploadDocs from "./UploadDocs";
import { handleEditMsg, handleMsg } from "./utils";

export default function ChatType({
  status,
  fid,
  uid,
  uphone,
  fphone,
  fname,
  msg,
  det,
  edit,
  onChecked,
  emoji,
  setEmoji,
  emojiRef,
}) {
  const [msgs, setMsgs] = useState("");
  const [cross, setCross] = useState(false);
  const [edits, setEdits] = useState(det.message);
  const [cross2, setCross2] = useState(false);

  useEffect(() => {
    setEdits(det.message);
  }, [det.message]);

  useEffect(() => {
    if (msgs !== "") {
      setCross(true);
    } else {
      setCross(false);
    }
  });

  const onEmojiClick = (emojiObject) => {
    setMsgs((prevMsg) => prevMsg + emojiObject.emoji);
  };

  return (
    <footer className="h-[10vh] flex items-center justify-between px-3 gap-3 rounded-tl-xl rounded-tr-xl bg-[#FFD93D] relative">
      <GrEmoji
        className="text-4xl font-light cursor-pointer"
        title="Add Emojies"
        onClick={() => setEmoji(!emoji)}
      />
      {emoji && (
        <div ref={emojiRef} className="absolute bottom-[10vh] left-3">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
      <UploadDocs />
      {!edit ? (
        status === "2" ? (
          <div className="input flex justify-between w-[80%] h-[70%] items-center bg-[#fff] p-2 rounded-xl">
            <input
              type="text"
              className="w-full bg-transparent outline-none px-5"
              placeholder="Enter message to send"
              onChange={(e) => setMsgs(e.target.value)}
              value={msgs}
            />
            {cross ? (
              <RxCrossCircled
                className="cursor-pointer text-3xl"
                title="erase"
                onClick={() => {
                  setMsgs("");
                  setCross(!cross);
                }}
              />
            ) : (
              ""
            )}
          </div>
        ) : status === "0" ? (
          <div className="flex items-center justify-center w-[80%] h-[70%] tracking-wider">
            {fname.toUpperCase()} Rejected your Friend Request
          </div>
        ) : status === "3" ? (
          <div className="flex items-center justify-center w-[80%] h-[70%] tracking-wider">
            {fname.toUpperCase()} don't want to communicate with you further
          </div>
        ) : (
          <div className="flex items-center justify-center w-[80%] h-[70%] tracking-wider">
            {fname.toUpperCase()} didn't noticed your Friend Request
          </div>
        )
      ) : (
        <div className="input flex justify-between w-[80%] h-[70%] gap-3 items-center bg-[#fff] p-2 rounded-xl">
          <input
            type="text"
            className="w-full bg-transparent outline-none px-5"
            placeholder="Edit message"
            onChange={(e) => setEdits(e.target.value)}
            value={edits}
          />
          {cross2 ? (
            <RxCrossCircled
              className="cursor-pointer text-3xl"
              title="erase"
              onClick={() => {
                setEdits("");
                setCross2(!cross2);
              }}
            />
          ) : (
            ""
          )}
        </div>
      )}
      {!edit ? (
        <IoSend
          className="text-4xl font-light cursor-pointer text-[#000000]"
          title="send"
          onClick={() =>
            handleMsg(msgs, setMsgs, uid, fid, uphone, fphone, onChecked)
          }
        />
      ) : (
        <IoSend
          className="text-4xl font-light cursor-pointer text-[#000000]"
          title="send"
          onClick={() => handleEditMsg(det, onChecked, edits)}
        />
      )}
    </footer>
  );
}
