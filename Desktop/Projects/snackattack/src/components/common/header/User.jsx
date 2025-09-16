
import React from "react";
import UserMenuAuth from "./UserMenuAuth";
import UserMenuGuest from "./UserMenuGuest";
import { auth } from "@/auth";

const UserMenu = async () => {

	const session = await auth(); //server component lerde kullanıcı datasına erişmek için

	// console.log("USER-MENU", session);

	return (
		<>
			{session?.user?.role ? (
				<UserMenuAuth session={session} />
			) : (
				<UserMenuGuest />
			)}
		</>
	);
};

export default UserMenu;