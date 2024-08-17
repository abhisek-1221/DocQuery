import React from 'react'
import {Button} from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { checkSubscription } from '@/lib/subcription'
import SubscriptionButton from '@/components/SubscriptionButton'
import { ArrowRight } from 'lucide-react'
import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { chats } from "@/lib/db/schema";

export const Homie = async () => {
    const {userId} = await auth()
    const isAuth = !!userId
    const isPro = await(checkSubscription())
    let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }
  return (
    <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
          <h1 className="mr-3 text-5xl font-semibold text-white">Smart AI for <span className="text-purple-300">Thrift Stores</span></h1>
          <UserButton afterSignOutUrl="/" />
          </div>

          <div className="flex mt-2">
            {isAuth && firstChat && (
              <>
                <Link href={`/chat/${firstChat.id}`}>
                  <Button className='bg-orange-700'>
                    Visit Chats <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <div className="ml-3">
                  <SubscriptionButton isPro={isPro} />
                </div>
              </>
            )}
          </div>
          <p className="text-slate-300 max-w-xl mt-1 text-lg">
          AI-Driven Sentiment Analysis 
          <br /> and Actionable Insights
          </p>
          <div className="w-full mt-4">
            {isAuth ? (
            <FileUpload />
            ):(
              <Link href='/sign-in'>
              <Button className="bg-orange-700">Login to get Started 
                <LogIn className="w-4 h-4 ml-2"/>
              </Button>
              </Link>
            )}
          </div>
        </div>
  )
}