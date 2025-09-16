import React from "react";
import { FaTimes } from "react-icons/fa";

const PatientDetailModal = ({ isOpen, onClose, patientData }) => {
    if (!isOpen || !patientData) return null;

    const { patient, input } = patientData;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-gray-50 rounded-2xl shadow-2xl w-[90%] max-w-4xl max-h-[90vh] p-6 relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {/* Kapatma Butonu */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-colors"
                    aria-label="Kapat"
                >
                    <FaTimes size={20} />
                </button>

                {/* Başlık */}
                <h2 className="text-3xl  mb-6 text-center text-green-700 border-b border-gray-200 pb-2">
                    Hasta Detayları
                </h2>

                {/* Bilgi Alanları */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700 ">
                    <Info label="Ad / Kullanıcı" value={patient.username || patient.email} />
                    <Info label="Hasta ID" value={patient.clinic_patient_id} />
                    <Info label="Yaş" value={input?.age} />
                    <Info label="Cinsiyet" value={input?.gender} />
                    <Info label="Boy" value={input?.height ? `${input.height} cm` : null} />
                    <Info label="Kilo" value={input?.weight ? `${input.weight} kg` : null} />
                    <Info label="Aktivite Düzeyi" value={input?.activity_level} />
                    <Info label="Hedef" value={input?.fitness_goal} />
                    <Info label="Kilo Hedefi" value={input?.weight_change_goal} />
                    <Info label="Ülke" value={input?.residing_country} />
                    <Info label="Uyruk" value={input?.nationality} />
                    <Info label="Yaşam Tarzı" value={input?.lifestyle} />
                    <Info label="Tıbbi Geçmiş" value={input?.medical_history} />
                    <Info label="Düzenli İlaçlar" value={input?.regular_medications} />
                    <Info label="Alerjiler" value={input?.allergies} />
                    <Info label="Hamilelik" value={input?.pregnancy ? "Evet" : "Hayır"} />
                    <Info label="Emzirme" value={input?.breastfeeding ? "Evet" : "Hayır"} />
                </div>
            </div>
        </div>
    );
};

const Info = ({ label, value }) => (
    <div className="border-b border-gray-200 pb-2 ">
        <p className=" text-color6">{label}:</p>
        <p className="text-gray-900 first-letter:uppercase">{value ?? "Belirtilmemiş"}</p>
    </div>
);

export default PatientDetailModal;
