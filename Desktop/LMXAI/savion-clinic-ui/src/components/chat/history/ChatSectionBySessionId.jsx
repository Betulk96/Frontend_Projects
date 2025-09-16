"use client";
import React, { useEffect, useState, useCallback } from "react";
import ChatInput from "../ChatInput";
import ChatMessages from "../ChatMessages";
import { ChatAction } from "@/actions/chat-action";
import { getUserInputsAction } from "@/actions/user-input-actions";
import { useDiet } from "@/hook/DietContext";
import { parseDietFromAnswer } from "@/helpers/parseDietFromAnswer";
import { useNotifications } from "@/hook/NotificationContext";
import OptionMessages from "../option/OptionMessages";
import { fetchChatStream } from "@/services/fetchChatStream";
import { fetchDocumentsChatStream } from "@/services/fetchDocumentsChatStream";

const ChatSectionBySessionId = ({ chatHistoryByIdData, session_id, session }) => {
  const [chatData, setChatData] = useState([]);
  const [streaming, setStreaming] = useState(false);
  const [chat, setChat] = useState(true);
  const [newMessage, setNewMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [userInput, setUserInput] = useState({});
  const [file, setFile] = useState(null);
  
  const { setDietMacros, setDietStats } = useDiet();
  const { addNotification } = useNotifications();
  
  const userID = session?.user?.user_id;

  // Chat geçmişini yükle
  useEffect(() => {
    if (!chatHistoryByIdData?.session_detail || chatHistoryByIdData.session_detail.length === 0) {
      return;
    }

    const chatPairs = chatHistoryByIdData.session_detail.map((item) => ({
      sessionId: item.session_id,
      question: item.question,
      answer: item.answer,
      service_name: "chat_history",
      isError: false,
    }));

    setChatData((prevData) => {
      const existingMessages = new Set(
        prevData
          .filter(msg => msg.service_name === "chat_history")
          .map(msg => `${msg.question}|${msg.answer}`)
      );

      const newMessages = chatPairs.filter(pair => 
        !existingMessages.has(`${pair.question}|${pair.answer}`)
      );

      return newMessages.length > 0 ? [...prevData, ...newMessages] : prevData;
    });
  }, [chatHistoryByIdData]);

  // Soru işleme fonksiyonu
  const handleQuestionChange = useCallback(async (newQuestion, fromOption = false) => {
    if (!userID || !newQuestion?.trim()) {
      console.warn("User ID veya soru eksik");
      return;
    }

    setQuestion(newQuestion);
    setChat(true);
    setLoading(true);

    try {
      const commonParams = {
        userID,
        session_id,
        setLoading,
        setStreaming,
        setChatData,
        currentQuestion: newQuestion,
      };

      if (file && !fromOption) {
        // Dosya ile birlikte soru gönderimi
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
          ...commonParams,
        });
      } else {
        // Option'dan geliyorsa dosyayı temizle
        if (fromOption) {
          setFile(null);
        }

        // Normal soru gönderimi
        await fetchChatStream({
          question: newQuestion,
          ...commonParams,
        });
      }
    } catch (error) {
      console.error("❌ Soru gönderme hatası:", error);
      
      // Hata durumunda kullanıcıya bildirim göster
      if (addNotification) {
        addNotification({
          type: "error",
          message: "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
        });
      }

      // Hata mesajını chat'e ekle
      setChatData(prev => [...prev, {
        question: newQuestion,
        answer: "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.",
        isError: true,
        service_name: "error"
      }]);
    } finally {
      setLoading(false);
    }
  }, [userID, session_id, file, addNotification]);

  // Cevap gönderme (multiple choice sorular için)
  const handleSubmitAnswers = useCallback(async (answerString) => {
    if (!userID || !answerString?.trim()) {
      return;
    }

    setLoading(true);
    try {
      await fetchChatStream({
        question: answerString,
        userID,
        session_id,
        setLoading,
        setStreaming,
        setChatData,
        currentQuestion: answerString,
      });
    } catch (error) {
      console.error("❌ Cevap gönderme hatası:", error);
      
      if (addNotification) {
        addNotification({
          type: "error",
          message: "Cevap gönderilirken bir hata oluştu.",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [userID, session_id, addNotification]);

  // Option seçim işleyicisi
  const handleOptionSelect = useCallback((option) => {
    const questionText = option?.question;
    if (questionText) {
      handleQuestionChange(questionText, true);
    }
  }, [handleQuestionChange]);

  return (
    <div className="h-screen max-w-4xl mx-auto border border-white/30 dark:border-gray-800/30 pt-20 pb-4 flex flex-col justify-between">
      {/* Chat mesajları kısmı */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none">
        <div className="flex flex-row">
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
        </div>

        {/* Option mesajları - sabit pozisyon */}
        <div className="fixed top-30 right-7 z-10">
          <OptionMessages onSelectQuestion={handleOptionSelect} />
        </div>
      </div>

      {/* Chat input kısmı */}
      <div className="flex-shrink-0">
        <ChatInput
          loading={loading}
          setQuestion={handleQuestionChange}
          question={question}
          file={file}
          setFile={setFile}
        />
      </div>
    </div>
  );
};

export default ChatSectionBySessionId;