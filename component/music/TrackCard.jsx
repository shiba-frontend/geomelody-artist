import { Check, ChevronDown, MoreVertical, Music, ThumbsUp } from "lucide-react";
import AlbumTrackDropdown from "./AlbumTrackDropdown";
import { useEffect, useRef, useState } from "react";

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
      {status} {status == 'Scheduled' &&  <ChevronDown size={17}  className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />}
    </span>
    
  );
}



export default function TrackCard({track,checked, onCheck, ischeckbox, action}){
  const statusMenuRef = useRef(null);
   const [openStatusRowId, setOpenStatusRowId] = useState(null);

      useEffect(() => {
    function handleClickOutside(e) {
      if (statusMenuRef.current && !statusMenuRef.current.contains(e.target)) {
        setOpenStatusRowId(null);
      }
     
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



    return (
        <>
        {ischeckbox && 
            <div>
                <button
                className={`rounded-[2px] border w-5 h-5 cursor-pointer flex items-center justify-center transition-colors ${
                    checked ? "bg-[#ffcd27] border-[#ffcd27]" : "border-white/60"
                }`}
                onClick={() => onCheck(track.id)}
                aria-pressed={checked}
                aria-label={checked ? `Deselect ${track.title}` : `Select ${track.title}`}
                >
                {checked && <Check size={12} color="#222" />}
                </button>
            </div>
}
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
             <div
                className="relative"
                ref={openStatusRowId === track.id ? statusMenuRef : null}
            >
                {track.status == "Scheduled" ?
                     <button
                className="flex cursor-pointer"
                onClick={() =>
                    setOpenStatusRowId((prev) => (prev === track.id ? null : track.id))
                }
                >
                <StatusBadge status={track.status} open={openStatusRowId === track.id} /> 
                </button>
                :
                <div className="flex">
                    <StatusBadge status={track.status} open={openStatusRowId === track.id} /> 
                </div>
            }
               

                {openStatusRowId === track.id && (

                <AlbumTrackDropdown
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
            {action && 
            <button 
                  className="text-white/50 hover:text-white transition-colors cursor-pointer"
                  aria-label="Member options"
                >
                  <MoreVertical size={18} />
                </button>
                }
            
        </>
    )
}