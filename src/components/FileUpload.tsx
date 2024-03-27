"use client"
import React from 'react'
import { useDropzone } from 'react-dropzone'
import { Inbox } from 'lucide-react'
import { uploadToS3 } from '@/lib/s3';
import { toast } from 'react-toastify';


function FileUpload() {
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
                    const data = await uploadToS3(file);
                    console.log("data", data);
                    
                } catch (error) {
                    console.log("error uploading file", error);
                }
                         
            }
    });
  return (
    <div className='p-2 bg-black rounded-xl'>
        <div {...getRootProps(
            {
                className: "border-dashed border-2 rounded-xl cursor-pointer bg-black-800 py-8 flex justify-center items-center flex-col"
            }
        )}>
        <input className='bg-transparent' {...getRootProps()}/>
        <>
        <Inbox className="w-10 h-10 text-blue-500" />
        <p className='mt-2 text-sm text-slate-300'>Drop your PDF here</p>
        </>
        </div >
        
    </div>
  )
}

export default FileUpload