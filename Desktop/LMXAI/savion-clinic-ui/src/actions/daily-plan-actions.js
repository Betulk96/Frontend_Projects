import { getDailyPlanService } from "@/services/daily-plan-service";

export const getDailyPlanAction = async () => {
  try {
    const res = await getDailyPlanService();
    //console.log("getDailyPlanAction", res);

    return res;
  } catch (error) {
    console.log("getDailyPlanAction error",);
  }
};
