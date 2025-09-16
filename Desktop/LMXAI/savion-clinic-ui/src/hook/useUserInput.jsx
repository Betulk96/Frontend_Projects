"use client";
import { authAction } from "@/actions/auth-action";
import { createContext, useContext, useState, useEffect } from "react";

const UserInputContext = createContext();


const initialFormData = {
  username: "",
  email: "",
  role: "",
  age: "",
  gender: "",
  weight: "",
  height: "",
  patient_id: "",
  activity_level: "",
  fitness_goal: "",
  weight_change_goal: "",
  pregnancy: "",
  breastfeeding: "",
  allergies: "",
  residing_country: "",
  cuisine_preference: "",
  nationality: "",
  lifestyle: "",
  regular_medications: "",
  medical_history: "",
  _pid: "",
  _did: "",
};


export function UserInputProvider({ children }) {
  const [formData, setFormData] = useState(initialFormData);
  const [isLoaded, setIsLoaded] = useState(false);
  // console.log("formData", formData);
  // Client-side'da localStorage'dan veriyi yükle
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("userFormData");
      if (stored) {
        try {
          setFormData(JSON.parse(stored));
        } catch (error) {
          console.error("Error parsing stored form data:", error);
        }
      }
      setIsLoaded(true);
    }
  }, []);
 

  useEffect(() => {
    // formData değiştikçe localStorage'a yaz (sadece client-side'da ve yüklenmiş durumdayken)
    if (typeof window !== "undefined" && isLoaded) {
      localStorage.setItem("userFormData", JSON.stringify(formData));
    }
  }, [formData, isLoaded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    if (typeof window !== "undefined") {
      localStorage.removeItem("userFormData");
    }
  };

  // Hydration tamamlanmadan önce loading state'i döndür
  if (!isLoaded) {
    return (
      <UserInputContext.Provider
        value={{
          formData: initialFormData,
          setFormData: () => { },
          handleChange: () => { },
          resetForm: () => { },
          updateField: () => { },
          updateMultipleFields: () => { },
          isLoading: true
        }}
      >
        {children}
      </UserInputContext.Provider>
    );
  }

  // Belirli bir alanı güncellemek için
  const updateField = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Birden fazla alanı aynı anda güncellemek için
  const updateMultipleFields = (updates) => {
    setFormData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  return (
    <UserInputContext.Provider
      value={{
        formData,
        setFormData,
        handleChange,
        resetForm,
        updateField,
        updateMultipleFields
      }}
    >
      {children}
    </UserInputContext.Provider>
  );
}

export const useUserInput = () => {
  const context = useContext(UserInputContext);
  if (!context) {
    throw new Error("useUserInput must be used within a UserInputProvider");
  }
  return context;
};