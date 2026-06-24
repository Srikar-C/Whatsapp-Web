import React, { useRef } from "react";
import { RiAttachment2 } from "react-icons/ri";

export default function UploadDocs() {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
    }
  };

  return (
    <div>
      <RiAttachment2
        className="text-4xl font-light cursor-pointer"
        title="Attachments"
        onClick={handleButtonClick}
      />

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}
