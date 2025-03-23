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
    const user = await currentUser();
    if (!_chats) {
        return redirect('/');
    }
    if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
        return redirect('/');
    }
    const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
    const isPro = await checkSubscription();

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-stone-900 via-[#120a09] to-black text-gray-100 p-2 sm:p-3 md:p-4 gap-2 md:gap-4">
            {/* Chat Sidebar - collapses to top on mobile */}
            <div className="w-full md:w-64 lg:w-72 h-auto md:h-full bg-white/10 backdrop-filter backdrop-blur-lg rounded-2xl md:rounded-3xl p-2 md:p-3 mb-2 md:mb-0 flex-shrink-0">
                <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} userName={user?.firstName || ''} />
            </div>
            
            {/* Main Content */}
            <div className="flex-1 flex h-[calc(100vh-90px)] md:h-full rounded-3xl overflow-hidden">
                <div className="w-full h-full">
                    <ChatComponent chatId={parseInt(chatId)} pdfUrl={currentChat?.pdfUrl || ''} />
                </div>
            </div>
            
            {/* Background Pattern */}
            <div
                className="fixed inset-0 z-[-2] bg-black bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"
                aria-hidden="true"
            />
        </div>
    )
};