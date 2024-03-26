import {Button} from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";

export default async function Home() {
  const {userId} = await auth()
  const isAuth = !!userId
  return (
   <div className="w-screen min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
          <h1 className="mr-3 text-5xl font-semibold text-white">Converse with <span className="text-purple-300">Docs</span></h1>
          <UserButton afterSignOutUrl="/" />
          </div>

          <div className="flex mt-2">
            {isAuth && <Button className="bg-orange-700">View Chats</Button>}
          </div>
          <p className="text-slate-300 max-w-xl mt-1 text-lg">
            Access document intelligence fo quick query resolution and <br /> deep understanding
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
      </div>
   </div>
  );
}
