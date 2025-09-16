import { getPoliciesMeService } from "@/services/policies-service";

export const getPoliciesMeAction = async () => {
  try {
    const res = await getPoliciesMeService();

    return res;
  } catch (error) {
    console.log("getPoliciesMeAction error");
  }
};
