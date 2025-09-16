import CommonError from "@/components/common/errors/ErrorPage";

import React from "react";

const NotFoundPage = ({ error, reset }) => {
  return (
    <CommonError error={error} reset={reset} />

  );
};

export default NotFoundPage;
