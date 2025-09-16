"use server";

import { getAuthHeader } from "@/helpers/auth";
import { config } from "@/helpers/config";

const AI_API_URL = process.env.AI_API_ENDPOINT;
const REQ_API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getClinicPatientList = async () => {
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${AI_API_URL}/api/clinic/patients/list/`, {
      method: "GET",
      headers: {
        accept: "application/json",
        ...headers,
      },
    });
    //console.log("getClinicPatientList", res);
    return res.json();
  } catch (error) {
    console.error("getClinicPatientList error:", error);
  }
};

export const getClinicPatientDetails = async (id) => {

  try {
    const headers = await getAuthHeader();
    const res = await fetch(
      `${AI_API_URL}/api/clinic/patients/detail/?clinic_patient_id=${id}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          ...headers,
        },
      }
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const createClinicPatient = async (payload) => {
 // console.log("payload", payload);
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${AI_API_URL}/api/clinic/patients/`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateClinicPatient = async (payload) => {
  //console.log("payload", payload);
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${AI_API_URL}/api/clinic/patients/detail/`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteClinicPatient = async (id) => {
 // console.log("id", id);
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${AI_API_URL}/api/clinic/patients/detail/`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({ clinic_patient_id: id }),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
