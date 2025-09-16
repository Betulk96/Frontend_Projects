"use server";
import {
  createClinicPatientInputService,
  createUserInputService,
  deleteClinicPatientInputService,
  getClinicInputsService,
  getUserInputsService,
  updateClinicPatientInputService,
  updateUserInputService,
} from "@/services/user-ınput-service";

export const getUserInputsAction = async () => {
  try {
    const res = await getUserInputsService();

    return res;
  } catch (error) {
    console.log("getUserInputsAction error");
  }
};

export const updateUserInputAction = async (payload) => {
  try {
    const res = await updateUserInputService(payload);

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createUserInputAction = async (payload) => {
  try {
    const data = await createUserInputService(payload);

    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error("createUserInputAction error:");
    return {
      ok: false,
      error: error.message,
    };
  }
};

export const deleteUserInputAction = async (payload) => {
  try {
    const res = await deleteClinicPatientInputService(payload);

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateClinicPatientInputAction = async (payload) => {
  try {
    const res = await updateClinicPatientInputService(payload);

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createClinicPatientInputAction = async (payload) => {
  try {
    const res = await createClinicPatientInputService(payload);

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getClinicInputsAction = async (id) => {
  try {
    const res = await getClinicInputsService(id);

    return res;
  } catch (error) {
    console.log(error);
  }
};
