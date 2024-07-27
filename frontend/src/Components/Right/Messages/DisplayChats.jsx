import MessageDrop from "./MessageDrop";

export default function DisplayChats(props) {
  function handleEdit(prop_fid, prop_uid, prop_id) {
    props.onedit(prop_fid, prop_uid, prop_id);
  }

  return (
    <div className="h-[80vh] flex w-[100%] bg-[#FDFFE2] mx-auto">
      <div className="left w-[50%] flex flex-col gap-3 pt-4 overflow-y-scroll">
        {props.friendmessages?.map((item, index) => {
          return (
            <div className="flex flex-col">
              <p className="h-8"></p>
              <div
                className="flex flex-row items-center justify-between w-[80%] mx-auto border-2 border-white shadow-sm bg-[#5A72A0] text-white font-semibold px-3 py-1 shadow-slate-600 text-left text-wrap rounded-lg"
                key={item.id}
              >
                <p className="w-[70%]">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="w-[1%]"></p>
      <div className="right w-[50%] flex flex-col gap-3 pt-4 overflow-y-scroll">
        {props.usermessages?.map((item, index) => {
          return (
            <div className="flex flex-col">
              <div
                className="flex flex-row items-center justify-between w-[80%] mx-auto border-2 border-white shadow-sm bg-[#83B4FF] text-white font-semibold px-3 py-1 shadow-slate-600 text-left text-wrap rounded-lg"
                key={item.id}
              >
                <p className="w-[70%]">{item.text}</p>
                <p className="border-r-2 border-black w-1 h-full"></p>
                <MessageDrop
                  className="w-[30%]"
                  id={item.id}
                  text={item.text}
                  fid={item.fid}
                  uid={item.uid}
                  edit={() => {
                    handleEdit(item.fid, item.uid, item.id);
                  }}
                  delete={() => {
                    props.ondelete(item.fid, item.uid, item.id);
                  }}
                />
              </div>
              <p className="h-6"></p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
