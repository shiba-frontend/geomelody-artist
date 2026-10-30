"use client";
import { Cake, Mail, Smartphone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function SubscriptionPlan() {
  return (
    <>
      <div className="w-full rounded-full h-1 bg-[#a3a3a3] mb-5">
        <div
          className=" h-1 rounded-full"
          style={{
            width: "100%",
            background:
              "linear-gradient(103deg,rgba(27, 197, 11, 1) 73%, rgba(226, 255, 223, 1) 100%)",
          }}
        ></div>
      </div>

      <div className="flex gap-5">
        <div className="w-2/3">
          <h4 className="text-[22px] mb-3">Your Profile Preview</h4>
          <img src="/Registration.jpg" className="w-full h-60 rounded-[10px]" />
          <div className="px-10 mt-[-100px] z-10 relative ">
            <div className="h-[calc(100vh-400px)] scroll-smooth overflow-y-auto scrollbar-thin scrollbar-track-[#411753] scrollbar-thumb-amber-500">
              <div className="bg-[#260031] p-5 rounded-[10px] ">
                <div className="flex gap-3 items-center">
                  <div
                    className="w-25 h-25 rounded-full p-[3px]"
                    style={{
                      background:
                        "conic-gradient(from 180deg, #f5c542, #8b5cf6, #f5c542)",
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-[#2a1440] flex items-center justify-center overflow-hidden ">
                      <img
                        src="/boy.png"
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[24px] font-medium mb-2 leading-none">
                      Indra_Rockz
                    </h4>
                    <ul className=" flex items-center gap-4">
                      <li className="text-[16px] flex items-center gap-2">
                        <span className="w-3 h-3 bg-white rounded-full block"></span>{" "}
                        Singer
                      </li>
                      <li className="text-[16px] flex items-center gap-2">
                        <span className="w-3 h-3 bg-white rounded-full block"></span>{" "}
                        Composer
                      </li>
                      <li className="text-[16px] flex items-center gap-2">
                        <span className="w-3 h-3 bg-white rounded-full block"></span>
                        Lyricst
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-b border-white/10 my-7">
                  <div className="text-left mb-2 mt-3">
                    <h2 className="text-white text-[24px] font-semibold">
                      Indranil Sen
                    </h2>
                  </div>

                  <div className="flex items-center justify-start gap-2 mb-4">
                    <span>
                      <img
                        src="/indian.png"
                        alt=""
                        className="w-6 h-5 object-cover"
                      />
                    </span>
                    <span className="text-[16px] font-medium">Kolkata</span>
                  </div>
                  <div className="flex items-center justify-start gap-2 mb-4">
                    <span>
                      <Cake size={23} color="#FFCD27" />
                    </span>
                    <span className="text-[16px] font-medium">06-07-1990</span>
                  </div>
                  <div className="flex gap-5 items-center">
                    <div className="flex items-center justify-start gap-2 mb-4">
                      <span>
                        <Mail size={23} color="#FFCD27" />
                      </span>
                      <span className="text-[16px] font-medium">
                        indrahmz06@gmail.com
                      </span>
                    </div>
                    <div className="flex items-center justify-start gap-2 mb-4">
                      <span>
                        <Smartphone size={23} color="#FFCD27" />
                      </span>
                      <span className="text-[16px] font-medium">
                        +91 62913 32961
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-5 ">
                  <h2 className="text-white text-[20px] font-semibold mb-2">
                    I like to sing
                  </h2>
                  <ul className=" flex items-center gap-4">
                    <li className="text-[16px] flex items-center gap-2">
                      <span className="w-3 h-3 bg-white rounded-full block"></span>{" "}
                      Pop
                    </li>
                    <li className="text-[16px] flex items-center gap-2">
                      <span className="w-3 h-3 bg-white rounded-full block"></span>{" "}
                      Rock
                    </li>
                    <li className="text-[16px] flex items-center gap-2">
                      <span className="w-3 h-3 bg-white rounded-full block"></span>
                      Classical
                    </li>
                  </ul>
                </div>
                <div className="mb-5 ">
                  <h2 className="text-white text-[20px] font-semibold mb-2">
                    I like to play
                  </h2>
                  <ul className=" flex items-center gap-4">
                    <li className="text-[16px] flex items-center gap-2">
                      <span className="w-3 h-3 bg-white rounded-full block"></span>{" "}
                      Guiter
                    </li>
                    <li className="text-[16px] flex items-center gap-2">
                      <span className="w-3 h-3 bg-white rounded-full block"></span>{" "}
                      Piano
                    </li>
                  </ul>
                </div>
                <div className="mb-5 ">
                  <h2 className="text-white text-[20px] font-semibold mb-2">
                    My Bio
                  </h2>
                  <p className="text-[16px] text-white/70">
                    lorem ipsum dolor sit amet consectetur adipiscing elit et
                    similique qui commodo officia est fugiat aut deleniti
                    pariatur sed quis voluptas cupiditate ea laborum ad dolorum
                    est dolor libero reprehenderit quis elit qui odio in nulla
                    officia non corrupti officia excepteur distinctio eos nulla
                    placeat
                  </p>
                </div>
                <div className="mb-5 ">
                  <h2 className="text-white text-[20px] font-semibold mb-2">
                    My social presence
                  </h2>
                  <ul className=" flex items-center gap-6">
                    <li className="text-[16px] flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5em"
                        height="1.5em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M14.2 2.875A4.625 4.625 0 0 0 9.575 7.5v2.575H7.1c-.124 0-.225.1-.225.225v3.4c0 .124.1.225.225.225h2.475V20.9c0 .124.1.225.225.225h3.4c.124 0 .225-.1.225-.225v-6.975h2.497c.103 0 .193-.07.218-.17l.85-3.4a.225.225 0 0 0-.218-.28h-3.347V7.5a.775.775 0 0 1 .775-.775h2.6c.124 0 .225-.1.225-.225V3.1c0-.124-.1-.225-.225-.225z"
                        ></path>
                      </svg>
                      Facbook
                    </li>
                    <li className="text-[16px] flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5em"
                        height="1.5em"
                        viewBox="0 0 1024 1024"
                      >
                        <path
                          fill="currentColor"
                          d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3S645.3 585.4 645.3 512S585.4 378.7 512 378.7M911.8 512c0-55.2.5-109.9-2.6-165c-3.1-64-17.7-120.8-64.5-167.6c-46.9-46.9-103.6-61.4-167.6-64.5c-55.2-3.1-109.9-2.6-165-2.6c-55.2 0-109.9-.5-165 2.6c-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6c46.9 46.9 103.6 61.4 167.6 64.5c55.2 3.1 109.9 2.6 165 2.6c55.2 0 109.9.5 165-2.6c64-3.1 120.8-17.7 167.6-64.5c46.9-46.9 61.4-103.6 64.5-167.6c3.2-55.1 2.6-109.8 2.6-165M512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9S717.1 398.5 717.1 512S625.5 717.1 512 717.1m213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9s47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9"
                        ></path>
                      </svg>
                      Instagram
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 flex flex-col">
        <div>
          <h4 className="text-[22px] mb-3">Subscription Plan</h4>

          <div className="bg-[#310e43] p-2 rounded-[7px]">
            <div className="border border-[#6b473f] p-3 rounded-[7px]">
              <h5 className="text-[26px] font-bold text-[#FFCD27]">
                Artist Pro
              </h5>
              <p className="text-white mb-3">
                <span className="text-[34px] font-bold">$ 24.99</span>
                <span className="text-white/40 text-[20px]"> / year</span>
              </p>
              <p className="text-[20px] mb-6">
                Perfect for Independent Artists, Singers, Musicians, Producers &
                Composers
              </p>
              <ul className="flex flex-col gap-3 mb-3">
                <li className="text-[18px] text-white/70 flex items-center gap-2">
                  <img src="/Star.png" alt="star" /> Music Uploads
                </li>
                <li className="text-[18px] text-white/70 flex items-center gap-2">
                  <img src="/Star.png" alt="star" /> Unlimited Releases
                </li>
                <li className="text-[18px] text-white/70 flex items-center gap-2">
                  <img src="/Star.png" alt="star" /> Event & Concert Listings
                </li>
                <li className="text-[18px] text-white/70 flex items-center gap-2">
                  <img src="/Star.png" alt="star" /> Fan & Follower Insights
                </li>
              </ul>
              <button className="text-amber-400 text-sm underline underline-offset-2 hover:text-amber-300 transition-colors whitespace-nowrap mt-auto ml-5">
                View 10+ Features
              </button>
            </div>
          </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="theme-bttn mt-auto self-end"
          >
           Get Subscription
          </motion.button>
        </div>
      </div>
    </>
  );
}
