"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

export default function BandMemberCard({
  member,
  onToggleActive,
  onEdit,
  onRemove,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative rounded-3xl border border-amber-400/40 p-6 pt-5"
     
    >
      {/* Options menu */}
      <div className="absolute top-4 right-4" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="text-white/50 hover:text-white transition-colors cursor-pointer"
          aria-label="Member options"
        >
          <MoreVertical size={18} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-[#2a1440] border border-white/10 rounded-xl overflow-hidden shadow-lg z-10">
            <button
              onClick={() => {
                onEdit?.(member);
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <Pencil size={14} /> Edit
            </button>
            <button
              onClick={() => {
                onRemove?.(member);
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Trash2 size={14} /> Remove
            </button>
          </div>
        )}
      </div>

      {/* Avatar with gradient ring */}
      <div className="flex justify-center mb-4">
        <div
          className="w-24 h-24 rounded-full p-[3px]"
          style={{
            background: "conic-gradient(from 180deg, #f5c542, #8b5cf6, #f5c542)",
          }}
        >
          <div className="w-full h-full rounded-full bg-[#2a1440] overflow-hidden flex items-center justify-center">
            {member.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={member.avatarUrl}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white/40 text-2xl font-semibold">
                {member.name?.[0]?.toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Name + role */}
      <h3 className="text-white text-xl font-semibold text-center mb-1">
        {member.name}
      </h3>
      <p className="text-white/60 text-center mb-5">{member.role}</p>

      {/* Active toggle */}
      <div className="flex justify-center">
        <button
          onClick={() => onToggleActive?.(member)}
          className={`w-14 h-7 rounded-full flex items-center px-1 transition-colors cursor-pointer ${
            member.active ? "bg-white/20 justify-end" : "bg-white/10 justify-start"
          }`}
          aria-pressed={member.active}
          aria-label={member.active ? "Active member" : "Inactive member"}
        >
          <span
            className={`w-5 h-5 rounded-full transition-colors ${
              member.active ? "bg-emerald-400" : "bg-white/40"
            }`}
          />
        </button>
      </div>
    </div>
  );
}


