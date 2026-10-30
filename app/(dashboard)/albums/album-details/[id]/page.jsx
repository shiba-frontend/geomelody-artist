"use client";
import TrackCard from "@/component/music/TrackCard";
import { INITIAL_TRACKS } from "@/lib/dummyTrack";
import { CalendarDays, MoveUpRight, Music, Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AnimatePresence, motion } from "framer-motion";
import ModalSide from "@/component/ModalSide";
import ListenersTrendChart from "@/component/music/ListenersTrendChart";

const TABS = ["Music Tracks", "Analytics"];

function ColumnHeader({ label }) {
  return (
    <div className="flex items-center gap-2 text-white/50 text-sm">{label}</div>
  );
}

export default function AlbumDetails() {
  const [activeTab, setActiveTab] = useState("Music Tracks");
  const [tracks, setTracks] = useState(INITIAL_TRACKS);
  const [selectedIds, setSelectedIds] = useState([]);
  const [releaseType, setReleaseType] = useState("Public");
  const [releaseDate, setReleaseDate] = useState(null);

  const [addtrackModal, setAddtrackModal] = useState(false);

  const containerRef = useRef(null);
  const MIN_TAGS = 3;
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 30);

  function toggleSelect(trackId) {
    setSelectedIds(
      (prev) =>
        prev.includes(trackId)
          ? prev.filter((id) => id !== trackId) // uncheck
          : [...prev, trackId], // check
    );
  }

  function ReleaseDateHandle(e) {
    setReleaseDate(e);
    //setAlbumerrors((prev) => ({ ...prev, releaseDate: "" }));
  }

  return (
    <div className="flex gap-5 h-full">
      <div className="w-2/3">
        <div className="relative">
          <img src="/Registration.jpg" className="w-full h-60 rounded-[10px]" />
          <div className="p-3 absolute bottom-0 left-0">
            <h4>First Album</h4>
            <h5 className="flex items-center text-sm gap-1 my-2">
              <Music size={15} className="text-amber-400" />2 Tracks
            </h5>
            <h5 className="flex items-center text-sm gap-1">
              <CalendarDays size={15} className="text-white/50" />
              Publish Date: 12 sep 2026 | 00:30 am
            </h5>
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
          <button
            className="bg-white/10 rounded-[30px] px-4 py-2 cursor-pointer flex items-center gap-1"
            onClick={() => setAddtrackModal(true)}
          >
            <Plus /> Add Tracks
          </button>
        </div>

        {activeTab == "Music Tracks" && (
          <>
            <div className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr_1fr_1fr_40px] gap-4 px-6 py-4 border-b border-white/10">
             
              <ColumnHeader label="Track Details" />
              <ColumnHeader label="Play Times" />
              <ColumnHeader label="Total Likes" />
              <ColumnHeader label="Genre" />
              <ColumnHeader label="Release On" />
              <ColumnHeader label="Status" />
              <span />
            </div>

            {tracks.map((track, i) => {
              return (
                <div
                  key={track.id}
                  className={`grid grid-cols-[1.4fr_1fr_1fr_0.8fr_1fr_1fr_40px] gap-4 items-center px-6 py-4 ${
                    i % 2 === 1 ? "bg-white/[0.03]" : ""
                  } border-b border-white/5 last:border-b-0`}
                >
                  <TrackCard
                    track={track}
                    checked={selectedIds.includes(track.id)}
                    onCheck={toggleSelect}
                    ischeckbox={false}
                    action={true}
                  />
                </div>
              );
            })}
           
          </>
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
              Select Visibility <span className="text-red-500">*</span>
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
            <label>Album tags</label>
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
      <ModalSide
        isOpen={addtrackModal}
        onClose={() => setAddtrackModal(false)}
        closeOnBackdrop={false}
        size="lg"
      >
        <div className="bg-[#900DA4] flex items-center justify-between px-4 py-5">
          <h4 className="text-[18px] font-medium">Add Track</h4>
          <button
            onClick={() => setAddtrackModal(false)}
            className="cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>
        <div className="px-5 py-6 flex flex-col h-[calc(100vh-100px)] overflow-y-auto">
          <div>
            <div className="grid grid-cols-[40px_1.4fr_1fr_1fr_0.8fr_1fr_1fr] gap-4 px-6 py-4 border-b border-white/10">
              <span />
              <ColumnHeader label="Track Details" />
              <ColumnHeader label="Play Times" />
              <ColumnHeader label="Total Likes" />
              <ColumnHeader label="Genre" />
              <ColumnHeader label="Release On" />
              <ColumnHeader label="Status" />
            </div>

            {tracks.map((track, i) => {
              return (
                <div
                  key={track.id}
                  className={`grid grid-cols-[40px_1.4fr_1fr_1fr_0.8fr_1fr_1fr] gap-4 items-center px-6 py-4 ${
                    i % 2 === 1 ? "bg-white/[0.03]" : ""
                  } border-b border-white/5 last:border-b-0`}
                >
                  <TrackCard
                    track={track}
                    checked={selectedIds.includes(track.id)}
                    onCheck={toggleSelect}
                    ischeckbox={true}
                    action={false}
                  />
                </div>
              );
            })}

            {selectedIds.length > 0 && (
              <div className="flex items-center justify-between px-6 py-3 bg-white/5 text-white text-sm">
                <span>{selectedIds.length} selected</span>
                <button
                  onClick={() => setSelectedIds([])}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Clear selection
                </button>
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="theme-bttn mt-auto self-end"
          >
            Save & Update
          </motion.button>
        </div>
      </ModalSide>
    </div>
  );
}
