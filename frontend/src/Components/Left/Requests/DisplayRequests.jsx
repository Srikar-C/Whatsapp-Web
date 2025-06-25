import RequestCard from "./RequestCard";
import { IoReturnUpBack } from "react-icons/io5";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function DisplayRequests({ requests, uid, onChange }) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div
      className=" flex flex-col h-[90vh] bg-[#F6F1E9] pt-3 gap-3"
      data-aos="fade-right"
    >
      <div
        className="flex gap-2 items-center cursor-pointer text-[#4F200D]"
        onClick={() => {
          onChange();
        }}
      >
        <IoReturnUpBack className="pl-4 text-3xl w-fit font-black " />
        <p>Back</p>
      </div>
      <div className="flex flex-col gap-4 text-[#4F200D] mt-2">
        {requests?.map((item) => {
          return (
            <div key={item.rid} className="w-[80%] mx-auto">
              <RequestCard
                id={item.rid}
                uid={uid}
                fromname={item.fromname}
                fromphone={item.fromphone}
                toname={item.toname}
                tophone={item.tophone}
                onChecked={() => onChange()}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
