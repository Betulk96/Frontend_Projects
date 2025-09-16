import { getSamplesMeService } from "@/services/samples-service";


export const getSamplesMeAction = async () => {
  try {
      const res = await getSamplesMeService();
     // console.log("getSamplesMeAction", res);

    return res;
  } catch (error) {
    console.log("getSamplesMeAction error");
  }
};
