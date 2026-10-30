'use client';

import Checklist from "@/component/music/Checklist";
import CopyRight from "@/component/music/CopyRight";
import MetaData from "@/component/music/MetaData";
import MusicDetails from "@/component/music/MusicDetails";
import UploadFiles from "@/component/music/UploadFiles";
import { validateCopyright, validateCopyrightField } from "@/lib/validation/copyRights";
import { validateMetaData, validateMetaField } from "@/lib/validation/metaData";
import { validateMusicDetails, validateMusicField } from "@/lib/validation/musicDetails";
import { validateUploadField, validateUploadFiles } from "@/lib/validation/uploadFiles";
import { Check, Save } from "lucide-react";
import { useEffect, useState } from "react";


const STEPS = [
  {
    title: "Music Details",
    description: "Track, Artist, Genre, Language",
    iscomplete: false,
  },
  {
    title: "Upload Files",
    description: "Upload  valid files",
    iscomplete: false,
  },
  {
    title: "Right & Copyrights",
    description: "Add your own copyrights",
    iscomplete: false,
  },
  {
    title: "Meta Data",
    description: "Add meta data for your music",
    iscomplete: false,
  },
  {
    title: "Review & Submit",
    description: "Check your music details and submit",
    iscomplete: false,
  },
];

export default function CreateMusicPage() {

    const [activeStep, setActiveStep] = useState(1);
     const [errors, setErrors] = useState({});
    const [musicDetails, setMusicDetails] = useState({
    trackName: "",
    artist: "indranilsen_rrr",
    genre: "",
    language: "",
    visibility:"",
    releaseDate: null,
    description: "",
  });

   const MusicInputHandler = (updatedData) => {
    setMusicDetails(updatedData);
  };


  // File upload validation handler

   const [uploadFilesData, setUploadFilesData] = useState({
    audioFile: null,
    duration: "",
    coverImage: null,
    lyricsFile: null,
  });

    const UploadFilesHandler = (updatedData) => {
    setUploadFilesData(updatedData);
  };

    const handleUploadFieldChange = (field, value) => {
    const message = validateUploadField(field, value);
    if (!message) {
      setErrors((prev) => {
        const stepErrors = { ...(prev[2] || {}) };
        delete stepErrors[field];
        return { ...prev, 2: stepErrors };
      });
    }
  };

// End file upload

  const [copyrightData, setCopyrightData] = useState({
    owncreate: 'own',
    content:[],
    credit:"",
    confirm:false,
    artistmember:[]
  });

    const CopyRightInputHandler = (updatedData) => {
    setCopyrightData(updatedData);
  };

    const handleCopyrightFieldChange = (field, value) => {
    const message = validateCopyrightField(field, value);
    if (!message) {
      setErrors((prev) => {
        const stepErrors = { ...(prev[3] || {}) };
        delete stepErrors[field];
        return { ...prev, 3: stepErrors };
      });
    }
  };


  //End copyright



    const [metaData, setMetaData] = useState({
    tags: [],
    isrccode:'',
    eancode:'',
  });

  const MetaDataHandler = (updatedData) => {
    setMetaData(updatedData);
  };

    const handleMetaFieldChange = (field, value) => {
    const message = validateMetaField(field, value);
    if (!message) {
      setErrors((prev) => {
        const stepErrors = { ...(prev[4] || {}) };
        delete stepErrors[field];
        return { ...prev, 4: stepErrors };
      });
    }
  };


  


    const handleFieldChange = (field, value) => {
    const message = validateMusicField(field, value);
    if (!message) {
      setErrors((prev) => {
        const stepErrors = { ...(prev[1] || {}) };
        delete stepErrors[field];
        return { ...prev, 1: stepErrors };
      });
    }
  };

    function validateStep(step) {
    switch (step) {
      case 1:
        return validateMusicDetails(musicDetails);
      case 2:
        return validateUploadFiles(uploadFilesData);
       case 3:        
       return validateCopyright(copyrightData);
         case 4:
        return validateMetaData(metaData);
      default:
        return {}; // no validation defined yet — treat as valid
    }
  }


 const SaveAndNext = () => {
    const stepErrors = validateStep(activeStep);
    const hasErrors = Object.keys(stepErrors).length > 0;

    setErrors((prev) => ({ ...prev, [activeStep]: stepErrors }));

    if (hasErrors) {
      return; // stop here — don't advance past an invalid step
    }

    setActiveStep((prevStep) => Math.min(prevStep + 1, STEPS.length));
  };

 
  console.log(musicDetails)



  return (
    <div className="flex gap-5">
      <div className="w-[70%]">
            {activeStep === 1 && 
            <MusicDetails  
            data={musicDetails}
            onChange={MusicInputHandler}
            onFieldChange={handleFieldChange}
            errors={errors[1] || {}}
             />
             }
            {activeStep === 2 &&  
            <UploadFiles
            data={uploadFilesData}
            onChange={UploadFilesHandler}
            onFieldChange={handleUploadFieldChange}
            errors={errors[2] || {}}
          />}
            {activeStep === 3 && 
            <CopyRight
            data={copyrightData}
            onChange={CopyRightInputHandler}
            onFieldChange={handleCopyrightFieldChange}
            errors={errors[3] || {}}
            />
            }
            {activeStep === 4 && (
          <MetaData
            data={metaData}
            musicDetailsdata={musicDetails}
            onChange={MetaDataHandler}
            onFieldChange={handleMetaFieldChange}
            errors={errors[4] || {}}
          />
        )}
         {activeStep === 5 && (
          <Checklist
           
          />
        )}
      </div>
       <div className="w-[30%]">
        <div className="bg-card-gradient rounded-[10px] p-4 mb-3">
            <h3 className="text-[22px] font-bold text-[#FFCD27] mb-5"><img src="/fav.png" alt="Favicon" className="inline-block mr-1 w-8" /> Why Geomelody?</h3>
            <div className="flex items-center gap-2 mb-6 ">
                <span className="bg-[#1BC50B] text-black w-6 h-6 flex items-center justify-center rounded-full"><Check size={16} /></span>
                <p className="text-[16px] font-medium">Reach millions of listeners of worldwide</p>
            </div>
            <div className="flex items-center gap-2 mb-6 ">
                <span className="bg-[#1BC50B] text-black w-6 h-6 flex items-center justify-center rounded-full"><Check size={16} /></span>
                <p className="text-[16px] font-medium">Keep 100% of your rights</p>
            </div>
            <div className="flex items-center gap-2 mb-6 ">
                <span className="bg-[#1BC50B] text-black w-6 h-6 flex items-center justify-center rounded-full"><Check size={16} /></span>
                <p className="text-[16px] font-medium">Track your performance & earnings</p>
            </div>
         </div> 
          <div
      className="rounded-3xl p-6 bg-card-gradient"
    >
      <h2 className="text-amber-400 text-2xl font-bold mb-2">Steps</h2>
      <p className="text-white/50 text-sm mb-8">
        Please follow the following steps for upload your music
      </p>

      <div>
        {STEPS.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === activeStep;
          const isLast = index === STEPS.length - 1;
          const isComplete = stepNumber < activeStep;

          return (
            <div key={step.title} className="flex gap-4">
              {/* Number + connecting line */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 border-2 border-[#fff] ${
                    isActive
                      ? "bg-amber-400 text-[#fff]"
                      : isComplete
                      ? "bg-[#1BC50B] text-black"
                      : "bg-white/15 text-white"
                  }`}
                >
                  {stepNumber}
                </div>
                {!isLast && <div className={`w-0.5 flex-1 ${isComplete ? 'bg-[#1BC50B]' : 'bg-white/25'}`} />}
              </div>

              {/* Label */}
              <div className={isLast ? "pb-0" : "pb-8"}>
                <h3
                  className={`text-[15px] font-semibold mb-1 ${
                    isActive ? "text-white" : "text-white/70"
                  }`}
                >
                  {step.title}
                </h3>
                <p className="text-white/40 text-sm">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-4">
        
        <button className="flex-1 bg-white/20 hover:bg-white/25 text-white/90 font-medium text-lg py-3 rounded-full transition-colors">
          Draft
        </button>
        {activeStep === 5 ?
         <button className="flex-1 bg-amber-400 hover:bg-amber-300 text-[#150a20] font-semibold text-lg py-3 rounded-full transition-colors cursor-pointer"
        onClick={() => SaveAndNext()}
        >
          Submit
        </button>
        :
         <button className="flex-1 bg-amber-400 hover:bg-amber-300 text-[#150a20] font-semibold text-lg py-3 rounded-full transition-colors cursor-pointer"
        onClick={() => SaveAndNext()}
        >
          Save & Next
        </button>
      }
       
      </div>
    </div>  
       </div>
    </div>
  );
}
