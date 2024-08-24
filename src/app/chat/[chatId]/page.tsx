import { db } from '@/lib/db'
import { chats } from '@/lib/db/schema'
import { auth } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React from 'react'
import ChatSideBar from '@/components/ChatSideBar'
import PDFViewer from '@/components/PDFViewer'
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
    if (!_chats) {
        return redirect('/');
    }
    if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
        return redirect('/');
    }
    const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
    const isPro = await checkSubscription();

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Chat Sidebar */}
            <div className="flex-shrink-0 w-1/5 bg-transparent border-r border-dashed border-opacity-5">
                <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
            </div>
            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <div className="flex flex-1 overflow-hidden">
                    {/* Chat Component */}
                    <div className="flex-1 overflow-auto p-4 bg-transparent">
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
