"use client";
import Image from "next/image";
import React from "react";
import { Container } from "react-bootstrap";
import "./about-mission.scss";
import { useTranslation } from "react-i18next";
import { GiTreehouse } from "react-icons/gi";
import { HiMiniHomeModern } from "react-icons/hi2";

const AboutMission = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <div className="about-mission">
        <Image
          src="/images/about/about-one.jpg"
          alt="mission"
          width={600}
          height={500}
          className="about-img"
        />
        <div className="about-content">
          <h2>{t("mission.title")}</h2>
          <p>
            {t("mission.desc")}
          </p>
          <div className="about-list">
            <div className="about-list-item">
              <span className="span"><HiMiniHomeModern style={{ fontSize: "2rem" , color: "white" }} /></span>
              <h5>{t("mission.subtitle1")}</h5>
            </div>
            <div className="about-list-item">
              <span className="span"><GiTreehouse style={{ fontSize: "2rem" , color: "white"}} /></span>
              <h5>{t("mission.subtitle2")}</h5>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutMission;
