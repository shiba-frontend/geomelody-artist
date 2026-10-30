"use client";
import { useEffect, useRef, useState } from "react";
import {
  ListFilter,
  ArrowDownUp,
  Music,
  ThumbsUp,
  MoreVertical,
  Trash2,
  Pencil,
  ChevronDown,
  Plus,
  Eye,
} from "lucide-react";
import VisibilityDropdown from "@/component/music/VisibilityDropdown";
import { INITIAL_TRACKS } from "@/lib/dummyTrack";

const TABS = ["All Music", "Public", "Private", "Scheduled"];




function StatusBadge({ status, open }) {
  const styles = {
    Published: "bg-emerald-600/80 text-white",
    Private: "bg-white/15 text-white/70",
    Scheduled: "bg-amber-500/20 text-amber-400",
  };
  return (
    <span
      className={`text-xs font-medium px-4 py-1.5 rounded-full flex gap-1  items-center ${
        styles[status] || "bg-white/15 text-white/70"
      }`}
    >
      {status}  <ChevronDown size={17}  className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
    </span>
    
  );
}

function ColumnHeader({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 text-white/50 text-sm">
      <Icon size={15} className="text-amber-400" />
      {label}
    </div>
  );
}

export default function MyMusicPage() {
  const [tracks, setTracks] = useState(INITIAL_TRACKS);
  const [activeTab, setActiveTab] = useState("All Music");

  const [openStatusRowId, setOpenStatusRowId] = useState(null);
  const [openActionRowId, setOpenActionRowId] = useState(null);

  const statusMenuRef = useRef(null);
  const actionMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (statusMenuRef.current && !statusMenuRef.current.contains(e.target)) {
        setOpenStatusRowId(null);
      }
      if (actionMenuRef.current && !actionMenuRef.current.contains(e.target)) {
        setOpenActionRowId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Real per-tab counts instead of a hardcoded "(2)" on every tab
  const tabCounts = {
    "All Music": tracks.length,
    Public: tracks.filter((t) => t.status === "Published").length,
    Private: tracks.filter((t) => t.status === "Private").length,
    Scheduled: tracks.filter((t) => t.status === "Scheduled").length,
  };

  const visibleTracks =
    activeTab === "All Music"
      ? tracks
      : tracks.filter((t) => {
          if (activeTab === "Public") return t.status === "Published";
          return t.status === activeTab;
        });

  function handleStatusChange(trackId, newStatus) {
    setTracks((prev) =>
      prev.map((t) => (t.id === trackId ? { ...t, status: newStatus } : t))
    );
    setOpenStatusRowId(null);
  }

  function handleRemoveTrack(trackId) {
    setTracks((prev) => prev.filter((t) => t.id !== trackId));
    setOpenActionRowId(null);
  }

  function handleEditTrack(trackId) {
    // Wire this to your actual edit flow (e.g. router.push(`/music/${trackId}/edit`))
    console.log("edit", trackId);
    setOpenActionRowId(null);
  }



  return (
    <div className="rounded-3xl  border border-white/5 bg-card-gradient">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
        

        <div className="flex bg-black/20 rounded-full p-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm transition-colors ${
                activeTab === tab
                  ? "bg-[#900DA4] text-white"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {tab} ({tabCounts[tab]})
            </button>
          ))}
        </div>
        <a href="/music/create-music" className="bg-white/10 rounded-[30px] px-4 py-2 cursor-pointer flex items-center gap-1"><Plus /> Add New Music</a>
      </div>

 
      <div className="grid grid-cols-[0.8fr_1.4fr_1fr_1fr_0.8fr_1fr_1fr_40px] gap-4 px-6 py-4 border-b border-white/10">
        <ColumnHeader icon={ListFilter} label="Track Id" />
        <ColumnHeader icon={ListFilter} label="Music Details" />
        <ColumnHeader icon={ArrowDownUp} label="Play Times" />
        <ColumnHeader icon={ArrowDownUp} label="Total Likes" />
        <ColumnHeader icon={ArrowDownUp} label="Genre" />
        <ColumnHeader icon={ArrowDownUp} label="Release On" />
        <ColumnHeader icon={ListFilter} label="Status" />
        <span />
      </div>

      {/* Rows */}
      <div>
        {visibleTracks.map((track, i) => (
          <div
            key={track.id}
            className={`grid grid-cols-[0.8fr_1.4fr_1fr_1fr_0.8fr_1fr_1fr_40px] gap-4 items-center px-6 py-4 ${
              i % 2 === 1 ? "bg-white/[0.03]" : ""
            } border-b border-white/5 last:border-b-0`}
          >
            <div>
              <p className="text-white font-medium text-sm">{track.id}</p>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-lg flex-shrink-0"
                style={{ background: track.art }}
              />
              <div>
                <p className="text-white text-sm font-medium">{track.title}</p>
                <p className="text-white/40 text-sm">{track.duration}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-white text-sm">
              <Music size={16} className="text-amber-400" />
              <span className="font-semibold">{track.plays}</span>
              <span className="text-white/50">Play</span>
            </div>

            <div className="flex items-center gap-1.5 text-white text-sm">
              <ThumbsUp size={16} className="text-amber-400" />
              <span className="font-semibold">{track.likes}</span>
              <span className="text-white/50">Likes</span>
            </div>

            <div>
              <span className="font-semibold text-white text-sm">{track.genre}</span>
            </div>

            <div>
              <span className="text-white/50 text-sm">
                {track.release_date || "—"}
              </span>
            </div>

            {/* Status — FIX: dropdown now shows real, actionable status
                options instead of placeholder text, only opens for THIS
                row's id, and reuses StatusBadge for consistent styling. */}
            <div
              className="relative"
              ref={openStatusRowId === track.id ? statusMenuRef : null}
            >
              <button
              className="flex cursor-pointer"
                onClick={() =>
                  setOpenStatusRowId((prev) => (prev === track.id ? null : track.id))
                }
              >
                <StatusBadge status={track.status} open={openStatusRowId === track.id} /> 
              </button>

              {openStatusRowId === track.id && (

                <VisibilityDropdown
                  status={track.status}
                  relaseddate={track.release_date}
                  releasetime={track.release_time}
                  onConfirm={(m)=>{
                    console.log('=====', m)
                    setOpenStatusRowId(false)
                  }}
                  errors={{}}
                />
              
              )}
            </div>

            <div
              className="relative"
              ref={openActionRowId === track.id ? actionMenuRef : null}
            >
              <button
                onClick={() =>
                  setOpenActionRowId((prev) => (prev === track.id ? null : track.id))
                }
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 transition-colors"
              >
                <MoreVertical size={16} />
              </button>

              {openActionRowId === track.id && (
                <div className="absolute right-0 mt-2 w-36 bg-[#2a1440] border border-white/10 rounded-xl overflow-hidden shadow-lg z-10">
                  <a
                    href="/music/details/1"
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <Eye size={14} /> View
                  </a>
                  <button
                    onClick={() => handleEditTrack(track.id)}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleRemoveTrack(track.id)}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-white/10 transition-colors"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {visibleTracks.length === 0 && (
          <p className="text-white/40 text-sm text-center py-10">
            No tracks in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}
