import React from "react";
import AboutMission from "./AboutMission";
import AboutOption from "./AboutOption";
import AboutHelp from "./AboutHelp";
import Spacer from "../common/spacer";

const AboutMainPage = () => {
  return (
    <>
      <AboutMission />
      <Spacer />
      <AboutOption />
      <Spacer />
      <AboutHelp />
      <Spacer />
    </>
  );
};

export default AboutMainPage;
