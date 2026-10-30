"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LayoutDashboard, ChevronsLeft, Users, Settings, ChevronDown, Music, ClockFading, CalendarCog, FileChartColumn, CircleUserRound, CircleDollarSign, TextSearch } from "lucide-react";
import { useState } from "react";

// Add new routes here — icon, label, and the path it links to.

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  {
    icon: Music,
    label: "Music Management",
    children: [
      { label: "My Music", path: "/music/my-music" },      
      { label: "My Albums", path: "/albums/my-albums" },
      { label: "Extended Play (EP)", path: "/music/my-extended-play" },
    ],
  },
  {
    icon: ClockFading,
    label: "Release Management",
    children: [
      { label: "Create Music", path: "/music/release-music" },
      { label: "Music List", path: "/music/drafts" },
    ],
  },
   {
    icon: CalendarCog,
    label: "Event Management",
    path: "/event/my-event",
  },
  { icon: Users, label: "Audience & Fan Insights", path: "/fan-insight" },
  { icon: FileChartColumn, label: "Analytics", path: "/analytics" },
  
];

const OTHERS_MENU = [
  
    { icon: CircleUserRound, label: "My Profile", path: "/profile/artist-identity" },
   { icon: CircleDollarSign, label: "My Earnings", path: "/my-earning" },
   { icon: TextSearch, label: "Plan & Pricing", path: "/my-earning" },
   {
    icon: Settings,
    label: "Settings",
    children: [
      { label: "My Account", path: "/settings/my-account" },
      { label: "Billing", path: "/settings/billing" },
      { label: "Notification", path: "/settings/notification" },
    ],
  },
]



