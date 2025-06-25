import video from "../../assets/video.mp4";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Video() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="video1 flex gap-10 h-[90vh] justify-evenly items-center">
      <div
        className="text-3xl w-[30%] flex flex-col gap-4"
        data-aos="fade-right"
      >
        <h1>Find your Friends Requests</h1>
        <p className="text-lg text-gray-400">
          Friends who want to connect with you may sent their request. Check and
          give response
        </p>
      </div>
      <video
        width="700"
        height="650"
        muted
        autoPlay
        loop
        className="mt-[10vh] rounded-lg"
        data-aos="fade-left"
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}
