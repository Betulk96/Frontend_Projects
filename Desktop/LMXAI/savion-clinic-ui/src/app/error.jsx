"use client"
import CommonError from "@/components/common/errors/ErrorPage";
import React from "react";

const ErrorPage = ({ error, reset }) => {
	return (
		<>
			
			<CommonError error={error} reset={reset} />
			
		</>
	);
};

export default ErrorPage;
