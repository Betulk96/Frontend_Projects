"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaUser, FaWeight, FaCalendarAlt, FaMapMarkerAlt, FaExclamationTriangle } from 'react-icons/fa';

const PatientCard = ({ patient }) => {
    // Patient ve input verilerini ayır
    const patientData = patient.patient;
    const inputData = patient.input;
    const router = useRouter();

    const handleViewDetails = () => {
        // Patient ID'sini alarak URL'e yönlendir
        const patientId = patientData?.id || patientData?._id;
        if (patientId) {
            router.push(`/main/patients/${patientId}`);
        }
    };

    // Güvenli veri erişimi için yardımcı fonksiyonlar
    const getPatientName = () => {
        if (patientData?.username) return patientData.username;
        if (patientData?.email) return patientData.email.split('@')[0];
        return 'Hasta';
    };

    const getPatientInitial = () => {
        const name = getPatientName();
        return name.charAt(0).toUpperCase();
    };

    const getAge = () => {
        return inputData?.age || 'Belirtilmemiş';
    };

    const getGoalText = () => {
        if (!inputData?.fitness_goal) return 'Hedef Belirlenmemiş';

        switch (inputData.fitness_goal) {
            case 'weight_loss': return 'Kilo Verme';
            case 'weight_gain': return 'Kilo Alma';
            case 'muscle_gain': return 'Kas Kazanma';
            case 'maintenance': return 'Koruma';
            default: return inputData.fitness_goal;
        }
    };

    const getPatientStatus = () => {
        if (!inputData?.height || !inputData?.weight) return 'Normal';

        // BMI hesapla
        const heightInMeters = inputData.height / 100;
        const bmi = inputData.weight / (heightInMeters * heightInMeters);

        if (bmi < 18.5) return 'warning';
        if (bmi > 30) return 'risk';
        return 'normal';
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'normal': return 'Normal';
            case 'warning': return 'Dikkat';
            case 'risk': return 'Risk';
            default: return 'Normal';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'normal': return 'bg-green-100 text-green-700';
            case 'warning': return 'bg-yellow-100 text-yellow-700';
            case 'risk': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getCurrentWeight = () => {
        return inputData?.weight || 'Belirtilmemiş';
    };

    const getTargetWeight = () => {
        if (!inputData?.weight || !inputData?.weight_change_goal) return 'Belirtilmemiş';

        const currentWeight = inputData.weight;
        const changeGoal = inputData.weight_change_goal;

        // Fitness goal'a göre hedef kilo hesapla
        if (inputData.fitness_goal === 'weight_loss') {
            return currentWeight - changeGoal;
        } else if (inputData.fitness_goal === 'weight_gain') {
            return currentWeight + changeGoal;
        }

        return currentWeight; // maintenance için
    };

    const status = getPatientStatus();

    // Eğer input data yoksa uyarı göster
    if (!inputData) {
        return (
            <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-md shadow-color1/30 transition-colors">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white ">
                            {getPatientInitial()}
                        </div>
                        <div>
                            <h4 className=" text-gray-800">{getPatientName()}</h4>
                            <p className="text-sm text-gray-500">Veri eksik</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 flex items-center space-x-1">
                            <FaExclamationTriangle className="w-3 h-3" />
                            <span>Eksik</span>
                        </div>
                        <button
                            onClick={handleViewDetails}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <FaEye />
                        </button>
                    </div>
                </div>
                <div className="mt-3 text-sm text-gray-500">
                    <p>Bu hasta için detaylı bilgi bulunmamaktadır.</p>
                </div>
            </div>
        );
    }

    return (
        <div
            onClick={handleViewDetails}
            className="cursor-pointer bg-white/50 dark:bg-gray-700/30   backdrop-blur-md p-6 rounded-2xl shadow-md shadow-color1/30 transition-colors hover:shadow-lg hover:bg-color3/50 dark:hover:bg-color22"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white ">
                        {getPatientInitial()}
                    </div>
                    <div>
                        <h4 className=" text-gray-800">{getPatientName()}</h4>
                        <p className="text-sm text-gray-500">{getAge()} yaş • {getGoalText()}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                        {getStatusText(status)}
                    </div>
                    <FaEye className="text-gray-400" />
                </div>
            </div>

            <div className="mt-3 flex justify-between text-sm">
                <span className="text-gray-600">
                    Son Kilo: <span className="font-medium">{getCurrentWeight()} kg</span>
                </span>
                <span className="text-gray-600">
                    Hedef: <span className="font-medium">{getTargetWeight()} kg</span>
                </span>
            </div>

            <div className="mt-2 flex flex-wrap gap-2 text-xs">
                {inputData.gender && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full first-letter:uppercase">
                        {inputData.gender}
                    </span>
                )}
                {inputData.activity_level && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full first-letter:uppercase">
                        {inputData.activity_level}
                    </span>
                )}
                {inputData.residing_country && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full first-letter:uppercase">
                        {inputData.residing_country}
                    </span>
                )}
            </div>
        </div>
    );
};

export default PatientCard;