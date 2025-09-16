"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SubmitButton from "../../common/form-fields/submit-button";
import { swAlert } from "@/helpers/swal";
import { resetPassword } from "@/services/user-service";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(`${t("resetPassword.invalidEmail")}`)
      .required(`${t("resetPassword.required")}`),
    resetCode: Yup.string().required(`${t("resetPassword.required")}`),
    newPassword: Yup.string()
      .min(8, `${t("resetPassword.char")}`)
      .matches(/[a-z]+/, `${t("resetPassword.lowercase")}`)
      .matches(/[A-Z]+/, `${t("resetPassword.uppercase")}`)
      .matches(/\d+/, `${t("resetPassword.uppercase")}`)
      .required(`${t("resetPassword.required")}`),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], `${t("resetPassword.match")}`)
      .required(`${t("resetPassword.required")}`),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await resetPassword(values);
      console.log("response", response);
      if (response.ok) {
        swAlert(`${t("resetPassword.successMsg")}`);
        router.push("/login");
      } else {
        const errorData = await response.text();
        console.error("Error details:", errorData);
        swAlert(`Password reset failed. Error: ${errorData}`, "error");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      swAlert(`${t("resetPassword.errorMsg")}`);
    }
    setSubmitting(false);
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center">
        <Col lg={6}>
          <Formik
            initialValues={{
              email: "",
              resetCode: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <FloatingLabel
                  controlId="email"
                  label={t("resetPassword.email")}
                  className="mb-3"
                >
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="resetCode"
                  label={t("resetPassword.resetCode")}
                  className="mb-3"
                >
                  <Field
                    name="resetCode"
                    type="text"
                    placeholder="Reset Code"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="resetCode"
                    component="div"
                    className="text-danger"
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="newPassword"
                  label={t("resetPassword.newPassword")}
                  className="mb-3"
                >
                  <Field
                    name="newPassword"
                    type="password"
                    placeholder="New Password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-danger"
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="confirmPassword"
                  label={t("resetPassword.confirmPassword")}
                  className="mb-3"
                >
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-danger"
                  />
                </FloatingLabel>

                <SubmitButton
                  className="w-100"
                  title={"Reset Password"}
                  disabled={isSubmitting}
                />
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
