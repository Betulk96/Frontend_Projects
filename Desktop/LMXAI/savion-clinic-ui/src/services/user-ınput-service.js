"use server";
import { getAuthHeader } from "@/helpers/auth";
import { config } from "@/helpers/config";

const AI_API_URL = process.env.AI_API_ENDPOINT;
const REQ_API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createUserInputService = async (payload) => {
  console.log("createUserInputService", payload);
  const headers = await getAuthHeader();

  const response = await fetch(`${AI_API_URL}/user-input/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: JSON.stringify(payload),
  });
  //console.log("create response", response);
  if (!response.ok) {
    console.log(`API error: ${response.status}`);
  }

  return response.json();
};
export const getUserInputsService = async () => {
  const headers = await getAuthHeader();
  const response = await fetch(`${AI_API_URL}/user-input/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
  });
  //console.log("User input", response);
  if (!response.ok) {
    console.log(`API error: ${response.status}`);
  }
  return response.json();
};
export const updateUserInputService = async (payload) => {
  const headers = await getAuthHeader();
  console.log("updateUserInputService", payload);
  const response = await fetch(`${AI_API_URL}/user-input/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: JSON.stringify(payload),
  });
  console.log("update response", response);
  if (!response.ok) {
    console.log(`API error: ${response.status}`);
  }
  return response.json();
};
export const createClinicPatientInputService = async (payload) => {
  console.log("createUserInputService", payload);
  const headers = await getAuthHeader();
  const response = await fetch(`${AI_API_URL}/api/clinic/user-input/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: JSON.stringify(payload),
  });
  console.log("create response", response);
  if (!response.ok) {
    console.log(`API error: ${response.status}`);
  }
  return response.json();
};
export const updateClinicPatientInputService = async (payload) => {
  const headers = await getAuthHeader();
  console.log("updateUserInputService", payload);
  const response = await fetch(`${AI_API_URL}/api/clinic/user-input/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: JSON.stringify(payload),
  });
  console.log("update response", response);
  if (!response.ok) {
    console.log(`API error: ${response.status}`);
  }
  return response.json();
};

export const deleteClinicPatientInputService = async (payload) => {
  const headers = await getAuthHeader();
  console.log("updateUserInputService", payload);
  const response = await fetch(`${AI_API_URL}/api/clinic/user-input/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: JSON.stringify(payload),
  });
  console.log("update response", response);
  if (!response.ok) {
    console.log(`API error: ${response.status}`);
  }
  return response.json();
};

export const getClinicInputsService = async (id) => {
  //console.log("id", id);
  const headers = await getAuthHeader();
  const response = await fetch(
    `${AI_API_URL}/api/clinic/user-input/?clinic_patient_id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
    }
  );
  //console.log("User input", response);
  if (!response.ok) {
    console.log(`API error: ${response.status}`);
  }
  return response.json();
};
