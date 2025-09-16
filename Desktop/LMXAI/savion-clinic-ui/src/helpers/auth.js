import { auth } from "@/auth";
import { config } from "./config";
import { getSession } from "next-auth/react";
// import { refreshTokenService } from "@/services/auth-service";

export const getAuthHeader = async () => {
  const session = await auth();
  const token = session?.accessToken;

  let authHeader = { "Content-Type": "application/json" };
  if (token) {
    authHeader = { Authorization: ` Bearer ${token}`, ...authHeader };
  }
  return authHeader;
};

export const getAuthHeaderNoBearer = async () => {
  const session = await auth();
  const token = session?.accessToken;

  let authHeader = { "Content-Type": "application/json" };
  if (token) {
    authHeader = { Authorization: token, ...authHeader }; 
  }
  return authHeader;
};

export const getAuthHeaderWithPDF = async () => {
  const session = await auth();
  const token = session?.accessToken;

  let authHeader;
  if (token) {
    authHeader = { Authorization: ` Bearer ${token}`, ...authHeader };
  }
  return authHeader;
};

export const getAuthHeaderWithSessionId = async (session_id) => {
  const session = await getSession();
  const token = session?.accessToken;

  let authHeader = {
    Authorization: `Bearer ${token}`,
  };
  if (token) {
    authHeader = {
      Authorization: `Bearer ${token}`,
    };
  }

  return authHeader;
};

export const getAuthHeaderClient = async () => {
  const session = await getSession();
  const token = session?.accessToken;

  let authHeader = { "Content-Type": "application/json" };
  if (token) {
    authHeader = { Authorization: ` Bearer ${token}`, ...authHeader };
  }

  return authHeader;
};
export const getAuthHeaderById = async (session_id = "") => {
  let authHeader = { "Content-Type": "application/json" };
  const session = await getSession();
  const user_id = parseJwt(session?.accessToken).user_id;

  session_id
    ? (authHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
        "user-id": user_id,
        session_id: session_id,
      })
    : (authHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
        "user-id": user_id,
      });
  return authHeader;
};

export const isUserAuthorized = (role, url) => {
  const menu = config.userRightsOnRoutes.find((item) =>
    item.urlRegex.test(url)
  );

  if (!menu) return false;
  return menu.rights.includes(role);
};

export const parseJwt = (token) => {
  return JSON.parse(atob(token.split(".")[1]));
};

export const getIsTokenValid = (token) => {
  if (!token) return false;
  const jwtExpireTimeStamp = parseJwt(token).exp;
  const jwtExpireDateTime = new Date(jwtExpireTimeStamp * 1000);

  if (jwtExpireDateTime <= new Date()) {
    //console.log('API token was expired')
    return false;
  }

  return true;
};
