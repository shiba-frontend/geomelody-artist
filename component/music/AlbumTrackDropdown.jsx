"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, CalendarDays } from "lucide-react";
import "react-day-picker/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




export default function AlbumTrackDropdown({ status, relaseddate, onConfirm, errors = {}}) {

  const [visibility, setvisibility] = useState(status)
  const [releaseDateTime, setReleaseDateTime] = useState(relaseddate || null)


  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 30);


  function handleFieldChange(e) {
    setReleaseDateTime(e);
  }

  function ConfirmHandle(){
      onConfirm({
        visibility:visibility,
        releaseDateTime:releaseDateTime
      })
  }

 







  return (

  
        <div
          className="absolute right-0 mt-3 w-[420px] rounded-3xl p-6 border border-white/10 shadow-2xl z-20"
          style={{
            background: "linear-gradient(160deg, #2d1a45 0%, #1a0f2e 60%, #120a1f 100%)",
          }}
        >
          <h3 className="text-white text-lg font-semibold mb-1">
            Select Visibility <span className="text-red-500">*</span>
          </h3>
          <p className="text-white/50 text-sm mb-6">
            Select your schedule date and time for release you music
          </p>

          <div className="space-y-5">


                <button                 
                  onClick={() => setvisibility("Scheduled")}
                  className="flex items-start gap-3 w-full text-left"
                >
                  <span
                    className={`mt-1 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center `}
                  >
                    {visibility == "Scheduled" && (
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    )}
                  </span>
                  <span>
                    <span className="block text-white text-[17px] font-medium">
                      Sheduled
                    </span>
                    <span className="block text-white/50 text-sm">
                     Automatically published on your selected date and time
                    </span>
                  </span>
                </button>


          </div>


          {/* Schedule date/time — only shown when "Schedule" is selected */}

     
      
            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="text-white text-[15px] font-medium mb-3">
                Scheduled date and time <span className="text-red-500">*</span>
              </h4>

              <div className="relative" >
                
                <DatePicker
                            minDate={today}
                            maxDate={maxDate}
                            selected={releaseDateTime}
                            onChange={handleFieldChange}
                            showTimeSelect
                            dateFormat="MM/dd/yyyy h:mm aa"
                            placeholderText="Select realease date & time"
                            className={`w-full bg-transparent border rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none transition-colors border-white/20 focus:border-amber-400`}
                          />
              
              </div>

              <p className="text-white/40 text-sm mt-3">
                You can change you schedule date and time
              </p>
             
            </div>
    
          <div className="text-right mt-4">
               <button className="px-5 py-2 rounded-full text-sm transition-colors bg-[#900DA4] text-white cursor-pointer" onClick={ConfirmHandle}>Confirm</button>
          </div>
       

     
        </div>
   

  );
}
