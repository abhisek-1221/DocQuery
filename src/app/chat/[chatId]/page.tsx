import { db } from '@/lib/db'
import { chats } from '@/lib/db/schema'
import { auth } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React from 'react'
import ChatSideBar from '@/components/ChatSideBar'

type Props = {
    params: {
        chatId: string
    }
}

export default async function ChatPage({params : {chatId}}: Props) {
    const {userId} = await auth();
    if (!userId) {
        return redirect('/sign-in')
    }
    const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
    if (!_chats) {
        return redirect('/');
    }
    if(!_chats.find((chat) => chat.id === parseInt(chatId))) {
        return redirect('/');
    }
  return (
    <div className='flex max-h-screen overflow-scroll'>
        <div className="flex w-full max-h-screen overflow-scroll">

            {/* chat side bar */}
            <div className='flex-[1] max-w-xs'>
                <ChatSideBar chats={_chats} chatId={parseInt(chatId)} />
            </div>
            {/* pdf viewer */}
            <div className='max-h-screen p-4 overflow-scroll flex-[5]'>

            </div>
            {/* chat component */}
            <div className='flex-[3] border-1-4 border-1-slate-200'>

            </div>
        </div>
        {/* <div
    className='absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] 
    bg-[size:20px_20px]'
    aria-hidden='true'
/> */}
    </div>
  )
};
