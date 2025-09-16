"use client";
import ClinicPatientByIdPage from '@/components/main/clinic-patient/ClinicPatientByIDPage/ClinickPatientByIdPage';
import { useParams } from 'next/navigation';
import React from 'react'

const ClinikPatientById = () => {
    const { id } = useParams();
    
 
    return (
        <>
        <ClinicPatientByIdPage id={id} />
        </>
    )
}

export default ClinikPatientById
