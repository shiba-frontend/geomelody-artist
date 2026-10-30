"use client";
import TrackCard from "@/component/music/TrackCard";
import { INITIAL_TRACKS } from "@/lib/dummyTrack";
import { CalendarDays, Check, MicVocal, MoveUpRight, Music, Pause, Play, Plus, ThumbsUp, X } from "lucide-react";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AnimatePresence, motion } from "framer-motion";
import ModalSide from "@/component/ModalSide";
import ListenersTrendChart from "@/component/music/ListenersTrendChart";

const TABS = ["Track Details", "Analytics"];


export default function MusicDetailsView(){

 const [activeTab, setActiveTab] = useState("Track Details");
  const [selectedIds, setSelectedIds] = useState([]);
  const [releaseType, setReleaseType] = useState("Public");
  const [releaseDate, setReleaseDate] = useState(null);

  const containerRef = useRef(null);
  const MIN_TAGS = 3;
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 30);

   const [isPlaying, setIsPlaying] = useState(false);
     const audioRef = useRef(null);

 

  function ReleaseDateHandle(e) {
    setReleaseDate(e);
    //setAlbumerrors((prev) => ({ ...prev, releaseDate: "" }));
  }


 function togglePlayback() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  }





    return (
         <div className="flex gap-5 h-full">
              <div className="w-2/3">
                <div className="relative">
                  <img src="/Registration.jpg" className="w-full h-60 rounded-[10px]" />
                  <div className="p-3 absolute bottom-0 left-0 right-0">
                    <div className="flex justify-between items-end">
                        <div>
                            <h4>First Album</h4>
                    <h5 className="flex items-center text-sm gap-1 my-2">
                      <Music size={15} className="text-amber-400" />2 Tracks
                    </h5>
                    <h5 className="flex items-center text-sm gap-1">
                      <CalendarDays size={15} className="text-white/50" />
                      Publish Date: 12 sep 2026 | 00:30 am
                        <MicVocal size={15} className="text-white/50" />
                      Indranil_Rockzz
                    </h5>
                        </div>
                        <div className="flex items-center gap-3">
                            <h5 className="flex items-center text-sm gap-1"><ThumbsUp  size={15} className="text-[#900DA4]" /> 1098 likes</h5>
                            <button
                  onClick={togglePlayback}
                  className="w-12 h-12 rounded-full bg-amber-400 hover:bg-amber-300 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause size={22} className="text-[#150a20]" />
                  ) : (
                    <Play size={22} className="text-[#150a20] ml-0.5" />
                  )}
                </button>
                 {/* <audio
                    ref={audioRef}
                    src={audioUrl}
                    onEnded={() => setIsPlaying(false)}
                    className="hidden"
                  /> */}
                        </div>
                    </div>
                    
                  </div>
                </div>
                <div className="flex items-center justify-between  py-5 border-b border-white/10">
                  <div className="flex bg-black/20 rounded-full p-1">
                    {TABS.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2 rounded-full text-sm transition-colors ${
                          activeTab === tab
                            ? "bg-[#900DA4] text-white pointer-none"
                            : "text-white/50 hover:text-white/80 cursor-pointer"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                 
                </div>
        
                {activeTab == "Track Details" && (
                  <div className="flex gap-10">
                        <div className="w-2/3 py-7 border-r border-white/15">
                            <div className="mb-4">
                                <h4 className="text-white/70 text-[15px]">Track Description</h4>
                                <p className="text-white text-[15px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London</p>
                            </div>
                            <div className="mb-4">
                                <h4 className="text-white/70 text-[15px]">ISRC Code</h4>
                                <p className="text-white text-[15px]">AA-ABC-00-00000</p>
                            </div>
                            <div className="mb-4">
                                <h4 className="text-white/70 text-[15px]">Genre</h4>
                                <p className="text-white text-[15px]">Pop / Acoustic</p>
                            </div>
                            <div className="mb-4">
                                <h4 className="text-white/70 text-[15px]">Language</h4>
                                <p className="text-white text-[15px]">Hindi</p>
                            </div>
                             <div className="mb-4 flex items-center gap-3">
                                 <span className="bg-[#1BC50B] text-black w-6 h-6 flex items-center justify-center rounded-full  transform ">
                                    <Check size={16} />
                                </span>
                                <p className="text-white text-[15px]">I own 100% of the rights</p>
                            </div>

                               <div className="flex gap-3 mt-10  cursor-pointer">
                                <div className="rounded-[2px] border border-[#fff] w-5 h-5" >                                   
                                    <div className="rounded-[2px] w-5 h-5 bg-[#1BC50B] flex items-center justify-center " ><Check size={12} color="#222" /></div>
                                
                                    </div>
                                    <div>
                                        <h5 className="leading-none mb-1">Third party beats</h5>
                                    </div>
                            </div>


                        </div>
                         <div className="w-1/3 py-7">
                            <h4 className="text-white/70 text-[15px]">Lyrics</h4>
                                <p className="text-white text-[15px]">Kya mein batau,
Tum yeh samjhoge shayad,
Mein pagal hu..- 2 times
Dil karta hai TV tower
pe mein chard jau,
Chilla chilla ke mein yeh sabse keh du,</p>
                         </div>
                   
                  </div>
                )}
        
                {activeTab == "Analytics" && (
                  <>
                    <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 py-5">
                      <div className="rounded-[10px] py-6 px-4 bg-card-gradient">
                        <h4 className="text-[18px] font-bold flex items-center gap-2 mb-3">
                          <img src="/solar_airbuds-bold.png" /> Total Listen (Hours)
                        </h4>
                        <div className="flex items-center gap-3">
                          <h3 className="text-[22px] font-bold">50 hrs</h3>
                          <span className="flex items-center gap-1 bg-[#354738] text-[#1BC50B]  border border-[#447234] rounded-[3px] px-2 py-1 rounded-[30px] text-sm">
                            28.4% <MoveUpRight size={10} />
                          </span>
                        </div>
                      </div>
                      <div className="rounded-[10px] py-6 px-4 bg-card-gradient">
                        <h4 className="text-[18px] font-bold flex items-center gap-2 mb-3">
                          <img src="/mingcute_user-follow-2-fill.png" /> Total
                          Likes{" "}
                        </h4>
                        <div className="flex items-center gap-3">
                          <h3 className="text-[22px] font-bold">50.8K</h3>
                          <span className="flex items-center gap-1 bg-[#354738] text-[#1BC50B]  border border-[#447234] rounded-[3px] px-2 py-1 rounded-[30px] text-sm">
                            28.4% <MoveUpRight size={10} />
                          </span>
                        </div>
                      </div>
                      <div className="rounded-[10px] py-6 px-4 bg-card-gradient">
                        <h4 className="text-[18px] font-bold flex items-center gap-2 mb-3">
                          <img src="/icon-park-outline_recent-views-sort.png" /> Total
                          Download
                        </h4>
                        <div className="flex items-center gap-3">
                          <h3 className="text-[22px] font-bold">50.8K</h3>
                          <span className="flex items-center gap-1 bg-[#354738] text-[#1BC50B]  border border-[#447234] rounded-[3px] px-2 py-1 rounded-[30px] text-sm">
                            28.4% <MoveUpRight size={10} />
                          </span>
                        </div>
                      </div>
                      <div className="rounded-[10px] py-6 px-4 bg-card-gradient">
                        <h4 className="text-[18px] font-bold flex items-center gap-2 mb-3">
                          <img src="/icon-park-outline_recent-views-sort1.png" />{" "}
                          Top{" "}
                        </h4>
                        <div className="flex items-center gap-3">
                          <h3 className="text-[22px] font-bold">50.8K</h3>
                          <span className="flex items-center gap-1 bg-[#354738] text-[#1BC50B]  border border-[#447234] rounded-[3px] px-2 py-1 rounded-[30px] text-sm">
                            28.4% <MoveUpRight size={10} />
                          </span>
                        </div>
                      </div>
                    </div>
                    <ListenersTrendChart />
                  </>
                )}
              </div>
              <div className="w-1/3">
                <div className="bg-card-gradient rounded-[10px] p-4 h-full flex-col flex">
                  <div>
                  <div className="form-group">
                    <label>
                      Track Visibility <span className="text-red-500">*</span>
                    </label>
        
                    <div
                      className="flex gap-3 mb-4 cursor-pointer items-center"
                      onClick={() => setReleaseType("Public")}
                    >
                      <div
                        className={`h-7 w-7 rounded-full  ${releaseType === "Public" ? "bg-[#f2cd51] border-[#74543c]" : "bg-[#686868] border-[#454545]"}  border-6  flex justify-center items-center`}
                      ></div>
                      <div>
                        <h4 className="leading-none">Public</h4>
                        <h5 className="text-[12px] text-white/50">
                          Available to all listeners immediately after publishing
                        </h5>
                      </div>
                    </div>
                    <div
                      className="flex gap-3 mb-4 cursor-pointer items-center"
                      onClick={() => setReleaseType("Private")}
                    >
                      <div
                        className={`h-7 w-7 rounded-full  ${releaseType === "Private" ? "bg-[#f2cd51] border-[#74543c]" : "bg-[#686868] border-[#454545]"}  border-6  flex justify-center items-center`}
                      ></div>
                      <div>
                        <h4 className="leading-none">Private</h4>
                        <h5 className="text-[12px] text-white/50">
                          Only visible to you; hidden from listeners
                        </h5>
                      </div>
                    </div>
                    <div
                      className="flex gap-3 mb-4 cursor-pointer items-center"
                      onClick={() => setReleaseType("Scheduled")}
                    >
                      <div
                        className={`h-7 w-7 rounded-full  ${releaseType === "Scheduled" ? "bg-[#f2cd51] border-[#74543c]" : "bg-[#686868] border-[#454545]"}  border-6  flex justify-center items-center`}
                      ></div>
                      <div>
                        <h4 className="leading-none">Scheduled</h4>
                        <h5 className="text-[12px] text-white/50">
                          Automatically published on your selected date and time
                        </h5>
                      </div>
                    </div>
                  </div>
                  {releaseType === "Scheduled" && (
                    <div className="">
                      <div className="form-group relative flex-1">
                        <label>
                          Release Date & Time <span className="text-red-500">*</span>
                        </label>
                        <DatePicker
                          minDate={today}
                          maxDate={maxDate}
                          selected={releaseDate}
                          onChange={ReleaseDateHandle}
                          showTimeSelect
                          dateFormat="MM/dd/yyyy h:mm aa"
                          isClearable
                          placeholderText="Select realease date & time"
                          className={`w-full bg-transparent border rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none transition-colors border-white/20 focus:border-amber-400`}
                        />
                      </div>
                      <h5 className="text-sm text-white/50">
                        You can change you schedule date and time
                      </h5>
                    </div>
                  )}
        
                  <div className="form-group border-t border-white/30 pt-4 mt-3">
                    <label>Track tags</label>
                    <div className="flex gap-2 flex-wrap">
                      <span className="bg-[#900DA4] rounded-[30px] px-4 py-2">
                        firstalbum
                      </span>
                      <span className="bg-[#900DA4] rounded-[30px] px-4 py-2">
                        firstalbum
                      </span>
                      <span className="bg-[#900DA4] rounded-[30px] px-4 py-2">
                        firstalbum
                      </span>
                    </div>
                    <h6 className="text-sm text-white/50 mt-3">3 tags are added</h6>
                  </div>
                  </div>
                  <div className="text-center mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="theme-bttn "
                    >
                      Update
                    </motion.button>
                  </div>
                </div>
              </div>
           
            </div>
    )
}