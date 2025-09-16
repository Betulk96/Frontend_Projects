"use client";
import React, { useEffect, useState } from "react";

import ChatInput from "./ChatInput";
import { ChatAction } from "@/actions/chat-action";
import ChatOptionsQuestion from "./ChatOptionQuestion";
import OptionMessages from "./OptionMessages";
import ChatMessages from "./ChatMessages";


const ChatAIChatSection = ({detail }) => {
  const [chat, setChat] = useState(false);
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [session_id, setSessionID] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [newMessage, setNewMessage] = useState(null);

  console.log("Patient Detail in ChatAIChatSection:", detail);


  useEffect(() => {
    const fetchChatResponse = async () => {
      if (!question || question === "null") return;

      setLoading(true);

      try {

        //console.log(formData);
        const payload = {

          messages: [
            {
              type: "human",
              content: question,
            },
          ],
          ...(session_id && { session_id: String(session_id) }),
        };

        console.log("Payload to send.", payload);

        const response = await ChatAction(payload);
        console.log("Response result.", response);

        if (!response || response.error) {
          // Hata durumunda
          const errorResponse = {
            session_id,
            question,
            answer:
              "Şu anda hizmet verilemiyor. Lütfen daha sonra tekrar deneyiniz!",
            isError: true,
          };
          setChatData((prevData) => {
            if (!prevData.some((msg) => msg.question === errorResponse.question)) {
              return [...prevData, errorResponse];
            }
            return prevData;
          });
        } else {
          const answer = response.answer ||
            "No response from assistant.";

          const chatMessage = {
            session_id: response.result?.session_id ||
              session_id,
            question: question,
            answer: answer,
            service_name: response.result?.service_name ||
              null,
            isError: false,
          };
          /*   if (response?.answer) {
              const { macros, stats } = parseDietFromAnswer(response.answer);
  
  
              if (macros && Object.values(macros).some((m) => m !== null)) {
                setDietMacros(macros);
                // 📢 Detaylı bildirim gönder
                addNotification({
                  type: "success",
                  title: "Diet Macros is updated",
                  message: `Your nutrition data has been successfully analyzed. Protein: ${macros.protein ?? "-"}, Carbohydrates: ${macros.carbohydrates ?? "-"}, Fat: ${macros.fats ?? "-"}.`,
                });
  
              }
  
              if (stats && Object.values(stats).some((s) => s !== null)) {
                setDietStats(stats);
                addNotification({
                  type: "info",
                  title: "Daily Energy Values is updated",
                  message: `BMR: ${stats.BMR ?? "-"}, TDEE: ${stats.TDEE ?? "-"}, Total Calories: ${stats.totalCalories ?? "-"}`,
                  url: `/main/${session_id}`,
                });
              }
            } */

          if (response && response.session_id) {
            setSessionID(response.session_id);
            console.log("session_id", response.session_id);
            window.history.replaceState(null, "", `/main/${response.session_id}`);
          }


          setNewMessage(chatMessage);
          setChatData((prevData) => {
            if (!prevData.some((msg) => msg.question === chatMessage.question)) {
              return [...prevData, chatMessage];
            }
            return prevData;
          });
        }

        setChat(true);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setChatData((prevData) => [
          ...prevData,
          {
            question,
            answer:
              "Teknik bir hata meydana geldi. Lütfen daha sonra tekrar deneyiniz.",
            isError: true,
          },
        ]);
        setLoading(false);
      }
    };



    fetchChatResponse();
  }, [question]);

  return (
    <div className="h-full max-h-[80vh] overflow-y-auto p-6 space-y-4 sm:space-y-2 pt-6 bg-white/40 dark:bg-gray-700/30 backdrop-blur-md rounded-2xl shadow-md shadow-color1/30 ">
      <div className="relative container mx-auto flex flex-col h-full pt-20 ">
        {/* Chat Messages */}
        <div className="flex-1 sm:px-10 ">
          {chat ? (
            <div className="flex flex-row flex-1 overflow-hidden w-100">
              <ChatMessages
                chatData={chatData}
                newMessage={newMessage}
                loading={loading}
                question={question}
                setQuestion={setQuestion}
                setChat={setChat}
                setStreaming={setStreaming}
              />
              <div className="fixed top-30 right-7">
                <OptionMessages
                  onSelectQuestion={(option) => {
                    setQuestion(option.question);
                    setChat(true);

                  }}
                />
              </div>
            </div>
          ) : (
            /*  <ChatOption session={session} /> */
            <ChatOptionsQuestion
              setQuestion={setQuestion}
              setLoading={setLoading}
              setChat={setChat}
              detail={detail}  
            />
          )}

        </div>

        {/* Chat Input */}
        <div className="sticky bottom-0">
          <ChatInput
            loading={loading}
            setQuestion={(newQuestion) => {
              setQuestion(newQuestion);
              setChat(true);
            }}
            question={question}

          />
        </div>
      </div>
    </div>

  );
};

export default ChatAIChatSection;
