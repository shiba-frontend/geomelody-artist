"use client";

import { useAppStore } from "@/hooks/useAppStore";
import { Cake, Check, ChevronRight, CircleUser } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

function ProfileRow({ label, status, onClick }) {
  // status: "default" | "active" | "complete"
  const styles = {
    default: {
      row: "text-white/50 hover:text-white/70",
      circle: "border-2 border-white/30 text-white/30",
      chevron: "text-white/30",
    },
    active: {
      row: "text-white",
      circle: "border-2 border-white",
      chevron: "text-white",
    },
    complete: {
      row: "text-white",
      circle: "text-[green] border-2 border-green-900",
      chevron: "text-green/60",
    },
  };

  const s = styles[status] ?? styles.default;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between py-5 border-b border-white/10 last:border-b-0 transition-colors ${s.row}`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${s.circle}`}
        >
          <Check size={14} strokeWidth={3} />
        </span>
        <span className="text-[18px]">{label}</span>
      </div>
      <ChevronRight size={18} className={s.chevron} />
    </button>
  );
}

export default function ProfileCard({ onSectionClick }) {

  const searchParams = useSearchParams();
   const artistTypes = searchParams.get("type") || "solo";
    
  var sections = [
    {
      id: 1,
      label: artistTypes === "solo" ? "Artist Identity" : "Band Identity",
      complete: true,
      path: `/profile/artist-identity?type=${artistTypes}`,
      acctualpath:"/profile/artist-identity"
    },
   ...(artistTypes === "band"
    ? [{ id: 2, label: "Band Members", complete: false, path: `/profile/band-members?type=${artistTypes}`, acctualpath:"/profile/band-members" }]
    : []),
    {
      id: 3,
      label: "Visual Identity",
      complete: false,
      path: `/profile/visual-identity?type=${artistTypes}`,
      acctualpath:"/profile/visual-identity"
    },
    {
      id: 4,
      label: "Social Presence",
      complete: false,
      path: `/profile/social-presence?type=${artistTypes}`,
      acctualpath:"/profile/social-presence"
    },
    {
      id: 5,
      label: "Subscription Plan",
      complete: false,
      path: `/profile/subscription-plan?type=${artistTypes}`,
      acctualpath:"/profile/subscription-plan"
    },
  ];

  var name = "Indranil Sen";
  var location = "Kolkata";
  var countryFlag = "/indian.png";
  var email = "indrahmz06@gmail.com";
  var phone = "+91 62913 32961";
  var dob = "06-07-1990";
  var avatarUrl = "";

  const pathname = usePathname();



  return (
    <div className="max-w-sm mx-auto rounded-3xl p-6 bg-[#411753] h-[calc(100vh-120px)]">
      {/* Avatar with gradient ring */}
      <div className="flex justify-center mb-5">
        <div
          className="w-32 h-32 rounded-full p-[3px]"
          style={{
            background:
              "conic-gradient(from 180deg, #FFCD27, #900DA4, #f5c542)",
          }}
        >
          <div className="w-full h-full rounded-full bg-[#2D023D] flex items-center justify-center overflow-hidden">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <CircleUser size={48} className="text-white/40" />
            )}
          </div>
        </div>
      </div>

      {/* Name + details */}
      <div className="text-center mb-2">
        <h2 className="text-white text-[24px] font-semibold">{name}</h2>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-white/70 text-sm mb-2">
        <span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={countryFlag} alt="" className="w-4 h-3 object-cover" />
        </span>
        <span>{location}</span>
      </div>

      <p className="text-center text-white/70 text-sm mb-1">{email}</p>
      <p className="text-center text-white/70 text-sm mb-2">{phone}</p>

      <div className="flex items-center justify-center gap-1.5 text-amber-400 text-sm mb-5">
        <Cake size={16} />
        <span>{dob}</span>
      </div>

      <div className="h-px bg-white/10 mb-1" />

      {/* Section list */}
      <div>
        {sections.map((section,index) => {
          const isActive = pathname === section.acctualpath;
          const status = isActive
            ? "active"
            : section.complete
            ? "complete"
            : "default";

          return (
            <ProfileRow
              key={index}
              label={section.label}
              status={status}
              onClick={() => onSectionClick?.(section)}
            />
          );
        })}
      </div>
    </div>
  );
}
