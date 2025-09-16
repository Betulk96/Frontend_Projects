"use client";
import React from "react";
import { Button } from "react-bootstrap";
import Icon from "../icon.jsx";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
const BackButton = ({
	// title = "Return Back",
	icon = "MdOutlineArrowBack",
	iconfamily = "md",
	...rest
}) => {
	const router = useRouter();
	const { t } = useTranslation()
	const handleClick = () => {
		router.back();
	};

	return (
		<Button type="button" variant="primary" {...rest} onClick={handleClick}>
			<Icon family={iconfamily} icon={icon} /> {t("dashboardAdmin.returnBack")}
		</Button>
	);
};

export default BackButton;
