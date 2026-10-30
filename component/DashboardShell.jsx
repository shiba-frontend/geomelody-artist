"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function isIdLike(segment) {
  return /^\d+$/.test(segment) || /^[0-9a-f-]{8,}$/i.test(segment);
}

function titleFromPath(pathname) {
  const segments = pathname.split("/").filter(Boolean);

  while (segments.length > 1 && isIdLike(segments[segments.length - 1])) {
    segments.pop();
  }

  const segment = segments.pop() || "dashboard";

  return segment
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function DashboardShell({ user, children }) {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();

  return (
    
    <div className="h-screen w-full flex bg-[#0d0714] font-sans overflow-hidden">
      <Sidebar expanded={expanded} setExpanded={setExpanded} />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={titleFromPath(pathname)} user={user} />

        <main
          className="flex-1 overflow-y-auto p-5 dashboard-bg"
          
        >
          {children}
        </main>
      </div>
    </div>
  );
}
