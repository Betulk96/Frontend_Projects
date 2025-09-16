"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const CommonError = ({ error, reset }) => {
	const router=useRouter();
	useEffect(() => {
		console.log(error);
	}, [error]);

	return (
		<div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black">
			{/* Fullscreen video */}
			<video
				src="/Screen Recording 2025-08-28 at 00.33.10.mov"
				autoPlay
				loop
				muted
				playsInline
				className="absolute inset-0 w-full h-full object-cover"
			/>

			{/* Overlay content */}
			<div className="relative z-10 text-center text-white px-4 max-w-lg space-y-6">
				<h2 className="text-3xl font-bold">Oops! Something went wrong</h2>
				<p>An unexpected error has occurred. Please try again later.</p>
				<button
					onClick={() => router.push("/main")}
					className="px-6 py-2 rounded-lg bg-color2 hover:bg-color3 transition"
				>
					Go to Home
				</button>
			</div>

			{/* Optional: Dark overlay for readability */}
			<div className="absolute inset-0 bg-black opacity-50"></div>
		</div>
	);
};

export default CommonError;
