"use client";

import React, { useEffect, useState } from "react";
import { FaSearch, FaUserFriends, FaPlus } from "react-icons/fa";
import PatientCard from "./PatientCard";
import { getClinicPatientListAction } from "@/actions/clinic-patient-actions";
import { getClinicInputsAction } from "@/actions/user-input-actions";
import CreateClinicPatientModal from "./CreateClinicPatientModal";
import ClinicPatientSkeleton from "./ClinicPatientSkeleton";

const ClinikPatient = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [patients, setPatients] = useState([]);
    const [userInputs, setUserInputs] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); // ✅ Tutarlı state adı

    useEffect(() => {
        const fetchDataSequential = async () => {
            try {
                setLoading(true);
                setError("");

                const patientList = await getClinicPatientListAction();
                
                if (!Array.isArray(patientList)) {
                    throw new Error("Invalid patient list format.");
                }
                setPatients(patientList);

                const inputMap = {};

                for (const patient of patientList) {
                    const id = patient.clinic_patient_id;
                    if (!id) continue;

                    try {
                        const input = await getClinicInputsAction(id);
                        if (input) {
                            inputMap[id] = input;
                        } else {
                            console.warn(`No data found for (${id}):`);
                        }
                    } catch (inputErr) {
                        console.error(`Error fetching input (${id}):`, inputErr);
                    }
                }

                setUserInputs(inputMap);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("An error occurred while fetching data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchDataSequential();
    }, []);

    // ✅ Modal kapanınca verileri yeniden fetch et
    const handleModalClose = () => {
        setIsModalOpen(false);
        // Yeni hasta eklendikten sonra listeyi yenile
        const refreshData = async () => {
            try {
                const patientList = await getClinicPatientListAction();
                if (Array.isArray(patientList)) {
                    setPatients(patientList);
                    
                    // Yeni eklenen hasta için input verilerini de getir
                    const inputMap = { ...userInputs };
                    for (const patient of patientList) {
                        const id = patient.clinic_patient_id;
                        if (!id || inputMap[id]) continue; // Zaten var olan verileri tekrar getirme
                        
                        try {
                            const input = await getClinicInputsAction(id);
                            if (input) {
                                inputMap[id] = input;
                            }
                        } catch (inputErr) {
                            console.error(`Error fetching input (${id}):`, inputErr);
                        }
                    }
                    setUserInputs(inputMap);
                }
            } catch (err) {
                console.error("Error refreshing data:", err);
            }
        };
        
        refreshData();
    };

    const filteredPatients = Array.isArray(patients)
        ? patients.filter((patient) => {
            const searchLower = searchTerm.toLowerCase();
            return (
                patient.username?.toLowerCase().includes(searchLower) ||
                patient.email?.toLowerCase().includes(searchLower) ||
                patient.clinic_patient_id?.toLowerCase().includes(searchLower)
            );
        })
        : [];

    if (loading) {
        return <ClinicPatientSkeleton />;
    }

    if (error) {
        return (
            <div className="min-h-screen p-6 text-center py-10">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                    <div className="text-red-600 mb-2">Create Patient</div>
                    <p className="text-red-700 text-sm">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-color3/20 min-h-screen p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-2 pt-20">
                <h2 className="text-2xl text-gray-800">
                    Patient List ({filteredPatients.length})
                </h2>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                        />
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)} // ✅ Doğru state setter
                        className="px-4 py-2 bg-color3 text-white rounded-lg hover:bg-color3/80 transition-colors flex items-center space-x-2"
                    >
                        <FaPlus className="w-4 h-4" />
                        <span>Add New Patient</span>
                    </button>
                </div>
            </div>

            {/* İstatistik Kartları */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="bg-blue-50/50 backdrop-blur-md shadow-sm p-4 rounded-lg">
                    <div className="text-color1 text-sm font-medium">Total Patients</div>
                    <div className="text-2xl text-color1">{patients.length}</div>
                </div>
                <div className="bg-green-50/50 backdrop-blur-md shadow-sm p-4 rounded-lg">
                    <div className="text-color2 text-sm font-medium">Active Patients</div>
                    <div className="text-2xl text-color2">
                        {Object.keys(userInputs).length}
                    </div>
                </div>
                <div className="bg-yellow-50/50 backdrop-blur-md shadow-sm p-4 rounded-lg">
                    <div className="text-color5 text-sm font-medium">Missing Data</div>
                    <div className="text-2xl text-color5">
                        {patients.length - Object.keys(userInputs).length}
                    </div>
                </div>
            </div>

            {/* Hasta Kartları */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {filteredPatients.map((patient) => (
                    <PatientCard
                        key={patient.clinic_patient_id}
                        patient={{
                            patient: {
                                ...patient,
                                id: patient.clinic_patient_id
                            },
                            input: userInputs[patient.clinic_patient_id],
                        }}
                    />
                ))}
            </div>

            {/* Boş Durum */}
            {filteredPatients.length === 0 && (
                <div className="text-center py-12">
                    <FaUserFriends className="text-4xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No patients found matching your criteria.</p>
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="mt-4 text-blue-600 hover:text-blue-800 underline"
                        >
                            Show All Patients
                        </button>
                    )}
                </div>
            )}

            {/* Modal - ✅ Tutarlı prop'lar */}
            {isModalOpen && (
                <CreateClinicPatientModal
                    onClose={handleModalClose}
                    isOpen={isModalOpen}
                />
            )}
        </div>
    );
};

export default ClinikPatient;