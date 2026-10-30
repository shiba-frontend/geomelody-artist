"use client";
import { ChevronDown, House } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import {
  validateEmail,
  validateRequired,
  validateNumberOnly,
} from "@/lib/validation/authvalidation";

import Modal from "../../../component/Modal";
import OtpVerification from "../../../component/OtpVerification";
import AuthRight from "../../../component/AuthRight";

export default function Verify() {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showOtp, setShowOtp] = useState(false);
  const [showPhoneOtp, setShowPhoneOtp] = useState(false);
  const [dialcodeMenu, setDialcodeMenu] = useState(false)
  const [dialcode, setDialcode] = useState({
      id:2,
      flag:"/indian.png",
      code:"+1"
    })

  const dialcodeList = [
    {
      id:1,
      flag:"/indian.png",
      code:"+91"
    },
    {
      id:2,
      flag:"/indian.png",
      code:"+1"
    },
  ]

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      validateField(name, value);
    }
  }
  function handlePhoneChange(e) {
    const { name } = e.target;
    const numbersOnly = e.target.value.replace(/[^0-9]/g, "");

    setFormData((prev) => ({ ...prev, [name]: numbersOnly }));

    if (touched[name]) {
      validateField(name, numbersOnly);
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  }

  function validateField(name, value) {
    let result;
    switch (name) {
      case "email":
        result = validateEmail(value);
        break;
      case "phone":
        result = validateRequired(value);
        break;
      default:
        return;
    }
    setErrors((prev) => ({ ...prev, [name]: result?.error || undefined }));
  }

  return (
    <div className="bg-signup relative">
      <div className="w-full px-4 md:px-8 mx-auto py-3">
        <div className="flex items-center py-3">
          <div className="lg:w-1/3 md:w-1/4 w-1/2">
            <a href="/">
              <img src="/logo.svg" className="w-30 lg:w-auto" />
            </a>
          </div>
          <div className="lg:w-2/3 md:w-3/4 w-1/2 text-right">
            <ul className="justify-end lg:gap-5 gap-2 flex items-center">
              <li>
                <a href="/" className="flex gap-2">
                  <House /> Home
                </a>
              </li>

              <li>
                <a href="/login" className="get-bttn">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col lg:px-10 px:4 lg:py-20 py-10">
          <div className="lg:w-1/2 w-full lg:pr-60 relative">
            <h2 className="lg:text-[38px] text-[28px] font-bold mb-3">
              Welcome to Geomelody
            </h2>
            <p className="lg:text-[20px] text-[16px] mb-6">
              Create your artist account and take the first step toward sharing
              your <br></br> music with the world.
            </p>

            <div className="form-group">
              <label>Your Email ID</label>
              <div className="relative">
                <span className="field-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#FFCD27"
                      d="M5 5h13a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3m0 1c-.5 0-.94.17-1.28.47l7.78 5.03l7.78-5.03C18.94 6.17 18.5 6 18 6zm6.5 6.71L3.13 7.28C3.05 7.5 3 7.75 3 8v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8c0-.25-.05-.5-.13-.72z"
                    ></path>
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-control border border-[#483228] focus:border-[#FFCD27] focus:outline-none transition-colors duration-200"
                  placeholder="Your email ID"
                />
                {!errors.email && (
                  <motion.button
                  onClick={() => setShowOtp(true)}
                    whileHover={{ scale: 1.1 }}
                    className="bg-[#900DA4] px-6 py-2 rounded-[30px] cursor-pointer absolute right-3 top-3.5"
                  >
                    Verify
                  </motion.button>
                )}
          {/* <svg className="checkmark" xmlns="http://w3.org" viewBox="0 0 52 52">
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg> */}
              
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="form-group">
              <label>Your Mobile Number</label>
              <div className="relative" onMouseLeave={() => setDialcodeMenu(false)}>
                <span className="field-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 24 24"
                  >
                    <g fill="#FFCD27">
                      <path d="M11 18.183a1 1 0 1 1 2 0a1 1 0 0 1-2 0m-.5-14.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5z"></path>
                      <path
                        fillRule="evenodd"
                        d="M10.168.933h3.664c.883 0 1.591 0 2.164.047c.588.048 1.099.149 1.57.389a4 4 0 0 1 1.748 1.748c.24.47.341.982.39 1.57c.046.573.046 1.28.046 2.163v9.665c0 .883 0 1.59-.047 2.163c-.048.589-.149 1.1-.389 1.57a4 4 0 0 1-1.748 1.749c-.471.24-.982.34-1.57.389c-.573.047-1.281.047-2.164.047h-3.664c-.883 0-1.591 0-2.164-.047c-.588-.048-1.099-.15-1.57-.39a4 4 0 0 1-1.748-1.747c-.24-.471-.341-.982-.39-1.57c-.046-.573-.046-1.281-.046-2.164V6.85c0-.882 0-1.59.047-2.163c.048-.588.149-1.1.389-1.57a4 4 0 0 1 1.748-1.748c.471-.24.982-.341 1.57-.39c.573-.046 1.281-.046 2.164-.046M8.126 2.475c-.495.04-.787.116-1.011.23a2.5 2.5 0 0 0-1.093 1.093c-.114.224-.19.516-.23 1.011c-.041.505-.042 1.151-.042 2.074v9.6c0 .922 0 1.569.042 2.073c.04.496.116.787.23 1.012a2.5 2.5 0 0 0 1.093 1.092c.224.114.516.19 1.011.231c.505.041 1.152.042 2.074.042h3.6c.922 0 1.57 0 2.073-.042c.496-.04.788-.116 1.012-.23a2.5 2.5 0 0 0 1.092-1.093c.115-.225.19-.516.231-1.012c.041-.504.042-1.15.042-2.073v-9.6c0-.923 0-1.57-.042-2.074c-.04-.495-.116-.787-.23-1.011a2.5 2.5 0 0 0-1.093-1.093c-.224-.114-.516-.19-1.012-.23c-.504-.042-1.15-.042-2.073-.042h-3.6c-.922 0-1.57 0-2.074.042"
                        clipRule="evenodd"
                      ></path>
                    </g>
                  </svg>
                </span>
                  <div className="flex items-center absolute top-5.5 left-15 gap-1.5 cursor-pointer text-[15px] w-20" 
                      onClick={()=>setDialcodeMenu(!dialcodeMenu)}
                     
                      ><img src={dialcode.flag} />  {dialcode.code}  <ChevronDown color="#FFCD27" className="h-5 w-5 pl-1" /></div>

                        <AnimatePresence>
                  {dialcodeMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute left-3 top-full  z-50 w-25"
                    >
                      <div className="glass-panel overflow-hidden rounded-[5px]">

                              {dialcodeList.map((item)=>{
                                return (
                                  <div className="flex gap-2 items-center px-3 py-2 cursor-pointer" key={item.id} onClick={()=>
                                      {
                                        setDialcode(item)
                                        setDialcodeMenu(false)
                                      }
                                        }>
                                        <div className="border border-[#ddd] w-3 h-3 rounded-full flex justify-center items-center">
                                          {dialcode.id === item.id && 
                                          <div className="w-2 h-2 rounded-full bg-[#FFCD27]"></div>
                                          }
                                        </div>
                                        <h4 className="text-[15px]">{item.code}</h4>
                                      </div>
                                )
                              })}


                        
                       
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <input
                  type="text"
                  name="phone"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onBlur={handleBlur}
                  className="form-control-three border border-[#483228] focus:border-[#FFCD27] focus:outline-none transition-colors duration-200"
                  placeholder="Your Mobile Number"
                />
                {!errors.phone && (
                  <motion.button
                  onClick={()=>setShowPhoneOtp(true)}
                    whileHover={{ scale: 1.1 }}
                    className="bg-[#900DA4] px-6 py-2 rounded-[30px] cursor-pointer absolute right-3 top-3.5"
                  >
                    Verify
                  </motion.button>
                )}
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
            <div className="text-center">
            <motion.button
            whileHover={{ scale: 1.2 }}
            className=" mt-5 disabled:cursor-not-allowed bg-[#FFCD27] text-[24px] text-[#150031] rounded-[30px] px-7 py-2 cursor-pointer "
            disabled
            >
           Continue
            </motion.button>
     
            </div>

              <h4 className="text-[#8b8b8b] text-[19px] text-center mt-7 border-t-1 border-[#2c2c2c] pt-4">Or Continue with</h4>
              <div className="my-4 text-center flex gap-4 justify-center">
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 1024 1024">
                    <path d="M0 0h1024v1024H0z" fill="none" />
                    <path fill="#8b8b8b" d="M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8c-34.4 23-78.3 36.6-129.9 36.6c-99.9 0-184.4-67.5-214.6-158.2c-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1c56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100c-149.9 0-279.6 86-342.7 211.4c-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93c72.5-66.8 114.4-165.2 114.4-282.1c0-27.2-2.4-53.3-6.9-78.5" />
                  </svg>
                </button>
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 1024 1024">
              <path d="M0 0h1024v1024H0z" fill="none" />
              <path fill="#8b8b8b" d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5c-34.9-50-87.7-77.5-157.3-82.8c-65.9-5.2-138 38.4-164.4 38.4c-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8c23.8 68.2 109.6 235.3 199.1 232.6c46.8-1.1 79.9-33.2 140.8-33.2c59.1 0 89.7 33.2 141.9 33.2c90.3-1.3 167.9-153.2 190.5-221.6c-121.1-57.1-114.6-167.2-114.6-170.7m-10.6 267c-14.3 19.9-28.7 35.6-41.9 45.7c-10.5 8-18.6 11.4-24 11.6c-9-.1-17.7-2.3-34.7-8.8c-1.2-.5-2.5-1-4.2-1.6l-4.4-1.7c-17.4-6.7-27.8-10.3-41.1-13.8c-18.6-4.8-37.1-7.4-56.9-7.4c-20.2 0-39.2 2.5-58.1 7.2c-13.9 3.5-25.6 7.4-42.7 13.8c-.7.3-8.1 3.1-10.2 3.9c-3.5 1.3-6.2 2.3-8.7 3.2c-10.4 3.6-17 5.1-22.9 5.2c-.7 0-1.3-.1-1.8-.2c-1.1-.2-2.5-.6-4.1-1.3c-4.5-1.8-9.9-5.1-16-9.8c-14-10.9-29.4-28-45.1-49.9c-27.5-38.6-53.5-89.8-66-125.7c-15.4-44.8-23-87.7-23-128.6c0-60.2 17.8-106 48.4-137.1c26.3-26.6 61.7-41.5 97.8-42.3c5.9.1 14.5 1.5 25.4 4.5c8.6 2.3 18 5.4 30.7 9.9c3.8 1.4 16.9 6.1 18.5 6.7c7.7 2.8 13.5 4.8 19.2 6.6c18.2 5.8 32.3 9 47.6 9c15.5 0 28.8-3.3 47.7-9.8c7.1-2.4 32.9-12 37.5-13.6c25.6-9.1 44.5-14 60.8-15.2c4.8-.4 9.1-.4 13.2-.1c22.7 1.8 42.1 6.3 58.6 13.8c-37.6 43.4-57 96.5-56.9 158.4c-.3 14.7.9 31.7 5.1 51.8c6.4 30.5 18.6 60.7 37.9 89c14.7 21.5 32.9 40.9 54.7 57.8c-11.5 23.7-25.6 48.2-40.4 68.8m-94.5-572c50.7-60.2 46.1-115 44.6-134.7c-44.8 2.6-96.6 30.5-126.1 64.8c-32.5 36.8-51.6 82.3-47.5 133.6c48.4 3.7 92.6-21.2 129-63.7" />
            </svg>
                </button>
              </div>
              <h5 className="text-[#fff] text-[16px] text-center ">By continuing, you agree to our <a href="#" className="text-[#ffcd27] underline">Terms & Privacy Policy</a>.</h5>

          </div>
          <div className="lg:w-1/2 w-full lg:mt-0 mt-10">
                <AuthRight image="/artist1.png" />
          </div>
        </div>
      </div>
       <Modal isOpen={showOtp} onClose={() => setShowOtp(false)} closeOnBackdrop={false}>
        <OtpVerification
            type="email"
            identifier={formData.email}
            onClose={() => setShowOtp(false)}
            onVerify={async (code) => {
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, type: "email" }),
            });
            if (!res.ok) throw new Error("Invalid code");
            setShowOtp(false);
            }}
            onResend={async () => {
            await fetch("/api/auth/resend-otp", { method: "POST" });
            }}
            onEditIdentifier={() => setShowOtp(false)}
        />
      </Modal>
      <Modal isOpen={showPhoneOtp} onClose={() => setShowPhoneOtp(false)} closeOnBackdrop={false}>
            <OtpVerification
                type="phone"
                identifier={formData.phone}
                onClose={() => setShowPhoneOtp(false)}
                onVerify={async (code) => {
                const res = await fetch("/api/auth/verify-otp", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code, type: "phone" }),
                });
                if (!res.ok) throw new Error("Invalid code");
                setShowPhoneOtp(false);
                }}
                onResend={async () => {
                await fetch("/api/auth/resend-otp", { method: "POST" });
                }}
                onEditIdentifier={() => setShowPhoneOtp(false)}
            />
            </Modal>

            <img src="/rg-shape.png" className="absolute bottom-0 left-0 right-0 z-[-1] w-full" />
    </div>
  );
}
