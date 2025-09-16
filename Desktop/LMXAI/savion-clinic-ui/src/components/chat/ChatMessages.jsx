"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Loader from "./Loader.jsx";
import Image from "next/image";
import {
  preprocessContent,
  handleMouseUp,
  handleCopySelectedText,
  toggleQuestionExpand,
  getMaxItemsToShow,
  useScreenSizes,
} from "../../helpers/chat/chat-message-helper";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { GoCopy } from "react-icons/go";
import { LuArrowDown } from "react-icons/lu";
import ChatFooter from "./ChatFooter.jsx";
import MarkdownRenderer from "./MarkdownRenderer.jsx";
import { computeFilteredChatData, createHandleAnswerChange, getAnswerStats } from "@/helpers/chat/exam-checkbox-helper.js";
import ToolOutputButton from "./ToolOutputButton.jsx";

const ChatMessages = ({ chatData, newMessage, loading, question, onSubmit }) => {
  const chatSectionRef = useRef(null);
  const questionRefs = useRef([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [copiedAll, setCopiedAll] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [copySuccess, setCopySuccess] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedText, setSelectedText] = useState("");
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [showScrollButton, setShowScrollButton] = useState(true);
  const { isSmallScreen, isMiddleScreen } = useScreenSizes();
  const maxItemsToShow = getMaxItemsToShow(isSmallScreen, isMiddleScreen);
  const [showHeaderBar, setShowHeaderBar] = useState(true);
 //console.log("chatData in ChatMessages:", chatData);

  // useMemo içinde filteredChatData
  const filteredChatData = useMemo(() => {
    return computeFilteredChatData(chatData);
  }, [chatData]);

  const answerStats = getAnswerStats(filteredChatData, selectedAnswers);

  const handleAnswerChange = useMemo(
    () => createHandleAnswerChange(setSelectedAnswers),
    [setSelectedAnswers]
  );

  const getToolOutputsForQuestion = (questionInstanceID) => {
    return chatData.filter(
      (d) =>
        d.type === "tool_result" &&
        d.questionInstanceID === questionInstanceID
    );

  };


  // Scroll butonunun gösterilişini kontrol et
  useEffect(() => {
    const ref = chatSectionRef.current;
    const handleScroll = () => {
      if (ref) {
        const { scrollTop, scrollHeight, clientHeight } = ref;
        setShowScrollButton(scrollTop + clientHeight < scrollHeight - 0);
      }
    };
    ref?.addEventListener("scroll", handleScroll);
    return () => {
      ref?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Yeni yüklenen içeriğe scroll et
  // her yeni mesaj, chatData güncellemesi veya loading olduğunda aşağıya scroll et
  useEffect(() => {
    if (chatSectionRef.current) {
      chatSectionRef.current.scrollTo({
        top: chatSectionRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatData, newMessage, loading]);


  // Seçilen metni ve konumunu almak için mouse/touch listener
  useEffect(() => {
    const handleSelection = handleMouseUp(
      setSelectedText,
      setButtonPosition,
      setShowButton
    );
    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("touchend", handleSelection);
    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("touchend", handleSelection);
    };
  }, []);

  const scrollToBottom = () => {

    chatSectionRef.current?.scrollTo({
      top: chatSectionRef.current.scrollHeight,
      behavior: "smooth",
    });
  };


  function parseAnswerFromItem(item) {
    if (!item || item.type !== "tool_result" || !item.answer) return [];

    const lines = item.answer.split(/\n|\\n/).filter(Boolean); // \n veya \\n destekli
    return lines.map(line => {
      const match = line.match(/\(Kaynak:\s*(https?:\/\/[^\s)]+)\)/);
      if (match) {
        const url = match[1];
        const text = line.replace(/\(Kaynak:\s*https?:\/\/[^\s)]+\)/, "").trim();
        return { url, text };
      }
      return null;
    }).filter(Boolean);
  }
  useEffect(() => {
    if (newMessage) {
      // veya bir scroll tetikleme nedeni varsa
      setTimeout(() => {
        questionRefs.current?.[questionRefs.current.length - 1]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 0); // ya da 100ms
    }
  }, [newMessage]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 30) {
        setShowHeaderBar(true);
      } else {
        setShowHeaderBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div className="w-full relative" >
      <div id="pdf-export-target"
        ref={chatSectionRef}
        className="h-[80vh] overflow-y-auto  scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent hover:scrollbar-thumb-color4 dark:hover:scrollbar-thumb-color11">
        {filteredChatData.map((item, idx) => {
          if (!item) return null;
          return (
            <div
              ref={(el) => {
                if (el) questionRefs.current[idx] = el;
              }}
              key={`${item.questionInstanceID}-${idx}`}
            >
              {/* === Question Section === */}
              <div className="grid grid-cols-1 sm:grid-cols-[50px_1fr] gap-4 items-start">
                <Image
                  src="/logo/logo-white.png"
                  width={40}
                  height={40}
                  alt="user-avatar"
                  className="user-avatar hidden sm:block bg-color2/30 rounded-xl p-2 "
                />
                <div className="py-2 border-b border-color3 first-letter:uppercase">
                  <div>
                    <span className={`block text-base font-medium ${expandedQuestions[idx] ? "line-clamp-none" : "line-clamp-3"}`}>
                      {item.question}
                    </span>
                    {item.question.length > 100 && (
                      <button
                        onClick={() => toggleQuestionExpand(idx, setExpandedQuestions)}
                        className="text-color3 dark:text-color33 mt-1 flex items-center"
                      >
                        {expandedQuestions[idx] ? (<MdExpandLess size={24} />) : (<MdExpandMore size={24} />)}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* === Tool Output (If any) === */}
              <div className="toolOutput">
                {getToolOutputsForQuestion(item.questionInstanceID).map(
                  (toolItem, index) => (
                    <div
                      key={toolItem.messageID || index}
                      className="flex flex-wrap justify-center items-center gap-2 ml-7 md:ml-20 mt-2"
                    >
                      {parseAnswerFromItem(toolItem)
                        .slice(0, maxItemsToShow)
                        .map((entry, i) => (
                          <ToolOutputButton key={i} entry={entry} />
                        ))}
                    </div>
                  )
                )}
              </div>

              {/* === Answer Section === */}
              <div className="grid sm:grid-cols-[50px_1fr] sm:gap-4 sm:items-start pt-5">
                <div className="hidden sm:block" style={{ width: 50, height: 50 }} />
                <div className="code-column ms-4 ">
                  <MarkdownRenderer
                    content={item.type !== "tool_output" ? preprocessContent(item.answer) : undefined}
                    index={idx}
                    setCopySuccess={setCopySuccess}
                    setCopiedIndex={setCopiedIndex}
                    copiedIndex={copiedIndex}
                    item={item}
                    selectedAnswers={selectedAnswers}
                    setSelectedAnswers={setSelectedAnswers}
                    onAnswer={handleAnswerChange}
                  />
                  {item.type === "final" && (
                    <ChatFooter
                      setCopiedAll={setCopiedAll}
                      copiedAll={copiedAll}
                      setCopySuccess={setCopySuccess}
                      codeColumnText={item.answer}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loader'ı tüm chat mesajlarının hemen altına yerleştir */}
        {loading && <Loader question={question} />}
      </div>

      {/* Seçili metni kopyalama butonu */}
      <button
        style={{
          position: "absolute",
          top: buttonPosition.y + 40,
          left: buttonPosition.x,
          zIndex: 1000,
          backgroundColor: "var(--primary-color)",
          display: showButton ? "block" : "none",
        }}
        onClick={() => handleCopySelectedText(selectedText, setCopySuccess)}
        className="copy-selected-button"
      >
        <GoCopy size={25} />
      </button>

      {/* Aşağı kaydırma butonu (Yükleme yoksa ve sayfanın en altında değilse görünür) */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="xl:ml-[140px] fixed bottom-28 z-50 p-2 backdrop-blur-sm hover:bg-color3/30 text-white shadow-md shadow-color44 rounded-full transition-all duration-300 right-4 sm:right-auto sm:left-1/2 sm:-translate-x-1/2"
          aria-label="Scroll to bottom"
        >
          <LuArrowDown className="text-color3" size={20} />
        </button>
      )}


    </div>
  );
};

export default ChatMessages;