"use client";
import React, { useEffect, useRef, useState } from "react";
import Loader from "./Loader.jsx";
import Image from "next/image";
import {
  preprocessContent,
  streamContent,
  handleMouseUp,
  handleButtonClick,
  handleCopySelectedText,
  toggleQuestionExpand,
} from "@/helpers//chat/chat-message-helper.js";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { GoCopy } from "react-icons/go";
import { LuArrowDown, LuNotebookPen } from "react-icons/lu";
import MarkdownRenderer from "@/components/chat/MarkdownRenderer.jsx";
import ChatFooter from "@/components/chat/ChatFooter.jsx";
import ThemeLogo from "@/components/main/ThemeLogo.jsx";

const ChatMessages = ({ chatData, loading, question, streaming, setStreaming, newMessage }) => {
  const streamingDelay = 10;
  const chatSectionRef = useRef(null);
  const [title, setTitle] = useState("");
  const [copiedAll, setCopiedAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [visibleHtml, setVisibleHtml] = useState({});
  const [showButton, setShowButton] = useState(false);
  const [copySuccess, setCopySuccess] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedText, setSelectedText] = useState("");
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [showScrollButton, setShowScrollButton] = useState(true);
  const [executingMessages, setExecutingMessages] = useState([]);
 

  //console.log("chatData", chatData);
  const scrollToBottom = () => {
    const el = chatSectionRef.current;
    if (!el) return;

    const scrollHeight = el.scrollHeight;
    const height = el.clientHeight;
    const maxScrollTop = scrollHeight - height;

    el.scrollTo({
      top: maxScrollTop > 0 ? maxScrollTop : 0,
      behavior: "smooth",
    });
  };


  useEffect(() => {
    const ref = chatSectionRef.current;
    const handleScroll = () => {
      if (ref) {
        const { scrollTop, scrollHeight, clientHeight } = ref;
        setShowScrollButton(scrollTop + clientHeight < scrollHeight - 0);
      }
    };

    ref?.addEventListener("scroll", handleScroll);
    return () => ref?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (loading && chatSectionRef.current) scrollToBottom();
  }, [loading]);

  useEffect(() => {
    if (newMessage && chatData.length > 0) {
      const lastIndex = chatData.length - 1;
      if (!visibleHtml[lastIndex]) {
        streamContent(newMessage.answer, lastIndex, setVisibleHtml, setStreaming, preprocessContent, streamingDelay);
      }
    }
  }, [newMessage]);

  useEffect(() => {
    chatData.forEach((item, index) => {
      if (!visibleHtml[index]) {
        if (index === chatData.length - 1 && newMessage) {
          streamContent(item.answer, index, setVisibleHtml, setStreaming, preprocessContent, streamingDelay);
        } else {
          setVisibleHtml((prev) => ({
            ...prev,
            [index]: preprocessContent(item.answer),
          }));
        }
      }
    });
  }, [chatData, newMessage]);

  useEffect(() => {
    const handleSelection = handleMouseUp(setSelectedText, setButtonPosition, setShowButton);
    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("touchend", handleSelection);

    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("touchend", handleSelection);
    };
  }, []);



  return (
    <div
      ref={chatSectionRef}
      className="overflow-y-auto w-full max-h-[calc(100vh-150px)] pb-10 break-words text-md tracking-wider leading-relaxed"

    >

      {chatData.map((item, index) => {
        if (!item?.question) return null;

        return (
          <div key={index} >
            <div className="flex gap-3  backdrop-blur-md">
              <div className="hidden md:inline-flex items-center justify-center rounded-md bg-color3/20 p-2 w-fit h-fit">
                <ThemeLogo size={24} />
              </div>

              <div className="flex-1">
                <div className="mb-2 text-gray-800 dark:text-gray-200">
                  <span className={`block ${expandedQuestions[index] ? "" : "truncate"}`}>
                    {expandedQuestions[index]
                      ? item.question
                      : item.question.length > 100
                        ? `${item.question.substring(0, 100)}...`
                        : item.question}
                  </span>
                  {item.question.length > 100 && (
                    <button
                      onClick={() => toggleQuestionExpand(index, setExpandedQuestions)}
                      className="text-blue-500 hover:text-blue-600 ml-1 inline-flex items-center"
                    >
                      {expandedQuestions[index] ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
                    </button>
                  )}
                </div>
                <div className="border-b border-gray-300 dark:border-gray-600 mb-4"></div>
                <MarkdownRenderer
                  content={visibleHtml[index] || ""}
                  index={index}
                  setCopySuccess={setCopySuccess}
                  setCopiedIndex={setCopiedIndex}
                  copiedIndex={copiedIndex}
                  item={item}
                />
            
                <ChatFooter
                  setCopiedAll={setCopiedAll}
                  copiedAll={copiedAll}
                  setCopySuccess={setCopySuccess}
                  content={visibleHtml[index]}
                />

              </div>
            </div>
          </div>
        );
      })}

      {/* Floating Buttons */}
      <div>

        <button
          style={{ top: buttonPosition.y + 48, left: buttonPosition.x }}
          className={`fixed z-50 bg-blue-600 text-white p-2 rounded-full shadow-md transition ${showButton ? "block" : "hidden"
            }`}
          onClick={() => handleCopySelectedText(selectedText, setCopySuccess)}
        >
          <GoCopy size={20} />
        </button>
      </div>

      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className=" px-4 absolute z-50 bottom-28 left-1/2 transform -translate-x-1/2  bg-color4 text-white p-2 rounded-full shadow-lg hover:bg-color1"
        >
          <LuArrowDown size={20} />
        </button>
      )}


      {(loading || chatData.length === 0) && (
        <Loader question={question} executingMessages={executingMessages} />
      )}
    </div>
  );
};

export default ChatMessages;
