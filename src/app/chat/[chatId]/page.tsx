import { db } from '@/lib/db'
import { chats } from '@/lib/db/schema'
import { auth, currentUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React from 'react'
import ChatSideBar from '@/components/ChatSideBar'
import ChatComponent from '@/components/ChatComponent'
import { checkSubscription } from '@/lib/subcription'

type Props = {
    params: {
        chatId: string
    }
}

export default async function ChatPage({ params: { chatId } }: Props) {
    const { userId } = await auth();
    if (!userId) {
        return redirect('/sign-in')
    }
    const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
    const user  = await currentUser();
    if (!_chats) {
        return redirect('/');
    }
    if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
        return redirect('/');
    }
    const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
    const isPro = await checkSubscription();

    return (
        <div className="flex h-screen bg-gradient-to-br from-stone-900 via-[#120a09] to-black text-gray-100 p-4">            
        {/* Chat Sidebar */}
        <div className="w-64 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-3 mr-4 flex flex-col">
                <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} userName={user?.firstName || ''} />
            </div>
            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl overflow-hidden">  <div className="flex flex-1">
                    {/* Chat Component */}
                    <div className="flex-1 px-10 py-4 bg-transparent">
                        <ChatComponent chatId={parseInt(chatId)} pdfUrl={currentChat?.pdfUrl || ''} />
                    </div> 
                </div>
            </div>
            {/* Background Pattern */}
            <div
                className="absolute top-0 left-0 z-[-2] h-screen w-screen bg-black bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] 
                bg-[size:20px_20px]"
                aria-hidden="true"
            />
        </div>
    )
};
