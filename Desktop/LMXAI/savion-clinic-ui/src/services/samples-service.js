"use server";
import { getAuthHeader } from "@/helpers/auth";
import { config } from "@/helpers/config";

const AI_API_URL = process.env.AI_API_ENDPOINT;
const REQ_API_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const getSamplesMeService = async () => {
  const headers = await getAuthHeader();
  const response = await fetch(`${REQ_API_URL}/samples/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
  });
  //console.log("samples", response);
  if (!response.ok) {
    console.log(`API error: ${response.status}`);
  }
  return response.json();
};
