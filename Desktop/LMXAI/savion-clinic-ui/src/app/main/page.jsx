import { auth } from '@/auth';
import ChatAIChatSection from '@/components/chat';
import DietitianPage from '@/components/main/MainPage.jsx/DietitianPage';


import React from 'react'

export const metadata = {
    title: "Optimeal",
    description: "Diet for your health",
};

const ChatPage = async () => {

    const session = await auth();
    //console.log("session", session);

    return (
        <div >
          <DietitianPage />
        </div>
    )
}

export default ChatPage