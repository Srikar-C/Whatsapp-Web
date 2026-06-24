import Navigation from "./Navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "../Users/usercss.css";
import Video from "./Video";
import Chatting from "./Chatting";

export default function Landing() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="gradient-bg flex flex-col h-[165vh] overflow-x-hidden">
      <Navigation />
      <Video />
      <Chatting />
    </div>
  );
}