export default function Sidebar({ expanded, setExpanded }) {
   const pathname = usePathname();
   const [openMenus, setOpenMenus] = useState(() =>
     // auto-open a submenu if the current route lives inside it
     MENU_ITEMS.filter((item) =>
       item.children?.some((c) => pathname.startsWith(c.path))
     ).map((item) => item.label)
   );
 
   const toggleSubmenu = (label) => {
     // opening a submenu only makes sense with room to show it
     if (!expanded) setExpanded(true);
 
     setOpenMenus((prev) =>
       prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
     );
   };

  return (
    <aside
      className={`relative flex flex-col border-r border-white/5 bg-[#150031] transition-all duration-300 ease-in-out ${
        expanded ? "w-64" : "w-20"
      }`}
    >
      {/* Logo row */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/5">
        <div className="flex items-center gap-2 overflow-hidden">
          <img src="/fav.png" className="w-8" />
          <span
            className={`text-white font-semibold text-lg whitespace-nowrap transition-all duration-200 ${
              expanded ? "opacity-100 w-auto" : "opacity-0 w-0"
            }`}
          >
          <img src="/geomelody.png" className="" />
          </span>
        </div>

        <button
         onClick={() => setExpanded((e) => !e)}
          className="flex-shrink-0 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path fill="#FFCD27" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 17h8m-8-5h14M5 7h8" />
        </svg>
         
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-5 overflow-hidden">
        <p
          className={`text-white/40 text-xs uppercase tracking-wider mb-3 px-2 whitespace-nowrap transition-opacity duration-200 ${
            expanded ? "opacity-100" : "opacity-0"
          }`}
        >
          Main Menu
        </p>

         <ul className="space-y-1">
                  {MENU_ITEMS.map((item) => {
                    const { icon: Icon, label, path, children } = item;
                    const hasChildren = !!children?.length;
                    const isOpen = openMenus.includes(label);
                    const active = path
                      ? pathname === path
                      : children?.some((c) => pathname.startsWith(c.path));
        
                    return (
                      <li key={label}>
                        {hasChildren ? (
                          <>
                            <button
                              onClick={() => toggleSubmenu(label)}
                              className={`w-full flex items-center gap-3 px-2.5 py-4 rounded-lg text-sm transition-colors ${
                                active
                                  ? "text-white"
                                  : "text-white/60 hover:text-white hover:bg-white/5"
                              } ${!expanded ? "justify-center" : ""}`}
                              title={!expanded ? label : undefined}
                            >
                              <Icon size={18} className={active ? "text-amber-400" : ""} />
                              <span
                                className={`flex-1 text-left whitespace-nowrap transition-all duration-200 ${
                                  expanded ? "opacity-100 w-auto" : "opacity-0 w-0"
                                }`}
                              >
                                {label}
                              </span>
                              {expanded && (
                                <ChevronDown
                                  size={16}
                                  className={`transition-transform duration-200 ${
                                    isOpen ? "rotate-180" : ""
                                  }`}
                                />
                              )}
                            </button>
        
                            {/* Submenu */}
                            {expanded && (
                              <ul
                                className={`overflow-hidden transition-all duration-200 ${
                                  isOpen ? "max-h-40 mt-1" : "max-h-0"
                                }`}
                              >
                                {children.map((child) => {
                                  const childActive = pathname === child.path;
                                  return (
                                    <li key={child.path}>
                                      <Link
                                        href={child.path}
                                        className={`block pl-11 pr-2.5 py-2 rounded-lg text-sm transition-colors ${
                                          childActive
                                            ? "text-amber-400"
                                            : "text-white/50 hover:text-white hover:bg-white/5"
                                        }`}
                                      >
                                        {child.label}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </>
                        ) : (
                          <Link
                            href={path}
                            className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-sm transition-colors ${
                              active
                                ? "text-white"
                                : "text-white/60 hover:text-white hover:bg-white/5"
                            } ${!expanded ? "justify-center" : ""}`}
                            title={!expanded ? label : undefined}
                          >
                            <Icon size={18} className={active ? "text-amber-400" : ""} />
                            <span
                              className={`whitespace-nowrap transition-all duration-200 ${
                                expanded ? "opacity-100 w-auto" : "opacity-0 w-0"
                              }`}
                            >
                              {label}
                            </span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <p
          className={`text-white/40 text-xs uppercase tracking-wider mb-3 mt-4 px-2 whitespace-nowrap transition-opacity duration-200 ${
            expanded ? "opacity-100" : "opacity-0"
          }`}
        >
          Others
        </p>
         <ul className="space-y-1">
                  {OTHERS_MENU.map((item) => {
                    const { icon: Icon, label, path, children } = item;
                    const hasChildren = !!children?.length;
                    const isOpen = openMenus.includes(label);
                    const active = path
                      ? pathname === path
                      : children?.some((c) => pathname.startsWith(c.path));
        
                    return (
                      <li key={label}>
                        {hasChildren ? (
                          <>
                            <button
                              onClick={() => toggleSubmenu(label)}
                              className={`w-full flex items-center gap-3 px-2.5 py-4 rounded-lg text-sm transition-colors ${
                                active
                                  ? "text-white"
                                  : "text-white/60 hover:text-white hover:bg-white/5"
                              } ${!expanded ? "justify-center" : ""}`}
                              title={!expanded ? label : undefined}
                            >
                              <Icon size={18} className={active ? "text-amber-400" : ""} />
                              <span
                                className={`flex-1 text-left whitespace-nowrap transition-all duration-200 ${
                                  expanded ? "opacity-100 w-auto" : "opacity-0 w-0"
                                }`}
                              >
                                {label}
                              </span>
                              {expanded && (
                                <ChevronDown
                                  size={16}
                                  className={`transition-transform duration-200 ${
                                    isOpen ? "rotate-180" : ""
                                  }`}
                                />
                              )}
                            </button>
        
                            {/* Submenu */}
                            {expanded && (
                              <ul
                                className={`overflow-hidden transition-all duration-200 ${
                                  isOpen ? "max-h-40 mt-1" : "max-h-0"
                                }`}
                              >
                                {children.map((child) => {
                                  const childActive = pathname === child.path;
                                  return (
                                    <li key={child.path}>
                                      <Link
                                        href={child.path}
                                        className={`block pl-11 pr-2.5 py-2 rounded-lg text-sm transition-colors ${
                                          childActive
                                            ? "text-amber-400"
                                            : "text-white/50 hover:text-white hover:bg-white/5"
                                        }`}
                                      >
                                        {child.label}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </>
                        ) : (
                          <Link
                            href={path}
                            className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-sm transition-colors ${
                              active
                                ? "text-white"
                                : "text-white/60 hover:text-white hover:bg-white/5"
                            } ${!expanded ? "justify-center" : ""}`}
                            title={!expanded ? label : undefined}
                          >
                            <Icon size={18} className={active ? "text-amber-400" : ""} />
                            <span
                              className={`whitespace-nowrap transition-all duration-200 ${
                                expanded ? "opacity-100 w-auto" : "opacity-0 w-0"
                              }`}
                            >
                              {label}
                            </span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
      </nav>

    </aside>
  );
}
