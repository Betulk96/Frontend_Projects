export const initialResponse = { success: null, message: "", errors: {} };

export const isInvalid = (err) => {
  return err ? "is-invalid" : "";
};

export const response = (success, message, errors, data) => {
  return {
    success,
    message,
    errors,
    data,
  };
};

export const getYupErrors = (errors) => {
  const errObj = {};
  errors.forEach((error) => (errObj[error.path] = error.message));

  return response(false, "", errObj);
};

export const convertFormDataToJson = (formData) => {
  const obj = {};
  for (let [key, value] of formData.entries()) {
    // Next.js internal alanlar ve callbackUrl'i çıkar
    if (!key.startsWith("$") && key !== "callbackUrl") {
      obj[key] = value;
    }
  }
  return obj;
};
