import {
  createClinicPatient,
  deleteClinicPatient,
  getClinicPatientDetails,
  getClinicPatientList,
  updateClinicPatient,
} from "@/services/clinic-patient";

export const getClinicPatientListAction = async () => {
  try {
    const res = await getClinicPatientList();
    //console.log("getClinicPatientListAction", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getClinicPatientDetailsAction = async (id) => {
  try {
    const res = await getClinicPatientDetails(id);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteClinicPatientAction = async (id) => {
  try {
    const res = await deleteClinicPatient(id);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const updateClinicPatientAction = async (payload) => {
  try {
    const res = await updateClinicPatient(payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const createClinicPatientAction = async (payload) => {
  try {
    const res = await createClinicPatient(payload);
   // console.log("createClinicPatientAction", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
