import React from "react";
import Image from "next/image";
import { IoPencil } from "react-icons/io5";

const Loader = ({ question }) => (
  <div className="overflow-y-auto ms-6 mb-6 flex flex-col md:flex-row items-start gap-4">
    {/* Avatar */}
    <div className="hidden md:block md:w-10">
      <Image
        src="/logo/logo.png"
        width={38}
        height={38}
        alt="user-avatar"
        className="rounded-full bg-gray-300 px-3 p-2"
      />
    </div>

    {/* Question and Pencil */}
    <div className="flex-1">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 dark:text-white">{question}</span>
        <IoPencil size={20} className="text-gray-400 flex-shrink-0" />
      </div>
      <div className="h-px bg-gray-300 dark:bg-gray-700 mb-3"></div>

      {/* Placeholder content */}
      <div className="space-y-2 animate-pulse">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/5"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-11/12"></div>
      </div>
    </div>
  </div>
);

export default Loader;
