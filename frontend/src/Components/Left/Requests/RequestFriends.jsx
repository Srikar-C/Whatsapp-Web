import FriendRequestCard from "./FriendRequestCard";
import { IoReturnUpBack } from "react-icons/io5";

export default function RequestFriends(props) {
  const { friends } = props;

  return (
    <div className=" flex flex-col h-[90vh] bg-[#FDFFE2] pt-3 gap-3 overflow-y-scroll">
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => {
          props.onChange();
        }}
      >
        <IoReturnUpBack className="pl-4 text-3xl w-fit font-black " />
        <p>Back</p>
      </div>
      {friends?.map((item, index) => {
        return (
          <div
            className="flex flex-col gap-1 items-center cursor-pointer"
            key={item.id}
          >
            <FriendRequestCard
              idx={item.id}
              fromname={item.fromname}
              fromphone={item.fromphone}
              toname={item.toname}
              tophone={item.tophone}
              userid={props.userid}
              onChecked={() => {
                props.onChecked();
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
