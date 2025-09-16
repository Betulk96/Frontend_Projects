import {
  getAuthHeader,
  getAuthHeaderWithPDF,
  getAuthHeaderWithSessionId,
} from "@/helpers/auth";

const AI_API_URL = process.env.AI_API_ENDPOINT;
const REQ_API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const Chat = async (fields) => {
  console.log("Sending fields to API:", fields);

  return fetch(`${AI_API_URL}/optimeal/run`, {
    method: "POST",
    headers: await getAuthHeader(),
    body: JSON.stringify(fields),
  });
};

export const getAllChatHistory = async (page = 1, pageSize = 10) => {
 
  const skip = (page - 1) ;

  return fetch(`${REQ_API_URL}/chats/?limit=${pageSize}&skip=${skip}`, {
    method: "GET",
    headers: await getAuthHeader(),
  });
};

export const getChatHistoryById = async (session_id) => {
  const url = `${REQ_API_URL}/chats/${session_id}`;
  return fetch(url, {
    method: "GET",
    headers: await getAuthHeader(),
  });
};
