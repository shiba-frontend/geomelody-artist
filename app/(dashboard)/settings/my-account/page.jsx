'use client'
import { CheckCircle } from "lucide-react";
import { useState } from "react";

export default function MyAccount(){
  const [changeMobileModal, setChangeMobileModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState("initial");
   const [step1, setStep1] = useState("initial");
    const [changeEmailModal, setChangeEmailModal] = useState(false);



    return (
        <>
           <div className="grid grid-cols-3 gap-7">
                 <div  className="relative w-full bg-transparent border rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none transition-colors border-white/20 focus:border-amber-400">
                    <label className="mb-1 block text-sm font-medium">
                      Mobile Number
                      <br></br>
                      <span className="text-sm text-gray-500">
                        {'45666666'}{" "}
                        <CheckCircle className="inline-block ml-1 text-green-500 h-4 w-4" />
                      </span>
                    </label>
                    <button
                      className="flex-1 bg-amber-400 hover:bg-amber-300 text-[#150a20] font-semibold text-lg py-2 px-3 rounded-[10px] transition-colors cursor-pointer
                      absolute right-4 top-4
                      "
                      onClick={() => {
                        setStep("initial");
                        setOtp(["", "", "", "", "", ""]);
                        setChangeMobileModal(true);
                      }}
                    >
                      Change
                    </button>
                  </div>
                  <div  className="relative w-full bg-transparent border rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none transition-colors border-white/20 focus:border-amber-400">
                    <label className="mb-1 block text-sm font-medium">
                      Email
                      <br></br>
                      <span className="text-sm text-gray-500">
                        {'shibumal79@gmail.com'}{" "}
                        <CheckCircle className="inline-block ml-1 text-green-500 h-4 w-4" />
                      </span>
                    </label>
                    <button
                      className="flex-1 bg-amber-400 hover:bg-amber-300 text-[#150a20] font-semibold text-lg py-2 px-3 rounded-[10px] transition-colors cursor-pointer
                      absolute right-4 top-4
                      "
                      onClick={() => {
                         setStep1("initial");
                        setOtp(["", "", "", "", "", ""]);
                        setChangeEmailModal(true);
                      }}
                    >
                      Change
                    </button>
                  </div>
           </div>
        </>
    )
}