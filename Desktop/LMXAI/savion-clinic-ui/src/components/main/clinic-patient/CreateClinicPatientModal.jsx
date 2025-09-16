"use client";
import { createClinicPatientAction } from '@/actions/clinic-patient-actions';
import { createClinicPatientInputAction } from '@/actions/user-input-actions';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { motion, AnimatePresence } from "framer-motion";

function InputField({ name, label, type = "text", value, onChange, required }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  // Otomatik doldurma engelleme özellikleri
  const autoCompleteProps = {
    autoComplete: type === "email" ? "off" : type === "password" ? "new-password" : "off",
    autoCorrect: "off",
    autoCapitalize: "off",
    spellCheck: "false",
    "data-lpignore": "true",
    "data-form-type": ""
  };

  return (
    <div className="relative">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <input
        type={isPasswordField && showPassword ? "text" : type}
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-red-400"
        {...autoCompleteProps}
      />
      {isPasswordField && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-9 text-gray-600 hover:text-gray-900"
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      )}
    </div>
  );
}

function SelectField({ name, label, value, onChange, options }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-red-400"
      >
        <option value="">Seçiniz...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

const CreateClinicPatientModal = ({ onClose, isOpen = true }) => {
  const [accountData, setAccountData] = useState({ username: '', email: '', password: '' });
  const [formData, setFormData] = useState({
    age: '', gender: '', height: '', weight: '', activity_level: '', fitness_goal: '', weight_change_goal: '',
    pregnancy: false, breastfeeding: false, nationality: '', residing_country: '', lifestyle: '', allergies: '',
    regular_medications: '', medical_history: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleAccountChange = (e) => {
    setAccountData({ ...accountData, [e.target.name]: e.target.value });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleCreate = async () => {
    setIsSaving(true);
    try {
      const userRes = await createClinicPatientAction(accountData);
      if (!userRes || !userRes.clinic_patient_id) {
        throw new Error("Hasta hesabı oluşturulamadı.");
      }

      const id = userRes.clinic_patient_id;
      const fullProfile = {
        ...formData,
        age: Number(formData.age),
        height: Number(formData.height),
        weight: Number(formData.weight),
        weight_change_goal: Number(formData.weight_change_goal),
        clinic_patient_id: id,
      };

      const userInputRes = await createClinicPatientInputAction(fullProfile);
      if (!userInputRes || userInputRes.error) {
        throw new Error("Kullanıcı bilgileri kaydedilemedi.");
      }

      window.location.href = '/dashboard/dietitian/patients';
      onClose();
    } catch (err) {
      console.error("Hasta oluşturulurken hata:", err);
      alert(err?.message || "Bilinmeyen bir hata oluştu!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-10 flex justify-end items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            // Arka plana tıklanırsa modal kapansın
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            className="w-full max-w-4xl bg-color2/30 backdrop-blur-3xl dark:bg-color33/30 p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-gray-800 dark:text-gray-100">Yeni Hasta Oluştur</h2>
              <button onClick={onClose}>
                <FaTimes className="text-red-500 hover:text-red-700" />
              </button>
            </div>

            {/* Hesap Bilgileri */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <InputField 
                name="username" 
                label="Kullanıcı Adı" 
                value={accountData.username} 
                onChange={handleAccountChange} 
              />
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  data-lpignore="true"
                  data-form-type=""
                  value={accountData.email}
                  onChange={handleAccountChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-red-400"
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Şifre
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  data-lpignore="true"
                  data-form-type=""
                  value={accountData.password}
                  onChange={handleAccountChange}
                  className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-red-400"
                />
               
              </div>
            </div>

            {/* Profil Formu */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputField name="age" label="Yaş" type="number" value={formData.age} onChange={handleFormChange} />
              <SelectField
                name="gender"
                label="Cinsiyet"
                value={formData.gender}
                onChange={handleFormChange}
                options={[
                  { label: 'Erkek', value: 'Male' },
                  { label: 'Kadın', value: 'Female' }
                ]}
              />
              <InputField name="height" label="Boy (cm)" type="number" value={formData.height} onChange={handleFormChange} />
              <InputField name="weight" label="Kilo (kg)" type="number" value={formData.weight} onChange={handleFormChange} />
              <SelectField
                name="activity_level"
                label="Aktivite Seviyesi"
                value={formData.activity_level}
                onChange={handleFormChange}
                options={[
                  { label: 'Düşük', value: 'low' },
                  { label: 'Orta', value: 'moderate' },
                  { label: 'Yüksek', value: 'high' }
                ]}
              />
              <SelectField
                name="fitness_goal"
                label="Fitness Goal"
                value={formData.fitness_goal || ""}
                onChange={handleFormChange}
                options={[
                  { value: "weight_loss", label: "Lose Weight" },
                  { value: "maintenance", label: "Maintain Weight" },
                  { value: "weight_gain", label: "Gain Weight" },
                ]}
              />
              <InputField name="weight_change_goal" label="Kilo Değişim Hedefi (kg)" type="number" value={formData.weight_change_goal} onChange={handleFormChange} />
              <InputField name="nationality" label="Uyruk" value={formData.nationality} onChange={handleFormChange} />
              <SelectField
                name="residing_country"
                label="Residing Country"
                value={formData.residing_country || ""}
                onChange={handleFormChange}
                options={[
                  { value: "Turkey", label: "Turkey" },
                  { value: "United States", label: "United States" },
                  { value: "United Kingdom", label: "United Kingdom" },
                  { value: "Germany", label: "Germany" },
                  { value: "France", label: "France" },
                  { value: "Italy", label: "Italy" },
                  { value: "Spain", label: "Spain" },
                  { value: "Netherlands", label: "Netherlands" },
                  { value: "Belgium", label: "Belgium" },
                  { value: "Switzerland", label: "Switzerland" },
                  { value: "Austria", label: "Austria" },
                  { value: "Denmark", label: "Denmark" },
                  { value: "Finland", label: "Finland" },
                  { value: "Sweden", label: "Sweden" },
                  { value: "Norway", label: "Norway" },
                  { value: "Ireland", label: "Ireland" },
                  { value: "Poland", label: "Poland" },
                  { value: "Czech Republic", label: "Czech Republic" },
                  { value: "Slovakia", label: "Slovakia" },
                  { value: "Hungary", label: "Hungary" },
                  { value: "Romania", label: "Romania" },
                  { value: "Bulgaria", label: "Bulgaria" },
                  { value: "Greece", label: "Greece" },
                  { value: "Portugal", label: "Portugal" },
                  { value: "Croatia", label: "Croatia" },
                  { value: "Slovenia", label: "Slovenia" },
                  { value: "Serbia", label: "Serbia" },
                  { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
                  { value: "Macedonia", label: "Macedonia" },
                  { value: "Albania", label: "Albania" },
                  { value: "Montenegro", label: "Montenegro" },
                  { value: "Kosovo", label: "Kosovo" },
                  { value: "Other", label: "Other" },
                ]}
              />
              <InputField name="lifestyle" label="Yaşam Tarzı" value={formData.lifestyle} onChange={handleFormChange} />
              <InputField name="allergies" label="Alerjiler" value={formData.allergies} onChange={handleFormChange} />
              <InputField name="regular_medications" label="Düzenli İlaçlar" value={formData.regular_medications} onChange={handleFormChange} />
              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tıbbi Geçmiş</label>
                <textarea
                  name="medical_history"
                  value={formData.medical_history}
                  onChange={handleFormChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-red-400"
                />
              </div>
              {formData.gender === "Female" && (
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="pregnancy" checked={formData.pregnancy} onChange={handleFormChange} />
                  Hamile misiniz?
                </label>
              )}
              {formData.gender === "Female" && (
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="breastfeeding" checked={formData.breastfeeding} onChange={handleFormChange} />
                  Emziriyor musunuz?
                </label>
              )}
            </div>

            {/* Kaydet Butonu */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCreate}
                disabled={isSaving}
                className="bg-color4 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <FaSave />
                {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateClinicPatientModal;