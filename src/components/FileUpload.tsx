"use client"
import React from 'react'
import { useDropzone } from 'react-dropzone'
import { Inbox, Loader2 } from 'lucide-react'
import { uploadToS3 } from '@/lib/s3';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { log } from 'console';
import { useRouter } from 'next/navigation';



const FileUpload = () => {
  const router = useRouter();
const [uploading, setUploading] = React.useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });
      return response.data;
    },
  });

    const { getRootProps, getInputProps } = useDropzone({
            accept: { "application/pdf": [".pdf"] },
            maxFiles: 1,
            onDrop: async (acceptedFiles) => {
                const file = acceptedFiles[0];
                if (file.size > 10 * 1024 * 1024) {
                    // bigger than 10mb!
                    toast.error("File too large");
                    return;
                }
                try {
                    setUploading(true);
                    const data = await uploadToS3(file);
                    console.log("data", data);
                    
                    if(!data?.file_key || !data.file_name) {
                        toast.error("Something went wrong");
                        return;
                    }
                    mutate(data, {
                        onSuccess: ({chat_id}) => {
                            // toast.success(data.message);
                            console.log("file uploaded", data);
                            toast.success("success");
                            router.push(`/chat/${chat_id}`);
                        },
                        onError: (err) => {
                            toast.error("Error creating chat");
                            console.log(err);
                        },
                    });
                    
                } catch (error) {
                    console.log("error uploading file", error);
                } finally {
                    setUploading(false);
                }                   
            },
    });
  return (
    <div className="p-2 bg-black rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-black-800 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        {uploading || isPending ? (
          <>
            {/* loading state */}
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">
              Spilling Tea to GPT...
            </p>
          </>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">Drop Reports PDF Here</p>
          </>
        )}
      </div>
    </div>
  );
};
//     <div className='p-2 bg-black rounded-xl'>
//         <div {...getRootProps({
//             {
//                 className: "border-dashed border-2 rounded-xl cursor-pointer bg-black-800 py-8 flex justify-center items-center flex-col",
//         })}
//         >
//         <input className='bg-transparent' {...getRootProps()}/>
//         {uploading || isLoading ? (
//             <>
//             <Loader2 className='h-10 w-10 text-blue-500 animate-spin'/>
//             <p className='mt-2 text-sm text-slate-300'>Spilling tea to GPT...</p>
//             </>
//         ): (
//         <>
//         <Inbox className="w-10 h-10 text-blue-500" />
//         <p className='mt-2 text-sm text-slate-300'>Drop your PDF here</p>
//         </>
//         )}
//         </div >
//     </div>
//   )
// }

export default FileUpload;