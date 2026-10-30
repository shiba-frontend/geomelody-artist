"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Search, CalendarClock, MapPin, ArrowRight } from "lucide-react";
import TicketScanner from "@/component/event/TicketScanner";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

const data = [
  {
    category: "Total",
    total: 1000,
    attended: 780,
    remain: 220,
  },
  {
    category: "VIP",
    total: 200,
    attended: 79,
    remain: 121,
  },
  {
    category: "Standard",
    total: 800,
    attended: 701,
    remain: 99,
  },
];

function ValueLabel({ x, y, width, height, value, dataKey }) {
  const inside = dataKey === "total" && value === 1000;

  return (
    <text
      x={inside ? x + width - 8 : x + width + 7}
      y={y + height / 2}
      fill="#eee6f5"
      fontSize={14}
      textAnchor={inside ? "end" : "start"}
      dominantBaseline="middle"
    >
      {value}
    </text>
  );
}

const colors = {
  total: "#706EE7",
  attended: "#55C4AE",
  remain: "#FF928A",
};

// Stand-in for a real ticket lookup. Replace with an actual API call,
// e.g.: const res = await ticketApi.verify(code); return res.data;
const MOCK_TICKETS = {
  "TICKET-001": {
    attendeeName: "Sourav Chetri",
    used: true,
    status: "already_used",
  },
  "TICKET-002": { attendeeName: "Priya Sharma", used: false, status: "valid" },
  "TICKET-006": {
    attendeeName: "Priyanka mondal",
    used: false,
    status: "valid",
  },
};

function verifyTicket(code) {
  const ticket = MOCK_TICKETS[code];
  if (!ticket) return { status: "invalid" };
  if (ticket.used)
    return { status: "already_used", attendeeName: ticket.attendeeName };
  return { status: "valid", attendeeName: ticket.attendeeName };
}

