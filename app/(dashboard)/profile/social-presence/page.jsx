"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ImageUp, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import ModalSide from "@/component/ModalSide";
import { FileUploader } from "react-drag-drop-files";
export default function SocialPresence() {

const [showModal, setShowModal] = useState(false)
const FILE_TYPES = ["JPG", "JPEG", "PNG", "WEBP"];
 const [rawFile, setRawFile] = useState(null); 
  const [rawImage, setRawImage] = useState(null); 
  const [error, setError] = useState("");


   const handleFile = (file) => {
     setError("");
     setRawFile(file);
     setRawImage(URL.createObjectURL(file));
   };
 
   const handleTypeError = () => {
     setError(`Please upload a ${FILE_TYPES.join(", ")} file.`);
   };





  return (
    <div className="flex flex-col h-full">
      <div>
        <div className="w-full rounded-full h-1 bg-[#a3a3a3] mb-5">
          <div
            className=" h-1 rounded-full"
            style={{
              width: "75%",
              background:
                "linear-gradient(103deg,rgba(27, 197, 11, 1) 73%, rgba(226, 255, 223, 1) 100%)",
            }}
          ></div>
        </div>

        <div className="flex items-center justify-between mb-10">
          <h4 className="text-[22px] font-medium">
            I am Available in Social Media Platforms
          </h4>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={()=>setShowModal(true)}
          >
            <Plus />
            Add new Social Platform
          </motion.button>
        </div>

        <div className="flex bg-[#270c3a] p-1 rounded-[7px] mb-7">
          <div className="w-65 flex items-center gap-2 border-r border-[#462e56]">
            <div className="bg-[#412354] rounded-[7px] w-18 h-18 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="3em"
                height="3em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M14.2 2.875A4.625 4.625 0 0 0 9.575 7.5v2.575H7.1c-.124 0-.225.1-.225.225v3.4c0 .124.1.225.225.225h2.475V20.9c0 .124.1.225.225.225h3.4c.124 0 .225-.1.225-.225v-6.975h2.497c.103 0 .193-.07.218-.17l.85-3.4a.225.225 0 0 0-.218-.28h-3.347V7.5a.775.775 0 0 1 .775-.775h2.6c.124 0 .225-.1.225-.225V3.1c0-.124-.1-.225-.225-.225z"
                ></path>
              </svg>
            </div>
            <h3 className="text-[20px]">Facebook</h3>
          </div>
          <input
            type="text"
            placeholder="Past you profile link"
            className="focus:outline-none px-7 w-full"
          />
        </div>
        <div className="flex bg-[#270c3a] p-1 rounded-[7px] mb-7">
          <div className="w-65 flex items-center gap-2 border-r border-[#462e56]">
            <div className="bg-[#412354] rounded-[7px] w-18 h-18 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="3em"
                height="3em"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3S645.3 585.4 645.3 512S585.4 378.7 512 378.7M911.8 512c0-55.2.5-109.9-2.6-165c-3.1-64-17.7-120.8-64.5-167.6c-46.9-46.9-103.6-61.4-167.6-64.5c-55.2-3.1-109.9-2.6-165-2.6c-55.2 0-109.9-.5-165 2.6c-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6c46.9 46.9 103.6 61.4 167.6 64.5c55.2 3.1 109.9 2.6 165 2.6c55.2 0 109.9.5 165-2.6c64-3.1 120.8-17.7 167.6-64.5c46.9-46.9 61.4-103.6 64.5-167.6c3.2-55.1 2.6-109.8 2.6-165M512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9S717.1 398.5 717.1 512S625.5 717.1 512 717.1m213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9s47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9"
                ></path>
              </svg>
            </div>
            <h3 className="text-[20px]">Instagram</h3>
          </div>
          <input
            type="text"
            placeholder="Past you profile link"
            className="focus:outline-none px-7 w-full"
          />
        </div>
        <div className="flex bg-[#270c3a] p-1 rounded-[7px] mb-7">
          <div className="w-65 flex items-center gap-2 border-r border-[#462e56]">
            <div className="bg-[#412354] rounded-[7px] w-18 h-18 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="3em"
                height="3em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19.321 5.562a5 5 0 0 1-.443-.258a6.2 6.2 0 0 1-1.137-.966c-.849-.971-1.166-1.956-1.282-2.645h.004c-.097-.573-.057-.943-.05-.943h-3.865v14.943q.002.3-.008.595l-.004.073q0 .016-.003.033v.009a3.28 3.28 0 0 1-1.65 2.604a3.2 3.2 0 0 1-1.6.422c-1.8 0-3.26-1.468-3.26-3.281s1.46-3.282 3.26-3.282c.341 0 .68.054 1.004.16l.005-3.936a7.18 7.18 0 0 0-5.532 1.62a7.6 7.6 0 0 0-1.655 2.04c-.163.281-.779 1.412-.853 3.246c-.047 1.04.266 2.12.415 2.565v.01c.093.262.457 1.158 1.049 1.913a7.9 7.9 0 0 0 1.674 1.58v-.01l.009.01c1.87 1.27 3.945 1.187 3.945 1.187c.359-.015 1.562 0 2.928-.647c1.515-.718 2.377-1.787 2.377-1.787a7.4 7.4 0 0 0 1.296-2.153c.35-.92.466-2.022.466-2.462V8.273c.047.028.672.441.672.441s.9.577 2.303.952c1.006.267 2.363.324 2.363.324V6.153c-.475.052-1.44-.098-2.429-.59"
                ></path>
              </svg>
            </div>
            <h3 className="text-[20px]">Tik Tok</h3>
          </div>
          <input
            type="text"
            placeholder="Past you profile link"
            className="focus:outline-none px-7 w-full"
          />
        </div>
        <div className="flex bg-[#270c3a] p-1 rounded-[7px] mb-7">
          <div className="w-65 flex items-center gap-2 border-r border-[#462e56]">
            <div className="bg-[#412354] rounded-[7px] w-18 h-18 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="3em"
                height="3em"
                viewBox="0 0 1536 1536"
              >
                <path
                  fill="currentColor"
                  d="M919 1175v-157q0-50-29-50q-17 0-33 16v224q16 16 33 16q29 0 29-49m184-122h66v-34q0-51-33-51t-33 51zM532 787v70h-80v423h-74V857h-78v-70zm201 126v367h-67v-40q-39 45-76 45q-33 0-42-28q-6-17-6-54V913h66v270q0 24 1 26q1 15 15 15q20 0 42-31V913zm252 111v146q0 52-7 73q-12 42-53 42q-35 0-68-41v36h-67V787h67v161q32-40 68-40q41 0 53 42q7 21 7 74m251 129v9q0 29-2 43q-3 22-15 40q-27 40-80 40q-52 0-81-38q-21-27-21-86v-129q0-59 20-86q29-38 80-38t78 38q21 29 21 86v76h-133v65q0 51 34 51q24 0 30-26q0-1 .5-7t.5-16.5V1153zM785 329v156q0 51-32 51t-32-51V329q0-52 32-52t32 52m533 713q0-177-19-260q-10-44-43-73.5t-76-34.5q-136-15-412-15q-275 0-411 15q-44 5-76.5 34.5T238 782q-20 87-20 260q0 176 20 260q10 43 42.5 73t75.5 35q137 15 412 15t412-15q43-5 75.5-35t42.5-73q20-84 20-260M563 391l90-296h-75l-51 195l-53-195h-78q7 23 23 69l24 69q35 103 46 158v201h74zm289 81V342q0-58-21-87q-29-38-78-38q-51 0-78 38q-21 29-21 87v130q0 58 21 87q27 38 78 38q49 0 78-38q21-27 21-87m181 120h67V222h-67v283q-22 31-42 31q-15 0-16-16q-1-2-1-26V222h-67v293q0 37 6 55q11 27 43 27q36 0 77-45zm503-304v960q0 119-84.5 203.5T1248 1536H288q-119 0-203.5-84.5T0 1248V288Q0 169 84.5 84.5T288 0h960q119 0 203.5 84.5T1536 288"
                ></path>
              </svg>
            </div>
            <h3 className="text-[20px]">You Tube</h3>
          </div>
          <input
            type="text"
            placeholder="Past you profile link"
            className="focus:outline-none px-7 w-full"
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        className="theme-bttn mt-auto self-end"
      >
        Save & Continue
      </motion.button>

<ModalSide isOpen={showModal} onClose={() => setShowModal(false)} closeOnBackdrop={false} size="md">
    <div className="bg-[#900DA4] flex items-center justify-between px-4 py-5">
      <h4 className="text-[18px] font-medium">Add New Social Platform</h4>
      <button onClick={() => setShowModal(false)} className="cursor-pointer">
        <X size={22} />
      </button>
    </div>
    <div className="px-5 py-6 flex flex-col h-[calc(100vh-100px)] overflow-y-auto">
      <div>
        <div className="form-group">
          <label>Platform Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            className="form-control-two border border-[#483228] focus:border-[#FFCD27] focus:outline-none transition-colors duration-200"
            placeholder="Enter platform name"
          />
      </div>
      <div className="form-group">
          <label>Profile Link <span className="text-red-500">*</span></label>
          <textarea
            rows={3}
            className="form-control-two border border-[#483228] focus:border-[#FFCD27] focus:outline-none transition-colors duration-200"
            placeholder="past Profile Link"
          />
      </div>
      <div className="form-group">
        {rawImage ? 
         <div className="relative w-full overflow-hidden mx-auto">
        
          <img src={rawImage} alt="Uploaded" className="w-15 h-15 object-cover rounded-[10px]" />
          <button
            onClick={() => setRawImage(null)}
            className="absolute top-2 right-2 bg-white rounded-full p-2 text-white cursor-pointer shadow-md"
            aria-label="Remove image"
          >
            <Trash2 size={20} color="red" />
          </button>
        </div>
          :
         <FileUploader
          handleChange={handleFile}
          name="file"
          types={FILE_TYPES}
          onTypeError={handleTypeError}
        >
          <div className="border-2 border-dashed border-[#900DA4] hover:border-amber-400/60 rounded-2xl py-10 px-6 flex flex-col items-center gap-2 cursor-pointer transition-colors bg-[#2D023D]">
           
            <ImageUp className="text-white/30" size={80} />
            <p className="text-white/70 text-md text-center font-bold">
              Drag or upload logo
            </p>
             <p className="text-white/70 text-sm text-center">
              Prefer Size 100X100 | Max size 1mb 
            </p>
            <p className="text-white/70 text-xs">{FILE_TYPES.join(", ")}</p>
          </div>
        </FileUploader>
}
      </div>
      </div>
       <motion.button
            whileHover={{ scale: 1.1 }}
            className="theme-bttn mt-auto self-end"
            >
        
        Save & Continue
        
            </motion.button>
    </div>
</ModalSide>



    </div>
  );
}
