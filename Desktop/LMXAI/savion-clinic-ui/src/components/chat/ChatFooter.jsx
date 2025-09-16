import React from "react";
import Image from "next/image";
import { handleDislike, swalToast } from "@/helpers/alert/swal.js";

const ChatFooter = ({ setCopiedAll, copiedAll, setCopySuccess, codeColumnText }) => {
  const handleCopyClickAll = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      if (codeColumnText?.trim()) {
        navigator.clipboard
          .writeText(codeColumnText)
          .then(() => {
            setCopiedAll(true);
            setCopySuccess("Bu cevap kopyalandı!");
            swalToast("All answers have been copied successfully!", "success");
            setTimeout(() => {
              setCopiedAll(false);
              setCopySuccess(null);
            }, 2000);
          })
          .catch((err) => {
            console.error("Copying failed:", err);
          });
      } else {
        console.warn("Selected text is empty.");
      }
    } else {
      console.error("Clipboard API desteklenmiyor.");
    }
  };

  return (
    <div className="chat-footer flex justify-end gap-2 my-3">
      {/* Copy Button */}
      <button
        className="flex items-center justify-center rounded-xl bg-color3/30 p-1 text-white shadow-md hover:bg-color3/70 hover:scale-110       transition-all duration-300"
        onClick={handleCopyClickAll}
        aria-label="Copy Code"
      >
        <Image
          src={
            copiedAll
              ? "/icons/actions/copy/copied-icon.svg"
              : "/icons/actions/copy/copy-icon.svg"
          }
          width={20}
          height={20}
          className="w-5 h-5 sm:w-6 sm:h-6 "
          alt={copiedAll ? "copied-icon" : "copy-icon"}
        />
      </button>

      {/* Like / Unlike Buttons */}
      <div className="like-unlike-buttons flex gap-2">
        <button
          className="flex items-center justify-center rounded-xl bg-color3/30 p-1 text-white shadow-md hover:bg-color3/70 hover:scale-110       transition-all duration-300"
          onClick={() =>
            swalToast(
              "Thank you for your feedback! We're glad you found the answer helpful.",
              "success"
            )
          }
        >
          <Image
            src="/icons/actions/like-unlike/like.svg"
            width={22}
            height={22}
            className="sm:w-[26px] sm:h-[26px] w-[22px] h-[22px]"
            alt="like-icon"
          />
        </button>
        <button
          className="flex items-center justify-center rounded-xl bg-color3/30 p-1 text-white shadow-md hover:bg-color3/70 hover:scale-110       transition-all duration-300"
          onClick={handleDislike}
        >
          <Image
            src="/icons/actions/like-unlike/unlike.svg"
            width={22}
            height={22}
            className="sm:w-[26px] sm:h-[26px] w-[22px] h-[22px]"
            alt="unlike-icon"
          />
        </button>
      </div>
    </div>
  );
};

export default ChatFooter;
