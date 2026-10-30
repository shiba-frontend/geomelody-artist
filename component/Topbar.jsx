"use client";

import { Bell, MessageSquare } from "lucide-react";

function IconBadge({ icon: Icon, count }) {
  return (
    <button className="relative text-white/80 hover:text-white transition-colors">
      <Icon size={25} />
      {count > 0 && (
        <span className="absolute -top-2 -right-3 bg-amber-400 text-[#fff] text-[10px] font-semibold rounded-full w-6 h-6 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}

export default function Topbar({ title, user }) {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#150031] flex-shrink-0">
      <h1 className="text-white text-lg">{title}</h1>

      <div className="flex items-center gap-7">
        {!user && (
          <div className="flex items-center gap-2 pr-4 border-r border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#600073] text-[#fff] flex items-center justify-center text-sm font-semibold">
              {user?.name?.[0]?.toUpperCase() ?? "U"}
            </div>
            <span className="text-white/80 text-[22px] font-bold hidden sm:flex flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
              <path fill="#FFCD27" d="m18.047 1.37l.823.568a12.1 12.1 0 0 1 3.085 3.084l.567.823l-1.646 1.135l-.568-.823a10.1 10.1 0 0 0-2.573-2.573l-.823-.567zm-4.295 3.092a1.373 1.373 0 0 0-1.943.003L6.555 9.747l.444-1.096c.56-1.38-1.005-2.65-2.24-1.818a1.5 1.5 0 0 0-.46.49L1.918 11.4a7.19 7.19 0 0 0 1.124 8.709l.845.844a7.19 7.19 0 0 0 10.167 0l5.035-5.036a1.375 1.375 0 0 0-1.945-1.944l-1.604 1.604l-.53-.532l3.69-3.69a1.375 1.375 0 0 0-1.945-1.944l-3.69 3.69l-.53-.53l5.057-5.057a1.375 1.375 0 0 0-1.945-1.945l-5.057 5.057l-.53-.53l3.691-3.691a1.373 1.373 0 0 0 0-1.942"></path>
            </svg>
             Indranil
            </span>
          </div>
        )}
        <IconBadge icon={Bell} count={12} />
        <IconBadge icon={MessageSquare} count={85} />

        
      </div>
    </header>
  );
}
