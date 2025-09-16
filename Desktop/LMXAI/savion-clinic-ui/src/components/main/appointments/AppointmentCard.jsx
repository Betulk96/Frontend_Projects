import React from 'react';

const AppointmentCard = () => {
    const appointments = [
        { id: 1, patient: "Ayşe Yılmaz", time: "09:00", type: "Kontrol Muayenesi", duration: "30 dk" },
        { id: 2, patient: "Mehmet Demir", time: "10:30", type: "İlk Görüşme", duration: "45 dk" },
        { id: 3, patient: "Elif Arslan", time: "13:00", type: "Diyet Revizyonu", duration: "30 dk" },
        { id: 4, patient: "Can Özkan", time: "14:30", type: "Kontrol Muayenesi", duration: "30 dk" },
        { id: 5, patient: "Zeynep Kaya", time: "16:00", type: "Beslenme Eğitimi", duration: "45 dk" },
    ];

    return (
        <div className="space-y-4">
            {appointments.map((appointment) => (
                <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition-shadow hover:bg-color6/50 dark:hover:bg-color22"
                >
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white  text-lg">
                        {appointment.patient.charAt(0)}
                    </div>

                    {/* Appointment Info */}
                    <div className="flex-1 ml-4">
                        <h4 className=" text-gray-800 dark:text-white">{appointment.patient}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-300">{appointment.type}</p>
                    </div>

                    {/* Time Info */}
                    <div className="text-right">
                        <p className="font-medium text-gray-800 dark:text-white">{appointment.time}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-300">{appointment.duration}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AppointmentCard;
