"use client";
import React, { useState } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatOptionsQuestion from "./option/ChatOptionQuestion";
import OptionMessages from "./option/OptionMessages";
import { fetchChatStream } from "@/services/fetchChatStream";
import { fetchDocumentsChatStream } from "@/services/fetchDocumentsChatStream"; // 📌 Eksik import eklendi

const ChatAIChatSection = ({ session }) => {
  const [chat, setChat] = useState(false);
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [session_id, setSessionID] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [choosenBook, setChoosenBook] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [file, setFile] = useState(null);

  const userID = session.user.user_id;

  // Soru gönderme (input veya options)
  const handleQuestionChange = async (newQuestion, fromOption = false) => {
    setQuestion(newQuestion);
    setChat(true);

    if (!userID || !newQuestion) return;

    setLoading(true);
    try {
      if (file && !fromOption) {
        // 📌 Dosya varsa → document stream
        const formData = new FormData();
        formData.append("query", newQuestion);
        formData.append("files", file);
        formData.append("ttl_hours", "72");
        formData.append("top_k", "10");
        if (session_id) {
          formData.append("session_id", session_id);
        }

        await fetchDocumentsChatStream({
          formData,
          userID,
          session_id: session_id,
          setLoading,
          setStreaming,
          setChatData,
          setSessionID,
          currentQuestion: newQuestion,
        });
      } else {
        // 📌 Option'dan geliyorsa dosyayı temizle
        if (fromOption) {
          setFile(null);
        }
        
        await fetchChatStream({
          question: newQuestion,
          userID,
          session_id: session_id,
          setLoading,
          setStreaming,
          setChatData,
          setSessionID,
          currentQuestion: newQuestion,
        });
      }
    } catch (error) {
      console.error("❌ Question fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cevap gönderme (ör. multiple choice sorular için)
  const handleSubmitAnswers = async (answerString) => {
    setLoading(true);
    try {
      await fetchChatStream({
        question: answerString,
        userID,
        session_id: session_id,
        setLoading,
        setStreaming,
        setChatData,
        setSessionID,
        currentQuestion: answerString,
      });
    } catch (error) {
      console.error("❌ Submit answers error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen max-w-4xl mx-auto border border-white/30 dark:border-gray-800/30 pt-20 pb-4 flex flex-col justify-between">
        {/* Chat Messages */}
        <div className="overflow-y-auto overflow-x-hidden scrollbar-none">
          {chat ? (
            <div className="flex flex-row ">
              <ChatMessages
                chatData={chatData}
                newMessage={newMessage}
                loading={loading}
                streaming={streaming}
                question={question}
                setQuestion={setQuestion}
                setChat={setChat}
                setStreaming={setStreaming}
                onSubmit={handleSubmitAnswers}
              />

              {/* Sağ tarafta sabit seçenekler */}
              <div className="fixed top-30 right-7">
                <OptionMessages
                  onSelectQuestion={(option) => {                    
                    const questionText = option.question;
                    handleQuestionChange(questionText, true);
                  }}
                />
              </div>
            </div>
          ) : (
            <ChatOptionsQuestion
              setQuestion={(q) => handleQuestionChange(q, true)}
              setLoading={setLoading}
              setChat={setChat}
            />
          )}
        </div>
         
        
     
       <ChatInput
            loading={loading}
            setQuestion={(newQuestion) => handleQuestionChange(newQuestion)}
            question={question}
            file={file}
            setFile={setFile}
          />
    </div>
  );
};

export default ChatAIChatSection;