import bg from "../../assets/right.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Right() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div
      className="flex mx-auto w-full items-center h-full justify-center bg-[#FAEC0C] "
      data-aos="fade-left"
    >
      <img src={bg} className="opacity-70 h-[500px] w-[600px] grayscale" />
    </div>
  );
}
