"use server";
import { auth, signIn, signOut } from "@/auth";
import {
  convertFormDataToJson,
  getYupErrors,
  response,
} from "@/helpers/formValidation";
import {
  ForgotPasswordServices,
  login,
  register,
} from "@/services/auth-service";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import * as Yup from "yup";

const FormSchema = Yup.object({
  username: Yup.string().required("It must be username"),
  password: Yup.string().required("Required"),
});

const ForgotPasswordSchema = Yup.object({
  username: Yup.string().email("It must be username").required("Required"),
});
const RegisterSchema = Yup.object({
  username: Yup.string().required("It must be username"),
  password: Yup.string().required("Required"),
});

export const loginAction = async (prevState, formData) => {
  const fields = convertFormDataToJson(formData);

  try {
    FormSchema.validateSync(fields, { abortEarly: false });

    // 1️⃣ Önce mevcut session'ı temizle
    await signOut({ redirect: false });

    // 2️⃣ Kısa bir bekleme (session clear için)
    await new Promise((resolve) => setTimeout(resolve, 200));

    // 3️⃣ API'den fresh data al
    const res = await login(fields);
    const data = await res.json();

    if (!res.ok) {
      return response(false, data?.message || "Invalid credentials");
    }

    const role = data.role;

    // 4️⃣ Yeni session oluştur
    await signIn("credentials", {
      redirect: false,
      username: fields.username,
      password: fields.password,
    });

    // 5️⃣ Role'e göre yönlendir
    switch (role) {
      case "admin":
        redirect("/dashboard/admin");
        break;
      case "dietitian":
        redirect("/main");
        break;
      default:
        redirect("/");
    }
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return getYupErrors(err.inner);
    } else if (err instanceof AuthError) {
      if (err.type === "CallbackRouteError") {
        return response(false, "Invalid credentials");
      }
      return response(false, "Something went wrong.");
    }
    throw err;
  }
};

export const forgotPasswordAction = async (prevState, formData) => {
  const fields = convertFormDataToJson(formData);
  try {
    ForgotPasswordSchema.validateSync(fields, { abortEarly: false });

    const res = await ForgotPasswordServices(fields.email);
    const data = await res.json();
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return getYupErrors(err.inner);
    } else if (err instanceof AuthError) {
      if (err.type === "CredentialsSignin") {
        return response(false, "Invalid credentials");
      }
      return response(false, "Something went wrong.");
    }
    throw err;
  }
};

export const authAction = async () => {
  try {
    const res = auth();

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const registerAction = async (formData) => {
  console.log("formData", formData);
  try {
    RegisterSchema.validateSync(formData, { abortEarly: false });

    const res = await register(formData);
    const data = await res.json();
    console.log("data", data);

    if (res.ok) {
      // örn: data = { msg: "registered" }
      return response(true, data.msg || "Registration successful", null, data);
    }

    return response(
      false,
      data?.message || "Registration failed",
      data?.validations,
      data
    );
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return getYupErrors(err.inner);
    }
    throw err;
  }
};
