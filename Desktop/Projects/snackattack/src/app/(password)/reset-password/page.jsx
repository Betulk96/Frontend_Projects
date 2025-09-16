"use client";
import PageHeader from "@/components/common/page-header";
import Spacer from "@/components/common/spacer";
import ResetPassword from "@/components/(password)/reset-password/ResetPassword";
import React from "react";
import { useTranslation } from "react-i18next";


const ResetPasswordPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Spacer height={30} />
      <PageHeader>{t("pageHeader.resetPassword")}</PageHeader>
      <Spacer height={30} />
      <ResetPassword />
      <Spacer />
    </>
  );
};

export default ResetPasswordPage;