"use server";
import { getAuthHeader } from "@/helpers/auth";
import { config } from "@/helpers/config";

const REQ_API_URL = process.env.NEXT_PUBLIC_BASE_URL;
const AI_API_URL = process.env.AI_API_ENDPOINT;

export const login = (payload) => {
	//console.log("payload to login", payload);
	return fetch(`${AI_API_URL}/token`, {
		method: "post",
		body: JSON.stringify(payload),
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const register = (payload) => {
	//console.log("payload to register", payload);
	return fetch(`${AI_API_URL}/api/users/register/`, {
		method: "post",
		body: JSON.stringify(payload),
		headers: {
			"Content-Type": "application/json",
		},
	});
};