"use client";
import ImageUploadCropper from "@/component/ImageUploadCropper";
import { AnimatePresence, motion } from "framer-motion";


export default function VisualIdentity() {
  return (
    <div className="flex flex-col h-full">
        <div>
             <div className="w-full rounded-full h-1 bg-[#a3a3a3] mb-5">
                <div className=" h-1 rounded-full" style={{width:'50%', background:'linear-gradient(103deg,rgba(27, 197, 11, 1) 0%, rgba(226, 255, 223, 1) 100%)'}}></div>
            </div>
      <div className="mb-6">
        <ImageUploadCropper
          aspect={16 / 4}
          title="Drag or upload Cover Image"
          requred={true}
          subtitle="Prefer Size 1920X1024 | Max size 1mb"
          cropShape="rect"
          onCropped={(croppedFile, url, rawFile) => {
            console.log(rawFile);
            // croppedFile → File (not just Blob) — has .name and .type, ready for FormData/S3 upload
            // url         → local object URL for instant preview
            // rawFile     → the original File exactly as dropped, before cropping
          }}
        />
      </div>
         <div className="mb-6 flex gap-6">
            <div className="w-[25%] h-62">
                  <ImageUploadCropper
                    aspect={1}
                    title="Drag or upload Profile Photo"
                    requred={true}
                    subtitle="Prefer Size 500X500 | Max size 1mb "
                    cropShape="round"
                    onCropped={(croppedFile, url, rawFile) => {}}
                />
            </div>
            <div className="w-[25%] h-62">
                      <ImageUploadCropper
                    aspect={1}
                    title="Drag or upload your logo"
                    requred={false}
                    subtitle="Prefer Size 500X500 | Max size 1mb "
                    cropShape="round"
                    onCropped={(croppedFile, url, rawFile) => {}}
                />
            </div>
          
         </div>
        </div>
         <motion.button
            whileHover={{ scale: 1.1 }}
            className="theme-bttn mt-auto self-end"
            >
        
        Save & Continue
        
            </motion.button>
    </div>
  );
}