export default function CheckInPage() {
  const [result, setResult] = useState(null);
  const [passcode, setPasscode] = useState("");
  const [ismanualentry, setIsmanualentry] = useState(false)




  function handleScan(decodedText) {
    const verification = verifyTicket(decodedText);
    setResult(verification);

    // In a real app, a "valid" scan should also mark the ticket as used
    // on the server right here, so the same QR code can't be scanned
    // twice at two different entry gates.
  }

  useEffect(() => {
    var storedPasscode = localStorage.getItem("passcode");
    if (!storedPasscode) {
      // Redirect to the passcode entry page if no passcode is found
      window.location.href = "/ticket-verification";
    } else {
      setPasscode(storedPasscode);
    }
  }, []);

  return (
    <div
      className="px-10 py-5"
      style={{
        background:
          "linear-gradient(179deg,rgba(21, 0, 49, 1) 0%, rgba(0, 1, 7, 1) 100%); height: 100vh",
      }}
    >
      <div className="flex justify-between mb-5 items-center">
        <img src="/logo.png" alt="Logo" className="" />
        <h3>Event Name</h3>
      </div>

      <div className="flex lg:flex-row flex-col-reverse gap-4 lg:h-[calc(100vh_-_140px)]">
        <div className="lg:w-1/3 w--full">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="rounded-3xl p-6 border border-white/5 bg-card-gradient relative pe-20">
              <h4 className="flex items-center justify-between">
                Total <span>- 1000</span>
              </h4>
              <h4 className="flex items-center justify-between">
                VIP <span>- 200</span>
              </h4>
              <h4 className="flex items-center justify-between">
                Standard <span>- 100</span>
              </h4>
              <a href="#" className="w-10 h-10 flex bg-[#FFCD27] rounded-full items-center justify-center absolute right-3 top-2/5"><ArrowRight color="#222" /></a>
            </div>
           
          </div>
          <div className="rounded-3xl p-6 border border-white/5 bg-card-gradient ">
            <div className="h-[560px] w-full sm:h-[740px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  layout="vertical"
                  margin={{ top: 28, right: 35, bottom: 10, left: 0 }}
                  barCategoryGap={30}
                  barGap={2}
                >
                  <CartesianGrid
                    stroke="#ffffff"
                    strokeOpacity={0.08}
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    type="number"
                    orientation="top"
                    domain={[0, 1000]}
                    ticks={[0, 200, 400, 600, 800, 1000]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#e9e2f2", fontSize: 14 }}
                  />

                  <YAxis
                    type="category"
                    dataKey="category"
                    width={105}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#f4eefa", fontSize: 16 }}
                  />

                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    iconType="square"
                    wrapperStyle={{
                      color: "#f4eefa",
                      fontSize: "14px",
                      paddingTop: "18px",
                    }}
                    formatter={(value) =>
                      ({
                        total: "Total Ticket",
                        attended: "Atteneded",
                        remain: "Remain",
                      })[value]
                    }
                  />

                  <Bar
                    dataKey="total"
                    name="total"
                    fill={colors.total}
                    barSize={44}
                    isAnimationActive={false}
                  >
                    <LabelList content={<ValueLabel dataKey="total" />} />
                  </Bar>

                  <Bar
                    dataKey="attended"
                    name="attended"
                    fill={colors.attended}
                    barSize={44}
                    isAnimationActive={false}
                  >
                    <LabelList content={<ValueLabel dataKey="attended" />} />
                  </Bar>

                  <Bar
                    dataKey="remain"
                    name="remain"
                    fill={colors.remain}
                    barSize={44}
                    isAnimationActive={false}
                  >
                    <LabelList content={<ValueLabel dataKey="remain" />} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="lg:w-2/3 w-full">
          <div className="rounded-3xl p-6 border border-white/5 bg-card-gradient h-full">


   {result ?

   <>
    <div className="valid-ticket">
      <h3 className="text-[20px] font-bold mb-3">Neon Horizon Tour: Live at Echo</h3>
      <h4 className="flex items-center gap-2 mb-2"><CalendarClock color="#FFCD27" /> 24 OCT 2026 | 8:00pm - 10:00pm</h4>
      <h4 className="flex items-center gap-2"><MapPin color="#FFCD27" />  The Echo Dome, Los Angeles</h4>

      <div className="flex gap-5 border-t border-white/10 pt-7 mt-7 mb-3">
        <div className="">
            <h4>ID GEO74364648EV</h4>
            <h5 className="text-[#1BC50B] font-bold">Valid for 10 Entries</h5>            
        </div>
        <div className="flex items-center gap-2 ml-auto font-bold text-[20px]">
          <img src="/ticket-icon.png" /> Standard
        </div>
      </div>

          <div className="mb-3">
              <h4 className="text-sm">Booked By </h4>
              <h4 className="font-bold text-md">Mark Skoda</h4>
            </div>
             <div className="mb-3">
              <h4 className="text-sm">Contact Number </h4>
              <h4 className="font-bold text-md">+1 4533873633</h4>
            </div>
             <div className="mb-3">
              <h4 className="text-sm">Email ID </h4>
              <h4 className="font-bold text-md">markskoda@domainname.com</h4>
            </div>
            <button className="bg-[#900DA4] px-3 py-3 w-full rounded-[30px] cursor-pointer font-bold" onClick={()=>setIsmanualentry(false)}>Confirm</button>

    </div>


              <div
                className={`rounded-2xl p-5 flex items-center gap-4 ${
                  result?.status === "valid"
                    ? "bg-emerald-500/10 border border-emerald-500/30"
                    : result?.status === "already_used"
                      ? "bg-amber-500/10 border border-amber-500/30"
                      : "bg-red-500/10 border border-red-500/30"
                }`}
              >
                {result?.status === "valid" && (
                  <CheckCircle2
                    className="text-emerald-400 flex-shrink-0"
                    size={28}
                  />
                )}
                {result?.status === "already_used" && (
                  <AlertTriangle
                    className="text-amber-400 flex-shrink-0"
                    size={28}
                  />
                )}
                {result?.status === "invalid" && (
                  <XCircle className="text-red-400 flex-shrink-0" size={28} />
                )}

                <div>
                  {result?.status === "valid" && (
                    <>
                      <p className="text-white font-semibold">Valid Ticket</p>
                      <p className="text-white/60 text-sm">
                        {result.attendeeName}
                      </p>
                    </>
                  )}
                  {result?.status === "already_used" && (
                    <>
                      <p className="text-white font-semibold">
                        Already Checked In
                      </p>
                      <p className="text-white/60 text-sm">
                        {result.attendeeName}
                      </p>
                    </>
                  )}
                  {result?.status === "invalid" && (
                    <p className="text-white font-semibold">Invalid Ticket</p>
                  )}
                </div>
              </div>
</>
              :

              <>
                 {ismanualentry ?

            <div>
                <div className="relative">

                  <input type="text" placeholder="Enter ticket ID" className="bg-[#170022] px-4 py-4 w-full rounded-md focus:outline-none" />
                  <button className="bg-[#FFCD27] px-2 py-2.5 absolute right-1.5 top-1.5 rounded-md cursor-pointer"><Search color="#222" /></button>
                  </div>
                   <div className="text-center">
              <button className="cursor-pointer" onClick={()=>setIsmanualentry(false)}><img src="/scan-img.png" /></button>
              </div>
              </div>

            :
           <>
            <TicketScanner onScan={handleScan} />
           <div className="text-center mt-5">
              <button className="cursor-pointer font-bold" onClick={()=>setIsmanualentry(true)}>Manual Entry</button>
            </div>
           </>         
           
             }
              </>


            }



         
          </div>
        </div>
      </div>
    </div>
  );
}
