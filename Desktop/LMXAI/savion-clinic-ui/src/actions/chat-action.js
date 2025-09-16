"use server";

import {
  askChat,
  Chat,
  continueChatService,
  getAllChatHistory,
} from "@/services/chat-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const newChatAction = () => {
  revalidatePath(`/main`);
  redirect(`/main`);
};

export const ChatAction = async (formData) => {
  //console.log("formData", formData);
  try {
    const res = await Chat(formData);
    const data = await res.json();

    if (!res.ok) {
      console.log(`API error: ${res.status}`);
    }

    return data;
  } catch (err) {
    return {
      error: true,
      message: err.message || "Unexpected error occurred",
      status: err.response?.status || "?",
    };
  }
};

export const getAllChatHistoryAction = async (page = 1, page_size = 10) => {
  try {
    const allChatHistoryRes = await getAllChatHistory(page, page_size);
    if (!allChatHistoryRes.ok) {
      console.log(`API error: ${response.status}`);
    }
    // Promise'u çözüp veri olarak elde et
    const data = await allChatHistoryRes.json();

   //console.log("allChatHistoryRes", data);
    return data;
  } catch (error) {
    console.error("Chat geçmişini alırken bir hata oluştu.");
    return []; // Hata durumunda boş dizi dön
  }
};
