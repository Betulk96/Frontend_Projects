"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaUser } from "react-icons/fa";

const UserMenuGuest = () => {
  const router = useRouter();

  return (
    <div onClick={() => router.push('/login')} className="hidden md:flex relative hover:cursor-pointer text-color2">
      <FaUser size="24" />     
        Login
     

    </div>

  );
};

export default UserMenuGuest;
