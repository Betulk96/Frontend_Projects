"use client";

import React from "react";
import { Button, Container } from "react-bootstrap";
import "./about-help.scss";
import { MdPhoneForwarded, MdEmail } from "react-icons/md";
import { useTranslation } from "react-i18next"; 

const AboutHelp = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <div className="help-container">
        <div className="help-text">
          <h2>{t("help.title")}</h2>
          <h4>{t("help.desc")}</h4>
        </div>
        <div>
          <div className="help-contact">
            <Button className="contact-btn">
            {t("help.email")} <MdEmail />
            </Button>
            <Button className="contact-btn">
            {t("help.phone")} <MdPhoneForwarded />{" "}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutHelp;
