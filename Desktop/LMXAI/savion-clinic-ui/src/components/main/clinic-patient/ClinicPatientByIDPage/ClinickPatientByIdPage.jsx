"use client";
import { getClinicPatientDetailsAction } from "@/actions/clinic-patient-actions";
import { getClinicInputsAction } from "@/actions/user-input-actions";
import React, { useEffect, useRef, useState } from "react";
import DietPolicyPage from "./DietPolicyPage";
import PatientDetailModal from "../PatientDetailModal";
import { Mail, User } from "lucide-react";
import ChatAIChatSection from "./PatientChat";
import { authAction } from "@/actions/auth-action";
import { ChevronDown, ChevronUp } from "lucide-react";
import PatientHistoryDropdown from "./PatientHistoryDropdown";


const ClinicPatientByIdPage = ({ id }) => {
    const [inputs, setInputs] = useState(null);
    const [detail, setDetail] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const buttonRef = useRef(null);

    // Chat history dropdown state
    const [showHistory, setShowHistory] = useState(false);
    const [chatHistory] = useState([
        { id: 1, title: "Weight Loss Plan Discussion" },
        { id: 2, title: "Keto Diet Suggestions" },
        { id: 3, title: "Intermittent Fasting Guidance" },
        { id: 4, title: "Vegan Meal Ideas" },
        { id: 5, title: "High Protein Diet Tips" },
        { id: 6, title: "Mediterranean Diet Overview" },
    ]);



    const handleViewDetails = (patientData) => {
        setSelectedPatient(patientData);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPatient(null);
    };

    useEffect(() => {
        const fetchDataSequential = async () => {
            try {
                setLoading(true);
                const detailData = await getClinicPatientDetailsAction(id);
                setDetail(detailData);

                const inputData = await getClinicInputsAction(id);
                setInputs(inputData);
            } catch (err) {
                console.error(`Veri getirme hatası (${id}):`, err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDataSequential();
        }
    }, [id]);

    return (
        <div className="bg-color3/20 min-h-screen p-6 space-y-4 sm:space-y-2 pt-10">
            {/* Kullanıcı Bilgileri */}
            {loading ? (
                <SkeletonCard />
            ) : (
                detail && (
                    <div
                        className="mt-8 p-6 bg-white/40 dark:bg-gray-700/30 backdrop-blur-md rounded-2xl shadow-md shadow-color1/30 hover:shadow-lg hover:bg-white/80 transition-shadow"
                        onClick={() => handleViewDetails({ patient: detail, input: inputs })}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                            <InfoItem
                                icon={<User size={18} />}
                                label="Adı"
                                value={detail.username}
                            />
                            <InfoItem
                                icon={<Mail size={18} />}
                                label="Email"
                                value={detail.email}
                            />

                            <div className="flex justify-end relative">
                                <div
                                    ref={buttonRef}
                                    className="px-4 py-2 bg-gradient-to-br from-color2 to-color3 rounded-full flex items-center justify-center cursor-pointer text-white"
                                    onClick={(e) => {
                                        e.stopPropagation(); // üstteki div tetiklenmesin
                                        setShowHistory((prev) => !prev);
                                    }}
                                >
                                    {`${detail.username} Chat History `}
                                    {showHistory ? (
                                        <ChevronUp className="ml-2" size={16} />
                                    ) : (
                                        <ChevronDown className="ml-2" size={16} />
                                    )}
                                </div>

                                {showHistory && (
                                    <PatientHistoryDropdown
                                        chatHistory={chatHistory}
                                        anchorEl={buttonRef.current}
                                        onClose={() => setShowHistory(false)}
                                    />
                                )}

                            </div>
                        </div>
                    </div>
                )
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 z-10">
                <ChatAIChatSection detail={detail} />
                {/* Diyet Politikası */}
                <DietPolicyPage id={id} />


            </div>

            {/* Modal */}
            <PatientDetailModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                patientData={selectedPatient}
            />
        </div>
    );
};

// Tek satırlık bilgi componenti
const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-start space-x-3">
        <div className="text-gray-500 mt-1">{icon}</div>
        <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wide text-gray-500">
                {label}
            </span>
            <span className="text-base font-medium text-gray-900">
                {value || "-"}
            </span>
        </div>
    </div>
);

// Skeleton Loader
const SkeletonCard = () => (
    <div className="shadow rounded-2xl p-6 animate-pulse">
        <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
                <div key={i} className="flex flex-col space-y-2">
                    <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                    <div className="h-5 w-2/3 bg-gray-300 rounded"></div>
                </div>
            ))}
        </div>
    </div>
);

export default ClinicPatientByIdPage;
