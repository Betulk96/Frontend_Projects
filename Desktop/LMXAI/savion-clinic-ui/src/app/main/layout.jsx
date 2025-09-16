import { auth } from '@/auth';
import Sidebar from '@/components/main/Sidebar';

import UserSection from '@/components/main/UserSection';

import React from 'react'

const MainLayout = async({ children }) => {
    const session =await auth();
   // console.log("session", session);
    return (
        <div
            className="relative flex min-h-screen bg-cover bg-center"

        >
            {/* Arka Plan Opaklığı */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-color6 to-color7"></div>

            {/* İçerik */}
            <div className="relative z-10 flex w-full">
                {/* Sidebar */}
                <div className="xl:flex flex-col pt-[80px] h-screen ">
                    <Sidebar session={session} />
                </div>

                {/* Sağ Taraf: Header + Main Content */}
                <div className="flex flex-col flex-1 xl:ml-[90px] min-h-screen">
                    
                    <main className="flex-1 overflow-auto">
                        {children}
                    </main>
                </div>
                <div className="w-auto flex justify-end ">
                    <UserSection session={session} />
                </div>
            </div>
        </div>
    )

}

export default MainLayout
