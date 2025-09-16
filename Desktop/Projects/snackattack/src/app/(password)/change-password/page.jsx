
"use client";
import ChangePassword from "@/components/(password)/ChangePassword";
import PageHeader from "@/components/common/page-header";
import Spacer from "@/components/common/spacer";
import React from "react";
import { useTranslation } from "react-i18next";
const ChangePasswordPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Spacer  height={30}/>
      <PageHeader>{t("pageHeader.changePassword")}</PageHeader>
      <Spacer  height={30}/>
      <ChangePassword />
      <Spacer />
    </>
  );
};

export default ChangePasswordPage;